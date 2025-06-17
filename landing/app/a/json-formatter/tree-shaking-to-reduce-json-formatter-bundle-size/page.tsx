import type { Metadata } from "next";
import { Leaf, Zap, Package, Split, Minimize } from "lucide-react";

export const metadata: Metadata = {
  title: "Tree Shaking to Reduce JSON Formatter Bundle Size | Offline Tools",
  description:
    "Learn how tree shaking works and how to apply it or choose libraries that leverage it to minimize the bundle size of your JSON formatting functionality.",
};

export default function TreeShakingJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <Leaf className="inline-block mr-2 text-green-600" size={32} />
        Tree Shaking to Reduce JSON Formatter Bundle Size
      </h1>

      <div className="space-y-6">
        <p>
          Building web applications often involves handling and displaying data, and JSON is a ubiquitous format for
          this. When you include a library to format JSON data in a user interface – perhaps adding syntax highlighting,
          indentation, or collapsing/expanding sections – that library can sometimes significantly increase your
          application's JavaScript bundle size. This is where <strong>Tree Shaking</strong> comes in.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Zap className="inline-block mr-2 text-yellow-500" size={24} />
          What is Tree Shaking?
        </h2>
        <p>
          Tree shaking is a term commonly used in the JavaScript context to describe the process of eliminating dead
          code. It relies on the static analysis of code to detect unused exports in your modules and exclude them from
          the final bundle. Think of it like a real tree: the essential trunk and branches are kept, but any leaves or
          twigs that aren't connected or aren't needed are shaken off.
        </p>
        <p>
          Modern JavaScript bundlers like Webpack (v2+), Rollup, and Parcel support tree shaking. They analyze the{" "}
          <code>import</code> and <code>export</code> statements (ES Modules syntax) to understand the dependencies
          between different parts of your code. If a module exports multiple functions or variables, but your
          application only imports and uses a subset of them, tree shaking ensures only the used parts make it into the
          final output.
        </p>

        <h3 className="text-xl font-semibold mt-6">Why is this important for Bundle Size?</h3>
        <p>
          Smaller bundles load faster, consume less bandwidth, and improve the overall performance and user experience
          of your application. For a library that formats JSON, the codebase might contain functions for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Parsing the JSON string</li>
          <li>Basic indentation and pretty-printing</li>
          <li>Syntax highlighting</li>
          <li>Handling collapsible sections</li>
          <li>Error detection and reporting</li>
          <li>Different output formats (HTML, plain text, etc.)</li>
          <li>Specific data type renderers (e.g., links, images)</li>
        </ul>
        <p>
          If you only need basic indentation but the library includes complex syntax highlighting code that you never
          call, tree shaking can remove that unused code, shrinking your bundle.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Package className="inline-block mr-2 text-blue-500" size={24} />
          How Libraries Enable Tree Shaking
        </h2>
        <p>For a library to be tree-shakable, it primarily needs to:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Use ES Module Syntax:</strong> Use <code>import</code> and <code>export</code> statements instead of
            CommonJS <code>require()</code> and <code>module.exports</code>. ES Modules allow for static analysis,
            meaning bundlers can determine imports and exports without executing the code.
          </li>
          <li>
            <strong>Design with Side Effects in Mind:</strong> Avoid top-level code in modules that has side effects
            (like modifying global objects or logging) unless necessary. If a module *must* have side effects (though
            this is rare for utility libraries like formatters), hint to the bundler using the{" "}
            <code>"sideEffects": false</code> property in the library's <code>package.json</code>, or specify which
            files *do* have side effects.
          </li>
          <li>
            <strong>Export Functionality Granularly:</strong> Instead of exporting a single large object or function,
            export individual functions and components separately.
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Example: Non-Tree-Shakable vs. Tree-Shakable</h3>
        <p>Consider a simplified JSON utility library.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Non-Tree-Shakable (CommonJS Export Example)</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Even if you only use <code>prettyPrint</code>, <code>minify</code> might be included.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// json-utils-cjs.js
