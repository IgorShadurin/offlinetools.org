import type { Metadata } from "next";
import { Server, Monitor, Code, Zap, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Server-Side Rendering for Initial JSON Formatter Loading | Offline Tools",
  description:
    "Learn how to improve the initial loading experience of JSON formatters using Server-Side Rendering in Next.js.",
};

export default function ServerSideJsonArticle() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="flex items-center gap-3">
        <Server className="w-8 h-8" />
        Server-Side Rendering for Initial JSON Formatter Loading
      </h1>

      <p>
        Building web applications that handle and display data often involves dealing with structured formats like JSON.
        A common requirement for tools or dashboards is to present JSON data in a user-friendly, formatted, and often
        syntax-highlighted way. While client-side JavaScript is perfectly capable of formatting JSON, executing this
        logic solely on the client upon page load can lead to a poor user experience, especially for large JSON payloads
        or slower devices.
      </p>
      <p>
        Users might see a blank screen, raw unformatted text, or experience significant layout shifts as the JavaScript
        loads, fetches the data, and then processes and renders the formatted output. This is where Server-Side
        Rendering (SSR) can offer a significant advantage for the *initial* display.
      </p>

      <h2 className="flex items-center gap-2">
        <Monitor className="w-6 h-6" />
        The Client-Side Formatting Challenge
      </h2>
      <p>Consider a typical client-side workflow for displaying formatted JSON:</p>
      <ol>
        <li>User requests the page.</li>
        <li>Browser downloads the HTML, CSS, and JavaScript.</li>
        <li>Browser renders the initial HTML (often a loading spinner or empty container).</li>
        <li>JavaScript for the JSON formatter library loads and executes.</li>
        <li>JavaScript fetches the JSON data (if not already embedded).</li>
        <li>JavaScript processes the JSON data, formats it into HTML or a DOM structure.</li>
        <li>JavaScript updates the DOM, replacing the loading state with the formatted JSON.</li>
      </ol>
      <p>
        This sequence involves several steps that block the user from seeing the actual content, resulting in perceived
        slowness.
      </p>

      <h2 className="flex items-center gap-2">
        <Server className="w-6 h-6" />
        Enter Server-Side Rendering (SSR)
      </h2>
      <p>
        Server-Side Rendering is a technique where the web server processes the request and renders the full HTML
        content for the page *before* sending it to the browser. The browser receives an HTML document that is already
        complete with the initial data and structure, which it can display immediately. Client-side JavaScript then
        "hydrates" this static HTML, attaching event listeners and enabling dynamic behavior.
      </p>

      <h2 className="flex items-center gap-2">
        <Zap className="w-6 h-6" />
        Why SSR is Beneficial for Initial JSON Formatting
      </h2>
      <p>Applying SSR to the problem of initial JSON formatting offers several key benefits:</p>
      <ul>
        <li>
          <strong>Faster Perceived Performance:</strong> The user sees the fully formatted JSON content almost instantly
          because it&apos;s part of the initial HTML payload. There&apos;s no waiting for client-side scripts to fetch
          data and format it.
        </li>
        <li>
          <strong>Reduced Layout Shift:</strong> Since the content is rendered on the server, the space it occupies is
          known from the start, preventing the content from "jumping" into place after client-side rendering.
        </li>
        <li>
          <strong>Better Core Web Vitals:</strong> Improved Largest Contentful Paint (LCP) as the main content (the
          formatted JSON) is available in the initial HTML.
        </li>
        <li>
          <strong>Accessibility:</strong> Content rendered on the server is available immediately to screen readers and
          other assistive technologies without waiting for JavaScript execution.
        </li>
        <li>
          <strong>Simpler Initial State Management:</strong> The server handles fetching and initial formatting,
          reducing the complexity of managing loading states on the client for the initial render.
        </li>
      </ul>

      <h2 className="flex items-center gap-2">
        <Code className="w-6 h-6" />
        How SSR Works for JSON Formatting (Conceptually)
      </h2>
      <p>
        In an SSR framework like Next.js, you can perform data fetching and rendering logic on the server. For initial
        JSON formatting, the workflow would look something like this:
      </p>
      <ol>
        <li>User requests the page displaying the JSON.</li>
        <li>The Next.js server component or `getServerSideProps` function is executed on the server.</li>
        <li>This server-side function fetches the required JSON data (e.g., from an API, database, or file).</li>
        <li>
          The server-side code uses a JSON formatting/syntax highlighting library (that can run in Node.js) to convert
          the raw JSON string into a formatted HTML string or a React element tree representation.
        </li>
        <li>The generated formatted HTML is embedded directly into the main page component&apos;s render output.</li>
        <li>The server sends the complete HTML page (containing the pre-formatted JSON) to the browser.</li>
        <li>The browser displays the HTML immediately.</li>
        <li>
          Client-side React loads and "hydrates" the page, attaching interactive capabilities (if any, though for a
          formatter display, interaction might be minimal or handled by separate client components).
        </li>
      </ol>

      <h3>Conceptual Server-Side Logic Flow:</h3>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <pre>
          {`// Conceptual server-side function (e.g., part of a Server Component or inside getServerSideProps)

async function getFormattedJsonContent(jsonSourceId: string): Promise<string> {
  // 1. Fetch the raw JSON data on the server
  const rawJsonData = await fetchJsonData(jsonSourceId); // Assume fetchJsonData is a server-side utility

  if (!rawJsonData) {
    return "&lt;p&gt;Could not load JSON data.&lt;/p&gt;"; // Handle errors
  }

  try {
    // 2. Parse the JSON (optional, some formatters work with strings)
    const parsedData = JSON.parse(rawJsonData);

    // 3. Use a server-compatible JSON formatter library
    //    This part depends heavily on the chosen library.
    //    Many libraries format into a string of HTML.
    const formattedHtml = formatJsonToHtml(parsedData, {
      indent: 2,
      syntaxHighlight: true,
      // ... other formatting options
    });

    return formattedHtml; // Return the HTML string
  } catch (error) {
    console.error("Error formatting JSON on server:", error);
    return "&lt;p&gt;Error formatting JSON.&lt;/p&gt;&lt;pre&gt;" + escapeHtml(rawJsonData) + "&lt;/pre&gt;"; // Show raw on error
  }
}

// Function to escape HTML entities in raw JSON for basic display if formatting fails
function escapeHtml(unsafe: string): string {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/&lt;/g, "&lt;") // Ensure existing entities are preserved
         .replace(/&gt;/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// In your Next.js Server Component or page function:
/*
export default async function MyJsonPage() {
  const jsonContentHtml = await getFormattedJsonContent("some-id");

  return (
    &lt;div&gt;
      &lt;h1&gt;Formatted JSON Data&lt;/h1&gt;
      // Dangerously set the pre-formatted HTML
      &lt;div dangerouslySetInnerHTML={{ __html: jsonContentHtml }} /&gt;
    &lt;/div&gt;
  );
}
*/
`}
        </pre>
      </div>
      <p>
        The key is that the `formatJsonToHtml` function runs on the server, generating the necessary HTML structure for
        the formatted JSON. This HTML is then inserted directly into the page&apos;s output.
      </p>
      <p>
        Using `dangerouslySetInnerHTML` is necessary because the formatting library returns a string of HTML, not React
        elements. While the name sounds scary, it is appropriate here because the HTML is generated by controlled
        server-side code from data we trust (or have properly escaped/handled errors for), not directly from arbitrary
        user input.
      </p>

      <h2 className="flex items-center gap-2">
        <Cloud className="w-6 h-6" />
        Considerations and Challenges
      </h2>
      <ul>
        <li>
          <strong>Server Load:</strong> Formatting very large JSON payloads on the server for every request can increase
          server CPU usage and memory consumption.
        </li>
        <li>
          <strong>Time to First Byte (TTFB):</strong> While perceived performance is better, the actual TTFB might
          increase slightly as the server needs to complete the formatting before sending the response. For simple JSON,
          this is negligible; for complex formatting of huge data, it could be noticeable.
        </li>
        <li>
          <strong>Hydration Costs:</strong> Even though the initial render is static, the client-side JavaScript for
          React (and potentially the formatter library if needed for future interactions or dynamic updates) still needs
          to load and hydrate the page. Ensure this hydration is efficient.
        </li>
        <li>
          <strong>Formatter Library Compatibility:</strong> The JSON formatting library must be compatible with a
          Node.js environment (i.e., not rely on browser-specific APIs like the DOM directly for formatting, though it
          might generate DOM-compatible HTML strings).
        </li>
        <li>
          <strong>Security (`dangerouslySetInnerHTML`):</strong> As mentioned, use with caution. Ensure the HTML
          generated by the formatter is safe and that raw data is properly escaped if displayed in case of formatting
          errors.
        </li>
        <li>
          <strong>Dynamic Updates:</strong> If the JSON needs to be updated *after* the initial load (e.g., live
          updates), you&apos;ll need client-side JavaScript to handle subsequent fetches and re-formatting, potentially
          using a client-side component for that specific part of the page.
        </li>
      </ul>

      <h2 className="flex items-center gap-2">
        <Zap className="w-6 h-6" />
        Alternative SSR Approaches & Hydration
      </h2>
      <p>
        Instead of returning a raw HTML string and using `dangerouslySetInnerHTML`, some server-compatible formatting
        libraries might allow you to generate a React element tree directly on the server. This can lead to smoother
        hydration.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
        <pre>
          {`// Conceptual server-side function returning React elements

import React from 'react'; // Need React available server-side

async function getFormattedJsonReactElements(jsonSourceId: string): Promise<React.ReactNode> {
  const rawJsonData = await fetchJsonData(jsonSourceId);

  if (!rawJsonData) {
    return &lt;p&gt;Could not load JSON data.&lt;/p&gt;;
  }

  try {
    const parsedData = JSON.parse(rawJsonData);
    // Use a formatter that returns React elements (if available)
    // Example: A hypothetical renderJsonToReact function
    const formattedElements = renderJsonToReact(parsedData, { indent: 2 });
    return &lt;div className="json-container"&gt;{formattedElements}&lt;/div&gt;;
  } catch (error) {
    console.error("Error formatting JSON on server:", error);
    return (
      &lt;div&gt;
        &lt;p&gt;Error formatting JSON.&lt;/p&gt;
        &lt;pre&gt;{escapeHtml(rawJsonData)}&lt;/pre&gt;
      &lt;/div&gt;
    );
  }
}

// In your Next.js Server Component or page function:
/*
export default async function MyJsonPage() {
  const jsonContent = await getFormattedJsonReactElements("some-id");

  return (
    &lt;div&gt;
      &lt;h1&gt;Formatted JSON Data&lt;/h1&gt;
      {jsonContent} {/* Render the React elements directly *&#x2f;*}
    &lt;/div&gt;
  );
}
*/
`}
        </pre>
      </div>
      <p>
        This approach allows Next.js and React to handle the rendering and hydration more naturally, potentially
        improving performance and reducing potential issues associated with `dangerouslySetInnerHTML`. However, finding
        a suitable formatting library that specifically supports server-side React element generation might be
        challenging.
      </p>

      <h2 className="flex items-center gap-2">Conclusion</h2>
      <p>
        For applications where the initial display of formatted JSON is critical for user experience and the data is
        known at the time of the request, implementing Server-Side Rendering for the JSON formatting process in Next.js
        (or similar frameworks) is a powerful technique. By shifting the compute-intensive formatting work from the
        client&apos;s initial load to the server, you can deliver a much faster perceived experience, providing users
        with the content they need to see without delay or jankiness. While it introduces server load and requires
        careful library selection and implementation, the benefits for initial render performance are often well worth
        the effort.
      </p>
    </article>
  );
}
