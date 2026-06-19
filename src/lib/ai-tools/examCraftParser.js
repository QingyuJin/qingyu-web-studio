const fallbackText =
  "智慧家庭利用物聯網技術，使家中設備能夠互聯互通。常見功能包含智能安防、智能燈光管理、健康管理與能源監測。智慧家庭在隱私與安全方面需要注意資料外洩、未授權存取與設備漏洞。"

function splitSentences(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/[。！？!?；;]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getSourceText(text) {
  const cleanText = text.trim()
  return cleanText.length >= 24 ? cleanText : fallbackText
}

function extractKeywords(text) {
  const candidates = ["智慧家庭", "物聯網", "IoT", "智能安防", "智能燈光", "健康管理", "能源監測", "隱私", "安全", "資料外洩", "設備漏洞"]
  const found = candidates.filter((word) => text.includes(word))
  return found.length ? found.slice(0, 6) : ["智慧家庭", "物聯網", "隱私", "安全"]
}

export function generateExamDraft(inputText) {
  const sourceText = getSourceText(inputText)
  const sentences = splitSentences(sourceText)
  const keywords = extractKeywords(sourceText)
  const isFallback = inputText.trim().length < 24

  return {
    mode: isFallback ? "Demo content fallback" : "Rule-based parser",
    parsingStatus: "解析完成",
    highlights: (sentences.length ? sentences : splitSentences(fallbackText)).slice(0, 3),
    keywords,
    questions: [
      {
        id: "single",
        label: "單選",
        title: "下列何者不屬於智慧家庭的功能？",
        options: ["A. 智能安防", "B. 智能燈光管理", "C. 自動駕駛", "D. 健康管理"],
        answer: "建議答案：C",
      },
      {
        id: "fill",
        label: "填充",
        title: "智慧家庭利用 ______ 技術，使家中設備能夠互聯互通。",
        options: ["可接受答案：物聯網 / IoT"],
        answer: "題目狀態：待人工確認",
      },
      {
        id: "short",
        label: "簡答",
        title: "智慧家庭在隱私與安全方面有哪些挑戰？請列舉兩點。",
        options: ["參考方向：資料外洩、未授權存取、設備漏洞。"],
        answer: "評分提示：需包含兩項風險與簡短說明",
      },
    ],
    reviewNote: "草稿題目建議由老師或助教確認題意、答案與難度後再發布。",
  }
}

export function formatQuestionForCopy(question) {
  return [question.title, ...question.options, question.answer].join("\n")
}
