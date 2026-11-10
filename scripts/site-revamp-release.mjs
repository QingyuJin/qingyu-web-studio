import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative, resolve } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = resolve(root, process.env.REVAMP_RELEASE_DIRECTORY || 'outputs/site-revamp')
const statePath = join(output, 'release-state.json')
const projectId = 'prj_DjHlqfxRZ1rJDmN5n66IG8jYFwJj'
const scope = 'qingyujins-projects'
const cache = 'C:/Users/USER/AppData/Local/npm-cache/_npx'
const cliRoot = readdirSync(cache).map(name => join(cache, name, 'node_modules/vercel')).find(directory => existsSync(join(directory, 'package.json')) && JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8')).version === '59.7.0')
assert(cliRoot, 'Use the already authenticated Vercel CLI 59.7.0')
const cliFile = join(cliRoot, 'dist/index.js')
function cli(args, cwd = root) {
  const result = spawnSync(process.execPath, [cliFile, ...args, '--scope', scope], { cwd, encoding: 'utf8', windowsHide: true, timeout: 90000, maxBuffer: 20 * 1024 * 1024 })
  if (result.status !== 0) throw new Error(`Vercel ${args[0]} failed: ${(result.stderr || result.stdout).slice(-1800)}`)
  return result.stdout
}
function inspect(url) { return JSON.parse(cli(['inspect', url, '--json'])) }
function snapshot(deployment) {
  return { id: deployment.id, name: deployment.name, url: deployment.url, target: deployment.target, readyState: deployment.readyState, createdAt: deployment.createdAt, aliases: deployment.aliases, vercelConfig: deployment.builds?.find(build => build.config?.vercelConfig)?.config.vercelConfig }
}
function save(state) { mkdirSync(output, { recursive: true }); writeFileSync(statePath, JSON.stringify(state, null, 2)) }
const phase = process.argv[2] || 'prepare'

if (phase === 'prepare') {
  assert(!existsSync(statePath), 'A release is already prepared; resume that release')
  const before = inspect('https://www.qingyuweb.com')
  assert.equal(before.name, 'qingyu-web-studio')
  assert.equal(before.readyState, 'READY')
  const source = join(root, 'apps/legacy')
  const project = JSON.parse(readFileSync(join(source, '.vercel/project.json'), 'utf8'))
  assert.equal(project.projectId, projectId)
  const config = JSON.parse(readFileSync(join(source, 'vercel.json'), 'utf8'))
  const production = snapshot(before)
  // Preserve all existing product/API routing while allowing the intentional demo fix.
  const critical = production.vercelConfig?.rewrites?.filter(rule => /\/(?:api|_next|q\/|works\/[^/]+\/(?:app|auth|login))/.test(rule.source)) || []
  for (const rule of critical) assert(config.rewrites.some(next => JSON.stringify(next) === JSON.stringify(rule)), `Existing product rewrite changed: ${rule.source}`)
  const target = join(output, 'release-' + new Date().toISOString().replace(/[:.]/g, '-'))
  assert(!existsSync(target))
  const excluded = new Set(['node_modules', 'client-originals', '.git', '.vercel'])
  function include(file) {
    const rel = relative(source, file).replaceAll('\\', '/')
    return !rel.split('/').some(part => excluded.has(part) || part.startsWith('.env')) && !/\.(?:test|spec)\.[^/]+$|\.(?:local|log|map|tsbuildinfo|pem|key)$/.test(rel)
  }
  mkdirSync(target, { recursive: true })
  for (const name of ['src', 'api', 'public', 'package.json', 'package-lock.json', 'vite.config.js', 'index.html', 'vercel.json', '.vercelignore']) cpSync(join(source, name), join(target, name), { recursive: true, filter: include })
  mkdirSync(join(target, 'scripts'))
  for (const name of ['prerender-meta.mjs', 'sync-showcase-builds.mjs']) cpSync(join(source, 'scripts', name), join(target, 'scripts', name))
  mkdirSync(join(target, '.vercel'))
  writeFileSync(join(target, '.vercel/project.json'), JSON.stringify(project))
  const pkg = JSON.parse(readFileSync(join(target, 'package.json'), 'utf8'))
  const lock = JSON.parse(readFileSync(join(target, 'package-lock.json'), 'utf8'))
  assert.deepEqual(lock.packages[''].dependencies, pkg.dependencies)
  assert.deepEqual(lock.packages[''].devDependencies, pkg.devDependencies)
  const files = readdirSync(target, { recursive: true }).filter(file => statSync(join(target, file)).isFile())
  assert(!files.some(file => /(?:^|[\\/])\.env|client-originals|\.test\./.test(file)))
  const manifest = files.map(file => ({ path: file.replaceAll('\\', '/'), bytes: statSync(join(target, file)).size, sha256: createHash('sha256').update(readFileSync(join(target, file))).digest('hex') }))
  writeFileSync(join(output, 'release-manifest.json'), JSON.stringify(manifest, null, 2))
  const state = { projectId, cliFile, scope, target, previous: production, preservedProductRewrites: critical.length, preparedAt: new Date().toISOString(), files: manifest.length, bytes: manifest.reduce((sum, file) => sum + file.bytes, 0) }
  save(state)
  console.log(JSON.stringify({ target, previous: production.id, files: state.files, megabytes: +(state.bytes / 1048576).toFixed(1), preservedProductRewrites: critical.length }, null, 2))
} else if (phase === 'candidate') {
  const state = JSON.parse(readFileSync(statePath, 'utf8'))
  const candidate = inspect(process.argv[3])
  assert.equal(candidate.name, 'qingyu-web-studio')
  assert.equal(candidate.readyState, 'READY')
  const candidateConfig = snapshot(candidate).vercelConfig
  const sourceConfig = JSON.parse(readFileSync(join(state.target, 'vercel.json'), 'utf8'))
  for (const key of ['rewrites', 'redirects', 'headers']) assert.deepEqual(candidateConfig[key], sourceConfig[key], key)
  state.candidate = snapshot(candidate)
  save(state)
  console.log(JSON.stringify({ id: candidate.id, url: candidate.url, readyState: candidate.readyState, configMatches: true }, null, 2))
} else if (phase === 'check') {
  const state = JSON.parse(readFileSync(statePath, 'utf8'))
  assert(state.candidate?.id, 'Validate the candidate first')
  const checks = []
  for (const route of ['/', '/services', '/pricing', '/contact', '/showcase', '/works/quoteflow', '/works/bookcrm', '/demo/xinjiang', '/api/inquiry']) {
    const response = spawnSync(process.execPath, [cliFile, 'curl', route, '--deployment', state.candidate.url, '--scope', scope, '--', '--silent', '--show-error', '--max-time', '25', '--write-out', '\n__REVAMP_HTTP__%{http_code}'], { cwd: state.target, encoding: 'utf8', windowsHide: true, timeout: 60000, maxBuffer: 10 * 1024 * 1024 })
    assert.equal(response.status, 0, `Authenticated candidate GET failed: ${route}`)
    const match = response.stdout.match(/\n__REVAMP_HTTP__(\d+)\s*$/)
    assert(match, `Missing HTTP status: ${route}`)
    const status = +match[1]
    const body = response.stdout.slice(0, match.index)
    assert.equal(status, route === '/api/inquiry' ? 405 : 200, route)
    assert(!body.includes('<title>Login'), `Received protection page: ${route}`)
    if (route === '/') assert(body.includes('品牌網站設計與企業系統開發'))
    if (route === '/services') assert(body.includes('網站小型修改'))
    if (route === '/pricing') { assert(body.includes('依需求與預算討論')); assert(!/\d[\d,]*\s*元起/.test(body)) }
    if (route === '/contact') {
      assert(body.includes('mailto:a0988874324@gmail.com'))
      assert(body.includes('https://line.me/R/ti/p/~mulaquc'))
    }
    if (route === '/demo/xinjiang') assert(body.includes('鑫匠'))
    checks.push({ route, status, title: body.match(/<title>(.*?)<\/title>/)?.[1] })
    console.log(`Authenticated candidate ${route}: ${status}`)
  }
  state.candidateChecks = checks
  state.checkedAt = new Date().toISOString()
  save(state)
} else if (phase === 'promote') {
  const state = JSON.parse(readFileSync(statePath, 'utf8'))
  assert(state.candidate?.id, 'Validate the candidate first')
  assert.equal(state.candidateChecks?.length, 9, 'Check candidate content before promotion')
  const before = inspect('https://www.qingyuweb.com')
  assert.equal(before.id, state.previous.id, 'Production changed during release; reconcile first')
  const candidate = inspect(state.candidate.url)
  assert.equal(candidate.id, state.candidate.id)
  assert.equal(candidate.readyState, 'READY')
  cli(['promote', 'https://' + state.candidate.url, '--yes'])
  const after = inspect('https://www.qingyuweb.com')
  assert.equal(after.id, state.candidate.id)
  state.production = snapshot(after)
  state.promotedAt = new Date().toISOString()
  save(state)
  console.log(JSON.stringify({ url: 'https://www.qingyuweb.com', id: after.id, readyState: after.readyState, promotedAt: state.promotedAt }, null, 2))
} else throw new Error('Unknown release phase')
