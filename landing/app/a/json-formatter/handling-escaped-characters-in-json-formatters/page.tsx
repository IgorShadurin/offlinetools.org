import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for the article about handling escaped characters in JSON formatters
 */
export const metadata: Metadata = {
  title: "Handling Escaped Characters in JSON Formatters | Offline Tools",
  description: "Learn how JSON formatters handle escaped characters, common escaping issues, and best practices for working with special characters in JSON.",
};

/**
 * Article page component about handling escaped characters in JSON formatters
 */
export default function EscapedCharactersInJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Handling Escaped Characters in JSON Formatters</h1>
        
        <div className="space-y-6">
          <p>
            JSON (JavaScript Object Notation) is a widely used data interchange format that supports various data types,
            including strings containing special characters. These special characters often need to be escaped to maintain
            valid JSON structure. In this article, we&apos;ll explore how JSON formatters handle these escaped characters,
            common issues that arise, and best practices for working with them.
          </p>

          <h2 className="text-2xl font-semibold mt-8">What Are Escaped Characters in JSON?</h2>
          <p>
            In JSON, certain characters within string values need to be escaped using a backslash (\) to prevent them from
            being interpreted as control characters. Common examples include:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Common Escaped Characters in JSON:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><code>\&quot;</code> - Double quote</li>
              <li><code>\\</code> - Backslash</li>
              <li><code>\/</code> - Forward slash (optional escape)</li>
              <li><code>\b</code> - Backspace</li>
              <li><code>\f</code> - Form feed</li>
              <li><code>\n</code> - New line</li>
              <li><code>\r</code> - Carriage return</li>
              <li><code>\t</code> - Tab</li>
              <li><code>\uXXXX</code> - Unicode character (where XXXX is a 4-digit hex code)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mt-8">How JSON Formatters Process Escaped Characters</h2>
          <p>
            When you use a JSON formatter, it performs several operations with escaped characters:
          </p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Recognition:</strong> The formatter identifies escaped sequences and treats them as single entities rather than separate characters.
            </li>
            <li>
              <strong>Validation:</strong> It verifies that the escape sequences are valid according to the JSON specification.
            </li>
            <li>
              <strong>Visualization:</strong> Some formatters will display the escaped characters in a human-readable form while preserving the correct escaped version in the formatted output.
            </li>
            <li>
              <strong>Preservation:</strong> When formatting, the tool maintains all necessary escapes to ensure the JSON remains valid.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8">Common Issues with Escaped Characters</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Double Escaping</h3>
          <p>
            One of the most common mistakes is double escaping, which happens when characters are escaped multiple times.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect (Double Escaped):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "path": "C:\\\\\\\\Users\\\\\\\\Documents"
}`}
              </pre>
            </div>
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Correct:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "path": "C:\\\\Users\\\\Documents"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">
              In JSON, each backslash must be escaped with another backslash. The correct representation of a Windows path like <code>C:\Users\Documents</code> in JSON is <code>&quot;C:\\\\Users\\\\Documents&quot;</code>.
            </p>
          </div>

          <h3 className="text-xl font-medium mt-6">2. Missing Escapes for Quotes</h3>
          <p>
            Forgetting to escape quotes inside string values is a frequent syntax error.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "message": "The user said "hello" to the system"
}`}
              </pre>
            </div>
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Correct:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "message": "The user said \\"hello\\" to the system"
}`}
              </pre>
            </div>
          </div>

          <h3 className="text-xl font-medium mt-6">3. Incorrect Unicode Escapes</h3>
          <p>
            Unicode escape sequences must follow the format <code>\uXXXX</code> with exactly four hexadecimal digits.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incorrect:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "copyright": "Copyright \\u00A9 2023",
  "temperature": "20\\u00B0C",
  "euro": "\\u20AC 100"
}`}
              </pre>
            </div>
            <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Correct:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "copyright": "Copyright \\u00A9 2023",
  "temperature": "20\\u00B0C",
  "euro": "\\u20AC 100"
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">
              The correct version uses proper Unicode escapes. When displayed, these will render as: &quot;Copyright © 2023&quot;, &quot;20°C&quot;, and &quot;€ 100&quot;.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Real-World Applications</h2>
          <p>
            Dealing with escaped characters is particularly important in these common scenarios:
          </p>

          <h3 className="text-xl font-medium mt-6">1. API Configuration</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "api_endpoints": {
    "search": "https://api.example.com/search?q={query}&format=json",
    "regex_pattern": "^user\\\\d+$",
    "javascript_code": "function sayHello() { alert(\\"Hello!\\"); }"
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm">
              In this example, notice how special characters in URLs, regex patterns, and embedded code are properly escaped.
            </p>
          </div>

          <h3 className="text-xl font-medium mt-6">2. Internationalization (i18n) Files</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "greetings": {
    "welcome": "Welcome to our application!",
    "hello_with_name": "Hello, {name}!",
    "quote_example": "As they say: \\"Knowledge is power\\"",
    "languages": {
      "french": "Fran\\u00E7ais",
      "japanese": "\\u65E5\\u672C\\u8A9E",
      "arabic": "\\u0627\\u0644\\u0639\\u0631\\u0628\\u064A\\u0629"
    }
  }
}`}
              </pre>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Best Practices for Handling Escaped Characters</h2>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Use a JSON validator/formatter:</strong> Always use a reliable JSON formatter tool to help identify and fix escaping issues before using your JSON in production.
            </li>
            <li>
              <strong>Be consistent with escaping:</strong> When manually editing JSON, be consistent with your escaping approach.
            </li>
            <li>
              <strong>Understand context:</strong> Be aware that the context where your JSON will be used might require additional escaping (like in JavaScript strings).
            </li>
            <li>
              <strong>Test with edge cases:</strong> Test your JSON with text containing various special characters to ensure proper handling.
            </li>
            <li>
              <strong>Use appropriate libraries:</strong> When programmatically generating JSON, use established libraries that handle escaping automatically.
            </li>
          </ol>

          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              When copying JSON from a formatted display to your code, be cautious about how escaped characters are transferred. Some displays might show the rendered version of escaped characters, but you need the escaped version in your actual JSON.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">How Our JSON Formatter Helps</h2>
          <p>
            Our JSON formatter tool provides several features to help with escaped characters:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Automatic detection and correction of improperly escaped characters</li>
            <li>Clear error messages when escape sequences are invalid</li>
            <li>Option to view both the raw (escaped) and rendered versions of strings</li>
            <li>Consistent handling of Unicode characters</li>
            <li>Proper indentation that respects multiline strings with escaped newlines</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Understanding how escaped characters work in JSON is crucial for anyone working with data interchange or configuration files. 
            By following the best practices outlined in this article and using a reliable JSON formatter, you can avoid common escaping pitfalls 
            and ensure your JSON data is valid and properly formatted.
          </p>
          
          <p>
            Remember that while JSON&apos;s syntax rules for escaping may seem strict, they exist to ensure data is consistently parsed across 
            different systems and programming languages. A good JSON formatter not only validates your JSON but also helps you understand and 
            fix issues related to escaped characters.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 