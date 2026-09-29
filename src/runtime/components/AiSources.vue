<template>
  <div :class="['w-full', props.class]">
    <button
      :aria-expanded="isOpen"
      class="flex w-full cursor-pointer items-center gap-2 rounded-lg py-1 text-left text-sm text-muted transition-colors hover:text-default"
      type="button"
      @blur="onHovered(false)"
      @click="isOpen = !isOpen"
      @focus="onHovered(true)"
      @mouseenter="onHovered(true)"
      @mouseleave="onHovered(false)"
    >
      <span class="flex items-center">
        <!-- @vue-ignore -->
        <Motion
          v-for="(entry, index) in stacked"
          :key="entry.id"
          :layout-id="isOpen ? undefined : `${layoutPrefix}-${entry.id}`"
          class="ai-sources-chip relative block"
          :style="{
            marginLeft: `${stackOffset(index)}px`,
            zIndex: stacked.length - index,
          }"
        >
          <SourceFavicon
            :size="STACK_FAVICON_PX"
            :source="entry"
          >
            <template #mark>
              <slot
                name="favicon"
                :source="entry"
              />
            </template>
          </SourceFavicon>
        </Motion>

        <span
          v-if="overflow > 0"
          class="ml-1 tabular-nums"
        >+{{ overflow }}</span>
      </span>

      <span>{{ props.label }}</span>

      <!-- @vue-ignore -->
      <Motion
        :animate="{ rotate: isOpen ? 90 : 0 }"
        class="flex size-4 items-center justify-center"
        :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
      >
        <UIcon
          aria-hidden="true"
          name="i-lucide-chevron-right"
          size="14"
        />
      </Motion>
    </button>

    <!--
      Upstream animates `height: auto` inside an AnimatePresence. That needs the
      height measured, which is the same fragile path avoided in `AiReasoning`;
      a `fr` track resolves to the content's natural height with no measurement
      at all. `min-height: 0` on the child is what lets the track shrink below
      that content size.
    -->
    <div
      :inert="!isOpen"
      class="ai-sources-body"
      :style="bodyStyle"
    >
      <ul class="mt-1 min-h-0 list-none overflow-hidden">
        <!-- @vue-ignore -->
        <Motion
          v-for="(entry, index) in props.sources"
          :key="entry.id"
          as="li"
          :animate="{ opacity: 1, y: 0 }"
          :initial="shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }"
          :transition="rowTransition(index)"
        >
          <a
            class="flex items-start gap-2.5 rounded-lg px-1 py-1.5 no-underline transition-colors hover:bg-muted"
            :href="entry.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            <!-- @vue-ignore -->
            <Motion
              class="mt-0.5 block shrink-0"
              :layout-id="`${layoutPrefix}-${entry.id}`"
              :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
            >
              <SourceFavicon
                :size="ROW_FAVICON_PX"
                :source="entry"
              >
                <template #mark>
                  <slot
                    name="favicon"
                    :source="entry"
                  />
                </template>
              </SourceFavicon>
            </Motion>

            <span class="min-w-0">
              <span class="block truncate text-sm font-medium text-default">{{ entry.title }}</span>
              <span class="block truncate text-xs text-muted">{{ entry.snippet ?? hostOf(entry.url) }}</span>
            </span>
          </a>
        </Motion>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref, resolveComponent, useId } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'

export interface AiSource {
  id: string
  /** Short excerpt or description. Falls back to the bare host. */
  snippet?: string
  title: string
  url: string
}

export interface AiSourcesProps {
  class?: string
  /** Start expanded. */
  defaultOpen?: boolean
  /** Label before the stack, e.g. "Sources". */
  label?: string
  sources: AiSource[]
}

const props = withDefaults(defineProps<AiSourcesProps>(), {
  class: '',
  defaultOpen: false,
  label: 'Sources',
})

