import type { Metadata } from "next";
import {
  AlertTriangle,
  Bug,
  Check,
  ClockAlert,
  Info,
  Key,
  Network,
  Settings,
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging JSON Web Tokens: Common Pitfalls and Solutions",
  description:
    "Debug JWTs faster with a practical guide to malformed tokens, base64url issues, expired claims, issuer and audience mismatches, algorithm mistakes, and JWKS key rotation.",
};

export default function DebuggingJwtArticle() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Debugging JSON Web Tokens: Common Pitfalls and Solutions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Info className="mr-3 text-blue-500" size={28} />
            Start With the Shape of the Token
          </h2>
          <p className="mb-4">
            Most JWT debugging sessions go faster once you stop treating the token as a black box. The current JWT
            spec in{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc7519"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              RFC 7519
            </a>{" "}
            defines JWTs as URL-safe dot-separated segments, and the current best-practice guidance in{" "}
            <a
              href="https://datatracker.ietf.org/doc/rfc8725/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              RFC 8725
            </a>{" "}
            recommends explicit algorithm allow-lists, strict claim validation, and separate rules for different token
            types.
          </p>
          <p>
            In practice, most failures come from six places: malformed compact serialization, wrong key or algorithm,
            time-claim mistakes, issuer or audience mismatches, stale JWKS key rotation, or a transport bug that
            changes the token before verification.
          </p>
        </section>

        <section className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Check className="mr-3 text-green-500" size={28} />
            First-Pass Checklist
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="mr-2 mt-1 text-green-500" size={18} />
              <p>
                Count the segments first. A signed JWT or JWS normally has <strong>3 parts</strong>. An encrypted JWE
                has <strong>5 parts</strong>. If you send a 5-part token into a 3-part verifier, the error often looks
                unrelated.
              </p>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 text-green-500" size={18} />
              <p>
                Decode the header and payload locally before you verify anything. Record <code>alg</code>,{" "}
                <code>kid</code>, <code>typ</code>, <code>iss</code>, <code>aud</code>, <code>sub</code>,{" "}
                <code>exp</code>, <code>nbf</code>, and <code>iat</code>.
              </p>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 text-green-500" size={18} />
              <p>
                Verify with an explicit allow-list of algorithms and the exact expected issuer and audience. Do not let
                the incoming token choose its own validation rules.
              </p>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 text-green-500" size={18} />
              <p>
                Compare the raw token, the selected key, and the system clock. A stale <code>kid</code> lookup or a
                time skew of even a minute can be enough to break validation.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Bug className="mr-3 text-red-500" size={28} />
            Common JWT Pitfalls and Fixes
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
              <h3 className="mb-3 flex items-center text-xl font-semibold">
                <AlertTriangle className="mr-2 text-orange-500" size={24} />
                Pitfall 1: Malformed Token, Base64url Errors, or JWE vs JWS Confusion
              </h3>
              <p className="mb-3">
                RFC 7519 defines JWTs as period-separated base64url segments. That matters because base64url uses{" "}
                <code>-</code> and <code>_</code> instead of <code>+</code> and <code>/</code>, and padding may be
                omitted. A parser that expects regular base64, or code that edits the token by hand, can produce
                misleading "invalid token" or "invalid signature" failures.
              </p>
              <p className="mb-3">
                <strong>Common causes:</strong> copying the entire <code>Authorization</code> header instead of the raw
                token, trimming or wrapping lines, using a standard base64 decoder, or passing a 5-part encrypted JWE
                into a verifier that expects a 3-part signed JWS.
              </p>
              <p className="mb-2">
                <strong>What to do:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Split on periods before anything else. Expect 3 parts for JWS and 5 parts for JWE.</li>
                <li>Use a base64url-aware decoder, not a plain base64 helper copied from unrelated code.</li>
                <li>Strip the leading <code>Bearer </code> prefix exactly once and then compare the raw token bytes.</li>
                <li>Never edit header or payload JSON and then reuse the old signature. Any change invalidates it.</li>
              </ul>
              <div className="my-2 rounded-md bg-gray-200 p-3 text-sm dark:bg-gray-700">
                <p>Quick shape check:</p>
                <pre className="overflow-x-auto text-wrap">
                  <code>
                    {`const raw = authHeader.replace(/^Bearer\\s+/i, "").trim();
const parts = raw.split(".");

if (parts.length === 3) {
  // Signed JWT / JWS
} else if (parts.length === 5) {
  // Encrypted JWT / JWE
} else {
  throw new Error("Malformed JWT compact serialization");
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
              <h3 className="mb-3 flex items-center text-xl font-semibold">
                <ShieldAlert className="mr-2 text-yellow-600" size={24} />
                Pitfall 2: Invalid Signature Because the Key or Algorithm Does Not Match
              </h3>
              <p className="mb-3">
                This is still the most common production failure. The token may be perfectly well-formed, but the
                verifier is using the wrong secret, the wrong public key, or the wrong algorithm family entirely.
              </p>
              <p className="mb-3">
                <strong>Common causes:</strong> verifying an <code>RS256</code> token with an HMAC secret, using the
                wrong environment key, stale PEM files with stray newlines, or letting the incoming <code>alg</code>{" "}
                header influence verification instead of pinning allowed algorithms server-side.
              </p>
              <p className="mb-2">
                <strong>What to do:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Log the decoded header first and record the incoming <code>alg</code> and <code>kid</code>.</li>
                <li>Configure the verifier with an explicit allow-list such as only <code>RS256</code>.</li>
                <li>Confirm that the key type matches the algorithm family: HMAC secret for HS*, public key for RS* or ES*.</li>
                <li>Check key material for whitespace, newline, or copy-paste corruption before assuming the token is bad.</li>
                <li>
                  Reject <code>alg: "none"</code> unless you intentionally support unsecured JWTs inside another
                  trusted cryptographic envelope.
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
              <h3 className="mb-3 flex items-center text-xl font-semibold">
                <ClockAlert className="mr-2 text-yellow-600" size={24} />
                Pitfall 3: Expired, Not-Yet-Valid, or Milliseconds-vs-Seconds Time Claims
              </h3>
              <p className="mb-3">
                RFC 7519 uses <code>NumericDate</code> values for <code>exp</code>, <code>nbf</code>, and{" "}
                <code>iat</code>. Those are seconds since the Unix epoch, not JavaScript milliseconds. That single
                mismatch causes a large share of "token expired" and "token not active" bugs.
              </p>
              <p className="mb-3">
                <strong>Common causes:</strong> storing <code>Date.now()</code> directly in the token, comparing seconds
                to milliseconds during validation, or having issuer and verifier clocks drift apart.
              </p>
              <p className="mb-2">
                <strong>What to do:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Convert application time to seconds with <code>Math.floor(Date.now() / 1000)</code>.</li>
                <li>Inspect whether <code>exp</code> or <code>nbf</code> looks 1000x too large or too small.</li>
                <li>Allow a small clock-skew leeway only when you need it, usually a minute or two.</li>
                <li>Synchronize issuer and verifier clocks with NTP before debugging anything else.</li>
              </ul>
              <div className="my-2 rounded-md bg-gray-200 p-3 text-sm dark:bg-gray-700">
                <p>Sanity check for NumericDate handling:</p>
                <pre className="overflow-x-auto text-wrap">
                  <code>
                    {`const now = Math.floor(Date.now() / 1000);

if (payload.nbf && now < payload.nbf) {
  throw new Error("JWT is not valid yet");
}

if (payload.exp && now >= payload.exp) {
  throw new Error("JWT has expired");
}`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
              <h3 className="mb-3 flex items-center text-xl font-semibold">
                <Info className="mr-2 text-blue-500" size={24} />
                Pitfall 4: Claim Validation Bugs in `iss`, `aud`, `sub`, or Token Type
              </h3>
              <p className="mb-3">
                A token can be correctly signed and still be invalid for your application. The most common example is
                sending the wrong token type to the wrong service, such as an ID token where an API expects an access
                token.
              </p>
              <p className="mb-3">
                <strong>Common causes:</strong> wrong issuer URL for the environment, <code>aud</code> treated as a
                string when it is actually an array, tenant or realm mismatch, or one validator being reused for
                multiple JWT profiles that should be distinct.
              </p>
              <p className="mb-2">
                <strong>What to do:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Log the expected and actual values for <code>iss</code>, <code>aud</code>, and <code>sub</code>.</li>
                <li>Handle both the single-string and array forms of <code>aud</code> correctly.</li>
                <li>Keep separate validation rules for access tokens, ID tokens, and other JWT-based artifacts.</li>
                <li>Use distinct audiences or a checked <code>typ</code> value to reduce cross-token confusion.</li>
                <li>Do not trust authorization claims until signature and claim validation have both passed.</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
              <h3 className="mb-3 flex items-center text-xl font-semibold">
                <Key className="mr-2 text-yellow-600" size={24} />
                Pitfall 5: `kid` Lookup, JWKS Caching, and Key Rotation Problems
              </h3>
              <p className="mb-3">
                If your application verifies JWTs against a JWKS endpoint, signature bugs often appear only after a key
                rotation or only in some regions. The token is valid, but the verifier picked the wrong cached key or
                never fetched the new one.
              </p>
              <p className="mb-3">
                <strong>Common causes:</strong> unknown <code>kid</code>, stale cache entries, duplicate or recycled{" "}
                <code>kid</code> values, or rotating signing keys before older tokens have naturally expired.
              </p>
              <p className="mb-2">
                <strong>What to do:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Log which <code>kid</code> was requested and which key was actually selected.</li>
                <li>Refresh the JWKS cache on an unknown <code>kid</code> before declaring the token invalid.</li>
                <li>Keep previous verification keys available until all tokens signed with them have aged out.</li>
                <li>Make sure your rotation process never reuses a <code>kid</code> for different key material.</li>
                <li>
                  Treat remote key lookup as a controlled integration. RFC 8725 warns against blindly trusting incoming
                  key URLs such as <code>jku</code> or <code>x5u</code>.
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
              <h3 className="mb-3 flex items-center text-xl font-semibold">
                <Network className="mr-2 text-blue-500" size={24} />
                Pitfall 6: Transport Bugs That Change the Token Before Verification
              </h3>
              <p className="mb-3">
                Sometimes the JWT is correct and your verification code is correct, but the token is altered between the
                client, a proxy, and the application. This is why JWT bugs often reproduce in one environment and not
                another.
              </p>
              <p className="mb-3">
                <strong>Common causes:</strong> missing <code>Bearer </code> prefix handling, double URL encoding,
                proxies that drop the <code>Authorization</code> header, multiline environment variables, or logging
                only the normalized token rather than the raw received value.
              </p>
              <p className="mb-2">
                <strong>What to do:</strong>
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Inspect the actual HTTP request in browser devtools, <code>curl</code>, or Postman.</li>
                <li>Compare the raw token string on the sender and receiver, including length.</li>
                <li>Check reverse proxies, API gateways, and middleware for header forwarding rules.</li>
                <li>Redact safely in production logs, but still keep enough data to distinguish truncation from claim failures.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-100 p-5 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Settings className="mr-3 text-yellow-600" size={28} />
            A Practical JWT Debugging Workflow
          </h2>
          <ol className="list-decimal space-y-3 pl-6">
            <li>Capture the raw token before any parsing or normalization.</li>
            <li>Count the segments to distinguish malformed input, JWS, and JWE.</li>
            <li>Decode the visible parts locally and pretty-print the JSON for the header and payload.</li>
            <li>
              Record <code>alg</code>, <code>kid</code>, <code>typ</code>, <code>iss</code>, <code>aud</code>,{" "}
              <code>exp</code>, <code>nbf</code>, and <code>iat</code>.
            </li>
            <li>Re-run verification with an explicit algorithm allow-list and exact expected issuer and audience.</li>
            <li>If you use JWKS, refresh the cache and test both current and previous verification keys.</li>
            <li>Only after all of that should you start suspecting a library bug.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-4 flex items-center text-2xl font-semibold">
            <Info className="mr-3 text-blue-500" size={28} />
            Conclusion
          </h2>
          <p>
            JWT debugging is usually a comparison exercise, not a guessing exercise. Compare the raw token, its shape,
            the decoded claims, the selected key, the allowed algorithms, and the verifier's expected issuer and
            audience. Once those line up, most "mysterious" JWT bugs collapse into one of a few predictable causes.
          </p>
        </section>
      </div>
    </div>
  );
}
