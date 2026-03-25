"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MOBILE_CARD, MOBILE_MUTED } from "./constants";
import type { LucideIcon } from "lucide-react";

export function MobileActionTile({
  icon: Icon,
  label,
  onClick,
  className,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[74px] w-full flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 text-center",
        "shadow-none outline-none transition-none hover:brightness-100",
        "focus-visible:ring-2 focus-visible:ring-[#7c4dff]/40 active:opacity-90",
        className
      )}
      style={{ backgroundColor: MOBILE_CARD }}
    >
      <Icon
        className="size-[22px] shrink-0"
        style={{ color: MOBILE_MUTED }}
        strokeWidth={1.75}
        aria-hidden
      />
      <span
        className="line-clamp-2 w-full px-0.5 text-center text-xs leading-tight break-words"
        style={{ color: MOBILE_MUTED }}
      >
        {label}
      </span>
    </button>
  );
}
