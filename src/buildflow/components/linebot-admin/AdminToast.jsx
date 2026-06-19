function AdminToast({ message }) {
  if (!message) return null

  return (
    <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-md rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-xl sm:w-auto">
      {message}
    </div>
  )
}

export default AdminToast
