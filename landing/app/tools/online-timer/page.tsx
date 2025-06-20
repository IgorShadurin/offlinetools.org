import type { Metadata } from "next";
import OnlineTimer from "./OnlineTimer";
import OnlineTimerExplanation from "./OnlineTimerExplanation";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Online Timer - Free Countdown Timer with Sound Notifications",
  description: "Countdown timer with preset options and sound notifications. Perfect for Pomodoro technique, cooking, studying, and productivity sessions.",
};

export default function OnlineTimerPage() {
  return (
    <>
      <OnlineTimer />
      
      <Container className="py-8 md:py-12">
        <OnlineTimerExplanation />
      </Container>
    </>
  );
}
