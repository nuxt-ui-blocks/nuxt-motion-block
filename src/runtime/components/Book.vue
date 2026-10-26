<script setup lang="ts">
import { computed } from 'vue'
import { useReducedMotion } from 'motion-v'

export type BookVariant = 'stripe' | 'simple'

export interface BookProps {
  /** Extra classes for the root wrapper. */
  class?: string
  /** Accent colour of the cover, as any CSS colour. */
  color?: string
  /** Title printed on the cover. */
  title: string
  /** Overrides the title colour. Defaults to `--ui-text-highlighted`. */
  textColor?: string
  /** `stripe` puts a colour band above the body; `simple` is one full-colour jacket. */
  variant?: BookVariant
  /** Book width in pixels. Height follows the 49:60 cover ratio. */
  width?: number
}

const BOOK_DEPTH = '29cqw'
const BOOK_BORDER_RADIUS = '6px 4px 4px 6px'
const DEFAULT_WIDTH = 196
const BG_SHADOW = 'linear-gradient(90deg, #fff0 0%, #fff0 12%, #ffffff40 29.25%, #fff0 50.5%, #fff0 75.25%, #ffffff40 91%, #fff0 100%), linear-gradient(90deg, #00000008 0%, #0000001a 12%, #0000 30%, #00000005 50%, #0003 73.5%, #00000080 75.25%, #00000026 85.25%, #0000 100%)'

const props = withDefaults(defineProps<BookProps>(), {
  class: undefined,
  color: '#e5a00d',
  textColor: undefined,
  variant: 'stripe',
  width: DEFAULT_WIDTH,
})

const shouldReduceMotion = useReducedMotion()
const isReduced = computed(() => shouldReduceMotion.value === true)

const bookWidth = computed(() => `${props.width}px`)

/**
 * The custom properties are set on the root and read by every layer below it,
 * so the cover, the spine gradient and the page block stay in one coordinate
 * system even when `width` changes.
 */
const rootStyle = computed(() => ({
  '--bg-shadow': BG_SHADOW,
  '--book-border-radius': BOOK_BORDER_RADIUS,
  '--book-color': props.color,
  '--book-depth': BOOK_DEPTH,
  '--book-text-color': props.textColor || 'var(--ui-text-highlighted)',
  '--book-width': bookWidth.value,
  'perspective': '900px',
}))

const rotateStyle = computed(() => ({
  aspectRatio: '49 / 60',
  minWidth: bookWidth.value,
}))

const rotateClasses = computed(() => [
  'relative w-fit [transform-style:preserve-3d] [container-type:inline-size]',
  isReduced.value
    ? ''
    : 'transition-transform duration-[250ms] ease-out group-hover:[transform:rotateY(-20deg)_scale(1.066)_translateX(-8px)] group-focus-visible:[transform:rotateY(-20deg)_scale(1.066)_translateX(-8px)]',
])

const coverStyle = computed(() => ({
  background: props.variant === 'simple' ? props.color : 'var(--ui-bg)',
  borderRadius: BOOK_BORDER_RADIUS,
  height: '100%',
  width: bookWidth.value,
}))

const backCoverStyle = computed(() => ({
  backgroundColor: props.variant === 'simple' ? props.color : 'var(--ui-bg)',
  borderRadius: BOOK_BORDER_RADIUS,
  height: '100%',
  transform: `translateZ(calc(-1 * ${BOOK_DEPTH}))`,
  width: bookWidth.value,
}))

const pageEdgesStyle = computed(() => ({
  height: 'calc(100% - 6px)',
  top: '3px',
  transform: `translateX(calc(${bookWidth.value} - 14.5cqw - 3px)) rotateY(90deg) translateX(14.5cqw)`,
  width: `calc(${BOOK_DEPTH} - 2px)`,
}))

const contentGap = computed(() => `${((props.variant === 'simple' ? 16 : 24) / DEFAULT_WIDTH) * props.width}px`)
const titleFontSize = computed(() => props.variant === 'simple' ? '12cqw' : '10.5cqw')
</script>

