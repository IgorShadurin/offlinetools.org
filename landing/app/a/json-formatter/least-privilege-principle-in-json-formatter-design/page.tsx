import type { Metadata } from "next";
import { ShieldCheck, EyeOff, Code, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import React from "react"; // Explicitly import React if not already implicit

export const metadata: Metadata = {
  title: "Least Privilege in JSON Formatter Design | Offline Tools",
  description:
    "Explore the Least Privilege Principle and its importance when designing secure JSON formatters, especially for handling untrusted data.",
};

export default function LeastPrivilegeJsonFormatterArticle() {
  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <ShieldCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
        <h1 className="text-3xl font-bold">Least Privilege Principle in JSON Formatter Design</h1>
      </div>

      <div className="space-y-6">
        <p>
          The principle of <strong>Least Privilege</strong> is a fundamental concept in computer security. It dictates
          that an entity (like a user, process, or program) should only have access to the minimum resources and
          permissions necessary to perform its intended function. Applying this principle is crucial when designing
          tools, especially those that handle potentially untrusted user input, such as a JSON formatter.
        </p>
        <p>
          A JSON formatter takes raw JSON text and displays it in a structured, readable format, often with syntax
          highlighting, indentation, and collapse/expand functionality. While seemingly simple, if the JSON being
          formatted comes from an external or untrusted source, failing to apply least privilege can open the door to
          security vulnerabilities, most notably Cross-Site Scripting (XSS).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <EyeOff className="w-6 h-6" /> Why Least Privilege for a JSON Formatter?
        </h2>
        <p>
          Imagine a web-based JSON formatter where users can paste arbitrary JSON. This JSON might contain not just
          data, but also malicious code hidden within string values. If the formatter processes and renders this input
          with excessive privileges or without proper sanitization, it could execute malicious scripts in the user's
          browser, leading to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Session hijacking (stealing cookies).</li>
          <li>Redirecting users to phishing sites.</li>
          <li>Defacing the page or injecting unwanted content.</li>
          <li>Making requests on behalf of the user.</li>
        </ul>
        <p>
          The Least Privilege Principle helps mitigate these risks by ensuring the formatter component or function
          operates with the minimum capabilities needed for formatting, restricting its ability to execute arbitrary
          code or access sensitive resources.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" /> Practical Applications in Design
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Input Sanitization and Validation</h3>
        <p>
          Before attempting to parse or format the JSON string, validate that it is well-formed JSON. More importantly,
          sanitize the *content* if you intend to render it directly as HTML. While a standard JSON parser (like{" "}
          <code>JSON.parse()</code>) is generally safe regarding execution, the vulnerability arises when you take
          values from the parsed JSON and insert them into the HTML structure of your formatter's output.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Output Escaping is Key</h3>
        <p>
          This is perhaps the most critical application. When displaying string values, object keys, or other JSON data
          within your HTML output, you must escape any characters that could be interpreted as HTML markup or script
          tags. Characters like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, and <code>&quot;</code> must
          be converted to their HTML entities (<code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;amp;</code>,{" "}
          <code>&amp;quot;</code>).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" /> Avoiding Dangerous APIs
        </h3>
        <p>
          The most common mistake leading to XSS in formatters is using APIs like <code>innerHTML</code>
          to insert potentially untrusted data directly into the DOM structure that represents the formatted output.
          <code>innerHTML</code> parses the provided string as HTML, including any <code>&lt;script&gt;</code> tags or
          event handlers (like <code>onload</code>, <code>onerror</code>) embedded within tag attributes, and executes
          them.
        </p>

        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
          role="alert"
        >
          <p className="font-bold">Dangerous Example (Do NOT do this):</p>
          <div className="bg-white p-3 rounded mt-2 dark:bg-red-800 overflow-x-auto">
            <pre>
              {`// Assume 'data' is a string value from the parsed JSON,
// e.g., "<script>alert('XSS!')</script>"
const element = document.getElementById('output');
element.innerHTML = \`<span class="json-string">"\${data}"</span>\`;
// The script tag within 'data' will be executed!`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" /> Using Safe APIs
        </h3>
        <p>
          Instead of <code>innerHTML</code>, use safer DOM manipulation methods that treat inserted data as plain text
          rather than HTML markup.
        </p>

        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
          role="alert"
        >
          <p className="font-bold">Safer Example (Recommended):</p>
          <div className="bg-white p-3 rounded mt-2 dark:bg-green-800 overflow-x-auto">
            <pre>
              {`// Assume 'data' is a string value from the parsed JSON.
// It is treated as plain text.
const element = document.getElementById('output');
const span = document.createElement('span');
span.className = 'json-string';
span.textContent = \`"\${data}"\`; // Use textContent instead of innerHTML
element.appendChild(span);
// The script tag within 'data' is displayed as text, not executed.`}
            </pre>
          </div>
        </div>
        <p>
          When working with React/JSX, the framework handles this escaping automatically when you render strings within{" "}
          <code>&#x7b; &#x7d;</code>.
          <span className="block my-2">
            <XCircle className="inline-block w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
            Avoid using <code>dangerouslySetInnerHTML</code> unless you have absolute control over the input and have
            already performed rigorous sanitization. Using it bypasses React's built-in protection.
          </span>
        </p>

        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200"
          role="alert"
        >
          <p className="font-bold">React/JSX Note:</p>
          <p>
            When rendering dynamic text content in JSX, React automatically escapes strings. For example,{" "}
            <code>&lt;span&gt;{"{variableContainingHTML}"}&lt;/span&gt;</code> will safely render the variable's content
            as plain text, converting <code>&lt;</code> to <code>&amp;lt;</code> etc. This is one of the built-in "least
            privilege" mechanisms provided by the framework.
          </p>
          <div className="bg-white p-3 rounded mt-2 dark:bg-yellow-800 overflow-x-auto">
            <pre>
              {`const untrustedData = "<script>alert('XSS!')</script>";

// Safe in React:
function SafeComponent({ data }) {
  return <span className="json-string">"{'{'}data{'}'}"</span>;
}
// Renders as: <span class="json-string">"&lt;script&gt;alert('XSS!')&lt;/script&gt;"</span>
// No script execution.`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Minimize External Dependencies</h3>
        <p>
          If your formatter uses external libraries, ensure they are reputable, actively maintained, and reviewed for
          security practices. A vulnerability in a third-party library used by your formatter could also expose users.
          The principle of least privilege extends to dependencies – only include libraries that are strictly necessary.
        </p>

        <h3 className="text-xl font-semibold mt-6">5. Server-Side vs. Client-Side Considerations</h3>
        <p>
          If your JSON formatter is purely client-side (runs only in the user's browser), the primary risk is
          user-to-user XSS or self-XSS if they paste malicious content. However, if the JSON is processed or stored on
          the server before being sent to other users, server-side validation and escaping become even more critical to
          prevent stored XSS vulnerabilities affecting all users. The principle applies regardless, but the attack
          vectors might differ.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ShieldCheck className="w-6 h-6" /> Conclusion: Build Defensively
        </h2>
        <p>
          Designing a JSON formatter with the Least Privilege Principle in mind means assuming the input is hostile and
          implementing safeguards to prevent it from causing harm.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Treat all input data as potentially untrusted.</li>
          <li>Escape all output that is inserted into HTML.</li>
          <li>
            Prefer text-safe DOM manipulation methods (<code>textContent</code>, React's default rendering) over
            HTML-parsing ones (<code>innerHTML</code>, <code>dangerouslySetInnerHTML</code>).
          </li>
          <li>Validate the input structure.</li>
          <li>Minimize unnecessary permissions or capabilities of the formatting component.</li>
        </ul>
        <p>
          By adhering to these practices, you can build a JSON formatter that is not only functional and user-friendly
          but also secure, protecting your users from common web vulnerabilities.
        </p>
      </div>
    </>
  );
}
