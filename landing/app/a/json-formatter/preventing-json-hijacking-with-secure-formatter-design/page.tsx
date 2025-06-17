import type { Metadata } from "next";
import { ShieldCheck, AlertTriangle, Lock, Code } from "lucide-react"; // Import icons from lucide-react

export const metadata: Metadata = {
  title: "Preventing JSON Hijacking with Secure Formatter Design",
  description:
    "Understand JSON hijacking vulnerabilities and learn how secure JSON response formatting prevents this client-side attack.",
};

export default function JsonHijackingPreventionPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShieldCheck className="mr-3 text-green-600" size={32} />
        Preventing JSON Hijacking with Secure Formatter Design
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. While seemingly
          simple, improperly formatted JSON responses can expose web applications to a vulnerability known as JSON
          Hijacking or JSON Array Hijacking. This page explains the attack vector and, more importantly, how designing
          your backend to format JSON securely can prevent it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-600" size={24} />
          What is JSON Hijacking?
        </h2>
        <p>
          JSON Hijacking is a client-side attack where a malicious website loads sensitive JSON data from a vulnerable
          origin and reads it, typically by exploiting how browsers handle script execution and array/object literals.
        </p>
        <p>
          The core idea is that if a sensitive JSON response is returned as a valid JavaScript array or object literal,
          a malicious page loaded in the victim&apos;s browser might be able to execute the JSON response as a script
          and gain access to the data.
        </p>

        <h3 className="text-xl font-semibold mt-6">The Attack Vector Explained:</h3>
        <p>
          Imagine a banking application at <code>bank.example.com</code> that has an endpoint like{" "}
          <code>/api/transactions</code>
          which returns a user&apos;s transaction history as a JSON array:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Vulnerable JSON Output:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`[
  &#x7b;
    "id": 123,
    "date": "2023-10-27",
    "description": "Salary Deposit",
    "amount": 5000.00
  &#x7d;,
  &#x7b;
    "id": 124,
    "date": "2023-10-28",
    "description": "Groceries",
    "amount": -150.50
  &#x7d;
  // ... potentially sensitive data ...
]`}
          </pre>
        </div>
        <p>
          If a user visits a malicious site (<code>malicious.com</code>) in the same browser where they are logged into{" "}
          <code>bank.example.com</code>, the malicious site could attempt to load the <code>/api/transactions</code>{" "}
          endpoint using a <code>&lt;script&gt;</code> tag:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">
            Malicious Script Tag on <code>malicious.com</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`&lt;script src="https://bank.example.com/api/transactions"&gt;&lt;/script&gt;`}
          </pre>
        </div>
        <p>
          Since the user is logged in, the browser sends the authentication cookies with the request to{" "}
          <code>bank.example.com</code>. If the <code>/api/transactions</code> response is just a plain JSON array (
          <code>[...]</code>), the browser might interpret this response as JavaScript code trying to define an array
          literal.
        </p>
        <p>
          In older browsers or specific JavaScript contexts (like overriding the <code>Array</code> constructor or using
          getter properties), the malicious script could potentially intercept or read the data as it&apos;s being
          &quot;defined&quot; by the loaded &lt;script&gt;. Similarly, a plain JSON object literal (
          <code>&#x7b;...&#x7d;</code>) might be assignable to a global variable if wrapped in parentheses (
          <code>(&#x7b;...&#x7d;)</code>).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lock className="mr-2 text-blue-600" size={24} />
          The Solution: Secure JSON Formatter Design
        </h2>
        <p>
          The key to preventing JSON Hijacking is to ensure that the JSON response, when loaded as a script, is *not*
          valid or executable JavaScript that could reveal sensitive data. This is achieved by modifying the format of
          the JSON response slightly.
        </p>
        <p>
          Secure JSON formatter design focuses on making the JSON response syntaxically valid JSON, but invalid or inert
          when interpreted directly as a standalone JavaScript script by the browser&apos;s script parser.
        </p>

        <h3 className="text-xl font-semibold mt-6">Method 1: Wrapping the JSON</h3>
        <p>
          One common method is to wrap the actual JSON payload inside an outer structure that makes it non-executable as
          a simple literal.
        </p>

        <h4 className="text-lg font-medium mt-4">Wrap in an Object with a Key:</h4>
        <p>Instead of returning a plain array or object, wrap it inside an object with a specific key.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Secure JSON Output (Wrapped):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`&#x7b;
  "data": [
    &#x7b;
      "id": 123,
      "date": "2023-10-27",
      "description": "Salary Deposit",
      "amount": 5000.00
    &#x7d;,
    &#x7b;
      "id": 124,
      "date": "2023-10-28",
      "description": "Groceries",
      "amount": -150.50
    &#x7d;
  ]
&#x7d;`}
          </pre>
        </div>
        <p>
          When loaded via a <code>&lt;script&gt;</code> tag, a plain object literal (<code>&#x7b;...&#x7d;</code>) is
          usually parsed as a JavaScript{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            block statement
          </a>
          containing labeled statements. This parsing behavior prevents direct access to the object&apos;s contents as a
          simple value. The malicious script cannot easily assign this &quot;block&quot; to a variable to read the
          &quot;data&quot; property.
        </p>

        <h4 className="text-lg font-medium mt-4">Wrap in a JSON string:</h4>
        <p>
          Although less common for standard API responses, you could theoretically return the entire JSON as a string
          value within an object.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Secure JSON Output (String Wrapped):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`&#x7b;
  "data": "[{\\"id\\": 123, \\"date\\": \\"2023-10-27\\", \\"description\\": \\"Salary Deposit\\", \\"amount\\": 5000.00}, {\\"id\\": 124, \\"date\\": \\"2023-10-28\\", \\"description\\": \\"Groceries\\", \\"amount\\": -150.50}]"
&#x7d;`}
          </pre>
        </div>
        <p>
          The client would then need to parse the string value of the <code>data</code> property. Loading a script that
          defines an object with a string property doesn&apos;t execute arbitrary code or expose data easily.
        </p>

        <h3 className="text-xl font-semibold mt-6">Method 2: JSON Prefixing</h3>
        <p>
          This method adds a specific, non-executable prefix to the JSON response. The most common prefixes are an
          infinite loop statement.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Secure JSON Output (with Prefix):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`while(1);[
  &#x7b;
    "id": 123,
    "date": "2023-10-27",
    "description": "Salary Deposit",
    "amount": 5000.00
  &#x7d;,
  &#x7b;
    "id": 124,
    "date": "2023-10-28",
    "description": "Groceries",
    "amount": -150.50
  &#x7b;
]`}
          </pre>
        </div>
        <p>
          When loaded via a <code>&lt;script&gt;</code> tag, the browser&apos;s JavaScript engine will encounter the{" "}
          <code>while(1);</code> (or <code>for(;;);</code>) statement first. This creates an infinite loop, effectively
          hanging the script execution before the JSON data (the array literal) is processed. The malicious script is
          trapped in the loop and cannot access the data.
        </p>
        <p>
          When your legitimate frontend application fetches this data using standard methods like <code>fetch</code> or{" "}
          <code>XMLHttpRequest</code>, it receives the full text response, including the prefix. The frontend code then
          needs to parse this response: first, it should remove the known prefix (e.g., check if the response starts
          with <code>while(1);</code> and slice it off), and *then* parse the remaining string as JSON using{" "}
          <code>JSON.parse()</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Frontend Parsing with Prefix Removal:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`const expectedPrefix = 'while(1);';

async function fetchSecureJson(url) {
  const response = await fetch(url);
  const text = await response.text();

  if (text.startsWith(expectedPrefix)) {
    const jsonString = text.substring(expectedPrefix.length);
    try {
      const data = JSON.parse(jsonString);
      return data; // The actual JSON data
    } catch (e) {
      console.error('Failed to parse JSON after removing prefix:', e);
      throw new Error('Invalid JSON response');
    }
  } else {
    console.error('Response did not start with expected prefix.');
    // Handle error or unexpected response format
    throw new Error('Unexpected response format');
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-600" size={24} />
          Implementation Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Backend Responsibility:</strong> The secure formatting must be implemented on the backend server
            side for any endpoint returning sensitive JSON data.
          </li>
          <li>
            <strong>Consistency:</strong> Choose one method (wrapping or prefixing) and apply it consistently to all
            sensitive JSON endpoints.
          </li>
          <li>
            <strong>Frontend Adaptation:</strong> If using the prefix method, the frontend code consuming the API must
            be updated to handle the prefix before parsing the JSON.
          </li>
          <li>
            <strong>Modern Browsers:</strong> While modern browsers have mitigations that make the original JSON Array
            Hijacking attack less prevalent (e.g., stricter script parsing rules, Content Security Policy), implementing
            secure formatting is still considered a robust defense-in-depth measure, especially for sensitive data and
            for compatibility with older clients or specific browser configurations.
          </li>
          <li>
            <strong>Content-Type:</strong> Ensure the response uses the correct <code>Content-Type</code> header,
            typically <code>application/json</code>. While this doesn&apos;t prevent the script tag attack (browsers
            often sniff content), it&apos;s correct practice.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON Hijacking is a historical vulnerability that leveraged how browsers interpreted JSON arrays or objects
          when loaded as scripts. By implementing a secure JSON formatter on the backend – either by wrapping the data
          in a non-executable structure or by adding a non-terminating prefix – you can effectively mitigate this risk.
          While browser security has evolved, employing secure formatting remains a valuable practice for protecting
          sensitive data transmitted via JSON APIs, contributing to a more secure application architecture.
        </p>
      </div>
    </>
  );
}
