import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about handling comments in JSON
 */
export const metadata: Metadata = {
  title: "Handling Comments in JSON (Even Though They're Not Supported) | Offline Tools",
  description: "Learn alternative approaches for adding comments to JSON files despite the format not officially supporting them, and discover workarounds for documentation purposes.",
};

/**
 * Article page component for handling comments in JSON
 */
export default function HandlingCommentsInJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Handling Comments in JSON (Even Though They&apos;re Not Supported)</h1>
        
        <div className="space-y-6">
          <p>
            One of the common frustrations developers face when working with JSON is the lack of native 
            support for comments. Unlike many configuration formats and programming languages, JSON has 
            no built-in comment syntax. This limitation can make JSON files harder to maintain, 
            especially for configuration settings or data that requires explanation. This article explores 
            why JSON doesn&apos;t support comments, and provides practical workarounds for including comments 
            or documentation in your JSON files.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Why JSON Doesn&apos;t Support Comments</h2>
          
          <p>
            Douglas Crockford, who formalized the JSON specification, intentionally excluded comments from JSON for several reasons:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Simplicity</strong>: The absence of comments keeps the JSON format and its parsers simpler</li>
              <li><strong>Data interchange focus</strong>: JSON is primarily designed for data interchange between applications, not as a configuration format</li>
              <li><strong>Interoperability</strong>: Excluding comments reduces the chance of incompatibility between different JSON implementations</li>
              <li><strong>Prevention of abuse</strong>: Comments could potentially be misused for directives that affect processing</li>
            </ul>
          </div>
          
          <p>
            As Crockford explained: &quot;I removed comments from JSON because I saw people were using them to hold parsing directives, 
            a practice which would have destroyed interoperability.&quot;
          </p>

          <h2 className="text-2xl font-semibold mt-8">Common Workarounds for JSON Comments</h2>
          
          <p>
            Despite the lack of official support, developers have devised several approaches to include comments or documentation within JSON:
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. Using Comment Properties</h3>
          
          <p>
            The most straightforward approach is to create dedicated properties for comments within your JSON objects:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Using comment properties:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "_comment": "Configuration settings for the application",
  "apiEndpoint": "https://api.example.com",
  "timeout": 30,
  "retryCount": 3,
  "features": {
    "_comment": "Feature toggle settings for each module",
    "newUI": true,
    "betaFeatures": false
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">This approach is straightforward but adds overhead to your JSON size and requires applications to ignore these special properties.</p>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">2. Using Metadata Properties</h3>
          
          <p>
            A more structured approach is to include a dedicated metadata section that contains documentation:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "metadata": {
    "description": "User preferences configuration",
    "version": "1.2.0",
    "lastModified": "2023-04-15",
    "notes": "Added new theme options"
  },
  "settings": {
    "theme": "dark",
    "notifications": true,
    "autoSave": false
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">3. Using Adjacent Documentation</h3>
          
          <p>
            For many use cases, the best solution is to store documentation separately from the JSON itself:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>README files</strong>: Keep a separate markdown file alongside your JSON</li>
              <li><strong>Schema documentation</strong>: Use JSON Schema to document the expected structure and values</li>
              <li><strong>Code comments</strong>: If the JSON is embedded in code, use the host language&apos;s comment syntax</li>
              <li><strong>External documentation</strong>: Reference more comprehensive documentation elsewhere</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Using JSON5 or JSONC When Comments Are Essential</h2>
          
          <p>
            If comments are absolutely essential for your use case, consider using extended JSON formats that support comments:
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. JSON5</h3>
          
          <p>
            JSON5 is an extension of JSON that aims to be more human-friendly, including support for comments:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  // This is a single-line comment
  "name": "JSON5 Example",
  "version": "1.0.0",
  /* This is a
     multi-line comment */
  "description": "A configuration file with comments",
  "enabled": true,
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">JSON5 adds several features beyond standard JSON, including comments, trailing commas, and unquoted keys.</p>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">2. JSONC (JSON with Comments)</h3>
          
          <p>
            JSONC is another extension that supports comments while staying closer to the original JSON format:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  // Settings for development environment
  "server": {
    "port": 3000,
    "host": "localhost"
  },
  /* Security configuration
     with detailed explanation */
  "security": {
    "enableAuth": true,
    "tokenExpiration": 3600
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">JSONC is commonly used in development tools like Visual Studio Code for configuration files.</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              While JSON5 and JSONC are useful for development and configuration files, they should not be used for data interchange between different systems unless all systems explicitly support these formats. For interchange, stick to standard JSON.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Pre-processing and Post-processing Approaches</h2>
          
          <p>
            Another approach is to work with comments during development, but strip them out when generating the final JSON:
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. Pre-processing</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li>Author in JSONC or JSON5 with comments</li>
              <li>Use a tool to strip comments before deploying</li>
              <li>Examples: <code>strip-json-comments</code> (Node.js), <code>jq</code> (command line)</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">2. Using JSON-generating Tools</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li>Generate JSON from formats that do support comments (YAML, TOML)</li>
              <li>Document in the source format, then convert to JSON for deployment</li>
              <li>Example workflow: maintain in YAML with comments → convert to JSON for production</li>
            </ul>
          </div>
          
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`# YAML source with comments
# This is the main configuration file
server:
  # Development server port
  port: 8080
  # Bind to all interfaces
  host: "0.0.0.0"

# Security settings
security:
  enabled: true
  # Token validity in seconds
  tokenLifetime: 3600`}
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Best Practices for Documenting JSON</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Be consistent</strong>: Choose one approach and use it consistently throughout your project</li>
              <li><strong>Consider the context</strong>: For configuration files, JSON5 might be appropriate; for APIs, use standard JSON with separate documentation</li>
              <li><strong>Validate before deployment</strong>: Ensure your JSON is valid after removing comments or converting from other formats</li>
              <li><strong>Use JSON Schema</strong>: Create a schema that documents your JSON structure formally</li>
              <li><strong>Keep documentation up-to-date</strong>: Ensure your comments or documentation are maintained when the JSON structure changes</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">JSON Schema for Documentation</h3>
          
          <p>
            JSON Schema provides a powerful way to document JSON structures while also enabling validation:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User Configuration",
  "description": "Settings for user preferences in the application",
  "type": "object",
  "properties": {
    "theme": {
      "type": "string",
      "description": "UI theme preference (light or dark)",
      "enum": ["light", "dark", "system"]
    },
    "notifications": {
      "type": "boolean",
      "description": "Whether to enable push notifications"
    },
    "refreshInterval": {
      "type": "integer",
      "description": "Data refresh interval in seconds",
      "minimum": 30,
      "maximum": 3600
    }
  },
  "required": ["theme", "notifications"]
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 