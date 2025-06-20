import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnlineTimerExplanation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">How to Use the Online Timer</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Set Your Time
              </CardTitle>
              <CardDescription>Choose a preset or enter custom time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use quick presets (1, 10, 25, 60 minutes) or manually enter time in MM:SS or HH:MM:SS format.
                Perfect for Pomodoro sessions with the 25-minute preset.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Configure Sounds
              </CardTitle>
              <CardDescription>Enable success and tick notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Toggle success sound for timer completion and optional tick sound every 10 minutes
                to stay aware of time passing during long sessions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Start and Control
              </CardTitle>
              <CardDescription>Use start, pause, resume, and stop controls</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Start your timer and use pause/resume as needed. The timer displays remaining time
                and current status with clear visual feedback.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </span>
                Stay Focused
              </CardTitle>
              <CardDescription>Monitor progress and get notified</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Watch the countdown and listen for sound notifications. When finished, you'll hear
                the success sound and see a clear completion message.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Perfect For</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-medium">Pomodoro Technique</h4>
            <p className="text-sm text-muted-foreground">
              Use the 25-minute preset for focused work sessions with 5-minute breaks between intervals.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Cooking and Baking</h4>
            <p className="text-sm text-muted-foreground">
              Set precise cooking times and get audio alerts when your food is ready.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Workouts and Exercise</h4>
            <p className="text-sm text-muted-foreground">
              Time interval training, rest periods, and workout sessions with audio cues.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Study Sessions</h4>
            <p className="text-sm text-muted-foreground">
              Structure learning with timed study blocks and regular breaks for better retention.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Tips for Best Results</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium">Pomodoro Sessions</h4>
            <p className="text-sm text-muted-foreground">
              Work for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-30 minute break.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium">Sound Notifications</h4>
            <p className="text-sm text-muted-foreground">
              Enable tick sounds for longer sessions to maintain time awareness, especially during deep focus work.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium">Custom Times</h4>
            <p className="text-sm text-muted-foreground">
              Use custom times for specific activities: 2 minutes for tea brewing, 45 minutes for lectures, or 90 minutes for deep work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
