import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about API response errors
 */
export const metadata: Metadata = {
  title: "Common API JSON Response Errors and Their Solutions | Offline Tools",
  description: "Learn about common API JSON response errors and effective solutions to handle them in your applications",
};

/**
 * Article page component for JSON formatter article about API response errors
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Common API JSON Response Errors and Their Solutions</h1>

      <div className="space-y-6">
        <p>
          When working with APIs, handling JSON response errors effectively is crucial for building robust applications.
          From malformed responses to unexpected structures, API JSON errors can occur in various forms. This article 
          explores the most common API JSON response errors and provides practical solutions to handle them properly.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Malformed JSON Responses</h2>
        <p>
          One of the most frequent API issues is receiving malformed JSON that fails to parse. This typically happens 
          when the API returns invalid syntax or incomplete data.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Response:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "status": "success",
  "data": {
    "user": {
      "id": 123,
      "name": "John Doe",
      "email": "john@example.com"
    "timestamp": 1626782400
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Implement try-catch when parsing API responses
try {
  const data = JSON.parse(responseText);
  // Process data
} catch (error) {
  console.error("Failed to parse API response:", error);
  // Handle the error appropriately
  // Consider logging the raw response for debugging
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Inconsistent Error Response Structures</h2>
        <p>
          Many APIs use different error formats across various endpoints, making error handling challenging.
          Inconsistencies can appear in field names, nesting levels, or the overall structure.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Inconsistent Error Formats:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// From endpoint A
{
  "error": "User not found"
}

// From endpoint B
{
  "status": "error",
  "message": "Invalid authentication token"
}

// From endpoint C
{
  "errors": [
    {
      "code": "404",
      "detail": "Resource not found"
    }
  ]
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Create a normalized error handler
function normalizeApiError(response) {
  // If response is an error message string
  if (typeof response.error === "string") {
    return { message: response.error, code: "unknown" };
  }
  
  // If response has status and message
  if (response.status === "error" && response.message) {
    return { message: response.message, code: "unknown" };
  }
  
  // If response follows JSON:API format with errors array
  if (Array.isArray(response.errors) && response.errors.length > 0) {
    const error = response.errors[0];
    return { message: error.detail, code: error.code };
  }
  
  // Default fallback
  return { message: "Unknown error occurred", code: "unknown" };
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Unexpected NULL Values</h2>
        <p>
          APIs often return NULL for optional fields, which can cause issues if your code expects values to always be present.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Response:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "user": {
    "id": 456,
    "name": "Jane Smith",
    "address": null,
    "phone": null
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Use the optional chaining operator and default values
const userName = response.user?.name || "Guest";
const userAddress = response.user?.address || "No address provided";

// Or create a function to safely access nested properties
function safeGet(obj, path, defaultValue = "") {
  return path.split('.').reduce((acc, part) => 
    acc && acc[part] !== undefined && acc[part] !== null 
      ? acc[part] 
      : defaultValue
  , obj);
}

// Usage
const phoneNumber = safeGet(response, 'user.phone', 'No phone provided');`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Empty or Missing Arrays</h2>
        <p>
          When an API should return a collection of items but finds none, it might return an empty array, null, or omit the field entirely.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Responses:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Case 1: Empty array
{
  "results": []
}

// Case 2: Null instead of array
{
  "results": null
}

// Case 3: Missing field entirely
{
  "status": "success"
  // "results" field is missing
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Always normalize arrays before processing
function getResultsArray(response) {
  // If results exists and is an array, use it
  if (response.results && Array.isArray(response.results)) {
    return response.results;
  }
  
  // In all other cases, return an empty array
  return [];
}

// Usage
const items = getResultsArray(apiResponse);
items.forEach(item => {
  // Process each item safely
});`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Type Mismatches</h2>
        <p>
          API responses sometimes return data types different from what you expect, such as strings instead of numbers or booleans as strings.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Response:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "user": {
    "id": "789", // String instead of number
    "active": "true", // String instead of boolean
    "score": 85.5 // Number as expected
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Create type-casting functions
function normalizeUserData(userData) {
  return {
    id: Number(userData.id),
    active: String(userData.active).toLowerCase() === "true",
    score: Number(userData.score)
  };
}

// Usage
const normalizedUser = normalizeUserData(response.user);
console.log(typeof normalizedUser.id); // "number"
console.log(typeof normalizedUser.active); // "boolean"`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. HTTP Status Codes Not Matching Response Content</h2>
        <p>
          Some APIs return success status codes (200 OK) even when errors occur, putting the actual error details in the response body.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic Scenario:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// HTTP Status: 200 OK
// Response body:
{
  "success": false,
  "error": "Insufficient permissions to access resource"
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Check response content regardless of HTTP status
async function fetchWithErrorHandling(url) {
  const response = await fetch(url);
  const data = await response.json();
  
  // Check for API-level errors, even with HTTP 200
  if (data.success === false || data.error) {
    throw new Error(data.error || "API returned an error");
  }
  
  return data;
}

// Usage with try/catch
try {
  const data = await fetchWithErrorHandling('/api/resource');
  // Process successful data
} catch (error) {
  // Handle both HTTP errors and API-level errors
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Best Practices for Handling API JSON Errors</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Implement comprehensive error handling:</strong> Always use try-catch blocks when parsing JSON and making API calls.
          </li>
          <li>
            <strong>Normalize responses:</strong> Create utility functions to standardize different error formats from various endpoints.
          </li>
          <li>
            <strong>Validate data types:</strong> Type-check important values and convert them if necessary before using them in your application.
          </li>
          <li>
            <strong>Use default values:</strong> Always have fallbacks for missing or null fields.
          </li>
          <li>
            <strong>Log detailed errors:</strong> Include the raw response when logging API errors to facilitate debugging.
          </li>
          <li>
            <strong>Retry with exponential backoff:</strong> Implement retry mechanisms for transient errors, with increasing delays between attempts.
          </li>
          <li>
            <strong>Provide user-friendly messages:</strong> Translate technical API errors into understandable messages for end-users.
          </li>
        </ol>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Pro Tip</h3>
          <p>
            Consider using a dedicated API client library or creating a custom wrapper that handles common JSON error patterns
            for your specific APIs. This centralizes error handling logic and promotes consistency across your application.
          </p>
        </div>
      </div>
    </>
  );
} 