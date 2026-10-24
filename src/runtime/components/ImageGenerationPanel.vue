<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import type { AIState } from '../composables/useAiState'
import { cn } from '../utils/merge'
import AiLoader from './AiLoader.vue'
import AiPromptInput from './AiPromptInput.vue'

export type ImageGenerationStatus
  = | 'idle'
    | 'queued'
    | 'generating'
    | 'done'
    | 'error'

export interface ImageGenerationImage {
  alt: string
  id: string
  /**
   * A tiny (16–48px) version of `src`. Rendered pixelated and blurred as the
   * first pass, so the tile starts as a colour mosaic of the real result
   * instead of a grey box. Falls back to `src` when omitted.
   */
  preview?: string
  /** Surfaced once the tile has resolved. */
  seed?: string
  src: string
}

export interface ImageGenerationPreset {
  id: string
  label: string
}

export interface ImageGenerationAspectRatio {
  id: string
  label: string
  /** Any CSS `aspect-ratio` value, e.g. `"16 / 9"`. */
  value: string
}

/**
 * How much surrounding chrome the panel renders. `minimal` drops the header,
 * the footer and the batch progress rail, and hides the seed readout — leaving
 * the composer and the tiles.
 */
export type ImageGenerationChrome = 'full' | 'minimal'

/** Whether the prompt composer sits above or below the tiles. */
export type ImageGenerationComposerPlacement = 'top' | 'bottom'

export interface ImageGenerationPanelProps {
  /** Controlled `aspect-ratio` value. Omit to let the panel own the choice. */
  aspectRatio?: string
  aspectRatios?: ImageGenerationAspectRatio[]
  /** How much surrounding chrome renders. Defaults to `"full"`. */
  chrome?: ImageGenerationChrome
  /** Extra classes for the panel root. */
  class?: string
  /** Where the composer sits relative to the tiles. Defaults to `"top"`. */
  composerPlacement?: ImageGenerationComposerPlacement
  /** Number of tiles in the grid. */
  count?: number
  error?: string
  images?: ImageGenerationImage[]
  /** Model name shown in the header. */
  model?: string
  presets?: ImageGenerationPreset[]
  /** Batch progress, 0–1. Drives every tile's mosaic-to-sharp resolve. */
  progress?: number
  /** Controlled draft prompt. Omit to let the panel own the text. */
  prompt?: string
  /** Batch seed, shown in the composer readout. */
  seed?: string
  /** Controlled status. Omit to let the panel queue and start the batch itself. */
  status?: ImageGenerationStatus
  /**
   * Renders the prompt as read-only text with a blinking caret. Use while
   * replaying or streaming a prompt into the field.
   */
  typing?: boolean
}

const emit = defineEmits<{
  'cancel': []
  'generate': [prompt: string]
  'retry': []
  'select': [image: ImageGenerationImage]
  'update:aspectRatio': [value: string]
  'update:prompt': [value: string]
  'update:status': [value: ImageGenerationStatus]
  'variations': [image: ImageGenerationImage]
}>()

const PERCENT = 100
const DEFAULT_ASPECT_RATIO = '1 / 1'

/** How far apart, in overall progress, two neighbouring tiles finish. */
const TILE_FINISH_STAGGER = 0.09
const MIN_TILE_SPAN = 0.25
const TILE_ENTER_STAGGER_SECONDS = 0.05

/** The blurred pass never exceeds ~20px — past that `blur()` gets expensive. */
const MAX_SHARP_BLUR_PX = 18
const MOSAIC_BLUR_PX = 2
const MOSAIC_SATURATE = 1.35
const MOSAIC_SCALE = 1.08
const MOSAIC_FADE_START = 0.3
const MOSAIC_FADE_SPAN = 0.5
const SHARP_FADE_START = 0.12
const SHARP_FADE_SPAN = 0.5
const SHARPEN_EXPONENT = 1.35
/** Extra scale on the sharp pass at 0% — the tile "pulls focus" as it resolves. */
const FOCUS_PULL_SCALE = 0.08

