import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about circular references
 */
export const metadata: Metadata = {
  title: "Circular References in JSON: Why They Break Formatters | Offline Tools",
  description:
    "Learn why circular references cause JSON formatters to fail, how to identify them, and strategies to handle self-referential data structures",
};

/**
 * Article page component for JSON formatter circular references article
 */
export default function JsonFormatterCircularReferencesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Circular References in JSON: Why They Break Formatters</h1>

      <div className="space-y-6">
        <p>
          JSON formatters can handle a wide variety of data structures, but there&apos;s one particular scenario that
          causes most JSON processors to break down completely: circular references. This article explains what circular
          references are, why they cause problems with JSON, and how to handle self-referential data structures.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What Are Circular References?</h2>
        <p>
          A circular reference occurs when an object contains a reference to itself, either directly or through a chain
          of references. This creates a loop in the object graph that has no end.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example of a Direct Circular Reference:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// In JavaScript:
const obj = {};
obj.self = obj;  // obj now contains a reference to itself

// This cannot be directly represented in JSON`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example of an Indirect Circular Reference:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// In JavaScript:
const employee = { name: "Alice" };
const department = { name: "Engineering" };

// Create circular references
employee.department = department;
department.manager = employee;

// This creates a cycle: employee → department → manager (which is employee)`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why JSON Can&apos;t Handle Circular References</h2>
        <p>
          The JSON specification (RFC 8259) defines a format for representing a subset of JavaScript objects as text.
          This format does not include a way to represent circular references. There are several fundamental reasons for
          this limitation:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. JSON Is a Tree, Not a Graph</h3>
        <p>
          JSON&apos;s data model is fundamentally a tree structure, not a graph. Each value in JSON can only appear once
          in a single position within the hierarchy. There&apos;s no way to say &quot;this reference points back to an
          object defined earlier.&quot;
        </p>

        <h3 className="text-xl font-semibold mt-6">2. No Identity or Reference Mechanism</h3>
        <p>
          Unlike programming languages that have object identity and references, JSON has no concept of object identity
          or pointers. In JSON, you can&apos;t say &quot;this is the same object as that one&quot; — you can only create
          a duplicate of the object.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Recursion Problems in Serialization</h3>
        <p>
          When a JSON serializer encounters an object with circular references, it will try to follow the reference,
          which leads it back to the object it&apos;s already processing. This creates an infinite recursion that will
          either:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Throw a &quot;Maximum call stack size exceeded&quot; error</li>
          <li>Run indefinitely until memory is exhausted</li>
          <li>Detect the circle and throw a specific error about circular structures</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            Example Error When Using JSON.stringify:
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`const obj = {};
obj.self = obj;

try {
  JSON.stringify(obj);
} catch (error) {
  console.error(error.message);
  // Output: "Converting circular structure to JSON"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Scenarios That Create Circular References</h2>

        <h3 className="text-xl font-semibold mt-6">1. Parent-Child Relationships</h3>
        <p>
          When implementing bidirectional relationships between parent and child objects, circular references often
          occur naturally.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Parent-child with circular references
const parent = { name: "Parent Node" };
const child = { name: "Child Node" };

// Create circular references
parent.children = [child];
child.parent = parent;  // This creates the circular reference`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Object Graphs in Application State</h3>
        <p>
          Modern web applications often maintain complex state objects where different parts of the state reference each
          other, creating circles.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Application state with circular references
const appState = {
  currentUser: {
    name: "John",
    permissions: null  // Will be set later
  },
  permissions: {
    admin: {
      canEdit: true,
      user: null  // Will reference back to currentUser
    }
  }
};

// Create the circular reference
appState.currentUser.permissions = appState.permissions.admin;
appState.permissions.admin.user = appState.currentUser;`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. DOM Structures</h3>
        <p>
          The Document Object Model (DOM) naturally contains circular references: child nodes have references to their
          parents, and parents have arrays of their children.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// DOM elements contain circular references
const div = document.createElement('div');
const button = document.createElement('button');
div.appendChild(button);

// Now div.children includes button
// And button.parentNode references div

// This can't be directly serialized to JSON`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Detecting Circular References</h2>
        <p>
          Before attempting to stringify your data, you may want to check for circular references. Here&apos;s a simple
          function to detect them:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`function hasCircularReferences(obj) {
  const seen = new WeakSet();
  
  function detect(obj) {
    // Primitive values are not objects, so they can't create cycles
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }
    
    // If we've seen this object before, we have a circular reference
    if (seen.has(obj)) {
      return true;
    }
    
    // Add the current object to the set of seen objects
    seen.add(obj);
    
    // Check all property values
    for (const key in obj) {
      if (detect(obj[key])) {
        return true;
      }
    }
    
    return false;
  }
  
  return detect(obj);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Strategies for Handling Circular References</h2>
        <p>Here are several approaches for dealing with circular references when working with JSON:</p>

        <h3 className="text-xl font-semibold mt-6">1. Use a Custom Replacer Function</h3>
        <p>
          JSON.stringify accepts a replacer function that can handle circular references by removing or replacing them.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`function stringifyWithoutCircularRefs(obj) {
  const seen = new WeakSet();
  
  return JSON.stringify(obj, (key, value) => {
    // If the value is an object and not null
    if (typeof value === 'object' && value !== null) {
      // If we've seen this object before
      if (seen.has(value)) {
        return '[Circular Reference]';  // Replace with a description
        // Or return undefined to remove it completely
      }
      
      // Add the value to the set of seen objects
      seen.add(value);
    }
    
    return value;
  });
}

