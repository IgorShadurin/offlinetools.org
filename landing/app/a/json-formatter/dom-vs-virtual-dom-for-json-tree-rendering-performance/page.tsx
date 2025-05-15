import type { Metadata } from "next";
import { Code, Timer, Atom, RefreshCw, Gauge, TreePine, Bolt, Layers, Binary } from "lucide-react"; // Import chosen icons

export const metadata: Metadata = {
  title: "DOM vs. Virtual DOM for JSON Tree Rendering Performance",
  description: "Explore the performance differences between rendering complex JSON data as a tree using direct DOM manipulation and React's Virtual DOM.",
};

// Define recursive types for JSON values
type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// Helper component for recursive JSON rendering (conceptual, no state)
// In a real app, this would likely manage expansion state internally or receive it via props/context.
interface JsonNodeProps {
  keyName?: string;
  value: JsonValue; // Use the defined type
  level: number;
}

function JsonNode({ keyName, value, level }: JsonNodeProps) {
  // This component cannot manage collapse/expand state due to no useState constraint.
  // It will simply render the structure statically.
  // In a stateful component, you'd add click handlers and conditional rendering here.

  const valueType = typeof value;

  if (value === null) {
    return (
      <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        <span className="text-blue-500 dark:text-blue-400">null</span>
      </div>
    );
  }

  if (valueType === 'boolean') {
    return (
      <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        <span className="text-yellow-600 dark:text-yellow-400">{String(value)}</span>
      </div>
    );
  }

  if (valueType === 'number') {
    return (
      <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        {/* FIX: Explicitly convert number to string for rendering */}
        <span className="text-green-600 dark:text-green-400">{String(value)}</span>
      </div>
    );
  }

  if (valueType === 'string') {
    return (
      <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        <span className="text-red-600 dark:text-red-400">&quot;{String(value)}&quot;</span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        <span className="text-gray-500 dark:text-gray-400">[</span>
        {value.length > 0 ? value.map((item, index) => (
          // Using index as key is generally discouraged for lists that change order,
          // but for a static display or simplicity without state, it's shown here.
          // In a real interactive tree, you'd need a more stable key if possible.
          <JsonNode key={index} value={item as JsonValue} level={level + 1} /> // Explicitly cast to JsonValue
        )) : <div className={`ml-${(level + 1) * 4}`}></div>} {/* Empty array indentation */}
        <span className={`ml-${level * 4} text-gray-500 dark:text-gray-400`}>]</span>
      </div>
    );
  }

  if (valueType === 'object' && value !== null) { // Added null check for safety, though typeof 'object' covers null
    const keys = Object.keys(value);
    return (
      <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        <span className="text-gray-500 dark:text-gray-400">&#x7b;</span>
        {keys.length > 0 ? keys.map(key => (
          // Using key name as key is better if key names are unique at this level
          <JsonNode key={key} keyName={key} value={(value as JsonObject)[key]} level={level + 1} /> // Explicitly cast to JsonObject and access key
        )) : <div className={`ml-${(level + 1) * 4}`}></div>} {/* Empty object indentation */}
        <span className={`ml-${level * 4} text-gray-500 dark:text-gray-400`}>&#x7d;</span>
      </div>
    );
  }

  // Fallback for unknown types (e.g., functions, undefined - though JSON doesn't have these)
  return (
     <div className={`ml-${level * 4}`}>
        {keyName && <span className="text-purple-700 dark:text-purple-300">&quot;{keyName}&quot;</span>}
        {keyName && <span className="text-gray-500 dark:text-gray-400">: </span>}
        <span className="text-gray-500 dark:text-gray-400">Unknown Type ({valueType})</span>
      </div>
  );
}


