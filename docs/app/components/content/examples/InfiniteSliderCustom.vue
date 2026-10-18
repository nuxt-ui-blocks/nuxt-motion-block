<template>
  <ComponentPlayground
    name="InfiniteSlider"
    :defaults="{ duration: 40, className: 'items-center gap-8' }"
    :controls="{ duration: { kind: 'number', min: 5, max: 90, step: 1 } }"
  >
    <div
      v-for="i in 6"
      :key="i"
      class="flex size-20 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-lg font-semibold text-primary"
    >
      {{ i }}
    </div>
  </ComponentPlayground>
</template>
