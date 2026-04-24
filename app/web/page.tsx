"use client";

import { useState } from "react";
import { WEB_DOMAINS, searchWebProblems, type WebDomain, type Problem } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";
import AiAssistant from "@/app/components/ai-assistant";
import Breadcrumbs from "@/app/components/breadcrumbs";

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 shadow-sm shadow-indigo-200">
        {n}
      </span>
      <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{text}</p>
    </div>
  );
}

export default function WebPage() {
  const [selectedDomain, setSelectedDomain] = useState<WebDomain | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Problem[]>([]);
  const [searched, setSearched] = useState(false);
  const [isAiActive, setIsAiActive] = useState(false);

  function pickDomain(d: WebDomain) {
    const next = selectedDomain?.id === d.id ? null : d;
    setSelectedDomain(next);
    setQuery("");
    if (next) {
      setResults(searchWebProblems(next, ""));
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDomain) return;
    setResults(searchWebProblems(selectedDomain, query));
    setSearched(true);
  }

  function applyFill(text: string) {
    setQuery(text);
    if (!selectedDomain) return;
    setResults(searchWebProblems(selectedDomain, text));
    setSearched(true);
  }

  const contextStr = selectedDomain ? `Web Application - ${selectedDomain.label}` : "Web Development";

  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-12 py-8 flex flex-col gap-8">
        <Breadcrumbs />
        <div className="animate-fade-in-up flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Web Application Lab</h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
            Choose your stack and describe the stack-overflow-level bugs you're witnessing.
          </p>
        </div>

        {/* AI FAB Toggle */}
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-6">
          {isAiActive && (
            <div className="animate-scale-up origin-bottom-right">
              <AiAssistant 
                context={contextStr} 
                initialIssue={query}
                onClose={() => setIsAiActive(false)}
              />
            </div>
          )}
          <button 
            onClick={() => setIsAiActive(!isAiActive)}
            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 hover:scale-110 active:scale-95 ${
              isAiActive 
                ? "bg-white text-gray-800 rotate-90" 
                : "bg-indigo-600 text-white hover:rotate-12"
            }`}
          >
            {isAiActive ? "×" : "🧠"}
          </button>
        </div>

        {/* Step 1: Domain */}
        <section className="section-card rounded-2xl p-6 sm:p-8 animate-fade-in-up delay-100 border border-indigo-50 dark:border-gray-800">
          <StepLabel n={1} text="Choose technology stack" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
            {WEB_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDomain(d)}
                className={`flex flex-col items-center gap-2 px-4 py-6 rounded-xl border text-center transition-all duration-300 group ${
                  selectedDomain?.id === d.id
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-md"
                    : "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:border-indigo-300 hover:bg-white dark:hover:bg-gray-800"
                }`}
              >
                <span className="text-4xl transition-transform group-hover:scale-110">{d.icon}</span>
                <span className="text-sm font-semibold leading-tight">{d.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Search */}
        {selectedDomain && (
          <section className="section-card rounded-2xl p-6 sm:p-8 animate-scale-up border border-indigo-50 dark:border-gray-800">
            <StepLabel n={2} text={`${selectedDomain.icon} What is currently failing?`} />
            <div className="flex flex-wrap gap-2 mt-6">
              {selectedDomain.quickFills.map((q) => (
                <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-3 mt-6">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={selectedDomain.reactivePlaceholder}
                className="flex-1 input-polished min-w-0"
              />
              <button
                type="submit"
                className="btn-primary shrink-0"
              >
                Search Stack
              </button>
            </form>
          </section>
        )}

        {/* Results */}
        {searched && selectedDomain && (
          <div className="flex flex-col gap-6">
            <ResultsList results={results} label={selectedDomain.label} />

            {/* AI Call to Action */}
            <div className="section-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in-up border border-indigo-100 dark:border-indigo-900 bg-indigo-50/30 dark:bg-indigo-900/10">
              <div className="flex flex-col gap-2 text-center sm:text-left">
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Stuck on a tricky bug?</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  Launch the AI Debugger to analyze your {selectedDomain.label} stack and find a solution in seconds.
                </p>
              </div>
              <button 
                onClick={() => setIsAiActive(true)}
                className="btn-primary text-sm shrink-0 flex items-center gap-2 group shadow-sm"
              >
                <span className="text-base">🧠</span> Ask AI Debugger
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
