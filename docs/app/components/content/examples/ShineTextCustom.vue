<template>
  <ComponentPlayground
    name="ShineText"
    :defaults="{
      text: 'Available now',
      baseColor: 'var(--ui-text-muted)',
      shineColor: 'var(--ui-text)',
      duration: 2.5,
      repeatDelay: 0.6,
    }"
    :controls="{
      text: { label: 'Text', kind: 'string', placeholder: 'Available now' },
      baseColor: { label: 'Base colour', kind: 'string', placeholder: '#a1a1aa' },
      shineColor: { label: 'Shine colour', kind: 'string', placeholder: '#ffffff' },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.5, max: 6, step: 0.1 },
      repeatDelay: { label: 'Repeat delay (s)', kind: 'number', min: 0, max: 3, step: 0.1 },
    }"
  />
</template>
