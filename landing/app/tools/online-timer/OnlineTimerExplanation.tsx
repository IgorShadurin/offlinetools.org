export default function OnlineTimerExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About Online Timer</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tool Capabilities</h3>
        <p>
          The Online Timer is a versatile countdown timer designed for productivity, cooking, studying, and any time-based activities. 
          It offers precise timing with customizable sound notifications and persistent settings.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Countdown timer with precision to the second</li>
          <li>Quick preset buttons for common durations (1, 10, 25, 60 minutes)</li>
          <li>Manual time input supporting both MM:SS and HH:MM:SS formats</li>
          <li>Flexible time range from 1 second to 99 hours</li>
          <li>Success sound notification when timer completes</li>
          <li>Optional tick sound every 10 minutes for long timers</li>
          <li>Start, pause, resume, and stop functionality</li>
          <li>Automatic saving of preferences and timer state</li>
          <li>Visual status indicators and progress display</li>
          <li>Mobile-responsive design for all devices</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Pomodoro Technique:</strong> Use the 25-minute preset for focused work sessions, 
            with the tick sound disabled for distraction-free concentration.
          </li>
          <li>
            <strong>Cooking and Baking:</strong> Set precise cooking times with audio alerts to ensure 
            perfect results without constantly watching the clock.
          </li>
          <li>
            <strong>Exercise and Fitness:</strong> Time workout intervals, rest periods, or entire 
            exercise sessions with clear audio cues.
          </li>
          <li>
            <strong>Study Sessions:</strong> Structure learning with timed study blocks and breaks, 
            using the tick sound for longer sessions to maintain awareness.
          </li>
          <li>
            <strong>Meeting Management:</strong> Keep presentations and discussions on track with 
            visible countdown timers for time-boxed activities.
          </li>
          <li>
            <strong>Meditation and Mindfulness:</strong> Set peaceful timing for meditation sessions 
            with gentle audio notifications at completion.
          </li>
          <li>
            <strong>Gaming and Competitions:</strong> Time game rounds, challenges, or competitive 
            activities with precise countdown functionality.
          </li>
          <li>
            <strong>Productivity Sprints:</strong> Break large tasks into manageable time blocks 
            with automatic progress tracking and notifications.
          </li>
          <li>
            <strong>Teaching and Training:</strong> Manage classroom activities, exam timing, or 
            training exercises with clear visual and audio cues.
          </li>
          <li>
            <strong>Personal Reminders:</strong> Set custom reminders for daily activities, 
            medication schedules, or important tasks.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>
          The timer is built using modern web technologies with HTML5 Audio API for sound playback 
          and localStorage for persistent settings. The countdown mechanism uses JavaScript intervals 
          with automatic cleanup to prevent memory leaks.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Precise timing using JavaScript setInterval with 1-second resolution</li>
          <li>HTML5 Audio API for cross-browser sound compatibility</li>
          <li>localStorage persistence for settings and timer state across sessions</li>
          <li>Automatic state recovery when returning to the page</li>
          <li>Memory leak prevention with proper interval cleanup</li>
          <li>Input validation for time formats and ranges</li>
          <li>Responsive design using CSS Grid and Flexbox</li>
          <li>Accessibility features with proper ARIA labels and keyboard navigation</li>
          <li>Error handling for audio playback failures</li>
          <li>Cross-platform compatibility for desktop and mobile devices</li>
        </ul>
      </div>
    </div>
  );
}
