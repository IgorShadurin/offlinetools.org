import type { Metadata } from "next";
import {
  Boxes,
  Folder,
  List,
  Tag,
  Code,
  Text,
  Calculator,
  ToggleLeft,
  ToggleRight,
  Minus,
  ArrowRight,
  FolderTree,
  BookOpenText,
  Puzzle,
  Lightbulb,
  Atom,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Analogies & Metaphors for Explaining JSON Structure",
  description:
    "Learn JSON structure using simple, relatable analogies and metaphors for developers of all levels.",
};

export default function JsonAnalogiesMetaphorsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Lightbulb className="w-8 h-8 text-yellow-500" />
        <span>Analogies and Metaphors for Explaining JSON Structure</span>
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format. It's easy for humans to read and write and easy for machines to parse and generate. But if you're new to it, the curly braces, square brackets, colons, and commas can look like a confusing jumble.
        </p>
        <p>
          Analogies and metaphors can be incredibly helpful tools to understand the structure of JSON by relating it to familiar real-world concepts. Let's break it down using some common examples.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Boxes className="w-6 h-6 text-blue-500" />
          <span>The Big Picture: A Container or Box</span>
        </h2>
        <p>
          Think of a JSON document (or string) as a container holding some kind of structured information. This container can hold either a single item (like a number or text) or a collection of items in one of two main ways: as an <strong>object</strong> or an <strong>array</strong>.
        </p>
        <p className="flex items-center space-x-2">
          <Code className="w-5 h-5" /> A JSON document always starts with either an object <code>&#x7b;...&#x7d;</code> or an array <code>[&#x20;...&#x20;]</code> (or a simple value, though collections are more common for complex data).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Folder className="w-6 h-6 text-green-500" />
          <span>JSON Objects: Labeled Compartments or Folders</span>
        </h2>
        <p>
          A JSON Object is like a physical box with several labeled compartments inside, or perhaps like a file folder containing several labeled documents. It starts with <code>&#x7b;</code> and ends with <code>&#x7d;</code>.
        </p>
        <p>
          Inside the object, information is stored as <strong>key-value pairs</strong>. Think of a key as the label on a compartment or file tab, and the value as what's inside that compartment or on that document.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-center space-x-2">
            <Tag className="w-5 h-5" /> The <strong>key</strong> is always a string (like text in quotes). This is the label.
          </li>
          <li className="flex items-center space-x-2">
            <ArrowRight className="w-5 h-5" /> A colon <code>:</code> separates the key from its value, like the arrow showing the label points to the content.
          </li>
          <li className="flex items-center space-x-2">
            <Puzzle className="w-5 h-5" /> The <strong>value</strong> can be any valid JSON data type (a string, number, boolean, null, another object, or an array). This is the content.
          </li>
          <li>
            Each key-value pair is separated by a comma <code>,</code>, like separate items in the box or separate files in the folder.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center space-x-2"><Code className="w-5 h-5" /> Object Analogy Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`{
  "name": "Alice",      // <Tag>name</Tag><ArrowRight/> "Alice" <Text/>
  "age": 30,          // <Tag>age</Tag><ArrowRight/> 30 <Calculator/>
  "isStudent": false  // <Tag>isStudent</Tag><ArrowRight/> false <ToggleLeft/>
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This object is a "Person" container with three labeled compartments: "name", "age", and "isStudent".
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <List className="w-6 h-6 text-purple-500" />
          <span>JSON Arrays: Ordered Lists or Train Cars</span>
        </h2>
        <p>
          A JSON Array is like a shopping list, a sequence of items in a specific order, or perhaps a train with multiple cars lined up. It starts with <code>[</code> and ends with <code>]</code>.
        </p>
        <p>
          Inside an array, items are stored as a simple sequence of values.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-center space-x-2">
            <Puzzle className="w-5 h-5" /> Each <strong>value</strong> in the list can be any valid JSON data type (a string, number, boolean, null, an object, or another array). These are the individual items or train cars.
          </li>
          <li>
            Items are separated by a comma <code>,</code>.
          </li>
          <li>
            The order of items matters in an array, just like the order on a list or the sequence of train cars.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center space-x-2"><Code className="w-5 h-5" /> Array Analogy Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`[
  "Apple",      // <Text/> "Apple"
  "Banana",     // <Text/> "Banana"
  "Cherry"      // <Text/> "Cherry"
]`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This array is a "Fruits" list containing three items in order.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Puzzle className="w-6 h-6 text-red-500" />
          <span>JSON Values: The Actual Items</span>
        </h2>
        <p>
          Values are the actual data stored inside objects (associated with a key) or arrays (as elements). JSON has a specific set of allowed data types for values:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-center space-x-2"><Text className="w-5 h-5" /> <strong>Strings:</strong> Text enclosed in double quotes (<code>"hello"</code>). Like a written note.</li>
          <li className="flex items-center space-x-2"><Calculator className="w-5 h-5" /> <strong>Numbers:</strong> Integers or floating-point numbers (<code>123</code>, <code>-4.5</code>, <code>2.7e5</code>). Like countable items or measurements.</li>
          <li className="flex items-center space-x-2"><ToggleLeft className="w-5 h-5" /> / <ToggleRight className="w-5 h-5" /> <strong>Booleans:</strong> Either <code>true</code> or <code>false</code>. Like a simple on/off switch or a yes/no answer.</li>
          <li className="flex items-center space-x-2"><Minus className="w-5 h-5" /> <strong>Null:</strong> Represents an empty or non-existent value (<code>null</code>). Like an empty slot or a missing item.</li>
          <li className="flex items-center space-x-2"><Folder className="w-5 h-5" /> <strong>Objects:</strong> Another set of labeled compartments <code>&#x7b;...&#x7d;</code>. A box inside a box.</li>
          <li className="flex items-center space-x-2"><List className="w-5 h-5" /> <strong>Arrays:</strong> Another ordered list <code>[&#x20;...&#x20;]</code>. A list within a list, or a box containing a list.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <FolderTree className="w-6 h-6 text-orange-500" />
          <span>Nesting: Containers within Containers</span>
        </h2>
        <p>
          One of the powerful aspects of JSON is that objects and arrays can contain other objects and arrays. This allows you to build complex, hierarchical structures.
        </p>
        <p>
          Think of it like nested boxes or folders within folders:
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li className="flex items-center space-x-2"><Folder className="w-5 h-5" /> A "person" object might have a key "address" whose value is another object <Folder className="w-5 h-5" />, with keys like "street", "city", "zip".</li>
            <li className="flex items-center space-x-2"><List className="w-5 h-5" /> An "order" object might have a key "items" whose value is an array <List className="w-5 h-5" /> of "product" objects <Folder className="w-5 h-5" />.</li>
          </ul>
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2 flex items-center space-x-2"><Code className="w-5 h-5" /> Nested Structure Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap">
              {`{              // <Folder/> Outer Object (Person)
  "name": "Bob",
  "address": {     // <Folder/> Nested Object (Address)
    "street": "123 Main St",
    "city": "Anytown"
  },
  "hobbies": [     // <List/> Nested Array (Hobbies)
    "reading",   // <Text/> String in array
    "hiking",    // <Text/> String in array
    "coding"     // <Text/> String in array
  ],
  "isActive": true // <ToggleRight/> Boolean value
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Here, the "Person" object contains an "Address" object and a "Hobbies" array.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <BookOpenText className="w-6 h-6 text-cyan-500" />
          <span>Recap of the Building Blocks</span>
        </h2>
        <p>
          To summarize, think of JSON structure using these simple concepts:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-center space-x-2"><Boxes className="w-5 h-5" /> <strong>Container:</strong> The whole JSON document.</li>
          <li className="flex items-center space-x-2"><Folder className="w-5 h-5" /> <strong>Object:</strong> A collection of labeled compartments (key-value pairs) - <code>&#x7b; &#x7d;</code>.</li>
          <li className="flex items-center space-x-2"><List className="w-5 h-5" /> <strong>Array:</strong> An ordered list of items - <code>[ &#x20;]</code>.</li>
          <li className="flex items-center space-x-2"><Tag className="w-5 h-5" /> <ArrowRight className="w-5 h-5" /> <Puzzle className="w-5 h-5" /> <strong>Key-Value Pair:</strong> A label pointing to content (inside objects).</li>
          <li className="flex items-center space-x-2"><Puzzle className="w-5 h-5" /> <strong>Value:</strong> The actual data (string, number, boolean, null, object, array).</li>
          <li className="flex items-center space-x-2"><FolderTree className="w-5 h-5" /> <strong>Nesting:</strong> Putting containers inside other containers.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center space-x-2">
          <Atom className="w-6 h-6 text-teal-500" />
          <span>Why These Analogies Help</span>
        </h2>
        <p>
          Using these metaphors makes JSON less abstract:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Understanding objects as labeled boxes helps you grasp that you access data by its label (the key).</li>
          <li>Seeing arrays as ordered lists clarifies why you access data by its position (index) and why order is preserved.</li>
          <li>Recognizing that values can be other containers explains how deeply nested data works.</li>
        </ul>

        <p>
          By relating JSON's syntax to familiar physical or conceptual structures, you can build an intuitive understanding that makes reading, writing, and working with JSON much easier, whether you're just starting out or dealing with complex data structures.
        </p>
      </div>
    </>
  );
}