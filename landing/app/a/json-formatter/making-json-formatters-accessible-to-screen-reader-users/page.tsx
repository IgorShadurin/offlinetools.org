import type { Metadata } from "next";
import { Accessibility, EyeOff, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Making JSON Formatters Accessible to Screen Reader Users | Offline Tools",
  description:
    "Learn how to create JSON formatters that are understandable and navigable for screen reader users by leveraging semantic HTML and ARIA.",
};

export default function AccessibleJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Accessibility className="mr-3" size={32} />
        Making JSON Formatters Accessible to Screen Reader Users
      </h1>

      <div className="space-y-6">
        <p>
          JSON is a ubiquitous data format, commonly used for data interchange in web applications. Developers often use
          JSON formatters or viewers to display, explore, and debug JSON structures, especially when dealing with
          complex or deeply nested data. However, the visual formatting that makes JSON readable for sighted users—like
          indentation, color-coding, and the placement of brackets, braces, and commas—poses significant challenges for
          users relying on screen readers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <EyeOff className="mr-2" size={24} />
          The Problem with Visual Formatting
        </h2>
        <p>
          Screen readers interpret web pages linearly, reading out the text content and semantic structure. Standard
          JSON formatting relies heavily on visual cues:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Indentation:</strong> Visually indicates nesting depth but is often ignored or flattened by screen
            readers.
          </li>
          <li>
            <strong>
              Symbols (<code>&#x7b;</code>, <code>&#x7d;</code>, <code>&lbrack;</code>, <code>&rbrack;</code>,{" "}
              <code>:</code>, <code>,</code>):
            </strong>{" "}
            While read out, they provide little context. A screen reader might read &quot;open brace key colon value
            comma&quot; without conveying the hierarchical relationship.
          </li>
          <li>
            <strong>Color-coding:</strong> Helpful for differentiating strings, numbers, keys, etc., but inaccessible to
            users who cannot perceive color or whose screen reader doesn&apos;t announce styling changes.
          </li>
          <li>
            <strong>Collapsible Sections:</strong> Often implemented using buttons or icons without clear semantic
            grouping, making it hard for screen reader users to know what content belongs to a collapsed section.
          </li>
        </ul>
        <p>
          When a screen reader encounters typical formatted JSON presented as plain text within a{" "}
          <code>&lt;pre&gt;</code> or <code>&lt;code&gt;</code> tag, it might read it line by line, or even character by
          character, resulting in a confusing jumble of symbols and values without a clear understanding of the data
          structure (objects, arrays, key-value pairs, nesting).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} />
          Strategies for Accessible JSON Display
        </h2>
        <p>
          To make JSON formatters accessible, we need to translate the visual structure into semantic structure that
          screen readers can understand and navigate. This primarily involves using appropriate HTML elements and ARIA
          attributes judiciously.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Leverage Semantic HTML Structures</h3>
        <p>
          The most powerful approach is to represent JSON structures using native HTML elements designed for lists and
          descriptions.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Objects:</strong> A JSON object (<code>&#x7b; &#x7d;</code>) is a collection of key-value pairs. The
            HTML <code>&lt;dl&gt;</code> (description list) is semantically perfect for this. Each key can be a{" "}
            <code>&lt;dt&gt;</code> (description term), and its corresponding value can be a <code>&lt;dd&gt;</code>{" "}
            (description description).
          </li>
          <li>
            <strong>Arrays:</strong> A JSON array (<code>&lbrack; &rbrack;</code>) is an ordered list of values. HTML{" "}
            <code>&lt;ul&gt;</code> (unordered list) or <code>&lt;ol&gt;</code> (ordered list) are suitable. Each array
            element becomes an <code>&lt;li&gt;</code> (list item).
          </li>
          <li>
            <strong>Nesting:</strong> HTML lists and description lists can be nested within <code>&lt;dd&gt;</code> or{" "}
            <code>&lt;li&gt;</code> elements, directly mirroring the nesting in JSON.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          Example: JSON Object with <code>&lt;dl&gt;</code>
        </h3>
        <p>Consider this simple JSON object:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "isStudent": true
}`}
          </pre>
        </div>
        <p>An accessible HTML representation using a description list:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`&lt;dl&gt;
  &lt;dt&gt;name&lt;/dt&gt;
  &lt;dd&gt;"Alice"&lt;/dd&gt;

  &lt;dt&gt;age&lt;/dt&gt;
  &lt;dd&gt;30&lt;/dd&gt;

  &lt;dt&gt;isStudent&lt;/dt&gt;
  &lt;dd&gt;true&lt;/dd&gt;
&lt;/dl&gt;`}
          </pre>
        </div>
        <p>
          A screen reader can announce this structure semantically, allowing users to navigate between terms (keys) and
          their descriptions (values).
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Example: JSON Array with <code>&lt;ul&gt;</code>
        </h3>
        <p>A simple JSON array:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`[
  "Apple",
  "Banana",
  "Cherry"
]`}
          </pre>
        </div>
        <p>Accessible HTML using an unordered list:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`&lt;ul&gt;
  &lt;li&gt;"Apple"&lt;/li&gt;
  &lt;li&gt;"Banana"&lt;/li&gt;
  &lt;li&gt;"Cherry"&lt;/li&gt;
