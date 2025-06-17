import type { Metadata } from "next";
import { ChevronDown, ChevronRight, Copy, Accessibility, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Touch-Friendly JSON Formatters for Mobile Accessibility",
  description:
    "Explore the challenges of displaying JSON on mobile devices and learn techniques for building touch-friendly and accessible JSON formatters.",
};

export default function TouchFriendlyJsonFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Touch-Friendly JSON Formatters for Mobile Accessibility</h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format used across web and mobile applications for data
          exchange. While its plain-text structure is great for machines, displaying raw or simply pretty-printed JSON
          on a small mobile screen presents significant challenges for human users, especially when dealing with large
          or deeply nested data.
        </p>
        <p>
          Complex JSON structures, filled with punctuation like &#x7b;, &#x7d;, [, ], :, and quotes, become difficult to
          read and navigate on a touch device. Furthermore, ensuring these formatters are accessible to users with
          disabilities requires careful consideration beyond just visual presentation. This article explores techniques
          for creating JSON formatters that are not only visually clear but also intuitive to use with touch gestures
          and supportive of accessibility needs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">The Challenge: JSON on Small Screens</h2>
        <p>Consider a large JSON response displayed on a mobile phone. Without proper formatting:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Long lines require horizontal scrolling, disrupting reading flow.</li>
          <li>Nested structures become a jumble of braces and brackets.</li>
          <li>Identifying key-value pairs or array elements is hard.</li>
          <li>Selecting and copying specific parts of the data is fiddly with touch.</li>
          <li>Visual impairments or motor disabilities can make interaction nearly impossible.</li>
        </ul>
        <p>
          A touch-friendly and accessible formatter aims to mitigate these issues, making JSON data consumable on mobile
          devices.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features of a Touch-Friendly Formatter</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <ChevronDown className="mr-2 text-blue-500 dark:text-blue-400" size={24} /> Expand/Collapse Functionality
        </h3>
        <p>
          The most critical feature for managing complexity is the ability to expand and collapse JSON objects
          (&#x7b;...&#x7d;) and arrays ([...]). This allows users to focus on relevant sections and hide details they
          don't need immediately.
        </p>
        <p>
          Each object and array should have a clear toggle control (e.g., an arrow or plus/minus icon) that provides a
          large tap target area.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
          <p className="font-mono text-sm">
            <span className="inline-flex items-center">
              <ChevronDown size={16} className="mr-1" />
              <span className="text-purple-600 dark:text-purple-300">&#x7b;</span>
            </span>
            <span className="ml-4">
              &quot;<span className="text-red-600 dark:text-red-400">name</span>&quot;: &quot;
              <span className="text-green-600 dark:text-green-400">Alice</span>&quot;,
            </span>
            <br />
            <span className="inline-flex items-center">
              <ChevronDown size={16} className="mr-1" />
              <span className="text-purple-600 dark:text-purple-300">&quot;address&quot;: &#x7b;</span>
            </span>
            <span className="ml-8">
              &quot;<span className="text-red-600 dark:text-red-400">street</span>&quot;: &quot;
              <span className="text-green-600 dark:text-green-400">123 Main St</span>&quot;,
            </span>
            <br />
            <span className="ml-8">
              &quot;<span className="text-red-600 dark:text-red-400">zip</span>&quot;:{" "}
              <span className="text-blue-600 dark:text-blue-400">90210</span>
            </span>
            <br />
            <span className="ml-4 text-purple-600 dark:text-purple-300">&#x7d;</span>,<br />
            <span className="inline-flex items-center">
              <ChevronRight size={16} className="mr-1" />
              <span className="text-purple-600 dark:text-purple-300">&quot;items&quot;: [ ... ]</span>
            </span>
            <br />
            <span className="text-purple-600 dark:text-purple-300">&#x7d;</span>
          </p>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            <em>
              Static example showing collapsed &quot;items&quot; array. Tapping the{" "}
              <ChevronRight size={12} className="inline-block" /> would expand it.
            </em>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Palette className="mr-2 text-blue-500 dark:text-blue-400" size={24} /> Clear Visual Formatting
        </h3>
        <p>Effective pretty-printing is fundamental. This includes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Consistent indentation to show hierarchy.</li>
          <li>
            Syntax highlighting using distinct colors for keys, strings, numbers, booleans, null, and punctuation.
            Ensure sufficient contrast.
          </li>
          <li>
            Displaying array item counts or object key counts next to collapsed elements (e.g.,{" "}
            <code>
              [<span className="text-gray-500 dark:text-gray-400">5 items</span>]
            </code>
            ).
          </li>
          <li>Handling long string values (e.g., truncating with an option to expand).</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm font-mono">
            <code>
              &#x7b;
              <br />
              &nbsp;&nbsp;&quot;<span className="text-red-600 dark:text-red-400">id</span>&quot;:{" "}
              <span className="text-blue-600 dark:text-blue-400">12345</span>,<br />
              &nbsp;&nbsp;&quot;<span className="text-red-600 dark:text-red-400">active</span>&quot;:{" "}
              <span className="text-pink-600 dark:text-pink-400">true</span>,<br />
              &nbsp;&nbsp;&quot;<span className="text-red-600 dark:text-red-400">tags</span>&quot;: [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;<span className="text-green-600 dark:text-green-400">mobile</span>&quot;,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&quot;<span className="text-green-600 dark:text-green-400">formatter</span>&quot;
              <br />
              &nbsp;&nbsp;]
              <br />
              &#x7d;
            </code>
          </pre>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            <em>Static example showing indentation and basic syntax highlighting.</em>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center">
          <Copy className="mr-2 text-blue-500 dark:text-blue-400" size={24} /> Easy Copy Options
        </h3>
        <p>
          Users often need to copy specific parts of the JSON. Provide prominent buttons or tap-and-hold options to
          copy:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>An individual value.</li>
          <li>A key-value pair.</li>
          <li>An entire object or array.</li>
          <li>The full JSON document.</li>
          <li>
            The "path" to a selected element (e.g., <code>data.users[0].email</code>).
          </li>
        </ul>
        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 flex items-center">
          <em>
            Example interaction: Tapping a value could reveal a <Copy size={12} className="inline-block mx-1" /> icon to
            copy it.
          </em>
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Accessibility className="mr-2 text-blue-500 dark:text-blue-400" size={24} /> Accessibility Considerations
        </h2>
        <p>
          Building an accessible JSON formatter ensures users who rely on assistive technologies can understand and
          interact with the data.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Keyboard Navigation & Focus</h3>
        <p>
          Ensure all interactive elements, particularly the expand/collapse toggles, are focusable using the keyboard
          (e.g., the Tab key). Provide a clear visual focus indicator (an outline or background change) when an element
          is focused. Users should be able to toggle expansion using keyboard events like the Spacebar or Enter key.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Screen Reader Support</h3>
        <p>Semantic HTML and WAI-ARIA attributes are crucial.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Expand/collapse toggles should have <code>role="button"</code> and <code>aria-expanded="true"/"false"</code>{" "}
            attributes.
          </li>
          <li>
            Use <code>aria-label</code> or descriptive text content for toggle buttons (e.g., "Expand object", "Collapse
            array").
          </li>
          <li>
            Structure the output such that screen readers can understand the hierarchy (e.g., using nested lists or
            appropriate roles).
          </li>
          <li>
            Announce the type of data (object, array, string, number) and, for collections, the number of items or keys.
          </li>
          <li>Inform the user if a section is collapsed or expanded.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Color Contrast</h3>
        <p>
          Syntax highlighting is helpful but must adhere to WCAG color contrast guidelines (minimum 4.5:1 ratio for
          normal text, 3:1 for large text) for both text and background colors. Provide a high-contrast mode if
          possible.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Reduced Motion</h3>
        <p>
          If using animations for expanding/collapsing, ensure they respect the user's system settings for reduced
          motion (`prefers-reduced-motion` CSS media query). Simple showing/hiding is often sufficient and better for
          many users.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Static Representation Example (Conceptual Structure)</h2>
        <p>
          Below is a conceptual representation of how the structure could look using static HTML elements and utility
          classes, without any interactive JavaScript logic. This demonstrates the visual layout and potential ARIA
          attributes.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto">
          <pre className="text-sm font-mono">
            <code>
              {`{/* Main JSON container */}
<div role="tree" aria-label="JSON Data">
  {/* Root Object */}
  <div role="treeitem" aria-expanded="true" aria-label="Object with 2 keys">
    <button className="flex items-center cursor-pointer" aria-label="Collapse root object">
      <ChevronDown size={16} className="mr-1" />
      <span className="text-purple-600 dark:text-purple-300">&#x7b;</span>
      <span className="text-gray-500 dark:text-gray-400 ml-1">2 keys</span>
    </button>
    {/* Object Content (Expanded) */}
    <div role="group" className="ml-4">
      {/* Key-Value Pair */}
      <div role="none">
        <span className="text-red-600 dark:text-red-400">&quot;user&quot;</span>:
        {/* Nested Object */}
        <div role="treeitem" aria-expanded="false" aria-label="Object with 3 keys (collapsed)">
           <button className="flex items-center cursor-pointer" aria-label="Expand user object">
             <ChevronRight size={16} className="mr-1" />
             <span className="text-purple-600 dark:text-purple-300">&#x7b;</span>
             <span className="text-gray-500 dark:text-gray-400 ml-1">3 keys</span>
             <span className="text-purple-600 dark:text-purple-300 ml-1">&#x7d;</span> {/* Collapsed state shows closing brace */}
           </button>
           {/* Content hidden when collapsed */}
           {/* <div role="group" className="hidden"> ... user details ... </div> */}
        </div>
      </div>
       {/* Key-Value Pair */}
      <div role="none">
        <span className="text-red-600 dark:text-red-400">&quot;data&quot;</span>:
        {/* Nested Array */}
        <div role="treeitem" aria-expanded="true" aria-label="Array with 2 items">
          <button className="flex items-center cursor-pointer" aria-label="Collapse data array">
             <ChevronDown size={16} className="mr-1" />
             <span className="text-purple-600 dark:text-purple-300">[</span>
             <span className="text-gray-500 dark:text-gray-400 ml-1">2 items</span>
          </button>
          {/* Array Content (Expanded) */}
          <div role="group" className="ml-4">
            {/* Array Item 1 */}
            <div role="none">
               {/* Nested Object */}
              <div role="treeitem" aria-expanded="false" aria-label="Object with 1 key (collapsed)">
                <button className="flex items-center cursor-pointer" aria-label="Expand item 1 object">
                  <ChevronRight size={16} className="mr-1" />
                  <span className="text-purple-600 dark:text-purple-300">&#x7b;</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">1 key</span>
                  <span className="text-purple-600 dark:text-purple-300 ml-1">&#x7d;</span>
                </button>
              </div>
            </div>
            {/* Array Item 2 */}
            <div role="none">
               <span className="text-green-600 dark:text-green-400">&quot;another item&quot;</span>
            </div>
          </div>
          <span className="text-purple-600 dark:text-purple-300">]</span>
        </div>
      </div>
    </div>
    <span className="text-purple-600 dark:text-purple-300">&#x7d;</span>
  </div>
</div>
`}
            </code>
          </pre>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            <em>
              This simplified structure uses `role="tree"` and `role="treeitem"` to convey the nested nature to
              assistive technologies. Interactive toggles would update `aria-expanded` and show/hide the content
              `role="group"`.
            </em>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Implementation Considerations</h2>
        <p>
          Creating a robust formatter involves parsing the JSON string into a JavaScript object, then recursively
          rendering it into HTML.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing:</strong> Use <code>JSON.parse()</code>. Handle errors gracefully (e.g., displaying an error
            message).
          </li>
          <li>
            <strong>Rendering:</strong> Write recursive rendering logic. A function would take a JSON value (object,
            array, primitive) and return the corresponding JSX structure.
          </li>
          <li>
            <strong>Performance:</strong> For very large JSON files (megabytes), rendering the entire structure at once
            can be slow. Techniques like lazy loading or virtualisation (rendering only elements currently visible in
            the viewport) might be necessary, though they add significant complexity and typically require client-side
            state management.
          </li>
          <li>
            <strong>Tooling:</strong> Libraries exist for JSON formatting/viewing, but custom implementations allow for
            fine-grained control over touch and accessibility features tailored to a specific application's needs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          Providing developers or users with a clear, interactive, and accessible way to view JSON data on mobile
          devices is more than just pretty-printing; it's about creating a usable interface for complex information. By
          focusing on features like expandable sections with large touch targets, clear visual hierarchy, easy copying,
          and robust accessibility support (keyboard navigation, screen reader compatibility, contrast), you can build
          JSON formatters that are truly touch-friendly and inclusive for all users. While this static page demonstrates
          the concepts, a real-world implementation would leverage JavaScript frameworks to handle the interactive state
          and dynamic rendering.
        </p>
      </div>
    </>
  );
}
