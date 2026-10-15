import WeatherDisplay from "@/components/WeatherDisplay";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center pt-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10 text-xs text-slate-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live weather data · No API key required
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Weather,{" "}
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            reimagined
          </span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Real-time weather conditions for cities around the world. Clean,
          fast, and beautifully simple.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/services"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all"
          >
            Explore Services
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-white font-medium hover:bg-white/10 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Weather Display */}
      <section>
        <WeatherDisplay />
      </section>

      {/* Features Section (instead of plain About) */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Why WeatherApp?
          </h2>
          <p className="text-slate-400">
            Everything you need to stay weather-aware.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Real-Time Data",
              desc: "Updated every few seconds directly from Open-Meteo.",
              icon: "⚡",
            },
            {
              title: "Global Coverage",
              desc: "Search any major city worldwide with instant results.",
              icon: "🌍",
            },
            {
              title: "100% Free",
              desc: "No API keys, no sign-ups, no hidden costs. Ever.",
              icon: "💎",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 hover:border-white/20 transition group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition inline-block">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}