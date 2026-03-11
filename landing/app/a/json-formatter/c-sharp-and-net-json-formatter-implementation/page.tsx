import type { Metadata } from "next";
import { FileJson, Code, Settings, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "C# JSON Formatter: Pretty Print JSON with .NET and Newtonsoft",
  description:
    "Format, pretty-print, and minify JSON strings in C# with System.Text.Json or Newtonsoft.Json. Includes reusable helpers, a CLI example, .NET 9 indentation notes, and troubleshooting.",
};

export default function CSharpJsonFormatterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FileJson className="w-8 h-8 mr-3 text-blue-500" /> C# and .NET JSON Formatter Implementation
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          If you need to <strong>format a JSON string in C#</strong>, the reliable pattern is simple: parse the JSON,
          then serialize it back out either with indentation for readability or without indentation for compact output.
          For modern .NET apps, <code>System.Text.Json</code> is the default choice. For older codebases or projects
          that already depend on Json.NET, <code>Newtonsoft.Json</code> is still a solid option.
        </p>

        <p>
          Search visitors usually want one of three things here: a quick <strong>C# pretty-print helper</strong>, the
          exact <strong>Newtonsoft.Json</strong> equivalent, or a small <strong>CLI formatter</strong> they can drop
          into a console app. This page focuses on those answers first, then covers the edge cases that usually cause
          formatting code to fail.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Use <code>System.Text.Json</code> for new .NET work unless you already have a strong reason to stay on
            Json.NET.
          </li>
          <li>
            Parse existing JSON strings before formatting them. Serializing a raw string directly will quote the string
            instead of reformatting the JSON inside it.
          </li>
          <li>
            Use pretty-printing for logs, debugging, docs, and copied API responses. Use compact output when size
            matters.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" /> Quick Answer for Modern .NET
        </h2>
        <p>
          For most current C# projects, this is the formatter helper you want. It handles both{" "}
          <strong>pretty print</strong> and <strong>minify</strong> for an existing JSON string using{" "}
          <code>System.Text.Json</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">
            Example: Format a JSON string in C# with <code>System.Text.Json</code>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using System.Text.Json;

public static class JsonFormatter
{
    private static readonly JsonSerializerOptions PrettyOptions = new()
    {
        WriteIndented = true,
#if NET9_0_OR_GREATER
        IndentCharacter = ' ',
        IndentSize = 2
#endif
    };

    public static string PrettyPrint(string json)
    {
        using JsonDocument document = JsonDocument.Parse(json);
        return JsonSerializer.Serialize(document.RootElement, PrettyOptions);
    }

