// ── Types ───────────────────────────────────────────────────────────────────

export interface Problem {
  id: string;
  title: string;
  description: string;
  /** Tags for keyword matching — include mcu ids, component ids, interface names, symptoms */
  tags: string[];
  steps: string[];
  code?: { lang: string; snippet: string };
}

export interface Microcontroller {
  id: string;
  label: string;
  group: string;
  icon: string;
  voltage: string;
  description: string;
}

export interface HardwareComponent {
  id: string;
  label: string;
  icon: string;
  voltage: string;
  interface: string;
  description: string;
}

export interface ComponentCategory {
  id: string;
  label: string;
  components: HardwareComponent[];
}

export interface WebDomain {
  id: string;
  label: string;
  icon: string;
  description: string;
  filterTags: string[];
  proactivePlaceholder: string;
  reactivePlaceholder: string;
  quickFills: string[];
}

// ── Microcontrollers ────────────────────────────────────────────────────────

export const MICROCONTROLLERS: Microcontroller[] = [
  // ESP
  {
    id: "esp32",
    label: "ESP32",
    group: "ESP",
    icon: "📡",
    voltage: "3.3 V",
    description: "WiFi + BT, 240 MHz, 520 KB SRAM",
  },
  {
    id: "esp8266",
    label: "ESP8266",
    group: "ESP",
    icon: "📶",
    voltage: "3.3 V",
    description: "WiFi, NodeMCU / D1 Mini",
  },
  // Arduino
  {
    id: "uno",
    label: "Uno",
    group: "Arduino",
    icon: "🔵",
    voltage: "5 V",
    description: "ATmega328P, 2 KB SRAM",
  },
  {
    id: "nano",
    label: "Nano",
    group: "Arduino",
    icon: "🔵",
    voltage: "5 V",
    description: "ATmega328P, compact",
  },
  {
    id: "mega",
    label: "Mega 2560",
    group: "Arduino",
    icon: "🔵",
    voltage: "5 V",
    description: "ATmega2560, 54 pins, 8 KB SRAM",
  },
  {
    id: "pro_mini",
    label: "Pro Mini",
    group: "Arduino",
    icon: "🔵",
    voltage: "3.3 / 5 V",
    description: "ATmega328P, ultra-compact",
  },
  // Raspberry Pi
  {
    id: "rpi4",
    label: "RPi 4",
    group: "Raspberry Pi",
    icon: "🫐",
    voltage: "3.3 V",
    description: "Linux, quad-core, 1–8 GB RAM",
  },
  {
    id: "rpi_zero",
    label: "RPi Zero W",
    group: "Raspberry Pi",
    icon: "🫐",
    voltage: "3.3 V",
    description: "Linux, single-core, WiFi",
  },
  {
    id: "rpi_pico",
    label: "RPi Pico W",
    group: "Raspberry Pi",
    icon: "🫐",
    voltage: "3.3 V",
    description: "RP2040, MicroPython, WiFi",
  },
];

// ── Component categories ────────────────────────────────────────────────────

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: "env",
    label: "Environmental Sensors",
    components: [
      {
        id: "dht22",
        label: "DHT22",
        icon: "🌡️",
        voltage: "3.3–5 V",
        interface: "GPIO",
        description: "Temp + humidity",
      },
      {
        id: "dht11",
        label: "DHT11",
        icon: "🌡️",
        voltage: "3.3–5 V",
        interface: "GPIO",
        description: "Temp + humidity (budget)",
      },
      {
        id: "bme280",
        label: "BME280",
        icon: "🌤️",
        voltage: "3.3 V",
        interface: "I2C / SPI",
        description: "Temp + humidity + pressure",
      },
      {
        id: "bmp280",
        label: "BMP280",
        icon: "⛰️",
        voltage: "3.3 V",
        interface: "I2C / SPI",
        description: "Temp + pressure",
      },
      {
        id: "ds18b20",
        label: "DS18B20",
        icon: "🌡️",
        voltage: "3.3–5 V",
        interface: "OneWire",
        description: "Waterproof temp probe",
      },
      {
        id: "aht20",
        label: "AHT20",
        icon: "💧",
        voltage: "3.3 V",
        interface: "I2C",
        description: "High-accuracy temp + humidity",
      },
    ],
  },
  {
    id: "distance",
    label: "Distance & Motion",
    components: [
      {
        id: "hcsr04",
        label: "HC-SR04",
        icon: "📏",
        voltage: "5 V",
        interface: "GPIO (Trig/Echo)",
        description: "Ultrasonic 2–400 cm",
      },
      {
        id: "pir",
        label: "PIR HC-SR501",
        icon: "👁️",
        voltage: "5–12 V",
        interface: "GPIO",
        description: "Passive infrared motion",
      },
      {
        id: "mpu6050",
        label: "MPU-6050",
        icon: "🎯",
        voltage: "3.3–5 V",
        interface: "I2C",
        description: "6-axis accel + gyro",
      },
      {
        id: "vl53l0x",
        label: "VL53L0X",
        icon: "📏",
        voltage: "3.3 V",
        interface: "I2C",
        description: "Laser ToF, up to 2 m",
      },
      {
        id: "tcrt5000",
        label: "TCRT5000",
        icon: "↔️",
        voltage: "5 V",
        interface: "Analog / GPIO",
        description: "IR reflective / line sensor",
      },
      {
        id: "encoder",
        label: "Rotary Encoder",
        icon: "🔘",
        voltage: "3.3–5 V",
        interface: "GPIO (interrupt)",
        description: "KY-040 / incremental",
      },
    ],
  },
  {
    id: "gas",
    label: "Gas & Air Quality",
    components: [
      {
        id: "mq2",
        label: "MQ-2",
        icon: "🔥",
        voltage: "5 V",
        interface: "Analog / GPIO",
        description: "LPG, propane, methane, smoke",
      },
      {
        id: "mq135",
        label: "MQ-135",
        icon: "💨",
        voltage: "5 V",
        interface: "Analog / GPIO",
        description: "Air quality, CO₂, NH₃",
      },
      {
        id: "mq7",
        label: "MQ-7",
        icon: "☁️",
        voltage: "5 V",
        interface: "Analog",
        description: "Carbon monoxide (CO)",
      },
      {
        id: "ccs811",
        label: "CCS811",
        icon: "🌫️",
        voltage: "3.3 V",
        interface: "I2C",
        description: "eCO₂ + TVOC, digital output",
      },
      {
        id: "mhz19",
        label: "MH-Z19B",
        icon: "💨",
        voltage: "5 V",
        interface: "UART / PWM",
        description: "CO₂ NDIR sensor, 0–5000 ppm",
      },
    ],
  },
  {
    id: "motors",
    label: "Motors & Actuators",
    components: [
      {
        id: "servo_sg90",
        label: "Servo SG90",
        icon: "⚙️",
        voltage: "4.8–6 V",
        interface: "PWM",
        description: "9 g micro servo",
      },
      {
        id: "servo_mg996r",
        label: "Servo MG996R",
        icon: "⚙️",
        voltage: "4.8–7.2 V",
        interface: "PWM",
        description: "Metal gear, high torque",
      },
      {
        id: "l298n",
        label: "L298N Driver",
        icon: "🔄",
        voltage: "5–35 V",
        interface: "GPIO + PWM",
        description: "Dual H-bridge, 2 × DC motors",
      },
      {
        id: "stepper_28byj",
        label: "28BYJ-48",
        icon: "🌀",
        voltage: "5 V",
        interface: "GPIO (4-wire)",
        description: "Stepper + ULN2003 driver",
      },
      {
        id: "relay",
        label: "5 V Relay",
        icon: "🔌",
        voltage: "5 V coil",
        interface: "GPIO",
        description: "1/2/4-channel module",
      },
      {
        id: "ws2812b",
        label: "WS2812B",
        icon: "💡",
        voltage: "5 V",
        interface: "GPIO (data)",
        description: "Addressable RGB LED strip",
      },
      {
        id: "buzzer",
        label: "Buzzer",
        icon: "🔔",
        voltage: "3.3–5 V",
        interface: "GPIO / PWM",
        description: "Active or passive",
      },
    ],
  },
  {
    id: "displays",
    label: "Displays",
    components: [
      {
        id: "oled_ssd1306",
        label: "OLED SSD1306",
        icon: "🖥️",
        voltage: "3.3–5 V",
        interface: "I2C / SPI",
        description: "0.96″ 128×64 monochrome",
      },
      {
        id: "lcd_i2c",
        label: "LCD 16×2 I2C",
        icon: "📺",
        voltage: "5 V",
        interface: "I2C (PCF8574)",
        description: "16 char × 2 row with backpack",
      },
      {
        id: "tft_st7735",
        label: "TFT ST7735",
        icon: "🖥️",
        voltage: "3.3 V",
        interface: "SPI",
        description: "1.8″ 128×160 colour",
      },
      {
        id: "epaper",
        label: "E-Paper",
        icon: "📄",
        voltage: "3.3 V",
        interface: "SPI",
        description: "2.9″ / 4.2″ e-ink display",
      },
    ],
  },
  {
    id: "comms",
    label: "Communication Modules",
    components: [
      {
        id: "hc05",
        label: "HC-05 / HC-06",
        icon: "📘",
        voltage: "3.3–5 V",
        interface: "UART",
        description: "Classic Bluetooth serial",
      },
      {
        id: "nrf24",
        label: "NRF24L01",
        icon: "📡",
        voltage: "3.3 V",
        interface: "SPI",
        description: "2.4 GHz wireless, 250 kbps",
      },
      {
        id: "lora",
        label: "LoRa SX1278",
        icon: "📡",
        voltage: "3.3 V",
        interface: "SPI",
        description: "Long-range, Ra-02 / RFM95",
      },
      {
        id: "sim800l",
        label: "SIM800L",
        icon: "📱",
        voltage: "3.7–4.2 V",
        interface: "UART",
        description: "GSM/GPRS, SMS + HTTP",
      },
    ],
  },
];

