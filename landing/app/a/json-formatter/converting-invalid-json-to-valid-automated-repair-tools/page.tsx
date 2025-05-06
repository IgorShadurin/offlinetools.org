import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about converting invalid JSON to valid
 */
export const metadata: Metadata = {
  title: "Converting Invalid JSON to Valid: Automated Repair Tools | Offline Tools",
  description: "Discover automated tools and techniques that can help transform invalid JSON into valid, well-formatted JSON with minimal manual intervention.",
};

/**
 * Article page component for converting invalid JSON to valid with automated repair tools
 */
export default function ConvertingInvalidJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Converting Invalid JSON to Valid: Automated Repair Tools</h1>
        
        <div className="space-y-6">
          <p>
            Working with JSON data often involves dealing with malformed or invalid JSON from various sources.
            Whether it&apos;s from user input, external APIs, or legacy systems, invalid JSON can halt your application
            and cause significant headaches. Fortunately, there are automated tools and techniques that can help
            transform invalid JSON into valid, well-formatted JSON with minimal manual intervention.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Common JSON Validity Issues</h2>
          <p>
            Before exploring repair tools, it&apos;s helpful to understand the most common issues that make JSON invalid:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <ul className="list-disc ml-6 space-y-2">
              <li>Missing or mismatched brackets, braces, and quotes</li>
              <li>Trailing or missing commas</li>
              <li>Unquoted property names (allowed in JavaScript objects but not in JSON)</li>
              <li>Single quotes instead of double quotes</li>
              <li>Inclusion of comments (not supported in standard JSON)</li>
              <li>Duplicate keys in objects</li>
              <li>Invalid escape sequences in strings</li>
              <li>JavaScript-specific values like undefined, NaN, or Infinity</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Automated Repair Approaches</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Syntax Error Correction</h3>
          <p>
            The most basic level of JSON repair involves fixing syntax errors that prevent the JSON from being parsed.
            These tools analyze the structure of the invalid JSON and apply corrections based on pattern recognition.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
  "active": true
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Missing comma after the email field</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Repaired JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "active": true
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Comma added automatically by repair tool</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Quote Fixing</h3>
          <p>
            Many JSON errors stem from improper quoting, such as using single quotes instead of double quotes,
            or forgetting to quote property names. Automated tools can detect and fix these issues.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  name: "Product",
  'price': 29.99,
  "available": true
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Unquoted property name and single quotes used</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Repaired JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name": "Product",
  "price": 29.99,
  "available": true
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Property names properly quoted with double quotes</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Comment Removal</h3>
          <p>
            Standard JSON doesn&apos;t support comments, but developers often add them for clarity.
            Repair tools can strip out comments while preserving the actual data.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON with Comments:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "config": {
    // Database settings
    "database": {
      "host": "localhost",
      "port": 5432 // Default PostgreSQL port
    },
    /* User authentication
       settings */
    "auth": {
      "timeout": 3600
    }
  }
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Repaired JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "config": {
    "database": {
      "host": "localhost",
      "port": 5432
    },
    "auth": {
      "timeout": 3600
    }
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Comments removed to make the JSON valid</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">4. Value Conversion</h3>
          <p>
            Some JSON repair tools can convert JavaScript-specific values to JSON-compatible equivalents.
            For example, <code>undefined</code> can be converted to <code>null</code>, and <code>NaN</code> 
            or <code>Infinity</code> can be converted to strings or numeric values.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON with JavaScript Values:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "values": [1, NaN, Infinity, undefined]
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Repaired JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "values": [1, null, 1.7976931348623157e+308, null]
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Non-JSON values converted to JSON-compatible equivalents</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">5. Trailing Comma Removal</h3>
          <p>
            While various programming languages allow trailing commas in objects and arrays, JSON does not.
            Automated tools can identify and remove these trailing commas.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid JSON with Trailing Commas:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "items": [
    "apple",
    "orange",
    "banana",
  ],
  "counts": {
    "apple": 5,
    "orange": 10,
    "banana": 7,
  },
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Repaired JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "items": [
    "apple",
    "orange",
    "banana"
  ],
  "counts": {
    "apple": 5,
    "orange": 10,
    "banana": 7
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Trailing commas removed from both the array and objects</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Popular JSON Repair Tools</h2>
          
          <h3 className="text-xl font-medium mt-6">1. JSON Formatter</h3>
          <p>
            Our JSON Formatter tool not only formats and beautifies JSON but also includes repair capabilities
            to fix common syntax errors. It can handle missing commas, quote issues, and provide detailed error
            messages to help you understand what went wrong.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Key Feature:</h3>
            <p className="mt-2 text-blue-700 dark:text-blue-200">
              Our JSON Formatter works completely offline, ensuring that your potentially sensitive data
              never leaves your computer during the repair process.
            </p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. JSONLint</h3>
          <p>
            JSONLint is a popular online validator that not only verifies your JSON but also provides
            detailed error messages and suggestions for fixing issues. While it doesn&apos;t automatically
            repair the JSON, its precise error reporting makes manual correction much easier.
          </p>
          
          <h3 className="text-xl font-medium mt-6">3. json-parse-better-errors</h3>
          <p>
            This JavaScript library provides more helpful error messages when parsing invalid JSON,
            making it easier to understand what went wrong and how to fix it. It&apos;s particularly
            useful for developers building applications that need to handle potentially invalid JSON.
          </p>
          
          <h3 className="text-xl font-medium mt-6">4. JSONRepair</h3>
          <p>
            JSONRepair is a dedicated library that focuses specifically on fixing invalid JSON.
            It can handle a wide range of errors, including unquoted keys, trailing commas, and
            missing brackets. It&apos;s available as both a standalone library and integrated into
            various JSON tools.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Advanced Repair Techniques</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Schema-Based Validation and Repair</h3>
          <p>
            For more structured approaches, JSON Schema can be used not only to validate JSON data
            but also to guide repair processes. The schema defines the expected structure, types,
            and constraints of the JSON, allowing repair tools to make more intelligent corrections.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JSON Schema Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number", "minimum": 0 },
    "email": { "type": "string", "format": "email" },
    "tags": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["name", "email"]
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">This schema can guide repairs by enforcing types and required fields</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Machine Learning Approaches</h3>
          <p>
            More advanced repair systems use machine learning techniques to analyze patterns in valid JSON
            and apply probabilistic repairs to invalid JSON. These systems can learn from large datasets
            of JSON documents to make more accurate predictions about likely repairs.
          </p>
          
          <h3 className="text-xl font-medium mt-6">3. Incremental Parsing and Repair</h3>
          <p>
            Some sophisticated tools use incremental parsing strategies, where they process the JSON
            document step by step, identifying issues and applying fixes at each stage. This approach
            can handle more complex errors that might be difficult to fix with a single-pass approach.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Real-world Example: Repairing Complex Invalid JSON</h2>
          
          <p>
            Let&apos;s look at a more complex example of invalid JSON that combines multiple issues
            and see how an automated repair tool would address them:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Invalid Complex JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  // Configuration settings
  config: {
    server: {
      'host': 'api.example.com',
      port: 443
      protocol: 'https',
    },
    timeouts: [1000, 2000, undefined, 5000,],
    features: {
      logging: true,
      caching: {
        enabled: true,
        duration: NaN,
      },
    }
  },
  data: [
    { id: 1, name: "Item 1" },
    { id: 2, name: 'Item 2', },
    { id: 3, name: "Item 3" }
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Repaired JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "config": {
    "server": {
      "host": "api.example.com",
      "port": 443,
      "protocol": "https"
    },
    "timeouts": [1000, 2000, null, 5000],
    "features": {
      "logging": true,
      "caching": {
        "enabled": true,
        "duration": null
      }
    }
  },
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" },
    { "id": 3, "name": "Item 3" }
  ]
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Multiple issues fixed: comments removed, property names quoted, missing commas added, trailing commas removed, non-JSON values replaced, and proper closing brace added at the end.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">When to Be Cautious with Automated Repair</h2>
          <p>
            While automated JSON repair tools are powerful, there are situations where you should be cautious:
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Considerations:</h3>
            <ul className="mt-2 space-y-2 text-yellow-700 dark:text-yellow-200 list-disc ml-6">
              <li><strong>Security-sensitive data:</strong> Automated repairs might change the meaning of your data in unexpected ways.</li>
              <li><strong>Financial or critical systems:</strong> For mission-critical applications, manual validation may be necessary.</li>
              <li><strong>Large datasets:</strong> Automated repairs might hide systematic issues that should be addressed at the source.</li>
              <li><strong>When the original intent is unclear:</strong> If it&apos;s not obvious what the correct repair should be, manual intervention is better.</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Best Practices for JSON Repair</h2>
          
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <strong>Validate before repair:</strong> Understand what issues exist before attempting automated repair.
            </li>
            <li>
              <strong>Use tools with detailed error reporting:</strong> Choose repair tools that explain what was changed and why.
            </li>
            <li>
              <strong>Review repairs for critical data:</strong> Manually review the repaired JSON for important data to ensure the meaning wasn&apos;t altered.
            </li>
            <li>
              <strong>Address the source of invalid JSON:</strong> If receiving invalid JSON from an API or system, work with the provider to fix the root cause.
            </li>
            <li>
              <strong>Implement schema validation:</strong> Use JSON Schema to provide structure to your repair process.
            </li>
            <li>
              <strong>Test repairs with unit tests:</strong> Create test cases that verify your repair tools behave as expected for common error patterns.
            </li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Automated JSON repair tools provide a valuable way to transform invalid JSON into valid, well-formatted data
            with minimal manual intervention. From simple syntax fixes to complex structure repairs, these tools can save
            developers significant time and frustration when dealing with malformed JSON.
          </p>
          
          <p>
            While no automated repair tool is perfect, understanding the common patterns of JSON errors and the techniques
            used to fix them empowers you to choose the right repair approach for your specific needs. Whether you use
            our JSON Formatter tool or another solution, automated JSON repair can be an essential part of your data
            processing workflow.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 