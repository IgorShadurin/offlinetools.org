import type { Metadata } from "next";
import {
  FileJson,
  FormInput,
  CheckCheck,
  XCircle,
  Link2,
  Lightbulb,
  Info,
  Layers,
  Boxes,
  Code,
  FileCode,
  Settings,
  LayoutList,
  LayoutGrid,
  ShieldCheck,
  Puzzle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JSON Schema Integration with Form Builders | Offline Tools",
  description: "Learn how to integrate JSON Schema with form builders to create dynamic, validated forms.",
};

export default function JsonSchemaFormIntegrationArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Link2 className="w-8 h-8 text-blue-500" /> JSON Schema Integration with Form Builders
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" /> Introduction
          </h2>
          <p>
            Building web forms is a ubiquitous task in web development. Whether it's a simple contact form or a complex
            configuration interface, developers often find themselves writing repetitive code to define fields, handle
            validation, and manage data submission. Form builders aim to streamline this process by providing
            declarative ways to define form structures.
          </p>
          <p>
            JSON Schema, on the other hand, is a powerful standard for describing the structure and constraints of JSON
            data. It's commonly used for validating APIs, configuration files, and data storage.
          </p>
          <p>
            Integrating JSON Schema with form builders allows developers to use a single source of truth (the JSON
            Schema) to automatically generate and validate complex forms, significantly reducing development time and
            ensuring data consistency. This article explores the concepts, benefits, and methods for achieving this
            integration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileJson className="w-6 h-6 text-green-600" /> What is JSON Schema?
          </h2>
          <p>
            JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It defines keywords
            like &#x60;type&#x60;, &#x60;properties&#x60;, &#x60;required&#x60;, &#x60;minLength&#x60;,
            &#x60;maxLength&#x60;, &#x60;pattern&#x60;, &#x60;enum&#x60;, &#x60;minimum&#x60;, &#x60;maximum&#x60;,
            etc., to describe expected data types, structures, and constraints.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Code className="w-5 h-5" /> Example JSON Schema:
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20,
      "description": "Desired username for the profile"
    },
    "age": {
      "type": "integer",
      "minimum": 18,
      "description": "User's age (must be 18 or older)"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "User's email address"
    },
    "subscribe": {
      "type": "boolean",
      "default": true,
      "description": "Subscribe to newsletter?"
    },
    "role": {
      "type": "string",
      "enum": ["user", "admin", "guest"],
      "description": "User's role"
    },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "zipCode": { "type": "string" }
      },
      "required": ["street", "city"]
    }
  },
  "required": ["username", "age", "email"]
}`}
              </pre>
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              This schema describes an object with properties for username (string, length constraints), age (integer,
              minimum value), email (string, email format), subscribe (boolean), role (enum), and a nested address
              object. It also specifies which fields are required.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FormInput className="w-6 h-6 text-purple-600" /> What are Form Builders?
          </h2>
          <p>
            Form builders, in the context of web development frameworks, are libraries or tools that help you define,
            render, and manage form elements and their state. They often provide:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Declarative form definitions (e.g., an array of field objects).</li>
            <li>Components or functions to render form fields based on the definition.</li>
            <li>Mechanisms for handling form state (input values).</li>
            <li>Integrated validation capabilities.</li>
            <li>Methods for handling form submission.</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5" /> Conceptual Form Definition:
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`[
  { name: 'username', type: 'text', label: 'Username', required: true, validators: [...] },
  { name: 'age', type: 'number', label: 'Age', required: true, validators: [...] },
  { name: 'email', type: 'email', label: 'Email', required: true, validators: [...] },
  { name: 'subscribe', type: 'checkbox', label: 'Subscribe', default: true },
  { name: 'role', type: 'select', label: 'Role', options: ['user', 'admin', 'guest'] },
  { name: 'address', type: 'object', label: 'Address', fields: [
    { name: 'street', type: 'text', label: 'Street', required: true },
    { name: 'city', type: 'text', label: 'City', required: true },
    { name: 'zipCode', type: 'text', label: 'Zip Code' }
  ], required: true} // Object itself might be required
]`}
              </pre>
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              This is a simplified representation. Real form builders often have more complex structures for defining
              field types, labels, and validation rules.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Link2 className="w-6 h-6 text-blue-500" /> The Integration: Schema Driving Forms
          </h2>
          <p>
            The core idea of integrating JSON Schema with a form builder is to transform the JSON Schema definition into
            the form builder's own declarative structure or directly interpret the schema to render form fields
            dynamically.
          </p>
          <p>
            A component or function reads the JSON Schema and, based on the &#x60;type&#x60;, &#x60;properties&#x60;,
            &#x60;enum&#x60;, and constraint keywords (&#x60;minLength&#x60;, &#x60;maximum&#x60;, &#x60;required&#x60;,
            etc.), it determines:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Settings icon">
                <Settings className="w-5 h-5 text-gray-500" />
              </span>
              Which form input type to render (string -&gt; text, number -&gt; number input, boolean -&gt; checkbox,
              array of primitives with enum -&gt; multi-select/checkboxes, object -&gt; nested form/fieldset).
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Layout list icon">
                <LayoutList className="w-5 h-5 text-gray-500" />
              </span>
              The label for the field (often derived from the property name, or a
              &#x60;title&#x60;/&#x60;description&#x60; keyword if supported).
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Shield check icon">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </span>
              The validation rules to apply (mapping JSON Schema constraints to form validation logic).
            </li>{" "}
            {/* Added closing tag here */}
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Boxes icon">
                <Boxes className="w-5 h-5 text-gray-500" />
              </span>
              Handling nested structures (objects and arrays) by recursively generating sub-forms or repeatable
              sections.
            </li>
          </ul>
          <p>
            Some advanced integrations might also handle the &#x60;uiSchema&#x60; concept, which is a separate JSON
            object that describes how the form should look (e.g., order of fields, custom widgets, layout hints) without
            changing the underlying data validation defined by the JSON Schema.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" /> Benefits
          </h2>
          <p>Using JSON Schema to drive form generation offers significant advantages:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Check check icon">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </span>
              <strong>Single Source of Truth:</strong> The schema defines both data structure AND validation, reducing
              duplication between backend validation, API documentation, and frontend forms.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Check check icon">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </span>
              <strong>Automatic Validation:</strong> Validation rules are derived directly from the schema, ensuring
              frontend validation logic stays in sync with backend expectations.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Check check icon">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </span>
              <strong>Reduced Boilerplate:</strong> Automatically generating forms for standard schema types eliminates
              much of the repetitive code needed to manually define fields and their validations.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Check check icon">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </span>
              <strong>Consistency:</strong> Forms for similar data structures across different parts of an application
              will automatically look and behave consistently if driven by schemas.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="Check check icon">
                <CheckCheck className="w-5 h-5 text-green-600" />
              </span>
              <strong>Dynamic Forms:</strong> Forms can be generated dynamically at runtime based on schemas fetched
              from an API or configuration, enabling highly flexible interfaces.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-600" /> Challenges and Considerations
          </h2>
          <p>While powerful, this integration isn't without its challenges:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="X circle icon">
                <XCircle className="w-5 h-5 text-red-600" />
              </span>
              <strong>Schema Complexity:</strong> Very complex or deeply nested schemas can be challenging to map
              cleanly to a flat or simple form UI.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="X circle icon">
                <XCircle className="w-5 h-5 text-red-600" />
              </span>
              <strong>UI Customization:</strong> JSON Schema primarily defines data constraints, not UI layout or
              widgets. Achieving specific visual designs or using custom form components often requires extensions (like
              &#x60;uiSchema&#x60;) or custom mapping logic.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="X circle icon">
                <XCircle className="w-5 h-5 text-red-600" />
              </span>
              <strong>Mapping Specific Keywords:</strong> Not all JSON Schema keywords have a direct form input
              equivalent (e.g., &#x60;oneOf&#x60;, &#x60;anyOf&#x60;). Handling these may require custom components or
              interpretation.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0" role="img" aria-label="X circle icon">
                <XCircle className="w-5 h-5 text-red-600" />
              </span>
              <strong>Error Messages:</strong> Default validation error messages generated from schema keywords might
              not be user-friendly and often need customization.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-500" /> Implementation Approaches
          </h2>
          <p>There are several ways to implement JSON Schema-driven forms:</p>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Code className="w-5 h-5" /> Build a Custom Component
              </h3>
              <p>
                Write a React/TSX component that takes a JSON Schema object as a prop. Inside this component,
                recursively iterate through the schema's &#x60;properties&#x60;. Based on each property's
                &#x60;type&#x60; and other keywords, render the appropriate HTML form element (e.g., &lt;input
                type="text"&gt;, &lt;input type="number"&gt;, &lt;select&gt;, etc.) and apply validation attributes or
                logic.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
                <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <FileCode className="w-5 h-5" /> Conceptual Component Logic:
                </h4>
                <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
                  <pre>
                    {`// Simplified concept
