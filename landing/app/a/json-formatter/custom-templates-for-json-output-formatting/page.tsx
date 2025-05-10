import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Templates for JSON Output Formatting | Offline Tools",
  description:
    "Learn how to use custom templates or transformation methods to tailor JSON output to specific needs, selecting fields, renaming keys, and restructuring data.",
};

export default function CustomJsonTemplatesArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Custom Templates for JSON Output Formatting
      </h1>

      <div className="space-y-6">
        <p>
          JSON is a versatile data format, but sometimes the standard output isn&apos;t exactly what you need.
          Whether you&apos;re consuming an API, processing logs, or preparing data for a specific application,
          you might need to select specific fields, rename keys, flatten nested structures, or apply other
          transformations. This is where custom templates or programmatic formatting come into play, allowing
          you to tailor the JSON output precisely to your requirements.
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Why Customize JSON Output?
        </h2>
        <p>
          Default JSON output from systems, databases, or APIs often includes more information than necessary
          or uses naming conventions that aren&apos;t ideal for your use case. Custom formatting helps you:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Reduce Data Size:</span> Exclude unnecessary fields to minimize
              payload size, improving performance.
            </li>
            <li>
              <span className="font-medium">Simplify Data Structure:</span> Flatten nested objects or arrays to
              make data easier to consume.
            </li>
            <li>
              <span className="font-medium">Harmonize Naming Conventions:</span> Rename keys to match your
              application&apos;s standards (e.g., convert camelCase to snake_case).
            </li>
            <li>
              <span className="font-medium">Select Specific Data:</span> Only output the fields you actually
              need.
            </li>
            <li>
              <span className="font-medium">Enhance Readability:</span> Reorder fields or format specific values
              for clarity.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          Approaches to Custom JSON Formatting
        </h2>
        <p>
          There are several ways to implement custom JSON output formatting, depending on your context:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium">1. Programmatic Transformation (Code)</h3>
            <p className="text-sm">
              Writing custom code (e.g., in JavaScript, Python, Java) to parse the original JSON and build a
              new JSON structure based on your logic. This offers maximum flexibility.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">2. Templating Engines</h3>
            <p className="text-sm">
              Using templating languages designed for data transformation (e.g., JOLT for JSON transformation,
              Handlebars, Jinja for more general text templating that can output JSON). These often involve
              defining a template or specification for the output structure.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">3. Query Languages (e.g., JMESPath, JSONata)</h3>
            <p className="text-sm">
              Specialized query languages for JSON that allow you to select and transform elements using
              expressions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">4. No-Code/Low-Code Tools</h3>
            <p className="text-sm">
              Visual tools or platforms that provide drag-and-drop interfaces or configuration options to
              define JSON transformations without writing code.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">
          Example: Programmatic Transformation in JavaScript
        </h2>
        <p>
          One of the most common and flexible ways is to write a simple script or function that takes the input
          JSON and returns the desired output structure. Below is a JavaScript example demonstrating how to
          select fields, rename keys, and slightly restructure an array of objects.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Input JSON:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`[
  {
    "userId": 101,
    "userName": "Alice",
    "userEmail": "alice@example.com",
    "userProfile": {
      "isActive": true,
      "lastLogin": "2023-10-26T10:00:00Z"
    },
    "tags": ["admin", "editor"]
  },
  {
    "userId": 102,
    "userName": "Bob",
    "userEmail": "bob@example.com",
    "userProfile": {
      "isActive": false,
      "lastLogin": "2023-10-25T15:30:00Z"
    },
    "tags": ["viewer"]
  }
]`}
            </pre>
          </div>

          <h3 className="text-lg font-medium mt-6">JavaScript Transformation Function:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`function transformUserData(inputJson) {
  // Ensure input is an array
  if (!Array.isArray(inputJson)) {
    console.error("Input must be an array");
    return [];
  }

  return inputJson.map(user => {
    // Select and rename fields
    const transformedUser = {
      id: user.userId, // Rename 'userId' to 'id'
      name: user.userName, // Rename 'userName' to 'name'
      email: user.userEmail, // Rename 'userEmail' to 'email'
      status: user.userProfile ? (user.userProfile.isActive ? 'Active' : 'Inactive') : 'Unknown', // Transform boolean to string
      roles: user.tags // Keep 'tags' as 'roles'
    };

    return transformedUser;
  });
}

// Example Usage (assuming inputJson is the array above)
// const transformedData = transformUserData(inputJson);
// console.log(JSON.stringify(transformedData, null, 2));`}
            </pre>
          </div>

          <h3 className="text-lg font-medium mt-6">Output JSON (using the function):</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`[
  {
    "id": 101,
    "name": "Alice",
    "email": "alice@example.com",
    "status": "Active",
    "roles": ["admin", "editor"]
  },
  {
    "id": 102,
    "name": "Bob",
    "email": "bob@example.com",
    "status": "Inactive",
    "roles": ["viewer"]
  }
]`}
            </pre>
          </div>
        </div>

        <p>
          This example demonstrates selecting a subset of fields, renaming keys (`userId` to `id`, `userName`
          to `name`, `userEmail` to `email`), and transforming a boolean value (`isActive`) into a string
          (`status`).
        </p>

        <h2 className="text-2xl font-semibold mt-8">
          Considerations When Using Custom Templates/Transformations
        </h2>
        <p>
          While custom formatting offers great power, keep these points in mind:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Complexity:</span> Highly complex transformations can make the
              template or code difficult to read and maintain.
            </li>
            <li>
              <span className="font-medium">Performance:</span> For very large JSON files, inefficient
              transformations can impact performance.
            </li>
            <li>
              <span className="font-medium">Error Handling:</span> Robust handling is needed for missing fields
              or unexpected data types in the input.
            </li>
            <li>
              <span className="font-medium">Tooling:</span> Choose an approach (programmatic, templating
              language, query language) that best fits your team&apos;s skills and the complexity of the task.
            </li>
          </ul>
        </div>

        <h2 className="2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Custom templates or programmatic transformations are essential techniques for anyone working extensively
          with JSON data. They empower you to shape the output JSON to precisely match the requirements of your
          consuming application or process. By understanding the available approaches and practicing with examples,
          you can efficiently manage and prepare your JSON data, improving performance, readability, and
          usability.
        </p>
      </div>
    </>
  );
}