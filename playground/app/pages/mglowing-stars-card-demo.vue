<template>
  <div class="space-y-12">
    <UPageHeader
      title="Glowing Stars Card"
      description="A field of 108 stars that twinkle on their own and flare across the grid under the pointer."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Basic
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        The star field is a fixed <code class="font-mono">grid-cols-18</code> of
        <code class="font-mono">108</code> cells. Every three seconds five random cells switch on,
        and hovering the field lights the whole grid with a delay of
        <code class="font-mono">(index × 10ms)</code> so the glow sweeps left to right. Each lit
        cell draws a second blurred dot in <code class="font-mono">starBgClass</code>.
      </p>

      <MGlowingStarsCard data-testid="card-basic">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-highlighted">Header slot</span>
            <UIcon
              name="i-lucide-star"
              class="size-4 text-primary"
            />
          </div>
        </template>

        <div class="space-y-2 py-4 text-center">
          <p class="text-sm text-muted">
            Hover the dots above to run the cascade.
          </p>
          <UButton
            label="Slot action"
            variant="soft"
            size="sm"
            data-testid="card-action"
          />
        </div>

        <template #footer>
          <div class="flex items-center justify-between text-xs text-muted">
            <span>footer slot</span>
            <UBadge
              variant="subtle"
              data-testid="card-badge"
            >
              108 stars
            </UBadge>
          </div>
        </template>
      </MGlowingStarsCard>

      <dl class="mt-8 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          stars
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-stars"
        >
          108
        </dd>
        <dt class="text-muted">
          columns
        </dt>
        <dd class="font-mono">
          grid-cols-18
        </dd>
        <dt class="text-muted">
          field height
        </dt>
        <dd class="font-mono">
          h-48
        </dd>
        <dt class="text-muted">
          random refresh
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-interval"
        >
          3000ms
        </dd>
        <dt class="text-muted">
          random glow
        </dt>
        <dd class="font-mono">
          5 stars per tick
        </dd>
        <dt class="text-muted">
          hover delay
        </dt>
        <dd class="font-mono">
          index × 0.01s
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Star glow
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        <code class="font-mono">starBgClass</code> is applied verbatim to the blurred halo behind
        each lit star, so it takes full utility strings — colour, plus the shadow that makes it
        bloom. The default is
        <code class="font-mono">bg-primary-400 … shadow-primary-400/50</code>; the card is keyed on
        the current value so the animation restarts with the new colour.
      </p>

      <div class="mb-8 grid place-items-center rounded-2xl bg-(--ui-bg-muted) px-6 py-6">
        <div class="w-full max-w-xl">
          <MGlowingStarsCard
            :key="starBg"
            data-testid="card-starbg"
            :star-bg-class="starBg"
          >
            <template #header>
              <span class="text-sm font-semibold text-highlighted">{{ starBgLabel }}</span>
            </template>

            <div class="py-4 text-center">
              <p class="font-mono text-xs text-muted">
                {{ starBg }}
              </p>
            </div>
          </MGlowingStarsCard>
        </div>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in starPresets"
          :key="option.label"
          :label="option.label"
          :variant="starBgLabel === option.label ? 'solid' : 'outline'"
          size="sm"
          :data-testid="`star-${option.label}`"
          @click="selectStar(option)"
        />
      </div>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          active
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-starbg"
        >
          {{ starBgLabel }}
        </dd>
        <dt class="text-muted">
          applied to
        </dt>
        <dd class="font-mono">
          blurred halo · z-10
        </dd>
        <dt class="text-muted">
          core star
        </dt>
        <dd class="font-mono">
          1px, scales 1 → 2.5
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Two independent timers
        </p>
      </template>

      <p class="mb-6 text-sm text-muted">
        One animation is a mounted <code class="font-mono">setInterval</code> that only ever runs on
        the client — the card itself guards it behind
        <code class="font-mono">typeof window !== 'undefined'</code> and clears it on unmount, so
        SSR never schedules anything. The other is the hover state, which simply flips a ref and
        lets motion re-run the same keyframes with new delays.
      </p>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="flex items-center rounded-2xl border border-dashed border-default p-6">
          <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <dt class="text-muted">
              idle
            </dt>
            <dd class="font-mono">
              random 5-star twinkle
            </dd>
            <dt class="text-muted">
              hover
            </dt>
            <dd class="font-mono">
              all 108, staggered
            </dd>
            <dt class="text-muted">
              keyframes
            </dt>
            <dd class="font-mono">
              scale [1, 1.2, 2.5, 2.2, 1.5]
            </dd>
            <dt class="text-muted">
              duration
            </dt>
            <dd class="font-mono">
              2s ease-in-out
            </dd>
            <dt class="text-muted">
              slots
            </dt>
            <dd class="font-mono">
              header · default · footer
            </dd>
            <dt class="text-muted">
              ui prop
            </dt>
            <dd class="font-mono">
              root / header / body / footer
            </dd>
          </dl>
        </div>

        <div class="rounded-2xl bg-(--ui-bg-muted) p-6 text-xs text-muted">
          <p class="font-semibold text-highlighted">
            Readout
          </p>
          <p
            class="mt-2 font-mono"
            data-testid="readout-timer"
          >
            interval: client-only · cleared on unmount
          </p>
          <p class="mt-2">
            Because the twinkle set lives in a ref that is replaced wholesale, the same star index
            can light up twice in a row — the array is five independent random picks, not a
            partition of the grid.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface StarPreset {
  label: string
  value: string
}

const starPresets: StarPreset[] = [
  {
    label: 'primary',
    value: 'bg-primary-400 dark:bg-primary-500 shadow-primary-400/50 dark:shadow-primary-500/50',
  },
  {
    label: 'amber',
    value: 'bg-amber-400 dark:bg-amber-500 shadow-amber-400/50 dark:shadow-amber-500/50',
  },
  {
    label: 'emerald',
    value: 'bg-emerald-400 dark:bg-emerald-500 shadow-emerald-400/50 dark:shadow-emerald-500/50',
  },
  {
    label: 'rose',
    value: 'bg-rose-400 dark:bg-rose-500 shadow-rose-400/50 dark:shadow-rose-500/50',
  },
]

const starBg = ref(starPresets[0].value)
const starBgLabel = ref(starPresets[0].label)

const selectStar = (option: StarPreset) => {
  starBg.value = option.value
  starBgLabel.value = option.label
}
</script>
