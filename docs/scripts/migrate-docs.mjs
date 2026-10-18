// One-shot migration: docs-legacy/content/** -> docs/content/**
// - groups component pages into category subfolders (/components/<category>/<slug>)
// - strips page frontmatter `navigation` objects (Docus nav comes from .navigation.yml)
// - removes duplicate leading H1 that repeats the frontmatter title
// - rewrites internal /components/<slug> links to their new nested paths
// - copies the 522 example .vue files and shared content components
import {
  readFileSync, writeFileSync, mkdirSync, readdirSync,
  copyFileSync, existsSync, rmSync,
} from 'node:fs'
import { join, dirname, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOCS = join(__dirname, '..')
const REPO = join(DOCS, '..')
const SRC = join(REPO, 'docs-legacy')
const SRC_CONTENT = join(SRC, 'content')
const OUT = join(DOCS, 'content')

// ---------------------------------------------------------------- sections ---
const SECTIONS = [
  { from: '1.getting-started', to: '1.getting-started', title: 'Getting Started', icon: 'i-lucide-rocket' },
  { from: '2.components', to: '3.components', components: true, title: 'Components', icon: 'i-lucide-component' },
  { from: '3.composables', to: '4.composables', title: 'Composables', icon: 'i-lucide-puzzle' },
  { from: '4.blocks', to: '6.blocks', title: 'Blocks', icon: 'i-lucide-blocks', indexFrom: 'blocks.md' },
  { from: '5.template', to: '7.templates', title: 'Templates', icon: 'i-lucide-layout-template', indexFrom: '1.templates.md' },
]

// new sections created as placeholders (authored in later phases)
const NEW_SECTIONS = [
  { to: '2.core-concepts', title: 'Core Concepts', icon: 'i-lucide-lightbulb' },
  { to: '5.guides', title: 'Guides', icon: 'i-lucide-book-open' },
  { to: '8.api-reference', title: 'API Reference', icon: 'i-lucide-braces' },
]

// --------------------------------------------------------------- categories ---
const CATEGORY_FOLDERS = {
  '3D Components': { slug: '3d', title: '3D', icon: 'i-lucide-box' },
  'AI Components': { slug: 'ai', title: 'AI', icon: 'i-lucide-sparkles' },
  'Background Components': { slug: 'backgrounds', title: 'Backgrounds', icon: 'i-lucide-layers' },
  'Buttons': { slug: 'buttons', title: 'Buttons', icon: 'i-lucide-mouse-pointer-click' },
  'Card Components': { slug: 'cards', title: 'Cards', icon: 'i-lucide-layout-panel-top' },
  'Carousels': { slug: 'carousels', title: 'Carousels', icon: 'i-lucide-gallery-horizontal-end' },
  'Directional Components': { slug: 'directional', title: 'Directional', icon: 'i-lucide-move-3d' },
  'Form Components': { slug: 'forms', title: 'Forms', icon: 'i-lucide-text-cursor-input' },
  'Layout & Background': { slug: 'layout', title: 'Layout', icon: 'i-lucide-layout-grid' },
  'Loaders & Progress': { slug: 'loaders', title: 'Loaders & Progress', icon: 'i-lucide-loader-circle' },
  'Navigation & Toolbars': { slug: 'navigation', title: 'Navigation & Toolbars', icon: 'i-lucide-menu' },
  'Interactive Elements': { slug: 'interactive', title: 'Interactive', icon: 'i-lucide-hand' },
  'Numbers & Text': { slug: 'text', title: 'Text & Numbers', icon: 'i-lucide-type' },
  'Transitions': { slug: 'transitions', title: 'Transitions', icon: 'i-lucide-git-compare' },
  'Visual Effects': { slug: 'effects', title: 'Visual Effects', icon: 'i-lucide-wand-sparkles' },
  'Interaction & Movement': { slug: 'movement', title: 'Interaction & Movement', icon: 'i-lucide-move' },
  'Scroll & Viewport': { slug: 'scroll', title: 'Scroll & Viewport', icon: 'i-lucide-scroll-text' },
}

// --------------------------------------------------------------- utilities ---
const read = p => readFileSync(p, 'utf8')
const write = (p, s) => {
  mkdirSync(dirname(p), { recursive: true })
  writeFileSync(p, s)
}

function walk(dir, filter) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, filter))
    else if (!filter || filter(full)) out.push(full)
  }
  return out
}

// parse the legacy components .navigation.yml into { slug: categoryTitle }
function parseComponentsNav() {
  const text = read(join(SRC_CONTENT, '2.components', '.navigation.yml'))
  const map = {}
  let category = null
  for (const line of text.split(/\r?\n/)) {
    const cat = line.match(/^ {2}- title: (.+)$/)
    const to = line.match(/^ {8}to: \/components\/([a-z0-9-]+)\s*$/)
    if (cat) category = cat[1].trim()
    else if (to) map[to[1]] = category
  }
  return map
}

