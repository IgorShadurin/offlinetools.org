"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { testRegex, RegexFlag, RegexMatch } from "shared";
import { useState, useEffect, useCallback } from "react";
import { AlertCircle, Check, Copy, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import RegexTesterExplanation from "./RegexTesterExplanation";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [flags, setFlags] = useState({
    [RegexFlag.GLOBAL]: true,
    [RegexFlag.CASE_INSENSITIVE]: false,
    [RegexFlag.MULTILINE]: false,
    [RegexFlag.DOT_ALL]: false,
    [RegexFlag.UNICODE]: false,
    [RegexFlag.STICKY]: false,
  });

  const handleTest = useCallback(() => {
    try {
      const activeFlags = Object.entries(flags)
        .filter(([, isActive]) => isActive)
        .map(([flag]) => flag as RegexFlag);

      const results = testRegex(pattern, testString, { flags: activeFlags });
      setMatches(results);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setMatches([]);
    }
  }, [flags, pattern, testString]);

  const toggleFlag = (flag: RegexFlag) => {
    setFlags(prevFlags => ({
      ...prevFlags,
      [flag]: !prevFlags[flag],
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedText = () => {
    if (!testString || matches.length === 0) {
      return <div className="whitespace-pre-wrap">{testString}</div>;
    }

    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    const segments = [];
    let lastIndex = 0;

    sortedMatches.forEach((match, matchIndex) => {
      if (match.index > lastIndex) {
        segments.push(
          <span key={`text-${matchIndex}`}>
            {testString.substring(lastIndex, match.index)}
          </span>
        );
      }

      segments.push(
        <span
          key={`match-${matchIndex}`}
          className="bg-yellow-200 dark:bg-yellow-800"
          title={`Match ${matchIndex + 1}: ${match.text}`}
        >
          {testString.substring(match.index, match.endIndex)}
        </span>
      );

      lastIndex = match.endIndex;
    });

    if (lastIndex < testString.length) {
      segments.push(
        <span key="text-end">
          {testString.substring(lastIndex)}
        </span>
      );
    }

    return <div className="whitespace-pre-wrap">{segments}</div>;
  };

  const activeFlags = Object.entries(flags)
    .filter(([, isActive]) => isActive)
    .map(([flag]) => flag as RegexFlag);
  
  const activeFlagsString = activeFlags.join('');
  
  useEffect(() => {
    if (pattern && testString) {
      handleTest();
    } else {
      setMatches([]);
      setError(null);
    }
  }, [pattern, testString, activeFlagsString, handleTest]);  // Include handleTest in dependencies

  const renderMatchDetails = () => {
    if (matches.length === 0) {
      return <div className="text-muted-foreground italic">No matches found</div>;
    }

    return (
      <div className="space-y-4">
        <div className="font-medium">Found {matches.length} match{matches.length !== 1 ? 'es' : ''}</div>
        {matches.map((match, index) => (
          <div key={index} className="border rounded-md p-3 space-y-2">
            <div className="flex justify-between">
              <div className="font-semibold">Match {index + 1}</div>
              <div className="text-sm text-muted-foreground">Index: {match.index}-{match.endIndex}</div>
            </div>
            <div className="bg-muted p-2 rounded font-mono">{match.text}</div>
            
            {match.groups.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium mt-2">Capture Groups:</div>
                {match.groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="grid grid-cols-2 gap-2 text-sm">
                    <div>Group {groupIndex + 1}:</div>
                    <div className="font-mono bg-muted p-1 rounded">{group.text || '(empty)'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Regex Tester"
          description="Test and debug regular expressions with visual match highlighting and support for various regex flags."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/text-hash-generator" className="text-primary hover:underline">
            Text Hash Generator
          </Link>
        </div>

        <div className="space-y-6">
          {/* Pattern input */}
          <div className="space-y-2">
            <Label htmlFor="pattern">Regular Expression Pattern</Label>
            <div className="flex gap-2">
              <Input
                id="pattern"
                placeholder="Enter regex pattern (e.g., \d+\s\w+)"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono flex-1"
              />
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleCopy}
                disabled={!pattern}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Regex flags */}
          <div className="space-y-2">
            <Label>Regex Flags</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-g"
                  checked={flags[RegexFlag.GLOBAL]}
                  onCheckedChange={() => toggleFlag(RegexFlag.GLOBAL)}
                />
                <Label htmlFor="flag-g" className="cursor-pointer">
                  Global (g)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-i"
                  checked={flags[RegexFlag.CASE_INSENSITIVE]}
                  onCheckedChange={() => toggleFlag(RegexFlag.CASE_INSENSITIVE)}
                />
                <Label htmlFor="flag-i" className="cursor-pointer">
                  Case Insensitive (i)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-m"
                  checked={flags[RegexFlag.MULTILINE]}
                  onCheckedChange={() => toggleFlag(RegexFlag.MULTILINE)}
                />
                <Label htmlFor="flag-m" className="cursor-pointer">
                  Multiline (m)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-s"
                  checked={flags[RegexFlag.DOT_ALL]}
                  onCheckedChange={() => toggleFlag(RegexFlag.DOT_ALL)}
                />
                <Label htmlFor="flag-s" className="cursor-pointer">
                  Dot All (s)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-u"
                  checked={flags[RegexFlag.UNICODE]}
                  onCheckedChange={() => toggleFlag(RegexFlag.UNICODE)}
                />
                <Label htmlFor="flag-u" className="cursor-pointer">
                  Unicode (u)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-y"
                  checked={flags[RegexFlag.STICKY]}
                  onCheckedChange={() => toggleFlag(RegexFlag.STICKY)}
                />
                <Label htmlFor="flag-y" className="cursor-pointer">
                  Sticky (y)
                </Label>
              </div>
            </div>
          </div>

          {/* Test string and results */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Test string input */}
            <div className="w-full md:w-1/2 space-y-2">
              <Label htmlFor="test-string">Test String</Label>
              <Textarea
                id="test-string"
                placeholder="Enter text to test against the regex pattern"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="min-h-[250px] font-mono"
              />
            </div>

            {/* Results */}
            <div className="w-full md:w-1/2 space-y-2">
              <Label>Results</Label>
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="border rounded-md p-4 min-h-[250px] overflow-auto">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="font-medium">Highlighted Matches:</div>
                      <div className="p-2 border rounded-md bg-muted/30 min-h-[50px]">
                        {renderHighlightedText()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium">Match Details:</div>
                      {renderMatchDetails()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Test button */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <Button
                onClick={handleTest}
                className="w-full"
                disabled={!pattern || !testString}
              >
                Test Regex
              </Button>
            </div>
            <div className="w-full md:w-1/2">{/* Empty space to align with button */}</div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <RegexTesterExplanation />
      </Container>
    </>
  );
}
