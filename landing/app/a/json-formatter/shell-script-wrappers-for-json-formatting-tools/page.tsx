import type { Metadata } from "next";
import {
  Code,
  FileJson,
  Terminal,
  Workflow,
  Rocket,
  Clipboard,
  FolderOpen,
  BookText,
  Bolt,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shell Script Wrappers for JSON Formatting Tools",
  description:
    "Learn how to create simple yet powerful shell script wrappers to streamline the use of JSON formatting and processing tools like jq, json_pp, and Python's json.tool.",
};

export default function JsonFormattingWrappersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Code className="w-8 h-8" /> Shell Script Wrappers for JSON Formatting Tools
      </h1>

      <div className="space-y-6">
        <p>
          Working with JSON data is a ubiquitous task for developers. Whether you're debugging API responses,
          parsing configuration files, or processing logs, JSON is everywhere. While many command-line tools
          exist to help format and process JSON (like <code><code className="font-mono">jq</code></code>, <code><code className="font-mono">json_pp</code></code>,
          or <code><code className="font-mono">python -m json.tool</code></code>), their commands can sometimes be lengthy, difficult to remember,
          or inconsistent depending on the specific tool or task.
        </p>
        <p>
          This is where shell script wrappers come in. A simple wrapper script can abstract away the complexities
          of these tools, provide a consistent interface, and automate common tasks, making your workflow much
          more efficient.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bolt className="w-6 h-6" /> Why Wrap JSON Tools?
        </h2>
        <p>Wrapping command-line JSON tools in shell scripts offers several benefits:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simplified Commands:</strong> Turn complex commands with multiple flags into short, memorable aliases (e.g., <code><code className="font-mono">fmtjson</code></code> instead of <code><code className="font-mono">jq .</code></code> or <code><code className="font-mono">python -m json.tool</code></code>).
          </li>
          <li>
            <strong>Consistency:</strong> Use the same wrapper command regardless of which underlying tool is available or preferred on a given system.
          </li>
          <li>
            <strong>Handling Input:</strong> Easily handle input from stdin (piped data), files, or even the system clipboard.
          </li>
          <li>
            <strong>Adding Features:</strong> Integrate extra steps like colorization, diffing against another file, or extracting specific fields by default.
          </li>
          <li>
            <strong>Automation:</strong> Combine multiple steps (like fetching data, formatting, and filtering) into a single command.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> Basic Wrapper Example: Pretty-Printing
        </h2>
        <p>
          Let's start with a simple wrapper to pretty-print JSON. This script will try to use <code><code className="font-mono">jq</code></code> if available,
          falling back to <code><code className="font-mono">python -m json.tool</code></code> or <code><code className="font-mono">json_pp</code></code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Terminal className="w-5 h-5" /> <code><code className="font-mono">fmtjson</code></code> script:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`#!/bin/bash

# Simple JSON formatter wrapper
# Tries jq, then python -m json.tool, then json_pp

# Check for input from pipe or file
if [ -p /dev/stdin ]; then
  # Input is from pipe (stdin)
  JSON_INPUT=$(cat)
elif [ -n "$1" ] && [ -f "$1" ]; then
  # Input is from a file provided as the first argument
  JSON_INPUT=$(cat "$1")
else
  echo "Usage: $0 [file] < JSON_data" >&2
  echo "       Provide JSON via pipe or file argument." >&2
  exit 1
fi

# Try jq first
if command -v jq &>/dev/null; then
  echo "$JSON_INPUT" | jq .
  exit 0
fi

# If jq not found, try python -m json.tool
if command -v python &>/dev/null; then
  echo "$JSON_INPUT" | python -m json.tool
  exit 0
fi

# If python not found, try json_pp
if command -v json_pp &>/dev/null; then
  echo "$JSON_INPUT" | json_pp
  exit 0
fi

# If none found
echo "Error: No JSON formatting tool found (need jq, python, or json_pp)." >&2
exit 1`}
            </pre>
          </div>
          <p className="mt-2">
            Save this as <code><code className="font-mono">fmtjson</code></code> in your <code><code className="font-mono">$PATH</code></code> and make it executable (<code><code className="font-mono">chmod +x fmtjson</code></code>).
          </p>
        </div>

        <p>Now you can use it like this:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre><code className="font-mono">{`# From a string (using echo and pipe)
echo '{"name": "Alice", "age": 30}' | fmtjson

# From a file
fmtjson config.json

# Example API call piped into fmtjson
curl -s "https://rickandmortyapi.com/api/character/1" | fmtjson`}</code></pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="w-6 h-6" /> Handling Different Inputs (Files vs. Stdin)
        </h2>
        <p>
          The basic example already handles both piped input and a file argument. Let's refine this pattern.
          A common technique is to check if stdin is connected to a terminal (`-t 0`) or if there's a file argument.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Layers className="w-5 h-5" /> Input Handling Pattern:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`#!/bin/bash

# Determine input source
if [ -t 0 ]; then
  # Stdin is connected to a terminal, expect file argument
  if [ -z "$1" ]; then
    echo "Usage: $0 <json_file> [options]" >&2
    exit 1
  fi
  INPUT_SOURCE="$1"
  # Shift arguments if file is used, so options are $1, $2, etc.
  shift
else
  # Input is from pipe (stdin)
  INPUT_SOURCE="/dev/stdin"
fi

# Now use INPUT_SOURCE with your JSON tool
# Example using jq:
if command -v jq &>/dev/null; then
  jq "$@" "$INPUT_SOURCE"
else
  echo "jq not found!" >&2
  exit 1
