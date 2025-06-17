import type { Metadata } from "next";
import { Link, Database, Code, FileJson, FlaskConical, ShieldCheck, TriangleAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Healthcare Data Integration and JSON Formatters | Dev Guide",
  description: "Exploring the role of JSON formatters and data integration techniques in the healthcare industry.",
};

export default function HealthcareDataIntegrationPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Healthcare Data Integration and <span className="text-blue-600 dark:text-blue-400">JSON Formatters</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Link className="mr-2 text-blue-600 dark:text-blue-400" />
            The Challenge of Healthcare Data Integration
          </h2>
          <p className="text-lg leading-relaxed">
            Healthcare systems are notoriously complex, operating with a diverse landscape of legacy systems, electronic
            health records (EHRs), lab systems, imaging systems, billing platforms, and more. These systems often use
            proprietary formats, different data models, and varying communication protocols. Integrating data across
            these silos is crucial for improving patient care, enabling analytics, supporting research, and streamlining
            administrative processes.
          </p>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="flex items-start">
              <TriangleAlert className="mr-2 mt-1 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <strong>Key Problem: Data Silos & Interoperability:</strong> Lack of common standards and formats makes it
              difficult for systems to "talk" to each other effectively, leading to fragmented patient information and
              inefficiencies.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileJson className="mr-2 text-green-600 dark:text-green-400" />
            Why JSON in Healthcare?
          </h2>
          <p className="text-lg leading-relaxed">
            While traditional healthcare standards like HL7 v2 or DICOM use different structures, modern approaches and
            APIs, particularly those based on Fast Healthcare Interoperability Resources (FHIR), heavily utilize JSON as
            a primary data exchange format. JSON's human-readable structure, widespread support across programming
            languages, and flexibility make it an attractive option for web-based APIs and modern data pipelines.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>FHIR & RESTful APIs:</strong> FHIR, a leading standard for exchanging healthcare information
              electronically, defines RESTful APIs where resources (like Patient, Observation, Encounter) are often
              represented and exchanged as JSON objects.
            </li>
            <li>
              <strong>Flexibility:</strong> JSON can represent complex, nested data structures required for detailed
              clinical information.
            </li>
            <li>
              <strong>Ease of Use:</strong> Compared to EDI or XML, JSON is often simpler for developers to parse and
              generate.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FlaskConical className="mr-2 text-purple-600 dark:text-purple-400" />
            The Role of JSON Formatters/Transformers
          </h2>
          <p className="text-lg leading-relaxed">
            A "JSON Formatter" or, more accurately in this context, a "Data Transformer" or "Mapper," plays a critical
            role in healthcare integration. These tools or code components are responsible for converting data from its
            source format (e.g., a relational database row, an XML document, an HL7 v2 message) into a target JSON
            structure, often conforming to a specific standard like FHIR.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Functions:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start">
              <Database className="mr-2 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400" />{" "}
              <strong>Data Extraction:</strong> Pulling relevant data from source systems.
            </li>
            <li className="flex items-start">
              <Code className="mr-2 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400" /> <strong>Mapping:</strong>{" "}
              Translating source fields/elements to target JSON properties according to defined rules.
            </li>
            <li className="flex items-start">
              <FlaskConical className="mr-2 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400" />{" "}
              <strong>Transformation:</strong> Applying logic (e.g., date format conversion, unit conversion, lookup
              values) during the mapping process.
            </li>
            <li className="flex items-start">
              <FileJson className="mr-2 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400" />{" "}
              <strong>Structuring:</strong> Building the nested JSON object/array structure required by the target
              schema.
            </li>
            <li className="flex items-start">
              <ShieldCheck className="mr-2 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400" />{" "}
              <strong>Validation:</strong> Ensuring the generated JSON conforms to the expected schema (e.g., FHIR JSON
              schema).
            </li>
            <li className="flex items-start">
              <TriangleAlert className="mr-2 mt-1 flex-shrink-0 text-gray-600 dark:text-gray-400" />{" "}
              <strong>Handling Missing Data:</strong> Deciding how to represent or handle data that is absent in the
              source but required/optional in the target.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-blue-600 dark:text-blue-400" />
            Implementation Angles & Examples
          </h2>
          <p className="text-lg leading-relaxed">
            Implementing JSON formatters can range from simple script-based mappings to sophisticated data integration
            platforms. Here are a few perspectives:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">1. Simple Scripted Mapping (TypeScript/JavaScript)</h3>
          <p>For straightforward cases, you might write functions to map data fields directly.</p>
          <div className="bg-gray-100 p-4 rounded-md dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              {`interface LegacyPatientRecord {
  Patient_ID: string;
  FirstName: string;
  LastName: string;
  DOB_YYYYMMDD: string; // e.g., '19900115'
  GenderCode: 'M' | 'F' | 'O' | 'U'; // Source codes
  ContactInfo: {
    HomePhone: string;
    Email: string;
  };
}

