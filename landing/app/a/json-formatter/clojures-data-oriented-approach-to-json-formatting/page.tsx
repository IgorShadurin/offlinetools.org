import type { Metadata } from "next";
import { Database, Code, Wrench, Feather, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Clojure's Data-Oriented Approach to JSON Formatting | Offline Tools",
  description:
    "Explore how Clojure's data-oriented philosophy simplifies JSON handling through immutable data structures and generic functions.",
};

export default function ClojureJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Database className="w-8 h-8 mr-3 text-blue-600" /> Clojure&apos;s Data-Oriented Approach to JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          Clojure is known for its strong emphasis on a <strong>data-oriented programming</strong> style. Instead of
          building complex hierarchies of objects with methods, the focus is on simple, immutable data structures and
          functions that operate on them. This philosophy aligns remarkably well with handling data formats like JSON,
          which are, at their core, just structured data.
        </p>
        <p>
          This article explores how Clojure&apos;s core data structures and its approach to data manipulation make
          processing and formatting JSON straightforward and powerful.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Box className="w-6 h-6 mr-2 text-green-600" /> JSON and Clojure: A Natural Fit
        </h2>
        <p>
          JSON defines a small set of data types: objects, arrays, strings, numbers, booleans, and null. Clojure has
          direct, idiomatic counterparts for almost all of these, typically implemented as persistent (immutable)
          collections:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            JSON Object <code>{`{}`}</code> → Clojure Map <code>{`{}`}</code> (key-value pairs)
          </li>
          <li>
            JSON Array <code>{`[]`}</code> → Clojure Vector <code>{`[]`}</code> (ordered sequence)
          </li>
          <li>JSON String → Clojure String</li>
          <li>JSON Number → Clojure Number (various types)</li>
          <li>
            JSON Boolean → Clojure Boolean (<code>true</code>, <code>false</code>)
          </li>
          <li>
            JSON Null → Clojure <code>nil</code>
          </li>
        </ul>
        <p>
          This direct mapping means that when you parse a JSON string in Clojure, it naturally turns into familiar
          Clojure data structures that you already know how to work with. There&apos;s no need for a separate object
          model specific to the JSON structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-600" /> Parsing JSON in Clojure
        </h2>
        <p>
          Clojure&apos;s ecosystem provides libraries for JSON parsing and generation. The most common is{" "}
          <code>clojure.data.json</code>. Parsing a JSON string turns it into Clojure&apos;s standard maps and vectors.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Parsing Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
(require '[clojure.data.json :as json])

(def json-string "{\\"name\\": \\"Alice\\", \\"age\\": 30, \\"isStudent\\": false, \\"courses\\": [\\"Math\\", \\"Science\\"]}")

;; Parse the JSON string into Clojure data
(def parsed-data (json/read-str json-string))

;; What does it look like?
;; {"name" "Alice", "age" 30, "isStudent" false, "courses" ["Math" "Science"]}
;; This is a Clojure map!
`}
            </pre>
          </div>
        </div>
        <p>
          Notice how the JSON object maps directly to a Clojure map, and the JSON array maps directly to a Clojure
          vector. String keys in JSON become string keys in the Clojure map by default (though keywordizing keys is a
          common option).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="w-6 h-6 mr-2 text-orange-600" /> Manipulating JSON Data (as Clojure Data)
        </h2>
        <p>
          This is where the power of the data-oriented approach truly shines. Once your JSON is parsed into Clojure maps
          and vectors, you use Clojure&apos;s rich standard library of functions to manipulate the data. These functions
          are generic and work uniformly across different collection types.
        </p>
        <p>
          Because Clojure&apos;s data structures are immutable, any &quot;modification&quot; operation (like adding a
          key, updating a value, filtering a collection) returns a *new* version of the data structure, leaving the
          original untouched. This makes data flow easier to reason about and reduces the risk of unexpected side
          effects.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Manipulation Examples:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
;; Assume parsed-data is {"name" "Alice", "age" 30, "isStudent" false, "courses" ["Math" "Science"]}

;; Accessing data
(get parsed-data "name")
;; => "Alice"

(get-in parsed-data ["courses" 0])
;; => "Math"

;; Adding a new key (returns a new map)
(assoc parsed-data "city" "New York")
;; => {"name" "Alice", "age" 30, "isStudent" false, "courses" ["Math" "Science"], "city" "New York"}

;; Updating an existing value (returns a new map)
(update parsed-data "age" inc) ; inc is increment function
;; => {"name" "Alice", "age" 31, "isStudent" false, "courses" ["Math" "Science"]}

;; Modifying an element within a nested collection (returns a new map)
(update-in parsed-data ["courses"] conj "History") ; conj adds element to vector
;; => {"name" "Alice", "age" 30, "isStudent" false, "courses" ["Math" "Science" "History"]}

;; Transforming a collection within the data (returns a new map)
(update-in parsed-data ["courses"] (partial map clojure.string/upper-case))
;; => {"name" "Alice", "age" 30, "isStudent" false, "courses" ["MATH" "SCIENCE"]}

;; Removing a key (returns a new map)
(dissoc parsed-data "isStudent")
;; => {"name" "Alice", "age" 30, "courses" ["Math" "Science"]}
`}
            </pre>
          </div>
        </div>
        <p>
          Notice how all these operations are done using generic functions like <code>get</code>, <code>assoc</code>,{" "}
          <code>update</code>, which work on maps and vectors regardless of where the data originated (could be from a
          database, a file, or JSON).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-600" /> Formatting Data as JSON
        </h2>
        <p>
          Turning your manipulated Clojure data structure back into a JSON string is just as simple using{" "}
          <code>clojure.data.json</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Formatting Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
