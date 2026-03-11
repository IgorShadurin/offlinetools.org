import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Working with Comments in JSON5-Compatible Formatters | Offline Tools",
  description:
    "Learn when JSON5 comments work, when formatters preserve or drop them, and how to convert commented files for strict JSON parsers, APIs, and VBA tools.",
};

export default function Json5CommentsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Working with Comments in JSON5-Compatible Formatters</h1>

      <div className="space-y-6">
        <p>
          If your file contains <code>// single-line</code> or <code>/* block */</code> comments, it is no longer
          standard JSON. It needs a formatter or parser that explicitly supports JSON5. That distinction is the main
          reason commented config files work in some tools but fail immediately in APIs, browser <code>JSON.parse()</code>
          calls, or older automation scripts.
        </p>

        <p>
          JSON5 extends JSON with human-friendly syntax such as comments, trailing commas, single-quoted strings, and
          unquoted keys. Comments are one of its most useful features, but they only help if your workflow preserves
          them where needed and converts them away where strict JSON is required.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Quick Answer</h2>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Standard JSON does not allow comments.</li>
          <li>JSON5 allows both <code>//</code> and <code>/* ... */</code> comments.</li>
          <li>A JSON5-compatible formatter can read and format commented files, but a strict JSON formatter cannot.</li>
          <li>
            If you parse a commented file into an object and then stringify it again, the original comments usually do
            not survive.
          </li>
          <li>
            If the final destination is an API, a browser JSON parser, or a VBA JSON library, convert the file back to
            strict JSON before sending it downstream.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Why Standard JSON Doesn&apos;t Allow Comments</h2>
        <p>
          The original JSON specification deliberately omitted comments. Douglas Crockford, the creator of JSON, stated
          that he removed comments because he saw people using them to include parsing directives. His goal was to keep
          JSON purely a data format, free from implementation details or instructions within the data itself. While this
          decision keeps JSON simple and focused, it removes a useful feature for human readability and maintainability,
          especially for configuration files.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON5: JSON for Humans</h2>
        <p>JSON5 extends JSON with several features aimed at improving human readability. These include:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Comments (single-line and multi-line)</li>
          <li>Trailing commas in objects and arrays</li>
          <li>Unquoted object keys (if they are valid identifiers)</li>
          <li>Single-quoted strings</li>
          <li>Multiline strings</li>
          <li>Reserved words as keys</li>
          <li>Other number formats (hexadecimal, positive/negative infinity, NaN)</li>
        </ul>
        <p className="mt-4">
          For hand-edited config files, comments are usually the feature people care about most because they let you
          explain defaults, warnings, environment-specific settings, and migration notes right next to the data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Which Comment Styles Work in JSON5</h2>
        <p>JSON5 supports the same two comment styles most developers already know from JavaScript:</p>

        <h3 className="text-xl font-semibold mt-6">1. Single-Line Comments (`//`)</h3>
        <p>
          These comments start with two forward slashes (`//`) and continue to the end of the line. They are useful for
          adding brief explanations or notes next to specific properties or values.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "database": {
    "host": "localhost", // Database server address
    "port": 5432,        // Port number for connection
    "username": "admin"
    // Note: Password should be stored securely, not here!
  },
  "api": {
    "timeout": 5000      // API request timeout in ms
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Single-line comments provide inline context for individual lines or properties.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Multi-Line Comments (`/* */`)</h3>
        <p>
          These comments start with `/*` and end with `*/`. They can span multiple lines and are ideal for more detailed
          explanations, descriptions of sections, or temporarily commenting out blocks of code.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  /*
    Application Configuration File

    This file contains settings for database connections,
    API endpoints, feature flags, etc.
    Please be careful when modifying this file.
  */
  "appSettings": {
    "appName": "My Awesome App",
    "version": "1.0.0"
  },
  /*
  "featureFlags": {
    "beta": true, // Temporarily disabled for production testing
    "new_dashboard": false
  },
  */
  "logging": {
    "level": "info" // Set logging level (debug, info, warn, error)
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Multi-line comments are useful for longer descriptions or commenting out sections.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What a JSON5-Compatible Formatter Actually Does</h2>
        <p>
          The phrase &quot;JSON5-compatible formatter&quot; can mean different things, and the difference matters if you care
          about comments.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <span className="font-medium">Strict JSON formatter:</span> Rejects the file as soon as it sees comments,
            trailing commas, or other JSON5 syntax.
          </li>
          <li>
            <span className="font-medium">JSON5 text formatter:</span> Reads the commented source and rewrites spacing,
            indentation, and line breaks while keeping valid comments in place.
          </li>
          <li>
            <span className="font-medium">Parse-and-stringify workflow:</span> Reads the data into an object and writes
            it back out. This usually removes the original comments because comments are not part of the resulting data
            structure.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Authored by a human
{
  // Retry failed uploads three times before surfacing an error
  retries: 3,
  timeoutMs: 5000,
}`}
            </pre>
          </div>
          <p className="mt-3">
            A JSON5-aware formatter can keep that comment. But if you convert the file to a plain object and export it
            as strict JSON for an API, the output will usually look more like this:
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>{`{"retries":3,"timeoutMs":5000}`}</pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Benefits of Using Comments in JSON5</h2>
        <p>Adding comments to your JSON5 files offers several advantages:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <span className="font-medium">Improved Readability:</span> Explain complex settings or data structures
            directly within the file.
          </li>
          <li>
            <span className="font-medium">Easier Maintenance:</span> Future users (including yourself) can quickly
            understand the purpose of different parts of the configuration or data.
          </li>
          <li>
            <span className="font-medium">Self-Documenting:</span> The file becomes its own documentation, reducing the
            need for separate documents (though complex systems may still require them).
          </li>
          <li>
            <span className="font-medium">Temporary Disabling:</span> Easily comment out configuration options or data
            entries without deleting them.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Best Workflow When Comments Matter</h2>
        <p>
          The safest pattern is to treat comments as authoring-time help, not as data that every downstream consumer
          must understand.
        </p>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>Author and review the file as JSON5 so comments stay close to the settings they explain.</li>
          <li>Format and validate it with a tool that explicitly says it supports JSON5.</li>
          <li>Convert it to strict JSON before sending it to systems that expect plain JSON.</li>
          <li>Keep the commented source file if humans still need to maintain the configuration later.</li>
        </ol>
        <p>
          This avoids the common mistake of assuming that because one editor accepts commented JSON, every parser in the
          pipeline will accept it too.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Using JSON5-Compatible Formatters and Parsers</h2>
        <p>
          To work with JSON5 files, you need tools that understand the JSON5 specification. Standard JSON parsers will
          throw errors when encountering comments or other JSON5 features.
        </p>
        <p>
          Look for text editors, IDEs, and online formatters/validators that explicitly state support for JSON5. These
          tools will correctly parse, format, and validate your JSON5 files, including preserving or handling comments
          as appropriate.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Software and Libraries Supporting JSON5:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Many modern code editors (VS Code, Sublime Text, Atom, etc.) with appropriate plugins/extensions.</li>
            <li>Online JSON5 validators and formatters.</li>
            <li>
              Libraries in various programming languages (e.g., `json5` for JavaScript/Node.js, `python-json5` for
              Python) that provide parsing and stringifying capabilities.
            </li>
          </ul>
        </div>
        <p>
          In the JavaScript ecosystem, the official JSON5 tooling also supports validation and conversion. That is
          useful when your source file should stay commented, but your deployment artifact must be plain JSON.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`# Validate a commented JSON5 file
json5 --validate config.json5

# Convert JSON5 to strict JSON
json5 -o config.json config.json5`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Working with VBA and Other Strict JSON Tools</h2>
        <p>
          This is where many search users get stuck. A hand-edited file with comments may look fine in a JSON5-aware
          formatter, but Excel, Access, or older automation code often uses strict JSON libraries that expect plain
          JSON text.
        </p>
        <p>
          A common VBA workflow uses a parser such as <code>VBA-JSON</code> to load JSON into nested
          <code>Dictionary</code> and <code>Collection</code> objects. That is a good fit for working with JSON
          objects in VBA, but it also means your input should already be strict JSON by the time it reaches
          <code>ParseJson</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`' By this stage, comments should already be removed
Dim parsed As Object
Set parsed = JsonConverter.ParseJson(jsonText)

Debug.Print parsed("database")("host")`}
            </pre>
          </div>
        </div>
        <p>
          If your source config is commented JSON5, keep it as <code>.json5</code>, format and validate it with a
          JSON5-aware tool, then export a plain <code>.json</code> version for VBA, APIs, or any system that follows
          the normal JSON rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Tips for Effective Commenting in JSON5</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Be Concise:</span> Comments should clarify, not clutter. Keep them brief and
            to the point.
          </li>
          <li>
            <span className="font-medium">Explain the Why:</span> Instead of just restating what the code does, explain{" "}
            <em>why</em> it does it or the purpose of a specific setting.
          </li>
          <li>
            <span className="font-medium">Keep Them Updated:</span> Outdated comments are misleading. Ensure comments
            are updated whenever the corresponding data changes.
          </li>
          <li>
            <span className="font-medium">Use for Configuration:</span> JSON5 is particularly useful for configuration
            files where human readability and notes are highly beneficial.
          </li>
          <li>
            <span className="font-medium">Validate:</span> Even with comments, always validate your JSON5 to catch
            syntax errors before using it.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes and Fixes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Unexpected token `/` during parsing:</span> You are using a strict JSON
            parser, not a JSON5 parser.
          </li>
          <li>
            <span className="font-medium">Comments disappeared after formatting:</span> Your workflow likely parsed the
            file into data and re-serialized it instead of preserving the source text.
          </li>
          <li>
            <span className="font-medium">A browser, API, or import step rejects the file:</span> Convert the file to
            strict JSON and remove JSON5-only features such as comments, trailing commas, single quotes, and unquoted
            keys.
          </li>
          <li>
            <span className="font-medium">Your VBA script fails on a config file that looked valid in an editor:</span>
            Validate the source as JSON5 first, then pass a converted plain JSON string into the VBA parser.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Important Note:</h3>
          <p className="mt-2">
            While JSON5 is great for files maintained by humans, remember that standard JSON parsers will fail on JSON5
            files with comments. If your JSON is being machine-generated or strictly consumed by systems expecting pure
            JSON, stick to the standard format or ensure your pipeline includes a JSON5-to-JSON conversion step.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON5 comments are most useful when humans need to understand and maintain a file over time. They make local
          configuration, test fixtures, and reviewable settings files much easier to work with.
        </p>
        <p>
          The practical rule is simple: author with JSON5 when comments help, but convert to strict JSON before handing
          the data to tools that only understand plain JSON. If you keep that boundary clear, JSON5-compatible
          formatters can improve readability without breaking the rest of your pipeline.
        </p>
      </div>
    </>
  );
}
