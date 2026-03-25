"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { MOBILE_PURPLE_TEXT } from "./constants";

export function MobileStickyFooter({ onSignOut }: { onSignOut: () => void }) {
  return (
    <footer
      className="shrink-0 border-t border-[#1e1e2a] bg-[#0f0f13] px-4 pt-3"
      style={{
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
      }}
    >
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full rounded-full border border-[#322A3C] bg-[#322A3C] text-sm font-medium shadow-none hover:bg-[#3A3146]"
        style={{ color: MOBILE_PURPLE_TEXT }}
        onClick={onSignOut}
      >
        Sign out
      </Button>
    </footer>
  );
}
