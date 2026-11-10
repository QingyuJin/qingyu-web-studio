import { workCatalog } from "./workCatalog.js"

export const collectionLabels = [
  { id: "all", label: "全部" },
  { id: "systems", label: "系統" },
  { id: "websites", label: "網站" },
  { id: "tools", label: "工具" },
]

export function normalizeCollection(value) {
  // Keep old client-case links useful without introducing another filter row
  if (value === "client") return "websites"
  return collectionLabels.some((item) => item.id === value) ? value : "all"
}

export function getCollectionWorks(collection, catalog = workCatalog) {
  return catalog.filter((item) => collection === "all" || item.collection === collection)
}

export function getFeaturedWorks(catalog = workCatalog, limit = 3) {
  return catalog
    .filter((item) => item.collection === "systems" && item.featured && item.preview)
    .slice(0, limit)
}

const representativeSlugs = ["xinjiang", "linebot", "floworder"]

const spotlightSlugs = {
  all: ["xinjiang", "morie", "floworder", "bookcrm", "docops", "commercial-visual"],
  systems: ["floworder", "bookcrm", "quoteflow", "fieldops", "docops", "watchtower"],
  websites: ["xinjiang", "morie", "luluface", "biomed-brand-site", "commerce-platform", "commercial-visual"],
  tools: ["commercial-visual", "ai-audit", "api-automation"],
}

export const workGroupIds = ["brand", "booking", "sales", "field-service", "knowledge", "automation", "growth"]

const groupRepresentatives = {
  brand: "xinjiang",
  booking: "bookcrm",
  sales: "quoteflow",
  "field-service": "fieldops",
  knowledge: "docops",
  automation: "watchtower",
  growth: "commercial-visual",
}

export function getRepresentativeWorks(catalog = workCatalog) {
  const bySlug = new Map(catalog.map((item) => [item.slug, item]))
  return representativeSlugs.map((slug) => bySlug.get(slug)).filter(Boolean)
}

export function getPortfolioSpotlights(collection = "all", catalog = workCatalog, limit = 6) {
  const available = getCollectionWorks(collection, catalog)
  const bySlug = new Map(available.map((item) => [item.slug, item]))
  const priority = spotlightSlugs[collection] ?? spotlightSlugs.all
  const selected = priority.map((slug) => bySlug.get(slug)).filter(Boolean)
  const selectedSlugs = new Set(selected.map((item) => item.slug))
  return [...selected, ...available.filter((item) => !selectedSlugs.has(item.slug) && item.image)].slice(0, limit)
}

export function getRemainingWorks(collection, catalog = workCatalog) {
  const representative = new Set(getRepresentativeWorks(catalog).map((item) => item.slug))
  return getCollectionWorks(collection, catalog).filter((item) => !representative.has(item.slug))
}

export function getWorkGroups(collection = "all", catalog = workCatalog) {
  const works = getCollectionWorks(collection, catalog)
  return workGroupIds
    .map((id) => {
      const lead = groupRepresentatives[id]
      const items = works
        .filter((item) => item.group === id)
        .toSorted((a, b) => Number(b.slug === lead) - Number(a.slug === lead))
      return { id, items }
    })
    .filter((group) => group.items.length)
}

export function getRelatedWorks(item, catalog = workCatalog, limit = 4) {
  if (!item?.group) return []
  return catalog.filter((candidate) => candidate.group === item.group && candidate.slug !== item.slug).slice(0, limit)
}

export function getOtherSystems(catalog = workCatalog) {
  const featuredSlugs = new Set(getFeaturedWorks(catalog).map((item) => item.slug))
  return getCollectionWorks("systems", catalog).filter((item) => !featuredSlugs.has(item.slug))
}

export function getWebsiteWorks(catalog = workCatalog) {
  return getCollectionWorks("websites", catalog).toSorted(
    (a, b) => Number(b.nature === "client") - Number(a.nature === "client"),
  )
}
