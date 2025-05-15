import type { Metadata } from "next";
import { Lock, Shield, AlertCircle, Code, EyeOff, MouseOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Security Headers for JSON Formatter Web Apps | Offline Tools",
  description:
    "Learn about essential HTTP security headers to protect your JSON formatter web application and its users.",
};

export default function SecurityHeadersJsonFormatterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Shield className="text-primary-foreground w-8 h-8" />
        <span>Security Headers for JSON Formatter Web Applications</span>
      </h1>

      <div className="space-y-6">
        <p>
          JSON formatter web applications are valuable tools that process potentially sensitive user input. While much of their logic runs client-side in the browser, the security of the application itself, served from your server, is paramount. Implementing strong HTTP security headers is a fundamental step in protecting both your application infrastructure and your users from common web vulnerabilities.
        </p>
        <p>
          These headers instruct browsers on how to behave when interacting with your site, mitigating risks like Cross-Site Scripting (XSS), Clickjacking, MIME-sniffing attacks, and ensuring data is transmitted securely. Let's explore the most relevant headers for a JSON formatter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Lock className="text-primary-foreground w-6 h-6" />
          <span>Key Security Headers</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6">Content-Security-Policy (CSP)</h3>
        <p>
          <Code className="inline-block w-4 h-4 mr-1 text-primary-foreground" /> This is one of the most critical headers. CSP helps prevent XSS attacks by controlling which resources (scripts, styles, images, fonts, etc.) the browser is allowed to load and execute for a given page.
        </p>
        <p>
          For a JSON formatter, which might involve dynamic script execution (though ideally minimized), inline styles, and potentially loading external fonts or libraries, a carefully crafted CSP is essential.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example CSP Header:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap break-all">
              {`Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self';`}
            </pre>
          </div>
          <p className="mt-3 text-sm">
            <strong>Explanation:</strong>
          </p>
          <ul className="list-disc pl-6 text-sm">
            <li><code>default-src 'self'</code>: Default policy; only allow resources from the same origin.</li>
            <li><code>script-src 'self' 'unsafe-inline' 'unsafe-eval'</code>: Allows scripts from the same origin. <code>'unsafe-inline'</code> is often needed for inline script tags or event handlers (though it's better to avoid them). <code>'unsafe-eval'</code> might be needed if your formatter uses functions like <code>eval()</code> or <code>new Function()</code> &#x7b;also generally discouraged for security&#x7d;. Ideally, remove these two if possible and use nonces or hashes for inline scripts.</li>
            <li><code>style-src 'self' 'unsafe-inline'</code>: Allows styles from the same origin and inline styles &#x7b;often required by CSS-in-JS libraries or inline styling&#x7d;.</li>
            <li><code>img-src 'self' data:</code>: Allows images from the same origin and data URIs &#x7b;for small embedded images&#x7d;.</li>
            <li><code>font-src 'self'</code>: Allows fonts from the same origin.</li>
            <li><code>object-src 'none'</code>: Prevents loading <code>&lt;object&amp;gt;</code>, <code>&lt;embed&amp;gt;</code>, or <code>&lt;applet&amp;gt;</code> elements.</li>
            <li><code>frame-ancestors 'none'</code>: Prevents the page from being loaded in an iframe, frame, or object &#x7b;mitigates Clickjacking - see X-Frame-Options below&#x7d;.</li>
            <li><code>form-action 'self'</code>: Restricts URLs that can be used as the target for form submissions.</li>
          </ul>
          <p className="mt-3 text-sm flex items-center space-x-1">
            <AlertCircle className="text-yellow-500 w-4 h-4" />
            <span>Note: <code>'unsafe-inline'</code> and <code>'unsafe-eval'</code> significantly weaken CSP protections against XSS. It's best to refactor code to avoid them or use CSP nonces/hashes if inline scripts/styles are unavoidable.</span>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">X-Content-Type-Options</h3>
        <p>
          <EyeOff className="inline-block w-4 h-4 mr-1 text-primary-foreground" /> This header prevents the browser from MIME-sniffing a response away from the declared <code>Content-Type</code>. This mitigates attacks where a user might upload a malicious file &#x7b;e.g., disguised as an image&#x7d; and trick the browser into executing it as script.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example X-Content-Type-Options Header:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap break-all">
              {`X-Content-Type-Options: nosniff`}
            </pre>
          </div>
          <p className="mt-3 text-sm">
            <strong>Explanation:</strong> This simple directive forces the browser to strictly follow the <code>Content-Type</code> header provided by the server.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">X-Frame-Options</h3>
        <p>
          <MouseOff className="inline-block w-4 h-4 mr-1 text-primary-foreground" /> This header prevents your page from being loaded in an iframe, frame, object, or embed tag on another site. This is a classic defense against Clickjacking attacks, where a malicious site overlays your page with deceptive UI elements to trick users into clicking on something harmful.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example X-Frame-Options Header:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap break-all">
              {`X-Frame-Options: DENY`}
            </pre>
          </div>
          <p className="mt-3 text-sm">
            <strong>Explanation:</strong>
          </p>
          <ul className="list-disc pl-6 text-sm">
            <li><code>DENY</code>: Prevents the page from being displayed in a frame on any site.</li>
            <li><code>SAMEORIGIN</code>: Allows the page to be displayed in a frame on the same origin as the page itself.</li>
          </ul>
          <p className="mt-3 text-sm">
            <code>DENY</code> is the most secure option if you don't intend for your formatter to be embedded elsewhere. Note that the <code>frame-ancestors</code> directive in CSP is a more modern and flexible alternative, and if present, it overrides <code>X-Frame-Options</code>. It's good practice to include both for broader browser compatibility.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Referrer-Policy</h3>
        <p>
          This header controls how much referrer information is included with requests made from your pages. This is important for user privacy and can prevent accidentally leaking information &#x7b;like internal URLs or sensitive query parameters&#x7d; to external sites.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Referrer-Policy Header:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap break-all">
              {`Referrer-Policy: strict-origin-when-cross-origin`}
            </pre>
          </div>
          <p className="mt-3 text-sm">
            <strong>Explanation:</strong>
          </p>
          <ul className="list-disc pl-6 text-sm">
            <li><code>no-referrer</code>: No referrer information is sent.</li>
            <li><code>no-referrer-when-downgrade</code>: Sends referrer for HTTPS to HTTPS requests, but not HTTPS to HTTP.</li>
            <li><code>origin</code>: Sends only the origin &#x7b;scheme, host, port&#x7d; but no path information.</li>
            <li><code>origin-when-cross-origin</code>: Sends origin for cross-origin requests, origin and path for same-origin requests.</li>
            <li><code>same-origin</code>: Sends referrer only for same-origin requests.</li>
            <li><code>strict-origin</code>: Sends origin for same-origin and HTTPS to HTTPS cross-origin requests, but not HTTPS to HTTP.</li>
            <li><code>strict-origin-when-cross-origin</code> &#x7b;Recommended&#x7d;: Sends origin and path for same-origin requests, origin only for cross-origin requests when protocol security is maintained &#x7b;HTTPS-&gt;HTTPS&#x7d;, and no header for HTTPS-&gt;HTTP.</li>
            <li><code>unsafe-url</code>: Always sends origin and path &#x7b;most verbose, least secure&#x7d;.</li>
          </ul>
          <p className="mt-3 text-sm">
            <code>strict-origin-when-cross-origin</code> provides a good balance between utility and privacy.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Strict-Transport-Security &#x7b;HSTS&#x7d;</h3>
        <p>
          If your application is served over HTTPS &#x7b;which it absolutely should be!&#x7d;, HSTS tells the browser to only connect to your site using HTTPS, even if the user types HTTP or clicks an HTTP link. This prevents downgrade attacks.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example HSTS Header:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre className="whitespace-pre-wrap break-all">
              {`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`}
            </pre>
          </div>
          <p className="mt-3 text-sm">
            <strong>Explanation:</strong>
          </p>
          <ul className="list-disc pl-6 text-sm">
            <li><code>max-age</code>: The time in seconds the browser should remember to only use HTTPS for your site &#x7b;2 years in this example&#x7d;.</li>
            <li><code>includeSubDomains</code>: The HSTS rule applies to all subdomains as well.</li>
            <li><code>preload</code>: Allows your domain to be included in the browser's HSTS preload list &#x7b;requires submitting your domain to the list&#x7d;.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementation Considerations</h2>
        <p>
          How you set these headers depends on your web server or framework.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Next.js:</strong> You can configure headers in your <code>next.config.js</code> file using the <code>headers</code> key, or set them in a <Code className="inline-block w-4 h-4 mr-1 text-primary-foreground" /> <code>middleware.ts</code> file.</li>
          <li><strong>Node.js &#x7b;Express&#x7d;:</strong> Use middleware like <code>helmet</code> which sets many of these headers by default.</li>
          <li><strong>Nginx/Apache:</strong> Configure headers directly in your server block or virtual host configuration files.</li>
          <li><strong>Edge Functions/CDNs:</strong> Many provide options to add custom headers.</li>
        </ul>

        <div className="bg-yellow-100 p-4 rounded-lg dark:bg-yellow-900 dark:text-yellow-200 my-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
                Always test your header configuration after deployment using online tools like <a href="https://securityheaders.com/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">securityheaders.com</a>
                to ensure they are correctly applied and interpreted by browsers. Be cautious when implementing CSP, as an incorrect configuration can block legitimate resources. Start with reporting mode &#x7b;<code>Content-Security-Policy-Report-Only</code>&#x7d; before enforcing.
            </p>
        </div>


        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Securing your JSON formatter web application goes beyond just validating user input or sanitizing output on the client-side. By correctly configuring HTTP security headers on your server, you add crucial layers of defense that protect the integrity of your application and the safety of its users. Implementing headers like CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and HSTS is a relatively straightforward process with significant security benefits.
        </p>
      </div>
    </>
  );
}