&lt;/ul&gt;`}
          </pre>
        </div>
        <p>
          Screen readers will announce this as a list with a specific number of items, allowing navigation item by item.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Nested Structures</h3>
        <p>Combining objects and arrays:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`{
  "items": [
    { "id": 1, "name": "Laptop" },
    { "id": 2, "name": "Keyboard" }
  ]
}`}
          </pre>
        </div>
        <p>Accessible HTML using nested lists and description lists:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`&lt;dl&gt;
  &lt;dt&gt;items&lt;/dt&gt;
  &lt;dd&gt;
    &lt;ul&gt;
      &lt;li&gt;
        &lt;dl&gt;
          &lt;dt&gt;id&lt;/dt&gt;
          &lt;dd&gt;1&lt;/dd&gt;
          &lt;dt&gt;name&lt;/dt&gt;
          &lt;dd&gt;"Laptop"&lt;/dd&gt;
        &lt;/dl&gt;
      &lt;/li&gt;
      &lt;li&gt;
        &lt;dl&gt;
          &lt;dt&gt;id&lt;/dt&gt;
          &lt;dd&gt;2&lt;/dd&gt;
          &lt;dt&gt;name&lt;/dt&gt;
          &lt;dd&gt;"Keyboard"&lt;/dd&gt;
        &lt;/dl&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/dd&gt;
&lt;/dl&gt;`}
          </pre>
        </div>
        <p>
          Screen readers understand the nested nature of these lists, allowing users to navigate into and out of the
          object and array structures.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Enhance with ARIA and Visual Aids for Screen Readers</h3>
        <p>
          While semantic HTML is key, sometimes explicit labeling is needed for clarity, especially with complex nesting
          or different data types.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Identifying Types:</strong> You can use visually hidden text (e.g., using an{" "}
            <code>&lt;span class=&quot;sr-only&quot;&gt;</code>) to announce the type of value or structure. For
            example, before a string value, you could include{" "}
            <code>&lt;span class=&quot;sr-only&quot;&gt;String:&lt;/span&gt;</code>. Before a nested object within an
            array item, you could add <code>&lt;span class=&quot;sr-only&quot;&gt;Object item:&lt;/span&gt;</code>.
          </li>
          <li>
            <strong>Labeling Structures:</strong> Use <code>aria-label</code> on the container elements (
            <code>&lt;dl&gt;</code>, <code>&lt;ul&gt;</code>) to give them descriptive names, e.g.,{" "}
            <code>&lt;dl aria-label=&quot;User Details Object&quot;&gt;</code>. This is particularly helpful if there
            are multiple JSON structures on a page.
          </li>
          <li>
            <strong>Roles:</strong> While native HTML elements have implicit roles, explicitly adding roles like{" "}
            <code>role=&quot;group&quot;</code> to object containers or <code>role=&quot;listitem&quot;</code> to array
            items can sometimes reinforce the structure for certain screen reader/browser combinations, but always
            prioritize native semantics first.
          </li>
          <li>
            <strong>Collapsible Sections:</strong> If implementing collapsible sections for large objects/arrays, use
            standard accordion or disclosure patterns with <code>&lt;button&gt;</code> elements,{" "}
            <code>aria-expanded</code>, and <code>aria-controls</code> to manage the visibility and announce the state
            (expanded/collapsed) to screen readers.
          </li>
        </ul>
        <p>
          Example using <code>sr-only</code> spans:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`&lt;dl aria-label="Contact Information"&gt;
  &lt;dt&gt;
    &lt;span class="sr-only"&gt;Key:&lt;/span&gt;
    email
  &lt;/dt&gt;
  &lt;dd&gt;
    &lt;span class="sr-only"&gt;Value (String):&lt;/span&gt;
    "user@example.com"
  &lt;/dd&gt;

  &lt;dt&gt;
     &lt;span class="sr-only"&gt;Key:&lt;/span&gt;
    phoneNumbers
  &lt;/dt&gt;
  &lt;dd&gt;
    &lt;span class="sr-only"&gt;Value (Array):&lt;/span&gt;
    &lt;ul&gt;
      &lt;li&gt;
        &lt;span class="sr-only"&gt;Item (String):&lt;/span&gt;
        "123-456-7890"
      &lt;/li&gt;
      &lt;li&gt;
        &lt;span class="sr-only"&gt;Item (String):&lt;/span&gt;
        "987-654-3210"
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/dd&gt;
&lt;/dl&gt;

&lt;style&gt;
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
&lt;/style&gt;
`}
          </pre>
        </div>
        <p>
          The <code>sr-only</code> class hides the span content visually but makes it available to screen readers,
          providing valuable context about the data structure and types.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Offer Alternative Formats</h3>
        <p>
          For very large or deeply nested JSON, even a well-structured HTML view can be overwhelming. Consider providing
          options for users to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Download the raw JSON file.</li>
          <li>View a simplified text representation (if applicable to the data).</li>
          <li>Switch to a table view if the data is an array of objects with consistent keys.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          4. Keyboard Navigation and Focus Management (for interactive formatters)
        </h3>
        <p>
          While this page is static, a truly useful JSON formatter is often interactive (e.g., collapsible nodes). For
          interactive formatters, ensuring full keyboard navigability is crucial. Users should be able to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Tab through interactive elements like collapse/expand buttons.</li>
          <li>Use arrow keys to navigate within the tree/list structure (if complex).</li>
          <li>Understand where their focus is at all times (clear focus indicators).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Making JSON formatters accessible is essential for ensuring that developers and users who rely on screen
          readers can effectively work with structured data. By moving beyond purely visual presentation and leveraging
          the power of semantic HTML elements like <code>&lt;dl&gt;</code> and <code>&lt;ul&gt;</code>, supplemented
          with ARIA attributes and visually hidden text for clarity, we can build formatters that are not only powerful
          but also inclusive. Always test your implementations with actual screen readers (like NVDA, JAWS, or
          VoiceOver) to understand the user experience firsthand.
        </p>
      </div>
    </>
  );
}
