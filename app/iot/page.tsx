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

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 text-white text-[10px] font-bold shrink-0 shadow-xs shadow-indigo-200">
        {n}
      </span>
      <p className="text-xs font-bold text-gray-900">{text}</p>
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
    <div className="min-h-screen page-gradient">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-5">

        <div className="animate-fade-in-up">
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-none">IoT / Hardware</h1>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            Pick your MCU, add components, then describe the issue.
          </p>
        </div>

        {/* Step 1: MCU */}
        <section className="section-card rounded-2xl p-4 sm:p-5 animate-fade-in-up delay-100">
          <StepLabel n={1} text="Choose your microcontroller" />
          <div className="flex flex-col gap-4 mt-4">
            {MCU_GROUPS.map((group) => (
              <div key={group}>
                <p className="section-label mb-2">
                  {group}
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">
                  {MICROCONTROLLERS.filter((m) => m.group === group).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => pickMcu(m)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-center transition-all duration-200 touch-manipulation ${
                        selectedMcu?.id === m.id
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md shadow-indigo-100 scale-105"
                          : "border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50 active:bg-indigo-50 hover:shadow-xs"
                      }`}
                    >
                      <span className="text-base leading-none">{m.icon}</span>
                      <span className="text-[10px] font-bold leading-tight truncate w-full">{m.label}</span>
                      <span className="text-[9px] text-gray-400 leading-tight">{m.voltage}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Components */}
        {selectedMcu && (
          <section className="section-card rounded-2xl p-4 sm:p-5 animate-scale-up">
            <div className="flex items-center justify-between mb-4">
              <StepLabel n={2} text="Add sensors & modules" />
              <span className="text-[10px] text-gray-400 font-bold bg-gray-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Multi-Select</span>
            </div>

            {/* Selected component badges */}
            {selectedCompObjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-gray-100">
                {selectedCompObjects.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleComponent(c)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-bold hover:bg-indigo-200 transition-all duration-200 shadow-xs shadow-indigo-100"
                  >
                    {c.icon} {c.label}
                    <span className="text-indigo-400 ml-0.5 font-bold">×</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {COMPONENT_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <p className="section-label mb-2">
                    {cat.label}
                  </p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                    {cat.components.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => toggleComponent(comp)}
                        title={`${comp.description} · ${comp.interface} · ${comp.voltage}`}
                        className={`flex flex-col items-center gap-1 px-1 py-1.5 rounded-lg border text-center transition-all duration-200 touch-manipulation ${
                          selectedComponents.has(comp.id)
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100 scale-105"
                            : "border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/50 active:bg-emerald-50 hover:shadow-xs"
                        }`}
                      >
                        <span className="text-sm leading-none">{comp.icon}</span>
                        <span className="text-[9px] font-bold leading-tight truncate w-full">{comp.label}</span>
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
          <section className="section-card rounded-2xl p-4 sm:p-5 animate-scale-up">
            <StepLabel
              n={3}
              text={
                selectedCompObjects.length > 0
                  ? `${selectedMcu.label} + ${selectedCompObjects.map((c) => c.label).join(", ")}`
                  : `${selectedMcu.label} — situation`
              }
            />

            {/* Quick chips */}
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

            <form onSubmit={handleSearch} className="flex gap-2 mt-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe issue..."
                className="flex-1 input-polished min-w-0 !py-2"
              />
              <button
                type="submit"
                className="btn-primary !py-2 !px-5 shrink-0"
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
      </main>
    </div>
  );
}