fi`}
            </pre>
          </div>
          <p className="mt-2">
            In this pattern, <code><code className="font-mono">$@</code></code> passes along any additional arguments provided to the wrapper script (like <code><code className="font-mono">jq</code></code> filters).
          </p>
        </div>
        <p>Usage with this pattern:</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre><code className="font-mono">{`# With a file and jq filter
my_jq_wrapper config.json '.users[] | .name'

# With piped input and jq filter
cat log.json | my_jq_wrapper '.errors | length'`}</code></pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Clipboard className="w-6 h-6" /> Integrating Clipboard (macOS & Linux)
        </h2>
        <p>
          A very common use case is formatting JSON that you've copied to your clipboard. You can extend
          your wrapper to read from and write to the clipboard using OS-specific commands like <code><code className="font-mono">pbcopy</code></code>/<code><code className="font-mono">pbpaste</code></code> (macOS)
          or <code><code className="font-mono">xclip</code></code>/<code><code className="font-mono">xsel</code></code> (Linux).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <BookText className="w-5 h-5" /> Wrapper with Clipboard Support:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`#!/bin/bash

# JSON formatter with clipboard support
# Usage: fmtjson [file]   -> Format file content
#        ... | fmtjson    -> Format piped content
#        fmtjson -p       -> Format content from pasteboard (clipboard)
#        fmtjson -p | pbcopy # or xclip -selection clipboard -> Format clipboard and copy back

INPUT_SOURCE="/dev/stdin" # Default to stdin
USE_CLIPBOARD=false

# Check for pasteboard flag (-p)
if [ "$1" == "-p" ]; then
  USE_CLIPBOARD=true
  shift # Remove -p from arguments
fi

# Determine input source (file or stdin) if not using clipboard
if ! $USE_CLIPBOARD; then
  if [ -t 0 ]; then
    # Stdin is terminal, expect file argument
    if [ -z "$1" ]; then
      echo "Usage: $0 [-p] <json_file> [options]" >&2
      echo "       ... | $0 [options]" >&2
      echo "       $0 -p [options]" >&2
      exit 1
    fi
    INPUT_SOURCE="$1"
    shift # Remove file from arguments
  fi
fi

# Get the JSON input
if $USE_CLIPBOARD; then
  # Read from clipboard
  if command -v pbpaste &>/dev/null; then
    JSON_INPUT=$(pbpaste)
  elif command -v xclip &>/dev/null; then
    JSON_INPUT=$(xclip -selection clipboard -o)
  elif command -v xsel &>/dev/null; then
    JSON_INPUT=$(xsel -b -o)
  else
    echo "Error: Clipboard paste tool not found (need pbpaste, xclip, or xsel)." >&2
    exit 1
  fi
elif [ "$INPUT_SOURCE" = "/dev/stdin" ]; then
  # Read from stdin (pipe)
  JSON_INPUT=$(cat)
else
  # Read from file
  JSON_INPUT=$(cat "$INPUT_SOURCE")
fi

# --- Formatting Logic (using jq as example) ---
# Use jq on the JSON_INPUT variable, passing remaining arguments
if command -v jq &>/dev/null; then
  echo "$JSON_INPUT" | jq "$@"
else
  echo "Error: jq not found. Cannot format JSON." >&2
  exit 1
fi`}
            </pre>
          </div>
          <p className="mt-2">
            This script adds a <code><code className="font-mono">-p</code></code> flag to read from the clipboard. The output is printed to stdout,
            so you can pipe it back to the clipboard tool to format in place:
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre><code className="font-mono">{`# Format JSON currently in clipboard (macOS)
fmtjson -p | pbcopy

# Format JSON currently in clipboard (Linux using xclip)
fmtjson -p | xclip -selection clipboard`}</code></pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FolderOpen className="w-6 h-6" /> Handling Files with Specific Extensions
        </h2>
        <p>
          You might want your wrapper to behave differently or use different tools based on the file extension,
          though for pure JSON this is less common than for other formats like YAML or XML. However, you could
          extend the idea to process <code><code className="font-mono">.jsonl</code></code> (JSON Lines) differently than standard <code><code className="font-mono">.json</code></code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Rocket className="w-6 h-6" /> More Advanced Concepts
        </h2>

        <h3 className="text-xl font-semibold mt-6">Error Handling:</h3>
        <p>
          Robust wrappers should include error checking, like ensuring the input is valid JSON before attempting
          to process it (though the tools themselves usually handle this). You can add checks for the presence
          of required commands (like <code><code className="font-mono">command -v jq</code></code> as shown) and provide informative error messages
          to the user via <code><code className="font-mono">&gt;&amp;2</code></code> (standard error).
        </p>

        <h3 className="text-xl font-semibold mt-6">Configuration:</h3>
        <p>
          Allow users to configure preferred tools or default options using environment variables.
          For example, <code><code className="font-mono">JSON_FORMATTER="python"</code></code> could tell the script to use the Python tool first.
        </p>

        <h3 className="text-xl font-semibold mt-6">Parameterization:</h3>
        <p>
          Design your wrapper to accept arguments that are passed directly to the underlying tool, as shown in the
          input handling example passing <code><code className="font-mono">$@</code></code> to <code><code className="font-mono">jq</code></code>. This maintains the power of the tool while providing the wrapper's convenience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookText className="w-6 h-6" /> Conclusion
        </h2>
        <p>
          Shell script wrappers are a powerful way to customize and simplify your command-line workflow for common
          tasks like JSON formatting. By abstracting tool specifics and handling different input methods,
          you can create convenient, consistent, and efficient commands tailored to your needs. Start with a simple
          pretty-printer and expand your wrapper as you discover more recurring JSON tasks.
        </p>
      </div>
    </>
  );
}