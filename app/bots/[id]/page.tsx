"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BOTS, searchBotProblems, type Bot, type LearnSection } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

type Tab = "learn" | "debug";

const DIFFICULTY_COLOR: Record<Bot["difficulty"], string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

// ── Learn section card ────────────────────────────────────────────────────────

function LearnCard({ section, index }: { section: LearnSection; index: number }) {
  const [open, setOpen] = useState(index === 0); // first section open by default
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold shrink-0">
            {index + 1}
          </span>
          <p className="text-sm font-semibold text-gray-900">{section.title}</p>
        </div>
        <span className="text-gray-300 text-xs shrink-0">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            {section.body.split("\n").map((line, i) =>
              line.trim() === "" ? (
                <div key={i} className="h-2" />
              ) : (
                <p key={i} className="text-sm text-gray-700 leading-relaxed">
                  {line}
                </p>
              )
            )}
          </div>
          {section.code && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-4 py-1.5 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">{section.code.lang}</span>
                <span className="text-[10px] text-gray-500">code example</span>
              </div>
              <pre className="bg-gray-900 px-4 py-3 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {section.code.snippet}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

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
        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/bots" className="hover:text-indigo-500 transition-colors">Bots</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{bot.label}</span>
        </div>

        {/* Bot header */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4">
          <span className="text-4xl leading-none shrink-0">{bot.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-gray-900">{bot.label}</h1>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[bot.difficulty]}`}
              >
                {bot.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{bot.description}</p>
            <div className="mt-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Typical hardware
              </p>
              <div className="flex flex-wrap gap-1.5">
                {bot.hardware.map((h) => (
                  <span
                    key={h}
                    className="px-2 py-0.5 text-[11px] bg-gray-100 text-gray-600 rounded-full font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab("learn")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              tab === "learn"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Learn to Build
          </button>
          <button
            onClick={() => setTab("debug")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              tab === "debug"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Debug Issues
          </button>
        </div>

        {/* ── Learn tab ──────────────────────────────────────────────────── */}
        {tab === "learn" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400 font-medium">
              {bot.learnSections.length} sections · click to expand
            </p>
            {bot.learnSections.map((section, i) => (
              <LearnCard key={section.title} section={section} index={i} />
            ))}
          </div>
        )}

        {/* ── Debug tab ──────────────────────────────────────────────────── */}
        {tab === "debug" && (
          <div className="flex flex-col gap-4">
            {/* Quick fills + search */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                What&apos;s the problem?
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
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
                  placeholder={`Describe the issue with your ${bot.label}...`}
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

            {searched && <ResultsList results={results} label={bot.label} />}
          </div>
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
