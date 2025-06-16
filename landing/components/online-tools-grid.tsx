import Link from "next/link";
import React from "react";

/**
 * Online tools data with titles and URLs
 */
export const onlineTools = [
  {
    title: "Ethereum Unit Converter",
    path: "/tools/ethereum-converter",
    description: "Convert between Ethereum units including Wei, Gwei, Ether, Finney, and Szabo with precision.",
  },
  {
    title: "JSON Formatter",
    path: "/tools/json-formatter",
    description: "Format and beautify your JSON with customizable indentation options.",
  },
  {
    title: "HTML Text Extractor",
    path: "/tools/html-text-extractor",
    description: "Extract plain text from HTML content with customizable options for handling links, images, and formatting.",
  },
  {
    title: "Base64 Encoder/Decoder",
    path: "/tools/base64-codec",
    description: "Convert text to Base64 or decode Base64 to plaintext with URL-safe option.",
  },
  {
    title: "Binary Base64 Encoder/Decoder",
    path: "/tools/binary-base64-codec",
    description: "Convert binary files to Base64 or decode Base64 to binary files.",
  },
  {
    title: "URL Encoder/Decoder",
    path: "/tools/url-encoder",
    description: "Encode text for use in URLs or decode URL-encoded text.",
  },
  {
    title: "QR Code Tool",
    path: "/tools/qr-code",
    description: "Generate QR codes or decode them from uploaded images.",
  },
  {
    title: "File & Text Hash Compare",
    path: "/tools/file-hash-compare",
    description: "Compare hashes of files or text strings using different algorithms.",
  },
  {
    title: "Text Hash Generator",
    path: "/tools/text-hash-generator",
    description:
      "Generate cryptographic hashes from text using various algorithms including SHA-256, SHA-3, and RIPEMD-160.",
  },
  {
    title: "File Generator",
    path: "/tools/file-generator",
    description: "Generate files with specific size and format with random data, zeros, or custom patterns.",
  },
  {
    title: "Image Resizer",
    path: "/tools/image-resizer",
    description: "Resize images to custom dimensions directly in your browser.",
  },
  {
    title: "Person Generator",
    path: "/tools/person-generator",
    description: "Create fake person data with chosen fields in multiple formats.",
  },
  {
    title: "UUID Generator",
    path: "/tools/uuid-generator",
    description: "Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7).",
  },
  {
    title: "Speech Length Estimator",
    path: "/tools/speech-length-estimator",
    description: "Calculate how long it will take to speak a text with adjustable speed settings.",
  },
  {
    title: "Text to Slug",
    path: "/tools/text-to-slug",
    description: "Convert text to URL-friendly slugs with customizable separators and character handling.",
  },
  {
    title: "Unit Converter",
    path: "/tools/unit-converter",
    description: "Convert between units of length, weight, temperature, volume, area, energy, and power with precision.",
  },
  {
    title: "Password Strength Meter",
    path: "/tools/password-strength-meter",
    description: "Analyze password strength and get security recommendations based on OWASP industry standards.",
  },
  {
    title: "Text Utility",
    path: "/tools/text-utility",
    description: "Transform text with line break conversion, case conversion, and line sorting utilities.",
  },
  {
    title: "Watermark Tool",
    path: "/tools/watermark-tool",
    description: "Add watermarks to images with customizable positioning and batch processing support.",
  },
];

/**
 * A flexible grid component for displaying online tools
 */
export function OnlineToolsGrid() {
  return (
    <div className="border-t border-b py-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="pb-6">
          <h2 className="text-2xl font-bold mb-2">Online Tools</h2>
          <p className="text-muted-foreground">Free web-based developer utilities you can use right in your browser</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {onlineTools.map((tool, index) => (
            <Link
              key={index}
              href={tool.path}
              className="px-3 py-2 bg-white dark:bg-gray-800 rounded-md hover:shadow-md transition-shadow border text-center"
            >
              {tool.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
