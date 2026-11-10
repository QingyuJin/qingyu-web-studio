import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const copy = {
  "zh-Hant": { label: "找不到頁面", title: "這一頁不存在", body: "網址可能已更新 你可以返回作品或首頁", works: "查看作品", home: "返回首頁" },
  en: { label: "Page Not Found", title: "This Page Does Not Exist", body: "The address may have changed You can return to work or home", works: "View Work", home: "Back Home" },
  ja: { label: "ページが見つかりません", title: "このページは存在しません", body: "URLが変更された可能性があります 制作実績またはホームへお戻りください", works: "制作実績を見る", home: "ホームへ" },
  ko: { label: "페이지를 찾을 수 없음", title: "이 페이지는 존재하지 않습니다", body: "주소가 변경되었을 수 있습니다 포트폴리오나 홈으로 이동해 주세요", works: "포트폴리오 보기", home: "홈으로" },
}

export default function NotFoundPage() {
  const { locale } = useLocale()
  const text = copy[locale] ?? copy["zh-Hant"]
  return <SiteLayout>
    <Seo page={{ path: "/404", title: `${text.label} Qingyu Web`, description: text.body, robots: "noindex, nofollow, noarchive", localizedCopy: true }} />
    <main className="grid min-h-[72svh] place-items-center bg-[#f4f1ea] px-5 py-20 text-[#17211f]" data-preserve-text>
      <section className="w-full max-w-2xl border border-[#17211f]/10 bg-white p-7 sm:p-11">
        <p className="text-[10px] font-bold tracking-[.16em] text-[#4c776e]">404 {text.label}</p>
        <h1 className="mt-5 text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-[-.045em]">{text.title}</h1>
        <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-[#61706b]">{text.body}</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link className="inline-flex min-h-11 items-center rounded-full bg-[#173c37] px-5 text-xs font-bold text-white" to="/works">{text.works}</Link><Link className="inline-flex min-h-11 items-center rounded-full border border-[#bcc5c0] px-5 text-xs font-bold" to="/">{text.home}</Link></div>
      </section>
    </main>
  </SiteLayout>
}
