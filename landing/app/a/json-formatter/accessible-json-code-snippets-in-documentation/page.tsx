import type { Metadata } from "next";
import { Accessibility, Code, Info, CheckCheck, X, Copy, Eye, Contrast, Braces } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessible JSON Code Snippets in Documentation | Offline Tools",
  description:
    "Learn how to create accessible JSON code snippets for your documentation, improving usability for all developers.",
};

export default function AccessibleJsonSnippetsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Accessibility className="w-8 h-8 mr-3 text-blue-600" /> Accessible JSON Code Snippets in Documentation
      </h1>

      <div className="space-y-6">
        <p>
          Providing code examples is crucial for technical documentation. For data structures like JSON, developers rely
          on these snippets to understand API responses, configuration files, or data formats. However, presenting JSON
          code in a way that is accessible to *all* developers, including those using screen readers or other assistive
          technologies, requires careful consideration. This page explores common accessibility challenges and best
          practices for presenting JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-amber-500" /> Why Accessibility for Code?
        </h2>
        <p>
          Accessibility isn&apos;t just for users with disabilities; it improves usability for everyone. When it comes
          to code snippets:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Clear formatting and syntax highlighting help all developers quickly scan and
            understand the structure.
          </li>
          <li>
            <strong>Copyability:</strong> Easy selection and copying prevents errors when transferring code.
          </li>
          <li>
            <strong>Screen Reader Compatibility:</strong> Developers using screen readers need the structure and content
            announced correctly.
          </li>
          <li>
            <strong>Keyboard Navigation:</strong> While less critical for static text blocks, overall page structure
            impacts navigation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <X className="w-6 h-6 mr-2 text-red-500" /> Common Problems with Inaccessible JSON
        </h2>
        <p>Poorly presented JSON snippets can lead to several issues:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Difficult to Read:</strong> Lack of indentation, inconsistent spacing, or poor color contrast in
            syntax highlighting can make the JSON visually confusing.
          </li>
          <li>
            <strong>Copy-Paste Errors:</strong> Extra line numbers, unexpected characters from formatting, or inability
            to select the entire snippet cleanly.
          </li>
          <li>
            <strong>Screen Reader Annoyances:</strong> Screen readers might read the JSON as a long, undifferentiated
            string, missing the structural cues (objects, arrays, keys, values). Line numbers or complex highlighting
            markup can also be read aloud, creating noise.
          </li>
          <li>
            <strong>Lack of Context:</strong> Snippets presented without clear explanation of what they represent or
            what specific parts mean.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="w-6 h-6 mr-2 text-green-600" /> Best Practices for Accessible JSON Snippets
        </h2>
        <p>Here are key techniques to make your JSON code snippets more accessible and user-friendly:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Braces className="w-5 h-5 mr-2 text-purple-600" /> 1. Use Semantic HTML (&lt;pre&gt; &lt;code&gt;)
        </h3>
        <p>
          Always wrap code blocks in <code>&lt;pre&gt;</code> tags for preformatted text and <code>&lt;code&gt;</code>{" "}
          tags for indicating code. This is the standard and provides semantic meaning that assistive technologies
          understand.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Basic Structure:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-json block whitespace-pre-wrap">
              {`&lt;pre&gt;
  &lt;code class="language-json"&gt;
    &#x7b;
      "name": "Example User",
      "id": 12345,
      "isActive": true
    &#x7d;
  &lt;/code&gt;
&lt;/pre&gt;`}
            </code>
          </pre>
        </div>
        <p>
          The <code>class=&quot;language-json&quot;</code> is common for many syntax highlighting libraries and helps
          identify the code type.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Contrast className="w-5 h-5 mr-2 text-teal-600" /> 2. Implement Syntax Highlighting with Good Contrast
        </h3>
        <p>
          Syntax highlighting significantly improves readability. Ensure your chosen color scheme has sufficient
          contrast between different syntax elements (keys, strings, numbers, booleans, punctuation) and the background.
          Avoid relying on color alone to convey meaning; structural formatting (indentation) is key.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example (Conceptual Highlighting):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="block whitespace-pre-wrap">
              {`&#x7b;
  <span class="hljs-attr">"user"</span>: &#x7b;
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">101</span>,
    <span class="hljs-attr">"username"</span>: <span class="hljs-string">"johndoe"</span>,
    <span class="hljs-attr">"roles"</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">"is_active"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"last_login"</span>: <span class="hljs-string">"2023-10-27T10:00:00Z"</span>
  &#x7d;,
  <span class="hljs-attr">"permissions"</span>: [
    <span class="hljs-string">"read"</span>,
    <span class="hljs-string">"write"</span>
  ]
&#x7d;`}
            </code>
          </pre>
          <p className="text-sm mt-2">
            <Info className="w-4 h-4 inline-block mr-1 align-text-bottom" />
            (Classes like <code>hljs-attr</code>, <code>hljs-number</code>, etc. are conceptual examples from common
            highlighting libraries).
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-blue-600" /> 3. Ensure Correct Formatting
        </h3>
        <p>
          Consistent indentation and line breaks are crucial for visual parsing. Avoid displaying JSON as a single, long
          line unless absolutely necessary for brevity in a specific context (and even then, provide an alternative
          formatted version).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Copy className="w-5 h-5 mr-2 text-green-600" /> 4. Make it Easy to Copy
        </h3>
        <p>
          The content within <code>&lt;pre&gt;&lt;code&gt;</code> should be plain, selectable text. Avoid using images
          for code snippets. Ensure that selecting and copying the code block doesn&apos;t include line numbers or other
          extraneous UI elements (these should be added via CSS or pseudo-elements if needed for presentation, not
          directly in the text). While we cannot implement interactive copy buttons here, consider their value in a
          dynamic documentation site.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Accessibility className="w-5 h-5 mr-2 text-blue-600" /> 5. Add ARIA Attributes Where Appropriate
        </h3>
        <p>
          For code blocks, adding <code>role=&quot;code&quot;</code> can provide additional context to screen readers.
          Ensure that any surrounding UI (like line numbers or copy buttons) is either ignored by screen readers (e.g.,{" "}
          <code>aria-hidden=&quot;true&quot;</code>) or announced correctly.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Adding role=&quot;code&quot;:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-json block whitespace-pre-wrap">
              {`&lt;pre&gt;
  &lt;code class="language-json" role="code"&gt;
    &#x7b;
      "status": "success",
      "data": [
        &#x7b;"item": "apple", "quantity": 5&#x7d;,
        &#x7b;"item": "banana", "quantity": 10&#x7d;
      ]
    &#x7d;
  &lt;/code&gt;
&lt;/pre&gt;`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Info className="w-5 h-5 mr-2 text-amber-500" /> 6. Provide Contextual Explanations
        </h3>
        <p>
          Always introduce your JSON snippet and explain what it represents. Point out key fields or structures,
          especially if the snippet is large or complex. Use surrounding paragraphs, lists, or tables to break down the
          information.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example with Explanation:</h4>
          <p className="mb-2">
            The following JSON shows a user profile object returned by the
            <code>/api/v1/user/&#x7b;id&#x7d;</code> endpoint.
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-json block whitespace-pre-wrap">
              {`&#x7b;
  <span class="hljs-comment">// Unique identifier for the user</span>
  "id": <span class="hljs-number">789</span>,
  <span class="hljs-comment">// The user's full name</span>
  "full_name": <span class="hljs-string">"Jane Doe"</span>,
  <span class="hljs-comment">// List of assigned roles (can be empty)</span>
  "roles": [
    <span class="hljs-string">"editor"</span>,
    <span class="hljs-string">"viewer"</span>
  ],
  <span class="hljs-comment">// Boolean indicating if the account is active</span>
  "is_active": <span class="hljs-literal">true</span>
&#x7d;`}
            </code>
          </pre>
          <p className="mt-2">
            Note the <code>roles</code> field is an array, even if empty. The <code>is_active</code>
            field is a boolean.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" /> 7. Handle Large Snippets Gracefully
        </h3>
        <p>
          For very large JSON examples, displaying the entire block inline might be overwhelming. Consider showing a
          truncated version and providing a link to view or download the complete, raw JSON file. This offers developers
          the full context when needed without cluttering the page. (Again, describe this concept, without implementing
          the actual link).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="w-6 h-6 mr-2 text-green-600" /> Example: Good vs. Bad
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <X className="w-5 h-5 mr-2 text-red-500" /> Bad Example: Just Pasted Text
        </h3>
        <p>This is hard to read, copy-paste is risky, and screen readers get no structural clues.</p>
        <div className="bg-white p-4 rounded-lg border border-red-300 dark:bg-gray-900 my-4 overflow-x-auto">
          {'{ "users": [ { "id": 1, "name": "Alice" }, { "id": 2, "name": "Bob" } ], "count": 2 }'}
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" /> Good Example: Using &lt;pre&gt;&lt;code&gt; with
          Formatting
        </h3>
        <p>Formatted, within semantic tags, ready for syntax highlighting, and easy to copy.</p>
        <div className="bg-gray-100 p-4 rounded-lg border border-green-300 dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <code className="language-json block whitespace-pre-wrap" role="code">
              {`&#x7b;
  "users": [
    &#x7b;
      "id": <span class="hljs-number">1</span>,
      "name": <span class="hljs-string">"Alice"</span>
    &#x7d;,
    &#x7b;
      "id": <span class="hljs-number">2</span>,
      "name": <span class="hljs-string">"Bob"</span>
    &#x7d;
  ],
  "count": <span class="hljs-number">2</span>
&#x7d;`}
            </code>
          </pre>
          <p className="text-sm mt-2">
            <Info className="w-4 h-4 inline-block mr-1 align-text-bottom" />
            (Conceptual highlighting classes included).
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Making JSON code snippets accessible in your documentation is a simple yet impactful way to improve the
          developer experience. By using the correct HTML tags, ensuring proper formatting and contrast, and providing
          clear context, you make your documentation more usable for a wider audience, including those using assistive
          technologies. Prioritizing accessibility from the start benefits everyone.
        </p>
      </div>
    </>
  );
}
