import type { Metadata } from "next";
import { Code, Cog, GitCompare, Bug, Layers, AlignLeft, SortAsc, Key, FileWarning, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cross-Platform Consistency in JSON Formatting Tools | Offline Tools",
  description:
    "Explore the challenges and solutions for maintaining consistent JSON formatting across different platforms, tools, and languages.",
};

export default function JsonFormattingConsistencyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Layers className="w-8 h-8" /> Cross-Platform Consistency in JSON Formatting
      </h1>

      <div className="space-y-8">
        <p className="text-lg leading-relaxed">
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web and beyond. Its simple, human-readable structure makes it easy to work with. However, when collaborating across different operating systems, development environments, programming languages, and even individual developer preferences, maintaining consistent JSON formatting can become a subtle but significant challenge. This consistency is crucial for effective collaboration, debugging, and automated processing.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <GitCompare className="w-6 h-6" /> Why Consistency Matters
          </h2>
          <p>
            Inconsistent JSON formatting can lead to several issues:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="flex items-center gap-2"><GitCompare className="w-5 h-5 text-blue-600" /> Difficult Code Diffing:</strong> Changes that are purely formatting (like indentation or whitespace) can clutter code comparison tools (like Git diffs), making it harder to identify meaningful data changes.
            </li>
            <li>
              <strong className="flex items-center gap-2"><Bug className="w-5 h-5 text-red-600" /> Debugging Headaches:</strong> Debugging APIs or data pipelines where JSON format varies unexpectedly can be frustrating. Subtle differences in whitespace or newline characters might even break parsing in less-forgiving systems.
            </li>
            <li>
              <strong className="flex items-center gap-2"><Code className="w-5 h-5 text-green-600" /> Automated Processing Issues:</strong> Tools that rely on pattern matching or strict string comparisons (though less common now) can fail on inconsistently formatted JSON. Automated scripts processing logs or configuration files expect predictable formats.
            </li>
            <li>
              <strong className="flex items-center gap-2"><Cog className="w-5 h-5 text-purple-600" /> Tool Interoperability:</strong> When multiple tools touch the same JSON file (e.g., a configuration file edited by a human, then processed by a build script, then formatted by a linter), inconsistent behavior can lead to churn and unexpected changes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileWarning className="w-6 h-6" /> Sources of Inconsistency
          </h2>
          <p>
            Variations in JSON formatting typically stem from:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="flex items-center gap-2"><AlignLeft className="w-5 h-5" /> Whitespace and Indentation:</strong>
              <p className="ml-7 mt-1">The most common source. Tabs vs. spaces, the number of spaces per indentation level (2 or 4 are typical), and spacing around colons and commas.</p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 ml-7">
                <h4 className="text-md font-medium mb-2">Example Differences:</h4>
                <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                  {`// 4 spaces, newlines after key/value pairs
{
    "name": "Alice",
    "age": 30
}

// 2 spaces, no newline after first pair
{
  "name": "Bob",
  "city": "London"
}

// Tabs
{
\t"id": 123,
\t"active": true
}`}
                </pre>
              </div>
            </li>
            <li>
              <strong className="flex items-center gap-2"><SortAsc className="w-5 h-5" /> Key Order:</strong>
              <p className="ml-7 mt-1">The JSON specification states that object member order is *not* significant. However, many formatting tools offer options to sort keys alphabetically. While functionally identical, different sorting orders lead to different file contents, affecting diffs.</p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 ml-7">
                <h4 className="text-md font-medium mb-2">Example Differences:</h4>
                <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                  {`// Insertion order
{
  "zip": "90210",
  "city": "Beverly Hills",
  "name": "Alice"
}

// Alphabetical order
{
  "city": "Beverly Hills",
  "name": "Alice",
  "zip": "90210"
}`}
                </pre>
              </div>
            </li>
            <li>
              <strong className="flex items-center gap-2"><Key className="w-5 h-5" /> Number and String Representation:</strong>
              <p className="ml-7 mt-1">While less common with standard JSON, differences can arise in floating-point precision or how Unicode characters in strings are escaped (e.g., <code>\uXXXX</code> vs. literal characters if allowed by encoding). Some parsers might output numbers differently (e.g., <code>1e+2</code> vs. <code>100.0</code>).</p>
            </li>
            <li>
              <strong className="flex items-center gap-2"><FileWarning className="w-5 h-5 text-orange-600" /> Handling Non-Standard JSON:</strong>
              <p className="ml-7 mt-1">Some tools or environments might accept "loose JSON" which includes features not strictly in the spec, such as JavaScript-style comments or trailing commas in arrays/objects. Formatters may either preserve, remove, or fail on these.</p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 ml-7">
                <h4 className="text-md font-medium mb-2">Example Loose JSON:</h4>
                <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900 overflow-x-auto">
                  {`{
  "item1": 1,
  "item2": 2, // Trailing comma
  /* This is a comment */
}`}
                </pre>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Cog className="w-6 h-6" /> Role of JSON Formatting Tools
          </h2>
          <p>
            JSON formatting tools (linters, beautifiers, parsers with output options) are designed to take potentially inconsistent JSON input and produce a standardized output based on a set of rules. These tools are available across programming languages, as command-line utilities, and integrated into IDEs.
          </p>
          <p className="mt-4">
            Common tools and libraries include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong className="text-blue-500">Prettier</strong> (often used with its JSON plugin)</li>
            <li>Various language-specific libraries (e.g., Python's <code>json</code> module with <code>indent</code> and <code>sort_keys</code> options, Node.js's <code>JSON.stringify</code> with space argument, Java's Jackson or Gson libraries with pretty-printing features).</li>
            <li>Online JSON formatters/validators.</li>
            <li>IDE built-in formatters.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" /> Achieving Cross-Platform Consistency in Practice
          </h2>
          <p>
            Ensuring consistency requires a proactive approach, especially in collaborative environments:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="flex items-center gap-2"><Cog className="w-5 h-5 text-yellow-600" /> Adopt a Standard Tool:</strong> Choose a widely accepted and configurable JSON formatter (like Prettier) and integrate it into your project workflow.
            </li>
            <li>
              <strong className="flex items-center gap-2"><Cog className="w-5 h-5 text-blue-600" /> Define and Configure Rules:</strong> Standardize on core formatting rules like indentation size, use of spaces/tabs, and whether to sort keys. Configure your chosen tool globally or per-project to enforce these rules. Use configuration files (e.g., <code>.prettierrc</code>) checked into version control.
            </li>
            <li>
              <strong className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Integrate into Development Workflow:</strong>
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li><strong>Editor Integration:</strong> Configure developer editors/IDEs to format JSON files on save using the project's standard tool and configuration.</li>
                <li><strong>Pre-commit Hooks:</strong> Use tools like Husky or lint-staged to automatically format JSON files (and other code) before commits. This catches inconsistencies early.</li>
                <li><strong>CI/CD Pipeline:</strong> Add a step in your Continuous Integration pipeline to check if JSON files are correctly formatted (e.g., using the formatter's check mode) and fail the build if not.</li>
              </ul>
            </li>
            <li>
              <strong className="flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-600" /> Educate and Document:</strong> Ensure all team members understand the importance of formatting consistency and how to use the standard tools and configurations. Document the process in your project's contributing guidelines.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" /> Code Example: Consistent Formatting with JSON.stringify
          </h2>
          <p>
            Even without external tools, most languages provide basic formatting options. JavaScript's <code>JSON.stringify</code> is a prime example with its <code>space</code> argument.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Using <code>JSON.stringify</code> for Formatting:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`// Sample JavaScript Object
const data = {
  "name": "Charlie",
  "age": 42,
  "isStudent": false,
  "courses": ["History", "Art"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
};

// Inconsistent (no spacing)
const inconsistentJson = JSON.stringify(data);
// Output: {"name":"Charlie","age":42,"isStudent":false,"courses":["History","Art"],"address":{"street":"123 Main St","city":"Anytown"}}

// Consistent (2 spaces indentation)
const consistentJsonTwoSpaces = JSON.stringify(data, null, 2);
/* Output:
{
  "name": "Charlie",
  "age": 42,
  "isStudent": false,
  "courses": [
    "History",
    "Art"
  ],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
}
*/

// Consistent (4 spaces indentation)
const consistentJsonFourSpaces = JSON.stringify(data, null, 4);
/* Output:
{
    "name": "Charlie",
    "age": 42,
    "isStudent": false,
    "courses": [
        "History",
        "Art"
    ],
    "address": {
        "street": "123 Main St",
        "city": "Anytown"
    }
}
*/

// Consistent (using tab character for indentation)
const consistentJsonTabs = JSON.stringify(data, null, "\\t");
/* Output:
{
\t"name": "Charlie",
\t"age": 42,
\t"isStudent": false,
\t"courses": [
\t\t"History",
\t\t"Art"
\t],
\t"address": {
\t\t"street": "123 Main St",
\t\t"city": "Anytown"
\t}
}
*/

// Note: JSON.stringify does NOT guarantee key order consistency across environments/versions.
// For strict key order, a dedicated library or manual sorting before stringification is needed.
`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Bug className="w-6 h-6" /> Potential Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Conflicting Configurations:</strong> Be wary of conflicting formatter configurations in different tools (IDE vs. CLI vs. pre-commit hook). A single source of truth (like a <code>.prettierrc</code> file) is best.
            </li>
            <li>
              <strong>Ignoring Non-Standard JSON:</strong> If your workflow relies on tools that produce or consume "loose JSON", ensure your chosen formatter handles these cases predictably (either by supporting them or standardizing them).
            </li>
            <li>
              <strong>Byte Order Mark (BOM):</strong> Ensure tools handle BOM consistently, especially when dealing with UTF-8 encoded files.
            </li>
            <li>
              <strong>Newline Characters:</strong> Ensure editors and version control are set up to handle newline consistency across operating systems (`LF` vs `CRLF`). Git attributes (<code>.gitattributes</code>) can help here.
            </li>
          </ul>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" /> Conclusion
          </h2>
          <p className="leading-relaxed">
            While JSON's specification is simple, its textual representation can vary significantly based on the tools and environments used to create or format it. Achieving cross-platform consistency in JSON formatting isn't just about aesthetics; it's a practical necessity for efficient development workflows, reliable automation, and clearer code changes. By standardizing on a tool, defining clear rules, and integrating formatting into your development pipeline, teams can largely eliminate inconsistencies and focus on the actual data.
          </p>
        </section>

      </div>
    </>
  );
}
