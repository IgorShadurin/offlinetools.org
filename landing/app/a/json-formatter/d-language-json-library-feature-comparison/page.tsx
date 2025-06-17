import type { Metadata } from "next";
import { Book, Package, Zap, Feather, Boxes } from "lucide-react";

export const metadata: Metadata = {
  title: "D Language JSON Library Feature Comparison | Offline Tools",
  description:
    "Compare features, performance, and usability of D programming language JSON libraries, focusing on std.json and third-party options.",
};

export default function DJsonLibraryComparison() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">D Language JSON Library Feature Comparison</h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data interchange format. For D developers, processing JSON
          is a common task, whether it&apos;s parsing configuration files, interacting with web APIs, or
          serializing/deserializing data structures. The D ecosystem offers several ways to handle JSON, primarily
          through its standard library and various third-party packages. Understanding the strengths and weaknesses of
          these options is crucial for choosing the right tool for your specific needs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Book className="mr-3 text-blue-500" size={28} />
          <code>std.json</code>: The Standard Library Offering
        </h2>
        <p>
          D&apos;s standard library, Phobos, includes a robust JSON module: <code>std.json</code>. This module provides
          fundamental capabilities for parsing JSON strings into a D representation and serializing D data into JSON
          strings.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Key Features of <code>std.json</code>:
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing:</strong> Convert a JSON string into a tree-like structure of <code>JSONValue</code>{" "}
            objects.
          </li>
          <li>
            <strong>Serialization:</strong> Convert <code>JSONValue</code> objects back into a JSON string.
          </li>
          <li>
            <strong>Serialization of D types:</strong> Easily serialize D structs, classes, and primitive types into
            JSON using the <code>serialize</code> function.
          </li>
          <li>
            <strong>Deserialization to D types:</strong> Convert JSON data directly into instances of D structs or
            classes (though this often requires careful mapping or helper functions, or relies on convention). The{" "}
            <code>deserialize</code> function handles this based on type introspection.
          </li>
          <li>
            <strong>Error Handling:</strong> Provides exceptions for invalid JSON syntax during parsing.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          Using <code>std.json</code> - Examples:
        </h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Parsing JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`import std.json;
import std.stdio;

void main() {
    string jsonString = \`{
        "name": "Alice",
        "age": 30,
        "isStudent": false,
        "courses": ["Math", "Science"],
        "address": {
            "city": "Wonderland",
            "zip": "12345"
        },
        "isNullValue": null
    }\`;

    try {
        JSONValue data = parseJSON(jsonString);

        // Accessing values
        writeln("Name: ", data["name"].str); // Access string
        writeln("Age: ", data["age"].integer); // Access integer
        writeln("Is Student: ", data["isStudent"].boolean); // Access boolean
        writeln("First Course: ", data["courses"][0].str); // Access array element

        // Accessing nested object
        writeln("City: ", data["address"]["city"].str);

        // Checking type and value
        if (data["isNullValue"].type == JSON_TYPE.NULL) {
            writeln("Null value exists.");
        }

        // Iterating over array
        writeln("Courses:");
        foreach (courseValue; data["courses"].array) {
            writeln("- ", courseValue.str);
        }

        // Iterating over object keys
        writeln("Address keys:");
        foreach (key, value; data["address"].object) {
            writeln("- ", key);
        }

    } catch (JSONException e) {
        writeln("Error parsing JSON: ", e.msg);
    }
}`}
              </code>
            </pre>
          </div>

          <h4 className="text-lg font-medium mb-2 mt-6">Creating JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`import std.json;
import std.stdio;

void main() {
    JSONValue obj = JSONValue(JSON_TYPE.OBJECT); // Create an empty object

    obj["product"] = JSONValue("Laptop"); // Add string value
    obj["price"] = JSONValue(1200.50); // Add number value
    obj["inStock"] = JSONValue(true); // Add boolean value
    obj["tags"] = JSONValue(JSON_TYPE.ARRAY); // Add an empty array

    obj["tags"].array ~= JSONValue("electronics"); // Append to array
    obj["tags"].array ~= JSONValue("computer");

    JSONValue dimensions = JSONValue(JSON_TYPE.OBJECT);
    dimensions["height"] = JSONValue(1.5);
    dimensions["width"] = JSONValue(14.0);
    dimensions["depth"] = JSONValue(10.0);

    obj["dimensions"] = dimensions; // Add a nested object

    obj["manufacturer"] = JSONValue(JSON_TYPE.NULL); // Add null value

    // Serialize the JSONValue to string
    string jsonString = obj.toString();
    writeln(jsonString);
}
`}
              </code>
            </pre>
          </div>

          <h4 className="text-lg font-medium mb-2 mt-6">Serializing D Types:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              <code>
                {`import std.json;
import std.stdio;
import std.conv;

struct User {
    string name;
    int age;
    bool active;
    string[] roles;
}

class Product {
    string id;
    double price;
    string description;
    int[] ratings;
}

void main() {
    User newUser = User("Bob", 25, true, ["editor", "viewer"]);
    Product newProduct = new Product("XYZ789", 49.99, "Gadget", [5, 4, 5]);

    // Serialize struct
    auto userJson = serialize(newUser);
    writeln("User JSON: ", userJson.toString());

    // Serialize class instance
    auto productJson = serialize(newProduct);
    writeln("Product JSON: ", productJson.toString());

    // Deserializing back (requires careful type handling or matching structure)
    // Note: Direct deserialize can be complex for arbitrary structures, often
    // easier if you know the target type structure matches the JSON.
    // Example:
    // string userJsonString = userJson.toString();
    // auto deserializedUser = deserialize!User(parseJSON(userJsonString));
    // writeln("Deserialized User Name: ", deserializedUser.name);
}
`}
              </code>
            </pre>
          </div>
        </div>

        <p>
          <code>std.json</code> is convenient because it&apos;s part of the standard library, meaning no extra
          dependencies are needed. Its API is relatively straightforward for basic parsing and creation. The{" "}
          <code>serialize</code>/<code>deserialize</code>
          functions leverage D&apos;s powerful compile-time reflection (`__traits(allMembers)`) to automatically handle
          conversion between D types and JSON, which is a major advantage for structured data. However,
          performance-sensitive applications or those needing advanced features like streaming might look elsewhere.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="mr-3 text-green-600" size={28} />
          Third-Party JSON Libraries
        </h2>
        <p>
          Beyond <code>std.json</code>, the D package ecosystem (DUB) hosts several libraries designed for JSON
          processing. These libraries often aim to provide alternative APIs, better performance, streaming capabilities,
          or more advanced features than the standard library.
        </p>

        <p>Examples of areas where third-party libraries might excel:</p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Zap className="inline mr-2 text-yellow-500" size={20} />
            <strong>Performance:</strong> Some libraries focus on raw parsing and serialization speed, potentially using
            different parsing algorithms or optimized data structures.
          </li>
          <li>
            <Feather className="inline mr-2 text-purple-500" size={20} />
            <strong>Ease of Use / API Style:</strong> Alternative APIs might feel more natural to some developers,
            perhaps offering a more fluent interface or different approaches to data access/manipulation.
          </li>
          <li>
            <Boxes className="inline mr-2 text-red-500" size={20} />
            <strong>Advanced Features:</strong>
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Streaming parsers for handling very large JSON files without loading everything into memory.</li>
              <li>More sophisticated or compile-time enforced schema validation.</li>
              <li>
                Different strategies for mapping JSON to D types (e.g., compile-time generation based on JSON
                structure).
              </li>
              <li>Better control over serialization format (indentation, sorting keys, etc.).</li>
            </ul>
          </li>
          <li>
            <strong>Integrated Solutions:</strong> Frameworks like vibe.d often include their own high-performance JSON
            utilities optimized for network applications, sometimes providing a more direct mapping to HTTP
            request/response bodies.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Considerations for Third-Party Libraries:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Dependencies:</strong> Adding a third-party library introduces a dependency to your project managed
            by DUB.
          </li>
          <li>
            <strong>Maturity and Maintenance:</strong> Evaluate the library&apos;s activity, community support, and
            documentation.
          </li>
          <li>
            <strong>Learning Curve:</strong> A new library means learning a new API and potentially different concepts
            (like streaming).
          </li>
          <li>
            <strong>Integration with Frameworks:</strong> If you are using a web framework like vibe.d, using its
            built-in JSON handling might be the most seamless approach.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Comparison Angles & When to Choose Which</h2>

        <h3 className="text-xl font-semibold mt-6">
          Use <code>std.json</code> When:
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>You need basic JSON parsing and serialization.</li>
          <li>You want zero external dependencies.</li>
          <li>
            You frequently serialize/deserialize D structs/classes and the automatic `serialize`/`deserialize`
            functionality is sufficient.
          </li>
          <li>
            Performance is not the absolute critical bottleneck (though `std.json` is generally quite performant for
            typical use cases).
          </li>
          <li>You prefer using only the standard library where possible.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Consider a Third-Party Library When:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Zap className="inline mr-2 text-yellow-500" size={20} /> You require maximum performance for very frequent
            or large JSON operations.
          </li>
          <li>
            <Boxes className="inline mr-2 text-red-500" size={20} /> You need advanced features like streaming parsing
            or complex custom serialization/deserialization strategies not easily supported by `std.json`.
          </li>
          <li>
            You are working within a framework (like vibe.d) that provides its own optimized JSON handling which
            integrates tightly with its other components.
          </li>
          <li>
            <Feather className="inline mr-2 text-purple-500" size={20} /> You find the API of a specific third-party
            library more intuitive or suitable for your project&apos;s architecture.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The D programming language offers solid options for working with JSON. <code>std.json</code> provides a
          convenient, dependency-free solution suitable for most common tasks, particularly excelling at automatic
          serialization of D types. For developers pushing the boundaries of performance, needing streaming
          capabilities, or seeking specific advanced features, exploring the DUB ecosystem for third-party JSON
          libraries is a worthwhile endeavor. By considering the specific requirements of your project – performance
          needs, feature requirements, ease of use, and dependency management comfort – you can select the JSON library
          that best empowers your D application.
        </p>
      </div>
    </>
  );
}
