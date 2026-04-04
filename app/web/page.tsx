"use client";

import { useState } from "react";
import { WEB_DOMAINS, searchWebProblems, type WebDomain, type Problem } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold shrink-0">
        {n}
      </span>
      <p className="text-sm font-semibold text-gray-900">{text}</p>
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5">

        <div>
          <h1 className="text-xl font-bold text-gray-900">Web Development</h1>
          <p className="text-sm text-gray-400 mt-1">
            Choose your tech stack and describe the issue.
          </p>
        </div>

        {/* Step 1: Domain */}
        <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <StepLabel n={1} text="Choose your technology" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4">
            {WEB_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDomain(d)}
                className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl border text-center transition-all touch-manipulation ${
                  selectedDomain?.id === d.id
                    ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-sm"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50 active:bg-indigo-50"
                }`}
              >
                <span className="text-2xl leading-none">{d.icon}</span>
                <span className="text-sm font-bold leading-tight">{d.label}</span>
                <span className="text-[11px] text-gray-400 leading-tight">{d.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Search */}
        {selectedDomain && (
          <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
            <StepLabel n={2} text={`${selectedDomain.icon} ${selectedDomain.label} — what's the issue?`} />
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedDomain.quickFills.map((q) => (
                <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-2 mt-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={selectedDomain.reactivePlaceholder}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-0"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
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
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <span className="text-3xl">🌐</span>
            <p className="text-sm text-gray-500 font-medium">Select a technology to get started</p>
          </div>
        )}

        <div className="h-4" />
      </main>
    </div>
  );
}
