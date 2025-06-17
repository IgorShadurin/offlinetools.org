import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Export Functionality for Multiple Formats | Offline Tools",
  description:
    "Learn how to implement robust export features allowing users to download data in various formats like CSV, JSON, and PDF.",
};

export default function BuildingExportFunctionalityArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Building Export Functionality for Multiple Formats</h1>

      <div className="space-y-6">
        <p>
          Providing users with the ability to export data from your application is a crucial feature for usability and
          data management. Whether it&apos;s exporting a table as a CSV, downloading a report as a PDF, or saving
          configuration as JSON, supporting multiple formats caters to diverse user needs. This article explores the
          considerations and techniques involved in building versatile export functionality.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Offer Multiple Export Formats?</h2>
        <p>
          Different data formats serve different purposes. Offering multiple options allows users to choose the best
          format for their intended use case:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">CSV (Comma Separated Values):</span> Ideal for spreadsheet applications
            (Excel, Google Sheets) and simple data exchange.
          </li>
          <li>
            <span className="font-medium">JSON (JavaScript Object Notation):</span> Excellent for developers, data
            transfer between systems, and programmatic access.
          </li>
          <li>
            <span className="font-medium">PDF (Portable Document Format):</span> Best for reports, documents, and
            preserving layout for printing or sharing.
          </li>
          <li>
            <span className="font-medium">XML (Extensible Markup Language):</span> Another structured data format, often
            used in enterprise systems.
          </li>
          <li>
            <span className="font-medium">Excel (XLSX):</span> Provides rich formatting and features specific to
            spreadsheet software.
          </li>
        </ul>
        <p>Supporting various formats makes your application&apos;s data more accessible and interoperable.</p>

        <h2 className="text-2xl font-semibold mt-8">Implementation Approaches</h2>
        <p>
          Export functionality can generally be implemented either client-side (in the user&apos;s browser) or
          server-side. The choice depends on factors like data volume, complexity, and required format fidelity.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Client-Side Export:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Pros:</span> Faster for small to medium datasets, reduces server load, works
              offline (if data is already loaded).
            </li>
            <li>
              <span className="font-medium">Cons:</span> Limited by browser memory, unsuitable for very large datasets,
              complex formatting (like PDF) is harder, browser compatibility issues.
            </li>
            <li>
              <span className="font-medium">Common use cases:</span> Exporting data currently displayed in a table (CSV,
              JSON), simple text files.
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Server-Side Export:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Pros:</span> Handles large datasets, consistent formatting across users,
              access to server resources (libraries for PDF/Excel generation), better security for sensitive data.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Increases server load, requires server-side code, may involve
              delays for large exports, requires an internet connection.
            </li>
            <li>
              <span className="font-medium">Common use cases:</span> Generating complex reports (PDF, XLSX), exporting
              entire database tables, scheduled exports.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing Specific Formats</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">CSV Export</h3>
        <p>
          CSV is one of the simplest formats. It&apos;s essentially plain text with columns separated by a delimiter
          (usually a comma) and rows by newlines.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Client-Side CSV Example (Conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function exportToCsv(filename, data) {
  const csvRows = [];
  // Add header row
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = (''+row[header]).replace(/"/g, '"'); // Escape double quotes
      return \`"\${escaped}"\`; // Wrap values in double quotes
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href); // Clean up
}

// Usage example (assuming 'myData' is an array of objects)
// exportToCsv('mydata.csv', myData);
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This client-side approach constructs the CSV string and triggers a download using a Blob and an{" "}
            <code>&amp;lt;a&amp;gt;</code> tag.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Server-Side CSV (Conceptual):</h4>
          <p className="text-sm">
            A server-side approach involves an API endpoint that fetches data, formats it as CSV, and sends it back with
            the correct <code>Content-Type: text/csv</code> and <code>Content-Disposition: attachment; filename=</code>{" "}
            headers.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            <pre>
              {`// Example Next.js API Route (pages/api/export-csv.js or app/api/export-csv/route.js)
import { fetchDatabaseData } from '../../lib/data'; // Your data fetching logic

export async function GET(request) {
  const data = await fetchDatabaseData(); // Fetch data

  if (!data || data.length === 0) {
    return new Response("No data to export", { status: 404 });
  }

  const headers = Object.keys(data[0]);
  let csvString = headers.join(',') + '\\n';

  data.forEach(row => {
    const values = headers.map(header => {
      const escaped = (''+row[header]).replace(/"/g, '"');
      return \`"\${escaped}"\`;
    });
    csvString += values.join(',') + '\\n';
  });

  return new Response(csvString, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="export.csv"',
    },
  });
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">The client would simply make a GET request to this API endpoint.</p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">JSON Export</h3>
        <p>JSON export is often the simplest, especially if your data is already in JavaScript object format.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Client-Side JSON Example (Conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function exportToJson(filename, data) {
  const jsonString = JSON.stringify(data, null, 2); // Pretty print with 2 spaces
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Usage example
// exportToJson('mydata.json', myData);
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Server-Side JSON (Conceptual):</h4>
          <p className="text-sm">
            Similar to CSV, an API route fetches data and returns it with <code>Content-Type: application/json</code>.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            <pre>
              {`// Example Next.js API Route
import { fetchDatabaseData } from '../../lib/data';

export async function GET(request) {
  const data = await fetchDatabaseData();
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="export.json"',
    },
  });
}
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">PDF Export</h3>
        <p>
          PDF generation is typically more complex as it involves rendering data visually. Server-side solutions are
          often preferred for complex layouts and large documents, though client-side options exist.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Approaches for PDF:</h4>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Server-side Libraries:</span> Use libraries like <code>pdfmake</code>,{" "}
              <code>jsPDF</code> (can be client-side too), <code>wkhtmltopdf</code> (requires external binary), or
              headless browsers like Puppeteer to render HTML to PDF. This offers more control over formatting.
            </li>
            <li>
              <span className="font-medium">Client-side Libraries:</span> Libraries like <code>jsPDF</code> or{" "}
              <code>html2canvas</code> followed by <code>jsPDF</code> can convert visible DOM elements into a PDF. This
              is limited by what&apos;s on screen and browser capabilities.
            </li>
            <li>
              <span className="font-medium">Third-party APIs:</span> Services dedicated to PDF generation.
            </li>
          </ul>
          <p className="mt-2 text-sm">
            Server-side using a library or headless browser is often recommended for reliable and consistent PDF output.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Server-Side PDF Example (Conceptual using Puppeteer):</h4>
          <p className="text-sm">
            This approach renders an HTML page (possibly generated dynamically or based on data) to a PDF on the server.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
            <pre>
              {`// Example Next.js API Route (pages/api/export-pdf.js or app/api/export-pdf/route.js)
// Remember to install puppeteer: npm install puppeteer
import puppeteer from 'puppeteer';
import { fetchDatabaseData } from '../../lib/data';
import { generateHtmlReport } from '../../lib/reportTemplate'; // Function to create HTML string from data

export async function GET(request) {
  const data = await fetchDatabaseData();
  const htmlContent = generateHtmlReport(data); // Generate HTML for the report

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="report.pdf"',
    },
  });
}
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Excel (XLSX) Export</h3>
        <p>Generating proper XLSX files often requires dedicated libraries, as it&apos;s a complex binary format.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Approaches for XLSX:</h4>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Server-side Libraries:</span> Libraries like <code>exceljs</code> or{" "}
              <code>node-xlsx</code> are powerful for creating XLSX files with formatting, multiple sheets, etc.
            </li>
            <li>
              <span className="font-medium">Client-side Libraries:</span> Libraries like <code>xlsx</code> (SheetJS) can
              also work client-side but might be heavy depending on features needed.
            </li>
          </ul>
          <p className="mt-2 text-sm">
            Server-side is generally more robust for generating complex or large Excel files.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">General Considerations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Data Preparation:</span> Ensure the data is correctly formatted for the target
            export format. Handle data types (numbers, dates), escaping special characters (commas/quotes in CSV, HTML
            entities in PDF), and missing values.
          </li>
          <li>
            <span className="font-medium">Performance:</span> For large datasets, consider streaming the export data
            instead of loading it all into memory. Implement pagination or background processing for very large exports.
          </li>
          <li>
            <span className="font-medium">Security:</span> Ensure users can only export data they have permission to
            access. Sanitize any user-provided input used in generating filenames or content.
          </li>
          <li>
            <span className="font-medium">User Experience:</span> Provide feedback during the export process (e.g.,
            loading indicators). Offer clear options for format selection. Consider providing estimated file size or
            export time for large exports.
          </li>
          <li>
            <span className="font-medium">Naming Convention:</span> Use a consistent and informative filename for the
            downloaded file (e.g., <code>data_YYYY-MM-DD.csv</code>).
          </li>
          <li>
            <span className="font-medium">Error Handling:</span> Gracefully handle errors like network issues, server
            errors, or issues during file generation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Structuring Your Code</h2>
        <p>
          For maintainability, consider abstracting your export logic. You could have a service or utility module that
          takes data and a format type, returning the generated file or triggering the download.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Abstracted Export Function (Conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// exportUtils.js
import { exportToCsv } from './csvExporter'; // Your CSV logic
import { exportToJson } from './jsonExporter'; // Your JSON logic
// Import others...

export function initiateExport(data, format, filename = 'export') {
  switch (format) {
    case 'csv':
      exportToCsv(\`\${filename}.csv\`, data);
      break;
    case 'json':
      exportToJson(\`\${filename}.json\`, data);
      break;
    // case 'pdf':
    //   triggerServerPdfExport(\`\${filename}.pdf\`, data); // Call server API or client lib
    //   break;
    default:
      console.error('Unsupported export format:', format);
  }
}

// In your component:
// <button onClick={() => initiateExport(currentTableData, 'csv', 'users')}>Export CSV</button>
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">This pattern keeps the component clean and separates the export logic.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building flexible export functionality is a valuable addition to most applications. By understanding the
          characteristics of different formats, choosing appropriate client-side or server-side implementations, and
          considering performance and usability aspects, you can provide users with powerful tools for managing and
          utilizing their data outside of your application. Always test your export features thoroughly with various
          datasets and formats.
        </p>
      </div>
    </>
  );
}
