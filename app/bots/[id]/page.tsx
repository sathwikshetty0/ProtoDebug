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
    <div className="section-card dark:bg-zinc-900/50 rounded-2xl overflow-hidden animate-scale-up border border-indigo-50/40 dark:border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-5 text-left hover:bg-gray-50/80 active:bg-gray-100/60 transition-colors duration-200 gap-4"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 text-[11px] font-bold shrink-0 shadow-sm shadow-indigo-200">
            {index + 1}
          </span>
          <p className="text-sm font-black text-black dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{section.title}</p>
        </div>
        <span className={`text-gray-400 dark:text-gray-500 text-xs shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 dark:border-white/10 px-5 sm:px-6 py-6 flex flex-col gap-5 animate-fade-in">
          <div className="flex flex-col gap-3">
            {section.body.split("\n").map((line, i) =>
              line.trim() === "" ? (
                <div key={i} className="h-2" />
              ) : (
                <p key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  {line}
                </p>
              )
            )}
          </div>
          {section.code && (
            <div className="rounded-xl overflow-hidden border border-gray-200/80 shadow-sm">
              <div className="code-block-header">
                <span className="text-[11px] text-gray-400 font-mono font-medium">
                  {section.code.lang}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">example</span>
              </div>
              <pre className="code-block-body">
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
      <div className="min-h-screen page-gradient">
        <Header />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">⚠️</span>
          </div>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Bot not found.</p>
          <Link href="/bots" className="text-xs text-indigo-500 mt-4 inline-flex items-center gap-1.5 hover:underline font-bold">
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
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest animate-fade-in-up">
          <Link href="/bots" className="hover:text-indigo-500 transition-colors">
            Bots
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-600 font-bold whitespace-nowrap">{bot.label}</span>
        </div>

        {/* Bot header card */}
        <div className="section-card dark:bg-zinc-900/50 rounded-2xl p-6 sm:p-8 animate-fade-in-up delay-100 border border-indigo-50/40 dark:border-white/5">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center text-5xl leading-none shrink-0 shadow-md shadow-indigo-100/50">
              {bot.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight leading-tight">{bot.label}</h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 mt-2 leading-relaxed font-medium">
                {bot.description}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <p className="section-label">
                  Hardware Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {bot.hardware.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-lg font-bold border border-gray-100 shadow-sm"
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
        <div className="flex bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur rounded-2xl p-1.5 shadow-sm animate-fade-in-up delay-100 border border-transparent dark:border-white/10">
          <button
            onClick={() => setTab("learn")}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-300 uppercase tracking-widest ${
              tab === "learn"
                ? "bg-white text-indigo-700 shadow-md shadow-indigo-100/50 dark:shadow-none scale-[1.02]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            📖 Step-By-Step Guide
          </button>
          <button
            onClick={() => setTab("debug")}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-300 uppercase tracking-widest ${
              tab === "debug"
                ? "bg-white text-indigo-700 shadow-md shadow-indigo-100/50 dark:shadow-none scale-[1.02]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            🐛 Troubleshooting
          </button>
        </div>

        {/* Learn tab */}
        {tab === "learn" && (
          <div className="flex flex-col gap-4">
            <p className="section-label px-1">
              {bot.learnSections.length} modules to master — tap to reveal
            </p>
            <div className="flex flex-col gap-3">
              {bot.learnSections.map((section, i) => (
                <LearnCard key={section.title} section={section} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Debug tab */}
        {tab === "debug" && (
          <div className="flex flex-col gap-5">
            <section className="section-card dark:bg-zinc-900/50 rounded-2xl p-5 sm:p-6 shadow-md shadow-indigo-50 dark:shadow-none animate-scale-up border border-indigo-50/40 dark:border-white/5">
              <p className="text-sm font-black text-black dark:text-white mb-4 uppercase tracking-tight">
                What&apos;s currently failing?
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {bot.quickFills.map((q) => (
                  <button key={q} onClick={() => applyFill(q)} className="quick-chip">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSearch} className="flex gap-2.5">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`e.g. "bot oscillates on line"`}
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

            {searched && <ResultsList results={results} label={bot.label} />}
          </div>
        )}

        {/* Bottom padding for mobile */}
        <div className="h-6" />
      </main>
    </div>
  );
}
