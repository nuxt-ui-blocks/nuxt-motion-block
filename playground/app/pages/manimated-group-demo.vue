<template>
  <div class="space-y-12">
    <UPageHeader
      title="AnimatedGroup"
      description="A container that turns each slot child into a motion component — presets, custom variants, and stagger radiating from the start, the center, or both edges."
    />

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Presets
        </p>
        <p class="text-muted">
          A preset is just a <code class="font-mono">variants</code> object the component already
          knows. Pick one and Replay — replay remounts the group, and the mount is what runs
          <code class="font-mono">initial → animate</code>.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in presets"
          :key="option"
          :color="preset === option ? 'primary' : 'neutral'"
          :label="option"
          :variant="preset === option ? 'solid' : 'outline'"
          size="sm"
          data-testid="preset"
          @click="selectPreset(option)"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay"
          @click="replay()"
        />
      </div>

      <MAnimatedGroup
        :key="`${preset}-${replayKey}`"
        :preset="preset"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3"
        data-testid="presets-group"
      >
        <div
          v-for="item in tiles"
          :key="item.label"
          class="flex items-center gap-3 rounded-2xl border border-default bg-(--ui-bg-muted) p-4"
        >
          <UIcon
            :name="item.icon"
            class="size-5 text-primary"
          />
          <span class="text-sm font-medium">{{ item.label }}</span>
        </div>
      </MAnimatedGroup>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          preset
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-preset"
        >
          {{ preset }}
        </dd>
        <dt class="text-muted">
          hidden state
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-hidden"
        >
          {{ presetInfo[preset].hidden }}
        </dd>
        <dt class="text-muted">
          visible state
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-visible"
        >
          {{ presetInfo[preset].visible }}
        </dd>
        <dt class="text-muted">
          timing
        </dt>
        <dd class="font-mono">
          {{ presetInfo[preset].timing }}
        </dd>
        <dt class="text-muted">
          items animated
        </dt>
        <dd class="font-mono">
          {{ tiles.length }} (flattened)
        </dd>
        <dt class="text-muted">
          replay mechanism
        </dt>
        <dd class="font-mono">
          :key remount
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Stagger origin
        </p>
        <p class="text-muted">
          <code class="font-mono">start</code> keeps the container-level
          <code class="font-mono">staggerChildren</code> transition, so it is linear by
          definition. <code class="font-mono">center</code> and <code class="font-mono">edges</code>
          cannot be expressed that way, so each child gets its own positive delay measured from
          the origin — the ripple reads as one wave travelling out of the middle, or in from both
          ends at once.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          v-for="option in origins"
          :key="option"
          :color="staggerFrom === option ? 'primary' : 'neutral'"
          :label="option"
          :variant="staggerFrom === option ? 'solid' : 'outline'"
          size="sm"
          data-testid="origin"
          @click="staggerFrom = option"
        />
        <UButton
          :color="staggerDirection === -1 ? 'primary' : 'neutral'"
          :label="`staggerDirection ${staggerDirection}`"
          :variant="staggerDirection === -1 ? 'solid' : 'outline'"
          size="sm"
          data-testid="direction"
          @click="staggerDirection = staggerDirection === 1 ? -1 : 1"
        />
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-stagger"
          @click="replay()"
        />
      </div>

      <MAnimatedGroup
        :key="`stagger-${replayKey}`"
        :preset="'slide'"
        :stagger-children="staggerChildren"
        :stagger-direction="staggerDirection"
        :stagger-from="staggerFrom"
        class="grid grid-cols-3 gap-4 sm:grid-cols-6"
        data-testid="stagger-group"
      >
        <div
          v-for="item in chips"
          :key="item"
          class="flex items-center justify-center rounded-2xl bg-primary/10 p-4 text-xs font-semibold text-primary"
        >
          {{ item }}
        </div>
      </MAnimatedGroup>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          staggerFrom
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-from"
        >
          {{ staggerFrom }}
        </dd>
        <dt class="text-muted">
          staggerChildren
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-children"
        >
          {{ staggerChildren.toFixed(2) }}s
        </dd>
        <dt class="text-muted">
          staggerDirection
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-direction"
        >
          {{ staggerDirection }}
        </dd>
        <dt class="text-muted">
          container stagger
        </dt>
        <dd class="font-mono">
          {{ staggerFrom === 'start' ? `${staggerChildren.toFixed(2)}s` : '0 (per-child delays instead)' }}
        </dd>
        <dt class="text-muted">
          per-child delays
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-delays"
        >
          {{ delaySummary }}
        </dd>
        <dt class="text-muted">
          direction applies
        </dt>
        <dd class="font-mono">
          {{ staggerFrom === 'start' ? 'yes — container staggerDirection' : 'no — container stagger is 0' }}
        </dd>
      </dl>

      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <UFormField
          label="staggerChildren (seconds between children)"
          :max="0.3"
          :min="0"
          :step="0.01"
        >
          <USlider
            v-model="staggerChildren"
            :max="0.3"
            :min="0"
            :step="0.01"
          />
        </UFormField>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Custom variants
        </p>
        <p class="text-muted">
          <code class="font-mono">variants.container</code> and
          <code class="font-mono">variants.item</code> replace the preset entirely — supplying
          <code class="font-mono">item</code> means <code class="font-mono">preset</code> is
          ignored. Your item states merge over the defaults, so a bare
          <code class="font-mono">visible</code> still fades in.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-variants"
          @click="replay()"
        />
      </div>

      <MAnimatedGroup
        :key="`variants-${replayKey}`"
        :variants="customVariants"
        :stagger-children="0.12"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2"
        data-testid="variants-group"
      >
        <div
          v-for="card in cards"
          :key="card.title"
          class="rounded-2xl border border-default p-5"
        >
          <p class="font-bold text-highlighted">
            {{ card.title }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ card.body }}
          </p>
        </div>
      </MAnimatedGroup>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          variants.item
        </dt>
        <dd class="font-mono">
          hidden: opacity 0, y 24, rotate −4
        </dd>
        <dt class="text-muted">
          variants.item
        </dt>
        <dd class="font-mono">
          visible: opacity 1, y 0, rotate 0
        </dd>
        <dt class="text-muted">
          preset with item
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-precedence"
        >
          ignored — item wins
        </dd>
        <dt class="text-muted">
          defaults merged
        </dt>
        <dd class="font-mono">
          opacity keys from defaultItemVariants
        </dd>
        <dt class="text-muted">
          container transition
        </dt>
        <dd class="font-mono">
          staggerChildren 0.12
        </dd>
        <dt class="text-muted">
          order
        </dt>
        <dd class="font-mono">
          document order, index-based
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Element tags
        </p>
        <p class="text-muted">
          <code class="font-mono">as</code> is the container tag and
          <code class="font-mono">asChild</code> is what each item is rendered as. Children are
          flattened first — comments, empty text and multi-child wrappers are unwrapped, so a
          <code class="font-mono">v-for</code> or a fragment inside the slot animates as
          individual items rather than one blob. Each child is then rendered
          <em>inside</em> its own <code class="font-mono">asChild</code> element, so the slot
          holds the item content — putting the same tag in the slot again would nest
          <code class="font-mono">&lt;li&gt;</code> in
          <code class="font-mono">&lt;li&gt;</code> and break hydration.
        </p>
      </template>

      <div class="mb-6 flex flex-wrap gap-2">
        <UButton
          label="Replay"
          icon="i-lucide-rotate-cw"
          variant="outline"
          data-testid="replay-tags"
          @click="replay()"
        />
      </div>

      <div class="rounded-2xl border border-default p-4">
        <MAnimatedGroup
          :key="`tags-${replayKey}`"
          as="ul"
          as-child="li"
          preset="scale"
          class="grid grid-cols-2 gap-3 sm:grid-cols-4"
          data-testid="tags-group"
        >
          <span
            v-for="chip in chips"
            :key="chip"
            class="flex items-center justify-center rounded-xl border border-default bg-(--ui-bg-muted) px-3 py-4 text-sm font-medium"
          >
            {{ chip }}
          </span>
        </MAnimatedGroup>
      </div>

      <dl class="mt-6 grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          container tag
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-as"
        >
          ul (as)
        </dd>
        <dt class="text-muted">
          item tag
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-as-child"
        >
          li (asChild)
        </dd>
        <dt class="text-muted">
          items
        </dt>
        <dd class="font-mono">
          {{ chips.length }} li wrappers
        </dd>
        <dt class="text-muted">
          flattened
        </dt>
        <dd class="font-mono">
          comments, empty text, wrappers
        </dd>
        <dt class="text-muted">
          container class
        </dt>
        <dd class="font-mono">
          class prop → props.class
        </dd>
        <dt class="text-muted">
          default tags
        </dt>
        <dd class="font-mono">
          as=div, asChild=div
        </dd>
      </dl>
    </UCard>

    <UCard>
      <template #header>
        <p class="text-2xl font-bold text-highlighted">
          Reduced motion
        </p>
        <p class="text-muted">
          The component reads the media query through
          <code class="font-mono">useAccessibility()</code>. Under reduce, the group starts at
          <code class="font-mono">animate</code> instead of <code class="font-mono">initial</code>
          — content lands on its final state with no transition — and the per-child stagger modes
          are disabled entirely.
        </p>
      </template>

      <dl class="grid w-full grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
        <dt class="text-muted">
          prefers-reduced-motion
        </dt>
        <dd
          class="font-mono"
          data-testid="readout-reduced"
        >
          {{ prefersReducedMotion ? 'reduce' : 'no-preference' }}
        </dd>
        <dt class="text-muted">
          initial under reduce
        </dt>
        <dd class="font-mono">
          equals animate → static
        </dd>
        <dt class="text-muted">
          staggerFrom under reduce
        </dt>
        <dd class="font-mono">
          per-child delays disabled
        </dd>
        <dt class="text-muted">
          content
        </dt>
        <dd class="font-mono">
          present, just not animated
        </dd>
        <dt class="text-muted">
          ARIA added
        </dt>
        <dd class="font-mono">
          none by this component
        </dd>
        <dt class="text-muted">
          focus
        </dt>
        <dd class="font-mono">
          not managed — items are plain
        </dd>
      </dl>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAccessibility } from '../../../src/runtime/composables/useAccessibility'
