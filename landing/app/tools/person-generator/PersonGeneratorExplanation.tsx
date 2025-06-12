export default function PersonGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About Person Generator</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tool Capabilities</h3>
        <p>
          The Person Generator creates realistic yet fake personal data for testing and demo purposes.
          Choose the amount of persons, select which fields to include and export the result in various formats.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Generate names, contact details and addresses</li>
          <li>Select fields and output format</li>
          <li>Customize your own template</li>
          <li>Download generated data as a file</li>
          <li>Remember preferred settings locally</li>
        </ul>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>UI Mockups:</strong> Populate interfaces with sample user profiles.</li>
          <li><strong>Testing:</strong> Generate test data for forms or APIs without exposing real information.</li>
          <li><strong>Education:</strong> Provide example datasets for teaching programming or data analysis.</li>
          <li><strong>Database Seeding:</strong> Quickly seed development databases with random persons.</li>
          <li><strong>Privacy Friendly Demos:</strong> Share screenshots or demos without using real user data.</li>
        </ol>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>
          Person data is generated using the <code>@faker-js/faker</code> library. The tool runs entirely in your browser,
          ensuring no information is sent to any server. For custom templates, placeholders like
          <code>{'{'}{'{'} firstName {'}'}{'}'}</code> are replaced with generated values.
        </p>
        <p>Large datasets are handled efficiently by streaming the download when possible.</p>
      </div>
    </div>
  );
}
