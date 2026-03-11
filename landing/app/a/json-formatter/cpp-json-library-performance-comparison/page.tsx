import type { Metadata } from "next";
import { Zap, MemoryStick, Feather, Package, Clock, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "C++ JSON Library Performance Comparison: simdjson, RapidJSON, Boost.JSON, nlohmann, PicoJSON | Offline Tools",
  description:
    "Current March 10, 2026 guide to C++ JSON library performance, with practical advice on simdjson, RapidJSON, Boost.JSON, nlohmann/json, and PicoJSON.",
};

export default function CppJsonPerformanceComparison() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-4xl font-bold">C++ JSON Library Performance Comparison</h1>

      <section className="mx-auto mb-12 max-w-4xl text-center">
        <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
          If you need the short answer: <strong>simdjson</strong> is usually the best starting point when raw parsing
          throughput dominates, <strong>RapidJSON</strong> remains a strong low-level DOM/SAX choice,{" "}
          <strong>Boost.JSON</strong> is a practical high-performance DOM library, <strong>nlohmann/json</strong>{" "}
          optimizes for developer speed, and <strong>PicoJSON</strong> only makes sense when a tiny single-header
          dependency matters more than throughput.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current notes on this page were checked against official project documentation on March 10, 2026.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <Scale className="mr-3 text-blue-500" size={28} /> Quick Picks by Workload
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold">Fastest parse-heavy path</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>simdjson</strong> if your hot path is validating and reading large volumes of JSON and you can
              work with its parser-oriented API.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold">Best performance with classic C++ control</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>RapidJSON</strong> if you want DOM, SAX, in-situ parsing, and tight control over allocations.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold">Best balanced DOM choice</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Boost.JSON</strong> if you want strong performance but still prefer a modern value API and memory
              resource support.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-2 text-lg font-semibold">Best for developer productivity</h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>nlohmann/json</strong> if code clarity, easy integration, and STL-like ergonomics matter more
              than maximum speed.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <Package className="mr-3 text-red-500" size={28} /> Current Library Snapshot
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The comparison below focuses on real selection tradeoffs rather than a single third-party benchmark chart.
          Exact rankings change with payload shape, compiler flags, allocator strategy, and whether you measure parsing,
          lookup, mutation, or writing.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg shadow dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Library
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Where it usually wins
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  What to watch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Current notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">simdjson</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Often the best option for pure parsing throughput, especially on large inputs or services that mostly
                  read JSON and project a few fields.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  It is more specialized than a friendly mutable DOM. Current quick start expects a 64-bit system and a
                  C++17-capable toolchain.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Official docs center on On-Demand parsing. Current documentation also includes a Builder API, but the
                  library is still chosen primarily for very fast parsing.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">RapidJSON</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Excellent when you want a fast header-only library with both DOM and SAX, plus in-situ parsing for
                  lower allocation overhead.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  In-situ parsing mutates the input buffer. SIMD acceleration requires compile-time flags and must match
                  deployed CPU support.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Still one of the strongest choices when you care about low-level control, memory reuse, and predictable
                  performance tuning.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">Boost.JSON</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  A strong modern DOM option when you want competitive speed without dropping into a more manual parser
                  style.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  To see its best results you need to think about memory resources. Parse-once, read-many workloads can
                  benefit substantially from <code>monotonic_resource</code>.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Official benchmarks document both parser and serializer measurements and note that the library can be
                  used as compiled or header-only.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">nlohmann/json</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Usually the easiest library to drop into application code when readability and convenience matter most.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  The project explicitly does not treat memory efficiency or speed as its main design goal, so it is
                  rarely the fastest choice for hot paths.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  A very good default for tools, CLIs, tests, and control-plane code where developer time matters more
                  than shaving milliseconds.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">PicoJSON</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Only wins when you need a tiny single-header dependency, simple STL-shaped types, and modest JSON
                  workloads.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  It is not built to compete with parser-first libraries on large payloads, repeated parsing, or
                  high-throughput services.
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Official docs emphasize zero external dependencies, a pull parser, a streaming interface, and object
                  storage via <code>std::map</code>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <Zap className="mr-3 text-green-500" size={28} /> If You Specifically Care About PicoJSON Performance
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Searchers looking for <em>picojson performance in C++</em> usually want to know whether it is still a smart
          default. The practical answer is: <strong>only for small or low-frequency workloads</strong>.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          PicoJSON is intentionally minimal. Its documentation highlights a single-header design, zero external
          dependencies, and familiar STL containers such as <code>std::map</code> and <code>std::vector</code>. That
          simplicity is useful, but it also means you should not expect it to keep up with libraries that are built
          around SIMD, specialized memory management, or optimized read-only traversal.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-3 text-lg font-semibold">PicoJSON is reasonable when</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
              <li>You parse config files, fixtures, or plugin metadata at startup.</li>
              <li>You want a tiny vendored dependency with very little integration work.</li>
              <li>Payloads are small enough that parse time is not visible in profiling.</li>
              <li>Binary simplicity matters more than top-end throughput.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-3 text-lg font-semibold">PicoJSON is a poor fit when</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
              <li>You parse JSON on every request in a busy backend service.</li>
              <li>You process large arrays, telemetry streams, or log ingestion payloads.</li>
              <li>You need to minimize memory churn under sustained load.</li>
              <li>You are already benchmarking libraries like simdjson, RapidJSON, or Boost.JSON.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          A useful rule of thumb: if PicoJSON shows up in a flame graph, move on quickly. If JSON parsing is never a
          measurable cost in your workload, its simplicity may be worth more than theoretical benchmark losses.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <MemoryStick className="mr-3 text-purple-500" size={28} /> Why Benchmark Results Often Disagree
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Parse-only vs parse-and-use:</strong> simdjson often shines when you only need to validate and read
            fields, but DOM-heavy mutation workflows can narrow the gap with Boost.JSON or RapidJSON.
          </li>
          <li>
            <strong>Allocator strategy:</strong> Boost.JSON explicitly documents how memory resources affect results, and
            RapidJSON performance changes materially when you use in-situ parsing or custom allocators.
          </li>
          <li>
            <strong>Payload shape:</strong> Huge arrays of numbers, deeply nested objects, and string-heavy documents
            stress libraries differently.
          </li>
          <li>
            <strong>Hardware and compiler flags:</strong> SIMD-enabled parsers depend on CPU support, compiler versions,
            and optimization levels. Comparing an <code>-O0</code> build with an <code>-O3</code> build is noise, not
            data.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <Clock className="mr-3 text-orange-500" size={28} /> How to Benchmark Your Own Workload
        </h2>
        <ul className="list-disc space-y-3 pl-6 text-gray-700 dark:text-gray-300">
          <li>Test at least three payload sizes: a small config file, a typical production document, and a worst-case file.</li>
          <li>Measure parsing, field access, mutation, and serialization separately instead of collapsing them into one number.</li>
          <li>Warm up the benchmark and reuse loaded input data so file I/O does not pollute parsing numbers.</li>
          <li>Compile every library with the same compiler and aggressive optimization flags.</li>
          <li>Record memory usage and tail latency, not just average throughput.</li>
          <li>Include malformed JSON tests if error-path performance matters in your application.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <Package className="mr-3 text-indigo-500" size={28} /> Official Documentation Worth Checking
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300">
          <li>
            <a
              className="text-blue-600 hover:underline dark:text-blue-400"
              href="https://github.com/simdjson/simdjson"
              rel="noreferrer"
              target="_blank"
            >
              simdjson README and docs
            </a>{" "}
            for current requirements, On-Demand parsing, and Builder support.
          </li>
          <li>
            <a
              className="text-blue-600 hover:underline dark:text-blue-400"
              href="https://www.boost.org/doc/libs/develop/libs/json/doc/html/benchmarks.html"
              rel="noreferrer"
              target="_blank"
            >
              Boost.JSON benchmarks
            </a>{" "}
            for benchmark methodology and memory-resource notes.
          </li>
          <li>
            <a
              className="text-blue-600 hover:underline dark:text-blue-400"
              href="https://rapidjson.org/md_doc_faq.html"
              rel="noreferrer"
              target="_blank"
            >
              RapidJSON FAQ
            </a>{" "}
            for in-situ parsing and SIMD configuration details.
          </li>
          <li>
            <a
              className="text-blue-600 hover:underline dark:text-blue-400"
              href="https://json.nlohmann.me/home/design_goals/"
              rel="noreferrer"
              target="_blank"
            >
              nlohmann/json design goals
            </a>{" "}
            for the project&apos;s explicit tradeoff toward usability over raw speed.
          </li>
          <li>
            <a
              className="text-blue-600 hover:underline dark:text-blue-400"
              href="https://github.com/kazuho/picojson"
              rel="noreferrer"
              target="_blank"
            >
              PicoJSON README
            </a>{" "}
            for its tiny-dependency design, pull parser, and streaming interface.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 flex items-center text-2xl font-semibold">
          <Feather className="mr-3 text-cyan-500" size={28} /> Bottom Line
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          For most searchers comparing C++ JSON performance in 2026, the decision is simpler than older benchmark
          roundups make it look: choose <strong>simdjson</strong> for parser-dominated workloads, <strong>RapidJSON</strong>{" "}
          when you want a proven fast low-level toolkit, <strong>Boost.JSON</strong> for a modern performance-oriented
          DOM, and <strong>nlohmann/json</strong> when developer efficiency is the real bottleneck.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>PicoJSON is still useful, but mostly as a tiny dependency play.</strong> If performance is a genuine
          concern rather than a curiosity, benchmark it against faster modern options before you commit.
        </p>
      </section>
    </div>
  );
}
