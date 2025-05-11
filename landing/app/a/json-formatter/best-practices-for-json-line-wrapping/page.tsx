import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Practices for JSON Line Wrapping | Offline Tools",
  description:
    "Learn the best practices for wrapping lines in JSON data to improve readability and maintainability.",
};

export default function JsonLineWrappingBestPracticesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Best Practices for JSON Line Wrapping
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange
          format that is easy for humans to read and write and easy for machines
          to parse and generate. While its structure is simple, properly
          formatting your JSON, especially handling line wrapping, is crucial
          for readability and maintainability, particularly when dealing with
          large or complex data structures.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Why Line Wrapping Matters in JSON
        </h2>
        <p>
          Effective line wrapping isn&apos;t just about aesthetics; it offers
          practical benefits that significantly impact your workflow, especially
          in collaborative environments.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key benefits include:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Improved Readability:</span> Long
              lines are difficult to scan. Wrapping lines at logical points makes
              it easier for developers to quickly understand the structure and
              content of the JSON data without excessive horizontal scrolling.
            </li>
            <li>
              <span className="font-medium">Easier Code Review and Diffing:</span>{" "}
              When lines are appropriately wrapped, changes to a JSON file are
              much clearer in version control systems (like Git). Each line
              change corresponds to a specific data point or structural element,
              making it easy to see exactly what was added, removed, or modified.
            </li>
            <li>
              <span className="font-medium">Maintainability:</span> Well-formatted
              and wrapped JSON is easier to navigate and modify, reducing the
              likelihood of syntax errors when updates are needed.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          Common Line Wrapping Strategies
        </h2>
        <p>
          There are several approaches to wrapping lines in JSON. The best
          strategy often depends on the complexity of the data and team
          preference, but consistency is key.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">Wrap after commas:</h3>
            <p className="text-sm">
              The most common approach. Each key-value pair in an object and
              each element in an array gets its own line, except possibly for
              very short ones.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  "name": "Product A",
  "price": 25.99,
  "available": true,
  "tags": [
    "electronics",
    "gadget",
    "new"
  ]
}`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Wrap after colon (objects):</h3>
            <p className="text-sm">
              Can be used for short key-value pairs to keep them on one line,
              wrapping only if the line exceeds a certain length.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  "id": 12345,
  "settings": { "theme": "dark", "fontSize": 14 },
  "description": "This is a long description that will likely wrap onto multiple lines depending on the formatter's line length limit."
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm italic">
              Note: This approach is less common for maximizing diff readability
              compared to wrapping after commas for every property.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Maximum Line Length:</h3>
            <p className="text-sm">
              Configure your formatter or editor to wrap lines when they exceed a
              specific character count (e.g., 80, 100, or 120 characters). This
              often works in conjunction with other strategies.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
              <pre>
                {`{
  "user": {
    "id": "user-123",
    "name": "Jane Doe",
    "email": "jane.doe@example.com", // This comment is just for explanation
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "zip": "12345",
      "country": "USA"
    },
    "preferences": {
      "notifications": true,
      "language": "en-US",
      "timezone": "America/New_York"
    }
  }
}`}
              </pre>
            </div>
            <p className="mt-2 text-sm italic">
              Example shows typical indentation and wrapping structured for
              readability and diffs, keeping related parts together where sensible
              but breaking long lines.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Indentation is Key</h2>
        <p>
          Line wrapping works best when combined with consistent indentation.
          Most style guides recommend using two or four spaces for indentation.
          Tabs vs. spaces is a common debate, but spaces (usually 2 or 4) are
          more universally consistent across different editors and tools.
        </p>

        <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto my-4">
          <pre>
            {`{
  "level1": {
    "level2": [
      {
        "item": 1
      },
      {
        "item": 2
      }
    ]
  }
}`}
          </pre>
        </div>
        <p className="text-sm italic -mt-4">Example using 2-space indentation.</p>

        <h2 className="text-2xl font-semibold mt-8">
          Tools and Automation
        </h2>
        <p>
          Manually formatting and wrapping large JSON files is tedious and
          error-prone. Leverage tools to automate the process based on your
          preferred style.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Code Editors/IDEs:</span> Most modern
              editors (VS Code, Sublime Text, Atom, etc.) have built-in JSON
              formatters or plugins that can handle indentation and line wrapping.
            </li>
            <li>
              <span className="font-medium">Online JSON Formatters/Beautifiers:</span>{" "}
              Numerous web-based tools allow you to paste JSON and get a
              formatted output, often with options for indentation size and line
              wrapping.
            </li>
            <li>
              <span className="font-medium">Command-Line Tools:</span> Tools like{" "}
              <code>jq</code> or using Python&apos;s <code>json</code> module
              can format JSON from the command line.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                <pre>
                  {`echo '{"a": 1, "b": [2, 3]}' | jq .`}
                </pre>
              </div>
              <p className="text-sm italic mt-1">
                (Example using jq for pretty-printing)
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          Example: Before and After Wrapping
        </h2>
        <p>
          Consider this poorly formatted JSON with long lines:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Badly Wrapped JSON:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"users": [{"id": 1,"name": "Alice Smith","email": "alice.smith@example.com","settings": {"theme": "light","language": "en"}},{"id": 2,"name": "Bob Johnson","email": "bob.johnson@example.com","settings": {"theme": "dark","language": "es"}}]}`}
            </pre>
          </div>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Well-Wrapped JSON (using 2-space indent and wrapping after commas):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "users": [
    {
      "id": 1,
      "name": "Alice Smith",
      "email": "alice.smith@example.com",
      "settings": {
        "theme": "light",
        "language": "en"
      }
    },
    {
      "id": 2,
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "settings": {
        "theme": "dark",
        "language": "es"
      }
    }
  ]
}`}
            </pre>
          </div>
        </div>
        <p className="text-sm italic -mt-4">
          The second example is significantly easier to read and compare versions of.
        </p>


        <h2 className="text-2xl font-semibold mt-8">Consistency is Paramount</h2>
        <p>
          Regardless of the specific rules you choose for line wrapping and
          indentation, the most important &quot;best practice&quot; is
          consistency. Ensure that all JSON files within a project or team
          follow the same formatting rules. This can be enforced using
          linters, formatters, and pre-commit hooks.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
           <h3 className="text-lg font-medium">Tools for Consistency:</h3>
           <ul className="list-disc pl-6 space-y-2 mt-2">
             <li><span className="font-medium">Prettier:</span> An opinionated code formatter that supports JSON.</li>
             <li><span className="font-medium">ESLint (with plugins):</span> Can enforce JSON formatting rules.</li>
             <li><span className="font-medium">Editorconfig:</span> Helps maintain consistent indentation and whitespace across different editors.</li>
           </ul>
         </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Adopting consistent and logical line wrapping practices for your JSON
          data might seem like a minor detail, but it has a significant impact
          on the usability and maintainability of your data files. By
          leveraging consistent indentation, wrapping lines at natural breaks
          (like after commas), and utilizing automated formatting tools, you
          can ensure your JSON is not only machine-readable but also easily
          understood by humans. This is especially critical in collaborative
          development environments where clear and diff-friendly code is
          essential.
        </p>
      </div>
    </>
  );
}