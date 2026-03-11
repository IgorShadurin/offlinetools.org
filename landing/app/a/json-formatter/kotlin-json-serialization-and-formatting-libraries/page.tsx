import type { Metadata } from "next";
import { Box, Code, FileJson, List, Settings, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Kotlin JSON Serialization and Formatting Libraries: What to Use",
  description:
    "Compare kotlinx.serialization, Jackson, Moshi, and Gson for Kotlin JSON work. Learn which library fits your stack, how to pretty-print JSON, and which setup mistakes to avoid.",
};

export default function KotlinJsonLibrariesArticle() {
  return (
    <>
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        <FileJson size={32} /> Kotlin JSON Serialization and Formatting Libraries
      </h1>

      <div className="space-y-6">
        <p>
          If you are choosing a Kotlin JSON library today, the short answer is simple: use{" "}
          <code>kotlinx.serialization</code> for most new Kotlin projects, especially if you care about Kotlin
          Multiplatform, compiler-checked models, or minimal runtime reflection. Use Jackson when you are already in a
          Jackson-centric JVM stack, and keep Moshi when an existing Android or JVM app already depends on it. Gson is
          still common in older codebases, but it is no longer the first recommendation for new Kotlin-first work.
        </p>
        <p>
          Search visitors usually need two slightly different things here: a library for mapping JSON to Kotlin data
          classes, and a practical way to format or pretty-print JSON. The best libraries do both, but their tradeoffs
          are different. This guide focuses on that decision first, then shows the modern Kotlin setup that people
          actually use.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Box size={24} /> Quick Recommendation
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>New Kotlin or Kotlin Multiplatform project:</strong> choose <code>kotlinx.serialization</code>.
          </li>
          <li>
            <strong>Spring Boot or an existing Jackson backend:</strong> stay with <code>jackson-module-kotlin</code>{" "}
            unless you have a clear reason to standardize on something else.
          </li>
          <li>
            <strong>Existing Android app already using Moshi adapters:</strong> Moshi is still a solid choice.
          </li>
          <li>
            <strong>Legacy app already built around Gson:</strong> keep it if the codebase is stable, but do not pick
            it first for a new Kotlin project.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Code size={24} /> Which Library Fits Which Job?
        </h2>
        <div className="my-4 overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/40">
              <tr>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold dark:border-gray-700">
                  Library
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold dark:border-gray-700">
                  Best for
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold dark:border-gray-700">
                  Strengths
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-semibold dark:border-gray-700">
                  Watch out for
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  <code>kotlinx.serialization</code>
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  New Kotlin apps, KMP, shared models, low-reflection setups
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Official Kotlin library, compiler plugin, strong Kotlin type support, easy pretty printing
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Requires the serialization plugin and explicit serializers for some advanced cases
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  <code>jackson-module-kotlin</code>
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  JVM services, Spring Boot apps, mixed Java and Kotlin stacks
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Huge ecosystem, common server-side default, integrates well with existing Jackson tooling
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  JVM-only and heavier than Kotlin-first alternatives if all you need is Kotlin model mapping
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Moshi
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Existing Android or JVM apps already built around Moshi
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Clean adapter API, Kotlin-aware codegen, familiar in many Android codebases
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Not multiplatform, and Kotlin support is best when you use codegen or the Kotlin adapter factory
                </td>
              </tr>
              <tr className="align-top">
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">Gson</td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Legacy maintenance and Java interoperability
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Ubiquitous, familiar, and easy to find in older tutorials
                </td>
                <td className="border border-gray-200 px-4 py-3 dark:border-gray-700">
                  Less natural Kotlin handling around nullability, defaults, and modern Kotlin-first conventions
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Sparkles size={24} /> Why <code>kotlinx.serialization</code> Is the Default Pick
        </h2>
        <p>
          JetBrains maintains <code>kotlinx.serialization</code> as the official Kotlin serialization library, and that
          matters in practice. It works across JVM, Android, JavaScript, Native, and iOS targets, fits naturally with
          Kotlin data classes and sealed hierarchies, and avoids the "Java library with Kotlin add-ons" feeling that
          you get from older options.
        </p>
        <p>
          It is also a good fit for formatting JSON, not just data binding. If you need a compact API payload in one
          place and human-readable pretty JSON in another, you can do both with the same library and the same model
          types.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Setup</h3>
        <p>
          The important rule is that the Kotlin serialization compiler plugin should match your Kotlin version. The JSON
          runtime library has its own version, so check the latest compatible release when you add it.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h4 className="mb-2 text-lg font-medium">
            <code>build.gradle.kts</code>
          </h4>
          <pre className="rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>
              {`plugins {
    kotlin("jvm") version "<your-kotlin-version>"
    kotlin("plugin.serialization") version "<same-kotlin-version>"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:<latest-compatible-version>")
}`}
            </code>
          </pre>
        </div>
        <p>
          If serialization mysteriously fails at compile time, the missing plugin is usually the reason. Adding the
          runtime dependency alone is not enough.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Basic Serialization and Deserialization</h3>
        <p>
          For normal application code, the pattern is simple: annotate the model with <code>@Serializable</code>,
          create a configured <code>Json</code> instance, and then encode or decode.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>
              {`import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

@Serializable
data class ApiUser(
    @SerialName("user_id") val id: String,
    val name: String,
    val roles: List<String> = emptyList(),
    val email: String? = null
)

val json = Json {
    ignoreUnknownKeys = true
    encodeDefaults = true
}

fun main() {
    val input = """{"user_id":"42","name":"Ada","extra":"ignored"}"""
    val user = json.decodeFromString<ApiUser>(input)

    println(user) // ApiUser(id=42, name=Ada, roles=[], email=null)
    println(json.encodeToString(user))
    // {"user_id":"42","name":"Ada","roles":[],"email":null}
}`}
            </code>
          </pre>
        </div>
        <p>
          Two small configuration flags do a lot of work here. <code>ignoreUnknownKeys = true</code> keeps your app
          from breaking when an API adds fields you do not care about yet, and <code>encodeDefaults = true</code> makes
          default-valued properties show up in output when you want stable, explicit JSON.
        </p>

        <h3 className="mt-6 flex items-center gap-2 text-xl font-semibold">
          <Settings size={20} /> Formatting and Pretty Printing JSON
        </h3>
        <p>
          If your goal is formatting rather than object mapping, parse the raw JSON into a <code>JsonElement</code> and
          then write it back out with <code>prettyPrint</code> enabled. That gives you a clean formatter without
          creating data classes.
        </p>
        <div className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <pre className="rounded bg-white p-3 text-sm dark:bg-gray-900">
            <code>
              {`import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.parseToJsonElement

fun main() {
    val raw = """{"name":"Ada","languages":["Kotlin","Swift"],"active":true}"""

    val formatter = Json {
        prettyPrint = true
        prettyPrintIndent = "  "
    }

    val element = Json.parseToJsonElement(raw)
    val formatted = formatter.encodeToString(JsonElement.serializer(), element)

    println(formatted)
}`}
            </code>
          </pre>
        </div>
        <p>
          That is the practical answer when someone says "I just need Kotlin JSON formatting." If you only want to
          validate and reformat arbitrary JSON text, you do not need to model the payload first.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <List size={24} /> Common Kotlin JSON Gotchas
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Default values affect missing fields.</strong> A property with a default can be omitted in incoming
            JSON; a non-default property is required.
          </li>
          <li>
            <strong>Unknown fields are strict by default.</strong> If your API evolves often, set{" "}
            <code>ignoreUnknownKeys = true</code> or use <code>@JsonIgnoreUnknownKeys</code> on specific models.
          </li>
          <li>
            <strong>Pretty printing is output-only.</strong> <code>prettyPrint</code> changes how JSON is written, not
            how it is parsed.
          </li>
          <li>
            <strong>Lenient mode is not a free win.</strong> <code>isLenient = true</code> accepts non-standard JSON,
            which can hide bad upstream data. Use it only when you control the format and truly need it.
          </li>
          <li>
            <strong>Polymorphism needs planning.</strong> Sealed classes and custom serializers are well supported, but
            you should decide early how type discriminators should appear in JSON.
          </li>
        </ul>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Box size={24} /> When Jackson or Moshi Is the Better Answer
        </h2>
        <p>
          <strong>Jackson</strong> is still a very reasonable choice for Kotlin on the JVM, especially on backend teams
          already using Jackson modules, annotations, and tooling. That is common in Spring Boot applications, where the
          default JSON stack is already built around Jackson. If your whole service ecosystem speaks Jackson, changing
          libraries just for Kotlin syntax is usually not worth the churn.
        </p>
        <p>
          <strong>Moshi</strong> remains a good option for existing Android and JVM apps. Its adapter model is clean and
          flexible, and the current Moshi guidance is to use Kotlin code generation or{" "}
          <code>KotlinJsonAdapterFactory</code> when you want Kotlin-aware behavior. If your codebase already has Moshi
          adapters and tests, staying there can be the pragmatic choice.
        </p>
        <p>
          <strong>Gson</strong> is best treated as a compatibility choice. It still works, and many production systems
          still use it, but new Kotlin-focused projects are usually better served by libraries that understand Kotlin's
          defaults, nullability, and sealed types more directly.
        </p>

        <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold">
          <Code size={24} /> Bottom Line
        </h2>
        <p>
          For most developers searching "Kotlin JSON serialization and formatting libraries," the practical answer is to
          start with <code>kotlinx.serialization</code>. It is the best default for modern Kotlin, it handles both model
          serialization and JSON formatting cleanly, and it scales from tiny scripts to multiplatform apps. Reach for
          Jackson when your JVM stack already depends on Jackson, choose Moshi when an existing Android codebase is
          built around it, and keep Gson for legacy compatibility rather than new architecture.
        </p>
      </div>
    </>
  );
}
