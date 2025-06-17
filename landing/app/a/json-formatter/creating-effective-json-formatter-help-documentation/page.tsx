import type { Metadata } from "next";
import {
  Book,
  Feather,
  Lightbulb,
  Code,
  Wrench,
  CheckCircle,
  XCircle,
  Rocket,
  Users,
  LayoutList,
  HelpCircle,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Effective JSON Formatter Help Documentation | Offline Tools",
  description:
    "Learn the essential principles and components for writing clear, helpful, and comprehensive help documentation for a JSON formatter tool.",
};

export default function JsonFormatterDocumentationArticle() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Creating Effective JSON Formatter Help Documentation</h1>

      <div className="space-y-8 max-w-3xl mx-auto">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Book className="inline-block" /> Why Documentation Matters
          </h2>
          <p>
            Building a robust JSON formatter is only part of the job. For developers to effectively use your tool,
            whether it&apos;s a command-line utility, a library, or a web interface, clear and comprehensive
            documentation is absolutely crucial. Good documentation reduces the barrier to entry, answers common
            questions, showcases features, and ultimately leads to better adoption and happier users.
          </p>
          <p>
            Effective documentation acts as a bridge between your formatter&apos;s capabilities and the developer&apos;s
            needs. It should explain not just <strong className="font-semibold">what</strong>
            the formatter does, but <strong className="font-semibold">how</strong> to use it for various scenarios and{" "}
            <strong className="font-semibold">why</strong> certain options exist.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="inline-block" /> Know Your Audience
          </h2>
          <p>Before writing, consider who will be reading your documentation.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Beginners:</strong> Might need more context on JSON itself, how to install and run basic commands,
              and simple examples.
            </li>
            <li>
              <strong>Experienced Developers:</strong> Will likely look for specific options, API details, performance
              considerations, and advanced features.
            </li>
            <li>
              <strong>Users of a Web Tool:</strong> Need instructions on pasting/uploading JSON, understanding output,
              and interpreting error messages within the UI.
            </li>
            <li>
              <strong>Users of a Library/API:</strong> Need detailed function/method signatures, return types, error
              handling specifics, and integration examples.
            </li>
          </ul>
          <p>
            Tailor the language, level of detail, and structure to meet the primary audience&apos;s needs while
            providing sufficient depth for others.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <LayoutList className="inline-block" /> Essential Documentation Sections
          </h2>
          <p>A well-structured documentation page for a JSON formatter should ideally include these sections:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Overview / What It Does:</strong> A concise summary of the tool&apos;s purpose and main benefits.
            </li>
            <li>
              <strong>Installation / Getting Started:</strong> Clear steps on how to obtain and set up the formatter.
            </li>
            <li>
              <strong>Basic Usage:</strong> The simplest way to use the tool with a minimal example. This is often the
              first thing developers look for.
            </li>
            <li>
              <strong>Key Features / Options:</strong> Detail the different formatting capabilities (indentation levels,
              sorting keys, preserving order, compact output, etc.). Explain each option clearly.
            </li>
            <li>
              <strong>Input &amp; Output:</strong> Explicitly state what kind of input the tool expects (e.g., valid
              JSON string, file path) and what format the output will be in.
            </li>
            <li>
              <strong>Error Handling &amp; Troubleshooting:</strong> Document common error messages (especially parsing
              errors) and explain what they mean and how to resolve them.
            </li>
            <li>
              <strong>Examples:</strong> Crucial for a formatter. Provide diverse examples demonstrating different
              features and use cases.
            </li>
            <li>
              <strong>API Reference (if applicable):</strong> Detailed documentation for programmatic access.
            </li>
            <li>
              <strong>Performance Considerations (optional but helpful):</strong> Notes on handling very large JSON
              files.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Feather className="inline-block" /> Writing Principles
          </h2>
          <p>Focus on clarity, accuracy, and usability:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Be Clear and Concise:</strong> Get straight to the point. Avoid jargon where possible, or explain
              it if necessary.
            </li>
            <li>
              <strong>Use Simple Language:</strong> Write in plain English.
            </li>
            <li>
              <strong>Be Accurate:</strong> Ensure all examples and descriptions match the tool&apos;s current
              functionality.
            </li>
            <li>
              <strong>Consistency:</strong> Use consistent terminology, formatting for code blocks, and structure.
            </li>
            <li>
              <strong>Focus on Use Cases:</strong> Instead of just listing options, explain what problem each option
              solves. For example, &quot;Use <code className="font-mono">--indent 4</code> to make the JSON readable
              with 4 spaces per level.&quot;
            </li>
            <li>
              <strong>Update Regularly:</strong> Keep the documentation in sync with the tool&apos;s releases.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Code className="inline-block" /> Examples Are Key!
          </h2>
          <p>Examples are the most valuable part of formatter documentation. Show, don&apos;t just tell. Include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Basic formatting of objects and arrays.</li>
            <li>Formatting with different indentation levels (0, 2, 4 spaces, tabs).</li>
            <li>Using options like sorting keys alphabetically.</li>
            <li>Input with comments or trailing commas (if your formatter supports cleaning those).</li>
            <li>Examples of error output for invalid JSON.</li>
            <li>Show command-line usage, API calls, or UI interactions.</li>
          </ul>
          <p>Always pair the input JSON, the command/action taken, and the resulting output JSON or error message.</p>

          <h3 className="text-xl font-semibold mt-6">Example: Basic Formatting</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Input JSON:</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`{ "name": "Alice", "age": 30, "city": "New York" }`}
            </pre>
            <h4 className="font-medium my-2">Command (CLI example):</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`your-formatter format input.json`}
            </pre>
            <h4 className="font-medium my-2">Output JSON (with default 2-space indentation):</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6">Example: Custom Indentation &amp; Sorting</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Input JSON:</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`{ "city": "London", "name": "Bob", "zip": "SW1" }`}
            </pre>
            <h4 className="font-medium my-2">Command (CLI example with options):</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`your-formatter format input.json --indent 4 --sort-keys`}
            </pre>
            <h4 className="font-medium my-2">Output JSON (4-space indentation, keys sorted):</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`{
    "city": "London",
    "name": "Bob",
    "zip": "SW1"
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6">Example: Handling Invalid JSON</h3>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Input JSON (missing comma):</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`{ "name": "Charlie" "age": 25 }`}
            </pre>
            <h4 className="font-medium my-2">Command (CLI example):</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`your-formatter format input.json`}
            </pre>
            <h4 className="font-medium my-2">Output Error Message:</h4>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm text-red-600 dark:text-red-400">
              {`Error: Unexpected string at position 20
{ "name": "Charlie" "age": 25 }
                    ^
