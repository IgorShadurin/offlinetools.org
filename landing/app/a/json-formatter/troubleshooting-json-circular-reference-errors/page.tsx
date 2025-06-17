import type { Metadata } from "next";
import { Bug, CircuitBoard, Lightbulb, Check, X, Code, Braces, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Troubleshooting JSON Circular Reference Errors | Developer Guide",
  description:
    "Understand, identify, and fix JSON circular reference errors that occur during serialization (JSON.stringify).",
};

export default function JsonCircularReferenceErrorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Bug size={32} className="text-red-500" />
        Troubleshooting JSON Circular Reference Errors
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          One common pitfall developers encounter when working with JavaScript objects and JSON is the "circular
          reference error". This typically happens when you try to serialize an object (convert it into a JSON string)
          that contains references to itself, either directly or indirectly through a chain of other objects. The
          standard <code>JSON.stringify()</code> method cannot handle this structure because it would get stuck in an
          infinite loop trying to serialize the cyclical relationship.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircuitBoard size={24} />
          What are Circular References?
        </h2>
        <p>
          A circular reference exists when an object property references the object itself, or when a chain of
          references eventually leads back to a previously visited object in the chain.
        </p>
        <p>Consider these examples:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Simple Direct Circular Reference:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const objA = &#x7b; name: "Object A" &#x7d;;
objA.self = objA; // objA references itself

// Trying to stringify this will fail:
// JSON.stringify(objA); // Throws TypeError`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Indirect Circular Reference:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const objB = &#x7b; name: "Object B" &#x7d;;
const objC = &#x7b; name: "Object C" &#x7d;;

objB.child = objC;
objC.parent = objB; // objC references objB, completing the circle

// Trying to stringify objB or objC will fail:
// JSON.stringify(objB); // Throws TypeError
// JSON.stringify(objC); // Throws TypeError`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <X size={24} />
          Why <code>JSON.stringify()</code> Fails
        </h2>
        <p>
          When <code>JSON.stringify()</code> encounters an object, it recursively attempts to stringify all its
          properties. If a property's value is another object or array, it descends into that structure. If it
          encounters an object that it has already seen in the current serialization path, it detects the cycle and
          throws a <code>TypeError: Converting circular structure to JSON</code>. This prevents infinite recursion.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} />
          Common Scenarios
        </h2>
        <p>Circular references often appear in:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>ORM (Object-Relational Mapper) Results:</strong> When fetching data with relationships (e.g., a
            `User` object having a list of `Posts`, and each `Post` object having a reference back to its `User`), ORMs
            sometimes populate both sides of the relationship, creating circles.
          </li>
          <li>
            <strong>Event Emitters / Framework Objects:</strong> Internal framework objects, event emitters, or DOM
            elements often have complex internal structures with cross-references.
          </li>
          <li>
            <strong>Caching Mechanisms:</strong> Objects used in caches might hold references in ways that create cycles
            if not carefully managed.
          </li>
          <li>
            <strong>Complex Application State:</strong> In large applications, manually constructed objects representing
            application state can inadvertently create circular dependencies.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench size={24} />
          Solutions and Workarounds
        </h2>
        <p>
          The goal is to break the cycle before calling <code>JSON.stringify()</code>, or to instruct{" "}
          <code>JSON.stringify()</code> on how to handle repeated object references.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          1. Manually Filter the Object
        </h3>
        <p>
          Before stringifying, create a new object that contains only the necessary properties, omitting those that
          cause the circular reference.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Filtering Manually</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const objB = &#x7b; name: "Object B" &#x7d;;
const objC = &#x7b; name: "Object C" &#x7d;;

objB.child = objC;
objC.parent = objB; // Circular reference

const safeObjB = &#x7b;
  name: objB.name,
  child: &#x7b;
    name: objB.child.name
    // Exclude the 'parent' property to break the cycle
  &#x7d;
&#x7d;;

const jsonString = JSON.stringify(safeObjB, null, 2);
console.log(jsonString);
// Output:
// &#x7b;
//   "name": "Object B",
//   "child": &#x7b;
//     "name": "Object C"
//   &#x7d;
// &#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          This method is straightforward for simple cases but can become cumbersome with deeply nested or complex
          structures.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          2. Use the <code>replacer</code> Function with <code>JSON.stringify()</code>
        </h3>
        <p>
          <code>JSON.stringify()</code> accepts an optional second argument: a <code>replacer</code> function. This
          function is called for every key-value pair in the object, allowing you to transform the value before it's
          stringified. You can use this to detect and handle circular references.
        </p>
        <p>
          A common technique is to keep track of visited objects and return a placeholder (like <code>null</code> or a
          string indicating a cycle) when a previously visited object is encountered.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Using a Replacer Function</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const objB = &#x7b; name: "Object B" &#x7d;;
