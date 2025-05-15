import type { Metadata } from "next";
import {
  Zap,
  Code,
  LayoutList,
  Bug,
  FileWarning,
  Bolt,
  ClipboardList,
  TextQuote,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integrating JSON Formatters with AWS Lambda Functions | Offline Tools",
  description:
    "Learn how to effectively format JSON data within AWS Lambda functions for improved readability, debugging, and logging.",
};

export default function LambdaJsonFormattingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Zap className="inline-block w-8 h-8 mr-3 text-blue-600" />
        Integrating JSON Formatters with AWS Lambda Functions
      </h1>

      <div className="space-y-6">
        <p>
          AWS Lambda functions are a popular choice for building serverless backends and microservices. They often process and return data in JSON format. While JavaScript (and TypeScript) natively handle JSON parsing and serialization, effectively formatting JSON within your Lambda code can significantly improve development experience, debugging, and logging clarity.
        </p>
        <p>
          This article explores why JSON formatting is important in the Lambda context and how to implement it using built-in capabilities and considering potential third-party options.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <LayoutList className="inline-block w-6 h-6 mr-2 text-green-600" />
          Why Format JSON in Lambda?
        </h2>
        <p>
          When dealing with API responses, internal data structures, or logs within a Lambda function, raw, unformatted JSON can be difficult to read. Formatting adds whitespace (indentation, line breaks) that makes the structure clear, especially for complex or deeply nested objects.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Improved Readability:</strong> Properly indented JSON is easy for humans to scan and understand the data hierarchy.
          </li>
          <li>
            <strong className="flex items-center">Debugging:</strong>
            <Bug className="inline-block w-5 h-5 mx-1 text-red-600" />
            When inspecting data in logs or during local development, formatted JSON helps quickly identify values and their corresponding keys.
          </li>
          <li>
            <strong className="flex items-center">Logging:</strong>
            <FileWarning className="inline-block w-5 h-5 mx-1 text-yellow-600" />
            Structured logging is crucial in serverless environments. Formatting ensures that the JSON payload within your log messages is easily consumable by logging systems (like CloudWatch Logs Insights) and readable for manual inspection.
          </li>
          <li>
            <strong>Consistency:</strong> Applying a consistent formatting style across your functions makes codebases easier to maintain.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Code className="inline-block w-6 h-6 mr-2 text-purple-600" />
          Built-in Formatting with `JSON.stringify()`
        </h2>
        <p>
          The native JavaScript `JSON` object provides the `stringify()` method, which is the primary tool for converting JavaScript objects or values into a JSON string. While its basic usage `JSON.stringify(object)` produces a compact string without extra whitespace, the method accepts optional arguments for formatting:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center">
            <ChevronRight className="inline-block w-5 h-5 mr-1" /> Method Signature:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`JSON.stringify(value[, replacer[, space]])`}
            </pre>
          </div>
          <h3 className="text-lg font-medium mt-4 flex items-center">
            <ChevronRight className="inline-block w-5 h-5 mr-1" /> Key Argument: `space`
          </h3>
          <p className="mt-2">
            The third argument, `space`, controls indentation.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              If `space` is a number, it indicates the number of space characters to use for indentation (up to 10).
            </li>
            <li>
              If `space` is a string, it uses that string for indentation (e.g., `'\t'` for tabs).
            </li>
            <li>
              If omitted or `null`, no extra whitespace is added.
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <ClipboardList className="inline-block w-5 h-5 mr-2 text-blue-500" /> Examples using `space`
        </h3>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example 1: Basic `stringify` (compact)</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const data = {
  name: "Alice",
  age: 30,
  isStudent: false,
  courses: ["Math", "Science"],
  address: {
    street: "123 Lambda Ln",
    city: "Serverless City"
  }
};

const compactJson = JSON.stringify(data);
// Output: {"name":"Alice","age":30,"isStudent":false,"courses":["Math","Science"],"address":{"street":"123 Lambda Ln","city":"Serverless City"}}`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example 2: `stringify` with 2 spaces indentation</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const data = {
  name: "Alice",
  age: 30,
  isStudent: false,
  courses: ["Math", "Science"],
  address: {
    street: "123 Lambda Ln",
    city: "Serverless City"
  }
};

