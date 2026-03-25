"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MobileScreen } from "../constants";

const TITLES: Partial<Record<MobileScreen, string>> = {
  deposit: "Deposit",
  withdraw: "Withdraw",
  history: "History",
  "live-support": "Live support",
  "promo-code": "Promo code",
};

export function MobilePlaceholderScreen({ screen }: { screen: MobileScreen }) {
  const title = TITLES[screen] ?? "Coming soon";
  return (
    <ScrollArea hideScrollbar className="min-h-0 flex-1">
      <div className="flex min-h-[40dvh] flex-col items-center justify-center px-6 py-16">
        <p className="text-center text-lg font-semibold text-white">{title}</p>
        <p className="mt-2 max-w-xs text-center text-sm text-[#8888aa]">
          This flow is a placeholder in the mobile prototype.
        </p>
      </div>
    </ScrollArea>
  );
}
