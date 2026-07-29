import { faqs, imageAssets, siteConfig, sitePath } from "../beauty-shopline/beautyShoplineData"

const pageLabels = {
  brand: "品牌故事",
  services: "護膚服務",
  products: "商品選購",
  cases: "美容案例",
  training: "培訓加盟",
  equipment: "設備與流程",
  faq: "常見問題",
  contact: "聯絡我們",
  policies: "購物與隱私政策",
}

export function buildStructuredData({ pagePath, pageKey, currentProduct, isNotFound, baseUrl }) {
  if (isNotFound) return null

  const normalizedBaseUrl = `${baseUrl.replace(/\/$/, "")}/`
  const pageUrl = new URL(pagePath, normalizedBaseUrl).href
  const homeUrl = new URL(siteConfig.route, normalizedBaseUrl).href
  const imageUrl = new URL(siteConfig.seo.image, normalizedBaseUrl).href
  const logoUrl = new URL(imageAssets.logo.src, normalizedBaseUrl).href
  const graph = []
  graph.push({
    "@type": "BeautySalon",
    "@id": `${homeUrl}#business`,
    name: siteConfig.contact.storeName,
    alternateName: siteConfig.brand.name,
    description: siteConfig.seo.description,
    image: imageUrl,
    logo: logoUrl,
    url: homeUrl,
    telephone: siteConfig.contact.phoneLabel,
    address: {
      "@type": "PostalAddress",
      streetAddress: "上海路 235 號",
      addressLocality: "嘉義市西區",
      postalCode: siteConfig.contact.postalCode,
      addressCountry: "TW",
    },
    sameAs: [siteConfig.links.facebook, siteConfig.links.instagram],
  })

  if (pageKey !== "home") {
    const breadcrumbItems = [{ "@type": "ListItem", position: 1, name: "首頁", item: homeUrl }]

    if (currentProduct) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: pageLabels.products,
        item: new URL(sitePath("products"), normalizedBaseUrl).href,
      })
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: currentProduct.name,
        item: pageUrl,
      })
    } else {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: pageLabels[pageKey],
        item: pageUrl,
      })
    }

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    })
  }

  if (pageKey === "faq") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    })
  }

  if (currentProduct) {
    graph.push({
      "@type": "Product",
      name: currentProduct.name,
      alternateName: currentProduct.englishName,
      description: currentProduct.summary,
      image: [new URL(currentProduct.image.src, normalizedBaseUrl).href],
      url: pageUrl,
      brand: {
        "@type": "Brand",
        name: siteConfig.brand.name,
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "規格",
          value: currentProduct.size,
        },
      ],
    })
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}