// ── Web domains ─────────────────────────────────────────────────────────────

export const WEB_DOMAINS: WebDomain[] = [
  {
    id: "react",
    label: "React",
    icon: "⚛️",
    description: "Hooks, state, effects, performance",
    filterTags: ["react"],
    proactivePlaceholder:
      "e.g. A dashboard fetching live sensor data from a REST API and rendering charts",
    reactivePlaceholder:
      "e.g. useEffect infinite loop  |  State not updating  |  CORS error on fetch",
    quickFills: [
      "useEffect infinite loop re-render",
      "Stale closure state value in callback",
      "CORS fetch blocked origin",
      "Memory leak state update unmounted component",
      "Key prop list rendering wrong",
    ],
  },
  {
    id: "nextjs",
    label: "Next.js",
    icon: "▲",
    description: "App Router, API routes, SSR",
    filterTags: ["nextjs"],
    proactivePlaceholder:
      "e.g. A Next.js app with API routes that proxy to a third-party service",
    reactivePlaceholder:
      "e.g. Env variable undefined in browser  |  Hydration mismatch  |  CORS on API route",
    quickFills: [
      "Environment variable undefined browser NEXT_PUBLIC",
      "CORS API route preflight options",
      "Hydration mismatch server client",
      "Dynamic route 404 on refresh",
    ],
  },
  {
    id: "rest",
    label: "REST API",
    icon: "🌐",
    description: "HTTP, auth, CORS, status codes",
    filterTags: ["api", "rest", "http"],
    proactivePlaceholder:
      "e.g. Fetching data from a third-party API and displaying it in a web app",
    reactivePlaceholder:
      "e.g. 401 Unauthorized  |  Request hangs  |  429 Too Many Requests",
    quickFills: [
      "401 403 unauthorized forbidden token",
      "Request timeout hang fetch abort",
      "429 rate limit retry backoff",
      "CORS blocked access origin",
    ],
  },
  {
    id: "websocket",
    label: "WebSocket",
    icon: "🔌",
    description: "Real-time, Socket.io, reconnection",
    filterTags: ["websocket", "ws"],
    proactivePlaceholder:
      "e.g. Real-time dashboard showing live sensor data via WebSocket",
    reactivePlaceholder:
      "e.g. Connection refused  |  Disconnects and never reconnects  |  Blocked behind NGINX",
    quickFills: [
      "WebSocket connection refused blocked nginx",
      "No reconnection on disconnect close",
    ],
  },
];

// ── Problems ─────────────────────────────────────────────────────────────────

