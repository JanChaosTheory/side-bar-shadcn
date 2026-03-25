"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function MobileTileSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-4", className)}>
      <h2 className="pt-5 text-base font-bold text-white">{title}</h2>
      <div className="mt-2 grid grid-cols-3 gap-2">{children}</div>
    </section>
  );
}
