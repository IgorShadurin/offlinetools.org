import type { Metadata } from "next";
import { Box, Terminal, Settings, CheckCheck, Zap, Cloud, Code, FileJson, Upload, Layers, Grip } from "lucide-react";

export const metadata: Metadata = {
  title: "Building Docker Containers for JSON Processing Tools | Offline Tools",
  description: "Learn how to containerize JSON processing tools using Docker for consistent and portable workflows.",
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
            Introduction: JSON and the Need for Consistency <FileJson size={24} />
          </h2>
          <p>
            JSON (JavaScript Object Notation) has become the de facto standard for data exchange across the web and in
            APIs. Developers frequently interact with JSON data, whether it&apos;s parsing API responses, manipulating
            configuration files, or transforming data streams. Processing JSON often involves using command-line tools
            like <code>jq</code> or <code>jp</code>, or writing custom scripts in languages like Python or Node.js that
            leverage JSON parsing libraries.
          </p>
          <p>
            However, setting up the correct environment, installing specific tool versions, and managing dependencies
            for these tools can be cumbersome and lead to the dreaded &quot;it works on my machine&quot; problem. This
            is where Docker comes in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            What is Docker and Why Use It? <Box size={24} />
          </h2>
          <p>
            Docker is a platform for developing, shipping, and running applications in containers. A container is a
            lightweight, standalone, executable package of software that includes everything needed to run an
            application: code, runtime, system tools, system libraries, and settings.
          </p>
          <p>Key benefits of using Docker include:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Consistency:</strong> Containers provide a consistent environment across different machines and
              operating systems. What works in one Docker container will work in another.{" "}
              <CheckCheck className="inline" size={16} />
            </li>
            <li>
              <strong>Isolation:</strong> Applications and their dependencies are isolated within the container,
              preventing conflicts with other applications or the host system.
            </li>
            <li>
              <strong>Portability:</strong> Containers can be easily moved and run on any system that has Docker
              installed, from a developer&apos;s laptop to a production server or cloud environment.{" "}
              <Cloud className="inline" size={16} />
            </li>
            <li>
              <strong>Efficiency:</strong> Containers share the host OS kernel, making them much lighter and faster to
              start than traditional virtual machines.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Why Docker for JSON Processing Tools? <Settings size={24} />
          </h2>
          <p>Containerizing your JSON processing tools offers specific advantages:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dependency Management:</strong> Ensure the exact version of a tool (like <code>jq</code> 1.6) or a
              library (like Python&apos;s <code>jsonpath-ng</code>) is always available and correctly installed without
              affecting your host system.
            </li>
            <li>
              <strong>Reproducible Workflows:</strong> Guarantee that a script or command processing JSON will produce
              the same results every time it&apos;s run, regardless of where it&apos;s executed.
            </li>
            <li>
              <strong>Simplified Deployment:</strong> Easily share your JSON processing setup with colleagues or deploy
              it as part of a larger data pipeline.
            </li>
            <li>
              <strong>Clean Environment:</strong> Run tools without polluting your host system with numerous
              installations.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            The Dockerfile: Blueprint for Your Container <Code size={24} />
          </h2>
          <p>
            A Dockerfile is a text document that contains all the commands a user could call on the command line to
            assemble an image. Docker reads these instructions to build a Docker image, which is a read-only template
            for creating containers.
          </p>
          <p>Common Dockerfile Instructions:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>FROM</code>: Specifies the base image (e.g., an operating system or another application image).{" "}
              <Layers className="inline" size={16} />
            </li>
            <li>
              <code>RUN</code>: Executes commands during the image build process (e.g., installing software).{" "}
              <Terminal className="inline" size={16} />
            </li>
            <li>
              <code>WORKDIR</code>: Sets the working directory for subsequent instructions.
            </li>
            <li>
              <code>COPY</code>: Copies files from your host machine into the image.{" "}
              <Upload className="inline" size={16} />
            </li>
            <li>
              <code>CMD</code> or <code>ENTRYPOINT</code>: Defines the default command or executable that runs when you
              start a container from the image.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Example 1: Dockerizing the <code>jq</code> CLI Tool <Zap size={24} />
          </h2>
          <p>
            <code>jq</code> is a powerful, lightweight, and flexible command-line JSON processor. Let&apos;s create a
            Docker image that includes <code>jq</code>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Dockerfile for jq:</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`# Use a minimal Linux distribution as the base
FROM alpine:latest

# Install jq
# Alpine uses apk for package management
RUN apk update && apk add jq

# Set the entrypoint to jq
# This means when you run the container, the 'jq' command is executed
ENTRYPOINT ["jq"]

# You can optionally set a default command if no arguments are given
# CMD ["."] # Example: Default to printing the entire JSON input

# No WORKDIR or COPY needed for this simple case,
# as we'll pipe JSON into the container`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Building the Image:</h3>
          <p>
            Save the above content as <code>Dockerfile</code> in an empty directory. Then build the image:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`docker build -t my-jq-tool .`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              (<code>-t my-jq-tool</code> tags the image, <code>.</code> means use the Dockerfile in the current
              directory)
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Running the Container:</h3>
          <p>
            Now you can use your containerized <code>jq</code>. Because we used <code>ENTRYPOINT ["jq"]</code>, you can
            pass <code>jq</code> arguments directly after <code>docker run &lt;image-name&gt;</code>. We can pipe JSON
            into it.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`echo '{"name": "Alice", "age": 30}' | docker run -i my-jq-tool '.name'`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              (<code>-i</code> keeps STDIN open to receive the piped input)
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Expected output: <code>"Alice"</code>
            </p>
          </div>
          <p>
            You can replace <code>'.name'</code> with any valid <code>jq</code> filter. This ensures you are always
            using the <code>jq</code> version from your container, regardless of whether <code>jq</code> is installed on
            your host.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Example 2: Dockerizing a Custom Python Script <Code size={24} />
          </h2>
          <p>
            Often, JSON processing requires more complex logic than CLI tools provide. Let&apos;s containerize a simple
            Python script that reads JSON, processes it, and outputs the result.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Python Script (<code>process_json.py</code>):
          </h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`import sys
import json

def process(data):
    # Example processing: Add a new field or modify existing ones
    if isinstance(data, dict):
        data['processed'] = True
        return data
    elif isinstance(data, list):
        return [process(item) for item in data] # Recursively process list items
    else:
        return data

def main():
    try:
        # Read JSON from stdin
        json_data = json.load(sys.stdin)

        # Process the data
        processed_data = process(json_data)

        # Output processed JSON to stdout
        json.dump(processed_data, sys.stdout, indent=2)
        sys.stdout.write('\\n') # Add a newline at the end

    except json.JSONDecodeError:
        print("Error: Invalid JSON input.", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Requirements File (<code>requirements.txt</code>):
          </h3>
          <p>
            This script only uses the built-in <code>json</code> module, so the requirements file is simple. If your
            script used external libraries like <code>jsonpath-ng</code> or <code>pandas</code>, you would list them
            here.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`# No external dependencies needed for this simple script`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Dockerfile for Python Script:</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install any dependencies
# This step is often done before copying the script itself
# to take advantage of Docker's layer caching if dependencies don't change
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the script into the container
COPY process_json.py .

# Set the entrypoint to run the Python script
ENTRYPOINT ["python", "process_json.py"]

# No CMD needed if ENTRYPOINT handles the primary command
# You can still pass arguments to the script via \`docker run\` if needed`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Building the Image:</h3>
          <p>
            Save the Dockerfile, <code>process_json.py</code>, and <code>requirements.txt</code> in the same directory.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`docker build -t my-json-processor .`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Running the Container:</h3>
          <p>
            Pipe JSON into the container, just like with the <code>jq</code> example.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`echo '{"items": [{"id": 1}, {"id": 2}]}' | docker run -i my-json-processor`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Expected output (formatted):</p>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`{
  "items": [
    {
      "id": 1,
      "processed": true
    },
    {
      "id": 2,
      "processed": true
    }
  ]
}`}
            </pre>
          </div>
          <p>
            This approach is highly flexible. You can modify the Python script to perform any arbitrary JSON
            transformation, validation, or analysis, and the Docker container ensures it runs with the correct Python
            version and libraries every time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Example 3: Combining Multiple Tools <Grip size={24} />
          </h2>
          <p>
            You can build Docker images that contain multiple JSON processing tools. This is useful if your workflow
            requires switching between different utilities or using them in combination.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`# Use a base image that provides apt (like Ubuntu or Debian)
FROM ubuntu:latest

# Prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update package list and install multiple tools
RUN apt-get update && \\
    apt-get install -y \\
    jq \\
    moreutils \\
    # Add other tools as needed, e.g., python3-pip for Python scripts
    # && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set a default shell or entrypoint if desired,
# otherwise you can run commands directly via docker run <image> <command>
# ENTRYPOINT ["/bin/bash"]
# CMD []`}
            </pre>
          </div>
          <p className="mt-2">
            Build this image: <code>docker build -t my-json-toolkit .</code>
          </p>
          <p className="mt-2">Run commands using the tools inside:</p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`echo '{"status": "ok"}' | docker run -i my-json-toolkit jq '.status'`}
            </pre>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm mt-2">
              {`docker run -i my-json-toolkit sh -c 'echo "{}" | jq . | sponge file.json'`}
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              (The second example uses <code>sh -c</code> to run multiple commands and assumes <code>sponge</code> from{" "}
              <code>moreutils</code> is installed)
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Advanced Considerations (Briefly) <Settings size={24} />
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Volumes:</strong> Instead of piping data, you can mount host directories or files into the
              container using the <code>-v</code> flag with <code>docker run</code>. This is essential for processing
              large files or accessing multiple files.
              <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 my-2 text-sm">
                <pre>{`docker run -v /path/to/your/data:/data my-jq-tool '.array[]' /data/input.json`}</pre>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  (Mounts host&apos;s <code>/path/to/your/data</code> to container&apos;s <code>/data</code>)
                </p>
              </div>
            </li>
            <li>
              <strong>Environment Variables:</strong> Pass configuration options to your scripts using the{" "}
              <code>-e</code> flag.
              <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 my-2 text-sm">
                <pre>{`docker run -e LEVEL=verbose my-json-processor`}</pre>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  (The script would need to read the &#x7b;<code>LEVEL</code>&#x7d; environment variable)
                </p>
              </div>
            </li>
            <li>
              <strong>Image Size:</strong> For production or frequent use, consider using minimal base images (like
              Alpine) or multi-stage builds to reduce the final image size.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center gap-2">
            Conclusion <CheckCheck size={24} />
          </h2>
          <p>
            Building Docker containers for your JSON processing tools provides a robust, consistent, and portable way to
            handle JSON data. Whether you&apos;re using standard CLI utilities or custom scripts, containerization
            eliminates environment inconsistencies and simplifies your data processing workflows. Start experimenting
            with simple Dockerfiles for your favorite JSON tools today! <Box className="inline" size={16} />{" "}
            <Cloud className="inline" size={16} />
          </p>
        </section>
      </div>
    </article>
  );
}
