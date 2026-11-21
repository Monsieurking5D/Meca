import type { ReactNode } from "react";
import { ShopShell } from "@/components/shop/ShopShell";

// Temporary: remove once T-008 wires StoreProviders + CartDrawer in AppProviders.
export default function SegmentLayout({ children }: { children: ReactNode }) {
  return <ShopShell>{children}</ShopShell>;
}
