import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-header px-4 sm:px-6 py-4 flex flex-col items-center gap-4">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-300 shadow-indigo-500/20">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5L9.7 5.5L14 5.8L11 8.5L12 13L8 10.7L4 13L5 8.5L2 5.8L6.3 5.5L8 1.5Z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </div>
          <span className="text-[17px] font-black text-gray-900 tracking-tight">
            ProtoDebug
          </span>
        </Link>

        <nav className="flex items-center gap-2 bg-gray-100/40 p-1.5 rounded-2xl border border-white/60 shadow-sm backdrop-blur-md">
          {[
            { href: "/iot", label: "IoT", icon: "🔩" },
            { href: "/web", label: "Web", icon: "🌐" },
            { href: "/bots", label: "Lab", icon: "🤖" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black text-gray-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all duration-300 font-mono tracking-tight"
            >
              <span className="text-sm scale-110">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
