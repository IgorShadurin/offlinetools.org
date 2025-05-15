import type { Metadata } from "next";
import {
  FileJson,
  Lightbulb,
  Code,
  CheckCheck,
  Info,
  Book,
  Users,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Self-Documenting JSON Configuration Best Practices | Your Site",
  description:
    "Learn how to write clear, maintainable, and easy-to-understand JSON configuration files through best practices.",
};

// Define code examples as strings outside the JSX structure
const descriptiveKeysExample = `{
  "db_url": "...",
  "req_timeout": 5000,
  "max_con": 100
}

{
  "database_connection_string": "...",
  "request_timeout_ms": 5000,
  "max_concurrent_connections": 100
}`;

const logicalStructureExample = `{
  "database": {
    "host": "localhost",
    "port": 5432,
    "user": "admin",
    "password": "password"
  },
  "services": {
    "service_a": {
      "api_key": "...",
      "timeout_ms": 2000
    },
    "service_b": {
      "api_key": "...",
      "retries": 3
    }
  }
}`;

const reservedKeysExample = `{
  "app_settings": {
    "__description": "General application configuration.",
    "theme": "dark",
    "items_per_page": 20
  },
  "logging": {
    "_comment": "Configure logging levels and destinations.",
    "level": "info",
    "destination": "file"
  }
}`;

const jsonSchemaExample = `{
  "type": "object",
  "properties": {
    "database": {
      "type": "object",
      "properties": {
        "host": { "type": "string" },
        "port": { "type": "integer", "description": "Database port number." },
        "user": { "type": "string" },
        "password": { "type": "string" }
      },
      "required": ["host", "port", "user", "password"]
    },
    "services": {
      "type": "object",
      "properties": {
        "service_a": {
          "$ref": "#/definitions/serviceConfig"
        },
        "service_b": {
          "$ref": "#/definitions/serviceConfig"
        }
      }
    }
  },
  "definitions": {
    "serviceConfig": {
      "type": "object",
      "properties": {
        "api_key": { "type": "string" },
        "timeout_ms": {
           "type": "integer",
           "description": "Request timeout in milliseconds.",
           "minimum": 100
         },
         "retries": {
            "type": "integer",
            "description": "Number of retry attempts.",
            "default": 0
         }
      },
      "required": ["api_key"]
    }
  }
}`;


export default function SelfDocumentingJsonArticlePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-500" />
        Self-Documenting JSON Configuration Best Practices
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. It's ubiquitous in web development, APIs, and configuration files. While its structure is simple, poorly written JSON can be just as cryptic as poorly written code.
        </p>
        <p>
          <strong>Self-documenting JSON</strong> refers to JSON structures that are inherently clear and understandable without requiring extensive external documentation. This is particularly crucial for configuration files, where developers often need to understand settings quickly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
          Why Self-Documenting JSON Matters
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <p>
              <strong>Improved Readability:</strong> Developers (including your future self!) can quickly grasp the purpose of each configuration setting.
            </p>
          </li>
          <li>
            <p>
              <strong>Easier Maintenance:</strong> Updating or debugging configurations becomes faster and less error-prone.
            </p>
          </li>
          <li>
            <p>
              <strong>Smoother Onboarding:</strong> New team members can understand the configuration landscape without constant questions.
            </p>
          </li>
          <li>
            <p>
              <strong>Reduced Errors:</strong> Clear keys and values reduce the likelihood of misinterpreting settings.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-3 text-green-500" />
          Best Practices for Clarity
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" />
          1. Descriptive Key Names
        </h3>
        <p>
          Choose key names that clearly indicate the purpose of the value they hold. Avoid abbreviations or overly technical jargon unless it's standard in the domain and well-understood.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {descriptiveKeysExample}
            </pre>
          </div>
        </div>
        <p>
          Using conventions like appending units (e.g., <code>_ms</code> for milliseconds) or indicating format can add clarity.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" />
          2. Logical Structure and Nesting
        </h3>
        <p>
          Group related settings together using nested objects. This creates a hierarchy that reflects the application's structure or the domain being configured.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {logicalStructureExample}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" />
          3. Use Appropriate Data Types
        </h3>
        <p>
          JSON supports strings, numbers, booleans, arrays, objects, and null. Use the most fitting type for the data. A boolean key like <code>"feature_enabled": true</code> is clearer than <code>"feature_enabled": "yes"</code>. Use arrays for lists of items.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" />
          4. Handle Comments (with caveats)
        </h3>
        <p>
          Standard JSON does <strong>not</strong> support comments. Adding <code>&#x2F;&#x2F;</code> or <code>&#x2F;&#x2A; ... &#x2A;&#x2F;</code> will make the JSON invalid. However, for configuration files, it is a common practice to use one of these methods:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <p>
              <strong>Strip Comments Before Parsing:</strong> Use a pre-processor or loader that removes comments before passing the string to a standard JSON parser. Many configuration loading libraries do this (e.g., JSONC - JSON with Comments).
            </p>
          </li>
          <li>
            <p>
              <strong>Reserved Keys for Documentation:</strong> Some conventions use special keys like <code>&#x7b;_comment&#x7d;</code>, <code>&#x7b;__description&#x7d;</code>, or $note within objects to hold descriptive text. Parsers are expected to ignore these keys or handle them specially.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-lg font-medium mb-2">Example using reserved keys:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {reservedKeysExample}
                </pre>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Info className="inline-block w-4 h-4 mr-1 pb-0.5" /> Note: This is not standard JSON and relies on the parser or consuming application to understand and ignore these keys.
            </p>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" />
          5. Consistent Formatting
        </h3>
        <p>
          Use consistent indentation (2 or 4 spaces), consistent key casing (camelCase, snake_case, or PascalCase), and maintain a predictable order of keys within objects if possible (though JSON objects are inherently unordered, tools often preserve insertion order). Using a linter or formatter (like Prettier) can automate this.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <CheckCheck className="w-5 h-5 mr-2 text-green-600" />
          6. Document Expected Value Formats/Constraints
        </h3>
        <p>
          If a value has a specific format (e.g., a date string, a URL, a specific enum value), mention this in external documentation or use reserved keys for comments if that convention is adopted. Even better, use JSON Schema.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Book className="w-5 h-5 mr-2 text-green-600" />
          7. Consider JSON Schema for Formal Documentation
        </h3>
        <p>
          For complex or critical configurations, JSON Schema provides a powerful way to formally describe the structure and constraints of your JSON data. It serves as both documentation and a validation tool. While it's external to the JSON file itself, it's the most robust method for ensuring clarity and correctness.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example snippet of a JSON Schema:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {jsonSchemaExample}
            </pre>
          </div>
        </div>
        <p>
          JSON Schema allows you to specify types, required fields, ranges, patterns, descriptions, and more, providing comprehensive documentation and validation capabilities. Many IDEs also offer autocompletion and validation based on JSON Schema.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Users className="w-6 h-6 mr-3 text-purple-500" />
          Integrating with Your Workflow
        </h2>
        <p>
          Making self-documenting JSON a standard practice requires team adoption and tooling:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <p>
              <strong>Code Reviews:</strong> Include clarity and adherence to naming/structuring conventions in your code review process.
            </p>
          </li>
          <li>
            <p>
              <strong>Linters/Formatters:</strong> Use tools like ESLint (with plugins), Prettier, or specific JSON formatters to enforce consistent style.
            </p>
          </li>
          <li>
            <p>
              <strong>Configuration Loading Libraries:</strong> Choose libraries that support comments (if you adopt that convention) or provide good error reporting.
            </p>
          </li>
          <li>
            <p>
              <strong>JSON Schema Validation:</strong> Integrate JSON Schema validation into your application's startup or configuration loading process to catch errors early.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="w-6 h-6 mr-3 text-red-500" />
          Tools and Conventions
        </h2>
        <p>
          Beyond JSON Schema, consider these related tools and conventions:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <p>
              <strong>YAML:</strong> Often used for configuration, YAML is a superset of JSON and explicitly supports comments, anchors, and aliases, which can aid documentation and reduce repetition.
            </p>
          </li>
          <li>
            <p>
              <strong>dotenv:</strong> While not JSON, <code>.env</code> files are simple key=value pairs often used for environment-specific configuration (like secrets). They are inherently simple but lack the structure of JSON.
            </p>
          </li>
          <li>
            <p>
              <strong>Configuration-Specific Languages:</strong> Some projects use languages designed specifically for configuration (e.g., HCL by HashiCorp), which often include better support for comments, types, and structure than raw JSON.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-3 text-blue-500" />
          Conclusion
        </h2>
        <p>
          While JSON's core specification is minimal, writing clear and maintainable configuration files involves adopting conventions and potentially using supplementary tools. Focusing on descriptive key names, logical structure, appropriate data types, and consistent formatting will significantly improve the "self-documenting" nature of your JSON. For more rigorous documentation and validation, integrating JSON Schema is highly recommended. By treating your configuration files with the same care as your codebase, you contribute to a more understandable and maintainable project.
        </p>
      </div>
    </>
  );
}
