(() => {
  const script = document.currentScript
  const slug = script?.dataset.demo || "demo"
  const demos = {
    "ai-tech": ["AI Technology Quest", "/works/ai-tech-quest", "ai-tech-quest", "business-system"],
    morie: ["MORIÉ Commerce Experience", "/works/ecommerce-platform-redesign", "morie", "website"],
    "commercial-visual": ["Commercial Visual Portfolio", "/works", "commercial-visual", "website"],
  }
  const demo = demos[slug]
  if (!demo || document.querySelector(".qy-demo-bar")) return

  const stylesheet = document.createElement("link")
  stylesheet.rel = "stylesheet"
  stylesheet.href = "/demo/demo-shell.css"
  document.head.appendChild(stylesheet)

  const bar = document.createElement("header")
  bar.className = "qy-demo-bar"
  bar.innerHTML = `
    <a class="qy-demo-brand" href="/">← Qingyu Web</a>
    <span class="qy-demo-title">${demo[0]}</span>
    <a class="qy-demo-case" href="${demo[1]}">查看案例</a>
    <a class="qy-demo-contact" href="/contact?case=${encodeURIComponent(demo[2])}&type=${encodeURIComponent(demo[3])}">洽談類似專案</a>
  `
  document.body.prepend(bar)

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "demo_open", demo_slug: slug, demo_path: window.location.pathname })

  bar.addEventListener("click", (event) => {
    const link = event.target.closest("a")
    if (!link) return
    window.dataLayer.push({ event: "demo_navigation", demo_slug: slug, destination: link.getAttribute("href") })
  })
})()
