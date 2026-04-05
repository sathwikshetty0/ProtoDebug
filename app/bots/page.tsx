import Link from "next/link";
import { BOTS } from "@/lib/data";
import Header from "@/app/components/header";

export default function BotsPage() {
  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-12 py-8 flex flex-col gap-10">

        <div className="animate-fade-in-up flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Robotics Suite</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl">
            End-to-end bot guides and real-time troubleshooting protocols for current robotics lab systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-100">
          {BOTS.map((bot, i) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className={`card-elevated flex flex-col gap-4 p-6 sm:p-8 rounded-2xl group transition-all duration-300 animate-fade-in-up border border-indigo-50 dark:border-gray-800`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300 shadow-sm">
                {bot.icon}
              </div>
              <div className="flex-1 mt-2">
                <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {bot.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed line-clamp-3">
                  {bot.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800 mt-2">
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                  {bot.learnSections.length} Protocols
                </span>
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
