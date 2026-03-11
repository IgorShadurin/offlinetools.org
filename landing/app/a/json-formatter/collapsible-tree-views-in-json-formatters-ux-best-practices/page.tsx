import type { Metadata } from "next";

/**
 * Metadata for Collapsible Tree Views in JSON Formatters article
 */
export const metadata: Metadata = {
  title: "Collapsible Tree Views in JSON Formatters: UX Best Practices | Offline Tools",
  description:
    "Design better collapsible JSON tree views with practical UX guidance for readability, keyboard accessibility, search, and large-file performance.",
};

/**
 * Article page component for Collapsible Tree Views in JSON Formatters article
 */
export default function CollapsibleTreeViewsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Collapsible Tree Views in JSON Formatters: UX Best Practices</h1>

      <div className="space-y-6">
        <p>
          A collapsible tree view is the fastest way to make large JSON readable, but only when it helps users answer
          three questions immediately: where am I, what is hidden here, and how do I open just the next useful level.
          Poor tree views do the opposite. They hide too much structure, make expansion fiddly, and fall apart on
          large payloads.
        </p>

        <p>
          For a JSON formatter, the goal is not to show every node at once. The goal is progressive disclosure:
          surface structure first, then let users drill into the exact branch they care about without losing context,
          keyboard support, or performance.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950/30 my-4 border-l-4 border-blue-500">
          <h2 className="text-lg font-medium text-blue-900 dark:text-blue-200">Quick Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-2 text-blue-950 dark:text-blue-100">
            <li>Expand only the first useful levels by default, and collapse large arrays or deeply nested branches.</li>
            <li>Keep braces, brackets, counts, and short previews visible when nodes are collapsed.</li>
            <li>Make the whole row easy to toggle, but separate expand, select, and copy actions cleanly.</li>
            <li>Support search, copy path, and keyboard navigation without forcing users back to raw text.</li>
            <li>For big payloads, virtualize or chunk rendering and avoid unsafe “expand all” behavior.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Start with Sensible Default States</h2>

        <p>
          The initial expansion state shapes the entire experience. If everything starts expanded, users get noise. If
          everything starts collapsed, they get mystery. In most JSON formatters, the best default is to show the root,
          expand one or two meaningful levels, and aggressively collapse obviously large collections.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Expand structure, not volume:</strong> Showing top-level objects and a small amount of nested
            context usually gives enough orientation without dumping hundreds of rows on screen.
          </li>
          <li>
            <strong>Auto-collapse large arrays:</strong> Arrays with dozens or thousands of items should start closed
            and show their size immediately.
          </li>
          <li>
            <strong>Preserve user state:</strong> Reformatting, re-indenting, or switching color themes should not
            blow away the user&apos;s current expansion path.
          </li>
          <li>
            <strong>Reset intentionally:</strong> If a new document loads, it is usually better to reset the tree than
            to reapply stale expansion state from a different payload.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">A collapsed row should still communicate meaning</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`"users": Array(1247) [ { "id": 1, "name": "Ana" }, { ... }, ... ]
