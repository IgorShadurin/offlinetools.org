import { useState, useEffect } from "react";
import { Clock, Copy, Check } from "lucide-react";
import { 
  estimateSpeechLength, 
  formatTime, 
  SpeechSpeed, 
  SPEECH_SPEED_WPM 
} from "shared/speech-length-estimator";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";


interface SpeechLengthEstimatorProps {
  className?: string;
}

export function SpeechLengthEstimator({ className = "" }: SpeechLengthEstimatorProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState("0:00");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [speedOption, setSpeedOption] = useState<SpeechSpeed>(SpeechSpeed.NORMAL);
  const [customWpm, setCustomWpm] = useState(String(SPEECH_SPEED_WPM[SpeechSpeed.CUSTOM]));
  const [includePauses, setIncludePauses] = useState(true);

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setText(clipboardContent);
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, []);

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

  const wordCount = text ? text.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const charCountWithSpaces = text ? text.length : 0;
  const charCountWithoutSpaces = text ? text.replace(/\s/g, '').length : 0;

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Speech Length Estimator</h1>
      </div>
          <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
            <div className="flex-1 flex flex-col min-h-0">
              <label htmlFor="input-text" className="mb-2 text-sm font-medium">
                Text to estimate
              </label>
              <Textarea
                id="input-text"
                placeholder="Enter or paste your text here..."
                className="flex-1 min-h-[200px] font-mono text-sm resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Speaking speed</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="slow"
                        name="speed"
                        value={SpeechSpeed.SLOW}
                        checked={speedOption === SpeechSpeed.SLOW}
                        onChange={(e) => setSpeedOption(e.target.value as SpeechSpeed)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="slow" className="text-sm cursor-pointer">
                        Slow ({SPEECH_SPEED_WPM[SpeechSpeed.SLOW]} words per minute)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="normal"
                        name="speed"
                        value={SpeechSpeed.NORMAL}
                        checked={speedOption === SpeechSpeed.NORMAL}
                        onChange={(e) => setSpeedOption(e.target.value as SpeechSpeed)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="normal" className="text-sm cursor-pointer">
                        Normal ({SPEECH_SPEED_WPM[SpeechSpeed.NORMAL]} words per minute)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="fast"
                        name="speed"
                        value={SpeechSpeed.FAST}
                        checked={speedOption === SpeechSpeed.FAST}
                        onChange={(e) => setSpeedOption(e.target.value as SpeechSpeed)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="fast" className="text-sm cursor-pointer">
                        Fast ({SPEECH_SPEED_WPM[SpeechSpeed.FAST]} words per minute)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="custom"
                        name="speed"
                        value={SpeechSpeed.CUSTOM}
                        checked={speedOption === SpeechSpeed.CUSTOM}
                        onChange={(e) => setSpeedOption(e.target.value as SpeechSpeed)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="custom" className="text-sm cursor-pointer">
                        Custom
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="300"
                        className="w-20 h-8 px-2 border rounded text-sm"
                        value={customWpm}
                        onChange={(e) => setCustomWpm(e.target.value)}
                        disabled={speedOption !== SpeechSpeed.CUSTOM}
                      />
                      <span className="text-sm">words per minute</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="include-pauses"
                    checked={includePauses}
                    onChange={(e) => setIncludePauses(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="include-pauses" className="text-sm cursor-pointer">
                    Include pauses for punctuation
                  </label>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <label className="mb-2 text-sm font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Estimated speech length
              </label>

              {error ? (
                <div className="rounded-md bg-destructive/15 p-4 text-destructive mb-4">
                  <div className="font-medium">Error</div>
                  <div className="text-sm mt-1">{error}</div>
                </div>
              ) : (
                <div className="bg-muted rounded-md p-6 mb-4 flex flex-col justify-center items-center">
                  <div className="text-4xl font-mono">{result}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {result !== "0:00" ? 
                      `at ${speedOption === SpeechSpeed.CUSTOM ? customWpm : SPEECH_SPEED_WPM[speedOption]} words per minute` : 
                      "No text to estimate"
                    }
                  </div>
                </div>
              )}

              <div className="flex justify-end mb-4">
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

              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="text-sm font-semibold mb-2">Text Statistics</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Words:</span>
                    <span>{wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Characters (with spaces):</span>
                    <span>{charCountWithSpaces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Characters (without spaces):</span>
                    <span>{charCountWithoutSpaces}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
