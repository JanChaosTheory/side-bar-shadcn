"use client";

import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

const BG = "#0f0f13";
const CARD = "#16161f";
const BORDER = "#1e1e2a";
const MUTED = "#8888aa";
const ACCENT = "#7c4dff";
const GREEN = "#22c55e";
const PURPLE_STAT = "#a78bfa";
const SILVER_BADGE = "#c4b0ff";
const BTC_ORANGE = "#f7931a";

const HIGHLIGHTS = [
  {
    gradient: "linear-gradient(135deg, #8b0000, #3a0000)",
    icon: "♠️",
    game: "Blackjack Neo",
    studio: "Relax Gaming",
    statLabel: "Biggest win",
    statValue: "$25",
    valueColor: GREEN,
  },
  {
    gradient: "linear-gradient(135deg, #1a472a, #0d2b1a)",
    icon: "⚡",
    game: "Gates of Olympus",
    studio: "Pragmatic Play",
    statLabel: "Biggest multiplier",
    statValue: "7.20x",
    valueColor: PURPLE_STAT,
  },
  {
    gradient: "linear-gradient(135deg, #8b0000, #3a0000)",
    icon: "♠️",
    game: "Blackjack Neo",
    studio: "Relax Gaming",
    statLabel: "Wagered",
    statValue: "$747.5",
    valueColor: "#ffffff",
  },
  {
    gradient: "linear-gradient(135deg, #1a472a, #0d2b1a)",
    icon: "⚡",
    game: "Gates of Olympus",
    studio: "Pragmatic Play",
    statLabel: "Wagered",
    statValue: "$220",
    valueColor: "#ffffff",
  },
  {
    gradient: "linear-gradient(135deg, #1a1a5e, #0a0a3a)",
    icon: "💣",
    game: "Mines",
    studio: "Spribe",
    statLabel: "Wagered",
    statValue: "$191.64",
    valueColor: "#ffffff",
  },
] as const;

export type MyProfilePanelProps = {
  open: boolean;
  onClose: () => void;
};

export function MyProfilePanel({ open, onClose }: MyProfilePanelProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-[420px] max-w-[100vw] p-0 gap-0 overflow-y-auto border-0 shadow-xl z-[60]",
          // Match Account sidebar: round inner top corner, flush to right edge
          "rounded-tl-[28px] rounded-bl-none rounded-r-none border-l"
        )}
        style={{ backgroundColor: BG, borderColor: BORDER }}
      >
        <div className="flex flex-col min-h-full [font-family:var(--font-inter),sans-serif]">
          {/* Header */}
          <header
            className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-3 shrink-0 border-b relative"
            style={{ borderColor: BORDER, backgroundColor: BG }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full text-white hover:bg-white/10"
              onClick={onClose}
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-base font-semibold text-white text-center justify-self-center col-start-2">
              My profile
            </h1>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full text-white hover:bg-white/10 justify-self-end col-start-3"
              onClick={onClose}
            >
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </header>

          <div className="flex flex-col px-4 pb-8 pt-5 gap-6">
            {/* User identity */}
            <div className="flex items-center gap-3">
              <div
                className="size-14 shrink-0 rounded-full flex items-center justify-center text-xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #6c3fc5, #4a2d99)",
                }}
              >
                JA
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg font-semibold text-white truncate">
                  JanChaos
                </span>
                <span
                  className="text-[13px] flex items-center gap-1.5 truncate"
                  style={{ color: MUTED }}
                >
                  Last played: Mines <span aria-hidden>🎰</span>
                </span>
              </div>
            </div>

            {/* Total wagered */}
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: MUTED }}
              >
                Total wagered on Cloudbet
              </p>
              <p className="text-[32px] font-bold text-white leading-tight">
                $1,360.90
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4 pb-4 border-b" style={{ borderColor: BORDER }}>
                <div>
                  <p className="text-[11px] mb-1" style={{ color: MUTED }}>
                    Loyalty level
                  </p>
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    <span className="text-base" aria-hidden>
                      🥈
                    </span>
                    <span style={{ color: SILVER_BADGE }}>SILVER</span>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] mb-1" style={{ color: MUTED }}>
                    Loyalty rewards
                  </p>
                  <p className="text-sm font-semibold text-white">$28.48</p>
                </div>
                <div>
                  <p className="text-[11px] mb-1" style={{ color: MUTED }}>
                    Top coin
                  </p>
                  <p className="text-sm font-semibold text-white flex items-center gap-1">
                    <span
                      className="size-4 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold leading-none"
                      style={{ backgroundColor: BTC_ORANGE, color: "#fff" }}
                      aria-hidden
                    >
                      ₿
                    </span>
                    BTC
                  </p>
                </div>
              </div>
            </div>

            {/* Tab bar */}
            <div className="border-b" style={{ borderColor: BORDER }}>
              <div className="flex gap-6 text-sm">
                {(["Recent", "Casino", "Sports", "Esports"] as const).map((tab) => {
                  const active = tab === "Casino";
                  return (
                    <button
                      key={tab}
                      type="button"
                      className={cn(
                        "pb-2 -mb-px border-b-2",
                        active
                          ? "text-white font-medium border-[#7c4dff]"
                          : "text-[#8888aa] cursor-default pointer-events-none border-transparent"
                      )}
                      aria-current={active ? "page" : undefined}
                      tabIndex={active ? 0 : -1}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Casino stats row */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[11px] uppercase mb-1" style={{ color: MUTED }}>
                  Casino wagered
                </p>
                <p className="text-sm font-semibold text-white">$1.36K</p>
              </div>
              <div>
                <p className="text-[11px] uppercase mb-1" style={{ color: MUTED }}>
                  Most played
                </p>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span
                    className="size-5 rounded-full flex items-center justify-center text-xs shrink-0"
                    style={{ backgroundColor: "#2a2a3a" }}
                    aria-hidden
                  >
                    🃏
                  </span>
                  Blackjack
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase mb-1" style={{ color: MUTED }}>
                  Favorite studio
                </p>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span
                    className="h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center shrink-0"
                    style={{ backgroundColor: "#2a2a3a", color: MUTED }}
                  >
                    RG
                  </span>
                  Relax Gaming
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <p
                className="text-[11px] uppercase tracking-wider mb-3"
                style={{ color: MUTED }}
              >
                Highlights
              </p>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {HIGHLIGHTS.map((row, i) => (
                  <li
                    key={`${row.game}-${row.statLabel}-${i}`}
                    className="flex items-center gap-3 p-3 rounded-lg min-h-[72px]"
                    style={{ backgroundColor: CARD }}
                  >
                    <div
                      className="size-12 shrink-0 rounded-lg flex items-center justify-center text-[22px]"
                      style={{ background: row.gradient }}
                    >
                      {row.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {row.game}
                      </p>
                      <p className="text-xs truncate" style={{ color: MUTED }}>
                        {row.studio}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px]" style={{ color: MUTED }}>
                        {row.statLabel}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: row.valueColor }}
                      >
                        {row.statValue}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
