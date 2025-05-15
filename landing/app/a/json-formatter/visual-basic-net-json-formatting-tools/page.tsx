import type { Metadata } from "next";
import {
  Code,
  Eye,
  Minimize2,
  Settings,
  Zap,
  Info,
  FileJson,
  Layers,
  Wrench, // Replaced Tool with Wrench
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Basic .NET JSON Formatting Tools & Techniques | Developer Guide",
  description:
    "Explore built-in techniques and best practices for formatting JSON data in Visual Basic .NET using System.Text.Json for readability and compactness.",
};

export default function VbNetJsonFormattingToolsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson className="w-8 h-8" />
        <span>Visual Basic .NET JSON Formatting</span>
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Info className="w-6 h-6 text-blue-500" />
            <span>Why Format JSON in VB.NET?</span>
          </h2>
          <p>
            Working with JSON (JavaScript Object Notation) is a common task in modern software development,
            especially when dealing with web services, APIs, and configuration files. In Visual Basic .NET,
            you'll frequently need to serialize .NET objects into JSON strings or deserialize JSON strings into
            .NET objects. Beyond simple conversion, controlling the *format* of the output JSON is crucial for
            various reasons:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Readability:</strong> Pretty-printing (indenting and adding line breaks) makes JSON
              easier for humans to read and debug. This is vital during development and testing.
            </li>
            <li>
              <strong>Compactness:</strong> Removing unnecessary whitespace (minifying) reduces the size of the
              JSON string. This is important for performance, especially when transferring data over networks,
              saving storage space, or for configuration files where size matters.
            </li>
            <li>
              <strong>Consistency:</strong> Ensuring consistent formatting across your application improves code
              maintainability and reduces merge conflicts when multiple developers work on JSON-related code.
            </li>
          </ul>
          <p className="mt-4">
            Visual Basic .NET, particularly in modern .NET versions (.NET Core, .NET 5+), provides powerful
            built-in capabilities to handle JSON formatting. This guide focuses on the standard{" "}
            <code>System.Text.Json</code> library.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Settings className="w-6 h-6 text-green-500" />
            <span>Using System.Text.Json for Formatting</span>
          </h2>
          <p>
            The <code>System.Text.Json</code> namespace provides high-performance, low-allocating JSON APIs.
            It's the recommended built-in solution for .NET. Formatting options are controlled using the{" "}
            <code>JsonSerializerOptions</code> class.
          </p>

          <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Pretty-Printing (Indented Formatting)</span>
          </h3>
          <p className="mt-2">
            To make the JSON output human-readable, you set the <code>WriteIndented</code> property of{" "}
            <code>JsonSerializerOptions</code> to <code>True</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2 flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>VB.NET Example: Pretty Print</span>
            </h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`Imports System.Text.Json
Imports System.Text.Json.Serialization

Public Class Product
    Public Property Name As String
    Public Property Price As Decimal
    Public Property Tags As List(Of String)
End Class

Public Module JsonFormatter

    Public Sub FormatExample()
        Dim product As New Product With {
            .Name = "Laptop",
            .Price = 999.99D,
            .Tags = New List(Of String)({"electronics", "computer", "portable"})
        }

        ' Configure options for indented output
        Dim options As New JsonSerializerOptions With {
            .WriteIndented = True
        }

        ' Serialize the object to JSON with indentation
        Dim jsonString = JsonSerializer.Serialize(product, options)

        Console.WriteLine("Pretty-Printed JSON:")
        Console.WriteLine(jsonString)

        ' Expected Output (structure):
        '{
        '  "Name": "Laptop",
        '  "Price": 999.99,
        '  "Tags": [
        '    "electronics",
        '    "computer",
        '    "portable"
        '  ]
        '}'

    End Sub

End Module`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            This will produce JSON output with line breaks and indentation, making the hierarchy of the data
            structure visually clear.
          </p>

          <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
            <Minimize2 className="w-5 h-5" />
            <span>Compact Formatting (Minified)</span>
          </h3>
          <p className="mt-2">
            For a compact output, simply omit the <code>JsonSerializerOptions</code> or set{" "}
            <code>WriteIndented</code> to <code>False</code> (which is the default behavior).
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2 flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>VB.NET Example: Compact Format</span>
            </h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`Imports System.Text.Json
Imports System.Text.Json.Serialization

Public Class Product
    Public Property Name As String
    Public Property Price As Decimal
    Public Property Tags As List(Of String)
End Class

Public Module JsonFormatter

    Public Sub CompactExample()
        Dim product As New Product With {
            .Name = "Laptop",
            .Price = 999.99D,
            .Tags = New List(Of String)({"electronics", "computer", "portable"})
        }

        ' Default options (compact)
        Dim options As New JsonSerializerOptions With {
             .WriteIndented = False ' Or just use New JsonSerializerOptions()
        }

        ' Serialize the object to JSON without indentation
        Dim jsonString = JsonSerializer.Serialize(product, options)
        ' Or simply: Dim jsonString = JsonSerializer.Serialize(product) ' Uses default compact options

        Console.WriteLine("Compact JSON:")
        Console.WriteLine(jsonString)

        ' Expected Output:
        '{"Name":"Laptop","Price":999.99,"Tags":["electronics","computer","portable"]}'

    End Sub

End Module`}
              </pre>
            </div>
          </div>
          <p className="mt-4">
            This format removes all non-essential whitespace, resulting in the smallest possible JSON string for the data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Layers className="w-6 h-6 text-purple-500" />
            <span>Other JsonSerializerOptions</span>
          </h2>
          <p>
            Beyond indentation, <code>JsonSerializerOptions</code> offers several other properties that can
            influence the output format and behavior:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <code>PropertyNamingPolicy</code>: Controls how property names are written (e.g., camelCase, PascalCase).
              <br />
              <code className="text-sm">
                <code>New JsonSerializerOptions With {`{ .PropertyNamingPolicy = JsonNamingPolicy.CamelCase }`}</code>
              </code>
            </li>
            <li>
              <code>DictionaryKeyPolicy</code>: Controls how dictionary keys are written.
            </li>
            <li>
              <code>DefaultIgnoreCondition</code>: Specifies when properties should be ignored during serialization (e.g., ignore null values).
              <br />
              <code className="text-sm">
                <code>New JsonSerializerOptions With {`{ .DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull }`}</code>
              </code>
            </li>
            <li>
              <code>Converters</code>: Allows for custom handling of specific types (e.g., formatting dates).
            </li>
            <li>
              <code>Encoder</code>: Allows control over character escaping.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h4 className="text-lg font-medium mb-2 flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>VB.NET Example: Camel Case + Ignore Null</span>
            </h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`Imports System.Text.Json
Imports System.Text.Json.Serialization

Public Class UserProfile
    Public Property UserId As Integer
    Public Property UserName As String
    Public Property Email As String? ' Nullable String
    Public Property IsActive As Boolean
End Class

Public Module JsonFormatter

    Public Sub AdvancedOptionsExample()
        Dim user1 As New UserProfile With {
            .UserId = 101,
            .UserName = "Alice",
            .Email = "alice@example.com",
            .IsActive = True
        }

         Dim user2 As New UserProfile With {
            .UserId = 102,
            .UserName = "Bob",
            .Email = Nothing, ' Email is null
            .IsActive = False
        }

        ' Configure options for camelCase, ignore null, and pretty print
        Dim options As New JsonSerializerOptions With {
            .PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            .DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            .WriteIndented = True
        }

        Dim jsonString1 = JsonSerializer.Serialize(user1, options)
        Dim jsonString2 = JsonSerializer.Serialize(user2, options)

        Console.WriteLine("User 1 JSON (CamelCase, No Nulls, Indented):")
        Console.WriteLine(jsonString1)
        ' Expected:
        '{
        '  "userId": 101,
        '  "userName": "Alice",
        '  "email": "alice@example.com",
        '  "isActive": true
        '}'

        Console.WriteLine(Environment.NewLine & "User 2 JSON (CamelCase, No Nulls, Indented):")
        Console.WriteLine(jsonString2)
        ' Expected:
        '{
        '  "userId": 102,
        '  "userName": "Bob",
        '  "isActive": false
        '}'

    End Sub

End Module`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Zap className="w-6 h-6 text-orange-500" />
            <span>Performance Considerations</span>
          </h2>
          <p>
            While formatting adds a tiny overhead compared to plain serialization, <code>System.Text.Json</code> is
            optimized for performance.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Pretty-printing</strong> involves writing extra characters (whitespace, newlines), which
              slightly increases processing time and output size. Use it primarily where human readability is required.
            </li>
            <li>
              <strong>Compact formatting</strong> minimizes output size and is generally preferred for network
              transport or storage to reduce bandwidth and disk usage.
            </li>
          </ul>
          <p className="mt-4">
            For most applications, the performance difference between indented and compact formatting with{" "}
            <code>System.Text.Json</code> will be negligible unless you are dealing with extremely large JSON documents
            or high-throughput scenarios where every millisecond counts.
          </p>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Wrench className="w-6 h-6 text-teal-500" /> {/* Used Wrench icon */}
            <span>Tooling and Workflow</span>
          </h2>
          <p>
            While you can format JSON programmatically in VB.NET, developers often use external tools
            or IDE extensions for interactive formatting during development or when inspecting JSON data.
            However, understanding the programmatic approach is essential for applications that generate
            or process JSON dynamically.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>IDEs:</strong> Visual Studio often has built-in or extension-based JSON formatters
              that you can use directly on JSON files or strings within the editor.
            </li>
            <li>
              <strong>Online Formatters:</strong> Many websites offer free JSON formatting services. Use
              these with caution for sensitive data.
            </li>
            <li>
              <strong>Command-Line Tools:</strong> Tools like <code>jq</code> (though not VB.NET specific)
              are powerful for processing and formatting JSON from the command line.
            </li>
          </ul>
          <p className="mt-4">
            Remember that the VB.NET formatting capabilities discussed here are about *generating* JSON in a specific
            format from your .NET objects, or less commonly, re-serializing existing JSON strings using desired options.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Info className="w-6 h-6 text-blue-500" />
            <span>Conclusion</span>
          </h2>
          <p>
            Formatting JSON in Visual Basic .NET is straightforward using the built-in{" "}
            <code>System.Text.Json</code> library and the <code>JsonSerializerOptions</code> class.
            Whether you need human-readable, indented output for debugging or compact, minified JSON
            for performance and size efficiency, the framework provides the necessary tools.
            Understanding how to configure these options is a valuable skill for any VB.NET developer
            working with JSON data.
          </p>
        </section>

      </div>
    </>
  );
}
