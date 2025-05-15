import type { Metadata } from "next";
import {
  Code,
  BarChart,
  Info,
  Check,
  AlertTriangle,
  Layers,
  LayoutList,
  Settings,
  Table,
  LineChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatter Integration with Data Visualization Libraries",
  description:
    "Learn how to integrate JSON formatters into your data visualization workflows for better debugging, readability, and presentation.",
};

export default function JsonFormatterVisualizationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <BarChart className="w-8 h-8" /> JSON Formatter Integration with Data Visualization Libraries
      </h1>

      <div className="space-y-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          In the world of front-end development, especially when dealing with data-intensive applications,
          you often work with JSON data retrieved from APIs or local sources and visualize it using libraries
          like D3.js, Chart.js, ECharts, or similar. While visualization libraries are excellent at turning
          structured data into charts and graphs, understanding the raw data, debugging issues, or presenting
          data details requires reading and interpreting JSON. Integrating a JSON formatter into your development
          or even within the application itself can significantly enhance this process. This article explores
          the benefits and methods of integrating JSON formatters with data visualization workflows.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" /> Why Integrate JSON Formatters?
        </h2>
        <p>
          JSON data, especially when received from an API, often comes as a single, compact string with
          no indentation or line breaks. While efficient for transfer, this format is difficult for humans
          to read. A JSON formatter takes this string and outputs a human-readable, indented version, making
          the structure and content clear.
        </p>
        <h3 className="text-xl font-semibold mt-4">Key Benefits:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />
            <strong>Improved Readability:</strong> Makes nested objects and arrays easy to follow.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />
            <strong>Easier Debugging:</strong> Quickly identify missing fields, incorrect data types,
            or structural errors in the data feed before or after it's processed by the visualization library.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />
            <strong>Enhanced Data Exploration:</strong> Understand the shape of the data you are about
            to visualize.
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 shrink-0 mt-1" />
            <strong>Better Presentation:</strong> When displaying raw data alongside visualizations
            (e.g., in a tooltip, detail panel, or dedicated data viewer), a formatted view is much more
            user-friendly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Layers className="w-6 h-6 text-purple-500" /> Integration Points in the Workflow
        </h2>
        <p>
          JSON formatting can be applied at various stages of your data visualization pipeline:
        </p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <strong>After Fetching Data, Before Processing:</strong>
            <p>
              When you receive the JSON response from an API, you might want to inspect it before passing
              it to the visualization library's data parsing or rendering functions. Formatting it here
              helps in verifying the raw data structure.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Code className="w-5 h-5" /> Example: Formatting API Response
              </h3>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {`async function fetchDataAndFormat() {
  try {
    const response = await fetch('/api/your-data');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const rawData = await response.json();

    // --- Integration Point ---
    // Use JSON.stringify for simple formatting (built-in)
    const formattedDataString = JSON.stringify(rawData, null, 2); // 2 spaces indentation

    console.log("Formatted Raw Data:");
    console.log(formattedDataString);
    // -------------------------

    // Pass rawData (as JS object) to visualization library
    // visualizeData(rawData);

  } catch (error) {
    console.error("Error fetching or formatting data:", error);
  }
}`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Within Tooltips or Detail Panels:</strong>
            <p>
              Visualizations often have interactive elements like tooltips or side panels that display
              detailed data about a selected element (a bar, a point, etc.). Displaying the full data
              object for that element in a formatted way is incredibly useful for users or developers
              inspecting the data point.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <LayoutList className="w-5 h-5" /> Example: Formatting Data in a Tooltip (Conceptual)
              </h3>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {`// Assume 'dataPoint' is the JavaScript object for a selected element
function createTooltipContent(dataPoint: any): string {
  // --- Integration Point ---
  // Format the specific data point object
  const formattedDataPointString = JSON.stringify(dataPoint, null, 2);
  // -------------------------

  // Return the HTML string (using string concatenation for display in pre tag)
  return '<div class="tooltip-header">Details</div>' +
         '<pre class="tooltip-json">' + formattedDataPointString + '</pre>';
}

// In your visualization library's event handler (e.g., mouseover)
// onDataPointHover(dataPoint) {
//   const tooltipHtml = createTooltipContent(dataPoint);
//   displayTooltip(tooltipHtml);
// }
`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>As a Dedicated Data Viewer Component:</strong>
            <p>
              For complex applications, you might have a section or modal dedicated to viewing the raw
              data used for visualization. This component would take the data object(s) and render them
              using a JSON formatter, often with syntax highlighting.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Table className="w-5 h-5" /> Example: Dedicated Data Viewer Component (Conceptual React/TSX)
              </h3>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {`// This component would receive 'data' as props (not allowed in THIS specific file, but conceptual)
// import type { YourDataType } from './types';
// interface DataViewerProps {
//   data: YourDataType | YourDataType[];
// }
// function DataViewer({ data }: DataViewerProps) {

// --- Integration Point ---
// Format the data object(s)
const formattedDataString = JSON.stringify(/* your data variable */ null, 2);
// -------------------------

// Render the formatted string, potentially with syntax highlighting
return (
  <div className="data-viewer p-4 bg-gray-50 dark:bg-gray-800 rounded">
    <h3 className="text-lg font-semibold mb-3">Raw Data</h3>
    <pre className="json-output whitespace-pre-wrap break-words text-sm">
      {/* Use a syntax highlighter component here, or just display the string */}
      {\`// Assuming 'formattedDataString' holds the output of JSON.stringify
// Example data structure:
\${formattedDataString}\`}
    </pre>
  </div>
);
// }
`}
                </pre>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <em>Note: The code above is conceptual to show the formatting part. A real component
                would accept data via props and potentially use a dedicated JSON viewer library for
                syntax highlighting and collapsing/expanding nodes.</em>
              </p>
            </div>
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6 text-teal-500" /> Tools and Libraries for Formatting
        </h2>
        <p>
          You don't necessarily need a separate library just for basic JSON formatting.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong><Code className="inline w-4 h-4 mr-1" /> <code>JSON.stringify(value, replacer, space)</code>:</strong>
            <p>
              The built-in JavaScript method is the simplest way. The third argument, <code>space</code>,
              controls indentation. Use a number &#x28;e.g., 2 or 4&#x29; for that many spaces, or a string &#x28;e.g., &quot;\t&quot;&#x29;
              for tabs.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {`const myData = { name: "Test", value: 123, details: { enabled: true } };
const formattedJson = JSON.stringify(myData, null, 2);
// Output:
// {
//   "name": "Test",
//   "value": 123,
//   "details": {
//     "enabled": true
//   }
// }`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Dedicated JSON Viewer Libraries:</strong>
            <p>
              For more advanced features like syntax highlighting, collapsible sections, and search,
              consider using a dedicated library. Examples include <code>react-json-view</code> &#x28;React specific&#x29;,
              <code>json-tree-view</code>, or others depending on your framework or need. These libraries
              often render the JSON as interactive HTML rather than just a pre-formatted string.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-500" /> Considerations and Challenges
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Performance:</strong> Formatting very large JSON objects can be computationally expensive.
            If you're dealing with massive datasets, consider formatting only specific parts or doing it
            in a web worker if performance becomes an issue, especially when using dedicated viewer libraries.
          </li>
          <li>
            <strong>Complexity:</strong> Basic formatting with <code>JSON.stringify</code> is simple.
            Integrating advanced interactive JSON viewers adds dependencies and complexity to your component tree.
          </li>
          <li>
            <strong>Handling Non-JSON Data:</strong> Ensure the data you are trying to format is valid JSON.
            Wrap formatting calls in try-catch blocks if the data source is external or potentially unreliable.
          </li>
          <li>
            <strong>Rendering Formatted Output:</strong> Simply formatting the string isn't enough; you need
            to render it correctly in HTML, typically within a <code>&lt;pre&gt;</code> tag to preserve
            whitespace. For syntax highlighting, you'll need additional CSS or a syntax highlighting library.
            Remember to handle HTML entities like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>,
            <code>&quot;</code> and curly braces &#x7b;, &#x7d; if you're
            embedding the formatted JSON within other HTML or JSX, or if the JSON contains these characters
            in string values.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LineChart className="w-6 h-6 text-blue-500" /> Conclusion
        </h2>
        <p>
          Integrating JSON formatting into your data visualization workflow, whether for debugging raw data
          before processing or displaying detailed data points in a user-friendly way, is a simple step
          that adds significant value. The built-in <code>JSON.stringify</code> method provides basic
          readability enhancements, while dedicated libraries offer richer, interactive experiences. By
          making the underlying data more accessible and understandable, you empower both developers
          during the build phase and potentially end-users exploring the visualizations. Choose the
          integration point and tool that best fits the complexity and requirements of your specific
          data visualization application.
        </p>
      </div>
    </>
  );
}
