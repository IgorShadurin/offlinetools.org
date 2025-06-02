/**
 * Unit categories for conversion
 */
export enum UnitCategory {
  Length = 'Length',
  Weight = 'Weight',
  Temperature = 'Temperature',
  Volume = 'Volume',
  Area = 'Area',
  Energy = 'Energy',
  Power = 'Power'
}

/**
 * Length units for conversion
 */
export enum LengthUnit {
  Millimeter = 'mm',
  Centimeter = 'cm',
  Meter = 'm',
  Kilometer = 'km',
  Inch = 'in',
  Foot = 'ft',
  Yard = 'yd',
  Mile = 'mi'
}

/**
 * Weight units for conversion
 */
export enum WeightUnit {
  Milligram = 'mg',
  Gram = 'g',
  Kilogram = 'kg',
  Ounce = 'oz',
  Pound = 'lb',
  Stone = 'st',
  Ton = 't'
}

/**
 * Temperature units for conversion
 */
export enum TemperatureUnit {
  Celsius = '°C',
  Fahrenheit = '°F',
  Kelvin = 'K',
  Rankine = '°R'
}

/**
 * Volume units for conversion
 */
export enum VolumeUnit {
  Milliliter = 'ml',
  Liter = 'l',
  CubicMeter = 'm³',
  FluidOunce = 'fl oz',
  Cup = 'cup',
  Pint = 'pt',
  Quart = 'qt',
  Gallon = 'gal'
}

/**
 * Area units for conversion
 */
export enum AreaUnit {
  SquareMillimeter = 'mm²',
  SquareCentimeter = 'cm²',
  SquareMeter = 'm²',
  SquareKilometer = 'km²',
  SquareInch = 'in²',
  SquareFoot = 'ft²',
  SquareYard = 'yd²',
  Acre = 'acre',
  Hectare = 'ha'
}

/**
 * Energy units for conversion
 */
export enum EnergyUnit {
  Joule = 'J',
  Kilojoule = 'kJ',
  Calorie = 'cal',
  Kilocalorie = 'kcal',
  BTU = 'BTU',
  KilowattHour = 'kWh'
}

/**
 * Power units for conversion
 */
export enum PowerUnit {
  Watt = 'W',
  Kilowatt = 'kW',
  Megawatt = 'MW',
  Horsepower = 'hp',
  BTUPerHour = 'BTU/h'
}

/**
 * Options for unit conversion
 */
export interface UnitConverterOptions {
  decimalPlaces: number;
}

/**
 * Default options for unit conversion
 */
export const DEFAULT_UNIT_CONVERTER_OPTIONS: UnitConverterOptions = {
  decimalPlaces: 10,
};

const LENGTH_FACTORS: Record<LengthUnit, number> = {
  [LengthUnit.Millimeter]: 0.001,
  [LengthUnit.Centimeter]: 0.01,
  [LengthUnit.Meter]: 1,
  [LengthUnit.Kilometer]: 1000,
  [LengthUnit.Inch]: 0.0254,
  [LengthUnit.Foot]: 0.3048,
  [LengthUnit.Yard]: 0.9144,
  [LengthUnit.Mile]: 1609.344
};

const WEIGHT_FACTORS: Record<WeightUnit, number> = {
  [WeightUnit.Milligram]: 0.001,
  [WeightUnit.Gram]: 1,
  [WeightUnit.Kilogram]: 1000,
  [WeightUnit.Ounce]: 28.3495,
  [WeightUnit.Pound]: 453.592,
  [WeightUnit.Stone]: 6350.29,
  [WeightUnit.Ton]: 1000000
};

const VOLUME_FACTORS: Record<VolumeUnit, number> = {
  [VolumeUnit.Milliliter]: 0.001,
  [VolumeUnit.Liter]: 1,
  [VolumeUnit.CubicMeter]: 1000,
  [VolumeUnit.FluidOunce]: 0.0295735,
  [VolumeUnit.Cup]: 0.236588,
  [VolumeUnit.Pint]: 0.473176,
  [VolumeUnit.Quart]: 0.946353,
  [VolumeUnit.Gallon]: 3.78541
};

const AREA_FACTORS: Record<AreaUnit, number> = {
  [AreaUnit.SquareMillimeter]: 0.000001,
  [AreaUnit.SquareCentimeter]: 0.0001,
  [AreaUnit.SquareMeter]: 1,
  [AreaUnit.SquareKilometer]: 1000000,
  [AreaUnit.SquareInch]: 0.00064516,
  [AreaUnit.SquareFoot]: 0.092903,
  [AreaUnit.SquareYard]: 0.836127,
  [AreaUnit.Acre]: 4046.86,
  [AreaUnit.Hectare]: 10000
};

const ENERGY_FACTORS: Record<EnergyUnit, number> = {
  [EnergyUnit.Joule]: 1,
  [EnergyUnit.Kilojoule]: 1000,
  [EnergyUnit.Calorie]: 4.184,
  [EnergyUnit.Kilocalorie]: 4184,
  [EnergyUnit.BTU]: 1055.06,
  [EnergyUnit.KilowattHour]: 3600000
};

const POWER_FACTORS: Record<PowerUnit, number> = {
  [PowerUnit.Watt]: 1,
  [PowerUnit.Kilowatt]: 1000,
  [PowerUnit.Megawatt]: 1000000,
  [PowerUnit.Horsepower]: 745.7,
  [PowerUnit.BTUPerHour]: 0.293071
};

