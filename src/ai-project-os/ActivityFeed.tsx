type ActivityFeedProps = {
  items: string[][]
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <section className="rounded-[1.5rem] border border-[#eadbca] bg-[#fffaf2] p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#b94722]">Activity</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#2b1c16]">Today’s build log</h2>
        </div>
        <span className="rounded-full bg-[#fff1e5] px-3 py-1 text-xs font-black text-[#b94722]">Live</span>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map(([time, text]) => (
          <div key={`${time}-${text}`} className="flex gap-3 rounded-2xl bg-white px-4 py-3">
            <span className="w-12 shrink-0 text-xs font-black text-[#b94722]">{time}</span>
            <p className="text-sm font-bold text-[#6f5143]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
