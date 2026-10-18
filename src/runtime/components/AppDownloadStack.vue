<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import appDownloadStack from '../theme/app-download-stack'

defineOptions({ inheritAttrs: false })

export interface AppDownloadStackApp {
  /** Nuxt UI icon name for the app icon (e.g. `i-simple-icons-safari`). */
  icon: string
  /** Stable identity — also the value carried in every emitted payload. */
  id: number
  name: string
}

export interface AppDownloadStackProps {
  /** Merged onto the outer centred column. */
  class?: string
  /** Defaults to the built-in placeholder macOS app list. */
  apps?: AppDownloadStackApp[]
  /** Selector header text. */
  title?: string
  /** Controlled selection. Leave undefined to let the stack track it itself. */
  selectedApps?: number[]
  /** Controlled expansion. Leave undefined to let the stack toggle itself. */
  expanded?: boolean
  /** Per-slot classes resolved against the component theme. */
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<AppDownloadStackProps>(), {
  apps: undefined,
  class: undefined,
  expanded: undefined,
  selectedApps: undefined,
  title: 'Starter Mac',
  ui: undefined,
})

const emit = defineEmits<{
  'change': [selected: number[]]
  'download': [selected: number[]]
  'expand-change': [expanded: boolean]
  'update:expanded': [expanded: boolean]
  'update:selectedApps': [selected: number[]]
}>()

const { props: uiProps, ui } = useMotionBlockUI({ name: 'appDownloadStack', props, theme: appDownloadStack })

const DOWNLOAD_DURATION_MS = 3000
const RESET_DELAY_MS = 1000
const SHINE_DURATION = 1
const ROTATION_MULTIPLIER = 8
const TRANSLATION_MULTIPLIER = 3
const BASE_Z_INDEX = 40
const Z_INDEX_STEP = 10
const HOVER_X_MULTIPLIER = 10
const HOVER_Y_MULTIPLIER = 10
const FLOAT_AMPLITUDE = 5
const FLOAT_DURATION = 2
const FLOAT_DELAY_MULTIPLIER = 0.2
const STAGGER_DELAY_MULTIPLIER = 0.1
const STAGGER_DURATION = 0.25
const TRANSITION_DURATION = 0.3
const CHECKMARK_TRANSITION_DURATION = 0.3
const REDUCED_EASE: [number, number, number, number] = [0.645, 0.045, 0.355, 1]
const INFINITE_REPEAT = Number.POSITIVE_INFINITY

/**
 * Placeholder icons only — pass your own `apps` in anything you ship. Names are
 * Nuxt UI (Iconify) names so the component stays self-contained with no external
 * image request when the registry copies it into someone else's project.
 */
const DEFAULT_APPS: AppDownloadStackApp[] = [
  { icon: 'i-lucide-compass', id: 1, name: 'Safari' },
  { icon: 'i-lucide-image', id: 2, name: 'Photos' },
  { icon: 'i-lucide-mic', id: 3, name: 'Podcasts' },
  { icon: 'i-lucide-calendar-days', id: 4, name: 'Calendar' },
]

/**
 * Shared, never-mutated prop bags. motion-v diffs these by identity, so handing
 * every render a freshly-built object makes it re-resolve the animation graph on
 * each parent-driven re-render (the header count alone re-renders the selector
 * every time an app is ticked).
 */
const ICON_TRANSITION = { duration: TRANSITION_DURATION }
const ZERO_TRANSITION = { duration: 0 }
const REDUCED_ICON_MOTION = {
  animate: 'rest',
  initial: 'rest',
  transition: ZERO_TRANSITION,
}
const REDUCED_TILE_MOTION = {
  animate: { opacity: 1 },
  initial: { opacity: 1 },
  transition: ZERO_TRANSITION,
}
const REDUCED_PANEL_MOTION = {
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: ZERO_TRANSITION },
  initial: { opacity: 1 },
}
const PANEL_MOTION = {
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  initial: { opacity: 0, scale: 0.8 },
}

const shouldReduceMotion = useReducedMotion()
const shineControls = useAnimationControls()

const internalExpanded = ref(false)
const internalSelected = ref<number[]>([])
const isDownloading = ref(false)
const downloadComplete = ref(false)
const hovered = ref(false)

const apps = computed(() => props.apps ?? DEFAULT_APPS)
const isExpanded = computed(() => props.expanded ?? internalExpanded.value)
const selected = computed(() => props.selectedApps ?? internalSelected.value)

let downloadTimer: ReturnType<typeof setTimeout> | undefined
let resetTimer: ReturnType<typeof setTimeout> | undefined
let isUnmounted = false

