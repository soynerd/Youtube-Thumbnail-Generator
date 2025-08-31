"use client";

import { useEffect } from "react";

export function ListenAuthEvent({
  onOpen,
  onMode,
}: {
  onOpen: (v: boolean) => void;
  onMode: (m: "signin" | "signup") => void;
}) {
  useEffect(() => {
    function handler(e: Event) {
      const ce = e as CustomEvent<{ mode?: "signin" | "signup" }>;
      if (ce.detail?.mode) {
        onMode(ce.detail.mode);
      }
      onOpen(true);
    }
    window.addEventListener("open-auth-modal", handler as any);
    return () => window.removeEventListener("open-auth-modal", handler as any);
  }, [onOpen, onMode]);

  return null;
}
