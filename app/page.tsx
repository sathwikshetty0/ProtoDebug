import Link from "next/link";
import Header from "@/app/components/header";
import { BOTS } from "@/lib/data";

function DomainCard({
  href,
  icon,
  title,
  subtitle,
  accent,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col gap-4 p-5 rounded-2xl border transition-all group ${
        accent
          ? "border-indigo-200 bg-indigo-50 hover:border-indigo-400 hover:bg-indigo-100/70"
          : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <div className="flex-1">
        <p className={`text-sm font-bold ${accent ? "text-indigo-800" : "text-gray-900"} group-hover:text-indigo-700 transition-colors`}>
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{subtitle}</p>
      </div>
      <span className={`text-xs font-semibold ${accent ? "text-indigo-500" : "text-gray-400"} group-hover:text-indigo-600 transition-colors`}>
        Open →
      </span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-10">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            IoT · Web · Robotics
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Debug faster.
            <br />
            <span className="text-indigo-600">Build smarter.</span>
          </h1>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            A reference tool for IoT and web prototyping. Pick your hardware or tech stack, describe the issue, and get step-by-step solutions.
          </p>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Choose a domain
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <DomainCard
              href="/iot"
              icon="🔩"
              title="IoT / Hardware"
              subtitle="Microcontrollers, sensors, actuators, motor drivers, displays."
            />
            <DomainCard
              href="/web"
              icon="🌐"
              title="Web Development"
              subtitle="React, Next.js, REST APIs, WebSocket — bugs and fixes."
            />
            <DomainCard
              href="/bots"
              icon="🤖"
              title="Robotics / Bots"
              subtitle="Build guides + debugging for line followers, RC bots, and more."
              accent
            />
          </div>
        </div>

        {/* Bot quick links */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Jump to a bot
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BOTS.map((bot) => (
              <Link
                key={bot.id}
                href={`/bots/${bot.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
              >
                <span className="text-xl shrink-0">{bot.icon}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors leading-tight">
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
