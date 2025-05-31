import { convertEthereumUnit, EthereumUnit, DEFAULT_ETHEREUM_CONVERTER_OPTIONS } from './index';

describe('Ethereum Unit Converter', () => {
  describe('convertEthereumUnit', () => {
    it('should convert 1 Ether to Wei correctly', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Ether, EthereumUnit.Wei);
      expect(result).toBe('1000000000000000000');
    });

    it('should convert 1 Wei to Ether correctly', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Wei, EthereumUnit.Ether);
      expect(result).toBe('0.000000000000000001');
    });

    it('should convert 1 Gwei to Wei correctly', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Gwei, EthereumUnit.Wei);
      expect(result).toBe('1000000000');
    });

    it('should convert 1 Ether to Gwei correctly', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Ether, EthereumUnit.Gwei);
      expect(result).toBe('1000000000');
    });

    it('should convert 1 Finney to Ether correctly', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Finney, EthereumUnit.Ether);
      expect(result).toBe('0.001');
    });

    it('should convert 1 Szabo to Gwei correctly', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Szabo, EthereumUnit.Gwei);
      expect(result).toBe('1000');
    });

    it('should handle decimal values correctly', () => {
      const result = convertEthereumUnit('0.5', EthereumUnit.Ether, EthereumUnit.Finney);
      expect(result).toBe('500');
    });

    it('should handle very small decimal values correctly', () => {
      const result = convertEthereumUnit('0.000000001', EthereumUnit.Ether, EthereumUnit.Gwei);
      expect(result).toBe('0.001');
    });

    it('should respect custom decimal places', () => {
      const result = convertEthereumUnit('1', EthereumUnit.Wei, EthereumUnit.Ether, { decimalPlaces: 10 });
      expect(result).toBe('0.0000000000000000001');
    });

    it('should return empty string for empty input', () => {
      expect(convertEthereumUnit('', EthereumUnit.Ether, EthereumUnit.Wei)).toBe('');
      expect(convertEthereumUnit('  ', EthereumUnit.Ether, EthereumUnit.Wei)).toBe('');
    });

    it('should throw an error for invalid input', () => {
      expect(() => {
        convertEthereumUnit('invalid', EthereumUnit.Ether, EthereumUnit.Wei);
      }).toThrow('Ethereum unit conversion failed');
    });

    it('should throw an error for negative numbers', () => {
      expect(() => {
        convertEthereumUnit('-1', EthereumUnit.Ether, EthereumUnit.Wei);
      }).toThrow('Ethereum unit conversion failed');
    });

    it('should return the same value when converting between the same units', () => {
      const result = convertEthereumUnit('123.456', EthereumUnit.Ether, EthereumUnit.Ether);
      expect(result).toBe('123.456');
    });

    it('should handle large numbers correctly', () => {
      const result = convertEthereumUnit('1000000', EthereumUnit.Ether, EthereumUnit.Wei);
      expect(result).toBe('1000000000000000000000000');
    });
  });
});
