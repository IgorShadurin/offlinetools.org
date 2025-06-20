"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
} from "shared";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AlertCircle, Play, Pause, Square, Clock, Volume2, VolumeX, Link as LinkIcon } from "lucide-react";
import Link from "next/link";


export default function OnlineTimer() {
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
      setTimeInput(formatTimerTime(savedState.remainingTime));
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

    setTimerState(TimerState.RUNNING);

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
  }, [enableTickSound, playTickSound, playSuccessSound]);

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
      setTimeInput(formatTimerTime(remainingTime));
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
    if (timerState === TimerState.RUNNING || timerState === TimerState.PAUSED) {
      return formatTimerTime(remainingTime);
    }
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
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Online Timer"
          description="Countdown timer with preset options and sound notifications. Perfect for Pomodoro technique, cooking, studying, and productivity sessions."
        />

        <div className="mb-6 flex items-center">
          <LinkIcon className="mr-2 h-4 w-4" />
          <span className="mr-2 text-sm font-medium">Related tools:</span>
          <Link href="/tools/speech-length-estimator" className="text-sm text-blue-600 hover:underline mr-4">
            Speech Length Estimator
          </Link>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Quick Presets</Label>
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

              <div className="space-y-4">
                <Label htmlFor="time-input">Custom Time (MM:SS or HH:MM:SS)</Label>
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

              <div className="space-y-4">
                <Label>Sound Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="success-sound"
                      checked={enableSuccessSound}
                      onCheckedChange={setEnableSuccessSound}
                    />
                    <Label htmlFor="success-sound" className="cursor-pointer flex items-center">
                      {enableSuccessSound ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                      Play success sound when timer finishes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="tick-sound"
                      checked={enableTickSound}
                      onCheckedChange={setEnableTickSound}
                    />
                    <Label htmlFor="tick-sound" className="cursor-pointer flex items-center">
                      {enableTickSound ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                      Play tick sound every 10 minutes
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-8 text-center">
                <div className={`text-6xl font-mono font-bold ${getTimerColor()}`}>
                  {mounted ? getTimerDisplay() : '--:--'}
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

      </Container>
    </>
  );
}
