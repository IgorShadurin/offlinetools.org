import type { Metadata } from "next";
import { Code, Command, Library, Braces, FlaskConical, FileText, Terminal, Laptop } from "lucide-react"; // Importing necessary icons, replaced SquareCurly with Braces

export const metadata: Metadata = {
  title: "Python JSON Formatting Tools and Libraries | Offline Tools",
  description:
    "Explore Python's built-in libraries and command-line tools for formatting and pretty-printing JSON data.",
};

export default function PythonJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Braces className="mr-3" size={32} /> Python JSON Formatting Tools and Libraries
      </h1>

      <div className="space-y-6">
        <p>
          Working with JSON (JavaScript Object Notation) is a common task in software development, especially when
          dealing with data exchange, APIs, and configuration files. While JSON's simple key-value structure is easy for
          machines to parse, poorly formatted JSON can be difficult for humans to read and debug.
        </p>
        <p>
          Formatting JSON, often called "pretty-printing", adds indentation, spacing, and sometimes sorts keys to make
          the structure clear and hierarchical. Python provides excellent built-in tools and libraries to handle JSON
          formatting efficiently.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Library className="mr-2" /> Python's Standard `json` Library
        </h2>
        <p>
          The most common and recommended way to format JSON in Python is by using the built-in `json` module. This
          module provides functions for encoding Python objects into JSON strings (`dumps`) and decoding JSON strings
          into Python objects (`loads`).
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="inline-block mr-2" size={20} /> Formatting with <code>json.dumps()</code>
        </h3>
        <p>
          The <code>json.dumps()</code> function is used to serialize a Python object into a JSON formatted string. It
          offers powerful arguments to control the output format:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>indent</code>: Specifies the number of spaces (or a string) to use for indentation. Using a positive
            integer like <code>4</code> makes the output human-readable.
          </li>
          <li>
            <code>sort_keys</code>: If set to <code>True</code>, the keys in JSON objects will be sorted alphabetically.
            This is useful for ensuring consistent output order, which can help with version control diffs.
          </li>
          <li>
            <code>separators</code>: A tuple <code>(item_separator, key_separator)</code>. By default, it's{" "}
            <code>(&apos;, &apos;, &apos;: &apos;)</code> with spaces. For compact JSON, you can use
            <code>(&apos;,&apos;, &apos;:&apos;)</code>.
          </li>
        </ul>

        <h4 className="text-lg font-medium mt-4">Example: Basic Pretty-Printing</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            <code className="language-python">
              {`import json

data = {
    "name": "Alice",
    "age": 30,
    "isStudent": False,
    "courses": ["Math", "Science", "History"],
    "address": {
        "street": "123 Main St",
        "city": "Anytown"
    }
}

# Pretty-print with 4-space indentation
pretty_json = json.dumps(data, indent=4)
print(pretty_json)

# Output will be formatted like:
# {
#     "name": "Alice",
#     "age": 30,
#     "isStudent": false,
#     "courses": [
#         "Math",
#         "Science",
#         "History"
#     ],
#     "address": {
#         "street": "123 Main St",
#         "city": "Anytown"
#     }
# }
`}
            </code>
          </pre>
        </div>

        <h4 className="text-lg font-medium mt-4">Example: Sorting Keys</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            <code className="language-python">
              {`import json

data = {
    "name": "Alice",
    "age": 30,
    "isStudent": False
}

# Pretty-print with 2-space indentation and sorted keys
pretty_json_sorted = json.dumps(data, indent=2, sort_keys=True)
print(pretty_json_sorted)

# Output will be:
# {
#   "age": 30,
#   "isStudent": false,
#   "name": "Alice"
# }
`}
            </code>
          </pre>
        </div>

        <h4 className="text-lg font-medium mt-4">Example: Compact Output</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            <code className="language-python">
              {`import json

data = {
    "name": "Alice",
    "age": 30
}

# Compact JSON output
compact_json = json.dumps(data, separators=(',', ':'))
print(compact_json)

# Output will be:
# {"name":"Alice","age":30}
`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <FileText className="inline-block mr-2" size={20} /> Formatting Files with <code>json.dump()</code>
        </h3>
        <p>
          If you want to write a Python object directly to a file as formatted JSON, use the <code>json.dump()</code>{" "}
          function. It takes a file-like object as its second argument and supports the same formatting arguments as{" "}
          <code>dumps()</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            <code className="language-python">
              {`import json

data = {
    "product": "Gadget",
    "price": 19.99,
    "inStock": True
}

# Write to a file with pretty-printing
with open("output.json", "w") as f:
    json.dump(data, f, indent=4)

# The file "output.json" will contain the formatted JSON.
`}
            </code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Terminal className="mr-2" /> Command-line Formatting with <code>python -m json.tool</code>
        </h2>
        <p>
          Python's standard library includes a command-line tool for validating and pretty-printing JSON. You can access
          it using the <code>python -m json.tool</code> command. This is incredibly useful for formatting JSON data from
          files or standard input directly in your terminal without writing a separate script.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Command className="inline-block mr-2" size={20} /> Using <code>json.tool</code>
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>From a file:</strong>
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                <code className="language-bash">python -m json.tool your_file.json</code>
              </pre>
            </div>
          </li>
          <li>
            <strong>From standard input (piping):</strong> This is very common, e.g., to format JSON output from another
            command.
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                <code className="language-bash">cat your_file.json | python -m json.tool</code>
              </pre>
            </div>
            or
            <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
              <pre>
                <code className="language-bash">curl -s api.example.com/data | python -m json.tool</code>
              </pre>
            </div>
          </li>
        </ul>
        <p>
          By default, <code>json.tool</code> uses an indentation of 4 spaces. As of Python 3.8, you can specify the
          indent level using the <code>--indent</code> flag.
        </p>
        <div className="bg-gray-100 p-2 rounded-lg dark:bg-gray-800 my-2 overflow-x-auto">
          <pre>
            <code className="language-bash">cat your_file.json | python -m json.tool --indent 2</code>
          </pre>
        </div>
        <p>The tool also includes validation. If the input is not valid JSON, it will report an error.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Laptop className="mr-2" /> Beyond Standard Libraries
        </h2>
        <p>
          While the built-in <code>json</code> library is sufficient for most formatting needs, there are other tools
          and libraries:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Third-party Python Libraries:</strong> Libraries like <code>orjson</code>, <code>ujson</code>, or{" "}
            <code>pydantic</code>
            offer fast JSON serialization/deserialization, sometimes with additional features or performance
            optimizations. While they serialize Python objects to JSON, their formatting options might be similar to or
            different from the standard library.
          </li>
          <li>
            <strong>Specialized Command-line Tools:</strong> Tools like <code>jq</code> are specifically designed for
            processing, slicing, filtering, mapping, and transforming JSON data from the command line. <code>jq</code>{" "}
            is extremely powerful for complex operations and includes excellent formatting capabilities.
          </li>
          <li>
            <strong>Online Formatters:</strong> Numerous websites provide online JSON formatting services. Use these
            with caution, especially for sensitive data, as you're submitting your data to a third-party server. For
            quick formatting of non-sensitive data, they can be convenient.
          </li>
        </ul>
        <p>
          For standard formatting tasks within Python scripts or basic command-line pretty-printing, the built-in{" "}
          <code>json</code>
          module and <code>python -m json.tool</code> are usually all you need. They are reliable, widely available, and
          well-documented.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FlaskConical className="mr-2" /> Practical Tips for Developers
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Debugging:</strong> When dealing with complex or nested JSON from an API or file, piping it through
            <code>python -m json.tool</code> is one of the quickest ways to understand its structure and identify
            missing or incorrect data.
          </li>
          <li>
            <strong>Configuration Files:</strong> If you're writing application configuration files in JSON, using
            `indent=4` and `sort_keys=True` ensures they are easy for users to read and that changes between versions
            are minimal and clear in version control systems like Git.
          </li>
          <li>
            <strong>Logging and Output:</strong> When logging or printing JSON data, always pretty-print it if it's
            intended for human consumption. Compact JSON saves space but is unusable for quick manual inspection.
          </li>
          <li>
            <strong>Consistency:</strong> Agree on a standard indentation level (e.g., 2 or 4 spaces) and whether to
            sort keys within your team or project to maintain consistency across your codebase.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Python provides robust and easy-to-use tools for formatting JSON data. The standard `json` library,
          specifically the `dumps()` and `dump()` functions with the `indent` and `sort_keys` arguments, is the go-to
          solution for formatting JSON within Python scripts. For quick, command-line formatting and validation, `python
          -m json.tool` is an indispensable utility. Mastering these tools will significantly improve your ability to
          work efficiently with JSON data in your Python projects.
        </p>
      </div>
    </>
  );
}
