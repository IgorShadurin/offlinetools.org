"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  generateUUID, 
  generateMultipleUUIDs, 
  validateUUID,
  formatUUID,
  UUIDVersion, 
  UUIDNamespace 
} from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy, RefreshCw, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import UuidGeneratorExplanation from "./UuidGeneratorExplanation";

export default function UuidGenerator() {
  const [output, setOutput] = useState("");
  const [count, setCount] = useState<number>(1);
  const [uuidVersion, setUuidVersion] = useState<UUIDVersion>(UUIDVersion.V4);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [namespace, setNamespace] = useState<string>(UUIDNamespace.URL);
  const [customNamespace, setCustomNamespace] = useState("");
  const [name, setName] = useState("");
  const [validateInput, setValidateInput] = useState("");
  const [validationResult, setValidationResult] = useState<boolean | null>(null);
  const [mode, setMode] = useState<"generate" | "validate">("generate");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    try {
      let result = "";
      
      if (count === 1) {
        const options = {
          version: uuidVersion,
          uppercase,
          hyphens,
          name,
          namespace,
          customNamespace,
        };
        
        result = generateUUID(options);
      } else {
        const options = {
          version: uuidVersion,
          uppercase,
          hyphens,
          name,
          namespace,
          customNamespace,
        };
        
        result = generateMultipleUUIDs(count, options).join('\n');
      }
      
      setOutput(result);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setOutput("");
    }
  };

  const handleValidate = () => {
    try {
      if (!validateInput.trim()) {
        setValidationResult(null);
        return;
      }
      
      const isValid = validateUUID(validateInput);
      setValidationResult(isValid);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setValidationResult(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (value: string) => {
    setMode(value as "generate" | "validate");
    setError(null);
    setOutput("");
    setValidationResult(null);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setCount(value);
    }
  };

  const needsNameInput = uuidVersion === UUIDVersion.V5;
  const needsCustomNamespace = needsNameInput && namespace === UUIDNamespace.CUSTOM;

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="UUID Generator"
          description="Generate universally unique identifiers (UUIDs) in various formats (v1, v4, v5, v6, v7)."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/text-hash-generator" className="text-primary hover:underline">
            Text Hash Generator
          </Link>
        </div>

        <div className="space-y-6">
          {/* Tabs for Generate/Validate */}
          <Tabs defaultValue="generate" className="w-full" value={mode} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="generate">Generate UUIDs</TabsTrigger>
              <TabsTrigger value="validate">Validate UUID</TabsTrigger>
            </TabsList>
          </Tabs>

          {mode === "generate" ? (
            <>
              {/* UUID Generation Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="uuidVersion">UUID Version</Label>
                    <RadioGroup
                      value={uuidVersion}
                      onValueChange={(value) => setUuidVersion(value as UUIDVersion)}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.V4} id="uuidV4" />
                        <Label htmlFor="uuidV4">v4 (Random)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.V1} id="uuidV1" />
                        <Label htmlFor="uuidV1">v1 (Timestamp)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.V6} id="uuidV6" />
                        <Label htmlFor="uuidV6">v6 (Timestamp, reordered)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.V7} id="uuidV7" />
                        <Label htmlFor="uuidV7">v7 (Random with timestamp)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.V5} id="uuidV5" />
                        <Label htmlFor="uuidV5">v5 (Namespace with SHA-1)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.NIL} id="uuidNil" />
                        <Label htmlFor="uuidNil">NIL (All zeros)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={UUIDVersion.MAX} id="uuidMax" />
                        <Label htmlFor="uuidMax">MAX (All ones)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {needsNameInput && (
                    <>
                      <div>
                        <Label htmlFor="name">Name (required for v5)</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1"
                          placeholder="Enter name for v5 UUID"
                        />
                      </div>

                      <div>
                        <Label htmlFor="namespace">Namespace</Label>
                        <RadioGroup
                          value={namespace}
                          onValueChange={setNamespace}
                          className="flex flex-col space-y-1 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={UUIDNamespace.URL} id="namespaceUrl" />
                            <Label htmlFor="namespaceUrl">URL</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={UUIDNamespace.DNS} id="namespaceDns" />
                            <Label htmlFor="namespaceDns">DNS</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={UUIDNamespace.CUSTOM} id="namespaceCustom" />
                            <Label htmlFor="namespaceCustom">Custom</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {needsCustomNamespace && (
                        <div>
                          <Label htmlFor="customNamespace">Custom Namespace UUID</Label>
                          <Input
                            id="customNamespace"
                            value={customNamespace}
                            onChange={(e) => setCustomNamespace(e.target.value)}
                            className="mt-1"
                            placeholder="Enter a valid UUID for custom namespace"
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div>
                    <Label htmlFor="count">Number of UUIDs</Label>
                    <Input
                      id="count"
                      type="number"
                      min="1"
                      max="100"
                      value={count}
                      onChange={handleCountChange}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
                    <Label htmlFor="uppercase">Uppercase</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="hyphens" checked={hyphens} onCheckedChange={setHyphens} />
                    <Label htmlFor="hyphens">Include hyphens</Label>
                  </div>

                  <Button onClick={handleGenerate} className="w-full flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate UUID{count > 1 ? 's' : ''}
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="output">Generated UUID{count > 1 ? 's' : ''}</Label>
                    {output && (
                      <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    )}
                  </div>

                  {error ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : (
                    <Textarea
                      id="output"
                      className="min-h-[300px] font-mono w-full"
                      placeholder="Generated UUIDs will appear here..."
                      value={output}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* UUID Validation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="validateInput">UUID to Validate</Label>
                  <Textarea
                    id="validateInput"
                    className="min-h-[200px] font-mono w-full mt-2"
                    placeholder="Enter a UUID to validate..."
                    value={validateInput}
                    onChange={(e) => setValidateInput(e.target.value)}
                  />
                  <Button onClick={handleValidate} className="w-full mt-4">
                    Validate UUID
                  </Button>
                </div>

                <div>
                  <Label>Validation Result</Label>
                  {error ? (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : validationResult !== null ? (
                    <Alert
                      variant={validationResult ? "default" : "destructive"}
                      className="mt-2"
                    >
                      {validationResult ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>
                        {validationResult ? "Valid UUID" : "Invalid UUID"}
                      </AlertTitle>
                      <AlertDescription>
                        {validationResult
                          ? "The string is a valid UUID."
                          : "The string is not a valid UUID."}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="text-muted-foreground mt-2">
                      Enter a UUID above and click Validate to check if it's valid.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <UuidGeneratorExplanation />
      </Container>
    </>
  );
}
