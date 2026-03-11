import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about handling comments in JSON
 */
export const metadata: Metadata = {
  title: "Can JSON Have Comments? Handling JSON, JSONC, and JSON5 | Offline Tools",
  description:
    "JSON does not support // or /* */ comments. Learn what breaks, when JSONC or JSON5 are appropriate, and the safest ways to document JSON without losing compatibility.",
};

/**
 * Article page component for handling comments in JSON
 */
export default function HandlingCommentsInJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Handling Comments in JSON (Even Though They&apos;re Not Supported)</h1>

      <div className="space-y-6">
        <p>
          If you are looking for a comment syntax for JSON, the short answer is no: standard JSON does not support
          comments. A strict parser such as JavaScript&apos;s <code>JSON.parse()</code> will reject both{" "}
          <code>// single-line</code> and <code>/* block */</code> comments. The confusion usually comes from tools
          that support JSON-like extensions such as JSONC or JSON5.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">Short answer</h2>
          <ul className="list-disc ml-6 mt-3 space-y-2 text-blue-950 dark:text-blue-100">
            <li>Standard JSON has no comment syntax.</li>
            <li>Strict parsers reject comments because they are not part of the JSON grammar.</li>
            <li>Comments only work when a specific tool supports an extension such as JSONC or JSON5.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What the JSON standard actually allows</h2>

        <p>
          The current JSON standard is RFC 8259. Its grammar does not include comments, which means comments are not
          valid JSON. The RFC does leave room for permissive parsers to accept extensions, but anything claiming to
          produce JSON still needs to emit strict JSON.
        </p>

        <p>This is invalid JSON and will fail in strict parsers:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`JSON.parse(\`{
  // Server port
  "port": 3000
}\`);

// SyntaxError: Unexpected token '/' ...`}
            </pre>
          </div>
        </div>

        <p>
          That matters most for API payloads, exported data files, package data, and any file labeled{" "}
          <code>application/json</code>. In those cases, comments are invalid input, not a harmless convenience.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why comments sometimes seem to work anyway</h2>

        <p>
          Some editors and tools intentionally support JSON-like formats for human-edited configuration files. Visual
          Studio Code, for example, has a <code>jsonc</code> mode for files such as <code>settings.json</code>,{" "}
          <code>tasks.json</code>, and <code>launch.json</code>. In that mode, line comments and block comments are
          allowed.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>JSONC</strong>: Stays close to JSON and adds comments. The recommended extension is{" "}
              <code>.jsonc</code>.
            </li>
            <li>
              <strong>Current VS Code behavior</strong>: Comments work in <code>jsonc</code> mode, and trailing commas
              are accepted but discouraged with a warning.
            </li>
            <li>
              <strong>Important limit</strong>: A file accepted by one editor or config loader is not automatically
              valid for <code>JSON.parse()</code>, APIs, validators, or other languages.
            </li>
          </ul>
        </div>

        <p>
          This is the distinction that usually trips people up: a tool can support comments in a JSON-like file, but
          that does not make comments part of JSON itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choose the right format for the job</h2>

        <h3 className="text-xl font-semibold mt-6">1. Use strict JSON when compatibility matters</h3>

        <p>
          Use strict JSON when the file is exchanged between systems, sent over an API, checked by generic validators,
          or consumed by unknown tooling. In those cases, compatibility matters more than authoring convenience.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Good fit: API requests and responses, exported data, shared config, machine-to-machine interchange.</li>
            <li>Bad fit for comments: anything that eventually goes through a strict JSON parser.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Use JSONC for human-edited config when the tool documents support</h3>

        <p>
          Use JSONC when comments are part of a local config workflow and the specific tool explicitly supports it. This
          is common in editor or build-tool configuration, but you should still treat JSONC as a separate format rather
          than &quot;JSON with a few extras.&quot;
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Prefer the <code>.jsonc</code> extension when you control the file name.</li>
            <li>Do not assume another parser will accept the same file just because your editor does.</li>
            <li>Keep trailing commas out unless the tool clearly allows them.</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Use JSON5 only when you want a looser authoring format</h3>

        <p>
          JSON5 supports comments, but it also allows additional syntax such as trailing commas, single-quoted strings,
          and unquoted object keys. That makes it convenient for humans, but even less appropriate as a drop-in
          replacement for standard JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  // This is a single-line comment
  name: 'JSON5 Example',
  version: '1.0.0',
  /* This is a
     multi-line comment */
  description: 'A configuration file with comments',
  enabled: true,
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">This is JSON5, not JSON. A strict JSON parser will reject it.</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Rule of thumb</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            If a generic parser, API, or another team needs to read the file, ship strict JSON. Use JSONC or JSON5
            only when every consumer explicitly supports that format.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Safe ways to document strict JSON</h2>

        <p>
          If you must keep the final file valid JSON, these options are safer than adding comment syntax to the JSON
          itself.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Comment-like properties</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "_comment": "Main application settings",
  "apiEndpoint": "https://api.example.com",
  "timeoutSeconds": 30,
  "features": {
    "_comment": "Feature flags",
    "newUi": true
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This keeps the file valid JSON, but the comments become real data. Downstream code must ignore them, and
            strict schemas may forbid them.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. JSON Schema and adjacent docs</h3>

        <p>
          For shared data structures, JSON Schema is often the cleanest replacement for inline comments because it
          documents fields without polluting the JSON instance itself.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "type": "object",
  "properties": {
    "theme": {
      "type": "string",
      "description": "UI theme: light, dark, or system"
    },
    "notifications": {
      "type": "boolean",
      "description": "Whether the app should send notifications"
    }
  },
  "required": ["theme", "notifications"]
}`}
            </pre>
          </div>
        </div>

        <p>
          A README beside the file is also effective when the audience is human rather than machine. This avoids
          turning documentation into extra JSON fields.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Author with comments, ship without them</h2>

        <p>
          When teams want comments during editing but strict JSON in production, the usual pattern is to author in an
          extended format and convert as part of the build or release process.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>Write the source file in JSONC, JSON5, YAML, or another documented authoring format.</li>
            <li>Validate and convert it before publishing or deploying.</li>
            <li>Emit strict <code>.json</code> for the final artifact that other systems read.</li>
            <li>Test the emitted JSON with the same parser your application uses in production.</li>
          </ul>
        </div>

        <p>
          Do not remove comments with a naive regex. A pattern like <code>//.*</code> can destroy legitimate strings
          such as URLs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  // Development endpoint
  "endpoint": "https://api.example.com/v1",
  "timeoutSeconds": 30
}`}
            </pre>
          </div>
        </div>

        <p>
          Use a real parser or a dedicated comment-stripping step for the format you chose. Treat comment removal as
          parsing, not as string replacement.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common failures and what they mean</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>&quot;Unexpected token /&quot;</strong>: You passed commented content to a strict JSON parser.
              Remove comments or switch to a parser that explicitly supports JSONC or JSON5.
            </li>
            <li>
              <strong>&quot;It works in VS Code but not in my app&quot;</strong>: VS Code may be treating the file as{" "}
              <code>jsonc</code>, but your runtime probably expects actual JSON.
            </li>
            <li>
              <strong>&quot;Why is there a trailing comma warning?&quot;</strong>: Comment support and trailing comma
              support are not the same thing. Some JSONC tooling accepts both, but trailing commas are often
              discouraged or disabled by default.
            </li>
            <li>
              <strong>&quot;Can I send JSONC to an API?&quot;</strong>: Only if that API explicitly documents JSONC
              support. Otherwise, assume the answer is no.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
