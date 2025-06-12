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
      setValidateInput(clipboardContent);
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, []);

  const handleGenerate = () => {
    try {
      let result = "";
      const options = {
        version: uuidVersion,
        uppercase,
        hyphens,
        name,
        namespace,
        customNamespace,
      };
      if (count === 1) {
        result = generateUUID(options);
      } else {
        result = generateMultipleUUIDs(count, options).join('\n');
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
          <div className="space-y-4 flex-1 flex flex-col">
            <Tabs value={mode} onValueChange={handleTabChange} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="validate">Validate</TabsTrigger>
              </TabsList>
            </Tabs>
            {mode === 'generate' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="uuid-v4" className="text-sm font-medium block mb-1">UUID Version</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-v4" name="uuid-version" value={UUIDVersion.V4} checked={uuidVersion===UUIDVersion.V4} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-v4" className="text-sm">v4 (Random)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-v1" name="uuid-version" value={UUIDVersion.V1} checked={uuidVersion===UUIDVersion.V1} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-v1" className="text-sm">v1 (Timestamp)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-v6" name="uuid-version" value={UUIDVersion.V6} checked={uuidVersion===UUIDVersion.V6} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-v6" className="text-sm">v6 (Timestamp reordered)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-v7" name="uuid-version" value={UUIDVersion.V7} checked={uuidVersion===UUIDVersion.V7} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-v7" className="text-sm">v7 (Random with timestamp)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-v5" name="uuid-version" value={UUIDVersion.V5} checked={uuidVersion===UUIDVersion.V5} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-v5" className="text-sm">v5 (Namespace)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-nil" name="uuid-version" value={UUIDVersion.NIL} checked={uuidVersion===UUIDVersion.NIL} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-nil" className="text-sm">NIL (All zeros)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="uuid-max" name="uuid-version" value={UUIDVersion.MAX} checked={uuidVersion===UUIDVersion.MAX} onChange={(e)=>setUuidVersion(e.target.value as UUIDVersion)} className="h-4 w-4" />
                        <label htmlFor="uuid-max" className="text-sm">MAX (All ones)</label>
                      </div>
                    </div>
                  </div>
                  {needsNameInput && (
                    <>
                      <div>
                        <label htmlFor="uuid-name" className="text-sm font-medium block mb-1">Name</label>
                        <input id="uuid-name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded h-8 px-2 text-sm" placeholder="Name for v5" />
                      </div>
                      <div>
                        <label htmlFor="namespace" className="text-sm font-medium block mb-1">Namespace</label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="ns-url" name="namespace" value={UUIDNamespace.URL} checked={namespace===UUIDNamespace.URL} onChange={(e)=>setNamespace(e.target.value)} className="h-4 w-4" />
                            <label htmlFor="ns-url" className="text-sm">URL</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="ns-dns" name="namespace" value={UUIDNamespace.DNS} checked={namespace===UUIDNamespace.DNS} onChange={(e)=>setNamespace(e.target.value)} className="h-4 w-4" />
                            <label htmlFor="ns-dns" className="text-sm">DNS</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="ns-custom" name="namespace" value={UUIDNamespace.CUSTOM} checked={namespace===UUIDNamespace.CUSTOM} onChange={(e)=>setNamespace(e.target.value)} className="h-4 w-4" />
                            <label htmlFor="ns-custom" className="text-sm">Custom</label>
                          </div>
                        </div>
                      </div>
                      {needsCustomNamespace && (
                        <div>
                          <label htmlFor="custom-namespace" className="text-sm font-medium block mb-1">Custom Namespace UUID</label>
                          <input id="custom-namespace" value={customNamespace} onChange={(e)=>setCustomNamespace(e.target.value)} className="w-full border rounded h-8 px-2 text-sm" placeholder="Valid UUID" />
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <label htmlFor="count" className="text-sm font-medium block mb-1">Number of UUIDs</label>
                    <input id="count" type="number" min="1" max="100" value={count} onChange={handleCountChange} className="w-full border rounded h-8 px-2 text-sm" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="uppercase" checked={uppercase} onChange={(e)=>setUppercase(e.target.checked)} className="h-4 w-4" />
                    <label htmlFor="uppercase" className="text-sm">Uppercase</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="hyphens" checked={hyphens} onChange={(e)=>setHyphens(e.target.checked)} className="h-4 w-4" />
                    <label htmlFor="hyphens" className="text-sm">Include hyphens</label>
                  </div>
                  <Button onClick={handleGenerate} className="w-full flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Generate UUID{count > 1 ? 's' : ''}
                  </Button>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="output" className="text-sm font-medium">Generated UUID{count>1?'s':''}</label>
                    {output && (
                      <Button size="sm" variant="outline" className="flex items-center gap-1 h-7 px-2 text-xs" onClick={handleCopy}>
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? 'Copied!' : 'Copy'}
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
                    <Textarea id="output" className="min-h-[300px] font-mono w-full" placeholder="Generated UUIDs will appear here..." value={output} readOnly />
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="validate-input" className="text-sm font-medium">UUID to validate</label>
                  <Textarea id="validate-input" className="min-h-[200px] font-mono w-full mt-2" placeholder="Enter a UUID to validate..." value={validateInput} onChange={(e)=>setValidateInput(e.target.value)} />
                  <Button onClick={handleValidate} className="w-full mt-4">Validate UUID</Button>
                </div>
                <div>
                  <label className="text-sm font-medium">Validation Result</label>
                  {error ? (
                    <div className="rounded-md bg-destructive/15 p-3 text-destructive mt-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <div className="font-medium">Error</div>
                      </div>
                      <div className="mt-2 text-sm">{error}</div>
                    </div>
                  ) : validationResult !== null ? (
                    <div className={`rounded-md p-3 mt-2 ${validationResult ? 'bg-muted/50' : 'bg-destructive/15 text-destructive'}`}> 
                      {validationResult ? 'Valid UUID' : 'Invalid UUID'}
                    </div>
                  ) : (
                    <div className="text-muted-foreground mt-2 text-sm">Enter a UUID above and click Validate to check.</div>
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

export default UuidGenerator;
