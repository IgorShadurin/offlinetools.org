import type { Metadata } from "next";
import {
  Accessibility,
  Eye,
  Contrast,
  Code,
  ListTree,
  SwatchBook,
  TestTube,
  Lightbulb,
  ClipboardList,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "High Contrast Modes for JSON Editing Interfaces | Offline Tools",
  description:
    "Learn how to implement and design JSON editing interfaces that are accessible and usable in high contrast modes, covering CSS, syntax highlighting, and structural elements.",
};

export default function HighContrastJsonEditorArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Accessibility size={32} />
        <span>High Contrast Modes for JSON Editing Interfaces</span>
      </h1>

      <div className="space-y-6">
        <p>
          Accessibility is a critical aspect of software development, ensuring that applications are usable by people
          with diverse needs and abilities. One important feature for users with low vision, color blindness, or
          cognitive impairments is the ability to use <strong>High Contrast Modes</strong>. When developing rich
          interfaces like JSON editors, which heavily rely on color for syntax highlighting and structural cues,
          supporting high contrast modes becomes particularly important. This article explores how to design and
          implement JSON editing interfaces that work effectively in these modes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Eye size={24} />
          <span>Understanding High Contrast Modes</span>
        </h2>
        <p>
          High Contrast Modes are operating system settings that use a limited color palette with strongly contrasting
          colors to make text and graphics easier to see. These modes are distinct from simply switching to a dark
          theme; they actively override many standard color and styling properties to adhere to the high contrast theme
          defined by the OS.
        </p>
        <p>Users might enable high contrast for various reasons:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reducing eye strain</li>
          <li>Compensating for contrast sensitivity issues</li>
          <li>Improving readability on bright screens or in difficult lighting conditions</li>
          <li>Working with specific visual impairments</li>
        </ul>
        <p>
          It's crucial to understand that in high contrast modes, the user's chosen theme (often based on system colors
          like <code>CanvasText</code>, <code>ButtonFace</code>, <code>Highlight</code>, etc.) takes precedence.
          Websites and applications need to respond appropriately to these system overrides.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Contrast size={24} />
          <span>Why High Contrast Matters for JSON Editors</span>
        </h2>
        <p>
          JSON editors are visual interfaces where syntax highlighting, indentation lines, bracket matching, error
          indicators, and selection cues all rely on visual styling, primarily color and background. In a standard
          theme, distinct colors are used for keys, strings, numbers, booleans, punctuation, etc. However, in high
          contrast mode, many of these carefully chosen colors might be overridden by the system's limited palette,
          potentially making the code unreadable or hiding important information.
        </p>
        <p>If not handled correctly, a high contrast mode could result in:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Syntax elements all appearing the same color.</li>
          <li>Inactive/background elements disappearing entirely.</li>
          <li>Focus indicators becoming invisible.</li>
          <li>Error highlighting becoming indistinguishable from regular text.</li>
          <li>Structural guides (like indentation lines) vanishing.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <SwatchBook size={24} />
          <span>Implementation Strategies: Using CSS Media Queries</span>
        </h2>
        <p>
          The primary tool for adapting web interfaces to high contrast modes is the CSS media query
          <code>@media (forced-colors: active)</code>. This query applies styles only when the user agent (browser) has
          an active forced colors mode, such as Windows High Contrast Mode.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic CSS Example:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`/* Default styles */
.json-key { color: blue; }
.json-string { color: green; }
.json-number { color: orange; }
.editor-focus { outline: 2px solid blue; }

/* High Contrast Styles */
@media (forced-colors: active) {
  /* Use system colors for better integration */
  .json-key, .json-string, .json-number {
    color: CanvasText !important; /* Use system text color */
    /* Rely on font-weight, borders, or other non-color cues */
  }

  /* Ensure focus indicators are visible */
  .editor-focus {
    outline: 3px solid Highlight !important; /* Use system highlight color */
    forced-color-adjust: none; /* Prevent browser from changing this style */
  }

  /* Hide non-essential background images/gradients */
  .editor-background-pattern {
    display: none !important;
  }
}`}
            </pre>
          </div>
        </div>
        <p>Within this media query, you should primarily rely on:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>System Colors:</strong> Utilize CSS system color keywords (<code>CanvasText</code>,
            <code>Canvas</code>, <code>ButtonText</code>, <code>ButtonFace</code>, <code>Highlight</code>,
            <code>HighlightText</code>, <code>GrayText</code>, <code>LinkText</code>, <code>VisitedText</code>, etc.).
            These colors are dynamically set by the user's OS theme.
          </li>
          <li>
            <strong>Non-Color Cues:</strong> Use <code>font-weight</code>, <code>text-decoration</code> (underline,
            overline, line-through),
            <code>border</code>, and <code>outline</code> to convey information normally represented by color.
          </li>
          <li>
            <strong>
              <code>!important</code>:
            </strong>{" "}
            Often necessary within <code>@media (forced-colors: active)</code> rules to override the strong styles
            applied by the OS. Use judiciously.
          </li>
          <li>
            <strong>
              <code>forced-color-adjust: none</code>:
            </strong>{" "}
            Apply this property to elements whose forced-colors appearance you want to explicitly control, preventing
            the browser from making its own adjustments that might interfere with your high contrast styling.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>Adapting Syntax Highlighting</span>
        </h2>
        <p>
          Syntax highlighting is perhaps the most affected part of a JSON editor in high contrast mode. Since colors are
          often overridden, you need alternative ways to distinguish between different token types (keys, strings,
          numbers, booleans, null, punctuation).
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Keys:</strong> Can be bold (<code>font-weight: bold</code>).
          </li>
          <li>
            <strong>Strings:</strong> Can be italic (<code>font-style: italic</code>) or underlined (
            <code>text-decoration: underline</code>).
          </li>
          <li>
            <strong>Numbers/Booleans/Null:</strong> Could use a different font style or perhaps a distinct
            border/outline style if they are wrapped in a container element.
          </li>
          <li>
            <strong>
              Punctuation (<code>&#x7b;</code>, <code>&#x7d;</code>, <code>[</code>, <code>]</code>, <code>:</code>,{" "}
              <code>,</code>):
            </strong>{" "}
            Ensure they use the standard <code>CanvasText</code> color and are not hidden.
          </li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Syntax Highlighting in High Contrast CSS:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`@media (forced-colors: active) {
  /* Reset default colors */
  .json-token {
    color: CanvasText !important;
    background-color: transparent !important;
    text-decoration: none !important;
    font-weight: normal !important;
    font-style: normal !important;
  }

  .json-key {
    font-weight: bold !important;
  }

  .json-string {
    /* Use a subtle text-decoration, avoid complex patterns */
    text-decoration: underline !important;
    text-decoration-thickness: 1px !important;
  }

  .json-number,
  .json-boolean,
  .json-null {
    /* Example: maybe a subtle background or border if feasible */
    /* Or rely only on CanvasText color if differentiation isn't critical */
  }

  /* Ensure comments are styled distinctly but don't interfere */
  .json-comment {
    color: GrayText !important; /* Use the system gray color */
  }
}`}
            </pre>
          </div>
        </div>
        <p>The key is to provide a visual distinction that doesn't rely solely on the overridden color property.</p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListTree size={24} />
          <span>Structural Elements and Navigation</span>
        </h2>
        <p>JSON editors often include visual aids for structure and navigation:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Indentation Lines:</strong> Vertical lines connecting parent/child structure.
          </li>
          <li>
            <strong>Bracket Matching:</strong> Highlighting the matching bracket when one is selected.
          </li>
          <li>
            <strong>Selection/Highlighting:</strong> Indicating the currently selected text or property.
          </li>
          <li>
            <strong>Scrollbars:</strong> Need to be clearly visible and usable.
          </li>
        </ul>
        <p>In high contrast mode:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Indentation Lines:</strong> If implemented with borders or outlines, ensure they use{" "}
            <code>CanvasText</code> or a suitable system color and have sufficient thickness. If using background colors
            or subtle patterns, they might need to be replaced with solid lines.
          </li>
          <li>
            <strong>Bracket Matching:</strong> Instead of just changing the background color of the brackets, add a
            thick border or outline around them using the <code>Highlight</code> system color.
          </li>
          <li>
            <strong>Selection:</strong> The browser's default selection color should usually work, but you can reinforce
            it using <code>::selection</code> pseudoelement within the <code>@media (forced-colors: active)</code>{" "}
            block, ensuring it uses <code>Highlight</code> for background and <code>HighlightText</code> for text color.
            Remember to apply <code>forced-color-adjust: none</code> if styling the selection color explicitly.
          </li>
          <li>
            <strong>Scrollbars:</strong> Often handled by the OS, but custom scrollbar styles might need to be disabled
            or adjusted in high contrast mode using the <code>forced-colors</code> media query and potentially{" "}
            <code>forced-color-adjust: none</code> on the scrollbar elements themselves (though styling scrollbars
            cross-browser in HC is complex).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-space-2">
          <Lightbulb size={24} />
          <span>Tips for Designing for High Contrast</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Don't rely on color alone:</strong> Always provide a second cue (like shape, weight, or text
            decoration) for important information.
          </li>
          <li>
            <strong>Ensure sufficient contrast:</strong> While the OS handles the palette, ensure your chosen system
            colors provide enough contrast against each other where needed.
          </li>
          <li>
            <strong>Use borders for focus/selection:</strong> Borders are often a robust way to indicate state in high
            contrast modes.
          </li>
          <li>
            <strong>Test with different high contrast themes:</strong> Windows High Contrast has different themes (e.g.,
            "High Contrast Black", "High Contrast White", custom). Test your interface with a few common ones if
            possible.
          </li>
          <li>
            <strong>Invisible elements:</strong> Be aware that elements styled with background images, box shadows, or
            subtle background colors might become invisible if not given a discernible foreground color or border in
            high contrast mode.
          </li>
          <li>
            <strong>SVG Icons:</strong> Ensure SVG icons inherit or are explicitly given a fill/stroke color (like{" "}
            <code>CanvasText</code>) rather than relying on default black/white or subtle shades. Use{" "}
            <code>currentcolor</code> if possible.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <TestTube size={24} />
          <span>Testing Your JSON Editor in High Contrast Modes</span>
        </h2>
        <p>
          Testing is essential. Simply enabling high contrast mode on your development machine is the most direct way.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Windows:</strong> Settings &gt; Accessibility &gt; Contrast themes. You can also often toggle it
            with Left <code>Alt</code> + Left <code>Shift</code> + <code>Print Screen</code>.
          </li>
          <li>
            <strong>macOS:</strong> Settings &gt; Accessibility &gt; Display &gt; Increase contrast (this is different
            from Windows HC, more about enhancing existing contrast). A true "Forced Colors" mode is less common or
            implemented differently than on Windows. The <code>forced-colors</code> media query is primarily designed
            for Windows HC.
          </li>
          <li>
            <strong>Browser Emulation:</strong> Browser developer tools (like Chrome's Rendering tab) often have an
            option to emulate "Forced colors". This is useful for quick checks but should not replace testing on the
            actual OS setting.
          </li>
        </ul>
        <p>Check all aspects of the editor:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Can you read all the JSON content?</li>
          <li>Is syntax highlighting still useful (even if different)?</li>
          <li>Are indentation lines visible?</li>
          <li>Does bracket matching work?</li>
          <li>Is the cursor and selection clearly visible?</li>
          <li>Are error/warning indicators clear?</li>
          <li>Can you see and interact with scrollbars, buttons, and other UI elements?</li>
          <li>Is the focus indicator visible when navigating with the keyboard?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Search size={24} />
          <span>Advanced Considerations</span>
        </h2>
        <p>For complex editors, consider:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Pseudo-elements and Generated Content:</strong> Styles applied to <code>::before</code> and{" "}
            <code>::after</code> might need specific adjustments in high contrast.
          </li>
          <li>
            <strong>Background Images and SVGs:</strong> Ensure any background images or SVGs used for icons or
            decorations have sufficient contrast or are hidden if purely decorative and distracting.
          </li>
          <li>
            <strong>Third-party Libraries:</strong> If using a third-party code editor component, check its high
            contrast support. You might need to apply specific overrides using the <code>forced-colors</code> media
            query targeting its internal classes.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ClipboardList size={24} />
          <span>Key Takeaways</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>High contrast modes are critical for many users' accessibility.</li>
          <li>They override standard colors, requiring specific CSS adjustments.</li>
          <li>
            Use <code>@media (forced-colors: active)</code> and system color keywords.
          </li>
          <li>Rely on non-color visual cues (weight, style, borders) for differentiation.</li>
          <li>Ensure focus indicators and essential structural elements remain highly visible.</li>
          <li>Thorough testing in actual OS high contrast modes is indispensable.</li>
        </ul>

        <p>
          By thoughtfully addressing high contrast support, developers can make their JSON editing interfaces
          significantly more accessible and usable for a wider range of users, demonstrating a commitment to inclusive
          design.
        </p>
      </div>
    </>
  );
}
