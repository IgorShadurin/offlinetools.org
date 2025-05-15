import type { Metadata } from "next";
import {
  Keyboard,
  Save,
  Search,
  Copy,
  Code,
  Zap,
  Settings,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Comparing Keyboard Shortcut Implementations in JSON Tools | Offline Tools",
  description:
    "Explore different ways to implement and manage keyboard shortcuts in JSON editing and viewing tools, from simple listeners to more structured approaches.",
};

export default function KeyboardShortcutsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Keyboard size={30} /> Comparing Keyboard Shortcut Implementations in JSON Tools
      </h1>

      <div className="space-y-6">
        <p>
          Keyboard shortcuts are essential for productivity in any text or data editing tool, and JSON editors are no exception. Implementing shortcuts effectively can significantly enhance the user experience, allowing for faster navigation, editing, and execution of common actions. However, managing shortcuts can become complex, especially as the number of features grows.
        </p>
        <p>
          This page explores different approaches to implementing keyboard shortcuts in web-based JSON tools, highlighting their pros, cons, and considerations for developers of various levels.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info size={24} /> Why Shortcuts Matter in JSON Tools
        </h2>
        <p>
          JSON tools often involve repetitive tasks like formatting, searching, copying paths, collapsing/expanding nodes, and saving. Keyboard shortcuts provide a fast, mouse-free way to trigger these actions. For developers and power users who frequently work with JSON data, efficient shortcuts are not just a convenience, but a necessity for workflow optimization.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Basic Implementation: Global Event Listeners
        </h2>
        <p>
          The most straightforward way to detect keyboard input in a web application is by adding event listeners to the global <code>document</code> or <code>window</code> objects.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic Global Shortcut Detection (Conceptual JavaScript/TypeScript):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
// In a client-side context where listeners can be attached
// Note: For a static Next.js page, this code is illustrative of client-side behavior.
// Attaching listeners directly in a component might require framework specifics (if client-side).

const handleKeyDown = (event: KeyboardEvent) => {
  // Prevent default browser behavior for certain keys (like Save)
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault(); // Prevent browser save dialog
    console.log('Shortcut: Save JSON');
    // Call your save function here
  }

  // Example: Find action (Cmd/Ctrl + F)
  if ((event.metaKey || event.ctrlKey) && event.key === 'f') {
      event.preventDefault(); // Prevent browser find dialog
      console.log('Shortcut: Open Find');
      // Call your find function here
  }

  // Example: Copy Path (Alt/Option + P)
  if ((event.altKey || event.metaKey && event.key === 'p')) { // Note: Alt+P might be different on Mac vs Win/Linux
      console.log('Shortcut: Copy JSON Path');
      // Call your copy path function here
  }

  // Example: Format JSON (Shift + F)
  if (event.shiftKey && event.key === 'F') { // Note: Checking for capital 'F' when Shift is pressed
       console.log('Shortcut: Format JSON');
       // Call your format function here
  }

  // Check for single keys
  if (event.key === 'Escape') {
      console.log('Escape key pressed');
      // Close a modal or cancel action
  }
};

// Add the listener (Conceptual - depends on your framework's lifecycle)
// document.addEventListener('keydown', handleKeyDown);

