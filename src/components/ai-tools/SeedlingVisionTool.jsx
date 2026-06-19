import { useEffect, useState } from "react"
import { classifySeedling } from "../../lib/ai-tools/seedlingVisionMock"

function SeedlingVisionTool({ data }) {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [result, setResult] = useState(() => classifySeedling(null))
  const [message, setMessage] = useState("尚未上傳圖片時，Demo 會使用內建 sample 進行分類。")

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleFileChange(event) {
    const nextFile = event.target.files?.[0]
    if (!nextFile) return

    if (!nextFile.type.startsWith("image/")) {
      setMessage("請選擇圖片檔案，例如 JPG、PNG 或 SVG。")
      return
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    try {
      setFile(nextFile)
      setPreviewUrl(URL.createObjectURL(nextFile))
      setMessage("圖片已載入，可開始分類。")
    } catch {
      setFile(null)
      setPreviewUrl("")
      setMessage("圖片預覽失敗，已切回內建 sample。")
    }
  }

  function handleClassify() {
    setResult(classifySeedling(file))
    setMessage(file ? "分類完成：結果由檔名、大小與修改時間產生穩定 mock output。" : "已使用內建 sample 產生分類結果。")
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black text-[#172026]">影像預覽</p>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">Client-side mock classifier</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#d8e6df] bg-[#eef7f4]">
            <img src={previewUrl || data.sampleImage} alt="Seedling preview" className="h-72 w-full object-cover" />
          </div>
          <label className="mt-4 block">
            <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
            <span className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#172026] bg-white px-4 text-sm font-black text-[#172026] transition hover:bg-[#eef7f4]">
              選擇本機圖片
            </span>
          </label>
          <button
            type="button"
            onClick={handleClassify}
            className="mt-3 min-h-11 w-full rounded-xl bg-[#172026] px-4 text-sm font-black text-white transition hover:bg-[#27404a]"
          >
            開始分類
          </button>
          <p className="mt-3 rounded-xl bg-[#fbfaf6] px-3 py-2 text-xs font-black leading-5 text-[#66716d]">{message}</p>
          <p className="mt-2 text-xs font-bold leading-5 text-[#66716d]">Demo 只讀取瀏覽器本機檔案預覽，不會上傳圖片。</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">Classification result</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-[#66716d]">分類</p>
              <p className="text-3xl font-black text-[#172026]">{result.predictedClass}</p>
            </div>
            <div className="rounded-2xl bg-[#eef7f4] px-5 py-3 text-center">
              <p className="text-3xl font-black text-[#0f766e]">{result.confidence}%</p>
              <p className="text-xs font-black uppercase text-[#66716d]">confidence</p>
            </div>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#dfe7e3]">
            <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${result.confidence}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <p className="text-sm font-black text-[#172026]">Top-3 classes</p>
          <div className="mt-3 grid gap-3">
            {result.top3.map((item) => (
              <div key={item.label} className="rounded-xl bg-[#fbfaf6] p-3">
                <div className="flex items-center justify-between gap-3 text-sm font-black text-[#40514f]">
                  <span className="min-w-0 truncate">{item.label}</span>
                  <span className="shrink-0">{item.score}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#dfe7e3]">
                  <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <p className="text-sm font-black text-[#172026]">建議流程</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.workflow.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full bg-[#eef7f4] py-1 pl-1 pr-3 text-xs font-black text-[#0f766e]">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[0.62rem]">{index + 1}</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeedlingVisionTool
