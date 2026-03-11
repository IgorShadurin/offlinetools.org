import type { Metadata } from "next";
import {
  Languages,
  MessageSquare,
  Calendar,
  ShieldAlert,
  CodeXml,
  FileJson,
  Tag,
  Braces,
  SquareArrowRight,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Localization Best Practices for JSON Formatter Interfaces | Offline Tools",
  description:
    "A practical guide to localizing JSON formatter interfaces with correct lang and dir usage, Intl-based formatting, plural-aware messages, translated errors, and RTL testing.",
};

export default function LocalizationJsonFormatterArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <Languages className="h-8 w-8 text-blue-600" /> Localization Best Practices for JSON Formatter Interfaces
      </h1>

      <div className="space-y-6">
        <p>
          A localized JSON formatter should feel native to the user without changing the JSON itself. That boundary is
          the core design rule: localize the interface, help text, validation feedback, derived previews, and settings;
          keep the raw JSON payload untouched so copy, paste, validation, and debugging stay predictable across every
          locale.
        </p>

        <p>
          For most teams, the work is not translating a few buttons. It is deciding which text belongs to the product
          shell, which values should remain machine-readable, how to handle RTL layouts, and how to avoid browser-only
          parser messages that cannot be translated cleanly. This guide focuses on those decisions.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Braces className="h-6 w-6 text-purple-600" /> What Search Users Usually Need
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Clear rules for what parts of a JSON formatter UI should and should not be localized.</li>
          <li>Current guidance for language tags, text direction, and locale-aware formatting APIs.</li>
          <li>Examples for translated status text, plural forms, and parser errors.</li>
          <li>Testing advice for RTL languages, long strings, and fallback locales.</li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <FileJson className="h-6 w-6 text-yellow-600" /> 1. Localize the Interface, Not the JSON Payload
        </h2>
        <p>
          Users expect the editor, tree view controls, menus, and validation messages to appear in their language. They
          do not expect a formatter to translate JSON keys, rewrite string values, or silently change number and date
          literals inside the source panel.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Localize: buttons, labels, tooltips, empty states, settings, onboarding text, and error explanations.</li>
          <li>Usually localize: inspector labels such as "Object", "Array", "String", or "Copied".</li>
          <li>Do not localize: raw keys, raw string values, property order, punctuation, or whitespace in the source JSON.</li>
          <li>Do not auto-convert numeric or date strings in the editor just because they look localizable.</li>
        </ul>
        <p>
          If your formatter offers a richer inspector, show localized helper text next to the raw value instead of
          modifying the original value. For example, display a human-readable date preview in a side panel while
          preserving the exact ISO string in the editor.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Practical Rule of Thumb</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`Good:
- "Format", "Copy", "Line 12", and "Invalid trailing comma" are translated.
- A preview panel shows 1,234.56 or 1.234,56 based on locale.

Avoid:
- Translating {"status":"ok"} into another language inside the editor.
- Rewriting "2026-03-10T14:00:00Z" into a localized date string in the source JSON.`}
            </pre>
          </div>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Tag className="h-6 w-6 text-green-600" /> 2. Use Real Locale Metadata: `lang`, `dir`, and Canonical Tags
        </h2>
        <p>
          The{" "}
          <a
            href="https://www.w3.org/International/questions/qa-html-language-declarations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            W3C guidance on HTML language declarations
          </a>{" "}
          is still the right baseline: declare the language of the page with a valid language tag such as{" "}
          <code>en</code>, <code>en-GB</code>, or <code>pt-BR</code>. Keep language and writing direction separate.
          A locale does not automatically tell the browser everything about bidirectional layout.
        </p>
        <p>
          The{" "}
          <a
            href="https://www.w3.org/International/questions/qa-html-dir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            W3C article on the <code>dir</code> attribute
          </a>{" "}
          recommends setting base direction explicitly for RTL interfaces and using <code>dir="auto"</code> when the
          direction of user-supplied text is unknown.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: Locale and Direction Setup</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const requestedLocale = userChoice ?? navigator.languages?.[0] ?? "en";
