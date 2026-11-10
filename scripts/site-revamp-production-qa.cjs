const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const path = require('node:path')
const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')
const origin = 'https://www.qingyuweb.com'
const root = path.resolve(__dirname, '..')
const out = path.join(root, process.env.REVAMP_PRODUCTION_OUTPUT || 'docs/site-revamp/deployment')
async function get(route, options = {}) {
  return fetch(origin + route, { signal: AbortSignal.timeout(30000), ...options })
}
async function main() {
  await fs.mkdir(out, { recursive: true })
  const { studioWorks } = await import('../apps/legacy/src/site/studioContent.js')
  const { onepageTemplates } = await import('../apps/legacy/src/onepage/onepageData.js')
  const report = { origin, checkedAt: new Date().toISOString(), publicPages: [], templates: [], products: [], browser: [], notes: ['Read-only production checks. No inquiry submissions, production data writes or email sending. Cart actions use browser-local concept data.'] }
  const routes = ['/', '/works', '/services', '/pricing', '/about', '/collaboration', '/contact', '/showcase', ...studioWorks.map(work => work.caseUrl)]
  for (let i = 0; i < routes.length; i += 8) {
    const pages = await Promise.all(routes.slice(i, i + 8).map(async route => {
      const response = await get(route)
      const html = await response.text()
      assert.equal(response.status, 200, route)
      assert.match(html, /<h1>/, route)
      assert(!html.includes('<title>Login'), route)
      assert(!/Core Detail|Question Bank/.test(html), route)
      const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1]
      assert.equal(canonical, origin + route, route + ' canonical')
      assert(!response.headers.get('x-robots-tag')?.includes('noindex'), route)
      if (route === '/') assert(html.includes('品牌網站設計與企業系統開發'))
      return { route, status: response.status, canonical, title: html.match(/<title>(.*?)<\/title>/)?.[1] }
    }))
    report.publicPages.push(...pages)
  }
  for (const template of onepageTemplates) {
    const route = '/onepage/' + template.slug
    const response = await get(route)
    assert.equal(response.status, 200, route)
    report.templates.push({ route, status: response.status })
  }
  for (const slug of ['servicedesk', 'watchtower', 'docops', 'flowdesk', 'fieldops', 'bookcrm', 'quoteflow', 'floworder']) {
    const route = studioWorks.find(work => work.slug === slug).entryPath
    const response = await get(route)
    const html = await response.text()
    assert.equal(response.status, 200, route)
    assert.match(html, /\/_next\/static\//, route)
    report.products.push({ route, status: response.status })
  }
  const inquiry = await get('/api/inquiry')
  assert.equal(inquiry.status, 405)
  assert.match(inquiry.headers.get('cache-control'), /no-store/)
  report.inquiry = { method: 'GET', status: inquiry.status, submitted: false }
  const notFound = await get('/works/interactive-quiz')
  const notFoundHtml = await notFound.text()
  assert.equal(notFound.status, 404)
  assert.match(notFoundHtml, /name="robots" content="noindex/)
  report.oldPlaceholder = { status: notFound.status, noindex: true }
  const xinjiang = await get('/demo/xinjiang')
  const xinjiangHtml = await xinjiang.text()
  assert.equal(xinjiang.status, 200)
  assert(xinjiangHtml.includes('鑫匠'))
  assert(xinjiangHtml.includes('https://xinjiang-website.vercel.app/'))
  report.xinjiang = { status: xinjiang.status, canonicalPreserved: true }
  const robots = await get('/robots.txt')
  assert.equal(robots.status, 200)
  assert((await robots.text()).includes('https://www.qingyuweb.com/sitemap.xml'))
  const sitemap = await get('/sitemap.xml')
  assert.equal(sitemap.status, 200)
  report.indexing = { robots: robots.status, sitemap: sitemap.status }
  console.log(`HTTP: ${report.publicPages.length} public pages, ${report.templates.length} templates, ${report.products.length} products passed; Xinjiang 200; inquiry GET 405`)

  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
  try {
    const page = await browser.newPage({ locale: 'zh-TW', reducedMotion: 'reduce' })
    await page.route('**/api/inquiry', route => route.request().method() === 'GET' ? route.continue() : route.abort())
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of ['/', '/works', '/services', '/contact', '/showcase', '/demo/xinjiang', '/demo/linebot', '/demo/rag-consultant', '/demo/morie']) {
      const start = errors.length
      await page.goto(origin + route + '?lang=zh-Hant', { waitUntil: 'networkidle', timeout: 45000 })
      await page.locator('h1').first().waitFor()
      for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 900 })
        await page.evaluate(async () => { await Promise.all([...document.images].filter(image => image.offsetParent !== null).map(image => { image.loading = 'eager'; return image.decode().catch(() => {}) })) })
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, route + ' overflow')
        const broken = await page.evaluate(() => [...document.images].filter(image => image.offsetParent !== null && (!image.complete || !image.naturalWidth)).map(image => image.getAttribute('src')))
        assert.equal(broken.length, 0, route + ' broken image')
        if (route === '/') {
          assert.equal(await page.locator('.qy-work-card').count(), 3)
          assert.equal(await page.locator('.qy-solution-card').count(), 4)
          assert.equal(await page.locator('.qy-hero-copy .qy-button').getAttribute('href'), '/contact')
          await page.screenshot({ path: path.join(out, `production-home-${width}.png`) })
        }
        if (route === '/contact') assert.equal(await page.locator('.qy-contact-form [required]').count(), 2)
        report.browser.push({ route, width, overflow: false, brokenImages: 0 })
      }
      assert.equal(errors.length, start, route + ' JavaScript errors')
      console.log(`Browser: ${route} passed at 390/1280px`)
    }
    await page.goto(origin + '/demo/morie/products/botanical-cleansing-gel?lang=zh-Hant', { waitUntil: 'networkidle', timeout: 45000 })
    await page.locator('.buy-row .button-solid').click()
    const row = page.locator('.cart-row')
    await row.waitFor()
    assert.equal(await row.count(), 1)
    await row.getByRole('button', { name: '增加數量', exact: true }).click()
    assert.equal((await row.locator('.quantity-stepper span').innerText()).trim(), '2')
    await row.getByRole('button', { name: '移除', exact: true }).click()
    assert.equal(await page.locator('.cart-row').count(), 0)
    report.cart = { add: true, increase: true, remove: true, checkout: false, localOnly: true }
    report.errors = errors
    assert.equal(errors.length, 0)
  } finally { await browser.close() }
  report.passed = true
  await fs.writeFile(path.join(out, 'production-verification.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify({ publicPages: report.publicPages.length, templates: report.templates.length, products: report.products.length, browserChecks: report.browser.length, cart: report.cart, passed: true }))
}
main().catch(error => { console.error(error); process.exitCode = 1 })
