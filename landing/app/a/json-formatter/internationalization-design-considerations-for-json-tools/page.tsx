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
    "Explore the key design considerations for internationalizing software tools that interact with JSON data, ensuring global usability.",
};

export default function InternationalizationDesignConsiderationsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Globe className="w-8 h-8" /> Internationalization Design Considerations for JSON Tools
      </h1>

      <div className="space-y-6">
        <p>
          Building software tools that handle JSON data is common, whether it&apos;s a validator, a formatter, a diff
          tool, an editor, or an API client. To make these tools accessible and useful to a global audience,{" "}
          <strong>internationalization (I18n)</strong> is crucial. This involves designing the tool so it can be adapted
          to various languages, regional differences, and technical conventions without requiring engineering changes to
          the core logic.
        </p>
        <p>
          While JSON itself is largely language-agnostic (keys and string values are just sequences of characters,
          ideally UTF-8), the tool interacting with JSON has a user interface, documentation, and outputs that *do* need
          to be localized. Ignoring I18n can severely limit your tool&apos;s reach and usability for non-English
          speakers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Info className="w-6 h-6" /> Why I18n Matters for JSON Tools
        </h2>
        <p>Consider the different aspects of a JSON tool that users interact with:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>User Interface:</strong> All labels, buttons, menus, tooltips, and other UI elements need to be
            understandable in the user&apos;s language.
          </li>
          <li>
            <strong>Error and Validation Messages:</strong> When a JSON is invalid or doesn&apos;t match a schema, the
            messages explaining the problem must be clear and localized.
          </li>
          <li>
            <strong>Documentation and Help Text:</strong> Guides, explanations of features, and help text should be
            available in multiple languages.
          </li>
          <li>
            <strong>Display of Data:</strong> While the JSON data itself isn&apos;t localized by the tool, how numbers,
            dates, or times *within* the JSON are displayed might need to follow locale conventions (e.g., number
            separators).
          </li>
          <li>
            <strong>Schema Descriptions:</strong> If the tool works with JSON schemas (like JSON Schema), the
            descriptions and error messages defined *in* the schema might need localization or the tool needs to handle
            schema-defined localized strings.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Core Design Considerations
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Languages className="w-5 h-5" /> 1. Externalize All User-Facing Strings
        </h3>
        <p>
          This is the golden rule of I18n. <strong>Never hardcode user-facing text directly in your code.</strong>
          All strings that a user might see (UI labels, error messages, confirmations, etc.) must be stored in external
          resource files (e.g., JSON files, YAML files, `.properties` files, etc.).
        </p>
        <p>Organize these strings by locale. For example, you might have files like:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>messages.en.json</code>
          </li>
          <li>
            <code>messages.es.json</code>
          </li>
          <li>
            <code>messages.fr.json</code>
          </li>
        </ul>
        <p>Inside these files, use keys to reference the strings:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">
            <code>messages.en.json</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app.title": "JSON Tool",
  "button.format": "Format JSON",
  "error.invalidJson": "Invalid JSON syntax at line {lineNumber}, column {columnNumber}.",
  "validation.schemaMismatch": "Data does not match schema: {errorMessage}"
}`}
          </pre>
          <h4 className="text-lg font-medium mt-4 mb-2">
            <code>messages.es.json</code>:
          </h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "app.title": "Herramienta JSON",
  "button.format": "Formatear JSON",
  "error.invalidJson": "Sintaxis JSON inválida en la línea {lineNumber}, columna {columnNumber}.",
  "validation.schemaMismatch": "Los datos no coinciden con el esquema: {errorMessage}"
}`}
          </pre>
        </div>
        <p>Your code then looks up the string by its key for the currently active locale.</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <MessageSquareText className="w-5 h-5" /> 2. Handle Plurals and Genders Carefully
        </h3>
        <p>
          Different languages have different rules for plurals and genders. A naive approach like concatenating
          &quot;s&quot; for plurals will fail. Use I18n libraries that support complex pluralization rules (e.g., ICU
          MessageFormat).
        </p>
        <p>Example (conceptual syntax, actual syntax depends on library):</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Message key:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`"file.saveSuccess": "Successfully saved {count, plural, one {# file} other {# files}}."`}
          </pre>
          <h4 className="text-lg font-medium mt-4 mb-2">Usage in code:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Assume 't' is your translation function/object
