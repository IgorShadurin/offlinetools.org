import type { Metadata } from "next";
import {
  Lock,
  Shield,
  Bug,
  AlertTriangle,
  CheckCircle,
  Code,
  ListChecks,
  Server,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Secure Code Review for JSON Parsing Libraries | Offline Tools",
  description:
    "A comprehensive guide for developers on how to conduct secure code reviews of JSON parsing logic and libraries to prevent common vulnerabilities.",
};

export default function SecureJsonParsingReview() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Lock className="w-8 h-8 text-primary" />
        <span>Secure Code Review for JSON Parsing</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Shield className="w-6 h-6 text-primary" />
            <span>Why Secure JSON Parsing Matters</span>
          </h2>
          <p>
            JSON (JavaScript Object Notation) is ubiquitous for data exchange. While seemingly simple,
            parsing untrusted JSON input securely is critical. Flaws in JSON parsing can expose applications
            to various risks, including:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <span className="font-medium">Injection Attacks:</span> Although less common than SQL or Command Injection,
              parsing can interact with parts of an application vulnerable to injection if not handled correctly
              (e.g., using parsed data directly in dynamic code execution like `eval` or in database queries without
              proper sanitization).
            </li>
            <li>
              <span className="font-medium">Denial of Service (DoS):</span> Specially crafted JSON documents can consume excessive
              memory or CPU resources, leading to application crashes or unresponsiveness. This includes overly deep
              nesting, extremely large structures, or resource-intensive key calculations (hash collisions).
            </li>
            <li>
              <span className="font-medium">Data Leaks:</span> Improper error handling during parsing might reveal sensitive
              information about the application's structure or backend state.
            </li>
            <li>
              <span className="font-medium">Type Confusion:</span> Some parsers might be lenient with types or allow unexpected
              type coercion, which could be exploited if the application code doesn't strictly validate types *after*
              parsing.
            </li>
          </ul>
          <p className="mt-4">
            A secure code review process helps identify these potential pitfalls, whether you are reviewing the code
            that uses a JSON parsing library or reviewing the parsing library itself (though the latter is a more
            advanced task).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-primary" />
            <span>Common Vulnerabilities in JSON Parsing</span>
          </h2>
          <p>Let&apos;s dive into specific areas where vulnerabilities often hide:</p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            <Bug className="inline w-5 h-5 mr-2 text-red-500" />
            <span>1. Resource Consumption (DoS)</span>
          </h3>
          <p>
            JSON structures can be nested arbitrarily deep or contain very large arrays/objects. Without limits,
            parsing these can lead to stack overflows (deep nesting) or excessive memory allocation (large structures).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example Scenario (Conceptual):</h4>
            <p>
              An attacker sends JSON like <code>[[[...[[]]...]]]</code> with 100,000 levels of nesting
              or an array like <code>[null, null, ..., null]</code> with millions of elements.
            </p>
            <h4 className="text-lg font-medium mt-4 mb-2">What to look for:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Does the parser or application code limit maximum nesting depth?</li>
              <li>Are there limits on the total size of the input JSON string?</li>
              <li>Are there limits on the maximum number of elements in arrays or properties in objects?</li>
              <li>
                For parsers handling very large inputs, do they use streaming or SAX-like
                approaches instead of loading the whole structure into memory?
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            <Bug className="inline w-5 h-5 mr-2 text-red-500" />
            <span>2. Code Execution via `eval` (Historical but relevant)</span>
          </h3>
          <p>
            Historically, some approaches to parsing JSON in JavaScript involved using <code>eval()</code>.
            This is extremely dangerous as it allows arbitrary code execution if the input JSON contains JavaScript code.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example Vulnerable Code:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`// ** DO NOT USE THIS - THIS IS VULNERABLE **
function parseJsonUnsafely(jsonString) {
  try {
    // Attacker can inject arbitrary JS code here!
    const data = eval('(' + jsonString + ')');
    return data;
  } catch (e) {
    console.error("Parsing error:", e);
    return null;
  }
}`}
              </pre>
            </div>
            <p className="mt-2 font-bold text-red-600 dark:text-red-400">
              <AlertTriangle className="inline w-4 h-4 mr-1" /> Modern, secure JSON parsers (like `JSON.parse` in JS/TS) do NOT use `eval`. Ensure your library doesn&apos;t.
            </p>
            <h4 className="text-lg font-medium mt-4 mb-2">What to look for:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Does the parser implementation (if reviewing the library) or surrounding code use `eval`, `Function`, or similar dynamic execution functions?</li>
              <li>Is the input JSON processed in any way (e.g., string replacement) *before* being passed to the parser, which could enable injection?</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            <Bug className="inline w-5 h-5 mr-2 text-red-500" />
            <span>3. Prototype Pollution</span>
          </h3>
          <p>
            Some JavaScript-based object merging or cloning utilities that process JSON-like structures
            can be vulnerable to Prototype Pollution. An attacker might inject keys like <code>__proto__</code>{" "}
            or <code>constructor.prototype</code> to add or modify properties on built-in JavaScript object
            prototypes, affecting seemingly unrelated parts of the application. While not strictly a *parser*
            issue, it's a common post-parsing vulnerability when merging/processing the resulting object.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">Example Vulnerable Pattern (Conceptual post-parsing):</h4>
            <p>
              If you have a function that recursively merges properties from a source object (parsed JSON)
              into a target object without checking key names, malicious JSON like{" "}
              <code>&#x7b;&quot;__proto__&quot;:&#x7b;&quot;isAdmin&quot;:true&#x7d;&#x7d;</code>
              could potentially add an <code>isAdmin</code> property to <em>all</em> objects.
            </p>
            <h4 className="text-lg font-medium mt-4 mb-2">What to look for:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>When processing the parsed JSON object, are there merging or cloning functions that recursively copy properties?</li>
              <li>Do these functions explicitly check for or reject `__proto__`, `constructor`, and `prototype` keys?</li>
              <li>Is the application logic susceptible to unexpected properties being added to objects?</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            <Bug className="inline w-5 h-5 mr-2 text-red-500" />
            <span>4. External Entity Inclusion / XXE-like Issues</span>
          </h3>
          <p>
            JSON itself has no standard mechanism for external entities (unlike XML). However, some
            custom or extended "JSON" formats or libraries might introduce similar concepts or features
            that could lead to Server-Side Request Forgery (SSRF) or information disclosure if they attempt
            to fetch data based on parsed content. This is rare for standard JSON libraries but possible
            in specialized parsers.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">What to look for:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Does the parser library support any non-standard JSON extensions?</li>
              <li>Do any string values within the parsed JSON trigger external lookups or file reads in the application code?</li>
            </ul>
          </div>

           <h3 className="text-xl font-semibold mt-6 mb-3">
            <Bug className="inline w-5 h-5 mr-2 text-red-500" />
            <span>5. Information Disclosure via Error Messages</span>
          </h3>
          <p>
            Verbose error messages during parsing can sometimes reveal internal file paths, library versions,
            or stack traces that help attackers understand the system structure.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2">What to look for:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Are raw parser error messages shown directly to the user or client?</li>
              <li>Are error messages logged securely on the server-side without revealing sensitive details?</li>
              <li>Are generic error messages returned to the client for parsing failures?</li>
            </ul>
          </div>

        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <ListChecks className="w-6 h-6 text-primary" />
            <span>Code Review Checklist for JSON Parsing Logic</span>
          </h2>
          <p>Use this checklist when reviewing code that receives and parses JSON input:</p>
          <ul className="list-disc pl-6 mt-4 space-y-3">
            <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Input Source Trustworthiness:</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">Is the JSON coming from a trusted source (e.g., internal API) or an untrusted source (e.g., public API, user input)? Assume untrusted unless proven otherwise. Higher trust requires less scrutiny of the *source* but the parsing code itself should still be robust.</p>
            </li>
             <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Parser Library Choice:</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">Is a standard, well-maintained, and security-audited library being used (e.g., `JSON.parse` in JS/TS, standard library parsers in Python, Java, Go, etc.)? Avoid custom or less-known parsers unless absolutely necessary and thoroughly reviewed.</p>
            </li>
            <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Error Handling:</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">Is the parsing operation wrapped in a `try...catch` block or similar error handling mechanism? What happens if parsing fails? Does it throw a controlled error, or crash the application? Are specific parsing errors caught and handled differently?</p>
            </li>
            <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Error Message verbosity:</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">Are error messages returned to the client generic (e.g., &quot;Invalid input format&quot;) or detailed (e.g., showing parser internal state, file paths)? Detailed errors should be logged securely server-side, not exposed externally.</p>
            </li>
            <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Resource Limits (DoS Prevention):</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">Does the parsing process enforce limits on input size, nesting depth, or number of elements/properties? Many standard libraries have configuration options for this. If not, is there code to check these *before* or *during* parsing?</p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
                 <h5 className="font-mono text-sm mb-2">Example (Conceptual - Node.js):</h5>
                 <pre className="text-xs">
                  {`// Using a library with limits (example: 'secure-json-parse')
import { parse } from 'secure-json-parse';

try {
  const unsafeJsonString = "..."; // Untrusted input
  const options = {
    // Configure limits
    maxDepth: 20, // Prevent stack overflows
    maxKeys: 1000, // Limit number of object properties
    maxStringLength: 10000, // Limit size of individual strings
    // ... other limits
  };
  const parsedData = parse(unsafeJsonString, options);
  // ... process parsedData safely
} catch (error) {
  console.error("Secure parsing failed:", error.message);
  // Return a generic error to the client
  throw new Error("Failed to process JSON input.");
}`}
                 </pre>
              </div>
            </li>
            <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Post-Parsing Validation (Schema Validation):</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">After successful parsing, is the structure, presence, and type of expected fields validated? Relying solely on the parser guarantees syntactical correctness, but not *semantic* correctness or expected data types. Use libraries like JSON Schema validators.</p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
                <h5 className="font-mono text-sm mb-2">Example (Conceptual - using a JSON Schema library):</h5>
                <pre className="text-xs">
                 {`// After parsing using JSON.parse or similar
const parsedData = JSON.parse(unsafeJsonString);

const userSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    username: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    isActive: { type: "boolean" }
  },
  required: ["id", "username", "email"],
  additionalProperties: false // Crucial: Disallow unexpected properties
};

import Ajv from 'ajv'; // Example library
const ajv = new Ajv();
const validate = ajv.compile(userSchema);

if (!validate(parsedData)) {
  console.warn("JSON Schema validation failed:", validate.errors);
  // Handle validation error - reject the data
  throw new Error("Invalid JSON structure or data types.");
}

// Only now is parsedData safe to use downstream
console.log("Validated user data:", parsedData);
`}
                </pre>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Pay special attention to <code>additionalProperties: false</code> in your schema to prevent unexpected fields from being introduced, mitigating some forms of confusion or subtle bypasses.
                </p>
              </div>
            </li>
            <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Post-Parsing Usage (Sanitization):</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">How is the parsed data used? If it&apos;s used in database queries, external commands, dynamic code, or displayed in UI, ensure proper context-aware sanitization or escaping is applied to prevent injection or XSS.</p>
            </li>
             <li>
              <span className="font-medium flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500 inline" /> <span>Prototype Pollution Checks (for JS/TS):</span></span>
              <p className="ml-7 mt-1 text-sm text-gray-600 dark:text-gray-400">If recursively merging or processing the parsed object, ensure keys like `__proto__`, `constructor`, and `prototype` are handled safely (e.g., ignored or explicitly disallowed).</p>
            </li>
          </ul>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Code className="w-6 h-6 text-primary" />
            <span>Reviewing the Parser Library Itself</span>
          </h2>
          <p>
            Reviewing the source code of a JSON parsing library is a task typically undertaken
            by security researchers or developers building low-level infrastructure. Key areas to
            scrutinize include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
             <li>
              <span className="font-medium">Parser State Management:</span> How does the parser handle state (current position, current token)? Are state transitions strictly controlled?
            </li>
            <li>
              <span className="font-medium">Character Handling:</span> How does it handle Unicode, escaped characters (`\uXXXX`), and invalid character sequences? Are there potential vulnerabilities related to character decoding or interpretation?
            </li>
            <li>
              <span className="font-medium">Number Parsing:</span> How are numbers parsed? Are there limits on size or precision that could lead to overflow or rounding errors if not handled carefully?
            </li>
            <li>
              <span className="font-medium">String Parsing:</span> How are string boundaries and escapes handled? Is there a risk of buffer overflows or incorrect length calculations?
            </li>
             <li>
              <span className="font-medium">Recursion/Stack Usage:</span> For recursive descent parsers, is recursion depth limited to prevent stack overflows?
            </li>
            <li>
              <span className="font-medium">Memory Allocation:</span> How does the parser allocate memory for strings, arrays, and objects? Are there checks to prevent excessive allocation based on input size?
            </li>
             <li>
              <span className="font-medium">Input Consumption:</span> Does the parser strictly consume only the expected characters for each token and structure? Leaving unexpected data might indicate a flaw.
            </li>
             <li>
              <span className="font-medium">Dependency Review:</span> What external dependencies does the parser library have? Are they secure and up-to-date?
            </li>
          </ul>
          <p className="mt-4">
            For most application developers, relying on widely used and trusted standard libraries is the most pragmatic
            and secure approach, rather than attempting to build or deeply audit a custom parser.
          </p>
        </section>


        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Server className="w-6 h-6 text-primary" />
            <span>Server-Side Parsing Considerations (Next.js Backend)</span>
          </h2>
           <p>
            When parsing JSON in a Next.js backend (like API routes or server components processing request bodies),
            the core principles apply. However, the execution environment offers certain advantages and requires
            specific attention:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <span className="font-medium">Resource Limits:</span> While Node.js has default limits (e.g., stack size), explicitly configuring parser limits is still crucial to protect your server process from crashing due to malicious input.
            </li>
            <li>
              <span className="font-medium">Error Logging:</span> Detailed error messages from parsing can be safely logged server-side for debugging and monitoring without exposing them to the client.
            </li>
             <li>
              <span className="font-medium">Input Size Limits:</span> Web frameworks often have built-in limits on request body size. Ensure these are configured appropriately to prevent large file uploads or massive JSON documents from overwhelming your server before parsing even begins.
            </li>
             <li>
              <span className="font-medium">`JSON.parse` Safety:</span> In Node.js, `JSON.parse` is implemented securely in native code and does not use `eval`. It's generally safe from code injection, but is susceptible to DoS via nesting depth or large inputs if not managed.
            </li>
             <li>
              <span className="font-medium">Post-Parsing Logic:</span> Since backend code often interacts with databases, file systems, or other services, the risk of using parsed data in injections (SQL, OS command) or file path manipulation is higher. Rigorous post-parsing validation and sanitization are paramount.
            </li>
          </ul>
           <p className="mt-4">
             For Next.js API routes, the framework often handles basic JSON body parsing for you. You must still implement post-parsing validation, resource limits if the default aren&apos;t sufficient, and secure error handling.
           </p>
           <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
              <h5 className="font-mono text-sm mb-2">Example (Conceptual - Next.js API Route):</h5>
              <pre className="text-xs">
               {`// pages/api/process-json.ts
import type { NextApiRequest, NextApiResponse } from 'next';
// Assume you have a schema validation library and schema defined

type Data = {
  message: string;
};

// Example schema (using a conceptual validation function)
const isValidUserData = (data: any): boolean => {
  // Implement robust schema validation here
  // Check types, required fields, maximum string lengths, etc.
  // Ensure no unexpected properties like __proto__ are present if applicable
  if (typeof data !== 'object' || data === null) return false;
  if (typeof data.id !== 'number' || typeof data.username !== 'string') return false;
  // Add more checks...
  return true;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }

  // Next.js often parses JSON body automatically if Content-Type is application/json
  const unsafeParsedData = req.body;

  // IMPORTANT: Add resource limits check if body-parser defaults are not enough
  // E.g., check parsed object depth or size before validation
  if (checkDepth(unsafeParsedData) > 20) { // Conceptual depth check
     console.warn("Received overly deep JSON structure");
     return res.status(400).json({ message: "Invalid input structure (too deep)" });
  }


  if (!isValidUserData(unsafeParsedData)) {
    console.warn("Received invalid JSON data structure/types:", unsafeParsedData);
    return res.status(400).json({ message: "Invalid input format or data" });
  }

  // Data is now considered validated and safe for processing downstream
  try {
    // Use safeParsedData for database operations, etc.
    // Ensure any database queries or external commands use parameterized inputs
    // and proper escaping for string values.
    console.log("Processing validated data:", unsafeParsedData);
    res.status(200).json({ message: "Data processed successfully" });

  } catch (error) {
    console.error("Server error processing data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Conceptual depth checker (recursive)
function checkDepth(obj: any, depth = 0): number {
    if (depth > 100) throw new Error("Max depth exceeded during check"); // Safety break
    if (obj === null || typeof obj !== 'object') return depth;

    let maxDepth = depth;
    if (Array.isArray(obj)) {
        for (const item of obj) {
            maxDepth = Math.max(maxDepth, checkDepth(item, depth + 1));
        }
    } else {
        for (const key in obj) {
            // Potentially add prototype check here if necessary
            if (key === '__proto__') continue;
            maxDepth = Math.max(maxDepth, checkDepth(obj[key], depth + 1));
        }
    }
    return maxDepth;
}
`}
              </pre>
           </div>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-primary" />
            <span>Conclusion: A Multi-Layered Approach</span>
          </h2>
          <p>
            Secure JSON parsing is not just about the parsing function itself; it requires a multi-layered approach:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Choose <span className="font-medium">trusted, well-maintained libraries</span>.</li>
            <li>Implement <span className="font-medium">robust error handling</span> without leaking sensitive information.</li>
            <li>Enforce <span className="font-medium">resource limits</span> (size, depth, number of elements) to prevent DoS.</li>
            <li>Perform <span className="font-medium">strict post-parsing validation</span> using schemas to ensure expected structure, types, and absence of unexpected fields.</li>
            <li>Apply <span className="font-medium">context-aware sanitization/escaping</span> when using the parsed data in other parts of the application (database, OS commands, UI).</li>
            <li>Conduct <span className="font-medium">regular code reviews</span> focusing on these points.</li>
          </ul>
          <p className="mt-4">
            By integrating these steps into your development and review process, you can significantly reduce the risk associated with handling untrusted JSON input.
          </p>
        </section>
      </div>
    </>
  );
}