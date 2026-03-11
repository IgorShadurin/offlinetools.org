import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Read JSON in Jenkins Pipeline with readJSON",
  description:
    "Read JSON in Jenkins Pipeline using readJSON or Groovy JsonSlurper, with practical examples for files, parameters, API payloads, and troubleshooting.",
};

const readJsonFileExample = `pipeline {
    agent any

    stages {
        stage('Load config') {
            steps {
                checkout scm

                script {
                    def cfg = readJSON file: 'ci/config.json', returnPojo: true

                    if (!cfg.deploy?.environment) {
                        error('ci/config.json is missing deploy.environment')
                    }

                    echo "Deploy environment: \${cfg.deploy.environment}"
                    echo "Services: \${cfg.services.join(', ')}"
                }
            }
        }
    }
}`;

const readJsonParameterExample = `pipeline {
    agent any

    parameters {
        text(
            name: 'OVERRIDES_JSON',
            defaultValue: '{\\n  "deploy": { "environment": "staging" },\\n  "dryRun": true\\n}',
            description: 'Optional JSON overrides'
        )
    }

    stages {
        stage('Apply overrides') {
            steps {
                script {
                    def overrides = readJSON text: params.OVERRIDES_JSON, returnPojo: true

                    echo "Dry run: \${overrides.dryRun}"
                    echo "Environment: \${overrides.deploy.environment}"
                }
            }
        }
    }
}`;

const jsonSlurperFallbackExample = `pipeline {
    agent any

    stages {
        stage('Load config without readJSON') {
            steps {
                checkout scm

                script {
                    def raw = readFile('ci/config.json')
                    def cfg = new groovy.json.JsonSlurper().parseText(raw) as Map

                    echo "Deploy environment: \${cfg.deploy.environment}"
                }
            }
        }
    }
}`;

