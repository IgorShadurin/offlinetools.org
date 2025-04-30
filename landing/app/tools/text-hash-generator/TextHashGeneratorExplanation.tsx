"use client"

import React from "react"

/**
 * Renders an explanation card for the Text Hash Generator tool, detailing its capabilities,
 * common use cases, and technical implementation notes.
 */
export default function TextHashGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About Text Hash Generator</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This tool calculates cryptographic hashes for text input using various algorithms (like MD5, SHA-1, SHA-256, SHA-512). Hashing produces a fixed-size string (the hash) representing the input text. It&apos;s commonly used for data integrity checks, password storage, and digital signatures.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Generates hashes for text using multiple algorithms (MD5, SHA-1, SHA-256, SHA-512)</li>
            <li>Supports optional HMAC (Hash-based Message Authentication Code) using a secret key</li>
            <li>Handles UTF-8 text input correctly</li>
            <li>Provides uppercase/lowercase options for the hash output</li>
            <li>Outputs hash results in hexadecimal format</li>
            <li>Operates entirely offline within your browser</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Verifying Data Integrity</strong>
              <p>Generate a hash for text, transmit the text and hash separately, and re-calculate the hash on the receiving end to ensure the text wasn&apos;t altered during transmission or storage.</p>
            </li>
            
            <li>
              <strong>Password Hashing (Demonstration)</strong>
              <p>Illustrate the basic concept of password hashing (note: use salted, strong algorithms like Argon2/bcrypt in production).</p>
            </li>
            
            <li>
              <strong>Generating Checksums</strong>
              <p>Create a simple checksum for text data (like configuration strings) to detect accidental modifications.</p>
            </li>
            
            <li>
              <strong>Message Authentication (HMAC)</strong>
              <p>Use HMAC with a secret key to verify both the integrity and authenticity of a message.</p>
            </li>
            
            <li>
              <strong>Indexing & Deduplication</strong>
              <p>Use hashes as keys in hash tables or databases for quick lookups or to identify duplicate text entries.</p>
            </li>
            
            <li>
              <strong>Comparing Text Snippets</strong>
              <p>Quickly check if two pieces of text (e.g., code snippets, configuration blocks) are identical by comparing their hashes.</p>
            </li>
            
            <li>
              <strong>Content-Addressable Identifiers</strong>
              <p>Generate unique IDs based on the text content itself, useful for caching or versioning systems.</p>
            </li>
            
            <li>
              <strong>Digital Signatures (Part of)</strong>
              <p>Understand how hashing text is the first step in creating or verifying digital signatures (which also involve asymmetric cryptography).</p>
            </li>
            
            <li>
              <strong>Generating Unique Keys</strong>
              <p>Create reproducible, unique keys from text input for use in caching mechanisms or data structures.</p>
            </li>
            
            <li>
              <strong>Educational Purposes</strong>
              <p>Demonstrate properties of hash functions like determinism and the avalanche effect (small input change = large output change).</p>
            </li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            The tool utilizes the browser&apos;s built-in `SubtleCrypto` API, part of the Web Cryptography API, to perform hashing. The input text is first encoded into a `Uint8Array` (typically using UTF-8 encoding). This array is then passed to the `SubtleCrypto.digest()` method along with the chosen algorithm (e.g., &apos;SHA-256&apos;). The result is an `ArrayBuffer` containing the raw hash bytes, which is then converted to a hexadecimal string for display. For HMAC, `SubtleCrypto.sign()` is used with a derived key. All cryptographic operations occur securely within the browser.
          </p>
        </div>
      </div>
    </div>
  )
} 