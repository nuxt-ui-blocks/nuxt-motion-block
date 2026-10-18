<template>
  <motion.g
    :animate="{ opacity: 1, scale: 1 }"
    :exit="props.canAnimate
      ? { opacity: 0, scale: 0.82 }
      : { opacity: 0, transition: INSTANT }"
    :initial="props.canAnimate
      ? { opacity: 0, scale: 0.94 }
      : { opacity: 1, scale: 1 }"
    :style="GLYPH_TRANSFORM_ORIGIN"
    :transition="props.canAnimate ? GLYPH_SPRING : INSTANT"
    data-unlock-face-glyph
  >
    <motion.path
      v-for="(path, index) in BRACKET_PATHS"
      :key="path"
      :animate="{ pathLength: 1 }"
      :d="path"
      :initial="props.canAnimate ? { pathLength: 0 } : { pathLength: 1 }"
      :stroke="resolvedStroke || 'currentColor'"
      :transition="props.canAnimate
        ? { delay: index * BRACKET_STAGGER, duration: BRACKET_DRAW, ease: EASE_OUT }
        : INSTANT"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="STROKE_WIDTH"
    />

    <motion.path
      v-for="(path, index) in FACE_PATHS"
      :key="path"
      :animate="{ pathLength: 1 }"
      :d="path"
      :initial="props.canAnimate ? { pathLength: 0 } : { pathLength: 1 }"
      :stroke="resolvedStroke || 'currentColor'"
      :transition="props.canAnimate
        ? { delay: FACE_DELAY + index * FACE_STAGGER, duration: FACE_DRAW, ease: EASE_OUT }
        : INSTANT"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="STROKE_WIDTH"
    />

    <!--
      The band is the only part of the glyph that moves on a loop, so it is
      gated on `canAnimate` as well as `isScanning`: a reduced-motion user
      scanning would otherwise get a bar gliding through a static face.
    -->
    <g
      v-if="props.isScanning && props.canAnimate"
      :clip-path="`url(#${props.clipId})`"
      data-unlock-scan-clip
    >
      <motion.g
        :animate="{ y: SCAN_TRAVEL }"
        :initial="{ y: -SCAN_TRAVEL }"
        :transition="{
          duration: SCAN_SWEEP,
          ease: EASE_IN_OUT,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse' as const,
        }"
        data-unlock-scan-band
      >
        <rect
          :fill="`url(#${props.gradientId})`"
          :height="SCAN_BAND_HEIGHT"
          :width="SCAN_CLIP.width"
          :x="SCAN_CLIP.x"
          :y="50 - SCAN_BAND_HEIGHT / 2"
        />
        <line
          :stroke="BRAND_STROKE"
          :stroke-width="1.5"
          :x1="SCAN_CLIP.x + 2"
          :x2="SCAN_CLIP.x + SCAN_CLIP.width - 2"
          :y1="50 + SCAN_BAND_HEIGHT / 2"
          :y2="50 + SCAN_BAND_HEIGHT / 2"
          opacity="0.9"
          stroke-linecap="round"
        />
      </motion.g>
    </g>
  </motion.g>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import { useResolvedColor } from '../../composables/useThemeColor'
import {
  BRACKET_DRAW,
  BRACKET_PATHS,
  BRACKET_STAGGER,
  BRAND_STROKE,
  EASE_IN_OUT,
  EASE_OUT,
  FACE_DELAY,
  FACE_DRAW,
  FACE_PATHS,
  FACE_STAGGER,
  GLYPH_SPRING,
  INSTANT,
  SCAN_BAND_HEIGHT,
  SCAN_CLIP,
  SCAN_SWEEP,
  SCAN_TRAVEL,
  STROKE_WIDTH,
} from './constants'

/**
 * Declared inline: the dev server resolves a component's props through the
 * browser-side `compileScript` path, which cannot follow a filesystem import.
 */
interface Props {
  /** False under `prefers-reduced-motion`, which collapses every transition to `{ duration: 0 }`. */
  canAnimate: boolean
  /** `clipPath` id owned by the parent, so several instances can coexist. */
  clipId: string
  /** `linearGradient` id owned by the parent. */
  gradientId: string
  isScanning: boolean
  stroke: string
}

const props = defineProps<Props>()

const resolvedStroke = useResolvedColor(() => (props.stroke === 'currentColor' ? undefined : props.stroke))

/**
 * `transform-box: view-box` is what makes `50px 50px` mean the middle of the
 * 100×100 viewBox rather than 50px from the element's own bounding box — the
 * glyph is larger than the drawn strokes, so the box origin is offset.
 */
const GLYPH_TRANSFORM_ORIGIN = { transformBox: 'view-box', transformOrigin: '50px 50px' }
</script>
