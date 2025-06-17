import type { Metadata } from "next";
import {
  Lightbulb,
  CheckCheck,
  X,
  Info,
  Copy,
  Minimize2,
  Sparkles,
  Settings,
  FileJson,
  Zap,
  Trash2,
  Search,
  Code,
  Download,
} from "lucide-react";

export const metadata: Metadata = {
  title: "UI Copywriting Guidelines for JSON Formatting Tools | Offline Tools",
  description:
    "Comprehensive guidelines for writing clear, helpful, and effective UI copy for JSON formatting and validation tools.",
};

export default function JsonCopywritingGuidelinesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="size-8" /> UI Copywriting Guidelines for JSON Formatting Tools
      </h1>

      <div className="space-y-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          For developers working with APIs, configuration files, or data exchange, JSON formatting and validation tools
          are essential. While functionality is key, clear and effective UI copywriting is crucial for usability,
          helping developers of all levels understand how to use the tool, interpret results, and fix errors quickly.
          This guide provides principles and specific examples for crafting helpful copy.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="size-6" /> Why UI Copy Matters in Developer Tools
          </h2>
          <p>
            Developer tools are often used under time pressure. Poor or confusing copy can lead to frustration,
            mistakes, and abandonment of the tool. Good copy, however, can:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li className="flex items-start gap-2">
              <CheckCheck className="size-5 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" /> Guide users
              through complex processes (like parsing errors).
            </li>
            <li className="flex items-start gap-2">
              <CheckCheck className="size-5 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" /> Clarify technical
              concepts and options.
            </li>
            <li className="flex items-start gap-2">
              <CheckCheck className="size-5 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" /> Build trust and
              confidence in the tool&apos;s output.
            </li>
            <li className="flex items-start gap-2">
              <CheckCheck className="size-5 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" /> Reduce the need
              for external documentation or trial-and-error.
            </li>
          </ul>
          <p className="mt-4">
            For JSON tools specifically, this means helping users format code for readability, validate its correctness
            according to standards or schemas, and understand exactly why their JSON might be invalid.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info className="size-6" /> Core Principles of Good UI Copy
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Zap className="size-5 text-blue-600 dark:text-blue-400" /> Clarity & Precision
              </h3>
              <p>
                Use clear, unambiguous language. Avoid overly technical jargon unless it&apos;s standard for the domain
                (e.g., &quot;JSON&quot;, &quot;schema&quot;). Be precise about what an action does or what an error
                means.
              </p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Invalid JSON: Expected a
                  comma or closing brace at line 5, column 10.&quot;
                </p>
                <p>
                  <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Parsing error.&quot;
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Settings className="size-5 text-blue-600 dark:text-blue-400" /> Consistency
              </h3>
              <p>
                Use consistent terms for the same action or concept throughout the tool. If you call it &quot;Format
                JSON&quot; on a button, don&apos;t call it &quot;Beautify Code&quot; elsewhere. Maintain consistent
                phrasing for similar types of messages (e.g., all error messages start with the type of error).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Minimize2 className="size-5 text-blue-600 dark:text-blue-400" /> Conciseness
              </h3>
              <p>
                Developers often scan interfaces quickly. Get straight to the point. Use short sentences and phrases
                where possible, especially on buttons and labels.
              </p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Copy Output&quot;
                </p>
                <p>
                  <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Click here to copy the
                  formatted JSON output to your clipboard.&quot;
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="size-5 text-blue-600 dark:text-blue-400" /> Empathy
              </h3>
              <p>
                Acknowledge the user&apos;s potential state, especially when things go wrong. Error messages should be
                helpful, not accusatory. Guide the user toward a solution.
              </p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Could not parse JSON.
                  Please check the syntax near line 15.&quot;
                </p>
                <p>
                  <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Invalid input data.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson className="size-6" /> Copywriting for Specific UI Elements
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Input/Output Areas</h3>
              <p>
                Labels, placeholders, and help text guide users on where to paste their JSON and what to expect in the
                output.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="font-medium">Labels:</strong> Clear and concise.
                  <div className="bg-gray-100 p-3 rounded-md my-1 dark:bg-gray-800">
                    <p>
                      <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;JSON Input&quot;,
                      &quot;Formatted JSON Output&quot;
                    </p>
                    <p>
                      <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Your Code Here&quot;,
                      &quot;Result&quot;
                    </p>
                  </div>
                </li>
                <li>
                  <strong className="font-medium">Placeholders:</strong> Provide a hint of expected content.
                  <div className="bg-gray-100 p-3 rounded-md my-1 dark:bg-gray-800">
                    <p>
                      <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Paste or type JSON
                      here...&quot;
                    </p>
                    <p>
                      <strong className="text-red-700 dark:text-red-300">Bad:</strong> (Empty placeholder)
                    </p>
                  </div>
                </li>
                <li>
                  <strong className="font-medium">Help Text:</strong> Explain specific features or limitations.
                  <div className="bg-gray-100 p-3 rounded-md my-1 dark:bg-gray-800">
                    <p>
                      <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Max input size:
                      1MB.&quot;
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Action Buttons</h3>
              <p>Buttons should clearly indicate the action they perform.</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="font-medium">Primary Actions:</strong>
                  <div className="bg-gray-100 p-3 rounded-md my-1 dark:bg-gray-800">
                    <p>
                      <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Format&quot;,
                      &quot;Validate&quot;
                    </p>
                    <p>
                      <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Go&quot;,
                      &quot;Process&quot;
                    </p>
                  </div>
                </li>
                <li>
                  <strong className="font-medium">Utility Actions:</strong> Use standard verbs.
                  <div className="bg-gray-100 p-3 rounded-md my-1 dark:bg-gray-800 flex items-center gap-4">
                    <p>
                      <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Copy Output&quot;{" "}
                      <Copy className="size-5" />, &quot;Download JSON&quot; <Download className="size-5" />,
                      &quot;Clear Input&quot; <Trash2 className="size-5" />
                    </p>
                  </div>
                </li>
                <li>
                  <strong className="font-medium">Formatting Options:</strong>
                  <div className="bg-gray-100 p-3 rounded-md my-1 dark:bg-gray-800 flex items-center gap-4">
                    <p>
                      <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Minify&quot;{" "}
                      <Minimize2 className="size-5" />, &quot;Pretty Print&quot; <Sparkles className="size-5" />
                    </p>
                    <p>
                      <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Compress&quot;,
                      &quot;Expand&quot;{" "}
                      {/* Unless those are explicitly what they do beyond standard JSON formatting */}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Error Messages <X className="size-5 text-red-600 dark:text-red-400 inline-block ml-2" />
              </h3>
              <p>Error messages are critical. They must be:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="font-medium">Specific:</strong> Pinpoint the location and nature of the error if
                  possible. Line and column numbers are invaluable.
                </li>
                <li>
                  <strong className="font-medium">Actionable:</strong> Suggest what the user can do to fix it.
                </li>
                <li>
                  <strong className="font-medium">Polite:</strong> Avoid blaming the user.
                </li>
              </ul>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                {/* Fixed: Replaced literal '}' with &apos;&#x7d;&apos; */}
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good (Parsing Error):</strong> &quot;Invalid
                  JSON syntax. Unexpected token &apos;&#x7d;&apos; at line 10, column 5. Check for missing commas or
                  incorrect nesting.&quot;
                </p>
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good (Validation Error):</strong> &quot;Schema
                  validation failed. The &apos;age&apos; property must be a number, but received a string at path
                  &apos;/user/age&apos;.&quot;
                </p>
                <p>
                  <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Error processing input.&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Success Messages <CheckCheck className="size-5 text-green-600 dark:text-green-400 inline-block ml-2" />
              </h3>
              <p>Confirm that an action was successful. These can be brief notifications.</p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;JSON formatted
                  successfully.&quot;, &quot;Copied to clipboard!&quot;, &quot;Validation successful. JSON is
                  valid.&quot;
                </p>
                <p>
                  <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Done.&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Progress/Loading Indicators</h3>
              <p>
                Inform the user that an action is in progress, especially for operations that might take a few moments.
              </p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="text-green-700 dark:text-green-300">Good:</strong> &quot;Formatting...&quot;,
                  &quot;Validating JSON...&quot;, &quot;Loading schema...&quot;
                </p>
                <p>
                  <strong className="text-red-700 dark:text-red-300">Bad:</strong> &quot;Processing.&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Settings/Options <Settings className="size-5 text-gray-600 dark:text-gray-400 inline-block ml-2" />
              </h3>
              <p>Labels and descriptions for settings should be clear about their effect.</p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="font-medium">Label:</strong> &quot;Indentation&quot;, &quot;Sort Keys&quot;
                </p>
                <p>
                  <strong className="font-medium">Options:</strong> &quot;2 Spaces&quot;, &quot;4 Spaces&quot;,
                  &quot;Tabs&quot;, &quot;Alphabetically&quot;, &quot;None&quot;
                </p>
                <p>
                  <strong className="font-medium">Help Text (if needed):</strong> &quot;Sorts object keys alphabetically
                  before formatting.&quot;
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Advanced Features (e.g., Validation, Diffing){" "}
                <Search className="size-5 text-gray-600 dark:text-gray-400 inline-block ml-2" />
              </h3>
              <p>
                Clearly name these features and provide sufficient explanation if they are not universally understood.
              </p>
              <div className="bg-gray-100 p-3 rounded-md my-3 dark:bg-gray-800">
                <p>
                  <strong className="font-medium">Feature Name:</strong> &quot;Schema Validation&quot;, &quot;JSON
                  Diff&quot;, &quot;Query JSON (JMESPath)&quot;
                </p>
                <p>
                  <strong className="font-medium">Instructions/Help:</strong> &quot;Paste your JSON schema here.&quot;,
                  &quot;Compare two JSON documents.&quot;, &quot;Enter a JMESPath expression to extract data.&quot;
                </p>
                <p className="mt-2">Example using code formatting:</p>
                {/* Fixed: Replaced {'...'} with HTML entities within <code> */}
                <p>
                  Enter a JMESPath expression (e.g.,{" "}
                  <code>&#x7b;&apos;users[?age &gt; &#x60;30&#x60;].name&apos;&#x7d;</code>) to filter and select data.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="size-6" /> Tips for Implementation
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="font-medium">Use icons judiciously:</strong> Icons can complement text but
              shouldn&apos;t replace essential labels on interactive elements unless their meaning is universal (like
              copy <Copy className="size-4 inline-block mx-1" /> or trash{" "}
              <Trash2 className="size-4 inline-block mx-1" />
              ).
            </li>
            <li>
              <strong className="font-medium">Provide context:</strong> For error messages, show the relevant snippet of
              code or highlight the exact location.
            </li>
            <li>
              <strong className="font-medium">Consider tooltips/hover text:</strong> Use tooltips for brief explanations
              of less common features or icons without cluttering the main interface.
            </li>
            {/* Fixed: Corrected broken li tag */}
            <li>
              <strong className="font-medium">Test with users:</strong> Have developers with different levels of
              experience use the tool and provide feedback on the clarity of the copy.
            </li>
            <li>
              <strong className="font-medium">Handle empty states:</strong> What does the tool show before any JSON is
              entered? A simple message like &quot;Ready to format.&quot; or instructions.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCheck className="size-6" /> Conclusion
          </h2>
          <p>
            Good UI copywriting transforms a functional JSON tool into a truly user-friendly one. By prioritizing
            clarity, consistency, conciseness, and empathy, you can help developers use your tool efficiently,
            understand its output, and quickly resolve any issues with their JSON data. Think of the copy as part of the
            user experience, guiding them smoothly from input to desired output.
          </p>
        </section>

        {/* Example of HTML entities within code tags */}
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-8">
          <h3 className="text-lg font-medium mb-3">Using HTML Entities in Code Examples:</h3>
          {/* This paragraph correctly uses entities to describe the entities and characters */}
          <p className="mb-2">
            When showing code snippets within <code>&amp;lt;code&amp;gt;</code> or <code>&amp;lt;pre&amp;gt;</code> tags
            in JSX, use HTML entities for characters like &apos;&amp;lt;&apos;, &apos;&amp;gt;&apos;, &#x7b;, and &#x7d;
            to prevent them from being interpreted as HTML/JSX tags or expressions.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {/* The content of the pre tag is a template literal.
                  The entities like &lt;, &gt;, &#x7b;, &#x7d; within the string
                  are for *displaying* those characters and entities literally.
                  This is correct for explaining how to use them in JSX.
                  The &#x60; is also correct for displaying the backtick.
              */}
              {`// Displaying a JSON object structure using entities

// In your TSX, you might show this as:
// &lt;p&gt;Consider this structure: &lt;code&gt;&#x7b;"name": "...", "age": ...&#x7d;&lt;/code&gt;&lt;/p&gt;

// Or a code block:
// &lt;pre&gt;&#x7b;&#x60;{
//   "user": {
//     "id": 123,
//     "name": "Alice"
//   }
// }&#x60;&#x7d;&lt;/pre&gt;

// Note the use of &amp;lt; for <, &amp;gt; for >, &#x7b; for {, &#x7d; for }, &#x60; for backtick within template literals shown inside pre tags.
// This is important when describing code syntax.
`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
