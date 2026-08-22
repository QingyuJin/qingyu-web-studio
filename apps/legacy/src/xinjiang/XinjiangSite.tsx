import Seo from "../site/Seo"
import { About } from "./components/About"
import { Contact } from "./components/Contact"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Inquiry } from "./components/Inquiry"
import { Process } from "./components/Process"
import { Projects } from "./components/Projects"
import { Services } from "./components/Services"
import "./xinjiang.css"

const xinjiangSeo = {
  baseUrl: "https://xinjiang-website.vercel.app",
  path: "/",
  title: "鑫匠｜屏東泥作、水泥、磁磚、油漆裝修工程",
  description:
    "鑫匠工程提供屏東與南部地區泥作、水泥施工、磁磚安裝修補、洗石子、油漆、拆除、裝修與增建服務，40 年老師父經驗，到場評估後實在報價。",
  image: "https://www.qingyuweb.com/xinjiang/project-photos/335941_0.jpg",
  imageAlt: "鑫匠完工作品 透天厝立面整體翻新",
  imageWidth: 1280,
  imageHeight: 960,
  siteName: "鑫匠工程",
  robots: "noindex, follow, noarchive",
  themeColor: "#11100e",
  preserveText: true,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "鑫匠｜屏東泥作、水泥、磁磚、油漆裝修工程",
    description:
      "鑫匠工程提供屏東與南部地區泥作、水泥施工、磁磚安裝修補、洗石子、油漆、拆除、裝修與增建服務，40 年老師父經驗，到場評估後實在報價。",
    url: "https://xinjiang-website.vercel.app/",
    inLanguage: "zh-Hant-TW",
  },
}

export default function XinjiangSite() {
  return (
    <>
      <Seo page={xinjiangSeo} />
      <main
        className="xinjiang-site min-h-screen overflow-hidden bg-[#f7efe2] text-[#2b2118]"
        data-preserve-text
        data-skip-experience-polish
        data-skip-interaction-feedback
      >
        <Header />
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Inquiry />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
