import type { Metadata } from "next";
import {
  Network, // Changed from Api to Network
  Code,
  FileJson,
  ArrowRight,
  Shield,
  Gauge,
  Key,
  Lock,
  MessageSquare,
  Users,
  RefreshCw,
  ExternalLink,
  ListOrdered,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Social Media API Integration & JSON Formatters | Development Guide",
  description:
    "A comprehensive guide for developers on integrating with Social Media APIs, understanding JSON data formats, authentication, rate limiting, and data handling.",
};

export default function SocialMediaApiGuide() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Network className="w-8 h-8" /> Social Media API Integration & JSON Formatters
      </h1>

      <div className="space-y-6">
        <p>
          Integrating with social media APIs is a common requirement in modern web development. It allows applications to interact with social platforms – whether it&apos;s fetching user data, posting content, analyzing trends, or enabling social logins. This guide explores the key aspects of social media API integration and the crucial role of JSON as the standard data exchange format.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ArrowRight className="w-6 h-6" /> Understanding Social Media APIs
        </h2>
        <p>
          Social Media APIs provide programmatic access to platform functionalities. They typically follow the <a href="https://restfulapi.net/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">RESTful architecture</a>, using standard HTTP methods (GET, POST, PUT, DELETE) to interact with resources (like users, posts, comments).
        </p>
        <p>
          When you make a request to a social media API endpoint, you typically receive a response back, most commonly in the <a href="https://www.json.org/json-en.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">JSON (JavaScript Object Notation)</a> format. Understanding the structure of this JSON response is fundamental to extracting and utilizing the data.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ListOrdered className="w-5 h-5" /> Key Concepts in API Integration
        </h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Key className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Authentication & Authorization:</strong> Most social media APIs require you to authenticate your application and obtain permission (authorization) from the user on whose behalf you are acting.
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                This often involves protocols like <a href="https://oauth.net/2/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">OAuth 2.0</a>, where you obtain access tokens that grant your application specific permissions (scopes) to access user data or perform actions. API keys or secrets might also be used for application identification.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Gauge className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Rate Limiting:</strong> APIs typically have limits on how many requests an application can make within a certain time frame (e.g., per minute, per hour, per day).
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Exceeding these limits can result in temporary blocks or errors. Proper error handling and retry mechanisms are crucial. API responses often include headers detailing your current rate limit status.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Shield className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Permissions/Scopes:</strong> When a user authorizes your application, they grant specific permissions (scopes).
              <p className="mt-1 text-sm text-gray-600 dark:text-blue-300">
                These scopes dictate what data your application can access (e.g., public profile, email address, posts you&apos;ve liked) or what actions it can perform (e.g., post on your behalf). Always request the minimum necessary permissions.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <RefreshCw className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Pagination:</strong> When retrieving lists of resources (like a user&apos;s posts or followers), APIs often return data in chunks (pages).
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                You&apos;ll typically need to make multiple requests, following links or using parameters provided in the response (like cursor IDs or page numbers), to fetch the complete list.
              </p>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <FileJson className="w-6 h-6" /> JSON: The Universal Language of APIs
        </h2>
        <p>
          JSON is the de facto standard for data exchange over the web, including social media APIs. Its human-readable structure and lightweight nature make it ideal for sending and receiving data between servers and applications.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <Code className="w-5 h-5" /> JSON Structure Basics
        </h3>
        <p>JSON is built on two structures:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            An <strong>Object</strong> (<code>&#x7b; &#x7d;</code>): A collection of key/value pairs. Keys are strings, and values can be a primitive data type or another JSON structure.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 text-sm overflow-x-auto">
              <pre>
                {`{
  "name": "Alice",
  "age": 30,
  "isStudent": false
}`}
              </pre>
            </div>
          </li>
          <li>
            An <strong>Array</strong> (<code>[ ]</code>): An ordered list of values. Values can be of different types.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2 text-sm overflow-x-auto">
              <pre>
                {`[
  "Math",
  "Science",
  "History"
]`}
              </pre>
            </div>
          </li>
        </ul>
        <p>Values can be:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>A String (<code>&quot;hello&quot;</code>)</li>
          <li>A Number (<code>123</code>, <code>-4.5</code>)</li>
          <li>A Boolean (<code>true</code>, <code>false</code>)</li>
          <li><code>null</code></li>
          <li>A JSON Object (<code>&#x7b; &#x7d;</code>)</li>
          <li>A JSON Array (<code>[ ]</code>)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <ExternalLink className="w-5 h-5" /> Example: Fetching User Profile (Conceptual)
        </h3>
        <p>
          Imagine you make a GET request to an endpoint like <code>/users/me</code> with proper authentication. The API might respond with JSON data representing the user&apos;s profile:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm overflow-x-auto">
          <pre>
            {`{
  "id": "user123",
  "username": "developer_dev",
  "displayName": "Developer Guide User",
  "profileImageUrl": "https://example.com/avatars/user123.jpg",
  "followerCount": 1500,
  "followingCount": 250,
  "bio": "Learning about APIs and JSON formatters!",
  "isVerified": false,
  "recentPosts": [
    {
      "id": "post456",
      "text": "Just integrated the social media API!",
      "createdAt": "2023-10-27T10:00:00Z",
      "likes": 50,
      "comments": 5
    },
    {
      "id": "post789",
      "text": "JSON formatting is key!",
      "createdAt": "2023-10-26T15:30:00Z",
      "likes": 30,
      "comments": 2
    }
  ]
}`}
          </pre>
        </div>
        <p>
          This JSON object contains nested structures – the <code>recentPosts</code> field is an array of objects, each representing a post.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" /> Example: Posting a Message (Conceptual)
        </h3>
        <p>
          To post a message, you might send a POST request to an endpoint like <code>/posts</code> with a request body containing the message data, also in JSON format:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 text-sm overflow-x-auto">
          <pre>
            {`{
  "text": "This is my new post sent via the API!",
  "visibility": "public",
  "mediaIds": [] // Optional: IDs of uploaded media
}`}
          </pre>
        </div>
        <p>
          The API would then typically respond with the details of the newly created post, again as a JSON object.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Code className="w-6 h-6" /> JSON Formatters and Data Handling
        </h2>
        <p>
          While JSON formatters often refer to online tools that prettify or validate JSON strings, in the context of API integration, &quot;formatting&quot; involves several aspects:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Code className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Parsing Incoming JSON:</strong> When you receive a JSON string response from an API, you need to parse it into native data structures your programming language understands (like JavaScript objects/arrays). Most languages and frameworks have built-in JSON parsing capabilities (e.g., <code>JSON.parse()</code> in JavaScript/TypeScript).
            </div>
          </li>
          <li className="flex items-start gap-2">
            <FileJson className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Serializing Outgoing Data to JSON:</strong> When sending data to an API (e.g., the body of a POST request), you need to convert your native data structures into a JSON string (e.g., <code>JSON.stringify()</code> in JavaScript/TypeScript).
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Users className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Understanding API-Specific JSON Structure:</strong> Every API has its own specific structure for JSON responses and requests. You must consult the API documentation thoroughly to understand the expected keys, data types, and nested structures. Fields might be required or optional, and their presence or format can change between API versions.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Lock className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Handling Variations and Errors:</strong> API responses might vary slightly or include error details in a specific JSON format. Your parsing logic should be robust enough to handle missing optional fields, unexpected values, and API-specific error objects.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <Code className="w-5 h-5 shrink-0 mt-1" />
            <div>
              <strong>Data Transformation:</strong> The JSON structure returned by the API might not exactly match the data structure you need for your application&apos;s internal logic or frontend display. You&apos;ll often need to transform or map the data from the API format to your internal format. This is a common step after parsing the JSON.
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Network className="w-6 h-6" /> Practical Considerations
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>API Documentation is Gold:</strong> Always start with the official documentation for the specific social media API you are integrating with. It contains the definitive guide to endpoints, parameters, request/response formats (JSON structures), authentication methods, and rate limits.
          </li>
          <li>
            <strong>Use HTTP Clients:</strong> Don&apos;t manually craft HTTP requests. Use reliable HTTP client libraries available in your programming language or framework (e.g., <code>fetch</code> API or libraries like <code>axios</code> in JavaScript, although sticking to built-in features might be necessary depending on project constraints). These handle headers, request bodies, and response parsing more conveniently.
          </li>
          <li>
            <strong>Error Handling:</strong> Implement comprehensive error handling for API requests. This includes network errors, authentication failures (401/403), rate limit errors (429), and application-specific API errors indicated within the JSON response body (often with specific error codes and messages).
          </li>
          <li>
            <strong>Keep Secrets Secure:</strong> API keys, secrets, and access tokens must be handled securely. On the server-side (like a Next.js backend), use environment variables. Never expose sensitive keys directly in client-side code.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Integrating with social media APIs is a powerful way to enhance applications, but it requires a solid understanding of web standards, particularly RESTful principles and the JSON data format. Mastering the concepts of authentication, rate limiting, and the specific JSON structures used by the API are key to a successful and robust integration. Treating JSON not just as a string, but as a structured data format that needs careful parsing, validation, and transformation, is essential for building reliable applications that consume external APIs.
        </p>
      </div>
    </>
  );
}
