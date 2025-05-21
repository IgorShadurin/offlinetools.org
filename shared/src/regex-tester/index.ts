/**
 * Supported regex flags
 */
export enum RegexFlag {
  /** Global match (find all matches) */
  GLOBAL = 'g',
  /** Case-insensitive match */
  CASE_INSENSITIVE = 'i',
  /** Multi-line mode (^ and $ match start/end of each line) */
  MULTILINE = 'm',
  /** Dot matches newlines */
  DOT_ALL = 's',
  /** Unicode support */
  UNICODE = 'u',
  /** Sticky mode (match at current position only) */
  STICKY = 'y',
}

/**
 * A match result from regex testing
 */
export interface RegexMatch {
  /** The matched string */
  text: string;
  /** Start index of match */
  index: number;
  /** End index of match */
  endIndex: number;
  /** Array of captured groups */
  groups: Array<{
    /** The captured group text */
    text: string | undefined;
    /** Start index of group */
    index: number;
    /** End index of group */
    endIndex: number;
  }>;
}

/**
 * Options for regex testing
 */
export interface RegexTesterOptions {
  /** Regex flags to use */
  flags: RegexFlag[];
}

/**
 * Default regex tester options
 */
export const DEFAULT_REGEX_TESTER_OPTIONS: RegexTesterOptions = {
  flags: [RegexFlag.GLOBAL],
};

/**
 * Tests a regex pattern against a string
 * @param pattern - The regex pattern to test
 * @param testString - The string to test against
 * @param options - Options for regex testing
 * @returns Array of match results
 * @throws Error if the regex pattern is invalid
 */
export function testRegex(
  pattern: string,
  testString: string,
  options: RegexTesterOptions = DEFAULT_REGEX_TESTER_OPTIONS
): RegexMatch[] {
  try {
    if (!pattern || !testString) {
      return [];
    }

    let cleanPattern = pattern;
    if (pattern.startsWith('/') && pattern.lastIndexOf('/') > 0) {
      const lastSlashIndex = pattern.lastIndexOf('/');
      cleanPattern = pattern.substring(1, lastSlashIndex);
    }

    const flagsString = options.flags.join('');

    const regex = new RegExp(cleanPattern, flagsString);

    const matches: RegexMatch[] = [];

    if (flagsString.includes(RegexFlag.GLOBAL)) {
      let match: RegExpExecArray | null;
      while ((match = regex.exec(testString)) !== null) {
        const groups = match.slice(1).map((group, index) => {
          const groupText = group;
          let groupIndex = match!.index;
          
          for (let i = 0; i < index; i++) {
            if (match![i + 1] !== undefined) {
              groupIndex += match![i + 1].length;
            }
          }
          
          return {
            text: groupText,
            index: groupIndex,
            endIndex: groupIndex + (groupText?.length || 0),
          };
        });

        matches.push({
          text: match[0],
          index: match.index,
          endIndex: match.index + match[0].length,
          groups,
        });

        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    } else {
      const match = regex.exec(testString);
      if (match) {
        const groups = match.slice(1).map((group, index) => {
          const groupText = group;
          let groupIndex = match.index;
          
          for (let i = 0; i < index; i++) {
            if (match[i + 1] !== undefined) {
              groupIndex += match[i + 1].length;
            }
          }
          
          return {
            text: groupText,
            index: groupIndex,
            endIndex: groupIndex + (groupText?.length || 0),
          };
        });

        matches.push({
          text: match[0],
          index: match.index,
          endIndex: match.index + match[0].length,
          groups,
        });
      }
    }

    return matches;
  } catch (error) {
    throw new Error(`Invalid regex: ${(error as Error).message}`);
  }
}

/**
 * Validates if a regex pattern is valid
 * @param pattern - The regex pattern to validate
 * @param options - Options for regex validation
 * @returns True if the pattern is valid, false otherwise
 */
export function isValidRegex(
  pattern: string,
  options: RegexTesterOptions = DEFAULT_REGEX_TESTER_OPTIONS
): boolean {
  try {
    let cleanPattern = pattern;
    if (pattern.startsWith('/') && pattern.lastIndexOf('/') > 0) {
      const lastSlashIndex = pattern.lastIndexOf('/');
      cleanPattern = pattern.substring(1, lastSlashIndex);
    }

    const flagsString = options.flags.join('');
    
    new RegExp(cleanPattern, flagsString);
    return true;
  } catch {
    return false;
  }
}
