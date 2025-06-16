"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  encryptText, 
  decryptText, 
  encryptFile, 
  decryptFile,
  formatEncryptedOutput,
  parseEncryptedInput 
} from "shared";
import { useState, useRef } from "react";
import { AlertCircle, Check, Copy, Eye, EyeOff, Upload, Download, Lock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DataEncryptorExplanation from "./DataEncryptorExplanation";

export default function DataEncryptor() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [inputType, setInputType] = useState<"text" | "file">("text");
  const [textInput, setTextInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [decryptedFile, setDecryptedFile] = useState<Blob | null>(null);
  const [decryptedFileName, setDecryptedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    if (inputType === "text" && !textInput) {
      setError("Text input is required");
      return;
    }

    if (inputType === "file" && !selectedFile && mode === "encrypt") {
      setError("Please select a file to encrypt");
      return;
    }

    if (inputType === "file" && !textInput && mode === "decrypt") {
      setError("Please enter encrypted data to decrypt");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setOutput("");
    setDecryptedFile(null);

    try {
      if (mode === "encrypt") {
        if (inputType === "text") {
          const result = await encryptText(textInput, { password });
          setOutput(formatEncryptedOutput(result));
        } else {
          const result = await encryptFile(selectedFile!, { password });
          setOutput(formatEncryptedOutput(result));
        }
      } else {
        if (inputType === "text") {
          const parsed = parseEncryptedInput(textInput);
          const decrypted = await decryptText(parsed.encryptedData, {
            password,
            salt: parsed.salt,
            iv: parsed.iv
          });
          setOutput(decrypted);
        } else {
          const parsed = parseEncryptedInput(textInput);
          const decryptedBlob = await decryptFile(parsed.encryptedData, {
            password,
            salt: parsed.salt,
            iv: parsed.iv
          });
          setDecryptedFile(decryptedBlob);
          setDecryptedFileName(selectedFile?.name || "decrypted-file");
          setOutput("File decrypted successfully. Click download to save.");
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (value: string) => {
    setMode(value as "encrypt" | "decrypt");
    setTextInput("");
    setOutput("");
    setError(null);
    setSelectedFile(null);
    setDecryptedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDownload = () => {
    if (!decryptedFile) return;

    const url = URL.createObjectURL(decryptedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = decryptedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Data Encryptor"
          description="Encrypt and decrypt text or files using password-based AES-256 encryption with secure key derivation."
        />

        <div className="space-y-6">
          <Tabs defaultValue="encrypt" className="w-full" value={mode} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
              <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Switch 
              id="input-type" 
              checked={inputType === "file"} 
              onCheckedChange={(checked) => {
                setInputType(checked ? "file" : "text");
                setTextInput("");
                setSelectedFile(null);
                setError(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }} 
            />
            <Label htmlFor="input-type">
              {inputType === "text" ? "Switch to file mode" : "Switch to text mode"}
            </Label>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2 flex items-center justify-between">
              <Label htmlFor="input-area">
                {mode === "encrypt" 
                  ? (inputType === "text" ? "Text to encrypt" : "File to encrypt")
                  : (inputType === "text" ? "Encrypted data to decrypt" : "Encrypted data to decrypt")
                }
              </Label>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-between h-9">
              <Label htmlFor="output-area">
                {mode === "encrypt" ? "Encrypted output" : "Decrypted output"}
              </Label>
              <div className="min-w-[85px] h-8 flex justify-end gap-2">
                {output && mode === "encrypt" && (
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                )}
                {decryptedFile && (
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              {inputType === "text" ? (
                <Textarea
                  id="input-area"
                  className="min-h-[300px] font-mono w-full"
                  placeholder={
                    mode === "encrypt" 
                      ? "Enter text to encrypt..." 
                      : "Enter encrypted data (format: salt:iv:encryptedData)..."
                  }
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              ) : (
                <div className="space-y-4">
                  {mode === "encrypt" ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-input"
                      />
                      <label htmlFor="file-input" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600">
                          {selectedFile ? selectedFile.name : "Click to select a file to encrypt"}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Any file type supported
                        </p>
                      </label>
                    </div>
                  ) : (
                    <Textarea
                      id="input-area"
                      className="min-h-[300px] font-mono w-full"
                      placeholder="Enter encrypted data (format: salt:iv:encryptedData)..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2">
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Textarea
                  id="output-area"
                  className="min-h-[300px] font-mono w-full"
                  placeholder={
                    mode === "encrypt" 
                      ? "Encrypted data will appear here..." 
                      : "Decrypted content will appear here..."
                  }
                  value={output}
                  readOnly
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <Button 
                onClick={handleProcess} 
                className="w-full" 
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Lock className="mr-2 h-4 w-4 animate-spin" />
                    {mode === "encrypt" ? "Encrypting..." : "Decrypting..."}
                  </>
                ) : (
                  <>
                    {mode === "encrypt" ? "Encrypt Data" : "Decrypt Data"}
                  </>
                )}
              </Button>
            </div>
            <div className="w-full md:w-1/2"></div>
          </div>

          {mode === "encrypt" && (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertTitle>Security Notice</AlertTitle>
              <AlertDescription>
                Your data is encrypted using AES-256-CBC with PBKDF2 key derivation (100,000 iterations). 
                Keep your password safe - it cannot be recovered if lost. All encryption happens locally in your browser.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Container>

      <Container className="py-8 md:py-12">
        <DataEncryptorExplanation />
      </Container>
    </>
  );
}
