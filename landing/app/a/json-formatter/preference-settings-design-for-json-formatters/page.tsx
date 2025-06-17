import type { Metadata } from "next";
import {
  Cog,
  Code,
  LayoutList,
  Palette,
  ZoomIn,
  ZoomOut,
  CheckSquare,
  Square,
  Diff,
  AlignLeft,
  ListTree,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Preference Settings Design for JSON Formatters | Offline Tools",
  description:
    "Explore the key considerations and options when designing preference settings for JSON formatting tools, covering indentation, spacing, line breaks, and more.",
};

export default function JsonFormatterPreferencesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Cog size={32} /> Preference Settings Design for JSON Formatters
      </h1>

      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <p>
          JSON (JavaScript Object Notation) has become the ubiquitous data interchange format. While its simple,
          human-readable structure is a key strength, the exact presentation can vary. Formatting tools help standardize
          or beautify JSON output, making it easier to read, debug, and compare. A critical part of a robust JSON
          formatter is its ability to customize the output through user-defined preferences. This article explores the
          various settings developers often need and how to approach their design.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette size={24} /> Why Preferences Matter
        </h2>
        <p>
          Different teams, projects, or even individuals have varying style guides or personal preferences for code
          formatting. Forcing a single, opinionated style can be counterproductive. Customizable settings allow a
          formatter to adapt to different contexts:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Readability:</strong> Users can choose indentation and spacing that feels most comfortable to them.
          </li>
          <li>
            <strong>Consistency:</strong> Enforce a specific style across a codebase or team.
          </li>
          <li>
            <strong>Tool Integration:</strong> Match the output format of other tools or language-specific formatters.
          </li>
          <li>
            <strong>Diff Friendliness:</strong> Choose settings that minimize changes when comparing different versions
            of JSON files (e.g., consistent key ordering).
          </li>
          <li>
            <strong>Compactness:</strong> Generate minimal output for storage or transmission when readability isn't the
            primary goal.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Core Setting Categories
        </h2>
        <p>
          Most JSON formatter preferences fall into a few key categories that control the visual layout of the data.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <AlignLeft size={20} /> 1. Indentation
        </h3>
        <p>This is arguably the most fundamental setting, controlling how nested structures are visually offset.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Style (Spaces vs. Tabs):</strong>
            <p>
              Allows the user to choose between using space characters or tab characters for indentation. This is a
              long-standing debate in programming style guides.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Spaces vs. Tabs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Using Spaces:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "name": "Example",
  "version": "1.0",
  "data": [
    1,
    2
  ]
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">Using Tabs:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm whitespace-pre">
                      {`{
\t"name": "Example",
\t"version": "1.0",
\t"data": [
\t\t1,
\t\t2
\t]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <strong>Size (Number of Spaces/Tab Width):</strong>
            <p>
              Specifies how many space characters to use per indentation level, or the visual width of a tab character.
              Common values are 2 or 4 spaces.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: 2 Spaces vs. 4 Spaces</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">2 Spaces:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "key": {
    "nested": [
      1,
      2
    ]
  }
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">4 Spaces:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
    "key": {
        "nested": [
            1,
            2
        ]
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <LayoutList size={20} /> 2. Spacing
        </h3>
        <p>Controls the use of spaces around various JSON syntax elements like commas, colons, brackets, and braces.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Space After Comma:</strong>
            <p>
              Determines if a space should follow a comma (e.g., <code>1, 2</code> vs. <code>1,2</code>).
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Space After Comma</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Space Used:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">{`[1, 2, 3]`}</pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">No Space:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">{`[1,2,3]`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <strong>Space Around Colon:</strong>
            <p>
              Controls spacing around the colon in key-value pairs (e.g., <code>"key": "value"</code> vs.{" "}
              <code>"key":"value"</code>). Common styles include <code>": "</code> (space after) or <code>" : "</code>{" "}
              (space around).
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Space Around Colon</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Space After Colon (Common):</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "name": "Alice",
  "age": 30
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">No Space:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "name":"Alice",
  "age":30
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <strong>Spaces Within Brackets/Braces:</strong>
            <p>
              Whether to include spaces immediately inside opening brackets <code>[</code>, closing brackets{" "}
              <code>]</code>, opening braces <code>&#x7b;</code>, and closing braces <code>&#x7d;</code> (e.g.,{" "}
              <code>[ 1, 2 ]</code> vs. <code>[1, 2]</code>).
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Spaces Inside Brackets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Spaces Used:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">{`[ 1, 2, 3 ]`}</pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">No Spaces:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">{`[1, 2, 3]`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Diff size={20} /> 3. Line Breaks
        </h3>
        <p>
          Settings controlling when new lines are introduced to improve readability, especially for complex or long
          structures.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Empty Line After Object/Array Closure:</strong>
            <p>
              Option to add an extra empty line after a closing brace <code>&#x7d;</code> or bracket <code>]</code>,
              particularly at the top level or between distinct objects in an array, though this is less common for
              standard JSON formatting.
            </p>
          </li>
          <li>
            <strong>Maximum Line Length / Wrap Long Lines:</strong>
            <p>
              Define a maximum character limit for a line. If a line exceeds this limit (e.g., a very long array or
              object value), the formatter might introduce line breaks and indentation to wrap it.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Wrapping Long Arrays (Max 20 Chars)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">No Wrapping:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">{`{ "data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }`}</pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">Wrapped:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "data": [
    1, 2, 3,
    4, 5, 6,
    7, 8, 9,
    10
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <strong>New Line Before First/After Last Element in Object/Array:</strong>
            <p>
              Decide if the first element in an object or array should start on a new line after the opening
              bracket/brace, and if the last element should be on a new line before the closing bracket/brace. This is
              standard for "pretty" printing, but an option to control it can be useful.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Line Breaks Around Elements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Common "Pretty" Style:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "a": 1,
  "b": 2
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">Less Common Style (Compact First/Last):</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{ "a": 1,
  "b": 2 }`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListTree size={20} /> 4. Key Ordering
        </h3>
        <p>
          While JSON objects are fundamentally unordered collections, formatting can impose a specific order on keys for
          consistency, which is invaluable for diffing and comparison tools.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Order Type:</strong>
            <ul className="list-circle pl-6 mt-1 space-y-1">
              <li>
                <CheckSquare size={16} className="inline-block mr-1 text-green-500" /> <strong>Alphabetical:</strong>{" "}
                Sort keys lexicographically. This is the most common and useful option for consistency.
              </li>
              <li>
                <Square size={16} className="inline-block mr-1 text-blue-500" /> <strong>Original:</strong> Preserve the
                order of keys from the input JSON string. Useful when the order might carry semantic meaning (though
                technically it shouldn't in pure JSON).
              </li>
              <li>
                <Square size={16} className="inline-block mr-1 text-yellow-500" /> <strong>Custom:</strong> Allow
                specifying a custom order for certain keys, placing others alphabetically at the end. (More advanced).
              </li>
            </ul>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Key Ordering</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Original (Input: &#x7b; "b": 2, "a": 1 &#x7d; ):</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "b": 2,
  "a": 1
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">Alphabetical:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "a": 1,
  "b": 2
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ZoomIn size={20} /> / <ZoomOut size={20} className="inline-block mr-1" /> 5. Output Compactness
        </h3>
        <p>
          This is often a toggle between "pretty" (human-readable, multi-line) and "compact" (minimal, single-line)
          output.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Compact Output:</strong>
            <p>
              Removes all non-essential whitespace (spaces, newlines) to produce the smallest possible output string.
              Useful for network transmission or storage.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Compact Output</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre className="text-sm">{`{"name":"Example","data":[1,2,3]}`}</pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Pretty Output:</strong>
            <p>Uses indentation, spacing, and line breaks based on other settings to make the JSON easy to read.</p>
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Pretty Output (depends on other settings)</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                <pre className="text-sm">
                  {`{
  "name": "Example",
  "data": [
    1,
    2,
    3
  ]
}`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Specific Compactness Rules:</strong> More granular options might allow compacting empty
            objects/arrays (<code>&#x7b;&#x7d;</code>, <code>[]</code>) or simple key-value pairs onto a single line,
            even in pretty mode.
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-md font-medium mb-2">Example: Compact Empty Objects/Arrays</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-sm mb-1">Empty Structures on New Lines:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "items": [],
  "config": {}
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-sm mb-1">Empty Structures Compacted:</p>
                  <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
                    <pre className="text-sm">
                      {`{
  "items": [],
  "config": {}
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cog size={24} /> Designing the Settings Interface
        </h2>
        <p>How these settings are presented to the user is as important as the settings themselves.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Grouping:</strong> Organize settings logically into collapsible sections or tabs (e.g., General,
            Indentation, Spacing, Advanced).
          </li>
          <li>
            <strong>Clear Labels and Descriptions:</strong> Use straightforward language. Briefly explain what each
            setting does, perhaps with a small example.
          </li>
          <li>
            <strong>Sensible Defaults:</strong> Choose defaults that match common conventions (e.g., 2 or 4 spaces,
            space after colon/comma).
          </li>
          <li>
            <strong>Live Preview:</strong> The most helpful feature is a live preview area that updates the formatted
            output as the user changes settings. This provides immediate feedback.
          </li>
          <li>
            <strong>Import/Export Settings:</strong> Allow users to save and share their preferred configurations.
          </li>
          <li>
            <strong>Integration with Configuration Files:</strong> For developer tools, consider supporting standard
            configuration file formats (like <code>.editorconfig</code> or specific formatter configs) to integrate with
            existing project setups.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckSquare size={24} /> Implementation Considerations
        </h2>
        <p>Implementing these settings requires a flexible formatting engine.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The core formatting logic needs to accept a configuration object containing all the user's preferences.
          </li>
          <li>
            Conditional logic within the formatter will apply different rules based on the configuration (e.g., if
            `useTabs` is true, use `\t`; otherwise, use `indentSize` spaces).
          </li>
          <li>
            Handling key ordering often involves parsing the JSON into a standard data structure, then iterating over
            object keys in the desired order before serializing back to a string.
          </li>
          <li>
            Whitespace handling requires careful control over when newlines and spaces are added or removed during the
            serialization process. Compact output basically means serializing with an indent size of 0 and no extra
            spacing rules.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Conclusion
        </h2>
        <p>
          Designing effective preference settings for a JSON formatter significantly enhances its usability and
          adoption. By covering the core aspects of indentation, spacing, line breaks, and key ordering, and presenting
          these options clearly in the interface, developers can tailor the tool to their specific needs and maintain
          consistent formatting across diverse projects and teams. A live preview remains the single most valuable
          feature for user experience.
        </p>
      </div>
    </>
  );
}
