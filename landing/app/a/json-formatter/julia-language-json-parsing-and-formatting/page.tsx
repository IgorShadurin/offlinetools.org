import type { Metadata } from "next";
import { Code, FileJson, BookOpen, FileText, CheckCircle, AlertCircle, Indent, Type } from "lucide-react";

export const metadata: Metadata = {
  title: "Julia Language: JSON Parsing and Formatting | Offline Tools",
  description:
    "Explore how to parse and format JSON data effectively using the JSON.jl package in the Julia programming language, with practical examples.",
};

export default function JuliaJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="mr-3 text-blue-600" size={30} /> Julia Language: JSON Parsing and Formatting
      </h1>

      <div className="space-y-6">
        <p>
          Working with data interchange formats is a common task in programming, and JSON (JavaScript Object Notation)
          is one of the most prevalent. Julia, with its growing ecosystem, provides excellent tools for handling JSON
          data efficiently. This guide explores how to parse JSON strings into Julia data structures and format Julia
          data structures into JSON strings using the standard{" "}
          <a
            href="https://github.com/JuliaIO/JSON.jl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            <code>JSON.jl</code>
          </a>{" "}
          package.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2 text-green-600" /> Getting Started: The <code>JSON.jl</code> Package
        </h2>
        <p>
          The primary package for working with JSON in Julia is <code>JSON.jl</code>. If you don&apos;t have it
          installed, you can add it using Julia&apos;s package manager (Pkg):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Code className="mr-2" /> Installing JSON.jl
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`julia> using Pkg
julia> Pkg.add("JSON")`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          Once installed, you can start using its functionalities by bringing it into your current module or session:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Code className="mr-2" /> Using the Package
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>{`using JSON`}</code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-600" /> Parsing JSON into Julia Data
        </h2>
        <p>
          Parsing involves taking a JSON string and converting it into native Julia data types. The primary function for
          this is <code>JSON.parse()</code>. It intelligently maps JSON structures and primitives to their corresponding
          Julia equivalents:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            JSON Object (<code>&#x7b;...&#x7d;</code>) becomes a Julia <code>Dict&#x7b;String, Any&#x7d;</code>.
          </li>
          <li>
            JSON Array (<code>[...]</code>) becomes a Julia <code>Vector&#x7b;Any&#x7d;</code>.
          </li>
          <li>
            JSON String becomes a Julia <code>String</code>.
          </li>
          <li>
            JSON Number becomes a Julia <code>Number</code> (typically <code>Float64</code> for non-integers,{" "}
            <code>Int64</code> for integers).
          </li>
          <li>JSON Boolean (`true`/`false`) becomes a Julia `Bool`.</li>
          <li>
            JSON Null (`null`) becomes Julia&apos;s <code>nothing</code>.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2" /> Basic Parsing Example
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`json_string = """
{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science", "History"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "GPA": 3.75,
  "metadata": null
}
"""

# Parse the string
julia_data = JSON.parse(json_string)

# Now julia_data is a Dict{String, Any}
println(typeof(julia_data))

# Accessing elements
println("Name: ", julia_data["name"])
println("First course: ", julia_data["courses"][1]) # Julia arrays are 1-indexed!
println("City: ", julia_data["address"]["city"])
println("Metadata type: ", typeof(julia_data["metadata"]))`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          <CheckCircle className="inline mr-1 text-green-500" /> Notice how JSON objects become dictionaries, arrays
          become vectors, and nested structures are handled automatically. Remember that Julia arrays are 1-indexed,
          unlike many other languages that might interact with JSON.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Type className="mr-2" /> Handling Different Data Types
        </h3>
        <p>
          <code>JSON.parse</code> handles the mapping of primitive types seamlessly:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`json_primitives = """
{
  "string_val": "hello",
  "int_val": 123,
  "float_val": 45.67,
  "bool_true": true,
  "bool_false": false,
  "null_val": null
}
"""

parsed_primitives = JSON.parse(json_primitives)

println("string_val type: ", typeof(parsed_primitives["string_val"]))
println("int_val type: ", typeof(parsed_primitives["int_val"]))
println("float_val type: ", typeof(parsed_primitives["float_val"]))
println("bool_true type: ", typeof(parsed_primitives["bool_true"]))
println("null_val value: ", parsed_primitives["null_val"])
println("null_val type: ", typeof(parsed_primitives["null_val"]))`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          The output will show that strings become <code>String</code>, integers become <code>Int64</code>, floats
          become <code>Float64</code>, booleans become <code>Bool</code>, and null becomes <code>nothing</code>.
        </p>
        <p>
          <AlertCircle className="inline mr-1 text-yellow-500" /> While the default parsing works well, for more complex
          scenarios or for better type stability, you might need to define custom parsing logic or use packages that
          offer struct mapping, though `JSON.jl` itself focuses on the basic type mapping.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-orange-600" /> Formatting Julia Data into JSON
        </h2>
        <p>
          Formatting (or serializing) is the reverse process: converting Julia data structures back into a JSON string.
          The function for this is <code>JSON.json()</code>. It takes a Julia object and converts it following the same
          type mapping in reverse.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2" /> Basic Formatting Example
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`# Create a Julia data structure
julia_struct = Dict(
    "product" => "Laptop",
    "price" => 1200.50,
    "available" => true,
    "tags" => ["electronics", "computer", "portable"],
    "specs" => Dict(
        "brand" => "TechCorp",
        "screen_size_in" => 15.6
    ),
    "notes" => nothing
)

# Format into a JSON string
json_output = JSON.json(julia_struct)

println(json_output)`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          The output will be a compact JSON string representation of the <code>julia_struct</code> dictionary.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Indent className="mr-2" /> Pretty Printing JSON
        </h3>
        <p>
          For human-readable output, you can use the <code>indent</code> keyword argument with <code>JSON.json()</code>:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`# Using the same julia_struct from the previous example

# Format with indentation
pretty_json_output = JSON.json(julia_struct, 4) # Use 4 spaces for indentation

println(pretty_json_output)`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          This will produce the same JSON data but nicely formatted with line breaks and indentation, making it much
          easier to read. The number passed to <code>indent</code> specifies the number of spaces to use for each level
          of indentation.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <AlertCircle className="mr-2 text-yellow-500" /> Important Note: <code>nothing</code> vs <code>null</code>
        </h3>
        <p>
          In Julia, the equivalent of JSON&apos;s `null` is `nothing`. When you parse JSON `null`, you get `nothing` in
          Julia. When you serialize `nothing` from Julia, it becomes JSON `null`. This mapping is consistent and
          important to remember when handling potentially missing or null values.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`# Parsing null
json_null_str = """{"value": null}"""
parsed_null = JSON.parse(json_null_str)
println("Parsed null type: ", typeof(parsed_null["value"])) # Output: Nothing

# Formatting nothing
julia_nothing_dict = Dict("another_value" => nothing)
json_from_nothing = JSON.json(julia_nothing_dict)
println("JSON from nothing: ", json_from_nothing) # Output: {"another_value":null}`}
              </code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="mr-2 text-cyan-600" /> Working with JSON Files
        </h2>
        <p>
          <code>JSON.jl</code> also provides functions to read directly from or write directly to files. This is
          convenient when dealing with JSON data stored in files on disk.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileJson className="mr-2" /> Reading from a File
        </h3>
        <p>
          Use <code>JSON.parsefile()</code> to parse a JSON file directly:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Code className="mr-2" /> Example: Parsing a File
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`# Assume 'data.json' contains valid JSON
# Example:
# {
#   "id": 101,
#   "active": true
# }

try
    data_from_file = JSON.parsefile("data.json")
    println("Data read from file: ", data_from_file)
catch e
    println("Error reading or parsing file: ", e)
end`}
              </code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="mr-2" /> Writing to a File
        </h3>
        <p>
          Use <code>JSON.print()</code> or <code>JSON.println()</code> with a file handle to write JSON data to a file.{" "}
          <code>JSON.print()</code> is good for compact output, while <code>JSON.println()</code> adds a newline at the
          end. You can also use the <code>indent</code> option here.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Code className="mr-2" /> Example: Writing to a File
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`# Data to write
data_to_write = Dict(
    "status" => "success",
    "count" => 42,
    "items" => ["apple", "banana"]
)

# Write to a file (pretty printed)
open("output.json", "w") do io
    JSON.print(io, data_to_write, 2) # Write with 2-space indentation
end

println("Data written to output.json")`}
              </code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-600" /> Summary & Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              Use <code>JSON.jl</code>:
            </strong>{" "}
            It&apos;s the standard and most widely used package for JSON in Julia.
          </li>
          <li>
            <strong>Parsing:</strong> Use <code>JSON.parse(json_string)</code> for strings, and{" "}
            <code>JSON.parsefile(filepath)</code> for files. Be mindful of the Julia type mapping (Dict for objects,
            Vector for arrays, nothing for null).
          </li>
          <li>
            <strong>Formatting:</strong> Use <code>JSON.json(julia_data)</code> to get a JSON string. Use the optional{" "}
            <code>indent</code> argument (e.g., <code>JSON.json(data, 4)</code>) for pretty printing.
          </li>
          <li>
            <strong>File I/O:</strong> Use <code>JSON.print(io, data, indent)</code> or{" "}
            <code>JSON.println(io, data, indent)</code> when writing to a file handle obtained via{" "}
            <code>open(...)</code>.
          </li>
          <li>
            <strong>Error Handling:</strong> JSON parsing can fail if the input is invalid. Wrap parsing calls in{" "}
            <code>try...catch</code> blocks to handle potential <code>JSON.ParserError</code> exceptions gracefully.
          </li>
        </ul>

        <p>
          <Code className="inline mr-1 text-blue-500" /> Mastering these basic functions from <code>JSON.jl</code> will
          cover the vast majority of your JSON handling needs in Julia, enabling smooth data exchange with other systems
          and services.
        </p>
      </div>
    </>
  );
}
