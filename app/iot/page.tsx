"use client";

import { useState } from "react";
import {
  MICROCONTROLLERS,
  COMPONENT_CATEGORIES,
  searchProblems,
  type Microcontroller,
  type HardwareComponent,
  type Problem,
} from "@/lib/data";
import Header from "@/app/components/header";
import { ResultsList } from "@/app/components/problem-card";

const MCU_GROUPS = Array.from(new Set(MICROCONTROLLERS.map((m) => m.group)));

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

export default function IotPage() {
  const [selectedMcu, setSelectedMcu] = useState<Microcontroller | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Problem[]>([]);
  const [searched, setSearched] = useState(false);

  const selectedCompObjects = COMPONENT_CATEGORIES.flatMap((c) =>
    c.components.filter((co) => selectedComponents.has(co.id))
  );

  function pickMcu(mcu: Microcontroller) {
    const next = selectedMcu?.id === mcu.id ? null : mcu;
    setSelectedMcu(next);
    setSelectedComponents(new Set());
    setQuery("");
    if (next) {
      setResults(searchProblems(next.id, [], ""));
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  }

  function toggleComponent(comp: HardwareComponent) {
    const next = new Set(selectedComponents);
    if (next.has(comp.id)) next.delete(comp.id);
    else next.add(comp.id);
    setSelectedComponents(next);
    setResults(searchProblems(selectedMcu?.id ?? null, Array.from(next), query));
    setSearched(true);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setResults(searchProblems(selectedMcu?.id ?? null, Array.from(selectedComponents), query));
    setSearched(true);
  }

  function applyFill(text: string) {
    setQuery(text);
    setResults(searchProblems(selectedMcu?.id ?? null, Array.from(selectedComponents), text));
    setSearched(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">

        <div>
          <h1 className="text-lg font-bold text-gray-900">IoT / Hardware</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Pick your microcontroller, add sensors, then describe your issue.
          </p>
        </div>

        {/* Step 1: MCU */}
        <section className="bg-white border border-gray-200 rounded-xl p-5">
          <StepLabel n={1} text="Choose your microcontroller" />
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

        {/* Step 2: Components */}
        {selectedMcu && (
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-1">
              <StepLabel n={2} text="Add sensors, actuators & modules" inline />
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

        {/* Step 3: Search */}
        {selectedMcu && (
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <StepLabel
              n={3}
              text={
                selectedCompObjects.length > 0
                  ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(", ")} — describe your situation`
                  : `${selectedMcu.label} — describe your situation`
              }
            />
            <div className="flex flex-wrap gap-1.5 mt-4">
              <button onClick={() => applyFill("voltage mismatch 5V 3.3V level")} className="quick-chip">Voltage mismatch</button>
              <button onClick={() => applyFill("power supply reset brownout")} className="quick-chip">Power / resets</button>
              <button onClick={() => applyFill("I2C not found address")} className="quick-chip">I2C not found</button>
              {(selectedComponents.has("dht22") || selectedComponents.has("dht11")) && (
                <button onClick={() => applyFill("DHT NaN reading failed")} className="quick-chip">DHT reads NaN</button>
              )}
              {selectedComponents.has("hcsr04") && (
                <button onClick={() => applyFill("HC-SR04 distance zero wrong")} className="quick-chip">HC-SR04 zero</button>
              )}
              {selectedComponents.has("mpu6050") && (
                <button onClick={() => applyFill("MPU6050 gyro drift angle")} className="quick-chip">MPU6050 drift</button>
              )}
              {(selectedComponents.has("servo_sg90") || selectedComponents.has("servo_mg996r")) && (
                <button onClick={() => applyFill("servo jitter power")} className="quick-chip">Servo jitter</button>
              )}
              {selectedComponents.has("l298n") && (
                <button onClick={() => applyFill("L298N motor not spinning direction")} className="quick-chip">L298N not spinning</button>
              )}
              {selectedComponents.has("bts7960") && (
                <button onClick={() => applyFill("BTS7960 motor not spinning RPWM LPWM")} className="quick-chip">BTS7960 not spinning</button>
              )}
              {(selectedComponents.has("ir_array_5ch") || selectedComponents.has("ir_array_8ch")) && (
                <button onClick={() => applyFill("IR array all same value calibration")} className="quick-chip">IR array flat reads</button>
              )}
              {selectedComponents.has("relay") && (
                <button onClick={() => applyFill("relay inverted logic active low")} className="quick-chip">Relay logic</button>
              )}
              {selectedComponents.has("ws2812b") && (
                <button onClick={() => applyFill("WS2812B flickering colour wrong")} className="quick-chip">LED flicker</button>
              )}
              {selectedComponents.has("oled_ssd1306") && (
                <button onClick={() => applyFill("OLED blank screen SSD1306")} className="quick-chip">OLED blank</button>
              )}
              {(selectedComponents.has("bme280") || selectedComponents.has("bmp280")) && (
                <button onClick={() => applyFill("BME280 reads zero nan")} className="quick-chip">BME280 zero</button>
              )}
              {selectedComponents.has("ds18b20") && (
                <button onClick={() => applyFill("DS18B20 reads 85 conversion")} className="quick-chip">DS18B20 85°C</button>
              )}
              {(selectedComponents.has("mq2") || selectedComponents.has("mq135") || selectedComponents.has("mq7")) && (
                <button onClick={() => applyFill("MQ gas sensor warmup reading")} className="quick-chip">MQ warm-up</button>
              )}
              {selectedComponents.has("nrf24") && (
                <button onClick={() => applyFill("NRF24L01 not communicating power")} className="quick-chip">NRF24 no comms</button>
              )}
              {selectedComponents.has("hc05") && (
                <button onClick={() => applyFill("HC-05 bluetooth pairing")} className="quick-chip">HC-05 pairing</button>
              )}
              {selectedComponents.has("lora") && (
                <button onClick={() => applyFill("LoRa no packets receive")} className="quick-chip">LoRa no packets</button>
              )}
            </div>
            <form onSubmit={handleSearch} className="flex gap-2 mt-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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

        {/* Results */}
        {searched && selectedMcu && (
          <ResultsList
            results={results}
            label={
              selectedCompObjects.length > 0
                ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(" + ")}`
                : selectedMcu.label
            }
          />
        )}

        {!selectedMcu && (
          <p className="text-center text-sm text-gray-400 py-4">
            Select a microcontroller above to get started.
          </p>
        )}
      </main>

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
