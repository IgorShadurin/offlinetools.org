import type { Metadata } from "next";
import { ArrowRightLeft, FileJson, Code, Layers, List, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "PowerShell's ConvertTo-Json and ConvertFrom-Json Commands | Offline Tools",
  description: "Learn how to use PowerShell's ConvertTo-Json and ConvertFrom-Json cmdlets for working with JSON data.",
};

export default function PowershellJsonCommandsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <ArrowRightLeft className="w-8 h-8 text-blue-600" />
        <span>PowerShell: ConvertTo-Json and ConvertFrom-Json</span>
      </h1>

      <div className="space-y-6">
        <p>
          PowerShell is a powerful automation and configuration management tool, and handling data in various formats is
          a common task. JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for
          humans to read and write and easy for machines to parse and generate. PowerShell provides built-in cmdlets,{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> and{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code>, to seamlessly work with
          JSON data. These cmdlets are essential for tasks like interacting with web APIs, processing configuration
          files, or exchanging data between systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-green-600" />
          <span>ConvertTo-Json: Exporting PowerShell Objects to JSON</span>
        </h2>
        <p>
          The <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> cmdlet converts a .NET
          object or a collection of objects into a JSON formatted string. This is incredibly useful when you have data
          in PowerShell (like variables, arrays, or output from other cmdlets) and need to send it as JSON, perhaps to a
          web service or save it to a file.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Usage</h3>
        <p>
          You can pipe a PowerShell object directly to{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Converting a Simple Object</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$myObject = [PSCustomObject]@{
    Name = "Alice"
    Age = 30
    IsStudent = $false
}

$myObject | ConvertTo-Json`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "Name": "Alice",
  "Age": 30,
  "IsStudent": false
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Converting Arrays/Collections</h3>
        <p>When you convert an array or a collection of objects, the cmdlet produces a JSON array.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Converting an Array of Objects</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$users = @(
    [PSCustomObject]@{ Name = "Alice"; Age = 30 },
    [PSCustomObject]@{ Name = "Bob"; Age = 25 }
)

$users | ConvertTo-Json`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`[
  {
    "Name": "Alice",
    "Age": 30
  },
  {
    "Name": "Bob",
    "Age": 25
  }
]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Handling Nested Objects with <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Depth</code>
        </h3>
        <p>
          By default, <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> converts objects
          to a default depth of 2. If your object has nested properties that are themselves objects or arrays, you might
          need to increase the depth using the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Depth</code>{" "}
          parameter.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Using -Depth</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$data = @{
    Site = "Example Website"
    Owner = @{
        Name = "Admin"
        Contact = @{
            Email = "admin@example.com"
            Phone = "555-1234"
        }
    }
    Categories = @("Web", "Tech", "JSON")
}

# Convert with default depth (2) - might truncate nested objects
"$data | ConvertTo-Json # Often truncates deeply nested structures"

# Convert with increased depth
"$data | ConvertTo-Json -Depth 5 # Adjust depth based on your object structure"`}
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <AlertTriangle className="inline-block mr-1 w-4 h-4" /> Without sufficient depth, nested objects or arrays
            might appear as empty or incomplete in the JSON output. A common value is 100 or more for complex
            structures.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Formatting: Compressed vs. Expanded (Default)</h3>
        <p>
          By default, <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> outputs
          human-readable JSON with indentation and line breaks. The{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Compress</code> parameter removes whitespace,
          resulting in a single-line JSON string, which is useful for saving space or transmitting data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Using -Compress</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$myObject = @{ ID = 1; Status = "Active" }

# Default (Expanded)
"$myObject | ConvertTo-Json"

# Compressed
"$myObject | ConvertTo-Json -Compress"`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output (Compressed):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">{`{"ID":1,"Status":"Active"}`}</pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Handling Properties with <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Force</code>
        </h3>
        <p>
          Sometimes, objects might have properties that aren't typically enumerated or are hidden. The{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Force</code> parameter can help include such
          properties in the JSON output.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Using -Force (Conceptual)</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`# Some objects might have hidden properties
# Get-Process | Select-Object -First 1 | ConvertTo-Json # Might miss some properties
# Get-Process | Select-Object -First 1 | ConvertTo-Json -Force # Might include more

# Use Select-Object explicitly for clarity and control over properties
Get-ChildItem -Path $PSScriptRoot | Select-Object Name, Mode, Length | ConvertTo-Json`}
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <AlertTriangle className="inline-block mr-1 w-4 h-4" /> For predictable JSON output, it's often better to
            explicitly select the properties you want using{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Select-Object</code> before converting to JSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson className="w-6 h-6 text-purple-600" />
          <span>ConvertFrom-Json: Importing JSON into PowerShell Objects</span>
        </h2>
        <p>
          The <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> cmdlet converts a JSON
          formatted string into a PowerShell object. This object is typically a{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">PSCustomObject</code> or an array of{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">PSCustomObject</code>s, making it easy to access
          the data using dot notation or array indexing, just like any other PowerShell object.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Usage from a String</h3>
        <p>You can provide a JSON string as input, either directly or via a variable.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Converting a JSON String to Object</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$jsonString = '{
    "FirstName": "Jane",
    "LastName": "Doe",
    "Age": 28,
    "IsEmployee": true
}'

$powerShellObject = $jsonString | ConvertFrom-Json

# Accessing properties
"$powerShellObject.FirstName"
"$powerShellObject.Age"`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`Jane
28`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Converting JSON Arrays</h3>
        <p>
          If the JSON string represents a JSON array,{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> returns an array of
          objects.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Converting a JSON Array String</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$jsonArrayString = '[
    {"Name": "Apple", "Color": "Red"},
    {"Name": "Banana", "Color": "Yellow"}
]'

$powerShellArray = $jsonArrayString | ConvertFrom-Json

# Accessing elements and properties
"$powerShellArray[0].Name"
"$powerShellArray[1].Color"
"$powerShellArray | ForEach-Object { Write-Host "Fruit: $($_.Name), Color: $($_.Color)" }"`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`Apple
Yellow
Fruit: Apple, Color: Red
Fruit: Banana, Color: Yellow`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Reading JSON from Files</h3>
        <p>
          A common scenario is reading JSON data from a file. You can use{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content</code> to read the file's content and
          pipe it to <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Converting JSON from a File</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`# Assume you have a file named 'config.json' with JSON content
# For example: {"Database": "MyDB", "Server": "SQL01"}

"Get-Content -Path config.json | ConvertFrom-Json

# Or for newer PowerShell versions (less common but possible):
# ConvertFrom-Json -Path config.json # -Path parameter is less common/standard compared to piping Get-Content"`}
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <AlertTriangle className="inline-block mr-1 w-4 h-4" /> Ensure the file is encoded correctly (typically
            UTF-8) when reading it with <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content</code>.
            Use the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Encoding</code> parameter if needed.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Handling Malformed JSON</h3>
        <p>
          If the input string is not valid JSON,{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> will throw an error. You
          should include error handling (e.g., using{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">try/catch</code>) if you are dealing with JSON from
          external or potentially unreliable sources.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Layers className="w-6 h-6 text-orange-600" />
          <span>Key Differences and Considerations</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Input/Output:</strong>{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> takes PowerShell objects
            and outputs a JSON <em>string</em>.{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> takes a JSON{" "}
            <em>string</em> (or string array) and outputs PowerShell objects.
          </li>
          <li>
            <strong>Depth:</strong> Remember the default{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Depth 2</code> for{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code>. This is a frequent source
            of truncated output for complex objects.
          </li>
          <li>
            <strong>Object Types:</strong>{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> creates{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">PSCustomObject</code>s, which are very flexible.
          </li>
          <li>
            <strong>Performance:</strong> For very large JSON files or strings, these cmdlets are generally efficient,
            but be mindful of memory usage when dealing with massive datasets.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <List className="w-6 h-6 text-teal-600" />
          <span>Common Use Cases</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>API Interactions:</strong>
            <ul className="list-circle pl-4 mt-1 space-y-1">
              <li>
                Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> to format the
                request body for <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Invoke-RestMethod</code> or{" "}
                <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Invoke-WebRequest</code>.
              </li>
              <li>
                Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> to parse the JSON
                response received from an API call into usable PowerShell objects.
              </li>
            </ul>
          </li>
          <li>
            <strong>Configuration Files:</strong>
            <ul className="list-circle pl-4 mt-1 space-y-1">
              <li>Store application or script configurations in JSON files.</li>
              <li>
                Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content | ConvertFrom-Json</code> to
                load configurations.
              </li>
              <li>
                Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json | Set-Content</code> to
                save configurations.
              </li>
            </ul>
          </li>
          <li>
            <strong>Data Exchange:</strong>
            <ul className="list-circle pl-4 mt-1 space-y-1">
              <li>
                Export data from PowerShell into a JSON file for use by other applications (e.g., web frontends, other
                scripting languages).
              </li>
              <li>
                Import data from JSON files generated by other systems into PowerShell for processing or reporting.
              </li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Summary</h2>
        <p>
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> and{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> are indispensable cmdlets
          for anyone working with JSON in PowerShell. They provide a straightforward way to translate data between
          PowerShell's object-oriented structure and the text-based JSON format, enabling integration with a wide range
          of tools and services that utilize JSON. Mastering these two commands opens up many possibilities for
          automation and data processing in your scripts.
        </p>
      </div>
    </>
  );
}
