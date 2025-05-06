import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

export const metadata: Metadata = {
  title: "Best Practices for Validating JSON Before Formatting | Offline Tools",
  description: "Learn how to implement robust JSON validation techniques before formatting to catch errors early and ensure data integrity.",
};

export default function BestPracticesForValidatingJsonArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">Best Practices for Validating JSON Before Formatting</h1>
        
        <div className="space-y-6">
          <p>
            Validating JSON before formatting is a critical step that helps catch errors early, prevents 
            downstream issues, and ensures data integrity. While formatting makes JSON more readable, 
            validation confirms that your JSON is structurally sound and adheres to expected schemas. 
            This article explores best practices for implementing robust JSON validation as part of your 
            data processing workflow.
          </p>

          <h2 className="text-2xl font-semibold mt-8">Why Validate Before Formatting?</h2>
          <p>
            While many JSON formatters include basic validation, deliberately separating validation from 
            formatting offers several key advantages:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Error isolation</strong> - Distinguishes between syntax errors and formatting preferences</li>
            <li><strong>Deeper validation</strong> - Enables schema validation beyond basic syntax checking</li>
            <li><strong>Controlled error handling</strong> - Provides more precise feedback and recovery options</li>
            <li><strong>Performance optimization</strong> - Prevents wasting resources formatting invalid data</li>
          </ul>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Pro Tip:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Think of validation and formatting as distinct responsibilities in a pipeline: validation confirms 
              your JSON is correct, while formatting makes it human-readable. This separation of concerns leads 
              to clearer code and more reliable systems.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Levels of JSON Validation</h2>
          
          <p>
            Effective JSON validation occurs at multiple levels, with each providing different types of guarantees:
          </p>
          
          <h3 className="text-xl font-medium mt-6">1. Syntax Validation</h3>
          <p>
            The most basic level ensures the JSON follows proper JSON syntax rules:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Properly formed objects and arrays</li>
            <li>Correct use of quotes, commas, and colons</li>
            <li>Properly escaped special characters</li>
            <li>Valid data types (strings, numbers, objects, arrays, booleans, null)</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Syntax Validation Example (JavaScript):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function validateJsonSyntax(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    return { 
      valid: false,
      error: error.message,
      // Extract position information if available
      position: error.message.match(/position (\\d+)/) 
               ? Number(error.message.match(/position (\\d+)/)[1]) 
               : null
    };
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Schema Validation</h3>
          <p>
            Beyond syntax, schema validation ensures the JSON adheres to an expected structure and data types:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Required properties are present</li>
            <li>Property values have the correct data types</li>
            <li>Values fall within expected ranges or patterns</li>
            <li>Arrays contain valid elements</li>
            <li>Nested structures follow expected patterns</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Schema Validation Example (JavaScript with Ajv):</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Using Ajv, a popular JSON schema validator
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number", minimum: 0 },
    email: { type: "string", format: "email" },
    tags: { 
      type: "array", 
      items: { type: "string" }
    }
  },
  required: ["name", "email"],
  additionalProperties: false
};

