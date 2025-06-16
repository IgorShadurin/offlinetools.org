import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Download, Upload, Lock, Unlock, FileText } from 'lucide-react';
import {
  embedTextInImage,
  extractTextFromImage,
  validateImageFile,
  validateMnemonicPhrase,
  type EmbedResult,
  type ExtractResult,
  type SteganographyOptions,
} from 'shared';

interface SteganographyProps {
  className?: string;
}

export function Steganography({ className }: SteganographyProps) {
  const [activeTab, setActiveTab] = useState<'embed' | 'extract'>('embed');
  
  const [embedText, setEmbedText] = useState('');
  const [embedPassword, setEmbedPassword] = useState('');
  const [embedImage, setEmbedImage] = useState<File | null>(null);
  const [embedResult, setEmbedResult] = useState<EmbedResult | null>(null);
  const [embedLoading, setEmbedLoading] = useState(false);
  const [embedError, setEmbedError] = useState('');
  const [showEmbedPassword, setShowEmbedPassword] = useState(false);
  
  const [extractPassword, setExtractPassword] = useState('');
  const [extractImage, setExtractImage] = useState<File | null>(null);
  const [extractResult, setExtractResult] = useState<ExtractResult | null>(null);
  const [extractLoading, setExtractLoading] = useState(false);
  const [extractError, setExtractError] = useState('');
  const [showExtractPassword, setShowExtractPassword] = useState(false);
  
  const embedFileInputRef = useRef<HTMLInputElement>(null);
  const extractFileInputRef = useRef<HTMLInputElement>(null);

  const handleEmbedImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setEmbedError(validation.error || 'Invalid image file');
        return;
      }
      setEmbedImage(file);
      setEmbedError('');
      setEmbedResult(null);
    }
  }, []);

  const handleExtractImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setExtractError(validation.error || 'Invalid image file');
        return;
      }
      setExtractImage(file);
      setExtractError('');
      setExtractResult(null);
    }
  }, []);

  const handleEmbed = useCallback(async () => {
    if (!embedImage || !embedText.trim()) {
      setEmbedError('Please select an image and enter text to embed');
      return;
    }

    const textValidation = validateMnemonicPhrase(embedText);
    if (!textValidation.valid) {
      setEmbedError(textValidation.error || 'Invalid mnemonic phrase');
      return;
    }

    setEmbedLoading(true);
    setEmbedError('');
    setEmbedResult(null);

    try {
      const options: SteganographyOptions = {
        password: embedPassword || undefined,
        quality: 0.9,
      };

      const result = await embedTextInImage(embedImage, embedText, options);
      setEmbedResult(result);

      if (!result.success) {
        setEmbedError(result.error || 'Failed to embed text in image');
      }
    } catch (error) {
      setEmbedError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setEmbedLoading(false);
    }
  }, [embedImage, embedText, embedPassword]);

  const handleExtract = useCallback(async () => {
    if (!extractImage) {
      setExtractError('Please select an image to extract text from');
      return;
    }

    setExtractLoading(true);
    setExtractError('');
    setExtractResult(null);

    try {
      const options: SteganographyOptions = {
        password: extractPassword || undefined,
      };

      const result = await extractTextFromImage(extractImage, options);
      setExtractResult(result);

      if (!result.success) {
        setExtractError(result.error || 'Failed to extract text from image');
      }
    } catch (error) {
      setExtractError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setExtractLoading(false);
    }
  }, [extractImage, extractPassword]);

  const handleDownload = useCallback(() => {
    if (embedResult?.success && embedResult.data) {
      const url = URL.createObjectURL(embedResult.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = embedResult.steganographyFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [embedResult]);

  const resetEmbed = useCallback(() => {
    setEmbedText('');
    setEmbedPassword('');
    setEmbedImage(null);
    setEmbedResult(null);
    setEmbedError('');
    if (embedFileInputRef.current) {
      embedFileInputRef.current.value = '';
    }
  }, []);

  const resetExtract = useCallback(() => {
    setExtractPassword('');
    setExtractImage(null);
    setExtractResult(null);
    setExtractError('');
    if (extractFileInputRef.current) {
      extractFileInputRef.current.value = '';
    }
  }, []);

  return (
    <div className={className}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Steganography Tool</h1>
          <p className="text-muted-foreground">
            Hide mnemonic phrases securely within images using steganography
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'embed' | 'extract')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="embed" className="flex items-center gap-2">
              <Lock size={16} />
              Embed Text
            </TabsTrigger>
            <TabsTrigger value="extract" className="flex items-center gap-2">
              <Unlock size={16} />
              Extract Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="embed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock size={20} />
                  Embed Mnemonic Phrase
                </CardTitle>
                <CardDescription>
                  Hide your mnemonic phrase securely within an image. Optionally protect it with a password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="embed-text" className="block mb-1 text-sm font-medium">Mnemonic Phrase</label>
                  <Textarea
                    id="embed-text"
                    placeholder="Enter your 12 or 24 word mnemonic phrase..."
                    value={embedText}
                    onChange={(e) => setEmbedText(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="embed-password" className="block mb-1 text-sm font-medium">Password (Optional)</label>
                  <div className="relative">
                    <input
                      id="embed-password"
                      type={showEmbedPassword ? 'text' : 'password'}
                      placeholder="Enter password for additional security..."
                      value={embedPassword}
                      onChange={(e) => setEmbedPassword(e.target.value)}
                      className="w-full border rounded h-8 px-2 text-sm pr-10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent border-0"
                      onClick={() => setShowEmbedPassword(!showEmbedPassword)}
                    >
                      {showEmbedPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="embed-image" className="block mb-1 text-sm font-medium">Select Image</label>
                  <input
                    id="embed-image"
                    type="file"
                    accept="image/*"
                    onChange={handleEmbedImageSelect}
                    ref={embedFileInputRef}
                    className="w-full border rounded h-8 px-2 text-sm"
                  />
                  {embedImage && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {embedImage.name} ({(embedImage.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {embedError && (
                  <Alert variant="destructive">
                    <AlertDescription>{embedError}</AlertDescription>
                  </Alert>
                )}

                {embedResult?.success && (
                  <Alert>
                    <AlertDescription className="flex items-center justify-between">
                      <span>Text successfully embedded in image!</span>
                      <Button onClick={handleDownload} size="sm">
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleEmbed}
                    disabled={embedLoading || !embedImage || !embedText.trim()}
                    className="flex-1"
                  >
                    {embedLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Embedding...
                      </>
                    ) : (
                      <>
                        <Lock size={16} className="mr-2" />
                        Embed Text
                      </>
                    )}
                  </Button>
                  <Button onClick={resetEmbed} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extract" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Unlock size={20} />
                  Extract Mnemonic Phrase
                </CardTitle>
                <CardDescription>
                  Extract hidden mnemonic phrase from an image. Enter the password if one was used.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="extract-image" className="block mb-1 text-sm font-medium">Select Image</label>
                  <input
                    id="extract-image"
                    type="file"
                    accept="image/*"
                    onChange={handleExtractImageSelect}
                    ref={extractFileInputRef}
                    className="w-full border rounded h-8 px-2 text-sm"
                  />
                  {extractImage && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {extractImage.name} ({(extractImage.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="extract-password" className="block mb-1 text-sm font-medium">Password (If Used)</label>
                  <div className="relative">
                    <input
                      id="extract-password"
                      type={showExtractPassword ? 'text' : 'password'}
                      placeholder="Enter password if one was used..."
                      value={extractPassword}
                      onChange={(e) => setExtractPassword(e.target.value)}
                      className="w-full border rounded h-8 px-2 text-sm pr-10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent border-0"
                      onClick={() => setShowExtractPassword(!showExtractPassword)}
                    >
                      {showExtractPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                {extractError && (
                  <Alert variant="destructive">
                    <AlertDescription>{extractError}</AlertDescription>
                  </Alert>
                )}

                {extractResult?.success && extractResult.data && (
                  <div className="space-y-2">
                    <label className="block mb-1 text-sm font-medium">Extracted Mnemonic Phrase</label>
                    <Textarea
                      value={extractResult.data}
                      readOnly
                      rows={3}
                      className="font-mono"
                    />
                    <Button
                      onClick={() => navigator.clipboard.writeText(extractResult.data || '')}
                      variant="outline"
                      size="sm"
                    >
                      <FileText size={16} className="mr-2" />
                      Copy to Clipboard
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={handleExtract}
                    disabled={extractLoading || !extractImage}
                    className="flex-1"
                  >
                    {extractLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Extracting...
                      </>
                    ) : (
                      <>
                        <Unlock size={16} className="mr-2" />
                        Extract Text
                      </>
                    )}
                  </Button>
                  <Button onClick={resetExtract} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
