import type { Metadata } from "next";
import {
  Accessibility,
  EyeOff,
  List,
  Table,
  Contrast,
  Keyboard,
  FileText,
  ExternalLink,
  Palette,
  Code,
  MessageSquareText,
  Eye,
  GraduationCap,
  Hammer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Making JSON Visualizations Accessible to All Users | Your Site Name",
  description:
    "Learn how to create accessible JSON visualizations for users with disabilities, covering ARIA, keyboard navigation, alternative formats, and design considerations.",
};

export default function AccessibleJsonVisualizationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Making JSON Visualizations Accessible to All Users
      </h1>

      <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It&apos;s widely used for transmitting data in web applications, including complex structures often visualized as trees, graphs, tables, or charts.
        </p>
        <p>
          While visualizing JSON can make complex data understandable at a glance for many users, it&apos;s crucial to ensure these visualizations are accessible to everyone, including users with disabilities who rely on assistive technologies like screen readers, keyboard navigation, or require specific visual adjustments.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <EyeOff className="mr-3 text-blue-500 dark:text-blue-400" size={24} />
          Challenges with JSON Visualizations and Accessibility
        </h2>
        <p>
          JSON is purely a data format and has no inherent structure for accessibility. Visual representations built from JSON often face several accessibility challenges:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Reliance on Visual Cues:</strong> Colors, positions, shapes, and lines are primary conveyors of information, which can be inaccessible to users with visual impairments or color blindness.</li>
          <li><strong>Complex Interactions:</strong> Zooming, panning, hovering for details, and expanding/collapsing nodes often rely on mouse interaction and visual coordination.</li>
          <li><strong>Lack of Semantic Structure:</strong> A div-based tree view or a SVG graph doesn&apos;t automatically convey the data&apos;s structure or relationships to assistive technologies.</li>
          <li><strong>Dynamic Content:</strong> Visualizations that update frequently can be disruptive or inaccessible if changes aren&apos;t announced or managed properly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Accessibility className="mr-3 text-green-500 dark:text-green-400" size={24} />
          Core Principles for Accessible Visualizations
        </h2>
        <p>
          Adhering to Web Content Accessibility Guidelines (WCAG) is essential. For visualizations, key principles include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Perceivable:</strong> Information and user interface components must be presentable to users in ways they can perceive. (e.g., provide text alternatives for visual content).</li>
          <li><strong>Operable:</strong> User interface components and navigation must be operable. (e.g., ensure keyboard accessibility).</li>
          <li><strong>Understandable:</strong> Information and the operation of user interface must be understandable. (e.g., make text readable, predictible).</li>
          <li><strong>Robust:</strong> Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. (e.g., use ARIA roles and states correctly).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Hammer className="mr-3 text-yellow-500 dark:text-yellow-400" size={24} />
          Techniques for Making JSON Visualizations Accessible
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <MessageSquareText className="mr-3 text-purple-500 dark:text-purple-400" size={20} />
          1. Provide Text Alternatives and Descriptions
        </h3>
        <p>
          This is fundamental. Screen readers cannot interpret a visual graph or a complex tree directly.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Short Text Alternatives:</strong> For simple visual elements, use <code>aria-label</code> or include descriptive text directly nearby. For example, a node in a tree could have <code>aria-label=&quot;Object with 3 properties: name, age, city&quot;</code>.
          </li>
          <li>
            <strong>Detailed Descriptions:</strong> For complex visualizations like charts or large tree structures, provide a more comprehensive summary or description.
            <ul className="list-[circle] pl-6 mt-2">
              <li>
                Use <code>aria-describedby</code> linking the visualization container to a hidden text element containing the description.
              </li>
              <li>
                Offer a &quot;View Data Table&quot; or &quot;Summary&quot; button that reveals a structured text description or the raw data in a more accessible format.
              </li>
              <li>
                For charts, describe the type of chart, the data being shown, trends, key values, and any interactive features.
              </li>
            </ul>
          </li>
          <li>
            <strong>Off-screen Text:</strong> Use CSS to visually hide text while keeping it available for screen readers (e.g., <code>.sr-only</code> class with specific CSS properties like <code>position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;</code>).
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Aria-label for a Tree Node</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`&lt;div role="treeitem" aria-expanded="true" aria-label="User Data (Object with 2 properties)"&gt;
  &lt;span&gt;User Data&lt;/span&gt;
  &lt;div role="group"&gt;
    &lt;div role="treeitem" aria-label="Name: Alice (String)"&gt;Name: Alice&lt;/div&gt;
    &lt;div role="treeitem" aria-label="Age: 30 (Number)"&gt;Age: 30&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Keyboard className="mr-3 text-blue-500 dark:text-blue-400" size={20} />
          2. Ensure Full Keyboard Accessibility
        </h3>
        <p>
          Users who cannot use a mouse must be able to navigate and interact with the visualization using only a keyboard (Tab, Arrow keys, Enter, Space, etc.).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Logical Tab Order:</strong> Ensure interactive elements (like expandable nodes, data points) are included in the natural tab order. Use <code>tabindex=&quot;0&quot;</code> if necessary for elements that are not naturally focusable but should be.
          </li>
          <li>
            <strong>Keyboard Interaction:</strong> Implement keyboard handlers for common interactions. For a tree view, this means using arrow keys to navigate between siblings and children, and Enter/Space to expand/collapse nodes. For charts, allow keyboard focus on data points and provide keyboard shortcuts for zooming/panning.
          </li>
          <li>
            <strong>Visible Focus Indicator:</strong> The currently focused element must have a clear visual outline or style change so keyboard users know where they are.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <List className="mr-3 text-green-500 dark:text-green-400" size={20} />
          <Table className="mr-3 text-yellow-500 dark:text-yellow-400" size={20} />
          3. Provide Data in Alternative Formats
        </h3>
        <p>
          Offering the underlying JSON data in a structured, non-visual format is often the most reliable way to ensure accessibility for complex datasets.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Tables:</strong> Present the data in an HTML <code>&lt;table&gt;</code>. Tables have strong semantic meaning for screen readers (rows, columns, headers). Use proper table markup (<code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;th&gt;</code> with <code>scope</code>).
          </li>
          <li>
            <strong>Downloadable Formats:</strong> Provide links to download the raw JSON data, or convert it to more universally accessible formats like CSV or XML.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Simple JSON Object as a Table</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`&lt;table&gt;
  &lt;caption&gt;Summary of User Data&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Property&lt;/th&gt;
      &lt;th scope="col"&gt;Value&lt;/th&gt;
      &lt;th scope="col"&gt;Type&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;name&lt;/th&gt;
      &lt;td&gt;Alice&lt;/td&gt;
      &lt;td&gt;String&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;age&lt;/th&gt;
      &lt;td&gt;30&lt;/td&gt;
      &lt;td&gt;Number&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;`}
            </pre>
          </div>
        </div>


        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-3 text-red-500 dark:text-red-400" size={20} />
          4. Utilize ARIA Roles and Attributes
        </h3>
        <p>
          ARIA (Accessible Rich Internet Applications) provides attributes to help describe roles, states, and properties of custom interactive components to assistive technologies.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Roles:</strong> Use appropriate roles like <code>role=&quot;tree&quot;</code>, <code>role=&quot;treeitem&quot;</code>, <code>role=&quot;group&quot;</code> for tree views; <code>role=&quot;graphics-document&quot;</code> or <code>role=&quot;img&quot;</code> (if static) for charts/graphs.
          </li>
          <li>
            <strong>States &amp; Properties:</strong>
            <ul className="list-[circle] pl-6 mt-2">
              <li><code>aria-expanded</code>: Indicates if a tree node or section is expanded or collapsed.</li>
              <li><code>aria-level</code>, <code>aria-posinset</code>, <code>aria-setsize</code>: Used in tree structures to describe nesting level and position within a set of siblings.</li>
              <li><code>aria-valuenow</code>, <code>aria-valuemin</code>, <code>aria-valuemax</code>, <code>aria-valuetext</code>: Useful for describing values in charts or sliders.</li>
              <li><code>aria-labelledby</code> / <code>aria-describedby</code>: To associate labels or descriptions with complex elements.</li>
            </ul>
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: ARIA for a Simple Tree Structure</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {`&lt;ul role="tree" aria-label="JSON Data Structure"&gt;
  &lt;li role="treeitem" aria-expanded="true" aria-level="1" aria-posinset="1" aria-setsize="1"&gt;
    &lt;span&gt;Root Object&lt;/span&gt;
    &lt;ul role="group"&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="1" aria-setsize="2"&gt;Property 1: Value A&lt;/li&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="2" aria-setsize="2"&gt;Property 2: Value B&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Palette className="mr-3 text-teal-500 dark:text-teal-400" size={20} />
          <Contrast className="mr-3 text-rose-500 dark:text-rose-400" size={20} />
          5. Visual Design Considerations
        </h3>
        <p>
          Accessibility isn&apos;t just for screen reader users. Visual design must also accommodate users with low vision, color blindness, or cognitive disabilities.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Color Contrast:</strong> Ensure sufficient contrast between text and background colors, and between different elements in the visualization. Use contrast checker tools.
          </li>
          <li>
            <strong>Do Not Rely Solely on Color:</strong> Use patterns, shapes, textures, or text labels in addition to color to distinguish data series or elements.
          </li>
          <li>
            <strong>Resizable Text:</strong> Users should be able to zoom or increase font size without breaking the layout or losing information.
          </li>
          <li>
            <strong>Clear Layout and Labels:</strong> Use clear headings, labels, legends, and tooltips (ensure tooltips are keyboard accessible and persistent).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="mr-3 text-orange-500 dark:text-orange-400" size={20} />
          6. Handle Dynamic Updates Accessibly
        </h3>
        <p>
          If your visualization updates in real-time or changes significantly based on user interaction, ensure assistive technologies are aware of the changes.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use ARIA live regions (<code>aria-live=&quot;polite&quot;</code> or <code>aria-live=&quot;assertive&quot;</code>) to announce important updates to screen reader users without interrupting their current task.
          </li>
          <li>
            Manage focus carefully when new content appears or sections are expanded/collapsed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <GraduationCap className="mr-3 text-indigo-500 dark:text-indigo-400" size={24} />
          Testing and Tools
        </h2>
        <p>
          Manual and automated testing are both necessary.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keyboard Testing:</strong> Navigate through the visualization using only the keyboard (Tab, Shift+Tab, Arrow keys, Enter, Space). Can you access all interactive elements?
          </li>
          <li>
            <strong>Screen Reader Testing:</strong> Test with common screen readers (JAWS, NVDA on Windows; VoiceOver on macOS/iOS; TalkBack on Android). Can you understand the data and structure?
          </li>
          <li>
            <strong>Automated Tools:</strong> Use browser extensions (Axe DevTools, WAVE) or integrated checks in development tools. These are good for finding basic issues but don&apos;t replace manual testing.
          </li>
          <li>
            <strong>Color Contrast Checkers:</strong> Tools like WebAIM&apos;s Contrast Checker or built-in browser tools.
          </li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <ExternalLink className="mr-3 text-cyan-500 dark:text-cyan-400" size={24} />
          Resources
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">WCAG 2.1/2.2 Guidelines</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">MDN Web Docs: ARIA</a></li>
          <li><a href="https://webaim.org/techniques/css/invisiblecontent/" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">WebAIM: Invisible Content Just for Screen Reader Users</a></li>
          <li><a href="https://www.accessibility-developer-guide.com/examples/widgets/treeview/" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">Accessibility Developer Guide: Treeview Example (with ARIA)</a></li>
          <li><a href="https://dequeuniversity.com/library/aria/aria-chart" className="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">Deque University: Accessible Charts &amp; Graphics</a></li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Eye className="mr-3 text-emerald-500 dark:text-emerald-400" size={24} />
          Conclusion
        </h2>
        <p>
          Creating accessible JSON visualizations requires thoughtful design and implementation beyond just the visual representation. By providing text alternatives, ensuring keyboard navigability, offering alternative data formats, correctly using ARIA, and considering visual design principles, you can make your data visualizations understandable and usable by a much broader audience. Integrating accessibility early in the development process is key to avoiding costly rework later on.
        </p>
      </div>
    </>
  );
}