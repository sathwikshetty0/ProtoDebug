"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 group shadow-sm active:scale-95"
      aria-label="Toggle Theme"
      id="theme-toggle"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        <div className={`absolute inset-0 transition-transform duration-500 flex items-center justify-center ${theme === 'dark' ? '-translate-y-full' : 'translate-y-0'}`}>
          <span className="text-xl">☀️</span>
        </div>
        <div className={`absolute inset-0 transition-transform duration-500 flex items-center justify-center ${theme === 'dark' ? 'translate-y-0' : 'translate-y-full'}`}>
          <span className="text-xl">🌙</span>
        </div>
      </div>
    </button>
  );
}
