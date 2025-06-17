import type { Metadata } from "next";
import { Lightbulb, Bug, Settings, Code, Highlighter, Layers, Diff, CheckCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Create Custom JSON Debugging Utilities | Developer Tools",
  description:
    "Learn how to build simple, custom JavaScript/TypeScript utilities to make debugging JSON data easier and more efficient.",
};

export default function CustomJsonDebuggingUtilitiesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">How to Create Custom JSON Debugging Utilities</h1>

      <div className="space-y-6">
        <p className="flex items-start space-x-2">
          <Lightbulb className="mt-1 flex-shrink-0" size={20} />
          <span>
            JSON (JavaScript Object Notation) is ubiquitous in modern web development, serving as the primary data
            format for APIs, configuration files, and inter-service communication. While standard tools like browser
            developer consoles provide basic JSON viewing, dealing with large, deeply nested, or complex JSON structures
            during debugging can still be a significant challenge. This article explores how creating simple, custom
            JavaScript or TypeScript utilities can dramatically improve your JSON debugging workflow.
          </span>
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Bug size={24} />
          <span>Common JSON Debugging Challenges</span>
        </h2>
        <p>Developers frequently encounter difficulties when inspecting JSON data, including:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Navigating deeply nested objects and arrays.</li>
          <li>Finding specific keys or values within large datasets.</li>
          <li>Comparing two JSON structures to identify differences.</li>
          <li>Understanding the structure or schema of unfamiliar JSON.</li>
          <li>Dealing with inconsistent or missing data fields.</li>
          <li>Handling special characters or encoding issues.</li>
        </ul>
        <p>
          Browser developer consoles offer collapsing/expanding nodes and basic search, but they often lack the power
          for targeted inspection or transformation needed for complex debugging scenarios.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings size={24} />
          <span>Why Build Custom Utilities?</span>
        </h2>
        <p>
          Building custom debugging tools might seem like overkill, but even simple utilities can provide significant
          advantages:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            **Tailored to Your Needs:** Create tools that solve the specific JSON problems you encounter most often in
            your projects.
          </li>
          <li>
            **Integration:** Easily integrate utilities into your existing debugging flow, whether it&apos;s a Node.js
            script, a browser console snippet, or a custom frontend debugger panel.
          </li>
          <li>**Automation:** Automate repetitive inspection tasks, saving time and reducing manual errors.</li>
          <li>**Clarity:** Transform raw JSON into a format that highlights the information you care about.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>Building Blocks: Core JavaScript/TypeScript</span>
        </h2>
        <p>The foundation of most JSON utilities involves standard JavaScript/TypeScript features:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>JSON.parse()</code> and <code>JSON.stringify()</code> for converting between strings and objects.
          </li>
          <li>
            Object and array iteration (<code>for...in</code>, <code>for...of</code>, <code>Object.keys()</code>,{" "}
            <code>Array.prototype.forEach()</code>, <code>Array.prototype.map()</code>, etc.).
          </li>
          <li>Recursion for handling nested structures.</li>
          <li>Conditional logic and string manipulation.</li>
        </ul>
        <p>Let&apos;s look at some practical examples.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>Utility Example 1: Enhanced Pretty Printing</span>
        </h2>
        <p>
          While <code>JSON.stringify(data, null, 2)</code> is useful, you might want more control, like sorting keys
          alphabetically or filtering out certain fields.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Pretty Print with Sorted Keys:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function prettyPrintSorted(data: any, space: string | number = 2): string {
  // Use the replacer function of JSON.stringify to sort keys
  return JSON.stringify(
    data,
    (key, value) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const sortedKeys = Object.keys(value).sort();
        // Reconstruct the object with sorted keys
        const sortedObject: any = {};
        sortedKeys.forEach(k => {
          sortedObject[k] = value[k];
        });
        return sortedObject;
      }
      // For arrays, primitives, or the root value, return as is
      return value;
    },
    space
  );
}

