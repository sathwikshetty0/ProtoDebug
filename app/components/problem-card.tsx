"use client";

import { useState } from "react";
import type { Problem } from "@/lib/data";
import CodeBlock from "@/app/components/code-block";

export function ProblemCard({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="section-card rounded-2xl overflow-hidden animate-scale-up">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between px-5 sm:px-6 py-5 text-left hover:bg-gray-50/80 active:bg-gray-100/60 transition-colors duration-200 gap-3"
      >
        <div className="flex items-start gap-3.5 min-w-0">
          <span
            className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 transition-colors duration-300 ${
              open ? "bg-indigo-500 shadow-sm shadow-indigo-200" : "bg-gray-300"
            }`}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-snug">
              {problem.title}
            </p>
            {!open && (
              <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                {problem.description}
              </p>
            )}
          </div>
        </div>
        <span className={`text-gray-400 text-xs shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 sm:px-6 py-6 flex flex-col gap-6 animate-fade-in">
          <p className="text-sm text-gray-600 leading-relaxed">{problem.description}</p>

          <div>
            <p className="section-label mb-3">
              How to fix it
            </p>
            <ol className="flex flex-col gap-3.5">
              {problem.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 text-[10px] font-bold shrink-0 mt-0.5 shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {problem.code && (
            <CodeBlock 
              code={problem.code.snippet} 
              lang={problem.code.lang} 
            />
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {problem.tags.slice(0, 8).map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[10px] rounded-full bg-gray-100/80 text-gray-500 font-mono border border-gray-100"
              >
              {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ResultsList({
  results,
  label,
}: {
  results: Problem[];
  label: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-xs text-gray-400 font-semibold px-1">
        {results.length === 0
          ? "No matches"
          : `${results.length} result${results.length !== 1 ? "s" : ""} for ${label}`}
      </p>
      {results.length === 0 ? (
        <div className="section-card rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-xl">🔍</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">No matching problems found.</p>
          <p className="text-xs text-gray-400 mt-1.5">
            Try different keywords or tap a quick-fill chip.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map((p) => <ProblemCard key={p.id} problem={p} />)}
        </div>
      )}
    </section>
  );
}
