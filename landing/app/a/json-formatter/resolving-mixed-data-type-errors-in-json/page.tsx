import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about resolving mixed data type errors
 */
export const metadata: Metadata = {
  title: "Resolving Mixed Data Type Errors in JSON | Offline Tools",
  description:
    "Learn how to identify, troubleshoot, and fix mixed data type errors in JSON to ensure data consistency and proper validation",
};

/**
 * Article page component for JSON formatter article about resolving mixed data type errors
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Resolving Mixed Data Type Errors in JSON</h1>

      <div className="space-y-6">
        <p>
          Working with JSON data often involves dealing with mixed data types—scenarios where the same property contains
          different types of values across multiple objects or records. These inconsistencies can lead to parsing
          errors, validation failures, and unexpected behavior in applications. This article explores common mixed data
          type errors in JSON and provides practical solutions for resolving them.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Understanding Mixed Data Type Errors</h2>
        <p>
          Mixed data type errors occur when a property that should contain a consistent data type instead contains
          different types across different instances. These inconsistencies typically arise from:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Data collected from multiple sources with different standards</li>
          <li>Schema evolution without proper data migration</li>
          <li>User-generated content with insufficient validation</li>
          <li>Legacy systems with inconsistent data handling</li>
          <li>Automatic type coercion in the data pipeline</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">2. Common Mixed Data Type Scenarios</h2>
        <p>Let's explore some common scenarios where mixed data types create problems:</p>

        <h3 className="text-xl font-medium mt-6">2.1 Numbers as Strings</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Problematic JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "products": [
    {
      "id": 1001,
      "price": 19.99,
      "quantity": 5
    },
    {
      "id": "1002",
      "price": "24.99",
      "quantity": "3"
    }
  ]
}`}
          </pre>
          <p className="mt-2">
            <strong>Problem:</strong> The second product has ID, price, and quantity as strings instead of numbers,
            which can break calculations, comparisons, and sorting operations.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2.2 Inconsistent Array vs. Single Value</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Problematic JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "name": "Alice",
      "tags": ["developer", "designer"]
    },
    {
      "name": "Bob",
      "tags": "manager"
    }
  ]
}`}
          </pre>
          <p className="mt-2">
            <strong>Problem:</strong> The first user has tags as an array, but the second user has a single string. This
            inconsistency breaks code that expects to iterate over the tags array.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2.3 Missing Values Represented Differently</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Problematic JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "employees": [
    {
      "name": "Carol",
      "department": "Engineering",
      "manager": "Dave"
    },
    {
      "name": "Eve",
      "department": "Marketing",
      "manager": null
    },
    {
      "name": "Frank",
      "department": "Sales"
    }
  ]
}`}
          </pre>
          <p className="mt-2">
            <strong>Problem:</strong> Missing managers are represented inconsistently—null for Eve and completely
            omitted for Frank. This requires different handling for each case.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">2.4 Boolean Values in Different Formats</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Problematic JSON:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "settings": [
    {
      "feature": "darkMode",
      "enabled": true
    },
    {
      "feature": "notifications",
      "enabled": "yes"
    },
    {
      "feature": "analytics",
      "enabled": 1
    }
  ]
}`}
          </pre>
          <p className="mt-2">
            <strong>Problem:</strong> The boolean "enabled" property is represented as a boolean, string, and number in
            different objects, making consistent feature flag checking difficult.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Impact of Mixed Data Type Errors</h2>
        <p>These inconsistencies can have significant effects on your applications:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Runtime errors</strong> when code expects a specific type (e.g., <code>array.forEach()</code> on a
            string)
          </li>
          <li>
            <strong>Incorrect calculations</strong> (e.g., "1" + "2" = "12" instead of 3)
          </li>
          <li>
            <strong>Schema validation failures</strong> when enforcing strict typing
          </li>
          <li>
            <strong>Sorting inconsistencies</strong> when mixing strings and numbers
          </li>
          <li>
            <strong>Security vulnerabilities</strong> when type coercion is exploited
          </li>
          <li>
            <strong>Data loss</strong> during transformations that assume consistent types
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">4. Strategies for Detecting Mixed Data Types</h2>
        <p>Before fixing mixed data type issues, you need to identify them:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">4.1 Using Schema Validation</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// JSON Schema example that would catch type inconsistencies
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "price": { "type": "number" },
          "quantity": { "type": "integer" }
        },
        "required": ["id", "price", "quantity"]
      }
    }
  }
}`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">4.2 JavaScript Type Checking Functions</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Scan JSON data for mixed data types
 * @param {Object} data - The parsed JSON data to check
 * @param {string} [parentPath=''] - Used for recursion to track property path
 * @returns {Array} List of detected type inconsistencies
 */
