import type { Metadata } from "next";
import OnlineTimer from "./OnlineTimer";

export const metadata: Metadata = {
  title: "Online Timer - Free Countdown Timer with Sound Notifications",
  description: "Countdown timer with preset options, sound notifications, and localStorage persistence. Set custom times from 1 second to 99 hours.",
};

export default function OnlineTimerPage() {
  return <OnlineTimer />;
}
