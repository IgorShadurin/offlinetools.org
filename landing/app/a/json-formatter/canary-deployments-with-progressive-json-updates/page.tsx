import type { Metadata } from "next";
import {
  GitBranch,
  Percent,
  Monitor,
  Info,
  CheckCheck,
  Database,
  Settings2,
  TriangleAlert,
} from "lucide-react"; // Importing allowed icons

export const metadata: Metadata = {
  title: "Canary Deployments with Progressive JSON Updates",
  description:
    "Learn how to manage data structure changes (JSON) alongside code in a canary deployment to ensure compatibility and reduce risk.",
};

export default function CanaryProgressiveJsonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Canary Deployments with Progressive JSON Updates
      </h1>

      <div className="space-y-6">
        <p>
          Deploying new software versions is a critical part of the development lifecycle, but it always carries risk. How do you minimize the chance that a new release introduces bugs, performance regressions, or breaking changes that impact a significant number of users?
        </p>
        <p>
          One widely adopted strategy is the <strong>Canary Deployment</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <GitBranch className="w-6 h-6" /> What are Canary Deployments?
        </h2>
        <p>
          A canary deployment is a technique that rolls out a new version of an application or service to a small subset of users or servers first. It's like sending a "canary in a coal mine" – if something goes wrong, only a small number of users are affected, and you can quickly detect the issue and roll back before it impacts everyone.
        </p>
        <p>
          Typically, this involves running the new version (the "canary") alongside the old version in production. A load balancer, API gateway, or service mesh directs a small percentage of traffic (e.g., 1-5%) to the canary instances. The operations team then monitors key metrics – error rates, latency, resource usage, business KPIs – from the canary. If the metrics look good after a period, traffic is gradually shifted to the new version until 100% of users are on it. If metrics are bad, traffic is immediately routed back to the old version, and the canary is rolled back.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
           <Percent className="w-4 h-4" /> Gradual traffic shift is key.
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database className="w-6 h-6" /> The Challenge: Data Structure Changes
        </h2>
        <p>
          While rolling out code changes gradually is handled by traffic splitting, what happens when your deployment includes changes to <strong>data structures</strong>? This is especially common in APIs or services that exchange data using formats like JSON.
        </p>
        <p>
          Imagine you're updating an API endpoint that returns user data. The old version might return:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Old JSON Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": "user123",
  "name": "Alice",
  "email": "alice@example.com"
}`}
            </pre>
          </div>
        </div>
        <p>
          Your new version adds a &#x60;phone&#x60; field and changes &#x60;email&#x60; to &#x60;contactEmail&#x60;:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">New JSON Structure:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": "user123",
  "name": "Alice",
  "contactEmail": "alice@example.com",
  "phone": "123-456-7890"
}`}
            </pre>
          </div>
        </div>
        <p>
          During a canary deployment, both the old and new versions of your service are running simultaneously. Clients (frontend apps, mobile apps, other services) might receive responses from *either* version.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>An <strong>old client</strong> (expecting the old JSON) might receive the <strong>new JSON</strong>.</li>
          <li>A <strong>new client</strong> (possibly also in a canary rollout, or a frontend coupled to the new backend) might receive the <strong>old JSON</strong>.</li>
        </ul>
        <p>
          If the old client cannot handle the new JSON structure (e.g., due to strict parsing, expecting &#x60;email&#x60; but getting &#x60;contactEmail&#x60;, or choking on unexpected fields), it will break. Similarly, if the new client relies on &#x60;contactEmail&#x60; or &#x60;phone&#x60; and receives the old JSON, it will also break.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <Settings2 className="w-6 h-6" /> Introducing Progressive JSON Updates
        </h2>
        <p>
          To address this, we need a strategy to make JSON data structure changes compatible across versions running concurrently during a progressive rollout. This is where the concept of <strong>Progressive JSON Updates</strong> comes in. It involves designing your API responses and the code that handles them so that both older and newer versions of your application code can gracefully process the JSON data being served by any concurrently running service version.
        </p>
        <p>
          The goal is to ensure that during the transition period of a canary or phased rollout, clients receive data they can work with, regardless of which service version served it.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CheckCheck className="w-5 h-5 text-green-600" /> Strategy 1: Optional Fields & Backwards Compatibility
        </h3>
        <p>
          The simplest approach is to make new fields optional and ensure older versions of your code gracefully ignore them. New versions of your code must be written to handle the *absence* of new fields if they receive data from an older service instance.
        </p>
        <p>
          <strong>Adding Fields:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>New service returns JSON with the new field.</li>
          <li>Old client code receives this, ignores the new field (most JSON parsers are forgiving and allow extra fields).</li>
          <li>New service code receives old JSON (missing the new field). It must check for the field's existence and handle the case where it's missing.</li>
        </ul>
        <p>
          Conceptual New Service Code (handling old JSON):
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`interface UserDataV1 {
  id: string;
  name: string;
  email: string; // Old field name
}

interface UserDataV2 {
  id: string;
  name: string;
  contactEmail: string; // New field name
  phone?: string;      // New, optional field
}

// Function in the New Service Code that processes user data
function processUserData(data: UserDataV1 | UserDataV2): void {
  const userId = data.id;
  const userName = data.name;

  // Handle potentially missing or renamed fields
  let userEmail: string;
  if ((data as UserDataV2).contactEmail !== undefined) {
    // Received V2 data
    userEmail = (data as UserDataV2).contactEmail;
    const userPhone = (data as UserDataV2).phone; // Will be undefined for V1 data
    console.log(\`Processing V2 data for \${userName}: Email=\${userEmail}, Phone=\${userPhone ?? 'N/A'}\`);
  } else if ((data as UserDataV1).email !== undefined) {
    // Received V1 data
    userEmail = (data as UserDataV1).email;
    console.log(\`Processing V1 data for \${userName}: Email=\${userEmail}\`);
  } else {
     throw new Error("Unknown data format");
  }

  // ... rest of processing logic ...
}

// Example usage:
// const oldData = { id: "user1", name: "Bob", email: "bob@example.com" };
// const newData = { id: "user2", name: "Charlie", contactEmail: "charlie@example.com", phone: "987-654-3210" };
// processUserData(oldData); // New code handles old data
// processUserData(newData); // New code handles new data
`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Renaming/Removing Fields:</strong> This is harder.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Renaming (&#x60;email&#x60; to &#x60;contactEmail&#x60;):</strong> The new service should ideally return *both* fields for a transition period, with the new one being the primary source of truth. Old clients use &#x60;email&#x60;, new clients use &#x60;contactEmail&#x60;. Eventually, after the old service version is fully decommissioned and all clients are updated, the old field can be removed.
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h3 className="text-lg font-medium mb-2">JSON during Renaming Transition:</h3>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre>
                  {`{
  "id": "user123",
  "name": "Alice",
  "email": "alice@example.com",      // Old field (kept for compatibility)
  "contactEmail": "alice@example.com", // New field
  "phone": "123-456-7890"
}`}
                </pre>
              </div>
            </div>
          </li>
          <li><strong>Removing Fields:</strong> A field cannot be abruptly removed if old clients still expect it. This usually requires a phased approach where the field is first deprecated (marked as optional, clients warned), then removed only after all consumers are confirmed to no longer use it.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-600" /> Strategy 2: Transformation Layer
        </h3>
        <p>
          A more robust, but complex, approach is to introduce a layer that transforms the JSON response based on the client or the service version it originated from. This layer could be:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>An API Gateway or Proxy that inspects headers (e.g., &#x60;Accept&#x60; header specifying a version, or a custom canary header) and rewrites the JSON structure on the fly.</li>
          <li>Logic within the service itself that detects the client's expected version (e.g., via a query parameter or header) and formats the JSON accordingly.</li>
        </ul>
        <p>
          This allows the backend service to primarily work with its internal, newer data model while presenting an older model to clients who need it.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Conceptual Transformation Logic (within Gateway or Service):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume 'internalData' is the latest version (UserDataV2)
const internalData = {
  id: "user123",
  name: "Alice",
  contactEmail: "alice@example.com",
  phone: "123-456-7890"
};

// Assume 'clientExpectsVersion' is determined from request (e.g., header)
const clientExpectsVersion = req.headers['x-api-version'] || 'v2'; // Default to latest

let responseData;
if (clientExpectsVersion === 'v1') {
  // Transform V2 data to V1 format
  responseData = {
    id: internalData.id,
    name: internalData.name,
    email: internalData.contactEmail // Map new field back to old name
    // 'phone' field is omitted for V1 clients
  };
} else {
  // Client expects V2 or higher, return latest format
  responseData = internalData;
}

// Send responseData
// res.json(responseData);
`}
            </pre>
          </div>
        </div>
        <p>
          This strategy requires careful versioning and maintenance of transformation logic, but provides greater control over the data contract presented to different clients during migration.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Combining Canaries and Progressive JSON
        </h2>
        <p>
          When you combine canary deployments with progressive JSON update strategies, you significantly de-risk rollouts involving schema changes.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>The <strong>canary deployment</strong> handles the gradual rollout of the new <strong>code</strong>.</li>
          <li>The <strong>progressive JSON strategy</strong> handles the compatibility of the <strong>data</strong> format across concurrent code versions.</li>
        </ul>
        <p>
          During the canary phase, a small percentage of users interact with the new code, which is designed to handle both old and new data formats. If data compatibility issues arise (e.g., a bug in the new code when processing old data, or an old client failing unexpectedly when receiving new data due to strictness), they only affect the small canary group and can be detected via monitoring. You can then roll back the code canary and address the data compatibility issue.
        </p>
        <p>
          As the canary traffic percentage increases, you gain more confidence that the data compatibility strategy holds up under real-world load and diverse client types.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <TriangleAlert className="w-6 h-6 text-yellow-600" /> Challenges
        </h2>
         <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Complexity:</strong> Implementing robust backwards and forwards compatibility in your data handling code adds complexity. Every field change needs careful consideration.</li>
          <li><strong>Testing:</strong> You must rigorously test that both old and new code versions can handle both old and new data formats.</li>
          <li><strong>Maintainability:</strong> Transformation logic or conditional data handling can become cumbersome over time, especially with many versions or frequent schema changes.</li>
          <li><strong>Removing Data:</strong> Safely removing fields requires multi-step processes, often spanning multiple deployments and monitoring cycles.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Canary deployments are essential for reducing the risk of code rollouts. However, for systems dealing with structured data like JSON APIs, code rollouts are often coupled with data structure evolution. Progressive JSON updates provide the necessary data compatibility layer that allows different versions of your application to coexist and safely handle varying data formats during the transition period of a canary deployment. By carefully designing your data structures for compatibility and implementing robust handling in your code, you can achieve smoother, safer deployments even as your data model evolves.
        </p>
      </div>
    </>
  );
}