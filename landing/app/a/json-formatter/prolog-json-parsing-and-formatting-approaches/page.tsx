import type { Metadata } from "next";
import { FileJson, Code, Settings2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Prolog JSON Parsing and Formatting Approaches",
  description:
    "Explore different methods and libraries for handling JSON data within Prolog, covering both parsing and formatting.",
};

export default function PrologJsonHandlingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson className="w-8 h-8" />
        Prolog JSON Parsing and Formatting Approaches
      </h1>

      <div className="space-y-6">
        <p>
          Handling data interchange formats like JSON is crucial for integrating Prolog applications with the broader
          developer ecosystem, including web services, APIs, and data processing pipelines. Fortunately, modern Prolog
          implementations provide robust libraries and predicates specifically designed for parsing JSON strings into
          Prolog terms and formatting Prolog terms into JSON strings.
        </p>
        <p>
          This page explores the common approaches and provides examples using the widely supported syntax found
          in systems like SWI-Prolog, which offers a comprehensive JSON library.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" />
          The Basics: Representing JSON in Prolog
        </h2>
        <p>
          Before diving into parsing and formatting, it's essential to understand how JSON data structures are
          typically represented within Prolog's term structure:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Object:</strong> Represented as a{" "}
            <a
              href="https://swi-prolog.discourse.group/t/what-are-dicts-good-for/734"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Prolog Dict
            </a>{" "}
            (or "dictionary"). Keys are typically atoms or strings, and values can be any Prolog term representing
            a JSON value. Example:{" "}
            <code>_&#123;id:123, name:"Alice", active:true&#125;</code>
          </li>
          <li>
            <strong>JSON Array:</strong> Represented as a standard Prolog List. Example: <code>[1, "apple", false]</code>
          </li>
          <li>
            <strong>JSON String:</strong> Represented as a Prolog String (double quotes) or sometimes an Atom (single quotes),
            depending on the specific predicate and options used. Strings are generally preferred for direct JSON mapping.
            Example: <code>"Hello, World!"</code>
          </li>
          <li>
            <strong>JSON Number:</strong> Represented as a Prolog Integer or Float. Example: <code>42</code>, <code>3.14</code>
          </li>
          <li>
            <strong>JSON Boolean:</strong> Represented by the Prolog atoms <code>true</code> and <code>false</code>.
          </li>
          <li>
            <strong>JSON Null:</strong> Represented by the Prolog atom <code>null</code>.
          </li>
        </ul>
        <p>
          This mapping allows Prolog's powerful unification and pattern matching capabilities to be applied directly
          to parsed JSON data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" />
          JSON Parsing: From String to Prolog Term
        </h2>
        <p>
          The primary goal of JSON parsing in Prolog is to take a JSON formatted string (or stream) and convert it
          into a corresponding Prolog term (usually a dict or a list). The most common predicate for this in SWI-Prolog
          is <code>json_read/2</code> or <code>json_read_dict/2</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Using <code>json_read/2</code></h3>
        <p>
          <code>json_read(Stream, Term)</code> reads a JSON term from <code>Stream</code> and unifies it with{" "}
          <code>Term</code>. You typically wrap the string in a "string stream" for this.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example 1: Parsing a JSON Object</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- json_read(string('{"name": "Bob", "age": 25}'), Term).
Term = _{name:"Bob", age:25}.`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example 2: Parsing a JSON Array</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- json_read(string('[10, "twenty", true, null]'), Term).
Term = [10, "twenty", true, null].`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example 3: Parsing Nested Structures</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- json_read(string('{"person": {"name": "Charlie", "cities": ["London", "Paris"]}, "active": false}'), Data).
Data = _{active:false, person:_{cities:["London", "Paris"], name:"Charlie"}}.
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Using <code>json_read_dict/2</code></h3>
        <p>
          This predicate is similar but specifically designed for parsing the top-level JSON object or array directly
          into a dict or list term. It's often more convenient for parsing JSON API responses which are typically
          either an object or an array at the root.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Using <code>json_read_dict/2</code></h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- json_read_dict(string('{"status": "ok", "data": [1, 2, 3]}'), Dict).
Dict = _{data:[1, 2, 3], status:"ok"}.

