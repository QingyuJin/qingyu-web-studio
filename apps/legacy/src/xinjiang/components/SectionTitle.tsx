type SectionTitleProps = {
  eyebrow: string
  title: string
  text?: string
  light?: boolean
}

export function SectionTitle({ eyebrow, title, text, light = false }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-black uppercase tracking-[0.24em] ${light ? "text-[#d7b45c]" : "text-[#a05c2e]"}`}>{eyebrow}</p>
      <h2
        className={`font-kai mt-3 text-4xl font-bold leading-tight tracking-[0.04em] md:text-6xl ${
          light ? "text-white" : "text-[#2b2118]"
        }`}
      >
        {title}
      </h2>
      <div className={`ink-stroke mt-4 w-36 ${light ? "ink-stroke--gold opacity-60" : "opacity-30"}`} aria-hidden="true" />
      {text ? (
        <p className={`mt-4 text-sm font-semibold leading-7 md:text-base ${light ? "text-white/62" : "text-[#766858]"}`}>{text}</p>
      ) : null}
    </div>
  )
}
