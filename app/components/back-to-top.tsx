"use client";

export default function BackToTop() {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter hover:underline transition-all"
    >
      Back to top ↑
    </button>
  );
}
