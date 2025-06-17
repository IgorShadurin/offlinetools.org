import type { Metadata } from "next";
import {
  Keyboard,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  X,
  Accessibility,
  ListTree,
  CheckCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Keyboard Navigation Patterns for JSON Editors | Offline Tools",
  description: "Explore effective keyboard navigation patterns for building accessible and efficient JSON editors.",
};

export default function KeyboardNavigationJsonEditorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Keyboard className="w-8 h-8 text-blue-500" /> Keyboard Navigation Patterns for JSON Editors
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>
          JSON editors are essential tools for developers working with structured data. While mouse interaction is
          common, robust keyboard navigation is crucial for accessibility, efficiency, and power users. A well-designed
          keyboard interface can significantly enhance the user experience and productivity when navigating and editing
          complex JSON structures.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6 text-green-500" /> Understanding the JSON Structure
        </h2>
        <p>
          Before diving into navigation patterns, it's important to consider the hierarchical nature of JSON. A JSON
          document is composed of:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Objects:</strong> Key-value pairs (`&#x7b; "key": "value" &#x7d;`). Keys are typically strings.
            Values can be any JSON type.
          </li>
          <li>
            <strong>Arrays:</strong> Ordered lists of values (`[ "value1", "value2" ]`).
          </li>
          <li>
            <strong>Primitive Values:</strong> Strings, numbers, booleans (`true`, `false`), and null.
          </li>
        </ul>
        <p>
          A keyboard navigation scheme must allow users to move through this structure, focus on specific elements
          (keys, values, array items, structural characters), and perform actions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ArrowUp className="w-6 h-6 text-purple-500" /> <ArrowDown className="w-6 h-6 text-purple-500" />{" "}
          <ArrowLeft className="w-6 h-6 text-purple-500" /> <ArrowRight className="w-6 h-6 text-purple-500" /> Basic
          Navigation (Arrow Keys)
        </h2>
        <p>
          The most fundamental navigation involves the standard arrow keys. Their behavior should be intuitive and
          context-aware:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&uarr;</code> (Up Arrow): Move
            focus to the previous visible element. This could be the previous key-value pair, the previous array item,
            or the parent element.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&darr;</code> (Down Arrow):
            Move focus to the next visible element. This could be the next key-value pair, the next array item, or the
            first child element of the current item if expanded.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&larr;</code> (Left Arrow):
            <ul className="list-circle pl-4 mt-2">
              <li>
                When focus is on a value or key: Move focus to the associated key (if on a value) or structural element
                (like a comma or bracket) to the left.
              </li>
              <li>When focus is on an expandable item (Object/Array): Collapse the item.</li>
              <li>When focus is inside a text input (for editing keys/values): Move the text cursor left.</li>
            </ul>
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&rarr;</code> (Right Arrow):
            <ul className="list-circle pl-4 mt-2">
              <li>When focus is on a key: Move focus to the associated value.</li>
              <li>When focus is on an expandable item (Object/Array): Expand the item.</li>
              <li>When focus is inside a text input (for editing keys/values): Move the text cursor right.</li>
            </ul>
          </li>
        </ul>
        <p>
          This layered behavior depending on whether the item is expandable, editable, or a simple value provides
          flexibility.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Scenario (Arrow Keys):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`&lbrace;
  "user": &lbrace;
    "name": "Alice",
    "age": 30
  &rbrace;,
  "hobbies": [
    "reading",
    "gardening"
  ]
&rbrace;`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Focus on `"user"` (key): Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&rarr;</code>, focus moves to
            the object value `&#x7b; ... &#x7d;`.
          </li>
          <li>
            Focus on the `&#x7b; ... &#x7d;` (user object): Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&rarr;</code>, the object
            expands and focus moves to `"name"`. Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&larr;</code>, the object
            collapses.
          </li>
          <li>
            Focus on `"age": 30` (key-value pair): Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&uarr;</code>, focus moves to
            `"name": "Alice"`. Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&darr;</code>, focus moves to
            `"hobbies"`.
          </li>
          <li>
            Focus on `"reading"` (array item): Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&darr;</code>, focus moves to
            `"gardening"`. Press{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&uarr;</code>, focus moves to
            `"reading"`.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ChevronDown className="w-6 h-6 text-orange-500" /> <ChevronRight className="w-6 h-6 text-orange-500" />{" "}
          Collapsing and Expanding
        </h2>
        <p>
          Hierarchical JSON structures benefit greatly from collapse/expand functionality. Dedicated keys, often in
          combination with modifiers, can control this:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Space</code> or{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Enter</code>: Toggle
            collapse/expand for the focused Object or Array.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code> +{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Space</code> or{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code> +{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Enter</code>: Toggle
            collapse/expand for the focused item and all its descendants. (Expand/Collapse All children)
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Alt</code> +{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Space</code> or{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Alt</code> +{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Enter</code>: Toggle
            collapse/expand for all items at the current level.
          </li>
        </ul>
        <p>
          The <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&larr;</code> and{" "}
          <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&rarr;</code> keys can also serve
          this purpose when the focus is specifically on the expand/collapse toggle or the object/array node itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Plus className="w-6 h-6 text-blue-500" /> <Minus className="w-6 h-6 text-blue-500" />{" "}
          <X className="w-6 h-6 text-blue-500" /> Editing and Actions
        </h2>
        <p>
          Users need to modify the JSON structure using the keyboard. Common actions include adding, deleting, and
          editing elements.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Enter</code> or{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">F2</code>: Start editing the
            focused key or value. When finished editing,{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Enter</code> saves changes,{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Escape</code> cancels.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Delete</code>: Delete the
            focused item (key-value pair, array item). Confirmation might be required depending on the editor.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Insert</code> or{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code> +{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">N</code>: Add a new item
            (key-value pair in an object, item in an array) after the focused item. The editor should then automatically
            focus the newly added item and enter edit mode.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code> +{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">D</code>: Duplicate the focused
            item.
          </li>
          <li>
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Tab</code>: Navigate between
            editable parts of the focused item (e.g., from key input to value input). Standard browser tab behavior
            should navigate between distinct interactive components within the editor UI (e.g., the tree view, search
            box, save button).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-6 h-6 text-green-500" /> Focus Management
        </h2>
        <p>Proper focus management is key to a good keyboard experience.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Only one element should have focus at a time.</li>
          <li>The focused element should have a clear visual indicator (outline).</li>
          <li>
            When an action is performed (e.g., adding an item), focus should move logically (e.g., to the new item,
            ready for editing).
          </li>
          <li>
            Collapsing an item should move focus to the parent item if the focused item was a child, or keep focus on
            the item itself if it was the one being collapsed.
          </li>
          <li>Expanding an item should ideally keep focus on the item itself, or move focus to its first child.</li>
          <li>
            When editing starts, focus should shift into the input field. When editing ends, focus should return to the
            structural representation of the item.
          </li>
        </ul>
        <p>
          Using standard HTML focusable elements (or elements with `tabindex="0"`) and managing focus with JavaScript
          (or framework equivalents) is crucial for this. ARIA attributes can further enhance accessibility by conveying
          the focused element's role and state to assistive technologies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Accessibility className="w-6 h-6 text-indigo-500" /> Accessibility Considerations
        </h2>
        <p>Excellent keyboard navigation is a core component of web accessibility. Developers should consider:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Standard Keys:</strong> Rely on well-understood keys like Arrows, Enter, Space, Delete, Tab. Use
            modifier keys (<code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code>,{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Shift</code>,{" "}
            <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Alt</code>) for less common or
            power-user actions.
          </li>
          <li>
            <strong>Focus Indicator:</strong> Ensure the browser's default focus outline is visible and has sufficient
            contrast, or provide a custom one.
          </li>
          <li>
            <strong>ARIA Roles and Attributes:</strong> Use ARIA roles (e.g., `role="treegrid"`, `role="treeitem"`) and
            states (`aria-expanded`, `aria-level`, `aria-posinset`, `aria-setsize`) to communicate the structure and
            state of the JSON tree to screen readers.
          </li>
          <li>
            <strong>Keyboard Traps:</strong> Ensure focus is never trapped in a part of the editor. Users should always
            be able to tab out.
          </li>
          <li>
            <strong>Documentation:</strong> Clearly document available keyboard shortcuts.
          </li>
        </ul>
        <p>
          Testing with keyboard-only and screen readers is essential to verify the accessibility of the navigation
          implementation.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Summary of Common Keybindings</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg">
            <thead>
              <tr className="text-left border-b border-gray-300 dark:border-gray-700">
                <th className="p-3">Key(s)</th>
                <th className="p-3">Action (Context dependent)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&uarr;</code> /{" "}
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&darr;</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Move focus between visible siblings (previous/next item, key/value pair).
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&larr;</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Collapse current item / Move focus to parent / Move cursor left (in edit mode).
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">&rarr;</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Expand current item / Move focus to child / Move cursor right (in edit mode).
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Space</code> /{" "}
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Enter</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Toggle collapse/expand for the focused item. Start/save editing (in edit mode).
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Escape</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">Cancel editing.</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Delete</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">Delete focused item.</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Insert</code> or{" "}
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code> +{" "}
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">N</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">Add new item after focused item.</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Ctrl</code> +{" "}
                  <code className="font-mono px-1 py-0.5 bg-gray-200 rounded dark:bg-gray-700">Space</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Toggle collapse/expand focused item and all descendants.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing comprehensive and intuitive keyboard navigation in a JSON editor is not just a feature for power
          users; it's a fundamental aspect of building an accessible and efficient application. By carefully considering
          the hierarchical structure of JSON and mapping logical actions to standard keyboard shortcuts, developers can
          create a much more powerful and user-friendly editing experience for everyone. Prioritizing focus management
          and adherence to accessibility guidelines will ensure the editor is usable by a wider audience.
        </p>
      </div>
    </>
  );
}
