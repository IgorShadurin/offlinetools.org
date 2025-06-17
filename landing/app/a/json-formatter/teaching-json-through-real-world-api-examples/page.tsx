import type { Metadata } from "next";
import { Code, Globe, Cloud, List, User, Box } from "lucide-react"; // Using allowed icons

export const metadata: Metadata = {
  title: "Teaching JSON Through Real-World API Examples | Offline Tools",
  description: "Learn the JSON data format by examining and understanding responses from real-world APIs.",
};

const userProfileCodeExample = `// Assuming 'userProfile' is the parsed object in JavaScript/TypeScript
const street = userProfile.profile.address.street; // "101 Binary Lane"
const firstInterest = userProfile.profile.interests[0]; // "programming"

// Check if website exists and is not null before accessing
const website = userProfile.profile.website;
if (website !== null) {
  console.log(\`User website: \${website}\`);
} else {
  console.log("User has no website listed.");
}

// Iterate through roles
userProfile.roles.forEach(role => {
  console.log(\`Role: \${role.name}, Level: \${role.level}\`);
});

// Output:
// Role: admin, Level: 5
// Role: editor, Level: 3
`;

const weatherExampleJson = `{
  "location": {
    "name": "New York",
    "region": "NY",
    "country": "USA",
    "lat": 40.71,
    "lon": -74.01,
    "tz_id": "America/New_York",
    "localtime_epoch": 1678886400,
    "localtime": "2023-03-15 10:00"
  },
  "current": {
    "temp_c": 10.0,
    "temp_f": 50.0,
    "is_day": 1,
    "condition": {
      "text": "Partly cloudy",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
      "code": 1003
    },
    "wind_mph": 6.9,
    "wind_kph": 11.2,
    "pressure_mb": 1015.0,
    "humidity": 60,
    "cloud": 25,
    "feelslike_c": 8.5,
    "feelslike_f": 47.3,
    "uv": 4.0
  }
}`;

const weatherCodeExample = `// Assuming 'responseJson' is the parsed object in JavaScript/TypeScript
const locationName = responseJson.location.name; // "New York"
const currentTempCelsius = responseJson.current.temp_c; // 10.0
const weatherDescription = responseJson.current.condition.text; // "Partly cloudy"
const isDay = responseJson.current.is_day === 1; // true/false (depending on interpretation)`;

const todoExampleJson = `[
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": true
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  }
]`;

const todoCodeExample = `// Assuming 'todosArray' is the parsed array in JavaScript/TypeScript
todosArray.forEach(todo => {
  console.log(\`To-do ID: \${todo.id}\`);
  console.log(\`Title: \${todo.title}\`);
  console.log(\`Completed: \${todo.completed}\`);
});

// Output:
// To-do ID: 1
// Title: delectus aut autem
// Completed: false
// ... and so on for each item
`;

const userProfileExampleJson = `{
  "id": "user123",
  "username": "coding_guru",
  "email": "guru@example.com",
  "isActive": true,
  "profile": {
    "firstName": "Codey",
    "lastName": "McCoder",
    "age": 42,
    "address": {
      "street": "101 Binary Lane",
      "city": "Techville",
      "zipCode": "98765",
      "country": "USA"
    },
    "interests": ["programming", "API design", "JSON", "opensource"],
    "website": null
  },
  "roles": [
    {"name": "admin", "level": 5},
    {"name": "editor", "level": 3}
  ],
  "lastLogin": "2023-10-27T10:30:00Z"
}`;

const workingWithJsonCodeExample = `// Parsing a JSON string into a JavaScript object/array
const jsonString = '[{"name": "Test", "value": true}]';
const parsedData = JSON.parse(jsonString); // parsedData is now a JavaScript array
console.log(parsedData[0].name); // "Test"

// Stringifying a JavaScript object/array into a JSON string
const jsObject = { id: 1, data: [1, 2, 3] };
const jsonOutputString = JSON.stringify(jsObject); // jsonOutputString is now '{"id":1,"data":[1,2,3]}'
console.log(jsonOutputString);`;

