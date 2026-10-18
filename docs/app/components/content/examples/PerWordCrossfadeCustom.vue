<template>
  <ComponentPlayground
    name="PerWordCrossfade"
    :defaults="{
      text: 'Every word finds its place',
      stagger: 70,
      delay: 0,
      triggerOnView: false,
    }"
    :controls="{
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 200, step: 2 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
