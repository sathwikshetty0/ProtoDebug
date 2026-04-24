"use client";

import { useState } from "react";

interface Props {
  code: string;
  lang?: string;
}

export default function CodeBlock({ code, lang }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-indigo-50/50 dark:border-white/5 shadow-xl animate-scale-up group relative">
      <div className="code-block-header !bg-[#1e1e2e] dark:!bg-black/80 px-5 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
           <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
             <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
           </div>
           <span className="text-[10px] font-black text-indigo-300/60 uppercase tracking-[0.2em] ml-2">
             {lang === 'bash' || lang === 'shell' ? 'Terminal' : (lang || 'Snippet')}
           </span>
        </div>
        <button 
          onClick={handleCopy}
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all active:scale-95 ${
            copied 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="relative">
        <pre className="code-block-body !bg-[#1e1e2e] !p-6 sm:!p-8 text-[13px] leading-relaxed selection:bg-indigo-500/30 font-mono text-gray-300 overflow-x-auto">
          <code className="block">
            {code}
          </code>
        </pre>
        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-bold text-white/5 uppercase tracking-[0.3em] pointer-events-none">
             {code.split('\n').length} lines
           </span>
        </div>
      </div>
    </div>
  );
}
