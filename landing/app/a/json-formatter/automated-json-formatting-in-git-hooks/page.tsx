import type { Metadata } from "next";
import { FileJson, GitBranch, Hammer, Code, Package, AlertTriangle, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Automated JSON Formatting in Git Hooks | Your Site Name",
  description:
    "Learn how to automatically format JSON files using Git pre-commit hooks to maintain code consistency and improve diff readability.",
};

export default function AutomatedJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="mr-3 text-blue-500" size={32} />
        Automated JSON Formatting in Git Hooks
      </h1>

      <div className="space-y-6">
        <p>
          Maintaining consistent code style across a project is crucial for readability, collaboration, and reducing
          merge conflicts. While code formatters are common for languages like JavaScript, Python, or CSS, configuration
          files and data formats like JSON often get overlooked. Inconsistent JSON formatting can lead to noisy Git
          diffs and debates during code reviews. This article explores how to use Git hooks, specifically the pre-commit
          hook, to automatically format your JSON files before they are committed.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <GitBranch className="mr-2 text-green-500" />
          What are Git Hooks?
        </h2>
        <p>
          Git hooks are scripts that Git executes automatically at certain points in your workflow. They allow you to
          customize Git&apos;s internal behavior and trigger customizable actions. Hooks are typically stored in the{" "}
          <code>.git/hooks</code> directory of your repository. Examples include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>pre-commit</code>: Runs before a commit is finalized. This is where you might check code style or run
            tests.
          </li>
          <li>
            <code>prepare-commit-msg</code>: Runs before the commit message editor is launched.
          </li>
          <li>
            <code>post-commit</code>: Runs after a commit is successfully created. Useful for notifications or triggers.
          </li>
          <li>
            <code>pre-rebase</code>: Runs before a rebase starts.
          </li>
          <li>And many more...</li>
        </ul>
        <p>
          For automated formatting, the <code>pre-commit</code> hook is the ideal place. It ensures that any files you
          add to the staging area meet your formatting standards *before* they become part of the commit history. If the
          hook script exits with a non-zero status, the commit is aborted, giving you a chance to fix issues.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Hammer className="mr-2 text-yellow-500" />
          Setting up a Basic Manual Hook
        </h2>
        <p>
          You can set up a Git hook manually by navigating to the <code>.git/hooks</code> directory in your repository.
          You&apos;ll find example scripts with a <code>.sample</code> extension. To create your own hook, copy one of
          these or create a new file with the desired hook name (e.g., <code>pre-commit</code>) and make it executable.
        </p>
        <p>
          Here&apos;s a basic example of a <code>.git/hooks/pre-commit</code> script using <code>bash</code> that finds
          staged JSON files and formats them. This requires a JSON formatting tool to be installed (we&apos;ll discuss
          tools next).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">
            <code>.git/hooks/pre-commit</code> (Bash Example)
          </h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            #!/bin/sh # Get list of staged files STAGED_FILES=$(git diff --cached --name-only --diff-filter=d) # Filter
            for JSON files JSON_FILES=$(echo "$STAGED_FILES" | grep '\.json') # If no JSON files are staged, exit
            successfully if [ -z "$JSON_FILES" ]; then echo "No JSON files staged. Skipping formatting." exit 0 fi echo
            "Formatting staged JSON files..." # Loop through JSON files and format them using a tool (e.g., jq) #
            Replace 'jq -S '.' "$file" &gt; "$file.tmp" && mv "$file.tmp" "$file"' with your chosen formatting command
            for file in $JSON_FILES do if [ -f "$file" ]; then # Ensure file still exists # Use 'jq -S '.' "$file" &gt;
            "$file.tmp" && mv "$file.tmp" "$file"' # or 'prettier --write "$file"' or similar echo "Formatting $file..."
            # Example using jq for pretty printing with sorted keys jq -S '.' "$file" &gt; "$file.tmp" && mv "$file.tmp"
            "$file" if [ $? -ne 0 ]; then echo "Error formatting $file. Aborting commit." exit 1 fi # Add the formatted
            file back to the staging area git add "$file" fi done echo "JSON formatting complete." exit 0
          </pre>
        </div>
        <p>
          <strong>Important:</strong> Make the script executable using <code>chmod +x .git/hooks/pre-commit</code>.
        </p>
        <p>This manual approach works but has a few drawbacks:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Hooks are local to your machine and not cloned with the repository by default.</li>
          <li>Managing multiple hooks and ensuring consistency across developers is hard.</li>
          <li>Requires manually installing formatting tools on each developer&apos;s machine.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2 text-purple-500" />
          Choosing a JSON Formatting Tool
        </h2>
        <p>
          You&apos;ll need a command-line tool that can read a JSON file and output a consistently formatted version.
          Some popular options include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              <code>jq</code>:
            </strong>{" "}
            A lightweight and flexible command-line JSON processor. It&apos;s excellent for querying, transforming, and
            also formatting JSON.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-3 overflow-x-auto">
              <h4 className="text-md font-medium mb-2">
                Example using <code>jq</code>:
              </h4>
              <pre className="bg-white p-2 rounded text-sm dark:bg-gray-900">
                echo &apos;&#x7b;"b": 2, "a": 1&#x7d;&apos; | jq &apos;.&apos;
              </pre>
              <pre className="bg-white p-2 rounded text-sm dark:bg-gray-900 mt-2">&#x7b; "b": 2, "a": 1 &#x7d;</pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <code>jq &apos;.&apos;</code> pretty-prints. <code>jq -S &apos;.&apos;</code> also sorts keys.
              </p>
            </div>
          </li>
          <li>
            <strong>
              <code>prettier</code>:
            </strong>{" "}
            A widely-used opinionated code formatter that supports many languages, including JSON. If you&apos;re
            already using Prettier, adding JSON support is straightforward.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-3 overflow-x-auto">
              <h4 className="text-md font-medium mb-2">
                Example using <code>prettier</code>:
              </h4>
              <pre className="bg-white p-2 rounded text-sm dark:bg-gray-900">prettier --write path/to/your.json</pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                The <code>--write</code> flag formats the file in place.
              </p>
            </div>
          </li>
          <li>
            <strong>Built-in Language Tools:</strong> Many languages have built-in JSON libraries that can be used for
            formatting from the command line. E.g., Python&apos;s <code>json.tool</code>, Node.js&apos;s{" "}
            <code>JSON.stringify</code>.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-3 overflow-x-auto">
              <h4 className="text-md font-medium mb-2">Example using Python:</h4>
              <pre className="bg-white p-2 rounded text-sm dark:bg-gray-900">
                cat path/to/your.json | python -m json.tool
              </pre>
            </div>
          </li>
        </ul>
        <p>
          Choose the tool that best fits your project&apos;s existing toolchain and your specific formatting needs
          (e.g., sorting keys, indentation style).
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="mr-2 text-teal-500" />
          Using a Pre-commit Framework (Recommended)
        </h2>
        <p>
          To overcome the limitations of manual hooks, consider using a pre-commit framework. These tools manage hooks
          for you, making them easy to install, update, and share across a team. Popular options include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              <code>pre-commit</code> (Python package):
            </strong>{" "}
            A powerful and widely adopted framework configured via a <code>.pre-commit-config.yaml</code> file. It
            automatically installs tools (like <code>jq</code> or <code>prettier</code>) in isolated environments.
          </li>
          <li>
            <strong>
              <code>husky</code> (Node.js package):
            </strong>{" "}
            If your project is Node.js-based, Husky allows you to easily configure Git hooks in your{" "}
            <code>package.json</code>.
          </li>
        </ul>
        <p>
          Using <code>pre-commit</code> (the Python package) as an example:
        </p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>
            Install the framework (e.g., <code>pip install pre-commit</code>).
          </li>
          <li>
            Create a <code>.pre-commit-config.yaml</code> file in your repository root.
          </li>
          <li>Configure the hook for JSON formatting.</li>
          <li>
            Run <code>pre-commit install</code> in your repo to set up the Git hook.
          </li>
        </ol>
        <p>
          A <code>.pre-commit-config.yaml</code> entry using <code>prettier</code> might look like this:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium mb-3">
            <code>.pre-commit-config.yaml</code> (Example)
          </h3>
          <pre className="bg-white p-3 rounded text-sm dark:bg-gray-900">
            repos: - repo: https://github.com/pre-commit/pre-commit-hooks rev: v4.5.0 # Use the latest version hooks: -
            id: end-of-file-fixer # Example: ensures files end with a newline - id: trailing-whitespace # Example:
            removes trailing whitespace - repo: https://github.com/prettier/prettier # Prettier hook rev: 3.2.5 # Use
            the latest version hooks: - id: prettier files: \.json$ # Target only .json files # Add any additional
            Prettier arguments here, e.g. --print-width=100
          </pre>
        </div>
        <p>
          This configuration tells <code>pre-commit</code> to use the official Prettier hook and apply it only to files
          ending in <code>.json</code>. Frameworks like this handle installing Prettier (or other tools) in an isolated
          environment, ensuring all developers use the same version and configuration.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2 text-red-500" />
          Cautions and Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Performance:</strong> For very large JSON files, running a formatter on every commit might become
            slow. Consider if the formatting is strictly necessary for extremely large, machine-generated files.
          </li>
          <li>
            <strong>Format Staged Files Only:</strong> Ensure your hook only formats files that have been explicitly
            added to the staging area (`git add`). This prevents unexpected modifications to files you weren&apos;t
            intending to commit. Most frameworks handle this correctly, and the manual script example above filters
            staged files.
          </li>
          <li>
            <strong>Provide Feedback:</strong> Your hook script should output messages indicating which files are being
            formatted or if errors occur, so the developer understands what&apos;s happening during the commit.
          </li>
          <li>
            <strong>Error Handling:</strong> If the formatting tool fails (e.g., due to invalid JSON syntax), the hook
            should exit with a non-zero status to abort the commit and alert the user.
          </li>
          <li>
            <strong>Configuration:</strong> Use a shared configuration file for your formatter (e.g.,{" "}
            <code>.prettierrc</code>) to ensure consistency when using tools like Prettier. Frameworks help enforce this
            configuration.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Check className="mr-2 text-green-500" />
          Conclusion
        </h2>
        <p>
          Automating JSON formatting with Git pre-commit hooks is an effective way to enforce consistency and improve
          the maintainability of your codebase. While a basic manual script provides a starting point, using a dedicated
          pre-commit framework is highly recommended for ease of installation, shared configuration, and managing
          multiple hooks. By integrating JSON formatting into your Git workflow, you ensure cleaner commits and reduce
          friction during development and code reviews.
        </p>
      </div>
    </>
  );
}
