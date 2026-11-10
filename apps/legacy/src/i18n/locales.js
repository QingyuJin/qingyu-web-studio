// Small shared locale metadata; translation dictionaries load with legacy pages only.
export const localeOptions = [
  { code: "zh-Hant", short: "中", label: "中文" },
  { code: "en", short: "EN", label: "English" },
  { code: "ja", short: "日", label: "日本語" },
  { code: "ko", short: "한", label: "한국어" },
]

export const localeTags = { "zh-Hant": "zh-Hant-TW", en: "en", ja: "ja", ko: "ko" }
export const brandNames = {
  "zh-Hant": "晴宇",
  en: "Qingyu Web Studio",
  ja: "Qingyu Web Studio",
  ko: "Qingyu Web Studio",
}
export function localizedBrandName(locale) {
  return brandNames[locale] ?? brandNames["zh-Hant"]
}
export function localizeBrandText(value, locale) {
  return String(value).replace(
    /Qingyu Web Studio|晴宇網路工作室|青雨網路工作室|青雨网络工作室/g,
    localizedBrandName(locale)
  )
}
