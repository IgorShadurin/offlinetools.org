import type { Metadata } from "next";
import {
  Accessibility,
  Keyboard,
  Eye,
  Mic,
  Code,
  Sparkles, // For highlighting good practice
  TriangleAlert // For warnings/pitfalls
} from 'lucide-react';


export const metadata: Metadata = {
  title: "Ensuring Accessibility in JSON Tree Collapsible Elements | Article",
  description:
    "Learn how to build accessible collapsible JSON tree views using ARIA attributes, keyboard navigation, and semantic HTML.",
};

export default function AccessibilityJsonTreeArticle() {
  return (
    <article className="space-y-8 py-8 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Ensuring Accessibility in JSON Tree Collapsible Elements
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300">
        JSON tree views are a common way to visualize hierarchical data in developer tools, debug interfaces, and complex configuration editors. They often rely on collapsible elements to manage complexity and allow users to focus on relevant parts of the data. However, without careful consideration, these collapsible elements can become significant accessibility barriers for users who rely on screen readers, keyboard navigation, or other assistive technologies. This article explores key techniques to make your JSON tree components accessible.
      </p>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Accessibility size={28} />
        <h2>Why Accessibility Matters</h2>
      </div>
      <p>
        Accessibility isn&apos;t just about compliance; it&apos;s about building inclusive interfaces that anyone, regardless of ability, can use effectively. For a JSON tree:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Screen Reader Users:</strong> Need to understand that an element is collapsible, its current state (expanded or collapsed), and how to toggle it. They need the content inside to be properly associated and announced when expanded.
        </li>
        <li>
          <strong>Keyboard Users:</strong> Must be able to navigate through the tree structure and activate the expand/collapse toggles using standard keyboard interactions (like Tab, Enter, Space).
        </li>
        <li>
          <strong>Users with Cognitive Disabilities:</strong> Benefit from clear visual indicators of state and focus, consistent interaction patterns, and well-structured content.
        </li>
      </ul>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Sparkles size={28} />
        <h2>Core Concepts for Collapsible Elements</h2>
      </div>
      <p>
        The fundamental pattern for an accessible collapsible region involves a trigger element (usually a button or an element acting as one) that controls the visibility of a target region.
      </p>
      <p>Key ingredients:</p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>A visible element that users interact with to toggle the state (e.g., the JSON key/index label).</li>
        <li>The content area that expands and collapses (e.g., the JSON value).</li>
        <li>ARIA attributes to convey state and relationships to assistive technologies.</li>
        <li>Proper keyboard handling (addressed via semantic HTML or explicit event listeners).</li>
      </ol>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Code size={28} />
        <h2>Applying ARIA Attributes</h2>
      </div>
      <p>
        Accessible Rich Internet Applications (ARIA) attributes are crucial for conveying dynamic content updates and complex UI patterns to assistive technologies. For collapsible elements in a JSON tree context, the following ARIA attributes are essential:
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <span className="font-mono">aria-expanded</span>
      </h3>
      <p>
        This attribute indicates whether a collapsible element is currently expanded or collapsed. It should be set on the interactive element that controls the collapse (the toggle).
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Set to <code>true</code> when the content is visible (expanded).</li>
        <li>Set to <code>false</code> when the content is hidden (collapsed).</li>
      </ul>
      <p>
        Assistive technologies read this attribute to inform the user about the state of the collapsible section.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <span className="font-mono">aria-controls</span>
      </h3>
      <p>
        This attribute identifies the element(s) whose contents are controlled by the interactive element. It should be set on the toggle element and its value should be the <code>id</code> of the collapsible content area. This helps screen readers understand the relationship between the toggle and the content it controls.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <span className="font-mono">role</span>
      </h3>
      <p>
        While a full tree view often uses <code>role="treeitem"</code> and <code>role="group"</code>, for simple collapsible items within a visual tree structure, the toggle element should ideally be a native <code>&lt;button&gt;</code>. If using a non-interactive element like a <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code> as the toggle, you would typically add <code>role="button"</code> to ensure it&apos;s perceived as interactive by assistive technologies.
      </p>
      <p>
        The collapsible content area itself might not need a specific ARIA role unless it forms part of a larger ARIA pattern (like <code>role="group"</code> within a tree). Ensure it can be properly navigated to once expanded.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2">
        <span className="font-mono">aria-label</span> or <span className="font-mono">aria-labelledby</span>
      </h3>
      <p>
        Ensure the toggle element has a clear, concise, and descriptive label that tells the user what content it expands or collapses.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>Use <span className="font-mono">aria-label</span> if the visual text is insufficient or absent (e.g., just an icon). Example: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">&lt;button aria-label=&quot;Toggle details for user Alice&quot;&gt;...&lt;/button&gt;</code></li>
        <li>Use <span className="font-mono">aria-labelledby</span> if the label text is already present in another element (e.g., the JSON key/index span). Example: <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">&lt;button aria-labelledby=&quot;user-alice-label&quot;&gt;...&lt;/button&gt;</code> where the label span has <code>id=&quot;user-alice-label&quot;</code>.</li>
      </ul>
      <p>
        Combining the key/index label with the state (`aria-expanded`) provides a clear announcement like &quot;User Alice, collapsed, button&quot; or &quot;Courses, expanded, button&quot;.
      </p>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Code size={28} />
        <h2>Illustrative Code Example (Conceptual JSX)</h2>
      </div>
      <p>
        This example shows the basic structure and ARIA attributes for a single collapsible item in a JSON object view. Assume <code className="font-mono">item.key</code> is the property name and <code className="font-mono">item.value</code> is the potentially complex value.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded">
          <code>
{`// Note: ChevronRight and ChevronDown icons from lucide-react would be used here conceptually
// import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonTreeItemProps {
  item: &#x7b; key: string; value: any; &#x7d;;
  isExpanded: boolean;
  itemId: string; // Unique ID for the item (e.g., derived from path)
  // Note: Toggle function is needed for interactivity but omitted here as per instructions
  // onToggle: () => void;
}

// Conceptual component structure
function JsonTreeItem(&#x7b; item, isExpanded, itemId &#x7d;: JsonTreeItemProps) {
  const contentId = \`content-\${itemId}\`;
  const labelId = \`label-\${itemId}\`; // ID for the key/index span

  // Note: In a real component, you'd use a button for interactivity
  // and attach an onClick handler and potentially onKeyDown for Space/Enter.

  return (
    <div className="json-tree-node">
      {/* The toggle element */}
      {/* Using role="button" and tabindex="0" if not a native button */}
      {/* Better: use a native button */}
      <button
        id={\`toggle-\${itemId}\`}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        // Use aria-labelledby if the key/index span is the primary label source
        aria-labelledby={\`label-\${itemId}\` /* optional, depending on structure */}
        // If no visible text besides the key, add an aria-label like:
        // aria-label={\`Toggle \${item.key}\`}
        className="json-tree-toggle flex items-center" // Style as needed
        // onClick={onToggle} // Needed for interactivity
        // onKeyDown={handleKeyDown} // Needed for keyboard navigation
      >
        {/* Visual indicator for state (Conceptual Icons) */}
        {isExpanded ? (
          // <ChevronDown size={16} className="mr-1" /> // Conceptual icon
          <span className="mr-1">&#x25bc;</span> // Placeholder icon
        ) : (
          // <ChevronRight size={16} className="mr-1" /> // Conceptual icon
          <span className="mr-1">&#x25b6;</span> // Placeholder icon
        )}
        {/* JSON Key or Array Index */}
        <span id={labelId} className="json-tree-key font-mono text-blue-600 dark:text-blue-400">
          {item.key}
        </span>
        <span className="mr-1">:</span> {/* Separator */}
        {/* Optional: Show a preview of the value if collapsed */}
        {!isExpanded && (
           <span className="json-tree-preview text-gray-500 dark:text-gray-400 truncate">
             {/* Render a simplified preview like "[...]" or "{...}" */}
             {Array.isArray(item.value) ? '[...]' : typeof item.value === 'object' && item.value !== null ? '{...}' : JSON.stringify(item.value)}
           </span>
        )}
      </button>

      {/* The collapsible content */}
      {/* Add role="group" if this is part of a larger ARIA tree pattern */}
      {/* Add tabindex="-1" if you need to programmatically focus it */}
      <div
        id={contentId}
        role="group" // Might be appropriate depending on context
        className={\`json-tree-value pl-4 border-l border-gray-300 dark:border-gray-700 \${isExpanded ? 'block' : 'hidden'}\`} // Control visibility
        // aria-hidden={!isExpanded} // Can also use aria-hidden on the content itself when hidden
      >
        {/* Recursive rendering of child elements */}
        {/* Render child JsonTreeItem components here */}
        {/* For complex values (objects/arrays), map over children */}
        {/* Example placeholder: */}
        {isExpanded && (
          <div className="text-gray-800 dark:text-gray-200">
             {/* Render the actual JSON value or nested JsonTreeItems here */}
             {/* Example: if value is object, map over its keys */}
             {/* if (typeof item.value === 'object' && item.value !== null) &#x7b; */}
             {/*   Object.entries(item.value).map(([childKey, childValue]) => ( */}
             {/*     <JsonTreeItem */}
             {/*        key={\`\${itemId}-\${childKey}\`} */}
             {/*        item=&#x7b;&#x7b; key: childKey, value: childValue &#x7d;&#x7d; */}
             {/*        isExpanded=&#x7b;...&#x7d; // Manage state for children */}
             {/*        itemId={\`\${itemId}-\${childKey}\`} */}
             {/*        // Pass onToggle logic */}
             {/*     /> */}
             {/*   )) */}
             {/* &#x7d; else &#x7b; */}
             {/*   <span className="font-mono text-green-600 dark:text-green-400">{JSON.stringify(item.value)}</span> */}
             {/* &#x7d; */}
             <p className="italic text-sm">... nested content rendered here ...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Example usage context (conceptual):
// <div role="tree" aria-label="JSON Data View">
//   {data.map((item, index) => (
//      <JsonTreeItem
//         key={\`root-\${index}\`}
//         item=&#x7b;&#x7b; key: index.toString(), value: item &#x7d;&#x7d;
//         isExpanded=&#x7b;expandedState[\`root-\${index}\`]&#x7d;
//         itemId={\`root-\${index}\`}
//         // onToggle={() => toggleExpand(\`root-\${index}\`)}
//      />
//   ))}
// </div>
`}
          </code>
        </pre>
      </div>
      <p>
        In this conceptual example, the <code className="font-mono">&lt;button&gt;</code> element serves as the toggle. It correctly uses <code className="font-mono">aria-expanded</code> to indicate its state and <code className="font-mono">aria-controls</code> to link to the collapsible content identified by <code className="font-mono">contentId</code>. Using a native <code className="font-mono">&lt;button&gt;</code> automatically handles basic keyboard interactivity (Tab to focus, Space/Enter to activate).
      </p>
      <p>
        The collapsible content <code className="font-mono">&lt;div&gt;</code> has an <code className="font-mono">id</code> matching the <code className="font-mono">aria-controls</code> value and its visibility is controlled (e.g., via CSS <code className="font-mono">display: none</code> or similar). Adding <code className="font-mono">role="group"</code> to the content container can further clarify the structure within a complex tree.
      </p>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Keyboard size={28} />
        <h2>Keyboard Navigation</h2>
      </div>
      <p>
        Users who don&apos;t use a mouse rely entirely on the keyboard.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Tab Key:</strong> Ensure that each interactive toggle element in your JSON tree is focusable via the Tab key. Using native <code className="font-mono">&lt;button&gt;</code> elements handles this by default.
        </li>
        <li>
          <strong>Enter/Space Keys:</strong> These keys should activate the toggle button, changing the <code className="font-mono">aria-expanded</code> state and the visibility of the content. Again, native buttons provide this behavior out of the box.
        </li>
        <li>
          <strong>Arrow Keys (Advanced):</strong> For a fully compliant ARIA tree (<code className="font-mono">role="tree"</code>), you would implement keyboard navigation using Arrow keys (Up/Down to move between siblings, Left to collapse/move to parent, Right to expand/move to first child). This requires significant custom logic for managing focus and state, but is the ideal pattern for complex tree structures. For simpler implementations, ensuring Tab/Enter/Space works on each toggle is a good starting point.
        </li>
      </ul>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Mic size={28} />
        <h2>Screen Reader Considerations</h2>
      </div>
      <p>
        When a screen reader encounters the interactive toggle element, it should announce:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>The element&apos;s role (e.g., &quot;button&quot;).</li>
        <li>Its accessible name (e.g., &quot;name&quot; or &quot;item 0&quot;, derived from the key/index span or aria-label/labelledby).</li>
        <li>Its state (e.g., &quot;collapsed&quot; or &quot;expanded&quot;).</li>
      </ul>
      <p>
        When the user activates the toggle and the content expands, the screen reader user should be able to navigate into the newly visible content. Ensure the content area is not marked with <code className="font-mono">aria-hidden="true"</code> when it is visible.
      </p>
      <p>
        For very large JSON objects/arrays, consider strategies to avoid overwhelming the screen reader, such as initially collapsing all nodes or providing options to control verbosity.
      </p>

      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Eye size={28} />
        <h2>Visual Indicators and Focus</h2>
      </div>
      <p>
        Accessibility isn&apos;t just for non-visual users. Visual indicators are important for users with low vision or cognitive considerations.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Focus Outline:</strong> Ensure a clear and visible focus outline appears when an interactive toggle element is focused via the keyboard. This is default for native buttons but may need styling for other elements.
        </li>
        <li>
          <strong>State Indicator:</strong> Visually distinguish between expanded and collapsed states. Using icons (like the ChevronDown/ChevronRight used in the example) and potentially changing background color or text style of the toggle are effective methods.
        </li>
        <li>
          <strong>Hierarchy:</strong> Use indentation and visual lines (as shown conceptually with <code className="font-mono">border-l</code> in the example) to clearly represent the nested structure of the JSON data.
        </li>
        <li>
          <strong>Contrast:</strong> Ensure sufficient color contrast for text and interactive elements against their background.
        </li>
      </ul>
      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
          <TriangleAlert size={28} />
          <h2>Common Pitfalls to Avoid</h2>
      </div>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
              <strong>Using only CSS for State:</strong> Relying solely on CSS classes (like <code className="font-mono">.collapsed</code> or <code className="font-mono">.expanded</code>) without updating <code className="font-mono">aria-expanded</code> means screen readers won&apos;t announce the state change.
          </li>
          <li>
              <strong>Invisible Toggles:</strong> Making the click target too small or only showing the toggle icon on hover makes it hard for users with motor disabilities or those using touch/magnification. The clickable area should be reasonably sized.
          </li>
          <li>
              <strong>Not Using Semantic Buttons:</strong> Using a <code className="font-mono">&lt;div&gt;</code> or <code className="font-mono">&lt;span&gt;</code> without adding <code className="font-mono">role="button"</code> and making it programmatically focusable (<code className="font-mono">tabindex="0"</code>) and interactive (handling Space/Enter keypresses) breaks keyboard navigation and semantic understanding for assistive tech. Use a native <code className="font-mono">&lt;button&gt;</code> whenever possible.
          </li>
           <li>
               <strong>Lack of Focus Management:</strong> When content expands, ensure the user's focus remains in a logical place, often on the toggle itself, unless a specific reason exists to move focus elsewhere (which is rare for simple expand/collapse).
           </li>
      </ul>


      <div className="flex items-center space-x-3 text-xl font-semibold mt-8 mb-4">
        <Sparkles size={28} />
        <h2>Conclusion</h2>
      </div>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Building accessible JSON tree collapsible elements requires a combination of semantic HTML, appropriate ARIA attributes (<code className="font-mono">aria-expanded</code>, <code className="font-mono">aria-controls</code>, <code className="font-mono">aria-label</code>/<code className="font-mono">labelledby</code>), and attention to keyboard interaction and visual feedback. By implementing these techniques, you can ensure your data visualizations are usable and understandable for a much wider audience, improving the experience for developers and users of all abilities. Prioritize using native HTML elements like <code className="font-mono">&lt;button&gt;</code> where they fit the interactive pattern, as they provide much of the required accessibility features by default.
      </p>
    </article>
  );
}