// split "---\nfrontmatter\n---\nbody"
function splitDoc(text) {
  if (!text.startsWith('---')) return { fm: '', body: text }
  const end = text.indexOf('\n---', 3)
  if (end === -1) return { fm: '', body: text }
  const fm = text.slice(3, end)
  const body = text.slice(end + 4).replace(/^\r?\n/, '')
  return { fm, body }
}

function stripNavFromFm(fm) {
  const lines = fm.split(/\r?\n/)
  const out = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('navigation:')) {
      // drop the key and any deeper-indented continuation lines
      while (i + 1 < lines.length && /^[ \t]+\S/.test(lines[i + 1])) i++
      continue
    }
    out.push(lines[i])
  }
  return out.join('\n')
}

function fmTitle(fm) {
  const m = fm.match(/^title:(.+)$/m)
  if (!m) return null
  return m[1].replace(/^['"]|['"]$/g, '').trim()
}

function dedupeH1(body, title) {
  const lines = body.split(/\r?\n/)
  let i = 0
  while (i < lines.length && lines[i].trim() === '') i++
  if (i >= lines.length || !/^#\s+/.test(lines[i])) return body
  const h1 = lines[i].replace(/^#\s+/, '').trim()
  const t = (title || '').toLowerCase()
  const h = h1.toLowerCase()
  if (t && (h === t || h.startsWith(t))) {
    lines.splice(0, i + 1)
    while (lines.length && lines[0].trim() === '') lines.shift()
    return lines.join('\n')
  }
  return body
}

// ------------------------------------------------------------------ main -----
if (!existsSync(SRC_CONTENT)) throw new Error(`missing legacy content: ${SRC_CONTENT}`)
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const nav = parseComponentsNav()
const componentMd = walk(join(SRC_CONTENT, '2.components'), p => p.endsWith('.md'))
const slugToFolder = {}
let unmapped = []

// Build slug -> new path
for (const file of componentMd) {
  const slug = basename(file, '.md')
  if (slug === 'index') continue
  const category = nav[slug]
  const cat = CATEGORY_FOLDERS[category]
  if (!cat) {
    unmapped.push(slug)
    continue
  }
  slugToFolder[slug] = CATEGORY_FOLDERS[category].slug
}
if (unmapped.length) console.warn(`[migrate] unmapped component slugs (${unmapped.length}):`, unmapped.join(', '))

function rewriteLinks(text) {
  const comp = slug => slugToFolder[slug] ? `/components/${slugToFolder[slug]}/${slug}` : null
  return text
    // markdown links: ](/docs/components/slug) and ](/components/slug)
    .replace(/(\]\()\/docs\/components\/([a-z0-9-]+)/g, (m, pre, slug) => `${pre}${comp(slug) ?? `/components/${slug}`}`)
    .replace(/(\]\()\/components\/([a-z0-9-]+)/g, (m, pre, slug) => {
      const c = comp(slug)
      return c ? `${pre}${c}` : m
    })
    // attribute links: href="/docs/components/slug" / to="/components/slug"
    .replace(/(:?href="|:to="|to=")(\/docs\/components\/|\/components\/)([a-z0-9-]+)/g, (m, attr, _pre, slug) => comp(slug) ? `${attr}${comp(slug)}` : m)
    // remaining internal /docs/... links inside markdown links / html attrs
    .replace(/(\]\()\/docs\//g, '$1/')
    .replace(/((?:href|to|:to)=")\/docs\//g, '$1/')
    // legacy /template routes, scoped to link destinations only (never </template> in code)
    .replace(/(\]\()\/template(?![a-z])/g, '$1/templates')
    .replace(/((?:href|to|:to)=")\/template(?![a-z])/g, '$1/templates')
}

// sections
for (const section of SECTIONS) {
  const srcDir = join(SRC_CONTENT, section.from)
  if (!existsSync(srcDir)) continue
  const files = walk(srcDir, p => p.endsWith('.md'))
  for (const file of files) {
    const rel = relative(srcDir, file) // e.g. index.md or slug.md or sub/x.md
    let outRel
    if (section.components) {
      const slug = basename(file, '.md')
      if (slug === 'index') outRel = join(section.to, 'index.md')
      else {
        const folder = slugToFolder[slug] || 'other'
        outRel = join(section.to, folder, `${slug}.md`)
      }
    }
    else {
      outRel = rel === section.indexFrom ? join(section.to, 'index.md') : join(section.to, rel)
    }
    const { fm, body } = splitDoc(read(file))
    const title = fmTitle(fm)
    const cleanFm = stripNavFromFm(fm)
    const newBody = rewriteLinks(dedupeH1(body, title))
    write(join(OUT, outRel), `---\n${cleanFm.trim()}\n---\n\n${newBody}`)
  }
}

// landing page
const landingSrc = join(SRC_CONTENT, 'index.md')
if (existsSync(landingSrc)) {
  const { fm, body } = splitDoc(read(landingSrc))
  write(join(OUT, 'index.md'), `---\n${stripNavFromFm(fm).trim()}\n---\n\n${rewriteLinks(body)}`)
}

// navigation.yml for sections + component categories
for (const section of SECTIONS) {
  write(join(OUT, section.to, '.navigation.yml'), `title: ${section.title}\nicon: ${section.icon}\n`)
}
for (const meta of Object.values(CATEGORY_FOLDERS)) {
  const used = Object.values(slugToFolder).includes(meta.slug)
  if (!used) continue
  write(join(OUT, '3.components', meta.slug, '.navigation.yml'), `title: ${meta.title}\nicon: ${meta.icon}\n`)
}
write(join(OUT, '.navigation.yml'), `title: Nuxt Motion Block\n`)

// placeholder sections
for (const s of NEW_SECTIONS) {
  write(join(OUT, s.to, 'index.md'), `---\ntitle: ${s.title}\n---\n\nComing soon. This section is being written.\n`)
  write(join(OUT, s.to, '.navigation.yml'), `title: ${s.title}\nicon: ${s.icon}\n`)
}

// ------------------------------------------------------------------ assets ---
const exSrc = join(SRC, 'app', 'components', 'content', 'examples')
const exOut = join(DOCS, 'app', 'components', 'content', 'examples')
if (existsSync(exSrc)) {
  rmSync(exOut, { recursive: true, force: true })
  mkdirSync(exOut, { recursive: true })
  for (const f of walk(exSrc)) {
    const rel = relative(exSrc, f)
    copyFileSync(f, join(exOut, rel))
  }
}
for (const f of ['ComponentExample.vue', 'HeroBackground.vue', 'StarsBg.vue', 'ComponentPreview.vue']) {
  const src = join(SRC, 'app', 'components', 'content', f)
  if (existsSync(src)) copyFileSync(src, join(DOCS, 'app', 'components', 'content', f))
}
// NOTE: legacy OgImage components are nuxt-og-image v5 API and are intentionally
// NOT copied (Docus/nuxt-og-image v6 needs `.satori.vue`/`.browser.vue` suffixes).

// public assets (example images + static files; skip generated sitemap output)
const pubSrc = join(SRC, 'public')
if (existsSync(pubSrc)) {
  for (const f of walk(pubSrc)) {
    const rel = relative(pubSrc, f)
    if (rel.startsWith('__sitemap__') || /^sitemap\.xml/.test(rel)) continue
    const dest = join(DOCS, 'public', rel)
    mkdirSync(dirname(dest), { recursive: true })
    copyFileSync(f, dest)
  }
}

// ------------------------------------------------------- legacy redirects ---
const redirects = {}
for (const [slug, folder] of Object.entries(slugToFolder)) {
  redirects[`/components/${slug}`] = `/components/${folder}/${slug}`
}
const tplSrcDir = join(SRC_CONTENT, '5.template')
if (existsSync(tplSrcDir)) {
  redirects['/template'] = '/templates'
  for (const f of walk(tplSrcDir, p => p.endsWith('.md'))) {
    const slug = basename(f, '.md').replace(/^\d+\./, '')
    if (slug === 'templates') redirects['/template/templates'] = '/templates'
    else if (slug !== 'index') redirects[`/template/${slug}`] = `/templates/${slug}`
  }
}
redirects['/blocks/blocks'] = '/blocks'
write(join(DOCS, 'server', 'data', 'legacy-redirects.json'), JSON.stringify(redirects, null, 2) + '\n')
console.log('legacy redirects:', Object.keys(redirects).length)

// ----------------------------------------------------------------- report ----
const counts = {}
for (const s of SECTIONS) {
  const d = join(OUT, s.to)
  if (!existsSync(d)) continue
  counts[s.to] = walk(d, p => p.endsWith('.md')).length
}
console.log('migrated sections:', counts)
console.log('component slugs mapped:', Object.keys(slugToFolder).length, '/', componentMd.length - 1)
if (unmapped.length) console.log('UNMAPPED -> components/other:', unmapped.join(', '))
console.log('examples copied:', existsSync(exOut) ? walk(exOut).length : 0)
