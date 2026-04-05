"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiAssistantProps {
  context: string;
  initialIssue?: string;
  mode?: "proactive" | "reactive";
  onClose?: () => void;
}

export default function AiAssistant({
  context,
  initialIssue = "",
  mode = "reactive",
  onClose,
}: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialIssue);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle initial issue if provided
  useEffect(() => {
    if (initialIssue && messages.length === 0) {
      handleSend(initialIssue);
    }
  }, []);

  async function handleSend(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          context,
          issue: text,
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to AI");

      const reader = response.body?.getReader();
      const decoder = new TextEncoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          assistantContent += chunk;

          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last.role === "assistant") {
              return [...prev.slice(0, -1), { ...last, content: assistantContent }];
            }
            return prev;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Sorry, I encountered an error connecting to the AI brain. Please check your connection." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[500px] sm:h-[600px] w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-indigo-100 overflow-hidden animate-scale-up">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
            🤖
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Debugger</h3>
            <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest opacity-80">Intelligence Active</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-gray-50/50"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4 opacity-40">
            <span className="text-5xl">🧠</span>
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
              Ready to analyze {context}
            </p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} animate-fade-in`}
          >
            <div 
              className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              <div className="whitespace-pre-wrap break-words">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-indigo-500 animate-pulse">
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        className="p-4 bg-white border-t border-gray-100 flex gap-3"
      >
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your issue..."
          className="flex-1 input-polished !py-3 !px-5 text-sm font-bold"
          disabled={isLoading}
        />
        <button 
          type="submit"
          className="btn-primary !p-3 aspect-square flex items-center justify-center group"
          disabled={isLoading || !input.trim()}
        >
          <svg className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 ${isLoading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </form>
    </div>
  );
}
