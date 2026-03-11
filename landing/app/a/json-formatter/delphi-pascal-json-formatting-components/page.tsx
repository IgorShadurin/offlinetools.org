import type { Metadata } from "next";
import {
  Code,
  AlignLeft,
  Indent,
  Eye,
  FileText,
  FastForward,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Delphi/Pascal JSON Formatting Components | Pretty-Print JSON in Delphi and Free Pascal",
  description:
    "Current guide to formatting JSON in Delphi, RAD Studio, Free Pascal, and Lazarus using System.JSON Format(), ToJSON, and fpjson FormatJSON().",
};

export default function DelphiPascalJsonFormattingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="mr-3" size={32} /> Delphi/Pascal JSON Formatting Components
      </h1>

      <div className="space-y-8">
        <section>
          <p className="mb-4">
            If you are looking for a Delphi/Pascal JSON formatting component, the short answer is that modern tools
            already include one. In current Delphi, the built-in <code>System.JSON</code> classes can pretty-print a
            parsed JSON value with <code>Format()</code> and serialize compact JSON with <code>ToJSON</code>. In Free
            Pascal and Lazarus, the equivalent built-in path is <code>fpjson</code>, where <code>TJSONData</code>{" "}
            exposes <code>FormatJSON()</code> for readable output and <code>AsJSON</code> for compact output.
          </p>
          <p>
            That matters because many searchers do not actually need a third-party visual component. They need the
            fastest reliable way to inspect API payloads, prettify logs, or emit readable config files from Pascal
            code. This page focuses on that practical use case.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlignLeft className="mr-2" size={24} /> Quick Answer
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="font-medium">Delphi / RAD Studio:</strong> Parse JSON into a{" "}
              <code>TJSONValue</code> and call <code>Format(2)</code> or <code>Format(4)</code> for pretty output.
            </li>
            <li>
              <strong className="font-medium">Compact Delphi output:</strong> Use <code>ToJSON</code> when you want a
              transport-friendly string without pretty-print whitespace.
            </li>
            <li>
              <strong className="font-medium">Free Pascal / Lazarus:</strong> Use <code>TJSONData.FormatJSON()</code>{" "}
              for readable output and <code>AsJSON</code> for compact output.
            </li>
            <li>
              <strong className="font-medium">Third-party libraries:</strong> Usually only needed when formatting is
              part of a larger requirement such as streaming very large payloads, custom serialization, or framework
              integration.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Indent className="mr-2" size={24} /> Delphi / RAD Studio: Built-In JSON Formatting
          </h2>
          <p className="mb-4">
            Embarcadero&apos;s current RTL docs expose JSON pretty-printing directly on <code>TJSONAncestor</code> via{" "}
            <code>Format(Indentation: Integer = 4)</code>. That means you normally do not need a writer class just to
            format JSON for humans.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm mb-2 italic">
              Current Delphi example using <code>System.JSON</code>
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`uses
  System.JSON,
  System.SysUtils;

var
  JsonText: string;
  JsonValue: TJSONValue;
begin
  JsonText := '{"name":"Alice","roles":["admin","editor"],"active":true}';
  JsonValue := TJSONObject.ParseJSONValue(JsonText, False, True);
  try
    Writeln('Pretty JSON:');
    Writeln(JsonValue.Format(2));

    Writeln('');
    Writeln('Compact JSON:');
    Writeln(JsonValue.ToJSON);
  finally
    JsonValue.Free;
  end;
end;
`}
              </pre>
            </div>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="font-medium">Use exceptions when validating input:</strong> Passing{" "}
              <code>RaiseExc = True</code> helps you fail fast on malformed JSON instead of silently getting{" "}
              <code>nil</code>.
            </li>
            <li>
              <strong className="font-medium">Indentation is simple and predictable:</strong> <code>Format(2)</code>,{" "}
              <code>Format(4)</code>, and similar calls control the number of spaces per nesting level.
            </li>
            <li>
              <strong className="font-medium">Compact output uses JSON escaping rules:</strong> <code>ToJSON</code> is
              the better fit when the string is leaving your app rather than being read by a person in a debugger.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2" size={24} /> Free Pascal / Lazarus: fpjson
          </h2>
          <p className="mb-4">
            For Free Pascal projects, the <code>fcl-json</code> package provides the equivalent feature set. The
            current docs describe <code>TJSONData.FormatJSON(Options, IndentSize)</code> for formatted output and{" "}
            <code>AsJSON</code> for the compact representation.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <p className="text-sm mb-2 italic">
              Current Free Pascal / Lazarus example using <code>fpjson</code>
            </p>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`uses
  fpjson,
  jsonparser,
  SysUtils;

var
  Data: TJSONData;
begin
  Data := GetJSON('{"name":"Alice","roles":["admin","editor"],"active":true}');
  try
    Writeln('Pretty JSON:');
    Writeln(Data.FormatJSON([], 2));

    Writeln('');
    Writeln('Compact JSON:');
    Writeln(Data.AsJSON);
  finally
    Data.Free;
  end;
end;
`}
              </pre>
            </div>
          </div>
          <p>
            One useful detail from the Free Pascal docs: <code>FormatJSON</code> is convenient, but it is not
            optimized for speed. That is fine for tooling, debugging, admin screens, and occasional exports, but it is
            a poor choice for tight loops or very large payloads on hot paths.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2" size={24} /> Choosing the Right Approach
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="font-medium">Use the built-in RTL first in Delphi:</strong> If your only goal is
              pretty-printing or compacting JSON, <code>System.JSON</code> already covers it cleanly.
            </li>
            <li>
              <strong className="font-medium">Use fpjson first in Free Pascal:</strong> It solves the same problem
              without adding another dependency to a Lazarus or CLI project.
            </li>
            <li>
              <strong className="font-medium">Add third-party JSON libraries only for broader needs:</strong> Think
              object mapping, custom serializers, framework conventions, or specialized performance requirements.
            </li>
            <li>
              <strong className="font-medium">Use an external formatter tool for inspection workflows:</strong> When
              you are comparing API responses, checking malformed payloads, or formatting ad-hoc JSON from logs, a
              dedicated formatter is usually faster than writing a helper app.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="mr-2" size={24} /> Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="font-medium">Using outdated conceptual examples:</strong> In current Delphi docs,
              <code> Format()</code> is the direct pretty-print method. You do not need to invent a formatter pipeline
              just to indent JSON.
            </li>
            <li>
              <strong className="font-medium">Expecting key sorting from the built-in formatter:</strong> Pretty
              printing changes whitespace, not object semantics. If you need stable alphabetical key ordering for
              diffs, you must reorder properties before serialization.
            </li>
            <li>
              <strong className="font-medium">Formatting invalid JSON:</strong> Formatters are not repair tools. Parse
              first, handle errors, then serialize the parsed structure.
            </li>
            <li>
              <strong className="font-medium">Pretty-printing in production hot paths:</strong> Readable JSON is larger
              and slower to produce. Use it for logs, diagnostics, and human-facing exports, not every network hop.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FastForward className="mr-2" size={24} /> When This Matters Most
          </h2>
          <p className="mb-4">
            JSON formatting pays off most when you are debugging REST responses, storing readable fixture files,
            troubleshooting webhook payloads, or logging intermediate data during Pascal development. In those cases,
            readable structure is worth the extra bytes.
          </p>
          <p>
            For machine-to-machine transport, prefer compact JSON from <code>ToJSON</code> or <code>AsJSON</code>, and
            only pretty-print the payload when a human actually needs to read it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2" size={24} /> Official References
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a
                className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
                href="https://docwiki.embarcadero.com/Libraries/Athens/en/System.JSON.TJSONAncestor.Format"
                rel="noreferrer"
                target="_blank"
              >
                Embarcadero: System.JSON.TJSONAncestor.Format
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
                href="https://docwiki.embarcadero.com/Libraries/Athens/en/System.JSON.TJSONAncestor.ToJSON"
                rel="noreferrer"
                target="_blank"
              >
                Embarcadero: System.JSON.TJSONAncestor.ToJSON
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
                href="https://www.freepascal.org/docs-html/fcl/fpjson/tjsondata.formatjson.html"
                rel="noreferrer"
                target="_blank"
              >
                Free Pascal: TJSONData.FormatJSON
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 underline underline-offset-2 dark:text-blue-400"
                href="https://docs.freepascal.org/docs-html/current/fcl/fpjson/index.html"
                rel="noreferrer"
                target="_blank"
              >
                Free Pascal: fpjson unit overview
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
