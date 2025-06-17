import type { Metadata } from "next";
import { Book, Code, CheckCircle, LayoutList, Indent, FileJson, UserCog, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "E-learning Platform Development & JSON Formatters",
  description: "Exploring the role of JSON and the utility of JSON formatters in building modern e-learning platforms.",
};

export default function ElearningJsonFormattersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
        E-learning Platform Development and JSON Formatters
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Book className="w-6 h-6 mr-2 text-green-600" />
            The Digital Classroom: Data is Key
          </h2>
          <p>
            Modern e-learning platforms are complex systems that handle vast amounts of structured data. From course
            content and user profiles to quiz questions, progress tracking, and interaction logs, effectively managing
            this data is crucial for delivering a high-quality learning experience.
          </p>
          <p>
            Choosing the right data format is a fundamental decision in platform development. It impacts storage,
            transmission (especially via APIs), and how easily developers and even content creators can work with the
            data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <FileJson className="w-6 h-6 mr-2 text-purple-600" />
            JSON: The Lingua Franca of Web Data
          </h2>
          <p>
            <a
              href="https://www.json.org/json-en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              JSON (JavaScript Object Notation)
            </a>{" "}
            has become the de facto standard for data interchange on the web, and its strengths make it an excellent fit
            for many aspects of e-learning platforms:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Human-Readable:</strong> Relatively easy for developers (and sometimes technical content creators)
              to read and write.
            </li>
            <li>
              <strong>Machine-Readable:</strong> Easily parsed by virtually any programming language.
            </li>
            <li>
              <strong>Hierarchical Structure:</strong> Naturally represents nested data structures common in e-learning
              (e.g., a course containing modules, modules containing lessons, lessons containing steps).
            </li>
            <li>
              <strong>Lightweight:</strong> Less verbose than formats like XML.
            </li>
          </ul>
          <p>Consider how course content, quiz data, or user settings might be represented:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Quiz Question in JSON</h3>
            <pre>
              {`{
  "id": "q123",
  "type": "multiple-choice",
  "questionText": "What does JSON stand for?",
  "options": [
    {
      "text": "JavaScript Object Notation",
      "isCorrect": true
    },
    {
      "text": "JavaScript Oriented Notation",
      "isCorrect": false
    },
    {
      "text": "Joint Syntax Object Notation",
      "isCorrect": false
    }
  ],
  "explanation": "JSON is an acronym for JavaScript Object Notation."
}`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Indent className="w-6 h-6 mr-2 text-orange-600" />
            The Need for JSON Formatters
          </h2>
          <p>
            While JSON is human-readable, raw JSON data can sometimes be dense, especially when it's minified
            (whitespace removed) or deeply nested. This is where JSON formatters (also known as beautifiers or
            pretty-printers) become invaluable tools in the development workflow.
          </p>
          <p>In the context of e-learning platform development, JSON formatters are useful for:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Debugging:</span> When logging JSON data on the backend or inspecting API
              responses, a formatted output is vastly easier to read and understand than a single line of minified text.
            </li>
            <li>
              <span className="font-medium">Configuration:</span> If parts of the e-learning platform's behavior or
              content are defined in JSON configuration files (e.g., grading rules, content structure), a formatter
              helps ensure these files are well-maintained and readable.
            </li>
            <li>
              <span className="font-medium">API Development/Testing:</span> Clearly seeing the structure and values of
              JSON payloads sent to or received from APIs is critical during integration and testing.
            </li>
            <li>
              <span className="font-medium">Admin/Developer Interfaces:</span> Building internal tools where
              administrators or content managers might need to view or edit JSON data requires a way to display it
              cleanly.
            </li>
            <li>
              <span className="font-medium">Validation:</span> While primarily for formatting, the process often
              involves parsing, which inherently validates the JSON structure. An invalid JSON string will fail parsing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-teal-600" />
            How JSON Formatting Works (Conceptually)
          </h2>
          <p>A JSON formatter typically performs two main steps:</p>
          <ol className="list-decimal pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Parsing:</span> The raw JSON string is parsed into an in-memory
              representation (like a JavaScript object or array). This step checks for syntax errors. If the JSON is
              invalid, the parser will throw an error.
            </li>
            <li>
              <span className="font-medium">Serialization (with Indentation):</span> The in-memory structure is then
              converted back into a JSON string, but this time with added whitespace (indentation and newlines) to make
              the hierarchy clear.
            </li>
          </ol>
          <p>
            In JavaScript/TypeScript, the built-in <code>JSON</code> object provides the necessary methods:
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Basic Formatting Example (Conceptual JS/TS)</h3>
            <pre>
              {`// Assume this is a minified JSON string received from an API or read from a log
const minifiedJson = '{"name":"Module 1","lessons":[{"title":"Intro"},{"title":"Topic A"}]}';

let formattedJson = '';
let parsedData = null;
let errorMessage = '';

try {
  // Step 1: Parse the string into a JS object
  parsedData = JSON.parse(minifiedJson);

  // Step 2: Stringify the object with indentation
  // The third argument (e.g., 2) specifies the number of spaces for indentation
  formattedJson = JSON.stringify(parsedData, null, 2);

  console.log("Original (Minified):", minifiedJson);
  console.log("Formatted:", formattedJson);
  // Output of formattedJson would look like:
  // {
  //   "name": "Module 1",
  //   "lessons": [
  //     {
  //       "title": "Intro"
  //     },
  //     {
  //       "title": "Topic A"
  //     }
  //   ]
  // }

} catch (error: any) {
  // Handle parsing errors (invalid JSON)
  errorMessage = \`JSON Parsing Error: \${error.message}\`;
  console.error(errorMessage);
  // In a UI, you would display this error message to the user
}

// In a React/Next.js component (without state), you would pre-process
// the JSON string *before* rendering, likely in getServerSideProps
// or a backend API route if handling user input.
// The 'formattedJson' or 'errorMessage' variables would hold the
// result to be displayed.
`}
            </pre>
          </div>
          <p className="flex items-center italic text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold mr-1">Note:</span> This example demonstrates the core JS/TS logic. In a real
            application page rendering this, the parsing and stringifying would happen in a server-side function (like{" "}
            <code>getServerSideProps</code> or directly in the component if the data is static/imported) or a backend
            API route before the result is passed to the component for rendering.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <UserCog className="w-6 h-6 mr-2 text-indigo-600" />
            Implementing a Formatter in a Development Context (Server-Side)
          </h2>
          <p>
            Since this page is designed for a Next.js backend context without client-side state or interactivity, we
            focus on the server-side utility of formatting.
          </p>
          <p>On the server, you might format JSON for:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Generating readable log outputs:</span> Instead of logging{" "}
              <code>{"{...}"}</code>, log <code>{`JSON.stringify(data, null, 2)`}</code>.
            </li>
            <li>
              <span className="font-medium">Preparing data for storage:</span> While databases might store minified
              JSON, sometimes storing formatted versions (e.g., in a file) for easier manual inspection is useful.
            </li>
            <li>
              <span className="font-medium">Constructing readable API responses:</span> For debugging endpoints or
              specific API versions, you might return formatted JSON.
            </li>
            <li>
              <span className="font-medium">Processing uploaded JSON files:</span> If users upload JSON (e.g., bulk
              course item uploads), you can parse and re-format it on the server for validation feedback or display.
            </li>
          </ul>
          <p>
            The core logic remains <code>JSON.parse</code> followed by <code>JSON.stringify(..., null, 2)</code> (or
            another indentation level). Error handling around <code>JSON.parse</code> is crucial.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Server-Side JSON Processing Sketch</h3>
            <pre>
              {`// Conceptual code in a Next.js API route or getServerSideProps

interface ProcessedJsonResult {
  formatted?: string;
  error?: string;
}

function processAndFormatJson(inputJsonString: string): ProcessedJsonResult {
  try {
    // Attempt to parse the JSON string
    const parsedData = JSON.parse(inputJsonString);

    // If parsing succeeds, format it with 2 spaces indentation
    const formattedString = JSON.stringify(parsedData, null, 2);

    return { formatted: formattedString };

  } catch (error: any) {
    // If parsing fails, return an error message
    return { error: \`Invalid JSON input: \${error.message}\` };
  }
}

// Example Usage (e.g., in an API route handler)
// Assume 'requestBodyString' is the raw string received in the request body
// const requestBodyString = '{"key": "value", "list":[1,2,3]}'; // Or potentially invalid json: '{key: value}'

// const result = processAndFormatJson(requestBodyString);

// if (result.error) {
//   console.error("Failed to process JSON:", result.error);
//   // In an API route, send a 400 response with the error
//   // res.status(400).json({ message: result.error });
// } else if (result.formatted) {
//   console.log("Successfully formatted JSON:\\n", result.formatted);
//   // In an API route, send a 200 response with the formatted JSON
//   // res.status(200).json({ formattedJson: result.formatted });
// }

// In a server-side rendered page, you might call this function
// with static JSON or JSON loaded from a file/database
// and pass the result to the component props.
`}
            </pre>
          </div>
          <p>
            This function encapsulates the core formatting and validation logic reusable on the server. The frontend
            component receiving the <code>formatted</code> string or <code>error</code> message via props would then
            simply render it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <LayoutList className="w-6 h-6 mr-2 text-blue-600" />
            Beyond Basic Formatting
          </h2>
          <p>
            While <code>JSON.stringify(..., null, 2)</code> provides basic indentation, advanced formatters (often
            client-side due to interactivity needs, but the concepts apply) offer more features:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Syntax Highlighting:</span> Color-coding keys, values (strings, numbers,
              booleans, null), brackets, and commas for better readability. This requires tokenizing the formatted
              string.
            </li>
            <li>
              <span className="font-medium">Collapsible Sections:</span> Allowing users to collapse objects or arrays to
              navigate large structures easily. This is fundamentally an interactive (client-side) feature.
            </li>
            <li>
              <span className="font-medium">Line Numbers:</span> Adding line numbers for easier referencing, especially
              with error messages.
            </li>
            <li>
              <span className="font-medium">Error Indication:</span> Visually marking the exact location of a parsing
              error in the input string.
            </li>
          </ul>
          <p>
            Building these advanced features requires more than just <code>JSON.parse</code> and{" "}
            <code>JSON.stringify</code>; it typically involves more complex parsing logic, potentially a custom
            tokenizer, and careful rendering (often involving multiple nested components or iterating over the parsed
            data structure). However, the foundation always starts with successfully turning the string into a usable
            data structure via parsing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            Conclusion
          </h2>
          <p>
            JSON is a vital data format in the development of e-learning platforms, used across content, user data,
            configuration, and APIs. While inherently readable, raw or minified JSON can be challenging to work with
            directly.
          </p>
          <p>
            JSON formatters are essential developer tools that improve readability and aid debugging and validation by
            pretty-printing JSON strings. Understanding how they work involves grasping the fundamental concepts of
            parsing (converting string to structure) and serialization (converting structure back to string), leveraging
            built-in language features like <code>JSON.parse</code> and <code>JSON.stringify</code>.
          </p>
          <p>
            Integrating formatting capabilities, even simple ones using standard libraries on the backend, significantly
            enhances the development and maintenance workflow for data-intensive applications like e-learning platforms.
          </p>
        </section>
      </div>
    </>
  );
}
