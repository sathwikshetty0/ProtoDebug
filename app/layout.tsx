import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/app/components/command-palette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProtoDebug — AI Debugging for IoT & Web",
  description: "AI-powered debugging assistant for IoT and web development prototyping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <CommandPalette />
        <div className="flex-grow">{children}</div>
        
        <footer className="w-full border-t border-card-border bg-card-bg py-12">
          <div className="mx-auto max-w-7xl px-8 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-100 dark:shadow-none group-hover:scale-110 transition-transform duration-500">
                   <span className="text-xl">🔍</span>
                </div>
                <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
                  ProtoDebug
                </span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-xs">
                Precision diagnostics for innovators. Accelerating the future, one byte at a time.
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right">
              <p className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-4 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-800 shadow-sm">&copy; {new Date().getFullYear()} sathwik shetty</p>
              <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                <span>MANGLORE</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                <span>INDIA</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
