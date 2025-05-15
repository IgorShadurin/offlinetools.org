import type { Metadata } from "next";
import { Code, Bug, Server, Eye, BookOpen, Inspect } from "lucide-react"; // Replaced 'Api' with 'Server'

export const metadata: Metadata = {
  title: "Using JSON Formatters in Educational Environments | Tools & Techniques",
  description:
    "Explore how JSON formatters can be valuable tools for teaching and learning about data structures, APIs, and debugging in educational settings.",
};

// Dummy JSON data for examples - kept simple
const simpleJson = {
  name: "Student A",
  id: 101,
  courses: ["Math", "Science"],
  isActive: true,
};

const complexJson = {
  reportTitle: "Student Performance Summary",
  studentId: 205,
  gradingPeriod: "Fall 2023",
  grades: [
    {
      course: "History",
      grade: "A",
      credits: 3,
      instructor: {
        name: "Dr. Smith",
        department: "Humanities",
      },
    },
    {
      course: "Physics",
      grade: "B+",
      credits: 4,
      instructor: {
        name: "Prof. Johnson",
        department: "Science",
      },
    },
    {
      course: "Literature",
      grade: "A-",
      credits: 3,
      instructor: {
        name: "Dr. Williams",
        department: "Humanities",
      },
    },
  ],
  summary: {
    gpa: 3.75,
    totalCredits: 10,
    notes: null,
  },
  timestamp: "2024-01-15T10:00:00Z",
  isEnabled: false,
};

