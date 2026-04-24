import Link from "next/link";
import ThemeToggle from "@/app/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 py-4 flex items-center bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-100 dark:shadow-none group-hover:scale-105 transition-transform duration-300">
             <span className="text-sm">🔍</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight hidden sm:block">
            ProtoDebug
          </span>
        </Link>

        <nav className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl border border-white/60 dark:border-gray-700/60 shadow-sm backdrop-blur-md">
          {[
            { href: "/iot", label: "IoT", icon: "🔩" },
            { href: "/web", label: "Web", icon: "🌐" },
            { href: "/bots", label: "Lab", icon: "🤖" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
            >
              <span className="text-base sm:text-sm">{item.icon}</span>
              <span className="hidden xs:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              navigator.share?.({ title: 'ProtoDebug', url: window.location.href })
                .catch(() => navigator.clipboard.writeText(window.location.href));
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 transition-colors border border-gray-100 dark:border-gray-700"
            title="Share Page"
          >
            <span className="text-xs">🔗</span>
          </button>
          <div className="hidden md:flex items-center gap-2 px-2 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Search</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-600 text-[10px] font-black text-gray-500">⌘K</kbd>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
