import {
  UnitCategory,
  LengthUnit,
  WeightUnit,
  TemperatureUnit,
  VolumeUnit,
  AreaUnit,
  EnergyUnit,
  PowerUnit,
  convertUnit,
  getUnitsForCategory,
  getUnitEnumForCategory
} from './index';

describe('Unit Converter', () => {
  describe('Length conversions', () => {
    test('converts meters to centimeters', () => {
      const result = convertUnit('1', LengthUnit.Meter, LengthUnit.Centimeter, UnitCategory.Length);
      expect(result).toBe('100');
    });

    test('converts kilometers to miles', () => {
      const result = convertUnit('1', LengthUnit.Kilometer, LengthUnit.Mile, UnitCategory.Length);
      expect(parseFloat(result)).toBeCloseTo(0.621371, 5);
    });

    test('converts inches to centimeters', () => {
      const result = convertUnit('1', LengthUnit.Inch, LengthUnit.Centimeter, UnitCategory.Length);
      expect(parseFloat(result)).toBeCloseTo(2.54, 2);
    });

    test('converts feet to meters', () => {
      const result = convertUnit('1', LengthUnit.Foot, LengthUnit.Meter, UnitCategory.Length);
      expect(parseFloat(result)).toBeCloseTo(0.3048, 4);
    });
  });

  describe('Weight conversions', () => {
    test('converts kilograms to grams', () => {
      const result = convertUnit('1', WeightUnit.Kilogram, WeightUnit.Gram, UnitCategory.Weight);
      expect(result).toBe('1000');
    });

    test('converts pounds to kilograms', () => {
      const result = convertUnit('1', WeightUnit.Pound, WeightUnit.Kilogram, UnitCategory.Weight);
      expect(parseFloat(result)).toBeCloseTo(0.453592, 5);
    });

    test('converts ounces to grams', () => {
      const result = convertUnit('1', WeightUnit.Ounce, WeightUnit.Gram, UnitCategory.Weight);
      expect(parseFloat(result)).toBeCloseTo(28.3495, 4);
    });
  });

  describe('Temperature conversions', () => {
    test('converts Celsius to Fahrenheit', () => {
      const result = convertUnit('0', TemperatureUnit.Celsius, TemperatureUnit.Fahrenheit, UnitCategory.Temperature);
      expect(result).toBe('32');
    });

    test('converts Fahrenheit to Celsius', () => {
      const result = convertUnit('32', TemperatureUnit.Fahrenheit, TemperatureUnit.Celsius, UnitCategory.Temperature);
      expect(result).toBe('0');
    });

    test('converts Celsius to Kelvin', () => {
      const result = convertUnit('0', TemperatureUnit.Celsius, TemperatureUnit.Kelvin, UnitCategory.Temperature);
      expect(parseFloat(result)).toBeCloseTo(273.15, 2);
    });

    test('converts Kelvin to Celsius', () => {
      const result = convertUnit('273.15', TemperatureUnit.Kelvin, TemperatureUnit.Celsius, UnitCategory.Temperature);
      expect(parseFloat(result)).toBeCloseTo(0, 2);
    });
  });

  describe('Volume conversions', () => {
    test('converts liters to milliliters', () => {
      const result = convertUnit('1', VolumeUnit.Liter, VolumeUnit.Milliliter, UnitCategory.Volume);
      expect(result).toBe('1000');
    });

    test('converts gallons to liters', () => {
      const result = convertUnit('1', VolumeUnit.Gallon, VolumeUnit.Liter, UnitCategory.Volume);
      expect(parseFloat(result)).toBeCloseTo(3.78541, 4);
    });
  });

  describe('Area conversions', () => {
    test('converts square meters to square centimeters', () => {
      const result = convertUnit('1', AreaUnit.SquareMeter, AreaUnit.SquareCentimeter, UnitCategory.Area);
      expect(result).toBe('10000');
    });

    test('converts acres to square meters', () => {
      const result = convertUnit('1', AreaUnit.Acre, AreaUnit.SquareMeter, UnitCategory.Area);
      expect(parseFloat(result)).toBeCloseTo(4046.86, 2);
    });
  });

  describe('Energy conversions', () => {
    test('converts joules to kilojoules', () => {
      const result = convertUnit('1000', EnergyUnit.Joule, EnergyUnit.Kilojoule, UnitCategory.Energy);
      expect(result).toBe('1');
    });

    test('converts calories to joules', () => {
      const result = convertUnit('1', EnergyUnit.Calorie, EnergyUnit.Joule, UnitCategory.Energy);
      expect(parseFloat(result)).toBeCloseTo(4.184, 3);
    });
  });

  describe('Power conversions', () => {
    test('converts watts to kilowatts', () => {
      const result = convertUnit('1000', PowerUnit.Watt, PowerUnit.Kilowatt, UnitCategory.Power);
      expect(result).toBe('1');
    });

    test('converts horsepower to watts', () => {
      const result = convertUnit('1', PowerUnit.Horsepower, PowerUnit.Watt, UnitCategory.Power);
      expect(parseFloat(result)).toBeCloseTo(745.7, 1);
    });
  });

  describe('Edge cases', () => {
    test('returns empty string for empty input', () => {
      const result = convertUnit('', LengthUnit.Meter, LengthUnit.Centimeter, UnitCategory.Length);
      expect(result).toBe('');
    });

    test('returns same value for same unit conversion', () => {
      const result = convertUnit('100', LengthUnit.Meter, LengthUnit.Meter, UnitCategory.Length);
      expect(result).toBe('100');
    });

    test('throws error for invalid number', () => {
      expect(() => {
        convertUnit('abc', LengthUnit.Meter, LengthUnit.Centimeter, UnitCategory.Length);
      }).toThrow('Invalid number: must be a valid number');
    });

    test('throws error for unsupported category', () => {
      expect(() => {
        convertUnit('1', LengthUnit.Meter, LengthUnit.Centimeter, 'InvalidCategory' as UnitCategory);
      }).toThrow('Unsupported category: InvalidCategory');
    });
  });

  describe('Helper functions', () => {
    test('getUnitsForCategory returns correct units for Length', () => {
      const units = getUnitsForCategory(UnitCategory.Length);
      expect(units).toContain(LengthUnit.Meter);
      expect(units).toContain(LengthUnit.Centimeter);
      expect(units).toContain(LengthUnit.Inch);
    });

    test('getUnitsForCategory returns correct units for Weight', () => {
      const units = getUnitsForCategory(UnitCategory.Weight);
      expect(units).toContain(WeightUnit.Kilogram);
      expect(units).toContain(WeightUnit.Pound);
      expect(units).toContain(WeightUnit.Gram);
    });

    test('getUnitEnumForCategory returns correct enum for Length', () => {
      const unitEnum = getUnitEnumForCategory(UnitCategory.Length);
      expect(unitEnum).toBe(LengthUnit);
    });

    test('getUnitEnumForCategory throws error for unsupported category', () => {
      expect(() => {
        getUnitEnumForCategory('InvalidCategory' as UnitCategory);
      }).toThrow('Unsupported category: InvalidCategory');
    });
  });
});