export default function JsonApiExamplesArticle() {
  return (
    <div className="container mx-auto px-4 py-8 prose prose-lg dark:prose-invert">
      <h1 className="text-4xl font-bold mb-6">Teaching JSON Through Real-World API Examples</h1>

      <p>
        JSON (JavaScript Object Notation) is the ubiquitous data format for exchanging information on the web. Whether
        you&apos;re fetching data from a server, sending data to an API, or storing configuration, you&apos;ll encounter
        JSON. While understanding its basic syntax is essential, the best way to truly grasp JSON and how to work with
        it is by looking at real-world examples straight from APIs.
      </p>
      <p>
        This article will guide you through understanding JSON structures by dissecting responses from hypothetical, but
        representative, API endpoints. By seeing JSON in context, you&apos;ll learn how to read it, understand its
        components, and anticipate how to handle it in your code.
      </p>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <Code className="inline-block mr-2" /> What is JSON? (A Quick Recap)
      </h2>
      <p>
        At its core, JSON is a lightweight text format for storing and transporting data. It&apos;s based on a subset of
        the JavaScript programming language&apos;s object syntax, but it&apos;s language-independent, meaning you can
        use and parse JSON in virtually any programming language.
      </p>
      <p>JSON is built on two structures:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          A collection of name/value pairs. In various languages, this is realized as an object, record, struct,
          dictionary, hash table, keyed list, or associative array. In JSON, this is an <strong>Object</strong>.
        </li>
        <li>
          An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence. In
          JSON, this is an <strong>Array</strong>.
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-6 mb-3">JSON Values (The building blocks):</h3>
      <p>A JSON value can be one of the following data types:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Object:</strong> An unordered collection of key-value pairs. Starts with <code>&#x7b;</code>, ends
          with <code>&#x7d;</code>. Keys are strings enclosed in double quotes. Values can be any JSON value. Example:{" "}
          <code>&#x7b;&quot;name&quot;: &quot;Alice&quot;, &quot;age&quot;: 30&#x7d;</code>
        </li>
        <li>
          <strong>Array:</strong> An ordered collection of values. Starts with <code>[</code>, ends with <code>]</code>.
          Values are separated by commas and can be any JSON value. Example:{" "}
          <code>[&quot;apple&quot;, &quot;banana&quot;, &quot;cherry&quot;]</code>
        </li>
        <li>
          <strong>String:</strong> A sequence of zero or more Unicode characters, wrapped in double quotes. Example:{" "}
          <code>&quot;hello world&quot;</code>
        </li>
        <li>
          <strong>Number:</strong> An integer or a floating-point number. Example: <code>123</code>, <code>-4.5</code>,{" "}
          <code>1.2e5</code>
        </li>
        <li>
          <strong>Boolean:</strong> Either <code>true</code> or <code>false</code>.
        </li>
        <li>
          <strong>null:</strong> An empty value. Represented as <code>null</code>.
        </li>
      </ul>
      <p>
        Crucially, keys in JSON objects <em>must</em> be strings and must be enclosed in double quotes. Trailing commas
        after the last element in an object or array are not allowed in strict JSON.
      </p>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <Globe className="inline-block mr-2" /> Example 1: Simple Data - A Weather Forecast
      </h2>
      <p>
        Imagine you&apos;re building an application that needs to display the current weather. You might call a weather
        API. A typical response for a single location might look something like this:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{weatherExampleJson}</pre>
      </div>
      <p>Let&apos;s break this down:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          The outermost structure is a JSON <strong>Object</strong> (<code>&#x7b;...&#x7d;</code>). This is very common
          for API responses that represent a single entity or a collection of related data points.
        </li>
        <li>
          Inside the main object, we have two key-value pairs: <code>&quot;location&quot;</code> and{" "}
          <code>&quot;current&quot;</code>. Both keys are strings.
        </li>
        <li>
          The values associated with <code>&quot;location&quot;</code> and <code>&quot;current&quot;</code> are
          themselves nested <strong>Objects</strong>. This shows how JSON can represent hierarchical data.
        </li>
        <li>
          Inside the <code>&quot;location&quot;</code> object, we see various key-value pairs. Keys like{" "}
          <code>&quot;name&quot;</code>, <code>&quot;region&quot;</code>, <code>&quot;country&quot;</code>,{" "}
          <code>&quot;tz_id&quot;</code>, and <code>&quot;localtime&quot;</code> have <strong>String</strong> values.
          Keys like <code>&quot;lat&quot;</code>, <code>&quot;lon&quot;</code>, and{" "}
          <code>&quot;localtime_epoch&quot;</code> have <strong>Number</strong> values.
        </li>
        <li>
          Inside the <code>&quot;current&quot;</code> object, we see more key-value pairs with <strong>Number</strong>{" "}
          values (<code>&quot;temp_c&quot;</code>, <code>&quot;temp_f&quot;</code>, <code>&quot;wind_mph&quot;</code>,
          etc.). The key <code>&quot;is_day&quot;</code> has a number value (<code>1</code>), which likely represents a
          boolean (1 for true, 0 for false), though JSON natively supports <code>true</code>/<code>false</code>.
        </li>
        <li>
          Notice the <code>&quot;condition&quot;</code> key inside <code>&quot;current&quot;</code>. Its value is yet
          another nested <strong>Object</strong>, containing a <strong>String</strong> (<code>&quot;text&quot;</code>),
          another <strong>String</strong> (<code>&quot;icon&quot;</code>), and a <strong>Number</strong> (
          <code>&quot;code&quot;</code>).
        </li>
      </ul>
      <p>
        <strong>In your code (conceptual):</strong> If you received this JSON, you would parse it into a data structure
        native to your language (e.g., a dictionary/object in Python/JavaScript, a map in Go, a class instance in
        Java/C#). You would then access the data using the keys:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{weatherCodeExample}</pre>
      </div>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <List className="inline-block mr-2" /> Example 2: Lists of Data - A To-Do List API
      </h2>
      <p>
        Often, APIs return lists or collections of items. A common structure for this is a JSON Array containing
        multiple JSON Objects. Consider a simple To-Do list API response:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{todoExampleJson}</pre>
      </div>
      <p>Analysis:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          The outermost structure is a JSON <strong>Array</strong> (<code>[... ]</code>). This immediately tells you
          that the response is a list of items.
        </li>
        <li>
          Each item within the array is a JSON <strong>Object</strong>. In this case, each object represents a single
          to-do item.
        </li>
        <li>
          Each to-do object has keys like <code>&quot;userId&quot;</code> (<strong>Number</strong>),{" "}
          <code>&quot;id&quot;</code> (<strong>Number</strong>),
          <code>&quot;title&quot;</code> (<strong>String</strong>), and <code>&quot;completed&quot;</code> (
          <strong>Boolean</strong>).
        </li>
        <li>
          All objects in the array seem to follow the same structure, which is typical but not strictly required by
          JSON.
        </li>
      </ul>
      <p>
        <strong>In your code (conceptual):</strong> You would parse the JSON into a list or array of objects native to
        your language. You would then loop through the array to process each item.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{todoCodeExample}</pre>
      </div>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <User className="inline-block mr-2" /> Example 3: Complex/Nested Data - A User Profile
      </h2>
      <p>
        Real-world data can be quite complex, involving multiple levels of nesting, lists within objects, objects within
        lists, and potentially <code>null</code> values. A user profile API might return something like this:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{userProfileExampleJson}</pre>
      </div>
      <p>Detailed breakdown:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Again, the top level is an <strong>Object</strong>.
        </li>
        <li>
          Primitive values: <code>&quot;id&quot;</code>, <code>&quot;username&quot;</code>,{" "}
          <code>&quot;email&quot;</code>, <code>&quot;lastLogin&quot;</code>
          are <strong>String</strong>s. <code>&quot;isActive&quot;</code> is a <strong>Boolean</strong>.
        </li>
        <li>
          The <code>&quot;profile&quot;</code> key has a nested <strong>Object</strong> as its value.
        </li>
        <li>
          Inside the <code>&quot;profile&quot;</code> object:
          <ul className="list-circle pl-6">
            <li>
              <code>&quot;firstName&quot;</code>, <code>&quot;lastName&quot;</code> are <strong>String</strong>s.
            </li>
            <li>
              <code>&quot;age&quot;</code> is a <strong>Number</strong>.
            </li>
            <li>
              <code>&quot;address&quot;</code> is another nested <strong>Object</strong> containing{" "}
              <strong>String</strong> values.
            </li>
            <li>
              <code>&quot;interests&quot;</code> is an <strong>Array</strong>. The values within this array are all{" "}
              <strong>String</strong>s. An array can contain values of different types, but it&apos;s common for items
              in a list to be of the same type or structure.
            </li>
            <li>
              <code>&quot;website&quot;</code> is <code>null</code>. This indicates the absence of a value. It&apos;s
              different from an empty string (<code>&quot;&quot;</code>) or zero (<code>0</code>) or a boolean{" "}
              <code>false</code>. You must explicitly check for <code>null</code> in your code.
            </li>
          </ul>
        </li>
        <li>
          The <code>&quot;roles&quot;</code> key has an <strong>Array</strong> as its value. This array contains two{" "}
          <strong>Objects</strong>. Each object within the <code>&quot;roles&quot;</code> array has a{" "}
          <code>&quot;name&quot;</code> (<strong>String</strong>) and a <code>&quot;level&quot;</code> (
          <strong>Number</strong>).
        </li>
      </ul>
      <p>
        <strong>In your code (conceptual):</strong> Accessing deeply nested values requires chaining property access.
        Iterating through lists requires loops. You also need to handle potential <code>null</code> values or missing
        keys gracefully.
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{userProfileCodeExample}</pre>
      </div>
      <p>
        This example demonstrates the power and flexibility of JSON to represent complex, interconnected data
        structures. Understanding the nesting of Objects and Arrays is key.
      </p>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <Box className="inline-block mr-2" /> Common JSON Pitfalls
      </h2>
      <p>While simple, JSON has strict rules. Common mistakes include:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Trailing Commas:</strong> JSON does NOT allow a comma after the last element in an array or the last
          key-value pair in an object.
          <div className="bg-red-100 p-3 rounded dark:bg-red-900 my-2 overflow-x-auto">
            <p className="font-semibold">Incorrect:</p>
            <pre className="text-sm">{`{ "item": 123, }`}</pre>
            <pre className="text-sm">{`[ "a", "b", ]`}</pre>
          </div>
        </li>
        <li>
          <strong>Unquoted Keys:</strong> Keys in an object MUST be strings enclosed in double quotes.
          <div className="bg-red-100 p-3 rounded dark:bg-red-900 my-2 overflow-x-auto">
            <p className="font-semibold">Incorrect:</p>
            <pre className="text-sm">{`{ item: 123 }`}</pre>
          </div>
        </li>
        <li>
          <strong>Single Quotes:</strong> Both keys and string values MUST use double quotes, not single quotes.
          <div className="bg-red-100 p-3 rounded dark:bg-red-900 my-2 overflow-x-auto">
            <p className="font-semibold">Incorrect:</p>
            <pre className="text-sm">{`{ 'item': '123' }`}</pre>
          </div>
        </li>
        <li>
          <strong>Comments:</strong> Standard JSON does NOT support comments (<code>&sol;&sol;</code> or{" "}
          <code>&sol;* ... *&sol;</code>). Including them will cause parsing errors.
        </li>
      </ul>
      <p>Using a JSON validator (many are available online) can help you catch these syntax errors quickly.</p>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <Cloud className="inline-block mr-2" /> Working with JSON in Your Code
      </h2>
      <p>
        Modern programming languages and web browsers have built-in functions to parse (decode) JSON strings into native
        data structures and stringify (encode) native data structures into JSON strings.
      </p>
      <p>
        In JavaScript/TypeScript, the global <code>JSON</code> object is used:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
        <pre>{workingWithJsonCodeExample}</pre>
      </div>
      <p>
        Most libraries for making API calls (like <code>fetch</code> in browsers/Node.js, Axios, etc.) automatically
        handle JSON parsing for you if the server response has the correct <code>Content-Type: application/json</code>{" "}
        header. You typically just need to access a <code>.json()</code> method on the response object.
      </p>

      <h2 className="text-3xl font-semibold mt-8 mb-4">
        <Code className="inline-block mr-2" /> Conclusion
      </h2>
      <p>
        Learning JSON is fundamental for modern web development. By examining real-world API responses, you gain
        practical experience in recognizing the core JSON structures (objects, arrays) and the various data types
        (strings, numbers, booleans, null). Understanding how data is organized in nested structures prepares you to
        effectively retrieve, process, and display information from the vast ecosystem of APIs available today. Keep
        practicing by exploring different API responses – the principles remain the same!
      </p>
    </div>
  );
}
