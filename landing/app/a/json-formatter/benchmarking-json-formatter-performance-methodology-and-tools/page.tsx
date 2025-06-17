import type { Metadata } from "next";
import {
  Clock,
  Gauge,
  Settings,
  LayoutGrid,
  AreaChart,
  Wrench, // Corrected icon name
  Zap,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Benchmarking JSON Formatter Performance: Methodology and Tools",
  description:
    "A comprehensive guide on how to benchmark the performance of JSON formatters, covering methodology, test cases, tools, and analysis.",
};

export default function BenchmarkingJsonFormatterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Gauge className="mr-3 h-8 w-8 text-blue-600" /> Benchmarking JSON Formatter Performance
      </h1>

      <div className="space-y-8">
        <p className="text-lg">
          JSON (JavaScript Object Notation) is ubiquitous in web development and data exchange. While built-in JSON
          parsers (`JSON.parse`) and serializers (`JSON.stringify`) are highly optimized, custom formatters (especially
          those for pretty-printing, diffing, or validation) can vary significantly in performance. Understanding how to
          accurately benchmark these formatters is crucial for selecting the right tool or optimizing your own
          implementation. This guide outlines a methodology and introduces tools for evaluating JSON formatter
          performance.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-3 h-7 w-7 text-green-600" /> 1. Defining &quot;Performance&quot;
          </h2>
          <p>Performance isn&apos;t a single metric. For a JSON formatter, key aspects include:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Speed / Throughput:</strong> How quickly can the formatter process a given amount of JSON data?
              Measured in time per operation or operations per second. This is often the primary focus.
            </li>
            <li>
              <strong>Memory Usage:</strong> How much memory does the formatter consume during operation? Important for
              processing large files or running in memory-constrained environments.
            </li>
            <li>
              <strong>Latency:</strong> The delay from starting the operation to receiving the first byte of output.
              Less critical for offline/batch processing, but relevant for streaming formatters or interactive tools.
            </li>
          </ul>
          <p className="mt-4">
            For most benchmarking of simple formatting tasks (like pretty-printing a complete document), Speed is the
            most commonly measured metric.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <LayoutGrid className="mr-3 h-7 w-7 text-orange-600" /> 2. Developing Test Cases
          </h2>
          <p>
            The performance of a formatter is highly dependent on the input data. A robust benchmark requires a variety
            of test cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Varying Data Size:</strong>
              <ul className="list-circle pl-6 mt-1 space-y-1">
                <li>Small (e.g., &lt;1 KB): Tests overhead and startup time.</li>
                <li>Medium (e.g., 10 KB - 1 MB): Represents common API responses or configuration files.</li>
                <li>Large (e.g., &gt;1 MB): Tests scalability, memory handling, and sustained throughput.</li>
              </ul>
            </li>
            <li>
              <strong>Diverse Structure:</strong>
              <ul className="list-circle pl-6 mt-1 space-y-1">
                <li>Flat objects/arrays.</li>
                <li>Deeply nested structures.</li>
                <li>Arrays with many elements.</li>
                <li>Objects with many keys.</li>
                <li>Mixtures of objects and arrays.</li>
              </ul>
            </li>
            <li>
              <strong>Different Data Types:</strong> Include strings (especially with escape characters or Unicode),
              numbers (integers, floats, large numbers), booleans, and nulls.
            </li>
            <li>
              <strong>Edge Cases:</strong> Empty objects (&#x7b;&#x7d;), empty arrays ([]), large strings without
              escapes, strings requiring many escapes, numbers close to precision limits.
            </li>
          </ul>
          <p className="mt-4">
            Using real-world JSON data relevant to your application is often the most effective approach.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Clock className="mr-3 h-7 w-7 text-teal-600" /> 3. Measurement Methodology
          </h2>
          <p>Accurate timing requires careful setup:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Isolation:</strong> Run benchmarks in a consistent, controlled environment. Close unnecessary
              applications, especially those consuming significant CPU or memory.
            </li>
            <li>
              <strong>Warm-up Phase:</strong>
              <p className="mt-1">
                Modern JavaScript engines use Just-In-Time (JIT) compilers. The first few runs of a function might be
                slower than subsequent runs after the code has been optimized. Always perform several
                &quot;warm-up&quot; iterations before starting the actual timing.
              </p>
            </li>
            <li>
              <strong>Timing Mechanism:</strong>
              <p className="mt-1">
                Use high-resolution timers. In browsers and Node.js,
                <code>performance.now()</code> is preferred over `Date.now()` because it provides sub-millisecond
                precision and is not subject to system clock adjustments.
              </p>
            </li>
            <li>
              <strong>Multiple Iterations:</strong>
              <p className="mt-1">
                Run the formatting process many times (thousands or even millions for small inputs) within a single
                measurement block. This averages out small variations and makes the overhead of the timing calls
                negligible. Calculate the total time and divide by the number of iterations to get the average time per
                operation.
              </p>
            </li>
            <li>
              <strong>Measure Function Call Only:</strong> Ensure you are timing only the formatter function call
              itself, not data loading, output handling (like printing to console), or other setup.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Wrench className="mr-3 h-7 w-7 text-purple-600" /> 4. Tools and Code Examples
          </h2>
          <p>
            You don&apos;t always need complex libraries for basic benchmarking. Native browser/Node.js APIs are often
            sufficient.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Native JavaScript Timing:</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h4 className="text-lg font-medium mb-2">Basic Timing with `performance.now()`:</h4>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
                {`// Assume 'jsonData' is your JavaScript object/array
// Assume 'formatterFunction' is the function you want to benchmark
// (e.g., JSON.stringify or a custom pretty-printer)

const ITERATIONS = 10000; // Number of times to run the formatter
const WARMUP_ITERATIONS = 100; // Number of warm-up runs

// Perform warm-up runs
console.log("Starting warm-up...");
for (let i = 0; i < WARMUP_ITERATIONS; i++) {
  formatterFunction(jsonData);
}
console.log("Warm-up finished. Starting benchmark...");

// Start timing
const startTime = performance.now();

// Run benchmark iterations
for (let i = 0; i < ITERATIONS; i++) {
  formatterFunction(jsonData);
}

// End timing
const endTime = performance.now();

const totalTimeMs = endTime - startTime;
const averageTimeMs = totalTimeMs / ITERATIONS;
const opsPerSecond = (ITERATIONS / totalTimeMs) * 1000;

console.log(\`Benchmarked \${ITERATIONS} iterations.\`);
console.log(\`Total time: \${totalTimeMs.toFixed(2)} ms\`);
console.log(\`Average time per operation: \${averageTimeMs.toFixed(4)} ms\`);
console.log(\`Operations per second: \${opsPerSecond.toFixed(2)}\`);

// Important: Dispose of results if they consume significant memory
// to avoid affecting subsequent runs due to GC pressure.
// Example: const formattedString = formatterFunction(jsonData);
// If not needed, let it go out of scope.
`}
              </pre>
            </div>
            <p className="mt-3 text-sm italic">
              This approach works well for synchronous formatters. For asynchronous operations, you&apos;d need to use
              Promises and potentially libraries like `benchmark` or adapt the loop with `async/await`.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-3">Memory Profiling:</h3>
          <p>Measuring memory usage in JavaScript is trickier and often requires specialized tools.</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Browser Developer Tools:</strong> The &quot;Memory&quot; tab in Chrome, Firefox, or Edge developer
              tools allows you to take heap snapshots and record allocation timelines to see memory usage patterns and
              identify potential leaks or excessive allocations during the formatting process.
            </li>
            <li>
              <strong>Node.js Profiler:</strong> Node.js provides built-in tools (e.g., `--inspect` flag with Chrome
              DevTools, or external tools like `memwatch-next`) to profile memory usage.
            </li>
          </ul>
          <p className="mt-4 italic text-sm">
            Memory profiling is usually done separately from speed benchmarking due to the overhead of collecting memory
            data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-3 h-7 w-7 text-red-600" /> 5. Challenges and Considerations
          </h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>JIT Variability:</strong> JIT compilers can produce inconsistent results between runs, especially
              if the code paths vary or if the test duration isn&apos;t long enough for optimal optimization. Use more
              iterations and warm-up.
            </li>
            <li>
              <strong>Garbage Collection (GC):</strong> GC cycles are largely unpredictable and can pause execution,
              affecting timing. Running many iterations averages out GC pauses. Ensure the benchmark doesn&apos;t
              unnecessarily create garbage between iterations if possible.
            </li>
            <li>
              <strong>Environment Noise:</strong> Background processes, OS activity, network traffic (if applicable) can
              interfere. Run benchmarks on a relatively idle system.
            </li>
            <li>
              <strong>Output Representation:</strong> Does the formatter return a single large string, or does it write
              to a stream? Generating a large string can have its own memory and performance overhead, which might be
              attributed to the formatter but is technically string allocation.
            </li>
            <li>
              <strong>Formatter Options:</strong> Different formatting options (indentation level, sorting keys,
              preserving order, etc.) have different performance characteristics. Benchmark each configuration relevant
              to your use case.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AreaChart className="mr-3 h-7 w-7 text-blue-600" /> 6. Analyzing Results
          </h2>
          <p>Once you have the numbers, analyze them in context:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>
              <strong>Compare Against a Baseline:</strong> Always compare the custom formatter against a known baseline,
              such as the native `JSON.stringify`, which is typically highly optimized C++ code and will almost always
              be faster for basic serialization. This gives you a realistic performance ceiling.
            </li>
            <li>
              <strong>Identify Bottlenecks:</strong> If your custom formatter is slow, use profiling tools (like those
              in browser DevTools or Node.js profilers) to see which parts of the code are consuming the most time or
              memory.
            </li>
            <li>
              <strong>Consider Use Case:</strong> A formatter might be slower overall but offer features (like specific
              output formatting, validation, or streaming) that are essential and justify the performance cost.
            </li>
            <li>
              <strong>Statistical Significance:</strong> For critical comparisons, consider running the entire benchmark
              suite multiple times and performing statistical analysis to confirm the results are consistent.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Zap className="mr-3 h-7 w-7 text-yellow-600" /> Conclusion
          </h2>
          <p>
            Benchmarking JSON formatter performance requires careful planning, realistic test cases, and precise
            measurement. By following a robust methodology and utilizing available tools, you can gain valuable insights
            into the efficiency of different formatters and make informed decisions based on your specific performance
            requirements. Remember that &quot;fastest&quot; isn&apos;t always &quot;best&quot; – the ideal formatter
            balances performance with features, correctness, and ease of use for your project.
          </p>
        </section>
      </div>
    </>
  );
}
