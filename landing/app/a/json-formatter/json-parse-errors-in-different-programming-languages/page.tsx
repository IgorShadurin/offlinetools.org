import type { Metadata } from "next";
import { ArticlePromoProvider } from "@/components/article-promo-context";
import { jsonFormatterPromo } from "@/app/tools/json-formatter/error-handling/promo-data";
import { ArticlePromo } from "@/components/article-promo";

export const metadata: Metadata = {
  title: "JSON Parse Errors in Different Programming Languages | Offline Tools",
  description: "Compare how different programming languages handle JSON parsing errors and learn language-specific techniques for better error handling.",
};

export default function JsonParseErrorsInLanguagesArticle() {
  return (
    <ArticlePromoProvider value={jsonFormatterPromo}>
      <div className="max-w-3xl mx-auto">
        <ArticlePromo />
        
        <h1 className="text-3xl font-bold mb-6">JSON Parse Errors in Different Programming Languages</h1>
        
        <div className="space-y-6">
          <p>
            JSON has become the universal language for data interchange, but each programming language 
            handles JSON parsing errors differently. Understanding these differences is crucial when 
            debugging JSON issues in various environments or when building cross-language systems.
          </p>
          
          <p>
            This article explores how major programming languages detect, report, and handle JSON 
            parsing errors, providing examples and best practices for each language.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8">JavaScript</h2>
          <p>
            As the language JSON was designed for, JavaScript provides native parsing but with relatively 
            sparse error information.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uses the native <code>JSON.parse()</code> method</li>
            <li>Throws <code>SyntaxError</code> on invalid JSON</li>
            <li>Error message includes only character position, not line numbers</li>
            <li>No built-in mechanism to display the problematic part of JSON</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Basic JavaScript Parsing:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`try {
  const data = JSON.parse('{"name": "JavaScript", "version": 2023,}'); // Invalid - trailing comma
} catch (error) {
  console.error('JSON parse error:', error.message);
  // Output: "JSON parse error: Unexpected token } in JSON at position 39"
}`}
              </pre>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Enhanced Error Handling:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`function parseWithContext(jsonString) {
  try {
    return { data: JSON.parse(jsonString), error: null };
  } catch (error) {
    // Extract position from error message
    const posMatch = error.message.match(/at position (\\d+)/);
    const position = posMatch ? parseInt(posMatch[1], 10) : -1;
    
    // Provide visual context for the error
    let errorContext = '';
    if (position >= 0) {
      const start = Math.max(0, position - 20);
      const end = Math.min(jsonString.length, position + 20);
      const excerpt = jsonString.substring(start, end);
      
      // Calculate the position within our excerpt
      const pointerPos = position - start;
      
      errorContext = \`
Context:
  \${excerpt.replace(/\\n/g, ' ')}
  \${'~'.repeat(pointerPos)}^ Error occurs here
      \`;
    }
    
    return {
      data: null,
      error: error.message,
      position: position,
      context: errorContext
    };
  }
}

const result = parseWithContext('{"name": "JavaScript", "version": 2023,}');
if (result.error) {
  console.error(\`Error: \${result.error}\`);
  console.log(result.context);
}`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">Common JavaScript JSON Errors</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-hidden overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Error Message</th>
                  <th className="p-2 text-left">Likely Cause</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>Unexpected token &lbrace; in JSON</code></td>
                  <td className="p-2">Invalid object start, often in an unexpected place</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>Unexpected token : in JSON</code></td>
                  <td className="p-2">Missing or invalid property name before a colon</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>Unexpected end of JSON input</code></td>
                  <td className="p-2">Incomplete JSON string, often missing closing brackets</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>Unexpected token &rbrace; in JSON</code></td>
                  <td className="p-2">Unexpected closing brace, perhaps due to mismatched brackets</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>Unexpected token &apos; in JSON</code></td>
                  <td className="p-2">Single quotes instead of required double quotes</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Python</h2>
          <p>
            Python provides more detailed error information than JavaScript.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uses the <code>json</code> module in the standard library</li>
            <li>Main function is <code>json.loads()</code> (for strings) or <code>json.load()</code> (for files)</li>
            <li>Raises <code>json.JSONDecodeError</code> which includes line, column, and position</li>
            <li>Error message indicates what character was expected</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Python Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`import json

def parse_with_context(json_str):
    try:
        data = json.loads(json_str)
        return {'data': data, 'error': None}
    except json.JSONDecodeError as e:
        # Extract detailed error information
        error_info = {
            'message': str(e),
            'line': e.lineno,
            'column': e.colno,
            'position': e.pos
        }
        
        # Get the line with the error
        lines = json_str.split('\\n')
        if 0 <= e.lineno - 1 < len(lines):
            error_line = lines[e.lineno - 1]
            pointer = ' ' * (e.colno - 1) + '^'
            
            # Include a few surrounding lines for context
            start_line = max(0, e.lineno - 3)
            end_line = min(len(lines), e.lineno + 2)
            
            context_lines = []
            for i in range(start_line, end_line):
                prefix = '-> ' if i == e.lineno - 1 else '   '
                context_lines.append(f"{prefix}{i+1}: {lines[i]}")
            
            # Add pointer line
            context_lines.insert(e.lineno - start_line + 1, '      ' + pointer)
            
            error_info['context'] = '\\n'.join(context_lines)
        
        return {'data': None, 'error': error_info}

# Example usage
json_with_error = '''
{
    "name": "Python",
    "version": 3.11,
    "features": [
        "type hints",
        "async/await",
        "pattern matching",
    ]
}
'''  # Invalid JSON - trailing comma in array

result = parse_with_context(json_with_error)
if result['error']:
    print(f"Error: {result['error']['message']}")
    print(result['error']['context'])
    
    # Output:
    # Error: Expecting value delimiter: line 7 column 6 (char 109)
    #    3: {
    #    4:     "name": "Python",
    #    5:     "version": 3.11,
    #    6:     "features": [
    # ->  7:         "type hints",
    #       ^
    #    8:         "async/await",
    #    9:         "pattern matching",`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Java</h2>
          <p>
            Java offers detailed error messages, especially with popular libraries like Jackson.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Most commonly uses the Jackson library</li>
            <li>Key class is <code>ObjectMapper</code> with methods like <code>readValue()</code></li>
            <li>Throws <code>JsonParseException</code> with detailed location and character information</li>
            <li>Exception includes full source location and expected token details</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Java Example with Jackson:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonParseException;

public class JsonErrorExample {
    public static void main(String[] args) {
        String jsonWithError = "{\\"name\\": \\"Java\\", \\"version\\": 17,}"; // Invalid JSON - trailing comma
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> data = mapper.readValue(jsonWithError, Map.class);
            System.out.println("Parsed successfully: " + data);
        } catch (JsonParseException e) {
            System.out.println("Parse error: " + e.getMessage());
            // Output includes line/column and detailed error:
            // "Parse error: Unexpected character ('}' (code 125)): expected a value at [Source: (String)"{"name": "Java", "version": 17,}"; line: 1, column: 31]"
            
            // Print only the relevant part of the message
            String message = e.getMessage();
            int atIndex = message.indexOf(" at [");
            if (atIndex > 0) {
                System.out.println("Error: " + message.substring(0, atIndex));
                System.out.println("Location: " + message.substring(atIndex));
            }
            
            // Parse location information
            int line = e.getLocation().getLineNr();
            int column = e.getLocation().getColumnNr();
            
            // Extract source and provide visual context
            String source = jsonWithError;
            if (source != null) {
                String[] lines = source.split("\\n");
                if (lines.length > 0 && line <= lines.length) {
                    String errorLine = lines[line - 1];
                    StringBuilder pointer = new StringBuilder();
                    for (int i = 0; i < column - 1; i++) {
                        pointer.append(" ");
                    }
                    pointer.append("^");
                    
                    System.out.println("Context:");
                    System.out.println(errorLine);
                    System.out.println(pointer.toString());
                }
            }
        } catch (Exception e) {
            System.out.println("Other error: " + e.getMessage());
        }
    }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">C# (.NET)</h2>
          <p>
            C# provides rich error information and configuration options.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modern .NET uses <code>System.Text.Json</code> namespace</li>
            <li>Key method is <code>JsonSerializer.Deserialize()</code></li>
            <li>Throws <code>JsonException</code> with path, line, byte position, and message</li>
            <li>Offers configuration options to control parsing behavior</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">C# Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class JsonErrorDemo
{
    public static void Main()
    {
        string jsonWithError = @"{
    ""name"": ""C#"",
    ""version"": 10,
    ""features"": [""Records"", ""Pattern matching"",]  // Invalid - trailing comma
}";
        
        try
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                AllowTrailingCommas = false  // For demonstration, default is false
            };
            
            var data = JsonSerializer.Deserialize<dynamic>(jsonWithError, options);
            Console.WriteLine("Successfully parsed");
        }
        catch (JsonException e)
        {
            Console.WriteLine($"JSON Error: {e.Message}");
            // Output includes line, position, and path:
            // "JSON Error: ',' is an invalid start of a value. Path: $.features[1] | LineNumber: 4 | BytePositionInLine: 44."
            
            // Extract line and position info
            int lineNumber = 0;
            int position = 0;
            string path = "";
            
            // Parse error details from message
            var lineMatch = System.Text.RegularExpressions.Regex.Match(e.Message, @"LineNumber: (\d+)");
            if (lineMatch.Success)
                lineNumber = int.Parse(lineMatch.Groups[1].Value);
                
            var posMatch = System.Text.RegularExpressions.Regex.Match(e.Message, @"BytePositionInLine: (\d+)");
            if (posMatch.Success)
                position = int.Parse(posMatch.Groups[1].Value);
                
            var pathMatch = System.Text.RegularExpressions.Regex.Match(e.Message, @"Path: ([^|]+)");
            if (pathMatch.Success)
                path = pathMatch.Groups[1].Value.Trim();
            
            Console.WriteLine($"Error at line {lineNumber}, position {position}, path {path}");
            
            // Display the problematic line
            string[] lines = jsonWithError.Split('\n');
            if (lineNumber > 0 && lineNumber <= lines.Length)
            {
                string errorLine = lines[lineNumber - 1];
                Console.WriteLine("\\nContext:");
                Console.WriteLine(errorLine);
                
                // Create pointer to error position
                string pointer = new string(' ', position) + "^";
                Console.WriteLine(pointer);
            }
        }
    }
}`}
              </pre>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg dark:bg-yellow-900/30 my-6 border-l-4 border-yellow-400">
            <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300">C# Feature Note:</h3>
            <p className="mt-2 text-yellow-700 dark:text-yellow-200">
              Unlike most other languages, System.Text.Json in .NET offers the <code>AllowTrailingCommas</code> option, 
              which can be set to <code>true</code> to make the parser more lenient about trailing commas in objects and arrays.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">PHP</h2>
          <p>
            PHP offers simple but effective JSON parsing with function-based error handling.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uses <code>json_decode()</code> function for parsing</li>
            <li>Returns <code>null</code> on parsing failure rather than throwing exceptions</li>
            <li>Error details can be retrieved with <code>json_last_error()</code> and <code>json_last_error_msg()</code></li>
            <li>Error messages tend to be less descriptive than other languages</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">PHP Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`<?php
