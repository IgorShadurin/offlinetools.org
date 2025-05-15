import type { Metadata } from "next";
import { Shield, Code, AlertTriangle, BookOpen, Network, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Content Security Policies for JSON Formatting Tools | Offline Tools",
  description:
    "Understand how to implement Content Security Policies (CSP) to secure web-based JSON formatting and validation tools against common web vulnerabilities.",
};

export default function CspForJsonToolsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-3 text-blue-600" size={32} /> Content Security Policies for JSON Tools
      </h1>

      <div className="space-y-6">
        <p>
          Web-based tools for formatting, validating, or processing JSON are incredibly useful. However,
          because they often involve pasting or loading user-provided data and executing client-side
          logic (usually JavaScript), they can be potential targets for web vulnerabilities like
          Cross-Site Scripting (XSS) or data leakage. A crucial defense mechanism is implementing a
          robust <strong>Content Security Policy (CSP)</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-yellow-600" size={24} /> What is CSP and Why for JSON Tools?
        </h2>
        <p>
          CSP is a security standard that helps prevent XSS, clickjacking, and other code injection attacks
          by specifying which dynamic resources (like scripts, styles, images, etc.) the browser is
          allowed to load and execute.
        </p>
        <p>
          For a JSON tool, the primary risk comes from:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Processing untrusted input:</strong> If JSON input contains malicious HTML or JavaScript
            that gets rendered unsafely into the page&apos;s DOM, it could execute.
          </li>
          <li>
            <strong>Dependencies:</strong> Loading third-party JavaScript libraries for formatting,
            syntax highlighting, or validation might introduce vulnerabilities if the library is
            compromised or loaded over an insecure connection.
          </li>
          <li>
            <strong>Inadvertent data transmission:</strong> Without strict policies, a compromised script
            could attempt to send processed or sensitive data to an external server.
          </li>
        </ul>
        <p>
          A well-defined CSP header tells the browser to only load resources from trusted sources and
          restrict certain potentially dangerous behaviors (like inline scripts). This significantly
          reduces the attack surface.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2 text-green-600" size={24} /> Key CSP Directives for JSON Tools
        </h2>
        <p>
          Here are some essential CSP directives and how they apply to a typical JSON formatting tool:
        </p>

        <ul className="list-disc pl-6 space-y-4 my-4">
          <li>
            <strong><code>default-src</code></strong>: This is a fallback for most other fetch directives.
            Setting a strict default is a good starting point.
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>default-src &apos;self&apos;;</code>
            </div>
            This means only resources from the same origin as the page are allowed by default.
          </li>
          <li>
            <strong><code>script-src</code></strong>: Controls valid sources for JavaScript. This is critical
            for preventing XSS.
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>script-src &apos;self&apos; &apos;unsafe-eval&apos; https://cdnjs.cloudflare.com;</code>
            </div>
            &apos;self&apos; allows scripts from the same origin. &apos;unsafe-eval&apos; might be needed if your
            JSON parser or highlighter uses functions like <code>eval()</code> or parses JSON using
            <code>JSON.parse()</code> in certain strict modes (though <code>JSON.parse</code> itself is generally safe
            under CSP). Specifying external CDNs like `https://cdnjs.cloudflare.com` is necessary if you
            load libraries from there. Prefer using SHAs or nonces over hostnames for better security.
          </li>
          <li>
            <strong><code>style-src</code></strong>: Defines valid sources for stylesheets. Prevents attackers
            from injecting malicious CSS that could be used in conjunction with other attacks (like
            trickling data via CSS selectors).
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>style-src &apos;self&apos; &apos;unsafe-inline&apos; https://fonts.googleapis.com;</code>
            </div>
            &apos;unsafe-inline&apos; is often necessary if you have inline <code>&lt;style&gt;</code> blocks or
            style attributes, though it&apos;s recommended to avoid these and prefer &apos;self&apos; or hashes/nonces.
            Specifying external font sources is also common.
          </li>
          <li>
            <strong><code>connect-src</code></strong>: Restricts which URLs can be loaded using scripts
            (e.g., via <code>fetch</code>, <code>XMLHttpRequest</code>, WebSockets).
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>connect-src &apos;self&apos; https://api.example.com;</code>
            </div>
            If your tool allows fetching JSON from a URL or reports errors/usage stats, define the allowed
            endpoints here. If it&apos;s a purely client-side tool, you might restrict this strictly to &apos;self&apos;.
          </li>
          <li>
            <strong><code>object-src</code></strong>: Limits the sources for <code>&lt;object&gt;</code>, <code>&lt;embed&gt;</code>, and
            <code>&lt;applet&gt;</code> elements. These are often legacy and risky.
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>object-src &apos;none&apos;;</code>
            </div>
            Setting this to &apos;none&apos; is a strong recommendation for most modern web applications,
            including JSON tools.
          </li>
          <li>
            <strong><code>base-uri</code></strong>: Restricts the URLs that can be used in the <code>&lt;base&gt;</code>
            element. This prevents attackers from changing the base URL for relative links.
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>base-uri &apos;self&apos;;</code>
            </div>
            Usually set to &apos;self&apos; or omitted if no <code>&lt;base&gt;</code> tag is used.
          </li>
           <li>
            <strong><code>frame-ancestors</code></strong>: Prevents the page from being embedded in frames
            or iframes from other origins. Helps mitigate clickjacking.
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>frame-ancestors &apos;self&apos;;</code>
            </div>
             This allows embedding only within pages from the same origin. Use &apos;none&apos; to prevent any framing.
          </li>
           <li>
            <strong><code>form-action</code></strong>: Restricts the URLs which can be used as the target
            of form submissions from that page.
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
              <code>form-action &apos;self&apos;;</code>
            </div>
             Useful if your tool has any form elements (e.g., a search bar, a feedback form).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-600" size={24} /> CSP Implementation Examples
        </h2>
        <p>
          CSP is typically implemented via an HTTP header sent by the server, or less ideally, via a
          <code>&lt;meta&gt;</code> tag in the HTML head. HTTP headers are generally preferred as they are
          processed earlier by the browser.
        </p>

        <h3 className="text-xl font-semibold mt-6">Via HTTP Header (Recommended)</h3>
        <p>
          In your server configuration (e.g., Nginx, Apache, Express, Next.js headers), you add a header:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Strict Policy</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm font-mono">
            <pre>
              {`Content-Security-Policy: default-src 'self'; \
script-src 'self'; \
style-src 'self'; \
object-src 'none'; \
base-uri 'self'; \
form-action 'self'; \
frame-ancestors 'self'; \
upgrade-insecure-requests;`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
             <code>upgrade-insecure-requests</code> ensures that all HTTP requests are automatically
             upgraded to HTTPS, preventing mixed content issues if your site is available over HTTPS.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Policy allowing specific CDNs and inline styles</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm font-mono">
            <pre>
              {`Content-Security-Policy: default-src 'self'; \
script-src 'self' https://cdn.jsdelivr.net; \
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; \
img-src 'self' data:; \
connect-src 'self' https://api.example.com; \
object-src 'none'; \
base-uri 'self'; \
form-action 'self'; \
frame-ancestors 'self';`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            This policy allows scripts from `cdn.jsdelivr.net`, inline styles and styles from `fonts.googleapis.com`,
            images from the same origin or data URIs, and connections to `api.example.com`.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Via &lt;meta&gt; Tag (Less Preferred)</h3>
         <p>
           Place this inside the <code>&lt;head&gt;</code> section of your HTML:
         </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <h4 className="text-lg font-medium">Example &lt;meta&gt; Tag Policy</h4>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm font-mono">
             <pre>
               {`&lt;meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; object-src 'none';"&gt;`}
             </pre>
           </div>
           <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
             Note that some directives (like <code>frame-ancestors</code>, <code>report-uri</code>) are ineffective
             when used in a <code>&lt;meta&gt;</code> tag. Use HTTP headers whenever possible.
           </p>
         </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Eye className="mr-2 text-indigo-600" size={24} /> Monitoring with <code>report-uri</code> or <code>report-to</code>
        </h2>
        <p>
          When deploying a new CSP, especially for an existing tool, it&apos;s wise to use reporting.
          The <code>report-uri</code> or the newer <code>report-to</code> directive tells the browser to send
          JSON reports to a specified endpoint whenever a CSP violation occurs. This is invaluable for
          identifying legitimate resources blocked by your policy and refining it without immediately
          breaking functionality for users.
        </p>
        <div className="bg-gray-100 p-3 rounded-md font-mono text-sm dark:bg-gray-800 my-2">
           <pre>
             {`Content-Security-Policy: default-src 'self'; ...; report-uri /csp-reporting-endpoint;`}
           </pre>
         </div>
         <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
           You need to set up an endpoint on your server (`/csp-reporting-endpoint` in this example)
           to receive and log these violation reports.
         </p>
         <p>
           You can also use <code>Content-Security-Policy-Report-Only</code> header to test a policy
           without enforcing it. Violations are reported but not blocked by the browser. Once you are
           confident, you can switch to the enforcing <code>Content-Security-Policy</code> header.
         </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-teal-600" size={24} /> Specific Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Inline Scripts and Styles:</strong> While <code>&apos;unsafe-inline&apos;</code> is easier, it&apos;s less secure.
            Prefer using hashes or nonces for inline scripts/styles if they are unavoidable.
          </li>
          <li>
            <strong><code>eval()</code> and <code>new Function()</code>:</strong> <code>&apos;unsafe-eval&apos;</code> is required if your code uses these.
            Modern JSON parsing (<code>JSON.parse</code>) typically does NOT require <code>&apos;unsafe-eval&apos;</code> under CSP Level 2 and above.
            However, some older libraries (e.g., certain template engines or regex libraries) might.
            Audit your dependencies.
          </li>
          <li>
            <strong>Data URIs:</strong> If your tool generates or displays images/files using data URIs
            (e.g., for download links), you need to allow them using <code>data:</code> in the relevant
            directive (e.g., <code>img-src data:;</code>).
          </li>
          <li>
            <strong>Web Workers/Service Workers:</strong> Use <code>worker-src</code> if your tool utilizes these.
          </li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Network className="mr-2 text-orange-600" size={24} /> Beyond CSP
        </h2>
        <p>
          While CSP is a powerful layer of defense, it&apos;s not a silver bullet. It should be part of
          a broader security strategy:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Secure Coding Practices:</strong> Sanitize and escape user input whenever it&apos;s
            rendered into the DOM. Use safe APIs like <code>textContent</code> instead of <code>innerHTML</code>
            when possible.
          </li>
          <li>
            <strong>Keep Libraries Updated:</strong> Regularly update any third-party JavaScript libraries
            used by your tool.
          </li>
          <li>
            <strong>HTTPS:</strong> Always serve your tool over HTTPS to protect data in transit and ensure
            the integrity of the loaded resources (which CSP helps enforce with directives like
            <code>upgrade-insecure-requests</code>).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing a well-thought-out Content Security Policy is essential for securing web-based
          JSON formatting and validation tools. By restricting the sources from which resources can
          be loaded and controlling potentially dangerous browser features, CSP significantly reduces
          the risk of client-side attacks, protecting both your application and its users from malicious
          code injection and data compromise. Start with a strict policy and relax it only for explicitly
          required resources, using reporting to fine-tune your rules.
        </p>
      </div>
    </>
  );
}