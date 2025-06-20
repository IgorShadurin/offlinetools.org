export default function OnlineTimerExplanation() {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About Online Timer</h2>
      
      <div className="space-y-4">
        <p className="text-lg">
          A powerful countdown timer built for productivity and focus. Perfect for Pomodoro sessions, 
          cooking, workouts, and any activity that needs precise timing.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">✨ Key Features</h3>
            <ul className="space-y-2 text-sm">
              <li>• Countdown from 1 second to 99 hours</li>
              <li>• Quick presets: 1, 10, 25, 60 minutes</li>
              <li>• Custom time input (MM:SS or HH:MM:SS)</li>
              <li>• Sound notifications with toggle controls</li>
              <li>• Start, pause, resume, and stop controls</li>
              <li>• Mobile-friendly responsive design</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">🎯 Perfect For</h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Pomodoro Technique:</strong> 25-min focus sessions</li>
              <li>• <strong>Cooking:</strong> Precise timing for recipes</li>
              <li>• <strong>Workouts:</strong> Interval training and rest periods</li>
              <li>• <strong>Study Sessions:</strong> Structured learning blocks</li>
              <li>• <strong>Meetings:</strong> Time-boxed discussions</li>
              <li>• <strong>Meditation:</strong> Mindfulness practice timing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
