# Landing

`landing` is the marketing + payments app for OfflineTools (`offlinetools.org`).

It handles:
- pricing and checkout initialization
- Stripe payment verification
- license key generation + email delivery
- admin manual key generation endpoint/page

## Generate a License Key from CLI

This reuses the same server key-generation flow (`lib/license-server.ts`) used by APIs.

1. Make sure `landing/.env.local` has `LICENSE_PRIVATE_KEY_HEX`.
2. Run:

```bash
pnpm run license:generate -- hello@example.com
```

Expected output:

```text
Email: hello@example.com
License key: OT1-...
```

## Generate New Signing Keys

Use this when rotating license keys.

1. Run:

```bash
pnpm run license:generate:keypair
```

Expected output:

```text
LICENSE_PRIVATE_KEY_HEX=...
LICENSE_PUBLIC_KEY_HEX=...
```

2. Update env values:
- `landing/.env.local`:
  - `LICENSE_PRIVATE_KEY_HEX=<generated-private-key>`
  - `LICENSE_PUBLIC_KEY_HEX=<generated-public-key>` (optional but recommended)
- `desktop/.env`:
  - `VITE_LICENSE_PUBLIC_KEY_HEX=<generated-public-key>`

3. Rebuild/restart:
- restart landing app
- rebuild desktop app so new public key is baked into the binary
