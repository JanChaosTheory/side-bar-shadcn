"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Info, LayoutGrid } from "lucide-react";
import { MOBILE_CARD, MOBILE_AVATAR_GRADIENT, MOBILE_AVATAR_INITIALS } from "./constants";
import type { MobileNav } from "./constants";

export function MobileUserCard({ nav }: { nav: MobileNav }) {
  return (
    <div
      className="mx-4 flex flex-row items-center gap-3 rounded-2xl p-4"
      style={{ backgroundColor: MOBILE_CARD }}
    >
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
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold text-white">JanChaos</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-1 text-xs text-amber-400">
          <span>Phone number verified</span>
          <Info className="size-3.5 shrink-0 opacity-90" aria-hidden />
        </p>
      </div>
      <div className="flex shrink-0 flex-row items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-8 rounded-full border border-[#5c4d7a] bg-transparent px-3 text-xs font-medium text-[#c4b5fd] shadow-none hover:bg-white/5"
          onClick={() => nav.go("my-profile")}
        >
          My profile
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 shrink-0 rounded-full border border-[#5c4d7a] bg-transparent text-[#c4b5fd] shadow-none hover:bg-white/5"
          aria-label="Open grid menu"
          onClick={() => {}}
        >
          <LayoutGrid className="size-4" />
        </Button>
      </div>
    </div>
  );
}
