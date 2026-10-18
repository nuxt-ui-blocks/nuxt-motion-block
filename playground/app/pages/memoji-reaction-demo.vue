<template>
  <div class="space-y-8 p-8">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold text-highlighted">
        EmojiReaction
      </h1>
      <p class="max-w-2xl text-sm text-muted">
        Fully controlled multi-reaction bar with an odometer count, a deterministic
        particle burst and a hover/keyboard emoji picker. The component never mutates its
        own data — increment the count and flip <code>reacted</code> inside
        <code>@react</code>.
      </p>
    </header>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-base font-semibold text-highlighted">
            Default — one active reaction
          </h2>
          <UButton
            size="xs"
            variant="ghost"
            @click="resetExclusive"
          >
            Reset
          </UButton>
        </div>
      </template>
      <div class="space-y-4">
        <MEmojiReaction
          :reactions="exclusive"
          :allow-multiple="false"
          show-picker
          @react="handleExclusive"
        />
        <p class="text-xs text-dimmed">
          Clicking a new reaction un-reacts the previous one first.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-base font-semibold text-highlighted">
          Multiple reactions
        </h2>
      </template>
      <div class="space-y-4">
        <MEmojiReaction
          :reactions="multiple"
          :allow-multiple="true"
          :burst-count="14"
          show-picker
          @react="handleMultiple"
        />
        <p class="text-xs text-dimmed">
          <code>allowMultiple</code> keeps every reaction independent, and each press throws
          14 particles.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-base font-semibold text-highlighted">
          Sizes
        </h2>
      </template>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <span class="w-10 shrink-0 text-xs font-medium text-dimmed uppercase">
            lg
          </span>
          <MEmojiReaction
            :reactions="large"
            size="lg"
            show-picker
            @react="handleLarge"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-10 shrink-0 text-xs font-medium text-dimmed uppercase">
            md
          </span>
          <MEmojiReaction
            :reactions="medium"
            size="md"
            show-picker
            @react="handleMedium"
          />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-10 shrink-0 text-xs font-medium text-dimmed uppercase">
            sm
          </span>
          <MEmojiReaction
            :reactions="small"
            size="sm"
            show-picker
            :burst="false"
            @react="handleSmall"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-base font-semibold text-highlighted">
          Picker variants
        </h2>
      </template>
      <div class="space-y-6">
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            Open by default (<code>defaultPickerOpen</code>)
          </p>
          <MEmojiReaction
            :reactions="defaultOpen"
            show-picker
            default-picker-open
            @react="handleDefaultOpen"
          />
        </div>
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            Custom picker emojis (<code>pickerEmojis</code>)
          </p>
          <MEmojiReaction
            :reactions="customPicker"
            show-picker
            :picker-emojis="['🌮', '🍕', '🥑', '🍣']"
            @react="handleCustomPicker"
          />
        </div>
        <div class="space-y-2">
          <p class="text-xs font-medium text-muted">
            Burst disabled (<code>burst: false</code>)
          </p>
          <MEmojiReaction
            :reactions="noBurst"
            show-picker
            :burst="false"
            @react="handleNoBurst"
          />
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h2 class="text-base font-semibold text-highlighted">
          Emitted events
        </h2>
      </template>
      <div class="space-y-3">
        <p class="text-xs text-dimmed">
          Newest first. Watch the exclusivity rule emit <code>react(id, false)</code> before
          <code>react(id, true)</code>, and a brand-new picker emoji emit its own emoji as the
          id.
        </p>
        <ul class="space-y-1 font-mono text-xs text-muted">
          <li
            v-for="(entry, index) in eventLog"
            :key="`${entry}-${index}`"
            class="rounded-md bg-muted/50 px-2 py-1"
          >
            {{ entry }}
          </li>
          <li
            v-if="eventLog.length === 0"
            class="text-dimmed"
          >
            No events yet.
          </li>
        </ul>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface DemoReaction {
  count: number
  emoji: string
  id: string
  label: string
  reacted: boolean
}

function seed(): DemoReaction[] {
  return [
    { count: 3, emoji: '🎉', id: 'party', label: 'Party', reacted: false },
    { count: 12, emoji: '🔥', id: 'fire', label: 'Fire', reacted: false },
    { count: 7, emoji: '😍', id: 'love', label: 'Love', reacted: false },
    { count: 0, emoji: '👀', id: 'eyes', label: 'Eyes', reacted: false },
  ]
}

/** Mirrors the documented controlled usage: the parent owns counts and flags. */
function applyReactions(
  reactions: DemoReaction[],
  id: string,
  reacted: boolean,
): DemoReaction[] {
  const existing = reactions.find(reaction => reaction.id === id)
  if (existing) {
    return reactions.map(reaction => reaction.id === id
      ? { ...reaction, count: reaction.count + (reacted ? 1 : -1), reacted }
      : reaction)
  }
  return [...reactions, { count: 1, emoji: id, id, label: id, reacted: true }]
}

const eventLog = ref<string[]>([])

function record(id: string, reacted: boolean): void {
  eventLog.value = [`react("${id}", ${reacted})`, ...eventLog.value].slice(0, 10)
}

const exclusive = ref(seed())
const multiple = ref(seed())
const large = ref(seed())
const medium = ref(seed())
const small = ref(seed())
const defaultOpen = ref(seed())
const customPicker = ref(seed())
const noBurst = ref(seed())

function update(target: { value: DemoReaction[] }, id: string, reacted: boolean): void {
  record(id, reacted)
  target.value = applyReactions(target.value, id, reacted)
}

function handleExclusive(id: string, reacted: boolean): void {
  update(exclusive, id, reacted)
}

function handleMultiple(id: string, reacted: boolean): void {
  update(multiple, id, reacted)
}

function handleLarge(id: string, reacted: boolean): void {
  update(large, id, reacted)
}

function handleMedium(id: string, reacted: boolean): void {
  update(medium, id, reacted)
}

function handleSmall(id: string, reacted: boolean): void {
  update(small, id, reacted)
}

function handleDefaultOpen(id: string, reacted: boolean): void {
  update(defaultOpen, id, reacted)
}

function handleCustomPicker(id: string, reacted: boolean): void {
  update(customPicker, id, reacted)
}

function handleNoBurst(id: string, reacted: boolean): void {
  update(noBurst, id, reacted)
}

function resetExclusive(): void {
  exclusive.value = seed()
}
</script>
