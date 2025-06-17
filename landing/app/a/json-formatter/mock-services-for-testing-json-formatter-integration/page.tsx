import type { Metadata } from "next";
import {
  Plug,
  Network,
  CheckCircle,
  XCircle,
  BookOpenText,
  FlaskConical,
  ArrowRight,
  Layers,
  Server,
  Laptop,
  MousePointerClick,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mock Services for Testing JSON Formatter Integration | Offline Tools",
  description:
    "Learn how to use mock services to effectively test JSON formatter integrations with external APIs and dependencies.",
};

export default function MockServicesJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FlaskConical size={32} /> Mock Services for Testing JSON Formatter Integration
      </h1>

      <div className="space-y-6">
        <p>
          Integrating a <span className="font-medium">JSON formatter</span> into a larger application often involves
          fetching JSON data from external sources like APIs, databases, or files. Ensuring that your formatter behaves
          correctly with various real-world data structures and handling potential issues requires robust testing. This
          is where <span className="font-medium">mock services</span> become invaluable.
        </p>
        <p>
          This article explores why and how to use mock services to test the integration points of your JSON formatter,
          making your testing process more reliable, faster, and less dependent on external factors.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Network size={24} /> The Challenge of Testing with Real Dependencies
        </h2>
        <p>
          Imagine your JSON formatter component or function needs to fetch JSON data from a backend API endpoint before
          formatting it. Testing this integration directly with the real API presents several challenges:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Dependency on External Service Availability:</span> If the API is down, slow,
            or returns unexpected errors, your tests will fail, even if your formatter logic is perfectly fine.
          </li>
          <li>
            <span className="font-medium">Speed:</span> Making real network requests adds significant time to your test
            suite execution, slowing down development feedback cycles.
          </li>
          <li>
            <span className="font-medium">Controlling Data:</span> It&apos;s difficult to consistently get specific data
            shapes, sizes, or error responses from a real API, making it hard to test edge cases like malformed JSON,
            deeply nested structures, or large payloads.
          </li>
          <li>
            <span className="font-medium">Cost/Rate Limits:</span> Repeatedly hitting an external API during testing can
            incur costs or trigger rate limits.
          </li>
        </ul>
        <p>
          These issues lead to <span className="font-medium">flaky tests</span> – tests that sometimes pass and
          sometimes fail for reasons unrelated to the code being tested.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Plug size={24} /> Introducing Mock Services
        </h2>
        <p>
          Mock services (or mocks) are controlled substitutes for external dependencies. Instead of making a real call
          to an API or database, your code interacts with a mock object or service that simulates the behavior of the
          real dependency.
        </p>
        <p>
          For testing a JSON formatter that fetches data, a mock service would intercept the outgoing request (or be
          directly called by your code) and return a predefined JSON response, status code, or error, without ever
          hitting the actual external endpoint.
        </p>

        <h3 className="text-xl font-semibold mt-6">Benefits of Using Mocks:</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span className="font-medium">Isolation:</span> Tests focus solely on your JSON formatter&apos;s logic,
            independent of external service state.
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span className="font-medium">Speed:</span> Mocks respond instantly, dramatically speeding up test
            execution.
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span className="font-medium">Control:</span> You can precisely control the data and responses returned by
            the mock, allowing you to test all possible scenarios, including errors, empty states, and malformed data.
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-1" />
            <span className="font-medium">Reliability:</span> Tests become deterministic and less flaky.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Layers size={24} /> Types of Mock Services for JSON Formatting Tests
        </h2>
        <p>
          There are several ways to implement mock services, depending on your application&apos;s architecture and
          testing framework.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <BookOpenText size={20} /> 1. In-Memory Mocks (Simple Functions/Objects)
        </h3>
        <p>
          The simplest approach is to replace the actual data-fetching logic with a function or object that returns
          predefined data. This is suitable for unit testing components or functions that directly call a data utility.
        </p>
        <p>
          <span className="font-medium">Scenario:</span> Your formatter is a function that takes a promise resolving to
          JSON data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Original Code (Conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// utils/api.ts
export async function fetchJsonData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  return response.json();
}