// Basic error handling in PHP
$jsonString = '{"name": "Michael", "age": 42,}'; // Invalid JSON - trailing comma

$data = json_decode($jsonString);
if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    echo "Error: " . json_last_error_msg() . "\\n";
    // Output: "Error: Syntax error"
}

// Enhanced error handling with context
function parseJsonWithContext($jsonString) {
    $result = json_decode($jsonString);
    if ($result !== null || json_last_error() === JSON_ERROR_NONE) {
        return ['data' => $result, 'error' => null];
    }
    
    $error = json_last_error_msg();
    
    // PHP's error messages don't include position information
    // Let's do some heuristic-based context extraction
    
    // For trailing commas, look for patterns like ",}"
    if (preg_match('/,\\s*[\\}\\]]/', $jsonString, $matches, PREG_OFFSET_CAPTURE)) {
        $pos = $matches[0][1];
        $excerpt = substr($jsonString, max(0, $pos - 20), 40);
        $error .= "\\nPossible trailing comma near: " . $excerpt;
    }
    
    // For unquoted keys or values
    if (preg_match('/[{,]\\s*([^"\\s][^:]*):/', $jsonString, $matches)) {
        $error .= "\\nPossible unquoted property name: " . $matches[1];
    }
    
    return ['data' => null, 'error' => $error];
}

