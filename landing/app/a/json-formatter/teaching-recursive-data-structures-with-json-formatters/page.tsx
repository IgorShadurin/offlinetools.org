import type { Metadata } from "next";
import {
  ChevronRight,
  SquareCode,
  Boxes,
  Copy,
  Eye,
  GitFork,
  Indent
} from "lucide-react";

export const metadata: Metadata = {
  title: "Teaching Recursive Data Structures with JSON Formatters",
  description:
    "Explore how JSON formatters visualize recursive data structures and serve as a practical tool for learning recursion.",
};

export default function TeachingRecursionWithJsonFormattersPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Teaching Recursive Data Structures with JSON Formatters
      </h1>

      <section className="space-y-6 mb-10">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Recursive data structures are fundamental concepts in computer science,
          but they can be challenging to grasp initially. Data structures like trees,
          linked lists, and graphs are often defined recursively. Learning to
          work with them, whether it's traversing, searching, or manipulating,
          frequently involves recursive algorithms.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          JSON (JavaScript Object Notation) is a ubiquitous data format that
          inherently supports recursive structures through nested objects and arrays.
          Understanding how tools visualize this nested data can be a powerful
          aid in learning the concept of recursion. This article explores how
          JSON formatters and viewers serve as excellent visual aids for teaching
          recursive data structures.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Boxes className="mr-2 text-blue-600 dark:text-blue-400" size={28} />
          What are Recursive Data Structures?
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          A recursive data structure is one that is defined in terms of itself.
          The simplest cases (base cases) don't refer to themselves, while
          recursive cases are composed of smaller instances of the same structure.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Linked List:</strong> A list is either empty (base case) or it's a node
            containing data and a reference to another list (recursive case).
          </li>
          <li>
            <strong>Tree:</strong> A tree is either empty (base case) or it's a node
            containing data and a list of child trees (recursive case).
          </li>
          <li>
            <strong>JSON Object:</strong> An object is a collection of key-value pairs. A value
            can be a primitive (string, number, boolean, null - base cases), or it can
            be another object or an array (recursive cases).
          </li>
          <li>
            <strong>JSON Array:</strong> An array is a list of values. Each value can be
            a primitive (base case) or another object or array (recursive cases).
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Eye className="mr-2 text-green-600 dark:text-green-400" size={28} />
          JSON's Recursive Nature
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The structural definition of JSON clearly exhibits recursion:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 my-4">
          <pre>
            {`Value ::= Object | Array | String | Number | "true" | "false" | "null"
Object ::= "{" ( String ":" Value ( "," String ":" Value )* )? "}"
Array  ::= "[" ( Value ( "," Value )* )? "]"
`}
          </pre>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Notice how `Value` can lead to `Object` or `Array`, and `Object` and `Array`
          both contain `Value`s. This self-referential definition is the essence of
          recursion in the data structure itself.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <SquareCode className="mr-2 text-purple-600 dark:text-purple-400" size={28} />
          How JSON Formatters Help Visualize Recursion
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          A JSON formatter or viewer is a tool that takes raw, often unreadable,
          JSON text and presents it in a structured, indented, and syntax-highlighted
          format. While seemingly simple, the way they structure the output is a
          direct visualization of the data's recursive nature and the recursive process
          needed to render it.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
          <Indent className="mr-2 text-purple-500" size={24} /> Indentation and Nesting
        </h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The most obvious feature is indentation. Each time an object `&#x7b;...&#x7d;`
          or an array `[...]` is encountered, the formatter increases the indentation
          level for its contents. This visual nesting directly mirrors the
          recursive calls a rendering algorithm would make:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 my-4">
          <pre>
            {`{
  "name": "Product",
  "details": {         // &lt;-- Indent Level 1
    "id": "XYZ",
    "price": 19.99,
    "features": [      // &lt;-- Indent Level 2
      "durable",
      "lightweight"
    ],
    "dimensions": {    // &lt;-- Indent Level 2
      "height": 10,
      "width": 5
    }
  },
  "tags": [            // &lt;-- Indent Level 1
    "electronics",
    { "category": "gadget" } // &lt;-- Indent Level 2
  ]
}`}
          </pre>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Each increase in indentation signifies a descent into a nested structure,
          just as a recursive function would call itself to process the substructure.
          When the formatter finishes rendering the contents of an object or array,
          it decreases the indentation, corresponding to returning from the recursive call.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
          <GitFork className="mr-2 text-purple-500" size={24} /> Branching and Structure
        </h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Objects represent branches with labeled edges (the keys), leading to
          nested values (the child nodes). Arrays represent ordered lists of children.
          A JSON formatter visually lays out this tree-like structure, making the
          concept of nodes and branches concrete.
        </p>

        <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
          <Copy className="mr-2 text-purple-500" size={24} /> Repeated Patterns
        </h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Recursive data structures are characterized by repeating the same structure
          at different levels of nesting. In JSON, this is evident when you see
          objects nested within objects, arrays within arrays, or objects/arrays
          nested within each other. The formatter renders these repeating patterns
          consistently, reinforcing the idea that the same logic (the recursive rendering
          function) is applied at each level.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 my-4">
          <pre>
            {`[ // Array 1
  { // Object A
    "items": [ // Array 2
      { // Object B
        "name": "item1",
        "details": { // Object C
          "value": 10
        }
      }
    ]
  }
]
`}
          </pre>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Array 1 contains an Object A. Object A contains an Array 2. Array 2 contains
          Object B. Object B contains Object C. The recursive pattern (container containing
          containers) is clear visually through the nested indentation.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <ChevronRight className="mr-2 text-yellow-600 dark:text-yellow-400" size={28} />
          Conceptual Code for a Recursive Formatter Component
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Consider how a front-end component (like one in React/Next.js) would
          render JSON data. It would naturally use recursion. Here's a simplified,
          conceptual TypeScript/React component structure:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 my-4">
          <h3 className="text-lg font-medium mb-2">Conceptual `JsonNode` Component:</h3>
          <div className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto">
            <pre>
              {`// Assume this component receives 'data' and 'indentationLevel' as props
// No 'use client' or 'useState' here, as requested for this page context

interface JsonNodeProps {
  label?: string; // Key for objects, index hint for arrays
  data: any; // The JSON value
  indentationLevel: number;
}

const JsonNode = ({ label, data, indentationLevel }: JsonNodeProps) => {
  const indentation = "  ".repeat(indentationLevel); // Visual indentation

  // Helper to render a recursive child node
  const renderChild = (childData: any, childLabel?: string) => (
    &lt;JsonNode
      label={childLabel}
      data={childData}
      indentationLevel={indentationLevel + 1}
    />
  );

  // --- Rendering Logic ---

  // Base Cases (Primitives)
  if (typeof data === 'string') {
    return (
      &lt;div className="json-string">
        &lt;span&gt;{indentation}&lt;/span&gt;
        {label && &lt;span className="json-label"&gt;"{label}": &lt;/span&gt;}
        &lt;span className="json-value-string"&gt;"{data}"&lt;/span&gt;{label ? "" : ","} // Add comma if not a root item without label
      &lt;/div>
    );
  }
  if (typeof data === 'number') {
     return (
      &lt;div className="json-number">
        &lt;span&gt;{indentation}&lt;/span&gt;
        {label && &lt;span className="json-label"&gt;"{label}": &lt;/span&gt;}
        &lt;span className="json-value-number"&gt;{data}&lt;/span&gt;{label ? "" : ","}
      &lt;/div>
    );
  }
  if (typeof data === 'boolean') {
     return (
      &lt;div className="json-boolean">
        &lt;span&gt;{indentation}&lt;/span&gt;
        {label && &lt;span className="json-label"&gt;"{label}": &lt;/span&gt;}
        &lt;span className="json-value-boolean"&gt;{data.toString()}&lt;/span&gt;{label ? "" : ","}
      &lt;/div>
    );
  }
  if (data === null) {
     return (
      &lt;div className="json-null">
        &lt;span&gt;{indentation}&lt;/span&gt;
        {label && &lt;span className="json-label"&gt;"{label}": &lt;/span&gt;}
        &lt;span className="json-value-null"&gt;null&lt;/span&gt;{label ? "" : ","}
      &lt;/div>
    );
  }

  // Recursive Cases (Objects and Arrays)
  if (Array.isArray(data)) {
    return (
      &lt;div className="json-array">
        &lt;span&gt;{indentation}&lt;/span&gt;{label && &lt;span className="json-label"&gt;"{label}": &lt;/span&gt;}[
        {data.map((item, index) => (
          // Recursive Call for Array elements
          &lt;div key={index}&gt;{renderChild(item)}{index &lt; data.length - 1 ? "," : ""}&lt;/div>
        ))}
        &lt;span&gt;{indentation}&lt;/span&gt;]{label ? "" : ","}
      &lt;/div>
    );
  }

  if (typeof data === 'object' && data !== null) {
     const keys = Object.keys(data);
    return (
      &lt;div className="json-object">
        &lt;span&gt;{indentation}&lt;/span&gt;{label && &lt;span className="json-label"&gt;"{label}": &lt;/span&gt;}&#x7b;
        {keys.map((key, index) => (
          // Recursive Call for Object values
          &lt;div key={key}&gt;{renderChild(data[key], key)}{index &lt; keys.length - 1 ? "," : ""}&lt;/div>
        ))}
        &lt;span&gt;{indentation}&lt;/span&gt;&#x7d;{label ? "" : ","}
      &lt;/div>
    );
  }

  // Fallback for unknown types (shouldn't happen with valid JSON)
  return &lt;div className="json-error"&gt;{indentation}Error: Could not render data.&lt;/div>;
};

// Example Usage (Imagine this is inside your main page component)
/*
const sampleJson = {
  "user": {
    "id": 1,
    "name": "Alice",
    "settings": {
      "darkMode": true,
      "notifications": null
    },
    "roles": ["admin", "editor"]
  }
};

// This would be called from the root component rendering the formatter
// <JsonNode data={sampleJson} indentationLevel={0} />
*/

`}
            </pre>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          In this conceptual component, `JsonNode` represents a single piece of data
          in the JSON structure. If the data is a primitive (string, number, boolean, null),
          it's rendered directly – this is the base case of the recursion.
          If the data is an array or an object, the component iterates through its
          elements or properties and calls `renderChild` for each one. `renderChild`
          simply calls `JsonNode` again with the nested data and an increased indentation
          level – this is the recursive step.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          A real formatter would add syntax highlighting, expand/collapse toggles,
          line numbers, etc., but the core rendering logic is recursive.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
           <GitFork className="mr-2 text-orange-600 dark:text-orange-400" size={28} />
           Beyond Basic Formatting: Tree Views
        </h2>
         <p className="mb-4 text-gray-700 dark:text-gray-300">
          Many advanced JSON viewers offer a tree-like navigation panel alongside
          the formatted text. This explicitly shows the hierarchical structure,
          making the connection between the JSON document and abstract tree
          data structures even more apparent. Expanding and collapsing nodes in
          the tree view directly corresponds to revealing or hiding nested substructures.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
          <Eye className="mr-2 text-teal-600 dark:text-teal-400" size={28} />
          Using Formatters in Education
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          JSON formatters are valuable teaching tools because they:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Provide a concrete, visual representation of abstract recursive concepts.
          </li>
          <li>
            Clearly show nesting levels through indentation.
          </li>
          <li>
            Illustrate how the same structural patterns repeat within the data.
          </li>
          <li>
            Allow students to experiment by pasting different JSON structures
            and immediately seeing how the visualization changes.
          </li>
          <li>
            Bridge the gap between the raw text format and the in-memory
            object/array representation used in programming.
          </li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          Instructors can use formatters to demonstrate:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
           <li>How objects and arrays contain other values, including other objects/arrays.</li>
           <li>The concept of base cases (primitives) at the "leaves" of the JSON tree.</li>
           <li>How paths in the JSON structure (e.g., `user.settings.darkMode`) correspond to traversing down branches in the visual tree/indentation.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold mb-4 flex items-center">
           <Boxes className="mr-2 text-red-600 dark:text-red-400" size={28} />
           Conclusion
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          While recursive data structures like trees and graphs are often taught with
          abstract diagrams or linked list examples, JSON formatters offer a highly
          accessible and practical way to see recursion in action. By visually
          structuring nested JSON, these tools demonstrate the core principle of
          a complex structure being composed of smaller, similar structures.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Understanding how a JSON formatter works under the hood – through
          recursive rendering logic that mirrors the data's recursive definition –
          provides valuable insight. Next time you use a JSON formatter, look
          beyond just pretty-printing; see it as a dynamic diagram illustrating one
          of the most fundamental concepts in computer science: recursion.
        </p>
      </section>
    </div>
  );
}