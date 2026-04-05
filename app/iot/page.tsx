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
import AiAssistant from "@/app/components/ai-assistant";
import HardwareVisualizer from "@/app/components/hardware-visualizer";

const MCU_GROUPS = Array.from(new Set(MICROCONTROLLERS.map((m) => m.group)));

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-xs font-black shrink-0 shadow-sm shadow-indigo-200">
        {n}
      </span>
      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{text}</p>
    </div>
  );
}

export default function IotPage() {
  const [selectedMcu, setSelectedMcu] = useState<Microcontroller | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Problem[]>([]);
  const [searched, setSearched] = useState(false);
  const [isAiActive, setIsAiActive] = useState(false);

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

  const contextStr = selectedMcu ? `${selectedMcu.label} ${selectedCompObjects.length > 0 ? "+ " + selectedCompObjects.map(c => c.label).join(", ") : ""}` : "General Hardware";

  return (
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-7xl mx-auto px-8 sm:px-12 py-8 flex flex-col gap-8">

        <div className="animate-fade-in-up flex flex-col gap-2">
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none uppercase italic">Hardware Lab</h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-2xl opacity-70">
            Pick your MCU, add components, then describe the issue to pinpoint the solution.
          </p>
        </div>

        {/* AI FAB Toggle */}
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-6">
          {isAiActive && (
            <div className="animate-scale-up origin-bottom-right">
              <AiAssistant 
                context={contextStr} 
                initialIssue={query}
                onClose={() => setIsAiActive(false)}
              />
            </div>
          )}
          <button 
            onClick={() => setIsAiActive(!isAiActive)}
            className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition-all duration-500 hover:scale-110 active:scale-95 ${
              isAiActive 
                ? "bg-white text-gray-800 rotate-90" 
                : "bg-indigo-600 text-white hover:rotate-12"
            }`}
          >
            {isAiActive ? "×" : "🧠"}
          </button>
        </div>

        {/* Step 1: MCU */}
        <section className="section-card rounded-[2.5rem] p-8 sm:p-10 animate-fade-in-up delay-100 border border-indigo-50/40">
          <StepLabel n={1} text="Choose your microcontroller" />
          <div className="flex flex-col gap-6 mt-8">
            {MCU_GROUPS.map((group) => (
              <div key={group} className="flex flex-col gap-3">
                <p className="section-label opacity-60">
                  {group}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                  {MICROCONTROLLERS.filter((m) => m.group === group).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => pickMcu(m)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all duration-300 touch-manipulation group ${
                        selectedMcu?.id === m.id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-lg shadow-indigo-100 scale-[1.03]"
                          : "border-gray-100 bg-gray-50/30 text-gray-700 hover:border-indigo-300 hover:bg-white active:scale-95 hover:shadow-xs"
                      }`}
                    >
                      <span className="text-2xl leading-none transition-transform group-hover:scale-110">{m.icon}</span>
                      <span className="text-xs font-black leading-tight uppercase tracking-tight">{m.label}</span>
                      <span className="text-[10px] text-gray-400 font-bold tracking-tighter">{m.voltage}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1.5: Visualization */}
        {selectedMcu && (
          <HardwareVisualizer mcu={selectedMcu} />
        )}

        {/* Step 2: Components */}
        {selectedMcu && (
          <section className="section-card rounded-[2.5rem] p-8 sm:p-10 animate-scale-up border border-emerald-50/40">
            <div className="flex items-center justify-between mb-8">
              <StepLabel n={2} text="Add sensors & modules" />
              <span className="text-[10px] text-gray-500 font-black bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Multi-Select Enabled</span>
            </div>

            {/* Selected component badges */}
            {selectedCompObjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-100">
                {selectedCompObjects.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleComponent(c)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black border border-indigo-200 hover:bg-indigo-200 transition-all duration-300 shadow-sm shadow-indigo-100 group animate-scale-up"
                  >
                    {c.icon} {c.label}
                    <span className="text-indigo-400 ml-1 font-black group-hover:rotate-90 transition-transform">×</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-10">
              {COMPONENT_CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex flex-col gap-4">
                  <p className="section-label opacity-60">
                    {cat.label}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-3">
                    {cat.components.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => toggleComponent(comp)}
                        title={`${comp.description} · ${comp.interface} · ${comp.voltage}`}
                        className={`flex flex-col items-center gap-2 px-2 py-5 rounded-2xl border text-center transition-all duration-300 touch-manipulation group ${
                          selectedComponents.has(comp.id)
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-100 scale-[1.03]"
                            : "border-gray-100 bg-gray-50/30 text-gray-700 hover:border-emerald-300 hover:bg-white active:scale-95 hover:shadow-xs"
                        }`}
                      >
                        <span className="text-2xl leading-none transition-transform group-hover:scale-110">{comp.icon}</span>
                        <span className="text-[10px] font-black leading-tight uppercase tracking-tight">{comp.label}</span>
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
          <section className="section-card rounded-[2.5rem] p-8 sm:p-10 animate-scale-up border border-indigo-50/40">
            <StepLabel
              n={3}
              text={
                selectedCompObjects.length > 0
                  ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(", ")}`
                  : `${selectedMcu.label} Interface`
              }
            />

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 mt-8">
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
              {selectedComponents.has("bmp180") && (
                <button onClick={() => applyFill("BMP180 reads zero pressure temperature")} className="quick-chip">BMP180 zero</button>
              )}
              {selectedComponents.has("ldr") && (
                <button onClick={() => applyFill("LDR reads stuck same value analog")} className="quick-chip">LDR stuck</button>
              )}
              {selectedComponents.has("adxl345") && (
                <button onClick={() => applyFill("ADXL345 reads all zeros accelerometer")} className="quick-chip">ADXL345 zeros</button>
              )}
              {selectedComponents.has("l3g4200d") && (
                <button onClick={() => applyFill("L3G4200D gyroscope drift angle")} className="quick-chip">Gyro drift</button>
              )}
              {selectedComponents.has("hmc5883l") && (
                <button onClick={() => applyFill("HMC5883L compass heading wrong")} className="quick-chip">Compass wrong</button>
              )}
              {selectedComponents.has("neo6m") && (
                <button onClick={() => applyFill("NEO-6M GPS no fix NMEA")} className="quick-chip">GPS no fix</button>
              )}
              {selectedComponents.has("lm393") && (
                <button onClick={() => applyFill("LM393 sound sensor not triggering")} className="quick-chip">Sound not detecting</button>
              )}
              {selectedComponents.has("tsop1738") && (
                <button onClick={() => applyFill("TSOP1738 IR remote not decoding garbage")} className="quick-chip">IR remote garbage</button>
              )}
              {selectedComponents.has("ttp223") && (
                <button onClick={() => applyFill("TTP223 touch always triggered random")} className="quick-chip">Touch always on</button>
              )}
              {selectedComponents.has("vcnl4000") && (
                <button onClick={() => applyFill("VCNL4000 proximity stuck not changing")} className="quick-chip">Proximity stuck</button>
              )}
            </div>

            <form onSubmit={handleSearch} className="flex gap-3 mt-8">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe current system state..."
                className="flex-1 input-polished min-w-0 !py-4 !px-6 text-base font-black tracking-tight"
              />
              <button
                type="submit"
                className="btn-primary !py-4 !px-10 shrink-0 uppercase tracking-tighter"
              >
                Search Labs
              </button>
            </form>
          </section>
        )}

        {/* Results */}
        {searched && selectedMcu && (
          <div className="flex flex-col gap-6">
            <ResultsList
              results={results}
              label={
                selectedCompObjects.length > 0
                  ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(" + ")}`
                  : selectedMcu.label
              }
            />

            {/* AI Call to Action */}
            <div className="section-card rounded-[2.5rem] p-10 flex flex-col sm:flex-row items-center justify-between gap-8 animate-fade-in-up border border-indigo-100 bg-gradient-to-br from-indigo-50/30 to-white">
              <div className="flex flex-col gap-3 text-center sm:text-left">
                <p className="text-xl font-black text-gray-900 leading-tight">Couldn&apos;t find exactly what you need?</p>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-sm">
                  Let our AI Brain analyze your specific hardware stack and provide a custom diagnostics report.
                </p>
              </div>
              <button 
                onClick={() => setIsAiActive(true)}
                className="btn-primary !px-10 !py-5 uppercase tracking-widest text-[11px] font-black shrink-0 flex items-center gap-2 group shadow-xl shadow-indigo-100"
              >
                🧠 Ask AI Debugger
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        <div className="h-6" />
      </main>
    </div>
  );
}
