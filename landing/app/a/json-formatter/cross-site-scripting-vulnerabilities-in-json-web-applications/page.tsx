import type { Metadata } from "next";
import { AlertTriangle, Code, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Cross-Site Scripting Vulnerabilities in JSON Web Applications | Security Guide",
  description:
    "Learn where XSS really appears in JSON-driven web apps: unsafe DOM sinks, embedded JSON in script tags, rich text sanitization, URL handling, and defense-in-depth controls.",
};

export default function XssJsonVulnerabilitiesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <AlertTriangle className="text-yellow-500 mr-3" size={30} />
        Cross-Site Scripting Vulnerabilities in JSON Web Applications
      </h1>

      <div className="space-y-6">
        <p>
          JSON does not execute by itself, but JSON-driven interfaces can still be highly vulnerable to Cross-Site
          Scripting (XSS). The bug usually appears when an application takes untrusted values from an API response,
          server-rendered state blob, search result, comment, or CMS record and inserts those values into an unsafe
          browser context.
        </p>
        <p>
          For most modern web apps, the dangerous step is not fetching JSON. It is turning JSON values into live HTML,
          JavaScript, CSS, or navigable URLs. If a field from a JSON payload reaches a sink such as{" "}
          <code>innerHTML</code>, <code>insertAdjacentHTML()</code>, <code>document.write()</code>, or an unvalidated
          <code>href</code>, an attacker can often run code in another user&apos;s browser.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} />
          Where XSS Actually Happens in JSON Apps
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Unsafe DOM rendering:</strong> API fields are inserted with <code>innerHTML</code> or a framework
            escape hatch instead of being rendered as text.
          </li>
          <li>
            <strong>Embedded bootstrapping data:</strong> Server-rendered pages place raw <code>JSON.stringify()</code>
            output into a <code>&lt;script&gt;</code> block without escaping <code>&lt;</code>, allowing a payload with
            <code>&lt;/script&gt;</code> to break out.
          </li>
          <li>
            <strong>Rich text handling:</strong> Comments, bios, CMS blocks, or markdown previews are treated as safe
            HTML without robust sanitization.
          </li>
          <li>
            <strong>Unsafe parsing:</strong> Developers still occasionally use <code>eval()</code> or{" "}
            <code>new Function()</code> to parse response text instead of <code>JSON.parse()</code>.
          </li>
          <li>
            <strong>URL injection:</strong> JSON fields like <code>website</code>, <code>redirectUrl</code>, or{" "}
            <code>avatarUrl</code> are trusted without protocol validation, which can enable <code>javascript:</code>{" "}
            or unexpected <code>data:</code> payloads.
          </li>
        </ul>
        <p>
          In practice, JSON-related XSS often shows up as stored XSS through API-backed content, DOM-based XSS in the
          frontend, or a server-side rendering mistake that turns serialized state into executable markup.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="text-yellow-500 mr-2" size={24} />
          Example 1: Safe JSON Response, Unsafe Rendering
        </h2>
        <p>
          A perfectly valid JSON API can still feed an XSS bug if the frontend renders its values into HTML instead of
          text.
        </p>

        <p className="font-semibold">Vulnerable pattern:</p>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`const profile = await fetch("/api/profile").then((r) => r.json());

bio.innerHTML = profile.bio;
websiteLink.href = profile.website;`}
          </pre>
          <p className="mt-2">
            If <code>profile.bio</code> contains HTML, script gadgets, or event handlers, the page may execute them. If
            <code>profile.website</code> is <code>javascript:alert(1)</code>, clicking the link can execute code.
          </p>
        </div>

        <p className="font-semibold">Safer pattern:</p>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg dark:bg-green-900 dark:text-green-200 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`const profile = await fetch("/api/profile").then((r) => r.json());

bio.textContent = profile.bio;

try {
  const website = new URL(profile.website, window.location.origin);
  if (website.protocol === "http:" || website.protocol === "https:") {
    websiteLink.href = website.toString();
  }
} catch {
  websiteLink.removeAttribute("href");
}`}
          </pre>
          <p className="mt-2 flex items-center font-semibold">
            <Shield className="mr-2" size={18} />
            Render text as text, and validate URLs before turning them into clickable navigation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Framework default escaping helps, until you bypass it</h3>
        <p>
          React, Vue, Angular, and similar frameworks escape normal text interpolation by default. In React,{" "}
          <code>{`<div>{profile.bio}</div>`}</code> is normally safe because the value is rendered as text, not parsed as
          markup.
        </p>
        <p>
          Problems start when you opt into raw HTML rendering, such as <code>dangerouslySetInnerHTML</code> in React,
          <code>v-html</code> in Vue, or other bypass APIs. Those escape hatches are only appropriate when the HTML is
          trusted or has been sanitized with a well-maintained sanitizer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} />
          Example 2: XSS in Embedded JSON State
        </h2>
        <p>
          A common server-rendering pattern is to place initial page state into{" "}
          <code>&lt;script type=&quot;application/json&quot;&gt;</code> so the client can read it during hydration. The
          browser does not execute that script block, but HTML parsing still ends the element when it sees{" "}
          <code>&lt;/script&gt;</code>.
        </p>

        <p className="font-semibold">Vulnerable pattern:</p>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`const state = {
  bio: "</script><script>alert('xss')</script>",
};

const html = \`<script id="boot" type="application/json">\${JSON.stringify(state)}</script>\`;`}
          </pre>
          <p className="mt-2">
            If a value contains <code>&lt;/script&gt;</code>, the attacker can terminate the JSON container and inject a
            new executable script tag into the page.
          </p>
        </div>

        <p className="font-semibold">Safer pattern:</p>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg dark:bg-green-900 dark:text-green-200 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`const safeState = JSON.stringify(state).replace(/</g, "\\u003c");

const html = \`<script id="boot" type="application/json">\${safeState}</script>\`;`}
          </pre>
          <p className="mt-2">
            Escaping <code>&lt;</code> prevents <code>&lt;/script&gt;</code> from being interpreted as a closing HTML
            tag. When possible, use your framework&apos;s built-in serializer or a battle-tested helper instead of rolling
            your own HTML serialization.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Serve APIs as JSON, not HTML</h3>
        <p>
          JSON API responses should be returned with a JSON content type such as <code>application/json</code>. That
          does not eliminate XSS on its own, but it reduces browser confusion and keeps API payloads out of HTML
          parsing paths where they do not belong.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="text-yellow-500 mr-2" size={24} />
          Example 3: Parsing JSON with Code Execution APIs
        </h2>
        <p>
          Parsing response text with executable JavaScript APIs is both outdated and dangerous. JSON should be treated as
          data, not as code.
        </p>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg dark:bg-red-900 dark:text-red-200 my-4 overflow-x-auto">
          <pre className="text-sm">
            {`// Avoid this
const data = eval("(" + responseText + ")");

// Use this
const data = JSON.parse(responseText);`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="mr-2" size={24} />
          Defenses That Still Matter
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Prefer safe sinks:</strong> Use <code>textContent</code>, DOM text nodes, and framework text
            interpolation for untrusted values.
          </li>
          <li>
            <strong>Sanitize only when HTML is required:</strong> If you must render user-controlled HTML, use a
            maintained sanitizer such as DOMPurify and keep it patched. Do not sanitize once and then later append more
            unsanitized fragments into the same container.
          </li>
          <li>
            <strong>Validate URLs and protocols:</strong> Treat <code>href</code>, <code>src</code>, redirect targets,
            and custom deep links as untrusted input too.
          </li>
          <li>
            <strong>Escape embedded JSON in HTML:</strong> When placing serialized state into a page, escape HTML-significant
            characters before writing it into a <code>&lt;script&gt;</code> element.
          </li>
          <li>
            <strong>Use CSP as defense in depth:</strong> A strong Content Security Policy can limit the blast radius,
            but it is not a substitute for correct output handling.
          </li>
          <li>
            <strong>Consider Trusted Types where supported:</strong> Trusted Types can help enforce safer handling around
            dangerous DOM sinks and reduce accidental <code>innerHTML</code> usage in large frontends.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Quick review checklist</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Search the codebase for raw HTML sinks such as <code>innerHTML</code> and framework-specific bypass APIs.</li>
          <li>Trace every field from API response to DOM sink, not just the ones obviously named <code>html</code>.</li>
          <li>Check server-rendered pages for inline JSON blobs created from <code>JSON.stringify()</code>.</li>
          <li>Verify that rich text, markdown, and CMS content are sanitized before rendering and not mutated afterward.</li>
          <li>Validate outbound URLs from JSON before assigning them to <code>href</code>, <code>src</code>, or redirects.</li>
          <li>Confirm API responses use <code>application/json</code> and are not accidentally rendered as HTML pages.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Cross-site scripting in JSON web applications is rarely about JSON syntax. It is about what the application
          does with untrusted data after parsing it. If you render untrusted values as text by default, sanitize the rare
          cases that need HTML, safely embed server state, and treat CSP as backup rather than the main fix, you remove
          the most common XSS paths in modern JSON-heavy frontends.
        </p>
      </div>
    </>
  );
}
