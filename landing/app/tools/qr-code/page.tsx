import QrCode from "./QrCode";

export const metadata = {
  title: "QR Code Generator & Scanner",
  description: "Create QR codes from text or scan QR codes from images with customizable options for size, color, and error correction.",
};

export default function QrCodePage() {
  return <QrCode />;
}
