"use client";

import { ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setShowTooltip(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      
      setTimeout(() => {
        setShowTooltip(false);
      }, 2500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center gap-1 px-2 xs:px-3 py-1.5 rounded-md transition-all ${
          copied 
            ? "bg-[var(--primary)] text-[var(--card)]" 
            : "bg-[var(--secondary)] hover:bg-opacity-80 text-[var(--foreground)]"
        }`}
        onClick={handleCopy}
        onMouseEnter={() => setShowTooltip(true)} 
        onMouseLeave={() => !copied && setShowTooltip(false)}
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <>
            <Check size={14} className="min-w-[14px]" />
            <span className="text-xs xs:text-sm font-medium">Copied!</span>
          </>
        ) : (
          <>
            <ClipboardCopy size={14} className="min-w-[14px]" />
            <span className="text-xs xs:text-sm font-medium hidden xs:inline">Copy</span>
          </>
        )}
      </button>
      
      {showTooltip && !copied && (
        <div className="absolute -bottom-8 xs:-bottom-10 left-0 bg-[var(--foreground)] text-[var(--background)] text-[10px] xs:text-xs py-1 px-2 rounded opacity-90 whitespace-nowrap z-10">
          Copy to clipboard
        </div>
      )}
    </div>
  );
}
