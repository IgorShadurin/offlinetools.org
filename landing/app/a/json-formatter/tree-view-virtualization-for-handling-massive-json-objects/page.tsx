import type { Metadata } from "next";
import { AlertTriangle, Database, Gauge, Keyboard, ListTree, Ruler, ScrollText, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Tree View Virtualization for Massive JSON Objects | Offline Tools",
  description:
    "Build a fast JSON tree viewer by flattening expanded nodes into visible rows, virtualizing the viewport, handling dynamic heights, and preserving tree accessibility.",
};

const indexedTreeSnippet = String.raw`type JsonKind = "object" | "array" | "string" | "number" | "boolean" | "null";

interface IndexedNode {
  id: string;
  parentId: string | null;
  key: string;
  depth: number;
  kind: JsonKind;
  valuePreview: string;
  childIds: string[];
}

type NodeIndex = Record<string, IndexedNode>;

// Build this once after parsing the JSON.
// Keep the raw value elsewhere if users need copy/export actions.
const nodes: NodeIndex = {
  root: {
    id: "root",
    parentId: null,
    key: "root",
    depth: 0,
    kind: "object",
    valuePreview: "{...}",
    childIds: ["users", "settings"],
  },
  users: {
    id: "users",
    parentId: "root",
    key: "users",
    depth: 1,
    kind: "array",
    valuePreview: "[120000 items]",
    childIds: ["users.0", "users.1"],
  },
};`;

const visibleRowsSnippet = String.raw`interface VisibleRow {
  id: string;
  depth: number;
  key: string;
  kind: JsonKind;
  valuePreview: string;
  expandable: boolean;
  expanded: boolean;
}

function buildVisibleRows(rootId: string, index: NodeIndex, expanded: Set<string>): VisibleRow[] {
  const rows: VisibleRow[] = [];
  const stack = [rootId];

  while (stack.length > 0) {
    const id = stack.pop()!;
    const node = index[id];
    const expandable = node.childIds.length > 0;
    const isExpanded = expandable && expanded.has(id);

    rows.push({
      id: node.id,
      depth: node.depth,
      key: node.key,
      kind: node.kind,
      valuePreview: node.valuePreview,
      expandable,
      expanded: isExpanded,
    });

    if (isExpanded) {
      for (let i = node.childIds.length - 1; i >= 0; i -= 1) {
        stack.push(node.childIds[i]);
      }
    }
  }

  return rows;
}`;

const virtualizerSnippet = String.raw`const rowVirtualizer = useVirtualizer({
  count: visibleRows.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 26,
  overscan: 8,
  getItemKey: (index) => visibleRows[index].id,
});

return (
  <div ref={scrollRef} style={{ height: 560, overflow: "auto" }}>
    <div
      style={{
        height: rowVirtualizer.getTotalSize(),
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = visibleRows[virtualRow.index];

        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: \`translateY(\${virtualRow.start}px)\`,
            }}
          >
            <JsonTreeRow row={row} />
          </div>
        );
      })}
    </div>
  </div>
);`;

