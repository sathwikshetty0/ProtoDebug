"use client";

import { useState } from "react";
import type { Problem } from "@/lib/data";

export function ProblemCard({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors gap-4"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
              open ? "bg-indigo-500" : "bg-gray-300"
            }`}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{problem.title}</p>
            {!open && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {problem.description}
              </p>
            )}
          </div>
        </div>
        <span className="text-gray-300 text-xs shrink-0">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-5 py-4 flex flex-col gap-4">
          <p className="text-sm text-gray-600 leading-relaxed">{problem.description}</p>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              How to fix it
            </p>
            <ol className="flex flex-col gap-2">
              {problem.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-indigo-400 font-mono font-semibold w-4 shrink-0 text-right">
                    {i + 1}.
                  </span>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {problem.code && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-4 py-1.5">
                <span className="text-xs text-gray-400 font-mono">
                  {problem.code.lang}
                </span>
              </div>
              <pre className="bg-gray-900 px-4 py-3 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {problem.code.snippet}
              </pre>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
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
      <p className="text-xs text-gray-500 font-medium">
        {results.length === 0
          ? "No matches"
          : `${results.length} result${results.length !== 1 ? "s" : ""} · ${label}`}
      </p>
      {results.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm text-gray-500">No matching problems found.</p>
          <p className="text-xs text-gray-400 mt-1">
            Try different keywords or click a quick-fill chip.
          </p>
        </div>
      ) : (
        results.map((p) => <ProblemCard key={p.id} problem={p} />)
      )}
    </section>
  );
}
