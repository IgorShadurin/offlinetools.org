import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Tabs for Multiple JSON Documents in React | Offline Tools",
  description:
    "Build an accessible tab interface for multiple JSON documents with React, including keyboard support, validation, persistence, and performance guidance.",
};

export default function ImplementingJsonTabsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Tabs for Multiple JSON Documents</h1>

      <div className="space-y-6">
        <p>
          Opening several JSON payloads in one tool sounds simple until users start comparing API responses, editing
          drafts, or checking one config file against another. A useful tab system has to preserve document state,
          expose validation errors per tab, and let people move between documents without losing context.
        </p>

        <p>
          The safest approach is to treat tabs as two problems: accessible navigation and JSON-specific workflow. Build
          the tab pattern correctly first, then add features such as dirty-state badges, draft persistence, and
          large-file safeguards so the interface still feels solid after the second or third document opens.
        </p>

        <h2 className="text-2xl font-semibold mt-8">When Tabs Are the Right Pattern</h2>
        <p>
          Tabs work well when one JSON document is the main focus at a time and the user mostly needs quick switching,
          not simultaneous visibility. They are a strong fit for:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Comparing successive API responses while keeping the workspace in a single view.</li>
            <li>Editing a request body, sample response, and schema without opening multiple browser windows.</li>
            <li>Keeping environment-specific config files nearby during debugging.</li>
            <li>Reviewing imported JSON files one by one before formatting, validating, or transforming them.</li>
          </ul>
        </div>

        <p>
          If users need to see two documents at the same time, add a split view or diff mode. Tabs are for fast
          context switching, not side-by-side analysis.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Accessibility Rules to Get Right First</h2>
        <p>
          If only one panel is shown at a time, follow the WAI-ARIA tabs pattern instead of styling a row of generic
          buttons and hoping screen readers infer the structure. A solid baseline includes:
        </p>

        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">
            A tab container with <code>role=&quot;tablist&quot;</code> and a clear accessible label.
          </li>
          <li className="font-medium">
            One interactive element per tab with <code>role=&quot;tab&quot;</code>,{" "}
            <code>aria-selected</code>, and a programmatic link to its panel.
          </li>
          <li className="font-medium">
            A visible panel with <code>role=&quot;tabpanel&quot;</code> linked back to the active tab via{" "}
            <code>aria-labelledby</code>.
          </li>
          <li className="font-medium">
            Keyboard support for Left and Right Arrow, Home, End, and activation by Enter or Space.
          </li>
          <li className="font-medium">
            Roving focus so the selected tab stays in the normal tab order while inactive tabs use{" "}
            <code>tabIndex=&#123;-1&#125;</code>.
          </li>
        </ol>

        <p>
          Manual activation is often the best default for JSON tools: arrow keys move focus across the tab strip, and
          Enter or Space opens the focused document. That avoids expensive re-renders when each panel contains a large
          editor, formatter, or tree viewer. Automatic activation is fine when switching panels is effectively
          instant.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Use a Tab Model That Can Carry Document State</h2>
        <p>
          A simple <code>activeTabId</code> is not enough once users can edit data. Each tab should store the document
          state that needs to survive switching:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Stable ID:</span> Use a real document ID, file hash, or generated draft ID.
              Do not rely on the array index for keys or ARIA relationships.
            </li>
            <li>
              <span className="font-medium">Title:</span> File name, endpoint name, or a user-editable label.
            </li>
            <li>
              <span className="font-medium">Raw value:</span> The current JSON string, even when it is temporarily
              invalid.
            </li>
            <li>
              <span className="font-medium">Validation state:</span> Store parse errors per tab so one broken document
              does not block the rest of the workspace.
            </li>
            <li>
              <span className="font-medium">Dirty status:</span> Track whether the document changed since the last save,
              import, or formatting step.
            </li>
          </ul>
        </div>

        <p>
          In React, keep those stable IDs in your data. The current React guidance is to use <code>useId</code> for
          accessibility relationships when needed, not as a replacement for list keys that should come from the data
          itself.
        </p>

        <h2 className="text-2xl font-semibold mt-8">React Example: Accessible Tabs for Multiple JSON Documents</h2>
        <p>
          This example uses manual activation, validates each document independently, and keeps the active editor bound
          to the selected tab. It is intentionally small, but the structure scales to add close buttons, duplication,
          import actions, or persisted drafts.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Client Component Example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`'use client';

import { type KeyboardEvent, useRef, useState } from 'react';

type JsonTab = {
  id: string;
  title: string;
  value: string;
  dirty: boolean;
  error: string | null;
};

const initialTabs: JsonTab[] = [
  {
    id: 'request-body',
    title: 'Request Body',
    value: '{\\n  "userId": 42,\\n  "includePosts": true\\n}',
    dirty: false,
    error: null,
  },
  {
    id: 'response-preview',
    title: 'Response Preview',
    value: '{\\n  "ok": true,\\n  "count": 3\\n}',
    dirty: false,
    error: null,
  },
];

function validateJson(value: string) {
  try {
    JSON.parse(value);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : 'Invalid JSON';
  }
}

export default function JsonTabs() {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeId, setActiveId] = useState(initialTabs[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = tabs.findIndex((tab) => tab.id === activeId);
  const activeTab = tabs[activeIndex];

  function focusTab(index: number) {
    tabRefs.current[index]?.focus();
  }

  function activateTab(tabId: string) {
    setActiveId(tabId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab((index + 1) % tabs.length);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab((index - 1 + tabs.length) % tabs.length);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusTab(tabs.length - 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateTab(tabs[index].id);
    }
  }

  function updateTab(tabId: string, nextValue: string) {
    setTabs((currentTabs) =>
      currentTabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              value: nextValue,
              dirty: true,
              error: validateJson(nextValue),
            }
          : tab
      )
    );
  }

  return (
    <section>
      <div role="tablist" aria-label="Open JSON documents" className="flex gap-2 border-b pb-2">
        {tabs.map((tab, index) => {
          const isSelected = tab.id === activeId;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tab.id + '-tab'}
              role="tab"
              type="button"
              tabIndex={isSelected ? 0 : -1}
              aria-selected={isSelected}
              aria-controls={tab.id + '-panel'}
              onClick={() => activateTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={isSelected ? 'rounded-t border px-3 py-2 font-medium' : 'px-3 py-2 text-slate-600'}
            >
              {tab.title}
              {tab.dirty ? ' *' : ''}
            </button>
          );
        })}
      </div>

      <div
        id={activeTab.id + '-panel'}
        role="tabpanel"
        aria-labelledby={activeTab.id + '-tab'}
        className="mt-4 space-y-3"
      >
        <textarea
          value={activeTab.value}
          spellCheck={false}
          onChange={(event) => updateTab(activeTab.id, event.target.value)}
          className="min-h-72 w-full rounded border p-3 font-mono text-sm"
        />

        <p role="status" className={activeTab.error ? 'text-red-600' : 'text-emerald-700'}>
          {activeTab.error ? 'Invalid JSON: ' + activeTab.error : 'Valid JSON'}
        </p>
      </div>
    </section>
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The important pieces are the per-tab state, the keyboard handler for roving focus, and the explicit ARIA
            links between each tab and its panel.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">JSON-Specific Features Worth Adding Early</h2>
        <p>
          Once the tab pattern works, the biggest usability gains come from features specific to JSON editing rather
          than from visual polish:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Validation per tab:</span> Show parse errors next to the tab title or in a
              status line so users can find the broken document immediately.
            </li>
            <li>
              <span className="font-medium">Format on demand:</span> Pretty-print only when the JSON parses
              successfully, and avoid rewriting the text area on every keystroke.
            </li>
            <li>
              <span className="font-medium">Unsaved-change indicators:</span> Mark dirty tabs before allowing close,
              replace, or reset actions.
            </li>
            <li>
              <span className="font-medium">Restore drafts locally:</span> Use <code>sessionStorage</code> for
              short-lived sessions or <code>localStorage</code> if users expect drafts to survive a restart.
            </li>
            <li>
              <span className="font-medium">Safe import behavior:</span> When a user drops or uploads a new file, open
              it in a new tab instead of overwriting the current document unexpectedly.
            </li>
            <li>
              <span className="font-medium">Private by default:</span> JSON often contains tokens, emails, or internal
              IDs, so keep drafts on-device unless the user explicitly chooses to sync or upload them.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Performance Tips for Large Documents</h2>
        <p>
          Tabs usually fail under load for avoidable reasons. The common problem is doing too much work every time the
          active editor changes or every time a user types a character.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Debounce expensive parsing, formatting, or schema validation once documents reach hundreds of KB.</li>
          <li>Keep only the active editor mounted if each tab hosts a heavy code editor or tree viewer.</li>
          <li>Cache derived views such as parsed objects or tree nodes by tab ID instead of recomputing everything.</li>
          <li>Move very large formatting or diff work to a Web Worker so the tab strip stays responsive.</li>
          <li>Preserve cursor and scroll position per tab so switching documents does not feel destructive.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Common Failure Case</h3>
          <p className="mt-2">
            Reformatting JSON on every keystroke looks impressive in a demo, but it often breaks cursor position,
            increases input latency, and makes partially typed JSON impossible to edit comfortably. Validate
            continuously if you want, but reserve full formatting for an explicit action or a short debounce.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>If arrow keys do nothing, confirm the tab elements really have focus and handle keyboard events.</li>
          <li>If screen readers do not announce the relationship, verify the tab and panel IDs match exactly.</li>
          <li>If the wrong panel opens after closing a tab, store the active tab by stable ID, not by array index.</li>
          <li>If users lose work after refresh, persist only the raw tab data and recreate derived parse state later.</li>
          <li>If many tabs share the same file name, add a source label or path hint so the strip remains readable.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing tabs for multiple JSON documents is less about the visual tab strip and more about preserving a
          trustworthy editing workflow. Start with the ARIA tab pattern, keep document state per tab, and design for
          invalid JSON and unsaved edits from the beginning.
        </p>
        <p>
          Once that foundation is in place, you can add niceties such as drag-and-drop import, duplicate tab actions,
          and compare mode without rewriting the core interaction model.
        </p>
      </div>
    </>
  );
}
