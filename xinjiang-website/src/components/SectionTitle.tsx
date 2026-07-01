type SectionTitleProps = {
  eyebrow: string
  title: string
  text?: string
}

export function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#a05c2e]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-[#2b2118] md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-sm font-semibold leading-7 text-[#766858] md:text-base">{text}</p> : null}
    </div>
  )
}