const PROMPT_PLACEHOLDER = 'A lighthouse at dusk, long exposure…'

const ACTION_ICON_CLASS = 'size-3.5'
const STATUS_ICON_CLASS = 'size-3.5'
const PLACEHOLDER_ICON_CLASS = 'size-[18px]'

const TILE_ACTION_CLASS
  = 'relative flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors duration-150 ease-out before:absolute before:-inset-1 before:content-[\'\'] hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white/90 focus-visible:outline-offset-2 motion-reduce:transition-none'

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))

/**
 * Where a single tile sits in its own 0→1 resolve, given the batch progress.
 *
 * Real generators don't finish four images on the same frame, and a grid that
 * does reads as a single image cut into quarters. Offsetting each tile's window
 * makes the batch look like four jobs racing rather than one mask lifting.
 */
const tileProgress = (
  batchProgress: number,
  index: number,
  count: number,
): number => {
  const offset = index * TILE_FINISH_STAGGER
  const span = Math.max(MIN_TILE_SPAN, 1 - (count - 1) * TILE_FINISH_STAGGER)
  return clamp01((batchProgress - offset) / span)
}

const ramp = (value: number, start: number, span: number): number =>
  clamp01((value - start) / span)

const STATUS_META: Record<ImageGenerationStatus, { dot: string, label: string }> = {
  done: { dot: 'bg-success', label: 'Ready' },
  error: { dot: 'bg-error', label: 'Failed' },
  generating: { dot: 'bg-primary', label: 'Rendering' },
  idle: { dot: 'bg-inverted/25', label: 'Idle' },
  queued: { dot: 'bg-warning', label: 'Queued' },
}

const props = withDefaults(defineProps<ImageGenerationPanelProps>(), {
  aspectRatio: undefined,
  aspectRatios: () => [
    { id: 'square', label: '1:1', value: '1 / 1' },
    { id: 'portrait', label: '4:5', value: '4 / 5' },
    { id: 'wide', label: '16:9', value: '16 / 9' },
  ],
  chrome: 'full',
  class: undefined,
  composerPlacement: 'top',
  count: 4,
  error: undefined,
  images: () => [],
  model: 'motion-diffusion v2',
  presets: () => [],
  progress: 0,
  prompt: undefined,
  seed: undefined,
  status: undefined,
  typing: false,
})

const instance = getCurrentInstance()

/** Emitted listeners are not attrs, so read them off the vnode props. */
function hasListener(name: string): boolean {
  return Boolean(instance?.vnode.props?.[`on${name}`])
}

const internalPrompt = ref('')
const isPromptControlled = computed(() => props.prompt !== undefined)
const draft = computed(() =>
  isPromptControlled.value ? props.prompt! : internalPrompt.value,
)

function setDraft(value: string): void {
  if (!isPromptControlled.value) {
    internalPrompt.value = value
  }
  emit('update:prompt', value)
}

const internalStatus = ref<ImageGenerationStatus>('idle')
const isStatusControlled = computed(() => props.status !== undefined)
const effectiveStatus = computed(() =>
  isStatusControlled.value ? props.status! : internalStatus.value,
)

function setStatus(value: ImageGenerationStatus): void {
  if (!isStatusControlled.value) {
    internalStatus.value = value
  }
  emit('update:status', value)
}

const internalRatio = ref(props.aspectRatios[0]?.value ?? DEFAULT_ASPECT_RATIO)
const isRatioControlled = computed(() => props.aspectRatio !== undefined)
const activeRatio = computed(() =>
  isRatioControlled.value ? props.aspectRatio! : internalRatio.value,
)

function pickRatio(value: string): void {
  if (!isRatioControlled.value) {
    internalRatio.value = value
  }
  emit('update:aspectRatio', value)
}

