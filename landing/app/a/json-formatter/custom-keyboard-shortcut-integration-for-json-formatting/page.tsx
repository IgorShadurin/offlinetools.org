import type { Metadata } from "next";
import {
  Keyboard,
  Code,
  FileJson2,
  Zap,
  Info,
  AlertTriangle,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Keyboard Shortcuts for JSON Formatting | React and Browser Guide",
  description:
    "Implement JSON formatting hotkeys in a web editor with practical React examples, safer shortcut choices, IME handling, accessibility guidance, and troubleshooting.",
};

export default function JsonFormattingShortcutArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Keyboard className="size-8" />
        Custom Keyboard Shortcuts for JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          A good JSON formatting shortcut should feel instant, predictable, and hard to trigger by accident. In
          practice, that means wiring the shortcut to the same formatter logic as your visible button, scoping it to
          the editor when possible, and avoiding browser or operating-system shortcuts that users already expect to do
          something else.
        </p>
        <p>
          For most web apps, the cleanest solution is a focused-editor shortcut such as <code>Ctrl + Enter</code> on
          Windows and Linux and <code>Cmd + Enter</code> on macOS. You can still support a more IDE-like combination if
          your audience expects it, but the implementation needs a few production checks that simple demo code usually
          skips.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="size-6" />
          Pick the Shortcut Before You Code
        </h2>
        <p>
          The biggest integration mistake is choosing a key combination first and only later discovering that the
          browser, the OS, an assistive-technology tool, or your embedded editor already uses it. Decide the scope and
          fallback behavior up front.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Prefer a shortcut that works only while the JSON input is focused. That avoids surprising global behavior.
          </li>
          <li>
            Keep a visible <code>Format JSON</code> button so mouse, touch, and screen-reader users are not forced to
            memorize a hotkey.
          </li>
          <li>
            Treat <code>Ctrl/Cmd + Enter</code> as a safe default for a focused editor. It rarely conflicts with major
            browser commands.
          </li>
          <li>
            Use <code>Ctrl/Cmd + Shift + F</code> only if your audience already expects a format command and you have
            tested the full browser and extension context you support.
          </li>
          <li>
            Avoid well-known browser or window-management shortcuts such as <code>Ctrl/Cmd + P</code>,{" "}
            <code>Ctrl/Cmd + L</code>, <code>Ctrl/Cmd + R</code>, and <code>Ctrl/Cmd + W</code>.
          </li>
        </ul>
        <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Info className="size-4" /> If you let users remap the shortcut, store both the binding and a human-readable
          label. Do not assume a physical key such as <code>KeyF</code> should always be shown as "F" on every
          keyboard layout.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6" />
          Use the Right Keyboard Event Checks
        </h2>
        <p>
          In browser UIs, <code>keydown</code> is the correct event for command shortcuts. It fires early enough to
          stop the default browser action, and it gives you the modifier state on the same event object.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>event.key</code> when the shortcut should follow the user&apos;s keyboard layout.
          </li>
          <li>
            Use <code>event.code</code> only when you intentionally want the physical key position instead of the typed
            character.
          </li>
          <li>
            Check <code>event.ctrlKey || event.metaKey</code> so the same handler works across Windows, Linux, and
            macOS.
          </li>
          <li>
            Ignore <code>event.repeat</code> so holding the keys does not format the same payload over and over.
          </li>
          <li>
            Skip events while text is being composed with an IME by checking <code>event.isComposing</code> and, for
            older edge cases, <code>keyCode === 229</code>.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Shortcut Guard</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function isFormatShortcut(event) {
  if (event.isComposing || event.keyCode === 229) return false;
  if (event.repeat) return false;

  const primaryModifier = event.ctrlKey || event.metaKey;
  return primaryModifier && event.key === "Enter";
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Keyboard className="size-6" />
          React Example: Focused Textarea Shortcut
        </h2>
        <p>
          If your JSON input is a plain <code>textarea</code>, attach the shortcut directly to that element. This is
          simpler than a document-wide listener and usually gives the best UX because the command only works when the
          editor has focus.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Client Component Example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`"use client";

import { useState } from "react";

function formatJson(source, indent = 2) {
  const parsed = JSON.parse(source);
  return JSON.stringify(parsed, null, indent);
}

export function JsonEditor() {
  const [value, setValue] = useState('{"service":"offline","enabled":true,"ports":[80,443]}');
  const [error, setError] = useState("");

  function runFormat() {
    try {
      setValue((current) => formatJson(current));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  }

  function handleKeyDown(event) {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.repeat) return;

    const primaryModifier = event.ctrlKey || event.metaKey;
    const wantsFormat = primaryModifier && event.key === "Enter";

    if (!wantsFormat) return;

    event.preventDefault();
    runFormat();
  }

  return (
    <div>
      <label htmlFor="json-input">JSON input</label>
      <textarea
        id="json-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-keyshortcuts="Control+Enter Meta+Enter"
      />

      <button type="button" onClick={runFormat}>
        Format JSON
      </button>

      <p>Shortcut: Ctrl+Enter on Windows/Linux, Cmd+Enter on macOS</p>
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}`}
            </pre>
          </div>
        </div>
        <p>
          The important detail is that the button and the keyboard handler both call the same <code>runFormat</code>{" "}
          function. That keeps validation, error handling, analytics, and undo behavior aligned instead of creating a
          second code path just for hotkeys.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson2 className="size-6" />
          Formatter Logic Should Be Small and Safe
        </h2>
        <p>
          The formatter itself should stay boring: parse, stringify, and surface an error without destroying the
          original text. Avoid replacing the editor value with an error string, because that overwrites the payload the
          user is trying to fix.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Reusable Formatter Function</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function formatJson(source, indent = 2) {
  const parsed = JSON.parse(source);
  return JSON.stringify(parsed, null, indent);
}

