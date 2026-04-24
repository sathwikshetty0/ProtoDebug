import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/app/components/command-palette";
import { ThemeProvider } from "@/app/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProtoDebug — Advanced AI Debugging for IoT, Web & Robotics",
  description: "Accelerate your prototyping with AI-powered diagnostics. Expert troubleshooting for microcontrollers, sensors, and modern web applications.",
  keywords: ["IoT debugging", "hardware troubleshooting", "AI assistant", "robotics protocols", "web development", "circuit diagnostics"],
  authors: [{ name: "Sathwik Shetty" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

import BackToTop from "@/app/components/back-to-top";
import ToastContainer from "@/app/components/toast";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CommandPalette />
          <ToastContainer />
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

            <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
              <BackToTop />
              <div className="flex items-center gap-4 mb-1">
                <a href="https://github.com/sathwikshetty0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
                <a href="https://twitter.com/sathwikshetty" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Sathwik Shetty</p>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                <span>Mangaluru</span>
                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
                <span>India</span>
              </div>
            </div>
          </div>
        </footer>
      </ThemeProvider>
    </body>
  </html>
);
}
