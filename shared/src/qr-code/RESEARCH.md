# QR Code Feature Research

Attempts to access public QR code tools were blocked due to network restrictions. Based on prior knowledge of common QR code generators such as qr-code-generator.com, qrstuff.com and others, the following features are typically offered:

- Support for text, URLs, contact cards and other plain string data
- Customization of size, margin and error correction level
- Optional color selection for foreground and background
- Download in PNG or SVG format
- Ability to scan an uploaded image to decode embedded data

Core functionality needed:

1. Generate QR codes from arbitrary text/URL
2. Decode QR codes from uploaded images directly in the browser
3. Basic customization options: size, margin, error correction level

Optional features for future iterations:

- Color customization
- Support for different output formats (SVG)
- Presets for common data types like WiFi or vCards

Challenges noted from other implementations include handling blurry images when decoding and providing clear error messages when a QR code cannot be found.
