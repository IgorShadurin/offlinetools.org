import type { Metadata } from "next";
import { Code, FileJson, ArrowRight, FileText, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Nim Language JSON Handling Capabilities",
  description:
    "Explore the powerful and flexible JSON handling capabilities provided by Nim's standard library.",
};

export default function NimJsonHandlingPage() {
  const IconStyle = "inline-block mr-2 text-blue-600 dark:text-blue-400";

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson size={32} className={IconStyle} />
        Nim Language JSON Handling Capabilities
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and
          beyond. Nim, a systems programming language, provides robust and efficient ways to work with JSON data
          directly within its standard library, primarily through the <code>std/json</code> module. This page
          will explore how Nim empowers developers to parse, generate, and manipulate JSON with ease and
          performance.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code size={24} className={IconStyle} />
          The `std/json` Module
        </h2>
        <p>
          The core of Nim&apos;s JSON support lies in the <code>std/json</code> module. It provides procedures
          for both parsing JSON strings into Nim data structures and generating JSON strings from Nim data.
          It handles the full JSON specification, including objects, arrays, strings, numbers, booleans, and null.
        </p>
        <p>
          A key concept in <code>std/json</code> is the <code>JsonNode</code> type. This is a flexible, tree-like
          structure that can represent any JSON value. While you can work directly with <code>JsonNode</code>,
          the module also offers convenient ways to convert JSON directly to and from Nim&apos;s native types
          (like sequences, objects/tuples, strings, numbers, etc.).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRight size={24} className={IconStyle} />
          Parsing JSON in Nim
        </h2>
        <p>
          Parsing involves taking a JSON formatted string and converting it into a usable Nim representation. The
          <code>std/json</code> module offers several ways to do this.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Parsing into `JsonNode`
        </h3>
        <p>
          The most fundamental way to parse JSON is into a <code>JsonNode</code>. This is useful when the structure
          of the JSON data might be unknown or highly variable.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              import std/strutils<br/>
              <br/>
              let jsonString = &#x7b;`&#x7d; &#x7b;`&#x7d;name&#x7b;`&#x7d;: &#x7b;`&#x7d;Alice&#x7b;`&#x7d;, &#x7b;`&#x7d;age&#x7b;`&#x7d;: 30, &#x7b;`&#x7d;isStudent&#x7b;`&#x7d;: false, &#x7b;`&#x7d;courses&#x7b;`&#x7d;: [&#x7b;`&#x7d;Math&#x7b;`&#x7d;, &#x7b;`&#x7d;Science&#x7b;`&#x7d;] &#x7b;`&#x7d; &#x7b;`&#x7d;<br/>
              <br/>
              let parsedJson = parseJson(jsonString)<br/>
              <br/>
              # Accessing elements<br/>
              echo "Name: ", $parsedJson[&#x7b;`&#x7d;name&#x7b;`&#x7d;] # Output: Name: "Alice"<br/>
              echo "Age: ", $parsedJson[&#x7b;`&#x7d;age&#x7b;`&#x7d;]   # Output: Age: 30<br/>
              echo "First course: ", $parsedJson[&#x7b;`&#x7d;courses&#x7b;`&#x7d;][0] # Output: First course: "Math"
            </code>
          </pre>
        </div>
        <p>
          You can navigate the <code>JsonNode</code> using array-like accessors (<code>[]</code>) for object fields
          or array elements. Remember that accessing a field like <code>parsedJson[&#x7b;`&#x7d;name&#x7b;`&#x7d;]</code> returns another <code>JsonNode</code>.
          You often need to convert this node to a specific Nim type (e.g., using <code>getStr()</code>,
          <code>getInt()</code>, <code>getBool()</code>, etc.) or use the <code>$</code> operator for a string
          representation of the node&apos;s value.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Parsing Directly into Nim Types
        </h3>
        <p>
          For static or well-known JSON structures, Nim allows parsing directly into defined Nim types using
          the <code>to</code> procedure. This is often more convenient and type-safe.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              <br/>
              type User = object<br/>
              &nbsp;&nbsp;name*: string<br/>
              &nbsp;&nbsp;age*: int<br/>
              &nbsp;&nbsp;isStudent*: bool<br/>
              &nbsp;&nbsp;courses*: seq[string]<br/>
              <br/>
              let jsonString = &#x7b;`&#x7d; &#x7b;`&#x7d;name&#x7b;`&#x7d;: &#x7b;`&#x7d;Alice&#x7b;`&#x7d;, &#x7b;`&#x7d;age&#x7b;`&#x7d;: 30, &#x7b;`&#x7d;isStudent&#x7b;`&#x7d;: false, &#x7b;`&#x7d;courses&#x7b;`&#x7d;: [&#x7b;`&#x7d;Math&#x7b;`&#x7d;, &#x7b;`&#x7d;Science&#x7b;`&#x7d;] &#x7b;`&#x7d; &#x7b;`&#x7d;<br/>
              <br/>
              let user: User = parseJson(jsonString).to(User)<br/>
              <br/>
              echo "Name: ", user.name<br/>
              echo "Age: ", user.age<br/>
              echo "Is Student: ", user.isStudent<br/>
              echo "Courses: ", user.courses.join(", ")
            </code>
          </pre>
        </div>
        <p>
          Nim automatically generates the necessary conversion code using its powerful meta-programming
          capabilities when you use <code>.to(Type)</code>. The field names in your Nim object should match
          the keys in the JSON object (case-sensitive by default, but customizable).
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Handling Parsing Errors
        </h3>
        <p>
          Parsing invalid JSON will raise an exception, typically <code>JsonParsingError</code>. You should wrap
          parsing operations in a <code>try...except</code> block for robust error handling.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              import std/strformat<br/>
              <br/>
              let invalidJson = &#x7b;`&#x7d; &#x7b;`&#x7d;name&#x7b;`&#x7d;: &#x7b;`&#x7d;Alice&#x7b;`&#x7d;, age: 30 ] &#x7b;`&#x7d;<br/>
              <br/>
              try:<br/>
              &nbsp;&nbsp;let parsedJson = parseJson(invalidJson)<br/>
              &nbsp;&nbsp;echo "Parsing successful (should not happen)"<br/>
              except JsonParsingError as e:<br/>
              &nbsp;&nbsp;echo &fmt;&quot;Parsing error: &#x7b;e.msg&#x7d;&quot;<br/>
              except Exception as e:<br/>
              &nbsp;&nbsp;echo &fmt;&quot;An unexpected error occurred: &#x7b;e.msg&#x7d;&quot;<br/>
            </code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText size={24} className={IconStyle} />
          Generating JSON in Nim
        </h2>
        <p>
          Generating JSON involves converting Nim data structures (like objects, sequences, strings, numbers, etc.)
          into a JSON formatted string. The <code>std/json</code> module provides the <code>toJson</code>
          procedure for this purpose.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Generating from Basic Types
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              <br/>
              echo "String to JSON: ", "hello".toJson()<br/>
              echo "Number to JSON: ", (123.45).toJson()<br/>
              echo "Boolean to JSON: ", true.toJson()<br/>
              echo "Null to JSON: ", nil.toJson()
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Generating from Complex Types
        </h3>
        <p>
          Similar to parsing, <code>toJson</code> works seamlessly with Nim&apos;s sequence and object types.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              import std/strutils<br/>
              <br/>
              type Product = object<br/>
              &nbsp;&nbsp;id*: int<br/>
              &nbsp;&nbsp;name*: string<br/>
              &nbsp;&nbsp;price*: float<br/>
              &nbsp;&nbsp;tags*: seq[string]<br/>
              &nbsp;&nbsp;available*: bool<br/>
              <br/>
              let myProduct = Product(<br/>
              &nbsp;&nbsp;id: 101,<br/>
              &nbsp;&nbsp;name: "Nim Gopher Plushie",<br/>
              &nbsp;&nbsp;price: 25.99,<br/>
              &nbsp;&nbsp;tags: @["toy", "mascot", "cute"],<br/>
              &nbsp;&nbsp;available: true<br/>
              )<br/>
              <br/>
              let productJsonString = myProduct.toJson()<br/>
              echo "Generated JSON string:"<br/>
              echo productJsonString.pretty() # Use pretty() for nicely formatted output
            </code>
          </pre>
        </div>
        <p>
          The <code>pretty()</code> procedure from <code>std/json</code> is invaluable for debugging and
          producing human-readable JSON output.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Generating from `JsonNode`
        </h3>
        <p>
          You can also manually construct a <code>JsonNode</code> structure and then convert it to a string.
          This is useful when building JSON programmatically or when dealing with dynamic structures.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              <br/>
              var root = newJObject()<br/>
              root[&#x7b;`&#x7d;title&#x7b;`&#x7d;] = newJString("Nim JSON Example")<br/>
              root[&#x7b;`&#x7d;year&#x7b;`&#x7d;] = newJInt(2023)<br/>
              <br/>
              var tagsArray = newJArray()<br/>
              tagsArray.add(newJString("programming"))<br/>
              tagsArray.add(newJString("json"))<br/>
              tagsArray.add(newJString("nim"))<br/>
              root[&#x7b;`&#x7d;tags&#x7b;`&#x7d;] = tagsArray<br/>
              <br/>
              echo "Manually built JSON:"<br/>
              echo root.pretty()<br/>
            </code>
          </pre>
        </div>
        <p>
          Procedures like <code>newJObject()</code>, <code>newJArray()</code>, <code>newJString()</code>,
          <code>newJInt()</code>, <code>newJFloat()</code>, <code>newJBool()</code>, and <code>newJNull()</code>
          allow you to construct the <code>JsonNode</code> tree programmatically.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Layers size={24} className={IconStyle} />
          Working with `JsonNode` Dynamically
        </h2>
        <p>
          The <code>JsonNode</code> type provides methods for inspecting and manipulating the JSON structure.
          This is essential when you don&apos;t know the exact structure beforehand.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              import std/json<br/>
              <br/>
              let jsonString = &#x7b;`&#x7d; &#x7b;`&#x7d;person&#x7b;`&#x7d;: &#x7b;`&#x7d;name&#x7b;`&#x7d;: &#x7b;`&#x7d;Bob&#x7b;`&#x7d;, &#x7b;`&#x7d;city&#x7b;`&#x7d;: &#x7b;`&#x7d;London&#x7b;`&#x7d;, &#x7b;`&#x7d;data&#x7b;`&#x7d;: [1, 2, 3] &#x7b;`&#x7d;, &#x7b;`&#x7d;isActive&#x7b;`&#x7d;: true &#x7b;`&#x7d;<br/>
              let data = parseJson(jsonString)<br/>
              <br/>
              # Check node kind<br/>
              echo &fmt;&quot;Root is object: &#x7b;data.kind == JObject&#x7d;&quot;<br/>
              echo &fmt;&quot;&apos;person&apos; is object: &#x7b;data[&#x7b;`&#x7d;person&#x7b;`&#x7d;].kind == JObject&#x7d;&quot;<br/>
              echo &fmt;&quot;&apos;data&apos; is array: &#x7b;data[&#x7b;`&#x7d;person&#x7b;`&#x7d;][&#x7b;`&#x7d;data&#x7b;`&#x7d;].kind == JArray&#x7d;&quot;<br/>
              <br/>
              # Iterate over object fields<br/>
              if data.kind == JObject:<br/>
              &nbsp;&nbsp;for key, value in data.fields:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;echo &fmt;&quot;Field: &#x7b;key&#x7d;, Value: &#x7b;value.getStr()&#x7d;&quot; # Be careful with types here!<br/>
              <br/>
              # Iterate over array elements<br/>
              let dataArray = data[&#x7b;`&#x7d;person&#x7b;`&#x7d;][&#x7b;`&#x7d;data&#x7b;`&#x7d;]<br/>
              if dataArray.kind == JArray:<br/>
              &nbsp;&nbsp;echo "Array elements:"<br/>
              &nbsp;&nbsp;for element in dataArray.elems:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;echo &fmt;&quot;- &#x7b;element.getInt()&#x7d;&quot;<br/>
            </code>
          </pre>
        </div>
        <p>
          Key members of <code>JsonNode</code> for dynamic inspection include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><code>kind</code>: Indicates the type of the JSON node (<code>JObject</code>, <code>JArray</code>, <code>JString</code>, <code>JInt</code>, <code>JFloat</code>, <code>JBool</code>, <code>JNull</code>).</li>
          <li><code>fields</code>: An iterator for object nodes, yielding key-value pairs (string key, <code>JsonNode</code> value).</li>
          <li><code>elems</code>: An iterator for array nodes, yielding <code>JsonNode</code> elements.</li>
          <li>Type conversion procedures: <code>getStr()</code>, <code>getInt()</code>, <code>getFloat()</code>, <code>getBool()</code>, etc. These procedures raise an exception if the node&apos;s kind doesn&apos;t match the requested type.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code size={24} className={IconStyle} />
          Performance Considerations
        </h2>
        <p>
          Nim&apos;s standard library is generally designed for performance. The <code>std/json</code> module
          is implemented in Nim itself and is quite efficient. For most common use cases, it provides
          excellent performance without needing external libraries.
        </p>
        <p>
          Parsing directly into Nim types using <code>.to(Type)</code> is often more performant than building
          a <code>JsonNode</code> tree first and then traversing it, as it avoids the intermediate representation
          and allows for more direct memory mapping where possible.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRight size={24} className={IconStyle} />
          Beyond `std/json` (Briefly)
        </h2>
        <p>
          While <code>std/json</code> is powerful, the Nim ecosystem also has third-party libraries that might
          offer alternative approaches or optimizations for specific scenarios (e.g., very large JSON files,
          streaming parsing, or alternative serialization formats). However, for standard JSON tasks,
          <code>std/json</code> is usually sufficient and recommended due to being part of the standard library
          and its tight integration with Nim&apos;s type system.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Nim&apos;s <code>std/json</code> module provides a comprehensive and efficient set of tools for handling
          JSON data. Whether you need to parse dynamic JSON structures into flexible <code>JsonNode</code> trees
          or convert well-defined JSON directly to and from Nim&apos;s static types, the standard library has
          you covered. Its ease of use, performance characteristics, and seamless integration with Nim&apos;s
          features like type inference and macros make JSON handling in Nim a productive experience for
          developers of all levels.
        </p>
      </div>
    </>
  );
}
