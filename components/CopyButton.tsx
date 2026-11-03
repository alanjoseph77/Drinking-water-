"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copybtn"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1300);
          },
          () => {}
        );
      }}
      aria-label={`Copy ${value}`}
    >
      {copied ? "Copied" : value}
    </button>
  );
}
