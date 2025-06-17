import type { Metadata } from "next";
import { Layers, Cloud, Settings, CheckCircle, XCircle, GitMerge, Code, Package, TreePine } from "lucide-react"; // Using allowed icons

export const metadata: Metadata = {
  title: "JSON Property Inheritance in Multi-Stage Deployments | Dev Article",
  description:
    "Learn how to manage configuration across development, staging, and production environments using JSON property inheritance.",
};

export default function JsonPropertyInheritanceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Layers className="w-8 h-8 text-blue-500" /> JSON Property Inheritance in Multi-Stage Deployments
      </h1>

      <div className="space-y-6">
        <p>
          Managing application configuration across different deployment environments (like development, staging, and
          production) is a common challenge. Databases URLs, API keys, feature flags, logging levels, and external
          service endpoints often vary between stages. While environment variables are a popular method, using
          configuration files, particularly JSON, offers structure and version control benefits.
        </p>
        <p>
          When using JSON for configuration, you often find yourself repeating many settings that are common across all
          environments, with only a few properties differing. This is where the concept of JSON property inheritance
          becomes incredibly useful.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6 text-green-500" /> The Problem with Repetitive Configuration
        </h2>
        <p>Imagine you have a configuration file for your application:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Development Configuration (dev.json):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app": {
    "name": "My App (Dev)",
    "version": "1.0.0"
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "user": "dev_user",
    "password": "dev_password",
    "database": "myapp_dev"
  },
  "api": {
    "baseUrl": "http://localhost:3000/api/v1",
    "timeout": 5000
  },
  "logging": {
    "level": "debug",
    "format": "json"
  },
  "features": {
    "betaEnabled": true,
    "darkMode": true
  }
}`}
          </pre>
          <h3 className="text-lg font-medium mb-2 mt-4">Production Configuration (prod.json):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app": {
    "name": "My App",
    "version": "1.0.0"
  },
  "database": {
    "host": "prod.mydb.com",
    "port": 5432,
    "user": "prod_user",
    "password": "PROD_SECURE_PASSWORD",
    "database": "myapp_prod"
  },
  "api": {
    "baseUrl": "https://api.myapp.com/v1",
    "timeout": 10000
  },
  "logging": {
    "level": "info",
    "format": "json"
  },
  "features": {
    "betaEnabled": false,
    "darkMode": true
  }
}`}
          </pre>
        </div>
        <p>
          Notice the significant overlap between `dev.json` and `prod.json`. The `app.version`, `database.port`,
          `logging.format`, and `features.darkMode` are the same. If you need to update `app.version` or add a new
          common setting, you have to do it in multiple files. This repetition violates the DRY (Don&apos;t Repeat
          Yourself) principle, increases the risk of errors (forgetting to update one file), and makes configuration
          harder to maintain.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitMerge className="w-6 h-6 text-purple-500" /> What is JSON Property Inheritance?
        </h2>
        <p>
          JSON property inheritance, in this context, is a strategy where you define a base configuration and then
          create environment-specific configuration files that &quot;inherit&quot; from the base, only overriding or
          adding the properties that differ. This is typically achieved by merging JSON objects.
        </p>
        <p>The core idea is a layered approach:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Base Configuration:</strong> Contains all the common settings shared across all environments.
          </li>
          <li>
            <strong>Environment-Specific Configuration:</strong> Contains only the settings that are different or new
            for a particular environment.
          </li>
          <li>
            <strong>Merging Process:</strong> At application startup or build time, the environment-specific
            configuration is merged on top of the base configuration. Properties in the environment file overwrite
            properties in the base file if they exist in both. New properties in the environment file are added.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <TreePine className="w-6 h-6 text-yellow-600" /> Implementing Inheritance with Layered Files
        </h2>
        <p>Let&apos;s refactor the previous example using a base file and environment-specific overrides.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Base Configuration (base.json):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app": {
    "name": "My App",
    "version": "1.0.0"
  },
  "database": {
    "port": 5432,
    "user": "default_user",
    "password": "default_password"
  },
  "api": {
    "timeout": 10000
  },
  "logging": {
    "level": "info",
    "format": "json"
  },
  "features": {
    "betaEnabled": false,
    "darkMode": true,
    "newFeature": false
  },
  "commonSetting": "This is a setting common to all environments"
}`}
          </pre>
          <h3 className="text-lg font-medium mb-2 mt-4">Development Override (dev.json):</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            (This file will be merged on top of base.json for the development environment)
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app": {
    "name": "My App (Dev)"
  },
  "database": {
    "host": "localhost",
    "user": "dev_user",
    "password": "dev_password",
    "database": "myapp_dev"
  },
  "api": {
    "baseUrl": "http://localhost:3000/api/v1",
    "timeout": 5000 // Override timeout
  },
  "logging": {
    "level": "debug" // Override logging level
  },
  "features": {
    "betaEnabled": true // Override betaEnabled
  },
  "devSpecificSetting": "This setting only exists in development"
}`}
          </pre>
          <h3 className="text-lg font-medium mb-2 mt-4">Production Override (prod.json):</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            (This file will be merged on top of base.json for the production environment)
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "database": {
    "host": "prod.mydb.com",
    "user": "prod_user",
    "password": "PROD_SECURE_PASSWORD",
    "database": "myapp_prod"
  },
  "api": {
    "baseUrl": "https://api.myapp.com/v1"
    // Use the base timeout of 10000
  },
  // Use the base logging level of info
  "features": {
    "newFeature": true // Enable new feature in production
  }
  // Use the base commonSetting
}`}
          </pre>
        </div>
        <p>
          To get the final configuration for an environment, you perform a deep merge of the base JSON object with the
          environment-specific JSON object. A deep merge means that nested objects are also merged property by property,
          rather than the environment object simply replacing the base object entirely.
        </p>
        <p>For example, merging `dev.json` onto `base.json` would result in:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Resulting Development Configuration:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app": {
    "name": "My App (Dev)", // Overridden
    "version": "1.0.0"      // Inherited from base
  },
  "database": {
    "host": "localhost",     // Added
    "port": 5432,            // Inherited from base
    "user": "dev_user",      // Overridden
    "password": "dev_password", // Overridden
    "database": "myapp_dev"  // Added
  },
  "api": {
    "baseUrl": "http://localhost:3000/api/v1", // Added
    "timeout": 5000          // Overridden
  },
  "logging": {
    "level": "debug",        // Overridden
    "format": "json"         // Inherited from base
  },
  "features": {
    "betaEnabled": true,     // Overridden
    "darkMode": true,        // Inherited from base
    "newFeature": false      // Inherited from base
  },
  "commonSetting": "This is a setting common to all environments", // Inherited from base
  "devSpecificSetting": "This setting only exists in development"   // Added
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-500" /> Handling Different Data Types During Merge
        </h2>
        <p>Merging objects is straightforward, but you need to define how other data types are handled:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Primitive Types (strings, numbers, booleans, null):</strong> The value in the environment file
            simply replaces the value in the base file.
          </li>
          <li>
            <strong>Objects:</strong> Deep merge is usually the desired behavior, merging properties from the
            environment object into the base object.
          </li>
          <li>
            <strong>Arrays:</strong> This is where it gets tricky and depends on your needs. Common strategies include:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>
                <strong>Replace:</strong> The array in the environment file completely replaces the array in the base
                file.
              </li>
              <li>
                <strong>Concatenate:</strong> Elements from the environment array are appended to the elements from the
                base array.
              </li>
              <li>
                <strong>Merge by Key:</strong> If the array contains objects with unique identifiers (like an `id` or
                `name` property), merge objects with matching keys and add non-matching ones. This is complex and less
                common for simple config.
              </li>
            </ul>
            <p>
              Typically, the &quot;replace&quot; strategy for arrays is the simplest and often sufficient for
              configuration files.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Package className="w-6 h-6 text-pink-500" /> Tooling and Libraries
        </h2>
        <p>
          Implementing the merge logic yourself is possible, but using a well-tested library is often better. Many
          programming languages and ecosystems have libraries for deep merging objects.
        </p>
        <p>For example, in Node.js/TypeScript, you might use libraries like `lodash.merge` or `deepmerge`.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Conceptual Merge Logic:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Using a hypothetical deepMerge function

import deepMerge from 'deepmerge'; // Example library import

const baseConfig = require('./base.json');
const envConfig = require('./\${NODE_ENV}.json'); // Dynamically load env file

const finalConfig = deepMerge(baseConfig, envConfig);

// finalConfig is now the merged object ready to use
console.log(finalConfig);
`}
          </pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            (Note: `require` might need adjustment based on your module system, e.g., dynamic `import()` with await).
          </p>
        </div>
        <p>
          Some configuration management libraries might also provide built-in support for layering or inheritance from
          multiple files or sources.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-teal-500" /> Advantages
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>DRY (Don&apos;t Repeat Yourself):</strong> Reduces redundancy by keeping common settings in one
            place.
          </li>
          <li>
            <strong>Maintainability:</strong> Easier to update common settings or add new ones across all environments.
          </li>{" "}
          {/* Added closing li tag */}
          <li>
            <strong>Readability:</strong> Environment-specific files are smaller and show only the differences, making
            it clear what changes between stages.
          </li>
          <li>
            <strong>Reduced Errors:</strong> Less copy-pasting means fewer chances of introducing typos or
            inconsistencies.
          </li>
          <li>
            <strong>Version Control Friendly:</strong> Changes to configuration are explicit in smaller,
            difference-focused files.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <XCircle className="w-6 h-6 text-red-500" /> Disadvantages and Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Requires Merge Logic:</strong> You need a process (tooling or code) to perform the merge before the
            configuration can be used.
          </li>
          <li>
            <strong>Complexity with Arrays:</strong> Deciding and implementing the array merge strategy can add
            complexity.
          </li>
          <li>
            <strong>Debugging:</strong> Sometimes tracking down the final value of a deeply nested property requires
            looking at multiple files and understanding the merge order.
          </li>
          <li>
            <strong>Sensitive Data:</strong> Passwords and API keys should ideally not be stored directly in these
            files, especially if they are committed to public repositories. Environment variables or secrets management
            systems are better suited for sensitive data, potentially overriding values from the JSON merge.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cloud className="w-6 h-6 text-gray-500" /> Integration with Deployment Pipelines
        </h2>
        <p>
          In a multi-stage deployment pipeline, the merging process typically happens as part of the build or deployment
          step for each environment. The build script determines the target environment (e.g., based on a `NODE_ENV`
          variable) and then performs the merge, creating a final, flattened configuration object that the application
          can easily load.
        </p>
        <p>
          This ensures that the application code itself doesn&apos;t need complex logic to figure out its configuration;
          it just loads the already merged, environment-specific config file.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          JSON property inheritance using layered configuration files and a merging process is an effective pattern for
          managing differences across development, staging, and production environments. It promotes the DRY principle,
          improves maintainability, and makes configuration easier to understand by highlighting only the
          environment-specific overrides. While it introduces a merging step into your workflow, the benefits in terms
          of reduced errors and improved clarity often outweigh this overhead, especially for applications with
          non-trivial configuration. Remember to combine this technique with secure practices for handling sensitive
          information.
        </p>
      </div>
    </>
  );
}
