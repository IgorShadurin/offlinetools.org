import type { Metadata } from "next";
import {
  Code,
  // Play, // Removed unused import
  List,
  Bug,
  Server,
  Users,
  CheckCircle2,
  Monitor,
  Inspect,
  Table,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Using JSON Formatters in Media Streaming Platforms",
  description:
    "Explore the critical role of JSON formatters in building efficient, maintainable, and debuggable media streaming applications, covering server-side APIs to client-side processing.",
};

export default function JsonFormattersInStreamingArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Code className="mr-3 text-blue-500" size={30} />
        Using JSON Formatters in Media Streaming Platforms
      </h1>

      <div className="space-y-8">
        <p>
          In the world of media streaming, where vast amounts of data (metadata,
          manifests, user interactions, analytics) flow constantly between servers and clients,
          efficient and standardized data exchange is paramount. <a href="https://www.json.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">JSON (JavaScript Object Notation)</a>
          has become the de facto standard for this data interchange due to its human-readability and
          relative simplicity. However, simply using JSON isn&apos;t enough; how that JSON is
          structured, delivered, and processed &mdash; essentially, how it&apos;s "formatted" and
          handled throughout the application &mdash; significantly impacts performance, developer experience, and
          maintainability. This article explores the various facets of using JSON formatters in
          media streaming.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Server className="mr-2 text-green-500" />
          Server-Side: Structuring Media APIs with JSON
        </h2>
        <p>
          The journey of JSON in streaming often begins on the server side, where APIs provide
          information about available media, user profiles, playback progress, and more.
          A well-formatted JSON API response is crucial for performance and ease of consumption
          by various clients (web browsers, mobile apps, smart TVs).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Media Item JSON Structure</h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            A simple, well-structured JSON object for a movie or episode.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "id": "mov-12345",
  "type": "movie",
  "title": "The Great Streaming Adventure",
  "description": "A thrilling story about data packets.",
  "duration_ms": 7200000, // Duration in milliseconds
  "release_year": 2023,
  "genres": ["action", "comedy", "sci-fi"],
  "director": {
    "id": "dir-67890",
    "name": "Ava Filmaker"
  },
  "ratings": {
    "imdb": 7.8,
    "rotten_tomatoes": 85
  },
  "poster_url": "https://example.com/posters/mov-12345.jpg",
  "playback_info": {
    "hls_manifest_url": "https://stream.example.com/mov-12345/manifest.m3u8",
    "dash_manifest_url": "https://stream.example.com/mov-12345/manifest.mpd",
    "available_resolutions": ["1080p", "720p", "480p"]
  },
  "is_available": true,
  "added_at": "2023-10-27T10:00:00Z" // ISO 8601 format
}`}
            </pre>
          </div>
        </div>
        <p>
          <strong>Key Considerations for Server-Side JSON Formatting:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start"><CheckCircle2 className="mr-2 mt-1 text-blue-500 flex-shrink-0" size={18} /> <strong>Consistency:</strong> Use consistent casing (e.g., snake_case or camelCase), date formats (ISO 8601 is standard), and naming conventions across all API endpoints.</li>
          <li className="flex items-start"><CheckCircle2 className="mr-2 mt-1 text-blue-500 flex-shrink-0" size={18} /> <strong>Efficiency:</strong> Avoid sending unnecessary data. Only include fields the client needs. For large lists (like search results or playlists), consider pagination.</li>
          <li className="flex items-start"><CheckCircle2 className="mr-2 mt-1 text-blue-500 flex-shrink-0" size={18} /> <strong>Predictability:</strong> Use standard data types. Ensure fields that can be null or absent are clearly documented or consistently represented (e.g., always include the key with a `null` value if it might be absent).</li>
          <li className="flex items-start"><CheckCircle2 className="mr-2 mt-1 text-blue-500 flex-shrink-0" size={18} /> <strong>Clear Nesting:</strong> Group related data logically (e.g., `playback_info`). Avoid overly deep nesting which can make client-side processing complex.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Monitor className="mr-2 text-yellow-500" />
          Client-Side: Parsing, Transformation, and Display
        </h2>
        <p>
          Once the JSON data arrives on the client, it needs to be parsed from a string into
          native JavaScript objects using `JSON.parse()`. However, the raw API response might not
          be in the ideal format for the client&apos;s UI components or internal state management.
          Client-side "formatting" often involves transforming this parsed data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Client-Side Data Mapping (Conceptual TypeScript)</h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Transforming API response structure to a client-friendly type.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Define the type matching the API response structure
interface ApiMediaItem {
  id: string;
  type: "movie" | "series";
  title: string;
  description: string;
  duration_ms?: number; // Optional for series
  release_year?: number;
  genres: string[];
  director?: { id: string; name: string }; // Optional
  ratings?: { [source: string]: number };
  poster_url: string;
  playback_info?: { // Optional for items not yet released, etc.
    hls_manifest_url: string;
    dash_manifest_url: string;
    available_resolutions: string[];
  };
  is_available: boolean;
  added_at: string; // ISO 8601 string
}

// Define a more client-friendly type
interface ClientMediaItem {
  mediaId: string;
  mediaType: "movie" | "series";
  title: string;
  summary: string; // Maybe map description to summary
  durationInMinutes?: number; // Convert ms to minutes
  year?: number;
  genres: string[];
  directorName?: string; // Flatten director object
  primaryRating?: { source: string; value: number }; // Select a primary rating
  posterUrl: string;
  hlsUrl?: string; // Flatten playback info
  dashUrl?: string;
  resolutions?: string[];
  isPlayable: boolean; // Rename/remap
  addedDate: Date; // Convert string to Date object
}

// Function to map API data to client data
function mapApiToClientMediaItem(apiItem: ApiMediaItem): ClientMediaItem {
  return {
    mediaId: apiItem.id,
    mediaType: apiItem.type,
    title: apiItem.title,
    summary: apiItem.description,
    durationInMinutes: apiItem.duration_ms ? Math.round(apiItem.duration_ms / 60000) : undefined,
    year: apiItem.release_year,
    genres: apiItem.genres || [], // Ensure genres is an array
    directorName: apiItem.director?.name, // Use optional chaining
    primaryRating: apiItem.ratings ? Object.entries(apiItem.ratings)[0]?.map(([source, value]) => ({ source, value }))[0] : undefined, // Simple example: take first rating
    posterUrl: apiItem.poster_url,
    hlsUrl: apiItem.playback_info?.hls_manifest_url,
    dashUrl: apiItem.playback_info?.dash_manifest_url,
    resolutions: apiItem.playback_info?.available_resolutions,
    isPlayable: apiItem.is_available,
    addedDate: new Date(apiItem.added_at), // Convert string to Date
  };
}

// Example usage (conceptual):
// Assuming 'apiResponseData' is the parsed JSON from the API
// const clientData = mapApiToClientMediaItem(apiResponseData);
// Now 'clientData' is easier to use in UI components.
`}
            </pre>
          </div>
        </div>
        <p>
          This mapping process is a form of client-side JSON "formatting" or transformation,
          making the data easier to work with within the client&apos;s architecture, reducing
          boilerplate code in UI components, and ensuring data consistency.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <CheckCircle2 className="mr-2 text-teal-500" />
          Data Validation with JSON Schemas
        </h2>
        <p>
          Ensuring the JSON received by the client (or sent to the server) conforms to the
          expected structure and types is critical for preventing runtime errors and security
          vulnerabilities. While not strictly a "formatter," JSON Schema is a powerful tool
          for defining the expected format of your JSON data.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Partial JSON Schema for Media Item</h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Defining the expected structure and types.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Media Item",
  "description": "Schema for a media item object (movie or series)",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for the media item"
    },
    "type": {
      "type": "string",
      "enum": ["movie", "series"],
      "description": "Type of media"
    },
    "title": {
      "type": "string",
      "description": "Title of the media"
    },
    "description": {
      "type": "string",
      "description": "Brief description of the media"
    },
    "duration_ms": {
      "type": "integer",
      "description": "Duration in milliseconds (for movies or episodes)"
    },
    "poster_url": {
      "type": "string",
      "format": "url",
      "description": "URL of the poster image"
    },
    "playback_info": {
      "type": "object",
      "properties": {
        "hls_manifest_url": {
          "type": "string",
          "format": "url"
        },
        "dash_manifest_url": {
          "type": "string",
          "format": "url"
        },
        "available_resolutions": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["hls_manifest_url", "dash_manifest_url", "available_resolutions"],
      "description": "Playback information for the media"
    }
    // ... other properties ...
  },
  "required": [
    "id",
    "type",
    "title",
    "description",
    "poster_url",
    "is_available",
    "added_at"
  ]
}`}
            </pre>
          </div>
        </div>
        <p>
          Using tools that validate JSON against a schema helps ensure data integrity,
          especially when dealing with multiple teams or external APIs. While the validation
          itself isn&apos;t "formatting" in the visual sense, it ensures the data conforms to
          a defined format.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Bug className="mr-2 text-red-500" />
          Debugging and Visualization Tools
        </h2>
        <p>
          Beyond the structured API responses and client-side transformations, the term
          "JSON formatter" is often used by developers to refer to tools that make raw JSON
          strings readable during debugging. Media streaming platforms involve complex data flows;
          being able to quickly inspect and understand the content of a JSON payload is invaluable.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start"><Inspect className="mr-2 mt-1 text-purple-500 flex-shrink-0" size={18} /> <strong>Browser Developer Tools:</strong> Most modern browsers (Chrome, Firefox, Edge, Safari) automatically detect and format JSON responses in the Network tab, providing collapsible trees and syntax highlighting.</li>
          <li className="flex items-start"><Code className="mr-2 mt-1 text-purple-500 flex-shrink-0" size={18} /> <strong>IDE/Editor Extensions:</strong> Extensions for VS Code, Sublime Text, etc., offer built-in or plugin-based JSON formatting, validation, and even schema integration.</li>
          <li className="flex items-start"><Table className="mr-2 mt-1 text-purple-500 flex-shrink-0" size={18} /> <strong>Online Formatters:</strong> Numerous websites allow pasting raw JSON to pretty-print it, validate syntax, and sometimes even visualize its structure.</li>
          <li className="flex items-start"><Users className="mr-2 mt-1 text-purple-500 flex-shrink-0" size={18} /> <strong>Custom Client-Side Pretty-Printers:</strong> For developer tools or internal dashboards within the streaming platform, you might implement a simple client-side JSON pretty-printer using `JSON.stringify(data, null, 2)` to display formatted JSON to users or developers.</li>
        </ul>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium mb-2">Example: Basic Client-Side Pretty Printing</h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            Using standard browser/Node.js functionality.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume 'rawData' is a string received from an API
// const rawData = '{"name":"Test Movie","id":"m1"}';

try {
  // 1. Parse the raw string into a JavaScript object
  const parsedData = JSON.parse(rawData);

  // 2. Stringify the object with formatting (indentation)
  const prettyPrintedJson = JSON.stringify(parsedData, null, 2); // 'null' for replacer, '2' for space indentation

  // 3. Now 'prettyPrintedJson' is a nicely formatted string you can display
  // console.log(prettyPrintedJson);

  // Example Output:
  // {
  //   "name": "Test Movie",
  //   "id": "m1"
  // }

} catch (error) {
  console.error("Failed to parse JSON:", error);
  // Handle the parsing error (e.g., invalid JSON string)
}
`}
            </pre>
          </div>
        </div>
        <p>
          These tools don&apos;t change the data itself, but they are indispensable "formatters"
          in the context of developer productivity and debugging complex streaming data.
        </p>


        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <List className="mr-2 text-blue-500" />
          Conclusion: The Importance of JSON Formatting
        </h2>
        <p>
          JSON formatters, in their various forms, are fundamental to building robust media
          streaming platforms. From the server&apos;s careful crafting of API responses to the
          client&apos;s transformation of data for presentation, and the essential tools
          that aid developers in understanding complex payloads, efficient and consistent JSON
          handling is key. By paying attention to JSON structure, utilizing schema validation,
          and leveraging debugging formatters, developers can build streaming applications
          that are performant, scalable, and easier to maintain.
        </p>
      </div>
    </>
  );
}
