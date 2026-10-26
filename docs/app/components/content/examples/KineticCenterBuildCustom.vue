<template>
  <ComponentPlayground
    name="KineticCenterBuild"
    :defaults="{
      phrases: ['Built one word at a time.', 'Centred, then locked.', 'Never a layout jump.'],
      interval: 2500,
      class: 'max-w-lg text-center text-2xl font-semibold text-highlighted',
    }"
    :controls="{
      interval: { label: 'Hold (ms)', kind: 'number', min: 600, max: 6000, step: 200 },
      phrases: { label: 'Phrases', kind: 'array', placeholder: 'Add a phrase' },
    }"
  />
</template>
