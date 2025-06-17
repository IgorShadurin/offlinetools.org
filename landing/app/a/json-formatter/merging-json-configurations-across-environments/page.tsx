import type { Metadata } from "next";
import { Settings, Merge, Code, CheckCheck, Folder, Database, FlaskConical, Lock } from "lucide-react"; // Using only allowed icons

export const metadata: Metadata = {
  title: "Merging JSON Configurations Across Environments",
  description:
    "Learn how to effectively merge JSON configuration files for different development environments (development, staging, production) in your applications.",
};

export default function MergingJsonConfigsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Settings size={30} /> Merging JSON Configurations Across Environments
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Managing application configuration for different environments (like development, staging, and production) is a
          common task for developers. You often have settings that are shared across all environments (e.g., API
          endpoints, feature flags) and settings that are specific to each environment (e.g., database credentials,
          logging levels). Storing these settings in JSON files is a popular approach. However, simply replacing the
          entire configuration file based on the environment can lead to duplication and make updates tedious. This is
          where <strong>merging JSON configurations</strong> becomes incredibly useful.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Folder size={24} /> The Challenge: Environment-Specific Settings
        </h2>
        <p>
          Imagine you have a configuration file for your application.
          <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <code className="language-json">
              {`// config.development.json
&lbrace;
  "apiUrl": "https://dev.api.example.com",
  "database": &lbrace;
    "host": "localhost",
    "port": 27017,
    "name": "mydb_dev"
  &rbrace;,
  "logging": &lbrace;
    "level": "debug"
  &rbrace;,
  "featureFlags": &lbrace;
    "newDashboard": true
  &rbrace;
&rbrace;`}
            </code>
          </pre>
          <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <code className="language-json">
              {`// config.production.json
&lbrace;
  "apiUrl": "https://api.example.com",
  "database": &lbrace;
    "host": "prod-db.example.com",
    "port": 27017, // Same port
    "name": "mydb_prod"
  &rbrace;,
  "logging": &lbrace;
    "level": "info"
  &rbrace;,
  "performance": &lbrace; // New section
    "cacheEnabled": true
  &rbrace;
&rbrace;`}
            </code>
          </pre>
          Notice the overlap and the differences. If you just load &#x60;config.development.json&#x60; in development
          and &#x60;config.production.json&#x60; in production, you have to maintain potentially large parts of the
          configuration in multiple places. Adding a new common setting means editing every environment file. This is
          inefficient and error-prone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Merge size={24} /> Introducing Configuration Merging
        </h2>
        <p>
          A better approach is to define a <strong>base configuration</strong> that contains all shared settings and
          then have environment-specific files that only contain the overrides and additions for that particular
          environment.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-json">
            {`// config.base.json
&lbrace;
  "apiUrl": "https://default.api.example.com", // A reasonable default
  "database": &lbrace;
    "host": "localhost", // Default for local dev
    "port": 27017,
    "name": "default_db"
  &rbrace;,
  "logging": &lbrace;
    "level": "warn", // Default logging
    "format": "json"
  &rbrace;,
  "featureFlags": &lbrace;
    "newDashboard": false,
    "adminPanel": true
  &rbrace;
&rbrace;`}
          </code>
        </pre>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-json">
            {`// config.development.json
&lbrace;
  "apiUrl": "https://dev.api.example.com", // Override base
  "database": &lbrace;
    "name": "mydb_dev" // Override base name, keep host/port from base
  &rbrace;,
  "logging": &lbrace;
    "level": "debug" // Override base level, keep format from base
  &rbrace;,
  "featureFlags": &lbrace;
    "newDashboard": true // Override base
  &rbrace;
&rbrace;`}
          </code>
        </pre>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-json">
            {`// config.production.json
&lbrace;
  "apiUrl": "https://api.example.com", // Override base
  "database": &lbrace;
    "host": "prod-db.example.com", // Override base host
    "name": "mydb_prod" // Override base name
    // port is inherited from base
  &rbrace;,
  "logging": &lbrace;
    "level": "info" // Override base level
    // format is inherited from base
  &rbrace;,
  "performance": &lbrace; // New section, added to the merged config
    "cacheEnabled": true
  &rbrace;
  // featureFlags are inherited from base
&rbrace;`}
          </code>
        </pre>
        <p>
          With this structure, you load the base configuration first, and then <strong>merge</strong> the
          environment-specific configuration on top of it. The values from the environment file override the values in
          the base file where they exist, and new sections/keys in the environment file are added to the final
          configuration.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> How Merging Works: Shallow vs. Deep
        </h2>
        <p>There are two main strategies for merging JSON objects:</p>

        <h3 className="text-xl font-semibold mt-6">Shallow Merge</h3>
        <p>
          A shallow merge only copies top-level properties from the source object to the target object. If a property's
          value is an object, the object itself is copied by reference or replaced entirely; its nested properties are
          not merged recursively.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-javascript">
            {`// Example of shallow merge (using Object.assign or spread syntax)
const baseConfig = &lbrace;
  "a": 1,
  "b": &lbrace; "c": 2, "d": 3 &rbrace;,
  "e": [1, 2]
&rbrace;;

const devConfig = &lbrace;
  "a": 10, // Overrides 'a'
  "b": &lbrace; "c": 20 &rbrace;, // Replaces 'b' object entirely
  "f": "new" // Adds 'f'
&rbrace;;

// Shallow merge: devConfig onto baseConfig
const mergedConfigShallow = &lbrace; ...baseConfig, ...devConfig &rbrace;;

console.log(mergedConfigShallow);
// Output:
// &lbrace;
//   "a": 10,
//   "b": &lbrace; "c": 20 &rbrace;, // Notice 'd' is gone
//   "e": [1, 2],
//   "f": "new"
// &rbrace;
`}
          </code>
        </pre>
        <p>
          As you can see, the nested &#x60;database&#x60; or &#x60;logging&#x60; objects from the base config would be
          entirely replaced by the objects in the environment config, losing any properties not explicitly listed in the
          environment config. This is often not the desired behavior for configurations.
        </p>

        <h3 className="text-xl font-semibold mt-6">Deep Merge</h3>
        <p>
          A deep merge recursively merges nested objects. If both the source and target have a property that is an
          object, the merge function calls itself on those nested objects. If a property's value is primitive (string,
          number, boolean, null) or an array, it's typically overwritten by the source value.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-javascript">
            {`// Conceptual Deep Merge Example
const baseConfig = &lbrace;
  "a": 1,
  "b": &lbrace; "c": 2, "d": 3 &rbrace;,
  "e": [1, 2]
&rbrace;;

const devConfig = &lbrace;
  "a": 10, // Overrides 'a'
  "b": &lbrace; "c": 20 &rbrace;, // Merges into 'b' object
  "f": "new" // Adds 'f'
&rbrace;;

// Deep merge: devConfig onto baseConfig
// (Implementation shown below)
const mergedConfigDeep = deepMerge(baseConfig, devConfig);

console.log(mergedConfigDeep);
// Output:
// &lbrace;
//   "a": 10,
//   "b": &lbrace; "c": 20, "d": 3 &rbrace;, // Notice 'd' is preserved
//   "e": [1, 2], // Array is overwritten/kept as is (typical)
//   "f": "new"
// &rbrace;
`}
          </code>
        </pre>
        <p>
          Deep merging is usually what you want for JSON configurations, as it allows you to override specific nested
          settings without having to repeat the entire nested structure in your environment files.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FlaskConical size={24} /> Implementing a Deep Merge Function
        </h2>
        <p>
          Here's a basic TypeScript implementation of a deep merge function that handles objects and overwrites
          primitives and arrays.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-typescript">
            {`type JsonValue =
  | string
  | number
  | boolean
  | null
  | &lbrace; [key: string]: JsonValue &rbrace;
  | JsonValue[];

function isObject(item: any): item is &lbrace; [key: string]: JsonValue &rbrace; & null {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deeply merges two JSON-like objects.
 * Properties in source will override properties in target.
 * Nested objects are merged recursively.
 * Arrays are overwritten (not merged element by element).
 *
 * @param target The object to merge properties into.
 * @param source The object to merge properties from.
 * @returns A new object representing the merged configuration.
 */
function deepMerge&lt;T extends JsonValue, S extends JsonValue&gt;(
  target: T,
  source: S
): T & S { // Return type is simplified, assumes source overrides target
  // Create a deep copy of the target to avoid modifying the original
  const output = JSON.parse(JSON.stringify(target)); // Simple deep clone

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in output)) {
          // If the key doesn't exist in target, just assign the source object
          Object.assign(output, &lbrace; [key]: source[key] &rbrace;);
        } else {
          // If the key exists and both are objects, recurse
          output[key] = deepMerge(output[key] as &lbrace;[k: string]: JsonValue&rbrace;, source[key] as &lbrace;[k: string]: JsonValue&rbrace;);
        }
      } else {
        // Otherwise, overwrite the value in the target
        Object.assign(output, &lbrace; [key]: source[key] &rbrace;);
      }
    });
  } else if (Array.isArray(target) && Array.isArray(source)) {
     // If both are arrays, source array overwrites target array
     return source as any; // Coercion needed because of simplified return type
  }
   else {
    // If target is not an object/array or source is not,
    // or if types mismatch (e.g., merging object onto string), source overwrites
     return source as any; // Coercion needed
  }


  return output;
}

// Example usage (conceptual, as this is a static page)
/*
const base = &lbrace; "a": 1, "b": &lbrace; "c": 2, "d": 3 &rbrace;, "e": [1, 2] &rbrace;;
const overrides = &lbrace; "a": 10, "b": &lbrace; "c": 20, "f": 4 &rbrace;, "e": [3, 4, 5], "g": "hello" &rbrace;;

const finalConfig = deepMerge(base, overrides);
console.log(finalConfig);
// Expected Output:
// &lbrace;
//   "a": 10,
//   "b": &lbrace; "c": 20, "d": 3, "f": 4 &rbrace;,
//   "e": [3, 4, 5],
//   "g": "hello"
// &rbrace;
*/
`}
          </code>
        </pre>
        <p>
          This function takes two objects (target and source) and recursively merges them. Keys present in the
          &#x60;source&#x60; object will override keys in the &#x60;target&#x60; object. If both keys contain objects,
          those objects are merged recursively. Primitive values and arrays from the &#x60;source&#x60; simply replace
          those in the &#x60;target&#x60;.
        </p>
        <p>
          In a real application, you would typically load &#x60;config.base.json&#x60; and then load
          &#x60;config.$&#x7b;NODE_ENV&#x7d;.json&#x60; and apply the deep merge.
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <code className="language-typescript">
            {`// Conceptual loading and merging logic
import fs from 'fs';
import path from 'path';

// Assume deepMerge function is defined as above

const env = process.env.NODE_ENV || 'development'; // Get current environment
const baseConfigPath = path.resolve('./config.base.json');
const envConfigPath = path.resolve(\`./config.\${env}.json\`);

let finalConfig: JsonValue;

try &lbrace;
  const baseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));
  finalConfig = baseConfig; // Start with base config

  if (fs.existsSync(envConfigPath)) &lbrace;
    const envConfig = JSON.parse(fs.readFileSync(envConfigPath, 'utf8'));
    finalConfig = deepMerge(baseConfig, envConfig); // Merge environment overrides
    console.log(\`Configuration loaded and merged for environment: \${env}\`);
  &rbrace; else &lbrace;
    console.warn(\`Environment config file not found: \${envConfigPath}. Using base config only.\`);
  &rbrace;

  // You can now use finalConfig throughout your application

} catch (error) &lbrace;
  console.error("Failed to load or merge configuration:", error);
  // Handle error, perhaps exit or use default settings
  // process.exit(1);
&rbrace;
`}
          </code>
        </pre>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database size={24} /> Advanced Considerations
        </h2>

        <h3 className="text-xl font-semibold mt-6">Array Merging</h3>
        <p>
          The provided &#x60;deepMerge&#x60; function overwrites arrays. For configurations, this is often acceptable
          (e.g., a list of allowed origins might be completely different per environment). However, sometimes you might
          want different array merging strategies:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Concatenation:</strong> Combine elements from both arrays.
          </li>
          <li>
            <strong>Merging Objects in Arrays:</strong> If an array contains objects with a unique identifier
            (&#x60;id&#x60;, &#x60;name&#x60;), you might want to merge objects based on this ID (e.g., list of users
            where you only update properties for a specific user by ID).
          </li>
          <li>
            <strong>Custom Logic:</strong> More complex scenarios might require custom merge rules for specific array
            properties.
          </li>
        </ul>
        <p>
          Implementing these requires a more sophisticated merge function, potentially with options passed to control
          array behavior or even a convention like &#x60;_mergeStrategy: "concat"&#x60;. Many libraries exist that offer
          configurable deep merging.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Handling Sensitive Data <Lock size={20} />
        </h3>
        <p>
          <strong>
            Never store sensitive credentials (passwords, API keys) directly in JSON configuration files, especially not
            in files that might be checked into source control.
          </strong>{" "}
          Use environment variables or a dedicated secrets management system instead. Your application code should read
          secrets from these secure sources and merge them with the non-sensitive configuration loaded from files.
        </p>

        <h3 className="text-xl font-semibold mt-6">Configuration Validation</h3>
        <p>
          After merging, it's crucial to validate the final configuration structure and types to ensure your application
          receives the expected data. Libraries like Zod, Joi, or custom validation logic can be used here.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck size={24} /> Benefits of Using Merging
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Reduced Duplication:</strong> Common settings live only in the base config.
          </li>
          <li>
            <strong>Improved Maintainability:</strong> Changes to common settings are made in one place.
            Environment-specific changes are isolated.
          </li>
          <li>
            <strong>Clear Overrides:</strong> It's explicit what settings are being overridden for each environment.
          </li>
          <li>
            <strong>Flexibility:</strong> Easily add new environments or feature flags by creating minimal override
            files.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Merging JSON configurations across environments is a powerful pattern that significantly simplifies
          application setup and maintenance. By defining a base configuration and using environment-specific overrides
          combined with a deep merge strategy, you can create a flexible, readable, and less error-prone configuration
          system. Remember to use secure practices for sensitive data and validate your final configuration to ensure
          reliability.
        </p>
      </div>
    </>
  );
}
