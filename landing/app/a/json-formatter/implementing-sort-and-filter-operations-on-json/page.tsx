import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Sort and Filter Operations on JSON | Offline Tools",
  description:
    "Learn how to effectively sort and filter JSON data using JavaScript and common techniques for data manipulation.",
};

export default function SortAndFilterJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Implementing Sort and Filter Operations on JSON
      </h1>

      <div className="space-y-6">
        <p>
          Working with JSON data is a fundamental task in web development and data processing. Often, you need to
          manipulate this data to find specific information or arrange it in a particular order. This is where
          sort and filter operations come into play. This guide will explore how to implement these operations
          on JSON data, primarily using JavaScript as the example language.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Understanding Sort and Filter</h2>
        <p>
          Before diving into implementation, let&apos;s clarify what sorting and filtering mean in the context of
          data manipulation:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Filtering:</span> The process of selecting a subset of data from a
              larger dataset based on specified criteria. You keep only the items that meet certain conditions.
            </li>
            <li>
              <span className="font-medium">Sorting:</span> The process of arranging items in a dataset in a
              specific order, such as alphabetical, numerical, or chronological.
            </li>
          </ul>
        </div>

        <p>
          In JavaScript, when working with JSON, you typically load it into an array of objects. Standard
          array methods like <code>filter()</code> and <code>sort()</code> are your primary tools for these operations.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Filtering JSON Data (Array of Objects)</h2>
        <p>
          Filtering involves iterating through an array and creating a new array containing only the elements
          that pass a test implemented by a provided function.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Filtering products by price &lt; 50</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const products = [
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" }
];

// Filter products with price less than 50
const affordableProducts = products.filter(product => product.price < 50);

/*
affordableProducts will be:
[
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" }
]
*/`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The <code>filter()</code> method returns a new array, leaving the original array unchanged.
            The function passed to <code>filter()</code> should return <code>true</code> to keep the element or <code>false</code>{" "}
            to discard it.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Filtering products by category "Electronics"</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const electronics = products.filter(product => product.category === "Electronics");

/*
electronics will be:
[
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" }
]
*/`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Filtering by string properties involves checking for exact matches or using methods like <code>includes()</code>{" "}
            or regular expressions for more complex pattern matching.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Sorting JSON Data (Array of Objects)</h2>
        <p>
          Sorting rearranges the elements of an array in place and returns the sorted array. The default sort
          order is ascending, based on converting elements to strings and comparing their sequences of UTF-16
          code units. For numbers or custom sorting logic, you must provide a compare function.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Sorting products by price (ascending)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const productsToSort = [ // Use a copy if you need the original array
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" }
];

// Sort products by price ascending
productsToSort.sort((a, b) => a.price - b.price);

/*
productsToSort will be:
[
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" },
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" }
]
*/`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            The compare function <code>(a, b) =&gt; a.price - b.price</code> works for numbers.
            If <code>a.price - b.price</code> is negative, <code>a</code> comes before <code>b</code>. If positive,{" "}
            <code>b</code> comes before <code>a</code>. If zero, their order doesn&apos;t change.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Sorting products by name (alphabetical)</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const productsToSortByName = [ // Use a copy
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" }
];

// Sort products by name alphabetically
productsToSortByName.sort((a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1; // nameA comes first
  }
  if (nameA > nameB) {
    return 1; // nameB comes first
  }
  // names must be equal
  return 0;
});

/*
productsToSortByName will be:
[
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" },
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" }
]
*/`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            For string sorting, comparing strings directly works, but converting to the same case (e.g.,
            uppercase) ensures case-insensitive sorting. The compare function should return a negative value
            if <code>a</code> should come before <code>b</code>, a positive value if <code>a</code> should come after{" "}
            <code>b</code>, and <code>0</code> if their order doesn&apos;t matter.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Combining Filter and Sort</h2>
        <p>
          You can chain these operations to first narrow down your data using filtering, and then order the
          filtered results using sorting.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Filter by category then sort by price</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`const productsOriginal = [ // Original data
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" },
  { "id": 2, "name": "Book", "price": 25, "category": "Books" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 4, "name": "Pen", "price": 2, "category": "Stationery" },
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" }
];

// Filter electronics, then sort by price ascending
const sortedElectronics = productsOriginal
  .filter(product => product.category === "Electronics") // Returns a new array
  .sort((a, b) => a.price - b.price); // Sorts the new array in place and returns it

/*
sortedElectronics will be:
[
  { "id": 5, "name": "Mouse", "price": 20, "category": "Electronics" },
  { "id": 3, "name": "Keyboard", "price": 75, "category": "Electronics" },
  { "id": 1, "name": "Laptop", "price": 1200, "category": "Electronics" }
]
*/`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Since <code>filter()</code> returns a new array, you can directly call <code>sort()</code> on the result.
            Remember that <code>sort()</code> modifies the array it&apos;s called on. If you need to preserve the intermediate
            filtered array, make a copy before sorting or store the result of filter in a variable first.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations for Large Datasets</h2>
        <p>
          For very large JSON datasets, performance becomes a factor.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Data Type Consistency:</span> Ensure the data types of the properties
              you are filtering or sorting on are consistent (e.g., all numbers, all strings) to avoid unexpected
              behavior.
            </li>
            <li>
              <span className="font-medium">Case Sensitivity:</span> String filtering and sorting are case-sensitive
              by default. Use <code>toLowerCase()</code> or <code>toUpperCase()</code> if case-insensitivity is needed.
            </li>
            <li>
              <span className="font-medium">Performance:</span> For massive datasets, client-side JavaScript sorting and
              filtering might become slow. Consider performing these operations on the server-side if possible, or
              using specialized libraries optimized for large data manipulation.
            </li>
            <li>
              <span className="font-medium">Immutable Operations:</span> While <code>filter()</code> is immutable (returns a new array),{" "}
              <code>sort()</code> is mutable (modifies in place). If you need to preserve the original array, make a copy
              before sorting (e.g., using <code>[...arr].sort(...)</code> or <code>arr.slice().sort(...)</code>).
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Pro Tip:</h3>
          <p className="mt-2">
            When dealing with potentially complex filtering criteria, consider building a dynamic filter function
            or using helper libraries that abstract away the complexities of multiple conditions and data types.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Sorting and filtering are essential data manipulation tasks when working with JSON. By leveraging
          JavaScript&apos;s built-in array methods like <code>filter()</code> and <code>sort()</code>, you can effectively
          select subsets of data and arrange them as needed. Understanding how these methods work,
          especially the compare function for sorting and the immutability of the operations, is key to
          reliable data processing.
        </p>
        <p>
          Whether you&apos;re displaying data in a table, preparing it for analysis, or processing it for storage,
          mastering these techniques is crucial for efficient and effective JSON data handling.
        </p>
      </div>
    </>
  );
}
