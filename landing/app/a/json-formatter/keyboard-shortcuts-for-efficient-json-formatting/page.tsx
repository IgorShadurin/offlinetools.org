import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts for Efficient JSON Formatting | Offline Tools",
  description:
    "Learn how keyboard shortcuts can dramatically improve efficiency when working with JSON formatting tools",
};

export default function KeyboardShortcutsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Keyboard Shortcuts for Efficient JSON Formatting</h1>

      <div className="space-y-6">
        <p>
          Keyboard shortcuts are essential for maximizing productivity in JSON formatters. By learning key combinations
          for common tasks, developers can work faster, maintain focus, and reduce strain from excessive mouse usage.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Keyboard Shortcuts</h2>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Action</th>
                <th className="text-left py-2 px-3">Windows/Linux</th>
                <th className="text-left py-2 px-3">macOS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">Format/Beautify JSON</td>
                <td className="py-2 px-3">Ctrl+Shift+F</td>
                <td className="py-2 px-3">⌘+Shift+F</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Minify JSON</td>
                <td className="py-2 px-3">Ctrl+Shift+M</td>
                <td className="py-2 px-3">⌘+Shift+M</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Expand all nodes</td>
                <td className="py-2 px-3">Ctrl+E</td>
                <td className="py-2 px-3">⌘+E</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Collapse all nodes</td>
                <td className="py-2 px-3">Ctrl+Shift+E</td>
                <td className="py-2 px-3">⌘+Shift+E</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Find</td>
                <td className="py-2 px-3">Ctrl+F</td>
                <td className="py-2 px-3">⌘+F</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Copy</td>
                <td className="py-2 px-3">Ctrl+C</td>
                <td className="py-2 px-3">⌘+C</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Copy path</td>
                <td className="py-2 px-3">Ctrl+Shift+C</td>
                <td className="py-2 px-3">⌘+Shift+C</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Toggle line wrapping</td>
                <td className="py-2 px-3">Ctrl+W</td>
                <td className="py-2 px-3">⌘+W</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Validate JSON</td>
                <td className="py-2 px-3">Ctrl+V</td>
                <td className="py-2 px-3">⌘+V</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Save/Export</td>
                <td className="py-2 px-3">Ctrl+S</td>
                <td className="py-2 px-3">⌘+S</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Undo</td>
                <td className="py-2 px-3">Ctrl+Z</td>
                <td className="py-2 px-3">⌘+Z</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Redo</td>
                <td className="py-2 px-3">Ctrl+Y or Ctrl+Shift+Z</td>
                <td className="py-2 px-3">⌘+Shift+Z</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Learning Tip:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Start by learning 3-5 frequently used shortcuts rather than trying to memorize all at once. Add more to your
            workflow gradually as each set becomes second nature.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Benefits of Using Keyboard Shortcuts</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Speed:</strong> Execute operations instantly without hunting through menus
          </li>
          <li>
            <strong>Focus:</strong> Maintain concentration on the data rather than UI navigation
          </li>
          <li>
            <strong>Efficiency:</strong> Chain operations together for complex workflows
          </li>
          <li>
            <strong>Ergonomics:</strong> Reduce repetitive mouse movements that can cause strain
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Advanced Shortcut Techniques</h2>

        <p>
          Beyond basic shortcuts, advanced users can leverage more sophisticated techniques to further enhance
          productivity.
        </p>

        <h3 className="text-xl font-semibold mt-6">Shortcut Combinations</h3>

        <p>Chaining multiple shortcuts together can create powerful workflows. For example:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Combined Workflow Example:</h4>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>Format JSON (Ctrl+Shift+F / ⌘+Shift+F)</li>
            <li>Collapse all nodes (Ctrl+Shift+E / ⌘+Shift+E)</li>
            <li>Find specific property (Ctrl+F / ⌘+F)</li>
            <li>Expand only that node (Navigate + Enter)</li>
            <li>Copy that property path (Ctrl+Shift+C / ⌘+Shift+C)</li>
          </ol>
          <p className="mt-2 text-sm">
            This sequence takes seconds with shortcuts but much longer with mouse-only navigation.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Customizing Shortcuts</h3>

        <p>
          Many advanced JSON formatters allow users to customize keyboard shortcuts to match personal preferences or
          align with shortcuts used in other development tools.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Common Customization Options:</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Rebinding existing shortcuts to different key combinations</li>
            <li>Creating new shortcuts for frequently used actions</li>
            <li>Importing/exporting shortcut configurations</li>
            <li>Creating shortcut profiles (e.g., for different projects)</li>
          </ul>
        </div>

        <p>
          When customizing shortcuts, try to maintain consistency with other tools in your workflow to reduce cognitive
          load when switching between applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Keyboard Navigation Within JSON</h2>

        <p>
          Navigating large JSON structures efficiently is just as important as executing commands quickly. Well-designed
          JSON formatters offer keyboard-based navigation options:
        </p>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Navigation Action</th>
                <th className="text-left py-2 px-3">Shortcut</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">Move up/down between properties</td>
                <td className="py-2 px-3">Up/Down arrows</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Expand/collapse current node</td>
                <td className="py-2 px-3">Right/Left arrows</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Jump to parent node</td>
                <td className="py-2 px-3">Backspace or Alt+Up</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Jump to first/last property</td>
                <td className="py-2 px-3">Home/End</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Jump to next/previous sibling</td>
                <td className="py-2 px-3">Tab/Shift+Tab</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Follow reference (for tools with reference support)</td>
                <td className="py-2 px-3">Ctrl+Click / ⌘+Click</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-6">Tree Navigation Techniques</h3>

        <p>For deeply nested JSON, effective tree navigation techniques can save significant time:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Depth Navigation Tips:</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              Use <strong>Ctrl+G / ⌘+G</strong> to jump to a specific line number in JSON
            </li>
            <li>
              Use <strong>Alt+Right / Option+Right</strong> to expand a node and all its children
            </li>
            <li>
              Use <strong>/ (slash)</strong> in some formatters to start a quick search
            </li>
            <li>
              Use <strong>Ctrl+[ and Ctrl+] / ⌘+[ and ⌘+]</strong> to jump between matching brackets
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Shortcut Patterns Across Different JSON Formatters</h2>

        <p>
          While exact shortcuts vary between tools, many JSON formatters follow similar patterns. Understanding these
          patterns makes it easier to adapt to new tools:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Common Shortcut Patterns:</h4>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Ctrl/⌘ + F</strong> - Almost universally used for find/search
            </li>
            <li>
              <strong>Ctrl/⌘ + directional keys</strong> - Often used for structural navigation
            </li>
            <li>
              <strong>Ctrl/⌘ + Shift</strong> - Typically indicates an operation on the entire document
            </li>
            <li>
              <strong>Alt/Option + key</strong> - Often used for secondary or alternate operations
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6">Tool-Specific Shortcut Examples</h3>

        <p>Let&apos;s examine shortcut variations across popular JSON formatting tools:</p>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Tool</th>
                <th className="text-left py-2 px-3">Format JSON</th>
                <th className="text-left py-2 px-3">Minify JSON</th>
                <th className="text-left py-2 px-3">Notable Unique Shortcuts</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">VSCode + JSON Extension</td>
                <td className="py-2 px-3">Alt+Shift+F</td>
                <td className="py-2 px-3">Custom command</td>
                <td className="py-2 px-3">Ctrl+Space for schema suggestions</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Online JSON Formatter</td>
                <td className="py-2 px-3">Ctrl+Shift+F / ⌘+Shift+F</td>
                <td className="py-2 px-3">Ctrl+Shift+M / ⌘+Shift+M</td>
                <td className="py-2 px-3">Ctrl+D / ⌘+D for JSON diff view</td>
              </tr>
              <tr>
                <td className="py-2 px-3">IntelliJ/WebStorm</td>
                <td className="py-2 px-3">Ctrl+Alt+L / ⌘+Option+L</td>
                <td className="py-2 px-3">Custom command</td>
                <td className="py-2 px-3">Ctrl+Alt+T / ⌘+Option+T for code surround</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Offline JSON Tools</td>
                <td className="py-2 px-3">Ctrl+Shift+F / ⌘+Shift+F</td>
                <td className="py-2 px-3">Ctrl+Shift+M / ⌘+Shift+M</td>
                <td className="py-2 px-3">Ctrl+J / ⌘+J for JSONPath query</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Mobile Considerations</h2>

        <p>While traditional keyboard shortcuts work best on desktop, mobile alternatives include:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Touch gestures (swipes, double-taps, long-press)</li>
          <li>External keyboard support for tablets</li>
          <li>Customizable quick action buttons</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Mobile-Specific Gesture Patterns</h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Common Mobile Gestures:</h4>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>Pinch to zoom</strong> - Adjust text size or zoom level
            </li>
            <li>
              <strong>Double-tap on node</strong> - Expand/collapse node
            </li>
            <li>
              <strong>Swipe left/right</strong> - Navigate between tabs or views
            </li>
            <li>
              <strong>Two-finger swipe</strong> - Scroll horizontally in wide JSON
            </li>
            <li>
              <strong>Long-press</strong> - Show context menu for additional options
            </li>
            <li>
              <strong>Three-finger swipe</strong> - Some apps use this for undo/redo operations
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Accessibility Tip:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            Many mobile JSON formatters now offer voice command support as an alternative input method. This can be
            particularly useful for hands-free operation or users with motor disabilities.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Shortcut Efficiency</h2>

        <p>To maximize your productivity with JSON formatting shortcuts, consider these best practices:</p>

        <ol className="list-decimal pl-6 space-y-3 mt-4">
          <li>
            <strong>Start with the essentials</strong>: Begin by mastering the most frequently used shortcuts (format,
            find, expand/collapse, copy)
          </li>
          <li>
            <strong>Practice deliberately</strong>: Set aside time to practice using shortcuts without falling back to
            mouse operations
          </li>
          <li>
            <strong>Use cheat sheets</strong>: Create or download a keyboard shortcut cheat sheet and keep it visible
            until shortcuts become muscle memory
          </li>
          <li>
            <strong>Customize for ergonomics</strong>: Remap shortcuts that cause hand strain or are difficult to reach
          </li>
          <li>
            <strong>Create shortcut consistency</strong>: Try to use similar shortcuts across different tools in your
            workflow
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Practice Exercise:</h4>
          <p className="mt-2">Try this 5-minute daily exercise to build muscle memory for JSON formatting shortcuts:</p>
          <ol className="list-decimal pl-6 mt-2">
            <li>Open a complex JSON file</li>
            <li>Format it using keyboard shortcuts</li>
            <li>Find a specific property using search</li>
            <li>Navigate to 3 different nested objects using only keyboard</li>
            <li>Copy specific values and their paths</li>
            <li>Collapse and expand sections</li>
          </ol>
          <p className="mt-2 text-sm">With daily practice, these actions will become automatic within 1-2 weeks.</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Troubleshooting Shortcut Issues</h2>

        <p>Sometimes keyboard shortcuts may not work as expected. Here are common issues and solutions:</p>

        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-900 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Issue</th>
                <th className="text-left py-2 px-3">Potential Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-3">Shortcuts not responding</td>
                <td className="py-2 px-3">Check for operating system or browser shortcut conflicts</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Unexpected behavior when using shortcuts</td>
                <td className="py-2 px-3">Verify that the JSON document is properly focused</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Shortcuts work inconsistently</td>
                <td className="py-2 px-3">Check if the formatting tool has different modes that affect shortcuts</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Browser extensions interfering</td>
                <td className="py-2 px-3">Try in incognito/private mode or temporarily disable extensions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>

        <p className="mt-6">
          By investing time to learn keyboard shortcuts, developers can transform their JSON formatting experience from
          tedious to fluid, focusing on the data itself rather than the mechanics of the tool.
        </p>

        <p>
          Whether you&apos;re a casual JSON user or someone who works with complex data structures daily, mastering
          keyboard shortcuts will significantly boost your productivity. Start with a few essential shortcuts, practice
          regularly, and gradually expand your repertoire as each set becomes second nature.
        </p>

        <p>
          Remember that the goal of shortcuts is not just speed, but also to minimize the cognitive load of tool
          interaction, allowing you to focus more deeply on the actual JSON data and the problems you&apos;re solving.
        </p>
      </div>
    </>
  );
}
