"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  type PanInfo,
} from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  BadgeCheck,
  History,
  Mail,
  MessageSquare,
  Settings,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import type { MobileNav, MobileScreen } from "./constants";
import { MobileAccountHeader } from "./mobile-account-header";
import { MobileUserCard } from "./mobile-user-card";
import { MobileVerificationBanner } from "./mobile-verification-banner";
import { MobileLoyaltyCard } from "./mobile-loyalty-card";
import { MobileTileSection } from "./mobile-tile-section";
import { MobileActionTile } from "./mobile-action-tile";
import { MobileStickyFooter } from "./mobile-sticky-footer";
import { MobileSecurityScreen } from "./screens/security";
import { MobilePreferencesScreen } from "./screens/preferences";
import { MobileVerificationScreen } from "./screens/verification";
import { MobileMyProfileScreen } from "./screens/my-profile";
import { MobileInboxScreen } from "./screens/inbox";
import { MobilePlaceholderScreen } from "./screens/placeholder";

const SIGN_OUT_TOAST =
  "Sign out is inactive in this prototype — same as desktop Account sidebar.";

/** Fraction of panel width to trigger back (increased sensitivity). */
const SWIPE_BACK_DISTANCE_RATIO = 0.22;
/** Fast rightward flick completes back even below distance threshold (px/s). */
const SWIPE_BACK_MIN_VELOCITY_X = 380;

export type MobileAccountPanelProps = {
  open: boolean;
  onRequestClose: () => void;
};

