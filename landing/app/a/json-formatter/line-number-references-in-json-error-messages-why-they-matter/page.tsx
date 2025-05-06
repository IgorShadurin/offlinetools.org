import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

/**
 * Metadata for JSON formatter article about line number references
 */
export const metadata: Metadata = {
  title: "Line Number References in JSON Error Messages: Why They Matter | Offline Tools",
  description: "Learn why line number references in JSON error messages are crucial for efficient debugging and how to use them to quickly fix syntax errors.",
};

/**
 * Article page component for JSON formatter article about line number references
 */
export default function JsonFormatterLineNumberArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Line Number References in JSON Error Messages: Why They Matter</h1>
        
        <div className="space-y-6">
          <p>
            When working with JSON data, error messages can be your best friend or your worst enemy. 
            The difference often comes down to one crucial detail: line number references. 
            These seemingly simple indicators play a vital role in debugging JSON syntax errors quickly and efficiently.
          </p>

          <h2 className="text-2xl font-semibold mt-8">What Are Line Number References?</h2>
          <p>
            Line number references in JSON error messages are exactly what they sound like - indicators that tell you 
            precisely which line in your JSON document contains an error. They typically appear in this format:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`Unexpected token '}' at line 42, column 5`}
            </pre>
          </div>
          
          <p>
            This simple piece of information can save developers hours of debugging time, especially when working with large JSON files.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Why Line Numbers Are Critical</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-medium">1. Pinpoint Precision in Large Files</h3>
            <p>
              Consider a scenario: you have a 1,000-line JSON configuration file with a single syntax error. 
              Without line numbers, you would need to manually scan through the entire file or use 
              trial-and-error approaches to locate the problem.
            </p>
            
            <h3 className="text-xl font-medium">2. Context-Aware Debugging</h3>
            <p>
              Line numbers provide context. When you see an error at line 42, you can immediately focus not just on 
              that line but also examine surrounding lines to understand the structural context of the error.
            </p>
            
            <h3 className="text-xl font-medium">3. Communication and Collaboration</h3>
            <p>
              When working in teams, line numbers create a common reference point. Instead of vague descriptions 
              like &quot;there&apos;s an error in the user settings section,&quot; you can precisely communicate: 
              &quot;check line 42, we have an unexpected closing brace.&quot;
            </p>
            
            <h3 className="text-xl font-medium">4. IDE and Tool Integration</h3>
            <p>
              Modern development environments can use line number references to automatically navigate to the offending code, 
              highlight it, and sometimes even suggest fixes.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Common JSON Errors and Their Line References</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Missing Comma Error</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`// JSON with error
{
  "name": "John"
  "age": 30
}

// Error message
Unexpected token '"age"' at line 3, column 3`}
            </pre>
            <p className="mt-2 text-sm">
              The error occurs at line 3 because a comma is missing after &quot;John&quot; on line 2.
            </p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Unclosed Array Error</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`// JSON with error
{
  "colors": [
    "red",
    "green",
    "blue"
  
}

// Error message
Expected ',' or ']' at line 7, column 3`}
            </pre>
            <p className="mt-2 text-sm">
              The error is detected at line 7 because the array that started on line 2 was never closed.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">The Limitations of Line Numbers</h2>
          
          <p>
            While line numbers are invaluable, they do have limitations:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cascading Errors</strong>: One syntax error can cause multiple error messages at different line numbers.
            </li>
            <li>
              <strong>Minified JSON</strong>: Line numbers are less useful in minified JSON where everything may be on a single line.
            </li>
            <li>
              <strong>Different Parsers</strong>: Various JSON parsers may report line numbers differently for the same error.
            </li>
          </ul>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Remember that the line number often points to where the parser detected the error, not necessarily where the actual mistake is. 
              The true error might be on a previous line, especially with missing brackets or commas.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8">How JSON Formatters Help with Line References</h2>
          
          <p>
            Quality JSON formatters elevate the usefulness of line numbers through:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Consistent Formatting</strong>: By formatting JSON with consistent indentation and line breaks, they make line numbers more reliable.
            </li>
            <li>
              <strong>Visual Indicators</strong>: Many formatters highlight the specific line and character where an error occurs.
            </li>
            <li>
              <strong>Contextual Hints</strong>: Advanced formatters provide contextual information about the error in relation to the document structure.
            </li>
            <li>
              <strong>Line Numbering</strong>: They display line numbers in the editor interface, making it easy to navigate to referenced lines.
            </li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JSON Formatter with Line Numbers</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`1  {
2    "user": {
3      "name": "Alice",
4      "email": "alice@example.com"
5      "role": "admin"
6    }
7  }`}
              </pre>
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/30 rounded">
                <p className="text-red-600 dark:text-red-400 font-medium">Error at line 5, column 1: Expected &apos;,&apos; after property value</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8">Best Practices for Working with Line-Numbered Errors</h2>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Use a JSON formatter with line numbering</strong> - This makes it much easier to find referenced lines quickly.
            </li>
            <li>
              <strong>Check the line before the error</strong> - Often, the actual mistake is on the line preceding the reported error location.
            </li>
            <li>
              <strong>Keep your JSON consistently formatted</strong> - Consistent indentation makes structural errors easier to spot.
            </li>
            <li>
              <strong>Fix one error at a time</strong> - Address errors sequentially starting from the top, as one fix may resolve multiple reported errors.
            </li>
            <li>
              <strong>Use bracket matching features</strong> - Many editors can highlight matching brackets, helping you identify unbalanced pairs.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold mt-8">Real-World Example: Debugging a Complex Configuration</h2>
          
          <p>
            Let&apos;s look at a realistic scenario involving a complex application configuration file:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Original JSON with Error</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
{`{
  "appName": "DataProcessor",
  "version": "2.1.0",
  "database": {
    "host": "db.example.com",
    "port": 5432,
    "credentials": {
      "username": "admin",
      "password": "supersecret"
    }
  },
  "services": [
    {
      "name": "authentication",
      "endpoint": "/auth",
      "timeout": 30
    },
    {
      "name": "dataStorage",
      "endpoint": "/data",
      "timeout": 120
      "retries": 3
    },
    {
      "name": "reporting",
      "endpoint": "/reports"
    }
  ],
  "logging": {
    "level": "info",
    "path": "/var/logs"
  }
}`}
            </pre>
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/30 rounded">
              <p className="text-red-600 dark:text-red-400 font-medium">Error at line 22, column 7: Expected &apos;,&apos; after property value</p>
            </div>
          </div>
          
          <p>
            The error message precisely points to line 22. Looking at this line, we can see that it contains 
            &quot;timeout&quot;: 120 without a comma at the end. Since another property &quot;retries&quot; follows on the next line, 
            we need to add a comma after 120. This error would be much harder to find without the line number reference, 
            especially in a configuration file with dozens or hundreds of lines.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          
          <p>
            Line number references in JSON error messages are not just convenient—they&apos;re essential for efficient debugging. 
            They save time, reduce frustration, and make complex JSON documents manageable. When choosing JSON tools, 
            always prioritize those that provide clear line number references in their error messages.
          </p>
          
          <p>
            For working with JSON, a good formatter that includes line numbering and precise error location is invaluable. 
            These features transform the debugging process from a tedious hunt into a targeted fix, 
            allowing you to focus on building your application rather than chasing syntax errors.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 