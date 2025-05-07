import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about versioning problems in JSON schema validation
 */
export const metadata: Metadata = {
  title: "Versioning Problems in JSON Schema Validation | Offline Tools",
  description: "Learn how to identify and resolve versioning problems in JSON Schema validation and maintain backward compatibility in evolving APIs",
};

/**
 * Article page component for JSON formatter article about versioning problems in JSON schema validation
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Versioning Problems in JSON Schema Validation</h1>

      <div className="space-y-6">
        <p>
          JSON Schema has become the standard for validating JSON documents, ensuring that data structures conform to 
          expected formats. However, as applications evolve, schemas must evolve with them—leading to versioning challenges. 
          This article explores common versioning problems in JSON Schema validation and provides strategies for maintaining 
          compatibility across schema versions.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Understanding JSON Schema Versioning</h2>
        <p>
          JSON Schema itself has multiple specification versions (Draft 4, 6, 7, 2019-09, 2020-12), 
          but equally important is how you version your own schemas as your data models evolve. 
          Let's explore both dimensions of this versioning challenge.
        </p>

        <h3 className="text-xl font-medium mt-6">1.1 JSON Schema Specification Versions</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Evolution of JSON Schema:</h4>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Draft 3</strong> (2010) - Early version, now obsolete</li>
            <li><strong>Draft 4</strong> (2013) - Widely implemented and still commonly used</li>
            <li><strong>Draft 6</strong> (2016) - Added features like <code>const</code> and <code>contains</code></li>
            <li><strong>Draft 7</strong> (2017) - Added <code>if/then/else</code> and more string formats</li>
            <li><strong>Draft 2019-09</strong> - Introduced <code>unevaluatedProperties</code> and <code>unevaluatedItems</code></li>
            <li><strong>Draft 2020-12</strong> - Latest version with improved dynamic references and schema evaluation</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6">1.2 Your Schema's Versioning</h3>
        <p>
          Independent of the JSON Schema specification version, your own schemas need versioning as your data models evolve:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Common Versioning Approaches:</h4>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>URL-based versioning</strong> - Incorporating version in the schema's <code>$id</code></li>
            <li><strong>Version property</strong> - Adding explicit version properties to the schema</li>
            <li><strong>Directory structure</strong> - Organizing schemas by version in your repository</li>
            <li><strong>Semantic versioning</strong> - Following semver principles for breaking vs. non-breaking changes</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Common Versioning Problems</h2>
        <p>
          Let's examine the most frequent versioning challenges encountered when working with JSON Schema validation:
        </p>

        <h3 className="text-xl font-medium mt-6">2.1 Breaking Changes vs. Non-Breaking Changes</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Breaking Changes:</h4>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Adding <code>required</code> properties</li>
            <li>Removing properties from <code>properties</code></li>
            <li>Making validation rules more restrictive (e.g., tighter <code>minLength</code>)</li>
            <li>Changing property types</li>
            <li>Removing items from <code>enum</code></li>
          </ul>
          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Non-Breaking Changes:</h4>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Adding optional properties</li>
            <li>Removing properties from <code>required</code></li>
            <li>Making validation rules less restrictive</li>
            <li>Adding items to <code>enum</code></li>
            <li>Adding new formats</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mt-6">2.2 Schema Dependencies and References</h3>
        <p>
          One of the most challenging versioning issues occurs with schema references and dependencies:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Problematic Reference Example:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// UserSchema.json (v1)
{
  "$id": "https://example.com/schemas/user",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "preferences": { "$ref": "https://example.com/schemas/preferences" }
  },
  "required": ["id", "name"]
}

// PreferencesSchema.json (original)
{
  "$id": "https://example.com/schemas/preferences",
  "type": "object",
  "properties": {
    "theme": { "type": "string", "enum": ["light", "dark"] },
    "notifications": { "type": "boolean" }
  }
}

// When PreferencesSchema changes...
{
  "$id": "https://example.com/schemas/preferences",
  "type": "object",
  "properties": {
    "theme": { "type": "string", "enum": ["light", "dark", "system"] },
    "notifications": { "type": "boolean" },
    "language": { "type": "string", "required": true }  // Breaking change!
  }
}

// Now UserSchema validation will fail because of the required language field`}
          </pre>
        </div>

        <h3 className="text-xl font-medium mt-6">2.3 Incompatibilities Between Schema Versions</h3>
        <p>
          Different JSON Schema draft versions have different features and behaviors:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Version-Specific Features:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Works in Draft 7, 2019-09, 2020-12 but not in Draft 4
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "status": { "const": "active" }  // 'const' keyword not in Draft 4
  }
}

// Works in 2019-09, 2020-12 but not in Draft 7 or earlier
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "type": "object",
  "properties": {
    "tags": { "type": "array" }
  },
  "unevaluatedProperties": false  // New in 2019-09
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Real-World Example: API Evolution</h2>
        <p>
          Let's examine a real-world scenario of schema versioning in an evolving API:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Customer API Evolution:</h3>
          <h4 className="text-md font-medium mt-3">Version 1: Initial Schema</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/schemas/customer/v1",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "phone": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zipCode": { "type": "string" }
      },
      "required": ["street", "city", "zipCode"]
    }
  },
  "required": ["id", "name", "email"]
}`}
          </pre>

          <h4 className="text-md font-medium mt-4">Version 2: Breaking Changes</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://api.example.com/schemas/customer/v2",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "phone": { "type": "string" },
    "addresses": {  // Changed from singular "address" to plural "addresses" array
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string", "enum": ["home", "work", "other"] },
          "street": { "type": "string" },
          "city": { "type": "string" },
          "zipCode": { "type": "string" },
          "country": { "type": "string" }  // New required field
        },
        "required": ["type", "street", "city", "zipCode", "country"]
      },
      "minItems": 1
    },
    "metadata": {  // New optional field
      "type": "object",
      "additionalProperties": true
    }
  },
  "required": ["id", "name", "email", "addresses"]  // "addresses" now required
}`}
          </pre>
        </div>

        <h3 className="text-xl font-medium mt-6">3.1 Versioning Strategies for the Example</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium text-green-600 dark:text-green-400">URL-Based Versioning:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// API endpoints
GET /api/v1/customers
GET /api/v2/customers

// Schema references
{
  "$ref": "https://api.example.com/schemas/customer/v1"
}
{
  "$ref": "https://api.example.com/schemas/customer/v2"
}`}
          </pre>

          <h4 className="text-md font-medium text-green-600 dark:text-green-400 mt-4">Content Negotiation:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// HTTP headers for versioning
Accept: application/vnd.example.v1+json
Accept: application/vnd.example.v2+json`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Strategies for Schema Versioning</h2>
        <p>
          Let's explore effective approaches to handle schema versioning:
        </p>

        <h3 className="text-xl font-medium mt-6">4.1 Explicit Schema Identifiers</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Using $id with Versioning:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://example.com/schemas/user/v1.2.3",
  "title": "User Schema v1.2.3",
  // Schema definition...
}`}
          </pre>
          <p className="mt-2">
            <strong>Benefits:</strong> Clear versioning, explicit schema identification, supports centralized schema repositories
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4.2 Schema Registries and Evolution</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Schema Registry Approach:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Register new schema version
POST /schema-registry/subjects/customer-schema/versions
{
  "schema": "{ \"$schema\": \"http://json-schema.org/draft-07/schema#\", ... }"
}

// Retrieve specific version
GET /schema-registry/subjects/customer-schema/versions/2

// Check compatibility before registering
POST /schema-registry/compatibility/subjects/customer-schema/versions/latest
{
  "schema": "{ \"$schema\": \"http://json-schema.org/draft-07/schema#\", ... }"
}`}
          </pre>
          <p className="mt-2">
            <strong>Benefits:</strong> Centralized management, compatibility checking, version history
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4.3 Schema Composition Patterns</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Extending Base Schemas:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Base schema (v1)
{
  "$id": "https://example.com/schemas/user/v1/base",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" }
  },
  "required": ["id", "name"]
}

// Extended schema (v2)
{
  "$id": "https://example.com/schemas/user/v2/extended",
  "allOf": [
    { "$ref": "https://example.com/schemas/user/v1/base" },
    {
      "type": "object",
      "properties": {
        "email": { "type": "string", "format": "email" },
        "role": { "type": "string", "enum": ["user", "admin"] }
      },
      "required": ["email"]
    }
  ]
}`}
          </pre>
          <p className="mt-2">
            <strong>Benefits:</strong> Reuse of base schemas, explicit extensions, clearer version relationships
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">4.4 Backward Compatibility Tooling</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Compatibility Checker (JavaScript):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Check if a new schema version is backward compatible with the previous version
 * @param {Object} oldSchema - The previous schema version
 * @param {Object} newSchema - The new schema version
 * @returns {Object} Compatibility result with details
 */
