import React, { useState, useEffect } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
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
} from "../../../shared";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectOption } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

type UnitType = LengthUnit | WeightUnit | TemperatureUnit | VolumeUnit | AreaUnit | EnergyUnit | PowerUnit;

interface UnitConverterProps {
  className?: string;
}

export function UnitConverter({ className }: UnitConverterProps) {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategory>(UnitCategory.Length);
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeUnit, setActiveUnit] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const currentUnits = getUnitsForCategory(selectedCategory);
  const currentUnitEnum = getUnitEnumForCategory(selectedCategory);

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      if (currentUnits.length > 0) {
        handleValueChange(clipboardContent, currentUnits[0]);
      }
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as UnitCategory;
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
    <div className={cn("p-4 h-full flex flex-col", className)}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Unit Converter</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium whitespace-nowrap">
                Category:
              </span>
              <div className="relative border rounded-md overflow-hidden h-9 px-2 flex items-center bg-background">
                <Select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-32 border-0 h-8 px-1 focus:ring-0 appearance-none"
                >
                  {Object.values(UnitCategory).map((category) => (
                    <SelectOption key={category} value={category}>
                      {category}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto space-y-4">
            {currentUnits.map((unit) => (
              <div key={unit} className="flex items-center gap-3">
                <div className="w-24 text-sm font-medium text-right">
                  {getUnitDisplayName(unit)} ({unit}):
                </div>
                <div className="flex-1">
                  <Textarea
                    value={values[unit] || ''}
                    onChange={(e) => handleValueChange(e.target.value, unit)}
                    placeholder={`Enter ${unit} value...`}
                    data-unit={unit}
                    className={cn(
                      "font-mono text-sm resize-none h-10 min-h-0",
                      activeUnit === unit ? 'border-primary' : ''
                    )}
                  />
                </div>
                <div className="w-20 flex justify-end">
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
        </CardContent>
      </Card>
    </div>
  );
}
