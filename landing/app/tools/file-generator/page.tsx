import FileGenerator from "./FileGenerator"
import { Suspense } from "react"

export const metadata = {
  title: "File Generator",
  description: "Generate files with specific size and format with random data, zeros, or custom patterns.",
}

export default function FileGeneratorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FileGenerator />
    </Suspense>
  )
} 