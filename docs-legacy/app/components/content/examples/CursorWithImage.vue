<script setup>
const variants = {
  initial: { height: 0, opacity: 0, scale: 0.3 },
  animate: { height: 'auto', opacity: 1, scale: 1 },
  exit: { height: 0, opacity: 0, scale: 0.3 },
}

const transition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0.1,
}

const springConfig = {
  bounce: 0.01,
}
</script>

<template>
  <div>
    <div class="p-4">
      <MCursor
        :attach-to-parent="true"
        :variants="variants"
        :transition="transition"
        class="overflow-hidden"
        :spring-config="springConfig"
      >
        <img
          src="/hingol-national-park.jpg"
          alt="Hingol National Park"
          class="h-40 w-40"
        >
      </MCursor>
      Hingol National Park a beautiful place to explore in Pakistan
    </div>
  </div>
</template>
