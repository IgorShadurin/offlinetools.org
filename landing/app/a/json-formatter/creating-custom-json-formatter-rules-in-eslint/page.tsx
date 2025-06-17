import type { Metadata } from "next";

import {
  FileJson2,
  Settings2,
  Code,
  ListChecks,
  Lightbulb,
  CodeXml,
  Palette,
  Plug2,
  BookOpen,
  Hammer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Custom JSON Formatter Rules in ESLint | Offline Tools",
  description:
    "Learn how to create custom ESLint rules to enforce specific formatting and content conventions for JSON files in your project.",
};

export default function CustomJsonFormatterRulesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 className="w-8 h-8" /> Creating Custom JSON Formatter Rules in ESLint
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          Maintaining consistent formatting and structure across all files in a project is crucial for readability and
          collaboration. While ESLint is primarily known for linting JavaScript and TypeScript, it can also be extended
          to enforce rules on other file types, including JSON.
        </p>
        <p>
          Standard JSON formatters exist, but sometimes you need to enforce specific rules that go beyond simple
          indentation or spacing – rules about the presence of certain keys, the order of properties, or the format of
          values. This is where custom ESLint rules become invaluable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Lightbulb className="w-6 h-6" /> Why Custom JSON Rules?
        </h2>
        <p>You might need custom JSON rules for various reasons:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-semibold">Configuration Consistency:</span> Enforce specific structures or required
            fields in configuration files (e.g., <code>package.json</code>, <code>tsconfig.json</code>, custom config
            files).
          </li>
          <li>
            <span className="font-semibold">API Contract Validation:</span> If you define API payloads or data
            structures in JSON, linting can help ensure they conform to expected formats.
          </li>
          <li>
            <span className="font-semibold">Localization Files:</span> Ensure translation files have all necessary keys
            and consistent structures.
          </li>
          <li>
            <span className="font-semibold">Code Generation Input:</span> Validate JSON files used as input for code
            generation processes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <BookOpen className="w-6 h-6" /> ESLint Basics & JSON
        </h2>
        <p>
          ESLint works by parsing code into an Abstract Syntax Tree (AST) and then traversing this tree, allowing rules
          to visit specific node types (like function calls, variable declarations, object properties). For JavaScript,
          ESLint uses parsers like Esprima, Acorn, or
          <a
            href="https://typescript-eslint.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            @typescript-eslint/parser
          </a>
          .
        </p>
        <p>
          To lint file types other than standard JavaScript/TypeScript, ESLint relies on{" "}
          <span className="font-semibold">processors</span>. A processor extracts code from a file (or transforms it) so
          ESLint can lint it. For JSON files, the most common approach is to use a plugin that includes a processor and
          defines rules specifically for JSON AST. The de facto standard for this is{" "}
          <a
            href="https://github.com/eslint-community/eslint-plugin-jsonc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            eslint-plugin-jsonc
          </a>
          (or the older, less maintained{" "}
          <a
            href="https://github.com/eslint/eslint-plugin-json"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            eslint-plugin-json
          </a>
          ). We will focus on the concepts applicable when using such a plugin, specifically how to write a rule that
          understands a JSON AST.
        </p>
        <p>
          <code>eslint-plugin-jsonc</code> provides a parser and processor that turns JSON text into an AST similar to
          ESTree (the standard AST for JS), but with node types relevant to JSON (e.g.,{" "}
          <code>JSONObjectExpression</code>, <code>JSONArrayExpression</code>, <code>JSONProperty</code>,{" "}
          <code>JSONIdentifier</code>, <code>JSONLiteral</code>).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Hammer className="w-6 h-6" /> Structure of a Custom Rule
        </h2>
        <p>An ESLint rule is an object with two main parts:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code>meta</code>: Provides metadata about the rule (type, description, fixability, schema for options).
          </li>
          <li>
            <code>create</code>: A function that returns an object where keys are AST node types (or selectors) and
            values are functions that ESLint calls when traversing the AST and encountering a matching node.
          </li>
        </ul>
        <p>
          For JSON rules using <code>eslint-plugin-jsonc</code>, you'll subscribe to node types like{" "}
          <code>JSONObjectExpression</code>, <code>JSONProperty</code>, <code>JSONLiteral</code>, etc.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Palette className="w-6 h-6" /> Creating a Custom Rule for JSON
        </h2>
        <p>Let's outline the steps and provide examples.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings2 className="w-5 h-5" /> 1. Setup: Project Structure & Plugin
        </h3>
        <p>
          Custom rules are typically bundled in an ESLint plugin. For project-specific rules, you can create a local
          plugin directory.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Local Plugin Structure:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`my-eslint-plugin/
├── index.js       <-- Defines the plugin
└── rules/
    └── my-json-rule.js <-- Your custom rule file`}
          </pre>
          <h4 className="text-lg font-medium mt-4 mb-2">
            <code>my-eslint-plugin/index.js</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`module.exports = {
  rules: {
    "my-json-rule": require("./rules/my-json-rule"),
    // Add other rules here
  },
  // Processors can also be defined here if needed,
  // but for JSON, we rely on eslint-plugin-jsonc's processor.
};`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CodeXml className="w-5 h-5" /> 2. Define the Rule File (`my-json-rule.js`)
        </h3>
        <p>This file will contain the rule definition object.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`// my-eslint-plugin/rules/my-json-rule.js
module.exports = {
  meta: {
    type: "problem", // or "suggestion", "layout"
    docs: {
      description: "Enforce a custom rule for JSON objects.",
      category: "Possible Problems", // Or "Suggestions", "Layout & Formatting"
      recommended: false,
      url: "https://example.com/docs/my-json-rule", // Optional documentation URL
    },
    fixable: "code", // or "whitespace" or null
    schema: [], // Define options schema here
  },
  create: function (context) {
    // Rule logic goes here, returning visitor functions
    return {
      // Visitor function for a specific JSON AST node type
      // Example: checking the root object
      JSONObjectExpression(node) {
        // 'node' is the AST node for the top-level JSON object
        // 'context' provides methods like report()
        // console.log('Visited a JSON Object:', node);

        // Example check: Ensure the root object has a 'version' key
        const versionProperty = node.properties.find(prop =>
          prop.key.type === 'JSONIdentifier' && prop.key.name === 'version'
        );

        if (!versionProperty) {
          context.report({
            node: node, // Report on the object node
            message: "JSON object must contain a 'version' key.",
          });
        }

        // Example check: Ensure 'version' value is a string
        if (versionProperty && versionProperty.value.type !== 'JSONLiteral' && typeof versionProperty.value.value !== 'string') {
             context.report({
                node: versionProperty.value, // Report on the value node
                message: "'version' key must have a string value.",
             });
        }
      },

      // You can define more visitor functions for other node types
      // JSONProperty(node) {
      //   // 'node' is an AST node for a key-value pair within an object
      //   // console.log('Visited a JSON Property:', node.key.name);
      // },
      // JSONArrayExpression(node) {
      //   // 'node' is an AST node for an array
      // }
    };
  },
};`}
          </pre>
          <p>Key parts:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>meta.type</code>: How ESLint should treat issues from this rule.
            </li>
            <li>
              <code>meta.docs</code>: Description and category.
            </li>
            <li>
              <code>meta.fixable</code>: Indicates if ESLint can automatically fix the issue.
            </li>
            <li>
              <code>meta.schema</code>: Defines options the rule accepts.
            </li>
            <li>
              <code>create(context)</code>: The factory function. <code>context</code>
              provides methods like <code>context.report()</code> to flag issues.
            </li>
            <li>
              Visitor functions (e.g., <code>JSONObjectExpression(node)</code>): These are called during the AST
              traversal. The <code>node</code> argument is the AST node being visited.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks className="w-5 h-5" /> 3. Example: Enforcing Key Order
        </h3>
        <p>Let's create a rule that checks if properties in a JSON object are sorted alphabetically.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>my-eslint-plugin/rules/sort-json-keys.js</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`// my-eslint-plugin/rules/sort-json-keys.js
