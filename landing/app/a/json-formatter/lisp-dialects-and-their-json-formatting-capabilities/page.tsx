import type { Metadata } from "next";
import { ArrowRightLeft, Code, FileJson, ListTree, Inspect, FileOutput, Braces } from "lucide-react";

export const metadata: Metadata = {
  title: "Lisp Dialects and Their JSON Formatting Capabilities",
  description:
    "Compare current JSON parsing, serialization, and pretty-printing support in Common Lisp, Clojure, and Racket with practical examples and compatibility notes.",
};

export default function LispJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <ArrowRightLeft className="w-8 h-8" />
        <span>Lisp Dialects and Their JSON Formatting Capabilities</span>
      </h1>

      <div className="space-y-6">
        <p>
          If you need to parse, generate, or pretty-print JSON from Lisp code, the answer depends heavily on the
          dialect. Common Lisp usually relies on third-party libraries and lets you choose your object/array mapping.
          Clojure aligns very naturally with JSON through maps and vectors. Racket ships an official JSON library, but
          it expects values that satisfy its stricter <code>jsexpr?</code> data model.
        </p>
        <p>
          For most real projects, JSON support is not the hard part. The hard part is choosing the right representation
          for keys, arrays, numbers, and <code>null</code>. That is where dialects differ, and those differences affect
          whether your code feels pleasant or constantly full of conversion helpers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson className="w-6 h-6" />
          <span>Quick Answer</span>
        </h2>
        <p>
          All major Lisp families can handle JSON today, but they do not do it the same way. If you want the shortest
          path from JSON to native data and back, Clojure tends to be the smoothest fit. If you want maximum
          representation control, Common Lisp gives you more knobs. If you want batteries included in a Scheme-family
          language, Racket is the clearest current example.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 font-semibold">Dialect</th>
                <th className="text-left p-3 font-semibold">Current Practical Choice</th>
                <th className="text-left p-3 font-semibold">Default JSON Shape</th>
                <th className="text-left p-3 font-semibold">What To Watch</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top font-medium">Common Lisp</td>
                <td className="p-3 align-top">
                  <code>cl-json</code> for documented parsing and serialization
                </td>
                <td className="p-3 align-top">Objects are alists by default; arrays are lists</td>
                <td className="p-3 align-top">Be explicit about key mapping and <code>false</code> versus <code>null</code></td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top font-medium">Clojure</td>
                <td className="p-3 align-top">
                  <code>clojure.data.json</code> or <code>cheshire</code>
                </td>
                <td className="p-3 align-top">Objects map cleanly to maps; arrays to vectors</td>
                <td className="p-3 align-top">Choose whether keys stay strings or become keywords</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top font-medium">Racket</td>
                <td className="p-3 align-top">
                  Built-in <code>json</code> library
                </td>
                <td className="p-3 align-top">Objects are usually symbol-keyed hashes; arrays are lists</td>
                <td className="p-3 align-top">
                  Only values matching <code>jsexpr?</code> can be written
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListTree className="w-6 h-6" />
          <span>What Changes Between Dialects</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Object keys:</strong> Clojure can keep JSON keys as strings or keywordize them on read. Common Lisp
            often maps keys to symbols and may normalize names. Racket&apos;s JSON expressions typically use symbol keys
            in hashes.
          </li>
          <li>
            <strong>Arrays:</strong> Clojure defaults to vectors, while Common Lisp and Racket often use lists unless
            you opt into a different representation.
          </li>
          <li>
            <strong>Null and booleans:</strong> Clojure keeps <code>nil</code> and <code>false</code> distinct. Racket
            keeps JSON <code>null</code> distinct from <code>#f</code>. With Common Lisp&apos;s default CL-JSON
            semantics, <code>false</code> and <code>null</code> can both collapse to <code>NIL</code>, which matters
            if your API distinguishes them.
          </li>
          <li>
            <strong>Numbers:</strong> Clojure&apos;s official JSON library can preserve decimal values as BigDecimal via{" "}
            <code>:bigdec true</code>. Common Lisp and Racket handle numbers cleanly, but you still need to watch
            precision rules and how your application expects to consume them.
          </li>
          <li>
            <strong>Large payloads:</strong> Streaming APIs exist, but they are library-specific. If you work with very
            large documents, avoid assuming that all examples using strings scale directly to production.
          </li>
        </ul>
        <p>
          This is also why a standalone formatter is useful even when your language already has a JSON library. It lets
          you validate sample payloads, inspect nesting, and normalize whitespace before you lock a representation into
          code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Inspect className="w-6 h-6" />
          <span>Common Lisp</span>
        </h2>
        <p>
          Common Lisp has multiple JSON libraries, but <code>cl-json</code> remains a well-documented reference point
          because its behavior is explicit. By default it decodes JSON objects using Lisp-friendly key names and list
          structures, which is flexible but not always what you want for random access or strict schema matching.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Parsing with <code>cl-json</code></h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre className="text-sm">{`(ql:quickload "cl-json")

(let ((payload "{\\"userId\\":42,\\"roles\\":[\\"admin\\",\\"editor\\"],\\"active\\":true}"))
  (json:decode-json-from-string payload))

;; => ((:USER-ID . 42) (:ROLES "admin" "editor") (:ACTIVE . T))
`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Serializing back to JSON</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre className="text-sm">{`(json:encode-json-alist-to-string
 '((:user-id . 42)
   (:active . t)
   (:roles . ("admin" "editor"))))

;; => "{\\"userId\\":42,\\"active\\":true,\\"roles\\":[\\"admin\\",\\"editor\\"]}"
`}</pre>
          </div>
        </div>
        <p>
          The practical question in Common Lisp is not &quot;can it do JSON?&quot; but &quot;which semantics do I want?&quot;
          CL-JSON documents configurable identifier conversion, strict decoding, and alternate decoder semantics that
          can produce vectors instead of lists. That makes it capable, but it also means you should make the mapping
          explicit instead of relying on defaults that may surprise the next person reading the code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Inspect className="w-6 h-6" />
          <span>Clojure</span>
        </h2>
        <p>
          Clojure is usually the least awkward Lisp dialect for JSON because its core data structures already look like
          JSON: maps, vectors, strings, booleans, and <code>nil</code>. The current official API in{" "}
          <code>clojure.data.json</code> centers on <code>read-str</code>, <code>read</code>,{" "}
          <code>write-str</code>, and <code>write</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Reading and pretty-printing with <code>clojure.data.json</code></h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre className="text-sm">{`(require '[clojure.data.json :as json])

(def payload
  (json/read-str
    "{\\"service\\":\\"billing\\",\\"price\\":1200.50,\\"enabled\\":true}"
    :key-fn keyword
    :bigdec true))

;; => {:service "billing" :price 1200.50M :enabled true}

(json/write-str payload :indent true)
;; => pretty-printed JSON string
`}</pre>
          </div>
        </div>
        <p>
          One worthwhile current-detail check: older examples on the web still use <code>read-json</code> and{" "}
          <code>write-json</code>, but the library&apos;s current docs mark those as deprecated. If you are updating old
          code or blog content, this is usually the first thing worth correcting.
        </p>
        <p>
          In day-to-day Clojure work, teams often choose between the official library and <code>cheshire</code>. The
          official library is straightforward and dependency-light. Cheshire is a common choice when you want Jackson
          underneath, custom encoders, stream-based parsing, lazy parsing via <code>parsed-seq</code>, or easy
          pretty-printing with <code>generate-string</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Inspect className="w-6 h-6" />
          <span>Racket and Scheme-Family Languages</span>
        </h2>
        <p>
          Scheme is fragmented enough that generic advice is often too vague to help. Racket is the best concrete
          example because it ships an official <code>json</code> library with documented read/write and string conversion
          functions. Its model is slightly stricter than Clojure&apos;s, which is useful once you understand the rules.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Using Racket&apos;s built-in <code>json</code> module</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre className="text-sm">{`(require json)

(define payload
  (string->jsexpr "{\\"city\\":\\"London\\",\\"visitors\\":9000000,\\"open\\":true}"))

;; => '#hasheq((city . "London") (visitors . 9000000) (open . #t))

(jsexpr->string
  #hasheq((city . "London") (tags . ("capital" "uk")))
  #:indent 2)

;; => pretty-printed JSON string
`}</pre>
          </div>
        </div>
        <p>
          The important Racket-specific caveat is that JSON output must satisfy <code>jsexpr?</code>. In practice that
          means arrays are normally lists, not vectors, and object keys in hashes are symbols, not arbitrary strings.
          If your program naturally builds vectors or string-keyed hashes, convert them before writing JSON.
        </p>
        <p>
          Racket also keeps JSON <code>null</code> separate from booleans by representing it as <code>&apos;null</code>{" "}
          by default, which is often more convenient than the ambiguity some Common Lisp defaults create.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileOutput className="w-6 h-6" />
          <span>Which Dialect Feels Best For JSON?</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Choose Clojure</strong> if you want the lowest impedance mismatch and the clearest path from JSON
            to idiomatic data.
          </li>
          <li>
            <strong>Choose Common Lisp</strong> if you want flexible representation control and do not mind deciding the
            mapping policy yourself.
          </li>
          <li>
            <strong>Choose Racket</strong> if you want a documented standard library solution and you are comfortable
            shaping data to fit <code>jsexpr?</code>.
          </li>
        </ul>
        <p>
          That comparison is an inference from each dialect&apos;s default mappings and official APIs, not a universal
          rule. Performance, ecosystem fit, and the shape of your existing application can matter more than the JSON API
          alone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>Troubleshooting Checklist</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>If keys mysteriously change, check whether your library is keywordizing, symbolizing, or renaming them.</li>
          <li>If arrays come back in the wrong shape, confirm whether your dialect defaults to lists or vectors.</li>
          <li>
            If <code>null</code> and <code>false</code> behave strangely, test them explicitly before trusting default
            conversions.
          </li>
          <li>If decimals lose precision, look for BigDecimal or exact-number options in your JSON reader.</li>
          <li>If output is valid but hard to inspect, pretty-print it before debugging application logic.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Braces className="w-6 h-6" />
          <span>Bottom Line</span>
        </h2>
        <p>
          Lisp dialects are fully capable of working with JSON, but the best workflow depends on how closely each
          dialect&apos;s native data model matches the JSON you exchange. Clojure is usually the smoothest. Common Lisp
          is the most configurable. Racket is clear and capable once you respect its JSON-expression rules. If you are
          comparing sample payloads between dialects, format them first, then make the representation choice explicit in
          code.
        </p>
      </div>
    </>
  );
}
