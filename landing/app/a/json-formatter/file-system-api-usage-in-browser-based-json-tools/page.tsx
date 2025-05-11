import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File System API Usage in Browser-Based JSON Tools | Offline Tools",
  description:
    "Learn how browser-based JSON tools can leverage the File System Access API to directly read and save JSON files locally.",
};

export default function FileSystemApiJsonToolsArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        File System API Usage in Browser-Based JSON Tools
      </h1>

      <div className="space-y-6">
        <p>
          Browser-based tools for working with JSON data are incredibly convenient. They require no installation,
          run anywhere with a modern browser, and can be used offline (depending on implementation). Traditionally,
          uploading and downloading files involved clunky input elements and data URLs. However, the modern
          <span className="font-semibold"> File System Access API </span>
          offers a much more integrated and powerful way for web applications to interact directly with the user&apos;s local file system.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What is the File System Access API?</h2>
        <p>
          The File System Access API (formerly Native File System API) provides methods to allow web applications to
          read and write files and directories on the user&apos;s local system. Crucially, this is done with explicit
          user permission, respecting privacy and security. It moves beyond simple uploads/downloads to enable
          web apps to act more like native desktop applications, allowing users to open, edit, and save files
          seamlessly.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Key capabilities for JSON tools:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Directly open a JSON file from the user&apos;s disk.</li>
            <li>Save modified JSON data back to the same file or a new location.</li>
            <li>Retain file handles to save changes without re-prompting the user (with permission).</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Opening JSON Files (`showOpenFilePicker`)</h2>
        <p>
          The most common use case for a JSON tool is allowing users to load a JSON file for formatting, validation,
          or editing. The `showOpenFilePicker()` method is designed for this. It prompts the user to select one or more
          files, and if permission is granted, returns an array of `FileSystemFileHandle` objects. From a handle,
          you can access the file content.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Reading a JSON file</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`async function openJsonFile() {
  try {
    // Open file picker, allowing only JSON files
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'JSON Files',
          accept: {
            'application/json': ['.json'],
            'text/plain': ['.json'], // Sometimes JSON is served as text/plain
          },
        },
      ],
      excludeAcceptAllOption: true, // Don't show 'All files' option
      multiple: false, // Allow only one file selection
    });

    // Get the file object from the handle
    const file = await fileHandle.getFile();

    // Read the file content as text
    const fileContent = await file.text();

    console.log('File content:', fileContent);

    // Parse the JSON content
    try {
      const jsonData = JSON.parse(fileContent);
      console.log('Parsed JSON data:', jsonData);
      // Now you can process jsonData in your tool
      return { fileHandle, jsonData }; // Return handle for potential saving later
    } catch (parseError: any) {
      console.error('Failed to parse JSON:', parseError);
      alert('Error parsing JSON file: ' + parseError.message);
    }

  } catch (error: any) {
    // User cancelled or an error occurred
    if (error.name === 'AbortError') {
      console.log('User cancelled file picker');
    } else {
      console.error('An error occurred:', error);
      alert('Error opening file: ' + error.message);
    }
    return null;
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This function demonstrates selecting a `.json` file, reading its content, and parsing it into a JavaScript object.
            It also includes basic error handling for parsing issues and user cancellations.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Saving JSON Data (`showSaveFilePicker`)</h2>
        <p>
          Once a user has modified JSON data in your tool, they'll want to save it. The `showSaveFilePicker()` method
          lets the user choose where to save a file and what to name it. Like the open picker, it returns a `FileSystemFileHandle`.
          You then use this handle to create a writable stream and write your data to it.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Saving JSON data to a file</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`async function saveJsonFile(jsonData: any, suggestedName = 'data.json') {
  try {
    // Stringify the JSON data with indentation for readability
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Show save file picker, suggesting a name and format
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: suggestedName,
      types: [
        {
          description: 'JSON Files',
          accept: {
            'application/json': ['.json'],
          },
        },
      ],
    });

    // Create a writable stream to the file
    const writableStream = await fileHandle.createWritable();

    // Write the JSON string to the stream
    await writableStream.write(jsonString);

    // Close the stream, saving the file
    await writableStream.close();

    console.log('JSON file saved successfully!');
    return fileHandle; // Return handle for potential subsequent saves
  } catch (error: any) {
    // User cancelled or an error occurred
    if (error.name === 'AbortError') {
      console.log('User cancelled save file picker');
    } else {
      console.error('An error occurred:', error);
      alert('Error saving file: ' + error.message);
    }
    return null;
  }
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This function takes a JavaScript object, stringifies it, and prompts the user to save it as a `.json` file.
            Using `JSON.stringify(jsonData, null, 2)` formats the output with 2-space indentation for better readability.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Retaining Permissions</h2>
        <p>
          A significant advantage of the File System Access API is the ability to retain permission to a file or directory
          handle. Once the user grants permission, your application can store the `FileSystemFileHandle` (e.g., using
          IndexedDB) and use it later to save changes without re-prompting the user, making the workflow smoother.
          However, the browser may still periodically verify the permission state, and you should always be prepared
          to handle cases where permission is revoked or lost.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Checking and Requesting Permissions</h3>
          <p className="text-sm">
            You can check the permission status of a handle using `handle.queryPermission()` and request permission
            if needed using `handle.requestPermission()`.
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto mt-2 text-sm">
            <pre>
              {`async function checkAndRequestPermission(handle: FileSystemHandle, mode: 'read' | 'readwrite') {
  const status = await handle.queryPermission({ mode });
  if (status === 'granted') {
    return true;
  }
  const requestStatus = await handle.requestPermission({ mode });
  return requestStatus === 'granted';
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Benefits for Offline JSON Tools</h2>
        <p>
          Using the File System Access API in browser-based JSON tools offers several advantages, especially for
          offline functionality:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Improved User Experience:</span>
            Direct file opening and saving feels more native and less like a traditional web upload/download.
          </li>
          <li>
            <span className="font-medium">Offline Capability:</span>
            Users can work with their local JSON files even without an internet connection, provided the tool itself is available offline (e.g., via Service Workers).
          </li>
          <li>
            <span className="font-medium">Performance:</span>
            Working directly with files can be more efficient than using data URLs or handling large files via browser memory limitations.
          </li>
          <li>
            <span className="font-medium">Privacy:</span>
            File access is strictly user-permissioned and data stays on the user&apos;s device unless explicitly processed or saved elsewhere by the tool&apos;s logic.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Browser Support and Considerations</h2>
        <p>
          The File System Access API is well-supported in modern browsers like Chrome, Edge, and Opera. However,
          support in Firefox and Safari is still developing. When building tools that use this API, it&apos;s crucial to
          provide fallback mechanisms (like traditional file input/download links) for browsers that don&apos;t support it.
          You can check for API support using `window.showOpenFilePicker`.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Checking API Support:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`if ('showOpenFilePicker' in window && 'showSaveFilePicker' in window) {
  // File System Access API is supported
  console.log('File System Access API supported');
} else {
  // Provide fallback for file operations
  console.warn('File System Access API not supported. Using fallback methods.');
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Example Use Case in a JSON Tool</h2>
        <p>
          Imagine a browser-based JSON formatter and validator. Instead of asking the user to paste JSON text or use
          an old-school file input, you can offer a button &quot;Open JSON File&quot; that uses `showOpenFilePicker`. Once loaded,
          the JSON is displayed, formatted, and validated. After the user makes changes, a &quot;Save&quot; button can use
          the retained `fileHandle` to save back to the original file, while a &quot;Save As&quot; button uses
          `showSaveFilePicker` to choose a new location.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The File System Access API is a game-changer for building powerful, user-friendly browser-based tools,
          including those that handle JSON data. By enabling direct, permissioned interaction with the local file system,
          it allows web applications to offer a richer, more efficient, and privacy-respecting experience for opening
          and saving files. While browser support is still evolving, implementing this API where available, with
          appropriate fallbacks, significantly enhances the capability of offline JSON tools.
        </p>
        <p>
          Integrating this API transforms a simple web utility into a more capable tool that feels closer to desktop software,
          empowering users to manage their JSON files locally with ease and confidence.
        </p>
      </div>
    </>
  );
}