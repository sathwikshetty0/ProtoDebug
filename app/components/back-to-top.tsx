"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setProgress(scrolled);
      setShow(winScroll > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 left-8 z-[60] w-12 h-12 bg-white dark:bg-zinc-900 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 border border-gray-100 dark:border-white/5 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } hover:scale-110 active:scale-95 group`}
      aria-label="Back to top"
    >
      <svg className="w-full h-full -rotate-90 absolute top-0 left-0">
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          className="text-indigo-50/50 dark:text-white/5"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="2"
          fill="transparent"
          strokeDasharray="138.23"
          strokeDashoffset={138.23 - (138.23 * progress) / 100}
          strokeLinecap="round"
          className="text-indigo-500 transition-all duration-100"
        />
      </svg>
      <span className="text-lg group-hover:-translate-y-0.5 transition-transform">↑</span>
    </button>
  );
}
