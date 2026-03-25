"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X, IdCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOBILE_BORDER } from "./constants";

type MobileAccountHeaderProps = {
  variant: "root" | "sub" | "verification";
  title?: string;
  onBack?: () => void;
  onClose: () => void;
};

export function MobileAccountHeader({
  variant,
  title,
  onBack,
  onClose,
}: MobileAccountHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-14 min-h-[52px] max-h-14 shrink-0 items-center px-4",
        "bg-[#0f0f13]"
      )}
      style={{ borderBottom: `1px solid ${MOBILE_BORDER}` }}
    >
      {variant === "root" ? (
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="text-[18px] font-bold tracking-tight text-white">
            Account
          </h1>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-full border border-[#2a2a36] bg-transparent text-white hover:bg-white/10"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" strokeWidth={2} />
          </Button>
        </div>
      ) : variant === "verification" ? (
        <div className="grid w-full grid-cols-[40px_1fr_auto] items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 justify-self-start rounded-full text-white hover:bg-white/10"
            aria-label="Back"
            onClick={onBack}
          >
            <ChevronLeft className="size-6" strokeWidth={2} />
          </Button>
          <h2 className="truncate text-center text-base font-bold text-white">
            {title}
          </h2>
          <div className="flex items-center justify-end gap-0.5">
            <span
              className="flex size-8 items-center justify-center text-[#a78bfa]"
              aria-hidden
            >
              <IdCard className="size-5" strokeWidth={1.5} />
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-full border border-[#2a2a36] bg-transparent text-white hover:bg-white/10"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="size-5" strokeWidth={2} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-[40px_1fr_40px] items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 justify-self-start rounded-full text-white hover:bg-white/10"
            aria-label="Back"
            onClick={onBack}
          >
            <ChevronLeft className="size-6" strokeWidth={2} />
          </Button>
          <h2 className="truncate text-center text-base font-bold text-white">
            {title}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 justify-self-end rounded-full border border-[#2a2a36] bg-transparent text-white hover:bg-white/10"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" strokeWidth={2} />
          </Button>
        </div>
      )}
    </header>
  );
}
