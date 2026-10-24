---
title: Card Swipe Deck
description: A deck of cards you throw left or right, with drag-driven stamps, a colour wash, a receding stack and an imperative API.
---

A deck you can throw. The top card follows the pointer, rotates around a pivot
below its bottom edge and either commits past a distance or velocity threshold
or springs back. Two outlined stamps bloom in the corners as the card travels,
and an edge wash tints it toward the outcome. The card behind promotes as the
top one leaves, so the stack never visibly loses depth.

The gesture has a keyboard equivalent and an imperative one. Focus the deck and
use the arrow keys, or call `swipeLeft`, `swipeRight` and `reset` on a template
ref from your own buttons. A visually hidden live region announces how many
cards remain after every swipe.

## Usage

Pass a list of items with stable `id`s and render each card through the default
slot. The slot receives the item, its index and whether it is the front card.
Listen for `swipe` to record the outcome and `empty` for the last card.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="card-swipe-deck-basic" />
  :::
#code
```vue
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
```

::

An item only needs an `id`. If you skip the slot, the component renders
`item.content` when it is a string, otherwise the id. The labels default to
`Nope` and `Like`; `labels.left` is the stamp for a left swipe (top-right) and
`labels.right` is the stamp for a right swipe (top-left).

## Customize

Tune the gesture with `threshold`, `rotationFactor`, `stackOffset` and
`stackSize`, or replace the stamps through `labels`. The example below uses a
shorter stack, a larger threshold and its own pass, queue and reset buttons. It
also supplies an `empty` slot, which replaces the default "No more cards" text.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="card-swipe-deck-custom" />
  :::
#code
```vue
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
```
::

The exposed handle mirrors the pointer gesture:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const deck = ref<{
  reset: () => void
  swipeLeft: () => void
  swipeRight: () => void
} | null>(null)
</script>

<template>
  <MCardSwipeDeck ref="deck" :items="items" />
  <UButton @click="deck?.swipeLeft()">Pass</UButton>
  <UButton @click="deck?.swipeRight()">Like</UButton>
  <UButton @click="deck?.reset()">Reset</UButton>
</template>
```

`reset()` brings every swiped card back, stops any running throw and returns the
top card to the centre. It does not undo state you keep outside the deck, so
clear your own counters in the same handler, as the custom example does.

## Props

::component-props
  ::component-prop{name="items" type="T[]" required}
  Cards to swipe. Each item needs a unique `id`; the first item starts on top.
  Extra fields are passed through to the default slot.
  ::
  ::component-prop{name="labels" type="{ left?: string; right?: string }" default="{ left: 'Nope', right: 'Like' }"}
  Stamp copy for a left and a right swipe.
  ::
  ::component-prop{name="threshold" type="number" default="110"}
  Horizontal drag distance in pixels required to commit a swipe. A flick that
  beats the velocity threshold commits below this distance.
  ::
  ::component-prop{name="rotationFactor" type="number" default="18"}
  Maximum rotation in degrees at the edge of the drag range.
  ::
  ::component-prop{name="stackOffset" type="number" default="14"}
  Vertical offset in pixels for each receding card.
  ::
  ::component-prop{name="stackSize" type="number" default="3"}
  How many cards are visible in the stack, front card included. One extra card
  is mounted so the depth is kept while the top card leaves.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disable dragging, keyboard swipes and the imperative methods.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the deck container. Use it to change the width and height.
  ::
::

## Events

::component-props
  ::component-prop{name="swipe" type="(id: string, direction: 'left' | 'right') => void"}
  Fired when a card is committed, whether by drag, keyboard or the imperative
  API. The card is already on its way out, so the id is the one that was on top.
  ::
  ::component-prop{name="empty" type="() => void"}
  Fired when the last card commits. It fires as the throw starts, not when the
  exit animation ends.
  ::
::

## Slots

::component-props
  ::component-prop{name="default" type="{ item: T; index: number; isFront: boolean }"}
  Card content. Use `isFront` to show an instruction or extra affordance only on
  the top card. The slot is rendered inside the rounded, clipped surface, so a
  full-bleed image fills the card.
  ::
  ::component-prop{name="empty" type="slot"}
  Replaces the default empty state once every card has been swiped.
  ::
::

## Accessibility

- The container is a focusable `role="application"` with the label
  "Swipeable card deck" and a description of the gesture, so a keyboard or
  screen reader user is told how to operate it before interacting.
- <kbd>Arrow Left</kbd> throws the top card left, <kbd>Arrow Right</kbd> and
  <kbd>Enter</kbd> throw it right. The keys call the same commit path as a drag,
  so callbacks and the empty state stay in sync.
- A visually hidden `aria-live="polite"` region announces the remaining count
  after every swipe, including "No cards remaining" at the end.
- The stamps and the colour wash are decorative and marked `aria-hidden`. The
  stamps also carry words, so the outcome is never signalled by colour alone.
- The deck has a visible focus ring, and `disabled` fades it, sets
  `aria-disabled` and removes drag, keyboard and imperative access.
- Under `prefers-reduced-motion: reduce`, a committed card is removed
  immediately with no throw and the stack cuts to its new position. Dragging,
  keyboard swipes and the exposed methods still work.

## Performance

- One pair of motion values drives the front card. Rotation, stamp opacity and
  scale and the two washes are derived with `useTransform`, so dragging does not
  trigger Vue renders.
- Only the front card is draggable. The cards behind it are static surfaces; one
  extra card is mounted (`stackSize + 1`) so promotion never reveals a gap.
- Stack promotion and card opacity are CSS transitions on `transform` and
  `opacity`. The reduced-motion media query removes those transitions without a
  second render branch.
- A throw starts two springs and one fallback timer. The timer, springs and
  pending completion are cleared on reset, unmount or the next throw.
- The component performs no network requests and no layout reads in render.