// Remember to remove the listener when the component unmounts or becomes inactive
// document.removeEventListener('keydown', handleKeyDown);
            `}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Pros of Global Listeners:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><Zap size={18} className="inline mr-1" /> Simple to implement for a few global shortcuts.</li>
          <li><Zap size={18} className="inline mr-1" /> Works regardless of which specific element within the page has focus (unless the event is stopped).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cons of Global Listeners:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><Info size={18} className="inline mr-1" /> Can lead to conflicts if not managed carefully (e.g., shortcut triggers inside a text input).</li>
          <li><Info size={18} className="inline mr-1" /> Difficult to manage for a large number of shortcuts.</li>
          <li><Info size={18} className="inline mr-1" /> Harder to make context-aware (e.g., "save" shortcut does different things based on the active panel).</li>
          <li><Info size={18} className="inline mr-1" /> Requires manual cleanup of listeners to prevent memory leaks.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings size={24} /> Component-Specific Listeners
        </h2>
        <p>
          Instead of listening globally, you can attach keyboard event listeners directly to specific elements or components that should react to shortcuts when they are focused or active. This is particularly useful for components like a JSON text editor area.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Component-Specific Shortcut Detection (Conceptual HTML/React):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
// In a client-side React-like component

// Assuming 'jsonTextAreaRef' is a ref attached to your <textarea> or editor element

// In a useEffect or similar lifecycle method (if client-side)
/*
const handleEditorKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault();
    console.log('Editor Shortcut: Save Content');
    // Save the content of THIS editor
  }
  // Other editor-specific shortcuts
};

if (jsonTextAreaRef.current) {
  jsonTextAreaRef.current.addEventListener('keydown', handleEditorKeyDown);
}

// Cleanup (if client-side)
return () => {
  if (jsonTextAreaRef.current) {
    jsonTextAreaRef.current.removeEventListener('keydown', handleEditorKeyDown);
  }
};
*/

// Or using inline React props (less flexible for complex logic)
/*
<textarea
  ref={jsonTextAreaRef}
  onKeyDown={(event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault();
      console.log('Inline Shortcut: Save Content');
      // Save logic
    }
  }}
  // ... other props
/>
*/
            `}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Pros of Component-Specific Listeners:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><Zap size={18} className="inline mr-1" /> Naturally context-aware – the listener only fires when the component is interacted with.</li>
          <li><Zap size={18} className="inline mr-1" /> Reduces the risk of conflicts between different parts of the application.</li>
          <li><Zap size={18} className="inline mr-1" /> Easier to manage shortcuts relevant only to a specific UI element.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Cons of Component-Specific Listeners:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><Info size={18} className="inline mr-1" /> Shortcuts only work when the specific component has focus.</li>
          <li><Info size={18} className="inline mr-1" /> Global actions (like opening a help dialog) might still need global listeners.</li>
          <li><Info size={18} className="inline mr-1" /> Requires passing logic down to components or managing via refs.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap size={24} /> Handling Conflicts and Specificity
        </h2>
        <p>
          A major challenge is managing conflicts when multiple listeners could potentially react to the same key combination.
        </p>
        <p>
          Strategies to mitigate conflicts:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Event Propagation:</strong> Use <code>event.stopPropagation()</code> or <code>event.stopImmediatePropagation()</code> in component-specific listeners to prevent the event from bubbling up to global listeners after it's handled.</li>
          <li><strong>Conditional Logic:</strong> In global listeners, check the type of the currently focused element (e.g., <code>event.target.tagName</code>). Avoid triggering shortcuts if focus is inside an <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, or element with <code>contenteditable</code>, unless the shortcut is specifically intended for text editing (like Copy/Paste/Cut).</li>
          <li><strong>Context/State (Conceptual):</strong> Maintain application state (not using `useState` here, but the concept applies) about which modal is open, which panel is active, etc., and use this state in event handlers to determine if a shortcut should be active.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Avoiding Conflicts in Global Listener (Conceptual):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`
const handleGlobalKeyDownWithConflictAvoidance = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

  // Allow standard text editing shortcuts in inputs
  if (isInput && (event.metaKey || event.ctrlKey) && (event.key === 'c' || event.key === 'v' || event.key === 'x')) {
    return; // Let the browser handle Copy/Paste/Cut
  }

  // Avoid non-text-editing shortcuts in inputs
  if (isInput && ((event.metaKey || event.ctrlKey) && event.key === 's')) {
     // Prevent save action while typing in an input
     event.preventDefault(); // Still prevent browser save, but maybe don't trigger app save immediately? Depends on UX.
     console.log('Save shortcut attempted in input, potentially ignored or handled differently.');
     return;
  }

  // Handle other global shortcuts only if not in an input or after input-specific checks
  if ((event.metaKey || event.ctrlKey) && event.key === 's') {
    event.preventDefault();
    console.log('Global Shortcut: Save JSON (handled)');
    // Perform global save
  }

  // Add checks for active modals, etc.
  // if (isModalOpen) {
  //   if (event.key === 'Escape') {
  //      console.log('Shortcut: Close Modal');
  //      // Close modal
  //   }
  //   return; // Prevent other shortcuts while modal is open
  // }

};
            `}
            </pre>
          </div>
        </div>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Copy size={24} /> Common JSON Tool Shortcuts
        </h2>
        <p>
          Here are some common actions in JSON tools that benefit from keyboard shortcuts:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><Save size={18} className="inline mr-1" /> Save: <kbd>Cmd + S</kbd> / <kbd>Ctrl + S</kbd></li>
          <li><Search size={18} className="inline mr-1" /> Find: <kbd>Cmd + F</kbd> / <kbd>Ctrl + F</kbd></li>
          <li><Search size={18} className="inline mr-1" /> Find Next: <kbd>Cmd + G</kbd> / <kbd>F3</kbd></li>
          <li><Code size={18} className="inline mr-1" /> Format/Prettify JSON: <kbd>Shift + Cmd + F</kbd> / <kbd>Shift + Ctrl + F</kbd></li>
          <li><Copy size={18} className="inline mr-1" /> Copy JSON Path: <kbd>Alt + P</kbd> / <kbd>Option + P</kbd></li>
          <li><Copy size={18} className="inline mr-1" /> Copy Value: <kbd>Alt + V</kbd> / <kbd>Option + V</kbd></li>
          <li>Expand/Collapse All Nodes: <kbd>Shift + Click</kbd> on an arrow or a dedicated shortcut.</li>
          <li>Toggle Node Expanded/Collapsed: <kbd>Space</kbd> or <kbd>Enter</kbd> when node is focused.</li>
          <li>Navigate Nodes: <kbd>Arrow Keys</kbd> (often handled natively by focusing list items/tree nodes).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings size={24} /> Advanced Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
            <li><strong>User Customization:</strong> Allowing users to view, change, or disable shortcuts adds significant value but requires a more complex configuration system.</li>
            <li><strong>Accessibility:</strong> Ensure shortcuts don't interfere with assistive technologies. Provide alternative ways to perform actions (buttons, menus). Document your shortcuts.</li>
            <li><strong>Cross-Browser/OS Compatibility:</strong> Be mindful that modifier keys (<kbd>Cmd</kbd>, <kbd>Ctrl</kbd>, <kbd>Alt</kbd>, <kbd>Meta</kbd>) behave differently across operating systems and browsers. Use feature detection (e.g., check for <code>event.metaKey</code> for the command key on macOS and <code>event.ctrlKey</code> for Ctrl on others).</li>
            <li><strong>Integration with Editor Libraries:</strong> If using a rich text editor or code editor component (like CodeMirror or Monaco), they often come with their own shortcut handling systems. Integrating global app shortcuts with editor-specific shortcuts requires careful coordination, often involving checking if the event originated from the editor.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info size={24} /> Conclusion
        </h2>
        <p>
          Implementing keyboard shortcuts in JSON tools ranges from simple global listeners for basic actions to complex context-aware systems for rich interfaces. Starting with global listeners is easy but quickly runs into conflict issues. Component-specific listeners offer better context but don't cover global actions. A robust solution often involves a combination of both, carefully managing event propagation and checking focus/context.
        </p>
        <p>
          Prioritize the most frequent actions for shortcuts and document them clearly. As your tool evolves, consider a more structured approach to managing shortcuts to avoid maintainability headaches and ensure a smooth user experience.
        </p>
      </div>
    </>
  );
}
