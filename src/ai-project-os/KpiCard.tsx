type KpiCardProps = {
  label: string
  value: string
  delta: string
  tone?: "dark" | "warm" | "light"
}

export default function KpiCard({ label, value, delta, tone = "light" }: KpiCardProps) {
  const className =
    tone === "dark"
      ? "border-[#2b1c16] bg-[#2b1c16] text-white"
      : tone === "warm"
        ? "border-[#efc7ad] bg-[#fff1e5] text-[#2b1c16]"
        : "border-[#eadbca] bg-[#fffaf2] text-[#2b1c16]"

  return (
    <article className={`rounded-[1.35rem] border p-4 shadow-sm ${className}`}>
      <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${tone === "dark" ? "text-[#f7c1a2]" : "text-[#8c6f60]"}`}>{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-black tracking-[-0.04em]">{value}</p>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${tone === "dark" ? "bg-white/10 text-white" : "bg-white text-[#b94722]"}`}>
          {delta}
        </span>
      </div>
    </article>
  )
}
