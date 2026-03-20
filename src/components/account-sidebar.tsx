"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  ChevronLeft,
  AlertCircle,
  ArrowUpFromLine,
  ArrowDownToLine,
  Clock,
  ShieldCheck,
  Settings,
  ScanLine,
  MessageSquare,
  Mail,
  Gift,
  Check,
  Phone,
  MailOpen,
  ExternalLink,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MyProfilePanel } from "@/components/my-profile-panel";

type Screen = "main" | "security" | "preferences" | "verification" | "inbox";

const SURFACE_1 = "#211C25";
const AVATAR_BG = "#A8C7FC";
const ACCENT_PURPLE = "#CCA6FF";
const SUCCESS = "#55A370";
const ERROR_BG = "#E35F5D";
const ERROR_TEXT = "#381A19";

/** Message shown when user clicks an inactive button (leads outside Account sidebar). */
const INACTIVE_TOAST_MESSAGE =
  "This button is not active since it leads outside of the Account sidebar. Try another one.";
const INACTIVE_TOAST_DURATION_MS = 2500;

/**
 * Inactive buttons (lead outside Account sidebar): grid button, Deposit, Withdraw, History, Live
 * support, Promo code, Sign out. "My profile" opens MyProfilePanel. Each inactive is wired to
 * handleInactiveClick and labeled with "INACTIVE:" in JSX.
 */

function SubScreenHeader({
  title,
  onBack,
  onClose,
}: {
  title: string;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <header className="sticky top-0 z-10 min-h-[70px] flex items-center px-5 shrink-0">
      <Button
        variant="ghost"
        size="icon"
        className="size-[35px] rounded-full text-[#E0E0E0] hover:bg-white/10"
        onClick={onBack}
      >
        <ChevronLeft className="size-6" />
        <span className="sr-only">Back</span>
      </Button>
      <span className="text-[15px] font-bold text-[#E0E0E0] ml-2">{title}</span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto size-[35px] rounded-full text-[#E0E0E0] hover:bg-white/10"
        onClick={onClose}
      >
        <X className="size-6" />
        <span className="sr-only">Close</span>
      </Button>
    </header>
  );
}

function MainHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="min-h-[48px] px-5 py-3 flex items-center gap-2 shrink-0">
      <span className="text-[15px] font-bold text-[#E0E0E0]">Account</span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto size-[35px] rounded-full text-[#E0E0E0] hover:bg-white/10"
        onClick={onClose}
      >
        <X className="size-6" />
        <span className="sr-only">Close</span>
      </Button>
    </header>
  );
}

const gridButtonClass =
  "group flex flex-col items-center justify-center gap-1.5 p-3 h-[64px] bg-[#211C25] border-2 border-[#2C2532] rounded-xl hover:bg-[#261F2B] transition-colors text-[#A9A6B3] [&_svg]:size-5 [&_svg]:text-[#A9A6B3]";

const gridIconWrapClass =
  "inline-flex transition-transform duration-200 ease-out origin-center group-hover:scale-[1.18]";

/** Toggle styling for Ghost mode & Early access: muted grey-purple track, soft grey thumb, compact pill. */
const preferenceSwitchClass =
  "group/switch !h-[26px] !w-[44px] rounded-full border-0 shadow-none transition-colors duration-200 ease-out focus-visible:ring-0 !data-unchecked:bg-[#463A54] !data-checked:bg-[#5A4A69] [&_[data-slot=switch-thumb]]:!size-5 [&_[data-slot=switch-thumb]]:!bg-[#BDBDBD] [&_[data-slot=switch-thumb]]:transition-transform [&_[data-slot=switch-thumb]]:duration-200 [&_[data-slot=switch-thumb]]:translate-x-0 [&_[data-slot=switch-thumb]]:data-checked:translate-x-[20px]";