function tryFormatJson(source, indent = 2) {
  try {
    return { ok: true, value: formatJson(source, indent) };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          If your tool also supports minifying, sorting keys, or converting indentation from two spaces to tabs, keep
          those as separate commands and bind each shortcut to an explicit action. A single "smart" shortcut quickly
          becomes hard to predict.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap className="size-6" />
          Only Use a Document Listener When the Shortcut Must Be Global
        </h2>
        <p>
          A document-level listener makes sense when your page has multiple JSON panes or when focus can move between a
          tree view and a source view. Even then, keep the command context-aware by checking the active element before
          you format anything.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Document-Level Pattern</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`useEffect(() => {
  function handleKeyDown(event) {
    const editor = editorRef.current;
    if (!editor) return;
    if (document.activeElement !== editor) return;
    if (!isFormatShortcut(event)) return;

    event.preventDefault();
    runFormat();
  }

  document.addEventListener("keydown", handleKeyDown);
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [runFormat]);`}
            </pre>
          </div>
        </div>
        <p>
          If you use Monaco, CodeMirror, Ace, or another full editor, prefer that editor&apos;s command or keymap API
          over a raw document listener. The editor integration usually preserves selection, undo history, and internal
          focus handling better than a generic browser event hook.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="size-6" />
          Accessibility and Discoverability
        </h2>
        <p>
          A shortcut is an enhancement, not the only route to formatting. Users should be able to discover the command
          in the UI and trigger it without a keyboard.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Show the shortcut next to the button label, in helper text, or in a command palette entry.
          </li>
          <li>
            Use <code>aria-keyshortcuts</code> on the control that exposes the action. This documents the binding for
            assistive technologies, but it does not implement the behavior for you.
          </li>
          <li>
            Do not rely on <code>accesskey</code> as a substitute for app-specific shortcuts. Its behavior varies too
            much across browsers and platforms.
          </li>
          <li>
            Avoid single-letter shortcuts unless they only work inside a tightly scoped editor mode.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="size-6" />
          Troubleshooting Real-World Failures
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Shortcut works on Windows but not macOS: you probably checked <code>ctrlKey</code> and forgot{" "}
            <code>metaKey</code>.
          </li>
          <li>
            Formatter runs multiple times: you are handling repeated <code>keydown</code> events and need an{" "}
            <code>event.repeat</code> guard.
          </li>
          <li>
            Users typing Japanese, Korean, or Chinese trigger the shortcut unexpectedly: ignore events while the IME is
            composing text.
          </li>
          <li>
            The browser still opens its own command: the key combination is reserved higher up the stack, so choose a
            different shortcut or scope the binding more narrowly.
          </li>
          <li>
            Caret position jumps after formatting: plain textareas replace the full value, so restore selection
            manually or use your editor&apos;s native format command API.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Custom keyboard shortcuts for JSON formatting are easy to add, but the production version is not just
          "listen for a key and call <code>JSON.stringify</code>." The reliable pattern is to choose a low-conflict
          shortcut, handle <code>keydown</code> with cross-platform modifier checks, ignore IME and repeat edge cases,
          and expose the same action through a visible control. That gives power users the fast path without making the
          editor harder to use for everyone else.
        </p>
      </div>
    </>
  );
}
