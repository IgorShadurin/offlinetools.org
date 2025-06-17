import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event-Driven Architecture in Interactive JSON Formatters | Offline Tools",
  description:
    "Explore how Event-Driven Architecture powers responsive and dynamic interactive JSON formatters, improving user experience and tool flexibility.",
};

export default function EventDrivenArchitectureArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Event-Driven Architecture in Interactive JSON Formatters</h1>

      <div className="space-y-6">
        <p>
          Interactive JSON formatters are essential tools for developers, allowing them to easily validate, format, and
          manipulate JSON data in real-time. Behind the scenes, achieving this level of responsiveness and dynamic
          behavior often relies on a powerful pattern: Event-Driven Architecture (EDA). Let&apos;s delve into how EDA
          makes these tools so effective.
        </p>

        <h2 className="text-2xl font-semibold mt-8">What is Event-Driven Architecture?</h2>
        <p>
          Event-Driven Architecture is a software design pattern that promotes the production, detection, consumption
          of, and reaction to events. An "event" is a significant change in state. Instead of components making direct
          calls to each other, they communicate indirectly through events.
        </p>
        <p>
          In an interactive application like a JSON formatter, events are triggered by user actions (like typing,
          pasting) or system changes (like formatting complete, validation error found).
        </p>

        <h2 className="text-2xl font-semibold mt-8">Key Components in an EDA for Formatters</h2>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">1. Events:</h3>
          <p className="text-sm mt-1">
            These are the core triggers. Examples include:
            <ul className="list-disc pl-6 mt-1">
              <li>
                <code>userInputChanged</code>: Fired whenever the user types or pastes text.
              </li>
              <li>
                <code>formatRequested</code>: Fired when the user clicks a &quot;Format&quot; button.
              </li>
              <li>
                <code>validationNeeded</code>: Fired after input changes or formatting.
              </li>
              <li>
                <code>formattingComplete</code>: Fired when the formatting process finishes.
              </li>
              <li>
                <code>validationResult</code>: Fired when validation is done, carrying errors or success status.
              </li>
              <li>
                <code>themeChanged</code>: Fired when the user changes the formatter&apos;s theme.
              </li>
            </ul>
          </p>

          <h3 className="text-lg font-medium mt-4">2. Event Producers:</h3>
          <p className="text-sm mt-1">
            These are components that detect a state change and emit an event.
            <ul className="list-disc pl-6 mt-1">
              <li>
                The text editor component (emits <code>userInputChanged</code>).
              </li>
              <li>
                A button component (emits <code>formatRequested</code>).
              </li>
              <li>
                The formatter logic module (emits <code>formattingComplete</code>).
              </li>
            </ul>
          </p>

          <h3 className="text-lg font-medium mt-4">3. Event Consumers:</h3>
          <p className="text-sm mt-1">
            These components listen for specific events and react to them.
            <ul className="list-disc pl-6 mt-1">
              <li>
                The validation module (listens for <code>userInputChanged</code>, <code>formattingComplete</code>).
              </li>
              <li>
                The output display component (listens for <code>formattingComplete</code>, <code>validationResult</code>
                ).
              </li>
              <li>
                A status bar component (listens for <code>validationResult</code>).
              </li>
              <li>
                A syntax highlighter (listens for <code>userInputChanged</code>, <code>formattingComplete</code>).
              </li>
            </ul>
          </p>

          <h3 className="text-lg font-medium mt-4">4. Event Bus/Broker:</h3>
          <p className="text-sm mt-1">
            An optional intermediary that receives events from producers and routes them to consumers. This decouples
            producers and consumers. In a simple frontend app, this might be a global state manager or a custom pub/sub
            implementation.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">How it Works in Practice</h2>
        <p>Imagine a user typing JSON into the editor. Here&apos;s a simplified event flow:</p>

        <ol className="list-decimal pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">Typing occurs:</span> The editor component detects the change and emits a{" "}
            <code>userInputChanged</code> event, carrying the new text.
          </li>
          <li>
            <span className="font-medium">Listeners react:</span> The validation module and the syntax highlighter are
            listening for <code>userInputChanged</code>.
          </li>
          <li>
            <span className="font-medium">Validation starts:</span> The validation module processes the new text.
          </li>
          <li>
            <span className="font-medium">Highlighting updates:</span> The syntax highlighter parses the text and
            updates colors.
          </li>
          <li>
            <span className="font-medium">Validation finishes:</span> The validation module emits a
            <code>validationResult</code> event with details of any errors found.
          </li>
          <li>
            <span className="font-medium">UI updates:</span> A component listening to
            <code>validationResult</code> updates an error message area or status bar.
          </li>
        </ol>
        <p>
          This decoupled approach means the editor doesn&apos;t need to know *who* cares about the text changing, it
          just emits the event. Similarly, the validation module doesn&apos;t need to know *where* the text came from,
          it just listens for the relevant event.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Simplified Code Concept (React/JSX)</h2>
        <p>
          While a full EDA implementation can be complex, frameworks like React naturally encourage an event-like flow
          using props, state, and effects. Here&apos;s a conceptual look:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
            <pre>
              {`import React, { useState, useEffect } from 'react';

function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [errors, setErrors] = useState([]);

  // Event: userInputChanged (implicitly via state update)
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
    // Could emit an explicit event here in a larger system
  };

  // Consumer: Validation & Formatting logic triggered by input change
  useEffect(() => {
    // Simulate emitting validationNeeded event
    const timer = setTimeout(() => { // Debounce input
      if (!jsonInput) {
        setErrors([]);
        setFormattedJson('');
        return;
      }

      try {
        const parsed = JSON.parse(jsonInput);
        setErrors([]); // No validation errors
        // Simulate emitting formatRequested and then formattingComplete
        const prettyJson = JSON.stringify(parsed, null, 2);
        setFormattedJson(prettyJson);
      } catch (e: any) {
        // Simulate emitting validationResult event with errors
        setErrors([{ message: e.message }]); // Basic error capture
        setFormattedJson(''); // Clear formatted output on error
      }
    }, 500); // Wait 500ms after typing stops

    return () => clearTimeout(timer); // Cleanup debounce timer
  }, [jsonInput]); // Listens for 'jsonInputChanged' (state update)

  // Consumer: Error Display triggered by errors state change (validationResult)
  useEffect(() => {
    if (errors.length > 0) {
      console.log("Validation Errors:", errors); // Or update UI component
    } else if (jsonInput) {
      console.log("JSON is valid."); // Or update UI component
    }
  }, [errors, jsonInput]); // Listens for 'errorsChanged' (state update)


  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={handleInputChange} // Producer: Emits input changes
        placeholder="Enter JSON here..."
        rows={10}
        cols={50}
        className="border p-2 w-full"
      />
      {errors.length > 0 && (
        <div className="text-red-500 mt-2">
          <h3>Errors:</h3>
          <ul className="list-disc pl-5">
            {errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4">
        <h3>Formatted Output:</h3>
        <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded overflow-x-auto">
          <code>{formattedJson || '// Valid JSON output appears here'}</code>
        </pre>
      </div>
    </div>
  );
}

export default JsonFormatter;`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            This example uses React&apos;s state changes and <code>useEffect</code> hook to react to input.
            <code>useEffect</code> acts like an event listener, triggering validation/formatting logic whenever
            <code>jsonInput</code> changes. Error states then trigger UI updates. This mirrors the reactive nature of
            EDA.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Benefits of EDA for Formatters</h2>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">Responsiveness:</span> Real-time feedback as the user types, validation and
            formatting happen dynamically.
          </li>
          <li>
            <span className="font-medium">Decoupling:</span> Components don&apos;t need direct knowledge of each other.
            The editor doesn&apos;t care how many things listen to its input changes.
          </li>
          <li>
            <span className="font-medium">Modularity:</span> Different concerns (editing, formatting, validating,
            displaying errors, syntax highlighting) can be handled by separate modules that only interact via events.
          </li>
          <li>
            <span className="font-medium">Extensibility:</span> Adding new features (e.g., schema validation, difference
            view, dark mode toggle) is easier. You just add new listeners or event producers without modifying existing
            core logic.
          </li>
          <li>
            <span className="font-medium">Testability:</span> Individual modules can often be tested by triggering
            specific events or verifying the events they emit.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Challenges</h2>
        <p>While beneficial, EDA is not without its challenges:</p>
        <ul className="list-disc pl-6 space-y-3 my-4">
          <li>
            <span className="font-medium">Complexity:</span> The flow can be harder to follow than linear control flow.
            Debugging can be tricky ("Who triggered this event? Who is listening?").
          </li>
          <li>
            <span className="font-medium">Event Storms:</span> Care must be taken to avoid a single event triggering a
            cascade of many other events unnecessarily. Debouncing user input, as shown in the example, is a common
            technique.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Event-Driven Architecture provides a robust foundation for building interactive and responsive tools like JSON
          formatters. By treating user actions and system changes as events, developers can create decoupled, modular,
          and easily extensible applications that provide a smooth and dynamic user experience. Understanding these
          underlying principles helps appreciate the architecture that powers the tools we use daily.
        </p>
      </div>
    </>
  );
}
