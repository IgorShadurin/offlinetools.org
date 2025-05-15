import type { Metadata } from "next";
import {
  Bug,
  Globe,
  CheckCheck,
  Inspect,
  ListTodo,
  Hammer,
  BookOpenText,
  Code,
  WrapText,
  TextQuote,
  CalendarDays,
  LayoutGrid,
  FolderTree,
  AlertTriangle,
  MessageSquareWarning,
  SearchCheck,
  Beaker,
  MousePointerClick,
  ListCheck, // Added ListCheck import
} from "lucide-react";

export const metadata: Metadata = {
  title: "Debugging Edge Cases in JSON Internationalization | Development",
  description:
    "A guide for developers on identifying and fixing common edge cases when using JSON files for internationalization (i18n).",
};

export default function DebuggingJsonI18nEdgeCasesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <Bug className="size-8 text-red-500" />
        <Globe className="size-8 text-blue-500" />
        <span>Debugging Edge Cases in JSON Internationalization</span>
      </h1>

      <div className="space-y-6">
        <p>
          Internationalization (i18n) is crucial for building applications that
          can be used by people worldwide. A common approach involves storing
          translated text in JSON files, with keys mapping to values for different
          locales (languages and regions). While straightforward for simple text,
          real-world applications encounter numerous &quot;edge cases&quot; that can break
          layouts, display incorrect information, or confuse users.
        </p>
        <p>
          This guide explores common edge cases in JSON-based i18n and provides
          strategies for identifying and debugging them, making your localized
          applications more robust.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListTodo className="size-6 text-green-500" />
          <span>Understanding the Challenge</span>
        </h2>
        <p>
          JSON is a simple data format, but text content is complex. Translations
          aren&apos;t just direct word-for-word replacements. They involve:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Different text lengths</li>
          <li>Varying grammar and sentence structure</li>
          <li>Cultural nuances and specific terminology</li>
          <li>Different rules for plurals, dates, numbers, and currencies</li>
          <li>Inclusion of special characters or HTML</li>
          <li>Dynamic content injection (variables)</li>
        </ul>
        <p>
          These factors interact with your application&apos;s UI and logic, leading
          to unexpected issues when switching locales.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <AlertTriangle className="size-6 text-yellow-500" />
          <span>Common JSON I18n Edge Cases</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <WrapText className="size-5 text-purple-500" />
          <span>1. Text Length and Layout Issues</span>
        </h3>
        <p>
          Translations can be significantly longer or shorter than the original text.
          German words, for example, are notoriously long. This can cause:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Text overflow, breaking container layouts.</li>
          <li>Text wrapping incorrectly.</li>
          <li>Empty spaces if the translation is too short.</li>
          <li>Buttons or elements resizing awkwardly.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Overflowing Button</h4>
          <pre>
            <code className="language-json">
              {`{
  "en": { "submit_button": "Submit" },
  "de": { "submit_button": "Daten absenden" } // Much longer
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The German translation might not fit in a button sized for &quot;Submit&quot;.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Code className="size-5 text-blue-500" />
          <span>2. Special Characters and Encoding</span>
        </h3>
        <p>
          JSON files should ideally be UTF-8 encoded to support a wide range of
          characters (accents, symbols, non-Latin scripts). Issues arise when:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Files are saved with incorrect encoding.</li>
          <li>Special characters aren&apos;t properly escaped (e.g., backslashes).</li>
          <li>The display font doesn&apos;t support the characters.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Encoding or Escaping Error</h4>
          <pre>
            <code className="language-json">
              {`{
  "fr": { "greeting": "Bonjour le monde !" }, // '!' is a valid char
  "es": { "question": "¿Cómo estás?" }, // '¿' and 'á' require correct encoding/handling
  "jp": { "welcome": "ようこそ" } // Japanese characters require UTF-8
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <TextQuote className="size-5 text-teal-500" />
          <span>3. Placeholder Issues (Interpolation)</span>
        </h3>
        <p>
          Translations often require dynamic values (like names, counts, dates) inserted
          using placeholders (e.g., <code className="language-plaintext">&#x7b;&#x7b;name&#x7d;&#x7d;</code>, <code className="language-plaintext">&#x7b;count&#x7d;</code>). Problems include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Placeholders missing in a translation.</li>
          <li>Incorrect placeholder names or syntax.</li>
          <li>Wrong order of placeholders (languages structure sentences differently).</li>
          <li>Attempting to insert complex data structures instead of simple values.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Incorrect Placeholder Order/Missing</h4>
          <pre>
            <code className="language-json">
              {`{
  "en": { "user_welcome": "Hello, {{name}}!" },
  "fr": { "user_welcome": "Bonjour, {{name}} !" }, // Correct
  "de": { "user_welcome": "Guten Tag, {{name}}." }, // Correct
  "es": { "user_welcome_bad": "¡Hola, !" } // Placeholder missing!
}`}
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <ListCheck className="size-5 text-pink-500" />
          <span>4. Pluralization Rules</span>
        </h3>
        <p>
          Different languages have vastly different rules for plurals (e.g., zero, one,
          few, many, other). Relying on a simple &quot;one&quot; and &quot;other&quot; might not be enough.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Simple vs. Complex Plurals</h4>
          <pre>
            <code className="language-json">
              {`{
  "en": {
    "item_count": {
      "one": "You have 1 item.",
      "other": "You have {{count}} items."
    }
  },
  "ar": { // Arabic has complex plural rules (zero, one, two, few, many, other)
    "item_count": {
      "zero": "لا توجد لديك عناصر.",
      "one": "لديك عنصر واحد.",
      "two": "لديك عنصران.",
      "few": "لديك {{count}} عناصر.",
      "many": "لديك {{count}} عنصرًا.",
      "other": "لديك {{count}} عنصر."
    }
  }
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your i18n library must support complex CLDR plural rules.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CalendarDays className="size-5 text-orange-500" />
          <span>5. Date, Time, Number, and Currency Formatting</span>
        </h3>
        <p>
          These formats vary significantly by locale. Storing formatted values directly
          in JSON is usually a mistake.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Date formats (MM/DD/YYYY vs DD.MM.YYYY vs YYYY-MM-DD).</li>
          <li>Time formats (12-hour with AM/PM vs 24-hour).</li>
          <li>Decimal and thousands separators (1,234.56 vs 1.234,56).</li>
          <li>Currency symbols and their placement (€10.00 vs 10.00 € vs $10.00).</li>
        </ul>
        <p>
          Instead of translating these, you should use your i18n library&apos;s formatting functions
          (e.g., `Intl.DateTimeFormat`, `Intl.NumberFormat` in JavaScript) and pass the raw values.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <LayoutGrid className="size-5 text-indigo-500" />
          <span>6. HTML or JSX within Translations</span>
        </h3>
        <p>
          Sometimes translations include rich text, requiring HTML tags or JSX components
          (e.g., making a part of a sentence bold, adding a link). Issues arise if:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>HTML/JSX isn&apos;t correctly escaped or parsed by the i18n library.</li>
          <li>Tags are unbalanced or malformed in the JSON.</li>
          <li>Security risks if injecting raw HTML without sanitization.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Translation with HTML</h4>
          <pre>
            <code className="language-json">
              {`{
  "en": { "terms": "Please agree to our &lt;a href=&quot;/terms&quot;&gt;Terms of Service&lt;/a&gt;." }
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Your i18n library needs a way to handle and render this safely, often
            by allowing components or specific tag processing. Notice the use of HTML entities
            like <code className="language-plaintext">&amp;lt;</code> for <code className="language-plaintext">&lt;</code> and <code className="language-plaintext">&amp;quot;</code> for <code className="language-plaintext">&quot;</code>.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <FolderTree className="size-5 text-brown-500" />
          <span>7. Deeply Nested or Complex JSON Structures</span>
        </h3>
        <p>
          While JSON supports nesting, overly complex structures can make keys hard
          to manage, leading to errors when paths are incorrect or missing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Complex Nesting</h4>
          <pre>
            <code className="language-json">
              {`{
  "page": {
    "settings": {
      "profile": {
        "title": "Profile Settings",
        "fields": {
          "name": {
            "label": "Name",
            "placeholder": "Enter your name"
          }
        }
      }
    }
  }
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Mistyping any key along the path (`page.settings.profile.fields.name.label`)
            will result in a missing translation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <MessageSquareWarning className="size-5 text-red-500" />
          <span>8. Missing or Incomplete Translations / Fallbacks</span>
        </h3>
        <p>
          This is a very common edge case. If a key is missing in a specific locale&apos;s
          JSON file:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>The key itself might be displayed.</li>
          <li>An empty string might be displayed.</li>
          <li>A fallback language&apos;s translation (often English) is used.</li>
        </ul>
        <p>
          While fallbacks are good, relying on them too much means your application isn&apos;t fully
          localized. Debugging involves identifying which keys are missing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Hammer className="size-6 text-gray-500" />
          <span>Debugging Strategies</span>
        </h2>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <CheckCheck className="size-5 text-green-600" />
          <span>1. Validate Your JSON</span>
        </h3>
        <p>
          Ensure your JSON is syntactically correct. Use linters (like ESLint with
          appropriate plugins), online JSON validators, or schema validation (e.g.,
          JSON Schema) to catch errors in structure or syntax early.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Potential JSON Syntax Error:</h4>
          <pre>
            <code className="language-json">
              {`{
  "key1": "value1", // Missing comma
  "key2": "value2"
}`}
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            A JSON validator will immediately flag the missing comma.
          </p>
        </div>


        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Inspect className="size-5 text-yellow-600" />
          <span>2. Thoroughly Preview Each Locale</span>
        </h3>
        <p>
          The most effective way to catch visual issues (length, layout) is to manually
          switch your application&apos;s locale during development and test key pages
          and components. Pay attention to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Buttons and headings for overflow/wrapping.</li>
          <li>Lists and tables for alignment issues.</li>
          <li>Any text that involves variables (check placeholder rendering).</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <SearchCheck className="size-5 text-cyan-600" />
          <span>3. Use Browser Developer Tools</span>
        </h3>
        <p>
          The browser&apos;s developer tools are invaluable:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Inspect Element:</strong> Select problematic text to see which HTML
            element it&apos;s in and debug CSS related to layout/overflow.
          </li>
          <li>
            <strong>Network Tab:</strong> Check if the correct locale&apos;s JSON file(s)
            are being loaded. Look for 404 errors or incorrect file paths.
          </li>
          <li>
            <strong>Console:</strong> Look for JavaScript errors related to
            i18n library initialization, missing keys, or incorrect interpolation calls.
            Many i18n libraries log warnings for missing translations.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <BookOpenText className="size-5 text-lime-600" />
          <span>4. Implement Robust Logging and Error Reporting</span>
        </h3>
        <p>
          Configure your i18n library to log warnings or errors when:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A key is requested but not found in the current locale.</li>
          <li>Placeholder variables are missing or don&apos;t match the translation&apos;s expectations.</li>
          <li>Fallback languages are used.</li>
        </ul>
        <p>
          These logs can be visible in the browser console during development or
          sent to a centralized error monitoring system in production.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Beaker className="size-5 text-purple-600" />
          <span>5. Automated Testing</span>
        </h3>
        <p>
          Integrate i18n checks into your testing pipeline:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Unit Tests:</strong> Test specific translation functions with
            different inputs (including edge cases like zero counts for plurals)
            and locales.
          </li>
          <li>
            <strong>End-to-End Tests:</strong> Use tools like Cypress or Playwright
            to load pages in different locales and assert that key text elements
            are visible and correctly translated (this can be challenging but powerful
            for catching layout/missing text issues).
          </li>
          <li>
            <strong>Linguistic QA:</strong> Although not strictly automated code,
            involving native speakers for testing is crucial for catching cultural nuances,
            awkward phrasing, and grammatical errors that automated tests miss.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <MousePointerClick className="size-5 text-red-600" />
          <span>6. Consistent Key Naming Conventions</span>
        </h3>
        <p>
          Adopt a clear and consistent key naming convention (e.g., `page.section.component.description_key`).
          This reduces errors caused by mistyped or hard-to-find keys, especially in large JSON files or complex structures.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Hammer className="size-6 text-gray-500" />
          <span>Prevention is Key</span>
        </h2>
        <p>
          Debugging edge cases is necessary, but preventing them is better. Consider:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Using an i18n management platform or dedicated tooling. These often provide validation,
            placeholder checks, and a better interface for translators.
          </li>
          <li>Educating translators on potential technical constraints (e.g., character limits
            in certain UI elements, placeholder syntax).
          </li>
          <li>Designing flexible UI components that can accommodate varying text lengths.</li>
          <li>Implementing features like pseudo-localization during development
            to test UI responsiveness to long strings and special characters early on.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While JSON provides a simple structure for storing translations, the complexity
          of human language introduces numerous edge cases. By understanding common
          issues like text length, encoding, placeholders, pluralization, and nested
          structures, and employing systematic debugging strategies involving validation,
          previewing, developer tools, logging, and testing, developers can build
          more robust and truly international applications. Focusing on prevention
          through better tooling and processes will further reduce the time spent
          debugging i18n issues.
        </p>
      </div>
    </>
  );
}