"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import WeatherIcon from "./WeatherIcon";

const weatherCodeMap = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Violent Rain",
  95: "Thunderstorm",
  96: "Thunderstorm + Hail",
  99: "Thunderstorm + Hail",
};

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [city, setCity] = useState("Dhaka");
  const [coords, setCoords] = useState({ lat: 23.8103, lon: 90.4125 });
  const [country, setCountry] = useState("Bangladesh");

  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch weather whenever coords change
  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${coords.lat}&longitude=${coords.lon}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code` +
          `&timezone=auto`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const data = await res.json();
        setWeather(data.current);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [coords]);

  // Geocoding search (with debounce)
  const searchLocations = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSearching(true);
    try {
      const url =
        `https://geocoding-api.open-meteo.com/v1/search` +
        `?name=${encodeURIComponent(query.trim())}` +
        `&count=8&language=en&format=json`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setSuggestions(data.results || []);
      setShowSuggestions(true);
      setHighlightIndex(-1);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Debounce effect: 500ms after user stops typing
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchInput || searchInput.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      searchLocations(searchInput);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, searchLocations]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLocation = (loc) => {
    setCoords({ lat: loc.latitude, lon: loc.longitude });
    setCity(loc.name);
    setCountry(loc.country || "");
    setSearchInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    setError(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (highlightIndex >= 0 && suggestions[highlightIndex]) {
      selectLocation(suggestions[highlightIndex]);
    } else if (suggestions.length > 0) {
      selectLocation(suggestions[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setCity("Your Location");
        setCountry("");
        setError(null);
      },
      () => setError("Location access denied")
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 relative"
          ref={searchRef}
        >
          {/* Search Icon — fixed: brighter color, z-10, no blur on input */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search any city or village worldwide..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition"
          />

          {/* Loading spinner inside input */}
          {searching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <div className="w-4 h-4 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            </div>
          )}

          {/* Clear button */}
          {searchInput && !searching && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white transition z-10"
              aria-label="Clear"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {suggestions.map((loc, idx) => (
                <button
                  key={loc.id || idx}
                  type="button"
                  onClick={() => selectLocation(loc)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 transition ${
                    highlightIndex === idx
                      ? "bg-indigo-500/20"
                      : "hover:bg-white/5"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {loc.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {[loc.admin1, loc.country].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  {loc.population > 0 && (
                    <span className="text-[10px] text-slate-500 shrink-0 mt-1">
                      {loc.population > 1000000
                        ? `${(loc.population / 1000000).toFixed(1)}M`
                        : loc.population > 1000
                        ? `${(loc.population / 1000).toFixed(0)}K`
                        : loc.population}
                    </span>
                  )}
                </button>
              ))}
              <div className="px-4 py-2 border-t border-white/10 bg-white/5">
                <p className="text-[10px] text-slate-500 text-center">
                  Powered by Open-Meteo Geocoding API
                </p>
              </div>
            </div>
          )}

          {/* No results message */}
          {showSuggestions &&
            !searching &&
            searchInput.trim().length >= 2 &&
            suggestions.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-white/10 shadow-2xl p-4 z-50">
                <p className="text-sm text-slate-400 text-center">
                  No locations found for &ldquo;{searchInput}&rdquo;
                </p>
              </div>
            )}
        </form>

        {/* My Location button (আগের মতোই আছে) */}
        <button
          onClick={handleUseMyLocation}
          className="px-5 py-3 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-white hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          My Location
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Weather Card */}
      <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm">Fetching weather...</p>
          </div>
        ) : weather ? (
          <>
            {/* Top Section: City + Icon + Temp */}
            <div className="p-8 border-b border-white/10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                    <svg
                      className="w-4 h-4 text-indigo-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-slate-300 text-sm font-medium">
                      {city}
                      {country && (
                        <span className="text-slate-500"> · {country}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-6xl md:text-7xl font-bold text-white tracking-tight">
                      {Math.round(weather.temperature_2m)}°
                    </span>
                    <span className="text-2xl text-slate-400 font-light">
                      C
                    </span>
                  </div>
                  <p className="text-slate-300 text-lg mt-2 font-medium">
                    {weatherCodeMap[weather.weather_code] || "Unknown"}
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Feels like {Math.round(weather.apparent_temperature)}°C
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                  <WeatherIcon
                    code={weather.weather_code}
                    className="w-32 h-32 relative"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Section: Details Grid */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              <DetailCard
                label="Humidity"
                value={`${weather.relative_humidity_2m}%`}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                }
                color="text-cyan-400"
                bg="bg-cyan-500/10"
              />
              <DetailCard
                label="Wind Speed"
                value={`${weather.wind_speed_10m} km/h`}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                  </svg>
                }
                color="text-purple-400"
                bg="bg-purple-500/10"
              />
              <DetailCard
                label="Time"
                value={new Date(weather.time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="text-amber-400"
                bg="bg-amber-500/10"
              />
              <DetailCard
                label="Interval"
                value={`${weather.interval}s`}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
                color="text-emerald-400"
                bg="bg-emerald-500/10"
              />
            </div>

            {/* Footer note */}
            <div className="px-6 pb-5 pt-1">
              <p className="text-xs text-slate-500 text-center">
                Last updated:{" "}
                {new Date(weather.time).toLocaleString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function DetailCard({ label, value, icon, color, bg }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-4 hover:bg-white/10 transition group">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center ${color} group-hover:scale-110 transition`}
        >
          {icon}
        </div>
      </div>
      <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
        {label}
      </p>
      <p className="text-lg font-semibold text-white mt-1">{value}</p>
    </div>
  );
}