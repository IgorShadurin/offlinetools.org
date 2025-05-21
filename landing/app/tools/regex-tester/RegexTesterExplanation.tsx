export default function RegexTesterExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About Regular Expressions</h2>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">What is a Regular Expression?</h3>
        <p>
          A regular expression (regex) is a sequence of characters that defines a search pattern. 
          These patterns can be used for string matching, search and replace operations, and data validation.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Test patterns against strings to find matches</li>
          <li>Extract specific parts of text using capture groups</li>
          <li>Validate input formats like email addresses, phone numbers, etc.</li>
          <li>Perform complex search and replace operations</li>
          <li>Parse and transform text data</li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Form Validation</strong>
            <p>Validate email addresses, phone numbers, passwords, and other user inputs to ensure they match required formats.</p>
          </li>
          <li>
            <strong>Data Extraction</strong>
            <p>Extract specific information from text, such as dates, URLs, or custom data formats.</p>
          </li>
          <li>
            <strong>Search and Replace</strong>
            <p>Find and replace text patterns in documents, code, or data files with precision.</p>
          </li>
          <li>
            <strong>Text Parsing</strong>
            <p>Parse structured text like logs, CSV data, or configuration files to extract meaningful information.</p>
          </li>
          <li>
            <strong>Code Analysis</strong>
            <p>Search for specific patterns in source code for refactoring, analysis, or documentation purposes.</p>
          </li>
          <li>
            <strong>Data Cleaning</strong>
            <p>Clean and normalize data by identifying and transforming inconsistent formats.</p>
          </li>
          <li>
            <strong>URL Routing</strong>
            <p>Define URL patterns for web application routing and parameter extraction.</p>
          </li>
        </ol>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Regex Syntax Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Character Classes</h4>
            <ul className="space-y-1">
              <li><code className="bg-muted px-1 rounded">\d</code> - Digit (0-9)</li>
              <li><code className="bg-muted px-1 rounded">\w</code> - Word character (a-z, A-Z, 0-9, _)</li>
              <li><code className="bg-muted px-1 rounded">\s</code> - Whitespace</li>
              <li><code className="bg-muted px-1 rounded">[abc]</code> - Any character in the set</li>
              <li><code className="bg-muted px-1 rounded">[^abc]</code> - Any character not in the set</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Quantifiers</h4>
            <ul className="space-y-1">
              <li><code className="bg-muted px-1 rounded">*</code> - 0 or more</li>
              <li><code className="bg-muted px-1 rounded">+</code> - 1 or more</li>
              <li><code className="bg-muted px-1 rounded">?</code> - 0 or 1</li>
              <li><code className="bg-muted px-1 rounded">{"{n}"}</code> - Exactly n times</li>
              <li><code className="bg-muted px-1 rounded">{"{n,m}"}</code> - Between n and m times</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Anchors</h4>
            <ul className="space-y-1">
              <li><code className="bg-muted px-1 rounded">^</code> - Start of string/line</li>
              <li><code className="bg-muted px-1 rounded">$</code> - End of string/line</li>
              <li><code className="bg-muted px-1 rounded">\b</code> - Word boundary</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Groups and Alternation</h4>
            <ul className="space-y-1">
              <li><code className="bg-muted px-1 rounded">(abc)</code> - Capture group</li>
              <li><code className="bg-muted px-1 rounded">(?:abc)</code> - Non-capturing group</li>
              <li><code className="bg-muted px-1 rounded">a|b</code> - Alternation (a or b)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>
          This regex tester uses JavaScript's built-in RegExp implementation. All processing happens locally in your browser, 
          ensuring your data never leaves your device. The tool supports all standard JavaScript regex flags:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>g (Global)</strong> - Find all matches rather than stopping after the first match</li>
          <li><strong>i (Case Insensitive)</strong> - Make the regex case insensitive</li>
          <li><strong>m (Multiline)</strong> - Make ^ and $ match the start/end of each line</li>
          <li><strong>s (Dot All)</strong> - Make . match newlines as well</li>
          <li><strong>u (Unicode)</strong> - Enable Unicode features</li>
          <li><strong>y (Sticky)</strong> - Match only from the lastIndex position</li>
        </ul>
        <p className="mt-4">
          The match highlighting feature visually shows where your pattern matches in the test string, 
          and the match details section provides information about each match, including capture groups.
        </p>
      </div>
    </div>
  );
}
