<template>
  <div class="w-full max-w-md">
    <MAiConversation
      class="h-80 rounded-xl border border-default bg-default"
      :content-key="messages.length"
    >
      <div class="space-y-3 p-4">
        <div
          v-for="message in messages"
          :key="message.id"
        >
          <p class="text-[10px] font-medium uppercase tracking-wide text-muted">
            {{ message.from }}
          </p>
          <p class="text-sm leading-relaxed text-default">
            {{ message.text }}
          </p>
        </div>
      </div>
    </MAiConversation>

    <div class="mt-2 flex items-center gap-2">
      <UButton
        size="xs"
        @click="add"
      >
        New message
      </UButton>
      <span class="text-xs text-muted">Scroll up, then add one.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
type Turn = { id: number, from: string, text: string }

const seed = [
  ['Agent', 'The audit is done. Every theme token resolves, except two in the sidebar.'],
  ['You', 'Which two?'],
  ['Agent', 'The category icons. They are referenced as `i-lucide-*` names that the icon collection cannot resolve.'],
  ['You', 'Pre-existing?'],
  ['Agent', 'Yes. They are on the components index, not on any page you added.'],
  ['You', 'Then leave them and note it.'],
  ['Agent', 'Noted. The rest of the run is clean: 182 pages, no drifted snippets, no missing examples.'],
  ['You', 'Good. What is left?'],
]

const messages = ref<Turn[]>(
  seed.map(([from, text], index) => ({ id: index, from, text })),
)

let next = seed.length

/**
 * Appending is the only thing that changes `content-key`. If the reader has
 * scrolled up, the component leaves them there and shows the pill.
 */
const add = () => {
  messages.value.push({
    id: next,
    from: next % 2 === 0 ? 'You' : 'Agent',
    text: `Message ${next + 1}. The thread grows, and the container only follows if you are at the bottom.`,
  })
  next += 1
}
</script>