<template>
  <div
    :aria-label="`${props.title} book cover`"
    :class="[
      props.class,
      'group inline-block w-fit rounded-[6px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-default',
    ]"
    :style="rootStyle"
    role="img"
    tabindex="0"
  >
    <div
      :class="rotateClasses"
      :style="rotateStyle"
    >
      <div
        :class="[
          'absolute flex flex-col overflow-hidden shadow-[rgba(0,0,0,0.02)_0px_1px_1px,rgba(0,0,0,0.1)_0px_4px_8px_-4px,rgba(0,0,0,0.03)_0px_16px_24px_-8px] [transform:translateZ(0px)]',
          'dark:shadow-[rgba(0,0,0,0.05)_0px_1.8px_3.6px,rgba(0,0,0,0.08)_0px_10.8px_21.6px,rgba(0,0,0,0.1)_0px_-0.9px_inset,rgba(255,255,255,0.1)_0px_1.8px_1.8px_inset,rgba(0,0,0,0.1)_3.6px_0px_3.6px_inset]',
        ]"
        :style="coverStyle"
      >
        <template v-if="props.variant === 'stripe'">
          <div
            class="relative flex w-full flex-1 flex-row items-stretch gap-2 overflow-hidden [transform:translateZ(0px)]"
            :style="{ background: 'var(--book-color)' }"
          >
            <div class="flex-1">
              <slot name="illustration" />
            </div>
            <div
              aria-hidden="true"
              class="absolute inset-0"
              :style="{ background: 'var(--bg-shadow)', mixBlendMode: 'overlay' }"
            />
          </div>

          <div class="flex flex-row items-stretch">
            <div
              aria-hidden="true"
              class="min-w-[8.2%] opacity-20"
              :style="{ background: 'var(--bg-shadow)' }"
            />
            <div
              class="flex w-full flex-col justify-between [container-type:inline-size]"
              :style="{ gap: contentGap, padding: '6.1%' }"
            >
              <span
                class="font-semibold leading-[1.25em] tracking-[-0.02em] text-balance"
                :style="{ color: 'var(--book-text-color)', fontSize: titleFontSize }"
              >
                {{ props.title }}
              </span>
              <div v-if="$slots.logo">
                <slot name="logo" />
              </div>
            </div>
          </div>
        </template>

        <div
          v-else
          class="flex h-full w-full flex-row items-stretch"
        >
          <div
            aria-hidden="true"
            class="min-w-[8.2%]"
            :style="{ background: 'var(--bg-shadow)', mixBlendMode: 'overlay' }"
          />
          <div
            class="flex w-full flex-col justify-between [container-type:inline-size]"
            :style="{ gap: contentGap, padding: '6.1%' }"
          >
            <span
              class="font-semibold leading-[1.25em] tracking-[-0.02em] text-balance"
              :style="{ color: 'var(--book-text-color)', fontSize: titleFontSize }"
            >
              {{ props.title }}
            </span>
            <div v-if="$slots.logo">
              <slot name="logo" />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 border border-black/10 shadow-[rgba(255,255,255,0.3)_0px_1px_2px_inset] dark:border-0"
          :style="{ borderRadius: 'inherit' }"
        />
      </div>

      <div
        aria-hidden="true"
        class="pointer-events-none absolute bg-[linear-gradient(90deg,rgb(234,234,234)_0%,rgba(0,0,0,0)_70%),linear-gradient(rgb(255,255,255),rgb(250,250,250))] dark:bg-[linear-gradient(90deg,rgb(60,60,60)_0%,rgba(0,0,0,0)_70%),linear-gradient(rgb(40,40,40),rgb(35,35,35))]"
        :style="pageEdgesStyle"
      />

      <div
        aria-hidden="true"
        class="pointer-events-none absolute left-0"
        :style="backCoverStyle"
      />
    </div>
  </div>
</template>
