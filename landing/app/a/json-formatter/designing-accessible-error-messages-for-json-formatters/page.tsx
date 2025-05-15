import type { Metadata } from "next";
import { AlertTriangle, Info, CheckCircle, Search, Code, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Designing Accessible Error Messages for JSON Formatters | Offline Tools",
  description: "Learn how to create clear, helpful, and accessible error messages for users of JSON formatting and validation tools.",
};

export default function AccessibleJsonErrorMessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Designing Accessible Error Messages for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          JSON formatters and validators are essential tools for developers, data analysts, and anyone working with JSON data.
          However, dealing with malformed or invalid JSON can be frustrating. Clear and accessible error messages are crucial
          to help users understand what went wrong and how to fix it, making the tool usable for everyone, including those
          with disabilities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
           <Info className="mr-2 text-blue-500" /> Why Accessibility Matters in Error Handling
        </h2>
        <p>
          Accessibility isn&apos;t just about compliance; it&apos;s about creating tools that are inclusive and effective for all users.
          Poorly designed error messages can be a significant barrier. Users who rely on screen readers, have cognitive impairments,
          or difficulty processing complex information need error messages that are:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Easy to understand:</strong> Avoid jargon where possible, or explain it clearly.</li>
          <li><strong>Easy to locate:</strong> Errors should be clearly linked to the problematic part of the input.</li>
          <li><strong>Actionable:</strong> Tell the user *how* to fix the problem, not just *what* the problem is.</li>
          <li><strong>Perceivable:</strong> Use sufficient contrast, clear typography, and non-color indicators.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-500" /> Common Types of JSON Errors
        </h2>
        <p>
          JSON formatters typically encounter two main types of errors:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Syntax Errors:</strong> These violate the fundamental rules of the JSON grammar. Examples include missing commas,
            unclosed braces or brackets, invalid characters, or incorrect primitive formats.
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm mt-2">
              <p className="font-mono"><code>&#x7b;"name": "Alice" "age": 30&#x7d;</code> <em className="text-red-600 dark:text-red-400">- Missing comma</em></p>
              <p className="font-mono"><code>["apple", "banana"</code> <em className="text-red-600 dark:text-red-400">- Missing closing bracket</em></p>
            </div>
          </li>
          <li>
            <strong>Validation Errors:</strong> These occur when the JSON is syntactically correct but doesn&apos;t conform to a specific schema
            or expected structure. While many simple formatters only check syntax, validators often check types, required fields, patterns, etc.
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm mt-2">
              <p className="font-mono">Schema expects <code>"age"</code> to be a number, but input is <code>&#x7b;"name": "Bob", "age": "twenty"&#x7d;</code></p>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" /> Designing Effective Error Messages
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Be Specific and Informative</h3>
        <p>
          A generic &quot;Invalid JSON&quot; message is useless. Provide details:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>What</strong> is wrong? (e.g., &quot;Expected comma&quot;, &quot;Invalid number format&quot;)</li>
          <li><strong>Where</strong> is it wrong? (Provide line and column number)</li>
          <li><strong>Why</strong> is it wrong? (Brief explanation of the JSON rule violated)</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm my-4">
          <h4 className="font-medium mb-2">Bad Example:</h4>
          <p className="text-red-600 dark:text-red-400 flex items-center"><AlertTriangle className="inline mr-1"/> Error: JSON parse error.</p>
          <h4 className="font-medium mb-2 mt-4">Good Example:</h4>
          <p className="text-green-600 dark:text-green-400 flex items-start"><CheckCircle className="inline mr-1 flex-shrink-0"/> Error on line 3, column 10: Expected a comma (&#x2c;) or closing curly brace (&#x7d;) after a key-value pair.</p>
          <p className="mt-2"><em>Explanation:</em> The good example pinpoints the location and tells the user exactly what syntax element is missing or unexpected.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Provide Location (Line and Column)</h3>
        <p>
          For any non-trivial JSON, line and column numbers are essential. Integrate this information clearly into the error message and,
          if possible, highlight the specific location in the input area itself.
        </p>
         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm my-4">
          <h4 className="font-medium mb-2">Code Snippet with Error:</h4>
          <pre
            className="bg-white dark:bg-gray-900 p-3 rounded overflow-x-auto"
            dangerouslySetInnerHTML={{
              __html: `&#x7b;
  "name": "Alice",
  "age": 30 <em class="text-red-600 dark:text-red-400">Error here - missing comma</em>
  "city": "London"
&#x7d;`
            }}
          />
          <p className="text-green-600 dark:text-green-400 flex items-start mt-3"><CheckCircle className="inline mr-1 flex-shrink-0"/> Error on line 3, column 10: Expected comma (&#x2c;) or closing curly brace (&#x7d;).</p>
          <p className="mt-2"><em>Implementation detail:</em> The parser needs to track line and column numbers as it processes the input string or token stream.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Use Clear Language (Avoid Parser Jargon)</h3>
        <p>
          While line/column is technical, the description of the error should be in plain language. Avoid terms like
          &quot;unexpected token EOF&quot;, &quot;parse error near...&quot;, or internal parser state descriptions if a simpler explanation exists.
        </p>
         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm my-4">
          <h4 className="font-medium mb-2">Bad Example (Technical Jargon):</h4>
          <p className="text-red-600 dark:text-red-400 flex items-center"><AlertTriangle className="inline mr-1"/> Error: Unexpected token &apos;string&apos; at position 45.</p>
          <h4 className="font-medium mb-2 mt-4">Good Example (User-Friendly):</h4>
          <p className="text-green-600 dark:text-green-400 flex items-start"><CheckCircle className="inline mr-1 flex-shrink-0"/> Error on line 2, column 5: JSON object keys must be enclosed in double quotes (<code>"</code>).</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Use Visual Cues</h3>
        <p>
          Color is helpful but should not be the *only* indicator of an error. Use icons, bold text, or different borders
          to ensure errors are perceivable by users with color vision deficiencies or those using screen readers.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <div className="flex items-center text-red-600 dark:text-red-400 font-bold border border-red-600 dark:border-red-400 p-3 rounded">
             <AlertTriangle className="mr-2 flex-shrink-0" />
             <div>
               <p>Error: Invalid JSON syntax on line 5, column 1.</p>
               <p className="font-normal text-sm mt-1">Expected &apos;]&apos; but found &apos;&#x7b;&apos;.</p>
             </div>
          </div>
          <p className="mt-2 text-sm"><em>Benefit:</em> Uses color, icon, bold text, and border for redundancy.</p>
        </div>


        <h3 className="text-xl font-semibold mt-6">5. Highlight the Error Location in the Input</h3>
        <p>
          The most effective way to help users fix errors is to show them exactly where the problem is. This usually involves
          highlighting the line or range of characters in the text area where the JSON is being edited. Libraries used for
          code highlighting often support adding error markers.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
          <p className="flex items-center"><EyeOff className="mr-2 text-gray-500" /> <em>(Conceptual Example - actual highlighting depends on the editor component)</em></p>
          <p className="mt-2">Imagine the text area shows the JSON, and the line with the error (based on the reported line/column) is given a red background or a red marker in the gutter.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6">6. Group and Summarize Multiple Errors (for Validators)</h3>
        <p>
          If a validator finds multiple issues (e.g., schema violations), provide a summary list at the top, with links
          or pointers to the specific error locations within the JSON.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
           <h4 className="font-medium mb-2 flex items-center"><Search className="mr-2 text-blue-500" /> Validation Results: 3 Errors Found</h4>
           <ul className="list-disc pl-6 text-sm space-y-1">
             <li>Line 5, column 12: Expected type &apos;number&apos; for field &apos;age&apos;, but found &apos;string&apos;.</li>
             <li>Line 8, column 5: Missing required field &apos;email&apos;.</li>
             <li>Line 15, column 30: Value &apos;invalid-url&apos; for field &apos;website&apos; does not match expected URL pattern.</li>
           </ul>
         </div>

         <h3 className="text-xl font-semibold mt-6">7. Consider Screen Readers and Assistive Technologies</h3>
        <p>
          Ensure that error messages and their associated location information are programmatically determinable and correctly
          announced by screen readers. Use ARIA attributes (like <code>aria-invalid</code>, <code>aria-describedby</code>, or
          live regions with <code>aria-live=&quot;assertive&quot;</code>) to draw attention to errors without requiring visual focus.
          Clearly associate the error message with the input area it refers to.
        </p>

         <h3 className="text-xl font-semibold mt-6">8. Handle Large Inputs</h3>
         <p>
            For very large JSON documents, displaying the full document with highlighting might be slow or impractical.
            In these cases, focus on providing the line and column number clearly in the error message list. Some tools
            might offer a &quot;Jump to error&quot; functionality.
         </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-500" /> Summary of Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Be Precise:</strong> Include line and column numbers.</li>
          <li><strong>Be Clear:</strong> Use simple, direct language.</li>
          <li><strong>Be Helpful:</strong> Explain *what* is wrong and often *how* to fix it.</li>
          <li><strong>Be Redundant:</strong> Use color, icons, text formatting.</li>
          <li><strong>Be Discoverable:</strong> Highlight errors in the input area.</li>
          <li><strong>Be Accessible:</strong> Use ARIA attributes and consider screen readers.</li>
        </ul>

        <p>
          By implementing these principles, you can transform frustrating error experiences into helpful guidance,
          making your JSON formatter or validator significantly more user-friendly and accessible to a wider audience.
        </p>

      </div>
    </div>
  );
}