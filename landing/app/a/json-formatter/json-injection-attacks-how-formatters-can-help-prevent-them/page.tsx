import type { Metadata } from "next";
import { AlertTriangle, Shield, Code, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Injection Attacks: Safe Parsing, Validation, and Formatter Defenses | Security Guide",
  description:
    "Learn what JSON injection means in modern apps: unsafe eval parsing, string-built JSON, raw NoSQL filters, and JSON embedded into HTML. See how JSON.parse(), JSON.stringify(), and schema validation help.",
};

export default function JsonInjectionPrevention() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Shield className="w-8 h-8 text-green-600" />
        <span>JSON Injection Attacks: How Formatters Help Prevent Them</span>
      </h1>

      <div className="space-y-6">
        <p>
          JSON injection usually means one thing: untrusted input changes the meaning of data before your application
          finishes handling it. Sometimes that means unsafe parsing with <code>eval()</code>. More often today, it
          means developers build JSON with string concatenation, accept raw JSON query fragments from clients, or embed
          serialized JSON into HTML without the right output encoding.
        </p>
        <p>
          A JSON formatter helps, but only in specific ways. It enforces valid syntax, escapes string content when you
          serialize data, and makes suspicious structure easier to spot during review. It does <strong>not</strong>
          decide whether fields are allowed, whether a parsed object is safe to send into a database query, or whether
          valid JSON is being inserted into a dangerous HTML or JavaScript context.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>What Searchers Usually Mean by &quot;JSON Injection&quot;</span>
        </h2>
        <p>
          If someone searches for <strong>json injection</strong>, they are usually dealing with one of these patterns:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing data as code:</strong> using <code>eval()</code>, <code>Function()</code>, or similar
            dynamic execution on untrusted text.
          </li>
          <li>
            <strong>Breaking JSON structure during construction:</strong> concatenating user input into a JSON string so
            an attacker can close a string early or add new properties.
          </li>
          <li>
            <strong>Passing parsed JSON straight into downstream APIs:</strong> for example, treating a client-supplied
            object as a MongoDB filter or update document.
          </li>
          <li>
            <strong>Embedding JSON into HTML unsafely:</strong> serializing valid JSON and then dropping it into a{" "}
            <code>&lt;script&gt;</code> tag or inline script without context-aware escaping.
          </li>
        </ul>
        <p>
          The common thread is that the attacker is not just sending data. They are influencing structure, behavior, or
          interpretation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-500" />
          <span>Danger #1: Parsing JSON with Code Execution</span>
        </h2>
        <p>
          This is the classic case.{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            MDN explicitly warns
          </a>{" "}
          that <code>eval()</code> is dangerous and can open the door to arbitrary code execution and injection
          attacks. If the input is not strict JSON but is still valid JavaScript, <code>eval()</code> will run it.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">
            Unsafe Example: <code>eval()</code> Accepts JavaScript, Not Just JSON
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume this string comes from a request body
const userInput =
  '{"name":"Attacker","run":(function(){alert("owned");return true;})()}';

// Dangerous: eval executes JavaScript expressions
const data = eval("(" + userInput + ")");

console.log(data.name); // "Attacker"
// The injected function runs during parsing
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4" />
            <span>
              <code>eval()</code> turns a parsing problem into a code-execution problem. That is far worse than a
              normal validation bug.
            </span>
          </p>
        </div>

        <p>
          The safe alternative is{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            <code>JSON.parse()</code>
          </a>
          . It is a parser, not a JavaScript interpreter. It accepts only valid JSON values, so functions, comments,
          trailing commas, and bare expressions are rejected with a <code>SyntaxError</code> instead of being
          executed.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">
            Safe Example: <code>JSON.parse()</code> Rejects Non-JSON Input
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const userInput =
  '{"name":"Attacker","run":(function(){alert("owned");return true;})()}';

try {
  const data = JSON.parse(userInput);
  console.log(data);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Invalid JSON:", message);
}

// Result: parsing fails and the injected code never runs
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>
              A strict parser blocks this class of attack because non-JSON tokens are treated as invalid input, not as
              executable code.
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-500" />
          <span>Danger #2: Building JSON Strings by Hand</span>
        </h2>
        <p>
          A more common modern bug is not unsafe parsing. It is unsafe <strong>construction</strong>. If you build JSON
          with string concatenation, a user can inject quotes, commas, or extra properties and still end up with
          perfectly valid JSON that means something different from what you intended.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Unsafe Example: User Input Changes the JSON Structure</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const name = req.body.name;

// Dangerous: hand-built JSON string
const payload = '{ "name": "' + name + '", "role": "user" }';
const data = JSON.parse(payload);

// If name is:
// Alice", "role": "admin
//
// payload becomes:
// { "name": "Alice", "role": "admin", "role": "user" }
//
// Depending on the parser and downstream code, duplicate keys can create
// surprising results and hide what the attacker changed.
`}
            </pre>
          </div>
        </div>

        <p>
          The fix is simple: build native objects and let the formatter or serializer handle escaping for you. In
          JavaScript, that means object literals plus <code>JSON.stringify()</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Safe Example: Build Objects, Then Serialize</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const data = {
  name: String(req.body.name),
  role: "user",
};

const payload = JSON.stringify(data);

// Quotes, backslashes, and control characters inside name are escaped safely
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>
              A formatter helps most when it is generating JSON for you. Manual string building is where structure
              injection usually starts.
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>Danger #3: Valid JSON That Becomes a Dangerous Query</span>
        </h2>
        <p>
          This is the limitation many articles skip: perfectly valid JSON can still be dangerous after it has been
          parsed.{" "}
          <a
            href="https://cheatsheetseries.owasp.org/cheatsheets/NoSQL_Security_Cheat_Sheet.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            OWASP&apos;s NoSQL security guidance
          </a>{" "}
          recommends strict input validation, allowlists, and safe driver APIs for exactly this reason.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Unsafe Example: Accepting a Raw Filter Object from the Client</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Client controls the entire filter
const filter = JSON.parse(req.body.filter);
const user = await db.collection("users").findOne(filter);

// Attacker sends:
// { "email": { "$ne": null } }
//
// Or tries operator keys you never intended to expose.
`}
            </pre>
          </div>
        </div>

        <p>
          <code>JSON.parse()</code> did its job here. The JSON is valid. The problem is that your application accepted
          attacker-controlled structure and handed it to a query engine. A formatter cannot decide whether{" "}
          <code>$ne</code>, <code>$regex</code>, or other special operator keys belong in your API. That is an
          application-level validation problem.
        </p>
        <p>
          The safer pattern is to accept specific fields, convert them to expected primitive types, and build the query
          object yourself.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Safer Pattern: Build the Query Server-Side</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const email = String(req.body.email);

const filter = { email };
const user = await db.collection("users").findOne(filter);

// If advanced filtering is a real product feature, define an allowlist
// for fields, operators, and value types instead of accepting raw JSON.
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>Danger #4: Embedding JSON into HTML or a Script Tag</span>
        </h2>
        <p>
          Even correctly serialized JSON can become an XSS problem if you place it into HTML without the right encoding
          for that output context. OWASP&apos;s{" "}
          <a
            href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline"
          >
            XSS prevention guidance
          </a>{" "}
          makes the broader rule clear: escaping depends on where the data is rendered.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Unsafe Example: JSON Is Valid, but HTML Context Is Not Safe</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const state = JSON.stringify(profile);
return \`<script>window.__STATE__ = \${state}</script>\`;

// If profile contains "</script><script>alert(1)</script>"
// the browser can break out of the original script block.
`}
            </pre>
          </div>
        </div>

        <p>
          A practical fix is to use the framework&apos;s built-in serializer when available, or escape dangerous
          characters before embedding the JSON into HTML.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Safer Pattern: Serialize, Then Escape for HTML</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const state = JSON.stringify(profile).replace(/</g, "\\u003c");
