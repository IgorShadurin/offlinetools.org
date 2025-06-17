import type { Metadata } from "next";
import {
  Bug,
  Code,
  Search,
  Info,
  CheckCheck,
  Columns,
  MessageCircleQuestion,
  SquareFunction, // Represents evaluation/functions
  Files, // Represents scratch files
  Terminal, // Represents evaluation in debug console
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "IntelliJ IDEA's JSON Debugging Capabilities",
  description:
    "Explore the powerful features IntelliJ IDEA offers for working with and debugging JSON data within your development workflow.",
};

export default function IntellijJsonDebuggingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3 h-8 w-8 text-red-500" />
        IntelliJ IDEA&apos;s JSON Debugging Capabilities
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and in many
          applications. As developers, we constantly deal with JSON data, whether it&apos;s API responses, configuration
          files, or message queues. Debugging issues related to JSON structure, content, or parsing is a common task.
        </p>
        <p>
          IntelliJ IDEA, a popular Integrated Development Environment (IDE) from JetBrains, provides a wealth of
          features that go beyond basic syntax highlighting to significantly aid in working with and debugging JSON
          data, even when it&apos;s embedded within variables during a debugging session. This article explores these
          capabilities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-500" />
          Core JSON Editing and Validation Features
        </h2>
        <p>
          Before even hitting the debugger, IntelliJ IDEA offers excellent support for working with JSON files directly.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 h-5 w-5 text-blue-500" />
          Syntax Highlighting and Formatting
        </h3>
        <p>
          IntelliJ provides intelligent syntax highlighting for <code>.json</code> files, making the structure
          immediately readable. It differentiates keys, strings, numbers, booleans, and null values. The built-in
          formatter (usually invoked with <code>Ctrl+Alt+L</code> or <code>Cmd+Option+L</code>) ensures consistent
          indentation and spacing, crucial for readability of complex JSON structures.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="mr-2 h-5 w-5 text-green-500" />
          Real-time Validation and Error Highlighting
        </h3>
        <p>
          The IDE validates your JSON against the standard specification as you type. It immediately highlights syntax
          errors (like missing commas, incorrect quotes, trailing commas in objects/arrays in strict mode, etc.),
          helping you catch structural issues before runtime.
        </p>
        <p>
          <Info className="inline-block h-4 w-4 mr-1 align-text-bottom text-yellow-500" />
          You can also use &quot;Code&quot; &gt; &quot;Analyze Code&quot; &gt; &quot;Inspect Code...&quot; for a broader
          analysis, although real-time highlighting is usually sufficient for syntax errors.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Columns className="mr-2 h-5 w-5 text-purple-500" />
          Structure View and Folding
        </h3>
        <p>
          For large JSON files, the Structure tool window (usually <code>Alt+7</code> or <code>Cmd+7</code>) provides a
          hierarchical view of the JSON document, allowing you to quickly navigate between keys and nested
          objects/arrays. Code folding allows you to collapse complex objects or arrays, making the file more
          manageable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-2 h-6 w-6 text-red-500" />
          Debugging JSON Data in Variables
        </h2>
        <p>
          One of the most powerful aspects of IntelliJ&apos;s JSON support comes into play during a debugging session
          for code that processes JSON (e.g., Java, Kotlin, JavaScript, Python, etc.).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Terminal className="mr-2 h-5 w-5 text-red-500" />
          Viewing JSON Strings in the Debugger
        </h3>
        <p>
          When a variable holds a string containing JSON (e.g., a raw API response string), IntelliJ often recognizes
          it. In the &quot;Variables&quot; view, you might see a &quot;View as&quot; option or a similar indicator.
          Choosing &quot;JSON&quot; will open a dedicated, formatted, and often foldable view of that JSON string,
          making it much easier to inspect than a single long string.
        </p>
        <p>This is invaluable for debugging parsing errors, where the input string might be malformed.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <SquareFunction className="mr-2 h-5 w-5 text-orange-500" />
          Evaluating Expressions with JSON
        </h3>
        <p>
          The debugger&apos;s &quot;Evaluate Expression&quot; feature (usually <code>Alt+F8</code> or{" "}
          <code>Option+F8</code>) is incredibly flexible. If you have parsed JSON data into native language structures
          (like Java objects from Jackson/Gson, JavaScript objects, Python dictionaries), you can evaluate expressions
          that access nested fields or array elements using the language&apos;s syntax.
        </p>
        <p>
          More impressively, if you have a JSON string variable, you can often use evaluation features provided by
          language plugins (like the JavaScript/TypeScript plugin) to parse and manipulate that JSON string on the fly
          within the debugger.
        </p>
        <p>
          For example, in a JavaScript debugging session, if <code>jsonString</code> contains a JSON string, you can
          evaluate <code>JSON.parse(jsonString)</code> to see the resulting object structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Search className="mr-2 h-6 w-6 text-indigo-500" />
          JSON Path Evaluation
        </h2>
        <p>
          IntelliJ IDEA has built-in support for JSON Path, a query language for JSON, similar to XPath for XML. This is
          extremely useful for extracting specific values from large JSON documents.
        </p>
        <p>
          When viewing a JSON string in the dedicated JSON viewer within the debugger (or even when editing a{" "}
          <code>.json</code> file), you can often right-click and find an option like &quot;Evaluate JSONPath&quot; or
          &quot;Run JSONPath query&quot;.
        </p>
        <p>
          This opens a tool window where you can type a JSON Path expression (e.g.,{" "}
          <code>$.store.book[?(@.price &lt; 10)].title</code>) and see the results highlighted in the JSON document or
          listed in a separate pane. This is indispensable for verifying that you can correctly access the data you
          expect from a complex JSON structure.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Info className="mr-2 h-5 w-5 text-yellow-500" />
            JSON Path Examples:
          </h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <code>$.store.book</code>: Selects all books in the store.
            </li>
            <li>
              <code>$.store.book[0].title</code>: Selects the title of the first book.
            </li>
            <li>
              <code>$..author</code>: Selects all authors in the document, regardless of nesting.
            </li>
            <li>
              <code>$.store.*</code>: Selects all members of the store object (books and bicycle).
            </li>
            <li>
              <code>$.store.book[?(@.isbn)]</code>: Selects all books with an ISBN number.
            </li>
          </ul>
          <p className="mt-4">IntelliJ&apos;s tool allows you to test these queries interactively.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Files className="mr-2 h-6 w-6 text-teal-500" />
          Using Scratch Files for JSON
        </h2>
        <p>
          IntelliJ&apos;s Scratch Files feature (<code>Ctrl+Alt+Shift+Insert</code> or{" "}
          <code>Cmd+Option+Shift+Insert</code>) is perfect for quickly pasting, formatting, validating, or manipulating
          JSON snippets without creating a permanent file in your project.
        </p>
        <p>
          You can create a new Scratch File of type JSON, paste your data, use the built-in formatting and validation,
          and even use the JSON Path evaluation tool directly on the content of the scratch file. This is ideal for
          inspecting JSON copied from logs, network requests, or documentation examples.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MessageCircleQuestion className="mr-2 h-6 w-6 text-blue-500" />
          Tips and Tricks
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Copy as JSON:</strong> In the Variables view during debugging, you can often right-click on an
            object or array variable (if the language plugin supports it) and copy its current state formatted as a JSON
            string. This is useful for saving complex variable states.
          </li>
          <li>
            <strong>Paste JSON as Class/Code:</strong> IntelliJ can often generate code (like Java classes, Kotlin data
            classes, TypeScript interfaces) from a JSON structure pasted from the clipboard. Use &quot;Edit&quot; &gt;
            &quot;Paste Special&quot; &gt; &quot;Paste JSON as Classes&quot; (the exact wording might vary by language
            and version).
          </li>
          <li>
            <strong>Schema Validation:</strong> For critical JSON formats, associate a JSON Schema with your file
            (Settings/Preferences &gt; Languages &amp; Frameworks &gt; JSON Schema Mapping). IntelliJ will validate your
            JSON against the schema, providing much deeper validation than just syntax checks.
          </li>
          <li>
            <strong>REST Client Integration:</strong> If you use IntelliJ&apos;s built-in REST client, responses are
            automatically shown with full JSON highlighting, formatting, and JSON Path evaluation capabilities.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Debugging JSON doesn&apos;t have to be a manual process of copying strings into online validators or squinting
          at unformatted text in log files. IntelliJ IDEA integrates powerful JSON handling features directly into the
          development and debugging workflow. From real-time syntax checks and formatting to interactive JSON Path
          evaluation and seamless viewing of JSON data within variables, these capabilities significantly reduce the
          time and effort required to identify and fix issues involving JSON, making your development process smoother
          and more efficient. Leverage these tools to take the frustration out of JSON debugging.
        </p>
      </div>
    </>
  );
}
