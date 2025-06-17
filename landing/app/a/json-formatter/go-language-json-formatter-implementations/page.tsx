import type { Metadata } from "next";
import { Code, CheckCircle, FileJson, Indent } from "lucide-react"; // Using lucide-react

export const metadata: Metadata = {
  title: "Go Language JSON Formatter Implementations | Offline Tools",
  description:
    "Explore various ways to format JSON data using Go's standard library, focusing on readability and structure.",
};

export default function GoJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-600" /> Go Language JSON Formatting
      </h1>

      <div className="space-y-6">
        <p>
          Formatting JSON data is a common task in backend development. It involves taking structured JSON data, often
          represented as Go structs or maps, and converting it into a string format that adheres to the JSON
          specification. While simply converting to a JSON string is easy,
          <em>formatting</em> typically implies adding indentation and newlines to make the output human-readable. Go's
          standard library provides robust tools for this.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="w-6 h-6 mr-2 text-green-600" /> Why Format JSON?
        </h2>
        <p>
          Even though machines don't strictly need formatted JSON (parsers can handle compact JSON), formatting is
          crucial for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Makes inspecting JSON data in logs, debugging tools, or API responses much
            easier.
          </li>
          <li>
            <strong>Debugging:</strong> Quickly spot structural issues or incorrect values in complex JSON structures.
          </li>
          <li>
            <strong>Consistency:</strong> Provides a standard way to present JSON output from your application.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-600" /> The Standard Library: <code>encoding/json</code>
        </h2>
        <p>
          Go's built-in <code>encoding/json</code> package is the primary tool for working with JSON. It provides
          functions for both *marshaling* (Go data to JSON) and *unmarshaling* (JSON to Go data). For formatting, we
          primarily use the marshaling capabilities.
        </p>

        <h3 className="text-xl font-semibold mt-6">Basic Marshaling vs. Formatted Marshaling</h3>
        <p>
          The <code>json.Marshal</code> function converts a Go value into a compact JSON byte slice.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Basic Marshal Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`package main

import (
\t"encoding/json"
\t"fmt"
)

type User struct {
\tName string
\tAge  int
}

func main() {
\tuser := User{"Alice", 30}

\t// Marshal the struct into a JSON byte slice
\tjsonData, err := json.Marshal(user)
\tif err != nil {
\t\tfmt.Println("Error marshaling JSON:", err)
\t\treturn
\t}

\t// jsonData will be []byte{'{"Name":"Alice","Age":30}'}
\tfmt.Println(string(jsonData))
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Output: <code>&#x7b;&quot;Name&quot;:&quot;Alice&quot;,&quot;Age&quot;:30&#x7d;</code>
          </p>
        </div>

        <p>
          To get a human-readable, indented output, you use the <code>json.MarshalIndent</code> function. It takes the
          Go value and two additional string arguments: a <code>prefix</code> and an <code>indent</code> string.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Indent className="w-6 h-6 mr-2 text-orange-600" /> Using <code>json.MarshalIndent</code>
        </h2>
        <p>
          <code>MarshalIndent</code> signature:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>{`func MarshalIndent(v any, prefix, indent string) ([]byte, error)`}</pre>
          </div>
        </div>
        <p>
          <ul>
            <li>
              <code>v any</code>: The Go value to encode.
            </li>
            <li>
              <code>prefix string</code>: A string prepended to each line of the output. Commonly an empty string{" "}
              <code>""</code>.
            </li>
            <li>
              <code>indent string</code>: A string used for one level of indentation. Commonly <code>"\t"</code> (tab)
              or <code>" "</code> (two spaces).
            </li>
          </ul>
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Example with <code>MarshalIndent</code>
        </h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Using Two Spaces for Indentation:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`package main

import (
\t"encoding/json"
\t"fmt"
)

