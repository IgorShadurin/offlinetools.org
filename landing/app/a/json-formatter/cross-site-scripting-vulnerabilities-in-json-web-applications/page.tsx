import type { Metadata } from "next";
import { AlertTriangle, Code, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Cross-Site Scripting Vulnerabilities in JSON Web Applications | Security",
  description:
    "Understand how Cross-Site Scripting (XSS) can occur in modern web applications using JSON APIs, focusing on output encoding and secure rendering.",
};

// This component is designed for a Next.js backend context (server rendering implicitly)
// and does not use 'use client' or useState.

export default function XssJsonVulnerabilitiesArticle() {
  // Example data structures removed as they were unused and caused ESLint errors.
  // In a real application, data would be fetched server-side or passed as props
  // and then used in the JSX below.

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <AlertTriangle className="text-yellow-500 mr-3" size={30} />
        Cross-Site Scripting (XSS) in JSON Web Applications
      </h1>

      <div className="space-y-6">
        <p>
          Modern web applications heavily rely on JSON (JavaScript Object Notation) for data exchange, particularly via
          APIs. While JSON itself is a data format and doesn&apos;t inherently contain executable code in the way HTML
          or JavaScript does, vulnerabilities can still arise when data retrieved from JSON sources is improperly
          handled on the client side, leading to Cross-Site Scripting (XSS).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} />
          How JSON is Used (and Where XSS Comes In)
        </h2>
        <p>Typically, a web application architecture involves:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>A backend server providing data via APIs, often in JSON format.</li>
          <li>A frontend client (browser) that fetches this JSON data.</li>
          <li>The frontend client processes the JSON and dynamically updates the HTML page based on the data.</li>
        </ol>
        <p>
          The XSS vulnerability doesn&apos;t lie within the JSON structure itself, but in the third step:
          <strong>how the data *from* the JSON is inserted into the HTML Document Object Model (DOM)</strong>. If this
          insertion is done without proper sanitization or encoding, malicious script tags or event handlers present
          within the data values can be executed by the user&apos;s browser.
        </p>

        <h3 className="text-xl font-semibold mt-6">Illustrative Example: User Profile Data</h3>
        <p>Imagine a user profile page that fetches profile details (username, bio, etc.) from a JSON API:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`// Example JSON data from API
{
  "username": "AttackerUser",
  "bio": "<script>alert('You are hacked!')</script>"
}`}
          </pre>
        </div>
        <p>
          If the frontend takes the <code>bio</code> value directly and inserts it into the HTML without escaping it,
          the injected <code>&lt;script&gt;</code> tag will be executed when the page loads.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="text-yellow-500 mr-2" size={24} />
          Types of XSS Relevant to JSON APIs
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Stored XSS:</strong> This is the most common scenario involving JSON APIs. Malicious data (like the
            bio example above) is submitted by an attacker, stored on the server (often in a database), and later served
            via a JSON API to other users. When those users view the page that renders this data without proper
            handling, the script executes.
          </li>
          <li>
            <strong>Reflected XSS:</strong> Less direct with a pure JSON API, but possible if data sent to the server
            (e.g., in URL parameters or POST body) is echoed back in a JSON response, and the client-side JavaScript
            then uses this echoed data insecurely in the page.
          </li>
          <li>
            <strong>DOM-based XSS:</strong> The vulnerability exists purely in client-side JavaScript. The script
            retrieves data (potentially from a JSON API, URL parameters, or local storage) and writes it to a dangerous
            sink (like <code>innerHTML</code>) without sanitization.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="mr-2" size={24} />
          Key Defense: Output Encoding / Escaping
        </h2>
        <p>
          The primary defense against XSS when rendering data from JSON is **Output Encoding** or **Escaping**. This
          involves converting characters that have special meaning in HTML (like <code>&lt;</code>,<code>&gt;</code>,{" "}
          <code>&amp;</code>, <code>&quot;</code>, <code>&apos;</code>, <code>/</code>) into their HTML entity
          equivalents (e.g., <code>&amp;lt;</code>, <code>&amp;gt;</code>).
        </p>
        <p>
          When the browser encounters <code>&amp;lt;script&amp;gt;</code>, it renders it as the literal text
          <code>&lt;script&gt;</code> instead of interpreting it as an HTML tag.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Vulnerable vs. Safe Rendering</h3>

        <p className="font-semibold">Vulnerable Rendering (Avoid this!):</p>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200 my-4 overflow-x-auto">
          <h4 className="font-mono mb-2">Conceptual Client-side JS:</h4>
          <pre className="text-sm">
            {`// DANGEROUS! Directly inserting unsanitized data
const userData = { bio: "<script>alert('XSS!')</script>" };
document.getElementById('bio-area').innerHTML = userData.bio;

// In React/JSX, this is conceptually similar to dangerouslySetInnerHTML
// <div dangerouslySetInnerHTML={{ __html: userData.bio }} />
// Only use dangerouslySetInnerHTML when you trust the source *completely* or have applied robust server-side AND client-side sanitization.`}
          </pre>
          <p className="mt-2 flex items-center font-semibold">
            <AlertTriangle className="mr-2" size={18} />
            This allows any HTML or script tags in <code>userData.bio</code> to execute.
          </p>
        </div>

        <p className="font-semibold">Safe Rendering (Use this):</p>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg dark:bg-green-900 dark:text-green-200 my-4 overflow-x-auto">
          <h4 className="font-mono mb-2">Conceptual Client-side JS:</h4>
          <pre className="text-sm">
            {`// SAFE! Using textContent or framework defaults
const userData = { bio: "<script>alert('XSS!')</script>" };
document.getElementById('bio-area').textContent = userData.bio;

// In React/JSX, standard rendering automatically escapes:
// <div>{userData.bio}</div>
// This renders "<script>alert('XSS!')</script>" as plain text.
`}
          </pre>
          <p className="mt-2 flex items-center font-semibold">
            <Shield className="mr-2" size={18} />
            This automatically escapes special characters, rendering the malicious code harmlessly as text.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Modern Frameworks Help</h3>
        <p>
          Frontend frameworks like React, Vue, and Angular provide significant protection out-of-the-box. When you
          render data within their templating syntax (like using <code>{`{variable}`}</code> in JSX or Vue templates, or{" "}
          <code>{`{{ variable }}`}</code> in Angular templates), they automatically HTML-escape the content by default.
          This is a major reason why XSS is less common in applications built with these frameworks compared to older
          techniques involving manual DOM manipulation with
          <code>innerHTML</code>.
        </p>
        <p>
          However, you can bypass this default safety (e.g., using <code>dangerouslySetInnerHTML</code> in React or the
          equivalent in other frameworks), which should only be done when rendering trusted or carefully sanitized HTML
          content (like rich text from a WYSIWYG editor).
        </p>

        <h3 className="text-xl font-semibold mt-6">Other Layers of Defense</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Content Security Policy (CSP):</strong> A browser security feature that helps prevent XSS by
            restricting which resources (scripts, styles, etc.) the browser is allowed to load and execute for a given
            page. A strong CSP can block injected scripts even if they are successfully inserted into the DOM.
          </li>
          <li>
            <strong>Input Validation &amp; Sanitization:</strong> While encoding is the primary defense at the *output*
            stage, validating and sanitizing input on the server-side before storing it is also important. This can
            involve removing potentially dangerous characters or structures. However, relying *only* on input
            sanitization is risky, as filtering is hard to get perfectly right. Output encoding is the failsafe.
          </li>
          <li>
            <strong>Using Safe APIs:</strong> Prefer DOM manipulation methods like <code>textContent</code> over
            <code>innerHTML</code> when you intend to insert plain text.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON is a safe data format, but its consumption on the client-side is a common vector for XSS. The key
          takeaway is that data from *any* untrusted source, including values fetched from a JSON API, must be properly
          HTML-encoded or rendered using safe framework defaults before being inserted into the HTML DOM. Combined with
          a strong Content Security Policy and careful use of APIs, developers can effectively mitigate XSS risks in
          modern web applications relying on JSON data.
        </p>
      </div>
    </>
  );
}
