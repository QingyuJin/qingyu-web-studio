import { afterEach, describe, expect, it, vi } from "vitest"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import ts from "typescript"
import { locales, makeTranslator, readLocale, writeLocale } from "./core"
import { messages as morie } from "../morie-store/src/messages"
import { messages as visual } from "../commercial-visual-portfolio/src/messages"

const files = (root: string): string[] => readdirSync(root, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? files(join(root, entry.name)) : [join(root, entry.name)])

describe("showcase language coverage", () => {
  for (const [name, dictionary] of [["morie-store", morie], ["commercial-visual-portfolio", visual]] as const) {
    it(`${name} has complete translations and matching placeholders`, () => {
      for (const [key, entries] of Object.entries(dictionary)) {
        expect(entries, key).toHaveLength(4)
        for (const copy of entries) {
          expect(copy?.trim(), key).toBeTruthy()
          expect(copy.match(/\{\d+\}/g) ?? [], key).toEqual(key.match(/\{\d+\}/g) ?? [])
        }
        expect(entries[1], key).not.toMatch(/[\u3400-\u9fff\uac00-\ud7af]/)
        expect(entries[3], key).not.toMatch(/[\u3400-\u9fff]/)
      }
    })
    it(`${name} covers Chinese source copy including data and accessibility labels`, () => {
      const missing = new Set<string>()
      for (const path of files(`apps/${name}/src`).filter((p) => /\.tsx?$/.test(p) && !/messages|Messages|i18n/.test(p))) {
        const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true)
        const visit = (node: ts.Node) => {
          if (ts.isStringLiteral(node) && /[\u3400-\u9fff]/.test(node.text) && !/^(\/|https?:|mailto:)/.test(node.text) && node.text !== "登入" && !dictionary[node.text]) missing.add(node.text)
          ts.forEachChild(node, visit)
        }
        visit(source)
      }
      expect([...missing]).toEqual([])
    })
  }
  it("interpolates translated product names without changing cart identifiers", () => {
    const item = { slug: "botanical-cleansing-gel", name: "植萃潔顏露", price: 1180 }
    for (const locale of locales) {
      const t = makeTranslator(morie, locale)
      expect(t("查看{0}", [item.name])).toContain(t(item.name))
      expect(t(item.price)).toBe(1180)
    }
    expect(item).toEqual({ slug: "botanical-cleansing-gel", name: "植萃潔顏露", price: 1180 })
  })
})

describe("language persistence", () => {
  afterEach(() => vi.unstubAllGlobals())
  it("uses the explicit URL ahead of a previously saved language", () => {
    vi.stubGlobal("window", { location: { search: "?lang=ko" }, localStorage: { getItem: () => "en" } })
    expect(readLocale()).toBe("ko")
  })
  it("still works when browser storage is unavailable", () => {
    vi.stubGlobal("window", { location: { search: "" }, localStorage: { getItem: () => { throw new Error("disabled") } } })
    vi.stubGlobal("navigator", { language: "ja-JP" })
    expect(readLocale()).toBe("ja")
  })
  it("keeps the current page filter and anchor while switching language", () => {
    const replaceState = vi.fn()
    const dispatchEvent = vi.fn()
    vi.stubGlobal("window", {
      location: { href: "https://www.qingyuweb.com/demo/morie/products?category=body&lang=en#items" },
      localStorage: { setItem: () => { throw new Error("disabled") } },
      history: { state: { index: 2 }, replaceState },
      dispatchEvent,
    })
    writeLocale("zh-Hant")
    expect(String(replaceState.mock.calls[0][2])).toBe("https://www.qingyuweb.com/demo/morie/products?category=body&lang=zh-Hant#items")
    expect(replaceState.mock.calls[0][0]).toEqual({ index: 2 })
    expect(dispatchEvent).toHaveBeenCalledOnce()
  })
})
