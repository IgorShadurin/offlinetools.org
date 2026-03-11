import type { Metadata } from "next";
import { Shield, Package, GitFork, Lock, Scan, TreePine, CheckCircle2, FileLock, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Supply Chain Security for JSON Formatter Dependencies | Offline Tools",
  description:
    "Practical guidance for choosing safer JSON formatter packages, verifying npm provenance, generating SBOMs, and reducing supply chain risk in CI.",
};

export default function SupplyChainSecurityPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Shield className="w-8 h-8 text-blue-600" />
        Supply Chain Security for JSON Formatter Dependencies
      </h1>

      <div className="space-y-6">
        <p>
          A JSON formatter package looks harmless, but it is still third-party code entering your build, server,
          desktop app, browser bundle, or developer workstation. That means it can inherit access to source code,
          environment variables, CI tokens, and user data. For this class of dependency, the safest choice is often{" "}
          <strong>no dependency at all</strong>. When you do need one, treat it like any other supply chain decision:
          verify what you are installing, reduce the blast radius, and make changes visible in CI.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6 text-green-600" /> First Question: Do You Need a Package?
        </h2>
        <p>
          For many apps, JSON formatting does not justify a new dependency. If you only need pretty-printing, built-in
          platform APIs usually cover it:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Built-in Alternative</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              <code>
                {`const pretty = JSON.stringify(value, null, 2);`}
              </code>
            </pre>
          </div>
        </div>
        <p>A dedicated library is easier to justify when you specifically need one of these:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Streaming or formatting very large JSON payloads without loading everything into memory.</li>
          <li>JSON5, comments, trailing commas, or other non-standard input handling.</li>
          <li>Tree views, syntax highlighting, diffing, or editor-like interaction.</li>
          <li>CLI automation that needs better diagnostics, normalization, or schema-aware output.</li>
        </ul>
        <p>
          If a formatter package is only saving a few lines of code, deleting the dependency is often the strongest
          supply chain control you can apply.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitFork className="w-6 h-6 text-purple-600" /> Where the Real Risk Comes From
        </h2>
        <p>
          The danger usually is not the pretty-print algorithm itself. It comes from how the package is distributed,
          updated, and executed:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Install-time scripts:</strong> <code>preinstall</code>, <code>install</code>, and{" "}
            <code>postinstall</code> hooks run code before you ever import the package. That is high-value attacker
            territory in CI and on developer machines.
          </li>
          <li>
            <strong>Transitive dependencies:</strong> A formatter with a small API surface can still pull in a long
            chain of packages you never reviewed. The real risk often hides there.
          </li>
          <li>
            <strong>Typosquatting and dependency confusion:</strong> Attackers rely on rushed installs, copied package
            names, and misconfigured internal registries.
          </li>
          <li>
            <strong>Maintainer or token compromise:</strong> If a publisher account or CI token is stolen, a clean
            package can become malicious in the next release.
          </li>
          <li>
            <strong>Abandonment:</strong> A package that once looked fine can quietly go stale, leaving known
            vulnerabilities or unreviewed ownership changes behind.
          </li>
        </ul>
        <p>
          Risk is highest when the formatter runs in build tooling, server code, editor extensions, or internal CLI
          jobs. Browser-only use still matters, but it usually exposes fewer secrets than CI or backend execution.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-teal-600" /> Practical Review Checklist
        </h2>
        <p>
          The most useful workflow is to review a candidate package before install, verify it after install, and then
          keep change detection in CI.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" /> 1. Start With the Smallest Acceptable Package
        </h3>
        <p>
          Prefer a formatter with few or no runtime dependencies, no install scripts, a clear repository link, and
          recent maintenance. Before installing anything, inspect the package metadata directly:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Inspect Package Metadata Before Install</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              <code>
                {`npm view <package-name> version repository time dependencies peerDependencies scripts dist.integrity --json`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          A JSON formatter that depends on an editor framework, syntax highlighter, or multiple parsing layers may be
          fine for a rich UI, but it is a very different supply chain bet than a tiny single-purpose library.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileLock className="w-5 h-5 text-gray-600" /> 2. Verify Provenance and Registry Signatures
        </h3>
        <p>
          Current npm registry tooling gives you more than a basic integrity hash. If a package version has npm
          provenance, the npm package page shows how it was built and links back to the source commit and workflow. The
          npm CLI can also verify registry signatures and provenance attestations after install:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Verify Downloaded Packages</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              <code>
                {`npm ci
npm audit signatures`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          This is valuable because a normal vulnerability audit only tells you about known advisories. Signature and
          provenance checks help answer a different question: <em>did the package you downloaded come from the build it
          claims to come from?</em>
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-lime-600" /> 3. Generate an SBOM and Map the Transitive Tree
        </h3>
        <p>
          When a package passes the first check, document what it actually brings into your project. npm can generate a
          Software Bill of Materials (SBOM) in SPDX or CycloneDX format, which makes dependency reviews and incident
          response much easier.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Generate an SBOM and Inspect the Tree</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              <code>
                {`npm sbom --sbom-format cyclonedx > sbom.json
npm ls <package-name>`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          If you use pnpm, <code>pnpm why &lt;package-name&gt;</code> is a quick way to see why a formatter is present.
          In practice, this step catches packages that looked small at the top level but pull in far more code than the
          feature warrants.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Scan className="w-5 h-5 text-orange-600" /> 4. Check the Project&apos;s Security Posture, Not Just Its CVEs
        </h3>
        <p>
          A formatter can have zero known CVEs and still be a poor dependency choice. Use signals that reflect how the
          project is maintained. OpenSSF Scorecard is useful here because it evaluates security practices around the
          repository itself, not just published advisories.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Branch protection and code review:</strong> Is it hard for one compromised account to land a
            release?
          </li>
          <li>
            <strong>Signed releases and secure CI:</strong> Does the project show evidence of release discipline?
          </li>
          <li>
            <strong>Recent maintenance:</strong> Are issues, pull requests, and releases still moving?
          </li>
          <li>
            <strong>Repository transparency:</strong> Is there a real source repo, security policy, and release history
            you can audit?
          </li>
        </ul>
        <p>
          For a low-complexity need like JSON formatting, you should hold candidates to a high bar. If the package looks
          opaque, over-engineered, or weakly maintained, choose a simpler alternative or keep the logic in-house.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-600" /> 5. Add CI Guardrails and Safer Publishing Defaults
        </h3>
        <p>
          Once you approve a dependency, make future changes harder to smuggle in. Always commit your lockfile, review
          dependency updates in pull requests, and run supply chain checks automatically in CI.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Commit the lockfile:</strong> <code>package-lock.json</code>, <code>pnpm-lock.yaml</code>, or{" "}
            <code>yarn.lock</code> keeps installs repeatable and preserves integrity metadata.
          </li>
          <li>
            <strong>Pin more aggressively for high-risk contexts:</strong> Build tools, internal CLIs, and backend
            services deserve tighter version control than casual frontend helpers.
          </li>
          <li>
            <strong>Audit every update:</strong> Run vulnerability checks alongside signature or provenance checks in
            CI, not only on release day.
          </li>
          <li>
            <strong>Review scripts and tree growth:</strong> A package update that adds install hooks or many new
            transitives deserves manual review.
          </li>
        </ul>
        <p>
          If you publish your own formatter package, current npm guidance is to use trusted publishing with OIDC instead
          of long-lived automation tokens. npm&apos;s current trusted publisher support covers GitHub Actions on
          GitHub-hosted runners and GitLab CI/CD on GitLab.com shared runners, and npm automatically generates
          provenance attestations for eligible public package publishes from those supported flows. After migration,
          restrict token-based publishing and require stronger authentication for maintainers.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The most practical mindset is simple: a JSON formatter is rarely important enough to justify a risky
          dependency. Start by asking whether you need a package at all. If you do, prefer the smallest option, verify
          provenance and signatures, generate an SBOM, and keep lockfile and CI controls tight. That gives search users
          and engineering teams something more useful than generic advice: a concrete way to decide whether a formatter
          dependency is worth trusting.
        </p>
      </div>
    </>
  );
}
