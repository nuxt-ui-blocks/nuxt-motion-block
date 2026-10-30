<template>
  <ComponentPlayground
    name="WarpBackground"
    :defaults="{
      color: '#6366f1',
      gridColor: '#ffffff',
      lines: 22,
      beams: 4,
      speed: 1,
      horizon: 0.55,
      glow: 0.6,
      class: 'h-72 w-full rounded-xl bg-neutral-950',
    }"
    :controls="{
      color: { label: 'Glow colour', kind: 'color' },
      gridColor: { label: 'Grid colour', kind: 'color' },
      lines: { label: 'Lines', kind: 'number', min: 6, max: 48, step: 1 },
      beams: { label: 'Beams', kind: 'number', min: 0, max: 10, step: 1 },
      speed: { label: 'Speed', kind: 'number', min: 0.2, max: 3, step: 0.1 },
      horizon: { label: 'Horizon', kind: 'number', min: 0.2, max: 0.85, step: 0.05 },
      glow: { label: 'Glow', kind: 'number', min: 0, max: 1, step: 0.05 },
    }"
  />
</template>
