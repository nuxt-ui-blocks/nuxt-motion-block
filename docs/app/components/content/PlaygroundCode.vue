<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const store = usePlaygroundState()

const snapshot = computed(() => store.value[props.name])

function kebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function attribute(name: string, value: unknown): string {
  const key = kebabCase(name)
  if (typeof value === 'string') {
    return /[\r\n"]/.test(value)
      ? `:${key}='${JSON.stringify(value)}'`
      : `${key}="${value}"`
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return `:${key}="${value}"`
  }
  return `:${key}='${JSON.stringify(value)}'`
}

const code = computed(() => {
  const snap = snapshot.value
  if (!snap) return ''

  const attrs = snap.props
    .filter(prop => prop.value !== undefined && typeof prop.value !== 'function')
    .map(prop => attribute(prop.name, prop.value))

  const slotLines = snap.slot
    ? snap.slot.split('\n').map(line => (line.length ? `    ${line}` : ''))
    : []

  const lines: string[] = ['<template>']
  if (attrs.length === 0) {
    if (slotLines.length === 0) {
      lines.push(`  <${snap.tag} />`)
    }
    else {
      lines.push(`  <${snap.tag}>`, ...slotLines, `  </${snap.tag}>`)
    }
  }
  else {
    lines.push(`  <${snap.tag}`, ...attrs.map(attr => `    ${attr}`))
    if (slotLines.length === 0) {
      lines.push('  />')
    }
    else {
      lines.push('  >', ...slotLines, `  </${snap.tag}>`)
    }
  }
  lines.push('</template>')
  return lines.join('\n')
})
</script>

<template>
  <ClientOnly>
    <div
      v-if="code"
      :data-playground-code="name"
    >
      <ProsePre
        :code="code"
        language="vue"
      >
        {{ code }}
      </ProsePre>
    </div>
    <div
      v-else
      :data-playground-code-empty="name"
      class="rounded-md border border-muted p-4 text-sm text-muted"
    >
      Adjust the customizer to generate code.
    </div>
  </ClientOnly>
</template>
