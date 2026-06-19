function LineBotToast({ message }) {
  if (!message) return null

  return (
    <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl border border-emerald-200 bg-emerald-950 px-4 py-3 text-sm font-black text-white shadow-xl sm:w-auto">
      {message}
    </div>
  )
}

export default LineBotToast
