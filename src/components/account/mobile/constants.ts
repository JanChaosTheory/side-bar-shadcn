export const MOBILE_BG = "#0f0f13";
export const MOBILE_CARD = "#16161f";
export const MOBILE_BORDER = "#1e1e2a";
export const MOBILE_MUTED = "#8888aa";
export const MOBILE_PURPLE = "#a78bfa";
export const MOBILE_PURPLE_TEXT = "#c4b5fd";
export const MOBILE_AMBER = "#f59e0b";
export const MOBILE_LIME = "#c8f542";
export const ERROR_BG = "#E35F5D";
export const ERROR_TEXT = "#381A19";
/** Light blue–gray wash; dark purple initials per mobile spec */
export const MOBILE_AVATAR_GRADIENT =
  "linear-gradient(135deg, #a8c7fc, #8eb4e8)";
export const MOBILE_AVATAR_INITIALS = "#4c1d95";

export type MobileScreen =
  | "root"
  | "security"
  | "preferences"
  | "verification"
  | "my-profile"
  | "deposit"
  | "withdraw"
  | "history"
  | "inbox"
  | "promo-code"
  | "live-support";

export type MobileNav = {
  go: (screen: MobileScreen) => void;
  back: () => void;
  close: () => void;
};