Expected comma or closing brace`}
            </pre>
            <p className="text-sm mt-2">
              <HelpCircle className="inline-block mr-1" size={16} /> Explain what the error means and how to fix it
              (e.g., &quot;The formatter found a string (&quot;age&quot;) where it expected a comma or the closing brace
              &apos;&#x7d;&apos; after the previous key-value pair.&quot;).
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Wrench className="inline-block" /> Documenting Options and Features
          </h2>
          <p>For each formatting option or feature your tool offers, provide:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The option name (e.g., <code className="font-mono">--indent</code>,{" "}
              <code className="font-mono">sortKeys</code>).
            </li>
            <li>A brief description of what it does.</li>
            <li>Accepted values (e.g., number of spaces, boolean true/false, &quot;tab&quot;).</li>
            <li>The default value, if any.</li>
            <li>An example demonstrating its usage and effect.</li>
          </ul>
          <p>Structuring this as a table or a definition list can improve readability.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Lightbulb className="inline-block" /> Tips for Better Documentation
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Use Code Blocks Correctly:</strong> Use <code className="font-mono">&lt;pre&gt;&lt;code&gt;</code>{" "}
              tags for code, commands, input, and output. Specify the language if your documentation system supports
              highlighting (e.g., JSON, bash).
            </li>
            <li>
              <strong>Escape Special Characters:</strong> In code blocks or text describing syntax, use HTML entities
              for characters like <code className="font-mono">&lt;</code> (<code className="font-mono">&amp;lt;</code>),{" "}
              <code className="font-mono">&gt;</code> (<code className="font-mono">&amp;gt;</code>),{" "}
              <code className="font-mono">&#x7b;</code> (<code className="font-mono">&amp;#x7b;</code>),{" "}
              <code className="font-mono">&#x7d;</code> (<code className="font-mono">&amp;#x7d;</code>).
            </li>
            <li>
              <strong>Internal Linking:</strong> Link between related sections (e.g., link from an option description to
              a specific example).
            </li>
            <li>
              <strong>Add a Search Bar:</strong> If your documentation covers many topics, a search function is
              invaluable. (Mentioned as a feature, not implemented here).
            </li>
            <li>
              <strong>Feedback Mechanism:</strong> Provide a way for users to report issues or suggest improvements to
              the documentation itself. (Mentioned as a feature, not implemented here).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Search className="inline-block" /> Error Handling Documentation
          </h2>
          <p>
            Errors are inevitable, especially when the input is invalid JSON. Your documentation should prepare users
            for this.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Describe the types of errors the formatter can report (e.g., parsing errors, I/O errors, validation errors
              if applicable).
            </li>
            <li>
              For parsing errors, explain the typical format of the error message (line number, column number,
              description).
            </li>
            <li>
              Provide examples of common errors (
              <XCircle className="inline-block mx-0.5 text-red-600 dark:text-red-400" size={16} /> missing comma,{" "}
              <XCircle className="inline-block mx-0.5 text-red-600 dark:text-red-400" size={16} /> unquoted keys,{" "}
              <XCircle className="inline-block mx-0.5 text-red-600 dark:text-red-400" size={16} /> invalid escape
              sequences) and show how the formatter reports them.
            </li>
            <li>Explain basic debugging steps (e.g., using an online validator to pinpoint the exact syntax issue).</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CheckCircle className="inline-block text-green-600 dark:text-green-400" /> Validation vs. Formatting
          </h2>
          <p>
            Clarify whether your tool *only* formats valid JSON or if it also includes a validation step. If it
            validates, explain what rules it follows (e.g., strict RFC 8259 compliance). If it attempts to fix or
            &quot;beautify&quot; slightly malformed input (like JSON with comments), make sure to document this behavior
            explicitly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Rocket className="inline-block" /> Conclusion
          </h2>
          <p>
            Effective documentation is an ongoing process, not a one-time task. By focusing on clarity, structure,
            audience, and providing ample, accurate examples, you empower developers to get the most out of your JSON
            formatter. Good documentation builds trust and makes your tool a pleasure to use, turning potential
            frustration into productive workflows.
          </p>
        </section>
      </div>
    </div>
  );
}