export default function JsonTreePerformancePage() {
  // Sample JSON data for demonstration
  const sampleJson: JsonValue = { // Type the sample data as JsonValue
    name: "JSON Tree Example",
    version: 1.5,
    active: true,
    data: [
      {
        id: 1,
        item: "Apple",
        details: { color: "Red", taste: "Sweet" }
      },
      {
        id: 2,
        item: "Banana",
        details: { color: "Yellow", taste: "Mild" }
      }
    ],
    settings: null,
    nested: {
      level2: {
        level3: [1, 2, 3]
      }
    },
    emptyArray: [],
    emptyObject: {},
    largeText: "This is a long string to simulate larger content... ".repeat(10)
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <TreePine className="w-8 h-8 text-green-600 dark:text-green-400" /> DOM vs. Virtual DOM for JSON Tree Rendering Performance
      </h1>

      <div className="space-y-6">
        <p>
          Rendering complex hierarchical data like JSON as an interactive tree is a common task in web development,
          particularly in developer tools, data visualization platforms, or administrative interfaces.
          The performance of this rendering process is crucial, especially when dealing with large or frequently
          updating datasets. This page explores two primary approaches: direct DOM manipulation and using a
          Virtual DOM library like React.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Direct DOM Manipulation
        </h2>
        <p>
          The traditional approach to building dynamic interfaces on the web involves directly creating, modifying,
          and deleting HTML elements using browser APIs (like <code>document.createElement</code>, <code>element.appendChild</code>,
          <code>element.textContent = &apos;...&apos;</code>, <code>element.remove()</code>, etc.).
        </p>
        <p>
          When rendering a JSON tree directly using the DOM, you would typically traverse the JSON structure recursively
          and build the corresponding HTML elements on the fly. To update the tree (e.g., expanding/collapsing nodes,
          changing data), you would manually find the specific DOM nodes that need updating and modify them.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code className="w-5 h-5" /> Conceptual Direct DOM Example (JavaScript)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            <em>(This is a simplified conceptual example demonstrating the approach)</em>
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="font-mono">
{`function renderJsonNode(data, parentElement, level = 0, keyName = null) {
  const nodeElement = document.createElement('div');
  nodeElement.style.marginLeft = \`\${level * 20}px\`; // Simple indentation

  let content = '';
  let valueClass = '';

  if (keyName) {
    content += \`<span class="key">"\${keyName}"</span><span class="colon">: </span>\`;
  }

  if (data === null) {
    content += \`<span class="null">null</span>\`;
  } else if (typeof data === 'boolean') {
    content += \`<span class="boolean">\${data}</span>\`;
  } else if (typeof data === 'number') {
    content += \`<span class="number">\${data}</span>\`;
  } else if (typeof data === 'string') {
    content += \`<span class="string">"\${data}"</span>\`;
  } else if (Array.isArray(data)) {
    content += \`<span class="bracket">[</span>\`;
    nodeElement.innerHTML = content; // Add bracket first
    parentElement.appendChild(nodeElement); // Append node now to parent

    if (data.length > 0) {
      data.forEach(item => {
        // Recursive call - appends children directly to the nodeElement
        renderJsonNode(item, nodeElement, level + 1);
      });
    }
    const closeBracket = document.createElement('div');
    closeBracket.style.marginLeft = \`\${level * 20}px\`; // Align closing bracket
    closeBracket.innerHTML = \`<span class="bracket">]</span>\`;
    nodeElement.appendChild(closeBracket); // Append closing bracket to the nodeElement
    return; // Prevent default append below
  } else if (typeof data === 'object') {
    content += \`<span class="brace">&#x7b;</span>\`;
    nodeElement.innerHTML = content; // Add brace first
    parentElement.appendChild(nodeElement); // Append node now to parent

    const keys = Object.keys(data);
    if (keys.length > 0) {
      keys.forEach(key => {
        // Recursive call - appends children directly to the nodeElement
        renderJsonNode(data[key], nodeElement, level + 1, key);
      });
    }
     const closeBrace = document.createElement('div');
     closeBrace.style.marginLeft = \`\${level * 20}px\`; // Align closing brace
     closeBrace.innerHTML = \`<span class="brace">&#x7d;</span>\`;
     nodeElement.appendChild(closeBrace); // Append closing brace to the nodeElement
    return; // Prevent default append below
  } else {
     content += \`<span class="unknown">Unknown Type</span>\`;
  }

  // For primitive values, set innerHTML and append once
  if (typeof data !== 'object' || data === null) {
     nodeElement.innerHTML = content;
     parentElement.appendChild(nodeElement);
  }
}

// To use:
// const jsonContainer = document.getElementById('json-root');
// const jsonData = {...}; // your JSON object
// renderJsonNode(jsonData, jsonContainer);

/*
// To update a single value (conceptual):
function updateValueInDom(path, newValue) {
  // This would require tracking DOM nodes by path or ID, which is complex.
  // e.g., find the div corresponding to path, update its innerHTML.
  // Very hard to do efficiently for arbitrary updates.
}
*/
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Timer className="w-5 h-5" /> Performance Implications of Direct DOM
        </h3>
        <p>
          Direct DOM manipulation can be fast for initial rendering or very isolated updates. However, for
          complex structures and frequent updates, it quickly becomes a performance bottleneck.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Expensive Operations:</strong> Manipulating the DOM is inherently slower than manipulating
            JavaScript objects. Each operation (creating, appending, updating content, removing) can trigger the
            browser&apos;s rendering engine to perform costly tasks like calculating layout (reflow) and painting pixels (repaint).
          </li>
          <li>
            <strong>Frequent Reflows/Repaints:</strong> When multiple DOM operations happen consecutively,
            the browser *might* batch some, but often, changes to layout properties or content force immediate
            recalculation of element positions and sizes, leading to multiple reflows and repaints.
          </li>
          <li>
            <strong>Manual Management Complexity:</strong> Tracking which specific elements in a deep and wide tree
            need to be updated when the underlying data changes is challenging. This often leads to rebuilding larger
            parts of the DOM than necessary, further degrading performance.
          </li>
          <li>
            <strong>Memory Leaks:</strong> Manual DOM management increases the risk of accidentally keeping references
            to detached DOM nodes, leading to memory leaks.
          </li>
        </ul>
        <p>
          For an interactive JSON tree where nodes are expanded, collapsed, or data values might change,
          direct DOM manipulation requires careful manual optimization to avoid excessive updates, which adds
          significant complexity to the code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Atom className="w-6 h-6 text-teal-500 dark:text-teal-300" /> Virtual DOM (React)
        </h2>
        <p>
          Libraries like React introduced the concept of a Virtual DOM (VDOM). Instead of directly manipulating
          the browser&apos;s DOM, React works with a lightweight JavaScript representation of the DOM.
        </p>
        <p>
          When data changes, React creates a new Virtual DOM tree. It then compares this new tree with the previous
          Virtual DOM tree (this process is called &quot;diffing&quot;). React identifies the minimum set of changes needed
          to update the actual browser DOM to match the new VDOM. Finally, it applies these changes to the browser
          DOM in a batched and optimized manner (this is called &quot;patching&quot;).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code className="w-5 h-5" /> Conceptual Virtual DOM Example (React/TSX)
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            <em>(This example uses a recursive component structure. State management for interactivity like collapsing nodes is omitted due to constraints, but would typically be handled within components or via context/props).</em>
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="font-mono">
{`// This is the JsonNode component used earlier in the file.
// It recursively renders based on the value type.
// It receives data and renders the corresponding JSX elements.
// Example structure (simplified):

// interface JsonNodeProps { keyName?: string; value: JsonValue; level: number; } // Updated type

// function JsonNode({ keyName, value, level }: JsonNodeProps) {
//   // ... logic to determine value type and render ...
//   if (Array.isArray(value)) {
//     return (
//       <div className={\`ml-\${level * 4}\`}>
//         {keyName && <span className="...">"{keyName}"</span>}
//         {keyName && <span className="...">: </span>}
//         <span className="...">[</span>
//         {value.map((item, index) => (
//           <JsonNode key={index} value={item as JsonValue} level={level + 1} /> // Recursive call
//         ))}
//         <span className={\`ml-\${level * 4} ...\`}>]</span>
//       </div>
//     );
//   }
//   if (typeof value === 'object' && value !== null) {
//      const keys = Object.keys(value);
//      return (
//        <div className={\`ml-\${level * 4}\`}>
//          {keyName && <span className="...">"{keyName}"</span>}
//          {keyName && <span className="...">: </span>}
//          <span className="...">&#x7b;</span>
//          {keys.map(key => (
//            <JsonNode key={key} keyName={key} value={(value as JsonObject)[key]} level={level + 1} /> // Recursive call
//          ))}
//          <span className={\`ml-\${level * 4} ...\`}>&#x7d;</span>
//        </div>
//      );
//   }
//   // ... render primitive types ...
//   return (
//     <div className={\`ml-\${level * 4}\`}>
//       {keyName && <span className="...">"{keyName}"</span>}
//       {keyName && <span className="...">: </span>}
//       <span className="...">// Render primitive (string, number, boolean, null)</span>
//     </div>
//   );
// }

// The main component using it:
/*
interface JsonTreeViewerProps {
  jsonData: JsonValue; // Updated type
}

function JsonTreeViewer({ jsonData }: JsonTreeViewerProps) {
  // Due to no useState, we can't have interactive collapse/expand state here.
  // The tree is rendered fully expanded in this example.

  return (
    <div className="json-tree-container">
      <JsonNode value={jsonData} level={0} /> // Start the recursive rendering
    </div>
  );
}

// To use within this Next.js page component:
// <JsonTreeViewer jsonData={sampleJson} />
*/
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Bolt className="w-5 h-5 text-yellow-600 dark:text-yellow-400" /> Performance Implications of Virtual DOM
        </h3>
        <p>
          The Virtual DOM approach, combined with React&apos;s reconciliation algorithm, offers significant performance
          advantages for complex and dynamic UIs like JSON trees.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Batching Updates:</strong> React batches multiple state/prop updates together and performs
            a single diffing and patching operation. This minimizes direct DOM manipulations and reduces the number of
            costly reflows and repaints.
          </li>
          <li>
            <strong>Optimized Diffing:</strong> React&apos;s diffing algorithm is optimized to efficiently compare the
            old and new VDOM trees, typically running in O(n) time (where n is the number of elements), assuming
            you provide stable <code>key</code> props for lists.
          </li>
          <li>
            <strong>Targeted DOM Updates:</strong> The patching process updates only the specific parts of the
            actual DOM that have changed, rather than potentially rebuilding large sections.
          </li>
          <li>
            <strong>Declarative Approach:</strong> Developers describe the desired UI state based on data, and
            React figures out the transition, reducing manual DOM management errors and complexity.
          </li>
        </ul>
        <p>
          While creating the VDOM and performing the diff takes some time, the cost is usually much lower than
          the cumulative cost of numerous direct DOM manipulations, especially for frequent or complex updates
          in a large tree structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Gauge className="w-6 h-6 text-red-600 dark:text-red-400" /> DOM vs. Virtual DOM: A Comparison
        </h2>
        <p>Let&apos;s summarize the key differences between the two approaches for rendering dynamic JSON trees:</p>

        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Feature</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Direct DOM Manipulation</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Virtual DOM (React)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Implementation</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Manual use of browser <code>document</code> and <code>element</code> APIs.</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Declarative JSX/components, library handles underlying DOM updates.</td>
              </tr>
               <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Update Mechanism</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Each change potentially triggers immediate browser layout/paint. Manual tracking of changes.</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Diffing VDOM, batched application of minimal changes to actual DOM. Automatic tracking of changes via state/props.</td>
              </tr>
               <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Performance (Complex/Frequent Updates)</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Can be slow due to multiple reflows/repaints. Manual optimization is difficult.</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Generally faster due to batching and targeted updates. VDOM operations are less costly than direct DOM.</td>
              </tr>
               <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Code Complexity</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">High, especially for state management, updates, and cleanup.</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Lower, framework handles updates and cleanup. Focus on component logic.</td>
              </tr>
               <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">Memory Management</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Prone to memory leaks if not carefully managed.</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Framework handles element lifecycle, reducing leak risk.</td>
              </tr>
            </tbody>
          </table>
        </div>

         <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-purple-600 dark:text-purple-400" /> Optimizing with Virtual DOM: Keys and Memoization
        </h2>
        <p>
          While the Virtual DOM provides built-in performance benefits, developers can further optimize React rendering:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keys:</strong> When rendering lists of elements (like array items in a JSON tree),
            the <code>key</code> prop is crucial. Keys help React identify which items have changed, are added, or are
            removed. This allows React to efficiently reuse and reorder existing DOM elements instead of rebuilding
            them, significantly improving performance and preventing potential issues with component state. Always use
            stable, unique keys if possible (e.g., an <code>id</code> field in your JSON data, not the array index if the array can change).
          </li>
          <li>
            <strong>Memoization (<code>React.memo</code>):</strong> For components that render the same output given the same props,
            <code>React.memo</code> can prevent unnecessary re-renders. If a parent component re-renders, React checks if
            the memoized child component&apos;s props have changed. If not, the child&apos;s last rendered output is reused, skipping
            its rendering process and the VDOM diff for its subtree. This can be very effective in tree structures where
            many branches might remain unchanged during an update.
          </li>
        </ul>
         <p>
            (Note: Since <code>useState</code> is disallowed, interactive state or effects that would trigger re-renders are not shown, but these optimizations are key when building dynamic applications with React).
         </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Binary className="w-6 h-6 text-gray-600 dark:text-gray-400" /> When to Use Which?
        </h2>
        <p>
          For rendering a complex and potentially interactive JSON tree in a modern web application framework like Next.js
          (which is built on React), using the Virtual DOM approach is almost always the superior choice.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
                <strong>Direct DOM:</strong> Might be considered for extremely simple, static displays or
                performance-critical micro-optimizations in highly specific, isolated scenarios where you have
                total control and minimal updates. However, it sacrifices maintainability and developer experience.
            </li>
            <li>
                <strong>Virtual DOM:</strong> The standard and recommended approach for dynamic UIs,
                especially in component-based frameworks. It handles the complexities of updates, offers
                better performance for typical application workloads through optimizations like batching and diffing,
                and results in more maintainable and scalable code.
            </li>
            </ul>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <TreePine className="w-6 h-6 text-green-600 dark:text-green-400" /> Conclusion
        </h2>
        <p>
          While direct DOM manipulation gives you granular control, the complexities of managing updates
          in a dynamic structure like a JSON tree quickly make it cumbersome and inefficient for performance.
          The Virtual DOM, as implemented in React and used within Next.js, provides a declarative,
          component-based approach that automatically handles update optimizations, leading to better
          performance, less complex code, and improved maintainability for rendering interactive and
          large JSON trees. By understanding the principles of VDOM diffing and leveraging tools like
          <code>key</code> props and memoization, developers can ensure their JSON tree components are both
          performant and easy to work with.
        </p>

         {/* Optional: Include the sample JSON data rendered by the conceptual component */}
         {/* This part is included to show the output of the VDOM conceptual code */}
         {/* Since no state is allowed, it will just render the static structure */}
         <h2 className="text-2xl font-semibold mt-8">
             Sample JSON Tree Rendering (Virtual DOM Conceptual)
         </h2>
         <p>
             Below is a static rendering of the sample JSON data using the conceptual <code>JsonNode</code> component,
             illustrating the structure that React would manage via the Virtual DOM.
         </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 font-mono text-sm">
            {/* Render the sample data using the conceptual component */}
            {/* This assumes JsonNode component is defined and available */}
             <JsonNode value={sampleJson} level={0} />
         </div>

      </div>
    </>
  );
}
