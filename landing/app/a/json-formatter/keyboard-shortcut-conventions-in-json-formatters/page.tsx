import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard Shortcut Conventions in JSON Formatters | Offline Tools",
  description:
    "Explore common keyboard shortcut conventions used in JSON formatters to enhance efficiency and workflow.",
};

export default function KeyboardShortcutConventionsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Keyboard Shortcut Conventions in JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          Efficiently navigating and manipulating JSON data is crucial for developers, data analysts, and anyone
          working with APIs or configuration files. While mouse interactions are intuitive, mastering keyboard
          shortcuts in your favorite JSON formatter can significantly speed up your workflow. This article explores
          common keyboard shortcut conventions you&apos;ll likely find across various JSON tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Why Learn JSON Formatter Shortcuts?
        </h2>
        <p>
          Keyboard shortcuts offer several benefits when working with JSON:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Speed:</span> Perform actions much faster than reaching for the mouse.
          </li>
          <li>
            <span className="font-medium">Efficiency:</span> Keep your hands on the keyboard, minimizing context
            switching.
          </li>
          <li>
            <span className="font-medium">Ergonomics:</span> Reduce repetitive strain from mouse usage.
          </li>
          <li>
            <span className="font-medium">Consistency:</span> Many shortcuts follow conventions found in other code
            editors.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">
          Common Shortcut Categories and Examples
        </h2>
        <p>
          JSON formatters often adopt standard text editor shortcut conventions, while also including some specific
          to data manipulation. Here are common categories:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Basic Editing & File Operations</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Action
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Windows/Linux
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  macOS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Save
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + S</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + S</code>
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Copy
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + C</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + C</code>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Paste
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + V</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + V</code>
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Cut
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + X</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + X</code>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Undo
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + Z</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + Z</code>
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Redo
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + Y</code> or <code>Ctrl + Shift + Z</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + Shift + Z</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Formatting & Validation</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="mb-3">
            This is where JSON formatters shine. A common shortcut is for auto-formatting or &quot;beautifying&quot;
            the JSON.
          </p>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Action
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Windows/Linux
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  macOS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Format/Beautify JSON
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Ctrl + Alt + L</code>, <code>Shift + Alt + F</code>, or
                  specific to the tool (e.g., <code>Ctrl + B</code>)
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Cmd + Alt + L</code>, <code>Shift + Option + F</code>, or
                  specific to the tool (e.g., <code>Cmd + B</code>)
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Validate JSON
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Less common as a single shortcut, often part of format or triggered on save/input.
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Less common as a single shortcut, often part of format or triggered on save/input.
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm italic">
            *Formatting shortcuts vary the most between tools. Check your specific formatter&apos;s documentation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">3. Navigation & Selection</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="mb-3">
            Moving around large JSON documents efficiently.
          </p>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Action
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Windows/Linux
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  macOS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Find
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + F</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + F</code>
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Find Next
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Enter</code> (after Ctrl+F), <code>F3</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Enter</code> (after Cmd+F), <code>Cmd + G</code>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Find Previous
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Shift + Enter</code> (after Ctrl+F), <code>Shift + F3</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Shift + Enter</code> (after Cmd+F), <code>Cmd + Shift + G</code>
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Replace
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Ctrl + H</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  <code>Cmd + Option + F</code> or <code>Cmd + Shift + H</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">4. Structuring & Folding</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="mb-3">
            Collapsing/expanding JSON nodes to manage complexity.
          </p>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Action
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Windows/Linux
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  macOS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Fold/Collapse Current Node
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Ctrl + -</code> or <code>Ctrl + [</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Cmd + -</code> or <code>Cmd + [</code>
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-850">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Unfold/Expand Current Node
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Ctrl + +</code> or <code>Ctrl + ]</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Cmd + +</code> or <code>Cmd + ]</code>
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Fold/Unfold All Nodes
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Ctrl + Shift + -</code>/<code>+</code> or specific menu shortcuts
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Cmd + Shift + -</code>/<code>+</code> or specific menu shortcuts
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">5. View & Display Options</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <p className="mb-3">
            Adjusting how the JSON is displayed.
          </p>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Action
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  Windows/Linux
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  macOS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Toggle Fullscreen
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>F11</code>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                  Often <code>Ctrl + Cmd + F</code> or specific menu options
                </td>
              </tr>
              {/* Add more view-related shortcuts if common (e.g., zoom, toggle line numbers) */}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Learning and Customizing Shortcuts</h2>
        <p>
          While many shortcuts are standard, some are tool-specific. Here&apos;s how to make the most of them:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Check Documentation:</span> The best source for accurate shortcuts is
            the documentation of your specific JSON formatter.
          </li>
          <li>
            <span className="font-medium">Explore Menus:</span> Many applications list shortcuts next to the
            menu items.
          </li>
          <li>
            <span className="font-medium">Practice:</span> Start by integrating one or two new shortcuts into your
            daily routine and gradually add more.
          </li>
          <li>
            <span className="font-medium">Customization:</span> Some advanced formatters or editors with JSON
            plugins allow you to customize keybindings to match your preferences.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Example Workflow Using Shortcuts</h2>
        <p>
          Imagine you receive a large, unformatted JSON string. Here&apos;s how you might use shortcuts:
        </p>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">
            Paste the JSON: Use <code>Ctrl + V</code> (Win/Linux) or <code>Cmd + V</code> (macOS).
          </li>
          <li className="font-medium">
            Format the JSON: Use the formatter&apos;s specific shortcut (e.g., <code>Shift + Alt + F</code>). The
            JSON is now readable.
          </li>
          <li className="font-medium">
            Find a specific key: Use <code>Ctrl + F</code> (Win/Linux) or <code>Cmd + F</code> (macOS), type the key
            name, and hit <code>Enter</code> to find the first occurrence.
          </li>
          <li className="font-medium">
            Navigate to the next occurrence: Use <code>F3</code> (Win/Linux) or <code>Cmd + G</code> (macOS).
          </li>
          <li className="font-medium">
            Edit a value: Place the cursor and type. Use <code>Ctrl + Z</code> / <code>Cmd + Z</code> if you make a
            mistake.
          </li>
          <li className="font-medium">
            Collapse sections: Use <code>Ctrl + -</code> / <code>Cmd + -</code> to hide nested objects you don&apos;t
            need to see currently.
          </li>
          <li className="font-medium">
            Copy a section: Select the text using arrow keys and Shift, then use <code>Ctrl + C</code> / <code>Cmd + C</code>.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Keyboard shortcut conventions in JSON formatters are designed to make your data manipulation tasks faster
          and more fluid. While basic editing shortcuts are nearly universal, formatting and structure-specific ones
          can vary. Investing a little time to learn the shortcuts in your preferred tool will pay dividends in
          productivity, especially when dealing with complex or large JSON documents. Start with the most common ones
          like formatting and find/replace, and gradually build your muscle memory.
        </p>
      </div>
    </>
  );
}