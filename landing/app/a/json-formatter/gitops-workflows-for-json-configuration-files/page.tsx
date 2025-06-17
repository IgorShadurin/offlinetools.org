import type { Metadata } from "next";
import {
  GitBranch,
  GitPullRequest,
  CloudCog,
  CheckCircle,
  Workflow,
  FileJson,
  Code,
  CheckCheck,
  BookText,
  Rocket,
  Workflow as WorkflowIcon,
  Wrench, // Replaced Tool with Wrench as Tool is not exported
} from "lucide-react";

export const metadata: Metadata = {
  title: "GitOps Workflows for JSON Configuration | Understanding GitOps",
  description:
    "Learn how to apply GitOps principles and workflows specifically for managing application configuration stored in JSON files.",
};

export default function GitOpsJsonConfigPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <WorkflowIcon className="w-8 h-8 text-blue-600" /> GitOps Workflows for JSON Configuration Files
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          GitOps is an operational framework that takes DevOps best practices like version control, collaboration,
          compliance, and CI/CD and applies them to infrastructure automation. It aims to manage your infrastructure and
          applications using Git as the single source of truth. While often associated with YAML configuration in
          Kubernetes, GitOps principles are equally applicable to managing other configuration formats, including{" "}
          <strong className="font-semibold text-gray-900 dark:text-gray-100">JSON configuration files</strong>.
        </p>
        <p>
          This page explores how to effectively leverage GitOps workflows when your application or infrastructure
          configuration is defined in JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <BookText className="w-6 h-6 text-green-600" /> What is GitOps (Briefly)?
        </h2>

        <p>At its core, GitOps relies on four principles:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Declarative Configuration:</strong> The
            desired state of the system (infrastructure, applications, configuration) is declared in a format that can
            be version-controlled (e.g., JSON, YAML, HCL).
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Version Control (Git):</strong> The
            declarative configuration is stored in Git, serving as the single source of truth and providing a complete
            history of changes.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Automated Reconciliation:</strong> Agents
            or controllers continuously observe the actual state of the system and compare it to the desired state
            declared in Git. If discrepancies are found, the agent automatically reconciles the actual state to match
            the desired state.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Pull Requests for Operations:</strong>{" "}
            All changes to the desired state are made via Pull Requests (PRs) to the Git repository. This enables
            collaboration, review, and approval workflows before changes are applied.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <FileJson className="w-6 h-6 text-orange-600" /> JSON as Configuration Format
        </h2>

        <p>
          JSON (JavaScript Object Notation) is a lightweight and widely used data interchange format. It&apos;s
          frequently used for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Application settings (feature flags, API endpoints, database credentials)</li>
          <li>Microservice configuration</li>
          <li>Configuration for specific tools and libraries</li>
          <li>Data schemas</li>
        </ul>
        <p>
          While less common for infrastructure declarations compared to YAML in Kubernetes contexts, JSON remains
          prevalent for application-level configuration. Integrating these JSON configuration files into a GitOps
          workflow provides the same benefits: versioning, audit trails, rollback capabilities, and a collaborative,
          review-driven process for managing changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Workflow className="w-6 h-6 text-blue-600" /> The GitOps Workflow with JSON
        </h2>

        <p>
          Applying GitOps to JSON configuration follows the standard GitOps pattern, with the focus on the JSON files
          themselves.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Change the Desired State (Modify JSON)</h3>
        <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-gray-100">
          <GitBranch className="w-5 h-5" /> Developer/Operator creates a new branch
        </div>
        <p>
          Instead of directly modifying configuration on servers or through dashboards, you modify the JSON file(s) in
          your Git repository that define the desired state.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Modifying a feature flag JSON file</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Before:</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mb-4">
            <pre>
              <code className="language-json">
                &#x7b;
                {"\n  "}"featureFlags": &#x7b;
                {"\n    "}"newDashboard": false,
                {"\n    "}"enableAnalytics": true
                {"\n  "}&#x7d;,
                {"\n  "}"apiEndpoint": "https://api.example.com/v1"
                {"\n"}&#x7d;
              </code>
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">After (Desired State):</p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-json">
                &#x7b;
                {"\n  "}"featureFlags": &#x7b;
                {"\n    "}"newDashboard": true, /* Enabled new dashboard */
                {"\n    "}"enableAnalytics": true
                {"\n  "}&#x7d;,
                {"\n  "}"apiEndpoint": "https://api.example.com/v1"
                {"\n"}&#x7d;
              </code>
            </pre>
          </div>
        </div>
        <p>You make these changes on a new Git branch.</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Create a Pull Request (PR)</h3>
        <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-gray-100">
          <GitPullRequest className="w-5 h-5" /> Open a Pull Request
        </div>
        <p>
          Once the changes to the JSON file(s) are committed to your branch, you open a Pull Request against the main
          branch (e.g., <code className="font-mono">&quot;main&quot;</code>,{" "}
          <code className="font-mono">&quot;master&quot;</code>,{" "}
          <code className="font-mono">&quot;production&quot;</code>). This is the core of the GitOps workflow for
          changes.
        </p>
        <p>The PR serves as a notification and collaboration point:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>It clearly shows the diff of the JSON changes.</li>
          <li>Teammates can review the proposed configuration change.</li>
          <li>Automated checks (CI) can run against the changes.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Review and Approve</h3>
        <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-gray-100">
          <CheckCircle className="w-5 h-5" /> Team reviews and approves
        </div>
        <p>
          Peers review the PR, just like code. They examine the JSON changes to ensure they are correct, adhere to
          standards, and won't cause unintended side effects. Automated checks can include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>JSON schema validation to ensure the structure and data types are correct.</li>
          <li>Linting to check for syntax errors or style issues.</li>
          <li>
            Impact analysis (if possible) to understand what systems or features the configuration change affects.
          </li>
        </ul>
        <p>Once reviewed and approved, the PR is merged into the main branch.</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">4. Automate Deployment/Synchronization</h3>
        <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-gray-100">
          <CloudCog className="w-5 h-5" /> Automated system syncs
        </div>
        <p>
          This is where the &quot;Ops&quot; part of GitOps shines. An automated process or agent monitors the main Git
          branch. When a change is detected (a merge), it triggers a synchronization mechanism.
        </p>
        <p>For JSON configuration, this could involve:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            A CI/CD pipeline that pulls the latest config from Git and deploys it (e.g., updates a ConfigMap in
            Kubernetes, pushes to a configuration service, restarts an application with the new config).
          </li>
          <li>
            A dedicated GitOps agent (like Argo CD, Flux, or a custom script) that detects the change in the JSON file
            in Git and applies it to the target system where the configuration is consumed.
          </li>
        </ul>
        <p>
          The key is that the change is propagated automatically based on the Git state, without manual intervention
          after the merge.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Summary of Flow:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            <code className="language-text">
              Git Repository (JSON files) | | (1) Developer/Operator makes change on branch v New Branch with JSON
              modifications | | (2) Create Pull Request v Pull Request (Diff: JSON changes) | | (3) Automated Checks
              (Schema, Lint) + Team Review &amp; Approve v Merge to main branch | | (4) Automated Sync Triggered by Git
              change v Target System (Application/Service) fetches/receives new JSON config | | (Automated
              Reconciliation - Agent observes &amp; corrects if needed) v Actual State matches Desired State (defined in
              Git JSON)
            </code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-purple-600" /> Tools and Techniques {/* Used Wrench icon */}
        </h2>

        <p>Implementing GitOps for JSON config can involve several tools:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Git:</strong> Essential for version
            control and the PR workflow.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">CI/CD Platform:</strong> Jenkins, GitHub
            Actions, GitLab CI, CircleCI, etc., to automate validation (linting, schema checks) and the deployment/sync
            process triggered by Git changes.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">JSON Schema Validation:</strong> Tools
            like <code className="font-mono">&quot;ajv&quot;</code> (JavaScript),{" "}
            <code className="font-mono">&quot;jsonschema&quot;</code> (Python), or integrating schema validation into
            your CI pipeline ensures configuration files adhere to a predefined structure.
            <div className="bg-gray-200 p-3 rounded-lg dark:bg-gray-700 my-2 text-sm">
              <p className="font-mono">Example Schema Check (Conceptual CI Step):</p>
              <pre className="overflow-x-auto mt-2">
                <code className="language-bash">
                  npm install -g ajv-cli # or equivalent for your language{"\n"}
                  ajv validate -s config.schema.json -d app-config.json
                </code>
              </pre>
            </div>
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Configuration Management Tools:</strong>{" "}
            Depending on where the JSON config is consumed, tools like Ansible, Chef, Puppet, or custom scripts can be
            used by the automated sync process to place or update the JSON file on target systems.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Kubernetes ConfigMaps/Secrets:</strong>{" "}
            If deploying to Kubernetes, JSON config can be embedded within ConfigMaps or Secrets, which are then managed
            using a GitOps controller like Argo CD or Flux.
            <div className="bg-gray-200 p-3 rounded-lg dark:bg-gray-700 my-2 text-sm">
              <p className="font-mono">Example Kubernetes ConfigMap embedding JSON:</p>
              <pre className="overflow-x-auto mt-2">
                <code className="language-yaml">
                  apiVersion: v1{"\n"}
                  kind: ConfigMap{"\n"}
                  metadata:{"\n"}
                  {"  "}name: app-settings{"\n"}
                  data:{"\n"}
                  {"  "}settings.json: |{"\n"}
                  {"    "}&#x7b;{"\n"}
                  {"      "}"database": &#x7b;{"\n"}
                  {"        "}"host": "localhost",{"\n"}
                  {"        "}"port": 5432{"\n"}
                  {"      "}&#x7d;,{"\n"}
                  {"      "}"logging": &#x7b;{"\n"}
                  {"        "}"level": "info"{"\n"}
                  {"      "}&#x7d;{"\n"}
                  {"    "}&#x7d;
                </code>
              </pre>
            </div>
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">GitOps Controllers:</strong> Argo CD or
            Flux can monitor a Git repository containing JSON files (perhaps embedded in ConfigMaps) and automatically
            synchronize the cluster state.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <CheckCheck className="w-6 h-6 text-teal-600" /> Best Practices
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Schema Validation:</strong> Always define
            and validate your JSON configuration against a schema in your CI pipeline. This catches errors before they
            reach production.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Small, Atomic Commits/PRs:</strong> Make
            changes in small, logical units. Each PR should ideally address a single configuration change. This makes
            reviews easier and reduces risk.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">
              Environment-Specific Configuration:
            </strong>{" "}
            Manage configurations for different environments (dev, staging, prod) clearly. This could be done with
            separate files, separate directories, or templating/overlay tools if necessary (though keep it simple for
            pure JSON).
            <div className="bg-gray-200 p-3 rounded-lg dark:bg-gray-700 my-2 text-sm">
              <p className="font-mono">Example Directory Structure:</p>
              <pre className="overflow-x-auto mt-2">
                <code className="language-text">
                  config/{"\n"}
                  {"  "}development/{"\n"}
                  {"    "}app-settings.json{"\n"}
                  {"  "}staging/{"\n"}
                  {"    "}app-settings.json{"\n"}
                  {"  "}production/{"\n"}
                  {"    "}app-settings.json
                </code>
              </pre>
            </div>
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Sensitive Data:</strong> JSON files in
            Git should generally NOT contain secrets (passwords, API keys, etc.). Use secret management systems (like
            Vault, AWS Secrets Manager, Kubernetes Secrets with encryption) and reference secrets in your configuration
            instead of embedding them directly.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Automation:</strong> Automate as much of
            the process as possible: validation, deployment, monitoring the actual state.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Audit Trail:</strong> Git provides an
            inherent audit trail of who changed what and when, for every configuration change.
          </li>
          <li>
            <strong className="font-semibold text-gray-900 dark:text-gray-100">Rollbacks:</strong> Need to revert a bad
            configuration change? Simply revert the merge commit or the specific commit in Git, and the automated sync
            process will roll back the configuration on the target system.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Code className="w-6 h-6 text-indigo-600" /> Example JSON Configuration File (Conceptual)
        </h2>

        <p>Let&apos;s imagine a simple application configuration file managed via GitOps.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            <code className="language-json">
              &#x7b;
              {"\n  "}"applicationName": "MyAwesomeApp",
              {"\n  "}"version": "1.2.0",
              {"\n  "}"settings": &#x7b;
              {"\n    "}"theme": "dark",
              {"\n    "}"language": "en-US",
              {"\n    "}"itemsPerPage": 25
              {"\n  "}&#x7d;,
              {"\n  "}"services": &#x7b;
              {"\n    "}"userService": &#x7b;
              {"\n      "}"url": "https://users.example.com/api",
              {"\n      "}"timeoutMs": 5000
              {"\n    "}&#x7d;,
              {"\n    "}"productService": &#x7b;
              {"\n      "}"url": "https://products.example.com/api",
              {"\n      "}"timeoutMs": 8000
              {"\n    "}&#x7d;
              {"\n  "}&#x7d;,
              {"\n  "}"featureFlags": &#x7b;
              {"\n    "}"enableRecommendations": true,
              {"\n    "}"useNewCheckoutFlow": false
              {"\n  "}&#x7d;
              {"\n"}&#x7d;
            </code>
          </pre>
        </div>
        <p>
          Any change to this file (e.g., changing <code className="font-mono">&quot;theme&quot;: &quot;dark&quot;</code>{" "}
          to <code className="font-mono">&quot;light&quot;</code>, or{" "}
          <code className="font-mono">&quot;useNewCheckoutFlow&quot;: false</code> to{" "}
          <code className="font-mono">&quot;true&quot;</code>) would go through the PR, review, merge, and automated
          synchronization process defined by your GitOps setup.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6 text-red-600" /> Conclusion
        </h2>

        <p>
          GitOps provides a robust and reliable way to manage application and infrastructure configuration. By treating
          JSON configuration files as declarative desired states stored in Git and automating the reconciliation
          process, teams can achieve greater consistency, traceability, and efficiency in their operations. Whether you
          are managing application settings, service endpoints, or feature flags defined in JSON, adopting a GitOps
          workflow ensures that changes are collaborative, reviewed, validated, and automatically applied, bringing
          configuration management into a modern, version-controlled paradigm.
        </p>
      </div>
    </>
  );
}