/**
 * The trigger is a plain `<button>`, so the reference's `whileHover="hover"`
 * cannot live on it — motion-v does not reliably forward gesture props onto the
 * node it renders, and the reference relies on `whileHover` on the *button*
 * propagating the `hover` label down to the icons as variant children. Only the
 * icon under the cursor would ever receive its own `whileHover`, so the fan-out
 * silently never happened.
 *
 * The port therefore reads the pointer on the plain button (both listeners bound
 * unconditionally — a conditionally-bound listener is captured on the first
 * render and never updated) and hands the result to motion-v through `animate`,
 * which is the prop the rules say to express motion with. The label reaches all
 * four icons at once, exactly as the reference's propagation does.
 */
function setHovered(value: boolean) {
  hovered.value = value
}

function setExpanded(value: boolean) {
  hovered.value = false
  if (props.expanded === undefined) {
    internalExpanded.value = value
  }
  emit('update:expanded', value)
  emit('expand-change', value)
}

function setSelected(value: number[]) {
  if (props.selectedApps === undefined) {
    internalSelected.value = value
  }
  emit('update:selectedApps', value)
  emit('change', value)
}

function toggleApp(id: number) {
  const current = selected.value
  setSelected(
    current.includes(id) ? current.filter(appId => appId !== id) : [...current, id],
  )
}

/**
 * The reference sweeps the highlight with `useAnimationControls`, calling
 * `start()` in the same handler that flips `isDownloading` on. That ordering is
 * safe in React but not in Vue: the shine node is created by the `isDownloading`
 * branch, so on the tick `start()` runs there is no element for the controls to
 * resolve against and the sweep is dropped — the highlight then sits at
 * `translateX(0px)` for the whole download. Waiting a tick lets the panel mount
 * and register first.
 *
 * This has to stay on animation controls rather than a declarative `animate`
 * object: motion-v accepts the `'0%' -> '100%'` keyframe pair through
 * `controls.start()` but drops it from `animate`, leaving the node with no
 * transform at all.
 */
function startShine() {
  if (shouldReduceMotion.value) {
    return
  }

  nextTick(() => {
    if (!isUnmounted) {
      shineControls.start({
        transition: {
          duration: SHINE_DURATION,
          ease: 'linear',
          repeat: INFINITE_REPEAT,
        },
        x: ['0%', '100%'],
      })
    }
  })
}

function handleDownload() {
  hovered.value = false
  isDownloading.value = true
  emit('download', [...selected.value])

  startShine()

  downloadTimer = setTimeout(() => {
    shineControls.stop()
    downloadComplete.value = true

    resetTimer = setTimeout(() => {
      setExpanded(false)
      setSelected([])
      isDownloading.value = false
      downloadComplete.value = false
    }, RESET_DELAY_MS)
  }, DOWNLOAD_DURATION_MS)
}

onBeforeUnmount(() => {
  isUnmounted = true
  hovered.value = false

  if (downloadTimer) {
    clearTimeout(downloadTimer)
    downloadTimer = undefined
  }
  if (resetTimer) {
    clearTimeout(resetTimer)
    resetTimer = undefined
  }
  shineControls.stop()
})

/**
 * motion-v types the `variants` prop as
 * `{ [k: string]: VariantType | ((custom: unknown) => VariantType) }`, so the
 * variant callbacks take `unknown` and narrow it themselves rather than
 * declaring `(i: number)` — a narrower parameter is not assignable.
 *
 * Built once, outside any reactive container, so the object identity handed to
 * `variants` never changes and motion-v does not rebuild the animation graph on
 * every render. Reading `shouldReduceMotion.value` at call time is what the
 * reference's `useMemo([shouldReduceMotion])` re-creation achieves on the React
 * side — with one addition: the reduced-motion `initial` and `hover` variants
 * are the same flat keyframe, so they are folded into a single `rest` label.
 * That is what lets a mid-flight preference flip land the icons flat instead of
 * stranding them on the fanned keyframes captured before the media query
 * resolved.
 */
