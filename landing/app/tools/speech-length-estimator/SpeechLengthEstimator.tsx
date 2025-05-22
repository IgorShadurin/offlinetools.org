"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { 
  estimateSpeechLength, 
  formatTime, 
  SpeechSpeed, 
  SPEECH_SPEED_WPM 
} from "shared"
import { useState, useEffect } from "react"
import { AlertCircle, Check, Copy, Clock, Link as LinkIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import SpeechLengthEstimatorExplanation from "./SpeechLengthEstimatorExplanation"

export default function SpeechLengthEstimator() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [speedOption, setSpeedOption] = useState<SpeechSpeed>(SpeechSpeed.NORMAL)
  const [customWpm, setCustomWpm] = useState(String(SPEECH_SPEED_WPM[SpeechSpeed.CUSTOM]))
  const [includePauses, setIncludePauses] = useState(true)

  useEffect(() => {
    try {
      if (!text) {
        setResult("0:00");
        return;
      }

      let wpm = SPEECH_SPEED_WPM[speedOption];
      if (speedOption === SpeechSpeed.CUSTOM) {
        const parsedWpm = parseInt(customWpm, 10);
        if (!isNaN(parsedWpm) && parsedWpm > 0) {
          wpm = parsedWpm;
        }
      }

      const ms = estimateSpeechLength(text, { wpm, includePauses });
      setResult(formatTime(ms));
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setResult("");
    }
  }, [text, speedOption, customWpm, includePauses]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Speech Length Estimator"
          description="Calculate how long it will take to speak a text with adjustable speed settings."
        />

        {/* Related tools */}
        <div className="mb-6 flex items-center">
          <LinkIcon className="mr-2 h-4 w-4" />
          <span className="mr-2 text-sm font-medium">Related tools:</span>
          <Link href="/tools/text-hash-generator" className="text-sm text-blue-600 hover:underline mr-4">
            Text Hash Generator
          </Link>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Input column */}
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              <Label htmlFor="input-text">Text to estimate</Label>
              <Textarea
                id="input-text"
                placeholder="Enter or paste your text here..."
                className="font-mono min-h-[250px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              {/* Speed options */}
              <div className="space-y-4">
                <Label>Speaking speed</Label>
                <RadioGroup
                  value={speedOption}
                  onValueChange={(val) => setSpeedOption(val as SpeechSpeed)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SpeechSpeed.SLOW} id="slow" />
                    <Label htmlFor="slow" className="cursor-pointer">
                      Slow ({SPEECH_SPEED_WPM[SpeechSpeed.SLOW]} words per minute)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SpeechSpeed.NORMAL} id="normal" />
                    <Label htmlFor="normal" className="cursor-pointer">
                      Normal ({SPEECH_SPEED_WPM[SpeechSpeed.NORMAL]} words per minute)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SpeechSpeed.FAST} id="fast" />
                    <Label htmlFor="fast" className="cursor-pointer">
                      Fast ({SPEECH_SPEED_WPM[SpeechSpeed.FAST]} words per minute)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SpeechSpeed.CUSTOM} id="custom" />
                    <Label htmlFor="custom" className="cursor-pointer">
                      Custom
                    </Label>
                    <Input
                      type="number"
                      min="50"
                      max="300"
                      className="w-20 h-8"
                      value={customWpm}
                      onChange={(e) => setCustomWpm(e.target.value)}
                      disabled={speedOption !== SpeechSpeed.CUSTOM}
                    />
                    <span className="text-sm">words per minute</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Include pauses option */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-pauses"
                  checked={includePauses}
                  onCheckedChange={setIncludePauses}
                />
                <Label htmlFor="include-pauses" className="cursor-pointer">
                  Include pauses for punctuation
                </Label>
              </div>
            </div>
          </div>

          {/* Output column */}
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              <Label htmlFor="output" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Estimated speech length
              </Label>

              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <div className="bg-muted rounded-md p-6 min-h-[100px] flex flex-col justify-center items-center">
                  <div className="text-4xl font-mono">{result}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {result !== "0:00" ? 
                      `at ${speedOption === SpeechSpeed.CUSTOM ? customWpm : SPEECH_SPEED_WPM[speedOption]} words per minute` : 
                      "No text to estimate"
                    }
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center"
                  onClick={handleCopy}
                  disabled={!result || result === "0:00"}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Word count info */}
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <h3 className="text-sm font-semibold mb-2">Text Statistics</h3>
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Words:</span>
                    <span>{text ? text.trim().split(/\s+/).filter(w => w.length > 0).length : 0}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Characters (with spaces):</span>
                    <span>{text ? text.length : 0}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Characters (without spaces):</span>
                    <span>{text ? text.replace(/\s/g, '').length : 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation component */}
        <div className="mt-12">
          <SpeechLengthEstimatorExplanation />
        </div>
      </Container>
    </>
  );
}
