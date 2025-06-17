import type { Metadata } from "next";
import { Lock, AlertTriangle, Database, XCircle, CheckCircle } from "lucide-react"; // Importing necessary icons

export const metadata: Metadata = {
  title: "Secure Local Storage in Browser-Based JSON Formatters | Offline Tools",
  description:
    "Understand the security implications of using browser local storage in JSON formatters and explore safer alternatives.",
};

export default function SecureLocalStoragePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Lock className="mr-3" size={30} /> Secure Local Storage in Browser-Based JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          Browser-based JSON formatters are convenient tools that run entirely in the user&apos;s browser, offering
          speed and privacy by processing data client-side. Many such tools include features like remembering the last
          input, saving session data, or storing user preferences. A common mechanism for this is the browser&apos;s{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>. While handy, using{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> for potentially
          sensitive JSON data comes with significant security risks that developers must understand.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-500" size={24} /> The Risks of{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>
        </h2>
        <p>
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> provides a simple
          key-value store for persistent data within a single origin (scheme + hostname + port). However, its primary
          drawback from a security perspective is that it is easily accessible via client-side JavaScript.
        </p>
        <p>
          The main threat vector is <strong className="font-semibold">Cross-Site Scripting (XSS)</strong>. If a JSON
          formatter&apos;s webpage is vulnerable to XSS, an attacker can inject malicious JavaScript code that executes
          in the context of the user&apos;s browser. This malicious script can then access *all* data stored in{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> for that origin and
          send it to the attacker&apos;s server.
        </p>
        <p>
          Consider a scenario where a user pastes JSON containing sensitive information (like API keys, personal data,
          authentication tokens, etc.) into a formatter that saves the input to{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>. If that formatter
          website has an XSS vulnerability (even in an unrelated part of the site), an attacker could potentially steal
          that sensitive JSON data the next time the user visits the page.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <XCircle className="mr-2 text-red-500" size={20} /> What NOT to Store in{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Any data that is personally identifiable (PII).</li>
          <li>Authentication tokens, session IDs, or cookies duplicates.</li>
          <li>API keys or secrets.</li>
          <li>Financial information.</li>
          <li>Health information.</li>
          <li>Any data that, if leaked, could cause harm to the user.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="mr-2" size={24} /> Safer Alternatives and Best Practices
        </h2>
        <p>
          Given the risks, storing the actual JSON input (especially if it might contain sensitive data) directly in{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> is generally a bad
          idea for a public-facing JSON formatter. Here are some safer approaches:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Do Not Store Sensitive Data At All</h3>
        <p>
          The most secure approach is simply to not persist the user&apos;s JSON input beyond their current session.
          This prevents the possibility of sensitive data being compromised later via XSS or other client-side attacks.
          Users can save the formatted output manually if needed.
        </p>
        <p>
          <CheckCircle className="inline-block mr-1 text-green-600" size={18} /> This is the default behavior of many
          secure tools.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Session Storage vs. Local Storage</h3>
        <p>
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">sessionStorage</code> is similar to{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>, but data persists
          only for the duration of the browser session (until the tab or window is closed). While still vulnerable to
          XSS during the active session, it limits the window of opportunity for attackers compared to{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>. It might be
          acceptable for very temporary, non-critical data like UI state, but still not for potentially sensitive JSON
          inputs.
        </p>
        <p>
          <AlertTriangle className="inline-block mr-1 text-yellow-500" size={18} /> Still vulnerable to XSS during the
          active session.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Storing Only Non-Sensitive Preferences</h3>
        <p>
          If you must use <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>,
          restrict its use to storing only non-sensitive user preferences related to the formatter&apos;s UI or
          behavior. Examples include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Theme preference (dark/light mode).</li>
          <li>Indentation size (2 spaces, 4 spaces, tabs).</li>
          <li>Whether to sort keys.</li>
          <li>Font size.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Storing Indent Preference (Conceptual JS/TS)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Saving preference
try {
  localStorage.setItem('jsonFormatterIndent', '2');
} catch (e) {
  console.error("Could not save indent preference:", e);
}

// Loading preference
try {
  const indent = localStorage.getItem('jsonFormatterIndent');
  if (indent) {
    // Use the loaded indent preference
    console.log("Loaded indent preference:", indent);
  }
} catch (e) {
  console.error("Could not load indent preference:", e);
}
`}
            </pre>
          </div>
        </div>
        <p>
          Even with non-sensitive data, wrap{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> operations in{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">try...catch</code> blocks, as it can be
          disabled by the user or browser settings, and accessing it might throw errors (e.g., when storage quota is
          exceeded in some browsers like Safari in private mode).
        </p>
        <p>
          <CheckCircle className="inline-block mr-1 text-green-600" size={18} /> Safe for non-sensitive UI/behavior
          preferences.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Encrypting Data Before Storing (Advanced/Rarely Justified)</h3>
        <p>
          It is theoretically possible to encrypt sensitive JSON data before storing it in{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> and decrypt it upon
          retrieval. However, this is extremely difficult to implement securely in a browser context. The
          encryption/decryption key would also need to be present in the client-side JavaScript. If an attacker
          successfully injects an XSS script, they can potentially steal the encryption key from the JavaScript bundle
          and then decrypt the data in{" "}
          <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code>. This method adds
          complexity without providing robust protection against a sophisticated XSS attack.
        </p>
        <p>
          <AlertTriangle className="inline-block mr-1 text-yellow-500" size={18} /> Complex and generally does NOT
          provide strong protection against XSS.
        </p>

        <h3 className="text-xl font-semibold mt-6">5. Using Server-Side Storage (Changes Tool Scope)</h3>
        <p>
          If persistent storage of JSON input is a critical feature (e.g., for registered users to save their work), the
          data should be stored securely on a server-side database, not client-side storage. This changes the tool from
          a purely client-side formatter to a web application requiring a backend. While this offers true persistence
          and much stronger security guarantees (assuming the backend is secure), it&apos;s outside the scope of a
          simple browser-based, offline-capable formatter.
        </p>
        <p>
          <CheckCircle className="inline-block mr-1 text-green-600" size={18} /> Most secure for persistent sensitive
          data, but requires a backend.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While <code className="font-mono bg-gray-100 p-1 rounded dark:bg-gray-800">localStorage</code> is convenient
          for simple preference storage in browser-based applications, it is fundamentally insecure for storing
          potentially sensitive user data, especially in a tool designed to process arbitrary JSON. Developers of JSON
          formatters should prioritize user privacy and security by default. The safest approach is to avoid storing the
          JSON input itself client-side. If persistence is required, clearly communicate the risks to the user or
          implement a secure server-side storage solution.
        </p>
        <p>
          Educating users about the sensitive nature of the data they might process and the limitations of browser
          storage is also a crucial aspect of building responsible online tools.
        </p>
      </div>
    </>
  );
}