function detectMixedTypes(data, parentPath = '') {
  const issues = [];
  const typeMap = new Map();
  
  // For arrays of objects, check each property across all objects
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    // Create a map of property name -> set of types
    data.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
        const type = Array.isArray(value) ? 'array' : typeof value;
        const path = \`\${parentPath}[\${index}].\${key}\`;
        
        if (!typeMap.has(key)) {
          typeMap.set(key, new Map([[type, path]]));
        } else {
          typeMap.get(key).set(type, path);
        }
      });
    });
    
    // Check for properties with multiple types
    typeMap.forEach((typeToPath, key) => {
      if (typeToPath.size > 1) {
        issues.push({
          property: key,
          types: Array.from(typeToPath.keys()),
          examples: Array.from(typeToPath.entries())
        });
      }
    });
    
    // Recursively check nested arrays and objects
    data.forEach((item, index) => {
      if (typeof item === 'object' && item !== null) {
        const nestedIssues = detectMixedTypes(item, \`\${parentPath}[\${index}]\`);
        issues.push(...nestedIssues);
      }
    });
  }
  
  // For objects, recursively check each property
  else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    Object.entries(data).forEach(([key, value]) => {
      const path = parentPath ? \`\${parentPath}.\${key}\` : key;
      
      if (typeof value === 'object' && value !== null) {
        const nestedIssues = detectMixedTypes(value, path);
        issues.push(...nestedIssues);
      }
    });
  }
  
  return issues;
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Solutions for Resolving Mixed Data Types</h2>
        <p>Let's explore various approaches to fix mixed data type issues:</p>

        <h3 className="text-xl font-medium mt-6">5.1 Type Normalization</h3>
        <p>Normalizing data types ensures consistency across your dataset:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400">Normalizing Numbers:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Normalize numeric values in an object or array
 * @param {Object|Array} data - The data to normalize
 * @returns {Object|Array} Normalized data with consistent numeric types
 */
function normalizeNumbers(data) {
  if (Array.isArray(data)) {
    return data.map(item => normalizeNumbers(item));
  }
  
  if (typeof data !== 'object' || data === null) {
    // Convert string numbers to actual numbers
    if (typeof data === 'string' && !isNaN(data) && data.trim() !== '') {
      // If string contains decimal point, convert to float, otherwise to integer
      return data.includes('.') ? Number(data) : Number(data);
    }
    return data;
  }
  
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    result[key] = normalizeNumbers(value);
  }
  return result;
}

// Example usage
const normalizedData = normalizeNumbers(jsonData);`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400">Normalizing Arrays:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Ensure values that should be arrays are consistently arrays
 * @param {Object} data - The data object to process 
 * @param {Array<string>} arrayFields - List of fields that should always be arrays
 * @returns {Object} Data with consistent array fields
 */
function normalizeArrayFields(data, arrayFields) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => normalizeArrayFields(item, arrayFields));
  }
  
  const result = { ...data };
  
  arrayFields.forEach(field => {
    if (field in result) {
      // If not already an array, convert to a single-item array
      if (!Array.isArray(result[field])) {
        result[field] = result[field] === null || result[field] === undefined 
          ? [] 
          : [result[field]];
      }
    }
  });
  
  // Process nested objects
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = normalizeArrayFields(value, arrayFields);
    }
  }
  
  return result;
}

// Example usage
const data = normalizeArrayFields(jsonData, ['tags', 'categories', 'permissions']);`}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400">Normalizing Boolean Values:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Convert different boolean representations to actual booleans
 * @param {Object} data - The data to normalize
 * @param {Array<string>} booleanFields - Fields that should be treated as booleans
 * @returns {Object} Data with consistent boolean values
 */
function normalizeBooleanFields(data, booleanFields) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => normalizeBooleanFields(item, booleanFields));
  }
  
  const result = { ...data };
  
  // Process specified boolean fields
  booleanFields.forEach(field => {
    if (field in result) {
      const value = result[field];
      
      // Convert various representations to boolean
      if (typeof value === 'string') {
        const lowercased = value.toLowerCase().trim();
        result[field] = ['true', 'yes', 'y', '1', 'on'].includes(lowercased);
      } else if (typeof value === 'number') {
        result[field] = value !== 0;
      }
      // Already boolean, no change needed
    }
  });
  
  // Process nested objects
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'object' && value !== null) {
      result[key] = normalizeBooleanFields(value, booleanFields);
    }
  }
  
  return result;
}

// Example usage
const data = normalizeBooleanFields(jsonData, ['enabled', 'active', 'isAdmin']);`}
          </pre>
        </div>

        <h3 className="text-xl font-medium mt-6">5.2 Handling Missing or Null Values</h3>
        <p>Consistent handling of missing values is crucial:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400">Normalizing Null and Undefined:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Ensure consistent handling of missing values
 * @param {Object} data - The data to normalize
 * @param {Object} defaultValues - Map of field names to their default values
 * @param {boolean} preferNull - If true, use null for missing values; if false, delete the property
 * @returns {Object} Data with consistent handling of missing values
 */
function normalizeMissingValues(data, defaultValues = {}, preferNull = true) {
  if (!data || typeof data !== 'object') {
    return data;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => normalizeMissingValues(item, defaultValues, preferNull));
  }
  
  const result = { ...data };
  
  // Apply default values where specified
  for (const [field, defaultValue] of Object.entries(defaultValues)) {
    if (!(field in result) || result[field] === undefined || result[field] === null) {
      result[field] = defaultValue;
    }
  }
  
  // Handle other fields based on preference
  for (const [key, value] of Object.entries(result)) {
    if (value === undefined) {
      if (preferNull) {
        result[key] = null;
      } else {
        delete result[key];
      }
    } else if (typeof value === 'object' && value !== null) {
      result[key] = normalizeMissingValues(value, defaultValues, preferNull);
    }
  }
  
  return result;
}