function renderFormField(name, schemaProperty, formData, onChange) {
  const { type, title, description, required, enum: options, properties } = schemaProperty;
  const label = title || name;

  if (type === 'string') {
    return (
      <div key={name}>
        <label>&#x7b;label&#x7d;&#x7b;required && '*'&#x7d;</label>
        <input type="text" value={formData[name] || ''} onChange=&#x7b;(e) => onChange(name, e.target.value)&#x7d; />
        {/* Add validation feedback */}
      </div>
    );
  } else if (type === 'integer' || type === 'number') {
     return (
      <div key={name}>
        <label>&#x7b;label&#x7d;&#x7b;required && '*'&#x7d;</label>
        <input type="number" value={formData[name] || ''} onChange=&#x7b;(e) => onChange(name, parseFloat(e.target.value))&#x7d; />
        {/* Add validation feedback */}
      </div>
    );
  } else if (type === 'boolean') {
     return (
      <div key={name}>
        <label>&#x7b;label&#x7d;&#x7b;required && '*'&#x7d;</label>
        <input type="checkbox" checked=&#x7b;formData[name] || false&#x7d; onChange=&#x7b;(e) => onChange(name, e.target.checked)&#x7d; />
      </div>
    );
  } else if (type === 'object' && properties) {
      // Recursive call for nested object
      return (
        <fieldset key={name} className="border p-4 my-4 rounded">
          <legend className="font-semibold">&#x7b;label&#x7d;</legend>
          &#x7b;Object.entries(properties).map(([propName, propSchema]) =>
             renderFormField(propName, propSchema, formData[name] || {}, (nestedName, value) => {
                 // Handle updates for nested objects
             })
          )&#x7d;
          {/* Add validation feedback */}
        </fieldset>
      );
  }
  // ... handle other types like enum, array, etc.
  return null; // Or handle unsupported types
}

