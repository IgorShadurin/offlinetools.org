import type { Metadata } from "next";
import {
  BookOpen,
  FileJson,
  CodeXml,
  Zap,
  Share2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Smalltalk JSON Parsing and Formatting Solutions | Offline Tools",
  description:
    "Use NeoJSON or STONJSON to parse, validate, and pretty-print JSON in Smalltalk, with current Pharo and Squeak install steps, mapping examples, and troubleshooting.",
};

export default function SmalltalkJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Smalltalk JSON Parsing and Formatting Solutions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen className="mr-2 text-blue-500" />
            Start with the Right Library
          </h2>
          <p className="mb-4">
            If you need JSON support in modern Smalltalk, <code>NeoJSON</code> is usually the best default for Pharo
            and Squeak. It gives you straightforward parsing and writing for plain collections, plus object mapping when
            you want to deserialize JSON into real Smalltalk domain objects instead of raw <code>Dictionary</code> and{" "}
            <code>Array</code> instances.
          </p>
          <p className="mb-4">
            <code>STON</code> is still relevant, but it is a Smalltalk object notation first and a JSON tool second. If
            your image already depends on STON and you only need basic JSON parsing or pretty-printing, use{" "}
            <code>STONJSON</code> rather than plain <code>STON</code> so your input and output stay JSON-compatible.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Choose NeoJSON</strong> for REST APIs, file interchange, typed object mapping, and most new
              Smalltalk JSON work.
            </li>
            <li>
              <strong>Choose STONJSON</strong> when STON is already present and you want a lighter JSON-only facade.
            </li>
            <li>
              <strong>Treat older Zinc or vendor-specific parsers as legacy choices</strong> unless the application is
              already built around them.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">Install NeoJSON in Pharo or Squeak</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`Metacello new
  repository: 'github://svenvc/NeoJSON/repository';
  baseline: 'NeoJSON';
  load.`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Install STON When You Need STONJSON</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`Metacello new
  baseline: 'Ston';
  repository: 'github://svenvc/ston/repository';
  load.`}
              </code>
            </pre>
          </div>
          <p>
            If you are on VisualWorks, VA Smalltalk, or another vendor dialect, the concepts are the same but package
            names and exact APIs can differ. In those images, use the patterns below as a guide instead of assuming the
            Pharo code is drop-in compatible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-2 text-green-500" />
            Parsing JSON in Smalltalk
          </h2>
          <p className="mb-4">
            The basic conversion rules are simple and stable across dialects: JSON objects become Smalltalk maps,
            arrays become <code>Array</code>, strings become <code>String</code>, numbers become numeric objects,
            booleans become <code>true</code> or <code>false</code>, and JSON <code>null</code> becomes{" "}
            <code>nil</code>. In NeoJSON, property names are strings by default, which is usually what you want when
            the payload came from an external API.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Parse Into Dictionaries and Arrays with NeoJSON</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| jsonString jsonObject |
jsonString := '{ "name": "Alice", "age": 30, "isStudent": false, "courses": ["Math", "Science"], "address": null }'.

jsonObject := NeoJSONReader fromString: jsonString.

jsonObject at: 'name'.      "Alice"
jsonObject at: 'age'.       "30"
jsonObject at: 'isStudent'. "false"
jsonObject at: 'courses'.   "#('Math' 'Science')"
jsonObject at: 'address'.   "nil"`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Map JSON Directly to Smalltalk Objects</h3>
          <p className="mb-4">
            Raw dictionaries are fine when you are exploring a new payload. Once the schema is stable, NeoJSON can map
            directly into your classes. That keeps the rest of the codebase cleaner because you stop passing string-key
            dictionaries around.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| reader points |
reader := NeoJSONReader on: '[{"x":1,"y":2},{"x":3,"y":4}]' readStream.
reader mapInstVarsFor: Point.
points := reader nextListAs: Point.

