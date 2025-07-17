"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode } from "lucide-react";

interface QRCodeBlockProps {
  url: string;
}

export function QRCodeBlock({ url }: QRCodeBlockProps) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  console.log("QR Code URL:", url);

  return (
    <>
      {/* Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:text-gray-300"
        title="Show QR Code"
      >
        <QrCode className="w-5 h-5 text-white" />
      </button>

      {/* Modal */}
      {open && url && (
        <div className="fixed inset-0 z-50 flex items-center text-center justify-center bg-black/60">
          <div
            ref={modalRef}
            className="bg-[#0a0a0a] p-6 rounded-lg shadow-lg w-[300px] relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-1 p-1"
            >
              <X className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Your share was created.
            </h2>
            <div className="flex items-center justify-center rounded-lg">
              <QRCodeCanvas value={url} size={200} />
            </div>
            <p className="text-sm mt-2 text-gray-300">
              Scan the QR code <br />
              -or-
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm mt-2 text-white hover:text-gray-300 hover:underline break-words"
            >
              {url}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
