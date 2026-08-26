import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FlowOrder 操作中心",
  description: "FlowOrder 隔離體驗工作區",
  robots: { index: false, follow: false, nocache: true },
};

export default function FlowOrderAppLayout({ children }: { children: ReactNode }) {
  return children;
}

