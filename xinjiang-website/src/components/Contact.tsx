import { useState } from "react"
import { contactInfo } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

export function Contact() {
  const [copied, setCopied] = useState("")

  async function copyText(label: string, value: string) {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    window.setTimeout(() => setCopied(""), 1400)
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-8 rounded-[2rem] bg-[#2b2118] p-6 text-white shadow-[0_30px_90px_rgba(58,45,31,0.18)] md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle eyebrow="Contact" title="聯絡鑫匠" text="可先傳地點、照片、想處理的工程項目，我們再討論是否到場評估。" />
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => copyText("LINE ID", contactInfo.lineId)} className="min-h-12 rounded-full bg-[#e8bd6d] px-6 text-sm font-black text-[#2b2118]">
              複製 LINE ID
            </button>
            <a href={`mailto:${contactInfo.email}`} className="inline-flex min-h-12 items-center rounded-full border border-white/16 px-6 text-sm font-black text-white">
              Email 詢問
            </a>
          </div>
          {copied ? <p className="mt-4 text-sm font-black text-[#e8bd6d]">已複製 {copied}</p> : null}
        </div>
        <div className="grid gap-3">
          <InfoRow label="LINE ID" value={contactInfo.lineId} />
          <InfoRow label="Email" value={contactInfo.email} />
          <InfoRow label="服務地區" value={contactInfo.area} />
          <button type="button" onClick={() => copyText("LINE ID", contactInfo.lineId)} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-[#2b2118]">
            傳 LINE 詢問工程
          </button>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/12 bg-white/[0.07] p-4">
      <p className="text-xs font-black tracking-[0.18em] text-[#e8bd6d]">{label}</p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  )
}
