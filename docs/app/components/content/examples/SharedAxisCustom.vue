<template>
  <ComponentPlayground
    name="SharedAxis"
    :defaults="{
      phrases: ['Motion with intent.', 'Motion with restraint.', 'Motion with a reason.'],
      axis: 'x',
      interval: 2500,
      class: 'text-2xl font-semibold text-highlighted',
    }"
    :controls="{
      axis: {
        label: 'Axis',
        kind: 'select',
        options: [
          { label: 'Horizontal', value: 'x' },
          { label: 'Vertical', value: 'y' },
          { label: 'Depth', value: 'z' },
        ],
      },
      interval: { label: 'Interval (ms)', kind: 'number', min: 800, max: 6000, step: 200 },
      phrases: { label: 'Phrases', kind: 'array', placeholder: 'Add a phrase' },
    }"
  />
</template>
