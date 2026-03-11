import type { Metadata } from "next";
import { AlertTriangle, BookOpen, CheckCircle, Code, Package, Wrench, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Scala JSON Formatter Libraries and Approaches | Offline Tools",
  description:
    "Compare current Scala JSON formatting options in Circe, Play JSON, uPickle/ujson, and Jackson Scala Module, with pretty-print examples, Scala 3 notes, and customization tips.",
};

export default function ScalaJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Scala JSON Formatter Libraries and Approaches</h1>

      <div className="space-y-6">
        <p>
          If you searched for a Scala JSON formatter, the practical question is usually not just{" "}
          <em>&quot;how do I pretty-print JSON?&quot;</em> but <em>&quot;which Scala library should I use, and what does its
          formatting API look like today?&quot;</em> The good news is that the mainstream options all handle compact vs.
          human-readable output well. The better answer depends on whether you are already committed to a JSON stack,
          whether you need deterministic output for tests and diffs, and whether you are formatting raw JSON strings or
          Scala values during serialization.
        </p>
        <p>
          For most teams, the right choice is the JSON library they already use elsewhere in the application. Pretty
          printing is only one feature. Circe is strong when you want a functional AST plus configurable printers, Play
          JSON stays simple and familiar inside Play or standalone projects, uPickle/ujson is excellent when you want a
          lightweight formatter that can reformat raw strings directly, and Jackson fits best when your stack already
          revolves around Java tooling and <code>ObjectMapper</code>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Zap className="mr-2" size={24} /> Quick Answer
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} />
            Choose <strong>Circe</strong> if you already use Cats / Typelevel libraries and want the cleanest built-in
            pretty printer options, including sorted keys and custom printers.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} />
            Choose <strong>Play JSON</strong> if you are in the Play ecosystem or want the most straightforward{" "}
            <code>Json.prettyPrint(Json.parse(raw))</code> workflow.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} />
            Choose <strong>uPickle / ujson</strong> if you want a lightweight, current option for reformatting raw JSON
            strings with <code>indent</code> and <code>sortKeys</code> controls.
          </li>
          <li>
            <CheckCircle className="inline-block mr-2 text-green-500" size={20} />
            Choose <strong>Jackson Scala Module</strong> if your codebase is already Jackson-based or you need mapper and
            writer-level control beyond a simple pretty-print call.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Package className="mr-2" size={24} /> Comparison at a Glance
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Library</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Best Fit</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">Simple Pretty Print</th>
                <th className="text-left p-3 border-b border-gray-200 dark:border-gray-700">What Stands Out</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-medium">Circe</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Functional Scala projects that already use Cats or Typelevel libraries.
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code>parse(raw).map(_.spaces2)</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Built-in <code>spaces2</code>, <code>spaces2SortKeys</code>, and configurable{" "}
                  <code>Printer</code>.
                </td>
              </tr>
              <tr className="align-top">
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-medium">Play JSON</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Play apps or standalone projects that want simple AST-based JSON handling.
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code>Json.prettyPrint(Json.parse(raw))</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Clean API and good ecosystem fit, but less printer customization than Circe or Jackson.
                </td>
              </tr>
              <tr className="align-top">
                <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-medium">uPickle / ujson</td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Lightweight projects, scripts, CLIs, or tools that mostly need to reformat JSON quickly.
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <code>ujson.reformat(raw, indent = 2, sortKeys = true)</code>
                </td>
                <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                  Direct raw-string reformatting, plus <code>indent</code> and <code>sortKeys</code> without much setup.
                </td>
              </tr>
              <tr className="align-top">
                <td className="p-3 font-medium">Jackson Scala Module</td>
                <td className="p-3">
                  Java-heavy stacks, Spring mixed environments, or codebases centered on <code>ObjectMapper</code>.
                </td>
                <td className="p-3">
                  <code>mapper.writerWithDefaultPrettyPrinter()</code>
                </td>
                <td className="p-3">
                  Strong mapper configuration story and highly customizable writer / pretty-printer behavior.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          As of early 2026, official docs for Circe, Play JSON, uPickle, and Jackson Scala Module all show active Scala
          3 support. That matters because some older blog posts still frame Scala JSON formatting as mostly a Scala 2
          story, which is outdated.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="mr-2" size={24} /> Formatting a Raw JSON String
        </h2>
        <p>
          This is the most useful formatter workflow for logging, debugging, developer tools, and one-off payload
          inspection. You start with a JSON string, parse it, and then write it back in a pretty-printed form.
        </p>

        <h3 className="text-xl font-semibold mt-6">Circe</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import io.circe.parser.parse

val raw =
  """{"z":1,"a":{"nested":true},"tags":["scala","json"]}"""

val formatted: Either[io.circe.ParsingFailure, String] =
  parse(raw).map(_.spaces2SortKeys)
