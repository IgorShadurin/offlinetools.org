import { Metadata } from "next";
import SteganographyTool from "./SteganographyTool";

export const metadata: Metadata = {
  title: "Steganography",
  description:
    "Hide mnemonic phrases and sensitive text within images using steganography. Supports password encryption and secure client-side processing.",
  keywords: [
    "steganography",
    "hide text in image",
    "mnemonic phrase",
    "image encryption",
    "LSB steganography",
    "offline tool",
  ],
  openGraph: {
    title: "Steganography Tool - Hide Text in Images",
    description:
      "Hide mnemonic phrases and sensitive text within images using steganography. Supports password encryption and secure client-side processing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steganography Tool - Hide Text in Images",
    description:
      "Hide mnemonic phrases and sensitive text within images using steganography. Supports password encryption and secure client-side processing.",
  },
};

export default function SteganographyToolPage() {
  return <SteganographyTool />;
}
