/**
 * Options for speech length estimation
 */
export interface SpeechLengthOptions {
  /** Words per minute rate */
  wpm: number;
  /** Consider pauses for punctuation */
  includePauses: boolean;
}

/**
 * Speed presets for speech estimation
 */
export enum SpeechSpeed {
  SLOW = 'slow',
  NORMAL = 'normal',
  FAST = 'fast',
  CUSTOM = 'custom'
}

/**
 * Standard words per minute rates for different speech speeds
 */
export const SPEECH_SPEED_WPM: Record<SpeechSpeed, number> = {
  [SpeechSpeed.SLOW]: 110,
  [SpeechSpeed.NORMAL]: 130,
  [SpeechSpeed.FAST]: 160,
  [SpeechSpeed.CUSTOM]: 130, // Default for custom
};

/**
 * Default options for speech length estimation
 */
export const DEFAULT_SPEECH_OPTIONS: SpeechLengthOptions = {
  wpm: SPEECH_SPEED_WPM[SpeechSpeed.NORMAL],
  includePauses: true
};

/**
 * Pause durations in milliseconds for different punctuation marks
 */
const PAUSE_DURATIONS: Record<string, number> = {
  '.': 600,
  '!': 600,
  '?': 600,
  ',': 300,
  ';': 400,
  ':': 400,
  '(': 200,
  ')': 200,
  '-': 200,
  '…': 800,
};

/**
 * Calculate the estimated time it would take to speak a text
 * @param text - The text to estimate
 * @param options - Options for estimation
 * @returns The estimated time in milliseconds
 */
export function estimateSpeechLength(
  text: string,
  options: SpeechLengthOptions = DEFAULT_SPEECH_OPTIONS
): number {
  try {
    if (!text) return 0;

    const { wpm, includePauses } = options;

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    let speechTimeMs = (wordCount / wpm) * 60 * 1000;

    if (includePauses) {
      let pauseTimeMs = 0;
      
      Object.entries(PAUSE_DURATIONS).forEach(([mark, duration]) => {
        const count = (text.match(new RegExp(`\\${mark}`, 'g')) || []).length;
        pauseTimeMs += count * duration;
      });

      speechTimeMs += pauseTimeMs;
    }

    return Math.round(speechTimeMs);
  } catch (error) {
    throw new Error(`Speech length estimation failed: ${(error as Error).message}`);
  }
}

/**
 * Format milliseconds into a human-readable time string (HH:MM:SS or MM:SS)
 * @param ms - Time in milliseconds
 * @returns Formatted time string
 */
export function formatTime(ms: number): string {
  try {
    if (ms <= 0) return '0:00';

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  } catch (error) {
    throw new Error(`Time formatting failed: ${(error as Error).message}`);
  }
}

/**
 * Estimate speech length and return formatted time
 * @param text - The text to estimate
 * @param options - Options for estimation
 * @returns Formatted time string
 */
export function getFormattedSpeechLength(
  text: string,
  options: SpeechLengthOptions = DEFAULT_SPEECH_OPTIONS
): string {
  try {
    const ms = estimateSpeechLength(text, options);
    return formatTime(ms);
  } catch (error) {
    throw new Error(`Formatted speech length estimation failed: ${(error as Error).message}`);
  }
}
