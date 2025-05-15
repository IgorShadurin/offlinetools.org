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
} from "lucide-react"; // Using only allowed icons

export const metadata: Metadata = {
  title: "Localization Best Practices for JSON Formatter Interfaces | Offline Tools",
  description:
    "Learn how to effectively localize JSON formatter user interfaces for a global audience.",
};

export default function LocalizationJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Languages className="w-8 h-8 text-blue-600" /> Localization Best Practices for JSON Formatter Interfaces
      </h1>

      <div className="space-y-6">
        <p>
          Building a user interface (UI) for formatting and displaying JSON data is common in web development,
          especially for developer tools, APIs explorers, or configuration editors. While the core function
          of parsing and formatting JSON is language-agnostic, the interface surrounding it is not. To make
          your JSON formatter accessible and user-friendly for a global audience, proper localization is crucial.
          This article outlines key best practices for localizing the UI of JSON formatters.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-600" /> Why Localize a JSON Formatter Interface?
        </h2>
        <p>
          Even if your application primarily targets developers, not all developers speak English fluently.
          Providing an interface in their native language significantly improves usability and reduces
          cognitive load. Key benefits include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Improved Accessibility:</strong> Reaching a wider user base.</li>
          <li><strong>Enhanced User Experience:</strong> Making the tool feel intuitive and familiar.</li>
          <li><strong>Reduced Support Burden:</strong> Users can better understand labels and error messages.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Braces className="w-6 h-6 text-purple-600" /> Key Areas to Localize
        </h2>
        <p>
          Localizing a JSON formatter UI involves more than just translating static text. You need to consider
          all user-facing elements and data representations influenced by locale.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Tag className="w-5 h-5 text-green-600" /> UI Labels and Text
        </h3>
        <p>
          This is the most obvious part. All static text within the interface needs translation:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Button labels (e.g., "Format", "Copy JSON", "Clear")</li>
          <li>Input area placeholders (e.g., "Paste JSON here...")</li>
          <li>Section headings (e.g., "Input", "Output", "Options")</li>
          <li>Tooltips and help text (e.g., "Automatically formats the JSON")</li>
          <li>Labels for JSON structure elements (e.g., "Object", "Array", "String", "Number", "Boolean", "Null", "Key", "Value") - especially important if you use a tree view.</li>
          <li>Settings labels (e.g., "Indentation", "Sort Keys", "Show Line Numbers")</li>
        </ul>
        <p>
          <strong>Best Practice:</strong> Externalize all UI strings into resource files (like <code>.json</code>, <code>.po</code>, or JavaScript objects) mapped by language keys. Use a localization library or framework feature to manage translations dynamically.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Externalizing Labels (Conceptual)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// src/locales/en.json
{
  "format_button": "Format",
  "copy_button": "Copy JSON",
  "input_placeholder": "Paste JSON here...",
  "node_type_object": "Object",
  "node_type_array": "Array",
  "setting_indentation": "Indentation Level"
}

// src/locales/es.json
{
  "format_button": "Formatear",
  "copy_button": "Copiar JSON",
  "input_placeholder": "Pega JSON aquí...",
  "node_type_object": "Objeto",
  "node_type_array": "Array",
  "setting_indentation": "Nivel de Indentación"
}

// In your component (conceptual usage with a translation function 't')
// &lt;button&gt;{t('format_button')}&lt;/button&gt;
// &lt;input placeholder={t('input_placeholder')} /&gt;
// &lt;span&gt;Type: {t('node_type_object')}&lt;/span&gt;
`}
            </pre>
          </div>
        </div>


        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" /> Error Messages and Validation Feedback
        </h3>
        <p>
          When users input invalid JSON, the formatter needs to provide clear feedback. These messages must
          also be localized.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>"Invalid JSON structure"</li>
          <li>"Unexpected token at line X, column Y"</li>
          <li>Specific parsing errors</li>
          <li>Validation errors if you add schema validation</li>
        </ul>
        <p>
          <strong>Best Practice:</strong> Translate all potential error messages. For messages that include dynamic values (like line/column numbers), use placeholders in your translation strings and replace them at runtime.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Localizing Error Messages (Conceptual)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// src/locales/en.json
{
  "error_invalid_json": "Invalid JSON structure",
  "error_unexpected_token": "Unexpected token '{&#x7b;token&#x7d;}' at line {&#x7b;line&#x7d;}, column {&#x7b;column&#x7d;}"
}

// src/locales/de.json
{
  "error_invalid_json": "Ungültige JSON-Struktur",
  "error_unexpected_token": "Unerwartetes Token '{&#x7b;token&#x7d;}' in Zeile {&#x7b;line&#x7d;}, Spalte {&#x7b;column&#x7d;}"
}

// In your parsing error handler (conceptual)
// catch (e) {
//   if (e.type === 'unexpected_token') {
//     displayError(t('error_unexpected_token', { token: e.token, line: e.line, column: e.column }));
//   } else {
//     displayError(t('error_invalid_json'));
//   }
// }
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-600" /> Dates, Times, and Numbers (if displayed)
        </h3>
        <p>
          JSON itself doesn't have native Date or complex Number types beyond floating-point. However, if your
          formatter provides enhanced views (e.g., detects common date string formats and displays them prettily,
          or handles large numbers), their formatting should be locale-aware.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Number formatting (decimal separators, thousands separators)</li>
          <li>Date and time string interpretation and display (e.g., "MM/DD/YYYY" vs "DD.MM.YYYY")</li>
        </ul>
        <p>
          <strong>Best Practice:</strong> Use the browser's built-in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline"><code>Intl</code></a> object (<code>Intl.NumberFormat</code>, <code>Intl.DateTimeFormat</code>) or a dedicated internationalization library to format numbers and dates according to the user's locale.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Locale-Aware Number Formatting (Conceptual)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assuming 'value' is a number from JSON, 'locale' is the user's current locale (e.g., 'en-US', 'de-DE')
// const formatter = new Intl.NumberFormat(locale);
// const formattedNumber = formatter.format(value);
// &lt;span&gt;{formattedNumber}&lt;/span&gt;

// Example Output:
// For value = 12345.678 and locale = 'en-US': 12,345.678
// For value = 12345.678 and locale = 'de-DE': 12.345,678
`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Locale-Aware Date Formatting (Conceptual)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assuming 'dateString' is a parsable date string from JSON, 'locale' is the user's locale
// const date = new Date(dateString); // Be mindful of parsing date strings reliably!
// const formatter = new Intl.DateTimeFormat(locale);
// const formattedDate = formatter.format(date);
// &lt;span&gt;{formattedDate}&lt;/span&gt;

