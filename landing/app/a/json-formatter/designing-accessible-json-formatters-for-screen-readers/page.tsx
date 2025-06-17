import type { Metadata } from "next";
import { Accessibility, CodeXml, Eye, List, Table, Speaker, Info } from "lucide-react"; // Replaced Details with Info

export const metadata: Metadata = {
  title: "Designing Accessible JSON Formatters for Screen Readers | Offline Tools",
  description:
    "Learn how to format and present JSON data accessibly so screen readers and other assistive technologies can effectively convey the information.",
};

export default function AccessibleJsonFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Accessibility className="mr-3 text-blue-600" size={36} />
        Designing Accessible JSON Formatters for Screen Readers
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Developers often work with JSON data, displaying it for debugging, documentation, or even directly to
          end-users in specific contexts. However, simply dumping raw JSON text onto a page, even with syntax
          highlighting, poses significant challenges for users relying on screen readers and other assistive
          technologies. This article explores why raw JSON is inaccessible and provides strategies for formatting JSON
          data in a way that is structured, understandable, and navigable for everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Eye className="mr-2 text-blue-600" />
          Why is Raw JSON Inaccessible?
        </h2>
        <p>
          JSON's structure is designed for machines, not humans (or screen readers). When a screen reader encounters a
          block of raw JSON text, it typically reads characters, symbols, and words sequentially without understanding
          the data's hierarchical relationships.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Lack of Semantic Structure:</strong> JSON uses punctuation like <code>&#x7b;</code>,{" "}
            <code>&#x7d;</code>, <code>[</code>, <code>]</code>, <code>:</code>, and <code>,</code> to define structure.
            Screen readers read these symbols literally or ignore them, losing the meaning of "object start", "array
            element", "key-value separator", etc.
          </li>
          <li>
            <strong>Indentation Issues:</strong> While indentation helps sighted users visualize nested structures, it's
            often ignored by screen readers reading linear text.
          </li>
          <li>
            <strong>Verbosity:</strong> Reading every character and punctuation mark in a complex JSON structure is
            overwhelming and disorienting.
          </li>
          <li>
            <strong>Navigation Difficulties:</strong> Users cannot easily jump between keys, values, or nested
            objects/arrays.
          </li>
        </ul>
        <p>Consider a simple JSON object:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "city": "New York",
  "isStudent": false,
  "courses": ["History", "Physics"]
}`}
          </pre>
        </div>
        <p>
          A screen reader might read this as: "open brace quote name quote colon quote Alice quote comma quote age quote
          colon thirty comma quote city quote colon quote New York quote comma quote isStudent quote colon false comma
          quote courses quote colon open bracket quote History quote comma quote Physics quote close bracket close
          brace". This is incredibly difficult to parse mentally.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <List className="mr-2 text-blue-600" />
          Semantic HTML to the Rescue
        </h2>
        <p>
          The most effective way to make JSON data accessible is to transform it into standard, semantic HTML structures
          that screen readers understand naturally. Instead of representing the JSON structure literally, represent the
          *information* contained within the JSON using elements like lists, tables, and headings.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Objects as Definition Lists or Unordered Lists</h3>
        <p>
          A simple JSON object with key-value pairs maps well to HTML definition lists (<code>&lt;dl&gt;</code>,{" "}
          <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>) or even just key-value pairs within an unordered list (
          <code>&lt;ul&gt;</code>, <code>&lt;li&gt;</code>).
        </p>
        <p>Using a Definition List:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">HTML Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;dl&gt;
  &lt;dt&gt;name&lt;/dt&gt;
  &lt;dd&gt;Alice&lt;/dd&gt;

  &lt;dt&gt;age&lt;/dt&gt;
  &lt;dd&gt;30&lt;/dd&gt;

  &lt;dt&gt;city&lt;/dt&gt;
  &lt;dd&gt;New York&lt;/dd&gt;

  &lt;dt&gt;isStudent&lt;/dt&gt;
  &lt;dd&gt;false&lt;/dd&gt;
&lt;/dl&gt;`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Screen Reader Output (Example):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`"name, term. Alice, definition. age, term. 30, definition. city, term. New York, definition. isStudent, term. false, definition."`}
            </pre>
          </div>
        </div>
        <p>This is much clearer, explicitly stating the "term" (key) and "definition" (value).</p>

        <h3 className="text-xl font-semibold mt-6">Arrays as Unordered Lists</h3>
        <p>
          JSON arrays translate directly to HTML unordered lists (<code>&lt;ul&gt;</code>). Each item in the array
          becomes a list item (<code>&lt;li&gt;</code>).
        </p>
        <p>For the "courses" array from the example:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">HTML Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;ul&gt;
  &lt;li&gt;History&lt;/li&gt;
  &lt;li&gt;Physics&lt;/li&gt;
