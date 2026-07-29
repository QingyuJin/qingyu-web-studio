import type { Metadata } from "next";
import { AccountDemo } from "@/components/AccountDemo";

export const metadata: Metadata = { title: "我的帳戶", robots: { index: false, follow: false } };
export default function AccountPage() { return <AccountDemo />; }
