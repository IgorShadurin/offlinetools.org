"use client"

import React from "react"

/**
 * Renders an explanation card for the Binary Base64 Codec tool, detailing its capabilities,
 * common use cases, and technical implementation notes.
 */
export default function BinaryBase64CodecExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About Binary Base64 Codec</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This tool allows you to encode binary files (like images, PDFs, or archives) into Base64 strings and decode Base64 strings back into their original binary file format. It&apos;s essential for scenarios where binary data needs to be transmitted or stored in text-based systems.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encodes uploaded binary files to Base64 strings</li>
            <li>Decodes Base64 strings back into downloadable binary files</li>
            <li>Handles various file types (images, documents, archives, etc.)</li>
            <li>Supports large files through efficient browser-based processing</li>
            <li>Provides options for copying the Base64 output</li>
            <li>Automatically detects the MIME type for decoded files where possible</li>
            <li>Operates entirely offline within your browser for privacy</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Embedding Images in CSS/HTML</strong>
              <p>Encode small images into Base64 strings to embed directly within CSS `background-image` properties or HTML `img` tags as Data URLs, reducing HTTP requests.</p>
            </li>
            
            <li>
              <strong>Transmitting Binary Data via JSON/XML</strong>
              <p>Encode files to include them within JSON payloads or XML documents where raw binary data is not allowed.</p>
            </li>
            
            <li>
              <strong>Email Attachments (Understanding)</strong>
              <p>Understand how email systems encode binary attachments using Base64 for transmission through text-based protocols.</p>
            </li>
            
            <li>
              <strong>Storing Binary Data in Text Databases</strong>
              <p>Encode binary data for storage in database fields that only accept text (consider storage implications).</p>
            </li>
            
            <li>
              <strong>Debugging Data URLs</strong>
              <p>Decode Base64 portions of Data URLs (`data:mime/type;base64,...`) to inspect the raw binary content or save as a file.</p>
            </li>
            
            <li>
              <strong>Extracting Embedded Files</strong>
              <p>Decode Base64 strings found in source code or data files to retrieve the original embedded binary file (e.g., scripts, logs).</p>
            </li>
            
            <li>
              <strong>API Interactions</strong>
              <p>Decode Base64-encoded files received from APIs (e.g., generated PDFs, images) or encode files to send to APIs requiring Base64 input.</p>
            </li>
            
            <li>
              <strong>Creating Self-Contained HTML</strong>
              <p>Embed images, fonts, or other small assets directly into an HTML file using Base64 Data URLs for easy sharing.</p>
            </li>
            
            <li>
              <strong>Transferring Certificates/Keys</strong>
              <p>Handle certificate files (like `.pem` or `.crt`) or keys that are often distributed or stored in Base64 format.</p>
            </li>
            
            <li>
              <strong>Verifying Base64 Data</strong>
              <p>Ensure a Base64 string represents valid data by attempting to decode it back into its binary form.</p>
            </li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            The tool utilizes the browser&apos;s built-in `FileReader` API to read uploaded files as ArrayBuffers for encoding, and the `atob()` and `btoa()` functions (or more robust libraries for Unicode/binary handling) for the Base64 conversion. For encoding, the binary data is read and converted to a Base64 string. For decoding, the Base64 string is converted back into binary data (typically a `Uint8Array`), which is then wrapped in a `Blob` object to allow downloading with the appropriate MIME type if known. All processing happens client-side.
          </p>
        </div>
      </div>
    </div>
  )
} 