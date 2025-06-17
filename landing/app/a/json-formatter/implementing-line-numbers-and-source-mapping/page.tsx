import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Line Numbers and Source Mapping | Offline Tools",
  description:
    "Learn how line numbers aid debugging and logging, and how source mapping helps debug minified or transpiled code, with practical examples.",
};

export default function LineNumbersAndSourceMappingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Line Numbers and Source Mapping</h1>

      <div className="space-y-6">
        <p>
          When developing software, understanding where errors occur is crucial for efficient debugging. Line numbers
          provide an immediate reference point within a file, while source mapping bridges the gap between optimized,
          unreadable code and its original, human-readable form. Together, they are indispensable tools in a
          developer&apos;s arsenal.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Importance of Line Numbers</h2>
        <p>
          Line numbers are perhaps the most basic form of code location information. They are present in almost every
          text editor, IDE, and compiler output. Their importance lies in providing a simple, direct reference to a
          specific line within a file.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Why Line Numbers Matter:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Debugging:</span> Error messages often report the line number where an
              exception occurred.
            </li>
            <li>
              <span className="font-medium">Code Reviews:</span> Easy reference when discussing specific parts of the
              code.
            </li>
            <li>
              <span className="font-medium">Logging and Monitoring:</span> Including line numbers in logs helps trace
              the origin of events or issues.
            </li>
            <li>
              <span className="font-medium">Navigation:</span> IDEs allow jumping directly to a line number.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Understanding Source Mapping</h2>
        <p>
          Modern web development often involves transformations like minification, concatenation, and transpilation
          (e.g., converting TypeScript or ES6+ to older JavaScript, or using CSS preprocessors like Sass). These
          processes make the final deployed code difficult to read and debug because it no longer directly resembles the
          source code you wrote.
        </p>
        <p>
          Source maps are a mechanism to map the generated, often minified/transpiled code back to the original source
          code. They are typically separate files (e.g., <code className="font-mono text-sm">.map</code>
          files) that contain information about how the code was transformed.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">How Source Mapping Works (Conceptually):</h3>
          <p className="text-sm mt-2">A source map file is essentially a JSON object that contains:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2 text-sm">
            <li>Information about the original source files.</li>
            <li>Information about the generated output files.</li>
            <li>
              Mappings data: A VSL (Variable-length quantity, Semi-colon separated, Line) base 64 string encoding the
              relationship between positions (line and column numbers) in the generated file and the original file.
            </li>
          </ul>
          <p className="text-sm mt-2">
            When a browser (or other debugger) encounters a line like{" "}
            <code className="font-mono text-sm">{"//#"} sourceMappingURL=file.js.map</code> at the end of a generated
            file, it loads the map file and uses the information to display the original source code in its debugger,
            allowing you to set breakpoints, inspect variables, and see stack traces as if you were running the original
            code directly.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing Line Numbers in Code</h2>
        <p>
          While editors handle displaying line numbers, you might need to access or generate line numbers in your code
          for purposes like error reporting or logging. Many languages provide built-in ways to get the current file
          name and line number.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Logging with Line Numbers (JavaScript)</h3>
          <p className="text-sm mt-2">
            In Node.js, you can use the <code className="font-mono text-sm">Error.prepareStackTrace</code> or libraries
            to access call stack information, including file names and line numbers.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function getCallerInfo() {
  const err = new Error();
  const stack = err.stack;

  // This is a basic example; parsing stack traces is complex
  // Libraries like 'callsites' or 'stack-trace' are recommended
  const stackLines = stack.split('\\n').slice(2); // Skip 'Error' and getCallerInfo lines
  const callerLine = stackLines[0];

  // Simple regex to extract file and line (might not work for all environments/formats)
  const match = callerLine.match(/\\((.*):(\\d+):(\\d+)\\)$/);

  if (match) {
    const filePath = match[1];
    const lineNumber = match[2];
    const columnNumber = match[3];
    return { filePath, lineNumber, columnNumber };
  }
  return { filePath: 'unknown', lineNumber: 'unknown', columnNumber: 'unknown' };
}

