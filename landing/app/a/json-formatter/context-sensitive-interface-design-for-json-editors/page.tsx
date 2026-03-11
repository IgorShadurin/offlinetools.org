import type { Metadata } from "next";
import {
  FileJson2,
  Sparkles,
  Lightbulb,
  CircleCheck,
  CircleX,
  ListTree,
  PencilRuler,
  Wrench,
  Code,
  MousePointerClick,
  LayoutGrid,
  PenLine,
  Database,
  Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Context-Sensitive Interface Design for JSON Editors | Offline Tools",
  description:
    "Practical guide to designing schema-aware JSON editors with smarter validation, navigation, accessibility, and current JSON Schema compatibility notes.",
};

export default function ContextSensitiveJsonEditorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 size={32} /> Context-Sensitive Interface Design for JSON Editors
      </h1>

      <div className="space-y-6">
        <p>
          A good JSON editor should do more than color braces and format text. It should understand where the user is
          in the document, what kind of value belongs there, what the schema allows, and what the user is trying to do
          right now. That is the core of <strong>context-sensitive interface design</strong> for JSON editors.
        </p>
        <p>
          For direct search visitors, the important question is usually practical: <em>what makes a JSON editor feel
          helpful instead of fragile?</em> The answer is not more chrome. It is faster recovery from mistakes, clearer
          navigation through nested data, and controls that appear only when they reduce effort without hiding the raw
          JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lightbulb size={24} /> What Context-Sensitive Design Actually Means
        </h2>
        <p>A JSON editor becomes context-sensitive when it reacts to at least four kinds of context at the same time:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Structural context:</strong> whether the cursor is inside an object, array, key, string, number, or
            incomplete value.
          </li>
          <li>
            <strong>Schema context:</strong> expected types, required keys, enums, descriptions, examples, defaults,
            and validation rules for the current path.
          </li>
          <li>
            <strong>Task context:</strong> creating new JSON, patching one property, reviewing a large payload, or
            fixing a validation failure.
          </li>
          <li>
            <strong>Risk context:</strong> whether the action might break syntax, violate a schema, reorder meaningful
            data, or silently coerce a value.
          </li>
        </ul>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-900 p-4 rounded-lg dark:bg-blue-950 dark:text-blue-100 my-4">
          <p className="font-semibold">Useful rule of thumb</p>
          <p className="mt-1">
            Promote a field to a custom control only when the allowed input is narrow and obvious, such as a boolean,
            enum, or small bounded number. Keep free-form editing for long strings, pasted payloads, and arbitrary
            nested objects.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Sparkles size={24} /> Design Around Real Editing Tasks
        </h2>
        <p>Search users rarely want abstract principles. They want an editor that helps with real work like this:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Creating a new object:</strong> start from schema-backed snippets, defaults, and required-field
            prompts instead of an empty pair of braces.
          </li>
          <li>
            <strong>Editing one field safely:</strong> show the full path, expected type, and any enum values near the
            cursor so the user does not have to scan the whole file.
          </li>
          <li>
            <strong>Auditing a large document:</strong> combine outline navigation, filtering, and a synchronized tree
            view so users can jump by structure instead of line number.
          </li>
          <li>
            <strong>Resolving validation errors:</strong> explain the failure in plain language and offer the smallest
            safe fix instead of only a parser position.
          </li>
          <li>
            <strong>Comparing versions:</strong> diff by property path and array item meaning where possible, not only
            by raw line movement.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <MousePointerClick size={24} /> Core Interface Patterns That Usually Help
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Palette size={20} /> Inline Guidance and Safe Defaults
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Autocomplete keys from the current object schema or from similar sibling objects when no schema exists.</li>
          <li>Offer enum pickers, booleans, and date helpers only when they reduce ambiguity instead of adding UI noise.</li>
          <li>
            Differentiate <strong>required</strong>, <strong>optional</strong>, and <strong>unknown</strong> fields so
            the user understands why a suggestion appears.
          </li>
          <li>
            Insert whole key-value snippets when useful, including commas or braces, so the action preserves valid JSON
            rather than dumping partial text into the document.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListTree size={20} /> Navigation for Deeply Nested Documents
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Show breadcrumbs such as <code>root &gt; services[2] &gt; retryPolicy &gt; maxRetries</code>.</li>
          <li>Support tree-to-text and text-to-tree synchronization without jumping the viewport unexpectedly.</li>
          <li>Let users search by key name, value, and path so they can find the right node even in repetitive arrays.</li>
          <li>Provide copy-path actions for JSON Pointer or dot-path formats if your users move between tools.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <PenLine size={20} /> Keep a Raw Text Escape Hatch
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Always preserve a plain text editing mode for power users, pasted payloads, and bulk operations.</li>
          <li>Do not force every edit through forms or tree widgets that hide commas, ordering, or duplicate-key issues.</li>
          <li>When switching modes, avoid rewriting formatting or reordering keys unless the user asked for it.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database size={24} /> Current Schema Guidance That Matters in Practice
        </h2>
        <p>
          As of March 2026, JSON Schema still lists <strong>Draft 2020-12</strong> as the current version. That matters
          for editor design because modern schemas can describe tuples, dynamic references, and unevaluated properties
          more precisely than older drafts.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Use schema metadata like <code>description</code>, <code>default</code>, <code>examples</code>, and{" "}
            <code>enum</code> as UI hints. They are often more valuable to the interface than the raw type.
          </li>
          <li>
            Support newer keywords when your validator and editor stack can handle them, especially{" "}
            <code>prefixItems</code> for tuple-like arrays and <code>unevaluatedProperties</code> for stricter object
            editing.
          </li>
          <li>
            Test exact editor behavior if you build on a Monaco or VS Code JSON stack. Current VS Code documentation
            notes full support through Draft 7, with only limited support for Draft 2019-09 and 2020-12 features.
          </li>
          <li>
            Prefer external schema association when possible instead of injecting <code>$schema</code> into user data
            just to drive editor behavior. That key changes the document itself and can be inappropriate for payloads
            sent to APIs or stored elsewhere.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Schema Hints That Translate Well to UI</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "environment": {
      "type": "string",
      "enum": ["dev", "staging", "prod"],
      "description": "Deployment target"
    },
    "retryCount": {
      "type": "integer",
      "default": 3,
      "minimum": 0
    },
    "features": {
      "type": "array",
      "items": { "type": "string" }
    }
  },
  "required": ["environment"]
}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            This kind of schema can drive path-aware help text, enum suggestions, required-field badges, and safe
            default insertion without turning the editor into a rigid form builder.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircleX size={24} /> Design for Error Recovery, Not Just Error Detection
        </h2>
        <p>Users judge a JSON editor by how quickly it gets them back to a valid state after something goes wrong.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keep the editor interactive with partially invalid JSON instead of disabling autocomplete until parse succeeds.</li>
          <li>Attach errors to a path and explain the expected value, not just the parser offset.</li>
          <li>Offer one-click fixes when the intent is clear, such as adding quotes, removing a trailing comma, or inserting a missing required key.</li>
          <li>Never silently coerce a value like <code>"3"</code> into <code>3</code> unless the user explicitly chooses that fix.</li>
          <li>Preserve selection and scroll position after formatting or auto-fix actions so recovery feels stable.</li>
        </ul>
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg dark:bg-red-900 dark:text-red-200 my-4"
          role="alert"
        >
          <p className="font-bold flex items-center gap-2">
            <CircleX size={20} /> Better Diagnostic Example
          </p>
          <p>
            <code>/services/2/retryCount</code> expects an integer, but the current value is a string:{" "}
            <code>&quot;3&quot;</code>.
          </p>
          <p className="mt-2">Suggested fixes: convert to number, or update the schema if strings are intentional.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Wrench size={24} /> Large-File Performance Rules
        </h2>
        <p>
          Context sensitivity is only helpful if the editor stays responsive. Large JSON files expose weak architecture
          quickly, especially when tree views, validation, and diffing all react to every keystroke.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use a tolerant parser that can produce partial structure even while the document is temporarily invalid.</li>
          <li>Debounce expensive schema validation and move it off the main thread when possible.</li>
          <li>Virtualize tree and outline views so thousands of nodes do not render at once.</li>
          <li>Cache path lookups and schema resolution for the active cursor region instead of walking the full tree repeatedly.</li>
          <li>Introduce graceful degradation thresholds for huge payloads, such as disabling live diff previews before disabling basic editing.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CircleCheck size={24} /> Accessibility and Input Model
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Expose every contextual action through the keyboard, not only through right-click menus.</li>
          <li>Announce validation errors and the current path in a way screen readers can reach without scanning the entire editor.</li>
          <li>Do not rely on color alone to mark required fields, warnings, or schema violations.</li>
          <li>Keep focus movement predictable when the tree view, breadcrumbs, and text editor are synchronized.</li>
          <li>On smaller screens, favor compact inline actions and large touch targets over permanently visible side panels.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutGrid size={24} /> Implementation Checklist
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Start with tolerant parsing plus path mapping, because nearly every context-aware feature depends on it.</li>
          <li>Resolve schema information lazily for the active path instead of treating the full schema as a flat suggestion source.</li>
          <li>Build autocomplete, diagnostics, and contextual actions from the same path-aware state so they stay consistent.</li>
          <li>Keep text mode as the source of truth even if you add tree or form-like controls on top.</li>
          <li>Measure responsiveness with realistic large payloads before adding more assistance features.</li>
          <li>Test failure cases deliberately: incomplete JSON, wrong types, recursive schemas, and unknown properties.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code size={24} /> Conceptual Example: Choosing Assistance by Context
        </h2>
        <p>
          A practical implementation usually routes every cursor move through the same decision layer: inspect the
          current path, inspect the schema node for that path, then choose the lightest UI that helps without taking
          control away from the user.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Conceptual Assistance Pipeline</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function buildEditorAssistance(editorState) {
  const astContext = inspectAstNearCursor(editorState.document, editorState.cursor);
  const schemaContext = resolveSchemaForPath(editorState.schema, astContext.path);
  const largeFileMode = editorState.document.length > 500_000;

  return {
    breadcrumbs: astContext.path,
    completions: getCompletions(astContext, schemaContext),
    diagnostics: largeFileMode
      ? getFastSyntaxDiagnostics(editorState.document)
      : getSyntaxAndSchemaDiagnostics(editorState.document, editorState.schema),
    actions: getContextActions(astContext, schemaContext),
    preferredInput:
      schemaContext?.enum ? "picker" :
      schemaContext?.type === "boolean" ? "toggle" :
      "text"
  };
}`}
            </pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            The important design choice is not the exact code. It is that completion, validation, navigation, and UI
            controls all read from the same path-aware understanding of the document.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <PencilRuler size={24} /> Conclusion
        </h2>
        <p>
          The best context-sensitive JSON editors do not try to replace text editing. They reduce risk at the current
          path, expose structure without forcing it, and use schema information carefully enough that the interface stays
          helpful even when the document is incomplete or the schema is only partially supported. If you design around
          task context, recovery flow, and large-file performance, the editor will feel substantially smarter to real
          users than a formatter with autocomplete bolted on top.
        </p>
      </div>
    </>
  );
}
