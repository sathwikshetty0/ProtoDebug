import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L8.5 4.8L12.5 5.1L9.8 7.5L10.7 11.5L7 9.4L3.3 11.5L4.2 7.5L1.5 5.1L5.5 4.8L7 1Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            ProtoDebug
          </span>
        </Link>

        <div className="h-4 w-px bg-gray-200 mx-1 shrink-0" />

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { href: "/iot", label: "IoT" },
            { href: "/web", label: "Web" },
            { href: "/bots", label: "Bots" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
