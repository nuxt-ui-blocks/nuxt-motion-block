<template>
  <ComponentPlayground
    name="EmojiReaction"
    :hide="['reactions']"
    :defaults="{
      showPicker: true,
      reactions: [
        { id: 'thumbs-up', emoji: '👍', label: 'Thumbs up', count: 12, reacted: false },
        { id: 'party-popper', emoji: '🎉', label: 'Party popper', count: 4, reacted: false },
        { id: 'rocket', emoji: '🚀', label: 'Rocket', count: 9, reacted: true },
      ],
    }"
    :handlers="{ react: handleReact }"
    :controls="{
      size: {
        kind: 'select',
        options: [
          { label: 'sm', value: 'sm' },
          { label: 'md', value: 'md' },
          { label: 'lg', value: 'lg' },
        ],
      },
    }"
  />
</template>

<script setup lang="ts">
type Reaction = {
  count: number
  emoji: string
  id: string
  label: string
  reacted: boolean
}

function handleReact({ args, model }: { args: unknown[], model: Record<string, any> }) {
  const [id, reacted] = args as [string, boolean]
  const current = (model.reactions ?? []) as Reaction[]
  const allowMultiple = Boolean(model.allowMultiple)
  const existing = current.find(item => item.id === id)

  // A picked emoji that is not in the bar yet arrives as its own emoji string.
  if (!existing) {
    if (!reacted) return
    model.reactions = [
      ...current.map(item => (allowMultiple ? item : { ...item, reacted: false })),
      { count: 1, emoji: id, id, label: id, reacted: true },
    ]
    return
  }

  model.reactions = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        count: Math.max(0, item.count + (reacted ? 1 : -1)),
        reacted,
      }
    }
    return allowMultiple ? item : { ...item, reacted: false }
  })
}
</script>
