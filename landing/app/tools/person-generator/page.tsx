import PersonGenerator from "./PersonGenerator";
import { Suspense } from "react";

export const metadata = {
  title: "Person Generator",
  description: "Generate realistic person data with customizable fields and formats.",
};

export default function PersonGeneratorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PersonGenerator />
    </Suspense>
  );
}
