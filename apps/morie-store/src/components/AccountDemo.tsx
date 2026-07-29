"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";

export function AccountDemo() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); setMessage(/^\S+@\S+\.\S+$/.test(email) ? "登入連結已模擬寄出，正式串接會員系統後即可啟用。" : "請輸入有效的電子郵件地址。"); }
  const success = message.startsWith("登入");
  return <div className="account-page"><div className="account-copy"><p className="eyebrow">MORIÉ ACCOUNT</p><h1>把你的日常配方，<br />安靜地收在一處。</h1><p>登入後可查看訂單、收藏配方與管理門市諮詢預約。本提案版本使用無密碼登入示意。</p></div><form onSubmit={submit} noValidate><p className="eyebrow">會員登入</p><h2>以電子郵件繼續</h2><label><span>電子郵件地址</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" /></label><button type="submit" className="button-solid">傳送登入連結</button>{message && <p className={`account-message ${success ? "success" : ""}`}>{success && <Check size={15} />}{message}</p>}<small>繼續即表示你同意 MORIÉ 的會員與隱私條款示範。</small></form></div>;
}
