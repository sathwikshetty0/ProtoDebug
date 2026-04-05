"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-black text-gray-500 rounded-xl transition-all duration-300 font-mono tracking-tight opacity-50">
        <span className="text-sm scale-110">🌓</span>
        <span className="hidden xs:inline">Theme</span>
      </div>
    );
  }

  const themes = [
    { name: "light", label: "Light", icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { name: "dark", label: "Dark", icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
    { name: "system", label: "System", icon: <Monitor className="w-3.5 h-3.5 text-slate-400" /> },
  ];

  const currentTheme = themes.find((t) => t.name === theme) || themes[2];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-black rounded-xl transition-all duration-300 font-mono tracking-tight group ${
          isOpen 
            ? "text-indigo-600 bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-white/10 shadow-sm" 
            : "text-gray-500 dark:text-gray-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-sm"
        }`}
      >
        <span className="text-sm scale-110 shrink-0">
          {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🌓"}
        </span>
        <span className="hidden xs:inline uppercase">Theme</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-36 overflow-hidden bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl border border-white dark:border-white/10 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-1.5 flex flex-col gap-1">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => {
                  setTheme(t.name);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all duration-200 ${
                  theme === t.name
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200/50 dark:shadow-none"
                    : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="shrink-0">{t.icon}</span>
                  {t.label}
                </div>
                {theme === t.name && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
