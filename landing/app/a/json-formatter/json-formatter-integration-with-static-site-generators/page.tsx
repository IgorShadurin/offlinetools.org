import type { Metadata } from "next";
import { FileJson, Rocket, Settings, CodeXml, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatter Integration with Static Site Generators",
  description:
    "Learn how to integrate JSON formatting into your Static Site Generator workflow for cleaner data, improved readability, and better developer experience.",
};

export default function JsonFormatterSSGIntegrationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-600" /> JSON Formatter Integration with Static Site Generators
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Static Site Generators (SSGs) have become incredibly popular for building fast, secure, and scalable websites.
          They work by pre-rendering all pages at build time, often consuming various data sources like Markdown files,
          YAML, and critically for many applications, JSON. While SSGs excel at rendering data, the source data itself
          can sometimes be less than ideally formatted. This is where integrating a JSON formatter into your SSG
          workflow can significantly improve developer experience and maintainability.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Check className="w-6 h-6 mr-2 text-green-600" /> Why Format JSON?
        </h2>
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and
          write and easy for machines to parse and generate. However, "easy for humans to read" often depends on how
          it's formatted.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Unformatted or minified JSON, especially large files, is difficult to scan and
            understand. Proper indentation and spacing make nested structures clear.
          </li>
          <li>
            <strong>Debugging:</strong> When working with JSON data files, inconsistent formatting can make it hard to
            spot errors like missing commas, mismatched brackets/braces, or incorrect nesting. A formatter provides a
            consistent, clean view.
          </li>
          <li>
            <strong>Consistency:</strong> If multiple developers are working on JSON data files, an automated formatter
            ensures everyone adheres to the same style, reducing merge conflicts and stylistic debates.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Rocket className="w-6 h-6 mr-2 text-purple-600" /> Why Integrate Formatting with SSGs?
        </h2>
        <p>Integrating JSON formatting directly into your SSG build process offers several advantages:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Automated Workflow:</strong> Formatting happens automatically as part of the build, ensuring data
            consumed by the SSG is always cleanly structured.
          </li>
          <li>
            <strong>Data Preparation:</strong> For SSGs that process raw data files (like Data directories in Hugo or
            Next.js), formatting ensures the input is consistent and easily parsed by the SSG's data loading mechanisms.
          </li>
          <li>
            <strong>Developer Experience:</strong> Developers can focus on the data content, knowing that formatting
            will be handled automatically. This is especially useful when data is generated programmatically or pasted
            from external sources.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-yellow-600" /> Approaches for Integration
        </h2>
        <p>There are primary ways to integrate JSON formatting into an SSG workflow:</p>

        <h3 className="text-xl font-semibold mt-6">1. Build-time Scripting</h3>
        <p>
          This is a flexible approach where you run a separate script before or during your SSG's build command. This
          script reads your raw JSON files, formats them, and overwrites the originals or saves the formatted versions
          to a designated location the SSG can then consume.
        </p>
        <p>
          Most SSGs allow you to define custom build commands (e.g., `npm run build` or `yarn build`). You can prefix
          your build command with a script execution: `format-json && ssg-build-command`.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Node.js Script Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// format-json.js
const fs = require('fs');
const path = require('path');

const dataDir = './data'; // Or wherever your JSON files live

console.log('Formatting JSON files in', dataDir);

