"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BOTS, searchBotProblems, type LearnSection } from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";
import AiAssistant from "@/app/components/ai-assistant";
import CodeBlock from "@/app/components/code-block";

type Tab = "learn" | "debug";

function LearnCard({ 
  section, 
  index, 
  isCompleted, 
  onToggle 
}: { 
  section: LearnSection; 
  index: number; 
  isCompleted: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className={`section-card rounded-2xl overflow-hidden animate-scale-up transition-all duration-500 ${isCompleted ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-900/10' : ''}`}>
      <div className="flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-5 sm:px-6 py-5 text-left hover:bg-gray-50/80 dark:hover:bg-gray-800/80 active:bg-gray-100/60 transition-colors duration-200 gap-4"
        >
          <div className="flex items-center gap-4 min-w-0">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-bold shrink-0 transition-colors duration-500 ${
              isCompleted 
                ? "bg-emerald-500 text-white shadow-sm" 
                : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
            }`}>
              {isCompleted ? "✓" : index + 1}
            </span>
            <p className={`text-sm font-semibold leading-snug transition-colors ${isCompleted ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
              {section.title}
            </p>
          </div>
          <span className={`text-gray-400 text-xs shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`px-4 py-5 group transition-colors ${isCompleted ? 'text-emerald-500' : 'text-gray-300 hover:text-indigo-500'}`}
          title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
        >
           <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
             isCompleted 
              ? "bg-emerald-500 border-emerald-500 scale-110" 
              : "border-gray-200 dark:border-gray-700 group-hover:border-indigo-400"
           }`}>
             {isCompleted && <span className="text-white text-[10px] font-black">✓</span>}
           </div>
        </button>
      </div>

      {open && (
        <div className={`border-t border-gray-100 dark:border-gray-800 px-5 sm:px-6 py-6 flex flex-col gap-5 animate-fade-in ${isCompleted ? 'opacity-60' : ''}`}>
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
            <CodeBlock 
              code={section.code.snippet} 
              lang={section.code.lang} 
            />
          )}
          {!isCompleted && (
             <button 
               onClick={onToggle}
               className="btn-primary flex items-center gap-2 group mt-2 self-start text-sm shadow-sm"
             >
               Confirm Module Completion
               <span className="group-hover:translate-x-0.5 transition-transform">→</span>
             </button>
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
  const [isAiActive, setIsAiActive] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  // Load progress
  useEffect(() => {
    if (bot) {
      const saved = localStorage.getItem(`progress-${bot.id}`);
      if (saved) {
        setCompletedSections(new Set(JSON.parse(saved)));
      }
    }
  }, [bot]);

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

  function toggleCompletion(index: number) {
    const next = new Set(completedSections);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCompletedSections(next);
    localStorage.setItem(`progress-${bot!.id}`, JSON.stringify(Array.from(next)));
  }

  const contextStr = `Robotics Suite - ${bot.label}. Hardware: ${bot.hardware.join(", ")}`;
  const progressPercent = Math.round((completedSections.size / bot.learnSections.length) * 100);

  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/bots" className="hover:text-indigo-500 transition-colors">
              Bots
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-semibold whitespace-nowrap">{bot.label}</span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{progressPercent}% Mastery</span>
                <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
                   <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${progressPercent}%` }}
                   />
                </div>
             </div>
          </div>
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

        {/* Bot header card */}
        <div className="section-card rounded-2xl p-6 sm:p-8 animate-fade-in-up delay-100 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-4xl leading-none shrink-0 shadow-sm">
              {bot.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{bot.label}</h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                {bot.description}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <p className="section-label">
                  Hardware Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {bot.hardware.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1.5 text-xs font-semibold bg-gray-100/50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
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
        <div className="flex bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur rounded-2xl p-1 shadow-sm animate-fade-in-up delay-100 border border-gray-200/40 dark:border-gray-800/40">
          <button
            onClick={() => setTab("learn")}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-300 ${
              tab === "learn"
                ? "bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-gray-100/50 dark:border-gray-700/50"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            📖 Interactive Guide
          </button>
          <button
            onClick={() => setTab("debug")}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-300 ${
              tab === "debug"
                ? "bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-gray-100/50 dark:border-gray-700/50"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            🐛 Troubleshooting
          </button>
        </div>

        {/* Learn tab */}
        {tab === "learn" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between px-1">
              <p className="section-label">
                Mastery Pathway — {bot.learnSections.length} modules
              </p>
              <button 
                onClick={() => { setCompletedSections(new Set()); localStorage.removeItem(`progress-${bot.id}`); }}
                className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
              >
                Reset Progress
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {bot.learnSections.map((section, i) => (
                <LearnCard 
                  key={section.title} 
                  section={section} 
                  index={i} 
                  isCompleted={completedSections.has(i)}
                  onToggle={() => toggleCompletion(i)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Debug tab */}
        {tab === "debug" && (
          <div className="flex flex-col gap-5">
            <section className="section-card rounded-2xl p-6 sm:p-8 animate-scale-up border border-indigo-50 dark:border-gray-800">
              <p className="text-base font-bold text-gray-900 dark:text-white mb-6">
                What's currently failing?
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {bot.quickFills.map((q) => (
                  <button key={q} onClick={() => applyFill(q)} className="quick-chip shadow-sm">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSearch} className="flex gap-3">
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
                  Search Labs
                </button>
              </form>
            </section>

            {searched && (
              <div className="flex flex-col gap-8">
                <ResultsList results={results} label={bot.label} />
                
                {/* AI Call to Action */}
                <div className="section-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in-up border border-indigo-100 dark:border-indigo-900 bg-indigo-50/30 dark:bg-indigo-900/10">
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Advanced Troubleshooting Needed?</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                      Discuss complex {bot.label} issues with our AI brain. It has full context of your hardware stack.
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
          </div>
        )}

        {/* Bottom padding for mobile */}
        <div className="h-6" />
      </main>
    </div>
  );
}
