import type { Metadata } from "next";
import {
  Accessibility,
  Eye,
  BookOpenText,
  Code,
  List,
  Box,
  Folder,
  Check,
  Info,
  Speech,
  TriangleAlert,
} from "lucide-react"; // Using allowed icons

export const metadata: Metadata = {
  title: "Reading Order Optimization for Screen Readers in JSON Views | Accessibility",
  description:
    "Learn how to optimize the reading order and structure of JSON data displays for users relying on screen readers, using semantic HTML and ARIA attributes.",
};

export default function JsonReadingOrderArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Accessibility className="w-8 h-8 text-blue-500" />
        <span>Reading Order Optimization for Screen Readers in JSON Views</span>
      </h1>

      <div className="space-y-6">
        <p>
          Displaying raw or processed JSON data in a user interface is a common task. While visually
          appealing formatting with indentation and syntax highlighting helps sighted users, it often
          creates significant barriers for users who rely on screen readers. Screen readers interpret
          web pages based on the underlying HTML structure and its semantic meaning, not its visual
          layout. A poorly structured JSON view can result in a confusing, illogical, or
          non-navigable experience.
        </p>
        <p>
          This article explores the challenges screen readers face with typical JSON representations
          and provides strategies using semantic HTML and ARIA attributes to improve the reading order
          and overall accessibility of JSON data displays.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Eye className="w-6 h-6 text-green-500" />
          <span>The Problem with Visual JSON Views</span>
        </h2>
        <p>
          Consider a typical visually formatted JSON object:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            <code className="language-json">
              &#x7b;<br />
              &nbsp; "name": "Alice",<br />
              &nbsp; "age": 30,<br />
              &nbsp; "isStudent": false,<br />
              &nbsp; "address": &#x7b;<br />
              &nbsp; &nbsp; "street": "123 Main St",<br />
              &nbsp; &nbsp; "city": "Anytown"<br />
              &nbsp; &#x7d;,<br />
              &nbsp; "courses": ["Math", "Science", "History"]<br />
              &#x7d;
            </code>
          </pre>
        </div>
        <p>
          Sighted users quickly understand the structure through indentation, brackets (`&#x7b;&#x7d;`,
          `[]`), and commas. A screen reader, however, reads the underlying HTML. If this is merely
          rendered as a flat sequence of `&lt;span&gt;` or `&lt;div&gt;` elements with styles for
          indentation and color, a screen reader might read:
        </p>
        <blockquote className="italic border-l-4 border-gray-300 pl-4 py-2 dark:border-gray-600">
          "Open brace name colon Alice comma age colon 30 comma isStudent colon false comma address
          open brace street colon 123 Main St comma city colon Anytown close brace comma courses
          open bracket Math comma Science comma History close bracket close brace."
        </blockquote>
        <p>
          This linear reading can be extremely difficult to parse mentally, especially for complex or
          deeply nested JSON. Users lose the hierarchical context and the relationship between keys
          and values.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookOpenText className="w-6 h-6 text-indigo-500" />
          <span>Understanding Screen Reader Reading Order</span>
        </h2>
        <p>
          Screen readers typically navigate a web page in DOM order (the order elements appear in the HTML).
          They process elements like headings, paragraphs, lists, and form controls, often allowing users
          to jump between these element types. Semantic HTML elements convey meaning and structure
          (e.g., `&lt;ul&gt;` is a list, `&lt;h2&gt;` is a subheading, `&lt;button&gt;` is interactive).
        </p>
        <p>
          To optimize a JSON view, we need to translate its visual structure into a semantic structure
          that screen readers can understand and navigate effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <TriangleAlert className="w-6 h-6 text-yellow-500" />
          <span>Common Accessibility Issues in JSON Views</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Lack of Hierarchy:</strong> Visual indentation is ignored, flattening the structure.
          </li>
          <li>
            <strong>Meaningless Punctuation:</strong> Braces, brackets, and commas are read literally
            without conveying their structural role (object start/end, array item separation).
          </li>
          <li>
            <strong>Key-Value Association:</strong> It can be hard to tell which value belongs to which key,
            especially in long lists or nested objects.
          </li>
          <li>
            <strong>Data Type Ambiguity:</strong> Screen readers don't inherently announce the type of a value
            (string, number, boolean, null, array, object) unless explicitly marked.
          </li>
          <li>
            <strong>Unnecessary Noise:</strong> Decorative characters or excess formatting read out loud.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Check className="w-6 h-6 text-green-500" />
          <span>Optimization Strategies using Semantic HTML and ARIA</span>
        </h2>
        <p>
          The goal is to use HTML elements that carry semantic meaning appropriate for the JSON structure,
          and supplement them with ARIA attributes where native semantics are insufficient.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code className="w-5 h-5 text-gray-500" />
          <span>Objects (`&#x7b;&#x7d;`)</span>
        </h3>
        <p>
          JSON objects are collections of key-value pairs. The HTML Description List (`&lt;dl&gt;`)
          is the most semantically appropriate element for this structure.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use `&lt;dl&gt;` for the object wrapper.</li>
          <li>Use `&lt;dt&gt;` for each key (Definition Term).</li>
          <li>Use `&lt;dd&gt;` for each value (Definition Description).</li>
        </ul>
        <p>
          Example (using the previous JSON):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Accessible Object Rendering with `&lt;dl&gt;`</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;dl className="json-object"&gt;
  &lt;dt&gt;name&lt;/dt&gt;
  &lt;dd&gt;"Alice"&lt;/dd&gt;

  &lt;dt&gt;age&lt;/dt&gt;
  &lt;dd&gt;30&lt;/dd&gt;

  &lt;dt&gt;isStudent&lt;/dt&gt;
  &lt;dd&gt;false&lt;/dd&gt;

  &lt;dt&gt;address&lt;/dt&gt;
  &lt;dd&gt;
    {/* Nested Object: Use another DL */}
    &lt;dl className="json-object"&gt;
      &lt;dt&gt;street&lt;/dt&gt;
      &lt;dd&gt;"123 Main St"&lt;/dd&gt;
      &lt;dt&gt;city&lt;/dt&gt;
      &lt;dd&gt;"Anytown"&lt;/dd&gt;
    &lt;/dl&gt;
  &lt;/dd&gt;

  &lt;dt&gt;courses&lt;/dt&gt;
  &lt;dd&gt;
    {/* Nested Array: Use UL */}
    &lt;ul className="json-array"&gt;
      &lt;li&gt;"Math"&lt;/li&gt;
      &lt;li&gt;"Science"&lt;/li&gt;
      &lt;li&gt;"History"&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/dd&gt;
