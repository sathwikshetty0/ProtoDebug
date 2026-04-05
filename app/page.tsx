"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/app/components/header";
import { BOTS } from "@/lib/data";

interface BotProgress {
  id: string;
  label: string;
  icon: string;
  percent: number;
}

function ResumeCard({ bot }: { bot: BotProgress }) {
  return (
    <Link 
      href={`/bots/${bot.id}`}
      className="flex flex-col gap-4 p-6 rounded-[2rem] bg-white dark:bg-gray-800 border border-indigo-100/50 dark:border-indigo-900/40 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-500 group"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
          {bot.icon}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{bot.percent}%</span>
          <div className="w-16 h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: `${bot.percent}%` }} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-black text-gray-900 dark:text-white uppercase italic">{bot.label}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">In Progress</p>
      </div>
    </Link>
  );
}

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
      className={`card-elevated flex flex-col gap-6 p-8 rounded-[2.5rem] group animate-fade-in-up border border-indigo-50/50 dark:border-indigo-900/40 hover:border-indigo-200/60 dark:hover:border-indigo-800 transition-all duration-500 ${delay ?? ""}`}
    >
      <div className="w-16 h-16 rounded-3xl bg-indigo-50/50 dark:bg-indigo-900/20 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 ease-out shadow-sm border border-indigo-100/20 dark:border-indigo-800/40">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xl font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 uppercase italic">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2 group/btn">
        <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300 tracking-[0.2em] uppercase">
          Launch Intelligence
          <svg className="w-3.5 h-3.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  const [progress, setProgress] = useState<BotProgress[]>([]);

  useEffect(() => {
    const active = BOTS.map((bot) => {
      const saved = localStorage.getItem(`progress-${bot.id}`);
      if (saved) {
        const completed = JSON.parse(saved) as number[];
        const percent = Math.round((completed.length / bot.learnSections.length) * 100);
        return { id: bot.id, label: bot.label, icon: bot.icon, percent };
      }
      return null;
    }).filter(Boolean) as BotProgress[];
    setProgress(active);
  }, []);

  return (
    <div className="min-h-screen page-gradient selection:bg-indigo-600 selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-8 lg:px-12 py-8 sm:py-12 flex flex-col gap-12 sm:gap-20">
        {/* Progress Command Center */}
        {progress.length > 0 && (
          <div className="flex flex-col gap-8 animate-fade-in-up">
            <p className="section-label px-2">Active Intelligence Channels</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {progress.map((bot) => (
                <ResumeCard key={bot.id} bot={bot} />
              ))}
            </div>
          </div>
        )}

        {/* Hero */}
        <div className="flex flex-col gap-6 animate-fade-in-up items-start text-left max-w-4xl pt-4">
          <div className="flex flex-col gap-5">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9] sm:leading-[0.85]">
              Debug faster.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Build smarter.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium tracking-tight mt-2">
              AI-powered troubleshooting for the next generation of IoT and web hardware. Pick your stack and get streaming diagnostics in seconds.
            </p>
          </div>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-10">
          <p className="section-label px-2">
            Intelligence Domains
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <DomainCard
              href="/iot"
              icon="🔩"
              title="Hardware Lab"
              subtitle="Microcontrollers, sensors, and real-time circuit debugging guides."
              delay="delay-100"
            />
            <DomainCard
              href="/web"
              icon="🌐"
              title="Web Application"
              subtitle="React, APIs, and high-fidelity fixes for the modern web stack."
              delay="delay-200"
            />
            <DomainCard
              href="/bots"
              icon="🤖"
              title="Robotics Suite"
              subtitle="End-to-end bot masterclasses with intelligent issue discovery."
              delay="delay-300"
            />
          </div>
        </div>

        {/* Bot quick links */}
        <div className="flex flex-col gap-10 animate-fade-in-up delay-300 mb-20">
          <p className="section-label px-2">
            Rapid access protocols
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {BOTS.map((bot) => (
              <Link
                key={bot.id}
                href={`/bots/${bot.id}`}
                className="card-elevated flex flex-col items-center gap-5 py-10 px-6 rounded-[2.5rem] group hover:-translate-y-3 transition-all duration-500 border border-white/20 dark:border-gray-800 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md"
              >
                <div className="w-16 h-16 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-indigo-100/50 dark:shadow-none flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
                   {bot.icon}
                </div>
                <span className="text-[13px] font-black text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight text-center tracking-widest uppercase">
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
