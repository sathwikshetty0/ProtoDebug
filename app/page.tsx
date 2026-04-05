import Link from "next/link";
import Header from "@/app/components/header";
import { BOTS } from "@/lib/data";

function DomainCard({
  href,
  icon,
  title,
  subtitle,
  delay,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  delay?: string;
}) {
  return (
    <Link
      href={href}
      className={`card-elevated flex flex-col gap-5 p-7 rounded-[2.5rem] group animate-fade-in-up border border-indigo-50/50 dark:border-white/5 hover:border-indigo-200/60 dark:hover:border-indigo-500/30 ${delay ?? ""}`}
    >
      <div className="w-16 h-16 rounded-3xl bg-indigo-50/50 dark:bg-white/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm border border-indigo-100/20 dark:border-white/5">
        {icon}
      </div>
      <div className="flex-1 mt-2">
        <p className="text-xl font-black text-black dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {title}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2 group/btn">
        <span className="text-sm font-black text-indigo-500 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300 tracking-tight">
          Launch Protocol
          <svg className="w-4 h-4 mt-0.5 transition-transform text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen page-gradient selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-600 dark:selection:text-indigo-300">
      <Header />

      <main className="max-w-7xl mx-auto px-8 lg:px-12 py-4 sm:py-6 flex flex-col gap-10 sm:gap-14">
        {/* Hero */}
        <div className="flex flex-col gap-6 animate-fade-in-up items-start text-left max-w-4xl pt-2 sm:pt-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-black dark:text-white tracking-tighter leading-[1] sm:leading-[0.95]">
              Debug faster.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Build smarter.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-2xl leading-relaxed font-medium tracking-tight">
              AI-powered troubleshooting for IoT and web development. Pick your tech stack and get step&#8209;by&#8209;step solutions in seconds.
            </p>
          </div>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-8">
          <p className="section-label px-2 text-[11px] opacity-70">
            Select intelligence domain
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <DomainCard
              href="/iot"
              icon="🔩"
              title="Hardware Lab"
              subtitle="Microcontrollers, sensors, and circuit debugging guides."
              delay="delay-100"
            />
            <DomainCard
              href="/web"
              icon="🌐"
              title="Web Application"
              subtitle="React, APIs, and stack-overflow level fixes for modern web."
              delay="delay-200"
            />
            <DomainCard
              href="/bots"
              icon="🤖"
              title="Robotics Suite"
              subtitle="End-to-end bot guides with real-time issue discovery."
              delay="delay-300"
            />
          </div>
        </div>

        {/* Bot quick links */}
        <div className="flex flex-col gap-8 animate-fade-in-up delay-300">
          <p className="section-label px-2 text-[11px] opacity-70">
            Rapid access to active systems
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {BOTS.map((bot) => (
              <Link
                key={bot.id}
                href={`/bots/${bot.id}`}
                className="card-elevated flex flex-col items-center gap-4 py-8 px-5 rounded-[2rem] group hover:-translate-y-2 transition-all duration-300 border border-white/40 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                   {bot.icon}
                </div>
                <span className="text-[15px] font-black text-black dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors leading-tight text-center tracking-tight">
                  {bot.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
