import type { Metadata } from "next";
import { Zap, Code, LayoutList, BookOpen, FileJson } from "lucide-react"; // Import icons

export const metadata: Metadata = {
  title: "JSON Formatters for Frontend Web Developers",
  description:
    "A guide for frontend developers on understanding and using JSON formatters for better readability, debugging, and consistency.",
};

export default function JsonFormattersPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex items-center mb-8">
        <FileJson size={40} className="text-blue-600 mr-4" />
        <div>
          <h1 className="text-3xl font-bold">JSON Formatters for Frontend Web Developers</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Making messy JSON readable, consistent, and easy to work with.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen size={24} className="mr-2 text-purple-600" /> What are JSON Formatters?
          </h2>
          <p>
            JSON (JavaScript Object Notation) is the de facto standard for exchanging data between a server and a web
            application. While it's lightweight and easy for machines to parse, raw or "minified" JSON strings can be
            incredibly difficult for humans to read and understand.
          </p>
          <p className="mt-4">
            A <strong>JSON formatter</strong> (also known as a JSON pretty-printer) is a tool or function that takes a
            JSON string as input and outputs a new string that is formatted with consistent indentation, line breaks,
            and spacing. This structured output makes the data much more readable and easier to debug.
          </p>
        </section>

        {/* Why Use JSON Formatters? */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap size={24} className="mr-2 text-yellow-600" /> Why They Are Essential for Frontend Devs
          </h2>
          <p>Frontend developers constantly interact with JSON data:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Fetching data from APIs.</li>
            <li>
              Working with local configuration files (like <code>package.json</code>, build tool configs).
            </li>
            <li>Debugging network requests in browser developer tools.</li>
            <li>Logging data structures to the console.</li>
          </ul>
          <p className="mt-4">Formatted JSON dramatically improves:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Readability:</strong> Quickly understand the structure and hierarchy of nested data.
            </li>
            <li>
              <strong>Debugging:</strong> Easily spot missing commas, extra braces, or incorrect data types.
              <li>
                <strong>Consistency:</strong> Ensure JSON files in your project adhere to a standard style, improving
                collaboration and reducing merge conflicts in version control.
              </li>
              <li>
                <strong>Navigation:</strong> Helps you visually scan and navigate large JSON objects or arrays.
              </li>
            </li>
          </ul>
        </section>

        {/* How Frontend Devs Use Formatters */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code size={24} className="mr-2 text-green-600" /> Ways to Format JSON
          </h2>
          <p>Frontend developers have several options for formatting JSON:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Browser Developer Tools</h3>
          <p>
            Most modern browsers (Chrome, Firefox, Edge, Safari) automatically pretty-print JSON responses in the
            Network tab. This is often the first place developers see and debug API data. Look for "Preview" or
            "Response" tabs and ensure JSON is displayed in a structured, collapsible tree view rather than raw text.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Tip:</strong> If your browser isn't auto-formatting, check browser settings or consider a browser
              extension designed for JSON viewing.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. IDE/Editor Extensions</h3>
          <p>
            Many code editors like VS Code, Sublime Text, and Atom have built-in JSON formatters or powerful extensions
            (like Prettier, linters with formatting capabilities) that can automatically format your JSON files on save
            or via a command.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example: Formatting in VS Code</h4>
            <p className="text-sm">
              Open a <code>.json</code> file. Right-click and select "Format Document", or use the keyboard shortcut
              (e.g., Shift+Alt+F on Windows/Linux, Shift+Option+F on macOS). Configure default formatters or use
              extensions like Prettier.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Online JSON Formatters</h3>
          <p>
            Quick and easy for one-off formatting or validation of JSON snippets. Simply paste your JSON into a web
            tool, and it will format and often validate it for syntax errors. Be cautious about pasting sensitive data
            into public online tools.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Security Note:</strong> For production or sensitive data, prefer offline methods (IDE,
              programmatic) over online tools.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Programmatic Formatting (using JavaScript/TypeScript)</h3>
          <p>
            You can format JSON within your code, most commonly for logging, generating output files, or sending
            readable responses (though API responses are usually minified for efficiency). The built-in{" "}
            <code>JSON.stringify()</code> method is perfect for this.
          </p>

          <h4 className="text-lg font-medium mt-4 mb-2">
            Using <code>JSON.stringify()</code> for Pretty-Printing
          </h4>
          <p>
            The third argument of <code>JSON.stringify()</code> controls indentation. You can pass a number (for spaces)
            or a string (like a tab character).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h5 className="text-base font-medium mb-2">Example: Indenting with 2 spaces</h5>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`const messyJson = '{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}';

try {
  const data = JSON.parse(messyJson);
  // Format with 2 spaces indentation
  const prettyJson = JSON.stringify(data, null, 2);
  console.log(prettyJson);
} catch (error) {
  console.error("Failed to parse JSON:", error);
}`}
              </pre>
            </div>
            <h5 className="text-base font-medium mt-4 mb-2">Example: Indenting with Tabs</h5>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`const data = { "nested": { "object": [1, 2, { "id": 42 }] } };

// Format with tab indentation
const prettyJsonWithTabs = JSON.stringify(data, null, '\\t');
console.log(prettyJsonWithTabs);`}
              </pre>
            </div>
            <h5 className="text-base font-medium mt-4 mb-2">The Replacer Argument</h5>
            <p className="text-sm">
              The second argument (<code>null</code> in the examples above) is the `replacer`. It can be an array of
              keys to include or a function to transform values. This is less common for simple *formatting* but useful
              for controlling *what* gets serialized.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`const dataWithSensitiveInfo = { name: 'Bob', age: 25, passwordHash: '...' };

// Use replacer array to only include specific keys
const filteredJson = JSON.stringify(dataWithSensitiveInfo, ['name', 'age'], 2);
console.log(filteredJson); // Only shows name and age`}
              </pre>
            </div>
          </div>
        </section>

        {/* Benefits Recap */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <LayoutList size={24} className="mr-2 text-blue-600" /> Key Benefits Summary
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Makes complex data structures visually manageable.</li>
            <li>Speeds up the debugging process by highlighting syntax errors and structural issues.</li>
            <li>Promotes consistent code style across a project.</li>
            <li>Improves diffs in version control for JSON files.</li>
            <li>Makes console logs and output files much more useful.</li>
          </ul>
        </section>

        {/* Considerations/Pitfalls */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap size={24} className="mr-2 text-red-600" /> Considerations and Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Performance with Large Data:</strong> Formatting very large JSON strings programmatically can be
              memory-intensive or slow.
            </li>
            <li>
              <strong>Circular References:</strong> <code>JSON.stringify()</code> will throw an error if the object
              contains circular references (where an object references itself or an ancestor in its properties).
            </li>
            <li>
              <strong>Data Loss/Transformation:</strong> <code>JSON.stringify()</code> serializes only basic JSON types.
              Functions, Symbols, and <code>undefined</code> properties are omitted. Dates are converted to strings.
            </li>
            <li>
              <strong>Key Order:</strong> The JSON specification does not guarantee key order. While `JSON.stringify`
              often serializes keys in a specific order (often insertion order or sorted, depending on the engine),
              formatters *don't* typically sort keys alphabetically by default, although some advanced tools offer this
              as an option. Don't rely on key order.
            </li>
          </ul>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen size={24} className="mr-2 text-purple-600" /> Conclusion
          </h2>
          <p>
            JSON formatters are simple yet powerful tools that significantly enhance the daily workflow of a frontend
            developer. Whether you rely on browser developer tools, IDE extensions, online utilities, or programmatic
            methods like <code>JSON.stringify()</code>, incorporating JSON formatting into your development process will
            save you time, reduce frustration, and lead to fewer errors when dealing with data. Master these techniques
            to make working with JSON a much smoother experience.
          </p>
        </section>
      </div>
    </>
  );
}
