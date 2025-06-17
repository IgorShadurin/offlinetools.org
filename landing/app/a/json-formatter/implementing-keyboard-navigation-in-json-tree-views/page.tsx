import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Keyboard Navigation in JSON Tree Views | Offline Tools",
  description:
    "Learn how to add accessible keyboard navigation to JSON tree view components, improving usability and compliance.",
};

export default function KeyboardNavigationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Keyboard Navigation in JSON Tree Tree Views</h1>

      <div className="space-y-6">
        <p>
          JSON tree views are powerful tools for visualizing hierarchical data. However, relying solely on mouse
          interaction can limit accessibility and efficiency. Implementing robust keyboard navigation is crucial for
          users who prefer keyboard control, have motor impairments, or use screen readers. This article explores the
          principles and techniques for adding keyboard navigation to your JSON tree view component.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Keyboard Navigation Matters</h2>
        <p>
          Adding keyboard support to interactive components like tree views isn&apos;t just a feature; it&apos;s a
          fundamental aspect of good user experience and accessibility.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Benefits of Keyboard Navigation:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Accessibility:</span> Enables users with motor disabilities or those using
              screen readers to fully interact with the tree view.
            </li>
            <li>
              <span className="font-medium">Efficiency:</span> Allows power users to quickly navigate and manipulate the
              tree structure without lifting their hands from the keyboard.
            </li>
            <li>
              <span className="font-medium">Compliance:</span> Helps meet accessibility standards like WCAG (Web Content
              Accessibility Guidelines).
            </li>
            <li>
              <span className="font-medium">Discoverability:</span> Encourages exploration of the data structure.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Core Concepts</h2>
        <p>
          Implementing keyboard navigation for a tree view primarily involves managing focus and handling key events.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Focus Management</h3>
        <p>
          Only one item in the tree view should be "focused" at any given time for keyboard interaction. This focused
          item receives keyboard events. The focus should be visually indicated, typically with an outline.
        </p>
        <p className="mt-2">Key aspects of focus management:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Determining which element is currently focused (e.g., using state or a ref).</li>
          <li>Programmatically setting focus on the desired element when a navigation key is pressed.</li>
          <li>Ensuring focus remains within the tree view container while navigating.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">2. Event Handling</h3>
        <p>
          You need to listen for keyboard events on the tree view container or individual tree nodes. The most relevant
          events are `onKeyDown` or `onKeyPress`.
        </p>
        <p className="mt-2">Common keys to handle in a tree view:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>
            <span className="font-mono">ArrowDown</span>: Move focus to the next visible node.
          </li>
          <li>
            <span className="font-mono">ArrowUp</span>: Move focus to the previous visible node.
          </li>
          <li>
            <span className="font-mono">ArrowRight</span>: If focused on a collapsed node, expand it. If focused on an
            expanded node, move focus to its first child. If focused on a leaf node, do nothing or move to the next
            sibling (depending on implementation).
          </li>
          <li>
            <span className="font-mono">ArrowLeft</span>: If focused on an expanded node, collapse it. If focused on a
            collapsed node or leaf node, move focus to its parent.
          </li>
          <li>
            <span className="font-mono">Enter</span> or <span className="font-mono">Space</span>: Toggle the expanded
            state of a node or activate/select a leaf node.
          </li>
          <li>
            <span className="font-mono">Home</span>: Move focus to the first node in the tree.
          </li>
          <li>
            <span className="font-mono">End</span>: Move focus to the last visible node in the tree.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Implementation Details & Examples</h2>
        <p>
          Let&apos;s look at a conceptual outline of how you might implement this in a React/Next.js component using
          TSX.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Conceptual Structure (React/TSX):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import React, { useState, useRef, useEffect } from 'react';

interface JsonNode {
  key: string;
  value: any;
  type: string; // 'object', 'array', 'value'
  children?: JsonNode[];
  path: string; // e.g., 'root.user.address[0]'
}

