"use client";

import { ClipboardCopy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className="text-sm text-white px-3 py-1 rounded hover:text-gray-300"
      onClick={handleCopy}
    >
      {copied ? "Copied!" : <ClipboardCopy size={16} />}
    </button>
  );
}
