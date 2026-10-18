<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <button
      :aria-expanded="isOpen"
      :class="ui.trigger({ class: uiProps.ui?.trigger })"
      type="button"
      @blur="onHovered(false)"
      @click="isOpen = !isOpen"
      @focus="onHovered(true)"
      @mouseenter="onHovered(true)"
      @mouseleave="onHovered(false)"
    >
      <span :class="ui.stack({ class: uiProps.ui?.stack })">
        <!-- @vue-ignore -->
        <Motion
          v-for="(entry, index) in stacked"
          :key="entry.id"
          :layout-id="isOpen ? undefined : `${layoutPrefix}-${entry.id}`"
          :class="ui.chip({ class: uiProps.ui?.chip })"
          :style="{
            marginLeft: index === 0 ? '0px' : `${FAN_GAP_PX}px`,
            zIndex: stacked.length - index,
            transform: `translateX(${chipShift(index)}px)`,
          }"
        >
          <SourceFavicon
            :size="STACK_FAVICON_PX"
            :source="entry"
            :base-class="ui.faviconBase({ class: uiProps.ui?.faviconBase })"
            :mark-class="ui.faviconMark({ class: uiProps.ui?.faviconMark })"
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
          :class="[ui.overflow({ class: uiProps.ui?.overflow }), 'ai-sources-ov']"
          :style="{ transform: `translateX(${overflowShift}px)` }"
        >+{{ overflow }}</span>
      </span>

      <span>{{ props.label }}</span>

      <!-- @vue-ignore -->
      <Motion
        :animate="{ rotate: isOpen ? 90 : 0 }"
        :class="ui.chevron({ class: uiProps.ui?.chevron })"
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
      :class="ui.body({ class: uiProps.ui?.body })"
      :style="bodyStyle"
    >
      <ul :class="ui.list({ class: uiProps.ui?.list })">
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
            :class="ui.link({ class: uiProps.ui?.link })"
            :href="entry.url"
            rel="noopener noreferrer"
            target="_blank"
          >
            <!-- @vue-ignore -->
            <Motion
              :class="ui.favicon({ class: uiProps.ui?.favicon })"
              :layout-id="isOpen ? `${layoutPrefix}-${entry.id}` : undefined"
              :transition="shouldReduceMotion ? NO_MOTION : SPRING_DEFAULT"
            >
              <SourceFavicon
                :size="ROW_FAVICON_PX"
                :source="entry"
                :base-class="ui.faviconBase({ class: uiProps.ui?.faviconBase })"
                :mark-class="ui.faviconMark({ class: uiProps.ui?.faviconMark })"
              >
                <template #mark>
                  <slot
                    name="favicon"
                    :source="entry"
                  />
                </template>
              </SourceFavicon>
            </Motion>

            <span :class="ui.rowText({ class: uiProps.ui?.rowText })">
              <span :class="ui.rowTitle({ class: uiProps.ui?.rowTitle })">{{ entry.title }}</span>
              <span :class="ui.rowSnippet({ class: uiProps.ui?.rowSnippet })">{{ entry.snippet ?? hostOf(entry.url) }}</span>
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
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import { EASE_OUT, SPRING_DEFAULT } from '../utils/motion-tokens'
import aiSources from '../theme/ai-sources'

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
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AiSourcesProps>(), {
  class: '',
  defaultOpen: false,
  label: 'Sources',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'aiSources', props, theme: aiSources })

/** Favicons shown in the collapsed stack before the "+n" chip. */
const STACK_LIMIT = 3
/** Overlap of the collapsed stack, and how far it fans on hover. */
const STACK_OVERLAP_PX = 8
const FAN_GAP_PX = 3
/** How far a chip travels from its resting overlap to its fanned gap. */
const FAN_SHIFT_PX = STACK_OVERLAP_PX + FAN_GAP_PX
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
const CHIP_TRANSITION = `transform ${CHIP_SECONDS * 1000}ms cubic-bezier(${EASE_OUT.join(', ')})`

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
    baseClass: { type: String, default: undefined },
    markClass: { type: String, default: undefined },
  },
  setup(markProps, { slots: markSlots }) {
    return () => {
      const { size, source } = markProps
      return h(
        'span',
        {
          class: markProps.baseClass,
          style: { height: `${size}px`, width: `${size}px` },
        },
        markSlots.mark
          ? h(
              'span',
              {
                class: markProps.markClass,
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
 *
 * The chips are laid out at their fanned spacing and pulled back into an overlap
 * by a transform. Animating a layout property — a reactive `margin-left` — re-runs
 * the shared-`layout-id` FLIP on every hover, which fights the CSS transition and
 * reads as a jitter; the transform changes only the painted position, so the
 * layout, and the label beside the stack, never move.
 */
const chipShift = (index: number): number =>
  fanned.value ? 0 : index * -FAN_SHIFT_PX

/** The `+n` chip tracks the last visible chip, so it hugs the stack at rest. */
const overflowShift = computed(() => chipShift(Math.max(0, stacked.value.length - 1)))

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

.ai-sources-chip,
.ai-sources-ov {
  /*
   * The fan is a CSS `transform` transition. The chips sit at their fanned
   * spacing in layout, so the resting overlap is the transform's negative offset
   * and the fan only changes what is painted — nothing reflows and the label
   * beside the stack never shifts. 250ms / bounce 0.1 matches the spring it
   * replaces closely enough that the fan still reads as springy.
   */
  transition: v-bind('CHIP_TRANSITION');
}

.ai-sources-body > * {
  min-height: 0;
  overflow: hidden;
}
</style>
