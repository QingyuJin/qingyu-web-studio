import Seo from "../site/Seo"
import "./onepage.css"
import {
  FaqList,
  LeadForm,
  LightboxImage,
  MobileContactBar,
  SectionLabel,
  TemplateFooter,
  TemplateHeader,
} from "./OnePageShared"
import { createTemplateSeo, getOnepageTemplate, onepageContact } from "./onepageData"
import useResetScroll from "./useResetScroll"

const beauty = getOnepageTemplate("beauty")
const clinic = getOnepageTemplate("clinic")

export function BeautyTemplate() {
  useResetScroll()
  const [hero, treatment, specialist, products, space, result] = beauty.images

  return (
    <main className="op-template beauty-page" id="top">
      <Seo page={createTemplateSeo(beauty)} />
      <TemplateHeader
        template={beauty}
        navItems={[["肌膚需求", "#needs"], ["療程", "#treatments"], ["產品", "#products"], ["預約", "#booking"]]}
        ctaLabel="LINE 預約"
        ctaHref="#booking"
      />

      <section className="beauty-hero" aria-labelledby="beauty-title">
        <img src={hero} alt="柔光中的保養儀式與美容品牌情境" width="1680" height="945" fetchPriority="high" />
        <div className="beauty-hero-copy">
          <p>HANA ÉCLAT · SKIN RITUAL</p>
          <h1 id="beauty-title">讓保養回到<br />肌膚真正需要的節奏</h1>
          <span>從理解膚況開始安排當下適合的照護不追求急促改變</span>
          <div>
            <a href="#treatments">探索療程</a>
            <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE 諮詢 ↗</a>
          </div>
        </div>
        <div className="beauty-hero-note"><span>01</span><p>PERSONALIZED<br />SKIN CARE</p></div>
      </section>

      <section className="beauty-needs" id="needs">
        <SectionLabel index={2} eyebrow="SKIN CONCERNS" title="先理解肌膚再選擇照護" description="膚況會隨季節、作息與壓力改變從三種常見需求出發找到適合的保養節奏" />
        <div className="beauty-need-grid">
          {[
            ["01", "乾燥與緊繃", "以溫和清潔、補水與屏障照護為主減少過度堆疊"],
            ["02", "膚色顯得疲憊", "整理代謝與保濕步驟讓日常保養更穩定"],
            ["03", "容易敏感不適", "先減少刺激來源再慢慢建立簡潔的照護方式"],
          ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#booking">諮詢這項需求 →</a></article>)}
        </div>
      </section>

      <section className="beauty-philosophy">
        <div className="beauty-portrait-wrap">
          <img src={specialist} alt="美容顧問在自然光空間中評估保養需求" width="1680" height="945" loading="lazy" />
          <span>CALM · HONEST · PERSONAL</span>
        </div>
        <div className="beauty-philosophy-copy">
          <p>03 · OUR PHILOSOPHY</p>
          <h2>保養不是做得更多<br />而是更靠近自己</h2>
          <p>每一次照護都從對話開始了解當天膚況、過去保養習慣與真正期待再決定步驟與強度</p>
          <blockquote>「保留肌膚的舒適感是每次照護最重要的準則」</blockquote>
        </div>
      </section>

      <section className="beauty-treatments" id="treatments">
        <SectionLabel index={4} eyebrow="SIGNATURE TREATMENTS" title="三種照護對應不同時刻" />
        <div className="beauty-treatment-layout">
          <LightboxImage src={treatment} alt="美容師進行臉部肌膚照護的療程情境" className="beauty-feature-image" />
          <div className="beauty-treatment-list">
            {[
              ["A", "深層舒緩保濕", "適合乾燥、緊繃或需要放慢節奏的肌膚", "60 MIN"],
              ["B", "淨化平衡照護", "以溫和清潔與分區照護整理不穩定膚況", "75 MIN"],
              ["C", "亮采循環管理", "整合按摩與保濕讓疲憊膚況恢復光澤感", "90 MIN"],
            ].map(([letter, title, text, time]) => <article key={letter}><span>{letter}</span><div><h3>{title}</h3><p>{text}</p></div><b>{time}</b></article>)}
          </div>
        </div>
      </section>

      <section className="beauty-plan">
        <div className="beauty-plan-copy">
          <p>05 · SEASONAL EDIT</p>
          <h2>換季安定計畫</h2>
          <p>四週內以兩次專業照護搭配日常保養調整先穩定膚況再觀察下一步方案內容會依諮詢結果安排不承諾特定療效</p>
          <ul><li>初次膚況訪談</li><li>兩次客製照護</li><li>居家步驟整理</li><li>四週追蹤建議</li></ul>
          <a href="#booking">預約初次諮詢</a>
        </div>
        <LightboxImage src={result} alt="保養後自然透亮的肌膚狀態示意" className="beauty-plan-image" />
      </section>

      <section className="beauty-products" id="products">
        <div className="beauty-products-copy">
          <p>06 · FORMULA NOTES</p>
          <h2>少而精準的日常配方</h2>
          <p>以保濕、舒緩與屏障照護為核心整理成容易持續的早晚步驟</p>
          <dl>
            <div><dt>01</dt><dd><b>角鯊烷</b><span>柔潤膚觸減少乾燥感</span></dd></div>
            <div><dt>02</dt><dd><b>神經醯胺</b><span>協助維持肌膚屏障</span></dd></div>
            <div><dt>03</dt><dd><b>積雪草</b><span>適合需要舒緩的日常照護</span></dd></div>
          </dl>
        </div>
        <LightboxImage src={products} alt="暖米白色調的精簡保養產品系列" className="beauty-product-image" />
      </section>

      <section className="beauty-process">
        <SectionLabel index={7} eyebrow="YOUR VISIT" title="把每一步都說清楚" />
        <div className="beauty-process-body">
          <ol>
            {[
              ["01", "預約與簡單問卷", "先了解膚況、習慣與期待"],
              ["02", "當日膚況確認", "現場溝通後再安排適合步驟"],
              ["03", "完整照護", "過程中持續確認舒適度"],
              ["04", "日常建議", "帶走可執行的早晚照護重點"],
            ].map(([number, title, text]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
          <LightboxImage src={space} alt="自然光與石材質感的美容照護空間" className="beauty-space-image" />
        </div>
      </section>

      <section className="beauty-voices">
        <div>
          <p>08 · CLIENT FEELINGS</p>
          <h2>不是誇張承諾<br />是被好好理解的感受</h2>
          <span>以下為版型中的回饋呈現方式示意正式上線應改為品牌取得授權的真實內容</span>
        </div>
        <div className="beauty-voice-list">
          <blockquote><p>「流程說得很清楚也會依當天狀態調整整體很安心」</p><cite>回饋版位示意 01</cite></blockquote>
          <blockquote><p>「回家後知道日常保養該怎麼簡化不再每一樣都疊上去」</p><cite>回饋版位示意 02</cite></blockquote>
        </div>
      </section>

      <section className="beauty-book" id="booking">
        <div className="beauty-book-intro">
          <p>09 · RESERVATION</p>
          <h2>留一段時間<br />好好照顧自己的肌膚</h2>
          <p>此表單會送至 Qingyu Web Studio讓你體驗美容範本的預約流程並洽詢網站製作</p>
          <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE ID · {onepageContact.lineId} ↗</a>
        </div>
        <LeadForm source="onepage-beauty" title="預約流程體驗" description="留下聯絡方式與想呈現的服務送出後由 Qingyu Web Studio 回覆" services={["美容工作室一頁式網站", "療程與方案內容整理", "LINE 預約流程", "其他需求"]} submitLabel="送出諮詢" compact />
      </section>

      <TemplateFooter template={beauty} />
      <MobileContactBar primaryLabel="預約諮詢" primaryHref="#booking" />
    </main>
  )
}

const clinicFaqs = [
  ["第一次看診需要準備什麼？", "可先整理目前症狀、過往治療與正在使用的藥物；實際看診規定應由正式診所提供"],
  ["可以先諮詢再決定療程嗎？", "版型流程建議先由醫師檢查與說明再依需求、口腔狀況與可行選項共同規劃"],
  ["療程時間與次數會固定嗎？", "不會每個人的狀況不同應由醫師完成評估後提供個別規劃本範本不提供醫療建議"],
  ["如何安排回診提醒？", "正式網站可串接表單、LINE 或診所既有掛號系統依實際作業流程設定"],
]

export function ClinicTemplate() {
  useResetScroll()
  const [hero, team, consultation, equipment, treatment, interior] = clinic.images

  return (
    <main className="op-template clinic-page" id="top">
      <Seo page={createTemplateSeo(clinic)} />
      <TemplateHeader
        template={clinic}
        navItems={[["醫師團隊", "#team"], ["診療項目", "#services"], ["看診流程", "#visit"], ["交通", "#location"]]}
        ctaLabel="預約掛號"
        ctaHref="#appointment"
      />

      <section className="clinic-hero">
        <div className="clinic-hero-copy">
          <span>WARM CARE · CLEAR EXPLANATION</span>
          <h1>從理解開始<br />安心完成每一次治療</h1>
          <p>把問題說清楚、把選擇說完整再一起安排適合的治療節奏</p>
          <div><a href="#appointment">線上預約</a><a href="#services">查看診療項目</a></div>
          <dl><div><dt>01</dt><dd>完整說明</dd></div><div><dt>02</dt><dd>舒適環境</dd></div><div><dt>03</dt><dd>持續追蹤</dd></div></dl>
        </div>
        <div className="clinic-hero-image"><img src={hero} alt="牙醫師向患者說明口腔狀況的溫暖診間" width="1680" height="945" fetchPriority="high" /></div>
      </section>

      <section className="clinic-team" id="team">
        <div className="clinic-section-title"><span>02 · OUR TEAM</span><h2>專業之外<br />也在意你是否真正聽懂</h2><p>正式網站可放入醫師真實學經歷、專長與看診時段；本頁不使用虛構證照或認證</p></div>
        <LightboxImage src={team} alt="牙醫團隊於明亮診所空間中的專業形象" className="clinic-team-image" />
        <div className="clinic-team-notes"><article><b>主治醫師資料版位</b><p>姓名、學經歷、專長與門診時段於正式交付時填入</p></article><article><b>跨專業協作</b><p>需要多項評估時讓不同專長的醫師共同討論治療順序</p></article></div>
      </section>

      <section className="clinic-concerns">
        <div className="clinic-section-title"><span>03 · COMMON CONCERNS</span><h2>今天是哪一種不舒服？</h2></div>
        <div className="clinic-concern-grid">
          {[["牙齒敏感", "遇冷熱容易痠軟"], ["缺牙與咬合", "影響進食或日常說話"], ["牙齦不適", "出血、腫脹或清潔困擾"], ["外觀需求", "希望改善排列或色澤"]].map(([title, text], index) => <a href="#appointment" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><b>諮詢 →</b></a>)}
        </div>
      </section>

      <section className="clinic-services" id="services">
        <LightboxImage src={treatment} alt="牙醫師進行細心診療的臨床情境" className="clinic-service-image" />
        <div className="clinic-service-copy">
          <span>04 · TREATMENTS</span><h2>從日常照護到完整重建</h2>
          <div className="clinic-service-list">
            {[["一般牙科", "檢查、清潔與常見不適處理"], ["牙周照護", "評估牙齦與支持組織狀況"], ["缺牙重建", "依條件討論合適的重建方式"], ["齒列規劃", "從清潔、咬合與外觀共同評估"]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
          <small>診療內容為網站版型示意不能取代醫師診斷</small>
        </div>
      </section>

      <section className="clinic-consultation">
        <div className="clinic-consultation-copy"><span>05 · CONSULTATION</span><h2>先看懂現況<br />再一起排出優先順序</h2><p>以影像與口腔檢查資料說明問題位置、可能選項、預估步驟與後續照護保留足夠時間提問</p><ol><li><b>01</b>了解主訴與期待</li><li><b>02</b>完成必要檢查</li><li><b>03</b>比較可行方案</li><li><b>04</b>確認治療順序</li></ol></div>
        <LightboxImage src={consultation} alt="牙醫師與患者共同查看影像並討論治療規劃" className="clinic-consultation-image" />
      </section>

      <section className="clinic-equipment">
        <div className="clinic-section-title"><span>06 · SPACE & EQUIPMENT</span><h2>讓檢查資訊更清楚<br />也讓等待更舒服</h2></div>
        <div className="clinic-equipment-layout">
          <LightboxImage src={equipment} alt="整潔明亮的牙科設備與診療環境" className="clinic-equipment-image" />
          <div><article><span>01</span><h3>影像說明</h3><p>將檢查結果轉成患者容易理解的視覺資訊</p></article><article><span>02</span><h3>器械管理</h3><p>正式網站應依診所真實流程揭露清潔與管理方式</p></article><article><span>03</span><h3>溫暖候診</h3><p>使用淺木、暖白與柔和採光降低看診前的壓力</p></article></div>
        </div>
      </section>

      <section className="clinic-visit" id="visit">
        <div className="clinic-section-title"><span>07 · YOUR VISIT</span><h2>第一次來也知道下一步</h2></div>
        <ol>{[["預約", "選擇時段並留下主要需求"], ["報到", "確認基本資料與就診資訊"], ["檢查", "醫師評估並說明目前狀況"], ["規劃", "確認方案、步驟與回診安排"]].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>

      <section className="clinic-faq">
        <div className="clinic-section-title"><span>08 · FAQ</span><h2>看診前常見問題</h2></div>
        <FaqList items={clinicFaqs} className="clinic-faq-list" />
      </section>

      <section className="clinic-location" id="location">
        <div className="clinic-location-image"><img src={interior} alt="淺木與暖白色調的牙醫診所候診空間" width="1680" height="945" loading="lazy" /></div>
        <div className="clinic-location-copy"><span>09 · LOCATION</span><h2>交通資訊版位</h2><p>此處在正式交付時放入診所真實地址、門診時間、停車資訊與 Google Maps；範本不虛構實際營業地點</p><dl><div><dt>ADDRESS</dt><dd>客戶提供後填入</dd></div><div><dt>HOURS</dt><dd>依實際門診時段填入</dd></div><div><dt>TRANSPORT</dt><dd>捷運、公車與停車資訊</dd></div></dl><a href="#appointment">先體驗預約流程 →</a></div>
      </section>

      <section className="clinic-appointment" id="appointment">
        <div className="clinic-appointment-intro"><span>10 · APPOINTMENT</span><h2>清楚的預約<br />是安心看診的第一步</h2><p>這是牙醫掛號版型示意表單實際送至 Qingyu Web Studio用於洽詢網站製作並非醫療掛號</p><a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE {onepageContact.lineId} ↗</a></div>
        <LeadForm source="onepage-clinic" title="掛號流程體驗" description="請勿填寫病歷或敏感醫療資料；留下網站需求即可" services={["牙醫診所一頁式網站", "醫師與診療內容整理", "預約掛號流程", "其他醫療網站需求"]} submitLabel="送出網站諮詢" compact />
      </section>

      <TemplateFooter template={clinic} />
      <MobileContactBar primaryLabel="預約體驗" primaryHref="#appointment" />
    </main>
  )
}
