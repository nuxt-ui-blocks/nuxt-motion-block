import fs from 'node:fs'
import path from 'node:path'

const APPLY = process.argv.includes('--apply')
const root = path.resolve(import.meta.dirname, '..', 'content', '3.components')

const SECTION = {
  'Props': { group: 'component-props', row: 'component-prop' },
  'Events': { group: 'component-events', row: 'component-event' },
  'Slots': { group: 'component-slots', row: 'component-slot-row' },
  'UI': { group: 'component-props', row: 'component-prop' },
  'Card Object Structure': { group: 'component-props', row: 'component-prop' },
  'Methods': { group: 'component-props', row: 'component-prop' },
  'Types': { group: 'component-props', row: 'component-prop' },
}

function walk(d, acc = []) {
  for (const f of fs.readdirSync(d)) {
    const fp = path.join(d, f)
    const st = fs.statSync(fp)
    if (st.isDirectory()) walk(fp, acc)
    else if (f.endsWith('.md')) acc.push(fp)
  }
  return acc
}

function splitCells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(s => s.trim())
}

function transform(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const out = []
  let section = '(none)'
  let changed = false
  const notes = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    const h2 = line.match(/^##\s+(\S.*)$/)
    if (h2) {
      section = h2[1].trim()
      out.push(line)
      i++
      continue
    }

    // markdown slot table -> component-slots
    if (/^\|\s*Slot\s*\|\s*Default classes\s*\|\s*$/.test(line) && /^\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '')) {
      let j = i + 2
      const rows = []
      while (j < lines.length && /^\s*\|.*\|\s*$/.test(lines[j])) {
        rows.push(splitCells(lines[j]))
        j++
      }
      out.push('::component-slots')
      for (const cells of rows) {
        const name = (cells[0] || '').replace(/^`|`$/g, '').trim()
        const def = cells[1] || ''
        out.push(`  ::component-slot-row{name="${name}"}`)
        if (def) out.push(`  ${def}`)
        out.push('  ::')
      }
      out.push('::')
      out.push('')
      changed = true
      notes.push(`slot-table ${rows.length} rows @section=${section}`)
      i = j
      continue
    }

    const map = SECTION[section]
    if (map) {
      if (/^::field-group\s*$/.test(line)) {
        out.push(`::${map.group}`)
        changed = true
        i++
        continue
      }
      const fm = line.match(/^\s*::field\{/)
      if (fm) {
        out.push(line.replace('::field{', `::${map.row}{`))
        changed = true
        i++
        continue
      }
      if (/^\s*::field\s*$/.test(line)) {
        out.push(line.replace(/::field\s*$/, `::${map.row}`))
        changed = true
        i++
        continue
      }
    }
    out.push(line)
    i++
  }

  // validate rows are directly inside a matching container
  const errs = []
  const stack = []
  out.forEach((l, idx) => {
    const open = l.match(/^::([a-z][\w-]*)/i)
    if (open && !/^::\s*$/.test(l)) {
      stack.push(open[1])
      return
    }
    if (/^::\s*$/.test(l)) {
      stack.pop()
      return
    }
    const row = l.match(/^\s+::(component-prop|component-event|component-slot-row)\b/)
    if (row) {
      const top = stack[stack.length - 1] || ''
      if (!/^component-(?:props|events|slots)$/.test(top)) errs.push(`line ${idx + 1}: row not inside container (top=${top || 'none'}) -> ${l.trim().slice(0, 60)}`)
    }
  })
  if (stack.length !== 0) errs.push(`unbalanced col-0 blocks, final depth=${stack.length}`)

  return { text: out.join('\n'), changed, notes, errs }
}

const files = walk(root)
let changedCount = 0
const anomalies = []
for (const fp of files) {
  const src = fs.readFileSync(fp, 'utf8')
  const { text, changed, errs } = transform(src)
  if (errs.length) anomalies.push({ file: path.relative(root, fp), errs })
  if (changed) {
    changedCount++
    if (APPLY) fs.writeFileSync(fp, text, 'utf8')
  }
}
console.log('files:', files.length, 'changed:', changedCount, 'apply:', APPLY)
if (anomalies.length) {
  console.log('\nANOMALIES:')
  for (const a of anomalies) console.log(a.file, '\n  ' + a.errs.join('\n  '))
}
else console.log('no anomalies')
