"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { generatePassword, generateMultiplePasswords, DEFAULT_PASSWORD_OPTIONS } from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PasswordGeneratorExplanation from "./PasswordGeneratorExplanation";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [multiplePasswords, setMultiplePasswords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    length: DEFAULT_PASSWORD_OPTIONS.length,
    numbers: DEFAULT_PASSWORD_OPTIONS.numbers,
    symbols: DEFAULT_PASSWORD_OPTIONS.symbols,
    lowercase: DEFAULT_PASSWORD_OPTIONS.lowercase,
    uppercase: DEFAULT_PASSWORD_OPTIONS.uppercase,
    excludeSimilarCharacters: DEFAULT_PASSWORD_OPTIONS.excludeSimilarCharacters,
    exclude: DEFAULT_PASSWORD_OPTIONS.exclude,
    strict: DEFAULT_PASSWORD_OPTIONS.strict,
  });
  const [multipleCount, setMultipleCount] = useState(5);
  const [showMultiple, setShowMultiple] = useState(false);

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setPassword("");
    }
  };

  const handleGenerateMultiple = () => {
    try {
      const passwords = generateMultiplePasswords(multipleCount, options);
      setMultiplePasswords(passwords);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setMultiplePasswords([]);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <h1 className="text-4xl font-bold text-center mb-3">Password Generator</h1>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-10">
          Generate secure passwords with customizable options for length and character types.
        </p>

        <div className="space-y-8">
          {/* Options Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="password-length">Password Length: {options.length}</Label>
                </div>
                <Slider
                  id="password-length"
                  min={4}
                  max={64}
                  step={1}
                  value={[options.length]}
                  onValueChange={(value) => setOptions({ ...options, length: value[0] })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={options.lowercase}
                    onCheckedChange={(checked) => setOptions({ ...options, lowercase: !!checked })}
                  />
                  <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={options.uppercase}
                    onCheckedChange={(checked) => setOptions({ ...options, uppercase: !!checked })}
                  />
                  <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={options.numbers}
                    onCheckedChange={(checked) => setOptions({ ...options, numbers: !!checked })}
                  />
                  <Label htmlFor="numbers">Numbers (0-9)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={options.symbols}
                    onCheckedChange={(checked) => setOptions({ ...options, symbols: !!checked })}
                  />
                  <Label htmlFor="symbols">Symbols (!@#$%...)</Label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exclude-similar"
                  checked={options.excludeSimilarCharacters}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, excludeSimilarCharacters: !!checked })
                  }
                />
                <Label htmlFor="exclude-similar">Exclude similar characters (i, l, 1, I, o, 0, O)</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exclude-chars">Exclude characters:</Label>
                <Input
                  id="exclude-chars"
                  value={options.exclude}
                  onChange={(e) => setOptions({ ...options, exclude: e.target.value })}
                  placeholder="Characters to exclude"
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="strict"
                  checked={options.strict}
                  onCheckedChange={(checked) => setOptions({ ...options, strict: !!checked })}
                />
                <Label htmlFor="strict">
                  Strict mode (include at least one character from each selected type)
                </Label>
              </div>

              <Button onClick={handleGeneratePassword} className="w-full">
                Generate Password
              </Button>
            </div>

            <div className="space-y-6">
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="generated-password">Generated Password:</Label>
                <div className="flex space-x-2">
                  <Input
                    id="generated-password"
                    value={password}
                    readOnly
                    className="font-mono flex-1"
                    placeholder="Your generated password will appear here"
                  />
                  {password ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(password)}
                      title="Copy password"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  ) : null}
                  {password ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleGeneratePassword}
                      title="Generate new password"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowMultiple(!showMultiple)}
                    className="text-sm"
                  >
                    {showMultiple ? "Hide Multiple Passwords" : "Generate Multiple Passwords"}
                  </Button>
                </div>

                {showMultiple ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="multiple-count">Number of passwords:</Label>
                      <Input
                        id="multiple-count"
                        type="number"
                        min="1"
                        max="20"
                        value={multipleCount}
                        onChange={(e) => setMultipleCount(parseInt(e.target.value))}
                        className="w-16"
                      />
                      <Button onClick={handleGenerateMultiple} size="sm">
                        Generate
                      </Button>
                    </div>

                    {multiplePasswords.length > 0 ? (
                      <div className="border rounded-md p-3 bg-muted/50">
                        <div className="space-y-2">
                          {multiplePasswords.map((pwd, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <code className="text-sm font-mono">{pwd}</code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(pwd)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <PasswordGeneratorExplanation />
      </Container>
    </>
  );
}
