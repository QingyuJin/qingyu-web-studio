export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  image: string;
  publishedAt: string;
  content: { heading?: string; body: string }[];
};

export const articles: Article[] = [
  {
    slug: "the-temperature-of-water",
    category: "日常儀式",
    title: "水溫，也是一種照料",
    excerpt: "從晨間潔面到夜晚沐浴，溫度如何悄悄改變肌膚與心緒。",
    readingTime: "4 分鐘",
    image: "/demo/morie/images/morie-forest.png",
    publishedAt: "2026.06.18",
    content: [
      { body: "水碰觸皮膚的第一秒，日常就有了方向。過熱的水讓時間顯得倉促；微溫的水，則讓清潔成為一種緩慢返回。" },
      { heading: "接近體溫的尺度", body: "潔面時可選擇略低於體溫的水，先濕潤掌心，再讓潔顏凝露在手中舒展。這個看似多餘的停頓，能讓動作更輕，也減少反覆摩擦。" },
      { heading: "把沐浴留在門外", body: "夜晚淋浴之後，用乾燥毛巾輕按而非來回擦拭。趁肌膚仍帶少許水氣時使用身體保養，將山林般的草本氣息留在室內，把白日的聲音留在門外。" },
    ],
  },
  {
    slug: "botanicals-after-rain",
    category: "植物札記",
    title: "雨後植物的氣味地圖",
    excerpt: "馬告、紫蘇與檜木不是配方清單，而是島嶼濕度留下的座標。",
    readingTime: "6 分鐘",
    image: "/demo/morie/images/morie-atelier.png",
    publishedAt: "2026.05.02",
    content: [
      { body: "植物的香氣從來不是孤立的。它與土壤、雨量、採集時刻，以及手指揉開葉片的力度一起發生。" },
      { heading: "從產地到氣味", body: "我們向小規模農作夥伴採購可追溯原料，先理解每一季植物的差異，再決定萃取方式。標準不是把自然磨平，而是讓安全與變化找到平衡。" },
      { heading: "克制的調香", body: "馬告的明亮、紫蘇的青綠、檜木的乾燥木質，各自都很有性格。調香的工作不是讓它們彼此蓋過，而是留出能呼吸的距離。" },
    ],
  },
  {
    slug: "a-room-for-slower-hours",
    category: "空間與感官",
    title: "為緩慢時刻留一個房間",
    excerpt: "關於光、木材與氣味，如何讓一處空間成為身體的休止符。",
    readingTime: "5 分鐘",
    image: "/demo/morie/images/morie-hero.png",
    publishedAt: "2026.03.24",
    content: [
      { body: "我們喜歡會留下時間痕跡的材料。木頭變深、石材磨亮、紙張捲起邊角——空間因此不是完成品，而是一段持續發生的生活。" },
      { heading: "低一點的光", body: "當光線不急著照亮所有角落，視線會放慢，身體也更容易找到自己的速度。門市的燈光從牆面反射，而非直接指向人。" },
      { heading: "讓香氣有出口", body: "氣味需要空白。開窗、整理桌面、移除不必要的聲響，再噴灑少量空間香氣。真正舒適的房間，不會要求你立刻注意它。" },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
