import type { Metadata } from "next";
import { TriangleAlert, ScrollText, Code, SearchCode, Blocks, Diff, View } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Effective Debugging Tools for JSON Parsing",
  description:
    "Learn how to build and use effective tools and techniques for debugging JSON parsing issues in your applications.",
};

export default function DebuggingJsonParsingArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Creating Effective Debugging Tools for JSON Parsing</h1>

      <div className="space-y-6">
        <p>
          Parsing JSON data is a fundamental task in modern web development, from fetching API responses to reading
          configuration files. While built-in parsers like JavaScript&apos;s <code>JSON.parse()</code> are generally
          robust, unexpected issues can arise. Data might be malformed, have an unexpected structure, contain invalid
          characters, or simply be different from what your code expects. Effective debugging tools and techniques are
          crucial for quickly identifying and resolving these parsing problems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <TriangleAlert className="w-6 h-6 mr-2 text-yellow-500" />
          Common JSON Parsing Pitfalls
        </h2>
        <p>Before diving into debugging tools, let&apos;s review typical issues:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Syntax Errors:</strong> The JSON string is not valid according to the JSON specification (e.g.,
            trailing commas, missing quotes around keys, incorrect escaping, comments).
          </li>
          <li>
            <strong>Unexpected Data Types:</strong> A field is expected to be a number, but is received as a string, or
            an array is received instead of an object.
          </li>
          <li>
            <strong>Missing or Extra Fields:</strong> The received JSON structure doesn&apos;t match the expected
            schema; fields might be missing or entirely new, nested structures could be different.
          </li>
          <li>
            <strong>Encoding Issues:</strong> Incorrect character encoding can corrupt the JSON string before parsing.
          </li>
          <li>
            <strong>Large Payloads:</strong> Parsing very large JSON strings can sometimes lead to performance issues or
            memory limits.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Basic Built-in Debugging
        </h2>
        <p>The most fundamental tools are often built into the language or environment you&apos;re working in.</p>

        <h3 className="text-xl font-semibold mt-6">
          Using <code>try...catch</code>
        </h3>
        <p>
          The <code>JSON.parse()</code> method throws a <code>SyntaxError</code> if the input string is not valid JSON.
          Wrapping your parsing logic in a <code>try...catch</code> block is the first step to gracefully handle parsing
          failures.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Basic Error Handling:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`function parseJsonSafely(jsonString: string): any | null {
  try {
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null; // Or handle the error appropriately
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <ScrollText className="w-6 h-6 mr-2 text-green-500" />
          Logging the Input
        </h3>
        <p>
          When <code>JSON.parse</code> fails, the error message often indicates the position of the syntax error.
          However, seeing the actual input string is invaluable for understanding what went wrong. Logging the string
          before parsing is a simple yet powerful debugging technique.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Logging the Input String:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`function parseJsonAndLog(jsonString: string): any | null {
  console.log("Attempting to parse JSON:", jsonString); // Log the input
  try {
    const data = JSON.parse(jsonString);
    console.log("Successfully parsed JSON.");
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    // The error object might contain details like position
    if (error instanceof SyntaxError) {
        console.error(\`Syntax Error at position: \${(error as any).at}\`);
    }
    return null;
  }
}`}
            </pre>
          </div>
          <p className="text-sm mt-2 italic">
            Note: The <code>.at</code> property on <code>SyntaxError</code> is part of the ECMAScript standard but
            browser/Node.js implementation details might vary.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <SearchCode className="w-6 h-6 mr-2 text-purple-500" />
          Enhancing Debugging Capabilities
        </h2>

        <h3 className="text-xl font-semibold mt-6">Detailed Error Reporting</h3>
        <p>
          Generic error messages like &quot;Unexpected token o in JSON at position 1&quot; can be cryptic. Creating a
          wrapper function that catches the error and provides more context, like the problematic snippet of the JSON
          string around the error position, can greatly speed up debugging.
        </p>
        <p>
          You could extract a substring around the reported error index. For example, show 20 characters before and
          after the error position.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Enhanced Error Context:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`function parseJsonWithContext(jsonString: string): any | null {
  console.log("Attempting to parse JSON...");
  try {
    const data = JSON.parse(jsonString);
    console.log("Successfully parsed JSON.");
    return data;
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    if (error instanceof SyntaxError) {
      const position = (error as any).at; // Position of the error
      if (typeof position === 'number') {
        const contextRange = 20; // Characters before/after
        const start = Math.max(0, position - contextRange);
        const end = Math.min(jsonString.length, position + contextRange);
        const errorSnippet = jsonString.substring(start, end);
        const indicator = " ".repeat(position - start) + "^-- Error here";

        console.error(\`Syntax Error at position \${position}:\`);
        console.error(\`Snippet: \${errorSnippet}\`);
        console.error(\`         \${indicator}\`);
      }
    }
    return null;
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Blocks className="w-6 h-6 mr-2 text-orange-500" />
          Validating JSON Structure and Data Types
        </h3>
        <p>
          Even if JSON is syntactically correct, its structure or data types might not match your expectations. While
          not strictly &quot;parsing&quot; debugging, validating the parsed data is a common next step where issues are
          found.
        </p>
        <p>
          JSON Schema is a powerful tool for defining the expected structure of JSON data. You can use validation
          libraries (like <code>ajv</code> or <code>zod</code> - mentioned conceptually, no import needed) after parsing
          to check if the resulting JavaScript object conforms to a predefined schema. Errors from these validators are
          often much more descriptive than a generic parse error, pointing to specific fields or types that are
          incorrect.
        </p>
        <p>
          Alternatively, simple runtime checks on the parsed object can help:
          <code>if (typeof data.userId !== &apos;number&apos;) &#123; /* handle error */ &#125;</code>
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <View className="w-6 h-6 mr-2 text-teal-500" />
          Visualizing JSON Data
        </h3>
        <p>
          For complex or large JSON payloads, viewing the raw string is difficult. Dedicated JSON viewer or formatter
          tools (online or desktop) can pretty-print the JSON, collapse/expand sections, and highlight syntax, making it
          much easier to inspect the structure and identify unexpected data. Integrating such a visualization step into
          a debugging workflow is highly effective.
        </p>
        <p>
          If you&apos;re building a frontend tool, a collapsible tree view of the parsed JSON object is a great
          debugging feature.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Diff className="w-6 h-6 mr-2 text-red-500" />
          Comparing JSON Payloads (Diffing)
        </h3>
        <p>
          Sometimes the issue isn&apos;t that JSON parsing fails entirely, but that the parsed data leads to incorrect
          application behavior. This can happen when the JSON structure subtly changes between different versions of an
          API or different responses.
        </p>
        <p>
          Using a JSON diff tool can highlight exactly what has changed between a &quot;good&quot; JSON payload and a
          &quot;bad&quot; one, making it easy to spot missing fields, altered types, or value changes. Online JSON diff
          tools or libraries (like <code>json-diff</code>) are useful here.
        </p>

        <h3 className="text-xl font-semibold mt-6">Handling Large JSON Payloads</h3>
        <p>
          Parsing very large JSON files synchronously can freeze your application. While standard{" "}
          <code>JSON.parse</code>
          handles many cases, extremely large files might require streaming parsers that process the JSON bit by bit
          without loading the entire structure into memory at once. Debugging issues in streamed JSON requires tools
          that work with chunks or events rather than the whole string. Logging chunks or specific events in the stream
          becomes the debugging technique here.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Building Your Own Helper Functions</h2>
        <p>
          Encapsulating the debugging techniques discussed above into reusable helper functions or a dedicated
          &quot;safe parse&quot; utility can make them easily accessible throughout your codebase. Consider creating a
          function like:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example Debugging Helper:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`interface ParseOptions {
  logInput?: boolean;
  logSuccess?: boolean;
  contextRange?: number; // Characters for error snippet
}

function safeJsonParse(
  jsonString: string,
  options: ParseOptions = &#x7b; logInput: true, contextRange: 40 &#x7d;
): any | null {
  if (options.logInput) {
    console.log("Attempting to parse JSON string:", jsonString);
  }

  try {
    const data = JSON.parse(jsonString);
    if (options.logSuccess) {
      console.log("JSON parsed successfully.");
      // Optional: console.log("Parsed data:", data); // Be cautious with large outputs
    }
    return data;
  } catch (error) {
    console.error("JSON parsing failed:", error);

    if (error instanceof SyntaxError && typeof (error as any).at === 'number') {
        const position = (error as any).at;
        const range = options.contextRange ?? 20;
        const start = Math.max(0, position - range);
        const end = Math.min(jsonString.length, position + range);
        const errorSnippet = jsonString.substring(start, end);
        const indicator = " ".repeat(position - start) + "^-- Error near here";

        console.error(\`Syntax Error location: Position \${position}\`);
        console.error(\`Snippet:\`);
        console.error(errorSnippet);
        console.error(indicator);
    } else {
        // Log the whole string if context extraction failed or it's not a SyntaxError
        console.error("Failed JSON string:", jsonString);
    }

    return null; // Return null or throw a custom error
  }
}

// Usage Example:
// const validJson = '{"name":"Test","value":123}';
// const invalidJson = '{"name":"Test",}'; // Trailing comma
// const data1 = safeJsonParse(validJson); // Logs input, parses
// const data2 = safeJsonParse(invalidJson); // Logs input, catches error, shows snippet
`}
            </pre>
          </div>
        </div>
        <p>
          This kind of helper abstracts away the repetitive try/catch and logging logic, making your parsing code
          cleaner and automatically providing better debug information when errors occur.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Debugging JSON parsing doesn&apos;t have to be a painful process. By leveraging basic
          <code>try...catch</code> blocks and <code>console.log</code>, and then enhancing these with more detailed
          error reporting, input logging, and potentially external validation or visualization tools, developers of any
          level can quickly pinpoint the root cause of parsing failures. Building simple helper functions to encapsulate
          these techniques ensures consistency and efficiency across projects, turning parsing errors from mysteries
          into easily diagnosable problems.
        </p>
      </div>
    </div>
  );
}
