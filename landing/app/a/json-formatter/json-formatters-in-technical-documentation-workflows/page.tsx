import type { Metadata } from "next";
import { FileText, CheckCircle, Settings, Code, GitCommit, Zap, Workflow } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters in Technical Documentation Workflows",
  description:
    "Explore the importance and application of JSON formatters in creating, maintaining, and automating technical documentation workflows.",
};

export default function JsonFormattersInDocsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileText className="mr-3 h-8 w-8 text-blue-500" />
        JSON Formatters in Technical Documentation Workflows
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is ubiquitous in modern technical documentation. It's used
          for API request/response examples, configuration file structures, data payload
          descriptions, and much more. However, raw JSON can be hard to read, especially
          when it's minified or inconsistently formatted. This is where <strong>JSON formatters</strong> come in.
        </p>
        <p>
          This page explores the role of JSON formatters in technical documentation workflows,
          why they are crucial for both authors and readers, and how to integrate them effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
          Why Format JSON in Documentation?
        </h2>
        <p>
          Consistent and well-formatted JSON examples significantly improve the quality
          and usability of technical documentation. Here's why:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Properly indented and spaced JSON is easy for the human eye to parse,
            making it quicker for developers to understand the structure and data.
          </li>
          <li>
            <strong>Consistency:</strong> Ensures all JSON examples across your documentation adhere to the same
            style guide, reducing cognitive load for the reader.
          </li>
          <li>
            <strong>Accuracy & Validation:</strong> Many formatters also perform basic syntax validation.
            Formatting an invalid JSON string will typically fail, alerting the author to an error before
            the documentation is published.
          </li>
          <li>
            <strong>Copy-Paste Usability:</strong> Cleanly formatted JSON is less prone to errors when readers
            copy and paste it into their own code or tools.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-2 h-6 w-6 text-yellow-500" />
          Tools for Formatting JSON
        </h2>
        <p>
          Numerous tools are available to format JSON. The choice often depends on your workflow
          and preference.
        </p>

        <h3 className="text-xl font-semibold mt-6">Online Formatters</h3>
        <p>
          These are web-based tools where you paste JSON, and it provides formatted output.
          Useful for quick, manual formatting, but not suitable for automated workflows or
          sensitive data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p><em>Example sites: jsonformatter.org, codebeautifier.com</em></p>
           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
             <CheckCircle className="inline-block mr-1 h-4 w-4" /> Quick & Easy for one-off tasks.
             <br />
             <Settings className="inline-block mr-1 h-4 w-4" /> Manual process; not for automation.
             <br />
             <FileText className="inline-block mr-1 h-4 w-4" /> Avoid with sensitive data due to privacy concerns.
           </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">CLI Tools</h3>
        <p>
          Command-line tools are powerful for formatting single files or processing JSON in scripts.
          <Code className="inline-block ml-1 h-4 w-4" /> <span className="font-mono">jq</span> is a popular and versatile example.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <h4 className="text-lg font-medium mb-2">Example: Using <code className="font-mono">jq</code></h4>
           <p>Assume you have a minified JSON file named <code className="font-mono">data.json</code>:</p>
           <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
             {`{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}`}
           </pre>
           <p className="mt-3">To format it using <code className="font-mono">jq</code> (identity filter <code className="font-mono">.</code>):</p>
           <pre className="bg-gray-200 p-3 rounded dark:bg-gray-700 overflow-x-auto text-sm">
             {`cat data.json | jq '.'`}
           </pre>
            <p className="mt-3">Output:</p>
           <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
{`{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": [
    "Math",
    "Science"
  ]
}`}
           </pre>
           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
             <CheckCircle className="inline-block mr-1 h-4 w-4" /> Great for scripting & automation.
             <br />
             <Settings className="inline-block mr-1 h-4 w-4" /> Requires installation; command-line usage.
           </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">IDE Extensions & Built-in Features</h3>
         <p>
           Most modern Integrated Development Environments (IDEs) and code editors (like VS Code, Sublime Text, WebStorm)
           have built-in or extension-based JSON formatters. These allow you to format JSON directly
           within the editor, often with a keyboard shortcut or on file save.
         </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
             <CheckCircle className="inline-block mr-1 h-4 w-4" /> Convenient during authoring.
             <br />
             <Settings className="inline-block mr-1 h-4 w-4" /> Per-developer setup; not centralized.
           </p>
        </div>


        <h3 className="text-xl font-semibold mt-6">Library-based Formatting</h3>
         <p>
           If you are generating JSON programmatically for documentation (e.g., API responses generated by a script,
           or configuration examples), you can format it directly using libraries in your programming language.
           In JavaScript/TypeScript, the standard <code className="font-mono">JSON.stringify()</code> method offers
           formatting options.
         </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <h4 className="text-lg font-medium mb-2">Example: Using <code className="font-mono">JSON.stringify()</code></h4>
           <p>Consider a JavaScript object:</p>
           <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
             {`const data = { name: "Bob", id: 123, active: true, tags: ["api", "user"] };`}
           </pre>
           <p className="mt-3">Using <code className="font-mono">JSON.stringify(data)</code> produces minified output:</p>
           <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
             {`{"name":"Bob","id":123,"active":true,"tags":["api","user"]}`}
           </pre>
           <p className="mt-3">Using <code className="font-mono">JSON.stringify(data, null, 2)</code> formats it with 2-space indentation:</p>
           <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
{`{
  "name": "Bob",
  "id": 123,
  "active": true,
  "tags": [
    "api",
    "user"
  ]
}`}
           </pre>
           <p className="mt-3">The third argument can be a number (for spaces) or a string (e.g., <code className="font-mono">'\t'</code> for tabs).</p>
           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
             <CheckCircle className="inline-block mr-1 h-4 w-4" /> Programmatic control; ideal for generated docs.
             <br />
             <Settings className="inline-block mr-1 h-4 w-4" /> Requires coding; specific to language/environment.
           </p>
        </div>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Workflow className="mr-2 h-6 w-6 text-purple-500" />
          Integrating Formatting into Documentation Workflows
        </h2>
        <p>
          To ensure consistent formatting across large documentation projects and multiple contributors,
          automating the formatting process is highly recommended.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
           <GitCommit className="mr-2 h-5 w-5 text-indigo-500" />
           Pre-commit Hooks
        </h3>
        <p>
          A powerful approach is to use Git pre-commit hooks. These are scripts that run automatically
          before a commit is created. You can configure a hook to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Identify files containing JSON (e.g., <code className="font-mono">*.json</code> files, or code blocks within markdown/other formats).</li>
          <li>Run a CLI formatter (<code className="font-mono">jq</code>, <code className="font-mono">prettier</code>, etc.) on these files/blocks.</li>
          <li>If formatting changes occur, automatically stage those changes or fail the commit, prompting the author to review the formatted code.</li>
        </ul>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p>Using a tool like <code className="font-mono">husky</code> (a Git hooks manager) and a formatter like <code className="font-mono">prettier</code> (which supports JSON) can simplify this setup.</p>
           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
             <CheckCircle className="inline-block mr-1 h-4 w-4" /> Enforces formatting standard before code enters repo.
             <br />
             <Settings className="inline-block mr-1 h-4 w-4" /> Can add minor delay to commit process; requires initial setup.
           </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Zap className="mr-2 h-5 w-5 text-orange-500" />
           CI/CD Pipelines
        </h3>
        <p>
          Integrate JSON formatting checks or automatic formatting into your Continuous Integration/Continuous Delivery (CI/CD) pipeline.
          This serves as a safety net to catch any formatting issues that might slip past pre-commit hooks.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Linting/Checking:</strong> Add a step that runs a formatter in check mode (e.g., <code className="font-mono">prettier --check</code>). If any files are not correctly formatted, the build fails, alerting the team.
          </li>
          <li>
            <strong>Automatic Correction:</strong> Less common for documentation source files, but possible. The CI job could format the files and commit the changes back to the branch.
          </li>
        </ul>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p>This adds a layer of quality control, ensuring that the published documentation always features consistently formatted JSON.</p>
           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
             <CheckCircle className="inline-block mr-1 h-4 w-4" /> Final quality gate; ensures published docs are consistent.
             <br />
             <Settings className="inline-block mr-1 h-4 w-4" /> Runs after commit; doesn't prevent badly formatted code from entering PR (unless combined with pre-commit hooks).
           </p>
        </div>


        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While seemingly a minor detail, the consistent and readable formatting of JSON
          examples is a significant factor in the quality and usability of technical
          documentation. Integrating JSON formatters into your documentation workflow,
          especially through automation via pre-commit hooks or CI/CD pipelines,
          is a best practice that saves time, reduces errors, and provides a better
          experience for your readers. Choose the tools that best fit your project's
          needs and automate the process wherever possible.
        </p>
      </div>
    </>
  );
}
