import type { PageData } from "../types"

interface PageContentProps {
  page: PageData
}

export function PageContent({ page }: PageContentProps) {
  return (
    <section className="page-content" id="page-content">
      <div className="page-content__inner">
        <figure className="page-content__media">
          <img
            src={page.image}
            alt={page.imageAlt}
            width="720"
            height="520"
            loading="eager"
            decoding="async"
          />
        </figure>
        <div className="page-content__copy">
          <span>{page.contentEyebrow}</span>
          <h3>{page.contentTitle}</h3>
          <i aria-hidden="true" />
          {page.contentParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
