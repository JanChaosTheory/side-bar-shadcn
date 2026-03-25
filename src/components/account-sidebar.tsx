"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
} from "@/components/ui/item";
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
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
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
  IdCard,
  MessageSquare,
  Mail,
  Gift,
  Check,
  Phone,
  ExternalLink,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MyProfilePanel } from "@/components/my-profile-panel";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileAccountPanel } from "@/components/account/mobile/mobile-account-panel";
import { MOBILE_BG } from "@/components/account/mobile/constants";

type Screen = "main" | "security" | "preferences" | "verification" | "inbox";

const AVATAR_BG = "#A8C7FC";
const ACCENT_PURPLE = "#CCA6FF";
const SUCCESS = "#55A370";
const ERROR_BG = "#E35F5D";
const ERROR_TEXT = "#381A19";

/** Message shown when user clicks an inactive button (leads outside Account sidebar). */
const INACTIVE_TOAST_MESSAGE =
  "This button is not active since it leads outside of the Account sidebar. Try another one.";
const INACTIVE_TOAST_DURATION_MS = 2500;

/** Matches Tailwind `duration-200` on the Sign out footer fade. */
const SIGN_OUT_FADE_MS = 200;

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
    <SheetHeader className="sticky top-0 z-10 grid min-h-[70px] shrink-0 grid-cols-[35px_1fr_35px] items-center gap-1 space-y-0 p-0 px-5">
      <Button
        variant="ghost"
        size="icon"
        className="size-[35px] justify-self-start rounded-full text-[#E0E0E0] hover:bg-white/10"
        aria-label="Back"
        onClick={onBack}
      >
        <ChevronLeft className="size-[22px]" strokeWidth={2} />
      </Button>
      <SheetTitle className="border-0 p-0 text-center text-[15px] font-bold text-[#E0E0E0] shadow-none">
        {title}
      </SheetTitle>
      <Button
        variant="ghost"
        size="icon"
        className="size-[35px] justify-self-end rounded-full text-[#E0E0E0] hover:bg-white/10"
        aria-label="Close"
        onClick={onClose}
      >
        <X className="size-[22px]" strokeWidth={2} />
      </Button>
    </SheetHeader>
  );
}

/** Empty-state artwork: open envelope, card with X, gradients, sparks (reference inbox). */
function InboxEmptyIllustration({ className }: { className?: string }) {
  const accent = "#64748b";
  return (
    <svg
      className={cn(
        "mx-auto w-[min(248px,78vw)] max-w-[248px] text-slate-500",
        className
      )}
      viewBox="0 0 240 216"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="inbox-card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5c5c68" />
          <stop offset="100%" stopColor="#45454f" />
        </linearGradient>
        <linearGradient id="inbox-env-inner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3f3f48" />
          <stop offset="100%" stopColor="#2e2e35" />
        </linearGradient>
        <linearGradient id="inbox-env-pocket" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4b4b56" />
          <stop offset="100%" stopColor="#3a3a44" />
        </linearGradient>
        <linearGradient id="inbox-flap-top" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#383840" />
          <stop offset="100%" stopColor="#52525e" />
        </linearGradient>
        <linearGradient id="inbox-flap-shade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a2a32" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#45454f" stopOpacity={0.5} />
        </linearGradient>
        <filter
          id="inbox-drop"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
        >
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="8"
            floodColor="#000"
            floodOpacity="0.4"
          />
        </filter>
      </defs>

      {/* Floating accents */}
      <g fill={accent} opacity={0.38}>
        <circle cx="44" cy="156" r="2.2" />
        <circle cx="196" cy="168" r="1.5" />
        <circle cx="54" cy="68" r="1.8" />
      </g>
      <circle
        cx="38"
        cy="178"
        r="4"
        fill="none"
        stroke={accent}
        strokeWidth={1.25}
        opacity={0.42}
      />
      <path
        fill={accent}
        opacity={0.4}
        d="M22 36 32 54h-5l12 26L18 48h8z"
      />
      <path
        fill={accent}
        opacity={0.32}
        d="M194 138 200 150h-4l8 18-12-16h5z"
      />
      <path
        fill={accent}
        opacity={0.43}
        d="M192 32 L196.5 39 L192 46 L187.5 39 Z"
      />
      <g fill={accent} opacity={0.36}>
        <rect x="168" y="26" width="1.8" height="11" rx="0.4" />
        <rect x="163.5" y="30.5" width="11" height="1.8" rx="0.4" />
      </g>

      <g filter="url(#inbox-drop)" transform="translate(120, 128)">
        <rect
          x="-32"
          y="-62"
          width="64"
          height="50"
          rx="4"
          fill="url(#inbox-card-grad)"
        />
        <path
          stroke="#9ca3af"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.42}
          d="M-14 -44 L14 -32 M14 -44 L-14 -32"
        />
        <path
          d="M-78 14 L0 -66 L78 14 L78 68 L-78 68 Z"
          fill="url(#inbox-env-inner)"
        />
        <path
          d="M-74 12 L0 -62 L74 12 L74 64 L-74 64 Z"
          fill="#25252c"
        />
        <path
          d="M-78 14 L0 50 L78 14 Z"
          fill="url(#inbox-env-pocket)"
        />
        <path d="M-78 14 L0 -66 L78 14 L0 38 Z" fill="url(#inbox-flap-top)" />
        <path
          d="M0 -66 L78 14 L0 38 L-78 14 Z"
          fill="url(#inbox-flap-shade)"
        />
      </g>
    </svg>
  );
}

