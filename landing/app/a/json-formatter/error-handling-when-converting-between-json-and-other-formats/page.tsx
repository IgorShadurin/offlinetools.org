import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article
 */
export const metadata: Metadata = {
  title: "Error Handling When Converting Between JSON and Other Formats | Offline Tools",
  description:
    "Learn effective strategies for handling errors when converting between JSON and other data formats, including XML, CSV, and YAML.",
};

/**
 * Article page component for JSON formatter article
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Error Handling When Converting Between JSON and Other Formats</h1>

      <div className="space-y-6">
        <p>
          Converting between JSON and other data formats like XML, CSV, YAML, or proprietary formats is a common
          requirement in many applications. However, these conversions can introduce various errors due to
          format-specific limitations and differences in data representation. This article explores common conversion
          errors and effective strategies for handling them.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Common Conversion Challenges</h2>

        <h3 className="text-xl font-medium mt-6">1. Data Type Mismatches</h3>
        <p>
          Different formats handle data types differently. For example, JSON has clear distinctions between numbers,
          strings, booleans, and null values, while CSV treats everything as strings.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">JSON to CSV Type Issues:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON Input
{
  "id": 123,
  "active": true,
  "score": 98.6,
  "metadata": {"created": "2023-01-15"}
}

// CSV Output - Note how all types become strings
// id,active,score,metadata
// "123","true","98.6","{\"created\":\"2023-01-15\"}"
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Structural Differences</h3>
        <p>
          JSON supports nested objects and arrays, while formats like CSV are inherently flat. XML is hierarchical but
          with different nesting rules than JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-amber-600 dark:text-amber-400">JSON to XML Conversion Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON Input
{
  "person": {
    "name": "Alice",
    "hobbies": ["reading", "hiking"]
  }
}

// XML Output
<root>
  <person>
    <name>Alice</name>
    <hobbies>reading</hobbies>
    <hobbies>hiking</hobbies>
  </person>
</root>
`}
            </pre>
          </div>
          <p className="mt-2 text-sm">
            Note how arrays are represented differently in XML, potentially causing issues when converting back to JSON.
          </p>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Special Character Handling</h3>
        <p>
          Each format has its own rules for escaping and handling special characters, which can lead to corruption or
          parsing errors.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-red-600 dark:text-red-400">Special Character Problems:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// JSON with special characters
{
  "description": "Product costs $19.99 & comes with \"free\" shipping",
  "markup": "<div class='product'>Special offer!</div>"
}

// When converting to XML, these characters need special handling
`}
            </pre>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Error Handling Strategies</h2>

        <h3 className="text-xl font-medium mt-6">1. Validate Before Converting</h3>
        <p>
          Always validate your source data before attempting conversion. For JSON, this means ensuring it&apos;s
          well-formed and matches your expected schema.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">JavaScript Validation Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`try {
  // First validate the JSON
  const data = JSON.parse(jsonString);
  
  // Then validate against expected schema
  if (!data.hasOwnProperty('required_field')) {
    throw new Error('Missing required field');
  }
  
  // Only then convert to another format
  const csvOutput = convertJsonToCsv(data);
} catch (error) {
  console.error('Validation failed:', error.message);
}
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">2. Use Type Mapping</h3>
        <p>Create explicit type mapping rules when converting between formats with different type systems.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Type Mapping Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`// When converting from CSV to JSON
function convertCsvToJson(csvRow, typeMap) {
  const jsonObject = {};
  
  Object.keys(csvRow).forEach(key => {
    const value = csvRow[key];
    
    // Apply type conversion based on mapping
    switch(typeMap[key]) {
      case 'number':
        jsonObject[key] = Number(value);
        break;
      case 'boolean':
        jsonObject[key] = value.toLowerCase() === 'true';
        break;
      case 'json': // For nested objects stored as strings
        try {
          jsonObject[key] = JSON.parse(value);
        } catch (e) {
          jsonObject[key] = null; // Handle parsing failure
        }
        break;
      default:
        jsonObject[key] = value; // Keep as string
    }
  });
  
  return jsonObject;
}
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">3. Handle Structural Transformations</h3>
        <p>
          When converting between hierarchical and flat structures, use explicit mapping rules and handle nested data
          carefully.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Flattening Nested JSON for CSV:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function flattenJson(obj, prefix = '') {
  const result = {};
  
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively flatten nested objects
      const flattened = flattenJson(value, newKey);
      Object.assign(result, flattened);
    } else if (Array.isArray(value)) {
      // Handle arrays by joining values or other strategy
      result[newKey] = value.join(',');
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}
`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-medium mt-6">4. Implement Graceful Error Recovery</h3>
        <p>When conversions fail, provide useful error messages and potential recovery options.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium text-green-600 dark:text-green-400">Error Recovery Example:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`function safelyConvertJsonToXml(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return convertToXml(data);
  } catch (error) {
    if (error instanceof SyntaxError) {
      // JSON parsing error
      console.error('Invalid JSON:', error.message);
      
      // Try to clean common issues
      const cleaned = attemptJsonRepair(jsonString);
      
      if (cleaned) {
        try {
          const data = JSON.parse(cleaned);
          console.warn('Conversion proceeding with repaired JSON');
          return convertToXml(data);
        } catch (e) {
          // Still failed
        }
      }
    } else {
      // XML conversion error
      console.error('Error during XML conversion:', error.message);
    }
    
    // Fallback to a minimal valid output
    return '<root><error>Conversion failed</error></root>';
  }
}
`}
            </pre>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">Important Note:</h3>
          <p className="mt-2 text-yellow-700 dark:text-yellow-200">
            When handling errors during format conversion, always log detailed information about what caused the
            failure. Simply knowing that a conversion failed is rarely enough to fix the underlying issue.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Best Practices for Different Format Conversions</h2>

        <h3 className="text-xl font-medium mt-6">JSON to XML</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Define consistent rules for handling arrays</li>
          <li>Escape special XML characters (&lt;, &gt;, &amp;, &quot;, &apos;)</li>
          <li>Consider adding a root element if none exists</li>
          <li>Handle attributes vs. elements conversion explicitly</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">JSON to CSV</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Define a strategy for handling nested objects (flatten or serialize)</li>
          <li>Handle arrays consistently (join, multiple columns, or serialize)</li>
          <li>Escape CSV delimiters in text fields</li>
          <li>Consider header naming for nested properties</li>
        </ul>

        <h3 className="text-xl font-medium mt-6">JSON to YAML</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Preserve data types where possible</li>
          <li>Handle multi-line strings correctly</li>
          <li>Be careful with YAML-specific characters (: {} [ ] , & * ? | - &lt; &gt; = ! % @ \)</li>
          <li>Consider YAML anchors for repeated structures</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Testing Your Conversions</h2>
        <p>Always test your conversions with a variety of inputs, especially edge cases:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Empty objects and arrays</li>
          <li>Deeply nested structures</li>
          <li>Special characters and emoji</li>
          <li>Very large values</li>
          <li>Different data types</li>
          <li>Try round-trip conversions (e.g., JSON → XML → JSON) to verify data preservation</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Converting between JSON and other formats requires careful handling of type differences, structural
          variations, and special characters. By implementing proper validation, explicit type mapping, structural
          transformation strategies, and graceful error handling, you can minimize conversion errors and create more
          robust data processing pipelines.
        </p>
        <p className="mt-4">
          Remember that no conversion is perfect, especially between formats with fundamentally different capabilities.
          Always document your conversion rules and limitations, and provide clear error messages when issues occur.
        </p>
      </div>
    </>
  );
}