const prettyPrint = (jsonString) => {
  // complex pretty printing logic
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, 2); // Simple example
  } catch (e) {
    return \`Error parsing JSON: \${e.message}\`;
  }
};

const minify = (jsonString) => {
  // complex minifying logic
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj); // Simple example
  } catch (e) {
    return \`Error parsing JSON: \${e.message}\`;
  }
};

module.exports = {
  prettyPrint: prettyPrint,
  minify: minify,
  // Potentially other unused functions
};

// Your app code:
// const jsonUtils = require('./json-utils-cjs');
// const formatted = jsonUtils.prettyPrint('{"a":1}');
// // The 'minify' function is likely included in the bundle
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Tree-Shakable (ES Module Export Example)</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Bundler can potentially exclude <code>minify</code> if not imported.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// json-utils-es.js
export const prettyPrint = (jsonString) => {
  // complex pretty printing logic
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, 2); // Simple example
  } catch (e) {
    return \`Error parsing JSON: \${e.message}\`;
  }
};

export const minify = (jsonString) => {
  // complex minifying logic
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj); // Simple example
  } catch (e) {
    return \`Error parsing JSON: \${e.message}\`;
  }
};

// Potentially other unused functions exported individually...

// Your app code:
// import { prettyPrint } from './json-utils-es';
// const formatted = prettyPrint('{"a":1}');
// // A tree-shaking bundler CAN remove the 'minify' function
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          <Split className="inline-block mr-2 text-purple-500" size={24} />
          Strategies for Using Tree-Shakable Formatters
        </h2>
        <p>As a developer using a JSON formatter library, you can benefit from tree shaking by:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Choosing Libraries That Support It:</strong> Check the library's documentation or its{" "}
            <code>package.json</code> (look for <code>"module"</code> or <code>"exports"</code> fields pointing to ES
            Module files).
          </li>
          <li>
            <strong>Using Named Imports:</strong> Always use specific named imports (e.g.,{" "}
            <code>import &#x7b; prettyPrint &#x7d; from 'json-formatter-lib'</code>) rather than default imports or
            importing the entire library object (e.g., <code>import formatterLib from 'json-formatter-lib'</code>,
            unless the default export is explicitly designed to be small or composed of other tree-shakable parts).
          </li>
          <li>
            <strong>Configuring Your Bundler:</strong> Ensure your Webpack, Rollup, or Parcel configuration has tree
            shaking enabled (it's often enabled by default in production modes). Ensure you're not using plugins that
            might accidentally break tree shaking (e.g., some older Babel configurations).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Code Example: Using a Tree-Shakable Library</h3>
        <p>
          Imagine a hypothetical library <code>fancy-json-formatter</code>:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>fancy-json-formatter</code> Library Structure (Conceptual)
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// fancy-json-formatter/src/core.js
export const basicFormat = (data) => &#x7b; /* ... */ &#x7d;;
export const safeParse = (jsonString) => &#x7b; /* ... */ &#x7d;;

// fancy-json-formatter/src/htmlRenderer.js
import &#x7b; basicFormat &#x7d; from './core';
export const renderHtml = (data, options) => &#x7b; /* ... */ &#x7d;;
export const setupSyntaxHighlighting = (theme) => &#x7b; /* requires large syntax parser */ &#x7d;;

// fancy-json-formatter/src/plainTextRenderer.js
import &#x7b; basicFormat &#x7d; from './core';
export const renderPlainText = (data) => &#x7b; /* ... */ &#x7d;;

// fancy-json-formatter/index.js (Main entry point using ES Modules)
export * from './src/core';
export * from './src/htmlRenderer';
export * from './src/plainTextRenderer';

// package.json
// &#x7b;
//   "name": "fancy-json-formatter",
//   "version": "1.0.0",
//   "module": "index.js", // Points to ES Module entry
//   "sideEffects": false
//   // ... other fields
// &#x7d;
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Using the Library in Your App</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Your application code file
import { basicFormat, renderPlainText } from 'fancy-json-formatter';
// import { renderHtml } from 'fancy-json-formatter'; // If you needed HTML output
// import { setupSyntaxHighlighting } from 'fancy-json-formatter'; // If you needed highlighting

const jsonData = '&#x7b;"user": "Alice", "id": 123&#x7d;'; // Example JSON string
const parsedData = basicFormat(jsonData); // Basic formatting
const plainTextOutput = renderPlainText(parsedData); // Render as plain text

console.log(plainTextOutput);

// A tree-shaking bundler will likely include:
// - basicFormat function
// - renderPlainText function
// - safeParse (because renderPlainText might use it internally via basicFormat)
// - BUT potentially exclude: renderHtml and setupSyntaxHighlighting,
//   especially the large syntax parser dependency from setupSyntaxHighlighting.
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          <Minimize className="inline-block mr-2 text-red-500" size={24} />
          Limitations and Considerations
        </h2>
        <p>While powerful, tree shaking isn't a silver bullet:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Dynamic Imports:</strong> Code that is imported dynamically (e.g., using <code>import()</code>) is
            typically not tree-shaken in the main bundle, but rather split into a separate chunk. This is often desired
            behaviour.
          </li>
          <li>
            <strong>Side Effects:</strong> If a module has unavoidable side effects and is marked as having them, the
            entire module might be included even if not all exports are used.
          </li>
          <li>
            <strong>Bundler Configuration:</strong> Tree shaking must be correctly configured and not accidentally
            disabled by other settings or plugins.
          </li>
          <li>
            <strong>Library Design:</strong> The library itself must be written in a way that facilitates tree shaking
            (using ES Modules, granular exports). A poorly structured library might still include a lot of unused code
            even with tree shaking enabled.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Tree shaking is an essential technique for modern web development to keep bundle sizes down. When
          incorporating a JSON formatter or any other utility library, understanding how tree shaking works and choosing
          libraries that are designed to be tree-shakable can have a significant positive impact on your application's
          performance. By using ES Modules and importing only the specific functions you need, you leverage your
          bundler's ability to prune unnecessary code, leading to faster load times and a better user experience.
        </p>
      </div>
    </>
  );
}
