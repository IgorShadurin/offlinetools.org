import {
  TimerState,
  TimerPreset,
  DEFAULT_TIMER_OPTIONS,
  formatTimerTime,
  parseTimeString,
  validateTimerTime
} from './index';

describe('Online Timer', () => {

  describe('formatTimerTime', () => {
    it('should format seconds correctly in MM:SS format', () => {
      expect(formatTimerTime(0)).toBe('00:00');
      expect(formatTimerTime(30)).toBe('00:30');
      expect(formatTimerTime(60)).toBe('01:00');
      expect(formatTimerTime(90)).toBe('01:30');
      expect(formatTimerTime(3599)).toBe('59:59');
    });

    it('should format seconds correctly in HH:MM:SS format', () => {
      expect(formatTimerTime(3600)).toBe('01:00:00');
      expect(formatTimerTime(3661)).toBe('01:01:01');
      expect(formatTimerTime(7200)).toBe('02:00:00');
      expect(formatTimerTime(356399)).toBe('98:59:59');
    });

    it('should handle negative values', () => {
      expect(formatTimerTime(-1)).toBe('00:00');
      expect(formatTimerTime(-100)).toBe('00:00');
    });
  });

  describe('parseTimeString', () => {
    it('should parse MM:SS format correctly', () => {
      expect(parseTimeString('00:00')).toBe(0);
      expect(parseTimeString('01:30')).toBe(90);
      expect(parseTimeString('59:59')).toBe(3599);
    });

    it('should parse HH:MM:SS format correctly', () => {
      expect(parseTimeString('01:00:00')).toBe(3600);
      expect(parseTimeString('01:01:01')).toBe(3661);
      expect(parseTimeString('99:59:59')).toBe(359999);
    });

    it('should throw error for invalid formats', () => {
      expect(() => parseTimeString('invalid')).toThrow('Invalid time format');
      expect(() => parseTimeString('1:2:3:4')).toThrow('Invalid time format');
      expect(() => parseTimeString('')).toThrow('Invalid time format');
    });

    it('should throw error for invalid values', () => {
      expect(() => parseTimeString('01:60')).toThrow('Seconds must be less than 60');
      expect(() => parseTimeString('100:00:00')).toThrow('Hours must be less than 100');
      expect(() => parseTimeString('01:60:00')).toThrow('Minutes and seconds must be less than 60');
      expect(() => parseTimeString('01:00:60')).toThrow('Minutes and seconds must be less than 60');
    });

    it('should throw error for negative values', () => {
      expect(() => parseTimeString('-1:00')).toThrow('Invalid time values');
      expect(() => parseTimeString('01:-30')).toThrow('Invalid time values');
    });
  });

  describe('validateTimerTime', () => {
    it('should validate time ranges correctly', () => {
      expect(validateTimerTime(0)).toBe(false);
      expect(validateTimerTime(1)).toBe(true);
      expect(validateTimerTime(3600)).toBe(true);
      expect(validateTimerTime(99 * 3600)).toBe(true);
      expect(validateTimerTime(99 * 3600 + 1)).toBe(false);
    });

    it('should reject non-integers', () => {
      expect(validateTimerTime(1.5)).toBe(false);
      expect(validateTimerTime(NaN)).toBe(false);
      expect(validateTimerTime(Infinity)).toBe(false);
    });

    it('should reject negative values', () => {
      expect(validateTimerTime(-1)).toBe(false);
      expect(validateTimerTime(-100)).toBe(false);
    });
  });

  describe('Timer presets', () => {
    it('should have correct preset values', () => {
      expect(TimerPreset.ONE_MINUTE).toBe(60);
      expect(TimerPreset.TEN_MINUTES).toBe(600);
      expect(TimerPreset.TWENTY_FIVE_MINUTES).toBe(1500);
      expect(TimerPreset.SIXTY_MINUTES).toBe(3600);
    });
  });

  describe('Default options', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_TIMER_OPTIONS).toEqual({
        initialTime: TimerPreset.SIXTY_MINUTES,
        enableTickSound: true,
        enableSuccessSound: true
      });
    });
  });
});
