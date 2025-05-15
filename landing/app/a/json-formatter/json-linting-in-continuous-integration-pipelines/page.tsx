import type { Metadata } from "next";
import {
  CheckCircle,
  AlertTriangle,
  Code,
  GitBranch,
  Workflow,
  Settings, // Replaced Tool with Settings
  FileJson2,
  Terminal,
  RefreshCcw
} from "lucide-react"; // Using only allowed icons

export const metadata: Metadata = {
  title: "JSON Linting in Continuous Integration Pipelines | Your Site Name",
  description:
    "Learn why and how to implement JSON linting in your CI/CD pipelines to catch errors early and maintain configuration consistency.",
};

export default function JsonLintingInCiArticle() {
  return (
    <>
      {/* Article Title */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FileJson2 className="size-8 text-blue-500" /> JSON Linting in Continuous Integration Pipelines
      </h1>

      {/* Introduction */}
      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is ubiquitous in modern software development, used for
          configuration files, API payloads, data storage, and more. While its simple structure makes it
          easy to read and write, even small syntax errors or formatting inconsistencies can lead to
          significant issues – from failed deployments to runtime errors. This is where JSON linting comes
          in, especially when integrated into your Continuous Integration (CI) pipelines.
        </p>
        <p>
          This article explores the importance of linting your JSON files within your CI/CD workflow and
          provides practical examples of how to implement it, helping developers of all levels ensure
          the reliability and consistency of their JSON data.
        </p>

        {/* Why Lint JSON? */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <AlertTriangle className="size-6 text-yellow-500" /> Why Lint Your JSON Files?
        </h2>
        <p>
          Just like linting your code helps catch potential bugs and style issues before they hit production,
          linting JSON provides several key benefits:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Catch Syntax Errors Early:</strong> Prevent common mistakes like missing commas,
            unquoted keys, incorrect data types, or trailing commas (depending on the JSON standard being enforced).
            A malformed JSON file can break applications or configuration loaders.
          </li>
          <li>
            <strong>Enforce Formatting Consistency:</strong> Maintain a standard style across all JSON files in your project
            (e.g., indentation, key sorting, spacing). Consistent formatting makes files easier to read,
            understand, and compare (reducing merge conflicts).
          </li>
          <li>
            <strong>Prevent Deployment Failures:</strong> Many deployment processes rely on JSON configuration.
            A syntax error in a deployment file can cause the entire process to fail, wasting time and resources.
          </li>
          <li>
            <strong>Improve Data Reliability:</strong> For JSON data files (like feature flags or API mocks),
            linting ensures the data structure is valid, even before it's consumed by an application.
          </li>
        </ul>

        {/* What is CI/CD and Why Lint There? */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Workflow className="size-6 text-teal-500" /> JSON Linting in the CI Pipeline
        </h2>
        <p>
          Continuous Integration (CI) is the practice of merging all developers' working copies to a shared main branch
          multiple times a day. Continuous Delivery/Deployment (CD) extends this by automating the process of getting
          all code changes from build to production.
        </p>
        <p>
          Integrating JSON linting into your CI pipeline means that every time a developer commits code or
          opens a pull request, an automated check runs. If any JSON file fails the linting rules (either
          syntax or style), the pipeline step fails, blocking the merge or deployment.
        </p>
        <p>
          This &quot;fail fast&quot; approach is crucial. It&apos;s much cheaper and easier to fix a JSON syntax error
          when a developer is actively working on the code than hours or days later when a deployment fails.
        </p>

        {/* Common JSON Issues Caught by Linting */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="size-6 text-purple-500" /> Common Issues Linting Catches
        </h2>
        <p>JSON linters are designed to identify violations of the JSON specification and common style guides. Some typical problems they flag include:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Syntax Errors:</strong>
            <ul className="list-circle pl-6 mt-1 space-y-1">
              <li>Missing commas between items or properties.</li>
              <li>Unquoted or incorrectly quoted keys.</li>
              <li>Trailing commas (e.g., `[&quot;a&quot;, &quot;b&quot;,]` - invalid in strict JSON).</li>
              <li>Invalid escape sequences in strings.</li>
              <li>Using single quotes instead of double quotes for strings or keys.</li>
            </ul>
          </li>
          <li><strong>Formatting Issues:</strong>
             <ul className="list-circle pl-6 mt-1 space-y-1">
                <li>Incorrect indentation or inconsistent spacing.</li>
                <li>Extra whitespace.</li>
             </ul>
          </li>
          <li><strong>Invalid JSON Types:</strong>
             <ul className="list-circle pl-6 mt-1 space-y-1">
                <li>Using JavaScript constructs like `undefined`, `NaN`, or `Infinity` (which are not valid JSON values).</li>
                <li>Using comments (`//` or `/* */`) - invalid in strict JSON.</li>
             </ul>
          </li>
          <li><strong>Duplicate Keys:</strong> While technically allowed by the JSON spec (behavior is undefined), duplicate keys are often a mistake and good linters can warn about them.</li>
        </ul>

        {/* Popular JSON Linting Tools */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <Settings className="size-6 text-orange-500" /> Popular JSON Linting Tools
        </h2>
        <p>Several command-line tools and libraries exist for linting JSON. Here are a few common ones:</p>

        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Terminal className="size-5" /> `jsonlint`
            </h3>
            <p>A simple and widely used command-line utility specifically for validating JSON syntax.</p>
            <p className="mt-2"><strong>Example usage:</strong></p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                <code>
                  jsonlint path/to/your/file.json&lt;br/&gt;
                  find . -name &quot;*.json&quot; -print0 | xargs -0 jsonlint --strict --quiet
                </code>
              </pre>
            </div>
             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
               (&lt;code&gt;--strict&lt;/code&gt; flags common non-standard features like comments or trailing commas. &lt;code&gt;--quiet&lt;/code&gt; only outputs errors.)
             </p>
          </div>

           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
             <h3 className="text-xl font-medium flex items-center gap-2">
                <Code className="size-5" /> `jq`
             </h3>
             <p>While primarily a lightweight and flexible command-line JSON processor, `jq` can also be used for basic validation. If `jq . file.json` doesn&apos;t produce valid output or throws an error, the input is likely invalid JSON.</p>
             <p className="mt-2"><strong>Example usage:</strong></p>
             <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
               <pre>
                 <code>
                   jq . path/to/your/file.json &gt; /dev/null
                 </code>
               </pre>
             </div>
             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                (Redirecting output to /dev/null just checks for parsing errors without printing the processed JSON.)
             </p>
           </div>

           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
             <h3 className="text-xl font-medium flex items-center gap-2">
                <RefreshCcw className="size-5" /> Prettier (or similar code formatters)
             </h3>
             <p>Formatters like Prettier often include JSON parsing capabilities. Running them in CI with a check flag can verify both syntax and formatting against a standard.</p>
             <p className="mt-2"><strong>Example usage (with Prettier):</strong></p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
               <pre>
                 <code>
                   npx prettier --check path/to/your/file.json&lt;br/&gt;
                   npx prettier --check &quot;**/*.json&quot;
                 </code>
               </pre>
             </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                (&lt;code&gt;--check&lt;/code&gt; makes Prettier exit with a non-zero status if files are not formatted correctly.)
              </p>
           </div>

           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
             <h3 className="text-xl font-medium flex items-center gap-2">
                <FileJson2 className="size-5" /> Language/Framework Specific Tools
             </h3>
             <p>Many programming languages or frameworks have built-in JSON parsers that can be used for validation, or specific libraries (like Python&apos;s `json` module, Node.js&apos;s `JSON.parse`, or various npm packages).</p>
             <p className="mt-2"><strong>Example usage (using Node.js):</strong></p>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
               <pre>
                 <code>
                   {`node -e "require('fs').readFile('path/to/file.json', 'utf8', (err, data) => { if (err) throw err; try { JSON.parse(data); console.log('JSON is valid.'); } catch (parseErr) { console.error('JSON is invalid:', parseErr.message); process.exit(1); } })"`}
                 </code>
               </pre>
             </div>
           </div>
        </div>


        {/* Integrating into CI */}
        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
           <GitBranch className="size-6 text-blue-500" />
           <span>Integrating Linting into Your CI Pipeline</span>
        </h2>
        <p>
          The exact steps depend on your CI provider (GitHub Actions, GitLab CI, Jenkins, CircleCI, etc.),
          but the core principle is to add a step to your workflow that runs the chosen JSON linting command
          and fails the build if the command exits with a non-zero status code (which standard command-line
          tools do upon failure).
        </p>

        <h3 className="text-xl font-semibold mt-6">General Steps:</h3>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li><strong>Install the Linter:</strong> Ensure the chosen JSON linting tool is available in your CI environment. This might involve installing a package via npm, apt, or other package managers in your CI script.</li>
          <li><strong>Add a CI Job/Step:</strong> Create a new step in your CI workflow file (e.g., `.github/workflows/ci.yml`, `.gitlab-ci.yml`, `Jenkinsfile`).</li>
          <li><strong>Run the Lint Command:</strong> Use the command-line tool to check your JSON files. Use options that ensure a non-zero exit code on failure.</li>
          <li><strong>Specify Files:</strong> Target the specific JSON files or directories you want to lint (e.g., configuration files, specific data directories).</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Example CI Snippet (Conceptual):</h3>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <p>This is a simplified example showing the core command execution. Add this within a job or step definition in your CI config.</p>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
              <pre>
                <code>
                  {`# Example using jsonlint
name: Lint JSON Files
run: |
  # Install jsonlint (example for Debian/Ubuntu)
  # apt-get update && apt-get install -y jsonlint
  # Or for Node.js projects:
  # npm install -g jsonlint # Or add as devDependency and use npx

  echo "Linting JSON files..."
  find . -name "*.json" ! -path "*/node_modules/*" -print0 | xargs -0 jsonlint --strict --quiet

# Example using Prettier --check
# Ensure Prettier is installed as a devDependency
# name: Check JSON Formatting
# run: |
#   echo "Checking JSON formatting..."
#   npx prettier --check "**/*.json"`}
                </code>
              </pre>
            </div>
             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                (The exact &lt;code&gt;find&lt;/code&gt; command might vary slightly based on your OS and files to include/exclude.)
             </p>
         </div>

         {/* Advanced Concepts */}
         <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
            <Code className="size-6 text-indigo-500" /> Beyond Basic Syntax: Schema Validation
         </h2>
         <p>
           While basic linting checks syntax and formatting, <a href="https://json-schema.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Schema</a> allows you to define the structure, data types, and constraints that your JSON data should adhere to. Integrating JSON Schema validation into your CI provides a deeper level of data integrity.
         </p>
         <p>
           Tools like <a href="https://ajv.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Ajv (Another JSON Schema validator)</a> or others in various languages can be used in a similar CI step to validate JSON files against a predefined schema file. This is particularly useful for API request/response payloads, complex configuration files, or data exchange formats.
         </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
             <h3 className="text-xl font-medium flex items-center gap-2">
                <Terminal className="size-5" /> Example Schema Validation Command (Conceptual):
             </h3>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
               <pre>
                 <code>
                   {`# Example using a conceptual schema validator tool
# (Requires installing a schema validator library and potentially writing a small script)
validate-json --schema path/to/your/schema.json path/to/data.json

# Or using a Node.js script with Ajv (executed in CI)
# node scripts/validate_config.js path/to/config.json path/to/config.schema.json`}
                 </code>
               </pre>
             </div>
         </div>


         {/* Tips for Effective Linting */}
         <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
            <CheckCircle className="size-6 text-green-500" /> Tips for Effective JSON Linting in CI
         </h2>
         <ul className="list-disc pl-6 space-y-2 my-4">
           <li><strong>Automate Everything:</strong> Ensure linting runs automatically on every push or pull request, not just before deployment.</li>
           <li><strong>Fail Fast:</strong> Configure the CI step to fail the build on *any* linting error. This provides immediate feedback.</li>
           <li><strong>Educate Your Team:</strong> Make sure all developers understand why JSON linting is enforced and how to fix common issues.</li>
           <li><strong>Start Small:</strong> If you have many JSON files, start by linting the most critical ones (e.g., deployment configs, core application settings) and gradually expand coverage.</li>
           <li><strong>Use Pre-Commit Hooks:</strong> While not strictly CI, adding a pre-commit hook that runs the JSON linter locally can catch errors even before they reach the CI pipeline, saving developers time.</li>
         </ul>


        {/* Conclusion */}
        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Integrating JSON linting into your Continuous Integration pipeline is a simple yet powerful step
          to improve the reliability and maintainability of your projects. By automating the detection
          of syntax errors and formatting inconsistencies, you catch problems earlier, prevent deployment
          failures, and ensure a consistent codebase. Whether you use a dedicated linter, a formatter
          with validation capabilities, or schema validation, making JSON linting a standard part of
          your CI workflow is a worthwhile investment for any project.
        </p>
      </div>
    </>
  );
}