"use client";

import * as React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ChevronLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";

const BG = "#0f0f13";
const CARD = "#16161f";
const BORDER = "#1e1e2a";
const MUTED = "#8888aa";
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

const tabTriggerClass =
  "rounded-none border-0 bg-transparent px-0 pb-2 text-sm shadow-none ring-0 focus-visible:ring-0 data-[active]:shadow-none dark:data-[active]:bg-transparent";

export type MyProfilePanelProps = {
  open: boolean;
  /** One step back: dismiss profile only (back chevron, overlay, Escape). */
  onBack: () => void;
  /** Close X: dismiss profile and entire account sidebar. */
  onClose: () => void;
};

export function MyProfilePanel({ open, onBack, onClose }: MyProfilePanelProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) onBack();
      }}
    >
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "flex h-full max-h-dvh w-[420px] max-w-[100vw] flex-col overflow-hidden p-0 gap-0 border-0 shadow-xl z-[60]",
          "rounded-tl-[28px] rounded-bl-none rounded-r-none border-l"
        )}
        style={{ backgroundColor: BG, borderColor: BORDER }}
      >
        <div className="flex min-h-0 flex-1 flex-col [font-family:var(--font-inter),sans-serif]">
          <header
            className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b px-4 py-3 relative shrink-0"
            style={{ borderColor: BORDER, backgroundColor: BG }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full text-white hover:bg-white/10"
              onClick={onBack}
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Back</span>
            </Button>
            <CardTitle className="col-start-2 justify-self-center border-0 p-0 text-center text-base font-semibold text-white shadow-none">
              My profile
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="col-start-3 size-9 justify-self-end rounded-full text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </Button>
          </header>

          <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col gap-6 px-4 pb-8 pt-5">
            {/* User identity */}
            <div className="flex items-center gap-3">
              <Avatar className="size-14 shrink-0 after:border-0">
                <AvatarFallback
                  className="text-xl font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #6c3fc5, #4a2d99)",
                  }}
                >
                  JA
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <CardTitle className="truncate border-0 p-0 text-lg font-semibold text-white shadow-none">
                  JanChaos
                </CardTitle>
                <CardDescription
                  className="flex items-center gap-1.5 truncate text-[13px]"
                  style={{ color: MUTED }}
                >
                  Last played: Mines <span aria-hidden>🎰</span>
                </CardDescription>
              </div>
            </div>

            {/* Total wagered */}
            <Card className="gap-0 border-0 bg-transparent py-0 shadow-none ring-0">
              <CardContent className="px-0">
                <CardTitle
                  className="mb-1 border-0 p-0 text-xs font-normal uppercase tracking-wider shadow-none"
                  style={{ color: MUTED }}
                >
                  Total wagered on Cloudbet
                </CardTitle>
                <CardTitle className="border-0 p-0 text-[32px] font-bold leading-tight text-white shadow-none">
                  $1,360.90
                </CardTitle>
                <div
                  className="mt-4 grid grid-cols-3 gap-3 pb-4"
                >
                  <div>
                    <Label className="mb-1 text-[11px] font-normal" style={{ color: MUTED }}>
                      Loyalty level
                    </Label>
                    <CardTitle className="flex items-center gap-1 border-0 p-0 text-sm font-semibold text-white shadow-none">
                      <span className="text-base" aria-hidden>
                        🥈
                      </span>
                      <span style={{ color: SILVER_BADGE }}>SILVER</span>
                    </CardTitle>
                  </div>
                  <div>
                    <Label className="mb-1 text-[11px] font-normal" style={{ color: MUTED }}>
                      Loyalty rewards
                    </Label>
                    <CardTitle className="border-0 p-0 text-sm font-semibold text-white shadow-none">
                      $28.48
                    </CardTitle>
                  </div>
                  <div>
                    <Label className="mb-1 text-[11px] font-normal" style={{ color: MUTED }}>
                      Top coin
                    </Label>
                    <CardTitle className="flex items-center gap-1 border-0 p-0 text-sm font-semibold text-white shadow-none">
                      <span
                        className="flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none"
                        style={{ backgroundColor: BTC_ORANGE, color: "#fff" }}
                        aria-hidden
                      >
                        ₿
                      </span>
                      BTC
                    </CardTitle>
                  </div>
                </div>
                <Separator style={{ backgroundColor: BORDER }} />
              </CardContent>
            </Card>

            <Tabs defaultValue="casino" className="w-full flex-col gap-0">
              <div className="border-b" style={{ borderColor: BORDER }}>
                <TabsList
                  variant="line"
                  className="h-auto min-h-0 w-full justify-start gap-6 rounded-none border-0 bg-transparent p-0 data-[variant=line]:bg-transparent"
                >
                  <TabsTrigger
                    value="recent"
                    disabled
                    className={cn(
                      tabTriggerClass,
                      "text-[#8888aa] opacity-100"
                    )}
                  >
                    Recent
                  </TabsTrigger>
                  <TabsTrigger
                    value="casino"
                    className={cn(
                      tabTriggerClass,
                      "text-[#8888aa] after:bg-[#7c4dff] data-[active]:font-medium data-[active]:text-white"
                    )}
                  >
                    Casino
                  </TabsTrigger>
                  <TabsTrigger
                    value="sports"
                    disabled
                    className={cn(
                      tabTriggerClass,
                      "text-[#8888aa] opacity-100"
                    )}
                  >
                    Sports
                  </TabsTrigger>
                  <TabsTrigger
                    value="esports"
                    disabled
                    className={cn(
                      tabTriggerClass,
                      "text-[#8888aa] opacity-100"
                    )}
                  >
                    Esports
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="recent" className="mt-4">
                <CardDescription className="text-sm" style={{ color: MUTED }}>
                  Nothing in Recent yet.
                </CardDescription>
              </TabsContent>

              <TabsContent value="casino" className="mt-4 flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="mb-1 text-[11px] font-normal uppercase" style={{ color: MUTED }}>
                      Casino wagered
                    </Label>
                    <CardTitle className="border-0 p-0 text-sm font-semibold text-white shadow-none">
                      $1.36K
                    </CardTitle>
                  </div>
                  <div>
                    <Label className="mb-1 text-[11px] font-normal uppercase" style={{ color: MUTED }}>
                      Most played
                    </Label>
                    <CardTitle className="flex items-center gap-1.5 border-0 p-0 text-sm font-semibold text-white shadow-none">
                      <span
                        className="flex size-5 shrink-0 items-center justify-center rounded-full text-xs"
                        style={{ backgroundColor: "#2a2a3a" }}
                        aria-hidden
                      >
                        🃏
                      </span>
                      Blackjack
                    </CardTitle>
                  </div>
                  <div>
                    <Label className="mb-1 text-[11px] font-normal uppercase" style={{ color: MUTED }}>
                      Favorite studio
                    </Label>
                    <CardTitle className="flex items-center gap-1.5 border-0 p-0 text-sm font-semibold text-white shadow-none">
                      <span
                        className="flex h-5 shrink-0 items-center rounded-full px-1.5 text-[10px] font-bold"
                        style={{ backgroundColor: "#2a2a3a", color: MUTED }}
                      >
                        RG
                      </span>
                      Relax Gaming
                    </CardTitle>
                  </div>
                </div>

                <div>
                  <CardTitle
                    className="mb-3 border-0 p-0 text-[11px] font-normal uppercase tracking-wider shadow-none"
                    style={{ color: MUTED }}
                  >
                    Highlights
                  </CardTitle>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {HIGHLIGHTS.map((row, i) => (
                      <li key={`${row.game}-${row.statLabel}-${i}`}>
                        <Card
                          size="sm"
                          className="min-h-[72px] gap-0 rounded-lg border-0 py-0 shadow-none ring-0"
                          style={{ backgroundColor: CARD }}
                        >
                          <CardContent className="flex items-center gap-3 p-3">
                            <div
                              className="flex size-12 shrink-0 items-center justify-center rounded-lg text-[22px]"
                              style={{ background: row.gradient }}
                            >
                              {row.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <CardTitle className="truncate border-0 p-0 text-sm font-semibold text-white shadow-none">
                                {row.game}
                              </CardTitle>
                              <CardDescription className="truncate text-xs" style={{ color: MUTED }}>
                                {row.studio}
                              </CardDescription>
                            </div>
                            <div className="shrink-0 text-right">
                              <CardDescription className="text-[11px]" style={{ color: MUTED }}>
                                {row.statLabel}
                              </CardDescription>
                              <CardTitle
                                className="border-0 p-0 text-sm font-semibold shadow-none"
                                style={{ color: row.valueColor }}
                              >
                                {row.statValue}
                              </CardTitle>
                            </div>
                          </CardContent>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="sports" className="mt-4">
                <CardDescription className="text-sm" style={{ color: MUTED }}>
                  Sports stats coming soon.
                </CardDescription>
              </TabsContent>

              <TabsContent value="esports" className="mt-4">
                <CardDescription className="text-sm" style={{ color: MUTED }}>
                  Esports stats coming soon.
                </CardDescription>
              </TabsContent>
            </Tabs>
          </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
