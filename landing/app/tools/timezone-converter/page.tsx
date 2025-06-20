import React from "react";
import { TimezoneConverter } from "./TimezoneConverter";

export default function TimezonePage() {
  return <TimezoneConverter />;
}

export const metadata = {
  title: "Timezone Converter",
  description:
    "Convert time between different timezones around the world. Easy-to-use timezone converter with popular cities and real-time conversion.",
};
