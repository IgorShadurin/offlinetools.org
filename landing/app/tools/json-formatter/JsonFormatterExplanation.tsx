"use client"

import React from "react"

/**
 * Renders an explanation card for the JSON Formatter tool, detailing its capabilities,
 * common use cases, and technical implementation notes.
 */
export default function JsonFormatterExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-4">About JSON Formatter</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Tool Capabilities</h3>
          <p className="mb-2">
            This JSON Formatter takes raw JSON data and transforms it into a well-structured, human-readable format. It helps in debugging, understanding, and sharing JSON data by applying consistent indentation and syntax highlighting.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Formats minified or poorly structured JSON into readable code</li>
            <li>Validates JSON syntax and reports errors with line numbers</li>
            <li>Allows customization of indentation (spaces or tabs)</li>
            <li>Handles large JSON files efficiently</li>
            <li>Provides syntax highlighting for better readability</li>
            <li>Offers options for sorting object keys alphabetically</li>
            <li>Can remove null values or empty objects/arrays (Future enhancement)</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Debugging API Responses</strong>
              <p>Format complex JSON responses from APIs to easily inspect the structure and data.</p>
            </li>
            
            <li>
              <strong>Validating Configuration Files</strong>
              <p>Ensure JSON configuration files (like <code>package.json</code> or <code>.eslintrc.json</code>) are correctly structured and readable before use.</p>
            </li>
            
            <li>
              <strong>Data Analysis Prep</strong>
              <p>Clean up and format JSON datasets before importing them into analysis tools or databases.</p>
            </li>
            
            <li>
              <strong>Learning JSON Structure</strong>
              <p>Visualize the hierarchy and nesting of JSON objects and arrays for educational purposes or teaching.</p>
            </li>
            
            <li>
              <strong>Sharing Code Snippets</strong>
              <p>Format JSON examples clearly before sharing them in documentation, tutorials, or team communications.</p>
            </li>
            
            <li>
              <strong>Comparing JSON Structures</strong>
              <p>Standardize the formatting of two JSON objects before comparing them for differences using diff tools.</p>
            </li>
            
            <li>
              <strong>Prettifying for Documentation</strong>
              <p>Make JSON examples in technical documents or presentations easier to read and understand.</p>
            </li>
            
            <li>
              <strong>Minifying for Production</strong>
              <p>Remove whitespace to reduce the size of JSON data sent over networks, saving bandwidth.</p>
            </li>
            
            <li>
              <strong>Identifying Syntax Errors</strong>
              <p>Quickly pinpoint JSON syntax errors with helpful line number reporting from the parser.</p>
            </li>
            
            <li>
              <strong>Generating Test Data</strong>
              <p>Format manually created JSON structures to use as valid test inputs for applications.</p>
            </li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Technical Details</h3>
          <p>
            The formatter uses the built-in <code>JSON.parse()</code> to validate the input and <code>JSON.stringify()</code> with appropriate indentation options (spaces or tabs count) to format the output. Error handling pinpoints syntax issues, reporting the position where the parsing failed. The core logic resides in the shared library for potential reuse across different environments (e.g., web, desktop). It&apos;s designed to handle large inputs efficiently within browser memory limits.
          </p>
        </div>
      </div>
    </div>
  )
} 