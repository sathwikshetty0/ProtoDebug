"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 animate-fade-in">
      <Link href="/" className="hover:text-indigo-500 transition-colors">Home</Link>
      {segments.map((segment, i) => {
        const path = `/${segments.slice(0, i + 1).join("/")}`;
        const isLast = i === segments.length - 1;
        const label = segment.replace(/-/g, " ");

        return (
          <div key={path} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            {isLast ? (
              <span className="text-gray-900 dark:text-white">{label}</span>
            ) : (
              <Link href={path} className="hover:text-indigo-500 transition-colors">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
