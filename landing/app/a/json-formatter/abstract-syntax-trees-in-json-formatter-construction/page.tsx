import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON ASTs in Formatter Construction | Offline Tools",
  description:
    "Learn what a JSON AST is, why JSON has no single standard AST shape, and how formatters use tree traversal, source locations, and validation to print clean JSON.",
};

export default function JsonFormatterAstArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Abstract Syntax Trees in JSON Formatter Construction</h1>

      <div className="space-y-6">
        <p>
          A JSON formatter usually works in two phases: parse first, print second. In the parsing phase, the tool turns
          raw JSON text into a tree-shaped internal representation often called a JSON AST, short for Abstract Syntax
          Tree. That tree is what gives the formatter reliable structure instead of forcing it to guess from individual
          characters like <code>&#123;</code>, <code>,</code>, and <code>:</code>.
        </p>
        <p>
          The key detail many searchers miss is that JSON has a standard grammar, but it does not have one official
          AST schema. Different parsers can represent the same document with different node names and different metadata.
          If you are looking for an &quot;AST JSON standard,&quot; the practical answer is that the JSON standard defines
          the data format, while the AST shape is left to each implementation.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Quick Answer: What Is a JSON AST?</h2>
        <p>
          A JSON AST is a tree representation of a JSON document where each node represents a meaningful JSON construct:
          an object, an array, a property, or a scalar value such as a string, number, boolean, or <code>null</code>.
          It is &quot;abstract&quot; because it usually omits presentation details like indentation and line breaks and
          focuses on structure and relationships.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">A useful mental model:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>The raw text is linear, but the AST is hierarchical.</li>
            <li>Objects become object nodes that contain property nodes.</li>
            <li>Arrays become array nodes that contain ordered child values.</li>
            <li>Strings, numbers, booleans, and null become leaf nodes.</li>
            <li>The formatter walks that tree to regenerate readable output.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What JSON Standardizes, and What It Does Not</h2>
        <p>
          The JSON specification in RFC 8259 standardizes the allowed value types and grammar: objects, arrays,
          numbers, strings, booleans, and <code>null</code>. It does not define a universal JSON AST format with fixed
          node names such as <code>ObjectNode</code> or <code>PropertyNode</code>. That is why one parser may return a
          simple object graph while another returns a richer tree with source offsets, diagnostics, and parent links.
        </p>
        <p>
          RFC 8259 also says object member names <em>should</em> be unique. In other words, duplicate keys are not a
          good interoperable practice, and parser behavior can differ when they appear. A formatter built on an AST may
          choose to preserve duplicates exactly as parsed, warn about them, or reject the document before formatting.
        </p>

        <h2 className="text-2xl font-semibold mt-8">AST vs. Plain Parsed Data vs. Concrete Syntax</h2>
        <p>
          This distinction matters in formatter construction because not every parser output is equally useful for
          pretty-printing, validation, or editor tooling.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <span className="font-medium">Plain parsed value:</span> A <code>JSON.parse</code>-style result gives you
              the data values, but it usually loses source positions, duplicate key information, and the original token
              spelling.
            </li>
            <li>
              <span className="font-medium">Concrete syntax tree or token stream:</span> This keeps punctuation and
              every lexical detail, which is useful for editors and non-standard JSON dialects, but often more detailed
              than a formatter needs.
            </li>
            <li>
              <span className="font-medium">AST:</span> This is the middle ground. It keeps the meaningful structure
              of the JSON document and often adds just enough metadata for formatting, diagnostics, transformation, and
              querying.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">What a Practical JSON Formatter Stores in Its AST</h2>
        <p>
          A real formatter often stores more than the bare value tree. The exact shape is implementation-specific, but
          practical JSON ASTs usually include some combination of the following:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>A root node for the document.</li>
            <li>Object nodes with ordered property children.</li>
            <li>Property nodes with separate key and value children.</li>
            <li>Array nodes with ordered element children.</li>
            <li>Scalar nodes for strings, numbers, booleans, and null.</li>
            <li>Source spans such as byte offsets, line numbers, or columns for error reporting.</li>
            <li>Raw token text when the tool needs to preserve or diagnose the original literal spelling.</li>
            <li>Parser diagnostics when the input is invalid or only partially recoverable.</li>
          </ul>
        </div>

        <p>
          That extra metadata is why formatter internals are often richer than plain application data. A parser that
          only returns host-language values cannot easily tell you where a malformed token started, whether the source
          used <code>1e3</code> or <code>1000</code>, or which duplicate key appeared first.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conceptual JSON AST Example</h2>
        <p>
          Consider this JSON input:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{"name":"Ada","tags":["math","logic"],"active":true,"score":1e3}`}
            </pre>
          </div>
        </div>

        <p>
          One parser might represent it with a tree like this. This is illustrative only, not a standard JSON AST
          format:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm">
          <pre>
            {`{
  "type": "Object",
  "children": [
    {
      "type": "Property",
      "key": { "type": "String", "value": "name" },
      "value": { "type": "String", "value": "Ada" }
    },
    {
      "type": "Property",
      "key": { "type": "String", "value": "tags" },
      "value": {
        "type": "Array",
        "children": [
          { "type": "String", "value": "math" },
          { "type": "String", "value": "logic" }
        ]
      }
    },
    {
      "type": "Property",
      "key": { "type": "String", "value": "active" },
      "value": { "type": "Boolean", "value": true }
    },
    {
      "type": "Property",
      "key": { "type": "String", "value": "score" },
      "value": { "type": "Number", "value": 1000, "raw": "1e3" }
    }
  ]
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How AST Traversal Becomes Formatted Output</h2>
        <p>
          Once the parser has built the tree, formatting becomes a controlled traversal problem rather than a fragile
          text-replacement problem.
        </p>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">
            <span className="font-semibold">Parse and validate:</span> The formatter first confirms the input obeys JSON
            grammar. If the parse fails, there is no valid AST to print.
          </li>
          <li className="font-medium">
            <span className="font-semibold">Choose print rules:</span> Indentation width, line breaks, spacing after
            colons, and line-wrapping decisions are output concerns, not parsing concerns.
          </li>
          <li className="font-medium">
            <span className="font-semibold">Walk the tree:</span> A formatter commonly uses depth-first traversal so it
            can print nested objects and arrays in the correct order.
          </li>
          <li className="font-medium">
            <span className="font-semibold">Emit separators from structure:</span> Commas appear between siblings,
            colons appear inside property nodes, and closing brackets align with the parent depth.
          </li>
          <li className="font-medium">
            <span className="font-semibold">Use metadata for diagnostics:</span> If the parser stores line and column
            information, the tool can highlight the exact failure point instead of returning a generic parse error.
          </li>
        </ol>

        <p>
          This separation of parsing and printing is what makes a formatter robust. It also explains why standard JSON
          formatters do not invent features like trailing commas or comments: those are outside strict JSON syntax, so a
          strict JSON AST builder should reject them unless the tool intentionally supports a non-standard dialect.
        </p>

        <h2 className="text-2xl font-semibold mt-8">If You Mean Querying: JSON AST vs. JSONPath</h2>
        <p>
          People sometimes search for &quot;AST JSON query&quot; when they really want a way to select values inside a
          JSON document. Those are related ideas, but they are not the same thing.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">AST:</span> An internal tree representation used by parsers, formatters,
            validators, and editors.
          </li>
          <li>
            <span className="font-medium">JSONPath:</span> A query language for selecting values from a JSON tree.
            JSONPath was standardized in RFC 9535 in February 2024.
          </li>
          <li>
            <span className="font-medium">API query parameters:</span> Request syntax sent to a server. These may
            return JSON, but they are not themselves a JSON AST.
          </li>
        </ul>

        <p>
          In practice, a formatter may build an AST internally and then expose JSONPath-like operations on top of that
          tree. The AST is the data structure; JSONPath is one way to ask questions about the data structure.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Edge Cases That Matter in Real Formatter Design</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Duplicate keys:</span> The JSON spec says names should be unique, so a good
            formatter should make its duplicate-key behavior explicit.
          </li>
          <li>
            <span className="font-medium">Very large or deeply nested input:</span> Real parsers often impose depth,
            size, or numeric precision limits, and formatter implementations need guardrails for them.
          </li>
          <li>
            <span className="font-medium">Numeric precision:</span> Converting JSON numbers into host-language numeric
            types too early can lose information. ASTs help tools delay or avoid that coercion.
          </li>
          <li>
            <span className="font-medium">Non-standard JSON dialects:</span> Comments, trailing commas, and single
            quotes belong to JSON-like formats, not strict JSON. Supporting them requires a different grammar or a more
            permissive parser.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Beyond Formatting</h2>
        <p>A JSON AST is also useful for adjacent tooling tasks:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Validation:</span> A validator can traverse the tree and check structure,
            types, and required fields.
          </li>
          <li>
            <span className="font-medium">Transformation:</span> Tools can add, remove, or replace nodes before
            serializing the result again.
          </li>
          <li>
            <span className="font-medium">Querying:</span> Search and extraction logic can target nodes or paths inside
            the parsed tree.
          </li>
          <li>
            <span className="font-medium">Analysis:</span> AST traversal makes it easy to measure nesting depth, object
            size, and other complexity signals.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          A JSON AST is the bridge between raw text and reliable tooling. It gives a formatter a structured model to
          print, validate, traverse, and diagnose. The important standards takeaway is that JSON itself is standardized,
          but JSON AST shapes are not. Once you understand that split, it becomes much easier to evaluate parser APIs,
          choose formatter behavior, and understand what a tool really means when it says it works with a JSON AST.
        </p>
      </div>
    </>
  );
}
