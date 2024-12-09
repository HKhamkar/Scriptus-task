"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ReactNode } from "react";

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