// components/JsonFormatter.tsx (Conceptual integration)
// This component would use fetchJsonData internally or receive the promise
// Example: async function formatData(url: string) {
//   const data = await fetchJsonData(url);
//   // format data...
// }
`}
            </pre>
          </div>
          <h4 className="text-lg font-medium mt-4 mb-2">Testing with an In-Memory Mock:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { fetchJsonData } from '../utils/api';
import { formatData } from '../components/JsonFormatter'; // Assuming this function exists

// Mock the fetchJsonData function
jest.mock('../utils/api', () => ({
  fetchJsonData: jest.fn(),
}));

const mockedFetchJsonData = fetchJsonData as jest.Mock;

describe('JSON Formatter Integration with In-Memory Mock', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockedFetchJsonData.mockClear();
  });

  it('should format valid fetched JSON data', async () => {
    const mockData = { name: 'Test User', age: 30 };
    // Make the mock function return a Promise that resolves with mockData
    mockedFetchJsonData.mockResolvedValue(mockData);

    // Call the function that uses fetchJsonData
    // Assuming formatData calls fetchJsonData internally
    const formattedOutput = await formatData('http://mockapi.com/user/1');

    // Expect the fetch function to have been called
    expect(mockedFetchJsonData).toHaveBeenCalledWith('http://mockapi.com/user/1');

    // Expect the formatter to produce the correct output based on mockData
    // Replace this with your actual formatter output check
    expect(formattedOutput).toContain('"name": "Test User"');
    expect(formattedOutput).toContain('"age": 30');
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('Failed to fetch user data');
    // Make the mock function return a Promise that rejects with an error
    mockedFetchJsonData.mockRejectedValue(mockError);

    // Call the function that uses fetchJsonData
    // Assuming formatData handles errors
    await expect(formatData('http://mockapi.com/user/error')).rejects.toThrow('Failed to fetch user data');

    expect(mockedFetchJsonData).toHaveBeenCalledWith('http://mockapi.com/user/error');

    // Add checks here if your formatter component renders an error state
  });

  it('should handle empty object response', async () => {
    const mockData = {};
    mockedFetchJsonData.mockResolvedValue(mockData);

    const formattedOutput = await formatData('http://mockapi.com/empty');
    expect(mockedFetchJsonData).toHaveBeenCalledWith('http://mockapi.com/empty');
    // Replace with your actual formatter output check for an empty object
    expect(formattedOutput).toBe('&#x7b;&#x7d;'); // Represents "{}"
  });
});
`}
            </pre>
          </div>
        </div>
        <p>
          This approach is effective for unit tests where you control the specific function being called. It requires
          modifying the test setup to inject or mock the dependency.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Laptop size={20} /> 2. HTTP Request Interception (e.g., `msw`)
        </h3>
        <p>
          Modern web applications often use the browser&apos;s `fetch` API or libraries like `axios` for HTTP requests.{" "}
          <span className="font-medium">Mock Service Worker (msw)</span> is a popular library that intercepts network
          requests at the service worker or Node.js level. This means your application code doesn&apos;t need to know
          it&apos;s being mocked; it makes the regular `fetch` or `axios` call, and `msw` intercepts it before it leaves
          the application context.
        </p>
        <p>
          This is excellent for integration tests where you want to test a component or module that performs HTTP
          requests internally, without changing its code.
        </p>
        <p>
          <span className="font-medium">Scenario:</span> Your React component or Next.js page component fetches data
          using `fetch` or `axios` when it mounts or a button is clicked, and then passes the result to your JSON
          formatter logic.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Using `msw` (Conceptual Setup):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock a GET request to a specific endpoint
  http.get('http://mockapi.com/user/1', () => {
    const mockUserData = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      address: {
        street: '123 Mockingbird Ln',
        city: 'Mockville'
      },
      isActive: true,
      roles: ['user', 'admin'],
      lastLogin: null
    };
    return HttpResponse.json(mockUserData, { status: 200 });
  }),

  // Mock an endpoint that returns complex/nested JSON
  http.get('http://mockapi.com/data/complex', () => {
    const complexData = {
      metadata: { version: 2, source: 'test-mock' },
      items: [
        { id: 'a1', value: 100, tags: ['urgent', 'review'], details: { status: 'pending' } },
        { id: 'b2', value: 200, tags: [], details: { status: 'completed' } },
        { id: 'c3', value: 300, details: { status: 'failed', error: 'timeout' } }
      ],
      config: null,
      timestamp: 1678886400000 // Example number
    };
    return HttpResponse.json(complexData, { status: 200 });
  }),

  // Mock an endpoint that returns malformed JSON (msw will likely throw, good for testing error handling)
  // Or, return a plain text response that is not valid JSON
   http.get('http://mockapi.com/data/malformed', () => {
     return new HttpResponse('{"name": "Invalid JSON", "age": 30,}', { // Trailing comma
       status: 200,
       headers: { 'Content-Type': 'application/json' }, // Still claim it's JSON
     });
   }),

  // Mock an endpoint that returns an API error
  http.get('http://mockapi.com/data/error', () => {
    return HttpResponse.json({ error: 'Resource not found' }, { status: 404 });
  }),

  // Mock an empty array response
  http.get('http://mockapi.com/data/empty-array', () => {
     return HttpResponse.json([], { status: 200 });
  }),

  // Mock an empty object response
   http.get('http://mockapi.com/data/empty-object', () => {
     return HttpResponse.json({}, { status: 200 });
   }),

   // Mock a large JSON response (for performance testing if relevant)
   http.get('http://mockapi.com/data/large', () => {
      const largeData = Array.from({ length: 1000 }).map((_, i) => ({
        id: i,
        name: \`Item \${i}\`,
        value: Math.random() * 1000,
        description: \`This is item number \${i} with some random data.\`,
        nested: { level1: { level2: { level3: 'data' } } },
        tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      }));
      return HttpResponse.json(largeData, { status: 200 });
   }),
];

// src/setupTests.ts (for Jest/Vitest)
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Your test file (e.g., components/JsonFormatter.test.tsx)
// Assuming your component fetches data and passes it to a formatter function/component
describe('JSON Formatter Integration with msw', () => {
  it('should format complex data fetched via HTTP', async () => {
    // Render your component or call the function that triggers the fetch
    // Example (using Jest and a fictional component that fetches):
    // const { findByText } = render(<DataFetchingComponent url="http://mockapi.com/data/complex" />);

    // Wait for the component to fetch and render the formatted data
    // const formattedOutput = await findByText(/metadata.*items/); // Check for some content

    // Alternatively, if testing a function directly:
    async function fetchDataAndFormat(url: string) {
       const response = await fetch(url);
       const data = await response.json();
       // Call your actual formatter function here
       return JSON.stringify(data, null, 2); // Using built-in for example
    }

    const formattedOutput = await fetchDataAndFormat('http://mockapi.com/data/complex');

    // Assert against the expected formatted output for the mock data
    expect(formattedOutput).toContain('"version": 2,');
    expect(formattedOutput).toContain('"status": "pending"');
    expect(formattedOutput).toContain('"timestamp": 1678886400000'); // Number value
  });

  it('should display error state when API returns 404', async () => {
    // Test the scenario where your component handles a 404 API response
    // Assuming your component renders an error message
    // const { findByText } = render(<DataFetchingComponent url="http://mockapi.com/data/error" />);
    // expect(await findByText(/Resource not found/)).toBeInTheDocument();

    // Or, test that your function correctly throws/handles the error
    async function fetchDataAndFormatWithError(url: string) {
        const response = await fetch(url);
        if (!response.ok) {
           throw new Error(\`API Error: \${response.status}\`);
        }
        const data = await response.json();
        return JSON.stringify(data, null, 2);
    }

    await expect(fetchDataAndFormatWithError('http://mockapi.com/data/error')).rejects.toThrow('API Error: 404');
  });

   it('should format an empty array response', async () => {
     async function fetchDataAndFormat(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return JSON.stringify(data, null, 2);
     }
     const formattedOutput = await fetchDataAndFormat('http://mockapi.com/data/empty-array');
     expect(formattedOutput.trim()).toBe('[]');
   });

    it('should format an empty object response', async () => {
     async function fetchDataAndFormat(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return JSON.stringify(data, null, 2);
     }
     const formattedOutput = await fetchDataAndFormat('http://mockapi.com/data/empty-object');
     expect(formattedOutput.trim()).toBe('&#x7b;&#x7d;');
   });
});
`}
            </pre>
          </div>
        </div>
        <p>
          `msw` is powerful because it operates at the network layer, providing a realistic mocking experience without
          altering your application code&apos;s data fetching logic.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Server size={20} /> 3. Dedicated Mock Servers
        </h3>
        <p>
          For larger projects or scenarios requiring more complex mock behaviors (like statefulness, delayed responses,
          or dynamic responses based on request headers/bodies), setting up a dedicated mock server might be beneficial.
          Tools like WireMock, Mockoon, or JSON Server can run as separate processes or Docker containers.
        </p>
        <p>
          <span className="font-medium">Scenario:</span> You are testing a feature that involves multiple API calls or
          requires simulating different server states over time. Your application is configured to point to the mock
          server&apos;s URL during testing.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium mb-2">Example with JSON Server (Conceptual):</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// db.json (your mock data file)
{
  "users": [
    { "id": 1, "name": "JSON Placeholder", "age": 42, "verified": true },
    { "id": 2, "name": "Mock Data", "age": 29, "verified": false }
  ],
  "products": [
    { "id": "abc", "name": "Widget", "price": 10.99, "details": null },
    { "id": "def", "name": "Gadget", "price": 19.99, "details": { "weight": "1kg" } }
  ]
}

// In your terminal, run the mock server
// npx json-server --watch db.json --port 3001

// Your test file
describe('JSON Formatter Integration with Dedicated Mock Server', () => {
  const mockServerUrl = 'http://localhost:3001';

  it('should format user data from the mock server', async () => {
    // Assuming your formatter component/function fetches from this URL
    async function fetchDataAndFormat(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return JSON.stringify(data, null, 2); // Use your actual formatter
    }

    const formattedOutput = await fetchDataAndFormat(\`\${mockServerUrl}/users/1\`);

    expect(formattedOutput).toContain('"id": 1,');
    expect(formattedOutput).toContain('"name": "JSON Placeholder",');
    expect(formattedOutput).toContain('"age": 42,');
    expect(formattedOutput).toContain('"verified": true');
  });

  it('should format product data from the mock server', async () => {
     async function fetchDataAndFormat(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return JSON.stringify(data, null, 2); // Use your actual formatter
    }
    const formattedOutput = await fetchDataAndFormat(\`\${mockServerUrl}/products\`);

    expect(formattedOutput).toContain('[&#x7b;'); // Starts with [{
    expect(formattedOutput).toContain('"name": "Widget",');
    expect(formattedOutput).toContain('"details": null');
    expect(formattedOutput).toContain('"details": {');
    expect(formattedOutput).toContain('"weight": "1kg"');
    expect(formattedOutput).toContain('&#x7d;]'); // Ends with }]
  });
});
`}
            </pre>
          </div>
        </div>
        <p>
          Dedicated mock servers offer high flexibility and realism but add another dependency (the mock server process)
          to your testing environment setup. They are often used for integration or API contract testing alongside
          unit/component testing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <MousePointerClick size={24} /> Designing Mocks for JSON Formatting Tests
        </h2>
        <p>When creating mocks for testing your JSON formatter, consider covering a wide range of JSON scenarios:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Simple objects/arrays:</span> Basic structures.
          </li>
          <li>
            <span className="font-medium">Nested objects/arrays:</span> Test recursion handling.
          </li>
          <li>
            <span className="font-medium">Various data types:</span> Strings, numbers (integers, floats, scientific
            notation), booleans, null.
          </li>
          <li>
            <span className="font-medium">Empty objects (`&#x7b;&#x7d;`) and arrays (`[]`).</span>
          </li>
          <li>
            <span className="font-medium">Objects with special characters in keys/values.</span>
          </li>
          <li>
            <span className="font-medium">Very large JSON payloads:</span> Test performance or memory handling.
          </li>
          <li>
            <span className="font-medium">Malformed JSON:</span> Test error handling and parsing resilience. (e.g.,
            trailing commas, missing quotes, incorrect escape sequences).
          </li>
          <li>
            <span className="font-medium">Non-JSON responses:</span> Test how your code handles receiving HTML or plain
            text when JSON is expected.
          </li>
          <li>
            <span className="font-medium">Different HTTP status codes:</span> 200 OK, 404 Not Found, 500 Internal Server
            Error, etc., and how your code responds before attempting to parse the body as JSON.
          </li>
          <li>
            <span className="font-medium">Responses with different `Content-Type` headers.</span>
          </li>
        </ul>
        <p>
          By providing mocks for these varied scenarios, you can ensure your JSON formatter integration is robust and
          handles real-world data and API behaviors gracefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ArrowRight size={24} /> Mocks vs. Stubs vs. Spies
        </h2>
        <p>
          While often used interchangeably in a general sense, it&apos;s worth noting the specific testing concepts:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Stub:</span> A test double that provides canned answers to calls made during
            the test. It doesn&apos;t verify interaction. (e.g., providing a static JSON response).
          </li>
          <li>
            <span className="font-medium">Spy:</span> A test double that wraps a real object/function and logs
            interactions (like calls made, arguments received). It&apos;s used to verify interaction. (e.g., checking if
            `fetchJsonData` was called with the correct URL).
          </li>
          <li>
            <span className="font-medium">Mock:</span> A test double that, like a stub, provides canned answers, but
            also verifies expectations about the calls made to it during the test. (e.g., expecting
            `mockedFetchJsonData` to be called exactly once with a specific URL, and throwing an error if it
            wasn&apos;t).
          </li>
        </ul>
        <p>
          In the context of mock services for API integration, you are often using objects or tools that combine
          stubbing (providing fake responses) and mocking (allowing verification of requests made to the mock endpoint).
          Libraries like `msw` allow for both.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <XCircle size={24} /> When Mocks Are Not Enough
        </h2>
        <p>
          While mocks are excellent for isolating and speeding up tests, they replace the real dependency. They
          don&apos;t verify that your understanding of the API contract is correct or that the network infrastructure
          between your application and the real API works.
        </p>
        <p>
          For this, you still need <span className="font-medium">end-to-end tests</span> or{" "}
          <span className="font-medium">integration tests</span> that use the actual external dependencies. These tests
          are slower and more brittle but are crucial for confidence in the final deployed application. Mocks complement
          these tests; they don&apos;t entirely replace them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <BookOpenText size={24} /> Conclusion
        </h2>
        <p>
          Using mock services is a fundamental strategy for building robust and maintainable tests for any code that
          interacts with external dependencies, including JSON formatters that fetch data. By controlling the input data
          and simulated network conditions, you can test your formatter&apos;s logic exhaustively, leading to higher
          confidence in its correctness and resilience. Choose the mocking strategy (in-memory, HTTP interception, or
          dedicated server) that best fits your project&apos;s complexity and testing goals.
        </p>
      </div>
    </>
  );
}
