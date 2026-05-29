function SectionTitle({ title, desc }) {
  return (
    <div>
      <h2 className="text-3xl font-black tracking-[-0.04em]">{title}</h2>
      {desc && <p className="mt-2 leading-7 text-slate-600">{desc}</p>}
    </div>
  )
}

export default SectionTitle