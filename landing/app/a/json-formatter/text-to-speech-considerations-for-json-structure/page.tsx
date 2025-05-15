import type { Metadata } from "next";
import { BookText, Mic, Volume2, Braces, List, LayoutGrid } from "lucide-react"; // Import allowed icons

export const metadata: Metadata = {
  title: "Text-to-Speech Considerations for JSON Structure",
  description:
    "Learn how the structure of your JSON data can impact Text-to-Speech (TTS) output and how to design JSON for better auditory experiences.",
};

export default function TtsJsonConsiderationsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-3">
        <BookText size={36} className="text-blue-500" />
        <span>Text-to-Speech Considerations for JSON Structure</span>
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          When designing APIs or data structures, JSON is ubiquitous for its flexibility and human-readability. However, if this data is intended to be consumed by a Text-to-Speech (TTS) engine, its structure, naming conventions, and content directly influence the auditory experience. Understanding these considerations is crucial for developers aiming to create accessible and user-friendly applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Mic size={28} className="text-green-500" />
          <span>How JSON Becomes Speech</span>
        </h2>
        <p>
          A TTS engine fundamentally processes text. When presented with JSON, the application using the engine must decide *which* text within the JSON should be read aloud and in what order. Common approaches involve:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Reading specific keys or values identified by the application logic.</li>
          <li>Linearizing the entire JSON structure (less common for complex data).</li>
          <li>Using conventions to identify fields meant for TTS.</li>
        </ul>
        <p>
          The structure of your JSON dictates how easily and meaningfully this extraction and linearization can occur.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Volume2 size={28} className="text-purple-500" />
          <span>Impact of Basic Data Types</span>
        </h2>
        <p>
          Different JSON data types are typically handled by TTS engines as follows:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Strings:</strong> Read directly. This is the primary way to convey spoken information.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code>{`{ "message": "Hello, world!" }`}</code></pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Might be read as: "Hello, world!" (if only the value is read).</p>
            </div>
          </li>
          <li>
            <strong>Numbers:</strong> Read as spoken numbers. Large numbers, decimals, or scientific notation might be handled differently depending on the engine.
            <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code>{`{ "price": 45.75, "count": 1200 }`}</code></pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Might be read as: "forty-five point seventy-five", "twelve hundred".</p>
            </div>
          </li>
          <li>
            <strong>Booleans (`true`, `false`):</strong> Read as the words "true" or "false".
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code>{`{ "is_active": true }`}</code></pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Might be read as: "true".</p>
            </div>
          </li>
           <li>
            <strong>Null (`null`):</strong> Typically read as "null" or sometimes ignored, depending on implementation. Avoid relying on it for critical information.
             <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
              <pre><code>{`{ "value": null }`}</code></pre>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Might be read as: "null".</p>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <LayoutGrid size={28} className="text-orange-500" />
          <span>Objects: Keys, Values, and Nesting</span>
        </h2>
        <p>
          Objects introduce complexity. The decision of whether to read *keys*, *values*, or *both* significantly impacts verbosity.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Reading only values: Concise but might lose context. Example: `{` "name": "Alice", "age": 30 `}` read as "Alice thirty".
          </li>
           <li>
            Reading key-value pairs: Provides context but can be verbose. Example: "name Alice age thirty". This is often preferable for screen readers.
          </li>
        </ul>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <pre><code>{`{
  "user": {
    "first_name": "Bob",
    "last_name": "Smith"
  },
  "status": "online"
}`}</code></pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Potential readings (depending on logic):<br/>
            - Values only: "Bob Smith online"<br/>
            - Key-value pairs: "user object first name Bob last name Smith status online"<br/>
            - Selected values: "Bob Smith is online" (requires more complex application logic)
          </p>
        </div>
        <p>
          Deep nesting can make the linear reading of key-value pairs confusing, as the user has to remember the path (e.g., "user object address object street name...").
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
           <List size={28} className="text-teal-500" />
          <span>Arrays: Lists and Sequences</span>
        </h2>
         <p>
          Arrays represent lists of items. The TTS output should clearly indicate the start and end of the list and read each item sequentially.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <pre><code>{`{
  "items": [
    "Apple",
    "Banana",
    "Cherry"
  ]
}`}</code></pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Potential reading:<br/>
            "items list: Apple, Banana, Cherry." (The application might add "list:" and commas/pauses)
          </p>
        </div>
        <p>
          Arrays of objects require reading each object within the array, often reading key-value pairs for each item.
        </p>
         <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <pre><code>{`{
  "products": [
    { "name": "Laptop", "price": 1200 },
    { "name": "Mouse", "price": 25 }
  ]
}`}</code></pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Potential reading:<br/>
            "products list: item 1, name Laptop price twelve hundred. item 2, name Mouse price twenty-five." (Again, application logic provides structure like "item 1:")
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
           <Braces size={28} className="text-red-500" />
          <span>Adding TTS-Specific Metadata</span>
        </h2>
        <p>
          For optimal control over the auditory experience, you can embed specific hints or alternative text within your JSON structure, using conventions or dedicated fields. This is often the most robust approach for complex or critical TTS output.
        </p>
        <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <h3 className="text-lg font-medium">Example with dedicated TTS field:</h3>
           <pre><code>{`{
  "location": {
    "name": "1600 Amphitheatre Parkway",
    "tts_text": "the sixteen hundred block of Amphitheater Parkway"
  },
  "status": "ETA 15 minutes",
  "tts_text": "Estimated time of arrival is 15 minutes"
}`}</code></pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Here, `tts_text` fields provide cleaner, more natural phrases for TTS, while the original fields retain data in a machine-readable format. The application would check for `tts_text` and use it if present, otherwise fallback to processing the original value or key-value pair.
          </p>
        </div>
         <div className="bg-gray-100 p-3 rounded-lg dark:bg-gray-800 my-2">
          <h3 className="text-lg font-medium">Example with pronunciation/pause hints (conceptual):</h3>
           <pre><code>{`{
  "greeting": "Hi Via!",
  "tts_hints": {
    "greeting": {
      "text": "Hi Via!",
      "ssml": "<speak>Hi <phoneme alphabet='ipa' ph='ˈviː.ə'>Via</phoneme>!</speak>",
      "pause_after_ms": 500
    }
  }
}`}</code></pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Using SSML (Speech Synthesis Markup Language) or custom hint structures within the JSON gives fine-grained control, although it requires the TTS engine or an intermediate layer to support parsing these hints.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center space-x-2">
          <Volume2 size={28} className="text-purple-500" /> {/* Reusing icon */}
          <span>Best Practices and Considerations</span>
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Prioritize Information:</strong> If only certain fields are critical for auditory users, structure the JSON or design application logic to easily identify and read these fields first.
          </li>
          <li>
            <strong>Keep Structures Simple:</strong> Avoid excessive nesting if the data needs to be read linearly. Flatter structures are easier for TTS applications to process sequentially.
          </li>
          <li>
            <strong>Use Clear, Speakable Keys:</strong> If keys are going to be read, use names that are easily pronounceable (e.g., `first_name` rather than `fname`). Avoid jargon or abbreviations.
          </li>
           <li>
            <strong>Provide Context:</strong> Use application logic to add contextual phrases when reading values (e.g., reading `{` "temperature": 25 `}` as "temperature 25 degrees Celsius"). Consider adding units or labels explicitly in the JSON if needed.
          </li>
           <li>
            <strong>Handle Lists Explicitly:</strong> Design the application to announce the start/end of lists and perhaps the item number, making arrays easier to follow.
          </li>
           <li>
            <strong>Embed TTS Text:</strong> For critical or complex phrases, provide a dedicated field with pre-written text optimized for speech rather than relying solely on the engine interpreting raw data values or concatenating parts.
          </li>
           <li>
            <strong>Consider Localization:</strong> If your application is multilingual, ensure the TTS text or hints are available in the appropriate language.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          While JSON provides a flexible structure for data exchange, its design can significantly impact how effectively that data can be conveyed via Text-to-Speech. By considering how different data types, object structures, and arrays might be interpreted, and by potentially adding TTS-specific metadata, developers can create JSON structures that lead to clearer, more intuitive, and more accessible auditory experiences for users. Designing with TTS in mind from the outset is far easier than retrofitting a structure not built for speech.
        </p>
      </div>
    </div>
  );
}