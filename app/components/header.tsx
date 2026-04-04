import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-header">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-300 transition-all duration-300 group-hover:scale-105">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5L9.7 5.5L14 5.8L11 8.5L12 13L8 10.7L4 13L5 8.5L2 5.8L6.3 5.5L8 1.5Z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
            ProtoDebug
          </span>
        </Link>

        <div className="h-5 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-1 shrink-0" />

        <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
          {[
            { href: "/iot", label: "IoT", icon: "🔩" },
            { href: "/web", label: "Web", icon: "🌐" },
            { href: "/bots", label: "Bots", icon: "🤖" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
