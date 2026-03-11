import type { Metadata } from "next";
import { Bug, Terminal, Copy, Code, ClipboardList, Eye, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Browser Console Techniques for JSON Debugging",
  description:
    "Debug JSON faster in the browser console with snapshot logs, console.table, safe parsing, copy helpers, filters, and breakpoint workflows.",
};

export default function JsonDebuggingConsolePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3 h-8 w-8 text-red-600" />
        Browser Console Techniques for JSON Debugging
      </h1>

      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        When JSON bugs show up in the browser, the fastest fix usually comes from the console, not another round of
        guess-and-refresh edits. The most useful workflow is simple: log a labeled object, capture a stable
        snapshot when needed, switch arrays into <code>console.table()</code>, and move to breakpoints or logpoints
        once the data changes too quickly to follow.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Terminal className="mr-2 h-6 w-6 text-blue-600" />
            1. Quick Start: The Fastest JSON Debugging Workflow
          </h2>
          <p>For most API and state bugs, this sequence gets you to the answer quickly:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Log the value with a clear label so you can filter for it later.</li>
            <li>Capture a snapshot if the object may mutate after the log call.</li>
            <li>Use <code>console.table()</code> for arrays of records.</li>
            <li>Pause on a breakpoint or add a logpoint if timing is the real problem.</li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: A Practical Default</h3>
            <pre>
              {`console.log("USER_RESPONSE", responseData);
console.log("USER_RESPONSE_SNAPSHOT", JSON.stringify(responseData, null, 2));
console.table(responseData.users ?? []);`}
            </pre>
          </div>
          <p>
            That combination gives you a live object to inspect, a frozen string snapshot to compare, and a readable
            table for the part that is usually hardest to scan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Bug className="mr-2 h-6 w-6 text-red-600" />
            2. Know the Difference Between a Live Object and a Snapshot
          </h2>
          <p>
            A common console trap is assuming a logged object always shows the exact value it had at log time. If your
            code mutates that object later, the expanded view can be misleading. When exact timing matters, log a
            snapshot instead of only logging the live reference.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Snapshot Before Mutation</h3>
            <pre>
              {`console.log("payload live", payload);
console.log("payload snapshot", JSON.stringify(payload, null, 2));

payload.status = "processed";`}
            </pre>
          </div>
          <p>
            If you want an inspectable object snapshot, clone first. For plain JSON data, either{" "}
            <code>structuredClone(payload)</code> or <code>JSON.parse(JSON.stringify(payload))</code> works well.
          </p>
          <div className="border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800 rounded-lg p-4">
            Use <code>JSON.stringify(..., null, 2)</code> when you need the exact bytes you would copy into a formatter
            or bug report. Use a clone when you still want to expand properties interactively.
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ClipboardList className="mr-2 h-6 w-6 text-green-600" />
            3. Use the Right View: `console.table()` for Rows, `console.dir()` for Property Trees
          </h2>
          <p>
            Raw object previews get noisy fast. For arrays of JSON records, <code>console.table()</code> is usually the
            clearest view because it lines up fields by column. For a single object that you want to inspect as a
            property tree, <code>console.dir()</code> is often easier to scan than the default preview.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Better Views for Common Shapes</h3>
            <pre>
              {`console.table(
  (orders ?? []).map(({ id, status, total, currency }) => ({
    id,
    status,
    total,
    currency,
  }))
);

console.dir(responseData.meta);`}
            </pre>
          </div>
          <p>
            Keep the table shallow. If each row contains large nested objects, map the fields you care about into a
            smaller debug shape first.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 h-6 w-6 text-purple-600" />
            4. Parse, Pretty-Print, and Validate JSON Safely
          </h2>
          <p>
            The console is also the quickest place to test whether a string is valid JSON and whether the resulting
            shape matches what your UI expects.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Parse With Useful Error Output</h3>
            <pre>
              {`const rawJson = localStorage.getItem("cached-user");

try {
  const parsed = JSON.parse(rawJson ?? "{}");
  console.log("parsed", parsed);
  console.log("pretty", JSON.stringify(parsed, null, 2));
  console.log("has email", typeof parsed.user?.email === "string");
} catch (error) {
  console.error("Invalid JSON in cached-user", error);
}`}
            </pre>
          </div>
          <p>When parsing fails, the usual causes are small but strict JSON rules:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Property names must use double quotes.</li>
            <li>Trailing commas are invalid in JSON text.</li>
            <li>JavaScript values like <code>undefined</code> or functions cannot appear in JSON.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Copy className="mr-2 h-6 w-6 text-teal-600" />
            5. Copy the Exact JSON You Need
          </h2>
          <p>
            When you need to move console data into a formatter, test fixture, or issue report, copy the stable version
            of the data instead of copying a vague preview from the UI.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Copy a Clean JSON Snapshot</h3>
            <pre>
              {`copy(JSON.stringify(responseData, null, 2));`}
            </pre>
          </div>
          <p>
            In Chromium DevTools, <code>copy()</code> is a built-in console utility. It is not regular JavaScript, so do
            not expect it to work in your page code or in every browser console. If that helper is unavailable, assign
            the stringified JSON to a variable and copy it manually from the console output.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="mr-2 h-6 w-6 text-orange-600" />
            6. Probe Nested JSON Without Crashing the Debug Session
          </h2>
          <p>
            Once data is in scope, the console is perfect for answering targeted questions about shape and content. Use
            optional chaining and short derived expressions so missing keys do not create more noise.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Useful One-Liners</h3>
            <pre>
              {`responseData.user?.profile?.email

responseData.items?.length ?? 0

responseData.items?.find((item) => item.id === "sku_42")

responseData.items?.map((item) => item.price).reduce((sum, price) => sum + price, 0)`}
            </pre>
          </div>
          <p>
            This is also the right moment to use <code>$_</code> in Chromium DevTools, which refers to the most recent
            expression result. That is more reliable for JSON experiments than assuming <code>$1</code> points to the
            last value you logged.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Search className="mr-2 h-6 w-6 text-yellow-600" />
            7. Cut Through Noise With Labels, Filters, and Preserved Logs
          </h2>
          <p>
            Debugging JSON gets difficult when your app logs everything. Give important logs a distinctive label, then
            use the console filter bar to isolate them. If navigation or reload clears the evidence, turn on
            <strong> Preserve log</strong> before reproducing the problem.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Label Logs for Fast Filtering</h3>
            <pre>
              {`console.log("CHECKOUT_RESPONSE", checkoutResponse);
console.log("CHECKOUT_RESPONSE_SNAPSHOT", JSON.stringify(checkoutResponse, null, 2));
console.table(checkoutResponse.items ?? []);`}
            </pre>
          </div>
          <p>
            If the bug is tied to network timing, browser DevTools can also log XHR and Fetch activity for you. That is
            often faster than scattering temporary logs around your request code.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Terminal className="mr-2 h-6 w-6 text-blue-600" />
            8. Use Breakpoints and Logpoints When the JSON Changes Too Fast
          </h2>
          <p>
            If a value is correct in one frame and wrong in the next, plain logging stops being enough. Pause exactly
            where the JSON is transformed, or add a logpoint so you can inspect values without editing source files.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open DevTools and go to the file that parses, normalizes, or renders the JSON.</li>
            <li>Add a breakpoint on the line where the value is first wrong, or a logpoint if you want output only.</li>
            <li>Reproduce the bug and inspect the in-scope variables directly in the Console.</li>
            <li>Run short expressions against that paused data until the wrong assumption becomes obvious.</li>
          </ol>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Inspect the Parsed Response at the Right Moment</h3>
            <pre>
              {`async function loadUser(userId) {
  const response = await fetch("/api/users/" + userId);
  const user = await response.json(); // Breakpoint or logpoint here

  return normalizeUser(user);
}`}
            </pre>
          </div>
          <p>
            This matters because timing bugs are usually transformation bugs. The console is strongest when it is paired
            with an exact pause location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 h-6 w-6 text-pink-600" />
            9. Browser-Specific Helpers Worth Knowing
          </h2>
          <p>
            A few console helpers are excellent for JSON debugging, but they are DevTools features rather than language
            features:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Chromium DevTools supports <code>copy(value)</code> for quick clipboard export.
            </li>
            <li>
              Chromium DevTools exposes <code>$_</code> for the last evaluated expression.
            </li>
            <li>
              Chromium DevTools uses <code>$0</code> to <code>$4</code> for recently inspected DOM elements or selected
              heap objects, not for the last JSON object you logged.
            </li>
          </ul>
          <p>
            Core JavaScript tools like <code>console.log()</code>, <code>console.dir()</code>,{" "}
            <code>console.table()</code>, <code>JSON.parse()</code>, and <code>JSON.stringify()</code> are the safest
            cross-browser foundation.
          </p>
        </section>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
        <Bug className="mr-2 h-6 w-6 text-red-600" />
        Conclusion
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        The best browser console techniques for JSON debugging are the ones that reduce ambiguity: labeled logs,
        snapshot output, table views for record arrays, safe parsing checks, and precise pauses with breakpoints or
        logpoints. If you combine those with a formatter-ready copy step, you can usually move from "something is wrong
        with this payload" to the exact bad field in minutes.
      </p>
    </div>
  );
}
