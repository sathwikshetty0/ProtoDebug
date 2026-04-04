import Link from "next/link";
import { BOTS, type Bot } from "@/lib/data";
import Header from "@/app/components/header";

const DIFFICULTY_COLOR: Record<Bot["difficulty"], string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function BotsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-lg font-bold text-gray-900">Robotics / Bots</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Each bot has a step-by-step build guide and a debugging section.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BOTS.map((bot) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className="flex flex-col gap-3 p-5 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{bot.icon}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[bot.difficulty]}`}
                >
                  {bot.difficulty}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                  {bot.label}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {bot.description}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">
                  {bot.learnSections.length} learn sections
                </span>
                <span className="text-gray-200">·</span>
                <span className="text-[11px] text-indigo-500 font-medium group-hover:underline">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
