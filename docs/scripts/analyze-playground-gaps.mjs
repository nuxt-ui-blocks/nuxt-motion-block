import { readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

const repoRoot = resolve(import.meta.dirname, '..', '..')
const componentsDir = resolve(repoRoot, 'src', 'runtime', 'components')
const examplesDir = resolve(import.meta.dirname, '..', 'app', 'components', 'content', 'examples')

// 1. Every .vue basename available anywhere under components/
const available = new Set()
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isFile() && e.name.endsWith('.vue')) available.add(e.name.replace(/\.vue$/, ''))
    else if (e.isDirectory()) walk(join(dir, e.name))
  }
}
walk(componentsDir)

// 2. Referenced playground names
const referenced = new Map() // name -> [files]
for (const f of readdirSync(examplesDir)) {
  if (!f.endsWith('.vue')) continue
  const src = readFileSync(join(examplesDir, f), 'utf8')
  const re = /ComponentPlayground\s+name="([^"]+)"/g
  let m
  while ((m = re.exec(src))) {
    if (!referenced.has(m[1])) referenced.set(m[1], [])
    referenced.get(m[1]).push(f)
  }
}

const missing = []
for (const [name, files] of [...referenced].sort((a, b) => a[0].localeCompare(b[0]))) {
  if (!available.has(name)) missing.push(`${name}  <- ${files.join(', ')}`)
}

console.log('referenced:', referenced.size, 'available basenames:', available.size)
console.log('\n=== REFERENCED BUT NO MATCHING .vue BASENAME ===')
console.log(missing.join('\n'))