const stackVariants = {
  float: (custom: unknown) => {
    const i = Number(custom)

    if (shouldReduceMotion.value) {
      return { y: 0 }
    }

    return {
      transition: {
        y: {
          delay: i * FLOAT_DELAY_MULTIPLIER,
          duration: FLOAT_DURATION,
          ease: REDUCED_EASE,
          repeat: INFINITE_REPEAT,
        },
      },
      y: [0, -FLOAT_AMPLITUDE, 0],
    }
  },
  hover: (custom: unknown) => {
    const i = Number(custom)

    if (shouldReduceMotion.value) {
      return {
        rotate: 0,
        x: 0,
        y: 0,
        zIndex: BASE_Z_INDEX - i * Z_INDEX_STEP,
      }
    }

    return {
      rotate: 0,
      x: i * HOVER_X_MULTIPLIER,
      y: -i * HOVER_Y_MULTIPLIER,
      zIndex: BASE_Z_INDEX - i * Z_INDEX_STEP,
    }
  },
  initial: (custom: unknown) => {
    const i = Number(custom)

    if (shouldReduceMotion.value) {
      return {
        rotate: 0,
        x: 0,
        y: 0,
        zIndex: BASE_Z_INDEX - i * Z_INDEX_STEP,
      }
    }

    return {
      rotate: i % 2 === 0
        ? -ROTATION_MULTIPLIER * (i + 1)
        : ROTATION_MULTIPLIER * (i + 1),
      x: i % 2 === 0
        ? -TRANSLATION_MULTIPLIER * (i + 1)
        : TRANSLATION_MULTIPLIER * (i + 1),
      y: 0,
      zIndex: BASE_Z_INDEX - i * Z_INDEX_STEP,
    }
  },
  rest: (custom: unknown) => {
    const i = Number(custom)
    return {
      rotate: 0,
      x: 0,
      y: 0,
      zIndex: BASE_Z_INDEX - i * Z_INDEX_STEP,
    }
  },
}

/**
 * `interactive` is the collapsed stack only: the reference gives the icons in
 * the downloading panel no `whileHover`, so they must not fan out there.
 */
function iconMotionForEach(interactive: boolean) {
  if (shouldReduceMotion.value) {
    return apps.value.map(() => REDUCED_ICON_MOTION)
  }

  return apps.value.map(() => (interactive && hovered.value
    ? { animate: 'hover', initial: 'initial', transition: ICON_TRANSITION }
    : { animate: ['initial', 'float'], initial: 'initial', transition: ICON_TRANSITION }))
}

const stackIconMotion = computed(() => iconMotionForEach(true))
const downloadingIconMotion = computed(() => iconMotionForEach(false))

const tileMotion = computed(() => (shouldReduceMotion.value
  ? apps.value.map(() => REDUCED_TILE_MOTION)
  : apps.value.map((_app, index) => ({
      animate: { opacity: 1, y: 0 },
      initial: { opacity: 0, y: 20 },
      transition: { delay: index * STAGGER_DELAY_MULTIPLIER, duration: STAGGER_DURATION },
    }))))

const panelMotion = computed(() => (shouldReduceMotion.value ? REDUCED_PANEL_MOTION : PANEL_MOTION))

const checkmarkMotion = {
  animate: { pathLength: 1 },
  initial: { pathLength: 0 },
  transition: { duration: CHECKMARK_TRANSITION_DURATION },
}

function isSelected(appId: number) {
  return selected.value.includes(appId)
}

function layoutIdFor(appId: number) {
  return shouldReduceMotion.value ? undefined : `app-icon-${appId}`
}
</script>

