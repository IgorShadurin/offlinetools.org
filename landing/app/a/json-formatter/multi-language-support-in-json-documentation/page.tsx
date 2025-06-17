import type { Metadata } from "next";
import { Languages, FileJson2, Folder, CheckCheck, X, Info, Cog, Scale, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Multi-Language Support in JSON Documentation | Offline Tools",
  description:
    "Explore different strategies for incorporating multi-language support into documentation stored and managed using JSON.",
};

export default function MultiLanguageJsonDocumentationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Languages className="w-8 h-8" />
        Multi-Language Support in JSON Documentation
      </h1>

      <div className="space-y-6 text-lg">
        <p>
          In today&apos;s global development landscape, providing documentation in multiple languages is crucial for
          reaching a wider audience and ensuring clarity for developers worldwide. While traditional documentation
          formats often rely on dedicated localization workflows, storing documentation content within structured data
          like JSON offers interesting possibilities for managing translations. This article explores different
          approaches for implementing multi-language support when your documentation content is primarily stored in JSON
          format.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          Why JSON for Documentation?
          <FileJson2 className="w-6 h-6" />
        </h2>
        <p>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and
          write and easy for machines to parse and generate. Using JSON for documentation can be beneficial for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Automation:</strong> Easily parse and process documentation content programmatically.
          </li>
          <li>
            <strong>Consistency:</strong> Enforce a consistent structure for different documentation sections or
            components.
          </li>
          <li>
            <strong>Integration:</strong> Integrate documentation content directly into applications, tools, or APIs.
          </li>
          <li>
            <strong>Version Control:</strong> Manage documentation changes alongside code in standard version control
            systems.
          </li>
        </ul>
        <p>
          However, JSON itself doesn&apos;t have built-in features for localization. We need to design a structure
          within the JSON to accommodate multiple languages.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          Approach 1: Separate JSON Files per Language
          <Folder className="w-6 h-6" />
        </h2>
        <p>
          This is perhaps the most straightforward approach. You maintain completely separate JSON files for each
          supported language. Each file follows the same structure but contains content translated into the respective
          language.
        </p>

        <h3 className="text-xl font-semibold mt-6">File Structure Example:</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`docs/
├── en/
│   └── api_errors.json
├── es/
│   └── api_errors.json
└── fr/
    └── api_errors.json`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">JSON File Example (en/api_errors.json):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "title": "API Error Codes",
  "description": "Detailed explanation of common API error codes.",
  "errors": [
    {
      "code": 400,
      "name": "Bad Request",
      "message": "The request was malformed or invalid."
    },
    {
      "code": 401,
      "name": "Unauthorized",
      "message": "Authentication is required and has failed or has not yet been provided."
    }
  ]
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">JSON File Example (es/api_errors.json):</h3>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "title": "Códigos de Error de la API",
  "description": "Explicación detallada de los códigos de error comunes de la API.",
  "errors": [
    {
      "code": 400,
      "name": "Solicitud Incorrecta",
      "message": "La solicitud estaba mal formada o no era válida."
    },
    {
      "code": 401,
      "name": "No Autorizado",
      "message": "Se requiere autenticación y ha fallado o aún no se ha proporcionado."
    }
  ]
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Advantages
          <CheckCheck className="w-5 h-5 text-green-500" />
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Simplicity:</strong> Each file is self-contained and easy to manage for translators.
          </li>
          <li>
            <strong>Clear Separation:</strong> Content and its translations are completely separate.
          </li>
          <li>
            <strong>Loading Efficiency:</strong> You only load the data needed for the active language.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Disadvantages
          <X className="w-5 h-5 text-red-500" />
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Synchronization:</strong> Keeping the structure of files consistent across all languages can be
            challenging as documentation evolves.
          </li>
          <li>
            <strong>Redundancy:</strong> Non-translatable data (like error codes) is duplicated in every file.
          </li>
          <li>
            <strong>Discovery:</strong> Harder to see all translations for a single piece of content side-by-side.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          Approach 2: Single JSON File with Language Keys
          <FileJson2 className="w-6 h-6" />
        </h2>
        <p>
          In this approach, you keep all language versions of a piece of content within a single JSON file or structure,
          typically nested under language keys (e.g., &quot;en&quot;, &quot;es&quot;, &quot;fr&quot;).
        </p>
        <p>This can be done at different levels:</p>

        <h3 className="text-xl font-semibold mt-6">Option A: Language Keys per Translatable String</h3>
        <p>Wrap each individual translatable string value in an object that contains language keys.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "title": {
    "en": "API Error Codes",
    "es": "Códigos de Error de la API",
    "fr": "Codes d'Erreur API"
  },
  "description": {
    "en": "Detailed explanation of common API error codes.",
    "es": "Explicación detallada de los códigos de error comunes de la API.",
    "fr": "Explication détaillée des codes d'erreur API courants."
  },
  "errors": [
    {
      "code": 400,
      "name": {
        "en": "Bad Request",
        "es": "Solicitud Incorrecta",
        "fr": "Mauvaise Requête"
      },
      "message": {
        "en": "The request was malformed or invalid.",
        "es": "La solicitud estaba mal formada o no era válida.",
        "fr": "La requête était mal formée ou invalide."
      }
    }
    // ... more errors
  ]
}`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-6">Option B: Language Keys Grouping Top-Level Content</h3>
        <p>Group the entire structure of the document under a top-level language key.</p>
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-x-auto">
          <pre>
            {`{
  "en": {
    "title": "API Error Codes",
    "description": "Detailed explanation of common API error codes.",
    "errors": [
      {
        "code": 400,
        "name": "Bad Request",
        "message": "The request was malformed or invalid."
      }
      // ... more errors
    ]
  },
  "es": {
    "title": "Códigos de Error de la API",
    "description": "Explicación detallada de los códigos de error comunes de la API.",
    "errors": [
      {
        "code": 400,
        "name": "Solicitud Incorrecta",
        "message": "La solicitud estaba mal formada o no era válida."
      }
      // ... more errors
    ]
  }
  // ... other languages
}`}
          </pre>
        </div>
        <p className="flex items-start gap-2">
          <Info className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
          Option B is often cleaner as it keeps the core document structure consistent at the top level, only branching
          for languages.
        </p>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Advantages
          <CheckCheck className="w-5 h-5 text-green-500" />
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Centralized:</strong> All language content for a specific document is in one place, easier for
            translators using tools.
          </li>
          <li>
            <strong>Structure Consistency:</strong> The base structure is maintained across languages.
          </li>
          <li>
            <strong>Reduced Redundancy (Option B):</strong> Non-translatable keys/values (like error codes) can
            potentially exist once outside language keys if the structure allows, or are simply part of the repeated
            structure.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 flex items-center gap-2">
          Disadvantages
          <X className="w-5 h-5 text-red-500" />
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>File Size:</strong> The JSON files can become very large as more languages are added.
          </li>
          <li>
            <strong>Loading Overhead:</strong> You load data for *all* languages even if only one is needed (though
            parsing can be optimized).
          </li>
          <li>
            <strong>Complexity (Option A):</strong> Deeply nested structures with language keys on every string can be
            verbose.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          Implementation Considerations
          <Cog className="w-6 h-6" />
        </h2>
        <p>
          Regardless of the JSON structure you choose, you&apos;ll need logic to handle language selection and data
          retrieval.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Loading Data:</strong>
            <ul className="list-circle pl-6 space-y-1 mt-1">
              <li>
                For separate files: Load the specific JSON file corresponding to the active locale (e.g.,{" "}
                <code>/docs/en/api_errors.json</code>).
              </li>
              <li>
                For single files with language keys: Load the single JSON file and then access the data under the key
                matching the active locale (e.g., <code>data[&apos;en&apos;]</code>).
              </li>
            </ul>
          </li>
          <li>
            <strong>Locale Detection:</strong> Determine the user&apos;s preferred language from browser settings, URL
            parameters, user profile, etc.
          </li>
          <li>
            <strong>Fallback Language:</strong> Define a default language (e.g., &quot;en&quot;) to use if the
            user&apos;s preferred language is not available.
          </li>
          <li>
            <strong>Data Access:</strong> Your application code will need to retrieve values based on the active
            language. For Option A (language keys per string), this might involve a helper function like{" "}
            <code>getText(key, locale)</code> that looks up <code>data[key][locale]</code> with a fallback. For Option B
            (top-level language keys), you&apos;d first select the language block <code>data[locale]</code> and then
            access keys within that block.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          Choosing the Right Approach
          <Scale className="w-6 h-6" />
        </h2>
        <p>The best approach depends on your specific needs and scale:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Separate Files:</strong> Suitable for smaller projects, when content types vary significantly
            between &quot;documents&quot;, or when translation workflows are file-based. Offers good performance for
            loading only necessary data.
          </li>
          <li>
            <strong>Single File (Option B):</strong> Good for larger projects with many similar documents/components,
            where centralized translation is preferred, and where the size of the combined file is manageable.
            Simplifies structure management.
          </li>
          <li>
            <strong>Single File (Option A):</strong> Can work for simple, flat structures like configuration files, but
            quickly becomes cumbersome for complex, nested documentation structures.
          </li>
        </ul>
        <p className="flex items-start gap-2">
          <Info className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
          Consider using standard{" "}
          <a
            href="https://en.wikipedia.org/wiki/ISO_639-1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            ISO 639-1 locale codes
          </a>{" "}
          (like &quot;en&quot;, &quot;es&quot;, &quot;fr&quot;, &quot;de&quot;) as your language keys or directory names
          for consistency and compatibility with i18n tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center gap-3">
          Conclusion
          <BookOpen className="w-6 h-6" />
        </h2>
        <p>
          Managing multi-language documentation within JSON requires careful consideration of your data structure. Both
          maintaining separate files per language and consolidating into a single file with language keys are viable
          strategies, each with its own set of trade-offs regarding manageability, synchronization, and performance. By
          choosing an approach that aligns with your project&apos;s size, complexity, and translation workflow, you can
          effectively leverage the benefits of JSON for structured documentation while serving a global audience.
        </p>
      </div>
    </>
  );
}
