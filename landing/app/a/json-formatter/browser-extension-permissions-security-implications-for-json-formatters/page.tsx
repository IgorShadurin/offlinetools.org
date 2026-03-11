import type { Metadata } from "next";
import { Lock, AlertTriangle, Key, Globe, Clipboard, Database, Code, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Browser Extension Permissions for JSON Formatters: Security Guide",
  description:
    "Learn which permissions JSON formatter extensions actually need, what broad site access really allows, and how to choose a safer option in Chrome and Firefox.",
};

export default function JsonFormatterPermissionsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Browser Extension Permissions: Security Implications for JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          A JSON formatter extension is usually safe only when its permissions match its feature set. If it formats the
          current tab only after you click the toolbar button, it can often work with limited permissions such as{" "}
          <code>&quot;activeTab&quot;</code>, <code>&quot;scripting&quot;</code>, and <code>&quot;storage&quot;</code>.
          Risk rises when a formatter asks for persistent access to every site, clipboard reading, cookies, or network
          interception.
        </p>
        <p>
          That distinction matters because browser permission screens are intentionally broad. In current Chromium
          browsers, a request like <code>&quot;&lt;all_urls&gt;&quot;</code> can surface the warning{" "}
          <em>&quot;Read and change all your data on all websites&quot;</em>. In Firefox, host permissions for Manifest
          V3 extensions are shown at install time, but Firefox documentation notes that updates adding new host
          permissions are not surfaced in the update prompt the same way. For a search visitor deciding whether a JSON
          formatter is safe, the real question is not whether it works, but whether it needs that level of access to
          work.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Key className="w-6 h-6" /> Match the Permission to the Feature
        </h2>
        <p>
          Most safe choices become obvious once you map the requested permission to the actual job the extension is
          doing:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="text-left p-3 font-semibold">Extension behavior</th>
                <th className="text-left p-3 font-semibold">Usually enough</th>
                <th className="text-left p-3 font-semibold">What to watch for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top">Paste JSON into a popup or extension page</td>
                <td className="p-3 align-top">
                  <code>&quot;storage&quot;</code> and sometimes <code>&quot;clipboardWrite&quot;</code>
                </td>
                <td className="p-3 align-top">
                  It should not need site-wide host access at all for this workflow.
                </td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top">Format the current tab after you click the extension</td>
                <td className="p-3 align-top">
                  <code>&quot;activeTab&quot;</code>, <code>&quot;scripting&quot;</code>,{" "}
                  <code>&quot;storage&quot;</code>
                </td>
                <td className="p-3 align-top">This is the safer default for a formatter that runs on demand.</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top">Auto-format JSON pages on a short list of trusted sites</td>
                <td className="p-3 align-top">
                  Narrow <code>&quot;host_permissions&quot;</code> or{" "}
                  <code>&quot;optional_host_permissions&quot;</code>
                </td>
                <td className="p-3 align-top">
                  Acceptable if the allowed origins are specific and user-controlled.
                </td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-3 align-top">Monitor or change traffic across the web</td>
                <td className="p-3 align-top">
                  Often <code>&quot;&lt;all_urls&gt;&quot;</code> plus network or cookie-related permissions
                </td>
                <td className="p-3 align-top">
                  This is far beyond what a basic JSON prettifier should need.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-500" /> Lower-risk permissions you should expect
        </h2>
        <p>
          These permissions are common for a formatter that works locally and only touches the current page when you
          ask it to:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-500" /> <code>&quot;activeTab&quot;</code>
        </h3>
        <p>
          This is one of the least invasive permissions. In Chrome, it grants temporary access to the current tab only
          after a user gesture such as clicking the extension action, a context-menu item, or a keyboard shortcut. The
          access is temporary and is revoked when the tab is closed or moves away from that page context.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Power:</strong> Lets the extension inspect the active tab and, with{" "}
            <code>&quot;scripting&quot;</code>, inject code into that tab after the user invokes it.
          </li>
          <li>
            <strong>Security implications:</strong> Relatively low risk because it is user-initiated and temporary. If
            the extension is compromised, an attacker still has to wait for the user to trigger it.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-500" /> <code>&quot;storage&quot;</code>
        </h3>
        <p>
          This is the normal place to keep preferences such as indentation width, collapsed-node defaults, and theme
          choices.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Power:</strong> Stores extension settings separately from website storage.
          </li>
          <li>
            <strong>Security implications:</strong> Usually low risk. The main concern is what the extension chooses to
            store, not the permission itself.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Clipboard className="w-5 h-5 text-purple-500" /> <code>&quot;clipboardWrite&quot;</code>
        </h3>
        <p>This is common for a copy button in a popup or side panel.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Power:</strong> Lets the extension place formatted JSON onto the clipboard.
          </li>
          <li>
            <strong>Security implications:</strong> Lower risk than clipboard reading, but it can still alter copied
            content. It should be attached to an obvious user action such as clicking Copy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-500" /> Permissions That Deserve Extra Scrutiny
        </h2>
        <p>
          The following requests are not automatically malicious, but they need a stronger explanation from the
          developer because they meaningfully widen the blast radius if the extension is compromised.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Clipboard className="w-5 h-5 text-purple-500" /> <code>&quot;clipboardRead&quot;</code>
        </h3>
        <p>
          A formatter may ask for this if it offers a one-click Paste button. That can be convenient, but it is more
          sensitive than <code>&quot;clipboardWrite&quot;</code> because the browser warns that the extension can read
          what you copy and paste.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>When it may be justified:</strong> An explicit user-triggered paste workflow inside the extension.
          </li>
          <li>
            <strong>When it is suspicious:</strong> If the extension mostly formats pages in-place and cannot explain
            why it needs clipboard reads.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-red-500" /> Host permissions such as <code>&quot;&lt;all_urls&gt;&quot;</code>
        </h3>
        <p>
          This is where the biggest trust decision sits. Host permissions tell the browser which sites the extension is
          allowed to interact with. In Chrome, broad host access is what leads to warnings like{" "}
          <em>&quot;Read and change all your data on all websites&quot;</em>.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Power:</strong> Lets the extension read page content on matching sites, inject scripts, access tab
            metadata for those origins, and make privileged requests from extension pages to those hosts.
          </li>
          <li>
            <strong>Security implications:</strong> <strong>High risk</strong> when the pattern is broad. A formatter
            that only needs to work when clicked usually should not need persistent access to every site you visit.
          </li>
        </ul>
        <p>
          There is an important nuance here: host permissions alone do not grant every browser capability. But they do
          create the foundation for more invasive behavior, especially when paired with other permissions such as{" "}
          <code>&quot;cookies&quot;</code>, <code>&quot;webRequest&quot;</code>, or broad content-script matching
          rules.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" /> Cookies and network permissions
        </h3>
        <p>
          A basic formatter rarely needs <code>&quot;cookies&quot;</code>, <code>&quot;webRequest&quot;</code>, or{" "}
          <code>&quot;declarativeNetRequestWithHostAccess&quot;</code>. Once those appear alongside broad host access,
          you are no longer evaluating a simple viewer. You are evaluating software that can meaningfully observe or
          influence web traffic.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-500" /> What Over-Permissive JSON Formatters Can Really Do
        </h2>
        <p>
          When a JSON formatter asks for broad access, the security problem is not just the current code. It is the
          amount of damage the extension could do later if the developer account is compromised, the project is sold,
          or a bad update is published.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Data Exposure &amp; Theft (<Code className="w-5 h-5 inline-block mr-1" />)
        </h3>
        <p>
          Broad site access lets the extension inspect the content of pages that match its allowed origins. That can
          include raw JSON responses, internal API docs, admin panels, and any sensitive information rendered in the
          page. If the extension also has cookie or network permissions, the exposure can become much deeper.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Action Execution on Your Behalf (<User className="w-5 h-5 inline-block mr-1" />)
        </h3>
        <p>
          If an extension can inject scripts into pages automatically, it can manipulate what you see and interact with
          forms or controls on your behalf. For a JSON formatter, that is usually unnecessary power.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Data Exfiltration (<Globe className="w-5 h-5 inline-block mr-1" />)
        </h3>
        <p>
          The biggest practical red flag is not just reading data but sending it elsewhere. A trustworthy formatter
          should process JSON locally in the browser, without uploading page contents or pasted payloads to a remote
          service.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Supply Chain Attacks (<Lock className="w-5 h-5 inline-block mr-1" />)
        </h3>
        <p>
          This is the central extension risk. A popular formatter can start out legitimate and later become dangerous
          through an account takeover or ownership change. The broader the granted permissions, the more valuable that
          installed base becomes to an attacker.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Globe className="w-6 h-6" /> Current Browser Behavior That Changes the Risk
        </h2>
        <p>
          A good security decision is not just about the manifest. Modern browsers also give users some runtime control
          over site access:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Chromium browsers:</strong> Users can usually restrict an extension to run <em>on click</em>, on
            specific sites, or on all requested sites. For a JSON formatter with broader host access, changing site
            access to on-click or a short allowlist materially reduces risk.
          </li>
          <li>
            <strong>Chrome install prompts:</strong> Broad host permissions and clipboard access trigger explicit
            warnings. That warning text is a useful signal, not boilerplate to ignore.
          </li>
          <li>
            <strong>Firefox 127 and later:</strong> Manifest V3 host permissions are shown in the install prompt.
            Firefox documentation also notes that update prompts do not surface newly requested host permissions the
            same way, which makes periodic permission reviews worthwhile.
          </li>
          <li>
            <strong>File URLs and incognito:</strong> In Chrome, these are separate user-controlled toggles on the
            extension details page. A formatter usually does not need either unless you explicitly use it in those
            contexts.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <User className="w-6 h-6" /> How to Evaluate a JSON Formatter Before Installing It
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Start with the workflow:</strong> If you only want to prettify copied JSON, you should not need an
            extension with all-sites access.
          </li>
          <li>
            <strong>Prefer on-demand access:</strong> For in-page formatting, favor <code>&quot;activeTab&quot;</code>
            and on-click behavior over persistent <code>&quot;&lt;all_urls&gt;&quot;</code>.
          </li>
          <li>
            <strong>Be skeptical of permission stacking:</strong> A formatter asking for{" "}
            <code>&quot;&lt;all_urls&gt;&quot;</code>, <code>&quot;clipboardRead&quot;</code>,{" "}
            <code>&quot;cookies&quot;</code>, and network permissions at the same time deserves a very strong
            explanation.
          </li>
          <li>
            <strong>Use browser controls after install:</strong> Set site access to on-click or a small list of trusted
            origins if the browser offers that choice.
          </li>
          <li>
            <strong>Turn off extra surfaces:</strong> Leave file-URL and incognito access disabled unless you
            specifically need them.
          </li>
          <li>
            <strong>Check the trust signals:</strong> Read the store listing, privacy policy, update history, and
            whether the developer clearly says processing happens locally.
          </li>
          <li>
            <strong>Reduce extension count:</strong> Every installed extension increases browser attack surface, even if
            you use it only occasionally.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Practical Guidance for Developers
        </h2>
        <p>
          A secure JSON formatter is mostly a least-privilege design exercise. The smaller the permission set, the more
          trustworthy the product feels and the less damage a compromise can do.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Default to on-demand formatting:</strong> If the user clicks the extension on a JSON page,{" "}
            <code>&quot;activeTab&quot;</code> plus <code>&quot;scripting&quot;</code> is often enough.
          </li>
          <li>
            <strong>Keep processing local:</strong> Do not send raw page content, pasted JSON, or API responses to your
            own backend just to pretty-print them.
          </li>
          <li>
            <strong>Request host access only when the feature truly needs it:</strong> Auto-formatting on a known set of
            sites is a better fit for narrow host patterns or optional host permissions than for{" "}
            <code>&quot;&lt;all_urls&gt;&quot;</code>.
          </li>
          <li>
            <strong>Ask later when possible:</strong> Optional host permissions let you explain the feature first, then
            request access when the user enables it.
          </li>
          <li>
            <strong>Explain every warning in plain language:</strong> The store description should tell users exactly
            why a permission is needed and what data never leaves the device.
          </li>
          <li>
            <strong>Avoid unrelated power permissions:</strong> A formatter rarely needs <code>&quot;cookies&quot;</code>,{" "}
            <code>&quot;history&quot;</code>, <code>&quot;webRequest&quot;</code>, or{" "}
            <code>&quot;declarativeNetRequestWithHostAccess&quot;</code>.
          </li>
          <li>
            <strong>Protect the release pipeline:</strong> Use strong account security and review updates carefully, as
            extension supply-chain abuse often arrives through legitimate update channels.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Manifest V3 baseline for an on-demand formatter</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "manifest_version": 3,
  "name": "My Secure JSON Formatter",
  "version": "1.0.0",
  "description": "Formats JSON in the active tab when the user clicks the extension.",
  "permissions": [
    "activeTab",
    "scripting",
    "storage",
    "clipboardWrite"
  ],
  "action": {
    "default_title": "Format JSON on this page"
  },
  "background": {
    "service_worker": "service-worker.js"
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This pattern works for many formatters because it avoids persistent site-wide access. If you later add an
            auto-run feature for a trusted set of domains, request that host access separately instead of starting with{" "}
            <code>&quot;&lt;all_urls&gt;&quot;</code>.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database className="w-6 h-6" /> Bottom Line
        </h2>
        <p>
          The safest JSON formatter extension is the one that processes data locally and asks for access only when you
          use it. If a formatter mostly needs to help you read JSON, then a permission bundle centered on{" "}
          <code>&quot;activeTab&quot;</code>, <code>&quot;scripting&quot;</code>, and{" "}
          <code>&quot;storage&quot;</code> is usually easier to justify than permanent all-sites access. The farther an
          extension moves toward clipboard reading, cookie access, network interception, and{" "}
          <code>&quot;&lt;all_urls&gt;&quot;</code>, the more carefully you should scrutinize it.
        </p>
        <p>
          For many users, the best security choice is to avoid installing an extension at all unless in-page formatting
          is truly necessary. If you only need to paste, prettify, and inspect JSON, a local or browser-based formatter
          outside the extension permission model removes this entire category of risk.
        </p>
      </div>
    </>
  );
}
