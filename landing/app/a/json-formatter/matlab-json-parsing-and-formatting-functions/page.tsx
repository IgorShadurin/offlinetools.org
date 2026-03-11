import type { Metadata } from "next";
import { ArrowRightFromLine, ArrowRightToLine, Code, Info, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "MATLAB JSON Parsing and Formatting Functions: jsondecode, jsonencode, File I/O | Offline Tools",
  description:
    "Use MATLAB's jsondecode and jsonencode to parse JSON text, pretty-print output, and read or write JSON files with newer helpers like readstruct and writestruct.",
};

export default function MatlabJsonFunctionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">MATLAB JSON Parsing and Formatting Functions</h1>

      <div className="space-y-6">
        <p>
          If you need to work with JSON in MATLAB, the core functions are straightforward: use <code>jsondecode</code>{" "}
          to parse JSON text into MATLAB data, and use <code>jsonencode</code> to turn MATLAB variables back into JSON.
          For direct file-based workflows, newer MATLAB releases also add helpers such as <code>readstruct</code>,{" "}
          <code>writestruct</code>, and <code>readdictionary</code>. For most search visitors, the real questions are
          usually how to decode formatted JSON text, how nested arrays of objects behave, and how to write a valid JSON
          file without losing structure. This page focuses on those practical cases.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-2xl font-semibold flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-500" /> Quick Answer: Which MATLAB JSON Function Should You Use?
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              Use <code>jsondecode</code> when you already have JSON text in memory and want MATLAB structs, arrays, or
              cell arrays.
            </li>
            <li>
              Use <code>jsonencode</code> when you want to serialize MATLAB data to JSON text, including pretty-printed
              output for logs, debugging, or saved files.
            </li>
            <li>
              Use <code>fileread</code> plus <code>jsondecode</code> if you are reading a <code>.json</code> file in
              any release that supports the JSON functions.
            </li>
            <li>
              Use <code>readstruct</code> and <code>writestruct</code> in newer releases if you want MATLAB to read or
              write JSON files directly without manual <code>fopen</code>/<code>fprintf</code> code.
            </li>
            <li>
              Use <code>readdictionary</code> in R2024b or newer when preserving string keys matters more than mapping
              JSON objects into MATLAB struct field names.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightToLine className="w-6 h-6 mr-2 text-red-500" /> <code>jsondecode</code>: Parse JSON Text into
          MATLAB Data
        </h2>
        <p>
          <code>jsondecode</code> accepts JSON text as a character vector or string scalar and converts it into the
          nearest MATLAB representation. That makes it the right tool for API responses, config files loaded with{" "}
          <code>fileread</code>, and any situation where you already have raw JSON text.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Decode Nested JSON with Multiple Objects</h3>
        <p>
          A common MATLAB JSON question is how to handle an array of multiple child objects or nodes. If the objects in
          the JSON array have a compatible structure, MATLAB gives you a struct array that you can index naturally.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: <code>jsondecode</code> with Multiple Nodes</h4>
          <pre>
            <code className="language-matlab">{`
jsonText = ['{' ...
    '"project":"demo",' ...
    '"files":[' ...
        '{"name":"input.csv","rows":12,"active":true},' ...
        '{"name":"output.csv","rows":18,"active":false}' ...
    ']' ...
    '}'];

data = jsondecode(jsonText);

firstName = data.files(1).name
rowCounts = [data.files.rows]
activeFlags = [data.files.active]
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            In this example, <code>data</code> is a struct, and <code>data.files</code> is a struct array with two
            elements because each JSON object in <code>files</code> has the same fields.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Does <code>jsondecode</code> Work with Formatted JSON Text?</h3>
        <p>
          Yes. Pretty-printed JSON with spaces and line breaks is still valid JSON, so <code>jsondecode</code> can
          parse it directly. In practice, the reliable MATLAB pattern is to read the whole file with{" "}
          <code>fileread</code> and pass that text to <code>jsondecode</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Decode Formatted JSON Text</h4>
          <pre>
            <code className="language-matlab">{`
formattedText = sprintf(['{\\n' ...
    '  "user": "alice",\\n' ...
    '  "settings": {\\n' ...
    '    "theme": "light",\\n' ...
    '    "autosave": true\\n' ...
    '  }\\n' ...
    '}']);

config = jsondecode(formattedText);
mode = config.settings.theme

% When reading from disk:
config = jsondecode(fileread("config.json"));
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Use <code>fileread</code> rather than <code>fscanf(fid, &apos;%s&apos;)</code>. The latter reads
            whitespace-delimited text, which is a poor fit for multi-line JSON.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">How <code>jsondecode</code> Maps JSON to MATLAB</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>JSON objects decode to MATLAB structs.</li>
          <li>JSON arrays of numbers decode to MATLAB numeric arrays, typically <code>double</code>.</li>
          <li>JSON arrays of booleans decode to MATLAB logical arrays.</li>
          <li>
            JSON arrays of compatible objects often decode to struct arrays; mixed or incompatible content can decode
            to cell arrays instead.
          </li>
          <li>JSON strings decode to MATLAB character vectors.</li>
          <li>
            JSON <code>null</code> becomes <code>NaN</code> inside numeric arrays, but becomes an empty array in
            nonnumeric positions.
          </li>
          <li>
            JSON object keys that are not valid MATLAB identifiers may be adjusted when converted into struct field
            names.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightFromLine className="w-6 h-6 mr-2 text-green-500" /> <code>jsonencode</code>: Convert MATLAB Data
          to JSON
        </h2>
        <p>
          <code>jsonencode</code> converts MATLAB values into JSON text. It is the function behind most MATLAB JSON
          formatting tasks, whether you need compact output for transport or pretty-printed output for a readable JSON
          file.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example: Encode a MATLAB Struct as JSON</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Basic <code>jsonencode</code> Example</h4>
          <pre>
            <code className="language-matlab">{`
person = struct( ...
    "name", "Alice", ...
    "age", 30, ...
    "isStudent", false, ...
    "scores", [91 88 95]);

compactJson = jsonencode(person)
prettyJson = jsonencode(person, PrettyPrint=true)
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            In releases before R2021a, use quoted name-value syntax instead:{" "}
            <code>jsonencode(person, &apos;PrettyPrint&apos;, true)</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Special Values: <code>NaN</code> and <code>Inf</code></h3>
        <p>
          By default, <code>jsonencode</code> converts <code>NaN</code>, <code>Inf</code>, and <code>-Inf</code> to{" "}
          <code>null</code> because strict JSON has no native representation for those numeric values. If you are
          targeting a consumer that accepts nonstandard tokens, MATLAB also supports a compatibility mode.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Control How Nonfinite Numbers Are Encoded</h4>
          <pre>
            <code className="language-matlab">{`
values = struct("ok", 5, "missing", NaN, "upper", Inf);

strictJson = jsonencode(values)
compatJson = jsonencode(values, ConvertInfAndNaN=false)
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <code>strictJson</code> is valid JSON. <code>compatJson</code> may emit tokens such as{" "}
            <code>NaN</code> or <code>Infinity</code>, which many parsers reject.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Write MATLAB Data to a JSON File</h3>
        <p>
          If your goal is simply &quot;write to JSON file in MATLAB,&quot; the portable approach is still to encode the
          data first and then write the returned text to disk.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Encode and Save JSON</h4>
          <pre>
            <code className="language-matlab">{`
settings = struct( ...
    "mode", "auto", ...
    "threshold", 0.75, ...
    "enabled", true);

jsonText = jsonencode(settings, PrettyPrint=true);

fid = fopen("settings.json", "w");
fprintf(fid, "%s", jsonText);
fclose(fid);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            If you need to read that file back later, use <code>settings = jsondecode(fileread(&quot;settings.json&quot;));</code>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-500" /> File-Based Helpers in Newer MATLAB Releases
        </h2>
        <p>
          MATLAB has added higher-level JSON file APIs beyond <code>jsonencode</code> and <code>jsondecode</code>.
          These are worth knowing because many users search for a MATLAB JSON reader or a direct JSON file writer, not
          just text conversion.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>readstruct</code> can read JSON files directly into a struct. MathWorks added JSON support for it in
            R2023b.
          </li>
          <li>
            <code>writestruct</code> can write structs to JSON files directly in R2023b and newer.
          </li>
          <li>
            <code>readdictionary</code> was added in R2024b and is useful when you want JSON object keys to stay as
            keys instead of becoming MATLAB struct field names.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Direct JSON File I/O in Newer Releases</h4>
          <pre>
            <code className="language-matlab">{`
% R2023b+
data = readstruct("payload.json");
writestruct(data, "payload-pretty.json", PrettyPrint=true);

% R2024b+
headers = readdictionary("headers.json");
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            One formatting detail that surprises people: <code>jsonencode(..., PrettyPrint=true)</code> uses two-space
            indentation, while <code>writestruct(..., PrettyPrint=true)</code> writes four-space indentation.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-yellow-500" /> Common Pitfalls and Troubleshooting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Invalid key names:</strong> JSON keys can contain characters MATLAB does not allow in struct field
            names. After <code>jsondecode</code>, inspect the resulting field names carefully or use{" "}
            <code>readdictionary</code> in R2024b or newer.
          </li>
          <li>
            <strong>Arrays of objects:</strong> If an array does not resolve cleanly to one struct layout, MATLAB may
            return a cell array instead of a struct array. Check with <code>class</code> and index accordingly.
          </li>
          <li>
            <strong>Formatted JSON from files:</strong> Prefer <code>fileread</code> for loading multi-line JSON text.
            It is simpler and more reliable than line-by-line or whitespace-delimited reads.
          </li>
          <li>
            <strong>Strict vs nonstandard JSON:</strong> <code>jsondecode</code> expects valid JSON syntax. Comments,
            trailing commas, and nonstandard numeric tokens are not safe inputs there.
          </li>
          <li>
            <strong>MATLAB object serialization:</strong> <code>jsonencode</code> encodes public object properties, but
            complex custom classes may still need a deliberate export struct for stable JSON output.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Version Notes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>jsonencode</code> and <code>jsondecode</code> were introduced in MATLAB R2016b.
          </li>
          <li>
            Modern name=value syntax such as <code>PrettyPrint=true</code> works in R2021a and newer.
          </li>
          <li>
            <code>readstruct</code> and <code>writestruct</code> gained JSON support in R2023b.
          </li>
          <li>
            <code>readdictionary</code> was introduced in R2024b.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For most MATLAB JSON work, the core recipe is simple: <code>jsondecode</code> to parse,{" "}
          <code>jsonencode</code> to format, <code>fileread</code> when the source is a JSON file, and newer file-based
          helpers when you want less boilerplate. Once you know how MATLAB maps arrays, objects, <code>null</code>, and
          nonfinite numbers, most JSON interoperability issues become predictable.
        </p>
      </div>
    </>
  );
}
