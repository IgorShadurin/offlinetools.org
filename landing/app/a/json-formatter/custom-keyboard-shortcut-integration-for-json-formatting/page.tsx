import type { Metadata } from "next";
import { Keyboard, Code, FileJson2, Zap, Info, AlertTriangle, Settings } from "lucide-react"; // Only use icons from the allowed list

export const metadata: Metadata = {
  title: "Custom Keyboard Shortcuts for JSON Formatting | Development Guide",
  description:
    "Learn how to integrate custom keyboard shortcuts into your web application to provide a seamless JSON formatting experience for users.",
};

export default function JsonFormattingShortcutArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Keyboard className="size-8" />
        Custom Keyboard Shortcut Integration for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          Improving developer workflows often involves streamlining repetitive tasks. One common task when working with
          APIs or configuration files is formatting raw, unformatted JSON data. While dedicated formatting buttons are
          helpful, offering a custom keyboard shortcut provides a faster, more fluid experience for users who prefer
          keeping their hands on the keyboard. This article explores how to implement such functionality in a web
          application context.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6" />
          The Goal: Format JSON with a Keystroke
        </h2>
        <p>
          Imagine a `textarea` or a code editor component in your application where users paste JSON. Instead of
          clicking a "Format" button, they could simply press a key combination like <code>Ctrl + Shift + F</code> (or{" "}
          <code>Cmd + Shift + F</code> on macOS) to instantly beautify the JSON string. This requires:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Listening for keyboard events.</li>
          <li>Detecting the specific key combination pressed.</li>
          <li>Accessing the text content that needs formatting.</li>
          <li>Applying JSON formatting.</li>
          <li>Updating the text content with the formatted result.</li>
          <li>Preventing default browser actions if necessary.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="size-6" />
          Core Implementation Strategy: Event Listeners
        </h2>
        <p>
          The standard way to detect keyboard input in the browser is by using event listeners, specifically the
          `keydown` or `keyup` events. You can attach these listeners to specific elements (like the `textarea` itself)
          or to the entire document.
        </p>

        <h3 className="text-xl font-semibold mt-6">Attaching to the Document</h3>
        <p>
          Listening on the `document` is common if you want the shortcut to work regardless of which specific element is
          focused, as long as the application is active. However, this requires careful handling to ensure the shortcut
          only fires when appropriate (e.g., when the user is focused on the JSON input area, not when typing in a
          search box).
        </p>
        <p>The event listener would look something like this (conceptually, as this is server-rendered code):</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Conceptual Client-Side Code Structure
