"use client";

import { useState } from "react";
import { WEB_DOMAINS, searchWebProblems, type WebDomain, type Problem } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";
import AiAssistant from "@/app/components/ai-assistant";

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-xs font-black shrink-0 shadow-sm shadow-indigo-200">
        {n}
      </span>
      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{text}</p>
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

        <div className="animate-fade-in-up flex flex-col gap-2">
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none uppercase italic">Web Application Lab</h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-2xl opacity-70">
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
        <section className="section-card rounded-[2.5rem] p-8 sm:p-10 animate-fade-in-up delay-100 border border-indigo-50/40">
          <StepLabel n={1} text="Choose technology stack" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
            {WEB_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDomain(d)}
                className={`flex flex-col items-center gap-3 px-6 py-8 rounded-[2rem] border text-center transition-all duration-300 touch-manipulation group ${
                  selectedDomain?.id === d.id
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100 scale-[1.03]"
                    : "border-gray-100 bg-gray-50/30 text-gray-700 hover:border-indigo-300 hover:bg-white active:scale-95 hover:shadow-xs"
                }`}
              >
                <span className="text-4xl leading-none transition-transform group-hover:scale-110">{d.icon}</span>
                <span className="text-sm font-black leading-tight uppercase tracking-tight">{d.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Search */}
        {selectedDomain && (
          <section className="section-card rounded-[2.5rem] p-8 sm:p-10 animate-scale-up border border-indigo-50/40">
            <StepLabel n={2} text={`${selectedDomain.icon} What is currently failing?`} />
            <div className="flex flex-wrap gap-2 mt-8">
              {selectedDomain.quickFills.map((q) => (
                <button key={q} onClick={() => applyFill(q)} className="quick-chip !py-2 !px-5 !text-xs font-black shadow-sm">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-3 mt-8">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={selectedDomain.reactivePlaceholder}
                className="flex-1 input-polished min-w-0 !py-4 !px-6 text-base font-black tracking-tight"
              />
              <button
                type="submit"
                className="btn-primary !py-4 !px-10 shrink-0 uppercase tracking-tighter"
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
            <div className="section-card rounded-[2.5rem] p-10 flex flex-col sm:flex-row items-center justify-between gap-8 animate-fade-in-up border border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-white">
              <div className="flex flex-col gap-3 text-center sm:text-left">
                <p className="text-xl font-black text-gray-900 leading-tight">Stuck on a tricky bug?</p>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                  Launch the AI Debugger to analyze your {selectedDomain.label} stack and find a solution in seconds.
                </p>
              </div>
              <button 
                onClick={() => setIsAiActive(true)}
                className="btn-primary !px-10 !py-5 uppercase tracking-widest text-[11px] font-black shrink-0 flex items-center gap-2 group shadow-xl shadow-indigo-100"
              >
                🧠 Ask AI Debugger
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
