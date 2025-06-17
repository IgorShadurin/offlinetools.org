import type { Metadata } from "next";
import { Settings, Accessibility, Check, Info, Code, BookOpenText } from "lucide-react";

export const metadata: Metadata = {
  title: "Implementing Accessible JSON Formatter Settings Panels | Offline Tools",
  description:
    "A comprehensive guide on building accessible settings panels for JSON formatters, covering ARIA, keyboard navigation, and semantic HTML.",
};

export default function AccessibleJsonFormatterSettingsArticle() {
  return (
    <article className="container mx-auto py-8 px-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert">
      <header className="flex items-center space-x-4 mb-8">
        <Settings className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl md:text-4xl font-bold">Implementing Accessible JSON Formatter Settings Panels</h1>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Accessibility Matters in Settings Panels</h2>
        <p>
          Settings panels are where users customize their experience. For a JSON formatter, these settings might control
          indentation, sorting, theme, or other display options. If these controls are not accessible, users with
          disabilities might be unable to configure the tool to meet their needs, severely limiting its usability.
        </p>
        <p>
          Accessible design ensures that everyone, including those using screen readers, keyboard navigation, or other
          assistive technologies, can easily understand and interact with your settings.
        </p>
        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mt-4">
          <Accessibility className="w-6 h-6" />
          <span>
            Accessibility isn&apos;t just a feature, it&apos;s a fundamental requirement for inclusive software.
          </span>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Common JSON Formatter Settings</h2>
        <p>A typical JSON formatter might expose settings for:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Indentation Type:</strong> Spaces or Tabs
          </li>
          <li>
            <strong>Indentation Size:</strong> Number of spaces/tabs (e.g., 2, 4)
          </li>
          <li>
            <strong>Key Sorting:</strong> Alphabetical sorting of object keys
          </li>
          <li>
            <strong>Array Formatting:</strong> Inline short arrays, break long arrays
          </li>
          <li>
            <strong>Theme:</strong> Light, Dark, System
          </li>
          <li>
            <strong>Font Size:</strong> Adjust text size
          </li>
        </ul>
        <p>Each of these settings requires an appropriate and accessible input control.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Building Accessible Input Controls</h2>
        <p>
          The foundation of accessible forms lies in using semantic HTML elements correctly and ensuring that every
          input has a clearly associated label.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Text Inputs (e.g., Indentation Size)</h3>
        <p>
          For settings requiring a number or text input, use the standard <code>&lt;input&gt;</code> tag with
          appropriate <code>type</code> and a linked <code>&lt;label&gt;</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Indentation Size</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div&gt;
  &lt;label htmlFor="indent-size" className="block text-sm font-medium text-gray-700 dark:text-gray-200"&gt;
    Indentation Size
  &lt;/label&gt;
  &lt;input
    type="number"
    id="indent-size"
    name="indent-size"
    min="0"
    max="10" // Set reasonable limits
    defaultValue={2} // Use defaultValue as state is not allowed
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    aria-describedby="indent-size-hint"
  /&gt;
  &lt;p id="indent-size-hint" className="mt-2 text-sm text-gray-500 dark:text-gray-400"&gt;
    Number of spaces or tabs for indentation.
  &lt;/p&gt;
&lt;/div&gt;`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-1" />
            <span>
              Using <code>htmlFor</code> on the <code>&lt;label&gt;</code> linked to the <code>id</code> of the{" "}
              <code>&lt;input&gt;</code> is crucial for screen readers. <code>aria-describedby</code> links the input to
              additional descriptive text.
            </span>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Select Menus (e.g., Indentation Type, Theme)</h3>
        <p>
          Use the <code>&lt;select&gt;</code> and <code>&lt;option&gt;</code> elements. Again, a linked{" "}
          <code>&lt;label&gt;</code> is essential.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Indentation Type</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div&gt;
  &lt;label htmlFor="indent-type" className="block text-sm font-medium text-gray-700 dark:text-gray-200"&gt;
    Indentation Type
  &lt;/label&gt;
  &lt;select
    id="indent-type"
    name="indent-type"
    defaultValue="spaces" // Use defaultValue
    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  &gt;
    &lt;option value="spaces"&gt;Spaces&lt;/option&gt;
    &lt;option value="tabs"&gt;Tabs&lt;/option&gt;
  &lt;/select&gt;
&lt;/div&gt;`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-1" />
            <span>
              Native <code>&lt;select&gt;</code> elements are generally well-supported by assistive technologies. Avoid
              building custom dropdowns unless absolutely necessary and ensure they follow ARIA Authoring Practices.
            </span>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">3. Checkboxes (e.g., Key Sorting)</h3>
        <p>
          Use the standard <code>&lt;input type="checkbox"&gt;</code> with a linked <code>&lt;label&gt;</code>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example: Sort Keys</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div className="relative flex items-start"&gt;
  &lt;div className="flex h-6 items-center"&gt;
    &lt;input
      id="sort-keys"
      name="sort-keys"
      type="checkbox"
      defaultChecked={true} // Use defaultChecked
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600"
    /&gt;
  &lt;/div&gt;
  &lt;div className="ml-3 text-sm leading-6"&gt;
    &lt;label htmlFor="sort-keys" className="font-medium text-gray-900 dark:text-gray-100"&gt;
      Sort Object Keys Alphabetically
    &lt;/label&gt;
    &lt;p className="text-gray-500 dark:text-gray-400"&gt;Organize keys in objects for consistent output.&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-1" />
            <span>
              Ensure the clickable area for the checkbox includes the label text. Clicking the label should toggle the
              checkbox.
            </span>
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation and Focus Management</h2>
        <p>
          Keyboard users (including those using screen readers or who cannot use a mouse) must be able to navigate
          through all settings controls using standard keys like Tab, Shift+Tab, Space, and Enter.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Tab Order:</strong> Ensure the logical order of controls in your HTML matches the visual order.
            Native HTML elements handle this correctly by default.
          </li>
          <li>
            <strong>Focus Indicators:</strong> Make sure the browser&apos;s default focus outline (or a custom one with
            sufficient contrast) is clearly visible on the currently focused element.
          </li>
          <li>
            <strong>Interact with Keys:</strong> Checkboxes should toggle with Space. Select menus should open and
            change options with Space, Enter, and Arrow keys. Text inputs should be editable. Native controls provide
            this automatically.
          </li>
        </ul>
        <p>
          Using standard semantic HTML form elements is the best way to get correct keyboard support out-of-the-box.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">ARIA Attributes</h2>
        <p>
          While semantic HTML and labels cover most basic form accessibility, ARIA (Accessible Rich Internet
          Applications) attributes can provide additional context or handle more complex scenarios, such as:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>aria-label</code> / <code>aria-labelledby</code>: Provide an accessible name if a visual label
            isn&apos;t suitable (less common for simple settings).
          </li>
          <li>
            <code>aria-describedby</code>: Link an input to additional descriptive text, hints, or error messages (as
            shown in the text input example).
          </li>
          <li>
            <code>aria-invalid="true"</code>: Indicate that an input&apos;s current value is invalid.
          </li>
          <li>
            <code>aria-hidden="true"</code>: Hide decorative elements from screen readers.
          </li>
        </ul>
        <p className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-300 mt-4">
          <BookOpenText className="w-5 h-5 flex-shrink-0 mt-1" />
          <span>
            <strong>Rule of Thumb:</strong> Use semantic HTML first. Only use ARIA when HTML doesn&apos;t provide the
            necessary semantics or for complex widgets (which settings panels usually aren&apos;t). The ARIA Authoring
            Practices Guide is an excellent resource.
          </span>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Visual Design Considerations</h2>
        <p>Accessibility isn&apos;t just for screen readers; it&apos;s also about visual clarity.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Color Contrast:</strong> Ensure sufficient contrast between text and background for labels, input
            values, and helper text. Use WCAG 2.1 guidelines (AA or AAA level).
          </li>
          <li>
            <strong>Font Size and Spacing:</strong> Use readable font sizes (at least 16px for body text is a good
            baseline) and provide adequate spacing between form elements.
          </li>
          <li>
            <strong>Error Indication:</strong> Clearly indicate validation errors visually (e.g., red border) and
            programmatically (e.g., using <code>aria-invalid</code> and associating an error message via{" "}
            <code>aria-describedby</code>).
          </li>
          <li>
            <strong>Responsiveness:</strong> Settings panels should be usable on different screen sizes.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Putting It Together (Static Example)</h2>
        <p>
          Here&apos;s a simplified, static representation of how a collection of accessible settings controls might be
          structured in TSX. Remember, this example uses <code>defaultValue</code> and <code>defaultChecked</code>{" "}
          because state management (`useState`) is not allowed in this context. A real application would manage these
          values dynamically.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Static Settings Panel Structure</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`&lt;div className="space-y-6"&gt;
  {/* Indentation Type */}
  &lt;div&gt;
    &lt;label htmlFor="indent-type-static" className="block text-sm font-medium text-gray-700 dark:text-gray-200"&gt;
      Indentation Type
    &lt;/label&gt;
    &lt;select
      id="indent-type-static"
      name="indent-type-static"
      defaultValue="spaces"
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    &gt;
      &lt;option value="spaces"&gt;Spaces&lt;/option&gt;
      &lt;option value="tabs"&gt;Tabs&lt;/option&gt;
    &lt;/select&gt;
  &lt;/div&gt;

  {/* Indentation Size */}
  &lt;div&gt;
    &lt;label htmlFor="indent-size-static" className="block text-sm font-medium text-gray-700 dark:text-gray-200"&gt;
      Indentation Size
    &lt;/label&gt;
    &lt;input
      type="number"
      id="indent-size-static"
      name="indent-size-static"
      min="0"
      max="10"
      defaultValue={2}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      aria-describedby="indent-size-static-hint"
    /&gt;
    &lt;p id="indent-size-static-hint" className="mt-2 text-sm text-gray-500 dark:text-gray-400"&gt;
      Number of spaces or tabs.
    &lt;/p&gt;
  &lt;/div&gt;

  {/* Sort Keys */}
  &lt;div className="relative flex items-start"&gt;
    &lt;div className="flex h-6 items-center"&gt;
      &lt;input
        id="sort-keys-static"
        name="sort-keys-static"
        type="checkbox"
        defaultChecked={true}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600"
      /&gt;
    &lt;/div&gt;
    &lt;div className="ml-3 text-sm leading-6"&gt;
      &lt;label htmlFor="sort-keys-static" className="font-medium text-gray-900 dark:text-gray-100"&gt;
        Sort Object Keys Alphabetically
      &lt;/label&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  {/* Example of another setting */}
  &lt;div&gt;
    &lt;label htmlFor="theme-static" className="block text-sm font-medium text-gray-700 dark:text-gray-200"&gt;
      Application Theme
    &lt;/label&gt;
    &lt;select
      id="theme-static"
      name="theme-static"
      defaultValue="system"
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    &gt;
      &lt;option value="light"&gt;Light&lt;/option&gt;
      &lt;option value="dark"&gt;Dark&lt;/option&gt;
      &lt;option value="system"&gt;System&lt;/option&gt;
    &lt;/select&gt;
  &lt;/div&gt;

&lt;/div&gt;`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 flex items-start space-x-2">
            <Code className="w-4 h-4 flex-shrink-0 mt-1" />
            <span>
              Notice the use of unique <code>id</code> attributes for each input, linked via <code>htmlFor</code> in the
              corresponding <code>&lt;label&gt;</code>. This is the cornerstone of accessible form controls.
            </span>
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Testing Accessibility</h2>
        <p>Building accessible interfaces requires testing.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Keyboard Test:</strong> Can you navigate through all settings using only the Tab and Shift+Tab keys?
            Can you interact with each control (change values, check boxes) using Space, Enter, and Arrow keys?
          </li>
          <li>
            <strong>Screen Reader Test:</strong> Use a screen reader (like VoiceOver on macOS, NVDA or JAWS on Windows,
            or TalkBack on Android) to navigate the panel. Do labels correctly announce the purpose of each control? Is
            helper text read out?
          </li>
          <li>
            <strong>Automated Tools:</strong> Use browser extensions (Axe DevTools, WAVE) or build tools
            (eslint-plugin-jsx-a11y) to catch common accessibility issues.
          </li>
          <li>
            <strong>Color Contrast Analyzers:</strong> Verify sufficient color contrast.
          </li>
        </ul>
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 mt-4">
          <Check className="w-6 h-6" />
          <span>Regular testing is key to ensuring and maintaining accessibility.</span>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p>
          Implementing accessible settings panels for your JSON formatter is a crucial step towards creating an
          inclusive and user-friendly tool. By focusing on semantic HTML, correct labeling, keyboard navigation, and
          thoughtful visual design, you can ensure that all users, regardless of their abilities, can easily configure
          the formatter to suit their needs. Start with the basics: a linked <code>&lt;label&gt;</code> for every input,
          and build from there.
        </p>
      </section>
    </article>
  );
}
