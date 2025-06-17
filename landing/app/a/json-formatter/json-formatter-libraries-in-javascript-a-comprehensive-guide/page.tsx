import type { Metadata } from "next";
import { FileText, Settings, Code, ListOrdered, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatter Libraries in JavaScript: A Comprehensive Guide | Offline Tools",
  description:
    "Explore the world of JSON formatting in JavaScript, understand the limitations of built-in methods, and discover the features offered by popular libraries.",
};

export default function JsonFormatterLibrariesArticle() {
  const rawJsonExample = `{"name":"Alice","age":30,"isStudent":false,"courses":[{"title":"Math","credits":3},{"title":"Science","credits":4}],"address":null}`;

  // formattedJsonExample variable is removed as it was only used in a comment and not rendered.
  // The concept is demonstrated using the string literal within the <pre> tag.

  // formatJsonManually function definition is removed from the component scope
  // as it was never called and only shown as a commented-out example string in the <pre> tag.
  // This resolves the unused variable and the 'any' type error associated with its signature.

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="w-8 h-8" /> JSON Formatter Libraries in JavaScript: A Comprehensive Guide
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data exchange on the web due to its
          human-readable format and lightweight structure. While parsing JSON is straightforward with{" "}
          <code>JSON.parse()</code>, presenting JSON data to users or developers in a clean, organized way often
          requires <strong>formatting</strong>. This involves adding indentation, newlines, and proper spacing to make
          the structure clear.
        </p>
        <p>
          JavaScript provides a built-in way to stringify JSON, but its formatting capabilities are limited. This is
          where dedicated JSON formatter libraries come into play, offering enhanced control, features, and often better
          performance or specific utilities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> The Built-in: <code>JSON.stringify()</code>
        </h2>
        <p>
          The standard JavaScript method <code>JSON.stringify()</code> is the simplest way to convert a JavaScript value
          (like an object or array) into a JSON string. It also has a basic formatting capability.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Basic Usage:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`const data = { name: "Alice", age: 30 };
const jsonString = JSON.stringify(data); // '{"name":"Alice","age":30}'
console.log(jsonString);`}
          </pre>
          <h3 className="text-lg font-medium mt-4 mb-2">Formatted Usage with Indentation:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`const data = ${rawJsonExample.replace(/\n/g, "\\n").replace(/"/g, '\\"')}; // Example complex data
const formattedJson = JSON.stringify(data, null, 2); // null for replacer, 2 spaces for indent
console.log(formattedJson);
/* Output:
{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    {
      "title": "Math",
      "credits": 3
    },
    {
      "title": "Science",
      "credits": 4
    }
  ],
  "address": null
}
*/`}
          </pre>
        </div>

        <p>
          The third argument to <code>JSON.stringify()</code> controls indentation. You can pass a number (like{" "}
          <code>2</code> or <code>4</code>) for spaces, or a string (like <code>"\t"</code>) for tabs.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Limitations of <code>JSON.stringify()</code> for Advanced Formatting:
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Limited Control:</strong> You can't easily control things like sorting keys, collapsing nested
            objects/arrays, or adding syntax highlighting (which is presentation, not just string formatting, but often
            desired alongside formatting).
          </li>
          <li>
            <strong>No Error Handling Display:</strong> If the input is not valid JSON (when used with{" "}
            <code>JSON.parse()</code> first, then stringify), stringify won't help you visualize where the error is.
          </li>
          <li>
            <strong>No Interactive Features:</strong> Libraries designed for UI often allow collapsing sections,
            clicking on values, etc.
          </li>
          <li>
            <strong>Replacer Function Complexity:</strong> While the second argument (replacer) allows filtering or
            transforming values, using it for complex structural changes or sorting keys is cumbersome.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Why Use a Dedicated Library?
        </h2>
        <p>
          Dedicated JSON formatter libraries often go beyond simple indentation, providing features crucial for building
          tools, debugging interfaces, or displaying complex data structures effectively.
        </p>

        <h3 className="text-xl font-semibold mt-6">Key Features Offered by Libraries:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <ListOrdered className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <strong>Key Sorting:</strong> Automatically sort keys within objects alphabetically for consistent and
              easier comparison.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Settings className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <strong>Flexible Indentation:</strong> More options for indentation styles (e.g., compact arrays, specific
              wrapping rules).
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Code className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <strong>Syntax Highlighting:</strong> Often integrated to color different JSON types (strings, numbers,
              booleans, null, keys, brackets).
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Settings className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <strong>Collapsible Sections:</strong> In UI contexts, allow users to collapse/expand objects and arrays
              for easier navigation of large structures.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <strong>Error Reporting/Validation:</strong> Some libraries can validate JSON and indicate syntax errors
              directly in the formatted output.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Settings className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <strong>Handling Large Data:</strong> Optimized for performance when dealing with very large JSON strings.
            </div>
          </li>
        </ul>

        <h2 className="2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Conceptual Formatting Logic (Manual Example)
        </h2>
        <p>
          To understand what libraries do under the hood, consider the basic recursive process required to format JSON.
          You traverse the data structure, adding indentation based on the current depth.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Manual Formatting Function (Illustrative):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`// NOTE: This is a simplified example for demonstration.
// It lacks robust error handling, string escaping details, etc.
// Use JSON.stringify or a dedicated library for real applications.

const formatJsonManually = (data: any, indentLevel: number = 0): string => {
  const indent = "  ".repeat(indentLevel);
  const nextIndent = "  ".repeat(indentLevel + 1);

  if (data === null) {
    return "null";
  }

  if (typeof data === 'string') {
    // Basic string escaping (real JSON escaping is more complex)
    return \`"\${data.replace(/"/g, '\\\\\\"').replace(/\\n/g, '\\\\n')}"\`;
  }

  if (typeof data === 'number' || typeof data === 'boolean') {
    return String(data);
  }

  if (Array.isArray(data)) {
    if (data.length === 0) return "[]";
    const elements = data.map(item =>
      \`\${nextIndent}\${formatJsonManually(item, indentLevel + 1)}\`
    );
    return \`[\n\${elements.join(",\n")}\n\${indent}]\`;
  }

  if (typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys.length === 0) return "{}";
    // Libraries often sort keys here: keys.sort()
    const properties = keys.map(key => {
      const value = data[key];
      return \`\${nextIndent}"\${key}": \${formatJsonManually(value, indentLevel + 1)}\`;
    });
    return \`{\n\${properties.join(",\n")}\n\${indent}}\`;
  }

  // Fallback for undefined or other non-JSON types (JSON.stringify handles these differently)
  return String(data);
};

// Example usage (conceptually):
// const myData = JSON.parse(\`${rawJsonExample.replace(/\n/g, "\\n").replace(/"/g, '\\"')}\`); // Parse first
// const manuallyFormatted = formatJsonManually(myData);
// console.log(manuallyFormatted);
/* Expected output would be similar to the formattedJsonExample above */`}
          </pre>
        </div>
        <p>
          As you can see, even basic indentation logic requires recursion to handle nested structures. Libraries
          abstract this complexity and add many more features.
        </p>

        <h2 className="2xl font-semibold mt-8 flex items-center gap-2">
          <ListOrdered className="w-6 h-6" /> Considerations When Choosing a Library
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Features:</strong> Does it provide key sorting, syntax highlighting, collapsing, etc., that you
            need?
          </li>
          <li>
            <strong>Bundle Size:</strong> If it's for a web frontend, how much does it add to your JavaScript bundle?
          </li>
          <li>
            <strong>Performance:</strong> How fast is it for very large JSON payloads?
          </li>
          <li>
            <strong>Dependencies:</strong> Does it have many dependencies?
          </li>
          <li>
            <strong>Community & Maintenance:</strong> Is the library actively maintained and well-supported?
          </li>
          <li>
            <strong>Usage Context:</strong> Are you formatting for a console output (Node.js), a file, or a web UI? UI
            libraries will likely be larger but offer interactive features.
          </li>
        </ul>

        <h2 className="2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          While <code>JSON.stringify()</code> is sufficient for basic indentation, JSON formatter libraries offer a
          range of powerful features like key sorting, syntax highlighting, and interactive UI elements that are
          invaluable for building developer tools, data visualizations, or user interfaces that display JSON. By
          understanding the capabilities and limitations of built-in methods versus dedicated libraries, you can choose
          the right tool for presenting your JSON data effectively.
        </p>
        <p>
          Remember that for backend contexts (like a Next.js API route or Node.js script) where the output isn't
          directly consumed by a human user needing visual formatting, the default <code>JSON.stringify()</code> is
          usually the most efficient and appropriate choice. Libraries shine when the JSON is part of a user-facing
          display or a debugging process.
        </p>
      </div>
    </>
  );
}
