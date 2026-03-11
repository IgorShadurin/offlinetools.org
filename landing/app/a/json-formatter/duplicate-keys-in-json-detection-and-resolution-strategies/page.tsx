import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duplicate Keys in JSON: Detection and Resolution Strategies | Offline Tools",
  description:
    "Learn how duplicate JSON keys behave in JavaScript, why JSON.stringify cannot retain them, and how to detect or reject duplicates before parsing.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Duplicate Keys in JSON: Detection and Resolution Strategies</h1>

      <div className="space-y-6">
        <p>
          Duplicate keys in JSON are a quiet source of bugs because many parsers accept them, but they do not preserve
          them in a consistent or reversible way. A payload like <code>{'{"role":"user","role":"admin"}'}</code> may
          look harmless in a text editor, yet by the time application code receives it, one of those values is usually
          gone.
        </p>

        <p>
          For most searchers, the practical answer is simple: in JavaScript, <code>JSON.parse()</code> typically keeps
          the last occurrence of a duplicate name, and <code>JSON.stringify()</code> cannot bring the earlier one back.
          If you need to detect duplicates or preserve every occurrence, you must inspect the raw JSON text before you
          turn it into a normal object.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950/30 my-6 border-l-4 border-blue-400">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">Quick Answer</h2>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-blue-900 dark:text-blue-100">
            <li>
              JSON object names are supposed to be unique. When they are not, behavior becomes non-interoperable.
            </li>
            <li>
              In JavaScript, <code>JSON.parse()</code> collapses duplicates into one property, usually keeping the last
              value.
            </li>
            <li>
              <code>JSON.stringify()</code> only serializes the object it receives. If duplicates were already lost
              during parsing, stringify cannot retain them.
            </li>
            <li>
              If duplicate keys matter to your workflow, use a parser that exposes tokens, member order, or an AST
              instead of returning only a plain object.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Current Standards Say</h2>
        <p>
          The current JSON interoperability guidance still points in the same direction.{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc8259"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            RFC 8259
          </a>{" "}
          says that names within an object <em>SHOULD</em> be unique and warns that duplicate names make receiver
          behavior unpredictable. The stricter{" "}
          <a
            href="https://www.rfc-editor.org/rfc/rfc7493"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline dark:text-blue-400"
          >
            I-JSON profile
          </a>{" "}
          goes further and says objects <em>MUST NOT</em> have duplicate names. If you are handling API payloads,
          configuration files, feature flags, auth claims, or anything security-sensitive, rejecting duplicates is the
          safest policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What JavaScript Actually Does</h2>
        <p>
          JavaScript is where most confusion comes from. Developers often search for answers after seeing one value in
          the source text and another value at runtime. That happens because the duplicate is resolved during parsing,
          not during formatting.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Parse and Stringify Example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const text = '{"role":"user","role":"admin"}';

const parsed = JSON.parse(text);
console.log(parsed); // { role: "admin" }
console.log(parsed.role); // "admin"

console.log(JSON.stringify(parsed)); // {"role":"admin"}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This is the key point behind searches like &quot;json.stringify retaining duplicate keys&quot;: stringify
            is not dropping anything here. The earlier duplicate was already discarded when the JSON text became a
            normal object.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Which JavaScript Tools Can Preserve Duplicates?</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Tool or API</th>
                <th className="px-4 py-2 text-left">Can it preserve duplicates?</th>
                <th className="px-4 py-2 text-left">What actually happens</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">
                  <code>JSON.parse()</code>
                </td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Creates one property; the last duplicate usually wins.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">
                  <code>JSON.parse()</code> reviver
                </td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Runs after parsing, so overwritten duplicates are already gone.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">
                  <code>JSON.stringify()</code>
                </td>
                <td className="px-4 py-2">No</td>
                <td className="px-4 py-2">Serializes the current object state only.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Token, event, or AST parser</td>
                <td className="px-4 py-2">Yes</td>
                <td className="px-4 py-2">
                  Can expose every member in source order so you can reject or reconcile duplicates yourself.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          One extra JavaScript edge case is worth knowing. MDN notes that <code>JSON.parse()</code> treats{" "}
          <code>&quot;__proto__&quot;</code> as a normal property name in JSON text, while duplicate{" "}
          <code>__proto__</code> entries in a JavaScript object literal are a syntax error. JSON text and object
          literal syntax look similar, but they are not identical.
        </p>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Warning</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Do not build logic around unspecified &quot;last wins&quot; behavior unless you fully control every parser
            and consumer in the pipeline. Even if all of your current tools behave the same way, a future parser,
            validator, gateway, or language binding may not.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common JavaScript Questions</h2>

        <h3 className="text-xl font-medium mt-6">Can JSON.stringify retain duplicate keys?</h3>
        <p>
          No. <code>JSON.stringify()</code> serializes an in-memory JavaScript value. Plain objects cannot store two
          properties with the same name at the same level, so by the time you call stringify, duplicate keys have
          already been reduced to one value.
        </p>

        <h3 className="text-xl font-medium mt-6">Can a reviver function detect the duplicates for me?</h3>
        <p>
          No. The reviver runs after <code>JSON.parse()</code> has already built the object tree. That makes revivers
          useful for transforming values, but not for recovering duplicate members that were overwritten during parse.
        </p>

        <h3 className="text-xl font-medium mt-6">Can JSON Schema catch duplicate keys?</h3>
        <p>
          Usually not by itself. A schema validator typically receives parsed data, not the raw token stream. If your
          parser already collapsed duplicate names into one surviving property, the schema only sees that final object.
          Treat duplicate-key detection as a parsing concern first, then run schema validation on the clean result.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Duplicate Keys Cause Real Problems</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Failure Modes</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Problem</th>
                <th className="px-4 py-2 text-left">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Silent data loss</td>
                <td className="px-4 py-2">One value overwrites another with no obvious error in many runtimes.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Validation gaps</td>
                <td className="px-4 py-2">
                  Downstream validators may only see the surviving key, not the duplicate source text.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Configuration ambiguity</td>
                <td className="px-4 py-2">
                  Humans reading the file may expect one value, while runtime code uses another.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Security mistakes</td>
                <td className="px-4 py-2">
                  Permission, routing, or policy fields can be overridden in ways reviewers miss.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Example: Security-Relevant Override</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user": {
    "role": "viewer",
    "permissions": ["read"],
    "role": "admin"
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            A reviewer may read the first <code>role</code> and miss the second one. A parser that keeps the last value
            will interpret this object very differently from what the file appears to say at a glance.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to Detect Duplicates Reliably</h2>
        <p>
          Reliable detection has one rule: check duplicates before you collapse the JSON into a plain object. In
          practice, that means one of these approaches:
        </p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Reject at the boundary.</strong> Run a duplicate-aware parser or linter when a request, file, or
            import first enters your system.
          </li>
          <li>
            <strong>Preserve tokens or AST nodes.</strong> If you need exact locations or all duplicate values, use a
            parser that returns member order and source positions instead of only a plain object.
          </li>
          <li>
            <strong>Fail fast in CI.</strong> Validate JSON fixtures, config files, and generated payloads before they
            are checked in or deployed.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">
            Minimal JavaScript Scanner Example
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {String.raw`function findDuplicateKeys(json) {
  let index = 0;
  let line = 1;
  let column = 1;
  const duplicates = [];

  function peek() {
    return json[index];
  }

  function advance() {
    const char = json[index++];

    if (char === "\n") {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }

    return char;
  }

  function fail(message) {
    throw new Error(message + " at " + line + ":" + column);
  }

  function skipWhitespace() {
    while (peek() === " " || peek() === "\n" || peek() === "\r" || peek() === "\t") {
      advance();
    }
  }

  function readString() {
    if (advance() !== '"') {
      fail("Expected string");
    }

    let value = "";

    while (index < json.length) {
      const char = advance();

      if (char === '"') {
        return value;
      }

      if (char === "\\") {
        const escape = advance();

        if (escape === "u") {
          for (let i = 0; i < 4; i += 1) {
            const hex = advance();
            if (!/[0-9a-fA-F]/.test(hex)) {
              fail("Invalid unicode escape");
            }
          }
          value += "?";
          continue;
        }

        if (!'"\\/bfnrt'.includes(escape)) {
          fail("Invalid escape sequence");
        }

        value += escape;
        continue;
      }

      value += char;
    }

    fail("Unterminated string");
  }

  function readNumber() {
    if (peek() === "-") {
      advance();
    }

    if (peek() === "0") {
      advance();
    } else {
      if (peek() < "1" || peek() > "9") {
        fail("Invalid number");
      }

      while (peek() >= "0" && peek() <= "9") {
        advance();
      }
    }

    if (peek() === ".") {
      advance();

      if (peek() < "0" || peek() > "9") {
        fail("Invalid fraction");
      }

      while (peek() >= "0" && peek() <= "9") {
        advance();
      }
    }

    if (peek() === "e" || peek() === "E") {
      advance();

      if (peek() === "+" || peek() === "-") {
        advance();
      }

      if (peek() < "0" || peek() > "9") {
        fail("Invalid exponent");
      }

      while (peek() >= "0" && peek() <= "9") {
        advance();
      }
    }
  }

  function readLiteral(literal) {
    for (const expected of literal) {
      if (advance() !== expected) {
        fail("Unexpected token");
      }
    }
  }

  function readArray(path) {
    advance();
    skipWhitespace();

    if (peek() === "]") {
      advance();
      return;
    }

    let itemIndex = 0;

    while (true) {
      readValue(path + "[" + itemIndex + "]");
      itemIndex += 1;
      skipWhitespace();

      const separator = advance();

      if (separator === "]") {
        return;
      }

      if (separator !== ",") {
        fail("Expected ',' or ']'");
      }

      skipWhitespace();
    }
  }

  function readObject(path) {
    advance();
    skipWhitespace();

    const seen = new Map();

    if (peek() === "}") {
      advance();
      return;
    }

    while (true) {
      const keyLine = line;
      const keyColumn = column;
      const key = readString();
      const objectPath = path || "$";

      if (seen.has(key)) {
        duplicates.push({
          path: objectPath,
          key,
          first: seen.get(key),
          duplicate: { line: keyLine, column: keyColumn },
        });
      } else {
        seen.set(key, { line: keyLine, column: keyColumn });
      }

      skipWhitespace();

      if (advance() !== ":") {
        fail("Expected ':'");
      }

      skipWhitespace();

      const childPath = objectPath === "$" ? "$." + key : objectPath + "." + key;
      readValue(childPath);
      skipWhitespace();

      const separator = advance();

      if (separator === "}") {
        return;
      }

      if (separator !== ",") {
        fail("Expected ',' or '}'");
      }

      skipWhitespace();
    }
  }

  function readValue(path) {
    skipWhitespace();

    if (peek() === "{") {
      readObject(path);
      return;
    }

    if (peek() === "[") {
      readArray(path);
      return;
    }

    if (peek() === '"') {
      readString();
      return;
    }

    if (peek() === "-" || (peek() >= "0" && peek() <= "9")) {
      readNumber();
      return;
    }

    if (json.startsWith("true", index)) {
      readLiteral("true");
      return;
    }

    if (json.startsWith("false", index)) {
      readLiteral("false");
      return;
    }

    if (json.startsWith("null", index)) {
      readLiteral("null");
      return;
    }

    fail("Unexpected token");
  }

  readValue("$");
  skipWhitespace();

  if (index !== json.length) {
    fail("Unexpected trailing content");
  }

  return duplicates;
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This is a minimal illustration of the right approach: inspect the raw JSON text before calling{" "}
            <code>JSON.parse()</code>. For production code, prefer a well-tested parser library over maintaining your
            own JSON parser.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Resolution Strategies That Actually Work</h2>
        <p>
          Once you have detected duplicates, the right fix depends on whether the duplicate is invalid input, legacy
          data, or a real modeling mistake.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Choose a Policy Deliberately</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Strategy</th>
                <th className="px-4 py-2 text-left">Best for</th>
                <th className="px-4 py-2 text-left">Tradeoff</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Reject the payload</td>
                <td className="px-4 py-2">APIs, configs, auth, billing, infrastructure</td>
                <td className="px-4 py-2">Safest option, but callers must fix the source data.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Keep the last value explicitly</td>
                <td className="px-4 py-2">Controlled migrations where later values are authoritative</td>
                <td className="px-4 py-2">Easy, but still discards information.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Keep the first value explicitly</td>
                <td className="px-4 py-2">Legacy importers that document first-win semantics</td>
                <td className="px-4 py-2">Still discards information and may surprise downstream systems.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Convert repeated values to an array</td>
                <td className="px-4 py-2">Cases where every value is meaningful</td>
                <td className="px-4 py-2">Requires a data-model change, but preserves information cleanly.</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Rename the fields upstream</td>
                <td className="px-4 py-2">Bad source models such as address lines or repeated labels</td>
                <td className="px-4 py-2">Best long-term fix when the duplicate was really a schema problem.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Portable Alternatives to Duplicate Keys</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Ambiguous and non-portable
{
  "tag": "important",
  "tag": "urgent",
  "tag": "review"
}

// Better if one field should hold multiple values
{
  "tags": ["important", "urgent", "review"]
}

// Better if order and repeated names matter
[
  ["tag", "important"],
  ["tag", "urgent"],
  ["tag", "review"]
]`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            If you truly need repeated names, an array of pairs is the portable JSON representation. Plain objects are
            the wrong data structure for that job.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When a Custom JavaScript Library Makes Sense</h2>
        <p>
          You only need a custom JavaScript library if the built-in behavior is too destructive for your use case. In
          practice, that means one of two things: you must preserve every duplicate occurrence, or you must report the
          exact duplicate locations back to a user or calling system.
        </p>
        <p>
          If you evaluate a library for this problem, look for these capabilities: it preserves member order, exposes
          all object entries instead of collapsing them into a plain object, reports line and column information, and
          lets you choose a clear duplicate policy such as reject, keep first, keep last, or merge. If a library only
          returns ordinary objects, it cannot retain duplicate keys no matter what its README says.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Bottom Line</h2>
        <p>
          Duplicate keys are not something to normalize away casually. They are a signal that the JSON source is
          ambiguous, and normal JavaScript parsing will usually hide that ambiguity by keeping only one value. Detect
          duplicates before parsing, reject them by default for important data, and remodel the data as arrays or
          distinct fields when you need to keep every value.
        </p>
      </div>
    </>
  );
}