export const ALL_PROBLEMS: Problem[] = [
  // ══ GENERAL / VOLTAGE ══════════════════════════════════════════════════════
  {
    id: "voltage-mismatch-5v-3v3",
    title: "5 V sensor connected to 3.3 V microcontroller — data line damage",
    description:
      "5 V sensors (HC-SR04, most Arduino shields) output 5 V logic signals. Feeding that directly into a 3.3 V MCU (ESP32, ESP8266, Raspberry Pi) can damage GPIO pins or cause erratic readings.",
    tags: [
      "esp32", "esp8266", "rpi4", "rpi_zero", "rpi_pico",
      "hcsr04", "voltage", "5v", "3.3v", "level", "shifter",
      "damage", "mismatch", "logic",
    ],
    steps: [
      "Identify which pins output 5 V logic from a 5 V device (usually all digital output pins)",
      "Use a logic level shifter (e.g. BSS138-based 4-channel bidirectional) on the signal lines",
      "For a single GPIO input: a voltage divider (10 kΩ + 20 kΩ) is a cheap alternative",
      "Power the sensor from 5 V while keeping signal lines level-shifted to 3.3 V",
      "Never connect a 5 V signal directly to an ESP32 GPIO — even momentarily",
    ],
    code: {
      lang: "txt",
      snippet: `Voltage divider for single signal line (5V → 3.3V):

Sensor OUT ──┬── 10 kΩ ──┬── 3.3V MCU GPIO
             │            │
           (5V)         20 kΩ
                          │
                         GND

Vout = 5V × 20k / (10k + 20k) = 3.33 V  ✓`,
    },
  },
  {
    id: "i2c-address-conflict",
    title: "I2C address conflict — two devices share the same address",
    description:
      "Multiple I2C devices on the same bus share a default address (common: 0x76, 0x3C, 0x27), causing garbled reads or both devices failing.",
    tags: [
      "esp32", "esp8266", "uno", "nano", "mega", "rpi4", "rpi_pico",
      "i2c", "address", "conflict", "bus", "wire", "sda", "scl",
      "bme280", "oled_ssd1306", "lcd_i2c", "mpu6050", "aht20",
    ],
    steps: [
      "Run an I2C scanner to list all detected addresses",
      "Check if conflicting devices support address change via ADDR pin (e.g. BME280 0x76↔0x77, MPU-6050 0x68↔0x69)",
      "For devices with fixed addresses, use a TCA9548A I2C multiplexer to put them on separate channels",
      "Alternatively use a second I2C bus: on ESP32 call Wire1.begin(SDA2, SCL2); on Arduino Mega use Wire1",
    ],
    code: {
      lang: "cpp",
      snippet: `// I2C scanner — run once to find all devices
#include <Wire.h>
void setup() {
  Wire.begin(21, 22); // SDA, SCL (adjust for your board)
  Serial.begin(115200);
  Serial.println("Scanning I2C bus...");
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0)
      Serial.printf("  0x%02X\\n", addr);
  }
}
// Common default addresses:
// 0x3C / 0x3D = SSD1306 OLED
// 0x27 / 0x3F = LCD PCF8574
// 0x68 / 0x69 = MPU-6050
// 0x76 / 0x77 = BME/BMP280`,
    },
  },
  {
    id: "power-motors-from-mcu",
    title: "Powering motors / servos from MCU 5 V pin causes resets",
    description:
      "Connecting a servo or motor directly to the Arduino 5 V or ESP32 3.3 V pin causes voltage drops and random resets when the motor draws current.",
    tags: [
      "esp32", "esp8266", "uno", "nano", "mega", "rpi4",
      "servo_sg90", "servo_mg996r", "l298n", "stepper_28byj",
      "power", "reset", "brownout", "motor", "current", "supply",
    ],
    steps: [
      "Always power servos and motors from a separate power supply, not from the MCU's onboard regulator",
      "Share a common GND between the MCU and the motor power supply",
      "Add a 100 µF + 100 nF decoupling capacitor close to the motor driver power pins",
      "A single SG90 servo needs up to 600 mA peak — a USB port can't handle more than 1–2 servos",
      "Use a 6 V / 2 A supply for servos and a 12 V / 2 A supply for DC motors with L298N",
    ],
  },

  // ══ ESP32 ══════════════════════════════════════════════════════════════════
  {
    id: "esp32-wifi-reconnect",
    title: "ESP32 WiFi drops and won't reconnect",
    description:
      "WiFi connection becomes unstable or the device loses connection and never reconnects, requiring a manual reboot.",
    tags: [
      "esp32", "wifi", "disconnect", "reconnect", "drops",
      "unstable", "connection", "wireless", "network",
    ],
    steps: [
      "Set WiFi.mode(WIFI_STA), WiFi.setAutoReconnect(true), WiFi.persistent(false) before WiFi.begin()",
      "Register a WiFi event handler for ARDUINO_EVENT_WIFI_STA_DISCONNECTED and call WiFi.reconnect()",
      "Add a watchdog: if millis() since last successful connect > 60 s, call ESP.restart()",
      "Keep loop() fast — a blocking operation prevents the TCP/IP stack from processing events",
    ],
    code: {
      lang: "cpp",
      snippet: `WiFi.mode(WIFI_STA);
WiFi.setAutoReconnect(true);
WiFi.persistent(false);
WiFi.onEvent([](WiFiEvent_t e, WiFiEventInfo_t i) {
  if (e == ARDUINO_EVENT_WIFI_STA_DISCONNECTED)
    WiFi.reconnect();
});
WiFi.begin(SSID, PASS);`,
    },
  },
  {
    id: "esp32-brownout",
    title: "ESP32 brownout detector triggered / random resets",
    description:
      "ESP32 resets with 'Brownout detector was triggered' — almost always a power supply issue.",
    tags: [
      "esp32", "brownout", "reset", "power", "voltage",
      "reboot", "crash", "detector", "supply", "current",
    ],
    steps: [
      "Use a supply capable of at least 1 A — WiFi TX spikes to 300 mA peak",
      "Add 100 µF + 100 nF decoupling caps close to ESP32 VCC/GND",
      "Avoid powering through a passive USB hub; use a dedicated USB charger",
      "If using AMS1117, ensure input is ≥ 4.75 V under load",
    ],
    code: {
      lang: "cpp",
      snippet: `// Last resort only — fix the supply first
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
}`,
    },
  },
  {
    id: "esp32-watchdog",
    title: "ESP32 task watchdog (WDT) reset",
    description:
      "Serial shows 'Task watchdog got triggered' or device resets during long blocking operations.",
    tags: [
      "esp32", "watchdog", "wdt", "reset", "task",
      "blocking", "loop", "freeze", "hang",
    ],
    steps: [
      "Never block loop() for > a few hundred ms without yielding",
      "Call yield() or delay(1) inside heavy processing loops",
      "Move HTTP, file I/O, or complex logic to a FreeRTOS task",
      "Inside RTOS tasks call vTaskDelay(pdMS_TO_TICKS(10)) periodically",
    ],
    code: {
      lang: "cpp",
      snippet: `// Non-blocking pattern with millis():
unsigned long tick = millis();
while (processing) {
  doWork();
  if (millis() - tick > 100) { yield(); tick = millis(); }
}`,
    },
  },
  {
    id: "esp32-heap-crash",
    title: "ESP32 heap overflow / Guru Meditation crash",
    description: "ESP32 crashes after running a while, free heap steadily decreasing.",
    tags: [
      "esp32", "heap", "memory", "crash", "leak",
      "fragmentation", "guru", "meditation", "string",
    ],
    steps: [
      "Log ESP.getFreeHeap() in loop() to detect leaks over time",
      "Avoid Arduino String in loops — use char arrays or snprintf instead",
      "Use StaticJsonDocument<N> instead of DynamicJsonDocument",
      "Free HTTP clients and JSON docs before they go out of scope",
    ],
    code: {
      lang: "cpp",
      snippet: `Serial.printf("Free heap: %u\\n", ESP.getFreeHeap());
char buf[64];
snprintf(buf, sizeof(buf), "temp=%.1f", t); // no heap alloc
StaticJsonDocument<256> doc; // stack-allocated`,
    },
  },
  {
    id: "esp32-mqtt-disconnect",
    title: "ESP32 MQTT client disconnects frequently",
    description: "MQTT connection to broker drops every few minutes and messages stop.",
    tags: [
      "esp32", "mqtt", "disconnect", "broker", "reconnect",
      "pubsubclient", "keepalive", "connection",
    ],
    steps: [
      "Call client.loop() every iteration of loop() to send keep-alive pings",
      "Implement reconnect() called when !client.connected()",
      "Use a unique client ID per device — duplicate IDs eject the old connection",
      "Increase keep-alive: client.setKeepAlive(60)",
    ],
    code: {
      lang: "cpp",
      snippet: `void reconnect() {
  while (!client.connected()) {
    String id = "ESP32-" + String(random(0xffff), HEX);
    if (client.connect(id.c_str(), USER, PASS))
      client.subscribe("home/#");
    else delay(3000);
  }
}
void loop() {
  if (!client.connected()) reconnect();
  client.loop();
}`,
    },
  },
  {
    id: "esp32-i2c-not-found",
    title: "ESP32 I2C device not found",
    description: "I2C scanner returns nothing; sensor or display doesn't respond.",
    tags: [
      "esp32", "i2c", "not found", "address", "sda", "scl", "wire",
      "oled_ssd1306", "bme280", "mpu6050", "lcd_i2c",
    ],
    steps: [
      "Default ESP32 I2C: SDA = GPIO 21, SCL = GPIO 22",
      "Add 4.7 kΩ pull-ups on both SDA and SCL to 3.3 V",
      "Call Wire.begin(SDA_PIN, SCL_PIN) explicitly for non-default pins",
      "ESP32 GPIO is not 5 V tolerant — use level shifter for 5 V devices",
    ],
    code: {
      lang: "cpp",
      snippet: `Wire.begin(21, 22); // SDA=21, SCL=22
// Run scanner above to find address`,
    },
  },

  // ══ ESP8266 ════════════════════════════════════════════════════════════════
  {
    id: "esp8266-gpio-limits",
    title: "ESP8266 GPIO boot restrictions causing startup issues",
    description:
      "Certain GPIO pins have specific states at boot (pulled high/low) that can prevent the device from booting or entering flash mode when sensors are connected.",
    tags: [
      "esp8266", "gpio", "boot", "pin", "d0", "d1", "d2",
      "nodemcu", "d1mini", "startup", "flash", "mode",
    ],
    steps: [
      "Avoid GPIO 0 (D3), GPIO 2 (D4), and GPIO 15 (D8) for inputs pulled LOW at boot",
      "GPIO 0 must be HIGH at boot for normal operation — don't connect sensors that pull it LOW",
      "GPIO 15 must be LOW at boot — avoid connecting it to 3.3 V",
      "Safe pins for general I/O: GPIO 4 (D2), GPIO 5 (D1), GPIO 12 (D6), GPIO 13 (D7), GPIO 14 (D5)",
      "ADC (A0) can only read 0–1 V on bare ESP8266; NodeMCU/D1 Mini have a voltage divider for 0–3.3 V",
    ],
  },
  {
    id: "esp8266-analog-only-one",
    title: "ESP8266 has only one ADC pin — can't read multiple analog sensors",
    description:
      "Unlike Arduino, the ESP8266 has only a single ADC (A0). Trying to read two analog sensors simultaneously is not possible without external hardware.",
    tags: [
      "esp8266", "adc", "analog", "a0", "multiple", "mq2", "mq135",
      "ldr", "sensor", "pin",
    ],
    steps: [
      "Use a CD4051 or 74HC4051 8-channel analog multiplexer to share the single ADC",
      "Control the multiplexer select pins (S0, S1, S2) with three GPIO pins",
      "Switch between channels in code, delay 1–2 ms, then read A0",
      "Or switch to I2C sensors (BME280, AHT20, CCS811) that don't use the ADC",
    ],
  },

  // ══ Arduino ═════════════════════════════════════════════════════════════════
  {
    id: "arduino-sram-overflow",
    title: "Arduino SRAM overflow — random crashes",
    description:
      "Sketch compiles but behaves erratically at runtime. Uno has only 2 KB SRAM.",
    tags: [
      "uno", "nano", "mega", "pro_mini",
      "sram", "memory", "overflow", "crash", "ram", "string",
    ],
    steps: [
      "Keep dynamic memory below 75 % of SRAM (< 1.5 KB on Uno)",
      "Store constant strings in Flash: Serial.println(F(\"text\"))",
      "Replace String objects with char arrays",
      "Use uint8_t / int8_t instead of int where values fit",
    ],
    code: {
      lang: "cpp",
      snippet: `// Wastes SRAM:
Serial.println("Initializing...");
String s = "data";

// Uses Flash:
Serial.println(F("Initializing..."));
char s[] = "data"; // stack, auto-freed`,
    },
  },
  {
    id: "arduino-millis-rollover",
    title: "millis() rollover causing timing bugs",
    description: "After ~49.7 days millis() wraps to 0 breaking timing comparisons.",
    tags: [
      "uno", "nano", "mega", "pro_mini", "esp32", "esp8266",
      "millis", "rollover", "timing", "unsigned", "long",
    ],
    steps: [
      "Always use subtraction: if (millis() - lastTime >= interval)",
      "Never use: if (millis() > lastTime + interval)",
      "Declare all millis() variables as unsigned long",
    ],
    code: {
      lang: "cpp",
      snippet: `unsigned long lastTime = 0;
void loop() {
  if (millis() - lastTime >= 1000) { // ✓ works through rollover
    lastTime = millis();
    doTask();
  }
}`,
    },
  },
  {
    id: "arduino-serial-garbage",
    title: "Serial monitor shows garbled output",
    description:
      "Baud rate mismatch between Serial.begin() and the Serial Monitor dropdown.",
    tags: ["uno", "nano", "mega", "pro_mini", "serial", "baud", "garbage", "monitor"],
    steps: [
      "Match baud rate: Serial.begin(115200) needs monitor set to 115200",
      "Close and reopen Serial Monitor after upload",
      "No other app should have the COM/tty port open",
    ],
  },

  // ══ DHT22 / DHT11 ══════════════════════════════════════════════════════════
  {
    id: "dht-nan-readings",
    title: "DHT22 / DHT11 always reads NaN or 0",
    description:
      "Temperature and humidity come back as NaN, 0, or −999 despite correct wiring.",
    tags: [
      "dht22", "dht11", "nan", "zero", "reading", "failed",
      "temperature", "humidity", "pullup", "resistor",
      "esp32", "esp8266", "uno", "nano",
    ],
    steps: [
      "Add a 4.7 kΩ–10 kΩ pull-up resistor between DATA pin and VCC",
      "Wait ≥ 2 seconds after power-up before first read",
      "Enforce 2-second minimum interval between reads",
      "Use isnan() check and retry once on failure",
      "On ESP32 use GPIO 4; on Uno use pin 2 or 3 (digital)",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <DHT.h>
DHT dht(4, DHT22); // GPIO4

void setup() { dht.begin(); delay(2000); }
void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    Serial.println("Read failed — check pull-up");
    return;
  }
  Serial.printf("T:%.1f°C H:%.1f%%\\n", t, h);
}`,
    },
  },
  {
    id: "dht-esp32-3v3-voltage",
    title: "DHT22 works on 5 V Arduino but not on 3.3 V ESP32",
    description:
      "DHT22 is rated 3.3–5 V but some modules with onboard resistors behave differently at 3.3 V.",
    tags: [
      "dht22", "dht11", "esp32", "esp8266", "voltage", "3.3v", "5v", "power",
    ],
    steps: [
      "Power the DHT22 from the 5 V pin of the ESP32 development board (most have a 5 V pin from USB)",
      "Use a level shifter or voltage divider on the DATA line to bring 5 V output down to 3.3 V for ESP32 GPIO",
      "Alternatively, source a genuine DHT22 (Aosong) — cheap clones are less tolerant of 3.3 V operation",
      "If powering from 3.3 V, use a shorter pull-up value (2.2 kΩ) to ensure logic HIGH is recognised",
    ],
  },

  // ══ BME280 / BMP280 ════════════════════════════════════════════════════════
  {
    id: "bme280-always-reads-0",
    title: "BME280 / BMP280 reads 0 or NaN on all channels",
    description:
      "All sensor values come back as 0, NaN, or the library returns false/error.",
    tags: [
      "bme280", "bmp280", "zero", "nan", "reading", "failed",
      "i2c", "address", "0x76", "0x77",
      "esp32", "esp8266", "uno",
    ],
    steps: [
      "Default I2C address: 0x76 (SDO pin to GND) or 0x77 (SDO pin to VCC) — check which your module uses",
      "Verify VCC is 3.3 V — these sensors are NOT 5 V tolerant",
      "Run the I2C scanner to confirm the device is detected",
      "Call bme.begin(0x76) or bme.begin(0x77) explicitly; do not rely on auto-detect",
      "Add 4.7 kΩ pull-ups on SDA and SCL if not already present on the module",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Adafruit_BME280.h>
Adafruit_BME280 bme;

void setup() {
  Wire.begin(21, 22);
  if (!bme.begin(0x76)) {      // try 0x77 if this fails
    Serial.println("BME280 not found!");
    while (1);
  }
}
void loop() {
  Serial.printf("T:%.1f P:%.1f H:%.1f\\n",
    bme.readTemperature(),
    bme.readPressure() / 100.0F,
    bme.readHumidity());
  delay(1000);
}`,
    },
  },
  {
    id: "bme280-drift-indoors",
    title: "BME280 temperature reads 3–5 °C too high",
    description:
      "BME280 self-heating from the I2C bus or nearby components causes inflated temperature readings.",
    tags: [
      "bme280", "temperature", "drift", "calibration", "self-heat",
      "accuracy", "high", "offset",
    ],
    steps: [
      "BME280 has ~1.5 °C of self-heating — this is normal and expected",
      "Use forced mode (one-shot) instead of continuous normal mode to reduce self-heating",
      "Mount the sensor away from the MCU, power regulators, and hot components",
      "Apply a software calibration offset based on a reference thermometer reading",
    ],
    code: {
      lang: "cpp",
      snippet: `// Use forced mode to reduce self-heating:
bme.setSampling(
  Adafruit_BME280::MODE_FORCED,
  Adafruit_BME280::SAMPLING_X1,  // temperature
  Adafruit_BME280::SAMPLING_X1,  // pressure
  Adafruit_BME280::SAMPLING_X1,  // humidity
  Adafruit_BME280::FILTER_OFF);
// Before each read:
bme.takeForcedMeasurement();`,
    },
  },

  // ══ DS18B20 ═══════════════════════════════════════════════════════════════
  {
    id: "ds18b20-reads-85",
    title: "DS18B20 always reads exactly 85.00 °C",
    description:
      "85 °C is the DS18B20's power-on reset value — it means the sensor returned a failed conversion.",
    tags: [
      "ds18b20", "85", "reset", "conversion", "failed", "onewire",
      "power", "parasite", "pullup", "esp32", "uno",
    ],
    steps: [
      "Add a 4.7 kΩ pull-up resistor between the DATA line and VCC (required for OneWire)",
      "If using parasitic power mode (only 2 wires), also enable strong pull-up in the library",
      "Increase conversion time: use sensors.requestTemperatures() then wait ≥ 750 ms before reading",
      "Check that VCC is stable — DS18B20 in parasite mode needs a strong pull-up during conversion",
      "Test with a multimeter: DATA idle should be HIGH (~3.3 V or 5 V) due to pull-up",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <OneWire.h>
#include <DallasTemperature.h>
OneWire ow(4);
DallasTemperature sensors(&ow);

void loop() {
  sensors.requestTemperatures();
  delay(750);  // wait for 12-bit conversion
  float t = sensors.getTempCByIndex(0);
  if (t == DEVICE_DISCONNECTED_C || t == 85.0) {
    Serial.println("Read error — check pull-up");
    return;
  }
  Serial.printf("Temp: %.2f°C\\n", t);
}`,
    },
  },
  {
    id: "ds18b20-multiple-sensors",
    title: "Reading multiple DS18B20 sensors on one wire",
    description:
      "Multiple DS18B20 probes on the same data line — addressing and reading each independently.",
    tags: [
      "ds18b20", "multiple", "address", "onewire", "bus",
      "esp32", "uno", "nano",
    ],
    steps: [
      "All DS18B20 sensors can share a single data pin with one pull-up resistor",
      "Each sensor has a unique 8-byte ROM address — read them with sensors.getAddress()",
      "Use requestTemperaturesByAddress() to read individual sensors",
      "Keep total cable length under 30 m; add a 100 nF bypass cap per sensor if longer",
    ],
    code: {
      lang: "cpp",
      snippet: `sensors.begin();
int count = sensors.getDeviceCount();
Serial.printf("%d sensors found\\n", count);
DeviceAddress addr;
for (int i = 0; i < count; i++) {
  sensors.getAddress(addr, i);
  sensors.requestTemperaturesByAddress(addr);
  delay(750);
  Serial.printf("Sensor %d: %.2f°C\\n", i,
    sensors.getTempC(addr));
}`,
    },
  },

  // ══ HC-SR04 ═══════════════════════════════════════════════════════════════
  {
    id: "hcsr04-always-zero",
    title: "HC-SR04 always returns 0 or very large distance",
    description:
      "Ultrasonic sensor returns 0 cm or 400+ cm regardless of what's in front of it.",
    tags: [
      "hcsr04", "ultrasonic", "distance", "zero", "wrong",
      "trig", "echo", "timeout", "esp32", "esp8266", "uno",
    ],
    steps: [
      "HC-SR04 requires 5 V — do NOT power from ESP32 3.3 V pin; use 5 V supply",
      "The ECHO pin outputs 5 V — use a level shifter or voltage divider before connecting to 3.3 V MCU",
      "Send a 10 µs HIGH pulse on TRIG, then measure the ECHO pulse width",
      "If ECHO is always LOW: check TRIG wiring and that sensor has 5 V power",
      "Timeout: pulseIn() default timeout of 1 s can block loop — set explicit timeout: pulseIn(ECHO, HIGH, 25000)",
    ],
    code: {
      lang: "cpp",
      snippet: `#define TRIG 5
#define ECHO 18  // via voltage divider to ESP32

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}

float getDistanceCm() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long dur = pulseIn(ECHO, HIGH, 25000); // 25ms timeout
  if (dur == 0) return -1; // timeout = no echo
  return dur * 0.0343 / 2;
}`,
    },
  },
  {
    id: "hcsr04-noisy-readings",
    title: "HC-SR04 readings are noisy / jumping around",
    description:
      "Distance readings fluctuate by several cm even when nothing is moving.",
    tags: [
      "hcsr04", "noisy", "unstable", "fluctuate", "accuracy",
      "average", "filter",
    ],
    steps: [
      "Average 3–5 readings taken 50 ms apart to smooth output",
      "Discard outliers (readings > 2× the median)",
      "Ensure no metallic objects or parallel surfaces are within the sensor's 15° beam angle",
      "Keep trigger pulse exactly 10 µs — too short or too long causes errors",
      "Power with a stable 5 V — voltage ripple affects the timing circuitry",
    ],
    code: {
      lang: "cpp",
      snippet: `float getSmoothedDistance() {
  float sum = 0; int valid = 0;
  for (int i = 0; i < 5; i++) {
    float d = getDistanceCm();
    if (d > 2 && d < 400) { sum += d; valid++; }
    delay(50);
  }
  return valid > 0 ? sum / valid : -1;
}`,
    },
  },

  // ══ PIR (HC-SR501) ════════════════════════════════════════════════════════
  {
    id: "pir-always-triggered",
    title: "PIR sensor always triggered / false positives",
    description:
      "PIR motion sensor fires continuously even when nobody is present.",
    tags: [
      "pir", "hcsr501", "triggered", "false", "positive",
      "always", "warm", "up", "sensitivity",
    ],
    steps: [
      "PIR sensors need a 30–60 second warm-up time after power-on before readings are valid",
      "Keep the sensor away from heat sources (sunlight, vents, light bulbs) — they trigger on IR",
      "Reduce sensitivity: turn the small orange potentiometer (SENS) counter-clockwise",
      "Set the time-delay pot (TIME) to minimum to reduce re-trigger window",
      "Check jumper setting: H = repeat trigger, L = single trigger",
    ],
  },
  {
    id: "pir-5v-logic-on-esp32",
    title: "PIR output is 3.3 V on some modules, 5 V on others",
    description:
      "Some HC-SR501 modules output 3.3 V logic (safe for ESP32); others output 5 V (unsafe).",
    tags: [
      "pir", "hcsr501", "esp32", "esp8266", "5v", "3.3v",
      "voltage", "output", "level",
    ],
    steps: [
      "Measure OUTPUT pin with a multimeter when triggered — it will show 3.3 V or 5 V",
      "If 5 V output: add a 10 kΩ + 20 kΩ voltage divider to bring it to 3.3 V for ESP32",
      "Power the PIR from 5 V regardless — only the output signal line needs level shifting",
      "Some modules have a small regulator that already outputs 3.3 V; these are ESP32-safe",
    ],
  },

  // ══ MPU-6050 ══════════════════════════════════════════════════════════════
  {
    id: "mpu6050-no-data",
    title: "MPU-6050 not detected or returns all zeros",
    description:
      "I2C scan doesn't find MPU-6050, or all accelerometer/gyro values read 0.",
    tags: [
      "mpu6050", "imu", "accelerometer", "gyro", "i2c",
      "0x68", "0x69", "ad0", "not found", "zero",
      "esp32", "uno",
    ],
    steps: [
      "Default I2C address: 0x68 (AD0 pin LOW) or 0x69 (AD0 pin HIGH)",
      "MPU-6050 runs on 3.3 V — many breakout boards have an onboard regulator so 5 V input is fine",
      "Call mpu.begin() and check return value — it returns false if not found",
      "Wake the sensor: it starts in sleep mode — call mpu.setSleepEnabled(false)",
      "Pull-up resistors on SDA/SCL are required if not already on the breakout board",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Adafruit_MPU6050.h>
Adafruit_MPU6050 mpu;

void setup() {
  Wire.begin(21, 22);
  if (!mpu.begin(0x68)) {  // try 0x69 if fails
    Serial.println("MPU6050 not found");
    while (1);
  }
  mpu.setSensorStandby(false, false); // accel + gyro on
}`,
    },
  },
  {
    id: "mpu6050-gyro-drift",
    title: "MPU-6050 gyroscope drift over time",
    description:
      "Calculated angle from gyroscope drifts steadily even when the sensor is perfectly still.",
    tags: [
      "mpu6050", "gyro", "drift", "angle", "integrate",
      "calibration", "offset", "complementary", "kalman",
    ],
    steps: [
      "Gyroscope drift is inherent — never integrate raw gyro values alone for angle",
      "Calculate gyro offsets at startup by averaging 500 readings while stationary",
      "Fuse accelerometer + gyroscope with a complementary filter (α ≈ 0.96) or Kalman filter",
      "Keep the sensor warm before calibration — drift changes with temperature",
    ],
    code: {
      lang: "cpp",
      snippet: `// Complementary filter for pitch:
float angle = 0.98 * (angle + gyroRate * dt)
            + 0.02 * accelAngle;
// dt = time in seconds since last iteration
// α=0.98 trusts gyro short-term, accel long-term`,
    },
  },

  // ══ MQ Gas Sensors ════════════════════════════════════════════════════════
  {
    id: "mq-sensor-warm-up",
    title: "MQ gas sensor reads 0 or maximum immediately after power-on",
    description:
      "MQ-2, MQ-135, MQ-7 sensors need a 20–48 hour burn-in and 20-second warm-up on each power cycle before readings are meaningful.",
    tags: [
      "mq2", "mq135", "mq7", "gas", "warmup", "burn-in",
      "zero", "max", "reading", "preheat",
      "esp32", "uno",
    ],
    steps: [
      "New sensors: run continuously for 24–48 hours (burn-in) before trusting readings",
      "Each power-on: wait at least 20–30 seconds before reading — the heater must warm up",
      "MQ sensors require 5 V — the heater filament draws 150–300 mA",
      "Read the ANALOG output (AO), not the digital DO pin, for meaningful values",
      "Baseline calibration: read the sensor in clean fresh air and record that as R0",
    ],
    code: {
      lang: "cpp",
      snippet: `// Measure R0 in clean air (run once):
float sensor_volt = analogRead(A0) * 5.0 / 1023;
float RS = (5.0 - sensor_volt) / sensor_volt;
float R0 = RS / 9.83; // 9.83 = RS/R0 in clean air for MQ-2

void loop() {
  delay(30000); // allow warm-up first
  float v = analogRead(A0) * 5.0 / 1023;
  float rs = (5.0 - v) / v;
  float ratio = rs / R0; // compare to datasheet curve
}`,
    },
  },
  {
    id: "mq-esp32-analog",
    title: "MQ sensor analog values look wrong on ESP32",
    description:
      "MQ sensor reads consistently low or saturated on ESP32 because ESP32 ADC is 3.3 V, not 5 V, and ESP32 ADC has non-linearity.",
    tags: [
      "mq2", "mq135", "mq7", "esp32", "adc", "analog", "3.3v",
      "voltage", "divider", "nonlinear",
    ],
    steps: [
      "MQ sensors need 5 V on VCC — use the 5 V pin on a USB-powered ESP32 board",
      "The AO output will swing 0–5 V, but ESP32 ADC only accepts 0–3.3 V",
      "Add a voltage divider (10 kΩ + 10 kΩ) to scale 5 V down to 2.5 V for the ADC",
      "ESP32 ADC is non-linear near 0 V and 3.3 V — use analogReadMilliVolts() for better accuracy",
      "Use esp_adc_cal for calibrated readings on ESP32",
    ],
  },
  {
    id: "ccs811-baseline",
    title: "CCS811 eCO₂ / TVOC readings seem inaccurate",
    description:
      "CCS811 reports very high or very low eCO₂ (e.g. always 400 ppm or always 8192 ppm).",
    tags: [
      "ccs811", "eco2", "tvoc", "accuracy", "baseline", "humidity",
      "compensation", "i2c", "esp32",
    ],
    steps: [
      "CCS811 needs a 20-minute warm-up on first power-on and a 48-hour burn-in for stable readings",
      "Feed temperature and humidity to compensateEnvironmentData() — without it readings are off",
      "Pair with BME280 or DHT22 to provide the environmental compensation values",
      "Store and restore the baseline register across reboots for consistency",
      "CCS811 requires 3.3 V on VCC and I2C — do not exceed 3.3 V",
    ],
    code: {
      lang: "cpp",
      snippet: `ccs.setEnvironmentalData(humidity, temperature); // from DHT/BME
if (ccs.available() && !ccs.readData()) {
  Serial.printf("CO2: %u ppm  TVOC: %u ppb\\n",
    ccs.geteCO2(), ccs.getTVOC());
}`,
    },
  },

  // ══ L298N Motor Driver ════════════════════════════════════════════════════
  {
    id: "l298n-motor-not-spinning",
    title: "L298N motor not spinning or spinning in only one direction",
    description:
      "Connected DC motor doesn't respond, or only spins forward and stops instead of reversing.",
    tags: [
      "l298n", "motor", "dc", "spinning", "direction",
      "in1", "in2", "enable", "pwm", "esp32", "uno",
    ],
    steps: [
      "L298N has: IN1/IN2 (direction), ENA (enable/speed via PWM), and motor power terminal",
      "For forward: IN1=HIGH, IN2=LOW. For reverse: IN1=LOW, IN2=HIGH. For stop: both LOW",
      "ENA must be HIGH (or PWM signal) to enable the motor — if jumper is removed you must drive it",
      "Motor power (VM): must be separate from logic 5 V supply; connect your motor supply (6–35 V) here",
      "Onboard 5 V regulator: only use it for logic if VM ≤ 12 V; remove the 5 V jumper if VM > 12 V",
    ],
    code: {
      lang: "cpp",
      snippet: `#define IN1 2
#define IN2 4
#define ENA 5  // PWM pin

void setup() {
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);
}
void forward(int speed) {  // speed 0-255
  analogWrite(ENA, speed);
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
}
void reverse(int speed) {
  analogWrite(ENA, speed);
  digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH);
}
void stopMotor() {
  digitalWrite(IN1, LOW);  digitalWrite(IN2, LOW);
}`,
    },
  },
  {
    id: "l298n-overheating",
    title: "L298N gets very hot during operation",
    description:
      "L298N driver chip heats up quickly, sometimes to the point of thermal shutdown.",
    tags: [
      "l298n", "hot", "overheating", "heat", "thermal",
      "current", "motor", "driver",
    ],
    steps: [
      "L298N has ~2 V voltage drop and becomes very inefficient at high currents",
      "Maximum continuous current is 2 A per channel — exceeding this causes overheating",
      "Attach the aluminium heatsink that comes with most L298N modules",
      "For motors needing > 2 A, switch to a more efficient driver: L9110S, MX1508, or DRV8833",
      "For stepper/high-current DC motors, consider the TB6612FNG (1.2 A continuous, much less heat)",
    ],
  },

  // ══ 28BYJ-48 Stepper ══════════════════════════════════════════════════════
  {
    id: "stepper-not-rotating",
    title: "28BYJ-48 stepper not rotating or vibrating in place",
    description:
      "Stepper motor vibrates but doesn't rotate, or rotates in only one direction.",
    tags: [
      "stepper_28byj", "stepper", "28byj48", "uln2003",
      "vibrate", "not rotating", "steps", "sequence",
      "uno", "esp32",
    ],
    steps: [
      "Connect coil wires in order — wrong sequence causes vibration without rotation",
      "ULN2003 pin order on the driver board: IN1, IN2, IN3, IN4",
      "Power the motor from 5 V — NOT from the Arduino 5 V pin if also powering other components",
      "Use the Stepper library with the correct step sequence, or use AccelStepper for smoother motion",
      "Step sequence for half-step: 8, 12, 4, 6, 2, 3, 1, 9 (IN1–IN4 bit pattern)",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Stepper.h>
const int STEPS = 2048;  // 28BYJ-48 steps per revolution
Stepper stepper(STEPS, 8, 10, 9, 11); // IN1 IN3 IN2 IN4 order!

void setup() {
  stepper.setSpeed(12); // RPM (max ~15 for this motor)
}
void loop() {
  stepper.step(STEPS);   // one full revolution CW
  delay(500);
  stepper.step(-STEPS);  // one full revolution CCW
  delay(500);
}`,
    },
  },
  {
    id: "stepper-overheating",
    title: "28BYJ-48 motor gets hot and stalls after running",
    description:
      "Motor heats up during continuous operation and eventually stalls or misses steps.",
    tags: [
      "stepper_28byj", "stepper", "hot", "overheat", "stall",
      "continuous", "power", "disable",
    ],
    steps: [
      "28BYJ-48 with ULN2003 always draws current when holding position — it will heat up",
      "De-energise the coils when not moving: set all IN pins LOW",
      "Don't run continuously at speeds > 15 RPM — the motor doesn't have enough torque",
      "For applications needing continuous rotation or higher speed, use a DC motor + encoder instead",
    ],
    code: {
      lang: "cpp",
      snippet: `// De-energise after move to prevent heating:
void releaseMotor() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}`,
    },
  },

  // ══ Servo ══════════════════════════════════════════════════════════════════
  {
    id: "servo-jitter",
    title: "Servo motor jittering or not holding position",
    description:
      "Servo twitches continuously or oscillates even when commanded to hold still.",
    tags: [
      "servo_sg90", "servo_mg996r", "jitter", "oscillate",
      "power", "pwm", "uno", "esp32", "nano",
    ],
    steps: [
      "Power servo from external 5 V — never from Arduino 5 V or ESP32 3.3 V pin",
      "Common GND between servo supply and MCU",
      "Add 100 µF capacitor across servo power supply terminals",
      "For MG996R or multiple SG90s, use at least 2 A supply",
      "Verify pulse width: SG90 uses 500–2400 µs; call attach(pin, 500, 2400)",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Servo.h>
Servo s;
void setup() {
  s.attach(9, 500, 2400); // pin, minPulse, maxPulse
  // Power: VCC → ext 5V, GND → ext GND + Arduino GND
}`,
    },
  },

  // ══ Relay ══════════════════════════════════════════════════════════════════
  {
    id: "relay-inverted-logic",
    title: "5 V relay module triggers on LOW instead of HIGH",
    description:
      "Most cheap relay modules are active-LOW — the relay engages when IN pin is LOW, not HIGH.",
    tags: [
      "relay", "inverted", "logic", "active", "low", "high",
      "trigger", "module", "esp32", "uno",
    ],
    steps: [
      "Most relay modules with PCF817 optocoupler are active-LOW: LOW = relay ON, HIGH = relay OFF",
      "Use digitalWrite(RELAY_PIN, LOW) to turn ON, digitalWrite(RELAY_PIN, HIGH) to turn OFF",
      "On ESP32, some GPIO pins are HIGH at boot — this can trigger the relay at startup",
      "To avoid startup glitch: set pin HIGH (relay off) in setup() before pinMode()",
      "Check the label on the module: some boards have a selector jumper for HIGH/LOW active",
    ],
    code: {
      lang: "cpp",
      snippet: `#define RELAY 5
void setup() {
  digitalWrite(RELAY, HIGH); // set HIGH first (relay OFF)
  pinMode(RELAY, OUTPUT);    // then set as output
}
void relayOn()  { digitalWrite(RELAY, LOW);  }
void relayOff() { digitalWrite(RELAY, HIGH); }`,
    },
  },
  {
    id: "relay-esp32-3v3",
    title: "5 V relay module not reliably switching from ESP32 3.3 V GPIO",
    description:
      "Relay module needs 5 V on IN pin to trigger reliably, but ESP32 outputs only 3.3 V.",
    tags: [
      "relay", "esp32", "esp8266", "3.3v", "5v", "voltage",
      "not triggering", "unreliable", "optocoupler",
    ],
    steps: [
      "Check if your relay module has a VCC–JD-VCC jumper — if yes, remove it",
      "Connect JD-VCC to 5 V and VCC to 3.3 V; this powers the relay coil from 5 V and optocoupler from 3.3 V",
      "With the jumper removed the ESP32 3.3 V signal reliably drives the optocoupler",
      "If no jumper exists, use an NPN transistor (e.g. 2N2222) to switch the 5 V signal from the 3.3 V GPIO",
    ],
  },

  // ══ WS2812B LED Strip ═════════════════════════════════════════════════════
  {
    id: "ws2812b-flickering",
    title: "WS2812B (NeoPixel) LEDs flickering or wrong colours",
    description:
      "LEDs flash random colours, flicker, or the first few LEDs work but the rest don't.",
    tags: [
      "ws2812b", "neopixel", "flicker", "colour", "wrong",
      "data", "signal", "capacitor", "resistor",
      "esp32", "uno",
    ],
    steps: [
      "Add a 300–500 Ω resistor in series on the data line close to the first LED",
      "Add a 1000 µF capacitor across VCC and GND at the strip power connection",
      "Power strips > 10 LEDs from a separate 5 V supply, not from the MCU",
      "Keep data wire short — long wires pick up noise; also add a 10 kΩ pull-down to GND on the data line when idle",
      "ESP32 RMT: use pin with RMT support (most GPIOs) with FastLED or Adafruit_NeoPixel",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <FastLED.h>
#define DATA_PIN 6
#define NUM_LEDS 30
CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(50); // start low; 255 needs ~1.8A for 30 LEDs
}`,
    },
  },
  {
    id: "ws2812b-power",
    title: "WS2812B strip works with few LEDs but crashes with more",
    description:
      "Works for 5–10 LEDs but MCU resets or LEDs go dark when more are lit at full brightness.",
    tags: [
      "ws2812b", "neopixel", "power", "current", "supply",
      "reset", "brownout", "brightness",
    ],
    steps: [
      "Each WS2812B LED draws up to 60 mA at full white (20 mA × R, G, B)",
      "30 LEDs at full brightness = 1.8 A — you must use an external 5 V / 3 A+ supply",
      "Connect power at both ends of long strips to prevent voltage drop and colour shift",
      "Limit max brightness in software: FastLED.setBrightness(100) reduces to ~40 % power",
      "Never power more than 10 LEDs from the Arduino/ESP32 5 V pin",
    ],
  },

  // ══ OLED SSD1306 ══════════════════════════════════════════════════════════
  {
    id: "oled-blank-screen",
    title: "OLED SSD1306 shows nothing / blank screen",
    description:
      "OLED display stays dark even though the I2C scanner finds it.",
    tags: [
      "oled_ssd1306", "oled", "blank", "display", "screen",
      "i2c", "0x3c", "0x3d", "address",
      "esp32", "uno", "nano",
    ],
    steps: [
      "Default address is 0x3C; some modules use 0x3D — try both in display.begin(SSD1306_SWITCHCAPVCC, 0x3C)",
      "Call display.display() after drawing — SSD1306 uses a buffer that must be flushed",
      "Call display.clearDisplay() before drawing new content",
      "Ensure VCC is 3.3 V (most modules have onboard regulator so 5 V input is fine)",
      "The Adafruit library requires display.begin() to return true before any drawing works",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Adafruit_SSD1306.h>
Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
  Wire.begin(21, 22);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("SSD1306 not found"); while (1);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Hello World");
  display.display(); // <-- must call this!
}`,
    },
  },
  {
    id: "oled-garbage-display",
    title: "OLED shows random pixels / garbage after a while",
    description:
      "Display works initially but fills with random pixels during operation.",
    tags: [
      "oled_ssd1306", "oled", "garbage", "random", "pixels",
      "noise", "power", "i2c",
    ],
    steps: [
      "Always call clearDisplay() at the start of each full redraw cycle",
      "Add a 100 µF capacitor on the display's VCC line to filter power noise",
      "Reduce I2C clock speed if on long wires: Wire.setClock(100000)",
      "If using SPI mode, ensure CS and DC pins have proper 4.7 kΩ pull-ups",
    ],
  },

  // ══ LCD 16×2 I2C ══════════════════════════════════════════════════════════
  {
    id: "lcd-blank-backlight-on",
    title: "LCD 16×2 backlight on but no text visible",
    description:
      "I2C LCD shows a backlit screen but no characters, or shows blocks in the first row.",
    tags: [
      "lcd_i2c", "lcd", "blank", "backlight", "blocks",
      "contrast", "pcf8574", "i2c", "address",
      "esp32", "uno",
    ],
    steps: [
      "Adjust the blue contrast potentiometer on the I2C backpack until characters appear",
      "Most PCF8574-based backpacks use address 0x27; some use 0x3F — try both",
      "LCD needs 5 V — the I2C backpack usually requires 5 V VCC",
      "On ESP32: pull SDA/SCL to 3.3 V via 4.7 kΩ and the LCD to 5 V; signal levels usually work",
      "Call lcd.begin(16, 2) with the correct column and row count",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2); // try 0x3F if 0x27 fails

void setup() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Hello!");
  // Adjust blue pot on backpack for contrast
}`,
    },
  },

  // ══ HC-05 Bluetooth ═══════════════════════════════════════════════════════
  {
    id: "hc05-not-pairing",
    title: "HC-05 Bluetooth not pairing or pairing fails",
    description:
      "Smartphone or PC can't pair with HC-05, or pairing succeeds but data doesn't transfer.",
    tags: [
      "hc05", "bluetooth", "pairing", "connect", "serial",
      "at", "command", "baud", "uno", "esp32",
    ],
    steps: [
      "Default HC-05 PIN is '1234' (not '0000') — try both",
      "Power cycle the module after pairing fails to clear any stuck state",
      "Verify HC-05 is in data mode (fast blink ~2 Hz) not AT mode (slow blink ~0.5 Hz)",
      "Baud rate: HC-05 defaults to 9600 baud for data — match in Serial.begin(9600)",
      "Use SoftwareSerial on pins 10/11 for Arduino Uno to free up the hardware serial for debugging",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11); // RX=10, TX=11

void setup() {
  Serial.begin(9600);  // USB debug
  bt.begin(9600);      // HC-05 data mode default
}
void loop() {
  if (bt.available()) Serial.write(bt.read());
  if (Serial.available()) bt.write(Serial.read());
}`,
    },
  },

  // ══ NRF24L01 ══════════════════════════════════════════════════════════════
  {
    id: "nrf24-no-communication",
    title: "NRF24L01 modules not communicating",
    description:
      "Two NRF24L01 modules show no data exchange even with the example sketches.",
    tags: [
      "nrf24", "rf24", "wireless", "spi", "ce", "csn",
      "not working", "communication", "power",
      "uno", "esp32",
    ],
    steps: [
      "NRF24L01 is extremely power-sensitive — add a 10 µF + 100 nF cap between VCC (3.3 V) and GND very close to the module",
      "NRF24L01 requires 3.3 V — do NOT connect to 5 V even briefly",
      "SPI pins: SCK, MOSI, MISO are fixed (hardware SPI); CE and CSN are configurable",
      "Both modules must use the same channel, data rate, and payload size",
      "NRF24L01+ PA/LNA module with external antenna: set setPALevel(RF24_PA_LOW) for short-range testing first",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <RF24.h>
RF24 radio(7, 8); // CE=7, CSN=8

void setup() {
  radio.begin();
  radio.setPALevel(RF24_PA_LOW);  // reduce for testing
  radio.setChannel(100);
  radio.openWritingPipe(0xF0F0F0F0E1LL);
  radio.openReadingPipe(1, 0xF0F0F0F0D2LL);
  radio.startListening();
}`,
    },
  },

  // ══ LoRa SX1278 ══════════════════════════════════════════════════════════
  {
    id: "lora-no-packets",
    title: "LoRa SX1278 not receiving packets",
    description:
      "LoRa transmitter sends but receiver never receives, or RSSI is always −∞.",
    tags: [
      "lora", "sx1278", "ra02", "lorawan",
      "packet", "receive", "rssi", "spi", "antenna",
      "esp32", "uno",
    ],
    steps: [
      "Both nodes must have identical frequency (433 MHz for SX1278 / 915 MHz for SX1276), bandwidth, spreading factor, and coding rate",
      "NEVER operate LoRa without an antenna — this can damage the RF stage",
      "SX1278 runs at 3.3 V — use level shifters for all SPI lines if connected to 5 V Arduino",
      "NSS (CS), RESET, DIO0 pins must be connected and configured in the library",
      "Start with default settings (SF7, BW125, CR4/5) before tuning for range",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <LoRa.h>
// TTGO / Heltec board pins:
#define NSS  18
#define RST  14
#define DIO0 26

void setup() {
  LoRa.setPins(NSS, RST, DIO0);
  if (!LoRa.begin(433E6)) { // 433 MHz
    Serial.println("LoRa init failed"); while (1);
  }
  LoRa.setSpreadingFactor(7);
  LoRa.setSignalBandwidth(125E3);
}`,
    },
  },

  // ══ SIM800L ═══════════════════════════════════════════════════════════════
  {
    id: "sim800l-power",
    title: "SIM800L not registering on network / crashing",
    description:
      "SIM800L resets spontaneously, blinks rapidly, or never shows 'CREG: 0,1' network registration.",
    tags: [
      "sim800l", "gsm", "gprs", "network", "power", "lipo",
      "register", "at", "crash", "reset",
    ],
    steps: [
      "SIM800L needs 3.7–4.2 V at up to 2 A peak — a single LiPo cell is ideal",
      "Do NOT power from USB 5 V or Arduino 3.3 V/5 V pins — the current spikes will crash it",
      "Add 1000 µF + 100 nF capacitors very close to SIM800L power pins",
      "After boot wait 5–10 seconds for network registration before sending AT commands",
      "Check SIM lock: AT+CPIN? should return +CPIN: READY",
    ],
  },

  // ══ Raspberry Pi ══════════════════════════════════════════════════════════
  {
    id: "rpi-gpio-permission",
    title: "Raspberry Pi GPIO permission denied",
    description: "Python script throws 'RuntimeError: No access to /dev/mem'.",
    tags: [
      "rpi4", "rpi_zero", "gpio", "permission", "denied",
      "sudo", "python", "gpiozero", "group",
    ],
    steps: [
      "Quick fix: sudo python3 script.py",
      "Permanent fix: sudo usermod -aG gpio,i2c,spi $USER then log out and back in",
    ],
    code: {
      lang: "bash",
      snippet: `sudo usermod -aG gpio,i2c,spi $USER
# log out and back in
groups $USER  # verify`,
    },
  },
  {
    id: "rpi-i2c-not-detected",
    title: "Raspberry Pi I2C device not detected",
    description: "i2cdetect -y 1 shows no devices.",
    tags: [
      "rpi4", "rpi_zero", "rpi_pico",
      "i2c", "detect", "oserror", "enable", "raspi-config",
    ],
    steps: [
      "sudo raspi-config → Interface Options → I2C → Enable → reboot",
      "i2cdetect -y 1 to scan (install: sudo apt install i2c-tools)",
      "Add 4.7 kΩ pull-ups on SDA (pin 3) and SCL (pin 5) to 3.3 V",
    ],
  },
  {
    id: "rpi-wifi-unstable",
    title: "Raspberry Pi WiFi disconnects due to power management",
    description: "Pi drops WiFi periodically because WiFi power management suspends the adapter.",
    tags: ["rpi4", "rpi_zero", "wifi", "disconnect", "power", "management", "wlan"],
    steps: [
      "sudo iwconfig wlan0 power off",
      "Make permanent: add that line to /etc/rc.local before 'exit 0'",
    ],
  },

  // ══ React ══════════════════════════════════════════════════════════════════
  {
    id: "react-useeffect-loop",
    title: "useEffect causing infinite re-render loop",
    description: "Component re-renders endlessly; console shows 'Too many re-renders'.",
    tags: ["react", "useeffect", "infinite", "loop", "dependency", "state"],
    steps: [
      "Always provide a dependency array to useEffect",
      "Don't call setState unconditionally inside useEffect",
      "Wrap callbacks in useCallback and objects in useMemo before using as deps",
    ],
    code: {
      lang: "tsx",
      snippet: `// ✗ Runs every render:
useEffect(() => { fetch('/api'); });

// ✓ Run once on mount:
useEffect(() => { fetch('/api'); }, []);

// ✓ Re-run only when id changes:
useEffect(() => { fetch('/api/' + id); }, [id]);`,
    },
  },
  {
    id: "react-stale-closure",
    title: "State value stuck at initial value inside callback",
    description: "setInterval or event handler always sees the original state value.",
    tags: ["react", "stale", "closure", "state", "setinterval", "callback"],
    steps: [
      "Use functional updater: setState(prev => prev + 1)",
      "Or store value in useRef so callback always reads current ref.current",
    ],
    code: {
      lang: "tsx",
      snippet: `// ✗ Stale:
setInterval(() => setCount(count + 1), 1000);

// ✓ Functional updater:
setInterval(() => setCount(prev => prev + 1), 1000);`,
    },
  },
  {
    id: "react-cors",
    title: "CORS error when fetching API from React app",
    description: "Browser blocks request: 'No Access-Control-Allow-Origin header'.",
    tags: ["react", "cors", "fetch", "blocked", "origin", "proxy"],
    steps: [
      "CORS is server-side — the API must send correct headers",
      "In development add \"proxy\": \"http://localhost:5000\" to package.json (CRA)",
      "In Next.js use an API route as a proxy",
    ],
  },
  {
    id: "react-memory-leak",
    title: "Memory leak — state update on unmounted component",
    description: "'Can't perform a React state update on an unmounted component'",
    tags: ["react", "memory", "leak", "unmounted", "cleanup", "useeffect", "abort"],
    steps: [
      "Use AbortController to cancel fetch requests on unmount",
      "Return cleanup function from useEffect that cancels subscriptions",
    ],
    code: {
      lang: "tsx",
      snippet: `useEffect(() => {
  const ctrl = new AbortController();
  fetch('/api/data', { signal: ctrl.signal })
    .then(r => r.json()).then(setData)
    .catch(e => { if (e.name !== 'AbortError') setError(true); });
  return () => ctrl.abort();
}, []);`,
    },
  },

  // ══ Next.js ══════════════════════════════════════════════════════════════
  {
    id: "nextjs-env-undefined",
    title: "Environment variable undefined in the browser",
    description: "process.env.MY_VAR is undefined in Client Components.",
    tags: ["nextjs", "env", "environment", "variable", "undefined", "next_public"],
    steps: [
      "Client-accessible env vars must be prefixed NEXT_PUBLIC_",
      "Server-only vars (no prefix) are available only in Server Components and Route Handlers",
      "Restart dev server after changing .env.local",
    ],
  },
  {
    id: "nextjs-cors-api",
    title: "Next.js API route returning CORS error",
    description: "Cross-origin requests to Route Handlers are blocked.",
    tags: ["nextjs", "cors", "api", "route", "origin", "options", "preflight"],
    steps: [
      "Add CORS headers to every response",
      "Handle OPTIONS preflight with a 204 response",
    ],
    code: {
      lang: "typescript",
      snippet: `const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
export async function GET() {
  return Response.json({ ok: true }, { headers: CORS });
}`,
    },
  },
  {
    id: "nextjs-hydration",
    title: "Hydration mismatch error",
    description: "Server HTML doesn't match client render.",
    tags: ["nextjs", "react", "hydration", "mismatch", "ssr", "window", "date"],
    steps: [
      "Never use Date.now(), Math.random(), or window in initial render",
      "Wrap browser-only code in useEffect",
      "Use dynamic() with ssr: false for browser-only components",
    ],
    code: {
      lang: "tsx",
      snippet: `// ✗ Differs server/client:
<p>Time: {Date.now()}</p>

// ✓ Client-only:
const [ts, setTs] = useState<number|null>(null);
useEffect(() => setTs(Date.now()), []);
<p>Time: {ts ?? '—'}</p>`,
    },
  },

  // ══ REST API ══════════════════════════════════════════════════════════════
  {
    id: "http-401-403",
    title: "API returning 401 Unauthorized or 403 Forbidden",
    description: "401 = not authenticated; 403 = authenticated but no permission.",
    tags: ["api", "rest", "401", "403", "unauthorized", "forbidden", "token", "bearer"],
    steps: [
      "401: Send token as 'Authorization: Bearer TOKEN' header",
      "Check token expiry — decode JWT at jwt.io",
      "403: Check user roles/scopes in API dashboard",
    ],
  },
  {
    id: "http-timeout",
    title: "API request hangs / never resolves",
    description: "fetch() has no built-in timeout — requests can hang indefinitely.",
    tags: ["api", "rest", "timeout", "hang", "fetch", "abort", "signal"],
    steps: ["Use AbortController with setTimeout for fetch timeout"],
    code: {
      lang: "typescript",
      snippet: `async function fetchWithTimeout(url: string, ms = 5000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(id); return res;
  } catch(e) { clearTimeout(id); throw e; }
}`,
    },
  },
  {
    id: "http-rate-limit",
    title: "API rate limiting — 429 Too Many Requests",
    description: "API returns 429 when request rate exceeds the allowed limit.",
    tags: ["api", "rest", "429", "rate", "limit", "throttle", "retry", "backoff"],
    steps: [
      "Read Retry-After header and wait that many seconds",
      "Implement exponential backoff: 1s → 2s → 4s",
      "Cache responses to reduce request frequency",
    ],
  },

  // ══ WebSocket ══════════════════════════════════════════════════════════════
  {
    id: "ws-connection-refused",
    title: "WebSocket connection refused",
    description: "'WebSocket connection failed' in browser console.",
    tags: ["websocket", "ws", "connection", "refused", "blocked", "nginx", "upgrade"],
    steps: [
      "Server must handle HTTP→WS Upgrade handshake",
      "NGINX: add proxy_http_version 1.1 and Upgrade/Connection headers",
      "Use wss:// on HTTPS pages",
    ],
    code: {
      lang: "nginx",
      snippet: `location /ws {
  proxy_pass http://localhost:3001;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_read_timeout 86400;
}`,
    },
  },
  {
    id: "ws-reconnect",
    title: "WebSocket no auto-reconnect on disconnect",
    description: "Connection drops and client never reconnects.",
    tags: ["websocket", "ws", "reconnect", "disconnect", "close", "retry"],
    steps: [
      "Listen to 'close' event and reconnect with exponential backoff",
      "Re-register all event listeners after reconnection",
    ],
    code: {
      lang: "typescript",
      snippet: `let delay = 1000;
function connect(url: string) {
  const ws = new WebSocket(url);
  ws.onopen = () => { delay = 1000; };
  ws.onclose = () => {
    setTimeout(() => connect(url), delay);
    delay = Math.min(delay * 2, 30000);
  };
}`,
    },
  },
];