const locale = Intl.getCanonicalLocales(requestedLocale)[0] ?? "en";
const isRtl = ["ar", "fa", "he", "ur"].some((prefix) => locale.startsWith(prefix));

// App shell
// <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>

// User-entered text where direction may vary by content
// <textarea dir="auto" aria-label={t("editor.input_label")} />`}
            </pre>
          </div>
        </div>

        <p>
          In CSS, prefer logical properties such as <code>margin-inline-start</code>, <code>padding-inline-end</code>,
          and <code>border-inline-start</code> over left/right rules. That keeps the formatter layout, gutters, and
          side panels much easier to mirror for RTL languages.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Calendar className="h-6 w-6 text-orange-600" /> 3. Use `Intl` for Derived Views, Never for Raw JSON Rewrites
        </h2>
        <p>
          The modern JavaScript internationalization surface lives in the{" "}
          <a
            href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            <code>Intl</code> APIs documented by MDN
          </a>
          . If your formatter shows readable previews for numbers, timestamps, lists, or currencies, let <code>Intl</code>{" "}
          handle locale rules instead of hard-coding separators or date layouts.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Use <code>Intl.NumberFormat</code> for numeric previews and counters.</li>
          <li>Use <code>Intl.DateTimeFormat</code> only after you have confidently parsed a real date value.</li>
          <li>Use <code>Intl.ListFormat</code> or <code>Intl.DisplayNames</code> for supporting UI text when needed.</li>
          <li>Keep source JSON values unchanged in the editor and copy buffer.</li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: Localized Preview, Raw Source Preserved</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const numberPreview = new Intl.NumberFormat(locale, {
  maximumFractionDigits: 2,
}).format(12345.678);

const datePreview = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date("2026-03-10T14:00:00Z"));