import type { PresetType, StaggerFrom } from '../../../src/runtime/components/AnimatedGroup.vue'

const presets: PresetType[] = ['fade', 'slide', 'scale', 'blur', 'blur-slide', 'zoom', 'flip', 'bounce', 'rotate', 'swing']
const origins: StaggerFrom[] = ['start', 'center', 'edges']

const presetInfo: Record<PresetType, { hidden: string, visible: string, timing: string }> = {
  'bounce': { hidden: 'y −50, opacity 0', visible: 'y 0, opacity 1', timing: 'spring 400/10' },
  'blur': { hidden: 'blur(4px), opacity 0', visible: 'blur(0px), opacity 1', timing: 'default tween' },
  'blur-slide': { hidden: 'blur(4px), y 20, opacity 0', visible: 'blur(0), y 0, opacity 1', timing: 'default tween' },
  'fade': { hidden: 'opacity 0', visible: 'opacity 1', timing: 'default tween' },
  'flip': { hidden: 'rotateX −90, opacity 0', visible: 'rotateX 0, opacity 1', timing: 'spring 300/20' },
  'rotate': { hidden: 'rotate −180, opacity 0', visible: 'rotate 0, opacity 1', timing: 'spring 200/15' },
  'scale': { hidden: 'scale 0.8, opacity 0', visible: 'scale 1, opacity 1', timing: 'default tween' },
  'slide': { hidden: 'y 20, opacity 0', visible: 'y 0, opacity 1', timing: 'default tween' },
  'swing': { hidden: 'rotate −10, opacity 0', visible: 'rotate 0, opacity 1', timing: 'spring 300/8' },
  'zoom': { hidden: 'scale 0.5, opacity 0', visible: 'scale 1, opacity 1', timing: 'spring 300/20' },
}

