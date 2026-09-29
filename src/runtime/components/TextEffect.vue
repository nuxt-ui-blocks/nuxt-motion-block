<script setup lang="ts">
import { computed } from 'vue'
import { Motion, AnimatePresence } from 'motion-v'

const props = withDefaults(defineProps<{
  children?: string
  per?: 'word' | 'char' | 'line'
  preset?: 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'
  as?: string
  delay?: number
  speedReveal?: number
  speedSegment?: number
  trigger?: boolean
  class?: string
  variants?: {
    container?: Record<string, any>
    item?: Record<string, any>
  }
  containerTransition?: any
  segmentTransition?: any
  segmentWrapperClassName?: string
}>(), {
  children: '',
  per: 'word',
  preset: 'fade',
  as: 'p',
  speedReveal: 1,
  speedSegment: 1,
  trigger: true,
})

const tag = computed(() => props.as || 'p')

const defaultStaggerTimes: Record<string, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
}

const staggerTime = computed(() => {
  return (defaultStaggerTimes[props.per] || 0.05) / props.speedReveal
})

const segmentDuration = computed(() => {
  return (1 / props.speedSegment) * 0.4
})

const presetVariants = computed(() => {
  const dur = segmentDuration.value

  const presets: Record<string, any> = {
    'blur': {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
    'fade-in-blur': {
      hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  }

  const p = presets[props.preset] || presets.fade
  return {
    hidden: { ...p.hidden, transition: { duration: dur } },
    visible: { ...p.visible, transition: { duration: dur } },
  }
})

const containerVariants = computed(() => {
  if (props.variants?.container) return props.variants.container

  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerTime.value,
        delayChildren: props.delay ?? 0,
      },
    },
  }
})

const itemVariants = computed(() => {
  if (props.variants?.item) return props.variants.item
  return presetVariants.value
})

const segments = computed(() => {
  const text = props.children ?? ''
  if (!text) return []

  if (props.per === 'line') {
    return text.split('\n').filter(Boolean)
  }
  if (props.per === 'word') {
    return text.split(/(\s+)/).filter(s => s.trim().length > 0)
  }
  return text.split('').filter(Boolean)
})

const groupedSegments = computed(() => {
  if (props.per !== 'char') {
    return segments.value.map(s => [s])
  }

  const text = props.children ?? ''
  const words = text.split(/(\s+)/)
  return words.map((w) => {
    if (/^\s+$/.test(w)) return [w]
    return w.split('').filter(Boolean)
  })
})

const hasAnimated = computed(() => props.trigger)
</script>

<template>
  <component
    :is="tag"
    :class="props.class"
    style="overflow: hidden; display: inline-flex; flex-wrap: wrap"
  >
    <AnimatePresence mode="popLayout">
      <Motion
        v-if="hasAnimated"
        key="container"
        :initial="'hidden'"
        :animate="'visible'"
        :variants="containerVariants"
        :style="{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden' }"
        v-bind="containerTransition ? { transition: containerTransition } : {}"
      >
        <template
          v-for="(group, gIdx) in groupedSegments"
          :key="`g-${gIdx}`"
        >
          <span
            v-if="per === 'char'"
            :class="segmentWrapperClassName"
            style="display: inline-block; overflow: hidden"
          >
            <Motion
              v-for="(char, cIdx) in group"
              :key="`c-${gIdx}-${cIdx}`"
              as="span"
              :initial="'hidden'"
              :animate="'visible'"
              :variants="itemVariants"
              :style="{ display: 'inline-block', whiteSpace: 'pre' }"
              v-bind="segmentTransition ? { transition: segmentTransition } : {}"
            >
              {{ char }}
            </Motion>
          </span>
          <Motion
            v-else
            :key="`s-${gIdx}`"
            as="span"
            :initial="'hidden'"
            :animate="'visible'"
            :variants="itemVariants"
            :style="{ display: 'inline-block' }"
            v-bind="segmentTransition ? { transition: segmentTransition } : {}"
          >
            {{ group[0] }}
          </Motion>
        </template>
      </Motion>
    </AnimatePresence>
  </component>
</template>
