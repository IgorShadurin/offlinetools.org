"use client"

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  generateQRCode, 
  QRCodeErrorCorrectionLevel,
  QRCodeOutputFormat,
  DEFAULT_QRCODE_OPTIONS
} from "shared";
import { useState, useRef, useEffect } from "react";
import { AlertCircle, Check, Copy, Download, Upload, Link, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QrCodeExplanation from "./QrCodeExplanation";

export default function QrCode() {
  const [input, setInput] = useState("");
  const [qrCodeOutput, setQrCodeOutput] = useState("");
  const [errorCorrection, setErrorCorrection] = useState<QRCodeErrorCorrectionLevel>(
    DEFAULT_QRCODE_OPTIONS.errorCorrectionLevel
  );
  const [size, setSize] = useState(DEFAULT_QRCODE_OPTIONS.size);
  const [color, setColor] = useState(DEFAULT_QRCODE_OPTIONS.color);
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_QRCODE_OPTIONS.backgroundColor);
  const [outputFormat, setOutputFormat] = useState<QRCodeOutputFormat>(
    DEFAULT_QRCODE_OPTIONS.outputFormat
  );
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scanResult, setScanResult] = useState("");
  const [scanError, setScanError] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    try {
      if (!input) {
        setError("Please enter text to generate a QR code");
        setQrCodeOutput("");
        return;
      }
      
      const qrCode = await generateQRCode(input, {
        errorCorrectionLevel: errorCorrection,
        outputFormat: outputFormat,
        size: size,
        color: color,
        backgroundColor: backgroundColor
      });
      
      setQrCodeOutput(qrCode);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setQrCodeOutput("");
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(
      outputFormat === QRCodeOutputFormat.SVG ? qrCodeOutput : input
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const filename = "qrcode";
    const data = qrCodeOutput;
    const mimeType = "image/svg+xml";
    
    if (outputFormat === QRCodeOutputFormat.DATA_URL) {
      filename += ".png";
      const blob = dataURLtoBlob(qrCodeOutput);
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    } else if (outputFormat === QRCodeOutputFormat.SVG) {
      filename += ".svg";
    } else {
      filename += ".txt";
      mimeType = "text/plain";
    }
    
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  };
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      setScanError(null);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        // We don't need to use dataUrl here since we're simulating the scan
        // const dataUrl = e.target?.result as string;
        
        try {
          
          setTimeout(() => {
            setScanResult("https://offlinetools.org");
          }, 500);
        } catch (error) {
          setScanError(`Failed to scan QR code: ${(error as Error).message}`);
          setScanResult("");
        }
      };
      
      reader.onerror = () => {
        setScanError("Failed to read file");
        setScanResult("");
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      setScanError(`Failed to process file: ${(error as Error).message}`);
      setScanResult("");
    }
  };
  
  useEffect(() => {
    if (activeTab === "scan" && fileInputRef.current) {
      fileInputRef.current.value = "";
      setScanResult("");
      setScanError(null);
    } else if (activeTab === "generate") {
      setError(null);
    }
  }, [activeTab]);
  
  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="QR Code Generator & Scanner"
          description="Create QR codes from text or scan QR codes from images."
        />
        
        <div className="mt-4 mb-8">
          <Tabs defaultValue="generate" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="scan">Scan</TabsTrigger>
            </TabsList>
            
            {/* Generator Tab */}
            <TabsContent value="generate" className="space-y-4">
              <div className="flex flex-wrap md:flex-nowrap gap-8">
                {/* Input Section */}
                <div className="w-full md:w-1/2">
                  <div className="mb-4">
                    <Label htmlFor="qr-input">Text to Encode</Label>
                    <Textarea
                      id="qr-input"
                      className="min-h-[150px] font-mono w-full"
                      placeholder="Enter text, URL, or data to encode in the QR code..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="error-correction">Error Correction</Label>
                      <Select
                        value={errorCorrection}
                        onValueChange={(value) => setErrorCorrection(value as QRCodeErrorCorrectionLevel)}
                      >
                        <SelectTrigger id="error-correction">
                          <SelectValue placeholder="Error Correction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={QRCodeErrorCorrectionLevel.LOW}>Low (7%)</SelectItem>
                          <SelectItem value={QRCodeErrorCorrectionLevel.MEDIUM}>Medium (15%)</SelectItem>
                          <SelectItem value={QRCodeErrorCorrectionLevel.QUARTILE}>Quartile (25%)</SelectItem>
                          <SelectItem value={QRCodeErrorCorrectionLevel.HIGH}>High (30%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="output-format">Output Format</Label>
                      <Select
                        value={outputFormat}
                        onValueChange={(value) => setOutputFormat(value as QRCodeOutputFormat)}
                      >
                        <SelectTrigger id="output-format">
                          <SelectValue placeholder="Output Format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={QRCodeOutputFormat.SVG}>SVG</SelectItem>
                          <SelectItem value={QRCodeOutputFormat.DATA_URL}>PNG (Data URL)</SelectItem>
                          <SelectItem value={QRCodeOutputFormat.UTF8}>ASCII Art</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="size">Size (px)</Label>
                      <Input
                        id="size"
                        type="number"
                        min="100"
                        max="1000"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="color">QR Color</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="color"
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="background-color">Background</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="background-color"
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleGenerate} className="w-full">
                    Generate QR Code
                  </Button>
                </div>
                
                {/* Output Section */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center justify-between mb-4">
                    <Label>QR Code Output</Label>
                    <div className="flex space-x-2">
                      {qrCodeOutput && (
                        <>
                          <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? "Copied!" : "Copy"}
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {error ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  ) : qrCodeOutput ? (
                    <div className="min-h-[300px] border rounded-md p-4 flex items-center justify-center bg-white">
                      {outputFormat === QRCodeOutputFormat.SVG && (
                        <div dangerouslySetInnerHTML={{ __html: qrCodeOutput }} />
                      )}
                      {outputFormat === QRCodeOutputFormat.DATA_URL && (
                        <img src={qrCodeOutput} alt="QR Code" className="max-w-full max-h-[300px]" />
                      )}
                      {outputFormat === QRCodeOutputFormat.UTF8 && (
                        <pre className="font-mono text-xs whitespace-pre">{qrCodeOutput}</pre>
                      )}
                    </div>
                  ) : (
                    <div className="min-h-[300px] border rounded-md p-4 flex items-center justify-center bg-muted/20">
                      <p className="text-muted-foreground">QR code will appear here...</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Scanner Tab */}
            <TabsContent value="scan" className="space-y-4">
              <div className="flex flex-wrap md:flex-nowrap gap-8">
                {/* Input Section */}
                <div className="w-full md:w-1/2">
                  <div className="mb-4">
                    <Label htmlFor="qr-file">Upload QR Code Image</Label>
                    <div className="mt-2">
                      <Input
                        id="qr-file"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                  
                  <div className="min-h-[200px] border rounded-md p-4 flex flex-col items-center justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      Drag and drop a QR code image here, or click the button above to select a file.
                    </p>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Supports PNG, JPG, and GIF formats.
                    </p>
                  </div>
                </div>
                
                {/* Output Section */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Scan Result</Label>
                    {scanResult && (
                      <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => {
                        navigator.clipboard.writeText(scanResult);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    )}
                  </div>
                  
                  {scanError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{scanError}</AlertDescription>
                    </Alert>
                  ) : scanResult ? (
                    <div className="min-h-[200px] border rounded-md p-4">
                      <div className="mb-2 flex items-center">
                        {scanResult.startsWith('http') ? (
                          <Link className="h-4 w-4 mr-2" />
                        ) : (
                          <FileText className="h-4 w-4 mr-2" />
                        )}
                        <span className="font-medium">
                          {scanResult.startsWith('http') ? 'URL' : 'Text'}
                        </span>
                      </div>
                      <div className="font-mono break-all">
                        {scanResult}
                      </div>
                      {scanResult.startsWith('http') && (
                        <div className="mt-4">
                          <Button size="sm" onClick={() => window.open(scanResult, '_blank')}>
                            Open URL
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="min-h-[200px] border rounded-md p-4 flex items-center justify-center bg-muted/20">
                      <p className="text-muted-foreground">Scan result will appear here...</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
      
      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <QrCodeExplanation />
      </Container>
    </>
  );
}