const selectedId = ref<string | null>(null)

function selectImage(image: ImageGenerationImage): void {
  selectedId.value = image.id
  emit('select', image)
}

const isBusy = computed(
  () => effectiveStatus.value === 'queued' || effectiveStatus.value === 'generating',
)

const statusMeta = computed(() => STATUS_META[effectiveStatus.value])
const progressClamped = computed(() => clamp01(props.progress))
const percent = computed(() => Math.round(progressClamped.value * PERCENT))

const isMinimal = computed(() => props.chrome === 'minimal')
const isComposerFirst = computed(() => props.composerPlacement === 'top')
const showSeed = computed(() => !isMinimal.value)
const hasComposerMeta = computed(
  () => props.presets.length > 0 || props.aspectRatios.length > 0 || showSeed.value,
)

/** One slot per tile, so the grid loops over a single list in either order. */
const tiles = computed(() =>
  Array.from({ length: props.count }, (_, index) => {
    const image = props.images[index]
    return {
      image,
      index,
      key: image?.id ?? `slot-${index}`,
    }
  }),
)

/**
 * The composer and the grid are the same markup in both placements; only their
 * order changes, so the section list is what the template loops over.
 */
const sections = computed(() =>
  isComposerFirst.value
    ? (['composer', 'grid'] as const)
    : (['grid', 'composer'] as const),
)

/**
 * Only two panel states change the composer: a run the caller can interrupt
 * turns send into stop, and a failure rings the field to back the banner up.
 * "Done" deliberately stays neutral — the status pill, the footer and the
 * tile's seed all report it already.
 */
const composerState = computed<AIState>(() => {
  if (effectiveStatus.value === 'error') return 'error'
  if (isBusy.value) return hasListener('Cancel') ? 'streaming' : 'thinking'
  return 'idle'
})

const announcement = computed(() => {
  const noun = props.count === 1 ? 'image' : 'images'
  switch (effectiveStatus.value) {
    case 'queued':
      return 'Request queued.'
    case 'generating':
      return `Generating ${props.count} ${noun}, ${percent.value} percent.`
    case 'done':
      return `${props.count} ${noun} ready.`
    case 'error':
      return props.error ?? 'Generation failed.'
    default:
      return ''
  }
})

const footerText = computed(() => {
  const ratio = activeRatio.value.replace(/\s/g, '')
  const noun = props.count === 1 ? 'image' : 'images'
  return effectiveStatus.value === 'done'
    ? `${props.count} ${noun} · ${ratio}`
    : `${props.count} ${noun} · ${ratio} · ready when you are`
})

function togglePreset(preset: ImageGenerationPreset): void {
  if (isBusy.value) return
  const marker = `, ${preset.label}`
  setDraft(
    draft.value.includes(marker)
      ? draft.value.replace(marker, '')
      : `${draft.value}${marker}`,
  )
}

async function handleGenerate(value: string): Promise<void> {
  const prompt = value.trim()
  if (!prompt || isBusy.value) return
  emit('generate', prompt)
  if (isStatusControlled.value) return
  setStatus('queued')
  // A macrotask gap so "queued" paints a frame before flipping to
  // "generating" — otherwise both states commit in the same tick.
  await new Promise(resolve => setTimeout(resolve, 0))
  setStatus('generating')
  if (progressClamped.value >= 1) {
    setStatus('done')
  }
}

function handleStop(): void {
  emit('cancel')
}

/**
 * Reduced motion resolves every tile on its first paint instead of pinning it
 * mid-mosaic. Read from `matchMedia` after mount, so the server tree and the
 * hydrated tree stay identical.
 */
const prefersReducedMotion = ref(false)
let motionQuery: MediaQueryList | null = null

function syncReducedMotion(): void {
  prefersReducedMotion.value = motionQuery?.matches ?? false
}

function tileLocal(index: number): number {
  if (prefersReducedMotion.value) return 1
  return tileProgress(progressClamped.value, index, props.count)
}

