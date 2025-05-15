import type { Metadata } from "next";
import {
  Mic,
  Cog,
  CodeXml,
  WandSparkles,
  ListTree,
  Check,
  Speech,
  Bug,
  LayoutList,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Voice Control for JSON Formatters: Implementation Guide | Offline Tools",
  description: "Learn how to implement voice control features for JSON formatting tools using Web Speech API.",
};

export default function VoiceControlJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Mic className="w-8 h-8" />
        Voice Control for JSON Formatters: Implementation Guide
      </h1>

      <div className="space-y-6">
        <p>
          Enhancing developer tools with accessibility features can significantly improve productivity and user experience. Voice control, powered by browser-native APIs like the Web Speech API, offers a hands-free way to interact with applications. This guide explores how to integrate voice commands into a JSON formatting tool, allowing users to trigger formatting, sorting, collapsing, and other actions simply by speaking.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Cog className="w-6 h-6" />
          Core Technologies
        </h2>
        <p>
          Implementing voice control primarily relies on the browser&apos;s built-in
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1 mr-1">Web Speech API</a>. This API provides two main interfaces: Speech Recognition (for converting speech to text) and Speech Synthesis (for converting text to speech). For voice control, we&apos;ll focus on the
          <code>SpeechRecognition</code> interface.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>
              <code>SpeechRecognition</code>:
            </strong>
            Captures audio input from the microphone and processes it to produce a text string of what was said. This is the heart of the command interpretation.
          </li>
          <li>
            <strong>JavaScript/TypeScript:</strong> To orchestrate the process, handle events, and trigger the formatting logic.
          </li>
          <li>
            <strong>Your JSON Formatter Logic:</strong> Existing functions or methods in your tool that perform the actual formatting, sorting, collapsing, etc.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Mic className="w-6 h-6" />
          Capturing Voice Input with <code>SpeechRecognition</code>
        </h2>
        <p>
          The first step is to instantiate the <code>SpeechRecognition</code> object and configure it. Basic setup involves creating an instance and defining event handlers, particularly for the <code>result</code> event, which fires when recognition is successful.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Speech className="w-5 h-5" />
            Basic <code>SpeechRecognition</code> Setup:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Ensure the browser supports the API
if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
  console.error('Speech Recognition not supported in this browser.');
} else {
  const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Optional: Configure recognition settings
  recognition.continuous = false; // Set to true for continuous listening
  recognition.interimResults = false; // Set to true to get interim results
  recognition.lang = 'en-US'; // Set language

  // Event handler for successful recognition
  recognition.onresult = (event) => &#x7b;
    // Get the transcript from the results
    const transcript = event.results[0][0].transcript;
    console.log('Voice command received:', transcript);
    // Process the transcript
    processVoiceCommand(transcript);
  &#x7d;;

  // Event handler for errors
  recognition.onerror = (event) => &#x7b;
    console.error('Speech recognition error:', event.error);
  &#x7d;;

  // Event handler when recognition ends
  recognition.onend = () => &#x7b;
    console.log('Speech recognition ended.');
    // Optional: Restart recognition if continuous is false
    // recognition.start();
  &#x7d;;

  // Function to start recognition
  const startRecognition = () => &#x7b;
    try &#x7b;
      recognition.start();
      console.log('Listening for commands...');
    &#x7d; catch (e) &#x7b;
      console.error('Error starting recognition:', e);
    &#x7d;
  &#x7d;;

  // You would typically call startRecognition() when a button is clicked
  // or when a specific mode is activated.
  // Example: const startButton = document.getElementById('start-voice');
  // if (startButton) &#x7b;
  //   startButton.addEventListener('click', startRecognition);
  // &#x7d;
}

// Placeholder function for processing the recognized text
function processVoiceCommand(commandText: string) &#x7b;
  console.log("Processing command:", commandText);
  // This function will contain the logic to map text to formatter actions.
