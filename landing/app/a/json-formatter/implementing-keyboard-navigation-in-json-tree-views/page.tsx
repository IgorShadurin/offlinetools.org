import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Keyboard Navigation in JSON Tree Views | Offline Tools",
  description:
    "Build accessible keyboard navigation for JSON tree views with current WAI-ARIA key bindings, focus management, and a practical React example.",
};

export default function KeyboardNavigationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Keyboard Navigation in JSON Tree Views</h1>

      <div className="space-y-6">
        <p>
          A JSON tree view is a composite widget, not just a nested list with click handlers. If you want keyboard users
          to move through objects, arrays, and values efficiently, the tree needs one predictable tab stop, arrow-key
          navigation inside the widget, correct ARIA, and a clear distinction between focus and selection.
        </p>
        <p>
          Current guidance from the WAI-ARIA Authoring Practices tree view pattern and MDN still expects the same core
          behavior in March 2026: <code>Right Arrow</code> opens or enters a branch, <code>Left Arrow</code> closes or
          moves to the parent, <code>Home</code> and <code>End</code> jump to the first and last visible node, and
          type-ahead is recommended for larger trees. If your JSON viewer does not implement that contract, it will feel
          broken to keyboard and assistive-technology users.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-lg font-medium">
            Before You Reach For <code>role=&quot;tree&quot;</code>
          </h2>
          <p className="mt-2">
            Use a real tree only when users need desktop-style navigation inside a hierarchical widget. If your JSON
            page simply expands and collapses sections, a disclosure pattern with buttons is often easier to build and
            easier for web users to understand. MDN explicitly warns that tree views behave more like native apps than
            ordinary web content.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Users Expect From a Tree</h2>
        <p>
          The keyboard model should match the current WAI-ARIA tree pattern. A JSON inspector that only handles
          {" "}
          <code>ArrowUp</code> and <code>ArrowDown</code> misses important behavior.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="py-2 pr-4 font-semibold">Key</th>
                <th className="py-2 font-semibold">Expected behavior in a JSON tree</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4 align-top">
                  <code>Tab</code> / <code>Shift+Tab</code>
                </td>
                <td className="py-2">Moves into or out of the tree. Only one tree item should be in the tab order.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4 align-top">
                  <code>ArrowDown</code> / <code>ArrowUp</code>
                </td>
                <td className="py-2">Moves to the next or previous visible node without expanding or collapsing.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4 align-top">
                  <code>ArrowRight</code>
                </td>
                <td className="py-2">
                  On a closed parent node, expand it. On an open parent node, move to its first child. On a leaf node,
                  do nothing.
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4 align-top">
                  <code>ArrowLeft</code>
                </td>
                <td className="py-2">
                  On an open parent node, collapse it. On a closed node or leaf, move to the parent if one exists.
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4 align-top">
                  <code>Home</code> / <code>End</code>
                </td>
                <td className="py-2">Jump to the first or last visible node.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4 align-top">
                  <code>Enter</code> / <code>Space</code>
                </td>
                <td className="py-2">
                  Activate the focused node. In a read-only JSON viewer, that usually means toggling expansion for
                  branches and optionally selecting or copying a leaf value.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 align-top">Printable characters</td>
                <td className="py-2">
                  Type-ahead is recommended, especially once the tree has more than a handful of root items.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The State Model That Keeps Navigation Predictable</h2>
        <p>
          The easiest way to avoid edge-case bugs is to treat keyboard navigation as derived state, not ad-hoc DOM
          traversal. A practical JSON tree usually needs:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            A normalized node map with stable IDs, parent IDs, labels, levels, and child IDs.
          </li>
          <li>
            An <code>expandedIds</code> set so you can derive which nodes are currently visible.
          </li>
          <li>
            An <code>activeId</code> for keyboard focus and, if selection matters, a separate{" "}
            <code>selectedId</code> or <code>selectedIds</code>.
          </li>
          <li>
            A depth-first <code>visibleIds</code> array so <code>ArrowUp</code>, <code>ArrowDown</code>,
            <code>Home</code>, and <code>End</code> are trivial.
          </li>
          <li>
            A ref map from node ID to DOM element so focus can move without querying the whole document every time.
          </li>
          <li>
            A short-lived type-ahead buffer if users need to jump to property names quickly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Implementation Example in React</h2>
        <p>
          In React, a roving <code>tabIndex</code> model is often the simplest place to start: only the active tree
          item gets <code>tabIndex=0</code>, every other item gets <code>-1</code>, and the active item receives DOM
          focus when <code>activeId</code> changes. The code below shows the core pattern.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Practical Tree Skeleton (React/TSX)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import React, { useEffect, useMemo, useRef, useState } from 'react';

