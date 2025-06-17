import type { Metadata } from "next";
import {
  Bug,
  ShieldAlert,
  ClockAlert,
  Key,
  Info,
  AlertTriangle, // Corrected import
  Check,
  X,
  Lock,
  Unlock,
  Settings,
  Network,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging JSON Web Tokens: Common Pitfalls and Solutions",
  description:
    "Learn to debug common issues with JSON Web Tokens (JWTs), including signature verification, expiration, and claim validation.",
};

export default function DebuggingJwtArticle() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Debugging JSON Web Tokens: Common Pitfalls and Solutions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Info className="mr-3 text-blue-500" size={28} />
            Understanding JSON Web Tokens (JWTs)
          </h2>
          <p className="mb-4">
            JSON Web Tokens (JWTs, pronounced 'jot') are a compact, URL-safe means of representing claims to be
            transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed
            or encrypted.
          </p>
          <p>
            They are widely used in modern web applications, especially for authorization and information exchange.
            However, working with JWTs isn't always straightforward, and developers often encounter issues during
            implementation and debugging.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Bug className="mr-3 text-red-500" size={28} />
            Common Pitfalls and How to Debug Them
          </h2>

          <div className="space-y-6">
            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ShieldAlert className="mr-2 text-yellow-600" size={24} /> Pitfall 1: Invalid Signature
              </h3>
              <p className="mb-3">
                This is perhaps the most common and critical JWT error. An "invalid signature" error means the token's
                signature doesn't match the expected signature when verified with the secret key or public key. This
                usually indicates that the token has been tampered with or the verification key is incorrect.
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> Server rejects the token with a signature verification error message.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>
                  Using the wrong secret key (for HS256) or public key (for RS256, ES256, etc.) during verification.
                </li>
                <li>The token's header or payload was altered after signing.</li>
                <li>Mismatch in the signing algorithm used between the issuer and the verifier.</li>
                <li>Newline characters or unexpected encoding issues in the key.</li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Verify the Key:</strong> Ensure the secret/public key used for verification exactly matches
                    the key used for signing. Be mindful of leading/trailing whitespace or newline characters in keys
                    read from files or environment variables.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Check the Algorithm (`alg` claim):</strong> Confirm that both the issuer and verifier are
                    configured to use the same signing algorithm specified in the token's header (`alg` claim). Don't
                    allow the `none` algorithm unless explicitly necessary and understood (it disables signature
                    verification).
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Use Online Debuggers (with caution):</strong> Use sites like{" "}
                    <a
                      href="https://jwt.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      jwt.io
                    </a>{" "}
                    to paste your token and see the parsed header and payload. This can help identify issues in the
                    token structure or claims. <AlertTriangle className="inline-block ml-1 text-yellow-600" size={16} />{" "}
                    <em>
                      Never paste sensitive tokens containing real user data into public online tools. Use dummy data
                      tokens for debugging.
                    </em>
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Library Issues:</strong> Ensure you are using a reputable and up-to-date JWT library in your
                    programming language. Sometimes bugs in libraries can cause verification failures.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ClockAlert className="mr-2 text-yellow-600" size={24} /> Pitfall 2: Expired Tokens
              </h3>
              <p className="mb-3">
                JWTs often contain an expiration claim (`exp`) to limit their validity period. Once the current time
                exceeds the `exp` timestamp, the token should be considered invalid.
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> Server rejects the token with an "expired token" or "token lifetime expired"
                error message.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>The token's `exp` claim is set too short.</li>
                <li>The token was held onto by the client for too long before being used or refreshed.</li>
                <li>
                  Significant clock difference between the server issuing the token and the server verifying it (clock
                  skew).
                </li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Check the `exp` Claim:</strong> Decode the token (using a safe offline tool or library) and
                    check the `exp` claim. It's a Unix timestamp (seconds since epoch). Convert it to a human-readable
                    date to see when it expired.
                  </p>
                  <div className="bg-gray-200 p-3 rounded-md my-2 dark:bg-gray-700 text-sm">
                    <p>Example `exp` claim payload:</p>
                    <pre className="overflow-x-auto text-wrap">
                      <code>
                        {`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622 // This is 1 hour after iat
}`}
                      </code>
                    </pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Review Token Lifetime:</strong> Adjust the `exp` time during token issuance if tokens are
                    expiring too quickly for your use case (e.g., session tokens vs. refresh tokens). Consider refresh
                    token mechanisms for longer sessions.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Address Clock Skew:</strong> Ensure that the system clocks on your token-issuing server(s)
                    and token-verifying server(s) are synchronized, preferably using NTP (Network Time Protocol). Many
                    JWT libraries allow a small "leeway" or tolerance for clock skew (e.g., a few minutes).
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Client-Side Logic:</strong> Implement client-side logic to anticipate token expiration and
                    request a new token (using a refresh token, if applicable) before the current one expires.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Info className="mr-2 text-blue-500" size={24} /> Pitfall 3: Incorrect Claims (iss, aud, etc.)
              </h3>
              <p className="mb-3">
                Beyond `exp` and `iat`, JWTs can contain other standard claims (`iss`, `sub`, `aud`, `nbf`, `jti`) and
                custom claims. The server verifying the token should validate these claims based on its expectations.
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> Server rejects the token with messages like "invalid issuer", "invalid
                audience", "token not yet valid", etc.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>The `iss` (issuer) claim doesn't match the expected issuer identity.</li>
                <li>The `aud` (audience) claim doesn't match the identifier of the service verifying the token.</li>
                <li>The `nbf` (not before) claim is in the future, meaning the token is not yet valid.</li>
                <li>Missing or incorrect custom claims required by the application logic.</li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Inspect the Payload:</strong> Decode the token and examine the payload claims. Compare them
                    against the expected values configured on the verifying server.
                  </p>
                  <div className="bg-gray-200 p-3 rounded-md my-2 dark:bg-gray-700 text-sm">
                    <p>Example payload with standard claims:</p>
                    <pre className="overflow-x-auto text-wrap">
                      <code>
                        {`{
  "iss": "https://your-auth-server.com",
  "sub": "user123",
  "aud": "your-api-service",
  "iat": 1516239022,
  "exp": 1516242622,
  "nbf": 1516239000 // Token valid from this time
}`}
                      </code>
                    </pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Configure Verifier Correctly:</strong> Ensure your JWT verification library or framework is
                    configured with the correct expected issuer, audience, and whether to check the "not before" (`nbf`)
                    claim.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Check Token Issuance Logic:</strong> Review the code or configuration that issues the JWTs
                    to ensure the claims are being set correctly according to the specification and your application's
                    requirements.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <AlertTriangle className="mr-2 text-orange-500" size={24} /> Pitfall 4: Algorithm "none" Vulnerability
              </h3>
              <p className="mb-3">
                A significant security pitfall if not handled correctly. If a server trusts the `alg` parameter from the
                token header and allows `none`, an attacker could change the algorithm to `none`, remove the signature,
                and the server would potentially accept the token without verification.
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> An unverified token is accepted by the server as valid. This is a silent
                security failure, not typically a visible error message during legitimate use.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>
                  The JWT verification library or custom code implicitly or explicitly allows the `none` algorithm.
                </li>
                <li>
                  The verifier uses the `alg` claim from the token header to determine which algorithm to use for
                  verification, rather than having a predetermined list of acceptable algorithms.
                </li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Explicitly Define Allowed Algorithms:</strong> Configure your JWT verification logic to
                    accept only specific signing algorithms (e.g., `HS256`, `RS256`). Never allow the verifier to choose
                    the algorithm based on the token's header.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Update Libraries:</strong> Ensure your JWT library is up-to-date, as older versions might
                    have been vulnerable by default.
                  </p>
                </li>
              </ul>
              <div className="bg-gray-200 p-3 rounded-md my-2 dark:bg-gray-700 text-sm">
                <p>
                  Example of rejecting `none` (conceptual Node.js with <code>jsonwebtoken</code>):
                </p>
                <pre className="overflow-x-auto text-wrap">
                  <code>
                    {`jsonwebtoken.verify(token, secretOrPublicKey, { algorithms: ['HS256', 'RS256'] }, function(err, decoded) {
  // ... handle verification result
});`}
                  </code>
                </pre>
                <p className="mt-2">Always pass an explicit array of allowed algorithms.</p>
              </div>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Lock className="mr-2 text-gray-600" size={24} /> Pitfall 5: Storing Tokens Insecurely (e.g., Local
                Storage)
              </h3>
              <p className="mb-3">
                While not a "debugging" error in the traditional sense, where JWTs are stored on the client side is a
                frequent security pitfall leading to vulnerabilities like XSS (Cross-Site Scripting).
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> Security vulnerabilities if the application is susceptible to XSS.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>
                  Storing tokens in `localStorage` or `sessionStorage`. These are accessible by any JavaScript running
                  on the same origin. If an attacker can inject JavaScript via XSS, they can steal the token.
                </li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Use HttpOnly Cookies:</strong> For browser-based applications, store JWTs (or session
                    identifiers linked to server-side sessions authenticated by JWTs) in cookies marked as `HttpOnly`.
                    This prevents JavaScript from accessing the cookie, mitigating XSS risks.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Use Secure Cookies:</strong> Use the `Secure` flag for cookies to ensure they are only sent
                    over HTTPS connections.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Consider SameSite Cookies:</strong> Use the `SameSite` attribute (`Lax` or `Strict`) to
                    protect against CSRF attacks.
                  </p>
                </li>
              </ul>
              <p className="mt-3 flex items-center">
                <Unlock className="mr-2 text-red-500" size={20} />{" "}
                <em>
                  Note: Using HttpOnly cookies might complicate CSRF protection strategies that rely on reading the
                  token (like double-submit cookies). Consider alternative CSRF protection methods when using HttpOnly
                  cookies.
                </em>
              </p>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <AlertTriangle className="mr-2 text-orange-500" size={24} /> Pitfall 6: Using JWTs for CSRF Protection
              </h3>
              <p className="mb-3">
                JWTs themselves do not inherently protect against CSRF (Cross-Site Request Forgery). If stored in
                cookies, the browser will automatically send the cookie with requests to the target domain, including
                forged requests originating from malicious sites.
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> Application is vulnerable to CSRF attacks if authentication relies solely on
                cookies containing the JWT.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Assuming that because JWTs are used, the application is automatically protected from CSRF.</li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Implement Proper CSRF Protection:</strong> Use standard CSRF protection mechanisms like
                    SameSite cookies (`Lax` or `Strict`), CSRF tokens (synchronizer token pattern), or custom request
                    headers that cannot be easily forged by a malicious site.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Header-Based Authentication:</strong> If possible, send the JWT in an `Authorization: Bearer
                    &lt;token&gt;` header instead of a cookie. This mitigates CSRF risk because browsers typically
                    restrict JavaScript from setting arbitrary headers cross-origin (unless CORS permits it). However,
                    this approach complicates token storage security (see Pitfall 5).
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Key className="mr-2 text-yellow-600" size={24} /> Pitfall 7: Key Management Issues
              </h3>
              <p className="mb-3">
                The security of JWTs signed with symmetric keys (like HS256) heavily relies on the secrecy of the key.
                For asymmetric keys (like RS256), the private key must remain secret. Key rotation, storage, and access
                are critical.
              </p>
              <p className="mb-3">
                <strong>Symptoms:</strong> Signature verification failures (see Pitfall 1), security breaches if keys
                are compromised.
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Hardcoding keys in source code.</li>
                <li>Storing keys in insecure locations (e.g., readable logs, unencrypted files).</li>
                <li>Not rotating keys periodically.</li>
                <li>Using different keys for signing and verification unexpectedly.</li>
                <li>Incorrect handling of public/private key pairs.</li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Secure Storage:</strong> Store keys securely, preferably in environment variables, dedicated
                    secrets management systems (AWS Secrets Manager, HashiCorp Vault, etc.), or encrypted configuration
                    files. Avoid checking keys into version control.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Key Rotation:</strong> Implement a key rotation policy. When rotating keys, ensure your
                    system can verify tokens signed with the previous key for a transition period while issuing new
                    tokens with the new key.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Use Asymmetric Keys (RS256, etc.):</strong> If you have multiple services needing to verify
                    tokens issued by one service, asymmetric keys are generally preferred. The issuer keeps the private
                    key secret, and verifiers use the widely distributed public key. This avoids sharing a single secret
                    key among multiple parties.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Check Public/Private Key Pair:</strong> If using asymmetric encryption, double-check that
                    the public key used for verification is the correct pair for the private key used for signing.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-gray-100 rounded-lg dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Network className="mr-2 text-blue-500" size={24} /> Pitfall 8: Network or Transmission Issues
              </h3>
              <p className="mb-3">Sometimes the issue isn't the JWT itself, but how it's transmitted or received.</p>
              <p className="mb-3">
                <strong>Symptoms:</strong> "Missing token" errors, malformed token errors, signature errors (due to
                incomplete tokens).
              </p>
              <p className="mb-3">
                <strong>Causes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Token not included in the `Authorization` header (or wherever expected).</li>
                <li>Incorrect header format (e.g., missing "Bearer ").</li>
                <li>Token truncated during transmission.</li>
                <li>Network proxies or firewalls altering the request/response.</li>
              </ul>
              <p className="mb-2">
                <strong>Solutions:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Use Network Inspector:</strong> Use browser developer tools (Network tab) or tools like
                    `curl` or Postman to inspect the exact HTTP request being sent, ensuring the token is present and
                    correctly formatted in the expected header.
                  </p>
                  <div className="bg-gray-200 p-3 rounded-md my-2 dark:bg-gray-700 text-sm">
                    <p>Correct header format:</p>
                    <pre className="overflow-x-auto text-wrap">
                      <code>{`Authorization: Bearer <your_jwt_token_here>`}</code>
                    </pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Log Raw Token on Server:</strong> Temporarily log the raw token string received by the
                    server before any processing. Compare it to the token string sent by the client to see if they match
                    exactly.
                  </p>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 mt-1 text-green-500" size={18} />
                  <p>
                    <strong>Check Middleware/Proxies:</strong> If using API gateways, load balancers, or other
                    middleware, ensure they are not interfering with the `Authorization` header or the request body.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Bug className="mr-3 text-red-500" size={28} />
            General Debugging Tips
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li className="flex items-start">
              <Info className="mr-2 mt-1 text-blue-500" size={18} />
              <p>
                <strong>Log Everything:</strong> Log the token string (before decoding), the decoded header, the decoded
                payload, the verification result (success/failure), and any error messages from your JWT library. Be
                cautious not to log sensitive tokens in production logs.
              </p>
            </li>
            <li className="flex items-start">
              <Settings className="mr-2 mt-1 text-yellow-600" size={18} />
              <p>
                <strong>Use a Dedicated JWT Library:</strong> Avoid writing your own JWT encoding/decoding/verification
                logic from scratch. Use well-vetted, open-source libraries for your language. They handle nuances and
                security considerations you might miss.
              </p>
            </li>
            <li className="flex items-start">
              <Check className="mr-2 mt-1 text-green-500" size={18} />
              <p>
                <strong>Separate Issuance and Verification Concerns:</strong> Debug the token issuance process
                independently from the verification process. Create a simple script or endpoint that just issues a token
                with specific claims and algorithm, then use another script or endpoint to verify it with the expected
                key.
              </p>
            </li>
            <li className="flex items-start">
              <X className="mr-2 mt-1 text-red-500" size={18} />
              <p>
                <strong>Avoid Guessing:</strong> Don't guess keys, algorithms, or claim values. They must match exactly
                what was configured by the issuer.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Info className="mr-3 text-blue-500" size={28} />
            Conclusion
          </h2>
          <p>
            Debugging JWTs often boils down to meticulously checking the token structure, the signature, the claims
            within the payload, the keys/secrets used for signing and verification, and the surrounding application
            logic and network transmission. By understanding the common pitfalls and applying systematic debugging
            techniques, you can quickly identify and resolve most JWT-related issues, ensuring the security and
            reliability of your authentication and authorization flows.
          </p>
        </section>
      </div>
    </div>
  );
}