&#x7d;
`}
            </pre>
          </div>
        </div>

        <p>
          Key properties and methods to be aware of:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <code>
              <strong>start()</strong>
            </code>
            : Begins the speech recognition service, listening through the device&apos;s microphone.
          </li>
          <li>
            <code>
              <strong>stop()</strong>
            </code>
            : Stops the speech recognition service from listening.
          </li>
          <li>
            <code>
              <strong>abort()</strong>
            </code>
            : Stops the speech recognition service immediately, canceling any pending result.
          </li>
          <li>
            <code>
              <strong>onresult</strong>
            </code>
            : An event handler fired when the speech recognition service returns a result — a word or phrase has been successfully recognized.
          </li>
          <li>
            <code>
              <strong>onerror</strong>
            </code>
            : An event handler fired when a speech recognition error occurs.
          </li>
          <li>
            <code>
              <strong>onend</strong>
            </code>
            : An event handler fired when the speech recognition service has disconnected.
          </li>
          <li>
            <code>
              <strong>continuous</strong>
            </code>
            : A boolean property controlling whether the recognition ends after the first result is obtained (<code>false</code>) or continues until <code>stop()</code> is called (<code>true</code>). For distinct commands, <code>false</code> is often simpler initially.
          </li>
          <li>
            <code>
              <strong>interimResults</strong>
            </code>
            : A boolean property indicating whether interim results should be returned (<code>true</code>) or only final results (<code>false</code>). For command processing, final results are usually sufficient.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <CodeXml className="w-6 h-6" />
          Processing and Mapping Voice Commands
        </h2>
        <p>
          Once you receive the recognized <code>transcript</code> in the <code>onresult</code> handler, the next critical step is to interpret this text and map it to specific actions within your JSON formatter. This involves designing a set of voice commands your tool will understand.
        </p>
        <p>
          A simple approach is to use conditional logic (<code>if/else if</code> or a <code>switch</code> statement) to check the recognized phrase against a predefined list of commands.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <WandSparkles className="w-5 h-5" />
            Simple Command Mapping Logic:
          </h3>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// Assume these functions exist in your JSON formatter
// function formatJson() &#x7b; ... &#x7d;
// function sortJsonKeys() &#x7b; ... &#x7d;
// function collapseAllNodes() &#x7b; ... &#x7d;
// function expandLevel(level: number) &#x7b; ... &#x7d;
// function toggleDarkMode() &#x7b; ... &#x7d;

function processVoiceCommand(commandText: string) &#x7b;
  const lowerCaseCommand = commandText.toLowerCase().trim();
  console.log("Processing command:", lowerCaseCommand);

  if (lowerCaseCommand === "format json" || lowerCaseCommand === "format document") &#x7b;
    console.log("Executing: Format JSON");
    // Call your formatting function
    // formatJson();
  &#x7d; else if (lowerCaseCommand === "sort keys") &#x7b;
    console.log("Executing: Sort Keys");
    // Call your sort function
    // sortJsonKeys();
  &#x7d; else if (lowerCaseCommand === "collapse all") &#x7b;
    console.log("Executing: Collapse All");
    // Call your collapse function
    // collapseAllNodes();
  &#x7d; else if (lowerCaseCommand.startsWith("expand level ")) &#x7b;
    const levelStr = lowerCaseCommand.replace("expand level ", "").trim();
    const level = parseInt(levelStr, 10);
    if (!isNaN(level) && level > 0) &#x7b;
      console.log(\`Executing: Expand Level \${level}\`);
      // Call your expand function with the level
      // expandLevel(level);
    &#x7d; else &#x7b;
      console.warn("Could not parse expansion level from command:", commandText);
      // Optionally provide voice feedback for invalid command
    &#x7d;
  &#x7d; else if (lowerCaseCommand === "toggle dark mode") &#x7b;
     console.log("Executing: Toggle Dark Mode");
     // Call your theme toggling function
     // toggleDarkMode();
  &#x7d; else &#x7b;
    console.warn("Unknown voice command:", commandText);
    // Optionally provide voice feedback for unknown command
  &#x7d;
}
`}
            </pre>
          </div>
        </div>

        <p>
          For more complex command structures or variations in phrasing, you might consider more sophisticated parsing techniques, such as regular expressions or a simple command grammar, but for common formatter actions, direct string matching is often sufficient.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <LayoutList className="w-6 h-6" />
          Examples of Voice Commands and Actions
        </h2>
        <p>
          Here are some practical voice commands you could implement for a JSON formatter:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Format JSON&quot;</strong> or <strong>&quot;Format Document&quot;:</strong> Triggers the main JSON formatting function to pretty-print the code.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Sort Keys&quot;:</strong> Rearranges keys in objects alphabetically.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Collapse All&quot;:</strong> Folds all collapsible nodes in the JSON tree view.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Expand All&quot;:</strong> Unfolds all collapsible nodes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Expand Level [number]&quot;</strong> (e.g., &quot;Expand Level 2&quot;): Expands nodes up to a specific nesting depth.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Copy JSON&quot;:</strong> Copies the current formatted JSON to the clipboard.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <strong>&quot;Clear Input&quot;:</strong> Clears the JSON input area.
            </span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Bug className="w-6 h-6" />
          Challenges and Considerations
        </h2>
        <p>
          While adding voice control can be powerful, it comes with challenges:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Accuracy:</strong> Speech recognition is not perfect. Accents, background noise, and similar-sounding words can lead to incorrect transcriptions. Consider handling common variations for commands.
          </li>
          <li>
            <strong>Browser Support:</strong> The Web Speech API has varying levels of support and implementation details across browsers. Always include a feature check and potentially provide a fallback or informative message.
          </li>
          <li>
            <strong>User Experience:</strong> Provide clear visual feedback when the tool is listening
            <Volume2 className="inline w-5 h-5 mx-1" />
            and when a command is recognized or misunderstood
            <VolumeX className="inline w-5 h-5 mx-1" />. Decide on a clear way for users to activate/deactivate listening.
          </li>
          <li>
            <strong>Privacy:</strong> Using the microphone requires user permission and involves sending audio data to the browser&apos;s underlying speech recognition service (which may be cloud-based). Be transparent with users about microphone usage.
          </li>
          <li>
            <strong>Performance:</strong> Continuous recognition can consume battery and resources, especially on mobile devices.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Advanced Concepts
        </h2>
        <p>
          For more robust implementations:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Grammars:</strong> Some Speech Recognition implementations allow defining a specific grammar using
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechGrammarList" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1 mr-1">SpeechGrammarList</a>. This can improve accuracy for expected phrases by biasing the recognition engine.
          </li>
          <li>
            <strong>Continuous Recognition:</strong> Setting <code>recognition.continuous = true</code> allows the service to listen for multiple commands without needing to restart it manually after each phrase. You&apos;d need logic to determine when one command ends and the next begins (often based on pauses).
          </li>
          <li>
            <strong>Voice Feedback:</strong> Use the Speech Synthesis API to have the tool speak confirmations or error messages back to the user.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <ListTree className="w-6 h-6" />
          Integration with Formatter Logic
        </h2>
        <p>
          The <code>processVoiceCommand</code> function should interact with your formatter&apos;s internal state and logic. This might involve:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Retrieving the current JSON text from an input area or internal state.
          </li>
          <li>
            Calling a function that parses, formats, or transforms the JSON string or its Abstract Syntax Tree (AST).
          </li>
          <li>
            Updating the displayed output or tree view with the result.
          </li>
          <li>
            Modifying UI state (like dark mode) or component properties (like tree expansion levels).
          </li>
        </ul>
        <p>
          Ensure your formatter logic is modular and can be easily triggered by function calls based on the recognized voice commands.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-6 h-6" />
          Conclusion
        </h2>
        <p>
          Adding voice control to a JSON formatter, while presenting some implementation nuances and browser compatibility considerations, is a feasible project using the Web Speech API. It provides a novel and potentially more accessible way for users to interact with your tool, performing common actions hands-free. By carefully mapping voice commands to your existing formatter functions and providing clear user feedback, you can create a powerful and enhanced user experience.
        </p>
      </div>
    </>
  );
}