// Example usage
const data = normalizeMissingValues(jsonData, {
  manager: null,
  department: "Unassigned",
  salary: 0
}, true);`}
          </pre>
        </div>

        <h3 className="text-xl font-medium mt-6">5.3 Implementing Type Conversion at Boundaries</h3>
        <p>Enforcing types at application boundaries helps maintain consistency:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400">API Response Processing:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Process API response to ensure consistent types
 * @param {Object} response - The API response data
 * @returns {Object} Processed data with consistent types
 */
function processApiResponse(response) {
  // Apply multiple normalization functions
  let processed = { ...response };
  
  // Normalize numbers in specific fields
  processed = normalizeNumbers(processed);
  
  // Ensure array fields are always arrays
  processed = normalizeArrayFields(processed, ['tags', 'categories']);
  
  // Convert boolean-like values to actual booleans
  processed = normalizeBooleanFields(processed, ['active', 'verified']);
  
  // Handle missing values with defaults
  processed = normalizeMissingValues(processed, {
    createdAt: null,
    updatedAt: null,
    status: 'unknown'
  });
  
  return processed;
}

// Usage in API fetch
async function fetchData() {
  const response = await fetch('/api/data');
  const rawData = await response.json();
  return processApiResponse(rawData);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Preventing Mixed Data Types at Source</h2>
        <p>The best solution is to prevent type inconsistencies from occurring in the first place:</p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Client-Side Validation:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Validate form input types before submission</li>
              <li>Use typed form controls (number inputs for numeric data)</li>
              <li>Apply client-side schema validation</li>
              <li>Format data consistently before sending to APIs</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Server-Side Enforcement:</h3>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Implement strong type validation on API endpoints</li>
              <li>Use typed frameworks and ORM models</li>
              <li>Add database constraints for data types</li>
              <li>Apply JSON Schema validation on incoming data</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Example: Complete Type Consistency System</h2>
        <p>Here's a comprehensive approach to managing data types in a JSON-based system:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Type Definition and Enforcement:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// 1. Define your data model with explicit types
const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 0 },
    isActive: { type: 'boolean' },
    roles: { 
      type: 'array',
      items: { type: 'string' }
    },
    metadata: { 
      type: 'object',
      additionalProperties: true
    }
  },
  required: ['id', 'name', 'email']
};

// 2. Create a validation function using a JSON Schema validator
import Ajv from 'ajv';
const ajv = new Ajv({ coerceTypes: true });
const validateUser = ajv.compile(UserSchema);

// 3. Apply the validator to incoming data
function processUserData(userData) {
  // Try to coerce types and validate
  const valid = validateUser(userData);
  
  if (!valid) {
    throw new Error(\`Invalid user data: \${ajv.errorsText(validateUser.errors)}\`);
  }
  
  // If coercion worked, the data now has consistent types
  return userData;
}

// 4. Use error boundaries for graceful failure
try {
  const user = processUserData(incomingData);
  saveUser(user);
} catch (error) {
  logValidationError(error);
  showUserFriendlyError('The user data contains invalid values. Please check the form.');
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">8. Best Practices for Data Type Management</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Document expected types:</strong> Clearly specify the expected type for each field in your API
            documentation.
          </li>
          <li>
            <strong>Use schema validation:</strong> Implement JSON Schema or equivalent validation at every data entry
            point.
          </li>
          <li>
            <strong>Create type boundary layers:</strong> Normalize data types at application boundaries (API clients,
            data access layers).
          </li>
          <li>
            <strong>Be consistent with missing values:</strong> Decide whether to use null values or omit properties,
            and stick to it.
          </li>
          <li>
            <strong>Write defensive code:</strong> Always check types before performing type-specific operations.
          </li>
          <li>
            <strong>Use typed languages or TypeScript:</strong> Leverage compile-time type checking where possible.
          </li>
          <li>
            <strong>Implement automated tests:</strong> Create tests specifically for checking data type consistency.
          </li>
          <li>
            <strong>Consider data migrations:</strong> When schema changes occur, migrate existing data to maintain
            consistency.
          </li>
        </ol>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Pro Tip</h3>
          <p>
            When working with third-party APIs or legacy systems that might send inconsistent data types, implement an
            "adapter layer" that normalizes incoming data before it reaches your core application logic. This creates a
            clean boundary that shields your application from external inconsistencies.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">9. Conclusion</h2>
        <p>
          Mixed data type errors in JSON can cause subtle bugs that are difficult to track down. By implementing
          consistent type detection, normalization, and validation strategies, you can ensure your application handles
          JSON data reliably regardless of its source. Remember that prevention is always better than cure—enforce
          strict typing at all data entry points to minimize the need for type fixing later.
        </p>
      </div>
    </>
  );
}
