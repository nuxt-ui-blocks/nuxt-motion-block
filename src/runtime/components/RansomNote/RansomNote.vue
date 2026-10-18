<script setup lang="ts">
import { Motion, useReducedMotion } from 'motion-v'
import { computed } from 'vue'
import { useResolvedColors } from '../../composables/useThemeColor'
import {
  RANSOM_NOTE_DEFAULT_ANIMATE,
  RANSOM_NOTE_DEFAULT_FONTS,
  RANSOM_NOTE_DEFAULT_INTENSITY,
  RANSOM_NOTE_DEFAULT_PALETTE,
  RANSOM_NOTE_DEFAULT_ROTATION,
  RANSOM_NOTE_DEFAULT_SEED,
  RANSOM_NOTE_DEFAULT_STAGGER_SECONDS,
  RANSOM_NOTE_ENTRANCE_OFFSET_BASE,
  RANSOM_NOTE_ENTRANCE_OFFSET_VARIANCE,
  RANSOM_NOTE_ENTRANCE_ROTATION_VARIANCE,
  RANSOM_NOTE_FONT_SCALE_BASE,
  RANSOM_NOTE_FONT_SCALE_VARIANCE,
  RANSOM_NOTE_INTENSITY_MAX,
  RANSOM_NOTE_INTENSITY_MIN,
  RANSOM_NOTE_JITTER_DURATION_MIN_SECONDS,
  RANSOM_NOTE_JITTER_DURATION_VARIANCE_SECONDS,
  RANSOM_NOTE_JITTER_EASE,
  RANSOM_NOTE_JITTER_ROTATION_BASE,
  RANSOM_NOTE_JITTER_ROTATION_VARIANCE,
  RANSOM_NOTE_SCRAP_TEXT_COLOR,
  RANSOM_NOTE_SKEW_MAX,
  RANSOM_NOTE_SPRING_TRANSITION,
  RANSOM_NOTE_STATIC_TRANSITION,
  RANSOM_NOTE_WHITESPACE_PATTERN,
  clamp,
  createSeededRandom,
  randomInRange,
  type RansomNoteAnimate,
} from './constants'

export interface RansomNoteProps {
  /** `assemble` flies the scraps in, `jitter` makes them tremble, `none` is static. */
  animate?: RansomNoteAnimate
  /** Classes for the wrapper. */
  class?: string
  /** Font stack to cut scraps from. Falls back to the built-in list when empty. */
  fonts?: string[]
  /** How messy it is, from 0 to 1. Clamped. */
  intensity?: number
  /** Paper colours to cut scraps from. Falls back to the built-in list when empty. */
  palette?: string[]
  /** Resting rotation of each scrap, in degrees. */
  rotation?: number
  /** PRNG seed. Change it for a different collage; keep it fixed for stable SSR. */
  seed?: number
  /** Delay between scraps, **in seconds**. Unlike the rest of the library. */
  stagger?: number
  /** The copy to cut up. */
  text: string
}

const props = withDefaults(defineProps<RansomNoteProps>(), {
  animate: RANSOM_NOTE_DEFAULT_ANIMATE,
  fonts: () => [],
  intensity: RANSOM_NOTE_DEFAULT_INTENSITY,
  palette: () => [],
  rotation: RANSOM_NOTE_DEFAULT_ROTATION,
  seed: RANSOM_NOTE_DEFAULT_SEED,
  stagger: RANSOM_NOTE_DEFAULT_STAGGER_SECONDS,
})

const shouldReduceMotion = useReducedMotion()

/** One cut-out letter and everything the PRNG decided about it. */
interface RansomScrap {
  backgroundColor?: string
  character: string
  entranceOffsetX: number
  entranceOffsetY: number
  entranceRotation: number
  fontFamily: string
  fontScale: number
  isWhitespace: boolean
  jitterDuration: number
  jitterRotation: number
  rotation: number
  skew: number
}

/**
 * Cut the text into scraps.
 *
 * Every field is drawn from one seeded generator in a fixed order, so this is a
 * pure function of the props: the server and the client produce the same
 * collage, which is the only reason this can hydrate at all.
 */
const resolvedPalette = useResolvedColors(() => props.palette)

