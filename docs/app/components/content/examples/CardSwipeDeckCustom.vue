<template>
  <div class="flex w-full flex-col items-center gap-6 p-6 sm:flex-row sm:items-start sm:justify-center">
    <MCardSwipeDeck
      ref="deck"
      :items="films"
      :labels="{ left: 'Pass', right: 'Queue' }"
      :rotation-factor="14"
      :stack-offset="10"
      :stack-size="2"
      :threshold="130"
      class="h-[420px] w-[300px]"
      @empty="finished = true"
      @swipe="onSwipe"
    >
      <template #default="{ isFront, item }">
        <div
          class="flex h-full flex-col justify-between bg-linear-to-br p-5"
          :class="item.tone"
        >
          <div class="flex items-start justify-between gap-3">
            <span
              class="grid size-10 place-items-center rounded-xl bg-default/80 text-highlighted shadow-sm ring-1 ring-default/60"
            >
              <UIcon
                :name="item.icon"
                class="size-5"
                aria-hidden="true"
              />
            </span>
            <span
              class="rounded-full bg-default/75 px-2.5 py-1 text-[11px] font-medium text-muted ring-1 ring-default/60"
            >
              {{ item.year }}
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <span class="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
              {{ item.genre }}
            </span>
            <h3 class="text-2xl leading-tight font-semibold text-highlighted">
              {{ item.title }}
            </h3>
            <p class="text-sm leading-relaxed text-muted">
              {{ item.body }}
            </p>
            <span class="text-xs text-muted">{{ item.runtime }} min</span>
            <span
              v-if="isFront"
              class="mt-1 text-xs text-muted"
            >
              Drag, use the buttons, or press the arrow keys.
            </span>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
          <span class="grid size-11 place-items-center rounded-2xl bg-elevated text-muted">
            <UIcon
              name="i-lucide-popcorn"
              class="size-5"
              aria-hidden="true"
            />
          </span>
          <p class="text-sm font-medium text-highlighted">
            Queue cleared
          </p>
          <p class="text-xs text-muted">
            Reset the deck to go through the list again.
          </p>
        </div>
      </template>
    </MCardSwipeDeck>

    <div class="flex w-full max-w-[300px] flex-col gap-5 sm:w-[156px]">
      <dl class="flex flex-col gap-2.5">
        <div class="flex items-baseline justify-between gap-3 border-b border-default pb-2">
          <dt class="text-xs text-muted">
            Queued
          </dt>
          <dd class="text-lg font-semibold text-success tabular-nums">
            {{ queued.length }}
          </dd>
        </div>
        <div class="flex items-baseline justify-between gap-3 border-b border-default pb-2">
          <dt class="text-xs text-muted">
            Passed
          </dt>
          <dd class="text-lg font-semibold text-error tabular-nums">
            {{ passed.length }}
          </dd>
        </div>
        <div class="flex items-baseline justify-between gap-3 border-b border-default pb-2">
          <dt class="text-xs text-muted">
            Left
          </dt>
          <dd class="text-lg font-semibold text-highlighted tabular-nums">
            {{ remaining }}
          </dd>
        </div>
      </dl>

      <div class="flex items-center gap-2">
        <UButton
          aria-label="Pass on the top film"
          color="error"
          :disabled="remaining === 0"
          icon="i-lucide-x"
          square
          variant="soft"
          @click="deck?.swipeLeft()"
        />
        <UButton
          aria-label="Queue the top film"
          color="success"
          :disabled="remaining === 0"
          icon="i-lucide-bookmark-plus"
          square
          @click="deck?.swipeRight()"
        />
        <UButton
          aria-label="Reset the deck"
          color="neutral"
          icon="i-lucide-rotate-ccw"
          square
          variant="ghost"
          @click="reset"
        />
      </div>

      <p
        v-if="finished"
        class="text-xs leading-snug font-medium text-success"
      >
        All five films reviewed. Reset the deck to start again.
      </p>
      <p
        v-else
        class="text-xs leading-snug text-muted"
      >
        A committed swipe calls the same path as the buttons. The last card
        fires <code class="text-highlighted">empty</code>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Film {
  body: string
  genre: string
  icon: string
  id: string
  runtime: number
  title: string
  tone: string
  year: number
}

interface DeckHandle {
  reset: () => void
  swipeLeft: () => void
  swipeRight: () => void
}

const films: Film[] = [
  {
    body: 'A projectionist keeps a cinema open for an audience that may not exist.',
    genre: 'Drama',
    icon: 'i-lucide-clapperboard',
    id: 'last-screening',
    runtime: 108,
    title: 'The Last Screening',
    tone: 'from-indigo-500/30 via-indigo-500/10 to-transparent',
    year: 2024,
  },
  {
    body: 'Two strangers share a night train and a very bad map.',
    genre: 'Comedy',
    icon: 'i-lucide-train-front',
    id: 'night-train',
    runtime: 96,
    title: 'Night Train, Wrong Platform',
    tone: 'from-orange-500/30 via-orange-500/10 to-transparent',
    year: 2023,
  },
  {
    body: 'A sound designer records the last analogue room in the city.',
    genre: 'Documentary',
    icon: 'i-lucide-audio-lines',
    id: 'room-tone',
    runtime: 84,
    title: 'Room Tone',
    tone: 'from-teal-500/30 via-teal-500/10 to-transparent',
    year: 2025,
  },
  {
    body: 'A retired stunt double returns for one impossible final shot.',
    genre: 'Action',
    icon: 'i-lucide-zap',
    id: 'second-take',
    runtime: 121,
    title: 'Second Take',
    tone: 'from-rose-500/30 via-rose-500/10 to-transparent',
    year: 2022,
  },
  {
    body: 'A lighthouse keeper starts receiving letters addressed to the sea.',
    genre: 'Mystery',
    icon: 'i-lucide-waves',
    id: 'salt-letters',
    runtime: 112,
    title: 'Salt Letters',
    tone: 'from-sky-500/30 via-sky-500/10 to-transparent',
    year: 2021,
  },
]

const deck = ref<DeckHandle | null>(null)
const queued = ref<string[]>([])
const passed = ref<string[]>([])
const finished = ref(false)

const remaining = computed(
  () => films.length - queued.value.length - passed.value.length,
)

function onSwipe(id: string, direction: 'left' | 'right') {
  if (direction === 'right') {
    queued.value = [...queued.value, id]
  }
  else {
    passed.value = [...passed.value, id]
  }
}

function reset() {
  queued.value = []
  passed.value = []
  finished.value = false
  deck.value?.reset()
}
</script>
