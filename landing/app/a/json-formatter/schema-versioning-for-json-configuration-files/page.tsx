import type { Metadata } from "next";
import {
  AlertTriangle,
  GitCommitHorizontal,
  Code,
  ArrowRight,
  CheckCircle,
  Book,
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Schema Versioning for JSON Configuration Files",
  description:
    "Learn essential strategies and best practices for managing changes to your JSON configuration file schemas over time.",
};

export default function JsonSchemaVersioningArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Schema Versioning for JSON Configuration Files
      </h1>

      <div className="space-y-6">
        <p>
          JSON has become a ubiquitous format for configuration files due to its
          human-readability and ease of parsing. However, as your applications
          evolve, so too will their configuration needs. This often leads to
          changes in the structure (schema) of your JSON config files. Without a
          plan for managing these changes, you can quickly run into issues with
          backwards compatibility, making deployments difficult and potentially
          breaking older versions of your application or configuration tooling.
        </p>
        <p>
          This article explores why schema versioning for JSON configuration is
          important and outlines several strategies for implementing it
          effectively, suitable for developers of all levels.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
          <span>The Problem: Configuration Schema Evolution</span>
        </h2>
        <p>
          Imagine you have a simple JSON configuration file for a feature flag:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Config v1:</h3>
          <pre>
            {`{
  "featureEnabled": true,
  "message": "Feature is active!"
}`}
          </pre>
        </div>
        <p>
          Later, you decide to make the feature more complex, requiring separate
          messages for different user roles and introducing a start date. You
          update the configuration file:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Config v2 (breaking change):</h3>
          <pre>
            {`{
  "feature": {
    "enabled": true,
    "startDate": "2023-10-27T10:00:00Z",
    "messages": {
      "admin": "Admin feature message",
      "user": "User feature message"
    }
  }
}`}
          </pre>
        </div>
        <p>
          Your application code written to read v1 will likely break when it
          encounters v2. It expects a top-level `featureEnabled` boolean and a
          `message` string, but finds a `feature` object instead. Deploying new code
          that understands v2 won&apos;t help older versions of the code running
          elsewhere, or configuration tools that still expect v1.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <GitCommitHorizontal className="w-6 h-6 text-blue-500" />
          <span>Why Version Your Configuration?</span>
        </h2>
        <p>Implementing configuration schema versioning provides several key benefits:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Backwards Compatibility:</strong> Allows newer code versions to
            gracefully handle older configuration formats, and vice-versa (if
            forward compatibility is also implemented).
          </li>
          <li>
            <strong>Smoother Deployments:</strong> Reduces the risk of application
            failures when configuration files are updated or rolled back.
          </li>
          <li>
            <strong>Clear Communication:</strong> Explicitly signals to developers and
            tools what format a configuration file is expected to be in.
          </li>
          <li>
            <strong>Migration Path:</strong> Provides a defined process for
            transitioning configurations from an older schema to a newer one.
          </li>
          <li>
            <strong>Tooling Support:</strong> Enables development of tools (validators,
            migrators) that understand different versions of your configuration.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Book className="w-6 h-6 text-green-500" />
          <span>Versioning Strategies</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code className="w-5 h-5" />
          <span>1. Explicit Version Field</span>
        </h3>
        <p>
          The most common and often simplest approach is to include a dedicated
          field, typically named `version` or `schemaVersion`, within the JSON
          object itself. This field&apos;s value (usually an integer or a string like
          &quot;1.0.0&quot;) indicates the schema version.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Config v1 with version field:</h3>
          <pre>
            {`{
  "version": 1,
  "featureEnabled": true,
  "message": "Feature is active!"
}`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Config v2 with version field:</h3>
          <pre>
            {`{
  "version": 2,
  "feature": {
    "enabled": true,
    "startDate": "2023-10-27T10:00:00Z",
    "messages": {
      "admin": "Admin feature message",
      "user": "User feature message"
    }
  }
}`}
          </pre>
        </div>
        <p>
          When your application or tool loads the configuration, it first reads
          the `version` field. Based on this value, it knows which parsing logic or
          data structure to apply.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Conceptual parsing logic:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function loadConfig(jsonData: string): AppConfig {
  const config = JSON.parse(jsonData);
  const version = config.version || 1; // Default to v1 if no version field

  switch (version) {
    case 1:
      return parseConfigV1(config);
    case 2:
      // Optionally migrate V2 to the latest internal representation
      const v2Config = parseConfigV2(config);
      return migrateV2ToLatest(v2Config); // Migration step
    // Add cases for future versions
    default:
      throw new Error(\`Unsupported config version: \${version}\`);
  }
}

// Need separate parsing/validation functions for each version
function parseConfigV1(data: any): AppConfigV1 { ... }
function parseConfigV2(data: any): AppConfigV2 { ... }

// Migration logic if needed
function migrateV2ToLatest(data: AppConfigV2): AppConfig { ... }

// Define TypeScript types for each config version and the final internal representation
interface AppConfigV1 {
  featureEnabled: boolean;
  message: string;
}

interface AppConfigV2 {
  feature: {
    enabled: boolean;
    startDate: string;
    messages: { admin: string; user: string };
  };
}

interface AppConfig {
  // The consistent internal representation
  isFeatureActive: boolean;
  featureStartDate?: Date;
  adminMessage: string;
  userMessage: string;
}
`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Simple to implement, version is clearly visible
          within the file, works well with migration scripts.
        </p>
        <p>
          <strong>Cons:</strong> Requires adding a field to the root of your schema,
          every parser needs to check the version field first.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code className="w-5 h-5" />
          <span>2. Implicit Versioning (File Naming)</span>
        </h3>
        <p>
          Instead of putting the version inside the JSON, you can encode it in the
          file name or directory structure.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example file names:</h3>
          <pre>
            {`config.v1.json
config.v2.json
config_schema_3.json`}
          </pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example directory structure:</h3>
          <pre>
            {`/config/
  /v1/
    settings.json
  /v2/
    settings.json`}
          </pre>
        </div>
        <p>
          The application logic then determines the version based on the file path
          it loads from.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Conceptual loading logic:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`async function loadConfigFromFile(filePath: string): Promise<AppConfig> {
  const jsonData = await readFile(filePath, 'utf-8'); // Assuming a file reading function
  const config = JSON.parse(jsonData);

  // Determine version from file path
  let version: number | undefined;
  if (filePath.includes('.v1.')) version = 1;
  else if (filePath.includes('.v2.')) version = 2;
  // ... or parse from directory structure

  if (version === undefined) {
    throw new Error(\`Could not determine config version from file path: \${filePath}\`);
  }

  switch (version) {
    case 1:
      return parseConfigV1(config);
    case 2:
      const v2Config = parseConfigV2(config);
      return migrateV2ToLatest(v2Config);
    default:
      throw new Error(\`Unsupported config version: \${version}\`);
  }
}
`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Pros:</strong> Keeps the JSON file clean, allows multiple
          versions of the same logical configuration to exist side-by-side in the
          file system.
        </p>
        <p>
          <strong>Cons:</strong> Version information is external to the file,
          requires a convention for naming/structure, can be less intuitive for
          someone just looking at the JSON content.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Book className="w-5 h-5" />
          <span>3. Schema-Based Versioning (e.g., JSON Schema)</span>
        </h3>
        <p>
          For more complex configurations or environments where strong validation
          is critical, you can define your JSON schemas using a standard like
          JSON Schema. You then maintain separate JSON Schema files for each version
          of your configuration structure.
        </p>
        <p>
          While JSON Schema files aren&apos;t part of the configuration itself, they
          act as the formal definition of what a configuration file for a specific
          version should look like. Your tools can use these schema files to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Validate a config file against a specific version&apos;s schema.</li>
          <li>Generate documentation.</li>
          <li>Potentially generate code for parsing.</li>
        </ul>
        <p>
          You would typically still combine this with an explicit `version` field
          in the JSON config file itself to indicate which JSON Schema definition
          it adheres to.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Example JSON Schema (Partial v2):</h3>
          <pre>
            {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AppConfig v2",
  "description": "Schema for application configuration version 2",
  "type": "object",
  "properties": {
    "version": {
      "const": 2,
      "description": "Configuration schema version"
    },
    "feature": {
      "type": "object",
      "properties": {
        "enabled": { "type": "boolean" },
        "startDate": { "type": "string", "format": "date-time" },
        "messages": {
          "type": "object",
          "properties": {
            "admin": { "type": "string" },
            "user": { "type": "string" }
          },
          "required": ["admin", "user"]
        }
      },
      "required": ["enabled", "startDate", "messages"]
    }
  },
  "required": ["version", "feature"],
  "additionalProperties": false
}`}
          </pre>
        </div>
        <p>
          Your loading/parsing logic would look similar to the explicit version
          field approach, but you might add a validation step using a JSON Schema
          library before parsing.
        </p>
        <p>
          <strong>Pros:</strong> Provides formal, machine-readable definitions of
          your schemas; excellent for validation; supports sophisticated tooling.
        </p>
        <p>
          <strong>Cons:</strong> Adds an external dependency (JSON Schema library)
          and additional files to manage; more complex to set up initially.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ArrowRight className="w-6 h-6 text-purple-500" />
          <span>Handling Migrations</span>
        </h2>
        <p>
          Simply knowing the version isn&apos;t enough if you need to process older
          configuration files with newer code that expects the latest structure. This
          is where migration logic comes in. A migration is a process that
          transforms configuration data from an older schema version to a newer one.
        </p>
        <p>
          Migrations can be applied:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>During Loading (Runtime Migration):</strong> The application
            reads an older config, applies transformations in memory to convert
            it to the latest internal structure before use.
          </li>
          <li>
            <strong>As a Separate Tool/Script (Offline Migration):</strong> A
            utility reads an older config file and writes a new config file in a
            newer format. This is useful for upgrading persistent configuration
            files.
          </li>
        </ul>
        <p>
          Runtime migration is often convenient for handling minor schema changes
          or supporting older config files on the fly. Offline migration is
          essential for major schema overhauls.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-2">Conceptual Migration Function (v1 to v2):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assuming we parsed V1 config into AppConfigV1 type
function migrateV1ToV2(configV1: AppConfigV1): AppConfigV2 {
  // Create the V2 structure
  const configV2: AppConfigV2 = {
    version: 2, // Explicitly set the new version
    feature: {
      enabled: configV1.featureEnabled,
      startDate: new Date().toISOString(), // Add a default or calculate
      messages: {
        admin: configV1.message, // Use V1 message for admin? Or default?
        user: configV1.message // Use V1 message for user? Or default?
      }
    }
  };
  return configV2;
}

// Example of chained migration (v1 -> v2 -> v3 ...)
function migrateToLatest(config: any): AppConfig {
  let currentConfig = config;
  let currentVersion = config.version || 1;

  if (currentVersion < 2) {
    currentConfig = migrateV1ToV2(currentConfig);
    currentVersion = 2;
  }

  // if (currentVersion < 3) {
  //   currentConfig = migrateV2ToV3(currentConfig);
  //   currentVersion = 3;
  // }

  // After all migrations, parse the final structure
  return parseLatestConfig(currentConfig);
}
`}
            </pre>
          </div>
        </div>
        <p>
          Migration logic can become complex quickly, especially with multiple
          versions and significant schema changes. Thorough testing of migration
          paths is crucial.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle className="w-6 h-6 text-teal-500" />
          <span>Best Practices</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Document Your Schemas:</strong> Clearly define the structure and
            meaning of each field for every version. JSON Schema helps with this.
          </li>
          <li>
            <strong>Use Incremental Changes:</strong> Avoid massive schema overhauls
            in a single step if possible. Smaller, incremental changes are easier
            to version and migrate.
          </li>
          <li>
            <strong>Design for Forwards/Backwards Compatibility:</strong> Ideally,
            newer code should read older configs, and older code should *ignore*
            new fields in newer configs if possible (backward compatible changes).
            Adding optional fields is easier than removing or renaming required ones.
          </li>
          <li>
            <strong>Test Migrations Thoroughly:</strong> Write tests to ensure your
            migration logic correctly transforms data from every supported older
            version to the latest.
          </li>
          <li>
            <strong>Establish a Clear Versioning Policy:</strong> Decide early on
            whether you&apos;ll use integers, semantic versioning strings, etc., and
            how you&apos;ll increment the version number.
          </li>
          <li>
            <strong>Consider Default Values:</strong> When adding new fields, define
            sensible default values so that older configurations without that field
            can still be migrated or used by newer code.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Ignoring configuration schema versioning is a common pitfall that can lead
          to significant headaches down the road. By proactively implementing a
          versioning strategy &mdash; whether a simple explicit version field or a
          more robust JSON Schema approach &mdash; and planning for migrations, you
          can ensure your application remains maintainable, your deployments are
          smoother, and your configuration process is less error-prone as your
          system evolves. Choose the strategy that best fits the complexity of
          your configuration and the needs of your development lifecycle.
        </p>
      </div>
    </>
  );
}