function checkBackwardCompatibility(oldSchema, newSchema) {
  const issues = [];
  
  // Check for new required properties
  const oldRequired = oldSchema.required || [];
  const newRequired = newSchema.required || [];
  
  const newRequiredProps = newRequired.filter(prop => !oldRequired.includes(prop));
  if (newRequiredProps.length > 0) {
    issues.push({
      type: 'breaking',
      description: \`New required properties: \${newRequiredProps.join(', ')}\`
    });
  }
  
  // Check for removed properties
  const oldProps = Object.keys(oldSchema.properties || {});
  const newProps = Object.keys(newSchema.properties || {});
  
  const removedProps = oldProps.filter(prop => !newProps.includes(prop));
  if (removedProps.length > 0) {
    issues.push({
      type: 'breaking',
      description: \`Removed properties: \${removedProps.join(', ')}\`
    });
  }
  
  // Check for property type changes
  for (const prop of newProps) {
    if (oldSchema.properties?.[prop] && newSchema.properties?.[prop]) {
      const oldType = oldSchema.properties[prop].type;
      const newType = newSchema.properties[prop].type;
      
      if (oldType !== newType) {
        issues.push({
          type: 'breaking',
          description: \`Property "\${prop}" type changed from \${oldType} to \${newType}\`
        });
      }
    }
  }
  
  // Check for enum restrictions
  for (const prop of newProps) {
    if (oldSchema.properties?.[prop]?.enum && newSchema.properties?.[prop]?.enum) {
      const oldEnum = oldSchema.properties[prop].enum;
      const newEnum = newSchema.properties[prop].enum;
      
      const removedValues = oldEnum.filter(val => !newEnum.includes(val));
      if (removedValues.length > 0) {
        issues.push({
          type: 'breaking',
          description: \`Removed enum values for "\${prop}": \${removedValues.join(', ')}\`
        });
      }
    }
  }
  
  return {
    compatible: issues.length === 0,
    issues: issues
  };
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Handling Multiple Versions Simultaneously</h2>
        <p>
          In real-world scenarios, you'll often need to support multiple schema versions simultaneously:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Multi-Version Support Strategies:</h3>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-medium">1. API Gateway Pattern</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                {`// API Gateway translates between versions
Client (v1) → API Gateway → Service (v2)
               ↳ Transformation Logic`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">2. Content Negotiation</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                {`// Client specifies version in request
GET /api/customers
Accept: application/vnd.example.v1+json`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">3. Versioned Endpoints</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                {`// Different endpoints for each version
GET /api/v1/customers  (v1 schema)
GET /api/v2/customers  (v2 schema)`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium">4. Envelope Pattern</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                {`// Response includes version information
{
  "version": "2.0",
  "data": {
    // Schema v2 data...
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">5.1 Schema Transformation Service</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-md font-medium">Transformation Layer Implementation:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Transform data between schema versions
 * @param {Object} data - The data to transform
 * @param {string} fromVersion - Source schema version
 * @param {string} toVersion - Target schema version
 * @returns {Object} Transformed data
 */
function transformBetweenVersions(data, fromVersion, toVersion) {
  // Handle specific version transformations
  if (fromVersion === '1.0' && toVersion === '2.0') {
    return transformV1ToV2(data);
  } else if (fromVersion === '2.0' && toVersion === '1.0') {
    return transformV2ToV1(data);
  }
  // Handle other version combinations...
  
  throw new Error(\`Unsupported version transformation: \${fromVersion} -> \${toVersion}\`);
}

/**
 * Transform customer data from v1 to v2 format
 */
function transformV1ToV2(customer) {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    // Transform single address to addresses array
    addresses: customer.address ? [
      {
        type: "home", // Default type
        street: customer.address.street,
        city: customer.address.city,
        zipCode: customer.address.zipCode,
        country: "Unknown" // Required in v2 but not in v1
      }
    ] : [],
    metadata: {} // New in v2
  };
}

/**
 * Transform customer data from v2 to v1 format
 */
function transformV2ToV1(customer) {
  // Take the first address (might lose data if multiple addresses)
  const primaryAddress = customer.addresses && customer.addresses.length > 0
    ? customer.addresses[0]
    : null;
    
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    // Transform first address to single address
    address: primaryAddress ? {
      street: primaryAddress.street,
      city: primaryAddress.city,
      zipCode: primaryAddress.zipCode
      // Note: country is dropped as it doesn't exist in v1
    } : null
    // Note: metadata is dropped as it doesn't exist in v1
  };
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Schema Deprecation and Sunset Policies</h2>
        <p>
          Effectively managing the end-of-life for schema versions is as important as introducing new ones:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Schema Lifecycle Management:</h3>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li><strong>Deprecation notice</strong> - Inform clients that a schema version will be sunset</li>
            <li><strong>Grace period</strong> - Provide sufficient time for migration (e.g., 6-12 months)</li>
            <li><strong>Documentation</strong> - Clearly document migration paths and deadlines</li>
            <li><strong>Migration tooling</strong> - Provide tools for transforming between versions</li>
            <li><strong>Monitoring</strong> - Track usage of deprecated versions to inform decisions</li>
          </ol>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Deprecation Header Example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`HTTP/1.1 200 OK
Content-Type: application/json
Deprecation: true
Sunset: Sat, 31 Dec 2023 23:59:59 GMT
Link: <https://api.example.com/schemas/customer/v2>; rel="successor-version"

{
  // Response data using v1 schema
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Best Practices for JSON Schema Versioning</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Design for evolution</strong> - Anticipate future changes when designing schemas
          </li>
          <li>
            <strong>Prefer additive changes</strong> - Add optional fields rather than requiring new ones
          </li>
          <li>
            <strong>Use explicit versioning</strong> - Include version information in schema identifiers
          </li>
          <li>
            <strong>Schema registry</strong> - Maintain a central registry for schema versions
          </li>
          <li>
            <strong>Compatibility testing</strong> - Automate checks for backward compatibility
          </li>
          <li>
            <strong>Document migration paths</strong> - Provide clear guidance for moving between versions
          </li>
          <li>
            <strong>Transformation utilities</strong> - Build tools to convert data between schema versions
          </li>
          <li>
            <strong>Sunset policies</strong> - Define clear timelines for deprecating old versions
          </li>
        </ol>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Pro Tip</h3>
          <p>
            Consider adopting a "tolerant reader" pattern in your applications, where your code is more permissive 
            in what it accepts than what it produces. This approach makes your applications more resilient to 
            schema changes and reduces the friction of version transitions.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">8. Tools for Schema Version Management</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Schema Registries:</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Confluent Schema Registry</strong> - Primarily for Avro, but supports JSON Schema</li>
              <li><strong>Apicurio Registry</strong> - Open-source schema registry with JSON Schema support</li>
              <li><strong>AWS Glue Schema Registry</strong> - For AWS environments</li>
              <li><strong>Azure Schema Registry</strong> - Schema registry for Azure Event Hubs</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Compatibility Tools:</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>json-schema-diff-validator</strong> - Compare schemas for compatibility</li>
              <li><strong>jsonschemadiff</strong> - Visual diff tool for JSON Schemas</li>
              <li><strong>openapi-diff</strong> - For OpenAPI schemas (which use JSON Schema)</li>
              <li><strong>SchemaStore</strong> - Collection of common JSON schemas</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">9. Conclusion</h2>
        <p>
          JSON Schema versioning is a crucial aspect of API and data model evolution. By implementing a thoughtful 
          versioning strategy, you can safely evolve your schemas while maintaining compatibility for existing clients.
          Remember that schema versioning isn't just a technical concern—it's a usability and developer experience issue 
          that impacts how effectively consumers can use your APIs and services.
        </p>

        <p className="mt-3">
          The key takeaway is to plan for change from the beginning. Design your schemas, APIs, and applications with 
          the expectation that schemas will evolve, and implement practices that make these transitions as seamless as possible.
        </p>
      </div>
    </>
  );
} 