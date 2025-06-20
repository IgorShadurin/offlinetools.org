import React, { useState, useEffect, useRef, useCallback } from "react";
import { Clock, Play, Pause, Square, Volume2, VolumeX, AlertCircle } from "lucide-react";
import { 
  TimerState, 
  TimerPreset, 
  formatTimerTime, 
  parseTimeString, 
  validateTimerTime,
  playSound,
  saveTimerOptions,
  loadTimerOptions,
  saveTimerState,
  loadTimerState,
  clearTimerState
} from "shared/online-timer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface OnlineTimerProps {
  className?: string;
}

export function OnlineTimer({ className = "" }: OnlineTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>(TimerState.STOPPED);
  const [remainingTime, setRemainingTime] = useState(TimerPreset.SIXTY_MINUTES);
  const [initialTime, setInitialTime] = useState(TimerPreset.SIXTY_MINUTES);
  const [timeInput, setTimeInput] = useState(formatTimerTime(TimerPreset.SIXTY_MINUTES));
  const [enableTickSound, setEnableTickSound] = useState(true);
  const [enableSuccessSound, setEnableSuccessSound] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const options = loadTimerOptions();
    setInitialTime(options.initialTime);
    setRemainingTime(options.initialTime);
    setTimeInput(formatTimerTime(options.initialTime));
    setEnableTickSound(options.enableTickSound);
    setEnableSuccessSound(options.enableSuccessSound);

    const savedState = loadTimerState();
    if (savedState && savedState.state !== TimerState.FINISHED) {
      setRemainingTime(savedState.remainingTime);
      setTimerState(savedState.state);
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const options = {
      initialTime,
      enableTickSound,
      enableSuccessSound
    };
    saveTimerOptions(options);
  }, [initialTime, enableTickSound, enableSuccessSound, mounted]);

  const playTickSound = useCallback(async () => {
    if (enableTickSound) {
      try {
        await playSound('/sounds/tick.mp3');
      } catch (error) {
        console.error('Failed to play tick sound:', error);
      }
    }
  }, [enableTickSound]);

  const playSuccessSound = useCallback(async () => {
    if (enableSuccessSound) {
      try {
        await playSound('/sounds/success.wav');
      } catch (error) {
        console.error('Failed to play success sound:', error);
      }
    }
  }, [enableSuccessSound]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let timeToUse: number;
    if (timerState === TimerState.PAUSED) {
      timeToUse = remainingTime;
    } else if (timerState === TimerState.FINISHED) {
      timeToUse = initialTime;
    } else {
      try {
        timeToUse = parseTimeString(timeInput);
        setInitialTime(timeToUse);
      } catch (err) {
        setError((err as Error).message);
        return;
      }
    }
    
    setRemainingTime(timeToUse);
    setTimerState(TimerState.RUNNING);
    setError(null);

    intervalRef.current = setInterval(() => {
      setRemainingTime(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setTimerState(TimerState.FINISHED);
          clearTimerState();
          playSuccessSound();
          return 0;
        }

        if (enableTickSound && newTime > 0 && newTime % 600 === 0) {
          playTickSound();
        }

        saveTimerState(newTime, TimerState.RUNNING);
        return newTime;
      });
    }, 1000);
  }, [enableTickSound, playTickSound, playSuccessSound, timerState, remainingTime, initialTime, timeInput]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(TimerState.PAUSED);
    saveTimerState(remainingTime, TimerState.PAUSED);
  }, [remainingTime]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(TimerState.STOPPED);
    setRemainingTime(initialTime);
    setTimeInput(formatTimerTime(initialTime));
    clearTimerState();
    setError(null);
  }, [initialTime]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electron?.ipcRenderer) {
      const handleClearTimerState = () => {
        clearTimerState();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setTimerState(TimerState.STOPPED);
        setRemainingTime(TimerPreset.SIXTY_MINUTES);
        setTimeInput(formatTimerTime(TimerPreset.SIXTY_MINUTES));
        setError(null);
      };

      const removeListener = window.electron.ipcRenderer.on('clear-timer-state-on-exit', handleClearTimerState);
      
      return () => {
        removeListener?.();
      };
    }
  }, []);

  const handlePresetClick = (preset: TimerPreset) => {
    if (timerState === TimerState.RUNNING || timerState === TimerState.PAUSED) {
      return;
    }
    
    setInitialTime(preset);
    setRemainingTime(preset);
    setTimeInput(formatTimerTime(preset));
    setError(null);
  };

  const handleTimeInputChange = (value: string) => {
    setTimeInput(value);
    
    if (timerState === TimerState.RUNNING || timerState === TimerState.PAUSED) {
      return;
    }

    try {
      const seconds = parseTimeString(value);
      if (validateTimerTime(seconds)) {
        setInitialTime(seconds);
        setRemainingTime(seconds);
        setError(null);
      } else {
        setError('Time must be between 1 second and 99 hours');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleTimeInputBlur = () => {
    if (timerState === TimerState.RUNNING || timerState === TimerState.PAUSED) {
      return;
    }

    try {
      const seconds = parseTimeString(timeInput);
      if (validateTimerTime(seconds)) {
        setTimeInput(formatTimerTime(seconds));
        setError(null);
      } else {
        setTimeInput(formatTimerTime(initialTime));
        setError('Time must be between 1 second and 99 hours');
      }
    } catch (err) {
      setTimeInput(formatTimerTime(initialTime));
      setError((err as Error).message);
    }
  };

  const getTimerDisplay = () => {
    return timeInput;
  };

  const getTimerColor = () => {
    if (timerState === TimerState.FINISHED) return 'text-green-600';
    if (timerState === TimerState.RUNNING) return 'text-blue-600';
    if (timerState === TimerState.PAUSED) return 'text-yellow-600';
    return 'text-foreground';
  };

  const isTimerActive = timerState === TimerState.RUNNING || timerState === TimerState.PAUSED;

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Timer</h1>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="space-y-4">
            <label className="text-sm font-medium">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => handlePresetClick(TimerPreset.ONE_MINUTE)}
                disabled={isTimerActive}
                className="h-12"
              >
                1 min
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePresetClick(TimerPreset.TEN_MINUTES)}
                disabled={isTimerActive}
                className="h-12"
              >
                10 min
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePresetClick(TimerPreset.TWENTY_FIVE_MINUTES)}
                disabled={isTimerActive}
                className="h-12"
              >
                25 min
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePresetClick(TimerPreset.SIXTY_MINUTES)}
                disabled={isTimerActive}
                className="h-12"
              >
                60 min
              </Button>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <label htmlFor="time-input" className="text-sm font-medium">Custom Time (MM:SS or HH:MM:SS)</label>
            <Input
              id="time-input"
              value={getTimerDisplay()}
              onChange={(e) => handleTimeInputChange(e.target.value)}
              onBlur={handleTimeInputBlur}
              disabled={isTimerActive}
              className="font-mono text-lg text-center"
              placeholder="25:00"
            />
          </div>

          <div className="space-y-4 mt-6">
            <label className="text-sm font-medium">Sound Options</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="success-sound"
                  checked={enableSuccessSound}
                  onChange={(e) => setEnableSuccessSound(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="success-sound" className="cursor-pointer flex items-center text-sm">
                  {enableSuccessSound ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                  Play success sound when timer finishes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="tick-sound"
                  checked={enableTickSound}
                  onChange={(e) => setEnableTickSound(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="tick-sound" className="cursor-pointer flex items-center text-sm">
                  {enableTickSound ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                  Play tick sound every 10 minutes
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-8 text-center">
              <div className={`text-6xl font-mono font-bold ${getTimerColor()}`}>
                {mounted ? (
                  timerState === TimerState.RUNNING || timerState === TimerState.PAUSED 
                    ? formatTimerTime(remainingTime)
                    : timeInput
                ) : '--:--'}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {timerState === TimerState.FINISHED && 'Timer finished!'}
                {timerState === TimerState.RUNNING && 'Timer running...'}
                {timerState === TimerState.PAUSED && 'Timer paused'}
                {timerState === TimerState.STOPPED && 'Timer ready'}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              {timerState === TimerState.STOPPED && (
                <Button
                  onClick={startTimer}
                  disabled={!mounted || remainingTime <= 0 || !!error}
                  className="flex-1 h-12"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
              )}

              {timerState === TimerState.RUNNING && (
                <Button
                  onClick={pauseTimer}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              )}

              {timerState === TimerState.PAUSED && (
                <Button
                  onClick={startTimer}
                  className="flex-1 h-12"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              )}

              {(timerState === TimerState.RUNNING || timerState === TimerState.PAUSED) && (
                <Button
                  onClick={stopTimer}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              )}

              {timerState === TimerState.FINISHED && (
                <Button
                  onClick={startTimer}
                  className="flex-1 h-12"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
              )}
            </div>

            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Timer Info
              </h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Initial time:</span>
                  <span className="font-mono">{formatTimerTime(initialTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-mono">{formatTimerTime(remainingTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="capitalize">{timerState}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
