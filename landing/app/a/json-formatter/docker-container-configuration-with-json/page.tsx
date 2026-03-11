import type { Metadata } from "next";
import {
  BookText,
  Code,
  Container,
  Database,
  FileJson2,
  Lock,
  Settings,
  Terminal,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Docker Container Configuration with JSON: config.json, API Payloads, and Mounted Files",
  description:
    "Learn what Docker config.json is, how to create containers with JSON through the Docker Engine API, and when to mount a JSON file inside a container.",
};

export default function DockerJsonConfigArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <FileJson2 className="w-8 h-8" />
        <span>Docker Container Configuration with JSON</span>
      </h1>

      <div className="space-y-6">
        <p>
          If you searched for <Code className="inline-block w-4 h-4" /> <code>docker config json</code>, you are
          probably looking for one of three different things: Docker&apos;s CLI config file, a JSON payload for the
          Docker Engine API, or a JSON file that your application reads inside the container. Those are related, but
          they are not interchangeable, and Docker does <strong>not</strong> have a built-in{" "}
          <Code className="inline-block w-4 h-4" /> <code>docker run --config container.json</code> feature for general
          container settings.
        </p>
        <p>
          The practical rule is simple: use <Code className="inline-block w-4 h-4" /> <code>~/.docker/config.json</code>{" "}
          to configure the Docker <em>client</em>, use the Docker Engine API when you want to create a container from a
          JSON body, and mount a JSON file when the <em>application inside the container</em> needs structured config at
          runtime.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <BookText className="w-6 h-6" />
          <span>Quick answer: which JSON file do you actually need?</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Docker CLI settings:</strong> edit <Code className="inline-block w-4 h-4" />{" "}
            <code>~/.docker/config.json</code>.
          </li>
          <li>
            <strong>Create a container from JSON:</strong> send a JSON body to the Docker Engine{" "}
            <Code className="inline-block w-4 h-4" /> <code>POST /containers/create</code> endpoint.
          </li>
          <li>
            <strong>Pass app settings into a container:</strong> mount a JSON file and let your app read it.
          </li>
          <li>
            <strong>Inspect an existing container:</strong> use <Code className="inline-block w-4 h-4" />{" "}
            <code>docker inspect</code>, which returns JSON.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Settings className="w-6 h-6" />
          <span>1. The Docker CLI config file: ~/.docker/config.json</span>
        </h2>
        <p>
          Docker&apos;s official CLI reference still uses <Code className="inline-block w-4 h-4" />{" "}
          <code>~/.docker/config.json</code> as the default client configuration file. This file controls how the{" "}
          <Code className="inline-block w-4 h-4" /> <code>docker</code> command behaves on your machine. It is not a
          container definition file, and it does not tell Docker how to run an individual container.
        </p>
        <p>
          Typical uses include credential helpers, default output formatting, custom HTTP headers, and registry auth.
          Docker also supports switching to another config directory with <Code className="inline-block w-4 h-4" />{" "}
          <code>DOCKER_CONFIG</code> or the <Code className="inline-block w-4 h-4" /> <code>docker --config</code>{" "}
          flag.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <FileJson2 className="w-5 h-5" />
            <span>Example: a minimal Docker CLI config.json file</span>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "credsStore": "osxkeychain",
  "psFormat": "table {{.ID}}\\t{{.Image}}\\t{{.Status}}\\t{{.Names}}",
  "imagesFormat": "table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}",
  "HttpHeaders": {
    "X-Environment": "dev"
  }
}`}
            </pre>
          </div>
        </div>
        <p>
          If your question is &quot;where is the Docker config JSON file?&quot;, this is usually the file people mean.
          If your question is &quot;how do I create a container from JSON?&quot;, this is <strong>not</strong> the file
          you want.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Container className="w-6 h-6" />
          <span>2. Creating a Docker container from JSON</span>
        </h2>
        <p>
          For actual container creation, JSON belongs to the Docker Engine API. The current Docker Engine API reference
          documents <Code className="inline-block w-4 h-4" /> <code>POST /containers/create</code> with a JSON body
          that combines core container fields such as <Code className="inline-block w-4 h-4" /> <code>Image</code> and{" "}
          <Code className="inline-block w-4 h-4" /> <code>Env</code> with nested sections such as{" "}
          <Code className="inline-block w-4 h-4" /> <code>HostConfig</code> and{" "}
          <Code className="inline-block w-4 h-4" /> <code>NetworkingConfig</code>.
        </p>
        <p>
          This is the JSON equivalent of many <Code className="inline-block w-4 h-4" /> <code>docker run</code> flags.
          If you are building a platform, wrapper script, control plane, or admin tool, this is the canonical approach.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Example: create a container with a JSON API payload</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This example uses a versioned API path. When calling the Engine API directly, use the version supported by
            your Docker installation.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`curl --unix-socket /var/run/docker.sock \\
  -H "Content-Type: application/json" \\
  -X POST "http://localhost/v1.53/containers/create?name=my-nginx" \\
  -d '{
    "Image": "nginx:1.27-alpine",
    "Env": [
      "NGINX_ENTRYPOINT_QUIET_LOGS=1"
    ],
    "ExposedPorts": {
      "80/tcp": {}
    },
    "HostConfig": {
      "PortBindings": {
        "80/tcp": [
          {
            "HostPort": "8080"
          }
        ]
      },
      "Binds": [
        "./site:/usr/share/nginx/html:ro"
      ],
      "RestartPolicy": {
        "Name": "unless-stopped"
      }
    }
  }'