module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "Enforce alphabetical sorting of keys in JSON objects.",
      category: "Layout & Formatting",
      recommended: false,
    },
    fixable: "code", // This rule can potentially auto-fix
    schema: [], // Simple rule, no options needed
  },
  create: function (context) {
    return {
      // Visitor for JSON object nodes
      JSONObjectExpression(node) {
        const properties = node.properties;

        if (properties.length <= 1) {
          // No need to sort if 0 or 1 property
          return;
        }

        // Get the names of the keys as strings
        const keyNames = properties.map(prop => {
          // Handle different key types (Identifier or Literal)
          if (prop.key.type === 'JSONIdentifier' || (prop.key.type === 'JSONLiteral' && typeof prop.key.value === 'string')) {
            return prop.key.name || prop.key.value; // Use name for Identifier, value for string Literal
          }
          // For other literal types (numbers, booleans), treat as string
           if (prop.key.type === 'JSONLiteral') {
               return String(prop.key.value);
           }
          // If key is not a simple type we can compare (e.g., object key), ignore
          return null;
        }).filter(name => name !== null); // Filter out non-comparable keys

        // Create a sorted version of the key names
        const sortedKeyNames = [...keyNames].sort((a, b) => a.localeCompare(b));

        // Compare the original order with the sorted order
        for (let i = 0; i < keyNames.length; i++) {
          if (keyNames[i] !== sortedKeyNames[i]) {
            // Found a key that is out of order
            const currentKeyNode = properties[i].key;
            const expectedKeyName = sortedKeyNames[i];

            context.report({
              node: currentKeyNode, // Report on the key that is out of order
              message: "Keys must be sorted alphabetically. Expected '{{expected}}' before '{{found}}'.",
              data: {
                 expected: expectedKeyName,
                 found: keyNames[i],
              },
              // Optional: Add a fixer function for auto-fixing
              // This is more complex as it involves rearranging nodes.
              // A simple example fixer for a property:
              // fixer: function(fixer) {
              //   // This would require more sophisticated logic
              //   // to rearrange properties in the parent object.
              //   // Usually, for sorting, it's easier to report and let a formatter handle it
              //   // or implement a more complex multi-node fixer.
              //   return null; // No fix provided for this simple example
              // }
            });
            // Report only the first out-of-order key in this object
            break;
          }
        }
      },
    };
  },
};`}
          </pre>
          <p>
            This rule iterates through the properties of each object it encounters. It extracts the key names, sorts
            them, and then compares the original order to the sorted order. If a key is found out of place, it reports
            an error. Implementing the <code>fixer</code> function for sorting is more complex as it needs to know the
            source code range of multiple properties to rearrange them.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code className="w-5 h-5" /> 4. Example: Validating Specific Key Values
        </h3>
        <p>
          Let's create a rule that checks if the <code>"version"</code> key in <code>package.json</code> matches a
          specific pattern (e.g., semver).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>my-eslint-plugin/rules/valid-package-version.js</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`// my-eslint-plugin/rules/valid-package-version.js
