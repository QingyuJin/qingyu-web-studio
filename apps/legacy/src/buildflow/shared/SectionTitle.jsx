function SectionTitle({ title, desc }) {
  return (
    <div>
      <h2 className="text-xl font-black tracking-normal text-slate-950 md:text-2xl">{title}</h2>
      {desc && <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">{desc}</p>}
    </div>
  )
}

export default SectionTitle
