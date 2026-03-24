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
  Card,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      <CardTitle className="ml-2 border-0 p-0 text-[15px] font-bold text-[#E0E0E0] shadow-none">
        {title}
      </CardTitle>
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
    <header className="flex min-h-[48px] shrink-0 items-center gap-2 px-5 py-3">
      <CardTitle className="border-0 p-0 text-[15px] font-bold text-[#E0E0E0] shadow-none">
        Account
      </CardTitle>
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
  const [open, setOpen] = React.useState(false);
  const [screen, setScreen] = React.useState<Screen>("main");
  const [ghostMode, setGhostMode] = React.useState(false);
  const [earlyAccess, setEarlyAccess] = React.useState(false);
  const [myProfileOpen, setMyProfileOpen] = React.useState(false);

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
          "flex h-full max-h-dvh w-[448px] max-w-[100vw] flex-col overflow-hidden rounded-tl-[28px] rounded-bl-none rounded-r-none p-0 gap-0",
          "bg-[#141114] border-0 border-l border-[#2C2532]"
        )}
      >
        <ScrollArea className="min-h-0 flex-1">
        <div className="relative flex min-h-full flex-col [font-family:var(--font-inter),sans-serif]">
          {/* Main screen — content height; max-h + inner scroll; Sign out below scroll (no mt-auto) */}
          <div
            className={cn(
              "flex w-full max-w-full flex-col overflow-hidden transition-all duration-300 ease-in-out max-h-[90vh]",
              screen === "main"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 absolute inset-0 pointer-events-none min-h-full max-h-none"
            )}
          >
            <MainHeader onClose={closeEntireSidebar} />
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
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
                  <div className="ml-3 flex min-w-0 flex-col">
                    <CardTitle className="truncate border-0 p-0 text-base font-bold text-white shadow-none">
                      JanChaos
                    </CardTitle>
                    <CardDescription className="whitespace-nowrap text-[11px] text-yellow-400">
                      Phone number verified
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex shrink-0 items-center gap-2">
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
                      onClick={handleInactiveClick}
                    >
                      <LayoutGrid className="size-4" />
                      <span className="sr-only">Grid</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Verification banner — icon shrink-0; text flex-1 min-w-0; button fixed width so copy stays 2–3 lines */}
              <Alert className="!mt-4 !flex w-full min-w-0 flex-row flex-nowrap items-center gap-3 rounded-2xl border-0 bg-[#1E1A22] !px-3 !py-3 shadow-none !ring-0 has-data-[slot=alert-action]:!pr-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                  <AlertCircle className="size-5 shrink-0 text-amber-500" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <AlertTitle className="whitespace-nowrap border-0 p-0 text-sm font-bold text-[#E0E0E0] shadow-none">
                    You&apos;re not verified yet!
                  </AlertTitle>
                  <AlertDescription className="mt-0.5 min-w-0 text-left text-xs leading-snug text-[#8F8F8F]">
                    Enjoy faster payouts, safer play, and no limits by verifying
                    your account.
                  </AlertDescription>
                </div>
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
                <CardContent className="px-0 pb-0 pt-0">
                <div className="grid grid-cols-3 gap-[9px]">
                  {/* INACTIVE: leads outside Account sidebar */}
                  <AccountGridButton onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <ArrowUpFromLine className="size-5" />
                    </span>
                    <span className="text-xs">Deposit</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <ArrowDownToLine className="size-5" />
                    </span>
                    <span className="text-xs">Withdraw</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <Clock className="size-5" />
                    </span>
                    <span className="text-xs">History</span>
                  </AccountGridButton>
                </div>
                </CardContent>
              </Card>

              {/* Account */}
              <Card className="gap-2 border-0 bg-transparent py-3 shadow-none ring-0">
                <CardHeader className="p-0">
                  <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                    Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0 pt-0">
                <div className="grid grid-cols-3 gap-[9px]">
                  <AccountGridButton onClick={() => goTo("security")}>
                    <span className={gridIconWrapClass}>
                      <ShieldCheck className="size-5" />
                    </span>
                    <span className="text-xs">Security</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={() => goTo("preferences")}>
                    <span className={gridIconWrapClass}>
                      <Settings className="size-5" />
                    </span>
                    <span className="text-xs">Preferences</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={() => goTo("verification")}>
                    <span className={gridIconWrapClass}>
                      <ScanLine className="size-5" />
                    </span>
                    <span className="text-xs">Verification</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <MessageSquare className="size-5" />
                    </span>
                    <span className="text-xs">Live support</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={() => goTo("inbox")}>
                    <span className={gridIconWrapClass}>
                      <Mail className="size-5" />
                    </span>
                    <span className="text-xs">Inbox</span>
                  </AccountGridButton>
                  <AccountGridButton onClick={handleInactiveClick}>
                    <span className={gridIconWrapClass}>
                      <Gift className="size-5" />
                    </span>
                    <span className="text-xs">Promo code</span>
                  </AccountGridButton>
                </div>
                </CardContent>
              </Card>
              </div>

              {/* Sign out — INACTIVE: leads outside Account sidebar */}
              <div className="w-full shrink-0 p-4 pt-0">
                <Button
                  variant="outline"
                  className="w-full rounded-full px-6 py-2 text-sm text-[#CFAEFF] bg-[#322A3C] border-0 shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:ring-0 focus-visible:border-0"
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
                      <CardTitle className="mb-1 border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                        Password
                      </CardTitle>
                      <CardDescription className="text-sm text-[#8F8F8F]">
                        Manage your login credentials
                      </CardDescription>
                      <Button
                        className="mt-3 h-[49px] w-full rounded-full bg-[#261F2B] text-base font-bold hover:bg-[#2C2532]"
                        style={{ color: ACCENT_PURPLE }}
                      >
                        Change password
                      </Button>
                    </div>
                    <Separator className="bg-[#2C2532]" />
                    <div className="flex flex-col px-5 pt-3 pb-5">
                      <CardTitle className="mb-1 border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
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
                      <CardDescription className="mt-2 text-sm text-[#8F8F8F]">
                        Improve the security of your account by requiring
                        verification, using your phone, when signing in or
                        withdrawing funds:
                      </CardDescription>
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
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          Choose your display language.
                        </CardDescription>
                      </div>
                      {/* Time zone */}
                      <div className="mb-8">
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
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          All event times show in your selected time zone.
                        </CardDescription>
                      </div>
                      {/* Odds format */}
                      <div className="mb-8">
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
                              <SelectItem value="fractional">Fractional</SelectItem>
                              <SelectItem value="american">American</SelectItem>
                            </SelectContent>
                          </Select>
                          </CardContent>
                        </Card>
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          Applies to all sports betting markets.
                        </CardDescription>
                      </div>
                      {/* Ghost mode */}
                      <div className="mb-8">
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
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          Username and profile are visible everywhere.
                        </CardDescription>
                      </div>
                      {/* Responsible gambling */}
                      <div className="mb-8">
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
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          Set limits or take a break when you need it.
                        </CardDescription>
                      </div>
                      {/* Early access */}
                      <div className="mb-8">
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
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          Get early access to new and experimental features
                          before public release.
                        </CardDescription>
                      </div>
                      {/* API key */}
                      <div className="mb-8">
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
                        <CardDescription className="px-4 pt-1 text-sm text-[#8F8F8F]">
                          Connect for automated trading.
                        </CardDescription>
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
                    <Card className="mx-5 mt-2 border-0 bg-transparent px-0 pt-2 shadow-none ring-0">
                      <CardContent className="px-0 py-0">
                        <CardDescription className="text-sm text-[#8F8F8F]">
                          Verifying your identity keeps your account secure and your
                          access seamless.
                        </CardDescription>
                      </CardContent>
                    </Card>
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
                              <Card className="min-w-0 flex-1 gap-0 rounded-xl border-0 bg-zinc-900 py-0 shadow-none ring-0">
                                <CardContent className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <Mail className="size-5 shrink-0 text-[#8F8F8F]" />
                                  <CardTitle className="border-0 p-0 text-sm font-normal text-[#8F8F8F] shadow-none">
                                    Email Verification
                                  </CardTitle>
                                </div>
                                </CardContent>
                              </Card>
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
                              <Card className="min-w-0 flex-1 gap-0 rounded-xl border-0 bg-zinc-900 py-0 shadow-none ring-0">
                                <CardContent className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <Phone className="size-5 shrink-0 text-[#8F8F8F]" />
                                  <CardTitle className="border-0 p-0 text-sm font-normal text-[#8F8F8F] shadow-none">
                                    Phone Verification
                                  </CardTitle>
                                </div>
                                </CardContent>
                              </Card>
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
                              <Card className="min-w-0 flex-1 gap-0 rounded-xl border border-zinc-700 bg-zinc-800 py-0 shadow-none ring-0">
                                <CardContent className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <ScanLine className="size-5 shrink-0 text-[#E0E0E0]" />
                                  <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                                    Identity Verification
                                  </CardTitle>
                                </div>
                                <CardDescription className="mt-2 text-sm text-[#8F8F8F]">
                                  Before you start, have your <strong>ID</strong>{" "}
                                  and <strong>proof of address</strong> ready to
                                  speed things up. The list of accepted documents
                                  can be found{" "}
                                  <Button
                                    type="button"
                                    variant="link"
                                    className="inline-flex h-auto gap-0.5 p-0 text-[#CCA6FF] hover:underline"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    here
                                    <ExternalLink className="inline size-3.5" />
                                  </Button>
                                  .
                                </CardDescription>
                                <Button className="mt-3 h-[49px] w-full rounded-full bg-[#CCFF00] text-base font-bold text-black hover:bg-[#b8e600]">
                                  Verify identity
                                </Button>
                                </CardContent>
                              </Card>
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
                    <div className="mx-5 mt-auto mb-5">
                      <Card className="gap-0 rounded-[12px] border border-purple-500/40 bg-[#141114] py-0 shadow-[0_0_12px_rgba(168,85,247,0.15)] ring-0">
                        <CardContent className="flex items-center gap-3 p-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-violet-500/35">
                          <ShieldCheck className="size-8 text-violet-400" />
                        </div>
                        <div className="flex min-w-0 flex-col">
                          <CardTitle className="border-0 p-0 text-sm font-bold text-[#E0E0E0] shadow-none">
                            Secure your account.
                          </CardTitle>
                          <CardTitle className="border-0 p-0 text-sm font-bold text-[#E0E0E0] shadow-none">
                            Get the full experience.
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs text-[#8F8F8F]">
                            <ul className="list-inside list-disc space-y-0.5">
                              <li>Stronger security & fraud protection</li>
                              <li>Faster & unlimited withdrawals</li>
                              <li>Unlock full features & VIP perks</li>
                            </ul>
                          </CardDescription>
                        </div>
                        </CardContent>
                      </Card>
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
                      <CardTitle className="mt-4 border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                        Nothing new
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-[#8F8F8F]">
                        You&apos;re all caught up.
                      </CardDescription>
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

        </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
    <MyProfilePanel
      open={myProfileOpen}
      onBack={() => setMyProfileOpen(false)}
      onClose={closeEntireSidebar}
    />
    </>
  );
}