// Requires eslint-plugin-jsonc to provide the JSON AST node types

// Simple regex for basic semver (major.minor.patch)
// Does NOT cover pre-release or build metadata
const SEMVER_REGEX = /^\\d+\\.\\d+\\.\\d+$/;

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce semver format for package.json version.",
      category: "Possible Problems",
      recommended: false,
    },
    fixable: null, // Cannot auto-fix version format
    schema: [],
  },
  create: function (context) {
    return {
      // Selects a JSONProperty node with a key named "version"
      // This is a more specific selector than just JSONProperty
      'JSONProperty[key.name="version"]'(node) {
        // 'node' is the AST node for the "version": "..." property
        const valueNode = node.value;

        // Check if the value is a string literal
        if (valueNode.type === 'JSONLiteral' && typeof valueNode.value === 'string') {
          const version = valueNode.value;

          // Check if the string matches the semver regex
          if (!SEMVER_REGEX.test(version)) {
            context.report({
              node: valueNode, // Report on the value node
              message: "Package version '{{version}}' must follow semver format (major.minor.patch).",
              data: {
                 version: version,
              },
            });
          }
        } else {
             // Report if the value is not a string literal
             context.report({
                node: valueNode, // Report on the value node
                message: "Package version must be a string literal.",
             });
        }
      },
    };
  },
};`}
          </pre>
          <p>
            This rule uses an AST selector string <code>'JSONProperty[key.name="version"]'</code> to target only
            property nodes whose key is named "version". Inside the visitor function, it accesses the <code>value</code>{" "}
            node of the property and checks if it's a string literal matching a basic semver pattern.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Plug2 className="w-5 h-5" /> 5. Integrate into ESLint Configuration
        </h3>
        <p>Once you have your local plugin, you need to tell ESLint about it and configure the rules.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example <code>.eslintrc.js</code> or <code>.eslintrc.json</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`// .eslintrc.js
const path = require('path');

