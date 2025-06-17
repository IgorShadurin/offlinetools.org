import type { Metadata } from "next";
import {
  Terminal,
  File,
  Settings,
  Code,
  XCircle,
  HardDrive,
  SquareCheckBig,
  SquareX,
  Indent,
  Shuffle,
  Minimize2,
  ListChecks,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Command-Line Interface Design for JSON Formatters | Offline Tools",
  description:
    "Explore best practices and common patterns for designing effective command-line interfaces for JSON formatting tools.",
};

export default function JsonFormatterCliDesignArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Terminal className="size-8" />
        <span>Command-Line Interface Design for JSON Formatters</span>
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data exchange on the web and in many other
          contexts. While highly flexible, JSON can sometimes be hard to read, especially when it&apos;s minified or
          deeply nested. Command-line interface (CLI) tools that format (or &quot;pretty-print&quot;) JSON are essential
          utilities for developers. This article explores common patterns and best practices for designing intuitive and
          powerful CLIs for JSON formatters.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="size-6" />
          <span>Core Principles: Standard I/O and Files</span>
        </h2>
        <p>
          A robust CLI formatter should support reading JSON from multiple sources and writing to multiple destinations.
          The most fundamental are standard input (stdin) and standard output (stdout), enabling pipeline usage, and
          direct file input/output.
        </p>

        <h3 className="text-xl font-semibold mt-6">Standard Input and Output (Piping)</h3>
        <p>
          This is arguably the most common use case. A user pipes JSON data from another command into your formatter,
          and the formatted output is printed to the console or piped to another command. This follows the Unix
          philosophy of small tools doing one thing well and connecting via pipes.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-blue-400">echo</span> &apos;&lt;!-- Use HTML entity for quote --&apos;
            <span className="text-yellow-500">&#x7b;</span>
            <span className="text-green-400">&quot;name&quot;</span>:
            <span className="text-blue-400">&quot;Alice&quot;</span>
            <span className="text-yellow-500">&#x7d;</span>&apos; |{" "}
            <span className="text-purple-400">your_formatter</span>
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-blue-400">cat</span> data.json |{" "}
            <span className="text-purple-400">your_formatter</span>
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-blue-400">curl</span> api.com/data |{" "}
            <span className="text-purple-400">your_formatter</span> | <span className="text-green-400">less</span>
          </p>
        </div>
        <p>
          Your formatter should read from stdin if no input file is specified. The formatted output should go to stdout.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <File className="size-5" />
          <span>File Input and Output</span>
        </h3>
        <p>Allowing users to specify input and output files is also crucial.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-purple-400">your_formatter</span> input.json
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-purple-400">your_formatter</span> input.json &gt; output.json
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-purple-400">your_formatter</span> input.json --output output.json
          </p>
        </div>
        <p>
          If an input file is given but no output destination (either stdout implied or explicit output file), write to
          stdout. If an output file is specified, write to that file.
        </p>
        <p className="font-medium mt-4 flex items-center space-x-2">
          <XCircle className="size-5 text-red-500" />
          <span>Avoid In-Place Modification by Default:</span>
        </p>
        <p>
          While an option for in-place modification (&apos;--write&apos; or &apos;--inplace&apos;) can be convenient, it
          should never be the default behavior as it can lead to accidental data loss or corruption if the formatting
          fails. Require an explicit flag for this.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings className="size-6" />
          <span>Command-Line Options and Flags</span>
        </h2>
        <p>Options control how the formatting is performed. Common options for JSON formatters include:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Indent className="size-5" />
          <span>Indentation</span>
        </h3>
        <p>
          This is the most fundamental option. Users should be able to specify the number of spaces or use tabs for
          indentation.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-purple-400">your_formatter</span> input.json --indent 2{" "}
            <span className="text-gray-500">{"// 2 spaces"}</span>
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-purple-400">your_formatter</span> input.json --indent 4{" "}
            <span className="text-gray-500">{"// 4 spaces (often default)"}</span>
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-purple-400">your_formatter</span> input.json --indent &quot;\\t&quot;{" "}
            <span className="text-gray-500">{"// Tab indentation"}</span>
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-purple-400">your_formatter</span> input.json --indent 0{" "}
            <span className="text-gray-500">{"// No indentation (compact output)"}</span>
          </p>
        </div>
        <p>A common default is 2 or 4 spaces. 0 or no indent option implies compact output.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Minimize2 className="size-5" />
          <span>Compact Output</span>
        </h3>
        <p>
          A flag to explicitly request the most compact output (no whitespace between tokens, except where required).
          This is equivalent to &apos;--indent 0&apos;.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-purple-400">your_formatter</span> input.json --compact
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Shuffle className="size-5" />
          <span>Sort Keys</span>
        </h3>
        <p>
          An option to sort keys within JSON objects alphabetically. This helps in comparing different versions of JSON
          data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-purple-400">your_formatter</span> input.json --sort-keys
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <ListChecks className="size-5" />
          <span>Validation / Check Only</span>
        </h3>
        <p>
          A mode to simply validate if the input is well-formed JSON, without printing any formatted output. This is
          useful in scripts or CI pipelines. The tool should exit with a status code of 0 for success and a non-zero
          code for failure.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="font-mono text-sm">
            <span className="text-purple-400">your_formatter</span> input.json --check
          </p>
          <p className="font-mono text-sm mt-2">
            <span className="text-blue-400">if</span> <span className="text-purple-400">your_formatter</span> input.json
            --check; <span className="text-blue-400">then</span>
          </p>
          <p className="font-mono text-sm ml-4">
            <span className="text-green-400">echo</span> <span className="text-green-400">&quot;Valid JSON&quot;</span>;
          </p>
          <p className="font-mono text-sm ml-4">
            <span className="text-green-400">exit</span> 0;
          </p>
          <p className="font-mono text-sm">
            <span className="text-blue-400">else</span>
          </p>
          <p className="font-mono text-sm ml-4">
            <span className="text-red-400">echo</span> <span className="text-red-400">&quot;Invalid JSON&quot;</span>;
          </p>
          <p className="font-mono text-sm ml-4">
            <span className="text-red-400">exit</span> 1;
          </p>
          <p className="font-mono text-sm">
            <span className="text-blue-400">fi</span>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Help and Version Information</h3>
        <p>
          Standard flags like &apos;--help&apos; (or &apos;-h&apos;) and &apos;--version&apos; (or &apos;-v&apos;)
          should provide usage instructions and the tool&apos;s version number, respectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <HardDrive className="size-6" />
          <span>Implementation Considerations</span>
        </h2>
        <p>Implementing a JSON formatter CLI involves:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <span>Argument Parsing:</span> Use a library or manually parse &apos;process.argv&apos; to understand user
            options and input/output paths.
          </li>
          <li className="flex items-start space-x-2">
            <span>Reading Input:</span>
            If a file is specified, read its content using file system APIs. If no file and stdin is potentially
            available (e.g., not a TTY), read from &apos;process.stdin&apos;. Be mindful of large inputs; streaming
            might be necessary for very big files, though simple formatters often load everything into memory.
          </li>
          <li className="flex items-start space-x-2">
            <span>Parsing JSON:</span> Use the built-in &apos;JSON.parse()&apos; method. Handle potential
            &apos;SyntaxError&apos; exceptions.
          </li>
          <li className="flex items-start space-x-2">
            <span>Formatting JSON:</span> Use &apos;JSON.stringify()&apos; with its &apos;space&apos; argument for
            indentation. Sorting keys requires iterating over object keys, sorting them, and then rebuilding the object
            or stringifying with a custom replacer function.
          </li>
          <li className="flex items-start space-x-2">
            <span>Writing Output:</span>
            If an output file is specified, write the formatted string using file system APIs. Otherwise, write to
            &apos;process.stdout&apos;.
          </li>
          <li className="flex items-start space-x-2">
            <span>Error Handling:</span> Catch parsing errors, file I/O errors, and invalid option usage. Print
            informative error messages to &apos;process.stderr&apos; and exit with a non-zero status code.
          </li>
        </ul>
        <p>A simple example of parsing and formatting in JavaScript/TypeScript:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic Formatting Logic (Conceptual):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`function formatJson(jsonString: string, indent: string | number = 2, sortKeys: boolean = false): string {
  try {
    let parsed = JSON.parse(jsonString);

    if (sortKeys) {
      // Recursive function to sort keys in objects
      const sortObjectKeys = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(sortObjectKeys);
        } else if (typeof obj === 'object' && obj !== null) {
          const sortedKeys = Object.keys(obj).sort();
          const sortedObj: any = {};
          for (const key of sortedKeys) {
            sortedObj[key] = sortObjectKeys(obj[key]);
          }
          return sortedObj;
        }
        return obj;
      };
      parsed = sortObjectKeys(parsed);
    }

    // Use JSON.stringify for pretty-printing
    return JSON.stringify(parsed, null, indent);

  } catch (err: unknown) {
    if (err instanceof SyntaxError) {
      // err is narrowed to SyntaxError here, safe to access message
      // FIX: Replace template literal inside string with concatenation to avoid build issue
      throw new Error('Invalid JSON: ' + err.message); // Extract message and use directly
    }
    // Re-throw other errors (err is unknown here)
    throw err;
  }
}

// Example usage within a theoretical CLI script:
// const inputJson = readInput(); // Function to read from stdin or file
// try {
//   const formattedJson = formatJson(inputJson, 4, true);
//   writeOutput(formattedJson); // Function to write to stdout or file
// } catch (err: unknown) {
//   // Need to check type if accessing properties, but console.error accepts unknown
//   console.error(\`Error: \${err instanceof Error ? err.message : String(err)}\`);
//   process.exit(1); // Indicate failure
// }
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <span>Best Practices and User Experience</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <SquareCheckBig className="size-5 text-green-500" />
            <span>Clear Documentation:</span> Provide comprehensive help text (&apos;--help&apos;) and README
            documentation.
          </li>
          <li className="flex items-start space-x-2">
            <SquareCheckBig className="size-5 text-green-500" />
            <span>Consistent Options:</span> Use standard conventions for option names (e.g., &apos;--input&apos;,
            &apos;--output&apos;, &apos;--indent&apos;).
          </li>
          <li className="flex items-start space-x-2">
            <SquareCheckBig className="size-5 text-green-500" />
            <span>Sensible Defaults:</span> Choose reasonable defaults (e.g., 2 or 4 space indentation) when options are
            not specified.
          </li>
          <li className="flex items-start space-x-2">
            <SquareX className="size-5 text-red-500" />
            <span>Never Fail Silently:</span> Always report errors clearly to the user via stderr and exit codes.
          </li>
          <li className="flex items-start space-x-2">
            <SquareCheckBig className="size-5 text-green-500" />
            <span>Handle Edge Cases:</span> Consider empty objects/arrays, large numbers, specific string escapes, etc.
          </li>
          <li className="flex items-start space-x-2">
            <SquareCheckBig className="size-5 text-green-500" />
            <span>Performance:</span> For very large files, streaming parsers/formatters might be necessary, although
            this adds significant complexity.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <span>Conclusion</span>
        </h2>
        <p>
          Designing a good CLI for a JSON formatter involves more than just writing the formatting logic. It requires
          careful consideration of how users will interact with the tool in different scenarios — from simple manual
          formatting to integration into automated scripts. By adhering to standard CLI patterns like supporting
          stdin/stdout, providing clear options for formatting style, and implementing robust error handling, you can
          create a useful and developer-friendly utility.
        </p>
      </div>
    </>
  );
}
