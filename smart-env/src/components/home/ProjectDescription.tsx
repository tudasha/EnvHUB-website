import { Layers, Zap, ShieldCheck, Activity, Globe } from "lucide-react";

export function ProjectDescription() {
  return (
    <section className="py-24 px-4 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            The Ecosystem
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            CORE4ENVIRONMENT
          </h3>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            CORE4ENVIRONMENT is a unified, intelligent ecosystem designed to seamlessly connect your physical living space with advanced AI and real-time data processing. By combining modular hardware with a powerful software suite, we empower you to monitor, optimize, and automate your environment for better health, energy efficiency, and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* App 1: EnvHUB Website */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Globe className="w-8 h-8 text-emerald-400 mb-6" />
            <h4 className="text-xl font-bold text-white mb-3">EnvHUB Storefront</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Our intelligent e-commerce platform. It features an AI-driven recommendation engine that analyzes your needs and builds personalized sensor packages to perfectly match your lifestyle.
            </p>
          </div>

          {/* App 2: Smart Hub Dashboard */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Layers className="w-8 h-8 text-blue-400 mb-6" />
            <h4 className="text-xl font-bold text-white mb-3">Control Dashboard</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              The central tablet interface for your home. View live indoor climate data, weather forecasts, transit schedules, and health metrics in one beautiful, modular command center.
            </p>
          </div>

          {/* App 3: The Backend Brain */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Activity className="w-8 h-8 text-purple-400 mb-6" />
            <h4 className="text-xl font-bold text-white mb-3">Core Engine</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              A robust WebSocket and API backend that processes live sensor streams, manages user schedules, synchronizes community data, and leverages OpenAI for real-time proactive alerts.
            </p>
          </div>

          {/* App 4: Hardware Nodes */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="w-8 h-8 text-amber-400 mb-6" />
            <h4 className="text-xl font-bold text-white mb-3">Hardware Nodes</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Physical ESP and Arduino devices deployed in your space. They gather environmental data (temperature, motion, electric flow) and execute physical actions like toggling ventilation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
