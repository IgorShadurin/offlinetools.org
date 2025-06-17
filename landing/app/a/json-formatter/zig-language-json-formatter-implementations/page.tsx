import type { Metadata } from "next";
import { CodeXml, FileJson, Zap, MemoryStick, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Zig Language JSON Formatter Implementations | Offline Tools",
  description:
    "Explore different approaches and considerations for implementing JSON formatters in the Zig programming language.",
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
          JSON (JavaScript Object Notation) is a ubiquitous data interchange format. While many languages offer robust,
          built-in JSON handling, implementing such tools in a systems language like Zig presents unique challenges and
          opportunities. This page explores different ways to approach building JSON formatters in Zig, from simple
          re-serialization to more involved parsing and manipulation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <FileJson className="w-7 h-7 mr-2 text-green-500" />
          Why Format JSON?
        </h2>
        <p>JSON formatting serves several key purposes:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Readability:</strong> Pretty-printing with indentation and line breaks makes complex JSON structures
            easy for humans to read and debug.
          </li>
          <li>
            <strong>Compactness:</strong> Removing unnecessary whitespace can reduce file size, useful for network
            transmission or storage.
          </li>
          <li>
            <strong>Standardization:</strong> Ensuring consistent spacing, key ordering (though not strictly part of the
            JSON spec, it's sometimes done), and escaping helps in diffing or processing output from different sources.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Zap className="w-7 h-7 mr-2 text-yellow-500" />
          Zig's Appeal for Such Tasks
        </h2>
        <p>
          Zig is a modern systems programming language known for its focus on explicitness, performance, memory control,
          and preventing hidden control flow/allocations. These characteristics make it well-suited for building
          high-performance command-line tools, server-side applications, and libraries where processing data formats
          efficiently is crucial. A JSON formatter in Zig can be faster and use less memory than implementations in
          garbage-collected languages, especially for large inputs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Ruler className="w-7 h-7 mr-2 text-red-500" />
          Approaches to JSON Formatting
        </h2>
        <p>There are several ways to implement a JSON formatter in Zig, each with trade-offs:</p>

        <h3 className="text-xl font-semibold mt-6">1. Parse and Re-serialize</h3>
        <p>
          This is the most common and robust approach. You parse the input JSON string into an in-memory data structure
          (like a tree of Zig structs and unions representing objects, arrays, strings, numbers, booleans, and null),
          and then serialize that data structure back into a JSON string with the desired formatting.
        </p>
        <p>
          <strong>Pros:</strong> Handles nested structures correctly, validates the input JSON during parsing, allows
          for potential manipulation of the data structure before re-serializing.
          <br />
          <strong>Cons:</strong> Requires parsing the entire input into memory, which can be memory-intensive for very
          large JSON files.
        </p>

        <h4 className="text-lg font-semibold mt-4">Conceptual Zig Code Structure (Parsing & Re-serializing):</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            <code className="language-zig">
              {`const std = @import("std");
const print = std.debug.print;
const json = std.json; // Assuming a JSON library like std.json or external one

// Define a union/struct to represent JSON values
const JsonValue = union {
    object: std.json.Object,
    array: std.json.Array,
    string: []const u8,
    number: f64, // Or other numeric types
    boolean: bool,
    null: null,

    const Object = std.StringHashMap(JsonValue);
    const Array = std.ArrayList(JsonValue);

    // Helper to get type name for error messages etc.
    fn type_name(self: JsonValue) []const u8 {
        return @tagName(self);
    }
};

// Function to parse JSON from a string
fn parseJson(allocator: std.mem.Allocator, input: []const u8) !JsonValue {
    // Use a JSON parser library function
    // This is a simplified example, real parsers handle errors,
    // options, etc.
    var stream = std.json.TokenStream.init(input);
    var value = try std.json.parseFromTokenStream(JsonValue, &stream, allocator, .{});
    return value;
}

// Function to format JSON from the in-memory structure
fn formatJson(writer: anytype, value: JsonValue, indent_chars: ?[]const u8) !void {
    // Use a JSON serializer library function with formatting options
    var serializer = std.json.Serializer.init(writer, .{});
    // Real libraries would have options for indentation, etc.
    // Let's simulate basic pretty printing
    try formatValue(writer, value, 0, indent_chars);
}

// Simplified recursive formatting helper
fn formatValue(writer: anytype, value: JsonValue, indent_level: usize, indent_chars: ?[]const u8) !void {
    const indent = std.mem.replicate(writer, if (indent_chars) |chars| chars else "", indent_level);
    defer indent.deinit();

    switch (value) {
        .object => |obj| {
            try writer.writeAll("{\\n");
            var it = obj.iterator();
            var first = true;
            while (it.next()) |entry| {
                if (!first) {
                    try writer.writeAll(",\\n");
                }
                first = false;
                try writer.writeAll(indent.ptr);
                try writer.writeAll(if (indent_chars) |chars| chars else ""); // Extra indent for keys
                try writer.print("{s}: ", .{std.json.escapeString(entry.key)});
                try formatValue(writer, entry.value, indent_level + 1, indent_chars);
            }
            try writer.writeAll("\\n");
            try writer.writeAll(indent.ptr);
            try writer.writeAll("}");
        },
        .array => |arr| {
            try writer.writeAll("[\\n");
            var first = true;
            for (arr.items) |item| {
                if (!first) {
                    try writer.writeAll(",\\n");
                }
                first = false;
                try writer.writeAll(indent.ptr);
                try writer.writeAll(if (indent_chars) |chars| chars else ""); // Extra indent for items
                try formatValue(writer, item, indent_level + 1, indent_chars);
            }
            try writer.writeAll("\\n");
            try writer.writeAll(indent.ptr);
            try writer.writeAll("]");
        },
        .string => |str| try writer.print("\"{s}\"", .{std.json.escapeString(str)}),
        .number => |num| try writer.print("{}", .{num}), // Needs proper number formatting
        .boolean => |b| try writer.writeAll(if (b) "true" else "false"),
        .null => try writer.writeAll("null"),
    }
}


pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    const allocator = gpa.allocator();
    defer {
        const leaked = gpa.deinit();
        if (leaked) @panic("Leaked memory!");
    }

    const input_json =
        \\{
        \\"name\\": \\"Ziggy\\",
        \\"version\\": 0.11,
        \\"active\\": true,
        \\"tags\\": [\\"systems\\", \\"programming\\", \\"language\\"],
        \\"config\\": {
            \\"path\\": \\"/usr/local/zig\\",
            \\"debug\\": null
        }
    }
    ;

    // 1. Parse the input
    const parsed_data = try parseJson(allocator, input_json);
    defer {
        // Need to free the parsed data structure depending on how it was allocated
        // std.json.parseFromTokenStream might return a structure needing manual deallocation
        // or use an allocator that cleans up.
        // For std.json, you often use a context object for memory management.
        // Example: std.json.parseFromTokenStream(JsonValue, &stream, .{ .allocator = allocator }, .{})
        // Then use std.json.free(JsonValue, parsed_data, .{ .allocator = allocator })
    }


    // 2. Format and print
    print("--- Pretty Print ---\\n", .{});
    var stdout_file = std.io.getStdOut().writer();
    try formatJson(stdout_file, parsed_data, "  "); // Use 2 spaces for indent
    print("\\n\\n--- Compact ---\\n", .{});
    try formatJson(stdout_file, parsed_data, null); // No indent
    print("\\n", .{});
}
`}
            </code>
          </pre>
        </div>
        <p>
          <em>
            Note: The provided Zig code is conceptual and simplifies error handling and memory management for clarity. A
            real implementation would use Zig's error union types extensively and manage memory carefully, especially
            with complex data structures allocated on the heap. Libraries like <code>std.json</code> provide the
            necessary parsing and serialization tools.
          </em>
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Streaming/Event-Based Formatting</h3>
        <p>
          This approach involves reading the JSON input character by character or token by token and writing the
          formatted output directly, without building a complete in-memory tree. It's more complex to implement but can
          handle arbitrary large JSON files with minimal memory usage.
        </p>
        <p>
          A parser emits events (e.g., "start object", "key", "value", "end array"), and the formatter listens to these
          events, managing indentation and whitespace as it writes the output.
        </p>
        <p>
          <strong>Pros:</strong> Extremely memory efficient, suitable for processing JSON streams or files larger than
          available memory.
          <br />
          <strong>Cons:</strong> More complex to implement, requires careful state management (e.g., tracking current
          nesting level, whether a comma is needed).
        </p>

        <h4 className="text-lg font-semibold mt-4">Conceptual Idea (Streaming):</h4>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            <code className="language-zig">
              {`const std = @import("std");
const print = std.debug.print;

// Imagine an event enum
const JsonEvent = enum {
    StartObject, EndObject,
    StartArray, EndArray,
    Key, ValueString, ValueNumber, ValueBool, ValueNull,
    // ... potentially more value types
};

// Imagine a streaming parser that yields events
fn parseStream(reader: anytype, event_handler: anytype) !void {
    // State tracking (indent level, in object/array, comma needed)
    var indent_level: usize = 0;
    var stack = std.ArrayList(enum { object, array }).init(std.heap.page_allocator); // Track nesting type
    defer stack.deinit();

    // Loop reading tokens/characters and emitting events
    // When an event is emitted, call event_handler.handleEvent(...)
    // inside handleEvent, manage indentation and writing output
}

// An event handler struct
const FormatterEventHandler = struct {
    writer: anytype,
    indent_chars: ?[]const u8,
    indent_level: usize,
    needs_comma: std.ArrayList(bool), // Track if a comma is needed after the next item
    stack: std.ArrayList(enum { object, array }), // Track nesting type

    // Initialize the handler
    fn init(writer: anytype, indent_chars: ?[]const u8) FormatterEventHandler {
        return .{
            .writer = writer,
            .indent_chars = indent_chars,
            .indent_level = 0,
            .needs_comma = std.ArrayList(bool).init(std.heap.page_allocator),
            .stack = std.ArrayList(enum { object, array }).init(std.heap.page_allocator),
        };
    }

    // Deinitialize (free memory for lists)
    fn deinit(self: *FormatterEventHandler) void {
        self.needs_comma.deinit();
        self.stack.deinit();
    }

    // Helper to write indentation
    fn writeIndent(self: *FormatterEventHandler) !void {
        if (self.indent_chars) |chars| {
             const indent = std.mem.replicate(self.writer, chars, self.indent_level);
             defer indent.deinit();
             try self.writer.writeAll(indent.ptr);
        }
    }

    // Main event handling logic
    fn handleEvent(self: *FormatterEventHandler, event: JsonEvent, payload: ?[]const u8) !void {
        // Before writing any item/key/value, check if a comma is needed
        if (self.needs_comma.len > 0 and self.needs_comma.items[@活动的needs_comma.len - 1] == true) {
             try self.writer.writeAll(",");
             // After writing comma, add a newline if pretty printing
             if (self.indent_chars) try self.writer.writeAll("\\n");
             self.needs_comma.items[@活动的needs_comma.len - 1] = false; // Reset comma flag for current level
        } else if (self.indent_chars and event != .StartObject and event != .StartArray and event != .EndObject and event != .EndArray) {
             // Add newline before item/key/value if pretty printing, unless it's the very first element after container start
             if (self.stack.len > 0) { // Ensure we are inside a container
                 // Need more sophisticated logic here to not add newline after { or [ immediately
             }
        }


        switch (event) {
            .StartObject => {
                try self.writer.writeAll("{");
                // Add newline if pretty printing
                if (self.indent_chars) try self.writer.writeAll("\\n");
                self.indent_level += 1;
                try self.stack.append(.object);
                try self.needs_comma.append(false); // New level, no comma needed initially
            },
            .EndObject => {
                self.indent_level -= 1;
                try self.stack.pop();
                try self.needs_comma.pop();
                // Add newline if pretty printing
                 if (self.indent_chars) try self.writer.writeAll("\\n");
                try self.writeIndent();
                try self.writer.writeAll("}");
                // After ending an object/array, the parent level might need a comma
                if (self.needs_comma.len > 0) self.needs_comma.items[@activities.needs_comma.len - 1] = true;
            },
            .StartArray => {
                try self.writer.writeAll("[");
                // Add newline if pretty printing
                 if (self.indent_chars) try self.writer.writeAll("\\n");
                self.indent_level += 1;
                try self.stack.append(.array);
                try self.needs_comma.append(false); // New level, no comma needed initially
            },
            .EndArray => {
                self.indent_level -= 1;
                 try self.stack.pop();
                 try self.needs_comma.pop();
                // Add newline if pretty printing
                 if (self.indent_chars) try self.writer.writeAll("\\n");
                try self.writeIndent();
                try self.writer.writeAll("]");
                 // After ending an object/array, the parent level might need a comma
                 if (self.needs_comma.len > 0) self.needs_comma.items[@activities.needs_comma.len - 1] = true;
            },
            .Key => {
                 try self.writeIndent();
                 // Keys are always strings, handle escaping
                 if (payload) |key_str| {
                     try self.writer.print("\"{s}\": ", .{std.json.escapeString(key_str)});
                 } else {
                     // Handle error or unexpected state
                 }
                // After a key, the *next* value might need a comma *after* it, if in an object
                if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .object) {
                    // Mark that the value *after* this key/value pair needs a comma
                    self.needs_comma.items[@activities.needs_comma.len - 1] = true;
                }
            },
             .ValueString => {
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     try self.writeIndent(); // Indent values in arrays
                 }
                 if (payload) |val_str| {
                    try self.writer.print("\"{s}\"", .{std.json.escapeString(val_str)});
                 }
                 // After a value, if in an array, the next item needs a comma
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     self.needs_comma.items[@activities.needs_comma.len - 1] = true;
                 }
             }
            // ... handle other value types (Number, Bool, Null) similarly ...
            .ValueNumber => {
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     try self.writeIndent(); // Indent values in arrays
                 }
                 if (payload) |num_str| {
                     try self.writer.writeAll(num_str); // Payload is string representation of number
                 }
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     self.needs_comma.items[@activities.needs_comma.len - 1] = true;
                 }
             },
             .ValueBool => {
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     try self.writeIndent(); // Indent values in arrays
                 }
                 if (payload) |bool_str| {
                     try self.writer.writeAll(bool_str); // "true" or "false"
                 }
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     self.needs_comma.items[@activities.needs_comma.len - 1] = true;
                 }
             },
             .ValueNull => {
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     try self.writeIndent(); // Indent values in arrays
                 }
                 try self.writer.writeAll("null");
                 if (self.stack.len > 0 and self.stack.items[@activities.stack.len - 1] == .array) {
                     self.needs_comma.items[@activities.needs_comma.len - 1] = true;
                 }
             },
        }
    }
};

pub fn main_streaming() !void {
    // This requires a streaming JSON parser implementation
    // that calls the handleEvent function above.
    // Reading from stdin/file and writing to stdout/file
    // var stdin = std.io.getStdIn().reader();
    // var stdout = std.io.getStdOut().writer();
    // var formatter = FormatterEventHandler.init(stdout, "  "); // Pretty print with 2 spaces
    // defer formatter.deinit();
    // try parseStream(stdin, &formatter);
}
`}
            </code>
          </pre>
        </div>
        <p>
          <em>
            Note: The streaming example is even more abstract as implementing a robust streaming parser is significantly
            more complex than a tree-building one. It serves to illustrate the event-driven concept. Managing
            indentation and commas correctly in a streaming fashion requires careful state management based on the
            current nesting level and whether the previous token was a key, value, or container start.
          </em>
        </p>

        <h3 className="text-xl font-semibold mt-6">3. Simple Regex/String Manipulation (Limited Use)</h3>
        <p>
          For extremely simple cases (e.g., removing whitespace from compact JSON without nested structures or complex
          strings), basic string processing might seem tempting. However, this approach is highly discouraged for
          general-purpose JSON as it cannot correctly handle nested objects/arrays, quoted strings containing whitespace
          or structure characters (<code>&#x7b;</code>, <code>&#x7d;</code>, <code>[</code>, <code>]</code>,{" "}
          <code>:</code>, <code>,</code>), or comments (though comments are not standard JSON, some parsers accept
          them).
        </p>
        <p>
          <strong>Pros:</strong> Trivial for truly basic cases.
          <br />
          <strong>Cons:</strong> Fundamentally unsafe and incorrect for valid, complex JSON.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <MemoryStick className="w-7 h-7 mr-2 text-purple-500" />
          Memory Management in Zig
        </h2>
        <p>
          A critical aspect of building any non-trivial application in Zig is explicit memory management. For a JSON
          formatter:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Parse-and-Re-serialize:</strong> The in-memory data structure will likely require dynamic allocation
            (e.g., for strings, arrays, hash maps). You must use an allocator (like{" "}
            <code>std.heap.GeneralPurposeAllocator</code> or <code>std.heap.ArenaAllocator</code>) and ensure all
            allocated memory is freed after use to prevent leaks. Using an arena allocator for the parsing phase can
            simplify cleanup.
          </li>
          <li>
            <strong>Streaming:</strong> While much more memory efficient for the JSON data itself, the parser and
            formatter state (like the nesting stack and comma flags in the conceptual example) will still require some
            dynamic allocation, which needs to be managed.
          </li>
        </ul>
        <p>
          Zig's <code>defer</code> statement is invaluable for ensuring deallocation calls happen when a function scope
          is exited.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Choosing an Implementation Approach</h2>
        <p>
          For most practical JSON formatting tools in Zig, the <strong>Parse-and-Re-serialize</strong> approach is the
          most balanced choice. It leverages existing JSON parsing libraries and is conceptually straightforward to
          implement the serialization logic. The main consideration is memory usage for very large inputs.
        </p>
        <p>
          The <strong>Streaming</strong> approach is ideal when memory is extremely constrained or when dealing with
          continuous streams of JSON data. It's significantly harder to implement correctly from scratch.
        </p>
        <p>Avoid simple string manipulation for anything beyond the most trivial, non-standard-compliant cases.</p>

        <h2 className="text-2xl font-semibold mt-8">Key Considerations for Implementation</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Library Choice:</strong> Decide whether to use Zig's standard library's <code>std.json</code> (which
            is still evolving but capable) or an external Zig JSON library.
          </li>
          <li>
            <strong>Error Handling:</strong> JSON parsing can fail for many reasons (syntax errors, unexpected EOF,
            etc.). Your formatter should gracefully handle and report these errors using Zig's error unions.
          </li>
          <li>
            <strong>Formatting Options:</strong> Support configurable indentation (spaces, tabs, count), line endings,
            and whether to produce pretty-printed or compact output.
          </li>
          <li>
            <strong>Memory Efficiency:</strong> Pay close attention to allocations, especially when using the
            parse-and-re-serialize method. Consider using an arena allocator for the parsed data tree.
          </li>
          <li>
            <strong>String Escaping:</strong> Correctly handle escaping of special characters within JSON strings (e.g.,{" "}
            <code>"</code>, <code>\</code>, newline, tab, etc.). Libraries usually handle this.
          </li>
          <li>
            <strong>Number Formatting:</strong> Ensure numbers are formatted correctly, handling integers and
            floating-point values according to JSON's number representation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing a JSON formatter in Zig is a great way to learn about parsing, serialization, and explicit memory
          management. While the parse-and-re-serialize method using Zig's standard library or external libraries is the
          most common and practical, the streaming approach offers significant memory advantages for large datasets at
          the cost of increased implementation complexity. Choosing the right method depends on the specific
          requirements regarding performance, memory limits, and development time. Regardless of the method, Zig's power
          and control make it possible to build highly efficient and reliable JSON processing tools.
        </p>
      </div>
    </>
  );
}
