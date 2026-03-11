import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Auto-Save with Local Storage | Offline Tools",
  description:
    "Build reliable browser auto-save with localStorage: restore drafts, debounce writes, handle quota errors, sync tabs, and know when a server save is required.",
};

export default function AutoSaveLocalStorageArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Auto-Save Functionality with Local Storage</h1>

      <div className="space-y-6">
        <p>
          If you want users to recover a draft after a refresh, crash, or accidental tab close,{" "}
          <code>localStorage</code> is still one of the fastest ways to add auto-save. It works well for text, JSON
          input, and small form drafts because it is built into the browser and requires no backend to get started.
        </p>

        <p>
          The important boundary is this: <code>localStorage</code> is a browser-side recovery layer, not a true
          replacement for a database or web server. Use it to protect in-progress work inside the same browser. If the
          draft needs to follow the user across devices, survive browser data clearing, support collaboration, or store
          large payloads, you need server-side saving as well.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Quick Answer: Is Browser Auto-Save Enough?</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Use only localStorage</span> when the goal is simple same-browser draft
              recovery for a form, note, JSON editor, or settings screen.
            </li>
            <li>
              <span className="font-medium">Add a web-server save</span> when the draft must sync across devices,
              belong to a logged-in account, support team editing, or count as business-critical data.
            </li>
            <li>
              <span className="font-medium">Use a hybrid approach</span> for most real apps: save locally every few
              hundred milliseconds for instant recovery, and persist to the server on larger milestones such as explicit
              save, publish, step completion, or a periodic background sync.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What Matters About localStorage Today</h2>
        <p>
          A lot of auto-save examples stop at <code>setItem()</code> and <code>getItem()</code>. In practice, these
          browser details are what decide whether the feature feels reliable or brittle.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">It is small by design.</span> Current MDN guidance describes Web Storage as
              roughly 10 MiB total, commonly split as about 5 MiB for <code>localStorage</code> and 5 MiB for{" "}
              <code>sessionStorage</code> per origin. Treat that as a hard ceiling for drafts, not a target.
            </li>
            <li>
              <span className="font-medium">Writes are synchronous.</span> Large or frequent writes can block the main
              thread and make typing feel laggy. Debounce saves and keep the payload compact.
            </li>
            <li>
              <span className="font-medium">It is origin-specific.</span> <code>https://example.com</code> and{" "}
              <code>http://example.com</code> do not share the same storage. If you test across different hosts or
              protocols, drafts will not appear where you expect.
            </li>
            <li>
              <span className="font-medium">Private browsing is temporary.</span> In private or incognito windows,
              <code>localStorage</code> is cleared when the last private tab closes.
            </li>
            <li>
              <span className="font-medium">Availability can still fail.</span> Some browsers or privacy settings may
              expose the API but make writes unavailable, so production code should treat storage access as something
              that can throw.
            </li>
            <li>
              <span className="font-medium">file:// is not predictable.</span> Browser behavior for local files is not
              consistently defined. If you are testing auto-save locally, run the page behind a local web server such as{" "}
              <code>http://localhost</code> instead of opening the HTML file directly.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">A Reliable Auto-Save Flow</h2>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">Restore early.</span> Read the draft when the component mounts and validate
            the shape before trusting it.
          </li>
          <li>
            <span className="font-medium">Debounce writes.</span> Save after the user pauses typing rather than on every
            keypress.
          </li>
          <li>
            <span className="font-medium">Flush on tab hide.</span> Listen for <code>visibilitychange</code> so you can
            write one last copy when the page is backgrounded. Do not rely on <code>beforeunload</code> as your primary
            save mechanism.
          </li>
          <li>
            <span className="font-medium">Handle bad data and quota errors.</span> Corrupted JSON and storage limits are
            normal edge cases, not rare exceptions.
          </li>
          <li>
            <span className="font-medium">Decide how multiple tabs behave.</span> If the same draft can be opened in two
            tabs, listen for the <code>storage</code> event and resolve conflicts with timestamps or prompts.
          </li>
          <li>
            <span className="font-medium">Show status.</span> A small message such as &quot;Saving...&quot; or
            &quot;Saved locally&quot; makes the feature easier to trust.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Example: Auto-Saving a JSON Draft in React</h2>
        <p>
          This example is closer to what you would ship in a real editor. It restores a saved JSON draft, debounces
          writes, saves once more when the page becomes hidden, and listens for updates from another tab.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "json-formatter:draft:v2";

type Draft = {
  text: string;
  updatedAt: number;
};

function parseDraft(raw: string | null): Draft | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<Draft>;

    if (typeof parsed.text !== "string" || typeof parsed.updatedAt !== "number") {
      return null;
    }

    return { text: parsed.text, updatedAt: parsed.updatedAt };
  } catch {
    return null;
  }
}