const formattedJson2Spaces = JSON.stringify(data, null, 2);
// Output:
// {
//   "name": "Alice",
//   "age": 30,
//   "isStudent": false,
//   "courses": [
//     "Math",
//     "Science"
//   ],
//   "address": {
//     "street": "123 Lambda Ln",
//     "city": "Serverless City"
//   }
// }`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example 3: `stringify` with tab indentation</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const data = {
  name: "Alice",
  age: 30,
  isStudent: false,
  courses: ["Math", "Science"],
  address: {
    street: "123 Lambda Ln",
    city: "Serverless City"
  }
};

const formattedJsonTabs = JSON.stringify(data, null, '\\t');
// Output:
// {
// \t"name": "Alice",
// \t"age": 30,
// \t"isStudent": false,
// \t"courses": [
// \t\t"Math",
// \t\t"Science"
// \t],
// \t"address": {
// \t\t"street": "123 Lambda Ln",
// \t\t"city": "Serverless City"
// \t}
// }`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <TextQuote className="inline-block w-6 h-6 mr-2 text-orange-600" />
          Formatting for Logging
        </h2>
        <p>
          Formatting JSON is particularly useful when logging structured data. Instead of just logging a complex object directly (which CloudWatch sometimes displays poorly or truncates), stringifying it with indentation makes the log entry much more readable.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Example: Logging formatted JSON in a Lambda Handler</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    // Simulate some processing
    const responseBody = {
      message: "Hello from Lambda!",
      input: event.body ? JSON.parse(event.body) : null,
      timestamp: new Date().toISOString(),
      details: {
        requestId: event.requestContext.requestId,
        path: event.path,
        method: event.httpMethod,
      }
    };

    // Log the response body before sending
    console.log('Response body:', JSON.stringify(responseBody, null, 2));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBody), // Often API responses are compact
    };
  } catch (error) {
    console.error('Error processing request:', JSON.stringify(error, null, 2));

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: 'Internal Server Error', error: (error as Error).message }),
    };
  }
};`}
            </pre>
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            Note how `JSON.stringify(..., null, 2)` is used specifically for `console.log` to make the output readable in logs. The final response body sent back to the client is often kept compact (`JSON.stringify(responseBody)`) to minimize payload size and transfer time.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bolt className="inline-block w-6 h-6 mr-2 text-yellow-500" />
          Performance Considerations
        </h2>
        <p>
          While simple indentation using `JSON.stringify` is generally efficient for typical Lambda payloads, formatting large JSON objects can add noticeable overhead in terms of CPU time.
        </p>
        <p>
          For extremely performance-sensitive hot paths dealing with massive JSON structures, you might consider:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Only format when needed:</strong> Only format JSON for logging or debugging purposes, not for the final API response payload unless specifically required by the client.
          </li>
          <li>
            <strong>Limit verbosity:</strong> Use a smaller indentation (`2` spaces instead of `4`) or stick to compact formatting for logs if performance becomes an issue with large log payloads.
          </li>
          <li>
            <strong>Sampling:</strong> In high-throughput scenarios, consider only logging the full formatted payload for a sample of requests.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="inline-block w-6 h-6 mr-2 text-red-500" />
          Advanced Formatting & Third-Party Libraries
        </h2>
        <p>
          The built-in `JSON.stringify` is sufficient for basic indentation. However, you might encounter needs for more advanced formatting, such as:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Sorting keys alphabetically for consistent output.</li>
          <li>Controlling line breaks more granularly (e.g., keeping short arrays/objects on a single line).</li>
          <li>Filtering or transforming data during serialization (using the `replacer` argument of `JSON.stringify` or a library).</li>
        </ul>
        <p>
          For such requirements, you could leverage third-party libraries available in the npm ecosystem (for Node.js/TypeScript Lambda functions). Examples might include libraries focused on specific formatting styles or data manipulation during serialization.
        </p>
        <p className="italic text-sm text-gray-600 dark:text-gray-400">
          Note: While third-party libraries offer more features, they add to your Lambda package size and cold start time. Evaluate if the added functionality is worth the overhead. For most standard formatting needs, `JSON.stringify` is adequate.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <ChevronDown className="inline-block w-6 h-6 mr-2 text-indigo-600" />
          Conclusion
        </h2>
        <p>
          Integrating JSON formatting into your AWS Lambda functions, particularly for logging and debugging, is a simple yet effective practice that greatly enhances the developer experience. The native `JSON.stringify()` method with its `space` argument provides an easy and efficient way to achieve readable, indented JSON output. While third-party libraries exist for more complex scenarios, the built-in method is often sufficient and avoids adding extra dependencies to your serverless functions. Prioritize readability in your development and logging workflows, while being mindful of performance impacts for production API responses.
        </p>
      </div>
    </>
  );
}