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
      
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-indigo-100 dark:border-gray-800 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{tree.icon}</span>
            <div>
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide leading-none mb-1">Diagnostic Wizard</p>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tree.label}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-2xl leading-none">×</button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {result ? (
            <div className="animate-fade-in flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Protocol Identified</span>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight underline decoration-emerald-500 decoration-2 underline-offset-4">{result.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed mt-2">{result.fix}</p>
              </div>

              {result.code && (
                <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="code-block-header !bg-gray-900">
                    <span className="text-xs text-gray-400 font-mono font-semibold uppercase">{result.code.lang}</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase">Solution Snippet</span>
                  </div>
                  <pre className="code-block-body !bg-black text-[13px]">
                    {result.code.snippet}
                  </pre>
                </div>
              )}
              
              <button 
                onClick={onClose}
                className="btn-primary text-sm mt-4 shadow-sm"
              >
                Close Protocol
              </button>
            </div>
          ) : currentNode ? (
            <div className="animate-fade-in flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Question {history.length + 1}</p>
                 <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-snug">{currentNode.question}</p>
              </div>

              <div className="flex flex-col gap-3">
                {currentNode.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors duration-200 group flex items-center justify-between shadow-sm"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{opt.label}</span>
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
              className="text-xs font-semibold text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              ← Previous Step
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
