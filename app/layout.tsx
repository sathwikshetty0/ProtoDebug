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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <CommandPalette />
        <div className="flex-grow">{children}</div>
        
        <footer className="w-full border-t border-card-border bg-card-bg py-10">
          <div className="mx-auto max-w-7xl px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-100 dark:shadow-none transition-transform duration-300">
                   <span className="text-sm">🔍</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                  ProtoDebug
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mt-1">
                Precision diagnostics for innovators. Accelerating the future, one byte at a time.
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Sathwik Shetty</p>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                <span>Mangaluru</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                <span>India</span>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
