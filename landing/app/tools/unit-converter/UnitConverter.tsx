"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  UnitCategory, 
  convertUnit, 
  getUnitsForCategory, 
  getUnitEnumForCategory,
  LengthUnit,
  WeightUnit,
  TemperatureUnit,
  VolumeUnit,
  AreaUnit,
  EnergyUnit,
  PowerUnit
} from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import UnitConverterExplanation from "./UnitConverterExplanation";

type UnitType = LengthUnit | WeightUnit | TemperatureUnit | VolumeUnit | AreaUnit | EnergyUnit | PowerUnit;

export default function UnitConverter() {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(UnitCategory.Length);
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeUnit, setActiveUnit] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const currentUnits = getUnitsForCategory(selectedCategory);
  const currentUnitEnum = getUnitEnumForCategory(selectedCategory);

  const handleCategoryChange = (category: UnitCategory) => {
    setSelectedCategory(category);
    setValues({});
    setActiveUnit('');
    setError(null);
  };

  const handleValueChange = (value: string, unit: string) => {
    try {
      setActiveUnit(unit);
      setError(null);
      
      if (!value.trim()) {
        setValues({});
        return;
      }
      
      const newValues: Record<string, string> = {};
      newValues[unit] = value;
      
      currentUnits.forEach((toUnit) => {
        if (toUnit !== unit) {
          newValues[toUnit] = convertUnit(
            value, 
            unit as UnitType, 
            toUnit as UnitType, 
            selectedCategory
          );
        }
      });
      
      setValues(newValues);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCopy = (unit: string) => {
    navigator.clipboard.writeText(values[unit]);
    setCopied(unit);
    setTimeout(() => setCopied(null), 2000);
  };

  const getUnitDisplayName = (unit: string): string => {
    const unitKey = Object.keys(currentUnitEnum).find(key => currentUnitEnum[key as keyof typeof currentUnitEnum] === unit);
    return unitKey || unit;
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Unit Converter"
          description="Convert between units of length, weight, temperature, volume, area, energy, and power with precision."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/ethereum-converter" className="text-primary hover:underline">
            Ethereum Unit Converter
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
            <div className="w-full md:w-1/6">
              <Label htmlFor="category-select" className="text-right block">
                Category
              </Label>
            </div>
            <div className="w-full md:w-4/6">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category-select">
                  <SelectValue placeholder="Select unit category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UnitCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/6"></div>
          </div>

          {currentUnits.map((unit) => (
            <div key={unit} className="flex flex-wrap md:flex-nowrap gap-4 items-center">
              <div className="w-full md:w-1/6">
                <Label htmlFor={`${unit}-input`} className="text-right block">
                  {getUnitDisplayName(unit)} ({unit})
                </Label>
              </div>
              <div className="w-full md:w-4/6">
                <Input
                  id={`${unit}-input`}
                  className={`font-mono w-full ${activeUnit === unit ? 'border-primary' : ''}`}
                  placeholder={`Enter ${unit} value...`}
                  value={values[unit] || ''}
                  onChange={(e) => handleValueChange(e.target.value, unit)}
                />
              </div>
              <div className="w-full md:w-1/6 flex justify-end">
                {values[unit] ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleCopy(unit)}
                  >
                    {copied === unit ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied === unit ? "Copied!" : "Copy"}
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-8 md:py-12">
        <UnitConverterExplanation />
      </Container>
    </>
  );
}
