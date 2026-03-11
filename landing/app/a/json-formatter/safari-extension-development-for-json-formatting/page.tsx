import type { Metadata } from "next";
import {
  Monitor,
  FileJson,
  Settings,
  PenLine,
  Layers,
  Paintbrush,
  AlertCircle,
  Box,
  FileText,
  CheckCheck,
  FileCode,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Safari Extension Development for JSON Formatting | Offline Tools",
  description:
    "Current guide to building a Safari Web Extension that formats raw JSON pages safely, with Xcode setup, manifest choices, content-script detection, and testing tips.",
};

export default function SafariJsonFormatterExtensionArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Monitor className="w-8 h-8" /> Safari Extension Development for JSON Formatting
      </h1>

      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        If you want Safari to pretty-print raw API responses, build a <strong>Safari Web Extension</strong>, not an
        older Safari App Extension. The job sounds simple, but the tricky part is doing it safely: detect real JSON
        documents, render them cleanly, and avoid breaking ordinary HTML pages that only happen to contain braces.
      </p>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 mb-8 dark:border-blue-900 dark:bg-blue-950/40">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Apple&apos;s current Safari Web Extensions documentation describes this model as available on macOS with
          Safari 14 and later, on iOS/iPadOS with Safari 15 and later, and on visionOS 1 and later. If you already
          have a Chrome, Edge, or Firefox extension, Apple&apos;s converter is usually the fastest path into Safari.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson className="w-6 h-6" /> Use the Current Safari Extension Model
          </h2>
          <p>
            For JSON formatting in 2026, the practical default is a Safari Web Extension built with HTML, CSS, and
            JavaScript and packaged through Xcode or App Store Connect. That keeps your Safari version close to the same
            extension architecture used in other browsers and makes it much easier to share code.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>New project:</strong> Start with Xcode&apos;s <code>Safari Extension App</code> template.
            </li>
            <li>
              <strong>Existing cross-browser extension:</strong> Use Apple&apos;s command-line converter to generate the
              Safari project wrapper.
            </li>
            <li>
              <strong>Simple JSON viewer:</strong> A content script plus a stylesheet is usually enough.
            </li>
            <li>
              <strong>Use a background context only when needed:</strong> Add one for messaging, toolbar actions,
              storage sync, native app communication, or more advanced request handling.
            </li>
          </ul>
          <p className="mt-4">
            Apple also now supports packaging Safari Web Extensions through App Store Connect from a ZIP upload, which
            is useful if your extension already exists as a browser-ready codebase and you want a lighter packaging
            workflow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6" /> Choose the Right Starting Point
          </h2>
          <p>The fastest route depends on whether you are starting fresh or porting an existing formatter.</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Common setup commands</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`# Convert an existing WebExtension into a Safari project
xcrun safari-web-extension-converter /path/to/extension

# Add iOS/iPadOS support to an existing macOS Safari Web Extension project
xcrun safari-web-extension-converter --rebuild-project /path/to/MyExtension.xcodeproj`}
              </pre>
            </div>
          </div>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              If you already have a JSON formatter extension for Chromium or Firefox, convert it first, then review any
              browser-specific APIs before polishing the Safari version.
            </li>
            <li>
              If Safari is your first target, start in Xcode and keep the first release small: detect raw JSON, pretty
              print it, and preserve a raw fallback for oversized responses.
            </li>
            <li>
              Apple also documents temporary installation of a web extension folder in macOS Safari for quick local
              testing without a full packaging flow.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" /> A Manifest That Fits a JSON Formatter
          </h2>
          <p>
            One problem with many tutorials is that they mix up <code>activeTab</code> and automatic page formatting.
            If you want Safari to format raw JSON pages on load, the core tool is the <code>content_scripts</code>{" "}
            section, not a toolbar-only permission model.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">`manifest.json` example</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`{
  "manifest_version": 3,
  "name": "JSON Formatter for Safari",
  "version": "1.0.0",
  "description": "Formats raw JSON documents in Safari.",
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_idle"
    }
  ]
}`}
              </pre>
            </div>
          </div>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>No `activeTab` here:</strong> that permission is a better fit for an opt-in toolbar action, not
              an automatic formatter.
            </li>
            <li>
              <strong>`&lt;all_urls&gt;` is convenient but broad:</strong> use it only if your JSON detection logic is
              strict. If you know the hosts you care about, narrow the match patterns.
            </li>
            <li>
              <strong>`document_idle` is a safe default:</strong> it gives Safari time to finish rendering raw JSON into
              the document before your formatter decides whether to take over.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <PenLine className="w-6 h-6" /> Detect Raw JSON Without Breaking Normal Pages
          </h2>
          <p>
            The biggest implementation mistake is replacing the page whenever the body text starts with <code>{"{"}</code>{" "}
            or <code>[</code>. A safer formatter combines MIME hints, DOM shape, successful parsing, and a size limit.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2 flex items-center gap-2">
            <FileCode className="w-5 h-5" /> `content.ts` example
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`const JSON_MIME_HINTS = ["application/json", "text/json", "application/ld+json"];
const MAX_RENDER_BYTES = 2_000_000;

function describeValue(value: unknown): string {
  if (Array.isArray(value)) return "Array";
  if (value === null) return "null";
  if (typeof value === "object") return "Object";
  return typeof value;
}

