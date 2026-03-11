import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Recursive Descent Parsers for JSON | Offline Tools",
  description:
    "A practical guide to writing a recursive descent JSON parser in TypeScript, including strict grammar rules, error handling, and real parser edge cases.",
};

export default function RecursiveDescentJsonParserArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Building Recursive Descent Parsers for JSON</h1>

      <div className="space-y-6">
        <p>
          Recursive descent parsing is a good fit for JSON because the grammar is small, nested, and easy to dispatch
          with one token or one character of lookahead. The hard part is not the recursion itself. The hard part is
          being strict enough to accept real JSON and reject JavaScript-like input that only looks close.
        </p>

        <p>
          If you are building a parser for learning, custom diagnostics, or a transformation pipeline, focus on the
          exact rules first: JSON keys must be double-quoted, trailing commas are invalid, numbers have tighter syntax
          than JavaScript literals, and the root can be any JSON value, not only an object or array. That gives you a
          parser that behaves like users expect when they paste data into a formatter or validator.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Start from the JSON rules that matter</h2>
        <p>
          The current JSON standard is RFC 8259, aligned with ECMA-404. For a hand-written recursive descent parser,
          this is the core grammar you actually need:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`value  = object / array / string / number / "true" / "false" / "null"
object = "{" [ member *( "," member ) ] "}"
member = string ":" value
array  = "[" [ value *( "," value ) ] "]"`}
          </pre>
        </div>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            A valid JSON document can be <code>42</code>, <code>true</code>, or <code>"hello"</code>, not just{" "}
            <code>&#123;...&#125;</code> or <code>[...]</code>.
          </li>
          <li>
            Object member names should be unique. In practice, parsers differ on duplicates, so it is better to choose
            a policy explicitly than to leave it accidental.
          </li>
          <li>
            Trailing commas are invalid in both objects and arrays. A parser that accepts them is parsing a
            JavaScript-style extension, not strict JSON.
          </li>
          <li>
            JSON numbers do not allow <code>+1</code>, <code>01</code>, <code>NaN</code>, <code>Infinity</code>, or
            a decimal point without following digits.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">The parser state can stay very small</h2>
        <p>
          For JSON, you do not need a large parser framework. A minimal recursive descent parser usually keeps only:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            The input string and a current cursor position.
          </li>
          <li>
            A few helpers such as <code>peek()</code>, <code>skipWhitespace()</code>, and <code>expectChar()</code>.
          </li>
          <li>
            One parsing function per grammar concept: <code>parseValue()</code>, <code>parseObject()</code>,{" "}
            <code>parseArray()</code>, <code>parseString()</code>, and <code>parseNumber()</code>.
          </li>
          <li>
            A consistent way to produce syntax errors with the current position.
          </li>
        </ul>

        <p>
          A separate tokenizer is still a valid design, especially if you want line and column tracking, better error
          recovery, or streaming behavior. But for a strict JSON parser, a direct character scanner is often simpler
          and easier to reason about.
        </p>

        <h2 className="text-2xl font-semibold mt-8">How recursive descent maps to JSON</h2>
        <p>
          The top-level dispatcher is <code>parseValue()</code>. It looks at the next non-whitespace character and
          sends control to the matching rule:
        </p>

        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>&#123;</code> starts an object.
          </li>
          <li>
            <code>[</code> starts an array.
          </li>
          <li>
            <code>&quot;</code> starts a string.
          </li>
          <li>
            <code>-</code> or a digit starts a number.
          </li>
          <li>
            <code>t</code>, <code>f</code>, and <code>n</code> start the literal keywords.
          </li>
        </ul>

        <p>
          Objects and arrays are recursive because their contents call back into <code>parseValue()</code>. That is the
          whole recursive descent pattern in JSON: containers recurse, leaf values terminate.
        </p>

        <h2 className="text-2xl font-semibold mt-8">A practical TypeScript implementation</h2>
        <p>
          The example below is still compact, but it is strict in the places that matter for real JSON input. It
          rejects trailing commas, enforces double-quoted keys, validates number syntax, and decodes standard escape
          sequences.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Strict JSON Parser (TypeScript)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

class JsonParser {
  private index = 0;

  constructor(private readonly input: string) {}

  parse(): JsonValue {
    const value = this.parseValue();
    this.skipWhitespace();

    if (!this.isAtEnd()) {
      throw this.error("Unexpected non-whitespace after root value");
    }

    return value;
  }

  private parseValue(): JsonValue {
    this.skipWhitespace();
    const ch = this.peek();

    if (ch === "{") return this.parseObject();
    if (ch === "[") return this.parseArray();
    if (ch === '"') return this.parseString();
    if (ch === "-" || this.isDigit(ch)) return this.parseNumber();
    if (ch === "t") return this.parseLiteral("true", true);
    if (ch === "f") return this.parseLiteral("false", false);
    if (ch === "n") return this.parseLiteral("null", null);

    throw this.error("Expected a JSON value");
  }

  private parseObject(): { [key: string]: JsonValue } {
    const result: { [key: string]: JsonValue } = {};
    this.expectChar("{");
    this.skipWhitespace();

    if (this.peek() === "}") {
      this.index++;
      return result;
    }

    while (true) {
      this.skipWhitespace();
      if (this.peek() !== '"') {
        throw this.error("Object keys must be double-quoted strings");
      }

      const key = this.parseString();
      this.skipWhitespace();
      this.expectChar(":");
      const value = this.parseValue();

      if (Object.prototype.hasOwnProperty.call(result, key)) {
        throw this.error("Duplicate object key: " + key);
      }

      result[key] = value;
      this.skipWhitespace();

      if (this.peek() === "}") {
        this.index++;
        return result;
      }

      this.expectChar(",");
      this.skipWhitespace();

      if (this.peek() === "}") {
        throw this.error("Trailing commas are not allowed in objects");
      }
    }
  }

  private parseArray(): JsonValue[] {
    const result: JsonValue[] = [];
    this.expectChar("[");
    this.skipWhitespace();

    if (this.peek() === "]") {
      this.index++;
      return result;
    }

    while (true) {
      result.push(this.parseValue());
      this.skipWhitespace();

      if (this.peek() === "]") {
        this.index++;
        return result;
      }

      this.expectChar(",");
      this.skipWhitespace();

      if (this.peek() === "]") {
        throw this.error("Trailing commas are not allowed in arrays");
      }
    }
  }

  private parseString(): string {
    this.expectChar('"');
    let result = "";

    while (!this.isAtEnd()) {
      const ch = this.input[this.index++];

      if (ch === '"') {
        return result;
      }

      if (ch === "\\\\") {
        result += this.parseEscapeSequence();
        continue;
      }

      if (ch < " ") {
        throw this.error("Unescaped control character in string");
      }

      result += ch;
    }

    throw this.error("Unterminated string");
  }

  private parseEscapeSequence(): string {
    const ch = this.input[this.index++];

    switch (ch) {
      case '"':
      case "\\\\": 
      case "/":
        return ch;
      case "b":
        return "\\b";
      case "f":
        return "\\f";
      case "n":
        return "\\n";
      case "r":
        return "\\r";
      case "t":
        return "\\t";
      case "u":
        return this.parseUnicodeEscape();
      default:
        throw this.error("Invalid escape sequence");
    }
  }

  private parseUnicodeEscape(): string {
    const hex = this.input.slice(this.index, this.index + 4);

    if (!/^[0-9a-fA-F]{4}$/.test(hex)) {
      throw this.error("Expected four hex digits after \\\\u");
    }

    this.index += 4;
    return String.fromCharCode(parseInt(hex, 16));
  }

  private parseNumber(): number {
    const start = this.index;

    if (this.peek() === "-") {
      this.index++;
    }

    if (this.peek() === "0") {
      this.index++;
      if (this.isDigit(this.peek())) {
        throw this.error("Leading zeros are not allowed");
      }
    } else {
      this.readDigits("Expected digit after minus sign");
    }

    if (this.peek() === ".") {
      this.index++;
      this.readDigits("Expected digit after decimal point");
    }

    if (this.peek() === "e" || this.peek() === "E") {
      this.index++;

      if (this.peek() === "+" || this.peek() === "-") {
        this.index++;
      }

      this.readDigits("Expected digit in exponent");
    }

    return Number(this.input.slice(start, this.index));
  }

  private readDigits(message: string): void {
    if (!this.isDigit(this.peek())) {
      throw this.error(message);
    }

    while (this.isDigit(this.peek())) {
      this.index++;
    }
  }

  private parseLiteral<T extends JsonValue>(text: string, value: T): T {
    if (this.input.slice(this.index, this.index + text.length) !== text) {
      throw this.error("Unexpected literal");
    }

    this.index += text.length;
    return value;
  }

  private expectChar(expected: string): void {
    if (this.peek() !== expected) {
      throw this.error("Expected '" + expected + "'");
    }

    this.index++;
  }

  private skipWhitespace(): void {
    while (this.peek() === " " || this.peek() === "\\n" || this.peek() === "\\r" || this.peek() === "\\t") {
      this.index++;
    }
  }

  private peek(): string {
    return this.input[this.index] ?? "";
  }

  private isDigit(ch: string): boolean {
    return ch >= "0" && ch <= "9";
  }

  private isAtEnd(): boolean {
    return this.index >= this.input.length;
  }

  private error(message: string): SyntaxError {
    return new SyntaxError(message + " at index " + this.index);
  }
}

const parser = new JsonParser(
  '{"name":"Ada","scores":[10,20,30],"active":true,"profile":{"city":"London"}}'
);

console.log(parser.parse());`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementation details that usually cause bugs</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Duplicate keys:</strong> RFC 8259 says object names should be unique, but it does not force one
            runtime behavior. Rejecting duplicates is often safer than silently keeping the last value.
          </li>
          <li>
            <strong>String escapes:</strong> You need to handle <code>\&quot;</code>, <code>\\</code>,{" "}
            <code>\/</code>, control escapes, and <code>\uXXXX</code>. Accepting raw control characters inside strings
            is a parser bug.
          </li>
          <li>
            <strong>Number precision:</strong> Converting directly to JavaScript <code>number</code> is convenient, but
            very large integers may lose precision. If exact numeric text matters, keep the original lexeme too.
          </li>
          <li>
            <strong>Error reporting:</strong> Index-only errors are enough for a basic parser. For a formatter or editor,
            line and column tracking is worth the extra bookkeeping.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Useful tests for a real JSON parser</h2>
        <p>These cases catch most of the mistakes in first-pass implementations:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`// valid
"hello"
42
{"a":[true,false,null]}
[]

// invalid
{'a':1}          // single quotes are not JSON
{"a":1,}         // trailing comma
{"a":01}         // leading zero
[1,,2]           // missing element
{"x":"\\q"}      // invalid escape
{"x":1} garbage  // extra data after root`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When to hand-write a parser and when not to</h2>
        <p>
          Writing a recursive descent parser for JSON is worthwhile when you need custom diagnostics, a teaching
          example, or strict control over how values are represented. It is usually not worth replacing highly
          optimized built-in parsers in production application code unless you have a specific behavior that the
          platform parser cannot provide.
        </p>

        <p>
          In other words, recursive descent is excellent for understanding JSON and for building specialized tools. It
          is not automatically the fastest or safest production choice just because the grammar is simple.
        </p>
      </div>
    </>
  );
}
