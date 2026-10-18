<template>
  <MLampContainer>
    <Motion
      as="h1"
      :initial="{ opacity: 0.5, y: 100 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
      class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    >
      Build lamps <br> the right way
    </Motion>
  </MLampContainer>
</template>

<script setup>
import { Motion } from 'motion-v'
</script>
