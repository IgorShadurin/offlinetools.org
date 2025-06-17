import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clipboard API Integration in JSON Formatters | Offline Tools",
  description:
    "Learn how JSON formatters utilize the browser's Clipboard API to enable seamless copying and pasting of data.",
};

export default function ClipboardApiJsonFormattersArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Clipboard API Integration in JSON Formatters</h1>

      <div className="space-y-6">
        <p>
          JSON formatters are essential tools for developers, helping to clean up, validate, and visualize JSON data. A
          key feature that enhances their usability is seamless integration with the system&apos;s clipboard. This
          functionality is typically achieved using the browser&apos;s <strong>Clipboard API</strong>, allowing users to
          easily copy formatted or source JSON and paste new data into the tool.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What is the Clipboard API?</h2>
        <p>
          The Clipboard API provides a modern, asynchronous way for web applications to interact with the system
          clipboard. Prior to this API, clipboard access was often cumbersome, synchronous, and varied across browsers,
          sometimes relying on deprecated methods or requiring Flash. The Clipboard API simplifies common clipboard
          operations like reading (pasting) and writing (copying) text or other data types.
        </p>
        <p>
          It operates asynchronously, which means clipboard operations don&apos;t block the main browser thread,
          resulting in a smoother user experience, especially with large amounts of data.
        </p>

        <h2 className="text-2xl font-semibold mt-8">How JSON Formatters Use the Clipboard API</h2>
        <p>JSON formatters leverage the Clipboard API primarily for two core functions:</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">1. Copying Formatted JSON Output</h3>
          <p className="mt-2">
            After a user pastes raw, unformatted JSON into the tool and clicks &quot;Format&quot;, the tool displays the
            data with proper indentation and syntax highlighting. The Clipboard API allows the user to click a
            &quot;Copy&quot; button to quickly copy this clean, formatted version back to their clipboard. This is
            crucial for developers who need to use the formatted JSON elsewhere, such as in code, documentation, or
            other applications.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">2. Pasting Raw JSON Input</h3>
          <p className="mt-2">
            Most JSON formatters provide a text area or input field where users can paste their source JSON. While
            standard browser paste functionality (Ctrl+V or Cmd+V) works, some tools might offer a dedicated
            &quot;Paste&quot; button. Using the Clipboard API, a &quot;Paste&quot; button can programmatically read the
            clipboard content and insert it into the input area, potentially triggering formatting or validation
            automatically. This can be useful in specific workflows or interfaces.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing Copy Functionality</h2>
        <p>
          The most common use case is copying the formatted output. This is typically done using the{" "}
          <code className="font-mono">navigator.clipboard.writeText()</code> method.
        </p>
        <p>
          Here&apos;s a basic example of how you might implement a copy button in JavaScript within a React/Next.js
          component:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import React, { useState } from 'react';

function JsonOutputComponent({ formattedJson }) {
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000); // Clear status after 2 seconds
    } catch (err) {
      setCopyStatus('Failed to copy.');
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      <pre className="bg-gray-200 p-3 rounded dark:bg-gray-700">
        {formattedJson}
      </pre>
      <button
        onClick={handleCopy}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Copy Formatted JSON
      </button>
      {copyStatus && <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{copyStatus}</span>}
    </div>
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This code snippet shows a simple button that calls{" "}
            <code className="font-mono">navigator.clipboard.writeText</code>
            when clicked. It uses `async/await` because the Clipboard API methods return Promises.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Implementing Paste Functionality</h2>
        <p>
          Reading from the clipboard requires user permission and typically happens in response to a user gesture, like
          a button click or a paste event (Ctrl+V). The method used is{" "}
          <code className="font-mono">navigator.clipboard.readText()</code>.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`import React, { useState } from 'react';

function JsonInputComponent({ onPaste }) {
  const [jsonInput, setJsonInput] = useState('');

  const handlePasteClick = async () => {
    try {
      // Permissions API check (optional but recommended)
      const permissionStatus = await navigator.permissions.query({ name: 'clipboard-read' });
      if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
        const text = await navigator.clipboard.readText();
        setJsonInput(text);
        if (onPaste) {
          onPaste(text); // Pass text to parent component for processing
        }
      } else {
        alert('Permission to read clipboard denied.');
      }
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
      alert('Failed to paste from clipboard.');
    }
  };

  const handleChange = (event) => {
    setJsonInput(event.target.value);
    // Maybe trigger formatting/validation here as well
  };

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={handleChange}
        placeholder="Paste your JSON here..."
        className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        rows="10"
      />
      <button
        onClick={handlePasteClick}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
      >
        Paste from Clipboard
      </button>
    </div>
  );
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Pasting programmatically is less common than copying, as users usually just paste directly into the text
            area. However, it demonstrates the use of <code className="font-mono">navigator.clipboard.readText</code>.
            Notice the check for clipboard read permission, which is important for user privacy.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Permissions and Security Considerations</h2>
        <p>Accessing the clipboard has security and privacy implications. Browsers implement safeguards:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>User Gesture Requirement:</strong> Both <code className="font-mono">writeText()</code> and{" "}
            <code className="font-mono">readText()</code> must typically be called in response to a user action (like a
            click). This prevents malicious sites from silently reading or overwriting your clipboard.
          </li>
          <li>
            <strong>Permissions API:</strong> Reading from the clipboard often requires explicit permission from the
            user, which can be checked using the Permissions API (
            <code className="font-mono">
              navigator.permissions.query(&#123; name: &apos;clipboard-read&apos; &#125;)
            </code>
            ). Writing text (<code className="font-mono">writeText</code>) is generally allowed within a user gesture
            without an explicit prompt in modern browsers.
          </li>
          <li>
            <strong>HTTPS:</strong> The Clipboard API is generally restricted to pages served over HTTPS for security.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Browser Support</h2>
        <p>
          The asynchronous Clipboard API is widely supported in modern browsers (Chrome, Firefox, Safari, Edge, Opera).
          However, always check compatibility tables like Can I Use for specific details, especially for older browser
          versions or specific mobile browser behaviors.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-6">
          <h3 className="text-lg font-medium">Key Takeaway:</h3>
          <p className="mt-2">
            Using <code className="font-mono">navigator.clipboard.writeText()</code> is the standard and recommended way
            to implement copy functionality in modern web applications, including JSON formatters. Reading with{" "}
            <code className="font-mono">navigator.clipboard.readText()</code> is possible but requires more care
            regarding user permissions and gestures.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          The integration of the browser&apos;s Clipboard API is a fundamental feature that significantly enhances the
          usability of online JSON formatters. It allows for quick and efficient transfer of JSON data between the
          user&apos;s system and the web tool, making workflows smoother. By understanding and properly implementing the
          API, developers can provide a seamless copy/paste experience, which is often taken for granted but is crucial
          for these types of utility applications.
        </p>
      </div>
    </>
  );
}
