import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to YAML and YAML to JSON Conversion Guide | Offline Tools",
  description:
    "Convert JSON to YAML and YAML to JSON safely. Learn what stays lossless, what gets dropped, and how YAML 1.2, comments, anchors, duplicate keys, and multi-document files affect results.",
};

export default function JsonYamlConversionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Converting Between JSON and YAML in Hybrid Formatters</h1>

      <div className="space-y-6">
        <p>
          If you need to switch data between JSON and YAML, the important question is not just how to convert it, but
          what survives the conversion. JSON to YAML is usually straightforward because YAML 1.2 is designed for JSON
          compatibility. YAML to JSON is where surprises show up, because JSON cannot represent comments, anchors,
          aliases, tags, or multiple documents in one file.
        </p>

        <p>
          A good hybrid formatter should do three jobs at once: validate the input, convert the structure cleanly, and
          warn you when the source uses YAML features that cannot round-trip back from JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-2xl font-semibold">Quick Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Valid JSON almost always converts to YAML without changing the data model.</li>
            <li>
              Converting YAML to JSON is often lossy because JSON has no syntax for comments, aliases, tags, or YAML
              document separators.
            </li>
            <li>
              The safest inputs are objects/maps with string keys, arrays/lists, and plain scalar values such as
              strings, numbers, booleans, and <code>null</code>.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Converts Cleanly</h2>
        <p>
          For normal application data, the formats line up well. A hybrid formatter can usually map these structures
          directly in either direction:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>JSON objects to YAML mappings</li>
          <li>JSON arrays to YAML sequences</li>
          <li>Strings, numbers, booleans, and null values</li>
          <li>Nested objects and arrays with predictable indentation</li>
        </ul>
        <p>
          This is why API payloads, config fragments, and test fixtures often convert cleanly. The problems usually
          come from YAML-only features or from values that look simple but have schema-sensitive meaning.
        </p>

        <h2 className="text-2xl font-semibold mt-8">JSON to YAML Is Usually the Easy Direction</h2>
        <p>
          JSON is rigid: keys are strings, strings use double quotes, and the syntax allows a single top-level value.
          When a hybrid formatter reads valid JSON, it already has an unambiguous tree to emit as YAML.
        </p>
        <p>
          The main output choices are stylistic rather than structural: indentation width, whether short arrays stay
          inline, and whether obviously safe strings can be unquoted in YAML output.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: JSON to YAML</h3>
          <div className="grid gap-4 md:grid-cols-2 mt-3">
            <div>
              <h4 className="font-medium">Input JSON</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  "service": {
    "name": "billing",
    "enabled": true,
    "replicas": 3,
    "regions": ["us-east-1", "eu-west-1"],
    "owner": "platform-team"
  }
}`}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Converted YAML</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`service:
  name: billing
  enabled: true
  replicas: 3
  regions:
    - us-east-1
    - eu-west-1
  owner: platform-team`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <p>
          When the source started as ordinary JSON, a YAML formatter is mostly changing punctuation into indentation.
          The data itself should remain the same.
        </p>

        <h2 className="text-2xl font-semibold mt-8">YAML to JSON Is Where Information Gets Lost</h2>
        <p>
          YAML has features that are useful for people editing configuration files but have no JSON equivalent. A
          formatter can still produce JSON, but it has to discard or expand those features during conversion.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 space-y-4">
          <div>
            <h3 className="text-lg font-medium">Comments disappear</h3>
            <p className="text-sm">
              JSON has no comment syntax, so notes such as <code># temporary override</code> will not survive the
              conversion.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Anchors and aliases get expanded</h3>
            <p className="text-sm">
              YAML can reuse content with <code>&amp;</code> anchors and <code>*</code> aliases. JSON cannot represent
              shared references, so converters normally duplicate the expanded value.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Tags may be dropped or flattened</h3>
            <p className="text-sm">
              YAML tags can carry type information beyond plain JSON values. A formatter may turn the tagged value into
              a plain string, number, object, or reject it entirely.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Multi-document YAML needs special handling</h3>
            <p className="text-sm">
              YAML can store several documents in one stream separated by <code>---</code>. JSON allows only one
              top-level value, so tools must either split documents or wrap them in an array.
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: YAML to JSON with Alias Expansion</h3>
          <div className="grid gap-4 md:grid-cols-2 mt-3">
            <div>
              <h4 className="font-medium">Input YAML</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`defaults: &base
  timeout: 30
  retries: 2

service:
  primary: *base`}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Converted JSON</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                <pre>
                  {`{
  "defaults": {
    "timeout": 30,
    "retries": 2
  },
  "service": {
    "primary": {
      "timeout": 30,
      "retries": 2
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <p>
          The JSON result still contains equivalent values, but it no longer remembers that <code>primary</code> came
          from an alias.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Compatibility Rules Worth Checking</h2>
        <p>
          These are the rules that most often explain why one formatter accepts a document and another rejects it or
          changes its meaning.
        </p>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">YAML 1.2 aligns more closely with JSON.</span> Under YAML 1.2 style rules,
            plain scalars such as <code>true</code> and <code>false</code> match JSON booleans, while values like
            <code>yes</code>, <code>no</code>, <code>on</code>, and <code>off</code> should be treated more carefully.
          </li>
          <li>
            <span className="font-medium">JSON object names should be unique.</span> If your YAML contains duplicate
            mapping keys, converting to JSON can produce ambiguous or parser-dependent results.
          </li>
          <li>
            <span className="font-medium">JSON keys must be strings.</span> YAML can express more complex mapping keys,
            but a JSON formatter must stringify them, simplify them, or reject the document.
          </li>
          <li>
            <span className="font-medium">Quoting still matters.</span> If a YAML scalar looks like a date, number, or
            special literal, keep it quoted when you need it to remain a string after conversion.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">A Safe Workflow in a Hybrid Formatter</h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Validate the source format before converting. Fix syntax errors first.</li>
          <li>Convert once and inspect the structural output, not just the pretty formatting.</li>
          <li>Check for YAML-only features such as comments, aliases, tags, and document separators.</li>
          <li>Quote string-like values that must not be reinterpreted by another parser later.</li>
          <li>Re-validate the converted output in the target format before shipping it to production.</li>
        </ol>
        <p>
          That last step matters. A file can be valid YAML and still be a poor candidate for JSON conversion if it
          relies on YAML-specific behavior.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Conversion Problems</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">The YAML parser rejects the file:</span> Check indentation first. Tabs and
            inconsistent nesting are still the most common causes.
          </li>
          <li>
            <span className="font-medium">A value changed type after conversion:</span> Quote the original scalar and
            confirm which YAML schema or parser rules your tool is using.
          </li>
          <li>
            <span className="font-medium">The JSON output looks bigger than the YAML input:</span> Anchors and aliases
            were probably expanded into repeated objects.
          </li>
          <li>
            <span className="font-medium">The tool only converts part of the file:</span> The source may be a
            multi-document YAML stream rather than a single document.
          </li>
          <li>
            <span className="font-medium">A converter silently kept the last duplicate key:</span> Normalize duplicate
            keys before conversion so you do not depend on parser-specific behavior.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          Use JSON to YAML conversion when you want the same data in a format that is easier for humans to scan and
          edit. Use YAML to JSON conversion when you need stricter machine-oriented output, but assume it may be lossy
          unless the YAML stays within JSON-compatible features. The best hybrid formatter is the one that makes those
          losses obvious before you copy the result into a build, deployment, or API request.
        </p>
      </div>
    </>
  );
}