$result = parseJsonWithContext($jsonString);
if ($result['error']) {
    echo $result['error'] . "\\n";
}
?>`}
              </pre>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-6">Common PHP JSON Errors</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-hidden overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Error Constant</th>
                  <th className="p-2 text-left">Message</th>
                  <th className="p-2 text-left">Common Cause</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>JSON_ERROR_SYNTAX</code></td>
                  <td className="p-2">Syntax error</td>
                  <td className="p-2">Most syntax errors (unhelpfully generic)</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>JSON_ERROR_UTF8</code></td>
                  <td className="p-2">Malformed UTF-8 characters</td>
                  <td className="p-2">Encoding issues or invalid characters</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2"><code>JSON_ERROR_DEPTH</code></td>
                  <td className="p-2">Maximum stack depth exceeded</td>
                  <td className="p-2">Nested structures exceeding limits</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Ruby</h2>
          <p>
            Ruby offers concise but informative JSON parsing errors.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uses the <code>json</code> gem (part of standard library since Ruby 1.9)</li>
            <li>Parsing is done with <code>JSON.parse()</code></li>
            <li>Raises <code>JSON::ParserError</code> with line, column, and token information</li>
            <li>Error messages are concise but helpful</li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Ruby Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`require 'json'

# Basic error handling
begin
  data = JSON.parse('{"name": "Ruby", "version": 3.1,}')  # Invalid JSON - trailing comma
