import type { Metadata } from "next";
import { CodeXml, FileJson, Zap, MemoryStick, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Zig Language JSON Formatter Implementations | Offline Tools",
  description:
    "Current Zig JSON formatter patterns using std.json.Value, parseFromSlice, and Stringify for pretty-printing, minifying, and streaming output.",
};

export default function ZigJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CodeXml className="w-8 h-8 mr-3 text-blue-500" />
        Zig Language JSON Formatter Implementations
      </h1>

      <div className="space-y-6">
        <p>
          If you are building a JSON formatter in Zig today, the most practical default is to parse arbitrary input into{" "}
          <code>std.json.Value</code> and write it back out with <code>std.json.Stringify.value(...)</code>. As of Zig{" "}
          <code>0.15.2</code>, the standard library already gives you the core pieces you need: RFC 8259 parsing,
          pretty-printing and minifying via whitespace options, and a lower-level streaming writer when you need manual
          control.
        </p>
        <p>
          The old advice to hand-roll a formatter with string manipulation is still bad advice. In Zig, the real choice
          is between three implementations: parse and re-serialize arbitrary JSON, parse into a typed schema, or emit
          JSON directly with the streaming writer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="w-7 h-7 mr-2 text-green-500" />
          1. Best Default for User-Supplied JSON
        </h2>
        <p>
          For a formatter CLI, web handler, or editor integration, parse into <code>std.json.Value</code>. That gives
          you full JSON validation and lets the formatter handle unknown shapes without needing a compile-time Zig type.
        </p>
        <p>
          The most important current detail is numeric round-tripping. When you parse into <code>std.json.Value</code>,{" "}
          <code>ParseOptions.parse_numbers</code> defaults to <code>true</code>, which may turn some numbers into{" "}
          <code>integer</code> or <code>float</code> values. For a formatter, that can normalize numeric spelling. If
          you want safer round-tripping for arbitrary JSON, set <code>parse_numbers = false</code> so numbers stay as{" "}
          <code>number_string</code>.
        </p>

        <h3 className="text-xl font-semibold mt-6">Pretty-print Arbitrary JSON</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            <code className="language-zig">
              {`const std = @import("std");

pub fn formatAnyJson(
    allocator: std.mem.Allocator,
    input: []const u8,
    writer: *std.io.Writer,
) !void {
    var parsed = try std.json.parseFromSlice(std.json.Value, allocator, input, .{
        .parse_numbers = false,
    });
    defer parsed.deinit();

    try std.json.Stringify.value(parsed.value, .{
        .whitespace = .indent_2,
    }, writer);
}
`}
            </code>
          </pre>
        </div>
        <p>
          For minified output, keep the same implementation and switch <code>.whitespace</code> to{" "}
          <code>.minified</code>, which is the default.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Zap className="w-7 h-7 mr-2 text-yellow-500" />
          2. Typed Parsing When You Want Validation
        </h2>
        <p>
          If the formatter is really a normalizer for a known config format, parse straight into a Zig struct instead of{" "}
          <code>std.json.Value</code>. This is the right implementation when you want schema checks, default values, and
          explicit unknown-field handling.
        </p>

        <h3 className="text-xl font-semibold mt-6">Format a Known JSON Schema</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            <code className="language-zig">
              {`const std = @import("std");

const AppConfig = struct {
    name: []const u8,
    port: u16 = 8080,
    features: []const []const u8,
    log_file: ?[]const u8 = null,
};

pub fn normalizeConfig(
    allocator: std.mem.Allocator,
    input: []const u8,
    writer: *std.io.Writer,
) !void {
    var parsed = try std.json.parseFromSlice(AppConfig, allocator, input, .{
        .ignore_unknown_fields = false,
    });
    defer parsed.deinit();

    try std.json.Stringify.value(parsed.value, .{
        .whitespace = .indent_2,
        .emit_null_optional_fields = false,
    }, writer);
}
`}
            </code>
          </pre>
        </div>
        <p>
          This approach is cleaner than using <code>std.json.Value</code> when the input shape is fixed, but it is not
          a drop-in replacement for a general formatter. You lose the ability to preserve unexpected fields, and your
          output is constrained by the Zig type you chose.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Ruler className="w-7 h-7 mr-2 text-red-500" />
          3. Streaming Output for Large or Generated Payloads
        </h2>
        <p>
          When you are generating JSON yourself, or you need to avoid building a full tree before writing output, use
          the low-level <code>std.json.Stringify</code> writer directly. This is the closest thing Zig currently has to
          a manual JSON write stream in the standard library.
        </p>

        <h3 className="text-xl font-semibold mt-6">Manual Streaming Writer</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            <code className="language-zig">
              {`const std = @import("std");

pub fn writeResponse(writer: *std.io.Writer) !void {
    var jw: std.json.Stringify = .{
        .writer = writer,
        .options = .{ .whitespace = .indent_2 },
    };

    try jw.beginObject();
    try jw.objectField("ok");
    try jw.write(true);
    try jw.objectField("items");
    try jw.beginArray();
    try jw.write("alpha");
    try jw.write("beta");
    try jw.endArray();
    try jw.endObject();
}
`}
            </code>
          </pre>
        </div>
        <p>
          The same writer also exposes <code>print</code>, <code>beginWriteRaw</code>, and{" "}
          <code>beginObjectFieldRaw</code> for edge cases such as custom number formatting or very long streamed
          strings. Use those only when you truly need them; for most formatter code, <code>write</code> and{" "}
          <code>objectField</code> are enough.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MemoryStick className="w-7 h-7 mr-2 text-purple-500" />
          Current Options Worth Exposing
        </h2>
        <p>
          A useful formatter usually needs only a small set of options. In current Zig, the highest-value ones are:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Whitespace mode:</strong> <code>.minified</code>, <code>.indent_1</code>, <code>.indent_2</code>,{" "}
            <code>.indent_3</code>, <code>.indent_4</code>, <code>.indent_8</code>, or <code>.indent_tab</code>.
          </li>
          <li>
            <strong>Optional null output:</strong> <code>emit_null_optional_fields</code> controls whether null
            optional fields are emitted when serializing Zig structs.
          </li>
          <li>
            <strong>Unicode escaping:</strong> <code>escape_unicode</code> forces non-ASCII characters to be escaped.
          </li>
          <li>
            <strong>Byte-slice behavior:</strong> <code>emit_strings_as_arrays</code> can serialize <code>[]u8</code>{" "}
            as numeric arrays instead of JSON strings.
          </li>
          <li>
            <strong>Large-number portability:</strong> <code>emit_nonportable_numbers_as_strings</code> can quote
            numbers outside the precise integer range of <code>f64</code>.
          </li>
          <li>
            <strong>Strictness during parsing:</strong> <code>ignore_unknown_fields</code>,{" "}
            <code>duplicate_field_behavior</code>, and <code>allocate</code> matter when you are parsing into a typed
            Zig value.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Practical Caveats</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Always call <code>deinit()</code>:</strong> <code>parseFromSlice</code> returns a{" "}
            <code>std.json.Parsed(T)</code> wrapper that owns arena-allocated memory.
          </li>
          <li>
            <strong>Formatting is not canonicalization:</strong> the standard library pretty-prints and minifies, but
            it does not add built-in key sorting for canonical JSON output.
          </li>
          <li>
            <strong>Comments and trailing commas are not JSON:</strong> current <code>std.json</code> is aimed at RFC
            8259 JSON, so invalid input should be rejected instead of guessed at.
          </li>
          <li>
            <strong>Parse-and-rewrite still uses memory:</strong> for arbitrary user input, it is the simplest correct
            choice; for massive generated output, manual streaming is the better fit.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Recommendation</h2>
        <p>
          If your goal is a real Zig JSON formatter, start with <code>std.json.Value</code> plus{" "}
          <code>std.json.Stringify.value</code>. Add <code>parse_numbers = false</code> when you care about preserving
          numeric lexemes, expose a whitespace mode flag, and only move to the lower-level writer when you need
          streaming output or custom emission behavior.
        </p>
      </div>
    </>
  );
}
