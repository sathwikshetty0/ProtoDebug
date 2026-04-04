"use client";

import { useState } from "react";
import { WEB_DOMAINS, searchWebProblems, type WebDomain, type Problem } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-[11px] font-bold shrink-0 shadow-sm shadow-indigo-200">
        {n}
      </span>
      <p className="text-sm font-bold text-gray-900">{text}</p>
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">

        <div className="animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Web Development</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Choose your tech stack and describe the issue.
          </p>
        </div>

        {/* Step 1: Domain */}
        <section className="section-card rounded-2xl p-5 sm:p-6 animate-fade-in-up delay-100">
          <StepLabel n={1} text="Choose your technology" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5">
            {WEB_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDomain(d)}
                className={`flex flex-col items-center gap-2.5 px-4 py-5 rounded-2xl border text-center transition-all duration-200 touch-manipulation ${
                  selectedDomain?.id === d.id
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100"
                    : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50 active:bg-indigo-50 hover:shadow-sm"
                }`}
              >
                <span className="text-3xl leading-none transition-transform duration-200 group-hover:scale-110">{d.icon}</span>
                <span className="text-sm font-bold leading-tight">{d.label}</span>
                <span className="text-[11px] text-gray-400 leading-tight">{d.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Search */}
        {selectedDomain && (
          <section className="section-card rounded-2xl p-5 sm:p-6 animate-scale-up">
            <StepLabel n={2} text={`${selectedDomain.icon} ${selectedDomain.label} — what's the issue?`} />
            <div className="flex flex-wrap gap-2 mt-5">
              {selectedDomain.quickFills.map((q) => (
                <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-2.5 mt-5">
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
                Search
              </button>
            </form>
          </section>
        )}

        {/* Results */}
        {searched && selectedDomain && (
          <ResultsList results={results} label={selectedDomain.label} />
        )}

        {!selectedDomain && (
          <div className="flex flex-col items-center gap-3 py-16 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
              <span className="text-3xl">🌐</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Select a technology to get started</p>
          </div>
        )}

        <div className="h-4" />
      </main>
    </div>
  );
}
