<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <video
      ref="videoRef"
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      playsinline
      preload="metadata"
      aria-hidden="true"
      tabindex="-1"
      :class="ui.video({ class: uiProps.ui?.video })"
    />

    <div
      :class="ui.mask({ class: uiProps.ui?.mask })"
      :style="maskStyle"
    >
      <slot>
        <span
          :class="ui.text({ class: uiProps.ui?.text })"
          :style="{ fontSize }"
        >{{ text }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useReducedMotion } from 'motion-v'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import videoText from '../theme/video-text'

export interface VideoTextProps {
  /** Autoplay the clip. It is always muted, so browsers allow it. */
  autoplay?: boolean
  /**
   * Which way the knock-out blends with the clip. `multiply` cuts the letters
   * out of a black surround; `screen` does the same out of a white one.
   */
  blend?: 'multiply' | 'screen'
  /** Extra classes for the frame. */
  class?: string
  /** Size of the letters. Any CSS length works. */
  fontSize?: string
  /** Loop the clip. */
  loop?: boolean
  /** Poster shown until the first frame is ready. */
  poster?: string
  /** Video to show through the letters. */
  src: string
  /** Text cut out of the clip. The default slot wins when it is filled. */
  text?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<VideoTextProps>(), {
  autoplay: true,
  blend: 'multiply',
  class: undefined,
  fontSize: 'clamp(3rem, 13vw, 9rem)',
  loop: true,
  poster: undefined,
  text: '',
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'videoText', props, theme: videoText })

const videoRef = ref<HTMLVideoElement | null>(null)

const shouldReduceMotion = useReducedMotion()

/**
 * A `muted` attribute alone does not satisfy the autoplay policy in every
 * browser, so the property is set as well once the element exists. Reduced
 * motion also keeps the clip on its first frame.
 */
onMounted(() => {
  const video = videoRef.value
  if (!video) {
    return
  }

  video.muted = true
  if (props.autoplay && !shouldReduceMotion.value) {
    void video.play().catch(() => {})
  }
})

const maskStyle = computed(() => {
  const light = props.blend === 'screen'

  return {
    backgroundColor: light ? '#ffffff' : '#000000',
    color: light ? '#000000' : '#ffffff',
    mixBlendMode: props.blend,
  }
})
</script>
