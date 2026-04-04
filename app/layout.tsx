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
      <body className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-grow">{children}</div>
        <footer className="w-full border-t border-gray-200 bg-white py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm leading-5 text-gray-500">
                &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-900">sathikshett</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <span>ProtoDebug</span>
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                <span>AI-Powered Debugging</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
