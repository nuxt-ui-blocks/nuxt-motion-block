<template>
  <component
    :is="as"
    :data-text="text"
    :style="{ '--shadow-color': shadowColor }"
    :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import lineShadowText from '../theme/line-shadow-text'

export type LineShadowTextElement
  = 'article' | 'div' | 'h1' | 'h2' | 'h3' | 'h4'
    | 'h5' | 'h6' | 'li' | 'p' | 'section' | 'span'

export interface LineShadowTextProps {
  /** Element the text renders as. */
  as?: LineShadowTextElement
  /** Extra classes for the root element. */
  class?: string
  /** Colour of the striped shadow. */
  shadowColor?: string
  /**
   * The text to render. It is also written to `data-text`, which is what the
   * shadow layer draws, so pass the copy here whenever you want the shadow.
   */
  text?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<LineShadowTextProps>(), {
  as: 'span',
  class: undefined,
  shadowColor: 'black',
  text: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'lineShadowText', props, theme: lineShadowText })
</script>

<style scoped>
.mb-line-shadow::after {
  content: attr(data-text);
  position: absolute;
  top: 0.04em;
  left: 0.04em;
  z-index: -10;
  background-image: linear-gradient(
    45deg,
    transparent 45%,
    var(--shadow-color) 45%,
    var(--shadow-color) 55%,
    transparent 0
  );
  background-size: 0.06em 0.06em;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  white-space: pre;
  animation: mb-line-shadow 15s linear infinite;
}

@keyframes mb-line-shadow {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 100% -100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mb-line-shadow::after {
    animation: none;
  }
}
</style>
