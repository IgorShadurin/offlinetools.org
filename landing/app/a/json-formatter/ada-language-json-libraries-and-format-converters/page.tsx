import type { Metadata } from "next";
import {
  AlertCircle,
  ArrowLeftRight,
  BookOpen,
  CheckCircle2,
  Code,
  Component,
  GitBranch,
  Library,
  Package,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ada Language JSON Libraries and Format Converters | Offline Tools",
  description:
    "Current Ada JSON options for real projects, including GNATCOLL.JSON, json-ada, VSS JSON, code examples, Unicode caveats, and practical format-conversion advice.",
};

export default function AdaJsonArticle() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Ada Language JSON Libraries and Format Converters</h1>

      <div className="space-y-6">
        <p>
          If you searched for <strong>Ada JSON</strong>, the practical answer in 2026 is not just &quot;yes, Ada can
          do JSON.&quot; The real question is which library fits your project, how much streaming support you need, and
          whether you are building a standalone tool or working inside a larger Ada framework.
        </p>
        <p>
          For most new projects,{" "}
          <a
            href="https://docs.adacore.com/gnatcoll-docs/json.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            GNATCOLL.JSON
          </a>{" "}
          is the safest place to start. If you want a smaller dedicated package,{" "}
          <a
            href="https://alire.ada.dev/crates/json.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            json-ada
          </a>{" "}
          remains a good lightweight option. If you are already using the VSS text stack, JSON support has moved into{" "}
          <a
            href="https://alire.ada.dev/crates/vss_extra.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            vss_extra
          </a>
          .
        </p>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-2xl font-semibold">
            <CheckCircle2 className="mr-2 inline-block h-6 w-6 text-blue-600" />
            Quick Answer
          </h2>
          <ul className="my-4 list-disc space-y-2 pl-6">
            <li>
              Use <strong>GNATCOLL.JSON</strong> when you want the most established general-purpose choice with both
              tree-style and incremental parsing APIs.
            </li>
            <li>
              Use <strong>json-ada</strong> when you want a focused JSON package and you are comfortable with its
              parser/generic-package style.
            </li>
            <li>
              Use <strong>vss_extra</strong> only when your codebase already depends on the newer VSS ecosystem and you
              want JSON support there.
            </li>
            <li>
              For <strong>format conversion</strong>, expect to combine a source-format parser with a JSON writer.
              There is no dominant &quot;universal converter&quot; package in the Ada ecosystem.
            </li>
          </ul>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">
          <Library className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Current Ada JSON Libraries
        </h2>
        <p>
          Checked against current primary sources on March 11, 2026, the Ada ecosystem has a few realistic JSON paths
          rather than a huge field of competing libraries. That is useful because the decision is usually clearer than
          in larger language ecosystems.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          <Package className="mr-2 inline-block h-5 w-5 text-green-600" />
          GNATCOLL.JSON
        </h3>
        <p>
          <a
            href="https://docs.adacore.com/gnatcoll-docs/json.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            AdaCore&apos;s GNATCOLL.JSON documentation
          </a>{" "}
          shows two important modes: a normal in-memory JSON tree and an incremental parser API for larger streams.
          The current{" "}
          <a
            href="https://alire.ada.dev/crates/gnatcoll.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Alire package listing
          </a>{" "}
          exposes <code>gnatcoll</code> version <strong>26.0.0</strong>.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Best default for service code, CLI utilities, and mixed-tooling projects that already use other AdaCore
            libraries.
          </li>
          <li>
            Supports reading, writing, object and array manipulation, and lower-level parsing when you do not want to
            build the full tree first.
          </li>
          <li>
            A good fit when payload sizes vary and you do not want to paint yourself into a DOM-only corner.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">
          <Package className="mr-2 inline-block h-5 w-5 text-green-600" />
          json-ada
        </h3>
        <p>
          The{" "}
          <a
            href="https://github.com/onox/json-ada"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            json-ada repository
          </a>{" "}
          describes a standalone parser, DOM model, pretty printer, and optional duplicate-key checking. Alire
          currently lists it as the{" "}
          <a
            href="https://alire.ada.dev/crates/json.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            <code>json</code> crate at version 6.0.0
          </a>
          .
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Smaller and more focused than GNATCOLL when you only need JSON and do not want a broader utility
            collection.
          </li>
          <li>
            Uses generic packages, so the setup feels a little more Ada-like and explicit than looser parser APIs in
            other languages.
          </li>
          <li>
            The project documentation still notes that escaped Unicode sequences such as <code>\uXXXX</code> are not
            supported yet, so test this early if you process third-party API payloads.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">
          <Package className="mr-2 inline-block h-5 w-5 text-green-600" />
          VSS JSON via vss_extra
        </h3>
        <p>
          If your application already uses the Visual String Suite stack, JSON is now tied to the newer split
          repositories rather than the old monolith. The original{" "}
          <a
            href="https://github.com/AdaCore/VSS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            AdaCore VSS repository
          </a>{" "}
          was archived on <strong>October 6, 2025</strong> and points developers to <code>vss-text</code> and{" "}
          <code>vss-extra</code>. Alire currently lists{" "}
          <a
            href="https://alire.ada.dev/crates/vss_extra.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            <code>vss_extra</code> 26.0.0
          </a>{" "}
          as a work in progress.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Relevant if you are already committed to VSS strings, text, and related infrastructure.</li>
          <li>
            Not the clearest first pick for a new project whose only requirement is JSON parsing or pretty-printing.
          </li>
        </ul>

        <h3 className="mt-6 text-xl font-semibold">
          <Component className="mr-2 inline-block h-5 w-5 text-green-600" />
          AWA and Framework-Specific Layers
        </h3>
        <p>
          If you are already inside the{" "}
          <a
            href="https://alire.ada.dev/crates/awa.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Ada Web Application
          </a>{" "}
          ecosystem, using its JSON support can reduce dependency churn. That said, search visitors looking for a
          general Ada JSON answer usually want a library they can add to any project, and in that narrower sense
          GNATCOLL.JSON and json-ada are the cleaner starting points.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">
          <Settings className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Which Library Should You Choose?
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            Pick <strong>GNATCOLL.JSON</strong> if you want the most balanced default, especially for long-lived
            applications or mixed-size payloads.
          </li>
          <li>
            Pick <strong>json-ada</strong> if you prefer a dedicated JSON package and do not need GNATCOLL for
            anything else.
          </li>
          <li>
            Pick <strong>vss_extra</strong> if your team already standardized on the split VSS stack and wants to stay
            inside that ecosystem.
          </li>
          <li>
            Pick a <strong>framework-specific layer</strong> only when the rest of your application is already built
            around that framework.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">
          <Code className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Real Ada Examples
        </h2>
        <p>
          The earlier generic pattern most articles use is not very helpful. These examples use actual package names so
          you can recognize the APIs you will see in documentation and code search.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Parse and pretty-print with GNATCOLL.JSON</h3>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`with Ada.Text_IO;    use Ada.Text_IO;
with GNATCOLL.JSON; use GNATCOLL.JSON;

procedure Gnatcoll_Json_Demo is
   Root : JSON_Value := Read ("{""name"":""Ada"",""kind"":""language"",""year"":1983}");
begin
   if Has_Field (Root, "name") then
      Put_Line ("Name: " & Get (Root, "name"));
   end if;

   Set_Field (Root, "formatted_by", "Offline Tools");
   Put_Line (Write (Root, Compact => False));

exception
   when Invalid_JSON_Stream =>
      Put_Line ("Input was not valid JSON.");
end Gnatcoll_Json_Demo;
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This style is a good fit when you want a normal JSON object model first and only move to incremental
            parsing when payload size demands it.
          </p>
        </div>

        <h3 className="mt-6 text-xl font-semibold">Parse a document with json-ada</h3>
        <div className="my-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <div className="overflow-x-auto rounded bg-white p-3 dark:bg-gray-900">
            <pre>
              {`with Ada.Text_IO;
