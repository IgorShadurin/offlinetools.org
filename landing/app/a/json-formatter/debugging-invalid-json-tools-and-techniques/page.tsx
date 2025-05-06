import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

export const metadata: Metadata = {
  title: "Debugging Invalid JSON: Tools and Techniques | Offline Tools",
  description: "Discover essential tools and effective techniques for debugging invalid JSON data and resolving syntax errors efficiently.",
};

export default function DebuggingInvalidJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Debugging Invalid JSON: Tools and Techniques</h1>
        
        <div className="space-y-6">
          <p>
            Working with JSON data is a common task for developers, but invalid JSON can quickly halt your progress. 
            Whether you&apos;re dealing with API responses, configuration files, or data exchange, knowing how to 
            efficiently debug and fix invalid JSON is an essential skill. This article explores the best tools 
            and techniques to help you identify and resolve JSON syntax errors quickly.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Understanding JSON Validation</h2>
          <p>
            Before diving into debugging tools, it&apos;s important to understand what makes JSON valid or invalid:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>JSON must start with either an object <code>{`{}`}</code> or an array <code>{`[]`}</code></li>
            <li>Property names must be enclosed in double quotes</li>
            <li>Values can be strings, numbers, objects, arrays, booleans, or null</li>
            <li>String values must use double quotes</li>
            <li>Objects and arrays must have balanced opening and closing delimiters</li>
            <li>Elements in arrays and objects (except the last) must be followed by commas</li>
            <li>No comments are allowed in standard JSON</li>
          </ul>
          <p>
            Any deviation from these rules results in invalid JSON that will fail to parse.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">Essential Tools for JSON Debugging</h2>
          
          <h3 className="text-xl font-medium mt-6">1. JSON Formatters and Validators</h3>
          <p>
            JSON formatters are your first line of defense when debugging invalid JSON:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Browser-based tools</strong> - Online validators provide immediate feedback on JSON validity</li>
            <li><strong>Syntax highlighting</strong> - Helps visualize the structure and identify issues</li>
            <li><strong>Error messages</strong> - Point to the location of syntax errors</li>
            <li><strong>Auto-formatting</strong> - Properly indents JSON to make structure clear</li>
          </ul>
          <p>
            A good JSON formatter highlights the precise location of the error and often suggests how to fix it.
          </p>
          
          <h3 className="text-xl font-medium mt-6">2. Browser Developer Tools</h3>
          <p>
            Modern browsers include powerful debugging capabilities for JSON:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Console</strong> - Use <code>JSON.parse()</code> and catch errors</li>
            <li><strong>Network tab</strong> - Inspect raw API responses and their JSON structure</li>
            <li><strong>Object inspection</strong> - Interactive exploration of parsed JSON</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Browser Console Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`try {
  const obj = JSON.parse(myJsonString);
  console.log(obj);
} catch (error) {
  console.error("JSON Error:", error.message);
  console.log("Problem JSON:", myJsonString);
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. IDE Extensions and Features</h3>
          <p>
            Most modern code editors provide excellent JSON debugging support:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Real-time validation</strong> - Immediate feedback on syntax errors</li>
            <li><strong>JSON schema validation</strong> - Checks against defined structures</li>
            <li><strong>Format on save</strong> - Automatically fixes formatting issues</li>
            <li><strong>Code folding</strong> - Collapses objects and arrays for better overview</li>
            <li><strong>Bracket matching</strong> - Highlights matching brackets to ensure balance</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">4. Command-Line Tools</h3>
          <p>
            For developers comfortable with the terminal, several CLI tools can help debug JSON:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>jq</strong> - Powerful JSON processor for filtering and transforming</li>
            <li><strong>jsonlint</strong> - Dedicated JSON linter with detailed error reporting</li>
            <li><strong>python -m json.tool</strong> - Simple but effective JSON formatter</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Command Line Validation Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`# Using jq to validate a JSON file
cat data.json | jq

# Using Python to format and validate
python -m json.tool data.json

