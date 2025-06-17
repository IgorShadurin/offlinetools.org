import type { Metadata } from "next";
import { CircleAlert, Code, ShieldCheck, TestTube, Wrench, Bug, ScanSearch } from "lucide-react";

export const metadata: Metadata = {
  title: "Testing Error Recovery in JSON Parsing Components",
  description: "Learn about strategies and testing methodologies for error recovery in JSON parsing components.",
};

export default function ErrorRecoveryJsonParsingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Wrench className="mr-3 h-8 w-8 text-blue-500" />
        Testing Error Recovery in JSON Parsing Components
      </h1>

      <div className="space-y-6">
        <p>
          JSON (JavaScript Object Notation) is a ubiquitous data format for exchanging information. Parsing JSON, the
          process of converting a JSON string into a usable data structure (like a JavaScript object or array), is a
          fundamental operation in many applications. While standard libraries provide robust parsers, developers
          sometimes build custom JSON parsing components, particularly in scenarios requiring specific optimizations,
          streaming capabilities, or when working with constrained environments.
        </p>
        <p>
          A critical, yet often overlooked, aspect of building any parser, including a JSON parser, is{" "}
          <strong>error handling and recovery</strong>. A parser needs to gracefully handle malformed input, report
          errors accurately, and ideally, attempt to recover from errors to find more errors or provide a partially
          parsed result where possible.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CircleAlert className="mr-3 h-6 w-6 text-red-500" />
          Why Error Recovery Matters in JSON Parsing
        </h2>
        <p>While strict JSON compliance is the goal, real-world scenarios often involve imperfect data:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Manual Editing:</strong> Users might manually edit configuration files or data structures in JSON
            format and introduce typos.
          </li>
          <li>
            <strong>Faulty Data Sources:</strong> External systems or APIs might occasionally send malformed JSON due to
            bugs or network issues.
          </li>
          <li>
            <strong>Streaming/Partial Data:</strong> In streaming scenarios, data might be truncated or corrupted
            mid-stream.
          </li>
          <li>
            <strong>Developer Tooling:</strong> Parsers in linters, formatters, or IDEs benefit greatly from error
            recovery to provide multiple error messages instead of stopping on the first syntax issue.
          </li>
        </ul>
        <p>
          A parser that simply stops and throws an error on the very first syntax violation can be frustrating.
          Effective error recovery aims to continue parsing after an error, allowing for more comprehensive error
          reporting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-3 h-6 w-6 text-yellow-500" />
          Common JSON Parsing Errors
        </h2>
        <p>JSON has a relatively simple grammar, but there are many ways to break its rules:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Syntax Errors:</strong>
            <ul className="list-circle pl-6 space-y-1 my-2">
              <li>Missing commas between array elements or object properties.</li>
              <li>Missing colons between object keys and values.</li>
              <li>
                Unclosed brackets <code>[</code> or braces <code>&#x7b;</code>.
              </li>
              <li>Mismatched quotes or unescaped special characters in strings.</li>
              <li>Invalid number formats (e.g., leading zeros, missing fractional part).</li>
              <li>Use of single quotes instead of double quotes for strings or keys.</li>
              <li>Trailing commas.</li>
            </ul>
          </li>
          <li>
            <strong>Structural Errors:</strong>
            <ul className="list-circle pl-6 space-y-1 my-2">
              <li>A key-value pair outside of an object.</li>
              <li>An extra value after the root element (JSON must have a single root value).</li>
            </ul>
          </li>
          <li>
            <strong>Lexical Errors:</strong>
            <ul className="list-circle pl-6 space-y-1 my-2">
              <li>Invalid tokens (e.g., `true` written as `trie`).</li>
              <li>Unexpected characters.</li>
            </ul>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Wrench className="mr-3 h-6 w-6 text-green-500" />
          Strategies for Error Recovery
        </h2>
        <p>
          Different strategies can be employed to handle errors and attempt recovery during parsing. The complexity of
          implementation varies.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="mr-2 inline-block h-5 w-5" />
          Panic Mode Recovery
        </h3>
        <p>
          This is the simplest strategy. When an error is detected, the parser discards input tokens until it finds a
          "synchronization token" – a token that is likely to appear after a grammatical construct. For JSON, potential
          synchronization tokens might be <code>,</code>, <code>]</code>, or <code>&#x7d;</code>.
        </p>
        <p>
          Example: Parsing <code>[1, 2 invalid 3, 4]</code>. The parser reads <code>[</code>, <code>1</code>,{" "}
          <code>,</code>, <code>2</code>, <code>invalid</code>. It sees <code>invalid</code>, which is unexpected after{" "}
          <code>2</code>. In panic mode, it discards <code>invalid</code> and looks at the next token, <code>3</code>.
          Still unexpected (missing comma or end of array). Discard <code>3</code>. Look at <code>,</code>. Ah, a comma!
          This could be a synchronization token. It then expects a value after the comma (which is <code>4</code>). It
          might report an error about "unexpected token 'invalid'" and possibly "unexpected token '3'". It might
          successfully parse <code>[1, 2, 4]</code>, but the recovery skipped <code>3</code> entirely, which might not
          be desired.
        </p>
        <p>
          While easy to implement, panic mode can skip large portions of input, potentially missing subsequent errors or
          producing a significantly altered parse tree.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Panic Mode Logic:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// Inside a parsing function like parseArray or parseObject
try {
  // ... parse expected tokens ...
} catch (error) {
  reportError(error); // Report the error at the current position

  // Panic mode recovery attempt: Skip tokens until a potential sync token
  const syncTokens = [TokenType.Comma, TokenType.BracketClose, TokenType.BraceClose, TokenType.EOF];
  while (currentToken && !syncTokens.includes(currentToken.type)) {
    eat(currentToken.type); // Consume the unexpected token
  }
  // After the loop, the parser might be at a potential recovery point
  // or at the end of the input.
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="mr-2 inline-block h-5 w-5" />
          Phrase-Level Recovery
        </h3>
        <p>
          This strategy attempts to fix the error locally by inserting or deleting a small number of tokens to make the
          input sequence conform to a valid production rule. This requires more specific logic for different types of
          expected tokens.
        </p>
        <p>
          Example: Parsing <code>&#x7b;"name": "Alice" "age": 30&#x7d;</code>
          The parser reads <code>&#x7b;</code>, <code>"name"</code>, <code>:</code>, <code>"Alice"</code>. It then
          expects a <code>,</code> or <code>&#x7d;</code>. It sees <code>"age"</code>. A phrase-level recovery might
          diagnose "missing comma before 'age'" and conceptually insert a comma, then continue parsing{" "}
          <code>, "age": 30</code> as a new property.
        </p>
        <p>
          This can provide better error messages and potentially recover more of the parse structure than panic mode,
          but it's more complex to design and implement recovery logic for every potential error point in the grammar.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Conceptual Phrase-Level Logic (inside parseObject):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`while (currentToken.type === TokenType.String) {
  const key = parseString() as string;
  // Check for missing colon
  if (currentToken.type !== TokenType.Colon) {
    reportError("Missing colon after object key.");
    // Attempt recovery: assume colon was meant to be there, don't eat current token
    // If next token is value, parse it. This is a simplified approach.
    if (isValueStartToken(currentToken.type)) { // isValueStartToken checks if token can start a value
       obj[key] = parseValue(); // Try to parse value without eating colon
    } else {
       // Cannot recover, maybe use panic mode or skip this pair
       reportError("Could not recover from missing colon.");
       // ... further error handling / skipping ...
       break; // Exit loop or try to sync
    }
  } else {
      eat(TokenType.Colon); // Consume the colon
      obj[key] = parseValue(); // Parse the value
  }

  // Check for missing comma or closing brace
  if (currentToken.type === TokenType.Comma) {
    eat(TokenType.Comma);
  } else if (currentToken.type !== TokenType.BraceClose) {
    reportError("Expected comma or closing brace in object.");
    // Attempt recovery: Maybe assume a comma was missing and continue
    // This might require looking ahead or making assumptions.
    // A simple approach might just break or try panic mode here.
    // For example, if next token is a string, assume missing comma and continue loop:
    if (currentToken.type === TokenType.String) {
       reportError("Assuming missing comma.");
       // continue; // loop will check currentToken again
    } else {
       // Cannot recover easily, break or sync
       break;
    }
  }
  // If we reach here and currentToken is BraceClose, the loop condition handles it.
}`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">
          <Code className="mr-2 inline-block h-5 w-5" />
          Error Productions
        </h3>
        <p>
          This is a more formal approach where the grammar itself is augmented with special "error productions" that
          explicitly describe common error patterns. The parser, built using a grammar-based tool, recognizes these
          error patterns and triggers associated recovery actions.
        </p>
        <p>
          Example Error Production for a missing comma in an object:
          <code>Object ::= "&#x7b;" ( String ":" Value ( "," String ":" Value )* | ErrorObjectBody )? "&#x7d;"</code>
          <code>
            ErrorObjectBody ::= String ":" Value // Handles a key-value pair where a comma was expected before it
          </code>
        </p>
        <p>
          This method integrates error handling deeply into the parser's structure but requires designing a specific
          error grammar and often using parser generator tools, which might be overkill for a simple JSON parser.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <TestTube className="mr-3 h-6 w-6 text-purple-500" />
          Testing Error Recovery
        </h2>
        <p>Simply checking if the parser throws an error isn't enough when testing error recovery. You need to test:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Error Reporting:</strong> Are errors reported accurately (correct type of error, location -
            line/column)?
          </li>
          <li>
            <strong>Recovery Success:</strong> Does the parser successfully continue parsing after the error?
          </li>
          <li>
            <strong>Subsequent Error Detection:</strong> Can the parser find multiple errors in a single malformed
            input?
          </li>
          <li>
            <strong>Output After Recovery:</strong> If the parser produces a partial result, is it meaningful or at
            least predictable? (This is less common for typical JSON parsers but relevant for linters/formatters).
          </li>
          <li>
            <strong>No Infinite Loops:</strong> Does the parser terminate even on severely malformed input?
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          <ScanSearch className="mr-2 inline-block h-5 w-5" />
          Generating Test Cases
        </h3>
        <p>
          Creating test cases for error recovery requires systematically introducing errors into valid JSON structures:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Single Errors:</strong> Introduce one specific type of error at different locations (start, middle,
            end of arrays, objects, strings).
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-lg font-medium">Examples of single errors:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {`// Missing comma
{"name": "Alice" "age": 30}

// Unclosed array
[1, 2, 3

// Invalid value type in array
["apple", banana, "cherry"] // 'banana' is not a valid JSON token

// Colon instead of comma
{"a": 1 : "b": 2}

// Trailing comma
[1, 2, 3,]

// Extra content after root
{"data": true} extra`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Multiple Errors:</strong> Combine several single errors in one input string. This tests if the
            recovery from the first error allows the parser to encounter the second.
            <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
              <h4 className="text-lg font-medium">Example with multiple errors:</h4>
              <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                <pre>
                  {`[ {"a": 1 "b": 2} invalid, 3, ] extra // Errors: missing comma after 1, invalid token 'invalid', trailing comma after 3, extra content after array.`}
                </pre>
              </div>
            </div>
          </li>
          <li>
            <strong>Edge Cases:</strong> Test errors involving empty structures <code>&#x7b;&#x7d;</code>,{" "}
            <code>[]</code>, deeply nested structures, very long strings, large numbers, etc.
          </li>
          <li>
            <strong>Invalid Characters/Tokens:</strong> Feed the parser input with completely foreign characters or
            sequences that don't belong in JSON.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">
          <ShieldCheck className="mr-2 inline-block h-5 w-5" />
          Assertions and Verification
        </h3>
        <p>For each error test case, you need to assert:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>The parser throws an error (or reports one if using a system that collects errors).</li>
          <li>The error message is informative and indicates the type of error and its location.</li>
          <li>
            (If applicable) The parser continued and reported other errors, or successfully parsed a subsequent part of
            the input.
          </li>
          <li>
            (If applicable) The resulting data structure matches the expected outcome after recovery (this is often
            tricky and depends heavily on the recovery strategy).
          </li>
        </ul>
        <p>
          Using snapshot testing can be helpful for verifying the exact error output (message, location, type) for a
          large suite of malformed inputs.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ShieldCheck className="mr-3 h-6 w-6 text-blue-500" />
          Conclusion
        </h2>
        <p>
          Building a JSON parsing component with robust error recovery is significantly more complex than building one
          that simply fails on the first error. It requires careful design of error handling logic, potentially
          involving panic mode, phrase-level corrections, or even formal error productions. More importantly, it demands
          a thorough testing strategy with comprehensive test cases covering various single and multiple error
          scenarios. By investing time in error recovery and its testing, you can create parsing components that are
          more resilient, user-friendly (through better error messages), and capable of handling the messy realities of
          real-world data.
        </p>
      </div>
    </>
  );
}
