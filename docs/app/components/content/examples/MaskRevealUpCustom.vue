<template>
  <ComponentPlayground
    name="MaskRevealUp"
    :defaults="{
      text: 'Every line rises\nout of its own mask',
      lines: ['Every line rises', 'out of its own mask'],
      stagger: 90,
      delay: 0,
      triggerOnView: false,
    }"
    :controls="{
      stagger: { label: 'Stagger (ms)', kind: 'number', min: 0, max: 300, step: 5 },
      delay: { label: 'Delay (ms)', kind: 'number', min: 0, max: 1000, step: 50 },
      triggerOnView: { label: 'Trigger on view', kind: 'boolean' },
    }"
  />
</template>
