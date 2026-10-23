<template>
  <ComponentPlayground
    name="GooeyFilter"
    :defaults="{
      strength: 8,
      contrast: 18,
      disabled: false,
      __slot: '<div class=\'flex -space-x-4\'><span class=\'size-16 rounded-full bg-primary\'></span><span class=\'size-16 rounded-full bg-secondary\'></span><span class=\'size-16 rounded-full bg-primary\'></span><span class=\'size-16 rounded-full bg-secondary\'></span></div>',
    }"
    :controls="{
      strength: { label: 'Blur strength', kind: 'number', min: 0, max: 24, step: 1 },
      contrast: { label: 'Contrast', kind: 'number', min: 4, max: 40, step: 1 },
      disabled: { label: 'Disabled', kind: 'boolean' },
    }"
  />
</template>
