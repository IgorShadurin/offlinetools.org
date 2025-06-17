import type { Metadata } from "next";
import { Trees, Accessibility, Code, Info, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "ARIA Attributes for Interactive JSON Tree Views | Accessibility",
  description:
    "Learn how to use ARIA attributes to make interactive JSON tree view components accessible to screen readers and other assistive technologies.",
};

export default function AriaJsonTreeViewArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Trees className="mr-3" size={32} />
        ARIA Attributes for Interactive JSON Tree Views
      </h1>

      <div className="space-y-6">
        <p>
          JSON tree views are a common way to visualize hierarchical data, especially in developer tools, data
          explorers, and configuration interfaces. They present complex data structures in a navigable and digestible
          format. However, for users relying on screen readers or other assistive technologies, a purely visual
          representation isn&apos;t enough. To make these components truly inclusive, we must employ Accessible Rich
          Internet Applications (ARIA) attributes.
        </p>
        <p>
          This article explores the essential ARIA roles and attributes needed to transform a standard interactive JSON
          tree view into an accessible one, ensuring navigation and understanding for all users.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Accessibility className="mr-2" />
          Why ARIA for Tree Views?
        </h2>
        <p>
          HTML provides basic structural elements, but it doesn&apos;t have a native element for a complex interactive
          tree structure like a JSON view. Assistive technologies need programmatic cues to understand the
          component&apos;s purpose, structure, and state. ARIA provides these cues through roles, states, and
          properties.
        </p>
        <p>Properly implemented ARIA for a tree view allows users to:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Understand that the component is a tree structure.</li>
          <li>
            Navigate between nodes (objects, arrays, key-value pairs) using standard keyboard commands (like arrow
            keys).
          </li>
          <li>Know the relationship between nodes (parent/child).</li>
          <li>Understand the state of a node (e.g., expanded or collapsed).</li>
          <li>Identify their current position within the tree.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" />
          Core ARIA Roles
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">role="tree"</code>
        </h3>
        <p>
          This role is applied to the main container element of the tree view. It identifies the element as a{" "}
          <a
            href="https://www.w3.org/TR/wai-aria-1.2/#tree"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            tree widget
          </a>
          . This tells assistive technologies to interpret the contained structure as a tree. The element with this role
          should typically have the keyboard focus, and manage focus internally on the selected{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Tree Container</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;ul role="tree" aria-labelledby="json-tree-label"&gt;
  &lt;!-- Tree items go here --&gt;
&lt;/ul&gt;

&lt;!-- The label element associated with the tree --&gt;
&lt;span id="json-tree-label" className="sr-only"&gt;JSON Data Structure&lt;/span&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            Note the use of <code className="font-mono text-red-600 dark:text-red-400">aria-labelledby</code> to provide
            an accessible name for the tree, pointing to an element containing the label. The{" "}
            <code className="font-mono text-red-600 dark:text-red-400">sr-only</code> class is common for visually
            hidden elements accessible to screen readers.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">role="treeitem"</code>
        </h3>
        <p>
          This role is applied to each node in the tree. In a JSON tree view, this would typically be the element
          representing a key-value pair, an item in an array, or a nested object/array node that can be
          expanded/collapsed. A <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> must be
          contained within an element with role <code className="font-mono text-red-600 dark:text-red-400">tree</code>{" "}
          or <code className="font-mono text-red-600 dark:text-red-400">group</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Basic Tree Item (Leaf Node)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;li role="treeitem"&gt;
  &lt;span&gt;
    &lt;span&gt;key&lt;/span&gt;: &lt;span&gt;"value"&lt;/span&gt;
  &lt;/span&gt;
&lt;/li&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            This represents a simple key-value pair, which is a leaf node (cannot be expanded).
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">role="group"</code>
        </h3>
        <p>
          This role is used for elements that contain child{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>s. In a JSON tree, this would be the
          container (<code className="font-mono text-red-600 dark:text-red-400">&lt;ul&gt;</code> or{" "}
          <code className="font-mono text-red-600 dark:text-red-400">&lt;ol&gt;</code>) immediately under an expandable{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> node (representing a nested object
          or array). This groups the children belonging to that parent node.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Expandable Tree Item with Group</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;li role="treeitem" aria-expanded="false"&gt;
  &lt;span&gt;
    &lt;span&gt;nestedObject&lt;/span&gt;: &lt;span&gt;&#x7b;&#x7d;&lt;/span&gt; &lt;!-- Represents the object --&gt;
    &lt;button aria-label="Expand nestedObject"&gt;
        &lt;ChevronRight size={16} /&gt; &lt;!-- Example expand icon --&gt;
    &lt;/button&gt;
  &lt;/span&gt;
  &lt;ul role="group"&gt;
    &lt;!-- Child tree items for nestedObject go here --&gt;
    &lt;li role="treeitem"&gt;...&lt;/li&gt;
  &lt;/ul&gt;
&lt;/li&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            The <code className="font-mono text-red-600 dark:text-red-400">&lt;li role="treeitem"&gt;</code> represents
            the parent node (<code className="font-mono text-red-600 dark:text-red-400">nestedObject</code>). The{" "}
            <code className="font-mono text-red-600 dark:text-red-400">&lt;ul role="group"&gt;</code> contains its
            children. Note that the <code className="font-mono text-red-600 dark:text-red-400">role="group"</code>{" "}
            element is typically hidden when{" "}
            <code className="font-mono text-red-600 dark:text-red-400">aria-expanded="false"</code> on the parent{" "}
            <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="mr-2" />
          Essential ARIA States and Properties
        </h2>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">aria-expanded</code>
        </h3>
        <p>
          Applied to a <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> that can be expanded
          or collapsed (i.e., parent nodes like objects or arrays).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-expanded="false"</code>: The node is
            currently collapsed.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-expanded="true"</code>: The node is
            currently expanded.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-expanded="undefined"</code> (or attribute
            not present): The node is a leaf node and cannot be expanded.
          </li>
        </ul>
        <p>
          Crucially, the visual state (whether the children are visible) must match the{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-expanded</code> value. The interactive element
          that toggles the expanded state (like a button or the{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> itself if it's a link/button)
          should control this attribute on the{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> element.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Toggling Expansion</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;li role="treeitem" aria-expanded="false"&gt;
  &lt;span&gt;
    &lt;span&gt;anArray&lt;/span&gt;: &lt;span&gt;[...]&lt;/span&gt;
    &lt;button aria-label="Expand anArray"&gt;
        &lt;!-- Icon changes based on aria-expanded state (visually and semantically) --&gt;
        &lt;ChevronRight size={16} /&gt;
    &lt;/button&gt;
  &lt;/span&gt;
  &lt;ul role="group" className="hidden"&gt; &lt;!-- This group is hidden when aria-expanded="false" --&gt;
    &lt;li role="treeitem"&gt;...&lt;/li&gt;
  &lt;/ul&gt;
&lt;/li&gt;

&lt;!-- When expanded --&gt;
&lt;li role="treeitem" aria-expanded="true"&gt;
  &lt;span&gt;
    &lt;span&gt;anArray&lt;/span&gt;: &lt;span&gt;[...]&lt;/span&gt;
    &lt;button aria-label="Collapse anArray"&gt;
        &lt;ChevronDown size={16} /&gt;
    &lt;/button&gt;
  &lt;/span&gt;
  &lt;ul role="group" className=""&gt; &lt;!-- This group is visible when aria-expanded="true" --&gt;
    &lt;li role="treeitem"&gt;...&lt;/li&gt;
    &lt;li role="treeitem"&gt;...&lt;/li&gt;
  &lt;/ul&gt;
&lt;/li&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">aria-selected</code>
        </h3>
        <p>
          Applied to a <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> to indicate if it is
          currently selected. While a JSON tree view might not always support item selection, if it does (e.g., clicking
          an item highlights it or loads its details elsewhere), this attribute should be used.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-selected="false"</code>: Not selected.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-selected="true"</code>: Selected.
          </li>
        </ul>
        <p>
          This attribute is distinct from focus. Only one item should typically be focused at a time, but multiple items
          could potentially be selected depending on the interaction model.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Selected Tree Item</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;li role="treeitem" aria-selected="true"&gt;
  &lt;span&gt;
    &lt;span&gt;selectedKey&lt;/span&gt;: &lt;span&gt;123&lt;/span&gt;
  &lt;/span&gt;
&lt;/li&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">aria-level</code>
        </h3>
        <p>
          Applied to each <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> to indicate its
          depth in the tree hierarchy. The value is an integer greater than or equal to 1. The tree element itself is
          level 0 conceptually, its direct children are level 1, their children are level 2, and so on.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: aria-level</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;ul role="tree"&gt;
  &lt;li role="treeitem" aria-level="1" aria-expanded="true"&gt;
    &lt;span&gt;root&lt;/span&gt;
    &lt;ul role="group"&gt;
      &lt;li role="treeitem" aria-level="2"&gt;
        &lt;span&gt;key1&lt;/span&gt;: &lt;span&gt;"value1"&lt;/span&gt;
      &lt;/li&gt;
      &lt;li role="treeitem" aria-level="2" aria-expanded="false"&gt;
        &lt;span&gt;key2&lt;/span&gt;: &lt;span&gt;&#x7b;&#x7d;&lt;/span&gt;
        &lt;ul role="group" className="hidden"&gt;
           &lt;li role="treeitem" aria-level="3"&gt;...&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">aria-posinset</code> and{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-setsize</code>
        </h3>
        <p>
          These attributes are used together on a{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> to indicate its position within the
          set of its siblings at the same level.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-posinset</code>: The position of the item
            within the set (1-based index).
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-setsize</code>: The total number of items in
            the set (siblings at the same level).
          </li>
        </ul>
        <p>
          These are important for screen readers to announce "Item 1 of 5", "Item 2 of 5", etc., giving the user context
          about their location and the size of the current list of siblings.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: aria-posinset and aria-setsize</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;ul role="tree"&gt;
  &lt;li role="treeitem" aria-level="1" aria-posinset="1" aria-setsize="1" aria-expanded="true"&gt;
    &lt;span&gt;root&lt;/span&gt;
    &lt;ul role="group"&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="1" aria-setsize="3"&gt;
        &lt;span&gt;key1&lt;/span&gt;: &lt;span&gt;"value1"&lt;/span&gt;
      &lt;/li&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="2" aria-setsize="3" aria-expanded="false"&gt;
        &lt;span&gt;key2&lt;/span&gt;: &lt;span&gt;&#x7b;&#x7d;&lt;/span&gt;
        &lt;ul role="group" className="hidden"&gt;
           &lt;li role="treeitem" aria-level="3" aria-posinset="1" aria-setsize="1"&gt;...&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/li&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="3" aria-setsize="3"&gt;
        &lt;span&gt;key3&lt;/span&gt;: &lt;span&gt;true&lt;/span&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">aria-labelledby</code> and{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-describedby</code>
        </h3>
        <p>
          These attributes associate a <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> with
          other elements that provide its accessible name and description.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-labelledby</code>: Refers to the ID of the
            element(s) that provide the label for the{" "}
            <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>. For a JSON key-value pair, this
            would typically point to the element displaying the key name. For an array item, it might point to an
            element indicating its index, or the value itself if it's a simple value.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">aria-describedby</code>: Refers to the ID of the
            element(s) that provide a description for the{" "}
            <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>. This could be used to link to
            the element displaying the value, the type of the value (object, array, string, number, etc.), or other
            relevant information.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Using aria-labelledby and aria-describedby</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;li role="treeitem" aria-level="1" aria-posinset="1" aria-setsize="2"
    id="node-user" aria-labelledby="node-user-label" aria-describedby="node-user-value" aria-expanded="true"&gt;
  &lt;span&gt;
    &lt;span id="node-user-label"&gt;user&lt;/span&gt;: &lt;span id="node-user-value"&gt;&#x7b;&#x7d;&lt;/span&gt; &lt;!-- Visually shows { } --&gt;
    &lt;button aria-label="Expand user object"&gt;
        &lt;ChevronDown size={16} /&gt;
    &lt;/button&gt;
  &lt;/span&gt;
  &lt;ul role="group"&gt;
    &lt;li role="treeitem" aria-level="2" aria-posinset="1" aria-setsize="1"
        id="node-user-name" aria-labelledby="node-user-name-label" aria-describedby="node-user-name-value"&gt;
      &lt;span&gt;
        &lt;span id="node-user-name-label"&gt;name&lt;/span&gt;: &lt;span id="node-user-name-value"&gt;"Alice"&lt;/span&gt; &lt;!-- Value --&gt;
      &lt;/span&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/li&gt;

&lt;li role="treeitem" aria-level="1" aria-posinset="2" aria-setsize="2"
    id="node-items" aria-labelledby="node-items-label" aria-describedby="node-items-value" aria-expanded="false"&gt;
  &lt;span&gt;
    &lt;span id="node-items-label"&gt;items&lt;/span&gt;: &lt;span id="node-items-value"&gt;[...]&lt;/span&gt; &lt;!-- Visually shows [...] --&gt;
    &lt;button aria-label="Expand items array"&gt;
        &lt;ChevronRight size={16} /&gt;
    &lt;/button&gt;
  &lt;/span&gt;
  &lt;ul role="group" className="hidden"&gt;
    &lt;li role="treeitem" aria-level="2" aria-posinset="1" aria-setsize="2"
        id="node-items-0" aria-labelledby="node-items-0-label" aria-describedby="node-items-0-value"&gt;
      &lt;span&gt;
        &lt;span id="node-items-0-label"&gt;[0]&lt;/span&gt;: &lt;span id="node-items-0-value"&gt;"fiction"&lt;/span&gt;
      &lt;/span&gt;
    &lt;/li&gt;
    &lt;li role="treeitem" aria-level="2" aria-posinset="2" aria-setsize="2"
        id="node-items-1" aria-labelledby="node-items-1-label" aria-describedby="node-items-1-value"&gt;
      &lt;span&gt;
        &lt;span id="node-items-1-label"&gt;[1]&lt;/span&gt;: &lt;span id="node-items-1-value"&gt;false&lt;/span&gt;
      &lt;/span&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/li&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            Assigning unique IDs to the key/index and value elements allows them to be referenced by{" "}
            <code className="font-mono text-red-600 dark:text-red-400">aria-labelledby</code> and{" "}
            <code className="font-mono text-red-600 dark:text-red-400">aria-describedby</code> on the containing{" "}
            <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>. This provides a rich, semantic
            description to assistive technologies.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <code className="font-mono text-red-600 dark:text-red-400">aria-activedescendant</code>
        </h3>
        <p>
          This attribute is typically placed on the element with{" "}
          <code className="font-mono text-red-600 dark:text-red-400">role="tree"</code> (the tree container) when
          implementing{" "}
          <a
            href="https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_general_guidelines"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ARIA Focussed Container pattern
          </a>{" "}
          for keyboard navigation. Instead of moving the actual browser focus to each{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> as the user navigates with arrow
          keys, the focus stays on the container, and{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-activedescendant</code> is updated to the ID
          of the currently "active" (virtually focused){" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>. Assistive technologies monitor
          this attribute to announce the correct item.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: aria-activedescendant</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;ul role="tree" aria-labelledby="json-tree-label" aria-activedescendant="node-user-name"&gt;
  &lt;li role="treeitem" aria-level="1" aria-posinset="1" aria-setsize="2" id="node-user" ...&gt;...&lt;/li&gt;
  &lt;li role="treeitem" aria-level="1" aria-posinset="2" aria-setsize="2" id="node-items" ...&gt;
    &lt;ul role="group"&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="1" aria-setsize="2" id="node-items-0" ...&gt;...&lt;/li&gt;
      &lt;li role="treeitem" aria-level="2" aria-posinset="2" aria-setsize="2" id="node-items-1" ...&gt;...&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;

&lt;!-- In this state, the tree container element has browser focus,
     but assistive technologies treat "node-items-1" as the active item --&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            Implementing this pattern requires careful management of keyboard events (Up/Down/Left/Right arrow keys) and
            updating the <code className="font-mono text-red-600 dark:text-red-400">aria-activedescendant</code>{" "}
            attribute on the tree root.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Star className="mr-2" />
          Keyboard Interaction
        </h2>
        <p>
          While ARIA provides the semantic meaning, a truly accessible tree view must also implement standard keyboard
          navigation. The expected keyboard shortcuts for tree views include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">Arrow Up</code> /{" "}
            <code className="font-mono text-red-600 dark:text-red-400">Arrow Down</code>: Move focus/active descendant
            to the previous/next visible <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">Arrow Right</code>:
            <ul className="list-circle pl-6 space-y-1 my-2">
              <li>
                When focus is on a closed node, opens the node (sets{" "}
                <code className="font-mono text-red-600 dark:text-red-400">aria-expanded="true"</code>).
              </li>
              <li>When focus is on an open node, moves focus to the first child node.</li>
              <li>When focus is on a leaf node, does nothing.</li>
            </ul>
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">Arrow Left</code>:
            <ul className="list-circle pl-6 space-y-1 my-2">
              <li>
                When focus is on an open node, closes the node (sets{" "}
                <code className="font-mono text-red-600 dark:text-red-400">aria-expanded="false"</code>).
              </li>
              <li>When focus is on a closed node or a leaf node, moves focus to the parent node.</li>
            </ul>
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">Home</code>: Moves focus to the first{" "}
            <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> in the tree.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">End</code>: Moves focus to the last visible{" "}
            <code className="font-mono text-red-600 dark:text-red-400">treeitem</code> in the tree.
          </li>
          <li>
            <code className="font-mono text-red-600 dark:text-red-400">Enter</code> or{" "}
            <code className="font-mono text-red-600 dark:text-red-400">Space</code>: Performs the default action for the
            node (e.g., selecting it, if selection is supported).
          </li>
        </ul>
        <p>
          Implementing this complex keyboard navigation requires JavaScript, but the ARIA attributes ensure that
          assistive technologies understand what is happening as the user navigates.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="mr-2" />
          Putting it Together: A Full Example Snippet
        </h2>
        <p>
          This snippet illustrates a simplified structure for a JSON object with nested properties and an array,
          incorporating the ARIA attributes discussed.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example: Structure for &#x7b;"name": "Alice", "age": 30, "address": &#x7b;"city": "wonderland"&#x7d;,
            "tags": ["fiction", "adventure"]&#x7d;
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div&gt; &lt;!-- Container for label and tree --&gt;
  &lt;span id="json-tree-label" className="sr-only"&gt;User Data JSON&lt;/span&gt;

  &lt;ul role="tree" aria-labelledby="json-tree-label" tabindex="0"&gt; &lt;!-- tabindex="0" makes the tree focusable --&gt;

    &lt;li role="treeitem" aria-level="1" aria-posinset="1" aria-setsize="1"
        id="node-root" aria-labelledby="node-root-label" aria-describedby="node-root-value" aria-expanded="true"&gt;
      &lt;!-- The node label/value display area --&gt;
      &lt;span&gt;
        &lt;span id="node-root-label"&gt;root&lt;/span&gt;: &lt;span id="node-root-value"&gt;&#x7b;&#x7d;&lt;/span&gt; &lt;!-- Visual representation of the object --&gt;
        &lt;!-- Button to toggle expansion --&gt;
        &lt;button aria-label="Collapse root object"&gt;
            &lt;ChevronDown size={16} /&gt;
        &lt;/button&gt;
      &lt;/span&gt;

      &lt;!-- Group for children --&gt;
      &lt;ul role="group"&gt;

        &lt;!-- "name": "Alice" --&gt;
        &lt;li role="treeitem" aria-level="2" aria-posinset="1" aria-setsize="4"
            id="node-name" aria-labelledby="node-name-label" aria-describedby="node-name-value"&gt;
          &lt;span&gt;
            &lt;span id="node-name-label"&gt;name&lt;/span&gt;: &lt;span id="node-name-value"&gt;"Alice"&lt;/span&gt;
          &lt;/span&gt;
        &lt;/li&gt;

        &lt;!-- "age": 30 --&gt;
        &lt;li role="treeitem" aria-level="2" aria-posinset="2" aria-setsize="4"
            id="node-age" aria-labelledby="node-age-label" aria-describedby="node-age-value"&gt;
          &lt;span&gt;
            &lt;span id="node-age-label"&gt;age&lt;/span&gt;: &lt;span id="node-age-value"&gt;30&lt;/span&gt;
          &lt;/span&gt;
        &lt;/li&gt;

        &lt;!-- "address": &#x7b;...&#x7d; (Expandable) --&gt;
        &lt;li role="treeitem" aria-level="2" aria-posinset="3" aria-setsize="4"
            id="node-address" aria-labelledby="node-address-label" aria-describedby="node-address-value" aria-expanded="true"&gt;
          &lt;span&gt;
            &lt;span id="node-address-label"&gt;address&lt;/span&gt;: &lt;span id="node-address-value"&gt;&#x7b;&#x7d;&lt;/span&gt;
            &lt;button aria-label="Collapse address object"&gt;
                 &lt;ChevronDown size={16} /&gt;
            &lt;/button&gt;
          &lt;/span&gt;
          &lt;ul role="group"&gt;
            &lt;!-- "city": "wonderland" --&gt;
            &lt;li role="treeitem" aria-level="3" aria-posinset="1" aria-setsize="1"
                id="node-address-city" aria-labelledby="node-address-city-label" aria-describedby="node-address-city-value"&gt;
              &lt;span&gt;
                &lt;span id="node-address-city-label"&gt;city&lt;/span&gt;: &lt;span id="node-address-city-value"&gt;"wonderland"&lt;/span&gt;
              &lt;/span&gt;
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/li&gt;

        &lt;!-- "tags": [...] (Expandable Array) --&gt;
        &lt;li role="treeitem" aria-level="2" aria-posinset="4" aria-setsize="4"
            id="node-tags" aria-labelledby="node-tags-label" aria-describedby="node-tags-value" aria-expanded="false"&gt;
          &lt;span&gt;
            &lt;span id="node-tags-label"&gt;tags&lt;/span&gt;: &lt;span id="node-tags-value"&gt;[...]&lt;/span&gt;
            &lt;button aria-label="Expand tags array"&gt;
                &lt;ChevronRight size={16} /&gt;
            &lt;/button&gt;
          &lt;/span&gt;
          &lt;ul role="group" className="hidden"&gt;
            &lt;!-- "fiction" --&gt;
            &lt;li role="treeitem" aria-level="3" aria-posinset="1" aria-setsize="2"
                id="node-tags-0" aria-labelledby="node-tags-0-label" aria-describedby="node-tags-0-value"&gt;
              &lt;span&gt;
                 &lt;span id="node-tags-0-label"&gt;[0]&lt;/span&gt;: &lt;span id="node-tags-0-value"&gt;"fiction"&lt;/span&gt;
              &lt;/span&gt;
            &lt;/li&gt;
            &lt;!-- "adventure" --&gt;
            &lt;li role="treeitem" aria-level="3" aria-posinset="2" aria-setsize="2"
                id="node-tags-1" aria-labelledby="node-tags-1-label" aria-describedby="node-tags-1-value"&gt;
              &lt;span&gt;
                 &lt;span id="node-tags-1-label"&gt;[1]&lt;/span&gt;: &lt;span id="node-tags-1-value"&gt;"adventure"&lt;/span&gt;
              &lt;/span&gt;
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/li&gt;

      &lt;/ul&gt; &lt;!-- End root group --&gt;
    &lt;/li&gt; &lt;!-- End root treeitem --&gt;

  &lt;/ul&gt; &lt;!-- End tree --&gt;
&lt;/div&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            This example shows how roles, levels, position/set size, and labeling/description attributes work together
            across different types of JSON nodes (object, key-value, array, array item). Note the use of unique IDs for
            each node and its label/value parts.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Accessibility className="mr-2" />
          Testing Your Accessible Tree View
        </h2>
        <p>Implementing ARIA attributes is crucial, but verifying the accessibility is equally important.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keyboard Navigation:</strong> Try navigating the tree view using only the keyboard (arrow keys,
            Home, End, Enter). Ensure that focus moves correctly and nodes expand/collapse as expected.
          </li>
          <li>
            <strong>Screen Reader Testing:</strong> Use a screen reader (e.g., VoiceOver on macOS, NVDA on Windows,
            JAWS) to interact with the tree view. Listen to what is announced when navigating, expanding, and collapsing
            nodes. Does it correctly announce the role (
            <code className="font-mono text-red-600 dark:text-red-400">"tree"</code>,{" "}
            <code className="font-mono text-red-600 dark:text-red-400">"tree item"</code>,{" "}
            <code className="font-mono text-red-600 dark:text-red-400">"group"</code>), the level, position in set, and
            the label/description of the node?
          </li>
          <li>
            <strong>Automated Tools:</strong> Use browser extensions (like axe DevTools, Lighthouse) or online
            validators to check for common ARIA usage errors.
          </li>
          <li>
            <strong>Manual Code Review:</strong> Double-check that ARIA attributes are correctly applied according to
            the WAI-ARIA Tree View pattern. Ensure IDs used in{" "}
            <code className="font-mono text-red-600 dark:text-red-400">aria-labelledby</code> and{" "}
            <code className="font-mono text-red-600 dark:text-red-400">aria-describedby</code> correctly point to the
            intended elements and are unique.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Trees className="mr-2" />
          Conclusion
        </h2>
        <p>
          Creating accessible interactive components like JSON tree views is essential for building inclusive web
          applications. By applying the appropriate ARIA roles (
          <code className="font-mono text-red-600 dark:text-red-400">tree</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">treeitem</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">group</code>) and states/properties (
          <code className="font-mono text-red-600 dark:text-red-400">aria-expanded</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-selected</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-level</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-posinset</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-setsize</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-labelledby</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-describedby</code>,{" "}
          <code className="font-mono text-red-600 dark:text-red-400">aria-activedescendant</code>), along with robust
          keyboard navigation, you can ensure that users of assistive technologies have a semantic understanding and
          navigable experience comparable to visual users. Implementing these patterns requires careful attention to
          detail but is a fundamental step towards building truly accessible user interfaces.
        </p>
      </div>
    </>
  );
}