with JSON.Parsers;
with JSON.Types;

procedure Json_Ada_Demo is
   package Types is new JSON.Types (Long_Integer, Long_Float);
   package Parsers is new JSON.Parsers (Types);

   Parser : Parsers.Parser := Parsers.Create ("{""tool"":""json formatter"",""valid"":true}");
   Value  : constant Types.JSON_Value := Parser.Parse;
begin
   if Value.Contains ("tool") then
      Ada.Text_IO.Put_Line (Value ("tool").Value);
   end if;
end Json_Ada_Demo;
`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Keep the parser object alive while you use the parsed value tree. The project README explicitly documents
            that lifetime requirement.
          </p>
        </div>

        <h2 className="mt-8 text-2xl font-semibold">
          <ArrowLeftRight className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Format Conversion in Practice
        </h2>
        <p>
          Searchers also look for &quot;Ada JSON converters,&quot; but in practice most Ada teams build conversions as
          small pipelines instead of pulling in one big conversion framework.
        </p>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>Parse the source format with the best library for that format, not with a JSON library.</li>
          <li>Map the parsed data into Ada records or an intermediate object model you control.</li>
          <li>Serialize the result with GNATCOLL.JSON, json-ada, or your framework&apos;s JSON layer.</li>
          <li>
            Run the output through a formatter and validator so whitespace, escaping, and accidental trailing edits do
            not become deployment bugs.
          </li>
        </ul>
        <p>
          That workflow is usually better than searching for a magic XML-to-JSON or CSV-to-JSON Ada package, because
          the mapping rules nearly always depend on your domain model anyway.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">
          <AlertCircle className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Common Pitfalls
        </h2>
        <ul className="my-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Unicode edge cases:</strong> json-ada still documents missing support for escaped Unicode code
            points, so do not assume every web API payload will parse cleanly without tests.
          </li>
          <li>
            <strong>Large documents:</strong> tree-style parsing is convenient, but GNATCOLL&apos;s incremental parser is
            a better fit when payload size or memory pressure matters.
          </li>
          <li>
            <strong>Type mapping:</strong> JSON numbers, nulls, missing fields, and optional record components still
            need explicit Ada-side rules.
          </li>
          <li>
            <strong>Schema validation:</strong> validation is usually a separate concern. Most Ada JSON libraries focus
            on parsing and writing, not full JSON Schema tooling.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">
          <GitBranch className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Bottom Line
        </h2>
        <p>
          For most people searching for Ada JSON support today, the shortest useful answer is this: start with
          GNATCOLL.JSON, choose json-ada when you want a smaller dedicated package, and treat VSS JSON as an
          ecosystem-specific option rather than the default first recommendation.
        </p>
        <p>
          Once you have working output, use a formatter to normalize it before shipping. That is the fastest way to
          catch broken escaping, malformed edits, and hand-written sample payloads that almost look valid but are not.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">
          <BookOpen className="mr-2 inline-block h-6 w-6 text-blue-500" />
          Source Notes
        </h2>
        <p>
          Library status in this article was checked against current primary sources on March 11, 2026: AdaCore&apos;s
          GNATCOLL.JSON docs, the Alire package index for <code>gnatcoll</code>, <code>json</code>, and{" "}
          <code>vss_extra</code>, the json-ada project README, the archived AdaCore VSS repository notice, and the
          Alire listing for AWA.
        </p>
      </div>
    </>
  );
}
