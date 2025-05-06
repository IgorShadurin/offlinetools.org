import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about key-value pair errors
 */
export const metadata: Metadata = {
  title: "Key-Value Pair Errors in JSON Formatting | Offline Tools",
  description: "Learn about common key-value pair errors in JSON documents and effective strategies to identify and resolve these formatting issues.",
};

/**
 * Article page component for key-value pair errors in JSON formatting
 */
export default function KeyValuePairErrorsArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Key-Value Pair Errors in JSON Formatting</h1>
        
        <div className="space-y-6">
          <p>
            JSON (JavaScript Object Notation) relies on key-value pairs as its fundamental building blocks for 
            organizing data. These pairs form the basis of JSON objects, making them crucial for proper JSON 
            formatting. However, they can also be the source of common errors that break JSON validation. 
            In this article, we&apos;ll explore frequent key-value pair errors and how to efficiently 
            identify and resolve them.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Understanding JSON Key-Value Pairs</h2>
          <p>
            In JSON, a key-value pair consists of a key (always a string) and a value (which can be a string, 
            number, object, array, boolean, or null), separated by a colon. Multiple key-value pairs within 
            an object are separated by commas.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Basic Key-Value Pair Syntax:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "key1": "string value",
  "key2": 42,
  "key3": true,
  "key4": null,
  "key5": { "nested": "object" },
  "key6": [1, 2, 3]
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Common Key-Value Pair Errors</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Missing or Invalid Quotation Marks for Keys</h3>
          <p>
            In JSON, keys must be strings and must be enclosed in double quotes. Using unquoted keys or 
            single quotes is a common error that leads to invalid JSON.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  name: "John",
  'age': 30,
  "email": "john@example.com"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">The key &quot;name&quot; has no quotes, and &quot;age&quot; uses single quotes instead of double quotes</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}`}
              </pre>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Common Confusion:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Many developers confuse JSON with JavaScript object literals, where keys don&apos;t require quotes.
              Remember that while JavaScript is more forgiving, JSON has stricter syntax requirements.
            </p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Missing Colons Between Keys and Values</h3>
          <p>
            The key and value in a key-value pair must be separated by a colon. Forgetting this separator
            or using another character instead will result in invalid JSON.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name" "John",
  "age" = 30,
  "email": "john@example.com"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Missing colon after &quot;name&quot; and using equals sign instead of a colon for &quot;age&quot;</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Missing Commas Between Key-Value Pairs</h3>
          <p>
            Multiple key-value pairs in a JSON object must be separated by commas. Omitting these commas
            is a frequent error, especially in larger JSON structures.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "id": 123
  "name": "Product"
  "price": 29.99,
  "available": true
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Missing commas after the &quot;id&quot; and &quot;name&quot; key-value pairs</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "id": 123,
  "name": "Product",
  "price": 29.99,
  "available": true
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">4. Trailing Commas</h3>
          <p>
            While some programming languages allow trailing commas after the last key-value pair in an object,
            JSON does not permit this. Including a trailing comma is a common error when manually writing JSON.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "id": 123,
  "name": "Product",
  "price": 29.99,
  "available": true,
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Trailing comma after the last key-value pair</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "id": 123,
  "name": "Product",
  "price": 29.99,
  "available": true
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">5. Duplicate Keys</h3>
          <p>
            JSON technically allows duplicate keys, but many parsers will only use the last value associated with
            a duplicate key, effectively overwriting previous values. This can lead to unexpected behavior and data loss.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "setting": "dark",
  "value": 42,
  "setting": "light"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Duplicate key &quot;setting&quot; will result in only the second value (&quot;light&quot;) being used</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Better Structure:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "setting": "light",
  "value": 42
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Or, if both values are needed:</p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
{`{
  "settings": {
    "theme": "light",
    "previousTheme": "dark"
  },
  "value": 42
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">6. Invalid Key Names</h3>
          <p>
            While JSON allows any string as a key, including spaces and special characters, it&apos;s important
            to consider how different parsers and languages handle these keys. Some systems might have difficulty
            with certain characters in key names.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic (in some contexts):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user name": "John",
  "@email": "john@example.com",
  "2022-revenue": 50000
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">While valid JSON, these keys might cause issues in some programming languages</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">More Compatible Structure:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "userName": "John",
  "email": "john@example.com",
  "revenue2022": 50000
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">7. Type Mismatch Errors</h3>
          <p>
            While not strictly a syntax error, inconsistent value types for the same key across different
            objects can cause problems when processing the JSON data in strongly-typed languages.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`[
  {
    "id": 1,
    "quantity": 5
  },
  {
    "id": 2,
    "quantity": "10"
  }
]`}
              </pre>
            </div>
            <p className="mt-2 text-sm">The &quot;quantity&quot; value is a number in the first object but a string in the second</p>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Consistent Types:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`[
  {
    "id": 1,
    "quantity": 5
  },
  {
    "id": 2,
    "quantity": 10
  }
]`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Tools and Techniques for Identifying Key-Value Pair Errors</h2>
          
          <h3 className="text-xl font-medium mt-6">1. JSON Validators and Formatters</h3>
          <p>
            JSON formatters like our tool can automatically identify common key-value pair errors
            and provide specific error messages that point to the exact location of the problem.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Formatter Advantage:</h3>
            <p className="mt-2 text-blue-700 dark:text-blue-200">
              Our JSON Formatter not only identifies errors but also highlights the specific location
              of key-value pair issues, making them easier to spot and fix quickly.
            </p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Visual Inspection Techniques</h3>
          <p>
            For manual inspection, proper indentation and alignment of key-value pairs can make it
            much easier to spot missing commas, colons, or quotation marks.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Before Formatting:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{"user":"John","settings":{"theme":"dark","notifications":true,"preferences":{"language":"en","timezone":"UTC+0"}}}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium mt-4">After Formatting:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user": "John",
  "settings": {
    "theme": "dark",
    "notifications": true,
    "preferences": {
      "language": "en",
      "timezone": "UTC+0"
    }
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">The formatted version makes it much easier to inspect key-value pairs</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. JSON Schema Validation</h3>
          <p>
            For more complex JSON structures, using JSON Schema validation can help ensure that key-value
            pairs follow the expected structure, including proper types and required fields.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Simple JSON Schema Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "active": { "type": "boolean" }
  },
  "required": ["id", "name", "email"]
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">This schema validates that the JSON has the required key-value pairs with the correct types</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Real-world Example: Fixing Key-Value Pair Errors</h2>
          
          <p>
            Let&apos;s examine a real-world example of a JSON document with multiple key-value pair errors
            and how to systematically correct them:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "order": {
    id: 12345,
    customer: {
      "name": "Jane Smith"
      'email': "jane@example.com",
      "phone": 5551234567
    },
    "items": [
      { "product": "Laptop", "price": 999.99, "quantity": 1, },
      { "product": "Mouse", "price": 24.99 "quantity": 2 },
      { "product": "Keyboard", price: "79.99", "quantity": 1 }
    ],
    "shipping": {
      "address": "123 Main St",
      "city": "Springfield",
      "address": "Apt 4B, 123 Main St",
      "zip": 12345
    },
    "total": 1129.96,
  }
}`}
              </pre>
            </div>
            
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Corrected JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "order": {
    "id": 12345,
    "customer": {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": 5551234567
    },
    "items": [
      { "product": "Laptop", "price": 999.99, "quantity": 1 },
      { "product": "Mouse", "price": 24.99, "quantity": 2 },
      { "product": "Keyboard", "price": 79.99, "quantity": 1 }
    ],
    "shipping": {
      "address": "Apt 4B, 123 Main St",
      "city": "Springfield",
      "zip": 12345
    },
    "total": 1129.96
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">
              Fixes applied: Added quotes around keys, fixed missing commas, removed trailing commas, 
              corrected single quotes to double quotes, fixed the type of &quot;price&quot; for the keyboard,
              and removed the duplicate &quot;address&quot; key (keeping the more specific one).
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Best Practices for Avoiding Key-Value Pair Errors</h2>
          
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <strong>Use a JSON formatter or validator</strong> before attempting to use your JSON in an application.
            </li>
            <li>
              <strong>Be consistent with value types</strong> for the same keys across your JSON structure.
            </li>
            <li>
              <strong>Avoid special characters in key names</strong> when possible for better compatibility.
            </li>
            <li>
              <strong>Generate JSON programmatically</strong> rather than writing it manually to avoid syntax errors.
            </li>
            <li>
              <strong>Use proper indentation</strong> to make your JSON more readable and easier to debug.
            </li>
            <li>
              <strong>Implement JSON Schema validation</strong> for complex structures to enforce consistency.
            </li>
            <li>
              <strong>Be mindful of language differences</strong> – remember that JSON is not the same as JavaScript object literals.
            </li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Key-value pair errors are among the most common issues in JSON documents. By understanding these
            common pitfalls and applying the techniques discussed in this article, you can efficiently identify
            and resolve these errors, ensuring your JSON is valid and properly formatted.
          </p>
          
          <p>
            Remember that well-formatted JSON not only prevents parsing errors but also makes your data more 
            maintainable and easier to work with. Using tools like our JSON Formatter can significantly 
            streamline the process of detecting and fixing key-value pair errors, saving you valuable 
            development time.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 