import type { Metadata } from "next";
import React from "react";
import { AlertTriangle, CheckCircle, Info, Code } from "lucide-react"; // Import icons

export const metadata: Metadata = {
  title: "JSON Formatter Error Handling: Comparative Approaches | Offline Tools",
  description:
    "Explore different strategies for handling errors when formatting or parsing JSON, including try-catch, validation, and detailed reporting.",
};

export default function JsonFormatterErrorHandlingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <AlertTriangle className="mr-3 text-red-500" size={30} /> JSON Formatter Error Handling: Comparative Approaches
      </h1>

      <div className="space-y-6">
        <p>
          Working with JSON is ubiquitous in web development, data exchange, and configuration. Whether you're building
          an API, saving user settings, or processing external data, you'll inevitably encounter situations where the
          JSON data is invalid or malformed. A robust JSON formatter or parser isn't just about transforming text; it's
          fundamentally about handling potential errors gracefully.
        </p>
        <p>
          This article explores different approaches to error handling when processing JSON, comparing their strengths,
          weaknesses, and ideal use cases. We'll look at techniques suitable for simple client-side formatters up to
          more complex backend validation scenarios.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="mr-2 text-blue-500" /> Why Handle JSON Errors?
        </h2>
        <p>
          Invalid JSON can break your application. Trying to parse malformed data will typically throw an error, which
          if not caught, can crash scripts, leave users with a blank screen, or worse, lead to unexpected behavior.
          Proper error handling allows you to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Prevent application crashes.</li>
          <li>
            Provide meaningful feedback to the user or calling system (e.g., "Invalid JSON syntax", "Missing required
            field 'username'").
          </li>
          <li>Log errors for debugging and monitoring.</li>
          <li>Attempt error recovery or fallback strategies.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-600" /> Common Types of JSON Errors
        </h2>
        <p>Errors in JSON processing typically fall into a few categories:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Syntax Errors:</strong> Violations of the strict JSON grammar. Examples:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>
                Trailing commas (e.g., <code>[1, 2, ]</code>)
              </li>
              <li>
                Unquoted property names (e.g., <code>{`name: "Alice"`}</code>)
              </li>
              <li>
                Single quotes instead of double quotes (e.g., <code>{`{'name': 'Bob'}`}</code>)
              </li>
              <li>Missing commas between items or properties.</li>
              <li>Invalid escape sequences in strings.</li>
            </ul>
          </li>
          <li>
            <strong>Structural Errors:</strong> While syntactically correct, the data structure isn't what the
            application expects. These often involve missing keys, incorrect data types for values, or unexpected
            nesting.
          </li>
          <li>
            <strong>Semantic Errors:</strong> The data is syntactically and structurally valid, but the values
            themselves are invalid in the context of the application (e.g., a negative age, an invalid email format in a
            string field). While not strictly a "JSON parsing" error, robust processing pipelines often handle these
            here.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" /> Approach 1: Basic Try...Catch Parsing
        </h2>
        <p>
          This is the simplest and most common method for catching syntax errors during the parsing phase. The built-in{" "}
          <code>JSON.parse()</code> method in JavaScript (and its equivalents in most languages) throws an error if the
          input string is not valid JSON.
        </p>
        <h3 className="text-xl font-semibold mt-6">How it works:</h3>
        <p>
          Wrap the call to <code>JSON.parse()</code> within a <code>try...catch</code> block. If{" "}
          <code>JSON.parse()</code> fails due to a syntax error, the code in the <code>catch</code> block is executed.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 text-blue-500" /> Example (TypeScript/React):
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-typescript">
              {`import React, { useState } from 'react';

interface JsonParseResult {
  data: any | null;
  error: string | null;
}

function safeJsonParse(jsonString: string): JsonParseResult {
  try {
    const data = JSON.parse(jsonString);
    return { data, error: null };
  } catch (e: any) {
    // e.message often contains useful info about the error location
    return { data: null, error: \`Parsing Error: \${e.message}\` };
  }
}

// Example usage in a React component:
const JsonInputParser: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setJsonInput(value);

    // Attempt to parse whenever the input changes
    const { data, error } = safeJsonParse(value);

    setParsedData(data);
    setError(error);
  };

  return (
    <div>
      <label htmlFor="jsonInput" className="sr-only">Enter JSON</label>
      <textarea
        id="jsonInput"
        className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        rows={10}
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON string here, e.g., {"name": "Alice"}'
      />
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded dark:bg-red-900 dark:text-red-300">
          <AlertTriangle className="inline mr-2" size={16} /> {error}
        </div>
      )}
      {parsedData !== null && !error && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded dark:bg-green-900 dark:text-green-300">
          <CheckCircle className="inline mr-2" size={16} /> JSON is valid and parsed successfully:
          <pre className="mt-2 bg-green-50 p-2 rounded text-green-800 dark:bg-green-800 dark:text-green-200 overflow-x-auto">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
      {!parsedData && !error && jsonInput.trim() !== '' && (
         <div className="mt-4 p-3 bg-blue-100 text-blue-700 border border-blue-400 rounded dark:bg-blue-900 dark:text-blue-300">
            <Info className="inline mr-2" size={16} /> Enter JSON to see parsing result.
         </div>
      )}
    </div>
  );
};`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Simple to implement.
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Catches all fundamental JSON syntax errors.
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Uses built-in, highly optimized
            functionality.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Provides limited detail about the error
            location (though browser implementations often include line/column).
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Only handles syntax errors during parsing;
            does not validate the structure or semantics against expectations.
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Stops at the first error encountered.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" /> Approach 2: Pre-Parsing Validation (e.g., Schema Validation)
        </h2>
        <p>
          This approach involves checking the structure and/or data types of the JSON <em>after</em> it has been
          successfully parsed, but <em>before</em> your application logic attempts to use it. Schema validation
          libraries (like Zod, Yup, Joi in JavaScript/TypeScript, or JSON Schema implementations) are common tools for
          this.
        </p>
        <p>
          Sometimes, simpler pre-parsing checks like regular expressions or checking for the existence of a root
          object/array might be used, although these are much less robust than schema validation.
        </p>
        <h3 className="text-xl font-semibold mt-6">How it works:</h3>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            First, use <code>try...catch</code> with <code>JSON.parse()</code> to handle basic syntax errors (as in
            Approach 1).
          </li>
          <li>
            If parsing is successful, pass the resulting JavaScript object/array to a validation function or library.
          </li>
          <li>The validation logic checks if the data conforms to a predefined structure (schema).</li>
          <li>
            If validation fails, it returns an error (often with details about which part of the structure is invalid).
            If it passes, you can safely use the data.
          </li>
        </ol>
        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 text-blue-500" /> Conceptual Example (using a hypothetical schema validation library):
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-typescript">
              {`// Assume 'mySchema' is defined using a library like Zod or Yup
// Example Schema: Expects an object with a 'name' (string) and 'age' (number)

// using Zod for example:
// import { z } from 'zod';
// const mySchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   age: z.number().int().positive("Age must be a positive integer"),
//   isStudent: z.boolean().optional() // Optional boolean
// });
// type MyDataType = z.infer<typeof mySchema>; // Infer type from schema

interface JsonValidateResult<T> {
  data: T | null;
  errors: string[] | null; // Return multiple errors if validation library supports it
}

function safeJsonParseAndValidate<T>(jsonString: string, schema: any): JsonValidateResult<T> {
  let parsedData: any;
  try {
    parsedData = JSON.parse(jsonString);
  } catch (e: any) {
    return { data: null, errors: [\`Parsing Error: \${e.message}\`] };
  }

  // Now validate the parsed data against the schema
  const validationResult = schema.safeParse(parsedData); // safeParse is common pattern

  if (validationResult.success) {
    return { data: validationResult.data as T, errors: null };
  } else {
    // Extract error details from the validation result
    // This part is highly dependent on the validation library
    const errorMessages = validationResult.error.errors.map((err: any) =>
       \`Invalid data at '\${err.path.join('.') || '/'}: \${err.message}\`
    );
    return { data: null, errors: errorMessages };
  }
}

// Example Usage (requires a schema definition and a validation library):
/*
const invalidJsonString = '{"name": "Alice", "age": "thirty"}'; // age should be a number

const { data, errors } = safeJsonParseAndValidate(invalidJsonString, mySchema);

if (errors) {
  console.error("Validation failed:");
  errors.forEach(err => console.error(err));
  // Output might look like:
  // Validation failed:
  // Invalid data at 'age': Expected number, received string
} else {
  console.log("Data is valid:", data);
}

const validJsonString = '{"name": "Bob", "age": 25, "isStudent": true}';
const { data: validData, errors: validErrors } = safeJsonParseAndValidate(validJsonString, mySchema);

if (validErrors) {
    console.error("This shouldn't happen for valid data!", validErrors);
} else {
    console.log("Valid data parsed and validated:", validData); // { name: 'Bob', age: 25, isStudent: true }
}
*/`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Validates both syntax (via the initial
            parse) and structural/data type correctness.
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Provides more specific error messages,
            often including the path to the invalid data point.
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Can enforce complex rules beyond basic
            types (e.g., string formats, number ranges, required fields).
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Can often report multiple validation errors
            at once.
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Helps define expected data structures
            clearly.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Requires defining and maintaining a schema.
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Adds an extra step and potentially a
            dependency (a validation library).
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Validation errors occur <em>after</em>{" "}
            parsing, so you still need to handle initial syntax errors with try/catch.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" /> Approach 3: Custom Parsing with Detailed Error Reporting
        </h2>
        <p>
          For scenarios requiring highly detailed error reporting, highlighting specific locations (line number, column
          number, exact character position) within the original JSON string, or needing custom error recovery
          strategies, building a custom parser or using a library that provides this level of detail is necessary.
        </p>
        <p>
          Standard <code>JSON.parse()</code> error messages vary by engine and often lack precise location information
          needed for rich user interfaces (like highlighting the error in a text editor).
        </p>
        <h3 className="text-xl font-semibold mt-6">How it works:</h3>
        <p>
          This involves implementing a parser (often tokenizing the input first, then parsing the token stream) that
          tracks its position within the input string/token stream as it processes the JSON. When an unexpected token or
          structure is encountered, the parser throws a custom error object that includes the current position (line,
          column, index).
        </p>
        <p>
          Libraries like{" "}
          <a
            href="https://github.com/chevrotain/chevrotain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Chevrotain
          </a>{" "}
          or implementing a parser using techniques like Recursive Descent or LL(k) parsing allow for this fine-grained
          control.
        </p>
        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 text-blue-500" /> Conceptual Example (showing error object structure):
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-typescript">
              {`// Hypothetical custom parser function
interface JsonErrorLocation {
  line: number;
  column: number;
  offset: number; // Character index from the start
}

interface CustomJsonError extends Error {
  name: 'JsonSyntaxError';
  location: JsonErrorLocation;
  details?: string; // More specific info
}

// This function would contain the parsing logic
function parseJsonDetailed(jsonString: string): any {
  // ... tokenizer and parsing logic that tracks position ...

  // When an error is detected, instead of just 'throw new Error(...)', throw:
  // Example: if a comma is expected but a closing brace is found
  const detectedLocation: JsonErrorLocation = { line: 5, column: 10, offset: 125 }; // Get this from parser state
  const error: CustomJsonError = new Error("Expected ',' or '}'") as CustomJsonError;
  error.name = 'JsonSyntaxError';
  error.location = detectedLocation;
  error.details = 'Unexpected token: }';

  // For demonstration, simulate throwing the error
  // throw error;

  // ... if parsing is successful ...
  // return parsedData;
  return { /* some parsed data if successful */ }; // Placeholder return
}

// Example usage:
/*
const jsonStringWithError = \`{
  "name": "Alice",
  "items": [
    1, 2,
    4 // Missing comma here!
  ]
}\`;

try {
  const data = parseJsonDetailed(jsonStringWithError);
  console.log("Parsed data:", data);
} catch (e: any) { // Catch the custom error type
  if (e.name === 'JsonSyntaxError') {
    const customError = e as CustomJsonError;
    console.error(\`JSON Syntax Error at Line \${customError.location.line}, Column \${customError.location.column}:\`);
    console.error(customError.message);
    // You could use location.offset to highlight the error in a UI
  } else {
    console.error("An unexpected error occurred:", e.message);
  }
}
*/`}
            </code>
          </pre>
        </div>
        <p>
          While implementing a full JSON parser from scratch is non-trivial, libraries like Chevrotain simplify this by
          providing parser building tools that handle tokenization and parsing structure while allowing you to define
          grammar rules and error handling hooks.
        </p>

        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Provides the most detailed error
            information, including exact location (line, column, offset).
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Allows for sophisticated error reporting
            and potentially error recovery (e.g., attempting to parse the rest of the document after a minor error).
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Can be integrated deeply into tools like
            code editors for real-time linting and error highlighting.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Significantly more complex to implement or
            requires using a parser generator library.
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Overkill for most basic JSON processing
            needs.
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Still doesn't automatically handle
            structural/semantic validation (Approach 2 is typically combined with this if needed).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" /> Approach 4: Streaming Parsers
        </h2>
        <p>
          For extremely large JSON files (too large to fit into memory) or when processing data streams, streaming
          parsers are used. These parsers read the input character by character or token by token and emit events as
          they encounter different parts of the JSON structure (start object, end object, key, value, etc.).
        </p>
        <h3 className="text-xl font-semibold mt-6">How it works:</h3>
        <p>
          Streaming parsers handle errors incrementally. If invalid syntax is encountered, the parser emits an error
          event or throws an error at that point in the stream, rather than waiting for the entire document to be
          processed. Libraries like <code>jsonstream</code> or <code>clarinet</code> in Node.js are examples.
        </p>
        <h3 className="text-xl font-semibold mt-6">Pros:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Efficient for large datasets as they don't
            load everything into memory.
          </li>
          <li>
            <CheckCircle className="inline mr-2 text-green-600" size={16} /> Errors are reported as they are encountered
            in the stream.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cons:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> The programming model is more complex
            (event-driven) compared to simple <code>JSON.parse()</code>.
          </li>
          <li>
            <AlertTriangle className="inline mr-2 text-red-500" size={16} /> Handling structural/semantic validation
            still requires additional logic layered on top of the streaming events.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="mr-2 text-blue-500" /> Which Approach to Choose?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>For most web applications and simple tasks:</strong> Start with{" "}
            <strong>Approach 1 (Basic Try...Catch)</strong>. It catches the fundamental errors that would crash{" "}
            <code>JSON.parse()</code> and is sufficient if your application can tolerate unexpected structures or relies
            on optional data.
          </li>
          <li>
            <strong>When you need to ensure data structure integrity:</strong> Combine{" "}
            <strong>Approach 1 (Try...Catch)</strong> with <strong>Approach 2 (Schema Validation)</strong>. This is
            crucial for APIs, data ingestion, or any scenario where the application expects a specific JSON format.
          </li>
          <li>
            <strong>For building developer tools (formatters, linters, editors):</strong> Consider{" "}
            <strong>Approach 3 (Custom Parsing with Detailed Reporting)</strong> or use a library that provides it. The
            ability to show the user exactly where the error is located is paramount in these tools.
          </li>
          <li>
            <strong>For processing very large JSON files or data pipelines:</strong> Use{" "}
            <strong>Approach 4 (Streaming Parsers)</strong> combined with validation logic built upon the stream events.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-600" /> Best Practices for JSON Error Handling
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Always Catch Parsing Errors:</strong> Never assume JSON input is valid. Always wrap{" "}
            <code>JSON.parse()</code> or your parsing logic in a try-catch.
          </li>
          <li>
            <strong>Validate Structure and Types:</strong> Beyond syntax, validate that the parsed data matches the
            expected structure and types, especially for external or user-provided data. Schema validation is highly
            recommended.
          </li>
          <li>
            <strong>Provide Clear Feedback:</strong> When an error occurs, provide informative error messages to the
            user or log detailed information for debugging. Include the type of error (syntax, validation, etc.) and, if
            possible, the location or specific issue.
          </li>
          <li>
            <strong>Log Errors:</strong> Ensure errors are logged server-side or reported in client-side analytics for
            monitoring and diagnosing issues.
          </li>
          <li>
            <strong>Don't Trust Client-Side Input:</strong> Always re-validate JSON received from the client on the
            server, even if it was validated client-side.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="mr-2 text-blue-500" /> Conclusion
        </h2>
        <p>
          Effective JSON error handling is a layered process. While a basic <code>try...catch</code> around{" "}
          <code>JSON.parse()</code> is the minimum requirement to prevent crashes, robust applications often need to
          combine this with schema validation to ensure the data is not just syntactically correct but also structurally
          and semantically meaningful. For tools and large-scale processing, more advanced techniques like custom
          parsers with detailed reporting or streaming parsers become necessary. By understanding these different
          approaches and their trade-offs, you can build more resilient and user-friendly applications that handle the
          messy reality of real-world data.
        </p>
      </div>
    </>
  );
}
