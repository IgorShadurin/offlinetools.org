import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Undo/Redo Stacks for JSON Editing | Offline Tools",
  description:
    "Learn how to implement robust undo and redo functionality for JSON editing interfaces using stack-based approaches.",
};

export default function UndoRedoForJsonEditingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Building Undo/Redo Stacks for JSON Editing
      </h1>

      <div className="space-y-6">
        <p>
          Implementing undo and redo functionality is a crucial feature for
          providing a good user experience in any editor, including those for
          JSON data. It allows users to revert mistakes and reapply changes,
          instilling confidence and improving workflow efficiency. This article
          explores how to build robust undo and redo stacks specifically tailored
          for JSON editing interfaces.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Why Undo/Redo is Essential
        </h2>
        <p>
          Imagine editing a complex JSON configuration file and accidentally deleting
          a critical section. Without undo, recovering from this error might mean
          manual retyping or losing work. Undo/redo capabilities provide a safety
          net, making the editor more forgiving and user-friendly. For JSON editors,
          which often involve intricate nested structures, this is particularly important.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Core Concepts: Stacks and State</h2>
        <p>
          The classic approach to implementing undo/redo relies on two stacks:
          an undo stack and a redo stack.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">The Two Stacks:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Undo Stack:</span> Stores states or operations that can be reverted.
              When an action is performed, the "undo" information for that action is pushed onto this stack.
            </li>
            <li>
              <span className="font-medium">Redo Stack:</span> Stores states or operations that can be reapplied
              after being undone. When an action is undone, the "redo" information is pushed onto this stack.
            </li>
          </ul>
        </div>

        <p>
          The core challenge is deciding <em>what</em> to store on these stacks:
          should you store the full state of the JSON document after each change,
          or just the operation that was performed (like adding a key, changing a value, etc.)?
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choosing What to Stack: State vs. Operations</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Option 1: Storing Full State</h3>
          <p>
            After every significant edit, you save the complete JSON string or parsed object.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`// Conceptual Representation
undoStack = [ state_0, state_1, state_2, ... ]; // Full JSON states`}
            </pre>
          </div>
          <h4 className="font-semibold mt-3">Pros:</h4>
          <ul className="list-disc pl-6 text-sm">
            <li>Simple to implement: just push/pop the current state.</li>
            <li>Guaranteed correctness as you're always reverting to/applying a known state.</li>
          </ul>
          <h4 className="font-semibold mt-2">Cons:</h4>
          <ul className="list-disc pl-6 text-sm">
            <li>Can consume significant memory, especially for large JSON documents and many undo steps.</li>
            <li>Might be slow if the state needs to be serialized/deserialized or deep-cloned frequently.</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Option 2: Storing Operations (Diff/Patch)</h3>
          <p>
            Instead of the full state, you record the specific change that occurred (e.g., "add key 'x' with value 'y' at path '/a/b'").
            To undo, you apply the inverse operation. To redo, you reapply the original operation.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2">
            <pre>
              {`// Conceptual Representation
undoStack = [ operation_0, operation_1, operation_2, ... ]; // Operations to undo
// operation_0 might be { type: 'add', path: '/a/b', value: 'oldValue' }`}
            </pre>
          </div>
          <h4 className="font-semibold mt-3">Pros:</h4>
          <ul className="list-disc pl-6 text-sm">
            <li>Generally more memory efficient, especially for small changes in large documents.</li>
            <li>Can be faster for undo/redo if applying the operation is quicker than loading a full state.</li>
            <li>Easier to serialize and potentially use for collaborative editing.</li>
          </ul>
          <h4 className="font-semibold mt-2">Cons:</h4>
          <ul className="list-disc pl-6 text-sm">
            <li>Requires defining and implementing logic for each type of operation (add, remove, replace).</li>
            <li>Need to implement the inverse operation logic for undo.</li>
            <li>Complexity increases if operations interact in unexpected ways or the state isn't exactly as expected when applying a patch.</li>
          </ul>
        </div>

        <p>
          For JSON editing, a hybrid approach or using a library that handles JSON diffing/patching (like `json-patch` or `deep-diff`)
          can simplify the operations approach. Libraries often represent operations as a sequence of instructions (like JSON Patch)
          that can be applied forward (redo) and backward (undo).
        </p>

        <h2 className="text-2xl font-semibold mt-8">Implementing the Stacks</h2>

        <h3 className="text-xl font-semibold mt-6">State Management</h3>
        <p>
          You'll need a way to manage the current state of the JSON data and the two stacks.
          In React/Next.js, this could be done using `useState`, `useReducer`, or a state management library like Redux or Zustand.
          `useReducer` is often a good fit as actions naturally map to state transitions and can include the undo/redo logic.
        </p>

        <h3 className="text-xl font-semibold mt-6">Handling User Actions</h3>
        <p>
          Whenever a user makes a change to the JSON (e.g., edits a value, adds an item to an array, deletes a key):
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Calculate the change (either the new full state or the operation/diff).</li>
          <li>Push the 'undo' information (previous state or inverse operation) onto the undo stack.</li>
          <li>Clear the redo stack. Once a new action is performed, the old 'future' path is lost.</li>
          <li>Update the current JSON state.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Handling Undo</h3>
        <p>
          When the user triggers undo (e.g., clicks an undo button, presses Ctrl+Z):
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Check if the undo stack is empty. If so, nothing to undo.</li>
          <li>Pop the top item from the undo stack.</li>
          <li>Push the 'redo' information (current state or the operation just undone) onto the redo stack.</li>
          <li>Apply the popped 'undo' item: either revert to the previous state (full state approach) or apply the inverse operation (operations approach).</li>
          <li>Update the current JSON state.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Handling Redo</h3>
        <p>
          When the user triggers redo (e.g., clicks a redo button, presses Ctrl+Y):
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Check if the redo stack is empty. If so, nothing to redo.</li>
          <li>Pop the top item from the redo stack.</li>
          <li>Push the 'undo' information (current state or the operation just redone) onto the undo stack.</li>
          <li>Apply the popped 'redo' item: either move forward to the next state (full state approach) or reapply the original operation (operations approach).</li>
          <li>Update the current JSON state.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Example: Simplified State-Based Approach</h2>
        <p>
          Here's a conceptual simplified example using React's `useState` (though `useReducer` would be more idiomatic for complex logic).
          This uses the full-state approach for simplicity.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual React Component Logic:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import React, { useState, useEffect } from 'react';

