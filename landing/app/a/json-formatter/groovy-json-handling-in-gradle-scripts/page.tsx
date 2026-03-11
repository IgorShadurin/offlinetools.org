import type { Metadata } from "next";
import { FileJson, Code, Package, BookOpen, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Groovy JSON Handling in Gradle Scripts | Offline Tools",
  description:
    "Use Groovy's built-in JsonSlurper and JsonOutput in build.gradle to parse JSON files, convert maps to JSON, and generate task outputs without adding a JSON library.",
};

export default function GroovyJsonHandlingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-2 text-blue-600" />
        Groovy JSON Handling in Gradle Scripts
      </h1>

      <div className="space-y-6">
        <p>
          If your project uses the Groovy DSL in <code>build.gradle</code>, you can handle JSON with Groovy&apos;s
          built-in <code>groovy.json</code> package. In practice that means importing <code>JsonSlurper</code> to read
          JSON and <code>JsonOutput</code> to write it, without adding a separate JSON dependency just for build
          script logic.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-600" />
          Quick Answer
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Yes. A Groovy DSL Gradle script can use Groovy&apos;s built-in JSON support directly.
          </li>
          <li>
            Add explicit imports such as <code>import groovy.json.JsonSlurper</code> and{" "}
            <code>import groovy.json.JsonOutput</code>.
          </li>
          <li>
            To turn a map or <code>HashMap</code> into JSON, call <code>JsonOutput.toJson(yourMap)</code>.
          </li>
          <li>
            Keep JSON parsing inside a task action unless the JSON actually changes how the build is configured.
          </li>
          <li>
            Groovy DSL is still supported, but current Gradle guidance prefers Kotlin DSL for new builds.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="w-6 h-6 mr-2 text-purple-600" />
          What Gradle Gives You
        </h2>
        <p>
          In a Groovy-based Gradle build, the script already runs on Groovy, so basic JSON parsing and serialization do
          not require Jackson, Gson, or another library just to read a config file or emit a small JSON payload.
        </p>
        <p>
          The important detail is that <code>groovy.json</code> classes are not part of Gradle&apos;s default script
          imports. The classes are available, but you should still import them explicitly at the top of the script.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`import groovy.json.JsonOutput
import groovy.json.JsonSlurper`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-orange-600" />
          Practical Gradle Examples
        </h2>

        <h3 className="text-xl font-semibold mt-6">1. Convert a Map or HashMap to JSON</h3>
        <p>
          This is the direct answer for the common &quot;map to JSON in Gradle Groovy DSL&quot; use case. A Groovy map
          literal works, and a <code>HashMap</code> works too.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`import groovy.json.JsonOutput

tasks.register("printPublishMetadata") {
    doLast {
        def payload = new HashMap<String, Object>()
        payload.put("module", project.name)
        payload.put("group", project.group.toString())
        payload.put("version", project.version.toString())
        payload.put("release", !project.version.toString().endsWith("-SNAPSHOT"))

        def compactJson = JsonOutput.toJson(payload)
        def prettyJson = JsonOutput.prettyPrint(compactJson)

        println compactJson
        println prettyJson
    }
}`}
          </pre>
        </div>
        <p>
          <code>JsonOutput.toJson()</code> accepts maps, lists, strings, numbers, booleans, and nested combinations of
          those types. If you prefer Groovy&apos;s map literal syntax, this works the same way:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`def payload = [
    module : project.name,
    version: project.version.toString(),
    tags   : ["gradle", "groovy", "json"]
]

println JsonOutput.toJson(payload)`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">2. Parse JSON from a File Inside a Task</h3>
        <p>
          When JSON is only needed for a task&apos;s work, read it inside <code>doLast</code>. That keeps file I/O out of
          the configuration phase and plays better with Gradle&apos;s configuration cache.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`import groovy.json.JsonSlurper

tasks.register("printReleaseConfig") {
    doLast {
        def configFile = layout.projectDirectory.file("config/release.json").asFile

        if (!configFile.exists()) {
            throw new GradleException("Missing config/release.json")
        }

        def config = new JsonSlurper().parse(configFile)

        println "Channel: \${config.channel}"
        println "Min SDK: \${config.android.minSdk}"
        println "Enabled flags: \${config.flags.findAll { it.enabled }*.name}"
    }
}`}
          </pre>
        </div>
        <p>
          <code>JsonSlurper</code> returns normal Groovy collections, so nested objects behave like maps and arrays
          behave like lists. Dot notation is convenient for simple access, but bracket notation also works when keys
          contain special characters.
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Generate a JSON File as a Task Output</h3>
        <p>
          If another tool in your pipeline needs JSON, generate it from structured data instead of manually building a
          string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`import groovy.json.JsonOutput

tasks.register("generateBuildInfo") {
    def outputFile = layout.buildDirectory.file("generated/build-info.json")
    outputs.file(outputFile)

    doLast {
        def buildInfo = [
            name         : project.name,
            version      : project.version.toString(),
            gradleVersion: gradle.gradleVersion,
            javaVersion  : System.getProperty("java.version"),
            generatedAt  : new Date().format("yyyy-MM-dd'T'HH:mm:ssZ")
        ]

        def json = JsonOutput.prettyPrint(JsonOutput.toJson(buildInfo))
        def target = outputFile.get().asFile

        target.parentFile.mkdirs()
        target.text = json
    }
}`}
          </pre>
        </div>
        <p>
          Declaring <code>outputs.file(...)</code> gives Gradle the information it needs for up-to-date checks and
          incremental behavior.
        </p>

        <h3 className="text-xl font-semibold mt-6">4. Parse JSON During Configuration Only When It Shapes the Build</h3>
        <p>
          Top-level parsing is reasonable when the JSON decides which tasks or dependencies exist. If that data changes
          the build graph itself, reading it during configuration is appropriate.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`import groovy.json.JsonSlurper

def featureFile = layout.projectDirectory.file("features.json").asFile
def features = featureFile.exists()
    ? new JsonSlurper().parse(featureFile)
    : [enabled: []]

features.enabled.each { featureName ->
    tasks.register("package\${featureName.capitalize()}Assets") {
        doLast {
            println "Packaging assets for \${featureName}"
        }
    }
}`}
          </pre>
        </div>
        <p>
          Use this pattern sparingly. If JSON does not affect task creation, dependency selection, or plugin
          configuration, keeping the read inside a task action is usually the safer choice.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
          Current Tips and Caveats
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Import the JSON classes yourself:</strong> <code>JsonSlurper</code> and{" "}
            <code>JsonOutput</code> are available in Groovy DSL builds, but they are not default Gradle script
            imports.
          </li>
          <li>
            <strong>No extra dependency for normal Groovy DSL usage:</strong> if all you need is to parse a JSON file
            or turn a map into JSON inside <code>build.gradle</code>, Groovy&apos;s built-in API is enough.
          </li>
          <li>
            <strong>Prefer execution-time I/O:</strong> top-level file reads slow configuration and can reduce the
            value of configuration cache reuse.
          </li>
          <li>
            <strong>Use built-in serialization for maps and lists:</strong> avoid hand-written JSON strings unless you
            are emitting something trivial. <code>JsonOutput.toJson()</code> is less error-prone.
          </li>
          <li>
            <strong>Reach for stronger tooling only when needed:</strong> if your build logic needs schema validation,
            custom serializers, or large API payloads, move that work into a plugin, <code>buildSrc</code>, or an
            included build and use a dedicated library there.
          </li>
          <li>
            <strong>Kotlin DSL note:</strong> current Gradle documentation still supports Groovy DSL, but Kotlin DSL is
            the preferred option for new builds. These Groovy examples apply to <code>build.gradle</code>, not{" "}
            <code>build.gradle.kts</code>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For Groovy DSL Gradle scripts, the built-in answer is straightforward: import <code>JsonSlurper</code> to
          read JSON, import <code>JsonOutput</code> to write it, and serialize maps directly with{" "}
          <code>JsonOutput.toJson()</code>. That covers the most common Gradle JSON tasks cleanly without extra
          dependencies.
        </p>
      </div>
    </>
  );
}
