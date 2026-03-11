import type { Metadata } from "next";
import { Code, List, FileText, ArrowRight, Component } from "lucide-react";

export const metadata: Metadata = {
  title: "Does Java Have Built-In JSON Formatting? What the JDK Actually Includes | Backend Concepts",
  description:
    "Learn what Java can and cannot do with JSON out of the box, why the JDK still does not include a built-in JSON formatter/parser, and when to use Jakarta JSON-P or JSON-B.",
};

export default function JavaJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Code className="w-8 h-8 text-blue-600" />
        <span>Understanding Java&apos;s Relationship with JSON Formatting</span>
      </h1>

      <div className="space-y-6">
        <p>
          If you are looking for a Java equivalent of JavaScript&apos;s <code>JSON.stringify()</code> and{" "}
          <code>JSON.parse()</code>, the practical answer is simple: Java SE still does not ship a built-in JSON
          formatter or parser. The JDK gives you the core building blocks for holding JSON-shaped data in memory, but
          turning that data into valid JSON text, pretty-printing it, or binding it to POJOs still requires a JSON
          library.
        </p>
        <p>
          That distinction matters because many searchers are not really asking whether Java can store strings, numbers,
          lists, and maps. They want to know whether modern Java can parse API responses, serialize application objects,
          and output readable JSON without adding dependencies. For those tasks, the answer is still no.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Component className="w-6 h-6 text-green-600" />
          <span>Short Answer: What the JDK Includes and What It Does Not</span>
        </h2>
        <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded dark:bg-yellow-900 dark:text-yellow-200">
          <span className="font-semibold">Key point:</span> current Java SE releases do not include built-in classes
          such as <code>JSONObject</code>, <code>JSONArray</code>, or a standard <code>JSON</code> utility with parse
          and pretty-print methods. If you need real JSON handling, you add a library.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-medium">Built in:</h3>
          <ul className="list-disc pl-6 space-y-2 my-2">
            <li>
              Core types like <code>Map</code>, <code>List</code>, <code>String</code>, numbers, booleans, and{" "}
              <code>null</code>.
            </li>
            <li>
              Utilities such as <code>java.net.http.HttpClient</code> for fetching JSON text from APIs.
            </li>
            <li>String tools like text blocks and <code>StringBuilder</code> for assembling text.</li>
          </ul>
          <h3 className="text-xl font-medium mt-4">Not built in:</h3>
          <ul className="list-disc pl-6 space-y-2 my-2">
            <li>Parsing a JSON string into an object model.</li>
            <li>Serializing a POJO or record to valid JSON.</li>
            <li>Pretty-printing JSON with correct escaping and nesting.</li>
            <li>Schema-aware validation or annotation-based JSON binding.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Component className="w-6 h-6 text-purple-600" />
          <span>What Java Can Represent Natively</span>
        </h2>
        <p>
          Java does map cleanly to JSON concepts at the data-structure level. That is why JSON libraries feel natural
          to use in Java: they are mostly translating between JSON text and familiar Java types.
        </p>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-semibold">JSON Objects {"{}"}:</span>
            Often represented as <code className="font-mono">Map&lt;String, Object&gt;</code>.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code className="language-java">
                  {`import java.util.Map;
import java.util.HashMap;

// Holds JSON-shaped data in memory.
Map<String, Object> jsonObject = new HashMap<>();
jsonObject.put("name", "Alice");
jsonObject.put("age", 30);
jsonObject.put("active", true);`}
                </code>
              </pre>
            </div>
          </li>
          <li>
            <span className="font-semibold">
              JSON Arrays "[]" <List className="inline-block w-4 h-4" />:
            </span>
            Often represented as <code className="font-mono">List&lt;Object&gt;</code>.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <code className="language-java">
                  {`import java.util.ArrayList;
import java.util.List;

List<Object> jsonArray = new ArrayList<>();
jsonArray.add("Math");
jsonArray.add("Science");
jsonArray.add(101);`}
                </code>
              </pre>
            </div>
          </li>
          <li>
            <span className="font-semibold">
              JSON Strings <FileText className="inline-block w-4 h-4" />:
            </span>
            map to Java <code className="font-mono">String</code>.
          </li>
          <li>
            <span className="font-semibold">JSON Numbers:</span>
            map to Java numeric types such as <code className="font-mono">Integer</code>,{" "}
            <code className="font-mono">Long</code>, <code className="font-mono">Double</code>, or{" "}
            <code className="font-mono">BigDecimal</code>.
          </li>
          <li>
            <span className="font-semibold">
              JSON Booleans (<code className="font-mono">true</code>, <code className="font-mono">false</code>):
            </span>
            map to Java <code className="font-mono">Boolean</code> or <code className="font-mono">boolean</code>.
          </li>
          <li>
            <span className="font-semibold">
              JSON <code className="font-mono">null</code>:
            </span>
            maps to Java <code className="font-mono">null</code>.
          </li>
        </ul>

        <p>
          The important limit is that these are only in-memory representations. A <code>Map</code> is not automatically
          JSON text, and a Java object is not automatically serializable to JSON just because its fields look simple.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight className="w-6 h-6 text-red-600" />
          <span>Why “JDK Only” JSON Formatting Breaks Down Fast</span>
        </h2>
        <p>
          JSON formatting is not just about putting braces around text. A serializer has to emit valid JSON syntax,
          escape strings correctly, handle nested objects and arrays, preserve number types sensibly, and decide how to
          represent custom classes.
        </p>
        <p>
          That is why manually generating JSON with <code className="font-mono">StringBuilder</code>, text blocks, or
          string concatenation is usually a bad idea outside of trivial hard-coded payloads. In real applications, you
          quickly end up rebuilding features that established JSON libraries already solve.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-medium">Common mistakes:</h3>
          <ul className="list-disc pl-6 space-y-2 my-2">
            <li>
              Using <code>Map.toString()</code> and getting output like <code>{`{name=Alice, age=30}`}</code>, which is
              not valid JSON.
            </li>
            <li>
              Assuming <code>String.format()</code> will handle escaping for quotes, backslashes, and control
              characters.
            </li>
            <li>Assuming a record or POJO <code>toString()</code> result is a JSON serializer.</li>
            <li>Forgetting that nested arrays and objects need recursive handling.</li>
            <li>
              Building JSON by hand and later discovering bugs around commas, <code>null</code>, or Unicode escaping.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileText className="w-6 h-6 text-orange-600" />
          <span>The Closest Thing to a Standard Java JSON API</span>
        </h2>
        <p>
          If you want a standardized API rather than a vendor-specific one, the closest answer is Jakarta JSON
          Processing (JSON-P). It is not bundled with the JDK, but it defines portable APIs for parsing, generating,
          transforming, and querying JSON documents.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-semibold">Use JSON-P when:</span> you want a standard tree API or streaming API and
            need to parse, generate, or pretty-print JSON in a portable way.
          </li>
          <li>
            <span className="font-semibold">Use JSON-B when:</span> you want a standard binding layer that converts
            Java objects to and from JSON. Modern JSON-B releases target Java SE 11+.
          </li>
        </ul>
        <p>
          In both cases, you still need dependencies on your classpath. For JSON-P that usually means the API jar plus
          an implementation. For JSON-B it means the API jar plus a binding implementation such as Eclipse Yasson.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-600" />
          <span>Pretty-Printing Example with Jakarta JSON-P</span>
        </h2>
        <p>
          Here is a small example of formatting JSON in a standardized Java API. This is not JDK-only code; it works
          after you add Jakarta JSON-P to your project.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <pre>
            <code className="language-java">
              {`import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonWriter;
import jakarta.json.JsonWriterFactory;
import jakarta.json.stream.JsonGenerator;

import java.io.StringWriter;
import java.util.Map;

JsonObject value = Json.createObjectBuilder()
    .add("name", "Alice")
    .add("age", 30)
    .add("active", true)
    .build();

Map<String, ?> config = Map.of(JsonGenerator.PRETTY_PRINTING, true);
JsonWriterFactory writerFactory = Json.createWriterFactory(config);

StringWriter out = new StringWriter();
try (JsonWriter writer = writerFactory.createWriter(out)) {
    writer.writeObject(value);
}

String prettyJson = out.toString();`}
            </code>
          </pre>
        </div>
        <p>
          This gives you readable JSON output and avoids the escaping and comma-placement mistakes that show up in
          manual string construction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Component className="w-6 h-6 text-teal-600" />
          <span>How to Choose the Right Approach</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            If you only need to move JSON around as raw text, the JDK is enough. You can fetch it, store it, and pass
            it through unchanged.
          </li>
          <li>
            If you need to parse or pretty-print JSON with a standards-based API, use Jakarta JSON Processing.
          </li>
          <li>
            If you need object-to-JSON mapping for DTOs, records, or API payloads, use Jakarta JSON Binding or a
            widely adopted third-party library such as Jackson.
          </li>
          <li>
            If you are working in Spring or another framework that already standardizes on a JSON library, follow that
            stack instead of mixing multiple JSON approaches without a reason.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-600" />
          <span>Bottom Line</span>
        </h2>
        <p>
          Java has a strong relationship with JSON in practice, but not because the JDK has a built-in JSON module. The
          JDK gives you the primitives that resemble JSON structures, while real parsing, serialization, and
          pretty-printing still come from JSON libraries.
        </p>
        <p>
          So if your real question is &quot;Does Java have built-in JSON formatting capabilities?&quot;, the answer is
          no. If your next question is &quot;What should I use instead?&quot;, the cleanest standards-based answer is
          Jakarta JSON-P for parsing and generating JSON, and JSON-B or a framework-standard library when you need
          object binding.
        </p>
      </div>
    </>
  );
}