// ── Search ───────────────────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,./\-_:;()[\]{}|+]+/)
    .filter((t) => t.length > 2);
}

/**
 * Find problems relevant to a hardware combination + optional query.
 * mcuId and componentIds filter the pool; query re-ranks within it.
 */
export function searchProblems(
  mcuId: string | null,
  componentIds: string[],
  query: string,
  limit = 8
): Problem[] {
  const activeTags = new Set<string>([
    ...(mcuId ? [mcuId] : []),
    ...componentIds,
  ]);

  // Build pool: problems that mention at least one active tag
  let pool: Problem[];
  if (activeTags.size === 0) {
    pool = ALL_PROBLEMS;
  } else {
    pool = ALL_PROBLEMS.filter((p) =>
      p.tags.some((t) => activeTags.has(t))
    );
  }

  if (!query.trim()) return pool.slice(0, limit);

  const tokens = tokenize(query);
  const scored = pool.map((p) => {
    let score = 0;
    // Boost when multiple active tags match
    for (const tag of p.tags) {
      if (activeTags.has(tag)) score += 2;
    }
    // Score by query tokens
    for (const token of tokens) {
      for (const tag of p.tags) {
        if (tag === token) score += 3;
        else if (tag.includes(token) || token.includes(tag)) score += 1;
      }
      for (const word of tokenize(p.title)) {
        if (word === token) score += 2;
        else if (word.includes(token) || token.includes(word)) score += 1;
      }
    }
    return { problem: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.problem);
}

/** Search within a web domain using only keyword query. */
export function searchWebProblems(domain: WebDomain, query: string, limit = 6): Problem[] {
  const pool = ALL_PROBLEMS.filter((p) =>
    domain.filterTags.some((ft) => p.tags.some((t) => t.includes(ft) || ft.includes(t)))
  );
  if (!query.trim()) return pool.slice(0, limit);

  const tokens = tokenize(query);
  const scored = pool.map((p) => {
    let score = 0;
    for (const token of tokens) {
      for (const tag of p.tags) {
        if (tag === token) score += 3;
        else if (tag.includes(token) || token.includes(tag)) score += 1;
      }
    }
    return { problem: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.problem);
}
