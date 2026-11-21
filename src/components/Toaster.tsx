"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";
import { TOAST_EVENT } from "./toast";

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 5000);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 md:bottom-8">
      {message && (
        <div className="animate-rise pointer-events-auto flex max-w-md items-start gap-3 rounded-xl bg-ink px-4 py-3.5 text-sm text-white shadow-2xl">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-yellow" aria-hidden="true" />
          <p className="leading-snug">{message}</p>
          <button onClick={() => setMessage(null)} className="-mr-1 shrink-0 rounded p-0.5 text-white/60 hover:text-white" aria-label="Bağla">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
