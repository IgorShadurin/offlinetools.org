import type { Metadata } from "next";
import {
  Accessibility,
  Keyboard,
  Eye,
  Contrast,
  CheckCircle,
  XCircle,
  Sparkles,
  Info,
  ListChecks,
  MessageCircleWarning,
  MonitorPlay,
  MousePointer,
  Monitor,
} from "lucide-react"; // Only explicitly allowed icons

export const metadata: Metadata = {
  title: "Accessible JSON Formatter Documentation | Your Website Name",
  description:
    "Learn about building and using Accessible JSON Formatters, focusing on features that enhance usability for all developers.",
};

export default function AccessibleJsonFormatterDocumentation() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400 flex items-center justify-center gap-3">
        <Accessibility size={36} /> Accessible JSON Formatter Documentation
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Info size={24} /> Introduction
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          JSON (JavaScript Object Notation) is a ubiquitous data format used in web development and beyond. Formatting
          JSON data – making it readable by adding indentation and line breaks – is a common task. While many JSON
          formatters exist, ensuring they are <strong>accessible</strong> is crucial for inclusivity, allowing
          developers of all abilities to use them effectively.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          This document outlines the key aspects of an Accessible JSON Formatter, explaining why accessibility matters
          in developer tools and detailing the features that contribute to a truly usable experience for everyone.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <CheckCircle size={24} /> What Makes a JSON Formatter Accessible?
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          An accessible JSON formatter goes beyond simply processing text. It considers how users with disabilities
          interact with the tool. Key features include:
        </p>
        <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <Keyboard size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Keyboard Navigation:</strong> All
              functionalities (input, format button, output, copy button) must be reachable and operable using only a
              keyboard (Tab, Shift+Tab, Enter, Space).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MonitorPlay size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Screen Reader Compatibility:</strong> The
              UI must be structured with semantic HTML. ARIA attributes (`role`, `aria-label`, `aria-describedby`,
              `aria-live`) should be used where necessary to convey meaning, state, and updates to screen reader users.
              Input and output areas should be readable.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Contrast size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Sufficient Color Contrast:</strong> Text,
              syntax highlighting, focus indicators, and interactive elements must have enough contrast against their
              background to be legible for users with low vision or color blindness. This follows WCAG guidelines
              (minimum AA).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Eye size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Focus Indication:</strong> The currently
              focused element must have a clear, visible outline or style change so keyboard users know where they are.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <ListChecks size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Scalable Text and Layout:</strong> The
              interface should remain usable when text is resized up to 200% and when the page is zoomed without
              requiring horizontal scrolling on standard screen sizes.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MessageCircleWarning size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Clear Error Reporting:</strong> When JSON
              is invalid, errors should be reported clearly, describing the nature and location of the error (e.g., line
              number, character position). Error messages should be programmatically associated with the input area or
              announced via ARIA live regions.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Sparkles size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Syntax Highlighting:</strong> While
              primarily a visual aid, syntax highlighting should use high-contrast colors and ideally offer customizable
              themes or be compatible with OS-level high contrast modes. Highlighting alone should not be the only way
              to understand the JSON structure or identify errors.
            </div>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Monitor size={24} /> Using an Accessible Formatter (User Perspective)
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          From a user's standpoint, interacting with an accessible JSON formatter should be intuitive, regardless of how
          they access the interface.
        </p>
        <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <MousePointer size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Inputting JSON:</strong> The main input
              area (often a <code>&lt;textarea&gt;</code>) should be clearly labeled (e.g., using a{" "}
              <code>&lt;label for=&quot;...&quot;&gt;</code> element). Users should be able to paste their JSON data
              easily.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Keyboard size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Triggering Formatting:</strong> A
              prominent button (e.g., "Format JSON") should be available and accessible via keyboard. Ideally, a
              keyboard shortcut (like Ctrl+Shift+F or Cmd+Shift+F) should also trigger the formatting.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Viewing Formatted Output:</strong> The
              formatted JSON should appear in a distinct area, typically a read-only <code>&lt;textarea&gt;</code> or
              styled <code>&lt;pre&gt;&lt;code&gt;</code> block. Syntax highlighting should be high-contrast. Screen
              readers should be able to read the formatted content.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <XCircle size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Handling Errors:</strong> If the input
              JSON is invalid, an error message should appear in a designated area. This message should be easy to find,
              have high contrast, and be announced to screen reader users (e.g., by placing it in an{" "}
              <code>&lt;div role=&quot;alert&quot;&gt;</code> or using <code>aria-live=&quot;assertive&quot;</code>).
              The message should ideally pinpoint the error location.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Copying Output:</strong> A dedicated
              "Copy" button for the formatted output is helpful and must be keyboard accessible. A keyboard shortcut to
              copy the entire output is also a valuable feature.
            </div>
          </li>
        </ul>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          A truly accessible formatter provides a smooth, efficient workflow for every developer, regardless of their
          interaction methods or sensory needs.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <CheckCircle size={24} /> Building an Accessible Formatter (Developer Perspective)
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          When developing a JSON formatter, integrate accessibility from the start. Consider these points:
        </p>
        <ul className="list-none space-y-4 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <ListChecks size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Semantic HTML:</strong> Use appropriate
              HTML elements. A <code>&lt;label&gt;</code> for the input <code>&lt;textarea&gt;</code>,{" "}
              <code>&lt;button&gt;</code> for actions, and <code>&lt;pre&gt;&lt;code&gt;</code> or a read-only{" "}
              <code>&lt;textarea&gt;</code> for output are good starting points.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Keyboard size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Focus Management:</strong> Ensure the
              default tab order is logical. Use CSS <code>:focus</code> or <code>:focus-visible</code> pseudo-classes to
              provide a clear, non-obtrusive focus indicator. Manage focus programmatically if dialogs or dynamic
              content are introduced (though this page avoids dynamic elements per instructions).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Contrast size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Color and Theming:</strong> Design color
              palettes for syntax highlighting and the general UI with sufficient contrast. Offer a high-contrast mode
              or ensure compatibility with operating system high-contrast settings. Don't rely *only* on color to convey
              information (e.g., don't highlight errors *only* in red without accompanying text or an icon).
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MessageCircleWarning size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">Error Handling & Announcements:</strong>{" "}
              Provide clear, descriptive error messages for invalid JSON. Associate the error message text with the
              input area using <code>aria-describedby</code>. For immediate feedback to screen readers, use an{" "}
              <code>aria-live=&quot;polite&quot;</code> or <code>&quot;assertive&quot;</code> region to announce
              validation results or errors.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MonitorPlay size={20} className="flex-shrink-0 text-blue-500 dark:text-blue-300 mt-1" />
            <div>
              <strong className="font-medium text-gray-900 dark:text-gray-100">ARIA Attributes:</strong> Use ARIA roles,
              states, and properties appropriately. For example, a read-only output area might have{" "}
              <code>aria-readonly=&quot;true&quot;</code> if it's a <code>&lt;textarea&gt;</code> used for display. Use{" "}
              <code>aria-label</code> or <code>aria-labelledby</code> for elements that might not have visible text
              labels (like icons used as buttons).
            </div>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Eye size={24} /> Examples of Accessible Considerations
        </h2>
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Input Area Label</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Ensure your input <code>&lt;textarea&gt;</code> is associated with a <code>&lt;label&gt;</code>:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 overflow-x-auto">
          <pre>
            <code>
              {`&lt;label for="jsonInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300"&gt;Enter JSON here:&lt;/label&gt;
&lt;textarea
  id="jsonInput"
  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  rows="10"
  aria-describedby="jsonInputHelp"
&gt;&lt;/textarea&gt;
&lt;p id="jsonInputHelp" class="mt-2 text-sm text-gray-500 dark:text-gray-400"&gt;Paste the JSON data you want to format.&lt;/p&gt;`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Clear Error Message</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Display validation errors clearly and associate them for screen readers:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 overflow-x-auto">
          <pre>
            <code>
              {`&lt;div
  role="alert"
  aria-live="assertive"
  class="mt-4 p-3 border border-red-400 bg-red-100 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-300"&gt;
  &lt;p class="font-medium"&gt;Invalid JSON:&lt;/p&gt;
  &lt;p&gt;Unexpected token ',' at line 5, column 12.&lt;/p&gt;
&lt;/div&gt;`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Keyboard Accessible Button</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Ensure buttons are interactive and have a visible focus state:
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 overflow-x-auto">
          <pre>
            <code>
              {`&lt;button
  type="button"
  class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900"&gt;
  Format JSON
&lt;/button&gt;`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Sparkles size={24} /> Conclusion
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Creating developer tools, including JSON formatters, with accessibility in mind is not just a matter of
          compliance, but of building better, more robust tools that serve the entire development community. By focusing
          on keyboard navigation, screen reader compatibility, color contrast, clear feedback, and semantic structure,
          you can ensure your JSON formatter is a truly accessible and valuable resource for all developers.
        </p>
      </section>
    </div>
  );
}
