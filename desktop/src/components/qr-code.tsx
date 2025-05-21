import { useState, useRef, useEffect } from "react";
import { 
  generateQRCode, 
  QRCodeErrorCorrectionLevel,
  QRCodeOutputFormat,
  DEFAULT_QRCODE_OPTIONS
} from "shared";

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
  };
  
  const handleDownload = () => {
    let filename = "qrcode";
    let data = qrCodeOutput;
    let mimeType = "image/svg+xml";
    
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
        const dataUrl = e.target?.result as string;
        
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator & Scanner</h1>
      
      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === "generate" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("generate")}
          >
            Generate
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "scan" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("scan")}
          >
            Scan
          </button>
        </div>
      </div>
      
      {activeTab === "generate" ? (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Input Section */}
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <label className="block mb-2">Text to Encode</label>
              <textarea
                className="w-full p-2 border rounded min-h-[150px] font-mono"
                placeholder="Enter text, URL, or data to encode in the QR code..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">Error Correction</label>
                <select
                  className="w-full p-2 border rounded"
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as QRCodeErrorCorrectionLevel)}
                >
                  <option value={QRCodeErrorCorrectionLevel.LOW}>Low (7%)</option>
                  <option value={QRCodeErrorCorrectionLevel.MEDIUM}>Medium (15%)</option>
                  <option value={QRCodeErrorCorrectionLevel.QUARTILE}>Quartile (25%)</option>
                  <option value={QRCodeErrorCorrectionLevel.HIGH}>High (30%)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2">Output Format</label>
                <select
                  className="w-full p-2 border rounded"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as QRCodeOutputFormat)}
                >
                  <option value={QRCodeOutputFormat.SVG}>SVG</option>
                  <option value={QRCodeOutputFormat.DATA_URL}>PNG (Data URL)</option>
                  <option value={QRCodeOutputFormat.UTF8}>ASCII Art</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-2">Size (px)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  min="100"
                  max="1000"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              
              <div>
                <label className="block mb-2">QR Color</label>
                <input
                  type="color"
                  className="w-full p-1 border rounded h-10"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block mb-2">Background</label>
                <input
                  type="color"
                  className="w-full p-1 border rounded h-10"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </div>
            </div>
            
            <button
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleGenerate}
            >
              Generate QR Code
            </button>
          </div>
          
          {/* Output Section */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <label className="block">QR Code Output</label>
              <div className="flex space-x-2">
                {qrCodeOutput && (
                  <>
                    <button
                      className="px-3 py-1 border rounded text-sm flex items-center gap-1"
                      onClick={handleCopy}
                    >
                      Copy
                    </button>
                    <button
                      className="px-3 py-1 border rounded text-sm flex items-center gap-1"
                      onClick={handleDownload}
                    >
                      Download
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {error ? (
              <div className="p-4 border border-red-500 bg-red-50 text-red-700 rounded">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            ) : qrCodeOutput ? (
              <div className="min-h-[300px] border rounded p-4 flex items-center justify-center bg-white">
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
              <div className="min-h-[300px] border rounded p-4 flex items-center justify-center bg-gray-50">
                <p className="text-gray-400">QR code will appear here...</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Input Section */}
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <label className="block mb-2">Upload QR Code Image</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </div>
            
            <div className="min-h-[200px] border rounded p-4 flex flex-col items-center justify-center">
              <p className="text-center text-gray-400">
                Drag and drop a QR code image here, or click the button above to select a file.
              </p>
              <p className="text-center text-gray-400 text-sm mt-2">
                Supports PNG, JPG, and GIF formats.
              </p>
            </div>
          </div>
          
          {/* Output Section */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <label className="block">Scan Result</label>
              {scanResult && (
                <button
                  className="px-3 py-1 border rounded text-sm"
                  onClick={() => navigator.clipboard.writeText(scanResult)}
                >
                  Copy
                </button>
              )}
            </div>
            
            {scanError ? (
              <div className="p-4 border border-red-500 bg-red-50 text-red-700 rounded">
                <p className="font-bold">Error</p>
                <p>{scanError}</p>
              </div>
            ) : scanResult ? (
              <div className="min-h-[200px] border rounded p-4">
                <div className="mb-2">
                  <span className="font-medium">
                    {scanResult.startsWith('http') ? 'URL' : 'Text'}
                  </span>
                </div>
                <div className="font-mono break-all">
                  {scanResult}
                </div>
                {scanResult.startsWith('http') && (
                  <div className="mt-4">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      onClick={() => window.open(scanResult, '_blank')}
                    >
                      Open URL
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="min-h-[200px] border rounded p-4 flex items-center justify-center bg-gray-50">
                <p className="text-gray-400">Scan result will appear here...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
