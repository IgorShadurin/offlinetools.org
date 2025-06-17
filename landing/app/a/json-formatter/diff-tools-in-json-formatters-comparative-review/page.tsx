import type { Metadata } from "next";
import { Code, FileDiff, ListChecks, Settings } from "lucide-react"; // Import icons

export const metadata: Metadata = {
  title: "Diff Tools in JSON Formatters: Comparative Review | Offline Tools",
  description:
    "A comparative review of diff tools used within or alongside JSON formatters, exploring text-based vs. structure-aware diffing for JSON data.",
};

export default function JsonDiffToolReview() {
  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Diff Tools in JSON Formatters: A Comparative Review</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-blue-500" />
            Introduction: The Need for JSON Diffing
          </h2>
          <p>
            JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. It's used for
            configuration files, API responses, data storage, and more. As developers, we often need to compare two
            versions of a JSON document to understand what has changed. This is where diff tools come in.
          </p>
          <p>
            While standard text diff tools (like Git's diff) can show line-by-line differences, they often fall short
            with JSON due to its flexible formatting, arbitrary key order in objects, and nested structures. Comparing
            raw, unformatted JSON files can result in diffs that are noisy and misleading, highlighting changes in
            whitespace or key order rather than actual data modifications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ListChecks className="w-6 h-6 mr-2 text-green-500" />
            The Role of JSON Formatters
          </h2>
          <p>
            Before diffing, it's crucial to have a consistent representation of the JSON data. JSON formatters (also
            known as pretty-printers or beautifiers) serve this purpose. They take raw JSON and output a human-readable
            version with consistent indentation, spacing, and sometimes sorted keys.
          </p>
          <p>
            Applying a standard formatting ensures that pure text-based diffs are less cluttered by stylistic
            differences. However, even with consistent formatting, text diffs still treat the JSON as plain text, which
            can be problematic.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h3 className="text-lg font-medium mb-2">Example: Raw vs. Formatted JSON</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Raw JSON:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`{"name":"Alice","age":30,"city":"New York"}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Formatted JSON:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
                </pre>
              </div>
            </div>
            <p className="mt-2 text-sm italic">
              A formatter adds whitespace and indentation for readability. Some formatters can also sort keys
              alphabetically.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileDiff className="w-6 h-6 mr-2 text-red-500" />
            Text-Based Diffing on Formatted JSON
          </h2>
          <p>
            The simplest approach is to format both JSON documents using the same settings and then run a standard
            line-by-line text diff. Tools like `diff` (Unix command), online text diff checkers, or diff views in IDEs
            work this way.
          </p>
          <h3 className="text-xl font-semibold mt-6">Pros:</h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Widely available and easy to use.</li>
            <li>
              Shows *exact* textual changes, including comments (if allowed by the parser/formatter) or original
              formatting variations before formatting.
            </li>
            <li>Simple to implement.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6">Cons:</h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Sensitive to non-semantic changes:</span> Changes in key order (which is not
              significant in JSON objects) or minor formatting variations not standardized by the formatter can appear
              as significant differences.
            </li>
            <li>
              <span className="font-medium">Doesn't understand structure:</span> It doesn't know if a change is within a
              string, a number, an array element, or a key name.
            </li>
            <li>Diffs can still be noisy if objects have different key orders, even after formatting.</li>
          </ul>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h3 className="text-lg font-medium mb-2">Example 1: Text Diff Issue (Key Order)</h3>
            <p className="text-sm italic mb-2">
              Assume both files are formatted with 2-space indentation, but File B has different key order.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">File A:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-1">File B:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`{
  "city": "New York",
  "name": "Alice",
  "age": 30
}`}
                </pre>
              </div>
            </div>
            <p className="mt-4 font-semibold">Result of a Text Diff:</p>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm text-red-700 dark:text-red-300">
              {`--- File A
+++ File B
@@ -1,4 +1,4 @@
 {
-  "name": "Alice",
-  "age": 30,
   "city": "New York",
+  "name": "Alice",
+  "age": 30
 }`}
            </pre>
            <p className="mt-2 text-sm italic">
              A standard text diff shows multiple lines changed, even though the actual data (name, age, city values) is
              identical.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-purple-500" />
            Structure-Aware (Semantic) Diffing
          </h2>
          <p>
            A more sophisticated approach involves parsing the JSON documents into their native data structures
            (objects, arrays, primitives) and then comparing these structures recursively. This is known as semantic or
            structure-aware diffing.
          </p>
          <p>
            This method compares values based on their position in the structure, ignoring whitespace and object key
            order. It can identify:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Added, removed, or changed key-value pairs in objects.</li>
            <li>
              Added, removed, or changed elements in arrays (though array diffing can be complex, sometimes requiring
              configuration on how to match elements).
            </li>
            <li>Changes in primitive values (strings, numbers, booleans, null).</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6">Pros:</h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Accurate data comparison:</span> Ignores irrelevant formatting or key order
              differences.
            </li>
            <li>Provides a clearer view of logical changes to the data structure.</li>
            <li>Can highlight specific value changes within nested structures.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6">Cons:</h3>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>More complex to implement than text diffing.</li>
            <li>Requires a JSON parser.</li>
            <li>May not preserve original formatting details if needed (though some tools offer combined views).</li>
            <li>
              Array diffing can be tricky – simple tools might just mark arrays as changed if elements are reordered;
              advanced tools might use heuristics or specified key fields to match array elements.
            </li>
          </ul>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h3 className="text-lg font-medium mb-2">Example 2: Semantic Diff (Value Change and Addition)</h3>
            <p className="text-sm italic mb-2">Comparing File A from Example 1 to a new File C.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">File A:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-1">File C:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`{
  "name": "Alicia",
  "age": 31,
  "city": "New York",
  "occupation": "Engineer"
}`}
                </pre>
              </div>
            </div>
            <p className="mt-4 font-semibold">Result of a Semantic Diff (Conceptual Output):</p>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm text-green-700 dark:text-green-300">
              {`Object /:
  name: "Alice" -> "Alicia" (changed)
  age: 30 -> 31 (changed)
  occupation: (missing) -> "Engineer" (added)`}
            </pre>
            <p className="mt-2 text-sm italic">
              A semantic diff clearly shows which specific values changed and which keys were added or removed,
              regardless of their position or surrounding whitespace.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h3 className="text-lg font-medium mb-2">Example 3: Array Differences</h3>
            <p className="text-sm italic mb-2">Comparing two arrays.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Array 1:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`[
  "apple",
  "banana",
  "cherry"
]`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Array 2:</h4>
                <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
                  {`[
  "apple",
  "date",
  "banana",
  "elderberry"
]`}
                </pre>
              </div>
            </div>
            <p className="mt-4 font-semibold">Result of a Semantic Diff (Conceptual Output - Simple):</p>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm text-yellow-700 dark:text-yellow-300">
              {`Array /:
  Element at index 1: "banana" -> "date" (changed)
  Element at index 2: "cherry" -> "banana" (changed/moved?)
  Element at index 3: (missing) -> "elderberry" (added)`}
            </pre>
            <p className="mt-2 font-semibold">Result of a Semantic Diff (Conceptual Output - Advanced/Array Aware):</p>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm text-blue-700 dark:text-blue-300">
              {`Array /:
  "banana": Moved from index 1 to index 2
  "cherry": Removed
  "date": Added at index 1
  "elderberry": Added at index 3`}
            </pre>
            <p className="mt-2 text-sm italic">
              Simple semantic diffs might show changes based on index. More advanced diffs can detect moves, additions,
              and removals more accurately, though this requires more complex algorithms.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ListChecks className="w-6 h-6 mr-2 text-teal-500" />
            Features to Look for in JSON Diff Tools/Formatters
          </h2>
          <p>When choosing or evaluating tools for diffing JSON, consider these features:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Customizable Formatting:</span> Control indentation level, spacing, and
              whether to sort keys. Consistency is key for text diffing.
            </li>
            <li>
              <span className="font-medium">Semantic Diff Mode:</span> The ability to compare structures directly,
              ignoring whitespace and key order. This is often the most useful for understanding data changes.
            </li>
            <li>
              <span className="font-medium">Array Comparison Strategy:</span> How the tool handles array differences (by
              index, by matching elements using a key, detecting moves).
            </li>
            <li>
              <span className="font-medium">Visual Output:</span> Clear side-by-side or inline views highlighting added,
              removed, and changed lines or values.
            </li>
            <li>
              <span className="font-medium">Handling Large Files:</span> Performance and memory usage when dealing with
              very large JSON documents.
            </li>
            <li>
              <span className="font-medium">Integration:</span> Command-line interface for scripting, web interface for
              manual comparison, API for programmatic use, or IDE integration.
            </li>
            <li>
              <span className="font-medium">Error Handling:</span> How the tool reports parsing errors in invalid JSON.
            </li>
            <li>
              <span className="font-medium">Ignoring Paths/Keys:</span> Ability to exclude specific keys or paths from
              the comparison (e.g., timestamps, unique IDs that are expected to change).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-yellow-500" />
            Implementation Considerations (Without `useState`)
          </h2>
          <p>
            On a Next.js backend page (or any server-side rendering context without client-side hooks like `useState`),
            JSON diffing would typically involve receiving two JSON strings (e.g., from a request body or file reads),
            parsing them on the server, performing the diff logic, and rendering the result as HTML.
          </p>
          <p>
            The diffing logic itself would be a pure function (or a class with methods) that takes two parsed JavaScript
            objects/arrays and returns a representation of their differences. This representation could then be
            formatted for display in the rendered HTML.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h3 className="text-lg font-medium mb-2">Conceptual Backend Diff Logic:</h3>
            <pre className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
              {`// Pseudo-code for a server-side diff function

interface DiffResult {
  // Structure to represent differences (e.g., added, removed, changed nodes)
  type: 'added' | 'removed' | 'changed' | 'unchanged';
  path: string; // JSON Pointer or similar
  valueA?: any;
  valueB?: any;
  children?: DiffResult[]; // For objects/arrays
}

function semanticDiff(objA: any, objB: any, path = ''): DiffResult[] {
  const differences: DiffResult[] = [];

  // Handle primitive types or null
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    if (objA !== objB) {
      differences.push({ type: 'changed', path, valueA: objA, valueB: objB });
    }
    return differences; // No diff if they are equal primitives
  }

  // Handle different types (e.g., object vs array)
  if (Array.isArray(objA) !== Array.isArray(objB)) {
     differences.push({ type: 'changed', path, valueA: objA, valueB: objB });
     return differences;
  }

  // Handle Arrays
  if (Array.isArray(objA)) {
    // Simple array diff: compares elements by index
    const maxLength = Math.max(objA.length, objB.length);
    for (let i = 0; i < maxLength; i++) {
      const valA = objA[i];
      const valB = objB[i];
      const currentPath = \`\${path}/\${i}\`;

      if (i < objA.length && i < objB.length) {
         // Element exists in both
         const childDiffs = semanticDiff(valA, valB, currentPath);
         differences.push(...childDiffs);
      } else if (i < objA.length) {
         // Element only in A (removed)
         differences.push({ type: 'removed', path: currentPath, valueA: valA });
      } else if (i < objB.length) {
         // Element only in B (added)
         differences.push({ type: 'added', path: currentPath, valueB: valB });
      }
    }
  }
  // Handle Objects
  else {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    const allKeys = new Set([...keysA, ...keysB]);

    for (const key of allKeys) {
      const valA = objA[key];
      const valB = objB[key];
      const currentPath = \`\${path}/\${key}\`;

      if (key in objA && key in objB) {
        // Key exists in both
        const childDiffs = semanticDiff(valA, valB, currentPath);
        differences.push(...childDiffs);
      } else if (key in objA) {
        // Key only in A (removed)
        differences.push({ type: 'removed', path: currentPath, valueA: valA });
      } else if (key in objB) {
        // Key only in B (added)
        differences.push({ type: 'added', path: currentPath, valueB: valB });
      }
    }
  }

  return differences;
}

// On a Next.js server component/page:
// async function getServerSideProps() {
//   const jsonA = await fetchJsonA(); // Fetch or read JSON A
//   const jsonB = await fetchJsonB(); // Fetch or read JSON B
//
//   try {
//     const parsedA = JSON.parse(jsonA);
//     const parsedB = JSON.parse(jsonB);
//     const diffResults = semanticDiff(parsedA, parsedB);
//
//     return {
//       props: {
//         diffResults: diffResults, // Pass diff results to the component
//         // ... other props like original formatted JSON strings for text diff view
//       },
//     };
//   } catch (error) {
//      // Handle parsing errors
//     return { props: { error: error.message } };
//   }
// }
//
// Inside the component, render 'diffResults'
`}
            </pre>
            <p className="mt-2 text-sm italic">
              This pseudo-code illustrates a basic recursive semantic diff logic. A real implementation would require
              more robust handling of types, potentially different array comparison strategies, and detailed output
              formatting.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileDiff className="w-6 h-6 mr-2 text-red-500" />
            <Settings className="w-6 h-6 mr-2 text-purple-500" />
            Choosing the Right Tool/Approach
          </h2>
          <p>The best approach depends on the context:</p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              For simple comparison of small, consistently formatted files where you care about the exact text
              representation (e.g., documenting a minor change in a code example), a{" "}
              <strong>text diff on formatted JSON</strong> might suffice.
            </li>
            <li>
              For comparing configuration files, API responses, or large data structures where you want to understand
              the actual data differences regardless of formatting or key order, a{" "}
              <strong>structure-aware (semantic) diff tool</strong> is highly recommended. Many online and desktop JSON
              tools offer this mode.
            </li>
            <li>
              For developers, integrating a tool that offers both text and semantic diff views, perhaps side-by-side or
              toggleable, provides the most flexibility.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-blue-500" />
            Conclusion
          </h2>
          <p>
            Diffing JSON effectively goes beyond simple text comparison. While consistent formatting is a helpful first
            step, structure-aware diffing is often necessary to cut through the noise and understand the true changes in
            your data. Modern JSON diff tools increasingly offer semantic comparison capabilities, providing developers
            with a powerful way to manage and review changes in JSON documents. Understanding the difference between
            text-based and semantic diffing allows you to choose the right tool and interpret the results accurately,
            saving time and preventing errors.
          </p>
        </section>
      </div>
    </article>
  );
}