points first. "1@2"`}
              </code>
            </pre>
          </div>
          <p className="mt-4">
            If your codebase prefers symbol keys for exploratory work, NeoJSON can also be configured with{" "}
            <code>propertyNamesAsSymbols: true</code> on a reader instance. Keep in mind that this only changes the
            in-image representation; JSON on the wire still uses quoted string property names.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CodeXml className="mr-2 text-purple-500" />
            Formatting JSON in Smalltalk
          </h2>
          <p className="mb-4">
            Formatting is the reverse operation: take a Smalltalk object graph that only contains JSON-safe values and
            serialize it to a JSON string. For external APIs, keep the payload boring and predictable: strings, numbers,
            booleans, arrays, dictionaries, and <code>nil</code>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Write Compact or Pretty JSON with NeoJSON</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| payload compact pretty |
payload := Dictionary new
  at: 'product' put: 'Laptop';
  at: 'price' put: 1200.50;
  at: 'inStock' put: true;
  at: 'tags' put: #('electronics' 'computer');
  at: 'details' put: nil;
  yourself.

compact := NeoJSONWriter toString: payload.
pretty := NeoJSONWriter toStringPretty: payload.`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Use STONJSON for Lightweight JSON-Only Work</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              <code className="language-smalltalk text-sm">
                {`| payload jsonString parsedBack |
payload := Dictionary new
  at: 'status' put: 'ok';
  at: 'code' put: 200;
  yourself.

jsonString := STONJSON toStringPretty: payload.
parsedBack := STONJSON fromString: '{"status":"ok","code":200}'.`}
              </code>
            </pre>
          </div>
          <p className="mb-4">
            Use <code>STONJSON</code> when you want strict JSON input and output from a STON-based image. Use plain{" "}
            <code>STON</code> when you intentionally want Smalltalk-specific features like richer object serialization,
            not when a third-party HTTP API expects ordinary JSON.
          </p>
          <p className="mt-4">
            For large payloads, switch from convenience methods to streams. Both NeoJSON and STON support reading from a
            read stream and writing to a write stream, which is more memory-friendly than building huge intermediate
            strings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-orange-500" />
            Common Smalltalk JSON Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Use string keys when writing maps.</strong> JSON object property names are strings. In NeoJSON,
              the safe habit is <code>'name'</code>, not <code>#name</code>, when you build a <code>Dictionary</code>{" "}
              for an API payload.
            </li>
            <li>
              <strong>Remember that nil maps to null.</strong> If a missing value should not be sent at all, do not
              assume every writer will automatically remove it. Decide whether you want omission or an explicit{" "}
              <code>null</code>.
            </li>
            <li>
              <strong>Invalid JSON is often the real bug.</strong> JSON does not allow single-quoted strings,
              JavaScript-style comments, or trailing commas. When parsing fails, validate the payload first instead of
              immediately blaming the Smalltalk library.
            </li>
            <li>
              <strong>Start untyped, then add mapping.</strong> Parse into dictionaries and arrays while you learn the
              payload. Once the structure stabilizes, move to <code>mapInstVarsFor:</code>, <code>nextAs:</code>, or{" "}
              <code>nextListAs:</code>.
            </li>
            <li>
              <strong>Prefer streams for big files and HTTP responses.</strong> Reading directly from a stream reduces
              memory pressure and fits better with web clients, file imports, and batch jobs.
            </li>
            <li>
              <strong>Validate before you debug.</strong> If a response or config file looks suspicious, paste it into
              the formatter on this site first. Pretty-printing and validation outside the image often reveals bad
              quoting, stray commas, or broken escapes immediately.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Share2 className="mr-2 text-teal-500" />
            Which Solution Fits Which Job
          </h2>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>NeoJSON is the best general-purpose choice</strong> for Pharo and Squeak when you need current,
              maintainable JSON parsing and formatting.
            </li>
            <li>
              <strong>STONJSON is a practical second option</strong> when you already use STON and only need clean JSON
              parsing or output, not advanced mapping.
            </li>
            <li>
              <strong>Plain STON is for Smalltalk object notation</strong>, not for generic web API payloads.
            </li>
          </ul>
          <p>
            A practical workflow is to validate the raw JSON first, parse into collections while you explore the
            schema, and then add typed mappings only after the payload has settled. That keeps integration code simple
            without giving up the object-oriented benefits that make Smalltalk pleasant to work in.
          </p>
        </section>
      </div>
    </>
  );
}