const tiles = [
  { icon: 'i-lucide-rocket', label: 'Launch' },
  { icon: 'i-lucide-anchor', label: 'Anchor' },
  { icon: 'i-lucide-orbit', label: 'Orbit' },
  { icon: 'i-lucide-flame', label: 'Flame' },
  { icon: 'i-lucide-gem', label: 'Gem' },
  { icon: 'i-lucide-zap', label: 'Zap' },
] as const

const chips = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta'] as const

const cards = [
  { title: 'Container', body: 'Owns the stagger in visible.transition — nothing else about the children.' },
  { title: 'Item', body: 'Merged over the default hidden/visible opacity states, so an incomplete variant still fades.' },
  { title: 'Precedence', body: 'variants.item beats preset: supplying one means the other never runs.' },
  { title: 'Stagger', body: 'staggerChildren 0.12 sits on the container, so start-to-end order is document order.' },
] as const

const customVariants = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  },
  item: {
    hidden: { opacity: 0, y: 24, rotate: -4 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
}

const preset = ref<PresetType>('slide')
const staggerFrom = ref<StaggerFrom>('start')
const staggerChildren = ref(0.1)
const staggerDirection = ref(1)
const replayKey = ref(0)

const { prefersReducedMotion } = useAccessibility()

function selectPreset(option: PresetType) {
  preset.value = option
  replayKey.value++
}

function replay() {
  replayKey.value++
}

/**
 * Mirrors the component's childDelay so the readout shows the delay each
 * child actually receives, not a guess.
 */
function childDelay(index: number, count: number): number {
  const step = Math.max(staggerChildren.value, 0)
  if (step === 0 || count <= 1) {
    return 0
  }
  if (staggerFrom.value === 'center') {
    return Math.abs(index - (count - 1) / 2) * step
  }
  return Math.min(index, count - 1 - index) * step
}

const delaySummary = computed(() => {
  const count = chips.length
  if (staggerFrom.value === 'start') {
    return Array.from({ length: count }, (_, index) => (index * staggerChildren.value).toFixed(2)).join(' ')
  }
  return Array.from({ length: count }, (_, index) => childDelay(index, count).toFixed(2)).join(' ')
})
</script>
