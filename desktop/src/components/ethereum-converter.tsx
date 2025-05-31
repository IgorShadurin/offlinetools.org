import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { convertEthereumUnit, EthereumUnit } from "shared/ethereum-converter";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

/**
 * Props for the EthereumConverter component
 * @interface EthereumConverterProps
 */
interface EthereumConverterProps {
  className?: string;
}

/**
 * Ethereum Unit Converter component
 * @param props - Component props
 * @returns EthereumConverter component
 */
export function EthereumConverter({ className = "" }: EthereumConverterProps) {
  const [values, setValues] = useState<Record<EthereumUnit, string>>({
    [EthereumUnit.Wei]: "",
    [EthereumUnit.Gwei]: "",
    [EthereumUnit.Szabo]: "",
    [EthereumUnit.Finney]: "",
    [EthereumUnit.Ether]: "",
  });
  
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<EthereumUnit | null>(null);

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setValues(prev => ({ ...prev, [EthereumUnit.Ether]: clipboardContent }));
      localStorage.removeItem('clipboard-content-for-tool');
      
      try {
        if (/^[0-9]+(\.[0-9]+)?$/.test(clipboardContent)) {
          handleValueChange(clipboardContent, EthereumUnit.Ether);
        }
      } catch (error) {
      }
    }
  }, []);

  const handleValueChange = (value: string, unit: EthereumUnit) => {
    try {
      setError(null);
      
      if (!value.trim()) {
        setValues({
          [EthereumUnit.Wei]: "",
          [EthereumUnit.Gwei]: "",
          [EthereumUnit.Szabo]: "",
          [EthereumUnit.Finney]: "",
          [EthereumUnit.Ether]: "",
        });
        return;
      }
      
      const newValues: Record<EthereumUnit, string> = {
        [EthereumUnit.Wei]: "",
        [EthereumUnit.Gwei]: "",
        [EthereumUnit.Szabo]: "",
        [EthereumUnit.Finney]: "",
        [EthereumUnit.Ether]: "",
      };
      
      newValues[unit] = value;
      
      Object.values(EthereumUnit).forEach((toUnit: EthereumUnit) => {
        if (toUnit !== unit) {
          newValues[toUnit] = convertEthereumUnit(value, unit, toUnit);
        }
      });
      
      setValues(newValues);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCopy = (unit: EthereumUnit) => {
    navigator.clipboard.writeText(values[unit]);
    setCopied(unit);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Ethereum Unit Converter</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-destructive">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <div className="font-medium">Error</div>
                </div>
                <div className="mt-2 text-sm">{error}</div>
              </div>
            )}

            {Object.values(EthereumUnit).map((unit: EthereumUnit) => (
              <div key={unit} className="flex items-center gap-2">
                <div className="w-16 text-sm font-medium">{unit}</div>
                <Textarea
                  className="flex-1 min-h-[40px] max-h-[40px] font-mono text-sm"
                  placeholder={`Enter ${unit} value...`}
                  value={values[unit]}
                  onChange={(e) => handleValueChange(e.target.value, unit)}
                  data-unit={unit}
                />
                {values[unit] && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleCopy(unit)}
                  >
                    {copied === unit ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
