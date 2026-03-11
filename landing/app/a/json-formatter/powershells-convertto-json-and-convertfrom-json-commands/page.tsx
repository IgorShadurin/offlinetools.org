import type { Metadata } from "next";
import { ArrowRightLeft, FileJson, Code, Layers, List, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "PowerShell ConvertTo-Json and ConvertFrom-Json Guide | Offline Tools",
  description:
    "Current guide to PowerShell JSON cmdlets with practical examples for files, APIs, -Depth, -AsHashtable, -NoEnumerate, and PowerShell 7.5 date parsing.",
};

export default function PowershellJsonCommandsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <ArrowRightLeft className="w-8 h-8 text-blue-600" />
        <span>PowerShell&apos;s ConvertTo-Json and ConvertFrom-Json Commands</span>
      </h1>

      <div className="space-y-6">
        <p>
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> turns PowerShell objects
          into JSON text. <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> does the
          reverse and turns JSON text into PowerShell objects you can query and update. If you work with REST APIs,
          configuration files, or command output that needs to cross tool boundaries, these are the two JSON cmdlets you
          use constantly.
        </p>

        <p>
          The most common mistakes are also the simplest ones: forgetting that{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> defaults to{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Depth 2</code>, and reading a JSON file with{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content</code> but not using{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Raw</code>. Fix those two issues and most
          day-to-day PowerShell JSON problems disappear.
        </p>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg dark:bg-blue-950/30 dark:border-blue-900">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <List className="w-5 h-5 text-blue-600" />
            <span>Quick Mental Model</span>
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> before sending data
              to an API or saving structured output to a file.
            </li>
            <li>
              Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> after reading JSON
              from a file, an API response, or a string variable.
            </li>
            <li>
              For files, the safest pattern is{" "}
              <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">
                Get-Content -Raw path.json | ConvertFrom-Json
              </code>
              .
            </li>
            <li>
              For nested objects, explicitly set{" "}
              <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json -Depth</code> high enough for
              your real object graph.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6 text-green-600" />
          <span>ConvertTo-Json: Sending PowerShell Data Out</span>
        </h2>
        <p>
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json</code> serializes the data portion
          of PowerShell objects into JSON text. It is ideal for REST request bodies, logs, exports, and config files.
          It is not a perfect round-trip serializer for every .NET type, so treat it as a data export step rather than
          a way to preserve methods or full runtime behavior.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Build an API Request Body</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$body = [PSCustomObject]@{
    action = "deploy"
    environment = "prod"
    items = @(
        [PSCustomObject]@{
            sku = "A-100"
            quantity = 2
        }
    )
}

$json = $body | ConvertTo-Json -Depth 4 -Compress
$json`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{"action":"deploy","environment":"prod","items":[{"sku":"A-100","quantity":2}]}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          The Parameter That Matters Most: <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Depth</code>
        </h3>
        <p>
          The default serialization depth is 2. That is fine for flat objects, but it is too shallow for most real
          payloads. If your JSON suddenly shows truncated nested objects, raise the depth deliberately instead of
          guessing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$deployment = [PSCustomObject]@{
    name = "frontend"
    metadata = [PSCustomObject]@{
        region = "us-east-1"
        owner = [PSCustomObject]@{
            team = "web"
            onCall = "ops@example.com"
        }
    }
}

$deployment | ConvertTo-Json
$deployment | ConvertTo-Json -Depth 5`}
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <AlertTriangle className="inline-block mr-1 w-4 h-4" />
            If you see warnings or incomplete nested output, the depth is too low. Raise it to the minimum value that
            matches your real structure.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Other Useful ConvertTo-Json Switches</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Compress</code> removes whitespace. Use it for
            logs, API bodies, and places where readability is not important.
          </li>
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-AsArray</code> wraps even a single object in a
            JSON array, which is useful when an API schema always expects an array.
          </li>
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-EnumsAsStrings</code> serializes enum names
            instead of numeric values, which is often easier to read and safer for external integrations.
          </li>
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-EscapeHandling</code> lets you control whether
            HTML-sensitive or non-ASCII characters are escaped.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Force an Array for a Single Item</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`[PSCustomObject]@{
    name = "Alice"
    role = "admin"
} | ConvertTo-Json -AsArray`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`[
  {
    "name": "Alice",
    "role": "admin"
  }
]`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson className="w-6 h-6 text-purple-600" />
          <span>ConvertFrom-Json: Reading JSON Back Into PowerShell</span>
        </h2>
        <p>
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code> turns JSON text into a{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">PSCustomObject</code>, an array, or a hashtable
          depending on how you call it. This is what you use when you want dot notation, filtering, updates, and normal
          PowerShell object handling on top of JSON data.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Read a JSON File Reliably</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$config = Get-Content -Path .\\config.json -Raw | ConvertFrom-Json

$config.database.server
$config.features.betaMode`}
          </pre>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            <AlertTriangle className="inline-block mr-1 w-4 h-4" />
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content</code> without{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Raw</code> returns an array of lines, not one
            JSON string. <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-Raw</code> is the safer default
            for JSON files.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          When To Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-AsHashtable</code>
        </h3>
        <p>
          Use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-AsHashtable</code> when dot notation is less
          important than preserving key behavior. This is especially helpful when JSON keys differ only by case, or when
          the JSON contains keys that are awkward for a <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">
            PSCustomObject
          </code>
          . In PowerShell 7.3 and later, the result is an ordered hashtable, so key order is preserved.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$json = '{
    "key": "lowercase value",
    "Key": "uppercase value",
    "": "blank key"
}'

$data = $json | ConvertFrom-Json -AsHashtable
$data`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          Preserve Single-Item Arrays with <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-NoEnumerate</code>
        </h3>
        <p>
          A JSON array with one item can quietly become a scalar when it flows through the pipeline. If you need to keep
          it as an array for a later round trip, use{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-NoEnumerate</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`'[1]' | ConvertFrom-Json | ConvertTo-Json -Compress
'[1]' | ConvertFrom-Json -NoEnumerate | ConvertTo-Json -Compress`}
          </pre>
          <h4 className="text-lg font-medium mb-2 mt-4">Output</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`1
[1]`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          PowerShell 7.5: Control Date Parsing with{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-DateKind</code>
        </h3>
        <p>
          PowerShell 7.5 adds <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-DateKind</code> to{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code>. That matters if your JSON
          contains timestamps and you need predictable conversion behavior. Use it when the default date parsing is not
          explicit enough for your script.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Default</code> uses the cmdlet&apos;s normal date
            parsing behavior.
          </li>
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Utc</code> or{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Local</code> is useful when you want an explicit
            timezone interpretation.
          </li>
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Offset</code> is helpful when preserving offset
            information matters.
          </li>
          <li>
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">String</code> keeps the original timestamp text
            instead of converting it to a date object.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$event = '{"generatedAt":"2026-03-10T18:45:00Z"}' |
    ConvertFrom-Json -DateKind Utc

$event.generatedAt
$event.generatedAt.GetType().FullName`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Layers className="w-6 h-6 text-orange-600" />
          <span>Common Pitfalls and Practical Fixes</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Nested JSON is incomplete:</strong> Increase{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json -Depth</code>.
          </li>
          <li>
            <strong>Reading from a file behaves strangely:</strong> Prefer{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content -Raw</code> so you pass one JSON
            string into <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertFrom-Json</code>.
          </li>
          <li>
            <strong>Keys collide or object access is awkward:</strong> Use{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-AsHashtable</code>.
          </li>
          <li>
            <strong>A one-element array comes back as a scalar:</strong> Use{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-NoEnumerate</code> on import.
          </li>
          <li>
            <strong>Round-tripping is not identical:</strong> JSON preserves data, not PowerShell methods, script
            properties, or every original .NET type detail.
          </li>
          <li>
            <strong>Malformed JSON throws immediately:</strong> Wrap external input in{" "}
            <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">try/catch</code> and validate it before
            depending on it.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">A Good Workflow with a JSON Formatter</h2>
        <p>
          PowerShell is excellent at generating and consuming JSON, but it is not the best place to visually inspect a
          large payload. A useful workflow is to produce the JSON in PowerShell, then paste it into an offline JSON
          formatter to pretty-print it, validate the structure, and inspect deeply nested sections before sending it to
          another system.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Update a Config File and Write It Back</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`$config = Get-Content -Path .\\appsettings.json -Raw | ConvertFrom-Json
$config.logging.level = "Warning"

$config |
    ConvertTo-Json -Depth 10 |
    Set-Content -Path .\\appsettings.json`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Summary</h2>
        <p>
          For most PowerShell JSON work, remember four rules: import files with{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Get-Content -Raw</code>, increase{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">ConvertTo-Json -Depth</code> for nested objects,
          use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-AsHashtable</code> when key behavior matters,
          and use <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-NoEnumerate</code> when array shape must
          survive a round trip. On PowerShell 7.5, add{" "}
          <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">-DateKind</code> when timestamp parsing needs to
          be explicit instead of implicit.
        </p>
      </div>
    </>
  );
}
