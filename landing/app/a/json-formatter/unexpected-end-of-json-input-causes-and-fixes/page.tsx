import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

export const metadata: Metadata = {
  title: "Unexpected End of JSON Input: Causes and Fixes | Offline Tools",
  description: "Learn what causes the 'Unexpected end of JSON input' error and discover practical solutions to fix this common JSON parsing problem.",
};

export default function UnexpectedEndOfJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Unexpected End of JSON Input: Causes and Fixes</h1>
        
        <div className="space-y-6">
          <p>
            If you work with JSON data, you've likely encountered the dreaded "Unexpected end of JSON input" error. 
            This error occurs when a JSON parser attempts to parse a JSON string that's incomplete or malformed. 
            It's one of the most common yet frustrating errors to debug because it only tells you that something is wrong, 
            not exactly what or where.
          </p>

          <h2 className="text-2xl font-semibold mt-8">What Causes "Unexpected End of JSON Input"?</h2>
          <p>
            This error occurs when the JSON parser reaches the end of the input string before the JSON structure is complete. 
            The parser expects more content to complete the JSON object or array, but finds none.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Common Causes</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Prematurely truncated JSON strings</li>
            <li>Missing closing brackets or braces</li>
            <li>Network issues causing incomplete data transmission</li>
            <li>Buffer size limitations cutting off JSON data</li>
            <li>Manually editing JSON and forgetting to complete a structure</li>
            <li>String concatenation errors when building JSON programmatically</li>
            <li>Trying to parse an empty string</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8">Examples of Incomplete JSON</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Simple Truncated Object</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incomplete JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "user": "John",
  "role": "admin",
  "permissions": [`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Error: Unexpected end of JSON input</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Nested Structure Cut Off</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Incomplete JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Product A"
      },
      {
        "id": 2,
        "name": "Product B"`}
              </pre>
            </div>
            <p className="mt-2 text-sm">Error: Unexpected end of JSON input</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Empty String</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Empty JSON:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{``}
              </pre>
            </div>
            <p className="mt-2 text-sm">Error: Unexpected end of JSON input</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Unlike some other JSON errors that point to specific syntax issues, "Unexpected end of JSON input" 
              doesn't tell you where the problem is. It simply indicates that the parser reached the end of the input 
              before it finished parsing a complete JSON structure.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">How to Fix "Unexpected End of JSON Input"</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Visual Inspection</h3>
          <p>
            For smaller JSON files, visually inspect the JSON structure. Look specifically for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unclosed curly braces or square brackets</li>
            <li>JSON that appears to stop mid-object or mid-array</li>
            <li>Missing closing quotes on strings</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">2. Use a JSON Validator/Formatter</h3>
          <p>
            The most efficient way to fix this error is to use a JSON formatter with validation:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Paste your JSON data into a JSON formatter</li>
            <li>The formatter will identify the point where the structure becomes invalid</li>
            <li>Add the missing elements based on the error location</li>
            <li>Re-validate until the JSON is properly formatted</li>
          </ol>
          
          <h3 className="text-xl font-medium mt-6">3. Check Data Source and Transmission</h3>
          <p>
            If the JSON is coming from an API or file:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verify the complete JSON is being transmitted (check response size)</li>
            <li>Ensure no buffer limits are truncating the response</li>
            <li>Check if network issues are causing incomplete downloads</li>
            <li>Verify the API is returning properly formatted JSON</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">4. Programmatic Solutions</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Implement Try-Catch When Parsing:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// JavaScript example
try {
  const data = JSON.parse(jsonString);
  // Process data here
} catch (error) {
  if (error instanceof SyntaxError && error.message.includes('Unexpected end of JSON input')) {
    console.error('JSON data is incomplete. Check your data source.');
    // Handle the error appropriately
  } else {
    // Handle other parsing errors
    console.error('JSON parsing error:', error);
  }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Before/After Examples</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">API Response Truncation:</h3>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-red-600 dark:text-red-400">Before (incomplete):</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "status": "success",
  "result": {
    "total": 42,
    "items": [
      {
        "id": "item-1",
        "name": "First Item",
        "available": true
      },
      {
        "id": "item-2",
        "name": "Second Item",
        "available": false
      }
`}
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-green-600 dark:text-green-400">After (fixed):</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "status": "success",
  "result": {
    "total": 42,
    "items": [
      {
        "id": "item-1",
        "name": "First Item",
        "available": true
      },
      {
        "id": "item-2",
        "name": "Second Item",
        "available": false
      }
    ]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Prevention Strategies</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Validate JSON</strong> - Always validate JSON before attempting to parse it</li>
            <li><strong>Check content length</strong> - Verify the expected content length matches the received data</li>
            <li><strong>Use proper string building</strong> - When constructing JSON programmatically, use language-specific JSON builders</li>
            <li><strong>Implement timeouts</strong> - Set appropriate timeouts for API requests to ensure complete responses</li>
            <li><strong>Handle empty responses</strong> - Check for empty responses before parsing</li>
            <li><strong>Use proper editor tools</strong> - When editing JSON manually, use editors with bracket matching</li>
          </ol>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Handling Empty Responses:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// JavaScript example
function parseJsonSafely(jsonString) {
  // Handle empty or undefined input
  if (!jsonString || jsonString.trim() === '') {
    return { error: 'Empty JSON input' };
  }
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return { 
      error: 'JSON parsing error',
      message: error.message
    };
  }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Debugging Tools</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Online JSON Validators</strong> - Highlight exactly where JSON becomes invalid</li>
            <li><strong>Browser Developer Tools</strong> - Inspect network responses to ensure complete data transfer</li>
            <li><strong>JSON Linters</strong> - Identify structural issues in JSON files</li>
            <li><strong>Language-specific JSON libraries</strong> - Many provide detailed error reporting</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            "Unexpected end of JSON input" is a common but solvable error. It occurs when JSON data is incomplete, and the 
            parser reaches the end of the input before finding a complete, valid structure. By using proper validation tools, 
            implementing good error handling, and checking data sources thoroughly, you can quickly diagnose and fix these issues.
          </p>
          
          <p>
            Remember that prevention is better than cure – incorporate JSON validation into your development workflow to catch 
            these errors early. When working with large JSON datasets or API responses, always verify that you're receiving 
            complete data before attempting to parse it.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 