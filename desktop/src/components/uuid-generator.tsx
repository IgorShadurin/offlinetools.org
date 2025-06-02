import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, RefreshCw } from "lucide-react";
import { 
  generateUUID, 
  generateMultipleUUIDs, 
  validateUUID,
  UUIDVersion, 
  UUIDNamespace 
} from "shared/uuid-generator";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "../lib/utils";

interface UuidGeneratorProps {
  className?: string;
}

export function UuidGenerator({ className = "" }: UuidGeneratorProps) {
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

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      if (mode === "validate") {
        setValidateInput(clipboardContent);
        try {
          const isValid = validateUUID(clipboardContent);
          setValidationResult(isValid);
          setError(null);
        } catch (error) {
          setError((error as Error).message);
          setValidationResult(null);
        }
      }
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, [mode]);

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

  const getConfigurationDisplay = () => {
    const config = [
      `Version: ${uuidVersion}`,
      `Count: ${count}`,
      `Uppercase: ${uppercase ? 'Yes' : 'No'}`,
      `Hyphens: ${hyphens ? 'Yes' : 'No'}`,
      ...(needsNameInput ? [`Name: ${name || '(required)'}`, `Namespace: ${namespace}`] : []),
      ...(needsCustomNamespace ? [`Custom Namespace: ${customNamespace || '(required)'}` ] : [])
    ];
    return config.join('\n');
  };

  const getValidationDisplay = () => {
    if (error) {
      return `Error: ${error}`;
    }
    if (validationResult !== null) {
      return validationResult 
        ? "✓ Valid UUID\nThe string is a valid UUID."
        : "✗ Invalid UUID\nThe string is not a valid UUID.";
    }
    return "Enter a UUID above and click Validate to check if it's valid.";
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
    <div className={cn("p-4 h-full flex flex-col", className)}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>UUID Generator</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            <Tabs value={mode} onValueChange={handleTabChange} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[300px]">
                <TabsTrigger value="generate">Generate UUIDs</TabsTrigger>
                <TabsTrigger value="validate">Validate UUID</TabsTrigger>
              </TabsList>
            </Tabs>

            {mode === "generate" ? (
              <div className="flex-1 flex flex-col space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">UUID Version</label>
                    <div className="space-y-2">
                      {[
                        { value: UUIDVersion.V4, label: "v4 (Random)" },
                        { value: UUIDVersion.V1, label: "v1 (Timestamp)" },
                        { value: UUIDVersion.V6, label: "v6 (Timestamp, reordered)" },
                        { value: UUIDVersion.V7, label: "v7 (Random with timestamp)" },
                        { value: UUIDVersion.V5, label: "v5 (Namespace with SHA-1)" },
                        { value: UUIDVersion.NIL, label: "NIL (All zeros)" },
                        { value: UUIDVersion.MAX, label: "MAX (All ones)" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`uuid-${option.value}`}
                            name="uuidVersion"
                            value={option.value}
                            checked={uuidVersion === option.value}
                            onChange={(e) => setUuidVersion(e.target.value as UUIDVersion)}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`uuid-${option.value}`} className="text-sm">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {needsNameInput && (
                    <>
                      <div>
                        <label htmlFor="name" className="text-sm font-medium mb-1 block">
                          Name (required for v5)
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md text-sm"
                          placeholder="Enter name for v5 UUID"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Namespace</label>
                        <div className="space-y-2">
                          {[
                            { value: UUIDNamespace.URL, label: "URL" },
                            { value: UUIDNamespace.DNS, label: "DNS" },
                            { value: UUIDNamespace.CUSTOM, label: "Custom" },
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`namespace-${option.value}`}
                                name="namespace"
                                value={option.value}
                                checked={namespace === option.value}
                                onChange={(e) => setNamespace(e.target.value)}
                                className="h-4 w-4"
                              />
                              <label htmlFor={`namespace-${option.value}`} className="text-sm">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {needsCustomNamespace && (
                        <div>
                          <label htmlFor="customNamespace" className="text-sm font-medium mb-1 block">
                            Custom Namespace UUID
                          </label>
                          <input
                            id="customNamespace"
                            type="text"
                            value={customNamespace}
                            onChange={(e) => setCustomNamespace(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md text-sm"
                            placeholder="Enter a valid UUID for custom namespace"
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="count" className="text-sm font-medium mb-1 block">
                        Number of UUIDs
                      </label>
                      <input
                        id="count"
                        type="number"
                        min="1"
                        max="100"
                        value={count}
                        onChange={handleCountChange}
                        className="w-full px-3 py-2 border border-input rounded-md text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="uppercase"
                          checked={uppercase}
                          onChange={(e) => setUppercase(e.target.checked)}
                          className="h-4 w-4"
                        />
                        <label htmlFor="uppercase" className="text-sm">Uppercase</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="hyphens"
                          checked={hyphens}
                          onChange={(e) => setHyphens(e.target.checked)}
                          className="h-4 w-4"
                        />
                        <label htmlFor="hyphens" className="text-sm">Include hyphens</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-1 flex justify-between">
                    <label htmlFor="input-display" className="text-sm font-medium">
                      Configuration
                    </label>
                  </div>
                  <Textarea
                    id="input-display"
                    className="flex-1 min-h-[150px] font-mono text-sm"
                    placeholder="UUID generation settings will be displayed here..."
                    value={getConfigurationDisplay()}
                    readOnly
                  />
                </div>

                <div className="flex justify-end my-2">
                  <Button onClick={handleGenerate} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate UUID
                  </Button>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-1 flex justify-between">
                    <label htmlFor="output" className="text-sm font-medium">
                      Generated UUID{count > 1 ? 's' : ''}
                    </label>
                    {output && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 h-7 px-2 text-xs"
                        onClick={handleCopy}
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    )}
                  </div>

                  {error ? (
                    <div className="rounded-md bg-destructive/15 p-3 text-destructive">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <div className="font-medium">Error</div>
                      </div>
                      <div className="mt-2 text-sm">{error}</div>
                    </div>
                  ) : (
                    <Textarea
                      id="output"
                      className="flex-1 min-h-[150px] font-mono text-sm"
                      placeholder="Generated UUIDs will appear here..."
                      value={output}
                      readOnly
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-1 flex justify-between">
                    <label htmlFor="validateInput" className="text-sm font-medium">
                      UUID to Validate
                    </label>
                  </div>
                  <Textarea
                    id="validateInput"
                    className="flex-1 min-h-[150px] font-mono text-sm"
                    placeholder="Enter a UUID to validate..."
                    value={validateInput}
                    onChange={(e) => setValidateInput(e.target.value)}
                  />
                </div>

                <div className="flex justify-end my-2">
                  <Button onClick={handleValidate}>
                    Validate UUID
                  </Button>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <div className="mb-1 flex justify-between">
                    <label className="text-sm font-medium">Validation Result</label>
                  </div>
                  
                  {error ? (
                    <div className="rounded-md bg-destructive/15 p-3 text-destructive">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <div className="font-medium">Error</div>
                      </div>
                      <div className="mt-2 text-sm">{error}</div>
                    </div>
                  ) : validationResult !== null ? (
                    <div className={`rounded-md p-3 ${validationResult ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{validationResult ? 'Valid UUID' : 'Invalid UUID'}</div>
                      </div>
                      <div className="mt-2 text-sm">
                        {validationResult ? 'The string is a valid UUID.' : 'The string is not a valid UUID.'}
                      </div>
                    </div>
                  ) : (
                    <Textarea
                      className="flex-1 min-h-[150px] font-mono text-sm"
                      placeholder="Validation results will appear here..."
                      value="Enter a UUID above and click Validate to check if it's valid."
                      readOnly
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
