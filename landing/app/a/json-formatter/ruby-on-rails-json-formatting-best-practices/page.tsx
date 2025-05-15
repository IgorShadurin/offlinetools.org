import type { Metadata } from "next";
import { CheckCircle, AlertTriangle, Code, FolderTree, Shuffle, List } from "lucide-react";
import React from "react"; // Import React explicitly if not using auto-import

export const metadata: Metadata = {
  title: "Ruby on Rails JSON Formatting Best Practices | API Development",
  description:
    "Explore best practices for formatting JSON responses in Ruby on Rails applications to build consistent, readable, and maintainable APIs.",
};

export default function RailsJsonFormattingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ruby on Rails JSON Formatting Best Practices
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-500" size={24} /> Why Consistent JSON Matters
          </h2>
          <p>
            When building APIs with Ruby on Rails, the way you format your JSON responses is crucial for developer experience and API maintainability. A consistent, well-structured JSON output makes your API easier to understand, consume, and debug for clients (frontend applications, mobile apps, third-party services). Inconsistent formatting leads to confusion, increased integration time, and potential bugs on the client side.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shuffle className="mr-2 text-blue-500" size={24} /> Case Conventions: Snake_case vs. CamelCase
          </h2>
          <p>
            This is one of the most debated topics. Ruby and Rails naturally use <code>snake_case</code> for method names, variable names, and database columns. However, many frontend JavaScript frameworks and libraries prefer <code>camelCase</code>.
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Option 1: Stick with Ruby's Snake_case
          </h3>
          <p>
            Keep your JSON keys in <code>snake_case</code>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (Snake_case):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "user_id": 1,
  "first_name": "Alice",
  "last_name": "Smith",
  "is_active": true
}`}
            </pre>
          </div>
          <p>
            <span className="font-medium">Pros:</span> Maps directly to your Rails model attributes and database columns. No conversion needed server-side. Reduces potential for server-side errors related to formatting.
          </p>
          <p>
            <span className="font-medium">Cons:</span> Clients (especially JavaScript) might prefer or require <code>camelCase</code> and may need to implement client-side conversion.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Option 2: Convert to CamelCase
          </h3>
          <p>
            Convert your JSON keys from <code>snake_case</code> to <code>camelCase</code> before sending the response.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (CamelCase):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "userId": 1,
  "firstName": "Alice",
  "lastName": "Smith",
  "isActive": true
}`}
            </pre>
          </div>
           <p>
            <span className="font-medium">Pros:</span> Often preferred by frontend developers, leading to a more idiomatic experience on the client side.
          </p>
          <p>
            <span className="font-medium">Cons:</span> Requires server-side conversion logic, which adds complexity. Libraries like Active Model Serializers, JBuilder, or Fast JSON API can handle this, but it's an extra layer.
          </p>
          <p className="flex items-start mt-4 text-blue-600 dark:text-blue-400">
             <CheckCircle className="mr-2 flex-shrink-0" size={20} />
             <strong>Best Practice: Choose one convention and stick to it religiously across your entire API.</strong> Document your choice clearly. If building for a specific frontend technology, consider its preference.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
             <Code className="mr-2 text-purple-500" size={24} /> Handling Data Types and Nulls
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Standard JSON Types
          </h3>
          <p>
            Ensure your API returns standard JSON data types: string, number, boolean, object, array, and null. Rails models usually map correctly, but be mindful of:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Dates/Times: Return as ISO 8601 strings (e.g., <code>"2023-10-27T10:00:00Z"</code>). Avoid sending native Ruby date/time objects directly.</li>
            <li>Numbers: Ensure integers are integers and decimals are decimals. Avoid sending numbers as strings unless there's a specific reason (like IDs that might exceed integer limits, though standard JSON numbers handle large values).</li>
            <li>Booleans: Use standard <code>true</code> and <code>false</code> JSON primitives, not integers (0 or 1) or strings ("true", "false").</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Consistent Null Handling
          </h3>
          <p>
            How do you represent attributes that have no value in the database?
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (Nulls):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "id": 42,
  "name": "Widget",
  "description": null, // Explicitly null
  "price": 19.99
}`}
            </pre>
          </div>
           <p className="flex items-start mt-4 text-blue-600 dark:text-blue-400">
             <CheckCircle className="mr-2 flex-shrink-0" size={20} />
             <strong>Best Practice: Include keys with <code>null</code> values explicitly.</strong> Do not omit keys that have a null value in the database. Omitting keys makes it difficult for clients to know if an attribute exists but is null, or if it doesn't exist at all in the response structure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FolderTree className="mr-2 text-green-600" size={24} /> Structuring Associations (Nesting)
          </h2>
          <p>
            How should you represent related resources (associations) in your JSON?
          </p>
          <h3 className="text-xl font-semibold mt-6 mb-3">
            Option 1: Embedding (Nesting)
          </h3>
          <p>
            Include the associated resource object(s) directly within the parent object. Good for one-to-one or simple one-to-many relationships where the nested data is always needed.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (Embedding):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "order": {
    "id": 101,
    "total": 55.75,
    "customer": { // Embedded customer
      "id": 1,
      "first_name": "Alice"
    },
    "items": [ // Embedded items
      { "item_id": 1, "quantity": 2 },
      { "item_id": 5, "quantity": 1 }
    ]
  }
}`}
            </pre>
          </div>
           <p>
            <span className="font-medium">Pros:</span> Single API call provides all necessary data. Simple structure for clients.
          </p>
          <p>
            <span className="font-medium">Cons:</span> Can lead to very large, deeply nested responses ("N+1 query" issues server-side if not careful with eager loading). Less flexible if the client only needs the parent data. Duplicates data if the same associated resource appears multiple times.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Option 2: Linking (Using IDs)
          </h3>
          <p>
            Only include the ID(s) of the associated resource(s). The client then makes separate calls to fetch the linked resources if needed.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (Linking):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "order": {
    "id": 101,
    "total": 55.75,
    "customer_id": 1, // Link to customer
    "item_ids": [1, 5] // Link to items
  }
}`}
            </pre>
          </div>
          <p>
            <span className="font-medium">Pros:</span> Keeps parent responses lean. Avoids data duplication. More flexible if clients don't always need the associated data.
          </p>
          <p>
            <span className="font-medium">Cons:</span> Requires multiple API calls from the client to get associated data ("N+1 request" issue client-side). More complex client-side logic to fetch and combine data.
          </p>

           <h3 className="text-xl font-semibold mt-6 mb-3">
            Option 3: Sideloading (e.g., JSON:API)
          </h3>
           <p>
            A common pattern (like in JSON:API) is to include the main resource and related resources in separate top-level keys (e.g., <code>"data"</code> and <code>"included"</code>), linking them using IDs.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (Sideloading concept):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "data": {
    "type": "orders",
    "id": "101",
    "attributes": {
      "total": 55.75
    },
    "relationships": {
      "customer": {
        "data": { "type": "customers", "id": "1" }
      },
      "items": {
        "data": [
          { "type": "items", "id": "1" },
          { "type": "items", "id": "5" }
        ]
      }
    }
  },
  "included": [
    {
      "type": "customers",
      "id": "1",
      "attributes": {
        "first_name": "Alice",
        "last_name": "Smith"
      }
    },
    // Item data would also be included here
  ]
}`}
            </pre>
          </div>
           <p>
            <span className="font-medium">Pros:</span> Single API call, no data duplication, avoids N+1 issues on both ends. Standardized structure (if following a spec like JSON:API).
          </p>
          <p>
            <span className="font-medium">Cons:</span> More complex structure than simple embedding/linking. Requires client-side logic to process the "included" data and link it to the main data. Often requires a dedicated gem (like Fast JSON API).
          </p>
          <p className="flex items-start mt-4 text-blue-600 dark:text-blue-400">
             <CheckCircle className="mr-2 flex-shrink-0" size={20} />
             <strong>Best Practice: Choose a strategy (embedding, linking, or sideloading) appropriate for the relationship and expected usage.</strong> Use embedding sparingly for simple, always-needed associations. Consider sideloading for more complex APIs with many relationships. Document your chosen strategy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <List className="mr-2 text-orange-500" size={24} /> Lists, Pagination, and Metadata
          </h2>
          <p>
            When returning collections of resources (lists), it's common practice to include metadata about the collection and provide pagination links.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (List with Metadata/Pagination):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "data": [ // The array of resources
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" },
    // ... items ...
  ],
  "meta": { // Metadata about the collection
    "current_page": 1,
    "per_page": 25,
    "total_pages": 10,
    "total_count": 250
  },
  "links": { // Pagination links
    "self": "/api/v1/items?page=1",
    "first": "/api/v1/items?page=1",
    "prev": null,
    "next": "/api/v1/items?page=2",
    "last": "/api/v1/items?page=10"
  }
}`}
            </pre>
          </div>
          <p className="flex items-start mt-4 text-blue-600 dark:text-blue-400">
             <CheckCircle className="mr-2 flex-shrink-0" size={20} />
             <strong>Best Practice: Wrap lists in a root object containing keys for the data array, metadata, and links.</strong> Use gems like Kaminari or WillPaginate along with serializers to easily generate pagination metadata and links.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={24} /> Error Formatting
          </h2>
          <p>
            How you return errors is just as important as how you return successful data. Inconsistent error formats make debugging difficult for clients.
          </p>
           <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
            <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">Example (Error Response):</h4>
            <pre className="text-sm text-gray-800 dark:text-gray-200">
{`{
  "errors": [
    {
      "status": "422", // HTTP status code as string
      "source": { "pointer": "/data/attributes/email" }, // Optional: where the error occurred
      "detail": "is not a valid email format", // Human-readable explanation
      "code": "invalid_format" // Optional: app-specific error code
    },
     {
      "status": "422",
      "source": { "pointer": "/data/attributes/password" },
      "detail": "is too short (minimum is 8 characters)"
    }
  ]
}`}
            </pre>
          </div>
           <p className="flex items-start mt-4 text-blue-600 dark:text-blue-400">
             <CheckCircle className="mr-2 flex-shrink-0" size={20} />
             <strong>Best Practice: Use a consistent top-level key for errors (e.g., <code>"errors"</code>) containing an array of error objects.</strong> Each error object should provide details like status code, source (if applicable), and a human-readable message. Consider following a standard like the JSON:API error structure.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Code className="mr-2 text-teal-500" size={24} /> Tools and Libraries in Rails
          </h2>
          <p>
            Rails provides basic JSON rendering with <code>.to_json</code> and <code>.as_json</code>, but for complex APIs, dedicated serialization gems are highly recommended.
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong><code>as_json</code> / <code>to_json</code>:</strong> Built into Active Record. Useful for simple cases or quickly inspecting data. Allows specifying <code>:only</code>, <code>:except</code>, <code>:methods</code>, and <code>:include</code> options for basic customization. Can become cumbersome for complex structures.
               <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 mt-2 overflow-x-auto">
                <h4 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-1">Example (as_json):</h4>
                <pre className="text-sm text-gray-800 dark:text-gray-200">
{`user.as_json(only: [:id, :first_name], methods: [:full_name], include: { posts: { only: [:id, :title] } })`}
                </pre>
              </div>
            </li>
             <li>
              <strong>Active Model Serializers (AMS):</strong> A long-standing gem that uses a serializer class per model to define the JSON structure. Supports embedding and linking. Provides flexibility for customization.
            </li>
             <li>
              <strong>Fast JSON API / JSONAPI::Serializer:</strong> Designed for building APIs that conform to the JSON:API specification. Highly performant due to its architecture. Excellent for complex relationships and sideloading.
            </li>
             <li>
              <strong>JBuilder:</strong> A DSL (Domain Specific Language) in Ruby views (`.json.jbuilder` files) to define JSON structures. Good for view-layer logic or simpler APIs. Less performant than Fast JSON API for large datasets.
            </li>
          </ul>
          <p className="flex items-start mt-4 text-blue-600 dark:text-blue-400">
             <CheckCircle className="mr-2 flex-shrink-0" size={20} />
             <strong>Best Practice: For anything beyond the simplest API endpoints, use a dedicated serialization gem.</strong> Choose one based on your API's complexity, performance needs, and whether you want to follow a specific standard like JSON:API. This separates formatting logic from your controllers and models.
          </p>
        </section>

         <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-indigo-500" size={24} /> Additional Tips
          </h2>
           <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Document Your API:</strong> Use tools like Swagger/OpenAPI to document your JSON response structures. This is invaluable for consumers.
            </li>
             <li>
              <strong>Version Your API:</strong> If your API evolves, versioning (e.g., <code>/api/v1/users</code>, <code>/api/v2/users</code>) allows you to change JSON formats without breaking existing clients.
            </li>
             <li>
              <strong>Field Filtering:</strong> Allow clients to request only specific fields using query parameters (e.g., <code>?fields[users]=id,name</code>). Serializer gems often support this.
            </li>
             <li>
              <strong>Consider Performance:</strong> Be mindful of the performance impact of generating large or complex JSON structures, especially with N+1 queries or deep nesting. Serialization gems and proper database eager loading are key here.
            </li>
          </ul>
        </section>

        <section>
           <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-500" size={24} /> Conclusion
          </h2>
          <p>
            Consistent and well-structured JSON formatting is a cornerstone of a good API built with Ruby on Rails. By establishing clear conventions for case, data types, null handling, associations, and collections from the start, and leveraging appropriate serialization tools, you can build APIs that are robust, easy to consume, and maintainable for years to come. Prioritize consistency and clear documentation.
          </p>
        </section>

      </div>
    </div>
  );
}