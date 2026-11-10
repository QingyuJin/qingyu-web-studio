(() => {
  const slug = document.currentScript?.dataset.demo
  const demos = {
    "ai-tech": ["AI 客服技術實驗", "AI support lab", "AI顧客対応実験", "AI 고객 지원 실험", "ai-tech-quest", "business-system"],
    morie: ["MORIÉ 商店展示", "MORIÉ store", "MORIÉ ストア", "MORIÉ 스토어", "morie", "website"],
    "commercial-visual": ["商業視覺作品", "Commercial visuals", "商業ビジュアル", "상업 비주얼", "commercial-visual", "website"],
  }
  const demo = demos[slug]
  if (!demo || document.querySelector(".qy-demo-bar")) return
  const locales = ["zh-Hant", "en", "ja", "ko"]
  const labels = [
    ["← 晴宇", "查看案例", "洽談合作"],
    ["← Qingyu", "View case", "Get in touch"],
    ["← Qingyu", "事例を見る", "相談する"],
    ["← Qingyu", "사례 보기", "상담하기"],
  ]
  const stylesheet = document.createElement("link")
  stylesheet.rel = "stylesheet"
  stylesheet.href = "/demo/demo-shell.css"
  document.head.appendChild(stylesheet)
  const bar = document.createElement("header")
  bar.className = "qy-demo-bar"
  document.body.prepend(bar)
  function render() {
    const query = new URLSearchParams(window.location.search).get("lang")
    let saved
    try { saved = window.localStorage.getItem("qingyu-locale") } catch { /* Optional storage */ }
    const locale = locales.includes(query) ? query : locales.includes(saved) ? saved : "zh-Hant"
    const index = locales.indexOf(locale)
    const [back, caseLabel, contact] = labels[index]
    bar.innerHTML = `<a class="qy-demo-brand" href="/?lang=${locale}">${back}</a><span class="qy-demo-title">${demo[index]}</span><a class="qy-demo-case" href="/works/${demo[4]}?lang=${locale}">${caseLabel}</a><a class="qy-demo-contact" href="/contact?case=${slug}&type=${demo[5]}&lang=${locale}">${contact}</a>`
  }
  render()
  window.addEventListener("qingyu:locale", render)
  window.addEventListener("storage", render)
  window.addEventListener("popstate", render)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "demo_open", demo_slug: slug, demo_path: window.location.pathname })
  bar.addEventListener("click", (event) => {
    const link = event.target.closest("a")
    if (link) window.dataLayer.push({ event: "demo_navigation", demo_slug: slug, destination: link.getAttribute("href") })
  })
})()
