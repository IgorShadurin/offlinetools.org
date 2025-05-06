import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

export const metadata: Metadata = {
  title: "Missing Brackets: The Most Common JSON Error and Its Solutions | Offline Tools",
  description: "Learn how to identify and fix missing brackets in JSON documents, the most common JSON syntax error faced by developers.",
};

export default function MissingBracketsArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Missing Brackets: The Most Common JSON Error and Its Solutions</h1>
        
        <div className="space-y-6">
          <p>
            JSON (JavaScript Object Notation) is a lightweight data-interchange format that's both human and machine-readable. 
            Despite its simplicity, bracket errors are the most common issues developers encounter when working with JSON. 
            Missing brackets can break your entire JSON structure and cause parsing failures in applications.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Why Brackets Matter in JSON</h2>
          <p>
            JSON uses two types of brackets to define its structure:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Curly braces { } </strong> - Define objects, the foundation of JSON documents</li>
            <li><strong>Square brackets [ ] </strong> - Define arrays, ordered collections of values</li>
          </ul>
          <p>
            When either type of bracket is missing or mismatched, the JSON parser cannot properly interpret 
            the structure, leading to syntax errors.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Common Missing Bracket Scenarios</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Unclosed Object</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name": "John Doe",
  "age": 30,
  "contact": {
    "email": "john@example.com",
    "phone": "555-1234"
`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Error: Unexpected end of JSON input</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Unclosed Array</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"
  ]
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Error: Expected ',' or '}' after property value in JSON</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Missing Inner Object Closing Bracket</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "settings": {
    "theme": "dark",
    "notifications": true
  ,
  "user": {
    "id": 1234,
    "role": "admin"
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Error: Expected '}' after property value in JSON</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">How to Spot and Fix Missing Brackets</h2>
          
          <h3 className="text-xl font-medium mt-6">Visual Inspection Tips</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Check for balanced brackets by counting opening and closing brackets</li>
            <li>Look for proper nesting hierarchies</li>
            <li>Verify each opening bracket has a corresponding closing bracket</li>
            <li>Pay attention to line endings where brackets are commonly forgotten</li>
            <li>Check nested structures carefully</li>
          </ol>
          
          <h3 className="text-xl font-medium mt-6">Using a JSON Formatter</h3>
          <p>
            The most reliable way to identify and fix missing brackets is to use a JSON formatter 
            with validation capabilities. A good formatter will:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Highlight syntax errors and pinpoint their location</li>
            <li>Show line numbers to help you locate the issue</li>
            <li>Format the JSON to make the structure visually clearer</li>
            <li>Provide error messages explaining what's wrong</li>
          </ul>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              When you encounter a missing bracket error, start from the innermost structure and work your way out, 
              fixing each level before moving to the next. This methodical approach helps when dealing with deeply nested JSON.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Before/After Examples</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Complex Object with Missing Brackets:</h3>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-red-600 dark:text-red-400">Before (with errors):</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "product": {
    "id": "AB-123",
    "name": "Smart Speaker",
    "price": 129.99,
    "features": [
      "Voice Control",
      "Wi-Fi Connectivity",
      "Multi-room Audio"
    ],
    "specifications": {
      "dimensions": {
        "height": "180mm",
        "width": "100mm"
      "weight": "1.5kg",
      "colors": ["black", "white", "gray"]
  },
  "availability": true
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-green-600 dark:text-green-400">After (fixed):</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "product": {
    "id": "AB-123",
    "name": "Smart Speaker",
    "price": 129.99,
    "features": [
      "Voice Control",
      "Wi-Fi Connectivity",
      "Multi-room Audio"
    ],
    "specifications": {
      "dimensions": {
        "height": "180mm",
        "width": "100mm"
      },
      "weight": "1.5kg",
      "colors": ["black", "white", "gray"]
    }
  },
  "availability": true
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Prevention Strategies</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Use an editor with bracket highlighting and matching</li>
            <li>Format your JSON regularly while working with it</li>
            <li>Validate JSON before using it in production environments</li>
            <li>Use code linters that can detect unbalanced brackets</li>
            <li>When manually editing JSON, add both brackets first, then fill in the content</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8">Tools for Handling Bracket Errors</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Online JSON Formatters</strong> - Instantly validate and highlight missing brackets</li>
            <li><strong>IDE Extensions</strong> - Provide real-time bracket matching as you type</li>
            <li><strong>JSON Lint Tools</strong> - Check JSON validity with detailed error reporting</li>
            <li><strong>JSON Schema Validators</strong> - Validate structure against a defined schema</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Missing brackets are the most common JSON syntax errors, but they're also among the easiest to identify and fix 
            with the right tools. By understanding JSON's structure and using formatters or validators, you can quickly 
            diagnose and resolve these issues. Remember that a well-formed JSON document has perfectly balanced brackets, 
            with each opening bracket paired with a corresponding closing bracket.
          </p>
          
          <p>
            When in doubt, use a JSON formatter to validate your document before using it in your application. This simple step 
            can save hours of debugging time and prevent data processing errors down the line.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 