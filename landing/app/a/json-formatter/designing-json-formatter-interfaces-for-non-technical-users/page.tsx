import type { Metadata } from "next";
import {
  Check,
  Code,
  Columns2,
  Diff,
  Info,
  Palette,
  Text,
  Trees,
  UserRound,
  X,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Designing JSON Formatter Interfaces for Non-Technical Users | Offline Tools",
  description:
    "A practical guide to designing JSON formatter interfaces for editors, analysts, support teams, and other non-technical users, with advice on labels, validation, accessibility, mobile layout, and privacy.",
};

export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <Code size={30} /> Designing JSON Formatter Interfaces for Non-Technical Users
      </h1>

      <div className="space-y-6">
        <p>
          A non-technical user does not open a JSON formatter because they want to study braces and commas. They open it
          because they need a quick answer: Is this data valid? Where is the problem? Can I safely copy the cleaned-up
          result? A good interface removes fear, reduces mistakes, and makes the structure obvious without requiring the
          user to learn developer jargon.
        </p>

        <p>
          That means the job is bigger than pretty-printing. A useful formatter for content editors, QA staff, analysts,
          support teams, and operations users should explain what to paste, show what went wrong in plain language, and
          help users recover quickly. If the tool handles sensitive customer or internal data, it should also make trust
          cues obvious.
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="mb-2 text-xl font-semibold">What Success Looks Like</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Users understand what the tool accepts before they paste anything.
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Errors identify the exact problem, location, and likely fix.
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              The formatted output is easy to scan, collapse, copy, and compare.
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              The interface feels safe on mobile, with assistive technology, and with sensitive data.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <UserRound size={24} /> Who Counts as a Non-Technical User?
        </h2>
        <p>This audience usually includes people who work with data but do not think in code every day. They often:</p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            recognize field names like <code>status</code> or <code>customerId</code>, but not parser terminology.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            need to inspect or lightly edit API responses, settings exports, or webhook payloads.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            get blocked by small syntax issues such as trailing commas, missing quotes, or unmatched braces.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            care more about understanding the data than understanding JSON itself.
          </li>
        </ul>
        <p>
          Design for their questions, not for your parser. The best interface should help them move from “this looks
          broken” to “I know what to do next” in a few seconds.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Palette size={24} /> Start With the Smallest Interface That Still Feels Safe
        </h2>
        <p>
          Most non-technical users do not need a dense developer console. They need one clear primary action and a few
          carefully chosen secondary actions.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Minimum Viable Layout</h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Visible input label:</strong> Say what belongs in the box, for example “Paste JSON” or “Upload a
            .json file”.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>One primary button:</strong> “Format JSON” should be the first action, not one of ten equal
            buttons.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Small supporting actions:</strong> Validate, minify, copy, clear, and download are useful secondary
            tools when visually grouped.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Separate output state:</strong> Users should instantly see whether formatting succeeded, failed, or
            produced no result yet.
          </li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Example Empty State Copy</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm dark:bg-gray-900">
            {`Paste JSON
Paste an API response, settings export, or .json file.
JSON only. Comments and trailing commas are not accepted.

[ Format JSON ]  [ Validate ]  [ Minify ]

Nothing leaves your browser.`}
          </pre>
        </div>

        <p className="flex items-center gap-2">
          <X size={20} className="min-w-[20px] text-red-500" />
          Do not rely on placeholder text alone. Once the user pastes data, the instructions disappear exactly when they
          are most needed.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Text size={24} /> Labels, Instructions, and Microcopy Do Heavy Lifting
        </h2>
        <p>
          The wording around a JSON formatter often matters more than the formatting algorithm. Users need explicit
          guidance about what the tool supports and what each action does.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            State whether the tool accepts strict JSON only, or whether it also tolerates JSON5-like input such as
            comments and trailing commas.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            Explain where the result appears and whether the output box is editable.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            Use familiar action words such as “Format”, “Check”, “Copy”, and “Download” instead of “Parse” or “Serialize”.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            Offer a sample JSON button if your audience often starts from scratch and is unsure what valid JSON looks like.
          </li>
        </ul>
        <p>
          Current accessibility guidance still points in the same direction.{" "}
          <a
            href="https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions"
            className="text-blue-700 underline underline-offset-2 dark:text-blue-400"
          >
            W3C guidance on labels and instructions
          </a>{" "}
          emphasizes visible labels, format examples, and instructions that are presented to everyone, not only to
          assistive technology users.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Info size={24} /> Validation Should Be Helpful, Not Hyperactive
        </h2>
        <p>
          This is where many formatter interfaces fail. Constant red warnings while a user is still pasting or editing a
          payload can make the tool feel hostile. For non-technical users, restrained validation is usually better than
          aggressive live validation.
        </p>

        <h3 className="mt-6 text-xl font-semibold">What Good Validation Looks Like</h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Trigger validation when the user clicks Format or Validate, or after a short pause once input stabilizes.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Show the exact line and column of the issue.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Name the likely mistake in plain language: missing comma, extra quote, unexpected closing brace.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Suggest the next step when the fix is known.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Keep the original text in place so users can repair it without starting over.
          </li>
        </ul>

        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">Better Error Copy</h4>
          <pre className="overflow-x-auto rounded bg-white p-3 text-sm text-red-700 dark:bg-gray-900 dark:text-red-400">
            {`We couldn't format this JSON yet.
Line 12, column 18: missing comma after "status".
Fix that comma and try Format JSON again.`}
          </pre>
        </div>

        <p>
          This advice is not just theoretical. The{" "}
          <a
            href="https://designsystem.digital.gov/components/validation/"
            className="text-blue-700 underline underline-offset-2 dark:text-blue-400"
          >
            U.S. Web Design System
          </a>{" "}
          now warns that its validation component uncovered major usability and accessibility issues and is being phased
          out after version 3.12.0. That is a useful signal for formatter design: a calm, explicit validation flow often
          works better than a constantly shouting interface.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Trees size={24} /> Make the Structure Visible
        </h2>
        <p>
          Non-technical users get value when the shape of the data becomes obvious. Pretty-printing is the first step,
          but not the last one.
        </p>

        <h3 className="mt-6 text-xl font-semibold">High-Value Reading Aids</h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Accessible syntax highlighting:</strong> Use contrast that remains legible for long sessions and do
            not depend on color alone to explain meaning.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Collapsible nodes:</strong> Tree view is often easier to scan than a large text block when payloads
            are deeply nested.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Line numbers:</strong> They make error messages and team handoffs much easier.
          </li>
          <li className="flex items-start gap-2">
            <Info size={20} className="mt-1 min-w-[20px] text-blue-500" />
            <strong>Type cues:</strong> Show strings, numbers, booleans, null, arrays, and objects distinctly so users
            can tell what kind of value they are looking at.
          </li>
        </ul>

        <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
          <Columns2 size={20} /> Side-by-Side vs. Stacked Layout
        </h3>
        <p>
          Side-by-side input and output works well on large screens when the user needs to compare raw and formatted
          versions. On mobile or narrow windows, stack the panes vertically. Preserve the action bar and status summary
          at the top so users do not lose context while scrolling.
        </p>

        <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
          <Diff size={20} /> Comparison Features
        </h3>
        <p>
          A diff view is optional, but useful when the workflow includes small manual edits after formatting. If you add
          it, keep the default experience simple. A comparison mode should feel like an extra tool, not the main way to
          use the formatter.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Palette size={24} /> Design for Real Workflows, Not Ideal Demos
        </h2>
        <p>
          Real users paste from email threads, admin panels, spreadsheets, and mobile apps. They work on laptops during
          calls and on phones while triaging issues. The interface should support that messiness.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Make primary buttons large enough for touch.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Support paste, drag-and-drop, and file upload if your audience receives exported JSON files.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Provide copy and download actions close to the formatted result.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Tell users when a payload is too large to format comfortably in the browser and offer a graceful fallback.
          </li>
        </ul>

        <p className="flex items-center gap-2">
          <X size={20} className="min-w-[20px] text-red-500" />
          Avoid hiding essential help behind tooltips or docs links. If users need a rule to complete the task, show it
          next to the input.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Info size={24} /> Accessibility and Trust Are Part of the Product
        </h2>
        <p>
          For many teams, a JSON formatter is used with private payloads, logs, or customer information. Clear trust
          language is not just marketing polish. It changes whether people feel safe pasting data into the tool.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Accessibility Checklist</h3>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Keep labels visible and keep HTML order matched to visual order.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Put error messages near the relevant field and summarize them in a noticeable status area.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Use <code>aria-invalid</code> and live-region patterns carefully so screen-reader users hear meaningful
            updates without being flooded.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Avoid blame-heavy phrasing such as “You entered bad JSON.” Describe the issue and the fix instead.
          </li>
          <li className="flex items-start gap-2">
            <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
            Avoid disabling the main textarea just to enforce flow. Explain constraints with helper text instead.
          </li>
        </ul>
        <p>
          That aligns with current guidance from{" "}
          <a
            href="https://www.w3.org/WAI/WCAG22/Understanding/error-identification"
            className="text-blue-700 underline underline-offset-2 dark:text-blue-400"
          >
            WCAG 2.2 on error identification
          </a>{" "}
          and the{" "}
          <a
            href="https://designsystem.digital.gov/components/form/"
            className="text-blue-700 underline underline-offset-2 dark:text-blue-400"
          >
            USWDS form guidance
          </a>
          , which recommends aligning validation with inputs, keeping form order logical, and being careful with
          disabled states.
        </p>

        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
          <h2 className="mb-2 text-xl font-semibold">A Good Default Feature Set</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Format JSON
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Validate JSON
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Copy result
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Minify result
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Tree view for nested data
            </li>
            <li className="flex items-start gap-2">
              <Check size={20} className="mt-1 min-w-[20px] text-green-500" />
              Clear privacy note when processing stays local
            </li>
          </ul>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">Conclusion</h2>
        <p>
          Designing a JSON formatter interface for non-technical users is mostly about reducing uncertainty. Clear
          labels, calm validation, readable structure, accessible error handling, and visible privacy cues matter more
          than power-user complexity. If a user can paste data, understand the result, fix a mistake, and move on
          without learning JSON jargon, the interface is doing its job.
        </p>
      </div>
    </>
  );
}
