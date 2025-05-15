import type { Metadata } from "next";
import {
  Info,
  AlertCircle,
  MessageSquareText,
  CheckCircle,
  XCircle,
  FlaskConical,
  Waypoints,
  GitFork, // Representing branching logic/paths
  Code, // Representing schema/code
  TextSearch, // Representing finding issues
  HelpCircle, // Representing helpfulness
  Layers // Representing structure/nesting
} from "lucide-react";

export const metadata: Metadata = {
  title: "Designing Effective Error Messages for JSON Validation | Your Site Name",
  description: "Learn how to design clear, helpful, and user-friendly error messages for JSON data validation.",
};

export default function EffectiveJsonErrorMessagesArticle() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Designing Effective Error Messages for JSON Validation
        </h1>

        <div className="prose lg:prose-xl mx-auto">
          <p className="leading-relaxed mb-6">
            JSON validation is a fundamental step in many applications, ensuring that incoming data conforms to an expected structure and format. While validation itself is crucial, what happens when validation fails? The quality of the error messages provided can significantly impact the developer or user experience, speeding up debugging or causing frustration. This article explores principles and practices for designing effective error messages for JSON validation failures.
          </p>

          <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
            <Info className="w-8 h-8 mr-3 text-blue-500" /> Why Effective Error Messages Matter
          </h2>

          <p className="leading-relaxed mb-4">
            Poor error messages are vague, uninformative, and can send developers on wild goose chases. Consider these common pitfalls:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>"Invalid JSON"</strong>: While technically true, this doesn&apos;t tell you *where* the JSON is invalid or *why*. Is it a syntax error or a schema violation?</li>
            <li><strong>"Validation failed"</strong>: Equally unhelpful. Which rule failed? On what data?</li>
            <li><strong>Technical jargon</strong>: Messages filled with internal error codes, stack traces, or overly technical schema details without context.</li>
          </ul>

          <p className="leading-relaxed mb-6">
            Effective error messages, on the other hand:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><span className="font-semibold">Pinpoint the issue</span>: Clearly indicate *where* the error occurred in the JSON structure.</li>
            <li><span className="font-semibold">Explain the cause</span>: Describe *why* the data is invalid according to the rules.</li>
            <li><span className="font-semibold">Suggest a fix</span>: Ideally, guide the user or developer on how to correct the problem.</li>
            <li><span className="font-semibold">Are consistently formatted</span>: Easy to parse and understand, whether by a human or potentially an automated tool.</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
            <FlaskConical className="w-8 h-8 mr-3 text-orange-500" /> Principles of Good Error Messages
          </h2>

          <p className="leading-relaxed mb-4">
            Let&apos;s distill the qualities of effective error messages into key principles:
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
             Clear and Concise
          </h3>
          <p className="leading-relaxed mb-4">
            Avoid ambiguity and unnecessary words. Get straight to the point. The message should be easy to read and understand quickly.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
            <Waypoints className="w-7 h-7 mr-3 text-purple-500" /> Specific and Contextual
          </h3>
          <p className="leading-relaxed mb-4">
            Tell the user exactly what the problem is and where it occurred. Providing the path to the problematic data point is crucial in nested JSON. Mentioning the expected format or type is also highly beneficial.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
             Helpful and Actionable
          </h3>
          <p className="leading-relaxed mb-4">
            Merely stating the error isn&apos;t enough. Explain *what* was expected and *why* the provided data didn&apos;t meet that expectation. Suggest concrete steps to resolve the issue.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
             Polite and Non-Technical (when appropriate)
          </h3>
          <p className="leading-relaxed mb-4">
            Consider the audience. If the error message is for an end-user, avoid internal schema details. If it&apos;s for a developer, technical details like schema paths or constraint names might be useful, but should still be explained clearly. The tone should be helpful, not accusatory.
          </p>

          <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
            <MessageSquareText className="w-8 h-8 mr-3 text-green-500" /> Structuring JSON Validation Errors
          </h2>

          <p className="leading-relaxed mb-4">
            A single JSON validation failure can result in multiple distinct errors (e.g., a missing required field and a field with the wrong data type). It&apos;s often best to return a list of errors rather than stopping at the first one. Each error object in the list should contain key pieces of information.
          </p>

          <h3 className="text-2xl font-semibold mt-6 mb-3 flex items-center">
            <Layers className="w-7 h-7 mr-3 text-teal-500" /> Essential Information in Each Error
          </h3>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Path (<GitFork className="inline w-5 h-5 mb-1" />)</strong>: The JSON path to the element causing the error (e.g., <code>/user/address/zipCode</code>, <code>/items/1/quantity</code>). This is perhaps the most critical piece of information for nested structures.</li>
            <li><strong>Error Type/Code (<AlertCircle className="inline w-5 h-5 mb-1" />)</strong>: A machine-readable code or a short string indicating the type of validation failure (e.g., <code>required</code>, <code>type</code>, <code>pattern</code>, <code>minimum</code>, <code>maximum</code>, <code>enum</code>).</li>
            <li><strong>Message (<MessageSquareText className="inline w-5 h-5 mb-1" />)</strong>: A human-readable description of the error, following the principles above.</li>
            <li><strong>Schema/Constraint (<Code className="inline w-5 h-5 mb-1" />)</strong> (Optional but helpful for developers): Details about the specific schema rule or constraint that was violated (e.g., the expected data type, the minimum value, the regex pattern).</li>
            <li><strong>Provided Value (<TextSearch className="inline w-5 h-5 mb-1" />)</strong> (Optional): The actual value found at the error path. This can help the user see exactly what was wrong. Be mindful of returning sensitive data.</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
            <FlaskConical className="w-8 h-8 mr-3 text-orange-500" /> Bad vs. Good Examples
          </h2>

          <h3 className="text-2xl font-semibold mt-6 mb-3">
            Scenario: Validating a user object
          </h3>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-semibold mb-2">Expected Schema (Conceptual):</p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mb-4">
              <pre>
                {`{
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "age": { "type": "integer", "minimum": 0 },
    "email": { "type": "string", "format": "email" },
    "isActive": { "type": "boolean" },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zipCode": { "type": "string", "pattern": "^[0-9]{5}$" }
      },
      "required": ["street", "city", "zipCode"]
    },
    "roles": {
      "type": "array",
      "items": { "type": "string", "enum": ["admin", "editor", "viewer"] }
    }
  },
  "required": ["name", "age", "address"]
}`}
              </pre>
            </div>

            <p className="font-semibold mb-2">Invalid Input JSON:</p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`{
  "age": -5,
  "email": "invalid-email",
  "isActive": "true",
  "address": {
    "street": "Main St",
    "city": "Anytown"
    // zipCode is missing
  },
  "roles": ["admin", "super_user"]
}`}
              </pre>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            <XCircle className="inline w-6 h-6 mr-2 text-red-500" /> Bad Error Messages
          </h3>

          <div className="bg-red-100 p-4 rounded-lg dark:bg-red-900 dark:text-red-100 my-4">
            <p><code>&#x7b; "error": "Validation failed" &#x7d;</code></p>
            <p><code>&#x7b; "message": "Input does not match schema." &#x7d;</code></p>
            <p><code>&#x7b; "errors": [&#x7b; "code": "SCHEMA_VIOLATION", "details": "multiple failures" &#x7d;] &#x7d;</code></p>
            <p><code>Error: Invalid age. Error: Address incomplete. Error: Roles incorrect.</code> (Concatenated, no context)</p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            <CheckCircle className="inline w-6 h-6 mr-2 text-green-500" /> Good Error Messages
          </h3>

          <div className="bg-green-100 p-4 rounded-lg dark:bg-green-900 dark:text-green-100 my-4">
            <p className="font-semibold">Example 1 (List of specific errors):</p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 dark:text-white overflow-x-auto mb-4">
              <pre>
                {`{
  "errors": [
    {
      "path": "/name",
      "type": "required",
      "message": "Field 'name' is required."
    },
    {
      "path": "/age",
      "type": "minimum",
      "message": "Field 'age' must be greater than or equal to 0, but received -5.",
      "value": -5,
      "constraint": { "minimum": 0 }
    },
    {
      "path": "/email",
      "type": "format",
      "message": "Field 'email' must be a valid email address, but received 'invalid-email'.",
      "value": "invalid-email",
      "constraint": { "format": "email" }
    },
    {
      "path": "/isActive",
      "type": "type",
      "message": "Field 'isActive' must be a boolean (true or false), but received a string.",
      "value": "true",
      "constraint": { "type": "boolean" }
    },
    {
      "path": "/address/zipCode",
      "type": "required",
      "message": "Field 'zipCode' is required within the address object."
    },
    {
      "path": "/roles/1",
      "type": "enum",
      "message": "Value 'super_user' at path '/roles/1' is not allowed. Expected one of: 'admin', 'editor', 'viewer'.",
      "value": "super_user",
      "constraint": { "enum": ["admin", "editor", "viewer"] }
    }
  ]
}`}
              </pre>
            </div>

             <p className="font-semibold">Example 2 (Simplified human-readable list):</p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 dark:text-white overflow-x-auto">
              <pre>
                {`{
  "message": "JSON validation failed. Please correct the following issues:",
  "details": [
    "Field 'name' is required.",
    "Field 'age' must be 0 or greater. Received -5.",
    "Field 'email' must be a valid email address. Received 'invalid-email'.",
    "Field 'isActive' must be true or false. Received a string.",
    "Field 'zipCode' is required within the address.",
    "Value 'super_user' in 'roles' is not allowed. Valid options are: 'admin', 'editor', 'viewer'."
  ]
}`}
              </pre>
            </div>
          </div>

          <p className="leading-relaxed mt-6 mb-6">
            The "Good" examples clearly state *what* the error is, *where* it is located (using paths), and often *why* it failed (expected type, value range, required field, allowed values). The first good example provides more technical detail (error type, constraint, provided value) which is excellent for APIs consumed by other developers. The second good example is simpler and might be better for a direct user interface or logs where less parsing is needed.
          </p>

           <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
            <HelpCircle className="w-8 h-8 mr-3 text-blue-500" /> Tips for Implementation
          </h2>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Use a Robust Library:</strong> Leverage existing, well-tested JSON validation libraries (like Zod, Yup, Joi, Ajv) rather than writing validation from scratch. These libraries often provide mechanisms for customizing error messages and extracting detailed error information.</li>
            <li><strong>Define Clear Error Codes:</strong> Use consistent error codes (e.g., <code>VALIDATION_REQUIRED</code>, <code>VALIDATION_TYPE_MISMATCH</code>, <code>VALIDATION_MIN_LENGTH</code>) that are stable and documented.</li>
            <li><strong>Parameterize Messages:</strong> Design message templates that can be populated with specific values (path, value, constraint) at runtime. This avoids hardcoding messages and allows for easier updates and localization.</li>
            <li><strong>Localize Errors:</strong> If your application serves a global audience, ensure error messages can be translated into different languages. Returning error codes and parameters facilitates this.</li>
            <li><strong>Provide Documentation:</strong> Document your API&apos;s validation error response structure and error codes so consumers know how to interpret them.</li>
             <li><strong>Consider Nested Errors:</strong> Pay special attention to errors within arrays and nested objects. The path is critical here (e.g., <code>/items/2/price</code> indicates an error on the <code>price</code> field of the third item in the <code>items</code> array).</li>
          </ul>

           <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
            <Code className="w-8 h-8 mr-3 text-gray-600 dark:text-gray-300" /> Conceptual Code Snippet for Error Formatting
          </h2>

           <p className="leading-relaxed mb-4">
             Validation libraries typically provide a list of raw error objects. You&apos;ll need code to transform these into your desired final format.
           </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Example: Processing Validation Errors (Conceptual TypeScript):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`interface RawValidationError {
  path: string; // e.g., "/user/age", "/items/0/name"
  type: string; // e.g., "required", "type", "minimum", "pattern"
  message: string; // Default message from library
  value?: any; // The actual value
  constraint?: any; // The schema constraint details
}

interface FormattedErrorMessage {
  path: string;
  type: string;
  message: string; // Custom, user-friendly message
  // Optionally include value, constraint depending on audience
}

function formatValidationErrors(
  rawErrors: RawValidationError[]
): FormattedErrorMessage[] {
  return rawErrors.map(error => {
    let userMessage = \`Validation failed for field '\${error.path}'\`;

    switch (error.type) {
      case "required":
        userMessage = \`Field '\${error.path}' is required.\`;
        break;
      case "type":
        const expectedType = error.constraint?.type || "the correct type";
        userMessage = \`Field '\${error.path}' must be of type \${expectedType}. Received \${typeof error.value}.\`;
        if (error.value !== undefined) userMessage += \` Value: \${JSON.stringify(error.value)}.\`;
        break;
      case "minimum":
        const minValue = error.constraint?.minimum;
         userMessage = \`Field '\${error.path}' must be greater than or equal to \${minValue}. Received \${error.value}.\`;
         break;
      case "pattern":
         const pattern = error.constraint?.pattern;
         userMessage = \`Field '\${error.path}' value "\${error.value}" does not match the required pattern \${pattern}.\`;
         break;
      case "enum":
         const allowedValues = error.constraint?.enum?.map((v: any) => \`"\${v}"\`).join(", ");
         userMessage = \`Field '\${error.path}' value "\${error.value}" is not allowed. Allowed values are: \${allowedValues}.\`;
         break;
      // Add cases for other error types you handle
      default:
        // Fallback for unhandled types or generic errors
        userMessage = \`Field '\${error.path}': \${error.message}\`;
    }

    // Clean up path string (remove leading slash, format array indices)
    const cleanedPath = error.path
      .replace(/^\//, "") // Remove leading slash
      .replace(/\\//g, ".") // Replace slashes with dots
      .replace(/\\.([0-9]+)/g, "[$1]"); // Format array indices like .0 to [0]

    // Refine message using cleaned path
    userMessage = userMessage.replace(
      \`'\${error.path}'\`,
      cleanedPath ? \`'\${cleanedPath}'\` : "root"
    );
     userMessage = userMessage.replace(
      \`/\${error.path}'\`,
      cleanedPath ? \`'\${cleanedPath}'\` : "root"
    );


    return {
      path: cleanedPath,
      type: error.type,
      message: userMessage,
    };
  });
}

// Example Usage (assuming you have a 'rawErrors' array from a library):
// const rawErrors: RawValidationError[] = [ ... ]; // Populate from validation library result
// const formattedErrors = formatValidationErrors(rawErrors);
// console.log(formattedErrors);
`}
              </pre>
            </div>
          </div>


          <h2 className="text-3xl font-semibold mt-10 mb-4 flex items-center">
             Conclusion
          </h2>

          <p className="leading-relaxed mb-6">
            Designing effective error messages for JSON validation is an investment in the usability of your application or API. By following principles of clarity, specificity, and helpfulness, and by providing sufficient context like the data path and error type, you empower users and developers to quickly understand and resolve issues. This leads to a smoother experience, faster debugging cycles, and ultimately, more robust systems.
          </p>

          <p className="leading-relaxed text-sm italic text-center mt-8">
            <TextSearch className="inline w-4 h-4 mb-1 mr-1" /> Ensure your validation library allows access to the necessary details (path, type, value, constraint) to build these detailed messages.
          </p>

        </div>
      </div>
    </>
  );
}
