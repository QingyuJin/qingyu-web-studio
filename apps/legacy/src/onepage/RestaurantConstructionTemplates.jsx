import Seo from "../site/Seo"
import "./onepage.css"
import {
  LeadForm,
  LightboxImage,
  MobileContactBar,
  TemplateFooter,
  TemplateHeader,
} from "./OnePageShared"
import { createTemplateSeo, getOnepageTemplate, onepageContact } from "./onepageData"
import useResetScroll from "./useResetScroll"

const restaurant = getOnepageTemplate("restaurant")
const construction = getOnepageTemplate("construction")

export function RestaurantTemplate() {
  useResetScroll()
  const [hero, chef, signature, seasonal, interior, ingredients] = restaurant.images

  return (
    <main className="op-template restaurant-page" id="top">
      <Seo page={createTemplateSeo(restaurant)} />
      <TemplateHeader
        template={restaurant}
        navItems={[["主廚", "#chef"], ["料理", "#dishes"], ["空間", "#space"], ["訂位", "#reservation"]]}
        ctaLabel="門市訂位"
        ctaHref="#reservation"
        dark
      />

      <section className="restaurant-hero">
        <img src={hero} alt="主廚在炭黑廚房中完成招牌料理" width="1680" height="945" fetchPriority="high" />
        <div className="restaurant-hero-overlay" />
        <div className="restaurant-hero-copy"><p>FIRE · SEASON · CRAFT</p><h1>一席之間<br /><em>嚐見火候與季節</em></h1><span>以直火、熟成與當令食材留下每個季節獨有的香氣</span><a href="#reservation">預約今晚席次 <b>↗</b></a></div>
        <div className="restaurant-hero-meta"><span>CHEF&apos;S TABLE</span><span>DINNER · BY RESERVATION</span></div>
      </section>

      <section className="restaurant-chef" id="chef">
        <div className="restaurant-chef-index">02</div>
        <div className="restaurant-chef-copy"><p>THE CHEF</p><h2>不是堆疊技巧<br />而是讓食材被記住</h2><p>從產地、熟成到火候每一道菜只留下必要的元素菜單跟著季節微調讓熟悉的味道有新的層次</p><blockquote>「料理的完成不在廚房最後一秒而在食材被選中的那一天」</blockquote></div>
        <LightboxImage src={chef} alt="主廚於開放式廚房專注料理的工作畫面" className="restaurant-chef-image" />
      </section>

      <section className="restaurant-signature" id="dishes">
        <div className="restaurant-signature-title"><span>03 · SIGNATURE</span><h2>炙燒鴨胸<br />梅果 · 發酵蒜 · 根莖</h2><p>以直火收緊表面香氣搭配酸甜果韻與溫潤根莖餐點名稱與描述為版型示意</p></div>
        <LightboxImage src={signature} alt="深色器皿中的精品餐飲招牌餐點" className="restaurant-signature-image" />
        <div className="restaurant-dish-notes"><span>TASTING NOTE</span><dl><div><dt>AROMA</dt><dd>炭火、熟果</dd></div><div><dt>TEXTURE</dt><dd>柔嫩、酥脆</dd></div><div><dt>PAIRING</dt><dd>焙茶、紅酒</dd></div></dl></div>
      </section>

      <section className="restaurant-seasonal">
        <img src={seasonal} alt="以當令食材呈現的季節限定料理" width="1680" height="945" loading="lazy" />
        <div><span>04 · SEASONAL MENU</span><h2>季節短箋</h2><p>晚夏的酸香、初秋的炭火每季保留一道只在當下出現的料理讓菜單回應產地與氣候</p><ol><li><b>前菜</b><span>炙燒旬魚 · 紫蘇 · 柑橘</span></li><li><b>主菜</b><span>炭烤時蔬 · 麥味噌 · 堅果</span></li><li><b>甜點</b><span>焙茶 · 無花果 · 米香</span></li></ol><a href="#reservation">詢問當季菜單 →</a></div>
      </section>

      <section className="restaurant-ingredients">
        <div className="restaurant-ingredients-copy"><span>05 · PRODUCERS</span><h2>尊重食材<br />也尊重等待的時間</h2><p>採購資訊、合作產地與食材來源在正式網站應以真實資料呈現；範本只示意如何建立餐飲信任</p><div><article><b>當令採購</b><p>依風味與供應狀態調整菜單</p></article><article><b>完整利用</b><p>用不同技法減少食材浪費</p></article><article><b>溯源說明</b><p>清楚標示重要食材與過敏原</p></article></div></div>
        <LightboxImage src={ingredients} alt="廚房職人整理新鮮當令食材" className="restaurant-ingredients-image" />
      </section>

      <section className="restaurant-space" id="space">
        <LightboxImage src={interior} alt="深炭黑與暖琥珀燈光的精品餐廳空間" className="restaurant-space-image" />
        <div className="restaurant-space-copy"><span>06 · THE ROOM</span><h2>留一點暗<br />讓香氣與對話更靠近</h2><p>低彩度材質、集中桌面光與保有距離的席次安排讓用餐節奏自然慢下來</p><dl><div><dt>席次</dt><dd>正式交付時填入</dd></div><div><dt>用餐時間</dt><dd>依門市規則填入</dd></div><div><dt>特殊需求</dt><dd>訂位時事先告知</dd></div></dl></div>
      </section>

      <section className="restaurant-voices">
        <div className="restaurant-voices-title"><span>07 · GUEST NOTES</span><h2>一頓飯留下的<br />不只是味道</h2><p>以下為顧客感受版位示意正式網站應更換為取得授權的真實評論</p></div>
        <div className="restaurant-voice-grid"><blockquote><b>01</b><p>「每道菜的節奏很完整服務說明剛好不會打斷桌上的對話」</p><cite>評論版位示意</cite></blockquote><blockquote><b>02</b><p>「空間很安靜料理的炭香與季節感讓人記得很久」</p><cite>評論版位示意</cite></blockquote></div>
      </section>

      <section className="restaurant-reservation" id="reservation">
        <div className="restaurant-reservation-intro"><span>08 · RESERVATION</span><h2>今晚<br />把時間留給一頓好飯</h2><p>這是餐廳訂位版型示意表單實際送至 Qingyu Web Studio用於洽詢網站製作並非餐廳訂位</p><div><a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE</a><a href={`mailto:${onepageContact.email}`}>EMAIL</a></div></div>
        <LeadForm source="onepage-restaurant" title="訂位流程體驗" description="留下餐飲品牌與網站需求由 Qingyu Web Studio 回覆" services={["餐廳一頁式網站", "私廚／餐酒館網站", "菜單與訂位動線", "其他餐飲網站需求"]} submitLabel="送出網站諮詢" compact />
      </section>

      <TemplateFooter template={restaurant} dark />
      <MobileContactBar primaryLabel="訂位體驗" primaryHref="#reservation" />
    </main>
  )
}

