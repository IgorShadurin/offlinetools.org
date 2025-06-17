import type { Metadata } from "next";
import {
  Code,
  AlignLeft, // Replaced TextInsert with AlignLeft
  Indent,
  Eye,
  FileText,
  FastForward,
  Settings,
} from "lucide-react"; // Using lucide-react for icons

export const metadata: Metadata = {
  title: "Delphi/Pascal JSON Formatting Components | Developer Resources",
  description:
    "Explore how Delphi and Pascal components and libraries can be used to format and pretty-print JSON data for improved readability and debugging.",
};

export default function DelphiPascalJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="mr-3" size={32} /> Delphi/Pascal JSON Formatting Components
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" size={24} /> Understanding JSON Formatting
          </h2>
          <p className="mb-4">
            JSON (JavaScript Object Notation) is a ubiquitous data interchange format. While its structure is simple and
            easy for machines to parse and generate, the raw string output can often be hard for humans to read,
            especially when dealing with large or deeply nested data.
          </p>
          <p>
            <strong>JSON Formatting</strong>, also known as Pretty-Printing, involves adding whitespace (spaces, tabs,
            newlines) to the raw JSON string to make its hierarchical structure visually clear. This is invaluable for
            debugging, logging, and manual inspection of data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Indent className="mr-2" size={24} /> JSON in the Delphi/Pascal Ecosystem
          </h2>
          <p className="mb-4">
            Delphi and other Pascal dialects have robust capabilities for handling JSON. Modern Delphi versions (since
            XE) include the <code>System.JSON</code> unit within the RTL (Runtime Library), providing classes for
            parsing, generating, and manipulating JSON values (objects, arrays, strings, numbers, booleans, null).
          </p>
          <p>
            While parsing raw JSON into objects and generating JSON strings from objects are primary functions, the
            ability to *format* the resulting JSON string is a key aspect of developer productivity. JSON components and
            libraries in this ecosystem typically offer specific features or methods for this purpose.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlignLeft className="mr-2" size={24} /> Core Formatting Features
          </h2>
          <p>
            JSON formatting components or features within libraries provide control over how the output string looks.
            The most common features include:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="font-medium">Pretty-Printing / Indentation:</strong> Adds newlines after commas and
              colons, and uses indentation (spaces or tabs) to represent nesting levels. This is the most common form of
              formatting for readability.
            </li>
            <li>
              <strong className="font-medium">Compact Formatting:</strong> Removes all non-essential whitespace to
              produce the smallest possible JSON string. Useful for transmission where bandwidth is a concern.
            </li>
            <li>
              <strong className="font-medium">Key Sorting:</strong> Optionally sorts the keys within JSON objects
              alphabetically. This can make comparing different versions of the same object easier.
            </li>
            <li>
              <strong className="font-medium">Custom Indentation:</strong>
              Allows specifying the character (space or tab) and the number of characters used for each indentation
              level.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2" size={24} /> Conceptual Usage in Delphi/Pascal
          </h2>
          <p className="mb-4">
            While the exact class names and methods vary slightly depending on the specific library (e.g., built-in RTL
            vs. third-party), the general pattern for formatting JSON involves parsing the input string into an
            in-memory JSON structure and then serializing that structure back into a string with formatting options
            applied.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Basic Pretty-Printing (Conceptual RTL approach)</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm mb-2 italic">
              Assuming you have a <code>TJSONValue</code> variable <code>MyJsonData</code> representing your parsed
              JSON.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`uses System.JSON;

var
  MyJsonString: string;
  MyJsonData: TJSONValue;
  FormattedJsonString: string;
begin
  MyJsonString := '{"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"]}';

  // Parse the string into a JSON object/value structure
  MyJsonData := TJSONObject.ParseJSONValue(MyJsonString);

  if Assigned(MyJsonData) then
  begin
    // Format the JSON data with indentation
    // Many components provide a method like ToString or ToFormattedString
    // In RTL, you might use a TJsonWriter with specific options
    var Writer := TJsonTextWriter.Create;
    Writer.Formatting := TJsonFormatting.Indented; // This is the key option

    MyJsonData.WriteTo(Writer); // Write the JSON structure to the writer
    FormattedJsonString := Writer.ToString; // Get the formatted string

    Writeln('Original JSON: ' + MyJsonString);
    Writeln('Formatted JSON:');
    Writeln(FormattedJsonString); // Output the formatted string

    MyJsonData.Free; // Clean up the parsed object
    Writer.Free; // Clean up the writer
  end
  else
    Writeln('Failed to parse JSON.');
end;
`}
              </pre>
            </div>
            <p className="text-sm mt-2 italic">
              (Note: The exact implementation details, especially using <code>TJsonTextWriter</code>, might vary
              slightly or be wrapped in helper functions depending on the specific Delphi version or third-party
              library, but the concept of setting a formatting option before writing the JSON structure is common.)
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Compact Formatting (Conceptual RTL approach)</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm mb-2 italic">
              Starting with the same <code>MyJsonData</code>.
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`// ... (assuming MyJsonData is parsed as in the previous example)

var
  Writer := TJsonTextWriter.Create;
  // Default Formatting is TJsonFormatting.None, which is compact
  Writer.Formatting := TJsonFormatting.None; // Explicitly set for clarity

  MyJsonData.WriteTo(Writer);
  CompactJsonString := Writer.ToString;

  Writeln('Compact JSON:');
  Writeln(CompactJsonString);

  Writer.Free; // Clean up the writer
// MyJsonData should be freed when done, as in the previous example
`}
              </pre>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Example: Custom Indentation (Conceptual)</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm mb-2 italic">
              Some libraries allow specifying the indentation string (e.g., 2 spaces, 4 spaces, or a tab).
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`// ... (assuming MyJsonData is parsed)

var
  Writer := TJsonTextWriter.Create;
  Writer.Formatting := TJsonFormatting.Indented;
  // Some libraries or writers might have a property like IndentString
  // This is conceptual, check your specific library's documentation
  if Writer is IJsonTextWriterEx then // Example of checking for extended features
    (Writer as IJsonTextWriterEx).IndentString := '  '; // Use 2 spaces for indentation

  MyJsonData.WriteTo(Writer);
  FormattedJsonStringWith2Spaces := Writer.ToString;

  Writeln('Formatted JSON (2-space indent):');
  Writeln(FormattedJsonStringWith2Spaces);

  Writer.Free;
`}
              </pre>
            </div>
            <p className="text-sm mt-2 italic">
              (Again, the exact mechanism for setting custom indentation varies significantly between libraries).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="mr-2" size={24} /> Benefits for Developers
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="font-medium">Improved Readability:</strong> The most obvious benefit. Well-formatted
              JSON is easy to scan and understand the data structure at a glance.
            </li>
            <li>
              <strong className="font-medium">Easier Debugging:</strong> When inspecting JSON logs or responses during
              debugging, formatting makes it simple to pinpoint specific values or structural issues.
            </li>
            <li>
              <strong className="font-medium">Consistent Output:</strong>
              Formatting features ensure that the JSON generated by your application has a consistent style, which is
              helpful when comparing outputs or adhering to standards.
            </li>
            <li>
              <strong className="font-medium">Learning and Exploration:</strong>
              Viewing complex JSON in a pretty-printed format helps developers understand unfamiliar data structures
              returned by APIs or used in configurations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FastForward className="mr-2" size={24} /> Performance Considerations
          </h2>
          <p>
            While formatting is useful, especially during development or for human consumption, it's important to
            consider performance implications when dealing with very large JSON data or high-throughput scenarios.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong className="font-medium">Processing Time:</strong> Parsing, holding the structure in memory, and
              then formatting can add overhead compared to simply processing a data stream.
            </li>
            <li>
              <strong className="font-medium">Memory Usage:</strong> For extremely large JSON, loading the entire
              structure into memory before formatting might be inefficient or impossible on systems with limited
              resources.
            </li>
            <li>
              <strong className="font-medium">Output Size:</strong> Formatted JSON strings are significantly larger than
              their compact counterparts due to the added whitespace.
            </li>
          </ul>
          <p className="mt-4">
            For production scenarios where JSON is exchanged between systems (e.g., microservices, APIs), compact
            formatting is usually preferred to minimize bandwidth and processing time. Pretty-printing is best suited
            for developer tooling, logs, configuration files, and manual analysis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2" size={24} /> Choosing the Right Approach
          </h2>
          <p>
            For most common tasks in modern Delphi, the built-in <code>System.JSON</code> unit provides sufficient
            functionality for both parsing and formatting. Its <code>TJsonTextWriter</code> class with the{" "}
            <code>Formatting</code> option handles standard pretty-printing and compact output.
          </p>
          <p className="mt-4">
            However, several excellent third-party libraries exist (e.g., SynCommons/mORMot, DklJson, etc.) that might
            offer additional features like:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Higher performance parsing/writing.</li>
            <li>More advanced formatting options (e.g., comment handling, specific order).</li>
            <li>Streaming support for very large files.</li>
            <li>Tighter integration with object serialization/deserialization.</li>
          </ul>
          <p className="mt-4">
            When choosing, consider your project's specific needs: Are you dealing with extremely large JSON? Do you
            need custom formatting rules? Is maximum parsing/writing speed critical? For standard use cases, the RTL is
            usually a solid starting point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" size={24} /> Conclusion
          </h2>
          <p>
            JSON formatting components are essential tools in the Delphi/Pascal developer's toolkit. They transform
            machine-optimized JSON strings into human-readable formats, significantly improving the development
            experience, especially during debugging and data inspection. Whether using the built-in{" "}
            <code>System.JSON</code> unit or a specialized third-party library, understanding how to effectively
            pretty-print and compact JSON is a valuable skill for working with modern data formats.
          </p>
        </section>
      </div>
    </>
  );
}
