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
    <SheetHeader className="sticky top-0 z-10 flex min-h-[70px] shrink-0 flex-row items-center space-y-0 p-0 px-5">
      <Button
        variant="ghost"
        size="icon"
        className="size-[35px] rounded-full text-[#E0E0E0] hover:bg-white/10"
        aria-label="Back"
        onClick={onBack}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <SheetTitle className="ml-2 border-0 p-0 text-[15px] font-bold text-[#E0E0E0] shadow-none">
        {title}
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
          "flex h-[100dvh] max-h-[100dvh] w-[448px] max-w-[100vw] flex-col overflow-hidden rounded-tl-[28px] rounded-bl-none rounded-r-none p-0 gap-0",
          "bg-[#141114] border-0 border-l border-[#2C2532]"
        )}
      >
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
            <FieldGroup className="min-h-0 flex-1 gap-0 overflow-hidden p-0">
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

              {/* Sign out — pinned to bottom of sheet; ~1.5 grid tiles wide, centered */}
              <SheetFooter className="mt-auto flex w-full shrink-0 flex-col items-center space-y-0 border-0 p-0 px-4 pb-6 pt-4">
                <Button
                  variant="outline"
                  className="h-9 w-[calc((100%-18px)/2)] max-w-[min(100%,240px)] shrink-0 rounded-full px-4 text-sm font-medium text-[#CFAEFF] bg-[#322A3C] border-0 shadow-none transition-all duration-[160ms] ease hover:bg-[#3A3146] hover:text-[#CFAEFF] hover:shadow-none focus-visible:ring-0 focus-visible:border-0"
                  onClick={handleInactiveClick}
                >
                  Sign out
                </Button>
              </SheetFooter>
            </FieldGroup>
          </Card>

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
                              <Card className="min-w-0 flex-1 gap-0 rounded-xl border border-zinc-700 bg-zinc-800 py-0 shadow-none ring-0">
                                <CardContent className="px-4 py-4">
                                  <CardHeader className="flex flex-row items-center gap-3 border-0 p-0">
                                    <ScanLine className="size-5 shrink-0 text-[#E0E0E0]" />
                                    <CardTitle className="border-0 p-0 text-base font-bold text-[#E0E0E0] shadow-none">
                                      Identity Verification
                                    </CardTitle>
                                  </CardHeader>
                                  <CardDescription className="mt-2 text-sm text-[#8F8F8F]">
                                  Before you start, have your{" "}
                                  <Badge
                                    variant="outline"
                                    className="mx-0.5 inline h-5 border-zinc-600 px-1.5 align-middle font-normal text-[#E0E0E0] hover:bg-transparent"
                                  >
                                    ID
                                  </Badge>{" "}
                                  and{" "}
                                  <Badge
                                    variant="outline"
                                    className="mx-0.5 inline h-5 border-zinc-600 px-1.5 align-middle font-normal text-[#E0E0E0] hover:bg-transparent"
                                  >
                                    proof of address
                                  </Badge>{" "}
                                  ready to speed things up. The list of accepted
                                  documents can be found{" "}
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
                                className="border-0 bg-transparent py-0 shadow-none outline-none focus-visible:ring-0"
                              >
                                <ItemMedia
                                  variant="icon"
                                  className="w-4 justify-start text-[#8F8F8F]"
                                >
                                  <Badge
                                    variant="outline"
                                    className="h-4 min-w-0 border-0 bg-transparent px-0 font-normal text-[#8F8F8F] shadow-none hover:bg-transparent"
                                    aria-hidden
                                  >
                                    •
                                  </Badge>
                                </ItemMedia>
                                <ItemDescription className="line-clamp-none text-xs text-[#8F8F8F]">
                                  Stronger security & fraud protection
                                </ItemDescription>
                              </Item>
                              <Item
                                role="listitem"
                                size="xs"
                                variant="default"
                                className="border-0 bg-transparent py-0 shadow-none outline-none focus-visible:ring-0"
                              >
                                <ItemMedia
                                  variant="icon"
                                  className="w-4 justify-start text-[#8F8F8F]"
                                >
                                  <Badge
                                    variant="outline"
                                    className="h-4 min-w-0 border-0 bg-transparent px-0 font-normal text-[#8F8F8F] shadow-none hover:bg-transparent"
                                    aria-hidden
                                  >
                                    •
                                  </Badge>
                                </ItemMedia>
                                <ItemDescription className="line-clamp-none text-xs text-[#8F8F8F]">
                                  Faster & unlimited withdrawals
                                </ItemDescription>
                              </Item>
                              <Item
                                role="listitem"
                                size="xs"
                                variant="default"
                                className="border-0 bg-transparent py-0 shadow-none outline-none focus-visible:ring-0"
                              >
                                <ItemMedia
                                  variant="icon"
                                  className="w-4 justify-start text-[#8F8F8F]"
                                >
                                  <Badge
                                    variant="outline"
                                    className="h-4 min-w-0 border-0 bg-transparent px-0 font-normal text-[#8F8F8F] shadow-none hover:bg-transparent"
                                    aria-hidden
                                  >
                                    •
                                  </Badge>
                                </ItemMedia>
                                <ItemDescription className="line-clamp-none text-xs text-[#8F8F8F]">
                                  Unlock full features & VIP perks
                                </ItemDescription>
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
                    <ScrollArea hideScrollbar className="min-h-0 min-w-0 flex-1">
                      <Card className="min-h-[min(100%,28rem)] rounded-none border-0 bg-transparent py-0 shadow-none ring-0">
                        <CardContent className="flex flex-col items-center justify-center px-5 py-12">
                          <MailOpen className="mx-auto size-16 text-zinc-600" />
                          <CardTitle className="mt-4 border-0 p-0 text-center text-base font-bold text-[#E0E0E0] shadow-none">
                            Nothing new
                          </CardTitle>
                          <CardDescription className="mt-1 text-center text-sm text-[#8F8F8F]">
                            You&apos;re all caught up.
                          </CardDescription>
                          <Button
                            className="mt-4 h-[49px] rounded-full bg-[#261F2B] px-6 text-sm font-bold hover:bg-[#2C2532]"
                            style={{ color: ACCENT_PURPLE }}
                          >
                            View earlier (3)
                          </Button>
                        </CardContent>
                      </Card>
                    </ScrollArea>
                  </>
                )}
              </Card>
            )
          )}

        </Card>
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
