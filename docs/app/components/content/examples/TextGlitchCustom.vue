<template>
  <ComponentPlayground
    name="TextGlitch"
    :defaults="{
      text: 'CYBERPUNK',
      trigger: 'hover',
      intensity: 'medium',
      duration: 2,
      interval: 3,
      speed: 500,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
      showScanLines: true,
      autoStart: false,
    }"
    :controls="{
      trigger: {
        kind: 'select',
        options: [
          { label: 'Hover', value: 'hover' },
          { label: 'Auto', value: 'auto' },
          { label: 'In view', value: 'inView' },
          { label: 'Manual', value: 'manual' },
        ],
      },
      intensity: {
        kind: 'select',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Extreme', value: 'extreme' },
        ],
      },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.2, max: 6, step: 0.1 },
      interval: { label: 'Interval (s)', kind: 'number', min: 0.5, max: 10, step: 0.5 },
      speed: { label: 'Speed (ms)', kind: 'number', min: 100, max: 2000, step: 50 },
      showScanLines: { label: 'Scan lines', kind: 'boolean' },
      autoStart: { label: 'Auto start', kind: 'boolean' },
      colors: { label: 'Colors', kind: 'colors' },
    }"
  />
</template>
