import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about using regular expressions to identify JSON syntax errors
 */
export const metadata: Metadata = {
  title: "Using Regular Expressions to Identify JSON Syntax Errors | Offline Tools",
  description:
    "Learn how to use regular expressions to identify and diagnose common JSON syntax errors in your data structures",
};

/**
 * Article page component for JSON formatter article about using regular expressions to identify JSON syntax errors
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Using Regular Expressions to Identify JSON Syntax Errors</h1>

      <div className="space-y-6">
        <p>
          While full JSON parsing is the most reliable way to validate JSON, regular expressions can be powerful tools
          for quickly identifying and diagnosing common syntax errors. This article explores how to use targeted regular
          expressions to spot specific JSON syntax issues before they cause problems in your applications.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Finding Unbalanced Brackets and Braces</h2>
        <p>
          One of the most common JSON syntax errors involves unbalanced brackets, braces, or parentheses. Regular
          expressions can help identify these issues with proper pattern matching.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Doe"
    },
    {
      "id": 2,
      "name": "Jane Smith"
    }
  "total": 2
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Regular expression to check for potential bracket balance issues
function checkBracketBalance(jsonString) {
  // Count opening and closing brackets
  const openCurly = (jsonString.match(/{/g) || []).length;
  const closeCurly = (jsonString.match(/}/g) || []).length;
  const openSquare = (jsonString.match(/\\[/g) || []).length;
  const closeSquare = (jsonString.match(/\\]/g) || []).length;
  
  return {
    curlyBalanced: openCurly === closeCurly,
    squareBalanced: openSquare === closeSquare,
    balanced: openCurly === closeCurly && openSquare === closeSquare
  };
}

// Example usage
const balanceCheck = checkBracketBalance(jsonString);
if (!balanceCheck.balanced) {
  console.error("JSON has unbalanced brackets:", balanceCheck);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Detecting Missing Commas</h2>
        <p>
          Missing commas between array elements or object properties are another common source of JSON syntax errors.
          Regular expressions can help spot these issues by identifying patterns where commas should appear.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "Product List"
  "items": [
    {"id": 101, "name": "Keyboard"}
    {"id": 102, "name": "Mouse"}
  ]
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Regular expression to find potential missing commas in objects
function findMissingObjectCommas(jsonString) {
  // Look for patterns where a property ends and a new one begins without a comma
  const suspiciousPattern = /"[^"]*"\\s*:\\s*[^,{\\[\\s][^,{\\[]*(\\s*)("[^"]*"\\s*:)/g;
  const matches = [...jsonString.matchAll(suspiciousPattern)];
  
  return matches.map(match => {
    return {
      position: match.index,
      text: match[0],
      line: jsonString.substring(0, match.index).split('\\n').length
    };
  });
}

// Example usage
const potentialMissingCommas = findMissingObjectCommas(jsonString);
if (potentialMissingCommas.length > 0) {
  console.error("Potential missing commas detected:", potentialMissingCommas);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Identifying Unclosed String Literals</h2>
        <p>
          Unclosed string literals can cause the parser to fail when reading JSON. Regular expressions can help identify
          strings that may be missing their closing quotation marks.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "description": "This is a multi-line
   product description that is missing
   its closing quotation mark,
  "price": 29.99
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Function to detect potential unclosed string literals
function findUnclosedStrings(jsonString) {
  const lines = jsonString.split('\\n');
  const results = [];
  
  // Process each line to find odd number of unescaped quotes
  lines.forEach((line, lineNumber) => {
    let inString = false;
    let quoteCount = 0;
    
    for (let i = 0; i < line.length; i++) {
      // Handle escape sequences
      if (line[i] === '\\\\' && i + 1 < line.length) {
        i++; // Skip next character
        continue;
      }
      
      if (line[i] === '"') {
        quoteCount++;
        inString = !inString;
      }
    }
    
    // Odd number of quotes suggests unclosed string
    if (quoteCount % 2 !== 0) {
      results.push({
        line: lineNumber + 1,
        text: line
      });
    }
  });
  
  return results;
}

// Example usage
const unclosedStrings = findUnclosedStrings(jsonString);
if (unclosedStrings.length > 0) {
  console.error("Potential unclosed strings found:", unclosedStrings);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Detecting Invalid Property Names</h2>
        <p>
          JSON requires property names to be double-quoted strings. Regular expressions can help identify unquoted or
          improperly quoted property names that would cause parsing errors.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  name: "Product",
  'category': "Electronics",
  "price": 199.99
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Function to find potentially invalid property names
function findInvalidPropertyNames(jsonString) {
  // Look for property patterns that aren't properly double-quoted
  const unquotedProps = /([{,]\\s*)([\\w-]+)\\s*:/g;
  const singleQuotedProps = /([{,]\\s*)('[^']*')\\s*:/g;
  
  const unquotedMatches = [...jsonString.matchAll(unquotedProps)];
  const singleQuotedMatches = [...jsonString.matchAll(singleQuotedProps)];
  
  return {
    unquotedProperties: unquotedMatches.map(match => ({
      position: match.index + match[1].length,
      propertyName: match[2],
      line: jsonString.substring(0, match.index).split('\\n').length
    })),
    singleQuotedProperties: singleQuotedMatches.map(match => ({
      position: match.index + match[1].length,
      propertyName: match[2],
      line: jsonString.substring(0, match.index).split('\\n').length
    }))
  };
}

// Example usage
const invalidProps = findInvalidPropertyNames(jsonString);
if (invalidProps.unquotedProperties.length > 0 || invalidProps.singleQuotedProperties.length > 0) {
  console.error("Invalid property names found:", invalidProps);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Finding Trailing Commas</h2>
        <p>
          JSON doesn't allow trailing commas after the last element in arrays or objects. Regular expressions can help
          identify these invalid commas that would cause parsing to fail.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Problematic JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "items": [
    "item1",
    "item2",
  ],
  "settings": {
    "active": true,
    "mode": "default",
  }
}`}
          </pre>
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mt-4">Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Function to detect trailing commas in objects and arrays
function findTrailingCommas(jsonString) {
  // Pattern for trailing commas in objects
  const objectPattern = /,\\s*}/g;
  const objectMatches = [...jsonString.matchAll(objectPattern)];
  
  // Pattern for trailing commas in arrays
  const arrayPattern = /,\\s*\\]/g;
  const arrayMatches = [...jsonString.matchAll(arrayPattern)];
  
  return {
    objectTrailingCommas: objectMatches.map(match => ({
      position: match.index,
      line: jsonString.substring(0, match.index).split('\\n').length
    })),
    arrayTrailingCommas: arrayMatches.map(match => ({
      position: match.index,
      line: jsonString.substring(0, match.index).split('\\n').length
    }))
  };
}

// Example usage
const trailingCommas = findTrailingCommas(jsonString);
if (trailingCommas.objectTrailingCommas.length > 0 || trailingCommas.arrayTrailingCommas.length > 0) {
  console.error("Trailing commas found:", trailingCommas);
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Creating a Comprehensive JSON Pre-validator</h2>
        <p>
          While regular expressions cannot fully validate JSON, they can serve as a first line of defense to catch
          common syntax errors before attempting to parse the JSON.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Comprehensive Solution:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Comprehensive JSON pre-validator using regular expressions
function prevalidateJSON(jsonString) {
  const issues = [];
  
  // Check bracket balance
  const balanceCheck = checkBracketBalance(jsonString);
  if (!balanceCheck.balanced) {
    issues.push({
      type: "unbalanced_brackets",
      details: balanceCheck
    });
  }
  
  // Check for missing commas
  const missingCommas = findMissingObjectCommas(jsonString);
  if (missingCommas.length > 0) {
    issues.push({
      type: "missing_commas",
      details: missingCommas
    });
  }
  
  // Check for unclosed strings
  const unclosedStrings = findUnclosedStrings(jsonString);
  if (unclosedStrings.length > 0) {
    issues.push({
      type: "unclosed_strings",
      details: unclosedStrings
    });
  }
  
  // Check for invalid property names
  const invalidProps = findInvalidPropertyNames(jsonString);
  if (invalidProps.unquotedProperties.length > 0 || invalidProps.singleQuotedProperties.length > 0) {
    issues.push({
      type: "invalid_property_names",
      details: invalidProps
    });
  }
  
  // Check for trailing commas
  const trailingCommas = findTrailingCommas(jsonString);
  if (trailingCommas.objectTrailingCommas.length > 0 || trailingCommas.arrayTrailingCommas.length > 0) {
    issues.push({
      type: "trailing_commas",
      details: trailingCommas
    });
  }
  
  return {
    valid: issues.length === 0,
    issues: issues
  };
}

// Example usage
const validationResult = prevalidateJSON(jsonString);
if (!validationResult.valid) {
  console.error("JSON pre-validation failed:", validationResult.issues);
} else {
  // Now it's safer to try parsing the JSON
  try {
    const parsedData = JSON.parse(jsonString);
    // Process the data
  } catch (error) {
    console.error("JSON parsing still failed. This might be an error type our pre-validator can't detect:", error);
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Limitations of Regular Expressions for JSON Validation</h2>
        <p>
          It's important to understand that regular expressions should complement, not replace, proper JSON parsing.
          Here are some limitations:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Regular expressions cannot fully validate nested structures in complex JSON.</li>
          <li>They may produce false positives or miss certain subtle syntax errors.</li>
          <li>They can't validate semantic correctness, only syntactic patterns.</li>
          <li>JSON parsing is context-sensitive, which is difficult to model with regex alone.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Regular expressions provide a valuable toolset for quickly identifying common JSON syntax errors before
          attempting a full parse. While they shouldn't replace proper parsing libraries, they can offer fast initial
          validation, clearer error messages, and help pinpoint issues in large JSON documents. By using targeted
          regular expressions for specific error patterns, you can build more robust JSON handling with better error
          reporting in your applications.
        </p>
      </div>
    </>
  );
}