const scraps = computed<RansomScrap[]>(() => {
  const random = createSeededRandom(props.seed)
  const intensity = clamp(
    props.intensity,
    RANSOM_NOTE_INTENSITY_MIN,
    RANSOM_NOTE_INTENSITY_MAX,
  )
  const fonts = props.fonts.length > 0 ? props.fonts : RANSOM_NOTE_DEFAULT_FONTS
  const paletteRaw = resolvedPalette.value && resolvedPalette.value.length > 0
    ? resolvedPalette.value
    : (props.palette.length > 0 ? props.palette : RANSOM_NOTE_DEFAULT_PALETTE)
  const entranceSpread
    = RANSOM_NOTE_ENTRANCE_OFFSET_BASE
      + RANSOM_NOTE_ENTRANCE_OFFSET_VARIANCE * intensity

  return Array.from(props.text).map((character) => {
    const isWhitespace = RANSOM_NOTE_WHITESPACE_PATTERN.test(character)

    return {
      // Whitespace gets no paper - otherwise every space becomes a visible
      // scrap and the words stop being words.
      backgroundColor: isWhitespace
        ? undefined
        : paletteRaw[Math.floor(random() * paletteRaw.length)],
      character,
      entranceOffsetX: randomInRange(random, -entranceSpread, entranceSpread),
      entranceOffsetY: randomInRange(random, -entranceSpread, entranceSpread),
      entranceRotation:
        randomInRange(
          random,
          -RANSOM_NOTE_ENTRANCE_ROTATION_VARIANCE,
          RANSOM_NOTE_ENTRANCE_ROTATION_VARIANCE,
        ) * intensity,
      fontFamily: fonts[Math.floor(random() * fonts.length)],
      fontScale:
        RANSOM_NOTE_FONT_SCALE_BASE
        + random() * RANSOM_NOTE_FONT_SCALE_VARIANCE * intensity,
      isWhitespace,
      jitterDuration:
        RANSOM_NOTE_JITTER_DURATION_MIN_SECONDS
        + random() * RANSOM_NOTE_JITTER_DURATION_VARIANCE_SECONDS,
      jitterRotation:
        RANSOM_NOTE_JITTER_ROTATION_BASE
        + random() * RANSOM_NOTE_JITTER_ROTATION_VARIANCE * intensity,
      rotation:
        randomInRange(random, -props.rotation, props.rotation) * intensity,
      skew:
        randomInRange(random, -RANSOM_NOTE_SKEW_MAX, RANSOM_NOTE_SKEW_MAX)
        * intensity,
    }
  })
})

/**
 * Where a scrap rests. `skewX` is carried in the animated state rather than in
 * `style` - motion-v owns the whole `transform` string, so a transform channel
 * left in `style` would be dropped the first time the rotation animates.
 */
function restState(scrap: RansomScrap) {
  return {
    opacity: 1,
    rotate: scrap.rotation,
    skewX: scrap.skew,
    x: 0,
    y: 0,
  }
}

/**
 * Resolve each scrap's initial / animate / transition triple.
 *
 * `initial` is always the server-renderable state, exactly as the server would
 * paint it - reduced motion narrows the animation, it never changes what the
 * markup says. The three branches return distinct objects, and they are built
 * once per computed run so motion-v sees a stable `initial` to compare `animate`
 * against by reference.
 */
const resolvedScraps = computed(() =>
  scraps.value.map((scrap, index) => {
    const rest = restState(scrap)

    if (shouldReduceMotion.value === true || props.animate === 'none') {
      return {
        scrap,
        initial: rest,
        animate: rest,
        transition: RANSOM_NOTE_STATIC_TRANSITION,
      }
    }

    if (props.animate === 'jitter') {
      return {
        scrap,
        initial: rest,
        animate: {
          rotate: [
            scrap.rotation - scrap.jitterRotation,
            scrap.rotation + scrap.jitterRotation,
          ],
          skewX: scrap.skew,
        },
        transition: {
          delay: index * props.stagger,
          duration: scrap.jitterDuration,
          ease: RANSOM_NOTE_JITTER_EASE,
          repeat: Infinity,
          repeatType: 'mirror' as const,
        },
      }
    }

    return {
      scrap,
      initial: {
        opacity: 0,
        rotate: scrap.rotation + scrap.entranceRotation,
        skewX: scrap.skew,
        x: scrap.entranceOffsetX,
        y: scrap.entranceOffsetY,
      },
      animate: rest,
      transition: {
        ...RANSOM_NOTE_SPRING_TRANSITION,
        delay: index * props.stagger,
      },
    }
  }),
)

/** Paper, ink and typeface. Transform channels live in the state, not here. */
function scrapStyle(scrap: RansomScrap) {
  return {
    backgroundColor: scrap.backgroundColor,
    color: scrap.isWhitespace ? undefined : RANSOM_NOTE_SCRAP_TEXT_COLOR,
    fontFamily: scrap.fontFamily,
    fontSize: `${scrap.fontScale}em`,
    transformOrigin: '50% 50%',
  }
}
</script>

<template>
  <div :class="['relative inline-block', props.class]">
    <!--
      Every scrap is aria-hidden, so the readable copy lives here. An
      `aria-label` on this plain div would be dropped, hence a real element.
    -->
    <span class="sr-only">{{ props.text }}</span>

    <div
      aria-hidden="true"
      class="flex flex-wrap items-baseline leading-none"
    >
      <Motion
        v-for="(entry, index) in resolvedScraps"
        :key="index"
        as="span"
        :class="[
          'inline-block select-none whitespace-pre',
          !entry.scrap.isWhitespace
            && 'rounded-sm px-1 py-0.5 shadow-sm ring-1 ring-black/10',
        ]"
        :initial="entry.initial"
        :animate="entry.animate"
        :transition="entry.transition"
        :style="scrapStyle(entry.scrap)"
      >
        {{ entry.scrap.character }}
      </Motion>
    </div>
  </div>
</template>
