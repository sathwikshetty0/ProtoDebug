"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MICROCONTROLLERS, COMPONENT_CATEGORIES, BOTS } from "@/lib/data";

function CommandItem({ 
  item, 
  onClick 
}: { 
  item: any, 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group transition-colors"
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
        <div className="text-left">
          <p className="text-sm font-black text-gray-900 dark:text-white">{item.label}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.type}</p>
        </div>
      </div>
      <span className="text-gray-300 group-hover:text-indigo-500 transition-colors">→</span>
    </button>
  );
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Enter" && filteredItems.length > 0) {
        router.push(filteredItems[0].href);
        setIsOpen(false);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, router]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const items = [
    ...MICROCONTROLLERS.map((m) => ({ id: m.id, label: m.label, type: "MCU", icon: m.icon, href: "/iot" })),
    ...COMPONENT_CATEGORIES.flatMap((cat) => cat.components.map((c) => ({ id: c.id, label: c.label, type: "Component", icon: c.icon, href: "/iot" }))),
    ...BOTS.map((b) => ({ id: b.id, label: b.label, type: "Bot", icon: b.icon, href: `/bots/${b.id}` })),
  ];

  const filteredItems = query === "" 
    ? items.slice(0, 5) 
    : items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-indigo-100 dark:border-gray-800 overflow-hidden animate-scale-up">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search MCUs, sensors, bots..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white font-bold placeholder:text-gray-400 placeholder:font-medium"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-tighter">ESC</kbd>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <CommandItem
                key={`${item.type}-${item.id}`}
                item={item}
                onClick={() => {
                  router.push(item.href);
                  setIsOpen(false);
                }}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No results found.</p>
            </div>
          )}
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick Navigation</p>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Powered by AI Brain</p>
        </div>
      </div>
    </div>
  );
}