export function MobileAccountPanel({
  open,
  onRequestClose,
}: MobileAccountPanelProps) {
  const [screen, setScreen] = React.useState<MobileScreen>("root");
  const [dragRightMax, setDragRightMax] = React.useState(800);
  const directionRef = React.useRef<"forward" | "back">("forward");
  const panelBoundsRef = React.useRef<HTMLDivElement>(null);
  const [dragLayerRef, dragSnapAnimate] = useAnimate();

  React.useLayoutEffect(() => {
    const update = () => {
      const w = panelBoundsRef.current?.clientWidth ?? 0;
      setDragRightMax(w > 0 ? w : window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    const el = panelBoundsRef.current;
    const ro =
      el && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(update)
        : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [open]);

  const slideVariants = React.useMemo(
    () => ({
      enter: () => ({
        x: directionRef.current === "forward" ? "100%" : "-100%",
      }),
      center: { x: 0 },
      exit: () => ({
        x: directionRef.current === "forward" ? "-100%" : "100%",
      }),
    }),
    []
  );

  React.useEffect(() => {
    if (!open) {
      setScreen("root");
      directionRef.current = "forward";
    }
  }, [open]);

  const navigateTo = React.useCallback((s: MobileScreen) => {
    directionRef.current = "forward";
    setScreen(s);
  }, []);

  const navigateBack = React.useCallback(() => {
    directionRef.current = "back";
    setScreen("root");
  }, []);

  const nav = React.useMemo<MobileNav>(
    () => ({
      go: navigateTo,
      back: navigateBack,
      close: onRequestClose,
    }),
    [navigateTo, navigateBack, onRequestClose]
  );

  const onSignOut = React.useCallback(() => {
    toast(SIGN_OUT_TOAST, {
      duration: 2500,
      className:
        "!bg-[#1E1A22] !border !border-[#2C2532] !text-[#E0E0E0] !rounded-xl !text-sm !shadow-lg",
    });
  }, []);

  return (
    <div
      ref={panelBoundsRef}
      className="flex min-h-0 flex-1 flex-col overflow-hidden [font-family:var(--font-inter),sans-serif]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          ref={dragLayerRef}
          key={screen}
          className="flex min-h-0 flex-1 flex-col"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 450, damping: 45 }}
          {...(screen !== "root"
            ? {
                drag: "x" as const,
                dragDirectionLock: true,
                dragConstraints: { left: 0, right: dragRightMax },
                dragElastic: 0,
                dragMomentum: false,
                onDragEnd: (
                  _e: MouseEvent | TouchEvent | PointerEvent,
                  info: PanInfo
                ) => {
                  const panelW =
                    panelBoundsRef.current?.clientWidth ?? dragRightMax;
                  const distOk =
                    info.offset.x > panelW * SWIPE_BACK_DISTANCE_RATIO;
                  const velOk = info.velocity.x > SWIPE_BACK_MIN_VELOCITY_X;
                  if (distOk || velOk) {
                    navigateBack();
                    return;
                  }
                  const el = dragLayerRef.current;
                  if (el) {
                    void dragSnapAnimate(
                      el,
                      { x: 0 },
                      { type: "spring", stiffness: 600, damping: 57 }
                    );
                  }
                },
              }
            : {})}
        >
      {screen === "root" ? (
        <>
          <MobileAccountHeader variant="root" onClose={nav.close} />
          <ScrollArea hideScrollbar className="min-h-0 flex-1">
            <div className="flex flex-col gap-3 pb-4 pt-3">
              <MobileUserCard nav={nav} />
              <MobileVerificationBanner nav={nav} />
              <MobileLoyaltyCard />
              <MobileTileSection title="Wallet">
                <MobileActionTile
                  icon={ArrowUpToLine}
                  label="Deposit"
                  onClick={() => nav.go("deposit")}
                />
                <MobileActionTile
                  icon={ArrowDownToLine}
                  label="Withdraw"
                  onClick={() => nav.go("withdraw")}
                />
                <MobileActionTile
                  icon={History}
                  label="History"
                  onClick={() => nav.go("history")}
                />
              </MobileTileSection>
              <MobileTileSection title="Account">
                <MobileActionTile
                  icon={ShieldCheck}
                  label="Security"
                  onClick={() => nav.go("security")}
                />
                <MobileActionTile
                  icon={Settings}
                  label="Preferences"
                  onClick={() => nav.go("preferences")}
                />
                <MobileActionTile
                  icon={BadgeCheck}
                  label="Verification"
                  onClick={() => nav.go("verification")}
                />
                <MobileActionTile
                  icon={MessageSquare}
                  label="Live support"
                  onClick={() => nav.go("live-support")}
                />
                <MobileActionTile
                  icon={Mail}
                  label="Inbox"
                  onClick={() => nav.go("inbox")}
                />
                <MobileActionTile
                  icon={Ticket}
                  label="Promo code"
                  onClick={() => nav.go("promo-code")}
                />
              </MobileTileSection>
            </div>
          </ScrollArea>
          <MobileStickyFooter onSignOut={onSignOut} />
        </>
      ) : screen === "security" ? (
        <>
          <MobileAccountHeader
            variant="sub"
            title="Security"
            onBack={nav.back}
            onClose={nav.close}
          />
          <MobileSecurityScreen />
        </>
      ) : screen === "preferences" ? (
        <>
          <MobileAccountHeader
            variant="sub"
            title="Preferences"
            onBack={nav.back}
            onClose={nav.close}
          />
          <MobilePreferencesScreen />
        </>
      ) : screen === "verification" ? (
        <>
          <MobileAccountHeader
            variant="verification"
            title="Verification"
            onBack={nav.back}
            onClose={nav.close}
          />
          <MobileVerificationScreen />
        </>
      ) : screen === "my-profile" ? (
        <>
          <MobileAccountHeader
            variant="sub"
            title="My profile"
            onBack={nav.back}
            onClose={nav.close}
          />
          <MobileMyProfileScreen />
        </>
      ) : screen === "inbox" ? (
        <>
          <MobileAccountHeader
            variant="sub"
            title="Inbox"
            onBack={nav.back}
            onClose={nav.close}
          />
          <MobileInboxScreen />
        </>
      ) : (
        <>
          <MobileAccountHeader
            variant="sub"
            title={
              screen === "deposit"
                ? "Deposit"
                : screen === "withdraw"
                  ? "Withdraw"
                  : screen === "history"
                    ? "History"
                    : screen === "live-support"
                      ? "Live support"
                      : "Promo code"
            }
            onBack={nav.back}
            onClose={nav.close}
          />
          <MobilePlaceholderScreen screen={screen} />
        </>
      )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
