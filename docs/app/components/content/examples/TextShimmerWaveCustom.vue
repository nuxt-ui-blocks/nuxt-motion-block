<template>
  <ComponentPlayground
    name="TextShimmerWave"
    :defaults="{
      text: 'Wave text',
      as: 'span',
      duration: 1,
      zDistance: 10,
      xDistance: 2,
      yDistance: -2,
      spread: 1,
      scaleDistance: 1.1,
      rotateYDistance: 10,
    }"
    :controls="{
      text: { label: 'Text', kind: 'string', placeholder: 'Wave text' },
      as: {
        kind: 'select',
        options: [
          { label: 'span', value: 'span' },
          { label: 'p', value: 'p' },
          { label: 'h1', value: 'h1' },
          { label: 'h2', value: 'h2' },
          { label: 'div', value: 'div' },
        ],
      },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.2, max: 4, step: 0.1 },
      zDistance: { label: 'Z distance', kind: 'number', min: 0, max: 50, step: 1 },
      xDistance: { label: 'X distance', kind: 'number', min: -20, max: 20, step: 1 },
      yDistance: { label: 'Y distance', kind: 'number', min: -20, max: 20, step: 1 },
      spread: { label: 'Spread', kind: 'number', min: 0.5, max: 5, step: 0.5 },
      scaleDistance: { label: 'Scale', kind: 'number', min: 0.5, max: 2, step: 0.1 },
      rotateYDistance: { label: 'Rotate Y', kind: 'number', min: 0, max: 45, step: 1 },
    }"
  />
</template>
