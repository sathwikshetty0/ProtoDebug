"use client";

import { useState } from "react";
import { WEB_DOMAINS, searchWebProblems, type WebDomain, type Problem } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-[10px] font-bold shrink-0 shadow-xs shadow-indigo-200">
        {n}
      </span>
      <p className="text-xs font-bold text-gray-900">{text}</p>
    </div>
  );
}

export default function WebPage() {
  const [selectedDomain, setSelectedDomain] = useState<WebDomain | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Problem[]>([]);
  const [searched, setSearched] = useState(false);

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

  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5">

        <div className="animate-fade-in-up">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-none">Web Development</h1>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            Choose your tech stack and describe the issue.
          </p>
        </div>

        {/* Step 1: Domain */}
        <section className="section-card rounded-2xl p-4 sm:p-5 animate-fade-in-up delay-100">
          <StepLabel n={1} text="Choose technology" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
            {WEB_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDomain(d)}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border text-center transition-all duration-200 touch-manipulation ${
                  selectedDomain?.id === d.id
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100 scale-105"
                    : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50 active:bg-indigo-50 hover:shadow-xs"
                }`}
              >
                <span className="text-2xl leading-none">{d.icon}</span>
                <span className="text-[11px] font-bold leading-tight">{d.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Search */}
        {selectedDomain && (
          <section className="section-card rounded-2xl p-4 sm:p-5 animate-scale-up">
            <StepLabel n={2} text={`${selectedDomain.icon} What's the issue?`} />
            <div className="flex flex-wrap gap-1.5 mt-4">
              {selectedDomain.quickFills.map((q) => (
                <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-2.5 mt-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={selectedDomain.reactivePlaceholder}
                className="flex-1 input-polished min-w-0 !py-2"
              />
              <button
                type="submit"
                className="btn-primary !py-2 !px-5 shrink-0"
              >
                Search
              </button>
            </form>
          </section>
        )}

        {/* Results */}
        {searched && selectedDomain && (
          <ResultsList results={results} label={selectedDomain.label} />
        )}
      </main>
    </div>
  );
}
