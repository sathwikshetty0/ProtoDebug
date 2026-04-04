import Link from "next/link";
import { BOTS } from "@/lib/data";
import Header from "@/app/components/header";

export default function BotsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-xl font-bold text-gray-900">Robotics / Bots</h1>
          <p className="text-sm text-gray-400 mt-1">
            Each bot has a step-by-step build guide and a debugging section.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BOTS.map((bot) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className="flex flex-col gap-3 p-5 bg-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all group shadow-sm"
            >
              <span className="text-3xl">{bot.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                  {bot.label}
                </p>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  {bot.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-medium">
                  {bot.learnSections.length} lessons
                </span>
                <span className="text-[11px] text-indigo-500 font-semibold group-hover:text-indigo-700 transition-colors">
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