document.addEventListener('keydown', (event) => {
  // Check for key combination here
  // Example: Ctrl + Shift + F
  const isCtrl = event.ctrlKey || event.metaKey; // Handle Cmd key on Mac
  const isShift = event.shiftKey;
  const isFKey = event.key === 'F' || event.key === 'f'; // Case-insensitive check

  if (isCtrl && isShift && isFKey) {
    event.preventDefault(); // Prevent default browser action (e.g., find)

    // Call your formatting function here
    // formatMyJsonInput();
    console.log("Attempting to format JSON..."); // Placeholder
  }
});`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Attaching to the Input Element</h3>
        <p>
          Alternatively, you can attach the listener directly to the `textarea` or input field where the JSON is typed
          or pasted. This is often safer as the shortcut is only active when that specific element is focused.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Conceptual Client-Side Code Structure
// Assuming 'jsonInputArea' is a reference to your textarea element
const jsonInputArea = document.getElementById('json-input'); // Example

jsonInputArea.addEventListener('keydown', (event) => {
  const isCtrl = event.ctrlKey || event.metaKey;
  const isShift = event.shiftKey;
  const isFKey = event.key === 'F' || event.key === 'f';

  if (isCtrl && isShift && isFKey) {
    event.preventDefault();

    // Get the current value from the textarea
    const currentJsonText = jsonInputArea.value;

    // Format the text (call your formatting logic)
    const formattedText = formatJson(currentJsonText); // Replace with your actual formatting logic

    // Update the textarea value
    jsonInputArea.value = formattedText;

    console.log("JSON formatted."); // Placeholder
  }
});`}
            </pre>
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Info className="size-4" /> Note: In a React or similar framework context running on the client, you would
          typically manage the input value using state and attach the listener using hooks like `useEffect` or directly
          via JSX props (`onKeyDown`), ensuring proper cleanup. This server-rendered page shows the core JavaScript
          event handling principle.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="size-6" />
          The JSON Formatting Logic
        </h2>
        <p>
          The actual formatting of the JSON string can be done using built-in browser capabilities (`JSON.parse` and
          `JSON.stringify`) or a dedicated library for more advanced or robust formatting options.
        </p>
        <p>
          The simplest approach uses `JSON.parse` to validate the JSON and convert it to a JavaScript object/array, and
          then `JSON.stringify` with the third argument (space) to produce a human-readable string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic `formatJson` Function:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function formatJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    // Use 2 spaces for indentation, or 4, or "\\t" for tabs
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    // Optionally, show an error message to the user
    return "Invalid JSON: " + error.message; // Indicate error but don't lose input
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          This function should be called when the shortcut is detected. The result should then replace the content of
          the input field.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap className="size-6" />
          Handling Modifier Keys
        </h2>
        <p>Keyboard events provide properties to check for modifier keys:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>`event.ctrlKey`: `true` if Ctrl is pressed.</li>
          <li>`event.shiftKey`: `true` if Shift is pressed.</li>
          <li>`event.altKey`: `true` if Alt (Option on Mac) is pressed.</li>
          <li>`event.metaKey`: `true` if Meta (Cmd on Mac, Windows key on Windows) is pressed.</li>
        </ul>
        <p>
          It's important to use `event.metaKey` along with `event.ctrlKey` when checking for common cross-platform
          shortcuts like "Ctrl/Cmd + S" or "Ctrl/Cmd + F". A common pattern is `const isCtrlOrCmd = event.ctrlKey ||
          event.metaKey;`.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="size-6" />
          Important Considerations
        </h2>

        <h3 className="text-xl font-semibold mt-6">Preventing Default Browser Actions</h3>
        <p>
          Many key combinations (like `Ctrl+S` for save, `Ctrl+F` for find, `Ctrl+P` for print) have default browser
          behaviors. If your custom shortcut conflicts with one, you must call `event.preventDefault()` inside your
          listener to stop the browser from performing its default action. Be mindful of overriding widely expected
          shortcuts, as it can frustrate users.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlertTriangle className="size-6" />
          Accessibility and User Experience
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Discoverability:</strong> Keyboard shortcuts are great for power users, but not everyone knows them.
            Always provide a visible button or menu option to perform the same action.
          </li>
          <li>
            <strong>Consistency:</strong> Use standard key combinations where possible (e.g., `Ctrl/Cmd + S` for save,
            `Ctrl/Cmd + F` for format is a common pattern in many IDEs).
          </li>
          <li>
            <strong>Documentation:</strong> Clearly document the available keyboard shortcuts in your application's help
            section or UI.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cleanup</h3>
        <p>
          If you attach event listeners (especially to the `document`) in a component, ensure you remove them when the
          component is unmounted to prevent memory leaks and unexpected behavior. In a client-side React component, this
          is typically done in the cleanup function of a `useEffect` hook. Since this page is server-rendered and
          static, the examples don't show state or effects, but cleanup is critical in real client-side applications.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Cleanup:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Conceptual Client-Side Code Structure (e.g., inside a React useEffect cleanup)
const handleKeyDown = (event) => {
  // ... your shortcut logic ...
  const isCtrlOrCmd = event.ctrlKey || event.metaKey;
  const isShift = event.shiftKey;
  const isFKey = event.key === 'F' || event.key === 'f';

  if (isCtrlOrCmd && isShift && isFKey) {
    event.preventDefault();
    // formatMyJsonInput();
    console.log("Formatted via shortcut.");
  }
};

// To add (e.g., on mount):
document.addEventListener('keydown', handleKeyDown);

// To remove (e.g., on unmount):
// return () => {
//   document.removeEventListener('keydown', handleKeyDown);
// };
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="size-6" />
          Handling Input Focus
        </h2>
        <p>
          If you attach the listener to the `document`, consider adding checks to ensure the shortcut only triggers when
          the user is likely working with the JSON input. You could check `document.activeElement` to see if the focused
          element is your JSON `textarea` or within your custom editor component.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Checking Active Element:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Conceptual Client-Side Code Structure
document.addEventListener('keydown', (event) => {
  const isCtrlOrCmd = event.ctrlKey || event.metaKey;
  const isShift = event.shiftKey;
  const isFKey = event.key === 'F' || event.key === 'f';

  // Assuming 'jsonInputArea' is the specific element for JSON
  const jsonInputArea = document.getElementById('json-input'); // Example

  if (isCtrlOrCmd && isShift && isFKey) {
    // Check if the currently focused element is the jsonInputArea
    if (document.activeElement === jsonInputArea) {
      event.preventDefault();
      // formatMyJsonInput(); // Or directly format jsonInputArea.value
      console.log("Formatted JSON because input was focused.");
    }
    // If not focused on the specific input, do nothing or allow default
  }
});
`}
            </pre>
          </div>
        </div>
        <p>This makes the global listener more context-aware.</p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Integrating custom keyboard shortcuts for actions like JSON formatting significantly enhances the user
          experience for developers and power users. By leveraging browser event listeners on `keydown` or `keyup`,
          checking for specific key combinations including modifier keys, and implementing robust JSON parsing and
          stringifying logic, you can add this powerful feature to your web application. Remember to consider
          accessibility, potential shortcut conflicts, and always provide alternative ways to perform the action. While
          this page describes the concepts and basic JavaScript implementation structure suitable for client-side
          execution, integrating this into frameworks like React or Vue requires using their respective lifecycle
          methods or hooks for proper event management and cleanup.
        </p>
      </div>
    </>
  );
}
