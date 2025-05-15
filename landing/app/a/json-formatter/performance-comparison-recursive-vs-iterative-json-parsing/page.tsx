import type { Metadata } from "next";
import {
  Scale,
  Gauge,
  Code,
  Repeat, // Corrected from Recursion, using Repeat icon
  IterationCcw,
  BarChart,
  Cpu,
  ListTree,
  Boxes,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Performance Comparison: Recursive vs. Iterative JSON Parsing",
  description:
    "Explore the trade-offs and performance characteristics of recursive and iterative approaches to parsing JSON data.",
};

export default function JsonParsingPerformanceArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Gauge className="w-8 h-8 text-blue-600" /> Performance Comparison:
        Recursive vs. Iterative JSON Parsing
      </h1>

      <div className="space-y-6">
        <p>
          Parsing JSON is a fundamental task in modern software development. While most languages and
          frameworks provide highly optimized built-in parsers (like JavaScript&apos;s{" "}
          <code>JSON.parse()</code>), understanding the underlying parsing algorithms can be insightful,
          especially when considering performance implications for extremely large or complex JSON
          structures. Two common conceptual approaches to parsing hierarchical data like JSON are
          <strong className="mx-1">recursive parsing</strong> and
          <strong className="mx-1">iterative parsing</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6 text-green-600" /> The Nature of JSON
        </h2>
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format. Its structure is
          inherently hierarchical:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A JSON document is either an object (<code>&#x7b;&#x7d;</code>) or an array (<code>&#x5b;&#x5d;</code>).</li>
          <li>Objects contain key-value pairs, where values can be primitives (strings, numbers,
            booleans, null) or other objects/arrays.</li>
          <li>Arrays contain ordered lists of values, which can also be primitives or other
            objects/arrays.</li>
        </ul>
        <p>
          This nested structure makes both recursive and iterative approaches natural fits for traversal and parsing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Repeat className="w-6 h-6 text-purple-600" /> Recursive JSON Parsing
        </h2>
        <p>
          A recursive parser mirrors the structure of the JSON grammar directly. It typically involves
          a set of functions, where each function is responsible for parsing a specific type of JSON value
          (object, array, string, number, boolean, null).
        </p>
        <p>
          When a function encounters a nested structure (an object or an array), it calls the
          appropriate parsing function for that nested type. This leads to a call stack where each
          level of nesting adds a new frame to the stack.
        </p>

        <h3 className="text-xl font-semibold mt-6">Conceptual Recursive Parser Structure:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            {`function parseValue(tokens): any {
  token = tokens.peek();
  if (token is '{') return parseObject(tokens);
  if (token is '[') return parseArray(tokens);
  if (token is '"') return parseString(tokens);
  if (token is Number) return parseNumber(tokens);
  if (token is 'true' or 'false') return parseBoolean(tokens);
  if (token is 'null') return parseNull(tokens);
  throw Error("Unexpected token type");
}

function parseObject(tokens): { [key: string]: any } {
  tokens.eat('{');
  obj = {};
  while (tokens.peek() is not '}') {
    key = parseString(tokens); // Keys are strings
    tokens.eat(':');
    value = parseValue(tokens); // Recursive call for value
    obj[key] = value;
    if (tokens.peek() is ',') tokens.eat(',');
  }
  tokens.eat('}');
  return obj;
}

function parseArray(tokens): any[] {
  tokens.eat('[');
  arr = [];
  while (tokens.peek() is not ']') {
    value = parseValue(tokens); // Recursive call for value
    arr.push(value);
    if (tokens.peek() is ',') tokens.eat(',');
  }
  tokens.eat(']');
  return arr;
}

// ... parseString, parseNumber, etc. would be non-recursive for primitives
`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Performance Considerations for Recursion:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Stack Usage:</strong> Each recursive call adds a new frame to the program&apos;s call stack. For
            deeply nested JSON structures, this can lead to a "Stack Overflow" error if the nesting
            depth exceeds the maximum call stack size allowed by the environment (browser, Node.js, etc.).
            <p className="flex items-center text-yellow-600 dark:text-yellow-400 mt-1">
              <span className="mr-2">⚠️</span> This is a significant limitation for very deep JSON.
            </p>
          </li>
          <li>
            <strong>Function Call Overhead:</strong> Starting a new function call, pushing arguments,
            local variables, and the return address onto the stack has a small performance cost
            compared to a simple loop iteration.
          </li>
          <li>
            <strong>Readability:</strong> For grammars that naturally fit recursive descent (like JSON),
            the recursive code can be very clear and directly map to the grammar rules.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <IterationCcw className="w-6 h-6 text-blue-600" /> Iterative JSON Parsing
        </h2>
        <p>
          An iterative parser avoids deep recursion by managing the parsing process using loops
          and explicitly using a data structure, typically a stack (not the program&apos;s call stack),
          to keep track of the current parsing context and manage nesting.
        </p>
        <p>
          When the parser encounters an opening bracket <code>&#x5b;</code> or brace <code>&#x7b;</code>, instead of making a recursive
          call, it pushes information about the current state (e.g., what object key or array index
          it&apos;s expecting next) onto its own internal stack and starts processing the contents of the
          new nested structure within a loop. When it encounters a closing bracket <code>&#x5d;</code> or brace <code>&#x7d;</code>,
          it pops the state from the stack and resumes processing the parent structure.
        </p>

        <h3 className="text-xl font-semibold mt-6">Conceptual Iterative Parser Structure (using an explicit stack):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <pre className="overflow-x-auto text-sm">
            {`function parse(tokens): any {
  const stack = [];
  let currentContainer = null; // The object or array being built
  let currentKey = null; // For objects

  while (tokens.peek() is not EOF) {
    token = tokens.next(); // Consume token

    if (token is '{') {
      const newObj = {};
      if (currentContainer) { // Add to parent container
         // ... add newObj to currentContainer using currentKey or index ...
      }
      stack.push({ container: currentContainer, key: currentKey });
      currentContainer = newObj;
      currentKey = null; // Reset key for the new object
    } else if (token is '[') {
      const newArr = [];
      if (currentContainer) { // Add to parent container
         // ... add newArr to currentContainer using currentKey or index ...
      }
      stack.push({ container: currentContainer, key: currentKey });
      currentContainer = newArr;
      currentKey = null; // Reset key for the new array
    } else if (token is '}' or token is ']') {
      const completedContainer = currentContainer;
      const prevState = stack.pop();
      currentContainer = prevState.container;
      currentKey = prevState.key;
      // The completedContainer is already linked in the step where it was created
      // No need to explicitly add it here, unless handling the top level
      if (stack.length === 0) { // Finished the root element
         return completedContainer;
      }
    } else if (currentContainer && currentContainer is Object && currentKey === null && token is String) {
       currentKey = token.value; // Set key for next value
    } else if (currentContainer && currentContainer is Object && currentKey !== null && token is ':') {
       // Expecting value next, currentKey is set
    } else if (currentContainer && currentContainer is Object && currentKey !== null) {
       // Token is a value for the currentKey
       const value = token.value; // Or parse primitive token value
       currentContainer[currentKey] = value;
       currentKey = null; // Value consumed, reset key
       // ... handle comma ...
    } else if (currentContainer && currentContainer is Array) {
       // Token is an array element value
       const value = token.value; // Or parse primitive token value
       currentContainer.push(value);
       // ... handle comma ...
    }
    // ... handle other token types (primitives, commas, etc.) ...
  }

  // After loop, stack should be empty, currentContainer should be the root
  return currentContainer; // The fully built JSON value
}
`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            (This is a simplified illustration; a real iterative parser needs careful state management.)
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Performance Considerations for Iteration:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Stack Usage:</strong> Avoids the system&apos;s call stack depth limit. The memory used by
            the explicit stack grows with the nesting depth, but is typically limited only by available
            heap memory, which is much larger than the call stack size.
          </li>
          <li>
            <strong>Loop Overhead:</strong> Replaces function call overhead with potentially simpler loop
            control and explicit stack operations. This is generally more efficient per step.
          </li>
          <li>
            <strong>Complexity:</strong> Implementing iterative parsing, especially with proper state
            management for nested structures, can be more complex and harder to read than the recursive
            equivalent, which often maps directly to the grammar.
          </li>
          <li>
            <strong>Cache Performance:</strong> Iterative processing might exhibit better cache locality
            depending on the implementation, as it can process tokens sequentially without jumping between
            deeply nested function calls.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Scale className="w-6 h-6 text-orange-600" /> Performance Comparison: Recursive vs. Iterative
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2"><BarChart className="w-5 h-5" /> Summary Table:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-3">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Feature
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Recursive Parsing
                  </th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Iterative Parsing
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Cpu className="inline-block w-4 h-4 mr-1 text-gray-500" /> Performance (Avg.)
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Generally slower due to function call overhead.
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Generally faster due to optimized loops and less overhead.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Boxes className="inline-block w-4 h-4 mr-1 text-gray-500" /> Memory Usage
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Uses call stack (limited size, risk of overflow).
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Uses heap memory for explicit stack (larger capacity).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    <ListTree className="inline-block w-4 h-4 mr-1 text-gray-500" /> Handles Deep Nesting
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                    Poorly (prone to stack overflow).
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    Well (limited by heap).
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    <Code className="inline-block w-4 h-4 mr-1 text-gray-500" /> Implementation Complexity
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Often simpler, directly mirrors grammar.
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Can be more complex due to explicit state management.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p>
          In general, for parsing tasks, iterative solutions are preferred from a performance standpoint
          because they avoid the overhead and limitations of the call stack associated with deep recursion.
          They are more robust to highly nested data structures which could otherwise cause stack overflows.
        </p>
        <p>
          While recursive solutions might be slightly easier to write initially for simple grammars due to
          their direct mapping, production-grade parsers, especially those needing to handle arbitrary
          input without crashing on deep nesting, are almost always implemented iteratively or using parser
          generation tools that produce iterative code.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Gauge className="w-6 h-6 text-cyan-600" /> Real-World Parsers
        </h2>
        <p>
          Libraries and built-in functions like JavaScript&apos;s <code>JSON.parse()</code> or libraries
          in other languages are heavily optimized. They are typically implemented iteratively or using
          highly tuned techniques like state machines to achieve maximum performance and avoid stack depth
          issues.
        </p>
        <p>
          Therefore, while recursive descent is a great concept for learning parsing theory and can be
          implemented simply, it&apos;s rarely the algorithm used in performance-critical, production-ready
          JSON parsers due to the stack depth limitation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">Conclusion</h2>
        <p>
          The choice between a recursive and iterative approach for parsing boils down to a trade-off:
          recursion often leads to simpler, more readable code that directly reflects the grammar, but
          it carries the risk of stack overflow for deeply nested structures and incurs function call
          overhead. Iteration, while potentially more complex to implement, uses heap memory (which is
          more abundant than stack) and avoids the call stack depth limit, making it more robust and
          generally faster for large and deeply nested inputs.
        </p>
        <p>
          For most practical purposes, especially when dealing with potentially complex or user-provided
          JSON, an iterative approach (or using a battle-tested built-in parser) is the more reliable
          and performant choice.
        </p>
      </div>
    </>
  );
}