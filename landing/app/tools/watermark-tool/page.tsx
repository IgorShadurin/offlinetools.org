import { Metadata } from "next";
import WatermarkTool from "./WatermarkTool";

export const metadata: Metadata = {
  title: "Watermark",
  description:
    "Add watermarks to your images with customizable positioning and batch processing support. Client-side processing ensures your images stay private.",
  keywords: ["watermark", "image watermark", "batch watermark", "photo watermark", "image processing", "offline tool"],
  openGraph: {
    title: "Watermark Tool - Add Watermarks to Images",
    description:
      "Add watermarks to your images with customizable positioning and batch processing support. Client-side processing ensures your images stay private.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark Tool - Add Watermarks to Images",
    description:
      "Add watermarks to your images with customizable positioning and batch processing support. Client-side processing ensures your images stay private.",
  },
};

export default function WatermarkToolPage() {
  return <WatermarkTool />;
}