docker start my-nginx`}
            </pre>
          </div>
        </div>
        <p>
          A few common mappings are worth memorizing:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <Code className="inline-block w-4 h-4" /> <code>-e KEY=value</code> becomes{" "}
            <Code className="inline-block w-4 h-4" /> <code>Env</code>.
          </li>
          <li>
            <Code className="inline-block w-4 h-4" /> <code>-p 8080:80</code> becomes both{" "}
            <Code className="inline-block w-4 h-4" /> <code>ExposedPorts</code> and{" "}
            <Code className="inline-block w-4 h-4" /> <code>HostConfig.PortBindings</code>.
          </li>
          <li>
            <Code className="inline-block w-4 h-4" /> <code>-v host:container:ro</code> becomes{" "}
            <Code className="inline-block w-4 h-4" /> <code>HostConfig.Binds</code>.
          </li>
          <li>
            <Code className="inline-block w-4 h-4" /> <code>--restart unless-stopped</code> becomes{" "}
            <Code className="inline-block w-4 h-4" /> <code>HostConfig.RestartPolicy.Name</code>.
          </li>
          <li>
            The container name is commonly passed in the request URL as the <Code className="inline-block w-4 h-4" />{" "}
            <code>name</code> query parameter.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Code className="w-6 h-6" />
          <span>3. Can docker run read a generic config.json file?</span>
        </h2>
        <p>
          Not directly. The Docker CLI does not have a general feature where you hand it a JSON document and it turns
          that into a container definition. If you need that workflow, choose one of these patterns:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Generate a <code>docker run</code> command from your own JSON schema in a script.</li>
          <li>Translate your JSON into a Compose file such as <code>compose.yaml</code>.</li>
          <li>Skip the CLI and call the Engine API with a JSON body.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <FileJson2 className="w-5 h-5" />
            <span>Example: JSON that your own wrapper script could turn into docker run</span>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "image": "nginx:1.27-alpine",
  "name": "site",
  "ports": ["8080:80"],
  "mounts": ["./site:/usr/share/nginx/html:ro"],
  "env": {
    "NGINX_ENTRYPOINT_QUIET_LOGS": "1"
  }
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>Example: tiny Node.js generator</span>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import fs from "node:fs";

const cfg = JSON.parse(fs.readFileSync("container.json", "utf8"));
const args = ["run", "-d"];

if (cfg.name) args.push("--name", cfg.name);
for (const port of cfg.ports ?? []) args.push("-p", port);
for (const mount of cfg.mounts ?? []) args.push("-v", mount);
for (const [key, value] of Object.entries(cfg.env ?? {})) {
  args.push("-e", \`\${key}=\${value}\`);
}

args.push(cfg.image);
console.log(\`docker \${args.join(" ")}\`);`}
            </pre>
          </div>
        </div>
        <p>
          This pattern is useful when a control panel or deployment tool stores container settings as JSON internally
          but still executes the Docker CLI underneath.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Database className="w-6 h-6" />
          <span>4. Mounting a JSON config file inside the container</span>
        </h2>
        <p>
          Sometimes the JSON file is not for Docker at all. It is for the application running inside the container. In
          that case, keep the container configuration separate and mount the JSON file at runtime.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <FileJson2 className="w-5 h-5" />
            <span>Example: app-config.json</span>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "database": {
    "host": "db.internal",
    "port": 5432
  },
  "featureFlags": {
    "newDashboard": true
  },
  "logging": {
    "level": "info"
  }
}`}
            </pre>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Example: mount the JSON file read-only</span>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`docker run -d \\
  --name my-app \\
  --mount type=bind,src="$PWD/app-config.json",dst=/app/config/app-config.json,readonly \\
  my-application-image`}
            </pre>
          </div>
        </div>
        <p>
          Use this approach when the app expects a JSON settings file. Do not confuse it with Docker&apos;s own client
          config file or the Engine API payload used to create the container.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Wrench className="w-6 h-6" />
          <span>5. Use docker inspect when you need real container JSON</span>
        </h2>
        <p>
          If you already have a container and want to see the effective configuration in JSON form,{" "}
          <Code className="inline-block w-4 h-4" /> <code>docker inspect</code> is the fastest path. It returns a JSON
          array containing image details, environment variables, mounts, networks, restart policy, and much more.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center space-x-2">
            <Terminal className="w-5 h-5" />
            <span>Example: inspect a running container</span>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>{`docker inspect my-nginx | jq '.[0].HostConfig.PortBindings'`}</pre>
          </div>
        </div>
        <p>
          This is especially helpful when you want to verify what Docker actually applied or when you are reverse
          engineering a known-good container into an API payload or Compose definition.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Lock className="w-6 h-6" />
          <span>Common mistakes and security notes</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Do not commit</strong> <Code className="inline-block w-4 h-4" /> <code>~/.docker/config.json</code>{" "}
            to version control. It may contain registry auth or proxy information.
          </li>
          <li>
            <strong>Do not store secrets in plain JSON</strong> unless you control access tightly. Prefer secret
            managers or Docker secret mechanisms where they fit your deployment model.
          </li>
          <li>
            <strong>Do not expose the Docker socket casually.</strong> If you can post JSON to the Engine API, you can
            usually create privileged containers and control the host.
          </li>
          <li>
            <strong>Do not mix up similarly named features.</strong> Docker CLI <code>config.json</code>, Swarm{" "}
            <Code className="inline-block w-4 h-4" /> <code>docker config</code>, and app-level JSON config files solve
            different problems.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Container className="w-6 h-6" />
          <span>Bottom line</span>
        </h2>
        <p>
          When people say &quot;Docker JSON config&quot;, the missing step is deciding <em>what</em> is being
          configured. Use <Code className="inline-block w-4 h-4" /> <code>~/.docker/config.json</code> for the Docker
          client, the Engine API for container creation from JSON, and mounted JSON files for application settings
          inside the container. Once you separate those cases, the Docker docs and JSON structure become much easier to
          work with.
        </p>
      </div>
    </>
  );
}
