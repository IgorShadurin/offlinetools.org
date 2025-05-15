import type { Metadata } from "next";
import { Bug, Terminal, Copy, Code, ClipboardList, Eye, Search } from "lucide-react"; // Only allowed icons

export const metadata: Metadata = {
  title: "Browser Console Techniques for JSON Debugging",
  description: "Learn powerful browser console techniques to effectively debug and inspect JSON data.",
};

export default function JsonDebuggingConsolePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Bug className="mr-3 h-8 w-8 text-red-600" />
        Browser Console Techniques for JSON Debugging
      </h1>

      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        Dealing with JSON data is a daily task for web developers. Whether it's API responses, configuration files, or data structures within your application, understanding how to quickly inspect and debug JSON in the browser console can save you significant time and effort. This article explores several powerful techniques using the developer console built into modern browsers.
      </p>

      <div className="space-y-8">

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Terminal className="mr-2 h-6 w-6 text-blue-600" />
            1. The Basics: `console.log()` and Direct Inspection
          </h2>
          <p>
            The most fundamental tool is <code>console.log()</code>. When you log a JavaScript object or array (which is how JSON is represented in JavaScript), the console provides an interactive view.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Simple Log</h3>
            <pre>
              {`const jsonData = &#x7b;
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "courses": ["Math", "Science"],
  "address": &#x7b;
    "city": "Wonderland",
    "zip": "12345"
  &#x7d;
&#x7d;;

console.log(jsonData);`}
            </pre>
          </div>
          <p>
            In the console, clicking the triangle next to the logged object/array will expand it, allowing you to navigate through nested properties and values. This is often sufficient for initial inspection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <ClipboardList className="mr-2 h-6 w-6 text-green-600" />
            2. Detailed View: `console.dir()`
          </h2>
          <p>
            While <code>console.log()</code> is great, sometimes it formats output differently depending on the object type. For a consistent, detailed, tree-like view of a JavaScript object's properties, including those not enumerable by <code>console.log()</code>, use <code>console.dir()</code>. This is particularly useful for inspecting complex objects that might contain more than just simple JSON data.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Using `console.dir()`</h3>
            <pre>
              {`const complexObject = &#x7b;
  id: 123,
  data: &#x7b; value: 'test' &#x7d;,
  method: function() &#x7b; console.log('hello'); &#x7d;,
  symbolProp: Symbol('unique')
&#x7d;;

console.log('Using console.log:');
console.log(complexObject);

console.log('Using console.dir:');
console.dir(complexObject);`}
            </pre>
          </div>
          <p>
            You'll see that <code>console.dir()</code> provides a more structured and complete representation, making it easier to explore the object's internals.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 h-6 w-6 text-purple-600" />
            3. Parsing and Stringifying in the Console
          </h2>
          <p>
            Sometimes you have JSON as a string and need to parse it, or you have an object and need its JSON string representation. The console is a live JavaScript environment where you can use <code>JSON.parse()</code> and <code>JSON.stringify()</code> directly.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Parse and Stringify</h3>
            <pre>
              {`const jsonString = '&#x7b;"product":"Laptop","price":1200,"inStock":true&#x7d;';

// Parse the string into a JavaScript object
const parsedObject = JSON.parse(jsonString);
console.log('Parsed Object:');
console.log(parsedObject);

// Stringify a JavaScript object into a JSON string
const dataObject = &#x7b; city: "London", country: "UK" &#x7d;;
const stringifiedJson = JSON.stringify(dataObject);
console.log('Stringified JSON:');
console.log(stringifiedJson);

// Stringify with formatting (indentation)
const formattedJson = JSON.stringify(dataObject, null, 2);
console.log('Formatted JSON:');
console.log(formattedJson);`}
            </pre>
          </div>
          <p>
            Using <code>JSON.stringify(obj, null, 2)</code> is particularly useful for pretty-printing JSON strings in the console or before copying them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Copy className="mr-2 h-6 w-6 text-teal-600" />
            4. Copying Data with `copy()`
          </h2>
          <p>
            Need to grab that large JSON object from the console to paste into a text editor or JSON formatter? Most browser consoles provide a handy <code>copy()</code> function.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Copying Data</h3>
            <pre>
              {`const largeDataObject = &#x7b; /* ... your large data object ... */ &#x7d;;

// In the console, after logging or accessing the object:
copy(largeDataObject); // This copies the object's string representation to your clipboard`}
            </pre>
          </div>
          <p>
            If you copy an object directly, it often copies its string representation (similar to <code>JSON.stringify</code> but browser-dependent). You can also chain it with <code>JSON.stringify</code> for more control:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <pre>
              {`const largeDataObject = &#x7b; /* ... */ &#x7d;;

// Copies the formatted JSON string
copy(JSON.stringify(largeDataObject, null, 2));`}
            </pre>
          </div>
          <p>
            This is invaluable for extracting complex data structures for external analysis or sharing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Eye className="mr-2 h-6 w-6 text-orange-600" />
            5. Accessing Nested Properties Directly
          </h2>
          <p>
            Once you've logged or stopped at a breakpoint where your JSON data is available as a variable, you can access its nested properties directly in the console's command line.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Accessing Nested Data</h3>
            <pre>
              {`const jsonData = &#x7b;
  "user": &#x7b;
    "id": 101,
    "profile": &#x7b;
      "email": "alice@example.com",
      "settings": &#x7b; "theme": "dark" &#x7d;
    &#x7d;,
    "orders": [ &#x7b; "id": "A1", "amount": 50 &#x7d;, &#x7b; "id": "A2", "amount": 75 &#x7d; ]
  &#x7d;
&#x7d;;

// Assuming jsonData is available in the console scope:

// Access email
console.log(jsonData.user.profile.email);

// Access the second order's amount
console.log(jsonData.user.orders[1].amount);

// Check a property
console.log(jsonData.user.profile.hasOwnProperty('settings'));`}
            </pre>
          </div>
          <p>
            The console remembers the scope of the currently executing function (if paused at a breakpoint) or the global scope, allowing you to interact with variables. After logging an object, modern consoles often provide a temporary variable reference (like `$1`, `$2`, etc.) to the last logged items, which you can then use for exploration:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Using Console Variables</h3>
            <pre>
              {`// First, log the object
console.log(jsonData);

// Then, in the console command line:
$1.user.profile.email
$1.user.orders[0].id`}
            </pre>
          </div>
          <p>
            (Note: The exact variable name like `$1` might vary slightly between browsers, but the concept is common.)
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Search className="mr-2 h-6 w-6 text-yellow-600" />
            6. Filtering Console Output
          </h2>
          <p>
            When your application logs a lot of data, finding specific JSON output can be challenging. The browser console's filter bar is your friend. You can filter by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Log level (Errors, Warnings, Info, Logs, Debug)</li>
            <li>Text content (e.g., filter for "user data")</li>
            <li>Source URL</li>
          </ul>
          <p>
            Additionally, you can right-click on a logged message in some browsers and select "Filter" -&gt; "Show only from this source" or "Hide messages like this".
          </p>
          <p>
            For JSON debugging, logging your data with a descriptive label makes it easy to find later:
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Logging with Labels for Filtering</h3>
            <pre>
              {`const apiResponse = &#x7b; /* ... extensive API data ... */ &#x7d;;
console.log('API_RESPONSE_DEBUG:', apiResponse);

const userData = &#x7b; /* ... user details ... */ &#x7d;;
console.log('USER_DATA_DEBUG:', userData);`}
            </pre>
          </div>
          <p>
            You can then type "API_RESPONSE_DEBUG" or "USER_DATA_DEBUG" into the console's filter bar to see only those specific logs.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 h-6 w-6 text-pink-600" />
            7. Using Breakpoints in the Sources Tab
          </h2>
          <p>
            While logging is great, sometimes you need to inspect the JSON data at a very specific point in your code's execution. This is where breakpoints in the "Sources" tab become essential.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Go to the "Sources" tab in your browser's developer tools.</li>
            <li>Find the JavaScript file containing the code that handles the JSON data.</li>
            <li>Click on the line number where the JSON data (as a variable) is in scope. A blue marker indicates a breakpoint.</li>
            <li>Trigger the code execution that reaches this line (e.g., click a button, refresh the page if it's on load).</li>
            <li>Execution will pause at your breakpoint.</li>
            <li>In the "Scope" panel (usually on the right), expand the variables section to see the JSON data object.</li>
            <li>In the "Console" tab (which is still active while paused), you can now directly access and inspect the variable by name, using the techniques mentioned above (<code>console.log()</code>, <code>console.dir()</code>, accessing nested properties).</li>
          </ol>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example Scenario: Debugging API Response</h3>
            <pre>
              {`async function fetchUserData(userId) &#x7b;
  const response = await fetch(\`/api/users/\${userId}\`);
  const userData = await response.json(); // Put a breakpoint on this line!

  // Now 'userData' is available in the console when execution pauses here
  console.log("Fetched data:", userData); // Or inspect via Scope panel or console command line

  displayUser(userData);
&#x7d;`}
            </pre>
          </div>
          <p>
            Breakpoints offer a much deeper and more controlled inspection than just sprinkling <code>console.log</code> everywhere.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
             <Terminal className="mr-2 h-6 w-6 text-blue-600" />
            8. Experimenting in the Console Command Line
          </h2>
          <p>
            Beyond just viewing data, the console command line is a live JavaScript environment. You can manipulate the JSON object (or its variable reference if available) to test transformations or access specific pieces of data.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h3 className="text-lg font-medium mb-2">Example: Live Manipulation</h3>
            <pre>
              {`const productData = &#x7b;
  "items": [
    &#x7b; "name": "Laptop", "price": 1200 &#x7d;,
    &#x7b; "name": "Mouse", "price": 25 &#x7d;,
    &#x7b; "name": "Keyboard", "price": 75 &#x7d;
  ]
&#x7d;;

// Assuming productData is available in console scope ($1):

// Get total price of items
$1.items.reduce((sum, item) =&gt; sum + item.price, 0); // Outputs: 1300

// Find an item by name
$1.items.find(item =&gt; item.name === 'Mouse'); // Outputs: &#x7b; name: "Mouse", price: 25 &#x7d;

// Add a new property
$1.items[0].quantity = 1; // Modifies the object in the console's memory`}
            </pre>
          </div>
          <p>
            This allows you to quickly prototype data processing logic or verify values derived from the JSON without changing and re-running your application code repeatedly.
          </p>
        </section>

      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4 flex items-center">
         <Bug className="mr-2 h-6 w-6 text-red-600" />
        Conclusion
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        The browser console is a powerful, often underutilized, tool for debugging JSON. From simple logging and detailed inspection with <code>console.dir()</code> to parsing/stringifying, copying data, accessing nested properties, filtering output, utilizing breakpoints, and live manipulation, these techniques provide a comprehensive toolkit for understanding and troubleshooting your JSON data flow. Mastering these console methods will significantly boost your debugging efficiency. Happy debugging!
      </p>
    </div>
  );
}