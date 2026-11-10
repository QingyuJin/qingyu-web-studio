import { Link } from "react-router-dom"
import { estimateCopy } from "./estimatePolicy"

export default function ServicePackageCards({ locale }) {
  const copy = estimateCopy[locale] ?? estimateCopy["zh-Hant"]
  const targets = ["website-updates", "one-page", "line-automation"]
  return <div className="qy-package-grid">
    {copy.plans.slice(0, 3).map((plan, i) => <article className="qy-package-card" key={plan.name}>
      <p className="qy-kicker" aria-hidden="true">0{i + 1}</p>
      <div className={`qy-package-art qy-package-art-${i}`} aria-hidden="true">
        <svg viewBox="0 0 160 64" fill="none" stroke="currentColor" strokeWidth="1.6">
          {i === 0 ? <><rect x="24" y="8" width="32" height="48" rx="6" /><path d="M35 48h10M72 32l8-8 8 8-8 8-8-8" /><rect x="104" y="8" width="32" height="48" rx="6" /><path d="m113 31 5 5 10-11" /></> : i === 1 ? <><rect x="32" y="7" width="96" height="50" rx="5" /><path d="M44 20h40M44 31h72M44 40h53" /><path strokeWidth="5" d="M44 20h40" /></> : <><rect x="8" y="16" width="32" height="32" rx="6" /><path d="M19 26h10v12H19zM47 32h15m-5-5 5 5-5 5" /><rect x="68" y="16" width="32" height="32" rx="6" /><path d="M76 27h16v10H76zm0 0 8 6 8-6M107 32h15m-5-5 5 5-5 5" /><rect x="128" y="16" width="24" height="32" rx="6" /><path d="m134 32 4 4 8-9" /></>}
        </svg>
      </div>
      <h3>{plan.name}</h3><p>{plan.fit}</p>
      <div className="qy-package-bottom"><span>{plan.price}</span><Link className="qy-text-link" to={`/services#${targets[i]}`}>{locale === "zh-Hant" ? "了解服務" : locale === "ja" ? "詳しく見る" : locale === "ko" ? "자세히 보기" : "Explore service"} ↗</Link></div>
    </article>)}
  </div>
}
