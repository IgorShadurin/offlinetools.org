import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Pagination for Large JSON Documents | Offline Tools",
  description:
    "Learn how to implement efficient pagination strategies for handling large JSON documents, focusing on server-side techniques.",
};

export default function ImplementingPaginationForLargeJsonArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing Pagination for Large JSON Documents</h1>

      <div className="space-y-6">
        <p>
          Handling large JSON documents in web applications presents significant challenges, especially when you need to
          display or process their content. Loading an entire multi-gigabyte JSON file into browser memory can lead to
          slow performance, browser crashes, and a poor user experience. Pagination is a common solution for managing
          large datasets, allowing you to load and display data in smaller, digestible chunks. However, implementing
          effective pagination for large JSON files requires a different approach than traditional database-backed
          pagination.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Problem with Client-Side Loading</h2>
        <p>
          For small to medium-sized JSON files (say, a few megabytes), loading the entire file into the browser's memory
          and performing client-side filtering and pagination might be feasible. However, as the file size grows into
          the tens or hundreds of megabytes, or even gigabytes, this approach quickly becomes impractical.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Issues with client-side loading:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Excessive memory consumption</li>
            <li>Slow parsing times, freezing the UI</li>
            <li>High network bandwidth usage for initial download</li>
            <li>Browser limitations on memory and script execution time</li>
            <li>Difficulty in implementing true "pagination" without loading everything</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">The Server-Side Solution</h2>
        <p>
          The most robust and scalable way to implement pagination for large JSON documents is to process the file on
          the server. The server can read the file, extract the necessary data for the current "page", and send only
          that small subset to the client. This shifts the heavy lifting away from the user's browser.
        </p>

        <h3 className="text-xl font-semibold mt-6">Server-Side Strategy Steps:</h3>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">Read the JSON file on the server</li>
          <p className="text-sm -mt-2">The server reads the large JSON file from the file system.</p>
          <li className="font-medium">Parse the JSON structure</li>
          <p className="text-sm -mt-2">
            Crucially, for very large files, avoid parsing the entire file into memory at once if possible. Look for
            streaming JSON parsers available in your server-side language (e.g., `jsonstream` in Node.js, libraries in
            Python, Java, etc.) that can read and process the JSON incrementally. If the JSON structure is a large
            array, a streaming parser can help you iterate through elements without loading the whole array. If the
            structure is complex and requires full parsing to locate the target array, you might need a server with
            sufficient memory or consider alternative storage.
          </p>
          <li className="font-medium">Identify the target data array</li>
          <p className="text-sm -mt-2">
            Most large JSON files that require pagination contain a large array of records (e.g., a list of users,
            products, events). Your server logic needs to locate this specific array within the parsed (or streamed)
            structure.
          </p>
          <li className="font-medium">Apply Pagination Logic</li>
          <p className="text-sm -mt-2">
            Based on parameters received from the client (e.g., `page=1`, `limit=10`), calculate the start and end
            indices for the required slice of the array.
          </p>
          <li className="font-medium">Extract and Return the Slice</li>
          <p className="text-sm -mt-2">
            Extract the elements corresponding to the calculated slice from the array and serialize this smaller subset
            back into JSON. Send this small JSON response back to the client. You might also return the total number of
            items for pagination UI purposes.
          </p>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Client-Side Strategy Steps:</h3>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">Make API Requests</li>
          <p className="text-sm -mt-2">
            The client-side application (your Next.js page) makes `fetch` or similar API calls to your server endpoint.
          </p>
          <li className="font-medium">Include Pagination Parameters</li>
          <p className="text-sm -mt-2">
            Include query parameters in the request URL to tell the server which page and how many items per page you
            need (e.g., `/api/data?page=2&amp;limit=20`).
          </p>
          <li className="font-medium">Receive and Display Data</li>
          <p className="text-sm -mt-2">
            Receive the small JSON response from the server and render the data on the page.
          </p>
          <li className="font-medium">Update Pagination Controls</li>
          <p className="text-sm -mt-2">
            Use the total item count (if provided by the server) to update pagination buttons or page numbers, allowing
            the user to navigate to other pages, which triggers new API requests.
          </p>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Conceptual Example (Node.js Server &amp; React Client)</h2>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">
            Conceptual Server-Side Logic (e.g., Node.js API Route)
          </h3>
          <p className="text-sm mb-2">
            This is a simplified representation. A real-world implementation for very large files might use streaming.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// pages/api/paginated-data.ts (Next.js API Route)
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Assume data is in a large JSON file at the root level
const DATA_FILE_PATH = path.join(process.cwd(), 'large-data.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    // --- Read and Parse (handle large files carefully!) ---
    // For extremely large files, consider streaming parsers like 'jsonstream'
    // This example reads the whole file (only suitable for moderately large files or demonstration)
    const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const data = JSON.parse(fileContent); // This line can consume significant memory

    // Assume the array we need to paginate is 'items' within the root object
    const itemsArray = data.items; // Adjust based on your JSON structure

    if (!Array.isArray(itemsArray)) {
       return res.status(500).json({ error: "Data structure error: 'items' is not an array" });
    }

    const totalItems = itemsArray.length;
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedItems = itemsArray.slice(startIndex, endIndex);

    res.status(200).json({
      data: paginatedItems,
      pagination: {
        totalItems,
        currentPage: pageNum,
        itemsPerPage: limitNum,
        totalPages: Math.ceil(totalItems / limitNum),
      },
    });

  } catch (error: any) {
    console.error("Error processing JSON data:", error);
    res.status(500).json({ error: 'Failed to load and paginate data', details: error.message });
  }
}
`}
            </pre>
          </div>

          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-6">
            Conceptual Client-Side Logic (e.g., React Component)
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// components/PaginatedJsonDisplay.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Item {
  id: number;
  name: string;
  // ... other properties
}

interface PaginationInfo {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export default function PaginatedJsonDisplay() {
  const [items, setItems] = useState<Item[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10; // Define how many items per page you want

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(\`/api/paginated-data?page=\${currentPage}&amp;limit=\${itemsPerPage}\`);
        if (!res.ok) {
          throw new Error(\`HTTP error! status: \${res.status}\`);
        }
        const result = await res.json();
        setItems(result.data);
        setPagination(result.pagination);
      } catch (err: any) {
        setError('Failed to fetch data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]); // Rerun effect when currentPage or itemsPerPage changes

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination &amp;&amp; currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!items.length) return <div>No items found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Data Items (Page {currentPage})</h2>
      <ul className="list-disc pl-6 space-y-2">
        {items.map(item => (
          <li key={item.id}>{item.name}</li> // Display item properties
        ))}
      </ul>

      {pagination &amp;&amp; (
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === pagination.totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Performance Considerations</h2>
        <p>
          While server-side processing is essential, the naive approach of reading and parsing the *entire* JSON file on
          *every* request is still inefficient for truly massive files or high traffic.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Optimizations for very large files:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <span className="font-medium">Streaming Parsers:</span> Use libraries that can parse JSON piece by piece
              (e.g., `jsonstream`, `clarinet`). This avoids loading the entire JSON tree into memory. You can stream
              through the file until you find the desired array, then stream through the array elements, counting and
              skipping until you reach the start index, then collect the elements for the current page.
            </li>
            <li>
              <span className="font-medium">Pre-processing:</span> If the JSON file is static or updated infrequently,
              pre-process it once. Break it into smaller files, store it in a database (like PostgreSQL, MongoDB), or a
              specialized data store optimized for querying (like Elasticsearch). This is often the best long-term
              solution for performance and flexibility.
            </li>
            <li>
              <span className="font-medium">Caching:</span> Cache the parsed data structure or at least the results of
              recent pagination queries on the server.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing pagination for large JSON documents requires moving the data processing logic from the client to
          the server. By having the server read, parse, and slice the large JSON file before sending a small, paginated
          subset to the client, you ensure a responsive and efficient user experience, even when dealing with massive
          datasets. For the largest files, investigate streaming JSON parsers or consider pre-processing and storing the
          data in a more query-friendly format like a database. This server-side pagination pattern is a fundamental
          technique for building performant applications that handle substantial amounts of data.
        </p>
      </div>
    </>
  );
}
