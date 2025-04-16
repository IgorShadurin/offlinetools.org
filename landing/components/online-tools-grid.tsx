import Link from "next/link"
import React from "react"

/**
 * Online tools data with titles and URLs
 */
export const onlineTools = [
  {
    title: "JSON Formatter",
    path: "/tools/json-formatter",
    description: "Format and beautify your JSON with customizable indentation options."
  },
  {
    title: "Base64 Encoder/Decoder",
    path: "/tools/base64-codec",
    description: "Convert text to Base64 or decode Base64 to plaintext with URL-safe option."
  },
  {
    title: "Binary Base64 Encoder/Decoder",
    path: "/tools/binary-base64-codec",
    description: "Convert binary files to Base64 or decode Base64 to binary files."
  },
  {
    title: "URL Encoder/Decoder",
    path: "/tools/url-encoder",
    description: "Encode text for use in URLs or decode URL-encoded text."
  },
  {
    title: "File & Text Hash Compare",
    path: "/tools/file-hash-compare",
    description: "Compare hashes of files or text strings using different algorithms."
  },
  {
    title: "Text Hash Generator",
    path: "/tools/text-hash-generator",
    description: "Generate cryptographic hashes from text using various algorithms including SHA-256, SHA-3, and RIPEMD-160."
  },
  {
    title: "Tool 2",
    path: "/tools/tool2",
    description: "Description for Tool 2"
  },
  {
    title: "Tool 3",
    path: "/tools/tool3",
    description: "Description for Tool 3"
  },
  {
    title: "Tool 4",
    path: "/tools/tool4",
    description: "Description for Tool 4"
  },
  {
    title: "Tool 5",
    path: "/tools/tool5",
    description: "Description for Tool 5"
  },
  {
    title: "Tool 6",
    path: "/tools/tool6",
    description: "Description for Tool 6"
  },
  {
    title: "Tool 7",
    path: "/tools/tool7",
    description: "Description for Tool 7"
  },
  {
    title: "Tool 8",
    path: "/tools/tool8",
    description: "Description for Tool 8"
  },
  {
    title: "Tool 9",
    path: "/tools/tool9",
    description: "Description for Tool 9"
  },
  {
    title: "Tool 10",
    path: "/tools/tool10",
    description: "Description for Tool 10"
  },
  {
    title: "Tool 11",
    path: "/tools/tool11",
    description: "Description for Tool 11"
  }
]

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
  )
} 