// Assume initialJson is your starting JSON object
const initialJson = { name: "Example", version: 1 };

function JsonEditorWithUndo() {
  // Current editable JSON state
  const [currentJson, setCurrentJson] = useState(initialJson);
  // Stack to store previous states for undo
  const [undoStack, setUndoStack] = useState([initialJson]);
  // Stack to store future states for redo
  const [redoStack, setRedoStack] = useState([]);
  // Keep track of the current position in the undo stack (optional, but simplifies)
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Function to call when the JSON changes
  const handleJsonChange = (newJson) => {
    // Only add to history if the new state is different
    if (JSON.stringify(newJson) !== JSON.stringify(currentJson)) {
      // Slice the undo stack to remove history after the current point
      const newUndoStack = undoStack.slice(0, currentHistoryIndex + 1);
      const nextIndex = newUndoStack.length;

      setUndoStack([...newUndoStack, newJson]);
      setCurrentHistoryIndex(nextIndex);
      setCurrentJson(newJson);
      setRedoStack([]); // Clear redo stack on new action
    } else {
       // If state is the same, just update current, don't add history
       setCurrentJson(newJson);
    }
  };

  // Function to perform undo
  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      const previousIndex = currentHistoryIndex - 1;
      const stateToUndo = undoStack[currentHistoryIndex]; // State before undo
      const previousState = undoStack[previousIndex];    // State to revert to

      // Push the state we are leaving onto the redo stack
      setRedoStack([stateToUndo, ...redoStack]);

      setCurrentJson(previousState);
      setCurrentHistoryIndex(previousIndex);
    }
  };

  // Function to perform redo
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0]; // State to redo
      const newRedoStack = redoStack.slice(1);

      // Push the state we are leaving onto the undo stack
      setUndoStack([...undoStack.slice(0, currentHistoryIndex + 1), currentJson]);

      setCurrentJson(nextState);
      setRedoStack(newRedoStack);
      setCurrentHistoryIndex(currentHistoryIndex + 1); // Move index forward
    }
  };

  // Example usage:
  // Imagine an editor component calls handleJsonChange(updatedJson)
  // Buttons would call handleUndo() and handleRedo()

  return (
    <div>
      <button onClick={handleUndo} disabled={currentHistoryIndex === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={redoStack.length === 0}>
        Redo
      </button>
      <pre>{JSON.stringify(currentJson, null, 2)}</pre>
      {/* Your actual JSON editor component would go here,
          receiving currentJson and calling handleJsonChange */}
    </div>
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            <em>Note:</em> This example uses `JSON.stringify` for shallow comparison
            and deep cloning, which might not be performant for very large JSON.
            A deep clone utility (`lodash.cloneDeep` or similar) would be better.
            The `currentHistoryIndex` helps manage history branching.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations and Edge Cases</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Points to Ponder:</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">History Limit:</span> Stacks can grow indefinitely. Implement a limit (e.g., last 50 changes) to prevent excessive memory usage.
            </li>
            <li>
              <span className="font-medium">Granularity:</span> What constitutes a single undoable action? A single character typed? Saving the document? Editing a single field? Define this clearly based on user expectation.
            </li>
            <li>
              <span className="font-medium">Serialization:</span> If the editor state (including stacks) needs to be saved and restored (e.g., across sessions), ensure the items stored in the stacks are serializable.
            </li>
            <li>
              <span className="font-medium">Collaboration:</span> In collaborative editors, simple undo/redo stacks are insufficient due to concurrent changes. Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs) are needed.
            </li>
            <li>
              <span className="font-medium">Performance:</span> For large documents, applying diffs (operations approach) is usually faster than loading/saving entire states.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building undo/redo functionality for a JSON editor involves managing the document's state history using stacks.
          The choice between storing full states or operations (diffs/patches) depends on the document size, memory constraints,
          and complexity tolerance. While storing full states is simpler to implement, the operations approach is generally more
          efficient for larger documents and offers more flexibility. By carefully designing your state management and action handling,
          you can provide users with a robust and reliable editing experience, complete with essential undo and redo capabilities.
        </p>
      </div>
    </>
  );
}