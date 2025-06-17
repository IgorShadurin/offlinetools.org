import type { Metadata } from "next";
import { Lock, AlertTriangle, Code, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Protecting Against Prototype Pollution in JSON Parsing",
  description:
    "Learn about Prototype Pollution vulnerabilities related to JSON parsing and processing in JavaScript/TypeScript and how to prevent them.",
};

export default function PrototypePollutionJsonParsingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Shield size={32} />
        <span>Protecting Against Prototype Pollution in JSON Parsing</span>
      </h1>

      <div className="space-y-6">
        <p>
          In JavaScript and TypeScript, understanding how data is structured and processed is crucial for security. One
          significant vulnerability to be aware of, particularly when dealing with external data sources like JSON, is{" "}
          <strong>Prototype Pollution</strong>. While often discussed in the context of object merging or cloning, it
          can seem related to JSON parsing, and processing parsed JSON data is a common attack vector.
        </p>
        <p>
          This article explores what Prototype Pollution is, its connection (or lack thereof) to standard JSON parsing,
          how it can manifest when handling parsed JSON, and, most importantly, how to protect your applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle size={24} />
          <span>What is Prototype Pollution?</span>
        </h2>
        <p>
          In JavaScript, objects inherit properties and methods from their prototype. If an attacker can inject
          properties into the prototype of a base object (like <code>Object.prototype</code>), those injected properties
          will be accessible on *all* objects in the application, potentially leading to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Denial of Service (DoS) by crashing the application.</li>
          <li>Remote Code Execution (RCE) if coupled with other vulnerabilities (e.g., through gadget chains).</li>
          <li>Property manipulation or data leakage.</li>
        </ul>
        <p>
          The core idea is exploiting insecure recursive merge, clone, or assignment functions that don't properly
          validate user-supplied keys.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>The Role of JSON.parse()</span>
        </h2>
        <p>
          Let's clarify a common point of confusion:{" "}
          <strong>
            The standard <code>JSON.parse()</code> function in modern JavaScript engines is NOT vulnerable to Prototype
            Pollution directly.
          </strong>
        </p>
        <p>
          <code>JSON.parse()</code> is designed to create plain objects (created with <code>&#x7b;&#x7d;</code>) and
          arrays (created with <code>[]</code>) from a JSON string. When it encounters keys like
          <code>"__proto__"</code>, <code>"constructor"</code>, or <code>"prototype"</code>, it treats them simply as
          property names, just like any other string key. It does not traverse the prototype chain or modify the
          prototype of the object it's creating.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Safe Parsing Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const maliciousJson = '{ "user": "admin", "__proto__": { "isAdmin": true } }';
const parsedData = JSON.parse(maliciousJson);

console.log(parsedData.user); // Output: admin
console.log(parsedData.__proto__); // Output: { isAdmin: true } (a regular property)

// This does NOT affect the prototype of other objects:
const innocentObj = {};
console.log(innocentObj.isAdmin); // Output: undefined
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            <code>JSON.parse()</code> correctly interprets <code>"__proto__"</code> as a literal key name, not a special
            property accessor.
          </p>
        </div>
        <p>
          So, parsing untrusted JSON data using just <code>JSON.parse()</code> does not inherently expose you to
          Prototype Pollution.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>Where the Danger Lies: Processing Parsed JSON</span>
        </h2>
        <p>
          The vulnerability typically arises <strong>after</strong> the JSON has been parsed into a JavaScript object,
          when that object is then used in operations that recursively traverse and assign properties, such as:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Deep merging user-supplied data into a configuration object.</li>
          <li>Cloning objects where the clone function doesn't handle prototype properties correctly.</li>
          <li>Assigning properties recursively from a source object to a target object.</li>
        </ul>
        <p>
          A common pattern where this occurs is a naive "deep extend" or "recursive merge" function, often implemented
          to update settings or objects with nested structures.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example of a VULNERABLE Deep Merge Function:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// THIS IS VULNERABLE - DO NOT USE IN PRODUCTION WITHOUT SANITIZATION
function vulnerableDeepMerge(target: any, source: any): any {
  for (const key in source) {
    // Problem: It iterates over inherited properties too unless hasOwnProperty check is missing (which it often is in vulnerable code)
    // Problem: It doesn't check for "__proto__", "constructor", "prototype" keys
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // Recursively merge nested objects
      target[key] = vulnerableDeepMerge(target[key] || {}, source[key]);
    } else {
      // Assign primitive or array values
      target[key] = source[key];
    }
  }
  return target;
}

