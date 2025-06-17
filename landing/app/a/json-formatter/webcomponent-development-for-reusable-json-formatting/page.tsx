import type { Metadata } from "next";
import { Palette, Component, Code, Share2 } from "lucide-react"; // Import needed icons from the approved list

export const metadata: Metadata = {
  title: "WebComponent Development for Reusable JSON Formatting",
  description:
    "Learn how to build a reusable JSON formatting component using Web Components for better encapsulation and portability across different web environments.",
};

export default function WebComponentJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">WebComponent Development for Reusable JSON Formatting</h1>

      <div className="space-y-6">
        <p>
          In modern web development, dealing with JSON data is ubiquitous. Whether fetching configurations, displaying
          API responses, or working with data stores, presenting raw JSON directly to developers (e.g., in a debugging
          panel) or even advanced users can be challenging due to its lack of formatting and syntax highlighting.
          Creating a consistent, reusable way to render formatted, readable JSON across different projects or frameworks
          is a common need.
        </p>
        <p>
          This is where <strong>Web Components</strong> offer a powerful solution. By encapsulating the JSON formatting
          logic within a custom element, you can create a portable, reusable component that works anywhere HTML can be
          used, independent of the JavaScript framework or library in use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette className="inline-block" /> Why Format JSON for Display?
        </h2>
        <p>
          Raw JSON, especially when large or deeply nested, is hard to read. It lacks indentation, syntax highlighting,
          and often appears as a single long line of text. This makes debugging, understanding data structures, or
          presenting data in a human-readable format difficult. A well-formatted JSON display typically includes visual
          cues like:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Proper indentation to clearly show the nesting level of objects and arrays.</li>
          <li>
            Syntax highlighting (coloring) for different data types (strings, numbers, booleans, null) and property
            keys.
          </li>
          <li>
            Collapsible sections (for objects and arrays) to allow users to hide complex sub-structures and focus on
            relevant parts.
          </li>
          <li>Clear visual distinction between different data types.</li>
        </ul>
        <p>
          Building this logic, including parsing, traversing, styling, and managing interactive states (like
          collapse/expand) every time you need a JSON viewer is inefficient. A reusable component solves this.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Component className="inline-block" /> What are Web Components?
        </h2>
        <p>
          Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML
          tags with their own functionality and styling. They are designed to be interoperable and work seamlessly with
          any JavaScript library or framework, or even without one. They consist of three main technologies:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Custom Elements:</strong> This API allows you to define new HTML tags (like our proposed{" "}
            <code>&lt;json-formatter&gt;</code>) and associate a JavaScript class with them to define their behavior,
            lifecycle callbacks (when they are attached to the DOM, attributes change, etc.), and custom methods or
            properties.
          </li>
          <li>
            <strong>Shadow DOM:</strong> This provides encapsulation. It attaches a separate, isolated DOM tree to an
            element, rendering its contents separately from the main document's DOM. Styles defined within the Shadow
            DOM are scoped to it, preventing them from affecting the main document, and vice-versa. This is crucial for
            building truly self-contained components.
          </li>
          <li>
            <strong>HTML Templates:</strong> The <code>&lt;template&gt;</code> and <code>&lt;slot&gt;</code>
            elements allow you to write chunks of reusable HTML markup that aren't immediately rendered. They are useful
            for structuring the internal DOM of your Web Component or enabling content distribution ("slotting").
          </li>
        </ul>
        <p>By combining these technologies, we can build a robust and isolated JSON formatting component.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="inline-block" /> Designing the `&lt;json-formatter&gt;` Component
        </h2>
        <p>
          The goal is to create a custom element, let's call it <code>&lt;json-formatter&gt;</code>, that accepts JSON
          data and renders it in a formatted, readable way within its own encapsulated Shadow DOM.
        </p>

        <h3 className="text-xl font-semibold mt-6">Getting JSON Data into the Component</h3>
        <p>A custom element needs a way to receive the JSON data it should format. Common approaches include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Via an Attribute:</strong> The JSON data (as a string) can be passed directly using an attribute,
            e.g.,
            <code>&lt;json-formatter json-data='{`{ "key": "value" }`}'&gt;&lt;/json-formatter&gt;</code>. The custom
            element can use the <code>observedAttributes</code> static property and the{" "}
            <code>attributeChangedCallback</code> lifecycle method to react to changes in this attribute and re-render.
            This method is simple but less suitable for large or complex JSON due to attribute size limits and quoting
            complexities.
          </li>
          <li>
            <strong>Via a JavaScript Property:</strong> Web Components are DOM nodes, and you can set properties
            directly on them using JavaScript, e.g.,
            <code>document.querySelector('json-formatter').jsonData = yourActualJsonObject;</code>. This is often the
            most flexible approach, especially when dealing with non-string data or data that changes dynamically. The
            component class can define standard JavaScript getter/setter properties. The setter would typically trigger
            the rendering logic.
          </li>
          <li>
            <strong>Via Inner HTML (Less Common for Data):</strong> While custom elements can process their{" "}
            <code>textContent</code> or inner HTML, embedding raw JSON string inside the tag (
            <code>&lt;json-formatter&gt;{`{ "key": "value" }`}&lt;/json-formatter&gt;</code>) is less conventional for
            passing data compared to attributes or properties. It might be used for initial content or simple cases.
          </li>
        </ul>
        <p>Implementing support for setting data via a property is generally recommended for robustness.</p>

        <h3 className="text-xl font-semibold mt-6">Core Logic within the Custom Element Class</h3>
        <p>
          The JavaScript class associated with the <code>&lt;json-formatter&gt;</code> tag will contain the logic. This
          class extends <code>HTMLElement</code> and utilizes the Web Component APIs.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Sketch of the `JsonFormatter` Class:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Note: This is a simplified, conceptual example.