interface TreeViewProps {
  data: any;
}

const buildTreeNodes = (data: any, path = 'root'): JsonNode[] => {
  if (typeof data !== 'object' || data === null) {
    return [];
  }

  return Object.entries(data).map(([key, value], index) => {
    const currentPath = \`\${path}.\${key}\`;
    const isObjectOrArray = typeof value === 'object' && value !== null;
    const type = Array.isArray(value) ? 'array' : (isObjectOrArray ? 'object' : 'value');

    return {
      key: key,
      value: value,
      type: type,
      children: isObjectOrArray ? buildTreeNodes(value, currentPath) : undefined,
      path: currentPath,
    };
  });
};


const JsonTreeNode: React.FC<{ node: JsonNode; isFocused: boolean; onToggle: (path: string) => void; onClick: (path: string) => void; }> =
  ({ node, isFocused, onToggle, onClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const nodeRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
      if (isFocused && nodeRef.current) {
        nodeRef.current.focus();
      }
    }, [isFocused]);

    const handleToggle = () => {
      if (node.type !== 'value') {
        setIsExpanded(!isExpanded);
        onToggle(node.path); // Notify parent component
      }
    };

    const handleSelect = () => {
        onClick(node.path); // Notify parent component
    }

    // Unique ID for accessibility (aria-activedescendant)
    const nodeId = \`tree-node-\${node.path.replace(/[^a-zA-Z0-9]/g, '-')}\`;

    return (
      <li
        ref={nodeRef}
        id={nodeId} // Set ID
        tabIndex={isFocused ? 0 : -1} // Make focused node tabbable, others not directly
        role="treeitem" // ARIA role
        aria-expanded={node.type !== 'value' ? isExpanded : undefined} // ARIA state
        aria-level={node.path.split('.').length} // ARIA level (basic)
        aria-label={\`\${node.key}: \${node.type === 'value' ? node.value : node.type}\`} // Basic ARIA label
        onClick={handleSelect}
        onDoubleClick={handleToggle} // Example: double click to toggle
        className={\`cursor-pointer \${isFocused ? 'outline outline-blue-500' : ''}\`} // Visual focus indicator
      >
        <span onClick={handleToggle}>{node.type !== 'value' ? (isExpanded ? '▼' : '▶') : ''}</span>
        <strong>{node.key}:</strong> {node.type === 'value' ? String(node.value) : node.type}

        {node.children && isExpanded && (
          <ul role="group"> // ARIA group role for children
            {node.children.map(child => (
              // Child nodes need their own focus state management passed down
              // This is simplified - a real implementation would track focusedPath globally
              <JsonTreeNode
                 key={child.path}
                 node={child}
                 isFocused={false} // Simplified: Assume focus handled at top level
                 onToggle={onToggle}
                 onClick={onClick}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

const JsonTreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [treeData, setTreeData] = useState<JsonNode[]>(() => buildTreeNodes(data));
  const [focusedNodePath, setFocusedNodePath] = useState<string | null>(null);
  const treeRef = useRef<HTMLUListElement>(null);

  // Effect to set initial focus on the first node
  useEffect(() => {
      if (treeData.length > 0) {
          // Find the path of the first node
          const firstNodePath = treeData[0].path;
          setFocusedNodePath(firstNodePath);
      }
  }, [treeData]);


  const handleToggle = (path: string) => {
      // In a real app, you'd update the expansion state in the treeData state
      console.log('Toggle node:', path);
      // For this example, we just log and don't modify treeData
  };

  const handleSelect = (path: string) => {
       console.log('Node selected:', path);
       setFocusedNodePath(path); // Set focus on click
  }


  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (!focusedNodePath) return;

    // Logic to find next/previous/child/parent node based on key
    let nextFocusedPath = focusedNodePath;

    // --- Navigation Logic (Simplified) ---
    // This is the complex part - you need a function that, given
    // the current path, tree structure, and expanded states,
    // finds the path of the target node for ArrowUp/Down/Left/Right.

    // Example (highly simplified):
    if (event.key === 'ArrowDown') {
        // Find current node and its visible siblings/children
        // Get list of all visible nodes (expanded children included)
        const visibleNodes = getVisibleNodes(treeData, /* expanded states */); // Need a helper function
        const currentIndex = visibleNodes.findIndex(node => node.path === focusedNodePath);
        if (currentIndex < visibleNodes.length - 1) {
             nextFocusedPath = visibleNodes[currentIndex + 1].path;
        }
        event.preventDefault(); // Prevent default scroll
    } else if (event.key === 'ArrowUp') {
        const visibleNodes = getVisibleNodes(treeData, /* expanded states */);
        const currentIndex = visibleNodes.findIndex(node => node.path === focusedNodePath);
        if (currentIndex > 0) {
            nextFocusedPath = visibleNodes[currentIndex - 1].path;
        }
         event.preventDefault(); // Prevent default scroll
    }
    // Add logic for ArrowLeft, ArrowRight, Enter, Space, Home, End

    // --- End Navigation Logic ---


    if (nextFocusedPath !== focusedNodePath) {
        setFocusedNodePath(nextFocusedPath);
        // Optional: Scroll the new focused element into view
        const nextElement = treeRef.current?.querySelector(&#96;#tree-node-\${nextFocusedPath.replace(/[^a-zA-Z0-9]/g, '-')}&#96;);
        nextElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Helper function (needs full implementation based on tree structure and expansion state)
  const getVisibleNodes = (nodes: JsonNode[], expandedStateMap: { [path: string]: boolean }): JsonNode[] => {
      let visible: JsonNode[] = [];
      nodes.forEach(node => {
          visible.push(node);
          const isExpanded = expandedStateMap[node.path]; // Need actual state
          if (node.children && isExpanded) {
              visible = visible.concat(getVisibleNodes(node.children, expandedStateMap));
          }
      });
      return visible;
  };


  // You need to pass down the focusedNodePath and handle it in JsonTreeNode
  // The JsonTreeNode component needs to know if it is the currently focused one.
  // The root ul needs role="tree" and aria-activedescendant pointing to the focused node's ID.

  return (
    <div> {/* Wrapper div */}
       <p className="mb-4">Use arrow keys, Enter/Space to navigate the tree view below (example).</p>
      <ul
        ref={treeRef}
        role="tree" // ARIA role
        aria-activedescendant={focusedNodePath ? \`tree-node-\${focusedNodePath.replace(/[^a-zA-Z0-9]/g, '-')}\` : undefined} // ARIA state
        onKeyDown={handleKeyDown}
        className="border p-4 rounded-md dark:border-gray-700"
      >
        {treeData.map(node => (
          <JsonTreeNode
            key={node.path}
            node={node}
            isFocused={node.path === focusedNodePath} // Pass focus state
            onToggle={handleToggle} // Pass toggle handler
            onClick={handleSelect} // Pass select handler
          />
        ))}
      </ul>
    </div>
  );
};

// Example Usage (in your page component):
// import JsonTreeView from './JsonTreeView'; // Assuming the component is in JsonTreeView.tsx
// const myJsonData = { user: { name: "Alice", address: { city: "Wonderland" } }, items: ["apple", "banana"] };
// <JsonTreeView data={myJsonData} />

`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            <span className="font-medium">Explanation:</span>
            <br />
            1. The `JsonNode` interface defines the structure of tree nodes.
            <br />
            2. `buildTreeNodes` recursively converts raw JSON data into this structure.
            <br />
            3. `JsonTreeNode` is a recursive component rendering each node. It manages its own expanded state but
            receives its focus state (`isFocused`) and handlers from above. It uses `ref` and `useEffect` to
            programmatically focus itself when `isFocused` is true. It includes ARIA roles and states.
            <br />
            4. `JsonTreeView` is the main component. It holds the parsed `treeData` and the `focusedNodePath` state.
            <br />
            5. The `onKeyDown` handler in `JsonTreeView` is the core of navigation. It checks `event.key` and calculates
            the `nextFocusedPath` based on the current `focusedNodePath`, the tree structure, and the expansion state of
            nodes (this requires a helper function like `getVisibleNodes`).
            <br />
            6. `setFocusedNodePath` updates the state, which triggers re-renders. The `isFocused` prop is passed down,
            causing the relevant `JsonTreeNode` to receive focus programmatically.
            <br />
            7. ARIA attributes like `role=&quot;tree&quot;`, `role=&quot;treeitem&quot;`, `aria-expanded`, and
            `aria-activedescendant` are crucial for accessibility. `aria-activedescendant` on the container (`ul`) tells
            screen readers which item within the tree is currently focused, even if native browser focus (`tabIndex=0`)
            is only on the container or the actively selected item.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Key Implementation Challenges</h2>
        <p>
          While the concept is straightforward, implementing robust keyboard navigation in a dynamic tree view involves
          handling complexities:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Maintaining Visible Node List:</span> The order of nodes when navigating
              `ArrowDown` or `ArrowUp` depends on which parent nodes are expanded. You need an efficient way to
              determine the sequence of currently visible nodes.
            </li>
            <li>
              <span className="font-medium">Complex Navigation Logic:</span> The logic for `ArrowLeft` (finding the
              parent or collapsing) and `ArrowRight` (expanding or finding the first child) can be intricate, especially
              in deeply nested structures.
            </li>
            <li>
              <span className="font-medium">Scrolling Into View:</span> When focus moves to a node not currently visible
              in the viewport, you need to programmatically scroll the container to make it visible.
            </li>
            <li>
              <span className="font-medium">Performance:</span> For very large JSON structures, recalculating visible
              nodes or re-rendering large parts of the tree on every key press needs to be optimized.
            </li>
            <li>
              <span className="font-medium">ARIA Attributes:</span> Correctly applying ARIA roles and states
              (`role=&quot;tree&quot;`, `role=&quot;treeitem&quot;`, `aria-expanded`, `aria-level`, `aria-selected`,
              `aria-activedescendant`) is vital for screen reader users.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices</h2>
        <p>Follow these best practices for a better implementation:</p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use a single state variable (e.g., `focusedNodePath`) at the highest relevant level to manage which node is
            currently focused.
          </li>
          <li>
            Implement `onKeyDown` on the main container (`ul` or a wrapper div) and manage focus programmatically on the
            individual `li` elements.
          </li>
          <li>
            Set `tabIndex=&quot;0&quot;` only on the currently focused node, and `tabIndex=&quot;-1&quot;` on all other
            interactive nodes within the tree. Alternatively, use `aria-activedescendant` on the container and manage
            focus virtually without relying on native `tabIndex` on every item. The ARIA method is generally preferred
            for tree views.
          </li>
          <li>Prevent default browser actions for handled keys (e.g., using `event.preventDefault()`).</li>
          <li>
            Ensure a clear visual indicator for the focused element (e.g., an outline or background color change).
          </li>
          <li>Test thoroughly with keyboard-only navigation and screen readers.</li>
          <li>Consider adding shortcuts for common actions like expanding/collapsing all nodes.</li>
        </ul>

        <h2 className="2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Adding keyboard navigation to a JSON tree view significantly enhances its usability and makes it accessible to
          a wider range of users. While the implementation requires careful handling of focus and complex navigation
          logic, the benefits in terms of user experience and compliance are substantial. By focusing on core concepts
          like focus management, event handling, and proper ARIA usage, you can create a powerful and accessible tree
          view component. Remember to test your implementation rigorously to ensure it behaves as expected for all
          users.
        </p>
      </div>
    </>
  );
}