    public static string Minify(string json)
    {
        using JsonDocument document = JsonDocument.Parse(json);
        return JsonSerializer.Serialize(document.RootElement);
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        <p>
          That covers the common search intent behind queries like <em>c# format json string</em> and{" "}
          <em>c# json formatter</em>. If the input is already a C# object rather than a JSON string, skip the parse
          step and call <code>JsonSerializer.Serialize(objectValue, PrettyOptions)</code> directly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-500" /> System.Text.Json Notes That Matter in 2026
        </h2>
        <p>
          <code>System.Text.Json</code> is the built-in JSON stack for modern .NET and is usually the best default for
          a formatter. It gives you good performance, fewer dependencies, and straightforward APIs for both DOM-style
          and streaming scenarios.
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Pretty-printing:</strong> Set <code>WriteIndented = true</code> when serializing.
          </li>
          <li>
            <strong>Minifying:</strong> The default serializer output is compact, so no special setting is required.
          </li>
          <li>
            <strong>Current .NET 9 detail:</strong> <code>JsonSerializerOptions</code> now lets you control
            indentation style with <code>IndentCharacter</code> and <code>IndentSize</code>, which is useful if your
            team wants tabs or 4-space indentation instead of the default style.
          </li>
          <li>
            <strong>DOM choice:</strong> <code>JsonDocument</code> is read-only and a good fit when you only need to
            reformat. <code>JsonNode</code> is easier if you want to edit values before writing the JSON back out.
          </li>
          <li>
            <strong>Reuse options:</strong> Reuse <code>JsonSerializerOptions</code> instances in hot paths instead of
            creating new ones for every call.
          </li>
        </ul>

        <p>
          For formatting an arbitrary JSON string, <code>JsonDocument</code> is typically the cleanest choice because
          it validates the input and avoids mapping the payload to C# classes you do not need.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">
            Example: Accept comments and trailing commas before formatting
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using System.Text.Json;

public static string PrettyPrintLooseJson(string json)
{
    var documentOptions = new JsonDocumentOptions
    {
        CommentHandling = JsonCommentHandling.Skip,
        AllowTrailingCommas = true
    };

    using JsonDocument document = JsonDocument.Parse(json, documentOptions);

    var serializerOptions = new JsonSerializerOptions
    {
        WriteIndented = true
    };

    return JsonSerializer.Serialize(document.RootElement, serializerOptions);
}`}
              </code>
            </pre>
          </div>
        </div>

        <p>
          This is useful when the input came from config-like JSON, test fixtures, or copied API samples that include
          comments or dangling commas. The output is still standard JSON, so comments and trailing commas are removed
          during formatting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-500" /> Newtonsoft.Json Pretty Print and Compact
        </h2>
        <p>
          If your project already uses <code>Newtonsoft.Json</code>, stick with it for formatting. The API is still
          concise, and this path directly answers searches like <em>newtonsoft json pretty print</em>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">
            Example: Pretty-print and minify with <code>Newtonsoft.Json</code>
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public static class NewtonsoftJsonFormatter
{
    public static string PrettyPrint(string json)
    {
        JToken token = JToken.Parse(json);
        return token.ToString(Formatting.Indented);
    }

    public static string Minify(string json)
    {
        JToken token = JToken.Parse(json);
        return token.ToString(Formatting.None);
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        <p>
          A useful Json.NET detail: <code>JToken.ToString()</code> without arguments already returns indented JSON. If
          you want the compact form explicitly, use <code>Formatting.None</code>.
        </p>

        <p>
          Use Json.NET when you are maintaining legacy .NET Framework code, already depend on <code>JObject</code> /{" "}
          <code>JArray</code>, or need ecosystem features your codebase already relies on. For brand-new apps that only
          need formatting, <code>System.Text.Json</code> is usually the cleaner default.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="w-6 h-6 mr-2 text-purple-500" /> Simple CLI JSON Formatter in C#
        </h2>
        <p>
          For a small console utility, read from a file or standard input, parse once, and write the normalized JSON
          to standard output. This is the clean answer for developers looking for a <strong>C# CLI JSON formatter</strong>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Minimal console formatter</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              <code className="language-csharp">
                {`using System.Text.Json;

if (args.Length == 0)
{
    Console.Error.WriteLine("Usage: jsonfmt <path-or-> [--minify]");
    return 1;
}

string input = args[0] == "-"
    ? Console.In.ReadToEnd()
    : File.ReadAllText(args[0]);

bool minify = args.Contains("--minify");

try
{
    using JsonDocument document = JsonDocument.Parse(input);

    var options = new JsonSerializerOptions
    {
        WriteIndented = !minify
    };

    Console.WriteLine(JsonSerializer.Serialize(document.RootElement, options));
    return 0;
}
catch (JsonException ex)
{
    Console.Error.WriteLine("Invalid JSON: " + ex.Message);
    return 1;
}`}
              </code>
            </pre>
          </div>
        </div>

        <p>
          If you need <strong>table output</strong> in a CLI, that is a separate problem from formatting. JSON
          formatters preserve the JSON structure; they do not flatten nested objects into columns. For tabular output,
          deserialize into a typed model or transform the JSON first.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" /> Common Mistakes and Troubleshooting
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Do not serialize a raw JSON string directly.</strong> This is the most common mistake.{" "}
            <code>JsonSerializer.Serialize(jsonString)</code> and <code>JsonConvert.SerializeObject(jsonString)</code>
            will escape and quote the entire string instead of formatting its contents.
          </li>
          <li>
            <strong>Invalid JSON is still invalid after formatting.</strong> Single quotes, broken escaping, missing
            commas, and extra wrapper text will throw parse errors. If you copied the data from logs, SoapUI, or a test
            harness, make sure you are passing only the raw JSON body.
          </li>
          <li>
            <strong>Formatting is not byte-for-byte preservation.</strong> A formatter rewrites whitespace and may also
            normalize escape sequences or remove tolerated extras like comments and trailing commas.
          </li>
          <li>
            <strong>Very large payloads need different tactics.</strong> For large files or performance-sensitive loops,
            prefer streaming APIs like <code>Utf8JsonWriter</code> rather than repeatedly building an in-memory DOM just
            to make logs look nicer.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Which Formatter Should You Use?</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Choose <code>System.Text.Json</code> for new .NET applications, lightweight dependencies, and strong
            default performance.
          </li>
          <li>
            Choose <code>Newtonsoft.Json</code> when the codebase already uses Json.NET heavily or relies on its DOM and
            customization model.
          </li>
          <li>
            Choose a CLI wrapper around <code>System.Text.Json</code> when you want a quick formatter for scripts,
            pipelines, or local tooling.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The best C# JSON formatter implementation is usually just parse, validate, and serialize with the right
          indentation settings. In current .NET, <code>System.Text.Json</code> is the default answer for most apps,
          while <code>Newtonsoft.Json</code> remains a practical option for existing codebases and Json.NET-heavy
          workflows. If your main goal is simply to pretty-print a string, the small helper methods above are enough.
        </p>
      </div>
    </>
  );
}
