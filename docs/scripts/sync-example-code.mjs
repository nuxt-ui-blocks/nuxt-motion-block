import fs from 'node:fs'
import path from 'node:path'

const DOCS = path.resolve(import.meta.dirname, '..')
const EX = path.join(DOCS, 'app/components/content/examples')
const CONTENT = path.join(DOCS, 'content/3.components')

const toPascal = s => s.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join('')

function* mdFiles(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = path.join(d, f)
    if (fs.statSync(fp).isDirectory()) yield* mdFiles(fp)
    else if (f.endsWith('.md')) yield fp
  }
}

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const only = args.filter(a => !a.startsWith('--'))
const targets = only.length ? only.map(p => path.resolve(p)) : [...mdFiles(CONTENT)]

const norm = s => s.replace(/\r\n/g, '\n').replace(/\n+$/, '')

let files = 0
let blocks = 0
let changedFiles = 0
const missing = []
const drifted = []

for (const fp of targets) {
  const src = fs.readFileSync(fp, 'utf8')
  files++
  const edits = []
  for (const m of src.matchAll(/<component-example\s+name="([^"]+)"/g)) {
    const name = m[1]
    const fenceIdx = src.indexOf('```vue', m.index)
    if (fenceIdx === -1) continue
    // Only sync a fence that belongs to THIS example's `#code` slot. Customize
    // sections render live code via `<PlaygroundCode>` (no fence), so the next
    // `\`\`\`vue` may belong to a later section — bail when the slot has closed.
    const seg = src.slice(m.index, fenceIdx)
    const closed = /(^|\r?\n)::[ \t]*(\r?\n|$)/.test(seg) || /(^|\r?\n)##[ \t]/.test(seg)
    if (!seg.includes('#code') || closed) continue
    const bodyStart = src.indexOf('\n', fenceIdx) + 1
    const closeIdx = src.indexOf('```', bodyStart)
    if (closeIdx === -1) continue
    blocks++
    const exPath = path.join(EX, toPascal(name) + '.vue')
    if (!fs.existsSync(exPath)) {
      missing.push(`${path.relative(CONTENT, fp)} :: ${name}`)
      continue
    }
    const body = norm(fs.readFileSync(exPath, 'utf8'))
    const innerRaw = src.slice(bodyStart, closeIdx)
    const glued = innerRaw.length > 0 && src[closeIdx - 1] !== '\n'
    if (norm(innerRaw) !== body || glued) {
      edits.push({ start: bodyStart, end: closeIdx, text: body + '\n' })
      drifted.push(`${path.relative(CONTENT, fp)} :: ${name}`)
    }
  }
  if (edits.length) {
    let out = ''
    let last = 0
    for (const e of edits) {
      out += src.slice(last, e.start) + e.text
      last = e.end
    }
    out += src.slice(last)
    changedFiles++
    if (apply) fs.writeFileSync(fp, out)
  }
}

console.log(`mode: ${apply ? 'APPLY' : 'CHECK'}`)
console.log(`md files: ${files} | code blocks: ${blocks} | drifted files: ${changedFiles}`)
console.log(`missing example files: ${missing.length}`)
for (const x of missing) console.log('  !', x)
if (drifted.length) {
  console.log(`drifted code blocks: ${drifted.length}`)
  for (const x of drifted) console.log('  ~', x)
}
