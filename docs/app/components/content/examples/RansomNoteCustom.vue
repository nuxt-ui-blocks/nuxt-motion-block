<template>
  <ComponentPlayground
    name="RansomNote"
    :defaults="{
      text: 'RANSOM NOTE',
      animate: 'assemble',
      intensity: 0.6,
      rotation: 8,
      stagger: 0.03,
      seed: 1,
    }"
    :controls="{
      text: { label: 'Text', kind: 'string', placeholder: 'RANSOM NOTE' },
      animate: {
        label: 'Animate',
        kind: 'select',
        options: [
          { label: 'Assemble', value: 'assemble' },
          { label: 'Jitter', value: 'jitter' },
          { label: 'None', value: 'none' },
        ],
      },
      intensity: { label: 'Intensity', kind: 'number', min: 0, max: 1, step: 0.05 },
      rotation: { label: 'Resting rotation (°)', kind: 'number', min: 0, max: 30, step: 1 },
      stagger: { label: 'Stagger (s)', kind: 'number', min: 0, max: 0.2, step: 0.01 },
      seed: { label: 'Seed', kind: 'number', min: 1, max: 100, step: 1 },
    }"
  />
</template>
