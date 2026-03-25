"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { MOBILE_CARD, MOBILE_PURPLE_TEXT } from "../constants";

/** Primary row only — description sits below the card per mobile spec */
function PrefCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl px-4 py-3.5"
      style={{ backgroundColor: MOBILE_CARD }}
    >
      {children}
    </div>
  );
}

function PrefBlock({
  description,
  children,
}: {
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {children}
      <p className="px-0.5 text-xs leading-snug text-[#8888aa]">{description}</p>
    </div>
  );
}

export function MobilePreferencesScreen() {
  const [ghost, setGhost] = React.useState(false);
  const [early, setEarly] = React.useState(false);

  return (
    <ScrollArea hideScrollbar className="min-h-0 flex-1">
      <div className="flex flex-col gap-2 px-4 pb-8 pt-4">
        <PrefBlock description="Choose your display language.">
          <PrefCard>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">Language</p>
              <Select defaultValue="en">
                <SelectTrigger
                  className="h-8 min-h-0 w-auto max-w-[180px] shrink-0 border-0 bg-transparent py-0 pl-0 pr-0 text-sm shadow-none focus:ring-0"
                  style={{ color: "#a1a1aa" }}
                >
                  <span className="mr-1 text-base" aria-hidden>
                    🇬🇧
                  </span>
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PrefCard>
        </PrefBlock>

        <PrefBlock description="All event times show in your selected time zone.">
          <PrefCard>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">Time zone</p>
              <Select>
                <SelectTrigger
                  className="h-8 min-h-0 w-auto max-w-[180px] shrink-0 border-0 bg-transparent py-0 pl-0 pr-0 text-sm shadow-none focus:ring-0"
                  style={{ color: MOBILE_PURPLE_TEXT }}
                >
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PrefCard>
        </PrefBlock>

        <PrefBlock description="Applies to all sports betting markets.">
          <PrefCard>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">Odds format</p>
              <Select defaultValue="decimal">
                <SelectTrigger
                  className="h-8 min-h-0 w-auto shrink-0 border-0 bg-transparent py-0 pl-0 pr-0 text-sm shadow-none focus:ring-0"
                  style={{ color: MOBILE_PURPLE_TEXT }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="decimal">Decimal</SelectItem>
                  <SelectItem value="fractional">Fractional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </PrefCard>
        </PrefBlock>

        <PrefBlock description="Username and profile are visible everywhere.">
          <PrefCard>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">Ghost mode</p>
              <Switch
                checked={ghost}
                onCheckedChange={setGhost}
                className="shrink-0 data-[state=unchecked]:bg-zinc-600"
              />
            </div>
          </PrefCard>
        </PrefBlock>

        <PrefBlock description="Set limits or take a break when you need it.">
          <PrefCard>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <p className="font-bold text-white">Responsible gambling</p>
              <span
                className="flex shrink-0 items-center gap-0.5 text-sm font-medium"
                style={{ color: MOBILE_PURPLE_TEXT }}
              >
                Set up
                <ChevronRight className="size-4" />
              </span>
            </button>
          </PrefCard>
        </PrefBlock>

        <PrefBlock description="Get early access to new and experimental features before public release.">
          <PrefCard>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">Early access</p>
              <Switch
                checked={early}
                onCheckedChange={setEarly}
                className="shrink-0 data-[state=unchecked]:bg-zinc-600"
              />
            </div>
          </PrefCard>
        </PrefBlock>

        <PrefBlock description="Connect for automated trading.">
          <PrefCard>
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">API key</p>
              <Button
                type="button"
                variant="link"
                className="h-auto shrink-0 p-0 text-sm font-medium shadow-none"
                style={{ color: MOBILE_PURPLE_TEXT }}
              >
                Generate key
              </Button>
            </div>
          </PrefCard>
        </PrefBlock>
      </div>
    </ScrollArea>
  );
}
