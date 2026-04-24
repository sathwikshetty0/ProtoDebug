"use client";

import { useState, useEffect } from "react";

export default function ShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const shortcuts = [
    { key: "⌘K", desc: "Open Command Palette" },
    { key: "?", desc: "Show Keyboard Shortcuts" },
    { key: "ESC", desc: "Close Modal / AI Assistant" },
    { key: "↑/↓", desc: "Navigate Results" },
    { key: "Enter", desc: "Select Active Result" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden animate-scale-up">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">×</button>
        </div>
        <div className="p-8 flex flex-col gap-4">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-[10px] font-black font-mono border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 min-w-[32px] text-center shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <div className="px-8 py-4 bg-gray-50/50 dark:bg-black/20 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tap anywhere to dismiss</p>
        </div>
      </div>
    </div>
  );
}
