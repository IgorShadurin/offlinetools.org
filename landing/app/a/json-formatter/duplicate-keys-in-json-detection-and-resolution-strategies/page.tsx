import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about duplicate keys in JSON
 */
export const metadata: Metadata = {
  title: "Duplicate Keys in JSON: Detection and Resolution Strategies | Offline Tools",
  description: "Learn how to identify duplicate keys in JSON documents and implement effective strategies to resolve these issues for valid JSON data.",
};

/**
 * Article page component for duplicate keys in JSON
 */
export default function DuplicateKeysInJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Duplicate Keys in JSON: Detection and Resolution Strategies</h1>
        
        <div className="space-y-6">
          <p>
            JSON (JavaScript Object Notation) is a widely used data interchange format, valued for its simplicity and readability. 
            However, one issue that can create subtle and difficult-to-debug problems is the presence of duplicate keys in JSON objects. 
            This article explores why duplicate keys are problematic, how different parsers handle them, and strategies for detecting 
            and resolving these issues to ensure your JSON data remains valid and reliable.
          </p>

          <h2 className="text-2xl font-semibold mt-8">The Problem with Duplicate Keys</h2>
          
          <p>
            In a JSON object, each key should be unique. When duplicate keys appear, it creates ambiguity:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">JSON with duplicate keys:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user": "john_doe",
  "email": "john@example.com",
  "role": "editor",
  "email": "john.doe@company.com"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">This JSON contains the key &quot;email&quot; twice with different values, creating uncertainty about which value should be used.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">What Does the JSON Specification Say?</h2>
          
          <p>
            Interestingly, the official JSON specification (ECMA-404 and RFC 8259) does not explicitly forbid duplicate keys. 
            However, it doesn&apos;t specify how they should be handled either, which leads to inconsistent behavior across different parsers and environments.
          </p>
          
          <p>
            From RFC 8259, Section 4:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <blockquote className="italic border-l-4 pl-4 border-gray-400 dark:border-gray-600">
            &quot;The names within an object SHOULD be unique.&quot;
            </blockquote>
            <p className="mt-2 text-sm">Note the word &quot;SHOULD&quot; rather than &quot;MUST&quot;, indicating that this is a recommendation, not a strict requirement.</p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">How Different Parsers Handle Duplicate Keys</h2>
          
          <p>
            The handling of duplicate keys varies significantly across programming languages and JSON parsers:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium">JavaScript Behavior:</h3>
              <p>
                In JavaScript, when JSON.parse() encounters duplicate keys, it uses the last value:
              </p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
{`const json = '{"a": 1, "a": 2}';
const obj = JSON.parse(json);
console.log(obj); // Output: {"a": 2}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Python Behavior:</h3>
              <p>
                Python&apos;s json module also keeps the last value by default:
              </p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
{`import json
data = json.loads('{"a": 1, "a": 2}')
print(data)  # Output: {'a': 2}`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Java Behavior:</h3>
              <p>
                Different Java JSON libraries handle duplicates differently:
              </p>
              <ul className="list-disc ml-6">
                <li>Jackson can be configured to fail on duplicates, use first or last value, or merge values</li>
                <li>Gson uses the last occurrence by default</li>
                <li>org.json uses the last value</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Since parsers handle duplicate keys differently, the same JSON document might be interpreted differently across systems. 
              This inconsistency can lead to data integrity issues, especially in systems that exchange JSON between different platforms.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">How to Detect Duplicate Keys</h2>
          
          <p>
            Detecting duplicate keys is essential for maintaining data integrity. Here are several approaches:
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. Using JSON Formatters with Duplicate Detection</h3>
          
          <p>
            Specialized JSON formatters (like our JSON Formatter tool) can identify duplicate keys during validation:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ol className="list-decimal ml-6 space-y-2">
              <li>Paste your JSON into a JSON formatter with validation capabilities</li>
              <li>The tool will highlight or report duplicate keys</li>
              <li>Review the highlighted issues and resolve them before using the JSON</li>
            </ol>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">2. Using Linting Tools</h3>
          
          <p>
            JSON linters can be integrated into your development workflow to catch duplicate keys:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>jsonlint</strong>: A command-line tool that can detect duplicate keys</li>
              <li><strong>ESLint</strong> with JSON plugins: Can check JSON files within JavaScript projects</li>
              <li><strong>IDE plugins</strong>: Many code editors have JSON validators that warn about duplicates</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">3. Programmatic Detection</h3>
          
          <p>
            You can write custom code to detect duplicate keys during JSON processing:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// JavaScript example for detecting duplicate keys
function detectDuplicateKeys(json) {
  const keysSeen = {};
  const duplicates = [];
  
  // Custom JSON parser that checks for duplicates
  JSON.parse(json, (key, value) => {
    if (key && typeof value !== 'object') {
      // Check if we're at a leaf node with a key
      if (keysSeen[key]) {
        // We've seen this key before
        if (!duplicates.includes(key)) {
          duplicates.push(key);
        }
      } else {
        keysSeen[key] = true;
      }
    }
    return value;
  });
  
  return duplicates;
}

// Usage
const json = '{"a": 1, "b": 2, "a": 3, "c": 4, "b": 5}';
const dupes = detectDuplicateKeys(json);
console.log("Duplicate keys found:", dupes); // ["a", "b"]`}
              </pre>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Strategies for Resolving Duplicate Keys</h2>
          
          <p>
            Once you&apos;ve detected duplicate keys, you&apos;ll need to resolve them. Here are several approaches:
          </p>
          
          <h3 className="text-xl font-semibold mt-6">1. Manual Consolidation</h3>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Before:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
{`{
  "user": "john_doe",
  "email": "john@example.com",
  "email": "john.doe@company.com"
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium mt-4">After (options):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
{`{
  "user": "john_doe",
  "email": "john.doe@company.com"
}

// OR, using arrays for multiple values
{
  "user": "john_doe",
  "email": ["john@example.com", "john.doe@company.com"]
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">2. Convert Values to Arrays</h3>
          
          <p>
            If both values are valid and needed, convert the property to an array:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// JavaScript function to merge duplicate keys into arrays
function mergeDuplicateKeys(json) {
  const obj = {};
  
  JSON.parse(json, (key, value) => {
    if (key) {
      if (obj[key] === undefined) {
        obj[key] = value;
      } else if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
      return undefined; // Skip normal handling
    }
    return value;
  });
  
  return JSON.stringify(obj);
}

// Usage
const json = '{"a": 1, "b": 2, "a": 3}';
const merged = mergeDuplicateKeys(json);
console.log(merged); // {"a":[1,3],"b":2}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">3. Use Namespacing or Prefixing</h3>
          
          <p>
            Another approach is to rename keys to avoid conflicts, especially when combining data from different sources:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user": "john_doe",
  "personal_email": "john@example.com",
  "work_email": "john.doe@company.com"
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">4. Schema Validation</h3>
          
          <p>
            Implement JSON Schema validation to prevent duplicate keys before they become a problem:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// JSON Schema example
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "user": { "type": "string" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["user", "email"],
  "additionalProperties": false
}`}
              </pre>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Best Practices for Preventing Duplicate Keys</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Use JSON formatters with validation</strong>: Before sharing or using JSON data, validate it with a tool that checks for duplicates
              </li>
              <li>
                <strong>Implement linting in CI/CD pipelines</strong>: Automatically check JSON for duplicates as part of your continuous integration
              </li>
              <li>
                <strong>Use structured generation tools</strong>: Generate JSON from structured data sources rather than manual editing
              </li>
              <li>
                <strong>Be careful with merging</strong>: When combining JSON objects, check for potential key conflicts
              </li>
              <li>
                <strong>Document key requirements</strong>: Maintain clear documentation about expected key structures
              </li>
              <li>
                <strong>Use namespacing conventions</strong>: Establish naming conventions that minimize the chance of duplicate keys
              </li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Real-world Examples</h2>
          
          <h3 className="text-xl font-semibold mt-6">Case 1: API Response Consolidation</h3>
          
          <p>
            When working with multiple API responses that might contain the same keys:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Prefixing for clarity
{
  "api1_user": { ... },
  "api1_metadata": { ... },
  "api2_user": { ... },
  "api2_metadata": { ... }
}

// Or using nested objects for isolation
{
  "api1": {
    "user": { ... },
    "metadata": { ... }
  },
  "api2": {
    "user": { ... },
    "metadata": { ... }
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mt-6">Case 2: Configuration Management</h3>
          
          <p>
            When working with configuration files where accidental duplicates might occur:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Using JSON Schema for validation
const Ajv = require("ajv");
const ajv = new Ajv({allowUnionTypes: true});

// Define the schema that prevents duplicates
const schema = {
  "type": "object",
  "properties": {
    "database": { "type": "object" },
    "server": { "type": "object" }
  },
  "additionalProperties": false
};

// Validate the configuration
const isValid = ajv.validate(schema, configObject);
if (!isValid) {
  console.error("Configuration validation error:", ajv.errors);
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