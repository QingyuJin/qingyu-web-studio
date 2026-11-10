import { tidyCopy, type Messages } from "../../showcase-i18n/core"

const rows = `
選擇語言|Language|言語|언어
品牌主視覺|Brand visuals|ブランドビジュアル|브랜드 비주얼
Banner 設計|Banners|バナー|배너|橫幅設計
影像合成|Image compositing|画像合成|이미지 합성
電商美工|Commerce graphics|EC画像|쇼핑몰 디자인
網站視覺|Web visuals|サイトビジュアル|웹 비주얼
下載高解析 PNG|Download full size|原寸で保存|원본 저장|下載原尺寸
放大查看 {0} {1}|Enlarge {0} {1}|{0} {1}を拡大|{0} {1} 확대
VIEW|View|見る|보기|查看
Process Proof|Design process|制作過程|제작 과정|製作過程
原始素材 → 合成過程 → 最終成品|Source to finished design|素材から完成まで|소재에서 완성까지|從素材到成品
去背合成、調色、排版、品牌視覺皆為自行製作|Compositing color and layout by Qingyu|切り抜きと色調整とレイアウトを担当|합성과 색 보정 및 레이아웃 직접 제작|去背 合成 調色與排版均自行製作
放大查看 {0} 製作過程|Enlarge {0} process|{0}の制作過程を拡大|{0} 제작 과정 확대
VIEW PROCESS ＋|View process|制作過程を見る|제작 과정 보기|查看製作過程
作品放大檢視：{0}|Enlarged work {0}|作品拡大 {0}|작품 확대 {0}
關閉放大檢視|Close enlarged view|拡大表示を閉じる|확대 보기 닫기
關閉|Close|閉じる|닫기
上一張作品|Previous work|前の作品|이전 작품
下一張作品|Next work|次の作品|다음 작품
下載 PNG ↓|Download PNG|PNGを保存|PNG 저장|下載圖片
可左右滑動瀏覽|Swipe to browse|左右にスワイプ|좌우로 넘기기
Commercial Visual Design|Commercial visuals|商業ビジュアル|상업 비주얼|商業視覺設計
主要導覽|Main navigation|メインメニュー|주 메뉴
商業作品|Work|作品|작품
製作證明|Process|制作過程|제작 과정
聯絡|Contact|お問い合わせ|문의
概念作品 品牌與情境為展示使用 影像皆由本作品生成|Concept brands and generated imagery for demonstration|架空ブランドと生成画像によるコンセプト作品|가상 브랜드와 생성 이미지로 제작한 콘셉트 작품|概念品牌與生成影像展示
Selected Commercial Campaigns|Selected campaigns|厳選した広告作品|대표 광고 작업|精選商業作品
品牌網站・電商・廣告 Banner 視覺設計|Web commerce and campaign visuals|サイトとECと広告のデザイン|웹과 쇼핑몰 및 광고 비주얼|品牌網站 電商與廣告視覺
為品牌與行銷團隊製作可直接上線的網站主視覺、活動 Banner 與多尺寸廣告素材。|Web banners and ad formats for brands and marketing teams|ブランドと制作チーム向けのサイト画像と広告素材|브랜드와 마케팅 팀을 위한 웹 배너와 광고 소재|為品牌與行銷團隊製作網站主視覺與廣告素材
所有視覺皆包含自行排版、修圖、合成與多尺寸延伸設計|Layout retouching compositing and format adaptation|レイアウトと修整と合成とサイズ展開|레이아웃과 보정 및 합성과 크기별 제작|排版 修圖 合成與多尺寸延伸
查看平面作品 ↓|Explore work|作品を見る|작품 보기|查看作品
洽談設計合作 ↗|Discuss a project|制作を相談|제작 문의|洽談設計
作品分類|Work categories|作品の分類|작품 분류
Ongoing Visual Support|Ongoing design support|継続的な制作支援|지속적인 디자인 지원|持續設計支援
可配合行銷團隊持續交付|Design support for your team|チームの継続制作を支援|팀을 위한 디자인 지원|支援行銷團隊持續製作
可依既有品牌規範製作，也可從零建立單次 Campaign 視覺方向。|Work within your brand or create a campaign direction|既存のブランドに沿う制作も新しい広告の方向づくりも|기존 브랜드에 맞추거나 새 캠페인 방향부터 제작|延續品牌規範 或建立新的活動視覺
網站首頁主視覺|Website hero images|サイトのメイン画像|웹사이트 메인 이미지
電商活動 Banner|Commerce campaign banners|ECキャンペーン画像|쇼핑몰 행사 배너|電商活動橫幅
Meta／Google 廣告素材|Meta and Google ad graphics|MetaとGoogleの広告素材|Meta와 Google 광고 소재|Meta 與 Google 廣告素材
Desktop／Mobile 多尺寸延伸|Desktop and mobile formats|デスクトップとモバイルの展開|데스크톱과 모바일 크기별 제작|桌機與手機版延伸
Project Inquiry|Project inquiry|制作のご相談|프로젝트 문의|合作詢問
回到頂部 ↑|Back to top|上へ戻る|맨 위로|回到頂部
需要穩定配合的視覺設計夥伴？|Need a design partner|制作パートナーをお探しですか|디자인 파트너가 필요하신가요|尋找視覺設計夥伴
可承接數位行銷公司、網站公司與品牌端的 Banner、 網站主視覺及多尺寸廣告素材製作。|Visual design for agencies web studios and brands|代理店と制作会社とブランド向けのビジュアル制作|대행사와 웹 스튜디오 및 브랜드를 위한 비주얼 제작|為行銷公司 網站公司與品牌製作視覺
Email|Email|メール|이메일|電子郵件
LINE ID|LINE ID|LINE ID|LINE 아이디|LINE 帳號
寄送合作需求|Send an inquiry|問い合わせる|문의 보내기
設計合作需求|Design inquiry|デザインの相談|디자인 문의
已複製 LINE ID|LINE ID copied|LINE IDをコピーしました|LINE 아이디 복사됨
複製 LINE ID|Copy LINE ID|LINE IDをコピー|LINE 아이디 복사
Brand Visual · Image Composite · Campaign Banner|Brand visuals and campaign design|ブランド画像と広告デザイン|브랜드 비주얼과 광고 디자인|品牌視覺 影像合成 活動設計
Skin Management|Skincare|スキンケア|스킨케어|肌膚管理
Interior Architecture|Interior design|空間設計|공간 디자인|空間設計
Artisan Pâtisserie|Pâtisserie|パティスリー|파티스리|手作甜點
Business Operations|Business operations|業務管理|업무 운영|企業營運
Desktop Banner|Desktop banner|デスクトップ画像|데스크톱 배너|桌機橫幅
Mobile Banner|Mobile banner|モバイル画像|모바일 배너|手機橫幅
Social Ad|Social ad|SNS広告|소셜 광고|社群廣告
Process Proof / 1800 × 1080|Design process 1800 × 1080|制作過程 1800 × 1080|제작 과정 1800 × 1080|製作過程 1800 × 1080
{0}｜製作過程|{0} process|{0}の制作過程|{0} 제작 과정|{0} 製作過程
SOMME 肌理研究所|SOMME Skin Studio|SOMME 肌の研究所|SOMME 스킨 스튜디오
去背商品 × 人物肌膚 × 系列資訊|Product portraits and collection details|商品と人物とシリーズ情報|제품과 인물 및 컬렉션 정보|商品 人物與系列資訊
重新建立琥珀瓶身商品組，完成去背、接觸陰影、標籤與人物光線匹配；三種尺寸各自調整人物視線、產品比例與資訊密度。|Composited amber bottles with matched light and shadows Each format has its own crop and layout|琥珀色の瓶の光と影を揃えて合成 各サイズで構図と情報量を調整|호박색 병의 빛과 그림자를 맞춰 합성하고 크기마다 구도와 정보량 조정|匹配瓶身與人物光影 依尺寸調整構圖與資訊
SOMME 美容品牌桌機 Banner，人物肌膚、去背精華瓶身、成分資訊與系列標籤完整合成|SOMME desktop visual with portrait and serum bottles|SOMME 人物と美容液のデスクトップ画像|SOMME 인물과 세럼 병 데스크톱 이미지
SOMME 美容品牌手機 Banner，以人物特寫與獨立商品情境重新構圖|SOMME mobile portrait and product composition|SOMME 人物と商品のモバイル構図|SOMME 인물과 제품의 모바일 구도
SOMME 美容品牌社群廣告，產品合成、價格與促銷系列資訊清楚呈現|SOMME social ad with products and offer details|SOMME 商品とキャンペーンのSNS広告|SOMME 제품과 행사 정보 소셜 광고
SOMME 原始人物素材、去背商品與光影合成、最終桌機 Banner 的製作過程|SOMME source images compositing and final visual|SOMME 素材から合成と完成まで|SOMME 원본 소재와 합성 및 완성 과정
序所空間|Xusuo Interiors|序所 空間設計|쉬쒀 인테리어
空間調色 × 平面線稿 × 材質系統|Color plans and materials|色調と平面図と素材|색감과 평면도 및 소재|空間調色 平面圖與材質
保留木材、石材、庭院與自然採光，進行暖灰色調校正；加入住宅平面圖、材質編號與專案資訊，建立室內設計提案廣告感。|Warm gray color grading with floor plans materials and project details|暖かなグレーの色調に平面図と素材と案件情報を重ねる|따뜻한 회색 톤에 평면도와 소재 및 프로젝트 정보 구성|暖灰調色結合平面圖 材質與專案資訊
序所空間桌機 Banner，住宅攝影、平面線稿、材質編號與作品資訊整合|Xusuo desktop composition with interior plans and materials|序所 空間写真と平面図のデスクトップ画像|쉬쒀 실내 사진과 평면도 데스크톱 이미지
序所空間手機 Banner，重新聚焦庭院光線並配置建築圖層|Xusuo mobile layout with courtyard light and plans|序所 庭の光と図面のモバイル画像|쉬쒀 정원의 빛과 도면 모바일 이미지
序所空間社群廣告，空間攝影、材質色票與完整案例資訊重新構圖|Xusuo social composition with materials and project details|序所 素材と案件情報のSNS広告|쉬쒀 소재와 프로젝트 정보 소셜 광고
序所空間原始攝影、調色與建築圖層、最終 Banner 的製作過程|Xusuo photography color grading and final composition|序所 写真から色調整と完成まで|쉬쒀 사진과 색 보정 및 완성 과정
MÛR 熟成菓製|MÛR Pâtisserie|MÛR パティスリー|MÛR 파티스리
食品攝影 × 包裝盒 × 食材情境|Food packaging and ingredients|菓子と包装と食材|디저트와 포장 및 재료|甜點 包裝與食材
將甜點攝影與獨立製作的禮盒、包裝紙、榛果及酥片素材合成，加入品牌貼紙、價格與限定日期，完成可直接投放的新品 Campaign。|Layered pastry photography packaging and ingredients with launch details|菓子の写真と包装と食材を重ね新商品の情報を配置|디저트 사진과 포장 및 재료를 합성해 신제품 정보 구성|合成甜點 包裝與食材 加入新品活動資訊
MÛR 甜點新品桌機 Banner，千層攝影與包裝禮盒、食材、價格完整合成|MÛR desktop pastry and gift box composition|MÛR 菓子とギフト箱のデスクトップ画像|MÛR 디저트와 선물 상자 데스크톱 이미지
MÛR 甜點新品手機 Banner，甜點切面與包裝情境分層重新構圖|MÛR mobile pastry detail and packaging layout|MÛR 菓子の断面と包装のモバイル画像|MÛR 디저트 단면과 포장 모바일 이미지
MÛR 甜點新品社群廣告，食品攝影、禮盒與期間限定資訊完整呈現|MÛR social ad with pastries gifts and seasonal details|MÛR 菓子とギフトと限定情報のSNS広告|MÛR 디저트와 선물 및 한정 정보 소셜 광고
MÛR 原始食品攝影、包裝與食材去背合成、最終 Banner 的製作過程|MÛR food photography packaging and final composition|MÛR 菓子の写真から包装合成と完成まで|MÛR 디저트 사진과 포장 합성 및 완성 과정
ORDO 營運協作系統|ORDO Operations|ORDO 業務管理|ORDO 업무 관리
介面設計 × 裝置合成 × 企業品牌延伸|Interfaces devices and brand design|画面とデバイスとブランド展開|화면과 기기 및 브랜드 디자인|介面 裝置與品牌延伸
從資訊架構開始設計營運工作台與手機摘要，保留真實訂單狀態、工作列表與下一步，再延伸品牌幾何、裝置與週報印刷物。|An operations workspace and mobile summary extended into device and brand visuals|業務画面とモバイル概要をデバイスとブランドの画像へ展開|업무 화면과 모바일 요약을 기기 및 브랜드 비주얼로 확장|營運工作台與手機摘要 延伸為裝置與品牌視覺
ORDO 企業服務桌機 Banner，可信營運介面、裝置畫面與週報印刷物完整設計|ORDO desktop operations screen devices and weekly report|ORDO 業務画面とデバイスと週報の画像|ORDO 업무 화면과 기기 및 주간 보고 이미지
ORDO 企業服務手機 Banner，以獨立手機營運摘要與工作狀態重新設計|ORDO mobile operations summary and work status|ORDO モバイルの業務概要と作業状況|ORDO 모바일 업무 요약과 작업 상태
ORDO 企業服務社群廣告，產品介面、裝置與企業視覺延伸完整呈現|ORDO social ad with interface and brand visuals|ORDO 画面とブランドのSNS広告|ORDO 화면과 브랜드 비주얼 소셜 광고
ORDO 資訊架構草稿、介面與品牌系統、最終企業 Banner 的製作過程|ORDO information structure interface and final visual|ORDO 情報構造から画面と完成まで|ORDO 정보 구조와 화면 및 완성 과정
`

export const messages: Messages = Object.fromEntries(rows.trim().split("\n").map((row) => {
  const [source, en, ja, ko, zh] = row.split("|")
  return [source, [zh ?? tidyCopy(source), en, ja, ko]]
}))
