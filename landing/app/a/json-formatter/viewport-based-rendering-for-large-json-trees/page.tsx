import type { Metadata } from "next";
import { Database, ScrollText, Eye, Zap, FolderTree, AlertCircle, List } from "lucide-react";

export const metadata: Metadata = {
  title: "Viewport-Based Rendering for Large JSON Trees | Offline Tools",
  description:
    "Explore techniques for efficiently rendering large JSON data structures using viewport-based virtualization, focusing on performance and user experience.",
};

// Note: This component describes a client-side rendering technique.
// Due to the constraint of not using "use client" or useState,
// it focuses on explaining the *principles* and *logic* rather than
// providing a runnable, interactive component implementation.
// A real-world interactive tree component using this technique
// would require client-side hooks and event handling.

export default function ViewportBasedJsonTreeRendering() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Eye className="w-8 h-8" />
        <span>Viewport-Based Rendering for Large JSON Trees</span>
      </h1>

      <div className="space-y-6">
        <p>
          Dealing with large or deeply nested JSON data is common in modern web applications, especially when building
          debugging tools, data explorers, or complex configuration editors. Displaying these large JSON structures
          directly in a standard UI component often leads to significant performance issues, including slow rendering,
          janky scrolling, and high memory consumption. This is where <strong>Viewport-Based Rendering</strong>, also
          known as Virtualization or Windowing, becomes essential.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Database className="w-6 h-6" />
          <span>The Problem with Rendering Large Data</span>
        </h2>
        <p>
          When you try to render a very large list or tree (like a massive JSON object or array) using traditional
          methods, the browser attempts to create and render a DOM node for *every single item* in the data structure.
          Consider a JSON tree with tens of thousands of properties or array items, potentially nested several levels
          deep.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Zap className="inline-block mr-2 w-4 h-4 text-yellow-500" />
            <strong>Performance Lag:</strong> Creating and managing thousands of DOM elements is computationally
            expensive, leading to slow initial load times and unresponsive interactions.
          </li>
          <li>
            <List className="inline-block mr-2 w-4 h-4 text-red-500" />
            <strong>Memory Issues:</strong> Each DOM node consumes memory. A large number of nodes can quickly exceed
            available memory, especially on devices with limited resources, potentially crashing the tab.
          </li>
          <li>
            <ScrollText className="inline-block mr-2 w-4 h-4 text-blue-500" />
            <strong>Scrolling Jank:</strong> The browser constantly recalculates layout and paints pixels as you scroll,
            which becomes noticeable and laggy when the number of elements is high.
          </li>
        </ul>
        <p>
          For a JSON tree specifically, the nesting adds complexity. Expanding a node might reveal thousands of child
          nodes, instantly triggering the performance issues mentioned above.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Eye className="w-6 h-6" />
          <span>What is Viewport-Based Rendering?</span>
        </h2>
        <p>
          Viewport-based rendering is a technique that optimizes the rendering of long lists or complex structures by
          rendering <strong>only the items that are currently visible within the user&apos;s viewport</strong> (the
          visible area of the browser window or a scrollable container). As the user scrolls, new items are rendered
          just before they become visible, and items that move out of the viewport are removed or recycled.
        </p>
        <p>
          Think of it like looking through a window at a very long wall covered in pictures. Instead of hanging up *all*
          the pictures at once, you only hang the ones you can see through the window. As you slide the window along the
          wall, you quickly hang up new pictures on one edge just before they enter the view and take down the ones that
          leave the view on the other edge.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FolderTree className="w-6 h-6" />
          <span>Applying to JSON Trees</span>
        </h2>
        <p>
          Applying virtualization to a JSON tree structure involves several key considerations beyond a simple flat
          list:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Hierarchy:</strong> The nested nature means items have parent/child relationships. Expanding or
            collapsing a node changes which descendants are &quot;visible&quot; in the conceptual list of rendered
            items.
          </li>
          <li>
            <strong>Variable Heights:</strong> Unlike many virtualized lists where items have fixed heights, the height
            of a JSON tree node representation (showing key, value, maybe array length, expand/collapse toggle) can
            vary. Objects and arrays take more space than primitives. Expanded nodes consume significantly more vertical
            space.
          </li>
          <li>
            <strong>State Management:</strong> You need to track the expanded/collapsed state of each node, which
            directly affects the total &quot;scrollable&quot; height of the tree and which nodes are potentially
            visible.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Core Concepts for Tree Virtualization:</h3>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Flattened Representation:</strong> Internally, the tree structure is often represented as a
            flattened list of nodes that are currently &quot;visible&quot; in the *expanded* sense (i.e., not
            descendants of a collapsed node). Each item in this list would include metadata like its depth, whether
            it&apos;s expandable, and its expanded state.
          </li>
          <li>
            <strong>Dynamic List Calculation:</strong> As nodes are expanded or collapsed, this flattened list is
            updated.
          </li>
          <li>
            <strong>Height Calculation/Estimation:</strong> For each item in the flattened list, its height needs to be
            known or estimated. Actual measurement is most accurate but can be slow; estimation (e.g., based on type or
            depth) is faster but requires handling inaccuracies.
          </li>
          <li>
            <strong>Scroll Position Tracking:</strong> Listen to the scroll event of the container.
          </li>
          <li>
            <strong>Visible Range Calculation:</strong> Based on the scroll position and the container&apos;s height,
            determine which items from the flattened list that are within the [scrollTop, scrollTop + clientHeight]
            range. This requires knowing the cumulative height of items above the viewport.
          </li>
          <li>
            <strong>Rendering Subset:</strong> Render only the items within the visible range (plus perhaps a few buffer
            items above and below the viewport to ensure smooth scrolling).
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Zap className="w-6 h-6" />
          <span>Implementation Logic (Conceptual)</span>
        </h2>
        <p>
          While a full, interactive implementation is complex and requires client-side state management (like
          React&apos;s `useState` or a library), the core logic involves:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Data Structure & State:</h3>
        <p>
          Represent the JSON data. Alongside the data, maintain a map or set of node paths/keys that are currently
          expanded.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Conceptual Data & State Structure:</h3>
          <pre>
            {`type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue; }
interface JsonArray extends Array<JsonValue> {}

// Example: JSON Data
const largeJsonData = { ... };

// Example: State tracking which nodes are expanded (conceptually, would use useState or similar)
// const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set()); // Set of unique node identifiers/paths
`}
          </pre>
        </div>
        <p>
          Expanding or collapsing a node would conceptually involve adding or removing its identifier from this
          `expandedNodes` set.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Generating the &quot;Render List&quot;:</h3>
        <p>
          Create a function that traverses the JSON data. It adds a node to the &quot;render list&quot; if it&apos;s a
          root node OR if its parent is in the `expandedNodes` set. For each node added, capture necessary rendering
          information (type, key/index, value preview, depth, whether it&apos;s expandable, its unique ID/path).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Conceptual Render List Generation:</h3>
          <pre>
            {`interface RenderNode {
  id: string; // Unique path like "items[5].details"
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  keyOrIndex: string | number | null;
  valuePreview: string; // e.g., "${"&#x7b;"}...${"&#x7d;"}", "[...]", "hello", 123, "true", "null"
  depth: number;
  isExpandable: boolean;
  isExpanded: boolean; // Check against the conceptual expandedNodes state
  // Add estimated/measured height later
}

function buildRenderList(data: JsonValue, expandedNodes: Set<string>, parentId: string | null = null, depth = 0): RenderNode[] {
  const list: RenderNode[] = [];

  // Helper to process a single node (recursive)
  const processNode = (value: JsonValue, keyOrIndex: string | number | null, currentId: string) => {
    const type = Array.isArray(value) ? 'array' : typeof value === 'object' && value !== null ? 'object' : typeof value;
    const isExpandable = type === 'object' || type === 'array';
    const isExpanded = isExpandable && expandedNodes.has(currentId);
    const valuePreview = isExpandable ? (type === 'object' ? '${"&#x7b;"}...${"&#x7d;"}' : '[...]') : String(value);

    list.push({
      id: currentId,
      type,
      keyOrIndex,
      valuePreview,
      depth,
      isExpandable,
      isExpanded,
    });

    // If expanded and expandable, process children recursively
    if (isExpanded && isExpandable) {
      if (type === 'object') {
        for (const key in value as JsonObject) {
          processNode((value as JsonObject)[key], key, \`\${currentId}.\${key}\`);
        }
      } else { // Array
        for (let i = 0; i < (value as JsonArray).length; i++) {
          processNode((value as JsonArray)[i], i, \`\${currentId}[\${i}]\`);
        }
      }
    }
  };

  // Start processing from the root (handle object or array root)
  if (typeof data === 'object' && data !== null) {
     processNode(data, null, 'root'); // Start with a root ID
  } else {
      // Handle primitive root if necessary, though typically JSON root is object/array
      list.push({
          id: 'root',
          type: typeof data as any, // Be more specific in real code
          keyOrIndex: null,
          valuePreview: String(data),
          depth: 0,
          isExpandable: false,
          isExpanded: false,
      });
  }


  return list;
}

// Conceptual usage:
// const renderList = buildRenderList(largeJsonData, expandedNodes);
`}
          </pre>
        </div>
        <p>
          This `renderList` now represents all nodes that *could* be displayed if scrolling allowed, respecting the
          current expanded state.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Calculating Item Positions and Total Height:</h3>
        <p>
          Iterate through the `renderList`. For each item, determine its height. Store the cumulative height up to that
          item. The cumulative height of the last item is the total scrollable height of the virtualized container.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Conceptual Height Calculation:</h3>
          <pre>
            {`// Needs actual rendering or estimation to get height
function getItemHeight(node: RenderNode): number {
  // This is the tricky part!
  // Could return a fixed estimate (e.g., 25px per line)
  // Or measure rendered nodes (more complex)
  // Or use libraries that handle this
  let estimatedHeight = 25; // Base height for a line
  if (node.isExpandable) estimatedHeight += 5; // Add space for toggle

  // Factor in depth for indentation (might not add height but affects layout)
  // Indentation logic would be in rendering
  // const indentation = node.depth * 20; // Example indentation

  return estimatedHeight; // Return the calculated/estimated height
}

// Function to add height and position info to renderList
function addHeightAndPosition(renderList: RenderNode[]): (RenderNode & { top: number; height: number })[] {
    let currentTop = 0;
    const positionedList = renderList.map(node => {
        const height = getItemHeight(node); // Use estimation or measurement
        const top = currentTop;
        currentTop += height;
        return { ...node, top, height };
    });
    // The total height is currentTop at the end
    // Need to store this total height for the scroll container
    return positionedList;
}

// Conceptual usage:
// const positionedRenderList = addHeightAndPosition(renderList);
// const totalHeight = positionedRenderList.length > 0 ? positionedRenderList[positionedRenderList.length - 1].top + positionedRenderList[positionedRenderList.length - 1].height : 0;
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Determining Visible Items:</h3>
        <p>
          When the scroll container scrolls, get the `scrollTop` and the container&apos;s `clientHeight`. Use the
          calculated heights and positions to find the range of items in `positionedRenderList` that are within the
          [scrollTop, scrollTop + clientHeight] range. Add a buffer zone.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Conceptual Visible Range Calculation:</h3>
          <pre>
            {`// Assume we have the positionedRenderList and totalHeight, and scroll/container info
// const containerRef = useRef<HTMLDivElement>(null);
// const [scrollTop, setScrollTop] = useState(0); // Conceptual scroll state
// const containerHeight = containerRef.current?.clientHeight || 0;

function getVisibleItems(positionedRenderList: (RenderNode & { top: number; height: number })[], scrollTop: number, containerHeight: number, buffer = 100): (RenderNode & { top: number; height: number })[] {
  const visibleStart = scrollTop - buffer;
  const visibleEnd = scrollTop + containerHeight + buffer;

  // Find the index range of visible items
  let startIndex = -1;
  let endIndex = -1;

  // Binary search could be faster for finding startIndex
  for (let i = 0; i < positionedRenderList.length; i++) {
    const item = positionedRenderList[i];
    if (item.top + item.height > visibleStart && startIndex === -1) {
      startIndex = i;
    }
    if (item.top < visibleEnd) {
      endIndex = i;
    }
  }

  if (startIndex === -1 || endIndex === -1) return []; // No items visible

  // Return the slice of items
  return positionedRenderList.slice(startIndex, endIndex + 1);
}

// Conceptual usage within a scroll handler or effect:
// const visibleItems = getVisibleItems(positionedRenderList, scrollTop, containerHeight);
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Rendering:</h3>
        <p>
          Render a container element with a fixed height set to the `totalHeight` calculated earlier. Inside this
          container, render *only* the `visibleItems`. Position each visible item absolutely or relatively based on its
          calculated `top` value.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Conceptual Rendering Structure:</h3>
          <pre>
            {`// Assume totalHeight, visibleItems are calculated
// Assume an onToggleExpand function exists (conceptually updates expandedNodes state)

function JsonTreeRenderer({ data, expandedNodes, onToggleExpand }: {
    data: JsonValue;
    expandedNodes: Set<string>; // Conceptual prop
    onToggleExpand: (nodeId: string) => void; // Conceptual prop
}) {
  const renderList = buildRenderList(data, expandedNodes);
  const positionedRenderList = addHeightAndPosition(renderList);
  const totalHeight = positionedRenderList.length > 0 ? positionedRenderList[positionedRenderList.length - 1].top + positionedRenderList[positionedRenderList.length - 1].height : 0;

  // Need a ref to the scroll container and state for scrollTop and containerHeight
  // const containerRef = useRef<HTMLDivElement>(null);
  // const [scrollTop, setScrollTop] = useState(0);
  // const containerHeight = useContainerHeight(containerRef); // Custom hook or state update on resize

  // const visibleItems = useMemo(() =>
  //    getVisibleItems(positionedRenderList, scrollTop, containerHeight),
  //    [positionedRenderList, scrollTop, containerHeight]
  // );

  return (
    // The container needs overflow-y: auto and a set height
    // The inner div needs height: totalHeight to enable scrolling
    // This structure is conceptual for virtualization
    <div style={{ height: '500px', overflowY: 'auto', position: 'relative' }}>
      <div style={{ height: totalHeight + 'px' }}>
        {/* Map over only the visible items */}
        {/*
        {visibleItems.map(item => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.top + 'px',
              height: item.height + 'px',
              left: 0,
              right: 0,
              paddingLeft: item.depth * 20 + 'px', // Example indentation
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              borderBottom: '1px solid #eee', // Optional separator
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item.isExpandable && (
              <button onClick={() => onToggleExpand(item.id)} className="mr-2">
                 {item.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            <span className="font-mono text-sm">
              {item.keyOrIndex !== null && <span className="text-gray-600 dark:text-gray-400 mr-1">{item.keyOrIndex}:</span>}
              <span className={\`font-bold \${item.type === 'object' || item.type === 'array' ? 'text-blue-600 dark:text-blue-400' : ''}\`}>{item.valuePreview}</span>
            </span>
          </div>
        ))}
        */}
         <p><em>(Interactive rendering requires client-side state and hooks, not possible in this server component example. The code above is illustrative of the *logic*.)</em></p>
      </div>
    </div>
  );
}
`}
          </pre>
        </div>
        <p>
          The rendered items are positioned absolutely within a container whose height mimics the total height of the
          full, expanded tree. This allows the native scrollbar to work correctly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Zap className="w-6 h-6" />
          <span>Benefits</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Zap className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Improved Performance:</strong> Significantly reduces the number of DOM elements, leading to faster
            rendering and smoother interactions.
          </li>
          <li>
            <List className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Reduced Memory Usage:</strong> Less DOM means less memory consumed by the browser.
          </li>
          <li>
            <ScrollText className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Smooth Scrolling:</strong> Fewer elements to render and update during scrolling results in a much
            better user experience.
          </li>
          <li>
            <Eye className="inline-block mr-2 w-4 h-4 text-green-500" />
            <strong>Scalability:</strong> Can handle extremely large JSON structures that would be impossible to render
            otherwise.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertCircle className="w-6 h-6" />
          <span>Drawbacks and Considerations</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Complexity:</strong> Implementing virtualization, especially with variable item heights and tree
            structures, is significantly more complex than simple rendering.
          </li>
          <li>
            <strong>State Management:</strong> Managing the expanded state and scroll position adds overhead.
          </li>
          <li>
            <strong>Scrolling Quirks:</strong> If item heights are estimated inaccurately, scrolling might feel slightly
            jumpy as actual heights are measured and adjustments are made (common in advanced libraries).
          </li>
          <li>
            <strong>Accessibility:</strong> Ensuring proper accessibility (e.g., keyboard navigation, screen reader
            compatibility) can require extra effort compared to standard DOM rendering.
          </li>
        </ul>
        <p>
          Due to the inherent complexity and the stateful nature of tracking scroll position and expanded nodes,
          viewport-based rendering for JSON trees is typically implemented using client-side JavaScript frameworks (like
          React, Vue, Svelte) and often relies on dedicated virtualization libraries (like `react-virtualized`,
          `react-window`, `@tanstack/react-virtual`).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FolderTree className="w-6 h-6" />
          <span>Conclusion</span>
        </h2>
        <p>
          Viewport-based rendering is a powerful and necessary technique for displaying large JSON trees efficiently in
          web applications. By rendering only the visible portion of the data structure, it drastically improves
          performance, reduces memory usage, and provides a smoother user experience. While the implementation is more
          involved than simple list rendering, the benefits for handling large datasets make it an indispensable pattern
          for building responsive and scalable data visualization components. Understanding the core principles of
          flattening the tree, calculating heights, tracking scroll, and rendering a dynamic subset is key to
          implementing or utilizing virtualized tree components effectively.
        </p>
      </div>
    </>
  );
}
