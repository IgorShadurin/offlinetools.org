import { useEffect, useState } from "react"
import { BarChart3, CheckCircle2, ExternalLink, KeyRound, Settings2, ShoppingCart, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { LICENSE_PUBLIC_KEY_HEX, type StoredLicense } from "../lib/license"

interface AnalyticsSettingsProps {
  className?: string
  isPremiumUnlocked: boolean
  storedLicense: StoredLicense | null
  onActivateLicense: (email: string, key: string) => Promise<{ success: boolean; error?: string }>
  onClearLicense: () => void
}

export function AnalyticsSettings({
  className = "",
  isPremiumUnlocked,
  storedLicense,
  onActivateLicense,
  onClearLicense,
}: AnalyticsSettingsProps) {
  const [enabled, setEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [analyticsError, setAnalyticsError] = useState<string | null>(null)
  const [licenseEmail, setLicenseEmail] = useState("")
  const [licenseKey, setLicenseKey] = useState("")
  const [licenseError, setLicenseError] = useState("")
  const [licenseStatus, setLicenseStatus] = useState("")
  const [licenseSaving, setLicenseSaving] = useState(false)
  const [showActivationSuccessModal, setShowActivationSuccessModal] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadSetting = async () => {
      try {
        const result = await window.electron.ipcRenderer.invoke("analytics:get-enabled")
        if (isMounted) {
          setEnabled(!!result)
        }
      } catch {
        if (isMounted) {
          setAnalyticsError("Failed to load analytics setting.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadSetting()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!storedLicense) {
      return
    }

    setLicenseEmail(storedLicense.email)
    setLicenseKey(storedLicense.key)
  }, [storedLicense])

  const onToggle = async (checked: boolean) => {
    const nextValue = checked
    setAnalyticsError(null)
    const previous = enabled
    setEnabled(nextValue)

    try {
      const persisted = await window.electron.ipcRenderer.invoke("analytics:set-enabled", nextValue)
      setEnabled(!!persisted)
    } catch {
      setEnabled(previous)
      setAnalyticsError("Could not save analytics setting.")
    }
  }

  const handleSaveLicense = async () => {
    setLicenseError("")
    setLicenseStatus("")

    if (!licenseEmail.trim() || !licenseKey.trim()) {
      setLicenseError("Enter email and license key.")
      return
    }

    if (!LICENSE_PUBLIC_KEY_HEX) {
      setLicenseError("License verification key is missing in this app build.")
      return
    }

    setLicenseSaving(true)
    try {
      const result = await onActivateLicense(licenseEmail, licenseKey)
      if (!result.success) {
        setLicenseError(result.error || "License is invalid.")
        return
      }

      setLicenseStatus("")
      setShowActivationSuccessModal(true)
    } finally {
      setLicenseSaving(false)
    }
  }

  const handleClearLicense = () => {
    onClearLicense()
    setLicenseStatus("License removed from this device.")
    setLicenseError("")
    setLicenseEmail("")
    setLicenseKey("")
  }

  const openPricingPage = () => {
    if (!window.electron?.ipcRenderer) {
      return
    }

    void window.electron.ipcRenderer.invoke("open-external-url", "https://offlinetools.org/pricing")
  }

  return (
    <div className={`p-4 ${className}`}>
      <h1 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
        <Settings2 className="h-6 w-6" />
        Settings
      </h1>

      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="h-5 w-5" />
              License
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Enter your purchase email and key to unlock premium tools offline on this device.
            </p>

            <div className="space-y-2">
              <Label htmlFor="license-email">Email</Label>
              <Input
                id="license-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={licenseEmail}
                onChange={(event) => setLicenseEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license-key">License key</Label>
              <Input
                id="license-key"
                type="text"
                placeholder="OT1-..."
                value={licenseKey}
                onChange={(event) => setLicenseKey(event.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" onClick={handleSaveLicense} disabled={licenseSaving}>
                <KeyRound className="h-4 w-4" />
                {licenseSaving ? "Validating..." : "Activate key"}
              </Button>
              {storedLicense ? (
                <Button type="button" size="sm" variant="outline" onClick={handleClearLicense}>
                  <Trash2 className="h-4 w-4" />
                  Remove key
                </Button>
              ) : null}
            </div>

            {!isPremiumUnlocked ? (
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                onClick={openPricingPage}
              >
                <ShoppingCart className="h-4 w-4" />
                Need a license? Buy on offlinetools.org
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            ) : null}

            {isPremiumUnlocked ? (
              <p className="text-sm text-green-600">Premium is unlocked on this device.</p>
            ) : null}
            {!isPremiumUnlocked && licenseStatus ? <p className="text-sm text-muted-foreground">{licenseStatus}</p> : null}
            {licenseError ? <p className="text-sm text-red-600">{licenseError}</p> : null}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="h-5 w-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                id="analytics-enabled"
                checked={enabled}
                disabled={loading}
                onCheckedChange={onToggle}
              />
              <Label htmlFor="analytics-enabled" className="text-sm font-medium">
                Enable analytics
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Helps improve OfflineTools by collecting anonymous usage events like app opens and tool selections.
            </p>
            {analyticsError ? (
              <Alert variant="destructive">
                <AlertTitle>Settings error</AlertTitle>
                <AlertDescription>{analyticsError}</AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {showActivationSuccessModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          onClick={() => setShowActivationSuccessModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Congratulations
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              License activated successfully. Premium tools are now unlocked on this device.
            </p>
            <div className="mt-6 flex justify-end">
              <Button size="sm" onClick={() => setShowActivationSuccessModal(false)}>
                Great
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
