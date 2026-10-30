<template>
  <ComponentPlayground
    name="Marquee"
    :defaults="{
      duration: 22,
      gap: 12,
      pauseOnHover: true,
      repeat: 6,
      reverse: false,
      vertical: false,
    }"
    :controls="{
      duration: { label: 'Duration', kind: 'number', min: 4, max: 60, step: 1 },
      gap: { label: 'Gap', kind: 'number', min: 0, max: 48, step: 1 },
      repeat: { label: 'Repeat', kind: 'number', min: 2, max: 8, step: 1 },
      pauseOnHover: { label: 'Pause on hover', kind: 'boolean' },
      reverse: { label: 'Reverse', kind: 'boolean' },
      vertical: { label: 'Vertical', kind: 'boolean' },
    }"
  />
</template>
