"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertEthereumUnit, EthereumUnit } from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import EthereumConverterExplanation from "./EthereumConverterExplanation";

export default function EthereumConverter() {
  const [values, setValues] = useState<Record<EthereumUnit, string>>({
    [EthereumUnit.Wei]: "",
    [EthereumUnit.Gwei]: "",
    [EthereumUnit.Szabo]: "",
    [EthereumUnit.Finney]: "",
    [EthereumUnit.Ether]: "",
  });
  
  const [activeUnit, setActiveUnit] = useState<EthereumUnit>(EthereumUnit.Ether);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<EthereumUnit | null>(null);

  const handleValueChange = (value: string, unit: EthereumUnit) => {
    try {
      setActiveUnit(unit);
      
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
      
      Object.values(EthereumUnit).forEach((toUnit) => {
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
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Ethereum Unit Converter"
          description="Convert between Ethereum units including Wei, Gwei, Ether, Finney, and Szabo with precision."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/text-hash-generator" className="text-primary hover:underline">
            Text Hash Generator
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
          {/* Ethereum Unit Inputs */}
          {Object.values(EthereumUnit).map((unit) => (
            <div key={unit} className="flex flex-wrap md:flex-nowrap gap-4 items-center">
              <div className="w-full md:w-1/6">
                <Label htmlFor={`${unit}-input`} className="text-right block">
                  {unit}
                </Label>
              </div>
              <div className="w-full md:w-4/6">
                <Input
                  id={`${unit}-input`}
                  className={`font-mono w-full ${activeUnit === unit ? 'border-primary' : ''}`}
                  placeholder={`Enter ${unit} value...`}
                  value={values[unit]}
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

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <EthereumConverterExplanation />
      </Container>
    </>
  );
}
