import { directions } from "../data/systemData"
import type { DirectionId, PageData } from "../types"
import { SubpageBanner } from "./SubpageBanner"

interface QuickCompareProps {
  page: PageData
  activeDirection: DirectionId
  onSelect: (direction: DirectionId) => void
}

export function QuickCompare({
  page,
  activeDirection,
  onSelect,
}: QuickCompareProps) {
  const comparisonDirections = directions.filter(
    (direction) => direction.id !== "original",
  )

  return (
    <section className="quick-compare" aria-labelledby="compare-title">
      <div className="section-heading">
        <span>QUICK COMPARISON</span>
        <h2 id="compare-title">四款快速比較</h2>
        <p>同一頁、同一張實拍照片，只比較裁切的幅度與邊緣的力度。</p>
      </div>

      <div className="quick-compare__grid">
        {comparisonDirections.map((direction) => (
          <button
            key={direction.id}
            className={`quick-compare__item${
              activeDirection === direction.id ? " is-active" : ""
            }`}
            type="button"
            onClick={() => onSelect(direction.id)}
          >
            <div className="quick-compare__visual">
              <SubpageBanner direction={direction.id} page={page} compact />
            </div>
            <strong>{direction.label}</strong>
            <span>{direction.description}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
