<template>
  <ComponentPlayground
    name="TrueFocus"
    :defaults="{
      sentence: 'True Focus',
      manualMode: false,
      blurAmount: 5,
      borderColor: 'green',
      glowColor: 'rgba(0, 255, 0, 0.6)',
      animationDuration: 0.5,
      pauseBetweenAnimations: 1,
    }"
    :controls="{
      sentence: { label: 'Sentence', kind: 'string', placeholder: 'True Focus' },
      manualMode: { label: 'Manual mode', kind: 'boolean' },
      blurAmount: { label: 'Blur amount (px)', kind: 'number', min: 0, max: 12, step: 0.5 },
      borderColor: { label: 'Border colour', kind: 'string', placeholder: 'green' },
      glowColor: { label: 'Glow colour', kind: 'string', placeholder: 'rgba(0, 255, 0, 0.6)' },
      animationDuration: { label: 'Animation (s)', kind: 'number', min: 0.1, max: 3, step: 0.1 },
      pauseBetweenAnimations: { label: 'Pause (s)', kind: 'number', min: 0, max: 4, step: 0.1 },
    }"
  />
</template>
