<template>
  <ComponentPlayground
    name="ShortSlideRight"
    :defaults="{
      phrases: ['Ship it', 'Measure it', 'Ship it again'],
      interval: 2500,
    }"
    :controls="{
      phrases: { label: 'Phrases', kind: 'array', placeholder: 'Ship it, Measure it' },
      interval: { label: 'Interval (ms)', kind: 'number', min: 1000, max: 8000, step: 100 },
    }"
  />
</template>
