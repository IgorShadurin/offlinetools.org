# Desktop App

## Code Signing and Notarization for macOS Builds

To properly build and distribute the app for macOS (especially for Apple Silicon/arm64), you need to set up code signing and notarization.

### Required GitHub Secrets

Add these secrets to your GitHub repository:

1. `MAC_CERTIFICATE`: Base64-encoded Apple Developer certificate (p12 file)
2. `MAC_CERTIFICATE_PASSWORD`: Password for the certificate
3. `APPLE_ID`: Your Apple Developer ID email
4. `APPLE_APP_SPECIFIC_PASSWORD`: App-specific password for your Apple ID

### Creating an App-Specific Password

1. Go to https://appleid.apple.com/
2. Sign in with your Apple Developer ID
3. Go to "Security" > "App-Specific Passwords"
4. Click the "+" icon and follow the steps

### Exporting Your Developer Certificate

1. Open Keychain Access on your Mac
2. Find your Developer ID certificate
3. Right-click and select "Export"
4. Save it as a .p12 file with a password
5. Convert to base64:
   ```
   base64 -i YourCertificate.p12 | pbcopy
   ```
6. Paste the base64 output as the `MAC_CERTIFICATE` secret

### Troubleshooting

If you're getting the "app is damaged" error:

1. Make sure code signing and notarization are working correctly
2. Try running this command after downloading the app:
   ```
   xattr -d com.apple.quarantine /path/to/YourApp.app
   ```
3. For development/testing only, you can allow unsigned apps:
   ```
   sudo spctl --master-disable
   ```
   (Remember to re-enable security with `sudo spctl --master-enable` after testing)

## Development

```
pnpm install
pnpm run dev
```

## Building

```
pnpm run build
``` 