// Source pane:   12345.678
// Preview pane:  12,345.68   or   12.345,68
// Source pane:   "2026-03-10T14:00:00Z"
// Preview pane:  Mar 10, 2026, 2:00 PM   or locale equivalent`}
            </pre>
          </div>
        </div>

        <p>
          Be conservative with automatic date detection. Strings like <code>03/04/2026</code> are ambiguous across
          locales, so it is safer to localize only clearly structured values such as ISO 8601 timestamps or values the
          user explicitly marks as dates.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <MessageSquare className="h-6 w-6 text-blue-600" /> 4. Translate Messages with Plural-Aware Patterns
        </h2>
        <p>
          Count-based text is where naive localization breaks fastest. English has simple singular/plural behavior, but
          many languages do not. MDN&apos;s{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            <code>Intl.PluralRules</code> reference
          </a>{" "}
          is a useful reminder that plural categories vary by locale.
        </p>
        <p>
          The safest pattern is to store full messages, not fragments. Avoid building text with string concatenation
          such as <code>"Found " + count + " errors"</code>. Use a message format that supports placeholders and plural
          rules.
        </p>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: Translation Resource Shape</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`{
  "actions": {
    "format": "Format",
    "copy": "Copy JSON"
  },
  "status": {
    "errors_found": "{count, plural, one {Found # error} other {Found # errors}}",
    "characters_selected": "{count, plural, one {# character selected} other {# characters selected}}"
  },
  "errors": {
    "invalid_json": "The JSON is not valid.",
    "trailing_comma": "Remove the trailing comma before continuing."
  }
}`}
            </pre>
          </div>
        </div>

        <p>
          This structure also helps translators because each string has a stable purpose and enough context to avoid
          awkward wording in short UI surfaces.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <ShieldAlert className="h-6 w-6 text-rose-600" /> 5. Normalize Parser Errors Before You Translate Them
        </h2>
        <p>
          One common mistake in localized developer tools is displaying the raw exception text from the runtime parser.
          Those messages are often inconsistent across engines, difficult to translate, and too technical for many
          users. A better approach is to map parse failures to your own stable error codes, then localize the final
          message.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Capture the failure type in an internal code such as <code>unexpected_token</code> or <code>trailing_comma</code>.</li>
          <li>Extract structured details such as line, column, and token where possible.</li>
          <li>Render the final message from your translation catalog.</li>
          <li>Keep a secondary technical detail field only if advanced users need the raw parser output for debugging.</li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: Stable Error Mapping</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`const errors = {
  unexpected_token: "Unexpected token near line {line}, column {column}.",
  trailing_comma: "Trailing commas are not allowed in standard JSON.",
  invalid_root: "JSON must start with an object, array, string, number, boolean, or null.",
};

// UI output example:
// "Unexpected token near line 12, column 5."
// "Trailing commas are not allowed in standard JSON."`}
            </pre>
          </div>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <SquareArrowRight className="h-6 w-6 text-teal-600" /> 6. Design for RTL, Mixed Scripts, and Long Strings
        </h2>
        <p>
          JSON itself is full of punctuation, Latin keywords, and symbols. Once you add Arabic, Hebrew, or mixed
          left-to-right and right-to-left labels around it, weak layout decisions become obvious fast.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Mirror layout with logical CSS properties instead of custom RTL overrides everywhere.</li>
          <li>Test iconography that implies direction, especially arrows, expanders, breadcrumbs, and inline actions.</li>
          <li>Allow more room for long translated settings labels and helper text.</li>
          <li>Use <code>dir="auto"</code> for user-entered snippets or annotation fields with unknown direction.</li>
          <li>Verify line-number gutters, badges, and inline validation markers remain readable in RTL mode.</li>
        </ul>
        <p>
          Also test mixed-script cases such as an Arabic UI rendering English JSON keys or an English UI displaying
          user data in Hebrew. These are normal real-world cases for debugging tools.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Settings className="h-6 w-6 text-zinc-600" /> 7. Treat Locale Choice, Fallback, and Testing as Product Features
        </h2>
        <p>
          Automatic locale detection is only a starting point. Use browser preferences or the <code>Accept-Language</code>{" "}
          header to choose an initial locale, but always let the user override it. Persist that choice and use a clear
          fallback chain such as <code>pt-BR -&gt; pt -&gt; en</code> so partial translations do not create a broken UI.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Store a user-selected locale in a durable preference such as a cookie or profile setting.</li>
          <li>Keep untranslated strings obvious in development so missing keys do not ship silently.</li>
          <li>Test at least one RTL locale, one CJK locale, and one locale with complex plural rules.</li>
          <li>Check mobile widths, narrow side panels, and dialog layouts with long translations.</li>
          <li>Run accessibility checks with screen readers after localization because label order often changes.</li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <CodeXml className="h-6 w-6 text-cyan-600" /> 8. Recommended Content Model for a JSON Formatter
        </h2>
        <p>
          Teams often get into trouble when translation files mirror component names instead of user tasks. A task-based
          structure is easier to maintain and easier for translators to understand.
        </p>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h3 className="mb-2 text-lg font-medium">Example: Task-Oriented Translation Keys</h3>
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`{
  "editor": {
    "input_label": "Input JSON",
    "output_label": "Formatted output",
    "placeholder": "Paste JSON here"
  },
  "actions": {
    "format": "Format",
    "minify": "Minify",
    "copy": "Copy",
    "clear": "Clear"
  },
  "status": {
    "copied": "Copied to clipboard.",
    "formatted_lines": "{count, plural, one {Formatted # line} other {Formatted # lines}}"
  },
  "errors": {
    "invalid_json": "The JSON is not valid.",
    "unexpected_token": "Unexpected token near line {line}, column {column}.",
    "depth_limit": "The input is too deeply nested to display safely."
  },
  "settings": {
    "indent_size": "Indent size",
    "sort_keys": "Sort object keys",
    "show_line_numbers": "Show line numbers"
  }
}`}
            </pre>
          </div>
        </div>

        <p>
          This model keeps labels, statuses, errors, and settings separate, which makes both product review and
          translation QA much easier.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          Good localization for a JSON formatter is mostly about boundaries and consistency. Preserve raw JSON exactly,
          expose language and direction correctly, use <code>Intl</code> for derived formatting, translate stable
          message patterns instead of parser internals, and test RTL and fallback behavior early. If you do that, the
          interface will feel local without becoming unpredictable.
        </p>
      </div>
    </>
  );
}
