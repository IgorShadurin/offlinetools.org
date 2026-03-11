import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Your JSON Formatter Shows a Red Error Message: Fix Script and Syntax Errors | Offline Tools",
  description:
    "Fix red JSON formatter errors caused by pasted JavaScript, script tags, single quotes, trailing commas, invalid escapes, and embedded </script> sequences.",
};

export default function JsonFormatterErrorMessagesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Why Your JSON Formatter Shows a Red Error Message: Troubleshooting Guide
      </h1>

      <div className="space-y-6">
        <p>
          If your JSON formatter suddenly turns part of the document red, the usual reason is simple: the input is not
          valid JSON yet. In practice, this often happens when someone pastes JavaScript, HTML, or a{" "}
          <code>&lt;script&gt;</code> snippet into a formatter that only accepts strict JSON.
        </p>

        <p>
          The fastest way to diagnose it is to ask one question first: are you formatting actual JSON, or are you
          formatting data that still contains JavaScript syntax or unescaped markup? Once you separate those cases, the
          red error is usually easy to fix.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">Quick answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>JSON requires double-quoted keys and strings.</li>
            <li>JSON does not allow comments, trailing commas, functions, or unquoted property names.</li>
            <li>Script or HTML content must be stored as a JSON string, with quotes and line breaks escaped.</li>
            <li>
              If you embed JSON inside an HTML <code>&lt;script type=&quot;application/json&quot;&gt;</code> block, a
              literal <code>&lt;/script&gt;</code> inside the data can break the page unless it is escaped.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What the red error usually means</h2>
        <p>
          A formatter highlights text in red when its parser can no longer read the document as valid JSON. The exact
          wording varies by tool and browser engine, but the rules are stable: JSON supports objects, arrays, strings,
          numbers, <code>true</code>, <code>false</code>, and <code>null</code>. Property names and string values must
          use double quotes, and control characters inside strings must be escaped.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common red-error triggers</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Single quotes such as <code>{`'name'`}</code> instead of <code>{`"name"`}</code></li>
            <li>Trailing commas before <code>{`]`}</code> or <code>{`}`}</code></li>
            <li>Comments like <code>{`// note`}</code> or <code>{`/* note */`}</code></li>
            <li>Functions, <code>undefined</code>, <code>NaN</code>, or other JavaScript-only values</li>
            <li>Raw line breaks, tabs, or unescaped quotes inside a string</li>
            <li>Copy-pasted HTML or script code that is not wrapped as a JSON string</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why script content often shows in red</h2>
        <p>
          Searchers who describe this as &quot;script inside JSON shows in red&quot; are usually hitting one of three
          cases below.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            1. You pasted JavaScript object syntax, not JSON
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  user: 'Ada',
  enabled: true,
  run: () => console.log('hi')
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This is valid JavaScript syntax, but it is not valid JSON. The unquoted key, single quotes, and function
            value will all make a JSON formatter complain.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            2. The script or HTML is not encoded as a JSON string
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "snippet": "<script>
  alert("hi")
</script>"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The inner quotes around <code>{`"hi"`}</code> and the raw line breaks must be escaped. Otherwise the JSON
            string ends early and the rest of the text turns red.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            3. You embedded JSON inside an HTML script block
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<script type="application/json">
{"snippet":"</script>"}
</script>`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            In this context, the HTML parser sees the literal <code>&lt;/script&gt;</code> and closes the element.
            The JSON may be valid by itself, but the page breaks because the surrounding HTML parser stops reading the
            data block where you did not expect it to.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How to fix each case</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">
            Convert JavaScript-looking data into real JSON
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user": "Ada",
  "enabled": true,
  "run": "console.log('hi')"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Every key uses double quotes. String values use double quotes. The function is no longer treated as code.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">
            Store script text as a properly escaped JSON string
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "snippet": "<script>\\n  alert(\\"hi\\")\\n</script>"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The content is just text now. The quotes are escaped as <code>{`\\"`}</code>, and line breaks are escaped
            as <code>{`\\n`}</code>.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">
            If the JSON will live inside an HTML script tag, escape the tag text too
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<script type="application/json">
{"snippet":"\\u003Cscript>alert(\\"hi\\")\\u003C/script>"}
</script>`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Escaping the less-than character as <code>{`\\u003C`}</code> is the safest option when serializing JSON
            into HTML, because it prevents accidental <code>&lt;script&gt;</code> and <code>&lt;/script&gt;</code>
            sequences in the raw page source.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Use the error text as a clue, not a verdict</h2>
        <p>
          The line the formatter highlights is often where the parser finally gave up, not where the mistake started.
          If the red marker appears on one line, inspect the line above it too.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
              Unexpected token &lt;
            </h3>
            <p className="text-sm">
              You probably pasted HTML, an error page, or raw <code>&lt;script&gt;</code> markup where JSON was
              expected.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
              Unexpected token &apos;
            </h3>
            <p className="text-sm">
              Single quotes are common in JavaScript objects, but JSON requires double quotes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
              Unexpected end of JSON input
            </h3>
            <p className="text-sm">
              A quote, brace, or bracket is missing, or the data was cut off during copy and paste.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
              Bad control character in string literal
            </h3>
            <p className="text-sm">
              A raw tab, newline, or other control character was pasted inside a string instead of being escaped.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The safest fix: let code escape it for you</h2>
        <p>
          If you are generating JSON from application code, do not hand-escape script snippets or HTML. Build a normal
          object and let a serializer produce valid JSON for you.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const payload = {
  snippet: '<script>alert("hi")</script>',
};

const json = JSON.stringify(payload);
const htmlSafeJson = json.replace(/</g, "\\\\u003C");`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            <code>JSON.stringify()</code> handles quotes, slashes, and control characters correctly. If you then place
            that JSON into HTML, replacing <code>&lt;</code> with <code>{`\\u003C`}</code> avoids script-tag parsing
            issues in the page source.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">If the content is red but the JSON still formats</h2>
        <p>
          Not every red highlight means invalid JSON. Some editors flag words like <code>&lt;script&gt;</code> because
          they look dangerous in an HTML context. If the formatter successfully parses and pretty-prints the document,
          your JSON syntax is valid. The remaining question is context: where will that JSON be rendered, embedded, or
          executed?
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>If the formatter refuses to parse, you have a JSON syntax problem.</li>
          <li>If it parses but the page still breaks, you probably have an HTML embedding problem.</li>
          <li>If it parses and the page works, the red color may just be a highlighter or security warning.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h2 className="text-lg font-medium">Practical checklist</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Make sure every key and string uses double quotes.</li>
            <li>Remove comments, trailing commas, and functions.</li>
            <li>Escape inner quotes and line breaks inside HTML or script snippets.</li>
            <li>Check the line above the red marker for the real mistake.</li>
            <li>
              If the JSON is embedded into HTML, escape <code>&lt;</code> as <code>{`\\u003C`}</code>.
            </li>
            <li>When possible, generate JSON with a serializer instead of editing large blobs by hand.</li>
          </ul>
        </div>

        <p>
          In short, red text in a JSON formatter almost never means the word &quot;script&quot; itself is forbidden. It
          usually means the surrounding content is not strict JSON yet, or that valid JSON is being dropped into HTML
          without the extra escaping that HTML parsing requires.
        </p>
      </div>
    </>
  );
}
