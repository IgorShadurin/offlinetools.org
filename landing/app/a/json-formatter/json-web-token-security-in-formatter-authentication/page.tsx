import type { Metadata } from "next";
import { ShieldCheck, AlertTriangle, Key, Clock, UserCheck, Ban, Cookie, Server, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Web Token Security in Formatter Authentication",
  description:
    "Understand the security considerations, potential vulnerabilities, and best practices for using JSON Web Tokens (JWT) in authentication flows, especially relevant for data processing services like formatters.",
};

export default function JwtSecurityPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShieldCheck className="w-8 h-8 mr-3 text-green-600" /> JSON Web Token Security in Formatter Authentication
      </h1>

      <div className="space-y-6">
        <p>
          JSON Web Tokens (JWTs) have become a popular choice for implementing stateless authentication mechanisms in web applications and APIs. They are compact, URL-safe, and designed to transmit information between parties as a JSON object. When building services like data formatters, which might receive sensitive user data or configuration alongside authentication credentials, securing the authentication layer with JWTs is critical.
        </p>
        <p>
          This guide covers the fundamental aspects of JWT security, common vulnerabilities, and best practices specifically tailored for scenarios involving services that process potentially sensitive data, like a formatter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-blue-600" /> What is a JWT?
        </h2>
        <p>
          A JWT is a string typically composed of three parts, separated by dots (<code>.</code>):
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Header:</strong> Contains metadata about the token, including the type of token (JWT) and the signing algorithm used (e.g., HS256, RS256).
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                <code>
                  &#x7b;{`
  "alg": "HS256",
  "typ": "JWT"
`}&#x7d;
                </code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Payload:</strong> Contains the &quot;claims&quot;. Claims are statements about an entity (typically the user) and additional metadata. Common claims include <code>iss</code> (issuer), <code>exp</code> (expiration time), <code>sub</code> (subject), <code>aud</code> (audience), and custom data.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                <code>
                  &#x7b;{`
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622,
  "role": "formatter_user"
