"use client";

import * as React from "react";

/**
 * Subscribes to `window.matchMedia`. Defaults to `false` until mounted to avoid
 * SSR/client mismatch; updates on resize.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
