import type { Metadata } from "next";
import { FileJson, Code, Settings, Lightbulb } from "lucide-react"; // Removed Speedometer

export const metadata: Metadata = {
  title: "C# and .NET JSON Formatter Implementation | Developer Guide",
  description:
    "A comprehensive guide on implementing JSON formatting (pretty-printing and compacting) in C# using System.Text.Json and Newtonsoft.Json, with code examples and performance tips.",
};

export default function CSharpJsonFormatterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-500" /> C# and .NET JSON Formatter Implementation
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange in modern
          applications. Whether you're building web APIs, configuration systems, or data storage solutions, you'll
          inevitably work with JSON. While parsing and serializing JSON are common tasks,{" "}
          <strong>JSON formatting</strong>
          is equally important for both human readability and machine efficiency.
        </p>
        <p>Formatting JSON typically involves controlling whitespace and indentation. The two primary styles are:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Pretty-Printing:</strong> Adding indentation and line breaks to make the JSON structure clear and
            easy for humans to read. Useful for debugging, configuration files, and documentation.
          </li>
          <li>
            <strong>Compacting:</strong> Removing all unnecessary whitespace (spaces, tabs, newlines) to minimize the
            size of the JSON string. Useful for reducing bandwidth in network communication or saving storage space.
          </li>
        </ul>
        <p>
          In this guide, we'll explore how to implement these formatting techniques in C# using the most common .NET
          libraries: the built-in `System.Text.Json` and the popular third-party `Newtonsoft.Json`.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" /> Understanding .NET's JSON Libraries
        </h2>
        <p>
          Before diving into formatting, it's crucial to understand the two major players in the .NET JSON ecosystem:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              <code>System.Text.Json</code> (STJ):
            </strong>{" "}
            Introduced in .NET Core 3.0 and the default in .NET 5+. It's designed for high performance, low memory
            allocation, and security. It's the recommended choice for new .NET applications.
          </li>
          <li>
            <strong>
              <code>Newtonsoft.Json</code> (Json.NET):
            </strong>{" "}
            A long-standing and very popular third-party library. It's feature-rich, flexible, and has a wide range of
            configuration options and support for complex scenarios (like handling circular references, custom
            conversions, etc.). Many existing .NET projects use it.
          </li>
        </ul>
        <p>Both libraries provide ways to serialize and deserialize JSON, and crucially, control its formatting.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-500" /> Implementing Formatting with System.Text.Json (STJ)
        </h2>
        <p>
          <code>System.Text.Json</code> provides formatting options primarily through the{" "}
          <code>JsonSerializerOptions</code> class when serializing objects or <code>Utf8JsonWriter</code> when writing
          JSON manually. For formatting an existing JSON string, you'll typically parse it into a Document Object Model
          (DOM) representation using <code>JsonDocument</code> and then write it out with formatting.
        </p>

        <h3 className="text-xl font-semibold mt-6">Pretty-Printing JSON with STJ</h3>
        <p>
          To pretty-print an object or a <code>JsonDocument</code>, you use <code>JsonSerializerOptions</code> with the{" "}
          <code>WriteIndented</code> property set to <code>true</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example: Pretty-Printing using <code>System.Text.Json</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using System.Text.Json;

public static class StjJsonFormatter
{
    public static string PrettyPrint(string jsonString)
    {
        try
        {
            // Option 1: Parse then write (best for already existing JSON strings)
            using (JsonDocument doc = JsonDocument.Parse(jsonString))
            {
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true // This is the key for pretty-printing
                };
                return JsonSerializer.Serialize(doc.RootElement, options);
            }

            /*
            // Option 2: Directly serialize an object with options
            // (If you have the object, not the string)
            // var myObject = new { Name = "Alice", Age = 30 };
            // var options = new JsonSerializerOptions { WriteIndented = true };
            // return JsonSerializer.Serialize(myObject, options);
            */
        }
        catch (JsonException ex)
        {
            // Handle invalid JSON input
            Console.WriteLine($"Error parsing JSON: {ex.Message}");
            return "Invalid JSON Input";
        }
    }
}

