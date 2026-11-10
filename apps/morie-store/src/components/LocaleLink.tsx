"use client";
import NextLink from "next/link";
import { useSyncExternalStore, type ComponentProps } from "react";
import { readLocale, subscribeLocale } from "../../../showcase-i18n/core";

export default function LocaleLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "zh-Hant" as const);
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
    const url = new URL(href, "https://www.qingyuweb.com");
    url.searchParams.set("lang", locale);
    href = `${url.pathname}${url.search}${url.hash}`;
  }
  return <NextLink {...props} href={href} />;
}
