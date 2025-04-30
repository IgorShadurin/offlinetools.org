import FileGenerator from "./FileGenerator"

export const metadata = {
  title: "File Generator",
  description: "Generate files with specific size and format with random data, zeros, or custom patterns.",
}

export default function FileGeneratorPage() {
  return <FileGenerator />
} 