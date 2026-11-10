"use client";
import { useCopy } from "@/i18n";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export function Newsletter({ inverse = false }: { inverse?: boolean }) {
  const t = useCopy();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("請輸入有效的電子郵件地址。");
      return;
    }
    setMessage("展示模式 不會送出或儲存資料");
  }

  return (
    <form onSubmit={submit} className={`newsletter ${inverse ? "newsletter-inverse" : ""}`} noValidate>
      <label htmlFor={`newsletter-email-${inverse}`} className="sr-only">{t("電子郵件")}</label>
      <input
        id={`newsletter-email-${inverse}`}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t("電子郵件地址")}
        aria-describedby={`newsletter-message-${inverse}`}
      />
      <button type="submit" aria-label={t("查看展示說明")}><ArrowRight size={19} /></button>
      <p id={`newsletter-message-${inverse}`} className="newsletter-message" aria-live="polite">{t(message)}</p>
    </form>
  );
}
