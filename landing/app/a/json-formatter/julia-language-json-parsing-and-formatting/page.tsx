import type { Metadata } from "next";
import { AlertCircle, BookOpen, CheckCircle, Code, FileJson, FileText, Indent, Type } from "lucide-react";

export const metadata: Metadata = {
  title: "Julia Language: JSON Parsing and Formatting with JSON.jl | Offline Tools",
  description:
    "Learn current Julia JSON workflows with JSON.jl: parse strings and files, format output, decode into structs, use lazy parsing for large payloads, and handle nulls and performance tradeoffs.",
};

export default function JuliaJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="mr-3 text-blue-600" size={30} /> Julia Language: JSON Parsing and Formatting
      </h1>

      <div className="space-y-6">
        <p>
          If you need to work with JSON in Julia today, the shortest path is usually{" "}
          <a
            href="https://juliaio.github.io/JSON.jl/stable/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            <code>JSON.jl</code>
          </a>
          : parse a string or file with <code>JSON.parse</code>, format data with <code>JSON.json</code>, and switch to
          typed or lazy parsing when the payload gets more complex. This page focuses on the current{" "}
          <code>JSON.jl</code> API, because some older Julia JSON tutorials still describe outdated defaults.
        </p>

        <p>
          For searchers looking for the right Julia JSON package: <code>JSON.jl</code> is a strong default for general
          parsing, formatting, JSON Lines, and direct struct decoding. If your codebase already uses{" "}
          <a
            href="https://quinnj.github.io/JSON3.jl/stable/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            <code>JSON3.jl</code>
          </a>{" "}
          and <code>StructTypes</code>, staying consistent with that stack is also reasonable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2 text-green-600" /> Getting Started with <code>JSON.jl</code>
        </h2>
        <p>
          Install the package once with Julia&apos;s package manager, then import it in your project or REPL session:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center mb-2">
            <Code className="mr-2" /> Install and import
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`julia> using Pkg
julia> Pkg.add("JSON")

julia> using JSON`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          The core functions you will use most are <code>JSON.parse</code>, <code>JSON.parsefile</code>,{" "}
          <code>JSON.json</code>, and <code>JSON.print</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-600" /> Parsing JSON into Julia Values
        </h2>
        <p>
          <code>JSON.parse</code> eagerly reads a JSON string and converts it into Julia values. The important current
          detail is that JSON objects parse to <code>JSON.Object&#x7b;String, Any&#x7d;</code> by default, not a plain{" "}
          <code>Dict</code>.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            JSON objects become <code>JSON.Object&#x7b;String, Any&#x7d;</code>, which preserves insertion order and is
            designed to feel close to a dictionary.
          </li>
          <li>
            JSON arrays become <code>Vector&#x7b;Any&#x7d;</code>.
          </li>
          <li>
            JSON strings become <code>String</code>.
          </li>
          <li>
            JSON numbers become an appropriate Julia number type such as <code>Int64</code>, <code>BigInt</code>,{" "}
            <code>Float64</code>, or <code>BigFloat</code>.
          </li>
          <li>
            JSON booleans become <code>Bool</code>.
          </li>
          <li>
            JSON <code>null</code> becomes <code>nothing</code>.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2" /> Basic parsing example
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`json_text = """
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "tags": ["julia", "json"],
  "profile": {
    "city": "Vilnius",
    "country": "Lithuania"
  },
  "score": null
}
"""

data = JSON.parse(json_text)

println(typeof(data))                 # JSON.Object{String, Any}
println(data["name"])                 # Alice
println(data["tags"][1])              # julia
println(data["profile"]["city"])      # Vilnius
println(data["score"] === nothing)    # true`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          If a key is also a valid Julia identifier, <code>JSON.Object</code> supports dot-style access too, so{" "}
          <code>data.profile</code> can be convenient in scripts and notebooks.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Type className="mr-2" /> When to parse into a <code>Dict</code> instead
        </h3>
        <p>
          The default <code>JSON.Object</code> is order-preserving, but key lookups are linear rather than hashed. If
          you are going to hit the same large object many times, parse into a dictionary up front:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`data = JSON.parse(json_text; dicttype=Dict{String, Any})

println(typeof(data))                 # Dict{String, Any}
println(data["profile"]["city"])      # Vilnius`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          That small option is one of the most useful performance tips when working with bigger Julia JSON payloads.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Type className="mr-2" /> Parsing directly into structs
        </h3>
        <p>
          Modern <code>JSON.jl</code> can decode JSON straight into your own types, which is often cleaner than pushing
          around <code>Dict&#x7b;String, Any&#x7d;</code> values everywhere.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`struct Author
    name::String
    github::String
end

