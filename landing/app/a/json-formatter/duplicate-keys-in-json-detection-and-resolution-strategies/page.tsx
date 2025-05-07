import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Duplicate Keys in JSON: Detection and Resolution Strategies | Offline Tools",
  description: "Learn how to identify duplicate keys in JSON documents and implement effective strategies to resolve these issues for valid JSON data.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Duplicate Keys in JSON: Detection and Resolution Strategies</h1>

      <div className="space-y-6">
        <p>
          One of the more subtle issues that can arise in JSON documents is the presence of duplicate keys
          within the same object. While many JSON formatters will parse such documents without error, 
          duplicate keys can lead to unpredictable results and data loss. This article explores 
          how duplicate keys are handled in different environments, how to detect them, and strategies 
          for resolving these issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Problem with Duplicate Keys</h2>
        <p>
          According to the JSON specification (ECMA-404 and RFC 8259), names within a JSON object 
          SHOULD be unique, but the standard does not explicitly forbid duplicate keys. This has led to 
          inconsistent handling across different parsers and environments.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Simple Example of Duplicate Keys:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "user": "alice",
  "score": 42,
  "user": "bob"    // Duplicate key: "user"
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            In this example, the key &quot;user&quot; appears twice. While syntactically valid, this creates ambiguity about which value should be used.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How Different Environments Handle Duplicates</h2>
        
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Behavior Across Environments:</h3>
          <table className="min-w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Environment</th>
                <th className="px-4 py-2 text-left">Behavior with Duplicate Keys</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">JavaScript</td>
                <td className="px-4 py-2">Uses the last occurrence of the key (later values overwrite earlier ones)</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Python</td>
                <td className="px-4 py-2">Depends on the version and library; typically uses the last value</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Java (Jackson)</td>
                <td className="px-4 py-2">By default uses the last value, but can be configured to throw an error</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Ruby</td>
                <td className="px-4 py-2">Uses the last occurrence</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">PHP</td>
                <td className="px-4 py-2">Last value wins</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">JSON Schema Validators</td>
                <td className="px-4 py-2">Many validate against duplicates and report them as errors</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Warning:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Even though many environments &quot;accept&quot; duplicate keys, relying on this behavior is dangerous.
            The same JSON may be interpreted differently across systems, leading to subtle bugs and security vulnerabilities.
            Always ensure your JSON has unique keys.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Real-World Issues Caused by Duplicate Keys</h2>

        <h3 className="text-xl font-medium mt-6">1. Data Loss</h3>
        <p>
          When a parser encounters duplicate keys, one value inevitably overrides the other, causing data loss.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Data Loss Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Original JSON with duplicate keys
{
  "settings": {
    "notifications": true,
    "theme": "dark",
    "notifications": false
  }
}

