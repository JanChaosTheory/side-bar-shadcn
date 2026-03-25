"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bitcoin,
  Bomb,
  Dices,
  Hexagon,
  Spade,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MOBILE_AVATAR_GRADIENT,
  MOBILE_AVATAR_INITIALS,
  MOBILE_BORDER,
  MOBILE_CARD,
  MOBILE_MUTED,
} from "../constants";

const GREEN = "#22c55e";
const SILVER_BLUE = "#60a5fa";
const BTC_ORANGE = "#f7931a";

type Highlight = {
  icon: LucideIcon;
  gradient: string;
  statLabel: string;
  statValue: string;
  greenUnderline: boolean;
};

const HIGHLIGHTS: Highlight[] = [
  {
    gradient: "linear-gradient(135deg, #8b0000, #3a0000)",
    icon: Spade,
    statLabel: "Biggest win",
    statValue: "$25",
    greenUnderline: true,
  },
  {
    gradient: "linear-gradient(135deg, #1a472a, #0d2b1a)",
    icon: Zap,
    statLabel: "Biggest multiplier",
    statValue: "7.20x",
    greenUnderline: true,
  },
  {
    gradient: "linear-gradient(135deg, #8b0000, #3a0000)",
    icon: Spade,
    statLabel: "Wagered",
    statValue: "$747.5",
    greenUnderline: false,
  },
  {
    gradient: "linear-gradient(135deg, #1a472a, #0d2b1a)",
    icon: Zap,
    statLabel: "Wagered",
    statValue: "$220",
    greenUnderline: false,
  },
  {
    gradient: "linear-gradient(135deg, #1a1a5e, #0a0a3a)",
    icon: Bomb,
    statLabel: "Wagered",
    statValue: "$191.64",
    greenUnderline: false,
  },
];

const tabClass =
  "rounded-none border-0 bg-transparent px-0 pb-2 text-sm shadow-none ring-0 focus-visible:ring-0 data-[active]:shadow-none";

