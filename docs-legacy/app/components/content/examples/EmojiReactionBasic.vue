<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="rounded-2xl border p-4">
      <p class="text-sm font-medium">
        Ship the new onboarding flow?
      </p>
      <div class="mt-3">
        <MEmojiReaction
          :reactions="reactions"
          show-picker
          @react="onReact"
        />
      </div>
    </div>

    <p class="text-xs text-muted">
      One reaction at a time — {{ reactedLabel }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Reaction = {
  count: number
  emoji: string
  id: string
  label: string
  reacted: boolean
}

const reactions = ref<Reaction[]>([
  { count: 12, emoji: '👍', id: 'thumbs-up', label: 'Thumbs up', reacted: false },
  { count: 4, emoji: '🎉', id: 'party-popper', label: 'Party popper', reacted: false },
  { count: 9, emoji: '🚀', id: 'rocket', label: 'Rocket', reacted: true },
])

const reactedLabel = computed(() => {
  const active = reactions.value.find(item => item.reacted)
  return active ? active.label : 'nothing selected yet'
})

function onReact(id: string, reacted: boolean) {
  reactions.value = reactions.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        count: Math.max(0, item.count + (reacted ? 1 : -1)),
        reacted,
      }
    }
    return { ...item, reacted: false }
  })
}
</script>