&lt;/dl&gt;`}
            </pre>
          </div>
        </div>
        <p>
          A screen reader encountering this structure will announce "Description list" or similar, then
          read "name", followed by "definition, Alice". It provides clear key-value pairing. Nested
          objects and arrays maintain their structure by using nested `&lt;dl&gt;` and `&lt;ul&gt;`.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <List className="w-5 h-5 text-gray-500" />
          <span>Arrays (`[]`)</span>
        </h3>
        <p>
          JSON arrays are ordered lists of values. The HTML Unordered List (`&lt;ul&gt;`) is the
          semantic choice here.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use `&lt;ul&gt;` for the array wrapper.</li>
          <li>Use `&lt;li&gt;` for each item in the array.</li>
        </ul>
        <p>
          Example:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Accessible Array Rendering with `&lt;ul&gt;`</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;ul className="json-array"&gt;
  &lt;li&gt;"Math"&lt;/li&gt;
  &lt;li&gt;"Science"&lt;/li&gt;
  &lt;li&gt;"History"&lt;/li&gt;
  {/* Arrays can contain objects/arrays too */}
  &lt;li&gt;
    &lt;dl className="json-object"&gt;
      &lt;dt&gt;level&lt;/dt&gt;
      &lt;dd&gt;"advanced"&lt;/dd&gt;
    &lt;/dl&gt;
  &lt;/li&gt;
&lt;/ul&gt;`}
            </pre>
          </div>
        </div>
        <p>
          A screen reader will announce "List with 3 items" (or similar), and then read each item.
          This allows users to understand it's a collection and navigate item by item.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Info className="w-5 h-5 text-gray-500" />
          <span>Adding Context with ARIA</span>
        </h3>
        <p>
          While `&lt;dl&gt;` and `&lt;ul&gt;` provide good structural semantics, additional context can
          be helpful.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>`aria-label` / `aria-labelledby`:</strong> Use on containers (`&lt;dl&gt;`, `&lt;ul&gt;`)
            to give a meaningful label if the context isn't clear from the surroundings (e.g., `aria-label="User Details Object"`).
            You could also label the object/array using the key name from the parent object if applicable.
          </li>
          <li>
            <strong>`role="group"`:</strong> Sometimes, you might wrap related elements (like a complex
            value or a nested structure not perfectly fitting `dl`/`ul`) in a `&lt;div role="group" aria-label="..."&gt;`
            to explicitly group them for screen readers. However, prefer native semantic elements first.
          </li>
          <li>
            <strong>Value Type Announcement:</strong> For clarity, you might structure the `&lt;dd&gt;` or `&lt;li&gt;`
            to explicitly state the type, although this can become verbose. E.g., `&lt;dd&gt;&lt;span className="sr-only"&gt;string&lt;/span&gt;"Alice"&lt;/dd&gt;`.
            A less verbose approach is often sufficient if the context is clear.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Folder className="w-5 h-5 text-gray-500" />
          <span>Collapsible Sections (Objects/Arrays)</span>
        </h3>
        <p>
          For very large or deeply nested JSON, allowing users to collapse sections improves navigation
          and reduces cognitive load. Use standard disclosure pattern semantics.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Wrap the object or array `&lt;dl&gt;` or `&lt;ul&gt;` in a container.</li>
          <li>Provide a button or interactive element to toggle visibility.</li>
          <li>The interactive element should have `aria-expanded="true"` or `aria-expanded="false"`.</li>
          <li>The collapsible content container should have an `id`.</li>
          <li>The interactive element should have `aria-controls="[id_of_content]"`.</li>
          <li>Manage the visibility of the content (e.g., using CSS `display: none` or `visibility: hidden`).</li>
        </ul>
        <p>
          Example structure (simplified):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Collapsible Object/Array Structure</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div&gt; {/* Container */}
  &lt;button aria-expanded="true" aria-controls="details-content"&gt;
    {/* Key name or label for the object/array */}
    address: &#x7b;...&#x7d; {/* Visual representation */}
  &lt;/button&gt;
  &lt;div id="details-content"&gt; {/* Collapsible content */}
    &lt;dl className="json-object"&gt;
      &lt;dt&gt;street&lt;/dt&gt;
      &lt;dd&gt;"123 Main St"&lt;/dd&gt;
      &lt;!-- ... other key-value pairs ... --&gt;
    &lt;/dl&gt;
  &lt;/div&gt;
