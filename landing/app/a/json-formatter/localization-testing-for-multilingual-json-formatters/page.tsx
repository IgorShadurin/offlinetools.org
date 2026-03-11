import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRightLeft,
  Bug,
  Check,
  Code,
  Columns2,
  FileJson,
  Globe,
  Info,
  Languages,
  ListChecks,
  RefreshCcw,
  TestTube,
  Users,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Localization Testing for Multilingual JSON Formatters: Practical QA Guide",
  description:
    "Learn how to test multilingual JSON formatters for dates, numbers, currencies, plurals, lists, fallback behavior, and RTL text with practical examples and checklists.",
  alternates: {
    canonical:
      "https://offlinetools.org/a/json-formatter/localization-testing-for-multilingual-json-formatters",
  },
};

const localeMatrix = [
  {
    locale: "en-US",
    reason: "Baseline English, month/day ordering, 12-hour clock behavior, and common currency formatting expectations.",
  },
  {
    locale: "en-GB",
    reason: "Same language, different defaults. Useful for catching hard-coded US date and time assumptions.",
  },
  {
    locale: "de-DE",
    reason: "Decimal commas, different thousands separators, and longer compound words that stress layout.",
  },
  {
    locale: "fr-FR",
    reason: "Spacing rules around punctuation and currency formatting often expose brittle string handling.",
  },
  {
    locale: "ja-JP",
    reason: "Different date patterns, dense UI text, and no English-style plural inflection.",
  },
  {
    locale: "ar",
    reason: "Right-to-left layout, mixed-direction text, and locale-specific digit rendering expectations.",
  },
  {
    locale: "ru",
    reason: "Plural rules are more complex than simple one/other logic, which makes it a strong message-format test case.",
  },
];

const currentApiChecks = [
  {
    api: "Intl.DateTimeFormat",
    detail:
      "Test locale, calendar, numbering system, and a fixed time zone. Use formatToParts or formatRange when your formatter composes UI from pieces or renders date ranges.",
  },
  {
    api: "Intl.NumberFormat",
    detail:
      "Cover decimal, percent, unit, and currency output. Verify grouping, sign display, narrow symbols, and range formatting where totals or comparisons appear.",
  },
  {
    api: "Intl.ListFormat",
    detail:
      "Use it for locale-correct conjunctions such as 'A, B, and C' instead of joining arrays manually.",
  },
  {
    api: "Intl.RelativeTimeFormat",
    detail:
      "Exercise labels such as 'yesterday', 'in 3 days', or abbreviated forms that many dashboards and feeds rely on.",
  },
  {
    api: "Intl.PluralRules",
    detail:
      "Test count-based messages with locale-specific categories, and include range cases when the UI renders values like '1-2 items'.",
  },
];

const failurePatterns = [
  "Tests pass locally but fail in CI because the formatter silently used the host machine's default time zone.",
  "A translation key exists, but the rendered sentence is still wrong because the app concatenates fragments instead of formatting a full localized message.",
  "Arabic or Hebrew pages show punctuation, SKU codes, or email addresses in the wrong visual order when embedded values are not direction-isolated.",
  "The JSON contains a value for 1 item and 5 items, but values such as 0, 2, 11, 21, or 1.0 still render the wrong plural form.",
  "A fallback locale hides missing translations in staging, then broken raw keys appear in production for one region.",
];

const releaseChecklist = [
  "Pin locale and time zone in automated tests so snapshots and assertions are deterministic.",
  "Run pseudolocalization and at least one RTL locale before release.",
  "Check dates, numbers, currencies, list output, and pluralized messages from realistic JSON payloads.",
  "Verify missing-key and fallback behavior intentionally instead of treating it as an edge case.",
  "Include manual review by a fluent speaker for high-traffic flows and error states.",
];

const samplePayload = `{
  "locale": "ar-EG",
  "updatedAt": "2026-03-10T18:45:00Z",
  "cart": {
    "count": 2,
    "subtotal": 12345.67,
    "currency": "EGP",
    "items": ["USB-C Hub", "4K Cable", "SSD Enclosure"]
  },
  "messages": {
    "items": "{count, plural, one {# item} other {# items}}",
    "eta": "{value, number} {value, plural, one {day} other {days}} left"
  },
  "agentNote": "Order #A-1049 ships to Berlin"
}`;

