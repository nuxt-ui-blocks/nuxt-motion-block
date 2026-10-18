<template>
  <div :class="ui.root({ class: [uiProps.ui?.root, uiProps.class] })">
    <span
      v-for="meteor in meteorItems"
      :key="meteor.id"
      :class="ui.meteor({ class: uiProps.ui?.meteor })"
      :style="{
        '--angle': angle,
        'left': `${meteor.left}px`,
        'animationDelay': `${meteor.delay}s`,
        'animationDuration': `${meteor.duration}s`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMotionBlockUI } from '../composables/useMotionBlockUI'
import meteors from '../theme/meteors'

interface Props {
  count?: number
  speed?: number
  angle?: number
  class?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  count: 10,
  speed: 1,
  angle: 215,
  class: undefined,
  ui: undefined,
})

const { props: uiProps, ui } = useMotionBlockUI({ name: 'meteors', props, theme: meteors })

const angle = computed(() => `${props.angle}deg`)

const meteorItems = ref<{ id: number, left: number, delay: number, duration: number }[]>([])

onMounted(() => {
  meteorItems.value = Array.from({ length: props.count }, (_, id) => ({
    id,
    left: Math.floor(Math.random() * window.innerWidth),
    delay: Math.random() * 4 + 0.2,
    duration: (Math.random() * 8 + 2) / Math.max(props.speed, 0.01),
  }))
})
</script>

<style scoped>
.meteor {
  position: absolute;
  top: -5%;
  width: 2px;
  height: 2px;
  border-radius: 9999px;
  background-color: var(--color-zinc-500, #71717a);
  box-shadow: 0 0 0 1px #ffffff10;
  pointer-events: none;
  transform: rotate(var(--angle));
  animation: meteor linear infinite;
}

.meteor::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  z-index: -1;
  width: 50px;
  height: 1px;
  transform: translateY(-50%);
  background-image: linear-gradient(to right, var(--color-zinc-500, #71717a), transparent);
}

@keyframes meteor {
  0% {
    transform: rotate(var(--angle)) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(var(--angle)) translateX(-500px);
    opacity: 0;
  }
}
</style>