// A real implementation requires detailed handling of JSON structure,
// recursive rendering, styling, and potentially interactive features.

class JsonFormatter extends HTMLElement {
  // Optionally observe attributes if passing data via attribute
  static get observedAttributes() {
    return ['json-data'];
  }

  constructor() {
    super();
    // Create Shadow DOM root
    const shadowRoot = this.attachShadow({ mode: 'open' }); // 'open' or 'closed'

    // Define the basic structure within the Shadow DOM
    // Use &lt;pre&gt; or &lt;code&gt; for text, add internal containers as needed
    shadowRoot.innerHTML = \`
      &lt;style&gt;
        /* --- Component's Private Styles --- */
        /* These styles are scoped to the Shadow DOM */
        pre {
          font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
          font-size: 0.9em;
          line-height: 1.5;
          white-space: pre-wrap; /* Wrap long lines */
          word-break: break-all; /* Prevent overflow */
          padding: 1em;
          border: 1px solid #eee;
          border-radius: 4px;
          background-color: #f8f8f8;
          color: #333;
          overflow-x: auto; /* Scroll for very long lines */
        }
        /* Basic Syntax Highlighting Classes */
        .json-key { color: #a31515; } /* Red */
        .json-string { color: #008000; } /* Green */
        .json-number { color: #09885a; } /* Cyan-like */
        .json-boolean { color: #0000ff; } /* Blue */
        .json-null { color: #808080; } /* Grey */
        /* Add styles for indentation, collapse icons, etc. */
      &lt;/style&gt;
      &lt;div id="json-output"&gt;Waiting for JSON data...&lt;/div&gt;
    \`;
  }

  // Lifecycle method: Called when an observed attribute is added, removed, or changed
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'json-data') {
      this.renderJson(newValue); // Trigger rendering with new attribute value
    }
  }

  // Lifecycle method: Called when the element is added to the document's DOM
  connectedCallback() {
    // Initial rendering based on attribute or property already set
    const initialJson = this.getAttribute('json-data');
    if (initialJson) {
      this.renderJson(initialJson);
    } else {
       // If data is passed via property *after* connection,
       // you might need observers or a method call.
       // If using innerHTML, read this.textContent here.
       // this.renderJson(this.textContent || '');
    }
  }

  // Lifecycle method: Called when the element is removed from the document's DOM
  disconnectedCallback() {
    // Clean up event listeners or resources if necessary
  }

  // --- Core Formatting and Rendering Method ---
  renderJson(jsonString) {
    const outputElement = this.shadowRoot.getElementById('json-output');
    if (!outputElement) return;

    try {
      const data = JSON.parse(jsonString); // Parse the JSON string
      // *** Recursive Formatting Logic Goes Here ***
      // This is the most complex part.
      // You need a function that takes a JSON value (object, array, primitive)
      // and an indentation level, and returns HTML string.
      // It recursively calls itself for nested objects and arrays.
      const formattedHtml = this.generateFormattedHtml(data, 0); // Needs implementation
      outputElement.innerHTML = \`&lt;pre&gt;\${formattedHtml}&lt;/pre&gt;\`; // Wrap in pre for formatting
    } catch (error) {
      // Handle parsing errors
      outputElement.innerHTML = \`&lt;div style="color: red;"&gt;Invalid JSON data: \${error.message}&lt;/div&gt;\`;
      console.error("JSON Formatting Error:", error);
    }
  }

  // --- Placeholder for Recursive HTML Generation ---
  // This function would traverse the JSON object/array and build the HTML string
  generateFormattedHtml(data, indentLevel) {
      // Example logic sketch (highly simplified):
      const indent = '  '.repeat(indentLevel);
      if (typeof data === 'object' && data !== null) {
          if (Array.isArray(data)) {
              // Format array with indentation and elements
              if (data.length === 0) return '[]';
              const elements = data.map(item => \`\${indent}  \${this.generateFormattedHtml(item, indentLevel + 1)}\`).join(',\\n');
              return \`[\n\${elements}\n\${indent}]\`;
          } else {
              // Format object with indentation, keys, and values
              const keys = Object.keys(data);
              if (keys.length === 0) return '{}';
              const properties = keys.map(key => {
                  const formattedKey = \`&lt;span class="json-key"&gt;"\${key}"&lt;/span&gt;\`;
                  const formattedValue = this.generateFormattedHtml(data[key], indentLevel + 1);
                  return \`\${indent}  \${formattedKey}: \${formattedValue}\`;
              }).join(',\\n');
              return \`{\n\${properties}\n\${indent}}\`;
          }
      } else {
          // Format primitive types with syntax highlighting spans
          let valueHtml = String(data);
          let typeClass = 'json-null'; // Default for null/undefined/others?
          if (typeof data === 'string') { valueHtml = \`"\${data}"\`; typeClass = 'json-string'; }
          else if (typeof data === 'number') { typeClass = 'json-number'; }
          else if (typeof data === 'boolean') { typeClass = 'json-boolean'; }
          else if (data === null) { valueHtml = 'null'; typeClass = 'json-null'; }
           // Add logic for collapse toggles around objects/arrays
          return \`&lt;span class="\${typeClass}"&gt;\${valueHtml}&lt;/span&gt;\`;
      }
  }

   // --- Optional: Property Setter for data ---
   // Allows setting data like element.jsonData = { ... };
   set jsonData(value) {
       try {
           // Stringify and trigger render
           const jsonString = JSON.stringify(value, null, 2); // Use 2 spaces for base indentation
           // Note: Setting attribute here would trigger attributeChangedCallback
           // Or call renderJson directly
           this.renderJson(jsonString);
       } catch(e) {
           console.error("Cannot set data property:", e);
           const outputElement = this.shadowRoot.getElementById('json-output');
            if (outputElement) {
              outputElement.innerHTML = \`&lt;div style="color: red;"&gt;Error setting data: \${e.message}&lt;/div&gt;\`;
            }
       }
   }

   get jsonData() {
       // Return the currently parsed object if stored, or parse from attribute
       const jsonString = this.getAttribute('json-data');
       if (jsonString) {
           try {
               return JSON.parse(jsonString);
           } catch(e) {
               console.error("Error getting data property:", e);
               return undefined; // Or handle appropriately
           }
       }
       return undefined;
   }
}

// --- Register the custom element ---
// This tells the browser about your new tag.
// customElements.define('json-formatter', JsonFormatter);
// This definition code typically resides in a separate JavaScript file (e.g., json-formatter.js)
// that you would include in your HTML page or application entry point.
`}
            </pre>
          </div>
        </div>
        <p>
          The <code>constructor</code> sets up the Shadow DOM and the basic internal structure.
          <code>observedAttributes</code> and <code>attributeChangedCallback</code> handle changes when the
          <code>json-data</code> attribute is modified. <code>connectedCallback</code> ensures initial rendering when
          the element appears on the page. The core work happens in <code>renderJson</code> and the recursive{" "}
          <code>generateFormattedHtml</code> function, which parses the JSON and builds the HTML structure with
          appropriate classes for styling and potentially elements for interactivity. The optional property setter{" "}
          <code>jsonData</code> provides a more convenient JavaScript API.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Usage Examples</h2>
        <p>
          Once the Web Component's JavaScript file is loaded and the custom element is defined using
          <code>customElements.define()</code>, you can use your new <code>&lt;json-formatter&gt;</code> tag just like
          any built-in HTML element.
        </p>

