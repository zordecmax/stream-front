"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const SIDEBAR_WIDTH = "300px";
const SIDEBAR_WIDTH_COLLAPSED = "var(--sidebar-collapsed-width)";
const MOBILE_BREAKPOINT = "(max-width: 1024px)"; // < lg

type LayoutContextType = {
  leftSidebarCollapsed: boolean;
  rightSidebarEnabled: boolean;
  rightSidebarCollapsed: boolean;
  isMobile: boolean;
  setRightSidebarEnabled: (enabled: boolean) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const [leftSidebarCollapsed, setLeftCollapsed] = useState(false);
  const [rightSidebarEnabled, setRightSidebarEnabled] = useState(false);
  const [rightSidebarCollapsed, setRightCollapsed] = useState(false);
  const [isMobileFirstLoad, setIsMobileFirstLoad] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // 🔄 LOAD SIDEBAR STATE FROM LOCALSTORAGE AFTER HYDRATION
  useEffect(() => {
    const savedLeftCollapsed = localStorage.getItem("leftSidebarCollapsed");
    const savedRightEnabled = localStorage.getItem("rightSidebarEnabled");
    const savedRightCollapsed = localStorage.getItem("rightSidebarCollapsed");

    if (savedLeftCollapsed) setLeftCollapsed(JSON.parse(savedLeftCollapsed));
    if (savedRightEnabled) setRightSidebarEnabled(JSON.parse(savedRightEnabled));
    if (savedRightCollapsed) setRightCollapsed(JSON.parse(savedRightCollapsed));

    setIsHydrated(true);
  }, []);

  // 💾 SAVE SIDEBAR STATE TO LOCALSTORAGE
  useEffect(() => {
    if (!isHydrated) return; // Only save after hydration

    localStorage.setItem("leftSidebarCollapsed", JSON.stringify(leftSidebarCollapsed));
    localStorage.setItem("rightSidebarEnabled", JSON.stringify(rightSidebarEnabled));
    localStorage.setItem("rightSidebarCollapsed", JSON.stringify(rightSidebarCollapsed));
  }, [leftSidebarCollapsed, rightSidebarEnabled, rightSidebarCollapsed, isHydrated]);

  // 🔥 AUTO-COLLAPSE ON SMALL SCREENS (only on first mobile detection)
  useEffect(() => {
    if (isMobile && isMobileFirstLoad) {
      setLeftCollapsed(true);
      setRightCollapsed(true);
      setIsMobileFirstLoad(false);
    }
  }, [isMobile, isMobileFirstLoad]);

  const leftWidth = leftSidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;
  const rightWidth = rightSidebarEnabled && !rightSidebarCollapsed && !isMobile ? SIDEBAR_WIDTH : "0px";

  return (
    <LayoutContext.Provider
      value={{
        leftSidebarCollapsed,
        rightSidebarEnabled,
        rightSidebarCollapsed,
        isMobile,
        setRightSidebarEnabled,
        toggleLeftSidebar: () => setLeftCollapsed((v: boolean) => !v),
        toggleRightSidebar: () => setRightCollapsed((v: boolean) => !v),
      }}
    >
      <div
        style={{
          "--sidebar-width-left": leftWidth,
          "--sidebar-width-right": rightWidth,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </LayoutContext.Provider>
  );
}

export const useLayout = () => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used inside LayoutProvider");
  return ctx;
};
