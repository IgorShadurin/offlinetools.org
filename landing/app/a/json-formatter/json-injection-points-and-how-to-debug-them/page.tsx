import type { Metadata } from "next";
import {
  AlertCircle,
  Bug,
  CheckCircle,
  Code,
  FileTerminal,
  SearchCode,
  ShieldAlert,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Injection Points and How to Debug Them | Safe Parsing Guide",
  description:
    "Learn where JSON injection really happens, how to debug malformed or tampered payloads, and which safe serialization patterns prevent it.",
};

export default function JsonInjectionDebuggingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <Bug className="inline-block mr-2 h-8 w-8 text-red-500" /> JSON Injection Points and How to Debug Them
      </h1>

      <div className="space-y-6">
        <p>
          JSON injection usually is not a bug in <code>JSON.parse()</code> itself. The real problem is that untrusted
          input is allowed to change JSON <strong>structure</strong> while you build a payload, or that parsed JSON is
          handed to a query engine, inline script, or HTML sink without the right validation and escaping. If you are
          debugging broken API responses, mysterious extra keys, or payloads that only fail for certain user input, this
          is where to look first.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">Fast diagnosis</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Parsing fails only for certain names, comments, or query parameters: suspect hand-built JSON or broken
              escaping.
            </li>
            <li>
              The JSON parses, but unexpected keys or operators appear: suspect client-controlled structure rather than
              a parser bug.
            </li>
            <li>
              A page breaks around <code>&lt;/script&gt;</code> or inline bootstrap data: suspect JSON embedded into an
              HTML <code>&lt;script&gt;</code> context without HTML-safe escaping.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="inline-block mr-2 h-6 w-6 text-yellow-500" /> What counts as a JSON injection point?
        </h2>
        <p>
          A JSON injection point is any place where user-controlled input can influence the shape of a JSON document or
          the way the application interprets that document. In practice, the highest-risk points are not the parser but
          the boundaries around it: manual serialization, inline HTML rendering, and server code that trusts a
          client-supplied object to define filters, permissions, or workflow rules.
        </p>
        <p>
          It also helps to separate JSON injection from adjacent bugs. If untrusted JSON later flows into{" "}
          <code>innerHTML</code>, <code>dangerouslySetInnerHTML</code>, or another executable/HTML sink, the downstream
          issue is usually XSS. If a client controls a MongoDB-style filter object directly, the bug often becomes
          NoSQL injection. The handoff point is still the same: untrusted data was allowed to become structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="inline-block mr-2 h-6 w-6 text-blue-500" /> Common JSON injection points in real apps
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Manually building JSON strings on the server</h3>
        <p>
          This is the classic mistake. If you concatenate user input into a string that is supposed to become JSON, a
          quote, brace, comma, or bracket can change the payload shape or make it invalid.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Vulnerable example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`const userId = req.query.userId;
const profile = getUserProfile(userId);

// DANGEROUS: user input is embedded into JSON text by hand
const responseBody =
  '{ "userId": "' +
  userId +
  '", "profile": ' +
  JSON.stringify(profile) +
  ', "status": "ok" }';

res.type("application/json").send(responseBody);`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            If <code>userId</code> contains <code>123", "role": "admin</code>, the attacker has changed the structure
            of the JSON document rather than just the value of one field.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Embedding JSON into HTML or inline script state</h3>
        <p>
          This is a common modern debugging trap. <code>JSON.stringify()</code> creates valid JSON, but valid JSON is
          not automatically safe inside an HTML <code>&lt;script&gt;</code> tag. A value like{" "}
          <code>&lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;</code> can terminate the script block unless you
          escape for the HTML context too.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Vulnerable bootstrap-state example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`const state = { displayName: req.body.displayName };

const html =
  "<script>window.__BOOTSTRAP__ = " +
  JSON.stringify(state) +
  "</script>";

res.send(html);`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            The JSON is valid, but the browser parses the surrounding HTML first. This is why inline JSON often needs a
            framework-provided serializer or an extra HTML-safe escaping step.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Accepting raw JSON fragments for filters, rules, or queries</h3>
        <p>
          Some APIs let the client post a JSON blob that becomes a database filter, access-control rule, or search
          expression. The dangerous part is not <code>JSON.parse()</code>. The dangerous part is letting the client
          author the structure that your backend should control.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Risky query-shape example</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`const filter = JSON.parse(req.body.filter);

// Risk: the client now controls operators and field names
const users = await db.collection("users").find(filter).toArray();`}
              </code>
            </pre>
          </div>
          <p className="mt-2">
            When this happens, you are usually dealing with a validation and trust-boundary problem that can turn into
            logic abuse or NoSQL injection.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Legacy client-side parsing with executable APIs</h3>
        <p>
          Modern guidance is still straightforward: parse JSON with <code>JSON.parse()</code>, not <code>eval()</code>{" "}
          or <code>new Function()</code>. OWASP continues to recommend avoiding executable parsing paths because they
          turn a data problem into a code-execution problem.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldAlert className="inline-block mr-2 h-6 w-6 text-red-500" /> Why these bugs are dangerous
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Structure tampering:</strong> extra keys, changed array elements, or injected operators can alter
            authorization and business logic.
          </li>
          <li>
            <strong>Broken parsing:</strong> malformed JSON can trigger exceptions, blank states, or failed background
            jobs.
          </li>
          <li>
            <strong>Downstream injection:</strong> once the wrong object shape exists, later code may pass it into a
            database query, a template, or an HTML sink.
          </li>
          <li>
            <strong>Hard-to-reproduce failures:</strong> these issues often appear only for specific input values, which
            is why precise logging matters.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <SearchCode className="inline-block mr-2 h-6 w-6 text-purple-500" /> How to debug JSON injection quickly
        </h2>
        <p>
          The fastest way to debug this class of bug is to treat it as a data-boundary problem. Capture the exact text
          before parsing or sending, compare the parsed shape to the schema you expected, and only then inspect the
          application logic that used the result.
        </p>

        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Capture the raw payload before parsing.</strong> Log the exact request body or exact outbound JSON
            text, not just the parsed object. If the problem involves encoding or invisible characters, raw text is what
            will expose it.
          </li>
          <li>
            <strong>Reproduce with the smallest payload that fails.</strong> Try inputs containing quotes, braces,
            brackets, commas, and the sequence <code>&lt;/script&gt;</code>. If only those values trigger the issue,
            your bug is almost certainly at a serialization boundary.
          </li>
          <li>
            <strong>Check whether the JSON is invalid or merely dangerous.</strong> Invalid JSON produces parse errors.
            Dangerous JSON may parse cleanly but still contain extra fields, operators, or values that should never have
            been accepted.
          </li>
          <li>
            <strong>Search the code path for string assembly and unsafe sinks.</strong> Look for concatenation,
            template-built payloads, <code>eval()</code>, <code>innerHTML</code>, and direct use of client-supplied
            objects in queries or policy code.
          </li>
          <li>
            <strong>Validate the parsed shape immediately.</strong> Even when parsing succeeds, reject unknown keys,
            unexpected types, and unexpected nesting before the object reaches business logic.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Practical logging pattern</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`const rawBody = await request.text();
console.log("content-type:", request.headers.get("content-type"));
console.log("raw request body:", rawBody);

let parsed;
try {
  parsed = JSON.parse(rawBody);
  console.log("parsed keys:", Object.keys(parsed));
} catch (error) {
  console.error("JSON parse failed:", error);
  throw error;
}

// Validate immediately after parsing
assertUserSettingsSchema(parsed);`}
              </code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Common parser errors and what they usually mean</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>unexpected character</code>: a quote, comma, brace, or other character ended up where JSON syntax
            does not allow it.
          </li>
          <li>
            <code>expected property name or &#39;&#125;&#39;</code>: an object key is malformed, often because a value
            was concatenated into the document without proper escaping.
          </li>
          <li>
            <code>unexpected non-whitespace character after JSON data</code>: one valid JSON value was parsed, then
            more attacker-controlled text followed it.
          </li>
        </ul>
        <p>
          These errors are helpful, but a clean parse does <strong>not</strong> prove that the input is safe. If the
          payload parsed into the wrong object shape, you still have a real injection problem.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="inline-block mr-2 h-6 w-6 text-green-600" /> How to fix and prevent it
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Build JSON from native objects or arrays and serialize once with the standard library. The same principle
            applies across ecosystems: <code>JSON.stringify()</code>, <code>json_encode()</code>,{" "}
            <code>json.dumps()</code>, <code>json.Marshal()</code>, and similar APIs.
          </li>
          <li>
            When embedding JSON into HTML, use a framework helper or an HTML-safe serializer. Escaping for JSON syntax
            alone is not enough for the <code>&lt;script&gt;</code> context.
          </li>
          <li>
            Validate schemas after parsing. Reject unknown keys and build database filters, sort clauses, and access
            rules on the server from allowlisted fields instead of trusting a client-supplied object.
          </li>
          <li>
            Parse with <code>JSON.parse()</code>. Do not use <code>eval()</code> or other executable parsing shortcuts.
          </li>
          <li>
            For browser-facing APIs, return <code>application/json</code> and use normal authentication and CSRF
            controls where relevant. Do not turn JSON endpoints into executable JavaScript responses.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-xl font-semibold flex items-center">
            <CheckCircle className="inline-block mr-2 h-5 w-5 text-green-500" /> Safer patterns
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              <code>
                {`// 1. Build the response as data, then serialize once
const responseBody = JSON.stringify({
  userId: String(req.query.userId ?? ""),
  profile,
  status: "ok",
});

res.type("application/json").send(responseBody);

// 2. If you must embed JSON into an inline <script>, escape for HTML too
function serializeForInlineScript(value) {
  return JSON.stringify(value).replace(/[<>&]/g, (char) => {
    switch (char) {
      case "<":
        return "\\u003c";
      case ">":
        return "\\u003e";
      case "&":
        return "\\u0026";
      default:
        return char;
    }
  });
}`}
              </code>
            </pre>
          </div>
        </div>

        <p>
          <strong>Current note:</strong> do not confuse JSON injection with historical JSON hijacking issues in older
          browser behavior. They are related to JSON delivery, but they are different bugs. For modern apps, the most
          practical wins are still the same: serve real JSON with the correct content type, keep it out of executable
          contexts, and never let untrusted input author the structure you depend on.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileTerminal className="inline-block mr-2 h-6 w-6 text-gray-500" /> Conclusion
        </h2>
        <p>
          When you debug JSON injection, focus on the boundary where text becomes structure. Capture the exact payload,
          identify whether the failure is invalid syntax or unexpected object shape, and trace where untrusted data was
          allowed to control JSON rather than remain a plain value.
        </p>
        <p>
          In most cases, the fix is simple and durable: serialize once with standard JSON tools, validate immediately
          after parsing, and treat inline HTML, query objects, and other downstream consumers as separate security
          contexts with their own escaping and trust rules.
        </p>
      </div>
    </>
  );
}
