import type { Metadata } from "next";
import {
  Settings,
  Workflow,
  Code,
  Lock,
  CheckCheck,
  X,
  Box,
  Terminal,
  Package,
  KeyRound,
  FileJson
} from "lucide-react"; // Using allowed icons

export const metadata: Metadata = {
  title: "Managing Environment Variables as JSON in CI/CD | Development Best Practices",
  description: "Explore the technique of encoding environment variables as a JSON string for structured configuration management in CI/CD pipelines.",
};

export default function EnvJsonCiCdArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Managing Environment Variables as JSON in CI/CD
      </h1>

      <p className="text-lg mb-8 text-center text-gray-600 dark:text-gray-400">
        A structured approach to handling complex configuration across environments.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-3 text-blue-500" size={28} />
            The Challenge of Environment Variables
          </h2>
          <p className="mb-4">
            As applications grow and the number of deployment environments increases (development, staging, production, etc.), managing configuration becomes a significant task. Traditional environment variables (`KEY=VALUE`) are simple and effective for basic settings like database URLs or API keys. However, when configurations become more complex, involving multiple related settings, lists, or nested structures, managing them solely through flat key-value pairs can become cumbersome, error-prone, and difficult to validate.
          </p>
          <p>
            For example, configuring external services might require multiple variables: `SERVICE_A_URL`, `SERVICE_A_TIMEOUT_MS`, `SERVICE_A_API_KEY`. Managing dozens or hundreds of such individual variables across different environments in a CI/CD pipeline can be a headache.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-3 text-green-500" size={28} />
            The Solution: Encoding as JSON
          </h2>
          <p className="mb-4">
            One effective pattern to handle this complexity is to encode related environment configuration for a service or feature as a single environment variable holding a <strong>JSON string</strong>.
          </p>
          <p>
            Instead of individual variables like:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto my-4 text-sm">
            <pre>
              {`DATABASE_URL=postgres://user:pass@host:port/db
API_KEY=supersecretkey
FEATURE_FLAGS_ENABLE_NEW_DESIGN=true
FEATURE_FLAGS_ENABLE_BETA_ACCESS=false
ANALYTICS_PROVIDER=mixpanel
ANALYTICS_TOKEN=anothersecret
...`}
            </pre>
          </div>
          <p>
            You could consolidate related settings into JSON strings:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto my-4 text-sm">
            <h3 className="font-medium mb-2">Example JSON Environment Variables:</h3>
            <pre className="whitespace-pre-wrap break-words">
              {`DATABASE_CONFIG={"url":"postgres://user:pass@host:port/db","poolSize":10}
FEATURE_FLAGS={"enableNewDesign":true,"enableBetaAccess":false,"experiments":["exp_a","exp_b"]}
ANALYTICS_CONFIG={"provider":"mixpanel","token":"anothersecret","enabledEvents":["login","signup","purchase"]}`}
            </pre>
          </div>
          <p>
            In your application code, you would then parse the relevant JSON string from <code>process.env</code> (or similar) and use the resulting object.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Workflow className="mr-3 text-purple-500" size={28} />
            Implementation in CI/CD Pipelines
          </h2>
          <p className="mb-4">
            Implementing this pattern involves a few key steps in your Continuous Integration/Continuous Deployment pipeline:
          </p>

          <h3 className="text-xl font-semibold mb-3 flex items-center">
             <KeyRound className="mr-2 text-yellow-500" /> 1. Secure Storage
          </h3>
          <p className="mb-4">
            Store the full JSON configuration strings securely. CI/CD platforms (GitHub Actions, GitLab CI, Jenkins, AWS Secrets Manager, HashiCorp Vault, etc.) offer built-in secret management features designed for this purpose. You define your JSON string (e.g., <code>{`{"key": "value", "list": [1, 2, 3]}`}</code>) as the value of a secret variable (e.g., <code>APP_CONFIG_JSON</code>). Avoid storing these directly in your version control system.
          </p>

          <h3 className="text-xl font-semibold mb-3 flex items-center">
             <Terminal className="mr-2 text-red-500" /> 2. Retrieval During Build/Deployment
          </h3>
          <p className="mb-4">
            Your CI/CD pipeline steps will retrieve the stored JSON string secret and expose it as an environment variable to the build or deployment environment. The exact mechanism depends on your CI/CD tool.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto my-4 text-sm">
            <h3 className="font-medium mb-2">Conceptual CI/CD Step:</h3>
            <pre>
              {`# Example pseudo-code for a CI/CD step
- name: Set Environment Variables
  run: |
    # Retrieve secret from CI/CD platform's secret store
    # This might be done automatically or via a specific command/action
    export APP_CONFIG_JSON=$SECRET_APP_CONFIG_JSON_FROM_STORE
    export FEATURE_FLAGS_JSON=$SECRET_FEATURE_FLAGS_FROM_STORE
    # These variables are now available to subsequent steps (like build/run)`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-3 flex items-center">
             <Code className="mr-2 text-blue-500" /> 3. Parsing in Application Code
          </h3>
          <p className="mb-4">
            In your application's startup code or configuration loading module, access the environment variable holding the JSON string and parse it using a built-in JSON parser (like <code>JSON.parse</code> in JavaScript/TypeScript). It's crucial to wrap this in a <code>try...catch</code> block as parsing an invalid JSON string will throw an error.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 overflow-x-auto my-4 text-sm">
            <h3 className="font-medium mb-2">TypeScript/JavaScript Parsing Example:</h3>
            <pre>
              {`interface AppConfig {
  url: string;
  timeout: number;
  apiKey: string;
  enabledFeatures: string[];
  retries?: number;
}

interface FeatureFlags {
  enableNewDesign: boolean;
  enableBetaAccess: boolean;
  experiments: string[];
}

let appConfig: AppConfig;
let featureFlags: FeatureFlags;

try {
  // Ensure the environment variables are set during the CI/CD step
  const appConfigJsonString = process.env.APP_CONFIG_JSON;
  const featureFlagsJsonString = process.env.FEATURE_FLAGS_JSON;

  if (!appConfigJsonString) {
    throw new Error("APP_CONFIG_JSON environment variable is not set.");
  }
   if (!featureFlagsJsonString) {
    throw new Error("FEATURE_FLAGS_JSON environment variable is not set.");
  }

  // Parse the JSON strings
  // Cast or validate the parsed objects against interfaces/schemas if needed
  appConfig = JSON.parse(appConfigJsonString) as AppConfig;
  featureFlags = JSON.parse(featureFlagsJsonString) as FeatureFlags;

  console.log("Configuration loaded successfully.");
  // console.log("App URL:", appConfig.url);
  // console.log("New Design Enabled:", featureFlags.enableNewDesign);

} catch (error: any) {
  console.error("Failed to load configuration from JSON environment variables:", error.message);
  // Depending on your application, you might want to exit or use default config
  process.exit(1);
}

// Now 'appConfig' and 'featureFlags' objects are available globally
// or passed to your application modules.
// Example usage:
// const serviceUrl = appConfig.url;`}
            </pre>
          </div>
          <p className="mb-4">
            Adding type interfaces (as shown in the TypeScript example) and validation against a schema (like Zod or Joi) is highly recommended to ensure the parsed configuration has the expected structure and types at runtime.
          </p>

           <h3 className="text-xl font-semibold mb-3 flex items-center">
             <Package className="mr-2 text-teal-500" /> 4. Application Usage
          </h3>
          <p>
            Once parsed, the configuration is available as native objects within your application, allowing you to access structured settings easily and safely (especially with TypeScript interfaces).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCheck className="mr-3 text-green-600" size={28} />
            Advantages
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Structured Configuration:</strong> Naturally groups related settings, improving organization and readability compared to dozens of flat variables.
            </li>
            <li>
              <strong>Easier Management:</strong> Reduces the number of individual environment variables managed in CI/CD secrets. A service's entire config can be a single JSON variable.
            </li>
            <li>
              <strong>Complex Data Types:</strong> Easily handle arrays, nested objects, booleans, and numbers without complex string parsing or specific naming conventions.
            </li>
             <li>
              <strong>Validation:</strong> JSON parsing errors are immediately apparent at application startup. You can add schema validation for stricter type and structure checking.
            </li>
             <li>
              <strong>Reduced Naming Conflicts:</strong> Since configuration is namespaced within the JSON structure, it reduces the chance of accidental naming conflicts with other environment variables.
            </li>
          </ul>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <X className="mr-3 text-red-600" size={28} />
            Disadvantages and Considerations
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Requires Parsing Logic:</strong> Your application must include code to parse the JSON string. This adds a small amount of complexity compared to directly reading primitive strings/numbers.
            </li>
            <li>
              <strong>Security of the Full Blob:</strong> Storing a large JSON string as a single secret means a breach of that single secret could expose a significant amount of configuration data. Ensure your secret management is robust.
            </li>
            <li>
              <strong>Size Limits:</strong> Some systems might have limits on the size of individual environment variables. Very large JSON structures might exceed these limits, though this is uncommon for typical application configuration.
            </li>
             <li>
              <strong>Readability in CI/CD UI:</strong> Viewing and editing a long JSON string in a CI/CD web interface might be less convenient than managing individual fields, although this depends on the platform's UI.
            </li>
          </ul>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Lock className="mr-3 text-orange-500" size={28} />
            Security Best Practices
          </h2>
          <p className="mb-4">
            When using this approach, always:
          </p>
           <ul className="list-disc pl-6 space-y-2">
            <li>
              Store the JSON strings in dedicated, secure CI/CD secret management features (Vaults, Secret Managers, Encrypted Variables), not standard variables or source code.
            </li>
            <li>
              Restrict access to these secrets within your CI/CD platform to only the necessary pipelines and users.
            </li>
            <li>
              Avoid logging the raw JSON string or its parsed contents in your CI/CD pipeline output or application logs, especially if it contains sensitive information.
            </li>
             <li>
              Implement robust error handling and validation during parsing in your application to prevent runtime issues if the JSON is malformed or incomplete.
            </li>
          </ul>
        </section>

         <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Box className="mr-3 text-indigo-500" size={28} />
            Conclusion
          </h2>
          <p>
            Encoding complex or related environment configuration as JSON strings stored in secure CI/CD secrets provides a structured, maintainable, and less error-prone way to manage settings across environments. While it adds a small parsing step in your application, the benefits in organization, type safety (with languages like TypeScript), and handling complex data types often outweigh this minor overhead, making it a worthwhile pattern for modern applications with significant configuration needs.
          </p>
        </section>

      </div>
    </div>
  );
}