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
      <body className="min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        <footer className="site-footer py-10">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-sm">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1L8.5 4.8L12.5 5.1L9.8 7.5L10.7 11.5L7 9.4L3.3 11.5L4.2 7.5L1.5 5.1L5.5 4.8L7 1Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">ProtoDebug</p>
                  <p className="text-xs text-gray-400">AI-Powered Debugging</p>
                </div>
              </div>
              <p className="text-sm leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-700">sathwik shetty</span>. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