&lt;/div&gt;`}
            </pre>
          </div>
        </div>
        <p>
          Screen readers will announce the button's label and its expanded/collapsed state, allowing
          users to navigate the structure at a high level before diving into the details.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Speech className="w-5 h-5 text-gray-500" />
          <span>Handling Primitive Types (string, number, boolean, null)</span>
        </h3>
        <p>
          These are the values within `&lt;dd&gt;` or `&lt;li&gt;` elements.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Strings:</strong> Display the string value. Ensure quotes are either removed visually/audibly
            or semantically marked if they are part of the actual data. Often, just the string content is best.
          </li>
          <li>
            <strong>Numbers:</strong> Display the number.
          </li>
          <li>
            <strong>Booleans:</strong> Display "true" or "false". Ensure they are readable as boolean values.
          </li>
          <li>
            <strong>Null:</strong> Display "null".
          </li>
        </ul>
        <p>
          Avoid displaying JSON syntax characters (`"`, `:`, `,`) unless they are part of the data itself.
          The semantic HTML structure (`&lt;dt&gt;`, `&lt;dd&gt;`, `&lt;li&gt;`) provides the necessary context.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Box className="w-5 h-5 text-gray-500" />
          <span>Hiding Decorative Elements</span>
        </h3>
        <p>
          Visual elements used purely for structure or decoration (like the literal `{}` or `[]` if not part of the
          navigable structure, or connecting lines in a tree view) should be hidden from screen readers using
          `aria-hidden="true"`.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;span aria-hidden="true"&gt;&#x7b;&lt;/span&gt; {/* Hide decorative brace */}
&lt;dl&gt;
  &lt;dt&gt;key&lt;/dt&gt;&lt;span aria-hidden="true"&gt;:&lt;/span&gt; {/* Hide decorative colon */}
  &lt;dd&gt;value&lt;/dd&gt;
&lt;/dl&gt;
&lt;span aria-hidden="true"&gt;&#x7d;&lt;/span&gt; {/* Hide decorative brace */}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-purple-500" />
          <span>A More Complete TSX Example Structure</span>
        </h2>
        <p>
          Putting it together, a recursive component structure could render JSON accessibly.
          Below is a conceptual outline (actual implementation would handle rendering different types recursively).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Conceptual Recursive JSON Renderer Structure (TSX)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assumes 'data' is your parsed JSON object/array
