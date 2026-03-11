import type { Metadata } from "next";
import { AlertCircle, Database, Eye, FolderTree, List, ScrollText, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Viewport-Based Rendering for Large JSON Trees | Offline Tools",
  description:
    "Learn how to virtualize large JSON trees: flatten expanded nodes, measure dynamic row heights, keep scrolling stable, and preserve accessible keyboard navigation.",
};

const flattenSnippet = `type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

type VisibleNode = {
  id: string;
  depth: number;
  label: string;
  kind: "object" | "array" | "string" | "number" | "boolean" | "null";
  expandable: boolean;
  expanded: boolean;
  preview: string;
};

function flattenVisibleTree(value: JsonValue, expanded: Set<string>): VisibleNode[] {
  const rows: VisibleNode[] = [];

  function visit(node: JsonValue, id: string, depth: number, label: string) {
    const isArray = Array.isArray(node);
    const isObject = typeof node === "object" && node !== null && !isArray;
    const kind = isArray ? "array" : isObject ? "object" : node === null ? "null" : typeof node;
    const expandable = isArray || isObject;
    const expandedHere = expandable && expanded.has(id);

    rows.push({
      id,
      depth,
      label,
      kind,
      expandable,
      expanded: expandedHere,
      preview: isArray
        ? "[...]"
        : isObject
          ? "{...}"
          : String(node),
    });

    if (!expandedHere) return;

    if (isArray) {
      node.forEach((child, index) => {
        visit(child, id + "/" + index, depth + 1, String(index));
      });
      return;
    }

    if (isObject) {
      Object.entries(node).forEach(([key, child]) => {
        visit(child, id + "/" + key, depth + 1, key);
      });
    }
  }

  visit(value, "root", 0, "root");
  return rows;
}`;

const virtualizerSnippet = `const rowVirtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 28,
  overscan: 10,
});

return (
  <div ref={containerRef} style={{ height: 560, overflow: "auto" }}>
    <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
      {rowVirtualizer.getVirtualItems().map((item) => {
        const row = rows[item.index];

        return (
          <div
            key={row.id}
            data-index={item.index}
            ref={rowVirtualizer.measureElement}
            style={{
              position: "absolute",
              transform: "translateY(" + item.start + "px)",
              width: "100%",
            }}
          >
            <TreeRow row={row} />
          </div>
        );
      })}
    </div>
  </div>
);`;