fs.readdir(dataDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    process.exit(1);
  }

  files.forEach(file => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(dataDir, file);
      fs.readFile(filePath, 'utf8', (readErr, data) => {
        if (readErr) {
          console.error('Error reading file', filePath, readErr);
          return;
        }

        try {
          const jsonData = JSON.parse(data);
          // Use JSON.stringify with space argument for formatting
          const formattedJson = JSON.stringify(jsonData, null, 2);

          // Check if formatting actually changed the file content
          if (formattedJson !== data) {
              fs.writeFile(filePath, formattedJson, 'utf8', (writeErr) => {
                if (writeErr) {
                  console.error('Error writing formatted file', filePath, writeErr);
                } else {
                  console.log('Formatted', filePath);
                }
              });
          } else {
              console.log('File already formatted', filePath);
          }

        } catch (parseErr) {
          console.error('Error parsing JSON in', filePath, parseErr);
        }
      });
    }
  });
});
`}
            </pre>
          </div>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            (This is a simplified example using Node.js file system operations. A real script might need more robust
            error handling, directory traversal, and potentially use a dedicated formatting library for complex cases or
            specific style guides.)
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Within SSG Data Loading Mechanisms</h3>
        <p>
          Some SSGs, especially those based on frameworks like React (e.g., Next.js with App Router or Pages Router),
          allow you to load data within specific functions (like `getStaticProps`, `getStaticPaths`, or data fetching in
          App Router). While the SSG might parse the JSON correctly regardless of formatting, you can ensure consistency
          *after* loading it or before saving derived data by formatting the resulting JavaScript object/array.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Conceptual Next.js `getStaticProps` Example:</h4>
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
            (This doesn't format the source file, but formats the data *before* passing it to the page component or
            saving it elsewhere during the build).
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// pages/data-display.tsx or app/data-display/page.tsx (pseudo code for clarity)
import { promises as fs } from 'fs';
import path from 'path';

type MyDataType = {
  id: number;
  name: string;
  details: {
    value: any;
    description: string;
  };
};

// For Pages Router: getStaticProps
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'my-unformatted-data.json');
  const jsonData = await fs.readFile(filePath, 'utf8');

  let data: MyDataType | null = null;
  let formattedDataString: string | null = null;

  try {
    data = JSON.parse(jsonData) as MyDataType;
    // Format the parsed object back into a string for display or debugging
    formattedDataString = JSON.stringify(data, null, 2);
    // Note: 'data' is the actual JS object passed to the component
  } catch (error) {
    console.error('Error processing JSON data:', error);
    // Handle error: return notFound, empty props, etc.
  }

  return {
    props: {
      data, // The parsed JS object
      formattedDataString, // The formatted string representation
    },
  };
}

// For App Router: Data fetching within the component or a separate async function
// async function getData() { ... read and parse JSON ... }
// const data = await getData();
// const formattedDataString = JSON.stringify(data, null, 2);

// Inside your React component:
// export default function DataDisplayPage({ data, formattedDataString }) {
//   return (
//     <div>
//       <h1>My Data</h1>
//       {/* Display data directly from the object */}
//       <p>Name: {data?.name}</p>
//       {/* Display the formatted string representation */}
//       <h2>Raw Formatted JSON:</h2>
//       <pre className="bg-gray-100 p-4 rounded dark:bg-gray-800">
//         <code>{formattedDataString || 'Error loading data'}</code>
//       </pre>
//     </div>
//   );
// }
`}
            </pre>
          </div>
        </div>

        <p>
          This method is less about cleaning up your source files and more about ensuring that any JSON you *generate*
          or *process* during the build is consistently formatted if you need to output it or display it.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Using Pre-commit Hooks or Linters</h3>
        <p>
          While not strictly part of the SSG build itself, integrating JSON formatting with tools like Prettier or
          linters (like ESLint with appropriate plugins) via pre-commit hooks ensures that JSON files are formatted
          *before* they are committed to version control. This guarantees that the files your SSG consumes are always
          clean.
        </p>
        <p>
          This is often the most robust approach for maintaining clean source data files collaboratively. The build
          process then just consumes the already-formatted files.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CodeXml className="w-6 h-6 mr-2 text-blue-600" /> Practical Use Cases
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>API Documentation:</strong> Generating documentation that includes example request/response bodies
            often involves embedding JSON. Ensuring this JSON is formatted makes the documentation much clearer.
          </li>
          <li>
            <strong>Content Management:</strong> If you store structured content or configuration in JSON files that
            your SSG reads, formatting keeps these data files manageable.
          </li>
          <li>
            <strong>Data Visualization:</strong> Preparing JSON data that will be used by client-side JavaScript
            libraries for charts or graphs. While minified is fine for production, having formatted versions during
            development is crucial.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Benefits Summarized</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Cleaner and more readable source data files.</li>
          <li>Reduced potential for parsing errors due to inconsistent formatting.</li>
          <li>Improved collaboration among developers.</li>
          <li>Easier debugging of data-related issues.</li>
          <li>Automated process means less manual effort.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Considerations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Build Time Overhead:</strong> For very large JSON files, formatting can add a small amount of time
            to your build process. However, for typical use cases, this is negligible.
          </li>
          <li>
            <strong>Tooling:</strong> Decide whether to use a simple Node.js script, a dedicated CLI formatter (`jq`,
            `prettier`, etc.), or leverage SSG-specific features.
          </li>
          <li>
            <strong>Error Handling:</strong> Ensure your formatting script or process handles invalid JSON gracefully,
            reporting errors without necessarily crashing the entire build (depending on your requirements).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Integrating JSON formatting into your SSG build pipeline, whether through pre-build scripts, SSG data loading
          hooks, or pre-commit hooks, is a simple yet effective way to enhance the developer experience and
          maintainability of your project. It ensures your structured data is always presented cleanly and consistently,
          making it easier to read, write, and debug. By automating this step, you streamline your workflow and reduce
          potential sources of error related to data file inconsistencies.
        </p>
      </div>
    </>
  );
}
