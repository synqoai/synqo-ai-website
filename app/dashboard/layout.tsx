"use client";

import type { CSSProperties, ReactNode } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.content}>
        <Topbar />

        <main style={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#050d17",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  main: {
    flex: 1,
    padding: 30,
    overflowY: "auto",
  },
};
