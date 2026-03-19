#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.argv[2] || '.')

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, out)
    } else if (entry.isFile()) {
      out.push(fullPath)
    }
  }
  return out
}

function hasMatch(files, regex) {
  return files.some((file) => regex.test(file.replaceAll('\\', '/')))
}

if (!fs.existsSync(root)) {
  console.error(`[verify-updater-assets] Directory not found: ${root}`)
  process.exit(1)
}

const files = walk(root)
const normalized = files.map((file) => file.replaceAll('\\', '/'))

const checks = [
  {
    label: 'mac metadata (latest-mac.yml)',
    ok: hasMatch(normalized, /(^|\/)latest-mac\.yml$/),
  },
  {
    label: 'mac installer (.dmg)',
    ok: hasMatch(normalized, /OfflineTools_.*\.dmg$/),
  },
  {
    label: 'mac updater package (.zip)',
    ok: hasMatch(normalized, /OfflineTools_.*\.zip$/),
  },
  {
    label: 'windows metadata (latest.yml)',
    ok: hasMatch(normalized, /(^|\/)latest\.yml$/),
  },
  {
    label: 'windows installer (.exe)',
    ok: hasMatch(normalized, /OfflineTools.*\.exe$/),
  },
  {
    label: 'linux metadata (latest-linux.yml)',
    ok: hasMatch(normalized, /(^|\/)latest-linux\.yml$/),
  },
  {
    label: 'linux updater package (.AppImage)',
    ok: hasMatch(normalized, /OfflineTools.*\.AppImage$/),
  },
]

console.log(`[verify-updater-assets] Scanning ${normalized.length} files in ${root}`)

let failed = false
for (const check of checks) {
  if (check.ok) {
    console.log(`  ✔ ${check.label}`)
  } else {
    failed = true
    console.error(`  ✘ Missing ${check.label}`)
  }
}

if (failed) {
  console.error('[verify-updater-assets] Updater artifacts are incomplete. Failing build.')
  process.exit(1)
}

console.log('[verify-updater-assets] All required updater artifacts are present.')
