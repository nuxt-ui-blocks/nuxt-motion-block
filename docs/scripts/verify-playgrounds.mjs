import { chromium } from 'playwright-core'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'node:path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const docsRoot = join(__dirname, '..')
const baseDir = join(docsRoot, 'content', '3.components')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001'
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.name.endsWith('.md') && entry.name !== 'index.md') acc.push(full)
  }
  return acc
}

const files = walk(baseDir)
const targets = []
for (const file of files) {
  const rel = relative(baseDir, file).replace(/\\/g, '/').replace(/\.md$/, '')
  const url = `${BASE_URL}/components/${rel}`
  const md = readFileSync(file, 'utf8')
  const names = [...md.matchAll(/<PlaygroundCode\s+name="([^"]+)"/g)].map(m => m[1])
  if (!names.length) {
    targets.push({ file, url, skip: true, reason: 'no PlaygroundCode (bespoke)' })
    continue
  }
  targets.push({ file, url, names })
}

async function pool(items, size, worker, onDone) {
  const results = new Array(items.length)
  let next = 0
  let done = 0
  async function run() {
    while (next < items.length) {
      const i = next++
      results[i] = await worker(items[i], i)
      done++
      if (onDone) onDone(done, items.length)
    }
  }
  await Promise.all(Array.from({ length: size }, run))
  return results
}

const runnable = targets.filter(t => !t.skip)
console.log(`Warming up ${runnable.length} routes...`)
let warm = 0
await pool(runnable, 8, async (t) => {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 60000)
    await fetch(t.url, { signal: ctrl.signal })
    clearTimeout(timer)
  }
  catch {}
}, (d) => { warm = d; if (d % 20 === 0) console.log(`  warm ${d}/${runnable.length}`) })
console.log('Warm-up done.')
console.log(`Verifying ${runnable.length} playground pages (skipping ${targets.length - runnable.length})...`)

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const context = await browser.newContext()

let lastLog = 0
const results = await pool(runnable, 4, async (target) => {
  const page = await context.newPage()
  const errors = []
  const onConsole = (msg) => { if (msg.type() === 'error') errors.push(`console: ${msg.text().slice(0, 160)}`) }
  const onPageError = (err) => errors.push(`pageerror: ${String(err).slice(0, 160)}`)
  page.on('console', onConsole)
  page.on('pageerror', onPageError)
  try {
    await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForSelector('[data-playground-code], [data-playground-code-empty]', { state: 'attached', timeout: 20000 })
    const info = await page.evaluate(() => {
      const codeEl = document.querySelector('[data-playground-code]')
      const pre = codeEl ? codeEl.querySelector('pre') : null
      const code = pre ? pre.innerText : (codeEl ? codeEl.innerText : '')
      return {
        hasCode: !!codeEl,
        empty: !!document.querySelector('[data-playground-code-empty]'),
        notRegistered: document.body.innerText.includes('is not registered for the playground yet'),
        code,
      }
    })
    const expected = target.names.map(n => `<M${n}`)
    return {
      url: target.url,
      names: target.names,
      ok: info.hasCode && !info.empty && !info.notRegistered
        && info.code.includes('<template>') && info.code.includes('</template>')
        && expected.some(tag => info.code.includes(tag)),
      hasCode: info.hasCode,
      empty: info.empty,
      notRegistered: info.notRegistered,
      codeLen: info.code.length,
      codeHead: info.code.split('\n').slice(0, 3).join(' ').slice(0, 90),
      errors,
    }
  }
  catch (err) {
    return { url: target.url, names: target.names, ok: false, error: String(err).slice(0, 200), errors }
  }
  finally {
    page.off('console', onConsole)
    page.off('pageerror', onPageError)
    await page.close()
  }
}, (d, total) => {
  if (d - lastLog >= 10 || d === total) {
    lastLog = d
    console.log(`  verified ${d}/${total}`)
  }
})

await browser.close()

const failures = results.filter(r => !r.ok)
const skipped = targets.filter(t => t.skip)
const report = { total: results.length, passed: results.length - failures.length, failed: failures.length, skipped, failures }
writeFileSync(join(docsRoot, 'scripts', '_playground-verify.json'), JSON.stringify(report, null, 2))

console.log(`\nPASS ${report.passed}/${report.total}  FAIL ${report.failed}`)
for (const f of failures) {
  console.log(`\nFAIL ${f.url}`)
  console.log(`  names=${(f.names || []).join(',')} empty=${f.empty} notRegistered=${f.notRegistered} codeLen=${f.codeLen ?? '-'} err=${f.error || ''}`)
  if (f.codeHead) console.log(`  head: ${f.codeHead}`)
  for (const e of (f.errors || []).slice(0, 3)) console.log(`  ${e}`)
}
process.exit(failures.length ? 1 : 0)