&lt;/ul&gt;`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Screen Reader Output (Example):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`"List with 2 items. History. Physics."`}</pre>
          </div>
        </div>
        <p>The list structure clearly indicates multiple items.</p>

        <h3 className="text-xl font-semibold mt-6">Handling Nested Structures</h3>
        <p>
          Nested JSON objects or arrays should become nested HTML lists or definition lists. This mirrors the hierarchy
          accessibly.
        </p>
        <p>Example JSON:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            {`{
  "user": {
    "id": 101,
    "address": {
      "street": "123 Main St",
      "zip": "90210"
    },
    "roles": ["admin", "editor"]
  }
}`}
          </pre>
        </div>
        <p>Accessible HTML Structure:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">HTML Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;dl&gt;
  &lt;dt&gt;user&lt;/dt&gt;
  &lt;dd&gt;
    &lt;dl&gt; {/* Nested DL for the user object */}
      &lt;dt&gt;id&lt;/dt&gt;
      &lt;dd&gt;101&lt;/dd&gt;

      &lt;dt&gt;address&lt;/dt&gt;
      &lt;dd&gt;
        &lt;dl&gt; {/* Nested DL for the address object */}
          &lt;dt&gt;street&lt;/dt&gt;
          &lt;dd&gt;123 Main St&lt;/dd&gt;
          &lt;dt&gt;zip&lt;/dt&gt;
          &lt;dd&gt;90210&lt;/dd&gt;
        &lt;/dl&gt;
      &lt;/dd&gt;

      &lt;dt&gt;roles&lt;/dt&gt;
      &lt;dd&gt;
        &lt;ul&gt; {/* Nested UL for the roles array */}
          &lt;li&gt;admin&lt;/li&gt;
          &lt;li&gt;editor&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/dd&gt;
    &lt;/dl&gt;
  &lt;/dd&gt;
&lt;/dl&gt;`}
            </pre>
          </div>
        </div>
        <p>
          Screen readers announce the nesting level of lists, allowing users to understand the hierarchy and navigate
          through it using list item shortcuts.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Info className="mr-2 text-blue-600" /> {/* Replaced Details with Info */}
          Collapsible Sections with &lt;details&gt; and &lt;summary&gt;
        </h3>
        <p>
          For large or deeply nested JSON, presenting everything at once can be overwhelming. The native HTML{" "}
          <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> elements are excellent for creating collapsible
          sections that are inherently accessible. The <code>&lt;summary&gt;</code> acts as a toggle, and screen readers
          announce its expanded/collapsed state.
        </p>
        <p>
          You can wrap objects or arrays in <code>&lt;details&gt;</code> tags:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">HTML Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;details&gt;
  &lt;summary&gt;User Information (Click to toggle)&lt;/summary&gt;
  &lt;dl&gt; {/* Content inside the collapsible section */}
    &lt;dt&gt;id&lt;/dt&gt;
    &lt;dd&gt;101&lt;/dd&gt;
    {/* ... other user details ... */}
  &lt;/dl&gt;
