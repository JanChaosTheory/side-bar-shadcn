"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bitcoin,
  Bomb,
  Building2,
  ChevronLeft,
  Club,
  Dices,
  Medal,
  Spade,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BG = "#0f0f13";
const CARD = "#16161f";
const BORDER = "#1e1e2a";
const MUTED = "#8888aa";
const GREEN = "#22c55e";
const PURPLE_STAT = "#a78bfa";
const SILVER_BADGE = "#c4b0ff";
const BTC_ORANGE = "#f7931a";

type HighlightRow = {
  icon: LucideIcon;
  gradient: string;
  game: string;
  studio: string;
  statLabel: string;
  statValue: string;
  valueColor: string;
};

const HIGHLIGHTS: HighlightRow[] = [
  {
    gradient: "linear-gradient(135deg, #8b0000, #3a0000)",
    icon: Spade,
    game: "Blackjack Neo",
    studio: "Relax Gaming",
    statLabel: "Biggest win",
    statValue: "$25",
    valueColor: GREEN,
  },
  {
    gradient: "linear-gradient(135deg, #1a472a, #0d2b1a)",
    icon: Zap,
    game: "Gates of Olympus",
    studio: "Pragmatic Play",
    statLabel: "Biggest multiplier",
    statValue: "7.20x",
    valueColor: PURPLE_STAT,
  },
  {
    gradient: "linear-gradient(135deg, #8b0000, #3a0000)",
    icon: Spade,
    game: "Blackjack Neo",
    studio: "Relax Gaming",
    statLabel: "Wagered",
    statValue: "$747.5",
    valueColor: "#ffffff",
  },
  {
    gradient: "linear-gradient(135deg, #1a472a, #0d2b1a)",
    icon: Zap,
    game: "Gates of Olympus",
    studio: "Pragmatic Play",
    statLabel: "Wagered",
    statValue: "$220",
    valueColor: "#ffffff",
  },
  {
    gradient: "linear-gradient(135deg, #1a1a5e, #0a0a3a)",
    icon: Bomb,
    game: "Mines",
    studio: "Spribe",
    statLabel: "Wagered",
    statValue: "$191.64",
    valueColor: "#ffffff",
  },
];

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
          "flex h-[100dvh] max-h-[100dvh] w-[420px] max-w-[100vw] flex-col overflow-hidden p-0 gap-0 border-0 shadow-xl z-[60]",
          "rounded-tl-[28px] rounded-bl-none rounded-r-none border-l"
        )}
        style={{ backgroundColor: BG, borderColor: BORDER }}
      >
        <Card className="flex min-h-0 flex-1 flex-col rounded-none border-0 bg-transparent py-0 shadow-none ring-0 gap-0 [font-family:var(--font-inter),sans-serif]">
          <SheetHeader
            className="sticky top-0 z-10 grid grid-cols-[auto_1fr_auto] items-center gap-2 space-y-0 border-b p-0 px-4 py-3"
            style={{ borderColor: BORDER, backgroundColor: BG }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full text-white hover:bg-white/10"
              aria-label="Back"
              onClick={onBack}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <SheetTitle className="col-start-2 justify-self-center border-0 p-0 text-center text-base font-semibold text-white shadow-none">
              My profile
            </SheetTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="col-start-3 size-9 justify-self-end rounded-full text-white hover:bg-white/10"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="size-5" />
            </Button>
          </SheetHeader>

          <ScrollArea hideScrollbar className="min-h-0 min-w-0 flex-1">
            <FieldGroup className="gap-6 px-4 pb-8 pt-5">
            {/* User identity */}
            <Card className="border-0 bg-transparent py-0 shadow-none ring-0">
              <CardContent className="flex items-center gap-3 px-0">
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
              <CardHeader className="min-w-0 flex-1 border-0 p-0">
                <CardTitle className="truncate border-0 p-0 text-lg font-semibold text-white shadow-none">
                  JanChaos
                </CardTitle>
                <CardDescription
                  className="flex items-center gap-1.5 truncate text-[13px]"
                  style={{ color: MUTED }}
                >
                  Last played: Mines
                  <Dices className="size-3.5 shrink-0 opacity-90" aria-hidden />
                </CardDescription>
              </CardHeader>
              </CardContent>
            </Card>

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
                <Card className="mt-4 border-0 bg-transparent py-0 shadow-none ring-0">
                  <CardContent className="grid grid-cols-3 gap-3 p-0 pb-4">
                  <Card
                    size="sm"
                    className="border-0 bg-transparent py-0 shadow-none ring-0"
                  >
                    <CardContent className="space-y-1 p-0">
                      <Label className="text-[11px] font-normal" style={{ color: MUTED }}>
                        Loyalty level
                      </Label>
                      <CardTitle className="flex items-center gap-1 border-0 p-0 text-sm font-semibold text-white shadow-none">
                        <Medal
                          className="size-4 shrink-0"
                          style={{ color: SILVER_BADGE }}
                          aria-hidden
                        />
                        <Badge
                          variant="secondary"
                          className="border-0 bg-transparent px-0 py-0 text-sm font-semibold shadow-none hover:bg-transparent"
                          style={{ color: SILVER_BADGE }}
                        >
                          SILVER
                        </Badge>
                      </CardTitle>
                    </CardContent>
                  </Card>
                  <Card
                    size="sm"
                    className="border-0 bg-transparent py-0 shadow-none ring-0"
                  >
                    <CardContent className="space-y-1 p-0">
                      <Label className="text-[11px] font-normal" style={{ color: MUTED }}>
                        Loyalty rewards
                      </Label>
                      <CardTitle className="border-0 p-0 text-sm font-semibold text-white shadow-none">
                        $28.48
                      </CardTitle>
                    </CardContent>
                  </Card>
                  <Card
                    size="sm"
                    className="border-0 bg-transparent py-0 shadow-none ring-0"
                  >
                    <CardContent className="space-y-1 p-0">
                      <Label className="text-[11px] font-normal" style={{ color: MUTED }}>
                        Top coin
                      </Label>
                      <CardTitle className="flex items-center gap-1 border-0 p-0 text-sm font-semibold text-white shadow-none">
                        <Avatar
                          className="size-4 shrink-0 rounded-full after:border-0"
                          aria-hidden
                        >
                          <AvatarFallback
                            className="rounded-full border-0 p-0"
                            style={{ backgroundColor: BTC_ORANGE }}
                          >
                            <Bitcoin
                              className="size-2.5 text-white"
                              strokeWidth={2.5}
                            />
                          </AvatarFallback>
                        </Avatar>
                        BTC
                      </CardTitle>
                    </CardContent>
                  </Card>
                  </CardContent>
                </Card>
                <Separator style={{ backgroundColor: BORDER }} />
              </CardContent>
            </Card>

            <Tabs defaultValue="casino" className="w-full flex-col gap-0">
              <Card
                className="rounded-none border-0 border-b bg-transparent py-0 shadow-none ring-0"
                style={{ borderColor: BORDER }}
              >
                <CardContent className="p-0">
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
                </CardContent>
              </Card>

              <TabsContent value="recent" className="mt-4">
                <CardDescription className="text-sm" style={{ color: MUTED }}>
                  Nothing in Recent yet.
                </CardDescription>
              </TabsContent>

              <TabsContent value="casino" className="mt-4 flex flex-col gap-6">
                <Card className="border-0 bg-transparent py-0 shadow-none ring-0">
                  <CardContent className="grid grid-cols-3 gap-3 p-0">
                    <Card
                      size="sm"
                      className="border-0 bg-transparent py-0 shadow-none ring-0"
                    >
                      <CardContent className="space-y-1 p-0">
                        <Label className="text-[11px] font-normal uppercase" style={{ color: MUTED }}>
                          Casino wagered
                        </Label>
                        <CardTitle className="border-0 p-0 text-sm font-semibold text-white shadow-none">
                          $1.36K
                        </CardTitle>
                      </CardContent>
                    </Card>
                    <Card
                      size="sm"
                      className="border-0 bg-transparent py-0 shadow-none ring-0"
                    >
                      <CardContent className="space-y-1 p-0">
                        <Label className="text-[11px] font-normal uppercase" style={{ color: MUTED }}>
                          Most played
                        </Label>
                        <CardTitle className="flex items-center gap-1.5 border-0 p-0 text-sm font-semibold text-white shadow-none">
                          <Avatar
                            className="size-5 shrink-0 rounded-full after:border-0"
                            aria-hidden
                          >
                            <AvatarFallback
                              className="rounded-full border-0 p-0"
                              style={{ backgroundColor: "#2a2a3a" }}
                            >
                              <Club
                                className="size-3 text-white"
                                strokeWidth={2}
                              />
                            </AvatarFallback>
                          </Avatar>
                          Blackjack
                        </CardTitle>
                      </CardContent>
                    </Card>
                    <Card
                      size="sm"
                      className="border-0 bg-transparent py-0 shadow-none ring-0"
                    >
                      <CardContent className="space-y-1 p-0">
                        <Label className="text-[11px] font-normal uppercase" style={{ color: MUTED }}>
                          Favorite studio
                        </Label>
                        <CardTitle className="flex items-center gap-1.5 border-0 p-0 text-sm font-semibold text-white shadow-none">
                          <Badge
                            variant="secondary"
                            className="h-5 shrink-0 gap-0.5 rounded-full border-0 px-1.5 text-[10px] font-bold shadow-none hover:bg-[#2a2a3a]"
                            style={{
                              backgroundColor: "#2a2a3a",
                              color: MUTED,
                            }}
                          >
                            <Building2 className="size-3 shrink-0" aria-hidden />
                            RG
                          </Badge>
                          Relax Gaming
                        </CardTitle>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-transparent py-0 shadow-none ring-0">
                  <CardHeader className="p-0">
                    <CardTitle
                      className="border-0 p-0 text-[11px] font-normal uppercase tracking-wider shadow-none"
                      style={{ color: MUTED }}
                    >
                      Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2 p-0 pt-3">
                    {HIGHLIGHTS.map((row, i) => {
                      const HighlightIcon = row.icon;
                      return (
                      <Card
                        key={`${row.game}-${row.statLabel}-${i}`}
                        size="sm"
                        className="min-h-[72px] gap-0 rounded-lg border-0 py-0 shadow-none ring-0"
                        style={{ backgroundColor: CARD }}
                      >
                        <CardContent className="flex items-center gap-3 p-3">
                          <Avatar className="size-12 shrink-0 rounded-lg after:border-0">
                            <AvatarFallback
                              className="rounded-lg [&>svg]:size-6"
                              style={{ background: row.gradient }}
                            >
                              <HighlightIcon className="text-white" strokeWidth={1.75} aria-hidden />
                            </AvatarFallback>
                          </Avatar>
                          <CardHeader className="min-w-0 flex-1 border-0 p-0">
                            <CardTitle className="truncate border-0 p-0 text-sm font-semibold text-white shadow-none">
                              {row.game}
                            </CardTitle>
                            <CardDescription className="truncate text-xs" style={{ color: MUTED }}>
                              {row.studio}
                            </CardDescription>
                          </CardHeader>
                          <CardHeader className="shrink-0 border-0 p-0 text-right">
                            <CardDescription className="text-[11px]" style={{ color: MUTED }}>
                              {row.statLabel}
                            </CardDescription>
                            <CardTitle
                              className="border-0 p-0 text-sm font-semibold shadow-none"
                              style={{ color: row.valueColor }}
                            >
                              {row.statValue}
                            </CardTitle>
                          </CardHeader>
                        </CardContent>
                      </Card>
                    );
                    })}
                  </CardContent>
                </Card>
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
            </FieldGroup>
          </ScrollArea>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
