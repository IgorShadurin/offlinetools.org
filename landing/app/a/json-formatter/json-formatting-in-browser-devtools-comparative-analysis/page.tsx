import { Bug, Folders, Search, Copy } from "lucide-react";

export default function JsonFormattingInDevtoolsArticle() {
  return (
    <article className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        JSON Formatting in Browser DevTools: A Comparative Analysis
      </h1>

      <section className="space-y-6">
        <p>
          As web developers, we frequently work with data exchanged between the client and server, often in the JSON
          format. Inspecting and understanding this data during development and debugging is crucial. Browser Developer
          Tools (DevTools) are indispensable for this task, providing built-in features to format and explore JSON
          payloads.
        </p>
        <p>
          This article explores how major browser DevTools handle JSON formatting, comparing their features, usability,
          and what developers can expect across different environments. Understanding these differences can streamline
          your debugging workflow.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 flex items-center">
          <Bug className="mr-3 text-blue-600" size={28} />
          Where to Find JSON in DevTools
        </h2>
        <p>
          The primary place to inspect JSON data is typically the "Network" tab in your browser's DevTools. When you
          select a network request that returned JSON (indicated by the `Content-Type: application/json` header), you'll
          find the raw response body. DevTools then automatically formats this raw text into a more readable structure.
        </p>
        <p>You might also encounter JSON within:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The "Console" when logging JSON objects or strings.</li>
          <li>The "Application" tab (e.g., Local Storage, Session Storage, IndexedDB) if JSON data is stored there.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 flex items-center">
          <Folders className="mr-3 text-green-600" size={28} />
          The Tree View: The Standard Format
        </h2>
        <p>
          The most common and helpful way DevTools presents JSON is through a collapsible tree view. This hierarchical
          structure mirrors the nested nature of JSON objects and arrays, making complex data structures easy to
          navigate.
        </p>
        <p>Key features of the tree view include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Collapsible Nodes:</strong> Objects (`{}`) and arrays (`[]`) can be expanded or collapsed to
            hide/show their contents.
          </li>
          <li>
            <strong>Key-Value Display:</strong> Object properties are clearly listed as `key: value`.
          </li>
          <li>
            <strong>Index-Value Display:</strong> Array elements are shown with their index (`[0]`, `[1]`, etc.)
            followed by their value.
          </li>
          <li>
            <strong>Type Highlighting:</strong> Different JSON data types (strings, numbers, booleans, null) are often
            color-coded for quick identification.
          </li>
        </ul>
        <p>Here's a simple JSON example and how it might conceptually appear in a tree view:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Sample JSON:</h3>
          <pre className="text-sm">
            {`{
  "name": "Developer",
  "age": 30,
  "isStudent": false,
  "skills": ["JavaScript", "TypeScript", "React"],
  "address": {
    "city": "Techville",
    "zip": "12345"
  },
  "projects": null
}`}
          </pre>
          <h3 className="text-lg font-medium mt-4 mb-2">Conceptual Tree View Structure:</h3>
          <pre className="text-sm">
            {`► { ... } 6 properties
  ► name: "Developer"
  ► age: 30
  ► isStudent: false
  ► skills: [...] 3 items
    ► [0]: "JavaScript"
    ► [1]: "TypeScript"
    [2]: "React" // Note: Sometimes the last item isn't expandable
  ► address: { ... } 2 properties
    city: "Techville"
    zip: "12345"
  projects: null
`}
          </pre>
          <p className="text-sm mt-2">
            <em>(Note: Actual rendering varies slightly between browsers)</em>
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 flex items-center">
          Comparative Features Across Browsers
        </h2>

        <h3 className="text-xl font-semibold mt-6">Google Chrome & Microsoft Edge (Chromium-based)</h3>
        <p>
          Due to their shared rendering engine and DevTools architecture, Chrome and Edge offer a very similar and
          robust JSON viewing experience.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Tree View:</strong> Excellent, highly interactive tree view. You can easily click to expand/collapse
            nodes.
          </li>
          <li>
            <Search className="inline-block mr-1" size={16} /> <strong>Search:</strong> Powerful search within the JSON
            tree view (Ctrl/Cmd + F). It highlights matches and allows navigation between them. You can search for keys
            or values.
          </li>
          <li>
            <Copy className="inline-block mr-1" size={16} /> <strong>Copy:</strong> Right-clicking on a node allows you
            to copy the value, the path to the value, or even the JSON subtree starting from that node. This is
            extremely useful.
          </li>
          <li>
            <strong>Filtering:</strong> While not strictly JSON formatting, the Network tab's filtering options (by
            content type, search term, etc.) help you quickly find the JSON response you need to inspect.
          </li>
          <li>
            <strong>"Raw" vs. "Parsed":</strong> You can often toggle between the formatted tree view and the raw JSON
            string response.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Mozilla Firefox</h3>
        <p>Firefox also provides excellent JSON formatting capabilities in its DevTools.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Tree View:</strong> A clear and navigable tree view, similar to Chrome/Edge. It also supports
            collapsing/expanding nodes and color-coding.
          </li>
          <li>
            <Search className="inline-block mr-1" size={16} /> <strong>Search:</strong> Supports searching within the
            parsed JSON data.
          </li>
          <li>
            <Copy className="inline-block mr-1" size={16} /> <strong>Copy:</strong> Offers similar copy options,
            allowing you to copy values or subtrees.
          </li>
          <li>
            <strong>"Raw" vs. "Pretty Print" vs. "Raw Data":</strong> Firefox offers multiple views including the raw
            response, a 'Pretty Print' raw view, and the interactive parsed JSON view. This flexibility can be helpful.
          </li>
          <li>
            <strong>Preview Tab:</strong> The "Preview" tab in the Network panel often provides the formatted JSON view
            directly, while the "Response" tab shows the raw text.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Apple Safari</h3>
        <p>
          Safari's DevTools (Web Inspector) also includes JSON formatting, though it might have slightly fewer advanced
          features compared to Chrome or Firefox in some older versions.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Tree View:</strong> Provides a standard hierarchical tree view for JSON responses.
          </li>
          <li>
            <Search className="inline-block mr-1" size={16} /> <strong>Search:</strong> Search functionality is
            available, often integrated into the overall search of the panel.
          </li>
          <li>
            <Copy className="inline-block mr-1" size={16} /> <strong>Copy:</strong> Copying values is supported,
            typically via right-click context menus.
          </li>
          <li>
            <strong>Data Tab:</strong> In the Network panel, the "Data" tab is where the formatted JSON response is
            usually displayed.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 flex items-center">Navigating Large JSON Payloads</h2>
        <p>
          When dealing with very large JSON responses (megabytes of data, or deeply nested structures), the performance
          and features of DevTools' JSON viewers become more critical.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Performance:</strong> All browsers might struggle slightly with extremely large files, potentially
            causing temporary freezes when expanding large nodes. Chromium-based browsers and Firefox generally handle
            this well, but be mindful of performance with massive data.
          </li>
          <li>
            <Search className="inline-block mr-1" size={16} /> <strong>Search Efficiency:</strong> Search features are
            invaluable for large payloads. Being able to quickly find a specific key or value without manually expanding
            everything is essential.
          </li>
          <li>
            <strong>Lazy Loading/Rendering:</strong> Some tools might implement optimizations like not fully rendering
            deeply nested or very large arrays/objects until they are expanded, improving initial load time.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 flex items-center">
          Tips for Effective JSON Debugging in DevTools
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Use the Tree View:</strong> Always prefer the formatted tree view over the raw text for readability.
          </li>
          <li>
            <Search className="inline-block mr-1" size={16} /> <strong>Master Search:</strong> Learn the keyboard
            shortcut (Ctrl/Cmd + F) for searching within the JSON viewer. It's a huge time saver.
          </li>
          <li>
            <Copy className="inline-block mr-1" size={16} /> <strong>Copy Paths/Values:</strong> Utilize the right-click
            copy options to quickly grab data or property paths for use in your code or console.
          </li>
          <li>
            <strong>Log to Console:</strong> If dealing with JSON objects in your JavaScript code, use `console.log()`
            to print them to the Console. DevTools also formats logged objects into interactive trees.
          </li>
          <li>
            <strong>External Formatters:</strong> For truly massive or complex JSON that stresses DevTools, consider
            copying the raw JSON and using an external online or offline JSON formatter/viewer, though this breaks the
            direct debugging flow.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 flex items-center">Conclusion</h2>
        <p>
          Browser DevTools across Chrome, Edge, Firefox, and Safari provide essential and generally consistent features
          for formatting and inspecting JSON data. The interactive tree view is the core functionality, complemented by
          search and copy capabilities that significantly aid debugging.
        </p>
        <p>
          While the core features are similar, subtle differences exist in UI layout, specific copy options, and
          performance with very large payloads. Familiarizing yourself with the nuances of your preferred browser's
          DevTools will undoubtedly make working with JSON data a smoother and more efficient part of your development
          process. Whether you're debugging API responses, inspecting local storage, or logging objects, the built-in
          JSON formatting is a powerful tool at your disposal.
        </p>
      </section>
    </article>
  );
}
