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
      className="flex flex-col gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform duration-300">
          {bot.icon}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{bot.percent}%</span>
          <div className="w-16 h-1 bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: `${bot.percent}%` }} />
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{bot.label}</p>
        <p className="text-xs text-gray-500 mt-0.5">In Progress</p>
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
      className={`card-elevated flex flex-col gap-4 p-6 sm:p-8 rounded-2xl group animate-fade-in-up border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-white dark:hover:bg-gray-800/80 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 ${delay ?? ""}`}
    >
      <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-gray-100 dark:border-gray-700">
        {icon}
      </div>
      <div className="flex-1 mt-2">
        <p className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-1.5 group/btn mt-2">
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
          Open Lab
          <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function LandingPage() {
  const [progress, setProgress] = useState<BotProgress[]>([]);

  const [recentBots, setRecentBots] = useState<typeof BOTS>([]);

  useEffect(() => {
    // Active progress
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

    // Recently viewed
    const recentIds = JSON.parse(localStorage.getItem("recently-viewed") || "[]") as string[];
    const recent = recentIds
      .map(id => BOTS.find(b => b.id === id))
      .filter(Boolean) as typeof BOTS;
    setRecentBots(recent);
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

        {/* Recently Viewed */}
        {recentBots.length > 0 && (
          <div className="flex flex-col gap-8 animate-fade-in-up">
            <div className="flex items-center justify-between px-2">
              <p className="section-label">Recently Reconnected</p>
              <button 
                onClick={() => { localStorage.removeItem("recently-viewed"); setRecentBots([]); }}
                className="text-[10px] font-black text-gray-400 hover:text-indigo-600 uppercase tracking-tighter"
              >
                Clear History
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
              {recentBots.map((bot) => (
                <Link
                  key={bot.id}
                  href={`/bots/${bot.id}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                    {bot.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{bot.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Hero */}
        <div className="flex flex-col gap-6 animate-fade-in-up items-start text-left max-w-4xl pt-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Debug faster.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-x">Build smarter.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mt-2 font-medium">
              AI-powered troubleshooting for the next generation of IoT and web hardware. Pick your stack and get streaming diagnostics in seconds.
            </p>
          </div>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-8">
          <p className="section-label px-2">
            Intelligence Domains
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
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
            <div className="relative">
              <span className="absolute -top-3 -right-2 z-10 bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-indigo-200 dark:shadow-none animate-bounce">NEW</span>
              <DomainCard
                href="/bots"
                icon="🤖"
                title="Robotics Suite"
                subtitle="End-to-end bot masterclasses with intelligent issue discovery."
                delay="delay-300"
              />
            </div>
          </div>
        </div>

        {/* Featured Bot */}
        <section className="animate-fade-in-up delay-[400ms]">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Expert Protocol</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Recommended for advanced labs</p>
            </div>
          </div>
          <Link href="/bots/soccer_bot" className="block group">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-indigo-600 p-8 sm:p-14 text-white shadow-2xl shadow-indigo-200 dark:shadow-none border border-white/10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-[100px] group-hover:scale-125 transition-transform duration-1000 pointer-events-none" />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="flex flex-col gap-6 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Featured</span>
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Soccer Bot ⚽</span>
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.1]">Mastering High-Speed IR Ball Tracking</h3>
                  <p className="text-indigo-100 text-base sm:text-lg leading-relaxed opacity-90 font-medium">
                    Dive deep into 1200Hz signal processing, omnidirectional drive math, and competitive robotics strategy in our most comprehensive guide.
                  </p>
                  <div className="flex flex-wrap gap-8 mt-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Complexity</span>
                      <span className="text-xl font-black">Advanced</span>
                    </div>
                    <div className="w-px h-12 bg-white/20 hidden sm:block" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Est. Time</span>
                      <span className="text-xl font-black">4 Hours</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 lg:ml-auto">
                   <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl sm:text-6xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-700 shadow-2xl border border-white/20">
                     ⚽
                   </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Bot quick links */}
        <div className="flex flex-col gap-8 animate-fade-in-up delay-300 mb-20">
          <p className="section-label px-2">
            Rapid Access
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {BOTS.map((bot) => (
              <Link
                key={bot.id}
                href={`/bots/${bot.id}`}
                className="card-elevated flex flex-col items-center gap-4 py-8 px-4 rounded-2xl group hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                   {bot.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight text-center">
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
