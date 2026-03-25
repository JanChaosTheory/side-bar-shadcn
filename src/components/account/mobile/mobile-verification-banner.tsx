"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { MOBILE_CARD, MOBILE_AMBER } from "./constants";
import type { MobileNav } from "./constants";

export function MobileVerificationBanner({ nav }: { nav: MobileNav }) {
  return (
    <button
      type="button"
      className="mx-4 flex w-[calc(100%-2rem)] flex-row gap-3 rounded-xl py-3.5 pl-1 pr-4 text-left shadow-none outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
      style={{
        backgroundColor: MOBILE_CARD,
        borderLeftWidth: 4,
        borderLeftStyle: "solid",
        borderLeftColor: MOBILE_AMBER,
      }}
      onClick={() => nav.go("verification")}
    >
      <div className="flex shrink-0 pl-3">
        <AlertTriangle
          className="size-5 shrink-0 self-start pt-0.5"
          style={{ color: MOBILE_AMBER }}
          strokeWidth={2}
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-sm font-bold"
          style={{ color: MOBILE_AMBER }}
        >
          You&apos;re not verified yet!
        </p>
        <p className="mt-1 text-xs leading-snug text-[#8888aa]">
          Enjoy faster payouts, safer play, and no limits by verifying your
          account.
        </p>
      </div>
    </button>
  );
}
