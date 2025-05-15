import type { Metadata } from "next";
import {
  CheckCircle,
  Code,
  FileJson,
  GitBranch,
  Workflow,
  Settings,
  Wrench, // Corrected import from Tool to Wrench
  Bug,
  Lock,
  FileCheck, // Using FileCheck as a replacement for Schema icon
  Terminal,
  Github,
  Gitlab,
  ServerCog,
  BookCheck,
  Rocket,
  ShieldCheck,
} from "lucide-react"; // Only use imported icons

export const metadata: Metadata = {
  title: "Validating JSON Files in CI/CD Workflows | Developer Guide",
  description:
    "Learn how to effectively validate JSON files within your CI/CD pipelines to catch errors early and ensure data consistency.",
};

export default function ValidateJsonInCiCdArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <CheckCircle className="text-green-500" size={30} />
        <span>Validating JSON Files in CI/CD Workflows</span>
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format used for configuration, data exchange, APIs,
          and more. As projects grow and teams collaborate, managing and maintaining JSON files becomes crucial.
          Mistakes in syntax or structure can lead to runtime errors, unexpected behavior, or even security vulnerabilities.
          Integrating automated validation of JSON files into your CI/CD (Continuous Integration/Continuous Deployment)
          workflows is a proactive measure to catch these issues early, long before they impact users or production systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Workflow size={24} />
          <span>Why Validate JSON in CI/CD?</span>
        </h2>
        <p>
          CI/CD pipelines are designed to automate the steps from code commit to deployment, including building, testing,
          and deploying applications. Adding JSON validation to this process provides several key benefits:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <Bug size={20} className="text-blue-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Early Error Detection:</strong> Catch syntax errors (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Invalid Syntax</code>) or structural
              inconsistencies (related to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Schema</code>) as soon as code is committed, preventing failed builds or later-stage issues.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <BookCheck size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Ensuring Data Consistency:</strong> For configuration files or data schemas used across multiple services,
              validation ensures that changes adhere to expected formats, maintaining compatibility.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Rocket size={20} className="text-purple-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Preventing Deployment Issues:</strong> Invalid JSON used at runtime could crash applications or services. Validating in CI/CD
              significantly reduces the risk of deploying faulty configurations or data.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <ShieldCheck size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Improving Security:</strong> While not a primary security control, valid data formats are a prerequisite for
              preventing certain types of parsing vulnerabilities. Consistent data formats can also help in writing more secure application logic.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <FileJson size={24} />
          <span>Types of JSON Validation</span>
        </h2>
        <p>There are generally two levels of validation you can perform:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <Code size={20} className="text-gray-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Syntax Validation:</strong> This is the most basic check. It ensures the file is well-formed according to the JSON specification &mdash; checking for correct comma placement, proper quoting, valid escape sequences, etc.
              An invalid JSON file cannot be parsed by standard JSON parsers.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <FileCheck size={20} className="text-orange-500 flex-shrink-0 mt-1" /> {/* Using FileCheck */}
            <span>
              <strong>Schema Validation:</strong> This goes beyond syntax to check the structure, data types, required properties, and allowed values within the JSON data against a predefined schema (like a JSON Schema). This is crucial for data consistency and API contracts.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Wrench size={24} /> {/* Corrected icon usage */}
          <span>Tools for JSON Validation</span>
        </h2>
        <p>Various tools are available for both syntax and schema validation:</p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Terminal size={20} />
          <span>Command-Line Syntax Validators</span>
        </h3>
        <p>Simple command-line tools are often sufficient for basic syntax checks:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong><code>jq</code>:</strong> A powerful command-line JSON processor. You can use it to parse and pretty-print, which will implicitly fail on invalid JSON syntax.
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
              <code>jq . your_file.json &gt; /dev/null</code>
            </pre>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              This command attempts to parse the file and pipe the output to null. It will exit with a non-zero status code if the JSON is invalid.
            </p>
          </li>
          <li>
            <strong><code>jsonlint</code>:</strong> A dedicated command-line JSON validator. Often available via package managers or npm.
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
              <code>jsonlint your_file.json</code>
            </pre>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              This tool specifically checks for syntax errors and provides helpful error messages.
            </p>
          </li>
          <li>
            <strong>Built-in tools (Node.js, Python, etc.):</strong> Many languages have built-in JSON parsers. You can write a simple script to load your JSON files.
            <h4 className="font-mono text-sm mb-1">Node.js example</h4>
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
              {`try &#x7b;
  JSON.parse(require('fs').readFileSync('your_file.json', 'utf8'));
  console.log('JSON is valid');
&#x7d; catch (e) &#x7b;
  console.error('JSON validation failed:', e.message);
  process.exit(1); // Exit with error code
&#x7d;`}
            </pre>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A simple script like this can be executed in the CI pipeline.
            </p>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <FileCheck size={20} /> {/* Using FileCheck */}
          <span>JSON Schema Validators</span>
        </h3>
        <p>For schema validation, you&apos;ll need a schema definition and a validator library/tool that understands the JSON Schema specification:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>JSON Schema:</strong> A standard for describing the structure and constraints of JSON data. You define your expected data format in a JSON Schema file.
          </li>
          <li>
            <strong>Validator Libraries/CLI Tools:</strong> Numerous libraries exist across various languages (e.g., <code>ajv</code> for JavaScript/Node.js, <code>jsonschema</code> for Python, etc.) that can validate a JSON file against a JSON Schema. Many provide command-line interfaces suitable for CI/CD.
            <h4 className="font-mono text-sm mb-1">Example using ajv-cli (install via npm install -g ajv-cli)</h4>
            <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
              <code>ajv validate -s your_schema.json -d your_data.json</code>
            </pre>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              This command uses the <code>ajv-cli</code> tool to validate <code>your_data.json</code> against <code>your_schema.json</code>. It will output validation errors and exit with a non-zero code on failure.
            </p>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <GitBranch size={24} />
          <span>Integrating Validation into CI/CD</span>
        </h2>
        <p>
          The core idea is to add a step in your CI/CD pipeline that executes the chosen validation command(s) for the relevant JSON files in your repository.
          If any validation fails (the command exits with a non-zero status code), the pipeline step should fail, which in turn fails the overall build or workflow.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Github size={20} />
          <span>Example: GitHub Actions</span>
        </h3>
        <p>
          In a <code>.github/workflows/ci.yml</code> file, you might add a step like this after checking out the code:
        </p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
          {`name: CI Pipeline

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Node.js (for ajv-cli or jsonlint)
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Install JSON Validation Tools
      run: npm install -g ajv-cli jsonlint

    - name: Find and Validate all JSON files (Syntax)
      run: |
        find . -name '*.json' -print0 | while IFS= read -r -d '' file; do
          echo "Validating syntax of $file"
          jsonlint "$file" || exit 1
        done

    - name: Validate Specific Data Files (Schema)
      run: |
        echo "Validating data/config.json against schema"
        ajv validate -s ./your_schema.json -d ./data/config.json || exit 1

    # ... other build, test, deploy steps ...
`}
        </pre>

        <h3 className="text-xl font-semibold mt-6 flex items-center space-x-2">
          <Gitlab size={20} />
          <span>Example: GitLab CI</span>
        </h3>
        <p>
          In a <code>.gitlab-ci.yml</code> file:
        </p>
        <pre className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 mt-2 overflow-x-auto">
          {`stages:
  - validate
  - build
  # ... other stages ...

validate_json:
  stage: validate
  image: node:latest # Use an image with Node.js, or install tools
  before_script:
    - npm install -g ajv-cli jsonlint # Install tools if not in image
  script:
    - echo "Validating all JSON files for syntax"
    - find . -name '*.json' -print0 | while IFS= read -r -d '' file; do
      echo "Validating syntax of $file"
      jsonlint "$file" || exit 1
      done
    - echo "Validating data/config.json against schema"
    - ajv validate -s ./your_schema.json -d ./data/config.json || exit 1
  # rules:
  #   - changes:
  #     - "**/*.json"

# ... other jobs ...
`}
        </pre>
        <p>
          The specific syntax for other CI/CD platforms (Jenkins, CircleCI, Azure DevOps, etc.) will vary,
          but the fundamental approach is the same: execute validation commands as a step in the pipeline
          and rely on their exit codes to determine success or failure.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings size={24} />
          <span>Best Practices for CI/CD Validation</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start space-x-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Validate Early:</strong> Place validation steps near the beginning of your pipeline. Catching errors immediately saves computation resources and developer time.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <BookCheck size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Document Your Schemas:</strong> If using schema validation, keep your schemas well-documented and in version control alongside your code.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <FileCheck size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Validate Specific Files:</strong> Instead of validating *all* <code>.json</code> files if you only care about certain ones (e.g., configuration files), target validation to those specific paths.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <ServerCog size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Consider Large Files:</strong> For very large JSON files, validation can take time and resources. Optimize the process or consider if full validation is needed on every change for such files.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Lock size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span>
              <strong>Security Implications:</strong> Be mindful of validating untrusted user-provided JSON if that&apos;s part of your workflow. While syntax validation is generally safe, processing untrusted data against a complex schema could theoretically have performance implications. Validation should always happen on the server-side for untrusted input.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <CheckCircle size={24} />
          <span>Conclusion</span>
        </h2>
        <p>
          Validating JSON files in your CI/CD pipeline is a simple yet powerful practice. It leverages automation to
          enforce data integrity and syntax correctness, significantly reducing the risk of deploying faulty code or configurations.
          By integrating readily available command-line tools or language-specific validators, you can add a robust
          layer of quality control to your development workflow, leading to more reliable applications and a smoother deployment process.
        </p>
      </div>
    </>
  );
}