function convertTemperature(value: number, fromUnit: TemperatureUnit, toUnit: TemperatureUnit): number {
  let celsius: number;
  
  switch (fromUnit) {
    case TemperatureUnit.Celsius:
      celsius = value;
      break;
    case TemperatureUnit.Fahrenheit:
      celsius = (value - 32) * 5/9;
      break;
    case TemperatureUnit.Kelvin:
      celsius = value - 273.15;
      break;
    case TemperatureUnit.Rankine:
      celsius = (value - 491.67) * 5/9;
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }
  
  switch (toUnit) {
    case TemperatureUnit.Celsius:
      return celsius;
    case TemperatureUnit.Fahrenheit:
      return celsius * 9/5 + 32;
    case TemperatureUnit.Kelvin:
      return celsius + 273.15;
    case TemperatureUnit.Rankine:
      return celsius * 9/5 + 491.67;
    default:
      throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
}

/**
 * Convert between units of the same category
 */
export function convertUnit(
  value: string,
  fromUnit: LengthUnit | WeightUnit | TemperatureUnit | VolumeUnit | AreaUnit | EnergyUnit | PowerUnit,
  toUnit: LengthUnit | WeightUnit | TemperatureUnit | VolumeUnit | AreaUnit | EnergyUnit | PowerUnit,
  category: UnitCategory,
  options: UnitConverterOptions = DEFAULT_UNIT_CONVERTER_OPTIONS
): string {
  try {
    if (!value || value.trim() === '') {
      return '';
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      throw new Error('Invalid number: must be a valid number');
    }

    if (fromUnit === toUnit) {
      return value;
    }

    let result: number;

    switch (category) {
      case UnitCategory.Length:
        const fromLengthFactor = LENGTH_FACTORS[fromUnit as LengthUnit];
        const toLengthFactor = LENGTH_FACTORS[toUnit as LengthUnit];
        result = (numValue * fromLengthFactor) / toLengthFactor;
        break;
      case UnitCategory.Weight:
        const fromWeightFactor = WEIGHT_FACTORS[fromUnit as WeightUnit];
        const toWeightFactor = WEIGHT_FACTORS[toUnit as WeightUnit];
        result = (numValue * fromWeightFactor) / toWeightFactor;
        break;
      case UnitCategory.Temperature:
        result = convertTemperature(numValue, fromUnit as TemperatureUnit, toUnit as TemperatureUnit);
        break;
      case UnitCategory.Volume:
        const fromVolumeFactor = VOLUME_FACTORS[fromUnit as VolumeUnit];
        const toVolumeFactor = VOLUME_FACTORS[toUnit as VolumeUnit];
        result = (numValue * fromVolumeFactor) / toVolumeFactor;
        break;
      case UnitCategory.Area:
        const fromAreaFactor = AREA_FACTORS[fromUnit as AreaUnit];
        const toAreaFactor = AREA_FACTORS[toUnit as AreaUnit];
        result = (numValue * fromAreaFactor) / toAreaFactor;
        break;
      case UnitCategory.Energy:
        const fromEnergyFactor = ENERGY_FACTORS[fromUnit as EnergyUnit];
        const toEnergyFactor = ENERGY_FACTORS[toUnit as EnergyUnit];
        result = (numValue * fromEnergyFactor) / toEnergyFactor;
        break;
      case UnitCategory.Power:
        const fromPowerFactor = POWER_FACTORS[fromUnit as PowerUnit];
        const toPowerFactor = POWER_FACTORS[toUnit as PowerUnit];
        result = (numValue * fromPowerFactor) / toPowerFactor;
        break;
      default:
        throw new Error(`Unsupported category: ${category}`);
    }

    const formatted = parseFloat(result.toPrecision(12));
    return formatted.toString();
  } catch (error) {
    throw new Error(`Unit conversion failed: ${(error as Error).message}`);
  }
}

/**
 * Get all units for a specific category
 */
export function getUnitsForCategory(category: UnitCategory): string[] {
  switch (category) {
    case UnitCategory.Length:
      return Object.values(LengthUnit);
    case UnitCategory.Weight:
      return Object.values(WeightUnit);
    case UnitCategory.Temperature:
      return Object.values(TemperatureUnit);
    case UnitCategory.Volume:
      return Object.values(VolumeUnit);
    case UnitCategory.Area:
      return Object.values(AreaUnit);
    case UnitCategory.Energy:
      return Object.values(EnergyUnit);
    case UnitCategory.Power:
      return Object.values(PowerUnit);
    default:
      return [];
  }
}

/**
 * Get unit enum for a specific category
 */
export function getUnitEnumForCategory(category: UnitCategory): typeof LengthUnit | typeof WeightUnit | typeof TemperatureUnit | typeof VolumeUnit | typeof AreaUnit | typeof EnergyUnit | typeof PowerUnit {
  switch (category) {
    case UnitCategory.Length:
      return LengthUnit;
    case UnitCategory.Weight:
      return WeightUnit;
    case UnitCategory.Temperature:
      return TemperatureUnit;
    case UnitCategory.Volume:
      return VolumeUnit;
    case UnitCategory.Area:
      return AreaUnit;
    case UnitCategory.Energy:
      return EnergyUnit;
    case UnitCategory.Power:
      return PowerUnit;
    default:
      throw new Error(`Unsupported category: ${category}`);
  }
}
