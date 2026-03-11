import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Sort and Filter JSON Data in JavaScript | Offline Tools",
  description:
    "Learn practical ways to filter and sort JSON data in JavaScript, including nested fields, immutable sorting, object entries, dates, and common pitfalls.",
};

export default function SortAndFilterJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Sort and Filter Operations on JSON</h1>

      <div className="space-y-6">
        <p>
          If you need to implement sort and filter operations on JSON, the first thing to know is that you usually do
          not sort raw JSON text. You parse JSON into JavaScript values, filter or sort the resulting arrays or object
          entries, and only convert back to JSON if you need to save or transmit the result.
        </p>

        <p>
          For most real-world work, that means three jobs: filtering arrays by one or more conditions, sorting arrays
          without accidentally mutating the original data, and handling edge cases such as nested fields, missing
          values, stringified numbers, or locale-aware text.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h2 className="text-xl font-semibold">Quick Answer</h2>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              JSON arrays are ordered sequences, so sorting normally means sorting an array after{" "}
              <code>JSON.parse()</code>.
            </li>
            <li>
              JSON objects are unordered collections of name-value pairs, so if you need to sort or filter object
              properties, use <code>Object.entries()</code> first.
            </li>
            <li>
              Use <code>filter()</code> to keep matching items and <code>toSorted()</code> when you want an immutable
              sorted result.
            </li>
            <li>
              If you must support older runtimes, use <code>[...items].sort(...)</code> instead of{" "}
              <code>items.sort(...)</code> to avoid mutating the original array.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Start With the Data Shape</h2>
        <p>
          The term &quot;sort JSON&quot; is slightly misleading because JSON itself is just a text format. Once parsed,
          you work with JavaScript arrays and objects:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Array:</span> Sort and filter directly with array methods.
            </li>
            <li>
              <span className="font-medium">Object:</span> Convert to entries, process them, then rebuild the object if
              needed.
            </li>
            <li>
              <span className="font-medium">Nested document:</span> Filter the specific array inside the document rather
              than trying to treat the entire JSON blob as one flat structure.
            </li>
          </ul>
        </div>

        <p>
          A common workflow looks like this: parse, inspect the shape, filter, sort, then stringify only if you need
          JSON output again.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const json = \`{
  "products": [
    { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics", "rating": 4.8, "inStock": true, "createdAt": "2026-01-15T10:00:00Z" },
    { "id": 2, "name": "book", "price": 25, "category": "Books", "rating": 4.4, "inStock": true, "createdAt": "2025-11-20T09:30:00Z" },
    { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics", "rating": 4.8, "inStock": false, "createdAt": "2026-02-02T08:15:00Z" },
    { "id": 4, "name": "Pen", "price": 2, "category": "Stationery", "rating": 4.1, "inStock": true, "createdAt": "2025-09-10T13:45:00Z" },
    { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics", "rating": 4.6, "inStock": true, "createdAt": "2026-02-10T17:20:00Z" }
  ]
}\`;

const data = JSON.parse(json);
const products = data.products;`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Filtering JSON Arrays With Useful Predicates</h2>
        <p>
          Basic filters are easy, but most production filters combine multiple conditions. Keep predicates explicit so
          the logic stays readable and testable.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Filter by category, price, and stock status</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const visibleProducts = products.filter((product) => {
  return (
    product.category === "Electronics" &&
    product.price <= 100 &&
    product.inStock === true
  );
});