`}&#x7d;
                </code>
              </pre>
            </div>
          </li>
          <li>
            <strong>Signature:</strong> Created by taking the encoded Header, the encoded Payload, a secret key (for HS256) or a private key (for RS256), and the algorithm specified in the header. The signature is used to verify that the sender of the JWT is who it says it is and that the message hasn&apos;t been altered along the way.
          </li>
        </ol>
        <p>
          These three parts are base64Url encoded and concatenated with dots to form the final JWT string: <code>encodedHeader.encodedPayload.signature</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Server className="w-6 h-6 mr-2 text-blue-600" /> JWTs in Authentication (Formatter Context)
        </h2>
        <p>
          In a typical authentication flow for a formatter service:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>The user authenticates with credentials (username/password) to an Authentication Server (or your backend).</li>
          <li>Upon successful authentication, the server issues a JWT containing user identifiers and perhaps roles or permissions in the payload.</li>
          <li>The client stores this JWT (e.g., in memory, `localStorage`, or an HTTP-only cookie).</li>
          <li>For subsequent requests to the formatter API (e.g., <code>/api/format</code>), the client sends the JWT, typically in the <code>Authorization: Bearer &lt;token&gt;</code> header.</li>
          <li>The formatter backend receives the request, extracts the JWT, validates its signature and claims.</li>
          <li>If validation succeeds, the backend uses the information from the payload (e.g., user ID) to authorize the request and perform the requested formatting operation.</li>
        </ol>
        <p>
          The key benefit here is statelessness on the backend processing the requests (the formatter API doesn&apos;t need session state; it relies solely on the token).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" /> Common JWT Security Vulnerabilities
        </h2>
        <p>
          Despite their popularity, JWTs are not inherently secure. Their security depends entirely on how they are implemented and handled. Misconfigurations can lead to serious vulnerabilities.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 1. Sensitive Data in Payload
        </h3>
        <p>
          <strong>JWT payloads are only Base64Url encoded, NOT encrypted.</strong> Anyone intercepting the token can easily decode the header and payload.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> Storing sensitive personal information, database IDs (that are not intended to be public), or critical permissions in the payload exposes this data to anyone who gains access to the token string (e.g., via logs, client-side storage inspection, network sniffing without HTTPS).
          </li>
          <li>
            <strong>Formatter Context:</strong> If the payload includes data specific to the formatting task that shouldn&apos;t be public (e.g., internal user group IDs, specific license details used for formatting rules), this could be exposed.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 2. Weak or Compromised Signing Keys
        </h3>
        <p>
          The security of the signature relies on the secrecy and strength of the key used (for symmetric algorithms like HS256) or the private key (for asymmetric algorithms like RS256).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> If an attacker guesses a weak key or obtains the key through a data breach, they can forge arbitrary JWTs, impersonating any user, including administrators.
          </li>
          <li>
            <strong>Formatter Context:</strong> Forged tokens could grant unauthorized access to formatting features, allow modification of user settings related to formatting, or even enable denial-of-service by sending maliciously crafted requests appearing to come from legitimate users.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 3. Algorithm Confusion Attacks (`"alg":"none"`)
        </h3>
        <p>
          Early JWT libraries might trust the <code>alg</code> parameter in the header to determine the algorithm used for verification.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> An attacker can change the algorithm in the header to <code>"none"</code>, remove the signature, and the server might accept the token as valid without any signature verification. They could also change the algorithm to a symmetric one (like HS256) and try to sign it using the server&apos;s public key (if using RS256).
          </li>
          <li>
            <strong>Mitigation (Crucial):</strong> The server MUST ignore the <code>alg</code> parameter in the header and enforce the algorithm it expects the token to be signed with (the one corresponding to its verification key).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 4. Lack of Token Validation (Signature, Expiry, Claims)
        </h3>
        <p>
          Simply decoding the payload is not enough. The token must be fully validated on *every* request to the protected resource.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> Failing to check the signature allows forged tokens. Failing to check the <code>exp</code> (expiration) claim allows attackers to use old, expired tokens. Failing to check <code>iss</code> (issuer) or <code>aud</code> (audience) allows tokens issued for other purposes or services to be used on your formatter API.
          </li>
          <li>
            <strong>Formatter Context:</strong> An expired token could still be used, or a token issued by a completely different (potentially malicious) service could be accepted.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 5. Insecure Client-Side Storage (e.g., `localStorage`)
        </h3>
        <p>
          Storing JWTs in browser <code>localStorage</code> or <code>sessionStorage</code> makes them accessible via JavaScript running on the page.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> If your application has an Cross-Site Scripting (XSS) vulnerability, an attacker can execute malicious JavaScript that steals the JWT from storage and sends it to their server.
          </li>
          <li>
            <strong>Formatter Context:</strong> A stolen token can be used by the attacker to impersonate the user, potentially processing malicious data or abusing the formatter service under the legitimate user&apos;s identity.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 6. Cross-Site Request Forgery (CSRF)
        </h3>
        <p>
          While JWTs in the <code>Authorization</code> header are generally safe from traditional form-based CSRF attacks, if JWTs are stored in cookies, they can be vulnerable.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> If the JWT is sent automatically in a cookie with cross-site requests, an attacker can craft a malicious page that tricks the user&apos;s browser into sending a request to your formatter API with the user&apos;s authenticated cookie.
          </li>
          <li>
            <strong>Formatter Context:</strong> An attacker could force a user to trigger a formatting operation they didn&apos;t intend, potentially wasting their quota or processing malicious input.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" /> 7. Lack of Token Revocation
        </h3>
        <p>
          By design, JWTs are stateless. Once signed and issued, a valid token (based on expiry) is typically accepted until it expires.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Vulnerability:</strong> If a user logs out, changes their password, or their account is suspended, their active JWT might still be valid and usable until its expiration time. Similarly, if a token is compromised, there&apos;s no built-in way to invalidate it immediately.
          </li>
          <li>
            <strong>Formatter Context:</strong> A compromised or outdated token could still be used to access the formatter service, even after the user has taken action (like changing password) that they believe should invalidate sessions.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldCheck className="w-6 h-6 mr-2 text-green-600" /> Best Practices for Secure JWT Implementation
        </h2>
        <p>
          Implementing JWT security correctly requires careful attention on both the server (issuing and validating) and client (storing and sending) sides.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" /> 1. Minimal, Non-Sensitive Payload
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Only include essential, non-sensitive information required for authorization (e.g., user ID, role, necessary permissions flags).</li>
          <li>Never put passwords, secrets, credit card numbers, or full sensitive user data in the payload.</li>
          <li>If sensitive data is needed during the request, retrieve it from your database based on the user ID in the payload *after* validation.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Key className="w-5 h-5 mr-2 text-blue-600" /> 2. Use Strong Signing Algorithms and Secure Keys
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Prefer algorithms like RS256 (asymmetric) over HS256 (symmetric) if multiple services need to validate tokens but only one issues them. The issuer keeps the private key, others use the public key to verify. This prevents compromise of verification services from allowing token forging.</li>
          <li>If using HS256, ensure the shared secret is strong (long, random) and kept strictly confidential.</li>
          <li>Store signing keys securely, preferably using hardware security modules (HSMs) or managed secrets services.</li>
          <li>Rotate keys periodically.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Server className="w-5 h-5 mr-2 text-blue-600" /> 3. Server-Side Enforcement of Algorithm
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Your JWT validation library/code MUST ignore the <code>alg</code> claim in the token header.</li>
          <li>It should be configured to verify the token using only the specific algorithm and key you expect (e.g., always verify with RS256 using your public key, or always with HS256 using your secret).</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium">Conceptual Validation Logic (Server-Side):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`
