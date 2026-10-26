<template>
  <span
    ref="rootRef"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class, armed && 'rt-armed'] })"
    @pointerenter="onPointerEnter"
  >
    <!-- Every glyph below is aria-hidden, so the readable copy lives here. -->
    <span :class="ui.srOnly({ class: uiProps.ui?.srOnly })">{{ text }}</span>

    <template
      v-for="(character, characterIndex) in characters"
      :key="character.key"
    >
      <span
        v-if="character.isWhitespace"
        aria-hidden="true"
        :class="ui.space({ class: uiProps.ui?.space })"
      >{{ character.items[0] }}</span>
      <span
        v-else
        aria-hidden="true"
        :class="ui.char({ class: uiProps.ui?.char })"
      >
        <span
          :key="playCount"
          :class="[ui.column({ class: uiProps.ui?.column }), 'rt-column']"
          :style="columnStyle(character, characterIndex)"
        >
          <span
            v-for="(glyph, glyphIndex) in character.items"
            :key="glyphIndex"
            :class="ui.glyph({ class: uiProps.ui?.glyph })"
          >{{ glyph }}</span>
        </span>
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { useReducedMotion } from 'motion-v'
import { useHoverCapable } from '../composables/useHoverCapable'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import rollingText from '../theme/rolling-text'

export type RollingTextDirection = 'up' | 'down'
export type RollingTextTrigger = 'mount' | 'inView' | 'hover' | 'manual'

export interface RollingTextProps {
  /** Text to render. Split into graphemes before rolling. */
  text: string
  /** Extra classes for the root element. */
  class?: string
  /** Direction the glyph column rolls in before landing. */
  direction?: RollingTextDirection
  /** Roll duration per character, in milliseconds. */
  duration?: number
  /**
   * Ramp alphabet cycled through before landing on the target character.
   * Defaults to the unique characters found in `text`.
   */
  glyphs?: string
  /** Plays the roll when `trigger` is `manual` and this flips to `true`. */
  playing?: boolean
  /** Number of intermediate glyphs shown before the target lands. */
  rampLength?: number
  /** Per-character stagger, in milliseconds. */
  stagger?: number
  /** What starts the roll. */
  trigger?: RollingTextTrigger
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<RollingTextProps>(), {
  class: undefined,
  direction: 'up',
  duration: 500,
  glyphs: undefined,
  playing: false,
  rampLength: 4,
  stagger: 40,
  trigger: 'mount',
  ui: undefined,
})

const DEFAULT_GLYPH_POOL
  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const PERCENT = 100

interface RollingCharacter {
  isWhitespace: boolean
  items: string[]
  key: string
  targetIndex: number
}

const { props: uiProps, ui } = useMotionBlockUI({
  name: 'rollingText',
  props,
  theme: rollingText,
})

const rootRef = ref<HTMLElement | null>(null)
const hoverCapable = useHoverCapable()
const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

// `playCount` is both the replay counter and the ramp seed: 0 means "not armed
// yet", so the column simply shows the finished word until a trigger fires.
const playCount = ref(props.trigger === 'mount' ? 1 : 0)
const armed = computed(() => playCount.value > 0)

function segmentGraphemes(value: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(value), entry => entry.segment)
  }

  return [...value]
}

function buildGlyphPool(text: string, glyphs?: string): string[] {
  if (glyphs && glyphs.length > 0) {
    return segmentGraphemes(glyphs)
  }

  const unique = Array.from(
    new Set(segmentGraphemes(text).filter(char => char.trim().length > 0)),
  )

  return unique.length > 1 ? unique : segmentGraphemes(DEFAULT_GLYPH_POOL)
}

// Seeded PRNG so the server and the client build the same ramp on first render.
function mulberry32(seed: number) {
  let state = seed >>> 0

  return () => {
    state = (state + 0x6D2B79F5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildRamp(
  target: string,
  pool: string[],
  rampLength: number,
  direction: RollingTextDirection,
  random: () => number,
): string[] {
  const randomGlyphs = Array.from(
    { length: rampLength },
    () => pool[Math.floor(random() * pool.length)] ?? target,
  )
  const ramp = [...randomGlyphs, target]

  return direction === 'down' ? ramp.reverse() : ramp
}

function buildCharacters(
  text: string,
  pool: string[],
  rampLength: number,
  direction: RollingTextDirection,
  random: () => number,
): RollingCharacter[] {
  const occurrences = new Map<string, number>()

  return segmentGraphemes(text).map((char) => {
    const count = occurrences.get(char) ?? 0
    occurrences.set(char, count + 1)

    const isWhitespace = char.trim().length === 0
    const items = isWhitespace
      ? [char]
      : buildRamp(char, pool, rampLength, direction, random)

    return {
      isWhitespace,
      items,
      key: `${char}-${count}`,
      targetIndex: direction === 'down' ? 0 : items.length - 1,
    }
  })
}

const pool = computed(() => buildGlyphPool(props.text, props.glyphs))

const characters = computed(() => {
  const random = mulberry32(playCount.value + 1)
  return buildCharacters(props.text, pool.value, props.rampLength, props.direction, random)
})

function columnStyle(character: RollingCharacter, index: number): Record<string, string> {
  const count = character.items.length
  const from = props.direction === 'down' ? -((count - 1) / count) * PERCENT : 0
  const to = -((character.targetIndex / count) * PERCENT)

  return {
    '--rt-from': `${from}%`,
    '--rt-to': `${to}%`,
    '--rt-duration': `${props.duration}ms`,
    '--rt-delay': `${index * props.stagger}ms`,
  }
}

const isVisible = useElementVisibility(rootRef)
let inViewPlayed = false

watch(isVisible, (visible) => {
  if (props.trigger !== 'inView' || !visible || inViewPlayed || isReduced.value) {
    return
  }

  inViewPlayed = true
  playCount.value += 1
})

watch(() => props.playing, (playing, previous) => {
  if (props.trigger !== 'manual' || !playing || previous || isReduced.value) {
    return
  }

  playCount.value += 1
})

function onPointerEnter() {
  if (props.trigger !== 'hover' || !hoverCapable.value || isReduced.value) {
    return
  }

  playCount.value += 1
}
</script>

<style scoped>
.rt-column {
  transform: translateY(var(--rt-to, 0%));
}

.rt-armed .rt-column {
  animation: rt-roll var(--rt-duration, 500ms) cubic-bezier(0.645, 0.045, 0.355, 1) var(--rt-delay, 0ms) both;
}

@keyframes rt-roll {
  from {
    transform: translateY(var(--rt-from, 0%));
  }

  to {
    transform: translateY(var(--rt-to, 0%));
  }
}

@media (prefers-reduced-motion: reduce) {
  .rt-armed .rt-column {
    animation: none;
  }
}
</style>
