<template>
  <div
    class="relative h-full w-full overflow-hidden"
    :class="props.class"
  >
    <div
      v-for="meteor in meteors"
      :key="meteor.id"
      class="meteor"
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

interface Props {
  count?: number
  speed?: number
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  count: 10,
  speed: 1,
})

const meteors = computed(() =>
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