        <h3 className="text-xl font-semibold mt-6">In Static HTML:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">index.html:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;JSON Formatter Example&lt;/title&gt;
    &lt;!-- Link or import your Web Component's JavaScript file --&gt;
    &lt;script src="./json-formatter.js" defer&gt;&lt;/script&gt;
    &lt;style&gt;
       /* Optional: External styles for the host element itself, not its shadow DOM */
       json-formatter {
           display: block; /* Custom elements are inline by default */
           margin: 20px 0;
           border: 1px dashed #ccc; /* Example host style */
       }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;h1&gt;Web Component JSON Formatter Examples&lt;/h1&gt;

    &lt;h2&gt;Using the 'json-data' Attribute&lt;/h2&gt;
    &lt;json-formatter json-data='&#x7b; "name": "Alice", "age": 30, "isStudent": false, "address": &#x7b; "street": "123 Main St", "city": "Anytown" &#x7d;, "courses": ["Math", "Science"], "config": null, "large_number": 12345678901234567890 &#x7d;'&gt;&lt;/json-formatter&gt;

    &lt;h2&gt;Setting Data via JavaScript Property&lt;/h2&gt;
    &lt;json-formatter id="dynamic-formatter"&gt;&lt;/json-formatter&gt;

    &lt;script&gt;
        const dynamicFormatter = document.getElementById('dynamic-formatter');
        const myDynamicJson = {
            status: "ok",
            timestamp: new Date().toISOString(),
            users: [
                { id: 1, username: "userA" },
                { id: 2, username: "userB", active: true }
            ]
        };
        // Set the property (assuming the component has a 'jsonData' setter)
        if (dynamicFormatter) {
            dynamicFormatter.jsonData = myDynamicJson;
        }
    &lt;/script&gt;

&lt;/body&gt;
&lt;html&gt;
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">In React/Next.js (TSX):</h3>
        <p>
          Integrating Web Components into React or Next.js requires understanding how these frameworks handle custom
          elements and data flow. By default, React passes props as HTML attributes. While you can pass a stringified
          JSON this way (matching our attribute example), for passing complex objects, the standard approach involves
          getting a direct reference to the DOM node and setting a property on it.
        </p>
        <p>
          <strong>Note:</strong> This page component is a static server component. It doesn't run client-side JavaScript
          after the initial render. Therefore, we cannot demonstrate dynamic data updates or property setting using
          client-side hooks like <code>useEffect</code> here. The example below shows how you would statically render
          the component using the attribute approach, which works on both server and client. For dynamic data or
          property setting, you would need a Client Component (`use client`).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">SomeReactComponent.tsx:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Ensure your Web Component script (json-formatter.js) is loaded globally or imported.
// For Next.js, this might involve adding a script tag in _document.tsx (App Router: root layout)
// or importing it in a top-level client component.

// Example JSON data
const myStaticJson = {
  product: {
    id: "p123",
    name: "Awesome Widget",
    price: 19.99,
    inStock: true,
    features: ["durable", "lightweight"],
    details: &#x7b; "weight_g": 250, "color": "blue" &#x7d;
  },
  reviews: [
    { rating: 5, comment: "Great product!" },
    { rating: 4, comment: "Very good." }
  ]
};

// Helper to safely stringify JSON for HTML attributes
// Need to handle quotes carefully
const safeStringifyForAttr = (data) => {
  try {
    // JSON.stringify returns a string with double quotes
    // Replace double quotes inside the string with HTML entities,
    // and wrap the whole string in single quotes for the attribute value.
    return JSON.stringify(data).replace(/"/g, '&quot;');
  } catch (e) {
    console.error("Failed to stringify JSON for attribute:", e);
    return ''; // Return empty string or handle error state
  }
};

// In a static or server component:
export default function StaticJsonDisplay() {
  const jsonStringAttribute = safeStringifyForAttr(myStaticJson);

  return (
    &lt;div&gt;
      &lt;h3&gt;JSON formatted using &#x60;json-formatter&#x60; Web Component (static attribute)&lt;/h3&gt;
      {/*
        React/Next.js might issue warnings about unknown elements (&lt;json-formatter&gt;).
        You might need to configure your build or use specific libraries (e.g., @lit-labs/react)
        to integrate Web Components more smoothly.
        For simple static usage like this, React often just passes the attribute through.
      */}
      &lt;json-formatter json-data={jsonStringAttribute}&gt;&lt;/json-formatter&gt;

      &lt;h3&gt;Another static example&lt;/h3&gt;
      &lt;json-formatter json-data='&#x7b; "message": "Hello from another static example!" &#x7d;'&gt;&lt;/json-formatter&gt;

      {/*
         For dynamic data from props in a Client Component ('use client'),
         you would typically use useRef and useEffect:
         import { useRef, useEffect } from 'react';
         // ... in a client component function ...
         const formatterRef = useRef(null);
         useEffect(() => {
            if (formatterRef.current) {
                // Set the data using the component's property setter
                formatterRef.current.jsonData = yourDynamicPropData;
            }
         }, [yourDynamicPropData]); // Re-run effect when data changes
         return &lt;json-formatter ref={formatterRef}&gt;&lt;/json-formatter&gt;;
      */}
    &lt;/div&gt;
  );
}
`}
            </pre>
          </div>
        </div>
        <p>
          When working with frameworks like React or Next.js, it's important to remember that they manage the DOM
          differently than plain JavaScript. While passing data via attributes works for strings, using properties is
          more idiomatic for complex data structures and requires accessing the DOM node instance, typically done in
          client-side effects or lifecycle methods. Proper build configuration might also be needed to prevent warnings
          about custom elements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Share2 className="inline-block" /> Advantages and Disadvantages
        </h2>
        <p>Using Web Components for a reusable JSON formatter comes with its own set of trade-offs.</p>

        <h3 className="text-xl font-semibold mt-6">Advantages:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Framework Agnostic:</strong> The biggest advantage is portability. The component works natively
            across all major browsers and can be dropped into projects using React, Vue, Angular, Svelte, jQuery, or no
            framework at all.
          </li>
          <li>
            <strong>Encapsulation:</strong> Shadow DOM provides strong style and DOM isolation, reducing the risk of
            conflicts with the parent page's styles or scripts. This ensures the component looks and behaves
            consistently.
          </li>
          <li>
            <strong>Reusability & Maintainability:</strong> The formatting logic is contained within a single,
            self-registering unit. This centralizes updates and reduces code duplication across projects.
          </li>
          <li>
            <strong>Leverages Web Standards:</strong> Built directly on browser APIs, Web Components are generally
            performant and benefit from ongoing browser improvements.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Disadvantages:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Styling Challenges:</strong> Styling the *internal* parts of a Shadow DOM component from the outside
            requires using CSS custom properties (`--my-var: value;`) or exposing "parts" via the `::part()`
            pseudo-element, which can be less straightforward than traditional CSS selectors.
          </li>
          <li>
            <strong>Browser Support & Polyfills:</strong> While modern browser support is excellent, compatibility with
            older browsers might require polyfills for Custom Elements or Shadow DOM. Declarative Shadow DOM, useful for
            server-side rendering, is relatively newer.
          </li>
          <li>
            <strong>Developer Ergonomics (Frameworks):</strong> Integrating with some frameworks can sometimes feel less
            "smooth" than using native framework components, especially when passing complex data via properties or
            handling events. Tools and libraries exist to improve this experience (e.g., Lit, Stencil, libraries
            specific to framework integration).
          </li>
          <li>
            <strong>Implementation Complexity:</strong> Building non-trivial features like robust collapsing, large data
            handling, virtualization, or sophisticated search purely with native Web Component APIs and vanilla
            JavaScript can be more complex than using helper libraries or framework-specific tools.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Developing a JSON formatting tool as a Web Component is an excellent use case for showcasing the power of
          encapsulation and reusability provided by web standards. By creating a <code>&lt;json-formatter&gt;</code>{" "}
          custom element, you can provide a consistent, portable, and framework-agnostic solution for displaying
          structured JSON data beautifully anywhere on the web. While there are implementation details to manage,
          particularly around data passing and styling the Shadow DOM, the benefits of a truly reusable component make
          this a worthwhile endeavor for developers seeking to build shareable UI widgets.
        </p>
      </div>
    </>
  );
}
