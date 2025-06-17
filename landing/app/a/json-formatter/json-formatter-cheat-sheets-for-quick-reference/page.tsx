import type { Metadata } from "next";
import { Code, FileJson2, Check, X, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatter Cheat Sheets for Quick Reference | Offline Tools",
  description:
    "Quickly reference JSON formatting rules, valid syntax, and tips for using JSON.stringify with this comprehensive cheat sheet.",
};

export default function JsonFormatterCheatSheetPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 className="w-8 h-8" /> JSON Formatter Cheat Sheets for Quick Reference
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format. It's easy for humans to read and
          write and easy for machines to parse and generate. Proper JSON formatting is crucial for readability,
          debugging, and ensuring data integrity when transferring information between systems. This cheat sheet
          provides a quick reference to JSON syntax rules and formatting techniques.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Basic JSON Syntax Rules
        </h2>

        <p>JSON is built on two structures:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A collection of name/value pairs. In various languages, this is realized as an <em>object</em>, record,
            struct, dictionary, hash table, keyed list, or associative array (usually denoted by <code>&#x7b;</code>...
            <code>&#x7d;</code>).
          </li>
          <li>
            An ordered list of values. In most languages, this is realized as an <em>array</em>, vector, list, or
            sequence (usually denoted by <code>&#x5b;</code>...<code>&#x5d;</code>).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Objects</h3>
        <p>An object is an unordered set of name/value pairs.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "key1": "value1",
  "key2": 123,
  "key3": true,
  "key4": null,
  "key5": {
    "nestedKey": "nestedValue"
  },
  "key6": [
    "arrayElement1",
    "arrayElement2"
  ]
}`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Objects are enclosed in curly braces <code>&#x7b;&#x7d;</code>.
          </li>
          <li>
            Name/value pairs are separated by a comma <code>,</code>.
          </li>
          <li>
            The name (key) and the value are separated by a colon <code>:</code>.
          </li>
          <li>
            <strong>Keys must be strings</strong> enclosed in double quotes <code>&quot;&quot;</code>.
          </li>
          <li>Values can be a string, number, boolean, null, object, or array.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Arrays</h3>
        <p>An array is an ordered collection of values.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`[
  "element1",
  123,
  false,
  {
    "type": "objectInArray"
  },
  [
    "nestedArray"
  ]
]`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Arrays are enclosed in square brackets <code>&#x5b;&#x5d;</code>.
          </li>
          <li>
            Values are separated by a comma <code>,</code>.
          </li>
          <li>Values can be of any valid JSON data type (string, number, boolean, null, object, or array).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Values (Data Types)</h3>
        <p>A value must be one of the following JSON data types:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>String:</strong> Sequence of zero or more Unicode characters, enclosed in double quotes{" "}
            <code>&quot;&quot;</code>. Must be escaped correctly (e.g., <code>\&quot;</code> for a double quote,{" "}
            <code>\\</code> for a backslash, <code>\n</code> for newline, <code>\r</code> for carriage return,{" "}
            <code>\t</code> for tab, <code>\f</code> for form feed, <code>\b</code> for backspace, <code>\uXXXX</code>{" "}
            for Unicode characters).
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code>{'"Hello, World!"'}</code>
              </pre>
              <pre>
                <code>{'"String with a newline\\nand a tab\\t"'}</code>
              </pre>
              <pre>
                <code>{'"Contains a double quote: \\""'}</code>
              </pre>
              <pre>
                <code>{'"Unicode character: \\u20AC (Euro sign)"'}</code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Number:</strong> Integer or floating-point. Similar to JavaScript numbers, but <strong>NaN</strong>{" "}
            and <strong>Infinity</strong> are NOT valid JSON numbers.
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code>{"123"}</code>
              </pre>
              <pre>
                <code>{"-45.67"}</code>
              </pre>
              <pre>
                <code>{"1.2e+10"}</code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Boolean:</strong> <code>true</code> or <code>false</code> (lowercase).
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code>{"true"}</code>
              </pre>
              <pre>
                <code>{"false"}</code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Null:</strong> <code>null</code> (lowercase). Represents an empty or non-existent value.
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code>{"null"}</code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Object:</strong> As described above.
          </li>
          <li>
            <strong>Array:</strong> As described above.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Whitespace <Info className="w-5 h-5 text-blue-500" />
        </h3>
        <p>
          Whitespace (spaces, tabs, newlines, carriage returns) can be inserted between any two tokens. This is used for
          formatting and indentation to improve readability but is ignored by parsers. Formatted JSON adds whitespace
          for indentation. Minified JSON removes most non-essential whitespace.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6 text-green-500" /> Valid vs. <X className="w-6 h-6 text-red-500" /> Invalid JSON
          Syntax
        </h2>
        <p>Here are common mistakes that result in invalid JSON:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Trailing commas:</strong>
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`{ "key": "value", }`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid
              </span>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`[ 1, 2, 3, ]`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid
              </span>
            </div>
          </li>
          <li>
            <strong>Unquoted keys:</strong>
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`{ key: "value" }`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid (<code>key</code> is not a string)
              </span>
            </div>
          </li>
          <li>
            <strong>Single quotes for strings or keys:</strong>
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`{ 'key': 'value' }`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid (both keys and string values need double quotes)
              </span>
            </div>
          </li>
          <li>
            <strong>Comments:</strong>
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`{ "key": "value" // This is a comment }`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid
              </span>
            </div>
          </li>
          <li>
            <strong>Invalid number values:</strong> NaN, Infinity, -Infinity.
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`{ "number": NaN }`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid
              </span>
            </div>
          </li>
          <li>
            <strong>Incorrect boolean/null casing:</strong> TRUE, FALSE, NULL.
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 flex items-center gap-3">
              <pre className="flex-grow">
                <code>{`{ "boolean": TRUE }`}</code>
              </pre>
              <span className="flex-shrink-0 flex items-center gap-1 text-red-500 font-semibold">
                <X className="w-4 h-4" /> Invalid (must be lowercase <code>true</code>)
              </span>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Using <code>JSON.stringify()</code> for Formatting <Code className="w-6 h-6" />
        </h2>
        <p>
          In JavaScript (and environments like Node.js), the built-in <code>JSON.stringify()</code> method is commonly
          used not only to convert a JavaScript object/value into a JSON string but also to format the output.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Syntax:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 mb-4">
            <pre>{`JSON.stringify(value[, replacer[, space]])`}</pre>
          </div>
          <h3 className="text-lg font-medium">Parameters:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>value</code>: The JavaScript value to convert to a JSON string.
            </li>
            <li>
              <code>replacer</code> (Optional): A function that alters the behavior of the stringification process, or
              an array of String and Number objects that serve as a whitelist for selecting the properties of the
              <code>value</code> object to be included in the JSON string. If <code>null</code> or not provided, all
              properties are included.
            </li>
            <li>
              <code>space</code> (Optional): A String or Number object that&apos;s used to insert white space into the
              output JSON string for readability purposes.
              <ul className="list-circle pl-6 mt-2">
                <li>
                  If a <code>Number</code>, it indicates the number of space characters to use as white space for
                  indentation (up to 10).
                </li>
                <li>
                  If a <code>String</code>, the string (or the first 10 characters of the string) is used as white space
                  for indentation.
                </li>
                <li>
                  If not provided or <code>null</code>, no white space is used (minified output).
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">Formatting with Indentation</h3>
        <p>
          The <code>space</code> parameter is key for pretty-printing JSON.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Example: Using 2 spaces</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 mb-4">
            <pre>
              {`const data = { name: "Alice", age: 30, city: "Wonderland" };
const formattedJson = JSON.stringify(data, null, 2);
// formattedJson will be:
/*
{
  "name": "Alice",
  "age": 30,
  "city": "Wonderland"
}
*/`}
            </pre>
          </div>
          <h3 className="text-lg font-medium">Example: Using Tab character</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              {`const data = { name: "Alice", age: 30 };
const formattedJson = JSON.stringify(data, null, '\\t');
// formattedJson will be:
/*
{
\t"name": "Alice",
\t"age": 30
}
*/`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Filtering with Replacer (Array)</h3>
        <p>
          Use an array of keys as the <code>replacer</code> to include only specific properties.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              {`const data = { name: "Alice", age: 30, city: "Wonderland", secret: "xyz" };
const keysToKeep = ["name", "age"];
const filteredJson = JSON.stringify(data, keysToKeep, 2);
// filteredJson will be:
/*
{
  "name": "Alice",
  "age": 30
}
*/`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Transforming with Replacer (Function)</h3>
        <p>
          Use a function as the <code>replacer</code> to control how each key-value pair is stringified. The function
          receives the <code>key</code> and <code>value</code> and should return the value to be included, or{" "}
          <code>undefined</code> to omit the pair.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              {`const data = { name: "Alice", age: 30, city: "Wonderland" };
const replacerFunction = (key, value) => {
  if (key === 'age') {
    return undefined; // Omit the age property
  }
  if (typeof value === 'string') {
    return value.toUpperCase(); // Convert strings to uppercase
  }
  return value; // Return other values unchanged
};
const transformedJson = JSON.stringify(data, replacerFunction, 2);
// transformedJson will be:
/*
{
  "name": "ALICE",
  "city": "WONDERLAND"
}
*/
// Note: The root key is an empty string when the replacer function is called for the top-level object.
// E.g., replacerFunction('', { name: "Alice", ... })`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" /> Quick Tips for Formatting & Debugging
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Validate First:</strong> If you receive JSON from an external source and it fails parsing, use an
            online JSON validator/formatter immediately. It will highlight syntax errors precisely.
          </li>
          <li>
            <strong>Use Editor Extensions:</strong> Most modern code editors (VS Code, Sublime Text, etc.) have
            extensions for JSON that provide syntax highlighting, validation, and automatic formatting on save.
          </li>
          <li>
            <strong>Browser Developer Tools:</strong> Browser consoles often print JSON objects interactively, allowing
            you to expand and inspect them easily, which helps in visualizing structured data.
          </li>
          <li>
            <strong>Command Line Tools:</strong> Tools like <code>jq</code> are incredibly powerful for formatting,
            slicing, filtering, and transforming JSON data directly from the command line. Example:{" "}
            <code>cat data.json | jq .</code> will pretty-print the JSON.
          </li>
          <li>
            <strong>
              Understand <code>JSON.parse()</code>:
            </strong>{" "}
            This method converts a JSON string into a JavaScript object or value. Formatting applies to creating the
            string (`stringify`), not parsing it (`parse`).
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code>{`const jsonString = '{"name": "Alice"}';
const jsObject = JSON.parse(jsonString); // jsObject is { name: "Alice" }
`}</code>
              </pre>
            </div>
          </li>
        </ul>

        <p>
          Mastering JSON formatting ensures your data is always clean, readable, and correctly structured, making your
          development workflow smoother and debugging less painful.
        </p>
      </div>
    </>
  );
}
