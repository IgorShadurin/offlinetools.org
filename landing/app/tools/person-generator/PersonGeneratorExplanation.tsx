"use client";

import React from "react";

export default function PersonGeneratorExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About Person Generator</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            The Person Generator creates realistic but fake personal data for testing and demonstration purposes. Customize which fields to include, choose the output format, and generate multiple entries at once.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Select from common fields like name, email, phone, and address</li>
            <li>Generate up to 1000 persons at a time</li>
            <li>Output in JSON, XML, YAML, HTML, or plain text</li>
            <li>Save the generated data to a file for offline use</li>
            <li>Remembers your selected fields using local storage</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Database Seeding</strong><p>Populate test databases with realistic person records.</p></li>
            <li><strong>Frontend Prototyping</strong><p>Display user lists and profiles during UI development.</p></li>
            <li><strong>API Testing</strong><p>Return realistic mock data from development APIs.</p></li>
            <li><strong>Education</strong><p>Demonstrate data handling techniques without using real personal data.</p></li>
            <li><strong>Data Processing Demos</strong><p>Showcase import/export features in applications.</p></li>
          </ol>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            Data is generated locally in the browser using simple randomization algorithms, so no real personal information is ever used or transmitted. All features work entirely offline after the initial page load.
          </p>
        </div>
      </div>
    </div>
  );
}