rescue JSON::ParserError => e
  puts "Error: #{e.message}"
  # Output: "Error: unexpected token at '{"name": "Ruby", "version": 3.1,}'"
end

# Enhanced error visualization
def parse_with_context(json_str)
  begin
    JSON.parse(json_str)
  rescue JSON::ParserError => e
    # Extract error location from message if available
    # Ruby's error messages don't always include position details
    pos_match = e.message.match(/at '(.*)'$/)
    error_context = pos_match ? pos_match[1] : ""
    
    puts "JSON Parse Error: #{e.message}"
    
    # Try to identify the problematic location
    if json_str.include?(error_context)
      position = json_str.index(error_context)
      before = json_str[0...position].split("\\n")
      line_num = before.length
      column = before.empty? ? 0 : before.last.length
      
      puts "Approximate location: Line #{line_num}, Column #{column}"
      
      # Show a few lines of context
      lines = json_str.split("\\n")
      start_line = [0, line_num - 3].max
      end_line = [lines.length - 1, line_num + 2].min
      
      puts "\\nContext:"
      (start_line..end_line).each do |i|
        line_marker = i + 1 == line_num ? ">" : " "
        puts "#{line_marker} #{i + 1}: #{lines[i]}"
      end
    end
    
    return nil
  end
end

parse_with_context('{"name": "Ruby", "version": 3.1,}')`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Go</h2>
          <p>
            Go provides detailed error information with a focus on simplicity.
          </p>
          
          <h3 className="text-xl font-medium mt-6">Parsing Mechanism</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Uses the standard library&apos;s <code>encoding/json</code> package</li>
            <li>Primary method is <code>json.Unmarshal()</code></li>
            <li>Returns errors with detailed messages including line/column information</li>
            <li>Error types include <code>*json.SyntaxError</code> and <code>*json.UnmarshalTypeError</code></li>
          </ul>
          
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
            <h3 className="text-lg font-medium">Go Example:</h3>
            <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
              <pre>
{`package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    jsonString := \`{
        "name": "Go",
        "version": 1.18,
    }\`  // Invalid JSON - trailing comma
    
    var data map[string]interface{}
    err := json.Unmarshal([]byte(jsonString), &data)
    
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        
        // Check for specific error types
        if syntaxErr, ok := err.(*json.SyntaxError); ok {
            // Get the approximate line/column
            line, col := findLineCol(jsonString, int(syntaxErr.Offset))
            fmt.Printf("Syntax error at line %d, column %d\\n", line, col)
            
            // Print the problematic line
            printErrorContext(jsonString, line)
        }
    } else {
        fmt.Println("Parsed successfully:", data)
    }
}

// Helper to find line and column from byte offset
func findLineCol(input string, offset int) (line, col int) {
    line = 1
    col = 1
    
    for i := 0; i < offset && i < len(input); i++ {
        if input[i] == '\\n' {
            line++
            col = 1
        } else {
            col++
        }
    }
    
    return line, col
}

// Helper to print the context of the error
func printErrorContext(input string, errorLine int) {
    lines := strings.Split(input, "\\n")
    if errorLine > 0 && errorLine <= len(lines) {
        startLine := max(0, errorLine-2)
        endLine := min(len(lines), errorLine+2)
        
        fmt.Println("Error context:")
        for i := startLine; i < endLine; i++ {
            prefix := "  "
            if i+1 == errorLine {
                prefix = "> "
            }
            fmt.Printf("%s%d: %s\\n", prefix, i+1, lines[i])
        }
    }
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8">Cross-Language Comparison</h2>
          
          <h3 className="text-xl font-medium mt-6">Error Information Richness</h3>
          <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4 overflow-hidden overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-2 text-left">Language</th>
                  <th className="p-2 text-left">Position Info</th>
                  <th className="p-2 text-left">Error Detail</th>
                  <th className="p-2 text-left">Context Info</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">JavaScript</td>
                  <td className="p-2">Character position only</td>
                  <td className="p-2">Minimal</td>
                  <td className="p-2">None</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Python</td>
                  <td className="p-2">Line, column, position</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">None, but error class is specific</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Java (Jackson)</td>
                  <td className="p-2">Line, column, position</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">Detailed token expectations</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">C# (.NET)</td>
                  <td className="p-2">Line, position, path</td>
                  <td className="p-2">Excellent</td>
                  <td className="p-2">JSON path to error</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">PHP</td>
                  <td className="p-2">None</td>
                  <td className="p-2">Poor</td>
                  <td className="p-2">Error constant only</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Ruby</td>
                  <td className="p-2">Partial (in message)</td>
                  <td className="p-2">Moderate</td>
                  <td className="p-2">Problematic token</td>
                </tr>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-2">Go</td>
                  <td className="p-2">Byte offset</td>
                  <td className="p-2">Good</td>
                  <td className="p-2">Specific error types</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-medium mt-6">Common Error Patterns Across Languages</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Similar error detection</strong> - Most languages catch the same core syntax errors</li>
            <li><strong>Position reporting variation</strong> - Some give character-level precision, others only line numbers</li>
            <li><strong>Error message clarity</strong> - Ranges from cryptic (PHP) to very descriptive (Java/C#)</li>
            <li><strong>Context provision</strong> - Most require custom code to show the problematic JSON context</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Best Practices for Cross-Language JSON</h2>
          
          <h3 className="text-xl font-medium mt-6">1. Validate Before Sending</h3>
          <p>
            Always validate JSON before transmitting it to other systems, especially if those systems 
            use different programming languages:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use a JSON validator in your primary language</li>
            <li>Consider a schema validation system like JSON Schema</li>
            <li>Add integration tests that verify JSON compatibility</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">2. Enhance Error Reporting</h3>
          <p>
            Implement better error handling in your application:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create wrapper functions that provide consistent, detailed error messages</li>
            <li>Include visual context (the problematic line, pointer to error position)</li>
            <li>For languages with poor position reporting (like PHP), implement heuristics to locate errors</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">3. Use Language-Appropriate Features</h3>
          <p>
            Take advantage of language-specific features:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>JavaScript: Consider libraries like <code>json5</code> or <code>jju</code> for more detailed errors</li>
            <li>Python: Use the <code>JSONDecodeError</code> exception directly for detailed position information</li>
            <li>Java: Choose Jackson for better error reporting than alternatives</li>
            <li>C#: Enable appropriate <code>JsonSerializerOptions</code> based on your needs</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6">4. Standardize Error Handling Code</h3>
          <p>
            Create reusable error handling patterns to use across your projects:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create utility functions for parsing with enhanced error reporting</li>
            <li>Implement language-specific wrappers with consistent error formats</li>
            <li>Consider building or using middleware for web APIs that standardizes JSON error handling</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
          <p>
            Understanding how different programming languages handle JSON parsing errors is essential 
            when debugging cross-platform applications or building systems that communicate via JSON.
          </p>
          
          <p>
            Each language has its own approach to error reporting, from JavaScript&apos;s minimal position information 
            to C#&apos;s and Java&apos;s detailed error context. By enhancing the default error handling with custom 
            visualizations and context information, you can create a more consistent debugging experience 
            regardless of the language you&apos;re working with.
          </p>
          
          <p>
            Remember that prevention is better than debugging — validate JSON at creation time, use schema 
            validation where appropriate, and implement thorough testing to catch JSON issues before they 
            reach production.
          </p>
        </div>
        
        <div className="mt-10">
          <ArticlePromo />
        </div>
      </div>
    </ArticlePromoProvider>
  );
} 