import type { Metadata } from "next";
import {
  Code,
  Cog,
  Package,
  Cloud,
  Zap,
  FileJson,
  GitFork,
  Shield,
  Wrench, // Changed from Tool
  PackageCheck,
  Workflow,
  Terminal,
  ServerCog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dynamic JSON Configuration Generation in Build Pipelines | Offline Tools",
  description:
    "Learn how to dynamically generate JSON configuration files during your build or deployment pipeline to manage environment-specific settings, feature flags, and secrets securely and efficiently.",
};

export default function DynamicJsonConfigGenerationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson className="w-8 h-8" /> Dynamic JSON Configuration Generation in Build Pipelines
      </h1>

      <div className="space-y-6">
        <p>
          In modern software development, applications often need different configurations depending on the environment they are running in – be it development, staging, production, or feature branches. Managing these configurations manually or by simply committing static JSON files for each environment can quickly become cumbersome, error-prone, and pose security risks (especially with sensitive data).
        </p>
        <p>
          This is where <strong>dynamic JSON configuration generation in build pipelines</strong> becomes invaluable. Instead of storing pre-configured files, you generate the necessary configuration JSON during your build or deployment process, injecting environment-specific values at runtime.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cog className="w-6 h-6" /> What is Dynamic Configuration Generation?
        </h2>
        <p>
          At its core, dynamic configuration generation involves using automated scripts or tools within your CI/CD pipeline to create or modify configuration files based on the specific environment or context of the build/deployment. For JSON configurations, this typically means:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Reading environment variables &#x7b;e.g., `API_URL`, `DATABASE_PORT`, `FEATURE_FLAG_X`&#x7d;.</li>
          <li>Fetching secrets from a secure vault &#x7b;e.g., API keys, passwords&#x7d;.</li>
          <li>Determining environment-specific settings based on the branch name or deployment target.</li>
          <li>Using these values to populate a template JSON file or construct a JSON object programmatically.</li>
          <li>Saving the resulting JSON file to be included in the application&apos;s build artifact or deployed alongside it.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Zap className="w-6 h-6" /> Why Adopt This Approach?
        </h2>
        <p>
          There are several compelling reasons to dynamically generate your JSON configurations:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Environment Specificity:</strong> Easily manage distinct settings for different environments without manual file swapping or complex conditional logic within the application code itself.
          </li>
          <li>
            <Shield className="inline w-5 h-5 mr-1" /> <strong>Security:</strong> Crucially, sensitive information like API keys or database credentials are not hardcoded or stored in source control. They are injected securely from environment variables or secret management systems during the pipeline execution.
          </li>
          <li>
            <strong>Reduced Redundancy:</strong> Avoid duplicating entire JSON files for minor variations between environments. A single template or script can handle multiple environments.
          </li>
          <li>
            <strong>Consistency:</strong> Ensures that the deployed configuration is always derived from known, trusted inputs (like pipeline variables) rather than potentially stale static files.
          </li>
          <li>
            <strong>Flexibility:</strong> Allows for runtime adjustments, like enabling or disabling feature flags based on the deployment environment or user group.
          </li>
          <li>
            <GitFork className="inline w-5 h-5 mr-1" /> <strong>Branching Strategy Support:</strong> Makes it easier to deploy configurations specific to feature branches or testing environments.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Common Scenarios
        </h2>
        <p>This technique is useful for configuring various aspects of an application:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>API Endpoints &#x7b;e.g., `/api/v1` for dev, `/api/v2` for prod&#x7d;.</li>
          <li>Database Connection Strings &#x7b;different hosts, credentials per environment&#x7d;.</li>
          <li>Third-party Service Keys or IDs.</li>
          <li>Feature Flag States &#x7b;enabling a feature in beta but not production&#x7d;.</li>
          <li>Logging Levels.</li>
          <li>Application Settings &#x7b;e.g., caching duration, timeout values&#x7d;.</li>
          <li>Configuration specific to a particular deployment instance (if dynamically provisioned).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="w-6 h-6" /> Implementation Approaches
        </h2>
        <p>Several methods can be used to achieve dynamic JSON generation in a pipeline:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Wrench className="w-5 h-5" /> 1. Templating
        </h3>
        <p>
          Use a base JSON file with placeholder variables and a scripting language or templating engine to replace these placeholders with actual values from the environment.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Basic Template (`config.template.json`)</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`{
  "apiBaseUrl": "{{API_BASE_URL}}",
  "timeoutMs": {{REQUEST_TIMEOUT}},
  "featureFlags": {
    "enableNewDashboard": {{FLAG_NEW_DASHBOARD}},
    "showBetaNotice": {{FLAG_BETA_NOTICE}}
  }
}`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Example: Simple Node.js Templating Script (`generate-config.js`)</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`const fs = require('fs');

const template = fs.readFileSync('config.template.json', 'utf-8');

const config = template
  .replace('{{API_BASE_URL}}', process.env.API_BASE_URL || 'http://localhost:3000')
  .replace('{{REQUEST_TIMEOUT}}', process.env.REQUEST_TIMEOUT || '5000')
  .replace('{{FLAG_NEW_DASHBOARD}}', process.env.FLAG_NEW_DASHBOARD || 'false')
  .replace('{{FLAG_BETA_NOTICE}}', process.env.FLAG_BETA_NOTICE || 'true');

fs.writeFileSync('config.json', config);

console.log('Generated config.json');
`}
          </pre>
          <p className="mt-2 text-sm italic">
            Pipeline step: `node generate-config.js` before the main build.
          </p>
        </div>
        <p>
          More sophisticated templating engines (like Handlebars, EJS, or even shell tools like `envsubst`) offer richer syntax and features.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 2. Scripting Programmatically
        </h3>
        <p>
          Write a script that reads environment variables and directly constructs the JSON object in memory, then writes it to a file. This is more flexible for complex logic or transformations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Node.js Script (`generate-config-programmatic.js`)</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`const fs = require('fs');

const environment = process.env.NODE_ENV || 'development';

const config = {
  apiBaseUrl: process.env.API_BASE_URL || \`http://api.\${environment}.example.com\`,
  timeoutMs: parseInt(process.env.REQUEST_TIMEOUT || '10000', 10),
  featureFlags: {
    enableNewDashboard: process.env.FLAG_NEW_DASHBOARD === 'true',
    showBetaNotice: environment !== 'production' // Logic based on env
  },
  logLevel: process.env.LOG_LEVEL || (environment === 'production' ? 'info' : 'debug'),
  database: {
    host: process.env.DB_HOST, // Assumes DB_HOST is set in environment
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    // Password should be handled securely, not hardcoded or in env vars directly unless CI handles secrets
  }
};

// Clean up undefined values if necessary, or handle in your app
// Example: remove database block if DB_HOST is not set

fs.writeFileSync('config.json', JSON.stringify(config, null, 2));

console.log('Generated config.json programmatically');
`}
          </pre>
          <p className="mt-2 text-sm italic">
            Pipeline step: `node generate-config-programmatic.js` before the main build.
          </p>
        </div>
        <p>This approach works well with various scripting languages &#x7b;Python, Ruby, Bash with `jq`&#x7d;.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Package className="w-5 h-5" /> 3. Build Tool/CI/CD Specific Features
        </h3>
        <p>
          Many build tools &#x7b;like Webpack with plugins like `DefinePlugin` or `EnvironmentPlugin`&#x7d; or CI/CD platforms have built-in ways to inject environment variables directly into the code or build process, which can then be used to construct the JSON.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Webpack/Vite:</strong> Use `process.env` variables directly in your application code and let the build tool substitute them with values from the environment where the build is running. This might involve having a small config file loaded by the app that references these `process.env` values.</li>
          <li><strong>CI/CD Platforms:</strong> Tools like GitHub Actions, GitLab CI, Jenkins, Azure DevOps, AWS CodeBuild, etc., provide ways to define environment variables and secrets that are available to your build jobs. You can often execute simple shell commands or scripts directly within the pipeline definition to generate the JSON.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cloud className="w-6 h-6" /> Integrating with Build Pipelines
        </h2>
        <p>
          The dynamic generation step should typically occur early in your build pipeline, after checking out the code but before packaging or bundling the application.
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li><strong>Checkout Code:</strong> Retrieve the source code from your repository.</li>
          <li><strong>Set Environment Variables:</strong> The CI/CD platform loads environment-specific variables and secrets for the job.</li>
          <li><strong>Generate Configuration:</strong> Execute the script or templating command to create the final `config.json` (or similar) file.</li>
          <li>
            <PackageCheck className="inline w-5 h-5 mr-1" /> <strong>Build Application:</strong> Run your application&apos;s build process (e.g., `npm run build`, `yarn build`, Webpack, Parcel). The generated `config.json` should be placed in a location where the build process can include it in the final artifact (e.g., the build output directory).
          </li>
          <li><strong>Package Artifact:</strong> Create the deployable artifact (Docker image, zip file, etc.) which now includes the dynamically generated configuration file.</li>
          <li>
            <ServerCog className="inline w-5 h-5 mr-1" /> <strong>Deploy:</strong> Deploy the artifact to the target environment.
          </li>
        </ol>
        <p>
          Alternatively, configuration generation can happen during the *deployment* phase, especially if the configuration depends on the specific server or instance being deployed to. This might involve injecting variables directly into files on the target machine or via container orchestration tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Shield className="w-6 h-6" /> Security Considerations
        </h2>
        <p>
          While dynamic generation significantly improves security by keeping secrets out of source control, it&apos;s vital to use the secure mechanisms provided by your CI/CD platform or cloud provider for managing sensitive variables.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Use Secrets Management:</strong> Never store API keys, passwords, or other sensitive data directly in plain text environment variables within your pipeline configuration files &#x7b;like `.gitlab-ci.yml`, `.github/workflows/*.yml`&#x7d;. Use the platform&apos;s dedicated &quot;Secrets&quot; or &quot;Variables&quot; management interface, which encrypts these values.</li>
          <li><strong>Limit Variable Exposure:</strong> Only expose necessary variables to the build job.</li>
          <li><strong>Review Script Permissions:</strong> Ensure your configuration generation script only has access to the minimum necessary environment variables.</li>
          <li><strong>Avoid Logging Secrets:</strong> Be careful not to print sensitive variables to the pipeline logs during the generation process.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          Implementing dynamic JSON configuration generation in your build pipelines is a robust and secure pattern for managing environment-specific settings. It reduces manual effort, minimizes the risk of deploying incorrect configurations, and, most importantly, prevents sensitive data from being committed to your code repository. By leveraging simple scripts or build tool features, you can create a more maintainable, secure, and scalable configuration management strategy for your applications across different environments.
        </p>
      </div>
    </>
  );
}