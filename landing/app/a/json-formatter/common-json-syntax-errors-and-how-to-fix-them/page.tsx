import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Common JSON Syntax Errors and How to Fix Them | Offline Tools",
  description: "Learn about common JSON syntax errors and how to fix them with our JSON formatter tool",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <ArticlePromo />
      
      <h1 className="text-3xl font-bold mb-6">Common JSON Syntax Errors and How to Fix Them</h1>
      
      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data interchange format that&apos;s easy for humans to read and write, 
          and easy for machines to parse. Despite its simplicity, JSON syntax errors are common and can be frustrating to debug.
          Let&apos;s look at the most frequent JSON syntax errors and how to fix them.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Missing or Extra Commas</h2>
        <p>
          The most common JSON error is incorrect comma usage. Each item in an array or property in an object 
          must be followed by a comma, except for the last one.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "name": "John",
  "age": 30, 
  "city": "New York" 
  "country": "USA"
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "name": "John",
  "age": 30, 
  "city": "New York", 
  "country": "USA"
}`}
          </pre>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "fruits": [
    "apple",
    "banana",
    "orange",
  ]
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "fruits": [
    "apple",
    "banana",
    "orange"
  ]
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">2. Unclosed Brackets and Braces</h2>
        <p>
          Every opening bracket or brace must have a matching closing one. Missing brackets are hard to spot in large JSON files.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "person": {
    "name": "Alice",
    "hobbies": ["reading", "hiking"
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "person": {
    "name": "Alice",
    "hobbies": ["reading", "hiking"]
  }
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">3. Using Single Quotes Instead of Double Quotes</h2>
        <p>
          JSON requires double quotes for both property names and string values. Single quotes are not valid in JSON.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  'name': 'Bob',
  'email': 'bob@example.com'
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "name": "Bob",
  "email": "bob@example.com"
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">4. Missing Quotes Around Property Names</h2>
        <p>
          Unlike JavaScript objects, JSON requires quotes around property names.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  name: "Charlie",
  age: 25
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "name": "Charlie",
  "age": 25
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">5. Invalid Escape Sequences</h2>
        <p>
          If you need to include quotes or special characters in strings, they must be properly escaped.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "message": "He said "Hello" to me",
  "path": "C:\\Users\\Documents"
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "message": "He said \\"Hello\\" to me",
  "path": "C:\\\\Users\\\\Documents"
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">6. Invalid Number Formats</h2>
        <p>
          JSON supports numbers without quotes, but there are restrictions:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>No leading + sign</li>
          <li>No leading zeros (except for decimal numbers less than 1)</li>
          <li>No trailing decimal point</li>
        </ul>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "price": +42.00,
  "quantity": 007,
  "discount": 10.
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "price": 42.00,
  "quantity": 7,
  "discount": 10.0
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">7. Real-World Example: API Response</h2>
        <p>
          Let&apos;s look at a real-world example of an invalid API configuration that might cause errors:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "api_config": {
    "base_url": "https://api.example.com/v1",
    "timeout": 30,
    "retry": {
      "max_attempts": 3
      "backoff_ms": 1000,
    },
    "auth": {
      "type": 'oauth2',
      "client_id": "abc123"
    }
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "api_config": {
    "base_url": "https://api.example.com/v1",
    "timeout": 30,
    "retry": {
      "max_attempts": 3,
      "backoff_ms": 1000
    },
    "auth": {
      "type": "oauth2",
      "client_id": "abc123"
    }
  }
}`}
          </pre>
        </div>
        
        <h2 className="text-2xl font-semibold mt-8">How to Prevent and Fix JSON Errors</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Use a JSON formatter to validate and prettify your JSON</li>
          <li>Check for matching pairs of braces and brackets</li>
          <li>Ensure correct comma placement (after each item except the last)</li>
          <li>Always use double quotes for strings and property names</li>
          <li>Properly escape special characters</li>
          <li>Pay attention to error messages - they often point to the exact line with the problem</li>
        </ol>
      </div>
      
      <div className="mt-10">
        <ArticlePromo />
      </div>
    </ArticlePromoProvider>
  );
} 