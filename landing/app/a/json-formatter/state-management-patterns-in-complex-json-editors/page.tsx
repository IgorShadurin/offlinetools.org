import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "State Management Patterns in Complex JSON Editors | Offline Tools",
  description:
    "A practical guide to document state, UI state, validation, undo/redo, patches, and performance in complex JSON editors.",
};

export default function StateManagementJsonEditorsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">State Management Patterns in Complex JSON Editors</h1>

      <div className="space-y-6">
        <p>
          Most complex JSON editors become fragile for the same reason: they mix the document itself, tree UI state,
          validation results, draft input buffers, and undo history into one giant nested object. That works at first,
          then collapses once you add large files, array reordering, schema validation, or collaborative editing.
        </p>

        <p>
          The best default pattern is simpler than it sounds: keep one canonical document model, keep UI state separate,
          and record edits as operations or patches. That lines up with current React guidance to avoid redundant and
          deeply nested state when possible. In practice, JSON editors stay maintainable when selection is stored by
          path or stable node ID, derived facts like error counts are computed instead of duplicated, and hot update
          paths are flattened before performance becomes a problem.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-xl font-semibold">Short Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Keep the JSON document as the single source of truth.</li>
            <li>Keep expansion, selection, focus, and draft input state in a separate UI layer.</li>
            <li>Track undo/redo with inverse operations or patches, not full snapshots on every keystroke.</li>
            <li>Use stable node IDs when paths will change because of inserts, deletes, or drag-and-drop.</li>
            <li>Use selector-based subscriptions and tree virtualization when the file is large.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What State a JSON Editor Actually Owns</h2>
        <p>
          Search visitors often expect state management to mean only the JSON value. In a real editor, that is only one
          slice. You usually have at least five different kinds of state:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Document state:</span> the canonical JSON tree or a normalized node graph.
          </li>
          <li>
            <span className="font-medium">View state:</span> expanded nodes, active selection, cursor target, search
            matches, and scroll position.
          </li>
          <li>
            <span className="font-medium">Draft state:</span> temporary text the user is typing before it becomes valid
            JSON.
          </li>
          <li>
            <span className="font-medium">Derived state:</span> validation errors, dirty flags, counts, breadcrumbs,
            and filtered tree indexes.
          </li>
          <li>
            <span className="font-medium">History and sync state:</span> undo/redo stacks, pending remote operations,
            and collaboration metadata.
          </li>
        </ul>
        <p>
          Problems start when the same fact appears in multiple places. A common bug is storing both a selected node
          object and a selected node ID. Another is storing validation flags inside each node while also keeping a
          global error map. Pick one canonical representation, then derive the rest.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Recommended Default Architecture</h2>
        <p>
          For a feature-rich editor, the most resilient shape is a layered model: canonical document state, separate UI
          state, derived validation/search indexes, and a history layer that records operations. That gives you clearer
          ownership and much cheaper updates.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual State Shape</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`type NodeId = string;

type EditorState = {
  document: {
    rootId: NodeId;
    nodesById: Record<NodeId, JsonNode>;
  };
  ui: {
    expandedById: Record<NodeId, true>;
    selectedId: NodeId | null;
    editingId: NodeId | null;
    draftTextById: Record<NodeId, string>;
  };
  validation: {
    errorsById: Record<NodeId, string[]>;
    lastValidatedRevision: number;
  };
  history: {
    undo: Operation[][];
    redo: Operation[][];
  };
};`}
            </pre>
          </div>
          <p className="mt-4">
            This does not mean every editor must normalize the tree. It means each concern gets its own home. For
            smaller editors, the document can stay as a plain nested object while the other layers remain separate.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Pattern 1: Normalize the Document When Paths Are Unstable</h2>
        <p>
          If your editor supports array insertion, deletion, drag-and-drop reordering, or node moves, pure path-based
          state becomes harder to manage. Every change to an array shifts later paths, which can break selection,
          expansion state, cached validation results, and pending edits.
        </p>
        <p>
          That is where a normalized document store helps. Store nodes by stable ID, track parent-child relationships
          separately, and let paths be a derived view instead of the primary identity. Stable IDs survive reordering and
          make node-level subscriptions much cheaper.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use stable node IDs if nodes can move.</li>
          <li>Use paths when the structure is mostly static and you want simpler code.</li>
          <li>Do not key expansion or selection by raw array index if the user can reorder items.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Pattern 2: Keep Ephemeral UI State Out of the Core Store</h2>
        <p>
          Not every keystroke or hover state belongs in global state. Inline rename buffers, open context menus, hover
          affordances, and temporary text that has not parsed yet are often better kept local to the active component.
          That reduces store churn and prevents unrelated parts of the tree from re-rendering.
        </p>
        <p>
          Promote UI state only when other parts of the app need it: keyboard shortcuts, breadcrumbs, inspector panels,
          persistence across navigation, or collaboration cursors are good reasons. Everything else can stay close to
          the component using it.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Pattern 3: Use Operations or Patches for Undo/Redo</h2>
        <p>
          Snapshot-based history is easy to build and expensive to keep. Once files get large, pushing the whole
          document into history on every edit becomes a memory and performance problem. Operations and inverse
          operations are the usual upgrade path.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Edit Flow</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-3">
            <pre>
              {`const operation = {
  type: "setValue",
  nodeId: "node_42",
  nextValue: "Jane Doe",
};

const inverseOperation = {
  type: "setValue",
  nodeId: "node_42",
  nextValue: "John Doe",
};

dispatch(operation);
undoStack.push([inverseOperation]);
redoStack.length = 0;`}
            </pre>
          </div>
          <p className="mt-4">
            Group operations into transactions for multi-step actions like paste, sort, or drag-and-drop. Coalesce text
            edits so undo feels human, not mechanical.
          </p>
        </div>

        <p>
          If you use Immer, its current patches are useful for history, but they are not a drop-in RFC 6902 JSON Patch
          payload. Immer patch paths are arrays, while JSON Patch uses JSON Pointer strings. If your backend, audit log,
          or collaboration service expects RFC 6902, convert intentionally instead of assuming the formats match.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Pattern 4: Separate Validation from Editing</h2>
        <p>
          Validation is usually derived state, not core state. The document should not need embedded error flags to be
          editable. Keep a validation index keyed by node ID or path, update it after edits, and let the renderer ask
          whether a node currently has errors.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Run cheap local validation immediately for the active field.</li>
          <li>Debounce full-document or JSON Schema validation for large files.</li>
          <li>Cache error maps separately so you can invalidate only affected branches.</li>
          <li>Store one authoritative error map instead of duplicating booleans on every node.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Performance Rules That Matter on Large Files</h2>
        <p>
          Large JSON editors fail less because of the wrong library and more because of the wrong update boundaries.
          These rules usually matter more than the store choice itself:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Subscribe to small slices of state. A single context value containing the whole editor will fan out
            re-renders unless consumers are carefully isolated.
          </li>
          <li>
            Render only visible rows or tree nodes. Virtualization is often a bigger win than micro-optimizing reducers.
          </li>
          <li>
            Split raw text input from the parsed document so users can temporarily type invalid JSON without corrupting
            the canonical model.
          </li>
          <li>
            Revalidate and reindex incrementally when possible instead of rescanning the whole document on every
            keystroke.
          </li>
          <li>
            Move expensive parse or validation work off the hot path for very large documents, including into a worker
            when needed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Decision Guide</h2>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 border-b border-gray-300 dark:border-gray-700">Scenario</th>
                <th className="text-left p-3 border-b border-gray-300 dark:border-gray-700">Best-Fit Pattern</th>
                <th className="text-left p-3 border-b border-gray-300 dark:border-gray-700">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Small editor, no schema, no collaboration
                </td>
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Nested document plus separate UI state
                </td>
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Lowest complexity, easy to reason about
                </td>
              </tr>
              <tr className="align-top">
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Large tree with frequent structural edits
                </td>
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Normalized store with stable node IDs and selectors
                </td>
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Survives reordering and keeps updates local
                </td>
              </tr>
              <tr className="align-top">
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Heavy validation and inspector side panels
                </td>
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Canonical document plus derived validation index
                </td>
                <td className="p-3 border-b border-gray-300 dark:border-gray-700">
                  Prevents duplicated error state and simplifies refresh
                </td>
              </tr>
              <tr className="align-top">
                <td className="p-3">
                  Collaboration, audit trail, or durable undo/redo
                </td>
                <td className="p-3">Operation or patch log layered on top of the document store</td>
                <td className="p-3">Makes sync, replay, and reversible edits practical</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Storing both the selected node object and its ID.</li>
          <li>Using raw array paths as permanent identity in an editor that supports reordering.</li>
          <li>Putting every hover, menu, and draft value into one global store.</li>
          <li>Pushing full-document snapshots into history on every keystroke.</li>
          <li>Running full schema validation synchronously on each character input.</li>
          <li>Coupling the parsed document too tightly to a text box that frequently contains invalid JSON mid-edit.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          State management in a complex JSON editor is less about picking a trendy library and more about separating
          responsibilities. Keep the document canonical, keep UI state independent, treat validation as derived data,
          and use operations or patches for history and sync. If you do that, the choice between reducer, external
          store, or custom service becomes an implementation detail instead of the architecture itself.
        </p>
      </div>
    </>
  );
}
