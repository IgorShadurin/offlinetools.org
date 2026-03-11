import type { Metadata } from "next";
import { Accessibility, CodeXml, Eye, Info, List, Speaker, Table } from "lucide-react";

export const metadata: Metadata = {
  title: "Accessible JSON Formatters for Screen Readers | Offline Tools",
  description:
    "A practical guide to designing JSON formatters that work with screen readers: semantic HTML, disclosure vs tree patterns, raw JSON fallbacks, status messages, and testing.",
};

export default function AccessibleJsonFormattersArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center text-3xl font-bold">
        <Accessibility className="mr-3 text-blue-600" size={36} />
        Designing Accessible JSON Formatters for Screen Readers
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          A JSON formatter becomes hard to use with a screen reader when it only prettifies punctuation. Users hear a
          long stream of braces, commas, quotes, and indentation instead of the underlying information. The accessible
          solution is usually not “better syntax highlighting.” It is a better representation of the data, with native
          HTML, clear labels, predictable keyboard behavior, and a raw JSON view kept as a secondary option.
        </p>
        <p>
          If you are designing a formatter in 2026, aim for two outcomes at once: let developers inspect the original
          JSON when they need it, and let screen reader users understand the same payload as headings, terms,
          definitions, lists, and tables. That approach aligns much better with current WCAG guidance on structure,
          relationships, status messages, and clear interactive controls.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Eye className="mr-2 text-blue-600" />
          Design for the task, not the braces
        </h2>
        <p>
          Before choosing a UI pattern, decide what the user is trying to do. “Read this payload” and “copy the exact
          JSON source” are different jobs, and one view rarely serves both perfectly.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Understanding a response:</strong> Default to semantic HTML that exposes the data model instead of
            the raw syntax.
          </li>
          <li>
            <strong>Debugging or copy/paste work:</strong> Keep a raw JSON source view available, clearly labeled, with
            copy or download actions nearby.
          </li>
          <li>
            <strong>Large payloads:</strong> Collapse secondary branches, show counts in toggle labels, and let users
            jump between major sections.
          </li>
          <li>
            <strong>Validation workflows:</strong> Announce parse errors, line references, and “formatted” states in a
            predictable status region.
          </li>
        </ul>
        <p>
          A good accessible formatter usually offers a structured view first and a raw code view second, rather than
          forcing every user through the same monospaced block.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Table className="mr-2 text-blue-600" />
          Map each JSON shape to native HTML
        </h2>
        <p>
          Native HTML gives screen readers the structure they already know how to announce. That is usually more robust
          than recreating a custom widget with ARIA.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full border-collapse text-left text-base md:text-lg">
            <caption className="bg-gray-50 px-4 py-3 text-left font-medium dark:bg-gray-900">
              Recommended markup patterns for common JSON shapes
            </caption>
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3" scope="col">
                  JSON shape
                </th>
                <th className="px-4 py-3" scope="col">
                  Best default
                </th>
                <th className="px-4 py-3" scope="col">
                  Why it works
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 font-semibold" scope="row">
                  Flat object
                </th>
                <td className="px-4 py-3">
                  <code>&lt;dl&gt;</code> with <code>&lt;dt&gt;</code>/<code>&lt;dd&gt;</code>
                </td>
                <td className="px-4 py-3">Keys become terms and values become definitions.</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 font-semibold" scope="row">
                  Array of primitives
                </th>
                <td className="px-4 py-3">
                  <code>&lt;ul&gt;</code> or <code>&lt;ol&gt;</code>
                </td>
                <td className="px-4 py-3">Screen readers announce item count and list position naturally.</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 font-semibold" scope="row">
                  Array of similar objects
                </th>
                <td className="px-4 py-3">
                  <code>&lt;table&gt;</code> with a <code>&lt;caption&gt;</code> and proper headers
                </td>
                <td className="px-4 py-3">Users can move by row and column and understand repeated fields quickly.</td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 font-semibold" scope="row">
                  Deeply nested object
                </th>
                <td className="px-4 py-3">
                  Nested groups plus <code>&lt;details&gt;</code> or a disclosure button
                </td>
                <td className="px-4 py-3">Progressive disclosure reduces noise without losing hierarchy.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          This approach also prevents a common mistake: using tables for arbitrary nested JSON. If the data is not
          genuinely tabular, a table makes navigation harder instead of easier.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Example: one object, one nested array, one optional branch</h3>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto text-sm">
            {`<section aria-labelledby="profile-heading">
  <h2 id="profile-heading">Profile</h2>

  <dl>
    <dt>Name</dt>
    <dd>Alice</dd>

    <dt>Role</dt>
    <dd>Editor</dd>
  </dl>

  <details>
    <summary>Permissions, array, 3 items</summary>
    <ul>
      <li>publish</li>
      <li>archive</li>
      <li>review</li>
    </ul>
  </details>
</section>`}
          </pre>
        </div>
        <p>
          The important part is not the exact markup combination. It is that every section has a meaningful name, every
          expandable region tells users what is inside it, and the data is grouped in a way that matches the actual
          content model.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Info className="mr-2 text-blue-600" />
          Use disclosure first, tree only when users truly need a tree
        </h2>
        <p>
          This is where many formatter UIs go wrong. Designers see nested JSON and immediately build a custom tree view.
          Current WAI-ARIA Authoring Practices are much more cautious: a disclosure pattern is usually better for
          simply showing and hiding sections, while a full tree widget is appropriate only when users need structured
          parent/child navigation with dedicated keyboard commands.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Use <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> or a disclosure button when users mostly
            expand and collapse branches.
          </li>
          <li>
            Use a tree only if you are prepared to implement the full keyboard model: arrow keys, Home/End, focus
            management, expanded state, and clear labeling for each node.
          </li>
          <li>
            Do not steal arrow keys for a custom widget unless the widget actually behaves like a tree. Unexpected
            keyboard capture is a fast way to break screen reader workflows.
          </li>
        </ul>
        <p>
          In practice, many JSON formatters do not need a tree at all. A disclosure-based outline is simpler to build,
          easier to test, and more compatible across browser and assistive technology combinations.
        </p>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <CodeXml className="mr-2 text-blue-600" />
          Keep raw JSON as a secondary view, not the only view
        </h2>
        <p>
          Sometimes the exact source matters. Developers may need to compare whitespace, inspect quotes, or copy a
          payload verbatim. Keep that capability, but do not assume the raw code block is enough for accessibility.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Add a heading or label such as <strong>Raw JSON source</strong> so users know they are leaving the
            structured view.
          </li>
          <li>
            Put copy, wrap, and download actions in native buttons with specific names like “Copy raw JSON” or “Wrap
            long lines.” Avoid repeated icon-only controls.
          </li>
          <li>
            Treat syntax highlighting as visual enhancement only. Do not rely on color to distinguish keys, strings, or
            errors, and do not flood the accessibility tree with decorative token wrappers.
          </li>
          <li>
            If you show line numbers, hide decorative numbers from assistive technology unless users can actually
            navigate by them.
          </li>
          <li>
            Offer a fast way back to the structured view when a user realizes the code view is too noisy.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <Speaker className="mr-2 text-blue-600" />
          Announce formatting, validation, and copy results without being chatty
        </h2>
        <p>
          Modern formatters are interactive. They prettify input, validate syntax, collapse nodes, copy content, and
          sometimes fetch remote examples. Those state changes should be announced clearly, but only when users need to
          know about them.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="overflow-x-auto text-sm">
            {`<div role="status" aria-live="polite">
  JSON formatted successfully. 12 top-level properties.
</div>`}
          </pre>
        </div>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Use a polite status region for non-blocking messages such as “formatted,” “copied,” or “3 matches found.”
          </li>
          <li>
            Reserve urgent alerts for real problems, such as invalid JSON that prevents formatting.
          </li>
          <li>
            Keep focus behavior consistent. If pressing Format updates the same view, focus usually stays on the button
            or editor. If the action opens a new panel, move focus to a clear heading inside that panel.
          </li>
          <li>
            Make toggle labels informative: “address, object, 4 properties” is better than “Expand.”
          </li>
        </ul>

        <h2 className="mt-8 flex items-center text-2xl font-semibold">
          <List className="mr-2 text-blue-600" />
          Keyboard and testing checklist
        </h2>
        <p>
          Accessible JSON formatting is not done when the markup looks correct in DevTools. It is done when the
          interaction works with real assistive tech.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Test keyboard-only first: visible focus, logical Tab order, Enter and Space on buttons, and no trapped
            focus.
          </li>
          <li>
            If you built a real tree widget, test the full APG keyboard model, not just expand and collapse.
          </li>
          <li>
            Test with at least NVDA plus Firefox, JAWS plus Chrome or Edge, and VoiceOver plus Safari. If your
            formatter is used on phones or tablets, test touch screen readers too.
          </li>
          <li>
            Check zoom, reflow, and forced-colors or high-contrast modes so focus outlines, indentation, and toggle
            states remain visible.
          </li>
          <li>
            Verify that parse errors, copy confirmations, and collapsed summaries are announced once and not repeated
            endlessly.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Common failure patterns to avoid</h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Showing only a prettified code block and calling it “accessible” because it has colors.</li>
          <li>Using identical unlabeled expand buttons for every node.</li>
          <li>Representing booleans, null values, or validation states with color alone.</li>
          <li>Building a custom tree but skipping arrow-key behavior and focus management.</li>
          <li>Firing live-region announcements for every small interaction until the interface becomes noisy.</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          Designing an accessible JSON formatter for screen readers means translating JSON into usable information, not
          preserving every visual token. Start with native HTML, use disclosure for most nested branches, reserve tree
          widgets for truly tree-like interaction, keep raw JSON available as a labeled fallback, and test with real
          assistive technology. When those pieces are in place, a formatter becomes useful to far more people than the
          default “pretty print” experience ever will.
        </p>
      </div>
    </>
  );
}
