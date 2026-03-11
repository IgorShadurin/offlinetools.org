import type { Metadata } from "next";
import { Lock, EyeOff, FileText, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatting Security: What Obfuscation Can and Cannot Protect | Offline Tools",
  description:
    "Learn what JSON formatting changes, why client-side obfuscation fails, and which modern controls actually protect sensitive JSON: HTTPS, authorization, safe headers, CORS, CSRF defenses, and redaction.",
};

export default function JsonSecurityObfuscationArticle() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 flex items-center space-x-3 text-3xl font-bold">
        <Lock size={32} />
        <span>Security Considerations in JSON Formatting &amp; Obfuscation</span>
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Pretty-printing JSON is useful for readability. It does not change who can access the data, whether the
          payload contains secrets, or whether the browser can send it somewhere it should not go. If a browser
          receives sensitive JSON, your real security boundary is the API and delivery path, not the formatter.
        </p>
        <p>
          That makes &quot;security-focused JSON obfuscation&quot; a misleading goal for most web apps. Base64, renamed
          keys, minified payloads, or reversible encryption can hide meaning from a casual glance, but they do not stop
          a user, attacker, or extension with access to the browser from inspecting the payload. An offline formatter
          can reduce third-party exposure when you inspect data locally, but it does not replace access control,
          redaction, or safe API design.
        </p>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/40">
          <p className="font-semibold text-amber-950 dark:text-amber-100">Quick answer</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base text-amber-950 dark:text-amber-100">
            <li>Formatting changes presentation only.</li>
            <li>
              Obfuscation can reduce accidental disclosure in screenshots or docs, but it is not a real security
              control for delivered JSON.
            </li>
            <li>
              Protect sensitive JSON with HTTPS, authorization, safe response headers, constrained CORS, CSRF defenses
              for cookie-based writes, and redaction before display or logging.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <FileText size={24} />
          <span>What JSON formatting changes, and what it does not</span>
        </h2>
        <p>
          Formatting adds whitespace so people can inspect structure faster. It does not validate the payload, remove
          dangerous fields, or make data safe to paste into logs, tickets, or HTML.
        </p>
        <p>Typical pretty-printing looks like this:</p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm">
            {`const raw = '{"user":"alice","token":"secret-token","roles":["admin"]}';
const parsed = JSON.parse(raw);

const prettyJson = JSON.stringify(parsed, null, 2);

console.log(prettyJson);
/* Output:
{
  "user": "alice",
  "token": "secret-token",
  "roles": [
    "admin"
  ]
}
*/`}
          </pre>
        </div>
        <p>
          This is a readability win only. If the original JSON includes <code>password</code>, <code>token</code>, or
          customer PII, the formatted version still includes all of it.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Lock size={24} />
          <span>Where JSON security actually fails today</span>
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Too much data leaves the server:</strong> If a client should not know a field, do not send it.
            Prefer role-based shaping or separate endpoints over hiding fields with renamed keys.
          </li>
          <li>
            <strong>Wrong response metadata:</strong> Serve JSON as <code>application/json</code> and set{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              X-Content-Type-Options: nosniff
            </a>
            . OWASP still recommends safe response content types, and MDN notes that <code>nosniff</code> helps block
            MIME-type confusion so JSON is less likely to be misinterpreted as executable script or stylesheet content.
          </li>
          <li>
            <strong>Overly broad CORS:</strong> CORS tells browsers which origins may read responses; it is not
            authorization. If you allow credentials, do not use wildcard origins, and keep the allow-list tight.
          </li>
          <li>
            <strong>Cookie-authenticated write endpoints without CSRF defenses:</strong> For state-changing requests,
            use framework CSRF protections or other modern defenses described by the{" "}
            <a
              href="https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              OWASP CSRF Prevention Cheat Sheet
            </a>
            . Accepting simple content types such as <code>text/plain</code> can make JSON-style endpoints easier to
            forge.
          </li>
          <li>
            <strong>Secrets in URLs, logs, or analytics:</strong> Tokens, API keys, and one-time secrets do not belong
            in query strings, because they leak into logs, browser history, referrers, and monitoring tools.
          </li>
          <li>
            <strong>Unsafe rendering:</strong> Formatting JSON does not sanitize strings before you inject them into
            HTML. If JSON values end up in an HTML sink, output encoding still matters.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Lock size={24} />
          <span>Current checklist for secure JSON APIs</span>
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Use HTTPS for every environment that handles real data.</li>
          <li>
            Authenticate and authorize at every non-public endpoint. Do not assume hidden keys or obfuscated field
            names protect anything.
          </li>
          <li>Return the minimum fields each caller needs. Remove restricted fields server-side.</li>
          <li>
            Send <code>Content-Type: application/json</code> and <code>X-Content-Type-Options: nosniff</code>.
          </li>
          <li>
            Keep CORS narrow. If cookies or other credentials are involved, allow only specific origins you control.
          </li>
          <li>
            For cookie-based state changes, use CSRF tokens or another documented defense-in-depth pattern, and prefer
            {" "}
            <code>SameSite=Lax</code> or <code>SameSite=Strict</code> where it fits.
          </li>
          <li>Keep tokens and API keys out of URLs. Put them in headers or secure request bodies instead.</li>
          <li>Review caching for user-specific JSON and avoid storing sensitive responses in shared caches.</li>
          <li>Redact before formatting, storing sample payloads, or sharing debugging output.</li>
        </ul>
        <p>
          The{" "}
          <a
            href="https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            OWASP REST Security Cheat Sheet
          </a>{" "}
          is a good reference if you are reviewing an API rather than just cleaning up one payload.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <EyeOff size={24} />
          <span>Why client-side obfuscation still fails</span>
        </h2>
        <p>
          Common &quot;protective&quot; transformations include Base64, compressed JSON, short key names, client-side
          encryption, or wrapping the payload in another object. None of these create a trustworthy boundary once the
          browser has the data.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>The browser needs the answer:</strong> If your app can decode or decrypt it, the code and often the
            key path are present on the client too.
          </li>
          <li>
            <strong>Network and runtime inspection are easy:</strong> Developer tools, proxies, extensions, and
            instrumentation can inspect the response before or after your transform runs.
          </li>
          <li>
            <strong>It does not fix authorization mistakes:</strong> Sending an admin-only field to a normal user and
            then obscuring it is still a data exposure bug.
          </li>
          <li>
            <strong>It adds fragility:</strong> Extra transforms make debugging, incident response, and interoperability
            harder while giving teams a false sense of protection.
          </li>
        </ul>
        <p>
          Obfuscation is sometimes reasonable for demos, screenshots, or public examples where the goal is to reduce
          accidental disclosure. Call that masking or redaction, not security.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Code size={24} />
          <span>Safer pattern: redact, then format</span>
        </h2>
        <p>
          If you need to inspect sensitive payloads, remove or mask the fields first and only then pretty-print the
          result. That protects logs, screenshots, pasted bug reports, and teammates who do not need production
          secrets.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm">
            {`const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "apiKey",
  "authorization",
  "cookie",
  "ssn",
]);

function redactForDisplay(value) {
  if (Array.isArray(value)) {
    return value.map(redactForDisplay);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        SENSITIVE_KEYS.has(key) ? "[REDACTED]" : redactForDisplay(child),
      ]),
    );
  }

  return value;
}

const safePrettyJson = JSON.stringify(redactForDisplay(parsed), null, 2);`}
          </pre>
        </div>
        <p>
          This is where an offline formatter is useful: it keeps the inspection step on your machine. It still does not
          change who should have received the underlying data in the first place.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Lock size={24} />
          <span>Historical note: JSON hijacking and legacy prefixes</span>
        </h2>
        <p>
          The old idea of &quot;security-focused JSON formatting&quot; partly comes from JSON hijacking, where older
          browser behavior made certain JSON responses risky when treated like executable JavaScript. A common
          mitigation was to prefix responses with text such as <code>while(1);</code> or <code>)]&#125;&apos;,</code> so a{" "}
          <code>&lt;script&gt;</code> inclusion would fail.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="text-sm">
            {`// Legacy anti-hijacking response pattern
while(1);[{"id":1,"name":"secret"}]

// Modern preferred baseline
// Content-Type: application/json
// X-Content-Type-Options: nosniff
// HTTPS + authorization + tight CORS + CSRF protection where needed`}
          </pre>
        </div>
        <p>
          That history still matters for understanding older blog posts and scanners, but current guidance centers on
          correct content types, <code>nosniff</code>, HTTPS, authorization, careful CORS, and CSRF protection where
          cookies are used.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          JSON formatting is a presentation feature. Obfuscation can hide detail from casual viewers, but it cannot
          secure data that the browser already received. Protect JSON at the server boundary, redact before display, and
          use offline formatting as a privacy aid rather than a security control.
        </p>
      </div>
    </div>
  );
}
