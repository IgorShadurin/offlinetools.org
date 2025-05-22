import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Alert } from "./ui/alert";
import { generatePassword, generateMultiplePasswords, DEFAULT_PASSWORD_OPTIONS } from "../../../shared";
import { Copy, Check, RefreshCw } from "lucide-react";

/**
 * Password Generator component props
 */
interface PasswordGeneratorProps {
  className?: string;
}

/**
 * Password Generator component for generating secure passwords
 * @param props - Password Generator component props
 * @returns Password Generator component
 */
export function PasswordGenerator({ className }: PasswordGeneratorProps) {
  const [password, setPassword] = useState<string>("");
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

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      localStorage.removeItem('clipboard-content-for-tool');
      
      try {
        const newPassword = generatePassword(options);
        setPassword(newPassword);
      } catch (error) {
      }
    }
  }, []);

  const handleGeneratePassword = () => {
    try {
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setError(null);
    } catch (error) {
      setError(`Error: ${(error as Error).message}`);
      setPassword("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Password Generator</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lowercase"
                checked={options.lowercase}
                onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="lowercase" className="text-sm">
                Lowercase (a-z)
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="uppercase"
                checked={options.uppercase}
                onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="uppercase" className="text-sm">
                Uppercase (A-Z)
              </label>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="numbers"
                checked={options.numbers}
                onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="numbers" className="text-sm">
                Numbers (0-9)
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="symbols"
                checked={options.symbols}
                onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="symbols" className="text-sm">
                Symbols (!@#$%...)
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="length" className="text-sm whitespace-nowrap">
              Length: {options.length}
            </label>
            <input
              type="range"
              id="length"
              min="4"
              max="64"
              value={options.length}
              onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
              className="flex-1"
            />
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="exclude-similar"
              checked={options.excludeSimilarCharacters}
              onChange={(e) => setOptions({ ...options, excludeSimilarCharacters: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="exclude-similar" className="text-sm">
              Exclude similar characters (i, l, 1, I, o, 0, O)
            </label>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGeneratePassword}
              className="bg-emerald-500 hover:bg-emerald-600 font-normal py-1 px-4 rounded-md"
            >
              Generate Password
            </Button>
          </div>

          {error ? (
            <Alert variant="destructive" className="mt-4">
              {error}
            </Alert>
          ) : null}

          <div className="flex-1 flex flex-col min-h-0 mt-4">
            <label
              htmlFor="generated-password"
              className="mb-1 text-sm font-medium"
            >
              Generated Password:
            </label>
            <div className="flex items-center gap-2">
              <Textarea
                id="generated-password"
                value={password}
                readOnly
                placeholder="Your generated password will appear here"
                className="flex-1 min-h-0 font-mono text-sm resize-none border-muted"
              />
              {password ? (
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    title="Copy password"
                    className="h-8 w-8 p-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGeneratePassword}
                    title="Generate new password"
                    className="h-8 w-8 p-0"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
