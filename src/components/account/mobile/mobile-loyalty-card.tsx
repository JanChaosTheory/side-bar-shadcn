"use client";

import * as React from "react";
import { Hexagon } from "lucide-react";
import { MOBILE_CARD } from "./constants";

export function MobileLoyaltyCard() {
  return (
    <div
      className="mx-4 flex flex-row items-center gap-3 rounded-xl px-4 py-3.5"
      style={{ backgroundColor: MOBILE_CARD }}
    >
      <div className="relative flex size-9 shrink-0 items-center justify-center">
        <Hexagon
          className="absolute size-9 text-[#60a5fa]"
          strokeWidth={1.5}
          aria-hidden
        />
        <span className="relative z-[1] text-xs font-bold text-white">1</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold uppercase tracking-wide text-[#60a5fa]">
          SILVER 1
        </p>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
          <div
            className="h-full w-[40%] rounded-full bg-[#60a5fa]"
            aria-hidden
          />
        </div>
        <p className="mt-1.5 text-xs" style={{ color: "#8888aa" }}>
          Wager <span className="font-semibold text-white">$640</span> more
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-center">
        <div className="flex items-center gap-1.5 rounded-full bg-zinc-800/90 px-2.5 py-1">
          <span className="text-sm font-semibold text-white">$2</span>
          <div className="relative flex size-5 shrink-0 items-center justify-center">
            <Hexagon
              className="absolute size-5 text-[#60a5fa]"
              strokeWidth={1.5}
              aria-hidden
            />
            <span className="relative z-[1] text-[9px] font-bold text-white">
              2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