const tileMosaicOpacity = (index: number) =>
  1 - ramp(tileLocal(index), MOSAIC_FADE_START, MOSAIC_FADE_SPAN)

const tileSharpOpacity = (index: number) =>
  ramp(tileLocal(index), SHARP_FADE_START, SHARP_FADE_SPAN)

const tileSharpBlur = (index: number) =>
  MAX_SHARP_BLUR_PX * (1 - tileLocal(index) ** SHARPEN_EXPONENT)

const isResolving = (index: number) => tileLocal(index) < 1

const canAct = (index: number) =>
  !isResolving(index) && effectiveStatus.value === 'done'

/**
 * The typing overlay borrows the real textarea's box, so its glyphs land exactly
 * where the field's own invisible text sits regardless of theme padding.
 *
 * The composer moves between two slots in the section list, so it is found
 * through the panel root rather than through a template ref — a ref inside a
 * `v-for` is collected into an array instead of being bound.
 */
const panelRef = shallowRef<HTMLElement | null>(null)
const overlayBox = ref<Record<string, string>>({})
let overlayObserver: ResizeObserver | null = null

function syncOverlayBox(): void {
  const panel = panelRef.value
  const composer = panel?.querySelector('[data-igp-composer]')
  const textarea = composer?.querySelector('textarea')
  if (!panel || !composer || !textarea) return
  const box = textarea.getBoundingClientRect()
  const parent = composer.getBoundingClientRect()
  overlayBox.value = {
    top: `${box.top - parent.top}px`,
    left: `${box.left - parent.left}px`,
    width: `${box.width}px`,
    minHeight: `${box.height}px`,
  }
}

watch([draft, () => props.typing], async () => {
  await nextTick()
  syncOverlayBox()
})

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', syncReducedMotion)

  overlayObserver = new ResizeObserver(syncOverlayBox)
  if (panelRef.value) overlayObserver.observe(panelRef.value)
  syncOverlayBox()
})

onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', syncReducedMotion)
  motionQuery = null
  overlayObserver?.disconnect()
  overlayObserver = null
})

/** A caller that reports completion through `progress` finishes the cycle. */
watch(
  () => props.progress,
  (value) => {
    if (
      !isStatusControlled.value
      && internalStatus.value === 'generating'
      && clamp01(value) >= 1
    ) {
      setStatus('done')
    }
  },
)
</script>

