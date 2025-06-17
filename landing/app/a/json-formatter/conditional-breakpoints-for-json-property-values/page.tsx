import type { Metadata } from "next";
import { Bug, Code, Info, ListChecks, Laptop, FileJson, MessageCircleCode, CheckCheck } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Conditional Breakpoints for JSON Property Values | Debugging Tips",
  description:
    "Learn how to use conditional breakpoints effectively to debug code handling JSON data by inspecting specific property values.",
};

export default function ConditionalJsonBreakpointsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Bug size={32} /> Conditional Breakpoints for JSON Property Values
      </h1>

      <div className="space-y-6">
        <p>
          Debugging code that processes JSON data can be challenging, especially when dealing with large or complex
          structures, or when an issue only occurs under specific data conditions. Stepping through every line becomes
          inefficient. This is where <strong>conditional breakpoints</strong> become an invaluable tool.
        </p>
        <p>
          A conditional breakpoint is a breakpoint that only pauses execution when a specified boolean expression
          evaluates to <code>true</code>. By setting conditions based on the values of properties within your JSON data
          structures, you can pinpoint exactly when and where an interesting or problematic data state occurs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info size={24} /> Why Use Conditional Breakpoints with JSON?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Targeted Debugging:</strong> Stop execution only when a specific property has a certain value (e.g.,
            `status === &apos;error&apos;`) or meets a condition (e.g., `price &gt; 1000`).
          </li>
          <li>
            <strong>Handling Large Datasets:</strong> Avoid breaking on every iteration of a loop processing a large
            JSON array; break only when a specific item is encountered.
          </li>
          <li>
            <strong>Isolating Edge Cases:</strong> Debug behavior that only manifests with unusual or specific data
            values buried deep within the JSON structure.
          </li>
          <li>
            <strong>Reduced Debugging Time:</strong> Get straight to the relevant part of the code without manually
            stepping through irrelevant data processing.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> The Basics: Writing the Condition
        </h2>
        <p>
          The condition you write is typically a standard JavaScript expression that evaluates to either{" "}
          <code>true</code> or <code>false</code>. This expression has access to the variables in the scope where you
          set the breakpoint. When dealing with JSON data, this means you can access the parsed JavaScript objects and
          arrays.
        </p>

        <p>
          Let's assume you have a variable named <code>data</code> which holds your parsed JSON object, like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`const data = {
  id: 123,
  user: {
    name: "Alice",
    status: "active"
  },
  items: [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 }
  ],
  settings: null
};`}
          </pre>
        </div>

        <p>
          If you set a breakpoint on a line of code where the <code>data</code> variable is accessible, you can use
          expressions like these for your condition:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Basic Property Check
        </h3>
        <p>Break when the user's status is 'pending':</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`data.user.status === 'pending'`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Numerical Comparison
        </h3>
        <p>Break when the overall data ID is greater than 100:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`data.id > 100`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Checking Array Elements (using iteration variable)
        </h3>
        <p>
          If you are looping through <code>data.items</code> (e.g., in a <code>for...of</code> or
          <code>forEach</code> loop with a variable <code>item</code>), break when an item's price is over $1000:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`item.price > 1000`}</pre>
        </div>
        <p>Break when an item has a specific ID:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`item.id === 1`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Checking Array Length
        </h3>
        <p>Break if the items array has more than 5 elements:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`data.items.length > 5`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Checking for Existence or Null/Undefined
        </h3>
        <p>Break if the settings property is null:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`data.settings === null`}</pre>
        </div>
        <p>Break if a nested property exists (using optional chaining for safety):</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`data.user?.address !== undefined`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Combining Conditions
        </h3>
        <p>Break if the user is active AND there is at least one item:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`data.user.status === 'active' && data.items.length > 0`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks size={20} /> Checking Types
        </h3>
        <p>Break if the user's status is not a string:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>{`typeof data.user.status !== 'string'`}</pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Laptop size={24} /> Setting Conditional Breakpoints in Different Tools
        </h2>
        <p>
          The exact way you set a conditional breakpoint varies slightly depending on your development environment.
          However, the core concept of adding an expression remains the same.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Browser Developer Tools (Chrome, Firefox, Edge)
        </h3>
        <p>
          Open the Sources (or Debugger) tab. Find the line where you want to set the breakpoint. Right-click on the
          line number and select "Add conditional breakpoint..." or "Edit breakpoint". A small text field will appear
          where you can type your JavaScript condition. Press Enter to save it.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-semibold mb-2">Example (Browser DevTools):</p>
          {/* Fix: Escape '>' symbols */}
          <p>
            Right-click line number &gt; Add conditional breakpoint &gt; Type <code>data.items.length === 0</code>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">VS Code</h3>
        <p>
          In VS Code, you can right-click on the left margin (where breakpoints are set) and select "Add Conditional
          Breakpoint...". A dropdown will appear allowing you to choose "Expression", "Hit Count", or "Log Message".
          Select "Expression" and type your JavaScript condition.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-semibold mb-2">Example (VS Code):</p>
          <p>
            Right-click margin &gt; Add Conditional Breakpoint... &gt; Select Expression &gt; Type{" "}
            <code>data.user?.status === &apos;inactive&apos;</code>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck size={24} /> Tips and Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keep Conditions Simple:</strong> Complex expressions can be harder to get right and might slow down
            the debugger.
          </li>
          <li>
            <strong>Avoid Side Effects:</strong> Your condition expression should only read variables, not change them
            or call functions that modify state.
          </li>
          <li>
            <strong>Use Optional Chaining (`?.`) and Nullish Coalescing (`??`):</strong> When accessing nested
            properties, use optional chaining (`data?.user?.address`) to prevent errors if an intermediate property is
            null or undefined. This makes your condition more robust.
          </li>
          <li>
            <strong>Check the Scope:</strong> Ensure the variables you reference in your condition are actually in scope
            on the line where you set the breakpoint.
          </li>
          <li>
            <strong>Combine with Logpoints:</strong> Some debuggers allow "logpoints" (or "tracepoints") which log a
            message to the console without stopping execution. You can also add conditions to these! This is great for
            logging a JSON property's value only when a condition is met:
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <MessageCircleCode size={18} className="inline-block mr-2" />
                {`console.log('User status is: ', data.user.status)`} (Condition: &#x7b;`data.user.status ===
                'active'`&#x7d;)
              </pre>
            </div>
          </li>
          <li>
            <strong>Inspecting Complex Values:</strong> If you need to see the content of a complex object or array
            within a logpoint or condition check, you can use <code>JSON.stringify()</code>. E.g., logpoint message:{" "}
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
              <pre>
                <MessageCircleCode size={18} className="inline-block mr-2" />
                {`JSON.stringify(item)`} (Condition: &#x7b;`item.id === 5`&#x7d;)
              </pre>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson size={24} /> Conclusion
        </h2>
        <p>
          Mastering conditional breakpoints is a significant step towards efficient debugging, especially when working
          with structured data like JSON. By writing precise conditions based on the values of your JSON properties, you
          can dramatically reduce the time spent stepping through code and quickly arrive at the state you need to
          inspect. Integrate this technique into your workflow to make debugging JSON data much more productive.
        </p>
      </div>
    </>
  );
}
