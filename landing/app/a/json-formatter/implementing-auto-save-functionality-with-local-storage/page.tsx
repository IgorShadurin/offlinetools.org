import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementing Auto-Save Functionality with Local Storage | Offline Tools",
  description:
    "Learn how to implement simple auto-save functionality in your web applications using the browser's Local Storage.",
};

export default function AutoSaveLocalStorageArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Implementing Auto-Save Functionality with Local Storage
      </h1>

      <div className="space-y-6">
        <p>
          Auto-save is a user-friendly feature that automatically saves a user&apos;s progress
          periodically or when changes occur, preventing data loss due to accidents, browser
          crashes, or navigation. Implementing it can significantly improve the user experience
          for applications involving data entry or content creation. Local Storage is a simple
          browser API that provides a persistent client-side key-value store, making it a
          convenient option for implementing basic auto-save features, especially for offline or
          single-user scenarios.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What is Auto-Save?</h2>
        <p>
          Auto-save automatically saves the user&apos;s work without requiring them to manually click a
          &quot;Save&quot; button. This can happen based on a timer (e.g., every 30 seconds) or in
          response to user actions (e.g., after typing stops for a few seconds, or when an input
          field loses focus). The goal is to ensure that even if something unexpected happens,
          the user doesn&apos;t lose their most recent changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Why Use Local Storage?</h2>
        <p>
          Local Storage offers several advantages for basic auto-save implementations:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Simplicity:</span> It has a very straightforward API
              (<code>localStorage.setItem()</code>, <code>localStorage.getItem()</code>,
              <code>localStorage.removeItem()</code>).
            </li>
            <li>
              <span className="font-medium">Persistence:</span> Data stored in Local Storage
              persists even after the browser is closed and reopened, unlike Session Storage.
            </li>
            <li>
              <span className="font-medium">Client-Side:</span> It works entirely in the
              user&apos;s browser, requiring no server-side logic for basic saving and loading.
              This makes it ideal for offline use cases or simple form saving.
            </li>
            <li>
              <span className="font-medium">Synchronous:</span> Operations are synchronous,
              making the code flow easy to understand (though this can be a drawback for large
              data).
            </li>
          </ul>
        </div>
        <p>
          However, Local Storage also has limitations:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Storage Limit:</span> Typically limited to 5-10 MB per
              origin (domain).
            </li>
            <li>
              <span className="font-medium">Synchronous Operations:</span> Can block the main
              browser thread if dealing with large amounts of data.
            </li>
            <li>
              <span className="font-medium">String Only:</span> Data must be stored as strings.
              Objects need to be serialized (usually using JSON.stringify) and parsed
              (JSON.parse).
            </li>
            <li>
              <span className="font-medium">No Structure:</span> It&apos;s a simple key-value store;
              there&apos;s no built-in database structure or querying capability.
            </li>
            <li>
              <span className="font-medium">Security:</span> Data is accessible via JavaScript on
              the same origin. Don&apos;t store sensitive information.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Basic Implementation Steps</h2>
        <p>
          Implementing auto-save with Local Storage involves these core steps:
        </p>
        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li className="font-medium">
            Identify the data that needs to be saved.
          </li>
          <li className="font-medium">
            Choose a unique key for storing the data in Local Storage.
          </li>
          <li className="font-medium">
            Implement a save function that serializes the data and stores it using
            <code>localStorage.setItem(key, serializedData)</code>.
          </li>
          <li className="font-medium">
            Implement a load function that retrieves the data using
            <code>localStorage.getItem(key)</code>, deserializes it, and populates the
            application state or UI.
          </li>
          <li className="font-medium">
            Trigger the save function based on user actions or a timer.
          </li>
          <li className="font-medium">
            Call the load function when the page or component initializes.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8">Handling Data Types (JSON)</h2>
        <p>
          Since Local Storage only stores strings, you&apos;ll typically store complex data
          structures (like objects or arrays) as JSON strings.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Saving an object:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const dataToSave = { text: 'User input', count: 5 };
localStorage.setItem('myAppData', JSON.stringify(dataToSave));`}
            </pre>
          </div>

          <h3 className="text-lg font-medium mt-4">Loading an object:</h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`const savedDataString = localStorage.getItem('myAppData');
