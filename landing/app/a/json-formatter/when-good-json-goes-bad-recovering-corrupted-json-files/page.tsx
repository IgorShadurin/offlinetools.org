import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about recovering corrupted JSON files
 */
export const metadata: Metadata = {
  title: "How to Recover Corrupted JSON Files: Fix Truncated and Invalid JSON | Offline Tools",
  description:
    "Recover corrupted JSON files with a practical workflow for truncated payloads, HTML instead of JSON, broken quotes, trailing commas, BOM issues, and encoding mistakes.",
};

/**
 * Article page component for JSON formatter article about recovering corrupted JSON files
 */
export default function JsonFormatterCorruptedFilesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">When Good JSON Goes Bad: Recovering Corrupted JSON Files</h1>

      <div className="space-y-6">
        <p>
          If you need to recover a corrupted JSON file, start by answering one question before you edit anything: is
          the file actually malformed JSON, or did you receive the wrong payload entirely? Many &quot;corrupted JSON&quot;
          incidents turn out to be truncated writes, HTML error pages saved as `.json`, or text that was decoded with
          the wrong character set.
        </p>

        <p>
          The fastest reliable workflow is simple: preserve the original file, validate it, map the first parser error
          to the most likely damage, repair the smallest possible section, and validate again. That is usually much
          faster than guessing and rewriting the whole document from scratch.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Start With Triage, Not Editing</h2>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Make a copy first.</strong>
            <p className="mt-1">
              Work on a duplicate so you can compare versions and roll back when a repair attempt makes the structure
              worse.
            </p>
          </li>
          <li>
            <strong>Confirm the file is supposed to be JSON.</strong>
            <p className="mt-1">
              If the content starts with <code>&lt;html</code>, <code>&lt;!DOCTYPE</code>, or an error banner, your
              problem is probably upstream. The file may never have contained JSON at all.
            </p>
          </li>
          <li>
            <strong>Validate once and record the first error.</strong>
            <p className="mt-1">
              The first parser error is usually the most useful one. Feed the file into a validator or formatter that
              reports the earliest failing location instead of trying random edits.
            </p>
          </li>
          <li>
            <strong>Check the end of the file.</strong>
            <p className="mt-1">
              A surprising number of broken JSON files are simply cut off mid-object or mid-array because a write or
              download stopped early.
            </p>
          </li>
          <li>
            <strong>Only repair what you can justify.</strong>
            <p className="mt-1">
              Close open braces, remove invalid commas, or restore missing quotes when the intended structure is
              obvious. Do not invent missing business data unless you have a schema or backup to confirm it.
            </p>
          </li>
        </ol>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/20 my-6 border-l-4 border-blue-400">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-200">Current JSON Rules That Matter</h3>
          <p className="mt-2 text-blue-800 dark:text-blue-100">
            Standard JSON is still strict. According to{" "}
            <a className="underline" href="https://www.rfc-editor.org/rfc/rfc8259">
              RFC 8259
            </a>
            , JSON exchanged between systems should use UTF-8, object keys must be double-quoted strings, and comments
            or trailing commas are not valid JSON. A leading BOM can appear in real files; some parsers ignore it, but
            it is still worth stripping once if the first character looks suspicious.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What the Error Usually Means</h2>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <code>Unexpected token &lt;</code> usually means you saved an HTML response, login page, proxy error, or
            stack trace instead of JSON.
          </li>
          <li>
            <code>Unexpected end of JSON input</code> or an end-of-data error usually means the file is empty or
            truncated.
          </li>
          <li>
            <code>Expected property name</code> or a message about double-quoted property names usually means you have
            JavaScript-object syntax, comments, or single quotes instead of strict JSON.
          </li>
          <li>
            Errors near a closing <code>{"}"}</code> or <code>]</code> often point to a trailing comma or an extra
            closing bracket.
          </li>
          <li>
            <code>Bad control character in string literal</code> often means a raw tab, newline, or broken escape
            sequence inside a quoted string.
          </li>
          <li>
            If the file parses but values look like <code>caf\\u00c3\\u00a9</code>, you likely have an encoding or
            decode problem rather than JSON syntax corruption.
          </li>
        </ul>

        <p>
          MDN&apos;s current{" "}
          <a className="underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/JSON_bad_parse">
            JSON.parse error reference
          </a>{" "}
          is useful when the exact wording looks unfamiliar, but the practical pattern is the same: fix the first
          structural break, then validate again.
        </p>

        <h2 className="text-2xl font-semibold mt-8">A Practical Recovery Workflow</h2>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Preserve the original bytes.</strong>
            <p className="mt-1">
              Rename the damaged file, duplicate it, and keep the untouched copy in case you later discover the repair
              introduced silent data changes.
            </p>
          </li>

          <li>
            <strong>Localize the first break.</strong>
            <p className="mt-1">
              Paste the file into a JSON formatter or validator and note the first line and column. On large files,
              inspect around that location first instead of scrolling blindly from the top.
            </p>
          </li>

          <li>
            <strong>Repair structure in this order:</strong>
            <p className="mt-1">Quotes, brackets and braces, commas and colons, then escapes and encoding.</p>
          </li>

          <li>
            <strong>Prefer deleting incomplete fragments over guessing missing values.</strong>
            <p className="mt-1">
              If the last object in an array is cut off halfway through, remove that incomplete record and close the
              array unless you can reconstruct the missing fields from logs, schema defaults, or a backup.
            </p>
          </li>

          <li>
            <strong>Revalidate after every meaningful edit.</strong>
            <p className="mt-1">
              Multiple tiny fixes with repeated validation are safer than a large rewrite that changes both structure
              and content at once.
            </p>
          </li>

          <li>
            <strong>Salvage a valid subset if the whole file cannot be restored.</strong>
            <p className="mt-1">
              For append-heavy data, it is often better to recover all complete objects up to the point of corruption
              and emit fresh JSON than to perfectly recreate missing bytes.
            </p>
          </li>
        </ol>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Useful Rule of Thumb</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            A JSON formatter is best used as a locator and verifier, not as a magic repair engine. Use it to find the
            first structural failure, fix that failure deliberately, and then confirm the repaired output is valid
            before you overwrite the source file.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Practical Recovery Examples</h2>

        <h3 className="text-xl font-medium mt-6">Example 1: HTML Was Saved Instead of JSON</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">What You Found:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`<!DOCTYPE html>
