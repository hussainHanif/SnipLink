"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { QrCode, X } from "lucide-react";

interface QRCodeBlockProps {
  url: string;
}

export function QRCodeBlock({ url }: QRCodeBlockProps) {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalSize, setModalSize] = useState({ width: 320, qrSize: 200 });
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    
    const updateModalSize = () => {
      const width = window.innerWidth;
      if (width < 360) {
        setModalSize({ width: width - 40, qrSize: 160 });
      } else if (width < 640) {
        setModalSize({ width: 280, qrSize: 180 });
      } else {
        setModalSize({ width: 320, qrSize: 200 });
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
      updateModalSize();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    }
    
    window.addEventListener('resize', updateModalSize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
      window.removeEventListener('resize', updateModalSize);
    };
  }, [open]);

  const handleShareClick = () => {
    setOpen(true);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShareClick}
        className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-3 py-1.5 xs:py-2 rounded-md bg-[var(--secondary)] hover:bg-opacity-80 text-[var(--foreground)] transition-all"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Share code"
      >
        <QrCode size={14} className="min-w-[14px]" />
        <span className="text-xs xs:text-sm font-medium hidden xs:inline">Share</span>
      </button>
      
      {showTooltip && (
        <div className="absolute -bottom-8 xs:-bottom-10 left-0 bg-[var(--foreground)] text-[var(--background)] text-[10px] xs:text-xs py-1 px-2 rounded opacity-90 whitespace-nowrap z-10">
          Share code
        </div>
      )}

      {/* Modal */}
      {open && url && (
        <div className="fixed inset-0 z-50 flex items-center text-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="bg-[var(--card)] p-4 xs:p-5 sm:p-6 rounded-lg shadow-xl relative border border-[var(--border)] flex flex-col items-center"
            style={{ width: modalSize.width }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <h2 className="text-lg xs:text-xl font-bold mb-1 xs:mb-2 text-center">
              Share Your Code
            </h2>
            <p className="text-xs xs:text-sm opacity-60 mb-4 xs:mb-6 text-center">
              Scan the QR code or copy the link
            </p>
            
            <div className="bg-white p-3 sm:p-4 rounded-lg mb-3 xs:mb-4 mx-auto flex justify-center" style={{ maxWidth: modalSize.qrSize + 24 }}>
              <QRCodeCanvas
                value={url}
                size={modalSize.qrSize}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={false}
              />
            </div>
            
            <div className="relative mb-2 w-full">
              <input
                type="text"
                value={url}
                readOnly
                className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-[var(--secondary)] rounded text-xs xs:text-sm text-[var(--foreground)] border border-[var(--border)] focus:outline-none text-center"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                }}
                className="absolute right-1 xs:right-2 top-1/2 transform -translate-y-1/2 text-[10px] xs:text-xs bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-1.5 xs:px-2 py-0.5 xs:py-1 rounded text-[var(--card)] transition-colors"
              >
                Copy
              </button>
            </div>
            
            <p className="text-[10px] xs:text-xs opacity-60 mt-2 xs:mt-4 text-center">
              Anyone with this link can access your code snippet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
