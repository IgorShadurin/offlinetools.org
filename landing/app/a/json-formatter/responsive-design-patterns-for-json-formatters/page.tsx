import type { Metadata } from "next";
import {
  ChevronRight,
  ChevronDown,
  Table,
  Columns3,
  ScanSearch,
  Scissors,
  Info,
  Code,
  ListTree
} from "lucide-react";

export const metadata: Metadata = {
  title: "Responsive Design Patterns for JSON Formatters | Offline Tools",
  description:
    "Explore common responsive design patterns for displaying complex JSON data clearly and effectively across different screen sizes.",
};

export default function ResponsiveJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Responsive Design Patterns for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          Displaying structured data like JSON in a user-friendly way is a common requirement for developer tools, APIs, and data visualization platforms. JSON&apos;s hierarchical nature, especially with deeply nested objects and long arrays, poses a significant challenge when the display area shrinks, such as on mobile devices. A raw JSON string becomes illegible quickly. This article explores various design patterns to make JSON formatters responsive and usable on screens of all sizes.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Problem: JSON Complexity vs. Small Screens</h2>
        <p>
          JSON is excellent for data interchange but not inherently for direct human consumption, particularly when large or deeply nested. Key issues on small screens include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Horizontal Overflow:</strong> Long lines due to indentation and long values require excessive horizontal scrolling.</li>
          <li><strong>Vertical Clutter:</strong> Deep nesting creates a very long, overwhelming vertical scroll.</li>
          <li><strong>Finding Information:</strong> It&apos;s hard to locate specific keys or values within a large block of text.</li>
          <li><strong>Understanding Structure:</strong> The hierarchical relationships become difficult to follow.</li>
        </ul>
        <p>
          A responsive JSON formatter must address these issues by selectively displaying information and providing intuitive navigation and interaction methods.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Core Principles of Responsive JSON Display</h2>
        <p>
          Effective responsive design for JSON formatters revolves around these principles:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Hide Complexity:</strong> By default, show only essential information or structural outlines.
          </li>
          <li><strong>Prioritize Information:</strong> Ensure key names and potentially the first few values are visible.
          </li>
          <li><strong>Provide Navigation:</strong> Allow users to drill down into nested structures or switch between different data views.
          </li>
          <li><strong>Enable Interaction:</strong> Offer features like collapsing sections, searching, filtering, and copying values.
          </li>
          <li><strong>Adapt Layout:</strong> Change the arrangement of elements based on available screen width.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Responsive Design Patterns</h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <ListTree size={24} /> Accordion/Collapsible Tree View
        </h3>
        <p>
          This is perhaps the most common pattern. JSON structure is naturally represented as a tree. On larger screens, many levels might be expanded, but on smaller screens, most nodes are initially collapsed, showing only the top level or object/array summaries.
        </p>
        <p>
          Users interact by clicking on a node (object key or array index) to expand or collapse its contents. This significantly reduces vertical space requirements.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "user": {  // <--- Initially visible, can be clicked
    /* Collapsed Content */
    &lt;span className="text-gray-500 dark:text-gray-400"&gt;// Object with 3 keys&lt;/span&gt;
  },
  "products": [ // <--- Initially visible, can be clicked
    /* Collapsed Content */
    &lt;span className="text-gray-500 dark:text-gray-400"&gt;// Array with 5 items&lt;/span&gt;
  ],
  "isActive": true, // <--- Always visible (simple value)
  "tags": ["tech", "programming"] // <--- Can show partial or full array
}`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <ChevronRight size={18} /> Collapsed State, <ChevronDown size={18} /> Expanded State.
          </p>
        </div>
        <p>
          **Responsive Adaptation:** On small screens, default to showing very little, perhaps just the top-level keys and their types (Object, Array, String, Number, etc.). Expand only one level or node at a time.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Columns3 size={24} /> Master-Detail View
        </h3>
        <p>
          This pattern is particularly useful when dealing with JSON that represents a list of items, such as an array of objects (`&#x5b;&#x7b;...&#x7d;, &#x7b;...&#x7d;, ...&#x5d;`).
        </p>
        <p>
          **On Larger Screens:** A sidebar (Master) displays a list of the main items (e.g., array indices, or a key property from each object). The main area (Detail) shows the full formatted JSON content for the currently selected item.
        </p>
        <p>
          **On Smaller Screens:** The layout changes dramatically. Initially, only the Master list view is shown, taking up the full screen width. When an item is selected from the list, the view transitions (or a modal/slide-in panel appears) to show the Detail view for that single item, also taking up the full screen. A &quot;back&quot; action returns to the Master list.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Structure:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                    {`// JSON: [{ id: 1, ... }, { id: 2, ... }, ...]

{/* Large Screen Layout (Flex or Grid) */}
&lt;div className="flex"&gt;
    {/* Master Panel */}
    &lt;div className="w-1/3"&gt;{/* List of item summaries (e.g., "Item 1", "Item 2") */}&lt;/div&gt;
    {/* Detail Panel */}
    &lt;div className="w-2/3"&gt;{/* Formatted JSON for selected item */}&lt;/div&gt;
&lt;/div&gt;

{/* Small Screen Layout (Stacking or Conditional Rendering) */}
&lt;div className="block"&gt;
    {/* Initially Render Master List (full width) */}
    {/* On item click, hide Master and Render Detail (full width) */}
    &lt;div className="w-full"&gt;{/* Either list or detail */}&lt;/div&gt;
&lt;/div&gt;`}
                </pre>
            </div>
        </div>
        <p>
          **Responsive Adaptation:** Toggle visibility or adjust layout direction/width based on breakpoints.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Table size={24} /> Tabbed or Segmented Views
        </h3>
        <p>
          If your JSON formatter needs to display related but distinct pieces of data (e.g., an API response that includes request details, response headers, and the response body), tabs or segmented controls can be effective.
        </p>
        <p>
          Each tab displays a different section of the JSON or related data. This is less about the tree structure of a single JSON blob and more about organizing multiple related JSON or data snippets.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Structure:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                    {`{/* Tab Headers */}
&lt;div className="flex justify-center"&gt; {/* Or horizontal scroll on small screen */}
    &lt;button className="tab-button active"&gt;Body&lt;/button&gt;
    &lt;button className="tab-button"&gt;Headers&lt;/button&gt;
    &lt;button className="tab-button"&gt;Details&lt;/button&gt;
&lt;/div&gt;

{/* Tab Content Area */}
&lt;div className="tab-content"&gt;
    {/* Conditionally render content for the active tab */}
    &lt;div className="active-tab-pane"&gt;{/* Formatted JSON Body */}&lt;/div&gt;
    &lt;div className="hidden-tab-pane"&gt;{/* Formatted JSON Headers */}&lt;/div&gt;
    &lt;div className="hidden-tab-pane"&gt;{/* Formatted JSON Details */}&lt;/div&gt;
&lt;/div&gt;`}
                </pre>
            </div>
        </div>
        <p>
          **Responsive Adaptation:** Ensure tab headers are scrollable horizontally or stack if there are many. Ensure content within tabs uses other responsive patterns (like collapsing).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <ScanSearch size={24} /> Search and Filter
        </h3>
        <p>
          For very large JSON documents, navigating through collapsing sections alone can be inefficient. Adding search and filtering capabilities allows users to quickly find relevant parts of the data.
        </p>
        <p>
          **Implementation:** A search input allows users to type key names or values. The formatter then highlights matching parts and potentially automatically expands the necessary tree nodes to make the matches visible. Filtering could hide non-matching sections entirely.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Structure:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                    {`{/* Search Input */}
&lt;div className="mb-4"&gt;
    &lt;input type="text" placeholder="Search keys or values..." className="border p-2 rounded w-full" /&gt;
&lt;/div&gt;

{/* JSON Tree View (with highlighting/filtering based on search) */}
&lt;div className="json-formatter-tree"&gt;
    {/* Render nodes, add class="highlight" if matches search */}
    {/* Conditionally hide nodes if filtered */}
&lt;/div&gt;`}
                </pre>
            </div>
        </div>
        <p>
          **Responsive Adaptation:** Place the search bar prominently near the top. Ensure highlighted matches are brought into view even on small screens.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Scissors size={24} /> Truncation with Detail on Demand
        </h3>
        <p>
          Long string values, URLs, or encoded data can consume a lot of horizontal space. Truncating these values and providing a way to view the full content is crucial for responsiveness.
        </p>
        <p>
          **Implementation:** Display only the beginning of a long value, followed by an ellipsis (`...`). On hover or click, reveal the full value in a tooltip, popover, modal, or dedicated detail panel.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Conceptual Structure:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                    {`{
  "long_text": "This is a very long string value that needs to be truncated..." &lt;span className="text-gray-500 dark:text-gray-400"&gt;// Show "This is a very long string..."&lt;/span&gt;
}`}
                </pre>
            </div>
        </div>
        <p>
          **Responsive Adaptation:** Truncate more aggressively on smaller screens. Ensure the method for viewing the full value works well on touch devices (e.g., click instead of hover).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <Code size={24} /> Raw View Toggle
        </h3>
        <p>
          Sometimes, developers just need to see the raw, unformatted JSON text for easy copying or debugging. Providing a toggle button to switch between the formatted, interactive view and the raw text view is a simple yet effective pattern.
        </p>
        <p>
          **Responsive Adaptation:** This pattern works well on any screen size. The raw text view might benefit from horizontal scrolling on smaller screens, while the formatted view utilizes the patterns described above.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementation Considerations</h2>
        <p>
          When building a responsive JSON formatter, keep these points in mind:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Performance:</strong> Parsing and rendering very large JSON (MBs) can be slow, especially on less powerful mobile devices. Consider virtualizing long lists or rendering nested sections lazily as they are expanded.</li>
          <li><strong>State Management:</strong> Keep track of which nodes are expanded/collapsed. While this page avoids dynamic state with useState, a real implementation would need a mechanism (like React context, Redux, or component state) to manage the tree&apos;s expansion state and potentially search/filter states.</li>
          <li><strong>Accessibility:</strong> Ensure keyboard navigation is possible for collapsing/expanding nodes and interacting with other controls. Provide sufficient contrast and consider screen reader compatibility.</li>
          <li><strong>User Experience:</strong> Implement smooth transitions (though not shown here), provide clear visual cues for interactive elements, and handle errors gracefully (e.g., invalid JSON).</li>
          <li><strong>Customization:</strong> Allow users to configure indentation levels, choose themes (light/dark), or toggle specific features.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Combining Patterns</h2>
        <p>
          The most effective responsive JSON formatters often combine several of these patterns. For example:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use a Collapsible Tree View as the primary display.</li>
          <li>Add a Search/Filter bar above the tree.</li>
          <li>Implement Truncation for long values within the tree nodes.</li>
          <li>For top-level arrays, switch to a Master-Detail layout on smaller screens.</li>
          <li>Include a Raw View toggle.</li>
        </ul>
        <p>
          The specific combination will depend on the typical structure and size of the JSON you expect to display and the context of your application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <Info size={24} /> Conclusion
        </h2>
        <p>
          Responsive design is not just about making text fit on a small screen; it&apos;s about adapting the user interface and interaction model to the available display area and input methods (mouse/keyboard vs. touch). For JSON formatters, this means moving beyond simple text wrapping to implementing structural patterns like collapsible trees, master-detail views, and selective display of information. By applying these patterns, developers can create JSON formatters that are powerful and usable, regardless of the device.
        </p>
      </div>
    </>
  );
}