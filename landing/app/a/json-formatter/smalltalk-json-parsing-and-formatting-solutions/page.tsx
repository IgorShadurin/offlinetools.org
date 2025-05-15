import type { Metadata } from "next";
import {
  BookOpen,
  FileJson, // Changed Parse to FileJson
  CodeXml,
  Zap,
  Share2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Smalltalk JSON Parsing and Formatting Solutions | Offline Tools",
  description:
    "Explore how to parse and format JSON data within the Smalltalk programming environment, covering common libraries and techniques.",
};

export default function SmalltalkJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Smalltalk JSON Parsing and Formatting Solutions
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen className="mr-2 text-blue-500" />
            Introduction: JSON and Smalltalk
          </h2>
          <p className="mb-4">
            JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and beyond. Its simplicity and readability make it ideal for configurations, APIs, and data storage. For Smalltalk developers, interacting with the external world often requires the ability to both consume (parse) JSON data received from other systems and produce (format) JSON data to send out.
          </p>
          <p>
            While Smalltalk environments like Pharo, Squeak, or VisualWorks have different approaches and available libraries, the core concepts of converting JSON text into Smalltalk objects (like Dictionaries, Arrays, Strings, Numbers, Booleans, and <code>nil</code>) and vice-versa remain consistent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-2 text-green-500" /> {/* Changed Parse to FileJson */}
            Parsing JSON in Smalltalk
          </h2>
          <p className="mb-4">
            Parsing JSON involves taking a JSON string and converting it into a Smalltalk object structure that mirrors the JSON data. A JSON object <code>&#x7b; ... &#x7d;</code> typically becomes a Smalltalk <code>Dictionary</code>, a JSON array <code>[ ... ]</code> becomes a Smalltalk <code>Array</code>, strings become <code>String</code>s, numbers become <code>Number</code>s, booleans become <code>Boolean</code>s (<code>true</code> or <code>false</code>), and JSON <code>null</code> becomes Smalltalk <code>nil</code>.
          </p>
          <p className="mb-4">
            Most Smalltalk environments provide or recommend using specific libraries for robust JSON parsing. Popular options include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>NeoJSON:</strong> A popular, modern library available in Pharo and Squeak, known for its speed and flexibility, including support for mapping JSON to specific Smalltalk classes (serialization/deserialization).
            </li>
            <li>
              <strong>Zinc JSON:</strong> Part of the Zinc HTTP client/server stack, often available in Pharo and Squeak, providing basic JSON parsing and formatting.
            </li>
            <li>
              <strong>Built-in/Older Libraries:</strong> Some older or specific distributions might have built-in or less common JSON parsers.
            </li>
          </ul>
          <p className="mb-4">
            Regardless of the library, the basic interaction often involves sending a message to a JSON parser object or class, providing the JSON string or a read stream containing the JSON data.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Parsing with NeoJSON (Pharo/Squeak)</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| jsonString jsonObject |
jsonString := '{ "name": "Alice", "age": 30, "isStudent": false, "courses": ["Math", "Science"], "address": null }'.

"Use NeoJSONReader to parse the string"
jsonObject := NeoJSONReader fromString: jsonString.

"Now jsonObject is a Smalltalk Dictionary"
"You can access its elements"
jsonObject at: 'name'.      "Returns: 'Alice'"
jsonObject at: 'age'.       "Returns: 30"
jsonObject at: 'isStudent'. "Returns: false"
jsonObject at: 'courses'.   "Returns: #('Math' 'Science')"
jsonObject at: 'address'.   "Returns: nil"

"You can inspect the resulting object structure"
"jsonObject inspect.`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Parsing with Zinc JSON (Pharo/Squeak)</h3>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| jsonString jsonObject |
jsonString := '{ "name": "Alice", "age": 30 }'.

"Use ZnJsonParser to parse the string"
jsonObject := ZnJsonParser parse: jsonString.

