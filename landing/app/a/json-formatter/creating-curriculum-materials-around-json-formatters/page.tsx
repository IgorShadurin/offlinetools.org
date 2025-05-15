import type { Metadata } from "next";
import {
  Code,
  Braces,
  Indent,
  ListTree,
  GraduationCap,
  Boxes,
  Sparkles,
} from "lucide-react"; // Using allowed lucide-react icons

export const metadata: Metadata = {
  title: "Creating Curriculum Materials Around JSON Formatters | Offline Tools",
  description:
    "Learn how to design educational content for developers focused on building JSON formatters and beautifiers.",
};

export default function JsonFormattersCurriculumPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <GraduationCap className="w-8 h-8" />
        Creating Curriculum Materials Around JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and beyond. While its structure is simple, reading large or complex JSON data that lacks proper indentation and spacing can be challenging. This is where JSON formatters (or beautifiers) come in.
        </p>
        <p>
          Building a JSON formatter is a fantastic project for developers learning fundamental programming concepts, string manipulation, data structures, and recursion. This page outlines how to structure curriculum materials around this engaging topic, suitable for various skill levels.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Braces className="w-6 h-6" />
          What is a JSON Formatter?
        </h2>
        <p>
          A JSON formatter takes a raw, unformatted JSON string and outputs a new string with consistent indentation and line breaks, making the data structure clear and readable.
        </p>
        <p>
          Consider this unformatted JSON:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code>
              {"["}&#x7b;"id":1,"name":"Alice","courses":["Math","Science"]&#x7d;,&#x7b;"id":2,"name":"Bob","courses":["History"]&#x7d;{"]"}
            </code>
          </pre>
        </div>
        <p>
          A formatter transforms it into something like this (using 2-space indentation):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code>
              {`[
  {
    "id": 1,
    "name": "Alice",
    "courses": [
      "Math",
      "Science"
    ]
  },
  {
    "id": 2,
    "name": "Bob",
    "courses": [
      "History"
    ]
  }
]`}
            </code>
          </pre>
        </div>
        <p>
          The goal is to visually represent the nested structure of objects (`&#x7b; ... &#x7d;`) and arrays (`[ ... ]`).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6" />
          Why Teach JSON Formatting?
        </h2>
        <p>
          Teaching students to build a JSON formatter offers several educational benefits:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Reinforces JSON Structure:</strong> Students must deeply understand the rules for objects, arrays, strings, numbers, booleans, and null, and how they nest.
          </li>
          <li>
            <strong>String Manipulation:</strong> It involves iterating through a string, identifying specific characters (like `&#x7b;`, `&#x7d;`, `[`, `]`, `:`, `,`), and building a new string.
          </li>
          <li>
            <strong>Algorithm Design:</strong> Students need to devise a logic to handle indentation levels as they enter and exit nested structures.
          </li>
          <li>
            <strong>Recursion/Stack Usage:</strong> Handling nested JSON naturally lends itself to recursive approaches or using a stack to keep track of the current indentation level and context (object or array).
          </li>
          <li>
            <strong>Error Handling:</strong> Students can explore basic error detection, though a full JSON validator is a separate, more complex task.
          </li>
          <li>
            <strong>Practical Utility:</strong> It&apos;s a useful tool they can use or expand upon.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Boxes className="w-6 h-6" />
          Key Concepts to Cover
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Syntax Rules:</strong> Review the valid data types and structure (key-value pairs in objects, ordered elements in arrays).
          </li>
          <li>
            <strong>Indentation:</strong> The core concept. How many spaces or tabs to use per level? How to increase/decrease the indentation?
          </li>
          <li>
            <strong>Whitespace:</strong> Understanding that whitespace is generally ignored in JSON *except* within strings. The formatter adds meaningful whitespace.
          </li>
          <li>
            <strong>Handling Delimiters:</strong> Specifically processing `&#x7b;`, `&#x7d;`, `[`, `]`, `:`, `,`. These characters dictate where new lines and indentation changes occur.
          </li>
          <li>
            <strong>Handling Data Types:</strong> How to output strings (including escaping), numbers, booleans, and null without adding extra unwanted whitespace inside them.
          </li>
          <li>
            <strong>Nesting:</strong> The crucial part. When you see `&#x7b;` or `[`, increase indentation. When you see `&#x7d;` or `]`, decrease indentation *before* adding the character.
          </li>
          <li>
            <strong>Commas and Colons:</strong> Adding new lines *after* commas within objects/arrays and spaces *after* colons in objects.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Indent className="w-6 h-6" />
          Curriculum Structure & Examples
        </h2>

        <h3 className="text-xl font-semibold mt-6">Phase 1: Basic Indentation (Flat Structures)</h3>
        <p>
          Start simple. Ignore nesting initially. Teach how to add indentation for key-value pairs or array elements in a flat structure. Focus on identifying commas and deciding where to add newlines and the current indentation string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual JavaScript/TypeScript (Simplified):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
{`function basicFormat(jsonString: string, indent = '  '): string {
  let result = '';
  let currentIndent = '';
  let inString = false; // Simple state to avoid formatting inside strings

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];

    if (char === '"') {
      inString = !inString;
    }

    if (!inString) {
      if (char === ',' || char === ':' || char === '[' || char === '&#x7b;' || char === ']' || char === '&#x7d;') {
        result += char;
        // Add newline and indent after certain characters (basic logic)
        if (char === ',' || char === '[' || char === '&#x7b;') {
           result += '\\n' + currentIndent;
        }
        // Add space after colon
        if (char === ':') {
            result += ' ';
        }
        continue; // Move to next character
      }
      // Add indentation logic here based on nesting level (to be added later)
    }
    result += char; // Add character if not a special delimiter or inside string
  }

  // This basic example needs refinement for nesting
  return result;
}`}
              </code>
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <em>Note: This is a highly simplified conceptual example. A real formatter needs more sophisticated state and parsing logic.</em>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Phase 2: Handling Nesting (Recursion/Stack)</h3>
        <p>
          Introduce the concept of indentation level. Each time you encounter an opening brace `&#x7b;` or bracket `[`, increment the level. Each time you encounter a closing brace `&#x7d;` or bracket `]`, decrement the level. The current indentation string is the `indent` character repeated `level` times.
        </p>
        <p>
          This is a great opportunity to teach recursion. A function could process a &quot;value&quot;, and if that value is an object or array, it recursively calls formatting logic for the nested structure, passing down the increased indentation level. Alternatively, demonstrate using a stack to manage indentation levels iteratively.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Indentation Logic:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code>
{`let indentLevel = 0;
const indentSize = 2; // Use 2 spaces
const indentChar = ' ';

// When encountering '{' or '[':
indentLevel++;
// Add '\\n' + indentChar.repeat(indentLevel)

// When encountering '}' or ']':
indentLevel--;
// Add '\\n' + indentChar.repeat(indentLevel) + the character

// When encountering ',':
// Add ',' + '\\n' + indentChar.repeat(indentLevel)

// When encountering ':':
// Add ':' + ' ' // Add space after colon`}
              </code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Phase 3: Edge Cases & Options</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Empty Objects/Arrays:</strong> Ensure `&#x7b;&#x7d;` and `[]` are handled correctly without extra newlines.
          </li>
          <li>
            <strong>Strings with Special Characters:</strong> While formatting doesn&apos;t change string *content*, students should be aware of escaped characters (`\\n`, `\\"`, etc.) and that the formatter shouldn&apos;t break them.
          </li>
          <li>
            <strong>Indentation Type:</strong> Allow choosing between spaces and tabs, and specifying the number of spaces.
          </li>
          <li>
            <strong>Compact Formatting:</strong> An optional challenge: output the JSON with minimal whitespace on a single line.
          </li>
          <li>
            <strong>Basic Validation:</strong> Add checks for common syntax errors (unmatched braces/brackets, trailing commas - though not strictly JSON, some parsers allow).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Suggested Project Structure
        </h2>
        <p>
          Structure the curriculum as a project where students incrementally build their formatter:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Start with a function that takes a string and returns a string.</li>
          <li>Implement logic for flat objects (newlines after commas, space after colon).</li>
          <li>Implement logic for flat arrays (newlines after commas).</li>
          <li>Combine flat object and array handling.</li>
          <li>Introduce indentation level tracking.</li>
          <li>Implement recursive handling of nested objects and arrays.</li>
          <li>Add options for indent size and character (space/tab).</li>
          <li>Handle empty objects/arrays correctly.</li>
          <li>(Optional) Add basic syntax error detection.</li>
        </ol>
        <p>
          Provide plenty of test cases, from simple flat structures to deeply nested ones with various data types.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Conclusion
        </h2>
        <p>
          Creating a JSON formatter is a practical and deeply educational programming exercise. It provides concrete examples of string processing, algorithmic thinking, and handling hierarchical data. By structuring curriculum materials to progress from basic formatting to handling complex nesting and options, instructors can guide developers of all levels to build a useful tool while solidifying core programming concepts.
        </p>
      </div>
    </>
  );
}