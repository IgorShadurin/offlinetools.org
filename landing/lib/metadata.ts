import { Metadata, Viewport } from "next";

/**
 * Base metadata configuration for the entire site
 */
export const siteConfig = {
  name: "OfflineTools",
  url: "https://offlinetools.org",
  description:
    "A collection of essential developer tools that prioritize privacy and offline functionality. Process data locally without server transmission.",
  ogImage: "/images/social-preview.png",
};

/**
 * Tool titles and extended titles for social media
 */
export const toolTitles = {
  jsonFormatter: {
    base: "JSON Formatter",
    extended: "JSON Formatter - Format and Beautify JSON Easily",
  },
  base64Codec: {
    base: "Base64 Encoder/Decoder",
    extended: "Base64 Encoder/Decoder - Convert Text to/from Base64",
  },
  binaryBase64Codec: {
    base: "Binary Base64 Encoder/Decoder",
    extended: "Binary Base64 Encoder/Decoder - Convert Files to/from Base64",
  },
  textHashGenerator: {
    base: "Text Hash Generator",
    extended: "Text Hash Generator - MD5, SHA-1, SHA-256 and More",
  },
  urlEncoder: {
    base: "URL Encoder/Decoder",
    extended: "URL Encoder/Decoder - Safely Encode Text for URLs",
  },
  fileGenerator: {
    base: "File Generator",
    extended: "File Generator - Create Test Files Quickly and Easily",
  },
  fileHashCompare: {
    base: "File Hash Compare",
    extended: "File Hash Compare - Verify File Integrity and Security",
  },
  uuidGenerator: {
    base: "UUID Generator",
    extended: "UUID Generator - Create RFC4122 Compliant UUIDs",
  },
  qrCode: {
    base: "QR Code Tool",
    extended: "QR Code Tool - Generate and Read QR Codes",
  },
};

/**
 * Viewport configuration for the entire site
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "light dark",
};

/**
 * Generates consistent metadata for a given page
 * @param overrides - Specific metadata for the current page
 * @returns Metadata object for the page
 */
export function generateMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} - One-Stop Developer Toolbox`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "developer tools",
      "offline tools",
      "web utilities",
      "privacy-focused tools",
      "data processing",
      "local data processing",
      "desktop application",
      "developer productivity",
    ],
    authors: [
      {
        name: "OfflineTools Team",
        url: siteConfig.url,
      },
    ],
    creator: "OfflineTools Team",
    publisher: "OfflineTools",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/images/logo.png",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: `${siteConfig.name} - One-Stop Developer Toolbox`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - One-Stop Developer Toolbox`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} - One-Stop Developer Toolbox`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    ...overrides,
  };
}

/**
 * Optimized meta descriptions for specific tool categories
 */
export const toolDescriptions = {
  jsonFormatter:
    "Format, validate, and beautify JSON data with custom indentation. All processing happens locally for enhanced privacy and security.",

  base64Codec:
    "Convert text to Base64 or decode Base64 to plaintext with URL-safe option. Securely process data in your browser without server communication.",

  binaryBase64Codec:
    "Convert binary files (images, PDFs, etc.) to Base64 or decode Base64 to binary files with URL-safe option. All processing happens locally on your device.",

  textHashGenerator:
    "Generate secure cryptographic hashes from text using multiple algorithms (MD5, SHA-1, SHA-256, etc.). Compare and verify text integrity offline.",

  urlEncoder:
    "Encode text for safe URL usage or decode URL-encoded strings. Supports both modern and legacy encoding methods with complete privacy.",

  fileGenerator:
    "Quickly create files with custom content, size, and format for testing and development purposes. Generate locally without any network transmission.",

  fileHashCompare:
    "Calculate and compare file hashes to verify file integrity and authenticity. Supports multiple hash algorithms for comprehensive verification.",

  uuidGenerator:
    "Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7). Create, validate, and format UUIDs with complete privacy.",

  qrCode:
    "Generate QR codes from text or decode them from uploaded images directly in your browser. All processing happens locally for full privacy.",

  common:
    "Process data securely in your browser without server transmission. Works offline with our desktop app for complete privacy and security.",
};
