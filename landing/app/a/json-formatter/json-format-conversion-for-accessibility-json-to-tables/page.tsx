import type { Metadata } from "next";
import { Accessibility, Table2, Code, CheckCheck, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON to Tables for Accessibility | Format Conversion Guide",
  description:
    "Learn how to convert JSON data into accessible HTML tables to improve usability for screen reader users and assistive technologies.",
};

export default function JsonToTablesAccessibilityArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Table2 className="mr-3" size={30} /> JSON to Tables for Accessibility
      </h1>

      <div className="space-y-6">
        <p>
          Structured data is everywhere, and JSON is a common format for representing it. However, raw JSON data, while
          machine-readable, is not inherently accessible to humans, especially those using screen readers or other
          assistive technologies. Converting JSON data into a semantically appropriate and well-structured format is
          crucial for creating inclusive web experiences. One powerful way to do this is by transforming JSON into HTML
          tables, leveraging the built-in accessibility features of the table element.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Accessibility className="mr-2" /> Why Convert JSON to Accessible Tables?
        </h2>
        <p>
          Screen readers and other assistive technologies rely on the semantic structure of HTML to understand the
          relationships between pieces of content. While a simple list or series of paragraphs might display data
          visually, it often fails to convey the connections and structure inherent in tabular data (like spreadsheets
          or databases).
        </p>
        <p>
          HTML tables provide this crucial structure. With proper semantic markup (like <code>&lt;thead&gt;</code>,{" "}
          <code>&lt;tbody&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>), screen readers can:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Identify row and column headers (e.g., "This is the value for the 'Name' column in the third row").</li>
          <li>Navigate cell by cell, understanding the header associated with each cell.</li>
          <li>Understand the purpose of the table via a caption.</li>
          <li>Grasp the overall structure of the data.</li>
        </ul>
        <p>
          Converting JSON, which often represents structured records, into an accessible HTML table makes that data
          comprehensible and navigable for everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCheck className="mr-2" /> Key Accessibility Features of HTML Tables
        </h2>
        <p>To make an HTML table accessible, you need to use specific elements and attributes correctly:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              <code>&lt;table&gt;</code>:
            </strong>{" "}
            The main container for the table.
          </li>
          <li>
            <strong>
              <code>&lt;caption&gt;</code>:
            </strong>{" "}
            Provides a descriptive title for the table. This is read by screen readers and helps users understand the
            table's content immediately. It should be the first child element of <code>&lt;table&gt;</code>.
          </li>
          <li>
            <strong>
              <code>&lt;thead&gt;</code>:
            </strong>{" "}
            Groups the header rows (usually one row containing column headers).
          </li>
          <li>
            <strong>
              <code>&lt;tbody&gt;</code>:
            </strong>{" "}
            Groups the body rows containing the data.
          </li>
          <li>
            <strong>
              <code>&lt;tr&gt;</code>:
            </strong>{" "}
            Defines a table row. Used within <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code>.
          </li>
          <li>
            <strong>
              <code>&lt;th&gt;</code>:
            </strong>{" "}
            Defines a header cell. Used for column headers (typically in <code>&lt;thead&gt;</code>) and sometimes row
            headers (in <code>&lt;tbody&gt;</code>).
          </li>
          <li>
            <strong>
              <code>&lt;td&gt;</code>:
            </strong>{" "}
            Defines a standard data cell. Used for the actual data values in <code>&lt;tbody&gt;</code> rows.
          </li>
          <li>
            <strong>
              <code>scope</code> Attribute (on <code>&lt;th&gt;</code>):
            </strong>{" "}
            Essential for accessibility.
            <ul className="list-circle pl-6 mt-2">
              <li>
                <code>scope="col"</code>: Indicates the cell is a header for a column.
              </li>
              <li>
                <code>scope="row"</code>: Indicates the cell is a header for a row.
              </li>
            </ul>
            This attribute explicitly tells the screen reader which cells the header applies to.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" /> Converting Simple JSON: Examples
        </h2>
        <p>
          Let's look at how a simple JSON structure can map to an accessible HTML table structure. We'll use static
          representations here, showing the JSON input and the target HTML output structure. An actual implementation
          would dynamically generate the HTML based on the JSON data.
        </p>

        <h3 className="text-xl font-semibold mt-6">Example 1: Array of Flat Objects</h3>
        <p>This is a common structure where each object represents a row.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Sample JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`[
  {
    "name": "Alice",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Bob",
    "age": 25,
    "city": "London"
  }
]`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Target Accessible HTML Table Structure:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;table&gt;
  &lt;caption&gt;User Data&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Name&lt;/th&gt;
      &lt;th scope="col"&gt;Age&lt;/th&gt;
      &lt;th scope="col"&gt;City&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;Alice&lt;/td&gt;
      &lt;td&gt;30&lt;/td&gt;
      &lt;td&gt;New York&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;Bob&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
      &lt;td&gt;London&lt;/td&gt;
    &lt;/tr&gt;
    {/* ... more rows for other objects */}
  &lt;/tbody&gt;