function MainHeader({ onClose }: { onClose: () => void }) {
  return (
    <SheetHeader className="flex min-h-[48px] shrink-0 flex-row items-center gap-2 space-y-0 p-0 px-5 py-3">
      <SheetTitle className="border-0 p-0 text-[15px] font-bold text-[#E0E0E0] shadow-none">
        Account
      </SheetTitle>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto size-[35px] rounded-full text-[#E0E0E0] hover:bg-white/10"
        aria-label="Close"
        onClick={onClose}
      >
        <X className="size-6" />
      </Button>
    </SheetHeader>
  );
}

const gridButtonClass =
  "group flex h-[64px] w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-[#2C2532] bg-[#211C25] p-3 font-normal text-[#A9A6B3] shadow-none transition-colors hover:bg-[#261F2B] hover:text-[#A9A6B3] focus-visible:border-[#2C2532] focus-visible:ring-0 [&_svg]:size-5 [&_svg]:text-[#A9A6B3]";

const gridIconWrapClass =
  "inline-flex transition-transform duration-200 ease-out origin-center group-hover:scale-[1.18]";

function AccountGridButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={gridButtonClass}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

/** Toggle styling for Ghost mode & Early access: muted grey-purple track, soft grey thumb, compact pill. */
const preferenceSwitchClass =
  "group/switch !h-[26px] !w-[44px] rounded-full border-0 shadow-none transition-colors duration-200 ease-out focus-visible:ring-0 !data-unchecked:bg-[#463A54] !data-checked:bg-[#5A4A69] [&_[data-slot=switch-thumb]]:!size-5 [&_[data-slot=switch-thumb]]:!bg-[#BDBDBD] [&_[data-slot=switch-thumb]]:transition-transform [&_[data-slot=switch-thumb]]:duration-200 [&_[data-slot=switch-thumb]]:translate-x-0 [&_[data-slot=switch-thumb]]:data-checked:translate-x-[20px]";

export function AccountSidebar({ trigger }: { trigger: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = React.useState(false);
  const [screen, setScreen] = React.useState<Screen>("main");
  const [ghostMode, setGhostMode] = React.useState(false);
  const [earlyAccess, setEarlyAccess] = React.useState(false);
  const [myProfileOpen, setMyProfileOpen] = React.useState(false);
  const [signOutFooterMounted, setSignOutFooterMounted] = React.useState(true);
  const [signOutFooterOpaque, setSignOutFooterOpaque] = React.useState(true);

  React.useEffect(() => {
    if (screen === "main") {
      setSignOutFooterMounted(true);
      const frame = requestAnimationFrame(() => {
        setSignOutFooterOpaque(true);
      });
      return () => cancelAnimationFrame(frame);
    }
    setSignOutFooterOpaque(false);
    const t = window.setTimeout(() => {
      setSignOutFooterMounted(false);
    }, SIGN_OUT_FADE_MS);
    return () => clearTimeout(t);
  }, [screen]);

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

  /** Reusable handler for inactive buttons (lead outside Account sidebar). Sonner toast ~2.5s. */
  const handleInactiveClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast(INACTIVE_TOAST_MESSAGE, {
      duration: INACTIVE_TOAST_DURATION_MS,
      className:
        "!bg-[#1E1A22] !border !border-[#2C2532] !text-[#E0E0E0] !rounded-xl !text-sm !shadow-lg",
    });
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
          "flex max-h-dvh flex-col gap-0 overflow-hidden p-0",
          isMobile
            ? "h-dvh !w-full !max-w-full rounded-none border-0 shadow-xl sm:!max-w-full data-[side=right]:!w-full"
            : "h-[100dvh] max-h-[100dvh] w-[448px] max-w-[100vw] rounded-tl-[28px] rounded-bl-none rounded-r-none border-0 border-l border-[#2C2532] bg-[#141114]"
        )}
        style={isMobile ? { backgroundColor: MOBILE_BG } : undefined}
      >
        {isMobile ? (
          <MobileAccountPanel open={open} onRequestClose={closeEntireSidebar} />
        ) : (
        <Card className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none ring-0 gap-0 [font-family:var(--font-inter),sans-serif]">
          {/* Main screen: fill sheet height so scroll area flex-1 grows and Sign out stays at bottom */}
          <Card
            className={cn(
              "flex w-full max-w-full flex-col overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none ring-0 gap-0 transition-all duration-300 ease-in-out",
              screen === "main"
                ? "relative z-0 min-h-0 flex-1 translate-x-0 opacity-100"
                : "pointer-events-none absolute inset-0 max-h-none min-h-full -translate-x-full opacity-0"
            )}
          >
            <MainHeader onClose={closeEntireSidebar} />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <ScrollArea hideScrollbar className="min-h-0 min-w-0 flex-1">
              <ItemGroup className="gap-4 p-4">
              {/* Profile card */}
              <Card className="gap-0 rounded-[24px] border border-zinc-800/40 bg-transparent p-[2px] py-0 shadow-none ring-0">
                <CardContent className="flex h-[72px] items-center rounded-[22.5px] bg-[#141114] p-0">
                  <Avatar
                    className="size-[72px] shrink-0 after:border-0"
                  >
                    <AvatarFallback
                      className="text-xl font-bold text-zinc-800"
                      style={{ backgroundColor: AVATAR_BG }}
                    >
                      JA
                    </AvatarFallback>
                  </Avatar>
                  <CardHeader className="ml-3 min-w-0 flex-1 space-y-0 border-0 p-0">
                    <CardTitle className="truncate border-0 p-0 text-base font-bold text-white shadow-none">
                      JanChaos
                    </CardTitle>
                    <CardDescription className="whitespace-nowrap text-[11px] text-yellow-400">
                      Phone number verified
                    </CardDescription>
                  </CardHeader>
                  <CardAction className="flex shrink-0 flex-row items-center gap-2 self-center">
                    <Button
                      variant="ghost"
                      className="h-[27px] rounded-full border-0 bg-[#322A3C] px-3 text-xs font-medium text-[#CFAEFF] shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:border-0 focus-visible:ring-0"
                      onClick={() => setMyProfileOpen(true)}
                    >
                      My profile
                    </Button>
                    {/* INACTIVE: leads outside Account sidebar */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-[27px] rounded-full border-0 bg-[#322A3C] text-[#CFAEFF] shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:border-0 focus-visible:ring-0"
                      aria-label="Open grid menu"
                      onClick={handleInactiveClick}
                    >
                      <LayoutGrid className="size-4" />
                    </Button>
                  </CardAction>
                </CardContent>
              </Card>

              {/* Verification banner — icon shrink-0; text flex-1 min-w-0; button fixed width so copy stays 2–3 lines */}
              <Alert className="!mt-4 !flex w-full min-w-0 flex-row flex-nowrap items-center gap-3 rounded-2xl border-0 bg-[#1E1A22] !px-3 !py-3 shadow-none !ring-0 has-data-[slot=alert-action]:!pr-3">
                <Avatar className="size-9 shrink-0 after:border-0">
                  <AvatarFallback className="bg-amber-500/20">
                    <AlertCircle className="size-5 shrink-0 text-amber-500" />
                  </AvatarFallback>
                </Avatar>
                <CardHeader className="min-w-0 flex-1 border-0 p-0">
                  <AlertTitle className="whitespace-nowrap border-0 p-0 text-sm font-bold text-[#E0E0E0] shadow-none">
                    You&apos;re not verified yet!
                  </AlertTitle>
                  <AlertDescription className="mt-0.5 min-w-0 text-left text-xs leading-snug text-[#8F8F8F]">
                    Enjoy faster payouts, safer play, and no limits by verifying
                    your account.
                  </AlertDescription>
                </CardHeader>
                <AlertAction className="static top-auto right-auto w-[110px] shrink-0 translate-y-0 self-center">
                  <Button
                    className="w-full shrink-0 justify-center rounded-full bg-[#C8FF00] px-0 py-1.5 text-sm font-bold text-black hover:bg-[#b8e600]"
                    onClick={() => goTo("verification")}
                  >
                    Verify Now
                  </Button>
                </AlertAction>
              </Alert>

              {/* Wallet */}
              <Card className="gap-2 border-0 bg-transparent py-3 shadow-none ring-0">
                <CardHeader className="p-0">
                  <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                    Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-[9px] px-0 pb-0 pt-0">
                  {/* INACTIVE: leads outside Account sidebar */}
                  <AccountGridButton onClick={handleInactiveClick}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <ArrowUpFromLine className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Deposit
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <ArrowDownToLine className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Withdraw
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <Clock className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      History
                    </CardTitle>
                  </AccountGridButton>
                </CardContent>
              </Card>

              {/* Account */}
              <Card className="gap-2 border-0 bg-transparent py-3 shadow-none ring-0">
                <CardHeader className="p-0">
                  <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                    Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-[9px] px-0 pb-0 pt-0">
                  <AccountGridButton onClick={() => goTo("security")}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <ShieldCheck className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Security
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={() => goTo("preferences")}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <Settings className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Preferences
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={() => goTo("verification")}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <ScanLine className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Verification
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <MessageSquare className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Live support
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={() => goTo("inbox")}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <Mail className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Inbox
                    </CardTitle>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <ItemMedia variant="icon" className={cn(gridIconWrapClass, "inline-flex border-0 bg-transparent shadow-none")}>
                      <Gift className="size-5" />
                    </ItemMedia>
                    <CardTitle className="border-0 p-0 text-xs font-normal text-[#A9A6B3] shadow-none">
                      Promo code
                    </CardTitle>
                  </AccountGridButton>
                </CardContent>
              </Card>
              </ItemGroup>
              </ScrollArea>
            </div>
          </Card>

          {/* Sign out — outside slide layer; fade in/out when switching main ↔ sub-screens */}
          {signOutFooterMounted ? (
            <SheetFooter
              className={cn(
                "relative z-[5] mt-auto flex w-full shrink-0 flex-col items-center space-y-0 border-0 bg-[#141114] p-0 px-4 pb-6 pt-4",
                "transition-opacity duration-200 ease-out motion-reduce:transition-none",
                signOutFooterOpaque
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
              aria-hidden={!signOutFooterOpaque}
            >
              <Button
                variant="outline"
                className="h-9 w-[calc((100%-18px)/2)] max-w-[min(100%,240px)] shrink-0 rounded-full px-4 text-sm font-medium text-[#CFAEFF] bg-[#322A3C] border-0 shadow-none transition-colors duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:ring-0 focus-visible:border-0"
                tabIndex={signOutFooterOpaque ? undefined : -1}
                onClick={handleInactiveClick}
              >
                Sign out
              </Button>
            </SheetFooter>
          ) : null}

          {/* Sub-screens: slide in from right */}
          {(["security", "preferences", "verification", "inbox"] as const).map(
            (sub) => (
              <Card
                key={sub}
                className={cn(
                  "absolute inset-0 flex min-h-0 flex-col overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none ring-0 gap-0 transition-all duration-300 ease-in-out",
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
                    <ScrollArea hideScrollbar className="min-h-0 min-w-0 flex-1">
                      <FieldGroup className="gap-0 px-5 pb-5 pt-5">
                        <Field className="gap-2 border-0 p-0">
                          <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                            Password
                          </CardTitle>
                          <FieldDescription className="text-sm text-[#8F8F8F]">
                            Manage your login credentials
                          </FieldDescription>
                          <Button
                            className="mt-1 h-[49px] w-full rounded-full bg-[#261F2B] text-base font-bold hover:bg-[#2C2532]"
                            style={{ color: ACCENT_PURPLE }}
                          >
                            Change password
                          </Button>
                        </Field>
                        <Separator className="shrink-0 bg-[#2C2532]" />
                        <Field className="gap-2 border-0 p-0 pt-3">
                          <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                            Two-factor authentication (2FA)
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="h-5 w-fit gap-1 rounded-full border-0 px-2 text-[11px] font-medium"
                            style={{
                              backgroundColor: ERROR_BG,
                              color: ERROR_TEXT,
                            }}
                          >
                            <ShieldCheck className="size-3.5" />
                            2FA is disabled
                          </Badge>
                          <FieldDescription className="text-sm text-[#8F8F8F]">
                            Improve the security of your account by requiring
                            verification, using your phone, when signing in or
                            withdrawing funds:
                          </FieldDescription>
                          <Button
                            className="mt-1 h-[49px] w-full rounded-full bg-[#261F2B] text-base font-bold hover:bg-[#2C2532]"
                            style={{ color: ACCENT_PURPLE }}
                          >
                            Set up 2FA
                          </Button>
                        </Field>
                      </FieldGroup>
                    </ScrollArea>
                  </>
                )}

                {sub === "preferences" && (
                  <>
                    <SubScreenHeader
                      title="Preferences"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <ScrollArea hideScrollbar className="min-h-0 min-w-0 flex-1">
                      <FieldGroup className="gap-8 p-5">
                        {/* Language */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-1">
                              <Label
                                htmlFor="pref-language"
                                className="cursor-pointer text-base font-bold text-[#E0E0E0]"
                              >
                                Language
                              </Label>
                              <Select defaultValue="en">
                                <SelectTrigger
                                  id="pref-language"
                                  className="w-auto border-0 bg-transparent text-sm font-bold shadow-none focus:ring-0"
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
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            Choose your display language.
                          </FieldDescription>
                        </Field>
                        {/* Time zone */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-1">
                              <Label
                                htmlFor="pref-timezone"
                                className="cursor-pointer text-base font-bold text-[#E0E0E0]"
                              >
                                Time zone
                              </Label>
                              <Select>
                                <SelectTrigger
                                  id="pref-timezone"
                                  className="w-auto border-0 bg-transparent text-sm font-bold shadow-none focus:ring-0"
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
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            All event times show in your selected time zone.
                          </FieldDescription>
                        </Field>
                        {/* Odds format */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-1">
                              <Label
                                htmlFor="pref-odds"
                                className="cursor-pointer text-base font-bold text-[#E0E0E0]"
                              >
                                Odds format
                              </Label>
                              <Select defaultValue="decimal">
                                <SelectTrigger
                                  id="pref-odds"
                                  className="w-auto border-0 bg-transparent text-sm font-bold shadow-none focus:ring-0"
                                  style={{ color: ACCENT_PURPLE }}
                                >
                                  <SelectValue placeholder="Decimal" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="decimal">Decimal</SelectItem>
                                  <SelectItem value="fractional">
                                    Fractional
                                  </SelectItem>
                                  <SelectItem value="american">American</SelectItem>
                                </SelectContent>
                              </Select>
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            Applies to all sports betting markets.
                          </FieldDescription>
                        </Field>
                        {/* Ghost mode */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-3">
                              <Label
                                htmlFor="switch-ghost"
                                className="cursor-pointer text-base font-bold text-[#E0E0E0]"
                              >
                                Ghost mode
                              </Label>
                              <Switch
                                id="switch-ghost"
                                checked={ghostMode}
                                onCheckedChange={setGhostMode}
                                className={preferenceSwitchClass}
                              />
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            Username and profile are visible everywhere.
                          </FieldDescription>
                        </Field>
                        {/* Responsible gambling */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-3">
                              <Label className="text-base font-bold text-[#E0E0E0]">
                                Responsible gambling
                              </Label>
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-sm font-bold shadow-none"
                                style={{ color: ACCENT_PURPLE }}
                              >
                                Set up &gt;
                              </Button>
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            Set limits or take a break when you need it.
                          </FieldDescription>
                        </Field>
                        {/* Early access */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-3">
                              <Label
                                htmlFor="switch-early"
                                className="cursor-pointer text-base font-bold text-[#E0E0E0]"
                              >
                                Early access
                              </Label>
                              <Switch
                                id="switch-early"
                                checked={earlyAccess}
                                onCheckedChange={setEarlyAccess}
                                className={preferenceSwitchClass}
                              />
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            Get early access to new and experimental features
                            before public release.
                          </FieldDescription>
                        </Field>
                        {/* API key */}
                        <Field className="gap-1.5 border-0 p-0 shadow-none">
                          <Card
                            size="sm"
                            className="gap-0 rounded-xl border-0 bg-[#261F2B] py-0 shadow-none ring-0"
                          >
                            <CardContent className="flex min-h-[49px] items-center justify-between py-1 pl-3 pr-3">
                              <Label className="text-base font-bold text-[#E0E0E0]">
                                API key
                              </Label>
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-sm font-bold shadow-none"
                                style={{ color: ACCENT_PURPLE }}
                              >
                                Generate key
                              </Button>
                            </CardContent>
                          </Card>
                          <FieldDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                            Connect for automated trading.
                          </FieldDescription>
                        </Field>
                      </FieldGroup>
                    </ScrollArea>
                  </>
                )}

                {sub === "verification" && (
                  <>
                    <SubScreenHeader
                      title="Verification"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <Card className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-transparent py-0 shadow-none ring-0 gap-0">
                    <ScrollArea hideScrollbar className="min-h-0 min-w-0 flex-1">
                    <Card className="mx-5 mt-2 border-0 bg-transparent px-0 pt-2 shadow-none ring-0">
                      <CardContent className="px-0 py-0">
                        <CardDescription className="text-sm text-[#8F8F8F]">
                          Verifying your identity keeps your account secure and your
                          access seamless.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    {/* N steps, N-1 connectors only; gap-0 between stacked rows so bars fill circle-to-circle */}
                    <ItemGroup className="gap-0 px-5 pb-4 pt-4">
                      {(
                        [
                          {
                            key: "email",
                            node: (
                              <Avatar className="relative z-[2] size-9 rounded-full">
                                <AvatarFallback
                                  className="rounded-full border-0"
                                  style={{ backgroundColor: SUCCESS }}
                                >
                                  <Check className="size-5 text-white" />
                                </AvatarFallback>
                              </Avatar>
                            ),
                            card: (
                              <Card className="min-w-0 flex-1 gap-0 rounded-xl border-0 bg-zinc-900 py-0 shadow-none ring-0">
                                <CardContent className="px-4 py-3">
                                  <CardHeader className="flex flex-row items-center gap-3 border-0 p-0">
                                    <Mail className="size-5 shrink-0 text-[#8F8F8F]" />
                                    <CardTitle className="border-0 p-0 text-sm font-normal text-[#8F8F8F] shadow-none">
                                      Email Verification
                                    </CardTitle>
                                  </CardHeader>
                                </CardContent>
                              </Card>
                            ),
                          },
                          {
                            key: "phone",
                            node: (
                              <Avatar className="relative z-[2] size-9 rounded-full">
                                <AvatarFallback
                                  className="rounded-full border-0"
                                  style={{ backgroundColor: SUCCESS }}
                                >
                                  <Check className="size-5 text-white" />
                                </AvatarFallback>
                              </Avatar>
                            ),
                            card: (
                              <Card className="min-w-0 flex-1 gap-0 rounded-xl border-0 bg-zinc-900 py-0 shadow-none ring-0">
                                <CardContent className="px-4 py-3">
                                  <CardHeader className="flex flex-row items-center gap-3 border-0 p-0">
                                    <Phone className="size-5 shrink-0 text-[#8F8F8F]" />
                                    <CardTitle className="border-0 p-0 text-sm font-normal text-[#8F8F8F] shadow-none">
                                      Phone Verification
                                    </CardTitle>
                                  </CardHeader>
                                </CardContent>
                              </Card>
                            ),
                          },
                          {
                            key: "identity",
                            node: (
                              <Avatar className="relative z-[2] size-9 shrink-0 rounded-full border-2 border-[#8F8F8F] bg-[#141114]">
                                <AvatarFallback className="size-full rounded-full border-0 bg-[#141114]">
                                  <Badge
                                    className="size-1.5 min-h-[6px] min-w-[6px] shrink-0 rounded-full border-0 bg-[#8F8F8F] p-0 hover:bg-[#8F8F8F]"
                                    aria-hidden
                                  />
                                </AvatarFallback>
                              </Avatar>
                            ),
                            card: (
                              <Card className="min-w-0 flex-1 gap-0 rounded-[14px] border border-zinc-700/90 bg-[#1A1A1E] py-0 shadow-none ring-0">
                                <CardContent className="px-4 pb-4 pt-4">
                                  <CardHeader className="flex flex-row items-center gap-3 border-0 p-0">
                                    <IdCard
                                      className="size-6 shrink-0 text-white"
                                      strokeWidth={1.5}
                                      aria-hidden
                                    />
                                    <CardTitle className="border-0 p-0 text-base font-bold leading-snug text-white shadow-none">
                                      Identity Verification
                                    </CardTitle>
                                  </CardHeader>
                                  <CardDescription className="mt-4 text-sm font-normal leading-relaxed text-[#A1A1AA]">
                                    Before you start, have your{" "}
                                    <strong className="font-bold text-white">
                                      ID
                                    </strong>{" "}
                                    and{" "}
                                    <strong className="font-bold text-white">
                                      proof of address
                                    </strong>{" "}
                                    ready to speed things up. The list of accepted
                                    documents can be found{" "}
                                    <Button
                                      type="button"
                                      variant="link"
                                      className="inline-flex h-auto items-center gap-1 p-0 align-baseline text-sm font-normal text-white underline decoration-white/80 underline-offset-4 hover:text-white hover:decoration-white"
                                      onClick={(e) => e.preventDefault()}
                                    >
                                      <ExternalLink
                                        className="size-3.5 shrink-0 opacity-90"
                                        aria-hidden
                                      />
                                      here
                                    </Button>
                                    .
                                  </CardDescription>
                                  <Button className="mt-5 h-[49px] w-full rounded-full bg-[#CCFF00] text-base font-bold text-black hover:bg-[#b8e600]">
                                    Verify identity
                                  </Button>
                                </CardContent>
                              </Card>
                            ),
                          },
                        ] as const
                      ).map((step, i, arr) => (
                        <React.Fragment key={step.key}>
                          <Item
                            role="listitem"
                            className={cn(
                              "w-full flex-nowrap border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-0",
                              step.key === "identity"
                                ? "items-start"
                                : "items-center"
                            )}
                          >
                            <ItemMedia
                              className="w-9 shrink-0 justify-center"
                              aria-hidden
                            >
                              {step.node}
                            </ItemMedia>
                            <ItemContent className="min-w-0">
                              {step.card}
                            </ItemContent>
                          </Item>
                          {i < arr.length - 1 && (
                            <Item
                              role="presentation"
                              className="w-full flex-nowrap border-0 bg-transparent p-0 py-0.5 shadow-none outline-none focus-visible:ring-0"
                              aria-hidden
                            >
                              <ItemMedia className="w-9 shrink-0 justify-center">
                                <Separator
                                  orientation="vertical"
                                  className={cn(
                                    "min-h-10 w-0.5 shrink-0 rounded-full",
                                    i === 0 ? "bg-green-500" : "bg-zinc-600"
                                  )}
                                />
                              </ItemMedia>
                              <ItemContent className="min-w-0 flex-1" />
                            </Item>
                          )}
                        </React.Fragment>
                      ))}
                    </ItemGroup>
                    </ScrollArea>
                    <Card className="mx-5 mb-5 mt-0 shrink-0 rounded-none border-0 bg-transparent py-0 shadow-none ring-0">
                      <Card className="gap-0 rounded-[12px] border border-purple-500/40 bg-[#141114] py-0 shadow-[0_0_12px_rgba(168,85,247,0.15)] ring-0">
                        <CardContent className="flex items-center gap-3 p-4">
                        <Avatar className="size-14 shrink-0 after:border-0">
                          <AvatarFallback className="bg-violet-500/35">
                            <ShieldCheck className="size-8 text-violet-400" />
                          </AvatarFallback>
                        </Avatar>
                        <CardHeader className="min-w-0 flex-1 border-0 p-0">
                          <CardTitle className="border-0 p-0 text-sm font-bold text-[#E0E0E0] shadow-none">
                            Secure your account.
                          </CardTitle>
                          <CardTitle className="border-0 p-0 text-sm font-bold text-[#E0E0E0] shadow-none">
                            Get the full experience.
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs text-[#8F8F8F]">
                            <ItemGroup className="gap-0.5" role="list">
                              <Item
                                role="listitem"
                                size="xs"
                                variant="default"
                                className="items-start border-0 bg-transparent py-0 shadow-none outline-none focus-visible:ring-0"
                              >
                                <ItemMedia
                                  variant="icon"
                                  className="w-4 shrink-0 justify-start pt-0.5 text-[#8F8F8F]"
                                >
                                  <Badge
                                    variant="outline"
                                    className="h-4 min-w-0 border-0 bg-transparent px-0 font-normal text-[#8F8F8F] shadow-none hover:bg-transparent"
                                    aria-hidden
                                  >
                                    •
                                  </Badge>
                                </ItemMedia>
                                <ItemContent className="min-w-0 flex-1">
                                  <ItemDescription className="line-clamp-none text-left text-xs text-[#8F8F8F]">
                                    Stronger security & fraud protection
                                  </ItemDescription>
                                </ItemContent>
                              </Item>
                              <Item
                                role="listitem"
                                size="xs"
                                variant="default"
                                className="items-start border-0 bg-transparent py-0 shadow-none outline-none focus-visible:ring-0"
                              >
                                <ItemMedia
                                  variant="icon"
                                  className="w-4 shrink-0 justify-start pt-0.5 text-[#8F8F8F]"
                                >
                                  <Badge
                                    variant="outline"
                                    className="h-4 min-w-0 border-0 bg-transparent px-0 font-normal text-[#8F8F8F] shadow-none hover:bg-transparent"
                                    aria-hidden
                                  >
                                    •
                                  </Badge>
                                </ItemMedia>
                                <ItemContent className="min-w-0 flex-1">
                                  <ItemDescription className="line-clamp-none text-left text-xs text-[#8F8F8F]">
                                    Faster & unlimited withdrawals
                                  </ItemDescription>
                                </ItemContent>
                              </Item>
                              <Item
                                role="listitem"
                                size="xs"
                                variant="default"
                                className="items-start border-0 bg-transparent py-0 shadow-none outline-none focus-visible:ring-0"
                              >
                                <ItemMedia
                                  variant="icon"
                                  className="w-4 shrink-0 justify-start pt-0.5 text-[#8F8F8F]"
                                >
                                  <Badge
                                    variant="outline"
                                    className="h-4 min-w-0 border-0 bg-transparent px-0 font-normal text-[#8F8F8F] shadow-none hover:bg-transparent"
                                    aria-hidden
                                  >
                                    •
                                  </Badge>
                                </ItemMedia>
                                <ItemContent className="min-w-0 flex-1">
                                  <ItemDescription className="line-clamp-none text-left text-xs text-[#8F8F8F]">
                                    Unlock full features & VIP perks
                                  </ItemDescription>
                                </ItemContent>
                              </Item>
                            </ItemGroup>
                          </CardDescription>
                        </CardHeader>
                        </CardContent>
                      </Card>
                    </Card>
                    </Card>
                  </>
                )}

                {sub === "inbox" && (
                  <>
                    <SubScreenHeader
                      title="Inbox"
                      onBack={goBack}
                      onClose={closeEntireSidebar}
                    />
                    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                      <Card className="flex min-h-0 flex-1 flex-col rounded-none border-0 bg-transparent py-0 shadow-none ring-0">
                        <CardContent className="flex flex-1 flex-col items-center justify-center px-6 py-16 pb-14">
                          <InboxEmptyIllustration />
                          <CardTitle className="mt-4 border-0 p-0 text-center text-lg font-semibold tracking-tight text-white shadow-none">
                            Nothing new
                          </CardTitle>
                          <CardDescription className="mt-2 max-w-[280px] text-center text-sm font-normal leading-relaxed text-[#8F8F8F]">
                            You&apos;re all caught up.
                          </CardDescription>
                          <Button
                            type="button"
                            className="mt-9 h-[49px] min-w-[200px] rounded-full bg-[#261F2B] px-8 text-[15px] font-bold shadow-none hover:bg-[#2C2532] focus-visible:ring-0"
                            style={{ color: ACCENT_PURPLE }}
                            onClick={handleInactiveClick}
                          >
                            View earlier (15)
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </Card>
            )
          )}

        </Card>
        )}
      </SheetContent>
    </Sheet>
    <MyProfilePanel
      open={myProfileOpen && !isMobile}
      onBack={() => setMyProfileOpen(false)}
      onClose={closeEntireSidebar}
    />
    </>
  );
}
