import type { Metadata } from "next";
import {
  Zap,
  HardDrive,
  Lightbulb,
  AlertTriangle,
  Brain,
  FileJson,
  CodeXml,
  Hourglass,
  // Removed Speedometer as it caused an import error
} from "lucide-react";

export const metadata: Metadata = {
  title: "Caching Strategies for Repetitive JSON Formatting Tasks",
  description:
    "Optimize performance in backend applications by caching the results of repetitive JSON.stringify calls.",
};

export default function CachingJsonFormattingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <HardDrive className="w-8 h-8" />
        Caching Strategies for Repetitive JSON Formatting Tasks
      </h1>

      <div className="space-y-8 text-gray-800 dark:text-gray-200">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" /> Introduction
          </h2>
          <p>
            In backend services, APIs, or server-side rendering (SSR), transforming data structures into JSON strings is
            a frequent operation. While <code>JSON.stringify()</code> is highly optimized, repeatedly stringifying the
            *same* or structurally *identical* data can still become a performance bottleneck, especially for large or
            complex objects, contributing to unnecessary CPU load and slower response times.
          </p>
          <p>
            Caching the results of these formatting tasks is a powerful optimization technique. Instead of recalculating
            the JSON string every time, we store the result and retrieve it instantly on subsequent requests for the
            same data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Hourglass className="w-6 h-6" /> The Repetition Problem
          </h2>
          <p>
            Consider a scenario where an API endpoint returns a list of products. If this list doesn't change
            frequently, stringifying the product data object for every single request is redundant work. Each{" "}
            <code>JSON.stringify()</code> call traverses the object structure, converts values, escapes strings, and
            builds the final text representation. This process is deterministic for a given object structure and value
            set.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Example Scenario:</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Repeated stringification of static data:</p>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`const staticProductList = [
  &#x7b; id: 1, name: "Laptop Pro", price: 1200, available: true &#x7d;,
  &#x7b; id: 2, name: "Mechanical Keyboard", price: 75, available: true &#x7d;,
  // ... many more products
];

// In a request handler (hypothetical server code):
// function handleGetProducts(req, res) &#x7b;
//   // This stringify happens on *every* request!
//   const jsonResponse = JSON.stringify(staticProductList, null, 2);
//   res.setHeader('Content-Type', 'application/json');
//   res.end(jsonResponse);
// &#x7d;
`}
            </pre>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              If <code>staticProductList</code> rarely changes, why format it repeatedly?
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <HardDrive className="w-6 h-6" /> Basic Strategy: Memoization with Object Reference
          </h2>
          <p>
            The most straightforward caching strategy is{" "}
            <a
              href="https://en.wikipedia.org/wiki/Memoization"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              memoization
            </a>
            . We use the object instance itself as the key in a cache storage. When asked to stringify an object:
          </p>
          <ol className="list-decimal pl-6 space-y-2 my-4">
            <li>Check if the object reference exists as a key in the cache.</li>
            <li>If yes (cache hit), return the stored string value immediately.</li>
            <li>
              If no (cache miss), call <code>JSON.stringify()</code>, store the resulting string in the cache with the
              object reference as the key, and return the string.
            </li>
          </ol>
          <p>
            For the cache storage,{" "}
            <code>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                WeakMap
              </a>
            </code>{" "}
            is an excellent choice in JavaScript/TypeScript backend environments. Unlike a standard <code>Map</code>,{" "}
            <code>WeakMap</code> keys must be objects, and crucially, it holds "weak" references to these keys. If the
            object key is garbage collected because there are no other references to it, the corresponding entry in the{" "}
            <code>WeakMap</code> is also automatically removed. This prevents memory leaks.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Memoization Code Example (Backend Context):</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`// Defined outside of request handlers to persist across requests
const jsonCache = new WeakMap<object, string>();

/**
 * Caches the result of JSON.stringify for a given object instance.
 * @param obj The object to stringify and cache.
 * @param space Indentation spaces (optional).
 */
function cachedStringify(obj: object, space?: string | number): string &#x7b;
  // Note: This simple implementation assumes 'space' is consistent for cached objects.
  // If you need different 'space' values for the same object instance,
  // you would need a more complex key or nested cache (e.g., WeakMap<object, Map<spaceValue, string>>).

  const cached = jsonCache.get(obj); // Check cache by object reference

  if (cached !== undefined) &#x7b;
    // Cache hit!
    // console.log('Cache hit for object:', obj); // For debugging
    return cached;
  &#x7b;

  // Cache miss
  // console.log('Cache miss for object:', obj); // For debugging
  const jsonString = JSON.stringify(obj, null, space); // Stringify

  jsonCache.set(obj, jsonString); // Store result

  return jsonString;
&#x7d;

// Example Usage in a server-side function:
// const myData = &#x7b; user: &#x7b; id: 1, name: "Alice" &#x7d;, settings: &#x7b; theme: "dark" &#x7d; &#x7d;;
//
// // First call - cache miss
// const json1 = cachedStringify(myData, 2); // Stringifies and caches
// console.log(json1);
//
// // Second call with the *same object reference* - cache hit
// const json2 = cachedStringify(myData, 2); // Returns cached string instantly
// console.log(json2 === json1); // true
//
// // Different object reference - cache miss
// const myDataCopy = &#x7b; user: &#x7b; id: 1, name: "Alice" &#x7d;, settings: &#x7b; theme: "dark" &#x7d; &#x7d;;
// const json3 = cachedStringify(myDataCopy, 2); // Stringifies and caches new object
// console.log(json3 === json1); // true (strings are identical)
// console.log(jsonCache.get(myData) === json1); // true
// console.log(jsonCache.get(myDataCopy) === json3); // true
`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" /> Cache Keys: Identity vs. Value
          </h2>
          <p>Choosing the cache key is crucial:</p>
          <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">Object Identity (Reference)</h3>
          <p>
            This is what the <code>WeakMap</code> example uses. The key is the specific instance of the object in
            memory.
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Pros:</span> Extremely fast key lookup. Simple to implement. Avoids memory
              leaks with <code>WeakMap</code>. Ideal when the *same object instance* is passed repeatedly.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Fails if you have two different object instances with the
              *exact same content*. Does not handle mutation of the cached object effectively (see below).
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
            <Brain className="w-6 h-6" /> Deep Value Equality
          </h3>
          <p>
            Using a deep comparison of the object's properties and values as the basis for the cache key (e.g., by
            hashing the object's content) would allow caching strings for different object instances that happen to have
            the same data.
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Pros:</span> More hits if identical data structures are generated
              independently.
            </li>
            <li>
              <span className="font-medium">Cons:</span> Requires implementing or using a deep comparison/hashing
              function, which can be as computationally expensive (or more so) than <code>JSON.stringify()</code>{" "}
              itself, negating the benefit. Harder to manage the cache and memory. Generally not recommended for this
              specific task unless deep equality checking is already part of your workflow for other reasons.
            </li>
          </ul>
          <p>
            <span className="font-medium">Conclusion:</span> For caching <code>JSON.stringify</code> results, caching
            based on{" "}
            <span className="font-semibold">
              object identity using <code>WeakMap</code>
            </span>{" "}
            is usually the most practical and performant approach in backend scenarios.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" /> The Cache Invalidation Challenge: Mutation
          </h2>
          <p>
            The biggest pitfall of caching based on object identity is{" "}
            <span className="font-semibold text-red-600 dark:text-red-400">mutation</span>. If you cache the string for
            an object, and then later modify that object (e.g., change a property value, add/remove an item from an
            array within it), the cached string becomes{" "}
            <span className="font-semibold text-red-600 dark:text-red-400">stale</span>. Subsequent calls using the
            *same object reference* will return the old, incorrect JSON string.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2">Mutation Example:</h3>
            <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              {`const mutableData = &#x7b; count: 0, items: [] &#x7d;;

// Assume cachedStringify and jsonCache are defined elsewhere as shown above

// First call - caches "{\\"count\\":0,\\"items\\":[]}"
// const jsonA = cachedStringify(mutableData);
// console.log("JSON A:", jsonA);

// Mutate the object!
// mutableData.count = 1;
// mutableData.items.push("apple");

// Second call with the *same object reference*
// !!! DANGER: Returns the *stale* string from the cache !!!
// const jsonB = cachedStringify(mutableData);
// console.log("JSON B (from cache):", jsonB);
// console.log("Does JSON B reflect the mutation?", jsonB.includes('"count":1')); // false!

// If we stringify without the cache:
// const correctJsonAfterMutation = JSON.stringify(mutableData);
// console.log("Correct JSON after mutation:", correctJsonAfterMutation); // Shows count: 1, items: ["apple"]

// The cached string is now wrong.
`}
            </pre>
          </div>
          <p>
            <span className="font-medium">Solution:</span> This caching strategy is most effective when stringifying{" "}
            <span className="font-semibold">immutable data structures</span> or objects whose lifecycle ensures they are
            not mutated between the caching call and subsequent lookups within the cache's intended lifespan. If your
            objects are frequently mutated, this simple memoization strategy is{" "}
            <span className="font-semibold text-red-600 dark:text-red-400">not suitable</span>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" /> When to Use This Strategy
          </h2>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Static or Slow-Changing API Responses:</span> Caching the JSON output for
              endpoints serving data that is updated infrequently (e.g., configuration data, product lists with
              server-side rendering).
            </li>
            <li>
              <span className="font-medium">Server-Side Rendering (SSR) of Stable Data:</span> If parts of the data
              structure used for SSR are static or only change with deployments, caching the formatted JSON for those
              parts can reduce render time.
            </li>
            <li>
              <span className="font-medium">Pure Functions Returning Objects:</span> Caching the output of a function
              that always returns the same object instance (or a deep clone that is treated as immutable within its
              usage context) for the same inputs.
            </li>
            <li>
              <span className="font-medium">Data Processed in Batches:</span> If the same objects are processed and
              formatted multiple times within a single batch job or request lifecycle where you know they won't be
              mutated.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" /> When Not to Use It
          </h2>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <span className="font-medium">Highly Dynamic Data:</span> Objects that change frequently based on user
              interaction, database updates, or external events.
            </li>
            <li>
              <span className="font-medium">Objects with Short Lifespans:</span> If objects are created and discarded
              quickly, the overhead of cache checking and setting might outweigh the benefit.
            </li>
            <li>
              <span className="font-medium">When Object Mutation is Unavoidable:</span> Unless you have a robust
              invalidation strategy tied to mutations (which is complex), avoid caching mutable objects by reference.
            </li>
            <li>
              <span className="font-medium">Small Objects:</span> For tiny objects, <code>JSON.stringify</code> is
              usually fast enough that caching provides negligible benefit.
            </li>
          </ul>
        </section>

        <section>
          {/* Replaced Speedometer with Zap */}
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" /> Measuring Impact
          </h2>
          <p>
            As with any optimization, measure before and after implementing caching to confirm it provides a meaningful
            performance improvement in your specific use case. Tools for profiling CPU usage and request latency can
            help.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson className="w-6 h-6" /> Alternative: Caching Upstream Results
          </h2>
          <p>
            Often, a more effective place to cache is upstream of the JSON formatting. If the object you're stringifying
            is the result of a database query, an API call, or a complex computation, consider caching the *result of
            that query/call/computation* instead of just the final stringification. This caches the data structure
            itself, which can then be stringified (possibly still using the memoization described above) when needed.
            This avoids recalculating the data *and* stringifying it repeatedly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CodeXml className="w-6 h-6" /> Conclusion
          </h2>
          <p>
            Caching the output of <code>JSON.stringify</code> using a <code>WeakMap</code> and object identity as the
            key is a simple yet effective strategy for optimizing performance in backend applications when dealing with
            repetitive formatting of static or slow-changing data structures. Be mindful of the cache invalidation
            problem caused by object mutation and ensure your use case aligns with the strengths of this approach. For
            dynamic data, consider caching the source data itself or rely on the inherent speed of modern{" "}
            <code>JSON.stringify</code> implementations.
          </p>
        </section>
      </div>
    </div>
  );
}
