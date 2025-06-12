"use client";

export default function PersonGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About Person Generator</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Create realistic person data for testing</li>
            <li>Select which fields to include</li>
            <li>Export data as JSON, XML, YAML, HTML, or plain text</li>
            <li>Design custom output using template variables</li>
            <li>Save generated data directly to a file</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Database seeding</strong><p>Fill development databases with sample user records.</p></li>
            <li><strong>UI mockups</strong><p>Populate designs with realistic names and contact details.</p></li>
            <li><strong>Testing exports</strong><p>Generate bulk data to test CSV or JSON import features.</p></li>
            <li><strong>Privacy protection</strong><p>Use fake data instead of real customer information.</p></li>
            <li><strong>Education</strong><p>Demonstrate data processing pipelines without sensitive data.</p></li>
          </ol>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            Person records are generated with the @faker-js/faker library and formatted
            using built-in conversion functions. Templates replace variables like
            <code>{`{{firstName}}`}</code> with generated values.
          </p>
        </div>
      </div>
    </div>
  );
}
