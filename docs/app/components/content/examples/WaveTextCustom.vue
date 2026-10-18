<template>
  <ComponentPlayground
    name="WaveText"
    :defaults="{
      text: 'Wave on',
      amplitude: 8,
      duration: 1.2,
      staggerDelay: 0.05,
    }"
    :controls="{
      amplitude: { label: 'Amplitude (px)', kind: 'number', min: 0, max: 24, step: 1 },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.4, max: 3, step: 0.1 },
      staggerDelay: { label: 'Stagger (s)', kind: 'number', min: 0, max: 0.3, step: 0.01 },
    }"
  />
</template>
