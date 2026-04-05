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
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-none" 
                : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
            }`}>
              {isCompleted ? "✓" : index + 1}
            </span>
            <p className={`text-sm font-bold leading-snug transition-colors ${isCompleted ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
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
               className="btn-primary !py-3 !text-xs uppercase tracking-widest mt-2 self-start flex items-center gap-2 group"
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
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">
            <Link href="/bots" className="hover:text-indigo-500 transition-colors">
              Bots
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 dark:text-gray-300 font-black whitespace-nowrap">{bot.label}</span>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{progressPercent}% Mastery</span>
                <div className="w-24 h-1 bg-gray-200 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
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
        <div className="section-card rounded-2xl p-6 sm:p-8 animate-fade-in-up delay-100">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-900 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-5xl leading-none shrink-0 shadow-md shadow-indigo-100/50 dark:shadow-none">
              {bot.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic">{bot.label}</h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2 leading-relaxed font-medium">
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
                      className="px-3 py-1.5 text-[10px] bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-black border border-gray-100 dark:border-gray-700 shadow-sm uppercase tracking-tighter"
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
        <div className="flex bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl p-1.5 shadow-sm animate-fade-in-up delay-100 border border-gray-200/40 dark:border-gray-800/40">
          <button
            onClick={() => setTab("learn")}
            className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${
              tab === "learn"
                ? "bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 shadow-md shadow-indigo-100/50 dark:shadow-none scale-[1.02]"
                : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            📖 Interactive Guide
          </button>
          <button
            onClick={() => setTab("debug")}
            className={`flex-1 py-3 text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest ${
              tab === "debug"
                ? "bg-white dark:bg-gray-800 text-indigo-700 dark:text-indigo-400 shadow-md shadow-indigo-100/50 dark:shadow-none scale-[1.02]"
                : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
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
            <section className="section-card rounded-[2.5rem] p-8 sm:p-10 shadow-md shadow-indigo-50/20 animate-scale-up">
              <p className="text-sm font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight italic">
                What&apos;s currently failing?
              </p>
              <div className="flex flex-wrap gap-2 mb-8 uppercase">
                {bot.quickFills.map((q) => (
                  <button key={q} onClick={() => applyFill(q)} className="quick-chip !py-2.5 !px-5 shadow-sm">
                    {q}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`e.g. "bot oscillates on line"`}
                  className="flex-1 input-polished min-w-0 !p-5 font-black uppercase tracking-tighter"
                />
                <button
                  type="submit"
                  className="btn-primary !px-10 shrink-0 uppercase tracking-tighter shadow-lg shadow-indigo-100 dark:shadow-none"
                >
                  Search Labs
                </button>
              </form>
            </section>

            {searched && (
              <div className="flex flex-col gap-8">
                <ResultsList results={results} label={bot.label} />
                
                {/* AI Call to Action */}
                <div className="section-card rounded-[2.5rem] p-10 flex flex-col sm:flex-row items-center justify-between gap-10 animate-fade-in-up border border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-br from-indigo-50/30 to-white dark:from-indigo-950/20 dark:to-gray-900">
                  <div className="flex flex-col gap-3 text-center sm:text-left">
                    <p className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">Advanced Troubleshooting Needed?</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-sm">
                      Discuss complex {bot.label} issues with our AI brain. It has full context of your hardware stack.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsAiActive(true)}
                    className="btn-primary !px-10 !py-5 uppercase tracking-widest text-[11px] font-black shrink-0 flex items-center gap-2 group shadow-xl shadow-indigo-100/50 dark:shadow-none"
                  >
                    🧠 Ask AI Debugger
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
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