<html>
  <head><title>502 Bad Gateway</title></head>
  <body>Upstream server error</body>
</html>`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">What It Means:</h4>
          <p className="text-sm mt-1">
            This is not corrupted JSON. The upstream service returned an HTML error page, and the client saved it as if
            it were JSON.
          </p>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovery Strategy:</h4>
          <ol className="list-decimal pl-6 space-y-1 text-sm">
            <li>Check the HTTP status code, auth state, or reverse proxy logs.</li>
            <li>Repeat the request until you obtain the real JSON payload.</li>
            <li>Do not try to &quot;fix&quot; this file with syntax edits.</li>
          </ol>
        </div>

        <h3 className="text-xl font-medium mt-6">Example 2: Truncated Array or Object</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Truncated JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@example.com"
    },
    {
      "id": 2,
      "name": "Jane Doe",`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Safe Recovery:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john@example.com"
    }
  ]
}`}
          </pre>

          <p className="text-sm mt-3">
            The second record is incomplete, so the safe repair is to keep only the fully known object and close the
            structure. If you can recover Jane Doe&apos;s missing fields from logs or a previous export, add them back
            explicitly. If not, do not fabricate them.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Example 3: JavaScript Object Syntax Masquerading as JSON</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Invalid JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  server_config: {
    // local override
    host: 'api.example.org',
    port: 443,
    retry: true,
  }
}`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovered JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "server_config": {
    "host": "api.example.org",
    "port": 443,
    "retry": true
  }
}`}
          </pre>

          <p className="text-sm mt-3">
            This pattern is common when a config file was copied from JavaScript, JSON5, or a hand-edited snippet.
            Remove comments, use double quotes, and delete trailing commas.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">Example 4: Valid JSON, Wrong Text Encoding</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Syntactically Valid but Corrupted Data:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "product": "caf\\u00c3\\u00a9 mug"
}`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Recovered JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "product": "caf\\u00e9 mug"
}`}
          </pre>

          <p className="text-sm mt-3">
            JSON supports Unicode text. The problem here is not that the file contains non-ASCII characters; the
            problem is that the text was decoded or re-encoded incorrectly earlier in the pipeline. If possible,
            recover from the original UTF-8 source instead of manually replacing characters one by one.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When Full Recovery Is Not Realistic</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>The file was overwritten and the missing bytes are gone with no backups or logs.</li>
          <li>Key names or string values were damaged in the middle and you cannot infer the original text safely.</li>
          <li>The data order matters and you cannot prove which records were partially written or duplicated.</li>
          <li>You only have a derived export, not the source of truth that produced it.</li>
        </ul>

        <p>
          In those situations, the realistic goal is not perfect reconstruction. It is to salvage the confirmed subset,
          document what was lost, and rebuild the rest from backups, event logs, or the upstream system that originally
          generated the JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Not to Do</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Do not replace every single quote blindly. Apostrophes inside string values can make that destructive.</li>
          <li>Do not use regular expressions to rewrite deeply nested JSON wholesale.</li>
          <li>Do not strip all non-ASCII text. Modern JSON supports Unicode just fine.</li>
          <li>Do not keep editing after the first valid parse without checking whether the data itself still makes sense.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">How To Prevent the Next Corruption</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Write to a temporary file and rename it atomically after validation succeeds.</li>
          <li>Validate JSON before saving, deploying, or importing it into another system.</li>
          <li>Keep versioned backups for files that matter.</li>
          <li>Store append-heavy logs as NDJSON or JSONL when one-record-per-line is acceptable.</li>
          <li>Log upstream HTTP status codes so HTML error pages are easier to spot immediately.</li>
        </ul>

        <p>
          Recovering corrupted JSON is mostly a discipline problem, not a mystery problem. Preserve the original,
          identify the first real structural failure, repair only what you can justify, and validate after every edit.
          That approach gives you the best chance of keeping the data you can trust while avoiding silent corruption you
          introduce yourself.
        </p>
      </div>
    </>
  );
}
