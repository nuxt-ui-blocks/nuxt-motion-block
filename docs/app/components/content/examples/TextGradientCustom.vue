<template>
  <ComponentPlayground
    name="TextGradient"
    :defaults="{
      text: 'Animated gradient',
      as: 'span',
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'],
      direction: 'horizontal',
      animation: 'wave',
      duration: 3,
      speed: 1,
      size: 200,
      hover: false,
      ariaLabel: '',
      hideFromScreenReader: false,
      reduceMotion: false,
    }"
    :controls="{
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
      direction: {
        kind: 'select',
        options: [
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' },
          { label: 'Diagonal', value: 'diagonal' },
          { label: 'Radial', value: 'radial' },
        ],
      },
      animation: {
        kind: 'select',
        options: [
          { label: 'Wave', value: 'wave' },
          { label: 'Pulse', value: 'pulse' },
          { label: 'Flow', value: 'flow' },
          { label: 'Rainbow', value: 'rainbow' },
          { label: 'Static', value: 'static' },
        ],
      },
      duration: { label: 'Duration (s)', kind: 'number', min: 0.5, max: 10, step: 0.5 },
      speed: { label: 'Speed', kind: 'number', min: 0.2, max: 3, step: 0.1 },
      size: { label: 'Size (%)', kind: 'number', min: 100, max: 400, step: 10 },
      hover: { label: 'Hover', kind: 'boolean' },
      hideFromScreenReader: { label: 'Hide from screen reader', kind: 'boolean' },
      reduceMotion: { label: 'Reduce motion', kind: 'boolean' },
      ariaLabel: { label: 'ARIA label', kind: 'string' },
      colors: { label: 'Colors', kind: 'colors' },
    }"
  />
</template>
