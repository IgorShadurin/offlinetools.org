import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -top-12 right-0 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="rounded-lg overflow-hidden">
          <Image src={src} alt={alt} width={1200} height={800} className="w-full h-auto object-contain" priority />
        </div>
      </div>
    </div>
  );
};
