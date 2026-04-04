import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1L8.5 4.8L12.5 5.1L9.8 7.5L10.7 11.5L7 9.4L3.3 11.5L4.2 7.5L1.5 5.1L5.5 4.8L7 1Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            ProtoDebug
          </span>
        </Link>
        <span className="text-gray-300 text-xs">|</span>
        <nav className="flex items-center gap-4">
          <Link
            href="/iot"
            className="text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium"
          >
            IoT
          </Link>
          <Link
            href="/web"
            className="text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium"
          >
            Web
          </Link>
          <Link
            href="/bots"
            className="text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium"
          >
            Bots
          </Link>
        </nav>
      </div>
    </header>
  );
}