function doSomething() {
  const info = getCallerInfo();
  console.log(\`[LOG] Doing something at \${info.filePath}:\${info.lineNumber}\`);
}

doSomething();
// Output might look like: [LOG] Doing something at /path/to/your/file.js:18`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Note: Accessing call stack information like this can have performance implications and stack trace formats
            vary across JavaScript engines and environments.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing Source Mapping in Development</h2>
        <p>Generating source maps is typically handled by build tools and compilers:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Common Tools and Configuration:</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Webpack:</span> Use the <code className="font-mono text-sm">devtool</code>
              configuration option (e.g., <code className="font-mono text-sm">&apos;source-map&apos;</code>,{" "}
              <code className="font-mono text-sm">&apos;eval-source-map&apos;</code>). Different options provide varying
              levels of detail, build speed, and output file size.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                <pre>
                  {`module.exports = {
  // ... other config
  devtool: 'source-map', // Or 'eval-source-map' for faster builds in dev
  // ...
};`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">Rollup:</span> Configure the{" "}
              <code className="font-mono text-sm">output.sourcemap</code>
              option to <code className="font-mono text-sm">true</code>.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                <pre>
                  {`export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
    sourcemap: true, // Generate source map
  }
};`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">Babel:</span> Use the{" "}
              <code className="font-mono text-sm">--source-maps</code> CLI flag or the{" "}
              <code className="font-mono text-sm">sourceMaps</code> option in configuration.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                <pre>
                  {`// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
  sourceMaps: true, // Enable source map generation
};`}
                </pre>
              </div>
            </li>
            <li>
              <span className="font-medium">TypeScript:</span> Set the{" "}
              <code className="font-mono text-sm">sourceMap</code>
              option to <code className="font-mono text-sm">true</code> in your{" "}
              <code className="font-mono text-sm">tsconfig.json</code>.
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
                <pre>
                  {`// tsconfig.json
{
  "compilerOptions": {
    // ...
    "sourceMap": true, // Generate source map files
    // ...
  }
}`}
                </pre>
              </div>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Debugging with Source Maps in Browsers</h2>
        <p>
          Most modern browsers automatically detect source maps. If your server is configured to serve the{" "}
          <code className="font-mono text-sm">.map</code> files alongside your generated code (or if the map is inline),
          the developer tools will use the source map information.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Steps in Browser DevTools:</h3>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>Open the browser&apos;s Developer Tools (usually F12).</li>
            <li>
              Go to the <code className="font-mono text-sm">Sources</code> (or{" "}
              <code className="font-mono text-sm">Debugger</code>) tab.
            </li>
            <li>
              Navigate through the file tree. You should see your original source files (e.g.,{" "}
              <code className="font-mono text-sm">.ts</code>, <code className="font-mono text-sm">.jsx</code>,{" "}
              <code className="font-mono text-sm">.scss</code>) listed, even though the browser is executing the
              generated <code className="font-mono text-sm">.js</code> or{" "}
              <code className="font-mono text-sm">.css</code>.
            </li>
            <li>
              Set breakpoints in your original source code. When the execution hits a breakpoint in the generated code,
              the debugger will show you the corresponding line in your original source file.
            </li>
            <li>Error stack traces shown in the Console should also reference lines in your original source files.</li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations for Production</h2>
        <p>
          While source maps are invaluable for development, exposing full source maps on production websites can reveal
          your original, unminified code structure.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Security/IP Concerns:</span> Might expose proprietary code.
          </li>
          <li>
            <span className="font-medium">Performance:</span> Users downloading{" "}
            <code className="font-mono text-sm">.map</code>
            files adds to bandwidth and load time (though most users won&apos;t download them unless devtools are open).
          </li>
        </ul>
        <p>Common strategies for production include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Using source map types that embed the source code (
            <code className="font-mono text-sm">inline-source-map</code>,
            <code className="font-mono text-sm">eval-source-map</code>) which increases the main bundle size but avoids
            separate file requests (often used only for development).
          </li>
          <li>
            Using a less detailed source map type (e.g., <code className="font-mono text-sm">nosources-source-map</code>
            ) which provides line numbers but not the original source code content.
          </li>
          <li>Hosting source maps privately on a server accessible only to your team or error monitoring service.</li>
          <li>
            Not generating source maps for production builds (though this significantly hinders debugging production
            issues).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Line numbers are fundamental references, essential for reading, navigating, and basic debugging of code.
          Source mapping is a powerful abstraction built upon this concept, specifically designed to restore the
          debugging experience in complex build environments. By understanding and utilizing these features through your
          build tools and development environment, you can significantly improve your debugging efficiency and
          maintainability, especially when working with minified or transpiled code.
        </p>
      </div>
    </>
  );
}
