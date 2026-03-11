import type { Metadata } from "next";
import { ZoomIn, ZoomOut, TextSelect, Settings, Accessibility, ListTree, CodeXml, Scaling } from "lucide-react";

export const metadata: Metadata = {
  title: "Text Scaling Support in JSON Editor Interfaces: WCAG, CSS, and Testing | Offline Tools",
  description:
    "Learn how to make JSON editor interfaces work with browser zoom, text resize, OS accessibility scaling, and mobile text inflation without breaking layout or functionality.",
};

export default function TextScalingJsonEditorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        <Scaling className="inline-block mr-2" size={28} />
        Text Scaling Support in JSON Editor Interfaces
      </h1>

      <div className="space-y-6">
        <p>
          A JSON editor does not have real text scaling support just because the page zooms. It supports text scaling
          when the editor stays readable and usable after users enlarge text through browser zoom, text-only resize,
          operating system accessibility settings, or an in-app font control. That matters more in JSON tooling than in
          many other interfaces because the content is dense, structural, and easy to lose once gutters, highlights,
          popovers, and validation messages fall out of alignment.
        </p>
        <p>
          The practical bar is higher than many teams expect. WCAG 2.2 requires text to resize to 200% without loss of
          content or functionality, and related requirements for reflow and text spacing expose many editor-specific
          bugs. On mobile, the CSS <code>text-size-adjust</code> property still only affects text inflation on some
          browsers and is not a universal answer, so durable support still comes from relative sizing, flexible layout,
          and testing at larger scales.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          <Accessibility className="inline-block mr-2" size={24} />
          What Good Support Looks Like
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>The code surface stays legible:</strong> keys, values, punctuation, indentation, and syntax colors
            remain readable at larger sizes without characters colliding or lines becoming impossible to follow.
          </li>
          <li>
            <strong>Supporting UI keeps up:</strong> line numbers, fold toggles, error markers, search boxes, replace
            panels, and formatting buttons remain visible, aligned, and keyboard reachable.
          </li>
          <li>
            <strong>Layout degrades predictably:</strong> side panels wrap or stack, toolbars flow to multiple rows,
            and popovers stay anchored without covering the only actionable controls.
          </li>
          <li>
            <strong>User choice wins:</strong> if the product offers A+ and A- controls, those settings should be easy
            to discover, keyboard operable, and preserved instead of resetting on every visit.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <Settings className="inline-block mr-2" size={24} />
          Current Standards and Browser Reality
        </h2>
        <p>
          The most useful way to reason about text scaling in 2026 is to separate accessibility requirements from
          browser-specific behavior:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              WCAG 2.2 Resize Text (<ZoomIn size={18} className="inline-block mx-1" /> /{" "}
              <ZoomOut size={18} className="inline-block mx-1" />
              ):
            </strong>{" "}
            text should resize up to 200% without assistive technology and without losing content or functionality.
            For editors, that means more than the code area itself. Toolbars, inline errors, dialogs, and settings
            panels must still work.
          </li>
          <li>
            <strong>WCAG 2.2 Reflow:</strong> content should still work at the equivalent of a 320 CSS pixel viewport
            width or 400% zoom, except for regions that genuinely require two-dimensional layout. A code viewport may
            still need horizontal scrolling, but the surrounding UI should not collapse into clipped or unreachable
            controls.
          </li>
          <li>
            <strong>WCAG 2.2 Text Spacing:</strong> users may increase line height, paragraph spacing, word spacing,
            and letter spacing. Editor shells often fail here because badges, chips, and side-by-side controls were
            positioned for one exact line box.
          </li>
          <li>
            <strong>Mobile text inflation:</strong> MDN currently marks <code>text-size-adjust</code> as limited
            availability and experimental. It is useful for managing text inflation on some phones and tablets, but
            many browsers ignore it, so it should be treated as a narrow mobile control rather than the core scaling
            strategy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <ListTree className="inline-block mr-2" size={24} />
          Where JSON Editors Usually Break
        </h2>
        <p>Most broken editor experiences come from a few repeat mistakes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Font size is in pixels, but everything around it is also hard-coded in pixels.</strong> The text
            grows, while the gutter width, row height, icon offsets, and autocomplete panel positions do not.
          </li>
          <li>
            <strong>Line metrics are duplicated in multiple places.</strong> If the editor row is 24px tall, the
            squiggle overlay is 22px tall, and the hit target is 20px tall, scaling quickly breaks alignment.
          </li>
          <li>
            <strong>Long JSON values are treated like regular prose.</strong> They often need scroll behavior, but the
            rest of the screen should still reflow. Putting the entire editor shell inside one giant fixed-width pane is
            where accessibility regressions start.
          </li>
          <li>
            <strong>Toolbars and side panels refuse to wrap.</strong> Search controls, path breadcrumbs, schema hints,
            and action buttons overlap or disappear long before the code surface becomes the real problem.
          </li>
          <li>
            <strong>Scaling is tested only with browser zoom.</strong> Text-only resize, mobile text inflation, and
            operating-system large-text settings often reveal different failures than full-page zoom.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <CodeXml className="inline-block mr-2" size={24} />
          Implementation Pattern That Holds Up
        </h2>
        <p>
          The safest pattern is to define the editor&apos;s font size once, let the code surface inherit from it, and
          size editor-adjacent UI relative to that value. Use a monospace stack for the content area, keep line height
          unitless, and size gutters and indentation with character-based units instead of fixed pixels.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-2">
          <pre className="text-sm overflow-x-auto">
            <code className="language-css">{`
.json-editor {
  --editor-font-size: 1rem;
  --editor-line-height: 1.5;
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  min-height: 0;
}

.json-editor-toolbar {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.json-editor-gutter,
.json-editor-surface {
  font:
    400 var(--editor-font-size) / var(--editor-line-height)
    ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.json-editor-gutter {
  min-width: 4ch;
  padding-inline: 1ch;
}

.json-editor-surface {
  min-width: 0;
  overflow: auto;
  white-space: pre;
  tab-size: 2;
}

.json-editor-popover {
  max-width: min(32rem, 100%);
  font-size: 0.9375rem;
}

.json-editor-button {
  min-height: 2.75rem;
  padding-inline: 0.875rem;
  font-size: 0.9375rem;
}
          `}</code>
          </pre>
        </div>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use <code>rem</code> for general UI and <code>ch</code> where character width matters.</strong>{" "}
            Gutters, indentation, and line-number columns scale more predictably that way.
          </li>
          <li>
            <strong>Keep line height unitless.</strong> It scales with the font, and overlays can derive from the same
            value instead of repeating pixel math in several components.
          </li>
          <li>
            <strong>Wrap controls outside the scrollable code surface.</strong> Long JSON lines can scroll; the search
            bar and action buttons should not need the same horizontal scroll to remain reachable.
          </li>
          <li>
            <strong>Anchor overlays to text metrics, not screenshots of the default state.</strong> Suggestions,
            lint popovers, error underlines, and selection rectangles should all derive from the active line box.
          </li>
          <li>
            <strong>Treat <code>text-size-adjust</code> as optional mobile tuning.</strong> It can help with text
            inflation on some devices, but the editor still needs to work when that property is ignored.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          <TextSelect className="inline-block mr-2" size={24} />
          Testing Checklist for a JSON Editor
        </h2>
        <p>Testing should cover more than a single browser zoom shortcut:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Browser zoom:</strong> check at 200% for WCAG Resize Text and at 400% to catch reflow issues in
            surrounding controls.
          </li>
          <li>
            <strong>Narrow viewports:</strong> simulate roughly 320 CSS pixels of available width and verify that the
            page chrome, toolbar, and settings panels still work even if the code pane itself needs horizontal scroll.
          </li>
          <li>
            <strong>Text-only growth:</strong> test browser text resizing where available, user stylesheet overrides,
            and operating-system large-text settings.
          </li>
          <li>
            <strong>Mobile behavior:</strong> verify real phones or emulation with large text enabled so you can spot
            text inflation issues, clipped dialogs, and tap targets that are now too close together.
          </li>
          <li>
            <strong>Editor-specific cases:</strong> use long keys, very long string values, deep nesting, schema
            errors, autocomplete menus, search and replace panels, and diff or split-view layouts if the product has
            them.
          </li>
          <li>
            <strong>Text spacing overrides:</strong> confirm there is no loss of content or functionality when line
            height, paragraph spacing, letter spacing, and word spacing are increased to WCAG 2.2 test values.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Decision Rule</h2>
        <p>
          If a larger font forces the JSON text itself to use more scrolling, that can be acceptable for a code-like
          interface. If larger text makes controls disappear, overlap, stop lining up with the code, or become
          unreachable by keyboard, the editor does not have good text scaling support yet. The goal is not a perfectly
          identical layout at every size. The goal is a JSON editor that remains understandable, operable, and
          trustworthy when the user needs bigger text.
        </p>
      </div>
    </>
  );
}