type TreeNode = {
  id: string;
  label: string;
  level: number;
  parentId: string | null;
  childIds: string[];
  valuePreview: string;
};

type Props = {
  nodes: Map<string, TreeNode>;
  rootIds: string[];
};

export function JsonTree({ nodes, rootIds }: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(rootIds));
  const [activeId, setActiveId] = useState<string | null>(rootIds[0] ?? null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const typeaheadRef = useRef<{ value: string; timeout?: number }>({ value: '' });

  const visibleIds = useMemo(
    () => buildVisibleIds(rootIds, nodes, expandedIds),
    [rootIds, nodes, expandedIds],
  );

  useEffect(() => {
    if (!activeId) return;
    const element = itemRefs.current.get(activeId);
    element?.focus();
    element?.scrollIntoView({ block: 'nearest' });
  }, [activeId]);

  const isExpanded = (id: string) => expandedIds.has(id);

  const toggleExpanded = (id: string) => {
    setExpandedIds((previous) => {
      const next = new Set(previous);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const moveByOffset = (offset: number) => {
    if (!activeId) return;
    const currentIndex = visibleIds.indexOf(activeId);
    const nextId = visibleIds[currentIndex + offset];
    if (nextId) setActiveId(nextId);
  };

  const runTypeahead = (character: string) => {
    const buffer = (typeaheadRef.current.value + character).toLowerCase();
    typeaheadRef.current.value = buffer;
    window.clearTimeout(typeaheadRef.current.timeout);
    typeaheadRef.current.timeout = window.setTimeout(() => {
      typeaheadRef.current.value = '';
    }, 500);

    const startIndex = activeId ? visibleIds.indexOf(activeId) + 1 : 0;
    const searchOrder = [...visibleIds.slice(startIndex), ...visibleIds.slice(0, startIndex)];
    const match = searchOrder.find((id) => nodes.get(id)?.label.toLowerCase().startsWith(buffer));
    if (match) setActiveId(match);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (!activeId) return;

    const node = nodes.get(activeId)!;
    const parentId = node.parentId;
    const firstChildId = node.childIds[0];
    const hasChildren = node.childIds.length > 0;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveByOffset(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveByOffset(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (!hasChildren) break;
        if (!isExpanded(node.id)) toggleExpanded(node.id);
        else if (firstChildId) setActiveId(firstChildId);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (hasChildren && isExpanded(node.id)) toggleExpanded(node.id);
        else if (parentId) setActiveId(parentId);
        break;
      case 'Home':
        event.preventDefault();
        setActiveId(visibleIds[0] ?? activeId);
        break;
      case 'End':
        event.preventDefault();
        setActiveId(visibleIds.at(-1) ?? activeId);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (hasChildren) toggleExpanded(node.id);
        else setSelectedId(node.id);
        break;
      default:
        if (event.key.length === 1 && /\\S/.test(event.key)) runTypeahead(event.key);
    }
  };

  const renderNode = (id: string): React.ReactNode => {
    const node = nodes.get(id)!;
    const hasChildren = node.childIds.length > 0;
    const expanded = isExpanded(id);

    return (
      <li
        key={id}
        ref={(element) => {
          if (element) itemRefs.current.set(id, element);
          else itemRefs.current.delete(id);
        }}
        role='treeitem'
        tabIndex={activeId === id ? 0 : -1}
        aria-level={node.level}
        aria-selected={selectedId === id ? true : undefined}
        aria-expanded={hasChildren ? expanded : undefined}
        onClick={() => setActiveId(id)}
        className={activeId === id ? 'outline outline-2 outline-sky-600' : undefined}
      >
        <span className='font-medium'>{node.label}</span>{' '}
        <span className='text-gray-500'>{node.valuePreview}</span>

        {hasChildren && expanded ? (
          <ul role='group' className='pl-4'>
            {node.childIds.map(renderNode)}
          </ul>
        ) : null}
      </li>
    );
  };

  return (
    <ul role='tree' aria-label='JSON document structure' onKeyDown={onKeyDown}>
      {rootIds.map(renderNode)}
    </ul>
  );
}

function buildVisibleIds(
  rootIds: string[],
  nodes: Map<string, TreeNode>,
  expandedIds: Set<string>,
) {
  const visible: string[] = [];

  const visit = (id: string) => {
    visible.push(id);
    if (!expandedIds.has(id)) return;
    nodes.get(id)?.childIds.forEach(visit);
  };

  rootIds.forEach(visit);
  return visible;
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This example keeps the keyboard logic in one place, derives visible nodes from expansion state, moves real
            DOM focus onto the active tree item, and omits <code>aria-expanded</code> on leaf nodes. That combination
            aligns with current APG and MDN tree guidance far better than attaching a few independent key handlers to
            nested list items.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Roving `tabIndex` vs `aria-activedescendant`</h2>
        <p>
          Both approaches are valid. The WAI-ARIA tree pattern explicitly allows <code>aria-activedescendant</code> on
          the tree container as an alternative to moving DOM focus between items.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Roving `tabIndex`:</span> Simpler to reason about when every visible tree
              item already exists in the DOM. Browser focus lands on the actual node, which makes debugging and focus
              styling straightforward.
            </li>
            <li>
              <span className="font-medium">`aria-activedescendant`:</span> Useful when focus must stay on the tree
              container or another controlling element, but you must keep IDs stable and ensure the active descendant
              always points to a rendered node.
            </li>
            <li>
              <span className="font-medium">Practical default:</span> For most React JSON viewers, start with roving
              <code>tabIndex</code>. Move to <code>aria-activedescendant</code> only if your widget architecture
              strongly benefits from container-level focus.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Common Bugs and Edge Cases</h2>
        <p>Most broken tree views fail on the same small set of details:</p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Putting every node in the tab order. A tree should behave like one composite widget, not 50 independent tab
            stops.
          </li>
          <li>
            Mixing focus and selection. A focused node is where keyboard input goes. A selected node is what the app has
            chosen. These are not always the same thing.
          </li>
          <li>
            Setting <code>aria-expanded</code> on leaves. Only nodes with children should expose expanded or collapsed
            state.
          </li>
          <li>
            Collapsing a branch while focus is still inside a hidden descendant. If the current node disappears, move
            focus to the collapsing parent immediately.
          </li>
          <li>
            Forgetting an accessible name on the tree itself. Add <code>aria-label</code> or{" "}
            <code>aria-labelledby</code>.
          </li>
          <li>
            Virtualizing or lazy-loading descendants without supplying <code>aria-level</code>,
            <code>aria-posinset</code>, and <code>aria-setsize</code> when the full branch is not in the DOM.
          </li>
          <li>
            Overriding the focus ring with subtle styling. Keyboard focus must stay obvious in normal, dark, and
            high-contrast modes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Testing Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Press <code>Tab</code> once to enter the tree and once more to leave it. If you need many tabs to cross the
            widget, the focus model is wrong.
          </li>
          <li>
            Verify <code>ArrowUp</code>, <code>ArrowDown</code>, <code>ArrowLeft</code>, and{" "}
            <code>ArrowRight</code> do not scroll the page while the tree has focus.
          </li>
          <li>
            Confirm that collapsing a parent keeps focus on a visible item and that expanding a node preserves the
            correct reading order.
          </li>
          <li>
            Test with a screen reader and check that level, expanded state, and selection state are announced
            accurately.
          </li>
          <li>
            If the tree is large, verify that type-ahead jumps to the next matching property name instead of always
            restarting from the top.
          </li>
          <li>
            Make sure mouse clicks, touch interaction, and keyboard navigation all update the same active node state.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          A usable JSON tree view is mostly about discipline: derive a visible-node list, keep one active item in the
          tab order, implement the full arrow-key contract, and expose the right ARIA states. If you do that, keyboard
          navigation becomes predictable instead of fragile.
        </p>
        <p>
          For current reference material, review the{" "}
          <a
            href="https://www.w3.org/WAI/ARIA/apg/patterns/treeview/"
            className="underline"
          >
            WAI-ARIA Authoring Practices tree view pattern
          </a>{" "}
          and MDN&apos;s{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tree_role"
            className="underline"
          >
            `tree` role guide
          </a>
          . Those documents are the clearest source of truth for expected behavior.
        </p>
      </div>
    </>
  );
}
