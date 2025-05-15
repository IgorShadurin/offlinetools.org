import type { Metadata } from "next";
import { Shield, Code, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sandboxing Techniques for Secure JSON Formatting | Offline Tools",
  description:
    "Explore methods to securely format and display JSON data, focusing on preventing XSS and other injection risks when handling potentially untrusted input.",
};

type JsonPrimitive = string | number | boolean | null;

type JsonObject = {
  [key: string]: JsonValue;
};

type JsonArray = JsonValue[];

type JsonValue = JsonPrimitive | JsonObject | JsonArray;


export default function SecureJsonFormattingPage() {
  const unsafeJsonExample: JsonObject = {
    name: "User",
    message: "<script>alert('XSS Attack!');</script>",
    details: {
      link: '<a href="javascript:alert(\'Click Bait!\')">Click Here</a>',
      status: "active",
    },
    nestedArray: [
      "item1",
      'item2 with "quotes"',
      'item3 <img src="x" onerror="alert(\'Image Error!\')">',
    ],
  };

  const stringifiedUnsafeJson = JSON.stringify(unsafeJsonExample, null, 2);

  // A hypothetical manual escape function (simplified)
  const escapeHtml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // A hypothetical function to deeply escape string values in an object/array
  const deeplyEscapeJsonStrings = (data: JsonValue): JsonValue => {
    if (typeof data === "string") {
      return escapeHtml(data);
    }
    if (Array.isArray(data)) {
      return data.map(deeplyEscapeJsonStrings);
    }
    if (typeof data === "object" && data !== null) {
      const escapedObject: JsonObject = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          escapedObject[key] = deeplyEscapeJsonStrings(data[key]);
        }
      }
      return escapedObject;
    }
    return data; // Return numbers, booleans, null as is
  };

  const escapedJsonExample = deeplyEscapeJsonStrings(unsafeJsonExample);
  const stringifiedEscapedJson = JSON.stringify(escapedJsonExample, null, 2);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-3 text-green-600" size={30} /> Sandboxing
        Techniques for Secure JSON Display
      </h1>

      <div className="space-y-6">
        <p>
          When working with JSON, especially data that might originate from external
          or untrusted sources, a significant security consideration arises not during
          the parsing or internal processing, but when this JSON data is <strong>formatted
          and displayed</strong>, typically within a web browser. String values within
          JSON can contain malicious code like HTML or JavaScript. If this JSON
          is rendered directly into HTML without proper handling, it can lead to
          Cross-Site Scripting (XSS) vulnerabilities.
        </p>
        <p>
          This page explores techniques to "sandbox" or neutralize potentially
          dangerous content embedded within JSON strings when you need to display
          the JSON structure or its contents securely to a user.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-600" /> The Security Risk: XSS in Displayed JSON
        </h2>
        <p>
          Consider the following JSON structure containing values that look like HTML or JavaScript:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto font-mono text-sm">
          <pre>{stringifiedUnsafeJson}</pre>
        </div>

        <p>
          If you were to take the value of the <code>message</code> key, for instance,
          and render it directly into an HTML element's <code>innerHTML</code> property
          or equivalent in a template language that doesn't automatically escape content,
          the <code>&lt;script&gt;</code> tag would be executed by the browser.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-blue-600" /> Is `JSON.stringify()` Safe?
        </h2>
        <p>
          Yes, the standard <code>JSON.stringify()</code> function itself is safe
          in that it correctly formats JavaScript values into a valid JSON string.
          It will properly escape quotes (<code>"</code>) and backslashes (<code>\</code>)
          within strings and handle special characters. The risk isn't from
          <code>JSON.stringify()</code> generating unsafe JSON, but from how the
          resulting JSON <strong>string</strong> is rendered into a format that
          interprets HTML/JavaScript (like a browser rendering HTML).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="mr-2 text-green-600" /> Techniques for Secure JSON Display
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
           Framework Default Escaping
        </h3>
        <p>
          Modern front-end frameworks like React, Vue, and Angular handle string
          rendering by default in a safe way. When you put a string variable
          into JSX (<code>&lt;div&gt;{'{'}myString{'}'}&lt;/div&gt;</code>), React
          automatically escapes HTML special characters in <code>myString</code>
          before inserting it into the DOM. This prevents the browser from
          interpreting HTML tags within the string as actual elements.
        </p>
        <p>
          This is the most common and often sufficient "sandboxing" mechanism
          when displaying JSON values in a component-based UI, provided you are
          rendering the <em>values</em> using the framework's standard text rendering
          methods, not dangerously setting <code>innerHTML</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto font-mono text-sm">
            <pre>{`// Example in React-like JSX:
// Assuming unsafeJsonExample.message = "<script>alert('XSS')</script>"

// THIS IS SAFE: React escapes the string content
<div>{unsafeJsonExample.message}</div>
// Resulting HTML: <div>&lt;script&gt;alert('XSS')&lt;/script&gt;</div>

// THIS IS UNSAFE: Bypasses React's escaping
// <div dangerouslySetInnerHTML={{ __html: unsafeJsonExample.message }} />
// Resulting HTML: <div><script>alert('XSS')</script></div> // Script executes!

// Moral: Rely on default text rendering unless you have a strong reason not to.`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          Manual Escaping of String Values
        </h3>
        <p>
          If you are not using a framework with automatic escaping, or if you
          need to prepare the JSON data on the server-side before sending it
          for display in a less secure environment, you can manually escape
          the HTML special characters within all string values of the JSON object
          before it is formatted or embedded.
        </p>
        <p>
          This involves recursively traversing the JSON structure (objects and arrays)
          and applying an HTML escaping function to every string value encountered.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto font-mono text-sm">
            <pre>{`// Example of manual escaping applied to our JSON object:
${stringifiedEscapedJson}`}</pre>
        </div>
        <p>
          Notice how the characters <code>&lt;</code>, <code>&gt;</code>, <code>"</code>,
          and <code>'</code> within the original string values have been replaced by their
          HTML entities (<code>&amp;lt;</code>, <code>&amp;gt;</code>, etc.). When this
          escaped JSON string is later rendered in HTML, the browser will display these
          entities as the literal characters rather than interpreting them as markup.
        </p>
        <p>
          Implementing deep escaping correctly can be complex, especially
          with nested structures and edge cases. Libraries often provide robust
          escaping utilities.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          Using &lt;pre&gt;&lt;code&gt; Tags for Raw Display
        </h3>
        <p>
          A common way to display raw code or data structures like JSON is
          to wrap the entire stringified JSON output within <code>&lt;pre&gt;&lt;code&gt;</code>
          tags. The <code>&lt;pre&gt;</code> tag preserves whitespace and line breaks,
          and browsers generally handle basic escaping of content within these tags
          when rendering text nodes.
        </p>
        <p>
          When you put the output of <code>JSON.stringify()</code> into
          <code>&lt;pre&gt;&lt;code&gt;</code>, any <code>&lt;</code> or <code>&gt;</code>
          characters that were part of the original string values (like in
          <code>&lt;script&gt;</code>) will be displayed literally as text, not
          interpreted as HTML tags.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto font-mono text-sm">
            <pre>
              <code>
                {/* React automatically escapes the string passed as a child */}
                {stringifiedUnsafeJson}
              </code>
            </pre>
        </div>
        <p>
          This method effectively "sandboxes" the entire JSON output as a block
          of preformatted text, preventing any HTML or JavaScript within the
          string values from being executed by the browser. It's simple and effective
          for displaying JSON structure itself securely.
        </p>


        <h3 className="text-xl font-semibold mt-6 flex items-center">
           Specialized JSON Display Libraries
        </h3>
        <p>
          For more complex requirements like syntax highlighting, collapsible sections,
          and interactive exploration of JSON structures, you might consider using
          dedicated JavaScript libraries. Many of these libraries are built with
          security in mind and correctly escape string values before rendering them
          into the DOM. Ensure you choose a reputable library that explicitly mentions
          XSS prevention or secure rendering.
        </p>
        <p>
          Using such libraries offloads the complexity of parsing, traversing, escaping,
          and rendering securely, but requires adding a dependency to your project.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-600" /> Conclusion
        </h2>
        <p>
          While <code>JSON.stringify()</code> itself is safe for generating a JSON string,
          the primary security concern when handling potentially untrusted JSON lies
          in how that string is displayed in an environment that interprets HTML or JavaScript.
        </p>
        <p>
          The most robust "sandboxing" for displaying JSON values is ensuring that
          the rendering mechanism properly escapes HTML special characters.
          Leveraging the default behavior of modern front-end frameworks is often
          the simplest and most secure approach. Alternatively, manually escaping string
          values or displaying the entire JSON output within <code>&lt;pre&gt;&lt;code&gt;</code>
          tags are effective ways to prevent XSS. Always be cautious when using methods
          that bypass automatic escaping (like <code>dangerouslySetInnerHTML</code>).
        </p>
      </div>
    </>
  );
}