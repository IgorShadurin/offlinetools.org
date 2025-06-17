import type { Metadata } from "next";
import { AlertTriangle, CheckCircle, FileJson, Folder, Lock, Settings, Server, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Multi-Environment JSON Configuration Management",
  description:
    "Learn effective strategies for managing configuration settings across different environments using JSON files.",
};

export default function MultiEnvironmentJsonConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Multi-Environment JSON Configuration Management</h1>

      <div className="space-y-6">
        <p>
          Modern applications rarely run in just one setting. Developers work in a <strong>development</strong>{" "}
          environment, test in <strong>staging</strong> or <strong>QA</strong>, and deploy to{" "}
          <strong>production</strong>. Each environment often requires slightly (or significantly) different
          configuration settings &mdash; database credentials, API endpoints, feature flags, logging levels, etc.
          Managing these differences efficiently and safely is crucial. JSON files are a popular choice for storing
          configuration due to their readability and widespread support.
        </p>
        <p>
          This article explores common patterns and best practices for managing these environment-specific JSON
          configurations.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpen className="inline-block" /> Why JSON for Configuration?
        </h2>
        <p>JSON (JavaScript Object Notation) is an ideal format for configuration because:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Human-Readable:</strong> The key-value structure is easy for developers to read and write.
          </li>
          <li>
            <strong>Machine-Readable:</strong> Easily parsed by virtually every programming language.
          </li>
          <li>
            <strong>Hierarchical Structure:</strong> Supports nested objects and arrays, allowing for organized
            configurations.
          </li>
          <li>
            <strong>Wide Tooling Support:</strong> Many editors provide JSON syntax highlighting and validation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="inline-block" /> Common Approaches
        </h2>
        <p>Let&apos;s look at a few standard methods for handling environment-specific JSON configs.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileJson className="inline-block" /> 1. Multiple Environment-Specific Files
        </h3>
        <p>This is perhaps the most straightforward approach. You create a separate JSON file for each environment.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Folder className="inline-block" /> File Structure Example:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`/config
├── config.development.json
├── config.staging.json
└── config.production.json`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 flex items-center gap-2">
            <FileJson className="inline-block" /> <code>config.development.json</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`&lbrace;
  "apiEndpoint": "http://localhost:3000/api",
  "logLevel": "debug",
  "featureFlags": &lbrace;
    "newUserProfile": true,
    "betaFeatures": true
  &rbrace;,
  "database": &lbrace;
    "host": "localhost",
    "port": 5432,
    "db": "app_dev"
    // Note: Credentials should ideally come from env vars, not config files
  &rbrace;
&rbrace;`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 flex items-center gap-2">
            <FileJson className="inline-block" /> <code>config.production.json</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`&lbrace;
  "apiEndpoint": "https://api.yourproductiondomain.com/api",
  "logLevel": "info",
  "featureFlags": &lbrace;
    "newUserProfile": true,
    "betaFeatures": false
  &rbrace;,
  "database": &lbrace;
    "host": "prod-db.yourcloud.com",
    "port": 5432,
    "db": "app_prod"
    // Again, credentials via env vars
  &rbrace;
&rbrace;`}
            </pre>
          </div>
        </div>

        <h4 className="text-lg font-medium mt-4">How to Load the Correct File:</h4>
        <p>
          In your application code (typically server-side or during a build process), you determine the current
          environment (usually via the <code>NODE_ENV</code> environment variable) and load the corresponding file.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Loading Logic (TypeScript/Node.js):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`// This logic would typically run once during application startup
import * as fs from 'fs';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development'; // Default to development
const configFileName = \`config.\${env}.json\`;
const configPath = path.join(process.cwd(), 'config', configFileName);

let config: any;

try &lbrace;
  const configFileContent = fs.readFileSync(configPath, 'utf-8');
  config = JSON.parse(configFileContent);
  // console.log(\`Loaded config for environment: \${env}\`);
&rbrace; catch (error: any) &lbrace;
  console.error(\`Error loading configuration file \${configPath}: \${error.message}\`);
  // Handle the error - maybe exit or load a fallback config
  // process.exit(1);
&rbrace;

// Now 'config' holds the settings for the current environment
// Example usage:
// const dbHost = config.database.host;
// const api = config.apiEndpoint;

// To make it globally accessible (caution needed in large apps):
// export default config;

// Or wrap it in a function to get config:
// export function getConfig() &lbrace;
//   if (!config) &lbrace;
//     // Optional: Implement loading logic here if not done at startup
//     console.error("Config not loaded yet!");
//     throw new Error("Configuration not available.");
//   &rbrace;
//   return config;
// &rbrace;
`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Simple to understand, clear separation per environment.
          <br />
          <strong>Cons:</strong> Duplication of common settings across files, easy to forget updating all files when a
          new setting is added.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileJson className="inline-block" /> 2. Single JSON File with Environment Keys
        </h3>
        <p>Keep all configurations in one file, nested under keys representing each environment.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <FileJson className="inline-block" /> <code>config.json</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`&lbrace;
  "development": &lbrace;
    "apiEndpoint": "http://localhost:3000/api",
    "logLevel": "debug",
    "featureFlags": &lbrace;
      "newUserProfile": true,
      "betaFeatures": true
    &rbrace;,
    "database": &lbrace;
      "host": "localhost",
      "port": 5432,
      "db": "app_dev"
    &rbrace;
  &rbrace;,
  "production": &lbrace;
    "apiEndpoint": "https://api.yourproductiondomain.com/api",
    "logLevel": "info",
    "featureFlags": &lbrace;
      "newUserProfile": true,
      "betaFeatures": false
    &rbrace;,
    "database": &lbrace;
      "host": "prod-db.yourcloud.com",
      "port": 5432,
      "db": "app_prod"
    &rbrace;
  &rbrace;
  // ... other environments
&rbrace;`}
            </pre>
          </div>
        </div>
        <h4 className="text-lg font-medium mt-4">How to Load the Correct Settings:</h4>
        <p>Load the single file and access the nested object matching the current environment.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Loading Logic (TypeScript/Node.js):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`// This logic would typically run once during application startup
import * as fs from 'fs';
import * as path from 'path';

const env = process.env.NODE_ENV || 'development'; // Default to development
const configPath = path.join(process.cwd(), 'config', 'config.json');

let config: any;
let environmentConfig: any;

try &lbrace;
  const configFileContent = fs.readFileSync(configPath, 'utf-8');
  config = JSON.parse(configFileContent);

  // Get the configuration object for the current environment
  environmentConfig = config[env];

  if (!environmentConfig) &lbrace;
      throw new Error(\`Configuration for environment "\${env}" not found in \${configPath}\`);
  &rbrace;

  // console.log(\`Loaded config for environment: \${env}\`);
&rbrace; catch (error: any) &lbrace;
  console.error(\`Error loading or parsing configuration from \${configPath}: \${error.message}\`);
  // Handle the error
  // process.exit(1);
&rbrace;

// Now 'environmentConfig' holds the settings for the current environment
// Example usage:
// const dbHost = environmentConfig.database.host;
// const api = environmentConfig.apiEndpoint;

// To make it globally accessible:
// export default environmentConfig;

// Or wrap it in a function:
// export function getConfig() &lbrace;
//   if (!environmentConfig) &lbrace;
//      console.error("Environment config not loaded yet!");
//      throw new Error("Environment configuration not available.");
//   &rbrace;
//   return environmentConfig;
// &rbrace;
`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> All configurations in one place, easy to compare settings across environments.
          <br />
          <strong>Cons:</strong> File can become very large and difficult to manage with many environments or settings,
          harder to use configuration cascading (e.g., a base config plus environment overrides).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileJson className="inline-block" /> 3. Base Config with Environment Overrides
        </h3>
        <p>
          Combine the previous two approaches by having a base configuration file with common settings, and
          environment-specific files that provide overrides or add new settings.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Folder className="inline-block" /> File Structure Example:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`/config
├── config.base.json
├── config.development.json
└── config.production.json`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 flex items-center gap-2">
            <FileJson className="inline-block" /> <code>config.base.json</code>:
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`&lbrace;
  "logLevel": "warn", // Default log level
  "timeoutMs": 5000,
  "featureFlags": &lbrace;
    "newUserProfile": true, // Enabled by default
    "betaFeatures": false   // Disabled by default
  &rbrace;
&rbrace;`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 flex items-center gap-2">
            <FileJson className="inline-block" /> <code>config.development.json</code>:
          </h4>
          <p className="text-sm italic">
            Overrides/adds settings from <code>config.base.json</code>
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`&lbrace;
  "apiEndpoint": "http://localhost:3000/api",
  "logLevel": "debug", // Override base
  "featureFlags": &lbrace;
    "betaFeatures": true // Override base
  &rbrace;,
  "database": &lbrace; // Add new section
    "host": "localhost",
    "port": 5432,
    "db": "app_dev"
  &rbrace;
&rbrace;`}
            </pre>
          </div>
        </div>
        <h4 className="text-lg font-medium mt-4">How to Load and Merge:</h4>
        <p>
          Load the base config first, then load the environment-specific config and merge it on top (environment
          settings override base settings).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Loading & Merging Logic (TypeScript/Node.js):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`// This logic would typically run once during application startup
import * as fs from 'fs';
import * as path from 'path';
// You would need a utility function for deep merging objects
// import merge from 'lodash.merge'; // Example with a library

// Simple deep merge example (handle objects, arrays might need more complex logic)
function deepMerge(target: any, source: any): any &lbrace;
    const output = &lbrace; ...target &rbrace;; // Start with a copy
    if (source && typeof source === 'object') &lbrace;
        Object.keys(source).forEach(key => &lbrace;
            if (source[key] && typeof source[key] === 'object' && target[key] && typeof target[key] === 'object') &lbrace;
                output[key] = deepMerge(target[key], source[key]);
            &rbrace; else &lbrace;
                output[key] = source[key]; // Override or add primitive/array/null values
            &rbrace;
        &rbrace;);
    &rbrace;
    return output;
&rbrace;


const env = process.env.NODE_ENV || 'development'; // Default to development
const baseConfigPath = path.join(process.cwd(), 'config', 'config.base.json');
const envConfigPath = path.join(process.cwd(), 'config', \`config.\${env}.json\`);

let config: any;

try &lbrace;
  const baseConfigContent = fs.readFileSync(baseConfigPath, 'utf-8');
  const baseConfig = JSON.parse(baseConfigContent);

  const envConfigContent = fs.readFileSync(envConfigPath, 'utf-8');
  const envConfig = JSON.parse(envConfigContent);

  // Merge environment config on top of base config
  config = deepMerge(baseConfig, envConfig);

  // console.log(\`Loaded and merged config for environment: \${env}\`);
&rbrace; catch (error: any) &lbrace;
  console.error(\`Error loading or merging configuration: \${error.message}\`);
  // Handle the error
  // process.exit(1);
&rbrace;

// Now 'config' contains the merged settings
// Example usage:
// const dbHost = config.database.host; // From env file
// const timeout = config.timeoutMs; // From base file
// const betaFeatures = config.featureFlags.betaFeatures; // Overridden in env file

// To make it globally accessible:
// export default config;

// Or wrap it in a function:
// export function getConfig() &lbrace;
//   if (!config) &lbrace;
//      console.error("Merged config not loaded yet!");
//      throw new Error("Configuration not available.");
//   &rbrace;
//   return config;
// &rbrace;

`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Reduces duplication, common settings are in one place, clear separation of base and
          overrides.
          <br />
          <strong>Cons:</strong> Requires a merging mechanism (simple merge for top-level keys, or a deep merge
          function/library for nested structures).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lock className="inline-block" /> Handling Sensitive Data: Configuration vs. Secrets
        </h2>
        <p>
          A critical best practice is separating non-sensitive configuration (like API endpoints, feature flags, log
          levels) from sensitive secrets (like database passwords, API keys, encryption keys).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle className="inline-block text-yellow-500" /> Never commit secrets to Git!
          </h4>
          <p className="mt-2">
            Configuration files checked into version control (like Git) should <strong>never</strong> contain sensitive
            information. These files are part of your codebase and could be accessed by anyone with access to the
            repository.
          </p>
        </div>
        <p>
          Sensitive data should be managed using <strong>environment variables</strong>. These variables are set on the
          server or in the deployment environment itself, outside of your application code and configuration files.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <Server className="inline-block" /> Using Environment Variables:
          </h4>
          <p className="mt-2">
            Access environment variables via <code>process.env</code> in Node.js.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto font-mono text-sm">
            <pre>
              {`// Inside your application code where you need database credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = config.database.host; // Host might still come from config file

if (!dbUser || !dbPassword) &lbrace;
    console.error("Database credentials environment variables not set!");
    // Handle missing credentials
    // process.exit(1);
&rbrace;

// Use dbUser and dbPassword to connect to the database at dbHost
`}
            </pre>
          </div>
          <p className="mt-2">
            You can combine environment variables with JSON configurations. For example, your JSON might define the
            database schema or connection options, but the user/password come from <code>process.env</code>.
          </p>
        </div>
        <p>
          Tools like <code>dotenv</code> can help manage environment variables in development by loading them from a{" "}
          <code>.env</code> file, but you should rely on your hosting provider&apos;s mechanism for production
          environment variables.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="inline-block" /> Configuration Validation
        </h2>
        <p>
          As configurations grow, it&apos;s easy to make mistakes &mdash; typos in keys, incorrect data types, missing
          required settings. Implementing validation helps catch these errors early.
        </p>
        <p>
          You can use JSON Schema or validation libraries (like Zod, Joi, or Yup) to define the expected structure and
          types of your configuration. Validate the loaded configuration object after parsing the JSON file(s).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="inline-block" /> Conclusion
        </h2>
        <p>
          Managing configurations across multiple environments is a fundamental aspect of building production-ready
          applications. Using JSON files provides a structured and readable way to define settings. The best approach
          (multiple files, single file with keys, or base with overrides) often depends on the complexity and number of
          your environments and settings.
        </p>
        <p>
          Regardless of the file structure you choose, remember the critical rule:{" "}
          <strong>secrets belong in environment variables, not committed configuration files</strong>. Implementing
          validation adds an extra layer of robustness to ensure your application starts with the correct settings in
          every environment.
        </p>
      </div>
    </>
  );
}
