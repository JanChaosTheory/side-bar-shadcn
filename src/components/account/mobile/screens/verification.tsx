"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  Check,
  IdCard,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { MOBILE_CARD, MOBILE_LIME, MOBILE_PURPLE_TEXT } from "../constants";

const GREEN = "#22c55e";

export function MobileVerificationScreen() {
  return (
    <ScrollArea hideScrollbar className="min-h-0 flex-1">
      <div className="px-4 pb-8 pt-4">
        <p className="text-sm leading-relaxed text-[#a1a1aa]">
          Verifying your identity keeps your account secure and your access
          seamless. Having trouble?{" "}
          <Button
            type="button"
            variant="link"
            className="inline h-auto p-0 text-sm font-normal underline underline-offset-2"
            style={{ color: MOBILE_PURPLE_TEXT }}
          >
            Chat with us.
          </Button>
        </p>

        <div className="mt-6 flex flex-col gap-0">
          {/* Step 1 */}
          <div className="flex gap-3">
            <div className="flex w-9 shrink-0 flex-col items-center">
              <div
                className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: GREEN }}
              >
                <Check className="size-5 text-white" strokeWidth={2.5} />
              </div>
              <div
                className="h-10 w-0.5 shrink-0 rounded-full"
                style={{ backgroundColor: GREEN }}
                aria-hidden
              />
            </div>
            <Card
              className="mb-3 min-w-0 flex-1 gap-0 rounded-xl border-0 py-0 opacity-95 shadow-none ring-0"
              style={{ backgroundColor: MOBILE_CARD }}
            >
              <CardContent className="flex flex-row items-center gap-3 px-4 py-3">
                <Mail className="size-5 shrink-0 text-[#8888aa]" />
                <CardTitle className="border-0 p-0 text-sm font-normal text-[#8888aa] shadow-none">
                  Email Verification
                </CardTitle>
              </CardContent>
            </Card>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3">
            <div className="flex w-9 shrink-0 flex-col items-center">
              <div
                className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: GREEN }}
              >
                <Check className="size-5 text-white" strokeWidth={2.5} />
              </div>
              <div
                className="h-10 w-0.5 shrink-0 rounded-full"
                style={{ backgroundColor: GREEN }}
                aria-hidden
              />
            </div>
            <Card
              className="mb-3 min-w-0 flex-1 gap-0 rounded-xl border-0 py-0 opacity-95 shadow-none ring-0"
              style={{ backgroundColor: MOBILE_CARD }}
            >
              <CardContent className="flex flex-row items-center gap-3 px-4 py-3">
                <Phone className="size-5 shrink-0 text-[#8888aa]" />
                <CardTitle className="border-0 p-0 text-sm font-normal text-[#8888aa] shadow-none">
                  Phone Verification
                </CardTitle>
              </CardContent>
            </Card>
          </div>

          {/* Step 3 — Identity */}
          <div className="flex items-start gap-3">
            <div className="flex w-9 shrink-0 flex-col items-center pt-1">
              <div className="relative z-[1] flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#6b7280] bg-[#0f0f13]">
                <span className="size-2 rounded-full bg-[#9ca3af]" />
              </div>
            </div>
            <Card
              className="min-w-0 flex-1 gap-0 rounded-xl border border-zinc-700/80 py-0 shadow-none ring-0"
              style={{ backgroundColor: "#24222a" }}
            >
              <CardContent className="px-4 py-4">
                <CardHeader className="flex flex-row items-center gap-3 border-0 p-0">
                  <IdCard
                    className="size-6 shrink-0 text-white"
                    strokeWidth={1.5}
                  />
                  <CardTitle className="border-0 p-0 text-base font-bold text-white shadow-none">
                    Identity Verification
                  </CardTitle>
                </CardHeader>
                <CardDescription className="mt-3 text-sm leading-relaxed text-[#a1a1aa]">
                  Before you start, have your{" "}
                  <strong className="font-bold text-white">ID</strong> and{" "}
                  <strong className="font-bold text-white">
                    proof of address
                  </strong>{" "}
                  ready to speed things up. The list of accepted documents can be
                  found{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="inline-flex h-auto items-center gap-1 p-0 text-sm underline underline-offset-2"
                    style={{ color: MOBILE_PURPLE_TEXT }}
                  >
                    <ExternalLink className="size-3.5 shrink-0" />
                    here
                  </Button>
                  .
                </CardDescription>
                <Button
                  type="button"
                  className="mt-4 h-[52px] w-full rounded-full border-0 text-base font-bold text-black shadow-none hover:opacity-90"
                  style={{ backgroundColor: MOBILE_LIME }}
                >
                  Verify identity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card
          className="mt-6 gap-0 rounded-xl border border-purple-500/35 py-0 shadow-[0_0_14px_rgba(168,85,247,0.12)] ring-0"
          style={{ backgroundColor: MOBILE_CARD }}
        >
          <CardContent className="flex flex-row items-center gap-3 p-4">
            <Avatar className="size-16 shrink-0 after:border-0">
              <AvatarFallback className="bg-gradient-to-br from-violet-500/50 to-indigo-600/40">
                <ShieldCheck className="size-8 text-violet-300" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Secure your account.</p>
              <p className="text-sm font-bold text-white">
                Get the full experience.
              </p>
              <ul className="mt-2 space-y-0.5 text-xs text-[#8888aa]">
                <li>· Stronger security & fraud protection</li>
                <li>· Faster & unlimited withdrawals</li>
                <li>· Unlock full features & VIP perks</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
