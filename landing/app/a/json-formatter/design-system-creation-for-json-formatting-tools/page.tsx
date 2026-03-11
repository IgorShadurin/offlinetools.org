import type { Metadata } from "next";
import {
  Grid,
  Palette,
  Component,
  Code,
  ListTree,
  Diff,
  Copy,
  Lightbulb,
  Accessibility,
  BookOpenText,
  ChevronRight,
  ChevronDown,
  MoonStar,
  CheckCheck,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Design System for JSON Formatting Tools | Offline Tools",
  description:
    "Learn how to build a practical design system for JSON formatter, validator, diff, and tree-view tools with tokens, components, and current accessibility guidance.",
};

export default function DesignSystemJsonToolsArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Design System for JSON Formatting Tools</h1>

        <section className="space-y-6">
          <p>
            A JSON formatter looks simple until you try to make it feel dependable. Users paste broken payloads,
            compare huge responses, jump between raw text and tree views, and expect every action to be fast, obvious,
            and safe. A good design system turns that complexity into repeatable rules instead of one-off UI decisions.
          </p>
          <p>
            For JSON formatting, validation, diff, and conversion tools, the system should define more than colors and
            buttons. It needs rules for editor chrome, syntax tokens, validation states, tree navigation, copy flows,
            file import/export, and accessibility behavior. That is what makes the product feel coherent across the
            whole toolset.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Grid className="mr-3 text-blue-500" size={28} /> What a JSON Tool Design System Must Solve
          </h2>
          <p>
            JSON tools are denser than ordinary marketing or dashboard UIs. A visitor may need to scan thousands of
            characters, understand nested hierarchy, spot one broken comma, or safely copy a transformed result in
            seconds. That changes the design-system priorities.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              <strong>High-density reading:</strong> code fonts, indentation, line wrapping, and syntax colors must
              remain readable for long sessions.
            </li>
            <li>
              <strong>Multiple representations:</strong> the same data may appear as raw text, a tree, a diff, a table,
              or a schema-driven form.
            </li>
            <li>
              <strong>Error localization:</strong> invalid JSON must point to a line, column, or field path instead of
              showing a vague failure banner.
            </li>
            <li>
              <strong>Large-file behavior:</strong> the system should define what happens with very large inputs,
              virtualization, truncation, and long-running formatting operations.
            </li>
            <li>
              <strong>Low-risk actions:</strong> copy, clear, prettify, minify, and download actions need predictable
              states so users do not lose work.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Lightbulb className="mr-3 text-yellow-500" size={28} /> Start with Core User Flows
          </h2>
          <p>
            Before choosing tokens or components, list the jobs users are actually trying to complete. If a pattern does
            not help one of these flows, it probably does not belong in the system.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              <strong>Paste and format:</strong> raw input, parse result, indentation, and copy feedback.
            </li>
            <li>
              <strong>Validate and repair:</strong> error summary, line/column jump, and visible recovery path.
            </li>
            <li>
              <strong>Inspect hierarchy:</strong> expand or collapse objects and arrays without losing context.
            </li>
            <li>
              <strong>Compare versions:</strong> side-by-side or inline diff with readable change markers.
            </li>
            <li>
              <strong>Transform or convert:</strong> JSON to CSV, YAML, TypeScript, or schema output with trustworthy
              previews.
            </li>
            <li>
              <strong>Import and export:</strong> drag-and-drop, file picker, clipboard, download, and shareable links.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Palette className="mr-3 text-red-400" size={28} /> Model Tokens Like Product Infrastructure
          </h2>
          <p>
            Treat tokens as product infrastructure, not a bag of colors. A JSON-tool system usually benefits from at
            least four layers: foundation tokens, semantic UI tokens, syntax tokens, and component tokens. That lets
            you change a theme or accessibility mode without repainting every individual editor rule.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 p-4 rounded-lg my-4">
            <h3 className="text-xl font-semibold mt-0 mb-2">Current note for token workflows</h3>
            <p className="my-0 text-sm">
              If your team wants one JSON source of truth for design and code, the Design Tokens Community Group
              published a stable 2025.10 format in October 2025. That makes JSON token files a practical interchange
              layer instead of an ad hoc convention.
            </p>
          </div>
          <p>For JSON tools, useful token categories often include:</p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              <strong>Surface tokens:</strong> page canvas, editor panel, inset panel, sticky toolbar, dialog, and
              status rail.
            </li>
            <li>
              <strong>Text tokens:</strong> primary, muted, destructive, success, warning, and inverse text.
            </li>
            <li>
              <strong>Syntax tokens:</strong> key, string, number, boolean, <code>null</code>, punctuation, comment,
              and invalid token states.
            </li>
            <li>
              <strong>Interaction tokens:</strong> focus ring, active row, hover row, selected node, drop target, and
              drag handle.
            </li>
            <li>
              <strong>Density tokens:</strong> editor padding, row height, gutter width, border radius, and icon size.
            </li>
          </ul>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-sm">
            <h3 className="text-xl font-medium mt-0 mb-2">Example: JSON-based design tokens</h3>
            <pre className="whitespace-pre-wrap break-all">
              {`{
  "color": {
    "surface": {
      "canvas": { "$type": "color", "$value": "#0f172a" },
      "panel": { "$type": "color", "$value": "#111827" }
    },
    "text": {
      "primary": { "$type": "color", "$value": "#f8fafc" },
      "muted": { "$type": "color", "$value": "#94a3b8" },
      "danger": { "$type": "color", "$value": "#ef4444" }
    }
  },
  "syntax": {
    "json": {
      "key": { "$type": "color", "$value": "{color.text.primary}" },
      "string": { "$type": "color", "$value": "#22c55e" },
      "number": { "$type": "color", "$value": "#38bdf8" },
      "boolean": { "$type": "color", "$value": "#f97316" },
      "null": { "$type": "color", "$value": "#c084fc" }
    }
  }
}`}
            </pre>
          </div>
          <p>
            The important part is not the exact names. It is the separation of concerns: components should consume
            semantic or syntax tokens, not hard-coded hex values.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Component className="mr-3 text-green-500" size={28} /> Core Components to Standardize
          </h2>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <Code className="mr-2 text-purple-500" /> Editor Shell
          </h3>
          <p>
            The editor shell is the heart of the experience. Define the input/output panel layout, toolbar placement,
            gutter behavior, placeholder treatment, empty state, read-only state, and loading state. Decide early
            whether validation messages live above the editor, below it, or in a sticky side rail.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Use a code font with stable widths and tabular numerals for line and column references.</li>
            <li>Make line wrapping an explicit mode, not an accidental overflow fallback.</li>
            <li>Differentiate editable and output panes clearly, especially in dual-pane formatter layouts.</li>
            <li>Keep toolbar labels short and action-first: Format, Validate, Copy, Clear, Download.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <ListTree className="mr-2 text-teal-500" /> Tree Views and Collapsed Structure
          </h3>
          <p>
            If you expose hierarchy, specify whether the UI is a disclosure list or a true tree widget. That decision
            affects semantics, keyboard support, row height, indentation, and selection behavior.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              Define the toggle affordance for expand and collapse states, such as{" "}
              <ChevronRight className="inline mx-1" />
              and{" "}
              <ChevronDown className="inline mx-1" />.
            </li>
            <li>Keep focus and selection visually distinct so users know what is active versus what is chosen.</li>
            <li>Show data type badges or icons consistently for object, array, string, number, boolean, and null.</li>
            <li>Preserve expansion state after formatting when possible, or clearly explain when it resets.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            <Diff className="mr-2 text-orange-500" /> Diff and Review Surfaces
          </h3>
          <p>
            JSON diffs deserve their own rules instead of inheriting generic code-diff styling. Users need to
            distinguish between structural changes and simple value changes quickly.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Use separate tokens for added, removed, changed, and unchanged lines.</li>
            <li>Define when inline diffing is used versus side-by-side diffing.</li>
            <li>Provide a summary count for inserted, removed, and modified nodes before the detailed view.</li>
            <li>Make moved focus obvious when the user jumps to the next difference.</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 flex items-center">
            Buttons & Actions (<Copy className="mx-1 text-blue-600" />)
          </h3>
          <p>
            Small controls are common in formatter tools, which makes them easy to style badly. Standardize primary,
            secondary, and quiet actions, then define icon spacing, hover states, disabled states, and confirmation
            rules.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Keep destructive actions like Clear away from frequent actions like Format or Copy.</li>
            <li>Support both pointer and keyboard activation for every important action.</li>
            <li>Show transient success feedback for copy or download, but do not hide critical errors automatically.</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">State Rules Before Visual Polish</h2>
          <p>
            Many JSON tools fail because they style the happy path and improvise the rest. Write state rules early so
            every tool in the suite reports status in the same way.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              <strong>Empty:</strong> explain accepted input and optionally offer a safe sample payload.
            </li>
            <li>
              <strong>Valid:</strong> use a restrained success treatment with a clear message, such as{" "}
              <CheckCheck className="inline mx-1 text-green-600" /> valid JSON.
            </li>
            <li>
              <strong>Invalid:</strong> surface line, column, and a useful message instead of a generic{" "}
              <X className="inline mx-1 text-red-600" /> invalid state.
            </li>
            <li>
              <strong>Busy:</strong> formatting, diff generation, or file parsing should disable only the controls that
              would conflict with the current task.
            </li>
            <li>
              <strong>Large payload:</strong> define truncation, virtualization, and warning copy before performance
              problems force inconsistent hacks.
            </li>
            <li>
              <strong>Read-only output:</strong> make it obvious that the value can be copied but not edited.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Accessibility className="mr-3 text-indigo-500" size={28} /> Accessibility and Interaction Standards
          </h2>
          <p>
            Accessibility should be embedded in the component contract, not added as QA cleanup. This matters
            especially for code-like interfaces because they mix dense text, tiny controls, and custom widgets.
          </p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>
              WCAG 2.2 adds <strong>Focus Not Obscured</strong> and <strong>Target Size (Minimum)</strong> at AA. In
              practice, do not let sticky toolbars cover focused controls, and avoid tiny icon-only actions that fall
              below 24 by 24 CSS pixels unless spacing or an equivalent larger control covers the requirement.
            </li>
            <li>
              If you want stronger focus treatment, WCAG 2.2&apos;s Focus Appearance guidance defines a visible
              indicator area comparable to a 2 CSS pixel perimeter and 3:1 contrast between focused and unfocused
              states.
            </li>
            <li>
              If you build a real tree widget, follow the WAI-ARIA tree view pattern:{" "}
              <code>Right Arrow</code> opens, <code>Left Arrow</code> closes, <code>Up</code>/<code>Down</code> move
              between visible nodes, <code>Home</code>/<code>End</code> jump, and type-ahead is recommended.
            </li>
            <li>
              Use clear live announcements for validation results, copy success, and jump-to-error actions so screen
              reader users are not left guessing what changed.
            </li>
            <li>
              Test dark themes deliberately (<MoonStar className="inline mx-0.5" />). Do not just invert editor colors;
              syntax contrast and focus visibility often break first.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <Code className="mr-3 text-violet-500" size={28} /> Choosing the Editor Foundation
          </h2>
          <p>
            For a lightweight formatter, a styled <code>textarea</code> may be enough. For advanced search, diff,
            folding, and long-document workflows, most teams embed an editor such as CodeMirror or Monaco and layer the
            product-specific system on top.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
            <h3 className="text-xl font-medium mt-0 mb-2">What to standardize even if you use a third-party editor</h3>
            <ul className="list-disc pl-6 space-y-2 my-0 text-sm">
              <li>labels, helper text, and error message writing style</li>
              <li>toolbar layout and button hierarchy</li>
              <li>focus exit rules and keyboard help</li>
              <li>copy, download, and clear feedback patterns</li>
              <li>tokens for syntax colors, gutters, selections, and diff highlights</li>
            </ul>
          </div>
          <p>
            Current editor docs are a reminder that the surrounding system still matters. Monaco documents features like
            a command palette, high-contrast mode support, Tab trapping controls, and a diff review pane. CodeMirror
            emphasizes keyboard-only and screen-reader-friendly use. Your design system should make those capabilities
            discoverable and consistent instead of burying them in editor-specific defaults.
          </p>

          <h2 className="text-3xl font-semibold mt-8 mb-4 flex items-center">
            <BookOpenText className="mr-3 text-blue-500" size={28} /> Document the System So Teams Use It
          </h2>
          <p>A design system is only useful when product teams can apply it quickly and predictably.</p>
          <ul className="list-disc pl-6 space-y-3 my-4">
            <li>Document each component with anatomy, states, keyboard behavior, and content guidance.</li>
            <li>Include fixtures for valid, invalid, deeply nested, and very large JSON examples.</li>
            <li>Show when to use raw text, tree view, or diff view instead of treating them as interchangeable.</li>
            <li>Keep design tokens, React components, and usage docs versioned together to avoid drift.</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p>
            The best design system for JSON formatting tools is not the prettiest one. It is the one that makes
            parsing, inspecting, comparing, and copying structured data feel reliable across every screen. Start from
            real workflows, build a disciplined token model, standardize states and accessibility behavior, and your
            formatter stops feeling like a one-off utility and starts feeling like a professional tool suite.
          </p>
        </section>
      </article>
    </div>
  );
}
