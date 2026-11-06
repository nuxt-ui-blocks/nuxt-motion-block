<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  command: string
  label?: string
}>(), {
  label: undefined,
})

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 1800)
  }
  catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="inline-flex max-w-full items-center gap-2 rounded-xl border border-default/70 bg-elevated/40 py-1 pl-3 pr-1">
    <code class="truncate font-mono text-xs text-muted">
      <span class="select-none text-dimmed">$</span>
      {{ command }}
    </code>
    <UButton
      color="neutral"
      variant="ghost"
      size="xs"
      :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
      :aria-label="copied ? 'Copied' : 'Copy install command'"
      @click="copy"
    >
      {{ copied ? 'Copied' : 'Copy' }}
    </UButton>
  </div>
</template>
