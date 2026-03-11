import type { Metadata } from "next";

import { BookOpen, Code, FileJson2, Hammer, Lightbulb, ListChecks, Plug2, Settings2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Creating Custom JSON Formatter Rules in ESLint | Offline Tools",
  description:
    "Create custom ESLint rules for JSON and JSONC with the current flat-config workflow. Learn when to use @eslint/json vs eslint-plugin-jsonc, see rule examples, and test them.",
};

export default function CustomJsonFormatterRulesArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <FileJson2 className="h-8 w-8" /> Creating Custom JSON Formatter Rules in ESLint
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          If you landed here looking for a current guide, the big change is that modern ESLint setups use{" "}
          <code>eslint.config.js</code> and now have an official JSON language plugin. That means many older tutorials
          built around <code>.eslintrc</code>, processors, or the legacy <code>eslint-plugin-json</code> package are no
          longer the best starting point.
        </p>

        <p>
          For most teams, the practical workflow is simple: use a built-in JSON sorting rule if it already matches your
          formatting convention, and only write a custom rule when you need project-specific behavior such as required
          top-level keys, file-specific key order, or schema-like checks for configuration files.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Lightbulb className="h-6 w-6" /> What Changed in Current ESLint Setups
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <span className="font-semibold">Flat config is the default:</span> New ESLint guidance centers on{" "}
            <code>eslint.config.js</code>, not <code>.eslintrc.*</code>.
          </li>
          <li>
            <span className="font-semibold">ESLint has an official JSON plugin:</span> <code>@eslint/json</code>{" "}
            supports JSON, JSONC, and JSON5 through ESLint&apos;s language-plugin system.
          </li>
          <li>
            <span className="font-semibold">eslint-plugin-jsonc is still very useful:</span> It remains the easiest
            path when you want a JSON AST that feels similar to JavaScript rule authoring and when you want mature JSON
            formatting rules such as <code>jsonc/sort-keys</code>.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Plug2 className="h-6 w-6" /> Pick the Right JSON Stack
        </h2>
        <p>There are now two realistic choices for custom JSON linting in ESLint:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <span className="font-semibold">Use <code>@eslint/json</code></span> if you want the official ESLint path,
            are already on flat config, and are comfortable working with the Momoa JSON AST. This path requires modern
            ESLint and does not use the older parser-plus-processor pattern.
          </li>
          <li>
            <span className="font-semibold">Use <code>eslint-plugin-jsonc</code></span> if you want JSON node names and
            selectors that feel closer to typical ESLint rule examples, such as <code>JSONObjectExpression</code> and{" "}
            <code>JSONProperty</code>.
          </li>
          <li>
            <span className="font-semibold">Avoid <code>eslint-plugin-json</code> for new custom-rule work</span>
            because it is processor-based and does not expose an AST you can target with normal ESLint visitors.
          </li>
        </ul>

        <p>
          For the rest of this guide, I&apos;ll use <code>eslint-plugin-jsonc</code> because it is the most approachable
          way to create custom JSON formatter rules today. If you later move to <code>@eslint/json</code>, the same rule
          ideas still apply, but your AST node types and test setup will differ.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <ListChecks className="h-6 w-6" /> Try Built-In Rules Before Writing Code
        </h2>
        <p>
          Many "custom formatter rule" requests are already covered by existing rules. That matters because a
          built-in rule is cheaper to maintain than your own plugin code.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: sort top-level keys in <code>package.json</code></h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            {`// eslint.config.js
import jsonc from "eslint-plugin-jsonc";

export default [
  ...jsonc.configs["recommended-with-jsonc"],
  {
    files: ["package.json"],
    plugins: { jsonc },
    rules: {
      "jsonc/sort-keys": [
        "error",
        {
          pathPattern: "^$",
          order: [
            "name",
            "version",
            "private",
            "type",
            "scripts",
            "dependencies",
            "devDependencies"
          ]
        }
      ]
    }
  }
];`}
          </pre>
        </div>

        <p>
          The <code>jsonc/sort-keys</code> rule is often enough for formatter-style requirements. It can target
          specific object paths, and its fixer may need more than one <code>eslint --fix</code> pass for complex
          reordering. Only move on to a custom rule when your convention goes beyond what built-ins can express.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Settings2 className="h-6 w-6" /> Current Setup for a Custom JSON Rule
        </h2>
        <p>
          In a flat-config project, the simplest pattern is to define a small local plugin object and register your
          custom rules under a namespace such as <code>local</code>.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">
            <code>eslint.config.js</code>
          </h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            {`import jsonc from "eslint-plugin-jsonc";
import requireTopLevelKeys from "./eslint/rules/require-top-level-keys.js";

const localJsonRules = {
  meta: { name: "local-json-rules" },
  rules: {
    "require-top-level-keys": requireTopLevelKeys
  }
};

export default [
  ...jsonc.configs["recommended-with-jsonc"],
  {
    files: ["package.json", "tsconfig*.json", ".vscode/*.json"],
    plugins: {
      jsonc,
      local: localJsonRules
    },
    rules: {
      "jsonc/sort-keys": [
        "error",
        {
          pathPattern: "^$",
          order: ["name", "version", "private"]
        }
      ],
      "local/require-top-level-keys": [
        "error",
        {
          keys: ["name", "version"]
        }
      ]
    }
  }
];`}
          </pre>
        </div>

        <p>
          This setup does three useful things at once: it parses JSON files correctly, keeps ordinary formatting rules in
          configuration instead of code, and gives you a place to add genuinely project-specific logic.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Code className="h-6 w-6" /> Example Custom Rule: Require Top-Level Keys
        </h2>
        <p>
          A good first custom rule is one that checks structure rather than whitespace. The example below enforces that
          root-level config files contain required keys like <code>name</code> and <code>version</code>.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">
            <code>eslint/rules/require-top-level-keys.js</code>
          </h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            {`function getKeyName(keyNode) {
  if (keyNode.type === "JSONLiteral") {
    return String(keyNode.value);
  }

  if ("name" in keyNode && typeof keyNode.name === "string") {
    return keyNode.name;
  }

  return null;
}

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Require specific keys in the root JSON object."
    },
    schema: [
      {
        type: "object",
        properties: {
          keys: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
            uniqueItems: true
          }
        },
        required: ["keys"],
        additionalProperties: false
      }
    ],
    messages: {
      missingKey: "Missing required top-level key '{{key}}'."
    }
  },

  create(context) {
    const [{ keys = [] } = {}] = context.options;
    let checkedRootObject = false;

    return {
      JSONObjectExpression(node) {
        if (checkedRootObject) {
          return;
        }

        checkedRootObject = true;

        const existingKeys = new Set(
          node.properties
            .map((property) => getKeyName(property.key))
            .filter(Boolean)
        );

        for (const key of keys) {
          if (!existingKeys.has(key)) {
            context.report({
              node,
              messageId: "missingKey",
              data: { key }
            });
          }
        }
      }
    };
  }
};`}
          </pre>
        </div>

        <p>
          This example assumes the file&apos;s top-level JSON value is an object, which is exactly what you have in{" "}
          <code>package.json</code>, <code>tsconfig.json</code>, and editor settings files. That makes it a strong
          pattern for real configuration linting even though it stays small enough to understand quickly.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Hammer className="h-6 w-6" /> Test the Rule Before You Trust It
        </h2>
        <p>
          Custom rules are easy to break when you later add options or fixers. A short <code>RuleTester</code> suite is
          usually enough to lock down the behavior.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            {`import { RuleTester } from "eslint";
import jsoncParser from "jsonc-eslint-parser";
import rule from "./require-top-level-keys.js";

const tester = new RuleTester({
  languageOptions: {
    parser: jsoncParser
  }
});

tester.run("require-top-level-keys", rule, {
  valid: [
    {
      code: '{ "name": "demo", "version": "1.0.0" }',
      options: [{ keys: ["name", "version"] }]
    }
  ],
  invalid: [
    {
      code: '{ "name": "demo" }',
      options: [{ keys: ["name", "version"] }],
      errors: [
        {
          messageId: "missingKey",
          data: { key: "version" }
        }
      ]
    }
  ]
});`}
          </pre>
        </div>

        <p>
          If you decide to use <code>@eslint/json</code> instead, keep the same habit of testing but expect different
          AST shapes because the official plugin is built on Momoa rather than the JSONC parser&apos;s ESTree-like node
          model.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <BookOpen className="h-6 w-6" /> When the Official <code>@eslint/json</code> Path Makes More Sense
        </h2>
        <p>
          If your team prefers to stay close to ESLint&apos;s official direction, <code>@eslint/json</code> is a solid
          choice. It supports JSON, JSONC, and JSON5 in flat config and includes a built-in <code>sort-keys</code>{" "}
          rule. The tradeoff is that custom-rule examples written for <code>eslint-plugin-jsonc</code> will not map
          one-to-one because the AST is different.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Minimal official-plugin example</h3>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            {`import { defineConfig } from "eslint/config";
import json from "@eslint/json";

export default defineConfig([
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
    rules: {
      "json/sort-keys": "error"
    }
  }
]);`}
          </pre>
        </div>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Lightbulb className="h-6 w-6" /> Troubleshooting and Practical Notes
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            If your JSON rule never runs, check the basics first: matching <code>files</code> globs, the correct JSON
            parser or language, and flat config instead of old <code>.eslintrc</code> examples copied from blog posts.
          </li>
          <li>
            If you only need key ordering, indentation, trailing-comma rules, or quote enforcement, prefer existing JSON
            lint rules over custom code.
          </li>
          <li>
            If you lint JSON in VS Code, the ESLint extension may need <code>json</code>, <code>jsonc</code>, and{" "}
            <code>json5</code> added to <code>eslint.validate</code> before editor feedback appears.
          </li>
          <li>
            If you maintain a custom fixer that rewrites object order, test it on comments and trailing commas
            explicitly. Those are the edge cases most likely to corrupt JSONC files.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <BookOpen className="h-6 w-6" /> Bottom Line
        </h2>
        <p>
          The current way to create custom JSON formatter rules in ESLint is to start with flat config, use built-in
          sorting rules wherever possible, and add a small local plugin only for conventions that are genuinely unique
          to your project. For most rule authors, <code>eslint-plugin-jsonc</code> is still the fastest way to get
          there, while <code>@eslint/json</code> is the official option when you want to align with ESLint&apos;s newer
          language-plugin model.
        </p>
      </div>
    </>
  );
}
