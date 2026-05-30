import Card from "./Card"

function Metric({ label, value, danger = false }) {
  return (
    <Card>
      <p className="text-sm font-bold text-slate-600">{label}</p>
      <p
        className={`mt-3 text-2xl font-black ${
          danger ? "text-red-700" : "text-slate-950"
        }`}
      >
        {value}
      </p>
    </Card>
  )
}

export default Metric
