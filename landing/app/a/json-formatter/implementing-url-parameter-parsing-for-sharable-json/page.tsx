import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing URL Parameter Parsing for Sharable JSON | Offline Tools",
  description:
    "Learn how to encode JSON data into URL parameters and parse it in your Next.js application to create sharable JSON links.",
};

export default function SharableJsonUrlArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Implementing URL Parameter Parsing for Sharable JSON</h1>

      <div className="space-y-6">
        <p>
          Making data sharable is a common requirement for web applications. For small data snippets, configurations, or
          specific states, embedding JSON directly into the URL can be an effective way to create sharable links without
          relying on a backend or database. This article explores how to implement URL parameter parsing in a Next.js
          application to achieve this, focusing on encoding and decoding JSON data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Embed JSON in URLs?</h2>
        <p>
          Embedding JSON in URLs allows users to share application state or configuration settings directly via a link.
          This is particularly useful for:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Sharing specific search filters or table configurations.</li>
          <li>Providing pre-filled form data for demonstrations.</li>
          <li>Creating stateless tools that operate purely client-side.</li>
          <li>Allowing users to save and restore application states without login.</li>
        </ul>
        <p>
          It simplifies the sharing process and makes your application more interactive and user-friendly for certain
          use cases.
        </p>

        <h2 className="text-2xl font-semibold mt-8">The Challenge: URL Safety</h2>
        <p>
          Directly including raw JSON in a URL is not safe or reliable. URLs have restrictions on characters (like
          spaces, quotes, and special symbols used in JSON), and raw JSON can break the URL structure. Therefore, the
          JSON data must be properly encoded.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Encoding JSON for URLs</h2>
        <p>
          Two common methods for encoding arbitrary data like JSON for inclusion in URLs are URL encoding and Base64
          encoding.
        </p>

        <h3 className="text-xl font-semibold mt-6">1. URL Encoding (Percent-Encoding)</h3>
        <p>
          This is the standard way to encode data for URLs. It replaces unsafe characters with a '%' followed by two
          hexadecimal digits. JavaScript provides <code>encodeURIComponent</code> for this purpose.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Encoding Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const jsonData = { name: "Test User", age: 30 };
const jsonString = JSON.stringify(jsonData);
const encodedJson = encodeURIComponent(jsonString);

// Example Output for encodedJson:
// %7B%22name%22%3A%22Test%20User%22%2C%22age%22%3A30%7D`}
            </pre>
          </div>
        </div>
        <p>
          URL encoding is suitable for relatively small JSON objects. However, the resulting string can be quite long
          and less readable than Base64.
        </p>

        <h3 className="text-xl font-semibold mt-6">2. Base64 Encoding</h3>
        <p>
          Base64 encoding represents binary data in an ASCII string format. It's often used for embedding images or
          other binary data in text formats, but it works well for JSON strings too. It typically results in a shorter
          string than URL encoding for the same data, though it's not directly URL-safe and might require an additional
          URL encoding step (though modern <code>btoa</code>/<code>atob</code>
          implementations often produce URL-safe output or require minimal substitution).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Encoding Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const jsonData = { name: "Test User", age: 30 };
const jsonString = JSON.stringify(jsonData);
// Note: btoa works on binary strings. For general UTF-8, you might need more robust encoding.
// For simple ASCII JSON, it often suffices.
const base64Encoded = btoa(jsonString);

// Example Output for base64Encoded:
// eyJ...vc2VyIiwiYWdlIjozMH0=
// This Base64 output is usually URL-safe, but check for '+' '/' '='`}
            </pre>
          </div>
        </div>
        <p>
          Base64 results in a more compact representation compared to percent-encoding for many characters, making the
          URL slightly cleaner.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Parsing URL Parameters in Next.js</h2>
        <p>
          In Next.js (App Router), you can access URL search parameters using the <code>useSearchParams</code> hook from{" "}
          <code>next/navigation</code>. This hook is available in client components.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Example: Client Component Parsing</h3>
          <p className="text-sm mb-3">
            This component reads a <code>data</code> parameter from the URL, assumes it&apos;s Base64 encoded JSON,
            decodes it, and displays the result.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserData {
  name: string;
  age: number;
}

export default function DataDisplay() {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const encodedData = searchParams.get('data');

    if (encodedData) {
      try {
        // Assuming Base64 encoding
        const jsonString = atob(encodedData);
        const data = JSON.parse(jsonString);

        // Basic validation (optional but recommended)
        if (typeof data === 'object' && data !== null && 'name' in data && 'age' in data) {
          setUserData(data as UserData);
          setError(null);
        } else {
          setError('Invalid data structure in URL parameter.');
          setUserData(null);
        }
      } catch (e) {
        console.error("Failed to decode or parse JSON:", e);
        setError('Failed to parse data from URL. Ensure it is valid JSON.');
        setUserData(null);
      }
    } else {
      setUserData(null); // Clear data if parameter is removed
      setError('No data parameter found in URL.');
    }
  }, [searchParams]); // Re-run effect when search params change

  return (
    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Parsed Data from URL:</h3>
      {error && <p className="text-red-600 dark:text-red-400">Error: {error}</p>}
      {!userData && !error && <p>Loading data or no data found...</p>}
      {userData && (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Age:</strong> {userData.age}</p>
        </div>
      )}
    </div>
  );
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Generating Sharable Links</h2>
        <p>
          To create the sharable link, you&apos;ll need to perform the encoding step and construct the URL. This can be
          done programmatically based on the current application state.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Example: Generating Link</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`// In a client component or utility function
const dataToShare = { filter: "active", sort: "name" };
const jsonString = JSON.stringify(dataToShare);
const encodedJson = btoa(jsonString); // Or use encodeURIComponent()

// Assuming the current page path is '/my-tool'
const sharableLink = \`\${window.location.origin}/my-tool?data=\${encodedJson}\`;

console.log("Sharable Link:", sharableLink);`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            You can then display this <code>sharableLink</code> for the user to copy.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations and Limitations</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">URL Length Limits:</span> URLs have practical length limits (typically around
            2000-4000 characters, depending on the browser and server). Embedding large JSON objects is not feasible.
            Use this method for small data only.
          </li>
          <li>
            <span className="font-medium">Encoding Choice:</span> While Base64 is more compact, ensure your decoding
            handles potential Base64 variations or apply an additional <code>decodeURIComponent</code> after{" "}
            <code>atob</code> if necessary for robustness. URL encoding is safer but more verbose.
          </li>
          <li>
            <span className="font-medium">Security:</span> Avoid putting sensitive information in URL parameters. While
            the data is encoded, it&apos;s not encrypted and is easily visible.
          </li>
          <li>
            <span className="font-medium">Performance:</span> Parsing and decoding large strings can add minor overhead
            on page load.
          </li>
          <li>
            <span className="font-medium">Server Components:</span> The <code>useSearchParams</code> hook works in
            Client Components. If you need access to search params in a Server Component, access them via the{" "}
            <code>searchParams</code> prop passed to page components:{" "}
            <code>{`export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }){...}`}</code>
            .
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Embedding JSON in URL parameters provides a straightforward method for creating sharable links for small
          datasets or configurations in your Next.js applications. By properly encoding the data and using the{" "}
          <code>useSearchParams</code> hook or <code>searchParams</code> prop, you can build dynamic components that
          load their state directly from the URL.
        </p>
        <p>
          Always consider the size of the data you intend to share and the security implications before implementing
          this pattern. For larger or more sensitive data, server-side solutions or other storage mechanisms would be
          more appropriate.
        </p>
      </div>
    </>
  );
}
