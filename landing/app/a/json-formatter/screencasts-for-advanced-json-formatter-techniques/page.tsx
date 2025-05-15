import type { Metadata } from "next";
import {
  Code,
  Settings2,
  CheckCheck,
  Diff,
  Layers,
  HardDrive,
  Eye,
  Columns2,
  ListFilter,
  Copy,
  FileCode,
  Braces,
  SquareCode,
  ClipboardCheck,
} from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Advanced JSON Formatter Techniques | Offline Tools",
  description:
    "Explore advanced techniques for formatting JSON data, including handling large files, customization, validation, and integration workflows.",
};

export default function AdvancedJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Braces className="w-8 h-8" /> Advanced JSON Formatter Techniques
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is the de facto standard for data
          interchange on the web. While basic JSON formatting—pretty-printing
          with indentation—is commonplace, developers often encounter scenarios
          requiring more sophisticated handling. This article dives into
          advanced JSON formatting techniques that go beyond simple indentation,
          offering greater control, efficiency, and integration into development
          workflows. These are the kinds of techniques often demonstrated in
          screencasts for maximum clarity.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> Why Go Beyond Basic Formatting?
        </h2>
        <p>
          Basic JSON formatting primarily involves adding whitespace (spaces or
          tabs) and newlines to make the structure human-readable. However, real-world
          JSON data can be complex:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Large Files:</strong> JSON files can be gigabytes in size,
            making simple in-memory formatting impractical.
          </li>
          <li>
            <strong>Inconsistent Styles:</strong> Different tools or manual
            edits can lead to variations in indentation, key order, and
            whitespace.
          </li>
          <li>
            <strong>Data Integrity:</strong> Formatting might inadvertently
            introduce errors or hide existing ones.
          </li>
          <li>
            <strong>Automation Needs:</strong> Integrating formatting into build
            pipelines, pre-commit hooks, or automated scripts requires robust,
            configurable tools.
          </li>
          <li>
            <strong>Specific Requirements:</strong> Projects might need custom
            sorting of keys, specific handling of long lines, or preservation
            of certain data structures.
          </li>
        </ul>
        <p>
          Advanced techniques and tools address these challenges, providing
          reliable and efficient ways to manage JSON data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings2 className="w-6 h-6" /> Customizing Formatting Rules
        </h2>
        <p>
          A key aspect of advanced formatting is the ability to customize the
          output. Beyond just choosing between spaces and tabs for indentation,
          many formatters allow defining detailed rules.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListFilter className="w-5 h-5" /> Key Sorting
        </h3>
        <p>
          While the JSON specification does not mandate key order, maintaining
          a consistent order (usually alphabetical) makes diffing versions and
          reading large objects much easier. Advanced formatters can sort keys
          recursively within every object.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Unsorted vs. Sorted Keys</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Original (Unsorted)
{
  "zeta": 3,
  "alpha": 1,
  "beta": 2
}

