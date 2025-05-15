import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jenkins Pipeline JSON Configuration Techniques",
  description: "Learn how to effectively use JSON data within Jenkins Declarative and Scripted Pipelines for configuration, parameters, and API interactions.",
};

export default function JenkinsJsonConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        Jenkins Pipeline JSON Configuration Techniques
      </h1>

      <div className="space-y-6">
        <p>
          Jenkins Pipelines, whether written in Declarative or Scripted Groovy syntax, are powerful tools for automating build, test, and deployment workflows. While the pipeline definition itself is written in Groovy, there are many scenarios where you need to work with configuration or data stored in JSON format. This article explores common techniques for incorporating and manipulating JSON data within your Jenkins Pipelines.
        </p>
        <p>
          It&apos;s important to clarify that you don&apos;t write the *entire pipeline definition* in JSON. Instead, you use JSON as a format for data or configuration that your Groovy pipeline script then processes and acts upon.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Why Use JSON in Jenkins Pipelines?
        </h2>
        <p>
          JSON is a ubiquitous data interchange format, widely used for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>API Payloads:</strong> Interacting with REST APIs to fetch data or send configuration.</li>
          <li><strong>Configuration Files:</strong> Reading application or job-specific settings from a structured file.</li>
          <li><strong>Pipeline Parameters:</strong> Accepting complex input parameters to a job as a JSON string.</li>
          <li><strong>Shared Library Data:</strong> Defining configurable behaviors for reusable pipeline code.</li>
          <li><strong>Logging and Reporting:</strong> Generating structured output for downstream processing.</li>
          </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Core Techniques for Handling JSON
        </h2>

        <h3 className="text-xl font-semibold mt-6">Using Groovy&apos;s Built-in JSON Support</h3>
        <p>
          The most common and recommended way to handle JSON directly within your Groovy pipeline script (both Declarative <code>script</code> blocks and Scripted pipelines) is using the built-in libraries available in Jenkins, primarily from the <code>groovy.json</code> package. The key classes are <code>JsonSlurper</code> for parsing JSON strings into Groovy/Java objects (Maps, Lists, primitives) and <code>JsonOutput</code> for converting Groovy/Java objects into JSON strings.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Parsing JSON String</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre dangerouslySetInnerHTML={{ __html: `pipeline {
    agent any
    stages {
        stage('Parse JSON') {
            steps {
                script {
                    def jsonString = '''
                    {
                      "name": "Jenkins Job",
                      "version": 1.5,
                      "enabled": true,
                      "tags": ["build", "deploy"],
                      "config": {
                        "timeoutSec": 300
                      }
                    }
                    '''

                    // Use JsonSlurper to parse the string
                    def slurper = new groovy.json.JsonSlurper()
                    def jsonObject = slurper.parseText(jsonString)

                    // Access parsed data
                    echo "Job Name: &#x7b;jsonObject.name&#x7d;"
                    echo "First Tag: &#x7b;jsonObject.tags[0]&#x7d;"
                    echo "Timeout: &#x7b;jsonObject.config.timeoutSec&#x7d; seconds"

                    // Check type
                    echo "Parsed data type: &#x7b;jsonObject.class.name&#x7d;" // Should be Map
                    echo "Tags type: &#x7b;jsonObject.tags.class.name&#x7d;" // Should be List
                }
            }
        }
    }
}` }} />
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Generating JSON String</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre dangerouslySetInnerHTML={{ __html: `pipeline {
    agent any
    stages {
        stage('Generate JSON') {
            steps {
                script {
                    def data = [
                        status: "success",
                        timestamp: System.currentTimeMillis(),
                        result: [
                            buildNumber: &#x7b;env.BUILD_NUMBER&#x7d;,
                            jobName: &#x7b;env.JOB_NAME&#x7d;
                        ]
                    ]

                    // Use JsonOutput to generate a JSON string
                    def jsonString = groovy.json.JsonOutput.toJson(data)
                    def prettyJsonString = groovy.json.JsonOutput.prettyPrint(jsonString)

                    echo "Generated JSON:"
                    echo &#x7b;prettyJsonString&#x7d;

                    // This JSON string can then be sent to an API or saved to a file
                    // Example (conceptual):
                    // sh "curl -X POST -H 'Content-Type: application/json' -d '&#x7b;jsonString&#x7d;' http://your-api.com/report"
                }
            }
        }
    }
}` }} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Reading JSON from Files</h3>
        <p>
          Often, configuration data is stored in a JSON file within your source code repository. You can read these files and parse their content within your pipeline.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Reading and Parsing a JSON File</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Assumes you have a file named <code>config.json</code> in your workspace.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre dangerouslySetInnerHTML={{ __html: `pipeline {
    agent any
    stages {
        stage('Read JSON File') {
            steps {
                script {
                    // Ensure you have a config.json file in your workspace
                    // e.g., echo '{"database": {"host": "localhost", "port": 5432}, "api_key": "abcdef123"}' > config.json

                    def configFile = 'config.json'

                    if (fileExists(configFile)) {
                        def jsonText = readFile(configFile)
                        def slurper = new groovy.json.JsonSlurper()
                        def config = slurper.parseText(jsonText)

                        echo "Database Host: &#x7b;config.database.host&#x7d;"
                        // Note: Be careful with sensitive data like api_key!
                        // Store secrets in Jenkins Credentials, not in files committed to Git.
                        echo "API Key (caution!): &#x7b;config.api_key&#x7d;"
                    } else {
                        error "Configuration file &#x7b;configFile&#x7d; not found!"
                    }
                }
            }
        }
    }
}` }} />
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          <strong>Security Note:</strong> Never store sensitive information like API keys, passwords, or database credentials directly in JSON files committed to source control. Use Jenkins Credentials Provider to securely manage secrets and inject them into your pipeline environment variables or script context at runtime.
        </p>


        <h3 className="text-xl font-semibold mt-6">Using JSON for Pipeline Parameters</h3>
        <p>
          For complex job inputs, defining a single String parameter and requiring users to input a JSON string is a common pattern. You can then parse this string inside the pipeline.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: JSON Input Parameter</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre dangerouslySetInnerHTML={{ __html: `pipeline {
    agent any
    parameters {
        string(
            name: 'JOB_CONFIG_JSON',
            defaultValue: '{"environment": "dev", "featureFlags": {"newUI": false, "betaMode": true}}',
            description: 'JSON configuration for the job execution'
        )
    }
    stages {
        stage('Process Parameters') {
            steps {
                script {
                    def configJsonString = params.JOB_CONFIG_JSON
                    def slurper = new groovy.json.JsonSlurper()

                    try {
                        def jobConfig = slurper.parseText(configJsonString)

                        echo "Running in environment: &#x7b;jobConfig.environment&#x7d;"
                        echo "New UI flag is: &#x7b;jobConfig.featureFlags.newUI&#x7d;"

                        if (jobConfig.featureFlags.betaMode) {
                            echo "Beta mode is enabled."
                            // Add logic for beta mode
                        } else {
                            echo "Beta mode is disabled."
                        }

                    } catch (Exception e) {
                        error "Failed to parse JOB_CONFIG_JSON parameter: &#x7b;e.getMessage()&#x7d;"
                    }
                }
            }
        }
    }
}` }} />
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Using Shell Steps with JSON Tools (jq, Python, etc.)</h3>
        <p>
          For more complex JSON transformations, validation, or querying, leveraging command-line tools like <code>jq</code> or scripting languages like Python within <code>sh</code> or <code>bat</code> steps can be highly effective. These tools are often better suited for complex text processing than Groovy&apos;s basic string manipulation.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Using jq to Extract Data</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Requires <code>jq</code> to be installed on the agent.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre dangerouslySetInnerHTML={{ __html: `pipeline {
    agent any
    stages {
        stage('Process with jq') {
            steps {
                script {
                    def jsonString = '''
                    {
                      "users": [
                        { "name": "Alice", "role": "admin" },
                        { "name": "Bob", "role": "editor" },
                        { "name": "Charlie", "role": "viewer" }
                      ]
                    }
                    '''

                    // Use jq to extract names of users with role 'admin'
                    // Pass the JSON string to jq's standard input
                    def adminName = sh(script: "echo '\\\\\$\{jsonString\}' | jq -r '.users[] | select(.role == \"admin\") | .name'", returnStdout: true).trim()

                    echo "Admin user found: &#x7b;adminName&#x7d;"
                }
            }
        }
    }
}` }} />
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Using Python for Complex Logic</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Requires Python to be installed on the agent.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre dangerouslySetInnerHTML={{ __html: `pipeline {
    agent any
    stages {
        stage('Process with Python') {
            steps {
                script {
                    def jsonString = '''
                    {
                      "items": [
                        { "id": 1, "value": 10 },
                        { "id": 2, "value": 25 },
                        { "id": 3, "value": 15 }
                      ]
                    }
                    '''

                    // Use Python to calculate the sum of values > 10
                    def pythonScript = """
import json
import sys

data = json.loads(sys.stdin.read())
total_sum = sum(item['value'] for item in data['items'] if item['value'] > 10)
print(total_sum)
"""
                    def sumResult = sh(script: "echo '\\\\\$\{jsonString\}' | python -c \"\\\\$\{pythonScript\}\"", returnStdout: true).trim()

                    echo "Sum of values > 10: &#x7b;sumResult&#x7d;"
                }
            }
        }
    }
}` }} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          Best Practices
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Handle Errors:</strong> Always wrap JSON parsing logic in <code>try-catch</code> blocks to gracefully handle malformed JSON input.</li>
          <li><strong>Validate JSON:</strong> If the JSON source is external or user-provided, consider adding validation steps (e.g., checking for required keys or data types) before proceeding.</li>
          <li><strong>Use Credentials for Secrets:</strong> As mentioned, sensitive data in JSON should be avoided in source control. Use Jenkins Credentials.</li>
          <li><strong>Keep it Readable:</strong> Use <code>JsonOutput.prettyPrint()</code> when logging JSON for debugging.</li>
          <li><strong>Choose the Right Tool:</strong> Use Groovy&apos;s <code>JsonSlurper</code>/<code>JsonOutput</code> for simple parsing/generation. Use <code>sh</code> with tools like <code>jq</code> or scripting languages for complex queries, transformations, or validation.</li>
          <li><strong>Size Matters:</strong> Be mindful of parsing very large JSON files directly in Groovy, as it consumes memory on the controller or agent. For massive files, stream processing or external tools might be more efficient.</li>
          </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While Jenkins Pipeline syntax is Groovy-based, integrating JSON data is a frequent requirement for interacting with external services, managing configurations, or handling complex parameters. By leveraging Groovy&apos;s built-in JSON libraries and external command-line tools, you can effectively incorporate JSON data into your Jenkins workflows, making your pipelines more flexible and powerful. Understanding these techniques allows you to seamlessly connect your automation with the wider ecosystem of tools and services that rely on JSON.
        </p>
      </div>
    </>
  );
}
