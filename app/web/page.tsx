"use client";

import { useState } from "react";
import { WEB_DOMAINS, searchWebProblems, type WebDomain, type Problem } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold shrink-0 mt-0.5">
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
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-lg font-bold text-gray-900">Web Development</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Choose your tech stack and describe the issue.
          </p>
        </div>

        {/* Step 1: Domain */}
        <section className="bg-white border border-gray-200 rounded-xl p-5">
          <StepLabel n={1} text="Choose your technology" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {WEB_DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => pickDomain(d)}
                className={`flex flex-col items-center gap-1.5 px-3 py-4 rounded-lg border text-center transition-all ${
                  selectedDomain?.id === d.id
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50"
                }`}
              >
                <span className="text-2xl leading-none">{d.icon}</span>
                <span className="text-sm font-semibold">{d.label}</span>
                <span className="text-[11px] text-gray-400 leading-tight">{d.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Search */}
        {selectedDomain && (
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <StepLabel n={2} text={`${selectedDomain.icon} ${selectedDomain.label} — what's the issue?`} />
            <div className="flex flex-wrap gap-1.5 mt-4">
              {selectedDomain.quickFills.map((q) => (
                <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                  {q}
                </button>
              ))}
            </div>
            <form onSubmit={handleSearch} className="flex gap-2 mt-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={selectedDomain.reactivePlaceholder}
                className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
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
          <p className="text-center text-sm text-gray-400 py-4">
            Select a technology above to get started.
          </p>
        )}
      </main>

      <style jsx global>{`
        .quick-chip {
          padding: 2px 10px;
          font-size: 11px;
          border-radius: 9999px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #4b5563;
          transition: all 0.15s;
          cursor: pointer;
        }
        .quick-chip:hover {
          border-color: #a5b4fc;
          background: #eef2ff;
          color: #4338ca;
        }
      `}</style>
    </div>
  );
}
