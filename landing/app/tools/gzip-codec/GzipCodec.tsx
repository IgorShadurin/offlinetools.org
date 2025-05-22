"use client";

import { useState, useCallback } from 'react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import Link from 'next/link'; // Added for related tools
import { Link as LinkIcon } from 'lucide-react'; // Added for related tools icon
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Copy, Check, AlertCircle, Upload, Download, Loader2 } from 'lucide-react';
import { gzipPack, gzipExtract, strToU8 } from 'shared';
import { GzipCodecExplanation } from './GzipCodecExplanation'; // Import the explanation component

// Helper function to read file as ArrayBuffer
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

export function GzipCodec() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [inputFileName, setInputFileName] = useState<string>('');
  const [outputFileName, setOutputFileName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [packedData, setPackedData] = useState<Uint8Array | null>(null);
  const [mode, setMode] = useState<'pack' | 'extract'>('pack');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetState = useCallback(() => {
    setError(null);
    setOutputText('');
    setPackedData(null);
    setOutputFileName('');
    // Keep inputFileName and selectedFile if user might re-use them, or clear them too:
    // setInputFileName('');
    // setSelectedFile(null);
    // setInputText(''); // Keep inputText if user is just switching modes
  }, []);

  const handleModeChange = (newMode: 'pack' | 'extract') => {
    setMode(newMode);
    resetState();
    // Clear inputs specific to the old mode
    setInputText('');
    setSelectedFile(null);
    setInputFileName('');
  };

  const handleFileChangePack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setInputFileName(file.name);
      setInputText(''); // Clear text input if file is selected
      setError(null);
    }
  };

  const handleFileChangeExtract = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.gz') || file.name.toLowerCase().endsWith('.gzip')) {
        setSelectedFile(file);
        setInputFileName(file.name);
        setError(null);
      } else {
        setSelectedFile(null);
        setInputFileName('');
        setError('Invalid file type. Please select a .gz or .gzip file for extraction.');
      }
    }
  };

  const handleProcess = useCallback(async () => {
    setIsLoading(true);
    resetState();

    if (mode === 'pack') {
      try {
        let dataToPack: Uint8Array;
        let baseOutputName: string;

        if (selectedFile) {
          const arrayBuffer = await readFileAsArrayBuffer(selectedFile);
          dataToPack = new Uint8Array(arrayBuffer);
          baseOutputName = selectedFile.name;
        } else if (inputText) {
          dataToPack = strToU8(inputText); // Use strToU8 from shared/fflate
          baseOutputName = 'packed_text';
        } else {
          setError('No input provided. Please enter text or select a file to pack.');
          setIsLoading(false);
          return;
        }

        const compressedData = gzipPack(dataToPack);
        setPackedData(compressedData);
        setOutputFileName(`${baseOutputName}.gz`);
      } catch (e) {
        setError(`Packing failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    } else { // mode === 'extract'
      if (!selectedFile) {
        setError('No file selected for extraction. Please select a .gz or .gzip file.');
        setIsLoading(false);
        return;
      }
      try {
        const arrayBuffer = await readFileAsArrayBuffer(selectedFile);
        const dataToExtract = new Uint8Array(arrayBuffer);
        const extractedText = gzipExtract(dataToExtract);
        setOutputText(extractedText);
        // Attempt to remove .gz or .gzip extension for output name
        const originalName = selectedFile.name;
        if (originalName.toLowerCase().endsWith('.gz')) {
          setOutputFileName(originalName.substring(0, originalName.length - 3));
        } else if (originalName.toLowerCase().endsWith('.gzip')) {
          setOutputFileName(originalName.substring(0, originalName.length - 5));
        } else {
          setOutputFileName(`${originalName}.txt`); // Fallback if not .gz
        }

      } catch (e) {
        setError(`Extraction failed: ${e instanceof Error ? e.message : String(e)}`);
        setOutputText(''); // Clear output text on error
      }
    }
    setIsLoading(false);
  }, [mode, selectedFile, inputText, resetState]);

  const handleDownloadPacked = () => {
    if (packedData && outputFileName) {
      const blob = new Blob([packedData], { type: 'application/gzip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = outputFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadExtractedText = () => {
    if (outputText && outputFileName) {
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = outputFileName.endsWith('.txt') ? outputFileName : `${outputFileName}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleCopyOutput = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => {
        setError(`Failed to copy: ${err}`);
      });
    }
  };

  return (
    <Container className="py-12">
      <SectionHeading
        title="Gzip Codec"
        description="Compress (pack) or decompress (extract) data using Gzip. Handles text and files."
      />

      {/* Related Tools Section */}
      <div className="mt-4 mb-8 flex flex-wrap gap-x-4 gap-y-2 items-center">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Related Tools:
        </h3>
        <Link
          href="/tools/base64-codec"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
        >
          <LinkIcon size={16} /> Base64 Encoder/Decoder
        </Link>
        <Link
          href="/tools/file-generator"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
        >
          <LinkIcon size={16} /> File Generator
        </Link>
        <Link
          href="/tools/binary-base64-codec"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
        >
          <LinkIcon size={16} /> Binary Base64 Encoder/Decoder
        </Link>
      </div>

      <Tabs value={mode} onValueChange={(value) => handleModeChange(value as 'pack' | 'extract')} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pack">Pack (Compress)</TabsTrigger>
          <TabsTrigger value="extract">Extract (Decompress)</TabsTrigger>
        </TabsList>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Input Column */}
          <div className="space-y-4">
            {mode === 'pack' ? (
              <>
                <div>
                  <Label htmlFor="text-input">Text to Pack:</Label>
                  <Textarea
                    id="text-input"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      setSelectedFile(null); // Clear file if text is entered
                      setInputFileName('');
                      setError(null);
                    }}
                    placeholder="Enter text to compress..."
                    rows={5}
                    disabled={isLoading || !!selectedFile}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
                <div>
                  <Label htmlFor="file-input-pack">File to Pack:</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="file"
                      id="file-input-pack"
                      onChange={handleFileChangePack}
                      className="flex-grow"
                      disabled={isLoading}
                    />
                    {inputFileName && <span className="text-sm text-muted-foreground truncate" title={inputFileName}>{inputFileName}</span>}
                  </div>
                </div>
              </>
            ) : ( // mode === 'extract'
              <div>
                <Label htmlFor="file-input-extract">File to Extract (.gz, .gzip):</Label>
                 <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    id="file-input-extract"
                    onChange={handleFileChangeExtract}
                    accept=".gz,.gzip"
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  {inputFileName && <span className="text-sm text-muted-foreground truncate" title={inputFileName}>{inputFileName}</span>}
                </div>
              </div>
            )}
            <Button onClick={handleProcess} disabled={isLoading || (mode === 'pack' && !inputText && !selectedFile) || (mode === 'extract' && !selectedFile)} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : mode === 'pack' ? (
                <Upload className="mr-2 h-4 w-4" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Processing...' : mode === 'pack' ? 'Pack Data' : 'Extract File'}
            </Button>
          </div>

          {/* Output Column */}
          <div className="space-y-4">
            {mode === 'pack' && packedData && outputFileName && (
              <div>
                <Label>Output (Packed File):</Label>
                <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 items-start">
                  <p className="p-2 border rounded-md bg-muted flex-grow break-all" title={outputFileName}>{outputFileName}</p>
                  <Button onClick={handleDownloadPacked} variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            )}
            {mode === 'extract' && outputText && (
              <div>
                <Label htmlFor="text-output">Output (Extracted Text):</Label>
                <Textarea
                  id="text-output"
                  value={outputText}
                  readOnly
                  placeholder="Extracted text will appear here..."
                  rows={5}
                  className="mt-1"
                />
                <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Button onClick={handleCopyOutput} variant="outline" className="w-full sm:w-auto">
                    {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </Button>
                  <Button onClick={handleDownloadExtractedText} variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" /> Download as .txt
                  </Button>
                </div>
              </div>
            )}
             {/* Display placeholder or instruction if no output yet */}
            {mode === 'pack' && !packedData && !isLoading && !error && (
              <div className="p-4 border rounded-md bg-muted text-sm text-muted-foreground">
                Compressed file details will appear here after packing.
              </div>
            )}
            {mode === 'extract' && !outputText && !isLoading && !error && (
               <div className="p-4 border rounded-md bg-muted text-sm text-muted-foreground">
                Extracted text will appear here after selecting a .gz file and clicking "Extract File".
              </div>
            )}
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Tabs>
      <div className="mt-12">
        <GzipCodecExplanation />
      </div>
    </Container>
  );
}
