const punctuationPattern = /[，。！？、；：﹐﹑﹒·•‧・「」『』“”‘’（）〔〕【】［］｛｝《》〈〉—–…／/｜|→↗↘←↑↓＋+＝=※＊*#]/g
const asciiPunctuationPattern = /[,:;!?()[\]{}]/g

function looksTechnical(value) {
  const text = value.trim()
  return /^\S+@\S+\.\S+$/.test(text) || /^https?:\/\//i.test(text)
}

export function cleanDisplayText(value) {
  if (!value.trim() || looksTechnical(value)) return value

  const hasLeadingSpace = /^\s/.test(value)
  const hasTrailingSpace = /\s$/.test(value)
  let next = value
    .replace(punctuationPattern, " ")
    .replace(asciiPunctuationPattern, " ")
    .replace(/\.{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!next) return ""
  if (hasLeadingSpace) next = ` ${next}`
  if (hasTrailingSpace) next = `${next} `
  return next
}
