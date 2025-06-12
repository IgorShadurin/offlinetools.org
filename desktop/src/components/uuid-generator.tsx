import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Fingerprint, RefreshCw } from "lucide-react";
import {
  generateUUID,
  generateMultipleUUIDs,
  validateUUID,
  UUIDVersion,
  UUIDNamespace,
} from "shared/uuid-generator";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
    const clipboardContent = localStorage.getItem("clipboard-content-for-tool");
    if (clipboardContent) {
      localStorage.removeItem("clipboard-content-for-tool");
      if (mode === "validate") {
        setValidateInput(clipboardContent);
      }
    }
  }, []);

  const handleGenerate = () => {
    try {
      const options = {
        version: uuidVersion,
        uppercase,
        hyphens,
        name,
        namespace,
        customNamespace,
      };
      let result = "";
      if (count === 1) {
        result = generateUUID(options);
      } else {
        result = generateMultipleUUIDs(count, options).join("\n");
      }
      setOutput(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
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
    } catch (err) {
      setError((err as Error).message);
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
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>UUID Generator</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <Tabs value={mode} onValueChange={handleTabChange} className="mb-4">
            <TabsList className="grid grid-cols-2 w-[200px]">
              <TabsTrigger value="generate">Generate UUIDs</TabsTrigger>
              <TabsTrigger value="validate">Validate UUID</TabsTrigger>
            </TabsList>
          </Tabs>

          {mode === "generate" ? (
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">UUID Version</label>
                    <div className="mt-2 space-y-1">
                      {Object.values(UUIDVersion).map((ver) => (
                        <div key={ver} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`uuid-${ver}`}
                            name="uuid-version"
                            value={ver}
                            checked={uuidVersion === ver}
                            onChange={(e) => setUuidVersion(e.target.value as UUIDVersion)}
                            className="h-4 w-4"
                          />
                          <label htmlFor={`uuid-${ver}`} className="text-sm cursor-pointer capitalize">
                            {ver}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {needsNameInput && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium">Name (required for v5)</label>
                        <input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 w-full h-8 px-2 border rounded text-sm"
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Namespace</label>
                        <div className="mt-2 space-y-1">
                          {Object.values(UUIDNamespace).map((ns) => (
                            <div key={ns} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={`ns-${ns}`}
                                name="namespace"
                                value={ns}
                                checked={namespace === ns}
                                onChange={(e) => setNamespace(e.target.value)}
                                className="h-4 w-4"
                              />
                              <label htmlFor={`ns-${ns}`} className="text-sm cursor-pointer capitalize">
                                {ns === UUIDNamespace.CUSTOM ? "Custom" : ns === UUIDNamespace.URL ? "URL" : "DNS"}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      {needsCustomNamespace && (
                        <div>
                          <label htmlFor="customNamespace" className="text-sm font-medium">Custom Namespace UUID</label>
                          <input
                            id="customNamespace"
                            value={customNamespace}
                            onChange={(e) => setCustomNamespace(e.target.value)}
                            className="mt-1 w-full h-8 px-2 border rounded text-sm"
                            placeholder="Enter custom namespace UUID"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="count" className="text-sm font-medium">Number of UUIDs</label>
                    <input
                      id="count"
                      type="number"
                      min="1"
                      max="100"
                      value={count}
                      onChange={handleCountChange}
                      className="mt-1 w-24 h-8 px-2 border rounded text-sm"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="uppercase"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="uppercase" className="text-sm cursor-pointer">Uppercase</label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hyphens"
                      checked={hyphens}
                      onChange={(e) => setHyphens(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="hyphens" className="text-sm cursor-pointer">Include hyphens</label>
                  </div>

                  <Button onClick={handleGenerate} className="w-full flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate UUID{count > 1 ? "s" : ""}
                  </Button>
                </div>

                <div className="flex flex-col">
                  <div className="mb-2 flex justify-between items-center">
                    <label htmlFor="output" className="text-sm font-medium">
                      Generated UUID{count > 1 ? "s" : ""}
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
                      className="flex-1 min-h-[300px] font-mono"
                      placeholder="Generated UUIDs will appear here..."
                      value={output}
                      readOnly
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="flex flex-col">
                  <label htmlFor="validateInput" className="mb-2 text-sm font-medium">
                    UUID to Validate
                  </label>
                  <Textarea
                    id="validateInput"
                    className="min-h-[200px] font-mono flex-1"
                    placeholder="Enter a UUID to validate..."
                    value={validateInput}
                    onChange={(e) => setValidateInput(e.target.value)}
                  />
                  <Button onClick={handleValidate} className="w-full mt-4">
                    Validate UUID
                  </Button>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">Validation Result</label>
                  {error ? (
                    <div className="rounded-md bg-destructive/15 p-3 text-destructive">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <div className="font-medium">Error</div>
                      </div>
                      <div className="mt-2 text-sm">{error}</div>
                    </div>
                  ) : validationResult !== null ? (
                    <div
                      className={`rounded-md p-3 flex items-center gap-2 ${
                        validationResult ? "bg-muted" : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {validationResult ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <div className="font-medium">
                        {validationResult ? "Valid UUID" : "Invalid UUID"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground mt-2">
                      Enter a UUID above and click Validate to check if it's valid.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export const UuidIcon = Fingerprint;
