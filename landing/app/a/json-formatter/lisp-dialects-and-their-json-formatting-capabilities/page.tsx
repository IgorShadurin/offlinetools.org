import type { Metadata } from "next";
import { ArrowRightLeft, Code, FileJson, ListTree, Inspect, FileOutput, Braces } from "lucide-react";

export const metadata: Metadata = {
  title: "Lisp Dialects and Their JSON Formatting Capabilities",
  description:
    "Explore how different Lisp dialects handle JSON parsing and serialization, facilitating interoperability with modern data formats.",
};

export default function LispJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <ArrowRightLeft className="w-8 h-8" />
        <span>Lisp Dialects and JSON Interoperability</span>
      </h1>

      <div className="space-y-6">
        <p>
          Lisp, with its iconic S-expressions, might seem worlds apart from JSON, the prevalent data interchange format
          of the web. Lisp structures are deeply nested lists and atoms, while JSON relies on key-value objects and
          ordered arrays. However, in practice, Lisp systems frequently need to interact with the outside world, and
          that world speaks JSON.
        </p>
        <p>
          Fortunately, the inherent flexibility and powerful data manipulation capabilities of Lisp make integrating
          with JSON not only possible but often quite elegant. This page explores how various Lisp dialects handle the
          challenge of parsing JSON into native Lisp data structures and serializing Lisp data into JSON strings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson className="w-6 h-6" />
          <span>Why JSON in Lisp?</span>
        </h2>
        <p>
          The primary reason is <strong>interoperability</strong>. Lisp applications often need to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Communicate with web services (REST APIs, etc.) that exchange data in JSON.</li>
          <li>Process configuration files or data dumps stored in JSON format.</li>
          <li>Generate JSON output for client-side applications or other systems.</li>
        </ul>
        <p>
          Mapping JSON data into structures that are idiomatic to the Lisp dialect being used is key to making this
          interaction seamless.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListTree className="w-6 h-6" />
          <span>Mapping JSON to Lisp Data Structures</span>
        </h2>
        <p>
          JSON defines a few fundamental data types: objects, arrays, strings, numbers, booleans (true/false), and null.
          Lisp dialects have their own equivalents, and the mapping typically follows these conventions:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Object (`{}`)</strong>: Maps to a key-value store. Common Lisp often uses association lists
            (alists) or hash tables. Scheme might use alists or records. Clojure prominently uses maps. The keys (JSON
            strings) can be mapped to Lisp strings or keywords.
          </li>
          <li>
            <strong>JSON Array (`[]`)</strong>: Maps to an ordered collection. Lisp lists or vectors are common
            representations.
          </li>
          <li>
            <strong>JSON String (`"..."`)</strong>: Maps directly to Lisp strings.
          </li>
          <li>
            <strong>JSON Number (`123`, `4.5`)</strong>: Maps to Lisp numbers (integers, floats, rationals, etc.).
          </li>
          <li>
            <strong>JSON Boolean (`true`, `false`)</strong>: Maps to the dialect's boolean equivalents (e.g., `T`/`NIL`
            in Common Lisp, `#t`/`#f` in Scheme, `true`/`false` in Clojure).
          </li>
          <li>
            <strong>JSON Null (`null`)</strong>: Maps to the dialect's null/nil representation (e.g., `NIL` in Common
            Lisp, `null` object or specific value in Scheme, `nil` in Clojure).
          </li>
        </ul>
        <p>
          The choice of mapping (e.g., alist vs. hash table for objects, lists vs. vectors for arrays, string keys vs.
          keyword keys) often depends on the specific Lisp library being used and performance considerations.
          Clojure&apos;s strong support for persistent maps with keyword keys makes it particularly well-suited for
          working with JSON, often mapping <code>{`{"name": "Alice"}`}</code> to <code>{`{:name "Alice"}`}</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Inspect className="w-6 h-6" />
          <span>Parsing JSON in Different Lisp Dialects</span>
        </h2>
        <p>
          Parsing involves taking a JSON string and converting it into the corresponding Lisp data structures. Most
          dialects rely on external libraries for robust JSON parsing.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Common Lisp: Using <code>cl-json</code> (Example)
        </h3>
        <p>
          <code>cl-json</code> is a popular library for Common Lisp. By default, it often maps JSON objects to
          association lists or hash tables and arrays to lists. You can often configure the mapping.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Parsing a JSON object:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(ql:quickload "cl-json") ; Load the library (if not already loaded)`}
              <br />
              <br />
              {`(let ((json-string "{\\"name\\": \\"Alice\\", \\"age\\": 30, \\"isStudent\\": false}"))`}
              <br />
              {`  (json:decode-json-from-string json-string))`}
              <br />
              <br />
              {`;; Possible output (association list, string keys):`}
              <br />
              {`;; (("name" . "Alice") ("age" . 30) ("isStudent" . NIL))`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Parsing a JSON array:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(let ((json-string "[10, \\"hello\\", true, null]"))`}
              <br />
              {`  (json:decode-json-from-string json-string))`}
              <br />
              <br />
              {`;; Possible output (list):`}
              <br />
              {`;; (10 "hello" T NIL)`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Scheme: Using <code>json-p</code> (Example - Syntax may vary by implementation)
        </h3>
        <p>
          Schemes have various libraries like <code>json-p</code> (part of SRFI 180). Mapping conventions can differ.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Parsing a JSON object:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`; Assuming json-p is available and imported`}
              <br />
              {`(import (json-p))`}
              {/* Example import, syntax varies */}
              <br />
              <br />
              {`(let ((json-string "{\\"city\\": \\"London\\", \\"population\\": 9000000}"))`}
              <br />
              {`  (json-read (open-string-input-port json-string)))`}
              {/* Example function call */}
              <br />
              <br />
              {`;; Possible output (e.g., Scheme record type or alist):`}
              <br />
              {`;; #&lt;json-object ("city" . "London") ("population" . 9000000)&gt;`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Parsing a JSON array:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(let ((json-string "[\\"apple\\", \\"banana\\", \\"cherry\\"]"))`}
              <br />
              {`  (json-read (open-string-input-port json-string)))`}
              <br />
              <br />
              {`;; Possible output (e.g., Scheme vector):`}
              <br />
              {`;; #("apple" "banana" "cherry")`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Clojure: Using <code>clojure.data.json</code> or <code>cheshire</code> (Example)
        </h3>
        <p>
          Clojure&apos;s built-in data structures (maps, vectors) align well with JSON. Libraries like{" "}
          <code>clojure.data.json</code> or the faster <code>cheshire</code> are commonly used. Keys are often mapped to
          Clojure keywords by default.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Parsing a JSON object:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(require '[clojure.data.json :as json])`}
              <br />
              <br />
              {`(let [json-string "{\\"product\\": \\"Laptop\\", \\"price\\": 1200.50, \\"inStock\\": true}"]`}
              <br />
              {`  (json/read-json json-string))`}
              {/* Reads into Clojure data structure */}
              <br />
              <br />
              {`;; Output (Clojure map with keyword keys by default):`}
              <br />
              {`;; {:product "Laptop" :price 1200.5 :inStock true}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Parsing a JSON array:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(require '[clojure.data.json :as json])`}
              <br />
              <br />
              {`(let [json-string "[{\\"id\\": 1}, {\\"id\\": 2}]"]`}
              <br />
              {`  (json/read-json json-string))`}
              {/* Reads into Clojure data structure */}
              <br />
              <br />
              {`;; Output (Clojure vector of maps):`}
              <br />
              {`;; [{:id 1} {:id 2}]`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileOutput className="w-6 h-6" />
          <span>Serializing Lisp Data to JSON</span>
        </h2>
        <p>
          Serialization is the reverse process: converting Lisp data structures back into a JSON string. Libraries
          provide functions to handle this, respecting the standard JSON format.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Common Lisp: Using <code>cl-json</code> (Example)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Serializing a Common Lisp alist:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(ql:quickload "cl-json")`}
              <br />
              <br />
              {`(let ((lisp-data '(("user" . "Bob") ("isActive" . T) ("roles" "admin" "editor"))))`}
              <br />
              {`  (json:encode-json-to-string lisp-data))`}
              {/* Requires careful mapping definition often */}
              <br />
              <br />
              {`;; Output (string):`}
              <br />
              {`;; "{\\"user\\":\\"Bob\\",\\"isActive\\":true,\\"roles\\":[\\"admin\\",\\"editor\\"]}"`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Note: Serializing often requires the Lisp structure to conform to what the library expects, or you might
            need to provide custom mappers. Alists are often treated as objects, and lists as arrays. The library
            handles basic types.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Scheme: Using <code>json-p</code> (Example)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Serializing Scheme data:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(import (json-p))`}
              {/* Example import */}
              <br />
              <br />
              {`; Assuming a Scheme record or alist representing a JSON object`}
              <br />
              {`(let ((scheme-data '#&lt;json-object ("id" . 101) ("items" . #("itemA" "itemB"))&gt;))`}
              <br />
              {`  (with-output-to-string (lambda () (json-write scheme-data))))`}
              {/* Example function call */}
              <br />
              <br />
              {`;; Output (string):`}
              <br />
              {`;; "{\\"id\\":101,\\"items\\":[\\"itemA\\",\\"itemB\\"]}"`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Clojure: Using <code>clojure.data.json</code> or <code>cheshire</code> (Example)
        </h3>
        <p>Clojure&apos;s maps (often with keyword keys) and vectors map naturally to JSON objects and arrays.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Serializing a Clojure map and vector:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`(require '[clojure.data.json :as json])`}
              <br />
              <br />
              {`(let [clj-map {:firstName "Jane" :lastName "Doe" :age 25}]`}
              <br />
              {`  (json/write-json clj-map))`}
              {/* Writes to *out* by default */}
              <br />
              <br />
              {`;; Output (string - requires capturing *out* or using a writer):`}
              <br />
              {`;; "{\\"firstName\\":\\"Jane\\",\\"lastName\\":\\"Doe\\",\\"age\\":25}"`}
              <br />
              <br />
              {`(let [clj-vector ["red" "green" "blue"]]`}
              <br />
              {`  (json/write-json clj-vector))`}
              {/* Writes to *out* */}
              <br />
              <br />
              {`;; Output (string):`}
              <br />
              {`;; "[\\"red\\",\\"green\\",\\"blue\\"]"`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Libraries often provide options for pretty-printing (adding whitespace and indentation) during serialization
            for human readability, e.g., <code>(json/write-json clj-map :pretty true)</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>Key Considerations and Challenges</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Type Fidelity:</strong> Ensuring that Lisp numbers map correctly to JSON numbers (e.g., dealing
            with integers vs. floats, large numbers).
          </li>
          <li>
            <strong>Key Representation:</strong> Deciding whether JSON string keys should map to Lisp strings or
            keywords (Clojure often prefers keywords, Common Lisp/Scheme often use strings in alists/hash tables).
            Consistency is important.
          </li>
          <li>
            <strong>Null/Nil Mapping:</strong> Correctly handling the conversion between JSON&apos;s <code>null</code>{" "}
            and the dialect&apos;s representation of nothingness (<code>NIL</code>, <code>nil</code>, specific object).
          </li>
          <li>
            <strong>Error Handling:</strong> Robustly handling malformed JSON input during parsing.
          </li>
          <li>
            <strong>Performance:</strong> For high-throughput applications, the performance of the JSON library can be
            critical. Some libraries are significantly faster than others (e.g., <code>cheshire</code> in Clojure vs.{" "}
            <code>clojure.data.json</code>).
          </li>
          <li>
            <strong>Streaming vs. In-Memory:</strong> For very large JSON documents, streaming parsers that process the
            data chunk by chunk without loading the entire structure into memory are necessary. Some libraries offer
            this.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Braces className="w-6 h-6" />
          <span>Conclusion</span>
        </h2>
        <p>
          Despite their syntactical differences, Lisp dialects and JSON coexist peacefully thanks to well-developed
          libraries. These libraries provide the essential functions for transforming JSON data into native Lisp
          structures and vice-versa. While the specific data structure mapping might vary slightly between dialects and
          libraries, the underlying principles of parsing and serialization are standard. Leveraging these tools allows
          Lisp applications to effectively participate in the modern data landscape, exchanging information seamlessly
          with systems that rely on JSON.
        </p>
      </div>
    </>
  );
}
