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

export interface DiagnosticNode {
  id: string;
  question: string;
  options: {
    label: string;
    nextId?: string;
    result?: {
      title: string;
      fix: string;
      code?: { lang: string; snippet: string };
    };
  }[];
}

export interface DiagnosticTree {
  id: string;
  label: string;
  icon: string;
  startNodeId: string;
  nodes: DiagnosticNode[];
}

export const DIAGNOSTIC_TREES: DiagnosticTree[] = [
  {
    id: "iot_power",
    label: "Power & Connection",
    icon: "🔌",
    startNodeId: "power_check",
    nodes: [
      {
        id: "power_check",
        question: "Is the onboard Power LED (usually red or blue) currently lit?",
        options: [
          { label: "Yes, it's solid", nextId: "serial_check" },
          { label: "No, it's completely off", nextId: "no_power" },
          { label: "It's blinking rapidly", nextId: "brownout" },
        ],
      },
      {
        id: "serial_check",
        question: "When you plug it into your PC, does a new COM/Serial port appear?",
        options: [
          { label: "Yes, I see the port", nextId: "upload_check" },
          { label: "No port appears", nextId: "no_port" },
        ],
      },
      {
        id: "no_power",
        question: "Check your cable. Is it a data cable or just a charging cable?",
        options: [
          { 
            label: "It's a verified data cable", 
            result: { 
              title: "Fuse or Regulator Failure", 
              fix: "Your board's voltage regulator or polyfuse might be blown. Try powering via the 5V/VIN pin directly with a regulated 5V source. If it still doesn't light up, the high-side MOSFET is likely dead."
            } 
          },
          { 
            label: "Actually, it's a cheap charging cable", 
            result: { 
              title: "Cable Restriction", 
              fix: "Many cheap micro-USB cables lack the D+/D- data lines. Swap for a high-quality braided data cable to enable both power and serial communication."
            } 
          },
        ],
      },
      {
        id: "brownout",
        question: "Are you powering any motors or high-current LEDs from the board?",
        options: [
          { 
            label: "Yes, a few servos/LEDs", 
            result: { 
              title: "Brownout Detected", 
              fix: "The onboard regulator can only handle ~500mA. Your components are pulling the voltage down, causing a reboot loop.",
              code: { lang: "cpp", snippet: "// Solution: Use an external power source\n// Common Ground is REQUIRED\n// LiPo -> DC Converter -> VIN" }
            } 
          },
          { label: "No, just the board", nextId: "bad_regulator" },
        ],
      },
    ],
  },
  {
    id: "web_cors",
    label: "API / CORS Issues",
    icon: "🌐",
    startNodeId: "cors_check",
    nodes: [
      {
        id: "cors_check",
        question: "Does the error console say 'Blocked by CORS policy'?",
        options: [
          { label: "Yes, exactly that", nextId: "backend_check" },
          { label: "No, it's a 404 or 500", nextId: "route_check" },
        ],
      },
      {
        id: "backend_check",
        question: "Do you have access to the backend code?",
        options: [
          { 
            label: "Yes, I'm the dev", 
            result: { 
              title: "Header Configuration", 
              fix: "Add the 'Access-Control-Allow-Origin' header to your response. For development, you can use '*'.",
              code: { lang: "javascript", snippet: "res.setHeader('Access-Control-Allow-Origin', '*');" }
            } 
          },
          { 
            label: "No, it's a public API", 
            result: { 
              title: "Proxy Required", 
              fix: "Public APIs often restrict browser access. You need to route your request through a backend proxy or use a service like 'cors-anywhere'."
            } 
          },
        ],
      },
    ],
  },
];

export interface LearnSection {
  title: string;
  body: string;
  code?: { lang: string; snippet: string };
}

