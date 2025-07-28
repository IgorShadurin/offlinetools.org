import { Metadata, Viewport } from "next";

/**
 * Base metadata configuration for the entire site
 */
export const siteConfig = {
  name: "OfflineTools",
  url: "https://offlinetools.org",
  description:
    "A collection of essential offline developer tools that prioritize privacy and offline functionality. Process data locally without server transmission.",
  ogImage: "/images/social-preview.png",
  twitterHandle: "@Web3Igor",
  githubUrl: "https://github.com/igorShadurin/offlinetools.org",
  supportEmail: "igor.shadurin@gmail.com",
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
  imageResizer: {
    base: "Image Resizer",
    extended: "Image Resizer - Resize Images Offline in Your Browser",
  },
  qrCode: {
    base: "QR Code Tool",
    extended: "QR Code Tool - Generate and Read QR Codes",
  },
};

/**
 * Enhanced viewport configuration for the entire site
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: "#2563eb",
};

/**
 * Generates comprehensive metadata for a given page with advanced SEO and social media optimization
 * @param overrides - Specific metadata for the current page
 * @returns Enhanced Metadata object for the page
 */
export function generateMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} - Privacy-First Developer Tools`,
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
      "JSON formatter",
      "Base64 encoder",
      "URL encoder",
      "hash generator",
      "file generator",
      "UUID generator",
      "QR code generator",
      "offline first",
      "privacy tools",
      "web development",
      "coding tools",
      "text processing",
      "file processing",
      "crypto tools",
      "developer utilities",
    ],
    authors: [
      {
        name: "OfflineTools Team",
        url: siteConfig.url,
      },
    ],
    creator: "OfflineTools Team",
    publisher: "OfflineTools",
    category: "Technology",
    classification: "Developer Tools Software",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/favicon.png", sizes: "180x180", type: "image/png" }
      ],
      other: [
        { rel: "android-chrome", url: "/favicon.png", sizes: "192x192" },
        { rel: "android-chrome", url: "/favicon.png", sizes: "512x512" }
      ]
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: `${siteConfig.name} - Privacy-First Developer Tools`,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Privacy-First Developer Tools`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: `${siteConfig.name} - Privacy-First Developer Tools`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          alt: `${siteConfig.name} - Privacy-First Developer Tools`,
          width: 1200,
          height: 630,
        },
      ],
    },
    other: {
      // LinkedIn specific tags
      "linkedin:owner": "OfflineTools",
      
      // Pinterest tags
      "pinterest:rich_pin": "true",
      "pinterest:media": siteConfig.ogImage,
      
      // Instagram/Facebook additional tags
      "fb:app_id": "offlinetools",
      
      // TikTok optimization
      "tiktok:creator": "@offlinetools",
      
      // Discord/Telegram optimization
      "theme-color": "#2563eb",
      
      // Mobile app tags
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "OfflineTools",
      "mobile-web-app-capable": "yes",
      
      // Security and privacy
      "referrer": "strict-origin-when-cross-origin",
      
      // Additional SEO tags
      "geo.region": "US",
      "geo.placename": "United States",
      "language": "en",
      "content-language": "en",
      "audience": "all",
      "rating": "general",
      "revisit-after": "7 days",
      
      // Rich snippets preparation
      "application-name": "OfflineTools",
      "msapplication-TileColor": "#2563eb",
      "msapplication-config": "/browserconfig.xml",
      
      // Search engine specific
      "google-site-verification": "your-google-verification-code",
      "bing-site-verification": "your-bing-verification-code",
      
      // Additional social media tags
      "telegram:channel": "@offlinetools",
      "whatsapp:share": "true",
      
      // Accessibility
      "color-scheme": "light dark",
      "prefers-color-scheme": "light",
    },
    ...overrides,
  };
}

/**
 * Enhanced tool descriptions for specific tool categories
 */
export const toolDescriptions = {
  jsonFormatter:
    "Format, validate, and beautify JSON data with custom indentation. All processing happens locally for enhanced privacy and security. Perfect for developers working with APIs, configuration files, and data structures.",

  base64Codec:
    "Convert text to Base64 or decode Base64 to plaintext with URL-safe option. Securely process data in your browser without server communication. Essential for web developers handling encoded data.",

  binaryBase64Codec:
    "Convert binary files (images, PDFs, etc.) to Base64 or decode Base64 to binary files with URL-safe option. All processing happens locally on your device for maximum privacy.",

  textHashGenerator:
    "Generate secure cryptographic hashes from text using multiple algorithms (MD5, SHA-1, SHA-256, SHA-3, RIPEMD-160). Compare and verify text integrity offline with enterprise-grade security.",

  urlEncoder:
    "Encode text for safe URL usage or decode URL-encoded strings. Supports both modern and legacy encoding methods with complete privacy. Essential for web development and API integration.",

  fileGenerator:
    "Quickly create files with custom content, size, and format for testing and development purposes. Generate locally without any network transmission. Perfect for testing file upload systems.",

  fileHashCompare:
    "Calculate and compare file hashes to verify file integrity and authenticity. Supports multiple hash algorithms for comprehensive verification. Essential for security and data validation.",

  uuidGenerator:
    "Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7). Create, validate, and format UUIDs with complete privacy. Perfect for database keys and unique identifiers.",

  imageResizer: 
    "Resize images to custom dimensions directly in your browser while keeping data private and offline. Supports multiple formats with quality optimization.",

  qrCode:
    "Generate QR codes from text or decode them from uploaded images directly in your browser. All processing happens locally for full privacy. Perfect for creating shareable codes.",

  common:
    "Process data securely in your browser without server transmission. Works offline with our desktop app for complete privacy and security. Built for developers who value privacy.",
};

/**
 * Generate tool-specific metadata
 * @param toolKey - The tool identifier
 * @param customTitle - Custom title override
 * @param customDescription - Custom description override
 * @param toolPath - Tool URL path
 * @returns Tool-specific metadata
 */
export function generateToolMetadata(
  toolKey: keyof typeof toolTitles,
  customTitle?: string,
  customDescription?: string,
  toolPath?: string
): Metadata {
  const tool = toolTitles[toolKey];
  const description = customDescription || toolDescriptions[toolKey] || toolDescriptions.common;
  const title = customTitle || tool.extended;
  const url = toolPath ? `${siteConfig.url}${toolPath}` : `${siteConfig.url}/tools/${toolKey}`;

  return generateMetadata({
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    other: {
      "article:section": "Tools",
      "tool:category": "Developer Tools",
      "tool:type": tool.base,
    },
  });
}
