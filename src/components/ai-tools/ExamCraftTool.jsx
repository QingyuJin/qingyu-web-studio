import { useMemo, useState } from "react"
import { formatQuestionForCopy, generateExamDraft } from "../../lib/ai-tools/examCraftParser"

function ExamCraftTool({ data }) {
  const [sourceText, setSourceText] = useState(data.demoText || "")
  const [fileName, setFileName] = useState("")
  const [draft, setDraft] = useState(() => generateExamDraft(data.demoText || ""))
  const [activeType, setActiveType] = useState("single")
  const [copyStatus, setCopyStatus] = useState("")

  const activeQuestion = useMemo(
    () => draft.questions.find((question) => question.id === activeType) || draft.questions[0],
    [activeType, draft.questions],
  )

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setCopyStatus("PDF Demo parser mode：目前先以貼上文字或範例內容產生題庫。")
  }

  function handleGenerate() {
    const nextDraft = generateExamDraft(sourceText)
    setDraft(nextDraft)
    setActiveType(nextDraft.questions[0].id)
    setCopyStatus("")
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(formatQuestionForCopy(activeQuestion))
      setCopyStatus("已複製題目草稿")
    } catch {
      setCopyStatus("瀏覽器未允許複製，請手動選取題目文字")
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black text-[#172026]">教材來源</p>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">Rule-based draft generator</span>
          </div>
          <label className="mt-4 block">
            <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={handleFileChange} />
            <span className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#172026] bg-white px-4 text-sm font-black text-[#172026] transition hover:bg-[#eef7f4]">
              上傳 PDF Demo
            </span>
          </label>
          {fileName ? <p className="mt-2 truncate text-xs font-black text-[#66716d]">已選擇：{fileName}</p> : null}
          <textarea
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
            rows={9}
            className="mt-4 w-full resize-none rounded-2xl border border-[#dedbd1] bg-[#fbfaf6] px-4 py-3 text-sm font-bold leading-7 text-[#172026] outline-none transition focus:border-[#0f766e]"
            placeholder="貼上教材文字，或直接使用智慧家庭 demo content..."
          />
          <button
            type="button"
            onClick={handleGenerate}
            className="mt-3 min-h-11 w-full rounded-xl bg-[#172026] px-4 text-sm font-black text-white transition hover:bg-[#27404a]"
          >
            產生題庫
          </button>
          <p className="mt-3 text-xs font-bold leading-5 text-[#66716d]">Demo 只在瀏覽器用規則產生草稿，不會上傳 PDF 或教材內容。</p>
        </div>

        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black text-[#172026]">Parsing status</p>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{draft.parsingStatus}</span>
          </div>
          <p className="mt-3 text-sm font-bold leading-6 text-[#5d6863]">{draft.mode}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {draft.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <p className="text-sm font-black text-[#172026]">重點摘要</p>
          <div className="mt-3 grid gap-2">
            {draft.highlights.map((item, index) => (
              <p key={`${item}-${index}`} className="rounded-xl bg-[#fbfaf6] px-3 py-2 text-sm font-bold leading-6 text-[#40514f]">
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {draft.questions.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => setActiveType(question.id)}
                className={`min-h-9 shrink-0 rounded-full px-4 text-xs font-black transition ${
                  activeType === question.id ? "bg-[#0f766e] text-white" : "bg-[#eef7f4] text-[#0f766e]"
                }`}
              >
                {question.label}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-[#f8f7f2] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">題庫草稿</p>
            <p className="mt-2 text-lg font-black leading-7 text-[#172026]">{activeQuestion.title}</p>
            <div className="mt-3 grid gap-2">
              {activeQuestion.options.map((option) => (
                <p key={option} className="rounded-xl bg-white px-3 py-2 text-sm font-bold leading-6 text-[#40514f]">
                  {option}
                </p>
              ))}
            </div>
            <p className="mt-3 text-sm font-black text-[#0f766e]">{activeQuestion.answer}</p>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-11 flex-1 rounded-xl border border-[#172026] bg-white px-4 text-sm font-black text-[#172026] transition hover:bg-[#eef7f4]"
            >
              複製題目
            </button>
            <span className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-amber-50 px-3 text-center text-xs font-black leading-5 text-amber-800">
              可人工修改後發布
            </span>
          </div>
          {copyStatus ? <p className="mt-3 text-xs font-black text-[#0f766e]">{copyStatus}</p> : null}
        </div>
      </div>
    </div>
  )
}

export default ExamCraftTool