/** Favicons shown in the collapsed stack before the "+n" chip. */
const STACK_LIMIT = 3
/** Overlap of the collapsed stack, and how far it fans on hover. */
const STACK_OVERLAP_PX = 8
const FAN_GAP_PX = 3
const ROW_STAGGER = 0.035
const STACK_FAVICON_PX = 18
const ROW_FAVICON_PX = 18
/** The globe fallback is drawn at 60% of the chip, matching upstream. */
const FALLBACK_ICON_RATIO = 0.6
const OPACITY_SECONDS = 0.18
const GRID_SECONDS = 0.32
const NO_MOTION = { duration: 0 }
const BODY_TRANSITION = `grid-template-rows ${GRID_SECONDS * 1000}ms cubic-bezier(${EASE_OUT.join(', ')}), opacity ${OPACITY_SECONDS * 1000}ms cubic-bezier(${EASE_OUT.join(', ')})`
const CHIP_SECONDS = 0.25
const CHIP_TRANSITION = `margin-left ${CHIP_SECONDS * 1000}ms cubic-bezier(${EASE_OUT.join(', ')})`

const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./u, '')
  }
  catch {
    return url
  }
}

/**
 * A source's mark — a real isotype or an `<img>`, never a letter.
 *
 * A slot rather than a URL so a brand's own SVG can be passed straight in.
 * When omitted the component draws a neutral globe: an honest "unknown host"
 * icon beats a fabricated one-letter badge pretending to be a logo.
 */
const SourceFavicon = defineComponent({
  name: 'AiSourceFavicon',
  props: {
    size: { type: Number, required: true },
    source: { type: Object as () => AiSource, required: true },
  },
  setup(markProps, { slots: markSlots }) {
    return () => {
      const { size, source } = markProps
      return h(
        'span',
        {
          class: 'flex items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-muted',
          style: { height: `${size}px`, width: `${size}px` },
        },
        markSlots.mark
          ? h(
              'span',
              {
                class: 'flex size-full items-center justify-center *:size-full *:fill-foreground *:object-cover',
              },
              markSlots.mark({ source }),
            )
          : h('span', { 'aria-hidden': 'true' }, [
              h(resolveComponent('UIcon'), {
                name: 'i-lucide-globe',
                size: size * FALLBACK_ICON_RATIO,
              }),
            ]),
      )
    }
  },
})

const shouldReduceMotion = useReducedMotion()
const isOpen = ref(props.defaultOpen)
const isHovered = ref(false)
/** Stable across SSR, unlike a random suffix. */
const layoutPrefix = useId()

const stacked = computed(() => props.sources.slice(0, STACK_LIMIT))
const overflow = computed(() => props.sources.length - stacked.value.length)
const fanned = computed(() => isHovered.value && !isOpen.value && !shouldReduceMotion.value)

/**
 * Hovering fans the stack apart as a hint that it is a set and not a single
 * badge. It is suppressed while open, where the stack has already resolved into
 * rows and a fan would just be noise.
 */
const stackOffset = (index: number) => {
  if (index === 0) {
    return 0
  }
  return fanned.value ? FAN_GAP_PX : -STACK_OVERLAP_PX
}

const onHovered = (next: boolean) => {
  isHovered.value = next
}

const rowTransition = (index: number) =>
  shouldReduceMotion.value
    ? NO_MOTION
    : { ...SPRING_DEFAULT, delay: index * ROW_STAGGER }

const bodyStyle = computed(() => {
  if (shouldReduceMotion.value) {
    return { gridTemplateRows: isOpen.value ? '1fr' : '0fr' }
  }
  return {
    gridTemplateRows: isOpen.value ? '1fr' : '0fr',
    opacity: isOpen.value ? 1 : 0,
    transition: BODY_TRANSITION,
  }
})
</script>

<style scoped>
.ai-sources-body {
  display: grid;
}

.ai-sources-chip {
  /*
   * The fan is driven by `margin-left` through a CSS transition rather than a
   * Motion spring. A Motion `animate` target on a `span` does not reliably reach
   * the element here, and a chip that never lands at the offset reads as a
   * broken stack rather than a hint — so the value is bound directly and the
   * transition supplies the motion. 250ms / bounce 0.1 matches the spring it
   * replaces closely enough that the fan still reads as springy.
   */
  transition: v-bind('CHIP_TRANSITION');
}

.ai-sources-body > * {
  min-height: 0;
  overflow: hidden;
}
</style>