// Example Usage:
// string compactJson = "{\\"name\\":\\"Bob\\",\\"isStudent\\":true,\\"courses\\":[\\"Physics\\",\\"Chemistry\\"]}";
// string prettyJson = StjJsonFormatter.PrettyPrint(compactJson);
// Console.WriteLine(prettyJson);
/* Expected Output:
{
  "name": "Bob",
  "isStudent": true,
  "courses": [
    "Physics",
    "Chemistry"
  ]
}
*/`}
              </code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Compacting JSON with STJ</h3>
        <p>
          Compacting JSON with STJ is often simpler, as the default serialization behavior is to minimize whitespace.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example: Compacting using <code>System.Text.Json</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using System.Text.Json;

public static class StjJsonFormatter
{
    public static string Compact(string jsonString)
    {
        try
        {
            // Option 1: Parse then write (best for already existing JSON strings)
            using (JsonDocument doc = JsonDocument.Parse(jsonString))
            {
                // Default options do not include indentation, resulting in compact output
                var options = new JsonSerializerOptions
                {
                    // WriteIndented = false is the default, no need to set explicitly
                };
                return JsonSerializer.Serialize(doc.RootElement, options);
            }

            /*
            // Option 2: Directly serialize an object with default options
            // var myObject = new { Name = "Alice", Age = 30 };
            // return JsonSerializer.Serialize(myObject); // Default is compact
            */
        }
        catch (JsonException ex)
        {
            // Handle invalid JSON input
            Console.WriteLine($"Error parsing JSON: {ex.Message}");
            return "Invalid JSON Input";
        }
    }
}

// Example Usage:
// string prettyJson = @"
// {
//   ""name"": ""Charlie"",
//   ""city"": ""London""
// }";
// string compactJson = StjJsonFormatter.Compact(prettyJson);
// Console.WriteLine(compactJson);
/* Expected Output:
{"name":"Charlie","city":"London"}
*/`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          Notice that for compacting, you often don't need special options; the default serialization behavior handles
          it.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Using <code>JsonDocument</code> for Flexibility
        </h3>
        <p>
          When formatting an arbitrary JSON string (not an object you've just created), parsing it into a{" "}
          <code>JsonDocument</code> first, as shown in the examples, is the standard approach.
          <code>JsonDocument</code> provides a read-only DOM that represents the JSON structure. You can then write this
          structure back out with different formatting options. This is efficient because it avoids full deserialization
          into C# objects if you only need to reformat.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-500" /> Implementing Formatting with Newtonsoft.Json
        </h2>
        <p>
          <code>Newtonsoft.Json</code> uses <code>JsonConvert.SerializeObject</code> with the <code>Formatting</code>{" "}
          enumeration to control indentation. It also provides a powerful JObject/JArray (LINQ to JSON) API for working
          with JSON as a dynamic object model.
        </p>

        <h3 className="text-xl font-semibold mt-6">Pretty-Printing JSON with Newtonsoft.Json</h3>
        <p>
          Pretty-printing with Newtonsoft is done by setting the <code>Formatting</code> parameter of{" "}
          <code>JsonConvert.SerializeObject</code> to <code>Formatting.Indented</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example: Pretty-Printing using <code>Newtonsoft.Json</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using Newtonsoft.Json;
using Newtonsoft.Json.Linq; // Required for JObject/JArray parsing

public static class NewtonsoftJsonFormatter
{
    public static string PrettyPrint(string jsonString)
    {
        try
        {
            // Option 1: Parse then write (best for already existing JSON strings)
            // JToken is the base class for JObject, JArray, JValue etc.
            JToken parsedJson = JToken.Parse(jsonString);

            // Formatting.Indented applies indentation
            return parsedJson.ToString(Formatting.Indented);

            /*
            // Option 2: Directly serialize an object with formatting
            // (If you have the object, not the string)
            // var myObject = new { Product = "Book", Price = 19.95 };
            // return JsonConvert.SerializeObject(myObject, Formatting.Indented);
            */
        }
        catch (JsonReaderException ex)
        {
            // Handle invalid JSON input
            Console.WriteLine($"Error parsing JSON: {ex.Message}");
            return "Invalid JSON Input";
        }
    }
}

// Example Usage:
// string compactJson = "{\\"id\\":101,\\"active\\":false}";
// string prettyJson = NewtonsoftJsonFormatter.PrettyPrint(compactJson);
// Console.WriteLine(prettyJson);
/* Expected Output:
{
  "id": 101,
  "active": false
}
*/`}
              </code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Compacting JSON with Newtonsoft.Json</h3>
        <p>
          To compact JSON using Newtonsoft.Json, you can either omit the <code>Formatting</code>
          parameter or explicitly set it to <code>Formatting.None</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            Example: Compacting using <code>Newtonsoft.Json</code>
          </h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public static class NewtonsoftJsonFormatter
{
    public static string Compact(string jsonString)
    {
        try
        {
            // Option 1: Parse then write (best for already existing JSON strings)
            JToken parsedJson = JToken.Parse(jsonString);

            // Formatting.None removes indentation (this is often the default)
            return parsedJson.ToString(Formatting.None);

            /*
            // Option 2: Directly serialize an object without formatting parameter
            // var myObject = new { Item = "Laptop", Qty = 1 };
            // return JsonConvert.SerializeObject(myObject); // Default is compact
            */
        }
        catch (JsonReaderException ex)
        {
            // Handle invalid JSON input
            Console.WriteLine($"Error parsing JSON: {ex.Message}");
            return "Invalid JSON Input";
        }
    }
}

// Example Usage:
// string prettyJson = @"
// {
//   ""status"": ""Ok"",
//   ""code"": 200
// }";
// string compactJson = NewtonsoftJsonFormatter.Compact(prettyJson);
// Console.WriteLine(compactJson);
/* Expected Output:
{"status":"Ok","code":200}
*/`}
              </code>
            </pre>
          </div>
        </div>
        <p>
          Similar to STJ, the default behavior for <code>JsonConvert.SerializeObject</code>
          when no <code>Formatting</code> option is specified is typically to produce compact JSON.
        </p>

        <h3 className="text-xl font-semibold mt-6">Using JObject/JArray for Manipulation</h3>
        <p>
          Newtonsoft's LINQ to JSON API (<code>JObject</code>, <code>JArray</code>, <code>JValue</code>, etc.) is very
          powerful for reading, modifying, and writing JSON structures dynamically without mapping to C# classes. When
          you use <code>JToken.Parse</code> or <code>JObject.Parse</code>/<code>JArray.Parse</code>, you get a mutable
          DOM that you can manipulate before writing it back out using <code>ToString()</code> with the desired{" "}
          <code>Formatting</code>. This is useful for more complex formatting tasks, like sorting object keys.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          {/* Removed Speedometer */} Performance Considerations
        </h2>
        <p>
          For typical use cases, both STJ and Newtonsoft are fast enough for formatting. However, when dealing with very
          large JSON strings or processing JSON in performance-critical loops, consider the following:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing Cost:</strong> Converting a JSON string into a DOM (<code>JsonDocument</code> or{" "}
            <code>JToken</code>) requires reading and understanding the entire string. This parsing step is often the
            most expensive part.
          </li>
          <li>
            <strong>STJ vs. Newtonsoft:</strong> Generally, <code>System.Text.Json</code> is designed to be faster and
            allocate less memory than <code>Newtonsoft.Json</code> for common scenarios, especially parsing and
            serialization. If performance is paramount and STJ meets your feature needs, it's the preferred choice.
          </li>
          <li>
            <strong>Streaming:</strong> For extremely large JSON files that don't fit comfortably in memory, consider
            using streaming APIs (like <code>Utf8JsonReader</code> and <code>Utf8JsonWriter</code>
            in STJ, or <code>JsonReader</code> and <code>JsonWriter</code> in Newtonsoft). These allow you to process
            the JSON token by token without building a full in-memory DOM. Formatting directly via streaming writers
            gives you fine-grained control but is more complex than using the DOM approach.
          </li>
        </ul>
        <p>
          For simple pretty-printing or compacting of strings that fit in memory, the parse-then-write approach with{" "}
          <code>JsonDocument</code> (STJ) or <code>JToken</code> (Newtonsoft) is idiomatic and readable.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-500" /> Choosing the Right Tool
        </h2>
        <p>
          The choice between <code>System.Text.Json</code> and <code>Newtonsoft.Json</code> for JSON formatting depends
          on your project's context:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>New Projects (.NET Core 3.0+ / .NET 5+):</strong> Start with <code>System.Text.Json</code>. It's
            built-in, high-performance, and sufficient for most formatting tasks (pretty/compact).
          </li>
          <li>
            <strong>Existing Projects using Newtonsoft:</strong> Continue using <code>Newtonsoft.Json</code>
            for consistency. It's well-maintained and provides powerful formatting options including its flexible LINQ
            to JSON API for more complex manipulations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing JSON formatting in C# is a straightforward task thanks to the capabilities of both{" "}
          <code>System.Text.Json</code> and <code>Newtonsoft.Json</code>. Whether you need to enhance readability
          through pretty-printing or optimize size by compacting, the core methods involve utilizing serialization
          options or writing from a parsed JSON structure with specific formatting flags. Understanding the strengths of
          each library allows you to pick the best approach for your specific formatting needs within the .NET
          ecosystem.
        </p>
      </div>
    </>
  );
}
