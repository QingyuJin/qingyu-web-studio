import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"
import { cleanDisplayText } from "./experienceText"
import { useLocale } from "./i18n/LocaleContext"
import { translateDisplayText } from "./i18n/translations"

const protectedSelector = [
  "script",
  "style",
  "pre",
  "code",
  "kbd",
  "samp",
  "input",
  "textarea",
  "svg",
  "[contenteditable='true']",
  "[data-preserve-text]",
  "[data-i18n-control]",
].join(",")

const textSources = new WeakMap()
const textRenderedValues = new WeakMap()
const attributeSources = new WeakMap()
const attributeRenderedValues = new WeakMap()

function renderTextNode(node, locale) {
  const parent = node.parentElement
  if (!parent || parent.closest(protectedSelector)) return
  const current = node.nodeValue || ""
  const previousRendered = textRenderedValues.get(node)

  if (!textSources.has(node) || (previousRendered !== undefined && current !== previousRendered)) {
    textSources.set(node, cleanDisplayText(current))
  }

  if (parent.tagName === "OPTION" && !parent.hasAttribute("value")) {
    parent.setAttribute("value", (textSources.get(node) || "").trim())
  }

  const next = translateDisplayText(textSources.get(node) || "", locale, { preserveUnknown: Boolean(parent.closest(".demo-experience")) })
  textRenderedValues.set(node, next)
  if (next !== current) node.nodeValue = next
}

function renderAttributes(root, locale) {
  const elements = []
  if (root instanceof Element && root.matches("[placeholder],[title],[aria-label],[alt],meta[content]")) elements.push(root)
  if (root instanceof Element || root instanceof DocumentFragment) {
    elements.push(...root.querySelectorAll("[placeholder],[title],[aria-label],[alt],meta[content]"))
  }

  elements.forEach((element) => {
    if (element.closest("[data-i18n-control]")) return
    const names = ["placeholder", "title", "aria-label", "alt"]
    if (element.matches('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[property="og:image:alt"],meta[name="twitter:title"],meta[name="twitter:description"]')) names.push("content")

    for (const attribute of names) {
      if (!element.hasAttribute(attribute)) continue
      const current = element.getAttribute(attribute) || ""
      const sourceMap = attributeSources.get(element) || {}
      const renderedMap = attributeRenderedValues.get(element) || {}
      if (!(attribute in sourceMap) || (attribute in renderedMap && current !== renderedMap[attribute])) {
        sourceMap[attribute] = cleanDisplayText(current)
        attributeSources.set(element, sourceMap)
      }
      const next = translateDisplayText(sourceMap[attribute], locale, { preserveUnknown: Boolean(element.closest(".demo-experience")) })
      renderedMap[attribute] = next
      attributeRenderedValues.set(element, renderedMap)
      if (next !== current) element.setAttribute(attribute, next)
    }
  })
}

function walkText(root, locale) {
  if (root.nodeType === Node.TEXT_NODE) {
    renderTextNode(root, locale)
    return
  }
  if (!(root instanceof Element) && !(root instanceof DocumentFragment)) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  nodes.forEach((node) => renderTextNode(node, locale))
}

function enhanceImages(root) {
  const images = []
  if (root instanceof HTMLImageElement) images.push(root)
  if (root instanceof Element || root instanceof DocumentFragment) {
    images.push(...root.querySelectorAll("img"))
  }

  images.forEach((image) => {
    if (image.closest("[data-skip-experience-polish]")) return
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
  const { locale } = useLocale()
  const location = useLocation()

  useLayoutEffect(() => {
    if (location.pathname === "/works/xinjiang") return undefined
    document.documentElement.classList.add("qingyu-refined")
    walkText(document.documentElement, locale)
    renderAttributes(document.documentElement, locale)
    enhanceImages(document.body)

    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "characterData") {
          renderTextNode(record.target, locale)
          return
        }
        if (record.type === "attributes") {
          renderAttributes(record.target, locale)
          return
        }
        record.addedNodes.forEach((node) => {
          walkText(node, locale)
          renderAttributes(node, locale)
          enhanceImages(node)
        })
      })
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label", "alt", "content"],
    })

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("qingyu-refined")
    }
  }, [locale, location.pathname])

  return null
}

export default ExperiencePolish
