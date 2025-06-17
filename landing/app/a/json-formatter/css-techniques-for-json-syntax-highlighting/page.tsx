import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Techniques for JSON Syntax Highlighting | Offline Tools",
  description:
    "Explore effective CSS techniques for implementing syntax highlighting for JSON data in web applications, enhancing readability and usability.",
};

export default function CssJsonHighlightingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">CSS Techniques for JSON Syntax Highlighting</h1>

      <div className="space-y-6">
        <p>
          Syntax highlighting is crucial for improving the readability of code and data formats like JSON. It helps
          developers quickly parse complex structures by assigning different colors and styles to various elements.
          While dedicated libraries exist, understanding the underlying CSS techniques provides valuable insight and
          control. This article explores how CSS is used to achieve effective JSON syntax highlighting.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Syntax Highlighting for JSON?</h2>
        <p>
          JSON (JavaScript Object Notation) is a widely used data format, often becoming quite nested and lengthy.
          Without highlighting, a large JSON string is just plain text, making it hard to distinguish keys from values,
          strings from numbers, or arrays from objects. Syntax highlighting solves this by:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Improving readability and comprehension.</li>
          <li>Helping to spot syntax errors more easily.</li>
          <li>Enhancing the visual structure of the data.</li>
          <li>Making it faster to scan and locate specific pieces of information.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">The Core CSS Technique: Class-Based Styling</h2>
        <p>
          The fundamental approach to syntax highlighting with CSS involves wrapping different syntactic elements of the
          JSON data within HTML elements (usually <code>&lt;code&gt;</code> or <code>&lt;span&gt;</code>) and assigning
          specific CSS classes to these elements based on their type (e.g., key, string, number, boolean, punctuation).
        </p>
        <p>
          This requires processing the raw JSON string first (often using JavaScript or a server-side language) to
          identify the different tokens (keys, values, etc.) and then generating HTML output with the appropriate
          structure and classes.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. HTML Structure with Classes</h3>
        <p>Consider a simple JSON object:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "name": "Example Product",
  "price": 49.99,
  "inStock": true,
  "tags": ["electronics", "gadget"],
  "details": null
}`}
          </pre>
        </div>
        <p>To highlight this using CSS classes, you would transform it into something like this HTML structure:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`<code class="json">
  <span class="json-punctuation">{</span>
    <span class="json-key">"name"</span><span class="json-punctuation">:</span> <span class="json-string">"Example Product"</span><span class="json-punctuation">,</span>
    <span class="json-key">"price"</span><span class="json-punctuation">:</span> <span class="json-number">49.99</span><span class="json-punctuation">,</span>
    <span class="json-key">"inStock"</span><span class="json-punctuation">:</span> <span class="json-boolean">true</span><span class="json-punctuation">,</span>
    <span class="json-key">"tags"</span><span class="json-punctuation">:</span> <span class="json-punctuation">[</span>
      <span class="json-string">"electronics"</span><span class="json-punctuation">,</span>
      <span class="json-string">"gadget"</span>
    <span class="json-punctuation">]</span><span class="json-punctuation">,</span>
    <span class="json-key">"details"</span><span class="json-punctuation">:</span> <span class="json-null">null</span>
  <span class="json-punctuation">}</span>
