import type { Metadata } from "next";
import { Code, List, FileText, ArrowRight, Component } from "lucide-react"; // Removed Package and Map

export const metadata: Metadata = {
  title: "Understanding Java's Relationship with JSON Formatting | Backend Concepts",
  description:
    "Explore how Java's built-in types and concepts are used when working with JSON data, discussing the need for external libraries for formatting and parsing.",
};

export default function JavaJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Code className="w-8 h-8 text-blue-600" />
        <span>Java's Relationship with JSON: Understanding "Built-in" Capabilities</span>
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web, especially
          in building APIs and microservices. Java, being a cornerstone technology for backend development,
          frequently interacts with JSON data. Developers often look for "built-in" ways to handle JSON formatting
          (converting Java objects/data structures into JSON strings) and parsing (converting JSON strings back into Java objects/data structures).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Component className="w-6 h-6 text-green-600" />
          <span>The Reality: Core JDK and JSON</span>
        </h2>
        <p>
          It's a common point of confusion: Does the core Java Development Kit (JDK) provide built-in, comprehensive
          libraries specifically for JSON formatting and parsing, similar to JavaScript's global `JSON` object (`JSON.stringify`, `JSON.parse`)
          or Python's `json` module?
        </p>
        <p className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded dark:bg-yellow-900 dark:text-yellow-200">
          <span className="font-semibold">Key Point:</span> The core Java SE (Standard Edition) platform does not include
          built-in classes like <code>JSONObject</code>, <code>JSONArray</code>, or a <code>JSONFormatter</code> within its standard
          packages (<code>java.lang</code>, <code>java.util</code>, <code>java.io</code>, etc.). Handling JSON in Java
          typically requires relying on external libraries or standard APIs implemented by external providers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Component className="w-6 h-6 text-purple-600" /> {/* Using Component again */}
          <span>Core Java Types Used to Represent JSON Structure</span>
        </h2>
        <p>
          While the JDK doesn't have dedicated JSON types, it provides fundamental building blocks that are perfectly
          suited for representing the structure of JSON data in memory *after* parsing or *before* formatting. Understanding
          this mapping is crucial, as external libraries leverage these exact types.
        </p>

        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-semibold">JSON Objects {"{}"}:</span>
            Map directly to Java's <code className="font-mono">Map&lt;String, Object&gt;</code>.
            The keys are always JSON strings (mapping to Java <code className="font-mono">String</code>), and the values can be
            any valid JSON value (mapping to Java <code className="font-mono">Object</code>, which can then hold
            another Map, a List, a String, a Number, a Boolean, or null).
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="language-java">
                {`import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

// Represents a JSON object like {"name": "Alice", "age": 30, "isStudent": false}
Map<String, Object> jsonObject = new HashMap<>();
jsonObject.put("name", "Alice"); // JSON String -> Java String
jsonObject.put("age", 30);      // JSON Number -> Java Integer (or Double, etc.)
jsonObject.put("isStudent", false); // JSON Boolean -> Java Boolean`}
              </code></pre>
            </div>
          </li>
          <li>
            <span className="font-semibold">JSON Arrays "[]" <List className="inline-block w-4 h-4" />:</span>
            Map directly to Java's <code className="font-mono">List&lt;Object&gt;</code>.
            The elements within the list can be any valid JSON value (mapping to Java <code className="font-mono">Object</code>).
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code className="language-java">
                {`// Represents a JSON array like ["Math", "Science", 101]
List<Object> jsonArray = new ArrayList<>();
jsonArray.add("Math");    // JSON String -> Java String
jsonArray.add("Science"); // JSON String -> Java String
jsonArray.add(101);       // JSON Number -> Java Integer`}
              </code></pre>
            </div>
          </li>
          <li>
            <span className="font-semibold">JSON Strings <FileText className="inline-block w-4 h-4" />:</span>
            Map directly to Java's <code className="font-mono">String</code>.
          </li>
          <li>
            <span className="font-semibold">JSON Numbers:</span>
            Map to Java's numeric primitive wrappers like <code className="font-mono">Integer</code>, <code className="font-mono">Long</code>, <code className="font-mono">Double</code>, <code className="font-mono">BigDecimal</code>, etc., depending on the number's format and required precision.
          </li>
          <li>
            <span className="font-semibold">JSON Booleans (<code className="font-mono">true</code>, <code className="font-mono">false</code>):</span>
            Map directly to Java's <code className="font-mono">Boolean</code> (or primitive <code className="font-mono">boolean</code>).
          </li>
          <li>
            <span className="font-semibold">JSON <code className="font-mono">null</code>:</span>
            Maps directly to Java's <code className="font-mono">null</code> keyword.
          </li>
        </ul>

        <p>
          So, while you can represent any JSON data structure using standard Java collections and types, the JDK
          does not provide the machinery to automatically convert a complex graph of Java objects into this Map/List structure
          and then into a correctly formatted JSON string, or vice-versa.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight className="w-6 h-6 text-red-600" />
          <span>The "Formatting" Challenge: Bridging the Gap</span>
        </h2>
        <p>
          The core task of JSON formatting (serialization) is taking a Java object (which might represent complex data
          with fields, nested objects, lists, etc.) and generating a valid JSON string representation of that object.
          Parsing (deserialization) is the reverse: taking a JSON string and creating corresponding Java objects or
          Map/List structures.
        </p>
        <p>
          Manually achieving this conversion using only core JDK features like <code className="font-mono">StringBuilder</code>
          or string concatenation for complex objects is extremely tedious, error-prone (handling quotes, commas,
          escaping special characters, nested structures), and not practical for real-world applications. You would
          essentially be writing your own JSON formatter/parser from scratch.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-medium">Why Manual Formatting is Impractical:</h3>
          <ul className="list-disc pl-6 space-y-2 my-2">
            <li>Correctly escaping quotes and backslashes within strings.</li>
            <li>Placing commas correctly between array elements and object properties, but not after the last one.</li>
            <li>Handling nested objects and arrays recursively.</li>
            <li>Formatting numbers and booleans without quotes.</li>
            <li>Representing Java <code>null</code> as JSON <code>null</code>.</li>
            <li>Dealing with different numeric types (int, long, double, BigDecimal).</li>
            <li>Mapping complex custom Java objects (POJOs) to JSON structure based on field names.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
           <FileText className="w-6 h-6 text-orange-600" />
          <span>Standardized APIs (Beyond Core JDK)</span>
        </h2>
         <p>
           While not part of the core JDK distribution itself, it's worth noting that the Java ecosystem has standardized
           APIs for JSON processing, typically part of Jakarta EE (formerly Java EE) but usable in Java SE applications
           by including implementation libraries:
         </p>
         <ul className="list-disc pl-6 space-y-2 my-4">
           <li>
             <span className="font-semibold">JSON Processing API (JSON-P, JSR 353):</span> Provides a streaming API (similar to StAX for XML) and a tree model API (similar to DOM) to parse and generate JSON. You build JSON structures programmatically using builders (e.g., <code>JsonObjectBuilder</code>, <code>JsonArrayBuilder</code>).
           </li>
           <li>
             <span className="font-semibold">JSON Binding API (JSON-B, JSR 367):</span> Provides a data binding API (similar to JAXB for XML). It uses reflection (or other mechanisms) to automatically convert Java objects (POJOs) to and from JSON strings based on conventions or annotations.
           </li>
         </ul>
         <p>
           These APIs define standard interfaces, but you need to include a specific implementation library (like Eclipse Yasson for JSON-B or Apache Johnzon for both) in your project to use them. This is the closest Java comes to a "standardized" way to handle JSON, but again, it's not bundled with the basic JDK download.
         </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
           <Code className="w-6 h-6 text-blue-600" />
          <span>Conclusion: The Role of External Libraries</span>
        </h2>
        <p>
          In summary, while Java's core library provides the essential types (<code className="font-mono">String</code>, <code className="font-mono">Map</code>, <code className="font-mono">List</code>, etc.) to conceptually
          represent JSON data structures in memory, it does not contain the built-in, automated capabilities
          needed for efficient and robust JSON formatting (serialization) or parsing (deserialization).
        </p>
        <p>
          This is why external, widely-used libraries like Jackson, Gson, JSON-P implementations (Yasson, Johnzon),
          and JSON-B implementations are indispensable in Java development for handling JSON. They provide the
          sophisticated logic for object-to-JSON and JSON-to-object conversion, handling complex types,
          annotations for customization, streaming, and performance optimizations that are well beyond the scope
          of manual coding with core JDK features.
        </p>
        <p>
          Understanding how JSON structures map to core Java types is foundational, as it's the basis upon which
          all these external libraries operate. But for actual JSON formatting and parsing, developers invariably
          rely on these battle-tested, feature-rich third-party solutions.
        </p>
      </div>
    </>
  );
}
