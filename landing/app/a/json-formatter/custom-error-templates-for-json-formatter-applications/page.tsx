import type { Metadata } from "next";

/**
 * Metadata for JSON formatter article about custom error templates
 */
export const metadata: Metadata = {
  title: "Custom Error Templates for JSON Formatter Applications | Offline Tools",
  description:
    "Learn how to design and implement custom error templates for JSON formatter applications to improve user experience and error handling",
};

/**
 * Article page component for JSON formatter article about custom error templates
 */
export default function JsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Custom Error Templates for JSON Formatter Applications</h1>

      <div className="space-y-6">
        <p>
          Well-designed error templates are essential for JSON formatters, helping users quickly identify and fix issues
          in their data. This article explores how to create custom error templates that enhance user experience,
          increase error resolution speed, and make your JSON formatter more user-friendly.
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. The Anatomy of Effective JSON Error Templates</h2>
        <p>
          Before diving into implementation, it's important to understand what makes an error template effective. A good
          JSON error template should include several key components.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">Key Components:</h3>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              <strong>Error Type Identification</strong> - Clear categorization of the error (syntax, schema, etc.)
            </li>
            <li>
              <strong>Error Location</strong> - Precise line and column numbers where the error occurred
            </li>
            <li>
              <strong>Visual Context</strong> - Snippet of code surrounding the error with highlighting
            </li>
            <li>
              <strong>Error Description</strong> - Plain language explanation of what went wrong
            </li>
            <li>
              <strong>Correction Suggestion</strong> - Actionable guidance on how to fix the issue
            </li>
            <li>
              <strong>Documentation Link</strong> - Reference to more detailed explanations for complex errors
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8">2. Implementing Error Template System Architecture</h2>
        <p>
          A flexible error template system allows for customization while maintaining consistency. Here's a basic
          architecture for implementing custom error templates in a JSON formatter.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Template System Structure:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Error template interface
interface ErrorTemplate {
  id: string;
  title: string;
  description: (params: any) => string;
  suggestion: (params: any) => string;
  severity: 'critical' | 'error' | 'warning' | 'info';
  documentationUrl?: string;
  renderHighlight?: (context: string, position: number) => JSX.Element;
}

