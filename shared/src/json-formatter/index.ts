/**
 * Indentation options for JSON formatting
 */
export enum JsonIndentationType {
  /** Format with 2 spaces indentation */
  TwoSpaces = '2 spaces',
  /** Format with 4 spaces indentation */
  FourSpaces = '4 spaces',
  /** Format with tab indentation */
  OneTab = '1 tab',
  /** Format with no whitespace (minified) */
  Minified = 'Minified',
}

/**
 * Options for JSON formatting
 */
export interface JsonFormatterOptions {
  /** Type of indentation to use */
  indentation: JsonIndentationType;
}

/**
 * Default JSON formatter options (2 spaces indentation)
 */
export const DEFAULT_JSON_FORMATTER_OPTIONS: JsonFormatterOptions = {
  indentation: JsonIndentationType.TwoSpaces,
};

/**
 * Formats a JSON string with the specified options
 * @param jsonString - The JSON string to format
 * @param options - The formatting options
 * @returns The formatted JSON string
 * @throws {Error} If the input is not valid JSON
 */
export function formatJson(
  jsonString: string,
  options: JsonFormatterOptions = DEFAULT_JSON_FORMATTER_OPTIONS
): string {
  // Parse the JSON string to verify it's valid
  try {
    const parsedJson = JSON.parse(jsonString);
    
    // Determine the space parameter based on the indentation option
    let space: string | number;
    switch (options.indentation) {
      case JsonIndentationType.TwoSpaces:
        space = 2;
        break;
      case JsonIndentationType.FourSpaces:
        space = 4;
        break;
      case JsonIndentationType.OneTab:
        space = '\t';
        break;
      case JsonIndentationType.Minified:
        space = 0;
        break;
      default:
        space = 2; // Default to 2 spaces
    }
    
    // Return the formatted JSON
    return JSON.stringify(parsedJson, null, space);
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`);
  }
} 