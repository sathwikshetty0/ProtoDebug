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
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm animate-scale-up group relative">
      <div className="code-block-header !bg-gray-800 dark:!bg-black px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">{lang || 'CODE'}</span>
        </div>
        <button 
          onClick={handleCopy}
          className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-lg transition-colors ${
            copied 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gray-700 dark:bg-gray-800 text-gray-300 hover:text-white'
          }`}
        >
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>
      <div className="relative">
        <pre className="code-block-body !bg-gray-900 !p-6 text-[13px] leading-relaxed selection:bg-indigo-500/30">
          {code}
        </pre>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-xs font-semibold text-white/10 uppercase tracking-widest">{code.split('\n').length} LINES</span>
        </div>
      </div>
    </div>
  );
}
