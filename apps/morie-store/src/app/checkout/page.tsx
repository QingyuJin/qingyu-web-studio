import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/CheckoutFlow";

export const metadata: Metadata = { title: "模擬結帳", robots: { index: false, follow: false } };
export default function CheckoutPage() { return <CheckoutFlow />; }