"jsonObject is typically a Dictionary"
jsonObject at: 'name'. "Returns: 'Alice'"`}
              </code>
            </pre>
          </div>

          <p className="mt-4">
            These examples show the basic pattern: take a string, pass it to the parser, and get back a Smalltalk object (usually a <code>Dictionary</code> or <code>Array</code>) representing the JSON structure. The parser handles the complexity of tokenizing and structuring the data according to the JSON specification.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
             <CodeXml className="mr-2 text-purple-500" />
            Formatting JSON in Smalltalk
          </h2>
          <p className="mb-4">
            Formatting JSON involves converting a Smalltalk object structure (typically a <code>Dictionary</code> or <code>Array</code> containing valid JSON-serializable types) into a JSON string. This is essential when your Smalltalk application needs to send data to an external API, a web browser, or save it to a file in JSON format.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Formatting with NeoJSON (Pharo/Squeak)</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| smalltalkObject jsonString |
"Create a Smalltalk object structure"
smalltalkObject := Dictionary new
  at: 'product' put: 'Laptop';
  at: 'price' put: 1200.50;
  at: 'inStock' put: true;
  at: 'tags' put: #('electronics' 'computer');
  at: 'details' put: nil;
  yourself.

"Use NeoJSONWriter to format the object into a string"
jsonString := NeoJSONWriter toString: smalltalkObject.

"jsonString will be something like: {\"product\":\"Laptop\",\"price\":1200.5,\"inStock\":true,\"tags\":[\"electronics\",\"computer\"],\"details\":null}"
"This is the compact format by default."

"For pretty-printing (with indentation)"
"jsonString := NeoJSONWriter prettyPrint: smalltalkObject."

"prettyPrint output example:
{
  \"product\": \"Laptop\",
  \"price\": 1200.5,
  \"inStock\": true,
  \"tags\": [
    \"electronics\",
    \"computer\"
  ],
  \"details\": null
}"`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Formatting with Zinc JSON (Pharo/Squeak)</h3>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| smalltalkObject jsonString |
smalltalkObject := Dictionary new
  at: 'status' put: 'ok';
  at: 'code' put: 200;
  yourself.

"Use ZnJsonWriter to format"
jsonString := ZnJsonWriter write: smalltalkObject.

"jsonString will be something like: {\"status\":\"ok\",\"code\":200}"`}
              </code>
            </pre>
          </div>
           <p className="mt-4">
            Formatting typically offers options for producing a compact string (minimal whitespace) or a pretty-printed string (with indentation and newlines) for readability. The choice depends on whether the output is for machine consumption (compact) or human inspection (pretty-printed).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-orange-500" />
            Performance Considerations
          </h2>
          <p className="mb-4">
            For large JSON payloads or high-throughput applications, parser and formatter performance can be critical. Factors affecting performance include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Library Implementation:</strong> Different Smalltalk JSON libraries have varying levels of optimization. Libraries like NeoJSON are often benchmarked and optimized for speed.
            </li>
            <li>
              <strong>Stream vs. String:</strong> Reading directly from a stream (e.g., a network connection or file) can sometimes be more memory efficient than loading the entire JSON content into a single String object before parsing, especially for very large inputs. Similarly, writing to a stream can be more efficient for formatting large outputs.
            </li>
             <li>
              <strong>Object Structure Complexity:</strong> Deeply nested or very large dictionaries/arrays can impact both parsing and formatting times.
            </li>
             <li>
              <strong>Memory Usage:</strong> Parsing large JSON can create a significant number of Smalltalk objects in memory. Be mindful of memory usage in long-running processes.
            </li>
          </ul>
           <p className="mt-4">
            When performance is paramount, it&apos;s advisable to profile different libraries with your specific workload and choose the most efficient one.
           </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Share2 className="mr-2 text-teal-500" />
            Integration and Interoperability
          </h2>
          <p className="mb-4">
            JSON support in Smalltalk is crucial for integrating with a wide range of technologies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Web Services (APIs):</strong> Consuming REST APIs that return JSON, or building Smalltalk-based web services that return JSON responses. Libraries like Zinc (which includes JSON support) are often used for the HTTP communication layer.
            </li>
            <li>
              <strong>Configuration Files:</strong> Reading application configuration from JSON files.
            </li>
             <li>
              <strong>Data Storage:</strong> Serializing Smalltalk objects into JSON for storage or transfer. More advanced libraries like NeoJSON provide object mapping features for this.
            </li>
            <li>
              <strong>Messaging Queues:</strong> Exchanging data in JSON format via messaging systems.
            </li>
          </ul>
           <p className="mt-4">
            By mapping JSON types directly to standard Smalltalk collection and primitive types, JSON libraries provide a convenient bridge between the Smalltalk object world and the string-based data format of JSON.
           </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen className="mr-2 text-blue-500" />
            Conclusion
          </h2>
          <p>
            Smalltalk environments are well-equipped to handle JSON data thanks to robust and efficient libraries like NeoJSON and Zinc JSON. Understanding how to parse JSON strings into Smalltalk objects and format Smalltalk objects into JSON strings is a fundamental skill for interoperability. While the specific messages might vary slightly between libraries and Smalltalk dialects, the core principle of converting between a standard text format and the rich Smalltalk object model remains consistent, enabling seamless data exchange with the broader technical landscape.
          </p>
        </section>
      </div>
    </>
  );
}