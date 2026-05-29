function Card({ children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </section>
  )
}

export default Card