import type { Metadata } from "next";
import { Globe, Calendar, Banknote, Percent, Text, Languages, HelpCircle, Code, Bug, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Internationalization of JSON Formatters for Global Users",
  description:
    "Learn how to format and display data from JSON for users across different locales, covering numbers, dates, currencies, and text.",
};

export default function InternationalizationJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Globe className="w-8 h-8" />
        Internationalization of JSON Formatters for Global Users
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format used for transmitting data across networks,
          storing configuration, and much more. While the JSON structure itself is language and locale-agnostic
          (standard keys and structure are usually ASCII/UTF-8), the *values* contained within a JSON document often
          represent data meant for human consumption. Displaying these values correctly for users around the world
          requires careful consideration of
          <strong>Internationalization (I18n)</strong>.
        </p>
        <p>
          A "JSON Formatter" in this context might refer to a tool or component that takes raw JSON data and renders it
          in a human-readable way, perhaps in a web interface or a report. This rendering process is where I18n becomes
          critical. Simply displaying raw numbers, dates, or strings as they appear in the JSON can lead to confusion,
          errors, or even offense in different cultures.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <HelpCircle className="w-6 h-6" /> What Needs Internationalization in JSON Display?
        </h2>
        <p>
          The JSON format specifies how data is structured (objects with key-value pairs, arrays, primitives), but it
          doesn't dictate how those primitive values should be interpreted or displayed to a user based on their
          cultural preferences. Key data types requiring locale-specific formatting include:
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Percent className="w-5 h-5" /> Numbers
        </h3>
        <p>Numbers are not just digits; their display varies significantly.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Decimal Separator:</strong> A period (`.`) in English-speaking locales vs. a comma (`,`) in many
            European countries (e.g., <code>1.234.567,89</code>
            vs. <code>1,234,567.89</code>).
          </li>
          <li>
            <strong>Grouping Separator:</strong> A comma (`,`) in English-speaking locales vs. a period (`.`), space (`
            `), or non-breaking space (`&amp;nbsp;`) in others (e.g., <code>1,000,000</code> vs. <code>1.000.000</code>{" "}
            or
            <code>1 000 000</code>).
          </li>
          <li>
            <strong>Percentage Symbol:</strong> Placement relative to the number (e.g.,
            <code>10%</code> vs. <code>10 %</code> vs. <code>%10</code>).
          </li>
        </ul>
        <p>
          A JSON value like <code>1234.56</code> might need to be formatted as
          <code>1.234,56</code> for a user in Germany.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Dates and Times
        </h3>
        <p>
          JSON often stores dates and times as strings (e.g., ISO 8601 like
          <code>"2023-10-27T10:30:00Z"</code>) or sometimes as timestamps. Displaying these correctly involves
          locale-specific formats and timezones.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Date Formats:</strong> Month-Day-Year (MM/DD/YY) vs. Day-Month-Year (DD/MM/YY) vs. Year-Month-Day
            (YY/MM/DD). Also, long formats like "October 27, 2023" vs. "27 October 2023".
          </li>
          <li>
            <strong>Time Formats:</strong> 12-hour with AM/PM vs. 24-hour format. Separator for hours/minutes (e.g.,{" "}
            <code>10:30</code> vs. <code>10.30</code>).
          </li>
          <li>
            <strong>Timezones:</strong> Displaying the time adjusted to the user's local timezone.
          </li>
        </ul>
        <p>
          A JSON value like <code>"2023-10-27T10:30:00Z"</code> might be displayed as
          <code>10/27/2023, 6:30 AM EDT</code> for a user in New York, or
          <code>27.10.2023, 12:30 CEST</code> for a user in Berlin.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Banknote className="w-5 h-5" /> Currencies
        </h3>
        <p>Currency values require formatting specific to the currency and the user's locale.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Currency Symbol:</strong> Where does it go (e.g., <code>$10.50</code>
            vs. <code>10,50 €</code> vs. <code>10.50 &amp;pound;</code>)?
          </li>
          <li>
            <strong>Decimal and Grouping:</strong> Use locale-specific separators for the numeric part.
          </li>
          <li>
            <strong>Currency Code:</strong> Sometimes the ISO currency code (USD, EUR) is needed for clarity, especially
            when dealing with multiple currencies.
          </li>
        </ul>
        <p>
          A JSON value representing an amount and currency, like{" "}
          <code>&#x7b; "amount": 100.50, "currency": "EUR" &#x7d;</code>, might need to be displayed as{" "}
          <code>€100.50</code>, <code>100,50 €</code>, or <code>100.50 EUR</code> depending on the locale.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Text className="w-5 h-5" /> Text and Strings
        </h3>
        <p>
          Textual content within JSON values often needs translation, but there are other I18n considerations for
          strings.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Translation:</strong> The most obvious need – presenting text in the user's language.
          </li>
          <li>
            <strong>Collation (Sorting):</strong> The order of characters varies between languages (e.g., how accented
            letters are sorted). Sorting JSON arrays of strings correctly requires locale-aware sorting algorithms.
          </li>
          <li>
            <strong>Character Sets:</strong> While JSON itself is usually UTF-8, ensuring the display environment
            supports and correctly renders all characters is important.
          </li>
          <li>
            <strong>Bidirectional Text:</strong> For languages written right-to-left (like Arabic or Hebrew), the layout
            needs to accommodate text direction.
          </li>
        </ul>
        <p>
          A JSON value like <code>"status": "Pending"</code> might need to be translated to{" "}
          <code>"état": "En attente"</code> for a French user. Sorting an array like{" "}
          <code>["apple", "banana", "Äpfel"]</code> might result in a different order depending on the locale.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> How JSON Formatters Handle I18n
        </h2>
        <p>
          A robust JSON formatter for global users does not modify the JSON data itself in transit or storage. Instead,
          it applies formatting rules to the *values* just before displaying them to the user. This is typically done
          by:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            <strong>Detecting the User's Locale:</strong> This can be done via browser settings, user profile
            preferences, URL parameters, or IP address lookup.
          </li>
          <li>
            <strong>Using I18n APIs or Libraries:</strong> Leverage built-in language features (like JavaScript's{" "}
            <code>Intl</code> object) or dedicated I18n libraries to format numbers, dates, and currencies according to
            the detected locale rules.
          </li>
          <li>
            <strong>Managing Translations:</strong> For text values, look up the appropriate translation based on the
            original string (or a translation key) and the user's locale.
          </li>
          <li>
            <strong>Applying Formatting During Rendering:</strong> When iterating through the JSON structure to build
            the display (e.g., generating HTML, PDF, etc.), apply the locale-specific formatting to each value.
          </li>
        </ol>
        <p>
          For developers working with web interfaces displaying JSON data, JavaScript's built-in <code>Intl</code>{" "}
          object is a powerful tool.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Languages className="w-5 h-5" /> Example: Using JavaScript's Intl API
        </h3>
        <p>Suppose you have the following JSON data:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`{
  "productName": "Laptop Pro",
  "priceUSD": 1234.56,
  "orderDate": "2023-10-27T10:30:00Z",
  "stockAmount": 1000000,
  "discountRate": 0.15
}`}
          </pre>
        </div>
        <p>
          Here's how you might format these values using <code>Intl</code> based on different locales (e.g.,{" "}
          <code>en-US</code>, <code>de-DE</code>):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Formatting Examples:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">
              {`// Assume json.priceUSD = 1234.56
const priceUS = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(json.priceUSD);
// Output for en-US: "$1,234.56"

const priceDE = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(json.priceUSD); // Note: currency is USD, but format is EUR locale
// Output for de-DE (USD currency): "1.234,56 $", or maybe "$ 1.234,56" depending on environment Intl data

// Assume json.orderDate = "2023-10-27T10:30:00Z" (an ISO string)
const dateUS = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long', timeZone: 'America/New_York' }).format(new Date(json.orderDate));
// Output for en-US in NY: "Friday, October 27, 2023 at 6:30:00 AM EDT"

const dateDE = new Intl.DateTimeFormat('de-DE', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Europe/Berlin' }).format(new Date(json.orderDate));
// Output for de-DE in Berlin: "Freitag, 27. Oktober 2023 um 12:30:00 MEZ"

// Assume json.stockAmount = 1000000
const amountUS = new Intl.NumberFormat('en-US').format(json.stockAmount);
// Output for en-US: "1,000,000"

const amountDE = new Intl.NumberFormat('de-DE').format(json.stockAmount);
// Output for de-DE: "1.000.000"

// Assume json.discountRate = 0.15
const discountUS = new Intl.NumberFormat('en-US', { style: 'percent' }).format(json.discountRate);
// Output for en-US: "15%"

const discountFR = new Intl.NumberFormat('fr-FR', { style: 'percent' }).format(json.discountRate);
// Output for fr-FR: "15 %"`}
            </pre>
          </div>
        </div>
        <p>
          This demonstrates how the same raw data values from the JSON are presented drastically differently depending
          on the specified locale and formatting options.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug className="w-6 h-6" /> Challenges
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Locale Detection:</strong> Accurately determining the user's preferred locale can be tricky (browser
            settings might not match user preference, IP geolocation is imprecise).
          </li>
          <li>
            <strong>Maintaining Data Type:</strong> Ensure that after formatting, the output is still usable if it needs
            to be copied or processed further (e.g., formatting a number as a string for display is fine, but don't lose
            the original numeric value if calculations are needed).
          </li>
          <li>
            <strong>Consistency:</strong> Apply formatting consistently across the entire application wherever JSON data
            is displayed.
          </li>
          <li>
            <strong>Performance:</strong> Formatting many values can add overhead, especially in complex nested JSON
            structures.
          </li>
          <li>
            <strong>Framework/Library Integration:</strong> Integrating I18n formatting into your specific rendering
            framework or component library.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" /> Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Store Raw, Format Late:</strong> Store numbers as numbers, dates as standardized strings (like ISO
            8601), and base currency amounts as numbers in the JSON. Do not store pre-formatted strings like "€1.234,56"
            in the JSON itself.
          </li>
          <li>
            <strong>Use Standard I18n Libraries:</strong> Rely on well-tested libraries or built-in APIs (like
            JavaScript's <code>Intl</code>, Java's <code>Locale</code>/<code>Format</code>
            classes, etc.) rather than trying to implement formatting logic from scratch.
          </li>
          <li>
            <strong>Centralize Formatting Logic:</strong> Create helper functions or components that handle formatting
            based on the current locale, rather than scattering formatting logic throughout your codebase.
          </li>
          <li>
            <strong>Provide Locale Switcher:</strong> Allow users to manually select their preferred language and
            locale, overriding automatic detection.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Globe className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          While JSON provides a standard way to structure data, presenting that data to a global audience requires
          applying locale-specific formatting rules to the values within the JSON. A "JSON formatter" that aims to be
          helpful for global users must incorporate internationalization practices for numbers, dates, currencies, and
          text. By storing data in a locale-agnostic format and using standard I18n tools at the presentation layer,
          developers can ensure that their applications are understandable and intuitive for users around the world.
        </p>
      </div>
    </>
  );
}