// Example Usage:
// const complexJson = { z: 1, a: { y: 2, x: 3 }, b: [5, 4], c: null };
// console.log(prettyPrintSorted(complexJson));
`}
            </pre>
          </div>
        </div>
        <p>
          This version uses the `replacer` argument of <code>JSON.stringify</code> to intercept object values and return
          a new object with keys sorted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Highlighter size={24} />
          <span>Utility Example 2: Highlighting Specific Data</span>
        </h2>
        <p>
          Often, you&apos;re looking for specific pieces of information, like user IDs, transaction amounts, or error
          messages. A utility could find these and present them clearly. This is more complex as it involves recursive
          traversal and formatting the output (perhaps as a string or a simplified object).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Find and List Keys:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function findKeys(data: any, keyName: string, path: string = '', results: { path: string, value: any }[] = []): { path: string, value: any }[] {
  if (data === null || typeof data !== 'object') {
    return results;
  }

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      findKeys(item, keyName, \`\${path}[&#x7b;index&#x7d;]\`, results);
    });
  } else {
    Object.keys(data).forEach(key => {
      const newPath = path ? \`\${path}.\${key}\` : key;
      if (key === keyName) {
        results.push({ path: newPath, value: data[key] });
      }
      findKeys(data[key], keyName, newPath, results);
    });
  }

  return results;
}

// Example Usage:
// const userData = { user: { id: 123, name: 'Alice' }, orders: [{ id: 'A', amount: 100 }, { id: 'B', amount: 250 }] };
// const userIds = findKeys(userData, 'id');
// console.log('Found IDs:', userIds);
`}
            </pre>
          </div>
        </div>
        <p>
          This utility recursively searches for keys matching `keyName` and returns an array of objects showing the path
          and value of each match. Note the use of <code>&#x7b;index&#x7d;</code> in the path for array elements to
          avoid JSX conflicts.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Layers size={24} />
          <span>Utility Example 3: Flattening JSON</span>
        </h2>
        <p>
          For very deep structures, flattening the JSON into a single-level object where keys represent paths can make
          inspection much easier.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Flatten JSON Object:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function flattenJson(data: any, separator: string = '.', path: string = '', result: { [key: string]: any } = {}): { [key: string]: any } {
  if (data === null || typeof data !== 'object') {
    // Handle primitive values
    if (path) {
        result[path] = data;
    }
    return result;
  }

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const newPath = path ? \`\${path}\${separator}\${index}\` : String(index);
      flattenJson(item, separator, newPath, result);
    });
  } else {
    Object.keys(data).forEach(key => {
      const newPath = path ? \`\${path}\${separator}\${key}\` : key;
      flattenJson(data[key], separator, newPath, result);
    });
  }

  return result;
}

// Example Usage:
// const nestedJson = { user: { address: { city: 'London', zip: 'SW1' }, age: 30 }, items: [{ id: 1 }, { id: 2 }] };
// console.log(flattenJson(nestedJson));
// Output: { 'user.address.city': 'London', 'user.address.zip': 'SW1', 'user.age': 30, 'items.0.id': 1, 'items.1.id': 2 }
`}
            </pre>
          </div>
        </div>
        <p>
          This recursive function creates a new object where keys represent the path to the original value, joined by a
          separator (defaulting to `.`).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Diff size={24} />
          <span>Utility Example 4: Simple JSON Diffing</span>
        </h2>
        <p>
          Comparing two versions of a JSON object can be tricky. A simple diffing utility can highlight where changes
          occurred. A full diff is complex (added, deleted, changed), but a basic one can show values that differ at the
          same path or paths that exist in one but not the other.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Basic JSON Diff (Changed/Missing):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`type DiffResult = { [path: string]: { value1?: any, value2?: any } };

function diffJson(obj1: any, obj2: any, path: string = '', results: DiffResult = {}): DiffResult {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check for changed or missing in obj2
    for (const key of keys1) {
        const newPath = path ? \`\${path}.\${key}\` : key;
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
            results[newPath] = { value1: obj1[key], value2: undefined }; // Missing in obj2
        } else if (typeof obj1[key] === 'object' && obj1[key] !== null &&
                   typeof obj2[key] === 'object' && obj2[key] !== null) {
            // Recurse for nested objects
            diffJson(obj1[key], obj2[key], newPath, results);
        } else if (obj1[key] !== obj2[key]) {
            // Found a different primitive value
            results[newPath] = { value1: obj1[key], value2: obj2[key] };
        }
    }

    // Check for added in obj2
    for (const key of keys2) {
        const newPath = path ? \`\${path}.\${key}\` : key;
        if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
             results[newPath] = { value1: undefined, value2: obj2[key] }; // Added in obj2
        }
        // Changes in existing keys are handled in the first loop
    }

    return results;
}

// Example Usage:
// const jsonA = { id: 1, name: 'Alice', settings: { theme: 'dark', notify: true }, tags: ['a', 'b'] };
// const jsonB = { id: 1, name: 'Bob', settings: { theme: 'light', notify: true }, tags: ['a', 'c'], status: 'active' };
// console.log('JSON Diff:', diffJson(jsonA, jsonB));
/*
Output:
JSON Diff: &#x7b;
  'name': &#x7b; value1: 'Alice', value2: 'Bob' &#x7d;,
  'settings.theme': &#x7b; value1: 'dark', value2: 'light' &#x7d;,
  'tags.1': &#x7b; value1: 'b', value2: 'c' &#x7d;, // Array index treated as key
  'status': &#x7b; value1: undefined, value2: 'active' &#x7d; // Added in B
&#x7d;
*/
`}
            </pre>
          </div>
        </div>
        <p>
          This basic diff function compares two objects and returns an object listing paths where values differ or where
          keys are present in one but not the other. It handles nested objects but treats arrays simplistically by using
          index as part of the path. Note the use of <code>&#x7b;</code> and <code>&#x7d;</code> in the output example
          to display curly braces literally.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementation Notes</h2>
        <p>These utilities are just functions. You can implement them in several ways:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            **Browser Console Snippets:** Save them in your browser&apos;s dev tools snippets and call them on variables
            available in the console scope.
          </li>
          <li>
            **Node.js Helper Module:** Create a <code>.ts</code> or <code>.js</code> file with these functions and
            import them into your backend scripts for debugging server-side data.
          </li>
          <li>
            **Custom Frontend Component:** If you&apos;re building a debugging UI, wrap these functions in components to
            display formatted or highlighted JSON. (Note: This article focuses on the utility functions themselves, not
            the UI layer).
          </li>
        </ul>
        <p>
          Remember to handle potential errors like invalid JSON strings passed to <code>JSON.parse()</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCheck size={24} />
          <span>Conclusion</span>
        </h2>
        <p>
          While powerful debugging tools exist, understanding how to create your own small, focused JSON utilities using
          standard JavaScript/TypeScript can significantly enhance your development workflow. These custom tools allow
          you to tackle specific debugging challenges effectively, providing clearer insights into complex data
          structures than generic tools alone. Start with simple utilities like enhanced pretty-printing or targeted
          searching, and gradually build more sophisticated tools as your needs evolve.
        </p>
      </div>
    </>
  );
}
