import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reserved Words in JSON: Are Keys Like "class" and "default" Safe? | Offline Tools',
  description:
    "Reserved words in JSON are valid keys, but they can still cause trouble in typed models, code generators, and framework mappings. Learn what is safe and when to rename fields.",
};

export default function ReservedWordsAsKeysInJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Reserved Words as Keys in JSON: Why They Cause Problems</h1>

      <div className="space-y-6">
        <p>
          If you searched for <em>reserved words in JSON</em>, the short answer is this: JSON itself does not reserve
          object-key words. A payload with keys like <code>&quot;class&quot;</code>, <code>&quot;default&quot;</code>,
          or <code>&quot;return&quot;</code> is valid JSON. The real trouble starts later, when that data is mapped
          into language identifiers, generated classes, templates, ORMs, or API frameworks that do have reserved
          words.
        </p>

        <div className="bg-green-50 p-4 rounded-lg dark:bg-green-900/20 my-4 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Quick Answer</h2>
          <ul className="list-disc ml-6 mt-2 space-y-2 text-green-900 dark:text-green-100">
            <li>
              JSON object member names are strings, so <code>&quot;class&quot;</code> and similar keys are valid.
            </li>
            <li>
              Problems usually appear in the consumer, not in <code>JSON.parse</code> or the JSON syntax itself.
            </li>
            <li>
              Modern JavaScript can access <code>data.class</code> and <code>data.default</code>.
            </li>
            <li>
              The risky cases are code generation, typed DTOs, object mappers, and framework-specific reserved names.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Are Reserved Words Valid in JSON?</h2>
        <p>
          Yes. The JSON specification treats object member names as strings. That means a JSON parser does not care
          whether a key looks like a programming-language keyword. This is valid JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "class": "admin",
  "default": true,
  "return": 42,
  "package": "starter"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            A standards-compliant JSON parser should accept this without complaint.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why They Still Cause Problems in Real Projects</h2>
        <p>
          The key question is not whether the JSON is valid. It is whether the next tool in your pipeline treats the
          key as a plain string or tries to turn it into an identifier with naming rules of its own.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Code Generation and Typed Models</h3>
        <p>
          This is the most common failure point. If JSON is converted into Java, Kotlin, C#, Swift, Go, or Python
          model types, some keys cannot be used directly as field or property names. A generator may fail, escape the
          name awkwardly, or require an alias.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Typical fix: keep the wire format, rename internally</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`public class UserDto {
  @JsonProperty("class")
  public String className;

  @JsonProperty("default")
  public boolean defaultValue;
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The JSON stays the same, but your application code uses safe member names.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Access Syntax Is Not the Same Across Languages</h3>
        <p>
          Older articles often claim that JavaScript cannot read reserved-word properties with dot notation. That is
          outdated. In modern JavaScript, keyword-like property names such as <code>class</code> and{" "}
          <code>default</code> work. Bracket notation is still required when the key is not a valid identifier, such as{" "}
          <code>&quot;user-name&quot;</code> or <code>&quot;first name&quot;</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-blue-700 dark:text-blue-300">Modern JavaScript reality check</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-3">
            <pre>
              {`const data = JSON.parse('{"class":"admin","default":true,"user-name":"sam"}');

console.log(data.class);         // "admin"
console.log(data.default);       // true
console.log(data["user-name"]);  // "sam"`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Framework and Schema Boundaries Can Reserve Names</h3>
        <p>
          Even when JSON is valid, downstream systems may reserve certain names or prefixes for their own metadata.
          This shows up in API layers, template engines, database mappers, and serialization frameworks. The JSON key
          is not wrong; it is just inconvenient in that specific environment.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              API and schema tools may reserve special prefixes or internal metadata fields.
            </li>
            <li>
              ORMs and SQL layers can stumble over names that match SQL keywords such as <code>order</code>,{" "}
              <code>group</code>, or <code>default</code>.
            </li>
            <li>
              Code generators often need explicit aliases when JSON keys overlap with language keywords.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Language-Specific Notes</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 space-y-4">
          <div>
            <h3 className="text-lg font-medium">JavaScript and TypeScript</h3>
            <p className="mt-1">
              Parsing is fine. Keyword-like property names are usually fine too. The bigger issue is consistency when
              you generate types or want ergonomic property access across many keys. For keys that are not valid
              identifiers, use quoted property names in types and bracket notation at runtime.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Python</h3>
            <p className="mt-1">
              Plain dictionaries handle any string key. Problems start when you convert JSON into objects, dataclasses,
              or model classes where <code>class</code> or <code>from</code> would be invalid attribute names.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Java, Kotlin, C#, Swift</h3>
            <p className="mt-1">
              These ecosystems commonly map JSON into DTOs or structs. Reserved words often need annotation-based
              aliases so the external JSON name stays stable while the internal field name stays legal.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Safer Naming Patterns</h2>
        <p>
          If you control the schema, the best fix is usually to choose names that communicate meaning without colliding
          with language syntax.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium">Awkward Key</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  <code>class</code>
                </li>
                <li>
                  <code>default</code>
                </li>
                <li>
                  <code>return</code>
                </li>
                <li>
                  <code>new</code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">Safer Alternative</h3>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  <code>className</code>, <code>userRole</code>
                </li>
                <li>
                  <code>defaultValue</code>, <code>isDefault</code>
                </li>
                <li>
                  <code>returnValue</code>, <code>result</code>
                </li>
                <li>
                  <code>isNew</code>, <code>createdRecently</code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">If You Cannot Rename the Incoming JSON</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Parse the JSON normally and keep the raw key names at the API boundary.
            </li>
            <li>
              Map external names to safe internal names once, close to your deserializer or validation layer.
            </li>
            <li>
              Document the aliasing clearly so serialization back to JSON remains predictable.
            </li>
            <li>
              Add a test that round-trips the payload, especially if code generation is involved.
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h2 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Bottom Line</h2>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Reserved words are not a JSON validity problem. They are a portability and tooling problem. If a payload
            only needs to be valid JSON, keys like <code>&quot;class&quot;</code> are fine. If that payload will be
            turned into typed code, templates, database fields, or framework models, aliasing or safer naming will save
            time later.
          </p>
        </div>
      </div>
    </>
  );
}