// After parsing in JavaScript
{
  "settings": {
    "notifications": false,  // The first value (true) was lost
    "theme": "dark"
  }
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Security Vulnerabilities</h3>
        <p>
          Duplicate keys can be exploited to create security vulnerabilities, especially in systems that use JSON for configuration.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Security Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`// Configuration JSON
{
  "user": {
    "role": "user",
    "permissions": ["read"],
    "role": "admin"  // Malicious duplicate could escalate privileges
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            If the system parses this JSON and uses the last value for &quot;role&quot;, it could result in unauthorized privilege escalation.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Inconsistent Cross-Platform Behavior</h3>
        <p>
          When the same JSON is processed by different systems, duplicate keys can lead to inconsistent application behavior.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Detecting Duplicate Keys</h2>

        <h3 className="text-xl font-medium mt-6">1. Using Linters and Validators</h3>
        <p>
          Many JSON linters and validators can detect duplicate keys during the validation process.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">JSON Lint Example Output:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-red-600 dark:text-red-400">
{`Error: Duplicate key 'user' on line 5
Parse error on line 5:
...  "role": "user",  "permissions":
----------------------^
Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '['`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Programmatic Detection</h3>
        <p>
          You can write custom code to detect duplicate keys during parsing or validation.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">JavaScript Detection Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`function detectDuplicateKeys(jsonString) {
  const duplicates = [];
  
  // Use a reviver function with JSON.parse
  JSON.parse(jsonString, (key, value, path = '') => {
    if (key === '') return value; // Root object
    
    // For objects, check for duplicate keys
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const keys = {};
      const originalJson = jsonString.substring(
        jsonString.indexOf('{', jsonString.indexOf(key)) + 1,
        jsonString.indexOf('}', jsonString.indexOf(key))
      );
      
      // Use regex to find all keys in the original JSON string
      const keyPattern = /"([^"]+)"\s*:/g;
      let match;
      while ((match = keyPattern.exec(originalJson)) !== null) {
        const foundKey = match[1];
        if (keys[foundKey]) {
          duplicates.push({
            key: foundKey,
            path: path + '.' + key
          });
        } else {
          keys[foundKey] = true;
        }
      }
    }
    
    return value;
  });
  
  return duplicates;
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Custom JSON Parsers</h3>
        <p>
          For more complex scenarios, you may need to implement or configure a custom JSON parser that explicitly checks for duplicates.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Jackson Configuration (Java):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`ObjectMapper mapper = new ObjectMapper();
mapper.enable(JsonParser.Feature.STRICT_DUPLICATE_DETECTION);

try {
    MyObject obj = mapper.readValue(jsonString, MyObject.class);
    // Processing successful
} catch (JsonParseException e) {
    // Will catch duplicate key errors
    System.err.println("Duplicate key found: " + e.getMessage());
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Strategies for Resolving Duplicate Keys</h2>

        <h3 className="text-xl font-medium mt-6">1. Manual Deduplication</h3>
        <p>
          For smaller JSON documents, manually identifying and removing duplicate keys is a straightforward approach.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Deduplication:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "product": "Laptop",
  "price": 999.99,
  "inStock": true,
  "price": 899.99
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Deduplication:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "product": "Laptop",
  "price": 899.99,  // Kept the last/newer price
  "inStock": true
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            In this example, we manually resolved the duplicate &quot;price&quot; key by keeping only the last occurrence.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Automated Merging</h3>
        <p>
          For more complex cases, you might want to merge the values of duplicate keys according to specific rules.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">JavaScript Merging Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`function mergeJsonWithDuplicateKeys(jsonString) {
  const result = {};
  const tempObj = {};
  
  // First, construct an object that preserves all values
  JSON.parse(jsonString, (key, value) => {
    if (key === '') return value;
    
    if (!tempObj[key]) {
      tempObj[key] = [value];
    } else {
      tempObj[key].push(value);
    }
    
    return value;
  });
  
  // Then apply merging strategies based on key names or value types
  for (const key in tempObj) {
    const values = tempObj[key];
    
    if (values.length === 1) {
      // No duplicates, just use the value
      result[key] = values[0];
    } else {
      // Custom merging strategies based on the key name or value type
      if (Array.isArray(values[0])) {
        // Merge arrays
        result[key] = [].concat(...values);
      } else if (typeof values[0] === 'object' && values[0] !== null) {
        // Recursively merge objects
        result[key] = values.reduce((merged, obj) => ({...merged, ...obj}), {});
      } else if (key === 'permissions' || key.includes('list')) {
        // For specific keys that should be combined (like permission lists)
        result[key] = Array.from(new Set([].concat(...values.map(v => 
          Array.isArray(v) ? v : [v]
        ))));
      } else {
        // Default: use the last value
        result[key] = values[values.length - 1];
      }
    }
  }
  
  return result;
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Key Renaming</h3>
        <p>
          Sometimes the best strategy is to rename duplicate keys to make them unique while preserving all values.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Renaming:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "address": "123 Main St",
  "address": "Apt 4B"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Renaming:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Array Transformation</h3>
        <p>
          For cases where all values should be retained, convert duplicate keys into an array.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Before Transformation:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "tag": "important",
  "tag": "urgent",
  "tag": "review"
}`}
            </pre>
          </div>
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">After Transformation:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "tags": ["important", "urgent", "review"]
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Here, we&apos;ve renamed the key to a plural form and converted the multiple values into an array.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Prevention: Best Practices</h2>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Validate JSON</strong> before processing or storing it, using tools that detect duplicate keys
          </li>
          <li>
            <strong>Generate JSON programmatically</strong> rather than manually to reduce the risk of duplicates
          </li>
          <li>
            <strong>Use JSON Schema</strong> to define and enforce your data structure
          </li>
          <li>
            <strong>Implement duplicate key detection</strong> in your application&apos;s data validation pipeline
          </li>
          <li>
            <strong>Configure parsers to be strict</strong> about duplicate keys where possible
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">JSON Schema Example for Validation:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["product", "price"],
  "additionalProperties": false,
  "properties": {
    "product": {
      "type": "string"
    },
    "price": {
      "type": "number"
    },
    "inStock": {
      "type": "boolean"
    }
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Using a JSON Schema with <code>additionalProperties: false</code> helps ensure only defined properties are allowed,
            effectively preventing duplicate keys with different names.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Duplicate keys in JSON documents are a subtle but significant issue that can lead to data integrity 
          problems, security vulnerabilities, and inconsistent application behavior. While JSON parsers may 
          handle duplicates differently, best practice is to ensure keys are unique within each object.
        </p>
        <p className="mt-4">
          By implementing proper detection mechanisms and following the resolution strategies outlined in this 
          article, you can maintain the integrity of your JSON data across different systems and avoid the 
          pitfalls associated with duplicate keys. As with many aspects of software development, prevention 
          through validation and good tooling is ultimately more efficient than fixing problems after they occur.
        </p>
      </div>
    </>
  );
}
