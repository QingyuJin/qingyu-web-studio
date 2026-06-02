function Card({ children }) {
  return (
    <section className="buildflow-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md md:p-5">
      {children}
    </section>
  )
}

export default Card
