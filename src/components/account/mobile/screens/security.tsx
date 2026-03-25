"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { MOBILE_CARD, MOBILE_PURPLE_TEXT, ERROR_BG, ERROR_TEXT } from "../constants";

export function MobileSecurityScreen() {
  return (
    <ScrollArea hideScrollbar className="min-h-0 flex-1">
      <div className="space-y-8 px-4 pb-8 pt-5">
        <section>
          <h3 className="text-base font-bold text-white">Password</h3>
          <p className="mt-1 text-sm text-[#a1a1aa]">
            Manage your login credentials
          </p>
          <Button
            type="button"
            variant="ghost"
            className="mt-4 h-[50px] w-full rounded-full border-0 shadow-none hover:bg-white/5"
            style={{ backgroundColor: MOBILE_CARD, color: MOBILE_PURPLE_TEXT }}
          >
            Change password
          </Button>
        </section>

        <section>
          <h3 className="text-base font-bold text-white">
            Two-factor authentication (2FA)
          </h3>
          <Badge
            variant="secondary"
            className="mt-2 h-6 w-fit gap-1 rounded-full border-0 px-2.5 text-xs font-medium"
            style={{ backgroundColor: ERROR_BG, color: ERROR_TEXT }}
          >
            <ShieldCheck className="size-3.5" />
            2FA is disabled
          </Badge>
          <p className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
            Improve the security of your account by requiring verification, using
            your phone, when signing in or withdrawing funds:
          </p>
          <Button
            type="button"
            variant="ghost"
            className="mt-4 h-[50px] w-full rounded-full border-0 shadow-none hover:bg-white/5"
            style={{ backgroundColor: MOBILE_CARD, color: MOBILE_PURPLE_TEXT }}
          >
            Set up 2FA
          </Button>
        </section>
      </div>
    </ScrollArea>
  );
}
