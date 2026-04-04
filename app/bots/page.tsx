import Link from "next/link";
import { BOTS } from "@/lib/data";
import Header from "@/app/components/header";

export default function BotsPage() {
  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-12 py-8 flex flex-col gap-10">

        <div className="animate-fade-in-up flex flex-col gap-2">
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none uppercase italic">Robotics Suite</h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-2xl opacity-70">
            End-to-end bot guides and real-time troubleshooting protocols for current robotics lab systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-100">
          {BOTS.map((bot, i) => (
            <Link
              key={bot.id}
              href={`/bots/${bot.id}`}
              className={`card-elevated flex flex-col gap-6 p-8 rounded-[2.5rem] group transition-all duration-300 animate-fade-in-up border border-indigo-50/40`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-white border border-indigo-50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm">
                {bot.icon}
              </div>
              <div className="flex-1 mt-2">
                <p className="text-xl font-black text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 uppercase tracking-tight">
                  {bot.label}
                </p>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-3 font-medium opacity-80">
                  {bot.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-4">
                <span className="text-[11px] text-gray-400 font-black bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-100">
                  {bot.learnSections.length} Protocols
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-indigo-500 font-black group-hover:text-indigo-700 transition-colors uppercase tracking-tight">
                    Deploy Lab
                  </span>
                  <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
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
