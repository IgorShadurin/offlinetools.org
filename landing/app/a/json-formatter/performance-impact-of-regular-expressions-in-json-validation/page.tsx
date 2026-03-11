import type { Metadata } from "next";
import {
  AlertTriangle,
  BookOpenText,
  CheckCheck,
  Code,
  Database,
  FileJson,
  Flame,
  Gauge,
  Library,
  Regex,
  SearchCode,
  TextSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Performance Impact of RegEx in JSON Validation | Offline Tools",
  description:
    "Learn why regex-based JSON validation is slow and unsafe, which RFC 8259 edge cases it misses, and when to use JSON.parse, JSON Schema, and field-level regex instead.",
};

export default function RegexJsonValidationPerformanceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <AlertTriangle className="text-amber-500" size={32} /> Performance Impact of Regular Expressions in JSON
        Validation
      </h1>

      <div className="space-y-6">
        <p>
          Regular expressions can help with small text checks, but they are the wrong tool for validating full JSON
          documents. If the question is &quot;is this valid JSON?&quot; or &quot;does this payload match my expected
          shape?&quot;, a parser and a schema validator will be faster, more accurate, and easier to maintain.
        </p>
        <p>
          For most applications, the practical answer is simple: parse once with <code>JSON.parse</code>, then
          validate the resulting value against a JSON Schema. Keep regex limited to specific string fields after
          parsing, not the whole recursive document.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CheckCheck size={24} /> Short Answer
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Use <code>JSON.parse</code> to check syntax.</li>
          <li>Use JSON Schema to check structure, types, and required fields.</li>
          <li>Use regex only for field-level string formats, not for the whole JSON payload.</li>
          <li>If you regex-check first and parse second, you often pay extra CPU for no real benefit.</li>
        </ul>
        <p>
          As of March 11, 2026, the JSON Schema project still lists <strong>2020-12</strong> as the latest released
          meta-schema. That is the current dialect to target for new schema work when your validator supports it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Regex size={24} /> Why Full JSON Validation Is Not a Regex Problem
        </h2>
        <p>
          JSON is defined by a recursive grammar. Objects can contain arrays, arrays can contain objects, and both can
          nest arbitrarily deep. That is exactly the kind of structure parsers are designed to handle and regex engines
          are not.
        </p>
        <p>
          RFC 8259 also defines a JSON text as any serialized JSON value, not just an object or array. That means
          <code>"hello"</code>, <code>42</code>, <code>true</code>, and <code>null</code> are all valid JSON texts.
          A lot of regex &quot;validators&quot; reject valid JSON immediately because they only look for a leading{" "}
          <code>&#x7b;</code> or <code>[</code>.
        </p>
        <p>
          Even when a pattern seems to work on a few samples, it still has to emulate parser behavior for string
          escapes, commas, numbers, nesting, and end-of-input rules. That produces patterns that are brittle, hard to
          review, and easy to slow down.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Common Anti-Pattern
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`
// This only checks "looks roughly JSON-ish".
// It does NOT validate escapes, commas, nesting, duplicate keys, or number rules.
const looksLikeJson = /^\\s*(\\{.*\\}|\\[.*\\]|true|false|null|-?\\d|".*")\\s*$/s;

looksLikeJson.test('{"a": [1, 2, 3]}'); // true
looksLikeJson.test('{"a": [1, 2, }');   // can still pass in broken cases
looksLikeJson.test('"hello"');          // valid JSON text
looksLikeJson.test('01');               // often misclassified by sloppy patterns
            `}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Flame size={24} /> Where Performance Actually Gets Worse
        </h2>
        <p>
          The most obvious risk is <strong>catastrophic backtracking</strong>. OWASP still documents ReDoS, or Regular
          Expression Denial of Service, as a real class of regex vulnerability. Complex patterns with nested
          quantifiers, optional groups, and repeated alternation can explode in runtime on near-matching input.
        </p>
        <p>
          The less dramatic but more common problem is duplicated work. If you test a large payload with regex and then
          still call <code>JSON.parse</code>, you have added an extra pass over the input without gaining trustworthy
          validation.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Large request bodies magnify backtracking costs and wasted pre-check passes.</li>
          <li>Hot paths such as APIs, upload tools, and request filters pay that cost on every request.</li>
          <li>Attackers can deliberately craft near matches that keep a backtracking engine busy.</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle size={20} /> Why ReDoS Patterns Are Dangerous
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`
// Nested quantifiers are a classic red flag.
const badRegex = /^(?:a+)+$/;

// Anti-pattern: regex pre-check plus parse.
function validateWithRegexFirst(jsonString: string): boolean {
  return looksLikeJson.test(jsonString) && tryParse(jsonString);
}

function tryParse(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}
            `}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Gauge size={24} /> RFC 8259 Edge Cases Regex Commonly Misses
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Top-level JSON can be <code>true</code>, <code>null</code>, <code>42</code>, or <code>"text"</code>.
          </li>
          <li>Strings can contain escaped quotes, backslashes, and Unicode escape sequences.</li>
          <li>Numbers allow exponents but disallow leading zeros such as <code>01</code>.</li>
          <li>Trailing commas are invalid JSON.</li>
          <li>
            Object member names should be unique; RFC 8259 warns that implementations can behave unpredictably when
            duplicates are present.
          </li>
        </ul>
        <p>
          These are not obscure corner cases. They are the kind of details that determine whether a validator is
          trustworthy or just &quot;good enough until it breaks&quot;.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson size={24} /> 1. Syntax Validation with <code>JSON.parse</code>
        </h2>
        <p>
          In JavaScript and TypeScript, <code>JSON.parse</code> is the correct syntax validator. MDN documents that it
          throws a <code>SyntaxError</code> when the string does not conform to the JSON grammar.
        </p>
        <p>
          If your API expects a top-level object or array, treat that as a second rule after parsing. Do not confuse
          &quot;valid JSON&quot; with &quot;valid shape for my application&quot;.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Parse First, Then Enforce Shape
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`
function parseJsonObject(jsonString: string): Record<string, unknown> {
  const value: unknown = JSON.parse(jsonString);

  if (value === null || Array.isArray(value) || typeof value !== "object") {
    throw new Error("Expected a top-level JSON object.");
  }

  return value as Record<string, unknown>;
}

parseJsonObject('{"name":"Alice","age":30}'); // OK
parseJsonObject('"hello"'); // throws: valid JSON, wrong shape for this API
            `}
          </pre>
        </div>
        <p>
          This is usually the fastest first step because it delegates JSON syntax rules to the parser built for them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Library size={24} /> 2. Structure Validation with JSON Schema
        </h2>
        <p>
          Once the text is parsed, use JSON Schema to validate structure, nested rules, allowed types, required
          properties, and string patterns. That keeps syntax validation and structural validation in the right layers.
        </p>
        <p>
          The current released JSON Schema meta-schema is <strong>2020-12</strong>. In practice, new projects should
          prefer an explicit <code>$schema</code> for 2020-12 when their chosen validator supports that dialect.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <BookOpenText size={20} /> Example Schema
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`
const userSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  additionalProperties: false,
  required: ["id", "age", "tags"],
  properties: {
    id: { type: "string", pattern: "^[A-Z]{3}-\\\\d{4}$" },
    age: { type: "integer", minimum: 0 },
    tags: {
      type: "array",
      items: { type: "string", minLength: 1 }
    }
  }
};

// Compile the schema once during startup, then reuse the validator.
            `}
          </pre>
        </div>
        <p>
          This is the modern, maintainable way to validate JSON contracts. You get predictable behavior, detailed
          errors, and a validator that can be compiled and reused instead of rebuilding a giant regex.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <SearchCode size={24} /> When RegEx Is Useful with JSON
        </h2>
        <p>
          Regex still has a valid role with JSON when the scope is narrow: validate one known string property after
          parsing, or use the schema <code>pattern</code> keyword for a single string field.
        </p>
        <p>
          That is a much smaller problem than validating the full document. Regex no longer has to reason about braces,
          brackets, commas, or nesting. It only has to answer a limited question about one string.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <TextSearch size={20} /> RegEx for Field-Level Validation
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`
function validateUserId(jsonString: string): boolean {
  const value = JSON.parse(jsonString) as { userId?: unknown };

  if (typeof value.userId !== "string") {
    return false;
  }

  return /^[A-Z]{3}-\\d{4}$/.test(value.userId);
}

validateUserId('{"userId":"ABC-1234"}'); // true
validateUserId('{"userId":"bad"}'); // false
            `}
          </pre>
        </div>
        <p>
          This keeps regex narrow, understandable, and far less likely to create a performance or correctness problem.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <SearchCode size={24} /> A Safer Validation Pipeline
        </h2>
        <p>
          For production systems, especially APIs and import tools, a good flow is usually: size check, parse, schema
          validate, then apply any field-specific business rules.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Code size={20} /> Practical Flow
          </h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 text-sm">
            {`
type ValidationResult =
  | { ok: true; data: unknown }
  | { ok: false; message: string };

function validateIncomingJson(jsonString: string): ValidationResult {
  if (jsonString.length > 1_000_000) {
    return { ok: false, message: "Payload too large." };
  }

  let data: unknown;

  try {
    data = JSON.parse(jsonString);
  } catch {
    return { ok: false, message: "Invalid JSON syntax." };
  }

  // Replace this with your compiled JSON Schema validator.
  const schemaIsValid = true;

  if (!schemaIsValid) {
    return { ok: false, message: "JSON shape does not match the expected schema." };
  }

  return { ok: true, data };
}
            `}
          </pre>
        </div>
        <p>
          This approach is easier to reason about, easier to profile, and safer under malformed or hostile input than a
          single monolithic regex.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Database size={24} /> Conclusion
        </h2>
        <p>
          Regex is useful around JSON, but not for full JSON validation. Once you need to understand nesting, escaping,
          commas, or JSON number rules, you are solving a parser problem rather than a pattern-matching problem.
        </p>
        <p>For reliable and performant JSON validation, use this decision order:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Need to know whether the text is valid JSON: use <code>JSON.parse</code>.</li>
          <li>
            Need to know whether the parsed data matches your contract: use JSON Schema, ideally targeting 2020-12 when
            your validator supports it.
          </li>
          <li>
            Need to validate a single string format such as an ID code: use regex after parsing, or inside a schema
            <code>pattern</code>.
          </li>
        </ul>
        <p>
          That gives you better performance, better correctness, and better behavior when malformed or adversarial
          input shows up in production.
        </p>
      </div>
    </>
  );
}
