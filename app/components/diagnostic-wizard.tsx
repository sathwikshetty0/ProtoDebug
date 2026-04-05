"use client";

import { useState } from "react";
import { DiagnosticTree, DiagnosticNode } from "@/lib/data";

interface Props {
  tree: DiagnosticTree;
  onClose: () => void;
}

export default function DiagnosticWizard({ tree, onClose }: Props) {
  const [currentNodeId, setCurrentNodeId] = useState(tree.startNodeId);
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<{ title: string; fix: string; code?: { lang: string; snippet: string } } | null>(null);

  const currentNode = tree.nodes.find((n) => n.id === currentNodeId);

  const handleOptionClick = (option: any) => {
    if (option.result) {
      setResult(option.result);
    } else if (option.nextId) {
      setHistory([...history, currentNodeId]);
      setCurrentNodeId(option.nextId);
    }
  };

  const handleBack = () => {
    if (result) {
      setResult(null);
      return;
    }
    const prev = history.pop();
    if (prev) {
      setCurrentNodeId(prev);
      setHistory([...history]);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md animate-fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border border-indigo-100 dark:border-gray-800 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{tree.icon}</span>
            <div>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">Diagnostic Wizard</p>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic">{tree.label}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-2xl leading-none">×</button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {result ? (
            <div className="animate-fade-in flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Protocol Identified</span>
                <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-tight underline decoration-emerald-500 decoration-4 underline-offset-4">{result.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed mt-2">{result.fix}</p>
              </div>

              {result.code && (
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="code-block-header !bg-gray-900">
                    <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">{result.code.lang}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Solution Snippet</span>
                  </div>
                  <pre className="code-block-body !bg-black text-[12px]">
                    {result.code.snippet}
                  </pre>
                </div>
              )}
              
              <button 
                onClick={onClose}
                className="btn-primary !py-4 uppercase tracking-[0.2em] text-[10px] font-black mt-4 shadow-xl shadow-indigo-100 dark:shadow-none"
              >
                Close Protocol
              </button>
            </div>
          ) : currentNode ? (
            <div className="animate-fade-in flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                 <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Question {history.length + 1}</p>
                 <p className="text-xl font-black text-gray-900 dark:text-white leading-snug">{currentNode.question}</p>
              </div>

              <div className="flex flex-col gap-3">
                {currentNode.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="w-full text-left p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-300 group flex items-center justify-between"
                  >
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{opt.label}</span>
                    <span className="text-gray-300 group-hover:text-indigo-500 transition-colors">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer / Navigation */}
        {!result && history.length > 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/20 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={handleBack}
              className="text-[10px] font-black text-gray-400 hover:text-indigo-500 uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              ← Previous Step
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