(require '[clojure.data.json :as json])

;; Assume modified-data is a Clojure map or vector
(def modified-data {"name" "Bob", "age" 25, "courses" ["History" "Art"]})

;; Generate JSON string from Clojure data
(json/write-str modified-data)
;; => "{\\"name\\":\\"Bob\\",\\"age\\":25,\\"courses\\":[\\"History\\",\\"Art\\"]}"

;; You can also pretty-print the output
(json/write-str modified-data :pretty true)
;; =>
;; {
;;   "name":"Bob",
;;   "age":25,
;;   "courses":[
;;     "History",
;;     "Art"
;;   ]
;; }
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle2 className="w-6 h-6 mr-2 text-blue-600" /> Benefits of the Data-Oriented Approach for JSON
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start">
            <Feather className="w-5 h-5 mr-2 mt-1 text-teal-600 flex-shrink-0" />
            <div>
              <strong>Simplicity and Clarity:</strong> The mapping between JSON and Clojure data is direct. Your code
              operates on simple data structures, not complex object graphs tailored to a specific JSON schema.
            </div>
          </li>
          <li className="flex items-start">
            <Wrench className="w-5 h-5 mr-2 mt-1 text-teal-600 flex-shrink-0" />
            <div>
              <strong>Powerful Manipulation:</strong> You leverage Clojure&apos;s extensive standard library for
              collections (maps, vectors), which provides powerful and flexible ways to transform, query, and combine
              data, regardless of its source format.
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle2 className="w-5 h-5 mr-2 mt-1 text-teal-600 flex-shrink-0" />
            <div>
              <strong>Immutability:</strong> Manipulations return new data, avoiding in-place modifications and
              simplifying reasoning about data flow, especially in concurrent or complex scenarios.
            </div>
          </li>
          <li className="flex items-start">
            <Feather className="w-5 h-5 mr-2 mt-1 text-teal-600 flex-shrink-0" />
            <div>
              <strong>Less Boilerplate:</strong> Compared to languages that might require defining specific classes or
              data transfer objects (DTOs) for each JSON structure, Clojure often lets you work directly with generic
              maps and vectors, reducing boilerplate code.
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Clojure&apos;s data-oriented philosophy makes handling JSON a natural and pleasant experience. By parsing JSON
          into standard, immutable Clojure data structures, you gain the ability to manipulate the data using a
          consistent set of powerful functions from the standard library. This approach leads to code that is often more
          concise, easier to understand, and less prone to errors compared to paradigms that rely heavily on mutable
          objects or format-specific data models. For developers working with JSON APIs or data files, understanding
          this data-oriented perspective offered by Clojure can be highly beneficial.
        </p>
      </div>
    </>
  );
}

// Import Box separately as it's used in a heading
import { Box } from "lucide-react";
