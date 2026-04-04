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
      className={`card-elevated flex flex-col gap-4 p-6 rounded-[2rem] group animate-fade-in-up border border-indigo-50/50 hover:border-indigo-200/60 ${delay ?? ""}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50/50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm border border-indigo-100/20">
        {icon}
      </div>
      <div className="flex-1 mt-1">
        <p className="text-[17px] font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
          {title}
        </p>
        <p className="text-[13px] text-gray-500 mt-2 leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2 group/btn">
        <span className="text-[13px] font-bold text-indigo-500 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
          Explore now
          <svg className="w-3.5 h-3.5 mt-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen page-gradient selection:bg-indigo-100 selection:text-indigo-600">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12 sm:py-20 flex flex-col gap-16">
        {/* Hero */}
        <div className="flex flex-col gap-6 animate-fade-in-up items-start text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-600 text-[11px] font-bold uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Next-Gen Debugging
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight leading-[1.05]">
            Debug faster.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Build smarter.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed font-medium">
            AI-powered troubleshooting for IoT and web development. Pick your tech stack and get step&#8209;by&#8209;step solutions in seconds.
          </p>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-6">
          <p className="section-label px-2 text-[11px] opacity-70">
            Choose a domain
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <DomainCard
              href="/iot"
              icon="🔩"
              title="IoT / Hardware"
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
              title="Robotics Lab"
              subtitle="End-to-end bot guides with real-time issue discovery."
              delay="delay-300"
            />
          </div>
        </div>

        {/* Bot quick links */}
        <div className="flex flex-col gap-6 animate-fade-in-up delay-300">
          <p className="section-label px-2 text-[11px] opacity-70">
            Rapid access to robots
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {BOTS.map((bot) => (
              <Link
                key={bot.id}
                href={`/bots/${bot.id}`}
                className="card-elevated flex flex-col items-center gap-3 py-6 px-4 rounded-[1.5rem] group hover:-translate-y-1 transition-all duration-300 border border-white/40 bg-white/40 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                   {bot.icon}
                </div>
                <span className="text-[13px] font-bold text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight text-center">
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
