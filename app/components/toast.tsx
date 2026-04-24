"use client";

import { useState, useEffect } from "react";

let toastFn: (msg: string) => void = () => {};

export function useToast() {
  return {
    toast: (msg: string) => toastFn(msg)
  };
}

export default function ToastContainer() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    toastFn = (msg: string) => {
      setMessage(msg);
      setTimeout(() => setMessage(null), 3000);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-scale-up">
      <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3">
        <span className="text-indigo-400">⚡</span>
        <span className="text-sm font-bold">{message}</span>
      </div>
    </div>
  );
}
