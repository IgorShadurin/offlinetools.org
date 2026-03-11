import type { Metadata } from "next";
import { Code, FileJson, AlignLeft, Bug, Library } from "lucide-react";

export const metadata: Metadata = {
  title: "PHP JSON Formatting Functions and Libraries",
  description:
    "Learn how to format, encode, decode, and validate JSON in PHP with json_encode(), json_decode(), JSON_THROW_ON_ERROR, json_validate(), and the right libraries for larger workloads.",
};

export default function PhpJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson size={32} />
        <span>PHP JSON Formatting Functions and Libraries</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>What Most PHP Projects Should Use</span>
          </h2>
          <p className="leading-relaxed">
            If you need to pretty-print JSON, build API responses, or parse JSON from a request or third-party API,
            start with PHP&apos;s built-in JSON extension. For most applications, <code>json_encode()</code> and{" "}
            <code>json_decode()</code> are enough, and modern code should usually add{" "}
            <code>JSON_THROW_ON_ERROR</code> so failures become exceptions instead of silent <code>false</code> or{" "}
            <code>null</code> values.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
            <li>
              Use <code>json_encode()</code> to serialize and format PHP data.
            </li>
            <li>
              Use <code>json_decode()</code> to parse JSON into arrays or objects.
            </li>
            <li>
              Use <code>json_validate()</code> only when you need to check JSON syntax without decoding it. This was
              added in PHP 8.3.
            </li>
            <li>
              Reach for a library when you need object mapping, schema-driven normalization, or streaming very large
              JSON files.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>
              The Core Functions: <code>json_encode()</code> and <code>json_decode()</code>
            </span>
          </h2>
          <p className="leading-relaxed">These are the two functions you will use most often:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
            <li>
              <strong>
                <code>json_encode(mixed $value, int $flags = 0, int $depth = 512): string|false</code>
              </strong>
              : Converts a PHP value into a JSON string.
            </li>
            <li>
              <strong>
                <code>json_decode(string $json, ?bool $associative = null, int $depth = 512, int $flags = 0): mixed</code>
              </strong>
              : Parses JSON into PHP values. Set <code>$associative</code> to <code>true</code> if you want arrays
              instead of <code>stdClass</code> objects.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            PHP arrays with sequential zero-based numeric keys become JSON arrays. Associative arrays and objects become
            JSON objects. That sounds simple, but it matters when your data has missing numeric indexes or when you are
            returning data to JavaScript clients that expect a consistent shape.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <AlignLeft size={24} />
            <span>
              Formatting JSON with <code>json_encode()</code>
            </span>
          </h2>
          <p className="leading-relaxed">
            Pretty printing is just one part of JSON formatting. In practice, the useful flags are the ones that keep
            output readable without unexpectedly changing the data.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Pretty, readable JSON output</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
$payload = [
    'name' => 'Sofiia',
    'profileUrl' => 'https://offlinetools.org/tools/json-formatter',
    'price' => 12.0,
    'tags' => ['php', 'json', 'formatting'],
    'message' => 'Hello, мир'
];

$json = json_encode(
    $payload,
    JSON_PRETTY_PRINT
    | JSON_UNESCAPED_SLASHES
    | JSON_UNESCAPED_UNICODE
    | JSON_PRESERVE_ZERO_FRACTION
    | JSON_THROW_ON_ERROR
);

