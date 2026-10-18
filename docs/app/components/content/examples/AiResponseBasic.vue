<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-6">
    <MAiResponse
      :citations="citations"
      :is-streaming="streaming"
      :text="text"
    />

    <div class="mt-4 flex items-center gap-3">
      <UButton
        :label="streaming ? 'Pause' : 'Resume'"
        size="sm"
        variant="soft"
        @click="streaming = !streaming"
      />
      <UButton
        label="Replay"
        size="sm"
        variant="ghost"
        @click="replay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type Citation = {
  id: string
  index: number
  title: string
  url?: string
}

const citations: Citation[] = [
  { id: 'c-1', index: 1, title: 'Theme token audit runbook', url: 'https://example.com' },
  { id: 'c-2', index: 2, title: 'Release checklist, internal' },
]

const full = 'Behind a flag [1]. The audit walks every theme token, so a cold landing means a long tail of unreviewed diffs [2].'

const text = ref('')
const streaming = ref(true)

const replay = () => {
  text.value = ''
  streaming.value = true

  const words = full.split(' ')
  let index = 0

  const tick = () => {
    index += 1
    text.value = words.slice(0, index).join(' ')
    if (index < words.length) {
      window.setTimeout(tick, 60)
    }
  }

  tick()
}

onMounted(replay)
</script>
