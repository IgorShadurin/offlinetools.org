import type { Metadata } from "next";
// useState not used after our changes
// import { useState } from "react";

export const metadata: Metadata = {
  title: "Implementing Tabs for Multiple JSON Documents | Offline Tools",
  description: "Learn how to implement a tabbed interface to manage and view multiple JSON documents simultaneously.",
};

// This data is for illustrative purposes only and not actually used in the rendered article
/*
interface JsonTab {
  id: string;
  title: string;
  content: string; // The JSON string
}

const initialTabs: JsonTab[] = [
  {
    id: "tab-1",
    title: "User Data",
    content: `{
  "id": 101,
  "name": "Alice",
  "isActive": true,
  "roles": ["user", "editor"]
}`,
  },
  {
    id: "tab-2",
    title: "Product List",
    content: `{
  "products": [
    {
      "sku": "ABC-123",
      "name": "Widget",
      "price": 19.99
    },
    {
      "sku": "XYZ-456",
      "name": "Gadget",
      "price": 99.50
    }
  ],
  "total": 2
}`,
  },
  {
    id: "tab-3",
    title: "Configuration",
    content: `{
  "appSettings": {
    "version": "1.5",
    "theme": "dark",
    "notificationsEnabled": false
  }
}`,
  },
];
*/

export default function ImplementingJsonTabsArticle() {
  // Example representation only, not used in the actual article content
  // const [activeTab, setActiveTab] = useState(initialTabs[0].id);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Tabs for Multiple JSON Documents</h1>

      <div className="space-y-6">
        <p>
          Working with multiple JSON documents simultaneously can quickly become cumbersome, especially when comparing
          data, referencing configurations, or managing different API responses. Implementing a tabbed interface
          provides an intuitive way to organize and switch between various JSON inputs, significantly improving workflow
          and clarity.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Use Tabs for JSON Documents?</h2>
        <p>
          Tabs are a familiar UI pattern that helps users manage multiple contexts within a single window. For JSON
          editing and viewing tools, tabs offer several key benefits:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Organization:</span> Keep related or unrelated JSON snippets separate but
              easily accessible.
            </li>
            <li>
              <span className="font-medium">Comparison:</span> Quickly switch between documents to compare values or
              structures.
            </li>
            <li>
              <span className="font-medium">Reduced Clutter:</span> Avoid having multiple windows or browser tabs open
              for different JSON data.
            </li>
            <li>
              <span className="font-medium">Improved User Experience:</span> Provides a clean, navigable interface for
              handling multiple inputs.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Core Implementation Concept</h2>
        <p>
          Implementing a basic tab system involves managing the state of which tab is currently active and rendering the
          content corresponding to that active tab. In a React/Next.js application, this typically means:
        </p>

        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">
            Maintaining an array or list of your JSON documents, each with an identifier, a title, and the JSON content.
          </li>
          <li className="font-medium">Storing the ID of the currently active tab in your component&apos;s state.</li>
          <li className="font-medium">
            Rendering a list of tab headers (buttons or links), with the active tab header styled differently.
          </li>
          <li className="font-medium">Attaching click handlers to the tab headers to update the active tab state.</li>
          <li className="font-medium">
            Rendering the content area, displaying the JSON content of the tab whose ID matches the active tab state.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Basic Code Example</h2>
        <p>
          Here&apos;s a simplified example demonstrating the core logic using React state. This example focuses on the
          tab switching mechanism and content rendering, assuming the JSON content itself would be displayed within the
          content area (perhaps using a syntax highlighter or formatter component, not shown here for simplicity).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Simple Tab Component Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import { useState } from 'react';

interface JsonTab {
  id: string;
  title: string;
  content: string; // JSON string
}

const initialTabs: JsonTab[] = [
  { id: 'tab-1', title: 'File 1', content: '{ "key": "value1" }' },
  { id: 'tab-2', title: 'File 2', content: '{ "data": [1, 2, 3] }' },
];

export default function JsonTabbedInterface() {
  const [activeTabId, setActiveTabId] = useState(initialTabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const activeTab = initialTabs.find(tab => tab.id === activeTabId);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex border-b">
        {initialTabs.map((tab) => (
          <button
            key={tab.id}
            className={\`py-2 px-4 text-sm font-medium \${
              activeTabId === tab.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }\`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 p-4 bg-white rounded shadow dark:bg-gray-900">
        {activeTab ? (
          <pre className="whitespace-pre-wrap break-words text-xs">
            {/* In a real app, you'd parse and format activeTab.content */}
            {activeTab.content}
          </pre>
        ) : (
          <p>Select a tab</p>
        )}
      </div>
    </div>
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This code defines the state for the active tab, renders buttons for each tab, and displays the content of
            the selected tab. Basic styling is applied to highlight the active tab.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Handling JSON Content</h2>
        <p>The example above just displays the raw JSON string. In a real application, you would typically want to:</p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Parse the JSON string (e.g., using `JSON.parse()`).</li>
          <li>Format or pretty-print the parsed JSON object for readability.</li>
          <li>Implement syntax highlighting for better code readability.</li>
          <li>Add features like validation, collapsing sections, searching, etc.</li>
        </ul>

        <p>
          You would likely have a dedicated component that takes the JSON string as a prop, performs parsing and
          formatting, and renders it appropriately within the tab content area.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Enhancing the Tabbed Interface</h2>
        <p>A production-ready tabbed interface for JSON documents can include several advanced features:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Adding/Removing Tabs:</span> Allow users to open new JSON files or close
              existing tabs.
            </li>
            <li>
              <span className="font-medium">Editable Content:</span> Enable editing within the active tab&apos;s content
              area.
            </li>
            <li>
              <span className="font-medium">Saving/Loading State:</span> Persist the list of open tabs and their content
              (e.g., using browser localStorage).
            </li>
            <li>
              <span className="font-medium">Error Handling:</span> Gracefully handle invalid JSON input in a tab.
            </li>
            <li>
              <span className="font-medium">Drag and Drop:</span> Allow users to drag and drop JSON files onto the
              interface to open them in new tabs.
            </li>
            <li>
              <span className="font-medium">Context Menus:</span> Add options like &quot;Close Other Tabs&quot; or
              &quot;Duplicate Tab&quot;.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Alternative Approaches</h2>
        <p>
          While managing tab state with `useState` is straightforward for simple cases, more complex scenarios might
          benefit from:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Using a State Management Library:</span> For large applications with many tabs
            or complex interactions, libraries like Redux, Zustand, or useContext/useReducer can help manage tab state
            globally.
          </li>
          <li>
            <span className="font-medium">UI Component Libraries:</span> Libraries like Material UI, Ant Design, Chakra
            UI, etc., provide pre-built Tab components that handle much of the state and accessibility out of the box,
            allowing you to focus on rendering the content within each tab pane.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Pro Tip:</h3>
          <p className="mt-2">
            When implementing editable JSON content within tabs, debounce or throttle the saving/parsing logic to avoid
            performance issues as the user types. Provide clear visual feedback (e.g., a &quot;saving...&quot;
            indicator) if content isn&apos;t saved instantly.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing a tabbed interface for managing multiple JSON documents significantly enhances the usability of
          any tool dealing with JSON data. By effectively managing the active tab state and rendering corresponding
          content, you can create a clean, organized, and efficient environment for users to work with their data.
        </p>
        <p>
          Start with a basic state management approach and gradually add features like content formatting, editing, and
          tab management based on your application&apos;s needs. Whether you build from scratch or leverage UI
          libraries, the core concept of linking tab headers to content panels remains the same.
        </p>
      </div>
    </>
  );
}
