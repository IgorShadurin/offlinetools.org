import type { Metadata } from "next";
import { ArrowRightFromLine, ArrowRightToLine, Code, Info, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "MATLAB JSON Parsing and Formatting Functions | Offline Tools",
  description:
    "Learn how to use MATLAB's built-in functions, jsonencode and jsondecode, for parsing and formatting JSON data.",
};

export default function MatlabJsonFunctionsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">MATLAB JSON Parsing and Formatting Functions</h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and in many
          modern applications. Whether you&apos;re working with REST APIs, configuration files, or saving complex data
          structures, dealing with JSON is a common task. Fortunately, MATLAB provides powerful, built-in functions to
          seamlessly convert between MATLAB data types and JSON strings: <code>jsonencode</code> and{" "}
          <code>jsondecode</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Info className="w-6 h-6 mr-2 text-blue-500" /> Why JSON in MATLAB?
        </h2>
        <p>
          MATLAB is widely used for data analysis, simulation, and algorithm development. Interacting with external
          systems, web services, or saving/loading data in a human-readable, portable format often requires JSON.
          MATLAB&apos;s built-in functions make this process straightforward, eliminating the need for external
          libraries or manual parsing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightFromLine className="w-6 h-6 mr-2 text-green-500" /> <code>jsonencode</code>: Encoding MATLAB Data
          to JSON
        </h2>
        <p>
          The <code>jsonencode</code> function converts a MATLAB data structure (like a scalar, array, cell array, or
          struct) into a JSON-formatted string.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Usage</h3>
        <p>The simplest use is converting a scalar or a struct:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Encoding a Struct</h4>
          <pre>
            <code className="language-matlab">{`
% Create a simple MATLAB struct
person.name = 'Alice';
person.age = 30;
person.isStudent = false;

% Encode the struct to a JSON string
jsonString = jsonencode(person);

% Display the resulting JSON string
disp(jsonString);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Expected Output: <code>{`{"name":"Alice","age":30,"isStudent":false}`}</code>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Handling Data Types</h3>
        <p>
          <code>jsonencode</code> automatically handles various MATLAB data types and maps them to their corresponding
          JSON types:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Numeric arrays (double, single, int, etc.) become JSON arrays of numbers.</li>
          <li>Character arrays (strings) become JSON strings.</li>
          <li>
            Logical scalars (<code>true</code>, <code>false</code>) become JSON booleans (<code>true</code>,{" "}
            <code>false</code>).
          </li>
          <li>Structs become JSON objects. Field names become keys.</li>
          <li>Cell arrays become JSON arrays.</li>
          <li>
            Empty arrays (<code>[]</code>) become JSON arrays (<code>[]</code>).
          </li>
          <li>
            <code>NaN</code> and <code>Inf</code> values in numeric arrays are encoded as <code>null</code> (since JSON
            doesn&apos;t have standard representations for these).
          </li>
          <li>
            <code>missing</code> values are encoded as <code>null</code>.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Encoding Mixed Data Types</h4>
          <pre>
            <code className="language-matlab">{`
% Data structure with various types
data.numbers = [1, 2.5, NaN];
data.names = {'Bob', 'Charlie'};
data.isActive = true;
data.description = "A test object";
data.emptyList = [];

jsonString = jsonencode(data);
disp(jsonString);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Expected Output (approximate):{" "}
            <code>{`{"numbers":[1,2.5,null],"names":["Bob","Charlie"],"isActive":true,"description":"A test object","emptyList":[]}`}</code>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Formatting Options (Pretty-Printing)</h3>
        <p>
          By default, <code>jsonencode</code> produces a compact JSON string with no whitespace. For readability,
          especially when saving to a file or debugging, you can use the <code>&apos;PrettyPrint&apos;</code> option:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Using PrettyPrint</h4>
          <pre>
            <code className="language-matlab">{`
person.name = 'Alice';
person.age = 30;
person.city = 'New York';

% Encode with pretty-printing
jsonStringPretty = jsonencode(person, 'PrettyPrint', true);

% Display the pretty-printed JSON string
disp(jsonStringPretty);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Expected Output (formatted):</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`{
  "name": "Alice",
  "age": 30,
  "city": "New York"
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ArrowRightToLine className="w-6 h-6 mr-2 text-red-500" /> <code>jsondecode</code>: Decoding JSON to MATLAB
          Data
        </h2>
        <p>
          The <code>jsondecode</code> function takes a JSON-formatted string and converts it back into a corresponding
          MATLAB data structure.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Usage</h3>
        <p>Simply pass the JSON string to the function:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Decoding a JSON Object</h4>
          <pre>
            <code className="language-matlab">{`
% A JSON string representing an object
jsonString = '{"name":"Alice","age":30,"isStudent":false}';

% Decode the JSON string into a MATLAB struct
matlabData = jsondecode(jsonString);

% Display the resulting MATLAB struct
disp(matlabData);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Expected Output:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`  name: 'Alice'
   age: 30
isStudent: 0`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: JSON <code>true</code>/<code>false</code> decode to MATLAB logical <code>1</code>/<code>0</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Mapping JSON Types to MATLAB</h3>
        <p>
          <code>jsondecode</code> performs the reverse mapping of <code>jsonencode</code>:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            JSON objects become MATLAB structs. Keys become field names. If a key is not a valid MATLAB identifier, it
            may be modified or require dynamic field access.
          </li>
          <li>
            JSON arrays become MATLAB cell arrays if elements have different types, or numeric/logical arrays if
            elements are homogeneous numbers or booleans.
          </li>
          <li>JSON strings become MATLAB character vectors (strings).</li>
          <li>
            JSON numbers become MATLAB <code>double</code> scalars or arrays.
          </li>
          <li>
            JSON booleans (<code>true</code>, <code>false</code>) become MATLAB <code>logical</code> scalars (
            <code>1</code>, <code>0</code>).
          </li>
          <li>
            JSON <code>null</code> becomes a MATLAB empty array (<code>[]</code>).
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Decoding a JSON Array</h4>
          <pre>
            <code className="language-matlab">{`
% A JSON string representing an array with mixed types
jsonString = '["apple", 123, true, null, [1, 2]]';

% Decode the JSON string into a MATLAB cell array
matlabData = jsondecode(jsonString);

% Display the resulting MATLAB cell array
disp(matlabData);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Expected Output:</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            {`    'apple'    [  123]    [1x1 logical]    []    [1x2 double]`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Note: The output shows a cell array containing a string, a numeric scalar, a logical scalar (1), an empty
            numeric array, and a numeric array.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Handling Invalid JSON</h3>
        <p>
          If <code>jsondecode</code> encounters invalid JSON syntax, it will throw an error. You should use{" "}
          <code>try-catch</code> blocks to handle potential decoding errors gracefully, especially when dealing with
          external data sources.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-500" /> Common Scenarios & Best Practices
        </h2>

        <h3 className="text-xl font-semibold mt-6">Working with JSON Files</h3>
        <p>You can easily read JSON from a file, decode it, work with the data, and then encode it back to a file.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2">Example: Read, Modify, and Write JSON File</h4>
          <pre>
            <code className="language-matlab">{`
% --- Step 1: Write initial JSON to a file ---
initialData.version = 1.0;
initialData.settings.mode = 'auto';
initialData.settings.level = 5;

jsonStringToFile = jsonencode(initialData, 'PrettyPrint', true);

% Define filename (use fullpath or navigate)
filename = 'my_config.json';

% Open file for writing, write content, close file
fid = fopen(filename, 'w');
fprintf(fid, '%s', jsonStringToFile);
fclose(fid);
disp(['Wrote initial JSON to ' filename]);

% --- Step 2: Read JSON from the file ---
disp(['Reading JSON from ' filename]);
fid = fopen(filename, 'r');
% Read entire file as a single string. Note: fscanf might stop at whitespace,
% a better approach for reading the whole file is often fileread (R2014b+)
% rawText = fscanf(fid, '%s'); % Original line - might fail on whitespace
rawText = fread(fid, '*char')'; % Alternative: Read all bytes as chars
fclose(fid);

% Decode the JSON string
readData = jsondecode(rawText);
disp('Decoded Data:');
disp(readData);

% --- Step 3: Modify the data ---
readData.settings.mode = 'manual';
readData.notes = 'Updated setting';
disp('Modified Data:');
disp(readData);

% --- Step 4: Encode modified data and write back to file ---
modifiedJsonString = jsonencode(readData, 'PrettyPrint', true);

fid = fopen(filename, 'w'); % Overwrite the file
fprintf(fid, '%s', modifiedJsonString);
fclose(fid);
disp(['Wrote modified JSON back to ' filename]);
`}</code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This example demonstrates the full cycle of working with JSON files in MATLAB. Note: The original{" "}
            <code>fscanf(fid, &apos;%s&apos;)</code> might stop reading at whitespace; using{" "}
            <code>fileread(filename)</code> (R2014b+) or <code>fread(fid, &apos;*char&apos;)&apos;</code> is generally
            more reliable for reading the entire file content including spaces and newlines typically found in
            pretty-printed JSON. I&apos;ve updated the example to use <code>fread</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertCircle className="w-6 h-6 mr-2 text-yellow-500" /> Potential Pitfalls and Considerations
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Data Type Conversion:</strong> Be mindful of how specific MATLAB types (like dates, times,
            categorical arrays) are handled. They might not have a direct JSON equivalent and could be converted to
            strings or numbers in a way that requires specific handling on the decoding side.
          </li>
          <li>
            <strong>Large Data:</strong> For extremely large datasets, converting the entire structure to a single
            string might be memory-intensive. Consider streaming or processing data in chunks if possible, although{" "}
            <code>jsonencode</code>/<code>jsondecode</code> are generally optimized.
          </li>
          <li>
            <strong>Non-Standard JSON:</strong> MATLAB&apos;s functions strictly follow the JSON standard. They will
            reject invalid JSON (e.g., trailing commas, comments, unquoted keys). If you&apos;re consuming data that
            might contain such non-standard elements, you might need pre-processing or a different parsing library.
          </li>
          <li>
            <strong>Object Encoding/Decoding:</strong> By default, <code>jsonencode</code> encodes public properties of
            MATLAB objects. For more complex object serialization (e.g., including private/protected properties, or
            custom representations), you might need to implement custom <code>toJSON</code> or similar methods within
            your object classes (consult MATLAB documentation for advanced serialization).
          </li>
          <li>
            <strong>Field Names:</strong> MATLAB struct field names must be valid MATLAB identifiers. JSON keys can be
            any string. <code>jsondecode</code> attempts to create valid field names, but this can sometimes lead to
            unexpected results if keys are complex. Using the <code>&apos;SwitchFieldName&apos;</code> option in{" "}
            <code>jsondecode</code> can provide more control.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          MATLAB&apos;s <code>jsonencode</code> and <code>jsondecode</code> functions provide a robust and convenient
          way to interact with JSON data directly within your MATLAB workflows. Understanding the data type mappings and
          utilizing options like <code>&apos;PrettyPrint&apos;</code> will help you effectively integrate MATLAB with
          external systems and data formats that rely on JSON.
        </p>
      </div>
    </>
  );
}
