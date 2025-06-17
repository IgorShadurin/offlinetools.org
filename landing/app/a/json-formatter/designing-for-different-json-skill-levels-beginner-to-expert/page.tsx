import type { Metadata } from "next";
import React from "react";
import {
  User,
  Code,
  Check,
  X,
  Info,
  Lightbulb,
  Scaling,
  Database,
  FileJson,
  FlaskConical,
  Shield,
  Wrench, // Corrected import from Tool to Wrench
} from "lucide-react";

export const metadata: Metadata = {
  title: "Designing for Different JSON Skill Levels: Beginner to Expert",
  description: "An article exploring JSON concepts and tooling for developers from beginner to expert.",
};

export default function JsonSkillLevelsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Designing for Different JSON Skill Levels: Beginner to Expert
      </h1>

      <div className="space-y-8 max-w-3xl mx-auto">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. Its simplicity and
          readability make it approachable, but mastering its nuances, tools, and advanced patterns can significantly
          boost a developer&apos;s efficiency and the robustness of their applications. This guide explores JSON
          concepts from the perspective of different skill levels, offering insights and techniques for everyone from
          coding newcomers to seasoned architects.
        </p>

        {/* Beginner Section */}
        <div className="border-l-4 border-green-500 pl-4 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <User className="text-green-500" /> Beginner: Understanding the Basics
          </h2>
          <p>
            At the beginner level, the focus is on understanding JSON&apos;s core syntax and how to represent basic data
            structures.
          </p>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <FileJson className="text-blue-500" /> Core Syntax Elements
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Objects:</strong> Represented by curly braces <code>&#x7b;&#x7d;</code>. They store key-value
              pairs, like dictionaries or maps.
            </li>
            <li>
              <strong>Arrays:</strong> Represented by square brackets <code>[][]</code>. They store ordered lists of
              values.
            </li>
            <li>
              <strong>Key-Value Pairs:</strong> Inside objects, data is stored as <code>&quot;key&quot;: value</code>.
              Keys must be strings (using double quotes).
            </li>
            <li>
              <strong>Values:</strong> Can be one of six types:
              <ul className="list-circle pl-6 mt-1 space-y-1">
                <li>
                  Strings (e.g., <code>&quot;hello&quot;</code>)
                </li>
                <li>
                  Numbers (integers or floating-point, e.g., <code>123</code>, <code>-2.5</code>)
                </li>
                <li>
                  Booleans (<code>true</code> or <code>false</code>)
                </li>
                <li>
                  Null (<code>null</code>)
                </li>
                <li>Objects (nested structures)</li>
                <li>Arrays (nested structures)</li>
              </ul>
            </li>
            <li>
              <strong>Separators:</strong> Use a colon <code>:</code> between a key and its value, and a comma{" "}
              <code>,</code> between pairs in an object or elements in an array.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Code className="text-blue-500" /> Reading & Writing JSON in Code
          </h3>
          <p>
            Most programming languages have built-in ways to handle JSON. In JavaScript, the global <code>JSON</code>{" "}
            object is key:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h4 className="text-lg font-medium mb-2">Basic JavaScript Example:</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`// A simple JavaScript object
const myObject = {
  name: "Alice",
  age: 30,
  isStudent: false
};

// Convert JavaScript object to JSON string
const jsonString = JSON.stringify(myObject);
// jsonString is now: '{"name":"Alice","age":30,"isStudent":false}'
console.log(jsonString);

// Convert JSON string back to JavaScript object
const anotherObject = JSON.parse(jsonString);
// anotherObject is now: { name: 'Alice', age: 30, isStudent: false }
console.log(anotherObject.name); // Output: Alice`}
            </pre>
          </div>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <X className="text-red-500" /> Common Beginner Pitfalls
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Trailing Commas:</strong> A comma after the last element in an object or array is invalid JSON
              (though some parsers might tolerate it).
            </li>
            <li>
              <strong>Unquoted Keys:</strong> Object keys MUST be strings enclosed in double quotes. (e.g.,{" "}
              <code>{`&#x7b; name: "Alice" &#x7d;`}</code> is NOT valid JSON).
            </li>
            <li>
              <strong>Comments:</strong> JSON does NOT support comments. Remove them before parsing.
            </li>
            <li>
              <strong>Single vs. Double Quotes:</strong> JSON strings MUST use double quotes.
            </li>
          </ul>
        </div>

        {/* Intermediate Section */}
        <div className="border-l-4 border-blue-500 pl-4 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Wrench className="text-blue-500" /> Intermediate: Working with Structure and Tools
          </h2>
          <p>
            Developers at this level start dealing with more complex data structures, integrating JSON into APIs, and
            using basic tools to handle it efficiently.
          </p>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Code className="text-blue-500" /> Nested Structures and Data Mapping
          </h3>
          <p>
            Real-world JSON often involves objects within arrays, arrays within objects, and multiple levels of nesting.
            Understanding how these map to your programming language&apos;s data types (like lists of dictionaries, or
            objects with array properties) is crucial.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h4 className="text-lg font-medium mb-2">Nested JSON Example:</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`&#x7b;
  &quot;user&quot;: &#x7b;
    &quot;id&quot;: 123,
    &quot;profile&quot;: &#x7b;
      &quot;name&quot;: &quot;Bob&quot;,
      &quot;location&quot;: &quot;Cityville&quot;
    &#x7d;,
    &quot;roles&quot;: [&quot;admin&quot;, &quot;editor&quot;],
    &quot;active&quot;: true
  &#x7d;,
  &quot;settings&quot;: &#x7b;
    &quot;theme&quot;: &quot;dark&quot;
  &#x7d;
&#x7d;`}
            </pre>
            <p className="mt-2 text-sm">
              Accessing nested data in JavaScript: <code>data.user.profile.name</code>, <code>data.user.roles[0]</code>.
            </p>
          </div>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Info className="text-blue-500" /> JSON in APIs
          </h3>
          <p>
            JSON is the standard format for most REST APIs. You&apos;ll send JSON in request bodies (e.g., POST, PUT)
            and receive JSON in response bodies. Properly setting the <code>Content-Type</code> header to{" "}
            <code>application/json</code> is important.
          </p>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Wrench className="text-blue-500" /> Useful Intermediate Tools
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Online JSON Validators/Formatters:</strong> Websites that check if your JSON is valid and
              pretty-print it for readability. (e.g., JSONLint, JSONFormatter).
            </li>
            <li>
              <strong>Browser Developer Tools:</strong> The &quot;Network&quot; tab shows JSON responses from APIs,
              often with built-in viewers. The console allows you to inspect parsed JSON objects.
            </li>
            <li>
              <strong>IDE Extensions:</strong> Most modern IDEs have extensions for syntax highlighting, formatting, and
              sometimes validation of JSON.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Check className="text-blue-500" /> Basic Validation
          </h3>
          <p>
            Beyond syntax, you might need to check if the JSON structure matches expectations (e.g., an object has a
            specific key, an array contains elements of a certain type). This is often done with simple checks in your
            code after parsing.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h4 className="text-lg font-medium mb-2">Basic Validation Check (JavaScript):</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`const data = JSON.parse(jsonString);

if (typeof data === 'object' && data !== null && typeof data.name === 'string') {
  console.log("Data is a valid object with a 'name' string property.");
} else {
  console.error("Invalid data structure.");
}`}
            </pre>
          </div>
        </div>

        {/* Expert Section */}
        <div className="border-l-4 border-purple-500 pl-4 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FlaskConical className="text-purple-500" /> Expert: Advanced Concepts and Performance
          </h2>
          <p>
            Experts delve into formal specifications, handle massive datasets, optimize performance, and explore related
            technologies and security aspects.
          </p>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Check className="text-purple-500" /> JSON Schema
          </h3>
          <p>
            For complex applications or APIs, relying on manual checks or basic structural validation is insufficient.
            JSON Schema is a powerful standard for describing the structure and constraints of your JSON data. It allows
            automated validation.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h4 className="text-lg font-medium mb-2">Simple JSON Schema Example:</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`&#x7b;
  &quot;$schema&quot;: &quot;http://json-schema.org/draft-07/schema#&quot;,
  &quot;title&quot;: &quot;Product&quot;,
  &quot;description&quot;: &quot;A simple product from a catalog&quot;,
  &quot;type&quot;: &quot;object&quot;,
  &quot;properties&quot;: &#x7b;
    &quot;id&quot;: &#x7b;
      &quot;description&quot;: &quot;The unique identifier for a product&quot;,
      &quot;type&quot;: &quot;integer&quot;
    &#x7d;,
    &quot;name&quot;: &#x7b;
      &quot;description&quot;: &quot;Name of the product&quot;,
      &quot;type&quot;: &quot;string&quot;
    &#x7d;,
    &quot;price&quot;: &#x7b;
      &quot;type&quot;: &quot;number&quot;,
      &quot;minimum&quot;: 0,
      &quot;exclusiveMinimum&quot;: true
    &#x7d;
  &#x7d;,
  &quot;required&quot;: [&quot;id&quot;, &quot;name&quot;, &quot;price&quot;]
&#x7d;`}
            </pre>
            <p className="mt-2 text-sm">
              Libraries like Ajv (JavaScript) or Pydantic (Python) can validate JSON against a schema.
            </p>
          </div>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Scaling className="text-purple-500" /> Performance and Large Data
          </h3>
          <p>
            Standard <code>JSON.parse</code> reads the entire JSON string into memory before processing. For very large
            JSON files (GBs), this is inefficient or impossible due to memory limits.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Streaming Parsers:</strong> These libraries (e.g., `jsonstream` in Node.js) parse the JSON piece
              by piece as it&apos;s read, allowing you to process data elements without loading the whole structure into
              memory.
            </li>
            <li>
              <strong>Performance Optimization:</strong> For performance-critical applications, consider faster,
              low-level parsers written in languages like C++ (often available as bindings in your language).
            </li>
            <li>
              <strong>Data Formats:</strong> For extremely large datasets, other formats like Protocol Buffers, Avro, or
              Parquet might be more suitable due to binary encoding, schemas, and better support for
              streaming/analytics.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Database className="text-purple-500" /> Querying and Transforming JSON
          </h3>
          <p>
            When dealing with complex or deeply nested JSON, accessing data can become cumbersome. Query languages
            designed for JSON, like JMESPath or JSONata, provide powerful ways to extract and transform data.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h4 className="text-lg font-medium mb-2">JMESPath Example:</h4>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`// Given JSON:
// &#x7b; &quot;users&quot;: [&#x7b; &quot;name&quot;: &quot;Alice&quot;, &quot;age&quot;: 30 &#x7d;, &#x7b; &quot;name&quot;: &quot;Bob&quot;, &quot;age&quot;: 25 &#x7d;] &#x7d;

// JMESPath query to get all user names:
// users[*].name

// Result: [&quot;Alice&quot;, &quot;Bob&quot;]`}
            </pre>
          </div>

          <h3 className="text-xl font-medium mt-4 flex items-center gap-2">
            <Shield className="text-purple-500" /> Security Considerations
          </h3>
          <p>
            While generally safe, be aware of potential security issues, especially when parsing JSON from untrusted
            sources:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>JSON Hijacking:</strong> Historically, in certain contexts (like legacy browsers), if sensitive
              data was returned as a simple JSON array (e.g., <code>[&#x7b;...&#x7d;, &#x7b;...&#x7d;]</code>), this
              response was also a valid JavaScript array literal. A malicious page could potentially read the values of
              this array. Similarly, if it was a simple object literal (<code>&#x7b;...&#x7d;</code>), it could
              potentially be assigned to a variable if the response was wrapped in parentheses. Modern browsers mitigate
              this, but it&apos;s why top-level arrays/objects for sensitive data responses were discouraged, often
              wrapped in another object (e.g., <code>&#x7b; &quot;data&quot;: [...] &#x7d;</code>) or protected by CSRF
              tokens.
            </li>
            <li>
              <strong>Denial of Service:</strong> Malformed or excessively nested JSON can potentially crash parsers or
              exhaust memory/CPU resources. Using robust parsing libraries and setting limits where possible is
              important.
            </li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Lightbulb className="text-yellow-500" /> Conclusion
          </h2>
          <p>
            From its simple key-value pairs for beginners to streaming, schema validation, and query languages for
            experts, JSON serves a wide range of needs. Understanding JSON beyond the basics unlocks the ability to
            design more robust APIs, handle larger datasets efficiently, and build more reliable systems. Regardless of
            your current skill level, continuously refining your understanding of JSON and its ecosystem will make you a
            more effective developer in the modern data landscape.
          </p>
        </div>
      </div>
    </>
  );
}
