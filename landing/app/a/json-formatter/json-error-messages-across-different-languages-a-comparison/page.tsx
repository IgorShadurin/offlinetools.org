import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article comparing error messages across languages
 */
export const metadata: Metadata = {
  title: "JSON Error Messages Across Different Languages: A Comparison | Offline Tools",
  description: "Compare JSON parsing error messages across different programming languages and learn how to effectively interpret them for faster debugging",
};

/**
 * Article page component for JSON formatter article about JSON error messages across different languages
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">JSON Error Messages Across Different Languages: A Comparison</h1>

      <div className="space-y-6">
        <p>
          When working with JSON data across different programming languages, understanding error messages can be a 
          challenge. Each language implements JSON parsing differently, resulting in varied error messages that can 
          range from cryptic to highly descriptive. This article compares JSON error reporting across popular 
          programming languages to help you interpret these messages more effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Common JSON Parsing Errors</h2>
        <p>
          Before diving into language specifics, let's identify the most common JSON parsing errors:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mismatched brackets or braces</li>
          <li>Missing or extra commas</li>
          <li>Unquoted property names</li>
          <li>Single quotes instead of double quotes</li>
          <li>Trailing commas in arrays or objects</li>
          <li>Invalid escape sequences</li>
          <li>Non-string keys in objects</li>
          <li>Invalid Unicode sequences</li>
          <li>Data type mismatches</li>
          <li>Unexpected end of input</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">2. Error Message Comparison</h2>
        <p>
          Let's examine how different languages report the same JSON errors. For our comparison, we'll use this 
          intentionally problematic JSON:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Problematic JSON:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`{
  "name": "Test Object",
  'description': "An object with errors",
  "count": 42,
  "items": [
    "item1",
    "item2",
    "item3",
  ],
  status: "active"
}`}
          </pre>
          <p className="mt-2">
            <em>Issues: Single quotes around 'description', trailing comma after "item3", and unquoted property name status</em>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. JavaScript (Browser)</h2>
        <p>
          JavaScript's JSON parser provides concise but helpful error messages, focusing on position information:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error for single quotes:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`SyntaxError: Unexpected token ' in JSON at position 29`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Error for trailing comma:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`SyntaxError: Unexpected token ] in JSON at position 108`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Error for unquoted property:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`SyntaxError: Unexpected token s in JSON at position 116`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`try {
  const data = JSON.parse(jsonString);
  console.log(data);
} catch (error) {
  console.error('JSON parsing failed:', error.message);
  
  // Extract position information
  const position = error.message.match(/position (\d+)/);
  if (position && position[1]) {
    const pos = Number(position[1]);
    console.error(\`Error near: \${jsonString.substring(Math.max(0, pos - 10), pos + 10)}\`);
    console.error(\`\${' '.repeat(Math.min(10, pos))}^ Error around here\`);
  }
}`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">JavaScript Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Concise, includes position information, easily accessible in try/catch blocks</li>
            <li><strong>Weaknesses:</strong> No context about the expected structure, no line/column info in browsers</li>
            <li><strong>Best practice:</strong> Add your own context by showing the problematic section using the position value</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Python</h2>
        <p>
          Python's json module provides error messages with line and column information, making it easier to locate problems:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error for single quotes:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: 
line 3 column 3 (char 29)`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Error for trailing comma:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: 
line 8 column 3 (char 108)`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`import json

try:
    data = json.loads(json_string)
    print(data)
except json.JSONDecodeError as e:
    print(f"Error message: {str(e)}")
    print(f"Line: {e.lineno}, Column: {e.colno}, Position: {e.pos}")
    
    # Show the problematic line
    lines = json_string.splitlines()
    if 0 <= e.lineno-1 < len(lines):
        print("Problematic line:")
        print(lines[e.lineno-1])
        print(" " * (e.colno-1) + "^")`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Python Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Detailed error messages, line/column information, specific exception type</li>
            <li><strong>Weaknesses:</strong> Sometimes the error appears after the actual problem location</li>
            <li><strong>Best practice:</strong> Use the exception's lineno, colno, and pos attributes to pinpoint the error</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Java</h2>
        <p>
          Java's JSON libraries like Jackson provide detailed error messages with path information:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Jackson error for single quotes:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`com.fasterxml.jackson.core.JsonParseException: Unexpected character (''' (code 39)): 
expected double-quote to start field name
 at [Source: (String)"..."; line: 3, column: 4]`}
          </pre>
          <h3 className="text-lg font-medium mt-4">GSON error for the same issue:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`com.google.gson.JsonSyntaxException: 
java.lang.IllegalStateException: Expected BEGIN_OBJECT but was STRING at line 3 column 16 path $.`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example (Jackson):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

ObjectMapper mapper = new ObjectMapper();
try {
    Map<String, Object> data = mapper.readValue(jsonString, Map.class);
    System.out.println(data);
} catch (JsonProcessingException e) {
    System.err.println("JSON parsing error: " + e.getMessage());
    System.err.println("Location: Line " + e.getLocation().getLineNr() + 
                      ", Column " + e.getLocation().getColumnNr());
    
    // Extract problematic line
    String[] lines = jsonString.split("\\n");
    if (e.getLocation().getLineNr() - 1 < lines.length) {
        String line = lines[e.getLocation().getLineNr() - 1];
        System.err.println("Problematic line: " + line);
        System.err.println(" ".repeat(e.getLocation().getColumnNr() - 1) + "^");
    }
}`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Java Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Very detailed error messages, stack traces, line/column information, path details</li>
            <li><strong>Weaknesses:</strong> Verbosity can be overwhelming, different libraries have different formats</li>
            <li><strong>Best practice:</strong> Extract the line/column information and use it to highlight the problematic section</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. C#/.NET</h2>
        <p>
          C#'s System.Text.Json provides moderately detailed error messages:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error for single quotes:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`System.Text.Json.JsonException: '''' is an invalid start of a property name. 
Expected a '"'. Path: $ | LineNumber: 2 | BytePositionInLine: 2.`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Error for trailing comma:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`System.Text.Json.JsonException: Expected end of array or comma delimiter. 
Path: $.items | LineNumber: 7 | BytePositionInLine: 2.`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`using System;
using System.Text.Json;

try
{
    var data = JsonSerializer.Deserialize<dynamic>(jsonString);
    Console.WriteLine(data);
}
catch (JsonException ex)
{
    Console.WriteLine($"JSON parsing error: {ex.Message}");
    
    // Extract line and position from error message
    Console.WriteLine($"Path: {ex.Path}");
    Console.WriteLine($"Line Number: {ex.LineNumber}");
    Console.WriteLine($"Byte Position in Line: {ex.BytePositionInLine}");
    
    // Show problematic line
    string[] lines = jsonString.Split('\n');
    if (ex.LineNumber > 0 && ex.LineNumber <= lines.Length)
    {
        string line = lines[ex.LineNumber - 1];
        Console.WriteLine($"Problematic line: {line}");
        Console.WriteLine($"{new string(' ', ex.BytePositionInLine)}^");
    }
}`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">C#/.NET Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Structured exceptions with path, line, and position properties, clear explanation</li>
            <li><strong>Weaknesses:</strong> BytePositionInLine can be confusing for Unicode characters</li>
            <li><strong>Best practice:</strong> Use the JsonException properties to pinpoint and display the error location</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. PHP</h2>
        <p>
          PHP's json_decode() function doesn't provide detailed error messages by default, requiring extra steps for useful information:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Standard error information:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// json_decode() just returns null on error
// json_last_error() returns a code like JSON_ERROR_SYNTAX
// json_last_error_msg() returns a human-readable message

json_last_error(): 4
json_last_error_msg(): "Syntax error"`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example with improved error reporting:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`<?php
function jsonDecodeWithErrorInfo($json) {
    $result = json_decode($json);
    $error = json_last_error();
    
    if ($error !== JSON_ERROR_NONE) {
        $message = json_last_error_msg();
        
        // Find position by decoding chunks until error occurs
        $position = 0;
        for ($i = 0; $i <= strlen($json); $i++) {
            $chunk = substr($json, 0, $i);
            json_decode($chunk);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $position = $i;
                break;
            }
        }
        
        // Calculate line and column
        $lines = explode("\n", substr($json, 0, $position));
        $line = count($lines);
        $column = strlen(end($lines)) + 1;
        
        return [
            'error' => true,
            'message' => $message,
            'code' => $error,
            'position' => $position,
            'line' => $line,
            'column' => $column
        ];
    }
    
    return ['error' => false, 'data' => $result];
}

$result = jsonDecodeWithErrorInfo($jsonString);
if ($result['error']) {
    echo "JSON Error: {$result['message']}\n";
    echo "Line: {$result['line']}, Column: {$result['column']}, Position: {$result['position']}\n";
    
    // Display the problem line
    $lines = explode("\n", $jsonString);
    if (isset($lines[$result['line'] - 1])) {
        echo "Problematic line: {$lines[$result['line'] - 1]}\n";
        echo str_repeat(' ', $result['column'] - 1) . "^\n";
    }
} else {
    var_dump($result['data']);
}
?>`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">PHP Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Simple error system with standard error codes</li>
            <li><strong>Weaknesses:</strong> Very minimal error details, no position information by default</li>
            <li><strong>Best practice:</strong> Implement custom error detection as shown above to pinpoint the exact error location</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">8. Ruby</h2>
        <p>
          Ruby's JSON parser provides moderately helpful error messages:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error for single quotes:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`JSON::ParserError: 765: unexpected token at '{"name": "Test Object",
'description': "An object with errors",
...}'`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`require 'json'

begin
  data = JSON.parse(json_string)
  puts data
rescue JSON::ParserError => e
  puts "JSON parsing error: #{e.message}"
  
  # Extract position information if available
  if e.message =~ /(\d+): unexpected token/
    position = $1.to_i
    
    # Find line and column
    lines = json_string[0..position].split("\n")
    line = lines.length
    column = lines.last.length
    
    puts "Error around position #{position}, Line #{line}, Column #{column}"
    
    # Show problematic line
    all_lines = json_string.split("\n")
    if all_lines[line-1]
      puts "Problematic line: #{all_lines[line-1]}"
      puts "#{' ' * column}^"
    end
  end
end`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Ruby Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Specific exception type, includes position information</li>
            <li><strong>Weaknesses:</strong> Error message format is less structured, requiring regex to extract position</li>
            <li><strong>Best practice:</strong> Parse the error message to extract position and display context around the error</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">9. Go</h2>
        <p>
          Go's encoding/json package provides precise error messages:
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Error for single quotes:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`json: invalid character '\'' looking for beginning of object key string`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Error for trailing comma:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`json: invalid character ']' looking for beginning of value`}
          </pre>
          <h3 className="text-lg font-medium mt-4">Code example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

func main() {
	var data map[string]interface{}
	err := json.Unmarshal([]byte(jsonString), &data)
	
	if err != nil {
		fmt.Printf("JSON parsing error: %s\n", err)
		
		// For syntax errors, identify location
		if syntaxErr, ok := err.(*json.SyntaxError); ok {
			position := int(syntaxErr.Offset)
			fmt.Printf("Error at position: %d\n", position)
			
			// Calculate line and column
			lines := strings.Split(jsonString[:position], "\n")
			line := len(lines)
			column := len(lines[line-1]) + 1
			
			fmt.Printf("Line: %d, Column: %d\n", line, column)
			
			// Show problematic line
			allLines := strings.Split(jsonString, "\n")
			if line-1 < len(allLines) {
				fmt.Printf("Problematic line: %s\n", allLines[line-1])
				fmt.Printf("%s^\n", strings.Repeat(" ", column-1))
			}
		}
	} else {
		fmt.Printf("Parsed data: %v\n", data)
	}
}`}
          </pre>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Go Error Characteristics</h3>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li><strong>Strengths:</strong> Clean error messages, provides byte offset for syntax errors</li>
            <li><strong>Weaknesses:</strong> Only provides byte offset, requiring calculation for line/column</li>
            <li><strong>Best practice:</strong> Type assert to *json.SyntaxError to access the Offset field and display context</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">10. Unified Error Handling Strategy</h2>
        <p>
          Regardless of the language, a good error handling strategy should:
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Extract position information</strong> (line, column, and/or character position)
          </li>
          <li>
            <strong>Show the problematic line</strong> with a caret (^) marking the error location
          </li>
          <li>
            <strong>Provide context</strong> about what was expected vs. what was found
          </li>
          <li>
            <strong>Suggest possible fixes</strong> based on the error type
          </li>
          <li>
            <strong>Handle nested structures</strong> by showing the path to the error
          </li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Universal Error Display Function (JavaScript):</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`/**
 * Display JSON error in a universal format
 * @param {string} jsonString - The JSON string that failed to parse
 * @param {Error} error - The error thrown during parsing
 */
