<template>
  <ComponentPlayground
    name="Scrubber"
    :defaults="{
      label: 'Exposure',
      min: 0,
      max: 2,
      step: 0.05,
      decimals: 2,
      ticks: 9,
      defaultValue: 0.8,
      class: 'max-w-md',
    }"
    :controls="{
      label: { label: 'Label', kind: 'string' },
      min: { label: 'Min', kind: 'number', min: 0, max: 10, step: 1 },
      max: { label: 'Max', kind: 'number', min: 1, max: 100, step: 1 },
      step: { label: 'Step', kind: 'number', min: 0.01, max: 5, step: 0.01 },
      decimals: { label: 'Decimals', kind: 'number', min: 0, max: 3, step: 1 },
      ticks: { label: 'Ticks', kind: 'number', min: 0, max: 20, step: 1 },
      defaultValue: { label: 'Default value', kind: 'number', min: 0, max: 100, step: 0.05 },
    }"
  />
</template>