// Example using a hypothetical JWT library (replace with actual library like 'jsonwebtoken' in Node.js)

import { verifyToken } from 'your-jwt-library'; // Assuming this library exists

const JWT_SECRET = process.env.JWT_SECRET; // For HS256
// OR
// const PUBLIC_KEY = process.env.PUBLIC_KEY; // For RS256

export function validateJwt(token: string): any | null {
  try {
    // IMPORTANT: Configure the library to specifically expect HS256 or RS256
    // Do NOT let the library decide the algorithm based on the token header
    const options = {
      algorithms: ['HS256'], // Explicitly define accepted algorithm(s)
      // audience: 'your-formatter-api', // Optional: Validate audience
      // issuer: 'your-auth-server',   // Optional: Validate issuer
      // ignoreExpiration: false,       // Ensure expiry is checked (usually default)
      // ignoreNotBefore: false         // Ensure nbf is checked (usually default)
    };

    // Use the CORRECT key based on the algorithm
    const decodedPayload = verifyToken(token, JWT_SECRET, options); // For HS256

    // OR

    // const decodedPayload = verifyToken(token, PUBLIC_KEY, options); // For RS256

    // Additional custom checks on payload claims if necessary
    if (decodedPayload && typeof decodedPayload === 'object') {
        // Example: Check if user role is valid for this service
        if (decodedPayload.role !== 'formatter_user' && decodedPayload.role !== 'admin') {
             console.warn("Invalid role in JWT payload:", decodedPayload.role);
             return null; // Invalid token due to custom claim check
        }
        return decodedPayload; // Token is valid
    }

    return null; // Should not happen if verifyToken throws on invalid, but good practice
  } catch (error: any) {
    console.error("JWT validation failed:", error.message);
    return null; // Token is invalid (expired, bad signature, wrong format, etc.)
  }
}

// Example usage in a Next.js API route handler:
// import { NextApiRequest, NextApiResponse } from 'next';
// import { validateJwt } from '../../utils/jwtUtils'; // Assuming validateJwt is in a utils file

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization header missing' });
//   }

//   const token = authHeader.split(' ')[1]; // Expects "Bearer TOKEN"
//   if (!token) {
//     return res.status(401).json({ message: 'Token missing from Authorization header' });
//   }

//   const user = validateJwt(token); // Get decoded payload if valid, null otherwise

//   if (!user) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }

//   // Token is valid, proceed with request using user data from payload
//   console.log("Authenticated user ID:", user.sub);
//   console.log("Authenticated user role:", user.role);

