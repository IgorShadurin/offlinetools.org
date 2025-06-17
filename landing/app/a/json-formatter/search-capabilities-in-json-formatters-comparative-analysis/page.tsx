import React from "react";
import { Search, Filter, Code, FileJson, ListChecks } from "lucide-react";

export default function JsonFormatterSearchCapabilitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Search size={30} />
        <span>Search Capabilities in JSON Formatters: Comparative Analysis</span>
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange on the web and beyond.
          As developers interact with JSON data, often large and deeply nested, navigating and finding specific pieces
          of information can become challenging. This is where JSON formatters and viewers come in handy, providing
          structured, syntax-highlighted, and collapsible views of the data. A crucial feature that elevates a good
          formatter to a great one is robust search capability.
        </p>
        <p>
          This page explores different types of search functionalities found in JSON formatters, comparing their
          utility, complexity, and typical use cases to help developers understand what features are valuable and
          potentially how to approach implementing them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Search size={24} />
          <span>Why Search in a JSON Formatter?</span>
        </h2>
        <p>
          JSON data, especially from APIs or configuration files, can be extensive. Manually scrolling through thousands
          of lines or collapsing/expanding nodes to find a specific key or value is inefficient and error-prone. Search
          functionality allows developers to quickly:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Locate a specific key name (e.g., finding where <code>"userId"</code> is used).
          </li>
          <li>
            Find all occurrences of a specific value (e.g., finding all objects where <code>"status"</code> is{" "}
            <code>"error"</code>).
          </li>
          <li>Navigate to a known data point deep within the structure using its path.</li>
          <li>Identify specific patterns within strings or across values.</li>
        </ul>
        <p>
          Efficient search significantly improves productivity when debugging, exploring unfamiliar data structures, or
          verifying data integrity.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListChecks size={24} />
          <span>Types of Search Capabilities</span>
        </h2>
        <p>
          JSON formatters offer a range of search features, varying in complexity and power. Here's a breakdown of
          common types:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Search size={20} />
          <span>1. Simple Text Search</span>
        </h3>
        <p>
          This is the most basic form, equivalent to using your browser's "Find" (Ctrl+F or Cmd+F) within the rendered
          text view of the JSON. It treats the formatted JSON as a plain text document and searches for substring
          matches.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>How it works:</strong> Scans the formatted text string for occurrences of the search query.
          </li>
          <li>
            <strong>Pros:</strong> Simple to implement, familiar to users. Can find matches in keys, values (strings,
            numbers, booleans, null), and even structural characters like <code>[, ], &#x7b;, &#x7d;</code>.
          </li>
          <li>
            <strong>Cons:</strong> Ignores the underlying data structure. Finding a value like <code>123</code> might
            match a key <code>"field123"</code> or a string <code>"ID: 123"</code>. Cannot easily search for specific
            types or within specific paths. Might match collapsed text depending on implementation.
          </li>
          <li>
            <strong>Use Cases:</strong> Quickly finding a key name, locating a known string value, finding any mention
            of a specific word or number.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example (Conceptual UI):</h4>
          <p>
            Input field: <kbd>userId</kbd>
          </p>
          <p>Matches: Highlights "userId" wherever it appears in the formatted text.</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
            {`{
  "users": [
    {
      "userId": "abc-123", // Match
      "name": "Alice"
    },
    {
      "id": "def-456",
      "userId": "def-456" // Match
    }
  ],
  "activity": {
    "login_count": 5,
    "last_activity_date": "2023-10-27"
  }
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Code className="inline-block mr-1" size={14} /> This searches the literal text shown.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Filter size={20} />
          <span>2. Structure-Aware Search (Key/Value Search)</span>
        </h3>
        <p>
          This type of search understands the JSON structure. It allows searching specifically within keys, values, or
          both, optionally filtering by data type.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>How it works:</strong> Traverses the parsed JSON object/array structure. For each node (key or
            value), it checks if it matches the search criteria.
          </li>
          <li>
            <strong>Pros:</strong> More precise than simple text search. Can distinguish between finding a key and
            finding a value. Can filter by type (e.g., find all number values greater than 10).
          </li>
          <li>
            <strong>Cons:</strong> Requires parsing the JSON. Search syntax needs definition (e.g., separate fields for
            key/value, or a query language).
          </li>
          <li>
            <strong>Use Cases:</strong> Find all objects with a specific key, find all string values containing
            "pending", find all number values within a certain range.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example (Conceptual UI/Syntax):</h4>
          <p>
            Search Type: <kbd>Value</kbd>, Query: <kbd>Alice</kbd>
          </p>
          <p>
            Matches: Highlights the <em>value</em> "Alice".
          </p>
          <p>
            Search Type: <kbd>Key</kbd>, Query: <kbd>id</kbd>
          </p>
          <p>
            Matches: Highlights the <em>key</em> "id".
          </p>
          <p>
            Search Type: <kbd>Value (Number)</kbd>, Condition: <kbd>&gt; 0</kbd>
          </p>
          <p>
            Matches: Highlights <code>5</code> (value of login_count).
          </p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
            {`{
  "users": [
    {
      "userId": "abc-123",
      "name": "Alice" // Value match for "Alice"
    },
    {
      "id": "def-456", // Key match for "id"
      "userId": "def-456"
    }
  ],
  "activity": {
    "login_count": 5, // Value match for > 0
    "last_activity_date": "2023-10-27"
  }
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Code className="inline-block mr-1" size={14} /> This searches the underlying data structure, not just the
            text representation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Filter size={20} />
          <span>3. Path-Based Search (JSONPath/Dot Notation)</span>
        </h3>
        <p>
          Advanced formatters allow searching or filtering based on the location of data within the JSON tree, often
          using a query language similar to XPath for XML, such as JSONPath or simple dot notation.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>How it works:</strong> Parses a path expression (e.g., <code>$.users[0].name</code>,{" "}
            <code>$..userId</code>) and traverses the JSON structure according to the path, returning the matching
            nodes.
          </li>
          <li>
            <strong>Pros:</strong> Extremely powerful for targeting specific data points or sets of data based on their
            structural location. Can select data from arrays, objects, use wildcards, and recursive descent operators.
          </li>
          <li>
            <strong>Cons:</strong> Requires understanding a query syntax (JSONPath can be complex). Implementation is
            significantly more involved.
          </li>
          <li>
            <strong>Use Cases:</strong> Extracting all user IDs (<code>$..userId</code>), getting the name of the first
            user (<code>$.users[0].name</code>), finding all prices within items (<code>$.items[*].price</code>).
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example (JSONPath Syntax):</h4>
          <p>
            Query: <kbd>$.users[0].name</kbd>
          </p>
          <p>Matches: Highlights or returns the value "Alice".</p>
          <p>
            Query: <kbd>$..userId</kbd>
          </p>
          <p>Matches: Highlights or returns the values "abc-123", "def-456".</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
            {`{
  "users": [
    { // $.users[0]
      "userId": "abc-123", // $.users[0].userId - Match for $..userId
      "name": "Alice" // $.users[0].name - Match for $.users[0].name
    },
    { // $.users[1]
      "id": "def-456",
      "userId": "def-456" // $.users[1].userId - Match for $..userId
    }
  ],
  "activity": {
    "login_count": 5,
    "last_activity_date": "2023-10-27"
  }
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Code className="inline-block mr-1" size={14} /> Requires a JSONPath engine or similar path traversal logic.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code size={20} />
          <span>4. Regular Expression Search</span>
        </h3>
        <p>
          Allowing regular expressions provides a powerful way to find complex patterns within string values or key
          names. This is often combined with simple text search or structure-aware search (specifically for string
          values/keys).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>How it works:</strong> Uses regex matching against the string representation of keys or values
            during traversal.
          </li>
          <li>
            <strong>Pros:</strong> Highly flexible for pattern matching (e.g., finding all keys starting with "user",
            finding all email addresses in string values).
          </li>
          <li>
            <strong>Cons:</strong> Regex syntax can be intimidating for beginners. Can be slower on very large JSON or
            complex regexes.
          </li>
          <li>
            <strong>Use Cases:</strong> Finding keys matching a certain pattern, extracting values that look like URLs
            or email addresses, validating data formats within strings.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example (Conceptual UI/Syntax):</h4>
          <p>
            Search Type: <kbd>Value (String)</kbd>, Query:{" "}
            <kbd>
              /^\d{4}-\d{2}-\d{2}$/
            </kbd>{" "}
            (Regex for YYYY-MM-DD)
          </p>
          <p>Matches: Highlights the value "2023-10-27".</p>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
            {`{
  "users": [
    {
      "userId": "abc-123",
      "name": "Alice"
    },
    {
      "id": "def-456",
      "userId": "def-456"
    }
  ],
  "activity": {
    "login_count": 5,
    "last_activity_date": "2023-10-27" // Regex match
  }
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Code className="inline-block mr-1" size={14} /> Requires a regex engine and integration with structure
            traversal.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListChecks size={24} />
          <span>Comparative Analysis & Implementation Considerations</span>
        </h2>

        <p>Choosing which search capabilities to include (or use in a formatter) involves trade-offs:</p>

        <h3 className="text-xl font-semibold mt-6">Ease of Use vs. Power</h3>
        <p>
          Simple text search is the easiest for users to grasp. Structure-aware search adds precision but requires
          learning search options. Path-based search is the most powerful for navigation and selection but has the
          steepest learning curve due to its specific syntax. Regex search offers power for pattern matching but
          requires regex knowledge.
        </p>

        <h3 className="text-xl font-semibold mt-6">Implementation Complexity</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simple Text Search:</strong> Relatively easy. Can often be built using browser native search (if
            targeting HTML output) or standard string searching algorithms.
          </li>
          <li>
            <strong>Structure-Aware Search:</strong> Requires traversing the parsed JSON object. Needs logic to check
            node types (object, array, value), key names, and value types/contents against criteria. Moderately complex.
          </li>
          <li>
            <strong>Path-Based Search:</strong> Requires parsing the path expression (e.g., implementing a mini JSONPath
            parser) and a complex traversal algorithm that handles recursion, wildcards, array indexing, etc. High
            complexity.
          </li>
          <li>
            <strong>Regular Expression Search:</strong> Requires integrating a regex engine and applying it to relevant
            nodes during traversal. Complexity depends on where it's applied (just strings? also keys?).
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Performance on Large Data</h3>
        <p>For large JSON files (megabytes or more), search performance is critical.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simple Text Search:</strong> Can be slow if implemented naively on the entire formatted string. More
            performant if searching the underlying data structure and mapping results back to the text representation,
            or using optimized string search algorithms.
          </li>
          <li>
            <strong>Structure-Aware Search:</strong> Requires traversing the data structure, which is generally faster
            than iterating through a massive text string, but can still be slow if the JSON is very deep or wide.
            Indexing (e.g., creating a flat list of paths and values) can significantly speed this up.
          </li>
          <li>
            <strong>Path-Based Search:</strong> Performance depends heavily on the path expression and the
            implementation efficiency of the JSONPath engine. Recursive descent (<code>$..</code>) can be particularly
            taxing on deep structures. Indexing can help here too.
          </li>
          <li>
            <strong>Regular Expression Search:</strong> Regex complexity is a major factor. Applying complex regexes to
            many large strings can be computationally expensive.
          </li>
        </ul>
        <p>
          <strong>Indexing:</strong> For formatters dealing with potentially large data, building an index (e.g., a
          flattened list of all key-value pairs or all paths with their values) during the initial parsing/formatting
          step can make subsequent searches much faster, especially for structure-aware and path-based queries.
        </p>

        <h3 className="text-xl font-semibold mt-6">User Interface (UI)</h3>
        <p>The UI needs to clearly present the search options and the results.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A simple search box with optional case sensitivity and regex toggles is standard.</li>
          <li>
            For structure-aware or path-based search, a more complex input area or separate fields might be needed,
            perhaps with autocompletion or validation for paths/queries.
          </li>
          <li>Highlighting matches in the formatted tree view is essential.</li>
          <li>Providing navigation between matches (e.g., "Next", "Previous" buttons) is crucial for usability.</li>
          <li>Displaying the count of matches gives users feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson size={24} />
          <span>Practical Considerations for Developers</span>
        </h2>
        <p>
          When building a JSON formatter or choosing one, consider the typical data size and complexity users will
          encounter.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>For simple use cases and smaller JSON, a basic text search might suffice.</li>
          <li>
            For debugging APIs or working with moderately complex configurations, structure-aware key/value search is
            highly beneficial.
          </li>
          <li>
            For power users who frequently interact with large, deeply nested, or repetitive structures, path-based
            search or advanced filtering with regex support provides the most value.
          </li>
          <li>
            Performance optimizations like lazy rendering and indexing are key for handling large JSON files gracefully,
            regardless of the search type.
          </li>
          <li>
            Clear UI and helpful feedback (match count, navigation, error messages for invalid queries) are paramount
            for user satisfaction.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Search is a fundamental feature that significantly enhances the usability of JSON formatters. While simple
          text search is a good starting point, structure-aware, path-based, and regex capabilities offer increasing
          levels of power and precision for navigating complex data. Developers building formatters must balance
          implementation complexity against the needs of their target users and the expected data scale, potentially
          employing indexing and efficient algorithms to ensure responsiveness, even with large JSON payloads.
          Understanding these different approaches allows developers to choose or build the right tool for the job,
          transforming cumbersome data exploration into an efficient workflow.
        </p>
      </div>
    </div>
  );
}
