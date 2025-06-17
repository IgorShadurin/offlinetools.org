import type { Metadata } from "next";
import { AlertTriangle, Shield, Code, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Injection Attacks: How Formatters Help Prevent Them | Security Guide",
  description:
    "Understand JSON injection attacks and how using strict JSON formatters/parsers like JSON.parse() protects your applications by validating syntax and preventing code execution.",
};

export default function JsonInjectionPrevention() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Shield className="w-8 h-8 text-green-600" />
        <span>JSON Injection Attacks: How Formatters Help Prevent Them</span>
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. Its simplicity and
          readability make it incredibly popular. However, just like SQL, XML, or any other structured data format,
          processing untrusted JSON input without proper care can expose your application to security vulnerabilities,
          particularly <strong>JSON Injection Attacks</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>What is a JSON Injection Attack?</span>
        </h2>
        <p>
          A JSON Injection attack occurs when an attacker provides malicious data that, when processed by the
          application as JSON, alters the intended structure or content of the data in a harmful way, or worse, causes
          unintended code execution.
        </p>
        <p>
          The core of this vulnerability lies in how the application parses or interprets the input string. If the
          application uses an unsafe method that evaluates the input string as code, an attacker can inject JavaScript
          code disguised as JSON data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-blue-500" />
          <span>The Danger of Unsafe Evaluation</span>
        </h2>
        <p>
          Historically, before native JSON parsers were widespread, developers sometimes used JavaScript's
          <code>eval()</code> function to parse JSON strings. The idea was that a valid JSON string is also a valid
          JavaScript expression that evaluates to an object or array.
        </p>
        <p>
          However, <code>eval()</code> is incredibly dangerous when used with untrusted input because it executes *any*
          valid JavaScript code within the string, not just code that forms a JSON structure.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">
            Example: Unsafe Parsing with <code>eval()</code>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume this comes from user input
const userInput = '{"name": "Attacker", "age": 30, "admin": true}';

// This looks like valid JSON
const data = eval('(' + userInput + ')'); // Parentheses needed for object literal evaluation

console.log(data); // { name: "Attacker", age: 30, admin: true } - Seems okay?

// --- Now consider malicious input ---

const maliciousInput = '{"name": "Attacker", "exec": alert("You have been pwned!")}'; // Malicious code within the "JSON"

// Using eval() executes the alert() function immediately!
// const dangerousData = eval('(' + maliciousInput + ')'); // DO NOT RUN THIS IN PRODUCTION!
// console.log(dangerousData);
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4" />
            <span>
              Using <code>eval()</code> with untrusted JSON input is a critical security vulnerability. It can lead to
              Cross-Site Scripting (XSS), data breaches, or even Remote Code Execution (RCE) depending on the
              environment and the code executed.
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span>How Proper JSON Formatters (Parsers) Help</span>
        </h2>
        <p>
          This is where dedicated JSON parsers, often built into modern programming languages and frameworks, come to
          the rescue. The most common and recommended way to parse JSON in JavaScript environments (including Node.js
          backend applications like a Next.js API route) is using the built-in
          <code>JSON.parse()</code> method.
        </p>
        <p>
          <code>JSON.parse()</code> is a <strong>strict JSON formatter and validator</strong>. It does not evaluate the
          input string as general JavaScript code. Instead, it:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Strictly Validates JSON Syntax:</strong> It checks if the input string strictly adheres to the{" "}
            <a
              href="https://www.json.org/json-en.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              official JSON specification
            </a>
            . This includes rules like:
            <ul className="list-disc pl-6 mt-1">
              <li>Object keys must be double-quoted strings.</li>
              <li>Strings must use double quotes.</li>
              <li>Only specific data types are allowed (string, number, boolean, null, object, array).</li>
              <li>No trailing commas are allowed in objects or arrays.</li>
              <li>No comments are allowed.</li>
            </ul>
            If the string deviates from the strict JSON format, <code>JSON.parse()</code> will throw a
            <code>SyntaxError</code>.
          </li>
          <li>
            <strong>Parses, Does Not Evaluate:</strong> Crucially, <code>JSON.parse()</code> is a parser, not an
            interpreter. It reads the string character by character, builds an internal representation of the data
            structure based on the strict JSON rules, and then constructs a native JavaScript object or array from that
            representation. It does not execute any code found within the string.
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">
            Example: Safe Parsing with <code>JSON.parse()</code>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume this comes from user input
const userInput = '{"name": "Attacker", "age": 30, "admin": true}';

try {
  // JSON.parse() safely parses the string
  const data = JSON.parse(userInput);
  console.log(data); // { name: "Attacker", age: 30, admin: true }
} catch (error) {
  console.error("Failed to parse JSON:", error.message);
}

// --- Now try the malicious input again ---

const maliciousInput = '{"name": "Attacker", "exec": alert("You have been pwned!")}';

try {
  // JSON.parse() will throw a SyntaxError because 'alert(...)' is not a valid JSON value
  const dangerousData = JSON.parse(maliciousInput);
  // The code inside alert() is NEVER executed
  console.log(dangerousData); // This line is not reached
} catch (error: any) { // Catching potential errors, error type might be SyntaxError
  console.error("Failed to parse JSON:", error.message); // Outputs: "Failed to parse JSON: Unexpected token A in JSON at position X..."
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>
              Using <code>JSON.parse()</code> prevents code execution because it only accepts strictly valid JSON values
              and structures. Malicious code disguised as data will cause a parsing error instead of executing.
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Shield className="w-6 h-6 text-green-600" />
          <span>Beyond Parsing: Input Validation</span>
        </h2>
        <p>
          While using a proper JSON parser like <code>JSON.parse()</code> is the fundamental defense against JSON
          injection via unsafe evaluation, it&apos;s not the complete security story. Parsers only ensure the input is
          *syntactically* correct JSON and produce a standard JavaScript object/array.
        </p>
        <p>
          After parsing, you must still validate the *content* and *structure* of the resulting data against your
          application&apos;s expectations. This means checking:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Do the expected keys exist?</li>
          <li>
            Are the values of the correct data types (e.g., is <code>age</code> a number, not a string)?
          </li>
          <li>Are the values within acceptable ranges or formats (e.g., is the age a positive number)?</li>
          <li>
            Does the structure match what you expect (e.g., is <code>courses</code> an array of strings)?
          </li>
        </ul>
        <p>
          Failing to validate the parsed data can lead to other issues, such as application logic errors,
          denial-of-service (if deeply nested or huge structures are allowed), or potentially injection vulnerabilities
          in other parts of your application that consume the parsed data without type/format checks. Libraries like
          Zod, Yup, or Joi can be very helpful for this post-parsing validation step.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON Injection attacks exploiting unsafe evaluation methods like <code>eval()</code> are a serious threat.
          Fortunately, preventing this specific type of injection is straightforward and built into the platform: always
          use the standard, secure <code>JSON.parse()</code> function to parse JSON strings from untrusted sources.
        </p>
        <p>
          <code>JSON.parse()</code> acts as a strict formatter and validator, ensuring the input conforms to the JSON
          specification and, crucially, does not execute arbitrary code. Pair this with robust post-parsing validation
          of the data's structure and content, and you will significantly harden your application against
          vulnerabilities stemming from untrusted JSON input.
        </p>
      </div>
    </>
  );
}
