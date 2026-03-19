import { app, ipcMain, net } from 'electron'
import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { PostHog } from 'posthog-node'

const POSTHOG_PROJECT_KEY = 'phc_gaSLBYke13KZW91X9tZKuHhyOqkTm1NtQC5cOb4GwvX'
const POSTHOG_API_HOST = 'https://us.i.posthog.com'
const ANALYTICS_STATE_FILE = 'analytics-state.json'
const FLUSH_RETRY_INTERVAL_MS = 15_000
const MAX_QUEUED_EVENTS = 500

type AnalyticsCapturePayload = {
  event: string
  properties?: Record<string, unknown>
}

type QueuedAnalyticsEvent = {
  event: string
  properties: Record<string, unknown>
  timestamp: string
}

type AnalyticsState = {
  distinctId: string
  enabled: boolean
  queue: QueuedAnalyticsEvent[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

class DesktopAnalytics {
  private client: PostHog | null = null
  private statePath = ''
  private distinctId = ''
  private enabled = true
  private queue: QueuedAnalyticsEvent[] = []
  private flushTimer: NodeJS.Timeout | null = null
  private isFlushing = false

  initialize() {
    this.statePath = path.join(app.getPath('userData'), ANALYTICS_STATE_FILE)
    this.loadState()

    this.client = new PostHog(POSTHOG_PROJECT_KEY, {
      host: POSTHOG_API_HOST,
      flushAt: 20,
      flushInterval: 10_000,
      requestTimeout: 4_000,
    })

    this.flushTimer = setInterval(() => {
      void this.flushQueue()
    }, FLUSH_RETRY_INTERVAL_MS)
    this.flushTimer.unref()

    void this.flushQueue()
  }

  async shutdown() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }

    await this.flushQueue()
    await this.client?.shutdown(4_000)
  }

  async capture(event: string, properties: Record<string, unknown> = {}) {
    if (!this.enabled) {
      return false
    }

    const queuedEvent: QueuedAnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
    }

    const sent = await this.sendEvent(queuedEvent)
    if (!sent) {
      this.enqueue(queuedEvent)
    }

    return sent
  }

  private async sendEvent(event: QueuedAnalyticsEvent) {
    if (!this.enabled) {
      return false
    }

    if (!this.client) {
      return false
    }

    if (!net.isOnline()) {
      return false
    }

    try {
      await this.client.captureImmediate({
        distinctId: this.distinctId,
        event: event.event,
        timestamp: new Date(event.timestamp),
        properties: {
          ...event.properties,
          app: 'offlinetools-desktop',
        },
      })
      return true
    } catch (error) {
      console.warn('Analytics: Failed to send event to PostHog, keeping it queued.', error)
      return false
    }
  }

  private enqueue(event: QueuedAnalyticsEvent) {
    this.queue.push(event)
    if (this.queue.length > MAX_QUEUED_EVENTS) {
      this.queue = this.queue.slice(-MAX_QUEUED_EVENTS)
    }
    this.saveState()
  }

  private async flushQueue() {
    if (!this.enabled) {
      return
    }

    if (!this.client || this.isFlushing || this.queue.length === 0) {
      return
    }

    this.isFlushing = true
    try {
      let sentCount = 0
      for (const queuedEvent of this.queue) {
        const sent = await this.sendEvent(queuedEvent)
        if (!sent) {
          break
        }
        sentCount += 1
      }

      if (sentCount > 0) {
        this.queue.splice(0, sentCount)
        this.saveState()
      }
    } finally {
      this.isFlushing = false
    }
  }

  isEnabled() {
    return this.enabled
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (!enabled) {
      this.queue = []
    }
    this.saveState()
  }

  private loadState() {
    const directory = path.dirname(this.statePath)
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true })
    }

    if (!existsSync(this.statePath)) {
      this.distinctId = randomUUID()
      this.enabled = true
      this.queue = []
      this.saveState()
      return
    }

    try {
      const raw = readFileSync(this.statePath, 'utf8')
      const parsed = JSON.parse(raw) as Partial<AnalyticsState>

      this.distinctId = typeof parsed.distinctId === 'string' && parsed.distinctId
        ? parsed.distinctId
        : randomUUID()
      this.enabled = typeof parsed.enabled === 'boolean' ? parsed.enabled : true

      this.queue = Array.isArray(parsed.queue)
        ? parsed.queue.filter((event): event is QueuedAnalyticsEvent => {
          return !!event
            && typeof event.event === 'string'
            && typeof event.timestamp === 'string'
            && isRecord(event.properties)
        })
        : []

      this.saveState()
    } catch (error) {
      console.warn('Analytics: Failed to read analytics state, reinitializing.', error)
      this.distinctId = randomUUID()
      this.enabled = true
      this.queue = []
      this.saveState()
    }
  }

  private saveState() {
    const data: AnalyticsState = {
      distinctId: this.distinctId,
      enabled: this.enabled,
      queue: this.queue,
    }

    try {
      writeFileSync(this.statePath, JSON.stringify(data), 'utf8')
    } catch (error) {
      console.error('Analytics: Failed to persist analytics state.', error)
    }
  }
}

export const desktopAnalytics = new DesktopAnalytics()

export function setupAnalyticsIpcHandlers() {
  ipcMain.handle('analytics:capture', async (_event, payload: AnalyticsCapturePayload) => {
    if (!payload || typeof payload.event !== 'string' || payload.event.length === 0) {
      return false
    }

    const safeProperties = isRecord(payload.properties) ? payload.properties : {}
    return desktopAnalytics.capture(payload.event, safeProperties)
  })

  ipcMain.handle('analytics:get-enabled', () => {
    return desktopAnalytics.isEnabled()
  })

  ipcMain.handle('analytics:set-enabled', async (_event, enabled: boolean) => {
    const safeEnabled = !!enabled
    const previousEnabled = desktopAnalytics.isEnabled()

    if (previousEnabled === safeEnabled) {
      return previousEnabled
    }

    if (safeEnabled) {
      desktopAnalytics.setEnabled(true)
      await desktopAnalytics.capture('analytics_toggle_changed', {
        enabled: true,
        previous_enabled: previousEnabled,
      })
      return true
    }

    await desktopAnalytics.capture('analytics_toggle_changed', {
      enabled: false,
      previous_enabled: previousEnabled,
    })
    desktopAnalytics.setEnabled(false)
    return false
  })
}