export default function JsonDraftEditor() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Idle");
  const lastSavedAt = useRef(0);

  useEffect(() => {
    const draft = parseDraft(window.localStorage.getItem(STORAGE_KEY));
    if (!draft) return;

    setText(draft.text);
    lastSavedAt.current = draft.updatedAt;
    setStatus("Draft restored");
  }, []);

  useEffect(() => {
    if (!text) {
      window.localStorage.removeItem(STORAGE_KEY);
      setStatus("Idle");
      return;
    }

    setStatus("Saving...");

    const timeoutId = window.setTimeout(() => {
      try {
        const draft: Draft = { text, updatedAt: Date.now() };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        lastSavedAt.current = draft.updatedAt;
        setStatus("Saved locally");
      } catch (error) {
        if (error instanceof DOMException && error.name === "QuotaExceededError") {
          setStatus("Draft is too large for localStorage");
          return;
        }

        setStatus("Save failed");
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [text]);

  useEffect(() => {
    const flushOnHide = () => {
      if (document.visibilityState !== "hidden" || !text) return;

      try {
        const draft: Draft = { text, updatedAt: Date.now() };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        lastSavedAt.current = draft.updatedAt;
      } catch {
        // Ignore final-write failures here and surface errors in normal saves.
      }
    };

    document.addEventListener("visibilitychange", flushOnHide);
    return () => document.removeEventListener("visibilitychange", flushOnHide);
  }, [text]);

  useEffect(() => {
    const syncFromOtherTabs = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      const incoming = parseDraft(event.newValue);
      if (!incoming || incoming.updatedAt <= lastSavedAt.current) return;

      setText(incoming.text);
      lastSavedAt.current = incoming.updatedAt;
      setStatus("Updated from another tab");
    };

    window.addEventListener("storage", syncFromOtherTabs);
    return () => window.removeEventListener("storage", syncFromOtherTabs);
  }, []);

  return (
    <section className="space-y-3">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={12}
        placeholder='Paste or type JSON here'
        className="w-full rounded border p-3"
      />

      <p className="text-sm text-gray-600">{status}</p>
    </section>
  );
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why This Pattern Holds Up Better</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">It stores structured data.</span> Wrapping the text with an{" "}
            <code>updatedAt</code> timestamp makes tab conflict handling and debugging much easier.
          </li>
          <li>
            <span className="font-medium">It validates restored state.</span> A malformed or outdated draft should not
            crash the editor during load.
          </li>
          <li>
            <span className="font-medium">It avoids per-keystroke writes.</span> Debouncing is often the difference
            between a smooth editor and one that feels sticky on slower devices.
          </li>
          <li>
            <span className="font-medium">It respects multi-tab editing.</span> The <code>storage</code> event only
            fires in the other tabs on the same origin, which makes it useful for keeping those views in sync.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">When You Need a Real Server Save</h2>
        <p>
          Searchers looking for something like &quot;auto save webserver&quot; usually want to know whether browser
          storage is enough on its own. The practical answer is no if any of the following are true:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>The user should see the same draft after logging in from another device.</li>
            <li>The draft must survive cache clearing, browser profile changes, or device loss.</li>
            <li>The data is shared with a team, reviewed by staff, or needs an audit trail.</li>
            <li>The payload may exceed a few megabytes or include attachments.</li>
            <li>The content is important enough that losing one browser profile is unacceptable.</li>
          </ul>
        </div>

        <p>
          A solid hybrid design is to write to <code>localStorage</code> immediately for crash recovery, then send the
          draft to your API in the background on a slower cadence or when the user reaches clear checkpoints. That gives
          you fast local resilience without pretending the browser is your source of truth.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Failure Modes</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Auto-save works on localhost but not from a local file.</span> Run a local
              web server instead of opening <code>file://</code> pages directly.
            </li>
            <li>
              <span className="font-medium">The draft disappears in incognito mode.</span> That is expected when the
              private browsing session ends.
            </li>
            <li>
              <span className="font-medium">Typing gets slower as the draft grows.</span> The writes are synchronous;
              debounce more aggressively or move larger drafts to IndexedDB.
            </li>
            <li>
              <span className="font-medium">Users overwrite each other across tabs.</span> Add timestamp checks,
              prompts, or single-tab ownership for the draft key.
            </li>
            <li>
              <span className="font-medium">The saved JSON throws on restore.</span> Catch parse errors and clear or
              migrate invalid drafts instead of failing the entire page.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementation Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use a versioned storage key such as <code>json-formatter:draft:v2</code>.</li>
          <li>Keep only the minimum data needed to restore the editor.</li>
          <li>Debounce saves and show save status in the UI.</li>
          <li>Catch <code>JSON.parse()</code> failures and <code>QuotaExceededError</code>.</li>
          <li>Assume storage access can fail and keep a fallback path for critical drafts.</li>
          <li>Test in a real browser origin such as <code>http://localhost</code> or production HTTPS.</li>
          <li>Do not store secrets, tokens, or sensitive personal data in <code>localStorage</code>.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Auto-save with <code>localStorage</code> is best treated as fast local draft recovery. It is excellent for
          JSON editors, forms, and notes where users mainly need protection from refreshes and crashes inside the same
          browser. Build it with debounced writes, validation, visibility-based flushing, and multi-tab awareness, then
          add server-side persistence when the draft needs to become durable beyond that browser session.
        </p>
      </div>
    </>
  );
}
