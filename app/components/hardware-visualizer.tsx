"use client";

import { Microcontroller } from "@/lib/data";

interface Props {
  mcu: Microcontroller;
}

export default function HardwareVisualizer({ mcu }: Props) {
  // Common pin configurations to highlight
  const highlights = [
    { label: "VIN", color: "bg-red-500" },
    { label: "GND", color: "bg-black" },
    { label: "3.3V", color: "bg-orange-400" },
    { label: "GPIO", color: "bg-green-500" },
    { label: "TX/RX", color: "bg-blue-500" },
  ];

  const pinsPerSide = mcu.id === "mega" ? 27 : 15;

  return (
    <div className="section-card rounded-[2.5rem] p-10 animate-scale-up border border-indigo-50/40 bg-gradient-to-tr from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="section-label uppercase tracking-[0.2em] opacity-40">System Architecture</p>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic">{mcu.label} <span className="opacity-30">|</span> 1:1 Reference</h3>
      </div>

      {/* The "Breadboard" Visual */}
      <div className="relative group">
        <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className={`relative bg-gray-800 dark:bg-black rounded-xl border-[6px] border-gray-700 dark:border-gray-800 shadow-2xl p-4 flex flex-col items-center gap-8 ${mcu.id === 'mega' ? 'w-48 h-80' : 'w-40 h-64'} transition-all duration-500`}>
          {/* Internal components */}
          <div className="w-12 h-12 bg-gray-700 dark:bg-gray-900 rounded-lg border border-white/10 flex items-center justify-center text-xs font-mono text-white/20">
             CPU
          </div>

          <div className="flex-1 w-full flex flex-col items-center justify-center gap-2">
            <span className="text-3xl">{mcu.icon}</span>
            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">{mcu.group} SERIES</span>
          </div>

          {/* Left Pins */}
          <div className="absolute -left-3 inset-y-8 flex flex-col justify-between py-2">
            {Array.from({ length: pinsPerSide }).map((_, i) => (
              <div key={i} className="w-4 h-1.5 bg-gray-600 dark:bg-gray-800 border border-white/5 rounded-r-sm" />
            ))}
          </div>

          {/* Right Pins */}
          <div className="absolute -right-3 inset-y-8 flex flex-col justify-between py-2">
            {Array.from({ length: pinsPerSide }).map((_, i) => (
              <div key={i} className="w-4 h-1.5 bg-gray-600 dark:bg-gray-800 border border-white/5 rounded-l-sm" />
            ))}
          </div>

          {/* Branding */}
          <div className="text-[10px] font-black text-white/40 uppercase tracking-tighter italic">ProtoDebug I/O</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
        {highlights.map((h) => (
          <div key={h.label} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className={`w-3 h-3 rounded-full ${h.color} shadow-sm`} />
            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{h.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
