import { tidyCopy, type Messages } from "../../showcase-i18n/core"
import { contentMessages } from "./contentMessages"

// Source copy remains the stable key so filters and stored carts never change with language.
// Columns are English Japanese Korean and an optional concise Chinese override.
const rows = `
選擇語言|Language|言語|언어
我的帳戶|My account|マイアカウント|내 계정
模擬結帳|Demo checkout|購入デモ|결제 데모
MORIÉ JOURNAL|MORIÉ journal|MORIÉ 読みもの|MORIÉ 이야기|MORIÉ 札記
寫給緩慢生活的|Notes on|ゆっくり暮らす|느린 일상을 위한|慢生活的
植物與感官札記。|a slower life|植物と感覚の記録|식물과 감각의 기록|植物札記
繼續閱讀|Read more|続きを読む|계속 읽기
閱讀文章|Read stories|記事を読む|이야기 읽기
閱讀|Journal|読みもの|이야기
閱讀 MORIÉ 關於植物、照料、空間與日常儀式的文章。|Stories of plants and daily care|植物と日々のケアの記録|식물과 일상 관리 이야기
返回閱讀|Back to journal|読みものへ戻る|이야기로 돌아가기
MORIÉ 編輯室|MORIÉ editors|MORIÉ 編集部|MORIÉ 편집실
關於植物、空間與感官的觀察|Notes on plants and spaces|植物と空間の観察|식물과 공간의 관찰
接著閱讀|Read next|次の記事|다음 이야기
植萃保養|Botanical care|植物由来のケア|식물 성분 케어
台灣保養品牌|Taiwan skincare|台湾のスキンケア|대만 스킨케어
植物配方|Botanical formulas|植物の処方|식물 성분 배합
MORIÉ 循著植物的緩慢時間|MORIÉ at the pace of plants|MORIÉ 植物のリズムで|MORIÉ 식물의 속도로
找不到這一頁|Page not found|ページが見つかりません|페이지를 찾을 수 없어요
內容可能已調整 請返回選品首頁|Return to the collection|コレクションへお戻りください|컬렉션으로 돌아가 주세요
返回首頁|Back home|ホームへ|홈으로
肌膚保養|Skincare|スキンケア|스킨케어
身體|Body|ボディ|바디
香氛|Fragrance|フレグランス|향수
居家|Home|ホームケア|홈 케어
禮盒|Gifts|ギフト|선물
潔淨、調理與滋養，配合肌膚每日不同的節奏。|Cleanse and nourish at your own pace|肌のリズムに合わせて洗い整える|피부 리듬에 맞춘 세정과 보습|依肌膚節奏潔淨與滋養
從掌心到肩頸，讓照料延伸到每一寸日常。|Everyday care from hands to shoulders|手のひらから肩まで日々のケア|손부터 어깨까지 일상 케어|從雙手到全身的日常照料
木質、草本與微光花香，描繪貼近皮膚的風景。|Wood herbs and soft florals close to skin|肌に寄り添う木とハーブと花の香り|피부에 머무는 나무와 허브와 꽃향|貼近肌膚的木質草本與花香
為空間留下清醒、安定與沉默的餘韻。|A quiet scent for your space|空間に穏やかな余韻を|공간에 남기는 차분한 향|為空間留下安定餘韻
MORIÉ · Taiwan botanical care|MORIÉ botanical care|MORIÉ 植物由来のケア|MORIÉ 식물 성분 케어|MORIÉ 台灣植萃保養
讓日常，|Slow down|日々を|식물과 함께|讓日常
循著植物|with|植物のリズムで|일상을|循著植物
慢下來。|nature|ゆっくりと|천천히|慢下來
以島嶼山林的濕度、木質與微光為靈感，調製不喧嘩的肌膚與感官配方。|Quiet care inspired by Taiwan forests|台湾の森に着想を得た穏やかなケア|대만 숲에서 영감을 얻은 차분한 케어|以台灣山林為靈感的日常保養
探索全系列|Explore collection|全商品を見る|전체 제품 보기
閱讀品牌故事|Our story|ブランドストーリー|브랜드 이야기
SCROLL TO UNFOLD|Explore below|下へスクロール|아래로 둘러보기|向下探索
琥珀瓶器、陶瓷罐與橄欖枝構成的 MORIÉ 品牌靜物|MORIÉ amber bottles and olive branches|MORIÉの琥珀色の瓶とオリーブ|MORIÉ 호박색 병과 올리브 가지
晨霧系列 · 2026|Morning mist 2026|朝霧シリーズ 2026|아침 안개 컬렉션 2026
MORIÉ 植萃保養瓶器系列|MORIÉ botanical collection|MORIÉ 植物由来のコレクション|MORIÉ 식물 성분 컬렉션
夜間儀式 · No. 03|Evening ritual 03|夜のケア 03|저녁 케어 03
深夜不是終點，|A quiet night|静かな夜は|고요한 밤
是肌膚重新整理|for skin|肌を整える|피부를 위한|讓肌膚
自己的時間。|to recover|ひととき|회복의 시간|慢慢修護
神經醯胺、紅藜與植物角鯊烷構成輕盈的修護層。沒有張揚氣味，只在每一次按壓之間，讓乾燥與疲倦慢慢退去。|Ceramides red quinoa and plant squalane for lightweight evening care|セラミドと紅キヌアと植物スクワランで軽やかな夜のケア|세라마이드와 홍퀴노아와 식물성 스쿠알란으로 가벼운 저녁 케어|神經醯胺 紅藜與植物角鯊烷的輕盈夜間修護
認識夜間修護精華|Explore night serum|夜用美容液を見る|나이트 세럼 보기
精選配方|Selected formulas|おすすめの処方|추천 제품
此刻，適合放在手邊|Everyday essentials|日々のそばに|매일 곁에 두는 것들|日常精選
依照台灣季節與日常步調選出的六款配方。|Six formulas for the season|季節に合わせた六つの処方|계절에 맞춘 여섯 가지 제품|依季節挑選的六款配方
查看全部商品|Shop all|全商品を見る|모든 제품 보기
我們不追趕自然，|Follow nature|自然の|자연의 속도를|順著自然
只學著聽懂它的速度。|at its own pace|歩みに耳を澄ます|따라갑니다|理解它的節奏
每一款 MORIÉ 配方，都從「是否真正需要」開始。理解原料的產季、肌膚的界線與包材的去向，比堆疊更多成分更重要。|Every formula starts with a need and considers ingredients skin and packaging|必要性から考える処方と原料と肌と包材|필요에서 시작해 원료와 피부와 포장을 함께 생각합니다|每款配方從真正需要出發 同時考量原料 肌膚與包材
我們的製作哲學|Our approach|ものづくりの考え|우리가 만드는 방식
雨後山林、岩石與蕨類|Forest rocks and ferns after rain|雨上がりの森と岩とシダ|비 온 뒤 숲과 바위와 고사리
編輯選讀|Selected stories|おすすめの読みもの|추천 이야기
關於植物，也關於生活|Plants and daily life|植物と暮らし|식물과 일상
所有文章|All stories|すべての記事|모든 이야기
「好的照料不是改變你，|Care that brings you|自分らしさに|나다움에 가까워지는|好的照料
而是讓你更靠近原來的自己。」|closer to yourself|寄り添うケア|일상 케어|讓你更靠近自己
— MORIÉ FORMULATION NOTE 01|MORIÉ formula note 01|MORIÉ 処方ノート 01|MORIÉ 배합 노트 01|MORIÉ 配方筆記 01
滿額免運|Free shipping|送料無料|무료 배송
全台單筆消費滿 NT$2,200，享標準配送免運。|Free Taiwan shipping over NT$2,200|台湾内はNT$2,200以上で送料無料|대만 내 NT$2,200 이상 무료 배송|全台滿 NT$2,200 免運
配方諮詢|Care advice|ケアの相談|제품 상담
由門市夥伴依膚況、氣味偏好與生活節奏提供建議。|Advice for your skin and scent preferences|肌と香りの好みに合わせたご提案|피부와 향 취향에 맞춘 안내|依膚況與氣味偏好提供建議
克制包裝|Simple wrapping|簡素な包装|간결한 포장
免費以再生棉紙包裝，亦可留下贈禮短箋。|Recycled paper wrap with a gift note|再生紙の包装とメッセージカード|재생 종이 포장과 선물 메시지|再生棉紙包裝 可附贈禮短箋
安心試用|Try a sample|サンプルを試す|샘플 체험
每筆訂單可選擇兩款體驗包，找到更適合的日常。|Choose two samples with each order|ご注文ごとにサンプルを二つ選択|주문마다 샘플 두 가지 선택|每筆訂單可選兩款體驗包
MORIÉ FORMULATIONS|MORIÉ formulas|MORIÉ の処方|MORIÉ 제품|MORIÉ 配方
所有配方|All formulas|すべての処方|모든 제품
依照氣味、膚況與日常的需要，找到適合放在身邊的一款。|Find care for your skin and daily routine|肌と暮らしに合うケアを|피부와 일상에 맞는 제품 찾기|依氣味與膚況找到日常所需
探索 MORIÉ 肌膚保養、身體、香氛與居家配方。|Explore MORIÉ care and fragrance|MORIÉのケアと香り|MORIÉ 케어와 향 둘러보기
MORIÉ SPACES|MORIÉ spaces|MORIÉ の空間|MORIÉ 공간|MORIÉ 空間
一處讓氣味|A space|香りが|향이|讓氣味
慢慢展開的地方。|for scent to unfold|ゆっくり広がる場所|천천히 퍼지는 공간|慢慢展開
三間空間，三種與城市相處的方式。歡迎前來試聞、觸摸，或只是短暫停留。|Three spaces to discover scent and texture|三つの空間で香りと感触を楽しむ|세 공간에서 만나는 향과 질감|三間空間 感受不同氣味與質地
MORIÉ 門市空間|MORIÉ store interior|MORIÉ 店内|MORIÉ 매장 공간
門市服務|Store services|店舗サービス|매장 서비스
氣味諮詢、肌膚配方建議與企業贈禮，皆可於門市進行。|Scent advice skincare guidance and business gifts|香りとスキンケアの相談や法人ギフト|향과 스킨케어 상담 및 기업 선물|氣味諮詢 保養建議與企業贈禮
本網站為品牌展示提案，門市資訊為虛構內容；正式營運前可集中替換資料。|Concept stores for demonstration only|店舗情報はコンセプト展示用です|매장 정보는 콘셉트 데모입니다|門市資訊為概念展示
台灣門市|Taiwan stores|台湾の店舗|대만 매장
尋找 MORIÉ 台北、台中與高雄門市。|Explore MORIÉ concept stores|MORIÉのコンセプト店舗|MORIÉ 콘셉트 매장
ABOUT MORIÉ|About MORIÉ|MORIÉ について|MORIÉ 소개|關於 MORIÉ
在島嶼的濕度裡，|Rooted in Taiwan|台湾の風土から|대만의 숲에서|從台灣山林
尋找照料的尺度。|made for daily care|日々のケアへ|일상 케어로|找到照料的尺度
MORIÉ 誕生於一個簡單的問題：當生活已經足夠喧嘩，一款保養品還能否只做它真正需要做的事？|What if skincare focused on what you truly need|本当に必要なケアだけを届けるには|정말 필요한 케어에만 집중한다면|保養能不能只做真正需要的事
雨霧中的台灣山林|Taiwan forest in mist|霧に包まれた台湾の森|안개 속 대만 숲
我們的起點|Our beginnings|私たちの原点|우리의 시작
我們以台灣山林的植物氣息為線索，與配方師、農作者和包材工藝夥伴一起，建立一套不把自然浪漫化，也不把科技神秘化的照料方式。|Inspired by Taiwan plants we bring formulation farming and packaging together|台湾の植物を起点に処方と農業と包材を一緒に考える|대만 식물을 바탕으로 배합과 농업과 포장을 함께 생각합니다|從台灣植物出發 整合配方 農作與包材的照料方式
MORIÉ 植物研究工房|MORIÉ botanical studio|MORIÉ 植物の工房|MORIÉ 식물 작업실
原料來源|Ingredient origins|原料の産地|원료의 출처
從一片葉的產季，|Start with seasons|流行ではなく|유행보다|從植物產季
而不是流行開始。|not trends|植物の季節から|식물의 계절에서|理解原料
我們優先與能清楚說明產地、採收與處理方式的小規模供應者合作。馬告、紫蘇、茶籽與紅藜，並非為了堆疊「在地」標籤，而是因為它們在這座島嶼的氣候裡展現獨特而真實的性格。|Know where each plant grows and how it is harvested and processed|産地と収穫と加工を理解して原料を選ぶ|산지와 수확과 가공 방식을 이해하고 원료를 고릅니다|理解每項原料的產地 採收與處理方式
原料抵達後，我們記錄色澤、氣味與批次差異，再用適合的方式萃取。植物不必每一次都長得一模一樣，安全標準與感官細節卻必須清楚。|Record each batch and choose an extraction method that suits it|ロットの色と香りを記録して抽出方法を選ぶ|배치마다 색과 향을 기록하고 추출 방법을 고릅니다|記錄色澤 氣味與批次差異 選擇適合的萃取方式
MORIÉ 原創保養瓶器|MORIÉ skincare bottles|MORIÉ スキンケアの瓶|MORIÉ 스킨케어 용기
製作哲學|Our approach|ものづくりの考え|제작 철학
配方的克制，|Less in each formula|処方を絞るために|간결한 배합에|精簡配方
來自更長的思考。|more thought behind it|じっくり考える|더 깊은 고민을|來自細緻思考
我們不以成分數量衡量效果。每一項原料都需要回答三件事：它為什麼存在、適合誰，以及能否用更少的負擔抵達相同目的。|Each ingredient needs a clear purpose and a clear place in daily care|すべての原料に役割と使う理由を|모든 원료에는 분명한 목적과 사용 이유가 필요합니다|每項原料都需要明確用途與適用對象
配方經過穩定性、相容性與使用感測試；香氣則維持在不掩蓋身體的程度。保養應該陪伴生活，而不是要求生活配合它。|Care should fit everyday life with a balanced texture and subtle scent|使い心地と穏やかな香りで暮らしに寄り添う|편안한 사용감과 은은한 향으로 일상에 맞춥니다|以使用感與淡雅氣味陪伴日常
03 · 永續資訊設計|03 Sustainability information|03 環境への取り組み|03 지속가능성 정보|03 永續資訊
不放沒有依據的數字，|Clear choices|根拠のある選択を|근거 있는 선택을|有依據的選擇
只呈現可以核對的選擇。|you can verify|確かめられる形で|확인할 수 있게|才能清楚核對
包材|Packaging|包材|포장
材質說明|Materials|素材の説明|소재 안내
展示如何整理包材材質 拆解方式與回收提醒|Show materials and recycling guidance|素材と分別と回収方法を示す|소재와 분리 및 재활용 방법 안내
補充|Refills|詰め替え|리필
測試狀態|Testing status|検証状況|테스트 상태
未完成驗證的補充方案只標示為測試 不宣稱已經上線|Unverified refill options stay labeled as tests|未検証の詰め替えはテストと明記|검증 전 리필은 테스트로 표시
紀錄|Records|記録|기록
公開依據|Sources|公開資料|공개 근거
正式品牌可在此提供來源 年度紀錄與更新日期|A place for sources reports and update dates|出典と年間記録と更新日を掲載|출처와 연간 기록 및 수정일 공개
MORIÉ 晨光瓶器靜物|MORIÉ bottles in morning light|朝の光とMORIÉの瓶|아침빛 속 MORIÉ 용기
A QUIET INVITATION|A quiet invitation|静かな招待|조용한 초대|日常邀請
從一款真正需要的配方開始。|Start with what you need|必要なひとつから|필요한 한 가지부터
探索 MORIÉ|Explore MORIÉ|MORIÉ を見る|MORIÉ 둘러보기
品牌故事|Our story|ブランドストーリー|브랜드 이야기
認識 MORIÉ 的原料來源、製作哲學與永續承諾。|Ingredients approach and responsible choices|原料とものづくりと責任ある選択|원료와 제작 철학 및 책임 있는 선택
登入連結已模擬寄出，正式串接會員系統後即可啟用。|Demo only no sign-in email was sent|デモのためログインメールは送信されません|데모이므로 로그인 메일은 전송되지 않았어요|展示模式 不會寄送登入郵件
請輸入有效的電子郵件地址。|Enter a valid email|有効なメールアドレスを入力|올바른 이메일을 입력하세요
MORIÉ ACCOUNT|MORIÉ account|MORIÉ アカウント|MORIÉ 계정|MORIÉ 帳戶
把你的日常配方，|Your daily care|日々のケアを|일상 케어를|日常配方
安靜地收在一處。|in one place|ひとつの場所に|한곳에|收藏在一處
登入後可查看訂單、收藏配方與管理門市諮詢預約。本提案版本使用無密碼登入示意。|Preview account access for orders and saved products|注文とお気に入りを管理するログインのデモ|주문과 관심 제품을 관리하는 로그인 데모|展示訂單與配方收藏的登入介面
會員登入|Sign in|ログイン|로그인
以電子郵件繼續|Continue with email|メールで続ける|이메일로 계속
電子郵件地址|Email address|メールアドレス|이메일 주소
傳送登入連結|Try sign-in|ログインを試す|로그인 체험|體驗登入
繼續即表示你同意 MORIÉ 的會員與隱私條款示範。|Demo only no account is created|デモのためアカウントは作成されません|데모이므로 계정은 생성되지 않아요|展示模式 不會建立帳戶
請輸入有效的電子郵件|Enter a valid email|有効なメールアドレスを入力|올바른 이메일을 입력하세요
請填寫收件人姓名|Enter the recipient name|受取人名を入力|받는 분 이름을 입력하세요
請輸入 09 開頭的 10 碼手機|Enter a 10 digit Taiwan mobile starting with 09|09から始まる台湾の携帯番号10桁を入力|09로 시작하는 대만 휴대전화 10자리 입력
請選擇縣市|Choose a city|市を選択|도시를 선택하세요
請填寫鄉鎮市區|Enter a district|地区を入力|구역을 입력하세요
請填寫完整地址|Enter a complete address|住所を最後まで入力|전체 주소를 입력하세요
請輸入 16 碼測試卡號|Enter 16 test digits|テスト用の16桁を入力|테스트용 숫자 16자리 입력
格式為 MM/YY|Use MM/YY|MM/YY形式で入力|MM/YY 형식으로 입력
請輸入 3 碼安全碼|Enter 3 test digits|テスト用の3桁を入力|테스트용 숫자 3자리 입력
ORDER DEMONSTRATION COMPLETE|Demo complete|デモ完了|데모 완료|展示完成
謝謝你，這段購物旅程已完成。|Your demo order is complete|注文デモが完了しました|주문 데모를 완료했어요|購物體驗已完成
模擬訂單|Demo order|デモ注文|데모 주문
已建立。本展示不會進行實際扣款或配送。|No payment or delivery will take place|決済や配送は行われません|실제 결제나 배송은 진행되지 않아요|不會實際扣款或配送
繼續探索配方|Continue shopping|商品を探す|계속 둘러보기
CHECKOUT|Checkout|購入手続き|결제|結帳
購物袋裡還沒有配方。|Your bag is empty|バッグは空です|쇼핑백이 비어 있어요|購物袋還是空的
挑選一件適合現在日常的產品，再回到這裡完成流程。|Add a product to try checkout|商品を追加して購入デモへ|제품을 담고 결제를 체험하세요|先選一件商品 再體驗結帳
繼續選購|Keep shopping|買い物を続ける|쇼핑 계속하기
SECURE DEMO CHECKOUT|Demo checkout|購入デモ|결제 데모|結帳展示
配送與付款|Delivery and payment|配送とお支払い|배송 및 결제
聯絡資訊|Contact details|連絡先|연락처
電子郵件|Email|メール|이메일
收件人姓名|Recipient|受取人|받는 분
手機號碼|Mobile number|携帯番号|휴대전화
配送地址|Delivery address|配送先|배송 주소
宅配到府|Home delivery|自宅配送|자택 배송
2—3 個工作日|2 to 3 working days|2〜3営業日|영업일 2~3일
門市取貨|Store pickup|店舗受け取り|매장 수령
可於三間 MORIÉ 門市取件|Pick up at a MORIÉ store|MORIÉの店舗で受け取り|MORIÉ 매장에서 수령
縣市|City|市|도시
請選擇|Choose|選択|선택
台北市|Taipei|台北市|타이베이시
新北市|New Taipei|新北市|신베이시
台中市|Taichung|台中市|타이중시
高雄市|Kaohsiung|高雄市|가오슝시
其他縣市|Other city|その他の市|다른 도시
鄉鎮市區|District|地区|구역
街道與門牌|Street address|番地までの住所|상세 주소
模擬付款|Test payment|テスト決済|테스트 결제
此處僅展示付款介面，不會傳送或儲存任何卡片資料。可輸入任意 16 碼完成測試。|Use test digits only no card data is sent or stored|テスト用の数字のみ入力 カード情報は送信も保存もされません|테스트 숫자만 입력하세요 카드 정보는 전송하거나 저장하지 않아요|請使用測試數字 不會傳送或儲存卡片資料
卡片號碼|Test card number|テストカード番号|테스트 카드 번호
有效期限|Expiry|有効期限|유효기간
安全碼|Security code|セキュリティコード|보안 코드
完成模擬訂單 ·|Complete demo order|デモ注文を完了|데모 주문 완료|完成模擬訂單
點擊後僅建立前端完成畫面，不會產生實際交易。|Demo only no real transaction|デモのみで実際の取引はありません|데모이며 실제 거래는 발생하지 않아요|展示流程 不會產生實際交易
訂單摘要|Order summary|注文内容|주문 요약
你的選擇|Your selection|選んだ商品|선택한 제품
· 數量|Quantity|数量|수량|數量
小計|Subtotal|小計|소계
運費|Shipping|送料|배송비
免費|Free|無料|무료
合計|Total|合計|합계
展示模式 不會送出或儲存資料|Demo only no data is sent or saved|デモのため送信も保存もされません|데모이며 데이터는 전송하거나 저장하지 않아요
查看展示說明|View demo notice|デモの説明を見る|데모 안내 보기
查看{0}|View {0}|{0}を見る|{0} 보기
{0}情境商品圖|{0} product image|{0}の商品画像|{0} 제품 이미지
快速加入{0}|Add {0} to bag|{0}をバッグに追加|{0} 쇼핑백에 담기
加入|Add|追加|담기
{0}商品情境|{0} product scene|{0}のイメージ|{0} 제품 이미지
{0}植物與材質情境|{0} plants and textures|{0}の植物と質感|{0} 식물과 질감
MORIÉ FORMULA|MORIÉ formula|MORIÉ の処方|MORIÉ 배합|MORIÉ 配方
選擇容量|Size|サイズ|용량
減少數量|Decrease quantity|数量を減らす|수량 줄이기
增加數量|Increase quantity|数量を増やす|수량 늘리기
加入購物袋|Add to bag|バッグに追加|쇼핑백에 담기
香氣|Scent|香り|향
調，層次安靜而悠長|with a soft lingering finish|穏やかに続く余韻|은은하게 남는 여운|調 留下安靜餘韻
質地|Texture|テクスチャー|질감
適用膚質|Skin type|肌タイプ|피부 타입
使用方式|How to use|使い方|사용법
主要成分|Key ingredients|主な成分|주요 성분
注意事項|Care notes|ご注意|주의사항
配送與退換|Delivery and returns|配送と返品|배송 및 반품
台灣本島約 2—3 個工作日送達。未拆封商品可於到貨後七日內聯繫退換。|Taiwan delivery in 2 to 3 working days Contact us within 7 days for unopened returns|台湾本島は2〜3営業日で配送 未開封品の返品は到着後7日以内にご連絡ください|대만 본섬 배송은 영업일 2~3일 미개봉 반품은 수령 후 7일 이내 문의
仍在選擇？|Need help choosing|選び方のご相談|선택이 어려우신가요
預約門市配方諮詢|Find a store|店舗を探す|매장 찾기
配方筆記|Formula notes|処方ノート|배합 노트
每一批植物萃取會因產季而呈現細微色澤與氣味差異。這些差異不是瑕疵，而是原料真實的時間記號。|Seasonal botanicals may vary slightly in color and scent|植物の色や香りは季節やロットで多少異なります|식물 성분은 계절과 배치에 따라 색과 향이 조금 달라질 수 있어요|植物色澤與氣味可能隨產季略有不同
一同使用|Pair with|一緒に使う|함께 쓰기
完成這段日常儀式|Complete your routine|日々のケアを整える|일상 케어 완성하기
全部|All|すべて|전체
類別|Category|カテゴリー|분류
草本|Herbal|ハーブ|허브
木質|Woody|ウッディ|우디
柑橘|Citrus|シトラス|시트러스
花香|Floral|フローラル|플로럴
無香|Unscented|無香料|무향
膚質|Skin type|肌タイプ|피부 타입
全膚質|All skin types|すべての肌|모든 피부
乾性|Dry|乾燥肌|건성
混合性|Combination|混合肌|복합성
敏感性|Sensitive|敏感肌|민감성
價格|Price|価格|가격
1,200 以下|Under NT$1,200|NT$1,200未満|NT$1,200 미만
1,200—2,000|NT$1,200 to 2,000|NT$1,200〜2,000|NT$1,200~2,000
2,000 以上|Over NT$2,000|NT$2,000超|NT$2,000 초과
篩選|Filters|絞り込み|필터
項配方|formulas|商品|개 제품
排序|Sort|並べ替え|정렬
精選推薦|Featured|おすすめ|추천순
價格由低至高|Price low to high|価格が低い順|낮은 가격순
價格由高至低|Price high to low|価格が高い順|높은 가격순
名稱|Name|商品名|이름순
關閉篩選|Close filters|絞り込みを閉じる|필터 닫기
搜尋：|Search|検索|검색|搜尋
清除|Clear|クリア|지우기
清除所有篩選|Reset filters|絞り込みを解除|필터 초기화
查看|View|表示|보기
項結果|results|件|개 결과
沒有完全符合的配方|No matching formulas|該当する商品がありません|조건에 맞는 제품이 없어요
試著放寬一項篩選條件，或回到完整系列。|Try fewer filters|条件を減らしてお試しください|필터를 줄여 보세요|試著減少篩選條件
依照日常|By routine|日々のケアから|일상별
晨間潔淨|Morning cleansing|朝の洗顔|아침 세안
夜間修護|Night care|夜のケア|나이트 케어
身體儀式|Body care|ボディケア|바디 케어
空間香氣|Room fragrance|空間の香り|공간의 향
依照膚況|By skin type|肌の状態から|피부별
乾燥與缺水|Dry and dehydrated|乾燥と水分不足|건조하고 수분 부족
敏感與脆弱|Sensitive skin|敏感な肌|민감한 피부
混合與不穩定|Combination skin|混合肌|복합성 피부
所有膚質|All skin types|すべての肌|모든 피부
本月選讀|This month|今月の読みもの|이달의 이야기
關閉購物袋|Close bag|バッグを閉じる|쇼핑백 닫기
購物袋|Shopping bag|ショッピングバッグ|쇼핑백
再添 {0} 即享免運|{0} away from free shipping|あと{0}で送料無料|무료 배송까지 {0}
已達免運門檻|Free shipping unlocked|送料無料になりました|무료 배송 적용
正在整理你的選擇…|Loading your bag|バッグを確認中|쇼핑백 불러오는 중|正在整理購物袋
購物袋仍是一片留白|Your bag is empty|バッグは空です|쇼핑백이 비어 있어요
從一款日常配方開始。|Start with everyday care|日々のケアから|일상 케어부터
移除|Remove|削除|삭제
運費將於下一步依配送方式計算。|Shipping calculated at checkout|送料は購入手続きで計算|배송비는 결제 단계에서 계산|運費於結帳時計算
前往模擬結帳|Demo checkout|購入デモへ|결제 데모로
搜尋產品|Search products|商品を検索|제품 검색
關閉搜尋|Close search|検索を閉じる|검색 닫기
我想尋找|Find your care|ケアを探す|제품 찾기
輸入配方、香氣或膚質|Product scent or skin type|商品や香りや肌タイプ|제품이나 향 또는 피부 타입
熱門搜尋|Popular searches|よく検索される言葉|인기 검색
木質香氣|Woody scent|ウッディな香り|우디 향
乾性肌膚|Dry skin|乾燥肌|건성 피부
旅行組|Travel set|トラベルセット|트래블 세트
推薦分類|Browse categories|カテゴリーから探す|분류별 보기
{0} 項結果|{0} results|{0}件|{0}개 결과
沒有相符結果|No results|見つかりません|검색 결과가 없어요
試試「草本」、「保濕」或「香氛」。|Try herbal hydration or fragrance|ハーブや保湿や香りで検索|허브나 보습 또는 향수로 검색|試試草本 保濕或香氛
全台配送滿 NT$2,200 免運|Free Taiwan shipping over NT$2,200|台湾内はNT$2,200以上で送料無料|대만 내 NT$2,200 이상 무료 배송
預約門市香氣諮詢|Explore our stores|店舗を見る|매장 둘러보기|查看門市諮詢
開啟選單|Open menu|メニューを開く|메뉴 열기
主要導覽|Main navigation|メインメニュー|주 메뉴
選購|Shop|商品|쇼핑
關於 MORIÉ|About MORIÉ|MORIÉ について|MORIÉ 소개
工具導覽|Shop tools|ショッピング機能|쇼핑 도구
搜尋|Search|検索|검색
帳戶|Account|アカウント|계정
門市|Stores|店舗|매장
購物袋，共 {0} 件商品|Bag quantity {0}|バッグに{0}点の商品|쇼핑백에 제품 {0}개
商品分類|Product categories|商品カテゴリー|제품 분류
夜間儀式|Evening ritual|夜のケア|저녁 케어
在夜色裡，讓肌膚慢慢回來|Quiet care after dark|夜に肌を整える|밤에 차분히 돌보는 피부|夜裡慢慢修護
關閉選單|Close menu|メニューを閉じる|메뉴 닫기
週一至週五 10:00—18:00|Mon to Fri 10:00 to 18:00|月〜金 10:00〜18:00|월~금 10:00~18:00
山林來信|Forest notes|森からの便り|숲의 소식
接收配方、植物與空間的緩慢消息。|Notes on care and nature|ケアと自然の便り|케어와 자연의 소식|配方與植物的日常來信
訂單與協助|Orders and help|注文とサポート|주문 및 도움말
配送與結帳|Delivery and checkout|配送と購入手続き|배송 및 결제
訂單查詢|My orders|注文の確認|주문 조회
聯絡我們|Contact us|お問い合わせ|문의하기
門市諮詢|Store advice|店舗への相談|매장 상담
禮盒與贈禮|Gifts|ギフト|선물
理念|Our principles|私たちの考え|우리의 생각
不以「天然」作為簡化的承諾。我們揭露配方思考、原料來源與包材選擇，讓每一次購買更清楚。|Clear information on formulas ingredients and packaging|処方と原料と包材をわかりやすく|배합과 원료와 포장을 명확하게 안내|清楚說明配方 原料與包材選擇
永續承諾|Responsible choices|環境への取り組み|책임 있는 선택
聯絡|Contact|連絡先|연락처
台灣 · NT$ · 繁體中文|Taiwan NT$ English|台湾 NT$ 日本語|대만 NT$ 한국어
僅供品牌設計提案與電商流程展示|Brand concept and shopping demo|ブランド提案と購入体験のデモ|브랜드 콘셉트 및 쇼핑 데모
品牌概念展示 商店 門市 優惠與聯絡資料皆為示意|Concept demo with sample stores offers and contacts|店舗と特典と連絡先は展示用の架空情報です|매장과 혜택과 연락처는 데모용 가상 정보입니다|品牌概念展示 所有商店與聯絡資訊均為示意
台北|Taipei|台北|타이베이
台中|Taichung|台中|타이중
高雄|Kaohsiung|高雄|가오슝
依城市篩選|Filter by city|都市で絞り込み|도시별 필터
{0}地圖位置示意|{0} sample map|{0}の地図イメージ|{0} 지도 예시
N|N|北|북|北
MORIÉ · TAIWAN|MORIÉ Taiwan|MORIÉ 台湾|MORIÉ 대만|MORIÉ 台灣
選擇{0}|Select {0}|{0}を選択|{0} 선택
目前選擇|Selected store|選択中の店舗|선택한 매장
在 Google 地圖開啟|Open in Google Maps|Google マップで開く|Google 지도에서 열기
森映植萃研究所|MORIÉ Botanical Studio|MORIÉ 植物研究所|MORIÉ 식물 연구소
循著植物的緩慢時間|At the pace of plants|植物のリズムで|식물의 속도로
以台灣山林氣息與日常肌理為靈感，調製克制、感官而清晰的植物保養配方。|Botanical care inspired by Taiwan forests|台湾の森に着想を得た植物のケア|대만 숲에서 영감을 얻은 식물 성분 케어
全系列|All products|全商品|전체 제품
不適用|Not applicable|対象外|해당 없음
MORIÉ 青田所|MORIÉ Qingtian|MORIÉ 青田店|MORIÉ 칭톈점
台北市大安區青田街 7 巷 12 號|12 Lane 7 Qingtian St Daan Taipei|台北市大安区青田街7巷12号|타이베이시 다안구 칭톈가 7항 12호
每日 11:00—20:00|Daily 11:00 to 20:00|毎日 11:00〜20:00|매일 11:00~20:00
MORIÉ 柳川所|MORIÉ Liuchuan|MORIÉ 柳川店|MORIÉ 류촨점
台中市西區民生北路 38 號|38 Minsheng N Rd West District Taichung|台中市西区民生北路38号|타이중시 서구 민성북로 38호
週二至週日 11:00—19:30|Tue to Sun 11:00 to 19:30|火〜日 11:00〜19:30|화~일 11:00~19:30
MORIÉ 鹽埕所|MORIÉ Yancheng|MORIÉ 塩埕店|MORIÉ 옌청점
高雄市鹽埕區新樂街 41 號|41 Xinle St Yancheng Kaohsiung|高雄市塩埕区新楽街41号|가오슝시 옌청구 신러가 41호
每日 12:00—20:00|Daily 12:00 to 20:00|毎日 12:00〜20:00|매일 12:00~20:00
`

export const messages: Messages = { ...contentMessages, ...Object.fromEntries(rows.trim().split("\n").map((row) => {
  const [source, en, ja, ko, zh] = row.split("|")
  return [source, [zh ?? tidyCopy(source), en, ja, ko]]
})) }