&lt;/details&gt;`}
            </pre>
          </div>
        </div>
        <p>This allows users to focus only on the sections they are interested in, reducing cognitive load.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Table className="mr-2 text-blue-600" />
          Using Tables for Arrays of Objects
        </h3>
        <p>
          If you have a JSON array where each element is an object with the same structure (e.g., an array of users), a
          simple HTML <code>&lt;table&gt;</code> can be an appropriate and accessible format. Use table headers (
          <code>&lt;th&gt;</code>) for the JSON keys and table data cells (<code>&lt;td&gt;</code>) for the values.
        </p>
        <p>Example JSON:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            {`[
  { "name": "Alice", "age": 30 },
  { "name": "Bob", "age": 25 }
]`}
          </pre>
        </div>
        <p>Accessible HTML Structure:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">HTML Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;table&gt;
  &lt;caption&gt;List of Users&lt;/caption&gt; {/* Important for table accessibility */}
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Name&lt;/th&gt;
      &lt;th scope="col"&gt;Age&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Alice&lt;/td&gt;
      &lt;td&gt;30&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Bob&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;`}
            </pre>
          </div>
        </div>
        <p>
          Ensure you use <code>&lt;caption&gt;</code> and <code>&lt;th scope="col"&gt;</code> or{" "}
          <code>scope="row"&gt;</code> for proper table accessibility, allowing screen readers to understand the
          relationship between headers and data cells.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Speaker className="mr-2 text-blue-600" />
          Additional Considerations for Screen Readers
        </h2>

        <h3 className="text-xl font-semibold mt-6">ARIA Attributes (Use Sparingly)</h3>
        <p>
          While semantic HTML should be your primary tool, ARIA attributes can sometimes enhance clarity where native
          HTML isn't quite sufficient.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>aria-label</code> or <code>aria-describedby</code>: Could be used on container elements if extra
            context is needed, but often good HTML structure is enough. For instance, you might label a{" "}
            <code>&lt;dl&gt;</code> for a specific object property if the <code>&lt;dt&gt;</code> alone isn't clear in
            context.
          </li>
          <li>
            <code>role="group"</code>: Can sometimes be used around logical groupings of data if standard list/DL
            structures don't apply neatly, but prefer native elements first.
          </li>
        </ul>
        <p>
          **Caution:** Do not try to recreate the raw JSON syntax visually and then add ARIA to describe punctuation.
          This is usually less effective than transforming the structure into semantic HTML. Prioritize readability and
          navigability of the *content*, not the original format's syntax.
        </p>

        <h3 className="text-xl font-semibold mt-6">Handling Data Types</h3>
        <p>Consider how different JSON data types are presented:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              Booleans (<code>true</code>, <code>false</code>)
            </strong>
            : Display them as text. Avoid using icons or colors as the *only* indicator without providing equivalent
            text.
          </li>
          <li>
            <strong>Null</strong>: Display as "null" or an equivalent accessible term like "Not Set" or "Empty".
          </li>
          <li>
            <strong>Numbers</strong>: Display as text. Ensure large numbers are formatted readably if necessary (though
            less common in pure JSON display).
          </li>
          <li>
            <strong>Strings</strong>: Display as text. Be mindful of potentially long strings or strings containing line
            breaks.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CodeXml className="mr-2 text-blue-600" />
          Code Blocks and Syntax Highlighting
        </h3>
        <p>
          If the goal is specifically to *show* the raw JSON structure (e.g., for developers), presenting it within{" "}
          <code>&lt;pre&gt;</code> and <code>&lt;code&gt;</code> tags is appropriate. Ensure that:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            The code block is clearly labeled, perhaps with a heading or a preceding paragraph explaining that this is
            the *raw data format*.
          </li>
          <li>
            The content within <code>&lt;code&gt;</code> uses appropriate HTML entities for characters like{" "}
            <code>&lt;</code>, <code>&gt;</code>, <code>&#x7b;</code>, <code>&#x7d;</code> etc., if you are embedding
            code *within* the code tag itself (e.g., explaining syntax). For simply displaying JSON text, the raw
            characters are usually fine within <code>&lt;pre&gt;</code>, but ensure line breaks are preserved.
          </li>
          <li>
            If using client-side syntax highlighting, ensure it doesn't create accessibility barriers (e.g., relying
            solely on color, creating complex nested structures that confuse screen readers). Server-rendered or static
            highlighting is often safer.
          </li>
        </ul>
        <p>
          However, if the purpose is for a user to *understand the data*, transforming it into semantic HTML
          lists/tables is preferred over just showing the raw syntax.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Practical Implementation Tips</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Build a Recursive Transformer:</strong> Write a function that takes a JSON object or array and
            recursively generates the corresponding HTML structure (<code>&lt;dl&gt;</code>/<code>&lt;dt&gt;</code>/
            <code>&lt;dd&gt;</code>, <code>&lt;ul&gt;</code>/<code>&lt;li&gt;</code>, or <code>&lt;table&gt;</code>).
          </li>
          <li>
            <strong>Handle Different Types:</strong> The transformer should check the type of each value (object, array,
            string, number, boolean, null) and output the appropriate HTML.
          </li>
          <li>
            <strong>Consider Large Data Sets:</strong> Implement features like pagination, filtering, or the{" "}
            <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> pattern for large JSON payloads.
          </li>
          <li>
            <strong>Provide Context:</strong> Add introductory text or headings to explain what the displayed JSON data
            represents.
          </li>
          <li>
            <strong>Test with Screen Readers:</strong> Always test your formatted output with actual screen reader
            software (like NVDA, JAWS, VoiceOver) to ensure it is interpreted correctly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Making JSON data accessible is not about preserving the original syntax, but about translating the underlying
          information structure into a format that assistive technologies can understand and convey meaningfully. By
          leveraging semantic HTML elements like definition lists, unordered lists, tables, and the{" "}
          <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> pattern, developers can create JSON formatters that
          are not only visually organized but also fully navigable and comprehensible for screen reader users.
          Prioritizing semantic structure over visual mimicry is key to inclusive data presentation.
        </p>
      </div>
    </>
  );
}
