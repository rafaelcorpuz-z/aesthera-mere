"use client";

import { createContext, useContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";

type MenuState = { treatmentsOpen: boolean; setTreatmentsOpen: Dispatch<SetStateAction<boolean>> };
const TreatmentsMenuContext = createContext<MenuState | null>(null);

export function TreatmentsMenuProvider({ children }: { children: ReactNode }) {
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  return <TreatmentsMenuContext.Provider value={{ treatmentsOpen, setTreatmentsOpen }}>{children}</TreatmentsMenuContext.Provider>;
}

export function useTreatmentsMenu() {
  const menu = useContext(TreatmentsMenuContext);
  if (!menu) throw new Error("Treatments menu must be inside TreatmentsMenuProvider.");
  return menu;
}
