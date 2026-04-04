"use client";

import { useState } from "react";
import {
  MICROCONTROLLERS,
  COMPONENT_CATEGORIES,
  WEB_DOMAINS,
  searchProblems,
  searchWebProblems,
  type Microcontroller,
  type HardwareComponent,
  type WebDomain,
  type Problem,
} from "@/lib/data";

type TopDomain = "iot" | "web" | null;

const MCU_GROUPS = Array.from(new Set(MICROCONTROLLERS.map((m) => m.group)));

export default function Home() {
  const [topDomain, setTopDomain] = useState<TopDomain>(null);

  // IoT state
  const [selectedMcu, setSelectedMcu] = useState<Microcontroller | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());
  const [iotQuery, setIotQuery] = useState("");
  const [iotResults, setIotResults] = useState<Problem[]>([]);
  const [iotSearched, setIotSearched] = useState(false);

  // Web state
  const [selectedWebDomain, setSelectedWebDomain] = useState<WebDomain | null>(null);
  const [webQuery, setWebQuery] = useState("");
  const [webResults, setWebResults] = useState<Problem[]>([]);
  const [webSearched, setWebSearched] = useState(false);

  // ── IoT handlers ──────────────────────────────────────────────────────────

  function pickMcu(mcu: Microcontroller) {
    const next = selectedMcu?.id === mcu.id ? null : mcu;
    setSelectedMcu(next);
    setSelectedComponents(new Set());
    setIotQuery("");
    if (next) {
      setIotResults(searchProblems(next.id, [], ""));
      setIotSearched(true);
    } else {
      setIotResults([]);
      setIotSearched(false);
    }
  }

  function toggleComponent(comp: HardwareComponent) {
    const next = new Set(selectedComponents);
    if (next.has(comp.id)) next.delete(comp.id);
    else next.add(comp.id);
    setSelectedComponents(next);
    const results = searchProblems(selectedMcu?.id ?? null, Array.from(next), iotQuery);
    setIotResults(results);
    setIotSearched(true);
  }

  function handleIotSearch(e: React.FormEvent) {
    e.preventDefault();
    setIotResults(
      searchProblems(selectedMcu?.id ?? null, Array.from(selectedComponents), iotQuery)
    );
    setIotSearched(true);
  }

  function applyIotFill(text: string) {
    setIotQuery(text);
    setIotResults(
      searchProblems(selectedMcu?.id ?? null, Array.from(selectedComponents), text)
    );
    setIotSearched(true);
  }

  // ── Web handlers ──────────────────────────────────────────────────────────

  function pickWebDomain(d: WebDomain) {
    const next = selectedWebDomain?.id === d.id ? null : d;
    setSelectedWebDomain(next);
    setWebQuery("");
    if (next) {
      setWebResults(searchWebProblems(next, ""));
      setWebSearched(true);
    } else {
      setWebResults([]);
      setWebSearched(false);
    }
  }

  function handleWebSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedWebDomain) return;
    setWebResults(searchWebProblems(selectedWebDomain, webQuery));
    setWebSearched(true);
  }

  function applyWebFill(text: string) {
    setWebQuery(text);
    if (!selectedWebDomain) return;
    setWebResults(searchWebProblems(selectedWebDomain, text));
    setWebSearched(true);
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  function switchTopDomain(d: TopDomain) {
    setTopDomain(d);
    // reset both sides
    setSelectedMcu(null);
    setSelectedComponents(new Set());
    setIotQuery("");
    setIotResults([]);
    setIotSearched(false);
    setSelectedWebDomain(null);
    setWebQuery("");
    setWebResults([]);
    setWebSearched(false);
  }

  // ── selected component list for the summary badge ──────────────────────
  const selectedCompObjects = COMPONENT_CATEGORIES.flatMap((c) =>
    c.components.filter((co) => selectedComponents.has(co.id))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.5 4.8L12.5 5.1L9.8 7.5L10.7 11.5L7 9.4L3.3 11.5L4.2 7.5L1.5 5.1L5.5 4.8L7 1Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-900">ProtoDebug</span>
          <span className="text-xs text-gray-400 ml-1 hidden sm:inline">
            IoT &amp; web debugging reference
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* ── Step 1: Top domain ── */}
        <section className="bg-white border border-gray-200 rounded-xl p-5">
          <StepLabel n={1} text="What are you working on?" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <TopDomainCard
              active={topDomain === "iot"}
              onClick={() => switchTopDomain(topDomain === "iot" ? null : "iot")}
              icon="🔩"
              title="IoT / Hardware"
              subtitle="Microcontrollers, sensors, actuators, displays, communication"
            />
            <TopDomainCard
              active={topDomain === "web"}
              onClick={() => switchTopDomain(topDomain === "web" ? null : "web")}
              icon="🌐"
              title="Web Development"
              subtitle="React, Next.js, REST APIs, WebSocket"
            />
          </div>
        </section>

        {/* ══ IoT flow ══════════════════════════════════════════════════════ */}
        {topDomain === "iot" && (
          <>
            {/* Step 2: Microcontroller */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <StepLabel n={2} text="Choose your microcontroller" />
              <div className="flex flex-col gap-3 mt-4">
                {MCU_GROUPS.map((group) => (
                  <div key={group}>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      {group}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      {MICROCONTROLLERS.filter((m) => m.group === group).map((m) => (
                        <button
                          key={m.id}
                          onClick={() => pickMcu(m)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-center transition-all ${
                            selectedMcu?.id === m.id
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50"
                          }`}
                        >
                          <span className="text-xl leading-none">{m.icon}</span>
                          <span className="text-xs font-semibold leading-tight">{m.label}</span>
                          <span className="text-[10px] text-gray-400 leading-tight">{m.voltage}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Step 3: Components (shown after MCU is selected) */}
            {selectedMcu && (
              <section className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <StepLabel n={3} text="Add sensors, actuators & modules" inline />
                  <span className="text-xs text-gray-400">multi-select</span>
                </div>
                {selectedCompObjects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4 mt-1">
                    {selectedCompObjects.map((c) => (
                      <span
                        key={c.id}
                        className="flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                      >
                        {c.icon} {c.label}
                        <button
                          onClick={() => toggleComponent(c)}
                          className="ml-0.5 text-indigo-400 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-4 mt-4">
                  {COMPONENT_CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        {cat.label}
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {cat.components.map((comp) => (
                          <button
                            key={comp.id}
                            onClick={() => toggleComponent(comp)}
                            title={`${comp.description} · ${comp.interface} · ${comp.voltage}`}
                            className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border text-center transition-all ${
                              selectedComponents.has(comp.id)
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                            }`}
                          >
                            <span className="text-lg leading-none">{comp.icon}</span>
                            <span className="text-[11px] font-semibold leading-tight">{comp.label}</span>
                            <span className="text-[9px] text-gray-400 leading-tight">{comp.interface}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Step 4: Query + results */}
            {selectedMcu && (
              <section className="bg-white border border-gray-200 rounded-xl p-5">
                <StepLabel
                  n={4}
                  text={
                    selectedCompObjects.length > 0
                      ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(", ")} — describe your situation`
                      : `${selectedMcu.label} — describe your situation`
                  }
                />
                {/* Suggested fills based on selection */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <button
                    onClick={() => applyIotFill("voltage mismatch 5V 3.3V level")}
                    className="quick-chip"
                  >
                    Voltage mismatch
                  </button>
                  <button
                    onClick={() => applyIotFill("power supply reset brownout")}
                    className="quick-chip"
                  >
                    Power / resets
                  </button>
                  <button
                    onClick={() => applyIotFill("I2C not found address")}
                    className="quick-chip"
                  >
                    I2C not found
                  </button>
                  {selectedComponents.has("dht22") || selectedComponents.has("dht11") ? (
                    <button onClick={() => applyIotFill("DHT NaN reading failed")} className="quick-chip">
                      DHT reads NaN
                    </button>
                  ) : null}
                  {selectedComponents.has("hcsr04") && (
                    <button onClick={() => applyIotFill("HC-SR04 distance zero wrong")} className="quick-chip">
                      HC-SR04 zero
                    </button>
                  )}
                  {selectedComponents.has("mpu6050") && (
                    <button onClick={() => applyIotFill("MPU6050 gyro drift angle")} className="quick-chip">
                      MPU6050 drift
                    </button>
                  )}
                  {(selectedComponents.has("servo_sg90") || selectedComponents.has("servo_mg996r")) && (
                    <button onClick={() => applyIotFill("servo jitter power")} className="quick-chip">
                      Servo jitter
                    </button>
                  )}
                  {selectedComponents.has("l298n") && (
                    <button onClick={() => applyIotFill("L298N motor not spinning direction")} className="quick-chip">
                      L298N not spinning
                    </button>
                  )}
                  {selectedComponents.has("relay") && (
                    <button onClick={() => applyIotFill("relay inverted logic active low")} className="quick-chip">
                      Relay logic
                    </button>
                  )}
                  {selectedComponents.has("ws2812b") && (
                    <button onClick={() => applyIotFill("WS2812B flickering colour wrong")} className="quick-chip">
                      LED flicker
                    </button>
                  )}
                  {selectedComponents.has("oled_ssd1306") && (
                    <button onClick={() => applyIotFill("OLED blank screen SSD1306")} className="quick-chip">
                      OLED blank
                    </button>
                  )}
                  {(selectedComponents.has("bme280") || selectedComponents.has("bmp280")) && (
                    <button onClick={() => applyIotFill("BME280 reads zero nan")} className="quick-chip">
                      BME280 zero
                    </button>
                  )}
                  {selectedComponents.has("ds18b20") && (
                    <button onClick={() => applyIotFill("DS18B20 reads 85 conversion")} className="quick-chip">
                      DS18B20 85°C
                    </button>
                  )}
                  {(selectedComponents.has("mq2") || selectedComponents.has("mq135") || selectedComponents.has("mq7")) && (
                    <button onClick={() => applyIotFill("MQ gas sensor warmup reading")} className="quick-chip">
                      MQ warm-up
                    </button>
                  )}
                  {selectedComponents.has("nrf24") && (
                    <button onClick={() => applyIotFill("NRF24L01 not communicating power")} className="quick-chip">
                      NRF24 no comms
                    </button>
                  )}
                  {selectedComponents.has("hc05") && (
                    <button onClick={() => applyIotFill("HC-05 bluetooth pairing")} className="quick-chip">
                      HC-05 pairing
                    </button>
                  )}
                  {selectedComponents.has("lora") && (
                    <button onClick={() => applyIotFill("LoRa no packets receive")} className="quick-chip">
                      LoRa no packets
                    </button>
                  )}
                </div>

                <form onSubmit={handleIotSearch} className="flex gap-2 mt-3">
                  <input
                    value={iotQuery}
                    onChange={(e) => setIotQuery(e.target.value)}
                    placeholder="Describe the issue or paste error keywords..."
                    className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                  >
                    Search
                  </button>
                </form>
              </section>
            )}

            {/* IoT results */}
            {iotSearched && selectedMcu && (
              <ResultsList
                results={iotResults}
                label={
                  selectedCompObjects.length > 0
                    ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(" + ")}`
                    : selectedMcu.label
                }
              />
            )}
          </>
        )}

        {/* ══ Web flow ══════════════════════════════════════════════════════ */}
        {topDomain === "web" && (
          <>
            {/* Step 2: Web domain */}
            <section className="bg-white border border-gray-200 rounded-xl p-5">
              <StepLabel n={2} text="Choose your technology" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {WEB_DOMAINS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => pickWebDomain(d)}
                    className={`flex flex-col items-center gap-1.5 px-3 py-4 rounded-lg border text-center transition-all ${
                      selectedWebDomain?.id === d.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50"
                    }`}
                  >
                    <span className="text-2xl leading-none">{d.icon}</span>
                    <span className="text-sm font-semibold">{d.label}</span>
                    <span className="text-[11px] text-gray-400 leading-tight">{d.description}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Web query */}
            {selectedWebDomain && (
              <section className="bg-white border border-gray-200 rounded-xl p-5">
                <StepLabel n={3} text={`${selectedWebDomain.icon} ${selectedWebDomain.label} — what's the issue?`} />
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {selectedWebDomain.quickFills.map((q) => (
                    <button key={q} onClick={() => applyWebFill(q)} className="quick-chip">
                      {q}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleWebSearch} className="flex gap-2 mt-3">
                  <input
                    value={webQuery}
                    onChange={(e) => setWebQuery(e.target.value)}
                    placeholder={selectedWebDomain.reactivePlaceholder}
                    className="flex-1 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                  >
                    Search
                  </button>
                </form>
              </section>
            )}

            {/* Web results */}
            {webSearched && selectedWebDomain && (
              <ResultsList results={webResults} label={selectedWebDomain.label} />
            )}
          </>
        )}

        {/* Empty state */}
        {!topDomain && (
          <p className="text-center text-sm text-gray-400 py-4">
            Choose a domain above to get started.
          </p>
        )}
      </main>

      {/* Tailwind utility for quick chips */}
      <style jsx global>{`
        .quick-chip {
          padding: 2px 10px;
          font-size: 11px;
          border-radius: 9999px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #4b5563;
          transition: all 0.15s;
          cursor: pointer;
        }
        .quick-chip:hover {
          border-color: #a5b4fc;
          background: #eef2ff;
          color: #4338ca;
        }
      `}</style>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StepLabel({ n, text, inline }: { n: number; text: string; inline?: boolean }) {
  return (
    <div className={inline ? "flex items-center gap-2" : "flex items-start gap-2"}>
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold shrink-0 mt-0.5">
        {n}
      </span>
      <p className="text-sm font-semibold text-gray-900">{text}</p>
    </div>
  );
}

function TopDomainCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all ${
        active
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-200 bg-gray-50 hover:border-indigo-200 hover:bg-indigo-50/30"
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className={`text-sm font-semibold ${active ? "text-indigo-700" : "text-gray-900"}`}>
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>
      </div>
    </button>
  );
}

function ResultsList({ results, label }: { results: Problem[]; label: string }) {
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
            Try different keywords, add more components, or click a quick-fill chip.
          </p>
        </div>
      ) : (
        results.map((p) => <ProblemCard key={p.id} problem={p} />)
      )}
    </section>
  );
}

function ProblemCard({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors gap-4"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${open ? "bg-indigo-500" : "bg-gray-300"}`} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{problem.title}</p>
            {!open && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">{problem.description}</p>
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
                <span className="text-xs text-gray-400 font-mono">{problem.code.lang}</span>
              </div>
              <pre className="bg-gray-900 px-4 py-3 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                {problem.code.snippet}
              </pre>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {problem.tags.slice(0, 8).map((t) => (
              <span key={t} className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-400 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
