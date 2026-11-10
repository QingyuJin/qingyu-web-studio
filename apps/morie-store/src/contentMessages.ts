import { tidyCopy, type Messages } from "../../showcase-i18n/core"

const rows = `
植萃潔顏露|Botanical cleansing gel|植物由来の洗顔ジェル|식물성 클렌징 젤
低泡沫、清爽而不帶走肌膚原有水分。|Low foam cleansing that preserves moisture|うるおいを守る低泡の洗顔|수분을 지키는 저거품 세안
以山胡椒葉、茶籽與胺基酸潔淨因子調和，洗去一日塵囂，留下微微濕潤的乾淨觸感。|Litsea leaves tea seed and amino acid cleansers leave skin clean and lightly hydrated|アオモジの葉と茶実とアミノ酸洗浄成分でうるおいを残して洗う|산후추 잎과 차씨 및 아미노산 세정 성분으로 촉촉하게 세안
透明凝露，細緻低泡|Clear gel with fine low foam|透明ジェルときめ細かな泡|투명 젤과 섬세한 저거품
早晚取一枚硬幣大小，於濕潤掌心揉開，按摩臉部後以溫水洗淨。|Work a coin sized amount between wet hands Massage and rinse with lukewarm water|朝晩適量を濡れた手でなじませて洗顔しぬるま湯で流す|아침저녁 젖은 손에 동전 크기만큼 덜어 세안 후 미온수로 헹구세요
茶籽油、山胡椒葉純露、甜菜鹼、椰油醯胺基酸。|Tea seed oil litsea leaf water betaine and coconut amino acid cleanser|茶実油 アオモジ葉水 ベタイン ヤシ由来アミノ酸洗浄成分|차씨 오일 산후추 잎 워터 베타인 코코넛 아미노산 세정 성분
僅供外用。使用時若有不適請停止使用並洽詢專業人員。|External use only Stop if irritation occurs and seek professional advice|外用のみ 異常が出たら使用を中止し専門家に相談|외용 전용 이상이 생기면 사용을 중단하고 전문가에게 문의하세요
日常首選|Daily essential|日々の定番|일상 필수품
平衡調理液|Balancing toner|バランシング化粧水|밸런싱 토너
為洗後肌膚補回水分，平衡表層觸感。|Restore moisture after cleansing|洗顔後の肌にうるおいを|세안 후 수분 보충
橙花水與白柳樹皮共同帶來清新收斂感，適合潮濕氣候下的早晚調理。|Orange blossom water and white willow bark for fresh daily toning|オレンジ花水とセイヨウシロヤナギ樹皮ですっきり整える|오렌지꽃 워터와 흰버드나무 껍질로 산뜻하게 정돈
水感，迅速吸收|Light watery texture|みずみずしくなじむ質感|가볍게 흡수되는 워터 타입
潔面後倒於掌心或化妝棉，輕按全臉與頸部。|After cleansing press gently onto face and neck|洗顔後に手やコットンで顔と首になじませる|세안 후 손이나 화장솜으로 얼굴과 목에 가볍게 흡수시키세요
橙花純露、白柳樹皮、甘油、泛醇。|Orange blossom water white willow bark glycerin and panthenol|オレンジ花水 セイヨウシロヤナギ樹皮 グリセリン パンテノール|오렌지꽃 워터 흰버드나무 껍질 글리세린 판테놀
含植物萃取，氣味與色澤可能因批次略有不同。|Botanical color and scent may vary between batches|植物成分の色と香りはロットで多少異なります|식물 성분의 색과 향은 배치마다 조금 다를 수 있어요
夜間修護精華|Night repair serum|夜用リペア美容液|나이트 리페어 세럼
在夜色裡，讓乾燥與疲倦慢慢退去。|Quiet overnight care for dry skin|乾燥した肌を夜にやさしくケア|건조한 피부를 위한 차분한 나이트 케어
以神經醯胺、角鯊烷與台灣紅藜萃取構成輕盈修護網，陪伴肌膚度過安靜夜晚。|Light evening care with ceramides squalane and Taiwan red quinoa|セラミドとスクワランと台湾紅キヌアの軽やかな夜用ケア|세라마이드와 스쿠알란 및 대만 홍퀴노아의 가벼운 나이트 케어
輕柔乳狀精華|Light milky serum|軽やかなミルク状美容液|가벼운 밀크 타입 세럼
晚間調理後取二至三滴，均勻按壓於臉部與頸部。|At night press 2 to 3 drops onto face and neck after toner|夜の化粧水後に2〜3滴を顔と首になじませる|저녁 토너 사용 후 2~3방울을 얼굴과 목에 흡수시키세요
植物角鯊烷、神經醯胺、紅藜萃取、維生素原 B5。|Plant squalane ceramides red quinoa and provitamin B5|植物スクワラン セラミド 紅キヌア プロビタミンB5|식물성 스쿠알란 세라마이드 홍퀴노아 프로비타민 B5
初次使用建議先於耳後局部測試。|Patch test behind the ear before first use|初めて使う前に耳の後ろでパッチテスト|처음 사용 전 귀 뒤에 패치 테스트하세요
編輯精選|Editor pick|編集部おすすめ|에디터 추천
深層保濕乳霜|Deep hydration cream|高保湿クリーム|딥 보습 크림
豐潤卻不厚重，為乾燥肌膚覆上一層柔軟。|Rich comfort without a heavy feel|重すぎず乾燥肌をしっとり包む|무겁지 않게 건조한 피부를 부드럽게
山茶籽油與燕麥脂質帶來綿長滋潤，尾韻是一絲野薑花與潮濕木質。|Camellia oil and oat lipids with soft ginger lily and woody notes|ツバキ油とオーツ脂質にジンジャーリリーと木の香り|동백씨 오일과 귀리 지질에 은은한 생강꽃과 우디 향
豐潤霜體，柔滑收尾|Rich cream with a smooth finish|なめらかに仕上がる濃厚クリーム|부드럽게 마무리되는 리치 크림
早晚於精華後取適量，從臉部中央向外輕柔推勻。|Use after serum morning and night Smooth outward from the center of the face|朝晩の美容液後に顔の中心から外側へなじませる|아침저녁 세럼 후 얼굴 중앙에서 바깥쪽으로 펴 바르세요
山茶籽油、燕麥脂質、乳木果脂、玻尿酸。|Camellia oil oat lipids shea butter and hyaluronic acid|ツバキ油 オーツ脂質 シア脂 ヒアルロン酸|동백씨 오일 귀리 지질 시어버터 히알루론산
請避開眼周，並置於陰涼處保存。|Avoid the eye area Store in a cool place|目の周りを避け涼しい場所で保管|눈가를 피하고 서늘한 곳에 보관하세요
芳香護手霜|Aromatic hand balm|アロマハンドバーム|아로마 핸드 밤
滋養雙手，留下檜木與香根草的安定氣息。|Soft hands with hinoki and vetiver|ヒノキとベチバーの香りで手肌をケア|히노키와 베티버 향으로 손을 촉촉하게
為頻繁清潔後的雙手而作，揉合米糠油與植物蠟，吸收後不留黏膩。|Rice bran oil and plant wax for clean hands without a sticky finish|米ぬか油と植物ワックスでべたつかず手肌を整える|쌀겨 오일과 식물성 왁스로 끈적임 없이 손 관리
柔潤膏霜，乾爽收尾|Soft balm with a dry finish|さらりと仕上がる柔らかなバーム|산뜻하게 마무리되는 부드러운 밤
需要時取適量按摩雙手，特別照顧指緣與掌心。|Massage into hands and cuticles as needed|必要なときに手のひらや爪周りになじませる|필요할 때 손과 손톱 주변에 마사지하세요
米糠油、檜木葉、香根草、植物甘油。|Rice bran oil hinoki leaf vetiver and vegetable glycerin|米ぬか油 ヒノキ葉 ベチバー 植物性グリセリン|쌀겨 오일 히노키 잎 베티버 식물성 글리세린
避免接觸眼睛與傷口。|Avoid eyes and broken skin|目や傷口を避ける|눈과 상처 부위를 피하세요
人氣配方|Bestseller|人気の処方|인기 제품
草本身體潔膚露|Herbal body cleanser|ハーブボディクレンザー|허브 바디 클렌저
以溫和泡沫清潔，喚醒潮濕山徑般的氣息。|Gentle cleansing with a fresh forest scent|穏やかな泡と森の香り|부드러운 거품과 싱그러운 숲 향
紫蘇、馬告與雪松構成清朗草本調，適合晨間淋浴或漫長一日之後。|Perilla litsea and cedar for a fresh herbal shower|シソとアオモジとシダーの爽やかなシャワー|차조기와 산후추 및 시더우드의 상쾌한 샤워
流動凝露，柔細泡沫|Fluid gel with soft foam|柔らかな泡のジェル|부드러운 거품의 흐르는 젤
倒於濕潤掌心或沐浴巾，按摩全身後沖淨。|Lather on wet hands or a cloth Massage over the body and rinse|濡れた手やタオルで泡立て全身を洗って流す|젖은 손이나 타월로 거품을 내어 전신에 마사지 후 헹구세요
紫蘇葉、山胡椒果、雪松精油、胺基酸潔淨因子。|Perilla leaf litsea fruit cedar oil and amino acid cleansers|シソ葉 アオモジ果実 シダー精油 アミノ酸洗浄成分|차조기 잎 산후추 열매 시더우드 오일 아미노산 세정 성분
孕期或對精油敏感者請先諮詢專業人員。|Seek professional advice if pregnant or sensitive to essential oils|妊娠中や精油に敏感な方は専門家に相談|임신 중이거나 에센셜 오일에 민감하면 전문가에게 문의하세요
木質調淡香精|Woody eau de parfum|ウッディオードパルファム|우디 오드퍼퓸
檜木、岩蘭草與焚香，在皮膚上留下緩慢回聲。|Hinoki vetiver and incense close to skin|肌に残るヒノキとベチバーと香|피부에 남는 히노키와 베티버 및 인센스
不是一座具體的森林，而是記憶中雨停後的深色木門與溫熱石階。|A memory of rain on dark wood and warm stone|雨上がりの木の扉と温かな石段の記憶|비 갠 뒤 짙은 나무문과 따뜻한 돌계단의 기억
淡香精噴霧|Eau de parfum spray|オードパルファムスプレー|오드퍼퓸 스프레이
輕噴於手腕、頸側或衣物內側，讓香氣隨體溫展開。|Spray lightly on wrists neck or inside clothing|手首や首元や衣服の内側に軽くスプレー|손목이나 목 또는 옷 안쪽에 가볍게 뿌리세요
檜木、岩蘭草、乳香、苦橙葉香氣複方。|Hinoki vetiver frankincense and petitgrain|ヒノキ ベチバー フランキンセンス プチグレン|히노키 베티버 프랑킨센스 페티그레인
易燃品，請遠離火源並避免陽光直射。|Flammable Keep away from flames and direct sunlight|可燃性 火気と直射日光を避ける|인화성 화기와 직사광선을 피하세요
新作|New|新作|신제품
室內芳香噴霧|Room aroma mist|ルームアロマミスト|룸 아로마 미스트
青柚、月桂與舊木，為空間留下一段清醒停頓。|Green pomelo bay and wood for a fresh space|青い柚子と月桂樹と木で空間を爽やかに|풋자몽과 월계수 및 나무 향으로 산뜻한 공간
適合工作桌、玄關或入夜前的房間，三至四次按壓即可轉換空氣的章節。|Three or four sprays for a desk hallway or evening room|デスクや玄関や夜の部屋に3〜4プッシュ|책상이나 현관 또는 저녁 방에 3~4회 분사
細緻霧化噴霧|Fine mist|細かなミスト|고운 미스트
朝空間中央噴灑，避免直接接觸織品、木器與肌膚。|Spray into open air Avoid fabrics wood and skin|空間に向けて噴霧し布や木や肌への直接使用は避ける|허공에 분사하고 천이나 목재 및 피부에 직접 닿지 않게 하세요
青柚、月桂葉、癒創木香氣複方。|Green pomelo bay leaf and guaiac wood|青い柚子 月桂樹葉 グアヤクウッド|풋자몽 월계수 잎 과이악우드
請置於兒童與寵物無法取得處，勿直接吸入。|Keep away from children and pets Do not inhale directly|子どもやペットの手が届かない場所に保管し直接吸い込まない|어린이와 반려동물의 손이 닿지 않게 보관하고 직접 흡입하지 마세요
旅行保養組|Travel care set|トラベルケアセット|트래블 케어 세트
四件組|4 piece set|4点セット|4종 세트
把熟悉的潔淨、調理與滋養，收進旅途。|Your daily care on the go|いつものケアを旅先へ|익숙한 일상 케어를 여행에서도
內含潔顏露、調理液、夜間精華與護手霜旅行容量，裝入可重複使用的棉麻袋。|Travel cleanser toner serum and hand balm in a reusable linen blend pouch|洗顔料と化粧水と美容液とハンドバームを再利用できる布袋に|클렌저와 토너 및 세럼과 핸드 밤을 재사용 가능한 파우치에
旅行容量組合|Travel sizes|トラベルサイズ|여행용 용량
依潔顏、調理、精華與乳霜順序使用。|Use cleanser toner serum then cream|洗顔料 化粧水 美容液 クリームの順に使用|클렌저 토너 세럼 크림 순서로 사용
四款 MORIÉ 日常配方旅行容量。|Four MORIÉ travel formulas|MORIÉのケア4種のトラベルサイズ|MORIÉ 일상 제품 4종 여행용
套組內容物不單獨販售。|Set items are not sold separately|セット内容の単品販売はありません|세트 구성품은 개별 판매하지 않아요
季節限定禮盒|Seasonal gift set|季節限定ギフト|시즌 한정 선물 세트
三件組|3 piece set|3点セット|3종 세트
以冬至為題，獻給願意與時間和解的人。|A winter solstice gift for slower days|冬至に贈るゆっくりした時間|느린 날들을 위한 동지의 선물
集合護手霜、室內芳香噴霧與限定香氛油，使用再生棉紙與植物染布包裝。|Hand balm room mist and fragrance oil wrapped in recycled paper and plant dyed cloth|ハンドバームとルームミストと香油を再生紙と草木染めの布で包む|핸드 밤과 룸 미스트 및 향 오일을 재생 종이와 천연 염색 천으로 포장
季節限定組合|Seasonal set|季節限定セット|시즌 한정 세트
依各配方標示方式使用。|Follow each product instruction|各商品の使い方に従う|각 제품 안내에 따라 사용
三款木質香調限定配方。|Three limited woody formulas|限定ウッディケア3種|한정 우디 향 제품 3종
數量有限，售完後於下一季更換內容。|Limited stock Contents change next season|数量限定 内容は次の季節に変更|한정 수량 다음 시즌에 구성 변경
季節限定|Seasonal|季節限定|시즌 한정
日常儀式|Daily rituals|日々のケア|일상의 습관
水溫，也是一種照料|The comfort of water|水温もケアのひとつ|수온도 하나의 케어
從晨間潔面到夜晚沐浴，溫度如何悄悄改變肌膚與心緒。|How water temperature shapes daily care|洗顔と入浴で水温が変える感覚|세안과 목욕에서 수온이 바꾸는 감각
4 分鐘|4 min read|4分で読めます|읽는 시간 4분
水碰觸皮膚的第一秒，日常就有了方向。過熱的水讓時間顯得倉促；微溫的水，則讓清潔成為一種緩慢返回。|Lukewarm water makes cleansing a quiet pause in the day|ぬるま湯で洗う時間が一日の静かな休息になる|미온수로 씻는 시간이 하루의 조용한 쉼이 됩니다|用微溫的水 讓清潔成為日常的停頓
接近體溫的尺度|A gentler temperature|やさしい温度|부드러운 온도
潔面時可選擇略低於體溫的水，先濕潤掌心，再讓潔顏凝露在手中舒展。這個看似多餘的停頓，能讓動作更輕，也減少反覆摩擦。|Use water just below body temperature Work cleanser in wet hands before gently washing|体温より少し低い水で手を濡らし洗顔料を広げてやさしく洗う|체온보다 조금 낮은 물로 손을 적시고 클렌저를 펴서 부드럽게 씻으세요|用略低於體溫的水 先在濕潤掌心揉開潔顏露 再輕柔洗臉
把沐浴留在門外|After the shower|シャワーのあとに|샤워 후
夜晚淋浴之後，用乾燥毛巾輕按而非來回擦拭。趁肌膚仍帶少許水氣時使用身體保養，將山林般的草本氣息留在室內，把白日的聲音留在門外。|Pat dry after showering Apply body care while skin is still slightly damp|シャワー後はタオルで軽く押さえ水分が残る肌にボディケアを|샤워 후 수건으로 가볍게 누르고 물기가 조금 남을 때 보습하세요|沐浴後用毛巾輕按 趁肌膚微濕時使用身體保養
植物札記|Plant notes|植物ノート|식물 노트
雨後植物的氣味地圖|Botanicals after rain|雨上がりの植物の香り|비 온 뒤 식물의 향
馬告、紫蘇與檜木不是配方清單，而是島嶼濕度留下的座標。|Litsea perilla and hinoki trace the scent of Taiwan|アオモジとシソとヒノキでたどる台湾の香り|산후추와 차조기 및 히노키로 만나는 대만의 향
6 分鐘|6 min read|6分で読めます|읽는 시간 6분
植物的香氣從來不是孤立的。它與土壤、雨量、採集時刻，以及手指揉開葉片的力度一起發生。|Soil rain and harvest time all shape a plant scent|土と雨と収穫の時が植物の香りをつくる|토양과 비와 수확 시기가 식물의 향을 만듭니다|土壤 雨量與採集時刻 共同形成植物的香氣
從產地到氣味|From origin to scent|産地から香りへ|산지에서 향으로
我們向小規模農作夥伴採購可追溯原料，先理解每一季植物的差異，再決定萃取方式。標準不是把自然磨平，而是讓安全與變化找到平衡。|Understand seasonal changes before choosing how to extract each botanical|季節の違いを理解して植物に合う抽出方法を選ぶ|계절의 차이를 이해한 뒤 식물에 맞는 추출 방법을 고릅니다|理解植物的季節差異 再決定萃取方式
克制的調香|A restrained blend|控えめな調香|절제된 조향
馬告的明亮、紫蘇的青綠、檜木的乾燥木質，各自都很有性格。調香的工作不是讓它們彼此蓋過，而是留出能呼吸的距離。|Bright litsea green perilla and dry hinoki each need room in a blend|明るいアオモジと青いシソと乾いたヒノキの間に余白を残す|밝은 산후추와 푸른 차조기 및 마른 히노키가 각자의 향을 내도록 여백을 둡니다|讓馬告 紫蘇與檜木各自保有氣味的空間
空間與感官|Spaces and senses|空間と感覚|공간과 감각
為緩慢時刻留一個房間|A room for slower hours|ゆっくり過ごす部屋|느린 시간을 위한 방
關於光、木材與氣味，如何讓一處空間成為身體的休止符。|Light wood and scent make room for rest|光と木と香りで休める空間を|빛과 나무와 향으로 쉬어가는 공간
5 分鐘|5 min read|5分で読めます|읽는 시간 5분
我們喜歡會留下時間痕跡的材料。木頭變深、石材磨亮、紙張捲起邊角——空間因此不是完成品，而是一段持續發生的生活。|Wood stone and paper change with time A room grows with the life inside it|木と石と紙は時とともに変わり空間も暮らしとともに育つ|나무와 돌과 종이는 시간에 따라 변하고 공간도 삶과 함께 자랍니다|木頭 石材與紙張留下時間痕跡 空間也隨生活慢慢改變
低一點的光|Softer light|やわらかな光|부드러운 빛
當光線不急著照亮所有角落，視線會放慢，身體也更容易找到自己的速度。門市的燈光從牆面反射，而非直接指向人。|Soft reflected light gives the eye and body a moment to settle|壁に反射するやわらかな光が目と体を落ち着かせる|벽에 반사되는 부드러운 빛이 눈과 몸에 여유를 줍니다|讓光從牆面反射 留下眼睛與身體休息的空間
讓香氣有出口|Room for scent|香りにも余白を|향에도 여백을
氣味需要空白。開窗、整理桌面、移除不必要的聲響，再噴灑少量空間香氣。真正舒適的房間，不會要求你立刻注意它。|Open a window clear the desk and add a little scent Comfort leaves room to breathe|窓を開け机を整えて少しだけ香りを添える 心地よさには余白がある|창문을 열고 책상을 정리한 뒤 향을 조금 더하세요 편안함에는 여백이 필요합니다|開窗 整理桌面 再添少量香氣 讓舒適保有留白
`
export const contentMessages: Messages = Object.fromEntries(rows.trim().split("\n").map((row) => {
  const [source, en, ja, ko, zh] = row.split("|")
  return [source, [zh ?? tidyCopy(source), en, ja, ko]]
}))