# Using jsonlint
jsonlint data.json`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Advanced Debugging Techniques</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Binary Search Method</h3>
          <p>
            For large JSON files, use a divide-and-conquer approach:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Split the JSON into two halves</li>
            <li>Validate each half separately (enclosing each in <code>{`{}`}</code> or <code>{`[]`}</code> if needed)</li>
            <li>Further divide the invalid half until you isolate the problem</li>
            <li>Continue narrowing down until you identify the exact issue</li>
          </ol>
          <p>
            This method is particularly useful for large JSON files where the error location is not immediately obvious.
          </p>
          
          <h3 className="text-xl font-medium mt-6">2. Diff Tools for Comparison</h3>
          <p>
            When JSON suddenly becomes invalid after edits:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use diff tools to compare the working version with the broken one</li>
            <li>Review changes to identify what introduced the error</li>
            <li>Focus on changed lines with special characters, quotes, or delimiters</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">3. Incremental Building</h3>
          <p>
            When constructing complex JSON:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Start with a minimal valid JSON structure</li>
            <li>Add elements one at a time, validating after each addition</li>
            <li>This identifies precisely which addition causes problems</li>
          </ol>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              When generating JSON programmatically, use your language&apos;s built-in JSON serialization methods 
              rather than string concatenation. These methods handle escaping and formatting automatically, 
              reducing the risk of syntax errors.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Common JSON Errors and How to Debug Them</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Unquoted Property Names</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="mt-4">
              <h4 className="text-md font-medium text-red-600 dark:text-red-400">Invalid:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  name: "John",
  age: 30
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-green-600 dark:text-green-400">Valid:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "name": "John",
  "age": 30
}`}
                </pre>
              </div>
            </div>
            <p className="mt-2 text-sm">Debugging tip: Look for property names without double quotes.</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Single Quotes Instead of Double</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="mt-4">
              <h4 className="text-md font-medium text-red-600 dark:text-red-400">Invalid:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "config": {
    "theme": 'dark',
    "language": 'en-US'
  }
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-green-600 dark:text-green-400">Valid:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "config": {
    "theme": "dark",
    "language": "en-US"
  }
}`}
                </pre>
              </div>
            </div>
            <p className="mt-2 text-sm">Debugging tip: Search for single quotes and replace them with double quotes.</p>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Trailing Commas</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="mt-4">
              <h4 className="text-md font-medium text-red-600 dark:text-red-400">Invalid:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "colors": [
    "red",
    "green",
    "blue",
  ]
}`}
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-medium text-green-600 dark:text-green-400">Valid:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
{`{
  "colors": [
    "red",
    "green",
    "blue"
  ]
}`}
                </pre>
              </div>
            </div>
            <p className="mt-2 text-sm">Debugging tip: Check for commas after the last element in arrays and objects.</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Debugging Workflow for JSON</h2>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Validate first</strong> - Use a JSON formatter to check overall validity</li>
            <li><strong>Locate the error</strong> - Identify the line and character position of the error</li>
            <li><strong>Inspect the context</strong> - Look at the surrounding code for clues</li>
            <li><strong>Fix one error at a time</strong> - Resolve issues sequentially, not all at once</li>
            <li><strong>Re-validate</strong> - Ensure your fix resolved the issue without introducing new ones</li>
            <li><strong>Review patterns</strong> - Check for similar issues elsewhere in the document</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8">Preventive Measures</h2>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Use linters in CI/CD</strong> - Validate JSON as part of your build process</li>
            <li><strong>Implement schema validation</strong> - Ensure JSON adheres to expected structure</li>
            <li><strong>Automate serialization</strong> - Generate JSON using dedicated libraries</li>
            <li><strong>Add integration tests</strong> - Verify JSON processing works as expected</li>
            <li><strong>Format code automatically</strong> - Use tools to maintain consistent formatting</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JSON Schema Validation Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Schema definition
const schema = {
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["name", "email"]
};

// Validation function
function validateWithSchema(jsonData, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(jsonData);
  
  if (!valid) {
    console.error('Validation errors:', validate.errors);
    return false;
  }
  
  return true;
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Debugging invalid JSON doesn&apos;t have to be a frustrating experience. With the right tools and methodical 
            approach, you can quickly identify and fix syntax errors. JSON formatters are invaluable for pinpointing 
            issues, while techniques like binary search and incremental building help tackle more complex problems.
          </p>
          
          <p>
            Remember that prevention is better than cure – using proper serialization libraries, schema validation, and 
            automated testing can help you avoid JSON errors in the first place. By incorporating these debugging tools 
            and techniques into your workflow, you&apos;ll be able to handle JSON errors efficiently and keep your applications 
            running smoothly.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 