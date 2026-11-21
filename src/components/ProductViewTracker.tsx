"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a single `product_view` event (only reaches GA if configured + consented). */
export function ProductViewTracker({ item, category }: { item: string; category: string }) {
  useEffect(() => {
    track({ name: "product_view", params: { item, category } });
  }, [item, category]);
  return null;
}
