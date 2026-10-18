<template>
  <ComponentPlayground
    name="ShortSlideDown"
    :defaults="{
      phrases: ['Ship it', 'Then sleep on it', 'Ship it on Friday'],
      interval: 2500,
    }"
    :controls="{
      phrases: { label: 'Phrases', kind: 'array', placeholder: 'Ship it, Then sleep on it' },
      interval: { label: 'Interval (ms)', kind: 'number', min: 800, max: 8000, step: 100 },
    }"
  />
</template>
