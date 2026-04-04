"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BOTS, searchBotProblems, type LearnSection } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

type Tab = "learn" | "debug";

function LearnCard({ section, index }: { section: LearnSection; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold shrink-0">
            {index + 1}
          </span>
          <p className="text-sm font-semibold text-gray-900 leading-snug">{section.title}</p>
        </div>
        <span className="text-gray-400 text-[10px] shrink-0">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 sm:px-5 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {section.body.split("\n").map((line, i) =>
              line.trim() === "" ? (
                <div key={i} className="h-1.5" />
              ) : (
                <p key={i} className="text-sm text-gray-700 leading-relaxed">
                  {line}
                </p>
              )
            )}
          </div>
          {section.code && (
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-mono font-medium">
                  {section.code.lang}
                </span>
                <span className="text-[10px] text-gray-500">example</span>
              </div>
              <pre className="bg-gray-950 px-4 py-4 text-[12px] text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {section.code.snippet}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BotDetailPage() {
  const params = useParams<{ id: string }>();
  const bot = BOTS.find((b) => b.id === params.id);

  const [tab, setTab] = useState<Tab>("learn");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(() =>
    bot ? searchBotProblems(bot, "") : []
  );
  const [searched, setSearched] = useState(true);

  if (!bot) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-sm text-gray-500">Bot not found.</p>
          <Link href="/bots" className="text-xs text-indigo-500 mt-2 inline-block hover:underline">
            ← Back to bots
          </Link>
        </main>
      </div>
    );
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setResults(searchBotProblems(bot!, query));
    setSearched(true);
  }

  function applyFill(text: string) {
    setQuery(text);
    setResults(searchBotProblems(bot!, text));
    setSearched(true);
    setTab("debug");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/bots" className="hover:text-indigo-500 transition-colors font-medium">
            Bots
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-semibold">{bot.label}</span>
        </div>

        {/* Bot header card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-4xl sm:text-5xl leading-none shrink-0">{bot.icon}</span>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{bot.label}</h1>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{bot.description}</p>
              <div className="mt-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Hardware
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {bot.hardware.map((h) => (
                    <span
                      key={h}
                      className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs — full width on mobile */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setTab("learn")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              tab === "learn"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📖 Learn to Build
          </button>
          <button
            onClick={() => setTab("debug")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              tab === "debug"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            🐛 Debug Issues
          </button>
        </div>

        {/* Learn tab */}
        {tab === "learn" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400 font-semibold px-1">
              {bot.learnSections.length} sections — tap to expand
            </p>
            {bot.learnSections.map((section, i) => (
              <LearnCard key={section.title} section={section} index={i} />
            ))}
          </div>
        )}

        {/* Debug tab */}
        {tab === "debug" && (
          <div className="flex flex-col gap-4">
            <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
              <p className="text-sm font-bold text-gray-900 mb-3">
                What&apos;s the problem?
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {bot.quickFills.map((q) => (
                  <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`e.g. "bot oscillates on line"`}
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

            {searched && <ResultsList results={results} label={bot.label} />}
          </div>
        )}

        {/* Bottom padding for mobile */}
        <div className="h-4" />
      </main>
    </div>
  );
}