export default function TreeViewVirtualizationArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <ListTree className="h-8 w-8 text-blue-500" /> Tree View Virtualization for Massive JSON
      </h1>

      <div className="space-y-6">
        <p>
          If your JSON viewer slows down after a few thousand visible nodes, the fix is usually not a smarter tree
          widget. The fix is to turn the expanded part of the tree into a flat list of visible rows, then virtualize
          that list so the DOM only contains what the user can actually see.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="font-semibold text-blue-950 dark:text-blue-100">Short answer</p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Parse and index the JSON once.</li>
            <li>Track expansion state as a set of expanded node IDs.</li>
            <li>Build a flat array of only the rows whose ancestors are expanded.</li>
            <li>Feed that flat array into a virtualizer with stable keys and light row components.</li>
            <li>Measure row height only if you truly need wrapped or multi-line values.</li>
          </ul>
        </div>

        <p>
          The snippets below assume a client component or another stateful UI layer. This article focuses on the
          architecture that keeps a massive JSON tree responsive, not on shipping a full interactive demo inside the
          page itself.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Gauge className="h-6 w-6 text-red-500" /> When Virtualization Is Required
        </h2>
        <p>
          A naive tree renders every expanded node into the DOM. That fails quickly because JSON trees are not just
          long lists. Each row may also include indentation, icons, value previews, copy buttons, selection state, and
          expand toggles.
        </p>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Initial render becomes expensive because the browser has to create too many elements.</li>
          <li>Scrolling stutters because layout and paint work grows with the number of rendered rows.</li>
          <li>Expansion feels slow because opening one node may inject thousands of descendants at once.</li>
          <li>Selection and keyboard focus become brittle when rows mount and unmount unpredictably.</li>
        </ul>
        <p>
          For a massive JSON object, performance is usually bounded by the number of rendered rows, not the total size
          of the source data. That is why tree virtualization works: it keeps the rendered row count small even when
          the underlying JSON is huge.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Zap className="h-6 w-6 text-green-500" /> The Architecture That Actually Scales
        </h2>
        <p>
          The most reliable pattern is to separate the problem into three layers: data indexing, visible-row
          generation, and viewport rendering.
        </p>
        <ol className="my-4 list-decimal space-y-2 pl-6">
          <li>Normalize parsed JSON into a node index so every node can be found by ID or path in constant time.</li>
          <li>Store expansion state separately, usually as a set of node IDs.</li>
          <li>Rebuild a flat visible-row array whenever expansion, filtering, or sorting changes.</li>
          <li>Give that visible-row array to a virtualizer and render only the current window plus overscan.</li>
        </ol>
        <p>
          The key design choice is this: do not try to virtualize a nested DOM tree directly. Virtualize a flat row
          model that still carries tree metadata like depth, path, and expansion state.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Database className="h-6 w-6 text-blue-500" /> Index the JSON First
        </h2>
        <p>
          Search visitors usually look for rendering advice, but large JSON viewers often waste time earlier in the
          pipeline. If every row render walks the original object again to find children, compute previews, or build
          paths, virtualization will help less than expected.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">A normalized node index keeps row rendering cheap</h3>
          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>{indexedTreeSnippet}</pre>
          </div>
        </div>
        <p>
          This gives each rendered row a stable identity, a path back to the original value, and enough metadata to
          render indentation and previews without rescanning the full tree.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <ScrollText className="h-6 w-6 text-blue-500" /> Flatten Only Expanded Branches
        </h2>
        <p>
          The virtualizer should receive a plain array of visible rows. That array is rebuilt from the indexed tree and
          the current expansion state.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Visible rows are the real source for rendering</h3>
          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>{visibleRowsSnippet}</pre>
          </div>
        </div>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Collapsed branches disappear from the visible array immediately.</li>
          <li>Expanded branches insert their descendants in tree order.</li>
          <li>Filtering can reuse the same row model by expanding ancestor chains of matches.</li>
          <li>Copy, inspect, and jump-to-path actions stay fast because each row still has a stable node ID.</li>
        </ul>
        <p>
          This flat row model is the step many implementations skip. It is also the step that makes tree
          virtualization practical.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Ruler className="h-6 w-6 text-amber-500" /> Fixed Heights Win Until You Truly Need Dynamic Heights
        </h2>
        <p>
          A fixed row height is still the easiest way to ship a fast tree viewer. If you can keep each row to a single
          line with truncated previews, your scroll math stays simple and expansion feels predictable.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
            <h3 className="text-lg font-semibold text-green-950 dark:text-green-100">Use fixed height when</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Rows are single-line and values are truncated.</li>
              <li>You want the smoothest scrolling with the least complexity.</li>
              <li>You expect frequent expand and collapse operations.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
            <h3 className="text-lg font-semibold text-amber-950 dark:text-amber-100">Use dynamic height when</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Long strings must wrap in-place.</li>
              <li>Rows contain inline previews, badges, or metadata that changes height.</li>
              <li>You can tolerate extra measurement work and edge cases around scroll anchoring.</li>
            </ul>
          </div>
        </div>
        <p>
          Modern headless virtualizers support fixed, variable, and dynamically measured item sizes. In practice, the
          best strategy for a JSON tree is to start with a conservative size estimate and only enable measurement for
          rows that can actually grow.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <ListTree className="h-6 w-6 text-blue-500" /> A Modern Virtualizer Setup
        </h2>
        <p>
          Current headless virtualizers such as TanStack Virtual are a good fit for JSON trees because they keep the
          rendering logic separate from your markup, keyboard handling, and ARIA attributes. They also support
          dynamically measured rows when fixed sizing is not enough.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="text-lg font-medium">Typical row virtualizer wiring</h3>
          <div className="mt-3 overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>{virtualizerSnippet}</pre>
          </div>
        </div>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Use a stable item key such as node ID or canonical JSON path.</li>
          <li>Keep row components shallow so mount and unmount work stays cheap.</li>
          <li>Use modest overscan so touchpad or touch scrolling does not reveal blank gaps.</li>
          <li>When rows are measured dynamically, prefer an estimate on the larger side to reduce jumpiness.</li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <AlertTriangle className="h-6 w-6 text-amber-500" /> What Virtualization Does Not Solve
        </h2>
        <p>
          Virtualization reduces render cost. It does not make parsing, indexing, filtering, or deep cloning cheap.
          Massive JSON viewers often need extra work outside the scroll container.
        </p>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Parse large payloads off the main thread if parsing itself blocks the UI.</li>
          <li>Cache derived previews and child counts instead of recomputing them in every row render.</li>
          <li>Chunk expensive search or filter work so a single keystroke does not rebuild everything synchronously.</li>
          <li>Keep copy, inspect, and export actions attached to node IDs, not mounted DOM nodes.</li>
        </ul>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <p className="font-semibold text-amber-950 dark:text-amber-100">Do not confuse CSS containment with DOM virtualization</p>
          <p className="mt-2">
            <code>content-visibility: auto</code> can reduce paint work for off-screen content, but those nodes still
            exist in the DOM. It is useful for heavy side panels or preview sections. It is not a replacement for
            virtualizing thousands of tree rows.
          </p>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Keyboard className="h-6 w-6 text-violet-500" /> Accessibility Still Matters in a Virtualized Tree
        </h2>
        <p>
          A virtualized JSON explorer is still a tree widget. If keyboard support breaks, the component may feel fast
          but still be unusable.
        </p>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Use <code>role="tree"</code> for the container and <code>role="treeitem"</code> for each node.</li>
          <li>Wrap child collections in a <code>group</code> role when you expose nested tree semantics.</li>
          <li>Set <code>aria-expanded</code> only on parent nodes, never on leaf nodes.</li>
          <li>Support the standard arrow-key behavior, plus Home, End, and type-ahead navigation.</li>
          <li>Keep focus stable even when off-screen rows unmount, often with roving focus or <code>aria-activedescendant</code>.</li>
          <li>If the DOM no longer reflects full hierarchy, explicitly set <code>aria-level</code>, <code>aria-posinset</code>, and <code>aria-setsize</code>.</li>
        </ul>
        <p>
          This is one reason headless virtualizers work well here: you keep control of the exact tree markup instead of
          forcing a generic list abstraction onto a tree interaction model.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Common Failure Modes</h2>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Scroll jumps after expand or collapse: your measured height differs too much from the estimate.</li>
          <li>Expanding a big array freezes the UI: you are doing too much work while rebuilding visible rows.</li>
          <li>Search results lose context: matched nodes need their ancestor chain injected into the visible list.</li>
          <li>Selection disappears while scrolling: selection state is tied to mounted row components instead of node IDs.</li>
          <li>Copy buttons target the wrong value: row keys are unstable or reused across different JSON paths.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Recommended Defaults</h2>
        <ul className="list-disc space-y-2 pl-6 my-4">
          <li>Start with one-line rows and fixed height.</li>
          <li>Normalize JSON once, then rebuild only the visible row array on interaction.</li>
          <li>Use stable IDs or canonical paths everywhere: virtualization, selection, copy, and expansion.</li>
          <li>Measure only the rows that can genuinely change height.</li>
          <li>Treat accessibility and keyboard support as part of the core design, not a polish pass.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          Tree view virtualization for massive JSON works best when you stop thinking in terms of a nested DOM tree and
          start thinking in terms of a visible-row pipeline. Index the data, flatten only expanded branches, virtualize
          the resulting rows, and keep accessibility metadata explicit. That approach scales far better than trying to
          render the whole tree and hoping CSS or memoization will save it.
        </p>
      </div>
    </>
  );
}
