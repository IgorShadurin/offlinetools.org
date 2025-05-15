import type { Metadata } from "next";
import {
  CheckCircle,
  // XCircle, // Removed XCircle as it's not used
  FileJson,
  Wrench,
  Search,
  RefreshCcw,
  Database,
  Code,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatters for Data Migration Projects | Offline Tools",
  description:
    "Explore how JSON formatters and processors are essential tools for standardizing, validating, and transforming data during migration projects.",
};

export default function JsonFormattersDataMigrationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson className="text-blue-500" size={36} />
        <span>Using JSON Formatters in Data Migration</span>
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          Data migration is a critical, often complex process involving moving data from one system to another.
          A common challenge is dealing with data in inconsistent formats, especially when the source data
          comes from various places or has evolved over time.{" "}
          <strong>JSON (JavaScript Object Notation)</strong> is a ubiquitous format, but even JSON data can vary
          significantly in structure, naming conventions, and data types. This is where{" "}
          <strong>JSON formatters and processors</strong> become indispensable tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookOpen size={24} />
          <span>What are JSON Formatters & Processors?</span>
        </h2>
        <p>
          At its simplest, a "JSON formatter" might refer to a tool that pretty-prints JSON, making it readable
          by adding indentation and line breaks. However, in the context of data migration, the term extends
          to tools and processes that can:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Standardize:</span> Ensure consistency in structure and key names.
          </li>
          <li>
            <span className="font-medium">Validate:</span> Check if the data conforms to a specific schema or set of rules.
          </li>
          <li>
            <span className="font-medium">Transform:</span> Modify the data's structure, values, or types to fit the target system's requirements.
          </li>
          <li>
            <span className="font-medium">Clean:</span> Handle missing data, remove duplicates, correct malformed entries.
          </li>
        </ul>
        <p>
          Essentially, they are data processing steps specifically tailored for JSON data, preparing it for ingestion
          into the target database or application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <WhyIcon className="text-green-500" size={24} />
          <span>Why Use Them for Data Migration?</span>
        </h2>
        <p>
          Data migration projects often involve integrating data from disparate sources. Even if all sources
          provide JSON, their internal structure might differ. Using formatters and processors helps bridge
          this gap:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Ensuring Data Quality:</strong> Identify and correct errors, inconsistencies, and missing values before
              they corrupt the target system.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Meeting Target Schema Requirements:</strong> Reshape source JSON to precisely match the expected structure
              of the target database tables or document structures.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Simplifying Development:</strong> Separate the concerns of data extraction, transformation, and loading.
              JSON processing focuses solely on the transformation phase for JSON data.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Improving Performance:</strong> Clean and transform data efficiently in bulk, reducing the load on the
              target system during ingestion.
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Wrench size={24} />
          <span>Key Operations in Data Migration</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Search size={20} />
          <span>1. Validation</span>
        </h3>
        <p>
          Before transforming or loading, validating the incoming JSON is crucial. This verifies that the data
          adheres to an expected structure or type definition.
        </p>
        <p>
          <strong>Use Case:</strong> Ensure all user records have a required `email` field and that its value is a string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2 mb-2">
            <Code size={18} />
            <span>Conceptual Validation Example (TypeScript):</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`interface UserData {
  id: number;
  name: string;
  email?: string; // Optional in source, but required for target
  address?: {
    street: string;
    city: string;
  };
}

function isValidUserForMigration(user: any): user is UserData {
  // Basic type and required field checks
  if (typeof user !== 'object' || user === null) return false;
  if (typeof user.id !== 'number') {
      console.warn(\`Validation failed for user: Missing or invalid id type: \${user.id}\`);
      return false; // Example: log and fail
  }
  if (typeof user.name !== 'string' || user.name.trim() === '') {
      console.warn(\`Validation failed for user id \${user.id}: Missing or empty name.\`);
      return false;
  }
  // Check for a field required by the *target* system, even if optional in source
  if (typeof user.email !== 'string' || !user.email.includes('@')) {
       console.warn(\`Validation failed for user id \${user.id}: Missing or invalid email.\`);
      return false;
  }
  // Add more checks as per source data and target schema...
  return true;
}

// Example Usage:
// const sourceUsers = [...]; // Array of potential user objects from source
// const validUsers = sourceUsers.filter(isValidUserForMigration);
// const invalidUsers = sourceUsers.filter(user => !isValidUserForMigration(user));
// console.log(\`Found \${validUsers.length} valid users and \${invalidUsers.length} invalid users.\`);
`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            This example shows basic programmatic validation. In real projects, you'd often use JSON Schema
            validators for more complex rules.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <RefreshCcw size={20} />
          <span>2. Transformation</span>
        </h3>
        <p>
          Transforming JSON involves changing its structure, renaming keys, mapping values, combining fields,
          or splitting complex objects into simpler ones to match the target schema.
        </p>
        <p>
          <strong>Use Case:</strong> Rename a key from `user_name` to `fullName`, extract `city` from a nested `address` object,
          and remove a field like `source_id` that isn't needed in the target system.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium flex items-center space-x-2 mb-2">
            <Code size={18} />
            <span>Transformation Example (TypeScript):</span>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`interface SourceUser {
  user_id: number;
  user_name: string; // Needs renaming
  email: string;
  source_data?: { // Nested object with data to extract/discard
    address_details?: {
      street: string;
      city: string; // Needs extraction
    }
    source_id?: string; // Needs removal
  };
}

interface TargetUser {
  id: number;
  fullName: string; // Renamed
  email: string;
  city?: string; // Extracted
}

function transformUserForTarget(sourceUser: SourceUser): TargetUser {
  const targetUser: TargetUser = {
    id: sourceUser.user_id, // Map user_id to id
    fullName: sourceUser.user_name, // Map user_name to fullName
    email: sourceUser.email,
  };

  // Extract city if available
  if (sourceUser.source_data?.address_details?.city) {
    targetUser.city = sourceUser.source_data.address_details.city;
  }

  // No need to explicitly remove source_id or other unwanted fields,
  // as we are building a new object based on the target schema.

  return targetUser;
}

// Example Usage:
// const sourceUserData: SourceUser = {
//   user_id: 101,
//   user_name: "Alice Smith",
//   email: "alice.s@example.com",
//   source_data: {
//     address_details: {
//       street: "123 Main St",
//       city: "Anytown"
//     },
//     source_id: "abc-xyz"
//   }
// };
// const targetUserData = transformUserForTarget(sourceUserData);
// console.log(JSON.stringify(targetUserData, null, 2));
/* Expected Output:
{
  "id": 101,
  "fullName": "Alice Smith",
  "email": "alice.s@example.com",
  "city": "Anytown"
}
*/
`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            This function takes a `SourceUser` object and returns a `TargetUser` object, performing the
            necessary key remapping and data extraction.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Database size={20} />
          <span>3. Structuring/Restructuring</span>
        </h3>
        <p>
          This is a form of transformation but focuses specifically on changing the hierarchy of the data.
          This is often needed when migrating from a document database (flexible JSON) to a relational database
          (fixed table structures), or vice versa.
        </p>
        <p>
          <strong>Use Case:</strong> Flatten an array of addresses nested within a user object into separate address records,
          or embed related data into a single document.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Wrench size={24} />
          <span>Approaches & Tools (Conceptual)</span>
        </h2>
        <p>
          You can implement JSON formatting and processing using various methods:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Manual Scripting:</strong> Using native language features (like `JSON.parse` and `JSON.stringify` in JavaScript/TypeScript)
            combined with custom code for validation and transformation logic (as shown in the examples above). This offers maximum flexibility
            but requires writing and maintaining the code yourself.
          </li>
          <li>
            <strong>Command- Line Tools:</strong> Tools like `jq` are powerful for filtering, mapping, and transforming JSON data directly
            from the command line. Useful for batch processing large files.
          </li>
          <li>
            <strong>Programming Libraries:</strong> Many languages have libraries specifically designed for JSON processing, validation (e.g.,
            implementing JSON Schema), and complex transformations (e.g., JSONata, JMESPath concepts, although we cannot use external libraries here).
          </li>
          <li>
            <strong>ETL Tools:</strong> Enterprise-level ETL (Extract, Transform, Load) platforms often have built-in capabilities for
            parsing and transforming JSON data as part of a larger migration pipeline.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle className="text-green-500" size={24} />
          <span>Best Practices for JSON Processing in Migration</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Define Target Schema Clearly:</strong> Understand the exact structure, data types, and constraints of the destination system.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Profile Source Data:</strong> Analyze the source JSON to understand its variations, potential errors, and common patterns.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Implement Robust Validation:</strong> Validate early in the process to catch bad data before complex transformations.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Handle Errors Gracefully:</strong> Log errors, skip invalid records, or quarantine them for manual review instead of stopping
              the entire migration.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Test Thoroughly:</strong> Use representative samples of source data to test your processing logic and compare output against
              expected results.
            </div>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <strong>Process in Batches:</strong> For large datasets, process the JSON in chunks to manage memory and resources.
            </div>
          </li>
        </ul>


        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookOpen size={24} />
          <span>Conclusion</span>
        </h2>
        <p>
          JSON formatters and processors are more than just tools for making JSON readable; they are powerful components
          in the data migration toolkit. By enabling standardization, rigorous validation, and flexible transformation,
          they help ensure that data arrives at its destination accurately, reliably, and in the correct format,
          significantly reducing risks and effort in complex migration projects. Whether you use simple scripts or
          sophisticated tooling, mastering JSON processing is key to successful data migration in a world dominated by JSON data.
        </p>
      </div>
    </>
  );
}

// A simple helper component just for the icon, avoiding duplication if used multiple times
function WhyIcon({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-help-circle ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}