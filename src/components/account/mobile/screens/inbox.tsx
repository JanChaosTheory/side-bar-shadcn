"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MobileInboxIllustration } from "../mobile-inbox-illustration";
import { MOBILE_PURPLE_TEXT } from "../constants";

export function MobileInboxScreen() {
  return (
    <ScrollArea hideScrollbar className="min-h-0 flex-1">
      <div className="flex min-h-[50dvh] flex-col items-center justify-center px-6 py-12">
        <MobileInboxIllustration />
        <h2 className="mt-4 text-lg font-semibold text-white">Nothing new</h2>
        <p className="mt-2 text-center text-sm text-[#8888aa]">
          You&apos;re all caught up.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-9 h-[42px] min-w-[200px] rounded-full border-0 px-6 text-sm font-bold shadow-none hover:opacity-90"
          style={{ backgroundColor: "#1b1b25", color: MOBILE_PURPLE_TEXT }}
        >
          View earlier (3)
        </Button>
      </div>
    </ScrollArea>
  );
}
