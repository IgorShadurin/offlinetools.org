import { GzipCodec } from './GzipCodec';

export const metadata = {
  title: "Gzip Codec - Compress & Decompress Files",
  description: "Online Gzip tool to compress (pack) text or files into .gz format, and decompress (extract) .gz files to their original content. Fast, secure, and browser-based."
};

export default function GzipCodecPage() {
  return <GzipCodec />;
}
