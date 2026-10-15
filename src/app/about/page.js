export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10 text-xs text-slate-300 mb-4">
          About
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          About{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            WeatherApp
          </span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          A modern weather experience built with care.
        </p>
      </div>

      {/* Content Card */}
      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">
              Fast &amp; Reliable
            </h2>
            <p className="text-slate-400 leading-relaxed">
              WeatherApp is a lightweight, fast, and reliable weather
              application built using modern web technologies. Our goal is to
              deliver accurate weather information without clutter or
              unnecessary complications.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">
              Global Data Source
            </h2>
            <p className="text-slate-400 leading-relaxed">
              We leverage the Open-Meteo API, which aggregates data from over
              30 national weather services worldwide. This ensures you always
              get the most accurate and up-to-date weather data for any
              location.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">
              Modern Tech Stack
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Built with Next.js for optimal performance and Tailwind CSS for a
              clean, fully responsive design that works beautifully on any
              device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}