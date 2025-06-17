import type { Metadata } from "next";
import { Accessibility, Eye, Monitor, Keyboard, Bug, Search, Palette } from "lucide-react"; // Import allowed icons

export const metadata: Metadata = {
  title: "Mobile Accessibility Guidelines for JSON Viewing Apps",
  description:
    "Learn how to make JSON viewing applications accessible on mobile devices, covering visual presentation, navigation, and assistive technologies.",
};

export default function MobileAccessibilityJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Accessibility size={32} /> Mobile Accessibility Guidelines for JSON Viewing Apps
      </h1>

      <div className="space-y-6">
        <p>
          Building mobile applications that display structured data like JSON can be challenging. Ensuring these apps
          are accessible to everyone, including users with disabilities, is crucial. This guide outlines key
          accessibility considerations specifically for mobile JSON viewing applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Eye size={24} /> Content Presentation and Visuals
        </h2>
        <p>
          How JSON data is displayed is fundamental to accessibility. Raw JSON can be difficult to parse visually,
          especially for users with cognitive disabilities, low vision, or dyslexia.
        </p>

        <h3 className="text-xl font-semibold mt-6">Syntax Highlighting and Formatting</h3>
        <p>
          Applying syntax highlighting (coloring keys, values, primitives) makes the structure much easier to understand
          at a glance. This should be implemented with sufficient color contrast.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Color Contrast:</strong> Ensure text and background colors meet WCAG AA or AAA contrast ratios. This
            is vital for users with low vision or color vision deficiencies. Provide theme options (light/dark mode)
            which often improves contrast choices.
          </li>
          <li>
            <strong>Syntax Colors:</strong> Use distinct colors for different JSON elements (keys, strings, numbers,
            booleans, null). These colors should also have good contrast against the background. Avoid relying *solely*
            on color to convey meaning.
          </li>
          <li>
            <strong>Formatting:</strong> Allow users to toggle between compact and pretty-printed (indented) JSON.
            Pretty-printing significantly improves readability.
          </li>
          <li>
            <strong>Line Wrapping:</strong> Long JSON lines that scroll horizontally are frustrating. Provide an option
            to wrap lines.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Font Size and Readability</h3>
        <p>
          Allow users to adjust the font size. Do not disable system font scaling. JSON keys and values can be lengthy,
          and providing larger text options is essential for readability.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Scalable Text:</strong> Use scalable units (like `sp` or `dp` on Android, dynamic type on iOS) for
            font sizes.
          </li>
          <li>
            <strong>Readable Font:</strong> Choose a clear, readable font. Monospace fonts are common for code but
            ensure they are accessible and support readability features like distinct &quot;l&quot;, &quot;1&quot;, and
            &quot;I&quot;.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Monitor size={24} /> Navigation and Interaction
        </h2>
        <p>Navigating complex, nested JSON structures on a small mobile screen requires careful design.</p>

        <h3 className="text-xl font-semibold mt-6">Collapsible Nodes</h3>
        <p>Implementing collapsible/expandable nodes (objects and arrays) is crucial for managing complexity.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Clear Indicators:</strong> Use clear visual indicators (like arrows or plus/minus signs) for
            collapsible elements. Ensure these indicators are part of the touch target and are accessible to screen
            readers.
          </li>
          <li>
            <strong>State Persistence:</strong> Ideally, remember the collapse state when navigating back, or provide
            options to expand/collapse all nodes.
          </li>
          <li>
            <strong>Accessible Labels:</strong> The interactive element (the arrow or area to tap) should have an
            accessible label describing its state, e.g., &quot;Expand object&quot;, &quot;Collapse array&quot;.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Touch Target Size</h3>
        <p>
          Interactive elements, especially the tiny arrows or icons used for collapsing, must have sufficiently large
          touch targets (at least 44x44 CSS pixels).
        </p>

        <h3 className="text-xl font-semibold mt-6">Gestures</h3>
        <p>
          While gestures like pinching to zoom can be helpful for viewing very large structures, ensure that essential
          interactions (like expanding/collapsing) are also available via standard taps. Not all users can perform
          complex gestures reliably.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Keyboard size={24} /> Keyboard Navigation and Assistive Technologies
        </h2>
        <p>
          Many mobile users, particularly those with motor impairments or using external keyboards, rely on keyboard
          navigation. Screen reader users rely on proper semantic structure and labels.
        </p>

        <h3 className="text-xl font-semibold mt-6">Screen Reader Support</h3>
        <p>
          The structure of the JSON viewer needs to be understandable by screen readers (VoiceOver on iOS, TalkBack on
          Android).
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Semantic Elements:</strong> Use semantic HTML elements if the app uses web views, or the equivalent
            native components with accessibility properties. For example, treat collapsible nodes like disclosure
            widgets.
          </li>
          <li>
            <strong>Labels and Roles:</strong> Provide meaningful labels for all interactive elements. Clearly indicate
            the role of elements (e.g., &quot;object&quot;, &quot;array&quot;, &quot;string key&quot;, &quot;number
            value&quot;).
          </li>
          <li>
            <strong>State Announcement:</strong> When a node is expanded or collapsed, the screen reader should announce
            the change in state (e.g., &quot;object collapsed&quot;, &quot;array expanded, 5 items&quot;).
          </li>
          <li>
            <strong>Content Description:</strong> For complex values (like nested objects/arrays), provide a concise
            description for the screen reader initially, allowing the user to expand for details. E.g., instead of
            reading out the entire nested structure, say &quot;object, collapsed, 7 keys&quot;.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Keyboard Navigation</h3>
        <p>Ensure users can navigate through the JSON structure using standard keyboard commands (Tab, Arrow keys).</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Focus Management:</strong> Clearly indicate the currently focused element. Ensure focus order is
            logical (e.g., traverse keys and values sequentially, or allow moving into/out of collapsed nodes).
          </li>
          <li>
            <strong>Interactive Elements:</strong> Collapsible indicators and any other interactive elements must be
            reachable via keyboard focus and activatable using Enter/Space.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Magnification and Reflow</h3>
        <p>
          Users may use system-level screen magnification. The layout should reflow gracefully when zoomed, avoiding
          excessive horizontal scrolling. Line wrapping is crucial here.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Search size={24} /> Search and Interaction Aids
        </h2>
        <p>Searching within JSON is a key feature, and it needs to be accessible.</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Visible Search Input:</strong> The search bar should be easily located.
          </li>
          <li>
            <strong>Accessible Search Results:</strong> When search results are highlighted, the highlighting should
            have good contrast. Provide controls to navigate between results (e.g., &quot;Next&quot;,
            &quot;Previous&quot;), which should be keyboard and screen reader accessible.
          </li>
          <li>
            <strong>Error Reporting:</strong> If the user enters invalid search syntax or the search fails, provide
            clear, accessible error messages.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Palette size={24} /> Customization Options
        </h2>
        <p>
          Allowing users to customize the viewing experience can significantly improve accessibility for various needs.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Theme Selection:</strong> Provide light, dark, and potentially high-contrast themes.
          </li>
          <li>
            <strong>Font Preferences:</strong> As mentioned, font size control is key. Allowing users to select specific
            accessible fonts could be beneficial.
          </li>
          <li>
            <strong>Indentation Level:</strong> Allow users to choose the indentation size for pretty-printed JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug size={24} /> Testing for Accessibility
        </h2>
        <p>
          Accessibility is not a feature you add at the end; it must be considered throughout development and tested
          thoroughly.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Manual Testing:</strong> Test the app using system accessibility features:
            <ul className="list-circle pl-6 my-2">
              <li>Enable Screen Reader (VoiceOver/TalkBack) and try to navigate and understand the JSON structure.</li>
              <li>Use system font scaling and magnification features.</li>
              <li>Test with an external keyboard.</li>
            </ul>
          </li>
          <li>
            <strong>Automated Tools:</strong> Use available accessibility scanners for mobile platforms (e.g.,
            Accessibility Scanner for Android, Accessibility Inspector for iOS) to catch common issues like low contrast
            and missing labels.
          </li>
          <li>
            <strong>User Testing:</strong> Ideally, involve users with disabilities in your testing process.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          Making a mobile JSON viewer accessible requires attention to detail in visual design, interaction patterns,
          and compatibility with assistive technologies. By focusing on clear presentation, flexible navigation, and
          robust support for screen readers and keyboard navigation, developers can create applications that are usable
          and helpful for a much wider audience. Prioritizing accessibility from the start leads to better design for
          all users.
        </p>
      </div>
    </>
  );
}
