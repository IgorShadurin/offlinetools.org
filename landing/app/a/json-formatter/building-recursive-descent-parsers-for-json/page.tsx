import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Recursive Descent Parsers for JSON | Offline Tools",
  description: "Learn the principles of building a recursive descent parser specifically for the JSON data format.",
};

export default function RecursiveDescentJsonParserArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Building Recursive Descent Parsers for JSON</h1>

      <div className="space-y-6">
        <p>
          Parsing data is a fundamental task in many programming scenarios. When dealing with structured data formats
          like JSON, a parser is needed to transform the raw text into a usable in-memory representation (like objects,
          arrays, strings, numbers, booleans, or null). One intuitive and straightforward method for building parsers,
          especially for context-free grammars like JSON, is
          <strong>Recursive Descent Parsing</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What is Recursive Descent Parsing?</h2>
        <p>
          Recursive descent is a top-down parsing technique. It constructs the parse tree from the top (the root of the
          grammar) and works downwards. It&apos;s called &quot;recursive descent&quot; because it often involves
          recursive function calls to process nested structures within the language or data format being parsed.
        </p>
        <p>
          The core idea is to have a function for each &quot;production rule&quot; in the grammar. When a function for a
          rule is called, it attempts to match the input sequence to that rule&apos;s definition, potentially calling
          other functions (recursively) for sub-rules.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Recursive Descent for JSON?</h2>
        <p>
          JSON&apos;s structure is naturally hierarchical and fits well with the principles of recursive descent.
          Let&apos;s look at a simplified grammar for JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre>
            {`Value ::= Object | Array | String | Number | "true" | "false" | "null"
Object ::= "{" ( String ":" Value ( "," String ":" Value )* )? "}"
Array  ::= "[" ( Value ( "," Value )* )? "]"
String ::= /* ...definition of a JSON string... */
Number ::= /* ...definition of a JSON number... */`}
          </pre>
        </div>

        <p>
          Notice how <code>Object</code> and <code>Array</code> production rules recursively refer to
          <code>Value</code>, and <code>Value</code> can refer back to <code>Object</code> or
          <code>Array</code>. This recursive definition maps directly to recursive functions in a parser.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Prerequisites: Tokenization</h2>
        <p>
          Before parsing, the raw JSON string is typically processed by a <strong>tokenizer</strong>
          (or lexer). The tokenizer breaks the input string into a sequence of meaningful units called{" "}
          <strong>tokens</strong>. For JSON, tokens include:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>&#123;</code>, <code>&#125;</code>, <code>[</code>, <code>]</code>, <code>,</code>, <code>:</code>
          </li>
          <li>
            String literals (e.g., <code>&quot;hello&quot;</code>)
          </li>
          <li>
            Number literals (e.g., <code>123</code>, <code>-4.5e+2</code>)
          </li>
          <li>
            Keywords (<code>true</code>, <code>false</code>, <code>null</code>)
          </li>
          <li>Whitespace (often ignored by the parser)</li>
        </ul>
        <p>The parser then works on this sequence of tokens, not the raw string.</p>

        <h2 className="text-2xl font-semibold mt-8">Designing the Parser Functions</h2>
        <p>Based on the JSON grammar, we can design functions like:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>parseValue()</code>: Reads the next token and calls the appropriate specific parser function (
            <code>parseObject</code>, <code>parseArray</code>, etc.) based on the token type.
          </li>
          <li>
            <code>parseObject()</code>: Expects <code>&#123;</code>, then loops through key-value pairs until it finds{" "}
            <code>&#125;</code>. Inside the loop, it expects a string (key), <code>:</code>, and then calls{" "}
            <code>parseValue()</code> for the value.
          </li>
          <li>
            <code>parseArray()</code>: Expects <code>[</code>, then loops through values until it finds <code>]</code>.
            Inside the loop, it calls <code>parseValue()</code> for each element.
          </li>
          <li>
            <code>parseString()</code>: Expects a string token and consumes it.
          </li>
          <li>
            <code>parseNumber()</code>: Expects a number token and consumes it.
          </li>
          <li>
            <code>parseBoolean()</code>: Expects a <code>true</code> or <code>false</code> token and consumes it.
          </li>
          <li>
            <code>parseNull()</code>: Expects a <code>null</code> token and consumes it.
          </li>
        </ul>
        <p>
          Each parsing function reads tokens from the input stream, builds a part of the resulting data structure, and
          potentially calls other parsing functions for nested elements.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Simplified Code Example</h2>
        <p>
          This is a conceptual example focusing on the parser logic. A real implementation would need a robust tokenizer
          and more detailed error handling.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Basic JSON Parser Structure (Conceptual TypeScript):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`enum TokenType {
  BraceOpen, BraceClose, BracketOpen, BracketClose, Colon, Comma,
  String, Number, True, False, Null, EOF
}

interface Token {
  type: TokenType;
  value?: string | number | boolean | null;
}

class Tokenizer {
  private input: string;
  private position: number = 0;
  // ... tokenizer implementation ...
  // next(): Token - returns the next token
  // peek(): Token - returns the next token without consuming it
}

class Parser {
  private tokenizer: Tokenizer;
  private currentToken: Token;

  constructor(tokenizer: Tokenizer) {
    this.tokenizer = tokenizer;
    this.currentToken = this.tokenizer.next(); // Get the first token
  }

  // Helper to consume the current token and advance
  private eat(type: TokenType): void {
    if (this.currentToken.type === type) {
      this.currentToken = this.tokenizer.next();
    } else {
      throw new Error(\`Unexpected token: Expected \${TokenType[type]} but got \${TokenType[this.currentToken.type]}\`);
    }
  }

  // Entry point: Parse a JSON Value (which is the root)
  parse(): any {
    const value = this.parseValue();
    if (this.currentToken.type !== TokenType.EOF) {
        throw new Error("Unexpected data after parsing root value.");
    }
    return value;
  }

  // Parses any valid JSON value
  private parseValue(): any {
    switch (this.currentToken.type) {
      case TokenType.BraceOpen:
        return this.parseObject();
      case TokenType.BracketOpen:
        return this.parseArray();
      case TokenType.String:
        return this.parseString();
      case TokenType.Number:
        return this.parseNumber();
      case TokenType.True:
        return this.parseBoolean();
      case TokenType.False:
        return this.parseBoolean();
      case TokenType.Null:
        return this.parseNull();
      default:
        throw new Error(\`Unexpected token type for value: \${TokenType[this.currentToken.type]}\`);
    }
  }

  // Parses a JSON object
  private parseObject(): { [key: string]: any } {
    this.eat(TokenType.BraceOpen);
    const obj: { [key: string]: any } = {};

    // Handle empty object
    if (this.currentToken.type === TokenType.BraceClose) {
      this.eat(TokenType.BraceClose);
      return obj;
    }

    // Parse key-value pairs
    while (this.currentToken.type === TokenType.String) {
      const key = this.parseString() as string; // Key must be a string
      this.eat(TokenType.Colon);
      const value = this.parseValue();
      obj[key] = value;

      if (this.currentToken.type === TokenType.Comma) {
        this.eat(TokenType.Comma);
      } else if (this.currentToken.type !== TokenType.BraceClose) {
        throw new Error("Expected comma or closing brace in object.");
      }
    }

    this.eat(TokenType.BraceClose);
    return obj;
  }

  // Parses a JSON array
  private parseArray(): any[] {
    this.eat(TokenType.BracketOpen);
    const arr: any[] = [];

    // Handle empty array
    if (this.currentToken.type === TokenType.BracketClose) {
      this.eat(TokenType.BracketClose);
      return arr;
    }

    // Parse elements
    while (this.currentToken.type !== TokenType.BracketClose) {
      const value = this.parseValue();
      arr.push(value);

      if (this.currentToken.type === TokenType.Comma) {
        this.eat(TokenType.Comma);
      } else if (this.currentToken.type !== TokenType.BracketClose) {
        throw new Error("Expected comma or closing bracket in array.");
      }
    }

    this.eat(TokenType.BracketClose);
    return arr;
  }

  // Parses a JSON string
  private parseString(): string | null {
    if (this.currentToken.type !== TokenType.String) {
      throw new Error("Expected a string token.");
    }
    const value = this.currentToken.value as string;
    this.eat(TokenType.String);
    return value;
  }

  // Parses a JSON number
  private parseNumber(): number | null {
    if (this.currentToken.type !== TokenType.Number) {
      throw new Error("Expected a number token.");
    }
    const value = this.currentToken.value as number;
    this.eat(TokenType.Number);
    return value;
  }

  // Parses JSON true/false
  private parseBoolean(): boolean | null {
    if (this.currentToken.type !== TokenType.True && this.currentToken.type !== TokenType.False) {
      throw new Error("Expected boolean token (true or false).");
    }
    const value = this.currentToken.value as boolean;
    this.eat(this.currentToken.type); // Consume either True or False token
    return value;
  }

  // Parses JSON null
  private parseNull(): null {
    if (this.currentToken.type !== TokenType.Null) {
      throw new Error("Expected null token.");
    }
    this.eat(TokenType.Null);
    return null;
  }
}

// Example Usage (requires Tokenizer implementation):
// const jsonString = '{"name": "Alice", "age": 30, "isStudent": false, "courses": ["Math", "Science"]}';
// const tokenizer = new Tokenizer(jsonString); // Tokenizer needs implementation
// const parser = new Parser(tokenizer);
// try {
//   const parsedData = parser.parse();
//   console.log(parsedData); // Output the parsed JavaScript object/array
// } catch (error) {
//   console.error("Parsing failed:", error.message);
// }
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Error Handling</h2>
        <p>
          In a recursive descent parser, error handling is typically done by checking the type of the current token and
          throwing an error if it doesn&apos;t match what the parser expects based on the grammar rule being processed.
        </p>
        <p>
          For example, in <code>parseObject</code>, if we just consumed the opening <code>&#x7b;</code>
          and the next token isn&apos;t a <code>&#x7d;</code> or a <code>String</code> (for a key), we know there&apos;s
          a syntax error. The <code>eat()</code> helper function is a common place to include basic error checks. More
          sophisticated error handling might involve reporting the line/column number from the tokenizer.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Advantages and Disadvantages</h2>

        <h3 className="text-xl font-semibold mt-6">Advantages:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Simplicity and Readability:</strong> The parser structure often directly mirrors the grammar rules,
            making it easy to understand and implement.
          </li>
          <li>
            <strong>Ease of Implementation:</strong> For simple grammars like JSON, it can be hand-written relatively
            quickly.
          </li>
          <li>
            <strong>Good for LL(1) Grammars:</strong> JSON&apos;s grammar is suitable for this technique as it can be
            parsed by looking only one token ahead (LL(1)).
          </li>
          <li>
            <strong>Integration with Actions:</strong> It&apos;s straightforward to embed actions (like building the
            data structure) within the parsing functions.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Disadvantages:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Limited Applicability:</strong> Not suitable for grammars that are left-recursive or require more
            lookahead than one token.
          </li>
          <li>
            <strong>Error Recovery:</strong> Basic implementations might stop on the first error; robust error recovery
            can be complex.
          </li>
          <li>
            <strong>Maintenance for Complex Grammars:</strong> For very large or complex grammars, hand-writing can
            become cumbersome and prone to errors.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Building a recursive descent parser for JSON is a practical exercise that clearly demonstrates the
          relationship between a formal grammar and a parsing algorithm. While modern programming languages and
          libraries typically provide built-in, highly optimized JSON parsers, understanding how one works under the
          hood, particularly through a technique like recursive descent, provides valuable insight into parsing theory
          and compiler design principles. For JSON&apos;s relatively simple and well-defined structure, a hand-written
          recursive descent parser is quite feasible and educational.
        </p>
      </div>
    </>
  );
}