function validateJsonSchema(jsonString, schema) {
  try {
    const data = JSON.parse(jsonString);
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    if (valid) {
      return { valid: true };
    } else {
      return {
        valid: false,
        errors: validate.errors
      };
    }
  } catch (error) {
    return {
      valid: false,
      syntaxError: error.message
    };
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Semantic Validation</h3>
          <p>
            The deepest level of validation examines relationships, business rules, and domain-specific requirements:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cross-field validations (e.g., end date after start date)</li>
            <li>Business logic rules (e.g., discount cannot exceed price)</li>
            <li>Referential integrity (e.g., referenced IDs must exist)</li>
            <li>Domain-specific validations (e.g., valid product codes)</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Semantic Validation Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function validateEventData(jsonString) {
  // Parse and perform basic schema validation first
  const baseResult = validateJsonSchema(jsonString, eventSchema);
  if (!baseResult.valid) return baseResult;
  
  const data = JSON.parse(jsonString);
  const errors = [];
  
  // Cross-field validation: end date must be after start date
  if (new Date(data.endDate) <= new Date(data.startDate)) {
    errors.push({
      field: "endDate",
      message: "End date must be after start date"
    });
  }
  
  // Capacity validation
  if (data.registrations > data.maxCapacity) {
    errors.push({
      field: "registrations",
      message: "Registrations cannot exceed maximum capacity"
    });
  }
  
  // Location validation: check if location exists in database
  if (!isValidLocation(data.locationId)) {
    errors.push({
      field: "locationId",
      message: "Location does not exist"
    });
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">JSON Schema: A Standard for Validation</h2>
          
          <p>
            JSON Schema is the industry standard for defining the structure, content, and 
            validation constraints of JSON data:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Provides a declarative way to describe JSON data structures</li>
            <li>Enables automatic validation of JSON documents</li>
            <li>Supports complex validation rules and dependencies</li>
            <li>Can generate documentation and UI forms</li>
            <li>Supports composition and reuse through references</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">JSON Schema Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User Profile",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid",
      "description": "Unique identifier for the user"
    },
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 13,
      "maximum": 120
    },
    "preferences": {
      "type": "object",
      "properties": {
        "theme": {
          "type": "string",
          "enum": ["light", "dark", "system"]
        },
        "notifications": {
          "type": "boolean"
        }
      }
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "maxItems": 10
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["id", "name", "email"],
  "additionalProperties": false
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Best Practices for Implementing Validation</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Create a Validation Pipeline</h3>
          <p>
            Implement a step-by-step validation process:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Check for basic parsing/syntax errors</li>
            <li>Validate against schema (structure and types)</li>
            <li>Perform semantic validations (business rules)</li>
            <li>Log detailed errors at each stage</li>
          </ol>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Validation Pipeline Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function validateJson(jsonString) {
  // Step 1: Syntax validation
  const syntaxResult = validateJsonSyntax(jsonString);
  if (!syntaxResult.valid) {
    return {
      valid: false,
      stage: "syntax",
      errors: [syntaxResult.error],
      position: syntaxResult.position
    };
  }
  
  // Step 2: Schema validation
  const data = JSON.parse(jsonString);
  const schemaResult = validateJsonSchema(data, mySchema);
  if (!schemaResult.valid) {
    return {
      valid: false,
      stage: "schema",
      errors: schemaResult.errors
    };
  }
  
  // Step 3: Semantic validation
  const semanticResult = validateBusinessRules(data);
  if (!semanticResult.valid) {
    return {
      valid: false,
      stage: "semantic",
      errors: semanticResult.errors
    };
  }
  
  // All validations passed
  return {
    valid: true,
    data: data
  };
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Provide Detailed Error Information</h3>
          <p>
            Make error messages actionable and helpful:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Include line and column numbers for syntax errors</li>
            <li>Reference specific property paths for schema violations</li>
            <li>Explain why a value is invalid (e.g., &quot;minimum value is 1, got -5&quot;)</li>
            <li>Provide suggestions when possible</li>
            <li>Group related errors logically</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">User-Friendly Error Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Poor error message
"Invalid value for price"

// Better error message
{
  "field": "product.price",
  "value": -10.99,
  "constraint": "minimum",
  "minimumValue": 0,
  "message": "Product price must be a positive number",
  "path": ["product", "price"],
  "location": {
    "line": 12,
    "column": 16
  },
  "suggestion": "Use a positive value or 0 for free products"
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">3. Implement Progressive Validation</h3>
          <p>
            For large or complex JSON documents, validate incrementally:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Validate the overall structure first (keys and types)</li>
            <li>Validate each logical section independently</li>
            <li>Use lazy validation for nested arrays to avoid validating thousands of items at once</li>
            <li>Prioritize critical validations before detailed ones</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">4. Cache and Reuse Validators</h3>
          <p>
            Optimize performance by proper validator management:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Compile schemas once and reuse the compiled validators</li>
            <li>Share common validation logic across different document types</li>
            <li>Consider performance implications of complex regex patterns</li>
            <li>Use specialized validators for high-frequency operations</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Validator Caching Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`// Inefficient: Compiles schema for every validation
function validateUserData(userData) {
  const ajv = new Ajv();
  const validate = ajv.compile(userSchema);
  return validate(userData);
}

// Better: Compile once, reuse many times
const ajv = new Ajv(); // Global instance
const validatorCache = {};

function getValidator(schemaName) {
  if (!validatorCache[schemaName]) {
    const schema = require(\`./schemas/\${schemaName}.json\`);
    validatorCache[schemaName] = ajv.compile(schema);
  }
  return validatorCache[schemaName];
}

function validateUserData(userData) {
  const validate = getValidator('user');
  return validate(userData);
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Validation Tools and Libraries</h2>
          
          <p>
            Various libraries and tools are available to help with JSON validation:
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-hidden overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Language/Platform</th>
                  <th className="p-2 text-left">Popular Libraries</th>
                  <th className="p-2 text-left">Key Features</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">JavaScript</td>
                  <td className="p-2">Ajv, Joi, yup, zod</td>
                  <td className="p-2">Fast validation, TypeScript integration, custom error messages</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Python</td>
                  <td className="p-2">jsonschema, pydantic, marshmallow</td>
                  <td className="p-2">Data serialization, object mapping, automatic validation</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Java</td>
                  <td className="p-2">Jackson, Everit JSON Schema, Java JSON Schema</td>
                  <td className="p-2">Strong typing, thorough validation, enterprise features</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">.NET</td>
                  <td className="p-2">Newtonsoft.Json.Schema, NJsonSchema</td>
                  <td className="p-2">Integration with .NET ecosystem, code generation</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Ruby</td>
                  <td className="p-2">json_schema, json-schema</td>
                  <td className="p-2">Ruby-native API, schema generation</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Go</td>
                  <td className="p-2">gojsonschema, validator</td>
                  <td className="p-2">Performance-focused, struct tag validation</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">CLI Tools</td>
                  <td className="p-2">jsonschema, ajv-cli, jsonlint</td>
                  <td className="p-2">Command-line validation, integration with build pipelines</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-medium mt-6">Selecting the Right Validation Tool</h3>
          <p>
            Consider these factors when choosing a validation library:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Performance</strong> - Validation speed and memory usage</li>
            <li><strong>Feature completeness</strong> - Support for all JSON Schema features you need</li>
            <li><strong>Error reporting</strong> - Quality and usefulness of error messages</li>
            <li><strong>Extensibility</strong> - Support for custom validators and formats</li>
            <li><strong>Community and maintenance</strong> - Active development and good documentation</li>
            <li><strong>Integration</strong> - Compatibility with your tech stack</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mt-8">Integrating Validation with Formatting</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Sequential Process</h3>
          <p>
            The most common approach is to validate first, then format:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function processJson(jsonString) {
  // Step 1: Validate
  const validationResult = validateJson(jsonString);
  if (!validationResult.valid) {
    return {
      success: false,
      errors: validationResult.errors,
      // Return the original JSON for debugging
      originalJson: jsonString
    };
  }
  
  // Step 2: Format (only if valid)
  try {
    const parsedJson = JSON.parse(jsonString);
    const formattedJson = JSON.stringify(parsedJson, null, 2);
    
    return {
      success: true,
      formattedJson: formattedJson,
      // Include any analytics or metadata
      stats: {
        lineCount: formattedJson.split('\\n').length,
        byteSize: formattedJson.length
      }
    };
  } catch (error) {
    // This should never happen if validation passed
    return {
      success: false,
      errors: ["Unexpected error during formatting"],
      details: error.message
    };
  }
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">2. Validation-Informed Formatting</h3>
          <p>
            Some advanced systems use validation results to inform formatting:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Highlighting problematic sections in the formatted output</li>
            <li>Adding comments next to potentially problematic values</li>
            <li>Applying different formatting rules based on data types or contexts</li>
            <li>Generating warnings inline for values that pass validation but are unusual</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">3. Recovery-Oriented Formatting</h3>
          <p>
            For some use cases, formatting can proceed even with certain validation errors:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Format what is valid, mark what isn&apos;t</li>
            <li>Apply fixes for common errors before formatting</li>
            <li>Provide both the fixed version and error reports</li>
            <li>Allow different levels of strictness</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Lenient Processing Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function lenientProcessJson(jsonString, options = {}) {
  const { 
    fixTrailingCommas = true,
    allowComments = true,
    convertSingleQuotes = true
  } = options;
  
  let processedJson = jsonString;
  const fixes = [];
  
  // Apply fixes based on options
  if (fixTrailingCommas) {
    processedJson = processedJson.replace(/,\\s*([\\]\\}])/g, '$1');
    fixes.push("Removed trailing commas");
  }
  
  if (allowComments) {
    // Remove single line comments
    processedJson = processedJson.replace(/\\/\\/.*$/gm, '');
    // Remove multi-line comments
    processedJson = processedJson.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');
    fixes.push("Removed comments");
  }
  
  if (convertSingleQuotes) {
    // Convert single quotes to double quotes (with appropriate escaping)
    processedJson = processedJson.replace(/'([^'\\\\]*(?:\\\\.[^'\\\\]*)*)'(?=\\s*:)/g, '"$1"');
    processedJson = processedJson.replace(/:\\s*'([^'\\\\]*(?:\\\\.[^'\\\\]*)*)'(?=[,\\}\\]])/g, ': "$1"');
    fixes.push("Converted single quotes to double quotes");
  }
  
  // Now try to parse and format
  try {
    const parsedJson = JSON.parse(processedJson);
    const formattedJson = JSON.stringify(parsedJson, null, 2);
    
    return {
      success: true,
      formattedJson,
      appliedFixes: fixes.length > 0 ? fixes : ["No fixes needed"],
      originalHasIssues: processedJson !== jsonString
    };
  } catch (error) {
    return {
      success: false,
      originalJson: jsonString,
      processedJson: processedJson,
      error: error.message,
      appliedFixes: fixes
    };
  }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Validation in CI/CD and Production Environments</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Automated Validation in CI Pipelines</h3>
          <p>
            Integrate JSON validation into your continuous integration workflows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Validate all JSON configuration files with every commit</li>
            <li>Add schema validation to API tests</li>
            <li>Enforce schema compatibility between versions</li>
            <li>Generate validation reports as part of build artifacts</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">2. Production-Grade Validation Strategies</h3>
          <p>
            For high-volume production systems, apply these practices:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Implement request validation at API boundaries</li>
            <li>Use optimized validators for performance-critical paths</li>
            <li>Apply appropriate error handling and logging</li>
            <li>Consider validation impact on latency and throughput</li>
            <li>Set up monitoring for validation errors to detect potential issues</li>
          </ul>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Security Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Proper JSON validation is not just about data quality—it&apos;s also a security practice. 
              Validating input helps prevent injection attacks, denial of service vulnerabilities, 
              and other security issues related to untrusted data.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Implementing robust JSON validation before formatting is an essential practice that improves 
            data quality, application reliability, and developer experience. By separating validation from 
            formatting, you create a clearer separation of concerns and enable more thorough checking of 
            your JSON data beyond simple syntax verification.
          </p>
          
          <p>
            For optimal results, implement a multi-level validation strategy that includes syntax checking, 
            schema validation, and semantic validation. Provide clear, actionable error messages, and leverage 
            appropriate libraries for your technology stack. Whether you&apos;re building interactive tools, APIs, 
            or data pipelines, proper validation is the foundation of reliable JSON processing.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 