function readRawJson(): string | null {
  if (!document.body) return null;

  const mime = (document.contentType || "").toLowerCase();
  const lonePre =
    document.body.childElementCount === 1 && document.body.firstElementChild?.tagName === "PRE"
      ? (document.body.firstElementChild as HTMLPreElement)
      : null;

  const candidate = (lonePre?.textContent ?? document.body.textContent ?? "").trim();
  if (!candidate) return null;

  const hasJsonMime = JSON_MIME_HINTS.some((hint) => mime.includes(hint));
  const looksLikeJson = candidate.startsWith("{") || candidate.startsWith("[");
  const byteLength = new TextEncoder().encode(candidate).byteLength;

  if (!hasJsonMime && !looksLikeJson) return null;
  if (byteLength > MAX_RENDER_BYTES) return null;

  try {
    JSON.parse(candidate);
    return candidate;
  } catch {
    return null;
  }
}

function mountViewer(rawJson: string) {
  const parsed = JSON.parse(rawJson);
  const pretty = JSON.stringify(parsed, null, 2);

  const app = document.createElement("main");
  app.className = "json-viewer";

  const heading = document.createElement("h1");
  heading.textContent = "Formatted JSON";

  const meta = document.createElement("p");
  meta.className = "json-viewer__meta";
  meta.textContent =
    \`\${describeValue(parsed)} • \${pretty.split("\\n").length.toLocaleString()} lines\`;

  const pre = document.createElement("pre");
  pre.textContent = pretty;

  app.append(heading, meta, pre);
  document.body.replaceChildren(app);
  document.title = "Formatted JSON";
}

const rawJson = readRawJson();
if (rawJson) {
  mountViewer(rawJson);
}`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            This approach is much safer than dumping formatted text into <code>innerHTML</code>. It only proceeds when
            the response looks like a real JSON document, uses <code>textContent</code> for rendering, and refuses very
            large payloads that would make the tab sluggish.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Paintbrush className="w-6 h-6" /> Styling and UX Details That Actually Matter
          </h2>
          <p>
            A production JSON formatter is more than indentation. You want something that stays readable on dark and
            light pages, handles long lines, and gives the user a way back to raw content when needed.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">`content.css` starter</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`body {
  margin: 0;
  background: #0f172a;
  color: #e2e8f0;
}

.json-viewer {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  font: 14px/1.6 ui-monospace, SFMono-Regular, Menlo, monospace;
}

.json-viewer__meta {
  color: #94a3b8;
  margin: 0 0 12px;
}

.json-viewer pre {
  margin: 0;
  overflow: auto;
  padding: 16px;
  border: 1px solid #243041;
  border-radius: 14px;
  background: #111827;
}`}
              </pre>
            </div>
          </div>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              Add a raw-view toggle or copy button early. People debugging APIs often need the original payload.
            </li>
            <li>
              Keep a hard size threshold. Pretty-printing huge responses is one of the fastest ways to make the
              extension feel broken.
            </li>
            <li>
              If you add collapse and expand behavior, build it lazily so large objects do not render every nested node
              up front.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Box className="w-6 h-6" /> Testing and Packaging in Safari Today
          </h2>
          <p>
            Safari development still revolves around a containing app, even when your extension code is mostly web
            technology.
          </p>
          <ol className="list-decimal pl-6 mt-4 space-y-2">
            <li>Create the Safari Extension App project in Xcode, or convert your existing extension first.</li>
            <li>
              Keep your HTML, CSS, JS, and JSON files inside the extension resources and make sure the Safari web
              extension target includes them.
            </li>
            <li>
              For macOS testing, build the containing app from Xcode. Apple also documents temporary folder-based
              installation for quick local checks.
            </li>
            <li>
              For iPhone or iPad testing, deploy the containing app from Xcode to a simulator or device, then enable
              the extension in Safari.
            </li>
            <li>
              For unsigned local testing on Mac, enable Safari&apos;s Develop menu and then allow unsigned extensions
              before running from Xcode.
            </li>
          </ol>
          <p className="mt-4">
            If you are shipping publicly, review the App Store extension guidelines and keep your permissions narrow.
            Safari is explicit about website access, so overreaching permissions create friction fast.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" /> Common Failure Modes
          </h2>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>You format normal pages by mistake:</strong> broad URL matches are fine only if your detection
              logic is strict.
            </li>
            <li>
              <strong>You rely on `activeTab` for auto-formatting:</strong> that works for click-to-run tools, not for
              automatic page formatting at load time.
            </li>
            <li>
              <strong>You replace the DOM too early:</strong> wait until the document is idle or confirm the raw payload
              is present first.
            </li>
            <li>
              <strong>You assume every browser API is identical:</strong> review Apple&apos;s compatibility guidance
              before shipping features copied from a Chrome extension.
            </li>
            <li>
              <strong>You ignore huge responses:</strong> if a multi-megabyte payload times out or freezes the tab, show
              a fallback message and keep the raw view available.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6" /> When a Safari Extension Is the Right Tool
          </h2>
          <p>
            Build the extension when you need automatic formatting for live responses, team-wide distribution, or a
            browser-native debugging workflow. If you only need to pretty-print copied JSON once in a while, an offline
            formatter is simpler and avoids extension permissions entirely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCheck className="w-6 h-6" /> Conclusion
          </h2>
          <p>
            A good Safari JSON formatter is really a good <strong>JSON page detector</strong>. Use the current Safari
            Web Extension model, keep the manifest lean, verify that the page is truly raw JSON before replacing it, and
            test the Safari packaging flow early so Xcode or permissions do not surprise you late in the project.
          </p>
        </section>
      </div>
    </>
  );
}
