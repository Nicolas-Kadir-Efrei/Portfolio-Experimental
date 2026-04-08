"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [label, setLabel] = useState("Copier l’email");

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setLabel("Copié !");
          window.setTimeout(() => setLabel("Copier l’email"), 1400);
        } catch {
          // Fallback: still expose the email
          setLabel(email);
          window.setTimeout(() => setLabel("Copier l’email"), 2200);
        }
      }}
    >
      {label}
    </button>
  );
}