const objC = &#x7b; name: "Object C" &#x7d;;

objB.child = objC;
objC.parent = objB; // Circular reference

// Create a WeakMap to store visited objects during stringification
const cache = new WeakMap();

const replacer = (key, value) => {
  // Handle objects and arrays only
  if (typeof value === 'object' && value !== null) {
    // If we have seen this object before, return a placeholder
    if (cache.has(value)) {
      // Return a string to indicate a circular reference,
      // or just return undefined to omit the property.
      return '[Circular]';
      // return undefined; // This would omit the property
    }
    // Store the object in the cache for future checks
    cache.set(value, true);
  }
  // For primitive values or the first time encountering an object, return the value
  return value;
};

// Use the replacer function
const jsonString = JSON.stringify(objB, replacer, 2);
console.log(jsonString);

// Note: This specific replacer doesn't clear the cache,
// so reuse could be an issue if stringifying multiple independent objects.
// A more robust replacer might need to be a closure that resets the cache
// or handle nested stringify calls. For simple top-level calls, this works.

// Output:
// &#x7b;
//   "name": "Object B",
//   "child": &#x7b;
//     "name": "Object C",
//     "parent": "[Circular]" // The circular reference is replaced
//   &#x7d;
// &#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          This is a more robust approach for handling arbitrary object structures that might contain cycles. The use of{" "}
          <code>WeakMap</code> is important because it allows garbage collection of objects once they are no longer
          referenced elsewhere, preventing memory leaks if the cache grew very large.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          3. Restructure Your Data
        </h3>
        <p>
          Sometimes, the best solution is to design your data structures or API responses to avoid circular references
          in the first place. Instead of embedding full objects in relationships, use identifiers (like database IDs).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Using IDs Instead of Full Objects</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Instead of:
// const user = &#x7b; id: 1, name: "Alice", posts: [&#x7b; id: 101, userId: 1, title: "Post 1", user: user &#x7d;] &#x7d;;

// Consider:
const user = &#x7b; id: 1, name: "Alice", postIds: [101, 102] &#x7d;;
const post1 = &#x7b; id: 101, userId: 1, title: "Post 1" &#x7d;;
const post2 = &#x7b; id: 102, userId: 1, title: "Post 2" &#x7d;;

const dataToSend = &#x7b;
  user: user,
  posts: [post1, post2]
&#x7d;;

// This structure is easily stringifiable:
const jsonString = JSON.stringify(dataToSend, null, 2);
console.log(jsonString);
// Output:
// &#x7b;
//   "user": &#x7b;
//     "id": 1,
//     "name": "Alice",
//     "postIds": [
//       101,
//       102
//     ]
//   &#x7d;,
//   "posts": [
//     &#x7b;
//       "id": 101,
//       "userId": 1,
//       "title": "Post 1"
//     &#x7d;,
//     &#x7b;
//       "id": 102,
//       "userId": 1,
//       "title": "Post 2"
//     &#x7d;
//   ]
// &#x7d;`}
            </pre>
          </div>
        </div>
        <p>
          This approach is cleaner and often more efficient for transferring data, as the recipient can reconstruct
          relationships based on IDs if needed.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          4. Using Utility Libraries (Mention Only)
        </h3>
        <p>
          While this article focuses on built-in solutions, it's worth noting that various libraries exist to handle
          complex serialization scenarios, including circular references. These libraries often provide more
          sophisticated replacer functions or alternative serialization methods. Examples (external to standard
          JS/React, so not shown in code) include libraries for deep cloning or specialized JSON stringifiers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Braces size={24} />
          Identifying the Source
        </h2>
        <p>
          When a <code>TypeError: Converting circular structure to JSON</code> occurs, the error message itself might
          not always pinpoint the exact property causing the issue, especially in complex objects. Debugging techniques
          include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Logging:</strong> Log parts of the object structure just before <code>JSON.stringify</code> to see
            what it contains.
          </li>
          <li>
            <strong>Property by Property Stringification:</strong> Try stringifying smaller parts of the object or
            individual properties to isolate the problematic section.
          </li>
          <li>
            <strong>Using a Custom Replacer for Debugging:</strong> Modify the replacer function to log the{" "}
            <code>key</code> and <code>value</code> it's currently processing and where it detects a cycle.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} />
          Conclusion
        </h2>
        <p>
          Circular reference errors during JSON serialization are a signal that your object graph has a loop.
          Understanding how <code>JSON.stringify()</code> works and the structure of your data is key to resolving these
          issues. By manually filtering, using the <code>replacer</code> function, or restructuring your data, you can
          effectively handle circular references and successfully convert your objects to JSON. The{" "}
          <code>replacer</code> function offers a flexible built-in solution for many scenarios, while data
          restructuring provides a more fundamental fix by avoiding the problem altogether.
        </p>
      </div>
    </>
  );
}