//   // Your formatter logic here...
//   res.status(200).json({ message: 'Data formatted successfully', userData: user });
// }
`}
            </pre>
          </div>
        </div>


        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" /> 4. Validate All Standard Claims (Expiry, NBF, Issuer, Audience)
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Always check the <code>exp</code> (expiration time) claim. Tokens should have a relatively short lifespan (e.g., 15-30 minutes) to minimize the window for compromise.</li>
          <li>Check the <code>nbf</code> (not before) claim if present, ensuring the token is not used prematurely.</li>
          <li>Validate the <code>iss</code> (issuer) claim to ensure the token was issued by your trusted authority.</li>
          <li>Validate the <code>aud</code> (audience) claim to ensure the token is intended for your specific service (the formatter API). This prevents tokens issued for a different service within your ecosystem from being used on the formatter.</li>
          <li>Most JWT libraries handle these standard validations automatically when you provide the correct options.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Ban className="w-5 h-5 mr-2 text-red-500" /> 5. Implement Token Revocation (When Necessary)
        </h3>
        <p>
          While challenging for stateless JWTs, revocation is necessary for security events like logout, password change, or account suspension.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Maintain a server-side blocklist (denylist) of invalidated tokens. This could be a database or cache like Redis.</li>
          <li>On every request, after initial validation, check if the token&apos;s unique ID (<code>jti</code> claim, if included) is in the blocklist. If it is, reject the request.</li>
          <li>This introduces a state dependency, but it&apos;s a common and necessary compromise for practical security.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Cookie className="w-5 h-5 mr-2 text-red-600" /> 6. Secure Token Storage on the Client (For Browser Apps)
        </h3>
        <p>
          For browser-based applications interacting with your formatter API:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Storing JWTs in HTTP-only cookies is generally preferred over `localStorage` or `sessionStorage` because they are not accessible via JavaScript (mitigating XSS risks).</li>
          <li>Ensure cookies use the `Secure` flag (requires HTTPS) and `SameSite=Strict` (or `Lax`) to mitigate CSRF.</li>
          <li>If you must use `localStorage` (e.g., for mobile apps or specific architectures), implement strong Content Security Policies (CSP) and rigorous input sanitization to prevent XSS.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <UserCheck className="w-5 h-5 mr-2 text-blue-600" /> 7. Use Refresh Tokens Securely
        </h3>
        <p>
          To balance short-lived access tokens (for security) with user convenience (avoiding frequent logins), use refresh tokens.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Access tokens (JWTs) should be short-lived (minutes).</li>
          <li>Refresh tokens should be long-lived (days/weeks/months), used only once to obtain a new access token and a new refresh token.</li>
          <li>Refresh tokens MUST be stored securely (e.g., HTTP-only cookies) and validated server-side against a database, linked to a user session, and potentially rotated after use.</li>
          <li>If a refresh token is compromised, it should be immediately invalidated server-side.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" /> 8. Implement Necessary Security Measures
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>HTTPS:</strong> Always transmit JWTs over HTTPS to prevent interception.</li>
          <li><strong>CORS:</strong> Configure Cross-Origin Resource Sharing (CORS) headers correctly on your formatter API to only allow requests from trusted origins.</li>
          <li><strong>Rate Limiting:</strong> Apply rate limiting to authentication endpoints and potentially to the formatter API itself to prevent brute-force attacks or abuse.</li>
          <li><strong>Input Validation:</strong> Sanitize and validate all input received by the formatter API, regardless of authentication, to prevent injection attacks or processing of malicious data formats.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldCheck className="w-6 h-6 mr-2 text-green-600" /> Conclusion
        </h2>
        <p>
          JSON Web Tokens are a powerful tool for stateless authentication, offering convenience and scalability. However, their security is not automatic. Developers building services like data formatters that handle potentially sensitive information must be acutely aware of the potential vulnerabilities and diligently apply best practices. This includes keeping payloads minimal, using strong keys and algorithms, strictly validating tokens server-side (especially the signature, expiry, and enforced algorithm), handling tokens securely on the client, and implementing necessary supporting security measures like HTTPS and rate limiting. By following these guidelines, you can leverage the benefits of JWTs while protecting your formatter service and user data.
        </p>
      </div>
    </>
  );
}