export default function JenkinsJsonConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        Jenkins Pipeline JSON Configuration Techniques
      </h1>

      <div className="space-y-6">
        <p>
          If you need to read JSON in a Jenkins Pipeline, the usual answer is <code>readJSON</code>. It is the
          Jenkins pipeline step designed for this job, and it handles the two cases most teams actually have: loading a
          JSON file from the workspace and parsing a JSON string from a parameter, API response, or shell command.
        </p>
        <p>
          The important distinction is that you do not write the Jenkinsfile itself in JSON. You keep the pipeline in
          Groovy, then parse JSON as configuration or runtime data. When the <code>readJSON</code> step is not
          available, Groovy&apos;s <code>JsonSlurper</code> is the clean fallback.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Quick Answer: readJSON, JsonSlurper, or jq?
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Use <code>readJSON file:</code></strong> when the JSON lives in your repo or is created in the
            build workspace.
          </li>
          <li>
            <strong>Use <code>readJSON text:</code></strong> when JSON comes from a Jenkins parameter, an API response,
            or command output.
          </li>
          <li>
            <strong>Add <code>returnPojo: true</code></strong> when you want plain Groovy-friendly{" "}
            <code>LinkedHashMap</code> and <code>ArrayList</code> objects instead of json-lib objects.
          </li>
          <li>
            <strong>Use <code>JsonSlurper</code></strong> when the Pipeline Utility Steps plugin is not installed or
            you want a plugin-free fallback.
          </li>
          <li>
            <strong>Use <code>jq</code> or Python on the agent</strong> only for heavy filtering, reshaping, or very
            large JSON payloads where shell tools are a better fit than Groovy.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Use readJSON First for Most Jenkins Pipelines
        </h2>
        <p>
          The <code>readJSON</code> step comes from the Pipeline Utility Steps plugin, not Jenkins core. Current
          Jenkins documentation shows that it accepts either <code>file</code> or <code>text</code> input, and
          <code> returnPojo: true</code> converts the result into plain Java collections. That is usually the easiest
          form to work with inside Declarative <code>script</code> blocks, Scripted Pipeline, and shared library code.
        </p>
        <p>
          For repo-backed configuration, the path is relative to the workspace. That means you normally need to check
          out the repository before trying to read the JSON file.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Read JSON File from the Workspace</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is the most common pattern when a project keeps deployment or build settings in version control.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{readJsonFileExample}</pre>
          </div>
        </div>

        <p>
          This pattern is usually better than hardcoding values in the Jenkinsfile because the JSON can be reviewed,
          versioned, and validated outside Jenkins. It also matches common search intent such as &quot;read json
          jenkins&quot; and &quot;jenkins pipeline read json&quot;: read a file, turn it into a map, and fail fast if a
          required key is missing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Parse JSON Parameters and API Payloads with readJSON text
        </h2>
        <p>
          When JSON is not stored as a file, use <code>readJSON text:</code>. A Jenkins <code>text</code> parameter is
          a better fit than a single-line string parameter because it is easier to paste, review, and edit valid JSON
          in the job UI.
        </p>
        <p>
          The same technique works for API responses. If another step gives you a JSON string, parse it with
          <code> readJSON text: responseBody, returnPojo: true</code> and then access fields exactly as you would from a
          file-backed config object.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Read JSON from a Jenkins Parameter</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{readJsonParameterExample}</pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Fallback: readFile Plus JsonSlurper
        </h2>
        <p>
          If you see <code>No such DSL method &apos;readJSON&apos;</code>, your controller probably does not have the
          Pipeline Utility Steps plugin available to that job. In that case, the simplest fallback is to read the file
          as text and parse it with Groovy&apos;s built-in <code>JsonSlurper</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Plugin-Free JSON Parsing</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{jsonSlurperFallbackExample}</pre>
          </div>
        </div>

        <p>
          This fallback is also useful in shared library helpers when you want to stay close to standard Groovy. The
          tradeoff is that you lose the convenience of the dedicated Jenkins step and need to manage file reading
          yourself.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Common Problems and Fixes</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong><code>readJSON</code> is not recognized:</strong> Install or update the Pipeline Utility Steps
            plugin. The step is not part of Jenkins core.
          </li>
          <li>
            <strong>The file cannot be found:</strong> The <code>file</code> argument is resolved relative to the
            workspace, so make sure the repository has been checked out and the path matches the workspace layout.
          </li>
          <li>
            <strong>JSON pasted into parameters fails to parse:</strong> Use a <code>text</code> parameter, avoid
            trailing commas, and validate the JSON before saving the job or triggering the build.
          </li>
          <li>
            <strong>Keys are missing at runtime:</strong> Validate required fields explicitly and call
            <code> error()</code> with a clear message instead of letting a null value fail later in deployment logic.
          </li>
          <li>
            <strong>The payload is large or heavily nested:</strong> Offload expensive filtering to <code>jq</code> or
            a small Python script on the agent instead of writing large Groovy transformations in the Jenkinsfile.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Practical Guidance</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Do not store secrets in JSON files committed to Git.</strong> Keep tokens, passwords, and API keys
            in Jenkins Credentials and merge them into runtime configuration only when the pipeline runs.
          </li>
          <li>
            <strong>Prefer <code>returnPojo: true</code> when using <code>readJSON</code>.</strong> Plain maps and
            lists are easier to inspect, pass around, and test in pipeline code.
          </li>
          <li>
            <strong>Keep the Jenkinsfile thin.</strong> Put stable configuration in JSON, validate it early, then
            extract only the few values the stage actually needs.
          </li>
          <li>
            <strong>Log carefully.</strong> Pretty-printing JSON is helpful for debugging, but only for non-sensitive
            fields that are safe to expose in build logs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For most teams, the best current answer to &quot;how do I read JSON in Jenkins?&quot; is still
          <code> readJSON file:</code> for workspace files and <code>readJSON text:</code> for parameters or API
          responses, usually with <code>returnPojo: true</code>. If that step is unavailable, <code>readFile</code> plus
          <code> JsonSlurper</code> gives you a reliable fallback without changing the overall pipeline design.
        </p>
      </div>
    </>
  );
}
