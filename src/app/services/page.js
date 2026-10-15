const services = [
  {
    title: "Real-Time Weather",
    description:
      "Current temperature, humidity, wind speed, and weather conditions for any location — updated live.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    title: "Accurate Forecasts",
    description:
      "Powered by Open-Meteo which combines data from 30+ global weather models for precision.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
  },
  {
    title: "Responsive Design",
    description:
      "Access weather information seamlessly on mobile, tablet, and desktop devices.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "No API Key Required",
    description:
      "Open-Meteo is completely free and does not require any API key, sign-up, or credit card.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    title: "Global City Search",
    description:
      "Look up real-time weather for major cities around the world in an instant.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    title: "Live Geolocation",
    description:
      "One tap to fetch weather for your current location using GPS.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
  },
];

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10 text-xs text-slate-300 mb-4">
          Services
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          What we{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            offer
          </span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Powerful weather features, beautifully delivered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {services.map((s) => (
          <div
            key={s.title}
            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} border border-white/10 flex items-center justify-center ${s.iconColor} mb-4 group-hover:scale-110 transition`}
            >
              {s.icon}
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">
              {s.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}