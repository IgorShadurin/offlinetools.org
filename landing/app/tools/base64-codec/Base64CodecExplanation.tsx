"use client"

import React from "react"

/**
 * Renders an explanation card for the Base64 Text Codec tool, detailing its capabilities,
 * common use cases, and technical implementation notes.
 */
export default function Base64CodecExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About Base64 Text Codec</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This tool encodes plain text into Base64 format and decodes Base64 strings back into plain text. Base64 encoding is commonly used to represent binary data in an ASCII string format, but it&apos;s also useful for simple text obfuscation or ensuring text data transfers safely across systems that might modify line endings or character encodings.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encodes text strings (UTF-8) into Base64</li>
            <li>Decodes Base64 strings back into their original text</li>
            <li>Handles various character sets through UTF-8 encoding/decoding</li>
            <li>Provides options for URL-safe Base64 encoding (Future enhancement)</li>
            <li>Includes easy copy-to-clipboard functionality for results</li>
            <li>Operates entirely offline within your browser for privacy</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Basic Obfuscation</strong>
              <p>Lightly obscure text data (like API keys in examples, though not for security) to prevent casual viewing or simple scraping.</p>
            </li>
            
            <li>
              <strong>Reliable Data Transfer</strong>
              <p>Ensure text data containing special characters or mixed encodings is transmitted reliably through systems that might otherwise corrupt it (e.g., older email systems).</p>
            </li>
            
            <li>
              <strong>Debugging Encoded Data</strong>
              <p>Decode Base64 strings found in logs, configuration files (like Kubernetes secrets), or API responses to see the original text content.</p>
            </li>
            
            <li>
              <strong>Working with Basic Auth Headers</strong>
              <p>Decode the credentials part of an HTTP Basic Authentication header (`Authorization: Basic ...`) to see the `username:password`.</p>
            </li>
            
            <li>
              <strong>Embedding Text in JSON/XML</strong>
              <p>Encode text to safely include it within JSON string values or XML elements where certain characters might cause parsing issues.</p>
            </li>
            
            <li>
              <strong>Understanding JWT Components</strong>
              <p>Decode the Base64url encoded parts (header, payload) of a JSON Web Token (JWT) to inspect its contents.</p>
            </li>
            
            <li>
              <strong>Handling Command Line Arguments</strong>
              <p>Encode complex text strings to pass them safely as command line arguments where special characters could be misinterpreted by the shell.</p>
            </li>
            
            <li>
              <strong>Storing Simple Data</strong>
              <p>Encode small text snippets for storage in systems with limited character set support or potential modification issues (e.g., certain database fields, cookies).</p>
            </li>
            
            <li>
              <strong>Validating Base64 Strings</strong>
              <p>Quickly check if a string appears to be valid Base64 before attempting to use it in a decoding process elsewhere.</p>
            </li>
            
            <li>
              <strong>Protocol Compliance</strong>
              <p>Encode text data according to specifications for certain protocols or standards that mandate Base64 encoding for specific fields.</p>
            </li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            This tool uses the browser&apos;s standard `btoa()` function for encoding and `atob()` for decoding. `btoa()` creates a Base64-encoded ASCII string from a string of binary data. Since JavaScript strings are typically UTF-16, the input text is often first encoded to UTF-8, then passed to `btoa()`. Conversely, `atob()` decodes a Base64-encoded string; the result might need to be decoded from UTF-8 back to a standard JavaScript string if the original text contained non-ASCII characters. All processing happens client-side.
          </p>
        </div>
      </div>
    </div>
  )
} 