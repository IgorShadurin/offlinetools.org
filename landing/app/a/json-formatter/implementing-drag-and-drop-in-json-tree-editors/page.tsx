import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Drag-and-Drop in JSON Tree Editors | Offline Tools",
  description:
    "Learn how to add intuitive drag-and-drop functionality to JSON tree editors for easier data manipulation.",
};

export default function ImplementingDragDropJsonTreeEditorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Implementing Drag-and-Drop in JSON Tree Editors
      </h1>

      <div className="space-y-6">
        <p>
          JSON tree editors provide a visual representation of JSON data, making it easier to navigate and
          understand complex structures. Adding drag-and-drop functionality takes this usability to the next
          level, allowing users to intuitively reorder array elements, move properties between objects, or
          restructure the data with simple gestures. This guide explores the core concepts and steps involved
          in implementing drag-and-drop within a JSON tree editor.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Drag-and-Drop?</h2>
        <p>
          Drag-and-drop significantly enhances the user experience in a JSON editor by:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Improving Efficiency:</span> Users can quickly reorganize large
            datasets without manual cutting and pasting or complex form interactions.
          </li>
          <li>
            <span className="font-medium">Enhancing Intuitiveness:</span> The action of dragging and dropping
            closely mimics physical object manipulation, making the interface easier to learn and use.
          </li>
          <li>
            <span className="font-medium">Visualizing Changes:</span> Users get immediate visual feedback on
            where the dragged item will be placed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Core Technologies: HTML Drag and Drop API</h2>
        <p>
          The native HTML Drag and Drop API is the foundation for implementing this feature in web applications.
          It relies on a series of DOM events fired during the drag operation.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key Drag and Drop Events:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <code>draggable</code> attribute: Applied to an element to make it draggable (e.g.,
              <code>&lt;div draggable="true"&gt;&lt;/div&gt;</code>).
            </li>
            <li>
              <code>dragstart</code>: Fired when the user starts dragging an element. You typically set the
              data to be transferred here using <code>event.dataTransfer.setData()</code>.
            </li>
            <li>
              <code>dragover</code>: Fired when a dragged element is over a valid drop target. You must call
              <code>event.preventDefault()</code> in this handler to allow dropping.
            </li>
            <li>
              <code>dragleave</code>: Fired when a dragged element leaves a valid drop target. Useful for
              removing visual drop indicators.
            </li>
            <li>
              <code>drop</code>: Fired when the dragged element is dropped on a valid drop target. You retrieve
              the transferred data here using <code>event.dataTransfer.getData()</code>.
            </li>
            <li>
              <code>dragend</code>: Fired when the drag operation ends (either by dropping or cancelling).
              Useful for cleanup like removing the drag source's temporary styling.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementation Steps</h2>

        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">Identify Draggable Elements</li>
          <p className="text-sm -mt-2">
            Determine which parts of your JSON tree nodes can be dragged (e.g., the key name, a specific
            icon). Add the <code>draggable="true"</code> attribute to these elements.
          </p>

          <li className="font-medium">Handle <code>dragstart</code></li>
          <p className="text-sm -mt-2">
            When dragging begins, store information about the dragged item. This is typically the item's path
            or ID within the JSON structure. Use <code>event.dataTransfer.setData(format, data)</code>, for
            example, <code>event.dataTransfer.setData('application/json-path', '/path/to/item')</code>. You
            might also set the drag image here if needed.
          </p>

          <li className="font-medium">Identify Drop Targets</li>
          <p className="text-sm -mt-2">
            Determine where items can be dropped. In a tree editor, this could be:
            <ul className="list-circle pl-6 mt-1">
              <li>Between sibling nodes (to reorder).</li>
              <li>Onto a parent node (to add as a child property/element).</li>
            </ul>
            You'll need to add event listeners for <code>dragover</code>, <code>dragleave</code>, and{" "}
            <code>drop</code> to these potential target elements.
          </p>

          <li className="font-medium">Handle <code>dragover</code></li>
          <p className="text-sm -mt-2">
            This is crucial. Call <code>event.preventDefault()</code> in the{" "}
            <code>dragover</code> handler of your drop targets. This tells the browser that the target is
            valid for dropping. You can also add visual cues here (e.g., highlighting the drop zone).
          </p>

          <li className="font-medium">Handle <code>drop</code></li>
          <p className="text-sm -mt-2">
            When an item is dropped, retrieve the data using{" "}
            <code>event.dataTransfer.getData(format)</code>. Use this data (e.g., the source path) and the
            target information (the drop location) to update your underlying JSON data structure.
          </p>

          <li className="font-medium">Update the JSON Data</li>
          <p className="text-sm -mt-2">
            This is the core logic. Based on the source and target, manipulate your JSON object or array. This
            typically involves removing the item from its original location and inserting it into the new
            location. Use state management (like React's <code>useState</code> or a library) to trigger a re-render
            of the tree.
          </p>

          <li className="font-medium">Handle <code>dragend</code></li>
          <p className="text-sm -mt-2">
            Perform any necessary cleanup, such as removing temporary styles applied to the dragged item or
            drop targets.
          </p>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Example Structure (React/TSX)</h2>
        <p>
          Below is a simplified representation of how drag and drop events might be handled in a React/TSX
          component representing a single JSON tree node. This focuses on the event handlers. The actual JSON
          manipulation logic would be handled by a function passed down from a parent component managing the
          entire JSON state.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`interface JsonNodeProps {
  data: any; // Represents the data at this node
  path: string; // Unique path/identifier for this node
  onMoveItem: (sourcePath: string, targetPath: string, dropPosition: 'before' | 'after' | 'child') => void;
  // Other props like keyName, isExpanded, etc.
}

function JsonNode({ data, path, onMoveItem }: JsonNodeProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation(); // Prevent parent nodes from also starting drag
    event.dataTransfer.setData('application/json-path', path);
    event.dataTransfer.effectAllowed = 'move';
    // Optional: add a class for visual feedback on the dragged item
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Essential to allow dropping
    event.stopPropagation();
    // Optional: add visual indication to the drop target based on drop position
    // You might need to calculate where exactly the drop will occur (before/after/child)
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      // Optional: remove visual indication from the drop target
  };


  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Essential
    event.stopPropagation();
    const sourcePath = event.dataTransfer.getData('application/json-path');
    if (!sourcePath || sourcePath === path) {
        // Don't drop onto self or if no data
        return;
    }

    // Determine drop position (e.g., based on mouse position relative to target element)
    const dropPosition = 'after'; // Simplified: always drop after for this example
    onMoveItem(sourcePath, path, dropPosition);

    // Optional: remove visual indication from the drop target
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
      event.stopPropagation();
      // Optional: remove temporary class from the dragged item
  }

  return (
    <div
      draggable="true" // Make the node draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver} // Enable dropping onto this node or space around it
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className="json-node" // Apply styling
      // Add logic to render key, value, and children nodes recursively
    >
      <span className="json-key">{/* Key Name */}</span>: <span className="json-value">{/* Value */}</span>
      {/* Render children nodes recursively */}
    </div>
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This example illustrates attaching event handlers to a draggable element and a potential drop target.
            The complexity lies in the <code>onMoveItem</code> function, which needs to correctly update the
            state of the main JSON object based on the source and target paths and the precise drop location.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Challenges and Considerations</h2>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Determining Drop Location:</span> Precisely calculating whether a drop
            is intended to be *before* a node, *after* a node, or *as a child* of a node requires careful handling
            of the <code>dragover</code> event's mouse position relative to the target element's boundaries.
          </li>
          <li>
            <span className="font-medium">Visual Feedback:</span> Providing clear visual cues during the drag
            (e.g., indicating the dragged item, highlighting valid drop zones, showing insertion lines) is crucial
            for usability.
          </li>
          <li>
            <span className="font-medium">Complex Data Structures:</span> Handling moves between different types
            (e.g., moving a property from an object into an array, or vice versa) requires robust validation and
            transformation logic.
          </li>
          <li>
            <span className="font-medium">Large Datasets:</span> Performance can be an issue with very large JSON
            trees, both in rendering and state updates during drag operations.
          </li>
          <li>
            <span className="font-medium">Accessibility:</span> Ensure there are keyboard alternatives for
            reordering and moving elements for users who cannot use drag-and-drop.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Libraries</h2>
        <p>
          While the native HTML Drag and Drop API is powerful, handling all edge cases and providing smooth
          visuals can be complex. Libraries like <code>react-dnd</code> or <code>react-beautiful-dnd</code> (for lists)
          abstract away much of the low-level DOM interaction and provide higher-level components and hooks,
          simplifying the implementation process, especially in React applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing drag-and-drop functionality significantly enhances the user experience of JSON tree
          editors, making data manipulation more intuitive and efficient. By leveraging the HTML Drag and Drop
          API and carefully handling the sequence of events and state updates, you can build a powerful and
          user-friendly interface. While there are challenges, particularly in handling complex drop logic and
          providing clear visual feedback, the investment can lead to a much more capable editor. Consider using
          existing libraries to streamline development if building on top of frameworks like React.
        </p>
      </div>
    </>
  );
}