<template>
  <div
    ref="panelRef"
    :class="cn(
      'flex w-full flex-col overflow-hidden rounded-2xl border border-default bg-default shadow-sm',
      props.class,
    )"
  >
    <header
      v-if="!isMinimal"
      class="flex items-center justify-between gap-3 border-b border-default px-4 py-3"
    >
      <div class="flex min-w-0 items-center gap-2.5">
        <span
          :class="cn(
            'flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary',
            isBusy && 'igp-busy',
          )"
        >
          <UIcon
            aria-hidden="true"
            name="i-lucide-sparkles"
            :class="STATUS_ICON_CLASS"
          />
        </span>
        <div class="min-w-0">
          <p class="truncate text-sm leading-tight font-medium text-highlighted">
            Image generation
          </p>
          <p class="truncate font-mono text-[11px] leading-tight text-muted">
            {{ props.model }}
          </p>
        </div>
      </div>
      <span class="flex shrink-0 items-center gap-1.5 rounded-full border border-default px-2.5 py-1 text-xs text-muted">
        <span
          aria-hidden="true"
          :class="cn('size-1.5 rounded-full', statusMeta.dot, isBusy && 'igp-busy')"
        />
        <Transition
          name="igp-fade"
          mode="out-in"
        >
          <span :key="effectiveStatus">{{ statusMeta.label }}</span>
        </Transition>
      </span>
    </header>

    <span
      class="sr-only"
      role="status"
      aria-live="polite"
    >{{ announcement }}</span>

    <template
      v-for="section in sections"
      :key="section"
    >
      <div
        v-if="section === 'composer'"
        data-igp-composer
        :class="cn(
          'relative flex flex-col gap-2.5 p-3.5',
          isComposerFirst ? 'border-b border-default' : 'border-t border-default',
        )"
      >
        <div class="relative">
          <AiPromptInput
            aria-label="Prompt"
            :class="cn(typing && '[&_textarea]:pointer-events-none [&_textarea]:text-transparent [&_textarea]:caret-transparent')"
            :disabled="isBusy && !hasListener('Cancel')"
            :model-value="draft"
            :placeholder="typing ? '' : PROMPT_PLACEHOLDER"
            :state="composerState"
            @stop="handleStop"
            @submit="handleGenerate"
            @update:model-value="setDraft"
          />
          <p
            v-if="typing"
            aria-hidden="true"
            class="pointer-events-none absolute whitespace-pre-wrap break-words text-base/5 text-highlighted"
            :style="overlayBox"
          >
            {{ draft }}<span class="igp-caret ml-px inline-block h-3.5 w-px translate-y-0.5 bg-primary align-middle" />
          </p>
        </div>

        <div
          v-if="hasComposerMeta"
          class="flex flex-wrap items-center gap-x-2.5 gap-y-2"
        >
          <div
            v-if="props.presets.length > 0"
            class="flex flex-wrap gap-1.5"
          >
            <button
              v-for="preset in props.presets"
              :key="preset.id"
              :aria-pressed="draft.includes(`, ${preset.label}`)"
              :class="cn(
                'cursor-pointer rounded-full border px-2.5 py-1 text-xs transition-colors duration-150 ease-out disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none',
                draft.includes(`, ${preset.label}`)
                  ? 'border-inverted/25 bg-inverted/10 text-highlighted'
                  : 'border-default text-muted hover:text-highlighted',
              )"
              :disabled="isBusy"
              type="button"
              @click="togglePreset(preset)"
            >
              {{ preset.label }}
            </button>
          </div>

          <div
            v-if="props.aspectRatios.length > 0"
            class="flex gap-0.5 rounded-md bg-muted/70 p-0.5"
          >
            <button
              v-for="ratio in props.aspectRatios"
              :key="ratio.id"
              :aria-label="`Aspect ratio ${ratio.label}`"
              :aria-pressed="ratio.value === activeRatio"
              :class="cn(
                'relative cursor-pointer rounded-sm px-2 py-1 text-xs transition-colors duration-150 ease-out disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none',
                ratio.value === activeRatio ? 'text-highlighted' : 'text-muted',
              )"
              :disabled="isBusy"
              type="button"
              @click="pickRatio(ratio.value)"
            >
              <span
                v-if="ratio.value === activeRatio"
                aria-hidden="true"
                class="igp-ratio absolute inset-0 rounded-sm bg-default shadow-xs"
              />
              <span class="relative">{{ ratio.label }}</span>
            </button>
          </div>

          <span
            v-if="showSeed"
            class="ml-auto flex items-center gap-2 overflow-hidden rounded-md border border-dashed border-default px-2 py-1 font-mono text-[11px] text-muted tabular-nums"
          >
            seed
            <Transition
              name="igp-fade"
              mode="out-in"
            >
              <span
                :key="props.seed ?? 'empty'"
                class="text-highlighted"
              >{{ props.seed ?? '—' }}</span>
            </Transition>
          </span>
        </div>
      </div>

      <div
        v-else
        :class="cn('grid gap-2.5 p-3.5', props.count === 1 ? 'grid-cols-1' : 'grid-cols-2')"
      >
        <div
          v-for="tile in tiles"
          :key="tile.key"
          class="igp-tile group relative isolate overflow-hidden rounded-lg border bg-muted"
          :class="[
            tile.image?.id === selectedId ? 'border-primary' : 'border-default',
            tile.image ? '' : 'flex items-center justify-center border-dashed bg-muted/40',
          ]"
          :style="{
            aspectRatio: activeRatio,
            animationDelay: `${tile.index * TILE_ENTER_STAGGER_SECONDS}s`,
          }"
        >
          <template v-if="tile.image">
            <!-- Blocky first pass — a low-res mosaic of the real result. -->
            <img
              alt=""
              aria-hidden="true"
              class="absolute inset-0 size-full object-cover"
              :src="tile.image.preview ?? tile.image.src"
              :style="{
                filter: `blur(${MOSAIC_BLUR_PX}px) saturate(${MOSAIC_SATURATE})`,
                imageRendering: 'pixelated',
                opacity: tileMosaicOpacity(tile.index),
                transform: `scale(${MOSAIC_SCALE + (1 - tileLocal(tile.index)) * 0.04})`,
              }"
            >

            <!-- The result, sharpening as it crossfades over the mosaic. -->
            <img
              :alt="tile.image.alt"
              class="absolute inset-0 size-full object-cover"
              :src="tile.image.src"
              :style="{
                filter: tileSharpBlur(tile.index) > 0 ? `blur(${tileSharpBlur(tile.index)}px)` : undefined,
                opacity: tileSharpOpacity(tile.index),
                transform: `scale(${1 + FOCUS_PULL_SCALE * (1 - tileLocal(tile.index))})`,
              }"
            >

            <span
              v-if="isResolving(tile.index)"
              aria-hidden="true"
              class="igp-scan pointer-events-none absolute inset-x-0 top-0 h-[45%] mix-blend-screen"
            >
              <span class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-primary/70" />
              <span class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white/75 blur-[7px]" />
              <span class="absolute inset-x-0 bottom-0 h-[2px] bg-white/95" />
            </span>

            <div class="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-start p-2">
              <Transition
                name="igp-pill"
                mode="out-in"
              >
                <span
                  v-if="isResolving(tile.index)"
                  key="progress"
                  class="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[11px] text-white tabular-nums backdrop-blur-sm"
                >{{ Math.round(tileLocal(tile.index) * PERCENT) }}%</span>
                <span
                  v-else-if="tile.image.seed"
                  key="seed"
                  class="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[11px] text-white tabular-nums backdrop-blur-sm"
                >{{ tile.image.seed }}</span>
              </Transition>
            </div>

            <span
              v-if="isResolving(tile.index)"
              aria-hidden="true"
              class="absolute inset-x-0 bottom-0 h-0.5 bg-black/25"
            >
              <span
                class="block h-full origin-left bg-primary"
                :style="{ transform: `scaleX(${tileLocal(tile.index)})` }"
              />
            </span>

            <div
              v-if="canAct(tile.index)"
              class="absolute inset-0 flex translate-y-1 items-start justify-end gap-1 bg-gradient-to-b from-black/45 via-transparent to-transparent p-2 opacity-0 transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
            >
              <a
                :aria-label="`Download ${tile.image.alt}`"
                :class="TILE_ACTION_CLASS"
                download
                :href="tile.image.src"
              >
                <UIcon
                  aria-hidden="true"
                  name="i-lucide-download"
                  :class="ACTION_ICON_CLASS"
                />
              </a>
              <button
                v-if="hasListener('Variations')"
                :aria-label="`Make variations of ${tile.image.alt}`"
                :class="TILE_ACTION_CLASS"
                type="button"
                @click="emit('variations', tile.image)"
              >
                <UIcon
                  aria-hidden="true"
                  name="i-lucide-shuffle"
                  :class="ACTION_ICON_CLASS"
                />
              </button>
              <button
                v-if="hasListener('Select')"
                :aria-label="`Select ${tile.image.alt}`"
                :aria-pressed="tile.image.id === selectedId"
                :class="cn(TILE_ACTION_CLASS, tile.image.id === selectedId && 'bg-primary text-white hover:bg-primary')"
                type="button"
                @click="selectImage(tile.image)"
              >
                <UIcon
                  aria-hidden="true"
                  name="i-lucide-check"
                  :class="ACTION_ICON_CLASS"
                />
              </button>
            </div>
          </template>

          <template v-else>
            <span
              v-if="isBusy"
              aria-hidden="true"
              class="igp-shimmer absolute inset-0 bg-inverted/5"
            />
            <span class="relative flex flex-col items-center gap-1.5 text-muted/60">
              <UIcon
                aria-hidden="true"
                name="i-lucide-image"
                :class="PLACEHOLDER_ICON_CLASS"
              />
              <span class="text-[11px]">{{ isBusy ? 'Queued' : 'Empty' }}</span>
            </span>
          </template>
        </div>
      </div>
    </template>

    <div
      v-if="effectiveStatus === 'error'"
      class="flex items-center justify-between gap-3 border-t border-default bg-error/10 px-4 py-2.5 text-sm text-error"
      role="alert"
    >
      <span class="flex items-center gap-1.5">
        <UIcon
          aria-hidden="true"
          name="i-lucide-circle-alert"
          :class="STATUS_ICON_CLASS"
        />
        {{ props.error ?? 'Something went wrong generating these images.' }}
      </span>
      <button
        v-if="hasListener('Retry')"
        class="cursor-pointer font-medium underline-offset-2 hover:underline"
        type="button"
        @click="emit('retry')"
      >
        Retry
      </button>
    </div>

    <template v-if="!isMinimal">
      <footer class="flex items-center justify-between gap-3 border-t border-default px-4 py-2.5 text-xs text-muted">
        <AiLoader
          v-if="isBusy"
          :label="effectiveStatus === 'queued' ? 'Queued' : 'Rendering'"
          variant="dots"
        />
        <span v-else>{{ footerText }}</span>
        <span class="font-mono tabular-nums">{{ percent }}%</span>
      </footer>

      <span
        aria-hidden="true"
        class="block h-0.5 w-full bg-muted"
      >
        <span
          class="block h-full origin-left bg-primary"
          :style="{ transform: `scaleX(${progressClamped})` }"
        />
      </span>
    </template>
  </div>
