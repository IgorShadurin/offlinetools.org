import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Implementation for JSON Tree Views | Offline Tools",
  description:
    "Learn how to implement accessibility features for JSON tree views, ensuring they are navigable and understandable for users with disabilities.",
};

export default function JsonTreeViewAccessibilityArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Accessibility Implementation for JSON Tree Views</h1>

      <div className="space-y-6">
        <p>
          JSON tree views are a common way to visualize hierarchical data, making complex JSON structures easier to
          navigate and understand. However, like any complex interactive component, they must be built with
          accessibility in mind to ensure users with disabilities can effectively interact with them. This article
          explores the key considerations and techniques for making your JSON tree views accessible.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Accessibility Matters for Tree Views</h2>
        <p>
          Without proper accessibility implementation, users relying on assistive technologies like screen readers,
          keyboard navigation, or alternative input devices may find JSON tree views difficult or impossible to use.
          This includes:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keyboard Users:</strong> Users who cannot use a mouse need intuitive keyboard commands to navigate
            the tree, expand/collapse nodes, and select items.
          </li>
          <li>
            <strong>Screen Reader Users:</strong> Screen readers need to understand the structure, state
            (expanded/collapsed), level, and relationships between nodes.
          </li>
          <li>
            <strong>Users with Cognitive Disabilities:</strong> Clear focus indication and predictable interaction
            patterns are crucial.
          </li>
        </ul>
        <p>
          Implementing accessibility isn't just about compliance; it's about creating an inclusive user experience for
          everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Key Accessibility Requirements for Tree Views</h2>
        <p>To build an accessible JSON tree view, focus on these core areas:</p>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li>
            <strong>ARIA Roles and Properties:</strong> Correctly using WAI-ARIA attributes to convey the structure and
            state to assistive technologies.
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> Providing standard keyboard interactions for navigating, expanding,
            and collapsing nodes.
          </li>
          <li>
            <strong>Focus Management:</strong> Ensuring that focus is clearly visible and moves logically within the
            tree.
          </li>
          <li>
            <strong>Informative Labels:</strong> Providing meaningful text alternatives or labels for complex controls
            or nodes where the visual representation isn't sufficient.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Using WAI-ARIA for Structure and State</h2>
        <p>
          WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) provides attributes to help
          assistive technologies understand dynamic content and user interface controls that are built with technologies
          like HTML, JavaScript, and CSS. For tree views, the following ARIA attributes are essential:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono">role="tree"</code>: Applied to the main container element that wraps the entire
            tree structure.
          </li>
          <li>
            <code className="font-mono">role="treeitem"</code>: Applied to each node within the tree that can be
            focused.
          </li>
          <li>
            <code className="font-mono">role="group"</code>: Applied to an element that contains child{" "}
            <code className="font-mono">treeitem</code>s. This element is a child of the parent{" "}
            <code className="font-mono">treeitem</code>.
          </li>
          <li>
            <code className="font-mono">aria-expanded</code>: Applied to a <code className="font-mono">treeitem</code>
            that can be expanded or collapsed. Set to <code className="font-mono">"true"</code>
            when expanded, <code className="font-mono">"false"</code> when collapsed, and omitted if the node cannot be
            expanded.
          </li>
          <li>
            <code className="font-mono">aria-selected</code>: Applied to a <code className="font-mono">treeitem</code>
            that is currently selected. Set to <code className="font-mono">"true"</code>
            when selected. (Optional, depending on selection model).
          </li>
          <li>
            <code className="font-mono">aria-level</code>: Indicates the level of the
            <code className="font-mono">treeitem</code> within the tree hierarchy (e.g., root is level 1).
          </li>
          <li>
            <code className="font-mono">aria-setsize</code>: Indicates the number of items in the current group.
          </li>
          <li>
            <code className="font-mono">aria-posinset</code>: Indicates the position of the{" "}
            <code className="font-mono">treeitem</code> within the current group (1-based).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Implementing Keyboard Navigation</h2>
        <p>
          Standard keyboard interactions for tree views are well-defined. Your JavaScript should handle these key
          presses when a tree item has focus:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Down Arrow:</strong> Moves focus to the next visible node.
            </li>
            <li>
              <strong>Up Arrow:</strong> Moves focus to the previous visible node.
            </li>
            <li>
              <strong>Right Arrow:</strong> If the node is collapsed, expands it. If expanded, moves focus to the first
              child node. If it has no children, does nothing.
            </li>
            <li>
              <strong>Left Arrow:</strong> If the node is expanded, collapses it. If collapsed, moves focus to the
              parent node. If it is a root node, does nothing.
            </li>
            <li>
              <strong>Enter/Space:</strong> Activates the node (e.g., selects it or performs its default action). For
              nodes that expand/collapse, this might toggle their state.
            </li>
            <li>
              <strong>Home:</strong> Moves focus to the first node in the tree.
            </li>
            <li>
              <strong>End:</strong> Moves focus to the last visible node in the tree.
            </li>
            <li>
              <strong>(Optional) * (Asterisk):</strong> Expands all nodes in the tree.
            </li>
            <li>
              <strong>(Optional) First Letter Typing:</strong> Jumps focus to the next node starting with that letter.
            </li>
          </ul>
        </div>
        <p>
          Only one item in the tree should be tabbable (have <code className="font-mono">tabindex="0"</code>) at any
          given time. All other tree items should have <code className="font-mono">tabindex="-1"</code>. When a user
          presses an arrow key, your JavaScript should update the <code className="font-mono">tabindex</code>
          of the old and new items and programmatically set focus to the new item using{" "}
          <code className="font-mono">.focus()</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Example: Simplified JSON Tree View Structure with ARIA</h2>
        <p>
          Here is a conceptual example demonstrating the basic HTML structure with ARIA attributes for a simple JSON
          tree view. Note that the actual expansion/collapse logic and keyboard handling would be implemented in
          JavaScript, dynamically updating the <code className="font-mono">aria-expanded</code> attribute and managing
          focus/<code className="font-mono">tabindex</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`<ul role="tree" className="json-tree">
  <li role="treeitem" aria-level="1" aria-setsize="1" aria-posinset="1" tabindex="0">
    <span className="node-label">root (object)</span>
    <ul role="group">
      <li role="treeitem" aria-level="2" aria-setsize="3" aria-posinset="1" aria-expanded="true">
        <span className="node-label">user (object)</span>
        <ul role="group">
          <li role="treeitem" aria-level="3" aria-setsize="2" aria-posinset="1" tabindex="-1">
            <span className="node-label">name: "John Doe"</span>
          </li>
          <li role="treeitem" aria-level="3" aria-setsize="2" aria-posinset="2" tabindex="-1">
            <span className="node-label">age: 30</span>
          </li>
        </ul>
      </li>
      <li role="treeitem" aria-level="2" aria-setsize="3" aria-posinset="2" aria-expanded="false">
        <span className="node-label">items (array)</span>
        <!-- Child items (role="treeitem") would be inside a role="group" ul -->
      </li>
      <li role="treeitem" aria-level="2" aria-setsize="3" aria-posinset="3" tabindex="-1">
        <span className="node-label">isActive: true</span>
      </li>
    </ul>
  </li>
</ul>`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            <strong>Note:</strong> This is a static representation. A real implementation would involve JavaScript to
            dynamically add/remove nodes, update ARIA attributes (like <code className="font-mono">aria-expanded</code>
            ), and handle all keyboard events to manage focus and tree state.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Focus Indication</h2>
        <p>
          Ensure that the currently focused tree item has a clear visual outline. This is crucial for keyboard users to
          know where they are within the structure. Browsers provide default focus outlines (usually via the CSS{" "}
          <code className="font-mono">:focus</code> pseudo-class), but you might need to customize it for better
          visibility, ensuring it passes WCAG contrast requirements. Avoid removing the focus outline with{" "}
          <code className="font-mono">outline: none;</code>
          unless you provide an equally or more effective custom indicator.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Meaningful Labels</h2>
        <p>
          Screen readers announce the text content of the focused element. For a JSON tree view, ensure the visible text
          for each node (<code className="font-mono">.node-label</code> in the example) is descriptive. It should
          clearly indicate the key, the value (or a summary if complex), and potentially the data type (object, array,
          string, number, boolean). Combining the visual label with the ARIA attributes (
          <code className="font-mono">role</code>,<code className="font-mono">aria-level</code>,{" "}
          <code className="font-mono">aria-expanded</code>) provides a comprehensive experience for screen reader users.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Testing Your Implementation</h2>
        <p>
          Building an accessible component requires testing with the tools and methods used by people with disabilities:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Keyboard Testing:</strong> Navigate through the entire tree using only the keyboard (Tab,
              Shift+Tab, Arrow keys, Enter, Space, Home, End). Ensure all nodes are reachable and all interactions work
              as expected without a mouse. Check for clear focus indication.
            </li>
            <li>
              <strong>Screen Reader Testing:</strong> Use a screen reader (like NVDA, JAWS, or VoiceOver) to navigate
              the tree. Listen to how nodes are announced. Verify that the role ("tree item"), level, position, size,
              and expanded or collapsed state are correctly reported.
            </li>
            <li>
              <strong>Automated Tools:</strong> Use browser extensions or development tools that perform accessibility
              checks. While they won't catch everything (especially complex dynamic interactions), they can identify
              missing ARIA attributes or structural issues.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Creating an accessible JSON tree view involves careful consideration of semantic structure, keyboard
          interaction, and state communication via ARIA. By applying the <code className="font-mono">tree</code>,{" "}
          <code className="font-mono">treeitem</code>, and <code className="font-mono">group</code> roles, along with
          essential ARIA properties like <code className="font-mono">aria-expanded</code>,{" "}
          <code className="font-mono">aria-level</code>,<code className="font-mono">aria-setsize</code>, and{" "}
          <code className="font-mono">aria-posinset</code>, and implementing standard keyboard navigation, you can make
          your tree views usable for a much wider audience. Remember that testing with actual assistive technologies is
          a critical step in the process. Prioritizing accessibility from the start leads to more robust and
          user-friendly components for everyone.
        </p>
      </div>
    </>
  );
}
