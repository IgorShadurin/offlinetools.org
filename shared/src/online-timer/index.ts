/**
 * Timer state enumeration
 */
export enum TimerState {
  STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused',
  FINISHED = 'finished'
}

/**
 * Timer options interface
 */
export interface TimerOptions {
  /** Initial time in seconds */
  initialTime: number;
  /** Whether to play tick sound every 10 minutes */
  enableTickSound: boolean;
  /** Whether to play success sound on completion */
  enableSuccessSound: boolean;
}

/**
 * Timer preset options
 */
export enum TimerPreset {
  ONE_MINUTE = 60,
  TEN_MINUTES = 600,
  TWENTY_FIVE_MINUTES = 1500,
  SIXTY_MINUTES = 3600
}

/**
 * Default timer options
 */
export const DEFAULT_TIMER_OPTIONS: TimerOptions = {
  initialTime: TimerPreset.SIXTY_MINUTES,
  enableTickSound: true,
  enableSuccessSound: true
};

/**
 * Format time in seconds to HH:MM:SS or MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTimerTime(seconds: number): string {
  if (seconds <= 0) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Parse time string (HH:MM:SS or MM:SS) to seconds
 * @param timeString - Time string to parse
 * @returns Time in seconds
 * @throws {Error} If the time format is invalid
 */
export function parseTimeString(timeString: string): number {
  try {
    const parts = timeString.split(':').map(part => parseInt(part, 10));
    
    if (parts.some(part => isNaN(part) || part < 0)) {
      throw new Error('Invalid time values');
    }
    
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      if (seconds >= 60) throw new Error('Seconds must be less than 60');
      return (minutes * 60) + seconds;
    } else if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      if (hours >= 100) throw new Error('Hours must be less than 100');
      if (minutes >= 60 || seconds >= 60) throw new Error('Minutes and seconds must be less than 60');
      return (hours * 3600) + (minutes * 60) + seconds;
    }
    
    throw new Error('Invalid time format');
  } catch (error) {
    throw new Error(`Invalid time format. Use MM:SS or HH:MM:SS: ${(error as Error).message}`);
  }
}

/**
 * Validate time input (1 second to 99 hours)
 * @param seconds - Time in seconds to validate
 * @returns True if valid, false otherwise
 */
export function validateTimerTime(seconds: number): boolean {
  return Number.isInteger(seconds) && seconds >= 1 && seconds <= (99 * 3600);
}

/**
 * Play sound file
 * @param soundPath - Path to the sound file
 * @returns Promise that resolves when sound finishes playing
 */
export function playSound(soundPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }
      
      const audio = new Audio(soundPath);
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error(`Failed to play sound: ${soundPath}`));
      audio.play().catch(reject);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Save timer options to localStorage
 * @param options - Timer options to save
 */
export function saveTimerOptions(options: TimerOptions): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('onlineTimerOptions', JSON.stringify(options));
    } catch (error) {
      console.error('Error saving timer options:', error);
    }
  }
}

/**
 * Load timer options from localStorage
 * @returns Timer options from localStorage or defaults
 */
export function loadTimerOptions(): TimerOptions {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('onlineTimerOptions');
      if (saved) {
        return { ...DEFAULT_TIMER_OPTIONS, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading timer options:', error);
    }
  }
  return DEFAULT_TIMER_OPTIONS;
}

/**
 * Save current timer state to localStorage
 * @param remainingTime - Remaining time in seconds
 * @param state - Current timer state
 */
export function saveTimerState(remainingTime: number, state: TimerState): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('onlineTimerState', JSON.stringify({
        remainingTime,
        state,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving timer state:', error);
    }
  }
}

/**
 * Load timer state from localStorage
 * @returns Timer state from localStorage or null
 */
export function loadTimerState(): { remainingTime: number; state: TimerState } | null {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('onlineTimerState');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          remainingTime: parsed.remainingTime,
          state: parsed.state
        };
      }
    } catch (error) {
      console.error('Error loading timer state:', error);
    }
  }
  return null;
}

/**
 * Clear timer state from localStorage
 */
export function clearTimerState(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('onlineTimerState');
    } catch (error) {
      console.error('Error clearing timer state:', error);
    }
  }
}
