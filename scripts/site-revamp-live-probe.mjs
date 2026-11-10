import { writeFile } from 'node:fs/promises'
import { studioWorks } from '../apps/legacy/src/site/studioContent.js'
import { contact } from '../apps/legacy/src/site/siteConfig.js'

// Read-only reachability checks: never create a workspace, inquiry or other production record.
const origin = 'https://www.qingyuweb.com'
const paths = ['/', '/works', '/services', '/pricing', '/contact', '/works/quoteflow', '/works/bookcrm', '/works/xinjiang', '/works/line-bot', '/works/rag-consultant', '/works/interactive-quiz', '/api/inquiry', ...['quoteflow', 'bookcrm', 'xinjiang', 'linebot', 'rag-consultant'].map(slug => studioWorks.find(work => work.slug === slug).entryPath)]
const results = await Promise.all(paths.map(async route => {
  try {
    const response = await fetch(origin + route, { signal: AbortSignal.timeout(20000) })
    const body = await response.text()
    return { route, status: response.status, finalUrl: response.url, title: body.match(/<title>([\s\S]*?)<\/title>/)?.[1], canonical: body.match(/rel="canonical" href="([^"]+)"/)?.[1], robots: body.match(/name="robots" content="([^"]+)"/)?.[1], placeholder: /Core Detail|Question Bank/.test(body), checked: 'GET only; reachability does not verify product data or email delivery' }
  } catch (error) { return { route, error: error.message } }
}))
try {
  const response = await fetch(contact.lineUrl, { signal: AbortSignal.timeout(20000) })
  results.push({ route: 'configured-line', status: response.status, finalUrl: response.url })
} catch (error) { results.push({ route: 'configured-line', error: error.message }) }
await writeFile(new URL('../docs/site-revamp/live-probe.json', import.meta.url), JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2))
for (const result of results) console.log(`${result.route}: ${result.status ?? result.error}`)
