import UrlEncoder from "./UrlEncoder"

export const metadata = {
  title: "URL Encoder/Decoder",
  description: "Encode text for use in URLs or decode URL-encoded text. Supports both modern and legacy encoding methods.",
}

export default function UrlEncoderPage() {
  return <UrlEncoder />
} 