// --- Attack Scenario ---
const baseConfig = {
  app: {
    name: "MyApp",
    version: "1.0"
  },
  settings: {
    theme: "dark"
  }
};

const userInputJson = \`{
  "app": {
    "version": "1.1"
  },
  "settings": {
    "__proto__": {
      "polluted": "PWNED!"
    }
  }
}\`;

const parsedUserInput = JSON.parse(userInputJson);

console.log("Before merge:", ({} as any).polluted); // Output: undefined

// Attacker controls parsedUserInput, passes it to vulnerableDeepMerge
vulnerableDeepMerge(baseConfig, parsedUserInput);

console.log("After merge:", ({} as any).polluted); // If vulnerable, Output: PWNED!
console.log("Merged Config:", baseConfig); // Shows the regular merge happened

// Now any plain object might inherit the polluted property
const anotherObj = {};
console.log("New object polluted?", (anotherObj as any).polluted); // If vulnerable, Output: PWNED!
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            The vulnerability occurs because the merge function doesn't sanitize the keys from the parsed JSON before
            assigning them, allowing <code>"__proto__"</code> to be treated as a key pointing to the prototype.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Lock size={24} />
          <span>How to Protect Against Prototype Pollution</span>
        </h2>
        <p>
          Protection involves sanitizing or validating data *before* using it in potentially vulnerable operations like
          deep merges or recursive assignments. Here are the key strategies:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Always Use `JSON.parse()`</h3>
        <p>
          As established, <code>JSON.parse()</code> itself is safe. Do not use insecure custom JSON parsers or
          eval-based methods.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Correct (Safe) Parsing:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// ALWAYS use JSON.parse() for untrusted JSON strings
const parsedUserData = JSON.parse(untrustedJsonString);`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Sanitize Input Before Processing</h3>
        <p>
          If you need to use parsed JSON data in operations like merging or extending, validate the keys in the parsed
          data. Reject or filter out keys that could target the prototype.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Sanitization Example (Recursive Filter):</h3>
          <div className="bg-white p-3 rounded dark:gray-900 overflow-x-auto">
            <pre>
              {`function isObject(item: any): item is object {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

function sanitizeObject(obj: any): any {
  if (!isObject(obj)) {
    return obj; // Return non-objects directly
  }

  const sanitized: { [key: string]: any } = {};
  for (const key in obj) {
    // IMPORTANT: Check if the key is potentially malicious
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      console.warn(\`Potential prototype pollution attempt blocked: key "\${key}"\`);
      continue; // Skip malicious keys
    }
    // OPTIONAL: Check if the property is directly on the object, not inherited (good practice)
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
       // Recursively sanitize nested objects
      if (isObject(obj[key])) {
        sanitized[key] = sanitizeObject(obj[key]);
      } else if (Array.isArray(obj[key])) {
        // Sanitize array elements if they are objects
        sanitized[key] = obj[key].map(sanitizeObject);
      }
      else {
        sanitized[key] = obj[key];
      }
    }
  }
  return sanitized;
}

// --- Safe Usage Scenario ---
const baseConfig = { /* ... */ };
const userInputJson = \`{ /* ... malicious payload ... */ }\`;

const parsedUserInput = JSON.parse(userInputJson);
const sanitizedUserInput = sanitizeObject(parsedUserInput);

// Now merge the SANITIZED data
// Use a SAFE merge function (or the sanitized data with a regular merge)
// Example: Object.assign({}, baseConfig, sanitizedUserInput); // Simple merge if structure is flat enough
// For deep merge, ensure the deep merge function ITSELF checks keys or use the sanitized data

// Using the vulnerableDeepMerge *with sanitized data* becomes safer:
// vulnerableDeepMerge(baseConfig, sanitizedUserInput); // Now __proto__ is filtered out
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            This function recursively removes keys that target the prototype from the parsed JSON object before it's
            used in operations like merging.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Use Safe Object Manipulation Libraries/Functions</h3>
        <p>
          Reliable libraries often have built-in protections against Prototype Pollution in their merge, clone, or set
          functions.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Libraries like Lodash and jQuery had past vulnerabilities but have been updated to protect against Prototype
            Pollution in functions like <code>_.merge()</code> or <code>_.extend()</code>. Always use recent versions.
          </li>
          <li>
            When implementing your own object manipulation logic, ensure it explicitly avoids or checks for keys like{" "}
            <code>"__proto__"</code>, <code>"constructor"</code>, and <code>"prototype"</code>.
          </li>
          <li>
            Use <code>Object.prototype.hasOwnProperty.call(obj, key)</code> instead of just{" "}
            <code>obj.hasOwnProperty(key)</code>
            when iterating over object properties to avoid issues if <code>hasOwnProperty</code> itself is polluted.
          </li>
          <li>
            Consider using <code>Object.keys()</code> or <code>Object.getOwnPropertyNames()</code> to iterate only over
            own properties, although this alone might not protect against <code>__proto__</code> if assigned directly as
            a regular property name. The explicit key check is the most robust defense.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example of a Safer Merge Logic Snippet:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function saferMerge(target: any, source: any): any {
  if (!isObject(source)) {
    return source; // Only merge objects
  }

  if (!isObject(target)) {
      // If target is not an object, replace it with a new object to merge into
      target = {};
  }

  for (const key in source) {
    // Critical Check 1: Skip inherited properties
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
    }

    // Critical Check 2: Explicitly check for malicious keys
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      console.warn(\`Prototype pollution attempt blocked during merge: key "\${key}"\`);
      continue; // Skip malicious keys
    }

    // Recursive merge for nested objects
    if (isObject(source[key])) {
      target[key] = saferMerge(target[key], source[key]); // Recursively call saferMerge
    } else {
      // Assign other values
      target[key] = source[key];
    }
  }
  return target;
}

// --- Safe Usage ---
const baseConfig = { /* ... */ };
const userInputJson = \`{ /* ... malicious payload ... */ }\`;
const parsedUserInput = JSON.parse(userInputJson); // Still safe here

// Use the safer merge function with parsed data
const mergedConfig = saferMerge({...baseConfig}, parsedUserInput); // Clone baseConfig first if you want immutability

console.log("Merged Config (safe):", mergedConfig);
console.log("New object polluted?", ({} as any).polluted); // Should still be undefined
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            This version adds checks for own properties and explicitly skips the problematic keys.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Consider Freezing Object.prototype (Advanced/Caution)</h3>
        <p>
          In some environments (e.g., certain server-side Node.js applications where you have control over the startup),
          you might consider freezing <code>Object.prototype</code> to prevent any additions or modifications.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Caution: This must be done early in your application's lifecycle.
// It might break poorly written libraries that expect to modify prototypes.
// Object.freeze(Object.prototype);
// console.log(Object.isFrozen(Object.prototype)); // Output: true`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            Freezing the prototype is a strong defense but can have compatibility issues. Use with caution and thorough
            testing.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle size={24} />
          <span>Key Takeaways</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Standard <code>JSON.parse()</code> is safe against Prototype Pollution.
          </li>
          <li>
            Vulnerabilities arise when <em>processing</em> the parsed JSON using functions (like deep merge/clone) that
            don't properly validate or sanitize property names.
          </li>
          <li>
            Malicious payloads use keys like <code>"__proto__"</code>, <code>"constructor"</code>, or{" "}
            <code>"prototype"</code>
            to inject properties into base object prototypes.
          </li>
          <li>
            Protect yourself by:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>
                Always using <code>JSON.parse()</code>.
              </li>
              <li>Sanitizing parsed data by filtering out malicious keys before using it in recursive operations.</li>
              <li>
                Using modern, well-maintained libraries for object manipulation (like merging) that have built-in
                protections.
              </li>
              <li>Implementing your own object manipulation logic with explicit checks for malicious keys.</li>
            </ul>
          </li>
        </ul>

        <p>
          By understanding that the risk lies in the processing logic rather than the parsing itself, and by
          implementing robust checks during object manipulation, you can effectively protect your application against
          Prototype Pollution attacks originating from untrusted JSON inputs.
        </p>
      </div>
    </>
  );
}
