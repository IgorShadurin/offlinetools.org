import { useState, useRef, useEffect } from "react";
import { AlertCircle, Check, Copy, Eye, EyeOff, Upload, Download, Shield } from "lucide-react";
import { 
  encryptText, 
  decryptText, 
  encryptFile, 
  decryptFile,
  formatEncryptedOutput,
  parseEncryptedInput 
} from "shared/data-encryptor";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
// Using regular HTML input and label elements like other desktop components

/**
 * Props for the DataEncryptor component
 * @interface DataEncryptorProps
 */
interface DataEncryptorProps {
  className?: string;
}

/**
 * Data Encryptor component for encrypting and decrypting text and files
 * @param props - Component props
 * @returns DataEncryptor component
 */
export function DataEncryptor({ className = "" }: DataEncryptorProps) {
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

  // Check for clipboard content when component mounts
  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setTextInput(clipboardContent);
      // Clear the stored content after using it
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, []);

  /**
   * Handle the encryption/decryption process
   */
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

    if (inputType === "file" && !selectedFile && !textInput && mode === "decrypt") {
      setError("Please select an encrypted file or enter encrypted data to decrypt");
      return;
    }

    if (inputType === "text" && !textInput && mode === "decrypt") {
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
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Copy output to clipboard
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Save output to file
   */
  const handleSaveOutput = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === "encrypt" ? "encrypted-data.txt" : "decrypted-data.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Handle mode change (encrypt/decrypt)
   */
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

  /**
   * Handle file selection
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      
      // If in decrypt mode, read the file content
      if (mode === "decrypt") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setTextInput(content);
        };
        reader.readAsText(file);
      }
    }
  };

  /**
   * Download decrypted file
   */
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

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Encryptor
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Mode Selection */}
            <div className="flex flex-row justify-between items-center">
              <Tabs
                value={mode}
                onValueChange={handleTabChange}
                className="w-auto"
              >
                <TabsList className="grid grid-cols-2 w-[200px]">
                  <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
                  <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Input Type Toggle */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="input-type"
                  checked={inputType === "file"}
                  onChange={(e) => {
                    setInputType(e.target.checked ? "file" : "text");
                    setTextInput("");
                    setSelectedFile(null);
                    setError(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                                 <label htmlFor="input-type" className="text-sm">
                   File mode
                 </label>
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password for encryption/decryption"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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

            {/* File Input */}
            {inputType === "file" && (
              <div className="flex flex-col space-y-2">
                <label htmlFor="file-input" className="text-sm font-medium">
                  {mode === "encrypt" ? "File to encrypt" : "Encrypted file"}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="file-input"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
            )}

            {/* Text Input */}
            {inputType === "text" && (
                             <div className="flex-1 flex flex-col min-h-0">
                 <div className="mb-1 flex justify-between">
                   <label htmlFor="input-text" className="text-sm font-medium">
                     {mode === "encrypt" ? "Text to encrypt" : "Encrypted data to decrypt"}
                   </label>
                 </div>
                <Textarea
                  id="input-text"
                  className="flex-1 min-h-[150px] font-mono"
                  placeholder={
                    mode === "encrypt"
                      ? "Enter text to encrypt..."
                      : "Paste encrypted data here..."
                  }
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </div>
            )}

            {/* Process Button */}
            <div className="flex justify-center my-2">
              <Button 
                onClick={handleProcess} 
                size="default"
                disabled={isProcessing}
                className="min-w-[120px]"
              >
                {isProcessing ? "Processing..." : (mode === "encrypt" ? "Encrypt" : "Decrypt")}
              </Button>
            </div>

                         {/* Output Section */}
             <div className="flex-1 flex flex-col min-h-0">
               <div className="mb-1 flex justify-between">
                 <label htmlFor="output-text" className="text-sm font-medium">
                   {mode === "encrypt" ? "Encrypted output" : "Decrypted output"}
                 </label>
                <div className="flex gap-2">
                  {output && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1 h-7 px-2 text-xs"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  )}
                  {output && !decryptedFile && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1 h-7 px-2 text-xs"
                      onClick={handleSaveOutput}
                    >
                      <Download className="h-3 w-3" />
                      Save
                    </Button>
                  )}
                  {decryptedFile && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1 h-7 px-2 text-xs"
                      onClick={handleDownload}
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  )}
                </div>
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
                  id="output-text"
                  className="flex-1 min-h-[150px] font-mono"
                  placeholder={
                    mode === "encrypt"
                      ? "Encrypted data will appear here..."
                      : "Decrypted data will appear here..."
                  }
                  value={output}
                  readOnly
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 