if (savedDataString) {
  try {
    const loadedData = JSON.parse(savedDataString);
    console.log(loadedData); // Use the loaded data
  } catch (e) {
    console.error('Error parsing saved data:', e);
    // Handle potential parsing errors (e.g., corrupted data)
  }
} else {
  console.log('No saved data found.');
  // Handle no saved data (e.g., initialize with defaults)
}`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Triggering Saves: Events and Debouncing</h2>
        <p>
          Directly saving on every keystroke or change can be inefficient, especially for large
          inputs. A common technique is to use debouncing or throttling.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Example: Saving on input change with Debounce</h3>
          <p className="text-sm mb-2">
            (Note: A proper debounce function needs to be implemented or imported)
          </p>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { useState, useEffect, useCallback } from 'react';
// Assume 'debounce' function is available, e.g., from lodash or custom utility

const STORAGE_KEY = 'articleDraft';

function ArticleEditor() {
  const [content, setContent] = useState('');

  // Load content from storage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      setContent(savedContent);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Define the save function
  const saveContent = useCallback((currentContent: string) => {
    console.log('Saving...', currentContent.substring(0, 50) + '...');
    localStorage.setItem(STORAGE_KEY, currentContent);
  }, []); // Dependencies for useCallback if needed, none here

  // Create a debounced version of the save function
  // Adjust debounce time (e.g., 500ms) as needed
  const debouncedSave = useCallback(debounce(saveContent, 500), [saveContent]);

  // Handle input changes and trigger the debounced save
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    debouncedSave(newContent); // Pass the latest value
  };

  // Optional: Save on component unmount (e.g., before navigating away)
  useEffect(() => {
    // Cleanup function runs on unmount
    return () => {
      // Ensure the latest content is saved
      saveContent(content); // Save the current state value
    };
  }, [content, saveContent]); // Depends on content and saveContent

  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing..."
        rows={10}
        className="w-full p-2 border rounded"
      />
      <p className="text-sm mt-2">Content auto-saved to browser storage.</p>
    </div>
  );
}

// Simple debounce implementation example (you might use a library)
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            In this React/Next.js example, we use `useState` for the content, `useEffect` to load
            on mount and save on unmount, `useCallback` to memoize the save function and its
            debounced version, and `debounce` to limit how often the save operation runs during
            typing.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Loading Data on Page Load</h2>
        <p>
          When the user returns to the page, you need to load the saved data from Local Storage
          to restore their previous state. This should typically happen as early as possible in the
          component lifecycle (e.g., within a <code>useEffect</code> hook with an empty
          dependency array in React).
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <h3 className="text-lg font-medium">Example: Loading in useEffect</h3>
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`useEffect(() => {
  const savedDataString = localStorage.getItem('myAppData');
  if (savedDataString) {
    try {
      const loadedData = JSON.parse(savedDataString);
      // Update state or UI with loadedData
      setData(loadedData); // Example using a state setter
      console.log('Loaded data from storage.');
    } catch (e) {
      console.error('Failed to parse saved data:', e);
      // Optionally clear storage or show an error message
      // localStorage.removeItem('myAppData');
    }
  }
}, []); // Empty array means run only once on mount`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Considerations and Best Practices</h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <span className="font-medium">Storage Limits:</span> Be mindful of the 5-10 MB limit.
            Local Storage is not suitable for storing large files or extensive application data.
          </li>
          <li>
            <span className="font-medium">Data Structure Evolution:</span> If your data structure
            changes over time, you&apos;ll need logic to handle older versions of saved data when
            loading (migration or graceful degradation).
          </li>
          <li>
            <span className="font-medium">User Experience:</span> Provide visual feedback (e.g., a
            &quot;Saving...&quot; or &quot;Saved&quot; message) to the user so they know the auto-save
            is working.
          </li>
          <li>
            <span className="font-medium">Error Handling:</span> Implement robust
            <code>try...catch</code> blocks around <code>JSON.parse()</code> as saved data can
            become corrupted.
          </li>
          <li>
            <span className="font-medium">Privacy/Security:</span> Local Storage is not encrypted
            by default and is accessible to any script on your domain. Do not store sensitive
            personal information or credentials.
          </li>
          <li>
            <span className="font-medium">Alternative Storage:</span> For larger data or more
            complex needs, consider alternatives like IndexedDB, which provides a full-fledged
            client-side database.
          </li>
          <li>
            <span className="font-medium">Hybrid Save:</span> Often, Local Storage auto-save is used
            in conjunction with a server-side save mechanism. Local Storage provides temporary,
            quick recovery, while server-side saves provide permanent storage and syncing across
            devices.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Complete (Simplified) Example</h2>
        <p>
          Here&apos;s a more complete example demonstrating saving and loading for a simple text area.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
           <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import { useState, useEffect } from 'react';

const SIMPLE_STORAGE_KEY = 'simpleTextData';

export default function SimpleAutoSaveEditor() {
  const [text, setText] = useState('');

  // Load data on component mount
  useEffect(() => {
    const savedText = localStorage.getItem(SIMPLE_STORAGE_KEY);
    if (savedText !== null) {
      setText(savedText);
    }
  }, []); // Runs only once on initial render

  // Save data whenever 'text' state changes
  // A real app might use debounce/throttle here
  useEffect(() => {
    // Avoid saving on initial mount before user interaction
    // Could add a flag or check if text is different from initial load
    console.log('Auto-saving text...');
    localStorage.setItem(SIMPLE_STORAGE_KEY, text);
  }, [text]); // Runs whenever 'text' state changes

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // Optional: Clear saved data button
  const handleClear = () => {
    localStorage.removeItem(SIMPLE_STORAGE_KEY);
    setText(''); // Clear the input field as well
    console.log('Saved data cleared.');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Simple Auto-Save Editor</h2>
      <p>
        Type something below. Your progress is automatically saved in your
        browser&apos;s Local Storage as you type (without debounce in this simple example).
        Refresh the page to see the data load back.
      </p>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
        rows={8}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        onClick={handleClear}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Clear Saved Data
      </button>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Data is stored locally in your browser. It is not sent to a server.
      </p>
    </div>
  );
}
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This example uses two <code>useEffect</code> hooks: one for loading data on mount
            and another for saving data whenever the <code>text</code> state updates. For a real
            application, wrapping the save logic with debounce or throttle is highly recommended
            to improve performance.
          </p>
        </div>


        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Implementing auto-save functionality with Local Storage is a straightforward way to
          enhance the robustness and user experience of client-side web applications. It&apos;s
          particularly effective for scenarios where data persistence within a single browser is
          sufficient, like drafts of articles, form progress, or simple settings. While Local
          Storage has limitations regarding size and complexity, for basic auto-save needs, its
          simplicity makes it an excellent tool. Remember to handle data serialization, employ
          techniques like debouncing for performance, and always consider the security and
          privacy implications of storing data client-side.
        </p>
      </div>
    </>
  );
}