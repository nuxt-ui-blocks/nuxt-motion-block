<template>
  <ComponentPlayground
    name="DurationPicker"
    :defaults="{
      modelValue: 90,
      label: 'Duration',
      units: ['hours', 'minutes', 'seconds'],
      min: 0,
      max: 86399,
      step: 1,
      disabled: false,
    }"
    :controls="{
      modelValue: { kind: 'number', min: 0, max: 86399, step: 1, label: 'Seconds' },
      units: { kind: 'array', label: 'Units', placeholder: 'hours, minutes, seconds' },
      min: { kind: 'number', min: 0, max: 3600, step: 1 },
      max: { kind: 'number', min: 60, max: 359999, step: 60 },
      step: { kind: 'number', min: 1, max: 60, step: 1 },
      label: { kind: 'string', label: 'Label', placeholder: 'Label' },
      disabled: { kind: 'boolean', label: 'Disabled' },
    }"
  />
</template>
