"use client";

import { cn } from "@/lib/utils";

/** Same empty-state art as desktop inbox; unique gradient IDs for mobile DOM. */
export function MobileInboxIllustration({ className }: { className?: string }) {
  const accent = "#64748b";
  return (
    <svg
      className={cn(
        "mx-auto w-[min(248px,78vw)] max-w-[248px] text-slate-500",
        className
      )}
      viewBox="0 0 240 216"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="m-inbox-card" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5c5c68" />
          <stop offset="100%" stopColor="#45454f" />
        </linearGradient>
        <linearGradient id="m-inbox-env-inner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3f3f48" />
          <stop offset="100%" stopColor="#2e2e35" />
        </linearGradient>
        <linearGradient id="m-inbox-pocket" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4b4b56" />
          <stop offset="100%" stopColor="#3a3a44" />
        </linearGradient>
        <linearGradient id="m-inbox-flap-top" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#383840" />
          <stop offset="100%" stopColor="#52525e" />
        </linearGradient>
        <linearGradient id="m-inbox-flap-shade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2a32" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#45454f" stopOpacity={0.5} />
        </linearGradient>
        <filter id="m-inbox-drop" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="8"
            floodColor="#000"
            floodOpacity="0.4"
          />
        </filter>
      </defs>
      <g fill={accent} opacity={0.38}>
        <circle cx="44" cy="156" r="2.2" />
        <circle cx="196" cy="168" r="1.5" />
        <circle cx="54" cy="68" r="1.8" />
      </g>
      <circle
        cx="38"
        cy="178"
        r="4"
        fill="none"
        stroke={accent}
        strokeWidth={1.25}
        opacity={0.42}
      />
      <path fill={accent} opacity={0.4} d="M22 36 32 54h-5l12 26L18 48h8z" />
      <path fill={accent} opacity={0.32} d="M194 138 200 150h-4l8 18-12-16h5z" />
      <path fill={accent} opacity={0.43} d="M192 32 L196.5 39 L192 46 L187.5 39 Z" />
      <g fill={accent} opacity={0.36}>
        <rect x="168" y="26" width="1.8" height="11" rx="0.4" />
        <rect x="163.5" y="30.5" width="11" height="1.8" rx="0.4" />
      </g>
      <g filter="url(#m-inbox-drop)" transform="translate(120, 128)">
        <rect
          x="-32"
          y="-62"
          width="64"
          height="50"
          rx="4"
          fill="url(#m-inbox-card)"
        />
        <path
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.42}
          d="M-14 -44 L14 -32 M14 -44 L-14 -32"
        />
        <path
          d="M-78 14 L0 -66 L78 14 L78 68 L-78 68 Z"
          fill="url(#m-inbox-env-inner)"
        />
        <path d="M-74 12 L0 -62 L74 12 L74 64 L-74 64 Z" fill="#25252c" />
        <path d="M-78 14 L0 50 L78 14 Z" fill="url(#m-inbox-pocket)" />
        <path d="M-78 14 L0 -66 L78 14 L0 38 Z" fill="url(#m-inbox-flap-top)" />
        <path
          d="M0 -66 L78 14 L0 38 L-78 14 Z"
          fill="url(#m-inbox-flap-shade)"
        />
      </g>
    </svg>
  );
}
