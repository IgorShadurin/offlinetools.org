import type { Metadata } from "next";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Feedback Mechanisms in JSON Validation | Offline Tools",
  description: "Learn how to provide effective visual feedback to users when validating JSON data.",
};

export default function JsonVisualFeedbackArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Visual Feedback Mechanisms in JSON Validation</h1>

      <div className="space-y-6">
        <p>
          When building applications that involve users interacting with JSON data – whether they are editing a
          configuration file, providing API request bodies, or defining complex data structures – validation is crucial.
          However, merely telling a user that their JSON is &quot;invalid&quot; is often insufficient. Effective user
          interfaces provide clear, immediate, and actionable visual feedback to help users understand *what* is wrong
          and *where* the problem is. This article explores various visual feedback mechanisms for JSON validation.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why is Visual Feedback Important?</h2>
        <p>
          Imagine a user pastes a large JSON string into a text area and clicks &quot;Validate&quot;. If the application
          simply displays &quot;Invalid JSON&quot;, the user is left guessing.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <AlertCircle className="inline-block w-5 h-5 mr-1 text-yellow-500" />
            <strong>Reduces Frustration:</strong> Ambiguous error messages are frustrating. Clear feedback pinpoints
            issues, saving users time and effort.
          </li>
          <li>
            <CheckCircle className="inline-block w-5 h-5 mr-1 text-green-500" />
            <strong>Improves User Experience:</strong> A helpful interface guides the user towards a correct input.
          </li>
          <li>
            <Info className="inline-block w-5 h-5 mr-1 text-blue-500" />
            <strong>Increases Efficiency:</strong> Users can quickly identify and fix errors without external tools.
          </li>
          <li>
            <XCircle className="inline-block w-5 h-5 mr-1 text-red-500" />
            <strong>Prevents Errors:</strong> In real-time validation scenarios, feedback can prevent invalid data from
            even being submitted.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Common Visual Feedback Techniques</h2>
        <p>Several methods can be used to provide feedback, often in combination.</p>

        <h3 className="text-xl font-semibold mt-6">1. Inline Error Messages</h3>
        <p>
          Placing validation error messages directly next to the problematic part of the input is highly effective. In a
          JSON editor or text area, this often involves:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Highlighting the specific line or character range where the error occurs.</li>
          <li>Displaying a short, descriptive error message right below or next to the highlighted section.</li>
        </ul>
        <p>
          <strong>Example Scenario: Missing Comma</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">JSON Input:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "Alice",
  "age": 30
  "city": "London"
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Visual Feedback:</h4>
          <div className="border border-red-400 p-3 rounded bg-red-50 dark:bg-red-950 dark:border-red-700">
            <p className="text-red-700 dark:text-red-300 font-mono">
              <span className="font-bold">Line 3, Column 3:</span>{" "}
              <XCircle className="inline-block w-4 h-4 mr-1 text-red-500 dark:text-red-300" /> Expected comma (,) or
              closing brace (&#x7d;) but found string literal.
            </p>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">
              The line containing <code>&quot;age&quot;: 30</code> would be highlighted.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Error Summaries</h3>
        <p>
          For inputs with many errors, providing a summary at the top or bottom of the validation area can be helpful.
          Each item in the summary should ideally link or scroll to the corresponding location in the JSON input.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A list of all errors found.</li>
          <li>Each list item includes the line/column number and the error message.</li>
          <li>
            Clicking an item navigates the user to the error location. (Note: Navigation is interactive, but the list
            display itself is a visual feedback mechanism).
          </li>
        </ul>
        <p>
          <strong>Example Scenario: Multiple Errors</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">JSON Input:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "items": [
    { "id": 1, "name": "A" }
    { "id": 2, "name": "B" }
    { "id": 3 "name": "C" }
  ],
  "count": "three"
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Visual Feedback (Summary):</h4>
          <div className="border border-red-400 p-3 rounded bg-red-50 dark:bg-red-950 dark:border-red-700">
            <p className="text-red-700 dark:text-red-300 font-bold mb-2">
              <AlertCircle className="inline-block w-5 h-5 mr-1 text-red-500 dark:text-red-300" /> Validation Errors
              Found:
            </p>
            <ul className="list-none p-0 space-y-1">
              <li className="text-red-700 dark:text-red-300 font-mono text-sm">
                <XCircle className="inline-block w-4 h-4 mr-1 text-red-500 dark:text-red-300" /> Line 4, Column 5:
                Expected comma (,) or closing bracket (]) but found opening brace (&#x7b;).
              </li>
              <li className="text-red-700 dark:text-red-300 font-mono text-sm">
                <XCircle className="inline-block w-4 h-4 mr-1 text-red-500 dark:text-red-300" /> Line 5, Column 11:
                Expected colon (:) after property name.
              </li>
              <li className="text-red-700 dark:text-red-300 font-mono text-sm">
                <XCircle className="inline-block w-4 h-4 mr-1 text-red-500 dark:text-red-300" /> Line 7, Column 11:
                Expected number but got string.
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Code Highlighting / Linting</h3>
        <p>
          Integrating a JSON linter that provides real-time syntax highlighting and error squiggles (like those found in
          code editors) offers continuous feedback as the user types.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Underlining or squiggling problematic code sections with red or yellow lines.</li>
          <li>
            Hovering over a squiggle reveals the error message (Interactive, but the squiggle itself is visual
            feedback).
          </li>
          <li>Syntax highlighting helps identify JSON structure (keys, values, types).</li>
        </ul>
        <p>
          <strong>Example Scenario: Real-time Feedback (Conceptual)</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Editor View:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 font-mono text-sm overflow-x-auto">
            {`{
  "user": {
    "id": 123,
    "isActive": true,
    "role" = "admin" // Invalid assignment
  }
}`}
          </pre>
        </div>
        <p>
          This technique is often implemented using code editor libraries (like CodeMirror or Monaco Editor) with JSON
          linting extensions.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Status Indicators</h3>
        <p>
          A simple icon or text label that indicates the overall validity status is a quick way to signal success or
          failure.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline-block w-5 h-5 mr-1 text-green-500" /> Valid
          </li>
          <li>
            <XCircle className="inline-block w-5 h-5 mr-1 text-red-500" /> Invalid
          </li>
        </ul>
        <p>This should ideally be combined with more detailed feedback mechanisms.</p>

        <h3 className="text-xl font-semibold mt-6">5. Schema Validation Feedback</h3>
        <p>
          If validating against a JSON schema, the feedback can be more specific than just syntax errors. It can
          indicate type mismatches, missing required properties, value constraints violations, etc.
        </p>
        <p>
          <strong>Example Scenario: Schema Violation</strong>
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Schema requires <code>&quot;age&quot;</code> to be a number.
          </h4>
          <h4 className="text-lg font-medium mb-2 mt-4">JSON Input:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "Bob",
  "age": "thirty"
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Visual Feedback:</h4>
          <div className="border border-red-400 p-3 rounded bg-red-50 dark:bg-red-950 dark:border-red-700">
            <p className="text-red-700 dark:text-red-300 font-mono">
              <span className="font-bold">Path &#x60;/age&#x60;:</span>{" "}
              <XCircle className="inline-block w-4 h-4 mr-1 text-red-500 dark:text-red-300" /> Value &quot;thirty&quot;
              is not of type number.
            </p>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">
              (This would also ideally highlight the line/value of &quot;age&quot;).
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Design Principles for Effective Feedback</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Clarity:</strong> Error messages should be easy to understand for the target audience (technical or
            non-technical). Avoid jargon where possible.
          </li>
          <li>
            <strong>Precision:</strong> Pinpoint the exact location of the error (line, column, path).
          </li>
          <li>
            <strong>Timeliness:</strong> Provide feedback as soon as possible, ideally in real-time as the user types or
            immediately after validation is triggered.
          </li>
          <li>
            <strong>Visibility:</strong> Make errors visually distinct (e.g., using red color, icons, highlighting).
          </li>
          <li>
            <strong>Actionability:</strong> The feedback should guide the user on how to fix the error. &quot;Expected
            comma&quot; is better than &quot;Syntax Error&quot;.
          </li>
          <li>
            <strong>Consistency:</strong> Use consistent visual cues for similar types of errors.
          </li>
          <li>
            <strong>Accessibility:</strong> Ensure feedback is accessible (e.g., sufficient color contrast, keyboard
            navigation for error summaries).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conceptual Code Structure (Static View)</h2>
        <p>
          While a full implementation requires client-side JavaScript (which is outside the scope of this static page
          component), the basic structure of how validation and feedback might be handled conceptually involves:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Conceptual Validation Logic:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Conceptual structure - actual implementation is client-side

interface ValidationError {
  message: string;
  line?: number;
  column?: number;
  path?: string; // For schema validation
  // Potentially include severity (error, warning, info)
};

// Function that takes JSON string and returns errors
function validateJson(jsonString: string, schema?: any): ValidationError[] {
  const errors: ValidationError[] = [];

  try {
    // 1. Basic Syntax Validation (using try/catch parse)
    JSON.parse(jsonString);
  } catch (e: any) {
    // Parse error occurred
    const errorMessage = e.message || "Invalid JSON syntax";
    // Attempt to extract line/column if available in error message
    const match = errorMessage.match(/at position (\\d+)/); // Example regex, varies by parser
    let position = match ? parseInt(match[1], 10) : undefined;
    let line, column;
    if (position !== undefined) {
       // Calculate line/column from position (requires mapping)
       // This is complex without a proper parser context
    }

    errors.push({
      message: errorMessage,
      line: line, // Could be undefined
      column: column, // Could be undefined
    });
    // Stop further validation if syntax is fundamentally broken
    return errors;
  }

  // 2. Schema Validation (if schema is provided)
  if (schema) {
    // Use a JSON schema validator library (e.g., Ajv - requires client-side)
    // const ajv = new Ajv();
    // const validate = ajv.compile(schema);
    // const isValid = validate(JSON.parse(jsonString)); // JSON.parse successful above

    // if (!isValid && validate.errors) {
    //   validate.errors.forEach(err => {
    //     errors.push({
    //       message: err.message || "Schema validation error",
    //       path: err.instancePath, // JSON Pointer path to error
    //       // Line/column mapping from path is also complex
    //     });
    //   });
    // }
  }

  return errors; // Return list of errors (can be empty)
}`}
          </pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            The code above is a simplified, conceptual outline. Extracting line/column numbers from a generic{" "}
            <code>JSON.parse</code> error message can be tricky. More robust solutions often involve using a custom
            parser or a library that provides detailed error location info, and mapping JSON Schema error paths back to
            code editor positions requires additional logic.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Providing clear and actionable visual feedback is paramount for a good user experience when dealing with JSON
          validation. By employing techniques like inline error messages, error summaries, and real-time highlighting,
          developers can transform a potentially frustrating task into a much more manageable one. Combining these
          methods, along with adherence to good design principles, ensures users can efficiently identify and correct
          issues in their JSON data.
        </p>
      </div>
    </>
  );
}