interface FHIRPatientResource {
  resourceType: "Patient";
  id: string;
  name?: Array&lt;{
    use?: string;
    family?: string;
    given?: string[];
  }>;
  birthDate?: string; // e.g., '1990-01-15'
  gender?: "male" | "female" | "other" | "unknown";
  telecom?: Array&lt;{
    system?: string;
    value?: string;
    use?: string;
  }>;
  // ... other FHIR fields
}

// This function is for conceptual demonstration within the article text.
// It would typically be defined elsewhere in a real project.
function mapLegacyPatientToFHIR(legacyPatient: LegacyPatientRecord): FHIRPatientResource {
  const fhirPatient: FHIRPatientResource = {
    resourceType: "Patient",
    id: legacyPatient.Patient_ID, // Or generate a new stable ID
  };

  // Map Name
  fhirPatient.name = [{
    use: 'official', // Assuming 'official' use
    family: legacyPatient.LastName,
    given: [legacyPatient.FirstName],
  }];

  // Map Birth Date (requires format transformation)
  // Basic example - real world needs more robust date parsing/handling
  const dobMatch = legacyPatient.DOB_YYYYMMDD.match(/^(\\d{4})(\\d{2})(\\d{2})$/);
  if (dobMatch) {
    fhirPatient.birthDate = \`&#36;{dobMatch[1]}-&#36;{dobMatch[2]}-&#36;{dobMatch[3]}\`;
  }

  // Map Gender Code (requires lookup/mapping)
  const genderMap: { [key: string]: FHIRPatientResource['gender'] } = {
    'M': 'male',
    'F': 'female',
    'O': 'other',
    'U': 'unknown',
  };
  fhirPatient.gender = genderMap[legacyPatient.GenderCode] || 'unknown'; // Defaulting if code is unexpected

  // Map Contact Info (requires mapping systems/uses)
  fhirPatient.telecom = [];
  if (legacyPatient.ContactInfo.HomePhone) {
    fhirPatient.telecom.push({
      system: 'phone',
      value: legacyPatient.ContactInfo.HomePhone,
      use: 'home',
    });
  }
  if (legacyPatient.ContactInfo.Email) {
     fhirPatient.telecom.push({
       system: 'email',
       value: legacyPatient.ContactInfo.Email,
       use: 'home', // Or work, based on context
     });
   }

  // ... map other fields

  return fhirPatient;
}

// Example usage (conceptual - would get data from source system)
// const legacyData: LegacyPatientRecord = { Patient_ID: '123', FirstName: 'John', LastName: 'Doe', DOB_YYYYMMDD: '19900520', GenderCode: 'M', ContactInfo: { HomePhone: '555-1234', Email: 'john.doe@example.com' } }; // Example Data
// const fhirJson = mapLegacyPatientToFHIR(legacyData);
// console.log(JSON.stringify(fhirJson, null, 2)); // Output FHIR JSON
`}
            </pre>
          </div>
          <p>
            This code illustrates the process of taking a source data structure (`LegacyPatientRecord`) and transforming
            it field by field into a target JSON structure (`FHIRPatientResource`), handling data type conversions and
            value lookups.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">2. Configuration-Driven Mapping</h3>
          <p>
            For complex scenarios with many mappings, a configuration-based approach is more maintainable. This involves
            defining the mapping rules in a separate configuration file (like JSON, YAML, or XML) and using a generic
            engine to apply these rules to input data.
          </p>
          <div className="bg-gray-100 p-4 rounded-md dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              {`// Example Mapping Configuration (Simplified JSON)
{
  "sourceType": "LegacyPatientRecord",
  "targetType": "FHIRPatientResource",
  "mappings": [
    { "source": "Patient_ID", "target": "id", "transform": "identity" },
    { "source": "FirstName", "target": "name[0].given[0]", "transform": "identity" },
    { "source": "LastName", "target": "name[0].family", "transform": "identity" },
    {
      "source": "DOB_YYYYMMDD",
      "target": "birthDate",
      "transform": "formatDate", // Custom transformation function name
      "format": "YYYY-MM-DD"
    },
    {
      "source": "GenderCode",
      "target": "gender",
      "transform": "lookup", // Custom lookup function name
      "mappingTable": { "M": "male", "F": "female", "O": "other", "U": "unknown" }
    },
    // More complex mappings for nested structures or arrays require richer config syntax
    // e.g., for telecom array, you might need iteration rules or conditional logic
  ]
}

// Conceptual Transformation Engine (TypeScript)
// function applyMapping(sourceData: any, config: MappingConfig): any {
//   const targetData = { resourceType: config.targetType.replace('FHIR','').replace('Resource','') }; // Basic target structure
//   for (const mapRule of config.mappings) {
//     const sourceValue = getNestedValue(sourceData, mapRule.source); // Helper to get deeply nested value
//     let transformedValue = sourceValue;
//     if (mapRule.transform === 'formatDate') {
//        // Apply date formatting logic here
//        transformedValue = formatDate(sourceValue, mapRule.format);
//     } else if (mapRule.transform === 'lookup') {
//        // Apply lookup logic here
//        transformedValue = mapRule.mappingTable[sourceValue] || 'unknown';
//     } // Add other transformations

//     setNestedValue(targetData, mapRule.target, transformedValue); // Helper to set deeply nested value
//   }
//   return targetData;
// }

// Helper functions like getNestedValue and setNestedValue would handle paths like "name[0].given[0]"
`}
            </pre>
          </div>
          <p>
            This approach separates the mapping logic from the transformation engine, making rules easier to manage and
            update. It's suitable for integration platforms and scenarios where mappings change frequently.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">3. Using Specialized Integration Engines/Platforms</h3>
          <p>
            Many commercial and open-source integration engines (like Mirth Connect/NextGen Connect, Apache Camel, etc.)
            provide visual interfaces or domain-specific languages specifically designed for healthcare data
            transformation, including converting various formats to/from JSON (especially FHIR JSON). These tools often
            include built-in adapters for common protocols (like MLLP for HL7 v2) and handling of healthcare-specific
            data types.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ShieldCheck className="mr-2 text-teal-600 dark:text-teal-400" />
            Handling Sensitive Data and Security
          </h2>
          <p className="text-lg leading-relaxed">
            Healthcare data is Protected Health Information (PHI) and subject to strict regulations (like HIPAA in the
            US). JSON formatters must incorporate security and privacy considerations:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Access Control:</strong> Ensure only authorized processes/users can trigger or modify
              transformations.
            </li>
            <li>
              <strong>Auditing:</strong> Log transformation events, including source and target systems, data types, and
              timestamps.
            </li>
            <li>
              <strong>De-identification/Anonymization:</strong> For certain use cases (e.g., research datasets), PHI
              must be removed or masked. Formatters might need rules to exclude or transform sensitive fields.
            </li>
            <li>
              <strong>Data Minimization:</strong> Only include necessary data fields in the output JSON.
            </li>
            <li>
              <strong>Secure Transmission:</strong> Ensure the integrated data is transmitted securely (e.g., via
              HTTPS).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <TriangleAlert className="mr-2 text-yellow-600 dark:text-yellow-400" />
            Common Challenges
          </h2>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Schema Variability:</strong> Source systems often have inconsistent data models or quality.
            </li>
            <li>
              <strong>Data Quality:</strong> Inaccurate, incomplete, or outdated source data.
            </li>
            <li>
              <strong>Complex Transformations:</strong> Mapping nested structures, conditional logic, and lists/arrays
              can be challenging.
            </li>
            <li>
              <strong>Performance:</strong> Transforming large volumes of data efficiently.
            </li>
            <li>
              <strong>Error Handling:</strong> Robustly managing errors during extraction, transformation, and loading.
            </li>
            <li>
              <strong>Standard Evolution:</strong> Healthcare standards like FHIR evolve, requiring updates to mapping
              logic.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Link className="mr-2 text-blue-600 dark:text-blue-400" />
            Conclusion
          </h2>
          <p className="text-lg leading-relaxed">
            JSON formatters and data transformation logic are foundational components of modern healthcare data
            integration strategies, especially with the rise of FHIR. Whether implemented via custom code, configuration
            files, or specialized platforms, their ability to accurately and securely translate data between disparate
            systems is essential for building interconnected, intelligent healthcare ecosystems. Developers working in
            this domain need to be adept at understanding data models, applying transformation logic, and prioritizing
            data quality and security.
          </p>
        </section>
      </div>
    </div>
  );
}
