"use client";

import React from "react";

/**
 * Renders an explanation card for the File & Text Hash Compare tool, detailing its capabilities,
 * common use cases, and technical implementation notes.
 */
export default function HashCompareExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About File & Text Hash Compare</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This tool calculates and compares cryptographic hashes for files or text inputs. You can either upload files
            or paste text, select a hash algorithm (like MD5, SHA-1, SHA-256), and compare the generated hash against an
            expected hash value. It&apos;s crucial for verifying data integrity, ensuring files haven&apos;t been
            corrupted or tampered with.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Calculates hashes for uploaded files using various algorithms (MD5, SHA-1, SHA-256, SHA-512)</li>
            <li>Calculates hashes for direct text input</li>
            <li>Compares the generated hash against a user-provided expected hash</li>
            <li>Supports multiple hash algorithms simultaneously for comparison</li>
            <li>Handles large files efficiently using browser-based processing (streaming)</li>
            <li>Provides clear visual feedback on whether the hashes match or mismatch</li>
            <li>Works entirely offline, keeping your files and data private</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Verifying Software Downloads</strong>
              <p>
                Compare the hash of a downloaded installer or archive against the hash provided by the vendor to ensure
                the file is authentic and wasn&apos;t corrupted or tampered with.
              </p>
            </li>

            <li>
              <strong>Ensuring File Integrity After Transfer</strong>
              <p>
                Calculate a hash before transferring a large file (e.g., via FTP, USB drive), and verify it after the
                transfer to confirm no data corruption occurred.
              </p>
            </li>

            <li>
              <strong>Detecting File Tampering</strong>
              <p>
                Check if a critical file stored locally or on a server matches its original known hash to detect
                unauthorized modifications or malware infections.
              </p>
            </li>

            <li>
              <strong>Validating Backup Integrity</strong>
              <p>
                Compare the hash of a backup file (e.g., database dump, zip archive) against the hash of the original
                data source to ensure the backup is complete and uncorrupted.
              </p>
            </li>

            <li>
              <strong>Comparing ISO Images</strong>
              <p>
                Verify the integrity of downloaded operating system ISO images or other large disc images by comparing
                their hash against the official checksum.
              </p>
            </li>

            <li>
              <strong>Checking Configuration Consistency</strong>
              <p>
                Compare the hash of configuration files across different servers or environments to ensure they are
                identical.
              </p>
            </li>

            <li>
              <strong>Verifying Text Snippets</strong>
              <p>
                Ensure a piece of text (e.g., a public key, a code snippet, a license key) exactly matches an expected
                value by comparing hashes.
              </p>
            </li>

            <li>
              <strong>Auditing File Changes</strong>
              <p>
                Periodically calculate hashes of important files and compare them against previously recorded hashes to
                detect any changes over time.
              </p>
            </li>

            <li>
              <strong>Duplicate File Detection (Concept)</strong>
              <p>
                Use hash comparison as a primary method to identify potential duplicate files across directories or
                drives before performing slower byte-by-byte checks.
              </p>
            </li>

            <li>
              <strong>Confirming Data Synchronization</strong>
              <p>
                After syncing data between two locations (e.g., cloud storage, local folders), compare hashes of key
                files to confirm synchronization was successful.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            For files, the tool uses the browser&apos;s <code>FileReader</code> API, often in conjunction with the{" "}
            <code>SubtleCrypto</code> API (Web Cryptography API), to read the file in chunks (streaming) and
            progressively calculate the hash. This allows processing large files without loading the entire content into
            memory. For text input, the text is encoded (typically to UTF-8) and then hashed using{" "}
            <code>SubtleCrypto.digest()</code>. The calculated hash (in hexadecimal format) is then compared
            case-insensitively against the user-provided expected hash. All calculations happen client-side.
          </p>
        </div>
      </div>
    </div>
  );
}