export interface Bot {
  id: string;
  label: string;
  icon: string;
  category: "Mobile" | "Arm" | "Specialized" | "Experimental";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  description: string;
  /** Short hardware overview shown on bot card */
  hardware: string[];
  /** Problem tags that belong to this bot — used to filter ALL_PROBLEMS */
  problemTags: string[];
  quickFills: string[];
  /** Step-by-step learning guide for this bot */
  learnSections: LearnSection[];
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
    id: "esp32s3",
    label: "ESP32-S3",
    group: "ESP",
    icon: "📡",
    voltage: "3.3 V",
    description: "Native USB, AI instructions, WiFi+BLE",
  },
  {
    id: "esp32c3",
    label: "ESP32-C3",
    group: "ESP",
    icon: "📡",
    voltage: "3.3 V",
    description: "RISC-V core, WiFi+BLE, power efficient",
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
    id: "leonardo",
    label: "Leonardo",
    group: "Arduino",
    icon: "🔵",
    voltage: "5 V",
    description: "ATmega32U4, Native USB HID",
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
  // ARM & Specialized
  {
    id: "stm32",
    label: "STM32F103",
    group: "ARM / Others",
    icon: "⚡",
    voltage: "3.3 V",
    description: "Blue Pill, Cortex-M3, 72 MHz",
  },
  {
    id: "teensy41",
    label: "Teensy 4.1",
    group: "ARM / Others",
    icon: "🚀",
    voltage: "3.3 V",
    description: "Cortex-M7, 600 MHz, high-perf",
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
      {
        id: "bmp180",
        label: "BMP180",
        icon: "⛰️",
        voltage: "3.3 V",
        interface: "I2C",
        description: "Temp + barometric pressure",
      },
      {
        id: "ldr",
        label: "LDR",
        icon: "☀️",
        voltage: "3.3–5 V",
        interface: "Analog",
        description: "Light-dependent resistor, photocell",
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
      {
        id: "adxl345",
        label: "ADXL345",
        icon: "📐",
        voltage: "3.3–5 V",
        interface: "I2C / SPI",
        description: "3-axis accelerometer, ±16 g",
      },
      {
        id: "l3g4200d",
        label: "L3G4200D",
        icon: "🌀",
        voltage: "3.3 V",
        interface: "I2C / SPI",
        description: "3-axis gyroscope, ±2000 °/s",
      },
      {
        id: "hmc5883l",
        label: "HMC5883L",
        icon: "🧭",
        voltage: "3.3 V",
        interface: "I2C",
        description: "3-axis magnetometer / compass",
      },
      {
        id: "vcnl4000",
        label: "VCNL4000",
        icon: "👋",
        voltage: "3.3 V",
        interface: "I2C",
        description: "Proximity + ambient light sensor",
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
      {
        id: "neo6m",
        label: "NEO-6M GPS",
        icon: "🛰️",
        voltage: "3.3–5 V",
        interface: "UART",
        description: "GPS module, ±2.5 m accuracy",
      },
    ],
  },
  {
    id: "input",
    label: "Light, Sound & Input",
    components: [
      {
        id: "lm393",
        label: "LM393 Sound",
        icon: "🎤",
        voltage: "3.3–5 V",
        interface: "Analog / GPIO",
        description: "Sound level sensor, clap detect",
      },
      {
        id: "tsop1738",
        label: "TSOP1738",
        icon: "📻",
        voltage: "5 V",
        interface: "GPIO",
        description: "IR remote receiver, 38 kHz",
      },
      {
        id: "ttp223",
        label: "TTP223",
        icon: "👆",
        voltage: "2.0–5.5 V",
        interface: "GPIO",
        description: "Capacitive touch sensor module",
      },
    ],
  },
  {
    id: "ir_sensors",
    label: "Line & IR Sensors",
    components: [
      {
        id: "ir_array_5ch",
        label: "5-ch IR Array",
        icon: "〰️",
        voltage: "5 V",
        interface: "Analog / GPIO",
        description: "5-sensor line-follower array",
      },
      {
        id: "ir_array_8ch",
        label: "QTR-8A / 8-ch IR",
        icon: "〰️",
        voltage: "5 V",
        interface: "Analog",
        description: "8-sensor reflectance array (Pololu)",
      },
      {
        id: "tcrt5000_single",
        label: "TCRT5000 Single",
        icon: "↔️",
        voltage: "5 V",
        interface: "Analog / GPIO",
        description: "Single IR reflective sensor",
      },
      {
        id: "sharp_ir",
        label: "Sharp GP2Y0A21",
        icon: "📏",
        voltage: "5 V",
        interface: "Analog",
        description: "10–80 cm analog IR distance",
      },
    ],
  },
  {
    id: "motor_drivers",
    label: "Motor Drivers",
    components: [
      {
        id: "bts7960",
        label: "BTS7960 (IBT-2)",
        icon: "⚡",
        voltage: "6–27 V",
        interface: "GPIO + PWM",
        description: "43 A dual H-bridge, RC/soccer bots",
      },
      {
        id: "tb6612fng",
        label: "TB6612FNG",
        icon: "🔄",
        voltage: "2.5–13.5 V",
        interface: "GPIO + PWM",
        description: "Efficient dual H-bridge, 1.2 A",
      },
      {
        id: "l9110s",
        label: "L9110S",
        icon: "🔄",
        voltage: "2.5–12 V",
        interface: "GPIO + PWM",
        description: "Dual H-bridge, 800 mA, tiny",
      },
      {
        id: "mx1508",
        label: "MX1508",
        icon: "🔄",
        voltage: "2–10 V",
        interface: "GPIO + PWM",
        description: "Dual H-bridge, 1.5 A, cheap",
      },
      {
        id: "afmotor",
        label: "Adafruit Motor Shield",
        icon: "🛡️",
        voltage: "5–12 V",
        interface: "I2C / SPI",
        description: "L293D-based shield, 4 DC / 2 stepper",
      },
      {
        id: "tb6600",
        label: "TB6600",
        icon: "🚂",
        voltage: "9–42 V",
        interface: "DIR / STEP / EN",
        description: "High-current stepper driver, 4 A",
      },
    ],
  },
  {
    id: "dc_motors",
    label: "DC & Geared Motors",
    components: [
      {
        id: "n20_motor",
        label: "N20 Geared Motor",
        icon: "⚙️",
        voltage: "3–12 V",
        interface: "DC (2-wire)",
        description: "Micro geared DC, line followers",
      },
      {
        id: "johnson_motor",
        label: "Johnson DC Motor",
        icon: "⚙️",
        voltage: "6–12 V",
        interface: "DC (2-wire)",
        description: "RS-550/775, high-speed brushed",
      },
      {
        id: "tt_motor",
        label: "TT Gear Motor",
        icon: "⚙️",
        voltage: "3–6 V",
        interface: "DC (2-wire)",
        description: "Yellow smart car gear motor",
      },
      {
        id: "brushless_esc",
        label: "Brushless + ESC",
        icon: "🚀",
        voltage: "7.4–11.1 V",
        interface: "PWM (ESC signal)",
        description: "BLDC motor with ESC, RC race bot",
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

// ── Bots ────────────────────────────────────────────────────────────────────

export const BOTS: Bot[] = [
  {
    id: "line_follower",
    label: "Line Follower",
    icon: "〰️",
    category: "Mobile",
    difficulty: "Beginner",
    estimatedTime: "45 mins",
    description: "PID-controlled robot that follows a black line on white surface using IR sensor array.",
    hardware: ["Arduino Nano/Uno", "5-ch or 8-ch IR array", "L298N / TB6612FNG", "N20 geared motors", "LiPo 7.4 V"],
    problemTags: ["line_follower", "ir_array", "pid", "n20_motor", "l298n", "tb6612fng"],
    quickFills: ["IR sensors always read same value", "Bot oscillates on line", "Bot loses line on sharp turn", "PID tuning Kp too high"],
    learnSections: [
      {
        title: "How it works",
        body: "A line follower reads an array of IR sensors pointed at the ground. White surface reflects IR → sensor reads LOW. Black line absorbs IR → sensor reads HIGH. The bot calculates the line's position relative to center (error), then uses PID to steer the motors to correct that error. The faster it corrects, the smoother the tracking.",
      },
      {
        title: "Parts list & wiring",
        body: `You need:\n• Arduino Nano or Uno\n• 5-channel IR sensor array (e.g. TCRT5000 ×5 on a PCB)\n• L298N or TB6612FNG motor driver\n• 2× N20 geared motors (100–300 RPM) with wheels\n• LiPo 7.4 V 1000–1500 mAh (25C+)\n• 5 V BEC/buck converter for the Arduino\n\nWiring:\n• Sensor array → Arduino A0–A4 (analog)\n• Motor driver IN1/IN2/IN3/IN4 → Arduino D5–D8\n• Motor driver ENA/ENB → Arduino D9/D10 (PWM)\n• Motors → Motor driver OUT1/OUT2, OUT3/OUT4\n• LiPo → Motor driver power input\n• BEC 5 V output → Arduino VIN (or 5 V pin)`,
      },
      {
        title: "Sensor calibration",
        body: "Before running PID, calibrate the sensors. Place the robot over the line and scan side-to-side to record the min (white) and max (black) analog value for each sensor. Normalize readings to 0–1000 range. The QTRSensors library handles this automatically. Manual calibration: store minVal[] and maxVal[], then map analogRead to 0–1000.",
        code: {
          lang: "cpp",
          snippet: `int minVal[5] = {1023,1023,1023,1023,1023};
int maxVal[5] = {0,0,0,0,0};

void calibrate() {
  // Move robot over line for 2 s while calling this
  for (int i = 0; i < 5; i++) {
    int v = analogRead(A0 + i);
    if (v < minVal[i]) minVal[i] = v;
    if (v > maxVal[i]) maxVal[i] = v;
  }
}

int normalized(int i) {
  int v = analogRead(A0 + i);
  return map(v, minVal[i], maxVal[i], 0, 1000);
}`,
        },
      },
      {
        title: "Line position & error",
        body: "Calculate a weighted average of sensor readings to get the line position as a single number. For 5 sensors at positions [0, 1000, 2000, 3000, 4000], center = 2000. Error = position − 2000. This gives a signed error: negative means line is left, positive means line is right.",
        code: {
          lang: "cpp",
          snippet: `int linePosition() {
  long weighted = 0, total = 0;
  for (int i = 0; i < 5; i++) {
    int v = normalized(i);
    weighted += (long)v * i * 1000;
    total += v;
  }
  if (total == 0) return lastPos; // line lost
  lastPos = weighted / total;    // 0–4000, center=2000
  return lastPos;
}

// Error: negative = line left of center, positive = right
int error = linePosition() - 2000;`,
        },
      },
      {
        title: "PID control loop",
        body: "Start with only P (set Ki=0, Kd=0). Raise Kp until the bot follows the line but oscillates, then back off 30%. Add Kd (try Kd = 5–10×Kp) to damp oscillation. Add Ki only if there's consistent drift. Run the loop at 50–100 Hz (10–20 ms delay). Increase base speed gradually — re-tune Kp each time you raise speed.",
        code: {
          lang: "cpp",
          snippet: `float Kp=0.4, Ki=0.0001, Kd=2.0;
float lastErr=0, integral=0;
int BASE=120;

void loop() {
  float err = linePosition() - 2000;
  integral = constrain(integral + err, -500, 500);
  float correction = Kp*err + Ki*integral + Kd*(err-lastErr);
  lastErr = err;

  int L = constrain(BASE + correction, 0, 255);
  int R = constrain(BASE - correction, 0, 255);
  setMotors(L, R);
  delay(10);
}`,
        },
      },
    ],
  },
  {
    id: "maze_solver",
    label: "Maze Solver",
    icon: "🧩",
    category: "Mobile",
    difficulty: "Intermediate",
    estimatedTime: "1.5 hours",
    description: "Robot navigates a maze using left-hand rule or flood-fill algorithm with IR sensors.",
    hardware: ["Arduino Mega", "3× TCRT5000 or 5-ch array", "L298N", "N20 or TT motors", "LiPo 7.4 V"],
    problemTags: ["maze_solver", "ir_array", "pid", "junction", "n20_motor", "l298n"],
    quickFills: ["Junction not detected", "Bot turns wrong direction", "False junction detection", "Bot stuck in dead end"],
    learnSections: [
      {
        title: "How it works",
        body: "A maze solver follows lines but must also navigate junctions (T, cross, left-only, right-only). The Left-Hand Rule (LHR) is the simplest algorithm: at every junction, prefer left. This guarantees solving any simply-connected maze. At dead ends, turn around (U-turn). After solving once, the bot can replay the optimal path by trimming U-turns from the recorded path.",
      },
      {
        title: "Sensor setup",
        body: `You need at least 3 sensors: Left (L), Center (C), Right (R). A 5-channel array works better:\n• Sensor 0 (far-left) — detects left junction\n• Sensor 1 — left of center\n• Sensor 2 — center\n• Sensor 3 — right of center\n• Sensor 4 (far-right) — detects right junction\n\nMount the array 5–8 mm above the ground, centered under the chassis. For junction detection you need the outermost sensors to extend wider than the line width (line ≈ 20 mm, array span ≈ 80 mm+).`,
      },
      {
        title: "Junction detection",
        body: "Read all 5 sensors. A junction is detected when the outer sensors (S0 or S4) see black while the center (S2) also sees black. Dead end = all sensors see white. Straight = only center sensors active. Add 50–100 ms of forward movement after detecting a junction before executing the turn, to position the pivot over the center of the intersection.",
        code: {
          lang: "cpp",
          snippet: `#define LEFT  0
#define RIGHT 4
#define CTR   2

enum Junction { STRAIGHT, LEFT_TURN, RIGHT_TURN, T_JUNC, CROSS, DEAD_END };

Junction detect(int* s) {
  bool l = s[LEFT] > 500, r = s[RIGHT] > 500, c = s[CTR] > 500;
  if (!c && !l && !r) return DEAD_END;
  if (l && r && c)    return CROSS;
  if (l && c)         return LEFT_TURN;
  if (r && c)         return RIGHT_TURN;
  return STRAIGHT;
}`,
        },
      },
      {
        title: "Left-Hand Rule navigation",
        body: "At each junction, follow this priority: 1) Turn left if possible, 2) Go straight if no left, 3) Turn right if no straight, 4) U-turn if dead end. Record each move ('L', 'S', 'R', 'B') in a path array. After reaching the end, simplify the path: any sequence like 'LBR' = 'S' (shortcut), 'LBS' = 'R', 'RBL' = 'S', 'SBL' = 'R', etc.",
        code: {
          lang: "cpp",
          snippet: `char path[64]; int pathLen = 0;

void simplify() {
  // Combine last 3 moves when middle is B (back/U-turn)
  if (pathLen < 3 || path[pathLen-2] != 'B') return;
  int total = 0;
  char moves[] = {path[pathLen-3], path[pathLen-1]};
  // angle: L=270, S=0, R=90, B=180
  int angles[] = {0,0};
  for (int i=0;i<2;i++) {
    if(moves[i]=='L') angles[i]=270;
    else if(moves[i]=='S') angles[i]=0;
    else if(moves[i]=='R') angles[i]=90;
    else angles[i]=180;
  }
  int combined = (angles[0] + 180 + angles[1]) % 360;
  char c = combined==0?'S': combined==90?'R': combined==270?'L':'B';
  path[pathLen-3] = c;
  pathLen -= 2;
}`,
        },
      },
      {
        title: "Speed & timing tips",
        body: "Slow down to 60–80 PWM when approaching junctions (detect increasing outer sensor activity). Execute turns by running one motor forward and the other in reverse for a fixed time (calibrate to ~90°). Use a short burst of PID line-following after the turn to re-acquire the line. Typical junction turn time: 300–500 ms depending on motor speed and chassis weight.",
      },
    ],
  },
  {
    id: "rc_race_bot",
    label: "RC Race Bot",
    icon: "🏎️",
    category: "Mobile",
    difficulty: "Intermediate",
    estimatedTime: "2 hours",
    description: "Remote-controlled high-speed bot using ESP-NOW wireless or RF remote with brushless or brushed motors.",
    hardware: ["ESP32 (×2 for ESP-NOW)", "BTS7960 / ESC", "Johnson / Brushless motor", "LiPo 11.1 V", "Servo for steering"],
    problemTags: ["rc_bot", "esp_now", "bts7960", "brushless_esc", "johnson_motor", "wireless"],
    quickFills: ["ESP-NOW not connecting", "Motor only goes one direction", "Bot drifts left/right", "LiPo brownout under load"],
    learnSections: [
      {
        title: "Architecture overview",
        body: "An RC bot has two ESP32s: Transmitter (handheld controller) and Receiver (on the bot). They talk over ESP-NOW — a peer-to-peer protocol with ~1 ms latency, no router needed. The transmitter reads joystick/potentiometer values and sends a struct every 20 ms. The receiver unpacks the struct and drives the motor driver and steering servo.",
      },
      {
        title: "ESP-NOW setup",
        body: "Get the receiver's MAC address by uploading a simple sketch that prints WiFi.macAddress(). Hardcode this in the transmitter. Both boards call WiFi.mode(WIFI_STA) and esp_now_init(). The transmitter registers the receiver as a peer and calls esp_now_send(). The receiver registers a receive callback with esp_now_register_recv_cb().",
        code: {
          lang: "cpp",
          snippet: `// ── Transmitter ──────────────────────────────────────
#include <esp_now.h>
#include <WiFi.h>

uint8_t recvMAC[] = {0xAA,0xBB,0xCC,0xDD,0xEE,0xFF}; // replace!
typedef struct { int throttle; int steering; } Ctrl;
Ctrl ctrl;

void setup() {
  WiFi.mode(WIFI_STA);
  esp_now_init();
  esp_now_peer_info_t peer{};
  memcpy(peer.peer_addr, recvMAC, 6);
  esp_now_add_peer(&peer);
}
void loop() {
  ctrl.throttle = map(analogRead(34), 0, 4095, -255, 255);
  ctrl.steering = map(analogRead(35), 0, 4095, 0, 180);
  esp_now_send(recvMAC, (uint8_t*)&ctrl, sizeof(ctrl));
  delay(20);
}

// ── Receiver ─────────────────────────────────────────
typedef struct { int throttle; int steering; } Ctrl;
Ctrl incoming;

void onRecv(const uint8_t*, const uint8_t* data, int len) {
  memcpy(&incoming, data, len);
}
void setup() {
  WiFi.mode(WIFI_STA);
  esp_now_init();
  esp_now_register_recv_cb(onRecv);
}`,
        },
      },
      {
        title: "BTS7960 motor driver wiring",
        body: `The IBT-2 (BTS7960) module has 6 signal pins:\n• RPWM — forward PWM (0–255)\n• LPWM — reverse PWM (0–255)\n• R_EN — right half-bridge enable (tie to 3.3 V)\n• L_EN — left half-bridge enable (tie to 3.3 V)\n• R_IS, L_IS — current sense (optional, connect to analog pin)\n\nPower: B+ to LiPo positive, GND to common ground. Motor terminals to motor. Never set RPWM and LPWM both > 0 at the same time — this causes a shoot-through fault.`,
        code: {
          lang: "cpp",
          snippet: `const int RPWM=25, LPWM=26;

void driveMotor(int speed) { // -255 to +255
  if (speed > 0) {
    ledcWrite(0, speed); // RPWM channel
    ledcWrite(1, 0);     // LPWM channel
  } else {
    ledcWrite(0, 0);
    ledcWrite(1, -speed);
  }
}

void setup() {
  ledcAttach(RPWM, 1000, 8); // pin, freq, resolution
  ledcAttach(LPWM, 1000, 8);
}`,
        },
      },
      {
        title: "Steering servo + throttle curve",
        body: "Connect a servo to the steering mechanism. Map incoming steering value (0–180) to the servo angle, centered at 90°. Apply a throttle deadband (±10 around zero) to prevent slow creep. Add an expo curve to make small stick movements gentler at high speed.",
        code: {
          lang: "cpp",
          snippet: `#include <ESP32Servo.h>
Servo steer;

void setup() { steer.attach(18); }

void loop() {
  // Deadband
  int thr = incoming.throttle;
  if (abs(thr) < 10) thr = 0;
  driveMotor(thr);
  steer.write(incoming.steering); // 0–180
}`,
        },
      },
      {
        title: "LiPo safety",
        body: "A 3S LiPo (11.1 V nominal) must never discharge below 3.0 V/cell (9.0 V total) or it suffers permanent capacity loss. Add a LiPo alarm buzzer to the balance connector — it beeps when any cell drops below 3.5 V. Use XT60 connectors (rated to 60 A) for the main power leads. Always add a main power switch and a fuse (30–40 A blade fuse) in the positive lead.",
      },
    ],
  },
  {
    id: "soccer_bot",
    label: "Soccer Bot",
    icon: "⚽",
    category: "Mobile",
    difficulty: "Advanced",
    estimatedTime: "4 hours",
    description: "Competitive soccer robot with IR ball tracking, opponent detection, and differential drive.",
    hardware: ["Arduino Mega / ESP32", "BTS7960 dual H-bridge", "Johnson 550 motors", "IR ball sensor", "LiPo 11.1 V"],
    problemTags: ["soccer_bot", "bts7960", "johnson_motor", "esp_now", "ir_ball", "differential"],
    quickFills: ["Bot spins in place", "Motors going same direction", "Ball not detected", "ESP-NOW latency too high"],
    learnSections: [
      {
        title: "How it works",
        body: "A soccer bot uses an IR 1200 Hz ball (standard in RoboCup Jr) and a ring of IR receivers (TSOP1140 or SFH5110-38) to detect the ball direction. It uses differential drive (two powered wheels, one caster) to navigate and dribble. The attacker always chases the ball and shoots; the defender stays near the goal and intercepts.",
      },
      {
        title: "IR ball detection ring",
        body: `Mount 8–16 TSOP1140 IR receivers evenly around the robot perimeter facing outward. The ball transmits at 1200 Hz. Each receiver outputs LOW when it sees the ball signal. The strongest signal (or the pair of receivers that both see signal) indicates ball direction. Multiply by 45° (for 8 sensors) to get the bearing.\n\nAlternative: use a commercial IR ball sensor module (like the one from RoboCup kits) that outputs a 4-bit direction code over I2C.`,
        code: {
          lang: "cpp",
          snippet: `const int IR_PINS[] = {22,23,24,25,26,27,28,29}; // 8 sensors
const int DIRS[]    = {0, 45, 90,135,180,225,270,315};

int ballDirection() {
  int best = -1, bestCount = 0;
  for (int i=0; i<8; i++) {
    if (digitalRead(IR_PINS[i]) == LOW) { // active low
      if (++bestCount > best) { best = bestCount; bestI = i; }
    }
  }
  return best == -1 ? -1 : DIRS[bestI];
}`,
        },
      },
      {
        title: "Differential drive for omnidirectional movement",
        body: "Standard differential drive (2 wheels) can only move forward/backward and turn. For soccer, consider a 3-wheel or 4-wheel omnidirectional drive with omni-wheels — this allows sideways movement. With 4 omni-wheels at 45°, you can move in any direction without turning. Each wheel gets its own motor driver and PWM. The math: decompose desired velocity vector into wheel speeds using rotation matrices.",
        code: {
          lang: "cpp",
          snippet: `// 4-wheel omnidirectional — wheel angles: 45, 135, 225, 315°
void omniDrive(float vx, float vy, float omega) {
  // vx: right, vy: forward, omega: CCW rotation
  float w[4];
  w[0] =  vx + vy + omega; // front-right (45°)
  w[1] = -vx + vy + omega; // front-left  (135°)
  w[2] = -vx - vy + omega; // back-left   (225°)
  w[3] =  vx - vy + omega; // back-right  (315°)
  // Scale to -255..255 and write to motor drivers
  float maxW = max({abs(w[0]),abs(w[1]),abs(w[2]),abs(w[3]),1.0f});
  for (int i=0;i<4;i++) setMotor(i, (int)(w[i]/maxW*255));
}`,
        },
      },
      {
        title: "Attacker strategy",
        body: "Simple attacker logic: 1) Face the ball (turn until ball is at 0°), 2) Drive toward ball, 3) When ball is close and goal is roughly ahead, sprint forward (shoot). Use the compass module (HMC5883L or QMC5883L over I2C) to know absolute heading so you always know which direction is 'goal'. Add a dribbler bar (a small spinning roller) at the front to control the ball.",
      },
      {
        title: "ESP-NOW multi-robot communication",
        body: "In a 2v2 game, robots can coordinate over ESP-NOW. The attacker broadcasts its position and ball bearing; the defender uses this to position itself. Keep packets small (< 20 bytes) and send at 20–50 Hz. Use separate WiFi channels if running two teams in the same venue. Add a 3-second timeout: if no packet received, act independently.",
      },
    ],
  },
  {
    id: "pick_and_place",
    label: "Pick & Place Bot",
    icon: "🦾",
    category: "Arm",
    difficulty: "Advanced",
    estimatedTime: "3 hours",
    description: "Robotic arm on a chassis that picks and places objects using servos and DC motors.",
    hardware: ["Arduino Mega / Uno", "Adafruit Motor Shield v2", "MG996R servos (×3–4)", "L293D / L298N", "12 V DC supply"],
    problemTags: ["pick_place", "servo_mg996r", "afmotor", "timer_conflict", "i2c"],
    quickFills: ["Servo jitters with motors running", "AFMotor + Servo conflict", "Arm overshoots position", "Servo buzzes at rest"],
    learnSections: [
      {
        title: "How it works",
        body: "A pick & place bot has two systems: a mobile chassis (DC motors) and a robotic arm (servos). The arm typically has 3–4 degrees of freedom: base rotation, shoulder, elbow, and gripper. The bot drives to a target position, positions the arm over the object, closes the gripper, then drives to the drop zone and releases. Simple implementations use fixed pre-programmed positions.",
      },
      {
        title: "Arm design & servo selection",
        body: `3-DOF arm for a small pick & place:\n• Base rotation — MG996R (metal gear, 10 kg·cm)\n• Shoulder — MG996R (takes most load)\n• Elbow — SG90 or MG90S (lighter load)\n• Gripper — SG90 (open/close only)\n\nMount the shoulder servo as low as possible to reduce torque on the base. Use servo brackets (aluminum "U" channels) for rigid links. Keep the arm lightweight — each extra 10 g at the tip adds ~1 kg·cm of torque on the shoulder at full extension (30 cm arm = 3 kg·cm extra load).`,
      },
      {
        title: "Motor Shield v2 setup",
        body: "Use the Adafruit Motor Shield v2 (PCA9685 I2C) to avoid the Timer 1 conflict with the Servo library. The shield controls up to 4 DC motors and 2 steppers via I2C — no timer conflicts with servos. Stack the shield on the Arduino Mega. Default I2C address is 0x60 (change A0–A4 solder pads to run multiple shields).",
        code: {
          lang: "cpp",
          snippet: `#include <Adafruit_MotorShield.h>
#include <Servo.h>

Adafruit_MotorShield AFMS = Adafruit_MotorShield();
Adafruit_DCMotor *motorL = AFMS.getMotor(1);
Adafruit_DCMotor *motorR = AFMS.getMotor(2);

Servo shoulder, elbow, gripper;

void setup() {
  AFMS.begin(); // I2C — no Timer 1 conflict
  shoulder.attach(9);
  elbow.attach(10);
  gripper.attach(11);
  motorL->setSpeed(200);
  motorR->setSpeed(200);
}`,
        },
      },
      {
        title: "Inverse kinematics (simple 2-link arm)",
        body: "For a 2-link arm (shoulder + elbow), given a target (x, y) position, use geometry to find joint angles. Let L1 = upper arm length, L2 = forearm length. The elbow angle uses the law of cosines. The shoulder angle combines the base angle and elbow contribution. This is 2D IK for a planar arm.",
        code: {
          lang: "cpp",
          snippet: `#include <math.h>
const float L1 = 12.0, L2 = 10.0; // cm

bool solveIK(float x, float y, float &a1, float &a2) {
  float d = sqrt(x*x + y*y);
  if (d > L1+L2 || d < abs(L1-L2)) return false; // unreachable
  float cosA2 = (x*x + y*y - L1*L1 - L2*L2) / (2*L1*L2);
  a2 = acos(cosA2);                            // elbow angle
  float k1 = L1 + L2*cos(a2), k2 = L2*sin(a2);
  a1 = atan2(y, x) - atan2(k2, k1);           // shoulder angle
  a1 = a1 * 180.0 / M_PI;
  a2 = a2 * 180.0 / M_PI;
  return true;
}`,
        },
      },
      {
        title: "Smooth movement & sequence",
        body: "Move servos slowly to avoid jerky motion that stresses gears. Interpolate from current angle to target over 30–50 steps with a 10–20 ms delay each step. Use a simple state machine: DRIVE_TO_PICK → LOWER_ARM → CLOSE_GRIP → RAISE_ARM → DRIVE_TO_PLACE → LOWER_ARM → OPEN_GRIP → RAISE_ARM → IDLE.",
        code: {
          lang: "cpp",
          snippet: `void servoSlowMove(Servo& sv, int from, int to, int stepDelay=15) {
  int step = (to > from) ? 1 : -1;
  for (int pos = from; pos != to; pos += step) {
    sv.write(pos);
    delay(stepDelay);
  }
  sv.write(to);
}`,
        },
      },
    ],
  },
  {
    id: "pid_reference",
    label: "PID Controller",
    icon: "📐",
    category: "Specialized",
    difficulty: "Intermediate",
    estimatedTime: "1 hour",
    description: "Reference guide for PID tuning — Kp, Ki, Kd methodology, integral windup, and derivative filter.",
    hardware: ["Any MCU", "Motor driver", "Encoder or sensor feedback"],
    problemTags: ["pid", "kp", "ki", "kd", "tuning", "windup", "oscillation"],
    quickFills: ["Bot oscillates (Kp too high)", "Consistent drift (add Ki)", "Overshoot / wobble (add Kd)", "Integral windup runaway"],
    learnSections: [
      {
        title: "What is PID?",
        body: "PID stands for Proportional-Integral-Derivative. It's a feedback control algorithm that calculates a correction based on the difference between a desired setpoint and a measured value (the error).\n\n• P (Proportional) — correction proportional to current error. Big error → big correction.\n• I (Integral) — correction based on accumulated error over time. Fixes persistent drift.\n• D (Derivative) — correction based on rate of error change. Dampens overshoots.\n\nThe output = Kp×error + Ki×∫error + Kd×(d error/dt)",
      },
      {
        title: "Tuning Kp — Proportional",
        body: "Start with Ki=0, Kd=0. Increase Kp from 0 until the system responds but oscillates. Reduce by ~30%. This is your working Kp. Too low → sluggish response, won't reach setpoint. Too high → oscillates around setpoint. For a line follower on a 0–4000 position scale, typical Kp = 0.2–0.8.",
        code: {
          lang: "cpp",
          snippet: `// Minimal P controller
float Kp = 0.4;

void loop() {
  float error = setpoint - measure();
  float output = Kp * error;
  actuate(output);
  delay(10); // 100 Hz loop
}`,
        },
      },
      {
        title: "Tuning Ki — Integral",
        body: "After Kp is set, if there's a steady-state offset (system never quite reaches setpoint), add Ki. Start very small (0.0001–0.001). The integral sums error over time — even a small offset will grow until corrected. Too much Ki → slow oscillation that grows over time (integral windup). Always clamp the integral to a max value.",
        code: {
          lang: "cpp",
          snippet: `float Kp=0.4, Ki=0.001;
float integral=0;
const float I_MAX = 200;

void loop() {
  float err = setpoint - measure();
  integral = constrain(integral + err, -I_MAX, I_MAX);
  float out = Kp*err + Ki*integral;
  actuate(out);
  delay(10);
}`,
        },
      },
      {
        title: "Tuning Kd — Derivative",
        body: "Kd looks at how fast the error is changing. If error is rapidly decreasing, Kd reduces the correction to prevent overshoot. Start with Kd ≈ 5–10× Kp. Too much Kd amplifies noise — apply a low-pass filter on the derivative. Kd is most useful for fast systems (line followers, balance bots) and less needed for slow thermal or position loops.",
        code: {
          lang: "cpp",
          snippet: `float Kp=0.4, Ki=0.001, Kd=2.0;
float integral=0, lastErr=0, filtered=0;

void loop() {
  float err = setpoint - measure();
  integral = constrain(integral + err, -200, 200);
  // Low-pass filter on derivative (alpha=0.3)
  filtered = 0.7*filtered + 0.3*err;
  float deriv = filtered - lastErr;
  lastErr = filtered;
  float out = Kp*err + Ki*integral + Kd*deriv;
  actuate(out);
  delay(10);
}`,
        },
      },
      {
        title: "Common issues & anti-windup",
        body: `Problem: Bot oscillates → Kp too high. Reduce by 30%.\nProblem: Bot undershoots / drifts → Kp too low or Ki needed.\nProblem: Bot overshoots on approach → Kd too low or Kp too high.\nProblem: Slow growing oscillation → Ki too high or integral not clamped.\nProblem: Jitter / noise → Kd too high or missing derivative filter.\n\nAnti-windup: clamp the integral term. Also reset integral to 0 when error crosses zero (reset-on-zero). For motor control, clamp integral when motor is already at max output (clamping anti-windup).`,
        code: {
          lang: "cpp",
          snippet: `// Clamping anti-windup: don't accumulate if output is saturated
float out_unclamped = Kp*err + Ki*integral + Kd*deriv;
float out = constrain(out_unclamped, -255, 255);
// Only integrate if output is not saturated
if (out == out_unclamped) {
  integral += err;
}`,
        },
      },
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

  // ══ NEW SENSORS ════════════════════════════════════════════════════════════

  // ── BMP180 ────────────────────────────────────────────────────────────────
  {
    id: "bmp180-reads-zero",
    title: "BMP180 reads 0 or NaN for pressure/temperature",
    description:
      "BMP180 returns zero or invalid values even though it's wired correctly on I2C.",
    tags: [
      "bmp180", "i2c", "pressure", "temperature",
      "esp32", "esp8266", "uno", "nano", "mega",
    ],
    steps: [
      "Run I2C scanner — BMP180 address is 0x77. If not found, check SDA/SCL and 3.3 V supply",
      "BMP180 is a 3.3 V device — never connect VCC to 5 V directly; use a 3.3 V regulator or level shifter",
      "Use the Adafruit BMP085/BMP180 library: call bmp.begin() and check its return value (false = not found)",
      "Always call readTemperature() BEFORE readPressure() — BMP180 needs temp for pressure compensation",
      "Add 100 ms delay after begin() before first read",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Adafruit_BMP085.h>
Adafruit_BMP085 bmp;

void setup() {
  Serial.begin(115200);
  if (!bmp.begin()) {
    Serial.println("BMP180 not found — check wiring/address");
    while (1);
  }
}
void loop() {
  float temp = bmp.readTemperature();       // must read first
  float pressure = bmp.readPressure();      // Pa
  float altitude = bmp.readAltitude(101325); // sea-level Pa
  Serial.printf("%.1f°C  %.0f Pa  %.1f m\\n", temp, pressure, altitude);
  delay(500);
}`,
    },
  },

  // ── LDR ───────────────────────────────────────────────────────────────────
  {
    id: "ldr-always-same-value",
    title: "LDR reads always 0 or stuck at max value",
    description:
      "Light-dependent resistor gives a fixed analog reading regardless of light level.",
    tags: [
      "ldr", "analog", "light", "sensor",
      "uno", "nano", "mega", "esp32", "esp8266",
    ],
    steps: [
      "LDR requires a voltage divider — connect LDR from VCC to analog pin, and a 10 kΩ resistor from the same pin to GND",
      "If reading is always 1023: the pull-down resistor is missing — add 10 kΩ to GND",
      "If reading is always 0: LDR and resistor may be swapped — swap them in the divider",
      "ESP32 ADC note: use analogRead() only on ADC1 pins (GPIO 32–39); ADC2 is disabled when WiFi is active",
      "Map the raw value to a 0–100 lux scale: map(analogRead(A0), darkVal, brightVal, 0, 100)",
    ],
    code: {
      lang: "cpp",
      snippet: `// LDR voltage divider: VCC → LDR → A0 → 10kΩ → GND
void setup() { Serial.begin(115200); }
void loop() {
  int raw = analogRead(A0);       // 0–1023 (Arduino) / 0–4095 (ESP32)
  int pct = map(raw, 50, 950, 0, 100); // calibrate dark/bright limits
  pct = constrain(pct, 0, 100);
  Serial.printf("Raw: %d  Light: %d%%\\n", raw, pct);
  delay(200);
}`,
    },
  },

  // ── ADXL345 ───────────────────────────────────────────────────────────────
  {
    id: "adxl345-reads-zero",
    title: "ADXL345 accelerometer reads all zeros",
    description:
      "ADXL345 returns 0, 0, 0 for all three axes or fails to initialise.",
    tags: [
      "adxl345", "accelerometer", "i2c", "spi",
      "esp32", "uno", "nano", "mega",
    ],
    steps: [
      "Check I2C address: ADXL345 is 0x53 when SDO/ALT is LOW, 0x1D when HIGH. Run I2C scanner to confirm",
      "Power: ADXL345 runs on 3.3 V. Use logic-level shifting if connecting to 5 V Arduino I2C",
      "CS pin must be tied HIGH for I2C mode (if using the breakout in SPI mode CS is active-low)",
      "After begin(), set the range: accel.setRange(ADXL345_RANGE_2_G) and call accel.setDataRate(ADXL345_DATARATE_100_HZ)",
      "All-zero readings often mean the device isn't initialised — check that accel.begin() returns true",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Adafruit_ADXL345_U.h>
Adafruit_ADXL345_Unified accel(12345);

void setup() {
  Serial.begin(115200);
  if (!accel.begin()) {
    Serial.println("ADXL345 not found");
    while (1);
  }
  accel.setRange(ADXL345_RANGE_2_G);
}
void loop() {
  sensors_event_t event;
  accel.getEvent(&event);
  Serial.printf("X:%.2f Y:%.2f Z:%.2f m/s²\\n",
    event.acceleration.x,
    event.acceleration.y,
    event.acceleration.z);
  delay(100);
}`,
    },
  },

  // ── L3G4200D ──────────────────────────────────────────────────────────────
  {
    id: "l3g4200d-drift",
    title: "L3G4200D gyroscope drifts — angle keeps increasing at rest",
    description:
      "Integrating L3G4200D angular rate gives an angle that drifts even when the sensor is stationary.",
    tags: [
      "l3g4200d", "gyroscope", "drift", "i2c",
      "esp32", "uno", "mega",
    ],
    steps: [
      "All gyroscopes have a zero-rate offset (bias). At startup, average 200–500 readings to get the offset, then subtract it from every reading",
      "Temperature affects bias — recalibrate if ambient temperature changes significantly",
      "Gyro angle = integral of rate × dt. Small errors in dt or bias accumulate — gyros alone can't give absolute angle",
      "For stable angle: fuse with accelerometer using a complementary filter: angle = 0.98*(angle + gyro*dt) + 0.02*accel_angle",
      "Reduce polling interval to < 10 ms (100 Hz) for accurate integration",
    ],
    code: {
      lang: "cpp",
      snippet: `// Simple bias calibration + complementary filter
float gyroBiasZ = 0;
void calibrate(int samples = 500) {
  long sum = 0;
  for (int i = 0; i < samples; i++) {
    sum += readRawGyroZ(); // your read function
    delay(2);
  }
  gyroBiasZ = sum / (float)samples;
}

float angle = 0;
unsigned long lastT = 0;
void loop() {
  float dt = (millis() - lastT) / 1000.0;
  lastT = millis();
  float rate = (readRawGyroZ() - gyroBiasZ) * 0.00875; // dps for ±250 range
  angle += rate * dt;
  Serial.println(angle);
  delay(10);
}`,
    },
  },

  // ── HMC5883L ──────────────────────────────────────────────────────────────
  {
    id: "hmc5883l-wrong-heading",
    title: "HMC5883L compass heading is wrong or jumps erratically",
    description:
      "Calculated compass heading doesn't match actual direction, or oscillates by tens of degrees.",
    tags: [
      "hmc5883l", "magnetometer", "compass", "i2c", "heading",
      "esp32", "uno", "nano", "mega",
    ],
    steps: [
      "HMC5883L address is 0x1E. Confirm with I2C scanner. QMC5883L clone uses 0x0D — use QMC5883L library instead if clone detected",
      "Hard-iron calibration: rotate sensor 360° in horizontal plane, record min/max for X and Y, subtract midpoint: offsetX = (maxX+minX)/2",
      "Keep the sensor away from motors, power wires, and iron — these create magnetic interference",
      "Hold the sensor level for 2D heading; tilt compensation requires accelerometer data for full 3D",
      "heading = atan2(y - offsetY, x - offsetX) × 180 / PI; if heading < 0 add 360",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <HMC5883L.h>
HMC5883L compass;
// Hard-iron offsets from calibration:
float offsetX = 0, offsetY = 0;

void setup() {
  Wire.begin();
  compass.initialize();
}
void loop() {
  int16_t mx, my, mz;
  compass.getHeading(&mx, &my, &mz);
  float heading = atan2(my - offsetY, mx - offsetX) * 180.0 / PI;
  if (heading < 0) heading += 360.0;
  Serial.printf("Heading: %.1f°\\n", heading);
  delay(100);
}`,
    },
  },

  // ── NEO-6M GPS ────────────────────────────────────────────────────────────
  {
    id: "neo6m-no-fix",
    title: "NEO-6M GPS never gets a fix — no valid NMEA data",
    description:
      "GPS module powers up and sends data but coordinates are 0,0 or no valid GPRMC/GPGGA sentences appear.",
    tags: [
      "neo6m", "gps", "uart", "nmea", "fix",
      "esp32", "esp8266", "uno", "mega",
    ],
    steps: [
      "GPS fix requires clear sky view — initial cold start can take 1–3 minutes outdoors",
      "Baud rate is 9600 by default. Use SoftwareSerial on Uno (avoid pins 0/1 which are hardware Serial)",
      "TX of GPS → RX of MCU, RX of GPS → TX of MCU. Voltage: NEO-6M is 3.3 V tolerant on TX but RX needs a level shifter when connecting 5 V Arduino TX",
      "Print raw serial output to check NMEA sentences — a fix is indicated when GPRMC has 'A' (active) not 'V' (void)",
      "Use TinyGPS++ library: gps.encode() each incoming char, then check gps.location.isValid()",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

TinyGPSPlus gps;
SoftwareSerial ss(4, 3); // RX, TX

void setup() {
  Serial.begin(115200);
  ss.begin(9600);
}
void loop() {
  while (ss.available()) gps.encode(ss.read());
  if (gps.location.isUpdated()) {
    Serial.printf("Lat: %.6f  Lon: %.6f  Sats: %d\\n",
      gps.location.lat(), gps.location.lng(),
      gps.satellites.value());
  }
}`,
    },
  },

  // ── LM393 Sound ───────────────────────────────────────────────────────────
  {
    id: "lm393-sound-not-triggering",
    title: "LM393 sound sensor never triggers on loud sounds",
    description:
      "Sound sensor digital output stays HIGH or never detects claps/sounds despite loud noise.",
    tags: [
      "lm393", "sound", "analog", "gpio",
      "uno", "nano", "mega", "esp32",
    ],
    steps: [
      "The LM393 module has a sensitivity trim pot — turn it clockwise to increase sensitivity",
      "Digital output (DO) goes LOW on detection (active-low). Read with digitalRead() and trigger on LOW, not HIGH",
      "For continuous monitoring use the analog output (AO) — it gives the raw amplitude as 0–1023",
      "Place the microphone directly facing the sound source — the condenser mic has a directional pattern",
      "Avoid mounting near vibrating surfaces (motors, fans) which create constant false triggers",
    ],
    code: {
      lang: "cpp",
      snippet: `const int DO_PIN = 2; // digital out — active LOW
const int AO_PIN = A0; // analog out

void setup() {
  pinMode(DO_PIN, INPUT);
  Serial.begin(115200);
}
void loop() {
  int level = analogRead(AO_PIN);         // 0–1023 raw amplitude
  bool detected = digitalRead(DO_PIN) == LOW; // above threshold
  if (detected)
    Serial.printf("Sound! level=%d\\n", level);
  delay(10);
}`,
    },
  },

  // ── TSOP1738 ──────────────────────────────────────────────────────────────
  {
    id: "tsop1738-ir-remote-not-decoding",
    title: "TSOP1738 IR remote not decoding — always 0 or garbage codes",
    description:
      "IR remote receiver outputs garbage codes, 0xFFFFFFFF, or never triggers when a remote button is pressed.",
    tags: [
      "tsop1738", "ir", "remote", "gpio",
      "uno", "nano", "mega", "esp32",
    ],
    steps: [
      "TSOP1738 pin order (flat face): OUT, GND, VCC — many breakout boards label differently, verify with datasheet",
      "VCC must be 5 V with a 100 Ω series resistor and 4.7 µF decoupling cap on the supply pin to avoid interference",
      "Output is active-low (idle HIGH, pulls LOW on signal) — use IRremote library and connect OUT to an interrupt-capable pin",
      "0xFFFFFFFF means repeat code (button held) — the previous code is still valid",
      "Keep the receiver away from bright LED/fluorescent lights that emit IR noise at 38 kHz",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <IRremote.hpp>

const int IR_PIN = 2;
IRrecv irrecv(IR_PIN);

void setup() {
  Serial.begin(115200);
  IrReceiver.begin(IR_PIN, ENABLE_LED_FEEDBACK);
}
void loop() {
  if (IrReceiver.decode()) {
    uint32_t code = IrReceiver.decodedIRData.decodedRawData;
    if (code != 0xFFFFFFFF) // ignore repeat
      Serial.printf("Code: 0x%08X\\n", code);
    IrReceiver.resume(); // ready for next signal
  }
}`,
    },
  },

  // ── TTP223 ────────────────────────────────────────────────────────────────
  {
    id: "ttp223-always-triggered",
    title: "TTP223 touch sensor always reads HIGH / triggers randomly",
    description:
      "Capacitive touch sensor triggers without being touched, or never returns to LOW after a touch.",
    tags: [
      "ttp223", "touch", "capacitive", "gpio",
      "uno", "nano", "mega", "esp32",
    ],
    steps: [
      "Keep wires to the touch pad short (< 20 cm) — long wires add parasitic capacitance causing false triggers",
      "The sensing pad area is on the top of the chip/module — make sure nothing is resting on it",
      "TTP223 has two solder pads: A changes between toggle and momentary mode; B changes between active-high and active-low output",
      "Power supply noise causes false triggers — add a 100 nF decoupling cap between VCC and GND close to the module",
      "Shield the sensing electrode with a ground plane around (not over) it to reduce EMI pickup",
    ],
    code: {
      lang: "cpp",
      snippet: `const int TOUCH_PIN = 4; // TTP223 OUT pin

void setup() {
  pinMode(TOUCH_PIN, INPUT);
  Serial.begin(115200);
}
void loop() {
  // Default config: active HIGH on touch, LOW when released
  if (digitalRead(TOUCH_PIN) == HIGH) {
    Serial.println("Touched!");
    delay(50); // debounce
    while (digitalRead(TOUCH_PIN) == HIGH); // wait for release
    Serial.println("Released");
  }
}`,
    },
  },

  // ── VCNL4000 ──────────────────────────────────────────────────────────────
  {
    id: "vcnl4000-proximity-stuck",
    title: "VCNL4000 proximity reading stuck or not changing",
    description:
      "VCNL4000 proximity value doesn't change as objects approach, or always reads max/min.",
    tags: [
      "vcnl4000", "proximity", "i2c", "ambient",
      "esp32", "uno", "nano", "mega",
    ],
    steps: [
      "VCNL4000 I2C address is fixed at 0x13 — confirm with I2C scanner",
      "VCC is 3.3 V only — do NOT connect to 5 V",
      "After begin(), set IR LED current: proximity.setLEDcurrent(20) (0–20 in steps of 3.2 mA). Higher current = longer range",
      "Set proximity measurement frequency: proximity.setFrequency(VCNL4000_3M125); call proximity.readProximity()",
      "Proximity value decreases as objects get closer (counts increase). Typical range: 1–200 mm. Cover the sensor window if ambient IR is saturating it",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <Adafruit_VCNL4000.h>
Adafruit_VCNL4000 vcnl;

void setup() {
  Serial.begin(115200);
  if (!vcnl.begin()) {
    Serial.println("VCNL4000 not found at 0x13");
    while (1);
  }
  vcnl.setLEDcurrent(20);       // max IR current
  vcnl.setFrequency(VCNL4000_3M125);
}
void loop() {
  uint16_t prox = vcnl.readProximity();
  uint16_t amb  = vcnl.readAmbient();
  Serial.printf("Proximity: %u  Ambient: %u\\n", prox, amb);
  delay(100);
}`,
    },
  },

  // ══ BOT / ROBOTICS ═════════════════════════════════════════════════════════

  // ── IR Sensor Array ────────────────────────────────────────────────────────
  {
    id: "ir-array-all-same",
    title: "IR sensor array reads same value on all channels",
    description:
      "All channels of a 5-ch or 8-ch IR array return the same analog/digital value regardless of surface.",
    tags: [
      "ir_array", "ir_array_5ch", "ir_array_8ch", "tcrt5000_single",
      "line_follower", "maze_solver",
      "uno", "nano", "mega",
      "calibration", "analog", "sensor",
    ],
    steps: [
      "Check VCC — IR arrays need a stable 5 V supply; power from Arduino 5 V pin, not 3.3 V",
      "Verify each emitter LED is lit (look through phone camera — IR shows as purple glow)",
      "Check common GND between sensor array and MCU",
      "Test one sensor in isolation with Serial.println(analogRead(A0)) over a white and black surface",
      "Adjust sensor height — optimal is 5–10 mm from surface; too far gives flat readings",
      "If analog values are stuck at 1023 or 0, check pull-down/pull-up resistors or use the digital output instead",
    ],
    code: {
      lang: "cpp",
      snippet: `// Quick calibration check — print all 5 channels
const int IR_PINS[] = {A0, A1, A2, A3, A4};
void setup() { Serial.begin(115200); }
void loop() {
  for (int i = 0; i < 5; i++) {
    Serial.print(analogRead(IR_PINS[i]));
    Serial.print("\\t");
  }
  Serial.println();
  delay(100);
}`,
    },
  },
  {
    id: "ir-array-ambient-interference",
    title: "IR sensor gives noisy / inconsistent readings in sunlight",
    description:
      "Direct sunlight or bright ambient light saturates IR phototransistors, causing erratic line detection.",
    tags: [
      "ir_array", "ir_array_5ch", "ir_array_8ch", "tcrt5000_single",
      "line_follower", "maze_solver", "ambient", "noise", "sunlight",
    ],
    steps: [
      "Shield the sensor array from direct sunlight with a skirt made of cardboard or black foam",
      "Increase emitter LED brightness — some modules have a trim pot to adjust current",
      "Use digital threshold output instead of raw analog; set threshold slightly above ambient noise floor",
      "Implement dynamic calibration: scan over white then black at startup and store min/max per channel",
      "For QTR-8A, use the QTRSensors library — it supports emitter on/off calibration automatically",
    ],
    code: {
      lang: "cpp",
      snippet: `// Dynamic calibration with QTRSensors library
#include <QTRSensors.h>
QTRSensors qtr;
const uint8_t SENSOR_COUNT = 8;
uint16_t sensorValues[SENSOR_COUNT];

void setup() {
  qtr.setTypeAnalog();
  qtr.setSensorPins((const uint8_t[]){A0,A1,A2,A3,A4,A5,A6,A7}, SENSOR_COUNT);
  // Calibrate — move robot over line for 2 seconds
  for (uint16_t i = 0; i < 400; i++) {
    qtr.calibrate();
    delay(20);
  }
}
void loop() {
  uint16_t pos = qtr.readLineBlack(sensorValues); // 0–7000
}`,
    },
  },

  // ── PID Tuning ────────────────────────────────────────────────────────────
  {
    id: "pid-oscillation-kp-too-high",
    title: "Line follower oscillates / zig-zags — Kp too high",
    description:
      "Robot overcorrects left and right around the line, getting worse as speed increases. Classic sign of proportional gain too high.",
    tags: [
      "pid", "kp", "oscillation", "line_follower", "tuning",
      "ir_array", "ir_array_5ch", "ir_array_8ch", "n20_motor", "l298n", "tb6612fng",
    ],
    steps: [
      "Start with Kp=0.1, Ki=0, Kd=0 and increase Kp slowly until the bot follows the line",
      "The moment it starts oscillating, reduce Kp by 30–50%",
      "Increase base speed gradually — you may need to re-tune Kp at higher speeds",
      "Do NOT add Ki or Kd until Kp gives stable (but possibly drifty) tracking",
      "Log the error value via Serial to visualize oscillation amplitude",
    ],
    code: {
      lang: "cpp",
      snippet: `float Kp = 0.4, Ki = 0.0, Kd = 0.0;
float lastError = 0, integral = 0;
int baseSpeed = 120; // 0–255

void loop() {
  int pos = readLinePosition(); // returns -2 to +2 (or 0–7000 for QTR)
  float error = pos; // center = 0
  integral += error;
  float derivative = error - lastError;
  float correction = Kp*error + Ki*integral + Kd*derivative;
  lastError = error;
  int leftSpeed  = constrain(baseSpeed + correction, 0, 255);
  int rightSpeed = constrain(baseSpeed - correction, 0, 255);
  setMotors(leftSpeed, rightSpeed);
}`,
    },
  },
  {
    id: "pid-drift-ki-needed",
    title: "Line follower drifts consistently to one side",
    description:
      "Robot tracks the line but slowly drifts to one side, especially on straight sections. Accumulated steady-state error needs integral term.",
    tags: [
      "pid", "ki", "drift", "line_follower", "tuning", "integral", "windup",
      "ir_array", "n20_motor", "l298n",
    ],
    steps: [
      "Add Ki starting at 0.0001 — integral error accumulates over many samples so it needs a tiny value",
      "Watch for integral windup: clamp integral to ±50 or ±100 to prevent runaway",
      "If the bot starts oscillating after adding Ki, reduce Ki or add the clamp",
      "Check motor symmetry — if one motor is weaker, it causes one-sided drift that Kp alone can't fix",
    ],
    code: {
      lang: "cpp",
      snippet: `// Anti-windup clamp
const float INTEGRAL_MAX = 100.0;
integral = constrain(integral + error, -INTEGRAL_MAX, INTEGRAL_MAX);`,
    },
  },
  {
    id: "pid-overshoot-kd-needed",
    title: "Line follower overshoots on curves / wobbles after correction",
    description:
      "Robot handles straight lines well but overshoots on curves or wobbles briefly after corrections — derivative term reduces this.",
    tags: [
      "pid", "kd", "overshoot", "line_follower", "tuning", "derivative",
      "ir_array", "n20_motor",
    ],
    steps: [
      "Add Kd starting at 1–5 × Kp value",
      "Kd damps sharp error changes — it reduces the overshoot on curve entry",
      "Too much Kd causes jitter/noise amplification — reduce if motors stutter",
      "Apply a simple low-pass filter on error before feeding to derivative: filtered = 0.7*filtered + 0.3*raw",
    ],
    code: {
      lang: "cpp",
      snippet: `// Low-pass filter on derivative
float filteredError = 0;
// In loop:
filteredError = 0.7 * filteredError + 0.3 * error;
float derivative = filteredError - lastError;
lastError = filteredError;`,
    },
  },

  // ── BTS7960 Motor Driver ───────────────────────────────────────────────────
  {
    id: "bts7960-not-spinning",
    title: "BTS7960 motor not spinning — IBT-2 module",
    description:
      "Motor connected to BTS7960 (IBT-2 board) doesn't move even though MCU pins are set.",
    tags: [
      "bts7960", "rc_bot", "soccer_bot", "motor", "pwm",
      "esp32", "uno", "mega", "nano",
    ],
    steps: [
      "The IBT-2 module has 6 control pins: RPWM, LPWM, R_EN, L_EN, R_IS, L_IS",
      "Both R_EN and L_EN must be HIGH (or tied to VCC) to enable the driver",
      "RPWM controls forward direction (0–255 PWM), LPWM controls reverse — never set both > 0 at the same time",
      "Supply voltage must be connected to the B+ terminal and motor to B- / motor terminals — check wiring",
      "Verify PWM frequency: keep below 20 kHz; Arduino default ~490 Hz on most pins is fine",
      "Check the status pins R_IS / L_IS — if current exceeds limit they go HIGH (overcurrent protection)",
    ],
    code: {
      lang: "cpp",
      snippet: `// BTS7960 (IBT-2) control
const int RPWM = 5, LPWM = 6;
const int R_EN = 7, L_EN = 8;

void setup() {
  pinMode(RPWM, OUTPUT); pinMode(LPWM, OUTPUT);
  pinMode(R_EN, OUTPUT); pinMode(L_EN, OUTPUT);
  digitalWrite(R_EN, HIGH); digitalWrite(L_EN, HIGH);
}

void driveForward(int speed) {  // speed 0-255
  analogWrite(RPWM, speed);
  analogWrite(LPWM, 0);
}
void driveReverse(int speed) {
  analogWrite(RPWM, 0);
  analogWrite(LPWM, speed);
}
void stop() {
  analogWrite(RPWM, 0);
  analogWrite(LPWM, 0);
}`,
    },
  },
  {
    id: "bts7960-one-direction",
    title: "BTS7960 motor only goes one direction",
    description:
      "Motor spins forward with RPWM but reverse with LPWM does nothing, or vice versa.",
    tags: [
      "bts7960", "rc_bot", "soccer_bot", "motor", "direction",
      "uno", "mega", "esp32",
    ],
    steps: [
      "Verify LPWM pin is actually outputting PWM — use a multimeter in AC mode or oscilloscope",
      "Ensure R_EN and L_EN are both HIGH — if only one is HIGH the corresponding half-bridge is disabled",
      "Check if the motor is mechanically blocked in one direction (gear jam)",
      "Swap RPWM and LPWM pins in code if direction is reversed from expectation",
      "Try connecting RPWM to GND and LPWM to PWM to confirm the reverse half-bridge works",
    ],
  },

  // ── ESP-NOW ────────────────────────────────────────────────────────────────
  {
    id: "esp-now-not-connecting",
    title: "ESP-NOW peers not connecting / no data received",
    description:
      "Two ESP32s can't establish ESP-NOW communication — send callback returns failure or receiver callback never fires.",
    tags: [
      "esp_now", "esp32", "rc_bot", "soccer_bot", "wireless", "mac", "peer",
    ],
    steps: [
      "Both boards must use the same WiFi channel. Call WiFi.disconnect() and don't use STA mode alongside ESP-NOW unless you set the channel explicitly",
      "Get the receiver's exact MAC address via WiFi.macAddress() printed to Serial — any byte error means no connection",
      "Register the peer BEFORE calling esp_now_send()",
      "Both sender and receiver must call esp_now_init() successfully (returns ESP_OK)",
      "The data struct on sender and receiver must be the same size — use #pragma pack or identical struct definitions",
      "If using encrypted ESP-NOW, both must call esp_now_set_pmk() with the same key",
    ],
    code: {
      lang: "cpp",
      snippet: `#include <esp_now.h>
#include <WiFi.h>

uint8_t receiverMAC[] = {0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF}; // replace!

typedef struct { int throttle; int steering; } Packet;
Packet data;

void onSent(const uint8_t *mac, esp_now_send_status_t status) {
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "OK" : "FAIL");
}

void setup() {
  WiFi.mode(WIFI_STA);
  esp_now_init();
  esp_now_register_send_cb(onSent);
  esp_now_peer_info_t peer = {};
  memcpy(peer.peer_addr, receiverMAC, 6);
  peer.channel = 0; peer.encrypt = false;
  esp_now_add_peer(&peer);
}

void loop() {
  data.throttle = 200; data.steering = 0;
  esp_now_send(receiverMAC, (uint8_t *)&data, sizeof(data));
  delay(20);
}`,
    },
  },

  // ── Differential Drive ─────────────────────────────────────────────────────
  {
    id: "motors-same-direction",
    title: "Both motors spin the same direction — bot spins instead of going straight",
    description:
      "In a differential-drive bot, left and right motors are mechanically mirrored — one must be inverted in code or wiring.",
    tags: [
      "differential", "line_follower", "maze_solver", "rc_bot", "soccer_bot",
      "l298n", "tb6612fng", "bts7960", "n20_motor", "tt_motor",
    ],
    steps: [
      "One motor is physically mounted facing the opposite direction — its wires must be swapped or logic inverted",
      "In code: if left motor uses IN1/IN2, simply swap the HIGH/LOW values for that motor",
      "Test each motor independently before combining: set one motor at a time and observe rotation direction",
      "Convention: positive speed = forward for both; define a setMotors(left, right) function that handles inversion internally",
    ],
    code: {
      lang: "cpp",
      snippet: `void setMotors(int left, int right) {
  // Right motor is mounted reversed — invert its value
  right = -right;
  // Left motor (L298N IN1/IN2 + ENA)
  digitalWrite(IN1, left >= 0 ? HIGH : LOW);
  digitalWrite(IN2, left >= 0 ? LOW : HIGH);
  analogWrite(ENA, abs(left));
  // Right motor (L298N IN3/IN4 + ENB)
  digitalWrite(IN3, right >= 0 ? HIGH : LOW);
  digitalWrite(IN4, right >= 0 ? LOW : HIGH);
  analogWrite(ENB, abs(right));
}`,
    },
  },

  // ── Timer Conflict ─────────────────────────────────────────────────────────
  {
    id: "afmotor-servo-timer-conflict",
    title: "AFMotor.h + Servo.h causes servos to jitter or motors to stall",
    description:
      "Adafruit Motor Shield library (AFMotor) uses Timer 1 on Arduino Uno/Nano. The Servo library also uses Timer 1, causing conflicts that make servos jitter or PWM motor speed wrong.",
    tags: [
      "afmotor", "pick_place", "servo_mg996r", "servo_sg90", "timer_conflict",
      "uno", "nano", "mega", "timer", "pwm",
    ],
    steps: [
      "On Arduino Uno/Nano: AFMotor uses Timer 1 and Timer 2; Servo also uses Timer 1 → conflict",
      "Solution 1 (Mega): use Arduino Mega which has Timers 3, 4, 5 — Servo and AFMotor coexist without conflict",
      "Solution 2: Replace AFMotor with direct L293D control using analogWrite — no library timers needed",
      "Solution 3: Use Adafruit Motor Shield v2 (I2C-based PCA9685) — no timer conflict at all",
      "Never include both <AFMotor.h> and <Servo.h> on Uno for simultaneous use",
    ],
    code: {
      lang: "cpp",
      snippet: `// ✗ Conflict on Uno/Nano:
// #include <AFMotor.h>
// #include <Servo.h>

// ✓ Solution: Use AFMotor Shield v2 (I2C)
#include <Adafruit_MotorShield.h>
#include <Servo.h>  // Safe — no timer conflict with v2 shield

Adafruit_MotorShield AFMS = Adafruit_MotorShield();
Adafruit_DCMotor *motor = AFMS.getMotor(1);
Servo gripper;

void setup() {
  AFMS.begin();
  gripper.attach(9);
}`,
    },
  },

  // ── Maze Solver ────────────────────────────────────────────────────────────
  {
    id: "maze-junction-not-detected",
    title: "Maze solver misses junctions — T or cross intersections skipped",
    description:
      "Robot fails to detect T-junctions or crossroads and drives straight through, making the left-hand rule fail.",
    tags: [
      "maze_solver", "junction", "ir_array", "ir_array_5ch", "ir_array_8ch",
      "line_follower", "uno", "nano", "mega",
    ],
    steps: [
      "Junctions are detected by the outermost sensors — ensure you're reading sensors 0 and 4 (or 0 and 7 for 8-ch)",
      "A T-junction appears as: left-outer OR right-outer sensor goes HIGH while center is also HIGH",
      "Increase polling rate — if the robot is fast, sample sensors every 5–10 ms and buffer readings",
      "Add a small delay (50–100 ms) after junction detection before executing the turn, to position the pivot point over the junction",
      "Reduce speed approaching intersections using the same PID correction magnitude as a signal",
    ],
    code: {
      lang: "cpp",
      snippet: `bool isJunction(int* s, int n) {
  // s[0] = leftmost, s[n-1] = rightmost
  bool leftHigh  = s[0] > 700;
  bool rightHigh = s[n-1] > 700;
  bool centerHigh = s[n/2] > 700;
  return (leftHigh || rightHigh) && centerHigh;
}

// In loop:
if (isJunction(sensorValues, 5)) {
  handleJunction(); // turn left, right, or go straight
}`,
    },
  },

  // ── Power / LiPo ──────────────────────────────────────────────────────────
  {
    id: "lipo-brownout-motors",
    title: "MCU resets when motors start — LiPo voltage sag",
    description:
      "Arduino or ESP32 resets or behaves erratically the moment drive motors are powered, due to voltage drop on the battery.",
    tags: [
      "power", "brownout", "lipo", "rc_bot", "soccer_bot", "line_follower",
      "bts7960", "l298n", "tb6612fng", "johnson_motor", "n20_motor",
      "esp32", "uno", "nano", "mega",
    ],
    steps: [
      "Never power the MCU from the same LiPo cell that drives motors — use a separate 5 V BEC or buck converter",
      "Add a 1000 µF capacitor across the motor driver's power input to absorb current spikes",
      "Use a LiPo with adequate C-rating: minimum 25C for race bots (capacity_Ah × 25C = peak amps)",
      "Check battery wiring — thin wires add resistance and cause voltage drops; use 18 AWG or thicker",
      "For ESP32: set brownout threshold lower with esp_brownout_init() or disable in sdkconfig (temporary workaround only)",
    ],
    code: {
      lang: "cpp",
      snippet: `// Disable ESP32 brownout detector (temporary debug only)
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); // disable brownout
  // ⚠️ Re-enable in production — this can damage the ESP32
}`,
    },
  },

  // ── N20 / Geared Motors ───────────────────────────────────────────────────
  {
    id: "n20-grinding-noise",
    title: "N20 geared motor makes grinding noise or loses steps",
    description:
      "N20 motor produces grinding/clicking sounds under load, or slows and stalls when robot pushes against obstacle.",
    tags: [
      "n20_motor", "line_follower", "maze_solver", "motor", "grinding",
      "l298n", "tb6612fng", "power",
    ],
    steps: [
      "N20 motors have plastic gears — stalling under high load strips the gears; avoid prolonged stalls",
      "Implement current limiting: if motor stalls (encoder stops but PWM is high), cut power immediately",
      "Check supply voltage: N20 motors run optimally at their rated voltage (3–6 V or 6–12 V variant)",
      "Reduce base speed when turning — sharp turns at high speed overload the inner wheel motor",
      "If grinding happens at startup, add a slow ramp-up from 0 to target speed over 200 ms",
    ],
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

/** Search problems relevant to a specific bot using its problemTags + optional query. */
export function searchBotProblems(bot: Bot, query: string, limit = 8): Problem[] {
  const botTagSet = new Set<string>(bot.problemTags);
  const pool = ALL_PROBLEMS.filter((p) =>
    p.tags.some((t) => botTagSet.has(t))
  );
  if (!query.trim()) return pool.slice(0, limit);

  const tokens = tokenize(query);
  const scored = pool.map((p) => {
    let score = 0;
    for (const tag of p.tags) {
      if (botTagSet.has(tag)) score += 2;
    }
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
