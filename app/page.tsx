import Link from "next/link";
import Header from "@/app/components/header";
import { BOTS } from "@/lib/data";

function DomainCard({
  href,
  icon,
  title,
  subtitle,
  accent,
  delay,
}: {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  accent?: boolean;
  delay?: string;
}) {
  return (
    <Link
      href={href}
      className={`card-elevated flex flex-col gap-4 p-6 rounded-2xl group animate-fade-in-up ${delay ?? ""} ${
        accent
          ? "!border-indigo-200 !bg-gradient-to-br from-indigo-50 to-white hover:!border-indigo-400"
          : ""
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
        {icon}
      </div>
      <div className="flex-1">
        <p className={`text-sm font-bold ${accent ? "text-indigo-800" : "text-gray-900"} group-hover:text-indigo-700 transition-colors duration-200`}>
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{subtitle}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`text-xs font-semibold ${accent ? "text-indigo-500" : "text-gray-400"} group-hover:text-indigo-600 transition-colors duration-200`}>
          Open
        </span>
        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen page-gradient">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-14">
        {/* Hero */}
        <div className="flex flex-col gap-5 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold w-fit shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            IoT · Web · Robotics
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Debug faster.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Build smarter.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-lg leading-relaxed">
            A reference tool for IoT and web prototyping. Pick your hardware or tech stack, describe the issue, and get step&#8209;by&#8209;step solutions.
          </p>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-4">
          <p className="section-label px-1">
            Choose a domain
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DomainCard
              href="/iot"
              icon="🔩"
              title="IoT / Hardware"
              subtitle="Microcontrollers, sensors, actuators, motor drivers, displays."
              delay="delay-100"
            />
            <DomainCard
              href="/web"
              icon="🌐"
              title="Web Development"
              subtitle="React, Next.js, REST APIs, WebSocket — bugs and fixes."
              delay="delay-200"
            />
            <DomainCard
              href="/bots"
              icon="🤖"
              title="Robotics / Bots"
              subtitle="Build guides + debugging for line followers, RC bots, and more."
              accent
              delay="delay-300"
            />
          </div>
        </div>

        {/* Bot quick links */}
        <div className="flex flex-col gap-4 animate-fade-in-up delay-300">
          <p className="section-label px-1">
            Jump to a bot
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BOTS.map((bot) => (
              <Link
                key={bot.id}
                href={`/bots/${bot.id}`}
                className="card-elevated flex items-center gap-3 px-4 py-3.5 rounded-xl group"
              >
                <span className="text-xl shrink-0 group-hover:scale-110 transition-transform duration-200">{bot.icon}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors duration-200 leading-tight">
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
