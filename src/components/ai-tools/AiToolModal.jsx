import { useEffect } from "react"

function AiToolModal({ title, open, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#10242a]/70 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-8">
      <button type="button" aria-label="關閉工具" className="fixed inset-0 h-full w-full cursor-default" onClick={onClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-[#f8f7f2] shadow-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-[#dedbd1] bg-white px-4 py-4 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e]">Client-only MVP</p>
            <h3 className="mt-1 text-xl font-black text-[#172026] sm:text-2xl">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dedbd1] bg-[#f8f7f2] text-lg font-black text-[#172026] transition hover:bg-[#eef7f4]"
            aria-label="關閉"
          >
            ×
          </button>
        </header>
        <div className="max-h-[calc(100vh-5.5rem)] overflow-y-auto p-3 sm:max-h-[calc(100vh-7rem)] sm:p-5">{children}</div>
      </section>
    </div>
  )
}

export default AiToolModal
