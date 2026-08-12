import { useLayoutEffect } from "react"

const protectedSelector = [
  "script",
  "style",
  "pre",
  "code",
  "kbd",
  "samp",
  "input",
  "textarea",
  "[contenteditable='true']",
  "[data-preserve-text]",
].join(",")

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

function cleanTextNode(node) {
  const parent = node.parentElement
  if (!parent || parent.closest(protectedSelector)) return
  if (parent.tagName === "OPTION" && !parent.hasAttribute("value")) {
    parent.setAttribute("value", (node.nodeValue || "").trim())
  }
  const next = cleanDisplayText(node.nodeValue || "")
  if (next !== node.nodeValue) node.nodeValue = next
}

function cleanVisibleAttributes(root) {
  const elements = []
  if (root instanceof Element && root.matches("[placeholder],[title]")) elements.push(root)
  if (root instanceof Element || root instanceof DocumentFragment) {
    elements.push(...root.querySelectorAll("[placeholder],[title]"))
  }

  elements.forEach((element) => {
    for (const attribute of ["placeholder", "title"]) {
      if (!element.hasAttribute(attribute)) continue
      const value = element.getAttribute(attribute) || ""
      const next = cleanDisplayText(value)
      if (next !== value) element.setAttribute(attribute, next)
    }
  })
}

function walkText(root) {
  if (root.nodeType === Node.TEXT_NODE) {
    cleanTextNode(root)
    return
  }
  if (!(root instanceof Element) && !(root instanceof DocumentFragment)) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  nodes.forEach(cleanTextNode)
}

function enhanceImages(root) {
  const images = []
  if (root instanceof HTMLImageElement) images.push(root)
  if (root instanceof Element || root instanceof DocumentFragment) {
    images.push(...root.querySelectorAll("img"))
  }

  images.forEach((image) => {
    const source = image.currentSrc || image.getAttribute("src") || ""
    if (!/\.(?:avif|webp|jpe?g|png)(?:\?|$)/i.test(source)) return
    if (/(?:logo|icon|favicon|avatar)/i.test(source)) return
    image.classList.add("qy-living-image")
    const imageContext = `${source} ${image.getAttribute("alt") || ""}`
    if (/(?:specialist|team|chef|portrait|人物|醫師|主廚|團隊|顧問)/i.test(imageContext)) {
      image.classList.add("qy-person-image")
    }
  })
}

function ExperiencePolish() {
  useLayoutEffect(() => {
    document.documentElement.classList.add("qingyu-refined")
    walkText(document.body)
    cleanVisibleAttributes(document.body)
    enhanceImages(document.body)

    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "characterData") {
          cleanTextNode(record.target)
          return
        }
        if (record.type === "attributes") {
          cleanVisibleAttributes(record.target)
          return
        }
        record.addedNodes.forEach((node) => {
          walkText(node)
          cleanVisibleAttributes(node)
          enhanceImages(node)
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title"],
    })

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("qingyu-refined")
    }
  }, [])

  return null
}

export default ExperiencePolish
