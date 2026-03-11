import type { Metadata } from "next";
import {
  Globe,
  Languages,
  MessageSquareText,
  FileText,
  Settings,
  Info,
  CircleAlert,
  BookOpenText,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Internationalization (I18n) Design for JSON Tools | Offline Tools",
  description:
    "Practical guidance for localizing JSON formatters, validators, and editors: locale negotiation, Intl APIs, JSON Schema messages, RTL support, and UTF-8 handling.",
};

export default function InternationalizationDesignConsiderationsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Globe className="w-8 h-8" /> Internationalization (I18n) Design for JSON Tools
      </h1>

      <div className="space-y-6">
        <p>
          If you are building a JSON formatter, validator, diff viewer, editor, or API inspection tool, the main I18n
          question is not &quot;how do I translate JSON?&quot; It is &quot;which parts of the experience should follow
          the user&apos;s language and locale, and which parts must stay literal so the data remains correct?&quot;
        </p>
        <p>
          That distinction matters. JSON syntax, JSON Pointer paths, schema keywords, enum tokens, and raw keys usually
          stay unchanged. The surrounding product, however, should adapt to the user: labels, help text, parser and
          schema errors, derived number and date displays, accessibility text, and sometimes schema annotations. Good
          I18n design keeps those layers separate from the start.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> The Short Version
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Localize the tool&apos;s interface and explanations, not the underlying JSON syntax.</li>
          <li>Use locale negotiation for a sensible default, but always allow a manual language override.</li>
          <li>
            Format user-facing numbers, dates, currencies, and lists with native <code>Intl</code> APIs instead of
            custom string logic.
          </li>
          <li>
            Emit machine-stable validation data first, then render localized human messages from codes and placeholders.
          </li>
          <li>
            Test right-to-left layouts, mixed-direction content, long strings, and Unicode edge cases before shipping.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Practical Design Checklist
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Languages className="w-5 h-5" /> 1. Separate JSON Semantics from Human Language
        </h3>
        <p>
          A translator should never be asked to rewrite structural JSON. Treat the data model and the UI model as two
          different concerns.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Localize:</strong> buttons, menus, empty states, onboarding copy, help panels, validation
            explanations, ARIA labels, and export/import guidance.
          </li>
          <li>
            <strong>Keep literal:</strong> JSON keys, JSON Pointer paths, schema keywords such as <code>type</code> or{" "}
            <code>required</code>, raw enum values, and code snippets users may need to copy exactly.
          </li>
          <li>
            <strong>Decide explicitly:</strong> if the JSON payload contains end-user content such as product names or
            descriptions, that is an application-level localization problem, not something a formatter should guess.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Healthy boundary for a JSON tool</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`Localize:
- "Format JSON"
- "Invalid value for this field"
- "3 errors found"

Keep literal:
- /items/0/price
- "price"
- "required"
- {"price":"12,30"}`}
          </pre>
        </div>
        <p>
          This one rule prevents a lot of confusion. Search visitors looking for &quot;I18n design for JSON tools&quot;
          usually need help drawing that line.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings className="w-5 h-5" /> 2. Negotiate Locale, Then Let the User Override It
        </h3>
        <p>
          For web tools, a good default can come from the browser&apos;s language list or the server-side{" "}
          <code>Accept-Language</code> header. That should only be an initial guess. Users still need a visible language
          switcher and a persistent preference.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Locale selection pattern</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`const requestedLocales = userLocale ? [userLocale] : navigator.languages;
const supportedLocales = Intl.NumberFormat.supportedLocalesOf(requestedLocales);
const activeLocale = supportedLocales[0] ?? "en-US";`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Canonicalize locale tags and fall back cleanly when a requested locale is unsupported.</li>
          <li>Store the override separately from the JSON document itself.</li>
          <li>
            Do not tie the UI language to the data. A developer may inspect Japanese content while preferring an English
            interface, or the reverse.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check className="w-5 h-5" /> 3. Use <code>Intl</code> for Anything the User Reads
        </h3>
        <p>
          Current browsers and Node runtimes provide mature locale-aware formatting through the ECMAScript{" "}
          <code>Intl</code> APIs. Use them for numbers, dates, times, currencies, lists, relative time, and plural
          rules instead of hardcoded separators or sentence templates.
        </p>
        <p>
          The key is to format <em>derived presentation</em>, not to silently rewrite the raw JSON the user pasted. For
          example, keep <code>123456.789</code> unchanged in the editor, but show a localized preview or tooltip if the
          UI has a friendly display mode.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Locale-aware display example</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`const locale = "hi-IN";

const formattedNumber = new Intl.NumberFormat(locale, {
  maximumFractionDigits: 2,
}).format(123456.789);

const formattedTimestamp = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
}).format(new Date("2026-03-10T14:15:00Z"));`}
          </pre>
        </div>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use the same active locale across all derived displays so the interface feels coherent.</li>
          <li>Show time zones explicitly when you are rendering timestamps from JSON strings.</li>
          <li>
            Avoid pre-formatting numbers with commas or periods in translation files. Those decisions belong in
            <code>Intl.NumberFormat</code>.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5" /> 4. Build Validation Messages from Codes and Placeholders
        </h3>
        <p>
          Parser and schema errors should be represented internally as structured data, not English sentences. That
          keeps the logic stable and makes translations much easier to maintain.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Validation payload</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "code": "json.invalidType",
  "path": "/items/0/price",
  "params": {
    "expected": "number",
    "received": "string"
  }
}`}
          </pre>
          <h4 className="text-lg font-medium mt-4 mb-2">Localized message template</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "json.invalidType": "Expected {expected} but found {received} at {path}."
}`}
          </pre>
        </div>
        <p>
          Keep the structural path literal, but localize the sentence around it. The same principle applies to line and
          column numbers, offending values, schema titles, and recovery tips.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Do not concatenate fragments like <code>&quot;Invalid value &quot; + value + &quot; for key &quot; + key</code>.
          </li>
          <li>Use placeholders so translators can change word order naturally.</li>
          <li>
            Preserve a machine-readable error <code>code</code> for telemetry, tests, and support docs across every
            locale.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <BookOpenText className="w-5 h-5" /> 5. Give Schema Titles and Descriptions a Real Localization Strategy
        </h3>
        <p>
          JSON Schema annotations like <code>title</code> and <code>description</code> are meant for humans. If your
          tool renders them, decide how localized variants are stored and resolved before the validator output reaches
          the UI.
        </p>
        <p>
          There is no single built-in JSON Schema localization field. In practice, teams either keep human text outside
          the schema, or add an application-defined extension and document it clearly.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Application-defined schema extension example</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "type": "object",
  "title": "Product",
  "description": "Inventory item",
  "x-i18n": {
    "es": {
      "title": "Producto",
      "description": "Articulo de inventario"
    }
  }
}`}
          </pre>
        </div>
        <p>
          If you use a pattern like <code>x-i18n</code>, label it as a vendor or app convention rather than pretending
          it is part of the JSON Schema standard. That keeps your tooling honest and your migrations easier later.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Languages className="w-5 h-5" /> 6. Plan for RTL Layouts and Mixed-Direction Content
        </h3>
        <p>
          JSON tools often mix left-to-right technical strings with right-to-left interface text. That is where many
          otherwise solid localizations break down.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Set the overall UI direction intentionally with <code>dir=&quot;ltr&quot;</code> or <code>dir=&quot;rtl&quot;</code>.</li>
          <li>
            Wrap dynamic labels or user-supplied fragments in <code>&lt;bdi&gt;</code> or use{" "}
            <code>dir=&quot;auto&quot;</code> when the text direction is not known in advance.
          </li>
          <li>
            Keep the raw editor pane, JSON Pointer paths, and code samples readable. Many teams leave the code view
            itself left-to-right even when the surrounding interface is right-to-left.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Mixed-direction rendering example</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`<div dir={uiDirection}>
  <p>{t("validation.errorAt")}: <code dir="ltr">/items/0/price</code></p>
  <p><bdi>{userSuppliedLabel}</bdi></p>
