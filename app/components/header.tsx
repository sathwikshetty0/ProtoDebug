import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-header px-4 sm:px-6 py-3 min-h-[72px] flex items-center">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5L9.7 5.5L14 5.8L11 8.5L12 13L8 10.7L4 13L5 8.5L2 5.8L6.3 5.5L8 1.5Z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </div>
          <span className="text-[17px] font-black text-gray-900 tracking-tight hidden sm:block">
            ProtoDebug
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 bg-gray-100/40 p-1 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md">
          {[
            { href: "/iot", label: "IoT", icon: "🔩" },
            { href: "/web", label: "Web", icon: "🌐" },
            { href: "/bots", label: "Lab", icon: "🤖" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-black text-gray-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all duration-300 font-mono tracking-tight"
            >
              <span className="text-sm scale-110">{item.icon}</span>
              <span className="hidden xs:inline">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
