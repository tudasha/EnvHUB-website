import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Products are upserted below to preserve existing orders/carts ─────────

  // ── SENSORS ───────────────────────────────────────────────────
  const sensors = [
    {
      name: "Motion Sensor",
      slug: "motion-sensor",
      description:
        "Detects movement within a specific area. Ideal for security, lighting control, and energy management. PIR-based, 120° detection angle, 8m range, battery-powered.",
      price: 24.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 200,
      tags: ["motion", "pir", "security", "lighting"],
      featured: true,
    },
    {
      name: "Door & Window Sensor",
      slug: "door-window-sensor",
      description:
        "Monitors the opening and closing of doors and windows. Magnetic reed switch design, ultra-thin profile, instant alerts via app when triggered.",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618047-f2a26c4f022d?w=600",
      category: Category.SENSOR,
      stock: 300,
      tags: ["door", "window", "security", "magnetic"],
      featured: true,
    },
    {
      name: "Temperature & Humidity Sensor",
      slug: "temperature-humidity-sensor",
      description:
        "Monitors ambient temperature (−20°C to +60°C) and humidity (0–99% RH). Enables climate control and energy management. High-precision ±0.3°C accuracy.",
      price: 22.99,
      imageUrl:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600",
      category: Category.SENSOR,
      stock: 250,
      tags: ["temperature", "humidity", "climate", "hvac"],
      featured: true,
    },
    {
      name: "Smoke & CO Detector",
      slug: "smoke-co-detector",
      description:
        "Dual-sensor safety device detecting both smoke and carbon monoxide. 85dB alarm, 10-year battery life, interconnectable with other units.",
      price: 49.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 150,
      tags: ["smoke", "co", "carbon-monoxide", "safety", "fire"],
      featured: true,
    },
    {
      name: "Water Leak Sensor",
      slug: "water-leak-sensor",
      description:
        "Detects water presence or moisture to alert homeowners of leaks or flooding. Probe-based detection, 80dB buzzer, instant push notification.",
      price: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 200,
      tags: ["water", "leak", "flood", "moisture"],
      featured: false,
    },
    {
      name: "Light Sensor",
      slug: "light-sensor",
      description:
        "Measures ambient light intensity (lux). Automates lighting based on natural light levels, saves energy, and improves comfort. Range: 1–65535 lux.",
      price: 16.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 180,
      tags: ["light", "lux", "ambient", "automation"],
      featured: false,
    },
    {
      name: "Air Quality Sensor",
      slug: "air-quality-sensor",
      description:
        "Monitors indoor air pollutants including VOCs, PM2.5, PM10, and CO2 levels. Displays AQI index, triggers ventilation automation.",
      price: 59.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 120,
      tags: ["air", "voc", "pm25", "co2", "quality"],
      featured: true,
    },
    {
      name: "Noise Sensor",
      slug: "noise-sensor",
      description:
        "Detects and measures sound levels in a room (30–130 dB). Useful for monitoring noise in rental properties, nurseries, or offices.",
      price: 27.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 150,
      tags: ["noise", "sound", "acoustic", "decibel"],
      featured: false,
    },
    {
      name: "Vibration Sensor",
      slug: "vibration-sensor",
      description:
        "Detects vibrations for security (break-in attempts) or automation (appliance cycle detection). Adjustable sensitivity, ultra-low power.",
      price: 21.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 160,
      tags: ["vibration", "security", "appliance", "tamper"],
      featured: false,
    },
    {
      name: "Energy Monitoring Sensor",
      slug: "energy-monitoring-sensor",
      description:
        "Tracks power consumption of individual appliances in real-time. Clamp-based, supports up to 100A circuits, identifies energy hogs.",
      price: 44.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 100,
      tags: ["energy", "power", "electricity", "monitoring"],
      featured: true,
    },
    {
      name: "Gas Leak Sensor",
      slug: "gas-leak-sensor",
      description:
        "Detects flammable or hazardous gases: natural gas, propane, methane, LPG. Loud 85dB alarm, LED indicator, auto-shutoff relay output.",
      price: 34.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 140,
      tags: ["gas", "propane", "methane", "safety", "lpg"],
      featured: false,
    },
    {
      name: "Occupancy Sensor",
      slug: "occupancy-sensor",
      description:
        "Determines if a room is occupied using passive infrared + microwave dual technology. Reduces false positives, ideal for HVAC and lighting automation.",
      price: 31.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 130,
      tags: ["occupancy", "presence", "pir", "microwave"],
      featured: false,
    },
    {
      name: "Soil Moisture Sensor",
      slug: "soil-moisture-sensor",
      description:
        "Monitors water content in soil to optimize irrigation. Capacitive design (no corrosion), outdoor-rated, helps maintain healthy plants and saves water.",
      price: 14.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 200,
      tags: ["soil", "moisture", "garden", "irrigation", "plant"],
      featured: false,
    },
    {
      name: "UV Sensor",
      slug: "uv-sensor",
      description:
        "Measures ultraviolet radiation intensity (UV index 0–11+). Helps protect against overexposure, integrates with smart blinds and sunscreen reminders.",
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 120,
      tags: ["uv", "ultraviolet", "sun", "outdoor"],
      featured: false,
    },
    {
      name: "Presence Sensor",
      slug: "presence-sensor",
      description:
        "Detects when a person or object is nearby using mmWave radar. No blind zones, works through thin materials, detects even stationary presence.",
      price: 38.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 110,
      tags: ["presence", "proximity", "radar", "mmwave"],
      featured: false,
    },
    {
      name: "Wind Sensor",
      slug: "wind-sensor",
      description:
        "Ultrasonic anemometer measuring wind speed (0–60 m/s) and direction (360°). No moving parts, weatherproof IP67, ideal for smart home weather stations.",
      price: 79.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 80,
      tags: ["wind", "anemometer", "weather", "outdoor"],
      featured: false,
    },
    {
      name: "Rain Sensor",
      slug: "rain-sensor",
      description:
        "Detects presence and intensity of rainfall. Triggers automated roof windows, irrigation shutoff, and umbrella reminders. Response time < 2 seconds.",
      price: 17.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 150,
      tags: ["rain", "weather", "irrigation", "outdoor"],
      featured: false,
    },
    {
      name: "Garage Door Sensor",
      slug: "garage-door-sensor",
      description:
        "Monitors garage door position and status. Alerts if left open, detects unauthorized access. Tilt-based, works with any door type.",
      price: 23.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 120,
      tags: ["garage", "door", "tilt", "security"],
      featured: false,
    },
    {
      name: "Pressure Sensor",
      slug: "pressure-sensor",
      description:
        "Measures force applied to a surface: weight on smart scales, water pressure in plumbing (0–10 bar), or structural load monitoring.",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.SENSOR,
      stock: 100,
      tags: ["pressure", "weight", "plumbing", "structural"],
      featured: false,
    },
  ];

  // ── DEVICES / APPS / VIRTUAL SERVICES ─────────────────────────────
  const devices = [
    {
      name: "Weather Forecast Service",
      slug: "weather-forecast-service",
      description:
        "Virtual weather service integration. Pulls real-time localized weather data and 7-day forecasts directly into your EnvHUB dashboard. Enables automations like stopping irrigation if rain is forecasted.",
      price: 9.99,
      imageUrl:
        "https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=600",
      category: Category.HUB,
      stock: 9999,
      tags: ["weather", "forecast", "virtual", "service", "software"],
      featured: true,
    },
    {
      name: "Core4Health App",
      slug: "core4health-app",
      description:
        "Core4Health is a companion mobile app (iOS & Android) that integrates health and environmental data from your EnvHUB sensors. Tracks air quality, sleep environment, stress indicators, and generates personalized health insights powered by AI.",
      price: 0.0,
      imageUrl:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
      category: Category.HUB,
      stock: 9999,
      tags: ["app", "health", "mobile", "ai", "core4health"],
      featured: true,
    },
  ];

  // ── KITS (bundles with discount) ───────────────────────────────
  // Individual prices summed → apply ~20-25% discount
  const kits = [
    {
      name: "Starter Home Security Kit",
      slug: "starter-home-security-kit",
      description:
        "Everything you need to secure your home from day one. Includes Motion Sensor, 2× Door & Window Sensors, Smoke & CO Detector, and a Water Leak Sensor. Bought separately: €133.96 — save 22% with this kit.",
      price: 104.99, // vs 24.99 + 18.99*2 + 49.99 + 19.99 = 132.95 → ~21% off
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.KIT,
      stock: 50,
      tags: ["security", "starter", "bundle", "home"],
      featured: true,
    },
    {
      name: "Climate & Air Quality Kit",
      slug: "climate-air-quality-kit",
      description:
        "Monitor and automate your indoor climate. Includes Temperature & Humidity Sensor, Air Quality Sensor, Occupancy Sensor, and Light Sensor. Bought separately: €131.96 — save 23% with this kit.",
      price: 101.99, // vs 22.99 + 59.99 + 31.99 + 16.99 = 131.96 → ~23% off
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.KIT,
      stock: 50,
      tags: ["climate", "air", "hvac", "bundle"],
      featured: true,
    },
    {
      name: "Smart Garden Kit",
      slug: "smart-garden-kit",
      description:
        "Automate your garden and outdoor spaces. Includes Soil Moisture Sensor, Rain Sensor, UV Sensor, and Wind Sensor. Bought separately: €131.96 — save 25% with this kit.",
      price: 98.99, // vs 14.99 + 17.99 + 18.99 + 79.99 = 131.96 → ~25% off
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.KIT,
      stock: 40,
      tags: ["garden", "outdoor", "irrigation", "bundle"],
      featured: false,
    },
    {
      name: "Energy & Safety Kit",
      slug: "energy-safety-kit",
      description:
        "Protect your home and cut energy costs. Includes Energy Monitoring Sensor, Gas Leak Sensor, Smoke & CO Detector, and Vibration Sensor. Bought separately: €150.96 — save 24% with this kit.",
      price: 114.99, // vs 44.99 + 34.99 + 49.99 + 21.99 = 151.96 → ~24% off
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.KIT,
      stock: 40,
      tags: ["energy", "safety", "gas", "bundle"],
      featured: true,
    },
    {
      name: "Ultimate Smart Home Kit",
      slug: "ultimate-smart-home-kit",
      description:
        "The complete EnvHUB experience. Includes Motion Sensor, 2× Door & Window Sensors, Temperature & Humidity Sensor, Air Quality Sensor, Smoke & CO Detector, Water Leak Sensor, Energy Monitoring Sensor, and Presence Sensor. Bought separately: €296.91 — save 30% with this kit.",
      price: 207.99, // vs 24.99 + 18.99*2 + 22.99 + 59.99 + 49.99 + 19.99 + 44.99 + 38.99 = 299.91 → ~31% off
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      category: Category.KIT,
      stock: 30,
      tags: ["ultimate", "complete", "bundle", "smart-home"],
      featured: true,
    },
  ];

  const allProducts = [...sensors, ...devices, ...kits];

  for (const product of allProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(`\n✅ Seeded ${allProducts.length} products successfully.`);
  console.log(`   - ${sensors.length} sensors`);
  console.log(`   - ${devices.length} devices/apps`);
  console.log(`   - ${kits.length} kits`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
