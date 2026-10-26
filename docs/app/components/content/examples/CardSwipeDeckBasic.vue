<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MCardSwipeDeck
      :items="items"
      :labels="{ left: 'Skip', right: 'Save' }"
      @empty="finished = true"
      @swipe="onSwipe"
    >
      <template #default="{ isFront, item }">
        <div
          class="flex h-full flex-col justify-between bg-linear-to-br p-6"
          :class="item.tone"
        >
          <div class="flex items-start justify-between gap-3">
            <span
              class="grid size-11 place-items-center rounded-2xl bg-default/80 text-highlighted shadow-sm ring-1 ring-default/60"
            >
              <UIcon
                :name="item.icon"
                class="size-5"
                aria-hidden="true"
              />
            </span>
            <span
              class="rounded-full bg-default/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted uppercase ring-1 ring-default/60"
            >
              {{ item.tag }}
            </span>
          </div>

          <div class="flex flex-col gap-3">
            <span class="text-xs font-medium tracking-[0.14em] text-muted uppercase">
              {{ item.kicker }}
            </span>
            <h3 class="text-2xl leading-tight font-semibold text-highlighted">
              {{ item.title }}
            </h3>
            <p class="text-sm leading-relaxed text-muted">
              {{ item.body }}
            </p>
            <span
              v-if="isFront"
              class="mt-1 text-xs text-muted"
            >
              Drag the card, or focus the deck and use the arrow keys.
            </span>
          </div>
        </div>
      </template>
    </MCardSwipeDeck>

    <p
      class="min-h-5 max-w-[340px] text-center text-sm text-muted"
      aria-live="polite"
    >
      <template v-if="finished">
        Deck cleared. Every card has been reviewed.
      </template>
      <template v-else-if="last">
        {{ last.direction === 'right' ? 'Saved' : 'Skipped' }}
        &ldquo;{{ last.title }}&rdquo;
      </template>
      <template v-else>
        Five small commitments. Keep what fits this week.
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface FocusCard {
  body: string
  icon: string
  id: string
  kicker: string
  tag: string
  title: string
  tone: string
}

const items: FocusCard[] = [
  {
    body: 'One session, no notifications. The rest of the day can wait.',
    icon: 'i-lucide-brain',
    id: 'deep-work',
    kicker: 'Focus',
    tag: 'Morning',
    title: 'Two hours of deep work',
    tone: 'from-violet-500/30 via-violet-500/10 to-transparent',
  },
  {
    body: 'A short loop outside, before the first meeting gets a vote.',
    icon: 'i-lucide-footprints',
    id: 'walk',
    kicker: 'Movement',
    tag: 'Daily',
    title: 'Walk without headphones',
    tone: 'from-emerald-500/30 via-emerald-500/10 to-transparent',
  },
  {
    body: 'Twenty pages of the book that keeps getting moved down the pile.',
    icon: 'i-lucide-book-open',
    id: 'reading',
    kicker: 'Input',
    tag: 'Evening',
    title: 'Read before the scroll',
    tone: 'from-amber-500/30 via-amber-500/10 to-transparent',
  },
  {
    body: 'Put the phone in another room and let the evening stay quiet.',
    icon: 'i-lucide-moon',
    id: 'downtime',
    kicker: 'Recovery',
    tag: 'Night',
    title: 'Close the day offline',
    tone: 'from-sky-500/30 via-sky-500/10 to-transparent',
  },
  {
    body: 'One message to someone you have been meaning to answer.',
    icon: 'i-lucide-send',
    id: 'reconnect',
    kicker: 'People',
    tag: 'This week',
    title: 'Reconnect with a friend',
    tone: 'from-rose-500/30 via-rose-500/10 to-transparent',
  },
]

const last = ref<{ direction: 'left' | 'right', title: string } | null>(null)
const finished = ref(false)

function onSwipe(id: string, direction: 'left' | 'right') {
  const item = items.find(entry => entry.id === id)

  if (item) {
    last.value = { direction, title: item.title }
  }
}
</script>