/*
[
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics", "rating": 4.6, "inStock": true, "createdAt": "2026-02-10T17:20:00Z" }
]
*/`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            <code>filter()</code> returns a new array, so it is naturally safe to chain or reuse elsewhere without
            altering the original <code>products</code> array.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Filter nested or optional values safely</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const users = [
  { "id": 1, "profile": { "country": "US", "age": 34 } },
  { "id": 2, "profile": { "country": "DE", "age": 29 } },
  { "id": 3 }
];

const adultsInUs = users.filter((user) => {
  return user.profile?.country === "US" && (user.profile?.age ?? 0) >= 18;
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Optional chaining like <code>user.profile?.country</code> prevents runtime errors when fields are missing,
            which is common with partially populated JSON.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Sorting JSON Arrays Without Mutating the Original</h2>
        <p>
          JavaScript&apos;s <code>sort()</code> changes the array in place. That is fine if mutation is intentional, but
          it often causes bugs when the same data is reused elsewhere. In modern runtimes, prefer{" "}
          <code>toSorted()</code> for immutable sorting.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Immutable numeric sort</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const byPriceLowToHigh = products.toSorted((a, b) => a.price - b.price);

// Older-runtime fallback:
const byPriceLowToHighFallback = [...products].sort((a, b) => a.price - b.price);`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Modern JavaScript sorting is stable, which means items that compare as equal keep their original relative
            order. That makes secondary ordering more predictable when two records share the same primary key.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Multi-key sort for consistent results</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const featured = products.toSorted((a, b) => {
  if (b.rating !== a.rating) {
    return b.rating - a.rating; // highest rated first
  }

  return a.price - b.price; // cheaper item first when ratings tie
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Multi-key compares are better than trying to call <code>sort()</code> several times and hoping earlier
            ordering stays meaningful.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">String and Date Sorting</h2>
        <p>
          Strings and dates are where many JSON sorting bugs appear. Uppercasing everything works for simple demos, but
          user-facing text often needs locale-aware sorting, and date strings need a consistent format.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Locale-aware string sorting</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const collator = new Intl.Collator("en", {
  sensitivity: "base",
  numeric: true,
});

const byName = products.toSorted((a, b) => collator.compare(a.name, b.name));`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            <code>Intl.Collator</code> is usually a better choice than manual <code>toUpperCase()</code> comparisons
            because it handles case, accents, and embedded numbers more naturally.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Sort ISO 8601 timestamps</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const newestFirst = products.toSorted((a, b) => {
  return Date.parse(b.createdAt) - Date.parse(a.createdAt);
});`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This works well when your JSON stores dates in a consistent ISO 8601 format. If formats are mixed,
            normalize them before sorting or you will get unreliable results.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Combine Filter and Sort in One Pipeline</h2>
        <p>
          A common pattern is to filter down to the relevant subset and then sort the result for display or export.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const topAffordableElectronics = products
  .filter((product) => {
    return product.category === "Electronics" && product.price <= 100 && product.inStock;
  })
  .toSorted((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }

    return a.price - b.price;
  });`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This approach is easy to reason about: first decide what belongs in the result, then decide how the final
            list should be ordered.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Sorting or Filtering Object Properties</h2>
        <p>
          If your parsed JSON is an object rather than an array, convert it to entries before applying array methods.
          This is the right approach when you need to keep only certain keys or order properties for display.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const inventory = {
  laptop: { price: 1200, inStock: true },
  mouse: { price: 20, inStock: true },
  keyboard: { price: 75, inStock: false }
};

const filteredAndSortedEntries = Object.entries(inventory)
  .filter(([, item]) => item.inStock)
  .toSorted(([, a], [, b]) => a.price - b.price);

const rebuiltObject = Object.fromEntries(filteredAndSortedEntries);`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This technique is especially useful when your JSON source is a lookup map instead of a list of records.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">When JSONPath Helps</h2>
        <p>
          If your data is deeply nested and the hardest part is finding the values to filter, JSONPath is worth knowing.
          It is now standardized by the IETF, so it is a more solid option than it used to be for declarative JSON
          selection.
        </p>

        <p>
          JSONPath is most useful for locating nodes such as &quot;all orders over 100&quot; or &quot;every user email
          under this branch.&quot; After selecting the relevant nodes, you would typically still sort the resulting
          array in application code.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Mistakes to Avoid</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Sorting numbers as strings:</span> <code>"100"</code> comes before{" "}
              <code>"25"</code> in lexicographic order, so convert values to numbers when needed.
            </li>
            <li>
              <span className="font-medium">Forgetting that sort mutates:</span> If the original order matters, use{" "}
              <code>toSorted()</code> or sort a copied array.
            </li>
            <li>
              <span className="font-medium">Ignoring missing fields:</span> Comparators should define what happens when
              a value is <code>undefined</code> or <code>null</code>.
            </li>
            <li>
              <span className="font-medium">Treating object key order as business logic:</span> If the order itself is
              meaningful, an array is usually the better structure.
            </li>
            <li>
              <span className="font-medium">Mixing inconsistent date formats:</span> Normalize first, then sort.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Performance Guidance for Large JSON Files</h2>
        <p>
          For large payloads, sorting and filtering client-side can become expensive. The main improvement is usually
          reducing the amount of data before it reaches the browser rather than micro-optimizing comparator code.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>Filter on the server or in the database when possible.</li>
            <li>Normalize data types before sorting so the comparator does less cleanup work.</li>
            <li>Cache expensive derived values if a sort repeatedly computes the same parsed number or date.</li>
            <li>Paginate very large result sets instead of sorting thousands of unseen items in the browser.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing sort and filter operations on JSON is mostly about using the right JavaScript operations for the
          parsed data shape. Filter arrays with explicit predicates, prefer immutable sorting with <code>toSorted()</code>,
          convert objects to entries when needed, and normalize strings, numbers, and dates before comparing them.
        </p>

        <p>
          If a JSON document looks hard to work with, format it first, inspect the actual nesting, then apply filtering
          and sorting at the correct level. That sequence prevents most of the bugs people hit when working directly
          from an unstructured JSON blob.
        </p>
      </div>
    </>
  );
}
