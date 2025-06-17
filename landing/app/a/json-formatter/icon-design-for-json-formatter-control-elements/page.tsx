import type { Metadata } from "next";
import {
  ChevronRight,
  ChevronDown,
  Copy,
  Trash2,
  Search,
  Paintbrush,
  Minimize2,
  Download,
  Upload,
  FileText,
  GitCompareArrows,
  SquarePlus,
  SquarePen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Icon Design for JSON Formatter Controls | Development Guide",
  description:
    "Explore effective icon design principles and examples for control elements in JSON formatter and viewer interfaces, using Lucide React icons.",
};

export default function JsonFormatterIconDesignArticle() {
  return (
    <article className="container mx-auto px-4 py-8 space-y-8">
      <header>
        <h1 className="text-4xl font-bold mb-4">Icon Design for JSON Formatter Control Elements</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A guide to choosing clear and effective icons for interacting with JSON data in a user interface.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Introduction</h2>
        <p>
          JSON formatters and viewers are essential tools for developers, helping to make complex JSON data readable and
          manageable. A key part of their usability lies in the control elements that allow users to interact with the
          data – expanding/collapsing nodes, editing values, adding new properties, deleting entries, and more.
          Effective icons for these controls are crucial for a good user experience, providing visual cues that are
          quickly understood.
        </p>
        <p>
          This article explores common control elements found in JSON formatters and suggests suitable icons from the{" "}
          <code>lucide-react</code> library, offering insights into why certain icons work well in this context and
          general principles for designing or selecting icons for such interfaces.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Common JSON Control Elements and Icon Suggestions</h2>
        <p>
          Here we look at typical actions a user performs on JSON data within a formatter interface and pair them with
          appropriate icons from the
          <code>lucide-react</code> library. We'll consider different contexts, such as icons appearing next to
          individual nodes versus global actions.
        </p>

        <h3 className="text-xl font-semibold mt-6">Expand/Collapse Nodes</h3>
        <p>
          JSON objects (&#x7b;...&#x7d;) and arrays ([...]) are hierarchical. Users need controls to show or hide the
          contents of these nodes.
        </p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <ChevronRight className="w-6 h-6 text-blue-500" />
          <p>
            <strong>Expand:</strong> Indicates the node is currently collapsed and can be expanded. Common icons:{" "}
            <code className="font-mono text-sm">ChevronRight</code>, <code className="font-mono text-sm">Plus</code>,{" "}
            <code className="font-mono text-sm">FolderClosed</code>.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <ChevronDown className="w-6 h-6 text-blue-500" />
          <p>
            <strong>Collapse:</strong> Indicates the node is currently expanded and can be collapsed. Common icons:{" "}
            <code className="font-mono text-sm">ChevronDown</code>, <code className="font-mono text-sm">Minus</code>,{" "}
            <code className="font-mono text-sm">FolderOpenDot</code> (or similar open folder icon).
          </p>
        </div>
        <p>
          <code>ChevronRight</code> / <code>ChevronDown</code> are standard for tree-like structures. <code>Plus</code>{" "}
          / <code>Minus</code> or folder icons are also intuitive alternatives.
        </p>

        <h3 className="text-xl font-semibold mt-6">Copy Node Value or Path</h3>
        <p>
          Allowing users to quickly copy parts of the JSON (the value, the key, or the full path to the node) is very
          useful.
        </p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Copy className="w-6 h-6 text-green-500" />
          <p>
            <strong>Copy:</strong> Represents the action of copying data to the clipboard. The standard{" "}
            <code className="font-mono text-sm">Copy</code> icon (two overlapping squares) is universally recognized.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Add New Element/Property</h3>
        <p>For editable formatters, adding new entries to objects or arrays is a core function.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <SquarePlus className="w-6 h-6 text-blue-500" />
          <p>
            <strong>Add:</strong> Signifies adding a new item. Icons like{" "}
            <code className="font-mono text-sm">Plus</code> or <code className="font-mono text-sm">SquarePlus</code> are
            clear choices.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Delete Element/Property</h3>
        <p>Removing entries from the JSON structure.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Trash2 className="w-6 h-6 text-red-500" />
          <p>
            <strong>Delete:</strong> Indicates removal. The <code className="font-mono text-sm">Trash2</code> (or{" "}
            <code className="font-mono text-sm">Trash</code>) icon is standard for deletion.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Edit Value/Key</h3>
        <p>Changing the value of a primitive (string, number, boolean, null) or the key of an object property.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <SquarePen className="w-6 h-6 text-yellow-500" />
          <p>
            <strong>Edit:</strong> Represents modification. Icons like{" "}
            <code className="font-mono text-sm">PencilLine</code> or{" "}
            <code className="font-mono text-sm">SquarePen</code> are commonly used for editing.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Search/Filter</h3>
        <p>Finding specific keys or values within the potentially large JSON structure.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Search className="w-6 h-6 text-purple-500" />
          <p>
            <strong>Search:</strong> The <code className="font-mono text-sm">Search</code> icon (magnifying glass) is
            universally recognized for searching or filtering content.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Format / Beautify</h3>
        <p>Applying pretty-printing (indentation, line breaks) to the raw JSON text.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Paintbrush className="w-6 h-6 text-pink-500" />
          <p>
            <strong>Format/Beautify:</strong> Suggests cleaning up or making something look better. Icons like{" "}
            <code className="font-mono text-sm">Paintbrush</code>,{" "}
            <code className="font-mono text-sm">AlignJustify</code>, or <code className="font-mono text-sm">Code</code>{" "}
            can work. <code className="font-mono text-sm">Paintbrush</code> implies making it "pretty".
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Compact</h3>
        <p>Removing unnecessary whitespace to make the JSON smaller, often for transmission or storage.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Minimize2 className="w-6 h-6 text-orange-500" />
          <p>
            <strong>Compact:</strong> Implies making something smaller or reducing space. Icons like{" "}
            <code className="font-mono text-sm">Minimize2</code> or <code className="font-mono text-sm">Shrink</code>{" "}
            are suitable.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Download JSON</h3>
        <p>Saving the current JSON content to a local file.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Download className="w-6 h-6 text-blue-500" />
          <p>
            <strong>Download:</strong> Standard icon for saving/downloading data. The{" "}
            <code className="font-mono text-sm">Download</code> icon (arrow pointing down to a line/tray) is widely
            understood.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Upload JSON</h3>
        <p>Loading JSON content from a local file.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Upload className="w-6 h-6 text-blue-500" />
          <p>
            <strong>Upload:</strong> Standard icon for loading/uploading data. The{" "}
            <code className="font-mono text-sm">Upload</code> icon (arrow pointing up from a line/tray) is the
            counterpart to download.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">View Raw JSON</h3>
        <p>Switching between the formatted tree view and the raw text view of the JSON.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <FileText className="w-6 h-6 text-gray-500" />
          <p>
            <strong>View Raw Text:</strong> Represents a document with text.{" "}
            <code className="font-mono text-sm">FileText</code> or simply{" "}
            <code className="font-mono text-sm">Text</code> are good options.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Compare JSON</h3>
        <p>Comparing two JSON structures or the current structure with a previous version.</p>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <GitCompareArrows className="w-6 h-6 text-teal-500" />
          <p>
            <strong>Compare:</strong> Suggests a comparison or difference. Icons like{" "}
            <code className="font-mono text-sm">GitCompareArrows</code> (or{" "}
            <code className="font-mono text-sm">Diff</code>, if available) are suitable.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">General Icon Design Principles for Controls</h2>
        <p>
          Beyond choosing appropriate individual icons, consider these principles for a cohesive and user-friendly
          interface:
        </p>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Clarity and Recognizability:</strong> Icons should be instantly recognizable and their meaning
            clear. Test them with users if possible. Avoid overly abstract icons for common actions.
          </li>
          <li>
            <strong>Consistency:</strong> Use icons from the same style set (like Lucide React) to ensure visual
            consistency in stroke weight, corner radius, level of detail, etc. Maintain consistent sizing and spacing.
          </li>
          <li>
            <strong>Simplicity:</strong> Keep icons simple and avoid excessive detail, especially at small sizes. They
            need to read well as small interactive elements.
          </li>
          <li>
            <strong>Context Matters:</strong> While a trash can icon is standard for delete, consider if a red 'X' might
            be better next to an individual item in a list where space is limited. Ensure the icon makes sense within
            the specific layout and context (e.g., next to a node vs. in a toolbar).
          </li>
          <li>
            <strong>Color (Use Sparingly and Meaningfully):</strong> Use color intentionally. Red often signifies
            destructive actions (Delete), green for positive/add actions, blue for primary actions (Copy, Download).
            Avoid relying solely on color for meaning due to accessibility considerations.
          </li>
          <li>
            <strong>Provide Tooltips:</strong> Always complement icons with tooltips or labels on hover/focus to provide
            a clear text description of the action, especially for less common icons or for accessibility.
          </li>
          <li>
            <strong>Scale Responsibly:</strong> Ensure icons scale well and remain clear at different sizes if your UI
            is responsive or supports zoom.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Examples in Code (Using Lucide React)</h2>
        <p>
          Integrating Lucide React icons into your TSX components is straightforward. After installing the library, you
          can import specific icons and use them directly as components. You can apply standard CSS classes for styling.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Node Control Buttons</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Hypothetical component snippet showing control buttons for a JSON node.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { Copy, SquarePen, SquarePlus, Trash2, ChevronRight, ChevronDown } from 'lucide-react';

// Assume nodeData, isExpanded, nodePath are defined elsewhere

// ... inside your JSON tree rendering component ...

<div className="flex items-center space-x-1">
  {/* Expand/Collapse Toggle */}
  {typeof nodeData === 'object' && nodeData !== null && (
    <button aria-label={isExpanded ? "Collapse node" : "Expand node"} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
  )}

  {/* Copy Value */}
  <button aria-label="Copy value" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Copy className="w-4 h-4" />
  </button>

  {/* Copy Path (Optional button) */}
  {/*
  <button aria-label="Copy path" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Code className="w-4 h-4" /> {/* Using Code icon for path *}
  </button>
  */}

  {/* Add Button (Visible for objects/arrays) */}
  {(Array.isArray(nodeData) || (typeof nodeData === 'object' && nodeData !== null && !Array.isArray(nodeData))) && (
    <button aria-label="Add new item" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-blue-500">
      <SquarePlus className="w-4 h-4" />
    </button>
  )}

  {/* Edit Button (Visible for primitive values) */}
  {typeof nodeData !== 'object' || nodeData === null && (
    <button aria-label="Edit value" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-yellow-500">
      <SquarePen className="w-4 h-4" />
    </button>
  )}

  {/* Delete Button */}
  <button aria-label="Delete item" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-red-500">
    <Trash2 className="w-4 h-4" />
  </button>
</div>
`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Global Toolbar Buttons</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Hypothetical component snippet showing controls in a toolbar.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { Search, Paintbrush, Minimize2, Download, Upload, FileText, GitCompareArrows } from 'lucide-react';

// ... inside your JSON formatter toolbar component ...

<div className="flex items-center space-x-4">
  {/* Search */}
  <button aria-label="Search JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Search className="w-5 h-5" />
    <span className="hidden md:inline">Search</span>
  </button>

  {/* Format */}
  <button aria-label="Format JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Paintbrush className="w-5 h-5" />
    <span className="hidden md:inline">Format</span>
  </button>

  {/* Compact */}
  <button aria-label="Compact JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Minimize2 className="w-5 h-5" />
    <span className="hidden md:inline">Compact</span>
  </button>

  {/* Download */}
  <button aria-label="Download JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Download className="w-5 h-5" />
    <span className="hidden md:inline">Download</span>
  </button>

  {/* Upload */}
  <button aria-label="Upload JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <Upload className="w-5 h-5" />
    <span className="hidden md:inline">Upload</span>
  </button>

  {/* View Raw */}
  <button aria-label="View raw JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <FileText className="w-5 h-5" />
    <span className="hidden md:inline">Raw</span>
  </button>

  {/* Compare (Optional) */}
  <button aria-label="Compare JSON" className="flex items-center gap-1 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
    <GitCompareArrows className="w-5 h-5" />
    <span className="hidden md:inline">Compare</span>
  </button>

</div>
`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Conclusion</h2>
        <p>
          Well-chosen icons significantly enhance the usability of JSON formatter controls by providing instant visual
          identification of actions. The <code>lucide-react</code> library offers a wide range of clear, modern icons
          that are well-suited for such interfaces. By adhering to principles of clarity, consistency, and simplicity,
          and by providing supplementary text (like tooltips), developers can create intuitive and accessible JSON
          tools.
        </p>
        <p>
          Remember to always consider the specific context where an icon will appear and test its effectiveness with
          users to ensure it communicates its intended function clearly.
        </p>
      </section>
    </article>
  );
}
