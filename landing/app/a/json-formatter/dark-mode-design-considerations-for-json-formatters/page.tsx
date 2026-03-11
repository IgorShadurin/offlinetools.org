import type { Metadata } from "next";
import { Palette, SunMoon, Code, Accessibility, Target, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Dark Mode Design Considerations for JSON Formatters | Offline Tools",
  description:
    "Design a JSON formatter dark mode that respects system theme, keeps syntax readable, meets accessibility targets, and still works in high-contrast environments.",
};

export default function DarkModeJsonFormatterArticle() {
  const themeSnippet = `:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --surface: #f6f8fb;
  --text: #16202a;
  --muted: #5b6673;
  --key: #0f5bd8;
  --string: #9a4d00;
  --number: #0e7a4b;
  --literal: #7b3fe4;
  --error: #c62828;
  --selection: rgba(15, 91, 216, 0.16);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111418;
    --surface: #171c22;
    --text: #e6edf3;
    --muted: #9aa6b2;
    --key: #7cc7ff;
    --string: #ffb86b;
    --number: #8bd8a8;
    --literal: #c2a6ff;
    --error: #ff7b72;
    --selection: rgba(124, 199, 255, 0.22);
  }
}

[data-theme="light"] { color-scheme: light; }
[data-theme="dark"] { color-scheme: dark; }`;

  const accessibilitySnippet = `@media (prefers-contrast: more) {
  .json-editor {
    border-color: currentColor;
  }

  .token-punctuation,
  .line-numbers {
    color: var(--text);
  }

  :focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

@media (forced-colors: active) {
  .json-editor {
    background: Canvas;
    color: CanvasText;
    border: 1px solid CanvasText;
  }

  .token-error {
    color: Mark;
    text-decoration: underline;
  }
}`;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dark Mode Design Considerations for JSON Formatters</h1>

      <div className="space-y-8">
        <p>
          A good dark mode for a JSON formatter should do more than swap a white background for a black one. It
          should follow the user&apos;s system theme, keep keys and values easy to scan, preserve contrast for long
          reading sessions, and stay usable when someone enables higher-contrast or forced-color settings.
        </p>
        <p>
          That matters more in a formatter than in a typical marketing page. Users stare at nested braces, repeated
          keys, validation errors, selection highlights, and line-based diffs for long stretches. If the theme is too
          dim, too saturated, or inconsistent across states, dark mode quickly becomes harder to use than light mode.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950/40">
          <h2 className="text-lg font-semibold">What search users usually need from this topic</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>How to make a JSON formatter follow system dark mode without trapping users in one theme.</li>
            <li>Which syntax colors still work on dark backgrounds for keys, strings, numbers, booleans, and errors.</li>
            <li>What accessibility rules still apply in dark mode, especially for contrast and focus states.</li>
            <li>How to test the theme against real formatter states such as invalid JSON, search matches, and large files.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <SunMoon className="w-6 h-6" /> <span>Start with system theme support</span>
        </h2>
        <p>
          Current browsers support system-theme detection with <code>prefers-color-scheme</code>, and the companion{" "}
          <code>color-scheme</code> property tells the browser that your editor shell can render correctly in light and
          dark themes. That second piece matters because browser UI such as scrollbars, form controls, and other
          built-in surfaces can otherwise stay visually out of sync with your editor.
        </p>
        <p>
          The practical pattern is simple: default to the system preference, then let the user explicitly switch to
          light or dark mode and persist that override. For a formatter, this avoids the common failure where the code
          pane is dark but the textarea, dropdowns, or scrollbars are still light.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Recommended theme foundation</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">{themeSnippet}</pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Use semantic tokens first, then override them for dark mode and explicit user theme choices.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Palette className="w-6 h-6" /> <span>Build a restrained palette, not a dramatic one</span>
        </h2>
        <p>
          The fastest way to make a dark JSON formatter feel cheap is to use pure black backgrounds, pure white text,
          and overly bright syntax colors. A restrained palette is easier to scan for long periods and produces less
          visual vibration between adjacent tokens.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use a dark charcoal or deep slate background instead of <code>#000000</code>.
          </li>
          <li>
            Keep primary text slightly off-white so punctuation, braces, and commas do not glow.
          </li>
          <li>
            Reserve the brightest colors for the information users search for first, usually keys, active matches, and
            validation errors.
          </li>
          <li>
            Keep line numbers, indent guides, and secondary labels quieter than JSON content, but not so faint that
            they disappear on lower-quality displays.
          </li>
        </ul>
        <p>
          If the formatter also shows a tree view, table view, or side-by-side diff, reuse the same semantic color
          tokens there. Dark mode feels much more reliable when the key color in the editor matches the key color in a
          collapsed tree node or inspector panel.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" /> <span>Design syntax highlighting for JSON specifically</span>
        </h2>
        <p>
          Generic code themes are often a poor fit for JSON because JSON has a smaller token set and much heavier
          repetition. The challenge is not language breadth, it is scanability across deeply nested structures.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Keys:</strong> Give property names the strongest structural color because users visually jump from
            key to key when tracing objects.
          </li>
          <li>
            <strong>Strings:</strong> Keep them distinct from keys even when both are quoted; the difference should be
            obvious at a glance.
          </li>
          <li>
            <strong>Numbers and literals:</strong> Use separate hues for numbers and for <code>true</code>,{" "}
            <code>false</code>, and <code>null</code> so type mistakes are easy to spot.
          </li>
          <li>
            <strong>Punctuation:</strong> Braces, brackets, commas, and colons should be readable but lower-emphasis
            than content tokens.
          </li>
          <li>
            <strong>Invalid regions:</strong> Do not rely on red text alone. Add underline, gutter markers, or inline
            messages so the error still stands out in low-saturation or forced-color environments.
          </li>
        </ul>
        <p>
          Also think about states that are specific to formatters, not just editors: current line, hovered row,
          selected text, search results, copied state, folded nodes, and diff inserts or removals. Those states should
          remain distinguishable from normal syntax coloring.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Accessibility className="w-6 h-6" /> <span>Treat accessibility as part of the theme</span>
        </h2>
        <p>
          Dark mode does not relax accessibility requirements. WCAG contrast rules still apply, and in practice dark
          themes often need more deliberate testing because low-contrast text can look acceptable to the author on a
          calibrated display while becoming muddy on an ordinary laptop.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Keep normal-size text at least <strong>4.5:1</strong> against its background and large text at least{" "}
            <strong>3:1</strong>.
          </li>
          <li>
            Make keyboard focus impossible to miss. A visible outline of about <strong>2px</strong> with a strong
            color change is a safer choice than a subtle glow on a dark surface.
          </li>
          <li>
            If your formatter has sticky headers, toolbars, or error banners, keyboard focus should remain visible and
            not slide under those layers.
          </li>
          <li>
            Do not remove browser focus styles unless you replace them with something stronger.
          </li>
        </ul>
        <p>
          Modern platforms also expose user preferences beyond light or dark mode. A formatter should respond cleanly
          when users request more contrast, and it should degrade safely in forced-colors mode rather than fighting the
          system palette.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Accessibility fallback example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre className="text-sm">{accessibilitySnippet}</pre>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Higher-contrast and forced-color users should get clearer outlines and a readable fallback, not a broken theme.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Target className="w-6 h-6" /> <span>Handle the states users actually hit in a formatter</span>
        </h2>
        <p>
          Many dark-mode articles stop at background and token colors. That is not enough for a JSON formatter because
          real sessions involve validation, navigation, and utility actions.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Selection:</strong> The selection color has to preserve legibility for both keys and values. Avoid
            opaque fills that wipe out syntax meaning.
          </li>
          <li>
            <strong>Search:</strong> Active and inactive matches need distinct colors, especially on large documents.
          </li>
          <li>
            <strong>Errors and warnings:</strong> Validation states should be visually separate from normal syntax colors
            and from search highlighting.
          </li>
          <li>
            <strong>Buttons and inputs:</strong> Copy, format, minify, validate, and download controls need hover,
            active, disabled, and focus states that are all visible on dark surfaces.
          </li>
          <li>
            <strong>Scroll position:</strong> Long JSON files make scrollbar visibility and current-location cues more
            important than in ordinary text areas.
          </li>
        </ul>
        <p>
          If the product includes an inline diff, be especially careful with red and green on dark backgrounds. Those
          colors often pass a quick visual test but are hard to distinguish for some users, so pair them with icons,
          labels, or stronger background patterns.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Layers className="w-6 h-6" /> <span>Quick QA checklist before you ship</span>
        </h2>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Switch the operating system between light and dark mode and confirm the formatter follows it by default.</li>
          <li>Toggle an explicit in-app theme override and verify that it wins over the system preference.</li>
          <li>Test valid, invalid, minified, and deeply nested JSON so token colors and error states all remain readable.</li>
          <li>Tab through every interactive element and check that focus is still obvious on the darkest surface.</li>
          <li>Check selected text, search matches, diff states, copied-state toasts, and disabled buttons.</li>
          <li>Enable higher-contrast or forced-color settings and confirm the app stays usable without custom shadows.</li>
          <li>Open the page on desktop and mobile widths so line numbers, wrapping, and toolbars do not collapse into noise.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The best dark mode for a JSON formatter feels quiet, predictable, and structurally clear. It respects system
          theme settings, keeps token meaning obvious, preserves accessible contrast, and still works when the user
          needs more contrast than your default palette provides. If you design for those conditions first, dark mode
          becomes a real usability feature instead of a visual checkbox.
        </p>
      </div>
    </>
  );
}
