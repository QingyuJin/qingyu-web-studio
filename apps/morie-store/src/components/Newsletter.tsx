"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter({ inverse = false }: { inverse?: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("請輸入有效的電子郵件地址。");
      return;
    }
    setMessage("謝謝你。我們會在下一封山林來信與你相見。");
    setEmail("");
  }

  const success = message.startsWith("謝謝");
  return (
    <form onSubmit={submit} className={`newsletter ${inverse ? "newsletter-inverse" : ""}`} noValidate>
      <label htmlFor={`newsletter-email-${inverse}`} className="sr-only">電子郵件</label>
      <input
        id={`newsletter-email-${inverse}`}
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="電子郵件地址"
        aria-describedby={`newsletter-message-${inverse}`}
      />
      <button type="submit" aria-label="訂閱電子報">{success ? <Check size={19} /> : <ArrowRight size={19} />}</button>
      <p id={`newsletter-message-${inverse}`} className="newsletter-message" aria-live="polite">{message}</p>
    </form>
  );
}
