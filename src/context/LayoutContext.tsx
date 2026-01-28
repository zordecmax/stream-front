"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LayoutContextType = {
  leftSidebarCollapsed: boolean;
  rightSidebarEnabled: boolean;
  rightSidebarCollapsed: boolean;
  setRightSidebarEnabled: (enabled: boolean) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [leftSidebarCollapsed, setLeftCollapsed] = useState(false);
  const [rightSidebarEnabled, setRightSidebarEnabled] = useState(false);
  const [rightSidebarCollapsed, setRightCollapsed] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        leftSidebarCollapsed,
        rightSidebarEnabled,
        rightSidebarCollapsed,
        setRightSidebarEnabled,
        toggleLeftSidebar: () => setLeftCollapsed(v => !v),
        toggleRightSidebar: () => setRightCollapsed(v => !v),
      }}
    >
      <div
        style={{
          "--sidebar-width-left": leftSidebarCollapsed ? "68px" : "300px",
          "--sidebar-width-right": rightSidebarEnabled && !rightSidebarCollapsed ? "300px" : "0px",
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