export function ConstructionTemplate() {
  useResetScroll()
  const [hero, planning, site, craft, caseImage, extension] = construction.images

  return (
    <main className="op-template construction-page" id="top">
      <Seo page={createTemplateSeo(construction)} />
      <TemplateHeader
        template={construction}
        navItems={[["服務", "#services"], ["流程", "#process"], ["案例", "#cases"], ["估價", "#estimate"]]}
        ctaLabel="免費估價"
        ctaHref="#estimate"
      />

      <section className="construction-hero">
        <div className="construction-hero-copy"><span>DESIGN THAT GETS BUILT</span><h1>從現勘到收尾<br />把設計確實做出來</h1><p>空間規劃、工法整合、現場管理與完工保固由同一套資訊透明的流程完成</p><div><a href="#estimate">預約免費現勘</a><a href="#cases">查看完工案例 ↓</a></div></div>
        <div className="construction-hero-image"><img src={hero} alt="工班師傅於清水混凝土與木作空間進行細部收尾" width="1680" height="945" fetchPriority="high" /><span>DETAIL / SITE / DELIVERY</span></div>
        <div className="construction-hero-number">01</div>
      </section>

      <section className="construction-services" id="services">
        <div className="construction-section-head"><span>02</span><div><p>WHAT WE BUILD</p><h2>設計得出來<br />現場也做得到</h2></div></div>
        <div className="construction-service-grid">
          {[["空間規劃", "住宅、店面與辦公空間的動線、機能及材料整理"], ["基礎工程", "拆除、水電、泥作、防水與木作的工序整合"], ["工程管理", "進度、工班、材料進場與現場問題的單一窗口"], ["局部翻修", "依預算處理廚衛、收納、格局與老屋機能"]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#estimate">討論需求 ↗</a></article>)}
        </div>
      </section>

      <section className="construction-planning">
        <LightboxImage src={planning} alt="設計團隊在桌面攤開圖面與材料樣本進行現勘規劃" className="construction-planning-image" />
        <div className="construction-planning-copy"><span>03 · SITE SURVEY</span><h2>先把現場條件看懂<br />再談想像</h2><p>丈量尺寸之外也確認採光、管線、結構限制、出入口與社區施工規範降低設計圖與現場落差</p><dl><div><dt>01</dt><dd><b>需求訪談</b><span>使用人數、生活方式與必要機能</span></dd></div><div><dt>02</dt><dd><b>現況盤點</b><span>尺寸、管線、結構與施工條件</span></dd></div><div><dt>03</dt><dd><b>範圍確認</b><span>預算、工項、材料與工期邊界</span></dd></div></dl></div>
      </section>

      <section className="construction-process" id="process">
        <div className="construction-section-head"><span>04</span><div><p>WORKFLOW</p><h2>每個階段都有可以核對的內容</h2></div></div>
        <ol>{[["現勘", "確認現況與需求"], ["提案", "平面、材料與預算"], ["簽約", "工項、付款與工期"], ["施工", "進度回報與查驗"], ["驗收", "缺失修正與交付"]].map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>

      <section className="construction-craft">
        <div className="construction-craft-copy"><span>05 · CRAFT DETAILS</span><h2>好看的表面<br />來自看不見的基礎</h2><p>圖面標示做法現場確認收口需要覆蓋的工項在封板前完成查驗與記錄</p><div><article><b>水平與垂直</b><p>放樣、基準線與交接面先確認</p></article><article><b>防水與試水</b><p>依實際工法留下施工與測試記錄</p></article><article><b>收邊與收口</b><p>材料交接位置先在圖面與樣板確認</p></article></div></div>
        <LightboxImage src={craft} alt="師傅近距離處理室內工程的木作與收口細節" className="construction-craft-image" />
      </section>

      <section className="construction-site">
        <LightboxImage src={site} alt="整理有序的室內工程施工現場" className="construction-site-image" />
        <div className="construction-site-copy"><span>06 · ON SITE</span><h2>施工不是黑盒子</h2><p>正式專案可依約定頻率回報進度、進場工項、現場照片與待確認事項讓屋主知道工程進到哪裡</p><ul><li>每週進度摘要</li><li>材料進場核對</li><li>變更項目留存</li><li>重要節點查驗</li></ul></div>
      </section>

      <section className="construction-cases" id="cases">
        <div className="construction-section-head"><span>07</span><div><p>SELECTED SPACES</p><h2>案例不是一張美照<br />而是條件與解法</h2></div></div>
        <div className="construction-case-grid">
          <article><LightboxImage src={caseImage} alt="清水模與暖木材質的住宅完工空間提案" /><div><span>住宅提案 A</span><h3>把採光留給日常活動</h3><p>以動線重整與連續收納示意空間解法；非真實完工實績</p></div></article>
          <article><LightboxImage src={extension} alt="室內工程延伸空間與木作細節提案" /><div><span>空間提案 B</span><h3>材料交接成為視覺秩序</h3><p>以木作、塗料與金屬的收口關係示意設計語言；非真實完工實績</p></div></article>
        </div>
      </section>

      <section className="construction-warranty">
        <div className="construction-warranty-title"><span>08 · WARRANTY</span><h2>完工之後<br />還有清楚的責任邊界</h2></div>
        <div className="construction-warranty-grid"><article><b>交付清單</b><p>整理材料、設備、保養方式與必要圖面</p></article><article><b>驗收紀錄</b><p>逐項確認缺失、修正時程與完成狀態</p></article><article><b>保固範圍</b><p>正式簽約時依工項清楚約定不虛構保固年限</p></article></div>
      </section>

      <section className="construction-estimate" id="estimate">
        <div className="construction-estimate-intro"><span>09 · FREE ESTIMATE</span><h2>先說空間、需求與預算<br />再決定下一步</h2><p>表單會送至 Qingyu Web Studio讓你體驗工程估價版型並洽詢網站製作</p><div><a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE</a><a href={`mailto:${onepageContact.email}`}>EMAIL</a></div></div>
        <LeadForm source="onepage-construction" title="免費估價流程體驗" description="留下工程品牌、服務範圍與網站需求由 Qingyu Web Studio 回覆" services={["室內設計一頁式網站", "工程行／統包網站", "案例與工法內容整理", "估價表單與 LINE 流程"]} submitLabel="送出網站需求" compact />
      </section>

      <TemplateFooter template={construction} />
      <MobileContactBar primaryLabel="免費估價" primaryHref="#estimate" />
    </main>
  )
}
