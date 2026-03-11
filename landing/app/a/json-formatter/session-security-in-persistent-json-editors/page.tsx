import type { Metadata } from "next";
import { Binary, Bug, Database, Eye, FileText, Key, Lock, RefreshCcw, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Session Security in Persistent JSON Editors",
  description:
    "Practical guidance for securing persistent JSON editors with safer session storage, draft persistence, timeout rules, logout cleanup, and editor-specific protections.",
};

export default function SessionSecurityJsonEditorArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Session Security in Persistent JSON Editors</h1>

      <div className="space-y-6">
        <p>
          Persistent JSON editors often autosave drafts, reopen the last document, and keep users signed in across
          reloads. That convenience creates a specific security problem: the app may persist both the JSON data and the
          path back into the data.
        </p>
        <p>
          A safer design keeps those concerns separate. Persist document state if the product needs it, but keep
          authentication short-lived, server-controlled, and easy to revoke. This guide focuses on the parts that
          matter most for a real editor: storage choices, cookie rules, logout cleanup, offline mode, and stale-tab
          behavior.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Shield className="mr-2" size={24} /> Why Persistent Editors Need Extra Session Care
        </h2>
        <p>
          A persistent editor behaves differently from a simple formatter or viewer. It usually keeps more state, runs
          longer, and handles more sensitive content.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <span className="font-medium">Autosave and rehydration:</span> A reopened tab may restore a draft before
            the app has fully re-validated the session.
          </li>
          <li>
            <span className="font-medium">Shared-device risk:</span> The next person at the keyboard may inherit
            drafts, exports, or cached API responses even if the prior user thinks they logged out.
          </li>
          <li>
            <span className="font-medium">Background tabs:</span> Old tabs can keep firing autosave or sync requests
            after permissions change or a session should have expired.
          </li>
          <li>
            <span className="font-medium">High-value content:</span> JSON payloads often contain API keys, customer
            records, environment config, or internal workflow data that should not linger in the browser by accident.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Lock className="mr-2" size={24} /> Recommended Baseline Architecture
        </h2>
        <p>
          For most teams, the safest default is simple: persist document content separately from the login session, and
          let the server stay in charge of session validity.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Practical default for a persistent JSON editor</h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>Use a server-side session or short-lived access token delivered in a `HttpOnly` cookie.</li>
            <li>Keep long-lived refresh state server-tracked and revocable, not permanently exposed to browser code.</li>
            <li>Store drafts server-side when online; use browser persistence only for explicit offline mode.</li>
            <li>Re-authorize every read, save, export, share, and delete request on the server.</li>
            <li>Require recent re-authentication for high-risk actions such as export, sharing, or secret reveal.</li>
          </ul>
        </div>

        <p>
          This approach lets the editor remember work without turning a copied token or a forgotten browser tab into an
          account takeover path.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Database className="mr-2" size={24} /> What To Persist and Where
        </h2>
        <p>The simplest rule is: persist content, not credentials.</p>

        <div className="my-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="px-3 py-2 font-semibold">Item</th>
                <th className="px-3 py-2 font-semibold">Best home</th>
                <th className="px-3 py-2 font-semibold">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="px-3 py-2 font-medium">Session ID or refresh token</td>
                <td className="px-3 py-2">`HttpOnly`, `Secure`, `SameSite` cookie</td>
                <td className="px-3 py-2">Browser JavaScript cannot read it, and the server can rotate or revoke it.</td>
              </tr>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="px-3 py-2 font-medium">Short-lived access token</td>
                <td className="px-3 py-2">Prefer the same cookie model or memory only</td>
                <td className="px-3 py-2">Avoid leaving durable bearer credentials in browser storage.</td>
              </tr>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="px-3 py-2 font-medium">Unsaved JSON draft</td>
                <td className="px-3 py-2">Server-side draft store, or IndexedDB for explicit offline mode</td>
                <td className="px-3 py-2">Users keep their work without tying long-lived authentication to it.</td>
              </tr>
              <tr className="border-b border-gray-200 align-top dark:border-gray-800">
                <td className="px-3 py-2 font-medium">Per-tab UI state</td>
                <td className="px-3 py-2">Memory or `sessionStorage`</td>
                <td className="px-3 py-2">Useful for cursor position or temporary diffs, but still not for auth data.</td>
              </tr>
              <tr className="align-top">
                <td className="px-3 py-2 font-medium">Theme and other low-risk preferences</td>
                <td className="px-3 py-2">`localStorage`</td>
                <td className="px-3 py-2">Persistence is convenient here because the values are not sensitive.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Binary className="mr-2" size={24} /> Current Browser Storage Realities
        </h2>
        <p>
          Current browser behavior still trips up teams that build persistent editors, especially when they assume
          browser storage maps neatly to session boundaries.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <span className="font-medium">`localStorage` persists across browser sessions.</span> It is also shared by
            same-origin tabs and windows. That makes it fine for UI preferences and a poor place for session
            identifiers or long-lived bearer tokens.
          </li>
          <li>
            <span className="font-medium">`sessionStorage` is per-tab, not per-user.</span> It is helpful for
            temporary editor state, but it is still readable by JavaScript, so it should not be treated as a secure
            vault for auth material.
          </li>
          <li>
            <span className="font-medium">A browser restart is not a reliable logout boundary.</span> Browsers with
            session restore can bring session cookies back with the restored session. Enforce idle timeout, absolute
            timeout, and revocation on the server instead of assuming "close browser" ends access.
          </li>
        </ul>

        <p>
          In practice, current OWASP guidance still points in the same direction: do not store session identifiers in
          `localStorage`; one XSS bug can expose every token reachable from page JavaScript.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Key className="mr-2" size={24} /> Session Controls That Actually Matter
        </h2>
        <ul className="my-4 list-disc space-y-3 pl-6">
          <li>
            <span className="font-medium">Set strict cookie attributes.</span> Use `Secure` and `HttpOnly` on session
            cookies, and choose `SameSite=Lax` or `SameSite=Strict` based on whether the app truly needs cross-site
            navigation flows. Keep cookie scope tight with the correct host, path, and lifetime.
          </li>
          <li>
            <span className="font-medium">Rotate and revoke credentials.</span> Issue a fresh session after login,
            privilege change, password change, or suspicious activity. If you use refresh tokens, track and revoke them
            server-side so logout means something.
          </li>
          <li>
            <span className="font-medium">Use both idle and absolute timeouts.</span> Idle timeout limits how long an
            abandoned editor stays live. Absolute timeout prevents a session from silently lasting for days because the
            user kept one tab open.
          </li>
          <li>
            <span className="font-medium">Handle expiry without losing work.</span> When the session expires, stop save
            requests, preserve unsent edits separately, and prompt the user to re-authenticate. Do not silently keep
            retrying with stale credentials in the background.
          </li>
          <li>
            <span className="font-medium">Synchronize logout across tabs.</span> If one tab logs out or the server
            revokes the session, every open tab should stop autosave and clear sensitive cached responses. A
            `BroadcastChannel` or the browser `storage` event can coordinate that client-side signal.
          </li>
          <li>
            <span className="font-medium">Step up for risky actions.</span> Exporting data, creating share links,
            deleting documents, or revealing masked secrets should require recent authentication, not just any old
            session.
          </li>
        </ul>

        <div className="my-4 overflow-x-auto rounded-md bg-gray-100 p-3 text-sm dark:bg-gray-700">
          <pre>
            {`Set-Cookie: __Host-session=abc123; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=1800`}
          </pre>
        </div>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Bug className="mr-2" size={24} /> Failure Modes Specific to JSON Editors
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <span className="font-medium">Draft restored before auth check:</span> The app rehydrates the last JSON
            document from browser storage on page load, briefly exposing sensitive content before the server rejects the
            session. Fix it by gating rehydration behind an auth check for protected workspaces.
          </li>
          <li>
            <span className="font-medium">Autosave after permission loss:</span> A user loses access to a document, but
            an old tab keeps sending valid-looking save requests. Fix it with per-request authorization and immediate
            session invalidation on the server.
          </li>
          <li>
            <span className="font-medium">Secret spillage into logs and previews:</span> JSON often contains tokens,
            connection strings, or personal data. Redact known secret fields in logs, analytics, crash reports, and UI
            previews.
          </li>
          <li>
            <span className="font-medium">Unsafe rendering of JSON values:</span> If the editor includes a formatted
            preview or schema-driven UI, never inject raw values as HTML. XSS in a persistent editor is especially
            dangerous because it can steal whatever session state browser code can reach.
          </li>
          <li>
            <span className="font-medium">Shared-device leftovers:</span> Downloaded exports, cached responses, and
            offline drafts can remain on disk after logout. Decide whether protected workspaces should clear local draft
            state on logout or require explicit opt-in for offline persistence.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Eye className="mr-2" size={24} /> Logging, Monitoring, and Response
        </h2>
        <p>
          Persistent editors should log security events around both identity and document activity, but they should not
          casually log full JSON bodies.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Record login, logout, session renewal, failed renewal, and forced revocation events.</li>
          <li>Log document reads, writes, exports, share-link creation, and permission changes with actor and document IDs.</li>
          <li>Alert on token reuse after rotation, repeated save attempts from revoked sessions, or unusual bulk access patterns.</li>
          <li>Keep enough audit detail to investigate incidents without copying raw secrets into logs.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <RefreshCcw className="mr-2" size={24} /> Review Checklist
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Session identifiers live in `HttpOnly` cookies, not `localStorage` or `sessionStorage`.</li>
          <li>Draft persistence works without requiring a long-lived browser-readable token.</li>
          <li>Every document read, save, export, and delete action is authorized on the server.</li>
          <li>Logout and revocation propagate to all open tabs and stop background autosave immediately.</li>
          <li>Expired sessions preserve unsaved work safely instead of silently extending stale auth.</li>
          <li>Logs, previews, and error reports redact sensitive JSON fields.</li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <FileText className="mr-2" size={24} /> Conclusion
        </h2>
        <p>
          The core rule for session security in a persistent JSON editor is straightforward: let the app remember the
          work, not the authority. If the browser stores drafts while the server owns session truth, revocation,
          timeout, and re-authentication keep working even when tabs linger, devices are shared, or the browser
          restores a previous session.
        </p>
      </div>
    </>
  );
}
