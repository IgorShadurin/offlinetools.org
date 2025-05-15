import type { Metadata } from "next";
import {
  ShieldCheck,
  FileJson,
  Scale,
  Focus,
  Shrink,
  CheckCircle,
  Timer,
  Lock,
  ScrollText,
  User,
  Eraser,
  Key,
  Users,
  Database,
  Pen,
  Trash2,
  Code,
  BookOpen,
  Upload,
  EyeOff,
  Server,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance with GDPR in JSON Formatting Services | Developer Guide",
  description: "Understand how GDPR regulations apply to services that process and format JSON data, with practical considerations for developers.",
};

export default function GdprJsonComplianceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <ShieldCheck className="text-green-600" size={36} /> Compliance with GDPR in JSON Formatting Services
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <FileJson size={24} /> Introduction: GDPR and Your Service
          </h2>
          <p>
            The General Data Protection Regulation (GDPR) is a comprehensive data privacy law in the European Union. It imposes strict requirements on how personal data of EU residents is collected, processed, and stored. If your service handles JSON data that contains or might contain personal information about individuals in the EU, whether you&apos;re providing a simple formatter, a validator, a transformer, or a storage solution, GDPR compliance is crucial.
          </p>
          <p>
            As a provider of a JSON formatting service, you likely act as a &quot;Data Processor&quot; for your users, who are the &quot;Data Controllers&quot;. Understanding this distinction and the responsibilities that come with it is the first step towards compliance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Scale size={24} /> Core GDPR Principles in the Context of JSON Processing
          </h2>
          <p>
            Let&apos;s break down the key GDPR principles and how they specifically apply when dealing with JSON data.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <ScrollText size={20} /> Lawfulness, Fairness, and Transparency
          </h3>
          <p>
            You must have a legal basis to process the JSON data (e.g., user consent, necessity for a contract). Be transparent with your users (Data Controllers) about how their JSON data (potentially containing personal data) is handled by your service. Your privacy policy should clearly state this. You should also ensure that the Data Controller using your service has obtained the data lawfully and transparently from the Data Subject.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Focus size={20} /> Purpose Limitation
          </h3>
          <p>
            Process the JSON data only for the specific, explicit, and legitimate purposes you&apos;ve informed your users about (e.g., formatting, validation). Do not process it further in a manner incompatible with those purposes (e.g., using uploaded JSON for training an AI model without explicit consent).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Shrink size={20} /> Data Minimization
          </h3>
          <p>
            Process only the personal data within the JSON that is necessary for the stated purpose. If your service only needs to validate the structure, you don&apos;t need to know the actual values of sensitive fields. Avoid collecting or retaining more data than required.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <CheckCircle size={20} /> Accuracy
          </h3>
          <p>
            While a formatting service typically doesn&apos;t modify the data itself, ensure that any processing (like transformation or anonymization features you might offer) maintains the accuracy of the data relative to the source, unless the purpose is explicitly to modify or remove inaccurate data.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Timer size={20} /> Storage Limitation
          </h3>
          <p>
            Do not keep the JSON data (especially if it contains personal data) longer than necessary for the service&apos;s purpose. For transient services like simple formatters, this means processing the data in memory and not storing it at all. If storage is necessary (e.g., for user history), define clear retention periods and automatically delete data afterwards.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Lock size={20} /> Integrity and Confidentiality (Security)
          </h3>
          <p>
            Implement appropriate technical and organizational measures to ensure the security of the JSON data against unauthorized or unlawful processing and against accidental loss, destruction, or damage. This is paramount.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <ScrollText size={20} /> Accountability
          </h3>
          <p>
            Be able to demonstrate compliance with the GDPR principles. Maintain records of processing activities where required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <User size={24} /> Identifying Personal Data in JSON
          </h2>
          <p>
            Personal Data (PD) or Personally Identifiable Information (PII) can appear in JSON in many forms. It&apos;s any information relating to an identified or identifiable natural person. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Names, aliases</li>
            <li>Email addresses, phone numbers, physical addresses</li>
            <li>IP addresses, device IDs, cookie IDs</li>
            <li>Location data</li>
            <li>Biometric data</li>
            <li>Financial information (bank accounts, credit cards - though sensitive, often not PD unless linked to an individual)</li>
            <li>Specific attributes that, when combined, can identify someone (e.g., job title + company + location + age range).</li>
          </ul>
          <p className="mt-4">
            Example JSON snippet potentially containing personal data:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre className="text-sm">
              {`{
  "orderId": "12345",
  "customer": {
    "userId": "user_abc789",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "shippingAddress": {
      "street": "123 Privacy Lane",
      "city": "DataCity",
      "country": "GDPRland"
    }
  },
  "items": [...],
  "timestamp": "2023-10-27T10:00:00Z",
  "clientIP": "192.168.1.100"
}`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Code size={24} /> Technical and Organizational Measures (TOMs) for JSON Services
          </h2>
          <p>
            Implementing robust TOMs is fundamental to protecting the data you process.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Eraser size={20} /> Anonymization and Pseudonymization
          </h3>
          <p>
            If your service offers features that process the *content* of the JSON rather than just its structure (e.g., data transformation, sample generation), consider offering anonymization or pseudonymization features.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Anonymization:</strong> Removing or aggregating data points so that the individual cannot be identified, even with additional information. Once data is truly anonymized, it falls outside GDPR scope.</li>
            <li><strong>Pseudonymization:</strong> Replacing identifying data points with artificial identifiers (pseudonyms). The original data can still be linked back to the individual with the &quot;key&quot; mapping pseudonyms to real identities. Pseudonymized data is still personal data under GDPR but is subject to less stringent requirements if done effectively.</li>
          </ul>
          <p className="mt-4">
            Conceptual code illustrating how to anonymize a specific field in JSON:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre className="text-sm">
              {`// Pseudo-code example (TypeScript)
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue; }
interface JsonArray extends Array<JsonValue> {}

function anonymizeJsonField(jsonData: JsonValue, fieldPath: string[], replacementValue: JsonValue = "[ANONYMIZED]"): JsonValue {
  if (fieldPath.length === 0 || typeof jsonData !== 'object' || jsonData === null) {
    // Cannot traverse if path is empty or data is not an object/array
    return jsonData;
  }

  const currentField = fieldPath[0];
  const remainingPath = fieldPath.slice(1);

  if (Array.isArray(jsonData)) {
    // Anonymize in array elements if the path applies to elements
    // This simplistic example doesn't handle array indices well; a real one would be more complex
    return jsonData.map(item => anonymizeJsonField(item, fieldPath, replacementValue));
  } else {
    // Anonymize in object
    if (fieldPath.length === 1) {
      // Reached the target field
      if (jsonData.hasOwnProperty(currentField)) {
        const newJson = &#x7b; ...jsonData as JsonObject &#x7d;;
        newJson[currentField] = replacementValue; // Replace the value
        return newJson;
      }
    } else {
      // Traverse deeper into the object
      const currentObject = jsonData as JsonObject;
      if (currentObject.hasOwnProperty(currentField) && typeof currentObject[currentField] === 'object' && currentObject[currentField] !== null) {
        const newJson = &#x7b; ...currentObject &#x7d;;
        newJson[currentField] = anonymizeJsonField(currentObject[currentField], remainingPath, replacementValue);
        return newJson;
      }
    }
    // Field path not found or structure doesn't match
    return jsonData;
  }
}

// Example usage conceptually:
// const originalJson = &#x7b; "user": &#x7b; "email": "test@example.com", "name": "Test" &#x7d;, "data": [...] &#x7d;;
// const anonymizedJson = anonymizeJsonField(originalJson, ["user", "email"]);
// console.log(anonymizedJson);
// Expected output: &#x7b; "user": &#x7b; "email": "[ANONYMIZED]", "name": "Test" &#x7d;, "data": [...] &#x7d;
`}
            </pre>
          </div>
          <p className="mt-4">
            <em>Note:</em> The above code is a simplified example. Real-world anonymization needs careful consideration of the specific data and the risk of re-identification.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Key size={20} /> Encryption
          </h3>
          <p>
            Encrypt data both in transit (using HTTPS/SSL for connections to your service) and at rest (if you store any JSON data containing personal information). This protects the data from unauthorized access even if your infrastructure is compromised.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Users size={20} /> Access Control
          </h3>
          <p>
            Restrict access to the JSON data to only those personnel within your organization who absolutely need it to provide the service. Implement role-based access control (RBAC).
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <ScrollText size={20} /> Logging and Auditing
          </h3>
          <p>
            Maintain logs of access to and processing of personal data (if your service involves storage or complex processing). This is crucial for demonstrating accountability and investigating breaches.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3 flex items-center gap-2">
            <Upload size={20} /> Secure Data Transfer
          </h3>
          <p>
            Ensure that data uploaded to and downloaded from your service is always transferred over encrypted connections (like HTTPS).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <Database size={24} /> Facilitating Data Subject Rights
          </h2>
          <p>
            As a Data Processor, you must assist the Data Controller in responding to Data Subject requests regarding their rights (access, rectification, erasure, restriction of processing, data portability, objection). While the Data Controller is primarily responsible for handling these, your service might need to offer features that allow them to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <Database size={18} className="inline-block mr-1 text-blue-500" /> Provide access to the JSON data they have stored with you that contains a specific individual&apos;s data.
            </li>
            <li>
              <Pen size={18} className="inline-block mr-1 text-yellow-500" /> Rectify (correct) inaccurate personal data within the stored JSON.
            </li>
            <li>
              <Trash2 size={18} className="inline-block mr-1 text-red-500" /> Erase (delete) an individual&apos;s personal data from JSON they have stored on your service.
            </li>
            <li>
              <Upload size={18} className="inline-block mr-1 text-purple-500" /> Export the individual&apos;s data in a structured, commonly used, and machine-readable format (often, the original JSON itself is sufficient if the scope is limited to that individual&apos;s data).
            </li>
          </ul>

          <p className="mt-4">
            Conceptual code demonstrating how to remove fields related to an individual based on a search key in JSON:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre className="text-sm">
              {`// Pseudo-code example (TypeScript)
function removePersonalData(jsonData: JsonValue, identifyingKey: string, identifyingValue: any, fieldsToRemove: string[]): JsonValue {
  if (typeof jsonData !== 'object' || jsonData === null) {
    return jsonData;
  }

  if (Array.isArray(jsonData)) {
    // Process array elements
    // This logic would need refinement based on how the identifying key/value applies in an array
    return jsonData
      .map(item => removePersonalData(item, identifyingKey, identifyingValue, fieldsToRemove))
      .filter(item => {
        // Optional: remove the whole object/item if it belongs to the identified individual
        // This requires a check if the item *contained* the identifyingKey/Value
        // For simplicity here, we don't filter items out, just remove fields within them
        return true; // Keep all items in this simplified example
      });
  } else {
    // Process object
    const newJson: JsonObject = &#x7b;&#x7d;;
    let isTargetObject = false;

    // Check if this object contains the identifying key/value pair
    if (jsonData.hasOwnProperty(identifyingKey) && (jsonData as JsonObject)[identifyingKey] === identifyingValue) {
      isTargetObject = true;
    }

    for (const key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        if (isTargetObject && fieldsToRemove.includes(key)) {
          // If this is the target object and the key should be removed, skip it
          continue;
        } else {
          // Otherwise, include the key and process its value recursively
          newJson[key] = removePersonalData((jsonData as JsonObject)[key], identifyingKey, identifyingValue, fieldsToRemove);
        }
      }
    }
    return newJson;
  }
}

// Example usage conceptually:
// const originalJson = &#x7b;
//   "users": [
//     &#x7b; "id": "user_1", "name": "Alice", "email": "alice@example.com" &#x7d;,
//     &#x7b; "id": "user_2", "name": "Bob", "email": "bob@example.com" &#x7d;
//   ]
// &#x7d;;
// const jsonAfterErasure = removePersonalData(originalJson, "id", "user_1", ["name", "email"]);
// console.log(jsonAfterErasure);
// Expected output (conceptually):
// &#x7b;
//   "users": [
//     &#x7b; "id": "user_1" &#x7d;, // name and email removed for user_1
//     &#x7b; "id": "user_2", "name": "Bob", "email": "bob@example.com" &#x7d; // user_2 remains unchanged
//   ]
// &#x7d;
`}
            </pre>
          </div>
           <p className="mt-4">
            <em>Note:</em> This example is highly simplified. Deleting data, especially within complex nested structures or arrays where an individual&apos;s data might be spread across multiple parts of the JSON, is complex and requires careful design based on the expected data structure.
          </p>
        </section>


         <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
             <EyeOff size={24} /> Protecting Against Accidental Data Exposure
          </h2>
          <p>
            Consider the potential risks of exposing personal data unintentionally through the service interface or logging.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Input Fields:</strong> If the service involves user input, ensure that sensitive data entered into fields (like the JSON input area) is not inadvertently logged or exposed to third-party scripts.</li>
             <li><strong>Error Messages:</strong> Avoid including full user inputs, especially the raw JSON, in error messages that might be logged or displayed to users or third parties. Mask sensitive parts if necessary.</li>
            <li><strong>Browser History/Caching:</strong> Advise users (Data Controllers) that sensitive data entered into client-side interfaces might be stored in their browser history or cache and recommend using incognito modes for sensitive data.</li>
             <li><strong>Cross-Site Scripting (XSS) / Cross-Site Request Forgery (CSRF):</strong> Implement standard web security practices to prevent attackers from injecting malicious scripts that could steal the JSON data being processed.</li>
             <li><strong>Referrer Headers:</strong> Be mindful that if the service processes data via URL parameters (generally a bad practice for sensitive JSON), the URL (including data) can end up in referrer headers of outbound requests. Stick to POST requests for data submission.</li>
          </ul>
           <p className="mt-4">
            If the sensitive data was returned as a simple JSON array (e.g., `[&#x7b;...&#x7d;, &#x7b;...&#x7d;]`), this response was also a valid JavaScript array literal. In some scenarios (especially pre-ES5 browsers or specific execution contexts like overriding Array constructors), the malicious page could potentially read the values of this array. Similarly, if it was a simple object literal (`&#x7b;...&#x7d;`), it could potentially be assigned to a variable if the response was wrapped in parentheses. This highlights the importance of returning the response with the correct `Content-Type: application/json` header and avoiding potential JSON hijacking vectors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <User size={24} /><Server size={24} className="ml-[-0.5rem]"/> Roles: Data Controller vs. Data Processor
          </h2>
           <p>
            Understanding the distinction is key to assigning responsibilities:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <User size={18} className="inline-block mr-1 text-blue-500"/> <strong>Data Controller:</strong> The entity that determines the purposes and means of processing personal data. This is typically the *user* of your JSON formatting service (e.g., a company processing customer data). They are responsible for the lawfulness of the data they feed into your service and for handling data subject requests directly.
            </li>
             <li>
               <Server size={18} className="inline-block mr-1 text-blue-500"/> <strong>Data Processor:</strong> The entity that processes personal data on behalf of the controller. This is *your service*. You act strictly on the instructions of the controller.
            </li>
          </ul>
          <p className="mt-4">
            As a Processor, you must:
          </p>
           <ul className="list-disc pl-6 space-y-2 mt-4">
             <li>Process data only according to the Controller&apos;s documented instructions.</li>
             <li>Ensure personnel processing the data are committed to confidentiality.</li>
             <li>Implement appropriate security measures (TOMs).</li>
             <li>Engage sub-processors only with the Controller&apos;s authorization.</li>
             <li>Assist the Controller in responding to Data Subject requests.</li>
             <li>Assist the Controller in ensuring GDPR compliance regarding security and breach notifications.</li>
             <li>Delete or return all personal data to the Controller upon termination of services.</li>
             <li>Provide the Controller with necessary information to demonstrate compliance.</li>
          </ul>
          <p className="mt-4">
            A Data Processing Agreement (DPA) between your service and your users (Data Controllers) is legally required if you process personal data. This agreement formalizes these responsibilities.
          </p>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            <BookOpen size={24} /> Practical Considerations for Developers
          </h2>
          <p>
            Beyond the high-level principles, developers building and maintaining a JSON formatting service should:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Minimize Data Handling:</strong> Process JSON in memory without persistence whenever possible for transient tasks like simple formatting or validation.</li>
             <li><strong>Secure Input/Output:</strong> Always use secure connections (HTTPS). Sanitize any output that includes parts of the input, especially in error messages, to prevent exposing sensitive data.</li>
             <li><strong>Secure Storage:</strong> If storing JSON is necessary (e.g., user accounts, history), ensure it is encrypted at rest and access is strictly controlled. Use secure, compliant cloud storage providers if applicable.</li>
             <li><strong>Logging Policy:</strong> Define a clear policy on what gets logged. Avoid logging the full JSON input/output if it might contain personal data. Log only necessary metadata (e.g., file size, operation type, timestamp). Implement log retention policies.</li>
            <li><strong>Sub-processors:</strong> Be aware of any third-party services you use (e.g., cloud hosting, error tracking, analytics) and vet their GDPR compliance. List them in your privacy policy/DPA.</li>
            <li><strong>Code Review:</strong> Include security and privacy considerations in code reviews, particularly regarding data handling and storage.</li>
            <li><strong>Documentation:</strong> Document your processing activities, security measures, and data flows. This is essential for accountability.</li>
          </ul>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
             <ShieldCheck size={24} /> Conclusion: Building Trust Through Compliance
           </h2>
           <p>
             Compliance with GDPR is not just a legal obligation; it&apos;s a way to build trust with your users, especially if they are handling sensitive data. For developers of JSON formatting services, this means being diligent about data security, minimizing data handling where possible, being transparent about processing activities, and understanding the responsibilities as a Data Processor. By implementing appropriate technical and organizational measures, you can provide a valuable service while respecting the privacy rights of individuals whose data might pass through your hands.
           </p>
        </section>

      </div>
    </>
  );
}