// Inside your main component render:
// Object.entries(yourSchema.properties).map(([fieldName, fieldSchema]) =>
//   renderFormField(fieldName, fieldSchema, currentFormData, handleFormChange)
// );`}
                  </pre>
                </div>
              </div>
            </li>
            <li>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Puzzle className="w-5 h-5" /> Use a Dedicated Library
              </h3>
              <p>
                Several existing libraries are designed specifically for this purpose. These libraries typically provide
                a high-level component that accepts a JSON Schema and renders the form. They often include built-in
                support for common UI patterns, validation feedback, and integration with UI frameworks (like Material
                UI, Bootstrap, etc.). Examples (conceptually, not importing) might include
                &#x60;react-jsonschema-form&#x60; (RJSF) or similar tools in other frameworks. These libraries handle
                the complex mapping and rendering logic for you.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-600" /> Validation Aspects
          </h2>
          <p>
            One of the most compelling reasons for this integration is unified validation. When the form structure and
            validation rules are derived from the JSON Schema, the frontend validation logic automatically reflects the
            data constraints defined in the schema.
          </p>
          <p>
            A schema-driven form component can perform validation as the user types or on submission, checking against
            the schema's rules (&#x60;minLength&#x60;, &#x60;pattern&#x60;, &#x60;minimum&#x60;, &#x60;required&#x60;,
            etc.). This provides instant feedback to the user.
          </p>
          <div className="flex items-center gap-4 my-4">
            <span className="flex items-center gap-2 text-green-600 font-semibold">
              <CheckCheck className="w-6 h-6" /> Schema Valid
            </span>
            <span className="flex items-center gap-2 text-red-600 font-semibold">
              <XCircle className="w-6 h-6" /> Schema Invalid
            </span>
          </div>
          <p>
            Crucially, this frontend validation should always be paired with backend validation using the *same* JSON
            Schema validator to ensure data integrity and prevent malicious submissions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-orange-500" /> UI Customization (uiSchema)
          </h2>
          <p>
            While JSON Schema defines the data structure and validation, it doesn't dictate the form's appearance or
            layout. To control the user interface, many schema-driven form solutions adopt the &#x60;uiSchema&#x60;
            concept.
          </p>
          <p>
            &#x60;uiSchema&#x60; is typically another JSON object that mirrors the structure of the JSON Schema but
            contains view-layer configuration. It can specify:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Custom widgets for specific schema types (e.g., a rich text editor for a long string).</li>
            <li>Order of fields.</li>
            <li>UI classes or styling hints.</li>
            <li>Layout directives (e.g., putting fields side-by-side).</li>
            <li>Labels or descriptions that override the schema's &#x60;title&#x60;/&#x60;description&#x60;.</li>
          </ul>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <LayoutList className="w-5 h-5" /> Conceptual uiSchema Example:
            </h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto text-sm">
              <pre>
                {`{
  "username": {
    "ui:autofocus": true,
    "ui:placeholder": "Enter your username",
    "ui:help": "Must be between 3 and 20 characters."
  },
  "age": {
    "ui:widget": "updown", // Use an up/down number picker
    "ui:help": "Must be 18 or older."
  },
  "email": {
     "ui:widget": "email" // Use native email input type hint
  },
  "subscribe": {
     "ui:widget": "checkbox"
  },
  "role": {
     "ui:widget": "select" // Use standard select dropdown
  },
  "address": {
    "ui:order": ["street", "city", "zipCode"], // Specify field order
    "ui:title": "Mailing Address" // Override the schema title/name
  }
}`}
              </pre>
            </div>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              This uiSchema example provides hints on how to render the form fields defined by the JSON Schema,
              specifying focus, placeholders, help text, widgets, and field order.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" /> Conclusion
          </h2>
          <p>
            Integrating JSON Schema with form builders is a powerful pattern that promotes consistency, reduces
            development effort, and improves data integrity. By using a single, declarative schema to define both the
            data structure and its validation rules, you can generate forms that are automatically aligned with your
            backend expectations.
          </p>
          <p>
            Whether you build a custom component to interpret the schema or leverage an existing library, the benefits
            of schema-driven forms in terms of maintainability and developer productivity are significant, especially
            for applications dealing with many forms or complex data structures. Adopting the &#x60;uiSchema&#x60;
            pattern further enhances this by separating data concerns from presentation concerns, offering flexibility
            in UI design without altering the core data definition.
          </p>
        </section>
      </div>
    </>
  );
}
