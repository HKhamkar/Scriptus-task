"use client";
import type { ReactNode } from "react";
import "./styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";
import { ReduxProvider } from "./components/ReduxProvider";
import { PusherProvider } from "@/contexts/pusherContext";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <ReduxProvider>
      <PusherProvider>
        <html lang="en">
          <body>
            <ThemeProvider theme={theme}>
              <main>{children}</main>
            </ThemeProvider>
          </body>
        </html>
      </PusherProvider>
    </ReduxProvider>
  );
}