export function MobileMyProfileScreen() {
  return (
    <ScrollArea hideScrollbar className="min-h-0 flex-1">
      <div className="px-4 pb-8 pt-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-16 shrink-0 after:border-0">
            <AvatarFallback
              className="text-[22px] font-bold"
              style={{
                background: MOBILE_AVATAR_GRADIENT,
                color: MOBILE_AVATAR_INITIALS,
              }}
            >
              JA
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-bold text-white">JanChaos</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-[#8888aa]">
              Last played: Mines
              <Dices className="size-3.5 shrink-0 opacity-90" aria-hidden />
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p
            className="text-xs font-normal uppercase tracking-wider"
            style={{ color: MOBILE_MUTED }}
          >
            Total wagered on Cloudbet
          </p>
          <p className="mt-1 text-[32px] font-bold leading-tight text-white">
            $1,360.90
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <Card
            className="gap-0 rounded-[10px] border-0 py-0 shadow-none ring-0"
            style={{ backgroundColor: MOBILE_CARD }}
          >
            <CardContent className="space-y-1 p-2.5">
              <Label className="text-[11px] font-normal" style={{ color: MOBILE_MUTED }}>
                Loyalty level
              </Label>
              <div className="flex items-center gap-1">
                <div className="relative flex size-7 shrink-0 items-center justify-center">
                  <Hexagon
                    className="absolute size-7 text-[#c4b0ff]"
                    strokeWidth={1.5}
                  />
                  <span className="relative z-[1] text-[10px] font-bold text-white">
                    1
                  </span>
                </div>
                <span
                  className="text-sm font-bold uppercase"
                  style={{ color: SILVER_BLUE }}
                >
                  SILVER
                </span>
              </div>
            </CardContent>
          </Card>
          <Card
            className="gap-0 rounded-[10px] border-0 py-0 shadow-none ring-0"
            style={{ backgroundColor: MOBILE_CARD }}
          >
            <CardContent className="space-y-1 p-2.5">
              <Label className="text-[11px] font-normal" style={{ color: MOBILE_MUTED }}>
                Loyalty rewards
              </Label>
              <p className="text-sm font-bold text-white">$28.48</p>
            </CardContent>
          </Card>
          <Card
            className="gap-0 rounded-[10px] border-0 py-0 shadow-none ring-0"
            style={{ backgroundColor: MOBILE_CARD }}
          >
            <CardContent className="space-y-1 p-2.5">
              <Label className="text-[11px] font-normal" style={{ color: MOBILE_MUTED }}>
                Top coin
              </Label>
              <div className="flex items-center gap-1">
                <Avatar
                  className="size-5 shrink-0 rounded-full after:border-0"
                  aria-hidden
                >
                  <AvatarFallback
                    className="rounded-full border-0 p-0"
                    style={{ backgroundColor: BTC_ORANGE }}
                  >
                    <Bitcoin className="size-3 text-white" strokeWidth={2.5} />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold text-white">BTC</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="mt-6" style={{ backgroundColor: MOBILE_BORDER }} />

        <Tabs defaultValue="casino" className="mt-0 w-full">
          <TabsList
            variant="line"
            className="h-auto w-full justify-between gap-2 rounded-none border-b border-[#1e1e2a] bg-transparent p-0 pt-4"
          >
            <TabsTrigger
              value="recent"
              className={cn(tabClass, "text-[#8888aa]")}
            >
              Recent
            </TabsTrigger>
            <TabsTrigger
              value="casino"
              className={cn(
                tabClass,
                "text-[#8888aa] data-[active]:font-medium data-[active]:text-white data-[active]:after:absolute data-[active]:after:bottom-0 data-[active]:after:left-0 data-[active]:after:right-0 data-[active]:after:h-0.5 data-[active]:after:rounded-full data-[active]:after:bg-[#7c4dff] relative"
              )}
            >
              Casino
            </TabsTrigger>
            <TabsTrigger
              value="sports"
              className={cn(tabClass, "text-[#8888aa]")}
            >
              Sports
            </TabsTrigger>
            <TabsTrigger
              value="esports"
              className={cn(tabClass, "text-[#8888aa]")}
            >
              Esports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-6">
            <p className="text-center text-sm text-[#8888aa]">
              Nothing in Recent yet.
            </p>
          </TabsContent>

          <TabsContent value="casino" className="mt-6 flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[11px] font-normal uppercase text-[#8888aa]">
                  Casino wagered
                </p>
                <p className="mt-1 text-sm font-bold text-white">$1.36K</p>
              </div>
              <div>
                <p className="text-[11px] font-normal uppercase text-[#8888aa]">
                  Most played
                </p>
                <p className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-white">
                  <span aria-hidden>🃏</span>
                  Blackjack
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-normal uppercase text-[#8888aa]">
                  Favorite studio
                </p>
                <p className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-white">
                  <Sparkles className="size-3.5 shrink-0 text-amber-400" />
                  <span className="truncate">Relax G...</span>
                </p>
              </div>
            </div>

            <div>
              <p
                className="text-center text-[11px] font-normal uppercase tracking-wider"
                style={{ color: MOBILE_MUTED }}
              >
                Highlights
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {HIGHLIGHTS.map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <Card
                      key={`${row.statLabel}-${i}`}
                      className="gap-0 rounded-xl border-0 py-0 shadow-none ring-0"
                      style={{ backgroundColor: MOBILE_CARD }}
                    >
                      <CardContent className="flex flex-row items-center gap-3 p-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-[#8888aa]">{row.statLabel}</p>
                          <p
                            className={cn(
                              "mt-1 text-3xl font-bold leading-none",
                              row.greenUnderline && "underline decoration-2 underline-offset-2"
                            )}
                            style={{
                              color: row.greenUnderline ? GREEN : "#ffffff",
                            }}
                          >
                            {row.statValue}
                          </p>
                        </div>
                        <Avatar className="size-16 shrink-0 rounded-lg after:border-0">
                          <AvatarFallback
                            className="rounded-lg [&>svg]:size-7"
                            style={{ background: row.gradient }}
                          >
                            <Icon className="text-white" strokeWidth={1.75} />
                          </AvatarFallback>
                        </Avatar>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sports" className="mt-6">
            <p className="text-center text-sm text-[#8888aa]">
              Sports stats coming soon.
            </p>
          </TabsContent>

          <TabsContent value="esports" className="mt-6">
            <p className="text-center text-sm text-[#8888aa]">
              Esports stats coming soon.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
