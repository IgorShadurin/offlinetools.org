import type { Metadata } from "next";
import { Lock, Key, CheckCircle, Bug, Gauge, Globe } from "lucide-react";
import React from "react";

export const metadata: Metadata = {
  title: "Secure WebSocket Implementation for Real-time JSON Editors",
  description:
    "Practical WebSocket security guidance for collaborative JSON editors: WSS, browser-safe auth, origin validation, schema checks, rate limits, and session handling.",
};

export default function SecureWebsocketsJsonEditorsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Secure WebSocket Implementation in Real-time JSON Editors</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Build for the Actual Threat Model</h2>
          <p>
            A real-time JSON editor usually keeps a WebSocket open for minutes or hours while multiple users send
            patches, cursor updates, presence signals, and document reloads. That makes it a great fit for low-latency
            collaboration, but it also means a single weak spot can stay exposed for the entire editing session.
          </p>
          <p>
            The safest implementation is not just &quot;use <code>wss://</code>.&quot; It is a layered design: strict
            transport security, browser-compatible authentication, message-level authorization, schema validation,
            origin checks, payload limits, and session revalidation for long-lived connections.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-medium mb-2">What search users usually need from this topic</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>How to authenticate a browser WebSocket without relying on unsafe shortcuts.</li>
              <li>How to stop unauthorized document access and cross-site connection abuse.</li>
              <li>How to validate JSON edit messages before they touch shared document state.</li>
              <li>How to keep a busy editor stable under malformed traffic, flood attempts, and expired sessions.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Practical Security Checklist</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use only <code>wss://</code> in production and terminate TLS on the same trusted boundary as HTTPS.</li>
            <li>Authenticate with a browser-safe pattern such as a secure session cookie or a short-lived token.</li>
            <li>Authorize every document join, edit operation, and sensitive JSON path, not just the initial connect.</li>
            <li>Validate each message envelope against a schema before parsing it into business logic.</li>
            <li>Enforce maximum payload size, per-user connection caps, and separate rate limits for edits vs. presence.</li>
            <li>Allow only expected <code>Origin</code> values and close connections that fail policy checks.</li>
            <li>Re-check session validity during long editing sessions and close sockets after logout or permission changes.</li>
            <li>Log failures with request identifiers, but redact tokens, cookies, and raw sensitive document values.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Lock className="w-6 h-6 mr-2 text-blue-500" /> Transport and Handshake Basics
          </h2>
          <p>
            Start with <code>wss://</code> everywhere. Browsers already treat insecure mixed-content connections
            harshly, and an editor that loads over HTTPS should never downgrade its collaborative channel to{" "}
            <code>ws://</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-medium mb-2">Current deployment guidance</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Terminate TLS at your edge proxy or application server and forward the upgraded request deliberately.</li>
              <li>Return normal HTTP auth or policy errors before the upgrade if the request is already invalid.</li>
              <li>
                Negotiate one explicit subprotocol such as <code>json-editor.v1</code> so both sides agree on message
                format and versioning.
              </li>
              <li>
                Disable WebSocket compression unless you have measured a real need for it; large, compressible JSON
                payloads can amplify memory and CPU pressure.
              </li>
            </ul>
          </div>
          <p>
            A secure handshake is also a good place to reject obviously bad requests early: wrong path, missing
            document identifier, unsupported subprotocol, or a connection attempt from an unexpected origin.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Key className="w-6 h-6 mr-2 text-blue-500" /> Authentication and Authorization
          </h2>
          <p>
            Authentication advice for WebSockets is easy to get wrong because browser clients are more limited than
            server-side libraries. In a browser, the standard <code>WebSocket()</code> constructor accepts a URL and an
            optional list of subprotocols, but not arbitrary request headers.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-medium mb-2">Recommended browser-safe authentication patterns</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Secure session cookie:</strong> Good for same-site apps. Pair it with exact{" "}
                <code>Origin</code> validation and cookie settings such as <code>HttpOnly</code>, <code>Secure</code>,
                and the strictest usable <code>SameSite</code> policy.
              </li>
              <li>
                <strong>Short-lived token in the first application message:</strong> Keep the socket untrusted until the
                server validates the token and binds the connection to a user and document scope.
              </li>
              <li>
                <strong>Query-string token only when necessary:</strong> Use only short-lived tokens, and make sure
                access logs, traces, and error reporting redact the parameter.
              </li>
            </ul>
            <p className="mt-3">
              Server-to-server or native clients may be able to send custom headers, but browser-based JSON editors
              usually cannot. Designing around that constraint avoids fragile auth flows.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Authorize Every Action, Not Just the Socket</h3>
          <p>
            A successful connection only proves identity. It does not mean the user can edit every document or every
            field inside a document. Real-time editors need per-message authorization checks for both document scope and
            operation scope.
          </p>
          <pre className="bg-white p-3 rounded mt-4 dark:bg-gray-900 overflow-x-auto">
            <code className="language-typescript">
              {`type ConnectionState = {
  userId: string | null;
  docId: string | null;
  role: "viewer" | "editor" | "owner" | null;
};

function handleMessage(state: ConnectionState, rawMessage: string) {
  const message = JSON.parse(rawMessage);

  if (message.type === "auth") {
    const session = verifyShortLivedToken(message.token);
    state.userId = session.userId;
    state.docId = session.docId;
    state.role = session.role;
    return;
  }

  if (!state.userId || !state.docId || !state.role) {
    throw new Error("Unauthenticated connection");
  }

  if (message.type === "patch") {
    if (state.role === "viewer") {
      throw new Error("Read-only connection");
    }

    if (!canEditJsonPath(state.userId, state.docId, message.path)) {
      throw new Error("Forbidden JSON path");
    }

    applyPatch(state.docId, message);
  }
}`}
            </code>
          </pre>
          <p className="mt-3">
            This is especially important when some collaborators are read-only, some can edit only certain branches,
            and administrators can touch sensitive paths such as feature flags or billing settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-blue-500" /> Validate Message Envelopes and JSON Edits
          </h2>
          <p>
            Treat every frame as untrusted input. In a collaborative editor, the server should validate the message
            envelope first, then validate the operation against the current document state.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-2">What to Validate</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Allowed message type such as <code>auth</code>, <code>patch</code>, <code>presence</code>, or <code>ping</code>.</li>
            <li>Required identifiers such as <code>docId</code>, <code>opId</code>, and expected version numbers.</li>
            <li>Allowed JSON Pointer or path targets, with explicit deny rules for sensitive branches.</li>
            <li>Maximum string length, object depth, array size, and overall payload size.</li>
            <li>Whether the patch still applies cleanly to the current server version of the document.</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-medium mb-2">Schema-first validation keeps the hot path safer</p>
            <pre className="bg-white p-3 rounded mt-2 dark:bg-gray-900 overflow-x-auto">
              <code className="language-typescript">
                {`import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, removeAdditional: false });

const patchSchema = {
  type: "object",
  additionalProperties: false,
  required: ["type", "docId", "opId", "path", "value"],
  properties: {
    type: { const: "patch" },
    docId: { type: "string", minLength: 1, maxLength: 128 },
    opId: { type: "string", minLength: 1, maxLength: 64 },
    path: { type: "string", pattern: "^/(content|settings|metadata)(/.*)?$" },
    value: {},
  },
};

const validatePatch = ajv.compile(patchSchema);`}
              </code>
            </pre>
            <p className="mt-3">
              Validation is not the same as sanitization. If a JSON string may later be rendered into HTML, escape or
              sanitize it at render time too.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Bug className="w-6 h-6 mr-2 text-blue-500" /> Safe Failure for Malformed or Hostile Traffic
          </h2>
          <p>
            Invalid JSON, unsupported message types, and stale patch versions are normal events on the public internet.
            Your server should reject them predictably instead of crashing, leaking internals, or silently corrupting
            shared state.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-medium mb-2">Good failure behavior</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Wrap JSON parsing and message dispatch in <code>try...catch</code>.</li>
              <li>Send compact, structured error codes instead of stack traces.</li>
              <li>Count repeated protocol violations and close abusive connections with a policy error.</li>
              <li>Do not apply partial edits when validation or authorization fails midway through processing.</li>
            </ul>
          </div>
          <pre className="bg-white p-3 rounded mt-4 dark:bg-gray-900 overflow-x-auto">
            <code className="language-typescript">
              {`socket.on("message", (rawMessage) => {
  try {
    const message = JSON.parse(rawMessage.toString());
    routeMessage(socketState, message);
  } catch (error) {
    socketState.invalidMessageCount += 1;
    sendError(socket, "invalid_message");

    if (socketState.invalidMessageCount >= 3) {
      socket.close(1008, "Too many invalid messages");
    }
  }
});`}
            </code>
          </pre>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Gauge className="w-6 h-6 mr-2 text-blue-500" /> Rate Limits, Payload Caps, and Connection Hygiene
          </h2>
          <p>
            Flood protection for WebSockets is broader than a simple requests-per-second rule. Real-time editors need
            guardrails for message frequency, payload size, idle connections, and fan-out pressure when one user causes
            updates to be broadcast to many others.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="font-medium mb-2">Reasonable controls for a collaborative JSON editor</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Set a strict maximum frame or message size for edit traffic and reject oversized bodies early.</li>
              <li>Use tighter limits for expensive operations than for lightweight cursor or presence updates.</li>
              <li>Cap concurrent sockets per user and per document to reduce tab-spam and reconnect storms.</li>
              <li>Use ping/pong or heartbeats so dead connections do not stay trusted forever behind proxies.</li>
              <li>Watch backpressure on broadcast queues and drop or batch noisy low-value events before edits.</li>
            </ul>
          </div>
          <p>
            If your editor accepts large JSON documents, validate and version them over HTTP first when possible, then
            reserve WebSocket traffic for smaller incremental operations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-blue-500" /> Origin Validation and Long-lived Session Handling
          </h2>
          <p>
            Browsers send an <code>Origin</code> header with the WebSocket handshake. Checking it matters because a
            malicious site can still try to open a socket to your endpoint from the victim&apos;s browser. If your app
            relies on cookies and you skip origin validation, you make that attack much easier.
          </p>
          <pre className="bg-white p-3 rounded mt-4 dark:bg-gray-900 overflow-x-auto">
            <code className="language-typescript">
              {`function allowConnection(request: IncomingMessage) {
  const allowedOrigins = new Set([
    "https://offlinetools.org",
    "https://staging.offlinetools.org",
  ]);

  const origin = request.headers.origin;
  const subprotocol = request.headers["sec-websocket-protocol"];

  if (!origin || !allowedOrigins.has(origin)) {
    return { ok: false, status: 403, reason: "origin_not_allowed" };
  }

  if (subprotocol !== "json-editor.v1") {
    return { ok: false, status: 426, reason: "unsupported_subprotocol" };
  }

  const session = validateSessionCookie(request);
  if (!session) {
    return { ok: false, status: 401, reason: "auth_required" };
  }

  return { ok: true, session };
}`}
            </code>
          </pre>
          <p className="mt-3">
            For long-running editors, treat authentication as renewable state rather than a one-time handshake decision.
            Re-check session expiry, document membership, and revoked permissions whenever the user resumes activity or
            after a fixed interval.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Common Production Issues</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Works in a CLI client but fails in the browser:</strong> Browser rules are stricter. Check
              <code>Origin</code> handling, cookie settings, and whether your auth design assumes custom request
              headers that a browser cannot send.
            </li>
            <li>
              <strong>Users get disconnected behind a proxy:</strong> Review idle timeout settings on the load balancer
              and add heartbeats so trusted connections stay fresh.
            </li>
            <li>
              <strong>Auth randomly fails after long sessions:</strong> Rotate or revalidate session state explicitly
              instead of assuming the original connection remains authorized forever.
            </li>
            <li>
              <strong>CPU spikes on busy documents:</strong> Lower payload caps, batch noisy presence updates, and avoid
              compressing every large JSON frame by default.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p>
            A secure WebSocket implementation for a real-time JSON editor depends on several small decisions made well:
            authenticate with a browser-compatible flow, validate exact origins, authorize every edit, reject malformed
            messages predictably, and keep long-lived connections on a short operational leash. When those controls are
            in place, WebSockets stay fast without becoming the weakest part of the editor.
          </p>
        </section>
      </div>
    </>
  );
}
