<template>
  <ComponentPlayground
    name="FlowingStroke"
    :defaults="{
      width: 640,
      height: 180,
      color: 'primary',
      shape: 'wave',
      direction: 'forward',
      trigger: 'loop',
      ribbon: 16,
      dash: 28,
      gap: 18,
    }"
    :controls="{
      color: {
        kind: 'select',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Success', value: 'success' },
          { label: 'Info', value: 'info' },
          { label: 'Warning', value: 'warning' },
          { label: 'Error', value: 'error' },
        ],
      },
      shape: {
        kind: 'select',
        options: [
          { label: 'Wave', value: 'wave' },
          { label: 'Arc', value: 'arc' },
          { label: 'Diagonal', value: 'diagonal' },
          { label: 'Zigzag', value: 'zigzag' },
          { label: 'Ring', value: 'ring' },
        ],
      },
      direction: {
        kind: 'select',
        options: [
          { label: 'Forward', value: 'forward' },
          { label: 'Reverse', value: 'reverse' },
        ],
      },
      trigger: {
        kind: 'select',
        options: [
          { label: 'Hover', value: 'hover' },
          { label: 'Loop', value: 'loop' },
        ],
      },
      speed: { kind: 'number', min: 0.2, max: 4, step: 0.1 },
      amplitude: { kind: 'number', min: 0, max: 2, step: 0.1 },
    }"
  />
</template>