json_text = """{"name":"Ada","github":"ada-dev"}"""

author = JSON.parse(json_text, Author)
println(author.name)                  # Ada`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          Typed parsing is a good fit for application code, API clients, and any path where you want predictable fields
          instead of untyped containers.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileJson className="mr-2" /> Large files: lazy parsing
        </h3>
        <p>
          For very large documents, you do not always want to materialize the whole tree at once.{" "}
          <code>JSON.lazy</code> and <code>JSON.lazyfile</code> let you walk the document and materialize only the
          pieces you touch.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`doc = JSON.lazyfile("events.json")

# Access only what you need
first_id = doc.events[1].id[]
println(first_id)`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          This is especially useful when you only need a few fields from a huge export or API dump.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-2 text-orange-600" /> Reading JSON Files and JSON Lines
        </h2>
        <p>
          Use <code>JSON.parsefile</code> when the data already lives on disk. It supports the same options as{" "}
          <code>JSON.parse</code>, and it also understands JSON Lines files based on the filename extension.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`config = JSON.parsefile("config.json"; dicttype=Dict)

# .jsonl and .ndjson are treated as JSON Lines by default
rows = JSON.parsefile("events.jsonl")

# Use missing instead of nothing if that fits your pipeline better
table_like = JSON.parsefile("report.json"; null=missing)`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          Setting <code>null=missing</code> is a practical choice if the parsed result is headed into table-oriented
          Julia code where <code>missing</code> is more natural than <code>nothing</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Indent className="mr-2 text-cyan-600" /> Formatting Julia Values as JSON
        </h2>
        <p>
          Converting Julia data back into JSON is straightforward with <code>JSON.json</code>. Use compact output for
          transport and pretty output for logs, fixtures, config files, or debugging.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2" /> Compact and pretty output
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`payload = Dict(
    "tool" => "json-formatter",
    "count" => 3,
    "tags" => ["julia", "json"],
    "notes" => nothing
)

compact = JSON.json(payload)
pretty = JSON.json(payload; pretty=2)
pretty_without_nulls = JSON.json(payload; pretty=2, omit_null=true)

println(compact)
println(pretty)
println(pretty_without_nulls)`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          <code>omit_null=true</code> is useful when you want cleaner API payloads or config files without explicit null
          fields.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="mr-2" /> Writing straight to a file
        </h3>
        <p>
          You can write via an <code>IO</code> handle with <code>JSON.print</code>, or write directly by passing a file
          path to <code>JSON.json</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`JSON.json("output.json", payload; pretty=2)

open("compact.json", "w") do io
    JSON.print(io, payload)
end`}
              </code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2" /> Formatting your own types
        </h3>
        <p>
          If Julia does not know how to serialize a custom type, define <code>JSON.lower</code> so the object becomes a
          JSON-friendly structure first.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <div className="bg-white p-3 rounded dark:bg-gray-900">
            <pre>
              <code>
                {`struct Location
    city::String
    country::String
end

JSON.lower(x::Location) = Dict(
    "city" => x.city,
    "country" => x.country,
)

println(JSON.json(Location("Vilnius", "Lithuania")))`}
              </code>
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertCircle className="mr-2 text-yellow-500" /> Common Julia JSON Pitfalls
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Old tutorials may be stale:</strong> if a guide says <code>JSON.parse</code> returns a plain{" "}
            <code>Dict</code> by default, it is describing older behavior.
          </li>
          <li>
            <strong><code>nothing</code> is not <code>missing</code>:</strong> JSON <code>null</code> maps to{" "}
            <code>nothing</code> unless you explicitly choose <code>null=missing</code>.
          </li>
          <li>
            <strong>NaN and Infinity are not valid JSON:</strong> <code>JSON.jl</code> can allow them with{" "}
            <code>allownan=true</code>, but only use that for systems that intentionally accept non-standard JSON.
          </li>
          <li>
            <strong>Trailing commas and single quotes still fail:</strong> if a payload came from hand-edited config,
            validate it before assuming the parser is wrong.
          </li>
          <li>
            <strong>Large repeated lookups can be slow on <code>JSON.Object</code>:</strong> use{" "}
            <code>dicttype=Dict</code> when you need hash-based lookup behavior.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-2 text-green-600" /> Practical Recommendation
        </h2>
        <p>
          For most Julia JSON work in 2026, start with <code>JSON.jl</code>, parse into regular Julia containers or
          your own structs, and switch on options like <code>dicttype</code>, <code>null=missing</code>, or lazy parsing
          only when the payload or workload justifies it. That keeps your code simple while still covering large files,
          typed application models, and human-readable formatting.
        </p>
      </div>
    </>
  );
}
