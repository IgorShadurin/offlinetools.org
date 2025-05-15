import type { Metadata } from "next";
import { FileJson2, Cog, CircleCheck, CircleX, Github, Wrench, GitPullRequest } from 'lucide-react';

export const metadata: Metadata = {
  title: "GitHub Actions for Automated JSON Formatting and Validation | Offline Tools",
  description: "Learn how to use GitHub Actions to automatically format and validate JSON files in your repository.",
};

export default function GithubActionsJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Cog className="w-8 h-8 mr-3 text-blue-600" />
        GitHub Actions for Automated JSON Formatting and Validation
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          In modern software development, configuration files, data payloads, and API responses often rely heavily on JSON. Maintaining consistency in JSON formatting and ensuring its validity across a project is crucial for readability, preventing errors, and smooth collaboration, especially in teams. Manually checking and formatting JSON before committing can be tedious and error-prone. This is where automation comes in, and GitHub Actions provide a powerful way to enforce these standards directly within your version control workflow.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Github className="w-7 h-7 mr-2 text-gray-700 dark:text-gray-300" />
            Why Automate with GitHub Actions?
        </h2>
        <p>
          GitHub Actions allow you to automate tasks in response to GitHub events like pushes, pull requests, and merges. By integrating JSON formatting and validation into your CI/CD pipeline, you gain several key benefits:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Consistency:</span> Ensure all JSON files adhere to a predefined style guide (e.g., indentation, spacing, key ordering if using a powerful formatter).
          </li>
          <li>
            <span className="font-medium">Early Error Detection:</span> Catch syntax errors, invalid structures, or incorrect formatting before they are merged into the main branch, saving debugging time later.
          </li>
          <li>
            <span className="font-medium">Improved Code Review:</span> Code reviews can focus on logic and content rather than formatting issues.
          </li>
          <li>
            <span className="font-medium">Reduced Cognitive Load:</span> Developers don&apos;t have to remember to manually run formatting/validation tools.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Wrench className="w-7 h-7 mr-2 text-yellow-600" />
            Setting Up Your Workflow
        </h2>
        <p>
          GitHub Actions workflows are defined in YAML files located in the `.github/workflows` directory at the root of your repository. A workflow consists of one or more jobs, and each job has a series of steps that are executed on a runner (a virtual machine hosted by GitHub or self-hosted).
        </p>
        <p>
          For our purpose, we&apos;ll create a simple workflow that runs whenever changes are pushed or a pull request is opened targeting your main branch (e.g., `main` or `master`). The workflow will check out the code, set up the necessary environment, and then run formatting and validation tools.
        </p>

        <h3 className="text-xl font-semibold mt-6">Workflow Trigger</h3>
        <p>
          You&apos;ll typically want to run JSON checks on `push` and `pull_request` events.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
{`on:
  push:
    branches: [ main, master ] # Adjust branches as needed
  pull_request:
    branches: [ main, master ] # Adjust branches as needed`}
            </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Jobs and Steps</h3>
        <p>
          A single job is usually sufficient for this task. Inside the job, you&apos;ll define steps using standard GitHub Actions actions or running command-line scripts.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <FileJson2 className="w-7 h-7 mr-2 text-green-600" />
            Example 1: Using <code>jsonlint</code>
        </h2>
        <p>
          <code>jsonlint</code> is a simple command-line tool for validating and formatting JSON. It&apos;s a good choice for basic syntax checking.
        </p>
        <p>
          First, ensure you have Node.js set up in your workflow, as <code>jsonlint</code> is an npm package.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2"><code>.github/workflows/json-check.yml</code></h4>
            <pre>
{`name: JSON Check

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  validate-and-format-check:
    runs-on: ubuntu-latest # Use a standard runner

    steps:
    - name: Checkout code
      uses: actions/checkout@v4 # Action to get your code

    - name: Setup Node.js
      uses: actions/setup-node@v4 # Action to set up Node.js
      with:
        node-version: '20' # Specify Node.js version

    - name: Install jsonlint
      run: npm install -g jsonlint # Install jsonlint globally

    - name: Validate JSON files
      run: |
        find . -name '*.json' -print0 | xargs -0 jsonlint -q # Find all JSON and validate quietly
      # The -q flag makes jsonlint output nothing on success, and error messages on failure.
      # xargs -0 handles filenames with spaces or special characters.

    - name: Check JSON Formatting
      run: |
        find . -name '*.json' -print0 | xargs -0 -I {} sh -c 'jsonlint -f "{}" | diff - "{}"' # Format and diff
      # This formats each file and compares it to the original.
      # If diff finds differences (exit code 1), the command fails.
      # -I {} tells xargs to replace {} with the filename in the command.
      # sh -c is used to execute multiple commands (jsonlint and diff) for each file found by find.
      # Note: This check might be tricky with empty files or specific jsonlint output nuances.
      # A common alternative is using a dedicated tool like Prettier (see next example).
`}
            </pre>
        </div>
        <p>
          In this example, the workflow first checks out the code and sets up Node.js. It then installs <code>jsonlint</code>. The &quot;Validate JSON files&quot; step uses <code>find</code> and <code>xargs</code> to run <code>jsonlint -q</code> on every <code>.json</code> file found. If any file is invalid, <code>jsonlint -q</code> exits with a non-zero status, causing the step and thus the job to fail <CircleX className="inline w-5 h-5 text-red-600" />. The &quot;Check JSON Formatting&quot; step attempts to format each file and then uses <code>diff</code> to compare the formatted output to the original file. If there&apos;s a difference, it means the file wasn&apos;t correctly formatted, and the step fails <CircleX className="inline w-5 h-5 text-red-600" />. If all checks pass, the job completes successfully <CircleCheck className="inline w-5 h-5 text-green-600" />.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Wrench className="w-7 h-7 mr-2 text-yellow-600" />
            Example 2: Using Prettier
        </h2>
        <p>
          <a href="https://prettier.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Prettier</a> is a widely used opinionated code formatter that supports JSON among many other languages. It&apos;s generally more robust and configurable for formatting than simple tools like <code>jsonlint -f</code>.
        </p>
        <p>
          If your project already uses Prettier, you likely have it as a dev dependency. If not, you&apos;d install it.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h4 className="text-lg font-medium mb-2"><code>.github/workflows/prettier-json-check.yml</code></h4>
            <pre>
{`name: Prettier JSON Check

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  prettier-check:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    # If Prettier is a project dependency (recommended)
    - name: Install dependencies
      run: npm ci # Use npm ci for CI/CD environments

    # If Prettier is NOT a project dependency, install it globally just for the action
    # - name: Install Prettier (Global)
    #   run: npm install -g prettier

    - name: Run Prettier Check for JSON files
      # Use npx if Prettier is a project dependency
      run: npx prettier --check "**/*.json" --ignore-path .gitignore
      # Use global prettier if installed globally
      # run: prettier --check "**/*.json" --ignore-path .gitignore
      # The --check flag makes Prettier exit with a non-zero status if files need formatting.
      # "**/*.json" targets all .json files recursively.
      # --ignore-path .gitignore respects your .gitignore file for files to skip.
`}
            </pre>
        </div>
        <p>
          This workflow is similar, but instead of <code>jsonlint</code>, it uses <code>npx prettier --check</code>. The <code>--check</code> flag is designed specifically for CI environments; it compares the files to how Prettier would format them and exits with an error code if any files differ, or if there are syntax errors that prevent formatting. This single command handles both validation (indirectly, as unparseable JSON can cause Prettier to fail) and formatting checks <CircleCheck className="inline w-5 h-5 text-green-600" /> <CircleX className="inline w-5 h-5 text-red-600" />. Using <code>npx</code> is recommended as it runs the version of Prettier installed in your project&apos;s <code>node_modules</code>, ensuring consistency with local development.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <GitPullRequest className="w-7 h-7 mr-2 text-purple-600" />
            Integrating with Pull Requests
        </h2>
        <p>
          Running these checks on pull requests is highly effective. If the GitHub Action job fails, the pull request will show a failed status check. You can configure branch protection rules in your GitHub repository settings to require this check to pass before a pull request can be merged. This ensures that no ill-formatted or invalid JSON makes it into your main branch.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Cog className="w-7 h-7 mr-2 text-blue-600" />
            Checking vs. Auto-Fixing and Committing
        </h2>
        <p>
          The examples above use the &quot;check&quot; approach: the workflow fails if JSON is not formatted/valid, and the developer must fix it locally and push a new commit. This is generally the preferred method as it keeps the responsibility of correct code on the developer and avoids the complexity of giving the GitHub Actions runner commit permissions.
        </p>
        <p>
          An alternative is to have the workflow automatically format/validate the JSON and commit the changes back to the branch. While possible, this adds complexity:
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li>You need to configure Git in the action runner.</li>
            <li>You need to grant the action permissions to write to the repository (e.g., using a Personal Access Token or <code>GITHUB_TOKEN</code> with appropriate scopes).</li>
            <li>It creates automatic commits, which some teams might find noisy.</li>
        </ul>
        <p>
          For most use cases, simply failing the check and notifying the developer is sufficient and easier to maintain.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <Cog className="w-7 h-7 mr-2 text-blue-600" />
            Tips and Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Specify Files:</span> Instead of checking *all* <code>.json</code> files, you might want to target specific directories or files if your repo contains external JSON or build artifacts you don&apos;t want to check. Adjust the <code>find</code> command or Prettier patterns (<code>&quot;**/*.json&quot;</code>) accordingly.
          </li>
          <li>
            <span className="font-medium">Use <code>.gitignore</code> / Ignore Files:</span> Both <code>find</code> (with exclusions) and Prettier&apos;s <code>--ignore-path</code> flag allow you to skip files or directories listed in your <code>.gitignore</code>, which is essential for avoiding checks on generated files.
          </li>
          <li>
            <span className="font-medium">Monorepos:</span> In a monorepo, you might only want to run the check if JSON files within specific projects have changed. You can use GitHub Actions features like <code>paths</code> filtering in the <code>on</code> trigger or check for changed files within the job.
          </li>
          <li>
            <span className="font-medium">Combine with Linting:</span> If you have other linting rules (like ESLint for JS/TS), consider combining the JSON check into a single &quot;Lint&quot; job in your workflow file.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
            <CircleCheck className="w-7 h-7 mr-2 text-green-600" />
            Conclusion
        </h2>
        <p>
          Automating JSON formatting and validation with GitHub Actions is a straightforward process that significantly improves code quality and developer workflow. By adding a simple YAML file to your repository, you can enforce consistent standards and catch potential errors early in the development cycle. Whether you choose a lightweight tool like <code>jsonlint</code> or a more comprehensive formatter like Prettier, the principle is the same: let automation handle the mundane checks so your team can focus on building features. Implement these checks today and streamline your JSON handling!
        </p>
      </div>
    </>
  );
}
