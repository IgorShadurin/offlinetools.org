import type { Metadata } from "next";
import {
  Keyboard,
  Eye,
  Contrast,
  TextCursor, // Changed from CursorText
  ZoomIn,
  Accessibility,
  AlertCircle,
  Code,
  TestTube,
} from "lucide-react";
import React from "react"; // Explicitly import React

export const metadata: Metadata = {
  title: "Evaluating Accessibility Features in JSON Formatting Tools | Offline Tools",
  description:
    "Explore the importance of accessibility in developer tools and learn what features to look for in JSON formatters to ensure they are usable by everyone.",
};

export default function AccessibilityJsonFormattersArticle() {
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Evaluating Accessibility Features in JSON Formatting Tools
      </h1>

      <section className="space-y-6 mb-8">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format used across web development, APIs,
          configuration files, and more. As developers, we frequently interact with JSON data, often using
          formatting or "prettifying" tools to make it more readable and manageable, especially for large or
          complex structures.
        </p>
        <p>
          While we focus on the speed and accuracy of these tools, it's crucial not to overlook their
          <strong>accessibility</strong>. Accessible developer tools ensure that developers of all abilities,
          including those using assistive technologies like screen readers, keyboard-only navigation, or
          requiring high contrast, can effectively perform their tasks.
        </p>
        <p>
          This page explores the key accessibility features to consider when choosing or building JSON
          formatting tools and why they matter.
        </p>
      </section>

      <section className="space-y-6 mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Eye className="mr-3 text-blue-500" size={28} />
          Why Accessibility in Developer Tools?
        </h2>
        <p>
          Development teams are increasingly diverse. Ensuring that the tools we use are accessible promotes
          an inclusive environment and allows everyone to contribute effectively. Accessibility isn't just
          about compliance; it's about usability for a broader range of users, which ultimately benefits
          everyone. A tool that's easy to navigate with a keyboard is often faster for power users too.
        </p>
      </section>

      <section className="space-y-6 mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Accessibility className="mr-3 text-green-500" size={28} />
          Key Accessibility Features in JSON Formatters
        </h2>
        <p>When evaluating a JSON formatter, consider the following features:</p>

        <div className="space-y-6">
          {/* Keyboard Navigation */}
          <div className="flex items-start">
            <Keyboard className="flex-shrink-0 mr-4 mt-1 text-purple-500" size={24} />
            <div>
              <h3 className="text-xl font-semibold">Keyboard Navigation</h3>
              <p>
                Can the tool be used entirely without a mouse? This includes navigating between input fields,
                buttons (like "Format", "Copy", "Download"), options, and even interacting with the formatted output itself (if it's an editor).
                Ensure standard keyboard shortcuts (Tab, Shift+Tab, Enter, Space) work as expected.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Essential for users who cannot use a mouse, and improves efficiency for many others.
              </p>
            </div>
          </div>

          {/* Screen Reader Compatibility */}
          <div className="flex items-start">
            <TextCursor className="flex-shrink-0 mr-4 mt-1 text-teal-500" size={24} />
            <div>
              <h3 className="text-xl font-semibold">Screen Reader Compatibility</h3>
              <p>
                Is the tool understandable when read aloud by a screen reader like JAWS, NVDA, or VoiceOver?
                Elements should have appropriate roles, states, and labels (using ARIA attributes like
                <code>aria-label</code>, <code>aria-describedby</code>, <code>role</code>). Input areas
                and buttons should be clearly identifiable. Changes in the UI (like displaying error messages)
                should be announced.
              </p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 text-sm my-2">
                <h4 className="font-medium mb-1">Example: Button with ARIA Label</h4>
                <pre className="overflow-x-auto text-xs">
                  {`<button aria-label="Format JSON" onClick={handleFormat}>
  <Code className="inline-block mr-1" size={14} />
  Format
</button>`}
                </pre>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Critical for visually impaired developers using screen readers to navigate interfaces.
              </p>
            </div>
          </div>

          {/* High Contrast/Color Themes */}
          <div className="flex items-start">
            <Contrast className="flex-shrink-0 mr-4 mt-1 text-orange-500" size={24} />
            <div>
              <h3 className="text-xl font-semibold">High Contrast Modes and Color Themes</h3>
              <p>
                Does the tool support high contrast modes provided by operating systems? Does it offer
                distinct, accessible color themes (e.g., dark mode, light mode) with sufficient color
                contrast ratios (WCAG guidelines recommend 4.5:1 for normal text)? Syntax highlighting
                in the output should use color combinations that are perceivable by individuals with
                various forms of color blindness.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Benefits users with low vision, color blindness, or those working in bright/dim environments.
              </p>
            </div>
          </div>

          {/* Focus Indicators */}
          <div className="flex items-start">
            <Eye className="flex-shrink-0 mr-4 mt-1 text-red-500" size={24} />
            <div>
              <h3 className="text-xl font-semibold">Clear Focus Indicators</h3>
              <p>
                When navigating with a keyboard, is there a visible indicator showing which element currently
                has focus? This is often a colored outline around the element. This indicator should be
                prominent and clearly visible against the background.
              </p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 text-sm my-2">
                <h4 className="font-medium mb-1">Example: CSS Focus State</h4>
                <p>Ensure your CSS framework or custom styles don't remove the default <code>outline</code> or provide a clear alternative.</p>
                <pre className="overflow-x-auto text-xs">
                  {`/* Avoid */
:focus { outline: none; }

/* Better: Provide a visible outline */
:focus { outline: 2px solid blue; outline-offset: 2px; }`}
                </pre>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Essential for keyboard users to know where they are on the page or in the application.
              </p>
            </div>
          </div>

          {/* Zoom/Text Resizing */}
          <div className="flex items-start">
            <ZoomIn className="flex-shrink-0 mr-4 mt-1 text-indigo-500" size={24} />
            <div>
              <h3 className="text-xl font-semibold">Support for Browser Zoom and Text Resizing</h3>
              <p>
                Does the layout remain functional and readable when the browser's zoom level is increased (e.g., up to 200%)?
                Does the tool respect system-level text size settings? This ensures that content doesn't overlap or become unreadable when scaled.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Helps users with low vision who need larger text or UI elements.
              </p>
            </div>
          </div>

          {/* Accessible Error Reporting */}
          <div className="flex items-start">
            <AlertCircle className="flex-shrink-0 mr-4 mt-1 text-red-600" size={24} />
            <div>
              <h3 className="text-xl font-semibold">Accessible Error Reporting</h3>
              <p>
                When the input JSON is invalid, is the error message clear, specific, and presented in a way
                that is accessible? Error messages should ideally indicate the location of the error (line
                and column number). For screen reader users, the error message should be announced or
                easily discoverable. Using <code>aria-live</code> regions can help announce dynamic errors.
              </p>
              <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 text-sm my-2">
                <h4 className="font-medium mb-1">Example: Live Region for Errors</h4>
                <pre className="overflow-x-auto text-xs">
                  {`<div role="alert" aria-live="assertive" className="text-red-500">
  {errorMessage} {/* Content updated dynamically */}
</div>`}
                </pre>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Helps all users, especially those using assistive tech, understand and fix parsing issues.
              </p>
            </div>
          </div>

           {/* Configurable Output */}
           <div className="flex items-start">
            <Code className="flex-shrink-0 mr-4 mt-1 text-blue-600" size={24} />
            <div>
              <h3 className="text-xl font-semibold">Configurable Output</h3>
              <p>
                While not strictly an "accessibility" feature in the traditional sense, allowing users to
                customize indentation levels, line wrapping, and sorting can significantly improve readability
                and usability for different cognitive needs and preferences.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <em>Why it matters:</em> Improves cognitive load and readability based on personal preference or specific task requirements.
              </p>
            </div>
          </div>

        </div> {/* End of Key Features space-y-6 */}
      </section>

      <section className="space-y-6 mb-8">
        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <TestTube className="mr-3 text-yellow-500" size={28} />
          Testing Accessibility
        </h2>
        <p>
          How can you test if a JSON formatter (or any tool) is accessible?
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Keyboard Test:</strong> Unplug or stop using your mouse. Try to perform all tasks (pasting JSON, formatting, copying, changing settings) using only your keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys). Can you see where you are (focus indicator)?
          </li>
          <li>
            <strong>Screen Reader Test:</strong> Use a screen reader (like NVDA on Windows, VoiceOver on macOS/iOS, TalkBack on Android, or browser extensions like ChromeVox). Navigate the tool. Is the purpose of interactive elements clear? Can you access all information?
          </li>
          <li>
            <strong>Color Contrast Check:</strong> Use browser developer tools or online checkers to analyze color contrast ratios, especially for text and interactive elements. Simulate color vision deficiencies using browser extensions.
          </li>
          <li>
            <strong>Zoom Test:</strong> Zoom your browser to 200%. Does the layout break? Can you still access all controls?
          </li>
          <li>
            <strong>Automated Tools:</strong> Use browser extensions like Axe DevTools or Lighthouse audits (in Chrome DevTools) to catch common accessibility issues.
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
          <Accessibility className="mr-3 text-green-500" size={28} />
          Conclusion
        </h2>
        <p>
          Accessibility in developer tools is not a niche concern; it's a fundamental aspect of creating
          inclusive and efficient workflows. When choosing or building JSON formatting tools, consider the
          features discussed above. A tool that is keyboard-friendly, screen-reader compatible, visually
          adaptable, and provides clear, accessible feedback benefits not only developers with disabilities
          but enhances the user experience for everyone.
        </p>
        <p>
          By prioritizing accessibility, we build better tools and foster a more inclusive development community.
        </p>
      </section>
    </article>
  );
}