?- json_read_dict(string('[{"id": 1}, {"id": 2}]'), List).
List = [_{id:1}, _{id:2}].`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Accessing Parsed Data (using Dicts)</h3>
        <p>
          Once parsed into a Prolog dict, you can access elements using the <code>Dict.Key</code> syntax or unification.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Accessing Dict Values</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- json_read(string('{"name": "David", "address": {"city": "Rome", "zip": "00100"}}'), Person).
Person = _{address:_{city:"Rome", zip:"00100"}, name:"David"}.

?- Person.name = Name.
Name = "David".

?- Person.address.city = City.
City = "Rome".

?- _{address:Address} = Person. % Using unification
Address = _{city:"Rome", zip:"00100"}.`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Error Handling</h3>
        <p>
          If the input string is not valid JSON, the parsing predicates will typically throw an exception. You can
          use <code>catch/3</code> to handle these errors gracefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings2 className="w-6 h-6" />
          JSON Formatting: From Prolog Term to String
        </h2>
        <p>
          Formatting (or serializing) JSON involves converting a Prolog term (that represents a JSON structure) back
          into a JSON formatted string. Predicates like <code>json_write/2</code> and <code>json_write_dict/2</code>{" "}
          are used for this purpose. They typically write to a stream, which can be an output stream like <code>current_output</code>{" "}
          or a "string stream" to capture the output into a Prolog string.
        </p>

        <h3 className="text-xl font-semibold mt-6">Using <code>json_write/2</code> or <code>json_write_dict/2</code></h3>
        <p>
          These predicates take a Prolog term and a stream and write the JSON representation to the stream. To get
          the JSON into a string variable, you use a "string stream" in write mode.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example 1: Formatting a Prolog Dict</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- Term = _{product: "book", price: 19.95, inStock: true},
   open_string(StringStream, write, Stream),
   json_write(Stream, Term),
   close(Stream),
   string_codes(JsonString, StringStream).
Term = _{inStock:true, price:19.95, product:"book"},
StringStream = <stream>(0x...)-"",
Stream = <stream>(0x...),
JsonString = "{"product":"book","price":19.95,"inStock":true}".`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example 2: Formatting a Prolog List</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- Term = ["apple", 120, null, false],
   open_string(StringStream, write, Stream),
   json_write(Stream, Term),
   close(Stream),
   string_codes(JsonString, StringStream).
Term = ["apple", 120, null, false],
StringStream = <stream>(0x...)-"",
Stream = <stream>(0x...),
JsonString = "[\"apple\",120,null,false]".`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example 3: Formatting Nested Structures</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- Data = _{config:_{timeout:5000, retries:3}, endpoints:["/users", "/products"]},
   open_string(StringStream, write, Stream),
   json_write(Stream, Data),
   close(Stream),
   string_codes(JsonString, StringStream).
Data = _{config:_{retries:3, timeout:5000}, endpoints:["/users", "/products"]},
StringStream = <stream>(0x...)-"",
Stream = <stream>(0x...),
JsonString = "{"config":{"timeout":5000,"retries":3},"endpoints":["/users","/products"]}".`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Formatting Options (Pretty Printing, etc.)</h3>
        <p>
          Predicates like <code>json_write/3</code> or <code>json_write_dict/3</code> allow specifying options,
          such as indentation for "pretty printing" the output JSON string, making it more human-readable.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Pretty Printing with <code>json_write/3</code></h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`?- Data = _{config:_{timeout:5000, retries:3}, endpoints:["/users", "/products"]},
   open_string(StringStream, write, Stream),
   json_write(Stream, Data, [json_option(indent(4))]), % Use 4 spaces for indent
   close(Stream),
   string_codes(JsonString, StringStream).
Data = _{config:_{retries:3, timeout:5000}, endpoints:["/users", "/products"]},
StringStream = <stream>(0x...)-"",
Stream = <stream>(0x...),
JsonString = "{\\n    \"config\": {\\n        \"timeout\": 5000,\\n        \"retries\": 3\\n    },\\n    \"endpoints\": [\\n        \"/users\",\\n        \"/products\"\\n    ]\\n}". % Note: \\n and indentation
`}
            </pre>
          </div>
        </div>
        <p>
          When outputting to a console or file, the newlines and spaces would render the structured format.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" />
          Working with JSON Files
        </h2>
        <p>
          Reading from or writing to JSON files is straightforward using standard Prolog file handling predicates
          (<code>open/3</code>, <code>close/1</code>) in conjunction with the JSON library predicates.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Reading from a File</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`% Assuming 'data.json' contains: {"id": 101, "status": "active"}
read_json_file(FilePath, Term) :-
    setup_call_cleanup(
        open(FilePath, read, Stream),
        json_read(Stream, Term),
        close(Stream)
    ).

% Example query:
% ?- read_json_file('data.json', Data).
% Data = _{id:101, status:"active"}.`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Writing to a File</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`% This will create 'output.json' with the formatted JSON
write_json_file(FilePath, Term) :-
    setup_call_cleanup(
        open(FilePath, write, Stream),
        json_write(Stream, Term, [json_option(indent(2))]), % Pretty print
        close(Stream)
    ).

% Example query:
% ?- Data = _{report:_{date:"2023-10-27", count:99}},
%    write_json_file('output.json', Data).`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Prolog's built-in capabilities, especially the JSON libraries available in implementations like SWI-Prolog,
          make handling JSON data straightforward and efficient. By mapping JSON objects to Prolog dicts and JSON
          arrays to Prolog lists, developers can leverage Prolog's strengths in data representation, manipulation,
          and pattern matching directly on external data sources. Whether you need to parse data from a web API
          or format Prolog results for a web application, the predicates covered provide the necessary tools.
        </p>
      </div>
    </>
  );
}
