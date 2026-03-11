import type { Metadata } from "next";
import {
  Search,
  Code,
  ListTree,
  Eye,
  Bookmark,
  FlaskConical,
  Lightbulb,
  Info,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Watch Expressions in Chrome DevTools and VS Code",
  description:
    "Use watch expressions to inspect nested JSON properties faster in Chrome DevTools and VS Code. Learn safe paths, array access, raw JSON parsing, and common debugger pitfalls.",
};

export default function WatchExpressionsJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Eye className="text-blue-500" size={32} />
        Watch Expressions for JSON Properties in Debuggers
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          If you are debugging a large API response, watching the entire object is usually the slowest way to find the
          bug. A better approach is to watch the exact JSON path you care about, such as{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            response?.data?.user?.email
          </code>{" "}
          or{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            payload?.items?.[0]?.status
          </code>
          .
        </p>
        <p>
          One detail matters up front: in most JavaScript debuggers you are not watching raw JSON as a special runtime
          type. You are usually watching a normal object, array, or string created from JSON. That distinction explains
          why some expressions work immediately and others require parsing first.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search className="text-green-500" /> Quick Answer
        </h2>
        <p>For JSON-heavy debugging sessions, the most useful watch expressions are usually:</p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`// Deep property
response?.data?.user?.profile?.email

// Array element
response?.data?.orders?.[0]?.total

// Derived check
response?.data?.orders?.length ?? 0

// Dynamic key
response?.data?.flags?.[featureName]

// Raw JSON string only when needed
(() => {
  try {
    return JSON.parse(rawBody)?.user?.id;
  } catch {
    return "invalid JSON";
  }
})()`}
          </pre>
        </div>
        <p>
          The pattern is simple: watch the smallest stable expression that answers your current question. Leaf values,
          counts, booleans, and short derived expressions are usually more useful than watching a whole response body.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="text-orange-500" /> Why Whole-Object Watching Breaks Down
        </h2>
        <p>
          Large JSON payloads are noisy. Expanding nested objects every time execution pauses wastes time, especially
          when the bug depends on one property changing across retries, loop iterations, or stack frames.
        </p>
        <p>
          For example, if this object is in scope:
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`{
  "user": {
    "id": "u_123",
    "profile": {
      "email": "dev@example.com",
      "address": {
        "city": "Tallinn"
      }
    }
  },
  "orders": [
    { "id": "ord_1", "total": 49.99, "status": "paid" },
    { "id": "ord_2", "total": 19.99, "status": "pending" }
  ],
  "feature-flags": {
    "beta-checkout": true
  }
}`}
          </pre>
        </div>
        <p>
          Watching{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">response</code> tells
          you almost nothing at a glance. Watching{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            response?.user?.profile?.address?.city
          </code>{" "}
          or{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
            response?.orders?.[1]?.status
          </code>{" "}
          does.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="text-purple-500" /> JSON Watch Patterns That Actually Help
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> 1. Safe nested property access
        </h3>
        <p>
          Use optional chaining so the watch does not fail just because one parent object is missing at the current
          breakpoint.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`response?.user?.profile?.email
response?.user?.profile?.address?.city`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> 2. Arrays, indexes, and counts
        </h3>
        <p>
          When debugging JSON arrays, counts and one representative element are often enough to verify that the data is
          shaped correctly.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`response?.orders?.length
response?.orders?.[0]?.total
response?.orders?.[currentIndex]?.status`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> 3. Bracket notation for real-world keys
        </h3>
        <p>
          API payloads often contain keys that are awkward in dot notation, such as hyphenated feature flags or keys
          chosen at runtime.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`response?.["feature-flags"]?.["beta-checkout"]
response?.itemsById?.[selectedId]
response?.meta?.[headerName]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> 4. Short derived expressions
        </h3>
        <p>
          Watch expressions are best when they answer a question directly instead of making you interpret a whole
          object.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`response?.orders?.some((order) => order.status === "pending")
response?.orders?.map((order) => order.id)
typeof response?.user?.id`}
          </pre>
        </div>
        <p>
          Keep these short. If a watch expression starts to look like application logic, it is usually better as a
          temporary log, a helper variable, or a Debug Console experiment.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> 5. Raw JSON strings need different handling
        </h3>
        <p>
          Sometimes the value in scope is still a string, for example a mocked response body before{" "}
          <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">JSON.parse</code> or a
          request body you captured manually. In that case, property access will not work until you parse it.
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg my-4 overflow-x-auto text-gray-900 dark:text-gray-50">
          <pre className="text-sm">
            {`// rawBody is a string, not an object
JSON.parse(rawBody).user.id

// Safer for messy test payloads
(() => {
  try {
    return JSON.parse(rawBody)?.user?.id;
  } catch {
    return "invalid JSON";
  }
})()`}
          </pre>
        </div>
        <p>
          If the payload is large, avoid leaving a repeated parse in a permanent watch unless you really need it. Parse
          once in code or use the Debug Console for one-off checks.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FlaskConical className="text-cyan-500" /> Current Debugger Workflows That Matter
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> Chrome and Edge DevTools
        </h3>
        <p>
          In current Chrome-family DevTools, use the <strong>Watch</strong> pane in <strong>Sources</strong> when you
          want the expression reevaluated as execution pauses and while stepping through code. This is the right choice
          for breakpoint-driven JSON debugging.
        </p>
        <p>
          DevTools also has <strong>Live Expressions</strong> in the Console. Those update without stopping execution,
          which makes them useful for continuously changing values, but they are not a replacement for the Watch pane.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> VS Code
        </h3>
        <p>
          In current VS Code, add JSON property paths to the <strong>WATCH</strong> section in <strong>Run and
          Debug</strong>. Results are evaluated relative to the currently selected stack frame, so a watch that works in
          one frame can show <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">not available</code> in another.
        </p>
        <p>
          One practical shortcut is to right-click a nested value in <strong>VARIABLES</strong> and use{" "}
          <strong>Copy as Expression</strong>. That avoids hand-typing deep JSON paths and reduces mistakes when object
          names are long.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ChevronRight /> Watch vs Debug Console
        </h3>
        <p>
          Use the Watch pane for values you need to see repeatedly across pauses. Use the Debug Console for one-off
          probes, quick transformations, or multi-line experiments. In VS Code, the Debug Console supports multi-line
          input with <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">Shift+Enter</code>, which is helpful for temporary JSON parsing and filtering.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" /> Common Reasons JSON Watches Fail
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="font-semibold">Wrong stack frame:</strong> The variable exists, but not in the frame you
            currently selected.
          </li>
          <li>
            <strong className="font-semibold">The data is still a string:</strong> You are trying to read{" "}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">payload.user.id</code>{" "}
            before parsing the JSON text.
          </li>
          <li>
            <strong className="font-semibold">A parent value is null or undefined:</strong> Switch to optional chaining
            instead of direct property access.
          </li>
          <li>
            <strong className="font-semibold">The watch is too broad:</strong> Watching an entire response makes it hard
            to spot the actual mismatch. Watch the leaf value, count, or boolean that proves the state you care about.
          </li>
          <li>
            <strong className="font-semibold">The expression does too much work:</strong> Repeated mapping, reducing,
            or parsing can make debugging noisier than necessary. Move heavy inspection into the Debug Console or a
            temporary helper variable.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb className="text-yellow-500" /> Practical Rules of Thumb
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Start with the smallest useful path, such as{" "}
            <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">
              response?.user?.id
            </code>
            , not the whole response object.
          </li>
          <li>
            Prefer optional chaining in watch expressions unless you know the full path always exists.
          </li>
          <li>
            Watch counts, statuses, and IDs first. They usually explain data bugs faster than watching complete nested
            objects.
          </li>
          <li>
            If you copied a raw response body from logs or a network tool, validate and pretty-print it before trying to
            reason about the structure in the debugger.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="text-blue-500" /> When This Technique Saves the Most Time
        </h2>
        <p>
          Targeted watch expressions are most valuable when the same JSON field must be checked across several
          breakpoints, retries, or loop iterations. They are less useful for one-off exploration, where the Variables
          panel or Debug Console is often faster.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bookmark className="text-pink-500" /> Conclusion
        </h2>
        <p>
          The fastest way to debug JSON is rarely to expand the whole payload. In Chrome DevTools or VS Code, watch the
          exact property path, guard it with optional chaining, and switch to the Debug Console when the expression
          becomes heavy or the value is still raw JSON text. That gives you cleaner output, faster comparisons, and a
          much better chance of seeing the real bug immediately.
        </p>
      </div>
    </>
  );
}
