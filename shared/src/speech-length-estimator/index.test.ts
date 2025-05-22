import { 
  estimateSpeechLength, 
  formatTime, 
  getFormattedSpeechLength, 
  SpeechLengthOptions,
  SpeechSpeed,
  SPEECH_SPEED_WPM
} from './index';

describe('Speech Length Estimator', () => {
  describe('estimateSpeechLength', () => {
    it('should correctly estimate speech length for normal text', () => {
      const text = 'This is a normal sentence with ten words in it.';
      const options = { wpm: 130, includePauses: false };
      const result = estimateSpeechLength(text, options);
      expect(result).toBeCloseTo(4615, -2);
    });

    it('should respect provided options', () => {
      const text = 'This is a test sentence.';
      
      const slowOptions = { wpm: SPEECH_SPEED_WPM[SpeechSpeed.SLOW], includePauses: false };
      const slowResult = estimateSpeechLength(text, slowOptions);
      
      const fastOptions = { wpm: SPEECH_SPEED_WPM[SpeechSpeed.FAST], includePauses: false };
      const fastResult = estimateSpeechLength(text, fastOptions);
      
      expect(fastResult).toBeLessThan(slowResult);
    });

    it('should add time for pauses when includePauses is true', () => {
      const text = 'This is a test. With multiple. Sentences!';
      
      const withoutPauses = { wpm: 130, includePauses: false };
      const withoutPausesResult = estimateSpeechLength(text, withoutPauses);
      
      const withPauses = { wpm: 130, includePauses: true };
      const withPausesResult = estimateSpeechLength(text, withPauses);
      
      expect(withPausesResult).toBeGreaterThan(withoutPausesResult);
    });

    it('should return 0 for empty input', () => {
      expect(estimateSpeechLength('')).toBe(0);
      expect(estimateSpeechLength(undefined as unknown as string)).toBe(0);
    });

    it('should handle special and unicode characters correctly', () => {
      const input = 'Special chars: &%$#@! and Unicode: こんにちは世界';
      expect(() => estimateSpeechLength(input)).not.toThrow();
    });

    it('should handle longer texts correctly', () => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      expect(() => estimateSpeechLength(longText)).not.toThrow();
    });
  });

  describe('formatTime', () => {
    it('should format milliseconds into MM:SS when less than an hour', () => {
      expect(formatTime(0)).toBe('0:00');
      expect(formatTime(1000)).toBe('0:01');
      expect(formatTime(60000)).toBe('1:00');
      expect(formatTime(90000)).toBe('1:30');
      expect(formatTime(3599000)).toBe('59:59');
    });

    it('should format milliseconds into HH:MM:SS when an hour or more', () => {
      expect(formatTime(3600000)).toBe('1:00:00');
      expect(formatTime(3661000)).toBe('1:01:01');
      expect(formatTime(7200000)).toBe('2:00:00');
    });

    it('should handle negative values', () => {
      expect(formatTime(-1000)).toBe('0:00');
    });
  });

  describe('getFormattedSpeechLength', () => {
    it('should return a formatted string of the estimated speech length', () => {
      const text = 'This is a test sentence with seven words.';
      const result = getFormattedSpeechLength(text);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^\d+:\d{2}(:\d{2})?$/);
    });

    it('should handle empty input', () => {
      expect(getFormattedSpeechLength('')).toBe('0:00');
    });
  });
});