// Assumes 'key' is the key name if rendering a value within an object
// Assumes 'label' is a descriptive label if needed for a container (e.g., "Root JSON Object")

function renderJsonValue(value: any, key?: string, label?: string): JSX.Element {
  if (value === null) {
    return &lt;span className="json-null"&gt;null&lt;/span&gt;;
  }

  switch (typeof value) {
    case 'string':
      return &lt;span className="json-string"&gt;"{value}"&lt;/span&gt;; // Or just {value} without quotes
    case 'number':
      return &lt;span className="json-number"&gt;{value}&lt;/span&gt;;
    case 'boolean':
      return &lt;span className="json-boolean"&gt;{value.toString()}&lt;/span&gt;;
    case 'object':
      if (Array.isArray(value)) {
        // Render Array
        return (
          &lt;ul className="json-array" aria-label={label || key ? \`\${key || ''} Array\` : undefined}&gt;
            {value.map((item, index) => (
              &lt;li key={index}&gt;
                {renderJsonValue(item)} {/* Recursively render array item */}
              &lt;/li&gt;
            ))}
          &lt;/ul&gt;
        );
      } else {
        // Render Object
        const objectKeys = Object.keys(value);
        return (
          &lt;dl className="json-object" aria-label={label || key ? \`\${key || ''} Object\` : undefined}&gt;
            {objectKeys.map(objKey => (
              &lt;React.Fragment key={objKey}&gt;
                &lt;dt className="json-key"&gt;{objKey}&lt;/dt&gt;
                &lt;dd className="json-value"&gt;
                  {renderJsonValue(value[objKey], objKey)} {/* Recursively render value */}
                &lt;/dd&gt;
              &lt;/React.Fragment&gt;
            ))}
          &lt;/dl&gt;
        );
      }
    default:
      return &lt;span&gt;Unsupported Type&lt;/span&gt;; // Should not happen with valid JSON
  }
}

// In your page component's render function:
// Assume 'jsonData' is the JSON object you want to display
// &lt;div&gt;
//   &lt;h3&gt;JSON Data View&lt;/h3&gt;
//   {renderJsonValue(jsonData, undefined, "Root JSON Data")}
// &lt;/div&gt;
`}
            </pre>
          </div>
        </div>
        <p>
          This recursive approach naturally builds the nested `&lt;dl&gt;` and `&lt;ul&gt;` structure
          that aligns with screen reader expectations, providing a logical reading order and clear
          relationship between keys and values. Adding `aria-label` to the containers gives context
          at each level of nesting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Info className="w-6 h-6 text-cyan-500" />
          <span>Additional Considerations</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Keyboard Navigation:</strong> Ensure that if sections are collapsible, they are
            navigable and controllable via keyboard (Tab, Enter, Space).
          </li>
          <li>
            <strong>Focus Management:</strong> When expanding/collapsing, consider where focus should move,
            especially in complex views.
          </li>
          <li>
            <strong>Alternative Views:</strong> For very large or deeply complex JSON, consider providing
            alternative views like a searchable flat list of paths/values or a dedicated tree-view component
            with robust accessibility features.
          </li>
          <li>
            <strong>Consistent Styling:</strong> Use CSS to style the `&lt;dl&gt;`, `&lt;dt&gt;`, `&lt;dd&gt;`,
            `&lt;ul&gt;`, and `&lt;li&gt;` elements to match your application's visual design. You can
            visually hide the list markers or indentation if desired, as long as the semantic structure remains.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookOpenText className="w-6 h-6 text-teal-500" />
          <span>Conclusion</span>
        </h2>
        <p>
          Simply displaying JSON text with visual formatting is insufficient for users who rely on screen
          readers. By translating the JSON structure into appropriate semantic HTML elements (`&lt;dl&gt;` for objects,
          `&lt;ul&gt;` for arrays) and augmenting with ARIA attributes like `aria-label` and `aria-expanded`,
          developers can create JSON views that are not only visually understandable but also logically
          structured and easily navigable by assistive technologies. Prioritizing semantic structure ensures
          that the intended reading order and relationships within the data are clearly communicated to all users.
        </p>
      </div>
    </>
  );
}