</div>`}
          </pre>
        </div>
        <p>
          Test this with real Arabic or Hebrew UI strings plus Latin JSON paths. The bugs usually show up in line
          markers, breadcrumb separators, inline badges, and copyable snippets.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileText className="w-5 h-5" /> 7. Handle UTF-8 and Unicode Edge Cases Deliberately
        </h3>
        <p>
          JSON exchanged across open systems is defined in RFC 8259 to use UTF-8. That is the right baseline for a
          modern JSON tool, but it does not eliminate every text problem you will see in the wild.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Accept or produce UTF-8 by default, especially for network-facing input and output.</li>
          <li>Convert legacy file encodings at import time instead of leaking encoding concerns into the parser.</li>
          <li>
            Do not assume <code>string.length</code> matches what a human sees on screen. Emoji, combining marks, and
            other grapheme clusters can break naive cursoring or truncation logic.
          </li>
          <li>
            Surface malformed Unicode clearly instead of silently mangling it. Hidden corruption is much harder to debug
            after localization is added.
          </li>
        </ul>
        <p>
          If your tool offers search, selection, preview truncation, or fixed-width line wrapping, Unicode handling is
          part of the I18n design, not a separate afterthought.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <MessageSquareText className="w-5 h-5" /> 8. Localize Accessibility Text Too
        </h3>
        <p>
          Screen-reader labels, button names, status announcements, and form hints are part of the product interface and
          need the same localization quality as visible copy.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Translate ARIA labels and live-region announcements.</li>
          <li>Keep keyboard shortcut help understandable in every supported language.</li>
          <li>
            Make sure translated labels still describe the exact control behavior, especially for actions like
            formatting, minifying, sorting, copying, and schema validation.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check className="w-5 h-5" /> 9. Test with Pseudo-Localization and Real Locales
        </h3>
        <p>
          Pseudo-localization catches layout bugs early, but it is not enough on its own. Use it to find hardcoded
          strings and text expansion problems, then run real checks with a small set of representative locales.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Simple pseudo-localized example</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`"Format JSON" -> "[!! Format JSON .... !!]"`}
          </pre>
        </div>
        <p>Useful test coverage for JSON tools usually includes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A locale with long words and wider labels, such as German.</li>
          <li>A right-to-left locale for layout and mixed-direction issues.</li>
          <li>A locale with different digit grouping or calendar expectations, such as India.</li>
          <li>JSON samples containing emoji, accented text, and long schema descriptions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Globe className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Internationalization design for JSON tools is mostly about disciplined boundaries. Keep the JSON literal, keep
          validation state machine-readable, and localize the explanations and presentation around it. When you combine
          that boundary with modern <code>Intl</code> formatting, explicit locale selection, RTL-safe rendering, and
          Unicode-aware testing, your formatter or validator becomes much more useful to real users outside an
          English-only workflow.
        </p>
      </div>
    </>
  );
}