module.exports = {
  // ... other ESLint configurations

  // Tell ESLint where to find your local plugin
  plugins: [
    "jsonc", // Add the jsonc plugin first
    require(path.resolve(__dirname, 'my-eslint-plugin')), // Path to your local plugin
  ],

  // Define overrides to apply rules specifically to JSON files
  overrides: [
    {
      files: ["*.json", "*.jsonc"], // Target JSON and JSONC files
      parser: "jsonc-eslint-parser", // Use the jsonc parser

      rules: {
        // Configure jsonc plugin's recommended rules (optional)
        // "jsonc/recommended-with-json": "warn",
        // "jsonc/recommended-with-jsonc": "warn",
        // "jsonc/auto": "warn", // Or "jsonc/auto" for automatically picking settings

        // Configure your custom rules
        "my-eslint-plugin/my-json-rule": "error", // Use the rule name from index.js
        "my-eslint-plugin/sort-json-keys": "warn",
        "my-eslint-plugin/valid-package-version": [
          "error", // Enable rule with severity "error"
          // You could pass options here if your rule schema defined them
          // { "pattern": "^v\\d+\\.\\d+\\.\\d+$" }
        ],

        // You can also use other jsonc rules
        "jsonc/indent": ["error", 2], // Enforce 2-space indentation
        "jsonc/no-bigint-literals": "error", // Disallow BigInt (if needed)
        // etc.
      },
    },
    // Add other overrides if you have different rules for different JSON files
    // {
    //   files: ["package.json"],
    //   rules: {
    //     "my-eslint-plugin/valid-package-version": "error", // Apply specifically to package.json
    //     // Other package.json specific rules
    //   }
    // }
  ],

  // ... rest of your config
};`}
          </pre>
          <p>Important points for JSON linting:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Include <code>"jsonc"</code> in the <code>plugins</code> array.
            </li>
            <li>
              Include your local plugin path in the <code>plugins</code> array.
            </li>
            <li>
              Use the <code>overrides</code> section to specify rules that only apply to JSON files.
            </li>
            <li>
              Inside the JSON override, set <code>parser: "jsonc-eslint-parser"</code>.
            </li>
            <li>
              Configure your custom rules using the format <code>"plugin-name/rule-name"</code>.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListChecks className="w-5 h-5" /> 6. Running ESLint
        </h3>
        <p>With the configuration set up, you can run ESLint from your terminal:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`# Lint specific JSON files
npx eslint path/to/your/file.json

# Lint all JSON files matching a pattern
npx eslint "**/*.json"

# Lint all files in the project
npx eslint .`}
          </pre>
          <p>ESLint will use the overrides to apply the JSON parser and your custom rules to the specified files.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <Lightbulb className="w-6 h-6" /> Advanced Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-semibold">Fixers:</span> Implementing auto-fixing (`meta.fixable`) requires careful
            use of the <code>fixer</code> object provided in the <code>context.report</code> function. For simple
            changes (like adding a missing key), it's straightforward. For complex changes (like sorting), it's much
            harder and often relies on replacing larger sections of code or even the entire file content based on the
            desired structure.
          </li>
          <li>
            <span className="font-semibold">Options:</span> Use <code>meta.schema</code> to define options for your
            rule, allowing users to customize its behavior (e.g., specifying the required keys or the sorting order).
            Access options via <code>context.options</code>.
          </li>
          <li>
            <span className="font-semibold">Testing:</span> Thoroughly test your rules using ESLint's
            <code>RuleTester</code>. This involves providing valid and invalid code examples and asserting that the rule
            reports errors correctly (and fixes them if applicable).
          </li>
          <li>
            <span className="font-semibold">JSON with Comments/Trailing Commas (JSONC):</span>{" "}
            <code>eslint-plugin-jsonc</code>
            also handles JSONC format. If your files allow comments, make sure your rules are robust enough to handle
            them or only apply the rules to standard JSON files.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          <BookOpen className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          While the standard JSON specification is quite simple, the JSON files used in real-world projects often have
          specific structural or content requirements. By leveraging ESLint's plugin architecture and a processor like{" "}
          <code>eslint-plugin-jsonc</code>, you can create powerful custom rules to enforce these project-specific
          conventions. This ensures greater consistency, reduces errors, and improves the maintainability of your
          configuration and data files, just like ESLint does for your code.
        </p>
      </div>
    </>
  );
}
