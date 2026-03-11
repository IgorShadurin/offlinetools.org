import type { Metadata } from "next";
import {
  AlertCircle,
  FileJson,
  Settings,
  ShieldAlert,
  HardDrive,
  Sigma,
  Code,
  Wrench,
  Bug,
  Eye,
  KeyRound,
  Keyboard,
  Search,
} from "lucide-react"; // Using allowed lucide-react icons

export const metadata: Metadata = {
  title: "Expandable and Collapsible JSON UX: Formatter Design Limits | Offline Tools",
  description:
    "Learn how to design a JSON formatter with useful expand and collapse behavior, accessible tree navigation, safe handling for large payloads, and accurate JSON edge-case warnings.",
};

export default function JsonFormatterLimitationsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="mr-3 h-8 w-8" /> Situational Limitations and JSON Formatter Design
      </h1>

      <div className="space-y-6">
        <p>
          If a JSON formatter feels slow or confusing, the problem is usually not indentation. It is the expand and
          collapse model: what opens by default, what stays hidden, how search reveals matches, and whether the viewer
          can handle a 5 KB API response and a 50 MB log export without freezing the interface.
        </p>
        <p>
          For people comparing expandable or collapsible JSON designs, the real goal is simple: make nested data
          scannable without hiding errors, losing precision, or overwhelming keyboard and screen reader users. That
          means combining solid UX rules with JSON constraints that still matter today.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Eye className="mr-2 h-6 w-6" /> What Users Need From Expandable JSON
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Fast scanning:</strong> People want the top-level shape immediately, not a wall of nested braces.
          </li>
          <li>
            <strong>Controlled disclosure:</strong> They need to open only the branches that matter and keep the rest
            compact.
          </li>
          <li>
            <strong>Trustworthy output:</strong> The formatter should not hide duplicate keys, precision loss, or parse
            failures behind a pretty view.
          </li>
          <li>
            <strong>Accessible interaction:</strong> Expand and collapse controls must work with keyboard navigation and
            assistive technology, not just mouse clicks.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" /> Where Collapsible JSON UX Breaks Down
        </h3>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <HardDrive className="mr-2 h-5 w-5" /> 1. Large payloads change the interaction model
        </h3>
        <p>
          Large JSON is where many viewers fail. Parsing the full text, pretty-printing it, and mounting thousands of
          DOM nodes can block the browser main thread long before the data itself is unusual.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Common failure:</strong> An <code>Expand all</code> action locks the tab or causes seconds of input
            lag.
          </li>
          <li>
            <strong>Better default:</strong> Expand only the root and the first one or two levels, then lazy-render
            deeper children on demand.
          </li>
          <li>
            <strong>Useful summary:</strong> Show collapsed labels such as <code>{`{12 keys}`}</code> or{" "}
            <code>[248 items]</code> so users can judge whether a branch is worth opening.
          </li>
        </ul>
        <p>
          Safe bulk actions are depth-based, not absolute. <code>Expand to depth 2</code> or{" "}
          <code>Expand matches</code> is usually more usable than a global unbounded expand.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Sigma className="mr-2 h-5 w-5" /> 2. Deep nesting needs navigation, not just pretty-printing
        </h3>
        <p>Indentation helps, but it is not enough once objects become deeply nested or arrays contain similar items.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Context loss:</strong> Users open a branch and immediately lose track of which parent object they
            are inside.
          </li>
          <li>
            <strong>Better design:</strong> Keep clear indentation guides, stable node paths, and copy-path actions for
            the current key.
          </li>
          <li>
            <strong>Search behavior matters:</strong> Searching should open only the ancestors of matching nodes instead
            of expanding the entire document.
          </li>
        </ul>
        <p>
          A formatter that expands the correct branch but hides the path to it still creates unnecessary work for the
          user.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 h-5 w-5" /> 3. Long values need their own folding rules
        </h3>
        <p>
          Not every readability problem is structural. Long strings, JWTs, base64 blobs, stack traces, SQL queries,
          and giant URLs can make a single valid property dominate the screen.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Separate concerns:</strong> Do not force users to collapse an entire object just to hide one noisy
            value.
          </li>
          <li>
            <strong>Better behavior:</strong> Allow wrap, truncate, and expand controls at the individual value level.
          </li>
          <li>
            <strong>Clarity:</strong> If you truncate a value, show the exact character count or byte size so the user
            knows what is hidden.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Keyboard className="mr-2 h-5 w-5" /> 4. Accessibility is part of the design, not a later patch
        </h3>
        <p>
          If a viewer behaves like a tree, users expect tree behavior. The current WAI-ARIA tree view guidance expects
          expandable parents to expose <code>aria-expanded</code> and keyboard users to open or close nodes with arrow
          keys while moving through visible items predictably.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Important rule:</strong> If you only provide independent click toggles, use ordinary buttons or
            disclosure controls instead of claiming <code>role=&quot;tree&quot;</code>.
          </li>
          <li>
            <strong>Focus management:</strong> Keep focus stable when a branch opens or closes so keyboard users do not
            lose their place.
          </li>
          <li>
            <strong>Screen reader value:</strong> Collapsed summaries should announce meaningful counts, not only
            punctuation.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Bug className="mr-2 h-5 w-5" /> 5. Invalid JSON should not destroy orientation
        </h3>
        <p>
          Native <code>JSON.parse</code> still throws <code>SyntaxError</code> for invalid JSON, including trailing
          commas and single-quoted property names. A formatter should preserve the raw text and point to the failing
          region instead of clearing the whole interface.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Clear recovery:</strong> Keep the editor scroll position and highlight the area around the error.
          </li>
          <li>
            <strong>Consistent messaging:</strong> Normalize browser-specific error text if you surface parse errors
            directly in a web app.
          </li>
          <li>
            <strong>Raw mode:</strong> Let users fix syntax before you try to rebuild the tree view.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <ShieldAlert className="mr-2 h-5 w-5 text-red-500" /> 6. Display security still matters
        </h3>
        <p>
          Browser-based formatters often display untrusted text from logs, API responses, or pasted payloads. If you
          render string values into HTML without escaping them, a formatter can become an XSS sink.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Non-negotiable:</strong> Escape rendered string content before placing it in the DOM.
          </li>
          <li>
            <strong>Do not trust syntax highlighting alone:</strong> Styled output can still be unsafe if text is
            inserted as HTML instead of text nodes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <KeyRound className="mr-2 h-6 w-6" /> Current JSON Constraints That Still Shape Formatter Design
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Duplicate keys are a trust problem</h3>
        <p>
          RFC 8259 says object member names should be unique. When they are not, behavior is unpredictable across
          implementations, and many parsers effectively keep only the last value. That means parse-first, display-second
          formatting can hide a real data problem.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Best practice:</strong> Warn about duplicate keys before any round-trip parse and reformat cycle.
          </li>
          <li>
            <strong>Debugging fallback:</strong> Keep a raw or tokenized inspection mode for malformed or ambiguous
            input.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">2. Number precision still matters</h3>
        <p>
          RFC 8259 notes that integers are interoperable when they remain within <code>{`[-(2**53)+1, (2**53)-1]`}</code>.
          Values outside that range may be rounded in JavaScript environments, which is a real issue for IDs, ledger
          values, and event counters.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Safer display:</strong> Flag suspiciously large integers before pretty-printing or transforming them.
          </li>
          <li>
            <strong>Do not silently coerce:</strong> Copy-as-text or preserve-source actions are better than pretending
            rounded output is exact.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">3. Parsers are allowed to have limits</h3>
        <p>
          The JSON specification allows implementations to set limits on text size, nesting depth, number range, and
          string length. That is why a payload can work in one formatter but fail in another without being invalid JSON.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Be explicit:</strong> Document your practical limits instead of failing mysteriously on large input.
          </li>
          <li>
            <strong>For browser tools:</strong> Prefer worker-based parsing or a raw-text fallback for heavy payloads.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-2 h-6 w-6" /> Design Choices That Work Well in Practice
        </h2>

        <h3 className="text-xl font-semibold mt-6">Default collapse rules</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Expand the root and the first few levels, not the full document.</li>
          <li>Collapse arrays aggressively when item counts are high.</li>
          <li>Remember local expansion state while the user is inspecting the same payload.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Search className="mr-2 h-5 w-5" /> Search and filtering
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Support search by key, value, and JSON path when possible.</li>
          <li>Open only the ancestors of matched nodes, not every sibling branch.</li>
          <li>Show match counts inside collapsed sections so users know where remaining hits are hidden.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Trust-preserving presentation</h3>
        <p>
          Preserve source order by default and make key sorting optional. JSON objects are conceptually unordered, but
          people often rely on producer order while debugging APIs and configuration files.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Mark truncation and collapse states explicitly so hidden content is never ambiguous.</li>
          <li>Provide copy-value and copy-path actions close to the node being inspected.</li>
          <li>Escape all rendered strings before display in browser-based tools.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2 h-6 w-6" /> A Practical Default Spec
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Pretty-print with two spaces and preserve original key order unless the user asks for sorting.</li>
          <li>Render an expandable tree view with initial expansion limited to shallow depth.</li>
          <li>Show counts and short previews on collapsed objects and arrays.</li>
          <li>Use real buttons or a fully implemented ARIA tree pattern, not an in-between widget.</li>
          <li>Make search reveal only matching branches and keep the current scroll position stable.</li>
          <li>Warn on invalid JSON, duplicate keys, and integers that may exceed safe JavaScript precision.</li>
          <li>For very large inputs, fall back to worker-based parsing, lazy rendering, or raw-text inspection.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Good JSON formatter design is mostly about controlled disclosure. The best tools do not simply beautify text;
          they help people understand structure quickly, expand the right branches safely, and avoid false confidence
          when the input is invalid, ambiguous, or too large for naive rendering.
        </p>
      </div>
    </>
  );
}