const bidiExample = `<p dir="rtl">
  <bdi>Order #A-1049 ships to Berlin</bdi>
</p>`;

export default function LocalizationTestingJsonArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center space-x-3 text-3xl font-bold">
        <Globe className="h-8 w-8" />
        <span>Localization Testing for Multilingual JSON Formatters</span>
      </h1>

      <div className="space-y-6">
        <p>
          Localization testing for multilingual JSON formatters means more than checking whether translated strings
          exist. A useful test plan verifies that your formatter renders locale-sensitive dates, numbers, lists,
          plurals, fallback content, and mixed-direction text correctly when real JSON payloads hit the UI.
        </p>
        <p>
          For most teams, the highest-value improvements are simple: pin the test time zone, cover more than one
          English locale, exercise plural edge cases, and review at least one right-to-left language. Those four steps
          catch a large share of production localization bugs.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <p className="flex items-start space-x-2">
            <Info className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span>
              If you only add one new rule to your test suite, make it this: never let locale-sensitive formatting rely
              on the host environment by accident. A formatter that skips explicit locale or time-zone inputs will often
              look correct on one machine and break on another.
            </span>
          </p>
        </div>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <span>What Usually Breaks First</span>
        </h2>
        <ul className="my-4 list-disc space-y-3 pl-6">
          {failurePatterns.map((item) => (
            <li key={item} className="flex items-start space-x-2">
              <X className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Columns2 className="h-6 w-6 text-blue-500" />
          <span>Build a Small but High-Value Locale Matrix</span>
        </h2>
        <p>
          You do not need dozens of locales to find real defects. Start with a compact matrix that forces your JSON
          formatter through different scripts, number systems, date conventions, and plural rules.
        </p>
        <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 font-semibold">Locale</th>
                <th className="px-4 py-3 font-semibold">Why it earns a slot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {localeMatrix.map((entry) => (
                <tr key={entry.locale}>
                  <td className="whitespace-nowrap px-4 py-3 font-mono">{entry.locale}</td>
                  <td className="px-4 py-3">{entry.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Adjust the matrix to your audience, but keep at least one same-language comparison such as{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">en-US</code> vs{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">en-GB</code> and one RTL locale. That is
          where hidden assumptions show up fastest.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <FileJson className="h-6 w-6 text-green-500" />
          <span>JSON Cases Worth Testing Every Time</span>
        </h2>
        <p>
          Use realistic JSON, not toy strings. A formatter that survives actual product data is far more trustworthy
          than one that passes a single happy-path snapshot.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          <code>{samplePayload}</code>
        </pre>
        <ul className="my-4 list-disc space-y-3 pl-6">
          <li className="flex items-start space-x-2">
            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span>
              <strong>Dates and times:</strong> confirm the formatter respects locale and an explicit time zone, then
              compare single values and date ranges.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span>
              <strong>Numbers and currencies:</strong> verify decimals, group separators, currency symbol placement,
              negative values, and rounding.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span>
              <strong>Lists:</strong> do not join arrays with commas by hand. Test conjunctions and shorter UI spaces.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span>
              <strong>Pluralized messages:</strong> include 0, 1, 2, 5, 11, 21, and at least one fractional value if
              your product displays measurements or money.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span>
              <strong>Fallback behavior:</strong> assert the result when a key is missing, a locale is unsupported, or
              one field is null.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
            <span>
              <strong>Embedded mixed-direction text:</strong> test order numbers, email addresses, URLs, and Latin
              product names inside Arabic or Hebrew UI.
              <ArrowRightLeft className="ml-1 inline h-4 w-4" />
            </span>
          </li>
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Code className="h-6 w-6 text-blue-500" />
          <span>Use Current Intl APIs as Test Targets</span>
        </h2>
        <p>
          Modern JavaScript internationalization is broader than just{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">toLocaleString()</code>. If your JSON
          formatter exposes localized output, these APIs should either power the result directly or shape your expected
          test assertions.
        </p>
        <ul className="my-4 list-disc space-y-3 pl-6">
          {currentApiChecks.map((entry) => (
            <li key={entry.api}>
              <strong>{entry.api}:</strong> {entry.detail}
            </li>
          ))}
        </ul>
        <p>
          A practical rule for stable tests: pass the locale and time zone explicitly into the formatter under test. If
          the time zone is omitted, date output can vary by environment even when the same JSON input is used.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Languages className="h-6 w-6 text-purple-500" />
          <span>Plural and Message Formatting Edge Cases</span>
        </h2>
        <p>
          Many teams still test pluralization as if every language were English. That misses a large class of defects.
          Locale data used by modern formatters supports categories such as{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">zero</code>,{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">one</code>,{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">two</code>,{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">few</code>,{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">many</code>, and{" "}
          <code className="rounded bg-gray-100 p-1 text-sm dark:bg-gray-800">other</code>, but not every locale uses
          the same set or the same rules.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Test teens and twenties, not just 1 and 2.</li>
          <li>Include fractional values if your app formats prices, sizes, or durations.</li>
          <li>Prefer full localized messages over concatenating translated fragments around variables.</li>
          <li>Review range wording if the UI renders values like 1-2 days or 3-5 results.</li>
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <TestTube className="h-6 w-6 text-cyan-500" />
          <span>RTL and Mixed-Direction Testing</span>
        </h2>
        <p>
          Right-to-left testing is not only about flipping alignment. The harder bugs appear when localized UI contains
          embedded left-to-right strings from JSON, such as SKU codes, product names, URLs, or addresses.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          <code>{bidiExample}</code>
        </pre>
        <p>
          When the direction of injected content is unknown, isolate it instead of assuming the surrounding paragraph
          direction is enough. In practice, test both Arabic and Hebrew pages with punctuation-heavy strings because
          visual order mistakes are easier to miss in screenshots than simple translation errors.
        </p>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Users className="h-6 w-6 text-emerald-500" />
          <span>Automation, Pseudolocalization, and Human Review</span>
        </h2>
        <ul className="my-4 list-disc space-y-3 pl-6">
          <li>
            <strong>Unit and integration tests:</strong> assert deterministic formatter output from fixed JSON fixtures.
          </li>
          <li>
            <strong>Pseudolocalization:</strong> expand strings, add markers, and run visual regression to catch
            overflow before real translations arrive.
          </li>
          <li>
            <strong>RTL screenshots:</strong> capture at least one end-to-end flow with real data, not placeholder text.
          </li>
          <li>
            <strong>Manual linguistic review:</strong> native-speaker review remains essential for tone, context, and
            cultural fit.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <Bug className="h-6 w-6 text-red-500" />
          <span>Troubleshooting Checklist</span>
        </h2>
        <ul className="my-4 list-disc space-y-3 pl-6">
          <li>
            If output differs by machine, inspect locale, time zone, and ICU data before blaming the JSON payload.
          </li>
          <li>If only one locale fails, compare the raw message pattern first, then the variable values supplied.</li>
          <li>If punctuation looks wrong in RTL, test with direction isolation instead of CSS-only fixes.</li>
          <li>
            If list output sounds awkward, replace manual joining logic with locale-aware list formatting and retest.
          </li>
          <li>If keys leak into the UI, make fallback behavior explicit and cover it with assertions.</li>
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <ListChecks className="h-6 w-6 text-green-500" />
          <span>Release Checklist</span>
        </h2>
        <ul className="my-4 list-disc space-y-3 pl-6">
          {releaseChecklist.map((item) => (
            <li key={item} className="flex items-start space-x-2">
              <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 flex items-center space-x-2 text-2xl font-semibold">
          <RefreshCcw className="h-6 w-6 text-blue-500" />
          <span>Bottom Line</span>
        </h2>
        <p>
          A strong multilingual JSON formatter test plan is small, deliberate, and realistic. Cover representative
          locales, pin environment-sensitive values, use current internationalization APIs as your baseline, and treat
          plural rules plus mixed-direction text as first-class test targets. That produces a page and a product that
          actually work for global users, not just for the developer who wrote the formatter.
        </p>
      </div>
    </>
  );
}