echo $json;
?>`}
                </code>
              </pre>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Output:</p>
            <pre className="bg-gray-200 p-2 rounded dark:bg-gray-700 overflow-x-auto text-xs md:text-sm">
              {`{
    "name": "Sofiia",
    "profileUrl": "https://offlinetools.org/tools/json-formatter",
    "price": 12.0,
    "tags": [
        "php",
        "json",
        "formatting"
    ],
    "message": "Hello, мир"
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Flags That Matter in Real Projects</h3>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              <code>JSON_PRETTY_PRINT</code>: Adds indentation and line breaks for logs, debugging, or developer-facing
              exports.
            </li>
            <li>
              <code>JSON_UNESCAPED_SLASHES</code>: Keeps URLs readable instead of escaping every slash.
            </li>
            <li>
              <code>JSON_UNESCAPED_UNICODE</code>: Outputs UTF-8 characters directly instead of <code>\uXXXX</code>
              escapes.
            </li>
            <li>
              <code>JSON_PRESERVE_ZERO_FRACTION</code>: Keeps <code>12.0</code> as <code>12.0</code> instead of turning
              it into <code>12</code>.
            </li>
            <li>
              <code>JSON_THROW_ON_ERROR</code>: Preferred in new code because it throws <code>JsonException</code> on
              failure.
            </li>
            <li>
              <code>JSON_INVALID_UTF8_SUBSTITUTE</code>: Replaces bad UTF-8 sequences instead of failing the entire
              encode.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            Avoid <code>JSON_NUMERIC_CHECK</code> unless you are certain every numeric-looking string should become a
            number. It can quietly alter phone numbers, ZIP codes, IDs, and other values that should stay strings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Code size={24} />
            <span>
              Safer Decoding with <code>json_decode()</code>
            </span>
          </h2>
          <p className="leading-relaxed">
            Older PHP examples often rely on <code>json_last_error()</code>. That still works, but for current code the
            safer default is to use <code>JSON_THROW_ON_ERROR</code> and catch <code>JsonException</code>.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Decode JSON with exceptions</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
$requestBody = '{"userId": 9007199254740993123, "active": true}';

try {
    $data = json_decode(
        $requestBody,
        true,
        512,
        JSON_THROW_ON_ERROR | JSON_BIGINT_AS_STRING
    );

    var_dump($data);
} catch (JsonException $e) {
    http_response_code(400);
    echo 'Invalid JSON: ' . $e->getMessage();
}
?>`}
                </code>
              </pre>
            </div>
          </div>

          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              Pass <code>true</code> as the second argument if you want associative arrays. This is the most common
              choice in plain PHP apps and API handlers.
            </li>
            <li>
              Use <code>JSON_BIGINT_AS_STRING</code> when incoming JSON may contain integers larger than PHP can safely
              represent as numeric values.
            </li>
            <li>
              Keep the default depth unless you have a specific reason to change it. Extremely deep payloads are often a
              data-quality problem, not just a parser setting.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Bug size={24} />
            <span>
              When to Use <code>json_validate()</code>
            </span>
          </h2>
          <p className="leading-relaxed">
            PHP 8.3 added <code>json_validate()</code>, which checks whether a string is syntactically valid JSON
            without building the decoded PHP value in memory. That makes it useful when you only need a yes or no
            answer, such as request prechecks or guard clauses.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example: Validate without decoding</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  {`<?php
$input = file_get_contents('php://input');

if (!json_validate($input)) {
    http_response_code(400);
    echo 'Request body must be valid JSON.';
    exit;
}

echo 'JSON syntax is valid.';
?>`}
                </code>
              </pre>
            </div>
          </div>

          <p className="leading-relaxed">
            Do not call <code>json_validate()</code> immediately before <code>json_decode()</code> on the same string.
            That parses the payload twice. If you are going to decode anyway, just call <code>json_decode()</code> with{" "}
            <code>JSON_THROW_ON_ERROR</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Bug size={24} />
            <span>Common Pitfalls and Compatibility Notes</span>
          </h2>
          <ul className="list-disc pl-6 space-y-3 leading-relaxed">
            <li>
              <strong>JSON expects UTF-8.</strong> Invalid byte sequences can make encoding or decoding fail. If you are
              dealing with uncertain input, normalize the text first or use <code>JSON_INVALID_UTF8_SUBSTITUTE</code>
              when encoding.
            </li>
            <li>
              <strong>Sparse arrays turn into objects.</strong> If you unset an element and leave gaps in the numeric
              keys, PHP may encode the result as a JSON object. Use <code>array_values()</code> if you need a JSON
              array.
            </li>
            <li>
              <strong>Objects only expose public properties by default.</strong> If you are encoding rich domain
              objects, implement <code>JsonSerializable</code> to control the JSON shape explicitly.
            </li>
            <li>
              <strong>Legacy error checks still appear in older codebases.</strong> <code>json_last_error()</code> and{" "}
              <code>json_last_error_msg()</code> are still valid, but exception-based handling is cleaner for new work.
            </li>
            <li>
              <strong>Version note:</strong> <code>json_validate()</code> requires PHP 8.3 or newer. If you support
              older versions, validate by decoding and handling errors instead.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <Library size={24} />
            <span>Libraries Worth Considering</span>
          </h2>
          <p className="leading-relaxed">
            Most PHP projects do not need a third-party library just to format JSON. Libraries become useful when the
            problem is bigger than formatting, such as mapping nested objects, enforcing serialization rules, or reading
            huge JSON streams without loading everything into memory.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-3 leading-relaxed">
            <li>
              <strong>Symfony Serializer:</strong> A good fit when you want structured normalization and denormalization
              between arrays, JSON, and DTOs or entities.
            </li>
            <li>
              <strong>JsonMachine:</strong> Useful for large JSON documents or API exports because it can stream items
              instead of decoding the full payload at once.
            </li>
            <li>
              <strong>JMS Serializer:</strong> Still relevant in projects that already use it for annotation or
              attribute-driven object serialization.
            </li>
          </ul>
          <p className="mt-4 leading-relaxed">
            If your use case is only "format this PHP array as JSON" or "parse this API response," the built-in
            extension is simpler, faster, and easier to maintain.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
            <AlignLeft size={24} />
            <span>Bottom Line</span>
          </h2>
          <p className="leading-relaxed">
            For modern PHP JSON formatting, the default stack is straightforward: use <code>json_encode()</code> with
            the right flags for readable output, use <code>json_decode()</code> with <code>JSON_THROW_ON_ERROR</code>{" "}
            for safe parsing, and use <code>json_validate()</code> only when you need validation without decoding on
            PHP 8.3+. Add a library only when you need object mapping or streaming, not for ordinary JSON formatting.
          </p>
        </section>
      </div>
    </>
  );
}