export default function ViewportBasedJsonTreeRendering() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Eye className="w-8 h-8" />
        <span>Viewport-Based Rendering for Large JSON Trees</span>
      </h1>

      <div className="space-y-6">
        <p>
          If your JSON viewer freezes when a user expands a large object or a long array, the usual problem is simple:
          the UI is trying to mount every visible node at once. <strong>Viewport-based rendering</strong>, also called
          windowing or virtualization, fixes that by rendering only the rows near the current scroll position while the
          rest of the tree stays as lightweight data.
        </p>

        <p>
          For JSON trees, the hard part is not the scroll container. It is keeping a flattened list of expanded nodes,
          handling variable row heights, and preserving usable keyboard navigation while rows are constantly mounting and
          unmounting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Database className="w-6 h-6" />
          <span>Why Large JSON Trees Break So Easily</span>
        </h2>
        <p>
          A naive tree renderer walks the JSON object recursively and creates a DOM element for every expanded property
          and array item. That works for small payloads, but it falls apart once one expand action reveals hundreds or
          thousands of rows.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Zap className="inline-block mr-2 w-4 h-4 text-yellow-500" />
            <strong>Initial expand cost spikes:</strong> the browser has to create, style, and lay out too many nodes
            in one frame.
          </li>
          <li>
            <List className="inline-block mr-2 w-4 h-4 text-red-500" />
            <strong>Memory usage climbs:</strong> every mounted row adds DOM overhead, event handling, and layout work.
          </li>
          <li>
            <ScrollText className="inline-block mr-2 w-4 h-4 text-blue-500" />
            <strong>Scrolling gets janky:</strong> the browser keeps repainting a very tall, very busy tree instead of a
            small moving window.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Eye className="w-6 h-6" />
          <span>What Actually Gets Virtualized</span>
        </h2>
        <p>
          You do <strong>not</strong> virtualize the nested JSON structure directly. You virtualize a flat array of{" "}
          <strong>currently visible rows</strong>. Each row represents one node in the expanded tree and carries enough
          metadata to render it correctly.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Keep the original JSON data untouched.</li>
          <li>Track expansion state separately, usually in a set keyed by stable node IDs.</li>
          <li>Flatten only the nodes that should currently appear on screen.</li>
          <li>Give that flat list to a virtualizer that decides which indexes to mount.</li>
          <li>Render those rows with indentation, toggles, previews, and ARIA state.</li>
        </ol>
        <p>
          In practice, the stable ID matters more than most teams expect. A JSON Pointer style path such as{" "}
          <code>root/users/42/email</code> is much safer than a transient UI index because expansion state, search
          results, and scroll restoration all depend on it.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Flatten Only Expanded Nodes</h3>
          <pre>{flattenSnippet}</pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FolderTree className="w-6 h-6" />
          <span>A Practical Rendering Pattern</span>
        </h2>
        <p>
          A scalable JSON tree usually follows this flow:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Derive a flat visible-row array from the JSON data and the current expansion set.</li>
          <li>Pass that row count to the virtualizer.</li>
          <li>Render only the returned virtual rows inside one spacer element whose height matches the full tree.</li>
          <li>Indent rows from their depth value instead of nesting DOM containers for every branch.</li>
          <li>Update expansion state without recreating unrelated rows when possible.</li>
        </ul>
        <p>
          This keeps the DOM size tied to the viewport, not to the total number of expanded nodes. That is the core
          win.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium">Virtualize the Flat Row List</h3>
          <pre>{virtualizerSnippet}</pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Zap className="w-6 h-6" />
          <span>Current Implementation Notes</span>
        </h2>
        <p>
          Current virtualizer libraries are better at dynamic content than the older fixed-row approach, but JSON trees
          still need explicit guardrails.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Start with an estimate, then measure:</strong> current TanStack Virtual APIs support estimated row
            sizes and on-mount measurement through helpers such as <code>measureElement</code>. That is usually the
            right fit for JSON rows whose height changes with wrapping, inline previews, or badges.
          </li>
          <li>
            <strong>Keep overscan modest:</strong> a small buffer above and below the viewport smooths wheel and
            keyboard navigation, but too much overscan recreates the DOM pressure you were trying to remove.
          </li>
          <li>
            <strong>Expect scroll compensation work:</strong> expanding a node above the viewport changes total height.
            If the virtualizer adjusts for that change, scroll position feels stable. If it does not, the tree appears
            to jump.
          </li>
          <li>
            <strong>Use CSS helpers as a complement, not a replacement:</strong> <code>content-visibility: auto</code>
            can reduce paint and layout work for off-screen content, but the off-screen nodes still exist in the DOM, so
            it does not solve the core node-count problem that virtualization solves.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertCircle className="w-6 h-6" />
          <span>Common Failure Modes</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Expand is still slow:</strong> flattening the visible tree on every toggle can become the next
            bottleneck. Cache descendant ranges or update only the affected slice when extremely large branches open.
          </li>
          <li>
            <strong>Rows jump after measuring:</strong> mixed-height content needs a realistic size estimate. If your
            first estimate is far from the measured size, users will feel that correction.
          </li>
          <li>
            <strong>Search feels broken:</strong> browser find-in-page only sees mounted DOM rows. Large virtual trees
            usually need their own search index plus a way to expand and scroll to the matching node.
          </li>
          <li>
            <strong>Selection disappears while scrolling:</strong> keep focus state separate from DOM presence and
            restore it when the selected row remounts.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <List className="w-6 h-6" />
          <span>Accessibility Checklist for a Virtual Tree</span>
        </h2>
        <p>
          A large JSON tree is still a tree widget, even when most rows are not mounted. If you want reliable keyboard
          and screen-reader behavior, implement the semantics deliberately instead of treating the widget as a styled
          list.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use tree semantics such as <code>tree</code>, <code>treeitem</code>, and grouped child containers.</li>
          <li>Expose expansion state with <code>aria-expanded</code> on expandable rows.</li>
          <li>Support the expected arrow-key model: up, down, left, right, home, and end.</li>
          <li>
            Keep a logical focused item even when the DOM row unmounts, often with roving tab index or{" "}
            <code>aria-activedescendant</code>.
          </li>
          <li>Announce depth, position, and collapsed or expanded state in the rendered row label.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FolderTree className="w-6 h-6" />
          <span>When Viewport-Based Rendering Is Worth It</span>
        </h2>
        <p>
          Use it when one realistic user action can reveal far more rows than the screen can display, or when you need
          smooth navigation through logs, configs, traces, or API payloads that routinely grow into the thousands.
        </p>
        <p>
          If your viewer only handles a few hundred fixed-height rows, plain rendering is often simpler and easier to
          debug. Virtualization adds coordination cost, so it should buy you a real performance margin.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Eye className="w-6 h-6" />
          <span>Bottom Line</span>
        </h2>
        <p>
          The winning approach for large JSON trees is consistent across frameworks: flatten the expanded tree into
          stable row data, virtualize that flat list, measure dynamic heights carefully, and treat accessibility as a
          first-class requirement. Once you do that, a JSON viewer can stay fast even when the underlying payload is not
          small or polite.
        </p>
      </div>
    </>
  );
}
