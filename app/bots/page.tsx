import Link from "next/link";
import { BOTS } from "@/lib/data";
import Header from "@/app/components/header";

export default function BotsPage() {
  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-8">

        <div className="animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Robotics / Bots</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Each bot has a step-by-step build guide and a debugging section.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up delay-100">
          {BOTS.map((bot, i) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className={`card-elevated flex flex-col gap-4 p-6 rounded-2xl group transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {bot.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                  {bot.label}
                </p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">
                  {bot.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
                <span className="text-[11px] text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {bot.learnSections.length} lessons
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-indigo-500 font-bold group-hover:text-indigo-700 transition-colors">
                    Build now
                  </span>
                  <svg className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
