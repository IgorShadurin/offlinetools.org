"use client";

import React from "react";

/**
 * Renders an explanation card for the URL Encoder/Decoder tool, detailing its capabilities,
 * common use cases, and technical implementation notes.
 */
export default function UrlEncoderExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About URL Encoder/Decoder</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This tool performs URL encoding (also known as percent-encoding) and decoding. It converts characters that
            are not allowed in URLs into their percent-encoded equivalents (e.g., space becomes <code>%20</code>) and
            reverses the process, making URLs safe for transmission and interpretable by web servers and browsers.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encodes strings into URL-safe format using percent-encoding</li>
            <li>Decodes percent-encoded URL strings back to their original form</li>
            <li>Handles common special characters and reserved characters correctly</li>
            <li>Supports encoding/decoding of full URLs or specific components</li>
            <li>Provides options to encode all characters or only necessary ones (Future enhancement)</li>
            <li>Operates entirely offline within your browser</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Constructing Query Strings</strong>
              <p>
                Encode parameter values containing spaces, <code>&</code>, <code>=</code>, or other special characters
                before adding them to a URL query string (e.g., <code>search?q=hello%20world&lang=en</code>).
              </p>
            </li>

            <li>
              <strong>Making URLs Safe for Sharing</strong>
              <p>
                Encode user-generated content or data with special symbols before including it in URL paths or
                parameters to prevent errors or security issues.
              </p>
            </li>

            <li>
              <strong>Debugging Encoded URLs</strong>
              <p>
                Decode complex or unreadable URLs (often found in logs, analytics, or browser history) to understand
                their original parameters and paths.
              </p>
            </li>

            <li>
              <strong>Working with Web APIs</strong>
              <p>
                Ensure data sent to REST APIs via URL parameters or path segments is correctly encoded according to RFC
                3986.
              </p>
            </li>

            <li>
              <strong>Understanding Percent-Encoding</strong>
              <p>Learn how different characters (spaces, symbols, non-ASCII) are represented in URLs when encoded.</p>
            </li>

            <li>
              <strong>
                Encoding Data in <code>mailto:</code> Links
              </strong>
              <p>
                Safely encode subject lines or body content containing special characters for use in{" "}
                <code>mailto:</code> URLs.
              </p>
            </li>

            <li>
              <strong>Handling International Characters</strong>
              <p>
                Encode non-ASCII characters (like accents or characters from other languages) for reliable use in URLs.
              </p>
            </li>

            <li>
              <strong>Preparing URLs for Embedding</strong>
              <p>
                Encode URLs before embedding them in text formats like Markdown or HTML where characters like{" "}
                <code>&</code> might conflict.
              </p>
            </li>

            <li>
              <strong>Creating Bookmarklets</strong>
              <p>
                Encode JavaScript code containing special characters to create functional bookmarklets (
                <code>javascript:...</code>).
              </p>
            </li>

            <li>
              <strong>Decoding Obfuscated Links</strong>
              <p>
                Analyze tracking parameters or decode URLs that have been intentionally percent-encoded for obfuscation.
              </p>
            </li>
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            The tool primarily uses the browser&apos;s built-in JavaScript functions: <code>encodeURIComponent()</code>{" "}
            for encoding and <code>decodeURIComponent()</code> for decoding. <code>encodeURIComponent()</code> is
            typically preferred as it encodes characters like <code>&</code>, <code>=</code>, <code>?</code>,{" "}
            <code>#</code>, which have special meaning in URLs. <code>encodeURI()</code> exists but encodes fewer
            characters. The process converts unsafe characters into a <code>%</code> followed by their two-digit
            hexadecimal representation based on their UTF-8 encoding. The decoding process reverses this transformation.
          </p>
        </div>
      </div>
    </div>
  );
}
