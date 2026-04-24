import { useState } from "react";
import Link from "next/link";
import { BOTS } from "@/lib/data";
import Header from "@/app/components/header";

export default function BotsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Mobile", "Arm", "Specialized", "Experimental"];

  const filteredBots = BOTS.filter(bot => {
    const matchesQuery = bot.label.toLowerCase().includes(query.toLowerCase()) || 
                        bot.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || bot.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-12 py-8 flex flex-col gap-10">

        <div className="animate-fade-in-up flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Robotics Suite</h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
              End-to-end bot guides and real-time troubleshooting protocols for current robotics lab systems.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <div className="flex flex-wrap gap-2 justify-end">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border transition-all ${
                    activeCategory === cat 
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" 
                      : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
              <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter masterclasses..."
                className="w-full input-polished !py-2 !px-8 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-100">
          {filteredBots.map((bot, i) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className={`card-elevated flex flex-col gap-4 p-6 sm:p-8 rounded-2xl group transition-all duration-300 animate-fade-in-up border border-indigo-50 dark:border-gray-800`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                    {bot.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-md border ${
                      bot.difficulty === "Beginner" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      bot.difficulty === "Intermediate" ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {bot.difficulty}
                    </span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">
                      {bot.category}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{bot.label}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">{bot.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                    {bot.learnSections.length} Protocols
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-tighter">
                    <span className="text-indigo-500">⏱</span> {bot.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center gap-1 group/btn">
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                    Deploy Lab
                  </span>
                  <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