export default function JsonFormattersInEducationPage() {
  // Server components don't need useState or client directives.
  // We can format the dummy data directly here.
  const simpleJsonFormatted = JSON.stringify(simpleJson, null, 2);
  const complexJsonFormatted = JSON.stringify(complexJson, null, 2);
  const simpleJsonRaw = JSON.stringify(simpleJson); // Compact version

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Using JSON Formatters in Educational Environments
      </h1>

      <section className="space-y-6">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          In the world of data exchange and web development,{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            JSON
          </code>{" "}
          (JavaScript Object Notation) is ubiquitous. Its simple, human-readable structure makes
          it ideal for configuration files, API responses, and data storage. However, real-world
          JSON data can often be complex, deeply nested, and difficult to read in its raw,
          unformatted state. This is where{" "}
          <strong>JSON formatters</strong> become invaluable tools, especially in educational
          settings where clarity and understanding are paramount.
        </p>

        <div className="flex items-center space-x-3 text-2xl font-semibold mt-8 mb-4">
          <Inspect className="w-7 h-7 text-blue-500" />
          <h2>What are JSON Formatters?</h2>
        </div>
        <p>
          A JSON formatter is a tool or function that takes raw JSON text and restructures it
          into a more human-readable format. Typically, this involves:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Indentation:</strong> Adding whitespace (spaces or tabs) to visually
            represent the nested structure of objects and arrays.
          </li>
          <li>
            <strong>Line Breaks:</strong> Placing each key-value pair in an object and each
            element in an array on its own line (or a manageable set of lines).
          </li>
          <li>
            <strong>Syntax Highlighting:</strong> Using different colors or styles for keys,
            values (strings, numbers, booleans), brackets, and commas.
          </li>
        </ul>
        <p>
          Consider this simple JSON data in its compact form:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800">
          <pre>{simpleJsonRaw}</pre>
        </div>
        <p>
          And here it is after formatting with indentation:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800">
          <pre>{simpleJsonFormatted}</pre>
        </div>
        <p>
          The difference in readability is significant, especially for larger or more complex structures.
        </p>

        <div className="flex items-center space-x-3 text-2xl font-semibold mt-8 mb-4">
          <BookOpen className="w-7 h-7 text-green-500" />
          <h2>Why They Are Useful in Educational Environments</h2>
        </div>
        <p>
          For students learning programming, data structures, or web development, dealing with
          JSON is inevitable. Formatters serve as valuable pedagogical aids in several ways:
        </p>

        <h3 className="flex items-center space-x-2 text-xl font-semibold mt-6 mb-3">
          <Code className="w-5 h-5 text-yellow-600" /> Understanding Structure
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Raw JSON can be a single, long line of text. Formatting reveals the hierarchy – which
          objects contain which keys, which arrays contain which elements, and how deeply nested
          data goes. This visual representation directly helps students grasp the tree-like
          structure of JSON data, making concepts like nested objects or arrays much clearer.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800">
          <p className="font-semibold mb-2">Formatted Complex JSON Example:</p>
          <pre>{complexJsonFormatted}</pre>
        </div>
        <p>
          Seeing this structured view helps students trace paths to specific data points, like
          finding "Dr. Smith"'s department or the student's GPA.
        </p>

        <h3 className="flex items-center space-x-2 text-xl font-semibold mt-6 mb-3">
          <Bug className="w-5 h-5 text-red-500" /> Debugging and Error Detection
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          JSON is a strict format. A missing comma, an unescaped quote, or a misplaced bracket
          can render the entire document invalid. Formatters often include validation features
          that highlight syntax errors, pointing students directly to the problem areas. Debugging
          API responses or configuration files becomes significantly easier when the structure is
          clear and errors are flagged.
        </p>

        <h3 className="flex items-center space-x-2 text-xl font-semibold mt-6 mb-3">
          <Server className="w-5 h-5 text-purple-500" /> Working with APIs
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          When students learn to interact with web APIs, they will receive responses typically
          formatted as JSON. These responses can be large and complex. A formatter is essential
          for making sense of the data received, allowing students to identify the data fields
          they need to extract and process in their applications. It's the first step in
          understanding the API's data contract.
        </p>

        <h3 className="flex items-center space-x-2 text-xl font-semibold mt-6 mb-3">
          <Eye className="w-5 h-5 text-blue-500" /> Visualization and Exploration
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Some advanced formatters offer features beyond just indentation, such as collapsible
          nodes. This allows students to collapse large sections of JSON they aren't currently
          interested in, focusing only on the relevant parts. This interactive exploration helps
          manage complexity and build mental models of large data structures.
        </p>

        <h3 className="flex items-center space-x-2 text-xl font-semibold mt-6 mb-3">
          <BookOpen className="w-5 h-5 text-green-500" /> Illustrating Serialization/Deserialization
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          Formatters implicitly demonstrate the concept of serialization (converting an in-memory
          data structure into a transportable format like JSON text) and deserialization
          (parsing JSON text back into an in-memory structure). Seeing the structured text output
          from an object helps solidify this fundamental concept.
        </p>

        <div className="flex items-center space-x-3 text-2xl font-semibold mt-8 mb-4">
          <Code className="w-7 h-7 text-yellow-600" />
          <h2>Programmatic Formatting (e.g., using `JSON.stringify`)</h2>
        </div>
        <p>
          While online tools and IDE extensions are common, formatting can also be done programmatically
          within code using built-in functions. In JavaScript/TypeScript, the standard way is
          using{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            JSON.stringify()
          </code>.
          This function takes a value and converts it to a JSON string. Its optional parameters
          allow for formatting:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto dark:bg-gray-800">
          <h3 className="text-lg font-medium mb-2">JSON.stringify for Formatting:</h3>
          <pre>
            {`// data: The JavaScript object or array to convert.
// replacer: Optional. Controls the stringification process (can be a function or array).
// space: Optional. A String or Number object that's used to insert white space into the output JSON string for readability purposes.

const data = { name: "Test", value: 123 };

// Compact output:
const compactJson = JSON.stringify(data); // '{"name":"Test","value":123}'

// Formatted output with 2 spaces indentation:
const formattedJson = JSON.stringify(data, null, 2);
/*
{
  "name": "Test",
  "value": 123
}
*/

// Formatted output with tab indentation:
const tabFormattedJson = JSON.stringify(data, null, '\\t');
/*
{
\\t"name": "Test",
\\t"value": 123
}
*/`}
          </pre>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Using{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            JSON.stringify(data, null, space)
          </code>{" "}
          is the programmatic equivalent of using a basic formatter tool. The{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            space
          </code>{" "}
          parameter (either a number for spaces or a string like
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            '\\t'
          </code>)
          is key here.
        </p>

        <div className="flex items-center space-x-3 text-2xl font-semibold mt-8 mb-4">
          <Eye className="w-7 h-7 text-blue-500" />
          <h2>Types of JSON Formatters Available</h2>
        </div>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Online Tools:</strong> Websites dedicated to pasting or uploading JSON for
            formatting, validation, and sometimes interactive exploration. Great for quick checks.
          </li>
          <li>
            <strong>IDE Extensions:</strong> Many Integrated Development Environments (VS Code,
            IntelliJ, etc.) have extensions that automatically format JSON files or selected JSON
            text within any file, often with syntax highlighting and validation integrated into the
            editor workflow.
          </li>
          <li>
            <strong>Command-Line Tools:</strong> Utilities like{" "}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
              jq
            </code>{" "}
            or piping output through{" "}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
              python -m json.tool
            </code>{" "}
            allow formatting JSON directly in the terminal, useful for scripting or processing API
            responses directly.
          </li>
          <li>
            <strong>Library Functions:</strong> As seen with{" "}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
              JSON.stringify()
            </code>, programming languages often have built-in or library functions for
            programmatic formatting.
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 mt-4">
          Introducing students to these different types helps them understand that formatting is a
          common, accessible task across various developer workflows.
        </p>


        <div className="flex items-center space-x-3 text-2xl font-semibold mt-8 mb-4">
          <BookOpen className="w-7 h-7 text-green-500" />
          <h2>Conclusion</h2>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          JSON formatters are more than just convenience tools; they are essential aids for
          anyone working with JSON, particularly for those learning the ropes. By transforming
          dense, unreadable text into clearly structured, indented, and often syntax-highlighted
          output, formatters significantly lower the barrier to understanding complex data.
          Incorporating the use of JSON formatters into educational curricula helps students
          develop crucial debugging skills, better grasp data structures, and become more
          efficient when working with real-world data sources like APIs. They are simple tools
          that yield profound improvements in comprehension and productivity for learners of all
          levels.
        </p>
      </section>
    </article>
  );
}