<template>
  <div
    v-bind="$attrs"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
    data-ads-root
  >
    <motion.div
      :class="ui.wrapper({ class: uiProps.ui?.wrapper })"
      :layout="!shouldReduceMotion"
    >
      <!--
        The reference hands the click and the hover to a `motion.button`; the
        button is kept plain here so the `button` role, the "Expand app
        selection" accessible name and the click all survive, and the hover is
        read off it and pushed into `animate` instead (see `setHovered`).

        The button also sits outside <AnimatePresence> on purpose. The reference
        gives it no `exit`, so it should vanish the moment the panel takes over;
        handing a presence-less plain element to AnimatePresence instead strands
        the whole stack next to the open selector, so only the three panels that
        do animate are tracked here.
      -->
      <button
        v-if="!isExpanded && !isDownloading"
        type="button"
        aria-label="Expand app selection"
        :class="ui.trigger({ class: uiProps.ui?.trigger })"
        data-ads-trigger
        @click="setExpanded(true)"
        @pointerenter="setHovered(true)"
        @pointerleave="setHovered(false)"
      >
        <motion.div
          v-for="(app, index) in apps"
          :key="app.id"
          :custom="index"
          :class="[ui.stackIcon({ class: uiProps.ui?.stackIcon }), 'flex items-center justify-center']"
          :layout-id="layoutIdFor(app.id)"
          :variants="stackVariants"
          v-bind="stackIconMotion[index]"
          role="img"
          :aria-label="app.name"
          data-ads-stack-icon
        >
          <UIcon
            :name="app.icon"
            class="size-10"
          />
        </motion.div>
      </button>

      <AnimatePresence>
        <motion.div
          v-if="isExpanded && !isDownloading"
          key="app-selector"
          :class="ui.selector({ class: uiProps.ui?.selector })"
          :layout="!shouldReduceMotion"
          v-bind="panelMotion"
          data-ads-selector
        >
          <button
            type="button"
            :class="ui.selectorHeader({ class: uiProps.ui?.selectorHeader })"
            data-ads-selector-header
            @click="setExpanded(false)"
          >
            <p :class="ui.title({ class: uiProps.ui?.title })">
              {{ props.title }}
            </p>
            <div :class="ui.countWrap({ class: uiProps.ui?.countWrap })">
              <p
                :class="ui.count({ class: uiProps.ui?.count })"
                data-ads-count
              >
                {{ selected.length }}
              </p>
              <!-- Decorative: the count beside it already carries the meaning. -->
              <UIcon
                name="i-lucide-chevron-down"
                :class="ui.chevron({ class: uiProps.ui?.chevron })"
              />
            </div>
          </button>

          <motion.ul
            :class="ui.grid({ class: uiProps.ui?.grid })"
            data-ads-grid
          >
            <motion.li
              v-for="(app, index) in apps"
              :key="app.id"
              :class="ui.tile({ class: uiProps.ui?.tile })"
              v-bind="tileMotion[index]"
              data-ads-tile
            >
              <div
                :class="[ui.check({ class: uiProps.ui?.check }), isSelected(app.id)
                  ? 'border-primary bg-primary'
                  : 'border-default']"
                data-ads-check
              >
                <!--
                  The reference animates `pathLength` on the `motion.svg` wrapper
                  and lets it propagate down to the `motion.path` child. A plain
                  `<svg>` here keeps `xmlns` lint-clean and puts the animation
                  where it actually has an effect — `pathLength` is a path
                  attribute, so the draw-on is driven by the path itself.
                -->
                <svg
                  v-if="isSelected(app.id)"
                  :class="ui.checkmark({ class: uiProps.ui?.checkmark })"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-ads-checkmark
                >
                  <title>Checkmark</title>
                  <motion.path
                    d="M5 13l4 4L19 7"
                    v-bind="checkmarkMotion"
                    data-ads-checkmark-path
                  />
                </svg>
              </div>

              <button
                type="button"
                :class="[ui.app({ class: uiProps.ui?.app }), isSelected(app.id) ? 'border-primary bg-primary/10' : '']"
                :aria-pressed="isSelected(app.id)"
                data-ads-app
                @click="toggleApp(app.id)"
              >
                <UIcon
                  aria-hidden="true"
                  :class="[ui.appIcon({ class: uiProps.ui?.appIcon }), 'size-8']"
                  :name="app.icon"
                />
                <span :class="ui.appName({ class: uiProps.ui?.appName })">
                  {{ app.name }}
                </span>
              </button>
            </motion.li>
          </motion.ul>

          <button
            type="button"
            :class="ui.download({ class: uiProps.ui?.download })"
            :disabled="selected.length === 0"
            data-ads-download
            @click="handleDownload"
          >
            Download Selected
          </button>
        </motion.div>

        <motion.div
          v-if="isDownloading && !downloadComplete"
          key="downloading"
          :class="ui.downloading({ class: uiProps.ui?.downloading })"
          :layout="!shouldReduceMotion"
          v-bind="panelMotion"
          data-ads-downloading
        >
          <div :class="ui.downloadingWrap({ class: uiProps.ui?.downloadingWrap })">
            <!--
              The `x: 0` seed is a plain number, not a MotionValue, and it is
              load-bearing rather than decorative: the sweep is driven by
              `shineControls.start()` and the control has no transform to write
              to until the style prop has registered one on this node. Drop it
              and `start()` still resolves, but the highlight crawls from ~0px to
              ~2px and parks there instead of crossing the 64px panel.
            -->
            <motion.div
              :class="ui.shine({ class: uiProps.ui?.shine })"
              :animate="shineControls"
              :style="{ x: 0 }"
              data-ads-shine
            />
            <motion.div
              v-for="(app, index) in apps"
              :key="app.id"
              :custom="index"
              :class="[ui.downloadingIcon({ class: uiProps.ui?.downloadingIcon }), 'flex items-center justify-center']"
              :layout-id="layoutIdFor(app.id)"
              :variants="stackVariants"
              v-bind="downloadingIconMotion[index]"
              aria-hidden="true"
              data-ads-downloading-icon
            >
              <UIcon
                :name="app.icon"
                class="size-10"
              />
            </motion.div>
          </div>
          <span
            :class="ui.downloadingLabel({ class: uiProps.ui?.downloadingLabel })"
            data-ads-downloading-label
          >
            Downloading...
          </span>
        </motion.div>

        <motion.div
          v-if="downloadComplete"
          key="download-complete"
          :class="ui.complete({ class: uiProps.ui?.complete })"
          :layout="!shouldReduceMotion"
          v-bind="panelMotion"
          data-ads-complete
        >
          <span
            :class="ui.completeLabel({ class: uiProps.ui?.completeLabel })"
            data-ads-complete-label
          >
            Download Complete!
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </div>
</template>
