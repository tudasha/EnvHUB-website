import { HeartPulse, BrainCircuit, Home, Puzzle, CheckCircle2, X } from "lucide-react";

export function CompetitorComparison() {
  const features = [
    { name: "Health Monitoring", icon: HeartPulse },
    { name: "AI Assistant & Smart Suggestions", icon: BrainCircuit },
    { name: "Smart Home Control", icon: Home },
    { name: "Compatibility & Easy Installation", icon: Puzzle },
  ];

  const competitors = [
    {
      name: "Apple Home",
      scores: [true, false, true, false],
    },
    {
      name: "Google Home",
      scores: [false, true, true, true],
    },
    {
      name: "CORE4 ENVIRONMENT",
      isUs: true,
      scores: [true, true, true, true],
    },
  ];

  return (
    <section className="py-24 px-4 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            The Smart Choice
          </h3>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            See how CORE4ENVIRONMENT stacks up against the competition. We deliver a complete ecosystem without compromises.
          </p>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 border-b border-r border-white/10 bg-white/5 w-1/5"></th>
                  {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <th
                        key={i}
                        className="p-6 text-center border-b border-r last:border-r-0 border-white/10 bg-white/5 min-w-[160px] w-1/5"
                      >
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Icon className="w-8 h-8 text-emerald-400" />
                          <span className="text-sm font-medium text-white/90">
                            {feature.name}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      comp.isUs ? "bg-emerald-500/5" : ""
                    }`}
                  >
                    <td
                      className={`p-6 border-b last:border-b-0 border-r border-white/10 font-bold ${
                        comp.isUs ? "text-emerald-400 text-xl" : "text-white/80 text-lg"
                      }`}
                    >
                      {comp.name}
                    </td>
                    {comp.scores.map((hasFeature, colIndex) => (
                      <td
                        key={colIndex}
                        className={`p-6 text-center border-b last:border-b-0 border-r last:border-r-0 border-white/10 ${
                          comp.isUs ? "bg-emerald-500/5" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          {hasFeature ? (
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                          ) : (
                            <X className="w-8 h-8 text-white/20" />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