`}
            </pre>
          </div>
        </div>
        <p>
          Circe is especially nice when you want explicit error handling. Parsing returns an <code>Either</code>, so you
          do not have to rely on exceptions for invalid JSON. If you want compact output instead, use{" "}
          <code>.noSpaces</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Play JSON</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import play.api.libs.json.Json

val raw =
  """{"z":1,"a":{"nested":true},"tags":["scala","json"]}"""

val formatted: String =
  Json.prettyPrint(Json.parse(raw))
`}
            </pre>
          </div>
        </div>
        <p>
          This is the simplest mental model in the Play ecosystem: parse into a <code>JsValue</code>, then pretty print
          it. If all you want is readable output and you are already using Play JSON elsewhere, this is often enough.
        </p>

        <h3 className="text-xl font-semibold mt-6">uPickle / ujson</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`val raw =
  """{"z":1,"a":{"nested":true},"tags":["scala","json"]}"""

val formatted: String =
  ujson.reformat(raw, indent = 2, sortKeys = true)
`}
            </pre>
          </div>
        </div>
        <p>
          This is one of the most practical current approaches when your task is literally <em>reformat this JSON
          string</em>. You do not need to map to case classes first, and current docs show <code>indent</code>,{" "}
          <code>escapeUnicode</code>, and <code>sortKeys</code> controls directly on <code>reformat</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Jackson Scala Module</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import com.fasterxml.jackson.databind.json.JsonMapper

val raw =
  """{"z":1,"a":{"nested":true},"tags":["scala","json"]}"""

val mapper = JsonMapper.builder().build()
val node = mapper.readTree(raw)
val formatted = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(node)
`}
            </pre>
          </div>
        </div>
        <p>
          For raw string reformatting, Jackson does not need Scala-specific support yet because you are only working
          with a JSON tree. Add the Scala module when you serialize Scala collections or case classes through the same
          mapper.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2" size={24} /> Formatting Scala Values During Serialization
        </h2>
        <p>
          If your application already has Scala values in memory, pretty printing typically happens after encoding to a
          JSON AST or during the write call itself.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Circe
user.asJson.spaces2

// Play JSON
Json.prettyPrint(Json.toJson(user))

// uPickle
write(user, indent = 2, sortKeys = true)

// Jackson
mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user)
`}
            </pre>
          </div>
        </div>
        <p>
          In other words, pretty printing is usually a final rendering concern. Your codec or macro derivation choice
          matters more for application design; the formatting call is usually just one line on top of that.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-2" size={24} /> Deterministic Output and Custom Rules
        </h2>
        <p>
          The moment formatting becomes part of tests, snapshots, cache keys, or human code review, deterministic output
          matters more than simple readability. Sorted keys and consistent null handling are the first things teams
          usually care about.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Circe:</strong> You can use <code>.spaces2SortKeys</code> for a quick stable representation or build
            a custom <code>Printer</code> when you need sorted keys, a specific indent string, or dropped null fields.
          </li>
          <li>
            <strong>uPickle / ujson:</strong> Current docs expose <code>sortKeys = true</code> directly, which makes it
            unusually convenient for test fixtures and JSON diffing.
          </li>
          <li>
            <strong>Play JSON:</strong> The built-in pretty printer is intentionally straightforward. It is good for
            readable output, but it is not the first choice when you need lots of printer customization.
          </li>
          <li>
            <strong>Jackson:</strong> If formatting is part of a broader serialization policy, Jackson gives you the most
            room to centralize behavior through mapper features and custom pretty printers.
          </li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Circe custom printer example</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import io.circe.Printer

val printer = Printer(
  indent = "  ",
  dropNullValues = true,
  sortKeys = true
)

val stableJson: String = printer.print(json)
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <AlertTriangle className="mr-2" size={24} /> Current Gotchas
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Do not optimize for pretty printing alone.</strong> If your application already depends on Circe,
            Play JSON, uPickle, or Jackson for codecs and parsing, adding a second JSON library just for formatting is
            usually wasted complexity.
          </li>
          <li>
            <strong>Invalid JSON still has to parse first.</strong> A formatter cannot rescue malformed input; it can
            only re-render valid JSON into a different layout.
          </li>
          <li>
            <strong>Older advice about Scala 3 can be stale.</strong> Current official docs for these libraries now show
            solid Scala 3 support, so check the project docs instead of relying on older comparison posts.
          </li>
          <li>
            <strong>Jackson 3 changed some Scala guidance.</strong> The current Scala module README notes Java 17 as the
            minimum and points Scala 3 users toward newer APIs such as <code>ClassTagExtensions</code> instead of the old{" "}
            <code>ScalaObjectMapper</code> pattern.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <BookOpen className="mr-2" size={24} /> Which Approach Should You Use?
        </h2>
        <p>
          If your main need is <strong>format this JSON string for a log, test fixture, or debugging session</strong>,{" "}
          <strong>ujson</strong> and <strong>Circe</strong> are the most pleasant choices because they make formatting
          and deterministic key ordering obvious. If you are already inside a <strong>Play</strong> app, keep things
          simple and use <code>Json.prettyPrint</code>. If your environment is <strong>Jackson-first</strong>, use
          Jackson and centralize formatting policies in the mapper instead of bolting on a second Scala library.
        </p>
        <p>
          The overall rule is straightforward: choose the library that fits the rest of your JSON pipeline, then use its
          built-in compact and pretty-print APIs deliberately. Pretty output is a developer-experience feature, not a
          reason to fragment your serialization stack.
        </p>
      </div>
    </>
  );
}
