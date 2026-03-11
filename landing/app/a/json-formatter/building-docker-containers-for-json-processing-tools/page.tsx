import type { Metadata } from "next";
import { Box, Terminal, Settings, CheckCheck, Zap, Cloud, Code, FileJson, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Docker Containers for JSON Processing Tools | Offline Tools",
  description:
    "Build a small Docker image for jq or a custom JSON formatter, with practical examples, current Docker guidance, and troubleshooting tips.",
};

export default function DockerJsonToolsArticle() {
  return (
    <article className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-3">
        Building Docker Containers for JSON Processing Tools <Box size={40} />
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            What Searchers Usually Need <FileJson size={24} />
          </h2>
          <p>
            If you are looking for a JSON formatter that runs in Docker, the real requirement is usually much simpler
            than it sounds: you want one repeatable command that formats, validates, or transforms JSON the same way on
            every machine and in every CI job.
          </p>
          <p>
            For most teams, a tiny <code>jq</code> container is enough. Build your own image only when you need a
            pinned team command, a wrapper script, extra certificates, bundled schemas, or additional tools around the
            formatter itself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Before You Build Anything: Use the Official <code>jq</code> Image <Cloud size={24} />
          </h2>
          <p>
            The <code>jq</code> project now publishes container images from GitHub Container Registry at{" "}
            <code>ghcr.io/jqlang/jq</code>. If your goal is simply to pretty-print, validate, or run filters against
            JSON, start there instead of maintaining a custom Dockerfile.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`echo '{"name":"Alice","age":30}' | docker run --rm -i ghcr.io/jqlang/jq:latest .`}
            </pre>
          </div>
          <p>
            The <code>.</code> filter is the simplest possible JSON formatter: it reads JSON, validates it, and prints
            formatted output. That makes it a solid default for Docker-based formatting jobs.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`docker run --rm \\
  -v "$PWD":/work \\
  -w /work \\
  ghcr.io/jqlang/jq:latest . package.json > package.pretty.json`}
            </pre>
          </div>
          <p>
            Use the official image when you do not need customization. Build your own only when the container has to
            behave like a team-standard command or ship extra logic alongside <code>jq</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Minimal <code>jq</code> Dockerfile for a Team-Friendly Formatter <Zap size={24} />
          </h2>
          <p>
            For a custom image, keep the runtime tiny and make the container behave like a CLI executable. Docker&apos;s
            current guidance is to use <code>ENTRYPOINT</code> for the executable and <code>CMD</code> for default
            arguments.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`FROM alpine:3.21

RUN apk add --no-cache jq

WORKDIR /work
ENTRYPOINT ["jq"]
CMD ["."]`}
            </pre>
          </div>
          <p>Why this layout works well:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>apk add --no-cache</code> keeps Alpine package indexes out of the final image.
            </li>
            <li>
              <code>CMD ["."]</code> makes the image pretty-print JSON by default.
            </li>
            <li>
              Extra arguments after <code>docker run ... my-json-formatter</code> replace the default filter without
              replacing the <code>jq</code> executable.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`docker build --pull -t my-json-formatter .`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Use <code>--pull</code> when rebuilding so Docker checks for a fresher base image.
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`docker run --rm -i my-json-formatter < payload.json

docker run --rm -i my-json-formatter '.items[] | {id, status}' < payload.json`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            When You Should Build More Than a <code>jq</code> Wrapper <Layers size={24} />
          </h2>
          <p>A custom image is worth the maintenance cost when your formatter is only one step in a broader workflow.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You need a wrapper script that normalizes exit codes, error messages, or key ordering.</li>
            <li>You want bundled schemas, CA certificates, or auth helpers available inside CI and batch jobs.</li>
            <li>
              You need several tools, such as <code>jq</code>, <code>yq</code>, or a Python validator, in one stable
              environment.
            </li>
            <li>You want a short internal command name that teammates can run without caring how it is packaged.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Custom Script Example: Format JSON and Sort Keys <Code size={24} />
          </h2>
          <p>
            If plain <code>jq .</code> is not enough, wrap a small script in a slim runtime image. This example sorts
            object keys so the output is stable in diffs and code review.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Python Script (<code>format_json.py</code>):
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`import json
import sys

try:
    data = json.load(sys.stdin)
except json.JSONDecodeError as exc:
    print(f"Invalid JSON: {exc}", file=sys.stderr)
    raise SystemExit(1)

json.dump(data, sys.stdout, indent=2, sort_keys=True)
sys.stdout.write("\\n")`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Dockerfile:</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`FROM python:3.12-slim

WORKDIR /app
COPY format_json.py .

ENTRYPOINT ["python", "/app/format_json.py"]`}
            </pre>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`docker build --pull -t sorted-json .
echo '{"b":1,"a":2}' | docker run --rm -i sorted-json`}
            </pre>
          </div>
          <p>
            If you later add third-party Python packages, copy <code>requirements.txt</code> before the rest of the
            source and install dependencies in that earlier layer so Docker can reuse build cache when your script
            changes but your dependencies do not.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Current Docker Build Practices That Matter Here <Settings size={24} />
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Use multi-stage builds when build-only tooling is involved.</strong> If your JSON tool needs
              compilation or heavy build dependencies, keep those in a builder stage and copy only the runtime artifacts
              into the final image.
            </li>
            <li>
              <strong>Pin base image tags you have tested.</strong> A tag like <code>alpine:3.21</code> is more
              predictable than floating <code>latest</code>.
            </li>
            <li>
              <strong>Add a small <code>.dockerignore</code>.</strong> Exclude local output, logs, and bulky sample
              data so builds stay fast.
            </li>
            <li>
              <strong>Keep the container ephemeral.</strong> For formatter jobs, use <code>docker run --rm</code> and
              write the result to stdout unless you truly need persistent in-container state.
            </li>
            <li>
              <strong>Keep one concern per image.</strong> A formatter image should format JSON, not quietly grow into a
              general-purpose shell toolbox unless that is a deliberate team choice.
            </li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`.git
node_modules
dist
coverage
*.log
sample-data/`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              A small <code>.dockerignore</code> like this is often enough for a JSON-tool image.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Troubleshooting the Usual Failures <Terminal size={24} />
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>No output when piping JSON in:</strong> use <code>-i</code> so Docker keeps standard input open.
            </li>
            <li>
              <strong>Temporary formatter containers pile up:</strong> add <code>--rm</code> to remove them
              automatically after each run.
            </li>
            <li>
              <strong>Mounted files end up owned by root:</strong> prefer redirecting stdout on the host, or run with{" "}
              <code>--user &quot;$(id -u):$(id -g)&quot;</code> if the container must write into a bind mount.
            </li>
            <li>
              <strong>Your default filter seems to disappear:</strong> arguments after the image name override{" "}
              <code>CMD</code>, while <code>ENTRYPOINT</code> keeps the executable fixed.
            </li>
            <li>
              <strong>The image is larger than expected:</strong> remove unnecessary packages and switch to a slimmer
              base or a multi-stage build.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Conclusion <CheckCheck size={24} />
          </h2>
          <p>
            For most Docker-based JSON formatting jobs, the fastest answer is the official <code>jq</code> image plus{" "}
            <code>docker run --rm -i ... .</code>. Build your own image when you need a pinned team workflow, extra
            scripts, or stricter reproducibility. Keep the image small, pin what you test, and make stdout the default
            interface.
          </p>
        </section>
      </div>
    </article>
  );
}
