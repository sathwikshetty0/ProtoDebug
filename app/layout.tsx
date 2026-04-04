import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-screen flex flex-col bg-gray-50/50">
        <div className="flex-grow">{children}</div>
        <footer className="w-full border-t border-indigo-100/40 bg-white/40 backdrop-blur-md py-10">
          <div className="mx-auto max-w-6xl px-8 flex flex-col gap-8 md:flex-row items-center justify-between">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-100 ring-2 ring-white/10">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1.5L9.7 5.5L14 5.8L11 8.5L12 13L8 10.7L4 13L5 8.5L2 5.8L6.3 5.5L8 1.5Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="text-[17px] font-black text-gray-900 tracking-tight">
                  ProtoDebug
                </span>
              </div>
              <p className="text-xs text-gray-400 font-bold tracking-tight uppercase">AI-Powered Debugging System</p>
            </div>
            
            <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right">
              <p className="text-xs font-black text-gray-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50 shadow-sm">&copy; {new Date().getFullYear()} sathwik shetty</p>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Innovation Labs — Bengaluru, India</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