// Example Output:
// For date = new Date('2023-10-27') and locale = 'en-US': 10/27/2023
// For date = new Date('2023-10-27') and locale = 'de-DE': 27.10.2023
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <SquareArrowRight className="w-5 h-5 text-teal-600" /> Text Direction (RTL Support)
        </h3>
        <p>
          For languages like Arabic or Hebrew, text flows from Right-to-Left (RTL). Your UI layout might
          need adjustments to accommodate this.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Layout mirroring (e.g., sidebars, buttons, text alignment)</li>
          <li>Input/output area text direction</li>
        </ul>
        <p>
          <strong>Best Practice:</strong> Design your CSS and layout components to handle both LTR and RTL. Use CSS logical properties (<code>margin-inline-start</code>, <code>padding-inline-end</code>) instead of physical properties (<code>margin-left</code>, <code>padding-right</code>) where possible. Set the HTML <code>dir</code> attribute based on the current locale.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Plurals and Context
        </h3>
        <p>
          Some messages might depend on quantities (e.g., "Found 1 error" vs "Found 5 errors") or context.
        </p>
        <p>
          <strong>Best Practice:</strong> Use localization libraries that support pluralization rules for different languages. Avoid string concatenation for sentences; structure your messages with placeholders for dynamic parts.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Pluralization (Conceptual)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// src/locales/en.json
{
  "error_count": "{&#x7b;count, plural, one {Found # error} other {Found # errors}}"
}

// src/locales/ru.json (Russian has multiple plural forms)
{
  "error_count": "{&#x7b;count, plural, one {Найдена # ошибка} few {Найдено # ошибки} many {Найдено # ошибок} other {Найдено # ошибки}}"
}

// In your component (conceptual)
// &lt;p&gt;{t('error_count', { count: numberOfErrors })}&lt;/p&gt;
`}
            </pre>
          </div>
        </div>


        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6 text-zinc-600" /> Implementation Considerations
        </h2>

        <h3 className="text-xl font-semibold mt-6">Locale Detection and Switching</h3>
        <p>
          How will your application determine the user's preferred language? Common methods include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Browser language settings (<code>navigator.language</code>)</li>
          <li>User preference stored in local storage or a cookie</li>
          <li>Server-side detection based on <code>Accept-Language</code> header</li>
          <li>A language switcher control in the UI</li>
        </ul>
        <p>
          Provide a clear way for users to change the language if the automatic detection isn't desired or correct.
        </p>

        <h3 className="text-xl font-semibold mt-6">Testing</h3>
        <p>
          Thoroughly test your localized interface.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Test with languages that have varying text lengths (German words can be long!).</li>
          <li>Test with RTL languages to ensure layout is correct.</li>
          <li>Test with languages that have complex pluralization rules.</li>
          <li>Ensure dynamic data (numbers, dates, placeholders) are correctly inserted into translated strings.</li>
          <li>Check that all UI elements are actually getting translated strings and not showing keys or default text.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <CodeXml className="w-5 h-5 text-cyan-600" /> Framework/Library Support
        </h3>
        <p>
          Most modern frontend frameworks (React, Vue, Angular) and backend frameworks (Next.js, Express with i18n middleware) have established patterns and libraries for internationalization and localization (i18n/l10n). Use these tools to simplify string management, locale detection, and formatting.
        </p>
        <p>
          For a Next.js application like this one, built-in internationalization support can handle routing and locale detection based on configuration. Libraries like <code>react-i18next</code> or <code>formatjs</code> are common choices for managing translations within React components.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6 text-yellow-600" /> Focus on the Interface, Not the JSON Data Itself
        </h2>
        <p>
          Remember that JSON data itself is just text representing structured values. The keys and string values within the JSON are typically *not* localized by the formatter UI. Your localization efforts should focus on the *presentation* of that data and the surrounding controls and messages, not attempting to translate the user's data content.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Localizing the interface of a JSON formatter is a valuable investment in user experience and accessibility. By externalizing text, handling dynamic content with locale-aware formatting, localizing error messages, and considering text directionality, you can create a tool that is truly helpful and welcoming to developers worldwide. Leverage existing i18n/l10n patterns and libraries provided by your chosen development stack to streamline the process.
        </p>
      </div>
    </>
  );
}