// Error template registry
const errorTemplates: Record<string, ErrorTemplate> = {
  SYNTAX_UNEXPECTED_TOKEN: {
    id: 'SYNTAX_UNEXPECTED_TOKEN',
    title: 'Unexpected Token',
    description: (params) => \`Unexpected token '\${params.token}' found at position \${params.position}.\`,
    suggestion: (params) => {
      if (params.token === '}')
        return "Check for a missing comma between properties or a missing opening brace.";
      if (params.token === ']')
        return "Check for a missing comma between array items or a missing opening bracket.";
      return "Verify the syntax around this position.";
    },
    severity: 'error',
    documentationUrl: '/docs/json-syntax-errors#unexpected-token',
    renderHighlight: (context, position) => {
      // Implementation of custom highlighting for this error type
      // ...
    }
  },
  
  // More error templates...
  SYNTAX_MISSING_COLON: {
    id: 'SYNTAX_MISSING_COLON',
    title: 'Missing Colon',
    description: (params) => \`Expected a colon after property name '\${params.property}'.\`,
    suggestion: () => "Add a colon between the property name and its value.",
    severity: 'error',
    documentationUrl: '/docs/json-syntax-errors#missing-colon'
  }
};

// Error template manager
class ErrorTemplateManager {
  getTemplate(errorType: string): ErrorTemplate {
    const template = errorTemplates[errorType];
    if (!template) {
      return this.getDefaultTemplate();
    }
    return template;
  }
  
  getDefaultTemplate(): ErrorTemplate {
    return {
      id: 'GENERIC_ERROR',
      title: 'JSON Error',
      description: (params) => params.message || 'An error occurred while processing the JSON.',
      suggestion: () => "Check the syntax of your JSON document.",
      severity: 'error'
    };
  }
  
  renderError(error: any): JSX.Element {
    const template = this.getTemplate(error.code);
    // Implementation of error rendering using the template
    // ...
  }
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">3. Context-Aware Error Highlighting</h2>
        <p>
          One of the most valuable features of custom error templates is the ability to show errors in context. This
          helps users quickly identify and fix issues.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Implementation Example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`function renderErrorContext(jsonString: string, position: number, range: number = 20): JSX.Element {
  // Find the line number and column
  const lines = jsonString.substring(0, position).split('\\n');
  const lineNumber = lines.length;
  const columnNumber = lines[lines.length - 1].length + 1;
  
  // Extract context before and after the error
  const contextStart = Math.max(0, position - range);
  const contextEnd = Math.min(jsonString.length, position + range);
  const context = jsonString.substring(contextStart, contextEnd);
  
  // Calculate the relative position of the error in the context
  const errorIndex = position - contextStart;
  
  // Split the context into before, error, and after parts
  const beforeError = context.substring(0, errorIndex);
  const errorChar = context.substring(errorIndex, errorIndex + 1) || ' ';
  const afterError = context.substring(errorIndex + 1);
  
  return (
    <div className="error-context">
      <div className="line-info">
        Line {lineNumber}, Column {columnNumber}
      </div>
      <pre className="context-display">
        <span className="context-before">{beforeError}</span>
        <span className="error-character">{errorChar}</span>
        <span className="context-after">{afterError}</span>
      </pre>
      <div className="error-pointer">
        {''.padStart(beforeError.length, ' ')}^
      </div>
    </div>
  );
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">4. Error Template Customization Options</h2>
        <p>
          Allowing users to customize error templates can help them adapt the formatter to their specific needs and
          workflows.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">User Customization Interface:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// User preferences for error display
interface ErrorDisplayPreferences {
  showLineNumbers: boolean;
  contextRange: number;
  highlightStyle: 'underline' | 'background' | 'box';
  showSuggestions: boolean;
  expandedByDefault: boolean;
  groupSimilarErrors: boolean;
}

// Default preferences
const defaultPreferences: ErrorDisplayPreferences = {
  showLineNumbers: true,
  contextRange: 20,
  highlightStyle: 'background',
  showSuggestions: true,
  expandedByDefault: true,
  groupSimilarErrors: false
};

// Function to apply user preferences to error rendering
function applyErrorPreferences(
  errorElement: JSX.Element, 
  preferences: ErrorDisplayPreferences = defaultPreferences
): JSX.Element {
  // Implementation to modify the error display based on preferences
  // ...
}

// Settings UI component for error template customization
function ErrorTemplateSettings({ 
  preferences, 
  onChange 
}: { 
  preferences: ErrorDisplayPreferences; 
  onChange: (newPreferences: ErrorDisplayPreferences) => void;
}) {
  // UI implementation for customization
  // ...
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">5. Specialized Error Templates for Common JSON Issues</h2>
        <p>
          Creating specialized templates for the most common JSON errors can significantly improve the user experience.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium">Missing Brackets Error Template:</h3>

          <div className="border border-gray-300 rounded-lg overflow-hidden mt-4 dark:border-gray-700">
            <div className="bg-red-100 dark:bg-red-900/30 border-b border-gray-300 dark:border-gray-700 px-4 py-2 flex items-center">
              <svg
                className="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <span className="font-medium text-red-800 dark:text-red-300">Syntax Error: Missing Closing Bracket</span>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                The JSON structure is incomplete. A closing bracket ']' was expected but not found.
              </p>

              <div className="bg-gray-100 p-3 rounded dark:bg-gray-800 font-mono text-sm mb-3 relative overflow-x-auto">
                <div className="absolute top-0 left-0 p-1 text-xs text-gray-500 dark:text-gray-400">
                  Line 4, Column 7
                </div>
                <pre className="pt-5">
                  {`"items": [
  "apple",
  "banana",
  "orange"
`}
                </pre>
                <div className="border-b border-red-500 w-full"></div>
                <div className="text-red-500 text-center">^ Missing closing bracket ']' expected here</div>
              </div>

              <div className="bg-blue-50 p-3 rounded dark:bg-blue-900/20 mb-3">
                <span className="font-medium text-blue-700 dark:text-blue-300">Suggestion: </span>
                <span className="text-blue-600 dark:text-blue-300">
                  Add a closing bracket ']' after the last array item.
                </span>
              </div>

              <div className="bg-green-50 p-3 rounded dark:bg-green-900/20">
                <span className="font-medium text-green-700 dark:text-green-300">Correct syntax: </span>
                <pre className="text-green-600 dark:text-green-300 mt-1">
                  {`"items": [
  "apple",
  "banana",
  "orange"
]`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">6. Integrating Error Templates with IDE-like Features</h2>
        <p>
          Advanced JSON formatters can integrate error templates with IDE-like features such as inline fixes, code
          completion, and quick actions.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Advanced Integration Example:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`interface QuickFix {
  title: string;
  apply: (jsonString: string, position: number) => string;
}

// Extend error templates with quick fixes
interface AdvancedErrorTemplate extends ErrorTemplate {
  quickFixes?: QuickFix[];
}

// Example of an error template with quick fixes
const missingCommaTemplate: AdvancedErrorTemplate = {
  id: 'SYNTAX_MISSING_COMMA',
  title: 'Missing Comma',
  description: (params) => \`Missing comma between properties at position \${params.position}.\`,
  suggestion: () => "Add a comma between properties or array items.",
  severity: 'error',
  documentationUrl: '/docs/json-syntax-errors#missing-comma',
  quickFixes: [
    {
      title: "Insert comma",
      apply: (jsonString, position) => {
        return jsonString.substring(0, position) + ',' + jsonString.substring(position);
      }
    }
  ]
};

// Render quick fix buttons with the error
function renderQuickFixes(quickFixes: QuickFix[], jsonString: string, position: number): JSX.Element {
  return (
    <div className="quick-fixes">
      {quickFixes.map((fix, index) => (
        <button 
          key={index}
          className="quick-fix-button"
          onClick={() => applyQuickFix(fix, jsonString, position)}
        >
          {fix.title}
        </button>
      ))}
    </div>
  );
}

// Apply a quick fix and update the JSON editor
function applyQuickFix(fix: QuickFix, jsonString: string, position: number): void {
  const updatedJson = fix.apply(jsonString, position);
  // Update the editor with the fixed JSON
  // ...
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">7. Error Template Analytics and Improvements</h2>
        <p>Collecting and analyzing error data can help improve templates over time and identify common user issues.</p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h3 className="text-lg font-medium text-green-600 dark:text-green-400">Error Analytics Implementation:</h3>
          <pre className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            {`// Error tracking interface
interface ErrorOccurrence {
  templateId: string;
  timestamp: number;
  fixed: boolean;
  fixMethod?: 'quick-fix' | 'manual' | 'suggestion';
  timeToFix?: number; // milliseconds
  jsonLength: number;
}

// Track error occurrences
function trackErrorOccurrence(error: any, templateId: string): void {
  const occurrence: ErrorOccurrence = {
    templateId,
    timestamp: Date.now(),
    fixed: false,
    jsonLength: getCurrentJsonLength()
  };
  
  // Store the occurrence for later analysis
  storeErrorOccurrence(occurrence);
}

// Track error resolutions
function trackErrorResolution(occurrenceId: string, fixMethod: 'quick-fix' | 'manual' | 'suggestion'): void {
  // Update the stored occurrence with resolution details
  updateErrorOccurrence(occurrenceId, {
    fixed: true,
    fixMethod,
    timeToFix: calculateTimeToFix(occurrenceId)
  });
}

// Analyze error patterns to improve templates
function analyzeErrorPatterns(): ErrorAnalysisReport {
  // Implementation of error pattern analysis
  // ...
}`}
          </pre>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          Custom error templates are a powerful way to enhance the user experience of JSON formatter applications. By
          providing clear, context-aware error messages with actionable suggestions, you can help users quickly identify
          and fix issues in their JSON data. Implementing a flexible template system allows for customization and
          continuous improvement based on user needs and behaviors.
        </p>

        <p>
          The key to effective error templates is combining technical accuracy with user-friendly presentation. By
          focusing on both aspects, you can create a JSON formatter that not only detects errors but also educates users
          and helps them improve their JSON skills over time.
        </p>
      </div>
    </>
  );
}
