import type { Metadata } from "next";
import { Shield, Lock, CheckCircle, AlertTriangle, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "Preventing JSON CSRF Attacks with Proper Design | Web Security",
  description:
    "Learn how to protect your APIs and web applications from JSON Cross-Site Request Forgery (CSRF) attacks through effective design patterns and security measures.",
};

export default function JsonCsrfPreventionPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-3 h-8 w-8 text-green-600" /> Preventing JSON CSRF Attacks
      </h1>

      <div className="space-y-6">
        <p>
          Cross-Site Request Forgery (CSRF) is a type of malicious exploit where unauthorized commands are transmitted
          from a user that the web application trusts. While often associated with traditional HTML form submissions
          that trigger state-changing actions via GET or POST requests with URL-encoded or multipart bodies, APIs that
          accept JSON payloads are also vulnerable, especially if not properly designed and secured. This page explores
          the nature of JSON CSRF and how to defend against it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-yellow-600" /> Understanding JSON CSRF
        </h2>
        <p>
          A JSON CSRF attack occurs when a malicious website tricks a user&apos;s browser into making an unintended
          request to a web application where the user is currently authenticated. If the application&apos;s API endpoint
          accepts a JSON payload and relies solely on session cookies (which browsers automatically attach to requests
          for the target domain), the malicious request can be indistinguishable from a legitimate one from the
          server&apos;s perspective, leading to unauthorized actions.
        </p>
        <p>
          Traditionally, CSRF attacks leveraged HTML <code>&lt;form&gt;</code> elements or image tags (
          <code>&lt;img&gt;</code>) to trigger simple GET/POST requests with limited content types (
          <code>application/x-www-form-urlencoded</code> or <code>multipart/form-data</code>). However, modern APIs
          frequently use JSON (<code>application/json</code>), which cannot be sent via simple GET/POST HTML forms
          without JavaScript. This requires the attacker to use JavaScript on the malicious page.
        </p>

        <h3 className="text-xl font-semibold mt-6">How a JSON CSRF Attack Might Work:</h3>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            A user is logged into an application (e.g., <code>bank.com</code>). Their browser has a session cookie for{" "}
            <code>bank.com</code>.
          </li>
          <li>
            The user visits a malicious website (e.g., <code>attacker.com</code>).
          </li>
          <li>
            The malicious website contains JavaScript that creates and submits a request to a sensitive endpoint on{" "}
            <code>bank.com</code> (e.g., <code>POST /api/transfer-funds</code>) using
            <code>XMLHttpRequest</code> or <code>Fetch API</code>.
          </li>
          <li>
            The JavaScript crafts a request with a JSON body, for example:
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                {`fetch('https://bank.com/api/transfer-funds', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Browser automatically attaches cookies for bank.com
  },
  body: JSON.stringify({
    recipient: 'attacker_account',
    amount: 1000
  })
});`}
              </pre>
            </div>
          </li>
          <li>
            The browser automatically includes the session cookie for <code>bank.com</code> with this request.
          </li>
          <li>
            If <code>bank.com</code> relies only on the cookie for authentication and doesn&apos;t validate the request
            source or origin, it will process the request as if it came from the legitimate user.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lock className="mr-2 h-6 w-6 text-blue-600" /> Prevention Strategies
        </h2>
        <p>
          Defending against JSON CSRF requires measures beyond just relying on cookies. Here are several strategies,
          often used in combination, to protect your endpoints:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> 1. Check the <code>Content-Type</code> Header
        </h3>
        <p>
          While older CSRF attacks were limited to simple content types, JavaScript-based requests can set arbitrary
          headers, including <code>Content-Type: application/json</code>. However, many web frameworks and server-side
          libraries by default only parse the request body as JSON if this specific header is present.
        </p>
        <p>
          Requests triggered by simple HTML forms (without JavaScript) typically send
          <code>application/x-www-form-urlencoded</code> or <code>multipart/form-data</code>. A server configured to
          only accept JSON payloads when the <code>Content-Type</code> is explicitly <code>application/json</code> can
          reject form-based CSRF attempts. This doesn&apos;t stop JavaScript-based JSON CSRF, but it&apos;s a basic
          step.
        </p>
        <p className="italic text-sm text-gray-600 dark:text-gray-400">
          Note: Some older or non-standard browser behaviors might still allow sending
          <code>application/json</code> with simpler methods, but this is less common now.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> 2. Check the <code>Origin</code> or{" "}
          <code>Referer</code> Header
        </h3>
        <p>
          Modern browsers include the <code>Origin</code> header in cross-origin requests (including those made via
          Fetch or XMLHttpRequest). This header indicates the origin (scheme, hostname, port) of the page that initiated
          the request. Similarly, the <code>Referer</code> header (though can be controlled or suppressed by the
          user/browser settings) might also contain the origin.
        </p>
        <p>
          Your server can check these headers to ensure the request originated from your legitimate domain(s). If the{" "}
          <code>Origin</code> or <code>Referer</code> does not match your expected origin, the request should be
          rejected.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Server-Side Check:</h4>
          <pre>
            {`// Example in a Node.js/Express-like framework
function checkOrigin(req, res, next) {
  const origin = req.headers['origin']; // Or req.headers['referer']
  const allowedOrigins = ['https://your-app.com', 'https://subdomain.your-app.com']; // Configure your allowed origins

  if (!origin || allowedOrigins.includes(origin)) {
    // Request is from a trusted origin or a same-origin request (origin might be null/undefined)
    next();
  } else {
    // Request is from an untrusted origin
    res.status(403).send('CSRF detected: Invalid Origin header');
  }
}`}
          </pre>
        </div>
        <p className="italic text-sm text-gray-600 dark:text-gray-400">
          Caution: The <code>Referer</code> header is not always reliable due to privacy settings or proxies. The{" "}
          <code>Origin</code> header is generally preferred for this purpose for modern browsers.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> 3. Use CSRF Tokens (Synchronizer Token Pattern)
        </h3>
        <p>This is a widely used and effective defense. It involves:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            When a user requests a page (e.g., a form or a page making API calls), the server embeds a unique, randomly
            generated token within the page content.
          </li>
          <li>This same token is also stored server-side, typically in the user&apos;s session.</li>
          <li>
            When the user&apos;s browser makes a state-changing request (e.g., a POST, PUT, DELETE request), the token
            is sent back to the server, either in a hidden form field (for HTML forms), a custom HTTP header (common for
            AJAX/JSON requests), or as part of the request body/query parameters.
          </li>
          <li>
            The server verifies that the token received in the request matches the token stored in the user&apos;s
            session. If they don&apos;t match, the request is rejected.
          </li>
        </ul>
        <p>
          For JSON APIs consumed by frontends using Fetch or XMLHttpRequest, sending the token in a custom HTTP header
          (like <code>X-CSRF-Token</code> or <code>X-Requested-With</code>) is a standard approach. Browsers enforce the
          Same-Origin Policy for custom headers, meaning malicious cross-origin JavaScript cannot add arbitrary custom
          headers to a request without a preflight CORS request (which the server can then deny).
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Conceptual Frontend (JavaScript) and Server-Side Snippets:</h4>
          <p className="font-medium mb-1">
            Frontend (after obtaining the token, e.g., from a meta tag or initial API call):
          </p>
          <pre>
            {`const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

fetch('/api/sensitive-action', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken, // Send token in custom header
  },
  body: JSON.stringify({ data: '...' })
});`}
          </pre>
          <p className="font-medium mb-1 mt-3">Server-Side (Verification):</p>
          <pre>
            {`// Example in a Node.js/Express-like framework
function verifyCsrfToken(req, res, next) {
  const clientToken = req.headers['x-csrf-token']; // Get token from header
  const serverToken = req.session.csrfToken; // Get token from session

  if (clientToken && serverToken && clientToken === serverToken) {
    // Token is valid
    next();
  } else {
    // Invalid or missing token
    res.status(403).send('CSRF token verification failed');
  }
}

// In your route definition:
// app.post('/api/sensitive-action', verifyCsrfToken, handleSensitiveAction);`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> 4. Use SameSite Cookies
        </h3>
        <p>
          The <code>SameSite</code> attribute on cookies is a powerful defense. It tells the browser whether to send
          cookies with cross-site requests.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>SameSite=Lax</code> (default in modern browsers): Cookies are sent with top-level navigations (like
            clicking a link) but not with other cross-site requests (like AJAX calls, images, or iframes) unless
            it&apos;s a GET request for top-level navigation. This significantly mitigates CSRF for state-changing
            methods (POST, PUT, DELETE).
          </li>
          <li>
            <code>SameSite=Strict</code>: Cookies are only sent with same-site requests (when the site in the address
            bar matches the site of the cookie). This provides the strongest protection but can break legitimate
            cross-site links (e.g., linking from an external site).
          </li>
          <li>
            <code>SameSite=None; Secure</code>: Cookies are sent with all requests, including cross-site ones. Requires
            the <code>Secure</code> attribute (HTTPS). Use this only for specific cross-site needs (e.g., third-party
            cookies, embedded content that needs authentication) and ensure *other* CSRF defenses are in place.
          </li>
        </ul>
        <p>
          Setting your session cookies with at least <code>SameSite=Lax</code> dramatically reduces the risk of CSRF, as
          the session cookie needed for authentication won&apos;t be sent with typical cross-site AJAX/Fetch requests
          initiated by an attacker&apos;s script.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> 5. Defend Against JSON Array/Object Literal Execution
          (Older Vulnerability)
        </h3>
        <p>
          In older browsers or specific contexts, if a JSON API endpoint returned sensitive data as a top-level array (
          <code>[...]</code>) or object (<code>&#x7b;...&#x7d;</code>), a malicious page could potentially include the
          API endpoint URL as a <code>&lt;script&gt;</code> tag&apos;s
          <code>src</code>. The browser might execute the response as JavaScript.
        </p>
        <p>
          If the sensitive data was returned as a simple JSON array (e.g.,{" "}
          <code>[&#x7b;...&#x7d;, &#x7b;...&#x7d;]</code>), this response was also a valid JavaScript array literal. In
          some scenarios (especially pre-ES5 browsers or specific execution contexts like overriding <code>Array</code>{" "}
          constructors), the malicious page could potentially read the values of this array. Similarly, if it was a
          simple object literal (<code>&#x7b;...&#x7d;</code>), it could potentially be assigned to a variable if the
          response was wrapped in parentheses.
        </p>
        <p>
          To mitigate this, sensitive JSON API responses should *always* be wrapped in a top-level object that is not a
          valid JavaScript literal (e.g., <code>&#x7b; "data": [...] &#x7d;</code> or prefixing the response with an
          unexecutable string like <code>while(1);&#x7b; ... &#x7d;</code>). Modern browsers are less susceptible to
          this specific vector, but it&apos;s a good practice for defense in depth, especially if supporting older
          clients.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> 6. Use Appropriate HTTP Methods
        </h3>
        <p>
          Ensure that state-changing operations (like creating, updating, deleting resources) are handled by HTTP
          methods other than GET (e.g., POST, PUT, DELETE). GET requests should ideally be idempotent and not have side
          effects. While this doesn&apos;t *prevent* JavaScript-based CSRF using other methods, it prevents CSRF via
          simple GET requests triggered by <code>&lt;img&gt;</code> or link clicks.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Server className="mr-2 h-6 w-6 text-indigo-600" /> Defense in Depth
        </h2>
        <p>
          No single CSRF prevention technique is foolproof in isolation across all possible scenarios and browser
          behaviors (especially historical ones). The most robust defense involves combining multiple layers:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>SameSite=Lax</code> (or Strict) for session cookies.
          </li>
          <li>Implement CSRF tokens for all state-changing API requests.</li>
          <li>
            Validate the <code>Origin</code> header for sensitive endpoints.
          </li>
          <li>
            Ensure sensitive data responses are not parseable as executable JavaScript if fetched via{" "}
            <code>&lt;script&gt;</code> tag (wrap in object, prefix).
          </li>
          <li>Use appropriate HTTP methods (POST/PUT/DELETE for state changes).</li>
        </ul>
        <p>
          By implementing a combination of these measures, you significantly raise the bar for attackers attempting JSON
          CSRF, making your application much more secure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">Conclusion</h2>
        <p>
          JSON APIs are a common target for CSRF attacks when authentication relies solely on cookies and no other
          defenses are in place. Developers must be proactive in designing their APIs to include CSRF protection.
          Leveraging features like <code>SameSite</code> cookies, validating request origins, and implementing CSRF
          tokens are essential steps to safeguard user data and application integrity against this prevalent web
          vulnerability.
        </p>
      </div>
    </>
  );
}