// Formatted (Sorted)
{
  "alpha": 1,
  "beta": 2,
  "zeta": 3
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Columns2 className="w-5 h-5" /> Line Width and Breaking
        </h3>
        <p>
          For objects or arrays with few short elements, putting them on a
          single line can improve readability and reduce vertical space.
          Conversely, long lines should be wrapped. Advanced formatters can often
          be configured with a maximum line width.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Line Wrapping</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// With strict line width (e.g., 40 chars)
{
  "id": 123,
  "name": "A long name that needs wrapping",
  "tags": [
    "tag1",
    "tag2",
    "tag3",
    "an extremely long tag name"
  ]
}

// Same data, potentially single-line if space allows
// { "id": 123, "name": "Short", "tags": ["t1", "t2"] }`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Copy className="w-5 h-5" /> Handling Comments and Malformed JSON
        </h3>
        <p>
          Strict JSON doesn't support comments or trailing commas, but
          these are common in configuration files or manual edits. Some formatters
          offer lenient parsing options to handle such cases during formatting,
          optionally stripping comments or fixing trailing commas.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Lenient Parsing</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Input (Invalid JSON)
{
  "name": "Test", // Name of the item
  "value": 123,
  "items": [
    1,
    2, // Trailing comma
  ]
}

// Output (Valid JSON after lenient parsing and formatting)
{
  "name": "Test",
  "value": 123,
  "items": [
    1,
    2
  ]
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <HardDrive className="w-6 h-6" /> Handling Large JSON Files Efficiently
        </h2>
        <p>
          Loading multi-gigabyte JSON files into memory to format them is not feasible.
          Advanced formatters or custom solutions employ streaming or parsing
          techniques that process the file chunk by chunk, writing the
          formatted output progressively.
        </p>
        <p>
          This often involves event-based parsing (SAX-like) or custom state
          machines that track depth within the JSON structure without building
          a full in-memory Abstract Syntax Tree (AST) for the entire file.
          The challenge is maintaining correct indentation and line breaks
          across nested structures processed in chunks.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Streaming Logic:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Pseudocode
let indentLevel = 0;
let inArray = false;
let inObject = false;
const indentChar = '  '; // or '\\t'

read file character by character:
  if character is '{':
    print '{';
    indentLevel++;
    inObject = true;
    if next character is not '}': print '\\n' + indentChar.repeat(indentLevel);
  else if character is '}':
    indentLevel--;
    if previous character was not '{': print '\\n' + indentChar.repeat(indentLevel);
    print '}';
    inObject = false;
    // Handle comma/newline after object
  else if character is '[':
    print '[';
    indentLevel++;
    inArray = true;
    if next character is not ']': print '\\n' + indentChar.repeat(indentLevel);
  else if character is ']':
    indentLevel--;
    if previous character was not '[': print '\\n' + indentChar.repeat(indentLevel);
    print ']';
    inArray = false;
    // Handle comma/newline after array
  else if character is ',':
    print ',';
    print '\\n' + indentChar.repeat(indentLevel); // Newline after comma
  else if character is ':':
    print ': '; // Space after colon
  else if character is '"':
    handle string (read until closing '"', handle escapes);
    print string;
  else if character is digit or '-':
    handle number;
    print number;
  else if character is 't', 'f', 'n':
    handle true, false, null;
    print keyword;
  // Skip whitespace unless inside a string

// This is a highly simplified example; real streaming parsers are more complex.`}
            </pre>
          </div>
        </div>
        <p>
          Libraries and tools designed for this purpose are crucial when dealing
          with massive datasets like logs, database exports, or large APIs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck className="w-6 h-6" /> Integrating Validation and Linting
        </h2>
        <p>
          Advanced JSON formatting isn't just about aesthetics; it can be
          combined with validation and linting to ensure data correctness and
          adherence to standards or schemas.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CheckCheck className="w-5 h-5" /> Syntax Validation During Formatting
        </h3>
        <p>
          A good formatter should always validate syntax. If the input JSON is
          malformed beyond recoverable lenient parsing, the formatter should
          report an error rather than producing invalid output.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5" /> Schema Validation
        </h3>
        <p>
          For critical JSON data (like configuration files, API requests/responses),
          validating against a JSON Schema is vital. Some advanced tools
          can integrate schema validation into the formatting process,
          optionally reporting errors or even attempting basic auto-corrections
          (though auto-correction based on schema is complex and often avoided
          by formatters).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileCode className="w-5 h-5" /> Linting for Style and Content
        </h3>
        <p>
          Beyond syntax and schema, linters can check for stylistic issues (like
          duplicate keys, specific value types) or content rules. Combining
          linting and formatting ensures both structural correctness and
          stylistic consistency. Tools like Prettier often include JSON formatting
          and integrate with linters.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Diff className="w-6 h-6" /> Generating Diffs of Formatted JSON
        </h2>
        <p>
          When working with version control, consistent formatting is essential
          for generating meaningful diffs. By applying a deterministic, advanced
          formatter (especially one that sorts keys) before committing changes,
          you ensure that diffs show only actual data modifications, not just
          whitespace or key order changes.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Diff with/without Sorting</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// File v1 (Unsorted, slightly different spacing)
{
  "beta": 2,
  "alpha": 1
}

// File v2 (Same data, different order, different spacing)
{
  "alpha": 1,
  "beta": 2
}

// Diff without consistent formatting: shows lines changed
// -  "beta": 2,
// -  "alpha": 1
// +  "alpha": 1,
// +  "beta": 2

// File v1 (Formatted & Sorted)
{
  "alpha": 1,
  "beta": 2
}

// File v2 (Data change, formatted & Sorted)
{
  "alpha": 1,
  "beta": 3 // Value changed
}

// Diff WITH consistent formatting: shows only data change
//   "alpha": 1,
// - "beta": 2
// + "beta": 3
`}
            </pre>
          </div>
        </div>
        <p>
          Using tools that guarantee deterministic output is key for effective
          code reviews and change tracking.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <SquareCode className="w-6 h-6" /> Integration into Workflows
        </h2>
        <p>
          Manual formatting is tedious and error-prone. Advanced techniques
          emphasize integrating formatting into automated workflows:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>CLI Tools:</strong> Using command-line JSON processors
            (like `jq`, `json_pp`, or dedicated formatters) allows scripting
            and batch processing.
          </li>
          <li>
            <strong>Code Editors/IDEs:</strong> Most modern editors have
            built-in or plugin-based JSON formatters. Configuring these
            to use specific styles (e.g., via a config file like `.prettierrc`)
            ensures consistency across a team.
          </li>
          <li>
            <strong>Pre-commit Hooks:</strong> Using tools like Husky and
            lint-staged to automatically format JSON files before they are
            committed ensures that only properly formatted code enters the repository.
          </li>
          <li>
            <strong>Build Pipelines:</strong> Incorporating formatting checks
            or steps into CI/CD pipelines can catch unformatted files before
            deployment.
          </li>
        </ul>
        <p>
          Automated formatting via these integrations saves time and enforces
          a consistent codebase style.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye className="w-6 h-6" /> Visualizing and Collapsing Structures
        </h2>
        <p>
          While not strictly "formatting" the text file, advanced JSON tools
          (especially web-based or desktop viewers) offer features to improve
          the *visual* understanding of complex JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Collapsible Nodes:</strong> Allows hiding nested objects or
            arrays to focus on the top-level structure.
          </li>
          <li>
            <strong>Syntax Highlighting:</strong> Color-coding keys, values,
            primitives, etc., enhances readability.
          </li>
          <li>
            <strong>Tree Views:</strong> Presenting JSON as an interactive tree
            structure.
          </li>
          <li>
            <strong>Search and Filtering:</strong> Quickly finding keys or values
            within large documents.
          </li>
        </ul>
        <p>
          These features are often demonstrated in screencasts to show how
          developers interact with and navigate complex JSON visually.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Layers className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Mastering advanced JSON formatting techniques and tools is crucial
          for developers working with significant amounts of JSON data. From
          efficiently handling multi-gigabyte files and customizing output styles
          to integrating validation and automation into workflows, these skills
          enhance productivity, improve code consistency, and help maintain
          data integrity. Exploring these capabilities through screencasts
          or hands-on experimentation with powerful JSON processing tools
          is highly recommended for any developer looking to move beyond
          basic pretty-printing.
        </p>
      </div>
    </>
  );
}