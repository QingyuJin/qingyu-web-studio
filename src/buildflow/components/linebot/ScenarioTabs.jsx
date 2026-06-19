import { lineBotCategories } from "../../data/lineBotScenarios"

function ScenarioTabs({ scenarios, activeScenarioId, onSelectScenario }) {
  const categoriesWithScenarios = lineBotCategories
    .map((category) => ({
      ...category,
      scenarios: scenarios.filter((scenario) => scenario.category === category.id),
    }))
    .filter((category) => category.scenarios.length)

  return (
    <aside className="max-h-[420px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm xl:sticky xl:top-4 xl:max-h-[calc(100vh-7rem)]">
      <div className="mb-3">
        <p className="text-xs font-black uppercase tracking-normal text-slate-400">Scenarios</p>
        <h3 className="mt-1 text-lg font-black text-slate-950">工程 LINE 情境</h3>
      </div>

      <div className="grid gap-3">
        {!categoriesWithScenarios.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-500">
            目前沒有可顯示的 LINE 情境。
          </div>
        )}

        {categoriesWithScenarios.map((category) => (
          <div key={category.id}>
            <p className="mb-2 text-xs font-black text-slate-500">{category.label}</p>
            <div className="grid gap-2">
              {category.scenarios.map((scenario) => {
                const isActive = scenario.id === activeScenarioId
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => onSelectScenario(scenario.id)}
                    className={`rounded-xl border p-3 text-left transition ${
                      isActive
                        ? "border-slate-950 bg-slate-950 text-white shadow-md"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400"
                    }`}
                  >
                    <span className="block text-sm font-black">{scenario.title}</span>
                    <span
                      className={`mt-1 block text-xs leading-5 ${
                        isActive ? "text-slate-200" : "text-slate-500"
                      }`}
                    >
                      {scenario.summary}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default ScenarioTabs