return \`<script>window.__STATE__ = \${state}</script>\`;

// JSON formatting helps create valid JSON.
// HTML-aware escaping helps keep that JSON inside the script block.
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span>How Formatters Actually Help</span>
        </h2>
        <p>
          A JSON formatter is useful security tooling when you use it for the right job:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Strict parsing:</strong> it rejects invalid JSON instead of evaluating it as code.
          </li>
          <li>
            <strong>Safe serialization:</strong> it escapes quotes, backslashes, and control characters correctly when
            generating JSON.
          </li>
          <li>
            <strong>Normalization:</strong> pretty-printing makes unexpected nesting, duplicate-looking fields, and
            operator-shaped keys easier to review.
          </li>
          <li>
            <strong>Debugging:</strong> if a payload only works when hand-built, that is a sign your application logic
            is relying on broken JSON rather than valid data handling.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Shield className="w-6 h-6 text-green-600" />
          <span>What Formatters Cannot Do for You</span>
        </h2>
        <p>
          A formatter is a guardrail, not a complete injection defense. You still need application-level controls:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Schema validation:</strong> verify required keys, data types, allowed enums, and nested structure
            with JSON Schema, Ajv, Zod, Joi, or similar tooling.
          </li>
          <li>
            <strong>Allowlists:</strong> decide which fields and operators are permitted instead of trusting arbitrary
            parsed objects.
          </li>
          <li>
            <strong>Context-aware output encoding:</strong> valid JSON still needs HTML or JavaScript-safe handling when
            rendered into a page.
          </li>
          <li>
            <strong>Resource limits:</strong> deeply nested or oversized JSON can still cause memory and CPU problems
            even when parsing is syntactically safe.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Practical Checklist</h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Parse untrusted input with <code>JSON.parse()</code>, never <code>eval()</code> or <code>new Function()</code>.
          </li>
          <li>
            Build data as native objects and serialize with <code>JSON.stringify()</code> instead of concatenating
            strings.
          </li>
          <li>Validate the parsed result against an expected schema before using it.</li>
          <li>Do not accept raw query or update JSON from clients unless you explicitly constrain it.</li>
          <li>
            When embedding serialized JSON into HTML, apply output encoding for the HTML or script context too.
          </li>
          <li>Set request size limits and reject unusually deep or complex payloads early.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The short version is simple: use a formatter to keep JSON valid, but do not mistake valid JSON for safe
          behavior. <code>JSON.parse()</code> stops code execution tricks. <code>JSON.stringify()</code> stops many
          string-construction bugs. Neither one can tell whether a field should exist, whether a query operator is
          acceptable, or whether JSON is being injected into a dangerous browser context.
        </p>
        <p>
          For real-world protection, combine strict parsing, safe serialization, schema validation, and context-aware
          output encoding. That is the difference between merely accepting JSON and handling it safely.
        </p>
      </div>
    </>
  );
}
