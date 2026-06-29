import type { ProjectCategory } from "./data"

type CategoryTabsProps = {
  categories: ProjectCategory[]
  active: ProjectCategory
  onChange: (category: ProjectCategory) => void
}

export default function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-full border border-[#eadbca] bg-[#fff8ee]/78 p-1">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-black transition ${
            active === category ? "bg-[#2b1c16] text-white shadow-sm" : "text-[#6f5143] hover:bg-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