</code>`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Defining CSS Rules</h3>
        <p>
          Once the HTML is structured with appropriate classes, you can define CSS rules to style each element type.
          Here&apos;s a basic example of CSS that would apply colors (using Tailwind CSS utility classes for
          demonstration within this environment):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
            Conceptual CSS Styles (using common syntax highlighting colors):
          </h4>
          <pre className="whitespace-pre-wrap text-sm">
            {`.json-key    { <span className="text-blue-600 dark:text-blue-400">color: #9cdcfe; /* A common color for keys */</span> }
.json-string { <span className="text-red-600 dark:text-red-400">color: #ce9178; /* A common color for strings */</span> }
.json-number { <span className="text-green-600 dark:text-green-400">color: #b5cea8; /* A common color for numbers */</span> }
.json-boolean{ <span className="text-orange-600 dark:text-orange-400">color: #569cd6; /* A common color for booleans */</span> }
.json-null   { <span className="text-gray-600 dark:text-gray-400">color: #569cd6; /* Often same as boolean or a distinct gray */</span> }
.json-punctuation { <span className="text-yellow-600 dark:text-yellow-400">color: #d4d4d4; /* Punctuation */</span> }

/* Optional: Basic container styling */
.json {
  <span className="text-gray-600 dark:text-gray-400">font-family: Consolas, Monaco, &apos;Andale Mono&apos;, &apos;Ubuntu Mono&apos;, &apos;monospace&apos;;
  line-height: 1.5;
  tab-size: 2;</span>
}
`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: The colors used here are illustrative and common in syntax highlighting themes. You would define these
            classes in your global CSS file or a CSS module.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Container Styling (`pre` and `code`)</h3>
        <p>
          JSON data is often displayed within <code>&lt;code&gt;</code> and <code>&lt;pre&gt;</code> tags to preserve
          whitespace and formatting. You should style these containers as well:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {`pre.json-container {
  <span className="text-gray-600 dark:text-gray-400">background-color: #1e1e1e; /* Dark background for a common theme */
  color: #d4d4d4; /* Default text color */
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto; /* Ensure horizontal scrolling for long lines */
  font-family: &apos;Courier New&apos;, Courier, monospace;</span>
}

code.json {
  <span className="text-gray-600 dark:text-gray-400">/* Styles specific to the code block */
  line-height: 1.4;</span>
}
`}
          </pre>
        </div>
        <p>
          Applying these styles to the `pre` and `code` elements containing the highlighted JSON will give it the
          familiar code block appearance.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Handling Different JSON Structures</h2>
        <p>
          The challenge in implementing this purely with CSS is the need to dynamically add the HTML{" "}
          <code>&lt;span&gt;</code> tags with correct classes. This parsing and wrapping logic is typically done using
          JavaScript. A simple parser would iterate through the JSON structure, identify the type of each token (key,
          value, array bracket, object brace, comma, colon), and build the HTML string accordingly.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example Parsing Logic (Conceptual JavaScript)</h3>
        <p>While not a full implementation, this snippet illustrates the idea:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`function highlightJson(jsonString) {
  // This is a simplified conceptual example.
  // Real parsers use tokenization and state machines.
  let html = jsonString;

  // Replace simple patterns (needs more sophisticated logic for correctness)
  html = html.replace(/"([^"]+)"\s*:/g, '<span class="json-key">"$1"</span><span class="json-punctuation">:</span>'); // Keys
  html = html.replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>'); // String values
  html = html.replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>'); // Number values
  html = html.replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>'); // Boolean values
  html = html.replace(/:\s*null/g, ': <span class="json-null">null</span>'); // Null values
  html = html.replace(/[{}[\]:,]/g, '<span class="json-punctuation">$&amp;</span>'); // Punctuation

  return '<code class="json">' + html + '</code>';
}

// Usage:
// const rawJson = \`{ "test": 123 }\`;
// const highlightedHtml = highlightJson(rawJson);
// document.getElementById('output').innerHTML = highlightedHtml;
`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: This JavaScript example is highly simplified and would fail on complex or malformed JSON.
            Production-ready highlighting libraries use robust parsers.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Theming with CSS Variables</h2>
        <p>
          For easy theme switching (e.g., light mode vs. dark mode), CSS variables (custom properties) are invaluable.
          Instead of hardcoding colors in your class rules, define them as variables:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre className="whitespace-pre-wrap text-sm">
            {`:root {
  <span className="text-gray-600 dark:text-gray-400">--json-bg: #f4f4f4;
  --json-text: #333;
  --json-key-color: #008080; /* Teal */
  --json-string-color: #d14; /* Red */
  --json-number-color: #099; /* Cyan */
  --json-boolean-color: #008080; /* Teal */
  --json-null-color: #808080; /* Gray */
  --json-punctuation-color: #999; /* Light gray */</span>
}

.dark-theme {
  <span className="text-gray-600 dark:text-gray-400">--json-bg: #1e1e1e;
  --json-text: #d4d4d4;
  --json-key-color: #9cdcfe; /* Light blue */
  --json-string-color: #ce9178; /* Orange */
  --json-number-color: #b5cea8; /* Light green */
  --json-boolean-color: #569cd6; /* Blue */
  --json-null-color: #569cd6; /* Blue */
  --json-punctuation-color: #d4d4d4; /* Light gray */</span>
}

pre.json-container {
  <span className="text-gray-600 dark:text-gray-400">background-color: var(--json-bg);
  color: var(--json-text);</span>
}

.json-key    { <span className="text-gray-600 dark:text-gray-400">color: var(--json-key-color);</span> }
.json-string { <span className="text-gray-600 dark:text-gray-400">color: var(--json-string-color);</span> }
/* ... apply variables to other classes ... */
`}
          </pre>
        </div>
        <p>
          By defining color palettes in <code>:root</code> and potentially theme-specific classes like{" "}
          <code>.dark-theme</code>, you can easily switch themes by adding/removing a single class from a parent element
          or the <code>body</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          CSS is the backbone of visual syntax highlighting for JSON on the web. The core technique involves preparing
          the JSON data by wrapping different syntactic elements in HTML tags with specific classes and then using CSS
          rules to style these classes with appropriate colors and font weights.
        </p>
        <p>
          While the parsing and HTML generation require JavaScript, the flexibility and power of CSS allow for creating
          diverse and customizable highlighting themes. Understanding these techniques is beneficial, whether
          you&apos;re building a simple JSON viewer or integrating a powerful syntax highlighting library, as it
          demystifies how those libraries work under the hood and allows for advanced customization.
        </p>
      </div>
    </>
  );
}