type Product struct {
\tID       int      \`json:"id"\`
\tName     string   \`json:"name"\`
\tPrice    float64  \`json:"price"\`
\tTags     []string \`json:"tags,omitempty"\` // omitempty means omit if slice is empty
\tIsInStock bool    \`json:"isInStock,string"\` // marshal bool as string "true" or "false"
}

func main() {
\tproduct := Product{
\t\tID: 101,
\t\tName: "Go T-Shirt",
\t\tPrice: 25.99,
\t\tTags: []string{"clothing", "go", "programming"},
\t\tIsInStock: true,
\t}

\t// Marshal with empty prefix and two spaces for indent
\tjsonData, err := json.MarshalIndent(product, "", "  ")
\tif err != nil {
\t\tfmt.Println("Error marshaling JSON:", err)
\t\treturn
\t}

\t// Output the formatted JSON string
\tfmt.Println(string(jsonData))
}
`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Expected Output:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "id": 101,
  "name": "Go T-Shirt",
  "price": 25.99,
  "tags": [
    "clothing",
    "go",
    "programming"
  ],
  "isInStock": "true"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Using Tabs for Indentation:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// ... using the same Product struct and value as above ...

func main() {
\tproduct := Product{ /* ... values ... */ }

\t// Marshal with empty prefix and a tab for indent
\tjsonData, err := json.MarshalIndent(product, "", "\\t") // Use "\\t" for a tab
\tif err != nil {
\t\tfmt.Println("Error marshaling JSON:", err)
\t\treturn
\t\t}

\tfmt.Println(string(jsonData))
}
`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Expected Output:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
\t"id": 101,
\t"name": "Go T-Shirt",
\t"price": 25.99,
\t"tags": [
\t\t"clothing",
\t\t"go",
\t\t"programming"
\t],
\t"isInStock": "true"
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Using a Prefix:</h3>
        <p>
          The <code>prefix</code> string is added to the beginning of *every* line, including the first and the closing
          brace/bracket. This is less common for standard JSON formatting but can be useful for log messages or
          embedding JSON within other text formats.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// ... using the same Product struct and value as above ...

func main() {
\tproduct := Product{ /* ... values ... */ }

\t// Marshal with prefix "LOG: " and two spaces for indent
\tjsonData, err := json.MarshalIndent(product, "LOG: ", "  ")
\tif err != nil {
\t\tfmt.Println("Error marshaling JSON:", err)
\t\treturn
\t}

\tfmt.Println(string(jsonData))
}
`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Expected Output:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`LOG: {
LOG:   "id": 101,
LOG:   "name": "Go T-Shirt",
LOG:   "price": 25.99,
LOG:   "tags": [
LOG:     "clothing",
LOG:     "go",
LOG:     "programming"
LOG:   ],
LOG:   "isInStock": "true"
LOG: }`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Handling Different Data Types</h2>
        <p>
          <code>json.MarshalIndent</code> works seamlessly with various Go data types that can be encoded to JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Structs:</strong> Fields are encoded based on their exported names or `json` struct tags.
          </li>
          <li>
            <strong>Maps:</strong> Maps with string keys are encoded as JSON objects.
          </li>
          <li>
            <strong>Slices/Arrays:</strong> Encoded as JSON arrays.
          </li>
          <li>
            <strong>Primitive Types:</strong> Numbers, strings, booleans, null (for `nil` pointers/interfaces) are
            encoded directly.
          </li>
        </ul>
        <p>
          Struct tags (`json:"..."`) are crucial for controlling how fields are named, omitted (`omitempty`), or encoded
          (`string`).
        </p>

        <h2 className="text-2xl font-semibold mt-8">Streaming JSON Encoding</h2>
        <p>
          For very large JSON objects or arrays, marshaling the entire structure into memory using <code>Marshal</code>{" "}
          or <code>MarshalIndent</code> might consume excessive memory. In such cases, streaming encoders are preferred.
        </p>
        <p>
          The <code>json.NewEncoder</code> function creates an encoder that writes directly to an <code>io.Writer</code>{" "}
          (like <code>os.Stdout</code>, an <code>http.ResponseWriter</code>, or a file).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Streaming Encoder Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`package main

import (
\t"encoding/json"
\t"os" // We'll write to standard output
)

type Item struct {
\tName  string \`json:"name"\`
\tValue int    \`json:"value"\`
}

func main() {
\titems := []Item{
\t\t{Name: "Apple", Value: 1},
\t\t{Name: "Banana", Value: 2},
\t\t{Name: "Cherry", Value: 3},
\t}

\t// Create a new encoder that writes to os.Stdout
\tencoder := json.NewEncoder(os.Stdout)

\t// To get indented output with the encoder, use SetIndent
\tencoder.SetIndent("", "  ") // Prefix "", Indent "  "

\t// Encode the slice of items. It will be written directly to os.Stdout, formatted.
\terr := encoder.Encode(items)
\tif err != nil {
\t\t// Handle error
\t\treturn
\t}

\t// The output is streamed to os.Stdout, formatted.
}
`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4">Expected Output (to Standard Output):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`[
  {
    "name": "Apple",
    "value": 1
  },
  {
    "name": "Banana",
    "value": 2
  },
  {
    "name": "Cherry",
    "value": 3
  }
]`}
            </pre>
          </div>
        </div>
        <p>
          Using <code>json.NewEncoder</code> with <code>SetIndent</code> is the most efficient way to output formatted
          JSON directly to a stream or response writer without buffering the entire formatted string in memory first.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Go's <code>encoding/json</code> package provides simple yet powerful functions for formatting JSON output. For
          most common use cases, <code>json.MarshalIndent</code> with appropriate <code>prefix</code>
          and <code>indent</code> strings is sufficient. For scenarios involving large datasets or direct output to
          network connections/files, the streaming approach with <code>json.NewEncoder</code>
          and <code>SetIndent</code> offers a more memory-efficient solution. Understanding these standard library tools
          is fundamental for effective JSON handling in Go applications.
        </p>
      </div>
    </>
  );
}
