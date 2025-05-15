import type { Metadata } from "next";
import { Code, Clipboard, Workflow, ListChecks, Zap, Box, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: "Building JSON Formatter Workflows for Alfred & Spotlight",
  description:
    "Learn how to create custom workflows in Alfred and leverage macOS features for Spotlight to quickly format JSON data.",
};

export default function JsonFormatterWorkflowsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <Workflow size={32} />
        <span>Building JSON Formatter Workflows for Alfred & Spotlight</span>
      </h1>

      <div className="space-y-8">
        <p>
          As developers, dealing with JSON data is a daily occurrence. Whether it&apos;s API responses, configuration files, or logging, reading unformatted, dense JSON strings can be a pain. Quickly formatting JSON for readability is a common need. While many online formatters exist, relying on web services isn&apos;t always ideal for privacy or speed, especially with sensitive data.
        </p>
        <p>
          This is where macOS power-user tools like Alfred and Spotlight (with a little help) come in. By building simple workflows, you can format JSON directly on your machine, right from your keyboard, without leaving your current application. This article will guide you through the process, focusing primarily on Alfred due to its robust workflow capabilities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Zap size={24} />
          <span>Why Use a Workflow?</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Speed:</strong> Format JSON with a few keystrokes.</li>
          <li><strong>Convenience:</strong> Often works directly on clipboard content or selected text.</li>
          <li><strong>Privacy:</strong> Your data stays on your machine.</li>
          <li><strong>Customization:</strong> Tailor the formatting options to your needs.</li>
          <li><strong>Offline Access:</strong> Works without an internet connection.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Workflow size={24} />
          <span>Workflow Basics (Alfred)</span>
        </h2>
        <p>
          Alfred workflows chain together simple actions. For a JSON formatter, the typical flow is:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Input:</strong> Get the JSON string (e.g., from clipboard, a typed keyword).</li>
          <li><strong>Action:</strong> Process the input (run a script or command to format).</li>
          <li><strong>Output:</strong> Display the formatted JSON or put it back on the clipboard.</li>
        </ol>
        <p>
          Alfred&apos;s &quot;Script Filter&quot; is a powerful input type that takes a query and runs a script, expecting a specific XML or JSON output format to display results interactively. However, for a simple &quot;format whatever is on my clipboard&quot; action, a &quot;Hotkey&quot; or &quot;Keyword&quot; input triggering a script is more direct.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>Choosing Your Formatting Tool</span>
        </h2>
        <p>
          The core of the workflow is the command or script that does the actual formatting. Several command-line tools and built-in language modules are suitable:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>&#x60;jq&#x60;:</strong> A powerful, flexible command-line JSON processor. Excellent for formatting and querying.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre className="text-sm overflow-x-auto">
                <code>
                  echo &#x27;&#x7b;&#x7d;&#x27; | jq &#x27;.&#x27;
                </code>
              </pre>
            </div>
            (Requires &#x60;jq&#x60; to be installed, e.g., via Homebrew: &#x60;brew install jq&#x60;)
          </li>
          <li>
            <strong>Python:</strong> Python&apos;s &#x60;json&#x60; module can pretty-print JSON.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre className="text-sm overflow-x-auto">
                <code>
                  echo &#x27;&#x7b;&#x7d;&#x27; | python -m json.tool
                </code>
              </pre>
            </div>
            (Python is pre-installed on macOS)
          </li>
          <li>
            <strong>Node.js:</strong> Use &#x60;JSON.stringify&#x60; with indentation.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre className="text-sm overflow-x-auto">
                <code>
                  echo &#x27;&#x7b;&#x7d;&#x27; | node -e &#x27;process.stdin.pipe(process.stdout)&#x27;
                </code>
              </pre>
            </div>
            (Requires Node.js to be installed)
          </li>
        </ul>
        <p>
          &#x60;jq&#x60; is often the preferred tool for its speed and capabilities beyond just formatting, but Python is universally available on macOS.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Clipboard size={24} />
          <span>Getting Input (Clipboard)</span>
        </h2>
        <p>
          The most common way to format JSON is from the clipboard. macOS provides the &#x60;pbpaste&#x60; command to output clipboard content to standard output (stdout).
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4">
          <pre className="text-sm overflow-x-auto">
            <code>
              pbpaste
            </code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Box size={24} />
          <span>Putting Output (Clipboard)</span>
        </h2>
        <p>
          Similarly, the &#x60;pbcopy&#x60; command takes standard input (stdin) and puts it onto the clipboard.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4">
          <pre className="text-sm overflow-x-auto">
            <code>
              ...formatted json... | pbcopy
            </code>
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <ListChecks size={24} />
          <span>Building the Alfred Workflow</span>
        </h2>
        <p>
          Let&apos;s create a simple Alfred workflow that takes JSON from the clipboard, formats it using &#x60;jq&#x60;, and puts the result back on the clipboard.
        </p>
        <h3 className="text-xl font-semibold mt-6">Steps:</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Open Alfred Preferences &gt; Workflows.</li>
          <li>Click the &quot;+&quot; button at the bottom left and choose &quot;Blank Workflow&quot;.</li>
          <li>Give it a name (e.g., &quot;Format JSON&quot;), Bundle ID (reverse domain notation, e.g., &#x60;com.yourname.formatjson&#x60;), and optionally a description and icon.</li>
          <li>Right-click in the workflow editor and add an Input &gt; Hotkey.</li>
          <li>Choose a hotkey (e.g., &#x2318;&#x21E7;J - Cmd+Shift+J). Leave &quot;Argument&quot; as &quot;rigmarole&quot; (doesn&apos;t matter for this simple case).</li>
          <li>Right-click in the workflow editor and add an Actions &gt; Run Script.</li>
          <li>Link the Hotkey input to the Run Script action.</li>
          <li>In the Run Script action, select &#x60;/bin/bash&#x60; (or your preferred shell) and &quot;Script&quot;.</li>
          <li>Enter the script. A basic one using &#x60;jq&#x60; would be:
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre className="text-sm overflow-x-auto">
                <code>
                  pbpaste | jq &#x27;.&#x27; | pbcopy
                </code>
              </pre>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              This pipes the clipboard content to &#x60;jq&#x60; for formatting and then pipes the formatted output back to the clipboard.
            </p>
          </li>
          <li>(Optional) Right-click and add an Output &gt; Post Notification. Link the Run Script to this. Configure it to show a message like &quot;JSON formatted!&quot; to confirm success.</li>
        </ol>
        <p>
          Now, whenever you have JSON text copied to your clipboard and press the hotkey, it will be formatted in place on the clipboard.
        </p>

        <h3 className="text-xl font-semibold mt-6">Using Python:</h3>
        <p>If you prefer Python, the script in the &quot;Run Script&quot; action would be:</p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4">
          <pre className="text-sm overflow-x-auto">
            <code>
              pbpaste | python -m json.tool | pbcopy
            </code>
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Handling Invalid JSON</h3>
        <p>
          What happens if the clipboard contains invalid JSON? The commands (&#x60;jq&#x60;, &#x60;python -m json.tool&#x60;) will output an error message to stderr and/or exit with a non-zero status. The current simple script will likely just put the error message onto the clipboard.
        </p>
        <p>
          To handle this more gracefully, you can add error checking in your script.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Bash script with basic error handling (using &#x60;jq&#x60;):</h4>
          <pre className="text-sm overflow-x-auto">
            <code>
              JSON_INPUT=$(pbpaste){"\n"}FORMATTED_JSON=$(echo &quot;$JSON_INPUT&quot; | jq &apos;.&apos; 2&gt;&amp;1){"\n"}{"\n"}if echo &quot;$FORMATTED_JSON&quot; | grep -q &apos;error:&apos;; then{"\n"}  # It looks like jq returned an error{"\n"}  osascript -e &apos;display notification &quot;Invalid JSON on clipboard.&quot; with title &quot;JSON Formatter Error&quot;&apos;{"\n"}else{"\n"}  echo &quot;$FORMATTED_JSON&quot; | pbcopy{"\n"}  osascript -e &apos;display notification &quot;JSON formatted successfully.&quot; with title &quot;JSON Formatter&quot;&apos;{"\n"}fi
            </code>
          </pre>
        </div>
        <p>
          This script captures the output (including stderr from &#x60;jq&#x60; using &#x60;2&gt;&amp;1&#x60;), checks if it contains an error indicator (like &quot;error:&quot; from &#x60;jq&#x60;), and shows a notification instead of overwriting the clipboard with the error message. AppleScript (&#x60;osascript&#x60;) is used here to trigger native macOS notifications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Search size={24} />
          <span>Spotlight Integration?</span>
        </h2>
        <p>
          Spotlight itself is primarily a search tool and doesn&apos;t have the built-in scripting workflow capabilities of Alfred. However, you can achieve similar results through macOS Services or third-party Spotlight alternatives/extensions.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>macOS Services:</strong> You can create a Service using Automator. A Service can take selected text as input and run a script. Configure a Service to take &quot;Text&quot; input in &quot;Any Application&quot;, run a &quot;Run Shell Script&quot; action (using &#x60;pbpaste | jq &apos;.&apos; | pbcopy&#x60; is tricky here as Services work on selected text, not clipboard directly unless you use &#x60;pbpaste&#x60; explicitly inside the script), and assign it a keyboard shortcut in System Preferences &gt; Keyboard &gt; Shortcuts &gt; Services. This method requires selecting the JSON text first, which might be less convenient than a clipboard hotkey.
          </li>
          <li>
            <strong>Third-Party Apps:</strong> Some utilities or text editors might register formatters as Services or provide their own Spotlight-like interfaces.
          </li>
        </ul>
        <p>
          For dedicated keyboard-driven JSON formatting workflows, Alfred offers a much more flexible and powerful platform than native Spotlight.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code size={24} />
          <span>Beyond Basic Formatting</span>
        </h2>
        <p>
          Once you have the basic workflow running, you can enhance it:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Different Indentation:</strong> Use &#x60;jq -S &apos;.&apos;&#x60; for sorted keys, or &#x60;jq --indent 4 &apos;.&apos;&#x60; if your tool allows specifying indentation level. Python&apos;s &#x60;json.tool&#x60; uses 2 spaces by default.</li>
          <li><strong>Minifying JSON:</strong> Change the script to &#x60;pbpaste | jq -c &apos;.&apos; | pbcopy&#x60; to output compact JSON on a single line.</li>
          <li><strong>Opening in Editor:</strong> Instead of &#x60;pbcopy&#x60;, pipe the output to a temporary file and then use &#x60;open -a &quot;Your Editor Name&quot; /path/to/tempfile.json&#x60; to open the formatted JSON in your favorite text editor.</li>
          <li><strong>Copying to Specific Pastboard:</strong> For advanced use, you might copy to a different pasteboard than the main clipboard.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Workflow size={24} />
          <span>Conclusion</span>
        </h2>
        <p>
          Building a JSON formatter workflow in Alfred is a practical way to speed up your development tasks and keep your data private. By leveraging command-line tools like &#x60;jq&#x60; or built-in language features accessible via shell scripts, you can create powerful custom utilities triggered by simple hotkeys or keywords. While native Spotlight is less suited for this specific type of task, Alfred provides an excellent platform for automating such developer conveniences on macOS.
        </p>
      </div>
    </>
  );
}