export function AccountSidebar({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [screen, setScreen] = React.useState<Screen>("main");
  const [ghostMode, setGhostMode] = React.useState(false);
  const [earlyAccess, setEarlyAccess] = React.useState(false);
  const [showInactiveToast, setShowInactiveToast] = React.useState(false);
  const [myProfileOpen, setMyProfileOpen] = React.useState(false);
  const inactiveToastTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (s: Screen) => setScreen(s);
  const goBack = () => setScreen("main");

  /** Dismiss Account sheet, nested profile sheet, and reset navigation (all X / close paths). */
  const closeEntireSidebar = React.useCallback(() => {
    setOpen(false);
    setScreen("main");
    setMyProfileOpen(false);
  }, []);

  const handleSheetOpenChange = React.useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setScreen("main");
      setMyProfileOpen(false);
    }
  }, []);

  /** Reusable handler for inactive buttons (lead outside Account sidebar). Shows toast instead of navigating. */
  const handleInactiveClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (inactiveToastTimeoutRef.current) clearTimeout(inactiveToastTimeoutRef.current);
      setShowInactiveToast(true);
      inactiveToastTimeoutRef.current = setTimeout(() => {
        setShowInactiveToast(false);
        inactiveToastTimeoutRef.current = null;
      }, INACTIVE_TOAST_DURATION_MS);
    },
    []
  );

  React.useEffect(() => () => {
    if (inactiveToastTimeoutRef.current) clearTimeout(inactiveToastTimeoutRef.current);
  }, []);

  return (
    <>
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "gap-2 rounded-full"
        )}
      >
        {trigger}
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          "w-[448px] max-w-[100vw] rounded-tl-[28px] rounded-bl-none rounded-r-none p-0 gap-0 overflow-y-auto",
          "bg-[#141114] border-0 border-l border-[#2C2532]"
        )}
      >
        <div className="relative flex flex-col min-h-full [font-family:var(--font-inter),sans-serif]">
          {/* Main screen */}
          <div
            className={cn(
              "flex flex-col min-h-full transition-all duration-300 ease-in-out",
              screen === "main"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            )}
          >
            <MainHeader onClose={closeEntireSidebar} />
            <div className="flex flex-col flex-1 px-5">
              {/* Profile card */}
              <div className="rounded-[24px] p-[2px] border border-zinc-800/40">
                <div className="bg-[#141114] rounded-[22.5px] h-[72px] flex items-center">
                  <div
                    className="size-[72px] rounded-full flex items-center justify-center shrink-0 text-xl font-bold text-zinc-800"
                    style={{ backgroundColor: AVATAR_BG }}
                  >
                    JA
                  </div>
                  <div className="ml-3 flex flex-col min-w-0">
                    <span className="text-base font-bold text-white truncate">
                      JanChaos
                    </span>
                    <span className="text-[11px] text-yellow-400 whitespace-nowrap">
                      Phone number verified
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      className="rounded-full h-[27px] px-3 text-xs font-medium bg-[#322A3C] text-[#CFAEFF] border-0 shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:ring-0 focus-visible:border-0"
                      onClick={() => setMyProfileOpen(true)}
                    >
                      My profile
                    </Button>
                    {/* INACTIVE: leads outside Account sidebar */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-[27px] rounded-full bg-[#322A3C] text-[#CFAEFF] border-0 shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:ring-0 focus-visible:border-0"
                      onClick={handleInactiveClick}
                    >
                      <LayoutGrid className="size-4" />
                      <span className="sr-only">Grid</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Verification banner */}
              <div className="mt-4 flex items-center gap-2 bg-[#1E1A22] rounded-2xl p-2 w-full min-h-[53px]">
                <AlertCircle className="text-amber-500 size-8 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-[#E0E0E0] whitespace-nowrap">
                    You're not verified yet!
                  </span>
                  <span className="text-xs text-[#8F8F8F]">
                    Enjoy faster payouts, safer play, and no limits by verifying
                    your account.
                  </span>
                </div>
                <Button
                  className="ml-auto shrink-0 bg-[#C8FF00] text-black font-bold text-sm rounded-full px-4 py-1.5 hover:bg-[#b8e600]"
                  onClick={() => goTo("verification")}
                >
                  Verify Now
                </Button>
              </div>

              {/* Wallet */}
              <div className="py-3">
                <h2 className="text-base font-bold text-[#E0E0E0]">Wallet</h2>
                <div className="grid grid-cols-3 gap-[9px] mt-2">
                  {/* INACTIVE: leads outside Account sidebar */}
                  <button type="button" className={gridButtonClass} onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <ArrowUpFromLine className="size-5" />
                    </span>
                    <span className="text-xs">Deposit</span>
                  </button>
                  {/* INACTIVE: leads outside Account sidebar */}
                  <button type="button" className={gridButtonClass} onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <ArrowDownToLine className="size-5" />
                    </span>
                    <span className="text-xs">Withdraw</span>
                  </button>
                  {/* INACTIVE: leads outside Account sidebar */}
                  <button type="button" className={gridButtonClass} onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <Clock className="size-5" />
                    </span>
                    <span className="text-xs">History</span>
                  </button>
                </div>
              </div>

              {/* Account */}
              <div className="py-3">
                <h2 className="text-base font-bold text-[#E0E0E0]">Account</h2>
                <div className="grid grid-cols-3 gap-[9px] mt-2">
                  <button
                    type="button"
                    className={gridButtonClass}
                    onClick={() => goTo("security")}
                  >
                    <span className={gridIconWrapClass}>
                      <ShieldCheck className="size-5" />
                    </span>
                    <span className="text-xs">Security</span>
                  </button>
                  <button
                    type="button"
                    className={gridButtonClass}
                    onClick={() => goTo("preferences")}
                  >
                    <span className={gridIconWrapClass}>
                      <Settings className="size-5" />
                    </span>
                    <span className="text-xs">Preferences</span>
                  </button>
                  <button
                    type="button"
                    className={gridButtonClass}
                    onClick={() => goTo("verification")}
                  >
                    <span className={gridIconWrapClass}>
                      <ScanLine className="size-5" />
                    </span>
                    <span className="text-xs">Verification</span>
                  </button>
                  {/* INACTIVE: leads outside Account sidebar */}
                  <button type="button" className={gridButtonClass} onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <MessageSquare className="size-5" />
                    </span>
                    <span className="text-xs">Live support</span>
                  </button>
                  <button
                    type="button"
                    className={gridButtonClass}
                    onClick={() => goTo("inbox")}
                  >
                    <span className={gridIconWrapClass}>
                      <Mail className="size-5" />
                    </span>
                    <span className="text-xs">Inbox</span>
                  </button>
                  {/* INACTIVE: leads outside Account sidebar */}
                  <button type="button" className={gridButtonClass} onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <Gift className="size-5" />
                    </span>
                    <span className="text-xs">Promo code</span>
                  </button>
                </div>
              </div>

              {/* Sign out — INACTIVE: leads outside Account sidebar */}
              <div className="flex justify-center mt-auto mb-6 pt-4">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-2 text-sm text-[#CFAEFF] bg-[#322A3C] border-0 shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:ring-0 focus-visible:border-0"
                  onClick={handleInactiveClick}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </div>

          {/* Sub-screens: slide in from right */}
          {(["security", "preferences", "verification", "inbox"] as const).map(
            (sub) => (
              <div
                key={sub}
                className={cn(
                  "flex flex-col min-h-full absolute inset-0 transition-all duration-300 ease-in-out",
                  screen === sub
                    ? "translate-x-0 opacity-100 z-10"
                    : "translate-x-full opacity-0 pointer-events-none"
                )}
              >
                {sub === "security" && (
                  <>
                    <SubScreenHeader
                      title="Security"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <div className="flex flex-col px-5 pt-5 pb-0">
                      <h3 className="text-base font-bold text-[#E0E0E0] mb-1">
                        Password
                      </h3>
                      <p className="text-sm text-[#8F8F8F]">
                        Manage your login credentials
                      </p>
                      <Button
                        className="bg-[#261F2B] rounded-full h-[49px] w-full mt-3 text-base font-bold hover:bg-[#2C2532]"
                        style={{ color: ACCENT_PURPLE }}
                      >
                        Change password
                      </Button>
                    </div>
                    <div className="flex flex-col px-5 pt-3 pb-5">
                      <h3 className="text-base font-bold text-[#E0E0E0] mb-1">
                        Two-factor authentication (2FA)
                      </h3>
                      <span
                        className="inline-flex items-center gap-1 w-fit rounded-full px-2 h-5 text-[11px] font-medium"
                        style={{
                          backgroundColor: ERROR_BG,
                          color: ERROR_TEXT,
                        }}
                      >
                        <ShieldCheck className="size-3.5" />
                        2FA is disabled
                      </span>
                      <p className="text-sm text-[#8F8F8F] mt-2">
                        Improve the security of your account by requiring
                        verification, using your phone, when signing in or
                        withdrawing funds:
                      </p>
                      <Button
                        className="bg-[#261F2B] rounded-full h-[49px] w-full mt-3 text-base font-bold hover:bg-[#2C2532]"
                        style={{ color: ACCENT_PURPLE }}
                      >
                        Set up 2FA
                      </Button>
                    </div>
                  </>
                )}

                {sub === "preferences" && (
                  <>
                    <SubScreenHeader
                      title="Preferences"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <div className="flex flex-col p-5">
                      {/* Language */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-1">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            Language
                          </span>
                          <Select defaultValue="en">
                            <SelectTrigger
                              className="border-0 bg-transparent w-auto text-sm font-bold shadow-none focus:ring-0"
                              style={{ color: ACCENT_PURPLE }}
                            >
                              <SelectValue placeholder="English" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          Choose your display language.
                        </p>
                      </div>
                      {/* Time zone */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-1">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            Time zone
                          </span>
                          <Select>
                            <SelectTrigger
                              className="border-0 bg-transparent w-auto text-sm font-bold shadow-none focus:ring-0"
                              style={{ color: ACCENT_PURPLE }}
                            >
                              <SelectValue placeholder="Select time zone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc">UTC</SelectItem>
                              <SelectItem value="est">EST</SelectItem>
                              <SelectItem value="cet">CET</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          All event times show in your selected time zone.
                        </p>
                      </div>
                      {/* Odds format */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-1">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            Odds format
                          </span>
                          <Select defaultValue="decimal">
                            <SelectTrigger
                              className="border-0 bg-transparent w-auto text-sm font-bold shadow-none focus:ring-0"
                              style={{ color: ACCENT_PURPLE }}
                            >
                              <SelectValue placeholder="Decimal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="decimal">Decimal</SelectItem>
                              <SelectItem value="fractional">Fractional</SelectItem>
                              <SelectItem value="american">American</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          Applies to all sports betting markets.
                        </p>
                      </div>
                      {/* Ghost mode */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-3">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            Ghost mode
                          </span>
                          <Switch
                            checked={ghostMode}
                            onCheckedChange={setGhostMode}
                            className={preferenceSwitchClass}
                          />
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          Username and profile are visible everywhere.
                        </p>
                      </div>
                      {/* Responsible gambling */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-3">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            Responsible gambling
                          </span>
                          <span
                            className="text-sm font-bold cursor-pointer"
                            style={{ color: ACCENT_PURPLE }}
                          >
                            Set up &gt;
                          </span>
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          Set limits or take a break when you need it.
                        </p>
                      </div>
                      {/* Early access */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-3">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            Early access
                          </span>
                          <Switch
                            checked={earlyAccess}
                            onCheckedChange={setEarlyAccess}
                            className={preferenceSwitchClass}
                          />
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          Get early access to new and experimental features
                          before public release.
                        </p>
                      </div>
                      {/* API key */}
                      <div className="mb-8">
                        <div className="bg-[#261F2B] rounded-xl flex items-center justify-between py-1 min-h-[49px] pl-3 pr-3">
                          <span className="text-base font-bold text-[#E0E0E0]">
                            API key
                          </span>
                          <span
                            className="text-sm font-bold cursor-pointer"
                            style={{ color: ACCENT_PURPLE }}
                          >
                            Generate key
                          </span>
                        </div>
                        <p className="text-sm text-[#8F8F8F] px-4 pt-1">
                          Connect for automated trading.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {sub === "verification" && (
                  <>
                    <SubScreenHeader
                      title="Verification"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <p className="px-5 pt-2 text-sm text-[#8F8F8F]">
                      Verifying your identity keeps your account secure and your
                      access seamless.
                    </p>
                    {/* N steps, N-1 connectors only; gap-0 between stacked rows so bars fill circle-to-circle */}
                    <div className="px-5 pt-4 pb-4 flex flex-col gap-0">
                      {(
                        [
                          {
                            key: "email",
                            node: (
                              <div
                                className="relative z-[2] size-9 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: SUCCESS }}
                              >
                                <Check className="size-5 text-white" />
                              </div>
                            ),
                            card: (
                              <div className="rounded-xl bg-zinc-900 px-4 py-3 min-w-0 flex-1">
                                <div className="flex items-center gap-3">
                                  <Mail className="size-5 text-[#8F8F8F] shrink-0" />
                                  <span className="text-sm text-[#8F8F8F]">
                                    Email Verification
                                  </span>
                                </div>
                              </div>
                            ),
                          },
                          {
                            key: "phone",
                            node: (
                              <div
                                className="relative z-[2] size-9 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: SUCCESS }}
                              >
                                <Check className="size-5 text-white" />
                              </div>
                            ),
                            card: (
                              <div className="rounded-xl bg-zinc-900 px-4 py-3 min-w-0 flex-1">
                                <div className="flex items-center gap-3">
                                  <Phone className="size-5 text-[#8F8F8F] shrink-0" />
                                  <span className="text-sm text-[#8F8F8F]">
                                    Phone Verification
                                  </span>
                                </div>
                              </div>
                            ),
                          },
                          {
                            key: "identity",
                            node: (
                              <div className="relative z-[2] size-9 shrink-0 rounded-full border-2 border-[#8F8F8F] bg-[#141114] flex items-center justify-center">
                                <div className="size-1.5 rounded-full bg-[#8F8F8F]" />
                              </div>
                            ),
                            card: (
                              <div className="rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-4 min-w-0 flex-1">
                                <div className="flex items-center gap-3">
                                  <ScanLine className="size-5 text-[#E0E0E0] shrink-0" />
                                  <span className="text-base font-bold text-[#E0E0E0]">
                                    Identity Verification
                                  </span>
                                </div>
                                <p className="text-sm text-[#8F8F8F] mt-2">
                                  Before you start, have your <strong>ID</strong>{" "}
                                  and <strong>proof of address</strong> ready to
                                  speed things up. The list of accepted documents
                                  can be found{" "}
                                  <a
                                    href="#"
                                    className="inline-flex items-center gap-0.5 text-[#CCA6FF] hover:underline"
                                  >
                                    here
                                    <ExternalLink className="size-3.5 inline" />
                                  </a>
                                  .
                                </p>
                                <Button className="bg-[#CCFF00] text-black font-bold text-base rounded-full h-[49px] w-full mt-3 hover:bg-[#b8e600]">
                                  Verify identity
                                </Button>
                              </div>
                            ),
                          },
                        ] as const
                      ).map((step, i, arr) => (
                        <React.Fragment key={step.key}>
                          <div
                            className={cn(
                              "flex flex-row gap-3",
                              step.key === "identity" ? "items-start" : "items-center"
                            )}
                          >
                            <div
                              className="w-9 shrink-0 flex justify-center"
                              aria-hidden
                            >
                              {step.node}
                            </div>
                            {step.card}
                          </div>
                          {i < arr.length - 1 && (
                            <div className="flex flex-row gap-3" aria-hidden>
                              <div className="w-9 shrink-0 flex justify-center py-0.5">
                                <div
                                  className={cn(
                                    "w-0.5 min-h-10 shrink-0 rounded-full",
                                    i === 0 ? "bg-green-500" : "bg-zinc-600"
                                  )}
                                />
                              </div>
                              <div className="flex-1 min-w-0" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="px-5 mt-auto mb-5">
                      <div
                        className="rounded-[12px] bg-[#141114] p-4 flex items-center gap-3 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                      >
                        <div className="size-14 rounded-full bg-violet-500/35 flex items-center justify-center shrink-0">
                          <ShieldCheck className="size-8 text-violet-400" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-[#E0E0E0]">
                            Secure your account.
                          </span>
                          <span className="text-sm font-bold text-[#E0E0E0]">
                            Get the full experience.
                          </span>
                          <ul className="text-xs text-[#8F8F8F] mt-1 list-disc list-inside space-y-0.5">
                            <li>Stronger security & fraud protection</li>
                            <li>Faster & unlimited withdrawals</li>
                            <li>Unlock full features & VIP perks</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {sub === "inbox" && (
                  <>
                    <SubScreenHeader
                      title="Inbox"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <div className="flex flex-col flex-1 items-center justify-center px-5 py-12">
                      <div className="relative">
                        <MailOpen className="size-16 text-zinc-600 mx-auto" />
                      </div>
                      <h3 className="text-base font-bold text-[#E0E0E0] mt-4">
                        Nothing new
                      </h3>
                      <p className="text-sm text-[#8F8F8F] mt-1">
                        You're all caught up.
                      </p>
                      <Button
                        className="bg-[#261F2B] rounded-full h-[49px] px-6 mt-4 text-sm font-bold hover:bg-[#2C2532]"
                        style={{ color: ACCENT_PURPLE }}
                      >
                        View earlier (3)
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )
          )}

        {/* Inactive-button toast: small, premium dark UI, auto-dismiss ~2.5s */}
        {showInactiveToast && (
          <div
            className="absolute bottom-6 left-6 right-6 z-50 px-4 py-3 rounded-xl bg-[#1E1A22] border border-[#2C2532] text-[#E0E0E0] text-sm shadow-lg animate-in fade-in duration-200"
            role="status"
            aria-live="polite"
          >
            {INACTIVE_TOAST_MESSAGE}
          </div>
        )}
        </div>
      </SheetContent>
    </Sheet>
    <MyProfilePanel open={myProfileOpen} onClose={closeEntireSidebar} />
    </>
  );
}
