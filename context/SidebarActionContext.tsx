"use client";
import { createContext, useContext, useState } from "react";

type SidebarActionContextType = {
  refreshSidebar: () => void;
  setRefreshSidebar: (fn: () => void) => void;
};

const SidebarActionContext = createContext<SidebarActionContextType | null>(
  null
);

export const SidebarActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refreshSidebar, setRefreshSidebar] = useState<() => void>(
    () => () => {}
  );

  return (
    <SidebarActionContext.Provider
      value={{ refreshSidebar, setRefreshSidebar }}
    >
      {children}
    </SidebarActionContext.Provider>
  );
};

export const useSidebarAction = () => {
  const context = useContext(SidebarActionContext);
  if (!context)
    throw new Error(
      "useSidebarAction must be used inside SidebarActionProvider"
    );
  return context;
};
