<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <div
      v-for="meteor in meteorItems"
      :key="meteor.id"
      :class="ui.meteor({ class: uiProps.ui?.meteor })"
      :style="{
        left: `${meteor.x}%`,
        animationDuration: `${meteor.duration}s`,
        animationDelay: `${meteor.delay}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import meteors from '../theme/meteors'

interface Props {
  count?: number
  speed?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  count: 10,
  speed: 1,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'meteors', props, theme: meteors })

const meteorItems = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: (2 / props.speed) + Math.random() * 2,
    delay: Math.random() * 5,
  })),
)
</script>

<style scoped>
.meteor {
  position: absolute;
  top: -20px;
  width: 2px;
  height: 80px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0));
  transform: rotate(215deg);
  animation: meteor-fall linear infinite;
  opacity: 0;
}

@keyframes meteor-fall {
  0% {
    opacity: 0;
    transform: rotate(215deg) translateX(0);
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(215deg) translateX(-300px);
    top: 100%;
  }
}
</style>