const obj = {};
obj.self = obj;

console.log(stringifyWithoutCircularRefs(obj));
// Output: {"self":"[Circular Reference]"}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Restructure Your Data</h3>
        <p>
          Often, the best approach is to restructure your data to avoid circular references entirely. This usually
          involves using IDs instead of direct object references.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Before (with circular references):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`const employee = { id: 1, name: "Alice" };
const department = { id: 101, name: "Engineering" };

employee.department = department;
department.manager = employee;`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After (using IDs):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`const employee = { id: 1, name: "Alice", departmentId: 101 };
const department = { id: 101, name: "Engineering", managerId: 1 };

// This can be safely serialized to JSON
const data = {
  employees: [employee],
  departments: [department]
};

console.log(JSON.stringify(data));`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Use Libraries with Circular Reference Support</h3>
        <p>Several libraries have been developed specifically to handle circular references in JSON:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-4 mt-2">
            <li>
              <strong>circular-json</strong>
              <p className="text-sm mt-1">
                A library that extends the native JSON object to handle circular references.
              </p>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                {`// Using circular-json
const CircularJSON = require('circular-json');

const obj = {};
obj.self = obj;

const json = CircularJSON.stringify(obj);
console.log(json);

const restored = CircularJSON.parse(json);
// Circular reference is preserved in the restored object`}
              </pre>
            </li>
            <li>
              <strong>flatted</strong>
              <p className="text-sm mt-1">
                A modern alternative to circular-json that works by transforming the circular structure into a flat
                array.
              </p>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
                {`// Using flatted
const { stringify, parse } = require('flatted');

const obj = {};
obj.self = obj;

const json = stringify(obj);
console.log(json);

const restored = parse(json);
// Circular reference is preserved in the restored object`}
              </pre>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            When using libraries to handle circular references, be aware that the resulting JSON may not be compatible
            with standard JSON parsers. The JSON will only be correctly parsed by the same library that generated it.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Alternative Data Formats</h2>
        <p>
          If you frequently work with circular references, you might consider using an alternative data format that
          supports them natively:
        </p>

        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <strong>BSON</strong> (Binary JSON) - Used by MongoDB, supports circular references
          </li>
          <li>
            <strong>MessagePack</strong> - A binary format that can be extended to handle circular references
          </li>
          <li>
            <strong>Protocol Buffers</strong> - Google&apos;s data interchange format
          </li>
          <li>
            <strong>YAML</strong> - Has native support for circular references using anchors and aliases
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example of Circular References in YAML:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`# YAML supports circular references
person: &person
  name: "John"
  friends:
    - name: "Alice"
      bestFriend: *person  # Reference to the 'person' anchor`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for JSON and Circular References</h2>
        <ol className="list-decimal pl-6 space-y-2 mt-2">
          <li>
            <strong>Design for serializability</strong> - Structure your data with JSON serialization in mind, avoiding
            circular references where possible.
          </li>
          <li>
            <strong>Use IDs instead of direct references</strong> - This is a common pattern in RESTful APIs and
            database designs.
          </li>
          <li>
            <strong>Identify reference relationships before serializing</strong> - Know which properties might cause
            circular references.
          </li>
          <li>
            <strong>Implement custom serialization logic</strong> - For complex cases, write your own serialization and
            deserialization code.
          </li>
          <li>
            <strong>Document your approach</strong> - Make it clear to other developers how circular references are
            handled in your codebase.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Circular references present a fundamental challenge for JSON formatting and parsing. While the JSON format
          itself doesn&apos;t support circular structures, there are multiple strategies to handle them in practice.
        </p>
        <p className="mt-4">
          By understanding why circular references break JSON formatters and implementing appropriate strategies to
          handle them, you can effectively work with complex, interconnected data structures while still leveraging JSON
          for data interchange.
        </p>
      </div>
    </>
  );
}