function displayJsonError(jsonString, error) {
  // Extract error information
  const errorInfo = {
    message: error.message,
    position: null,
    line: null,
    column: null
  };
  
  // Extract position from error message (different patterns)
  const posMatch = error.message.match(/position (\d+)/);
  if (posMatch) {
    errorInfo.position = Number(posMatch[1]);
  }
  
  // If we have a position, calculate line and column
  if (errorInfo.position !== null) {
    const upToPosition = jsonString.substring(0, errorInfo.position);
    const lines = upToPosition.split('\\n');
    errorInfo.line = lines.length;
    errorInfo.column = lines[lines.length - 1].length + 1;
  }
  
  // Display error summary
  console.error(\`JSON Error: \${errorInfo.message}\`);
  
  if (errorInfo.line !== null) {
    console.error(\`Location: Line \${errorInfo.line}, Column \${errorInfo.column}\`);
    
    // Show the problematic line with a marker
    const allLines = jsonString.split('\\n');
    if (errorInfo.line <= allLines.length) {
      const problemLine = allLines[errorInfo.line - 1];
      console.error('Problematic line:');
      console.error(problemLine);
      console.error(\`\${' '.repeat(errorInfo.column - 1)}^\`);
    }
    
    // Suggest fixes based on common patterns
    suggestJsonFix(errorInfo, jsonString);
  }
}

/**
 * Suggest possible fixes based on the error
 * @param {Object} errorInfo - Information about the error
 * @param {string} jsonString - The original JSON string
 */
function suggestJsonFix(errorInfo, jsonString) {
  const message = errorInfo.message.toLowerCase();
  
  if (message.includes("unexpected token '")) {
    console.error("Suggestion: Check for single quotes, which should be double quotes in JSON.");
  } else if (message.includes('unexpected token }') || message.includes('unexpected token ]')) {
    console.error("Suggestion: Check for missing commas or extra commas before this closing bracket.");
  } else if (message.includes('unexpected end of input')) {
    console.error("Suggestion: JSON is incomplete. Check for missing closing brackets or quotes.");
  } else if (message.includes('unexpected token :')) {
    console.error("Suggestion: Property names should be enclosed in double quotes.");
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">11. Best Practices for Cross-Language JSON Usage</h2>
        <p>
          When working with JSON across multiple languages:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Use validators</strong> before attempting to parse in production code
          </li>
          <li>
            <strong>Create unified error handlers</strong> for each language that standardize the output format
          </li>
          <li>
            <strong>Include the original JSON</strong> (or a condensed version) in error logs for debugging
          </li>
          <li>
            <strong>Consider schema validation</strong> to catch more semantic errors beyond syntax issues
          </li>
          <li>
            <strong>Implement proper logging</strong> that includes the error context, not just the message
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">12. Language-Specific JSON Validation Libraries</h2>
        <p>
          Many languages offer specialized JSON validation libraries with superior error reporting:
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">JavaScript:</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>jsonlint</strong> - Detailed error messages with line/column</li>
              <li><strong>ajv</strong> - Advanced schema validation with descriptive errors</li>
              <li><strong>json-schema-validator</strong> - Path-based error reporting</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Python:</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>jsonschema</strong> - Advanced schema validation</li>
              <li><strong>json-validator</strong> - Visual error indicators</li>
              <li><strong>pydantic</strong> - Combines parsing with validation</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Java:</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Everit JSON Schema</strong> - Detailed validation errors</li>
              <li><strong>json-schema-validator</strong> - Path-based reporting</li>
              <li><strong>jsonassert</strong> - Specialized for testing JSON equality</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-medium">Go:</h3>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>gojsonschema</strong> - Schema validation with detailed errors</li>
              <li><strong>validator</strong> - General validation including JSON</li>
              <li><strong>go-playground/validator</strong> - Struct validation</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900 my-6">
          <h3 className="text-lg font-medium">Pro Tip</h3>
          <p>
            When developing APIs consumed by multiple language clients, include a "debug" mode that returns 
            more verbose JSON error messages. This helps clients identify issues more quickly regardless of 
            their language's native error reporting capabilities.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8">13. Conclusion</h2>
        <p>
          Understanding JSON error messages across different programming languages allows you to debug more efficiently
          in polyglot environments. While each language has its own error reporting style, the fundamental JSON specification
          remains the same. By leveraging language-specific error details and applying consistent error handling strategies,
          you can quickly pinpoint and resolve JSON parsing issues regardless of your technology stack.
        </p>
        <p className="mt-2">
          Remember that good error messages are not just about reporting failures—they should guide users toward solutions.
          Investing time in better error handling pays dividends in reduced debugging time and improved developer experience.
        </p>
      </div>
    </>
  );
} 