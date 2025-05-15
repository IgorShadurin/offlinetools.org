import type { Metadata } from "next";
import {
  Type, Hash, CheckSquare, List, Folders, GitBranch, Tag, Lock, Settings, Info
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visual Design Patterns for JSON Schema Options",
  description:
    "Explore effective visual design patterns for building user interfaces based on JSON Schema definitions, specifically for configuration or options.",
};

export default function JsonSchemaVisualPatternsArticle() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Visual Design Patterns for JSON Schema Options
      </h1>

      <div className="space-y-8 text-lg leading-relaxed">
        <p>
          JSON Schema is a powerful tool for describing the structure and constraints of JSON data.
          It&apos;s widely used for data validation, API documentation, and, increasingly, for driving user interfaces,
          especially for configuration screens, forms, or settings panels where users need to define structured data.
        </p>
        <p>
          When building UIs from a JSON Schema, the challenge is translating the abstract, machine-readable schema
          into intuitive and user-friendly visual components. This article explores common visual design patterns
          for representing various JSON Schema features and data types in a UI, helping developers of all levels
          create more effective interfaces.
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
          Mapping Schema Types to UI Components
        </h2>
        <p>
          The core of designing a UI from JSON Schema is choosing the right input or display component for each schema type.
          Here are some standard mappings and variations:
        </p>

        {/* String Type */}
        <div className="flex items-start space-x-4">
          <Type size={28} className="mt-1 text-blue-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">String (&#x60;type: &quot;string&quot;&#x60;)</h3>
            <p className="mb-4">
              Strings are the most versatile type and can be represented by various UI elements depending on their constraints (&#x60;format&#x60;, &#x60;enum&#x60;, &#x60;minLength&#x60;, &#x60;maxLength&#x60;, &#x60;pattern&#x60;).
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Single-line Text Input:</strong> The default for general strings (&#x60;&lt;input type=&quot;text&quot;&gt;&#x60;). Use &#x60;minLength&#x60;/&#x60;maxLength&#x60; for character limits.
              </li>
              <li>
                <strong>Textarea:</strong> For multi-line strings, often indicated by a suggestion in the schema or context (&#x60;&lt;textarea&gt;&#x60;).
              </li>
              <li>
                <strong>Select/Dropdown:</strong> When &#x60;enum&#x60; is defined, offering a fixed list of string values (&#x60;&lt;select&gt;&#x60;).
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "string",
  "enum": ["red", "green", "blue"],
  "description": "Choose a color"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Radio Buttons:</strong> Also for &#x60;enum&#x60;, especially when the list is short (e.g., 2-4 options).
              </li>
              <li>
                <strong>Date/Time/Color Input:</strong> When &#x60;format&#x60; hints at a specific data type like &#x60;date&#x60;, &#x60;date-time&#x60;, &#x60;time&#x60;, &#x60;email&#x60;, &#x60;url&#x60;, or &#x60;color&#x60;. Use specific input types (e.g., &#x60;&lt;input type=&quot;date&quot;&gt;&#x60;, &#x60;&lt;input type=&quot;color&quot;&gt;&#x60;).
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "string",
  "format": "email",
  "description": "Enter your email address"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>File Input:</strong> Sometimes strings might represent file paths or URLs, but for file uploads, a dedicated file input (&#x60;&lt;input type=&quot;file&quot;&gt;&#x60;) is more appropriate. Schema might use a custom &#x60;format&#x60; or context.
              </li>
              <li>
                <strong>Password Input:</strong> For sensitive string data (&#x60;&lt;input type=&quot;password&quot;&gt;&#x60;). Often indicated by key names (&#x60;password&#x60;) or context.
              </li>
            </ul>
          </div>
        </div>

        {/* Number & Integer Types */}
        <div className="flex items-start space-x-4">
          <Hash size={28} className="mt-1 text-green-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Number &amp; Integer (&#x60;type: &quot;number&quot;&#x60; / &#x60;&quot;integer&quot;&#x60;)</h3>
            <p className="mb-4">
              Numeric types are best represented by inputs that enforce numerical values and respect range constraints (&#x60;minimum&#x60;, &#x60;maximum&#x60;, &#x60;exclusiveMinimum&#x60;, &#x60;exclusiveMaximum&#x60;, &#x60;multipleOf&#x60;).
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Number Input:</strong> The standard (&#x60;&lt;input type=&quot;number&quot;&gt;&#x60;). Use &#x60;min&#x60;, &#x60;max&#x60;, and &#x60;step&#x60; attributes based on schema constraints.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "integer",
  "minimum": 1,
  "maximum": 100,
  "description": "Enter an integer between 1 and 100"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Slider / Range Input:</strong> Ideal when the range is well-defined and granular control isn&apos;t strictly necessary, offering a visual selection (&#x60;&lt;input type=&quot;range&quot;&gt;&#x60;).
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "number",
  "minimum": 0,
  "maximum": 1,
  "format": "float", // Or just implied by type: "number"
  "description": "Adjust the transparency (0.0 to 1.0)"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Stepper:</strong> A number input with increment/decrement buttons, useful for integer values with a clear step (&#x60;multipleOf&#x60;).
              </li>
            </ul>
          </div>
        </div>

        {/* Boolean Type */}
        <div className="flex items-start space-x-4">
          <CheckSquare size={28} className="mt-1 text-red-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Boolean (&#x60;type: &quot;boolean&quot;&#x60;)</h3>
            <p className="mb-4">
              Booleans are typically represented by controls that have two states: true/false, on/off, yes/no.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Checkbox:</strong> The most common representation (&#x60;&lt;input type=&quot;checkbox&quot;&gt;&#x60;).
              </li>
              <li>
                <strong>Toggle Switch:</strong> A visually distinct component for on/off states, often used for settings that take immediate effect.
              </li>
              <li>
                <strong>Radio Buttons:</strong> Using &quot;Yes&quot; and &quot;No&quot; labels, sometimes clearer than a single checkbox, especially if the phrasing is complex.
              </li>
            </ul>
          </div>
        </div>

        {/* Array Type */}
        <div className="flex items-start space-x-4">
          <List size={28} className="mt-1 text-yellow-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Array (&#x60;type: &quot;array&quot;&#x60;)</h3>
            <p className="mb-4">
              Arrays represent lists of items. The visual pattern depends heavily on the type of items (&#x60;items&#x60;) and constraints like &#x60;minItems&#x60; and &#x60;maxItems&#x60;.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>List Input (Add/Remove):</strong> For simple item types (strings, numbers, booleans), display items as a list with buttons to add new items and remove existing ones.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "array",
  "items": { "type": "string" },
  "description": "List of tags"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Tag Input:</strong> A specific pattern for arrays of strings, where items are displayed as &quot;tags&quot; inside a container with an input for adding new ones.
              </li>
              <li>
                <strong>Table:</strong> For arrays where &#x60;items&#x60; is an &#x60;object&#x60; type. Each object in the array becomes a row, and object properties become columns. Includes buttons to add/remove rows.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "age": { "type": "integer" }
    }
  },
  "description": "List of people"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Reorderable List:</strong> If item order matters, allow drag-and-drop or up/down arrows to change item positions.
              </li>
              <li>
                <strong>Fixed Tuple:</strong> If &#x60;items&#x60; is an array of schemas (tuple validation), display fixed inputs for each item type.
              </li>
            </ul>
          </div>
        </div>

        {/* Object Type */}
        <div className="flex items-start space-x-4">
          <Folders size={28} className="mt-1 text-purple-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Object (&#x60;type: &quot;object&quot;&#x60;)</h3>
            <p className="mb-4">
              Objects represent structured data with named properties. They typically translate into nested forms or sections.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Nested Form/Fieldset:</strong> Display the object&apos;s properties as inputs within a clearly defined section (e.g., using &#x60;&lt;fieldset&gt;&#x60; with a &#x60;&lt;legend&gt;&#x60; or a simple container with a heading).
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "object",
  "properties": {
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" }
      }
    },
    "phone": { "type": "string" }
  }
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Accordion or Tabs:</strong> For objects with many properties, group related properties into collapsible sections (accordion) or separate panes (tabs) to manage complexity.
              </li>
              <li>
                <strong>Conditional Fields:</strong> Use schema keywords like &#x60;dependencies&#x60; or logic within &#x60;if&#x60;/&#x60;then&#x60;/&#x60;else&#x60; to show/hide fields based on the values of other fields within the object.
              </li>
              <li>
                <strong>Key-Value Pairs:</strong> If &#x60;additionalProperties&#x60; is used without a strict schema for known properties, a flexible interface to add/remove arbitrary key-value string pairs might be suitable.
              </li>
            </ul>
          </div>
        </div>

        {/* Null Type */}
        {/* Omitted as it's less common for direct input */}
        {/* <div className="flex items-start space-x-4">
          <Info size={28} className="mt-1 text-gray-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Null (`type: &quot;null&quot;`)</h3>
            <p className="mb-4">
              The `null` type indicates that the value must be exactly `null`. This is less common for user input controls directly.
            </p>
            <p>
              Often, the possibility of a value being `null` is represented by allowing an input to be empty or by including `null` in a `type` array (`["string", "null"]`) or an `enum` list (`["value", null]`).
            </p>
          </div>
        </div> */}


        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
          Patterns for Combinators (&#x60;oneOf&#x60;, &#x60;anyOf&#x60;, &#x60;allOf&#x60;, &#x60;not&#x60;)
        </h2>
        <p>
          Combinators allow defining complex constraints or multiple possible schemas for a single data point.
          Translating these into a UI requires patterns that handle alternatives or merging properties.
        </p>

        {/* Combinators */}
        <div className="flex items-start space-x-4">
          <GitBranch size={28} className="mt-1 text-orange-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">&#x60;oneOf&#x60; / &#x60;anyOf&#x60;</h3>
            <p className="mb-4">
              These indicate that the data must match one or more of the provided subschemas.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Schema Selector (Radio/Select):</strong> If the subschemas are distinct (e.g., defining different object structures), provide a way for the user to choose which schema they are providing data for (e.g., &quot;Choose Contact Method:&quot; followed by radio buttons for &quot;Email&quot; or &quot;Phone&quot;). Display the form fields corresponding to the selected schema. This is common for &#x60;oneOf&#x60;.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "oneOf": [
    { "type": "string", "format": "email" },
    { "type": "string", "format": "uri" }
  ],
  "description": "Contact by email or website"
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Merged Form + Validation Feedback:</strong> For &#x60;anyOf&#x60;, or when subschemas overlap, display a form with all fields from all subschemas. Use validation to show which constraints from which subschema(s) are being met or violated.
              </li>
              <li>
                <strong>Step-by-step Wizard:</strong> Guide the user through satisfying the criteria, perhaps one subschema at a time.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-start space-x-4">
           {/* Reusing GitBranch as it represents combining schemas */}
          <GitBranch size={28} className="mt-1 text-orange-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">&#x60;allOf&#x60;</h3>
            <p className="mb-4">
              Indicates that the data must *all* of the provided subschemas.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Merged Form:</strong> The most common pattern is to merge the properties and constraints from all subschemas into a single form interface. For instance, if one schema defines an address object with required street and city, and another schema in &#x60;allOf&#x60; adds an optional zip code, the final form simply shows inputs for street, city, and zip code, with street and city marked as required.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "allOf": [
    { "$ref": "#/definitions/addressSchema" }, // Assume this defines street/city
    {
      "type": "object",
      "properties": {
        "zipCode": { "type": "string" }
      }
    }
  ],
  "description": "Complete address including zip code"
}`}
                  </pre>
                </div>
              </li>
            </ul>
          </div>
        </div>

         <div className="flex items-start space-x-4">
           {/* Reusing GitBranch */}
          <GitBranch size={28} className="mt-1 text-orange-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">&#x60;not&#x60;</h3>
            <p className="mb-4">
              Indicates that the data must *not* match the provided subschema.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Validation Feedback:</strong> This constraint is difficult to translate into a direct input control. It&apos;s primarily used for validation. The UI should accept input and then provide feedback if the entered data violates the &#x60;not&#x60; schema.
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
          Utilizing Schema Metadata
        </h2>
        <p>
          Beyond types and constraints, JSON Schema offers keywords for describing the data, which are crucial for building a user-friendly UI.
        </p>

        {/* Metadata */}
        <div className="flex items-start space-x-4">
          <Tag size={28} className="mt-1 text-cyan-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">&#x60;title&#x60; and &#x60;description&#x60;</h3>
            <p className="mb-4">
              Provide human-readable context for the data.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Labels:</strong> Use &#x60;title&#x60; as the label for an input field or section header.
              </li>
              <li>
                <strong>Help Text / Tooltips:</strong> Use &#x60;description&#x60; to provide more detailed explanation or guidance, often displayed below the input or in a tooltip/popover.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "string",
  "title": "Username",
  "description": "Choose a unique username for your account. Minimum 5 characters."
}`}
                  </pre>
                </div>
              </li>
            </ul>
          </div>
        </div>

         <div className="flex items-start space-x-4">
           {/* Reusing Tag */}
          <Tag size={28} className="mt-1 text-cyan-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">&#x60;default&#x60; and &#x60;examples&#x60;</h3>
            <p className="mb-4">
              Suggest initial values or demonstrate valid inputs.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Pre-filled Fields:</strong> Use the &#x60;default&#x60; value to pre-populate an input field when the form is initially loaded.
                 <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "boolean",
  "title": "Enable Feature",
  "default": true
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Placeholders or Examples:</strong> Use &#x60;examples&#x60; (or sometimes &#x60;default&#x60; if it&apos;s not a value to be saved but a suggestion) as placeholder text in an input field or to show typical valid inputs near the field.
              </li>
            </ul>
          </div>
        </div>

         <div className="flex items-start space-x-4">
           <Lock size={28} className="mt-1 text-gray-600 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">&#x60;readOnly&#x60; and &#x60;writeOnly&#x60;</h3>
            <p className="mb-4">
              Control whether the user can modify the data.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Read-only / Disabled Inputs:</strong> If &#x60;readOnly&#x60; is true, display the value but disable the input field so it cannot be edited. Alternatively, just display the value as text.
                <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "string",
  "title": "User ID",
  "readOnly": true,
  "description": "Your unique system identifier (cannot be changed)."
}`}
                  </pre>
                </div>
              </li>
              <li>
                <strong>Hidden Inputs / API Only:</strong> If &#x60;writeOnly&#x60; is true, the property should generally not be displayed for reading (e.g., a password confirmation field) but might be included when submitting data.
              </li>
            </ul>
          </div>
        </div>


        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
          Validation and Feedback
        </h2>
        <p>
          A crucial part of any form or configuration UI is providing immediate feedback based on validation rules defined in the schema.
        </p>
        <div className="flex items-start space-x-4">
           <Info size={28} className="mt-1 text-blue-600 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Live Validation Feedback</h3>
            <p className="mb-4">
              Use schema constraints (&#x60;minLength&#x60;, &#x60;pattern&#x60;, &#x60;minimum&#x60;, &#x60;maxItems&#x60;, etc.) to validate user input as they type or when they leave a field.
            </p>
            <ul className="list-disc pl-6 space-y-3">
               <li>
                 Display error messages clearly linked to the input field when validation fails.
               </li>
               <li>
                 Indicate required fields (from the &#x60;required&#x60; array in an object schema).
                  <div className="bg-gray-100 p-3 rounded-md text-sm font-mono my-2 dark:bg-gray-800 overflow-x-auto">
                  <pre>
                    {`{
  "type": "object",
  "properties": {
    "username": { "type": "string" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["username", "email"]
}`}
                  </pre>
                </div>
               </li>
               <li>
                 Show success states when input is valid.
               </li>
            </ul>
          </div>
        </div>


        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
          Best Practices and Considerations
        </h2>
        <p>
          Implementing these patterns effectively requires attention to usability and accessibility.
        </p>
        <div className="flex items-start space-x-4">
           <Settings size={28} className="mt-1 text-teal-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Usability</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Consistency:</strong> Use consistent UI patterns for the same schema types throughout your application.
              </li>
              <li>
                <strong>Simplicity:</strong> Avoid overly complex nested structures where flatter forms might suffice for simple data.
              </li>
              <li>
                <strong>Progressive Disclosure:</strong> Use accordions, tabs, or steps to hide complexity until needed, especially for large objects or complex combinators.
              </li>
              <li>
                <strong>Clear Labeling:</strong> Ensure labels (from &#x60;title&#x60;) are always visible and clearly associated with their inputs.
              </li>
            </ul>
          </div>
        </div>

         <div className="flex items-start space-x-4">
           <Settings size={28} className="mt-1 text-teal-500 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Accessibility</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Ensure all form elements have proper ARIA attributes and linked labels for screen readers.
              </li>
              <li>
                Keyboard navigation should be fully functional.
              </li>
              <li>
                Validation errors must be clearly communicated to assistive technologies.
              </li>
            </ul>
          </div>
        </div>


        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p>
          Building user interfaces driven by JSON Schema offers significant advantages in consistency and maintainability. By applying appropriate visual design patterns for different schema types and leveraging metadata like &#x60;title&#x60;, &#x60;description&#x60;, and &#x60;default&#x60;, developers can translate complex data structures into intuitive and accessible forms. Understanding these patterns is key to creating effective configuration and data entry screens that accurately reflect the underlying data model defined by the JSON Schema.
        </p>
      </div>
    </div>
  );
}