import type { Metadata } from "next";
import {
  TextSearch,
  Eye,
  Settings,
  ALargeSmall,
  MessageSquareCode,
  Code,
  Check,
  X,
  LayoutList,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Font Considerations for JSON Readability: Best Fonts and Settings | Offline Tools",
  description:
    "Choose better fonts and editor settings for reading JSON. Learn what matters most for braces, quotes, numbers, ligatures, slashed zero, and line spacing.",
};

export default function FontConsiderationsForJsonReadabilityPage() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-3 text-3xl font-bold">
        <TextSearch className="h-8 w-8 text-blue-500" /> Font Considerations for JSON Readability
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          If JSON feels tiring to scan, the problem is usually not JSON itself. It is the combination of font, size,
          line spacing, and punctuation clarity. A good JSON-reading setup makes braces, brackets, quotes, commas, and
          similar-looking characters easy to separate at a glance.
        </p>
        <p>
          For most people, the best choice is a monospaced programming font with strong character distinction, a
          comfortable x-height, and enough weight that punctuation does not disappear on bright screens. Ligatures are
          optional. Clear braces and unambiguous <code>0/O</code> and <code>1/l/I</code> matter much more.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Eye className="h-6 w-6 text-green-500" /> Quick Answer
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Use a monospaced font, not a proportional UI font.</li>
          <li>Prioritize distinct glyphs for <code>0/O</code>, <code>1/l/I</code>, quotes, braces, and brackets.</li>
          <li>Keep font size and line height comfortable before you worry about ligatures.</li>
          <li>Prefer regular or slightly heavier weights over very thin cuts.</li>
          <li>
            If your font supports them, features like <code>slashed-zero</code> and <code>tabular-nums</code> can make
            numeric JSON easier to read.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Check className="h-6 w-6 text-green-500" /> What Actually Helps With JSON
        </h2>

        <h3 className="mt-6 text-xl font-semibold">1. Distinct characters beat everything else</h3>
        <p>
          JSON is dense with punctuation and string data, so character ambiguity causes real mistakes. You want a font
          where these are immediately different:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <code>0</code>, <code>O</code>, and <code>o</code>
          </li>
          <li>
            <code>1</code>, <code>l</code>, and <code>I</code>
          </li>
          <li>
            <code>{"{"}</code>, <code>{"}"}</code>, <code>[</code>, and <code>]</code>
          </li>
          <li>
            <code>&quot;</code>, <code>'</code>, <code>`</code>, <code>:</code>, <code>,</code>, and <code>.</code>
          </li>
        </ul>
        <p>
          This matters more in JSON than in many languages because the structure is almost entirely carried by
          punctuation, indentation, and quoted keys.
        </p>

        <h3 className="mt-6 text-xl font-semibold">2. Strong punctuation makes nesting easier to follow</h3>
        <p>
          Fonts that render braces, brackets, commas, and colons too lightly make nested objects harder to trace. When
          you are debugging long payloads, you spend more time following structure than reading words. A slightly darker
          or sturdier punctuation shape usually wins over a stylish but delicate design.
        </p>

        <h3 className="mt-6 text-xl font-semibold">3. X-height and spacing matter at least as much as the font name</h3>
        <p>
          A readable code font typically has a generous x-height and does not feel cramped. For JSON, that reduces the
          visual blur created by repeated quoted keys and repeated indentation. In practice, a good setup is often:
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Font size:</strong> around 14 to 16px for desktop editor use
          </li>
          <li>
            <strong>Line height:</strong> roughly 1.45 to 1.65x the font size
          </li>
          <li>
            <strong>Indentation:</strong> 2 spaces for most API payloads, because it preserves horizontal space
          </li>
        </ul>
        <p>
          Those settings usually improve readability faster than switching between five similar fonts at the same small
          size.
        </p>

        <h3 className="mt-6 text-xl font-semibold">4. Numbers deserve special attention</h3>
        <p>
          JSON often contains IDs, timestamps, prices, counts, and version numbers. If your font supports OpenType
          numeric features, tabular numerals keep digits visually consistent, and a slashed zero makes <code>0</code>
          harder to confuse with <code>O</code>.
        </p>
        <p>
          MDN documents current CSS support for numeric and glyph-selection features such as{" "}
          <code>font-variant-numeric</code> and <code>font-feature-settings</code>, which are useful when JSON is shown
          in a browser-based formatter or internal tool.
        </p>

        <h3 className="mt-6 text-xl font-semibold">5. Ligatures are optional for JSON</h3>
        <p>
          Ligatures help most in languages with multi-character operators. JSON barely uses those. If you like
          ligatures for your main editor, keep them. If a font without ligatures gives you cleaner braces, quotes, and
          digits, it is usually the better JSON font.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <LayoutList className="h-6 w-6 text-purple-500" /> Recommended Font Types for JSON Work
        </h2>
        <p>
          You do not need a perfect font. You need a font that stays readable across long payloads, deep nesting, and
          repeated keys.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>JetBrains Mono:</strong> A strong default if you want tall lowercase forms, clear punctuation, and
            a developer-focused design. The official project also offers a variable font.
          </li>
          <li>
            <strong>Hack:</strong> Good if you want straightforward shapes and clear symbols without a flashy feel.
          </li>
          <li>
            <strong>IBM Plex Mono or Source Code Pro:</strong> Good options when you want neutral, text-friendly shapes
            for long reading sessions.
          </li>
          <li>
            <strong>Fira Code:</strong> Still a good choice if you spend most of the day in code and want one font for
            both code and JSON, but its ligatures are not the main reason to choose it for JSON.
          </li>
          <li>
            <strong>Consolas, Menlo, or your platform default coding font:</strong> Often perfectly fine if the glyphs
            are clear on your display and you do not want extra setup.
          </li>
        </ul>
        <p>
          The most reliable test is still your own screen. A font that looks excellent in a screenshot can feel too
          thin, too narrow, or too bright after an hour of inspecting payloads.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <ALargeSmall className="h-6 w-6 text-purple-500" /> Browser and Editor Settings That Help Today
        </h2>
        <p>
          Current tools expose more font control than they used to. That matters if you are reading JSON in a browser,
          a code editor, or your own web-based formatter.
        </p>

        <h3 className="mt-6 text-xl font-semibold">For browser-based JSON viewers</h3>
        <p>
          If you render JSON in a web app, you can improve readability without changing the payload itself. When the
          chosen font supports the features, this CSS is useful:
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          <pre>{`.json-view {
  font-family: "JetBrains Mono", "IBM Plex Mono", "Consolas", monospace;
  font-size: 15px;
  line-height: 1.55;
  font-variant-numeric: slashed-zero tabular-nums;
  font-feature-settings: "zero" 1, "tnum" 1;
}`}</pre>
        </div>
        <p>
          If the font does not support those features, browsers simply fall back to the standard glyphs. That makes the
          rule low risk.
        </p>

        <h3 className="mt-6 text-xl font-semibold">For VS Code and similar editors</h3>
        <p>
          VS Code currently supports <code>editor.fontLigatures</code> and <code>editor.fontVariations</code>. That
          means you can keep ligatures off for JSON if you prefer a plainer view, or use variable-font support when a
          font looks slightly too thin at your normal size.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          <pre>{`{
  "editor.fontFamily": "JetBrains Mono, IBM Plex Mono, Consolas, monospace",
  "editor.fontSize": 15,
  "editor.lineHeight": 24,
  "editor.fontLigatures": false,
  "editor.fontVariations": true,
  "editor.guides.indentation": true,
  "editor.bracketPairColorization.enabled": true
}`}</pre>
        </div>
        <p>
          The exact sweet spot depends on your display. If punctuation looks faint, try a slightly larger size or a
          slightly heavier rendering before abandoning the font.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <MessageSquareCode className="h-6 w-6 text-red-500" /> A Fast 2-Minute JSON Font Test
        </h2>
        <p>Paste a payload like this into your editor or formatter and judge the font on structure first, style second.</p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800">
          <pre>{`{
  "orderId": "O0I1-l1",
  "items": [
    { "sku": "A-101", "qty": 10, "price": 19.99 },
    { "sku": "B-010", "qty": 1, "price": 109.0 }
  ],
  "totals": {
    "subtotal": 308.9,
    "tax": 24.71,
    "grandTotal": 333.61
  }
}`}</pre>
        </div>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Can you separate <code>O</code>, <code>0</code>, <code>I</code>, and <code>l</code> instantly?</li>
          <li>Do braces and brackets stay obvious when you scan the nested block quickly?</li>
          <li>Do commas, decimal points, and quotes remain visible at your normal zoom level?</li>
          <li>After 30 seconds of scanning, does the font still feel relaxed rather than cramped?</li>
        </ul>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <X className="h-6 w-6 text-red-500" /> What to Avoid
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Proportional fonts:</strong> They break indentation and make structure harder to scan.
          </li>
          <li>
            <strong>Very light weights:</strong> Punctuation fades first, which is exactly what JSON depends on.
          </li>
          <li>
            <strong>Condensed monospace fonts:</strong> They fit more text on screen but often feel crowded in nested
            payloads.
          </li>
          <li>
            <strong>Unformatted or minified JSON:</strong> No font can fully rescue a wall of minified text.
          </li>
          <li>
            <strong>Choosing a font for ligatures alone:</strong> JSON readability comes from glyph clarity and spacing,
            not operator prettification.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Settings className="h-6 w-6 text-blue-500" /> Practical Bottom Line
        </h2>
        <p>
          For readable JSON, pick a solid monospace font, increase size until punctuation is effortless to see, use
          comfortable line height, and format the JSON properly. If your tools support it, enable helpful font features
          such as tabular numerals, slashed zero, indentation guides, and bracket pair highlighting.
        </p>
        <p>
          If you want one safe starting point, try JetBrains Mono or IBM Plex Mono at 15px with a line height around
          1.5, keep ligatures off, and compare it against your current setup using the test block above.
        </p>

        <h2 className="mt-8 flex items-center gap-3 text-2xl font-semibold">
          <Code className="h-6 w-6 text-green-500" /> Current References
        </h2>
        <p>
          For current implementation details, see{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric"
            className="text-blue-600 underline underline-offset-4 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            MDN on <code>font-variant-numeric</code>
          </a>
          ,{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings"
            className="text-blue-600 underline underline-offset-4 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            MDN on <code>font-feature-settings</code>
          </a>
          ,{" "}
          <a
            href="https://code.visualstudio.com/updates/v1_74#_font-variations"
            className="text-blue-600 underline underline-offset-4 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            VS Code font variations
          </a>
          ,{" "}
          <a
            href="https://code.visualstudio.com/updates/v1_75#_font-feature-settings-control"
            className="text-blue-600 underline underline-offset-4 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            VS Code font feature settings
          </a>
          ,{" "}
          <a
            href="https://github.com/JetBrains/JetBrainsMono"
            className="text-blue-600 underline underline-offset-4 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            JetBrains Mono
          </a>
          , and{" "}
          <a
            href="https://github.com/tonsky/FiraCode"
            className="text-blue-600 underline underline-offset-4 dark:text-blue-400"
            target="_blank"
            rel="noreferrer"
          >
            Fira Code
          </a>
          .
        </p>
      </div>
    </>
  );
}
