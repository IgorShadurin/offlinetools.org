export default function UuidGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About UUID Generator</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tool Capabilities</h3>
        <p>
          The UUID Generator creates universally unique identifiers following the RFC4122 standard. 
          UUIDs are 128-bit identifiers that are guaranteed to be unique across space and time, 
          making them ideal for distributed systems where unique identification is critical.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Generate UUIDs in multiple versions (v1, v4, v5, v6, v7)</li>
          <li>Create namespace-based UUIDs with custom inputs</li>
          <li>Format UUIDs with or without hyphens</li>
          <li>Convert UUIDs to uppercase or lowercase</li>
          <li>Generate multiple UUIDs at once</li>
          <li>Validate existing UUIDs</li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Database Primary Keys</strong>
            <p>UUIDs are commonly used as primary keys in databases, especially in distributed systems where multiple servers might be generating IDs simultaneously.</p>
          </li>
          <li>
            <strong>Distributed Systems</strong>
            <p>In microservices architectures, UUIDs help track requests and entities across multiple services without coordination.</p>
          </li>
          <li>
            <strong>Content Addressing</strong>
            <p>UUIDs can be used to uniquely identify content or resources in content management systems and file storage.</p>
          </li>
          <li>
            <strong>Session Identifiers</strong>
            <p>Web applications use UUIDs to create unique session IDs that are extremely unlikely to collide.</p>
          </li>
          <li>
            <strong>Device Identification</strong>
            <p>Hardware devices can be assigned UUIDs during manufacturing to ensure each device has a globally unique identifier.</p>
          </li>
          <li>
            <strong>Temporary File Names</strong>
            <p>When creating temporary files, UUIDs ensure no filename collisions occur even in high-concurrency environments.</p>
          </li>
          <li>
            <strong>URL-Safe Identifiers</strong>
            <p>UUIDs can be used in URLs to identify resources without revealing sequential information or patterns.</p>
          </li>
        </ol>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>
          This tool implements all standard UUID versions defined in RFC9562:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Version 1 (Timestamp)</strong>: Uses the current timestamp and MAC address to generate a UUID. 
            Provides chronological ordering but may expose system information.
          </li>
          <li>
            <strong>Version 4 (Random)</strong>: Uses random numbers to generate a UUID. 
            Most commonly used version due to its simplicity and privacy.
          </li>
          <li>
            <strong>Version 5 (Namespace)</strong>: Generates a UUID based on a namespace and name using SHA-1 hashing. 
            Useful for creating consistent UUIDs from the same input.
          </li>
          <li>
            <strong>Version 6 (Reordered Timestamp)</strong>: Similar to v1 but with improved timestamp ordering.
          </li>
          <li>
            <strong>Version 7 (Unix Epoch Time)</strong>: Uses Unix timestamp for better time-based sorting.
          </li>
        </ul>
        <p>
          The tool also supports special UUIDs:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>NIL UUID</strong>: All zeros (00000000-0000-0000-0000-000000000000)
          </li>
          <li>
            <strong>MAX UUID</strong>: All ones (ffffffff-ffff-ffff-ffff-ffffffffffff)
          </li>
        </ul>
        <p>
          The implementation uses the official uuid npm package, which provides high-quality, standards-compliant UUID generation.
        </p>
      </div>
    </div>
  );
}
