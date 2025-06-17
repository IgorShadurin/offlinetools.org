import type { Metadata } from "next";
import { Code, FileJson, AlignLeft, Bug, Library } from "lucide-react"; // Replaced Format with AlignLeft

export const metadata: Metadata = {
  title: "PHP JSON Formatting Functions and Libraries | Your Site Name",
  description:
    "Explore PHP's built-in functions like json_encode and json_decode for handling JSON data, including formatting options and error handling.",
};

export default function PhpJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson size={32} />
        <span>PHP JSON Formatting: Functions and Best Practices</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>Introduction to JSON in PHP</span>
          </h2>
          <p className="leading-relaxed">
            JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web. PHP,
            being a cornerstone of web development, provides robust built-in functions to work with JSON data: encoding
            PHP data structures into JSON strings, and decoding JSON strings back into PHP variables. Understanding
            these functions and their options is crucial for building modern web applications that interact with APIs or
            serve data to frontend JavaScript.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>
              The Core: <code>json_encode()</code> and <code>json_decode()</code>
            </span>
          </h2>
          <p className="leading-relaxed">PHP offers two primary functions in its JSON extension:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
            <li>
              <strong>
                <code>json_encode(mixed $value, int $flags = 0, int $depth = 512): string|false</code>
              </strong>
              : Takes a PHP value (array, object, string, number, boolean, null) and converts it into a JSON string.
              Returns <code>false</code> on failure.
            </li>
            <li>
              <strong>
                <code>
                  json_decode(string $json, bool $associative = false, int $depth = 512, int $flags = 0): mixed
                </code>
              </strong>
              : Takes a JSON string and converts it into a PHP value. By default, JSON objects are converted to PHP
              objects. Setting the
              <code>$associative</code> parameter to <code>true</code> converts JSON objects into associative arrays
              instead. Returns <code>null</code>
              on failure or if the JSON "null" value is decoded.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <AlignLeft size={24} /> {/* Used AlignLeft */}
            <span>
              Encoding PHP to JSON with <code>json_encode()</code>
            </span>
          </h2>
          <p className="leading-relaxed">
            <code>json_encode()</code> is straightforward for basic data types. Arrays with sequential numeric keys
            starting from 0 are encoded as JSON arrays (<code>&#x5b;...&#x5d;</code>), while associative arrays or
            objects are encoded as JSON objects (<code>&#x7b;...&#x7d;</code>).
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Encoding Basic Data</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
$data_array = ['apple', 'banana', 'cherry'];
$data_object = (object) [
    'name' => 'Alice',
    'age' => 30,
    'isStudent' => false
];
$data_complex = [
    'status' => 'success',
    'data' => [
        'users' => [
            ['id' => 1, 'username' => 'bob'],
            ['id' => 2, 'username' => 'carol']
        ],
        'count' => 2
    ],
    'errors' => null
];

$json_array = json_encode($data_array);
$json_object = json_encode($data_object);
$json_complex = json_encode($data_complex);

echo "Array JSON: " . $json_array . "\\n";
echo "Object JSON: " . $json_object . "\\n";
echo "Complex JSON: " . $json_complex . "\\n";
?>`}
                </code>
              </pre>
            </div>
            {/* Corrected output display */}
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Output:</p>
            <pre className="bg-gray-200 p-2 rounded dark:bg-gray-700 overflow-x-auto text-xs md:text-sm">
              {`Array JSON: ["apple","banana","cherry"]
Object JSON: {"name":"Alice","age":30,"isStudent":false}
Complex JSON: {"status":"success","data":{"users":[{"id":1,"username":"bob"},{"id":2,"username":"carol"}],"count":2},"errors":null}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center space-x-2">
            <AlignLeft size={20} /> {/* Used AlignLeft */}
            <span>Formatting with Flags</span>
          </h3>
          <p className="leading-relaxed">
            The <code>$flags</code> parameter in <code>json_encode()</code> allows you to control the output format and
            behavior. The most common flag is
            <code>JSON_PRETTY_PRINT</code> for human-readable output.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">
              Example: Using <code>JSON_PRETTY_PRINT</code>
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
$data_complex = [
    'status' => 'success',
    'data' => [
        'users' => [
            ['id' => 1, 'username' => 'bob'],
            ['id' => 2, 'username' => 'carol']
        ],
        'count' => 2
    ],
    'errors' => null
];

$json_pretty = json_encode($data_complex, JSON_PRETTY_PRINT);

echo "Pretty JSON:\\n";
echo $json_pretty;
?>`}
                </code>
              </pre>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Output (formatted):</p>
            <pre className="bg-gray-200 p-2 rounded dark:bg-gray-700 overflow-x-auto text-xs md:text-sm">
              {`{
    "status": "success",
    "data": {
        "users": [
            {
                "id": 1,
                "username": "bob"
            },
            {
                "id": 2,
                "username": "carol"
            }
        ],
        "count": 2
    },
    "errors": null
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Other Useful Flags:</h3>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              <code>JSON_UNESCAPED_SLASHES</code>: Don't escape <code>/</code>. Useful for URLs.
            </li>
            <li>
              <code>JSON_UNESCAPED_UNICODE</code>: Encode multibyte Unicode characters literally (as UTF-8) instead of
              escaped (e.g., <code>\uXXXX</code>). Useful for international characters.
            </li>
            <li>
              <code>JSON_NUMERIC_CHECK</code>: Encodes numeric strings as numbers.
            </li>
            <li>
              <code>JSON_FORCE_OBJECT</code>: Forces all non-associative arrays to be encoded as objects.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            These flags can be combined using the bitwise OR operator (<code>|</code>), e.g.,{" "}
            <code>json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>
              Decoding JSON to PHP with <code>json_decode()</code>
            </span>
          </h2>
          <p className="leading-relaxed">
            <code>json_decode()</code> converts a JSON string back into PHP values. The <code>$associative</code>{" "}
            parameter controls the output type for JSON objects.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Decoding JSON</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
$json_string_object = '{"name":"Bob","age":25,"isActive":true}';
$json_string_array = '[10, 20, "thirty", false]';

// Decode as object (default)
$php_object = json_decode($json_string_object);
echo "Decoded as Object:\\n";
var_dump($php_object);

// Decode as associative array
$php_array = json_decode($json_string_object, true);
echo "\\nDecoded as Associative Array:\\n";
var_dump($php_array);

// Decoding a JSON array
$php_list = json_decode($json_string_array); // or json_decode($json_string_array, true);
echo "\\nDecoded JSON Array:\\n";
var_dump($php_list);
?>`}
                </code>
              </pre>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Output (demonstrates types):</p>
            <pre className="bg-gray-200 p-2 rounded dark:bg-gray-700 overflow-x-auto text-xs md:text-sm">
              {`Decoded as Object:
object(stdClass)#1 (3) {
  ["name"]=>
  string(3) "Bob"
  ["age"]=>
  int(25)
  ["isActive"]=>
  bool(true)
}

Decoded as Associative Array:
array(3) {
  ["name"]=>
  string(3) "Bob"
  ["age"]=>
  int(25)
  ["isActive"]=>
  bool(true)
}

Decoded JSON Array:
array(4) {
  [0]=>
  int(10)
  [1]=>
  int(20)
  [2]=>
  string(6) "thirty"
  [3]=>
  bool(false)
}`}
            </pre>
          </div>
          <p className="leading-relaxed">
            Choosing between decoding to an object or an associative array often depends on your preference and how you
            structure your PHP code. Associative arrays are generally more flexible, while objects can sometimes lead to
            cleaner code with property access (<code>$obj-&gt;name</code>
            vs <code>$arr['name']</code>).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Bug size={24} />
            <span>Error Handling with JSON Functions</span>
          </h2>
          <p className="leading-relaxed">
            JSON operations can fail due to invalid JSON syntax, unsupported data types during encoding, or exceeding
            the maximum recursion depth. It is
            <strong>critical</strong> to check for errors after calling <code>json_encode()</code>
            or <code>json_decode()</code>, especially when dealing with external data.
          </p>
          <p className="leading-relaxed mt-4">
            PHP provides <code>json_last_error(): int</code> and <code>json_last_error_msg(): string</code>
            to retrieve information about the last JSON error.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Checking for Errors</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
// Example of invalid JSON string
$invalid_json = '{"name": "Charlie", "age": 40, }'; // Trailing comma is invalid JSON

$decoded_data = json_decode($invalid_json);

if ($decoded_data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo "JSON Decode Error: " . json_last_error_msg() . "\\n";
} else {
    echo "JSON decoded successfully.\\n";
    var_dump($decoded_data);
}

// Example of encoding error (e.g., trying to encode a resource type)
// $resource = fopen('php://temp', 'r');
// $encoding_data = ['id' => 1, 'file_resource' => $resource];
// $encoded_data = json_encode($encoding_data);

// if ($encoded_data === false && json_last_error() !== JSON_ERROR_NONE) {
//     echo "JSON Encode Error: " . json_last_error_msg() . "\\n";
// } else {
//      echo "JSON encoded successfully: " . $encoded_data . "\\n";
// }
// if (isset($resource) && is_resource($resource)) {
//     fclose($resource); // Clean up resource
// }
?>`}
                </code>
              </pre>
            </div>
            {/* Corrected output display */}
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Output for invalid JSON string:</p>
            <pre className="bg-gray-200 p-2 rounded dark:bg-gray-700 overflow-x-auto text-xs md:text-sm">
              {`JSON Decode Error: Syntax error, unexpected '}'`}
            </pre>
          </div>
          <p className="leading-relaxed mt-4">
            Always check <code>json_last_error()</code> when <code>json_decode()</code>
            returns <code>null</code>, as <code>null</code> is also a valid JSON value. For <code>json_encode()</code>,
            check if the return value is <code>false</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Library size={24} />
            <span>Beyond Built-ins (Briefly)</span>
          </h2>
          <p className="leading-relaxed">
            While PHP's built-in functions are sufficient for most common JSON tasks, more complex scenarios (like
            serialization/deserialization of complex class hierarchies, data validation against schemas, or handling
            extremely large datasets) might benefit from dedicated libraries. Frameworks often provide their own
            serialization components (e.g., Symfony Serializer component) or integrate with powerful third-party
            libraries like{" "}
            <a
              href="https://jmsyst.com/libs/serializer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              JMS Serializer
            </a>
            . These libraries offer features like custom object mapping, handling of different formats (XML, YAML), and
            complex validation rules. However, for standard API interactions and data storage, <code>json_encode</code>
            and <code>json_decode</code> remain the fastest and simplest tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <AlignLeft size={24} /> {/* Used AlignLeft */}
            <span>Best Practices & Common Pitfalls</span>
          </h2>
          <ul className="list-disc pl-6 space-y-3 leading-relaxed">
            <li>
              <strong>Always Check for Errors:</strong> This is paramount, especially when consuming external JSON data.
            </li>
            <li>
              <strong>Handle Encoding:</strong> Ensure your PHP script is using UTF-8 encoding, which is the standard
              for JSON. Misconfigured encoding can lead to
              <code>JSON_ERROR_UTF8</code> errors.
            </li>
            <li>
              <strong>Use Associative Arrays for Flexibility:</strong> While objects work, decoding to associative
              arrays (<code>json_decode($json, true)</code>) is often more common and flexible in typical PHP workflows.
            </li>
            <li>
              <strong>Be Mindful of Large Data:</strong> Encoding/decoding very large JSON strings can consume
              significant memory. For huge datasets, consider streaming or alternative formats if possible. The{" "}
              <code>$depth</code> parameter limits recursion depth to prevent stack overflow for deeply nested
              structures.
            </li>
            <li>
              <strong>Data Types Mapping:</strong> Remember how PHP types map to JSON types and vice-versa (e.g., PHP{" "}
              <code>null</code> becomes JSON <code>null</code>, PHP integers/floats become JSON numbers, PHP strings
              become JSON strings).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>Conclusion</span>
          </h2>
          <p className="leading-relaxed">
            PHP's built-in <code>json_encode()</code> and <code>json_decode()</code>
            functions are powerful and versatile tools for handling JSON data. By understanding their basic usage,
            formatting flags, and crucial error handling mechanisms, developers can effectively work with JSON in a wide
            range of web development scenarios. For most tasks involving JSON in PHP, these native functions provide
            excellent performance and simplicity.
          </p>
        </section>
      </div>
    </>
  );
}
