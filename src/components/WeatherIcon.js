export default function WeatherIcon({ code, className = "w-16 h-16" }) {
  // Sunny / Clear
  if (code === 0 || code === 1) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="12" fill="#fbbf24" />
        <g stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="58" />
          <line x1="6" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="58" y2="32" />
          <line x1="13" y1="13" x2="17" y2="17" />
          <line x1="47" y1="47" x2="51" y2="51" />
          <line x1="13" y1="51" x2="17" y2="47" />
          <line x1="47" y1="17" x2="51" y2="13" />
        </g>
      </svg>
    );
  }

  // Partly cloudy
  if (code === 2) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <circle cx="24" cy="24" r="9" fill="#fbbf24" />
        <path
          d="M20 44a10 10 0 0110-10 12 12 0 0123 3 8 8 0 01-2 15H22a8 8 0 01-2-8z"
          fill="#e2e8f0"
          opacity="0.95"
        />
      </svg>
    );
  }

  // Overcast
  if (code === 3) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <path
          d="M14 40a10 10 0 0110-10 12 12 0 0123 3 8 8 0 01-2 15H16a8 8 0 01-2-8z"
          fill="#94a3b8"
        />
        <path
          d="M24 30a10 10 0 0110-10 12 12 0 0120 4 8 8 0 010 14H26a8 8 0 01-2-8z"
          fill="#cbd5e1"
          opacity="0.9"
        />
      </svg>
    );
  }

  // Fog / mist
  if (code === 45 || code === 48) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <path
          d="M20 28a10 10 0 0110-10 12 12 0 0121 4 8 8 0 010 14H22a8 8 0 01-2-8z"
          fill="#cbd5e1"
        />
        <g stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
          <line x1="16" y1="48" x2="48" y2="48" />
          <line x1="20" y1="54" x2="44" y2="54" />
        </g>
      </svg>
    );
  }

  // Drizzle / Rain
  if (
    code === 51 || code === 53 || code === 55 ||
    code === 61 || code === 63 || code === 65 ||
    code === 80 || code === 81 || code === 82
  ) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <path
          d="M14 36a10 10 0 0110-10 12 12 0 0123 3 8 8 0 01-2 15H16a8 8 0 01-2-8z"
          fill="#94a3b8"
        />
        <g stroke="#60a5fa" strokeWidth="3" strokeLinecap="round">
          <line x1="22" y1="48" x2="20" y2="56" />
          <line x1="32" y1="48" x2="30" y2="56" />
          <line x1="42" y1="48" x2="40" y2="56" />
        </g>
      </svg>
    );
  }

  // Snow
  if (code === 71 || code === 73 || code === 75) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <path
          d="M14 36a10 10 0 0110-10 12 12 0 0123 3 8 8 0 01-2 15H16a8 8 0 01-2-8z"
          fill="#94a3b8"
        />
        <g fill="#e0f2fe">
          <circle cx="22" cy="50" r="2.5" />
          <circle cx="32" cy="54" r="2.5" />
          <circle cx="42" cy="50" r="2.5" />
        </g>
      </svg>
    );
  }

  // Thunderstorm
  if (code === 95 || code === 96 || code === 99) {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none">
        <path
          d="M14 36a10 10 0 0110-10 12 12 0 0123 3 8 8 0 01-2 15H16a8 8 0 01-2-8z"
          fill="#64748b"
        />
        <path d="M30 44l-5 10h6l-3 8 9-13h-6l4-5z" fill="#fbbf24" />
      </svg>
    );
  }

  // Default
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <path
        d="M14 36a10 10 0 0110-10 12 12 0 0123 3 8 8 0 01-2 15H16a8 8 0 01-2-8z"
        fill="#94a3b8"
      />
    </svg>
  );
}