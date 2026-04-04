"use client";

import { useState } from "react";
import type { Problem } from "@/lib/data";

export function ProblemCard({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between px-4 sm:px-5 py-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors gap-3"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
              open ? "bg-indigo-500" : "bg-gray-300"
            }`}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 leading-snug">
              {problem.title}
            </p>
            {!open && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {problem.description}
              </p>
            )}
          </div>
        </div>
        <span className="text-gray-400 text-[10px] shrink-0 mt-1">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 sm:px-5 py-5 flex flex-col gap-5">
          <p className="text-sm text-gray-600 leading-relaxed">{problem.description}</p>

          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              How to fix it
            </p>
            <ol className="flex flex-col gap-3">
              {problem.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {problem.code && (
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-mono font-medium">
                  {problem.code.lang}
                </span>
                <span className="text-[10px] text-gray-500">example</span>
              </div>
              <pre className="bg-gray-950 px-4 py-4 text-[12px] text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {problem.code.snippet}
              </pre>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {problem.tags.slice(0, 8).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-400 font-mono"
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
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500 font-medium">No matching problems found.</p>
          <p className="text-xs text-gray-400 mt-1">
            Try different keywords or tap a quick-fill chip.
          </p>
        </div>
      ) : (
        results.map((p) => <ProblemCard key={p.id} problem={p} />)
      )}
    </section>
  );
}