"settings": Object(8) { "theme": "dark", "locale": "en-US", ... }
"errors": Array(0) []`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-muted-foreground">
            Counts and short previews reduce unnecessary expansion because users can decide whether a branch is worth
            opening.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Design Each Row for Fast Scanning</h2>

        <p>
          Users scan JSON trees row by row. A strong row design makes keys, types, and values legible at a glance
          without turning the interface into a wall of syntax coloring.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Keep punctuation visible:</strong> Do not hide braces, brackets, or commas so aggressively that
            collapsed nodes lose their JSON shape.
          </li>
          <li>
            <strong>Separate key from value visually:</strong> Keys should be stable anchors. Values, previews, and
            type hints should be secondary but still readable.
          </li>
          <li>
            <strong>Use color as enhancement, not as the only signal:</strong> Strings, numbers, booleans, and null
            values can be color-coded, but users still need text labels, punctuation, and contrast that work without
            color perception.
          </li>
          <li>
            <strong>Make depth readable, not dramatic:</strong> Indentation should communicate hierarchy without
            causing extreme horizontal drift after a few nesting levels.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Effective row anatomy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">Useful:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`▶ "orders"  Array(32)  [ { "id": 1001, ... }, ... ]
  disclosure  key      type/count  preview`}
                </pre>
              </div>
              <p className="text-sm mt-2 text-green-600 dark:text-green-400">Users can decide in one glance.</p>
            </div>
            <div>
              <p className="font-medium mb-2">Weak:</p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`▶ orders [ ... ]
  no count, no type cue, no preview, tiny hit area`}
                </pre>
              </div>
              <p className="text-sm mt-2 text-red-600 dark:text-red-400">Users must expand just to learn basics.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Make Expansion Easy Without Creating Ambiguity</h2>

        <p>
          A common mistake is to make every click do everything. Expansion, selection, editing, and copying are
          different actions. If one click target tries to handle all of them, users make accidental changes.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Prefer a row-wide toggle zone:</strong> Users should not need pixel-perfect clicks on a tiny
            chevron.
          </li>
          <li>
            <strong>Keep primary actions separated:</strong> Copy path, copy value, edit, and expand should not all
            fire from the same gesture.
          </li>
          <li>
            <strong>Show clear state changes:</strong> Expanded and collapsed rows need obvious icon, spacing, and
            preview differences.
          </li>
          <li>
            <strong>Avoid shortcut collisions:</strong> Do not assign global shortcuts that override familiar browser
            or OS actions like copy, find, or basic navigation.
          </li>
        </ul>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Practical rule</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            If expanding a node is a frequent action, make the target generous. On the web, WCAG 2.2 sets a minimum
            target size of 24 by 24 CSS pixels, and larger targets often feel better on touch devices.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Accessibility and Keyboard Support Are Part of the UX</h2>

        <p>
          If a JSON formatter exposes its structure as a real tree widget, it should behave like one. Current WAI-ARIA
          treeview guidance expects a predictable keyboard model, visible focus, and accurate expanded and selected
          states. Accessibility here is not a bonus feature. It is what makes a dense tree navigable for power users.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Match established arrow-key behavior:</strong> Right arrow opens a closed node or moves to its
            first child, and left arrow closes an open node or moves back to its parent.
          </li>
          <li>
            <strong>Support tree navigation keys:</strong> Up and down move between visible nodes, home and end jump to
            the first and last visible nodes, and type-ahead helps users jump by key name.
          </li>
          <li>
            <strong>Keep focus distinct from selection:</strong> A selected row and the focused row are not always the
            same thing, especially in multi-select experiences.
          </li>
          <li>
            <strong>Expose the right semantics:</strong> Parent nodes need accurate expanded state, while leaf nodes
            should not pretend to be expandable.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Minimum tree behaviors worth shipping</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Right Arrow  open node / move into first child
Left Arrow   close node / move to parent
Up / Down    move through visible rows
Home / End   jump to first / last visible row
Type-ahead   jump to the next matching key`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-muted-foreground">
            If you call the control a tree, users will expect this behavior. If you cannot support it, a simpler
            expandable list may be the safer UI choice.
          </p>
        </div>

        <p>
          Large JSON trees often use virtualization or lazy loading. When not every node is present in the DOM, the
          accessible structure still needs to stay coherent. That means preserving level and position information, not
          just painting visible rows.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Search, Path Awareness, and Copy Actions</h2>

        <p>
          Search is where many tree views break down. Users find a key, but the interface either expands too much,
          loses the match during rerender, or gives no sense of where the result lives in the hierarchy.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Auto-expand only the matching path:</strong> Reveal enough ancestors for context without exploding
            the entire document open.
          </li>
          <li>
            <strong>Show the full location:</strong> Breadcrumbs or a stable path label help users confirm they found
            the right branch.
          </li>
          <li>
            <strong>Make paths copyable:</strong> Copying a JSON path is often more valuable than copying the rendered
            row text because it supports debugging, test writing, and handoff to teammates.
          </li>
          <li>
            <strong>Expose next and previous match navigation:</strong> This matters more than raw match count once the
            file grows beyond a handful of nodes.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Path-friendly search behavior</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`Match 3 of 8
root > users[0] > addresses[2] > city

JSONPath: $.users[0].addresses[2].city
Value: "Berlin"`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Large JSON Requires Defensive Performance Design</h2>

        <p>
          Tree views feel simple on tiny documents and break on huge ones. The moment a formatter starts handling API
          traces, logs, or exported datasets, expansion strategy and rendering cost become product decisions, not just
          implementation details.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Render only what users can act on:</strong> Windowing and deferred child rendering prevent a large
            document from turning every expand action into a full rerender.
          </li>
          <li>
            <strong>Chunk very large arrays:</strong> “Show 100 more” is often better than trying to paint 50,000
            siblings at once.
          </li>
          <li>
            <strong>Be careful with expand all:</strong> On large nodes, it should be disabled, scoped to a depth, or
            guarded with a warning.
          </li>
          <li>
            <strong>Keep scrolling stable:</strong> Expanding a branch should not yank the viewport so far that users
            lose the row they just interacted with.
          </li>
        </ul>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Performance tip</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            A JSON formatter should treat “expand all” as a convenience for small payloads, not as a universal default.
            For large branches, a depth-limited expand is usually safer and more useful.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Mobile Tree Views Need Different Tradeoffs</h2>

        <p>
          Deep indentation that feels fine on a desktop quickly collapses into unusable slivers on a phone. Mobile tree
          views need fewer simultaneous controls, shallower indentation, and stronger focus on path context.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Reduce indentation on narrow screens:</strong> Preserve the sense of hierarchy without letting
            depth consume the whole viewport width.
          </li>
          <li>
            <strong>Keep actions secondary:</strong> Move copy, edit, or advanced actions into an overflow menu instead
            of crowding every row.
          </li>
          <li>
            <strong>Allow horizontal review without breaking the page:</strong> Scroll the value area when necessary,
            not the entire interface.
          </li>
          <li>
            <strong>Keep the current path visible:</strong> A compact breadcrumb or sticky path bar helps users stay
            oriented after several taps into nested data.
          </li>
        </ul>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Mobile UX tip</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            On small screens, a lightweight detail drawer for the selected node can work better than forcing every long
            value to stay fully visible in the tree itself.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Tiny disclosure icons:</strong> If users have to hunt for the chevron, expansion will feel broken.
          </li>
          <li>
            <strong>Collapsed nodes with no preview:</strong> Hidden content should still communicate size and type.
          </li>
          <li>
            <strong>Keyboard-inaccessible trees:</strong> A visual tree with no proper focus model is a half-built
            control.
          </li>
          <li>
            <strong>Search that expands everything:</strong> Users need just enough context, not a new mess.
          </li>
          <li>
            <strong>State loss after every transformation:</strong> Users should not have to rebuild their place in the
            document after each format or filter operation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">A Practical Checklist</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Top-level structure is visible immediately.</li>
          <li>Collapsed nodes show type, count, and a short preview.</li>
          <li>Expansion targets are easy to hit with mouse, keyboard, and touch.</li>
          <li>Keyboard behavior matches user expectations for tree navigation.</li>
          <li>Search reveals matches in context and exposes a copyable path.</li>
          <li>Large arrays and objects are chunked, virtualized, or depth-limited.</li>
          <li>Mobile layout reduces indentation and preserves orientation.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The best collapsible tree views in JSON formatters are not the ones with the most animation or the most
          controls. They are the ones that let users scan structure quickly, open the right branch with confidence, and
          stay oriented while working through nested data.
        </p>

        <p>
          If you get the defaults, keyboard model, path handling, and large-payload behavior right, a JSON tree view
          stops being a decorative formatter feature and becomes a real navigation tool. That is the standard search
          users are usually looking for when they ask about JSON tree view UX best practices.
        </p>
      </div>
    </>
  );
}
