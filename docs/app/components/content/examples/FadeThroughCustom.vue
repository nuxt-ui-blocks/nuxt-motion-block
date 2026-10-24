<template>
  <ComponentPlayground
    name="FadeThrough"
    :defaults="{
      phrases: ['One line at a time.', 'No overlap, no jitter.', 'Quiet by default.'],
      interval: 2500,
      class: 'text-center text-3xl font-semibold text-highlighted',
    }"
    :controls="{
      interval: { label: 'Interval (ms)', kind: 'number', min: 800, max: 6000, step: 200 },
      phrases: { label: 'Phrases', kind: 'array', placeholder: 'Add a phrase' },
    }"
  />
</template>
