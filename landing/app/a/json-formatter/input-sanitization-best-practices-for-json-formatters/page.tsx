import type { Metadata } from "next";
import { Shield, AlertTriangle, Code, FileJson, ScanSearch, KeyRound, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Input Sanitization Best Practices for JSON Formatters | Offline Tools",
  description:
    "Explore essential input sanitization techniques for JSON formatting tools to prevent security vulnerabilities and ensure data integrity.",
};

export default function JsonFormatterSanitizationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="w-8 h-8 mr-3 text-green-600 dark:text-green-500" />
        Input Sanitization Best Practices for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          JSON formatters are incredibly useful tools, helping developers and users read and understand JSON data by
          adding indentation, syntax highlighting, and structure. However, if a JSON formatter processes untrusted or
          user-provided input without proper precautions, it can become a vector for security vulnerabilities or simply
          fail to work correctly.
        </p>
        <p>
          <strong>Input sanitization</strong> is the process of cleaning, filtering, or transforming data to ensure it
          is safe and valid for its intended use. For JSON formatters, this involves practices to handle potentially
          malicious or malformed input before it's processed or displayed.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-500" />
          Why Sanitize JSON Input?
        </h2>
        <p>Processing unsanitized input in a JSON formatter can lead to several issues:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Security Vulnerabilities:</strong> The most critical concern. If the formatted output is displayed
            in a web browser, unsanitized data within JSON strings (like HTML tags or JavaScript code) can lead to
            Cross-Site Scripting (XSS) attacks.
          </li>
          <li>
            <strong>Parser Errors:</strong> Malformed JSON will cause standard parsers (`JSON.parse`) to throw errors,
            crashing the formatting process.
          </li>
          <li>
            <strong>Unexpected Output:</strong> Valid but extremely large or deeply nested JSON could consume excessive
            resources (memory, CPU) during formatting, potentially leading to Denial of Service (DoS).
          </li>
          <li>
            <strong>Data Exposure:</strong> While formatting itself doesn't typically expose data, a formatter might be
            part of a larger tool where filtering sensitive fields *before* formatting is crucial.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ScanSearch className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-500" />
          Key Sanitization Principles & Techniques
        </h2>
        <p>Applying these principles can significantly enhance the robustness and security of your JSON formatter:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          1. Validate Syntax Early
        </h3>
        <p>
          Before attempting to format, always validate that the input string is syntactically correct JSON. The simplest
          way in JavaScript/TypeScript is using a `try...catch` block around `JSON.parse`.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Basic Syntax Validation:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function isValidJson(inputString: string): boolean {
  try {
    JSON.parse(inputString);
    return true;
  } catch (e) {
    // Log error if needed, but typically just returning false is sufficient for validation
    // console.error("Invalid JSON input:", e.message);
    return false;
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This ensures you only proceed with formatting if the input is parseable JSON.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <KeyRound className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          2. Escape Output for Display (XSS Prevention)
        </h3>
        <p>
          This is perhaps the most crucial step for web-based formatters. JSON string values can contain HTML or
          JavaScript code. When you render the formatted JSON into HTML (e.g., using `dangerouslySetInnerHTML` or
          similar methods for syntax highlighting), any unescaped HTML within string values will be executed by the
          browser.
        </p>
        <p>
          You must escape characters like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, and{" "}
          <code>&quot;</code> within the *string values* of the parsed JSON object before injecting them into your
          output HTML.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Escaping HTML in String Values:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;"); // Optional: escape single quotes
}

function deepEscapeJsonStrings(obj: any): any {
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepEscapeJsonStrings(item));
  }
  if (typeof obj === 'object' && obj !== null) {
    const escapedObj: { [key: string]: any } = {};
    // Note: JSON keys should ideally also be escaped if user-provided,
    // though less common to inject malicious HTML into keys.
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        escapedObj[key] = deepEscapeJsonStrings(obj[key]);
      }
    }
    return escapedObj;
  }
  return obj; // Return numbers, booleans, null as is
}

