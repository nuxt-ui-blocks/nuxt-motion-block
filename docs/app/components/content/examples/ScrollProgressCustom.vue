<template>
  <ComponentPlayground
    name="ScrollProgress"
    :defaults="{
      class: 'relative h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600',
      springOptions: { stiffness: 200, damping: 50, restDelta: 0.001 },
    }"
    :controls="{}"
  />
</template>
