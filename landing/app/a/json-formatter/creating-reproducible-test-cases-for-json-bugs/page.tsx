import type { Metadata } from "next";
import { Bug, Clipboard, Code, Info, Minimize2, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Reproducible Test Cases for JSON Bugs | Offline Tools",
  description:
    "Build minimal, reproducible JSON bug reports with the exact payload, parser version, and one-command repro script maintainers can run immediately.",
};

export default function ReproducibleJsonTestCasesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="w-8 h-8 mr-3 text-red-500" />
        Creating Reproducible Test Cases for JSON Bugs
      </h1>

      <div className="space-y-6">
        <p>
          If a JSON bug only happens with one payload, one API response, or one parser version, the fastest route to a
          fix is a test case that reproduces it on demand. A maintainer should be able to run your example and see the
          same failure in under a minute.
        </p>
        <p>
          For JSON issues, that usually means five things: preserve the exact input, identify whether the issue is
          invalid JSON or a parser/application bug, minimize the payload, freeze the environment, and package the
          result as a single command or tiny script. This guide focuses on that workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-blue-500" />
          What A Good JSON Repro Must Include
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>The exact failing input:</strong> the raw JSON text or file, not a rewritten approximation.
          </li>
          <li>
            <strong>The parser and runtime:</strong> language, runtime, library, and exact version numbers.
          </li>
          <li>
            <strong>One way to run it:</strong> a single command or a very small script that still fails.
          </li>
          <li>
            <strong>The observed behavior:</strong> exact error message, incorrect value, timeout, crash, or diff.
          </li>
          <li>
            <strong>The expected behavior:</strong> what should happen instead, in concrete terms.
          </li>
        </ul>
        <p>
          If any one of those pieces is missing, the report becomes guesswork. That is why vague bug reports like
          &quot;this JSON breaks our parser&quot; usually stall.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Clipboard className="w-6 h-6 mr-2 text-green-500" />
          Step 1: Preserve The Exact Input First
        </h2>
        <p>
          Before you format, pretty-print, or sanitize anything, save the original payload that failed. Reproducibility
          starts with the exact bytes that triggered the bug.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Save the raw response body or the original file before editing it.</li>
          <li>
            If the problem came from HTTP, keep the request URL, method, status, and relevant headers such as{" "}
            <code>Content-Type</code>.
          </li>
          <li>
            If encoding or hidden characters might matter, keep the bytes as a file instead of pasting the content into
            a source string literal.
          </li>
          <li>
            Use a formatter or validator only <strong>after</strong> you have preserved the original payload, so you do
            not accidentally normalize away the bug.
          </li>
        </ul>
        <p>
          This matters because JSON exchanged between systems is expected to be UTF-8, and byte-level details such as a
          stray BOM, bad escaping, or an unexpected control character can be the whole bug.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>{`# Example: preserve the original body and headers before you experiment
curl -sS https://api.example.com/data -D response-headers.txt -o payload.json

# If characters look suspicious, inspect the raw bytes too
xxd -g 1 payload.json | head`}</pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Step 2: Classify The Failure</h2>
        <p>
          The best reproducible test case depends on what kind of failure you are actually reporting. Separate these
          cases before you start writing the bug report:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Invalid JSON:</strong> the input is not valid JSON, and the question is whether the parser rejects
            it with a clear error.
          </li>
          <li>
            <strong>Interoperability edge case:</strong> the JSON is accepted, but different systems interpret it
            differently.
          </li>
          <li>
            <strong>Application bug:</strong> the parser succeeds, but your application transforms, validates, or stores
            the parsed data incorrectly.
          </li>
        </ul>
        <p>
          That distinction keeps the report honest. Many &quot;JSON parser bugs&quot; turn out to be invalid input or
          downstream application logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Current JSON Rules Worth Checking</h2>
        <p>
          A lot of repro work gets easier once you compare the failing payload against a few rules that still trip teams
          up:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Trailing commas and single-quoted strings are not valid JSON.</strong> If a payload only works
            after being treated like JavaScript object syntax, you are debugging invalid JSON, not a parser regression.
          </li>
          <li>
            <strong>Duplicate object keys are a reproducibility trap.</strong> The JSON spec says object names should be
            unique, and receivers are allowed to disagree about what duplicate names mean.
          </li>
          <li>
            <strong>Large integers can look fine in one system and lose precision in another.</strong> JSON itself has a
            number type, but JavaScript parsers convert numbers to <code>Number</code>, so identifiers larger than{" "}
            <code>2^53 - 1</code> need special handling in the application layer.
          </li>
          <li>
            <strong>Control characters must be escaped.</strong> If your issue involves tabs, null bytes, or odd
            Unicode behavior, keep the original bytes and show exactly how the file was decoded.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Minimize2 className="w-6 h-6 mr-2 text-red-500" />
          Step 3: Minimize Until Every Remaining Byte Matters
        </h2>
        <p>
          The original payload is rarely the best repro. Your goal is the smallest possible input that still fails in
          the same way.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Delete top-level keys or array elements first. Large unrelated sections are usually noise.</li>
          <li>Shorten long strings, but keep the same character class if Unicode or escaping is involved.</li>
          <li>Reduce numbers carefully. If magnitude is the issue, shrinking the number may hide the bug.</li>
          <li>Run the exact same command after every edit so you know which removal changed the outcome.</li>
          <li>Stop when removing any additional byte makes the bug disappear or changes the failure mode.</li>
        </ol>
        <p>
          If the failure depends on escaping, surrogate pairs, or hidden characters, minimize in a file instead of a
          programming-language string literal. Re-encoding the payload while you minimize it is a common way to lose the
          original bug.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Step 4: Freeze The Environment</h2>
        <p>
          &quot;Latest&quot; is not an environment. Use exact version strings so somebody else can recreate the same
          setup.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Runtime and version, such as Node.js, Python, Java, browser, or container tag.</li>
          <li>JSON library or framework version if you are not using the built-in parser.</li>
          <li>OS and architecture when file I/O, encoding, locale, or line endings might matter.</li>
          <li>The precise command you ran and any relevant flags or environment variables.</li>
        </ul>
        <p>
          If the bug disappears in a plain parser script, say so. That tells maintainers the problem is probably in the
          framework, wrapper, or application code around the parser rather than in JSON parsing itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="w-6 h-6 mr-2 text-purple-500" />
          Copyable Bug Report Template
        </h2>
        <p>
          A simple template is often enough. The key is to keep it runnable and specific rather than polished.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>{`Title: <short description of the failing JSON behavior>

Environment
- Runtime: <name and exact version>
- Parser/library: <name and exact version>
- OS: <version if relevant>

Files
payload.json
<exact failing JSON text>

reproduce.<ext>
<smallest script or command that still fails>

Command
<one command to run the repro>

Observed
<exact error message, wrong output, timeout, or crash>

Expected
<what should happen instead>`}</pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-500" />
          Example: Precision Loss Repro
        </h2>
        <p>
          Here is a small repro that proves a real-world class of JSON bugs: an application treating a large numeric ID
          as a normal JavaScript number.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>{`payload.json
{"customerId":9223372036854775808}

reproduce.mjs
import fs from "node:fs";

const text = fs.readFileSync(new URL("./payload.json", import.meta.url), "utf8");
const parsed = JSON.parse(text);

console.log(process.version);
console.log(parsed.customerId);

# command
node reproduce.mjs`}</pre>
        </div>
        <p>
          <strong>Observed behavior:</strong> the value printed by the application is rounded, not the original integer
          literal from the JSON.
        </p>
        <p>
          <strong>Expected behavior:</strong> if the application treats <code>customerId</code> as an exact identifier,
          the pipeline should preserve it as a string or use a parser strategy that does not lose precision.
        </p>
        <p>
          This is a good repro because it isolates the data problem, shows the exact input, and makes the parser/runtime
          explicit. It also avoids hand-waving about &quot;wrong IDs sometimes&quot; by printing the wrong value
          directly.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes That Break Reproducibility</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Copying the parsed object instead of the original JSON text.</li>
          <li>Rewriting the payload as a source-code string and accidentally changing escapes or line endings.</li>
          <li>Removing duplicate keys, unusual Unicode, or large numbers while &quot;cleaning up&quot; the example.</li>
          <li>Reporting &quot;latest version&quot; instead of the exact runtime and parser versions.</li>
          <li>Attaching a huge payload when a six-line reduced case still reproduces the same failure.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The strongest JSON bug reports are boring in the best possible way: exact input, exact environment, exact
          command, exact mismatch. If you preserve the original payload first and then minimize it carefully, you give
          yourself and other developers a test case that can be debugged, fixed, and turned into a regression test.
        </p>
      </div>
    </>
  );
}
