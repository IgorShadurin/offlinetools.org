import SpeechLengthEstimator from "./SpeechLengthEstimator";

export const metadata = {
  title: "Speech Length Estimator",
  description: "Calculate how long it will take to speak a text with adjustable speed settings.",
};

export default function SpeechLengthEstimatorPage() {
  return <SpeechLengthEstimator />;
}
