const SpeechLengthEstimatorExplanation = () => {
  return (
    <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">About Speech Length Estimator</h2>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Tool Capabilities</h3>
        <p>
          The Speech Length Estimator calculates how long it would take to speak a piece of text aloud. It provides an
          estimate based on the number of words and optional punctuation pauses, with adjustable speaking rates.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Calculate speech duration from any text input</li>
          <li>Choose from preset speaking speeds (Slow, Normal, Fast)</li>
          <li>Set custom words-per-minute rate for personalized estimates</li>
          <li>Option to include pauses for punctuation marks</li>
          <li>View complementary text statistics (word count, character count)</li>
          <li>Format time results in minutes:seconds or hours:minutes:seconds</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Common Use Cases</h3>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Speech Preparation</strong>
            <p>
              Estimate how long your speech or presentation will take to deliver, helping you prepare properly for
              time-limited speaking opportunities.
            </p>
          </li>
          <li>
            <strong>Content Creation</strong>
            <p>
              Determine the length of scripts for videos, podcasts, or other audio content to meet specific duration
              requirements.
            </p>
          </li>
          <li>
            <strong>Academic Presentations</strong>
            <p>
              Check if your academic paper or presentation fits within allocated time slots for conferences or classroom
              presentations.
            </p>
          </li>
          <li>
            <strong>Voice-over Planning</strong>
            <p>Plan voice-over recording sessions by knowing in advance how long each script will take to read.</p>
          </li>
          <li>
            <strong>Public Speaking Practice</strong>
            <p>
              Compare your actual speaking time against the estimated time to determine if you're speaking at an
              appropriate pace.
            </p>
          </li>
          <li>
            <strong>Meeting Preparation</strong>
            <p>Prepare talking points that fit within specific time allocations for meetings or interviews.</p>
          </li>
          <li>
            <strong>Educational Resources</strong>
            <p>Create lecture notes or teaching materials with predictable speaking durations.</p>
          </li>
        </ol>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Technical Details</h3>
        <p>The Speech Length Estimator uses the following approach to calculate speaking time:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Counts words by splitting text on whitespace</li>
          <li>Divides the word count by the words-per-minute (WPM) rate</li>
          <li>Optionally adds time for punctuation pauses (e.g., longer pauses for periods, shorter for commas)</li>
          <li>
            The default speaking rates are based on research of average reading speeds:
            <ul className="list-disc pl-6 mt-1">
              <li>Slow: 110 WPM (suitable for careful explanations or technical content)</li>
              <li>Normal: 130 WPM (average conversational speaking pace)</li>
              <li>Fast: 160 WPM (quicker than average, but still clearly understandable)</li>
            </ul>
          </li>
          <li>
            The calculation assumes English language text (other languages may have different natural speaking rates)
          </li>
        </ul>
        <p className="mt-3">
          All processing is done entirely in your browser - no text is sent to any server, ensuring privacy for
          sensitive content.
        </p>
      </div>
    </div>
  );
};

export default SpeechLengthEstimatorExplanation;