t('file.saveSuccess', { count: 1 }) // -> "Successfully saved 1 file."
t('file.saveSuccess', { count: 5 }) // -> "Successfully saved 5 files."`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CircleAlert className="w-5 h-5" /> 3. Design Error Messages for Translatability
        </h3>
        <p>
          JSON parsing and validation errors often include dynamic parts like line numbers, column numbers, or specific
          values. Design your error messages with placeholders for these dynamic values, as shown in the externalization
          example above. This allows translators to place the dynamic part correctly within the grammatical structure of
          their language.
        </p>
        <p>Avoid building error messages by concatenating fixed strings and dynamic parts.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Bad (hard to translate):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`"Invalid value '" + value + "' for key '" + key + "'."`}
          </pre>
          <h4 className="text-lg font-medium mt-4 mb-2">Good (translatable):</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Message key: "validation.invalidValue": "Invalid value '{value}' for key '{key}'."
t('validation.invalidValue', { value: dataValue, key: dataKey })`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <BookOpenText className="w-5 h-5" /> 4. Consider Schema Descriptions and Error Paths
        </h3>
        <p>
          If your tool validates JSON against a schema, the schema itself might contain descriptive text (e.g., in the{" "}
          <code>description</code> or <code>title</code> fields of JSON Schema). Your tool might display these
          descriptions.
        </p>
        <p>
          Also, validation errors often point to a location in the JSON using a "JSON Pointer" (e.g.,{" "}
          <code>/data/items/0/price</code>). These paths are structural and don&apos;t need translation, but the
          *explanation* of the error at that path does.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Check className="w-5 h-5" /> 5. Handling Locale-Specific Data Formats in Display
        </h3>
        <p>
          JSON stores numbers as simple values (e.g., <code>123.45</code>) and dates/times often as strings (e.g.,{" "}
          <code>"2023-10-27T10:00:00Z"</code>). When your tool displays these values to the user, they might need to be
          formatted according to the user&apos;s locale.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Numbers:</strong> Different locales use different characters for decimal points and thousands
            separators (e.g., <code>1,234.56</code> in en-US vs. <code>1.234,56</code> in de-DE).
          </li>
          <li>
            <strong>Dates and Times:</strong> The format (MM/DD/YY, DD.MM.YYYY, etc.) and locale-specific names for
            months and days vary. Timestamps might need timezone adjustments.
          </li>
          <li>
            <strong>Currencies:</strong> Displaying currency values correctly involves formatting the number and
            including the correct currency symbol or code according to the locale.
          </li>
        </ul>
        <p>
          When displaying parsed JSON data, use your platform&apos;s or an I18n library&apos;s number, date, and
          currency formatting functions, providing the user&apos;s current locale.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <FileText className="w-5 h-5" /> 6. Input and Output Encoding
        </h3>
        <p>
          JSON is defined by RFC 8259 as requiring UTF-8 encoding. Your tool should ideally expect and output UTF-8.
          However, be aware that input files might sometimes be saved in other encodings. If your tool handles file
          input, you might need to provide options or attempt to detect the encoding, then convert to UTF-8 for
          processing.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings className="w-5 h-5" /> 7. User&apos;s Preferred Language
        </h3>
        <p>
          Allow users to explicitly select their preferred language within the tool settings. Additionally, consider
          defaulting to the language indicated by the user&apos;s operating system or browser settings (via the{" "}
          <code>Accept-Language</code> header in web contexts).
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Settings className="w-5 h-5" /> 8. Pseudo-Localization for Testing
        </h3>
        <p>
          Before sending strings for translation, use pseudo-localization to test your I18n implementation.
          Pseudo-localization replaces strings with modified versions that simulate translated text (e.g., adding
          padding to make strings longer, adding accents or special characters). This helps identify UI issues like
          truncated text, layout breaks, or hardcoded strings that weren&apos;t externalized.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example Pseudo-Localized String:</h4>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`"Format JSON" -> "[Fôrmæt JŠÖÑôôôô]"`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" /> Implementation Approaches
        </h2>
        <p>
          Modern frameworks and languages often have built-in I18n support or mature libraries. For web-based JSON tools
          (even server-rendered ones like with Next.js App Router), libraries like <code>react-i18next</code>,{" "}
          <code>next-i18n-router</code>, or native browser APIs (`Intl`) are invaluable.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use libraries that handle locale loading, string interpolation, plurals, and formatting.</li>
          <li>
            Integrate locale switching logic that updates the UI without full page reloads where possible (though this
            component is static, remember this for client-side parts if any).
          </li>
          <li>Ensure your build process can handle generating the localized string files.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Globe className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Designing a JSON tool with internationalization in mind from the beginning significantly reduces the effort
          required to support new languages later. By externalizing strings, handling dynamic content and plurals
          correctly, considering locale-specific data formatting, and providing locale selection, you can create tools
          that are not only functional but also truly globally accessible. While JSON itself is a simple data format,
          the interface your tool provides to interact with it benefits immensely from thoughtful I18n design.
        </p>
      </div>
    </>
  );
}
