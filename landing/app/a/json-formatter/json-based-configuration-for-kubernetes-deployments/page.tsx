import type { Metadata } from "next";
import { Code, FileJson, Settings, Box, Cloud, Terminal, CheckCircle, XCircle, Info, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "JSON-based Configuration for Kubernetes Deployments",
  description:
    "Understand how to define and manage Kubernetes Deployment configurations using the JSON format, including structure, examples, and practical considerations.",
};

export default function JsonKubernetesDeploymentArticle() {
  return (
    <main className="container mx-auto py-8 px-4 max-w-3xl">
      <article>
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <FileJson className="w-8 h-8" /> JSON-based Configuration for Kubernetes Deployments
        </h1>

        <section className="space-y-6 mb-8">
          <p>
            Kubernetes configurations, known as manifests, are most commonly authored in YAML. This is the de facto
            standard for human-readable configuration files within the Kubernetes ecosystem. However, the Kubernetes API
            fundamentally communicates using <strong>JSON (JavaScript Object Notation)</strong>.
          </p>
          <p>
            Every YAML manifest you apply to a Kubernetes cluster is parsed and converted into its JSON equivalent
            before being sent to the API server. Conversely, when you retrieve the state of resources from the API
            server using tools like <code>kubectl</code>, you are receiving JSON data (though <code>kubectl</code> often
            formats it nicely for display).
          </p>
          <p>Understanding the JSON structure of Kubernetes objects is crucial for several reasons:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start gap-2">
              <Code className="w-5 h-5 text-muted-foreground mt-1" />
              <strong>API Interaction:</strong> Direct interaction with the K8s API often involves sending and receiving
              JSON.
            </li>
            <li className="flex items-start gap-2">
              <Settings className="w-5 h-5 text-muted-foreground mt-1" />
              <strong>Tooling and Automation:</strong> Many tools, scripts, and client libraries that work with
              Kubernetes process or generate configurations in JSON.
            </li>
            <li className="flex items-start gap-2">
              <Terminal className="w-5 h-5 text-muted-foreground mt-1" />
              <strong>Debugging:</strong> Examining the JSON output of <code>kubectl get ... -o json</code> can provide
              a precise view of how Kubernetes interprets your configuration.
            </li>
          </ul>
          <p>
            This article explores how to define Kubernetes Deployments using JSON, providing examples and discussing
            practical aspects.
          </p>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Box className="w-6 h-6" /> Kubernetes Manifest Structure in JSON
          </h2>
          <p>
            A Kubernetes manifest, whether in YAML or JSON, describes a desired state for a resource (like a Deployment,
            Service, Pod, etc.). All K8s objects share a common top-level structure:
          </p>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-2">Core Fields:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <code>apiVersion</code>: Specifies the Kubernetes API version (e.g., <code>apps/v1</code> for
                Deployments, <code>v1</code> for Pods/Services).
              </li>
              <li>
                <code>kind</code>: The type of Kubernetes resource being created or modified (e.g.,{" "}
                <code>Deployment</code>, <code>Service</code>, <code>Pod</code>, <code>ReplicaSet</code>).
              </li>
              <li>
                <code>metadata</code>: An object containing data to uniquely identify the object, including{" "}
                <code>name</code>, <code>namespace</code>, <code>labels</code>, and <code>annotations</code>.
              </li>
              <li>
                <code>spec</code>: An object describing the desired state of the resource. The structure of the{" "}
                <code>spec</code> field is specific to each <code>kind</code> of object.
              </li>
              <li>
                <code>status</code>: (Optional, managed by K8s) An object describing the current state of the resource.
                This is usually present in retrieved objects but not in the configuration you apply.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-6">YAML vs. JSON: A Simple Deployment</h3>
          <p>
            Let&apos;s look at a minimal Nginx Deployment in both YAML and JSON formats to see the structural
            differences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <h4 className="text-lg font-medium mb-2">YAML</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
                {`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80`}
              </pre>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
              <h4 className="text-lg font-medium mb-2">JSON Equivalent</h4>
              <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
                {`{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "nginx-deployment",
    "labels": {
      "app": "nginx"
    }
  },
  "spec": {
    "replicas": 2,
    "selector": {
      "matchLabels": {
        "app": "nginx"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "nginx"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "nginx",
            "image": "nginx:latest",
            "ports": [
              {
                "containerPort": 80
              }
            ]
          }
        ]
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
          <p>
            As you can see, the hierarchical structure maps directly: YAML&apos;s indentation and key-value pairs become
            JSON&apos;s curly braces <code className="font-mono text-sm">&#x7b;</code>
            <code className="font-mono text-sm">&#x7d;</code> for objects and square brackets{" "}
            <code className="font-mono text-sm">[</code>
            <code className="font-mono text-sm">]</code> for arrays. YAML lists become JSON arrays of objects or
            primitive types.
          </p>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson className="w-6 h-6" /> JSON Data Types in K8s Manifests
          </h2>
          <p>Kubernetes resources use standard JSON data types:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code className="font-mono text-sm">&quot;string&quot;</code>: Used for names, image tags, paths,
              configuration values, etc.
            </li>
            <li>
              <code className="font-mono text-sm">123</code> or <code className="font-mono text-sm">12.3</code>:
              Numbers, used for counts (replicas), ports, resource values (CPU/memory sometimes strings, sometimes
              numbers depending on field).
            </li>
            <li>
              <code className="font-mono text-sm">true</code> / <code className="font-mono text-sm">false</code>:
              Booleans, used for flags or toggles.
            </li>
            <li>
              <code className="font-mono text-sm">null</code>: Explicitly representing a missing or null value (less
              common in typical manifests you write, more in API responses).
            </li>
            <li>
              <code className="font-mono text-sm">&#x7b; &quot;key&quot;: &quot;value&quot; &#x7d;</code>: Objects, used
              for structured data like <code>metadata</code>, <code>labels</code>, <code>spec</code>, container resource
              limits/requests, etc.
            </li>
            <li>
              <code className="font-mono text-sm">[ &quot;value1&quot;, &quot;value2&quot; ]</code> or{" "}
              <code className="font-mono text-sm">[ &#x7b;...&#x7d;, &#x7b;...&#x7d; ]</code>: Arrays, used for lists of
              items, such as <code>containers</code>, <code>ports</code>, <code>env</code> variables,{" "}
              <code>volumeMounts</code>, etc.
            </li>
          </ul>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" /> Examples of JSON Deployments
          </h2>

          <h3 className="text-xl font-semibold mt-6">Deployment with Environment Variables</h3>
          <p>Environment variables are defined as an array of objects within the container specification.</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
              {`{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "app-with-env"
  },
  "spec": {
    "replicas": 1,
    "selector": {
      "matchLabels": {
        "app": "my-app"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "my-app"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "main-container",
            "image": "my-image:v1.0",
            "env": [
              {
                "name": "NODE_ENV",
                "value": "production"
              },
              {
                "name": "LOG_LEVEL",
                "value": "info"
              }
            ]
          }
        ]
      }
    }
  }
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6">Deployment with Resource Limits and Requests</h3>
          <p>
            CPU and memory requests/limits are defined in a nested object within the container specification. Resource
            values are typically strings in Kubernetes.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
              {`{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "app-with-resources"
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "matchLabels": {
        "app": "resource-hungry-app"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "resource-hungry-app"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "main-container",
            "image": "another-image:latest",
            "resources": {
              "limits": {
                "cpu": "500m",
                "memory": "512Mi"
              },
              "requests": {
                "cpu": "250m",
                "memory": "256Mi"
              }
            }
          }
        ]
      }
    }
  }
}`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6">Adding Labels and Annotations</h3>
          <p>
            Labels and annotations are key-value pairs defined within the <code>metadata</code> object. Labels are used
            for selecting groups of objects (e.g., by Deployments to find Pods). Annotations are for non-identifying
            metadata.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
              {`{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "app-with-meta",
    "namespace": "default",
    "labels": {
      "app": "my-web-app",
      "tier": "frontend"
    },
    "annotations": {
      "description": "Frontend web server deployment",
      "owner": "team-a@example.com"
    }
  },
  "spec": {
    "replicas": 1,
    "selector": {
      "matchLabels": {
        "app": "my-web-app"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "my-web-app",
          "tier": "frontend"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "web",
            "image": "my-webapp:latest"
          }
        ]
      }
    }
  }
}`}
            </pre>
          </div>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Terminal className="w-6 h-6" /> Working with JSON and kubectl
          </h2>
          <p>
            You can use <code>kubectl</code> directly with JSON files.
          </p>

          <h3 className="text-xl font-semibold mt-6">Applying JSON Manifests</h3>
          <p>
            Save your JSON configuration to a file (e.g., <code>deployment.json</code>) and apply it using:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
              <code className="language-bash">kubectl apply -f deployment.json</code>
            </pre>
          </div>
          <p>This command works exactly like applying a YAML file.</p>

          <h3 className="text-xl font-semibold mt-6">Getting Resource Output as JSON</h3>
          <p>
            To see the full JSON representation of a running resource, use the <code>-o json</code> (or{" "}
            <code>--output=json</code>) flag:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
              <code className="language-bash">kubectl get deployment nginx-deployment -o json</code>
            </pre>
          </div>
          <p>
            This will output the complete state of the Deployment object, including status fields managed by Kubernetes,
            in JSON format. This output can be significantly larger than your input YAML/JSON because it includes
            runtime information.
          </p>

          <h3 className="text-xl font-semibold mt-6">Converting Between YAML and JSON</h3>
          <p>
            <code>kubectl</code> can convert configurations between formats locally without sending them to the cluster.
            Use the <code>kubectl convert</code> command (requires the appropriate API version installed, though this
            command is becoming less common and features might be moving). A more robust method is using{" "}
            <code>kubectl create --dry-run=client -o json</code> or pipeline tools like <code>yq</code> or{" "}
            <code>jq</code>.
          </p>
          <p>
            Example using <code>kubectl</code> dry-run:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm overflow-x-auto">
              <code className="language-bash">
                kubectl create deployment my-app --image=my-image --dry-run=client -o json
              </code>
            </pre>
          </div>
          <p>
            This command generates a basic Deployment object and outputs its JSON representation locally. You can pipe
            this output to a file or other tools.
          </p>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" /> Pros and Cons of JSON for K8s Configs
          </h2>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" /> Advantages
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>API Native:</strong> JSON is the format the Kubernetes API understands directly.
            </li>
            <li>
              <strong>Machine Readability/Writability:</strong> Ideal for programmatic generation, parsing, and
              modification of manifests using standard JSON libraries in any programming language. Excellent for
              building custom operators or automation tools.
            </li>
            <li>
              <strong>Strict Format:</strong> JSON is less forgiving than YAML regarding syntax (e.g., requiring commas
              between list items, strict quoting), which can sometimes help catch simple errors early in automated
              processes.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" /> Disadvantages
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Verbosity:</strong> JSON syntax with its repetitive braces
              <code className="font-mono text-sm">&#x7b;</code>
              <code className="font-mono text-sm">&#x7d;</code>, brackets
              <code className="font-mono text-sm">[</code>
              <code className="font-mono text-sm">]</code>, and quotes makes it significantly more verbose and harder
              for humans to read and write compared to YAML&apos;s cleaner, indentation-based structure.
            </li>
            <li>
              <strong>Syntax Sensitivity:</strong> A single missing comma or misplaced brace can invalidate the entire
              document, which can be frustrating for manual editing.
            </li>
            <li>
              <strong>Comments:</strong> JSON does not natively support comments, making it difficult to add explanatory
              notes within the configuration file itself (YAML supports comments).
            </li>
          </ul>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6" /> Practical Considerations
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>YAML is King for Manual Editing:</strong> For configuration files that humans write and maintain,
              YAML is overwhelmingly preferred in the K8s community due to its readability.
            </li>
            <li>
              <strong>JSON for Automation:</strong> If you are building a tool, script, or application that dynamically
              generates or modifies Kubernetes manifests, working with JSON programmatically is often more
              straightforward using standard libraries than manipulating YAML strings.
            </li>
            <li>
              <strong>Conversion Tools:</strong> Be familiar with tools like <code>jq</code> (for processing JSON) and
              YAML-to-JSON converters (like the one built into <code>kubectl</code> or dedicated tools) to switch
              between formats as needed.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Cloud className="w-6 h-6" /> Conclusion
          </h2>
          <p>
            While YAML is the standard for writing Kubernetes manifests, JSON is the underlying format used by the API.
            Understanding the JSON structure of Kubernetes objects, particularly Deployments, provides valuable insight
            into how the API works and is essential for building automation, integrating with other tools, or debugging
            configurations by inspecting the live state of resources.
          </p>
          <p>
            You are unlikely to write all your Deployments in JSON manually, but being able to read, understand, and
            generate JSON manifests will make you a more effective Kubernetes developer and operator.
          </p>
        </section>
      </article>
    </main>
  );
}
