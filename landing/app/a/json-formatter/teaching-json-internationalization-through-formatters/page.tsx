import type { Metadata } from "next";
import {
  Globe,
  MessageCircle,
  Calendar,
  DollarSign,
  List,
  LayoutList,
  Languages,
  Clock,
  RefreshCcw,
} from "lucide-react"; // Only use icons from the provided list

export const metadata: Metadata = {
  title: "Teaching JSON Internationalization Through Formatters",
  description:
    "Learn how to effectively manage internationalization (i18n) in JSON data using formatters for dynamic content like dates, numbers, and plurals.",
};

export default function JsonI18nFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Globe className="w-8 h-8" />
        Teaching JSON Internationalization Through Formatters
      </h1>

      <div className="space-y-6">
        <p>
          Internationalization (i18n) is the process of designing and developing a software application so that it can
          be easily adapted ("localized") to various languages and regions without engineering changes to the core code.
          A common approach is to externalize all user-facing text into translation files, often using the JSON format.
        </p>
        <p>
          While simple key-value pairs work well for static strings, real-world applications often need to display
          dynamic content that varies by language and region, such as dates, numbers, currencies, and plurals. This is
          where <strong>formatters</strong> become essential. Teaching developers how to use formatters alongside JSON
          is key to building truly international applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Beyond Simple Key-Value Pairs
        </h2>
        <p>Consider a simple welcome message:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`{
  "welcomeMessage": "Welcome!"
}`}
          </pre>
        </div>
        <p>This is straightforward. But what about messages that include dynamic data?</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto">
            {`// English
"greetingWithUser": "Hello, {{userName}}!"

// Spanish
"greetingWithUser": "¡Hola, {{userName}}!"`}
          </pre>
        </div>
        <p>
          Here, we introduce a placeholder (&#x7B;&#x7B;userName&#x7D;&#x7D;). The localization library or code will
          replace this placeholder with the actual user's name. This is a basic form of formatting – inserting a
          variable into a string template.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <List className="w-6 h-6" />
          Common Formatting Needs in JSON i18n
        </h2>
        <p>Many types of data require specific formatting rules that differ significantly between locales:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <strong>Dates and Times:</strong> Format (DD/MM/YYYY vs. MM/DD/YYYY), names of months/days, 12-hour vs.
            24-hour clock.
          </li>
          <li className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <strong>Numbers and Currencies:</strong> Decimal separators (<code>.</code> vs. <code>,</code>), thousands
            separators, currency symbols ($ vs. €), currency placement (before/after value), number of decimal places.
          </li>
          <li className="flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-purple-500" />
            <strong>Relative Times:</strong> "just now", "2 minutes ago", "in 3 months". The phrasing and grammar depend
            on the duration and target language.
          </li>
          <li className="flex items-center gap-2">
            <LayoutList className="w-5 h-5 text-orange-500" />
            <strong>Plurals:</strong> How words change based on quantity (e.g., "1 item", "2 items", "0 items", and even
            more complex rules in languages like Arabic or Polish).
          </li>
          <li className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-red-500" />
            <strong>Complex Messages:</strong> Messages where the structure changes significantly based on multiple
            variables or conditions (e.g., gender, item counts, etc.).
          </li>
        </ul>
        <p>
          Storing these directly as simple translated strings for every possible variation is impractical and leads to
          an explosion of translation keys.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          How JSON Stores Data Requiring Formatting
        </h2>
        <p>
          Instead of storing the final formatted string, the JSON typically stores a template string with placeholders
          that indicate not just *where* a value goes, but *how* it should be formatted. The actual formatting logic is
          handled by the application code using specific formatting tools.
        </p>
        <p>
          A common standard for this is the{" "}
          <a
            href="https://unicode-org.github.io/icu/userguide/format_parse/messages/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            ICU MessageFormat
          </a>
          , widely supported by i18n libraries.
        </p>

        <h3 className="text-xl font-semibold mt-6">Examples of JSON with Formatting Placeholders:</h3>

        <h4 className="text-lg font-medium mt-4">Date Formatting:</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
          <p className="font-mono text-sm mb-2">en.json:</p>
          <pre className="overflow-x-auto">
            {`{
  "lastLogin": "Last login: {loginDate, date, medium}"
}`}
          </pre>
          <p className="font-mono text-sm mt-4 mb-2">es.json:</p>
          <pre className="overflow-x-auto">
            {`{
  "lastLogin": "Último inicio de sesión: {loginDate, date, medium}"
}`}
          </pre>
        </div>
        <p>
          Here, <code>&#x7B;loginDate, date, medium&#x7D;</code> tells the formatter to take the value provided for{" "}
          <code>loginDate</code> and format it as a date using the "medium" style according to the current locale's
          rules.
        </p>

        <h4 className="text-lg font-medium mt-4">Number & Currency Formatting:</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
          <p className="font-mono text-sm mb-2">en.json:</p>
          <pre className="overflow-x-auto">
            {`{
  "accountBalance": "Your balance is {balance, number, currency}."
}`}
          </pre>
          <p className="font-mono text-sm mt-4 mb-2">de.json:</p>
          <pre className="overflow-x-auto">
            {`{
  "accountBalance": "Ihr Guthaben beträgt {balance, number, currency}."
}`}
          </pre>
        </div>
        <p>
          <code>&#x7B;balance, number, currency&#x7D;</code> instructs the formatter to format the <code>balance</code>{" "}
          value as a number representing currency, respecting locale-specific rules for separators, currency symbol,
          etc.
        </p>

        <h4 className="text-lg font-medium mt-4">Plural Formatting:</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
          <p className="font-mono text-sm mb-2">en.json:</p>
          <pre className="overflow-x-auto">
            {`{
  "itemCount": "{itemCount, plural, one {# item} other {# items}}"
}`}
          </pre>
          <p className="font-mono text-sm mt-4 mb-2">ru.json (Russian has multiple plural forms):</p>
          <pre className="overflow-x-auto">
            {`{
  "itemCount": "{itemCount, plural, one {# товар} few {# товара} many {# товаров} other {# товара}}"
}`}
          </pre>
        </div>
        <p>
          The <code>&#x7B;itemCount, plural, ...&#x7D;</code> construct is powerful. It takes the <code>itemCount</code>{" "}
          and uses locale-specific plural rules to pick the correct phrase ("one", "few", "many", "other").{" "}
          <code>#</code> is a special placeholder for the number itself, already formatted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <List className="w-6 h-6" />
          Using Formatters in Code
        </h2>
        <p>
          The JSON file simply provides the template string. The actual formatting is done in the application code using
          built-in browser/Node.js APIs (like the{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            <code>Intl</code>
          </a>{" "}
          object) or dedicated i18n libraries.
        </p>
        <p>
          Libraries like <code>react-intl</code> or <code>formatjs</code> parse the ICU MessageFormat strings from your
          JSON and use the browser's or a polyfill's <code>Intl</code> object to perform the locale-aware formatting.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          Conceptual Code Example (using a hypothetical `translate` function):
        </h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assuming you have a dictionary loaded for the current locale
// const messages = { /* content of en.json or es.json etc. */ };
// Assuming a translate function that uses a formatter library

interface TranslationMessages {
  [key: string]: string; // ICU MessageFormat string
}

// This function would typically wrap a call to Intl.MessageFormat
function translate(key: string, values?: { [key: string]: any }): string {
  // In a real app, this would:
  // 1. Look up the message string using the 'key' from the loaded locale messages
  // 2. Use a formatter library (e.g., new Intl.MessageFormat(messageString, currentLocale))
  // 3. Format the message string using the provided 'values' object
  // 4. Return the formatted string
  console.log(\`Translate called for key: \${key}, values: \`, values);
  // --- Simplified placeholder logic for demonstration ---
  let template = \`[MISSING TRANSLATION KEY: \${key}]\`;
  // In a real app, you'd get this from your loaded JSON
  // For this static example, let's use hardcoded templates:
  const hardcodedTemplates: TranslationMessages = {
      "greetingWithUser": "Hello, {userName}!",
      "lastLogin": "Last login: {loginDate, date, medium}.",
      "accountBalance": "Your balance is {balance, number, currency}.",
      "itemCount": "{itemCount, plural, one {# item} other {# items}}",
      "itemCount_ru": "{itemCount, plural, one {# товар} few {# товара} many {# товаров} other {# товара}}" // Russian example
  };

  const currentLocale = "en"; // Assume English for this example

  if (currentLocale === "ru" && key === "itemCount") {
     template = hardcodedTemplates["itemCount_ru"];
  } else if (hardcodedTemplates[key]) {
     template = hardcodedTemplates[key];
  }


  // A real formatter library would parse 'template' and 'values'
  // and produce the locale-aware output.
  // This is a VERY basic placeholder replacement, NOT a real formatter:
  let result = template;
  if (values) {
      for (const valKey in values) {
          // This simple replace doesn't handle plural/date/number types correctly
          // It only handles simple string replacement like {userName}
          const placeholderRegex = new RegExp(\`{\${valKey}\}\`, 'g');
          if(placeholderRegex.test(result)){ // Check if simple placeholder exists
             result = result.replace(placeholderRegex, String(values[valKey]));
          } else {
             // This part would be handled by the actual formatter library
             // For date, number, plural formats, the placeholder looks different {key, type, style}
             // A real library would handle the complex parsing and formatting based on type/style.
             // Example: For "{loginDate, date, medium}", it finds loginDate, sees 'date, medium',
             // and calls Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(values['loginDate'])
             // We can't replicate Intl here statically.
             // Let's just log a note about complex formatting for teaching purposes.
             // console.log(\`Note: For key '\${key}', value '\${valKey}' might need complex formatting (date, number, plural).\`);
          }
      }
  }

  // For keys requiring complex formatting in the real world,
  // the basic placeholder logic above is insufficient.
  // A library handles:
  // - "{loginDate, date, medium}" -> using Intl.DateTimeFormat
  // - "{balance, number, currency}" -> using Intl.NumberFormat
  // - "{itemCount, plural, ...}" -> using Intl.PluralRules and complex message parsing
  // The JSON structure provides the *instructions* ({type, style/rules}),
  // and the code with the formatter *executes* those instructions based on the locale.

  return result; // Returns the template string with simple placeholders replaced.
}

// --- How it would be used (conceptually) ---

const userName = "Alice";
// Imagine user logs in, we get a Date object
const loginDateTime = new Date(); // e.g., Fri Dec 17 2021 10:00:00 GMT+0000

// Imagine fetching balance from API
const userBalance = 123456.789;

// Imagine fetching item count
const currentItemCount = 2;
const singleItemCount = 1;
const zeroItemCount = 0;
const russianItemCountMany = 5; // Example for Russian 'many' plural form


// --- How it renders (conceptually) ---

// Using the conceptual translate function:
// In a real app with a formatter:
// English Locale:
// translate('greetingWithUser', { userName: userName }) => "Hello, Alice!"
// translate('lastLogin', { loginDate: loginDateTime }) => "Last login: Dec 17, 2021, 10:00 AM." (or similar medium format)
// translate('accountBalance', { balance: userBalance }) => "Your balance is $123,456.79."
// translate('itemCount', { itemCount: currentItemCount }) => "2 items"
// translate('itemCount', { itemCount: singleItemCount }) => "1 item"
// translate('itemCount', { itemCount: zeroItemCount }) => "0 items"

// German Locale (de):
// translate('accountBalance', { balance: userBalance }) => "Ihr Guthaben beträgt 123.456,79 €." (Note: decimal/thousands separator, currency symbol & placement)

// Russian Locale (ru) - assumes different dictionary loaded and locale set
// translate('itemCount', { itemCount: currentItemCount }) => "2 товара" (plural 'few')
// translate('itemCount', { itemCount: singleItemCount }) => "1 товар" (plural 'one')
// translate('itemCount', { itemCount: zeroItemCount }) => "0 товаров" (plural 'many' often used for 0)
// translate('itemCount', { itemCount: russianItemCountMany }) => "5 товаров" (plural 'many')

// Since this is a static page, we just show the concept:
`}
            </pre>
          </div>
        </div>
        <p>
          As you can see, the JSON provides the rules (&#x7B;value, type, style&#x7D;), and the library/API interprets
          these rules based on the active locale and the provided value to produce the final, correctly formatted
          string.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutList className="w-6 h-6" />
          Benefits of Using Formatters
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Reduced Translation Effort:</strong> Translators only need to provide the template string and the
            plural/select rules, not every single permutation of formatted data.
          </li>
          <li>
            <strong>Locale Correctness:</strong> Relies on established standards (like ICU) and built-in browser APIs (
            <code>Intl</code>) or robust libraries, ensuring correct date, number, and plural formatting for each
            locale.
          </li>
          <li>
            <strong>Code Simplicity:</strong> Application code passes raw data (numbers, dates, counts) to the
            translation function; the complexity of formatting is abstracted away.
          </li>
          <li>
            <strong>Flexibility:</strong> Easily add support for new locales; the formatting rules are already defined
            by the standard or library.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <List className="w-6 h-6" />
          Teaching Points for Developers
        </h2>
        <p>When introducing this concept, emphasize:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Separation of Concerns:</strong> JSON stores *what* needs to be displayed and the *rules* for
            dynamic parts; code handles the *how* (the formatting logic).
          </li>
          <li>
            <strong>The Importance of Locale:</strong> Formatting isn't just about inserting values; it's about doing so
            according to the user's specific language and region settings.
          </li>
          <li>
            <strong>Using Standard APIs/Libraries:</strong> Encourage the use of the <code>Intl</code> object or
            well-maintained i18n libraries that implement standards like ICU MessageFormat, rather than building custom
            formatting logic.
          </li>
          <li>
            <strong>Testing:</strong> Stress the importance of testing formatted messages with different data values
            (especially edge cases for plurals like 0, 1, 2, 5, 10, 20, 21, 100, 101 etc.) and in different locales.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Globe className="w-6 h-6" />
          Conclusion
        </h2>
        <p>
          Teaching developers to leverage formatters is crucial for building scalable and correctly localized
          applications. By using standards-based templates in JSON translation files and employing powerful formatting
          tools in the code, developers can handle the complexities of locale-aware data presentation effectively. This
          moves beyond simple text replacement, enabling applications to feel truly native to users around the world.
        </p>
      </div>
    </>
  );
}