</template>

<style scoped>
@keyframes igp-tile-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes igp-scan {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(124%);
  }
}

@keyframes igp-shimmer {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes igp-busy {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.08);
  }
}

@keyframes igp-caret {
  0%,
  49.9% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.igp-tile {
  animation: igp-tile-in 0.25s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.igp-scan {
  animation: igp-scan 1.9s linear infinite;
}

.igp-shimmer {
  animation: igp-shimmer 1.6s linear infinite;
}

.igp-busy {
  animation: igp-busy 0.9s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.igp-caret {
  animation: igp-caret 1s linear infinite;
}

.igp-ratio {
  animation: igp-tile-in 0.15s ease-out both;
}

.igp-pill-enter-active,
.igp-pill-leave-active,
.igp-fade-enter-active,
.igp-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.igp-pill-enter-from,
.igp-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.igp-pill-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.igp-fade-enter-from,
.igp-fade-leave-to {
  transform: translateY(3px);
}

.igp-fade-leave-to {
  transform: translateY(-3px);
}

@media (prefers-reduced-motion: reduce) {
  .igp-tile,
  .igp-scan,
  .igp-shimmer,
  .igp-busy,
  .igp-caret,
  .igp-ratio {
    animation: none;
  }

  .igp-scan {
    display: none;
  }

  .igp-shimmer {
    opacity: 0.6;
  }

  .igp-caret {
    opacity: 1;
  }

  .igp-pill-enter-active,
  .igp-pill-leave-active,
  .igp-fade-enter-active,
  .igp-fade-leave-active {
    transition: none;
  }
}
</style>
