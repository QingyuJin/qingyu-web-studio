import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, FinalCta, PageHero, SectionHeader } from "../SiteComponents"
import { blogPosts, seoPages } from "../siteContent"

function BlogPage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.blog} />
      <PageHero eyebrow="Blog" title="文章 / 網站銳評入口">
        <p>先放接案網站常見問題與手機版銳評方向，之後可以逐步增加教學、案例拆解與 SEO 文章。</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="近期主題" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.title}>
              <h2 className="text-xl font-black leading-tight">{post.title}</h2>
              <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">{post.excerpt}</p>
              <span className="mt-5 inline-flex rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">
                draft
              </span>
            </Card>
          ))}
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  )
}

export default BlogPage