// Usage:
// try {
//   const parsed = JSON.parse(userInputJsonString);
//   const safeForDisplay = deepEscapeJsonStrings(parsed);
//   // Now format and display safeForDisplay
// } catch (e) {
//   // Handle invalid JSON
// }
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Apply this deep escaping function to the *parsed* JavaScript object/array before you start converting it
            back into formatted HTML/text for display. Dedicated JSON formatting libraries often handle this internally
            if configured correctly.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileJson className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          3. Limit Input Size and Structure Depth
        </h3>
        <p>
          Large inputs or deeply nested structures can exhaust server or browser resources. Consider implementing
          limits:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Maximum Input String Length:</strong> Reject inputs exceeding a certain size (e.g., 1MB).
          </li>
          <li>
            <strong>Maximum Parse Depth:</strong> If you are using a custom parser or need to protect against stack
            overflow in `JSON.parse` (though modern engines have protections), you might limit the maximum nested level
            of objects/arrays. This is harder with built-in `JSON.parse` but possible with custom parsers or by
            recursively checking depth during processing *after* parsing.
          </li>
          <li>
            <strong>Maximum Number of Nodes:</strong> Limit the total count of values (strings, numbers, objects,
            arrays, booleans, nulls) in the parsed structure.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Depth Limiting (After Parsing):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function checkDepth(obj: any, maxDepth: number, currentDepth: number = 0) {
  if (currentDepth > maxDepth) {
    throw new Error("JSON structure exceeds maximum allowed depth.");
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      checkDepth(item, maxDepth, currentDepth + 1);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        checkDepth(obj[key], maxDepth, currentDepth + 1);
      }
    }
  }
}

// Usage:
// const maxAllowedDepth = 50; // Choose a reasonable limit
// try {
//   const parsed = JSON.parse(userInputJsonString);
//   checkDepth(parsed, maxAllowedDepth); // Check depth *after* parsing
//   // Proceed with formatting if valid and within depth limits
// } catch (e) {
//   // Handle invalid JSON or depth error
//   console.error("Processing failed:", e.message);
// }
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This example checks depth recursively *after* parsing. You could integrate this logic into a custom parser
            if needed, or perform the check before formatting.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <EyeOff className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
          4. Filter Sensitive Data (If Applicable)
        </h3>
        <p>
          If your formatter is used in a context where the input JSON might contain sensitive information that should
          not be displayed (e.g., passwords, API keys), you should filter these fields out *before* formatting.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Data Filtering:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function filterSensitiveFields(obj: any, sensitiveKeys: string[]): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => filterSensitiveFields(item, sensitiveKeys));
  }

  const filteredObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (sensitiveKeys.includes(key.toLowerCase())) { // Case-insensitive check
        filteredObj[key] = '[FILTERED]'; // Replace sensitive value
      } else {
        filteredObj[key] = filterSensitiveFields(obj[key], sensitiveKeys); // Recurse
      }
    }
  }
  return filteredObj;
}

// Usage:
// const sensitiveKeys = ['password', 'apikey', 'creditcard'];
// try {
//   const parsed = JSON.parse(userInputJsonString);
//   const filteredData = filterSensitiveFields(parsed, sensitiveKeys);
//   // Now format and display filteredData
// } catch (e) {
//   // Handle invalid JSON
// }
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This function recursively traverses the parsed object and replaces values for specified keys. Customize the
            replacement string or logic as needed.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. Use Libraries Wisely</h3>
        <p>
          Instead of building complex formatting and sanitization logic from scratch, consider using well-vetted
          libraries designed for secure JSON handling and formatting. Many provide options for escaping output. Always
          understand the security features (or lack thereof) of any third-party library you use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600 dark:text-yellow-500" />
          Common Pitfalls
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Assuming `JSON.parse` is Enough:</strong> While `JSON.parse` handles syntax validation, it does
            nothing to make the *values* within the JSON safe for HTML display.
          </li>
          <li>
            <strong>Trusting Client-Side Sanitization Alone:</strong> If your formatter has a backend component that
            receives JSON from the user, perform sanitization on the server-side as well, not just in the browser.
          </li>
          <li>
            <strong>Using `dangerouslySetInnerHTML` without Escaping:</strong> As mentioned, injecting formatted JSON
            strings into the DOM this way without escaping is a prime cause of XSS.
          </li>
          <li>
            <strong>Inefficient Sanitization:</strong> Deeply recursive sanitization on extremely large JSON can be
            slow. Consider streaming or iterative approaches for very large inputs if performance is critical.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-green-600 dark:text-green-500" />
          Conclusion
        </h2>
        <p>
          Input sanitization is not an afterthought; it's a fundamental security and stability requirement for any tool
          that processes user-provided data, including JSON formatters. By validating input syntax, escaping output for
          display, limiting structure size, and potentially filtering sensitive data, you can build formatters that are
          not only functional but also secure and reliable. Always consider the context in which your formatter is used
          and apply the appropriate level of sanitization.
        </p>
      </div>
    </>
  );
}