&lt;/table&gt;`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Example 2: Object with Key-Value Pairs representing Row Data</h3>
        <p>Less common for full tables, but a single object could represent headers and a single row.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Sample JSON:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`{
  "product": "Laptop",
  "price": 1200,
  "inStock": true
}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Target Accessible HTML Table Structure:</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            (Could be a single row table, or a two-column table with keys as headers)
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`&lt;table&gt;
  &lt;caption&gt;Product Details&lt;/caption&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Product&lt;/th&gt;
      &lt;td&gt;Laptop&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Price&lt;/th&gt;
      &lt;td&gt;1200&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;In Stock&lt;/th&gt;
      &lt;td&gt;Yes&lt;/td&gt; { /* Or "true", depending on presentation */}
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;`}
            </pre>
          </div>
          <p className="text-sm mt-2">
            Note: In this row-header example, the keys become row headers (<code>&lt;th scope="row"&gt;</code>) and the
            values become data cells (<code>&lt;td&gt;</code>).
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2" /> Implementation Considerations
        </h2>
        <p>While the concept of mapping JSON to an accessible table is clear, implementation involves several steps:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parsing JSON:</strong> The JSON string must be parsed into a JavaScript object or array. (In a
            Next.js backend page, this might happen during data fetching or processing before rendering).
          </li>
          <li>
            <strong>Identifying Structure:</strong> Determine which part of the JSON represents the rows and which
            represent the columns. An array of objects is the most common structure for direct table mapping.
          </li>
          <li>
            <strong>Extracting Headers:</strong> For an array of objects, the keys of the objects often become the
            column headers. You might need logic to handle missing keys or variations between objects.
          </li>
          <li>
            <strong>Iterating and Rendering:</strong> Loop through the array (for rows) and then iterate through the
            keys/values of each object (for cells) to dynamically generate the <code>&lt;tr&gt;</code>,{" "}
            <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> elements.
          </li>
          <li>
            <strong>Handling Data Types:</strong> JSON values can be strings, numbers, booleans, null, arrays, or
            objects. Simple types map directly to text content in a <code>&lt;td&gt;</code>. Booleans might be rendered
            as "Yes"/"No" or "True"/"False". Null might be shown as "-" or "N/A". Complex nested structures (arrays or
            objects within a cell's value) are challenging and often require simplification, flattening, or presenting
            them separately.
          </li>
          <li>
            <strong>Adding Accessibility Attributes:</strong> Crucially, ensure the <code>scope</code> attribute is
            correctly applied to <code>&lt;th&gt;</code> elements, and add a descriptive <code>&lt;caption&gt;</code>.
          </li>
          <li>
            <strong>Styling:</strong> Use CSS (like Tailwind classes) to style the table for readability, but avoid
            relying *only* on visual styling to convey structure (e.g., don't use CSS to make a <code>&lt;td&gt;</code>{" "}
            look like a header without using the <code>&lt;th&gt;</code> tag).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Complex or Nested JSON</h3>
        <p>
          Directly converting complex JSON with deep nesting or inconsistent structures into a single, flat, accessible
          table can be difficult or impossible. For such cases, consider:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Flattening the data structure before converting to a table.</li>
          <li>
            Only displaying key summary information in the table and providing links or ways to view detailed nested
            data elsewhere.
          </li>
          <li>Using alternative accessible representations (though the focus here is tables).</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Converting JSON data into accessible HTML tables is a fundamental practice for ensuring that structured
          information on the web is available and understandable to users of assistive technologies. By correctly using
          semantic table elements like <code>&lt;caption&gt;</code>, <code>&lt;thead&gt;</code>,{" "}
          <code>&lt;tbody&gt;</code>, <code>&lt;th&gt;</code>, <code>&lt;td&gt;</code>, and the <code>scope</code>{" "}
          attribute, developers can transform raw data into a navigatable and comprehensible format, significantly
          improving the user experience for people with disabilities. While complex JSON structures may require careful
          consideration and data transformation, the principles for flat data mapping are straightforward and highly
          effective.
        </p>
      </div>
    </>
  );
}
