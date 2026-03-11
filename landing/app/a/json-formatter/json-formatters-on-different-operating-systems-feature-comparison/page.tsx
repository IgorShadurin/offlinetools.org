import type { Metadata } from "next";
import {
  Terminal,
  Settings,
  Code,
  CheckCircle,
  ListOrdered,
  Minimize2,
  Maximize2,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Formatters Across Operating Systems: A Feature Comparison",
  description:
    "Compare current JSON formatting options on Windows, macOS, and Linux, including jq, PowerShell, and Python for pretty-printing, compact output, sorting, and validation.",
};

export default function JsonFormatterComparisonPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Formatters Across Operating Systems: A Feature Comparison</h1>

      <div className="space-y-6">
        <p>
          If you search for a JSON formatter by operating system, the real question is usually not whether Windows,
          macOS, or Linux can format JSON. All three can. The important difference is which tool is already available
          on the machine, how much syntax you have to remember, and whether you need more than simple pretty-printing.
        </p>
        <p>
          The short answer is straightforward. Install <code>jq</code> if you want one workflow that behaves almost
          the same everywhere. Use PowerShell when you want the fastest no-install path on Windows. Use Python&apos;s
          JSON CLI when Python 3 is already available and you mainly need validation, sorting, or quick file cleanup.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ListOrdered className="mr-3" /> Quick Comparison
        </h2>
        <p>
          This table focuses on the tools most people will realistically use rather than every possible JSON utility
          that might exist on one system image or another.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Tool
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Typical Availability
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Pretty-Print
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Compact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Sort Keys
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Validate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Best Fit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  <code>jq</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">All OS, separate install</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes, with indent control</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes, with <code>-S</code></td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  The most consistent cross-platform CLI workflow
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  PowerShell JSON cmdlets
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Built into Windows PowerShell; PowerShell 7 works on all OS after install
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Yes, with <code>-Compress</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">No direct sort flag</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Yes, plus <code>Test-Json</code> in PowerShell 6.1+
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Windows-first admin and scripting work
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  Python JSON CLI
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Any OS where Python 3 is installed
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Yes, with <code>--compact</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Yes, with <code>--sort-keys</code>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Yes</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  Quick cleanup when Python is already present
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-3" /> What Actually Changes by Operating System
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Windows:</strong> You usually already have PowerShell, which makes JSON formatting possible without
            installing anything. Inline shell examples copied from Linux articles often break because quoting rules are
            different, so file-based examples are usually safer.
          </li>
          <li>
            <strong>macOS:</strong> Terminal examples generally assume <code>zsh</code> or another POSIX shell. If you
            rely on Python, the executable is often <code>python3</code> rather than <code>python</code>.
          </li>
          <li>
            <strong>Linux:</strong> Command-line JSON workflows are usually easiest here, but availability still varies
            by distro and container image. Python 3 is common, while <code>jq</code> is often the first extra package
            people add for reliable scripting.
          </li>
          <li>
            <strong>Cross-platform reality:</strong> PowerShell is no longer Windows-only. PowerShell 7 runs on
            Windows, macOS, and Linux, so the JSON cmdlets can be a cross-platform option if your team already uses
            PowerShell.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Terminal className="mr-3" /> Best Cross-Platform Choice: jq
        </h2>
        <p>
          <code>jq</code> is still the cleanest answer if you want one formatter that behaves predictably across
          operating systems. It is not usually preinstalled, but once it is available you get the same flags on
          Windows, macOS, and Linux for pretty-printing, compact output, key sorting, color control, and much more.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Maximize2 className="mr-2" /> Pretty-print a file
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            The identity filter <code>.</code> formats valid JSON with the default indentation.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`jq . input.json`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Minimize2 className="mr-2" /> Compact and sort keys
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Use <code>-c</code> for one-line output and <code>-S</code> to alphabetize object keys.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`jq -c -S . input.json`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Code className="mr-2" /> Customize indent or force color
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <code>jq</code> supports custom indentation and explicit color control.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`jq --indent 4 -C . input.json`}</pre>
          </div>
        </div>
        <p>
          Choose <code>jq</code> when you need deterministic output, key sorting, reusable scripts, or you work with
          large files often enough that a more capable JSON processor is worth installing. It also doubles as a quick
          validator: <code>jq empty input.json</code> exits cleanly for valid JSON and fails on malformed input.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="mr-3" /> Best No-Install Windows Option: PowerShell
        </h2>
        <p>
          If you are on Windows, PowerShell is usually the fastest way to format JSON without adding another tool.
          <code>ConvertFrom-Json</code> parses the text, and <code>ConvertTo-Json</code> writes it back in a readable
          format. In PowerShell 7 and newer, the same approach also works on macOS and Linux.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Maximize2 className="mr-2" /> Pretty-print from a file
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <code>-Raw</code> reads the whole file as one string, which avoids line-by-line parsing issues.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`Get-Content -Raw .\\input.json | ConvertFrom-Json | ConvertTo-Json -Depth 100`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Minimize2 className="mr-2" /> Compact output
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Use <code>-Compress</code> when you want one-line JSON instead of readable indentation.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`Get-Content -Raw .\\input.json | ConvertFrom-Json | ConvertTo-Json -Compress -Depth 100`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <CheckCircle className="mr-2" /> Validate JSON
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <code>Test-Json</code> is the cleanest validation command in newer PowerShell versions.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`Get-Content -Raw .\\input.json | Test-Json`}</pre>
          </div>
        </div>
        <p>
          The main caveat is depth. <code>ConvertTo-Json</code> has a default depth of 2, which is too shallow for many
          real API payloads, so it is safer to set a larger value explicitly. PowerShell is also not the best choice if
          you need alphabetical key sorting because there is no simple built-in equivalent to <code>jq -S</code> or
          Python&apos;s <code>--sort-keys</code>.
        </p>
        <p>
          If you are still on Windows PowerShell 5.1, JSON formatting works, but <code>Test-Json</code> is not part of
          that older runtime. Installing PowerShell 7 closes that gap and gives you the same command set on every OS.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-3" /> Lowest-Friction CLI When Python Is Already There
        </h2>
        <p>
          Python&apos;s JSON CLI is ideal when you do not need <code>jq</code>-style transformations and you already
          have Python 3 available. The most compatible command is still <code>python3 -m json.tool</code>. Newer
          Python versions also support <code>python -m json</code>, but the <code>json.tool</code> form remains the
          safest choice across mixed environments.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Maximize2 className="mr-2" /> Pretty-print a file
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`python3 -m json.tool input.json`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <ListOrdered className="mr-2" /> Sort keys with a smaller indent
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`python3 -m json.tool --sort-keys --indent 2 input.json`}</pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <Minimize2 className="mr-2" /> Compact or parse JSON Lines
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            The current CLI also supports one-line output and JSON Lines input.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`python3 -m json.tool --compact input.json
python3 -m json.tool --json-lines events.ndjson`}</pre>
          </div>
        </div>
        <p>
          Python is a strong middle ground when you need validation and clean output but not a full query language. It
          also has helpful flags such as <code>--no-ensure-ascii</code> if you want non-ASCII characters written
          directly instead of escaped.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileText className="mr-3" /> Common Failure Points
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Invalid JSON is not the same as JavaScript object syntax.</strong> Trailing commas, comments, and
            single-quoted keys will fail in all three tools.
          </li>
          <li>
            <strong>PowerShell depth truncation surprises people.</strong> If the output suddenly shows shortened nested
            objects, increase <code>-Depth</code>.
          </li>
          <li>
            <strong>Large files favor jq.</strong> Python and PowerShell usually parse the full document into memory,
            while <code>jq</code> gives you better options for heavy CLI work.
          </li>
          <li>
            <strong>Shell quoting differs across OS.</strong> When examples copied from blog posts fail, switch to
            formatting a file instead of echoing inline JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle className="mr-3" /> Which Formatter Should You Choose?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>jq</code> if you want the best cross-platform formatter and expect to reuse the workflow in
            scripts, CI jobs, or debugging sessions.
          </li>
          <li>
            Use PowerShell if you are on Windows and want a built-in formatter immediately, especially for admin or
            automation tasks that already live in PowerShell.
          </li>
          <li>
            Use Python&apos;s JSON CLI if Python 3 is already on the machine and you only need formatting, sorting, or
            validation.
          </li>
          <li>
            Use an editor or offline browser formatter if the task is one-off and you do not want shell-specific
            quoting or installation overhead at all.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The most useful operating system comparison is not just Windows versus macOS versus Linux. It is built-in
          convenience versus install-once consistency. Windows gives you PowerShell out of the box, Python is a common
          low-friction option wherever it is installed, and <code>jq</code> remains the best all-around choice when you
          want predictable behavior across every platform.
        </p>
      </div>
    </>
  );
}
